/* One-question teaching prototype: g12-ch1-ex1.1-q8.
 * No changes to canonical records, storage, or live lesson navigation.
 * No analytics, IQ inference, or network calls.
 */
(() => {
  'use strict';
  const notation=window.TriggleNotation;
  const expressions=[...document.querySelectorAll('.equation[data-tex]')];
  for(const el of expressions){
    const value=el.getAttribute('data-tex');
    const fallback=el.getAttribute('data-fallback')||value;
    el.innerHTML=notation?.renderLatex?.(value,{displayMode:true,fallback})||fallback;
  }
  const modes=['exam','learn','fun'];
  const buttons=[...document.querySelectorAll('[role="tab"][data-mode]')];
  const exposed={learn:1,fun:1};
  const counts={learn:document.querySelectorAll('[data-reveal-set="learn"] .teach-step').length,
                fun:document.querySelectorAll('[data-reveal-set="fun"] .teach-step').length};
  function paint(mode){
    if(mode==='exam')return;
    const stepNodes=[...document.querySelectorAll('[data-reveal-set="'+mode+'"] .teach-step')];
    stepNodes.forEach((node,i)=>node.hidden=i>=exposed[mode]);
    const label=mode==='fun'?'Clue':'Step';
    document.querySelector('[data-progress="'+mode+'"]').textContent=
      label+' '+exposed[mode]+' of '+counts[mode];
    const next=document.querySelector('[data-next="'+mode+'"]');
    next.disabled=exposed[mode]===counts[mode];
    next.textContent=next.disabled?'All revealed ✓':(mode==='fun'?'Next clue →':'Next step →');
  }
  function selectMode(mode,{focus=false,updateUrl=false}={}){
    if(!modes.includes(mode))return;
    for(const b of buttons){
      const selected=b.dataset.mode===mode;
      b.setAttribute('aria-selected',String(selected));
      b.tabIndex=selected?0:-1;
      if(selected&&focus)b.focus();
    }
    for(const other of modes){
      const panel=document.getElementById('panel-'+other);
      panel.hidden=other!==mode;
    }
    paint(mode);
    if(updateUrl){
      const url=new URL(location.href);
      url.searchParams.set('mode',mode);
      history.replaceState(null,'',url);
    }
  }
  for(const b of buttons)b.addEventListener('click',()=>selectMode(b.dataset.mode,{updateUrl:true}));
  const tabs=document.querySelector('.tabs');
  tabs.addEventListener('keydown',event=>{
    if(!['ArrowLeft','ArrowRight','Home','End'].includes(event.key))return;
    event.preventDefault();
    const current=modes.indexOf(buttons.find(b=>b.getAttribute('aria-selected')==='true')?.dataset.mode||'learn');
    const index=event.key==='Home'?0:event.key==='End'?modes.length-1:
      (current+(event.key==='ArrowRight'?1:-1)+modes.length)%modes.length;
    selectMode(modes[index],{focus:true,updateUrl:true});
  });
  for(const mode of ['learn','fun']){
    paint(mode);
    document.querySelector('[data-next="'+mode+'"]').addEventListener('click',()=>{
      exposed[mode]=Math.min(counts[mode],exposed[mode]+1);
      paint(mode);
    });
    document.querySelector('[data-show-all="'+mode+'"]').addEventListener('click',()=>{
      exposed[mode]=counts[mode];
      paint(mode);
    });
  }
  const fromUrl=new URL(location.href).searchParams.get('mode');
  selectMode(modes.includes(fromUrl)?fromUrl:'learn');
  for(const id of ['sign','scope']){
    const fieldset=document.querySelector('[data-question="'+id+'"]');
    const result=document.querySelector('[data-result="'+id+'"]');
    const submit=fieldset.querySelector('[data-check]');
    submit.addEventListener('click',()=>{
      const checked=fieldset.querySelector('input[type="radio"]:checked');
      result.classList.remove('correct','retry');
      if(!checked){
        result.textContent='Pick an answer first — it is okay to guess.';
        result.classList.add('retry');
      }else if(checked.value==='correct'){
        result.textContent=id==='sign'?'✅ Yes! Both signs square to 16.':'✅ Exactly! The entire matrix gets one shared sign.';
        result.classList.add('correct');
      }else{
        result.textContent=id==='sign'?'Almost! Work out (+4)² and (−4)² and try again.':
          'Try again! The ± belongs to the whole matrix, not individual cells.';
        result.classList.add('retry');
      }
    });
  }
  const voting=[...document.querySelectorAll('[data-vote]')];
  for(const button of voting){
    button.addEventListener('click',()=>{
      voting.forEach(other=>other.setAttribute('aria-pressed',String(other===button)));
      document.getElementById('vote-result').textContent=
        'Noted: '+button.dataset.vote+' mode. Tell us which idea became clearer — this prototype does not transmit feedback.';
    });
  }
})();
