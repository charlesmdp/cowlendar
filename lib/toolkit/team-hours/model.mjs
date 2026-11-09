import {Temporal} from '@js-temporal/polyfill';

export const slug = 'team-working-hours-planner';
export const days = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];
export const maxMembers = 16;
const isTime = value => typeof value === 'string' && /^(?:[01]\d|2[0-3]):[0-5]\d$/.test(value);

export function workweek(start = '09:00', end = '17:00', count = 5) {
  return days.map((_, i) => i < count ? [start, end] : null);
}
export function exampleTeam() {
  return [
    {name:'Camille', zone:'Europe/Paris', hours:workweek('09:00','18:00')},
    {name:'Jordan', zone:'America/New_York', hours:workweek('09:00','17:00')},
    {name:'Alex', zone:'Europe/London', hours:workweek('10:00','18:00',4)}
  ];
}
function checkZone(zone) {
  if (typeof zone !== 'string' || !zone || zone.length > 80) throw Error('Choose a valid time zone.');
  new Intl.DateTimeFormat('en', {timeZone:zone});
  return zone;
}
export function cleanMember(member) {
  const name = typeof member?.name === 'string' ? member.name.trim() : '';
  if (!name || name.length > 40) throw Error('Enter a name of up to 40 characters.');
  const zone = checkZone(member.zone);
  if (!Array.isArray(member.hours) || member.hours.length !== 7) throw Error('Use a seven-day schedule.');
  const hours = member.hours.map((shift, index) => {
    if (shift === null) return null;
    if (!Array.isArray(shift) || shift.length !== 2 || !shift.every(isTime))
      throw Error('Check the start and end times for ' + days[index] + '.');
    if (shift[0] === shift[1]) throw Error('Choose different start and end times for ' + days[index] + '.');
    return [...shift];
  });
  return {name,zone,hours};
}
export function cleanPlan(data) {
  if (data?.v !== 1 || !Array.isArray(data.team) || data.team.length > maxMembers) throw Error('Invalid team schedule.');
  return {v:1, zone:checkZone(data.zone), team:data.team.map(cleanMember)};
}

export const plainDate = date => Temporal.PlainDate.from(date, {overflow:'reject'});
export const todayIn = zone => Temporal.Now.plainDateISO(zone);
const at = (date, time, zone) => date.toPlainDateTime(time).toZonedDateTime(zone).epochMilliseconds;
const zoned = (instant, zone) => Temporal.Instant.fromEpochMilliseconds(instant).toZonedDateTimeISO(zone);
export const timeAt = (instant,zone) => zoned(instant,zone).toPlainTime().toString({smallestUnit:'minute'});
export function intervalLabel([start,end], day, zone) {
  const first = zoned(start,zone), last = zoned(end,zone);
  const endText = end === day.end ? '24:00' : timeAt(end,zone);
  if (first.offset !== last.offset) return timeAt(start,zone) + ' (UTC' + first.offset + ')–' + endText + ' (UTC' + last.offset + ')';
  return timeAt(start,zone) + '–' + endText;
}
function merge(spans) {
  const result = [];
  for (const [start,end] of spans.sort((a,b) => a[0]-b[0])) {
    const previous = result.at(-1);
    if (previous && start <= previous[1]) previous[1] = Math.max(previous[1],end);
    else result.push([start,end]);
  }
  return result;
}
function memberShifts(member, start, end) {
  const intervals = [];
  // A shift beginning the previous local day can cross the start of the board.
  let date = zoned(start,member.zone).toPlainDate().subtract({days:1});
  const last = zoned(end-1,member.zone).toPlainDate();
  while (Temporal.PlainDate.compare(date,last) <= 0) {
    const shift = member.hours[date.dayOfWeek-1];
    if (shift) {
      const [from,to] = shift;
      const next = from > to ? date.add({days:1}) : date;
      const left = Math.max(start,at(date,from,member.zone));
      const right = Math.min(end,at(next,to,member.zone));
      if (left < right) intervals.push([left,right]);
    }
    date = date.add({days:1});
  }
  return merge(intervals);
}
function intersect(first, second) {
  const shared = [];
  for (const [a,b] of first) for (const [c,d] of second) {
    const start = Math.max(a,c), end = Math.min(b,d);
    if (start < end) shared.push([start,end]);
  }
  return shared;
}
export function buildWeek(team, zone, selected) {
  const monday = selected.subtract({days:selected.dayOfWeek-1});
  const bounds = Array.from({length:8}, (_,i) => monday.add({days:i}).toZonedDateTime(zone).epochMilliseconds);
  const shifts = team.map(member=>memberShifts(member,bounds[0],bounds[7]));
  return bounds.slice(0,7).map((start,i)=>{
    const end = bounds[i+1], date = monday.add({days:i});
    const rows = shifts.map(spans=>intersect(spans,[[start,end]]));
    const shared = rows.length ? rows.reduce(intersect) : [];
    return {date,start,end,rows,shared};
  });
}
export function axisTicks(day,zone) {
  if (day.start === day.end) return [];
  const tick = (hour, atMs) => ({label:hour, percent:100*(atMs-day.start)/(day.end-day.start)});
  return [tick('00',day.start), ...['06','12','18'].map(h=>tick(h,at(day.date,h+':00',zone))), tick('24',day.end)];
}
export function duration(spans) {
  const mins = spans.reduce((sum,[a,b])=>sum+(b-a)/60000,0);
  if (!mins) return '0h';
  const hours = Math.floor(mins/60), rest = Math.round(mins%60);
  return [hours ? hours+'h' : '', rest ? rest+'m' : ''].filter(Boolean).join(' ');
}
