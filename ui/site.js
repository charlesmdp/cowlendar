"use strict";(()=>{const r=document.querySelector(".site-header"),a=document.querySelector(".nav-toggle"),o=document.querySelector("#site-mobile-menu"),s=()=>{o&&(o.hidden=!0,a?.setAttribute("aria-expanded","false"),a?.setAttribute("aria-label","Open menu"))};a?.addEventListener("click",()=>{const e=o.hidden;o.hidden=!e,a.setAttribute("aria-expanded",String(e)),a.setAttribute("aria-label",e?"Close menu":"Open menu")}),o?.addEventListener("click",e=>{e.target.closest("a")&&s()}),document.addEventListener("keydown",e=>{e.key==="Escape"&&!o?.hidden&&(s(),a?.focus())}),document.addEventListener("click",e=>{r&&!r.contains(e.target)&&s()});const u=()=>r?.classList.toggle("scrolled",scrollY>50);addEventListener("scroll",u,{passive:!0}),u(),addEventListener("resize",s);const c=document.querySelector("#hero"),m={Kayak:["#4655f5","#eaf0ff"],"Wine Tasting":["#965048","#f8eeeb"],Hairdresser:["#977047","#f7f0e7"],"Car Rentals":["#277a63","#eaf7f0"],"Your Services":["#7855bd","#f1eafa"]};function y(e){const d=m[e]||m.Kayak;c&&(c.style.setProperty("--demo-accent",d[0]),c.style.setProperty("--demo-wash",d[1]),c.dataset.activeTheme=e)}document.querySelectorAll("[data-hero-tab]").forEach(e=>e.addEventListener("click",()=>y(e.dataset.heroTab))),y("Kayak");const t=document.querySelector(".usecase-track"),h=document.querySelector(".gallery-prev"),f=document.querySelector(".gallery-next"),v=document.querySelector(".gallery-position");if(t){const e=()=>t.querySelector(".usecase-card").getBoundingClientRect().width+22,d=matchMedia("(prefers-reduced-motion: reduce)"),i=n=>t.scrollBy({left:n*e(),behavior:d.matches?"instant":"smooth"});h?.addEventListener("click",()=>i(-1)),f?.addEventListener("click",()=>i(1)),t.addEventListener("keydown",n=>{n.target===t&&["ArrowLeft","ArrowRight"].includes(n.key)&&(n.preventDefault(),i(n.key==="ArrowLeft"?-1:1))});const l=()=>{const n=t.scrollWidth-t.clientWidth;h.disabled=t.scrollLeft<2,f.disabled=t.scrollLeft>=n-2,v.textContent=`${Math.min(13,Math.round(t.scrollLeft/e())+1)} / 13`};t.addEventListener("scroll",l,{passive:!0}),addEventListener("resize",l),l()}})(),addEventListener("load",()=>{const r=location.hash;r&&document.fonts.ready.then(()=>{location.hash===r&&document.getElementById(decodeURIComponent(r.slice(1)))?.scrollIntoView({behavior:"instant",block:"start"})})},{once:!0});


// Orka support chat. This shared script runs on static pages and the dynamic blog.
window.ORKA_APP_ID = "6659dab0ac6370cda1fb2774";
(function (w, d) {
  if (d.querySelector('script[src="https://widget.orka.chat/app.js"]')) return;
  if (!w.Orka) {
    var o = w.Orka = { _q: [] };
    ["load", "update", "reset", "toggle", "show", "hide", "showWidget", "hideWidget", "destroy", "on", "off", "track"].forEach(function (m) {
      o[m] = function () { o._q.push([m, [].slice.call(arguments)]); };
    });
  }
  var s = d.createElement("script");
  s.src = "https://widget.orka.chat/app.js";
  s.async = true;
  d.head.appendChild(s);
})(window, document);
