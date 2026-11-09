import {field,number,dayRange,isoDate,metric,line,table,note,download,csv} from '../shared.mjs';
import {zoneField,zoned,utcStamp,calendarFile} from '../calendar.mjs';
const days=['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
function monthPreview(firstDate, rows, skipped, weekdays, lastDate) {
  const selected = new Set(rows.map(row=>row[0]));
  const month = (rows[0]?.[0] || firstDate).slice(0,7);
  const first = new Date(month+'-01T00:00:00Z');
  const offset = (first.getUTCDay()+6)%7;
  const cursor = new Date(first);
  const cells = Array(offset).fill('<td></td>');
  while (cursor.getUTCMonth()===first.getUTCMonth()) {
    const iso = cursor.toISOString().slice(0,10);
    const inside = iso>=firstDate && iso<=lastDate;
    const closed = inside && skipped.has(iso) && weekdays.includes(String(cursor.getUTCDay()));
    const state = selected.has(iso) ? 'session' : closed ? 'closed' : inside ? '' : 'outside';
    cells.push('<td><span class="tv-date '+state+'">'+cursor.getUTCDate()+(state==='closed' || state==='session' ? '<span class="sr-only"> '+state+'</span>' : '')+'</span></td>');
    cursor.setUTCDate(cursor.getUTCDate()+1);
  }
  while(cells.length%7)cells.push('<td></td>');
  const weeks=[];
  for(let i=0;i<cells.length;i+=7) weeks.push('<tr>'+cells.slice(i,i+7).join('')+'</tr>');
  const caption = first.toLocaleDateString('en-US',{timeZone:'UTC',month:'long',year:'numeric'});
  return '<figure class="tv-figure tv-calendar"><table><caption>'+caption+'</caption><thead><tr>'
    + ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'].map(d=>'<th scope="col">'+d+'</th>').join('')+'</tr></thead><tbody>'+weeks.join('')+'</tbody></table>'
    + '<figcaption><i aria-hidden="true"></i> Class date'+(cells.some(c=>c.includes('tv-date closed'))?' <s aria-hidden="true">12</s> Closure':'')+'</figcaption></figure>';
}
export default {
  exampleDates:{anchor:"2027-05-03", fields:['start', 'end']},
  formTitle:'Class timetable',resultTitle:'Session calendar',
  fields:[field('title','Class name','Evening Pilates'),field('location','Venue','Studio One'),field('start','First date','2027-05-03','date'),field('end','Last date','2027-05-30','date'),field('weekdays','Teaching days',['2','4'],'checks',{options:[1,2,3,4,5,6,0].map(i=>[String(i),days[i]]),wide:true}),field('time','Local start time','18:00','time'),number('duration','Class length (minutes)',60,1,1440),zoneField,field('skip','Skip dates (optional)','','textarea',{hint:'Enter YYYY-MM-DD dates separated by spaces, commas or new lines.',optional:true})],
  run(v){
    const count=dayRange(v.start,v.end),first=isoDate(v.start);
    if(count>730)throw new Error('Choose a term of two years or less.');
    if(!v.weekdays.length)throw new Error('Select at least one teaching day.');
    const skipped=new Set(v.skip.trim().split(/[\s,]+/).filter(Boolean));
    for(const date of skipped)isoDate(date);
    const events=[],rows=[];
    for(let day=0;day<count;day++){
      const date=new Date(first+day*86400000),iso=date.toISOString().slice(0,10),weekday=date.getUTCDay();
      if(!v.weekdays.includes(String(weekday))||skipped.has(iso))continue;
      const local=zoned(iso+'T'+v.time,v.zone),end=local.add({minutes:Number(v.duration)});
      const finish=end.toPlainDateTime().toString({smallestUnit:'minute'}).replace('T',' ');
      events.push({start:utcStamp(local),end:utcStamp(end),title:v.title,location:v.location});
      rows.push([iso,days[weekday],v.time,finish,v.zone]);
    }
    const headers=['Date','Day','Start','Ends (local)','Time zone'];
    return {html:metric('Sessions this term',events.length)+line(v.title,v.location)+monthPreview(v.start,rows,skipped,v.weekdays,v.end)+(rows.length?table(['Date','Day','Starts'],rows.slice(0,10).map(r=>r.slice(0,3)))+note((rows.length>10?'Showing the first 10 sessions. ':'')+'Times are local to '+v.zone+'.'):note('No teaching dates match. Adjust the weekdays, term or closures.')),
      actions:events.length?[download('Download CSV','class-schedule.csv',csv([['Class','Venue',...headers],...rows.map(r=>[v.title,v.location,...r])]),'text/csv;charset=utf-8'),download('Download .ics','class-schedule.ics',()=>calendarFile(events),'text/calendar;charset=utf-8')]:[]};
  }
};
