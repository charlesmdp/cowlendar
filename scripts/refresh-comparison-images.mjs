import fs from 'node:fs/promises';
import sharp from 'sharp';
const keys=['cowlendar','meety','apntly','appointo','easy-appointment-booking','bookx'];
const sources=JSON.parse(await fs.readFile('content/image-sources.json','utf8'));
for(const key of keys){const source=sources.find(s=>s.key===key+'-screen');const url=new URL(source.url);url.searchParams.set('width','1280');url.searchParams.set('height','720');const r=await fetch(url);if(!r.ok)throw new Error(key+' '+r.status);await sharp(Buffer.from(await r.arrayBuffer())).resize({width:1280,withoutEnlargement:true}).webp({quality:84}).toFile('dist/assets/apps/'+key+'-screen.webp');source.url=url.href;console.log(key+' product image updated');}
await fs.writeFile('content/image-sources.json',JSON.stringify(sources,null,2)+'\n');
