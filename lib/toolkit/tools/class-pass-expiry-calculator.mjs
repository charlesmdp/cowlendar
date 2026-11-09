import {field,number,isoDate,metric,line,copy,escape} from '../shared.mjs';
const day=86400000,fmt=n=>new Date(n*day).toISOString().slice(0,10);
export default {
 formTitle:'Pass conditions',resultTitle:'Pass validity',
 exampleDates:{anchor:'2027-05-03',fields:['start','freezes']},
 fields:[field('start','Activation date (day one)','2027-05-03','date'),number('duration','Validity in active calendar days',90,1,3660),field('freezes','Pause periods (optional)','2027-06-01,2027-06-07','textarea',{optional:true,wide:true,hint:'One inclusive start and end per line, separated by a comma. Overlapping pauses count once.'})],
 run(v){
   const start=isoDate(v.start)/day;let end=start+Number(v.duration)-1,last=-Infinity,paused=0;
   const pauses=v.freezes.trim()?v.freezes.trim().split(/\r?\n/).map((row,i)=>{
     const dates=row.split(/[,\t]/).map(x=>x.trim());if(dates.length!==2)throw new Error('Pause '+(i+1)+' needs a start and end date.');
     const [a,b]=dates.map(x=>isoDate(x)/day);if(b<a)throw new Error('A pause ends before it starts.');return [a,b];
   }).sort((a,b)=>a[0]-b[0]):[];
   for(const [a,b] of pauses){
     const first=Math.max(a,start,last+1);if(first>end)break;
     const days=Math.max(0,b-first+1);paused+=days;end+=days;last=Math.max(last,b);
   }
   if(end>2932896)throw new Error('Choose an expiry before the year 10000.');
   const text='Valid from '+v.start+' through '+fmt(end)+' (inclusive), with '+paused+' paused days.';
   return {html:'<article class="member-pass"><span>Class pass</span><strong>'+escape(v.duration)+' active days</strong>'+metric('Last day to attend',fmt(end))+'</article>'+line('Activated',v.start)+line('Paused during the pass',paused+' days')+line('First expired date',fmt(end+1)),actions:[copy('Copy validity dates',text)]};
 }
};
