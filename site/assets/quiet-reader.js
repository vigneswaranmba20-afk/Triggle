/* Triggle lesson-first mobile reader.
   The exercise label, complete question, final answer, worked steps, Back to
   all chapters, and Previous/Next are ALWAYS available without touching.
   First touch reveals only supplemental tools. The header and breadcrumbs stay fixed. */
(() => {
  'use strict';
  const mobile=window.matchMedia('(max-width:800px)');
  const card=document.getElementById('lessonCard');
  const viewport=document.querySelector('.lesson-container');
  if(!card||!viewport)return;

  // Never put #questionNavDock, #stepsRegion, .question-top or
  // .lesson-title-row in this list: they are essential lesson controls/content.
  // Header, class/chapter breadcrumbs, worked steps, and Detailed explanation
  // are permanent controls/content. Touch only reveals optional extras.
  const surfaces=[
    '#figureBtn','#inlineFigure','#visualLessonAction',
    '.lesson-bottom','.reference-line','.bottom-extras','.class-dock'
  ].map(selector=>document.querySelector(selector)).filter(Boolean);
  const body=document.body;
  const RELEASE_GRACE_MS=4200;
  let active=false,visible=false,pressed=false,keyboard=false,hideTimer=0;

  const modalOpen=()=>Boolean(document.querySelector('dialog[open]'))||
    body.classList.contains('drawer-open');
  const stop=()=>{window.clearTimeout(hideTimer);hideTimer=0;};

  function setVisible(next){
    if(!active)return;
    if(!next&&(modalOpen()||keyboard||pressed))return;
    stop();
    visible=Boolean(next);
    body.classList.toggle('reader-options-visible',visible);
    for(const element of surfaces){
      element.inert=!visible;
    }
  }
  function hideLater(delay=RELEASE_GRACE_MS){
    stop();
    if(!active||!visible||pressed||keyboard)return;
    hideTimer=window.setTimeout(()=>{
      if(modalOpen()){hideLater();return;}
      const focused=document.activeElement;
      // Tab explicitly enables keyboard mode; mouse/touch focus must not
      // accidentally latch extra controls open indefinitely.
      if(focused&&surfaces.some(el=>el.contains(focused)))focused.blur();
      setVisible(false);
    },delay);
  }
  function sync(){
    const shouldActivate=mobile.matches&&body.classList.contains('textbook-reader')&&!card.hidden;
    stop();
    active=shouldActivate;
    pressed=false;
    keyboard=false;
    visible=false;
    body.classList.toggle('reader-peek',active);
    body.classList.remove('reader-options-visible');
    for(const element of surfaces)element.inert=active;
    if(active&&modalOpen()){setVisible(true);hideLater();}
  }

  // First contact reveals optional controls immediately. Essential lesson
  // content and navigation do not change or become hidden after release.
  document.addEventListener('pointerdown',event=>{
    if(!active||modalOpen()||!['touch','pen','mouse'].includes(event.pointerType))return;
    pressed=true;keyboard=false;
    setVisible(true);
  },{capture:true,passive:true});
  document.addEventListener('pointerup',()=>{
    if(!active)return;
    pressed=false;
    if(visible)hideLater();
  },{capture:true,passive:true});
  document.addEventListener('pointercancel',()=>{
    pressed=false;
    if(active&&visible)hideLater(900);
  },{capture:true,passive:true});
  viewport.addEventListener('scroll',()=>{
    if(active&&visible&&!pressed&&!keyboard)hideLater(900);
  },{passive:true});

  // Keyboard and assistive-tech users must always be able to reach controls.
  document.addEventListener('keydown',event=>{
    if(!active||modalOpen())return;
    if(event.key==='Tab'){
      keyboard=true;
      setVisible(true);
    }else if(event.key==='Escape'){
      keyboard=false;
      pressed=false;
      setVisible(false);
    }
  },true);
  document.addEventListener('focusin',event=>{
    if(!active||modalOpen())return;
    if(surfaces.some(el=>el.contains(event.target))&&event.target.matches(':focus-visible')&&!pressed){
      keyboard=true;
      setVisible(true);
    }
  },true);
  document.addEventListener('visibilitychange',()=>{
    if(document.hidden)stop();
    else if(active&&visible)hideLater();
  });
  document.querySelectorAll('dialog').forEach(dialog=>{
    dialog.addEventListener('close',()=>{if(active){keyboard=false;pressed=false;hideLater();}});
  });
  window.addEventListener('triggle:lessonchange',sync);
  mobile.addEventListener('change',sync);
  sync();
  window.TriggleQuietReader=Object.freeze({
    isActive:()=>active,
    isVisible:()=>active&&visible,
    reveal:()=>{keyboard=false;pressed=false;setVisible(true);hideLater();},
    conceal:()=>{keyboard=false;pressed=false;setVisible(false);},
    debugState:()=>({active,visible,pressed,keyboard,hasTimer:!!hideTimer,dialog:modalOpen()})
  });
})();
