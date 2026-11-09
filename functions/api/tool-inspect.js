import ipaddr from 'ipaddr.js';
import {auditStorefront} from '../../lib/toolkit/storefront-audit.mjs';

export function targetURL(input){
  let u;try{u=new URL(input);}catch{throw Error('Enter a full HTTPS address.');}
  const host=u.hostname.toLowerCase().replace(/\.$/,'');
  if(u.protocol!=='https:'||u.username||u.password||u.port||host.length>253||!/^(?:[a-z0-9-]+\.)+[a-z]{2,63}$/.test(host)||['localhost','local','internal','home','test','invalid','onion','arpa','lan'].includes(host.split('.').pop())||host==='cowlendar.com'&&u.pathname.startsWith('/api/'))throw Error('Use a public HTTPS website or calendar feed.');
  if(input.length>3500)throw Error('The URL is too long.');
  u.hash='';return u;
}
export function isPublicAddress(s){try{return ipaddr.process(s).range()==='unicast';}catch{return false;}}
async function publicDNS(host,signal){
  const records=await Promise.all(['A','AAAA'].map(async type=>{
    const url='https://cloudflare-dns.com/dns-query?name='+encodeURIComponent(host)+'&type='+type;
    const r=await fetch(url,{headers:{Accept:'application/dns-json'},signal});if(!r.ok)throw Error('Could not verify the public hostname.');
    return ((await r.json()).Answer||[]).filter(a=>a.type===1||a.type===28).map(a=>a.data);
  }));
  const addresses=records.flat();if(!addresses.length||!addresses.every(isPublicAddress))throw Error('The hostname must resolve to public addresses.');
}
async function boundedText(response,max){
  if(+response.headers.get('content-length')>max)throw Error('This source is too large to inspect.');
  const reader=response.body?.getReader();if(!reader)throw Error('This source was empty.');
  const utf8=new TextDecoder();let bytes=0,text='';
  try{while(true){const {done,value}=await reader.read();if(done)break;bytes+=value.byteLength;if(bytes>max)throw Error('This source is too large to inspect.');text+=utf8.decode(value,{stream:true});}return text+utf8.decode();}
  finally{await reader.cancel().catch(()=>{});}
}
export async function inspectRemote(kind,address,signal){
  let u=targetURL(address);
  for(let hop=0;hop<5;hop++){
    await publicDNS(u.hostname,signal);
    const r=await fetch(u.href,{redirect:'manual',signal,headers:{Accept:kind==='store'?'text/html':'text/calendar, text/plain;q=0.8','User-Agent':'Mozilla/5.0 (compatible; CowlendarTool/1.0; +https://cowlendar.com/free-tools)'}});
    if([301,302,303,307,308].includes(r.status)){
      const next=r.headers.get('location');await r.body?.cancel();if(!next)throw Error('Redirect has no destination.');
      u=targetURL(new URL(next,u).href);continue;
    }
    if(!r.ok){await r.body?.cancel();throw Error('The source returned HTTP '+r.status+'. Check the link and public access.');}
    const body=await boundedText(r,kind==='store'?3500000:1000000);
    if(kind==='store'){
      if(!/<(?:html|head|body)\b/i.test(body))throw Error('The address did not return a web page.');
      return auditStorefront(body,u.href);
    }
    if(!/^\s*BEGIN:VCALENDAR\s*$/im.test(body))throw Error('This address did not return an iCalendar feed. Use a direct .ics subscription link or upload a file.');
    return {calendar:body};
  }
  throw Error('Too many redirects. Enter the final public address.');
}
export async function onRequest({request}){
  const headers={'Cache-Control':'no-store','Content-Type':'application/json; charset=utf-8','X-Content-Type-Options':'nosniff'};
  const reply=(v,s=200)=>new Response(JSON.stringify(v),{status:s,headers});
  if(request.method!=='POST')return reply({error:'Use POST.'},405);
  if(request.headers.get('origin')!==new URL(request.url).origin||!request.headers.get('content-type')?.startsWith('application/json'))return reply({error:'Open the tool on Cowlendar and try again.'},403);
  try{
    const {kind,url}=JSON.parse(await boundedText(request,6000));
    if(!['store','calendar'].includes(kind)||typeof url!=='string')throw Error('Choose a supported source.');
    return reply(await inspectRemote(kind,url,AbortSignal.timeout(11000)));
  }catch(e){return reply({error:e.name==='TimeoutError'||e.name==='AbortError'?'The public source timed out. Try again or use a local file.':e.message==='fetch failed'?'The source could not be reached.':e.message.slice(0,190)},422);}
}
