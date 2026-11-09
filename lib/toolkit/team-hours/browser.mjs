import '../../../ui/team-hours.css';
import {cleanMember,cleanPlan,days,exampleTeam,maxMembers,plainDate,todayIn,workweek,buildWeek} from './model.mjs';
import {dayView,weekControls} from './view.mjs';

const id = name => document.getElementById('th-'+name);
const storageKey = 'cowlendar.team-working-hours.v1';
const browserZone = Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC';
const minDate = '1900-01-01', maxDate = '2100-12-31';
const dateAllowed = d => /^\d{4}-\d{2}-\d{2}$/.test(d) && d >= minDate && d <= maxDate;
const form = id('form'), dialog = id('dialog');
let team=exampleTeam(), zone=browserZone, selected=todayIn(zone), editing=null, week, isShared=false, message='';
const shared = new URLSearchParams(location.hash.slice(1)).get('team');
try {
  let raw;
  if (shared !== null) {
    if (shared.length>30000) throw Error();
    raw=JSON.parse(new TextDecoder().decode(Uint8Array.from(atob(shared.replaceAll('-','+').replaceAll('_','/')),c=>c.charCodeAt(0))));
  } else {
    const stored=localStorage.getItem(storageKey);
    if (stored) raw=JSON.parse(stored);
  }
  if (raw) {
    const plan=cleanPlan(raw);
    const initialDate=shared!==null && dateAllowed(raw.date) ? plainDate(raw.date) : todayIn(plan.zone);
    team=plan.team; zone=plan.zone; selected=initialDate; isShared=shared!==null;
  }
} catch {
  message = shared!==null ? 'This shared link could not be read. Showing the example team.' : '';
  isShared=shared!==null;
}
const availableZones = [...new Set(['UTC',browserZone,zone,...team.map(m=>m.zone),'Asia/Kolkata','Asia/Kathmandu',
  ...(Intl.supportedValuesOf?.('timeZone') || ['Europe/Paris','Europe/London','America/New_York','America/Los_Angeles','Asia/Tokyo','Australia/Sydney'])])].sort();
for (const select of [id('zone'),form.elements.zone]) {
  select.replaceChildren(...availableZones.map(value=>new Option(value.replaceAll('_',' '),value)));
}
function save() {
  if (isShared) { id('save-state').textContent='Viewing a shared copy'; return; }
  try {
    localStorage.setItem(storageKey,JSON.stringify({v:1,team,zone}));
    id('save-state').textContent='Saved in this browser';
  } catch { id('save-state').textContent='Available in this tab'; }
}
function paintBoard() {
  id('board').innerHTML=dayView(week[selected.dayOfWeek-1],team,zone,Date.now());
}
function refresh() {
  week=buildWeek(team,zone,selected);
  id('zone').value=zone; id('date').value=selected.toString();
  id('week-label').textContent='Week of '+week[0].date.toLocaleString('en',{dateStyle:'medium'});
  id('days').innerHTML=weekControls(week,selected);
  for (const button of id('days').children) button.disabled=!dateAllowed(button.dataset.date);
  id('prev').disabled=!dateAllowed(selected.subtract({days:7}).toString());
  id('next').disabled=!dateAllowed(selected.add({days:7}).toString());
  id('add').disabled=team.length>=maxMembers;
  id('share').disabled=false;
  id('share-box').hidden=true;
  paintBoard();
}
function navigate(date) {
  if (dateAllowed(date.toString())) { selected=date; refresh(); }
}
id('prev').onclick=()=>navigate(selected.subtract({days:7}));
id('next').onclick=()=>navigate(selected.add({days:7}));
id('today').onclick=()=>navigate(todayIn(zone));
id('date').onchange=event=>{
  const field=event.target;
  if (!dateAllowed(field.value) || !field.validity.valid) { field.value=selected.toString(); return; }
  navigate(plainDate(field.value));
};
id('days').onclick=event=>{
  const button=event.target.closest('[data-date]');
  if (!button) return;
  navigate(plainDate(button.dataset.date));
  id('days').querySelector('[aria-pressed=true]').focus({preventScroll:true});
};
id('zone').onchange=event=>{ zone=event.target.value; save(); refresh(); };
function updateRow(index) {
  const enabled=form.elements['day'+index].checked;
  form.elements['start'+index].disabled=!enabled;
  form.elements['end'+index].disabled=!enabled;
}
days.forEach((_,i)=>form.elements['day'+i].addEventListener('change',()=>updateRow(i)));
function openEditor(index) {
  editing=index;
  const member=index===null ? {name:'', zone, hours:workweek()} : team[index];
  id('editor-title').textContent=index===null?'Add teammate':'Edit teammate';
  form.elements.name.value=member.name;
  form.elements.zone.value=member.zone;
  days.forEach((_,i)=>{
    const shift=member.hours[i];
    form.elements['day'+i].checked=Boolean(shift);
    form.elements['start'+i].value=shift?.[0]||'09:00';
    form.elements['end'+i].value=shift?.[1]||'17:00';
    updateRow(i);
  });
  id('remove').hidden=index===null;
  id('error').textContent='';
  dialog.showModal();
  form.elements.name.focus();
}
id('board').addEventListener('click',event=>{
  const button=event.target.closest('[data-edit]');
  if (button) openEditor(Number(button.dataset.edit));
});
id('add').onclick=()=>openEditor(null);
form.querySelector('[data-close]').onclick=()=>dialog.close();
function finish(index) {
  dialog.close(); save(); refresh();
  const next=id('board').querySelector('[data-edit="'+index+'"]') || id('add');
  next.focus({preventScroll:true});
}
form.onsubmit=event=>{
  event.preventDefault();
  try {
    const member=cleanMember({name:form.elements.name.value,zone:form.elements.zone.value,
      hours:days.map((_,i)=>form.elements['day'+i].checked ? [form.elements['start'+i].value,form.elements['end'+i].value] : null)});
    const i=editing??team.length;
    team[i]=member; finish(i);
    id('status').textContent=member.name+'’s schedule updated.';
  } catch(e) { id('error').textContent=e.message; }
};
id('remove').onclick=()=>{
  if (editing===null) return;
  const [member]=team.splice(editing,1); finish(Math.min(editing,team.length-1));
  id('status').textContent=member.name+' removed.';
};
id('share').onclick=()=>{
  const payload=new TextEncoder().encode(JSON.stringify({v:1,team,zone,date:selected.toString()}));
  const encoded=btoa(String.fromCharCode(...payload)).replaceAll('+','-').replaceAll('/','_').replace(/=+$/,'');
  const link=new URL(location.href); link.search=''; link.hash='team='+encoded;
  id('link').value=link.href; id('share-box').hidden=false;
  id('link').focus(); id('link').select();
};
id('copy').onclick=async()=>{
  try {await navigator.clipboard.writeText(id('link').value);id('status').textContent='Team schedule link copied.';}
  catch {id('link').focus();id('link').select();id('status').textContent='Copy the selected link to share this schedule.';}
};
id('status').textContent=message;
id('save-state').textContent=isShared?'Viewing a shared copy':'Schedules stay in this browser';
refresh();
setInterval(()=>{if (!document.hidden && !dialog.open && !id('board').contains(document.activeElement)) paintBoard();},60000);
