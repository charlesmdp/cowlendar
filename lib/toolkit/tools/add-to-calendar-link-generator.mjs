import {field,metric,line,copy,download,note} from '../shared.mjs';
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
    return {html:metric('Event',v.title)+line('Start',v.start.replace('T',' · '))+line('End',v.end.replace('T',' · '))+line('Venue time zone',v.zone)+note(v.location),
      actions:[copy('Copy Google Calendar link',url.href),{label:'Open Google Calendar ↗',href:url.href},download('Download .ics', 'booking-event.ics',()=>calendarFile([event]),'text/calendar;charset=utf-8')]};
  }
};
