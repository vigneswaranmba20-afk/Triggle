/* Triggle Phase 2 — seven short, original, textbook-aligned mini-lessons.
   No network, accounts, trackers or external API dependencies. */
(() => {
  'use strict';
  const book=window.TRIGGLE_SET_PATH;
  if(!book || book.chapterId!=='g9-ch1')return;
  const STORAGE='triggle.g9.set-path.v1';
  const ACTIVE_STAGE='triggle.g9.set-path.active.v1';
  const pick=(v,l)=>typeof v==='string'?v:(v?.[l]||v?.en||'');
  const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const plain=s=>Array.isArray(s)?s.map(plain).join(''):typeof s==='object'?(s?.fallback||''):String(s??'');
  const htmlMath=s=>{s=window.TriggleG9Math?.text(s)??s;return window.TriggleNotation?.render(s)||esc(s);};
  const words={
    en:{label:'YOUR SHORT LEARNING PATH',title:'Build Set Language, one idea at a time',
      intro:'Seven short explorations follow the 2025 textbook. Choose one, try it, then practise on paper. You can stop whenever you understand.',
      state:'Ideas checked on this device',learned:'learned',source:'Textbook section',enPage:'English page',taPage:'Tamil page',
      select:'Pick an idea',try:'Try a quick check',hint:'One clue',why:'Why does this work?',
      correct:'You got it. This idea is ready for paper practice.',retry:'Not yet. Try the clue, then choose again.',
      paper:'Now put the phone down: one paper task',tryVenn:'Open the interactive Venn diagram ↓',
      deeper:'Harder example · Explain it one step at a time',next:'Show next reasoning step',
      finish:'All reasoning steps revealed. Check the answer on paper.',
      saved:'Only brief checkmarks are saved on this phone. No account or online tracking.',
      membership:'Tap a number to test membership',forms:'Change the representation',
      types:'Explore a set type',properties:'Choose a property',law:'Switch the law',
      count:'Move the common-member count',atleast:'At least one',none:'Neither',
      onlyA:'Only A',onlyB:'Only B',overlap:'Both',lawResult:'Both sides give',
      extra:'Try a second practice question',reason:'Show the reasoning',top:'Back to learning path',
      previousIdea:'Previous idea',nextIdea:'Next idea',position:(n,total)=>'Idea '+n+' of '+total,
      navTip:'Choose one of seven numbered ideas. The question appears directly above its answers and scrolls naturally.',
       questionLabel:'CURRENT QUESTION',nextPage:'Next page',backChapter:'Back to Chapter 1',sliderTip:'Drag left or right (or use arrow keys) to change how many students are in BOTH groups. Tap − or + to change one student at a time. Watch the numbers and equation update.',sliderFormula:(both,union,neither)=>[{latex:'A\\text{ or }B=14+11-'+both+'='+union,fallback:`A or B = 14 + 11 − ${both} = ${union}`},'. ',{latex:'\\text{Neither}=30-'+union+'='+neither,fallback:`Neither = 30 − ${union} = ${neither}`},'. The overlap was counted twice, so subtract it once.']},
    ta:{label:'சிறிய கற்றல் பாதை',title:'கண மொழியை ஒவ்வொரு கருத்தாகக் கற்போம்',
      intro:'2025 பாடநூலை அடிப்படையாகக் கொண்ட ஏழு சிறு ஆராய்ச்சிகள். ஒன்றைத் தேர்ந்து முயலுங்கள்; பிறகு தாளில் பயிற்சி செய்யுங்கள்.',
      state:'இந்த சாதனத்தில் சரிபார்த்த கருத்துகள்',learned:'கற்றவை',source:'பாடநூல் பகுதி',enPage:'ஆங்கிலம் பக்கம்',taPage:'தமிழ் பக்கம்',
      select:'ஒரு கருத்தைத் தேர்ந்தெடுக்கவும்',try:'ஒரு சிறிய வினா',hint:'ஒரு குறிப்பு',why:'இது ஏன் சரி?',
      correct:'சரி! இப்போது தாளில் நீங்களே முயலலாம்.',retry:'இன்னும் இல்லை. குறிப்பைப் பார்த்து மீண்டும் முயலுங்கள்.',
      paper:'கைப்பேசியை வைத்துவிட்டு தாளில் செய்யுங்கள்',tryVenn:'வென் பட ஆய்வகத்தைத் திறக்க ↓',
      deeper:'கடினமான எடுத்துக்காட்டு · ஒவ்வொரு காரணப் படியாகப் பார்ப்போம்',next:'அடுத்த காரணப் படியைக் காட்டு',
      finish:'எல்லா காரணப் படிகளும் காட்டப்பட்டன. தாளில் விடையைச் சரிபார்க்கவும்.',
      saved:'சிறு சரிபார்ப்புக் குறிகள் இச்சாதனத்தில் மட்டும் சேமிக்கப்படுகின்றன. கணக்கு / இணையக் கண்காணிப்பு இல்லை.',
      membership:'ஒரு எண்ணைத் தொட்டு உறுப்பா எனக் காண்க',forms:'குறிப்பிடும் முறையை மாற்றுங்கள்',
      types:'கண வகையை ஆராயுங்கள்',properties:'ஒரு பண்பைத் தேர்ந்தெடுக்கவும்',law:'விதியை மாற்றுங்கள்',
      count:'பொதுவான உறுப்புகளின் எண்ணிக்கையை மாற்றுங்கள்',atleast:'குறைந்தது ஒன்று',none:'எதுவுமில்லை',
      onlyA:'A மட்டும்',onlyB:'B மட்டும்',overlap:'இரண்டும்',lawResult:'இருபுறங்களிலும் கிடைப்பது',
      extra:'இன்னொரு பயிற்சி வினா',reason:'காரணத்தைப் பார்க்க',top:'கற்றல் பாதைக்குத் திரும்புக',
      previousIdea:'முந்தைய கருத்து',nextIdea:'அடுத்த கருத்து',position:(n,total)=>total+' இல் கருத்து '+n,
      navTip:'எண்ணிடப்பட்ட ஏழு கருத்துகளில் ஒன்றைத் தேர்ந்தெடுக்கவும். ஒவ்வொரு வினாவும் விடைத்தேர்வுகளுக்கு மேலே தோன்றும்; பக்கத்துடன் இயல்பாக நகரும்.',
       questionLabel:'தற்போதைய வினா',nextPage:'அடுத்த பக்கம்',backChapter:'அத்தியாயம் 1-க்குத் திரும்பு',sliderTip:'இரு குழுக்களிலும் உள்ள மாணவர்களின் எண்ணிக்கையை மாற்ற ஸ்லைடரை இடம் அல்லது வலமாக நகர்த்துங்கள் (அல்லது அம்பு விசைகளைப் பயன்படுத்துங்கள்). − அல்லது + பொத்தானைத் தொட்டு ஒரு மாணவராக மாற்றலாம். எண்ணிக்கையும் கணக்கும் மாறுவதைக் கவனியுங்கள்.',sliderFormula:(both,union,neither)=>[{latex:'A',fallback:'A'},' அல்லது ',{latex:'B',fallback:'B'},' = ',{latex:'14+11-'+both+'='+union,fallback:`14 + 11 − ${both} = ${union}`},'. எதுவுமில்லை = ',{latex:'30-'+union+'='+neither,fallback:`30 − ${union} = ${neither}`},'. பொதுவானவர்கள் இரு குழுக்களிலும் எண்ணப்படுவதால் ஒருமுறை கழிக்க வேண்டும்.']}
  };
  function load(){
    try{
      const value=JSON.parse(localStorage.getItem(STORAGE)||'[]');
      return new Set(Array.isArray(value)?value.filter(x=>book.stages.some(s=>s.id===x)):[]);
    }catch{return new Set();}
  }
  function save(done){try{localStorage.setItem(STORAGE,JSON.stringify([...done]))}catch{}}
  function mount(container,chapter,language,onBack){
    if(!container||chapter?.id!=='g9-ch1')return false;
    const lang=language==='ta'?'ta':'en',t=words[lang],done=load();
    let active=0;
    try{
      const stored=Number(sessionStorage.getItem(ACTIVE_STAGE));
      if(Number.isInteger(stored)&&stored>=0&&stored<book.stages.length)active=stored;
    }catch{}
    const root=document.createElement('section');
    root.className='sp2-journey';
    root.setAttribute('aria-label',t.title);
    root.innerHTML='<div class="sp2-learning-toolbar">'+
      '<button type="button" class="sp2-idea-picker" data-idea-picker aria-controls="sp2-g9-ideas" aria-expanded="false" aria-label="'+esc(t.select)+'">'+
      '<span data-journey-index></span><span class="sp2-picker-chevron" aria-hidden="true">⌄</span></button>'+
      '<span class="sp2-progress" role="status" aria-live="polite" data-progress></span></div>'+
      '<div class="sp2-nav" id="sp2-g9-ideas" role="group" aria-label="'+esc(t.select)+'" data-nav hidden></div>'+
      '<div class="sp2-panel" data-panel></div>'+
      '<nav class="sp2-journey-footer" aria-label="'+esc(t.select)+'">'+
      '<button type="button" class="sp2-footer-prev" data-footer-prev>'+esc('← '+t.previousIdea)+'</button>'+
      '<button type="button" class="sp2-footer-next" data-footer-next></button></nav>'+
      '<p class="sp2-private">'+esc(t.saved)+'</p>';
    container.append(root);
    const nav=root.querySelector('[data-nav]'),panel=root.querySelector('[data-panel]');
    const picker=root.querySelector('[data-idea-picker]');
    function closePicker(refocus=false){
      nav.hidden=true;
      picker.setAttribute('aria-expanded','false');
      if(refocus)picker.focus();
    }
    picker.addEventListener('click',()=>{
      const open=nav.hidden;
      nav.hidden=!open;
      picker.setAttribute('aria-expanded',String(open));
    });
    nav.addEventListener('keydown',event=>{
      if(event.key==='Escape'){event.preventDefault();closePicker(true);}
    });
    function updateProgress(){
      root.querySelector('[data-progress]').textContent=done.size+' / '+book.stages.length+' '+t.learned;
      nav.querySelectorAll('button').forEach(button=>{
        const stage=book.stages[Number(button.dataset.index)];
        button.classList.toggle('sp2-done',done.has(stage.id));
        button.classList.toggle('sp2-current',Number(button.dataset.index)===active);
        button.setAttribute('aria-pressed',String(Number(button.dataset.index)===active));
        button.setAttribute('aria-current',Number(button.dataset.index)===active?'step':'false');
        button.querySelector('.sp2-done-mark').textContent=done.has(stage.id)?'✓':'';
      });
      root.querySelector('[data-journey-index]').textContent=t.position(active+1,book.stages.length);
      root.querySelector('[data-footer-prev]').disabled=active===0;
       root.querySelector('[data-footer-next]').textContent=active===book.stages.length-1?t.backChapter+' →':t.nextPage+' →';
       root.querySelector('[data-footer-next]').classList.toggle('is-return',active===book.stages.length-1);
    }
    book.stages.forEach((stage,i)=>{
      const button=document.createElement('button');
      button.type='button';button.dataset.index=String(i);button.className='sp2-nav-button';
      button.innerHTML='<span class="sp2-nav-number">'+(i+1)+'</span><span class="sp2-nav-name">'+esc(pick(stage.title,lang))+'</span><span class="sp2-done-mark" aria-hidden="true"></span>';
      button.addEventListener('click',()=>show(i,true));
      nav.append(button);
    });
     root.querySelector('[data-footer-prev]').addEventListener('click',()=>show(active-1,true));
     root.querySelector('[data-footer-next]').addEventListener('click',()=>{
       if(active===book.stages.length-1){if(typeof onBack==='function')onBack();return;}
       show(active+1,true);
     });
    function demoShell(title){return '<div class="sp2-demo" data-demo><p class="sp2-demo-title">'+esc(title)+'</p><div class="sp2-demo-controls" data-demo-controls></div><p class="sp2-demo-output" data-demo-output role="status" aria-live="polite"></p></div>';}
    function btn(name,key){return '<button type="button" data-demo-mode="'+esc(key)+'" aria-label="'+esc(plain(name))+'">'+htmlMath(name)+'</button>';}
    function setDemo(state,options,paint){
      const controls=panel.querySelector('[data-demo-controls]');
      controls.innerHTML=options.map(([name,key])=>btn(name,key)).join('');
      controls.querySelectorAll('button').forEach(button=>button.addEventListener('click',()=>paint(button.dataset.demoMode,update)));
      function update(key,value){
        controls.querySelectorAll('button').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.demoMode===key)));
        panel.querySelector('[data-demo-output]').innerHTML=htmlMath(value);
      }
      paint(state,update);
      return update;
    }
    function demo(stage){
      const out=panel.querySelector('[data-demo]');
      if(!out)return;
      if(stage.visual==='membership'){
        const options=[2,3,4,5].map(n=>[String(n),String(n)]);
        setDemo('2',options,(n,update)=>{
          const yes=[2,4].includes(Number(n));
          const fallback=n+(yes?' ∈ A':' ∉ A');
          update(n,[{latex:n+(yes?'\\in A':'\\notin A'),fallback},(lang==='ta'?(yes?' · உறுப்பு':' · உறுப்பு அல்ல'):(yes?' · belongs':' · does not belong'))]);
        });
      }else if(stage.visual==='forms'){
        const options=lang==='ta'
          ?[['விவரிப்பு வடிவம்','description'],['பட்டியல் வடிவம்','roster'],['கண அமைப்பு வடிவம்','builder']]
          :[['Descriptive Form','description'],['Roster Form','roster'],['Set-Builder Form','builder']];
        const forms={
          description:lang==='ta'?'10-ஐ விடச் சிறிய நேர்ம இரட்டைப்படை முழு எண்களின் கணம்':'Positive even whole numbers less than 10',
          roster:{"latex": "E=\\{2,4,6,8\\}", "fallback": "E = {2, 4, 6, 8}"},
          builder:{"latex": "\\begin{aligned}E=\\{x\\in N: {}&x<10,\\\\ &x\\text{ is even}\\}\\end{aligned}", "fallback": "E = {x ∈ N : x < 10, x is even}"}
        };
        setDemo('roster',options,(key,update)=>update(key,forms[key]));
      }else if(stage.visual==='types'){
        const options=lang==='ta'
          ?[['வெற்று','empty'],['ஓருறுப்பு','single'],['முடிவுறு','finite'],['முடிவுறா','infinite'],['உட்கணம்','subset'],['சம / சமான','equivalent']]
          :[['Empty','empty'],['Singleton','single'],['Finite','finite'],['Infinite','infinite'],['Subset','subset'],['Equal vs same size','equivalent']];
        const values={
          empty:{"latex": "\\varnothing=\\{\\};\\quad n(\\varnothing)=0", "fallback": "∅ = {} ; n(∅) = 0"},
          single:{"latex": "\\{7\\};\\quad n(\\{7\\})=1", "fallback": "{7} ; n({7}) = 1"},
          finite:{"latex": "\\{1,2,3\\};\\quad n(A)=3", "fallback": "{1, 2, 3} ; n(A) = 3"},
          infinite:{"latex": "N=\\{1,2,3,\\ldots\\}", "fallback": "N = {1, 2, 3, …}"},
          subset:{"latex": "\\begin{gathered}\\{1,3\\}\\subset\\{1,2,3\\}\\\\\\{1,2,3\\}\\subseteq\\{1,2,3\\}\\end{gathered}", "fallback": "{1, 3} ⊂ {1, 2, 3} ; {1, 2, 3} ⊆ {1, 2, 3}"},
          equivalent:lang==='ta'
            ?'{a, b} ≠ {1, 2}; ஆதி எண் இரண்டிலும் 2. சமமான கணங்கள்; சம கணங்கள் அல்ல.'
            :'{a, b} ≠ {1, 2}; both have 2 members (same size), but are not equal sets.'
        };
        setDemo('empty',options,(key,update)=>update(key,values[key]));
      }else if(stage.visual==='venn'){
        const controls=panel.querySelector('[data-demo-controls]');
        controls.innerHTML=btn(t.tryVenn,'go');
        controls.querySelector('button').addEventListener('click',()=>{
          let target=out.querySelector('[data-venn-lab]');
          if(!target){target=document.createElement('div');target.dataset.vennLab='';out.append(target);window.TriggleLab?.mount(target,chapter,lang);}
          target.scrollIntoView({behavior:'auto',block:'nearest'});
          target.setAttribute('tabindex','-1');
          target.focus({preventScroll:true});
        });
        panel.querySelector('[data-demo-output]').innerHTML=htmlMath({latex:'\\begin{gathered}A\\cap B=\\{3,5\\}\\\\A\\cup B=\\{1,2,3,4,5,6\\}\\end{gathered}',fallback:'A ∩ B = {3, 5}; A ∪ B = {1, 2, 3, 4, 5, 6}'});
      }else if(stage.visual==='properties'){
        const options=lang==='ta'
          ?[['பரிமாற்று','commutative'],['சேர்ப்பு','associative'],['பங்கீட்டு','distributive']]
          :[['Commutative','commutative'],['Associative','associative'],['Distributive','distributive']];
        const values={
          commutative:{"latex": "\\begin{aligned}A\\cup B&=B\\cup A\\\\&=\\{1,2,3\\}\\end{aligned}", "fallback": "A ∪ B = B ∪ A = {1, 2, 3}"},
          associative:{"latex": "\\begin{aligned}(A\\cup B)\\cup C&=A\\cup(B\\cup C)\\\\&=\\{1,2,3,4\\}\\end{aligned}", "fallback": "(A ∪ B) ∪ C = A ∪ (B ∪ C) = {1, 2, 3, 4}"},
          distributive:{"latex": "\\begin{aligned}A\\cap(B\\cup C)&=(A\\cap B)\\cup(A\\cap C)\\\\&=\\{2\\}\\end{aligned}", "fallback": "A ∩ (B ∪ C) = (A ∩ B) ∪ (A ∩ C) = {2}"}
        };
        setDemo('commutative',options,(key,update)=>update(key,values[key]));
      }else if(stage.visual==='demorgan'){
        const options=[[{latex:'(A\\cup B)^{\\prime}',fallback:'(A ∪ B)′'},'union'],[{latex:'(A\\cap B)^{\\prime}',fallback:'(A ∩ B)′'},'intersection']];
        const values={
          union:{"latex": "\\begin{aligned}(A\\cup B)^{\\prime}&=A^{\\prime}\\cap B^{\\prime}\\\\&=\\{5,6\\}\\end{aligned}", "fallback": "(A ∪ B)′ = A′ ∩ B′ = {5, 6}"},
          intersection:{"latex": "\\begin{aligned}(A\\cap B)^{\\prime}&=A^{\\prime}\\cup B^{\\prime}\\\\&=\\{1,2,4,5,6\\}\\end{aligned}", "fallback": "(A ∩ B)′ = A′ ∪ B′ = {1, 2, 4, 5, 6}"}
        };
        setDemo('union',options,(key,update)=>update(key,values[key]));
      }else if(stage.visual==='count'){
        const controls=panel.querySelector('[data-demo-controls]');
        const id='sp2-overlap-control';
        controls.innerHTML='<label class="sp2-range-label" for="'+id+'">'+esc(t.overlap)+
          ' <output data-overlap-count>6</output></label>'+
          '<p class="sp2-slider-guide">'+esc(t.sliderTip)+'</p>'+
           '<div class="sp2-slider-touch" role="group" aria-label="'+esc(t.count)+'">'+
           '<button type="button" data-overlap-decrease aria-label="'+esc(lang==='ta'?'பொதுவான எண்ணிக்கையை ஒன்று குறைக்கவும்':'Decrease common members by one')+'">−</button>'+
           '<input type="range" id="'+id+'" min="0" max="11" step="1" value="6" aria-label="'+esc(t.count)+'">'+
           '<button type="button" data-overlap-increase aria-label="'+esc(lang==='ta'?'பொதுவான எண்ணிக்கையை ஒன்று அதிகரிக்கவும்':'Increase common members by one')+'">+</button></div>'+
           '<p class="sp2-slider-formula" data-slider-formula aria-live="polite"></p>';
        const input=controls.querySelector('input');
        const decrease=controls.querySelector('[data-overlap-decrease]');
        const increase=controls.querySelector('[data-overlap-increase]');
        const update=()=>{
          const both=Number(input.value),union=25-both;
          controls.querySelector('[data-overlap-count]').textContent=String(both);
           controls.querySelector('[data-slider-formula]').innerHTML=htmlMath(t.sliderFormula(both,union,30-union));
           input.setAttribute('aria-valuetext',String(both)+' · '+t.overlap);
           decrease.disabled=both===0;
           increase.disabled=both===11;
          panel.querySelector('[data-demo-output]').innerHTML=
            '<span>'+esc(t.onlyA)+': <b>'+(14-both)+'</b></span>'+
            '<span>'+esc(t.overlap)+': <b>'+both+'</b></span>'+
            '<span>'+esc(t.onlyB)+': <b>'+(11-both)+'</b></span>'+
            '<span>'+esc(t.atleast)+': <b>'+union+'</b></span>'+
            '<span>'+esc(t.none)+': <b>'+(30-union)+'</b></span>';
        };
        input.addEventListener('input',update);
        decrease.addEventListener('click',()=>{input.value=String(Math.max(0,Number(input.value)-1));update();});
        increase.addEventListener('click',()=>{input.value=String(Math.min(11,Number(input.value)+1));update();});
        update();
      }
    }
    function extraPractice(stage){
      const item=book.extraPractice?.find(entry=>entry.stageId===stage.id);
      const holder=panel.querySelector('[data-extra-practice]');
      if(!holder||!item)return;
      const q=pick(item.question,lang);
      holder.innerHTML='<details class="sp2-paper sp2-extra"><summary>'+esc(t.extra)+'</summary>'+
        '<div class="sp2-recall"><p>'+htmlMath(q)+'</p>'+
        '<div class="sp2-answers" role="group" aria-label="'+esc(q)+'" data-extra-answers></div>'+
        '<div class="sp2-recall-actions"><button type="button" data-extra-hint>'+esc(t.hint)+'</button>'+
        '<button type="button" data-extra-why-button>'+esc(t.reason)+'</button></div>'+
        '<p data-extra-feedback role="status" aria-live="polite"></p>'+
        '<div class="sp2-why" data-extra-why hidden>'+htmlMath(pick(item.why,lang))+'</div></div></details>';
      const choices=holder.querySelector('[data-extra-answers]');
      item.choices.forEach((choice,i)=>{
        const button=document.createElement('button');
        button.type='button';button.dataset.extraChoice=String(i);button.innerHTML=htmlMath(pick(choice,lang));button.setAttribute('aria-label',plain(pick(choice,lang)));
        button.addEventListener('click',()=>{
          choices.querySelectorAll('button').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));
          holder.querySelector('[data-extra-feedback]').textContent=i===item.correct?t.correct:t.retry;
        });
        choices.append(button);
      });
      holder.querySelector('[data-extra-hint]').addEventListener('click',()=>{
        holder.querySelector('[data-extra-feedback]').textContent=pick(item.hint,lang);
      });
      holder.querySelector('[data-extra-why-button]').addEventListener('click',()=>{
        const target=holder.querySelector('[data-extra-why]');target.hidden=!target.hidden;
      });
    }
    function hard(){
      const data=book.hard,holder=panel.querySelector('[data-hard]');
      if(!holder)return;
      const details=document.createElement('details');
      details.className='sp2-hard';
      details.innerHTML='<summary>'+esc(t.deeper)+'</summary>'+
        '<p>'+htmlMath(pick(data.prompt,lang))+'</p>'+
        '<ol data-hard-steps></ol>'+
        '<button class="sp2-reveal" type="button" data-hard-next>'+esc(t.next)+'</button>'+
        '<p class="sp2-hard-done" aria-live="polite" data-hard-done></p>';
      let revealed=0;
      details.querySelector('[data-hard-next]').addEventListener('click',()=>{
        if(revealed>=data.steps.length)return;
        const li=document.createElement('li');
        li.innerHTML=htmlMath(pick(data.steps[revealed++],lang));
        details.querySelector('[data-hard-steps]').append(li);
        if(revealed===data.steps.length){
          details.querySelector('[data-hard-next]').hidden=true;
          details.querySelector('[data-hard-done]').textContent=t.finish;
        }
      });
      holder.append(details);
    }
    function show(index,focus=false){
      if(index<0||index>=book.stages.length)return;
      active=index;
      closePicker();
      try{sessionStorage.setItem(ACTIVE_STAGE,String(index));}catch{}
      const stage=book.stages[index];
      const demoTitle=({membership:t.membership,forms:t.forms,types:t.types,
        venn:t.tryVenn,properties:t.properties,demorgan:t.law,count:t.count})[stage.visual]||t.select;
      panel.innerHTML=
        '<div class="sp2-concept-heading" tabindex="-1">'+
         '<h4>'+esc((index+1)+'. '+pick(stage.title,lang))+'</h4></div>'+
        '<p class="sp2-idea">'+htmlMath(pick(stage.idea,lang))+'</p>'+
        '<p class="sp2-example">'+htmlMath(pick(stage.example,lang))+'</p>'+
        '<div class="sp2-formula" role="group" aria-label="Mathematics expression">'+htmlMath(stage.rule)+'</div>'+
        demoShell(demoTitle)+
        '<div class="sp2-recall"><h5>'+esc(t.try)+'</h5>'+
        '<p class="sp2-concept-question"><span class="sp2-question-label">'+esc(t.questionLabel)+'</span>'+htmlMath(pick(stage.question,lang))+'</p>'+
        '<div class="sp2-answers" data-answers role="group" aria-label="'+esc(pick(stage.question,lang))+'"></div>'+
        '<div class="sp2-recall-actions"><button type="button" data-hint>'+esc(t.hint)+
        '</button><button type="button" data-why-button>'+esc(t.why)+'</button></div>'+
        '<p data-feedback role="status" aria-live="polite"></p>'+
        '<div class="sp2-why" data-why hidden>'+htmlMath(pick(stage.why,lang))+'</div></div>'+
        '<details class="sp2-paper"><summary>✎ '+esc(t.paper)+'</summary>'+
        '<p>'+htmlMath(pick(stage.paper,lang))+'</p></details>'+
        '<div data-extra-practice></div>'+ (stage.id==='cardinality'?'<div data-hard></div>':'')+
        '<div class="sp2-stage-reference">'+esc(t.source)+' '+esc(stage.section)+
        ' · '+esc(t.enPage)+' '+stage.page.en+' · '+esc(t.taPage)+' '+stage.page.ta+'</div>';
      const answers=panel.querySelector('[data-answers]');
      let wrongAttempts=0;
      stage.choices.forEach((choice,i)=>{
        const button=document.createElement('button');
        button.type='button';button.dataset.choice=String(i);button.innerHTML=htmlMath(pick(choice,lang));button.setAttribute('aria-label',plain(pick(choice,lang)));
        button.addEventListener('click',()=>{
          answers.querySelectorAll('button').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));
          const good=i===stage.correct;
          if(good){panel.querySelector('[data-feedback]').textContent=t.correct;done.add(stage.id);save(done);updateProgress();}
          else{wrongAttempts++;const guidance=wrongAttempts===2?' '+pick(stage.hint,lang):wrongAttempts>=3?' '+pick(stage.why,lang):'';
            panel.querySelector('[data-feedback]').innerHTML=htmlMath(t.retry+guidance);}
        });
        answers.append(button);
      });
      panel.querySelector('[data-hint]').addEventListener('click',()=>{
        panel.querySelector('[data-feedback]').textContent=pick(stage.hint,lang);
      });
      panel.querySelector('[data-why-button]').addEventListener('click',()=>{
        const target=panel.querySelector('[data-why]');target.hidden=!target.hidden;
      });
      demo(stage);
      extraPractice(stage);
      if(stage.id==='cardinality')hard();
      updateProgress();
      if(focus){const selected=panel.querySelector('.sp2-concept-heading');selected?.scrollIntoView({behavior:'auto',block:'start'});selected?.focus({preventScroll:true});}
    }
    show(active);
    return true;
  }
  window.TriggleSetJourney=Object.freeze({mount});
})();