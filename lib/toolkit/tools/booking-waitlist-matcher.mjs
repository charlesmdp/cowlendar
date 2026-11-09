import {field,number,rowsOf,metric,escape,download,csv,note,isoDate} from '../shared.mjs';
function validTime(s){return /^(?:[01]\d|2[0-3]):[0-5]\d$/.test(s);}
export default {
 formTitle:'Released appointment',resultTitle:'Waitlist matches',
 exampleDates:{anchor:'2027-05-08',fields:['date','queue']},
 fields:[field('date','Opening date','2027-05-08','date'),number('seats','Open places',3,1,10000),field('start','Opening starts','14:00','time'),field('end','Opening ends','15:00','time'),field('queue','Waiting parties','Riley,2,2027-05-08,13:00,16:00\nSam,4,2027-05-08,14:00,16:00\nAvery,1,2027-05-08,14:00,15:00','textarea',{wide:true,hint:'In priority order: name, party size, date (YYYY-MM-DD or * for any), earliest start, latest finish. One party per line. Tabs also work.'})],
 run(v){
  if(v.end<=v.start)throw new Error('End the opening after its start on the same day.');
  let left=Number(v.seats);const results=rowsOf(v.queue).map(([name,size,date,from,to,...rest],i)=>{
    if(date!=='*')isoDate(date);
    if(!name||rest.length||!/^\d+$/.test(size)||+size<1||+size>10000||!validTime(from)||!validTime(to)||from>=to)throw new Error('Check the five values on waitlist row '+(i+1)+'.');
    const fits=(date==='*'||date===v.date)&&from<=v.start&&to>=v.end;
    const verdict=!fits?'Outside availability':+size>left?'Needs more places':'Contact next';
    if(verdict==='Contact next')left-=Number(size);
    return [name,size,verdict];
  });
  return {html:metric('Places matched',(+v.seats-left)+' of '+v.seats)+'<div class="queue-board">'+results.map(([name,n,status])=>'<div class="queue-row"><b>'+escape(name)+'</b><span>'+n+' '+(+n===1?'person':'people')+'</span><em class="'+(status==='Contact next'?'ready':'hold')+'">'+status+'</em></div>').join('')+'</div>'+note(left+' unassigned places. Contact the suggested parties in order and confirm their acceptance.'),actions:[download('Export contact order','waitlist-matches.csv',csv([['Party','Size','Status'],...results]),'text/csv;charset=utf-8')]};
 }
};
