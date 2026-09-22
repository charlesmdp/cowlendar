import {quoteApp,noShowEstimate,generateSlots,slotsCsv} from './booking-math.mjs';
const $=(s,root=document)=>root.querySelector(s);
const money=(n,currency='USD')=>new Intl.NumberFormat('en-US',{style:'currency',currency,maximumFractionDigits:2}).format(n);
const number=n=>new Intl.NumberFormat('en-US',{maximumFractionDigits:1}).format(n);
const values=form=>Object.fromEntries(new FormData(form));
function error(form,message){const el=$('[data-tool-error],[data-budget-error]',form);el.textContent=message;el.hidden=!message;}
for(const form of document.querySelectorAll('.app-budget-form')){
 const apps=JSON.parse(form.dataset.apps);
 const update=()=>{
  const data=values(form), features=[...new FormData(form).getAll('features')];
  const valid=form.checkValidity()&&features.length;
  error(form,valid?'':'Enter valid, non-negative amounts and select at least one feature.');
  const params={bookings:Number(data.bookings),value:Number(data.value),bundleShare:Number(data.bundleShare),features};
  const results=apps.map(app=>({app,quote:valid?quoteApp(app,params):null}));
  $('[data-revenue]',form).textContent=valid?`${number(params.bookings)} bookings × ${money(params.value)} = ${money(params.bookings*params.value)} monthly booking revenue`:'Update the inputs to calculate your budget.';
  for(const {app,quote:q} of results){
   const card=$(`[data-quote="${app.key}"]`,form),total=$('.quote-total',card);
   total.replaceChildren(document.createTextNode(valid?(q?money(q.total):'Confirm plan'):'—'));
   if(q){const small=document.createElement('small');small.textContent='/ month';total.append(small);}
   $('.quote-plan',card).textContent=!valid?'Enter valid inputs above.':q?`${q.plan} · ${money(q.base)} plan${q.usage?' + '+money(q.usage)+' usage':''}`:app.key==='cowlendar'?'Contact Cowlendar for a tier beyond the published revenue range.':'No verified price for this exact feature combination or volume.';
   $('.quote-year',card).textContent=q?`${money(q.total*12)} over 12 months at this monthly rate${q.note?' · '+q.note:''}`:'';
  }
  const [own,other]=results, note=$('[data-budget-verdict]',form);
  if(own.quote&&other.quote){const delta=other.quote.total-own.quote.total;
   note.textContent=Math.abs(delta)<.005?'The documented monthly app costs match for this scenario. Compare the workflow and support.':delta>0?`For this scenario, Cowlendar is ${money(delta)} less per month than ${other.app.name} (${money(delta*12)} over 12 monthly payments).`:`For this scenario, ${other.app.name} is ${money(-delta)} less per month. Cowlendar may still suit a broader mix of booking workflows.`;
  }else note.textContent=valid?'An unconfirmed price is not a missing feature. Ask the vendor for the exact tier before deciding.':'';
 };
 form.addEventListener('submit',e=>e.preventDefault());form.addEventListener('input',update);update();
}
let lossSummary='',slotsSummary='';
const lossForm=$('#no-show-form');
if(lossForm){const update=()=>{
 const d=values(lossForm),p=Object.fromEntries(['bookings','price','rate','refill','target','minutes'].map(k=>[k,Number(d[k])]));
 const result=lossForm.checkValidity()?noShowEstimate(p):null;
 error(lossForm,result?'':'Enter valid amounts. The target no-show rate must be no greater than the current rate.');
 const out=$('.tool-result',lossForm.parentElement);out.classList.toggle('result-invalid',!result);
 $('[data-copy="no-show"]').disabled=!result;
 if(!result){for(const id of ['loss-month','loss-annual','loss-slots','loss-hours','loss-recovery'])$('#'+id).textContent='—';$('#loss-rate').textContent='Update the inputs to see the result.';$('#loss-fill').style.width='0%';lossSummary='';return;}
 $('#loss-month').textContent=money(result.monthly,d.currency);$('#loss-annual').textContent=`${money(result.yearly,d.currency)} at the same rate over a year`;
 $('#loss-slots').textContent=number(result.unfilled);$('#loss-hours').textContent=number(result.hours)+' h';$('#loss-recovery').textContent=money(result.potential,d.currency);
 $('#loss-fill').style.width=p.rate+'%';$('#loss-rate').textContent=`${number(p.rate)}% missed · ${number(100-p.rate)}% attended`;
 lossSummary=`Cowlendar no-show estimate\n${p.bookings} appointments/month · ${money(p.price,d.currency)} average value\nNo-show rate: ${p.rate}% · refilled: ${p.refill}%\nMonthly revenue at risk: ${money(result.monthly,d.currency)}\nAnnualized: ${money(result.yearly,d.currency)}\nUnfilled appointments: ${number(result.unfilled)} · ${number(result.hours)} appointment hours\nTarget rate: ${p.target}% → ${money(result.potential,d.currency)} less revenue at risk/month\nPlanning estimate, not profit or guaranteed recovery.\nhttps://cowlendar.com/free-tools/no-show-calculator`;
 };lossForm.addEventListener('submit',e=>e.preventDefault());lossForm.addEventListener('input',update);lossForm.addEventListener('reset',()=>setTimeout(update,0));update();}
