import {parseDocument} from 'htmlparser2';
import {findOne} from 'domutils';
import {esc,json,ORIGIN,schemaBreadcrumb} from '../editorial.mjs';
import {toolArt} from '../tool-art.mjs';
import {toolGuides} from '../tool-guides.mjs';

const categories={
  'service-price-calculator':['Pricing & payments','pricing','apricot'],
  'no-show-calculator':['Pricing & payments','pricing','apricot'],
  'time-slot-generator':['Scheduling & capacity','planning','mint'],
  'timezone-converter':['Scheduling & capacity','planning','mint']
};
const units=['Labor','Materials','Gross profit'];
const formulas={
  'service-price-calculator':'Suggested price = (labor cost + materials) ÷ (1 − target margin as a decimal)',
  'no-show-calculator':'Monthly revenue at risk = appointments × no-show rate × share left unfilled × appointment value',
  'time-slot-generator':'Slots per uninterrupted period = floor((available minutes + buffer) ÷ (service minutes + buffer))'
};
function priceBreakdown(){
  const form=document.getElementById('service-calculator');
  const breakdown=document.getElementById('price-breakdown');
  const update=()=>{
    const data=Object.fromEntries(new FormData(form));
    const valid=form.checkValidity() && ['hours','hourly','materials','margin'].every(key=>data[key]!=='' && Number.isFinite(Number(data[key])));
    const cost=Number(data.hours)*Number(data.hourly)+Number(data.materials);
    const price=cost/(1-Number(data.margin)/100);
    const values=[Number(data.hours)*Number(data.hourly),Number(data.materials),price-cost];
    const format=new Intl.NumberFormat('en-US',{style:'currency',currency:data.currency});
    const segments=breakdown.querySelectorAll('.lt-price-strip i');
    const amounts=breakdown.querySelectorAll('dd');
    breakdown.querySelector('.lt-price-error').hidden=valid;
    if(!valid)document.getElementById('price-result').textContent='—';
    values.forEach((value,i)=>{
      segments[i].style.width=(valid && price>0?value/price*100:0)+'%';
      amounts[i].textContent=valid?format.format(value):'—';
    });
  };
  form.addEventListener('input',()=>queueMicrotask(update));
  form.addEventListener('submit',e=>e.preventDefault());
  update();
}
function servicePanel(source,classNode,idNode){
  const form=idNode('service-calculator');
  const fields=source(classNode('calculator-fields',form));
  const currency=source(findOne(n=>n.name==='select' && n.attribs.name==='currency',form.children).parent);
  return '<form id="service-calculator" class="lt-price-desk"><section class="lt-price-inputs"><h2>Price a service</h2>'+fields+currency+'</section>'
    +'<section id="price-breakdown" class="lt-price-sheet"><h2>Estimated service price</h2><output id="price-result" aria-live="polite">$100.00</output><p class="lt-price-error" role="status" hidden>Enter valid costs and a target margin from 0 to 95%.</p>'
    +'<div class="lt-price-strip" aria-hidden="true"><i style="width:45%"></i><i style="width:15%"></i><i style="width:40%"></i></div>'
    +'<dl>'+units.map((label,i)=>'<div><dt><i aria-hidden="true"></i>'+label+'</dt><dd>'+['$45.00','$15.00','$40.00'][i]+'</dd></div>').join('')+'</dl></section></form>'
    +'<script>('+priceBreakdown.toString()+')();</script>';
}
function updateHead(head,g,slug){
  const path='/free-tools/'+slug,url=ORIGIN+path,img=ORIGIN+'/assets/toolkit/'+slug+'.png';
  const breadcrumb=schemaBreadcrumb([['Home','/'],['Free tools','/free-tools'],[g.name,path]]);
  const app={'@context':'https://schema.org','@type':'WebApplication','@id':url+'#tool',url,name:g.name,description:g.description,image:img,applicationCategory:'BusinessApplication',operatingSystem:'Any',isAccessibleForFree:true,offers:{'@type':'Offer',price:'0',priceCurrency:'USD'}};
  const page={'@context':'https://schema.org','@type':'WebPage','@id':url+'#webpage',url,name:g.title,description:g.description,mainEntity:{'@id':url+'#tool'}};
  const questions={'@context':'https://schema.org','@type':'FAQPage','@id':url+'#questions',isPartOf:{'@id':url+'#webpage'},mainEntity:g.faq.map(([q,a])=>({'@type':'Question',name:q,acceptedAnswer:{'@type':'Answer',text:a}}))};
  const fresh='<title>'+esc(g.title)+'</title><meta name="description" content="'+esc(g.description)+'"><link rel="canonical" href="'+url+'">'
    +'<meta property="og:type" content="website"><meta property="og:site_name" content="Cowlendar"><meta property="og:title" content="'+esc(g.title)+'"><meta property="og:description" content="'+esc(g.description)+'"><meta property="og:url" content="'+url+'"><meta property="og:image" content="'+img+'">'
    +'<meta name="twitter:card" content="summary_large_image"><meta name="twitter:image" content="'+img+'">'
    +[page,breadcrumb,app,questions].map(node=>'<script type="application/ld+json">'+json(node)+'</script>').join('')
    +'<link rel="stylesheet" href="/booking-tools.css"><link rel="stylesheet" href="/legacy-toolkit.css"></head>';
  return head.replace(/<title\b[^>]*>[\s\S]*?<\/title>/gi,'')
    .replace(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>[\s\S]*?<\/script>/gi,'')
    .replace(/<link\b[^>]*\brel=["']canonical["'][^>]*>/gi,'')
    .replace(/<link\b[^>]*\bhref=["']\/(?:booking-tools|legacy-toolkit)\.css["'][^>]*>/gi,'')
    .replace(/<meta\b[^>]*\b(?:name|property)=["'](?:description|twitter:[^"']+|og:[^"']+)["'][^>]*>/gi,'')
    .replace(/<\/head>/i,()=>fresh);
}
export function enhanceLegacyTool(html,slug,g){
  if(!categories[slug] || !g)return html;
  const doc=parseDocument(html,{withStartIndices:true,withEndIndices:true});
  const main=findOne(n=>n.name==='main',doc.children);
  const byClass=(key,root=main)=>findOne(n=>n.attribs?.class?.split(/\s+/).includes(key),root.children);
  const byId=id=>findOne(n=>n.attribs?.id===id,main.children);
  const source=node=>{
    if(!node)throw new Error('Missing original control in '+slug);
    return html.slice(node.startIndex,node.endIndex+1);
  };
  let bench;
  if(slug==='timezone-converter')bench=source(byClass('timezone-workspace'))+source(byId('tz-dialog'));
  else if(slug==='service-price-calculator')bench=servicePanel(source,byClass,byId);
  else bench=source(byClass('tool-workbench'));
  const [category,anchor,theme]=categories[slug];
  const related=g.related.map(key=>{
    const name=toolGuides[key]?.name || key.split('-').map(w=>w[0].toUpperCase()+w.slice(1)).join(' ');
    return '<a class="lt-related-card" href="/free-tools/'+esc(key)+'"><span>'+toolArt(key)+'</span><strong>'+esc(name)+'</strong><span aria-hidden="true">↗</span></a>';
  }).join('');
  const body='<main id="content" class="legacy-tool kit-wrap '+theme+'" data-tool="'+slug+'">'
    +'<nav class="kit-crumbs" aria-label="Breadcrumb"><a href="/">Home</a><span>/</span><a href="/free-tools">Free tools</a><span>/</span>'+esc(g.name)+'</nav>'
    +'<section class="kit-lead"><div class="kit-hero-art">'+toolArt(slug)+'</div><div><a class="kit-cat" href="/free-tools#'+anchor+'">'+category+'</a><h1>'+esc(g.name)+'</h1><p>'+esc(g.short)+'</p></div></section>'
    +'<div class="lt-workspace">'+bench+'</div><section class="kit-guide"><div><h2>'+esc(g.guideHeading)+'</h2><p>'+esc(g.guide)+'</p>'+(formulas[slug]?'<p class="lt-formula">'+esc(formulas[slug])+'</p>':'')+'<a href="'+esc(g.solution)+'">'+esc(g.solutionLabel)+' →</a></div><aside><h3>Worked example</h3><p>'+esc(g.example)+'</p></aside></section>'
    +'<section id="questions" class="kit-faq"><h2>'+esc(g.name)+' FAQ</h2><div>'+g.faq.map(([q,a])=>'<details><summary>'+esc(q)+'</summary><p>'+esc(a)+'</p></details>').join('')+'</div></section>'
    +'<nav class="kit-related" aria-label="Related free tools"><h2>Related free tools</h2><div class="lt-related-links">'+related+'</div></nav></main>';
  const rebuilt=html.slice(0,main.startIndex)+body+html.slice(main.endIndex+1);
  return rebuilt.replace(/<head\b[^>]*>[\s\S]*?<\/head>/i,head=>updateHead(head,g,slug));
}
