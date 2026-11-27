/* Responsive exercise figures for the Grade 10 viewing-angle records. */
(()=>{
  'use strict';
  const e=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const svg=(body,name)=>`<div class="diagram-wrap"><svg viewBox="0 0 620 350" role="img" aria-label="${e(name)}" xmlns="http://www.w3.org/2000/svg"><title>${e(name)}</title><rect width="620" height="350" rx="18" fill="#fbfaff"/>${body}</svg></div>`;
  const line=(x1,y1,x2,y2,color='#7680a2',w=2,dash='')=>`<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${color}" stroke-width="${w}" ${dash?'stroke-dasharray="'+dash+'"':''} stroke-linecap="round"/>`;
  const dot=(x,y,color='#7954cb',r=6)=>`<circle cx="${x}" cy="${y}" r="${r}" fill="${color}" stroke="white" stroke-width="2"/>`;
  const pack=(html,caption)=>({html,caption});
  const measuredKey=(values,ta)=>`<div class="diagramguard-coordinate-key" role="list" aria-label="${ta?'படக் குறிப்புகள்':'Figure key'}">`+
   values.map(value=>`<span class="diagramguard-named-point" role="listitem">${e(value)}</span>`).join('')+'</div>';
  function roadCrossSection(lang){
  const ground=260,mid=310,scale=14,angle=Math.PI/6;
  const wall=4*Math.sqrt(3)*scale,halfWidth=wall/Math.tan(angle);
  const left=mid-halfWidth,right=mid+halfWidth,roof=ground-wall;
  const ink='#272836',teal='#166353',plum='#70384b',gold='#856222';
  const radius=36;
  const ta=lang==='ta';
  const name=ta?'சாலையின் நடுப்புள்ளியிலிருந்து 30° ஏற்றக்கோணத்தில் இரு வீடுகளின் கூரைகள்':
   'Two roofs seen at a 30° angle of elevation from the road midpoint';
  let body='<g data-dg-road-cross-section>';
  body+=`<path d="M${left-25} ${ground}V${roof}H${left}V${ground} M${right} ${ground}V${roof}H${right+25}V${ground}"
    fill="#edf6f2" stroke="${teal}" stroke-width="2.4"/>`;
  body+=line(left-42,ground,right+42,ground,ink,2);
  for(const [id,x] of [['left',left],['right',right]]){
   body+=`<line data-dg-sightline="${id}" x1="${mid}" y1="${ground}" x2="${x}" y2="${roof}" stroke="${plum}" stroke-width="3"/>`;
  }
  body+=`<path d="M${left} ${ground-11}h11v11 M${right} ${ground-11}h-11v11" stroke="${ink}" fill="none" stroke-width="1.8"/>`;
  body+=`<path d="M${mid+radius} ${ground} A${radius} ${radius} 0 0 0 ${mid+radius*Math.cos(angle)} ${ground-radius*Math.sin(angle)}"
   stroke="${gold}" fill="none" stroke-width="2.5"/>`;
  body+=dot(mid,ground,ink,5)+'</g>';
  const labels=ta?['இரு வீடுகளின் உயரம் 4√3 மீ','ஏற்றக்கோணம் 30°','சாலையின் நடுப்புள்ளி']:
   ['House heights 4√3 m','Angle of elevation 30°','Road midpoint'];
  return pack(svg(body,name)+measuredKey(labels,ta),name);
  }
  function tower(item,lang){
  if(item.id==='c10-6-6-2-5')return roadCrossSection(lang);
  const q=item.q.en,ta=lang==='ta',dep=/depression/i.test(q),elev=/elevation/i.test(q)||!dep;
  const left=134,right=488,ground=270,roof=60,eye=80,r=52;
  let body=`<g data-dg-sightline-schematic><rect x="89" y="${roof}" width="45" height="${ground-roof}"
   fill="#edf6f2" stroke="#166353" stroke-width="2"/>`+line(44,ground,574,ground,'#272836',3);
  if(dep){
   const angle=Math.atan2(ground-eye,right-left);
   body+=line(left,eye,right,eye,'#706977',2.5,'7 6')+line(left,eye,right,ground,'#70384b',3.5)+
    `<path data-dg-angle="depression" d="M${left+r} ${eye} A${r} ${r} 0 0 1 ${left+r*Math.cos(angle)} ${eye+r*Math.sin(angle)}"
     fill="none" stroke="#70384b" stroke-width="2.4"/>`;
  }
  if(elev){
   const angle=Math.atan2(ground-roof,right-left);
   body+=line(right,ground,left,roof,'#166353',3.5,dep?'6 6':'')+
    `<path data-dg-angle="elevation" d="M${right-r} ${ground} A${r} ${r} 0 0 1 ${right-r*Math.cos(angle)} ${ground-r*Math.sin(angle)}"
     fill="none" stroke="#166353" stroke-width="2.4"/>`;
  }
  body+=`<path d="M${left} ${ground-16}h16v16" fill="none" stroke="#272836" stroke-width="2"/></g>`;
  const note=ta?'செங்குத்து உயரம், தரைத் தூரம், பார்வைக் கோணம் ஆகியவை ஒரு செங்கோண முக்கோணத்தை உருவாக்குகின்றன. tan θ = உயரம் / கிடைமட்டத் தூரம்.':
   'The vertical difference, horizontal distance and sightline form a right triangle. tan θ = vertical difference / horizontal distance.';
  const noteEye=/1\.8 m/.test(q)?(ta?' பார்வையாளரின் 1.8 மீ கண் உயரத்தையும் கணக்கில் எடுத்துக்கொள்ளுங்கள்.':
   ' Account for the observer’s 1.8 m eye level when calculating the window height.'):'';
  const given=[...new Set([...(q.match(/\d+(?:\.\d+)?(?:√3)?\s*m\b/g)||[]),...(q.match(/\d+°/g)||[])])].slice(0,7);
  const key=[...(given.length?[given.join(' · ')]:[])];
  if(dep)key.push(ta?'கோடிட்ட கிடைமட்டக் கண்மட்டம்':'Dashed eye-level horizontal',
   ta?'ஊதா பார்வைக்கோடு · இறக்கக்கோணம் θ':'Plum sightline · angle of depression θ');
  if(elev)key.push(ta?'பச்சைப் பார்வைக்கோடு · ஏற்றக்கோணம் θ':'Green sightline · angle of elevation θ');
  key.push(ta?'பார்வைக் கோடுகளின் திட்டப்படம்':'Schematic of the viewing directions');
  const description=dep&&elev?(ta?'ஏற்றக்கோணம் மற்றும் இறக்கக்கோணம்':'Angles of elevation and depression'):
   dep?(ta?'இறக்கக்கோணப் பார்வைக்கோடு':'Angle of depression sightline'):
   (ta?'ஏற்றக்கோணப் பார்வைக்கோடு':'Angle of elevation sightline');
  return pack(svg(body,description)+measuredKey(key,ta)+`<div class="concept-note">${e(note+noteEye)}</div>`,description);
  }
  function render({item,lang}) {
    return item.classNum===10&&item.diagram==='tower'?tower(item,lang):null;
  }
  window.TriggleSightlineExercises=Object.freeze({render});
})();
