/* Class 10 "Why this step?" progressive disclosure.
 * Independent of the solution engine: no step text, formulas, answers or
 * class navigation are modified. Only vetted, exact-step bridges appear.
 */
(()=>{'use strict';
const get=(id)=>document.getElementById(id);
function mount(event){
  const lesson=event?.detail,root=get('stepsList');
  if(!root)return;
  root.querySelectorAll('details.why-step-g10').forEach(node=>node.remove());
  if(lesson?.grade!==10||!lesson.item||!window.TriggleWhyStepG10)return;
  const hint=window.TriggleWhyStepG10.hints[lesson.item.id];
  if(!hint||!Number.isInteger(hint.step)||hint.step<0)return;
  const original=lesson.item.steps?.[hint.step];
  // Fail closed if edited lesson content no longer matches the reviewed bridge.
  if(!original||typeof original.en!=='string'||!original.en.includes(hint.expected))return;
  const li=root.querySelectorAll('li.worked-step:not(.final-answer-step)')[hint.step];
  if(!li||li.classList.contains('twd-worked-step'))return;
  const body=li.children[1],equation=body?.querySelector('.step-equation');
  if(!body||!equation)return;
  const lang=lesson.lang==='ta'?'ta':'en',details=document.createElement('details');
  details.className='why-step-g10';
  details.dataset.question=lesson.item.id;
  details.dataset.step=String(hint.step+1);
  const summary=document.createElement('summary');
  summary.textContent=lang==='ta'?'ஏன் இந்தப் படி?':'Why this step?';
  summary.setAttribute('aria-label',(lang==='ta'?'படி ':'Step ')+(hint.step+1)+': '+summary.textContent);
  summary.addEventListener('keydown',e=>{
   // The app uses left/right arrows for question navigation. Keep these keys
   // local to a focused disclosure so keyboard users don't leave the lesson.
   if(e.key==='ArrowLeft'||e.key==='ArrowRight')e.stopPropagation();
  });
  const panel=document.createElement('div');
  panel.className='why-step-panel';
  panel.lang=lang;
  const explanation=document.createElement('p');
  explanation.textContent=lang==='ta'&&hint.ta?hint.ta:hint.en;
  panel.append(explanation);
  if(hint.math&&window.TriggleNotation){
   const formula=document.createElement('div');
   formula.className='why-step-math';
   formula.innerHTML=window.TriggleNotation.render(hint.math);
   panel.append(formula);
   window.TriggleNotation.prepare?.(formula);
  }
  details.append(summary,panel);
  body.append(details);
}
window.addEventListener('triggle:lessonchange',mount);
})();