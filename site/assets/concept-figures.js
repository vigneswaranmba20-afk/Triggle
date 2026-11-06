/* Triggle 1.20 · Original, lesson-aligned vector figures. All values are calculated locally. */
(()=>{'use strict';
const e=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const norm=x=>((x%360)+360)%360;
const near=x=>Math.abs(x)<.0001?0:x;
const num=(x,n=2)=>near(x).toFixed(n).replace(/\.?0+$/,'');
const svg=(body,name)=>`<div class="diagram-wrap"><svg viewBox="0 0 620 350" role="img" aria-label="${e(name)}" xmlns="http://www.w3.org/2000/svg"><title>${e(name)}</title><rect width="620" height="350" rx="18" fill="#fbfaff"/>${body}</svg></div>`;
const line=(x1,y1,x2,y2,color='#7680a2',w=2,dash='')=>`<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${color}" stroke-width="${w}" ${dash?'stroke-dasharray="'+dash+'"':''} stroke-linecap="round"/>`;
const text=(x,y,v,size=16,color='#47466d',anchor='middle',weight=750)=>`<text x="${x}" y="${y}" font-size="${size}" fill="${color}" text-anchor="${anchor}" font-family="system-ui,'Noto Sans Tamil',sans-serif" font-weight="${weight}">${e(v)}</text>`;
const dot=(x,y,color='#7954cb',r=6)=>`<circle cx="${x}" cy="${y}" r="${r}" fill="${color}" stroke="white" stroke-width="2"/>`;
const pack=(html,caption)=>({html,caption});
const legend=(arr)=>`<div class="concept-key">${arr.map(a=>`<span>${e(a)}</span>`).join('')}</div>`;
const intro=(desc,ta)=>`<div class="concept-note">${e(ta?desc.ta||desc.en:desc.en)}</div>`;
function findAngle(item){
  const q=item.q?.en||'';
  if(item.classNum===11){const m=q.match(/(?:of |contains |quadrant of |Express |Evaluate sin |Evaluate cos |Evaluate tan )([−-]?\d+(?:\.\d+)?)°/i);if(m)return Number(m[1].replace('−','-'));}
  if(item.classNum===9&&item.diagram&&typeof item.diagram==='object'&&Number.isFinite(item.diagram.angle))return item.diagram.angle;
  if(/sin⁻¹\(1\/√2\)/.test(q))return 45;
  if(/cos⁻¹\(√3\/2\)/.test(q))return 30;
  return null;
}
function quadrant(a){if(a===0||a===90||a===180||a===270)return 'axis';return ['I','II','III','IV'][Math.floor(a/90)];}
function referenceAngle(a){let t=a%180;return Math.min(t,180-t)}
function circleDrawing(deg,lang,focus){
 const a=norm(deg),t=a*Math.PI/180,cx=235,cy=176,r=122,x=cx+r*Math.cos(t),y=cy-r*Math.sin(t),q=quadrant(a);
 let sectors='';for(let i=0;i<4;i++){let t1=i*Math.PI/2,t2=(i+1)*Math.PI/2;const x1=cx+r*Math.cos(t1),y1=cy-r*Math.sin(t1),x2=cx+r*Math.cos(t2),y2=cy-r*Math.sin(t2);sectors+=`<path d="M${cx} ${cy} L${x1} ${y1} A${r} ${r} 0 0 0 ${x2} ${y2}Z" fill="${i===Math.floor(a/90)%4&&q!=='axis'?'#ede6ff':'#fcfaff'}"/>`}
 const arcR=39;let arc='';if(a>0){let small=arcR,t0=0,tend=a*Math.PI/180;arc=`<path d="M${cx+small} ${cy} A${small} ${small} 0 ${a>180?1:0} 0 ${cx+small*Math.cos(tend)} ${cy-small*Math.sin(tend)}" fill="none" stroke="#8262cd" stroke-width="3.5"/>`}
 const captionNote=lang==='ta'?'நீலம் = cos θ (x ஆயம்) · இளஞ்சிவப்பு = sin θ (y ஆயம்)':'Blue = cos θ (x-coordinate) · Pink = sin θ (y-coordinate)';
 let shapes=sectors+`<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="#b9a8e4" stroke-width="2.8"/>`;
 shapes+=line(88,cy,383,cy,'#94a0bb',2.8)+line(cx,322,cx,30,'#94a0bb',2.8);
 shapes+=text(381,164,'x',19)+text(247,35,'y',19)+text(346,70,'I',19,'#8170bb')+text(122,70,'II',19,'#8170bb')+text(115,294,'III',19,'#8170bb')+text(352,294,'IV',19,'#8170bb');
 shapes+=line(cx,cy,x,cy,'#4f82ec',6)+line(x,cy,x,y,'#eb6697',6)+line(cx,cy,x,y,'#e5a846',4)+arc+dot(x,y,'#694acb',9)+dot(cx,cy,'#585b88',4);
 shapes+=text(486,81,`${num(a,0)}°`,34,'#6b52c0')+text(486,112,q==='axis'?'On an axis':'Quadrant '+q,15,'#74668c')+text(486,154,`cos = ${num(Math.cos(t),3)}`,16,'#4279d2')+text(486,185,`sin = ${num(Math.sin(t),3)}`,16,'#cb4f89')+text(486,230,`Ref: ${num(referenceAngle(a),0)}°`,15,'#676582')+text(486,266,'radius = 1',14,'#8b90a1');
 if(focus==='radians')shapes+=text(486,313,'π rad = 180°',15,'#6756a6');
 return {html:svg(shapes,`${num(deg)} degrees; equivalent direction ${num(a)} degrees; quadrant ${q}`)+legend([captionNote,`${num(deg)}° → ${num(a)}°`]),caption:lang==='ta'?'நான்கு கால்பகுதிகள், கோணம், சார்புடைய குறியீடுகள் மற்றும் ஆயங்கள் — இந்தக் கேள்விக்காகக் கணக்கிடப்பட்டவை.':'Question-specific unit circle: angle, quadrant, reference angle, signs and coordinates. Drag the slider to explore.'};
}
function circle(item,lang){const deg=findAngle(item);const focus=/radians/i.test(item.q.en)?'radians':'quadrants';if(deg===null)return circleDrawing(45,lang,focus);
 const base=circleDrawing(deg,lang,focus);base.html+=`<div class="concept-adjust"><label for="conceptAngle">${lang==='ta'?'கோணத்தை மாற்று':'Explore angle'}</label><input id="conceptAngle" aria-label="Angle on circle" type="range" min="0" max="359" step="1" value="${Math.round(norm(deg))}"><output id="conceptAngleOut">${num(norm(deg),0)}°</output></div><div class="concept-note">${e(lang==='ta'?'கேள்வியில் கொடுக்கப்பட்ட கோணம்: ':'Angle from the question: ')}<strong>${e(String(deg))}°</strong>. ${e(lang==='ta'?'360° இன் முழுச் சுற்றுகளை நீக்கினால் அதே திசை கிடைக்கும்.':'Subtract complete 360° rotations to find the same terminal direction.')}</div>`;
 return base;
}
function wave(item,lang){const q=item.q.en,coef=/sin\s*7x/.test(q)?7:/cos\(3x\)/.test(q)?3:/sin\(x\/3\)/.test(q)?1/3:1;
 const amp=/-sin/.test(q)?-1:1, period=2*Math.PI/coef;let points=[];
 for(let i=0;i<=170;i++){const phase=i/170*2*Math.PI;const x=47+i/170*510,y=170-amp*105*Math.sin(phase);points.push((i?'L':'M')+x.toFixed(1)+' '+y.toFixed(1))}
 let body=line(45,170,560,170,'#919cbe',2.6)+line(47,38,47,307,'#919cbe',2.6)+`<path d="${points.join(' ')}" stroke="#e95d9f" stroke-width="5" fill="none"/>`;
 for(const [x,label] of [[47,'0'],[302,'π / '+num(coef)],[557,'2π / '+num(coef)]])body+=line(x,162,x,178,'#8b91ac',2)+text(x,195,label,14);
 body+=text(514,65,'A = 1',19,'#8c50a9')+text(519,101,`T = ${num(period,3)}`,16,'#616b91')+text(28,68,'+1',16)+text(28,283,'−1',16)+text(508,309,'x (radians)',16);
 const description=lang==='ta'?'ஒரு முழு அலைக்கான கால அளவு T = 2π / |k|. எதிர்மறை குறி இருந்தால் அலை புரட்டப்படும்.':'One complete cycle has period T = 2π / |k|; a leading minus sign reflects the wave about the horizontal axis.';
 return pack(svg(body,'Sine or cosine waveform with exact amplitude and period')+intro({en:description},false)+legend([`frequency multiplier k = ${num(coef,3)}`,`period T = ${num(period,3)} radians`,`amplitude = 1`]),lang==='ta'?'கேள்வியிலுள்ள அலைச் செயல்பாட்டின் சரியான கால அளவு காட்சியாகக் காட்டப்படுகிறது.':'Original plot of one mathematically accurate cycle for this question.');
}
function inverse(item,lang){const q=item.q.en,ans=item.answer||'',domain=/domain/.test(q),sqrt=/√\(9−x²\)/.test(q),all=domain&&!sqrt;
 if(/tan\(tan⁻¹\(7π\/4\)\)/.test(q)){
  const b=text(308,60,'Undoing an inverse operation',19,'#6b5aab')+`<rect x="48" y="116" width="146" height="80" rx="13" fill="#efeaff" stroke="#b6a5eb" stroke-width="2"/><rect x="238" y="116" width="146" height="80" rx="13" fill="#e8f2ff" stroke="#a7bff1" stroke-width="2"/><rect x="428" y="116" width="148" height="80" rx="13" fill="#e1f8ee" stroke="#93dbc0" stroke-width="2"/>`+text(120,162,'7π/4',25)+text(310,163,'tan⁻¹',25)+text(502,162,'7π/4',25,'#298366')+text(216,162,'→',24)+text(408,162,'→',24)+text(310,250,'tan(tan⁻¹ u) = u for all real u',18,'#5e589a');
  return pack(svg(b,'Inverse tangent and tangent cancel for any real input')+legend(['Inner tan⁻¹ returns an angle','Outer tan recovers its input']),lang==='ta'?'ஒரு செயல்பாடும் அதன் நேர்மாறும் ஒன்றை ஒன்று நீக்குகின்றன.':'Function composition, not a fabricated 45° triangle; no numeric approximation is needed.');
 }
 if(/tan⁻¹\(√3\) − sec⁻¹\(−2\)/.test(q)){
  const a=(x,y,t)=>{let dx=x+82*Math.cos(t*Math.PI/180),dy=y-82*Math.sin(t*Math.PI/180);return `<circle cx="${x}" cy="${y}" r="82" fill="#f4f0ff" stroke="#c1afe6" stroke-width="2"/>`+line(x-91,y,x+91,y,'#a8aec5',2)+line(x,y-91,x,y+91,'#a8aec5',2)+line(x,y,dx,dy,'#d69a4d',5)+dot(dx,dy,'#7155b6',7)};
  let b=a(162,167,60)+a(456,167,120)+text(160,65,'tan⁻¹(√3) = 60°',19,'#5b4da8')+text(452,65,'sec⁻¹(−2) = 120°',19,'#5b4da8')+text(312,312,'60° − 120° = −60° = −π/3',22,'#308e6c');
  return pack(svg(b,'Two principal angles sixty and one hundred twenty degrees for the subtraction')+legend(['tan⁻¹ √3: quadrant I','sec⁻¹(−2): quadrant II']),lang==='ta'?'இரண்டு முதன்மைக் கோணங்களின் வேறுபாடு −π/3.':'Separate principal angles are plotted before subtracting them.');
 }
 if(/sin\(sin⁻¹\(3\/5\)\)/.test(q)){
  let b=`<path d="M105 273L438 273L438 73Z" fill="#f0edff" stroke="#ad9cdf" stroke-width="2"/>`+line(105,273,438,273,'#4c84ea',6)+line(438,273,438,73,'#e4699c',6)+line(105,273,438,73,'#dba64f',6)+text(271,308,'4',23)+text(466,181,'3',23)+text(252,157,'5',23)+text(128,259,'θ',20)+text(317,45,'sin θ = 3/5',23,'#6454a9');
  return pack(svg(b,'Right triangle with side lengths 3 4 and 5')+legend(['sin(sin⁻¹u) = u, for −1 ≤ u ≤ 1']),lang==='ta'?'3,4,5 முக்கோணத்திலிருந்து sin θ = 3/5.':'The exact 3–4–5 triangle explains why the composition equals 3/5.');
 }

 if(domain){let body=line(55,193,563,193,'#8996b2',3)+text(559,221,'x',17,'#647190')+text(308,116,'Valid real inputs',20,'#6253ab');
  if(sqrt){body+=line(176,193,439,193,'#d56b9d',9)+dot(176,193,'#d56b9d',8)+dot(439,193,'#d56b9d',8)+text(176,219,'−3',17)+text(439,219,'3',17)+text(308,264,'9 − x² ≥ 0',20,'#54428d')+text(308,296,'−3 ≤ x ≤ 3',19,'#54428d');}
  else {body+=line(70,193,540,193,'#d56b9d',8)+`<path d="M58 193l18 -11v22z M552 193l-18 -11v22z" fill="#d56b9d"/>`+text(310,261,'All real numbers ℝ',19,'#54428d')}
  return pack(svg(body,'Domain of '+q)+legend([sqrt?'Endpoint values are included':'No square-root restriction','Number line highlights permitted x']),lang==='ta'?'உண்மை எண் உள்ளீடுகளைத் தேர்ந்தெடுக்கும் எண்ணுரேகை.':'Question-specific input domain shown on a number line.');
 }
 let angle=null;
 if(/tan⁻¹\(tan\(5π\/4\)\)/.test(q))angle=45;
 else if(/tan⁻¹\(tan\(−π\/6\)\)/.test(q))angle=-30;
 else if(/sec⁻¹\(2\/√3\)/.test(q))angle=30;
 else if(/cot⁻¹\(√3\)/.test(q))angle=30;
 else if(/cosec⁻¹\(−√2\)/.test(q))angle=-45;
 else if(/sin⁻¹\(1\/√2\)/.test(q))angle=45;
 else if(/cos⁻¹\(√3\/2\)/.test(q))angle=30;
 else if(/tan⁻¹\(√3\)/.test(q))angle=60;
 let info=circleDrawing(angle??45,lang,'inverse');
 const principal=/(?:cos⁻¹|sec⁻¹|cot⁻¹)/.test(q)?'A principal branch is chosen by the inverse function.':'For tan⁻¹, the principal value lies between −90° and +90°.';
 info.html+=intro({en:principal,ta:'தலைமை மதிப்பு என்பது வரையறுக்கப்பட்ட முதன்மைக் கோண இடைவெளியில் தேர்ந்தெடுக்கப்படும் விடை.'},lang==='ta');
 if(angle!==null)info.html+=legend(['Illustrated principal angle '+angle+'°']);
 info.caption=lang==='ta'?'முதன்மைக் கோணத்தை விளக்கும் காட்சி.':'Principal-angle illustration for the selected inverse-trigonometry expression.';
 return info;
}
function tower(item,lang){const q=item.q.en,dep=/depression/i.test(q),elev=/elevation/i.test(q)||!dep,mult=(dep&&elev);
 let body=`<rect x="89" y="60" width="45" height="210" rx="5" fill="#b7c1dc" stroke="#8492b6" stroke-width="2"/>`+line(44,270,574,270,'#78c9b2',6)+text(108,294,'vertical',17,'#6d618a')+text(358,296,'horizontal distance',17,'#5579b0')+line(133,270,488,270,'#4c87da',5);
 if(dep){body+=line(133,80,488,80,'#98a3ba',2.5,'7 6')+line(133,80,488,270,'#dfab46',5)+text(349,91,'horizontal eye line',15,'#777c91')+`<path d="M190 80A57 57 0 0 1 183 106" fill="none" stroke="#765cc7" stroke-width="4"/>`+text(218,121,'depression θ',17,'#6853aa')}
 if(elev){body+=line(488,270,133,60,'#ed6d9b',dep?3.5:5,dep?'6 6':'')+`<path d="M436 270A52 52 0 0 1 444 244" fill="none" stroke="#765cc7" stroke-width="4"/>`+text(454,225,'elevation θ',17,'#6853aa')}
 body+=text(108,41,'H',20,'#b3487b')+`<path d="M134 253h16v17" fill="none" stroke="#4b648f" stroke-width="3"/>`;
 const note=lang==='ta'?'செங்குத்து உயரம், தரைத் தூரம், பார்வைக் கோணம் ஆகியவை ஒரு செங்கோண முக்கோணத்தை உருவாக்குகின்றன. tan θ = உயரம் / கிடைமட்டத் தூரம்.':'The vertical difference, horizontal distance and sightline form a right triangle. tan θ = vertical difference / horizontal distance.';
 const noteEye=/1\.8 m/.test(q)?' Account for the observer’s 1.8 m eye level when calculating the window height.':'';
 const given=[...new Set([...(q.match(/\d+(?:\.\d+)?(?:√3)?\s*m\b/g)||[]),...(q.match(/\d+°/g)||[])])].slice(0,7);
 return pack(svg(body,'Elevation and depression right-triangle construction')+intro({en:note+noteEye},false)+legend([...(given.length?['Question values: '+given.join(' · ')]:[]),dep?'Angle of depression':'Angle of elevation',mult?'Both viewing directions':'Right angle at the base','Not to scale']),lang==='ta'?'கேள்வியிலுள்ள பார்வைக் கோணங்களுக்கான கட்டமைப்புக் காட்சி; அளவுப்படி இல்லை.':'Conceptual construction for the sightlines in this question; deliberately not to scale.');
}
function triangles(item,lang){const q=item.q.en;
 if(/15\/17/.test(q)&&/12\/13/.test(q)){
  let body=`<path d="M42 252 L247 252 L247 70Z" fill="#fff3de" stroke="#ddc7a5" stroke-width="2"/>`+line(42,252,247,252,'#3b7be2',5)+line(247,252,247,70,'#e8669d',5)+line(42,252,247,70,'#daa544',5)+text(145,279,'8',19)+text(274,177,'15',19)+text(119,156,'17',19)+text(62,241,'x',19);
  body+=`<path d="M342 252 L543 252 L543 123Z" fill="#f1edff" stroke="#cdc0ed" stroke-width="2"/>`+line(342,252,543,252,'#3b7be2',5)+line(543,252,543,123,'#e8669d',5)+line(342,252,543,123,'#daa544',5)+text(444,280,'12',19)+text(566,192,'5',19)+text(439,168,'13',19)+text(360,241,'y',19);
  body+=text(133,40,'8² + 15² = 17²',19,'#6d5cb0')+text(443,73,'5² + 12² = 13²',19,'#6d5cb0');
  return pack(svg(body,'Two Pythagorean triangles corresponding to sine x and cosine y')+legend(['sin x = 15/17','cos y = 12/13','Use angle sum/difference identity']),lang==='ta'?'கொடுக்கப்பட்ட விகிதங்களுக்கான இரண்டு தனித்துச் செங்கோண முக்கோணங்கள்.':'Each right triangle matches the ratios actually given in the question.');
 }
 let body=`<path d="M109 275 L446 275 L446 78Z" fill="#ffefd7" stroke="#decaac" stroke-width="2"/>`+line(109,275,446,275,'#467fe6',6)+line(446,275,446,78,'#e46b9b',6)+line(109,275,446,78,'#dfaf51',6)+text(283,307,'adjacent = cos θ',19,'#3875d3')+text(470,178,'sin θ',19,'#ce568a')+text(273,140,'hypotenuse = 1',17,'#a37a2c')+text(135,260,'θ',21,'#6f5abc');
 return pack(svg(body,'Trigonometry ratios represented by a unit hypotenuse')+intro({en:'Sine and cosine are the two perpendicular projections of a unit-length hypotenuse. These same lengths create the identity sin² θ + cos² θ = 1.',ta:'கர்ணம் 1 என எடுத்தால் அதன் செங்குத்து மற்றும் கிடைமட்டத் திட்டங்கள் sin θ, cos θ ஆகும்.'},lang==='ta'),lang==='ta'?'கர்ணம் 1 உள்ள கோண விகிதங்களின் காட்சி.':'The unit-hypotenuse triangle makes the identity meaningful, not just symbolic.');
}
function roots(item,lang){
 const q=item.q.en,zero=/sin x = 0/.test(q),value=zero?0:270;
 const fig=circleDrawing(value,lang,'roots');
 fig.html+=zero?
   `<div class="concept-note"><b>sin x = 0</b> ⇔ x = nπ. In −10π ≤ x ≤ 10π there are <b>21 solutions</b> (n = −10,…,10). On the circle, these directions lie on the horizontal axis (0° or 180°).</div>`:
   `<div class="concept-note"><b>sin x = −1</b> occurs at the bottom of the unit circle (270°). In −3π ≤ x ≤ 3π the complete solutions are <b>−5π/2, −π/2, 3π/2</b>.</div>`;
 fig.caption=lang==='ta'?'சைன் சமன்பாட்டிற்கான துல்லியமான வட்டக் குறியீடுகள் மற்றும் தீர்வுகளின் எண்ணிக்கை.':'Solutions are derived from the actual interval and equation; the circle shows the repeated terminal directions.';
 return fig;
}
function practice(item,lang){const q=item.q.en;
 if(/sequence 3,7,11/.test(q)){
  let b=line(46,267,566,267,'#a2a8c0',2),a=[3,7,11,15,19,39];
  a.forEach((v,i)=>{const x=65+i*80,h=v*4.9;b+=`<rect x="${x}" y="${267-h}" width="42" height="${h}" rx="7" fill="${i===5?'#8d75d3':'#9fc6f2'}"/>`+text(x+21,255-h,String(v),19,'#494983')+text(x+21,295,i===5?'10':i+1,14,'#696f8b')});
  b+=text(309,42,'aₙ = 3 + (n−1) × 4',21,'#61509e')+text(315,332,'term number n →',16,'#76738b');
  return pack(svg(b,'Arithmetic progression 3,7,11 up to the tenth term')+legend(['First term a = 3','Common difference d = 4','10th term = 39']),lang==='ta'?'ஒவ்வொரு படியிலும் 4 கூட்டப்படும் தொடரின் பத்தாவது உறுப்பு.':'Bar heights show actual sequence values including term 10.');
 }
 if(/A=\{1,2,3\}/.test(q)){
  const b=`<circle cx="250" cy="176" r="107" fill="#fce0eea8" stroke="#d76e9d" stroke-width="4"/><circle cx="371" cy="176" r="107" fill="#dce6ff9e" stroke="#628ddd" stroke-width="4"/>`+text(199,176,'1, 2',23,'#ad4278')+text(307,176,'3',24,'#49408c')+text(415,176,'4',24,'#3476cb')+text(195,55,'A',23)+text(432,55,'B',23)+text(310,316,'A ∩ B = {3}',19,'#5c4daa');
  return pack(svg(b,'Set union and intersection of the given sets')+legend(['Union: {1,2,3,4}','Intersection: {3}']),lang==='ta'?'கொடுக்கப்பட்ட கணங்களின் வென் வரைபடம்.':'Venn diagram places each specified element into its proper region.');
 }
 if(/Two angles of a triangle are 55° and 65°/.test(q)){
  const A=100,B=494,base=278,a=55*Math.PI/180,b=65*Math.PI/180,height=(B-A)/(1/Math.tan(a)+1/Math.tan(b)),cx=A+height/Math.tan(a),cy=base-height;
  const body=`<path d="M${A} ${base} L${B} ${base} L${cx} ${cy} Z" fill="#fff2df" stroke="#d8a760" stroke-width="4"/>`+text(A+61,base-15,'55°',19)+text(B-55,base-15,'65°',19)+text(cx,cy+42,'60°',21,'#7355bb')+text(306,328,'55° + 65° + 60° = 180°',19,'#5e539f');
  return pack(svg(body,'Triangle with correct angles 55 degrees, 65 degrees, 60 degrees'),lang==='ta'?'மூன்று கோணங்களும் 180° ஆகும்; தோற்றமும் உண்மையான கோண விகிதத்தில்.':'This triangle is constructed using the given angles, not drawn arbitrarily.');
 }
 if(/distance between points \(0,0\) and \(3,4\)/.test(q)){
  const A=[94,275],B=[394,275],C=[394,65];let body=`<path d="M94 275L394 275L394 65Z" fill="#f2ebff" stroke="#a394d4" stroke-width="2"/>`+line(94,275,394,275,'#4c80dc',6)+line(394,275,394,65,'#e66a9b',6)+line(94,275,394,65,'#e1a74b',6)+text(243,298,'3',19)+text(420,169,'4',19)+text(225,152,'5',23,'#8c6528')+text(86,299,'(0,0)',15)+text(401,52,'(3,4)',15)+text(312,331,'3² + 4² = 5²',18,'#6255a5');
  return pack(svg(body,'Distance formula 3-4-5 right triangle'),lang==='ta'?'3, 4, 5 உறவுடைய புள்ளித் தூர முக்கோணம்.':'The coordinate difference forms the exact 3–4–5 right triangle.');
 }
 if(/rectangle is 12 cm by 7 cm/.test(q)){
  const b=`<rect x="110" y="68" width="372" height="217" rx="4" fill="#e0f3f1" stroke="#398d9b" stroke-width="4"/>`+text(296,320,'12 cm',23,'#286f91')+text(531,180,'7 cm',20,'#ae4e82')+text(296,174,'A = 12 × 7',24,'#365a84')+text(296,204,'84 cm²',25,'#327b66');
  return pack(svg(b,'Rectangle sides 12 and 7 centimetres with area 84 square centimetres'),lang==='ta'?'12 செமீ × 7 செமீ அளவிலான செவ்வகம்.':'An original rectangle drawn in the same proportions as the given dimensions.');
 }
 if(/arithmetic mean of 4, 6, 8, 10/.test(q)){
  let b=line(58,285,565,285,'#91a2bd',3);[4,6,8,10].forEach((n,i)=>{const x=111+i*121,ht=n*17;b+=`<rect x="${x}" y="${285-ht}" width="64" height="${ht}" rx="7" fill="${i%2?'#d3b5ef':'#95c2e9'}"/>`+text(x+32,277-ht,String(n),21)});
  b+=line(62,166,559,166,'#49a88a',3,'6 6')+text(322,151,'Mean = 7',20,'#23775e')+text(315,332,'4 + 6 + 8 + 10 = 28; 28 ÷ 4 = 7',16,'#6a609e');
  return pack(svg(b,'Bar chart with data 4 6 8 10 and mean 7'),lang==='ta'?'தரவுகள் 4,6,8,10; சராசரி 7.':'The four exact data values are shown; the horizontal line marks their mean.');
 }
 if(/fair die is rolled/.test(q)){
  let b='';for(let i=1;i<=6;i++){let x=47+(i-1)*89;b+=`<rect x="${x}" y="107" width="71" height="71" rx="15" fill="${i%2===0?'#e1f7ed':'#f3efff'}" stroke="${i%2===0?'#5cae8b':'#c6baf1'}" stroke-width="2"/>`+text(x+35,154,i,29,i%2===0?'#287b59':'#685b99');}
  b+=text(310,69,'6 equally likely outcomes',20)+text(309,252,'Favourable: {2, 4, 6}',23,'#287b59')+text(309,302,'P(even) = 3 / 6 = 1 / 2',20);
  return pack(svg(b,'Six die outcomes with 2 4 and 6 highlighted'),lang==='ta'?'பகடை முடிவுகள் 1 முதல் 6; சாதக முடிவுகள் 2,4,6.':'Six equiprobable die faces; the even outcomes are highlighted.');
 }
 if(/Solve 2x \+ 7 = 19/.test(q)){
  let b=text(312,74,'2x + 7 = 19',30,'#6950ad')+line(116,142,505,142,'#ddd4ed',2)+text(311,124,'subtract 7 from both sides',18,'#6e718a')+text(310,194,'2x = 12',30,'#7354b6')+text(310,250,'x = 6',34,'#2a9877');
  return pack(svg(b,'Equation solving by equal operations on both sides'),lang==='ta'?'இரு பக்கங்களிலும் ஒரே செயலைப் பயன்படுத்தி சமன்பாட்டைத் தீர்க்கலாம்.':'Every transformation preserves equality on both sides.');
 }
 if(/x² − 9/.test(q)){
  let b=text(312,69,'x² − 3² = (x−3)(x+3)',24,'#6653a4')+`<rect x="80" y="95" width="225" height="225" fill="#f7e9ff" stroke="#a885d2" stroke-width="3"/><rect x="80" y="95" width="78" height="78" fill="#fff" stroke="#b8adc6" stroke-width="2"/>`+text(192,225,'x²',27,'#6d56b7')+text(120,144,'9',22,'#c16985')+text(434,209,'= (x−3)(x+3)',21,'#2d8c70');
  return pack(svg(b,'Difference of squares x squared minus nine'),lang==='ta'?'சதுரங்களின் வேறுபாடு x² − 3².':'The small 3×3 square represents the subtracted area.');
 }
 if(/√50 − √8/.test(q)){
  let b=text(312,85,'√50 − √8',30,'#7152b8')+text(310,164,'5√2 − 2√2',27,'#5f688e')+line(177,184,445,184,'#cebce9',3)+text(309,246,'3√2',37,'#238969')+text(308,296,'Collect like radicals',17);
  return pack(svg(b,'Radical simplification from five root two minus two root two'),lang==='ta'?'ஒத்த மூலப்படிகளைச் சுருக்குக: 5√2 − 2√2 = 3√2.':'The shared radical factor √2 makes the terms alike.');
 }
 if(/midpoint/.test(q)){
  const px=x=>80+(x/10)*440,py=y=>280-(y/12)*235,ax=px(2),ay=py(4),bx=px(8),by=py(10),mx=px(5),my=py(7);
  let body=line(60,280,555,280,'#abb2c4',2)+line(80,305,80,36,'#abb2c4',2)+line(ax,ay,bx,by,'#6b55b6',5)+dot(ax,ay,'#e07d9a',8)+dot(bx,by,'#5289ea',8)+dot(mx,my,'#2f997b',9)+text(ax-17,ay+24,'A(2,4)',15)+text(bx+15,by-14,'B(8,10)',15)+text(mx+10,my+28,'M(5,7)',16,'#187a68')+text(285,36,'M = ((x₁+x₂)/2, (y₁+y₂)/2)',16,'#5d55a2');
  return pack(svg(body,'Midpoint of line segment from A(2,4) to B(8,10)'),lang==='ta'?'இரண்டு புள்ளிகளின் சரியான நடுப்புள்ளி.':'Points and midpoint are plotted from the actual coordinates in the question.');
 }
 if(/x²−5x\+6=0/.test(q)){
  let body=line(50,265,564,265,'#9aa5be',2)+line(114,313,114,38,'#9aa5be',2);
  const X=x=>114+x*93,Y=y=>205-y*8.5;const path=[];for(let x=-.3;x<=4.7;x+=.06)path.push((path.length?'L':'M')+X(x).toFixed(1)+' '+Y((x-2)*(x-3)).toFixed(1));
  body+=`<path d="${path.join(' ')}" fill="none" stroke="#7f66cc" stroke-width="5"/>`;
  body+=dot(X(2),Y(0),'#e46c9e',8)+dot(X(3),Y(0),'#e46c9e',8)+text(X(2),226,'2',17)+text(X(3),226,'3',17)+text(305,53,'y = x² − 5x + 6',20,'#594b9d');
  return pack(svg(body,'Quadratic curve crossing the x axis at 2 and 3'),lang==='ta'?'x-அச்சை 2, 3 புள்ளிகளில் வெட்டும் இருபடிச் செயல்பாடு.':'Both roots are explicitly located at the x-axis crossings.');
 }
 return null;
}
function render(ctx){const {item,lang}=ctx;const q=item.q?.en||'',d=item.diagram;
 const special=practice(item,lang);if(special)return special;
 if(item.classNum===9&&!['stats','area','triangle','identity','sets'].includes(d)&&d!==null)return null;
 if(/midpoint|x²−5x\+6/.test(q))return practice(item,lang);
 if(item.classNum===11){if(d==='circle')return circle(item,lang);if(d==='inverse')return inverse(item,lang);if(d==='identity')return triangles(item,lang)}
 if(item.classNum===12){if(d==='wave')return wave(item,lang);if(d==='inverse')return inverse(item,lang);if(d==='circle')return roots(item,lang)}
 if(item.classNum===10){if(d==='tower')return tower(item,lang);if(d==='identity'||d==='triangle')return triangles(item,lang)}
 return null;
}
function attach(ctx,root){const slider=root.querySelector('#conceptAngle');if(!slider)return;slider.oninput=()=>{
 const deg=Number(slider.value),old=root.querySelector('.diagram-wrap');if(!old)return;
 const next=circleDrawing(deg,ctx.lang,'quadrants');
 old.outerHTML=next.html.match(/<div class="diagram-wrap">[\s\S]*?<\/div>/)[0];
 root.querySelector('#conceptAngleOut').textContent=num(deg,0)+'°';
};}
window.TriggleConcept={render,attach};
})();
