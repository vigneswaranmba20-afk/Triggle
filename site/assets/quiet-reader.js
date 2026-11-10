/* Adaptive continuous reader: no fixed question or nested solution scroll.
   The compact question anchor appears only after the question leaves the viewport. */
(()=>{
  'use strict';
  const mobile=window.matchMedia('(max-width:800px)');
  const body=document.body;
  const card=document.getElementById('lessonCard');
  const question=document.getElementById('questionText');
  const jump=document.getElementById('questionJump');
  const dock=document.getElementById('questionNavDock');
  const context=document.querySelector('.status-row');
  if(!card||!question||!jump||!dock||!context)return;
  let active=false,queued=false;
  function measure(){
    queued=false;
    if(!active)return;
    const past=question.getBoundingClientRect().bottom<context.getBoundingClientRect().bottom+8;
    body.classList.toggle('reader-question-past',past);
    jump.hidden=!past;
    const tamil=document.documentElement.lang==='ta';
    jump.textContent=tamil?'↑ வினா':'↑ Question';
    jump.setAttribute('aria-label',tamil?'முழு வினாவுக்குத் திரும்பு':'Return to the complete question');
    const h=Math.ceil(dock.getBoundingClientRect().height);
    if(h>0)document.documentElement.style.setProperty('--triggle-reader-dock-height',h+'px');
  }
  function schedule(){
    if(!queued){queued=true;window.requestAnimationFrame(measure);}
  }
  function sync(){
    active=mobile.matches&&body.classList.contains('textbook-reader')&&!card.hidden;
    body.classList.toggle('reader-options-visible',active);
    body.classList.remove('reader-question-past','reader-long-question','reader-peek');
    jump.hidden=true;
    for(const sel of ['#visualLessonAction','.lesson-bottom','.class-dock']){
      const el=document.querySelector(sel);
      if(el)el.inert=false;
    }
    if(active)schedule();
  }
  jump.addEventListener('click',()=>{
    const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    question.scrollIntoView({block:'start',behavior:reduced?'auto':'smooth'});
    question.focus({preventScroll:true});
  });
  window.addEventListener('triggle:lessonchange',sync);
  window.addEventListener('scroll',schedule,{passive:true});
  window.addEventListener('resize',()=>{sync();schedule()},{passive:true});
  mobile.addEventListener('change',sync);
  if(typeof ResizeObserver==='function'){
    const observer=new ResizeObserver(schedule);
    observer.observe(dock);
    observer.observe(question);
  }
  if(document.fonts?.ready)document.fonts.ready.then(schedule);
  sync();
  window.TriggleQuietReader=Object.freeze({
    isActive:()=>active,isVisible:()=>active,reveal:()=>{},conceal:()=>{}
  });
})();
