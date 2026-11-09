import{c as t,e as s,f as n,m as r,r as m,w as c}from"./shared/chunk-DCQYZT2G.js";var g={English:{first:"Hi",reminder:"a reminder from",when:"Your appointment",at:"at",manage:"Manage your booking",subject:"Reminder",sign:"See you soon",lead:["tomorrow","in two hours","coming up"],services:["appointment","salon visit","photo session","class","guided tour"]},Fran\u00E7ais:{first:"Bonjour",reminder:"un rappel de",when:"Votre rendez-vous",at:"\xE0",manage:"G\xE9rer votre r\xE9servation",subject:"Rappel",sign:"\xC0 bient\xF4t",lead:["demain","dans deux heures","\xE0 venir"],services:["rendez-vous","visite au salon","s\xE9ance photo","cours","visite guid\xE9e"]},Espa\u00F1ol:{first:"Hola",reminder:"un recordatorio de",when:"Tu cita",at:"a las",manage:"Gestiona tu reserva",subject:"Recordatorio",sign:"Hasta pronto",lead:["ma\xF1ana","en dos horas","pr\xF3ximamente"],services:["cita","visita al sal\xF3n","sesi\xF3n de fotos","clase","visita guiada"]}},p={formTitle:"Message settings",resultTitle:"Ready-to-copy messages",fields:[s("business","Business name","Fieldwork Studio"),n("lang","Message language","English",Object.keys(g)),n("sector","Booking type","0",[["0","Appointment"],["1","Salon visit"],["2","Photography"],["3","Class"],["4","Tour"]]),n("lead","Reminder timing","0",[["0","Day before"],["1","Two hours before"],["2","General reminder"]]),s("name","Customer name or variable","{{first_name}}"),s("date","Booking date or variable","{{date}}"),s("time","Time and zone or variable","{{time}}"),s("link","Booking management link or variable","{{booking_link}}")],run(e){let a=g[e.lang],l=a.services[+e.sector],u=a.lead[+e.lead],i=a.subject+" \xB7 "+l+" \xB7 "+u,o=a.first+" "+e.name+", "+a.reminder+" "+e.business+" ("+l+", "+u+"). "+e.date+" "+a.at+" "+e.time+". "+a.manage+": "+e.link,d=a.first+" "+e.name+`,

`+i+`.
`+e.date+" "+a.at+" "+e.time+`

`+a.manage+": "+e.link+`

`+a.sign+`,
`+e.business;return{html:'<h3>SMS</h3><p class="kit-message">'+t(o)+"</p>"+r([...o].length+" characters before variable substitution.")+"<h3>Email</h3>"+r("Subject \xB7 "+i)+'<p class="kit-message">'+t(d)+"</p>",actions:[m("Copy SMS",o),m("Copy email",i+`

`+d)]}}};c(p);
