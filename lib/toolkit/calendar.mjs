import {Temporal} from '@js-temporal/polyfill';
import {select} from './shared.mjs';
const zones=Array.from(new Set(['UTC','Europe/Paris','America/New_York',...(Intl.supportedValuesOf?.('timeZone')||['Europe/London','America/Los_Angeles','Asia/Tokyo','Australia/Sydney'])]));
export const zoneField=select('zone','Venue time zone','Europe/Paris',zones);
export function zoned(value,zone){
  try{return Temporal.PlainDateTime.from(value).toZonedDateTime(zone,{disambiguation:'reject'});}
  catch{throw new Error('Check '+value.replace('T',' ')+' in '+zone+'. Choose an unambiguous local time outside the clock change.');}
}
export const utcStamp=z=>z.toInstant().toString({smallestUnit:'second'}).replace(/[-:]/g,'');
const icsText=s=>String(s).replace(/\\/g,'\\\\').replace(/\r\n|\n|\r/g,'\\n').replace(/;/g,'\\;').replace(/,/g,'\\,').replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/g,'');
function fold(line) {
  const parts=[];let text='',bytes=0;
  for(const ch of line){
    const code=ch.codePointAt(0), length=code<128?1:code<2048?2:code<65536?3:4;
    if(bytes+length>75){parts.push(text);text=' ';bytes=1;}
    text+=ch;bytes+=length;
  }
  parts.push(text);return parts.join('\r\n');
}
export function calendarFile(events) {
  const stamp=new Date().toISOString().replace(/[-:]/g,'').split('.')[0]+'Z';
  const lines=['BEGIN:VCALENDAR','VERSION:2.0','PRODID:-//Cowlendar//Booking tools//EN','CALSCALE:GREGORIAN'];
  for(const e of events){
    lines.push('BEGIN:VEVENT','UID:'+crypto.randomUUID()+'@cowlendar.com','DTSTAMP:'+stamp,'DTSTART:'+e.start,'DTEND:'+e.end,'SUMMARY:'+icsText(e.title),'LOCATION:'+icsText(e.location),'DESCRIPTION:'+icsText(e.details||''),'END:VEVENT');
  }
  return [...lines,'END:VCALENDAR'].map(fold).join('\r\n')+'\r\n';
}
