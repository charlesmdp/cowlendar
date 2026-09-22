import catalog from '../content/catalog.json' with {type:'json'};
import redirects from '../content/redirects.json' with {type:'json'};
export {catalog,redirects};
const metadataFields='slug,title,excerpt,cover_url,author,category,status,published_at,updated_at,seo_title,seo_description';
export const isPublished=(row,now)=>row.status==='published'&&Number.isFinite(row.published_at)&&row.published_at<=now;
export function asPost(row,base){const date=seconds=>new Date(seconds*1000).toISOString();return {...base,slug:base?.slug||row.slug,dbSlug:row.slug,title:row.title,description:row.seo_description||row.excerpt||row.title,seoTitle:row.seo_title||row.title+' | Cowlendar',category:row.category||'Booking guides',cover:row.cover_url||base?.cover||'/assets/blog/01-service-booking.webp',thumbnail:row.cover_url||base?.thumbnail||'/assets/blog/01-service-booking-thumb.webp',published:base?.published||date(row.published_at),modified:date(row.updated_at||row.published_at),markdown:row.content_markdown||'',html:undefined,faq:[],takeaway:undefined,rewritten:false,database:true,minutes:Math.max(2,Math.ceil((row.content_markdown||'').split(/\s+/).length/210))};}
export async function publicCatalog(db,now=Math.floor(Date.now()/1000)){
 if(!db)throw new Error('BLOG_DB binding unavailable');
 const result=await db.prepare(`SELECT ${metadataFields} FROM blog_posts`).all();if(result.success===false)throw new Error('Blog query failed');
 const rows=result.results||[],byDb=new Map(rows.map(r=>[r.slug,r])),originalByDb=new Map(catalog.map(p=>[p.dbSlug,p]));
 const list=catalog.filter(p=>!byDb.has(p.dbSlug));for(const row of rows){if(isPublished(row,now))list.push(asPost(row,originalByDb.get(row.slug)));}
 // Database publication changes override snapshots, including drafts and scheduled posts.
 return list.sort((a,b)=>Number(b.rewritten)-Number(a.rewritten)||new Date(b.modified)-new Date(a.modified));
}
export async function publicPost(db,slug,now=Math.floor(Date.now()/1000)){
 const base=catalog.find(p=>p.slug===slug);const dbSlug=base?.dbSlug||slug;
 if(!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(dbSlug)||dbSlug.length>160)return {kind:'missing'};
 if(!db)throw new Error('BLOG_DB binding unavailable');
 const row=await db.prepare(`SELECT ${metadataFields},content_markdown FROM blog_posts WHERE slug = ? LIMIT 1`).bind(dbSlug).first();
 if(row)return isPublished(row,now)?{kind:'database',post:asPost(row,base)}:{kind:'missing'};
 return base?{kind:'static',post:base}:{kind:'missing'};
}
export function responseHeaders(request,status=200,type='text/html; charset=utf-8'){
 const url=new URL(request.url),production=url.hostname==='cowlendar.com'||url.hostname==='www.cowlendar.com';
 return {'Content-Type':type,'Cache-Control':status===200?'public, max-age=0, s-maxage=60':'no-store','X-Content-Type-Options':'nosniff',...(!production||status!==200?{'X-Robots-Tag':'noindex, follow'}:{})};
}
export function finish(request,body,status=200,type){return new Response(request.method==='HEAD'?null:body,{status,headers:responseHeaders(request,status,type)});}
