import fs from 'node:fs/promises';
import sharp from 'sharp';
let records=JSON.parse(await fs.readFile('content/image-sources.json','utf8'));
records=records.filter(r=>!r.key.startsWith('izyrent-'));
const assets=[{key:'izyrent-icon',url:'https://cdn.shopify.com/app-store/listing_images/4a0f1e1d352c9968474bf69ab15f5f0a/icon/CM7j6N3Ft4wDEAE=.png',kind:'icon',alt:'IzyRent: Rentals & Bookings'},{key:'izyrent-screen',url:'https://cdn.shopify.com/app-store/listing_images/4a0f1e1d352c9968474bf69ab15f5f0a/desktop_screenshot/CNHEjprTpoMDEAE=.png?height=720&width=1280',kind:'screen',alt:'IzyRent rental booking calendar'}];
for(const asset of assets){const response=await fetch(asset.url);if(!response.ok)throw new Error(response.status+' '+asset.key);await sharp(Buffer.from(await response.arrayBuffer())).resize({width:asset.kind==='icon'?160:1280,withoutEnlargement:true}).webp({quality:85}).toFile('dist/assets/apps/'+asset.key+'.webp');records.push({...asset,source:'https://apps.shopify.com/rental-booking-izyrent',checked:'2026-09-22'});}
await fs.writeFile('content/image-sources.json',JSON.stringify(records,null,2)+'\n');
console.log('IzyRent official logo and screenshot saved.');
