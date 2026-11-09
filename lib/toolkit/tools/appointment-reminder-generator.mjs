import {field,select,metric,note,escape,copy} from '../shared.mjs';
const languages={
  English:{first:'Hi',reminder:'a reminder from',when:'Your appointment',at:'at',manage:'Manage your booking',subject:'Reminder',sign:'See you soon',lead:['tomorrow','in two hours','coming up'],services:['appointment','salon visit','photo session','class','guided tour']},
  Français:{first:'Bonjour',reminder:'un rappel de',when:'Votre rendez-vous',at:'à',manage:'Gérer votre réservation',subject:'Rappel',sign:'À bientôt',lead:['demain','dans deux heures','à venir'],services:['rendez-vous','visite au salon','séance photo','cours','visite guidée']},
  Español:{first:'Hola',reminder:'un recordatorio de',when:'Tu cita',at:'a las',manage:'Gestiona tu reserva',subject:'Recordatorio',sign:'Hasta pronto',lead:['mañana','en dos horas','próximamente'],services:['cita','visita al salón','sesión de fotos','clase','visita guiada']}
};
export default {
  formTitle:'Message settings',resultTitle:'Ready-to-copy messages',
  fields:[field('business','Business name','Fieldwork Studio'),select('lang','Message language','English',Object.keys(languages)),select('sector','Booking type','0',[['0','Appointment'],['1','Salon visit'],['2','Photography'],['3','Class'],['4','Tour']]),select('lead','Reminder timing','0',[['0','Day before'],['1','Two hours before'],['2','General reminder']]),field('name','Customer name or variable','{{first_name}}'),field('date','Booking date or variable','{{date}}'),field('time','Time and zone or variable','{{time}}'),field('link','Booking management link or variable','{{booking_link}}')],
  run(v){
    const t=languages[v.lang],service=t.services[+v.sector],period=t.lead[+v.lead];
    const subject=t.subject+' · '+service+' · '+period;
    const sms=t.first+' '+v.name+', '+t.reminder+' '+v.business+' ('+service+', '+period+'). '+v.date+' '+t.at+' '+v.time+'. '+t.manage+': '+v.link;
    const email=t.first+' '+v.name+',\n\n'+subject+'.\n'+v.date+' '+t.at+' '+v.time+'\n\n'+t.manage+': '+v.link+'\n\n'+t.sign+',\n'+v.business;
    return {html:'<h3>SMS</h3><p class="kit-message">'+escape(sms)+'</p>'+note([...sms].length+' characters before variable substitution.')+'<h3>Email</h3>'+note('Subject · '+subject)+'<p class="kit-message">'+escape(email)+'</p>',actions:[copy('Copy SMS',sms),copy('Copy email',subject+'\n\n'+email)]};
  }
};
