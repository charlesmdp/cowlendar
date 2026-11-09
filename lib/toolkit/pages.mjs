import {layout,esc,ORIGIN,schemaBreadcrumb} from '../editorial.mjs';
import {toolGuides} from '../tool-guides.mjs';
import {toolArt} from '../tool-art.mjs';
import {optionsFor} from './shared.mjs';
import {actionButtons} from './browser.mjs';

const existing={
 'service-price-calculator':{name:'Service Price Calculator',short:'Set a service price that covers time, costs and your target margin.'},
 'time-slot-generator':{name:'Appointment Time Slot Generator',short:'Build a day of available appointments with breaks and buffers.'},
 'timezone-converter':{name:'Time Zone Converter',short:'Compare local times across cities to find a shared meeting time.'},
 'no-show-calculator':{name:'No-Show Cost Calculator',short:'Estimate how much empty appointments cost your business.'}
};
const catalog={...toolGuides,...existing};
export const groups=[
 {id:'pricing',name:'Pricing & payments',theme:'apricot',tools:['workshop-break-even-calculator','booking-deposit-calculator','equipment-rental-quote-generator','service-price-calculator','no-show-calculator']},
 {id:'planning',name:'Scheduling & capacity',theme:'mint',tools:['rental-inventory-planner','salon-capacity-calculator','recurring-class-schedule-generator','time-slot-generator','timezone-converter']},
 {id:'customers',name:'Customer communication',theme:'lilac',tools:['booking-qr-code-generator','appointment-reminder-generator','add-to-calendar-link-generator','booking-intake-form-builder']}
];
export const toolPath=slug=>'/free-tools/'+slug;
const newSlugs=Object.keys(toolGuides);
export const allToolSlugs=Object.keys(catalog);
const style=html=>html.replace('</head>','<link rel="stylesheet" href="/booking-tools.css"></head>');
const arrow='<span class="kit-arrow" aria-hidden="true">↗</span>';
function card(slug){
 const item=catalog[slug];
 return '<a class="kit-card" href="'+toolPath(slug)+'"><span class="kit-mini-art">'+toolArt(slug)+'</span><span><strong>'+esc(item.name)+'</strong><small>'+esc(item.short)+'</small></span>'+arrow+'</a>';
}
export function toolsHub(){
 const path='/free-tools', list=groups.flatMap(g=>g.tools);
 const body='<main id="content" class="kit-wrap"><nav class="kit-crumbs" aria-label="Breadcrumb"><a href="/">Home</a><span>/</span>Free tools</nav><section class="kit-hub-hero"><div><h1>Free booking tools<span>.</span></h1><p>Plan a profitable class, spot a rental conflict or make a sign customers can scan. Pick a tool and start with your own numbers.</p></div><div class="kit-still" aria-hidden="true">'+['workshop-break-even-calculator','booking-qr-code-generator','recurring-class-schedule-generator'].map(toolArt).join('')+'</div></section><nav class="kit-jumps" aria-label="Tool categories">'+groups.map(g=>'<a href="#'+g.id+'">'+esc(g.name)+'</a>').join('')+'</nav>'+groups.map(g=>'<section class="kit-group '+g.theme+'" id="'+g.id+'"><h2>'+esc(g.name)+'</h2><div class="kit-cards">'+g.tools.map(card).join('')+'</div></section>').join('')+'</main>';
 return style(layout({title:'Free Booking Tools for Shopify & Service Businesses | Cowlendar',description:'Explore 14 free tools for appointments, rentals and classes. Calculate booking deposits, check capacity, generate QR codes and export schedules. No account needed.',path,body,extraClass:'toolkit',image:'/assets/toolkit/free-tools.png',schema:[schemaBreadcrumb([['Home','/'],['Free tools',path]]),{'@context':'https://schema.org','@type':'ItemList',name:'Free booking tools',numberOfItems:list.length,itemListElement:list.map((slug,i)=>({'@type':'ListItem',position:i+1,name:catalog[slug].name,url:ORIGIN+toolPath(slug)}))}]}));
}
function control(f){
 const name=esc(f.key), label=esc(f.label), value=esc(f.value), id='field-'+name;
 const required=f.optional?'':' required', hint=f.hint?' aria-describedby="'+id+'-help"':'';
 const help=f.hint?'<small id="'+id+'-help">'+esc(f.hint)+'</small>':'';
 if(f.type==='checks')return '<fieldset class="kit-days"><legend>'+label+'</legend>'+optionsFor(f).map(([val,text])=>'<label><input type="checkbox" name="'+name+'" value="'+esc(val)+'"'+(f.value.includes(val)?' checked':'')+'><span>'+esc(text)+'</span></label>').join('')+'</fieldset>';
 let element;
 if(f.type==='textarea')element='<textarea name="'+name+'" id="'+id+'" rows="4" maxlength="160000"'+hint+required+'>'+value+'</textarea>';
 else if(f.type==='select')element='<select id="'+id+'" name="'+name+'">'+optionsFor(f).map(([val,text])=>'<option value="'+esc(val)+'"'+(val===f.value?' selected':'')+'>'+esc(text)+'</option>').join('')+'</select>';
 else if(f.type==='file')element='<input id="'+id+'" name="'+name+'" type="file" accept="image/png,image/jpeg,image/webp"'+hint+'>';
 else element='<input id="'+id+'" name="'+name+'" type="'+f.type+'" value="'+value+'"'+(f.type==='number'?' min="'+f.min+'" max="'+f.max+'" step="'+f.step+'"':' maxlength="'+(f.type==='url'?1600:300)+'"')+required+hint+'>';
 return '<label class="kit-field'+(f.wide||f.type==='file'?' wide':'')+'" for="'+id+'"><span>'+label+'</span>'+element+help+'</label>';
}
export function toolPage(slug,tool,revision=''){
 const g=toolGuides[slug],path=toolPath(slug), group=groups.find(x=>x.tools.includes(slug));
 const values=Object.fromEntries(tool.fields.map(f=>[f.key,f.value])), initial=tool.run(values,'');
 const body='<main id="content" class="kit-wrap '+group.theme+'"><nav class="kit-crumbs" aria-label="Breadcrumb"><a href="/">Home</a><span>/</span><a href="/free-tools">Free tools</a><span>/</span>'+esc(g.name)+'</nav>'
  +'<section class="kit-lead"><div class="kit-hero-art">'+toolArt(slug)+'</div><div><a class="kit-cat" href="/free-tools#'+group.id+'">'+group.name+'</a><h1>'+esc(g.name)+'</h1><p>'+esc(g.short)+'</p></div></section>'
  +'<section class="kit-desk" aria-label="'+esc(g.name)+'"><form id="kit-form"><h2>'+esc(tool.formTitle)+'</h2><a class="kit-mobile-jump" href="#result-label">View result ↓</a><fieldset class="kit-controls" disabled><legend class="sr-only">'+esc(tool.formTitle)+'</legend>'+tool.fields.map(control).join('')+'<button class="kit-reset" type="reset">Reset example</button></fieldset><noscript>Enable JavaScript to edit this example and export your own result.</noscript></form>'
  +'<section class="kit-sheet" aria-labelledby="result-label"><h2 id="result-label">'+esc(tool.resultTitle)+'</h2><p id="kit-error" role="status" hidden></p><div id="kit-result" aria-live="polite">'+initial.html+'</div><div id="kit-actions">'+actionButtons(initial.actions)+'</div><div id="kit-status" role="status"></div><a class="kit-mobile-jump" href="#kit-form">Edit details ↑</a></section></section>'
  +'<section class="kit-guide"><div><h2>'+esc(g.guideHeading)+'</h2><p>'+esc(g.guide)+'</p><a href="'+g.solution+'">'+esc(g.solutionLabel)+' →</a></div><aside><h3>Worked example</h3><p>'+esc(g.example)+'</p></aside></section>'
  +'<section class="kit-faq"><h2>Common questions</h2><div>'+g.faq.map(([q,a])=>'<details><summary>'+esc(q)+'</summary><p>'+esc(a)+'</p></details>').join('')+'</div></section><nav class="kit-related" aria-label="Related tools"><h2>Related free tools</h2><div class="kit-cards">'+g.related.map(card).join('')+'</div></nav></main>';
 return style(layout({title:g.title,description:g.description,path,body,extraClass:'toolkit',image:'/assets/toolkit/'+slug+'.png',schema:[schemaBreadcrumb([['Home','/'],['Free tools','/free-tools'],[g.name,path]]),{'@context':'https://schema.org','@type':'WebApplication',name:g.name,url:ORIGIN+path,description:g.description,applicationCategory:'BusinessApplication',operatingSystem:'Any',isAccessibleForFree:true,offers:{'@type':'Offer',price:'0',priceCurrency:'USD'}}]})).replace('</body>','<script type="module" src="/assets/toolkit/'+slug+'.js'+(revision?'?v='+revision:'')+'"></script></body>');
}
export function addSolutionTools(html,path){
 const matching=newSlugs.filter(slug=>toolGuides[slug].solution===path);
 if(!matching.length)return html;
 const links=matching.map(slug=>'<a href="'+toolPath(slug)+'">'+esc(catalog[slug].name)+' →</a>').join('');
 return html.replace('<strong>Keep exploring</strong>','<strong>Free tools for your business</strong>'+links+'<strong>Keep exploring</strong>');
}
