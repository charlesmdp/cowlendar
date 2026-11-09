import {field,number,select,escape,copy,printAction,note} from '../shared.mjs';
export default {
  formTitle:'Set the booking rules',resultTitle:'Policy draft',
  fields:[field('business','Business name','Fieldwork Studio'),number('hours','Notice required (hours before start)',24,0,720),select('late','Late cancellations','retain',[['retain','Retain the deposit paid'],['full','Charge the full booking price'],['none','No cancellation charge']]),select('early','Refund with enough notice','full',[['full','Refund payments in full'],['credit','Offer credit for a future booking']]),select('reschedule','Rescheduling with enough notice','transfer',[['transfer','Transfer payment to a new date'],['contact','Arrange changes individually']]),field('contact','How to request a change','Use the manage-booking link in your confirmation email.','textarea',{wide:true})],
  run(v){
    const early=v.early==='full'?'we will refund your payment in full':'we will issue credit for a future booking';
    const late={retain:'any deposit paid is retained',full:'the full booking price is payable',none:'there is no cancellation charge'}[v.late];
    const boundary=Number(v.hours)===0?'Before your appointment starts':'With at least '+v.hours+' hours’ notice';
    const good=boundary+', '+early+'.';
    const missed=(Number(v.hours)===0?'For missed appointments':'With less notice or for a missed appointment')+', '+late+'.';
    const change=v.reschedule==='transfer'?'With the required notice, we can transfer your payment to an available new date.':'Please contact us to discuss rescheduling and the available dates.';
    const short=good+' '+missed,full=v.business+' — appointment cancellation policy\n\n'+short+'\n\n'+change+'\n\n'+v.contact;
    return {html:'<article class="policy-paper"><header>'+escape(v.business)+'</header><h3>Cancellation & rescheduling</h3><h4>At booking</h4><p>'+escape(short)+'</p><h4>In the confirmation email</h4><p>'+escape(change)+'</p><p>'+escape(v.contact)+'</p></article>'+note('Review the draft against your actual checkout, refund process and applicable rules before publishing.'),actions:[copy('Copy short policy',short),copy('Copy full policy',full),printAction]};
  }
};
