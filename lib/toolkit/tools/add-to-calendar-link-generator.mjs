import {field,escape,line,copy,download,note} from '../shared.mjs';
import {zoneField,zoned,utcStamp,calendarFile} from '../calendar.mjs';
export default {
  exampleDates:{anchor:"2027-05-08", fields:['start', 'end']},
  formTitle:'Event details',resultTitle:'Calendar invitation',
  fields:[field('title','Event name','Studio portrait session'),field('location','Location or meeting link','Fieldwork Studio'),field('start','Starts at the venue','2027-05-08T14:00','datetime-local'),field('end','Ends at the venue','2027-05-08T15:00','datetime-local'),zoneField,field('details','Event notes (optional)','Please arrive five minutes early.','textarea',{optional:true,wide:true})],
  run(v) {
    const start=zoned(v.start,v.zone),end=zoned(v.end,v.zone);
    if(end.epochMilliseconds<=start.epochMilliseconds)throw new Error('Choose an end time after the start.');
    const event={start:utcStamp(start),end:utcStamp(end),title:v.title,details:v.details,location:v.location};
    const url=new URL('https://calendar.google.com/calendar/render');
    url.search=new URLSearchParams({action:'TEMPLATE',text:v.title,dates:event.start+'/'+event.end,ctz:v.zone,details:v.details,location:v.location}).toString();
    const date=new Date(v.start.slice(0,10)+'T12:00:00Z');
    const month=date.toLocaleDateString('en-US',{month:'short',timeZone:'UTC'});
    const weekday=date.toLocaleDateString('en-US',{weekday:'long',timeZone:'UTC'});
    const invitation='<div class="tv-invitation"><div class="tv-dayblock" aria-hidden="true"><span>'+month+'</span><b>'+date.getUTCDate()+'</b></div><div><span>'+weekday+'</span><h3>'+escape(v.title)+'</h3></div></div>';
    return {html:invitation+line('Start',v.start.replace('T',' · '))+line('End',v.end.replace('T',' · '))+line('Venue time zone',v.zone)+note(v.location)+(v.details?note(v.details):''),
      actions:[copy('Copy Google Calendar link',url.href),{label:'Open Google Calendar ↗',href:url.href},download('Download .ics', 'booking-event.ics',()=>calendarFile([event]),'text/calendar;charset=utf-8')]};
  }
};
