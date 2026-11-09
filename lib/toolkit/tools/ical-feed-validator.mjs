import {select,field,escape,metric,line,table,note,copy} from '../shared.mjs';
const sample='BEGIN:VCALENDAR\r\nVERSION:2.0\r\nPRODID:-//Studio//Booking calendar//EN\r\nBEGIN:VEVENT\r\nUID:studio-sample@example.com\r\nDTSTAMP:20260101T100000Z\r\nDTSTART:20260505T090000Z\r\nDTEND:20260505T100000Z\r\nRRULE:FREQ=WEEKLY;BYDAY=TU\r\nSUMMARY:Studio workshop\r\nTRANSP:OPAQUE\r\nEND:VEVENT\r\nEND:VCALENDAR';
function inspect(input,from){
 return new Promise((resolve,reject)=>{
   const worker=new Worker('/assets/toolkit/ical-reader.js',{type:'module'});const timer=setTimeout(()=>finish(null,'Recurrence expansion took too long. Use a shorter feed.'),6000);
   function finish(report,error){worker.terminate();clearTimeout(timer);error?reject(Error(error)):resolve(report);}
   worker.onerror=()=>finish(null,'The calendar reader could not start. Reload and try again.');
   worker.onmessage=({data})=>finish(data.report,data.error);
   worker.postMessage({input,from});
 });
}
export default {
 formTitle:'Calendar source',resultTitle:'Feed diagnostics',submitLabel:'Validate calendar',
 fields:[select('source','Read calendar from','paste',[['paste','Pasted ICS text'],['file','Local .ics file'],['url','Public feed URL']]),field('from','Preview from (optional)','','date',{optional:true,hint:'Defaults to today.'}),field('ics','iCalendar text',sample,'textarea',{wide:true,when:['source','paste']}),field('upload','Choose an .ics file','','upload',{wide:true,when:['source','file'],accept:'.ics,text/calendar'}),field('url','Public iCal subscription URL','','text',{wide:true,when:['source','url'],hint:'URL mode sends the link to Cowlendar to read it once. File and paste modes stay in this browser.'})],
 async submit({form,state,refresh}){
   if(!form.reportValidity())return;const ticket=Symbol();state.request=ticket;state.loading=true;state.report=null;state.failure='';refresh();
   try{
    const data=new FormData(form), source=data.get('source');let input=data.get('ics');
    if(source==='file'){const file=data.get('upload');if(!file?.size||file.size>1000000)throw Error('Choose a non-empty .ics file under 1 MB.');input=await file.text();}
    if(source==='url'){
     const url=String(data.get('url')).replace(/^webcal:\/\//i,'https://');const r=await fetch('/api/tool-inspect',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({kind:'calendar',url})});const body=await r.json();if(!r.ok)throw Error(body.error||'The feed could not be read.');input=body.calendar;
    }
    const report=await inspect(input,data.get('from')||new Date().toISOString().slice(0,10));if(state.request===ticket)state.report=report;
   }catch(e){if(state.request===ticket)state.failure=e.message;}
   finally{if(state.request===ticket){state.loading=false;refresh();}}
 },
 onFieldChange(form,key,state){if(state){state.request=null;state.report=null;state.failure='';state.loading=false;}},
 reset({state}){state.request=null;state.report=null;state.failure='';state.loading=false;},
 run(v,asset,state={}){
  if(state.loading)return {html:'<p role="status">Reading the calendar and expanding its events…</p>',actions:[]};
  if(state.failure)return {html:'<p class="studio-error">'+escape(state.failure)+'</p>',actions:[]};
  if(!state.report)return {html:'<div class="feed-empty"><span aria-hidden="true">.ics</span><h3>Inspect your calendar feed</h3><p>Validate the preloaded weekly workshop or choose your own file. See upcoming events, time zone interpretation and free/busy settings here.</p></div>',actions:[copy('Copy sample calendar',sample)]};
  const r=state.report;
  return {html:metric('Event records',r.count)+line('Recurring series',r.series)+line('Transparent master events',r.transparent)+note('Preview starts at midnight UTC on the selected date. Floating dates are compared as wall-clock values.')+(r.rows.length?table(['Upcoming start','Event','Availability'],r.rows.map(x=>[x.start,x.name,x.busy])):note('No upcoming events in the preview window. Try an earlier start date.'))+'<h3>Findings</h3>'+(r.warnings.length?'<ul>'+r.warnings.map(s=>'<li>'+escape(s)+'</li>').join('')+'</ul>':note('No issues found in the properties checked.')),
   actions:[copy('Copy diagnostic summary',r.count+' event records · '+r.series+' recurring series.\n'+(r.warnings.join('\n')||'No issues found in the checked properties.'))]};
 }
};
