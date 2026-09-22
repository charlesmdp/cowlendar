export const publishedWhere = "status = 'published' AND published_at <= ?";
const listFields='slug, title, excerpt, cover_url, author, category, published_at';
export function pagination(url){
 const get=(key,fallback,max)=>{const raw=url.searchParams.get(key);if(raw===null)return fallback;if(!/^\d+$/.test(raw))return null;const n=Number(raw);return Number.isSafeInteger(n)&&n>=1&&n<=max?n:null;};
 const page=get('page',1,10000),limit=get('limit',12,50);return page===null||limit===null?null:{page,limit,offset:(page-1)*limit};
}
export async function readPosts(db,options,now=Math.floor(Date.now()/1000)){
 const result=await db.prepare(`SELECT ${listFields} FROM blog_posts WHERE ${publishedWhere} ORDER BY published_at DESC, id DESC LIMIT ? OFFSET ?`).bind(now,options.limit+1,options.offset).all();
 if(result.success===false)throw new Error('Blog query failed');
 const rows=result.results||[];return {posts:rows.slice(0,options.limit),page:options.page,hasMore:rows.length>options.limit};
}
export async function readPost(db,slug,now=Math.floor(Date.now()/1000)){
 if(!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)||slug.length>160)return null;
 return db.prepare(`SELECT ${listFields}, content_markdown, seo_title, seo_description FROM blog_posts WHERE slug = ? AND ${publishedWhere} LIMIT 1`).bind(slug,now).first();
}
