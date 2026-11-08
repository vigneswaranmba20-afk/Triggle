(()=>{'use strict';
 const $=id=>document.getElementById(id);
 const tr=x=>x && typeof x==='object' ? (x[lang]||x.en||'') : String(x||'');
 const dictionary={
 en:{yourClass:'YOUR CLASS',exploreExercise:'Find an exercise',saveNote:'Your progress stays on this device',openBasics:'Interactive basics',browse:'Exercises',basics:'Trigonometry Basics',studyMode:'YOUR LEARNING SPACE',diagram:'Figure',stepByStep:'HOW IT WORKS',quickSolution:'Quick solution',explainSlowly:'Detailed explanation',learnStepByStep:'LEARN THE REASONING',backToQuestion:'Return to question page',expandFigure:'Tap to enlarge diagram ↗',inlineFigureNote:'Reconstructed from the measurements in this question, not copied from the textbook.',finalAnswer:'Final answer',markDone:'Mark learned',learned:'Learned',previous:'Previous',nextQuestion:'Next question',source:'Reference ↗',classic:'Original Class 9 interface',visualGuide:'VISUAL EXPLANATION',close:'Close',typeBook:'Book-referenced · edition check',typePractice:'Original Triggle practice',class:'Class',search:'Search exercise, question...',subtitle:'Choose a topic, understand every step, go at your own pace.',nextStep:'Next step',showAll:'Show full solution',answer:'Show final answer',complete:'Solution complete',empty:'No lessons match your search.',noteBook:'Textbook question references were cross-checked against public listings. Editions can differ; compare with your prescribed book.',noteOld:'Class 9 exercises reference an earlier textbook edition. Verify numbering against your school copy.',notePractice:'Original Triggle practice — not a numbered textbook question.',lessons:'lessons',question:'Question',practice:'Practice',reference:'Reference',step:'Step',of:'of'},
 ta:{yourClass:'உங்கள் வகுப்பு',exploreExercise:'பயிற்சியைத் தேடுங்கள்',saveNote:'உங்கள் முன்னேற்றம் இந்த சாதனத்தில் மட்டும் சேமிக்கப்படும்',openBasics:'காட்சி அடிப்படைகள்',browse:'பயிற்சிகள்',basics:'முக்கோணவியல் அடிப்படைகள்',studyMode:'கற்றல் பகுதி',diagram:'படம்',stepByStep:'தீர்வு விளக்கம்',quickSolution:'சுருக்கமான தீர்வு',explainSlowly:'விரிவான விளக்கம்',learnStepByStep:'ஒவ்வொரு படியின் காரணம்',backToQuestion:'வினா பக்கத்திற்குத் திரும்பு',expandFigure:'படத்தைப் பெரிதாக்க ↗',inlineFigureNote:'கேள்வியின் அளவுகளிலிருந்து மீண்டும் வரையப்பட்டது; பாடநூலிலிருந்து நகலெடுக்கவில்லை.',finalAnswer:'இறுதி விடை',markDone:'கற்றதாகக் குறி',learned:'கற்றுவிட்டேன்',previous:'முந்தையது',nextQuestion:'அடுத்த கேள்வி',source:'குறிப்பு ↗',classic:'வகுப்பு 9 பழைய தோற்றம்',visualGuide:'காட்சி விளக்கம்',close:'மூடு',typeBook:'பாடநூல் குறிப்பு · பதிப்பு சரிபார்க்கவும்',typePractice:'டிரிகிள் உருவாக்கிய பயிற்சி',class:'வகுப்பு',search:'பயிற்சி, கேள்வியைத் தேட...',subtitle:'ஒரு தலைப்பைத் தேர்ந்தெடுத்து படிப்படியாக எளிதில் கற்றுக்கொள்ளுங்கள்.',nextStep:'அடுத்த படி',showAll:'முழுத் தீர்வைக் காட்டு',answer:'இறுதி விடையைக் காட்டு',complete:'தீர்வு முடிந்தது',empty:'இந்தத் தேடலுக்கான பாடங்கள் இல்லை.',noteBook:'பொது பட்டியலில் பாடநூல் வினா விவரங்கள் சரிபார்க்கப்பட்டன. உங்கள் பள்ளிப் புத்தகப் பதிப்புடன் ஒப்பிடுங்கள்.',noteOld:'வகுப்பு 9 பயிற்சிகள் முந்தைய பாடநூல் பதிப்பைச் சார்ந்தவை. உங்கள் புத்தக எண்ணிடலைச் சரிபார்க்கவும்.',notePractice:'இது டிரிகிள் உருவாக்கிய பயிற்சி; பாடநூல் வினா எண் அல்ல.',lessons:'பாடங்கள்',question:'வினா',practice:'பயிற்சி',reference:'குறிப்பு',step:'படி',of:'இல்'} };
 Object.assign(dictionary.en,{searchOptional:'Search (optional)',browse:'Chapters',exploreExercise:'Chapters and sections',search:'Search chapters, exercises, questions…',chapter:'Chapter',chapters:'chapters',overview:'Chapter overview',planned:'Planned',drafting:'Drafting',review:'In review',published:'Published',existingQuestions:'Existing questions',chapterNotComplete:'Existing questions are available for practice. Their presence does not mean this chapter is complete or reviewed.',contentPlanned:'Full chapter content is planned. Learning sections will appear after writing and review.',noQuestions:'Questions for this chapter are planned.',terminologyPending:'Tamil textbook terminology needs verification.',terminologyVerified:'Tamil textbook terminology verified.',concepts:'Concepts',prerequisites:'Prerequisites',workedExamples:'Worked examples',exercises:'Exercises',quizzes:'Quizzes',unitExercise:'Unit Exercise',chooseLanguage:'Language',closeNavigation:'Close navigation',navigationLabel:'Class, chapter and exercise navigation',searchLabel:'Search chapters and questions',visualMathematics:'VISUAL MATHEMATICS',questionContext:'View full question here',questionContextClose:'Hide full question',questionContextHint:'Opens here · your learning step stays the same',questionContextHideHint:'Continue with the step below',previousStage:'Previous',nextConcept:'Next concept',textbookReferences:'Textbook references',edition:'Edition',locator:'Location in textbook',englishMedium:'English medium',tamilMedium:'Tamil medium',archivedReference:'Archived textbook references; compare with the edition prescribed by your school.',figureLabel:'Open a relevant mathematics diagram',chooseExplanation:'Choose how much explanation to see',completeSolution:'Complete quick solution',workedSolution:'Worked solution',navigateQuestions:'Navigate questions',switchClass:'Switch school class',currentConcept:'Current learning concept',learningStages:'Understand deeply stages',chooseStage:'Go to a learning stage',diagramDialog:'Mathematics diagram',reviewState:'Review state',unreviewed:'Not reviewed',in_review:'In review',approved:'Approved',home:'Home',browse:'Find a topic'});
 Object.assign(dictionary.ta,{searchOptional:'தேடல் (விருப்பப்படி)',browse:'அத்தியாயங்கள்',exploreExercise:'அத்தியாயங்களும் பகுதிகளும்',search:'அத்தியாயம், பயிற்சி, வினாவைத் தேட…',chapter:'அத்தியாயம்',chapters:'அத்தியாயங்கள்',overview:'அத்தியாயக் கண்ணோட்டம்',planned:'திட்டமிடப்பட்டுள்ளது',drafting:'எழுதப்படுகிறது',review:'மீளாய்வில் உள்ளது',published:'வெளியிடப்பட்டது',existingQuestions:'ஏற்கெனவே உள்ள வினாக்கள்',chapterNotComplete:'ஏற்கெனவே உள்ள வினாக்களைப் பயிற்சி செய்யலாம். வினாக்கள் இருப்பதால் மட்டும் இந்த அத்தியாயம் முழுமையானது அல்லது மீளாய்வு செய்யப்பட்டது என்று பொருளல்ல.',contentPlanned:'முழு அத்தியாய உள்ளடக்கம் திட்டமிடப்பட்டுள்ளது. கற்றல் பகுதிகள் எழுதப்பட்டு மீளாய்வு செய்யப்பட்டதும் இங்கே இடம்பெறும்.',noQuestions:'இந்த அத்தியாயத்திற்கான வினாக்கள் திட்டமிடப்பட்டுள்ளன.',terminologyPending:'தமிழ்வழிப் பாடநூல் கலைச்சொற்கள் சரிபார்க்கப்பட வேண்டும்.',terminologyVerified:'தமிழ்வழிப் பாடநூல் கலைச்சொற்கள் சரிபார்க்கப்பட்டுள்ளன.',concepts:'கருத்துகள்',prerequisites:'முன்தேவைகள்',workedExamples:'தீர்க்கப்பட்ட எடுத்துக்காட்டுகள்',exercises:'பயிற்சிகள்',quizzes:'குறுவினாத் தேர்வுகள்',unitExercise:'தொகுப்புப் பயிற்சி',chooseLanguage:'மொழி',closeNavigation:'வழிசெலுத்தலை மூடு',navigationLabel:'வகுப்பு, அத்தியாயம் மற்றும் பயிற்சி வழிசெலுத்தல்',searchLabel:'அத்தியாயங்களையும் வினாக்களையும் தேடுக',visualMathematics:'காட்சி வழிக் கணிதம்',questionContext:'முழு வினாவை இங்கே பார்க்க',questionContextClose:'வினாவை மறைக்க',questionContextHint:'இங்கேயே திறக்கும் · இந்தப் படியிலேயே இருப்பீர்கள்',questionContextHideHint:'கீழே உள்ள படியில் தொடரலாம்',previousStage:'முந்தையது',nextConcept:'அடுத்த கருத்து',textbookReferences:'பாடநூல் குறிப்புகள்',edition:'பதிப்பு',locator:'பாடநூலில் உள்ள இடம்',englishMedium:'ஆங்கிலவழி',tamilMedium:'தமிழ்வழி',archivedReference:'காப்பகப் பாடநூல் குறிப்புகள்; உங்கள் பள்ளி பரிந்துரைக்கும் பதிப்புடன் ஒப்பிடுங்கள்.',figureLabel:'பொருத்தமான கணிதப் படத்தைத் திற',chooseExplanation:'விளக்கத்தின் அளவைத் தேர்வு செய்க',completeSolution:'முழுமையான சுருக்கத் தீர்வு',workedSolution:'தீர்வு விளக்கம்',navigateQuestions:'வினாக்களுக்குச் செல்லவும்',switchClass:'வகுப்பை மாற்றவும்',currentConcept:'தற்போதைய கற்றல் கருத்து',learningStages:'ஆழமாகப் புரிந்துகொள்ளும் நிலைகள்',chooseStage:'கற்றல் நிலைக்குச் செல்லவும்',diagramDialog:'கணிதப் படம்',reviewState:'மீளாய்வு நிலை',unreviewed:'மீளாய்வு செய்யப்படவில்லை',in_review:'மீளாய்வில் உள்ளது',approved:'ஏற்கப்பட்டது',home:'முகப்பு',browse:'தலைப்பைத் தேடுக'});
 const ui=k=>dictionary[lang][k]||dictionary.en[k]||k;
 const classes=window.TRIGGLE_CLASSES||{};
 for(const key of [9,10,11,12]){if(!classes[key]||!Array.isArray(classes[key].items))throw Error('Missing data for class '+key);}
 const curriculum=window.TRIGGLE_CURRICULUM;
 if(!curriculum?.grades)throw Error('Missing curriculum metadata');
 const chapterList=()=>curriculum.grades.find(g=>g.grade===grade)?.chapters||[];
 const chapterForItem=item=>chapterList().find(c=>c.legacyQuestionIds.includes(item.id))||chapterList().find(c=>String(c.number)===String(item.chapter));
 const chapterItems=chapter=>{const ids=new Set([...(chapter.legacyQuestionIds||[]),...(chapter.textbookQuestionIds||[])]);return classes[grade].items.filter(item=>ids.has(item.id));};
 const selectedChapter=()=>homeView||classIndex?null:(chapterOverview||chapterForItem(current));
 const load=(key,other)=>{try{const v=JSON.parse(localStorage.getItem(key));return v===null?other:v}catch{return other}};
 const store=(key,value)=>{try{localStorage.setItem(key,JSON.stringify(value))}catch{}};
 const completed=new Set(load('triggle.learned.v119',[]));
 const lastByGrade=load('triggle.lastByGrade.v119',{});
 let lang='en';try{const saved=localStorage.getItem('triggle-language');if(saved==='ta'||saved==='"ta"')lang='ta'}catch{}
 const url=new URL(location.href), requested=Number(url.searchParams.get('class'));
 let grade=classes[requested]?requested:9;
 let current=classes[grade].items.find(x=>x.id===url.searchParams.get('question'))||classes[grade].items.find(x=>x.id===lastByGrade[grade])||classes[grade].items[0];
 let chapterOverview=url.searchParams.has('question')?null:chapterList().find(c=>c.id===url.searchParams.get('chapter'))||null;
 let homeView=!url.searchParams.has('class')&&!url.searchParams.has('question')&&!url.searchParams.has('chapter');
 let classIndex=!homeView&&!url.searchParams.has('question')&&!url.searchParams.has('chapter');
 const validSections=new Set(['concepts','examples','exercises','quizzes','sources']);
 let chapterSection=chapterOverview&&validSections.has(url.searchParams.get('section'))?url.searchParams.get('section'):null;
 let conceptIndex=chapterSection==='concepts'&&/^\d+$/.test(url.searchParams.get('concept')||'')?Number(url.searchParams.get('concept')):null;
 let questionOrigin=null;
 let drawerOpen=false;
 const reduced=matchMedia('(prefers-reduced-motion:reduce)');
 const mobile=matchMedia('(max-width:800px)');
 function esc(str){return String(str??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
 function math(str){
  // Local typesetting: accessible group exponents and no cloud requests.
  return window.TriggleNotation ? window.TriggleNotation.render(str) : esc(str);
 }

 const activeList=()=>classes[grade].items;
 const currentIndex=()=>activeList().findIndex(i=>i.id===current.id);
 const num=n=>String(n).padStart(2,'0');
 const labelForGroup=(e)=>e.endsWith('.examples')?(lang==='ta'?'எடுத்துக்காட்டுகள்':'Worked examples'):(e.includes('practice')?ui('practice')+' '+e.split('.')[0]:(e.endsWith('.unit')?ui('unitExercise')+' '+e.split('.')[0]:(lang==='ta'?'பயிற்சி ':'Exercise ')+e));
 function updateUrl(replace=false){
  const u=new URL(location.href);
  ['class','chapter','question','browse','section','concept'].forEach(k=>u.searchParams.delete(k));
  if(!homeView){
    u.searchParams.set('class',String(grade));
    if(classIndex)u.searchParams.set('browse','chapters');
    else if(chapterOverview){
      u.searchParams.set('chapter',chapterOverview.id);
      if(chapterSection){u.searchParams.set('section',chapterSection);
        if(chapterSection==='concepts'&&Number.isInteger(conceptIndex))u.searchParams.set('concept',String(conceptIndex));
      }
    }
    else u.searchParams.set('question',current.id);
  }
  try{history[replace?'replaceState':'pushState']({
    grade,home:homeView,index:classIndex,
    question:!homeView&&!classIndex&&!chapterOverview?current.id:null,
    chapter:chapterOverview?.id||null
  },'',u.pathname+u.search+u.hash)}catch{}
 }
 function remember(){
   if(homeView||classIndex||chapterOverview)return;
   lastByGrade[grade]=current.id;store('triggle.lastByGrade.v119',lastByGrade);
 }
 function resetScroll(){
  // Both the workspace and the mobile lesson container can scroll.
  const workspace=document.querySelector('.workspace');
  const content=document.querySelector('.lesson-container');
  if(workspace)workspace.scrollTop=0;
  if(content)content.scrollTop=0;
  window.scrollTo({top:0,behavior:'instant'});
 }
 function goHome(){
   homeView=true;classIndex=false;chapterOverview=null;chapterSection=null;conceptIndex=null;
   updateUrl();render();closeDrawer();resetScroll();
   $('discoveryView').focus({preventScroll:true});
 }
 function changeGrade(g){
   g=Number(g);if(!classes[g])return;
   grade=g;homeView=false;classIndex=true;chapterOverview=null;chapterSection=null;conceptIndex=null;questionOrigin=null;
   current=classes[g].items.find(x=>x.id===lastByGrade[g])||classes[g].items[0];
   $('search').value='';updateUrl();render();closeDrawer();resetScroll();
   $('discoveryView').focus({preventScroll:true});
 }
 function selectLesson(item){
   const wasQuestion=!homeView&&!classIndex&&!chapterOverview;
   if(wasQuestion&&item.id===current.id){closeDrawer();return;}
   if(chapterOverview)questionOrigin={grade,chapterId:chapterOverview.id,section:chapterSection};
   else if(!wasQuestion)questionOrigin=null;
   homeView=false;classIndex=false;chapterOverview=null;chapterSection=null;conceptIndex=null;current=item;
   updateUrl();remember();render();closeDrawer();resetScroll();
   $('lessonCard').focus({preventScroll:true});
 }
 function selectChapter(chapter){
   homeView=false;classIndex=false;chapterOverview=chapter;chapterSection=null;conceptIndex=null;
   updateUrl();render();closeDrawer();resetScroll();
   $('chapterOverview').focus({preventScroll:true});
 }
 function openChapterSection(section,chapter=chapterOverview,concept=null){
   if(!chapter||!validSections.has(section)&&section!==null)return;
   homeView=false;classIndex=false;chapterOverview=chapter;
   chapterSection=section;conceptIndex=Number.isInteger(concept)?concept:null;
   updateUrl();render();closeDrawer();resetScroll();
   $('chapterOverview').focus({preventScroll:true});
 }
 function openChapterFor(g,chapter){
   if(!classes[g])return;
   grade=g;current=classes[g].items.find(x=>x.id===lastByGrade[g])||classes[g].items[0];
   selectChapter(chapter);
 }
 function openQuestionFor(g,item){
   if(!classes[g])return;
   grade=g;homeView=false;classIndex=false;chapterOverview=null;chapterSection=null;conceptIndex=null;questionOrigin=null;current=item;
   updateUrl();remember();render();closeDrawer();resetScroll();
   $('lessonCard').focus({preventScroll:true});
 }

 function navMove(delta){if(homeView||classIndex||chapterOverview)return;const list=activeList(),i=currentIndex()+delta;if(i<0||i>=list.length)return;selectLesson(list[i])}

 function renderBreadcrumb(chapter){
   const nav=$('crumb');nav.replaceChildren();
   const choices=[{text:ui('class')+' '+grade,type:'class'},{text:tr(chapter),type:'chapter'}];if(!chapterOverview)choices.push({text:labelForGroup(current.exercise),type:'exercise'});
   choices.forEach((c,i)=>{
     if(i){const sep=document.createElement('span');sep.className='crumb-sep';sep.textContent='›';sep.setAttribute('aria-hidden','true');nav.append(sep)}
     const b=document.createElement('button');b.type='button';b.className='crumb-link';b.innerHTML=esc(c.text)+' <span aria-hidden="true">⌄</span>';
     b.title=(lang==='ta'?'தேர்வு':'Choose')+' '+c.text;b.setAttribute('aria-label',b.title);
     b.onclick=()=>openPath(c.type);nav.append(b)
   });
 }
 function openPath(type){
   const dialog=$('pathDialog'),list=$('pathOptions');list.replaceChildren();
   const names={en:{class:'Choose a class',chapter:'Choose a chapter',exercise:'Choose an exercise'},ta:{class:'வகுப்பைத் தேர்வு செய்க',chapter:'அத்தியாயத்தைத் தேர்வு செய்க',exercise:'பயிற்சியைத் தேர்வு செய்க'}};
   $('pathTitle').textContent=names[lang][type];
   const options=[];
   if(type==='class'){
     [9,10,11,12].forEach(g=>options.push({title:ui('class')+' '+g,meta:classes[g].items.length+' '+ui('lessons'),active:g===grade,choose:()=>changeGrade(g)}));
   }else if(type==='chapter'){
     chapterList().forEach(c=>options.push({title:ui('chapter')+' '+c.number+' · '+tr(c.title),meta:ui(c.status)+' · '+chapterItems(c).length+' '+ui('existingQuestions'),active:c.id===selectedChapter()?.id,choose:()=>selectChapter(c)}));
   }else{
     const group=new Map();activeList().filter(i=>i.chapter===current.chapter).forEach(i=>{const k=i.exercise;if(!group.has(k))group.set(k,{key:k,count:0,first:i});group.get(k).count++});
     [...group.values()].forEach(g=>options.push({title:labelForGroup(g.key),meta:g.count+' '+ui('lessons'),active:g.key===current.exercise,choose:()=>selectLesson(g.first)}));
     activeList().filter(i=>i.chapter===current.chapter).forEach(item=>options.push({title:tr(item.label)+' · '+tr(item.title),meta:labelForGroup(item.exercise),active:item.id===current.id,choose:()=>selectLesson(item)}));
   }
   options.forEach(option=>{const button=document.createElement('button');button.type='button';button.className='path-option'+(option.active?' selected':'');button.innerHTML='<span><strong>'+esc(option.title)+'</strong><small>'+esc(option.meta)+'</small></span><span aria-hidden="true">'+(option.active?'✓':'›')+'</span>';
     button.onclick=()=>{dialog.close();option.choose()};list.append(button)
   });
   dialog.showModal();
 }
 function renderGrades(){const data=[{num:9,icon:'◈'},{num:10,icon:'◈'},{num:11,icon:'◈'},{num:12,icon:'◈'}];
  for(const type of ['side','dock']){
   const where=$(type==='side'?'sideClasses':'classDock');where.replaceChildren();
   for(const g of data){const b=document.createElement('button');b.type='button';b.className=type==='side'?'side-grade':'dock-grade';b.classList.toggle('active',!homeView&&grade===g.num);b.setAttribute('aria-pressed',String(!homeView&&grade===g.num));b.setAttribute('aria-label',ui('class')+' '+g.num);b.innerHTML=type==='side'?'<span>'+ui('class')+'</span><b>'+g.num+'</b>':'<strong>'+g.num+'</strong><span>'+ui('class')+'</span>';b.addEventListener('click',()=>changeGrade(g.num));where.append(b);}
  }
 }
 const expanded=new Set();
 function renderList(){
   const query=$('search').value.trim().toLocaleLowerCase();
   const container=$('exerciseList');container.replaceChildren();
   const menuNames=lang==='ta'
     ?{concepts:'கருத்துகள்',examples:'தீர்க்கப்பட்ட எடுத்துக்காட்டுகள்',exercises:'பயிற்சிகள்',quizzes:'சிறு தேர்வுகள்'}
     :{concepts:'Concepts',examples:'Worked Examples',exercises:'Exercises',quizzes:'Quizzes'};
   const matches=item=>[item.label?.en,item.label?.ta,item.title?.en,item.title?.ta,item.q?.en,item.q?.ta,item.topic?.en,item.topic?.ta,item.exercise].join(' ').toLocaleLowerCase().includes(query);
   let visible=0;
   for(const chapter of chapterList()){
     const all=chapterItems(chapter);
     const hit=!!query&&[chapter.title.en,chapter.title.ta,String(chapter.number)].join(' ').toLocaleLowerCase().includes(query);
     const found=query&&!hit?all.filter(matches):all;
     if(query&&!hit&&!found.length)continue;
     visible++;
     const section=document.createElement('section');section.className='curriculum-chapter';
     const selected=selectedChapter()?.id===chapter.id;
     const button=document.createElement('button');button.type='button';button.className='chapter-link';
     button.dataset.chapterId=chapter.id;button.classList.toggle('active',selected);
     button.setAttribute('aria-current',selected?'true':'false');
     const title=document.createElement('strong');title.textContent=ui('chapter')+' '+chapter.number+' · '+tr(chapter.title);
     const meta=document.createElement('small');
     meta.textContent=(chapter.id==='g9-ch1'?(lang==='ta'?'7 செயல்வழிக் கருத்துகள்':'7 interactive concepts')+' · ':'')+
       all.length+' '+ui('existingQuestions');
     button.append(title,meta);button.onclick=()=>selectChapter(chapter);section.append(button);
     if(selected&&!query){
       const quick=document.createElement('div');quick.className='sidebar-chapter-sections';
       for(const key of ['concepts','examples','exercises','quizzes']){
         const direct=document.createElement('button');direct.type='button';direct.dataset.section=key;
         direct.textContent=menuNames[key]+' '+(key==='exercises'&&all.length?'('+all.length+')':'');
         direct.classList.toggle('active',chapterOverview?.id===chapter.id&&chapterSection===key);
         direct.addEventListener('click',()=>openChapterSection(key,chapter));
         quick.append(direct);
       }
       section.append(quick);
     }
     if(query){
       const result=hit?all:found;
       const wrap=document.createElement('div');wrap.className='sidebar-search-results';
       for(const item of result.slice(0,40)){
         const b=document.createElement('button');b.type='button';b.className='exercise-question';
         b.dataset.questionId=item.id;b.textContent=tr(item.label)+' · '+tr(item.title);
         b.addEventListener('click',()=>selectLesson(item));wrap.append(b);
       }
       section.append(wrap);
     }
     container.append(section);
   }
   $('sideCount').textContent=visible+' '+ui('chapters');
   if(!visible){const msg=document.createElement('p');msg.className='empty-search';msg.textContent=ui('empty');container.append(msg);}
 }

 function renderOverview(chapter){
  const container=$('chapterOverview');container.replaceChildren();
  if(window.TriggleChapterHub){
    window.TriggleChapterHub.mount(container,{
      chapter,grade,lang,section:chapterSection,questions:chapterItems(chapter),
      sources:curriculum.sources||[],initialConcept:conceptIndex,
      onSection:(key)=>openChapterSection(key,chapter),
      onQuestion:selectLesson,onClass:()=>changeGrade(grade),onHome:goHome
    });
    return;
  }
  const top=document.createElement('div');top.className='chapter-overview-top';
  const eyebrow=document.createElement('p');eyebrow.className='eyebrow';eyebrow.textContent=ui('overview')+' · '+ui('chapter')+' '+chapter.number;
  const heading=document.createElement('h2');heading.id='chapterOverviewTitle';heading.textContent=tr(chapter.title);
  const status=document.createElement('span');status.className='chapter-status';status.dataset.status=chapter.status;status.textContent=ui(chapter.status);top.append(eyebrow,heading,status);
  if(chapter.id==='g9-ch1'){
    const pilot=document.createElement('span');pilot.className='sp2-pilot-note';
    pilot.textContent=lang==='ta'?'7 சிறு பாடங்கள் செயல்பாட்டில்':'7 interactive mini-lessons live';
    top.append(pilot);
  }
  container.append(top);
  const fast=document.createElement('nav');
  fast.className='chapter-fastnav';
  fast.setAttribute('aria-label',lang==='ta'?'அத்தியாயத்திற்குள் நேராகச் செல்ல':'Jump within this chapter');
  const jumpLabel=document.createElement('label');
  jumpLabel.htmlFor='chapterJumpSelect';
  jumpLabel.textContent=lang==='ta'?'கருத்து, பயிற்சி அல்லது வினாவிற்குச் செல்ல':'Go directly to a concept, exercise or question';
  const jump=document.createElement('select');
  jump.id='chapterJumpSelect';jump.setAttribute('aria-label',jumpLabel.textContent);
  const addJump=(parent,value,title)=>{
    const opt=document.createElement('option');opt.value=value;opt.textContent=title;parent.append(opt);
  };
  addJump(jump,'',lang==='ta'?'செல்ல வேண்டிய பகுதியைத் தேர்ந்தெடுக்கவும்…':'Choose where to go…');
  if(chapter.id==='g9-ch1'){
    const group=document.createElement('optgroup');group.label=lang==='ta'?'சிறு பாடங்கள்':'Learning concepts';
    (window.TRIGGLE_SET_PATH?.stages||[]).forEach((stage,i)=>addJump(group,'concept:'+i,(i+1)+'. '+tr(stage.title)));
    addJump(group,'lab',lang==='ta'?'வென் பட ஆய்வகம்':'Interactive Venn lab');
    jump.append(group);
  }
  const jumpQuestions=chapterItems(chapter);
  if(jumpQuestions.length){
    const group=document.createElement('optgroup');group.label=lang==='ta'?'பயிற்சி வினாக்கள்':'Exercise questions';
    jumpQuestions.forEach(item=>addJump(group,'question:'+item.id,tr(item.label)+' · '+tr(item.title)));
    jump.append(group);
  }
  const more=document.createElement('optgroup');
  more.label=lang==='ta'?'மேலும் பகுதிகள்':'Other sections';
  addJump(more,'sections',lang==='ta'?'அத்தியாயப் பகுதிகளின் நிலை':'Chapter learning sections');
  addJump(more,'references',lang==='ta'?'பாடநூல் குறிப்புகள்':'Textbook references');
  jump.append(more);
  jump.addEventListener('change',()=>{
    const key=jump.value;jump.value='';
    if(!key)return;
    if(key.startsWith('question:')){
      const item=jumpQuestions.find(x=>x.id===key.slice(9));
      if(item)selectLesson(item);
      return;
    }
    let target=null;
    if(key.startsWith('concept:')){
      const idx=Number(key.slice(8));
      const button=container.querySelector('.sp2-nav [data-index="'+idx+'"]');
      if(button){button.click();target=container.querySelector('.sp2-journey');}
    }else if(key==='lab')target=container.querySelector('.p2-lab');
    else if(key==='sections')target=container.querySelector('#chapterSections');
    else if(key==='references')target=container.querySelector('#chapterReferences');
    if(target){
      target.setAttribute('tabindex','-1');
      target.scrollIntoView({block:'start',behavior:'instant'});
      target.focus({preventScroll:true});
    }
  });
  const help=document.createElement('small');
  help.textContent=lang==='ta'?'நீண்ட நேரம் தேட வேண்டாம் — தேர்ந்தெடுத்த பகுதிக்குச் செல்லுங்கள்.':'Skip long scrolling. Choose a destination.';
  fast.append(jumpLabel,jump,help);container.append(fast);
  const note=document.createElement('p');note.textContent=ui('contentPlanned');container.append(note);
  if(chapter.id==='g9-ch1' && window.TriggleSetJourney){
    window.TriggleSetJourney.mount(container,chapter,lang);
  }
  if(chapter.id==='g9-ch1' && window.TriggleLab){
    note.textContent=lang==='ta'
      ? 'ஏழு சிறு பாடங்களும் வென் ஆய்வகமும் கீழே உள்ளன. முழு அத்தியாயப் பயிற்சிகள் இன்னும் உருவாக்கப்படுகின்றன.'
      : 'Seven interactive mini-lessons and a Venn lab are now available below. Complete chapter exercises are still being developed.';
    window.TriggleLab.mount(container,chapter,lang);
  }
  if(chapter.terminology?.ta!=='verified'){const terminology=document.createElement('p');terminology.className='terminology-note';terminology.textContent=ui('terminologyPending');container.append(terminology)}
  const sections=document.createElement('ul');sections.className='chapter-sections';sections.id='chapterSections';
  for(const key of ['concepts','prerequisites','workedExamples','exercises','quizzes']){const row=document.createElement('li');const label=document.createElement('span');label.textContent=ui(key);const state=document.createElement('small');state.textContent=ui('planned');
    if(chapter.id==='g9-ch1'&&(key==='concepts'||key==='quizzes')){
      state.textContent=lang==='ta'?'முன்னோட்டம் உள்ளது':'Pilot available';
    }
    row.append(label,state);sections.append(row)}container.append(sections);
  const review=document.createElement('p');review.className='chapter-review';review.textContent=ui('reviewState')+': '+ui(chapter.review?.state||'unreviewed');if(chapter.review?.notes)review.textContent+=' · '+tr(chapter.review.notes);container.append(review);
  const title=document.createElement('h3');title.textContent=ui('existingQuestions');title.id='chapterQuestions';container.append(title);
  const explanation=document.createElement('p');explanation.className='chapter-coverage-note';explanation.textContent=ui('chapterNotComplete');container.append(explanation);
  const questions=chapterItems(chapter);
  if(questions.length){const list=document.createElement('div');list.className='chapter-question-links';for(const item of questions){const button=document.createElement('button');button.type='button';button.dataset.questionId=item.id;button.textContent=tr(item.label)+' · '+tr(item.title);button.onclick=()=>selectLesson(item);list.append(button)}container.append(list)}
  else{const empty=document.createElement('p');empty.textContent=ui('noQuestions');container.append(empty)}
  const references=document.createElement('section');references.className='chapter-references';references.id='chapterReferences';
  const sourceHeading=document.createElement('h3');sourceHeading.textContent=ui('textbookReferences');references.append(sourceHeading);
  const archiveNote=document.createElement('p');archiveNote.textContent=ui('archivedReference');references.append(archiveNote);
  for(const ref of chapter.sourceRefs||[]){const source=curriculum.sources?.find(s=>s.id===ref.sourceId);if(!source)continue;const entry=document.createElement('div');entry.className='chapter-reference';
   const name=document.createElement('a'),bookTitle=document.createElement('span');bookTitle.lang=/[\u0B80-\u0BFF]/.test(source.title)?'ta':'en';bookTitle.textContent=source.title;name.append(bookTitle,document.createTextNode(' · '+ui(source.medium==='ta'?'tamilMedium':'englishMedium')));if(/^https?:\/\//.test(source.url)){name.href=source.url;name.target='_blank';name.rel='noopener noreferrer'}entry.append(name);
   const detail=document.createElement('p'),edition=document.createElement('span'),locator=document.createElement('span');edition.lang='en';edition.textContent=source.edition;locator.lang='en';locator.textContent=ref.locator;detail.append(document.createTextNode(ui('edition')+': '),edition,document.createTextNode(' · '+ui('locator')+': '),locator);entry.append(detail);references.append(entry)
  }container.append(references);
 }
 function buildStep(s,index){
  const li=document.createElement('li');li.className='worked-step';
  const number=document.createElement('span');number.className='step-circle';number.textContent=index+1;
  const body=document.createElement('div');const reason=document.createElement('div');reason.className='step-reason';reason.textContent=tr(s);
  const equation=document.createElement('div');equation.className='step-equation';
  const fragments=String(s.eq||'').split(/\s+;\s+/);
  if(fragments.length>1&&fragments.length<=8){equation.classList.add('step-equation-group');equation.innerHTML=fragments.map(x=>'<span class="math-part">'+math(x)+'</span>').join('');}
  else equation.innerHTML=math(s.eq);
  body.append(reason,equation);li.append(number,body);return li;
 }

 function renderSteps(){
  const authored=window.TriggleWorkedDisplay?.get(current,lang);
  $('lessonCard').classList.toggle('twd-lesson',!!authored);
  $('questionText').classList.toggle('twd-question',!!authored);
  $('answerText').classList.toggle('twd-answer',!!authored);
  if(authored){
   // Each subquestion and its final answer are now paired in reading order.
   // Don't repeat all answers at the bottom of the page.
   $('stepsList').innerHTML=authored.steps;
   $('answerBox').hidden=true;
   $('stepCount').textContent=lang==='ta'?current.steps.length+' பகுதிகள்':current.steps.length+' parts';
   $('answerText').classList.remove('answer-grid','answer-grid-many');
   $('answerText').replaceChildren();
   $('lessonCard').classList.toggle('many-steps',true);
   return;
  }
  const all=current.steps||[];const stepCount=all.length;const ul=$('stepsList');ul.replaceChildren();all.forEach((s,i)=>ul.append(buildStep(s,i)));
  $('stepCount').textContent=lang==='ta'?all.length+' படிகள்':all.length+' steps';
  $('answerBox').hidden=false;
  const localizedAnswer=tr(current.answer)||'';const parts=String(localizedAnswer).split(/\s+;\s+/);
  const canGrid=parts.length>1&&parts.length<=8&&parts.every(v=>v.length<60);
  $('answerText').classList.toggle('answer-grid',canGrid);
  $('answerText').classList.toggle('answer-grid-many',canGrid&&parts.length>=4);
  $('answerText').innerHTML=canGrid?parts.map(v=>'<span class="answer-part">'+math(v)+'</span>').join(''):math(localizedAnswer);
  $('lessonCard').classList.toggle('many-steps',all.length>3);
  $('stepCount').textContent=lang==='ta'?all.length+' படிகள்':all.length+' steps';
 }
 function isQuestionFigure(item){
  return !!(item.diagram && typeof item.diagram==='object' && /\b(diagram|figure|labelled|labeled)\b/i.test(item.q?.en||''));
 }
 function hasUsefulFigure(item){
  const d=item.diagram;if(!d)return false;
  if(isQuestionFigure(item))return true;
  const kind=typeof d==='object'?d.kind:d;
  // Symbolic identity proofs have no physical drawing to reproduce; do not show a token figure.
  if(['identity','symbolic','symbolic-x'].includes(kind))return item.classNum===11&&item.exercise==='3.4';
  if(['stats','area','sets'].includes(kind))return item.kind==='practice';
  return ['triangle','two-triangles','two-right','kite','tree','unitcircle','complement-pairs','tower','circle','wave','inverse','real-number-line','real-number-arrows'].includes(kind);
 }
 function renderInlineFigure(){
   const figure=$('inlineFigure');const yes=isQuestionFigure(current);
   figure.hidden=!yes; if(!yes)return;
   const svg=window.TriggleDraw.drawClassic({demo:current.diagram,ref:tr(current.label),title:tr(current.title)});
   $('inlineFigureVisual').innerHTML=svg;
   const d=current.diagram;
   const measures=d?.kind==='triangle'?((lang==='ta'?'எதிர்ப்பக்கம் ':'Opposite ')+d.opp+' · '+(lang==='ta'?'அடுத்துள்ள பக்கம் ':'Adjacent ')+d.adj+' · '+(lang==='ta'?'கர்ணம் ':'Hypotenuse ')+d.hyp+'. '):'';
   $('inlineFigureCaption').textContent=measures+ui('inlineFigureNote');
 }
 let deepStageData=null,deepStageIndex=0,deepLauncher=null;
 const deepResume=load('triggle.deep.positions.v123',{});
 const hasDeepLesson=item=>!!window.TriggleDeep?.hasLesson?.(item?.id);

 function deepNavTo(index,focusNav=false){
  if(!deepStageData)return;
  const list=deepStageData.stages;
  deepStageIndex=Math.min(list.length-1,Math.max(0,Number(index)||0));
  deepResume[current.id]=deepStageIndex;store('triggle.deep.positions.v123',deepResume);
  const stage=list[deepStageIndex];
  const label=lang==='ta'?'நிலை ':'Stage ';
  const body=$('guidedSteps');body.innerHTML=window.TriggleDeepUI.content(current,lang,stage,deepStageIndex,list.length,math);
  window.TriggleDeepUI.attach(body,current,lang);
  const fraction=(deepStageIndex+1)+' / '+list.length;
  $('deepProgressLabel').textContent=fraction;
  $('deepStageCount').textContent=label+(deepStageIndex+1)+' / '+list.length;
  $('deepProgressFill').style.width=(100*(deepStageIndex+1)/list.length)+'%';
  $('deepPrevious').disabled=deepStageIndex===0;
  $('deepNext').querySelector('span').textContent=(deepStageIndex===list.length-1?(lang==='ta'?'கேள்விக்குத் திரும்பு':'Finish & return'):(lang==='ta'?'அடுத்த கருத்து':'Next concept'));
  $('deepStageDots').innerHTML=list.map((_s,i)=>'<button type="button" class="deep-dot '+(i===deepStageIndex?'active':'')+'" data-jump="'+i+'" aria-label="'+esc(label+(i+1))+'" '+(i===deepStageIndex?'aria-current="step"':'')+'></button>').join('');
  $('guidedScroll').scrollTop=0;
  if(focusNav)$('deepNext').focus({preventScroll:true});
 }
 function openGuided(stageNumber,launcher){
  if(!hasDeepLesson(current))return;
  deepLauncher=launcher || (document.activeElement instanceof HTMLElement ? document.activeElement : $('tabGuided'));
  const dlg=$('guidedDialog');
  deepStageData=window.TriggleDeep.build(current,lang);
  if(!deepStageData?.stages?.length)return;
  $('guidedClass').textContent=ui('class')+' '+grade;
  $('guidedQuestionLabel').textContent=tr(current.label);
  $('guidedQuestion').innerHTML=window.TriggleWorkedDisplay?.get(current,lang)?.pinnedQuestion||math(tr(current.q));
  $('deepQuestionDock').scrollTop=0;
  $('deepSourceStatus').textContent=deepStageData.reviewed?(lang==='ta'?'விரிவான பாடம்':'CONCEPT LESSON'):(lang==='ta'?'தீர்வு வழிமுறை':'WORKED-PATH GUIDE');
  const start=Number.isInteger(stageNumber)?stageNumber:(deepResume[current.id]||0);
  if(!dlg.open)dlg.showModal();
  $('tabGuided').setAttribute('aria-expanded','true');
  renderMode();
  deepNavTo(start);
  $('closeGuided').focus({preventScroll:true});
 }
 function closeGuided(){if($('guidedDialog').open)$('guidedDialog').close();}
 function renderMode(){
  const deepActive=$('guidedDialog').open;
  $('tabQuick').classList.toggle('is-selected',!deepActive);
  $('tabGuided').classList.toggle('is-selected',deepActive);
  $('tabQuick').setAttribute('aria-pressed',String(!deepActive));
  $('tabGuided').setAttribute('aria-pressed',String(deepActive));
  $('quickSteps').hidden=false;
 }
 function renderText(){
  $('sidebar').setAttribute('aria-label',ui('navigationLabel'));$('exerciseList').setAttribute('aria-label',ui('navigationLabel'));$('search').setAttribute('aria-label',ui('searchLabel'));$('pathClose').setAttribute('aria-label',ui('closeNavigation'));$('closeSidebar').setAttribute('aria-label',ui('closeNavigation'));document.querySelector('.lang-switch').setAttribute('aria-label',ui('chooseLanguage'));document.querySelector('.side-brand small').textContent=ui('visualMathematics');$('deepPrevious').querySelector('span').textContent=ui('previousStage');
  for(const [id,key] of [['crumb','navigationLabel'],['inlineFigureOpen','expandFigure'],['solutionModeRow','chooseExplanation'],['stepsRegion','completeSolution'],['quickSteps','quickSolution'],['stepsList','workedSolution'],['classDock','switchClass'],['closeGuided','backToQuestion'],['guidedSteps','currentConcept'],['deepStageDots','chooseStage'],['figureDialog','diagramDialog']])$(id).setAttribute('aria-label',ui(key));
  document.querySelector('.page-controls').setAttribute('aria-label',ui('navigateQuestions'));document.querySelector('.deep-nav').setAttribute('aria-label',ui('learningStages'));$('figureBtn').title=ui('figureLabel');
  document.documentElement.lang=lang;document.body.classList.toggle('lang-ta',lang==='ta');document.querySelectorAll('[data-i18n]').forEach(el=>el.textContent=ui(el.dataset.i18n));$('search').placeholder=ui('search');$('classSubtitle').textContent=ui('subtitle');$('langEn').classList.toggle('active',lang==='en');$('langTa').classList.toggle('active',lang==='ta');$('langEn').setAttribute('aria-pressed',String(lang==='en'));$('langTa').setAttribute('aria-pressed',String(lang==='ta'))}
 function renderDiscovery(){
   window.TriggleDiscovery?.mount($('discoveryView'),{
     mode:homeView?'home':'class',grade,lang,curriculum,classes,lastByGrade,
     openGrade:changeGrade,openChapter:openChapterFor,openQuestion:openQuestionFor,goHome
   });
 }
 function render(){renderText();renderGrades();$('classicLink').hidden=grade!==9;
   $('questionReturn').hidden=true;
   const discovering=homeView||classIndex;
   document.body.classList.toggle('discovery-active',discovering);
   document.body.classList.toggle('home-active',homeView);
   if(homeView)$('homeBtn').setAttribute('aria-current','page');else $('homeBtn').removeAttribute('aria-current');
   $('discoveryView').setAttribute('aria-label',lang==='ta'?'டிரிகிள் முகப்பு மற்றும் அத்தியாயங்கள்':'Triggle Home and Chapters');
   $('discoveryView').hidden=!discovering;
   if(discovering){
     $('chapterOverview').hidden=true;$('lessonCard').hidden=true;
     document.body.classList.remove('chapter-overview-active');
     renderDiscovery();renderList();
     window.dispatchEvent(new CustomEvent('triggle:lessonchange',{detail:{item:null,lang,grade,chapter:null}}));
     return;
   }
  document.body.classList.toggle('chapter-overview-active',!!chapterOverview);$('chapterOverview').hidden=!chapterOverview;$('lessonCard').hidden=!!chapterOverview;
  if(chapterOverview){$('classHeading').textContent=ui('class')+' '+grade;$('classEmblem').querySelector('span').textContent=grade;renderBreadcrumb(chapterOverview.title);$('gradeTotal').textContent=chapterList().length+' '+ui('chapters');renderOverview(chapterOverview);renderList();window.dispatchEvent(new CustomEvent('triggle:lessonchange',{detail:{item:null,lang,grade,chapter:chapterOverview}}));return}
  const list=activeList();const n=currentIndex(),position=n+1,chapter=chapterForItem(current)?.title||classes[grade].chapters[current.chapter]||current.topic;
   const questionChapter=chapterForItem(current);
   if(questionChapter){
     const cameFrom=questionOrigin?.grade===grade&&questionOrigin?.chapterId===questionChapter.id;
     const returnTo=cameFrom?questionOrigin.section:null;
     const label=returnTo==='examples'?(lang==='ta'?'எடுத்துக்காட்டுகளுக்குத் திரும்பு':'Back to Worked Examples'):
       returnTo==='exercises'?(lang==='ta'?'பயிற்சிகளுக்குத் திரும்பு':'Back to Exercises'):
       (lang==='ta'?'அத்தியாயத் தேர்வுகளுக்குத் திரும்பு':'Back to Chapter choices');
     $('questionReturnBtn').textContent='← '+label;
     $('questionReturn').hidden=false;
   }
  $('classHeading').textContent=ui('class')+' '+grade;$('classEmblem').querySelector('span').textContent=grade;
  renderBreadcrumb(chapter);
  $('gradeTotal').textContent=list.length+' '+ui('lessons');$('questionLabel').textContent=labelForGroup(current.exercise).toUpperCase();$('itemPosition').textContent=num(position)+' / '+num(list.length);
  $('questionTitle').textContent=tr(current.topic);$('questionHead').textContent=tr(current.label);
  const workedDisplay=window.TriggleWorkedDisplay?.get(current,lang);
  $('questionText').innerHTML=workedDisplay?.question||math(tr(current.q));$('kindBadge').textContent=ui(current.kind==='practice'?'typePractice':'typeBook');
  $('markDone').setAttribute('aria-pressed',String(completed.has(current.id)));$('markDone').setAttribute('aria-label',ui(completed.has(current.id)?'learned':'markDone'));$('markDone').innerHTML=(completed.has(current.id)?'✓ ':'○ ')+'<span>'+esc(ui(completed.has(current.id)?'learned':'markDone'))+'</span>';
  $('referenceLink').hidden=!current.source;if(current.source)$('referenceLink').href=current.source;
  $('editionNote').textContent=current.sourceEdition==='2025 revised'?(lang==='ta'?'2025 திருத்தப்பட்ட பாடநூல் · மொழிநடை மீளாய்வு நிலுவையில் உள்ளது.':'2025 revised textbook · Tamil editorial review pending.'):ui(current.kind==='practice'?'notePractice':grade===9?'noteOld':'noteBook');
  $('figureBtn').hidden=!hasUsefulFigure(current);
  renderInlineFigure();
  $('pageStatus').textContent=position+' '+ui('of')+' '+list.length;$('pageFill').style.width=(position/list.length*100)+'%';
  $('previous').disabled=n===0;$('next').disabled=n===list.length-1;
  $('previous').innerHTML='← '+esc(ui('previous'));$('next').innerHTML=esc(ui('nextQuestion'))+' →';
  $('solutionModeRow').hidden=!hasDeepLesson(current);
  renderSteps();renderMode();renderList();
  window.dispatchEvent(new CustomEvent('triggle:lessonchange',{detail:{item:current,lang,grade}}));
 }
 function openDrawer(){if(!mobile.matches){$('exerciseList').scrollTop=0;$('browseDirectory').focus();return}drawerOpen=true;document.body.classList.add('drawer-open');$('browseBtn').setAttribute('aria-expanded','true');$('sidebar').inert=false;$('sidebar').setAttribute('role','dialog');$('sidebar').setAttribute('aria-modal','true');setTimeout(()=>$('browseDirectory').focus({preventScroll:true}),180)}
 function closeDrawer(){if(!drawerOpen)return;drawerOpen=false;document.body.classList.remove('drawer-open');$('browseBtn').setAttribute('aria-expanded','false');$('sidebar').inert=true;$('sidebar').removeAttribute('role');$('sidebar').removeAttribute('aria-modal');$('browseBtn').focus({preventScroll:true})}
 function onBreakpoint(){if(mobile.matches){if(!drawerOpen)$('sidebar').inert=true}else{drawerOpen=false;document.body.classList.remove('drawer-open');$('sidebar').inert=false;$('sidebar').removeAttribute('role');$('sidebar').removeAttribute('aria-modal');$('browseBtn').setAttribute('aria-expanded','false')}}
 function showDiagram(){
  if(!hasUsefulFigure(current))return;
  const context={item:current,lang,renderText:tr};
  let graphic=window.TriggleConcept?.render(context);
  if(!graphic){let svg='';if(current.diagram&&typeof current.diagram==='object')svg=window.TriggleDraw.drawClassic({demo:current.diagram,ref:tr(current.label),title:tr(current.title)});else svg=window.TriggleDraw.drawSimple(current.diagram||'identity');graphic={html:svg,caption:lang==='ta'?'படம் விளக்கத்திற்காக மட்டுமே; அளவுப்படி இல்லாமல் இருக்கலாம்.':'Original conceptual illustration; not necessarily drawn to scale.'}}
  $('diagramContent').innerHTML=graphic.html;
  $('visualTitle').textContent=tr(current.title);
  $('diagramCaption').textContent=graphic.caption;
  $('figureDialog').showModal();
  window.TriggleConcept?.attach(context,$('diagramContent'));
 }
 $('previous').onclick=()=>navMove(-1);$('next').onclick=()=>navMove(1);
 $('markDone').onclick=()=>{if(completed.has(current.id))completed.delete(current.id);else completed.add(current.id);store('triggle.learned.v119',[...completed]);render()};
 $('homeBtn').onclick=e=>{e.preventDefault();goHome()};
 $('questionReturnBtn').onclick=()=>{
   const chapter=chapterForItem(current);
   if(!chapter)return;
   const section=questionOrigin?.grade===grade&&questionOrigin?.chapterId===chapter.id?questionOrigin.section:null;
   openChapterSection(section,chapter);
 };
 $('browseBtn').onclick=()=>drawerOpen?closeDrawer():openDrawer();$('closeSidebar').onclick=closeDrawer;$('backdrop').onclick=closeDrawer;
 $('search').oninput=renderList;
 $('pathClose').onclick=()=>$('pathDialog').close();$('pathDialog').addEventListener('click',e=>{if(e.target===$('pathDialog'))$('pathDialog').close()});
 $('inlineFigureOpen').onclick=showDiagram;
 $('tabQuick').onclick=()=>{if($('guidedDialog').open)closeGuided();};
 $('tabGuided').onclick=()=>openGuided(undefined,$('tabGuided'));
 $('deepPrevious').onclick=()=>deepNavTo(deepStageIndex-1,true);
 $('deepNext').onclick=()=>{if(deepStageIndex===deepStageData.stages.length-1)closeGuided();else deepNavTo(deepStageIndex+1,true);};
 $('deepStageDots').addEventListener('click',e=>{const b=e.target.closest('[data-jump]');if(b)deepNavTo(Number(b.dataset.jump));});
 $('guidedDialog').addEventListener('keydown',e=>{if(e.target.matches('input,button')||e.altKey||e.ctrlKey||e.metaKey)return;if(e.key==='ArrowRight'){e.preventDefault();deepNavTo(Math.min(deepStageIndex+1,deepStageData.stages.length-1));}if(e.key==='ArrowLeft'){e.preventDefault();deepNavTo(Math.max(0,deepStageIndex-1));}});
 $('closeGuided').onclick=closeGuided;
 $('guidedDialog').addEventListener('close',()=>{renderMode();$('tabGuided').setAttribute('aria-expanded','false');(deepLauncher?.isConnected?deepLauncher:$('tabGuided')).focus({preventScroll:true})});
 $('guidedDialog').addEventListener('click',e=>{if(e.target===$('guidedDialog'))closeGuided()});
 $('figureBtn').onclick=showDiagram;$('closeDiagram').onclick=()=>$('figureDialog').close();
 $('figureDialog').addEventListener('click',ev=>{if(ev.target===$('figureDialog'))$('figureDialog').close()});
 $('langEn').onclick=()=>changeLanguage('en');$('langTa').onclick=()=>changeLanguage('ta');
 function changeLanguage(v){lang=v;try{localStorage.setItem('triggle-language',v)}catch{}render()}
 window.addEventListener('keydown',e=>{
  if(e.key==='Escape'&&drawerOpen){closeDrawer();return}
  if(e.key==='/'&&!e.ctrlKey&&!e.metaKey&&e.target.tagName!=='INPUT'&&e.target.tagName!=='TEXTAREA'){e.preventDefault();openDrawer();$('search').focus();return}
  if(drawerOpen&&e.key==='Tab'){const focusable=[...$('sidebar').querySelectorAll('button:not([disabled]),input:not([disabled]),a[href],summary')].filter(el=>el.getClientRects().length);if(focusable.length){const first=focusable[0],last=focusable.at(-1);if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus()}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus()}}}
  if(e.target.matches('input,textarea,select,button')||$('figureDialog').open||$('guidedDialog').open||$('pathDialog').open||chapterOverview||drawerOpen||e.altKey||e.metaKey||e.ctrlKey)return;
  if(e.key==='ArrowRight'){e.preventDefault();navMove(1)}else if(e.key==='ArrowLeft'){e.preventDefault();navMove(-1)}
 });
 window.addEventListener('popstate',()=>{const p=new URL(location.href).searchParams,g=Number(p.get('class'));grade=classes[g]?g:9;current=classes[grade].items.find(x=>x.id===p.get('question'))||classes[grade].items.find(x=>x.id===lastByGrade[grade])||classes[grade].items[0];homeView=!p.has('class')&&!p.has('chapter')&&!p.has('question');classIndex=!homeView&&!p.has('chapter')&&!p.has('question');chapterOverview=p.has('question')?null:chapterList().find(c=>c.id===p.get('chapter'))||null;chapterSection=chapterOverview&&validSections.has(p.get('section'))?p.get('section'):null;conceptIndex=chapterSection==='concepts'&&/^\d+$/.test(p.get('concept')||'')?Number(p.get('concept')):null;$('search').value='';render();closeDrawer();resetScroll()});
 mobile.addEventListener('change',onBreakpoint);onBreakpoint();remember();updateUrl(true);render();
})();
