/* VER Triggle: Grade 10 voluntary step explanations.
 * Only the source-aligned authored question may receive a hint.
 * Never edits mathematics, textbook text, grades or the answer.
 */
(()=>{'use strict';
const NS='http://www.w3.org/2000/svg';
const $=id=>document.getElementById(id);
const make=(tag,className,text)=>{
 const e=document.createElement(tag);
 if(className)e.className=className;
 if(text!==undefined)e.textContent=String(text);
 return e;
};
function svgNode(tag,attrs={},text){
 const e=document.createElementNS(NS,tag);
 for(const [k,v] of Object.entries(attrs))e.setAttribute(k,String(v));
 if(text!==undefined)e.textContent=String(text);
 return e;
}
function visual(spec,lang){
 if(!spec||typeof spec!=='object')return null;
 const f=make('figure','why-step-visual');
 const ta=lang==='ta';
 const cap=make('figcaption','why-step-visual-caption');
 f.append(cap);
 if(spec.type==='grid'){
   if(!Array.isArray(spec.rows)||!Array.isArray(spec.cols)||spec.rows.length>4||spec.cols.length>4||!spec.rows.length||!spec.cols.length)return null;
   cap.textContent=ta?'முதல் ஆயம் ↓  இரண்டாம் ஆயம் →':'First coordinate ↓  Second coordinate →';
   const scroller=make('div','why-grid-scroll');
   scroller.tabIndex=0;scroller.setAttribute('role','region');
   scroller.setAttribute('aria-label',ta?'கார்டீசியன் சோடி அட்டவணை':'Cartesian pairing table');
   const table=make('table','why-pair-grid'),head=make('thead'),row=make('tr');
   row.append(make('th','why-grid-corner','×'));
   for(const col of spec.cols){const th=make('th',null,col);th.scope='col';row.append(th);}
   head.append(row);table.append(head);
   const body=make('tbody');
   for(const first of spec.rows){const tr=make('tr'),th=make('th',null,first);th.scope='row';tr.append(th);
    for(const second of spec.cols)tr.append(make('td',null,'('+first+', '+second+')'));
    body.append(tr);
   }
   table.append(body);scroller.append(table);f.append(scroller);
   return f;
 }
 if(spec.type==='venn'){
  if(!Array.isArray(spec.onlyLeft)||!Array.isArray(spec.onlyRight)||!Array.isArray(spec.both))return null;
  cap.textContent=ta?'இரு கணங்களிலும் உள்ள உறுப்புகள் நடுவில்':'Members in both sets belong in the overlap';
  const svg=svgNode('svg',{viewBox:'0 0 360 164',role:'img','aria-label':ta?'இரு கணங்களின் வெட்டு விளக்கப்படம்':'Set intersection diagram'});
  svg.append(svgNode('circle',{cx:145,cy:84,r:77,fill:'#c6bbeb','fill-opacity':0.35,stroke:'#7464a1','stroke-width':2}));
  svg.append(svgNode('circle',{cx:215,cy:84,r:77,fill:'#b5d4ce','fill-opacity':0.32,stroke:'#5e998a','stroke-width':2}));
  for(const [x,y,label] of [[110,35,spec.left||'B'],[250,35,spec.right||'C'],[97,97,spec.onlyLeft.join(', ')],[180,89,spec.both.join(', ')],[264,97,spec.onlyRight.join(', ')]])
   svg.append(svgNode('text',{x,y,'text-anchor':'middle','font-size':16,'font-weight':y===35?700:600,fill:'#33334a'},label));
  f.append(svg);
  const note=make('div','why-venn-answer');
  if(window.TriggleNotation)note.innerHTML=window.TriggleNotation.render({latex:'B\\cap C=A=\\{5,6\\}',fallback:'B∩C=A={5,6}',display:false});
  else note.textContent='B∩C=A={5,6}';
  f.append(note);return f;
 }
 if(spec.type==='mapping'){
  if(!Array.isArray(spec.pairs)||spec.pairs.length>6||!spec.pairs.every(p=>Array.isArray(p)&&p.length===2))return null;
  cap.textContent=ta?'ஒவ்வோர் உள்ளீட்டிற்கும் ஒரே அம்பு':'One arrow leaves each input';
  const grid=make('div','why-mapping');
  for(const [input,output] of spec.pairs){const row=make('div','why-map-row');
    row.append(make('span','why-map-value',input),make('span','why-map-arrow','→'),make('span','why-map-value',output));grid.append(row);
  }f.append(grid);return f;
 }
 if(spec.type==='flow'){
  if(!Array.isArray(spec.nodes)||spec.nodes.length>4||spec.nodes.length<2)return null;
  cap.textContent=ta?'உள்ளிருந்து வெளியே செயல்படுத்தும் வரிசை':'Apply functions from the inside outward';
  const row=make('div','why-flow');
  spec.nodes.forEach((node,i)=>{if(i)row.append(make('span','why-flow-arrow','→'));row.append(make('span','why-flow-node',node));});
  f.append(row);return f;
 }
 if(spec.type==='triangle'){
   cap.textContent=ta?'செங்கோண முக்கோணம் (அளவுக்கேற்ப அல்ல)':'Right-triangle model (not to scale)';
   const svg=svgNode('svg',{viewBox:'0 0 400 180',role:'img','aria-label':ta?'செங்கோண முக்கோண வரைபடம்':'Right-triangle diagram'});
   svg.append(svgNode('path',{d:'M35 130 L275 130 L275 20 Z',fill:'#f4effb',stroke:'#655386','stroke-width':'2.3','stroke-linejoin':'round'}));
   svg.append(svgNode('path',{d:'M255 130 L255 110 L275 110',fill:'none',stroke:'#655386','stroke-width':'1.6'}));
   svg.append(svgNode('text',{x:145,y:156,'text-anchor':'middle','font-size':15,fill:'#343050'},spec.base||'Base'));
   svg.append(svgNode('text',{x:282,y:74,'font-size':14,fill:'#343050'},spec.height||'Height'));
   svg.append(svgNode('text',{x:60,y:120,'font-size':14,fill:'#343050'},spec.angle||'θ'));
   f.append(svg);return f;
 }
 if(spec.type==='interval'){
  cap.textContent=ta?'இடைவெளியின் நடுமதிப்பு':'Midpoint represents the class interval';
  const svg=svgNode('svg',{viewBox:'0 0 340 100',role:'img','aria-label':ta?'இடைவெளி நடுமதிப்பு விளக்கம்':'Class interval midpoint diagram'});
  svg.append(svgNode('line',{x1:45,y1:50,x2:295,y2:50,stroke:'#63528b','stroke-width':3,'stroke-linecap':'round'}));
  for(const [x,value,mid] of [[45,spec.start,false],[170,spec.mid,true],[295,spec.end,false]]){
    svg.append(svgNode('circle',{cx:x,cy:50,r:mid?7:5,fill:mid?'#6c55aa':'#fff',stroke:'#63528b','stroke-width':2}));
    svg.append(svgNode('text',{x,y:mid?28:82,'text-anchor':'middle','font-size':17,'font-weight':mid?700:500,fill:'#343050'},value));
  }f.append(svg);return f;
 }
 return null;
}
function mount(event){
 const lesson=event?.detail,root=$('stepsList');if(!root)return;
 root.querySelectorAll('details.why-step-g10').forEach(node=>node.remove());
 if(lesson?.grade!==10||!lesson.item||!window.TriggleWhyStepG10?.hints)return;
 const record=window.TriggleWhyStepG10.hints[lesson.item.id];
 if(!record)return;
 const hints=(Array.isArray(record)?record:[record]).slice(0,3);
 const allSteps=[...root.querySelectorAll('li.worked-step:not(.final-answer-step)')];
 const lang=lesson.lang==='ta'?'ta':'en';
 for(const hint of hints){
  if(!Number.isInteger(hint?.step)||hint.step<0||hint.step>=allSteps.length)continue;
  const original=lesson.item.steps?.[hint.step];
  // Strictly reject mismatched source revisions; never attach generic guesses.
  if(typeof original?.en!=='string'||!original.en.includes(hint.expected)||!hint.en)continue;
  const li=allSteps[hint.step],body=li?.children[1],eq=body?.querySelector('.step-equation');
  if(!body||!eq||li.classList.contains('twd-worked-step'))continue;
  const details=make('details','why-step-g10');
  details.dataset.question=lesson.item.id;
  details.dataset.step=String(hint.step+1);
  const summary=make('summary',null,lang==='ta'?'ஏன் இந்தப் படி?':'Why this step?');
  summary.setAttribute('aria-label',(lang==='ta'?'படி ':'Step ')+(hint.step+1)+': '+summary.textContent);
  summary.addEventListener('keydown',e=>{if(e.key==='ArrowLeft'||e.key==='ArrowRight')e.stopPropagation();});
  const panel=make('div','why-step-panel');panel.lang=lang;
  panel.append(make('p',null,lang==='ta'&&hint.ta?hint.ta:hint.en));
  if(hint.math&&window.TriggleNotation){
    const formula=make('div','why-step-math');
    formula.innerHTML=window.TriggleNotation.render(hint.math);
    panel.append(formula);
    window.TriggleNotation.prepare?.(formula);
  }
  if(hint.diagram){const picture=visual(hint.diagram,lang);if(picture)panel.append(picture);}
  details.append(summary,panel);body.append(details);
 }
}
window.addEventListener('triggle:lessonchange',mount);
})();