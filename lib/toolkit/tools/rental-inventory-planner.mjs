import {number,field,metric,line,table,note,download,csv,isoDate} from '../shared.mjs';
const sample='2027-05-08 09:00,2027-05-08 14:00,4\n2027-05-08 11:00,2027-05-08 16:00,3\n2027-05-08 14:00,2027-05-08 18:00,2';
const fmt=s=>s.replace('T',' ');
function stamp(value) {
  const s=value.trim().replace(' ','T');
  if(!/^\d{4}-\d{2}-\d{2}T(?:[01]\d|2[0-3]):[0-5]\d$/.test(s)) throw new Error('Use YYYY-MM-DD HH:MM for pickup and return.');
  isoDate(s.slice(0,10));
  return s;
}
export default {
  exampleDates:{anchor:"2027-05-08", fields:['rows']},
  formTitle:'Fleet and reservations',resultTitle:'Inventory forecast',
  fields:[field('equipment','Equipment type','Touring kayaks'),number('stock','Units available',5,0,100000),field('rows','Reservations',sample,'textarea',{hint:'One reservation per line: pickup, return, quantity. Paste comma-separated values or three spreadsheet columns. Use the same local time zone.',wide:true})],
  run(v) {
    const changes=new Map();
    const lines=v.rows.trim().split(/\r?\n/);
    if(lines.length>2500)throw new Error('Plan up to 2,500 reservations at a time.');
    lines.forEach((row,i)=>{
      const cells=row.split(/[,\t]/).map(x=>x.trim());
      if(i===0 && /^(pickup|start)/i.test(cells[0]) && !/\d/.test(cells[0]))return;
      try {
        if(cells.length!==3)throw new Error('Include pickup, return and quantity.');
        const a=stamp(cells[0]),b=stamp(cells[1]),n=Number(cells[2]);
        if(b<=a || !Number.isSafeInteger(n) || n<1 || n>100000)throw new Error('Return must follow pickup and quantity must be 1–100,000.');
        changes.set(a,(changes.get(a)||0)+n); changes.set(b,(changes.get(b)||0)-n);
      } catch(e) { throw new Error('Row '+(i+1)+'. '+e.message); }
    });
    if(!changes.size)throw new Error('Add at least one reservation.');
    const times=[...changes.keys()].sort(), stock=Number(v.stock), windows=[];
    let load=0, peak=0;
    for(let i=0;i<times.length-1;i++){
      load+=changes.get(times[i]); peak=Math.max(peak,load);
      if(load>0)windows.push([fmt(times[i]),fmt(times[i+1]),load,Math.max(0,load-stock)]);
    }
    const headers=['From','Until','Units out','Units short'],short=windows.filter(w=>w[3]>0),visible=short.length?short:windows;
    return {html:metric('Peak simultaneous demand',peak+' units')+line(v.equipment,stock+' available')+note(short.length?'Extra units are needed during these periods.':'Your stock covers every reservation.')+table(headers,visible.slice(0,20))+(visible.length>20?note('Showing the first 20 intervals. Download the full forecast below.'):''),
      actions:[download('Download forecast CSV','rental-inventory.csv',csv([headers,...windows]),'text/csv;charset=utf-8')]};
  }
};
