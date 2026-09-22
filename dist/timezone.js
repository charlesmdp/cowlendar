import {partsAt,offsetMinutes,resolveWallTime,formatOffset,cityLabel,calendarStamp} from './timezone-core.mjs';
const $=s=>document.querySelector(s),date=$('#tz-date'),time=$('#tz-time'),slider=$('#tz-slider'),format=$('#tz-format'),duration=$('#tz-duration'),rows=$('#timezone-rows'),message=$('#tz-message'),occurrence=$('#tz-occurrence');
const icons={sun:'<circle cx="12" cy="12" r="4"/><path d="M12 1v3m0 16v3M1 12h3m16 0h3M4 4l2 2m12 12 2 2M4 20l2-2M18 6l2-2"/>',moon:'<path d="M20 14A9 9 0 0 1 10 3a9 9 0 1 0 10 11Z"/>',plus:'<path d="M12 5v14M5 12h14"/>'};
const svg=name=>`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${icons[name]}</svg>`;
const safe=v=>String(v).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
const validZone=z=>{try{partsAt(Date.now(),z);return true;}catch{return false;}};
const local=Intl.DateTimeFormat().resolvedOptions().timeZone;
const preferred=['Europe/Paris','Europe/London','America/New_York','America/Los_Angeles','Asia/Tokyo','Asia/Singapore','Asia/Dubai','Asia/Kolkata','Asia/Kathmandu','Australia/Sydney','Pacific/Auckland','America/Chicago','America/Toronto','Europe/Berlin','Europe/Lisbon','Europe/Madrid','Europe/Amsterdam','Asia/Hong_Kong','Asia/Shanghai','America/Sao_Paulo','Africa/Johannesburg','Africa/Cairo','UTC'];
const allZones=[...new Set([...preferred,...(Intl.supportedValuesOf?Intl.supportedValuesOf('timeZone'):[])])].filter(validZone);
const params=new URLSearchParams(location.search);let zones=[local,'America/New_York','Asia/Tokyo'].filter((x,i,a)=>x&&a.indexOf(x)===i);let instant=Date.now(),invalid=false;
const sharedZones=(params.get('zones')||'').split(',').filter(validZone).slice(0,8);if(sharedZones.length)zones=[...new Set(sharedZones)];
function setInputs(ms){const p=partsAt(ms,zones[0]);date.value=p.date;time.value=p.time;const matches=resolveWallTime(p.date,p.time,zones[0]);occurrence.value=String(matches.length>1 && Math.abs(matches[1]-ms)<Math.abs(matches[0]-ms)?1:0);}
setInputs(instant);date.min='1900-01-01';date.max='2100-12-31';
if(params.get('date')&&params.get('time')){const candidates=resolveWallTime(params.get('date'),params.get('time'),zones[0]);if(candidates.length){date.value=params.get('date');time.value=params.get('time');occurrence.value=params.get('occurrence')==='1'?'1':'0';}}
if(['30','60','90','120'].includes(params.get('duration')))duration.value=params.get('duration');if(params.get('format')==='12')format.checked=true;
function clockMarkup(p){if(!format.checked)return `${String(p.hour).padStart(2,'0')}:${String(p.minute).padStart(2,'0')}`;return `${p.hour%12||12}:${String(p.minute).padStart(2,'0')}<small>${p.hour<12?'AM':'PM'}</small>`;}
function plainClock(ms,z){return new Intl.DateTimeFormat('en-US',{timeZone:z,hour:'2-digit',minute:'2-digit',hour12:format.checked}).format(new Date(ms));}
function feedback(text){$('#tool-feedback').textContent=text;}
function render(){
 const possibilities=resolveWallTime(date.value,time.value,zones[0]);invalid=possibilities.length===0;message.hidden=!invalid;$('#tz-occurrence-wrap').hidden=possibilities.length<2;
 message.textContent=invalid?'This local time does not exist, or the date is outside 1900–2100. The clocks may jump forward. Choose another time.':'';
 ['#tz-copy','#tz-share','#tz-calendar'].forEach(id=>$(id).disabled=invalid);
 if(invalid){rows.innerHTML='<p class="timezone-message">Choose a valid local time to compare your cities.</p>';return;}
 instant=possibilities[Math.min(+occurrence.value||0,possibilities.length-1)];
 const base=partsAt(instant,zones[0]);slider.value=base.hour*60+base.minute;$('#tz-slider-output').textContent=`${plainClock(instant,zones[0])} in ${cityLabel(zones[0])}`;
 $('#tz-reference').innerHTML=`Planning in <strong>${safe(cityLabel(zones[0]))}</strong> · ${safe(zones[0])} · ${formatOffset(offsetMinutes(instant,zones[0]))}`;
 const baseDay=Date.parse(base.date+'T00:00:00Z');
 rows.innerHTML=zones.map((zone,index)=>{
  const p=partsAt(instant,zone),dayDiff=Math.round((Date.parse(p.date+'T00:00:00Z')-baseDay)/86400000),night=p.hour<7||p.hour>=20;
  const dateLabel=new Intl.DateTimeFormat('en-US',{timeZone:zone,weekday:'short',month:'short',day:'numeric'}).format(new Date(instant));
  const difference=dayDiff?`<span class="tz-date-diff">${dayDiff>0?'+':''}${dayDiff} day${Math.abs(dayDiff)>1?'s':''}</span>`:'';
  const hours=Array.from({length:24},(_,h)=>{
   const options=resolveWallTime(base.date,String(h).padStart(2,'0')+':00',zones[0]);if(!options.length)return '<button class="tz-hour" disabled title="Skipped by daylight saving">—</button>';
   const ms=options[Math.min(+occurrence.value||0,options.length-1)],at=partsAt(ms,zone),cls=h===base.hour?'selected':at.hour>=9&&at.hour<18?'work':at.hour>=7&&at.hour<21?'evening':'';
   return `<button class="tz-hour ${cls}" data-hour="${h}" aria-label="Set ${String(h).padStart(2,'0')}:00 in ${safe(cityLabel(zones[0]))}; ${safe(plainClock(ms,zone))} in ${safe(cityLabel(zone))}" ${h===base.hour?'aria-pressed="true"':''}>${at.hour}${at.minute?':'+String(at.minute).padStart(2,'0'):''}</button>`;
  }).join('');
  return `<section class="timezone-row" aria-label="${safe(cityLabel(zone))}"><div class="tz-city"><span class="tz-day-icon ${night?'night':''}">${svg(night?'moon':'sun')}</span><div><h2>${safe(cityLabel(zone))}</h2><span class="tz-city-sub">${safe(formatOffset(offsetMinutes(instant,zone)))}</span><div class="tz-city-actions">${index===0?'<span class="tz-reference-badge">Reference city</span>':`<button class="tz-reference-button" data-reference="${index}">Make reference</button>`}${zones.length>1?`<button class="tz-remove" data-remove="${index}" aria-label="Remove ${safe(cityLabel(zone))}">Remove</button>`:''}</div></div></div><div><div class="tz-clock">${clockMarkup(p)}</div><div class="tz-date-label">${dateLabel}${difference}</div></div><div class="tz-hours" aria-label="Hourly timeline for ${safe(cityLabel(zone))}">${hours}</div></section>`;
 }).join('');
 rows.querySelectorAll('[data-hour]').forEach(button=>button.addEventListener('click',()=>{time.value=String(+button.dataset.hour).padStart(2,'0')+':00';occurrence.value='0';render();}));
 rows.querySelectorAll('[data-reference]').forEach(button=>button.addEventListener('click',()=>{const index=+button.dataset.reference;zones.unshift(zones.splice(index,1)[0]);setInputs(instant);const candidates=resolveWallTime(date.value,time.value,zones[0]);occurrence.value=String(Math.max(0,candidates.indexOf(instant)));render();}));
 rows.querySelectorAll('[data-remove]').forEach(button=>button.addEventListener('click',()=>{const index=+button.dataset.remove;zones.splice(index,1);if(index===0)setInputs(instant);render();}));
 rows.querySelectorAll('.tz-hours').forEach(track=>{const selected=track.querySelector('.selected');if(selected)track.scrollLeft=selected.offsetLeft-track.offsetLeft-track.clientWidth/2+selected.clientWidth/2;});
 $('#tz-add').disabled=zones.length>=8;$('#tz-add').setAttribute('title',zones.length>=8?'You can compare up to 8 time zones':'Add another city');
}
[date,time,format,duration,occurrence].forEach(el=>el.addEventListener('change',()=>{if(el===date||el===time)occurrence.value='0';feedback('');render();}));
slider.addEventListener('input',()=>{time.value=String(Math.floor(+slider.value/60)).padStart(2,'0')+':'+String(+slider.value%60).padStart(2,'0');occurrence.value='0';render();});
$('#tz-now').addEventListener('click',()=>{instant=Date.now();setInputs(instant);render();feedback('Showing the current time.');});
const dialog=$('#tz-dialog'),search=$('#tz-search'),results=$('#tz-search-results');
const aliases={'Asia/Kolkata':'India Mumbai Delhi Bangalore','Asia/Calcutta':'India Mumbai Delhi Bangalore','America/New_York':'Eastern ET EST EDT NYC USA','America/Los_Angeles':'Pacific PT PST PDT San Francisco Seattle USA','Europe/London':'United Kingdom UK GMT BST','Europe/Paris':'France','Asia/Tokyo':'Japan','Australia/Sydney':'Australia','Asia/Dubai':'UAE United Arab Emirates','Asia/Kathmandu':'Nepal','UTC':'Universal Coordinated Greenwich GMT'};
function renderSearch(){const query=search.value.trim().toLowerCase();const choices=allZones.filter(zone=>!zones.includes(zone)&&(`${zone} ${cityLabel(zone)} ${aliases[zone]||''}`).toLowerCase().includes(query)).slice(0,query?70:16);results.innerHTML=choices.map(zone=>`<button class="zone-option" data-zone="${safe(zone)}"><div>${safe(cityLabel(zone))}<span>${safe(zone)} · ${formatOffset(offsetMinutes(instant,zone))}</span></div>${svg('plus')}</button>`).join('')||'<p>No matching time zone. Try another nearby city or an IANA zone name.</p>';results.querySelectorAll('[data-zone]').forEach(b=>b.addEventListener('click',()=>{if(zones.length<8)zones.push(b.dataset.zone);dialog.close();render();$('#tz-add').focus();}));}
$('#tz-add').addEventListener('click',()=>{search.value='';renderSearch();dialog.showModal();search.focus();});$('#tz-dialog-close').addEventListener('click',()=>dialog.close());dialog.addEventListener('click',event=>{if(event.target===dialog){const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close();}});search.addEventListener('input',renderSearch);
async function copy(text,success){try{await navigator.clipboard.writeText(text);feedback(success);}catch{feedback('Copy is unavailable in this browser. Select and copy: '+text);}}
$('#tz-copy').addEventListener('click',()=>copy(zones.map(zone=>`${cityLabel(zone)}: ${new Intl.DateTimeFormat('en-US',{timeZone:zone,dateStyle:'full'}).format(new Date(instant))}, ${plainClock(instant,zone)} (${formatOffset(offsetMinutes(instant,zone))})`).join('\n'),'Meeting times copied.'));
$('#tz-share').addEventListener('click',()=>{const url=new URL(location.href);url.search='';url.searchParams.set('zones',zones.join(','));url.searchParams.set('date',date.value);url.searchParams.set('time',time.value);url.searchParams.set('duration',duration.value);url.searchParams.set('format',format.checked?'12':'24');if(occurrence.value==='1')url.searchParams.set('occurrence','1');copy(url.href,'Link copied with your cities, date and time.');});
$('#tz-calendar').addEventListener('click',()=>{const text=['BEGIN:VCALENDAR','VERSION:2.0','PRODID:-//Cowlendar//Timezone Converter//EN','CALSCALE:GREGORIAN','BEGIN:VEVENT',`UID:${crypto.randomUUID()}@cowlendar.com`,`DTSTAMP:${calendarStamp(Date.now())}`,`DTSTART:${calendarStamp(instant)}`,`DTEND:${calendarStamp(instant+Number(duration.value)*60000)}`,'SUMMARY:Meeting',`DESCRIPTION:Planned with Cowlendar timezone converter. Reference city: ${cityLabel(zones[0])}.`,'END:VEVENT','END:VCALENDAR',''].join('\r\n');const url=URL.createObjectURL(new Blob([text],{type:'text/calendar;charset=utf-8'}));const a=document.createElement('a');a.href=url;a.download='cowlendar-meeting.ics';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);feedback('Calendar file downloaded. Open it to add the meeting to your calendar.');});
render();
