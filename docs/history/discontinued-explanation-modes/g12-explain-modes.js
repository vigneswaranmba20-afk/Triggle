/* Deterministic, offline, opt-in explanation modes for reviewed medium/hard
 * Grade 12 items. Original curriculum records and math never modified.
 * Both views use the already verified step-equations and final answer.
 */
(()=>{'use strict';
 const modes=['exam','detailed'],labels={
  exam:'📝 Exam',detailed:'🧩 Detailed'
 };
 const $=(root,selector)=>root.querySelector(selector);
 function el(tag,className,text){
  const n=document.createElement(tag);
  if(className)n.className=className;
  if(text!==undefined)n.textContent=text;
  return n;
 }
 function mount({item,lang,host,region,quick,buildStep,answerHTML,prepare}){
  const cfg=window.TriggleG12Catalog?.get(item)||null;
  host.replaceChildren();
  region.querySelectorAll('.g12-depth-panel').forEach(n=>n.remove());
  quick.hidden=false;
  quick.removeAttribute('role');quick.removeAttribute('aria-labelledby');quick.removeAttribute('tabindex');
  if(!cfg){host.hidden=true;return false;}
  host.hidden=false;
  const isTamil=lang==='ta';
  const title=el('p','g12-depth-label',
    isTamil?'இந்தக் கேள்விக்கான விளக்கத்தைத் தேர்வு செய்யுங்கள்':'Choose how to understand this question');
  const level=el('span','g12-difficulty',cfg.difficulty==='hard'?'Complex problem':'Medium problem');
  const eyebrow=el('div','g12-mode-heading');
  eyebrow.append(title,level);host.append(eyebrow);
  const list=el('div','g12-tablist');list.setAttribute('role','tablist');
  list.setAttribute('aria-label','Grade 12 explanation styles');
  const tabs={};
  for(const mode of modes){
   const b=el('button','g12-mode-tab',labels[mode]);b.type='button';
   b.id='g12-tab-'+mode;b.setAttribute('role','tab');
   b.dataset.mode=mode;b.setAttribute('aria-controls',
    mode==='exam'?'quickSteps':'g12-'+mode+'-panel');
   tabs[mode]=b;list.append(b);
  }
  host.append(list);
  const note=el('p','g12-modes-note',
   isTamil?'கணித விடை மாறாது. கூடுதல் கற்பித்தல் விளக்கம் ஆங்கிலத்தில் உள்ளது; தமிழாக்கச் சரிபார்ப்பு நிலுவையில் உள்ளது.':
   'Same verified answer in both modes. Extra explanation is optional.');
  host.append(note);
  quick.setAttribute('role','tabpanel');quick.setAttribute('aria-labelledby',tabs.exam.id);
  quick.setAttribute('tabindex','0');
  const detailPanels={},expose={detailed:1},stepCount=item.steps.length;
  function build(mode){
   const panel=el('section','g12-depth-panel');
   panel.id='g12-'+mode+'-panel';panel.setAttribute('role','tabpanel');
   panel.setAttribute('aria-labelledby',tabs[mode].id);
   panel.setAttribute('tabindex','0');panel.hidden=true;
   const h=el('h3','g12-mode-title','🧩 Understand every step');
   panel.append(h);
   const goal=el('p','g12-mode-goal',cfg.goal);panel.append(goal);
   const reminder=el('aside','g12-prerequisite');
   reminder.append(el('strong','','Before we start: '));
   reminder.append(document.createTextNode(cfg.prerequisite));
   panel.append(reminder);
   const steps=el('ol','g12-exp-steps');steps.setAttribute('aria-label','Source-verified mathematical steps');
   const stepNodes=[];
   item.steps.forEach((step,i)=>{
    const li=buildStep(step,i);
    li.classList.add('g12-expanded-step');
    steps.append(li);stepNodes.push(li);
   });
   panel.append(steps);
   const warning=el('p','g12-math-warning');
   warning.append(el('strong','','Watch out: '));
   warning.append(document.createTextNode(cfg.watch));
   panel.append(warning);
   const final=el('div','g12-exp-final');
   final.append(el('strong','', '✓ Final answer — identical in every mode'));
   const result=el('div','g12-exp-answer');result.innerHTML=answerHTML;
   final.append(result);panel.append(final);
   const count=el('span','g12-count');count.setAttribute('aria-live','polite');
   const controls=el('div','g12-step-controls');
   const show=el('button','g12-secondary','Show all');show.type='button';
   const next=el('button','g12-primary','Next step →');next.type='button';
   controls.append(show,next);
   const navigation=el('div','g12-step-nav');navigation.append(count,controls);
   panel.insertBefore(navigation,steps);
   const checkArea=el('fieldset','g12-check');
   const legend=el('legend','', '🧠 Tiny brain check (optional)');
   checkArea.append(legend,el('p','g12-check-question',cfg.check.prompt));
   const checkRadios=[];
   cfg.check.choices.forEach((choice,j)=>{
    const label=el('label','g12-check-option');
    const input=document.createElement('input');
    input.type='radio';input.name='g12-check-'+mode;input.value=String(j);
    label.append(input,document.createTextNode(choice));
    checkArea.append(label);checkRadios.push(input);
   });
   const checkButton=el('button','g12-secondary','Check my thinking');checkButton.type='button';
   const feedback=el('p','g12-check-feedback');feedback.setAttribute('aria-live','polite');
   checkButton.addEventListener('click',()=>{
    const picked=checkRadios.find(x=>x.checked);
    if(!picked){feedback.textContent='Choose an answer when you’re ready.';return;}
    feedback.textContent=Number(picked.value)===cfg.check.correct
      ?'✅ Yes! '+cfg.check.why
      :'Not quite. Hint: '+cfg.prerequisite+' Try again.';
   });
   checkArea.append(checkButton,feedback);panel.append(checkArea);
   region.append(panel);
   function update(){
    const revealed=expose[mode],done=revealed===stepCount;
    stepNodes.forEach((step,i)=>step.hidden=i>=revealed);
    warning.hidden=!done;final.hidden=!done;checkArea.hidden=!done;
    count.textContent='Step '+revealed+' / '+stepCount;
    next.disabled=done;next.textContent=done?'All steps revealed ✓':'Next step →';
   }
   next.addEventListener('click',()=>{expose[mode]=Math.min(stepCount,expose[mode]+1);update();prepare?.(panel);});
   show.addEventListener('click',()=>{expose[mode]=stepCount;update();prepare?.(panel);});
   update();detailPanels[mode]=panel;
  }
  build('detailed');
  function choose(mode,focus){
   for(const m of modes){
    const selected=m===mode;
    tabs[m].setAttribute('aria-selected',String(selected));
    tabs[m].tabIndex=selected?0:-1;
    if(selected&&focus)tabs[m].focus();
   }
   quick.hidden=mode!=='exam';
   detailPanels.detailed.hidden=mode!=='detailed';
   if(mode!=='exam')prepare?.(detailPanels[mode]);
  }
  for(const mode of modes)tabs[mode].addEventListener('click',()=>choose(mode,false));
  list.addEventListener('keydown',event=>{
   if(!['ArrowRight','ArrowLeft','Home','End'].includes(event.key))return;
   event.preventDefault();
   const active=modes.find(m=>tabs[m].getAttribute('aria-selected')==='true')||'exam';
   const i=modes.indexOf(active),next=event.key==='Home'?0:event.key==='End'?modes.length-1:
    (i+(event.key==='ArrowRight'?1:modes.length-1))%modes.length;
   choose(modes[next],true);
  });
  choose('exam',false);
  return true;
 }
 window.TriggleG12Explain=Object.freeze({mount});
})();
