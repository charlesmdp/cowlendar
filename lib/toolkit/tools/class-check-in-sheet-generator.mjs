import {field,rowsOf,escape,download,csv,printAction,note} from '../shared.mjs';
export default {
 formTitle:'Class and bookings',resultTitle:'Attendance sheet',
 exampleDates:{anchor:'2027-05-08',fields:['date']},
 fields:[field('title','Class or event','Saturday paddle club'),field('date','Session date','2027-05-08','date'),field('time','Session time','09:30','time'),field('leader','Instructor','Alex'),field('roster','Group reservations','Riley Chen,4\nSam Cole,1\nAvery Lane,2','textarea',{wide:true,hint:'One reservation per line: booking name, number of guests. Each guest gets their own checkbox.'})],
 mount({content,state,refresh}){
   content.addEventListener('change',event=>{
     if(!event.target.matches('[data-arrival]'))return;
     const key=event.target.dataset.arrival;state.checked??=new Set();
     event.target.checked?state.checked.add(key):state.checked.delete(key);
     refresh();[...content.querySelectorAll('[data-arrival]')].find(x=>x.dataset.arrival===key)?.focus({preventScroll:true});
   });
 },
 reset({state}){delete state.checked;delete state.session;},
 run(v,asset,state={}){
  const session=JSON.stringify([v.date,v.title,v.time,v.roster]);if(state.session!==session){state.session=session;state.checked=new Set();}
  let total=0;const guests=[];
  rowsOf(v.roster).forEach(([name,n,...rest],i)=>{
    if(rest.length||!name||!/^\d+$/.test(n)||+n<1||+n>100)throw new Error('Row '+(i+1)+' needs a name and 1–100 guests.');
    total+=+n;if(total>1000)throw new Error('Create sheets for up to 1,000 guests at a time.');
    for(let guest=1;guest<=+n;guest++)guests.push({key:i+'-'+guest,name,guest,size:Number(n)});
  });
  return {html:'<article class="arrival-sheet"><header><small>'+escape(v.date)+' · '+escape(v.time)+'</small><h3>'+escape(v.title)+'</h3><p>Instructor · '+escape(v.leader)+'</p><b>'+state.checked.size+' / '+total+' checked in</b></header>'+guests.map(g=>'<label><input type="checkbox" data-arrival="'+g.key+'" '+(state.checked.has(g.key)?'checked':'')+'><span>'+escape(g.name)+'</span><small>Guest '+g.guest+' of '+g.size+'</small></label>').join('')+'</article>'+note('Attendance is kept in this tab. Export your marks before closing the page or changing the roster.'),actions:[printAction,download('Export attendance CSV','class-attendance.csv',csv([['Class','Date','Time','Reservation','Guest','Group size','Checked in'],...guests.map(g=>[v.title,v.date,v.time,g.name,g.guest,g.size,state.checked.has(g.key)?'Yes':'No'])]),'text/csv;charset=utf-8')]};
 }
};
