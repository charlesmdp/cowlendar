import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {parseDocument} from 'htmlparser2';
import {findAll,textContent} from 'domutils';
import {articlePage,blogIndex} from '../lib/editorial.mjs';

function verifyStructuredUrls(html,label){
 const doc=parseDocument(html);
 const scripts=findAll(n=>n.name==='script'&&n.attribs.type==='application/ld+json',doc.children);
 let breadcrumbs=0;
 function walk(value,location){
  if(Array.isArray(value)){value.forEach((entry,i)=>walk(entry,`${location}[${i}]`));return;}
  if(!value||typeof value!=='object')return;
  for(const key of ['@id','url','mainEntityOfPage']){
   if(typeof value[key]==='string')assert.match(value[key],/^https:\/\/[^/\s]+(?:\/[^\s]*)?$/,`${label}: ${location}.${key} must be an absolute HTTPS URL`);
  }
  if(value['@type']==='BreadcrumbList'){
   breadcrumbs++;
   assert.ok(value.itemListElement.length>=2,label+' breadcrumb hierarchy');
   value.itemListElement.forEach((entry,i)=>{
    assert.equal(entry.position,i+1,label+' breadcrumb position');
    assert.ok(entry.name,label+' breadcrumb name');
    const item=typeof entry.item==='string'?entry.item:entry.item?.['@id'];
    assert.ok(item,label+' breadcrumb destination');
    assert.equal(new URL(item).origin,'https://cowlendar.com',label+' breadcrumb origin');
   });
  }
  for(const [key,entry] of Object.entries(value))walk(entry,`${location}.${key}`);
 }
 scripts.forEach(n=>walk(JSON.parse(textContent(n)),'schema'));
 return breadcrumbs;
}

test('built HTML preserves absolute structured-data URLs after all build transformations',()=>{
 const files=fs.readdirSync('dist',{recursive:true}).filter(file=>file.endsWith('.html'));
 let breadcrumbs=0;
 for(const file of files)breadcrumbs+=verifyStructuredUrls(fs.readFileSync(path.join('dist',file),'utf8'),file);
 assert.ok(files.length>100,'Check the published archive, not just renderer output');
 assert.ok(breadcrumbs>=115,'Check every archived article breadcrumb');
});

test('dynamic blog output also uses absolute structured-data URLs',()=>{
 const posts=JSON.parse(fs.readFileSync('content/posts.json','utf8'));
 const post={...posts[0],markdown:'## A published guide\n\nBooking advice.'};
 assert.equal(verifyStructuredUrls(articlePage(post,posts),'dynamic article'),1);
 verifyStructuredUrls(blogIndex(posts),'dynamic blog index');
});
