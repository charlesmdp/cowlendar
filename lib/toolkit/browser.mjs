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
  function invalid(message){
    actions=[];buttons.replaceChildren();error.textContent=message;error.hidden=false;
    content.innerHTML='<p class="kit-empty">Your result will appear when the details are complete.</p>';
  }
  function refresh(){
    status.textContent=''; error.hidden=true;
    const first=form.querySelector('input:invalid, textarea:invalid, select:invalid');
    if(first){invalid((first.labels?.[0]?.querySelector('span')?.textContent||'Field')+' — '+first.validationMessage);return;}
    const data=new FormData(form),values={};
    for(const f of tool.fields){
      values[f.key]=f.type==='checks'?data.getAll(f.key):String(data.get(f.key)||'').trim();
      if(!f.optional && ['textarea','text'].includes(f.type) && !values[f.key]){invalid('Enter '+f.label.toLowerCase()+'.');return;}
    }
    try {
      const result=tool.run(values,asset);actions=result.actions;content.innerHTML=result.html;buttons.innerHTML=actionButtons(actions);
    } catch(e){invalid(e.message);}
  }
  currentExampleDates(form,tool.exampleDates);
  fieldset.disabled=false;
  form.addEventListener('submit',event=>{event.preventDefault();refresh();});
  form.addEventListener('input',event=>{if(event.target.type!=='file'){tool.onFieldChange?.(form,event.target.name);refresh();}});
  form.addEventListener('change',async event=>{
    if(event.target.type!=='file')return;
    const version=++logoVersion;
    try{
      const image=await loadLogo(event.target.files[0]);
      if(version===logoVersion){asset=image;refresh();}
    }catch(e){if(version===logoVersion){asset='';event.target.value='';refresh();status.textContent=e.message;}}
  });
  form.addEventListener('reset',()=>{logoVersion++;asset='';setTimeout(refresh,0);});
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
        const {blob,filename}=await action.perform();save(blob,filename);
      } else {
        const data=typeof action.content==='function'?action.content():action.content;
        save(new Blob([data],{type:action.type}),action.filename);
      }
    } catch{status.textContent='The export could not finish. Please try again.';}
  });
  refresh();
}
