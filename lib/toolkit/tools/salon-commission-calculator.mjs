import {currency,number,field,rowsOf,cents,money,escape,line,metric,track,download,csv,printAction} from '../shared.mjs';
export default {
 formTitle:'Team sales',resultTitle:'Commission statements',
 fields:[currency,number('service','Service commission (%)',40,0,100,.1),number('retail','Product commission (%)',10,0,100,.1),field('sales','Sales by team member','Avery,650,95,70\nMorgan,480,120,55\nAvery,85,0,10','textarea',{wide:true,hint:'One sale or summary per line: stylist, service sales, product sales, tips. Use sales net of discounts, refunds and taxes. Tabs also work.'})],
 run(v){
  const totals=new Map(),fmt=n=>money(n,v.currency);
  rowsOf(v.sales,1000).forEach((row,i)=>{
   if(row.length!==4||!row[0]||!row.slice(1).every(s=>/^\d{1,8}(?:\.\d{1,2})?$/.test(s)))throw new Error('Row '+(i+1)+' needs a name and three non-negative amounts.');
   const name=row[0],old=totals.get(name)||[0,0,0];totals.set(name,old.map((val,i)=>val+cents(row[i+1])));
  });
  const people=[...totals.entries()].map(([name,[s,p,t]])=>{const a=Math.round(s*Number(v.service)/100),b=Math.round(p*Number(v.retail)/100);return [name,a,b,t,a+b+t];});
  const grand=people.reduce((n,p)=>n+p[4],0);
  return {html:metric('Commissions + tips',fmt(grand))+people.map(([name,s,p,t,total])=>'<article class="pay-stub"><header><b>'+escape(name)+'</b><strong>'+fmt(total)+'</strong></header>'+track('Services',s,total,fmt(s))+track('Retail',p,total,fmt(p))+line('Tips paid in full',fmt(t))+'</article>').join(''),actions:[download('Download statements CSV','salon-commission.csv',csv([['Team member','Service commission','Product commission','Tips','Total','Currency'],...people.map(([n,...vals])=>[n,...vals.map(x=>(x/100).toFixed(2)),v.currency])]),'text/csv;charset=utf-8'),printAction]};
 }
};
