const pad=n=>String(n).padStart(2,'0');
const cache=new Map();
function formatter(zone){if(!cache.has(zone))cache.set(zone,new Intl.DateTimeFormat('en-CA',{timeZone:zone,year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit',second:'2-digit',hourCycle:'h23'}));return cache.get(zone);}
export function partsAt(instant,zone){const p=Object.fromEntries(formatter(zone).formatToParts(new Date(instant)).filter(x=>x.type!=='literal').map(x=>[x.type,x.value]));return {year:+p.year,month:+p.month,day:+p.day,hour:+p.hour,minute:+p.minute,second:+p.second,date:`${p.year}-${p.month}-${p.day}`,time:`${p.hour}:${p.minute}`};}
export function offsetMinutes(instant,zone){const p=partsAt(instant,zone);return (Date.UTC(p.year,p.month-1,p.day,p.hour,p.minute,p.second)-Math.floor(+instant/1000)*1000)/60000;}
export function resolveWallTime(date,time,zone){
 if(!/^\d{4}-\d{2}-\d{2}$/.test(date)||!/^\d{2}:\d{2}$/.test(time))return [];
 const [y,m,d]=date.split('-').map(Number),[h,min]=time.split(':').map(Number);if(y<1900||y>2100||h>23||min>59)return [];
 const wall=Date.UTC(y,m-1,d,h,min),offsets=new Set();
 for(let hour=-36;hour<=36;hour+=6)offsets.add(offsetMinutes(wall+hour*3600000,zone));
 return [...offsets].map(off=>wall-off*60000).filter(ms=>{const p=partsAt(ms,zone);return p.date===date&&p.time===time;}).sort((a,b)=>a-b);
}
export function formatOffset(minutes){const sign=minutes<0?'−':'+';const seconds=Math.round(Math.abs(minutes)*60),h=Math.floor(seconds/3600),m=Math.floor(seconds%3600/60),s=seconds%60;return `UTC${sign}${pad(h)}:${pad(m)}${s?':'+pad(s):''}`;}
export function cityLabel(zone){return zone.split('/').pop().replaceAll('_',' ');}
export function calendarStamp(ms){return new Date(ms).toISOString().replace(/[-:]/g,'').slice(0,15)+'Z';}
