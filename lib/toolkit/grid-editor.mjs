const editors={
 'booking-waitlist-matcher':['queue',['Party','Size','Date or *','Earliest','Latest'],['New party','1','*','09:00','18:00']],
 'salon-commission-calculator':['sales',['Stylist','Services','Retail','Tips'],['Stylist','0','0','0']],
 'class-check-in-sheet-generator':['roster',['Booking name','Guests'],['New group','1']],
 'rental-inventory-planner':['rows',['Pickup','Return','Units'],['','','1']],
 'equipment-rental-quote-generator':['items',['Equipment','Quantity','Daily rate'],['New item','1','0']]
};
function node(tag,cls,text){
 const el=document.createElement(tag);if(cls)el.className=cls;if(text)el.textContent=text;return el;
}
export function mountGrid(form,slug){
 const config=editors[slug];if(!config)return;
 const [key,labels,defaults]=config,source=form.elements.namedItem(key),label=source.closest('label');
 const group=node('div','studio-editor');const heading=node('div','studio-editor-title'),list=node('div','studio-edit-rows');
 const toggle=node('button','kit-reset','Paste rows'), add=node('button','studio-add','+ Add row');
 toggle.type=add.type='button';heading.append(node('strong','',label.querySelector('span').textContent),toggle);group.append(heading,list,add);label.before(group);
 let raw=false;
 function values(){return [...list.children].map(row=>[...row.querySelectorAll('input')].map(i=>i.value.trim()).join('\t')).join('\n');}
 function sync(){source.value=values();source.dispatchEvent(new Event('input',{bubbles:true}));}
 function row(cells){
  const el=node('div','studio-edit-row');
  labels.forEach((name,i)=>{
   const l=node('label'),input=node('input');input.type='text';input.value=cells[i]||'';input.setAttribute('aria-label',name);l.append(node('span','',name),input);el.append(l);
  });
  const remove=node('button','studio-remove','×');remove.type='button';remove.setAttribute('aria-label','Remove row');
  remove.addEventListener('click',()=>{el.remove();sync();add.focus();});el.append(remove);list.append(el);return el;
 }
 function draw(){list.replaceChildren();for(const text of source.value.split(/\r?\n/).filter(Boolean))row(text.split(text.includes('\t')?'\t':','));}
 function mode(){
  label.hidden=!raw;list.hidden=raw;add.hidden=raw;toggle.textContent=raw?'Edit as rows':'Paste rows';if(!raw)draw();
 }
 list.addEventListener('input',event=>{event.stopPropagation();sync();});
 toggle.addEventListener('click',()=>{raw=!raw;mode();if(raw)source.focus();});
 add.addEventListener('click',()=>{row(defaults).querySelector('input').focus();sync();});
 form.addEventListener('reset',()=>setTimeout(()=>{raw=false;mode();},0));mode();
}
