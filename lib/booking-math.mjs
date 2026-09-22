export function quoteApp(app, {bookings, value, features, bundleShare = 100}) {
  if (!Number.isInteger(bookings) || bookings < 0 || !Number.isFinite(value) || value < 0 || !Number.isFinite(bundleShare) || bundleShare < 0 || bundleShare > 100 || !Array.isArray(features)) return null;
  const revenue = bookings * value;
  if (!Number.isFinite(revenue)) return null;
  const tiers = (app.pricingTiers || []).filter(t => features.every(f => t.features.includes(f)) && bookings <= (t.maxBookings ?? Infinity) && revenue <= (t.maxRevenue ?? Infinity));
  const quotes = tiers.map(t => {
    const usage = features.includes('bundles') ? revenue * bundleShare / 100 * (t.bundleFee || 0) : 0;
    return {plan:t.name, base:t.price, usage, total:Math.round((t.price + usage)*100)/100, revenue, note:t.note || ''};
  });
  return quotes.sort((a,b)=>a.total-b.total)[0] || null;
}

export function noShowEstimate({bookings, price, rate, refill, target, minutes}) {
  if (![bookings,price,rate,refill,target,minutes].every(Number.isFinite) || !Number.isInteger(bookings) || bookings < 0 || price < 0 || minutes <= 0 || [rate,refill,target].some(v=>v<0||v>100) || target > rate) return null;
  const missed=bookings*rate/100, unfilled=missed*(1-refill/100), monthly=unfilled*price;
  const targetLoss=bookings*target/100*(1-refill/100)*price;
  return {missed, unfilled, monthly, yearly:monthly*12, hours:unfilled*minutes/60, potential:monthly-targetLoss, targetLoss};
}

export function clockMinutes(time) {
  if (!/^\d{2}:\d{2}$/.test(time)) return NaN;
  const [h,m]=time.split(':').map(Number);
  return h>=0&&h<24&&m>=0&&m<60?h*60+m:NaN;
}
export function formatClock(minutes) {
  return `${String(Math.floor(minutes/60)%24).padStart(2,'0')}:${String(minutes%60).padStart(2,'0')}`;
}
export function generateSlots({start,end,duration,buffer,breakStart='',breakEnd='',capacity=1}) {
  const from=clockMinutes(start),to=clockMinutes(end);
  if (![from,to,duration,buffer,capacity].every(Number.isFinite) || to<=from || duration<1 || duration>1440 || buffer<0 || buffer>1440 || capacity<1 || capacity>1000 || ![duration,buffer,capacity].every(Number.isInteger)) return null;
  const hasBreak=Boolean(breakStart||breakEnd),b0=clockMinutes(breakStart),b1=clockMinutes(breakEnd);
  if(hasBreak&&(!Number.isFinite(b0)||!Number.isFinite(b1)||b1<=b0||b0<from||b1>to))return null;
  const periods=hasBreak?[[from,b0],[b1,to]]:[[from,to]], slots=[];
  for(const [a,b] of periods) for(let t=a;t+duration<=b;t+=duration+buffer) slots.push({start:formatClock(t),end:formatClock(t+duration),capacity});
  return {slots,appointments:slots.length*capacity,serviceMinutes:slots.length*duration,openMinutes:to-from-(hasBreak?b1-b0:0)};
}

export function slotsCsv(slots) {
 return 'Start (local),End (local),Capacity\r\n'+slots.map(s=>`${s.start},${s.end},${s.capacity}`).join('\r\n')+'\r\n';
}
