import {currency,number,cents,money,metric,line,note,copy} from '../shared.mjs';
function split(total,people,unit) {
  const low=Math.floor(total/people),extra=total%people;
  return extra ? (people-extra)+' × '+money(low,unit)+' + '+extra+' × '+money(low+1,unit) : money(low,unit)+' each';
}
function paymentStrip(amount, total) {
  const percent = total > 0 ? amount / total * 100 : 0;
  if (!total) return '';
  const paid = Number(percent.toFixed(1));
  return '<div class="tv-payment"><div class="tv-track" aria-hidden="true"><i style="width:' + percent.toFixed(2) + '%"></i></div>'
    + '<div class="tv-payment-key"><span>'+paid+'% now</span><span>'+Number((100-paid).toFixed(1))+'% later</span></div></div>';
}
export default {
  formTitle:'Booking details',resultTitle:'Deposit comparison',
  fields:[currency,number('total','Total group booking price',450,0,10000000,.01),number('people','People sharing the booking',3,1,10000),number('fixed','Fixed deposit for the group',90,0,10000000,.01),number('percent','Percentage deposit (%)',25,0,100,.01)],
  run(v) {
    const total=cents(v.total), fixed=cents(v.fixed),percent=Math.round(total*Number(v.percent)/100);
    if(fixed>total) throw new Error('The fixed deposit cannot exceed the total booking price.');
    const rows=[[fixed,'Fixed deposit'],[percent,v.percent+'% deposit']];
    return {html:rows.map(([n,label])=>'<section class="tv-installment">'+metric(label+' due now',money(n,v.currency))+paymentStrip(n,total)+line('Balance due later',money(total-n,v.currency))+line('Deposit split',split(n,Number(v.people),v.currency))+line('Balance split',split(total-n,Number(v.people),v.currency))+'</section>').join('')+note('All amounts apply to one booking. Split payments are rounded to the nearest cent.'),actions:[copy('Copy comparison',rows.map(([n,label])=>label+': '+money(n,v.currency)+' now, '+money(total-n,v.currency)+' later. Split: '+split(n,Number(v.people),v.currency)).join('\n'))]};
  }
};
