import {inspectCalendar} from '../inspect-calendar.mjs';
self.onmessage=({data})=>{
 try{self.postMessage({report:inspectCalendar(data.input,data.from)});}
 catch(e){self.postMessage({error:'Could not validate this calendar. '+String(e.message).slice(0,150)});}
};
