/* Triggle Phase 2 — seven short, original, textbook-aligned mini-lessons.
   No network, accounts, trackers or external API dependencies. */
(() => {
  'use strict';
  const book=window.TRIGGLE_SET_PATH;
  if(!book || book.chapterId!=='g9-ch1')return;
  const STORAGE='triggle.g9.set-path.v1';
  const pick=(v,l)=>typeof v==='string'?v:(v?.[l]||v?.en||'');
  const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const plain=s=>Array.isArray(s)?s.map(plain).join(''):typeof s==='object'?(s?.fallback||''):String(s??'');
  const htmlMath=s=>{s=window.TriggleG9Math?.text(s)??s;return window.TriggleNotation?.render(s)||esc(s);};
  const words={
    en:{label:'YOUR SHORT LEARNING PATH',title:'Build Set Language, one idea at a time',
      intro:'Seven short explorations follow the 2025 textbook. Choose one, try it, then practise on paper. You can stop whenever you understand.',
      state:'Ideas checked on this device',learned:'learned',source:'Textbook section',enPage:'English page',taPage:'Tamil page',
      select:'Pick an idea',try:'Try a quick check',understand:'Understand the idea',detective:'Rule Detective',hint:'One clue',why:'Why does this work?',
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
      previousIdea:'Previous idea',nextIdea:'Next idea',backConcepts:'Back to concepts',position:(n,total)=>'Idea '+n+' of '+total,
      navTip:'Choose one of seven numbered ideas. The question appears directly above its answers and scrolls naturally.',
       questionLabel:'CURRENT QUESTION',nextPage:'Next page',backChapter:'Back to Chapter 1',sliderTip:'Drag left or right (or use arrow keys) to change how many students are in BOTH groups. Tap − or + to change one student at a time. Watch the numbers and equation update.',sliderFormula:(both,union,neither)=>({
 union:{latex:'n(A\\cup B)=14+11-'+both+'='+union,fallback:'n(A ∪ B) = 14 + 11 − '+both+' = '+union},
 neither:{latex:'n((A\\cup B)^{\\prime})=30-'+union+'='+neither,fallback:'n((A ∪ B)′) = 30 − '+union+' = '+neither},
 note:'The overlap was counted twice, so subtract it once.'
})},
    ta:{label:'சிறிய கற்றல் பாதை',title:'கண மொழியை ஒவ்வொரு கருத்தாகக் கற்போம்',
      intro:'2025 பாடநூலை அடிப்படையாகக் கொண்ட ஏழு சிறு ஆராய்ச்சிகள். ஒன்றைத் தேர்ந்து முயலுங்கள்; பிறகு தாளில் பயிற்சி செய்யுங்கள்.',
      state:'இந்த சாதனத்தில் சரிபார்த்த கருத்துகள்',learned:'கற்றவை',source:'பாடநூல் பகுதி',enPage:'ஆங்கிலம் பக்கம்',taPage:'தமிழ் பக்கம்',
      select:'ஒரு கருத்தைத் தேர்ந்தெடுக்கவும்',try:'ஒரு சிறிய வினா',understand:'கருத்தைப் புரிந்துகொள்',detective:'விதியைக் கண்டறி',hint:'ஒரு குறிப்பு',why:'இது ஏன் சரி?',
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
      previousIdea:'முந்தைய கருத்து',nextIdea:'அடுத்த கருத்து',backConcepts:'கருத்துகளுக்குத் திரும்பு',position:(n,total)=>total+' இல் கருத்து '+n,
      navTip:'எண்ணிடப்பட்ட ஏழு கருத்துகளில் ஒன்றைத் தேர்ந்தெடுக்கவும். ஒவ்வொரு வினாவும் விடைத்தேர்வுகளுக்கு மேலே தோன்றும்; பக்கத்துடன் இயல்பாக நகரும்.',
       questionLabel:'தற்போதைய வினா',nextPage:'அடுத்த பக்கம்',backChapter:'அத்தியாயம் 1-க்குத் திரும்பு',sliderTip:'இரு குழுக்களிலும் உள்ள மாணவர்களின் எண்ணிக்கையை மாற்ற ஸ்லைடரை இடம் அல்லது வலமாக நகர்த்துங்கள் (அல்லது அம்பு விசைகளைப் பயன்படுத்துங்கள்). − அல்லது + பொத்தானைத் தொட்டு ஒரு மாணவராக மாற்றலாம். எண்ணிக்கையும் கணக்கும் மாறுவதைக் கவனியுங்கள்.',sliderFormula:(both,union,neither)=>({
 union:{latex:'n(A\\cup B)=14+11-'+both+'='+union,fallback:'n(A ∪ B) = 14 + 11 − '+both+' = '+union},
 neither:{latex:'n((A\\cup B)^{\\prime})=30-'+union+'='+neither,fallback:'n((A ∪ B)′) = 30 − '+union+' = '+neither},
 note:'பொதுவானவர்களை இருமுறை எண்ணியதால் ஒருமுறை கழிக்க வேண்டும்.'
})}
  };
  function load(){
    try{
      const value=JSON.parse(localStorage.getItem(STORAGE)||'[]');
      return new Set(Array.isArray(value)?value.filter(x=>book.stages.some(s=>s.id===x)):[]);
    }catch{return new Set();}
  }
  function save(done){try{localStorage.setItem(STORAGE,JSON.stringify([...done]))}catch{}}
  function mount(container,chapter,language,onBack,initialConcept=null,onConcept=null){
    if(!container||chapter?.id!=='g9-ch1')return false;
    const lang=language==='ta'?'ta':'en',t=words[lang],done=load();
    // Each visit to Concepts starts at an index. The URL's ?concept=N
    // alone selects a lesson, so browser navigation and language changes work.
    let active=-1;
    const root=document.createElement('section');
    root.className='sp2-journey';
    root.setAttribute('aria-label',t.select);
    root.innerHTML='<div class="sp2-index-view" data-index-view>'+
      '<p class="sp2-progress" role="status" aria-live="polite" data-progress></p>'+
      '<div class="sp2-nav" role="group" aria-label="'+esc(t.select)+'" data-nav></div>'+
      '<p class="sp2-private">'+esc(t.saved)+'</p></div>'+
      '<div class="sp2-detail-view" data-detail-view hidden>'+
      '<div class="sp2-detail-navigation">'+
      '<button type="button" class="sp2-back-index" data-back-index>'+esc('← '+t.backConcepts)+'</button>'+
      '<button type="button" class="sp2-top-next" data-top-next></button><span data-journey-index role="status" aria-live="polite"></span></div>'+
      '<div class="sp2-panel" data-panel></div>'+
      '<nav class="sp2-journey-footer" data-adaptive-dock aria-label="'+esc(t.select)+'">'+
      '<button type="button" class="sp2-footer-prev" data-footer-prev>'+esc('← '+t.previousIdea)+'</button>'+
      '<button type="button" class="sp2-footer-next" data-footer-next></button></nav></div>';
    container.append(root);
    const nav=root.querySelector('[data-nav]'),panel=root.querySelector('[data-panel]');
    const indexView=root.querySelector('[data-index-view]'),detailView=root.querySelector('[data-detail-view]');
    function showIndex(focus=false,notify=true){
      active=-1;
      root.dataset.view='index';
      indexView.hidden=false;
      detailView.hidden=true;
      updateProgress();
      if(notify&&typeof onConcept==='function')onConcept(null,true);
      if(focus){
        root.querySelector('[data-nav] button')?.focus({preventScroll:true});
        root.scrollIntoView({behavior:'auto',block:'start'});
      }
    }
    root.querySelector('[data-back-index]').addEventListener('click',()=>showIndex(true));
    function updateProgress(){
      root.querySelector('[data-progress]').textContent=done.size+' / '+book.stages.length+' '+t.learned;
      nav.querySelectorAll('button').forEach(button=>{
        const stage=book.stages[Number(button.dataset.index)];
        button.classList.toggle('sp2-done',done.has(stage.id));
        button.classList.toggle('sp2-current',active>=0&&Number(button.dataset.index)===active);
        button.setAttribute('aria-pressed',String(active>=0&&Number(button.dataset.index)===active));
        button.setAttribute('aria-current',active>=0&&Number(button.dataset.index)===active?'step':'false');
        button.querySelector('.sp2-done-mark').textContent=done.has(stage.id)?'✓':'';
      });
      if(active>=0)root.querySelector('[data-journey-index]').textContent=t.position(active+1,book.stages.length);
      root.querySelector('[data-footer-prev]').disabled=active===0;
       root.querySelector('[data-footer-next]').textContent=active===book.stages.length-1?t.backConcepts+' →':t.nextIdea+' →';
       root.querySelector('[data-footer-next]').classList.toggle('is-return',active===book.stages.length-1);
       const topNext=root.querySelector('[data-top-next]');
       topNext.textContent=root.querySelector('[data-footer-next]').textContent;
       topNext.classList.toggle('is-return',active===book.stages.length-1);
    }
    book.stages.forEach((stage,i)=>{
      const button=document.createElement('button');
      button.type='button';button.dataset.index=String(i);button.className='sp2-nav-button';
      button.innerHTML='<span class="sp2-nav-number">'+(i+1)+'</span><span class="sp2-nav-name">'+esc(pick(stage.title,lang))+'</span><span class="sp2-done-mark" aria-hidden="true"></span>';
      button.addEventListener('click',()=>show(i,true));
      nav.append(button);
    });
     root.querySelector('[data-footer-prev]').addEventListener('click',()=>show(active-1,true));
     for(const button of root.querySelectorAll('[data-footer-next], [data-top-next]'))button.addEventListener('click',()=>{
       if(active===book.stages.length-1){showIndex(true);return;}
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
        const options=[2,3,4,5,8].map(n=>[String(n),String(n)]);
        setDemo('2',options,(n,update)=>{
          const yes=[2,4,6,8].includes(Number(n));
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
        // AUD01-01: the lesson itself must contain a working, five-operation Venn
        // diagram. Do not rely on the optional full-size Phase 2 lab.
        const universe=[1,2,3,4,5,6,7],A=new Set([1,2,3,5]),B=new Set([3,4,5,6]);
        const controls=panel.querySelector('[data-demo-controls]');
        const operations=[
          {key:'union',latex:'A\\cup B',symbol:'A ∪ B',regions:['a','both','b'],has:n=>A.has(n)||B.has(n),
            en:'Union includes each member of A or B once.',ta:'சேர்ப்பு: A அல்லது B-இல் உள்ள உறுப்புகள் அனைத்தும் ஒருமுறை மட்டும்.'},
          {key:'intersection',latex:'A\\cap B',symbol:'A ∩ B',regions:['both'],has:n=>A.has(n)&&B.has(n),
            en:'Intersection keeps only the common members.',ta:'வெட்டு: இரண்டு கணங்களிலும் உள்ள பொதுவான உறுப்புகள் மட்டும்.'},
          {key:'difference',latex:'A\\setminus B',symbol:'A − B',regions:['a'],has:n=>A.has(n)&&!B.has(n),
            en:'Difference keeps members in A but not B.',ta:'வித்தியாசம்: A-இல் இருந்து B-இல் இல்லாத உறுப்புகள்.'},
          {key:'complement',latex:'A^{\\prime}',symbol:'A′',regions:['b','outside'],has:n=>!A.has(n),
            en:'The complement of A is everything in U that is not in A.',ta:'A-இன் நிரப்புக் கணம்: U-இல் இருந்து A-இல் இல்லாத உறுப்புகள்.'},
          {key:'symmetric',latex:'A\\triangle B',symbol:'A Δ B',regions:['a','b'],has:n=>A.has(n)!==B.has(n),
            en:'Symmetric difference keeps members in exactly one of the two sets.',ta:'சமச்சீர் வித்தியாசம்: இரண்டில் ஒன்றில் மட்டும் உள்ள உறுப்புகள்.'}
        ];
        controls.classList.add('sp2-venn-controls');
        controls.setAttribute('role','group');
        controls.setAttribute('aria-label',lang==='ta'?'கணச் செயல்பாடுகளைத் தேர்க':'Choose a set operation');
        controls.innerHTML=operations.map(op=>btn({latex:op.latex,fallback:op.symbol},op.key)).join('');
        const given='<div class="sp2-venn-defs"><p>'+
          htmlMath({latex:'U=\\{1,2,3,4,5,6,7\\}',fallback:'U = {1, 2, 3, 4, 5, 6, 7}'})+
          ' · '+htmlMath({latex:'A=\\{1,2,3,5\\}',fallback:'A = {1, 2, 3, 5}'})+
          ' · '+htmlMath({latex:'B=\\{3,4,5,6\\}',fallback:'B = {3, 4, 5, 6}'})+'</p>'+
          '<p>'+esc(lang==='ta'
            ?'U என்பது அனைத்துக் கணம். A′ என்பது U-இல் இருந்து A-இல் இல்லாத எண்கள்.'
            :'U is the universal set (all seven numbers). A′ means every number in U that is not in A.')+'</p></div>';
        controls.insertAdjacentHTML('beforebegin',given);
        const description=lang==='ta'
          ?'A மட்டும்: 1, 2. இரண்டிலும்: 3, 5. B மட்டும்: 4, 6. இரண்டிற்கும் வெளியே: 7.'
          :'A only: 1, 2. In both: 3, 5. B only: 4, 6. Outside both: 7.';
        const graphic=[
          '<svg class="sp2-venn-svg" viewBox="0 0 420 235" role="img" aria-labelledby="sp2-venn-title sp2-venn-desc">',
          '<title id="sp2-venn-title">'+esc(lang==='ta'?'இரு கணங்களின் வென் படம்':'Interactive two-set Venn diagram')+'</title>',
          '<desc id="sp2-venn-desc">'+esc(description)+'</desc>',
          '<defs>',
          '<mask id="sp2-venn-not-b" maskUnits="userSpaceOnUse"><rect width="420" height="235" fill="#fff"/><circle cx="238" cy="112" r="76" fill="#000"/></mask>',
          '<mask id="sp2-venn-not-a" maskUnits="userSpaceOnUse"><rect width="420" height="235" fill="#fff"/><circle cx="166" cy="112" r="76" fill="#000"/></mask>',
          '<mask id="sp2-venn-outside-mask" maskUnits="userSpaceOnUse"><rect width="420" height="235" fill="#fff"/><circle cx="166" cy="112" r="76" fill="#000"/><circle cx="238" cy="112" r="76" fill="#000"/></mask>',
          '<clipPath id="sp2-venn-clip-b"><circle cx="238" cy="112" r="76"/></clipPath>',
          '</defs>',
          '<rect x="10" y="13" width="400" height="208" rx="11" fill="#fbf9ff" stroke="#d6cde5" stroke-width="2"/>',
          '<rect data-venn-region="outside" x="10" y="13" width="400" height="208" rx="11" mask="url(#sp2-venn-outside-mask)" fill="#fbf9ff"/>',
          '<circle data-venn-region="a" cx="166" cy="112" r="76" mask="url(#sp2-venn-not-b)" fill="#fff"/>',
          '<circle data-venn-region="b" cx="238" cy="112" r="76" mask="url(#sp2-venn-not-a)" fill="#fff"/>',
          '<circle data-venn-region="both" cx="166" cy="112" r="76" clip-path="url(#sp2-venn-clip-b)" fill="#fff"/>',
          '<circle cx="166" cy="112" r="76" fill="none" stroke="#846cae" stroke-width="2.5"/>',
          '<circle cx="238" cy="112" r="76" fill="none" stroke="#479276" stroke-width="2.5"/>',
          '<g fill="#332b48" font-family="system-ui,sans-serif" font-size="16" text-anchor="middle">',
          '<text x="33" y="39" font-weight="750">U</text><text x="128" y="75" font-weight="750">A</text>',
          '<text x="278" y="75" font-weight="750">B</text><text x="123" y="120">1, 2</text>',
          '<text x="202" y="120" font-weight="750">3, 5</text><text x="281" y="120">4, 6</text>',
          '<text x="368" y="190">7</text></g></svg>'
        ].join('');
        controls.insertAdjacentHTML('afterend',graphic);
        out.querySelector('[data-demo-output]').insertAdjacentHTML(
          'afterend','<p class="sp2-venn-explain" data-venn-explain></p>');
        function chooseVenn(key){
          const op=operations.find(item=>item.key===key);
          if(!op)return;
          controls.querySelectorAll('button').forEach(button=>
            button.setAttribute('aria-pressed',String(button.dataset.demoMode===key)));
          out.querySelectorAll('[data-venn-region]').forEach(region=>{
            const selected=op.regions.includes(region.dataset.vennRegion);
            region.setAttribute('fill',selected?'#c4ecd9':(region.dataset.vennRegion==='outside'?'#fbf9ff':'#fff'));
          });
          const members=universe.filter(op.has);
          out.querySelector('[data-demo-output]').innerHTML=htmlMath({
            latex:op.latex+'=\\{'+members.join(',')+'\\}',
            fallback:op.symbol+' = {'+members.join(', ')+ '}'
          });
          out.querySelector('[data-venn-explain]').textContent=lang==='ta'?op.ta:op.en;
        }
        controls.querySelectorAll('button').forEach(button=>
          button.addEventListener('click',()=>chooseVenn(button.dataset.demoMode)));
        chooseVenn('intersection');
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
        controls.insertAdjacentHTML('beforebegin',
          '<div class="sp2-count-givens" role="group" aria-label="'+
          esc(lang==='ta'?'கொடுக்கப்பட்ட எண்ணிக்கைகள்':'Given set sizes')+'">'+
          ['n(U)=30','n(A)=14','n(B)=11'].map(expression=>
            '<span>'+htmlMath({latex:expression,fallback:expression})+'</span>').join('')+
          '</div>');
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
           const formula=t.sliderFormula(both,union,30-union);
          controls.querySelector('[data-slider-formula]').innerHTML=
            '<span class="sp2-count-equation">'+htmlMath(formula.union)+'</span>'+
            '<span class="sp2-count-equation">'+htmlMath(formula.neither)+'</span>'+
            '<span class="sp2-count-note">'+esc(formula.note)+'</span>';
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
    function show(index,focus=false,notify=true){
      if(index<0||index>=book.stages.length)return;
      active=index;
      root.dataset.view='lesson';
      indexView.hidden=true;
      detailView.hidden=false;
      if(notify&&typeof onConcept==='function')onConcept(index);
      const stage=book.stages[index];
      const demoTitle=({membership:t.membership,forms:t.forms,types:t.types,
        venn:(lang==='ta'?'வென் படத்தில் செயல்பாடுகளை ஆராய்க':'Explore the Venn diagram'),properties:t.properties,demorgan:t.law,count:t.count})[stage.visual]||t.select;
      // Keep the textbook rule unchanged; only its mobile presentation uses
      // aligned two-line KaTeX to avoid a clipped long equation.
      const visibleRule=stage.visual==='count'
        ? {latex:String.raw`\begin{aligned}n(A\cup B)&=n(A)+n(B)\\&\quad-n(A\cap B)\end{aligned}`,fallback:stage.rule}
        : stage.rule;
      const threeSetBridge=stage.visual==='count'
        ? '<div class="sp2-count-three-bridge">'+
          '<strong>'+esc(lang==='ta'?'மூன்று கணங்களைக் கணக்கிடுதல்':'Now count three sets')+'</strong>'+
          '<p>'+esc(lang==='ta'
            ?'மூன்று கணங்களின் எண்ணிக்கைகளைக் கூட்டி, இரண்டிரண்டு பொதுவான எண்ணிக்கைகளைக் கழித்து, மூன்றிலும் உள்ள எண்ணிக்கையை ஒருமுறை மீண்டும் சேர்க்கவும்.'
            :'Add the three set sizes, subtract each pairwise overlap, then add the triple overlap back once.')+'</p>'+
          '<div class="sp2-three-set-math" tabindex="0">'+htmlMath({
             latex:'\\begin{aligned}n(A\\cup B\\cup C)&=n(A)+n(B)+n(C)\\\\&\\quad-n(A\\cap B)-n(B\\cap C)\\\\&\\quad-n(A\\cap C)+n(A\\cap B\\cap C)\\end{aligned}',
             fallback:'n(A ∪ B ∪ C) = n(A) + n(B) + n(C) − n(A ∩ B) − n(B ∩ C) − n(A ∩ C) + n(A ∩ B ∩ C)'
           })+'</div></div>'
        : '';
      // Retain the underlying learning source while avoiding the old "11sum"
      // typography collision caused by compiling dense numeric prose.
      const whyContent=stage.visual==='count'
        ? (lang==='ta'
          ? ['குறைந்தது ஒரு விளையாட்டு: ',{latex:'14+11-6=19',fallback:'14 + 11 − 6 = 19'},'. எதுவுமில்லை: ',{latex:'30-19=11',fallback:'30 − 19 = 11'},'. சரிபார்ப்பு: ',{latex:'8+6+5+11=30',fallback:'8 + 6 + 5 + 11 = 30'},'.']
          : ['At least one game: ',{latex:'14+11-6=19',fallback:'14 + 11 − 6 = 19'},'. Neither game: ',{latex:'30-19=11',fallback:'30 − 19 = 11'},'. Check the four regions: ',{latex:'8+6+5+11=30',fallback:'8 + 6 + 5 + 11 = 30'},'.'])
        : pick(stage.why,lang);
      panel.innerHTML=
        '<div class="sp2-concept-heading" tabindex="-1">'+
         '<h4>'+esc((index+1)+'. '+pick(stage.title,lang))+'</h4></div>'+
        demoShell(demoTitle)+
        '<details class="sp2-explanation"><summary>'+esc(t.understand)+'</summary>'+
        '<div class="sp2-explanation-body">'+
        '<p class="sp2-idea">'+htmlMath(pick(stage.idea,lang))+'</p>'+
        '<p class="sp2-example">'+htmlMath(stage.visual==='venn'
          ?pick(stage.example,lang).replace(lang==='ta'?'கீழுள்ள வென் ஆய்வகத்தில் ஆராய்க.':'Explore these same sets in the interactive Venn lab below.',
            lang==='ta'?'மேலுள்ள வென் படத்தை ஆராய்க.':'Explore the Venn diagram above.')
          :pick(stage.example,lang))+'</p>'+
        '<div class="sp2-formula" role="group" aria-label="Mathematics expression">'+htmlMath(visibleRule)+'</div>'+threeSetBridge+'</div></details>'+
        '<div class="sp2-recall"><h5>'+esc(stage.visual==='membership'?t.detective:t.try)+'</h5>'+
        '<p class="sp2-concept-question"><span class="sp2-question-label">'+esc(t.questionLabel)+'</span>'+htmlMath(pick(stage.question,lang))+'</p>'+
        '<div class="sp2-answers" data-answers role="group" aria-label="'+esc(pick(stage.question,lang))+'"></div>'+
        '<div class="sp2-recall-actions"><button type="button" data-hint>'+esc(t.hint)+
        '</button><button type="button" data-why-button>'+esc(t.why)+'</button></div>'+
        '<p data-feedback role="status" aria-live="polite"></p>'+
        '<div class="sp2-why" data-why hidden>'+htmlMath(whyContent)+'</div></div>'+
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
      window.TriggleLivingConcepts?.decorate(stage,panel,lang,htmlMath);
      extraPractice(stage);
      if(stage.id==='cardinality')hard();
      updateProgress();
      if(focus){
        // Keep the single Back to concepts action visible when opening an idea.
        // Focus the mathematical heading without scrolling it over the Back button.
        root.scrollIntoView({behavior:'auto',block:'start'});
        panel.querySelector('.sp2-concept-heading')?.focus({preventScroll:true});
      }
    }
    if(Number.isInteger(initialConcept)&&initialConcept>=0&&initialConcept<book.stages.length)
      show(initialConcept,false,false);
    else showIndex(false,false);
    return true;
  }
  window.TriggleSetJourney=Object.freeze({mount});
})();