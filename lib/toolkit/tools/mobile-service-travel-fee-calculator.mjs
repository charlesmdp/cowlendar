import {number,select,currency,money,cents,metric,line,track,copy} from '../shared.mjs';
export default {
  formTitle:'Plan the visit',resultTitle:'Travel quote',
  fields:[currency,select('unit','Distance unit','mi',['mi','km']),number('distance','One-way distance',18,0,3000,.1),number('radius','Free one-way radius',5,0,3000,.1),number('rate','Vehicle cost per mile or km',.7,0,100,.01),number('minutes','Round-trip travel minutes',50,0,2880),number('hourly','Travel time rate per hour',24,0,10000,.01),number('extras','Parking and tolls',4,0,10000,.01)],
  run(v){
    const distance=2*Math.max(0,+v.distance-v.radius),travel=cents(distance*+v.rate),time=cents(+v.minutes*v.hourly/60),extras=cents(v.extras),total=travel+time+extras,fmt=n=>money(n,v.currency);
    return {html:'<div class="journey"><span>Base</span><i></i><b>'+Number(v.distance)+' '+v.unit+'</b><i></i><span>Client</span></div>'+metric('Round-trip travel fee',fmt(total))+line('Billable round-trip distance',Number(distance.toFixed(2))+' '+v.unit)+track('Vehicle costs',travel,total,fmt(travel))+track('Travel time',time,total,fmt(time))+track('Parking & tolls',extras,total,fmt(extras)),
      actions:[copy('Copy travel quote','Travel fee: '+fmt(total)+' for a return visit. Vehicle '+fmt(travel)+', travel time '+fmt(time)+', parking and tolls '+fmt(extras)+'.')]};
  }
};
