import {field,number,currency,logo,dayRange,cents,money,escape,contactLogo,table,line,metric,note,printAction} from '../shared.mjs';
export default {
  exampleDates:{anchor:"2027-05-08", fields:['start', 'end']},
  formTitle:'Quote details',resultTitle:'Rental quote',
  fields:[field('business','Your business','Harbour Rentals'),field('customer','Prepared for','Morgan Lee'),field('reference','Quote reference','QT-001'),currency,field('start','Pickup date','2027-05-08','date'),field('end','Return date','2027-05-09','date'),field('items','Rental items','Touring kayak,2,45\nDry bag,2,5','textarea',{wide:true,hint:'One item per line: description, quantity, daily rate. You can also paste three tab-separated spreadsheet columns.'}),number('delivery','Delivery charge',20,0,100000,.01),number('security','Refundable security deposit',100,0,1000000,.01),logo],
  run(v,asset){
    const days=dayRange(v.start,v.end);
    if(days>3660)throw new Error('Choose a rental period of ten years or less.');
    let subtotal=0;
    const lines=v.items.trim().split(/\r?\n/);
    if(lines.length>100)throw new Error('Enter up to 100 rental items per quote.');
    const rows=lines.map((row,i)=>{
      const cells=row.split(row.includes('\t')?'\t':',').map(x=>x.trim());
      const rate=cells.pop(), qty=cells.pop(), name=cells.join(', ');
      if(!name||!/^\d+$/.test(qty)||+qty<1||+qty>10000||!/^\d+(\.\d{1,2})?$/.test(rate)||+rate>100000)throw new Error('Item '+(i+1)+'. Enter a name, positive quantity and daily rate (up to two decimal places).');
      const cost=Number(qty)*cents(rate)*days; subtotal+=cost;
      return [name,qty,money(cents(rate),v.currency),money(cost,v.currency)];
    });
    const total=subtotal+cents(v.delivery);
    return {html:contactLogo(asset)+'<h3>'+escape(v.business)+'</h3>'+note('Quote '+v.reference+' · Prepared for '+v.customer)+line('Rental period',v.start+' to '+v.end)+line('Billable calendar days',days)+table(['Item','Qty','Daily rate','Amount'],rows)+line('Equipment subtotal',money(subtotal,v.currency))+line('Delivery',money(cents(v.delivery),v.currency))+metric('Rental total before tax',money(total,v.currency))+line('Refundable security deposit',money(cents(v.security),v.currency))+note('The refundable security deposit is separate from the rental total. Both pickup and return dates are billable.'),actions:[printAction]};
  }
};
