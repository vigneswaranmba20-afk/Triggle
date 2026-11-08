/* Original and accessible number-line figures; extension avoids altering legacy diagram engine. */
(()=>{'use strict';
 const drawing=window.TriggleDraw;
 if(!drawing||typeof drawing.drawClassic!=='function')throw Error('TriggleDraw base missing');
 const base=drawing.drawClassic;
 const esc=s=>String(s??'').replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
 function drawArrows(arg){
  // An original, labelled reconstruction of the four alternatives in SCERT Ex.2.1 Q1.
  // Locations are schematic; the mathematically correct D is near 11/3, between 3 and 4.
  const left=42,right=616,y=130,at=v=>left+(v+5)/10*(right-left);
  const arrows=[['A',-3.5],['B',2.45],['C',3.18],['D',11/3]];
  let body='<rect x="12" y="16" width="634" height="198" rx="13" fill="#f8f7ff"/>'+
    '<line x1="35" y1="'+y+'" x2="626" y2="'+y+'" stroke="#65739b" stroke-width="2.5"/>'+
    '<path d="M620 124L629 130L620 136" fill="none" stroke="#65739b" stroke-width="2"/>';
  for(let n=-5;n<=5;n++){
    const x=at(n);
    body+='<line x1="'+x+'" y1="'+(y-6)+'" x2="'+x+'" y2="'+(y+6)+'" stroke="#65739b" stroke-width="2"/>'+
      '<text x="'+x+'" y="'+(y+26)+'" text-anchor="middle" font-size="14" fill="#4c5980">'+n+'</text>';
  }
  arrows.forEach(([label,value])=>{
    const x=at(value);
    body+='<text x="'+x+'" y="47" font-size="17" font-weight="800" fill="#5b387c" text-anchor="middle">'+label+'</text>'+
       '<path d="M'+x+' 53 V104" stroke="#9254aa" stroke-width="2.8" fill="none"/>'+
       '<path d="M'+(x-5)+' 98L'+x+' 109L'+(x+5)+' 98" fill="#9254aa"/>';
  });
  body+='<text x="329" y="193" text-anchor="middle" font-size="12" fill="#686283">A–D: labelled number-line alternatives · பெயரிடப்பட்ட எண்கோடு</text>';
  const title=esc((arg?.ref||'Exercise 2.1 Q1')+' — choose the arrow for 11/3');
  return '<div class="diagram-wrap"><svg viewBox="0 0 658 226" role="img" aria-label="'+title+'">'+
    '<title>'+title+'</title>'+body+'</svg></div>';
 }
 function drawClassic(arg){
  const d=arg?.demo;
  if(d?.kind==='real-number-arrows')return drawArrows(arg);
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