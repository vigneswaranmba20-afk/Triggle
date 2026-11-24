(()=>{'use strict';
 const $=id=>document.getElementById(id);
 const tr=x=>x && typeof x==='object' ? (x[lang]||x.en||'') : String(x||'');
 const dictionary={
 en:{yourClass:'YOUR CLASS',exploreExercise:'Find an exercise',saveNote:'Your progress stays on this device',openBasics:'Interactive basics',browse:'Exercises',basics:'Trigonometry Basics',studyMode:'YOUR LEARNING SPACE',diagram:'Figure',stepByStep:'Solution',quickSolution:'Solution',expandFigure:'Tap to enlarge diagram ↗',inlineFigureNote:'Reconstructed from the measurements in this question, not copied from the textbook.',finalAnswer:'Final answer',markDone:'Mark learned',learned:'Learned',previous:'Previous',nextQuestion:'Next question',source:'Reference ↗',classic:'Original Class 9 interface',visualGuide:'VISUAL EXPLANATION',close:'Close',typeBook:'Book-referenced · edition check',typePractice:'Original Triggle practice',class:'Class',search:'Search exercise, question...',subtitle:'Choose a topic, understand every step, go at your own pace.',nextStep:'Next step',showAll:'Show full solution',answer:'Show final answer',complete:'Solution complete',empty:'No lessons match your search.',noteBook:'Textbook question references were cross-checked against public listings. Editions can differ; compare with your prescribed book.',noteOld:'Class 9 exercises reference an earlier textbook edition. Verify numbering against your school copy.',notePractice:'Original Triggle practice — not a numbered textbook question.',lessons:'lessons',question:'Question',practice:'Practice',reference:'Reference',step:'Step',of:'of'},
 ta:{yourClass:'உங்கள் வகுப்பு',exploreExercise:'பயிற்சியைத் தேடுங்கள்',saveNote:'உங்கள் முன்னேற்றம் இந்த சாதனத்தில் மட்டும் சேமிக்கப்படும்',openBasics:'காட்சி அடிப்படைகள்',browse:'பயிற்சிகள்',basics:'முக்கோணவியல் அடிப்படைகள்',studyMode:'கற்றல் பகுதி',diagram:'படம்',stepByStep:'தீர்வு விளக்கம்',quickSolution:'தீர்வு விளக்கம்',expandFigure:'படத்தைப் பெரிதாக்க ↗',inlineFigureNote:'கேள்வியின் அளவுகளிலிருந்து மீண்டும் வரையப்பட்டது; பாடநூலிலிருந்து நகலெடுக்கவில்லை.',finalAnswer:'இறுதி விடை',markDone:'கற்றதாகக் குறி',learned:'கற்றுவிட்டேன்',previous:'முந்தையது',nextQuestion:'அடுத்த கேள்வி',source:'குறிப்பு ↗',classic:'வகுப்பு 9 பழைய தோற்றம்',visualGuide:'காட்சி விளக்கம்',close:'மூடு',typeBook:'பாடநூல் குறிப்பு · பதிப்பு சரிபார்க்கவும்',typePractice:'டிரிகிள் உருவாக்கிய பயிற்சி',class:'வகுப்பு',search:'பயிற்சி, கேள்வியைத் தேட...',subtitle:'ஒரு தலைப்பைத் தேர்ந்தெடுத்து படிப்படியாக எளிதில் கற்றுக்கொள்ளுங்கள்.',nextStep:'அடுத்த படி',showAll:'முழுத் தீர்வைக் காட்டு',answer:'இறுதி விடையைக் காட்டு',complete:'தீர்வு முடிந்தது',empty:'இந்தத் தேடலுக்கான பாடங்கள் இல்லை.',noteBook:'பொது பட்டியலில் பாடநூல் வினா விவரங்கள் சரிபார்க்கப்பட்டன. உங்கள் பள்ளிப் புத்தகப் பதிப்புடன் ஒப்பிடுங்கள்.',noteOld:'வகுப்பு 9 பயிற்சிகள் முந்தைய பாடநூல் பதிப்பைச் சார்ந்தவை. உங்கள் புத்தக எண்ணிடலைச் சரிபார்க்கவும்.',notePractice:'இது டிரிகிள் உருவாக்கிய பயிற்சி; பாடநூல் வினா எண் அல்ல.',lessons:'பாடங்கள்',question:'வினா',practice:'பயிற்சி',reference:'குறிப்பு',step:'படி',of:'இல்'} };
 Object.assign(dictionary.en,{backAllChapters:'Back to all chapters',searchOptional:'Search (optional)',browse:'Chapters',exploreExercise:'Chapters and sections',search:'Search chapters, exercises, questions…',chapter:'Chapter',chapters:'chapters',overview:'Chapter overview',planned:'Planned',drafting:'Drafting',review:'In review',published:'Published',existingQuestions:'Existing questions',chapterNotComplete:'Existing questions are available for practice. Their presence does not mean this chapter is complete or reviewed.',contentPlanned:'Full chapter content is planned. Learning sections will appear after writing and review.',noQuestions:'Questions for this chapter are planned.',terminologyPending:'Tamil textbook terminology needs verification.',terminologyVerified:'Tamil textbook terminology verified.',concepts:'Concepts',prerequisites:'Prerequisites',workedExamples:'Worked examples',exercises:'Exercises',quizzes:'Quizzes',unitExercise:'Unit Exercise',chooseLanguage:'Language',closeNavigation:'Close navigation',navigationLabel:'Class, chapter and exercise navigation',searchLabel:'Search chapters and questions',visualMathematics:'VISUAL MATHEMATICS',textbookReferences:'Textbook references',edition:'Edition',locator:'Location in textbook',englishMedium:'English medium',tamilMedium:'Tamil medium',archivedReference:'Archived textbook references; compare with the edition prescribed by your school.',figureLabel:'Open a relevant mathematics diagram',completeSolution:'Solution',workedSolution:'Worked solution',navigateQuestions:'Navigate questions',switchClass:'Switch school class',diagramDialog:'Mathematics diagram',reviewState:'Review state',unreviewed:'Not reviewed',in_review:'In review',approved:'Approved',home:'Home',browse:'Find a topic'});
 Object.assign(dictionary.ta,{backAllChapters:'அனைத்து அத்தியாயங்களுக்கும் திரும்பு',searchOptional:'தேடல் (விருப்பப்படி)',browse:'அத்தியாயங்கள்',exploreExercise:'அத்தியாயங்களும் பகுதிகளும்',search:'அத்தியாயம், பயிற்சி, வினாவைத் தேட…',chapter:'அத்தியாயம்',chapters:'அத்தியாயங்கள்',overview:'அத்தியாயக் கண்ணோட்டம்',planned:'திட்டமிடப்பட்டுள்ளது',drafting:'எழுதப்படுகிறது',review:'மீளாய்வில் உள்ளது',published:'வெளியிடப்பட்டது',existingQuestions:'ஏற்கெனவே உள்ள வினாக்கள்',chapterNotComplete:'ஏற்கெனவே உள்ள வினாக்களைப் பயிற்சி செய்யலாம். வினாக்கள் இருப்பதால் மட்டும் இந்த அத்தியாயம் முழுமையானது அல்லது மீளாய்வு செய்யப்பட்டது என்று பொருளல்ல.',contentPlanned:'முழு அத்தியாய உள்ளடக்கம் திட்டமிடப்பட்டுள்ளது. கற்றல் பகுதிகள் எழுதப்பட்டு மீளாய்வு செய்யப்பட்டதும் இங்கே இடம்பெறும்.',noQuestions:'இந்த அத்தியாயத்திற்கான வினாக்கள் திட்டமிடப்பட்டுள்ளன.',terminologyPending:'தமிழ்வழிப் பாடநூல் கலைச்சொற்கள் சரிபார்க்கப்பட வேண்டும்.',terminologyVerified:'தமிழ்வழிப் பாடநூல் கலைச்சொற்கள் சரிபார்க்கப்பட்டுள்ளன.',concepts:'கருத்துகள்',prerequisites:'முன்தேவைகள்',workedExamples:'தீர்க்கப்பட்ட எடுத்துக்காட்டுகள்',exercises:'பயிற்சிகள்',quizzes:'குறுவினாத் தேர்வுகள்',unitExercise:'தொகுப்புப் பயிற்சி',chooseLanguage:'மொழி',closeNavigation:'வழிசெலுத்தலை மூடு',navigationLabel:'வகுப்பு, அத்தியாயம் மற்றும் பயிற்சி வழிசெலுத்தல்',searchLabel:'அத்தியாயங்களையும் வினாக்களையும் தேடுக',visualMathematics:'காட்சி வழிக் கணிதம்',textbookReferences:'பாடநூல் குறிப்புகள்',edition:'பதிப்பு',locator:'பாடநூலில் உள்ள இடம்',englishMedium:'ஆங்கிலவழி',tamilMedium:'தமிழ்வழி',archivedReference:'காப்பகப் பாடநூல் குறிப்புகள்; உங்கள் பள்ளி பரிந்துரைக்கும் பதிப்புடன் ஒப்பிடுங்கள்.',figureLabel:'பொருத்தமான கணிதப் படத்தைத் திற',completeSolution:'தீர்வு விளக்கம்',workedSolution:'தீர்வு விளக்கம்',navigateQuestions:'வினாக்களுக்குச் செல்லவும்',switchClass:'வகுப்பை மாற்றவும்',diagramDialog:'கணிதப் படம்',reviewState:'மீளாய்வு நிலை',unreviewed:'மீளாய்வு செய்யப்படவில்லை',in_review:'மீளாய்வில் உள்ளது',approved:'ஏற்கப்பட்டது',home:'முகப்பு',browse:'தலைப்பைத் தேடுக'});
 const ui=k=>dictionary[lang][k]||dictionary.en[k]||k;
 const classes=window.TRIGGLE_CLASSES||{};
 // Public student routes are restricted until the revised higher-grade syllabus arrives.
 const publicGrade=g=>Number(g)===9||Number(g)===10;
 const restrictedRoute=p=>(p.has('class')&&!publicGrade(p.get('class')))||/^g1[12]-/.test(p.get('chapter')||'')||/^(?:c1[12]|g1[12])-/.test(p.get('question')||'');
 // Preserve source records while showing exercise questions, not worked examples.
 const isWorkedExample=item=>item?.kind==='textbook-example'||
   /(?:^|[-_])(?:worked[-_])?examples?(?:[-_]|$)/i.test(item?.id||'')||
   /^\s*(?:Worked\s+)?Example\b/i.test(item?.label?.en||'');
 for(const key of [9,10,11,12]){
   if(!classes[key]||!Array.isArray(classes[key].items))throw Error('Missing data for class '+key);
   classes[key].items=classes[key].items.filter(item=>!isWorkedExample(item));
 }
 const curriculum=window.TRIGGLE_CURRICULUM;
 if(!curriculum?.grades)throw Error('Missing curriculum metadata');
 const chapterList=()=>curriculum.grades.find(g=>g.grade===grade)?.chapters||[];
 const chapterForItem=item=>chapterList().find(c=>c.legacyQuestionIds.includes(item.id))||chapterList().find(c=>String(c.number)===String(item.chapter));
 const chapterItems=chapter=>{const ids=new Set([...(chapter.legacyQuestionIds||[]),...(chapter.textbookQuestionIds||[])]);return classes[grade].items.filter(item=>ids.has(item.id)||(grade===10&&Number(chapter.number)===1&&String(item.chapter)==='1'&&item.kind==='textbook'));};
 const selectedChapter=()=>homeView||classIndex?null:(chapterOverview||chapterForItem(current));
 const load=(key,other)=>{try{const v=JSON.parse(localStorage.getItem(key));return v===null?other:v}catch{return other}};
 const store=(key,value)=>{try{localStorage.setItem(key,JSON.stringify(value))}catch{}};
 const completed=new Set(load('triggle.learned.v119',[]));
 const lastByGrade=load('triggle.lastByGrade.v119',{});
 // Resume across grades uses the most recently opened lesson, not grade order.
 let lastOpened=load('triggle.lastOpened.v1',null);
 let lang='en';try{const saved=localStorage.getItem('triggle-language');if(saved==='ta'||saved==='"ta"')lang='ta'}catch{}
 const url=new URL(location.href);
 if(restrictedRoute(url.searchParams)){history.replaceState(null,'',location.pathname);url.search='';}
 const requested=Number(url.searchParams.get('class'));
 let grade=publicGrade(requested)&&classes[requested]?requested:9;
 let current=classes[grade].items.find(x=>x.id===url.searchParams.get('question'))||classes[grade].items.find(x=>x.id===lastByGrade[grade])||classes[grade].items[0];
 let chapterOverview=url.searchParams.has('question')?null:chapterList().find(c=>c.id===url.searchParams.get('chapter'))||null;
 let homeView=!url.searchParams.has('class')&&!url.searchParams.has('question')&&!url.searchParams.has('chapter');
 let classIndex=!homeView&&!url.searchParams.has('question')&&!url.searchParams.has('chapter');
 const validSections=new Set(['concepts','exercises','quizzes','activities','sources']);
 let chapterSection=chapterOverview&&validSections.has(url.searchParams.get('section'))?url.searchParams.get('section'):null;
 let conceptIndex=chapterSection==='concepts'&&/^\d+$/.test(url.searchParams.get('concept')||'')?Number(url.searchParams.get('concept')):null;
 let questionOrigin=null;
 let drawerOpen=false;
 const reduced=matchMedia('(prefers-reduced-motion:reduce)');
 const mobile=matchMedia('(max-width:800px)');
 function esc(str){return String(str??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
 const plainMath=value=>Array.isArray(value)?value.map(plainMath).join(''):(value?.fallback??value);
 const isGeometryExercise=item=>item.classNum===10&&item.chapter==='4'&&['4.1','4.2','4.3'].includes(item.exercise);
 const englishInTamilReader=text=>lang==='ta'&&/[a-z]{2}/i.test(text)&&!/\p{Script=Tamil}/u.test(text);
 function math(str){
  // Local typesetting: accessible group exponents and no cloud requests.
  const alignCoefficientPowers=grade===10&&String(selectedChapter()?.number)==='2';
  return window.TriggleNotation ? window.TriggleNotation.render(str,{alignCoefficientPowers}) : esc(grade===9?plainMath(str):str);
 }

 // Textbook ordering is preserved; Previous/Next are further confined to the
 // current exercise by activeList(), consistently for all Classes 9–12.
 const textbookExerciseList=chapter=>{
   const items=chapter?(window.TriggleChapterHub?.textbookExercises(chapterItems(chapter))||[]):[];
   const sourceBatches=(grade===10&&['2','4','6'].includes(String(chapter?.number)))||(grade===9&&['1','3'].includes(String(chapter?.number)));
   if(!sourceBatches)return items;
   // Source-verified Grade 9 and Grade 10 exercise parts
   // arrive in independent batches. Sort only their navigation lists, preserving
   // immutable question records and all other grades' established order.
   const part={i:1,ii:2,iii:3,iv:4,v:5,vi:6,vii:7,viii:8};
   const index=q=>{const m=String(q.id).match(/-q(\d+)(?:-([ivx]+))?$/);
     return [m?Number(m[1]):Number.MAX_SAFE_INTEGER,m?.[2]?part[m[2]]||99:0];};
   return [...items].sort((a,b)=>{
     const ex=String(a.exercise||'').localeCompare(String(b.exercise||''),undefined,{numeric:true});
     if(ex)return ex;
     const x=index(a),y=index(b);return x[0]-y[0]||x[1]-y[1];
   });
 };
 const activeList=()=>{
   const chapter=chapterForItem(current),exercises=textbookExerciseList(chapter);
   if(exercises.some(item=>item.id===current.id)){
     // The selected exercise is a self-contained learning path in every grade.
     const list=exercises.filter(item=>item.exercise===current.exercise);
     if(chapter?.id==='g9-ch5')return [...list].sort((a,b)=>parseInt(String(a.id).match(/q(\d+)/)?.[1]||'0',10)-parseInt(String(b.id).match(/q(\d+)/)?.[1]||'0',10));
     return list;
   }
   // Legacy practice is also kept inside its own exercise when possible.
   const local=classes[grade].items.filter(item=>item.chapter===current.chapter&&item.exercise===current.exercise);
   return local.some(item=>item.id===current.id)?local:classes[grade].items;
 };
 const currentIndex=()=>activeList().findIndex(i=>i.id===current.id);
 const sectionForQuestion=item=>'exercises';
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
   lastOpened={grade,questionId:current.id};store('triggle.lastOpened.v1',lastOpened);
 }
 function resetScroll(){
  // Both the workspace and the mobile lesson container can scroll.
  const workspace=document.querySelector('.workspace');
  const content=document.querySelector('.lesson-container');
  if(workspace)workspace.scrollTop=0;
  if(content)content.scrollTop=0;
  // A new question must begin at the first worked step, not the last scroll position.
  const stepsPane=$('stepsRegion'),questionPane=$('questionText');
  if(stepsPane)stepsPane.scrollTop=0;
  if(questionPane)questionPane.scrollTop=0;
  window.scrollTo({top:0,behavior:'instant'});
 }
 function goHome(){
   homeView=true;classIndex=false;chapterOverview=null;chapterSection=null;conceptIndex=null;
   updateUrl();render();closeDrawer();resetScroll();
   $('discoveryView').focus({preventScroll:true});
 }
 function changeGrade(g){
   g=Number(g);if(!publicGrade(g)||!classes[g])return;
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
 // Every chapter's Exercises card opens the exercise-number index first.
 // Choosing a numbered exercise begins at its first available question.
 function selectChapter(chapter){
   homeView=false;classIndex=false;chapterOverview=chapter;chapterSection=null;conceptIndex=null;
   questionOrigin=null;
   updateUrl();render();closeDrawer();resetScroll();
   $('chapterOverview').focus({preventScroll:true});
 }
 function openChapterSection(section,chapter=chapterOverview,concept=null){
   if(!chapter||(!validSections.has(section)&&section!==null))return;
   homeView=false;classIndex=false;chapterOverview=chapter;
   chapterSection=section;conceptIndex=Number.isInteger(concept)?concept:null;
   updateUrl();render();closeDrawer();resetScroll();
   $('chapterOverview').focus({preventScroll:true});
 }
 function openChapterFor(g,chapter){
   if(!publicGrade(g)||!classes[g])return;
   grade=g;current=classes[g].items.find(x=>x.id===lastByGrade[g])||classes[g].items[0];
   selectChapter(chapter);
 }
 function openQuestionFor(g,item){
   if(!publicGrade(g)||!classes[g])return;
   grade=g;homeView=false;classIndex=false;chapterOverview=null;chapterSection=null;conceptIndex=null;questionOrigin=null;current=item;
   updateUrl();remember();render();closeDrawer();resetScroll();
   $('lessonCard').focus({preventScroll:true});
 }

 function navMove(delta){if(homeView||classIndex||chapterOverview)return;const list=activeList(),i=currentIndex()+delta;if(i<0||i>=list.length)return;selectLesson(list[i])}

 function renderBreadcrumb(chapter){
   const nav=$('crumb');nav.replaceChildren();
   const choices=[{text:ui('class')+' '+grade,type:'class'}];
   // On chapter menus, the main heading already names the chapter.
   // Keep Class as a visible, usable switcher without repeating that title.
   if(!chapterOverview){choices.push({text:tr(chapter),type:'chapter'});choices.push({text:labelForGroup(current.exercise),type:'exercise'});}
   choices.forEach((c,i)=>{
     if(i){const sep=document.createElement('span');sep.className='crumb-sep';sep.textContent='›';sep.setAttribute('aria-hidden','true');nav.append(sep)}
     const b=document.createElement('button');b.type='button';b.className='crumb-link';b.innerHTML=esc(c.text)+' <span aria-hidden="true">⌄</span>';
     b.title=c.type==='chapter'
       ?(lang==='ta'?'வகுப்பு '+grade+' அத்தியாயங்களைத் தேர்ந்தெடுக்கவும்':'Choose a Class '+grade+' chapter')
       :(lang==='ta'?'தேர்வு':'Choose')+' '+c.text;
     b.setAttribute('aria-label',b.title);
     // The chapter chevron always opens the chapter list, never the
     // current chapter menu. Choosing a chapter then opens its 4–5 sections.
     b.onclick=()=>openPath(c.type);
     nav.append(b)
   });
 }
 function openPath(type){
   const dialog=$('pathDialog'),list=$('pathOptions');list.replaceChildren();
   const names={en:{class:'Choose a class',chapter:'Choose a chapter',exercise:'Choose an exercise'},ta:{class:'வகுப்பைத் தேர்வு செய்க',chapter:'அத்தியாயத்தைத் தேர்வு செய்க',exercise:'பயிற்சியைத் தேர்வு செய்க'}};
   $('pathTitle').textContent=names[lang][type];
   const options=[];
   if(type==='class'){
     [9,10].forEach(g=>options.push({title:ui('class')+' '+g,meta:classes[g].items.length+' '+ui('lessons'),active:g===grade,choose:()=>changeGrade(g)}));
   }else if(type==='chapter'){
     chapterList().forEach(c=>options.push({title:ui('chapter')+' '+c.number+' · '+tr(c.title),meta:ui(c.status)+' · '+(window.TriggleChapterHub?.textbookExercises?window.TriggleChapterHub.textbookExercises(chapterItems(c)).length:chapterItems(c).length)+' '+ui('existingQuestions'),active:c.id===selectedChapter()?.id,choose:()=>selectChapter(c)}));
   }else{
     const chapter=chapterForItem(current);
     const navigable=chapter?textbookExerciseList(chapter):activeList();
     const group=new Map();navigable.forEach(i=>{const k=i.exercise;if(!group.has(k))group.set(k,{key:k,count:0,first:i});group.get(k).count++});
     [...group.values()].forEach(g=>options.push({title:labelForGroup(g.key),meta:g.count+' '+ui('lessons'),active:g.key===current.exercise,choose:()=>selectLesson(g.first)}));
     navigable.filter(i=>i.exercise===current.exercise).forEach(item=>options.push({title:tr(item.label)+' · '+tr(item.title),meta:labelForGroup(item.exercise),active:item.id===current.id,choose:()=>selectLesson(item)}));
   }
   options.forEach(option=>{const button=document.createElement('button');button.type='button';button.className='path-option'+(option.active?' selected':'');button.innerHTML='<span><strong>'+esc(option.title)+'</strong><small>'+esc(option.meta)+'</small></span><span aria-hidden="true">'+(option.active?'✓':'›')+'</span>';
     button.onclick=()=>{dialog.close();option.choose()};list.append(button)
   });
   const chapterPicker=type==='chapter';
   dialog.classList.toggle('is-chapter-picker',chapterPicker);
   const hint=$('pathHint');
   hint.hidden=!chapterPicker;
   if(chapterPicker){
     hint.textContent=lang==='ta'
       ?grade+' ஆம் வகுப்பு · '+options.length+' அத்தியாயங்கள் · கீழே நகர்த்திப் பார்க்கவும்'
       :'Class '+grade+' · '+options.length+' chapters · Scroll to see all';
   }
   list.scrollTop=0;
   dialog.showModal();
 }
 function renderGrades(){const data=[{num:9,icon:'◈'},{num:10,icon:'◈'}];
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
     ?{concepts:'கருத்துகள்',exercises:'பயிற்சிகள்',quizzes:'சிறு தேர்வுகள்',activities:'சிந்தனை மூலை & செயல்பாடுகள்'}
     :{concepts:'Concepts',exercises:'Exercises',quizzes:'Quizzes',activities:'Thinking Corner & Activities'};
   const matches=item=>[item.label?.en,item.label?.ta,item.title?.en,item.title?.ta,item.q?.en,item.q?.ta,item.topic?.en,item.topic?.ta,item.exercise].join(' ').toLocaleLowerCase().includes(query);
   let visible=0;
   for(const chapter of chapterList()){
     const all=chapterItems(chapter);
     const visibleExercises=window.TriggleChapterHub?.textbookExercises?window.TriggleChapterHub.textbookExercises(all):all;
     const hit=!!query&&[chapter.title.en,chapter.title.ta,String(chapter.number)].join(' ').toLocaleLowerCase().includes(query);
     const found=query&&!hit?visibleExercises.filter(matches):visibleExercises;
     if(query&&!hit&&!found.length)continue;
     visible++;
     const section=document.createElement('section');section.className='curriculum-chapter';
     const selected=selectedChapter()?.id===chapter.id;
     const button=document.createElement('button');button.type='button';button.className='chapter-link';
     button.dataset.chapterId=chapter.id;button.classList.toggle('active',selected);
     button.setAttribute('aria-current',selected?'true':'false');
     const title=document.createElement('strong');title.textContent=ui('chapter')+' '+chapter.number+' · '+tr(chapter.title);
     const meta=document.createElement('small');
     const interactiveStages=chapter.id==='g9-ch1'?window.TRIGGLE_SET_PATH?.stages:
       chapter.id==='g9-ch2'?window.TRIGGLE_REAL_PATH?.stages:
       chapter.id==='g9-ch9'?window.TRIGGLE_PROB_PATH?.stages:
       chapter.id==='g10-ch2'?window.TRIGGLE_G10_CH2_PATH?.stages:
       chapter.id==='g10-ch3'?window.TRIGGLE_G10_CH3_PATH?.stages:
       chapter.id==='g10-ch4'?window.TRIGGLE_G10_CH4_PATH?.stages:
       chapter.id==='g10-ch5'?window.TRIGGLE_G10_CH5_PATH?.stages:
       chapter.id==='g10-ch6'?window.TRIGGLE_G10_CH6_PATH?.stages:
       chapter.id==='g12-ch1'&&lang==='en'?window.TriggleMatrixConcepts?.scenes:
       chapter.id==='g9-ch3'?window.TRIGGLE_ALGEBRA_PATH?.stages:null;
     const interactiveCount=Array.isArray(interactiveStages)?interactiveStages.length:0;
          const practiceCount=visibleExercises.length;
     const grade9Journey=chapter.id==='g9-ch1'||chapter.id==='g9-ch2'||chapter.id==='g9-ch9';
     meta.textContent=grade9Journey
       ?(interactiveCount?(lang==='ta'?interactiveCount+' செயல்வழிக் கருத்துகள்':interactiveCount+' interactive concepts')+' · ':'')+
         (lang==='ta'?practiceCount+' பயிற்சி வினாக்கள்':practiceCount+' exercise/practice questions')
       :(interactiveCount?(lang==='ta'?interactiveCount+' செயல்வழிக் கருத்துகள்':interactiveCount+' interactive concepts')+' · ':'')+practiceCount+' '+ui('existingQuestions');
     button.append(title,meta);button.onclick=()=>selectChapter(chapter);section.append(button);
     if(selected&&!query){
       const quick=document.createElement('div');quick.className='sidebar-chapter-sections';
       for(const key of (window.TRIGGLE_TEXTBOOK_TASKS?.[chapter.id]?.length?['concepts','exercises','quizzes','activities']:['concepts','exercises','quizzes'])){
         const direct=document.createElement('button');direct.type='button';direct.dataset.section=key;
         direct.textContent=menuNames[key]+(grade9Journey&&key==='exercises'?' ('+practiceCount+')':'');
         direct.classList.toggle('active',chapterOverview?.id===chapter.id&&chapterSection===key);
         direct.addEventListener('click',()=>openChapterSection(key,chapter));
         quick.append(direct);
       }
       section.append(quick);
     }
     if(query){
       const result=hit?visibleExercises:found;
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
      onConcept:(index,replace)=>{conceptIndex=index;updateUrl(replace);},
      onSection:(key)=>openChapterSection(key,chapter),
      orderedExercises:textbookExerciseList(chapter),
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
  for(const key of ['concepts','prerequisites','exercises','quizzes']){const row=document.createElement('li');const label=document.createElement('span');label.textContent=ui(key);const state=document.createElement('small');state.textContent=ui('planned');
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
  s={...s,...window.TriggleG9Math?.get(current)?.steps[index]};
  const chapter1Math=window.TriggleChapter1Math?.getStep?.(current,index);
  if(chapter1Math)s={...s,math:chapter1Math};
  if(!s.math&&!isGeometryExercise(current)){
   const remainingMath=window.TriggleG10RemainingMath?.getStep?.(current,index)||window.TriggleG10Ch2FractionMath?.getStep?.(current,index);
   if(remainingMath)s={...s,math:remainingMath};
  }
  const li=document.createElement('li');li.className='worked-step';
  const number=document.createElement('span');number.className='step-circle';number.textContent=index+1;
  const body=document.createElement('div');const reason=document.createElement('div');reason.className='step-reason';
  if(s.reasonMath)reason.innerHTML=math(s.reasonMath[lang]||s.reasonMath.en);else reason.textContent=tr(s);
  if(englishInTamilReader(tr(s)))reason.lang='en';
  const equation=document.createElement('div');equation.className='step-equation';
  const fragments=String(s.eq||'').split(/\s+;\s+/);
  if(s.math){equation.classList.add('structured-equation');equation.innerHTML=math(s.math);}
  else if(fragments.length>1&&fragments.length<=8){equation.classList.add('step-equation-group');equation.innerHTML=fragments.map(x=>'<span class="math-part">'+math(x)+'</span>').join('');}
  else equation.innerHTML=math(s.eq);
  body.append(reason,equation);li.append(number,body);return li;
 }

 function appendFinalStep(steps){
  // Show the answer once after all worked calculations, not in a separate card.
  const answer=$('answerText');
  if(!answer.textContent.trim())return;
  const li=document.createElement('li');li.className='worked-step final-answer-step';
  li.setAttribute('aria-label',ui('finalAnswer'));
  const number=document.createElement('span');number.className='step-circle';
  number.textContent='✓';number.setAttribute('aria-hidden','true');
  const body=document.createElement('div');body.className='final-answer-content';
  const title=document.createElement('strong');title.className='final-answer-label';
  title.textContent=ui('finalAnswer');
  const result=document.createElement('div');result.className='final-answer-value';
  if(englishInTamilReader(tr(lang==='ta'&&current.answerTa?current.answerTa:current.answer)))result.lang='en';
  result.classList.toggle('answer-grid',answer.classList.contains('answer-grid'));
  result.classList.toggle('answer-grid-many',answer.classList.contains('answer-grid-many'));
  result.innerHTML=answer.innerHTML;
  body.append(title,result);li.append(number,body);steps.append(li);
 }
 const prepareLessonMath=()=>window.TriggleNotation?.prepare?.($('lessonCard'));
 const lessonMathObserver=typeof ResizeObserver==='function'?new ResizeObserver(prepareLessonMath):null;
 function renderSteps(){
  lessonMathObserver?.disconnect();
  const authored=window.TriggleWorkedDisplay?.get(current,lang);
  $('lessonCard').classList.toggle('twd-lesson',!!authored);
  $('questionText').classList.toggle('twd-question',!!authored);
  $('answerText').classList.toggle('twd-answer',!!authored);
  $('answerBox').hidden=true;
  if(authored){
   // Each subquestion already has its worked answer in sequence. Do not duplicate it.
   $('stepsList').innerHTML=authored.steps;
   $('answerText').classList.remove('answer-grid','answer-grid-many');
   $('answerText').replaceChildren();
   $('stepCount').textContent=lang==='ta'?current.steps.length+' பகுதிகள்':current.steps.length+' parts';
   $('lessonCard').classList.toggle('many-steps',true);
   return;
  }
  const all=current.steps||[];const ul=$('stepsList');ul.replaceChildren();
  // TRACE teaching bridge: begin with meaning, without changing textbook
  // exercise data, authored steps or strict mathematical source checksums.
  const teacherBridge=window.TriggleG10Ch2Bridge?.get?.(current,lang);
  if(teacherBridge){
   const intro=document.createElement('li');intro.className='g10ch2-teaching-bridge';
   const title=document.createElement('strong');title.textContent=teacherBridge.title;
   const p=document.createElement('p');p.textContent=teacherBridge.explain;
   const formula=document.createElement('div');formula.className='g10ch2-bridge-math';
   formula.innerHTML=math(teacherBridge.math);
   intro.append(title,p,formula);ul.append(intro);
  }
  all.forEach((s,i)=>ul.append(buildStep(s,i)));
  const localizedAnswer=tr(lang==='ta'&&current.answerTa?current.answerTa:current.answer)||'';const parts=String(localizedAnswer).split(/\s+;\s+/);
  const grade9Answer=window.TriggleG9Math?.get(current)?.answerMath;
  const possibleAnswerMath=(grade9Answer?.[lang]||grade9Answer?.en||grade9Answer)||current.answerMath||window.TriggleChapter1Math?.getAnswer?.(current)||(!isGeometryExercise(current)&&window.TriggleG10RemainingMath?.getAnswer?.(current))||window.TriggleG10Ch2FractionMath?.getAnswer?.(current);
  const answerMath=possibleAnswerMath?.[lang]||possibleAnswerMath?.en||possibleAnswerMath;
  const canGrid=!answerMath&&parts.length>1&&parts.length<=8&&parts.every(v=>v.length<60);
  $('answerText').classList.toggle('answer-grid',canGrid);
  $('answerText').classList.toggle('answer-grid-many',canGrid&&parts.length>=4);
  $('answerText').innerHTML=answerMath?math(answerMath):(canGrid?parts.map(v=>'<span class="answer-part">'+math(v)+'</span>').join(''):math(localizedAnswer));
  appendFinalStep(ul);
  $('stepCount').textContent=lang==='ta'?all.length+' படிகள்':all.length+' steps';
  $('lessonCard').classList.toggle('many-steps',all.length>3);
  // Language switching and navigation replace formula nodes. Set Grade 9 keyboard state
  // immediately and refresh all grades when layout, fonts, or viewport widths settle.
  if(grade===9)prepareLessonMath();
  if(lessonMathObserver){
   for(const formula of $('lessonCard').querySelectorAll('.triggle-tex')){
    lessonMathObserver.observe(formula);
    if(formula.firstElementChild)lessonMathObserver.observe(formula.firstElementChild);
    // KaTeX glyph widths can change after fonts settle without resizing the
    // outer formula box. Observe the painted glyph layer too, so formulas
    // that newly overflow immediately become keyboard-scrollable.
    const glyphs=formula.querySelector('.katex-html');
    if(glyphs)lessonMathObserver.observe(glyphs);
   }
  }
  requestAnimationFrame(()=>{
   prepareLessonMath();
   // The layout read starts loading any math fonts this question newly uses.
   document.fonts?.ready.then(prepareLessonMath);
  });
  if(grade!==9)document.fonts?.ready.then(prepareLessonMath);
 }
 document.fonts?.addEventListener('loadingdone',()=>{
  if(!$('lessonCard').hidden)prepareLessonMath();
 });
 const ch1SvgFigures={
  'c10-1-1-2-q4':{src:'./assets/grade10-ch1/ex1-2-q4.svg',alt:'Arrow diagrams and coordinate plots for Exercise 1.2 Q4',altTa:'பயிற்சி 1.2 வினா 4-க்கான அம்புக்குறிப் படங்கள் மற்றும் வரைபடங்கள்',caption:'Original arrow diagram and plot representing relations in Exercise 1.2 Q4.',captionTa:'பயிற்சி 1.2 வினா 4-இன் உறவுகளைக் குறிக்கும் அம்புக்குறிப் படம் மற்றும் வரைபடம்.'},
  'c10-1-1-2-q5':{src:'./assets/grade10-ch1/ex1-2-q5.svg',alt:'Arrow diagram mapping salaries to employees in Exercise 1.2 Q5',altTa:'பயிற்சி 1.2 வினா 5-இல் ஊதியங்களைப் பணியாளர்களுடன் இணைக்கும் அம்புக்குறிப் படம்',caption:'Original arrow diagram showing the salary-to-employee relation in Exercise 1.2 Q5.',captionTa:'பயிற்சி 1.2 வினா 5-இல் ஊதியத்திற்கும் பணியாளர்களுக்கும் இடையிலான உறவைக் காட்டும் அம்புக்குறிப் படம்.'},
  'c10-1-1-3-q4':{src:'./assets/grade10-ch1/figure1-16.svg',alt:'Piecewise linear graph of y = f(x) passing through (0, 9), (4, 3), (7, 6) and (10, 0)',altTa:'(0, 9), (4, 3), (7, 6) மற்றும் (10, 0) வழியாகச் செல்லும் y = f(x) வரைபடம் (படம் 1.16)',caption:'Original diagram replacing Fig. 1.16 for Exercise 1.3 Q4.',captionTa:'பயிற்சி 1.3 வினா 4-க்கான படம் 1.16 வரைபடம்.'},
  'c10-1-1-3-q7':{src:'./assets/grade10-ch1/figure1-17.svg',alt:'Open cuboid tray folded from a 24 cm square with x by x corner cut-outs',altTa:'24 செ.மீ சதுரத் தாளின் மூலைகளில் x × x சதுரங்களை வெட்டி மடித்து உருவாக்கும் திறந்த பெட்டி (படம் 1.17)',caption:'Original diagram replacing Fig. 1.17 for Exercise 1.3 Q7.',captionTa:'பயிற்சி 1.3 வினா 7-க்கான படம் 1.17 வரைபடம்.'},
  'c10-1-1-3-q10':{src:'./assets/grade10-ch1/ex1-3-q10.svg',alt:'Data table and linear plot y = 0.9x + 24.5 for forehand length vs height',altTa:'முன்கை நீளம் மற்றும் உயரத்திற்கான தரவு அட்டவணையும் y = 0.9x + 24.5 நேர்க்கோட்டு வரைபடமும்',caption:'Original data table and linear plot for Exercise 1.3 Q10.',captionTa:'பயிற்சி 1.3 வினா 10-க்கான தரவு அட்டவணை மற்றும் நேர்க்கோட்டு வரைபடம்.'},
  'c10-1-1-4-q1':{src:'./assets/grade10-ch1/figure1-4-graphs.svg',alt:'Four vertical line test graphs (i) through (iv) in Exercise 1.4 Q1',altTa:'பயிற்சி 1.4 வினா 1-க்கான நான்கு குத்துக்கோடு சோதனை வரைபடங்கள் (i)–(iv)',caption:'Original vertical-line-test graphs replacing Fig. 1.4 graphs for Exercise 1.4 Q1.',captionTa:'பயிற்சி 1.4 வினா 1-க்கான குத்துக்கோடு சோதனை வரைபடங்கள் (படம் 1.18).'},
  'c10-1-1-4-q2':{src:'./assets/grade10-ch1/ex1-4-q2.svg',alt:'Arrow diagram, table and graph of f(x) = x/2 - 1 from A to B with 9 unmapped',altTa:'f(x) = x/2 - 1 சார்பிற்கான அம்புக்குறிப் படம், அட்டவணை மற்றும் வரைபடம் (பயிற்சி 1.4 வினா 2)',caption:'Original arrow diagram, table and plot for Exercise 1.4 Q2.',captionTa:'பயிற்சி 1.4 வினா 2-க்கான அம்புக்குறிப் படம், அட்டவணை மற்றும் வரைபடம்.'},
  'c10-1-1-4-q3':{src:'./assets/grade10-ch1/ex1-4-q3.svg',alt:'Many-to-one arrow diagram, table and graph for f = {(1,2),(2,2),(3,2),(4,3),(5,4)}',altTa:'f = {(1,2),(2,2),(3,2),(4,3),(5,4)} சார்பிற்கான அம்புக்குறிப் படம், அட்டவணை மற்றும் வரைபடம் (பயிற்சி 1.4 வினா 3)',caption:'Original arrow diagram, table and graph for Exercise 1.4 Q3.',captionTa:'பயிற்சி 1.4 வினா 3-க்கான அம்புக்குறிப் படம், அட்டவணை மற்றும் வரைபடம்.'},
  'g9-ch7-ex7.1-q6':{src:'./assets/grade9-ch7/ex7-1-q6.svg',alt:'Outer triangle ABC with BC = 42 cm and CA = 34 cm, containing shaded right triangle ABD with AD = 12 cm, BD = 16 cm, and right angle at D.',altTa:'BC = 42 செ.மீ, CA = 34 செ.மீ கொண்ட முக்கோணம் ABC-க்குள் AD = 12 செ.மீ, BD = 16 செ.மீ மற்றும் D-இல் செங்கோணம் கொண்ட நிழலிடப்பட்ட முக்கோணம் ABD.',caption:'Textbook Fig. 7.8: Shaded right triangle ABD inside ΔABC',captionTa:'பாடநூல் படம் 7.8: ΔABC-க்குள் நிழலிடப்பட்ட செங்கோண முக்கோணம் ABD'},
  'g9-ch4-ex4.1-q4':{src:'./assets/grade9-ch4/ex4-1-q4.svg',alt:'Two triangles ABC and FDE showing corresponding equal angles 60 and 70 deg with AB=DF.',altTa:'ΔABC ≅ ΔFDE (கோ-ப-கோ சர்வசமம்)',caption:'ΔABC ≅ ΔFDE (ASA congruence)',captionTa:'ΔABC ≅ ΔFDE (கோ-ப-கோ சர்வசமம்)'},
  'g9-ch4-ex4.2-q3':{src:'./assets/grade9-ch4/ex4-2-q3.svg',alt:'Rectangle ABCD with diagonals AC and BD intersecting at O, showing angle OAB = 46 deg.',altTa:'செவ்வக மூலைவிட்டங்கள் O-இல் சமமாக வெட்டும்',caption:'Rectangle diagonals bisect equally at O',captionTa:'செவ்வக மூலைவிட்டங்கள் O-இல் சமமாக வெட்டும்'},
  'g9-ch4-ex4.2-q4':{src:'./assets/grade9-ch4/ex4-2-q4.svg',alt:'Rhombus with perpendicular diagonals bisecting into right triangle legs 6 cm and 8 cm.',altTa:'சாய்சதுர மூலைவிட்டங்கள் 90°-இல் இருசமக்கூறிடும்',caption:'Rhombus diagonals bisect at 90° (legs 6 cm, 8 cm)',captionTa:'சாய்சதுர மூலைவிட்டங்கள் 90°-இல் இருசமக்கூறிடும்'},
  'g9-ch4-ex4.2-q6':{src:'./assets/grade9-ch4/ex4-2-q6.svg',alt:'Triangle ABP and parallelogram ABCD sharing base AB between parallel lines.',altTa:'ஒரே அடி AB மற்றும் இணைகோடுகளுக்கு இடைப்பட்ட முக்கோணமும் இணைகரமும்',caption:'Triangle and parallelogram on the same base AB between parallels',captionTa:'ஒரே அடி AB மற்றும் இணைகோடுகளுக்கு இடைப்பட்ட முக்கோணமும் இணைகரமும்'},
  'g9-ch4-ex4.3-q1':{src:'./assets/grade9-ch4/ex4-3-q1.svg',alt:'Circle centre O, radius 26 cm, half-chord 10 cm, perpendicular distance d to find.',altTa:'ஆரம் 26 செ.மீ, அரை நாண் 10 செ.மீ, செங்குத்துத் தொலைவு d = ?',caption:'Radius 26 cm, half-chord 10 cm, perpendicular distance d = ?',captionTa:'ஆரம் 26 செ.மீ, அரை நாண் 10 செ.மீ, செங்குத்துத் தொலைவு d = ?'},
  'g9-ch4-ex4.3-q2':{src:'./assets/grade9-ch4/ex4-3-q2.svg',alt:'Circle centre O, distance 8 cm to chord 30 cm, radius r to find.',altTa:'அரை நாண் 15 செ.மீ, தொலைவு 8 செ.மீ, ஆரம் r = ?',caption:'Half-chord 15 cm, distance 8 cm, radius r = ?',captionTa:'அரை நாண் 15 செ.மீ, தொலைவு 8 செ.மீ, ஆரம் r = ?'},
  'g9-ch4-ex4.3-q4':{src:'./assets/grade9-ch4/ex4-3-q4.svg',alt:'Circle centre O, radius 15 cm, perpendicular distance 12 cm to chord AB.',altTa:'ஆரம் 15 செ.மீ, தொலைவு 12 செ.மீ, நாண் நீளம் AB = ?',caption:'Radius 15 cm, distance 12 cm, full chord AB = ?',captionTa:'ஆரம் 15 செ.மீ, தொலைவு 12 செ.மீ, நாண் நீளம் AB = ?'},
  'g9-ch4-ex4.3-q6':{src:'./assets/grade9-ch4/ex4-3-q6.svg',alt:'Two intersecting circles of radii 5 cm and 3 cm with centre distance 4 cm.',altTa:'ஆரங்கள் 5 செ.மீ, 3 செ.மீ; மையத் தொலைவு 4 செ.மீ',caption:'Radii 5 cm and 3 cm, centre distance 4 cm (3-4-5 right triangle)',captionTa:'ஆரங்கள் 5 செ.மீ, 3 செ.மீ; மையத் தொலைவு 4 செ.மீ'}
 };
 const resolveFigureSpec=item=>item&&ch1SvgFigures[item.id]
  ?{src:ch1SvgFigures[item.id].src,alt:{en:ch1SvgFigures[item.id].alt,ta:ch1SvgFigures[item.id].altTa||ch1SvgFigures[item.id].alt},caption:{en:ch1SvgFigures[item.id].caption,ta:ch1SvgFigures[item.id].captionTa||ch1SvgFigures[item.id].caption}}
  :(item?.figureSrc?{src:item.figureSrc,alt:item.figureAlt,caption:item.figureCaption}:null);
 function isQuestionFigure(item){
  if(resolveFigureSpec(item))return true;
  // The Figure button already opens a full Venn: no duplicate mini preview.
  if(window.TriggleSetVenn?.supports(item))return false;
  return !!(item.diagram && typeof item.diagram==='object' && /\b(diagram|figure|labelled|labeled)\b/i.test(item.q?.en||''));
 }
 function hasUsefulFigure(item){
  if(resolveFigureSpec(item))return true;
  if(window.TriggleSetVenn?.supports(item))return true;
  const d=item.diagram;if(!d)return false;
  if(isQuestionFigure(item))return true;
  const kind=typeof d==='object'?d.kind:d;
  // Symbolic identity proofs have no physical drawing to reproduce; do not show a token figure.
  if(['identity','symbolic','symbolic-x'].includes(kind))return item.classNum===11&&item.exercise==='3.4';
  if(['stats','area','sets'].includes(kind))return item.kind==='practice';
  return ['triangle','two-triangles','two-right','kite','tree','unitcircle','complement-pairs','tower','circle','wave','inverse','real-number-line','real-number-arrows'].includes(kind);
 }
 function textbookFigureImage(item,maxHeight){
  const spec=resolveFigureSpec(item);
  const alt=tr(spec?.alt)||tr(item.label)+' textbook figure';
  return '<img src="'+esc(encodeURI(spec?.src||''))+'" alt="'+esc(alt)+'" style="display:block;max-width:100%;max-height:'+maxHeight+'vh;width:auto;height:auto;margin:auto;object-fit:contain">';
 }
 function renderInlineFigure(){
   const figure=$('inlineFigure');const yes=isQuestionFigure(current);
   figure.hidden=!yes; if(!yes)return;
   const aligned=window.TriggleSetVenn?.render(current,lang);
   const figSpec=resolveFigureSpec(current);
   const svg=figSpec?textbookFigureImage(current,66):(aligned?.html||window.TriggleDraw.drawClassic({demo:current.diagram,ref:tr(current.label),title:tr(current.title)}));
   $('inlineFigureVisual').innerHTML=svg;
   const d=current.diagram;
   const measures=d?.kind==='triangle'?((lang==='ta'?'எதிர்ப்பக்கம் ':'Opposite ')+d.opp+' · '+(lang==='ta'?'அடுத்துள்ள பக்கம் ':'Adjacent ')+d.adj+' · '+(lang==='ta'?'கர்ணம் ':'Hypotenuse ')+d.hyp+'. '):'';
   $('inlineFigureCaption').textContent=figSpec?(tr(figSpec.caption)||'2025 Tamil Nadu Mathematics textbook figure.'):(aligned?.caption||(measures+ui('inlineFigureNote')));
 }
 function renderText(){
  // Icon-only controls on narrow readers still have full bilingual names.
  $('browseBtn').setAttribute('aria-label',ui('browse'));
  $('homeBtn').setAttribute('aria-label',ui('home'));
  $('questionReturn').setAttribute('aria-label',lang==='ta'?'அத்தியாய வழிசெலுத்தல்':'Chapter navigation');
  $('sidebar').setAttribute('aria-label',ui('navigationLabel'));$('exerciseList').setAttribute('aria-label',ui('navigationLabel'));$('search').setAttribute('aria-label',ui('searchLabel'));$('pathClose').setAttribute('aria-label',ui('closeNavigation'));$('closeSidebar').setAttribute('aria-label',ui('closeNavigation'));document.querySelector('.lang-switch').setAttribute('aria-label',ui('chooseLanguage'));document.querySelector('.side-brand small').textContent=ui('visualMathematics');
  for(const [id,key] of [['crumb','navigationLabel'],['inlineFigureOpen','expandFigure'],['stepsRegion','completeSolution'],['quickSteps','quickSolution'],['stepsList','workedSolution'],['classDock','switchClass'],['figureDialog','diagramDialog']])$(id).setAttribute('aria-label',ui(key));
  document.querySelector('.page-controls').setAttribute('aria-label',ui('navigateQuestions'));$('figureBtn').title=ui('figureLabel');
  document.documentElement.lang=lang;document.body.classList.toggle('lang-ta',lang==='ta');document.querySelectorAll('[data-i18n]').forEach(el=>el.textContent=ui(el.dataset.i18n));$('search').placeholder=ui('search');$('classSubtitle').textContent=ui('subtitle');$('langEn').classList.toggle('active',lang==='en');$('langTa').classList.toggle('active',lang==='ta');$('langEn').setAttribute('aria-pressed',String(lang==='en'));$('langTa').setAttribute('aria-pressed',String(lang==='ta'))}
 function renderDiscovery(){
   window.TriggleDiscovery?.mount($('discoveryView'),{
     mode:homeView?'home':'class',grade,lang,curriculum,classes,lastByGrade,lastOpened,
     openGrade:changeGrade,openChapter:openChapterFor,openQuestion:openQuestionFor,goHome
   });
 }
 function render(){if(current&&window.TriggleG9Ch5Overrides?.has(current.id))current=window.TriggleG9Ch5Overrides.get(current.id);renderText();renderGrades();
    // Chapter-only typography: follow lesson, chapter hub, browser back, language and grade switching.
    const typographyChapter=homeView||classIndex?null:(chapterOverview?.number??chapterForItem(current)?.number);
    document.body.classList.toggle('g10-ch2-type',grade===10&&String(typographyChapter)==='2');
   $('questionReturn').hidden=true;
   const showingQuestion=!homeView&&!classIndex&&!chapterOverview;
   if(!showingQuestion)lessonMathObserver?.disconnect();
   document.body.classList.toggle('g9-math-first',grade===9&&!homeView&&!classIndex);
   if(grade===9&&showingQuestion)$('stepsList').setAttribute('role','list');else $('stepsList').removeAttribute('role');
   $('allChaptersReturn').hidden=true; // Chapters remain accessible through the existing breadcrumb/menu.
   $('questionNavDock').hidden=!showingQuestion;
   document.body.classList.toggle('textbook-reader',showingQuestion);
   const discovering=homeView||classIndex;
   document.body.classList.toggle('discovery-active',discovering);
   document.body.classList.toggle('home-active',homeView);
   syncDrawer();
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
   const isTextbookExercise=!!questionChapter&&textbookExerciseList(questionChapter).some(item=>item.id===current.id);
   $('exerciseIndexLink').hidden=!isTextbookExercise;
   $('exerciseIndexLink').textContent=lang==='ta'?'← பயிற்சிகள்':'← Exercises';
   $('exerciseIndexLink').setAttribute('aria-label',lang==='ta'?'பயிற்சிகளின் பட்டியலுக்குத் திரும்பு':'Back to exercise list');
   if(questionChapter){
     const cameFrom=questionOrigin?.grade===grade&&questionOrigin?.chapterId===questionChapter.id;
     const returnTo=cameFrom&&['examples','exercises'].includes(questionOrigin.section)
       ?questionOrigin.section:sectionForQuestion(current);
     const label=isTextbookExercise?(lang==='ta'?'அத்தியாயத்திற்குத் திரும்பு':'Back to chapter'):
       returnTo==='examples'?(lang==='ta'?'தீர்க்கப்பட்ட எடுத்துக்காட்டுகளுக்குத் திரும்பு':'Back to worked examples'):
       returnTo==='exercises'?(lang==='ta'?'அனைத்துப் பயிற்சிகளுக்கும் திரும்பு':'Back to all exercises'):
       (lang==='ta'?'அத்தியாயத்திற்குத் திரும்பு':'Back to chapter');
     $('questionReturnBtn').textContent='← '+label;
     // Fixed breadcrumbs and bottom Back to all chapters replace this duplicate row.
   }
  $('classHeading').textContent=ui('class')+' '+grade;$('classEmblem').querySelector('span').textContent=grade;
  renderBreadcrumb(chapter);
  $('gradeTotal').textContent=list.length+' '+ui('lessons');$('questionLabel').textContent=labelForGroup(current.exercise).toUpperCase();$('itemPosition').textContent=num(position)+' / '+num(list.length);
  $('questionTitle').textContent=tr(current.topic);$('questionHead').textContent=tr(current.label);
  const workedDisplay=window.TriggleWorkedDisplay?.get(current,lang);
  const questionMath=window.TriggleG9Math?.get(current)?.questionMath||current.questionMath||window.TriggleChapter1Math?.getQuestion?.(current,lang)||(!isGeometryExercise(current)&&window.TriggleG10RemainingMath?.getQuestion?.(current,lang));
  const renderDataTableHtml=dt=>{
    if(lang==='ta'&&dt?.ta)dt={...dt,...dt.ta};
    if(!dt||!Array.isArray(dt.headers)||!Array.isArray(dt.rows))return '';
    const ths=dt.headers.map(h=>'<th scope="col">'+esc(h)+' </th>').join('');
    const trs=dt.rows.map(r=>'<tr>'+r.map((cell,c)=>{const body=/^\d+(?:\.\d+)?$/.test(String(cell).trim())?math({latex:String(cell).trim(),fallback:String(cell).trim()}):esc(cell);return c===0?'<th scope="row">'+body+' </th>':'<td>'+body+' </td>';}).join('')+'</tr>').join('');
    return '<div class="triggle-table-wrap"><table class="triggle-data-table"'+(dt.caption?' aria-label="'+esc(dt.caption)+'"':'')+'><thead><tr>'+ths+'</tr></thead><tbody>'+trs+'</tbody></table></div> ';
  };
  const ex82TamilPrompt=lang==='ta'&&grade===10&&current.chapter==='8'&&current.exercise==='8.2'&&!!current.q?.ta;
  // Ex8.2's source-verified Tamil text takes precedence over its English-only
  // authored questionMath; equations in the worked solution remain unchanged.
  $('questionText').innerHTML=ex82TamilPrompt?math(current.q.ta):(workedDisplay?.question||math(questionMath?.[lang]||questionMath?.en||tr(current.q)));
  if(Array.isArray(current.choices)&&typeof current.correctIndex==='number'){
    const mcqWrap=document.createElement('div');mcqWrap.className='triggle-mcq-choices';mcqWrap.setAttribute('role','group');
    mcqWrap.setAttribute('aria-label',lang==='ta'?'விருப்பங்களைத் தேர்ந்தெடுக்கவும்':'Choose an option');
    const feedback=document.createElement('p');feedback.className='triggle-mcq-feedback';feedback.setAttribute('role','status');feedback.setAttribute('aria-live','polite');
    current.choices.forEach((choice,idx)=>{
      const btn=document.createElement('button');btn.type='button';btn.className='triggle-mcq-btn';
      btn.setAttribute('aria-pressed','false');
      btn.innerHTML=math(choice[lang]||choice.en||'');
      btn.addEventListener('click',()=>{
        mcqWrap.querySelectorAll('.triggle-mcq-btn').forEach(b=>{b.setAttribute('aria-pressed','false');b.classList.remove('is-correct','is-wrong');});
        btn.setAttribute('aria-pressed','true');
        const ok=idx===current.correctIndex;
        btn.classList.add(ok?'is-correct':'is-wrong');
        feedback.textContent=ok?(lang==='ta'?'✓ சரியான விடை! கீழே உள்ள தீர்வைப் பார்க்கவும்.':'✓ Correct! See the worked solution below.'):(lang==='ta'?'✗ மீண்டும் முயற்சிக்கவும் அல்லது கீழே உள்ள தீர்வைப் பார்க்கவும்.':'✗ Try again or check the worked solution below.');
        feedback.className='triggle-mcq-feedback '+(ok?'is-correct':'is-wrong');
      });
      mcqWrap.append(btn);
    });
    $('questionText').append(mcqWrap,feedback);
  }
  if(current.dataTable){
    const tableHtml=renderDataTableHtml(current.dataTable);
    const rawQ=tr(current.q);
    const tableSplit=lang==='ta'&&current.dataTable.replaceRegexTa?current.dataTable.replaceRegexTa:current.dataTable.replaceRegex;
    if(tableSplit){
      const rx=new RegExp(tableSplit);
      if(rx.test(rawQ)){
        const [before='',after='']=rawQ.split(rx);
        const rawParts=questionMath?.[lang]||questionMath?.en;
        $('questionText').innerHTML=Array.isArray(rawParts)
          ?math(rawParts).replace(/Type of maids[\s\S]*?(?=A family is selected)/i,tableHtml)
          :math(before)+tableHtml+math(after);
      }else{$('questionText').innerHTML+=tableHtml;}
    }else{$('questionText').innerHTML+=tableHtml;}
  }
  $('kindBadge').textContent=ui(current.kind==='practice'?'typePractice':'typeBook');
  if(lang==='ta'&&!current.q?.ta)$('kindBadge').textContent+=' · தமிழ் மொழிபெயர்ப்பு நிலுவையில்';
  if(englishInTamilReader(tr(current.q)))$('questionText').lang='en';else $('questionText').removeAttribute('lang');
  $('markDone').setAttribute('aria-pressed',String(completed.has(current.id)));$('markDone').setAttribute('aria-label',ui(completed.has(current.id)?'learned':'markDone'));$('markDone').innerHTML=(completed.has(current.id)?'✓ ':'○ ')+'<span>'+esc(ui(completed.has(current.id)?'learned':'markDone'))+'</span>';

  $('figureBtn').hidden=!hasUsefulFigure(current);
  renderInlineFigure();
  $('pageStatus').textContent=position+' '+ui('of')+' '+list.length;$('pageFill').style.width=(position/list.length*100)+'%';
  $('previous').disabled=n===0;$('next').disabled=n===list.length-1;
  const geometryExercise=isGeometryExercise(current)&&isTextbookExercise;
  $('questionTopNav').hidden=!geometryExercise;
  $('questionTopNav').setAttribute('aria-label',ui('navigateQuestions'));
  $('questionTopPrevious').disabled=$('previous').disabled;
  $('questionTopNext').disabled=$('next').disabled;
  for(const [id,label] of [['questionTopPrevious',ui('previous')],['questionTopNext',ui('nextQuestion')]]){
    $(id).setAttribute('aria-label',label);
    $(id).title=label;
  }
  if(geometryExercise&&lang==='ta')$('stepsList').lang='en';
  else $('stepsList').removeAttribute('lang');
  $('previous').innerHTML='← '+esc(ui('previous'));
  $('next').innerHTML=isTextbookExercise&&n===list.length-1
    ?esc(lang==='ta'?'பயிற்சி முடிந்தது':'End of exercise')+' ✓'
    :esc(document.body.classList.contains('textbook-reader')?(lang==='ta'?'அடுத்த பக்கம்':'Next page'):ui('nextQuestion'))+' →';
  renderSteps();
  const difficulty=window.TriggleDifficulty?.get(current);
  const indicator=$('difficultyIndicator');
  indicator.hidden=!difficulty;
  indicator.textContent=difficulty?({easy:'🟢 Easy',medium:'🟡 Medium',difficult:'🔴 Difficult'}[difficulty.level]):'';
  indicator.lang='en';
  if(difficulty)indicator.dataset.level=difficulty.level;else delete indicator.dataset.level;
  // A review flag never replaces or conceals authored working.
  $('solutionReview').hidden=!window.TriggleDifficulty?.solutionReviews?.[current.id];
  $('solutionReview').lang='en';
  renderList();
  window.dispatchEvent(new CustomEvent('triggle:lessonchange',{detail:{item:current,lang,grade}}));
 }
 function syncDrawer(){
   const sidebar=$('sidebar');
   const collapsible=homeView||mobile.matches;
   if(!collapsible)drawerOpen=false;
   const sidebarHadFocus=sidebar.contains(document.activeElement);
   document.body.classList.toggle('drawer-open',drawerOpen);
   document.querySelector('.workspace').inert=drawerOpen;
   sidebar.inert=collapsible&&!drawerOpen;
   $('browseBtn').setAttribute('aria-expanded',String(drawerOpen));
   if(drawerOpen){
     sidebar.setAttribute('role','dialog');
     sidebar.setAttribute('aria-modal','true');
   }else{
     sidebar.removeAttribute('role');
     sidebar.removeAttribute('aria-modal');
     if(sidebar.inert&&sidebarHadFocus)$('browseBtn').focus({preventScroll:true});
   }
 }
 function openDrawer(focusTarget=$('browseDirectory')){
   drawerOpen=homeView||mobile.matches;
   syncDrawer();
   if(!drawerOpen)$('exerciseList').scrollTop=0;
   focusTarget.focus({preventScroll:true});
 }
 function closeDrawer(){
   if(!drawerOpen)return;
   drawerOpen=false;
   syncDrawer();
   $('browseBtn').focus({preventScroll:true});
 }
 function showDiagram(){
  if(!hasUsefulFigure(current))return;
  const context={item:current,lang,renderText:tr};
  const figSpec=resolveFigureSpec(current);
  let graphic=figSpec?{html:textbookFigureImage(current,78),caption:tr(figSpec.caption)||'2025 textbook figure.'}:(window.TriggleSetVenn?.render(current,lang)||window.TriggleConcept?.render(context));
  if(!graphic){let svg='';if(current.diagram&&typeof current.diagram==='object')svg=window.TriggleDraw.drawClassic({demo:current.diagram,ref:tr(current.label),title:tr(current.title)});else svg=window.TriggleDraw.drawSimple(current.diagram||'identity');graphic={html:svg,caption:lang==='ta'?'படம் விளக்கத்திற்காக மட்டுமே; அளவுப்படி இல்லாமல் இருக்கலாம்.':'Original conceptual illustration; not necessarily drawn to scale.'}}
  $('diagramContent').innerHTML=graphic.html;
  $('visualTitle').textContent=tr(figSpec?.caption)||tr(current.title);
  // Same final answer inside glass viewer lets students compare regions to result.
  $('diagramCompareAnswer').innerHTML=$('answerText').innerHTML;
  $('diagramCompareLabel').textContent=ui('finalAnswer');
  $('figureDialog').showModal();
  if(grade===9)window.TriggleNotation?.prepareSvg?.($('diagramContent'),window.TriggleG9Math?.diagramLabels);
  $('closeDiagram').focus({preventScroll:true});
  window.TriggleConcept?.attach(context,$('diagramContent'));
 }
 $('previous').onclick=$('questionTopPrevious').onclick=()=>navMove(-1);
 $('next').onclick=$('questionTopNext').onclick=()=>navMove(1);
 $('exerciseIndexLink').onclick=()=>{const chapter=chapterForItem(current);if(chapter)openChapterSection('exercises',chapter);};
 $('allChaptersButton').onclick=()=>changeGrade(grade);
 $('markDone').onclick=()=>{if(completed.has(current.id))completed.delete(current.id);else completed.add(current.id);store('triggle.learned.v119',[...completed]);render()};
 $('homeBtn').onclick=e=>{e.preventDefault();goHome()};
 $('questionReturnBtn').onclick=()=>{
   const chapter=chapterForItem(current);
   if(!chapter)return;
   if(textbookExerciseList(chapter).some(item=>item.id===current.id)){
     openChapterSection('exercises',chapter);
     return;
   }
   const section=questionOrigin?.grade===grade&&questionOrigin?.chapterId===chapter.id&&
     ['examples','exercises'].includes(questionOrigin.section)
       ?questionOrigin.section:sectionForQuestion(current);
   openChapterSection(section,chapter);
 };
 $('browseBtn').onclick=()=>drawerOpen?closeDrawer():openDrawer();$('closeSidebar').onclick=closeDrawer;$('backdrop').onclick=closeDrawer;
 $('search').oninput=renderList;
 $('pathClose').onclick=()=>$('pathDialog').close();$('pathDialog').addEventListener('click',e=>{if(e.target===$('pathDialog'))$('pathDialog').close()});
 $('inlineFigureOpen').onclick=showDiagram;
 $('figureBtn').onclick=showDiagram;$('closeDiagram').onclick=()=>$('figureDialog').close();
 $('figureDialog').addEventListener('click',ev=>{if(ev.target===$('figureDialog'))$('figureDialog').close()});
 $('langEn').onclick=()=>changeLanguage('en');$('langTa').onclick=()=>changeLanguage('ta');
 function changeLanguage(v){lang=v;try{localStorage.setItem('triggle-language',v)}catch{}render()}
 window.addEventListener('keydown',e=>{
  if(e.key==='Escape'&&drawerOpen){closeDrawer();return}
  if(e.key==='/'&&!e.ctrlKey&&!e.metaKey&&e.target.tagName!=='INPUT'&&e.target.tagName!=='TEXTAREA'){e.preventDefault();openDrawer($('search'));return}
  if(drawerOpen&&e.key==='Tab'){const focusable=[...$('sidebar').querySelectorAll('button:not([disabled]),input:not([disabled]),a[href],summary')].filter(el=>el.getClientRects().length);if(focusable.length){const first=focusable[0],last=focusable.at(-1);if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus()}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus()}}}
  if(e.target.matches('input,textarea,select,button')||e.target.closest('.triggle-tex[tabindex="0"]')||$('figureDialog').open||$('pathDialog').open||chapterOverview||drawerOpen||e.altKey||e.metaKey||e.ctrlKey)return;
  if(e.key==='ArrowRight'){e.preventDefault();navMove(1)}else if(e.key==='ArrowLeft'){e.preventDefault();navMove(-1)}
 });
 window.addEventListener('popstate',()=>{let p=new URL(location.href).searchParams;if(restrictedRoute(p)){history.replaceState(null,'',location.pathname);p=new URL(location.href).searchParams;}const g=Number(p.get('class'));grade=publicGrade(g)&&classes[g]?g:9;current=classes[grade].items.find(x=>x.id===p.get('question'))||classes[grade].items.find(x=>x.id===lastByGrade[grade])||classes[grade].items[0];homeView=!p.has('class')&&!p.has('chapter')&&!p.has('question');classIndex=!homeView&&!p.has('chapter')&&!p.has('question');chapterOverview=p.has('question')?null:chapterList().find(c=>c.id===p.get('chapter'))||null;chapterSection=chapterOverview&&validSections.has(p.get('section'))?p.get('section'):null;conceptIndex=chapterSection==='concepts'&&/^\d+$/.test(p.get('concept')||'')?Number(p.get('concept')):null;$('search').value='';render();closeDrawer();resetScroll()});
 mobile.addEventListener('change',syncDrawer);remember();updateUrl(true);render();
})();
