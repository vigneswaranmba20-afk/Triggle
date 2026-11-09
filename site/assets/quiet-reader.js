/* Permanent question reader: no touch-to-show or release-to-hide behavior.
   Keep actions visible; scroll only the explanation for normal questions. */
(() => {
  'use strict';
  const mobile=window.matchMedia('(max-width:800px)');
  const body=document.body;
  const card=document.getElementById('lessonCard');
  const viewport=document.querySelector('.lesson-container');
  const question=document.getElementById('questionText');
  const answer=document.getElementById('answerBox');
  const steps=document.getElementById('stepsRegion');
  if(!card||!viewport||!question||!answer||!steps)return;
  let active=false;
  function measure(){
    body.classList.remove('reader-long-question');
    if(!active)return;
    const box=card.getBoundingClientRect();
    if(question.getBoundingClientRect().bottom>box.bottom-72 ||
       box.bottom-steps.getBoundingClientRect().top<72){
      // Exceptional long questions must remain complete, never clipped.
      body.classList.add('reader-long-question');
    }
  }
  const schedule=()=>window.requestAnimationFrame(measure);
  function sync(){
    active=mobile.matches&&body.classList.contains('textbook-reader')&&!card.hidden;
    body.classList.toggle('reader-peek',active);
    body.classList.toggle('reader-options-visible',active);
    body.classList.remove('reader-long-question');
    for(const sel of ['#visualLessonAction','.lesson-bottom','.class-dock']){
      const el=document.querySelector(sel);
      if(el)el.inert=false;
    }
    if(active)schedule();
  }
  window.addEventListener('triggle:lessonchange',sync);
  mobile.addEventListener('change',sync);
  window.addEventListener('resize',schedule,{passive:true});
  if(typeof ResizeObserver==='function'){
    const resize=new ResizeObserver(schedule);
    for(const el of [viewport,question,answer])resize.observe(el);
  }
  if(document.fonts?.ready)document.fonts.ready.then(schedule);
  sync();
  window.TriggleQuietReader=Object.freeze({
    isActive:()=>active,isVisible:()=>active,reveal:()=>{},conceal:()=>{}
  });
})();
