/* Triggle Discovery — tiny, accessible, bilingual home and class directory.
   Vanilla JavaScript by design: no build pipeline, subscription or network call. */
(() => {
  'use strict';
  const escapeHtml=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const words={
    en:{
      eyebrow:'WELCOME TO TRIGGLE',heading:'Maths should make sense.',
      desc:'Explore one idea, see why it works, and solve the next problem yourself. Mathematics for Classes 9–12, in English and Tamil.',
      start:'Start learning',continue:'Continue your question',discover:'Find a chapter',
      find:'Search by chapter or topic',findPlaceholder:'Try algebra, sets, கண மொழி...',
      quick:'Jump straight to a chapter',choose:'Choose a chapter…',
      classes:'Choose your class',class:'Class',chapter:'Chapter',
      mapped:'Chapters mapped',questions:'Existing questions',
      readytag:'Interactive mini-lessons available',planned:'Chapter mapped · More lessons coming',
      learn:'Understand one idea',explore:'Explore a visual',practice:'Try on paper',
      step1:'Short, clear explanations in your language.',
      step2:'Move a shape or number to understand the rule.',
      step3:'Use what you learnt away from the screen.',
      difference:'A simpler way to learn',access:'Free core learning · No sign-in · Offline after the first visit',
      featured:'Try the interactive Set Language lesson',
      featuredDesc:'Seven short ideas, a Venn-diagram lab, and step-by-step reasoning.',
      view:'Open chapter',empty:'No matching chapters. Try another word.',
      mathematics:'Mathematics',chapterCount:'chapters',
      yourClass:'Your class',pick:'Pick a chapter and start with what is available today.',
      back:'All classes',chooseClass:'Change class',allChapters:'All chapters in this class',
      tip:'You can always use the Chapters menu or the class numbers below.',
      status:'Curriculum mapped, full lessons being developed',
      continueLabel:'Your last opened question',noRecent:'No question opened yet. Choose your class to begin.',
      startHere:'A good place to start'
    },
    ta:{
      eyebrow:'டிரிகிளுக்கு நல்வரவு',heading:'கணிதம் எளிதாகப் புரியட்டும்.',
      desc:'ஒரு கருத்தை ஆராய்ந்து, அது ஏன் சரி என்பதைப் புரிந்து, அடுத்த கணக்கை நீங்களே செய்யுங்கள். 9–12 வகுப்புகளுக்கான ஆங்கில, தமிழ்வழிக் கணிதம்.',
      start:'கற்கத் தொடங்கு',continue:'முந்தைய வினாவைத் தொடர்க',discover:'அத்தியாயத்தைத் தேடுக',
      find:'அத்தியாயம் அல்லது தலைப்பைத் தேடுக',findPlaceholder:'இயற்கணிதம், கண மொழி, trigonometry...',
      quick:'நேராக அத்தியாயத்திற்குச் செல்ல',choose:'அத்தியாயத்தைத் தேர்ந்தெடுக்கவும்…',
      classes:'உங்கள் வகுப்பைத் தேர்ந்தெடுக்கவும்',class:'வகுப்பு',chapter:'அத்தியாயம்',
      mapped:'அத்தியாயங்கள் வரைபடமாக்கப்பட்டன',questions:'ஏற்கெனவே உள்ள வினாக்கள்',
      readytag:'சிறு செயல்வழிப் பாடங்கள் உள்ளன',planned:'அத்தியாயம் பட்டியலில் உள்ளது · பாடங்கள் உருவாகின்றன',
      learn:'ஒரு கருத்தைப் புரிந்துகொள்',explore:'காட்சியில் ஆராய்க',practice:'தாளில் முயல்க',
      step1:'உங்கள் மொழியில் தெளிவான சிறு விளக்கங்கள்.',
      step2:'ஒரு படம் அல்லது எண்ணை மாற்றி விதியை அறிக.',
      step3:'கைப்பேசியை வைத்துவிட்டு நீங்களே கணக்கிடுக.',
      difference:'கணிதம் கற்க எளிய வழி',access:'அடிப்படைக் கல்வி இலவசம் · கணக்கு தேவையில்லை · முதல் வருகைக்குப் பின் இணையமின்றி இயங்கும்',
      featured:'செயல்வழிக் கண மொழிப் பாடத்தை முயலுங்கள்',
      featuredDesc:'ஏழு சிறு கருத்துகள், வென் பட ஆய்வகம், படிப்படியான காரண விளக்கம்.',
      view:'அத்தியாயத்தைத் திறக்கவும்',empty:'பொருந்தும் அத்தியாயம் இல்லை. வேறு சொல்லை முயலுங்கள்.',
      mathematics:'கணிதம்',chapterCount:'அத்தியாயங்கள்',
      yourClass:'உங்கள் வகுப்பு',pick:'இப்போது கிடைக்கும் பாடங்களிலிருந்து கற்க ஒரு அத்தியாயத்தைத் தேர்ந்தெடுக்கவும்.',
      back:'அனைத்து வகுப்புகள்',chooseClass:'வகுப்பை மாற்றுக',allChapters:'இந்த வகுப்பின் எல்லா அத்தியாயங்களும்',
      tip:'மேலுள்ள அத்தியாயப் பட்டியலையோ கீழுள்ள வகுப்பு எண்களையோ எப்போதும் பயன்படுத்தலாம்.',
      status:'அத்தியாயப் பட்டியல் தயார்; முழுப் பாடங்கள் உருவாக்கப்படுகின்றன',
      continueLabel:'கடைசியாகத் திறந்த வினா',noRecent:'இதுவரை எந்த வினாவும் திறக்கப்படவில்லை. தொடங்க உங்கள் வகுப்பைத் தேர்ந்தெடுக்கவும்.',
      startHere:'இங்கே தொடங்கலாம்'
    }
  };
  function mount(root,opts){
    if(!root)return;
    const {mode,grade,lang,curriculum,classes,lastByGrade,lastOpened,openGrade,openChapter,openQuestion,goHome}=opts;
    const t=words[lang==='ta'?'ta':'en'];
    const tr=x=>typeof x==='string'?x:(x?.[lang]||x?.en||'');
    const grades=curriculum.grades;
    const chapters=grades.flatMap(g=>g.chapters.map(c=>({grade:g.grade,chapter:c})));
    // Only advertise a lab when both its lesson data and interactive viewer are loaded.
    const interactiveCount=id=>{
      const stages=id==='g9-ch1'&&window.TriggleSetJourney?window.TRIGGLE_SET_PATH?.stages:
        id==='g9-ch2'&&window.TriggleRealJourney?window.TRIGGLE_REAL_PATH?.stages:null;
      return Array.isArray(stages)?stages.length:0;
    };
    function chapterCard(entry){
      const c=entry.chapter,count=interactiveCount(c.id),available=count>0;
      return '<button type="button" class="discover-chapter" data-chapter="'+escapeHtml(c.id)+'">'+
        '<span class="discover-chapter-number">'+escapeHtml(t.chapter)+' '+c.number+'</span>'+
        '<strong>'+escapeHtml(tr(c.title))+'</strong>'+
        '<span class="discover-chapter-meta'+(available?' is-ready':'')+'">'+
        (available?'✦ '+count+' '+escapeHtml(t.readytag):escapeHtml(t.planned))+'</span>'+
        '<span class="discover-card-arrow" aria-hidden="true">↗</span></button>';
    }
    function jumpOptions(selectedGrade){
      return '<option value="">'+escapeHtml(t.choose)+'</option>'+grades.filter(g=>!selectedGrade||selectedGrade===g.grade)
        .map(g=>'<optgroup label="'+escapeHtml(t.class)+' '+g.grade+'">'+g.chapters.map(c=>
          '<option value="'+escapeHtml(c.id)+'">'+escapeHtml(t.chapter)+' '+c.number+' · '+escapeHtml(tr(c.title))+'</option>'
        ).join('')+'</optgroup>').join('');
    }
    function gradeCard(g){
      const n=g.chapters.length;
      return '<button type="button" data-grade="'+g.grade+'" class="discover-grade discover-grade-'+g.grade+'">'+
        '<span class="discover-grade-number">'+g.grade+'</span><span class="discover-grade-copy"><b>'+escapeHtml(t.class)+' '+g.grade+'</b></span>'+
        '<span class="discover-grade-arrow" aria-hidden="true">→</span></button>';
    }
    let body='';
    if(mode==='home'){
      // Resume the most recently opened question, not the lowest class number.
      // For existing students, fall back to their previous per-class saved ID.
      const lastGrade=lastOpened&&Number(lastOpened.grade);
      const lastItem=lastGrade&&classes[lastGrade]?.items.find(x=>x.id===lastOpened.questionId);
      const legacy=Object.entries(lastByGrade||{})
        .map(([g,id])=>({grade:Number(g),item:classes[g]?.items.find(x=>x.id===id)}))
        .find(x=>x.item&&x.grade>=9&&x.grade<=12);
      const recent=lastItem?{grade:lastGrade,item:lastItem}:legacy;
      const recentCard=recent
        ?'<button type="button" class="discover-resume-card" data-question="'+escapeHtml(recent.item.id)+
          '" data-question-grade="'+recent.grade+'">'+
          '<span class="discover-resume-name">'+escapeHtml(t.class)+' '+recent.grade+' · '+
          escapeHtml(tr(recent.item.label))+'</span>'+
          '<span class="discover-resume-action">'+escapeHtml(t.continue)+' <span aria-hidden="true">→</span></span></button>'
        :'<p class="discover-no-recent">'+escapeHtml(t.noRecent)+'</p>';
      body='<div class="discover-home-minimal">'+
        '<section class="discover-home-recent" aria-labelledby="discover-recent-title">'+
        '<h1 id="discover-recent-title">'+escapeHtml(t.continueLabel)+'</h1>'+recentCard+'</section>'+
        '<section class="discover-home-classes" aria-labelledby="discover-classes-title">'+
        '<h2 id="discover-classes-title">'+escapeHtml(t.classes)+'</h2>'+
        '<div class="discover-grade-grid">'+grades.map(gradeCard).join('')+'</div></section>'+
        '</div>';
    }else{
      const g=grades.find(x=>x.grade===grade)||grades[0];
      // Chapter-first directory: a single compact, interactive heading followed
      // immediately by Chapter 1. Class switching expands in document flow.
      body='<header class="discover-class-header">'+
        '<h1><button type="button" class="discover-class-switch" data-switch-class aria-controls="discover-class-options" aria-expanded="false" aria-label="'+escapeHtml(t.chooseClass)+'">'+
        escapeHtml(t.class)+' '+g.grade+' '+escapeHtml(t.mathematics)+' <span aria-hidden="true">⌄</span></button></h1>'+
        '<span class="discover-class-count">'+g.chapters.length+' '+escapeHtml(t.chapterCount)+'</span></header>'+
        '<div id="discover-class-options" class="discover-class-options" role="group" aria-label="'+escapeHtml(t.chooseClass)+'" hidden>'+
        grades.map(option=>'<button type="button" class="discover-class-option'+(option.grade===g.grade?' is-current':'')+'" data-grade="'+option.grade+'" aria-pressed="'+(option.grade===g.grade)+'">'+escapeHtml(t.class)+' '+option.grade+'</button>').join('')+'</div>'+
        '<section class="discover-directory-list" aria-label="'+escapeHtml(t.allChapters)+'">'+
        '<div class="discover-chapter-grid" data-chapter-grid>'+g.chapters.map(c=>chapterCard({grade:g.grade,chapter:c})).join('')+'</div></section>'+
        '<section class="discover-section discover-find"><label for="discover-search">'+escapeHtml(t.find)+'</label>'+
        '<input id="discover-search" data-search type="search" autocomplete="off" enterkeyhint="search" placeholder="'+escapeHtml(t.findPlaceholder)+'">'+
        '<p class="discover-filter-status" data-filter-status role="status"></p>'+
        '<label for="discover-jump">'+escapeHtml(t.quick)+'</label>'+
        '<select id="discover-jump" data-jump>'+jumpOptions(g.grade)+'</select></section>';
    }
    root.innerHTML=body;
    const switchClass=root.querySelector('[data-switch-class]');
    const classOptions=root.querySelector('#discover-class-options');
    if(switchClass&&classOptions){
      const closeClassOptions=()=>{
        classOptions.hidden=true;
        switchClass.setAttribute('aria-expanded','false');
      };
      switchClass.addEventListener('click',()=>{
        const open=classOptions.hidden;
        classOptions.hidden=!open;
        switchClass.setAttribute('aria-expanded',String(open));
      });
      classOptions.addEventListener('keydown',event=>{
        if(event.key==='Escape'){event.preventDefault();closeClassOptions();switchClass.focus();}
      });
      switchClass.addEventListener('keydown',event=>{
        if(event.key==='Escape'&&!classOptions.hidden){event.preventDefault();closeClassOptions();}
      });
    }
    root.querySelectorAll('[data-grade]').forEach(btn=>btn.addEventListener('click',()=>openGrade(Number(btn.dataset.grade))));
    root.querySelectorAll('[data-home]').forEach(btn=>btn.addEventListener('click',goHome));
    root.querySelectorAll('[data-chapter]').forEach(btn=>btn.addEventListener('click',()=>{
      const id=btn.dataset.chapter;
      const entry=chapters.find(x=>x.chapter.id===id);
      if(entry)openChapter(entry.grade,entry.chapter);
    }));
    root.querySelectorAll('[data-question]').forEach(btn=>btn.addEventListener('click',()=>{
      const g=Number(btn.dataset.questionGrade),item=classes[g]?.items.find(x=>x.id===btn.dataset.question);
      if(item)openQuestion(g,item);
    }));
    root.querySelector('[data-jump]')?.addEventListener('change',e=>{
      const entry=chapters.find(x=>x.chapter.id===e.target.value);
      if(entry)openChapter(entry.grade,entry.chapter);
    });
    const search=root.querySelector('[data-search]');
    if(search)search.addEventListener('input',()=>{
      const query=search.value.trim().toLocaleLowerCase(),items=chapters.filter(x=>
        (mode==='home'||x.grade===grade)&&[x.chapter.title.en,x.chapter.title.ta,x.chapter.number,String(x.grade),t.class+' '+x.grade].join(' ').toLocaleLowerCase().includes(query)
      );
      if(mode==='home'){
        const results=root.querySelector('[data-results]');
        results.hidden=!query;
        if(!query){results.replaceChildren();return;}
        results.innerHTML=items.slice(0,10).map(x=>chapterCard(x)).join('')||'<p class="discover-empty">'+escapeHtml(t.empty)+'</p>';
        results.querySelectorAll('[data-chapter]').forEach(b=>b.addEventListener('click',()=>{
          const entry=items.find(x=>x.chapter.id===b.dataset.chapter);
          if(entry)openChapter(entry.grade,entry.chapter);
        }));
      }else{
        root.querySelectorAll('[data-chapter-grid] [data-chapter]').forEach(b=>{b.hidden=!items.some(x=>x.chapter.id===b.dataset.chapter);});
        root.querySelector('[data-filter-status]').textContent=items.length+' / '+grades.find(x=>x.grade===grade).chapters.length;
      }
    });
  }
  window.TriggleDiscovery=Object.freeze({mount});
})();