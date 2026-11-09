import {field,select,escape,note,copy,printAction} from '../shared.mjs';
const lists={
  Photography:['What occasion are we photographing?','What location and time of day do you have in mind?','Which people or moments would you most like to capture?','How do you plan to use the finished photos?'],
  Salon:['Which service are you booking?','What would you like to change about your current look?','How much time do you spend on your daily routine?','Do you have a reference photo to bring?'],
  Coaching:['What would you like to work on?','What have you already tried?','How would you describe a successful session?','How do you prefer to receive follow-up notes?'],
  'Tours & activities':['How many people are joining?','What experience does your group have with this activity?','What equipment sizes do you need?','Which meeting point works for your group?']
};
export default {
  formTitle:'Design your intake form',resultTitle:'Printable intake form',
  fields:[field('business','Business name','Fieldwork Studio'),select('sector','Business type','Photography',Object.keys(lists)),field('questions','Questions (edit, add or remove lines)',lists.Photography.join('\n'),'textarea',{wide:true,hint:'Changing business type loads its question set. One question per line.'})],
  onFieldChange(form,key){if(key==='sector')form.elements.questions.value=lists[form.elements.sector.value].join('\n');},
  run(v){
    const questions=v.questions.split(/\r?\n/).map(x=>x.trim()).filter(Boolean);
    if(!questions.length||questions.length>30)throw new Error('Include between one and 30 questions.');
    const title=v.business+' · '+v.sector+' intake form';
    return {html:'<h3>'+escape(v.business)+'</h3>'+note(v.sector+' intake form')+'<div class="kit-answer">Name</div><div class="kit-answer">Appointment date</div>'+questions.map(q=>'<div class="kit-answer">'+escape(q)+'</div>').join(''),
      actions:[copy('Copy questions',title+'\n\n'+questions.map((q,i)=>(i+1)+'. '+q).join('\n')),printAction]};
  }
};
