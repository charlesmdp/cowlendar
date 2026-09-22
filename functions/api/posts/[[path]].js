import {pagination,readPosts,readPost} from '../../../db/blog.mjs';
const response=(body,status=200)=>new Response(JSON.stringify(body),{status,headers:{'Content-Type':'application/json; charset=utf-8','Cache-Control':status===200?'public, max-age=0, s-maxage=60':'no-store','X-Content-Type-Options':'nosniff'}});
// Only public reads. Editorial access stays in Cloudflare's authenticated dashboard.
export async function onRequest({request,env,params}){
 if(!['GET','HEAD'].includes(request.method))return new Response(null,{status:405,headers:{Allow:'GET, HEAD'}});
 if(!env.BLOG_DB)return response({error:'Blog temporarily unavailable.'},503);
 try{
  const parts=Array.isArray(params.path)?params.path:(params.path?[params.path]:[]);
  if(parts.length>1)return response({error:'Article not found.'},404);
  let result;
  if(parts.length){const post=await readPost(env.BLOG_DB,parts[0]);result=post?response({post}):response({error:'Article not found.'},404);}
  else{const options=pagination(new URL(request.url));result=options?response(await readPosts(env.BLOG_DB,options)):response({error:'Invalid pagination.'},400);}
  return request.method==='HEAD'?new Response(null,{status:result.status,headers:result.headers}):result;
 }catch(error){console.error('Blog read failed:',error.message);return response({error:'Blog temporarily unavailable. Please try again.'},503);}
}
