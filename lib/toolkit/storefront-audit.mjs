import {parseDocument} from 'htmlparser2';
import {findAll, textContent} from 'domutils';
const clean=s=>String(s||'').replace(/\s+/g,' ').trim();
function readable(node){
  if(node.type==='text')return node.data;
  if(['script','style','noscript','template','svg','nav','footer','head'].includes(node.name)||node.attribs?.hidden!==undefined||node.attribs?.['aria-hidden']==='true')return '';
  return (node.children||[]).map(readable).join(' ');
}
export function auditStorefront(html,url){
  const doc=parseDocument(html), els=findAll(n=>!!n.name,doc.children);
  const zone=els.find(n=>n.name==='main'||n.attribs.role==='main')||els.find(n=>n.name==='body')||doc;
  const nodes=findAll(n=>!!n.name,zone.children), meta=key=>els.find(n=>n.name==='meta'&&[n.attribs.property,n.attribs.name].includes(key))?.attribs.content;
  const title=clean(textContent(nodes.find(n=>n.name==='h1')||{children:[]})||meta('og:title')||textContent(els.find(n=>n.name==='title')||{children:[]})).slice(0,180)||'Untitled page';
  const text=clean(readable(zone)).slice(0,150000);
  const price=clean(meta('product:price:amount')?[meta('product:price:amount'),meta('product:price:currency')].filter(Boolean).join(' '):text.match(/(?:[$€£]\s?\d[\d.,]*|\d[\d.,]*\s?(?:USD|EUR|GBP|€|£))/i)?.[0]);
  const match=(re)=>clean(text.match(re)?.[0]).slice(0,120);
  const duration=match(/\b\d+(?:[.,]\d+)?\s*(?:minutes?|mins?\b|hours?|hrs?\b|heures?|jours?|days?)\b/i);
  const location=match(/(?:location|meeting point|venue|lieu|adresse)\s*[:–-]\s*[^|.!?]{2,70}|\b(?:online via Zoom|Google Meet|in person|en ligne|sur place)\b/i);
  const cancel=match(/\b(?:cancell?ation|refund policy|reschedul\w+|annulation|remboursement)\b/i);
  const buttons=nodes.filter(n=>['a','button','input'].includes(n.name)||n.attribs.role==='button').map(n=>clean(textContent(n)||n.attribs['aria-label']||n.attribs.value));
  const cta=buttons.find(s=>/(?:\bbook\b|réserv|reserve|schedule (?:now|a|your)|select (?:a |your )?(?:time|date)|choose (?:a |your )?(?:time|date))/i.test(s)&&s.length<100)||'';
  const signals=[['Price',price],['Duration',duration],['Location',location],['Cancellation terms',cancel],['Booking action',cta]];
  return {title,url,shopify:/cdn\.shopify\.com|Shopify\.shop\s*=|\.myshopify\.com|\/cdn\/shop\//i.test(html),signals};
}
