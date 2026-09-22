import {catalog,redirects,publicCatalog,publicPost,finish} from '../../lib/public-blog.mjs';
import {blogIndex,articlePage,notFound} from '../../lib/editorial.mjs';
export async function onRequest({request,env}){
 if(!['GET','HEAD'].includes(request.method))return new Response(null,{status:405,headers:{Allow:'GET, HEAD'}});
 const url=new URL(request.url);let route;try{route=decodeURIComponent(url.pathname);}catch{return finish(request,notFound(),404);}
 const redirect=redirects.find(([from])=>from===route);if(redirect)return Response.redirect(new URL(redirect[1],url),301);
 if(route.endsWith('/'))return Response.redirect(new URL(route.slice(0,-1)+url.search,url),301);
 const relative=route.replace(/^\/blog\/?/,'');
 try{
  if(!relative||/^page\/\d+$/.test(relative)){
   const raw=relative?relative.split('/')[1]:url.searchParams.get('page')||'1';if(!/^\d+$/.test(raw)||Number(raw)<1||Number(raw)>10000)return finish(request,notFound(),404);
   const posts=await publicCatalog(env.BLOG_DB),page=Number(raw),query=(url.searchParams.get('q')||'').slice(0,160),category=(url.searchParams.get('category')||'').slice(0,80);const filtered=posts.filter(p=>(!category||p.category===category)&&(!query||(p.title+' '+p.description).toLowerCase().includes(query.toLowerCase())));
   if(page>Math.max(1,Math.ceil(filtered.length/12)))return finish(request,notFound(),404);
   return finish(request,blogIndex(posts,{page,query,category}));
  }
  const markdown=relative.endsWith('.md'),slug=markdown?relative.slice(0,-3):relative;
  const result=await publicPost(env.BLOG_DB,slug);if(result.kind==='missing')return finish(request,notFound(),404);
  if(result.kind==='static'){
   const asset=await env.ASSETS.fetch(new Request(new URL('/blog/'+slug+(markdown?'.md':''),url),{method:'GET'}));
   if(!asset.ok)return finish(request,notFound(),404);
   return finish(request,asset.body,200,markdown?'text/markdown; charset=utf-8':'text/html; charset=utf-8');
  }
  if(markdown)return finish(request,`# ${result.post.title}\n\n${result.post.description}\n\n${result.post.markdown}\n`,200,'text/markdown; charset=utf-8');
  return finish(request,articlePage(result.post,catalog));
 }catch(error){console.error('Public blog unavailable:',error.message);return finish(request,'<!doctype html><html lang="en"><meta charset="utf-8"><title>Journal temporarily unavailable | Cowlendar</title><meta name="robots" content="noindex"><body><h1>Our journal will be back shortly.</h1><p>Please try again in a moment.</p><a href="/">Back to Cowlendar</a></body></html>',503);}
}
