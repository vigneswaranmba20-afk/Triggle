/* Triggle chapter hub: choose what to study BEFORE opening long lesson content.
   Local, bilingual, zero runtime dependencies; existing question IDs are preserved. */
(() => {
  'use strict';
  const e=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const typeset=s=>window.TriggleNotation?.render(s)||e(s);
  const displayMath=value=>window.TriggleNotation?.renderLatex?.(value.latex,{displayMode:true,fallback:value.fallback})||e(value.fallback);
  const texts={
    en:{
      eyebrow:'YOUR CHAPTER',choose:'Choose a section',
      intro:'Choose one section. You can come back here whenever you want.',
      concepts:'Concepts',examples:'Worked Examples',exercises:'Exercises',exerciseSingle:'Exercise',unitExercise:'Unit Exercise',quizzes:'Quizzes',activities:'Thinking Corner & Activities',
      conceptsHint:'Learn ideas with short, interactive explanations',
      examplesHint:'Study questions solved step by step',
      exercisesHint:'Choose a numbered exercise to start solving',
      quizzesHint:'Check what you remember',activitiesHint:'Open textbook thinking questions and activities with worked answers',
      available:'available',soon:'More coming',checks:'quick checks',questions:'questions',worked:'examples',
      back:'Back to chapter',classBack:'Back to all chapters',home:'Home',
      resources:'Textbook references and chapter information',navigate:'Jump to a section',choosePrompt:'Choose a section…',
      learning:'Explore the concepts',noneConcept:'Concept lessons for this chapter are coming soon. There is no concept activity here yet.',
      practiceInstead:'You can still explore questions with complete step-by-step solutions in Exercises.',
      noneWorked:'No questions in this chapter are explicitly labelled worked examples yet.',
      whyWorked:'Textbook exercises with worked solutions remain under Exercises so they are easy to find without misleading labels.',
      seeExercises:'See available exercises',noneExercises:'Exercise questions are not available here yet. We are adding them chapter by chapter.',
      practiceNote:'Every existing question here opens its complete worked solution.',
      official:'Book-referenced exercises',original:'Original Triggle practice',all:'All questions',
      sourceCaution:'These references include archived editions. Confirm question numbering against your prescribed textbook.',
      quizIntro:'Short concept checks for practice, not an official textbook chapter exam. Try answering before asking for a hint.',
      noQuiz:'Quizzes for this chapter are coming soon. There are no quiz questions here yet.',
      correct:'Correct! You can try explaining why on paper.',incorrect:'Not quite. Try the clue and answer again.',
      hint:'Show a hint',reveal:'Why?',progress:'Checks answered correctly',tryPaper:'Try the full concept lesson',
      navigation:'Chapter sections',review:'Editorial review',sources:'Source books',
      sectionStatus:'Chapter under development · more lessons coming.',
      learningStatus:'Textbook verification is in progress.',
      questionBreakdown:(total,examples,exercises,quizzes)=>`${exercises} exercises & practice · ${quizzes} quick checks`,
      returnHelp:'Use the chapter menu to switch between Concepts, Exercises and Quizzes.',
      selectQuestion:'Choose an exercise',group:'Exercise group',jumpConcept:'Open a concept',lab:'Venn diagram lab',
      existingExamples:'Some worked examples are available',noPublished:'Complete chapter review is still pending',
       exampleWordingNote:'Textbook wording audit: Chapter 1 worked examples are currently restated, not verified word-for-word 2025 textbook questions. Solutions are authored separately.',
       exerciseCoverageNote:(count)=>`Exercise 1.1 · ${count} of 30 textbook subparts available. All 30 Exercise 1.1 subparts follow the source-checked 2025 EN/Tamil textbook pages. Exercises 1.2–1.7 still require textbook comparison. Independent Tamil editorial review remains pending.`
    },
    ta:{
      eyebrow:'உங்கள் அத்தியாயம்',choose:'ஒரு பகுதியைத் தேர்ந்தெடுக்கவும்',
      intro:'ஒரு பகுதியைத் தேர்ந்தெடுக்கவும். எப்போது வேண்டுமானாலும் இங்கு திரும்பலாம்.',
      concepts:'கருத்துகள்',examples:'தீர்க்கப்பட்ட எடுத்துக்காட்டுகள்',exercises:'பயிற்சிகள்',exerciseSingle:'பயிற்சி',unitExercise:'அலகுப் பயிற்சி',quizzes:'சிறு தேர்வுகள்',activities:'சிந்தனை மூலை & செயல்பாடுகள்',
      conceptsHint:'சிறு விளக்கங்களுடன் செயல்வழியாகக் கற்றுக்கொள்ளுங்கள்',
      examplesHint:'படிப்படியாகத் தீர்க்கப்பட்ட வினாக்களைப் பாருங்கள்',
      exercisesHint:'பயிற்சி எண்ணைத் தேர்ந்தெடுத்து வினாக்களுக்குச் செல்லுங்கள்',
      quizzesHint:'நினைவில் உள்ளதைச் சரிபாருங்கள்',activitiesHint:'பாடநூல் சிந்தனை வினாக்களும் செயல்பாடுகளும், விளக்க விடைகளுடன்',
      available:'கிடைக்கிறது',soon:'மேலும் உருவாகின்றன',checks:'சிறு வினாக்கள்',questions:'வினாக்கள்',worked:'எடுத்துக்காட்டுகள்',
      back:'அத்தியாயத்திற்குத் திரும்பு',classBack:'அனைத்து அத்தியாயங்களுக்கும் திரும்பு',home:'முகப்பு',
      resources:'பாடநூல் குறிப்புகள் மற்றும் அத்தியாய விவரம்',navigate:'பகுதிக்குச் செல்லுங்கள்',choosePrompt:'ஒரு பகுதியைத் தேர்ந்தெடுக்கவும்…',
      learning:'கருத்துகளை ஆராயுங்கள்',noneConcept:'இந்த அத்தியாயத்திற்கான கருத்துப் பாடங்கள் உருவாக்கப்படுகின்றன. இங்கு இன்னும் செயல்வழிப் பாடங்கள் இல்லை.',
      practiceInstead:'பயிற்சிகள் பகுதியில் உள்ள வினாக்களின் படிப்படியான தீர்வுகளைப் பயன்படுத்தலாம்.',
      noneWorked:'இந்த அத்தியாயத்தில் எடுத்துக்காட்டு எனத் தனியாகக் குறிக்கப்பட்ட வினாக்கள் இன்னும் இல்லை.',
      whyWorked:'தீர்வுள்ள பாடநூல் பயிற்சிகள் «பயிற்சிகள்» பகுதியில் சரியான பெயருடன் இடம்பெறுகின்றன.',
      seeExercises:'பயிற்சிகளுக்குச் செல்லுங்கள்',noneExercises:'இந்த அத்தியாயத்தின் பயிற்சி வினாக்கள் இன்னும் சேர்க்கப்படுகின்றன.',
      practiceNote:'வினாக்களையும் தீர்வுகளையும் நேராக அணுகுங்கள்',
      official:'பாடநூல் சார்ந்த பயிற்சிகள்',original:'டிரிகிள் உருவாக்கிய பயிற்சிகள்',all:'எல்லா வினாக்களும்',
      sourceCaution:'சில குறிப்புகள் பழைய பதிப்புகளைச் சேர்ந்தவை. உங்கள் பாடநூலுடன் வினா எண்களை ஒப்பிடுங்கள்.',
      quizIntro:'பயிற்சிக்கான சிறு வினாக்கள்; அதிகாரப்பூர்வ அத்தியாயத் தேர்வு அல்ல. குறிப்பைப் பார்ப்பதற்கு முன் முயலுங்கள்.',
      noQuiz:'இந்த அத்தியாயத்திற்கான சிறு தேர்வுகள் இன்னும் உருவாக்கப்படுகின்றன. இங்கு வினாக்கள் இன்னும் இல்லை.',
      correct:'சரி! அதன் காரணத்தைத் தாளில் விளக்க முயலுங்கள்.',incorrect:'இன்னும் சரியாகவில்லை. குறிப்பைப் பார்த்து மீண்டும் முயலுங்கள்.',
      hint:'ஒரு குறிப்பு',reveal:'ஏன்?',progress:'சரியாக விடையளித்த வினாக்கள்',tryPaper:'முழுக் கருத்துப் பாடத்திற்குச் செல்லுங்கள்',
      navigation:'அத்தியாயப் பகுதிகள்',review:'மீளாய்வு நிலை',sources:'பாடநூல் ஆதாரங்கள்',
      sectionStatus:'மேலும் பாடங்கள் உருவாக்கப்படுகின்றன.',
      learningStatus:'பாடநூல் ஒப்பீடு இன்னும் நடைபெறுகிறது.',
      questionBreakdown:(total,examples,exercises,quizzes)=>`${exercises} பயிற்சி வினாக்கள் · ${quizzes} சிறு சோதனைகள்`,
      returnHelp:'கருத்துகள், எடுத்துக்காட்டுகள், பயிற்சிகள் மற்றும் சிறு தேர்வுகளுக்குச் செல்ல அத்தியாயத் தேர்வைப் பயன்படுத்துங்கள்.',
      selectQuestion:'ஒரு வினாவைத் தேர்ந்தெடுக்கவும்',group:'பயிற்சித் தொகுதி',jumpConcept:'கருத்தைப் படிக்கவும்',lab:'வென் பட ஆய்வகம்',
      existingExamples:'சில தீர்க்கப்பட்ட எடுத்துக்காட்டுகள் உள்ளன',noPublished:'முழு அத்தியாய மீளாய்வு இன்னும் முடியவில்லை',
       exampleWordingNote:'பாடநூல் ஒப்பீடு நிலுவையில் உள்ளது: முதல் அத்தியாய எடுத்துக்காட்டு வினாக்கள் சில மாற்றிச் சொல்லப்பட்டுள்ளன. 2025 பாடநூலின் சொற்சொல்லான பதிப்பாகச் சான்றளிக்கப்படவில்லை.',
       exerciseCoverageNote:(count)=>`பயிற்சி 1.1 · மொத்தம் 30 துணை வினாக்களில் ${count} மட்டுமே உள்ளன. பயிற்சி 1.1-இன் 30 துணை வினாக்களும் 2025 ஆங்கிலம் மற்றும் தமிழ் பாடநூலுடன் ஒப்பிடப்பட்டுள்ளன. பயிற்சிகள் 1.2–1.7 சரிபார்க்கப்பட வேண்டும். தமிழ் ஆசிரியரின் மீளாய்வு இன்னும் நிலுவையில் உள்ளது.`
    }
  };
  const baseKinds=['concepts','exercises','quizzes'];
  // "Exercises" is strictly for available textbook-labelled questions.
  // Preserve Triggle practice in its underlying records, never insert it ahead
  // of Exercise N.1 Question 1 or pretend it is an official textbook exercise.
  const textbookExercises=questions=>questions.filter(q=>
    q.kind!=='practice'&&/^(?:Exercise|Unit Exercise)\b/i.test(q.label?.en||'')
  );
  const categorized=questions=>({
    examples:questions.filter(q=>/^\s*Example\b/i.test(q.label?.en||'')),
    exercises:textbookExercises(questions)
  });
  // Shared fallback for any chapter that has textbook-grounded concept stages
  // but no specialised animation engine yet. The student uses the same index and
  // Back/Previous/Next pattern as Grade 9 Set Language and Real Numbers.
  // Purposeful, offline mathematical interactions for Grade 10 Number & Sequences.
  // No welcome slides, dashboards, autoplay or external scripts.
  // A.P. sum: pair opposite ends instead of selecting an arbitrary term.
  // This is intentionally scoped to a single concept; other sequence labs stay intact.
  function showAPSumPairing(host,lang){
    const ta=lang==='ta';
    const copy=ta?{
      heading:'இரு முனைகளிலிருந்தும் இணைத்துக் கூட்டுங்கள்',
      term:'உறுப்பு',pair1:'ஜோடி 1',pair2:'ஜோடி 2',middle:'நடு',
      notes:[
        'ஒவ்வொன்றாகக் கூட்டாமல், முதல் உறுப்பையும் கடைசி உறுப்பையும் இணைத்துப் பாருங்கள்.',
        'முதல் உறுப்பும் கடைசி உறுப்பும்: 1 + 5 = 6.',
        'அடுத்த இரு முனை உறுப்புகளும்: 2 + 4 = 6. இரண்டு ஜோடிகளும் சமம்!',
        'நடு உறுப்பு 3. ஆகவே கூடுதல் 15. வரிசையைத் திருப்பி எழுதி அசல் வரிசையுடன் கூட்டினால், நடுச் சோடியின் கூடுதலும் 6. இரு வரிகளால் கூடுதலை இருமுறை எண்ணுகிறோம். விதியில் n உறுப்புகளின் எண்ணிக்கை, a முதல் உறுப்பு, ℓ கடைசி உறுப்பு.'
      ],
      previous:'முந்தைய படி',next:'அடுத்த படி',replay:'மீண்டும் பார்',step:'படி',
      of:'இல்',formula:'சூத்திரம்'
    }:{
      heading:'See how pairing works',
      term:'Term',pair1:'Pair 1',pair2:'Pair 2',middle:'Middle',
      notes:[
        'Instead of adding one by one, pair the terms at opposite ends.',
        'The first and last terms make one pair: 1 + 5 = 6.',
        'The next pair is 2 + 4 = 6. Both pairs have the same sum!',
        'The middle term is 3, so the sum is 15. Add a reversed copy and even the middle pair gives 6. The two rows count the sum twice. In the rule, n counts terms, a is first and ℓ is last.'
      ],
      previous:'Previous step',next:'Next step',replay:'Replay',step:'Step',
      of:'of',formula:'Formula'
    };
    let step=0;
    host.className='g10ch2-visual g10ch2-pairing';
    host.setAttribute('role','group');
    host.setAttribute('aria-label',copy.heading);
    const title=document.createElement('p');title.className='g10ch2-pairing-title';
    title.textContent=copy.heading;
    const list=document.createElement('div');list.className='g10ch2-pairing-terms';
    list.setAttribute('role','list');
    const cells=[1,2,3,4,5].map((n,i)=>{
      const cell=document.createElement('div');cell.className='g10ch2-pairing-term';
      cell.setAttribute('role','listitem');
      const value=document.createElement('strong');value.className='g10ch2-pairing-number';
      value.textContent=String(n);
      const label=document.createElement('small');label.className='g10ch2-pairing-label';
      cell.append(value,label);list.append(cell);
      return {cell,label,i,n};
    });
    const explanation=document.createElement('div');explanation.className='g10ch2-pairing-explanation';
    const math=document.createElement('div');math.className='g10ch2-pairing-math';
    const extra=document.createElement('div');extra.className='g10ch2-pairing-formula';
    const note=document.createElement('p');note.className='g10ch2-pairing-note';
    note.setAttribute('role','status');note.setAttribute('aria-live','polite');
    explanation.append(math,extra,note);
    const controls=document.createElement('div');controls.className='g10ch2-pairing-controls';
    const previous=document.createElement('button');previous.type='button';
    previous.textContent='← '+copy.previous;
    const progress=document.createElement('span');progress.className='g10ch2-pairing-progress';
    const next=document.createElement('button');next.type='button';
    controls.append(previous,progress,next);
    host.append(title,list,explanation,controls);
    const equations=['1+2+3+4+5','1+5=6','2+4=6','6+6+3=15'];
    const formula=String.raw`\begin{aligned}S_n&=\frac n2(a+\ell)\\S_5&=\frac52(1+5)=15\end{aligned}`;
    const showMath=(element,latex,fallback)=>{
      element.innerHTML=typeof window.TriggleNotation?.renderLatex==='function'?
        window.TriggleNotation.renderLatex(latex,{displayMode:true,fallback}):e(fallback);
    };
    function draw(){
      cells.forEach(({cell,label,i,n})=>{
        const first=step>=1&&(i===0||i===4);
        const second=step>=2&&(i===1||i===3);
        const center=step>=3&&i===2;
        cell.classList.toggle('is-pair-one',first);
        cell.classList.toggle('is-pair-two',second);
        cell.classList.toggle('is-middle',center);
        const group=first?copy.pair1:second?copy.pair2:center?copy.middle:'';
        label.textContent=group;
        cell.setAttribute('aria-label',copy.term+' '+(i+1)+': '+n+(group?', '+group:''));
      });
      showMath(math,equations[step],equations[step]);
      extra.hidden=step!==3;
      if(step===3)showMath(extra,formula,'Sₙ = n/2 × (a + ℓ). S₅ = 5/2 × (1 + 5) = 15.');
      note.textContent=copy.notes[step];
      progress.textContent=copy.step+' '+(step+1)+' '+copy.of+' 4';
      previous.disabled=step===0;
      next.textContent=step===3?copy.replay+' ↻':copy.next+' →';
    }
    previous.addEventListener('click',()=>{if(step>0){step--;draw();}});
    next.addEventListener('click',()=>{step=(step+1)%4;draw();});
    draw();
  }


  // Student Psychology Lab: these concept-specific interactions make the reasoning
  // visible rather than asking students to interpret a number-selection slider.
  function showHCFSteps(host,lang){
    const ta=lang==='ta',copy=ta?{
      title:'60 மற்றும் 32-இன் மீ.பொ.வ காண்போம்',
      definition:'மீ.பொ.வ என்பது இரு எண்களையும் மீதமின்றி வகுக்கும் மிகப் பெரிய நேர்ம முழு எண்.',
      steps:['60-ஐ 32-ஆல் வகுக்கவும்','32-ஐ 28-ஆல் வகுக்கவும்','28-ஐ 4-ஆல் வகுக்கவும்'],
      remainder:['மீதி: 28','மீதி: 4','மீதி: 0 — இங்கே நிறுத்தவும்'],
      answer:'மீ.பொ.வ (60, 32) = 4',
      why:'பூச்சியமல்லாத கடைசி மீதி 4.'
    }:{
      title:'Find the HCF of 60 and 32',
      definition:'HCF means highest common factor: the largest positive whole number that divides both numbers exactly.',
      steps:['Divide 60 by 32','Divide 32 by 28','Divide 28 by 4'],
      remainder:['Remainder: 28','Remainder: 4','Remainder: 0 — stop here'],
      answer:'HCF(60, 32) = 4',
      why:'The last nonzero remainder is 4.'
    };
    host.className='g10ch2-visual g10ch2-hcf-steps';
    host.setAttribute('role','group');host.setAttribute('aria-label',copy.title);
    const title=document.createElement('h5');title.className='g10ch2-hcf-title';title.textContent=copy.title;
    const definition=document.createElement('p');definition.className='g10ch2-hcf-definition';definition.textContent=copy.definition;
    host.append(title,definition);
    const equations=[
      {latex:'60=32\\times1+28',fallback:'60 = 32 × 1 + 28'},
      {latex:'32=28\\times1+4',fallback:'32 = 28 × 1 + 4'},
      {latex:'28=4\\times7+0',fallback:'28 = 4 × 7 + 0'}
    ];
    equations.forEach((value,i)=>{
      const step=document.createElement('section');step.className='g10ch2-hcf-step';step.dataset.hcfStep=String(i+1);
      const label=document.createElement('p');label.className='g10ch2-hcf-label';
      label.textContent=(ta?'படி ':'Step ')+(i+1)+' — '+copy.steps[i];
      const math=document.createElement('div');math.className='g10ch2-hcf-equation';
      math.innerHTML=typeof window.TriggleNotation?.renderLatex==='function'
        ?window.TriggleNotation.renderLatex(value.latex,{displayMode:true,fallback:value.fallback}):e(value.fallback);
      const note=document.createElement('p');note.className='g10ch2-hcf-remainder';note.textContent=copy.remainder[i];
      step.append(label,math,note);host.append(step);
    });
    const answer=document.createElement('p');answer.className='g10ch2-hcf-answer';
    const strong=document.createElement('strong');strong.textContent=copy.answer;
    answer.append(strong,document.createTextNode(' — '+copy.why));host.append(answer);
  }

  function showGPMultiplication(host,lang,values){
    if(!Array.isArray(values)||values.length<2)return;
    const ratio=values[1]/values[0];
    if(!Number.isFinite(ratio)||!values.every((v,i)=>i===0||v===values[i-1]*ratio))return;
    const ta=lang==='ta',copy=ta?{
      title:'பெருக்குத்தொடர் எப்படி வளர்கிறது?',
      instruction:'ஒவ்வொரு உறுப்பையும் '+ratio+'-ஆல் பெருக்குங்கள்.',
      term:'உறுப்பு',start:'இதுவே தொடக்க உறுப்பு.',
      explain:'முந்தைய உறுப்பை '+ratio+'-ஆல் பெருக்குங்கள்.',
      previous:'முந்தைய படி',next:'அடுத்த படி'
    }:{
      title:'See how a G.P. grows',
      instruction:'Each term is multiplied by '+ratio+'.',
      term:'Term',start:'This is our starting value.',
      explain:'Multiply the previous term by '+ratio+'.',
      previous:'Previous',next:'Next step'
    };
    host.className='g10ch2-visual g10ch2-gp-steps';
    host.setAttribute('role','group');host.setAttribute('aria-label',copy.title);
    const title=document.createElement('h5');title.className='g10ch2-gp-title';title.textContent=copy.title;
    const instruction=document.createElement('p');instruction.className='g10ch2-gp-instruction';instruction.textContent=copy.instruction;
    const terms=document.createElement('div');terms.className='g10ch2-gp-terms';terms.dataset.gpTermChoices='';
    const buttons=values.map((value,i)=>{
      const button=document.createElement('button');button.type='button';button.className='g10ch2-gp-term';
      const label=document.createElement('small');label.textContent=copy.term+' '+(i+1);
      const number=document.createElement('strong');number.textContent=String(value);
      button.append(label,number);
      button.setAttribute('aria-label',copy.term+' '+(i+1)+': '+value);
      button.addEventListener('click',()=>{selected=i;paint();});
      terms.append(button);return button;
    });
    const explanation=document.createElement('div');explanation.className='g10ch2-gp-explanation';
    const equation=document.createElement('strong');equation.className='g10ch2-gp-equation';
    const note=document.createElement('p');note.className='g10ch2-gp-note';note.setAttribute('role','status');note.setAttribute('aria-live','polite');
    explanation.append(equation,note);
    const actions=document.createElement('div');actions.className='g10ch2-gp-actions';
    const previous=document.createElement('button');previous.type='button';previous.textContent='‹ '+copy.previous;
    const next=document.createElement('button');next.type='button';next.textContent=copy.next+' ›';
    actions.append(previous,next);host.append(title,instruction,terms,explanation,actions);
    let selected=1; // Show the mathematical operation immediately.
    function paint(){
      buttons.forEach((button,i)=>{
        button.classList.toggle('is-selected',i===selected);
        button.setAttribute('aria-pressed',String(i===selected));
      });
      equation.textContent=selected===0?String(values[0]):values[selected-1]+' × '+ratio+' = '+values[selected];
      note.textContent=selected===0?copy.start:copy.explain;
      previous.disabled=selected===0;next.disabled=selected===values.length-1;
    }
    previous.addEventListener('click',()=>{if(selected>0){selected--;paint();}});
    next.addEventListener('click',()=>{if(selected<values.length-1){selected++;paint();}});
    paint();
  }

  function showG10Ch2Visual(stage,host,lang){
    const v=stage.visual;if(!v||!host)return;
    if(window.TriggleG10ConceptLabs?.mount(stage,host,lang))return;
    if(window.TriggleG10Ch3Labs?.mount(stage,host,lang))return;
    if(stage.id==='g10-ch2-gcd'){showHCFSteps(host,lang);return;}
    if(stage.id==='g10-ch2-gp'){showGPMultiplication(host,lang,v.values);return;}
    if(stage.id==='g10-ch2-ap-sum'){showAPSumPairing(host,lang);return;}
    if(stage.id==='g10-ch2-gp-sum'&&window.TriggleGPSumLab){window.TriggleGPSumLab.mount(host,lang);return;}
    const ta=lang==='ta';
    const captions={
      groups:ta?'மொத்தப் பொருள்கள்':'Total objects',
      cycle:stage.id==='g10-ch2-modulo'?(ta?'செவ்வாயிலிருந்து கடந்த நாட்கள்':'Days after Tuesday'):(ta?'5-ஆல் வகுக்கும் எண்':'Number to divide by 5'),
      sequence:ta?'உறுப்பின் இடம்':'Term position',
      factors:ta?'பகா காரணிகளை ஒப்பிடுங்கள்':'Compare the prime factors'
    };
    const caption=captions[v.kind]||(ta?'நீங்களே மாற்றிப் பாருங்கள்':'Change the value and observe');
    host.className='g10ch2-visual';host.setAttribute('role','group');host.setAttribute('aria-label',caption);
    const title=document.createElement('p');title.className='g10ch2-visual-title';title.textContent=caption;
    const scene=document.createElement('div');scene.className='g10ch2-scene';
    const feedback=document.createElement('p');feedback.className='g10ch2-visual-feedback';feedback.setAttribute('role','status');
    host.append(title,scene,feedback);
    const chip=(value,selected=false)=>{
      const node=document.createElement('span');node.className='g10ch2-chip'+(selected?' is-selected':'');
      node.textContent=String(value);return node;
    };
    const control=(min,max,first,update)=>{
      const input=document.createElement('input');input.type='range';input.min=String(min);input.max=String(max);input.step='1';
      input.value=String(first);input.setAttribute('aria-label',caption);
      input.addEventListener('input',()=>update(Number(input.value)));host.insertBefore(input,feedback);update(first);
    };
    if(v.kind==='groups'){
      control(10,35,v.total,n=>{
        scene.replaceChildren();
        const q=Math.floor(n/v.size),r=n%v.size;
        for(let i=0;i<q;i++){
          const group=document.createElement('span');group.className='g10ch2-dot-group';
          for(let j=0;j<v.size;j++)group.append(chip('•'));
          scene.append(group);
        }
        if(r){const rest=document.createElement('span');rest.className='g10ch2-dot-group is-remainder';
          for(let j=0;j<r;j++)rest.append(chip('•'));scene.append(rest);}
        feedback.textContent=n+' = '+v.size+' × '+q+' + '+r+(ta?' (மீதி '+r+')':' (remainder '+r+')');
      });
    }else if(v.kind==='remainders'){
      control(1,v.values.length,1,n=>{
        scene.replaceChildren();v.values.forEach((value,i)=>scene.append(chip(value,i===n-1)));
        feedback.textContent=(ta?'உறுப்பு ':'Term ')+n+' = '+v.values[n-1];
      });
    }else if(v.kind==='cycle'){
      const values=Array.isArray(v.values)?v.values:v.values[lang];
      control(0,45,Number.isInteger(v.initial)?v.initial:(stage.id==='g10-ch2-modulo'?45:stage.id==='g10-ch2-congruence'?14:3),n=>{
        scene.replaceChildren();const mark=n%v.size;
        values.forEach((value,i)=>scene.append(chip(value,i===mark)));
        const division=n+' = '+v.size+' × '+Math.floor(n/v.size)+' + '+mark;
        if(stage.id==='g10-ch2-congruence'){
          feedback.textContent=division+'; '+n+' ≡ '+mark+' (mod '+v.size+')';
        }else{
          feedback.textContent=division+'. '+(ta?n+' நாட்களுக்குப் பிறகு: ':'After '+n+' days: ')+values[mark];
        }
      });
    }else if(v.kind==='sequence'){
      control(1,v.values.length,Math.min(4,v.values.length),n=>{
        scene.replaceChildren();
        v.values.forEach((value,i)=>{
          const term=chip(value,i===n-1);
          term.setAttribute('aria-label',(ta?'உறுப்பு ':'Term ')+(i+1)+': '+value);
          scene.append(term);
        });
        const current=v.values[n-1],previous=v.values[n-2];
        let explanation=(ta?'உறுப்பு ':'Term ')+n+' = '+current;
        if(stage.id==='g10-ch2-recursive'){
          explanation+=n<=2?(ta?'. இது ஒரு தொடக்க உறுப்பு.':'. This is a starting term.'):
            '. '+v.values[n-3]+' + '+previous+' = '+current;
        }else if(stage.id==='g10-ch2-ap'&&n>1){
          explanation+='. '+current+' − '+previous+' = '+(current-previous);
        }else if(stage.id==='g10-ch2-ap-nth'){
          const jumps=n-1,first=v.values[0],difference=v.values[1]-first;
          explanation+=ta?'. படிகளின் எண்ணிக்கை: '+jumps:'. Jumps from the first term: '+jumps;
          explanation+='. '+first+' + '+jumps+' × '+difference+' = '+current;
        }
        feedback.textContent=explanation;
      });
    }else if(v.kind==='factors'){
      scene.append(chip('12 = 2 × 2 × 3'),chip('18 = 2 × 3 × 3'));
      feedback.textContent=ta?'மீ.பொ.வ-க்கு இரு எண்களிலும் உள்ள காரணிகளை எடுங்கள். மீ.பொ.ம-க்கு ஒவ்வோர் எண்ணையும் உருவாக்கப் போதுமான காரணிகளை எடுங்கள்.':'The HCF uses the factors shared by both numbers. The LCM uses enough of each factor to make either number.';
    }else if(v.kind==='bars'){
      scene.append(chip('+32'),chip('+32'),chip('−60'),chip('= 4',true));
      feedback.textContent=ta?'64 − 60 = 4; முதலில் பொருள் புரியட்டும்':'64 − 60 = 4. Understand this before reversing the algorithm.';
    }else if(v.kind==='fractions'){
      const values=[1,.5,.25,.125,.0625];control(1,values.length,3,n=>{
        scene.replaceChildren();values.slice(0,n).forEach((x,i)=>{
          const bar=document.createElement('span');bar.className='g10ch2-fraction-bar';
          bar.style.width=(x*100)+'%';bar.style.minWidth='14px';
          bar.textContent=i===0?'1':'1/'+Math.pow(2,i);scene.append(bar);
        });const total=2-1/Math.pow(2,n-1);
        feedback.textContent=(ta?'பகுதித் தொகை: ':'Partial sum: ')+total.toFixed(4)+(ta?' → 2-ஐ அணுகுகிறது':' → approaches 2');
      });
    }
  }

  // Stream the optional concept video only after a deliberate student action.
  // Do not probe the remote R2 asset on concept open: avoid wasting mobile data
  // and avoid holding up navigation/browser tests when the CDN is slow.
  function attachStageVideo(panel,stage,lang){
    if(!['g10-ch2-ap-sum','g10-ch2-gp-sum','g10-ch3-discriminant','g10-ch4-bpt-thales'].includes(stage?.id)||!stage.video?.src)return;
    let url;try{url=new URL(stage.video.src,document.baseURI);}catch{return;}
    if(url.protocol!=='https:'||!url.pathname.toLowerCase().endsWith('.mp4'))return;
    if(url.origin!==location.origin&&url.hostname!=='pub-ed71b86e97a64b428086e292b26fb7a2.r2.dev')return;
    const ta=lang==='ta',button=document.createElement('button');
    button.type='button';button.className='sp2-concept-video-button';
    const seconds=Math.round(Number(stage.video.durationSeconds)||0);
    const durationLabel=seconds?Math.floor(seconds/60)+':'+String(seconds%60).padStart(2,'0'):'';
    button.textContent=ta?'▶ காணொளி விளக்கம் · ஆங்கிலக் குரல்':'▶ Watch video explanation'+(durationLabel?' · '+durationLabel:'');
    const anchor=panel.querySelector('.sp2-recall') || panel.querySelector('.sp2-lesson-note');
    if(anchor)anchor.before(button);else panel.append(button);
    button.addEventListener('click',()=>{
      const dialog=document.createElement('dialog');dialog.className='sp2-concept-video-dialog';
      const header=document.createElement('div');header.className='sp2-concept-video-heading';
      const title=document.createElement('h3');title.id='triggle-'+stage.id+'-video-title';
      const gp=stage.id==='g10-ch2-gp-sum';
       const discriminant=stage.id==='g10-ch3-discriminant';
       const thales=stage.id==='g10-ch4-bpt-thales';
       title.textContent=thales
         ?(ta?'தேல்ஸ் தேற்றம் — அடிப்படை விகிதசமத் தேற்றம் (ஆங்கிலக் குரல்)':'Thales theorem — the proportionality of parallel lines')
         :(discriminant
           ?(ta?'தன்மைக்காட்டி — மூலங்களின் தன்மை (ஆங்கிலக் குரல்)':'The discriminant — nature of roots')
           :(ta?(gp?'பெருக்குத்தொடரின் கூட்டுத்தொகை — நீக்கும் முறை':'கூட்டுத்தொடர் தொகை — இணைத்துக் கூட்டுதல்'):
             (gp?'Geometric series — discover cancellation':'Arithmetic progression — pairing the ends')));
      const close=document.createElement('button');close.type='button';close.className='sp2-concept-video-close';
      close.textContent=ta?'✕ மூடு':'✕ Close';close.setAttribute('aria-label',ta?'காணொளியை மூடு':'Close visual lesson');
      header.append(title,close);
      const video=document.createElement('video');video.controls=true;video.playsInline=true;
      video.preload='none';video.src=url.href;video.setAttribute('aria-label',title.textContent);
      const note=document.createElement('p');note.className='sp2-concept-video-note';
      note.textContent=ta?'ஆங்கிலக் குரல் · சிந்திக்க வேண்டுமென்றால் இடைநிறுத்துங்கள்':'Pause whenever you need more thinking time.';
      const error=document.createElement('p');error.className='sp2-concept-video-note';
      error.hidden=true;error.setAttribute('role','alert');
      error.textContent=ta?'தற்போது காணொளியை இயக்க முடியவில்லை. எழுத்து விளக்கம் தொடர்ந்து கிடைக்கும்.':'Video is temporarily unavailable. The written lesson still works.';
      video.addEventListener('error',()=>{error.hidden=false;note.hidden=true;});
      dialog.setAttribute('aria-labelledby',title.id);dialog.append(header,video,note,error);document.body.append(dialog);
      dialog.addEventListener('close',()=>{
        video.pause();video.removeAttribute('src');video.load();dialog.remove();
        if(button.isConnected)button.focus({preventScroll:true});
      },{once:true});
      close.addEventListener('click',()=>dialog.close());
      dialog.showModal();close.focus({preventScroll:true});
    });
  }

  function mountStageJourney(container,stages,lang,initialConcept,onConcept,onQuestion=null,chapterQuestions=[],hasTopNext=false,statistics=null){
    const ta=lang==='ta',pick=value=>typeof value==='string'?value:(value?.[lang]||value?.en||'');
    const back=ta?'கருத்துகளுக்குத் திரும்பு':'Back to concepts';
    const nextLabel=ta?'அடுத்த கருத்து':'Next idea';
    const prevLabel=ta?'முந்தைய கருத்து':'Previous idea';
    const root=document.createElement('section');root.className='sp2-journey sp2-simple-journey';root.dataset.view='index';
    root.innerHTML='<div class="sp2-index-view" data-index-view><nav class="sp2-nav" data-nav role="group" aria-label="'+
      e(ta?'கருத்தைத் தேர்க':'Choose a concept')+'"></nav></div>'+
      '<div class="sp2-detail-view" data-detail-view hidden>'+
      '<div class="sp2-detail-navigation"><button type="button" class="sp2-back-index" data-back-index>← '+e(back)+'</button>'+(hasTopNext?'<button type="button" class="sp2-top-next" data-top-next></button>':'')+'</div>'+
      '<div class="sp2-panel" data-panel></div>'+
      '<nav class="sp2-journey-footer" data-adaptive-dock aria-label="'+e(ta?'கருத்துகளுக்கான வழிசெலுத்தல்':'Concept navigation')+'">'+
      '<button type="button" class="sp2-footer-prev" data-footer-prev>← '+e(prevLabel)+'</button>'+
      '<button type="button" class="sp2-footer-next" data-footer-next></button></nav></div>';
    const probabilityLessons=stages[0]?.id==='probability-1'&&window.TRIGGLE_PROB_LESSONS;
    const probability=probabilityLessons?.length===stages.length&&window.TriggleProbabilityConcepts;
    container.append(root);
    const nav=root.querySelector('[data-nav]'),panel=root.querySelector('[data-panel]');
    const indexView=root.querySelector('[data-index-view]'),detailView=root.querySelector('[data-detail-view]');
    let active=-1;
    stages.forEach((stage,i)=>{
      const button=document.createElement('button');button.type='button';button.className='sp2-nav-button';button.dataset.index=String(i);
      if(probability)button.lang='en';
      button.innerHTML='<span class="sp2-nav-number">'+(i+1)+'</span><span class="sp2-nav-name">'+e(probability?probabilityLessons[i].heading:pick(stage.title))+
        '</span><span class="sp2-done-mark" aria-hidden="true"></span>';button.addEventListener('click',()=>show(i,true));nav.append(button);
    });
    function update(){
      nav.querySelectorAll('button').forEach((button,i)=>{
        button.classList.toggle('sp2-current',i===active);button.setAttribute('aria-current',i===active?'step':'false');
      });
      root.querySelector('[data-footer-prev]').disabled=active<=0;
      const next=root.querySelector('[data-footer-next]');next.textContent=active===stages.length-1?back+' →':nextLabel+' →';
      next.classList.toggle('is-return',active===stages.length-1);
      const topNext=root.querySelector('[data-top-next]');
      if(topNext){topNext.textContent=active===stages.length-1?back+' →':(ta?'அடுத்த கருத்து':'Next concept')+' →';topNext.classList.toggle('is-return',active===stages.length-1);}
    }
    function showIndex(focus=false,notify=true){
      active=-1;root.dataset.view='index';indexView.hidden=false;detailView.hidden=true;update();
      if(notify)onConcept?.(null,true);
      if(focus){nav.querySelector('button')?.focus({preventScroll:true});root.scrollIntoView({block:'start',behavior:'auto'});}
    }
    function show(i,focus=false,notify=true){
      if(i<0||i>=stages.length)return;active=i;root.dataset.view='lesson';indexView.hidden=true;detailView.hidden=false;
      if(notify)onConcept?.(i);
      const stage=stages[i],choices=Array.isArray(stage.choices)?stage.choices:[];
      const stageId=String(stage.id||'');
      const isCh3=stageId.startsWith('g10-ch3-');
      const isStudio6=stageId.startsWith('g10-ch4-')||stageId.startsWith('g10-ch5-')||stageId.startsWith('g10-ch6-');
      if(statistics){
        statistics.mount(panel,stage,i,lang,chapterQuestions,onQuestion);
      }else if(probability){
        probability.mount(panel,stage.section,probabilityLessons[i],i,lang);
      }else if(isStudio6){
        const labEngine=stageId.startsWith('g10-ch5-')?window.TriggleG10Ch5Labs:stageId.startsWith('g10-ch6-')?window.TriggleG10Ch6Labs:window.TriggleG10Ch4Labs;
        const labels=ta?{
          badge:'தமிழ் வரைவு · 2025 பாடநூல் கலைச்சொற்களுடன் உருவாக்கப்பட்டது (ஆசிரியர் மீளாய்வு நிலுவையில்)',
          s1:'முதல் பார்வை',s2:'கண்டுபிடியுங்கள்',s3:'புரிந்துகொள்ளுங்கள்',s4:'ஏன் இது உண்மை?',s5:'நீங்களே முயற்சிக்கவும்',s6:'பாடநூலுடன் இணைப்பு',
          ref:'பாடநூல் பகுதி ',tryBtn:(q)=>'பாடநூல் '+pick(q.label)+' →',
          upcoming:(ex)=>'தொடர்புடைய பாடநூல் பயிற்சி: பயிற்சி '+ex+' (விரைவில் இணைக்கப்படும்)'
        }:{
          s1:'First glance',s2:'Discover',s3:'Understand',s4:'Why it works',s5:'Try it yourself',s6:'Connect',
          ref:'Textbook section ',tryBtn:(q)=>'Solve '+pick(q.label)+' →',
          upcoming:(ex)=>'Related textbook exercises: Exercise '+ex+' (coming soon in Exercises)'
        };
        const ruleHtml=stage.math?.latex?window.TriggleNotation.renderLatex(stage.math.latex,{displayMode:true,fallback:stage.math.fallback||pick(stage.rule)}):typeset(pick(stage.rule));
        const symbolsHtml=(stage.understand?.symbols||[]).map(item=>{
          const sym=item.symbol?.latex?window.TriggleNotation.renderLatex(item.symbol.latex,{displayMode:false,fallback:item.symbol.fallback}):e(item.symbol?.fallback||'');
          return '<li class="g10ch4-symbol-item"><span class="g10ch4-symbol-badge">'+sym+'</span><p class="g10ch4-symbol-meaning">'+typeset(item[lang]||item.en)+'</p></li>';
        }).join('');
        const proofHtml=(stage.proof?.steps||[]).map(st=>{
          const eq=st.math?.latex?displayMath(st.math):'';
          return '<li class="g10ch4-proof-step"><h6 class="g10ch4-proof-title">'+e(pick(st.title))+'</h6>'+
            (eq?'<div class="g10ch4-proof-math">'+eq+'</div>':'')+
            '<p class="g10ch4-proof-reason">'+typeset(pick(st.reason))+'</p></li>';
        }).join('');
        panel.innerHTML='<div class="sp2-concept-heading" tabindex="-1"><h4>'+e((i+1)+'. '+pick(stage.title))+'</h4></div>'+
          '<div class="g10ch4-studio">'+
          (ta?'<p class="g10ch4-tamil-badge" role="note">'+e(labels.badge)+'</p>':'')+
          '<section class="g10ch4-card" aria-label="'+e(labels.s1)+'"><div class="g10ch4-card-head"><span class="g10ch4-step-pill">1</span><h5 class="g10ch4-card-kicker">'+e(labels.s1)+'</h5></div>'+
          '<p class="g10ch4-glance-text">'+typeset(pick(stage.firstGlance))+'</p>'+
          '<div class="g10ch4-glance-visual" data-g10ch4-glance></div>'+
          '<div class="g10ch4-formula" role="group" aria-label="'+e(ta?'முக்கிய விதி':'Key rule')+'">'+ruleHtml+'</div></section>'+
          '<section class="g10ch4-card" aria-label="'+e(labels.s2)+'"><div class="g10ch4-card-head"><span class="g10ch4-step-pill">2</span><h5 class="g10ch4-card-kicker">'+e(labels.s2)+'</h5></div>'+
          '<div data-g10ch4-visual></div></section>'+
          '<section class="g10ch4-card" aria-label="'+e(labels.s3)+'"><div class="g10ch4-card-head"><span class="g10ch4-step-pill">3</span><h5 class="g10ch4-card-kicker">'+e(labels.s3)+'</h5></div>'+
          '<p class="g10ch4-intro">'+typeset(pick(stage.understand?.intro))+'</p>'+
          '<ul class="g10ch4-symbol-list">'+symbolsHtml+'</ul>'+
          (stage.understand?.watchOut?'<p class="g10ch4-watchout">'+typeset(pick(stage.understand.watchOut))+'</p>':'')+
          '<small class="sp2-stage-reference">'+e(labels.ref)+e(stage.section||'')+'</small></section>'+
          '<section class="g10ch4-card" aria-label="'+e(labels.s4)+'"><div class="g10ch4-card-head"><span class="g10ch4-step-pill">4</span><h5 class="g10ch4-card-kicker">'+e(labels.s4)+'</h5></div>'+
          '<ol class="g10ch4-proof-list">'+proofHtml+'</ol></section>'+
          '<section class="g10ch4-card" aria-label="'+e(labels.s5)+'"><div class="g10ch4-card-head"><span class="g10ch4-step-pill">5</span><h5 class="g10ch4-card-kicker">'+e(labels.s5)+'</h5></div>'+
          '<div class="sp2-recall"><p>'+typeset(pick(stage.question))+'</p>'+
          (stage.questionMath?'<div>'+displayMath(stage.questionMath)+'</div>':'')+
          '<div class="sp2-answers" data-answers role="group" aria-label="'+e(pick(stage.question))+'"></div>'+
          '<div class="sp2-recall-actions"><button type="button" data-hint>'+e(ta?'குறிப்பு':'Hint')+'</button>'+
          '<button type="button" data-why aria-expanded="false"'+(stage.explainAfterAttempt?' disabled':'')+'>'+e(ta?'விளக்கம்':'Why?')+'</button></div>'+
          '<p data-feedback role="status" aria-live="polite"></p><div class="sp2-why" data-why-response hidden></div></div></section>'+
          '<section class="g10ch4-card" aria-label="'+e(labels.s6)+'"><div class="g10ch4-card-head"><span class="g10ch4-step-pill">6</span><h5 class="g10ch4-card-kicker">'+e(labels.s6)+'</h5></div>'+
          '<p class="g10ch4-connect-note">'+typeset(pick(stage.connect))+'</p><div class="g10ch4-exercise-row" data-g10ch4-connect></div></section>'+
          '</div>';
        labEngine?.renderGlance(stage,panel.querySelector('[data-g10ch4-glance]'),lang);
        labEngine?.mount(stage,panel.querySelector('[data-g10ch4-visual]'),lang);
        const connectRow=panel.querySelector('[data-g10ch4-connect]');
        const linked=[stage.practiceId,stage.secondaryPracticeId,stage.tertiaryPracticeId]
          .map(id=>id&&chapterQuestions.find(q=>q.id===id)).filter(Boolean);
        if(linked.length&&typeof onQuestion==='function'){
          linked.forEach(qItem=>{
            const button=document.createElement('button');button.type='button';button.className='g10ch2-practice-link';
            button.textContent=labels.tryBtn(qItem);
            button.onclick=()=>onQuestion(qItem);connectRow.append(button);
          });
        }else if(stage.relatedExercise){
          const p=document.createElement('p');p.className='g10ch4-exercise-upcoming';
          p.textContent=labels.upcoming(stage.relatedExercise);
          connectRow.append(p);
        }
      }else{
      const deepItems=stage.deepDive?(stage.deepDive.points?.[lang]||stage.deepDive.points?.en||[]):[];
      const tamilDraftNote=isCh3&&ta
        ?'<p class="g10ch3-tamil-badge" role="note">தமிழ் வரைவு · 2025 பாடநூல் சொற்களுடன் உருவாக்கப்பட்டது (ஆசிரியர் மீளாய்வு நிலுவையில்)</p>':'';
      const deepDiveHtml=deepItems.length
        ?'<details class="g10ch3-deep-dive"><summary>'+e(pick(stage.deepDive.title))+'</summary><ul class="g10ch3-deep-list">'+
          deepItems.map(item=>'<li>'+typeset(item)+'</li>').join('')+'</ul></details>':'';
      panel.innerHTML='<div class="sp2-concept-heading" tabindex="-1"><h4>'+e((i+1)+'. '+pick(stage.title))+'</h4></div>'+
       tamilDraftNote+
       (['g10-ch2-gp-sum','g10-ch2-gcd','g10-ch2-bezout','g10-ch2-gp-infinite','g10-ch2-special'].includes(stage.id)?'':
       '<div class="sp2-formula" role="group" aria-label="'+e(ta?'கணிதக் கருத்து':'Mathematical idea')+'">'+
       (stage.math?.latex?window.TriggleNotation.renderLatex(stage.math.latex,{displayMode:true,fallback:stage.math.fallback||pick(stage.rule)}):typeset(pick(stage.rule)))+'</div>')+
       (stage.visual?'<div data-g10ch2-visual></div>':'')+
       (['g10-ch2-ap-sum','g10-ch2-gp-sum','g10-ch2-bezout','g10-ch2-gp-infinite','g10-ch2-special'].includes(stage.id)?'':
       '<div class="sp2-lesson-note" aria-label="'+e(ta?'கருத்து விளக்கம்':'Concept explanation')+'">'+
       '<p class="sp2-idea">'+typeset(pick(stage.idea))+'</p>'+
       '<p class="sp2-example">'+typeset(pick(stage.example))+'</p>'+
       (stage.exampleMath?'<div class="sp2-example-math">'+displayMath(stage.exampleMath)+'</div>':'')+
       '<small class="sp2-stage-reference">'+e(ta?'பாடநூல் பகுதி ':'Textbook section ')+e(stage.section||'')+'</small></div>')+
       deepDiveHtml+
       (choices.length?'<div class="sp2-recall"><h5>'+e(ta?'நீங்களே முயற்சிக்கவும்':'Try it yourself')+'</h5>'+
       '<p>'+typeset(pick(stage.question))+'</p>'+
       (stage.questionMath?'<div>'+displayMath(stage.questionMath)+'</div>':'')+
       '<div class="sp2-answers" data-answers role="group" aria-label="'+e(pick(stage.question))+'"></div>'+
       '<div class="sp2-recall-actions"><button type="button" data-hint>'+e(ta?'குறிப்பு':'Hint')+'</button>'+
       '<button type="button" data-why aria-expanded="false"'+(stage.explainAfterAttempt?' disabled':'')+'>'+e(ta?'விளக்கம்':'Why?')+'</button></div>'+
       '<p data-feedback role="status" aria-live="polite"></p><div class="sp2-why" data-why-response hidden></div></div>':'');
      if(stage.visual)showG10Ch2Visual(stage,panel.querySelector('[data-g10ch2-visual]'),lang);
      if(stage.video)attachStageVideo(panel,stage,lang);
      const related=stage.practiceId&&chapterQuestions.find(q=>q.id===stage.practiceId);
      const secondary=stage.secondaryPracticeId&&chapterQuestions.find(q=>q.id===stage.secondaryPracticeId);
      if(related&&typeof onQuestion==='function'){
        if(isCh3){
          const row=document.createElement('div');row.className='g10ch3-exercise-row';
          [related,secondary].filter(Boolean).forEach(qItem=>{
            const button=document.createElement('button');button.type='button';button.className='g10ch2-practice-link';
            button.textContent=ta?'பாடநூல் பயிற்சி '+qItem.exercise+'-ஐத் தீர்ப்போம் →':'Try Exercise '+qItem.exercise+' in Triggle →';
            button.onclick=()=>onQuestion(qItem);row.append(button);
          });
          panel.append(row);
        }else{
          const button=document.createElement('button');button.type='button';
          button.className='g10ch2-practice-link';button.textContent=ta?'பாடநூல் பயிற்சியைத் தீர்ப்போம் →':'Try the related textbook exercise →';
          button.onclick=()=>onQuestion(related);panel.append(button);
        }
      }else if(isCh3&&stage.relatedExercise){
        const ref=document.createElement('p');ref.className='g10ch3-exercise-note';
        ref.textContent=(ta?'தொடர்புடைய பாடநூல் பயிற்சி: பயிற்சி ':'Related textbook exercises: Exercise ')+stage.relatedExercise+(ta?' (விரைவில் இணைக்கப்படும்)':' (exercise items coming soon)');
        panel.append(ref);
      }
      }
      const holder=probability||statistics?null:panel.querySelector('[data-answers]');if(holder){
        const whyButton=panel.querySelector('[data-why]');
        const feedback=panel.querySelector('[data-feedback]');
        const response=panel.querySelector('[data-why-response]');
        choices.forEach((choice,j)=>{
          const button=document.createElement('button');button.type='button';button.dataset.choice=String(j);
          button.innerHTML=choice?.math?.latex
            ?window.TriggleNotation.renderLatex(choice.math.latex,{displayMode:false,fallback:choice.math.fallback||pick(choice)})
            :typeset(pick(choice));
          button.setAttribute('aria-label',pick(choice));
          button.setAttribute('aria-pressed','false');
          button.addEventListener('click',()=>{
            holder.querySelectorAll('button').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));
            feedback.textContent=j===stage.correct?(ta?'சரி!':'Correct!'):
              (ta?'மீண்டும் முயற்சிக்கவும். ':'Try again. ')+pick(stage.incorrectFeedback?.[j]||stage.hint);
            whyButton.disabled=false;
          });holder.append(button);
        });
        panel.querySelector('[data-hint]').onclick=()=>{feedback.innerHTML=typeset(pick(stage.hint));};
        whyButton.onclick=()=>{
          if(whyButton.disabled)return;
          if(response.hidden){
            const explanation=typeset(pick(stage.why));
            response.innerHTML=stage.whyMath?explanation+displayMath(stage.whyMath):explanation;
            window.TriggleNotation?.prepare?.(response);
          }
          response.hidden=!response.hidden;
          whyButton.setAttribute('aria-expanded',String(!response.hidden));
        };
      }
      window.TriggleNotation?.prepare?.(panel);
      update();
      if(focus){root.scrollIntoView({block:'start',behavior:'auto'});panel.querySelector('.sp2-concept-heading')?.focus({preventScroll:true});}
    }
    root.querySelector('[data-back-index]').onclick=()=>showIndex(true);
    root.querySelector('[data-footer-prev]').onclick=()=>show(active-1,true);
    root.querySelector('[data-footer-next]').onclick=()=>active===stages.length-1?showIndex(true):show(active+1,true);
    if(hasTopNext)root.querySelector('[data-top-next]').onclick=()=>active===stages.length-1?showIndex(true):show(active+1,true);
    if(Number.isInteger(initialConcept)&&initialConcept>=0&&initialConcept<stages.length)
      show(initialConcept,false,false);
    else showIndex(false,false);
    return true;
  }
  function mount(root,opts){
    if(!root||!opts?.chapter)return;
    const {chapter,grade,lang,section,questions,sources,onSection,onQuestion,onClass,onHome,initialConcept,orderedExercises}=opts;
    const t=texts[lang==='ta'?'ta':'en'];
    const chapterTypeset=s=>typeset(grade===9?(window.TriggleG9Math?.text(s)??s):s);
    const text=obj=>typeof obj==='string'?obj:(obj?.[lang]||obj?.en||'');
    const sets=categorized(questions); // Examples stay archived in source, outside student navigation.
    const matrixConcepts=chapter.id==='g12-ch1'&&lang==='en'&&window.TriggleMatrixConcepts;
    const statistics=chapter.id==='g9-ch8'&&window.TriggleStatisticsConcepts;
    const stages=statistics?(window.TRIGGLE_STATISTICS_LESSONS||[]):chapter.id==='g9-ch1'?(window.TRIGGLE_SET_PATH?.stages||[]):chapter.id==='g9-ch2'?(window.TRIGGLE_REAL_PATH?.stages||[]):chapter.id==='g9-ch9'?(window.TRIGGLE_PROB_PATH?.stages||[]):chapter.id==='g10-ch2'?(window.TRIGGLE_G10_CH2_PATH?.stages||[]):chapter.id==='g10-ch3'?(window.TRIGGLE_G10_CH3_PATH?.stages||[]):chapter.id==='g10-ch4'?(window.TRIGGLE_G10_CH4_PATH?.stages||[]):chapter.id==='g10-ch5'?(window.TRIGGLE_G10_CH5_PATH?.stages||[]):chapter.id==='g10-ch6'?(window.TRIGGLE_G10_CH6_PATH?.stages||[]):matrixConcepts?matrixConcepts.scenes:[];
    const activityEntries=window.TRIGGLE_TEXTBOOK_TASKS?.[chapter.id]||[];
    const kinds=statistics?['concepts','exercises']:activityEntries.length?[...baseKinds,'activities']:baseKinds;
    const counts={concepts:stages.length,examples:sets.examples.length,exercises:sets.exercises.length,quizzes:(statistics||matrixConcepts||chapter.id==='g10-ch2'||chapter.id==='g10-ch3'||chapter.id==='g10-ch4'||chapter.id==='g10-ch5'||chapter.id==='g10-ch6')?0:stages.length,activities:activityEntries.length};
    const symbols={concepts:'◇',examples:'∑',exercises:'✎',quizzes:'✓',activities:'💡'};
    const available={concepts:stages.length>0,examples:counts.examples>0,exercises:counts.exercises>0,quizzes:counts.quizzes>0,activities:counts.activities>0};
    const labelFor=kind=>({concepts:t.concepts,examples:t.examples,exercises:t.exercises,quizzes:t.quizzes,activities:t.activities})[kind];
    const noteFor=kind=>({concepts:t.conceptsHint,examples:t.examplesHint,exercises:t.exercisesHint,quizzes:t.quizzesHint,activities:t.activitiesHint})[kind];
    const countFor=kind=>available[kind]?
      counts[kind]+' '+(kind==='concepts'?t.available:kind==='examples'?t.worked:kind==='quizzes'?t.checks:t.questions):t.soon;
    root.replaceChildren();
    root.classList.add('chapter-hub');
     root.dataset.hubSection=section||'overview';
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
    // Activities and quizzes open straight into the first question.
    // Keep the heading available to assistive tech without a redundant
    // multi-line visible introduction above the actual learning activity.
    if(section==='activities'||section==='quizzes'||section==='concepts')heading.classList.add('hub-heading-a11y');
    // The Class switcher appears in the breadcrumb. Do not repeat Class
    // and the chapter name in multiple stacked headings on the hub.
    const chapterNumber=(lang==='ta'?'அத்தியாயம் ':'Chapter ')+chapter.number;
    heading.innerHTML='<p class="hub-eyebrow">'+e(chapterNumber+(section?' · '+text(chapter.title):''))+'</p>'+
      '<h2 id="chapterOverviewTitle">'+e(pageTitle)+'</h2>';
    root.append(heading);
    if(!section){
      const grade9Pilot=chapter.id==='g9-ch1'||chapter.id==='g9-ch2';
      if(grade9Pilot){
        const breakdown=document.createElement('p');
        breakdown.className='hub-question-breakdown';
        breakdown.textContent=t.questionBreakdown(questions.length,counts.examples,counts.exercises,counts.quizzes);
        root.append(breakdown);
      }
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
      // Keep honest editorial status visible, without pushing the section cards
      // below a second introduction and a large callout.
      const metadata=document.createElement('p');metadata.className='hub-stage-note';
      metadata.textContent=grade9Pilot?t.learningStatus:t.sectionStatus;
      root.append(metadata);
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
        if(matrixConcepts){
          heading.classList.add('hub-heading-a11y');
          matrixConcepts.mount(panel,{initialConcept,onConcept:opts.onConcept,onExercises:()=>onSection('exercises'),
            availableExercises:[...new Set(sets.exercises.map(q=>q.exercise))],
            onExercise:exercise=>{const q=sets.exercises.find(item=>item.exercise===exercise);if(q)onQuestion(q);}
          });
          return;
        }
        // Concept screens start with the index or the mathematical interaction.
        // No chapter title, marketing paragraph, progress count or second navigation row.
        if(chapter.id==='g9-ch2'&&window.TriggleRealJourney){
          window.TriggleRealJourney.mount(panel,chapter,lang,()=>onSection(null),initialConcept,opts.onConcept);
        }else if(statistics||chapter.id==='g9-ch9'||chapter.id==='g10-ch2'||chapter.id==='g10-ch3'||chapter.id==='g10-ch4'||chapter.id==='g10-ch5'||chapter.id==='g10-ch6'){
          const stageQuestions=questions.filter(q=>!/^\s*Example\b/i.test(q.label?.en||''));
          mountStageJourney(panel,stages,lang,initialConcept,opts.onConcept,onQuestion,stageQuestions,chapter.id==='g10-ch2'||chapter.id==='g10-ch3'||chapter.id==='g10-ch4'||chapter.id==='g10-ch5'||chapter.id==='g10-ch6',statistics);
        }else{
          window.TriggleSetJourney?.mount(panel,chapter,lang,()=>onSection(null),initialConcept,opts.onConcept);
        }
        // Textbook Thinking Corners and Activities are a separate chapter destination,
        // not a repeated appendix on the Concepts page.
      }else{info(t.noneConcept);}
    }
    if(section==='activities'&&activityEntries.length&&window.TriggleTextbookActivities){
      window.TriggleTextbookActivities.mount(panel,chapter,lang);
    }
    if(section==='exercises'){
      // One index of exercise numbers per chapter. No huge question catalog.
      const selected=Array.isArray(orderedExercises)&&orderedExercises.length?orderedExercises:sets.exercises;
      if(!selected.length){
        info(t.noneExercises);
      }else{
        const buckets=new Map();
        for(const item of selected){
          const key=String(item.exercise||'').trim();
          if(!key)continue;
          if(!buckets.has(key))buckets.set(key,[]);
          buckets.get(key).push(item);
        }
        const keys=[...buckets.keys()].sort((a,b)=>{
          const unit=a.includes('unit'),unitB=b.includes('unit');
          return unit!==unitB?(unit?1:-1):a.localeCompare(b,undefined,{numeric:true});
        });
        const index=document.createElement('nav');
        index.className='hub-exercise-index';
        index.setAttribute('aria-label',t.exercises);
        for(const key of keys){
          const items=buckets.get(key);
          const unit=/^Unit Exercise\b/i.test(items[0].label?.en||'')||key.includes('unit');
          const num=key.match(/\d+/)?.[0]||'';
          const name=unit?(t.unitExercise+(num?' '+num:'')):(t.exerciseSingle+' '+key);
          const button=document.createElement('button');
          button.type='button';button.className='hub-exercise-link';button.dataset.exercise=key;
          const label=document.createElement('strong');label.textContent=name;
          const count=document.createElement('small');count.textContent=items.length+' '+t.questions+' '+t.available;
          const arrow=document.createElement('span');arrow.className='hub-exercise-arrow';arrow.textContent='›';arrow.setAttribute('aria-hidden','true');
          button.append(label,count,arrow);
          button.setAttribute('aria-label',name+' · '+count.textContent);
          button.addEventListener('click',()=>onQuestion(items[0]));
          index.append(button);
        }
        panel.append(index);
      }
    }
    if(section==='quizzes'){
      if(!stages.length||statistics){
        info(t.noQuiz);
      }else{
        const status=document.createElement('p');status.className='hub-quiz-progress';
        status.setAttribute('role','status');status.setAttribute('aria-live','polite');
        panel.append(status);
        const correct=new Set();
        const update=()=>{status.textContent=t.progress+': '+correct.size+' / '+stages.length;};
        stages.forEach((stage,index)=>{
          const article=document.createElement('article');article.className='hub-quiz-question';
          const h=document.createElement('h4');h.innerHTML=e((index+1)+'. ')+chapterTypeset(text(stage.question));article.append(h);
          if(stage.questionMath)h.insertAdjacentHTML('afterend',displayMath(stage.questionMath));
          const answers=document.createElement('div');answers.className='hub-quiz-answers';answers.setAttribute('role','group');
          answers.setAttribute('aria-label',text(stage.question));
          const feedback=document.createElement('p');feedback.setAttribute('aria-live','polite');feedback.className='hub-quiz-feedback';
          const worked=document.createElement('div');worked.hidden=Boolean(stage.explainAfterAttempt);
          worked.innerHTML='<p>'+chapterTypeset(text(stage.why))+'</p>'+(stage.whyMath?displayMath(stage.whyMath):'');
          let wrongAttempts=0;
          stage.choices.forEach((choice,i)=>{
            const button=document.createElement('button');button.type='button';button.innerHTML=chapterTypeset(text(choice));if(grade===9)button.setAttribute('aria-label',text(choice));
            button.addEventListener('click',()=>{
              answers.querySelectorAll('button').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));
              worked.hidden=false;
              const right=i===stage.correct;
              if(right){feedback.textContent=t.correct;correct.add(stage.id);update();}
              else{wrongAttempts++;const clue=stage.incorrectFeedback?.[i]?text(stage.incorrectFeedback[i]):wrongAttempts===2?text(stage.hint):wrongAttempts>=3?text(stage.why):'';feedback.innerHTML=e(t.incorrect)+(clue?' '+chapterTypeset(clue):'');}
            });
            answers.append(button);
          });
          const details=document.createElement('details');details.className='hub-quiz-help';
          details.innerHTML='<summary>'+e(t.hint)+'</summary><p>'+chapterTypeset(text(stage.hint))+'</p>';
          details.append(worked);
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
  window.TriggleChapterHub=Object.freeze({mount,categorized,textbookExercises});
})();
