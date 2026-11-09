// Re-render social sharing images after editing a tool's name or artwork.
import fs from 'node:fs/promises';
import sharp from 'sharp';
import {toolGuides} from '../lib/tool-guides.mjs';
import {toolArt} from '../lib/tool-art.mjs';
import {escape} from '../lib/toolkit/shared.mjs';
import {groups} from '../lib/toolkit/pages.mjs';

const folder='dist/assets/toolkit';
await fs.mkdir(folder,{recursive:true});
const colors={apricot:'#faecda',lilac:'#efeafd',mint:'#e4f1e8'};
const cards=[['free-tools','Free booking tools','workshop-break-even-calculator','mint'],...Object.entries(toolGuides).map(([key,g])=>[key,g.name,key,groups.find(x=>x.tools.includes(key)).theme])];
for(const [slug,title,icon,theme] of cards){
  const lines=[''];
  for(const word of title.split(' ')){
    const i=lines.length-1;
    if(lines[i] && (lines[i]+' '+word).length>19)lines.push(word);
    else lines[i]=(lines[i]+' '+word).trim();
  }
  const art=toolArt(icon).replace('width="96" height="96"','x="760" y="158" width="340" height="340"');
  const text=lines.map((line,i)=>'<text x="80" y="'+(290+i*88)+'" font-size="66" font-weight="bold">'+escape(line)+'</text>').join('');
  const svg='<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630"><rect width="1200" height="630" fill="#fbfaf6"/><rect x="38" y="38" width="1124" height="554" rx="38" fill="'+colors[theme]+'"/><g fill="#312f38" font-family="Helvetica, Arial, sans-serif"><text x="80" y="120" font-size="33">Cowlendar</text>'+text+'<text x="80" y="544" font-size="24">cowlendar.com/free-tools</text></g>'+art+'</svg>';
  await sharp(Buffer.from(svg)).png({palette:true,quality:94}).toFile(folder+'/'+slug+'.png');
}
