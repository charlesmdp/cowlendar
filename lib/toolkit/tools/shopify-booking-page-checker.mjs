import {field,escape,copy} from '../shared.mjs';
const demo={title:'Sunset kayak tour',url:'',shopify:true,signals:[['Price','$65'],['Duration','90 minutes'],['Location','Meeting point: Harbour dock'],['Cancellation terms',''],['Booking action','Choose a date']]};
const tips=['Place the price next to the service name.','State the length of the experience.','Give an address, meeting point or video platform.','Link the policy before the customer pays.','Check that a customer can pick a date on a phone.'];
export default {
 formTitle:'Inspect a booking page',resultTitle:'Mobile page review',submitLabel:'Check my booking page',
 fields:[field('url','Public Shopify product or service URL','https://demo.cowlendar.com/','url',{wide:true,hint:'Choose the individual service page. The checker reads its publicly available HTML when you press Check.'})],
 onFieldChange(form,key,state){state.request=null;state.loading=false;state.failure='';},
 async submit({form,state,refresh,status}){
   if(!form.reportValidity())return;
   const url=form.elements.namedItem('url').value.trim(),ticket=Symbol();state.request=ticket;state.loading=true;state.failure='';state.page=null;refresh();
   try{const r=await fetch('/api/tool-inspect',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({kind:'store',url})});const data=await r.json();if(!r.ok)throw Error(data.error||'The page could not be fetched.');if(state.request===ticket){state.page=data;state.source=url;}}
   catch(e){if(state.request===ticket)state.failure=e.message;}
   finally{if(state.request===ticket){state.loading=false;refresh();status.textContent=state.failure||'Page analysis complete.';}}
 },
 reset({state}){state.request=null;state.page=null;state.failure='';state.loading=false;state.source='';},
 run(v,asset,state={}){
   if(state.loading)return {html:'<p role="status">Reading the public page…</p>',actions:[]};
   if(state.failure)return {html:'<p>'+escape(state.failure)+'</p><p>Try the individual service URL. Password-protected shops and sites that block automated visits need a manual review.</p>',actions:[]};
   const live=state.page&&state.source===v.url,p=live?state.page:demo,label=live?'Page text preview':'Example review',found=p.signals.filter(s=>s[1]).length;
   const phone='<div class="audit-phone"><small>'+label+'</small><h3>'+escape(p.title)+'</h3><b>'+escape(p.signals[0][1]||'Price to check')+'</b><p>'+escape(p.signals[1][1]||'Duration to check')+'</p><span>'+escape(p.signals[4][1]||'Check booking action')+'</span></div>';
   const findings='<div class="audit-results"><h3>'+found+' / 5 signals found</h3>'+p.signals.map(([name,s],i)=>'<div><em class="'+(s?'ready':'hold')+'">'+(s?'Found':'Review')+'</em><b>'+name+'</b><p>'+escape(s||tips[i])+'</p></div>').join('')+'</div>';
   const frame=live?'<details class="mobile-frame"><summary>Try the live page in a phone-sized window</summary><iframe loading="lazy" sandbox="allow-scripts" referrerpolicy="no-referrer" title="Live mobile storefront" src="'+escape(p.url)+'"></iframe><p>Stores can block embedded previews. Open the original page to check the full booking flow.</p></details>':'';
   return {html:'<div class="audit-spread">'+phone+findings+'</div>'+frame+(live?'<p class="kit-note">'+(p.shopify?'Shopify storefront signals found.':'Shopify could not be confirmed from the HTML.')+' App-loaded widgets and final checkout need a manual check.</p>':''),
   actions:live?[{label:'Open original page ↗',href:p.url},copy('Copy findings',p.title+'\n'+p.signals.map(([name,s])=>name+': '+(s||'Review manually')).join('\n'))]:[copy('Copy sample checklist',demo.signals.map(s=>s[0]).join('\n'))]};
 }
};
