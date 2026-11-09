import {number,currency,cents,money,metric,line,note,copy} from '../shared.mjs';
export default {
  formTitle:'Workshop budget', resultTitle:'Ticket target',
  fields:[currency,number('seats','Seats available',12,1,100000),number('fixed','Fixed costs per workshop',240,0,10000000,.01),number('ticket','Price per ticket',45,0,100000,.01),number('materials','Cost per attendee',5,0,100000,.01)],
  run(v) {
    const contribution=cents(v.ticket)-cents(v.materials), fixed=cents(v.fixed), seats=Number(v.seats);
    const target=fixed===0 ? 0 : contribution>0 ? Math.ceil(fixed/contribution) : null;
    const profit=money(seats*contribution-fixed,v.currency);
    const headline=target===null ? 'Out of reach' : target+' paid seats';
    const explanation=contribution<0 ? 'Every additional ticket increases your loss at these prices.' : target===null ? 'Each ticket needs to contribute toward the fixed costs.' : target>seats ? 'Your room is '+(target-seats)+' seats short of break-even.' : 'You can cover your fixed costs within this room’s capacity.';
    return {html:metric('Break-even attendance',headline)+note(explanation)+line('Contribution per ticket',money(contribution,v.currency))+line('Result at full capacity',profit),actions:[copy('Copy budget summary',headline+' to break even. '+explanation+' Full-capacity result: '+profit+'.')]};
  }
};
