import fs from 'node:fs/promises';
import path from 'node:path';
import {createHash} from 'node:crypto';
import {build} from 'esbuild';
import {toolGuides} from '../lib/tool-guides.mjs';
import {toolPage,toolPath} from '../lib/toolkit/pages.mjs';

export async function buildToolkit(write){
  const slugs=Object.keys(toolGuides), outdir='dist/assets/toolkit';
  await fs.mkdir(outdir,{recursive:true});
  const result=await build({
    entryPoints:slugs.map(slug=>({in:'booking-tool:'+slug,out:slug})),
    outdir, entryNames:'[name]', chunkNames:'shared/[name]-[hash]',metafile:true,
    platform:'browser',format:'esm',bundle:true,splitting:true,minify:true,target:'es2022',legalComments:'inline',
    plugins:[{
      name:'booking-tools',
      setup(builder){
        builder.onResolve({filter:/^booking-tool:/},args=>({path:args.path.slice('booking-tool:'.length),namespace:'tool-page'}));
        builder.onLoad({filter:/.*/,namespace:'tool-page'},args=>({
          contents:'import {mount} from "./lib/toolkit/browser.mjs"; import tool from "./lib/toolkit/tools/'+args.path+'.mjs"; mount(tool);',
          resolveDir:process.cwd()
        }));
      }
    }]
  });
  // Only the generated chunks referenced by this build belong in the static release.
  const outputs=new Set(Object.keys(result.metafile.outputs).map(f=>path.resolve(f)));
  for(const file of await fs.readdir(outdir+'/shared')){
    const chunk=path.resolve(outdir,'shared',file);
    if(/^chunk-[A-Z0-9]+\.js$/.test(file)&&!outputs.has(chunk))await fs.unlink(chunk);
  }
  for(const slug of slugs){
    const {default:tool}=await import('../lib/toolkit/tools/'+slug+'.mjs');
    const revision=createHash('sha256').update(await fs.readFile(outdir+'/'+slug+'.js')).digest('hex').slice(0,12);
    await write(toolPath(slug),toolPage(slug,tool,revision));
  }
}
