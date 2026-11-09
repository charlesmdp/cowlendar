export function escape(value) {
  return String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;'}[c]));
}
export const number = (key, label, value, min = 0, max = 1000000, step = 1) => ({key, label, value, type:'number', min, max, step});
export const field = (key, label, value, type = 'text', extras = {}) => ({key, label, value, type, ...extras});
export const select = (key, label, value, options) => ({key, label, value, type:'select', options});
export const currency = select('currency', 'Currency', 'USD', ['USD','EUR','GBP','CAD','AUD','CHF']);
export const logo = field('logo','Business logo (optional)','','file',{optional:true, hint:'PNG, JPEG or WebP, up to 3 MB.'});
export const money = (cents, currency) => new Intl.NumberFormat('en', {style:'currency', currency}).format(cents / 100);
export const cents = n => Math.round((Number(n) + Number.EPSILON) * 100);
export const metric = (label,value) => '<div class="kit-metric"><span>'+escape(label)+'</span><strong>'+escape(value)+'</strong></div>';
export const line = (label,value) => '<div class="kit-line"><span>'+escape(label)+'</span><b>'+escape(value)+'</b></div>';
export const note = s => '<p class="kit-note">'+escape(s)+'</p>';
export const optionsFor = field => field.options.map(o => Array.isArray(o) ? o : [o,o]);
export function table(headers, rows) {
  return '<div class="kit-table"><table><thead><tr>'+headers.map(cell=>'<th scope="col">'+escape(cell)+'</th>').join('')+'</tr></thead><tbody>'+rows.map(row=>'<tr>'+row.map(cell=>'<td>'+escape(cell)+'</td>').join('')+'</tr>').join('')+'</tbody></table></div>';
}
export function csv(rows) {
  return '\uFEFF'+rows.map(row=>row.map(v=>{
    let text=String(v);
    if (/^\s*[=+@-]/.test(text)) text="'"+text;
    return '"'+text.replaceAll('"','""')+'"';
  }).join(',')).join('\r\n')+'\r\n';
}
export const download = (label,filename,content,type) => ({label,filename,content,type});
export const printAction = {label:'Print / save PDF', print:true};
export const copy = (label,text) => ({label,text});
export function contactLogo(url) {
  return url?.startsWith('data:image/') ? '<img class="kit-logo" alt="Business logo" src="'+escape(url)+'">' : '';
}
export const isoDate = value => {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) throw new Error('Use dates in YYYY-MM-DD format.');
  const time = Date.parse(value+'T00:00:00Z');
  if (!Number.isFinite(time) || new Date(time).toISOString().slice(0,10)!==value) throw new Error('Enter a valid calendar date.');
  return time;
};
export function dayRange(start,end) {
  const days = (isoDate(end) - isoDate(start))/86400000 + 1;
  if (days < 1) throw new Error('The end date must be on or after the start date.');
  return days;
}
export function httpUrl(value) {
  try {
    const url = new URL(value);
    if (['https:','http:'].includes(url.protocol) && !url.username && !url.password) return url.href;
  } catch {}
  throw new Error('Enter a full public link beginning with https:// or http://.');
}

export function rowsOf(source, max = 250) {
  const rows = String(source).trim().split(/\r?\n/).filter(s=>s.trim());
  if(!rows.length || rows.length>max) throw new Error('Enter between 1 and '+max+' rows.');
  return rows.map(row=>row.split(row.includes('\t')?'\t':',').map(x=>x.trim()));
}
export const artworkPhoto = (key,label) => field(key,label,'','photo',{optional:true,hint:'Choose a local PNG, JPEG or WebP, up to 3 MB.'});
export function track(label, amount, total, text) {
  const width=total>0?Math.max(0,Math.min(100,amount*100/total)):0;
  return '<div class="studio-track"><div><span>'+escape(label)+'</span><strong>'+escape(text)+'</strong></div><i><b style="width:'+width+'%"></b></i></div>';
}
