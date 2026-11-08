/* Original and accessible number-line figures; extension avoids altering legacy diagram engine. */
(()=>{'use strict';
 const drawing=window.TriggleDraw;
 if(!drawing||typeof drawing.drawClassic!=='function')throw Error('TriggleDraw base missing');
 const base=drawing.drawClassic;
 const esc=s=>String(s??'').replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
 function drawClassic(arg){
  const d=arg?.demo;
  if(d?.kind!=='real-number-line')return base(arg);
  const min=Number(d.min),max=Number(d.max),target=Number(d.target);
  if(![min,max,target].every(Number.isFinite)||max<=min||target<min||target>max)return '';
  const left=48,right=352,y=154,range=max-min;
  const x=value=>left+(value-min)/range*(right-left);
  const digits=range<0.015?3:range<0.15?2:range<1.5?1:0;
  const title=esc(arg.ref+' — '+arg.title);
  let t='<rect x="20" y="35" width="360" height="185" rx="14" fill="#f8f7ff"/>'+
    '<line x1="'+left+'" y1="'+y+'" x2="'+right+'" y2="'+y+'" stroke="#7181a9" stroke-width="3"/>'+
    '<path d="M346 148 L354 154 L346 160" fill="none" stroke="#7181a9" stroke-width="2"/>';
  for(let i=0;i<=5;i++){
   const v=min+range*i/5,at=x(v);
   t+='<line x1="'+at+'" y1="'+(y-7)+'" x2="'+at+'" y2="'+(y+7)+'" stroke="#7181a9" stroke-width="2"/>'+
     '<text x="'+at+'" y="'+(y+29)+'" fill="#4c5980" font-size="12" text-anchor="middle">'+esc(v.toFixed(digits))+'</text>';
  }
  const tx=x(target);
  t+='<line x1="'+tx+'" y1="'+(y-58)+'" x2="'+tx+'" y2="'+(y+2)+'" stroke="#d3588e" stroke-width="3"/>'+
     '<circle cx="'+tx+'" cy="'+y+'" r="6" fill="#d3588e" stroke="#ffffff" stroke-width="2"/>'+
     '<text x="'+Math.max(52,Math.min(348,tx))+'" y="'+(y-72)+'" text-anchor="middle" font-size="17" font-weight="bold" fill="#9b2e66">'+esc(d.label||String(target))+'</text>'+
     '<text x="200" y="48" text-anchor="middle" fill="#515687" font-size="14">Number line · எண்கோடு</text>';
  return '<div class="diagram-wrap"><svg viewBox="0 0 400 245" preserveAspectRatio="xMidYMid meet" role="img" aria-label="'+title+' — number-line location"><title>'+title+'</title>'+t+'</svg></div>';
 }
 window.TriggleDraw={...drawing,drawClassic};
})();