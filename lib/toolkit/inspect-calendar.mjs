import ICAL from 'ical.js';
import {Temporal} from '@js-temporal/polyfill';
const prop=(c,k)=>String(c.getFirstPropertyValue(k)||'');
function describeTime(t,c){
 const local=t.toString(),declared=c.getFirstProperty('dtstart')?.getParameter('tzid');
 if(t.isDate)return {label:local+' (all day)',order:Date.parse(local+'T00:00:00Z')};
 if(t.zone?.tzid==='UTC')return {label:local+' · UTC',order:t.toUnixTime()*1000};
 if(t.zone && t.zone.tzid!=='floating')return {label:local+' · '+t.zone.tzid,order:t.toUnixTime()*1000};
 if(declared){
   const wall=Temporal.PlainDateTime.from(local);
   try{return {label:local+' · '+declared,order:wall.toZonedDateTime(declared).epochMilliseconds};}catch{return {label:local+' · unresolved '+declared,order:Date.parse(local+'Z')};}
 }
 return {label:local+' · floating',order:Date.parse(local+'Z')};
}
export function inspectCalendar(input,fromDate){
 if(input.length>1000000)throw Error('Use a calendar under 1 MB.');
 if(!/^BEGIN:VCALENDAR\s*$/im.test(input.trim())||!/^END:VCALENDAR\s*$/im.test(input.trim()))throw Error('The file needs BEGIN:VCALENDAR and END:VCALENDAR.');
 const root=new ICAL.Component(ICAL.parse(input.trim()));if(root.name!=='vcalendar')throw Error('Choose one iCalendar file at a time.');
 const components=root.getAllSubcomponents('vevent');if(components.length>2000)throw Error('Use a feed with at most 2,000 event records.');
 const warnings=new Set(),rows=[],overrides=new Map(),byUID=new Set(),limit=Date.parse(fromDate+'T00:00:00Z');let transparent=0,series=0;
 if(prop(root,'version')!=='2.0')warnings.add('The calendar does not declare VERSION:2.0.');
 if(!prop(root,'prodid'))warnings.add('The calendar has no PRODID publisher identifier.');
 if(!components.length)warnings.add('No VEVENT records were found.');
 for(const c of components){
   const uid=prop(c,'uid');if(c.hasProperty('recurrence-id')){if(!overrides.has(uid))overrides.set(uid,[]);overrides.get(uid).push(c);}
 }
 for(const c of components){
  if(c.hasProperty('recurrence-id'))continue;
  const uid=prop(c,'uid');
  if(!uid)warnings.add('One or more events have no UID. Calendar updates may create duplicates.');
  if(uid&&byUID.has(uid))warnings.add('Two master events share the same UID.');
  byUID.add(uid);
  if(!c.hasProperty('dtstart')){warnings.add('An event without DTSTART was skipped.');continue;}
  if(prop(c,'status').toUpperCase()==='CANCELLED')continue;
  const event=new ICAL.Event(c,{exceptions:overrides.get(uid)||[]}),start=event.startDate,zone=c.getFirstProperty('dtstart').getParameter('tzid');
  const first=describeTime(start,c);
  if(first.label.includes('floating'))warnings.add('Floating times follow the viewer’s local clock. Add a venue time zone when needed.');
  if(first.label.includes('unresolved'))warnings.add('A TZID could not be resolved. Its displayed wall time needs manual verification.');
  if(c.hasProperty('dtend') && event.endDate.compare(start)<=0)warnings.add('An event ends at or before its start.');
  if(prop(c,'transp').toUpperCase()==='TRANSPARENT')transparent++;
  const add=(t,item,comp)=>{
    if(prop(comp,'status').toUpperCase()==='CANCELLED')return false;
    const time=describeTime(t,comp);
    if(time.order<limit)return false;
    rows.push({start:time.label,order:time.order,name:item.summary||'Untitled event',busy:prop(comp,'transp').toUpperCase()==='TRANSPARENT'?'Free':'Busy'});return true;
  };
  if(!event.isRecurring()){add(start,event,c);continue;}
  series++;
  const iter=event.iterator();let shown=0,steps=0;
  while(steps++<5000&&shown<8){
    const next=iter.next();if(!next)break;
    const detail=event.getOccurrenceDetails(next);
    if(add(detail.startDate,detail.item,detail.item.component))shown++;
  }
  if(steps>=5000)warnings.add('A long recurrence reached the preview limit. Check its RRULE in the source.');
 }
 for(const uid of overrides.keys())if(!byUID.has(uid))warnings.add('An exception refers to a series missing from this file.');
 return {count:components.length,transparent,series,warnings:[...warnings],rows:rows.sort((a,b)=>a.order-b.order).slice(0,8)};
}
