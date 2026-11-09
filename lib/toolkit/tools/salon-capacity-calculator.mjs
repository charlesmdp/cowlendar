import {number,field,metric,line,table,note,csv,download} from '../shared.mjs';
function minute(value){const [h,m]=value.split(':').map(Number);return h*60+m;}
function clock(min){return String(Math.floor(min/60)).padStart(2,'0')+':'+String(min%60).padStart(2,'0');}
function schedule(params,staff,chairs,basins){
  const {open,close,active,process,wash}=params, span=active+process+wash;
  const busy=Array.from({length:close+1},()=>[0,0,0]), rows=[];
  for(let start=open;start+span<=close;start++){
    const rinse=start+active+process, end=start+span;
    let fits=chairs;
    for(let m=start;m<end && fits>0;m++){
      const [usedStaff,usedChairs,usedBasins]=busy[m];
      fits=Math.min(fits,chairs-usedChairs);
      if(m<start+active || m>=rinse)fits=Math.min(fits,staff-usedStaff);
      if(m>=rinse)fits=Math.min(fits,basins-usedBasins);
    }
    if(!fits)continue;
    for(let m=start;m<end;m++){
      busy[m][1]+=fits;
      if(m<start+active || m>=rinse)busy[m][0]+=fits;
      if(m>=rinse)busy[m][2]+=fits;
    }
    rows.push([clock(start),clock(start+active),wash?clock(rinse):'—',clock(end),fits]);
  }
  return {rows,count:rows.reduce((n,row)=>n+row[4],0)};
}
function resourcePreview(params, count, staff, chairs, basins) {
  const shift = params.close - params.open;
  const items = [
    ['Stylist time',staff,params.active+params.wash],
    ['Chair time',chairs,params.active+params.process+params.wash],
    ['Basin time',basins,params.wash]
  ];
  const meters = items.map(([key,units,minutes]) => {
    const fraction = units ? 100 * count * minutes / (shift * units) : 0;
    const label = units ? Math.round(fraction)+'%' : 'None available';
    return '<div class="tv-resource"><div><span>'+key+'</span><strong>'+label+'</strong></div>'
      + '<div class="tv-track" aria-hidden="true"><i style="width:'+fraction.toFixed(2)+'%"></i></div></div>';
  }).join('');
  return '<figure class="tv-figure tv-resources"><figcaption>Utilization during opening hours</figcaption>'+meters+'</figure>';
}
export default {
  formTitle:'Your salon day',resultTitle:'Capacity estimate',
  fields:[field('open','Opening time','09:00','time'),field('close','Closing time','17:00','time'),number('staff','Stylists',2,1,50),number('chairs','Styling chairs',3,1,50),number('basins','Wash basins',1,0,50),number('active','Hands-on styling (min)',30,1,480),number('process','Processing time (min)',25,0,480),number('wash','Assisted rinse (min)',10,0,240)],
  run(v){
    const params={open:minute(v.open),close:minute(v.close),active:+v.active,process:+v.process,wash:+v.wash};
    if(params.close<=params.open)throw new Error('Closing time must be after opening time on the same day.');
    const staff=+v.staff, chairs=+v.chairs, basins=+v.basins;
    const {rows,count}=schedule(params,staff,chairs,basins);
    const gains=[['One more stylist',schedule(params,staff+1,chairs,basins).count-count],['One more chair',schedule(params,staff,chairs+1,basins).count-count],['One more basin',schedule(params,staff,chairs,basins+1).count-count]];
    const headers=['Start','Processing starts','Rinse starts','Finish','Clients'];
    return {html:metric('Clients in one working day',count)+resourcePreview(params,count,staff,chairs,basins)+note('Feasible estimate using the earliest available start. A chair stays reserved throughout. Stylists are free during processing. Breaks and cleanup must be budgeted separately.')+gains.map(([name,n])=>line(name,n>0?'+'+n+' clients':n===0?'Same capacity':n+' clients in this schedule')).join('')+(count?table(headers,rows.slice(0,8)):note('No complete service fits these hours and resources.')),
      actions:count?[download('Download full day · CSV','salon-capacity.csv',csv([headers,...rows]),'text/csv;charset=utf-8')]:[]};
  }
};
