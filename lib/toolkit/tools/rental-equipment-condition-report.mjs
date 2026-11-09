import {field,select,artworkPhoto,escape,printAction,copy,note} from '../shared.mjs';
const ratings=['Good','Existing wear','Damaged','Needs review','Not inspected'];
const fields=[field('asset','Equipment & unit ID','Touring kayak · K-07'),field('booking','Rental reference','R-1007'),field('inspector','Checked by','Harbour Rentals'),field('renter','Renter','Morgan Lee'),
 field('outDate','Pickup date','2027-05-08','date'),select('outGrade','Pickup condition','Existing wear',ratings),field('outNotes','Pickup notes','Small scratch on the left side of the hull.','textarea',{wide:true,optional:true}),artworkPhoto('outPhoto','Pickup photo'),
 field('inDate','Return date (optional)','','date',{optional:true}),select('inGrade','Return condition','Not inspected',ratings),field('inNotes','Return notes','','textarea',{wide:true,optional:true}),artworkPhoto('inPhoto','Return photo')];
const prefix='cwl-inspection-v1/';
const lastKey='cwl-last-inspection-v1';
function applyDraft(form,state,draft){
 for(const f of fields.filter(f=>f.type!=='photo'))if(typeof draft.values?.[f.key]==='string')form.elements.namedItem(f.key).value=draft.values[f.key];
 state.photos={};state.photoVersions={};
 for(const key of ['outPhoto','inPhoto']){
   form.elements.namedItem(key).value='';
   if(/^data:image\/png;base64,[A-Za-z0-9+/=]+$/.test(draft.photos?.[key]||''))state.photos[key]=draft.photos[key];
 }
}
export default {
 formTitle:'Inspection record',resultTitle:'Equipment condition report',
 fields, exampleDates:{anchor:'2027-05-08',fields:['outDate']},
 mount({form,state,refresh,status}){
   const library=document.createElement('div'),label=document.createElement('label'),picker=document.createElement('select'),remove=document.createElement('button');
   library.className='inspection-library';label.textContent='Saved inspections on this device';label.append(picker);
   remove.type='button';remove.textContent='Delete selected draft';remove.className='kit-reset';library.append(label,remove);
   form.querySelector('.kit-controls').prepend(library);
   function sync(){
     try{
       const keys=Object.keys(localStorage).filter(k=>k.startsWith(prefix)).sort();
       picker.replaceChildren(new Option('Choose a saved inspection',''));
       for(const k of keys){const saved=JSON.parse(localStorage.getItem(k));picker.add(new Option(saved.values.booking+' · '+saved.values.asset,k));}
       library.hidden=!keys.length;picker.value=state.currentDraft||'';remove.hidden=!picker.value;
     }catch{library.hidden=true;}
   }
   function open(key){
     if(!key)return;
     try{const draft=JSON.parse(localStorage.getItem(key));if(!draft)return;applyDraft(form,state,draft);state.currentDraft=key;localStorage.setItem(lastKey,key);sync();refresh();status.textContent='Saved inspection reopened on this device.';}catch{status.textContent='Could not open this inspection.';}
   }
   state.syncDrafts=sync;
   picker.addEventListener('change',()=>open(picker.value));
   remove.addEventListener('click',()=>{if(!picker.value)return;try{localStorage.removeItem(picker.value);localStorage.removeItem(lastKey);state.currentDraft='';sync();status.textContent='Saved draft deleted. The visible report is still available.';}catch{status.textContent='Device storage is unavailable.';}});
   sync();try{open(localStorage.getItem(lastKey));}catch{}
 },
 reset({state}){state.currentDraft='';try{localStorage.removeItem(lastKey);}catch{}state.syncDrafts?.();},
 run(v,asset,state={}){
  if(v.inDate && v.inDate<v.outDate)throw new Error('The return cannot be before pickup.');
  if(!v.inDate&&(v.inGrade!=='Not inspected'||v.inNotes||state.photos?.inPhoto))throw new Error('Add the return date to record the return inspection.');
  const panel=(phase,label)=>{const src=state.photos?.[phase+'Photo'];return '<section class="condition-panel"><h4>'+label+'</h4><small>'+escape(v[phase+'Date']||'Awaiting return')+'</small>'+(src?'<img src="'+escape(src)+'" alt="'+label+' condition photo">':'<div class="photo-slot"><span aria-hidden="true">▧</span> Photo space</div>')+'<b>'+escape(v[phase+'Grade'])+'</b><p>'+escape(v[phase+'Notes'])+'</p></section>';};
  return {html:'<article class="inspection-paper"><header><small>Equipment inspection · '+escape(v.booking)+'</small><h3>'+escape(v.asset)+'</h3><p>'+escape(v.renter)+' · Checked by '+escape(v.inspector)+'</p></header><div class="inspection-pair">'+panel('out','Pickup')+panel('in','Return')+'</div></article>'+note('Save the pickup on this device, then choose the matching reference and equipment when it returns. Saving the same reference and unit updates that draft.'),
    actions:[printAction,{label:'Save on this device',perform({status}){try{const key=prefix+JSON.stringify([v.booking,v.asset]);localStorage.setItem(key,JSON.stringify({values:v,photos:state.photos}));state.currentDraft=key;localStorage.setItem(lastKey,key);state.syncDrafts?.();status.textContent='Inspection and photos saved on this device.';}catch{status.textContent='Device storage is full or unavailable. Print or save the PDF instead.';}}},copy('Copy inspection notes',[v.asset,v.booking,v.renter,'Pickup: '+v.outGrade+' · '+v.outNotes,'Return: '+v.inGrade+' · '+v.inNotes].join('\n'))]};
 }
};