const slotForm=$('#slot-form');
if(slotForm){const update=()=>{
 const hasBreak=slotForm.elements.useBreak.checked;
 $('[data-break-fields]',slotForm).hidden=!hasBreak;
 for(const i of $('[data-break-fields]',slotForm).querySelectorAll('input'))i.disabled=!hasBreak;
 const d=values(slotForm);
 const result=slotForm.checkValidity()?generateSlots({start:d.start,end:d.end,duration:Number(d.duration),buffer:Number(d.buffer),capacity:Number(d.capacity),breakStart:hasBreak?d.breakStart:'',breakEnd:hasBreak?d.breakEnd:''}):null;
 error(slotForm,result?'':'Check your times: closing must follow opening, and the break must be inside the working day. Use whole minutes and a capacity of at least 1.');
 const download=$('#download-slots');download.setAttribute('aria-disabled',String(!result?.slots.length));
 if(result?.slots.length){download.href='data:text/csv;charset=utf-8,'+encodeURIComponent(slotsCsv(result.slots));download.removeAttribute('tabindex');}else{download.removeAttribute('href');download.setAttribute('tabindex','-1');}
 $('[data-copy="slots"]').disabled=!result?.slots.length;
 $('#slot-list').replaceChildren();$('#slot-empty').hidden=!result||result.slots.length>0;
 if(!result){$('#slot-count').textContent='—';$('#slot-summary').textContent='Update the inputs to create your schedule.';$('#slot-service').textContent='';$('#slot-open').textContent='';slotsSummary='';return;}
 $('#slot-count').textContent=number(result.slots.length);$('#slot-summary').textContent=`time slots · ${number(result.appointments)} bookable places`;
 $('#slot-service').textContent=number(result.serviceMinutes/60)+' h of service time';$('#slot-open').textContent=number(result.openMinutes/60)+' h open, excluding break';
 const fragment=document.createDocumentFragment();
 for(const slot of result.slots){const li=document.createElement('li');li.textContent=`${slot.start} → ${slot.end}`;if(slot.capacity>1){const tag=document.createElement('small');tag.textContent=`${slot.capacity} places`;li.append(tag);}fragment.append(li);}
 $('#slot-list').append(fragment);
 slotsSummary='Daily appointment schedule (local times, no date/time zone assigned)\n'+result.slots.map(s=>`${s.start}–${s.end} · ${s.capacity} place${s.capacity>1?'s':''}`).join('\n')+`\n${result.appointments} total bookable places\nhttps://cowlendar.com/free-tools/time-slot-generator`;
 };slotForm.addEventListener('submit',e=>e.preventDefault());slotForm.addEventListener('input',update);slotForm.addEventListener('reset',()=>setTimeout(update,0));update();

}
for(const button of document.querySelectorAll('[data-copy]'))button.addEventListener('click',async()=>{
 const summary=button.dataset.copy==='slots'?slotsSummary:lossSummary,status=$('.copy-status',button.parentElement)||$('.copy-status',button.closest('.tool-result'));
 try{await navigator.clipboard.writeText(summary);status.textContent='Copied!';}catch{status.textContent='Copy is unavailable in this browser. You can select the results directly.';}
});
