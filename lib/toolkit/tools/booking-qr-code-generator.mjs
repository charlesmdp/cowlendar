import QRCode from 'qrcode/lib/core/qrcode.js';
import {field,logo,escape,httpUrl,contactLogo,printAction} from '../shared.mjs';
function makeQR(url) {
  const {modules}=QRCode.create(url,{errorCorrectionLevel:'M'});
  const edge=modules.size+8, paths=[];
  for(let y=0;y<modules.size;y++)for(let x=0;x<modules.size;x++){
    if(modules.get(y,x))paths.push('M'+(x+4)+' '+(y+4)+'h1v1h-1z');
  }
  return '<svg class="kit-qr" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 '+edge+' '+edge+'" role="img" aria-label="Scannable booking QR code" shape-rendering="crispEdges"><rect width="100%" height="100%" fill="white"/><path d="'+paths.join('')+'" fill="#171926"/></svg>';
}
export default {
  formTitle:'Design your sign',resultTitle:'Booking sign',
  fields:[field('url','Booking page URL','https://demo.cowlendar.com/','url',{wide:true}),field('business','Business name','Fieldwork Studio'),field('headline','Sign headline','Scan to book'),logo],
  run(v,asset){
    const url=httpUrl(v.url);
    if(new TextEncoder().encode(url).length>1200)throw new Error('Choose a booking URL shorter than 1,200 bytes for a readable QR code.');
    const qr=makeQR(url);
    return {html:'<div class="kit-poster">'+contactLogo(asset)+'<p>'+escape(v.business)+'</p><h3>'+escape(v.headline)+'</h3>'+qr+'<small>'+escape(new URL(url).host)+'</small></div>',
      actions:[{label:'Download QR · PNG',async perform(){
        const svg=new Blob([qr],{type:'image/svg+xml'}),src=URL.createObjectURL(svg);
        try {
          const img=new Image();img.src=src;await img.decode();
          const canvas=document.createElement('canvas');
          const modules=Number(qr.match(/viewBox="0 0 (\d+)/)[1]);
          canvas.width=canvas.height=modules*Math.ceil(1200/modules);
          const ctx=canvas.getContext('2d');ctx.imageSmoothingEnabled=false;
          ctx.drawImage(img,0,0,canvas.width,canvas.height);
          const blob=await new Promise(resolve=>canvas.toBlob(resolve,'image/png'));
          if(!blob)throw new Error('Could not create PNG.');
          return {filename:'booking-qr-code.png',blob};
        } finally {URL.revokeObjectURL(src);}
      }}, printAction]};
  }
};
