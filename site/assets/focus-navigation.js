/* Immersive exercise reading mode. No dependencies or remote calls.
   The three navigation surfaces form one auto-hiding, recoverable control group. */
(() => {
  'use strict';
  const small=matchMedia('(max-width:800px)');
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  const bar=document.querySelector('.appbar');
  const pageNav=document.querySelector('.page-controls');
  const dock=document.getElementById('classDock');
  const lesson=document.getElementById('lessonCard');
  const toggle=document.getElementById('focusNavToggle');
  const viewport=document.querySelector('.lesson-container');
  const surfaces=[bar,pageNav,dock].filter(Boolean);
  if(!bar||!pageNav||!dock||!lesson||!toggle||!viewport)return;
  const AUTO_HIDE_MS=4600;
  let active=false,visible=true,hideTimer=0,keyboardMode=false,down=null;
  let lastLang='en';
  const message={
    en:{show:'Show navigation',hide:'Hide navigation',tip:'Tap the page to show Find, Home, and question controls'},
    ta:{show:'வழிசெலுத்தலைக் காட்டு',hide:'வழிசெலுத்தலை மறை',tip:'தேடு, முகப்பு, வினா பட்டன்களைக் காண பக்கத்தைத் தொடுங்கள்'}
  };
  const modalOpen=()=>!!document.querySelector('dialog[open]')||document.body.classList.contains('drawer-open');
  function stopTimer(){clearTimeout(hideTimer);hideTimer=0;}
  function label(){
    const t=message[lastLang];
    toggle.textContent=visible?'×':'☰';
    toggle.setAttribute('aria-label',visible?t.hide:t.show);
    toggle.title=visible?t.hide:t.show;
    toggle.setAttribute('aria-expanded',String(visible));
    toggle.setAttribute('aria-controls','browseBtn homeBtn previous next classDock');
  }
  function show(shouldShow){
    if(!active)return;
    if(!shouldShow && (modalOpen()||keyboardMode))return;
    stopTimer();
    visible=Boolean(shouldShow);
    document.body.classList.toggle('focus-controls-visible',visible);
    for(const el of surfaces){
      el.inert=!visible;
      if(visible)el.removeAttribute('aria-hidden');
      else el.setAttribute('aria-hidden','true');
    }
    label();
    if(visible)scheduleHide();
  }
  function scheduleHide(){
    stopTimer();
    if(!active||!visible||keyboardMode||modalOpen())return;
    hideTimer=setTimeout(()=>{
      if(modalOpen()||keyboardMode){scheduleHide();return;}
      // An active keyboard focus on the controls must never disappear.
      const a=document.activeElement;
      if(a?.matches(':focus-visible')&&surfaces.some(el=>el.contains(a))){scheduleHide();return;}
      if(a&&surfaces.some(el=>el.contains(a)))a.blur();
      show(false);
    },AUTO_HIDE_MS);
  }
  function sync(detail){
    // The app emits a lessonchange event for every route and language change.
    // This mode is strictly limited to a rendered question on narrow screens.
    const exists=detail&&detail.item&&detail.item.id;
    const want=Boolean(small.matches&&exists&&!lesson.hidden&&!document.body.classList.contains('textbook-reader'));
    lastLang=detail?.lang==='ta'?'ta':document.documentElement.lang==='ta'?'ta':'en';
    if(!want){
      stopTimer();active=false;visible=true;keyboardMode=false;
      document.body.classList.remove('question-focus','focus-controls-visible');
      toggle.hidden=true;
      for(const el of surfaces){el.inert=false;el.removeAttribute('aria-hidden');}
      label();
      return;
    }
    active=true;
    document.body.classList.add('question-focus');
    toggle.hidden=false;
    if(modalOpen())show(true);
    else{
      keyboardMode=false;
      show(true);
    }
  }
  toggle.addEventListener('click',e=>{
    e.stopPropagation();
    if(!active)return;
    keyboardMode=false;
    if(visible){toggle.focus({preventScroll:true});show(false);}
    else show(true);
  });
  let pointerInNav=false;
  document.addEventListener('pointerdown',e=>{
    if(!active||modalOpen())return;
    pointerInNav=surfaces.some(el=>el.contains(e.target))||toggle.contains(e.target);
    if(e.pointerType==='touch'||e.pointerType==='mouse'||e.pointerType==='pen'){
      down={x:e.clientX,y:e.clientY,t:Date.now(),onNavigation:pointerInNav};
      keyboardMode=false;
    }
  },{passive:true});
  document.addEventListener('pointerup',e=>{
    if(!active||modalOpen()||!down)return;
    const gesture=down;down=null;
    const moved=Math.hypot(e.clientX-gesture.x,e.clientY-gesture.y);
    if(moved>14){
      if(visible)show(false); // Scrolling means reading.
      return;
    }
    if(gesture.onNavigation)return;
    if(!visible)show(true);
    else scheduleHide();
  },{passive:true});
  document.addEventListener('pointercancel',()=>{down=null;},{passive:true});
  viewport.addEventListener('scroll',()=>{
    if(active&&visible&&!modalOpen()&&!keyboardMode)show(false);
  },{passive:true});
  // The questions are navigable by keyboard even when touch controls are hidden.
  document.addEventListener('keydown',e=>{
    if(!active||modalOpen())return;
    if(e.key==='Tab'){
      keyboardMode=true;
      show(true);
    }else if(e.key==='Escape'&&visible){
      keyboardMode=false;
      if(!surfaces.some(el=>el.contains(document.activeElement)))show(false);
    }
  });
  document.addEventListener('focusin',e=>{
    if(!active||modalOpen())return;
    if(surfaces.some(el=>el.contains(e.target))){
      keyboardMode=Boolean(e.target.matches(':focus-visible'));
      if(!visible)show(true);
      else scheduleHide();
    }
  });
  document.addEventListener('visibilitychange',()=>{
    if(document.hidden)stopTimer();
    else if(active&&visible)scheduleHide();
  });
  for(const el of document.querySelectorAll('dialog')){
    el.addEventListener('close',()=>{if(active&&visible){keyboardMode=false;scheduleHide();}});
  }
  window.addEventListener('triggle:lessonchange',e=>sync(e.detail));
  small.addEventListener('change',()=>{
    // Language and current question can be recovered from existing DOM.
    sync({item:lesson.hidden?null:{id:'current'},lang:document.documentElement.lang});
  });
  // app.js has already rendered before this script is loaded.
  sync({item:lesson.hidden?null:{id:'current'},lang:document.documentElement.lang});
  window.TriggleFocusNavigation=Object.freeze({
    isActive:()=>active,isVisible:()=>active&&visible,
    reveal:()=>show(true),hide:()=>show(false)
  });
})();
