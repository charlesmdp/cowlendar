'use strict';
(()=>{
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 function particles(container,count){if(!container)return;for(let i=0;i<count;i++){const dot=document.createElement('i');dot.style.cssText=`--particle-x:${(i*37+13)%100}%;--particle-y:${(i*61+7)%100}%;--particle-delay:${-i*.61}s`;container.append(dot);}}
 document.querySelectorAll('.prefooter-particles').forEach(el=>particles(el,32));
 const cards=[...document.querySelectorAll('.why-card')];
 cards.forEach(card=>{
  const isCalendar=!!card.querySelector('[data-range-day]'),isTimezone=!!card.querySelector('[data-timezone-demo]'),isDuration=!!card.querySelector('[data-custom-duration]');
  if(isCalendar||isTimezone||isDuration||card.querySelector('.framer-kemaA,.booking-guests')){card.tabIndex=0;card.setAttribute('aria-label',(card.querySelector('.why-visual')?.nextElementSibling?.textContent||'Booking feature').trim()+'. Interactive preview.');}
  function active(value){card.classList.toggle('is-demo-active',value);card.querySelectorAll('[data-range-day]').forEach(el=>el.textContent=value?el.dataset.rangeDay:'🏡');card.querySelectorAll('[data-custom-duration]').forEach(el=>el.textContent=value?'150 min':'30 min');card.querySelectorAll('[data-timezone-demo]').forEach(el=>{const emoji=el.dataset.timezoneDemo;el.textContent=(value?({'🍷':'02:00 PM','🗽':'01:00 PM','🤿':'05:00 PM'}[emoji]):'12:00 PM')+emoji;});}
  card.addEventListener('pointerenter',()=>{card.dataset.interacting='true';active(true);});card.addEventListener('pointerleave',()=>{delete card.dataset.interacting;active(false);});card.addEventListener('focusin',()=>active(true));card.addEventListener('focusout',e=>{if(!card.contains(e.relatedTarget))active(false);});card.addEventListener('keydown',e=>{if(e.target===card&&['Enter',' '].includes(e.key)){e.preventDefault();active(!card.classList.contains('is-demo-active'));}});
  card.querySelectorAll('[role=switch]').forEach(toggle=>{const row=toggle.closest('.framer-5d7Hd');function update(){row?.classList.toggle('is-blocked',toggle.getAttribute('aria-checked')==='false');}toggle.addEventListener('click',e=>{e.stopPropagation();toggle.dataset.used='true';toggle.setAttribute('aria-checked',String(toggle.getAttribute('aria-checked')!=='true'));update();});toggle.addEventListener('keydown',e=>{if(['Enter',' '].includes(e.key)){e.preventDefault();e.stopPropagation();toggle.click();}});update();});
  const integration=card.querySelector('.framer-8ig65p');if(integration){const bg=document.createElement('div');bg.className='integration-particles';bg.setAttribute('aria-hidden','true');integration.prepend(bg);particles(bg,26);card.querySelectorAll('.framer-ivjur6>div:not(.framer-1tmk37a)').forEach((e,i)=>{e.classList.add('integration-node');e.style.setProperty('--node-delay',`${i*.22}s`);});}
  const reminder=card.querySelector('.framer-v5m7xp');reminder?.querySelectorAll('[role=switch]').forEach(el=>el.parentElement.parentElement.classList.add('reminder-row'));
  // A short preview also makes the original hover states discoverable on touch screens.
  let timer,offTimer;const clear=()=>{clearTimeout(timer);clearTimeout(offTimer);};
  const cycle=()=>{if(reduced.matches||document.hidden||!card.classList.contains('is-visible'))return;if(!card.dataset.interacting&&!card.contains(document.activeElement)){active(true);if(reminder){const toggle=reminder.querySelector('[role=switch]:not([data-used])');if(toggle){toggle.setAttribute('aria-checked','false');offTimer=setTimeout(()=>toggle.setAttribute('aria-checked','true'),1100);}}setTimeout(()=>{if(!card.dataset.interacting&&!card.contains(document.activeElement))active(false);},2300);}timer=setTimeout(cycle,6200);};
  if('IntersectionObserver'in window){const observer=new IntersectionObserver(entries=>{entries.forEach(entry=>{card.classList.toggle('is-visible',entry.isIntersecting);clear();if(entry.isIntersecting&&!reduced.matches)timer=setTimeout(cycle,650);});},{threshold:.25});observer.observe(card);}document.addEventListener('visibilitychange',()=>{clear();if(!document.hidden)timer=setTimeout(cycle,700);});reduced.addEventListener('change',()=>{clear();active(false);if(!reduced.matches)timer=setTimeout(cycle,650);});
 });
})();
(()=>{
 const activate=(element,callback,label)=>{if(!element)return;element.setAttribute('role','button');element.tabIndex=0;element.setAttribute('aria-label',label);element.addEventListener('click',callback);element.addEventListener('keydown',event=>{if(['Enter',' '].includes(event.key)){event.preventDefault();event.stopPropagation();callback();}});};
 document.querySelectorAll('.why-card .framer-d2AFM').forEach(panel=>{
  const rows=[...panel.querySelectorAll('.framer-6EXxH')],add=panel.querySelector('.framer-4ja9y0');
  const update=()=>add?.setAttribute('aria-disabled',String(rows.every(row=>!row.parentElement.hidden)));
  rows.forEach((row,index)=>{row.parentElement.hidden=index>2;activate(row.querySelector('.framer-1wov7ue'),()=>{row.parentElement.hidden=true;update();},'Remove reminder from preview');});
  activate(add,()=>{const row=rows.find(row=>row.parentElement.hidden);if(row){row.parentElement.hidden=false;row.classList.remove('reminder-reveal');void row.offsetWidth;row.classList.add('reminder-reveal');update();}},'Add reminder to preview');update();
 });
})();
