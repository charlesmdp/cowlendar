import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {inspectCalendar} from '../lib/toolkit/inspect-calendar.mjs';
import {targetURL,isPublicAddress} from '../functions/api/tool-inspect.js';
import {auditStorefront} from '../lib/toolkit/storefront-audit.mjs';
import {toolGuides} from '../lib/tool-guides.mjs';
import {legacyToolGuides} from '../lib/legacy-tool-guides.mjs';
import {parseDocument} from 'htmlparser2';
import {findAll} from 'domutils';
import {teamGuide} from '../lib/toolkit/team-hours/page.mjs';
const definitions={};
for(const slug of Object.keys(toolGuides))definitions[slug]=(await import('../lib/toolkit/tools/'+slug+'.mjs')).default;
function run(slug,values={},state={}){
 const t=definitions[slug];return t.run({...Object.fromEntries(t.fields.map(f=>[f.key,f.value])),...values},'',state);
}
test('all visible tools have their own canonical, H1, social image, six FAQs and sitemap entry',()=>{
 const sitemap=fs.readFileSync('dist/sitemap.xml','utf8'),titles=new Set(),questions=new Set();
 for(const [slug,g] of Object.entries({...toolGuides,...legacyToolGuides,'team-working-hours-planner':teamGuide})){
  const path='/free-tools/'+slug,html=fs.readFileSync('dist'+path+'.html','utf8'),doc=parseDocument(html),nodes=findAll(n=>!!n.name,doc.children);
  assert.equal(nodes.filter(n=>n.name==='h1').length,1,slug);assert.equal(nodes.filter(n=>n.attribs.rel==='canonical'&&n.attribs.href==='https://cowlendar.com'+path).length,1,slug);assert.ok(sitemap.includes('<loc>https://cowlendar.com'+path+'</loc>'));
  assert.ok(fs.existsSync('dist/assets/toolkit/'+slug+'.png'));assert.ok(g.faq.length>=6);for(const [q] of g.faq){questions.add(q);assert.ok(nodes.some(n=>n.name==='summary'&&n.children?.some(c=>c.data?.includes(q))),slug+' '+q);}
  titles.add(g.title);
 }assert.equal(titles.size,25);assert.equal(questions.size,150);
});
test('booking audit reads the service, ignores scripts/nav, and uses the booking action',()=>{
 const page=auditStorefront('<html><head><title>Shop</title></head><body><main><h1>Sunset tour</h1><div>$60 · 90 minutes</div><script>cancellation</script><a href="/book">Book now</a></main><footer>Refund policy</footer></body></html>','https://example.com/');
 assert.equal(page.title,'Sunset tour');assert.deepEqual(page.signals.map(s=>s[1]),['$60','90 minutes','','','Book now']);
});
test('only public HTTPS hostnames reach public lookups or redirects',()=>{
 for(const value of ['http://example.org/','https://127.1/','https://[::1]/','https://x.local/','https://example.org:81/','https://joe:pass@example.org/','file:///tmp/test'])assert.throws(()=>targetURL(value));
 for(const ip of ['127.0.0.1','192.168.1.2','169.254.169.254','::1','::ffff:10.0.0.2','fe80::1'])assert.equal(isPublicAddress(ip),false);
 assert.ok(isPublicAddress('1.1.1.1'));
});
test('return travel pricing uses included distance both ways, independent of time and tolls',()=>{
 const r=run('mobile-service-travel-fee-calculator',{distance:10,radius:0,rate:.6,minutes:40,hourly:30,extras:0});assert.match(r.actions[0].text,/\$32\.00/);
});
test('passes count days inclusively and merge overlapping freezes before a newly extended expiry',()=>{
 const html=run('class-pass-expiry-calculator',{start:'2027-03-01',duration:10,freezes:'2027-03-05,2027-03-07\n2027-03-07,2027-03-08\n2027-03-14,2027-03-14'}).html;
 assert.match(html,/2027-03-15/);assert.match(html,/5 days/);
});
test('waitlist preserves priority, full-time availability and whole parties',()=>{
 const r=run('booking-waitlist-matcher',{queue:'A,4,*,14:00,15:00\nB,2,*,14:00,16:00\nC,1,*,14:15,16:00\nD,1,*,13:00,15:00'});
 const csv=r.actions[0].content;assert.match(csv,/"A","4","Needs more places"/);assert.match(csv,/"C","1","Outside availability"/);assert.match(csv,/"D","1","Contact next"/);
});
test('check-in counts individual arrivals while commissions group repeated stylist names',()=>{
 const state={},slug='class-check-in-sheet-generator';run(slug,{roster:'Lee,4'},state);state.checked.add('0-2');const r=run(slug,{roster:'Lee,4'},state);
 assert.match(r.html,/1 \/ 4 checked in/);assert.equal((r.html.match(/data-arrival=/g)||[]).length,4);assert.ok(r.actions[1].content.includes('"Yes"'));
 const s=run('salon-commission-calculator',{sales:'Alex,700,100,50\nAlex,100,50,10'});assert.match(s.html,/\$395\.00/);
});
test('ICS preview applies EXDATE, moved occurrences and TRANSPARENT status',()=>{
 const ics=['BEGIN:VCALENDAR','VERSION:2.0','PRODID:-//test//EN','BEGIN:VEVENT','UID:1','DTSTART:20270301T090000Z','DTEND:20270301T100000Z','RRULE:FREQ=DAILY;COUNT=4','EXDATE:20270302T090000Z','SUMMARY:Class','TRANSP:TRANSPARENT','END:VEVENT','BEGIN:VEVENT','UID:1','RECURRENCE-ID:20270303T090000Z','DTSTART:20270303T110000Z','DTEND:20270303T120000Z','SUMMARY:Moved class','END:VEVENT','END:VCALENDAR'].join('\r\n');
 const report=inspectCalendar(ics,'2027-03-01');assert.equal(report.rows.length,3);assert.equal(report.rows[1].name,'Moved class');assert.equal(report.rows[0].busy,'Free');assert.match(report.rows[1].start,/11:00/);
});
