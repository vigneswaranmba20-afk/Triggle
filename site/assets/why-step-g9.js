/* VER Triggle Grade 9 optional learning bridge.
 * Read-only relative to the verified textbook question/solution.
 * Native disclosure is created only for an existing, exact source-matched step.
 * Diagrams depict generic geometry / set concepts, not unverified textbook figures.
 */
(()=>{'use strict';
const NS='http://www.w3.org/2000/svg';
const el=(tag,cls,text)=>{const a=document.createElement(tag);if(cls)a.className=cls;if(text!==undefined)a.textContent=String(text);return a;};
const shape=(tag,attrs={},label)=>{const a=document.createElementNS(NS,tag);for(const [k,v] of Object.entries(attrs))a.setAttribute(k,String(v));if(label!==undefined)a.textContent=String(label);return a;};
function figure(spec,lang){
 if(!spec||typeof spec!=='object')return null;
 const ta=lang==='ta',f=el('figure','why-step-visual why-step-g9-figure'),cap=el('figcaption','why-step-visual-caption');
 f.append(cap);
 let svg;
 const attrs={viewBox:'0 0 340 170',role:'img'};
 if(spec.type==='venn'){
  cap.textContent=ta?'கருத்துப் படம்: வெட்டுக் கணம் பொது பகுதி':'Concept sketch: the overlap is the intersection';
  svg=shape('svg',{...attrs,'aria-label':ta?'கணங்கள் A மற்றும் B இன் வென் படம்':'Venn model of sets A and B'});
  svg.append(shape('circle',{cx:134,cy:82,r:70,fill:'#d4c8f0','fill-opacity':0.55,stroke:'#7560a7','stroke-width':2}));
  svg.append(shape('circle',{cx:208,cy:82,r:70,fill:'#b8dbcf','fill-opacity':0.55,stroke:'#498779','stroke-width':2}));
  for(const [x,y,t] of [[96,79,'A'],[246,79,'B'],[170,85,'A∩B']])
   svg.append(shape('text',{x,y,'font-size':16,'text-anchor':'middle',fill:'#322d46','font-weight':700},t));
 }else if(spec.type==='numberline'){
  cap.textContent=ta?'கருத்துப் படம்: a < x < b':'Concept sketch: a < x < b';
  svg=shape('svg',{...attrs,viewBox:'0 0 340 110','aria-label':'Number line with values a, x and b in order'});
  svg.append(shape('line',{x1:25,y1:48,x2:316,y2:48,stroke:'#7560a7','stroke-width':2.5}));
  svg.append(shape('path',{d:'M306 42 L317 48 L306 54',fill:'none',stroke:'#7560a7','stroke-width':2}));
  for(const [x,t] of [[65,'a'],[166,'x'],[268,'b']]){
   svg.append(shape('line',{x1:x,y1:42,x2:x,y2:54,stroke:'#7560a7','stroke-width':2}));
   svg.append(shape('text',{x,y:79,'font-size':19,'text-anchor':'middle',fill:'#322d46'},t));
  }
 }else if(spec.type==='triangle'){
  cap.textContent=ta?'கருத்துப் படம்: அளவுக்கேற்ப வரையப்படவில்லை':'Concept sketch: not drawn to scale';
  svg=shape('svg',{...attrs,'aria-label':'Right triangle with generic sides and perpendicular height'});
  if(spec.mode==='altitude'){
   // A general triangle is not necessarily right angled; the dashed altitude
   // is perpendicular to its base and is not an assertion about source lengths.
   svg.append(shape('path',{d:'M50 136 L180 24 L285 136 Z',fill:'#eee7fa',stroke:'#7560a7','stroke-width':2.5,'stroke-linejoin':'round'}));
   svg.append(shape('line',{x1:180,y1:24,x2:180,y2:136,stroke:'#7560a7','stroke-dasharray':'5 5','stroke-width':2}));
   svg.append(shape('path',{d:'M180 118 L198 118 L198 136',stroke:'#7560a7',fill:'none','stroke-width':1.6}));
   svg.append(shape('text',{x:167,y:87,'font-size':15,fill:'#302843'},'height'));
  }else{
   svg.append(shape('path',{d:'M55 136 L268 136 L268 23 Z',fill:'#eee7fa',stroke:'#7560a7','stroke-width':2.5,'stroke-linejoin':'round'}));
   svg.append(shape('path',{d:'M250 136 L250 118 L268 118',fill:'none',stroke:'#7560a7','stroke-width':1.8}));
   svg.append(shape('text',{x:275,y:82,'font-size':15,fill:'#302843'},'height'));
  }
  svg.append(shape('text',{x:155,y:160,'text-anchor':'middle','font-size':16,fill:'#302843'},'base'));
 }else if(spec.type==='coordinates'){
  cap.textContent=ta?'கருத்துப் படம்: முதலில் x, பின்னர் y':'Concept sketch: horizontal x first, vertical y second';
  svg=shape('svg',{...attrs,'aria-label':'Coordinate axes with point x comma y'});
  svg.append(shape('line',{x1:40,y1:135,x2:308,y2:135,stroke:'#7560a7','stroke-width':2}));
  svg.append(shape('line',{x1:100,y1:155,x2:100,y2:18,stroke:'#7560a7','stroke-width':2}));
  svg.append(shape('line',{x1:100,y1:65,x2:228,y2:65,stroke:'#b0a3c8','stroke-dasharray':'5 5'}));
  svg.append(shape('line',{x1:228,y1:65,x2:228,y2:135,stroke:'#b0a3c8','stroke-dasharray':'5 5'}));
  svg.append(shape('circle',{cx:228,cy:65,r:6,fill:'#6351a0'}));
  for(const [x,y,t] of [[315,143,'x'],[93,20,'y'],[245,54,'(x,y)']])
   svg.append(shape('text',{x,y,'font-size':16,fill:'#322d46'},t));
 }else if(spec.type==='dice'){
  cap.textContent=ta?'சமவாய்ப்புள்ள ஆறு முடிவுகள்':'Six equally likely die faces';
  svg=shape('svg',{...attrs,viewBox:'0 0 340 95','aria-label':'A row showing the six possible faces of one fair die'});
  for(let i=0;i<6;i++){
   const x=15+i*53;
   svg.append(shape('rect',{x,y:18,width:45,height:45,rx:8,fill:'#faf8fd',stroke:'#7560a7','stroke-width':2}));
   svg.append(shape('text',{x:x+22.5,y:47,'font-size':19,'text-anchor':'middle',fill:'#322d46'},i+1));
  }
 }else return null;
 f.append(svg);return f;
}
function render(event){
 const root=document.getElementById('stepsList'),data=event?.detail;
 if(!root)return;
 root.querySelectorAll('details.why-step-g9').forEach(x=>x.remove());
 if(data?.grade!==9||!data.item||!window.TriggleWhyStepG9?.hints)return;
 const item=data.item,hint=window.TriggleWhyStepG9.hints[item.id];
 if(!hint||!Number.isInteger(hint.step)||hint.step<0)return;
 const original=item.steps?.[hint.step];
 if(typeof original?.en!=='string'||typeof hint.expected!=='string'||!original.en.includes(hint.expected))return;
 const list=root.querySelectorAll('li.worked-step:not(.final-answer-step)');
 const li=list[hint.step],body=li?.children[1];
 if(!body||!body.querySelector('.step-equation')||li.classList.contains('twd-worked-step'))return;
 const lang=data.lang==='ta'?'ta':'en';
 const details=el('details','why-step-g9');
 details.dataset.question=item.id;details.dataset.step=String(hint.step+1);
 const summary=el('summary',null,lang==='ta'?'ஏன் இந்தப் படி?':'Why this step?');
 summary.setAttribute('aria-label',(lang==='ta'?'படி ':'Step ')+(hint.step+1)+': '+summary.textContent);
 summary.addEventListener('keydown',ev=>{if(ev.key==='ArrowLeft'||ev.key==='ArrowRight')ev.stopPropagation();});
 const panel=el('div','why-step-panel');panel.lang=lang;
 const explanation=el('p'),source=lang==='ta'&&hint.ta?hint.ta:hint.en;
 explanation.innerHTML=window.TriggleNotation.render(window.TriggleG9Math?.text(source)??source);
 panel.append(explanation);
 if(hint.diagram){const pic=figure(hint.diagram,lang);if(pic)panel.append(pic);}
 details.append(summary,panel);body.append(details);
}
window.addEventListener('triggle:lessonchange',render);
})();