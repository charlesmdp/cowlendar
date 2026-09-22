'use strict';
(()=>{
 const header=document.querySelector('.site-header'),toggle=document.querySelector('.nav-toggle'),menu=document.querySelector('#site-mobile-menu');
 const close=()=>{if(!menu)return;menu.hidden=true;toggle?.setAttribute('aria-expanded','false');toggle?.setAttribute('aria-label','Open menu');};
 toggle?.addEventListener('click',()=>{const open=menu.hidden;menu.hidden=!open;toggle.setAttribute('aria-expanded',String(open));toggle.setAttribute('aria-label',open?'Close menu':'Open menu');});
 menu?.addEventListener('click',e=>{if(e.target.closest('a'))close();});
 document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!menu?.hidden){close();toggle?.focus();}});
 document.addEventListener('click',e=>{if(header&&!header.contains(e.target))close();});
 const navState=()=>header?.classList.toggle('scrolled',scrollY>50);addEventListener('scroll',navState,{passive:true});navState();addEventListener('resize',close);
 const hero=document.querySelector('#hero');
 const themes={Kayak:['#4655f5','#eaf0ff'],'Wine Tasting':['#965048','#f8eeeb'],Hairdresser:['#977047','#f7f0e7'],'Car Rentals':['#277a63','#eaf7f0'],'Your Services':['#7855bd','#f1eafa']};
 function setTheme(name){const theme=themes[name]||themes.Kayak;if(!hero)return;hero.style.setProperty('--demo-accent',theme[0]);hero.style.setProperty('--demo-wash',theme[1]);hero.dataset.activeTheme=name;}
 document.querySelectorAll('[data-hero-tab]').forEach(tab=>tab.addEventListener('click',()=>setTheme(tab.dataset.heroTab)));setTheme('Kayak');
 const track=document.querySelector('.usecase-track'),prev=document.querySelector('.gallery-prev'),next=document.querySelector('.gallery-next'),position=document.querySelector('.gallery-position');
 if(track){const step=()=>track.querySelector('.usecase-card').getBoundingClientRect().width+22;const reduced=matchMedia('(prefers-reduced-motion: reduce)');const move=dir=>track.scrollBy({left:dir*step(),behavior:reduced.matches?'instant':'smooth'});prev?.addEventListener('click',()=>move(-1));next?.addEventListener('click',()=>move(1));track.addEventListener('keydown',e=>{if(e.target===track&&['ArrowLeft','ArrowRight'].includes(e.key)){e.preventDefault();move(e.key==='ArrowLeft'?-1:1);}});const update=()=>{const max=track.scrollWidth-track.clientWidth;prev.disabled=track.scrollLeft<2;next.disabled=track.scrollLeft>=max-2;position.textContent=`${Math.min(13,Math.round(track.scrollLeft/step())+1)} / 13`;};track.addEventListener('scroll',update,{passive:true});addEventListener('resize',update);update();}
})();
// Honor deep links after local fonts have settled the page layout.
addEventListener('load',()=>{
 const initialHash=location.hash;
 if(!initialHash)return;
 document.fonts.ready.then(()=>{
  if(location.hash!==initialHash)return;
  const target=document.getElementById(decodeURIComponent(initialHash.slice(1)));
  target?.scrollIntoView({behavior:'instant',block:'start'});
 });
},{once:true});
