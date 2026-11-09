import {escape as esc} from '../shared.mjs';
import {axisTicks,days,duration,intervalLabel} from './model.mjs';

const tones = ['#298675','#ac633f','#7164aa','#497aa0','#99722c','#b25577'];
const tone = i => tones[i % tones.length];

function weeklyHours(hours) {
  const groups = [];
  hours.forEach((shift,i)=>{
    if (!shift) return;
    const last = groups.at(-1);
    if (last?.end === i-1 && last.time === shift.join('–')) last.end = i;
    else groups.push({first:i,end:i,time:shift.join('–'),overnight:shift[1]<shift[0]});
  });
  return groups.map(g=>{
    const range = days[g.first].slice(0,3)+(g.end===g.first?'':'–'+days[g.end].slice(0,3));
    return '<span>'+range+' · '+g.time+(g.overnight?' (+1 day)':'')+'</span>';
  }).join('') || '<span>No working days</span>';
}
function rail(day, spans, zone) {
  const width = day.end-day.start;
  return '<div class="th-rail" aria-hidden="true">'+axisTicks(day,zone).slice(1,-1).map(t=>'<i style="left:'+t.percent+'%"></i>').join('')+
    spans.map(([a,b])=>'<b style="left:'+((a-day.start)*100/width)+'%;width:'+((b-a)*100/width)+'%"></b>').join('')+'</div>';
}
export function weekControls(week,selected) {
  return week.map(day=>{
    const total=duration(day.shared), active=day.date.equals(selected);
    return '<button type="button" data-date="'+day.date.toString()+'" aria-pressed="'+active+'" aria-label="'+day.date.toLocaleString('en',{dateStyle:'full'})+', '+total+' shared"><span>'+days[day.date.dayOfWeek-1].slice(0,3)+'</span><strong>'+day.date.day+'</strong><small>'+total+'</small></button>';
  }).join('');
}
export function dayView(day,team,zone,nowMs) {
  const rangeLabel = spans=>spans.map(span=>intervalLabel(span,day,zone)).join(' · ');
  const isToday = nowMs>=day.start && nowMs<day.end;
  const axis = '<div class="th-axis" aria-hidden="true">'+axisTicks(day,zone).map(t=>'<span style="left:'+t.percent+'%">'+t.label+'</span>').join('')+'</div>';
  const common = team.length ? '<div class="th-overlap"><div><span>Everyone on shift</span><strong>'+duration(day.shared)+'</strong></div><p>'+ (day.shared.length ? rangeLabel(day.shared) : 'No shared working hours on this day.')+'</p></div>' : '';
  const rows = team.map((member,i)=>{
    const parts=member.name.trim().split(/\s+/), initials=Array.from(parts[0])[0]+(parts.length>1?Array.from(parts.at(-1))[0]:'');
    const spans=day.rows[i], onShift=isToday && spans.some(([start,end])=>start<=nowMs && nowMs<end);
    return '<article class="th-person" style="--person:'+tone(i)+'"><div class="th-identity"><span class="th-avatar" aria-hidden="true">'+esc(initials.toUpperCase())+'</span><div><h3>'+esc(member.name)+'</h3><small>'+esc(member.zone.replaceAll('_',' '))+'</small></div></div>'+
      '<div class="th-local">'+weeklyHours(member.hours)+'</div><div class="th-time"><div>'+ (spans.length?rangeLabel(spans):'Off this day')+(onShift?' <span class="th-live">On shift now</span>':'')+'</div>'+rail(day,spans,zone)+'</div>'+
      '<button type="button" class="th-edit" data-edit="'+i+'" aria-label="Edit '+esc(member.name)+'">Edit</button></article>';
  }).join('');
  return common + '<div class="th-board-head"><h2>Team schedule</h2><span>Times in '+esc(zone.replaceAll('_',' '))+'</span></div>'+
    (team.length ? '<div class="th-row-head" aria-hidden="true"><span>Teammate</span><span>Usual local hours</span>'+axis+'<span></span></div>'+rows :
    '<p class="th-empty">Add your first teammate to see their working hours.</p>');
}
