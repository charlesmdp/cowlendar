import {layout,esc,schemaBreadcrumb,ORIGIN} from '../../editorial.mjs';
import {toolArt} from '../../tool-art.mjs';
import {slug,days,buildWeek,plainDate,exampleTeam} from './model.mjs';
import {dayView,weekControls} from './view.mjs';

export const teamGuide = {
  name:'Team Working Hours Planner',
  title:'Free Team Working Hours Planner & Time Zone Overlap Finder | Cowlendar',
  description:'Map your team’s workdays and shifts across time zones. See who is scheduled now, compare a full week and share the hours everyone can meet.',
  short:'See who works when across time zones and find the hours your whole team shares.',
  faq:[
    ['How do I find a meeting time everyone can make?', 'Add each teammate’s normal shifts, then compare the shared hours under each date. Select a day to see the exact windows in your chosen time zone. Check individual calendars for existing appointments before sending an invitation.'],
    ['Can someone work different hours on different days?', 'Yes. Choose Edit beside their name. Select each working day and give it its own start and finish. Leave a day unchecked for a day off.'],
    ['How do I enter an overnight shift?', 'Select the day the shift begins. For a Friday 22:00 to Saturday 06:00 shift, enter 22:00 and 06:00 on Friday. The planner includes the portion after midnight on Saturday’s timeline.'],
    ['Which time zone do the bars and shared hours use?', 'All bars and shared windows use the board time zone above the week. The usual hours beside each name are in that teammate’s own time zone. Changing the board time zone leaves their local schedule intact.'],
    ['How does the planner handle daylight saving time?', 'It uses each location’s time zone rules for the selected date. A shift boundary inside a skipped hour moves forward by the clock change. A boundary in a repeated hour uses its first occurrence. A day can contain more or fewer than 24 elapsed hours.'],
    ['How can I share the team schedule?', 'Choose Share plan and copy the link. It includes the names, schedules, board time zone and selected date at the time you copied it. Anyone with the link can open that snapshot. Your own planner is saved in this browser when local storage is available.']
  ]
};
export function teamPage(scriptURL,styleURL) {
  const path='/free-tools/'+slug, url=ORIGIN+path, g=teamGuide;
  // The static example is replaced with the visitor’s current week when opened.
  const exampleDate=plainDate('2026-11-09'), team=exampleTeam(), zone='Europe/Paris', week=buildWeek(team,zone,exampleDate);
  const editor='<dialog id="th-dialog" class="th-dialog" aria-labelledby="th-editor-title"><form id="th-form"><div class="th-dialog-head"><h2 id="th-editor-title">Add teammate</h2><button class="th-icon" type="button" data-close aria-label="Close editor">×</button></div>'+
    '<label>Name<input name="name" maxlength="40" required autocomplete="off"></label><label>Time zone<select name="zone"></select></label>'+
    '<fieldset><legend>Local working hours</legend><div class="th-shift th-shift-head"><span>Workday</span><span>Start</span><span>End</span></div>'+
    days.map((day,i)=>'<div class="th-shift"><label><input type="checkbox" name="day'+i+'">'+day.slice(0,3)+'</label><input type="time" aria-label="'+day+' start" name="start'+i+'" required><input type="time" aria-label="'+day+' end" name="end'+i+'" required></div>').join('')+
    '</fieldset><p class="th-hint">For a night shift, enter the end time on the same row as its start.</p><p id="th-error" role="alert"></p><div class="th-dialog-actions"><button class="th-remove" type="button" id="th-remove">Remove teammate</button><button class="th-primary" type="submit">Save teammate</button></div></form></dialog>';
  const board='<section class="th-planner" aria-label="Team working hours"><div class="th-toolbar"><label>Board time zone<select id="th-zone"><option>'+zone+'</option></select></label><label>Jump to date<input id="th-date" type="date" min="1900-01-01" max="2100-12-31" value="'+exampleDate.toString()+'"></label><button class="th-share" disabled id="th-share">Share plan ↗</button></div>'+
    '<div id="th-share-box" class="th-share-box" hidden><label>Link includes teammate names and schedules<input readonly id="th-link"></label><button type="button" class="th-secondary" id="th-copy">Copy link</button></div>'+
    '<div class="th-week-heading"><h2 id="th-week-label">Week of November 9, 2026</h2><div><button type="button" class="th-icon" id="th-prev" aria-label="Previous week">‹</button><button type="button" class="th-secondary" id="th-today">Today</button><button type="button" class="th-icon" id="th-next" aria-label="Next week">›</button></div></div>'+
    '<div class="th-days" id="th-days" role="group" aria-label="Select a day. Hours shown are shared by everyone.">'+weekControls(week,exampleDate)+'</div>'+
    '<div id="th-board">'+dayView(week[0],team,zone,0)+'</div><div class="th-bottom"><button type="button" class="th-primary" disabled id="th-add">+ Add teammate</button><span id="th-save-state"></span></div><p class="th-status" id="th-status" role="status"></p></section>'+editor;
  const body='<main id="content" class="kit-wrap mint"><nav class="kit-crumbs" aria-label="Breadcrumb"><a href="/">Home</a><span>/</span><a href="/free-tools">Free tools</a><span>/</span>'+g.name+'</nav>'+
    '<section class="kit-lead"><div class="kit-hero-art">'+toolArt(slug)+'</div><div><a class="kit-cat" href="/free-tools#planning">Scheduling &amp; capacity</a><h1>'+g.name+'</h1><p>'+g.short+'</p></div></section><noscript>Enable JavaScript to customize this example team schedule.</noscript>'+board+
    '<section class="kit-guide"><div><h2>Plan a handoff across time zones</h2><p>Enter shifts in each person’s local time, including shorter days and weekends. The weekly strip shows how much time everyone shares each day. Select a date to read each individual shift in one reference time zone.</p><a href="/free-tools/timezone-converter">Convert a meeting time and export it to your calendar →</a></div><aside><h3>Worked example</h3><p>On Monday, November 9, 2026, a Paris teammate working 09:00–18:00 and a New York teammate working 09:00–17:00 overlap from 15:00 to 18:00 in Paris. That gives them three hours for a handoff.</p></aside></section>'+
    '<section class="kit-faq"><h2>Team scheduling FAQ</h2><div>'+g.faq.map(([q,a])=>'<details><summary>'+esc(q)+'</summary><p>'+esc(a)+'</p></details>').join('')+'</div></section></main>';
  return layout({title:g.title,description:g.description,path,body,image:'/assets/toolkit/'+slug+'.png',extraClass:'toolkit',schema:[
    schemaBreadcrumb([['Home','/'],['Free tools','/free-tools'],[g.name,path]]),
    {'@context':'https://schema.org','@type':'WebApplication',name:g.name,url,description:g.description,applicationCategory:'BusinessApplication',operatingSystem:'Any',isAccessibleForFree:true,offers:{'@type':'Offer',price:'0',priceCurrency:'USD'}},
    {'@context':'https://schema.org','@type':'FAQPage',mainEntity:g.faq.map(([name,text])=>({'@type':'Question',name,acceptedAnswer:{'@type':'Answer',text}}))}
  ]}).replace('</head>','<link rel="stylesheet" href="/booking-tools.css"><link rel="stylesheet" href="'+styleURL+'"></head>').replace('</body>','<script type="module" src="'+scriptURL+'"></script></body>');
}
