import {field,select,artworkPhoto,escape,printAction,httpUrl,copy} from '../shared.mjs';
const themes={coast:['Kayak & coast','kayak'],studio:['Studio workshop','workshops'],spa:['Spa & wellness','wellness']};
export default {
 formTitle:'Personalize the voucher',resultTitle:'Gift voucher preview',
 fields:[select('theme','Cover design','coast',Object.entries(themes).map(([key,[label]])=>[key,label])),artworkPhoto('cover','Custom cover photo (optional)'),field('business','Experience provider','Harbour Kayak Club'),field('experience','Experience','A sunset kayak tour for two'),field('to','Gift recipient','Alex'),field('from','Gift from','Morgan'),field('code','Existing redemption code','SAMPLE-002'),field('url','Booking link','https://demo.cowlendar.com/','url'),field('message','Gift message','For our next adventure together.','textarea',{wide:true,optional:true})],
 run(v,asset,state={}){
  const url=httpUrl(v.url),image=state.photos?.cover||'/assets/usecases/'+themes[v.theme][1]+'.webp';
  return {html:'<article class="gift-ticket"><img class="gift-cover" alt="" src="'+escape(image)+'"><div class="gift-body"><span>'+escape(v.business)+'</span><h3>'+escape(v.experience)+'</h3><p>For '+escape(v.to)+' · From '+escape(v.from)+'</p><p>'+escape(v.message)+'</p></div><footer><div><small>Redemption code</small><b>'+escape(v.code)+'</b></div><a href="'+escape(url)+'" target="_blank" rel="noopener noreferrer">Book your experience ↗</a><small class="gift-url">'+escape(url)+'</small></footer></article>',
  actions:[printAction,copy('Copy gift details',[v.experience,'For '+v.to+' · From '+v.from,v.message,'Code: '+v.code,url].join('\n'))]};
 }
};
