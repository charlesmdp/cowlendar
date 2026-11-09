import test from 'node:test';
import assert from 'node:assert/strict';
import {buildWeek,exampleTeam,duration,intervalLabel,cleanPlan,plainDate,workweek} from '../lib/toolkit/team-hours/model.mjs';

const monday=plainDate('2026-11-09');
test('uses each person’s working days and local zone, including a short Friday',()=>{
  const team=exampleTeam(); team[2].hours[4]=['15:30','16:15'];
  const week=buildWeek(team,'Europe/Paris',monday);
  assert.equal(intervalLabel(week[0].shared[0],week[0],'Europe/Paris'),'15:00–18:00');
  assert.equal(duration(week[4].shared),'45m');
  assert.deepEqual(week[5].shared,[]);
});
test('overnight shifts can start on the preceding local date or Sunday of the preceding week',()=>{
  const night={name:'Overnight',zone:'UTC',hours:workweek('22:00','06:00',0)};
  night.hours[6]=['22:00','06:00'];
  const week=buildWeek([night],'Asia/Kathmandu',monday);
  assert.equal(intervalLabel(week[0].shared[0],week[0],'Asia/Kathmandu'),'03:45–11:45');
});
test('the fall repeat and spring jump in New York change the actual duration of a shift',()=>{
  const m={name:'Night desk',zone:'America/New_York',hours:workweek('00:00','04:00',7)};
  for(const [date,total,length] of [['2026-11-01','5h',25],['2026-03-08','3h',23]]){
    const day=buildWeek([m],m.zone,plainDate(date))[6];
    assert.equal(duration(day.shared),total);
    assert.equal((day.end-day.start)/3600000,length);
  }
});
test('rejects invalid saved or shared schedules and empty teams have no shared time',()=>{
  assert.throws(()=>cleanPlan({v:1,zone:'Europe/Fake',team:[]}));
  assert.throws(()=>cleanPlan({v:1,zone:'UTC',team:[{name:'Kim',zone:'UTC',hours:workweek('09:00','09:00')}]}));
  assert.deepEqual(buildWeek([],'UTC',monday)[0].shared,[]);
});
