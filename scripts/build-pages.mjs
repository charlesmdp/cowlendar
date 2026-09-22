import {readdir,readFile,writeFile,access} from 'node:fs/promises';
import path from 'node:path';
const root=path.resolve('dist');
async function walk(dir){let out=[];for(const e of await readdir(dir,{withFileTypes:true})){const p=path.join(dir,e.name);if(e.isDirectory())out.push(...await walk(p));else out.push(p);}return out;}
const files=await walk(root);for(const file of files.filter(f=>f.endsWith('.html'))){let html=await readFile(file,'utf8');
 // Production Pages is indexable. Preview deployments and the /2 design variant are not.
 const variant=file===path.join(root,'2/index.html');
 const preview=!(process.env.CF_PAGES==='1'&&process.env.CF_PAGES_BRANCH==='main');
 html=html.replace(/<meta\s+[^>]*name=["']robots["'][^>]*>/gi,'');
 if(preview||variant)html=html.replace('</head>','<meta name="robots" content="noindex, nofollow"></head>');
 await writeFile(file,html);
}
await access(path.join(root,'index.html'));
console.log(`Ready for Pages: ${files.length} static files, blog API in functions/.`);
