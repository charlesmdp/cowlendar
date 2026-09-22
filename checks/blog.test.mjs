import test from 'node:test';
import assert from 'node:assert/strict';
import {DatabaseSync} from 'node:sqlite';
import {readFileSync} from 'node:fs';
import {readPosts,readPost,pagination} from '../db/blog.mjs';
import {onRequest} from '../functions/api/posts/[[path]].js';
function fixture() {
 const sqlite=new DatabaseSync(':memory:');
 sqlite.exec(readFileSync(new URL('../cloudflare/migrations/0000_smiling_grey_gargoyle.sql',import.meta.url),'utf8'));
 const insert=sqlite.prepare('INSERT INTO blog_posts (slug,title,status,published_at) VALUES (?,?,?,?)');
 insert.run('live','Public article','published',100);
 insert.run('draft','Private draft','draft',90);
 insert.run('scheduled','Future article','published',9999999999);
 const db={prepare(sql) {
  const statement=sqlite.prepare(sql);
  return {bind(...params) {
   return {
    async all(){return {results:statement.all(...params),success:true};},
    async first(){return statement.get(...params)||null;}
   };
  }};
 }};
 return {sqlite,db};
}
test('public list and detail never expose draft or scheduled articles',async()=>{const {sqlite,db}=fixture();try{const list=await readPosts(db,{limit:12,page:1,offset:0},200);assert.deepEqual(list.posts.map(p=>p.slug),['live']);assert.equal(await readPost(db,'draft',200),null);assert.equal(await readPost(db,'scheduled',200),null);assert.equal((await readPost(db,'live',200)).title,'Public article');assert.equal(await readPost(db,"live' OR 1=1 --",200),null);}finally{sqlite.close();}});
test('pagination is bounded and returns an honest hasMore',async()=>{assert.equal(pagination(new URL('https://x.test/?limit=999')),null);assert.equal(pagination(new URL('https://x.test/?page=-1')),null);const {sqlite,db}=fixture();try{sqlite.exec("INSERT INTO blog_posts(slug,title,status,published_at) VALUES('live-two','Second','published',150)");const first=await readPosts(db,{limit:1,page:1,offset:0},200);assert.equal(first.posts[0].slug,'live-two');assert.equal(first.hasMore,true);assert.equal((await readPosts(db,{limit:1,page:2,offset:1},200)).hasMore,false);}finally{sqlite.close();}});
test('editorial constraints reject invalid publication state',()=>{const {sqlite}=fixture();try{assert.throws(()=>sqlite.exec("INSERT INTO blog_posts(slug,title,status) VALUES ('bad','Bad','published')"));assert.throws(()=>sqlite.exec("INSERT INTO blog_posts(slug,title) VALUES ('bad/slug','Bad')"));assert.throws(()=>sqlite.exec("INSERT INTO blog_posts(slug,title) VALUES ('empty',' ' )"));const plan=sqlite.prepare("EXPLAIN QUERY PLAN SELECT slug FROM blog_posts WHERE status='published' AND published_at <= ? ORDER BY published_at DESC").all(200);assert.ok(plan.some(p=>p.detail.includes('idx_blog_posts_status_published_at')));}finally{sqlite.close();}});
test('API is read-only and unavailable without a database',async()=>{const context={env:{},params:{path:[]}};const post=await onRequest({...context,request:new Request('https://x.test/api/posts',{method:'POST'})});assert.equal(post.status,405);const get=await onRequest({...context,request:new Request('https://x.test/api/posts')});assert.equal(get.status,503);assert.equal(get.headers.get('cache-control'),'no-store');});
test('API returns 404 for drafts, validates pagination and supports HEAD',async()=>{const {sqlite,db}=fixture();try{const ctx={env:{BLOG_DB:db}};assert.equal((await onRequest({...ctx,params:{path:['draft']},request:new Request('https://x.test/api/posts/draft')})).status,404);assert.equal((await onRequest({...ctx,params:{path:[]},request:new Request('https://x.test/api/posts?limit=0')})).status,400);const head=await onRequest({...ctx,params:{path:[]},request:new Request('https://x.test/api/posts',{method:'HEAD'})});assert.equal(head.status,200);assert.equal(await head.text(),'');}finally{sqlite.close();}});
