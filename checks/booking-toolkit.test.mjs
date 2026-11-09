import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {toolGuides} from '../lib/tool-guides.mjs';
import {toolPage,toolsHub} from '../lib/toolkit/pages.mjs';
import {calendarFile,zoned,utcStamp} from '../lib/toolkit/calendar.mjs';
const tools={};
for(const slug of Object.keys(toolGuides)){
  tools[slug]=(await import('../lib/toolkit/tools/'+slug+'.mjs')).default;
}
function run(slug,edits={}){
  const tool=tools[slug];
  return tool.run({...Object.fromEntries(tool.fields.map(f=>[f.key,f.value])),...edits});
}
test('all ten tools render an example, a distinct canonical and crawlable internal links',()=>{
  const hub=toolsHub(),routes=JSON.parse(fs.readFileSync('content/static-routes.json','utf8')).map(r=>r.path);
  for(const [slug,tool] of Object.entries(tools)){
    const page=toolPage(slug,tool),url='/free-tools/'+slug;
    assert.ok(hub.includes('href="'+url+'"'));assert.ok(routes.includes(url));
    assert.ok(page.includes('rel="canonical" href="https://cowlendar.com'+url+'"'));
    assert.ok(page.includes('"@type":"WebApplication"'));assert.ok(page.includes('id="kit-form"'));
    for(const link of [toolGuides[slug].solution,...toolGuides[slug].related.map(x=>'/free-tools/'+x)])assert.ok(routes.includes(link));
    assert.ok(run(slug).actions.length);assert.ok(fs.existsSync('dist/assets/toolkit/'+slug+'.png'));
  }
});
test('workshop uses contribution, whole seats and explains impossible targets',()=>{
  assert.match(run('workshop-break-even-calculator').html,/6 paid seats/);
  assert.match(run('workshop-break-even-calculator',{materials:50}).html,/Out of reach/);
  assert.match(run('workshop-break-even-calculator',{fixed:245,seats:4}).html,/3 seats short/);
});
test('group deposit split distributes remainder cents and rejects overpayment',()=>{
  const html=run('booking-deposit-calculator',{total:100,fixed:10,people:3}).html;
  assert.match(html,/2 × \$3\.33 \+ 1 × \$3\.34/);
  assert.throws(()=>run('booking-deposit-calculator',{total:3}),/cannot exceed/);
});
test('inventory returns at a boundary free stock and real overlaps are counted',()=>{
  const opts={stock:1,rows:'2027-05-08 09:00,2027-05-08 12:00,1\n2027-05-08 12:00,2027-05-08 14:00,1'};
  assert.match(run('rental-inventory-planner',opts).html,/stock covers/);
  assert.match(run('rental-inventory-planner',{...opts,rows:opts.rows.replace('12:00,2027','11:00,2027')}).html,/2 units/);
  assert.throws(()=>run('rental-inventory-planner',{rows:'2027-02-30 10:00,2027-03-12 10:00,1'}),/Row 1/);
});
test('salon stages can share a stylist across chairs, zero wash capacity handled',()=>{
 const params={open:'09:00',close:'11:00',staff:1,chairs:2,active:30,process:30,wash:0};
 assert.match(run('salon-capacity-calculator',params).html,/<strong>3<\/strong>/);
 assert.match(run('salon-capacity-calculator',{...params,wash:10,basins:0}).html,/No complete service/);
});
test('rental quote counts inclusive billable days and separates refundable security',()=>{
 const html=run('equipment-rental-quote-generator',{items:'Projector,2,35',start:'2026-11-06',end:'2026-11-08'}).html;
 assert.match(html,/\$230\.00/);assert.match(html,/\$100\.00/);
 assert.throws(()=>run('equipment-rental-quote-generator',{end:'2027-04-01'}),/end date/);
});
test('calendar exports preserve instants, DST and RFC 5545 folding/escaping',()=>{
 const r=run('add-to-calendar-link-generator',{start:'2026-01-15T14:00',end:'2026-01-15T15:00',zone:'Europe/Paris'});
 assert.match(r.actions[2].content(),/DTSTART:20260115T130000Z/);
 assert.equal(new URL(r.actions[0].text).searchParams.get('dates'),'20260115T130000Z/20260115T140000Z');
 assert.throws(()=>zoned('2026-03-29T02:30','Europe/Paris'),/clock change/);
 assert.throws(()=>zoned('2026-10-25T02:30','Europe/Paris'),/clock change/);
 const file=calendarFile([{start:'20260115T130000Z',end:'20260115T140000Z',title:'é'.repeat(90),location:'a,b;c\nnext',details:'café'}]);
 assert.ok(file.split('\r\n').every(l=>Buffer.byteLength(l)<=75));assert.ok(file.includes('a\\,b\\;c\\nnext'));
 assert.equal(utcStamp(zoned('2026-03-29T03:30','Europe/Paris')),'20260329T013000Z');
});
test('recurring class respects venue wall time over DST, closures and empty results',()=>{
 const opts={start:'2026-03-21',end:'2026-04-05',weekdays:['0'],time:'18:00',zone:'Europe/Paris',skip:'2026-04-05'};
 const r=run('recurring-class-schedule-generator',opts);const ics=r.actions[1].content();
 assert.match(ics,/DTSTART:20260322T170000Z/);assert.match(ics,/DTSTART:20260329T160000Z/);
 assert.equal((ics.match(/BEGIN:VEVENT/g)||[]).length,2);
 assert.equal(run('recurring-class-schedule-generator',{...opts,start:'2026-04-05'}).actions.length,0);
});
test('QR accepts only web links, intake escapes user text, reminder localizes templates',()=>{
 assert.throws(()=>run('booking-qr-code-generator',{url:'javascript:alert(1)'}),/full public link/);
 assert.ok(run('booking-qr-code-generator').html.includes('Scannable booking QR code'));
 assert.ok(run('booking-intake-form-builder',{questions:'<img src=x>'}).html.includes('&lt;img'));
 assert.ok(run('appointment-reminder-generator',{lang:'Español',sector:'2'}).actions[0].text.includes('sesión de fotos'));
});
