import {mountGrid} from './grid-editor.mjs';
import {escape} from './shared.mjs';

export function actionButtons(actions) {
  return actions.map((a,i)=>a.href
    ? '<a class="kit-button" href="'+escape(a.href)+'" target="_blank" rel="noopener noreferrer">'+escape(a.label)+'</a>'
    : '<button class="kit-button" type="button" data-action="'+i+'">'+escape(a.label)+'</button>').join('');
}
function save(blob,filename){
  const url=URL.createObjectURL(blob), link=document.createElement('a');
  link.href=url;link.download=filename;document.body.append(link);link.click();link.remove();
  setTimeout(()=>URL.revokeObjectURL(url),30000);
}
async function loadLogo(file){
  if(!file)return '';
  if(!['image/png','image/jpeg','image/webp'].includes(file.type)||file.size>3*1024*1024)throw new Error('Choose a PNG, JPEG or WebP logo smaller than 3 MB.');
  const src=URL.createObjectURL(file);
  try {
    const image=new Image();image.src=src;await image.decode();
    const scale=Math.min(1,600/Math.max(image.naturalWidth,image.naturalHeight));
    const canvas=document.createElement('canvas');canvas.width=Math.max(1,Math.round(image.naturalWidth*scale));canvas.height=Math.max(1,Math.round(image.naturalHeight*scale));
    canvas.getContext('2d').drawImage(image,0,0,canvas.width,canvas.height);
    return canvas.toDataURL('image/png');
  } finally {URL.revokeObjectURL(src);}
}
function currentExampleDates(form,example) {
  if(!example)return;
  const anchor=Date.parse(example.anchor+'T00:00:00Z'), today=new Date();
  const localDay=Date.UTC(today.getFullYear(),today.getMonth(),today.getDate());
  const gap=(new Date(anchor).getUTCDay()-today.getDay()+7)%7;
  const diff=localDay+gap*86400000-anchor;
  for(const name of example.fields){
    const field=form.elements.namedItem(name), untouched=field.value===field.defaultValue;
    const value=field.defaultValue.replace(/\d{4}-\d{2}-\d{2}/g,iso=>new Date(Date.parse(iso+'T00:00:00Z')+diff).toISOString().slice(0,10));
    field.defaultValue=value;
    if(untouched)field.value=value;
  }
}
export function mount(tool){
  const form=document.querySelector('#kit-form'), fieldset=form.querySelector('fieldset');
  const content=document.querySelector('#kit-result'),buttons=document.querySelector('#kit-actions');
  const status=document.querySelector('#kit-status'),error=document.querySelector('#kit-error');
  let actions=[],asset='',logoVersion=0;
  const state={photos:{},photoVersions:{}};
  const context={form,state,content,status,refresh};
  const extraFileInputs=tool.fields.filter(f=>f.type==='photo');
  function invalid(message){
    actions=[];buttons.replaceChildren();error.textContent=message;error.hidden=false;
    content.innerHTML='<p class="kit-empty">Your result will appear when the details are complete.</p>';
  }
  function refresh(){
    status.textContent=''; error.hidden=true;
    for(const f of tool.fields.filter(f=>f.when)){
      const widget=form.elements.namedItem(f.key);
      const visible=form.elements.namedItem(f.when[0]).value===f.when[1];
      widget.disabled=!visible;widget.closest('label').hidden=!visible;
    }
    const first=form.querySelector('input:invalid, textarea:invalid, select:invalid');
    if(first){invalid((first.labels?.[0]?.querySelector('span')?.textContent||'Field')+' — '+first.validationMessage);return;}
    const data=new FormData(form),values={};
    for(const f of tool.fields){
      if(f.when && !data.has(f.key))continue;
      values[f.key]=f.type==='checks'?data.getAll(f.key):String(data.get(f.key)||'').trim();
      if(!f.optional && ['textarea','text'].includes(f.type) && !values[f.key]){invalid('Enter '+f.label.toLowerCase()+'.');return;}
    }
    try {
      const result=tool.run(values,asset,state);actions=result.actions;content.innerHTML=result.html;buttons.innerHTML=actionButtons(actions);
    } catch(e){invalid(e.message);}
  }
  const main=form.closest('main'), switcher=main.querySelector('.studio-switch');
  function setView(view){
    main.dataset.view=view;
    switcher.querySelectorAll('button').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.view===view)));
  }
  if(switcher){
    const compact = window.matchMedia('(max-width: 680px)');
    function syncSwitchVisibility() {
      switcher.hidden = !compact.matches;
    }
    syncSwitchVisibility();
    compact.addEventListener('change', syncSwitchVisibility);
    setView(tool.submit?'settings':'result');
    switcher.addEventListener('click',e=>{const b=e.target.closest('button');if(b)setView(b.dataset.view);});
    main.querySelectorAll('.kit-mobile-jump').forEach(a=>a.addEventListener('click',()=>setView(a.hash==='#kit-form'?'settings':'result')));
    form.addEventListener('submit',()=>{if(form.checkValidity())setView('result');});
  }
  currentExampleDates(form,tool.exampleDates);
  fieldset.disabled=false;
  form.addEventListener('submit',event=>{event.preventDefault();if(tool.submit)tool.submit(context);else refresh();});
  form.addEventListener('input',event=>{if(event.target.type!=='file'){tool.onFieldChange?.(form,event.target.name,state);refresh();}});
  form.addEventListener('change',async event=>{
    if(event.target.type!=='file')return;
    const key=event.target.name;
    if(extraFileInputs.some(f=>f.key===key)){
      const version=Symbol();state.photoVersions[key]=version;
      try{
        const photo=await loadLogo(event.target.files[0]);
        if(state.photoVersions[key]===version){state.photos[key]=photo;refresh();}
      }catch{if(state.photoVersions[key]===version){event.target.value='';delete state.photos[key];refresh();status.textContent='Choose a valid PNG, JPEG or WebP smaller than 3 MB.';}}
      return;
    }
    if(key!=='logo'){tool.onFieldChange?.(form,key,state);refresh();return;}
    const version=++logoVersion;
    try{
      const image=await loadLogo(event.target.files[0]);
      if(version===logoVersion){asset=image;refresh();}
    }catch(e){if(version===logoVersion){asset='';event.target.value='';refresh();status.textContent=e.message;}}
  });
  form.addEventListener('reset',()=>{logoVersion++;asset='';state.photos={};state.photoVersions={};tool.reset?.(context);setTimeout(refresh,0);});
  buttons.addEventListener('click',async event=>{
    const button=event.target.closest('button[data-action]');
    if(!button)return;
    const action=actions[Number(button.dataset.action)];
    try {
      if(action.print){window.print();return;}
      if(action.text!==undefined){
        try {await navigator.clipboard.writeText(action.text);status.textContent='Copied to clipboard.';}
        catch {
          const text=document.createElement('textarea');text.value=action.text;text.readOnly=true;text.setAttribute('aria-label','Text to copy');status.replaceChildren('Select and copy the text below.',text);text.focus();text.select();
        }
      } else if(action.perform){
        const file=await action.perform(context);if(file)save(file.blob,file.filename);
      } else {
        const data=typeof action.content==='function'?action.content():action.content;
        save(new Blob([data],{type:action.type}),action.filename);
      }
    } catch{status.textContent='The export could not finish. Please try again.';}
  });
  mountGrid(form,form.closest('main').dataset.tool);
  tool.mount?.(context);
  refresh();
}
