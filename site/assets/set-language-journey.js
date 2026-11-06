/* Triggle Phase 2 — seven short, original, textbook-aligned mini-lessons.
   No network, accounts, trackers or external API dependencies. */
(() => {
  'use strict';
  const book=window.TRIGGLE_SET_PATH;
  if(!book || book.chapterId!=='g9-ch1')return;
  const STORAGE='triggle.g9.set-path.v1';
  const pick=(v,l)=>typeof v==='string'?v:(v?.[l]||v?.en||'');
  const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const htmlMath=s=>window.TriggleNotation?.render(s)||esc(s);
  const words={
    en:{label:'YOUR SHORT LEARNING PATH',title:'Build Set Language, one idea at a time',
      intro:'Seven short explorations follow the 2025 textbook. Choose one, try it, then practise on paper. You can stop whenever you understand.',
      state:'Ideas checked on this device',source:'Textbook section',enPage:'English page',taPage:'Tamil page',
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
      top:'Back to learning path'},
    ta:{label:'சிறிய கற்றல் பாதை',title:'கண மொழியை ஒவ்வொரு கருத்தாகக் கற்போம்',
      intro:'2025 பாடநூலை அடிப்படையாகக் கொண்ட ஏழு சிறு ஆராய்ச்சிகள். ஒன்றைத் தேர்ந்து முயலுங்கள்; பிறகு தாளில் பயிற்சி செய்யுங்கள்.',
      state:'இந்த சாதனத்தில் சரிபார்த்த கருத்துகள்',source:'பாடநூல் பகுதி',enPage:'ஆங்கிலம் பக்கம்',taPage:'தமிழ் பக்கம்',
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
      top:'கற்றல் பாதைக்குத் திரும்புக'}
  };
  function load(){
    try{
      const value=JSON.parse(localStorage.getItem(STORAGE)||'[]');
      return new Set(Array.isArray(value)?value.filter(x=>book.stages.some(s=>s.id===x)):[]);
    }catch{return new Set();}
  }
  function save(done){try{localStorage.setItem(STORAGE,JSON.stringify([...done]))}catch{}}
  function mount(container,chapter,language){
    if(!container||chapter?.id!=='g9-ch1')return false;
    const lang=language==='ta'?'ta':'en',t=words[lang],done=load();
    let active=0;
    const root=document.createElement('section');
    root.className='sp2-journey';
    root.setAttribute('aria-label',t.title);
    root.innerHTML='<div class="sp2-kicker">'+esc(t.label)+'</div>'+
      '<h3>'+esc(t.title)+'</h3><p class="sp2-intro">'+esc(t.intro)+'</p>'+
      '<p class="sp2-progress" role="status" aria-live="polite" data-progress></p>'+
      '<div class="sp2-nav" role="group" aria-label="'+esc(t.select)+'" data-nav></div>'+
      '<div class="sp2-panel" data-panel></div>'+
      '<p class="sp2-private">'+esc(t.saved)+'</p>';
    container.append(root);
    const nav=root.querySelector('[data-nav]'),panel=root.querySelector('[data-panel]');
    function updateProgress(){
      root.querySelector('[data-progress]').textContent=t.state+': '+done.size+' / '+book.stages.length;
      nav.querySelectorAll('button').forEach(button=>{
        const stage=book.stages[Number(button.dataset.index)];
        button.classList.toggle('sp2-done',done.has(stage.id));
        button.classList.toggle('sp2-current',Number(button.dataset.index)===active);
        button.setAttribute('aria-pressed',String(Number(button.dataset.index)===active));
        button.querySelector('.sp2-done-mark').textContent=done.has(stage.id)?'✓':'';
      });
    }
    book.stages.forEach((stage,i)=>{
      const button=document.createElement('button');
      button.type='button';button.dataset.index=String(i);button.className='sp2-nav-button';
      button.innerHTML='<span class="sp2-nav-number">'+(i+1)+'</span><span class="sp2-nav-name">'+esc(pick(stage.title,lang))+'</span><span class="sp2-done-mark" aria-hidden="true"></span>';
      button.addEventListener('click',()=>show(i));
      nav.append(button);
    });
    function demoShell(title){return '<div class="sp2-demo" data-demo><p class="sp2-demo-title">'+esc(title)+'</p><div class="sp2-demo-controls" data-demo-controls></div><p class="sp2-demo-output" data-demo-output role="status" aria-live="polite"></p></div>';}
    function btn(name,key){return '<button type="button" data-demo-mode="'+esc(key)+'">'+esc(name)+'</button>';}
    function setDemo(state,options,paint){
      const controls=panel.querySelector('[data-demo-controls]');
      controls.innerHTML=options.map(([name,key])=>btn(name,key)).join('');
      controls.querySelectorAll('button').forEach(button=>button.addEventListener('click',()=>paint(button.dataset.demoMode)));
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
          update(n,n+(yes?' ∈ A':' ∉ A')+(lang==='ta'?(yes?' · உறுப்பு':' · உறுப்பு அல்ல'):(yes?' · belongs':' · does not belong')));
        });
      }else if(stage.visual==='forms'){
        const options=lang==='ta'
          ?[['விவரித்தல்','description'],['பட்டியல்','roster'],['விதி','builder']]
          :[['Words','description'],['Listing','roster'],['Rule','builder']];
        const forms={
          description:lang==='ta'?'10-ஐ விடச் சிறிய நேர்ம இரட்டைப்படை முழு எண்களின் கணம்':'Positive even whole numbers less than 10',
          roster:'E = {2, 4, 6, 8}',
          builder:'E = {x ∈ N : x < 10, x is even}'
        };
        setDemo('roster',options,(key,update)=>update(key,forms[key]));
      }else if(stage.visual==='types'){
        const options=lang==='ta'
          ?[['வெற்று','empty'],['ஓருறுப்பு','single'],['முடிவுறு','finite'],['முடிவுறா','infinite'],['உட்கணம்','subset'],['சம / சமான','equivalent']]
          :[['Empty','empty'],['Singleton','single'],['Finite','finite'],['Infinite','infinite'],['Subset','subset'],['Equal vs same size','equivalent']];
        const values={
          empty:'∅ = {} ; n(∅) = 0',
          single:'{7} ; n({7}) = 1',
          finite:'{1, 2, 3} ; n(A) = 3',
          infinite:'N = {1, 2, 3, …}',
          subset:'{1, 3} ⊂ {1, 2, 3} ; {1, 2, 3} ⊆ {1, 2, 3}',
          equivalent:lang==='ta'
            ?'{a, b} ≠ {1, 2}; ஆதி எண் இரண்டிலும் 2. சமமான கணங்கள்; சம கணங்கள் அல்ல.'
            :'{a, b} ≠ {1, 2}; both have 2 members (same size), but are not equal sets.'
        };
        setDemo('empty',options,(key,update)=>update(key,values[key]));
      }else if(stage.visual==='venn'){
        const controls=panel.querySelector('[data-demo-controls]');
        controls.innerHTML=btn(t.tryVenn,'go');
        controls.querySelector('button').addEventListener('click',()=>{
          const target=document.querySelector('.p2-lab');
          if(!target)return;
          target.scrollIntoView({behavior:'instant',block:'start'});
          target.setAttribute('tabindex','-1');
          target.focus({preventScroll:true});
        });
        panel.querySelector('[data-demo-output]').textContent=
          lang==='ta'?'A ∩ B = {3, 5}; A ∪ B = {1, 2, 3, 4, 5, 6}':
          'A ∩ B = {3, 5}; A ∪ B = {1, 2, 3, 4, 5, 6}';
      }else if(stage.visual==='properties'){
        const options=lang==='ta'
          ?[['பரிமாற்று','commutative'],['சேர்ப்பு','associative'],['பங்கீட்டு','distributive']]
          :[['Commutative','commutative'],['Associative','associative'],['Distributive','distributive']];
        const values={
          commutative:'A ∪ B = B ∪ A = {1, 2, 3}',
          associative:'(A ∪ B) ∪ C = A ∪ (B ∪ C) = {1, 2, 3, 4}',
          distributive:'A ∩ (B ∪ C) = (A ∩ B) ∪ (A ∩ C) = {2}'
        };
        setDemo('commutative',options,(key,update)=>update(key,values[key]));
      }else if(stage.visual==='demorgan'){
        const options=[['(A ∪ B)′','union'],['(A ∩ B)′','intersection']];
        const values={
          union:'(A ∪ B)′ = A′ ∩ B′ = {5, 6}',
          intersection:'(A ∩ B)′ = A′ ∪ B′ = {1, 2, 4, 5, 6}'
        };
        setDemo('union',options,(key,update)=>update(key,values[key]));
      }else if(stage.visual==='count'){
        const controls=panel.querySelector('[data-demo-controls]');
        const id='sp2-overlap-control';
        controls.innerHTML='<label class="sp2-range-label" for="'+id+'">'+esc(t.overlap)+
          ' <output data-overlap-count>6</output></label>'+
          '<input type="range" id="'+id+'" min="0" max="11" step="1" value="6" aria-label="'+esc(t.count)+'">';
        const input=controls.querySelector('input');
        const update=()=>{
          const both=Number(input.value),union=25-both;
          controls.querySelector('[data-overlap-count]').textContent=String(both);
          panel.querySelector('[data-demo-output]').innerHTML=
            '<span>'+esc(t.onlyA)+': <b>'+(14-both)+'</b></span>'+
            '<span>'+esc(t.overlap)+': <b>'+both+'</b></span>'+
            '<span>'+esc(t.onlyB)+': <b>'+(11-both)+'</b></span>'+
            '<span>'+esc(t.atleast)+': <b>'+union+'</b></span>'+
            '<span>'+esc(t.none)+': <b>'+(30-union)+'</b></span>';
        };
        input.addEventListener('input',update);update();
      }
    }
    function hard(){
      const data=book.hard,holder=panel.querySelector('[data-hard]');
      if(!holder)return;
      const details=document.createElement('details');
      details.className='sp2-hard';
      details.innerHTML='<summary>'+esc(t.deeper)+'</summary>'+
        '<p>'+esc(pick(data.prompt,lang))+'</p>'+
        '<ol data-hard-steps></ol>'+
        '<button class="sp2-reveal" type="button" data-hard-next>'+esc(t.next)+'</button>'+
        '<p class="sp2-hard-done" aria-live="polite" data-hard-done></p>';
      let revealed=0;
      details.querySelector('[data-hard-next]').addEventListener('click',()=>{
        if(revealed>=data.steps.length)return;
        const li=document.createElement('li');
        li.textContent=pick(data.steps[revealed++],lang);
        details.querySelector('[data-hard-steps]').append(li);
        if(revealed===data.steps.length){
          details.querySelector('[data-hard-next]').hidden=true;
          details.querySelector('[data-hard-done]').textContent=t.finish;
        }
      });
      holder.append(details);
    }
    function show(index){
      if(index<0||index>=book.stages.length)return;
      active=index;
      const stage=book.stages[index];
      const demoTitle=({membership:t.membership,forms:t.forms,types:t.types,
        venn:t.tryVenn,properties:t.properties,demorgan:t.law,count:t.count})[stage.visual]||t.select;
      panel.innerHTML=
        '<div class="sp2-stage-reference">'+esc(t.source)+' '+esc(stage.section)+
        ' · '+esc(t.enPage)+' '+stage.page.en+' · '+esc(t.taPage)+' '+stage.page.ta+'</div>'+
        '<h4>'+esc(pick(stage.title,lang))+'</h4>'+
        '<p class="sp2-idea">'+esc(pick(stage.idea,lang))+'</p>'+
        '<p class="sp2-example">'+esc(pick(stage.example,lang))+'</p>'+
        '<div class="sp2-formula" aria-label="Mathematics expression">'+htmlMath(stage.rule)+'</div>'+
        demoShell(demoTitle)+
        '<div class="sp2-recall"><h5>'+esc(t.try)+'</h5><p>'+esc(pick(stage.question,lang))+'</p>'+
        '<div class="sp2-answers" data-answers role="group" aria-label="'+esc(pick(stage.question,lang))+'"></div>'+
        '<div class="sp2-recall-actions"><button type="button" data-hint>'+esc(t.hint)+
        '</button><button type="button" data-why-button>'+esc(t.why)+'</button></div>'+
        '<p data-feedback role="status" aria-live="polite"></p>'+
        '<div class="sp2-why" data-why hidden>'+esc(pick(stage.why,lang))+'</div></div>'+
        '<details class="sp2-paper"><summary>✎ '+esc(t.paper)+'</summary>'+
        '<p>'+esc(pick(stage.paper,lang))+'</p></details>'+
        (stage.id==='cardinality'?'<div data-hard></div>':'');
      const answers=panel.querySelector('[data-answers]');
      stage.choices.forEach((choice,i)=>{
        const button=document.createElement('button');
        button.type='button';button.dataset.choice=String(i);button.textContent=pick(choice,lang);
        button.addEventListener('click',()=>{
          answers.querySelectorAll('button').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));
          const good=i===stage.correct;
          panel.querySelector('[data-feedback]').textContent=good?t.correct:t.retry;
          if(good){done.add(stage.id);save(done);updateProgress();}
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
      if(stage.id==='cardinality')hard();
      updateProgress();
    }
    show(0);
    return true;
  }
  window.TriggleSetJourney=Object.freeze({mount});
})();