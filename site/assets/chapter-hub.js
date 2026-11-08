/* Triggle chapter hub: choose what to study BEFORE opening long lesson content.
   Local, bilingual, zero runtime dependencies; existing question IDs are preserved. */
(() => {
  'use strict';
  const e=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const texts={
    en:{
      eyebrow:'YOUR CHAPTER',choose:'What would you like to do?',
      intro:'Choose one section. You can come back here whenever you want.',
      concepts:'Concepts',examples:'Worked Examples',exercises:'Exercises',quizzes:'Quizzes',
      conceptsHint:'Learn ideas with short, interactive explanations',
      examplesHint:'Study questions solved step by step',
      exercisesHint:'Go straight to available questions and solutions',
      quizzesHint:'Check what you remember',
      available:'available',soon:'More coming',checks:'quick checks',questions:'questions',worked:'examples',
      back:'All chapter options',classBack:'All chapters',home:'Home',
      resources:'Textbook references and chapter information',navigate:'Jump to a section',choosePrompt:'Choose a section…',
      learning:'Explore the concepts',noneConcept:'Concept lessons for this chapter are coming soon. There is no concept activity here yet.',
      practiceInstead:'You can still explore questions with complete step-by-step solutions in Exercises.',
      noneWorked:'No questions in this chapter are explicitly labelled worked examples yet.',
      whyWorked:'Textbook exercises with worked solutions remain under Exercises so they are easy to find without misleading labels.',
      seeExercises:'See available exercises',noneExercises:'Exercise questions are not available here yet. We are adding them chapter by chapter.',
      practiceNote:'Every existing question here opens its worked solution and optional deeper explanation.',
      official:'Book-referenced exercises',original:'Original Triggle practice',all:'All questions',
      sourceCaution:'These references include archived editions. Confirm question numbering against your prescribed textbook.',
      quizIntro:'Short concept checks for practice, not an official textbook chapter exam. Try answering before asking for a hint.',
      noQuiz:'Quizzes for this chapter are coming soon. There are no quiz questions here yet.',
      correct:'Correct! You can try explaining why on paper.',incorrect:'Not quite. Try the clue and answer again.',
      hint:'Show a hint',reveal:'Why?',progress:'Checks answered correctly',tryPaper:'Try the full concept lesson',
      navigation:'Chapter sections',review:'Editorial review',sources:'Source books',
      sectionStatus:'Chapter under development · content shown below is available now.',
      returnHelp:'Use the chapter menu to switch between Concepts, Worked Examples, Exercises and Quizzes.',
      selectQuestion:'Choose an exercise',group:'Exercise group',jumpConcept:'Open a concept',lab:'Venn diagram lab',
      existingExamples:'Some worked examples are available',noPublished:'Complete chapter review is still pending'
    },
    ta:{
      eyebrow:'உங்கள் அத்தியாயம்',choose:'நீங்கள் எதைக் கற்க விரும்புகிறீர்கள்?',
      intro:'ஒரு பகுதியைத் தேர்ந்தெடுக்கவும். எப்போது வேண்டுமானாலும் இங்கு திரும்பலாம்.',
      concepts:'கருத்துகள்',examples:'தீர்க்கப்பட்ட எடுத்துக்காட்டுகள்',exercises:'பயிற்சிகள்',quizzes:'சிறு தேர்வுகள்',
      conceptsHint:'சிறு விளக்கங்களுடன் செயல்வழியாகக் கற்றுக்கொள்ளுங்கள்',
      examplesHint:'படிப்படியாகத் தீர்க்கப்பட்ட வினாக்களைப் பாருங்கள்',
      exercisesHint:'வினாக்களையும் தீர்வுகளையும் நேராக அணுகுங்கள்',
      quizzesHint:'நினைவில் உள்ளதைச் சரிபாருங்கள்',
      available:'கிடைக்கிறது',soon:'மேலும் உருவாகின்றன',checks:'சிறு வினாக்கள்',questions:'வினாக்கள்',worked:'எடுத்துக்காட்டுகள்',
      back:'அத்தியாயத் தேர்வுகள்',classBack:'அனைத்து அத்தியாயங்களும்',home:'முகப்பு',
      resources:'பாடநூல் குறிப்புகள் மற்றும் அத்தியாய விவரம்',navigate:'பகுதிக்குச் செல்லுங்கள்',choosePrompt:'ஒரு பகுதியைத் தேர்ந்தெடுக்கவும்…',
      learning:'கருத்துகளை ஆராயுங்கள்',noneConcept:'இந்த அத்தியாயத்திற்கான கருத்துப் பாடங்கள் உருவாக்கப்படுகின்றன. இங்கு இன்னும் செயல்வழிப் பாடங்கள் இல்லை.',
      practiceInstead:'பயிற்சிகள் பகுதியில் உள்ள வினாக்களின் படிப்படியான தீர்வுகளைப் பயன்படுத்தலாம்.',
      noneWorked:'இந்த அத்தியாயத்தில் எடுத்துக்காட்டு எனத் தனியாகக் குறிக்கப்பட்ட வினாக்கள் இன்னும் இல்லை.',
      whyWorked:'தீர்வுள்ள பாடநூல் பயிற்சிகள் «பயிற்சிகள்» பகுதியில் சரியான பெயருடன் இடம்பெறுகின்றன.',
      seeExercises:'பயிற்சிகளுக்குச் செல்லுங்கள்',noneExercises:'இந்த அத்தியாயத்தின் பயிற்சி வினாக்கள் இன்னும் சேர்க்கப்படுகின்றன.',
      practiceNote:'இங்கே உள்ள வினாவைத் திறந்தால் தீர்வையும் கூடுதல் விளக்கத்தையும் காணலாம்.',
      official:'பாடநூல் சார்ந்த பயிற்சிகள்',original:'டிரிகிள் உருவாக்கிய பயிற்சிகள்',all:'எல்லா வினாக்களும்',
      sourceCaution:'சில குறிப்புகள் பழைய பதிப்புகளைச் சேர்ந்தவை. உங்கள் பாடநூலுடன் வினா எண்களை ஒப்பிடுங்கள்.',
      quizIntro:'பயிற்சிக்கான சிறு வினாக்கள்; அதிகாரப்பூர்வ அத்தியாயத் தேர்வு அல்ல. குறிப்பைப் பார்ப்பதற்கு முன் முயலுங்கள்.',
      noQuiz:'இந்த அத்தியாயத்திற்கான சிறு தேர்வுகள் இன்னும் உருவாக்கப்படுகின்றன. இங்கு வினாக்கள் இன்னும் இல்லை.',
      correct:'சரி! அதன் காரணத்தைத் தாளில் விளக்க முயலுங்கள்.',incorrect:'இன்னும் சரியாகவில்லை. குறிப்பைப் பார்த்து மீண்டும் முயலுங்கள்.',
      hint:'ஒரு குறிப்பு',reveal:'ஏன்?',progress:'சரியாக விடையளித்த வினாக்கள்',tryPaper:'முழுக் கருத்துப் பாடத்திற்குச் செல்லுங்கள்',
      navigation:'அத்தியாயப் பகுதிகள்',review:'மீளாய்வு நிலை',sources:'பாடநூல் ஆதாரங்கள்',
      sectionStatus:'இந்த அத்தியாயம் உருவாக்கத்தில் உள்ளது. கிடைக்கும் பகுதிகள் கீழே உள்ளன.',
      returnHelp:'கருத்துகள், எடுத்துக்காட்டுகள், பயிற்சிகள் மற்றும் சிறு தேர்வுகளுக்குச் செல்ல அத்தியாயத் தேர்வைப் பயன்படுத்துங்கள்.',
      selectQuestion:'ஒரு வினாவைத் தேர்ந்தெடுக்கவும்',group:'பயிற்சித் தொகுதி',jumpConcept:'கருத்தைப் படிக்கவும்',lab:'வென் பட ஆய்வகம்',
      existingExamples:'சில தீர்க்கப்பட்ட எடுத்துக்காட்டுகள் உள்ளன',noPublished:'முழு அத்தியாய மீளாய்வு இன்னும் முடியவில்லை'
    }
  };
  const kinds=['concepts','examples','exercises','quizzes'];
  const categorized=questions=>({
    examples:questions.filter(q=>/^\s*Example\b/i.test(q.label?.en||'')),
    exercises:questions.filter(q=>!/^\s*Example\b/i.test(q.label?.en||''))
  });
  function mount(root,opts){
    if(!root||!opts?.chapter)return;
    const {chapter,grade,lang,section,questions,sources,onSection,onQuestion,onClass,onHome,initialConcept}=opts;
    const t=texts[lang==='ta'?'ta':'en'];
    const text=obj=>typeof obj==='string'?obj:(obj?.[lang]||obj?.en||'');
    const sets=categorized(questions);
    const stages=chapter.id==='g9-ch1'?(window.TRIGGLE_SET_PATH?.stages||[]):chapter.id==='g9-ch2'?(window.TRIGGLE_REAL_PATH?.stages||[]):[];
    const counts={concepts:stages.length,examples:sets.examples.length,exercises:sets.exercises.length,quizzes:stages.length};
    const symbols={concepts:'◇',examples:'∑',exercises:'✎',quizzes:'✓'};
    const available={concepts:stages.length>0,examples:counts.examples>0,exercises:counts.exercises>0,quizzes:counts.quizzes>0};
    const labelFor=kind=>({concepts:t.concepts,examples:t.examples,exercises:t.exercises,quizzes:t.quizzes})[kind];
    const noteFor=kind=>({concepts:t.conceptsHint,examples:t.examplesHint,exercises:t.exercisesHint,quizzes:t.quizzesHint})[kind];
    const countFor=kind=>available[kind]?
      counts[kind]+' '+(kind==='concepts'?t.available:kind==='examples'?t.worked:kind==='quizzes'?t.checks:t.questions):t.soon;
    root.replaceChildren();
    root.classList.add('chapter-hub');
    const mk=(label,fn,cls)=>{
      const b=document.createElement('button');b.type='button';b.className=cls;
      b.textContent=label;b.addEventListener('click',fn);return b;
    };
    // One clear hierarchy: section → chapter choices → all chapters.
    // Home is provided once, globally, in the app header.
    const nav=document.createElement('nav');nav.className='hub-top-actions';
    nav.setAttribute('aria-label',t.navigation);
    nav.append(section
      ? mk('← '+t.back,()=>onSection(null),'hub-back-menu')
      : mk('← '+t.classBack,onClass,'hub-back-class'));
    root.append(nav);
    const heading=document.createElement('header');heading.className='hub-header';
    const sectionTitle=section==='sources'?t.resources:labelFor(section);
    const pageTitle=section?sectionTitle:text(chapter.title);
    heading.innerHTML='<p class="hub-eyebrow">'+
      e(section?text(chapter.title):t.eyebrow+' · '+t.navigation+' · '+grade)+'</p>'+
      '<h2 id="chapterOverviewTitle">'+e(pageTitle)+'</h2>'+
      (section?'':'<p class="hub-intro">'+e(t.intro)+'</p>');
    root.append(heading);
    if(!section){
      const metadata=document.createElement('p');metadata.className='hub-stage-note';
      metadata.textContent=t.sectionStatus;root.append(metadata);
      const menu=document.createElement('nav');menu.className='hub-section-menu';
      menu.setAttribute('aria-label',t.navigation);
      menu.innerHTML='<h3>'+e(t.choose)+'</h3>';
      const grid=document.createElement('div');grid.className='hub-section-grid';
      grid.setAttribute('role','group');grid.setAttribute('aria-label',t.navigation);
      kinds.forEach(kind=>{
        const b=document.createElement('button');b.type='button';b.dataset.hubSection=kind;
        b.className='hub-section-card'+(available[kind]?'':' is-upcoming');
        b.innerHTML='<span class="hub-section-icon" aria-hidden="true">'+symbols[kind]+'</span>'+
          '<strong>'+e(labelFor(kind))+'</strong>'+
          '<span class="hub-section-description">'+e(noteFor(kind))+'</span>'+
          '<span class="hub-section-count">'+e(countFor(kind))+'</span>'+
          '<span class="hub-section-arrow" aria-hidden="true">↗</span>';
        b.addEventListener('click',()=>onSection(kind));
        grid.append(b);
      });
      menu.append(grid);root.append(menu);
      const footer=document.createElement('div');footer.className='hub-footer';
      footer.append(mk('ⓘ '+t.resources,()=>onSection('sources'),'hub-resource-link'));
      root.append(footer);
      return;
    }
    const panel=document.createElement('section');panel.className='hub-panel';panel.id='chapterSectionContent';
    panel.setAttribute('aria-label',labelFor(section)||t.resources);
    root.append(panel);
    function info(copy){
      const p=document.createElement('p');p.className='hub-info';p.textContent=copy;panel.append(p);
    }
    const cardFor=item=>{
      const b=document.createElement('button');b.type='button';b.className='hub-question';
      b.dataset.questionId=item.id;
      b.innerHTML='<span class="hub-question-label">'+e(text(item.label))+'</span>'+
        '<span class="hub-question-title">'+e(text(item.title))+'</span>'+
        '<span class="hub-question-arrow" aria-hidden="true">↗</span>';
      b.addEventListener('click',()=>onQuestion(item));return b;
    };
    if(section==='concepts'){
      if(stages.length){
        info(t.learning);
        if(chapter.id==='g9-ch2'){
          for(const stage of stages){
            const article=document.createElement('article');article.className='hub-question-group';
            const heading=document.createElement('h4');heading.textContent=text(stage.title);
            const idea=document.createElement('p');idea.textContent=text(stage.idea);
            const example=document.createElement('p');example.textContent=text(stage.example);
            const rule=document.createElement('p');rule.textContent=text(stage.rule);
            const source=document.createElement('small');source.textContent='SCERT 2025 · §'+stage.section;
            article.append(heading,idea,example,rule,source);panel.append(article);
          }
        }else{
          window.TriggleSetJourney?.mount(panel,chapter,lang);
          window.TriggleLab?.mount(panel,chapter,lang);
        }
        if(Number.isInteger(initialConcept)&&initialConcept>=0){
          const target=panel.querySelector('.sp2-nav [data-index="'+initialConcept+'"]');
          if(target)target.click();
        }
      }else{info(t.noneConcept);}
    }
    if(section==='examples'||section==='exercises'){
      const selected=sets[section];
      if(!selected.length){
        info(section==='examples'?t.noneWorked:t.noneExercises);
        if(section==='examples'){
          info(t.whyWorked);
        }
      }else{
        if(section==='exercises')info(t.practiceNote);
        if(section==='examples')info(t.existingExamples);
        if(section==='exercises'&&selected.some(q=>q.kind==='practice')&&selected.some(q=>q.kind!=='practice')){
          const filters=document.createElement('div');filters.className='hub-question-filters';
          const filterOptions=[['all',t.all],['textbook',t.official],['practice',t.original]];
          const select=document.createElement('select');select.setAttribute('aria-label',t.selectQuestion);
          for(const [key,label] of filterOptions){const option=document.createElement('option');option.value=key;option.textContent=label;select.append(option);}
          filters.append(select);panel.append(filters);
          select.addEventListener('change',()=>{
            panel.querySelectorAll('[data-question-id]').forEach(b=>{
              const question=selected.find(q=>q.id===b.dataset.questionId);
              b.hidden=select.value==='all'?false:select.value==='practice'?question?.kind!=='practice':question?.kind==='practice';
            });
            panel.querySelectorAll('.hub-question-group').forEach(g=>{
              g.hidden=!g.querySelector('.hub-question:not([hidden])');
            });
          });
        }
        const buckets=new Map();
        for(const item of selected){
          const group=item.kind==='practice'?'practice':item.exercise||'other';
          if(!buckets.has(group))buckets.set(group,[]);
          buckets.get(group).push(item);
        }
        for(const [group,items] of buckets){
          const box=document.createElement('section');box.className='hub-question-group';
          const h=document.createElement('h4');
          h.textContent=group==='practice'?t.original:
            section==='examples'?t.examples+' · '+group:(items[0].label?.en||'').startsWith('Unit Exercise')?'Unit Exercise':t.group+' '+group;
          box.append(h);
          items.forEach(item=>box.append(cardFor(item)));
          panel.append(box);
        }
      }
    }
    if(section==='quizzes'){
      if(!stages.length){
        info(t.noQuiz);
      }else{
        info(t.quizIntro);
        const status=document.createElement('p');status.className='hub-quiz-progress';
        status.setAttribute('role','status');status.setAttribute('aria-live','polite');
        panel.append(status);
        const correct=new Set();
        const update=()=>{status.textContent=t.progress+': '+correct.size+' / '+stages.length;};
        stages.forEach((stage,index)=>{
          const article=document.createElement('article');article.className='hub-quiz-question';
          const h=document.createElement('h4');h.textContent=(index+1)+'. '+text(stage.question);article.append(h);
          const answers=document.createElement('div');answers.className='hub-quiz-answers';answers.setAttribute('role','group');
          answers.setAttribute('aria-label',text(stage.question));
          const feedback=document.createElement('p');feedback.setAttribute('aria-live','polite');feedback.className='hub-quiz-feedback';
          stage.choices.forEach((choice,i)=>{
            const button=document.createElement('button');button.type='button';button.textContent=text(choice);
            button.addEventListener('click',()=>{
              answers.querySelectorAll('button').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));
              const right=i===stage.correct;
              feedback.textContent=right?t.correct:t.incorrect;
              if(right){correct.add(stage.id);update();}
            });
            answers.append(button);
          });
          const details=document.createElement('details');details.className='hub-quiz-help';
          details.innerHTML='<summary>'+e(t.hint)+'</summary><p>'+e(text(stage.hint))+'</p><p>'+e(text(stage.why))+'</p>';
          article.append(answers,details,feedback);panel.append(article);
        });
        update();
      }
    }
    if(section==='sources'){
      info(t.sourceCaution);
      for(const ref of chapter.sourceRefs||[]){
        const source=sources.find(s=>s.id===ref.sourceId);
        if(!source)continue;
        const entry=document.createElement('div');entry.className='hub-source';
        const a=document.createElement('a');a.textContent=source.title+' · '+(source.medium==='ta'?'தமிழ்':'English');
        if(/^https?:\/\//.test(source.url)){a.href=source.url;a.target='_blank';a.rel='noopener noreferrer';}
        else a.removeAttribute('href');
        const p=document.createElement('p');p.textContent=ref.locator||'';entry.append(a,p);panel.append(entry);
      }
      const status=document.createElement('p');status.className='hub-review';status.textContent=t.review+': '+(chapter.review?.state||'unreviewed')+'. '+t.noPublished;panel.append(status);
    }
  }
  window.TriggleChapterHub=Object.freeze({mount,categorized});
})();