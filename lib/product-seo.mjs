import {parseDocument} from 'htmlparser2';
import {findAll,textContent} from 'domutils';
import {ORIGIN,json,esc,slugId,schemaBreadcrumb} from './editorial.mjs';
const hasClass=(node,name)=>(node.attribs?.class||'').split(/\s+/).includes(name);
const nodes=(tree,predicate)=>findAll(predicate,tree.children||[]);
const text=node=>textContent(node).replace(/\s+/g,' ').trim();
const integrations={'Google Calendar':'google-calendar','Outlook Calendar':'outlook','Outlook':'outlook','Google Meet':'google-meet','Zoom':'zoom','Shopify POS':'shopify-pos','Klaviyo':'klaviyo'};
export function enhanceProductPage(html,route,own){
 if(!['/features','/pricing'].includes(route))return html;
 html=html.replace(/<script\b[^>]*id="cowlendar-page-schema"[^>]*>[\s\S]*?<\/script>/g,'');
 const featureIds=new Map();
 if(route==='/features')html=html.replace(/<article\b[^>]*class="catalog-feature"[^>]*>[\s\S]*?<\/article>/g,card=>{
  const node=parseDocument(card),name=text(nodes(node,n=>n.name==='h3')[0]);
  const baseId='feature-'+slugId(name),seen=featureIds.get(baseId)||0;featureIds.set(baseId,seen+1);const id=baseId+(seen?'-'+(seen+1):'');
  card=card.replace(/<article\b([^>]*)>/,(_,attrs)=>'<article'+attrs.replace(/\s+id="[^"]*"/g,'')+' id="'+id+'">');
  if(integrations[name]&&!card.includes('feature-integration-link'))card=card.replace('</article>',`<a class="feature-integration-link" href="/integrations/${integrations[name]}">Explore integration →</a></article>`);
  return card;
 });
 const doc=parseDocument(html),name=route==='/features'?'Features':'Pricing';
 const software={'@type':'SoftwareApplication','@id':ORIGIN+'/#software',name:'Cowlendar',url:ORIGIN,applicationCategory:'BusinessApplication',operatingSystem:'Web, Shopify',description:'Appointment, class, event and rental booking for Shopify stores.',publisher:{'@type':'Organization',name:'Cowlendar',legalName:'BOOKING APPOINTMENT COWLENDAR',url:ORIGIN},offers:own.pricingTiers.map(t=>({'@type':'Offer',name:t.name,price:t.price.toFixed(2),priceCurrency:'USD',url:ORIGIN+'/pricing',description:t.name==='Free'?'All features, up to 5 bookings per month.':`All features; up to $${t.maxRevenue.toLocaleString('en-US')} in booking revenue. Recurring billing every 30 days. Optional charges excluded.`}))};
 const breadcrumb=schemaBreadcrumb([['Home','/'],[name,route]]);delete breadcrumb['@context'];
 const graph=[software,breadcrumb];
 if(route==='/features'){
  const features=nodes(doc,n=>hasClass(n,'catalog-feature')).map(n=>({name:text(nodes(n,e=>e.name==='h3')[0]),description:text(nodes(n,e=>e.name==='p')[0]),url:ORIGIN+route+'#'+n.attribs.id}));
  graph.push({'@type':'ItemList',name:'Cowlendar booking features',numberOfItems:features.length,itemListElement:features.map((f,i)=>({'@type':'ListItem',position:i+1,item:{'@type':'Thing',...f}}))});
  software.featureList=features.map(f=>f.name);
 }else{
  const section=nodes(doc,n=>hasClass(n,'cw-faq'))[0];
  const faqs=nodes(section,n=>n.name==='details').map(n=>{const summary=nodes(n,e=>e.name==='summary')[0];return [summary.children.filter(n=>!(n.attribs?.['aria-hidden']==='true')).map(text).join('').replace(/\+\s*$/,'').trim(),nodes(n,e=>e.name==='p').map(text).join(' ')];});
  graph.push({'@type':'FAQPage',mainEntity:faqs.map(([q,a])=>({'@type':'Question',name:q,acceptedAnswer:{'@type':'Answer',text:a}}))});
 }
 if(!html.includes('class="page-schema-breadcrumb"'))html=html.replace(/(<main\b[^>]*>)/,`$1<nav class="page-schema-breadcrumb" aria-label="Breadcrumb"><a href="/">Home</a><span>/</span><span>${name}</span></nav>`);
 if(!html.includes('href="/commercial.css"'))html=html.replace('</head>','<link rel="stylesheet" href="/commercial.css"></head>');
 return html.replace('</head>',`<script type="application/ld+json" id="cowlendar-page-schema">${json({'@context':'https://schema.org','@graph':graph})}</script></head>`);
}
export function linkHomepage(html){
 const destinations={cleaning:['appointment','appointment'],hotel:['hotel','hotel'],consulting:['appointment','appointment'],kayak:['tour','tour'],pet:['appointment','appointment'],lessons:['class','class'],fitness:['fitness','fitness'],beauty:['salon','salon'],photography:['appointment','appointment'],workshops:['class','class'],tastings:['event','event'],rentals:['rental','rental'],wellness:['salon','salon']};
 html=html.replace(/<article class="usecase-card">[\s\S]*?<\/article>/g,card=>{const image=card.match(/\/assets\/usecases\/(\w+)\.webp/)?.[1],dest=destinations[image];if(!dest)return card;return card.replace(/<a\b[^>]*>/,`<a href="/shopify-${dest[0]}-booking-app">`).replace(/Explore booking examples|Explore \w+ bookings/,`Explore ${dest[1]} bookings`);});
 return html.replace(/<a class="integration-tile"[^>]*>[\s\S]*?<\/a>/g,card=>{const doc=parseDocument(card),label=text(nodes(doc,n=>n.name==='span')[0]),key=integrations[label];return card.replace(/href="[^"]*"/,`href="${key?'/integrations/'+key:'/features#integrations'}"`);});
}
