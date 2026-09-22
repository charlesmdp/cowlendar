import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {quoteApp,noShowEstimate,generateSlots,slotsCsv} from '../lib/booking-math.mjs';
const apps=JSON.parse(fs.readFileSync(new URL('../content/apps.json',import.meta.url)));
const app=key=>apps.find(a=>a.key===key);
test('comparison uses feature requirements and real revenue thresholds',()=>{
 const params={bookings:20,value:40,features:['bundles','deposits']};
 assert.equal(quoteApp(app('cowlendar'),params).total,13.99);
 assert.equal(quoteApp(app('meety'),params).total,47);
 assert.equal(quoteApp(app('apntly'),params),null);
 assert.equal(quoteApp(app('cowlendar'),{...params,bookings:25}).plan,'Starter');
 assert.equal(quoteApp(app('cowlendar'),{...params,bookings:26}).plan,'Basic');
 assert.equal(quoteApp(app('cowlendar'),{...params,bookings:75}).plan,'Basic');
 assert.equal(quoteApp(app('cowlendar'),{...params,bookings:76}).plan,'Growth');
 assert.equal(quoteApp(app('cowlendar'),{...params,bookings:251}),null);
 assert.equal(quoteApp(app('cowlendar'),{...params,bookings:5}).plan,'Free');
 assert.equal(quoteApp(app('cowlendar'),{...params,bookings:6}).plan,'Starter');
});
test('calculator includes only the entered bundle fee base and respects booking caps',()=>{
 const params={bookings:20,value:40,features:['bundles'],bundleShare:50};
 const q=quoteApp(app('appointo'),params);assert.equal(q.usage,8);assert.equal(q.total,22);
 assert.equal(quoteApp(app('appointo'),{...params,features:['google']}).usage,0);
 assert.equal(quoteApp(app('bookthatapp'),{bookings:51,value:10,features:['google']}).plan,'Premium');
 assert.equal(quoteApp(app('meety'),{...params,bookings:-1}),null);
 assert.equal(quoteApp(app('meety'),{...params,value:Infinity}),null);
 assert.equal(quoteApp(app('meety'),{...params,bookings:1.5}),null);
});
test('no-show calculation accounts for refills and exposes assumptions',()=>{
 const x={bookings:200,price:60,rate:10,refill:0,target:5,minutes:60};
 assert.deepEqual(noShowEstimate(x),{missed:20,unfilled:20,monthly:1200,yearly:14400,hours:20,potential:600,targetLoss:600});
 assert.equal(noShowEstimate({...x,refill:50}).monthly,600);
 assert.equal(noShowEstimate({...x,refill:100}).monthly,0);
 assert.equal(noShowEstimate({...x,bookings:0}).yearly,0);
 assert.equal(noShowEstimate({...x,target:15}),null);
 assert.equal(noShowEstimate({...x,rate:101}),null);
 assert.equal(noShowEstimate({...x,price:NaN}),null);
});
test('time slots fit working periods and need a buffer only between sessions',()=>{
 const p={start:'09:00',end:'17:00',duration:30,buffer:10,breakStart:'12:00',breakEnd:'13:00',capacity:1};
 const r=generateSlots(p);assert.equal(r.slots.length,10);assert.equal(r.appointments,10);assert.equal(r.serviceMinutes,300);assert.equal(r.openMinutes,420);
 assert.deepEqual(r.slots[3],{start:'11:00',end:'11:30',capacity:1});assert.equal(r.slots[4].start,'13:00');assert.equal(r.slots.at(-1).end,'16:50');
 assert.equal(generateSlots({...p,start:'09:00',end:'10:10',breakStart:'',breakEnd:''}).slots.length,2);
 assert.equal(generateSlots({...p,capacity:8}).appointments,80);
 assert.equal(generateSlots({...p,duration:500}).slots.length,0);
 assert.equal(generateSlots({...p,buffer:0}).slots.length,14);
});
test('invalid and overnight schedules never produce misleading slots',()=>{
 const p={start:'09:00',end:'17:00',duration:30,buffer:10};
 for(const edit of [{duration:0},{duration:1.5},{buffer:-1},{capacity:0},{start:'17:00',end:'09:00'},{breakStart:'08:00',breakEnd:'10:00'},{breakStart:'12:00',breakEnd:''},{start:'25:00'}])assert.equal(generateSlots({...p,...edit}),null);
});

test('CSV preserves every local time and capacity as plain rows',()=>{assert.equal(slotsCsv([{start:'09:00',end:'09:30',capacity:8}]),'Start (local),End (local),Capacity\r\n09:00,09:30,8\r\n');});
