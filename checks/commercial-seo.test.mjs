import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {parseDocument} from 'htmlparser2';
import {findAll,textContent} from 'domutils';
import {quoteApp} from '../lib/booking-math.mjs';
import {enhanceProductPage} from '../lib/product-seo.mjs';
const read=p=>fs.readFileSync(p,'utf8');
const apps=JSON.parse(read('content/apps.json')),solutions=JSON.parse(read('content/solutions.json')),integrations=JSON.parse(read('content/integrations.json'));
const select=(doc,predicate)=>findAll(predicate,doc.children);
const hasClass=(n,c)=>(n.attribs?.class||'').split(/\s+/).includes(c);
const schemas=doc=>select(doc,n=>n.name==='script'&&n.attribs.type==='application/ld+json').flatMap(n=>{const x=JSON.parse(textContent(n));return x['@graph']||[x];});
const fileFor=p=>p==='/'?'dist/index.html':'dist'+decodeURI(p).replace(/\/$/,'')+'.html';

test('commercial pages are indexable, canonical, linked in sitemap, and resolve their own links and assets',()=>{
 const sitemap=read('dist/sitemap.xml');
 for(const p of [...solutions,...integrations,{path:'/use-cases'},{path:'/integrations'}]){
  const html=read(fileFor(p.path)),doc=parseDocument(html);
  assert.equal(select(doc,n=>n.name==='h1').length,1,p.path);
  assert.equal(select(doc,n=>n.name==='link'&&n.attribs.rel==='canonical')[0].attribs.href,'https://cowlendar.com'+p.path);
  assert.ok(!select(doc,n=>n.name==='meta'&&n.attribs.name==='robots')[0].attribs.content.includes('noindex'));
  assert.ok(sitemap.includes('https://cowlendar.com'+p.path+'</loc>'));
  for(const n of select(doc,n=>n.name==='a'||n.name==='img')){
   const href=n.attribs[n.name==='img'?'src':'href'];if(!href?.startsWith('/')||href.startsWith('//'))continue;
   const url=new URL(href,'https://cowlendar.com');assert.ok(fs.existsSync(n.name==='img'?'dist'+url.pathname:fileFor(url.pathname)),p.path+' missing '+href);
  }
 }
});
test('FAQ schema matches the actual visible expandable questions and answers',()=>{
 for(const p of [...solutions,...integrations,{path:'/pricing'}]){
  const doc=parseDocument(read(fileFor(p.path))),faq=schemas(doc).find(s=>s['@type']==='FAQPage');assert.ok(faq,p.path);
  const details=select(doc,n=>n.name==='details');
  for(const q of faq.mainEntity){const detail=details.find(n=>textContent(select(n,e=>e.name==='summary')[0]).replace(/\+$/,'').trim()===q.name);assert.ok(detail,p.path+': '+q.name);assert.ok(textContent(detail).replace(/\s+/g,' ').includes(q.acceptedAnswer.text),p.path+' answer mismatch');}
 }
});
test('product structured data is stable across builds, with real offers and feature anchors',()=>{
 for(const route of ['/features','/pricing']){
  const html=read(fileFor(route)),doc=parseDocument(html),graph=schemas(doc),software=graph.find(x=>x['@type']==='SoftwareApplication');assert.ok(graph.some(x=>x['@type']==='BreadcrumbList'));
  assert.deepEqual(software.offers.map(x=>[x.name,Number(x.price)]),[['Free',0],['Starter',13.99],['Basic',29.99],['Growth',59.99]]);
  assert.ok(software.offers.every(x=>x.priceCurrency==='USD'&&x.url==='https://cowlendar.com/pricing'));
  const twice=enhanceProductPage(enhanceProductPage(html,route,apps[0]),route,apps[0]);assert.equal((twice.match(/id="cowlendar-page-schema"/g)||[]).length,1);
  if(route==='/features'){
   const list=graph.find(x=>x['@type']==='ItemList');assert.ok(list.numberOfItems>50);
   for(const {item} of list.itemListElement){const id=new URL(item.url).hash.slice(1),card=select(doc,n=>n.attribs.id===id)[0];assert.ok(card,item.name);assert.ok(textContent(card).includes(item.name));assert.ok(textContent(card).includes(item.description));}
  }
 }
});
test('homepage use cases and all six supported integration tiles lead to dedicated pages',()=>{
 const doc=parseDocument(read('dist/index.html'));
 const cases=select(doc,n=>hasClass(n,'usecase-card'));assert.equal(cases.length,13);
 for(const card of cases){const link=select(card,n=>n.name==='a')[0];assert.ok(solutions.some(s=>s.path===link.attribs.href));assert.ok(!link.attribs.target);}
 const tiles=select(doc,n=>hasClass(n,'integration-tile'));assert.equal(tiles.filter(n=>integrations.some(x=>x.path===n.attribs.href)).length,6);
});
test('alternative scenarios preserve competitive prices, fees and unconfirmed features',()=>{
 const app=key=>apps.find(a=>a.key===key);
 assert.equal(quoteApp(app('apntly'),{bookings:20,value:40,features:['google','deposits']}).total,9);
 assert.equal(quoteApp(app('cowlendar'),{bookings:20,value:40,features:['google','deposits']}).total,13.99);
 assert.equal(quoteApp(app('appointo'),{bookings:100,value:40,features:['bundles'],bundleShare:50}).total,54);
 assert.equal(quoteApp(app('hoppy'),{bookings:20,value:40,features:['deposits']}),null);
 assert.equal(quoteApp(app('meety'),{bookings:100,value:40,features:['deposits']}).total,47);
});
test('all alternative guides expose individual criteria, plan details, cost examples and primary sources',()=>{
 const data=JSON.parse(read('content/alternatives-editorial.json')),intros=new Set();
 for(const a of apps.slice(1)){
  const doc=parseDocument(read('dist/'+a.key+'-alternatives.html'));assert.equal(select(doc,n=>hasClass(n,'alternative-scenario')).length,2);
  assert.equal(select(doc,n=>hasClass(n,'alternative-option')).length,4);assert.equal(select(doc,n=>hasClass(n,'alternative-plans')).length,5);
  assert.ok(select(doc,n=>n.name==='a'&&n.attribs.href===a.listing).length);assert.ok(select(doc,n=>n.name==='time'&&n.attribs.datetime==='2026-09-22').length);
  for(const [title,body] of data[a.key].criteria){assert.ok(textContent(doc).includes(title));assert.ok(textContent(doc).includes(body));}
  intros.add(data[a.key].intro);
 }
 assert.equal(intros.size,10);
});
