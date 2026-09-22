import routes from '../content/static-routes.json' with {type:'json'};
import {publicCatalog,finish} from '../lib/public-blog.mjs';
import {ORIGIN,esc} from '../lib/editorial.mjs';
export async function onRequest({request,env}){
 if(!['GET','HEAD'].includes(request.method))return new Response(null,{status:405,headers:{Allow:'GET, HEAD'}});
 try{const posts=await publicCatalog(env.BLOG_DB),all=[...routes,...Array.from({length:Math.max(0,Math.ceil(posts.length/12)-1)},(_,i)=>({path:'/blog/page/'+(i+2)})),...posts.map(p=>({path:'/blog/'+p.slug,modified:p.modified}))];
 const seen=new Set();return finish(request,'<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'+all.filter(r=>!seen.has(r.path)&&seen.add(r.path)).map(r=>`<url><loc>${esc(ORIGIN+r.path)}</loc>${r.modified?'<lastmod>'+r.modified.slice(0,10)+'</lastmod>':''}</url>`).join('')+'</urlset>',200,'application/xml; charset=utf-8');
 }catch(error){console.error('Sitemap unavailable:',error.message);return finish(request,'Sitemap temporarily unavailable',503,'text/plain; charset=utf-8');}
}
