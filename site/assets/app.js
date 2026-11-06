(()=>{'use strict';
 const $=id=>document.getElementById(id);
 const tr=x=>x && typeof x==='object' ? (x[lang]||x.en||'') : String(x||'');
 const dictionary={
 en:{yourClass:'YOUR CLASS',exploreExercise:'Find an exercise',saveNote:'Your progress stays on this device',openBasics:'Interactive basics',browse:'Exercises',basics:'Trigonometry Basics',studyMode:'YOUR LEARNING SPACE',diagram:'Figure',stepByStep:'HOW IT WORKS',quickSolution:'Quick solution',explainSlowly:'Understand deeply',learnStepByStep:'LEARN THE REASONING',backToQuestion:'Back to question',expandFigure:'Tap to enlarge diagram ↗',inlineFigureNote:'Reconstructed from the measurements in this question, not copied from the textbook.',finalAnswer:'Final answer',markDone:'Mark learned',learned:'Learned',previous:'Previous',nextQuestion:'Next question',source:'Reference ↗',classic:'Original Class 9 interface',visualGuide:'VISUAL EXPLANATION',close:'Close',typeBook:'Book-referenced · edition check',typePractice:'Original Triggle practice',class:'Class',search:'Search exercise, question...',subtitle:'Choose a topic, understand every step, go at your own pace.',nextStep:'Next step',showAll:'Show full solution',answer:'Show final answer',complete:'Solution complete',empty:'No lessons match your search.',noteBook:'Textbook question references were cross-checked against public listings. Editions can differ; compare with your prescribed book.',noteOld:'Class 9 exercises reference an earlier textbook edition. Verify numbering against your school copy.',notePractice:'Original Triggle practice — not a numbered textbook question.',lessons:'lessons',question:'Question',practice:'Practice',reference:'Reference',step:'Step',of:'of'},
 ta:{yourClass:'உங்கள் வகுப்பு',exploreExercise:'பயிற்சியைத் தேடுங்கள்',saveNote:'உங்கள் முன்னேற்றம் இந்த சாதனத்தில் மட்டும் சேமிக்கப்படும்',openBasics:'காட்சி அடிப்படைகள்',browse:'பயிற்சிகள்',basics:'முக்கோணவியல் அடிப்படைகள்',studyMode:'கற்றல் பகுதி',diagram:'படம்',stepByStep:'தீர்வு விளக்கம்',quickSolution:'சுருக்கமான தீர்வு',explainSlowly:'ஆழமாகப் புரிந்துகொள்',learnStepByStep:'ஒவ்வொரு படியின் காரணம்',backToQuestion:'கேள்விக்குத் திரும்பு',expandFigure:'படத்தைப் பெரிதாக்க ↗',inlineFigureNote:'கேள்வியின் அளவுகளிலிருந்து மீண்டும் வரையப்பட்டது; பாடநூலிலிருந்து நகலெடுக்கவில்லை.',finalAnswer:'இறுதி விடை',markDone:'கற்றதாகக் குறி',learned:'கற்றுவிட்டேன்',previous:'முந்தையது',nextQuestion:'அடுத்த கேள்வி',source:'குறிப்பு ↗',classic:'வகுப்பு 9 பழைய தோற்றம்',visualGuide:'காட்சி விளக்கம்',close:'மூடு',typeBook:'பாடநூல் குறிப்பு · பதிப்பு சரிபார்க்கவும்',typePractice:'டிரிகிள் உருவாக்கிய பயிற்சி',class:'வகுப்பு',search:'பயிற்சி, கேள்வியைத் தேட...',subtitle:'ஒரு தலைப்பைத் தேர்ந்தெடுத்து படிப்படியாக எளிதில் கற்றுக்கொள்ளுங்கள்.',nextStep:'அடுத்த படி',showAll:'முழுத் தீர்வைக் காட்டு',answer:'இறுதி விடையைக் காட்டு',complete:'தீர்வு முடிந்தது',empty:'இந்தத் தேடலுக்கான பாடங்கள் இல்லை.',noteBook:'பொது பட்டியலில் பாடநூல் வினா விவரங்கள் சரிபார்க்கப்பட்டன. உங்கள் பள்ளிப் புத்தகப் பதிப்புடன் ஒப்பிடுங்கள்.',noteOld:'வகுப்பு 9 பயிற்சிகள் முந்தைய பாடநூல் பதிப்பைச் சார்ந்தவை. உங்கள் புத்தக எண்ணிடலைச் சரிபார்க்கவும்.',notePractice:'இது டிரிகிள் உருவாக்கிய பயிற்சி; பாடநூல் வினா எண் அல்ல.',lessons:'பாடங்கள்',question:'வினா',practice:'பயிற்சி',reference:'குறிப்பு',step:'படி',of:'இல்'} };
 const ui=k=>dictionary[lang][k]||dictionary.en[k]||k;
 const classes=window.TRIGGLE_CLASSES||{};
 for(const key of [9,10,11,12]){if(!classes[key]||!Array.isArray(classes[key].items))throw Error('Missing data for class '+key);}
 const load=(key,other)=>{try{const v=JSON.parse(localStorage.getItem(key));return v===null?other:v}catch{return other}};
 const store=(key,value)=>{try{localStorage.setItem(key,JSON.stringify(value))}catch{}};
 const completed=new Set(load('triggle.learned.v119',[]));
 const lastByGrade=load('triggle.lastByGrade.v119',{});
 let lang='en';try{const saved=localStorage.getItem('triggle-language');if(saved==='ta'||saved==='"ta"')lang='ta'}catch{}
 const url=new URL(location.href), requested=Number(url.searchParams.get('class'));
 let grade=classes[requested]?requested:9;
 let current=classes[grade].items.find(x=>x.id===url.searchParams.get('question'))||classes[grade].items.find(x=>x.id===lastByGrade[grade])||classes[grade].items[0];
 let drawerOpen=false;
 const reduced=matchMedia('(prefers-reduced-motion:reduce)');
 const mobile=matchMedia('(max-width:800px)');
 function esc(str){return String(str??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
 function math(str){
   // A small, self-contained typesetter; mathematical source strings remain text, never executable HTML.
   const tokens=[];
   const stash=tag=>{tokens.push(tag);return '\uE000M'+(tokens.length-1)+'\uE001'};
   let s=esc(str);
   s=s.replace(/\(\s*\[\[([^\]|]+)\|([^\]]+)\]\]\s*\)([²³⁴])/g,
     (_m,n,d,p)=>stash('<math xmlns="http://www.w3.org/1998/Math/MathML" class="mathml-brackets"><mstyle displaystyle="true"><msup><mrow><mo stretchy="true">(</mo><mfrac><mtext>'+n+'</mtext><mtext>'+d+'</mtext></mfrac><mo stretchy="true">)</mo></mrow><mn>'+({'²':2,'³':3,'⁴':4}[p])+'</mn></msup></mstyle></math>'));
   s=s.replace(/\[\[([^\]|]+)\|([^\]]+)\]\]/g,(_m,n,d)=>stash('<span class="frac"><span>'+esc(n)+'</span><span>'+esc(d)+'</span></span>'));
   s=s.replace(/([²³⁴])/g,c=>'<sup>'+({'²':'2','³':'3','⁴':'4'}[c])+'</sup>').replace(/\^([0-9]+)/g,'<sup>$1</sup>');
   tokens.forEach((tag,i)=>s=s.replace('\uE000M'+i+'\uE001',tag));return s;
 }
 const activeList=()=>classes[grade].items;
 const currentIndex=()=>activeList().findIndex(i=>i.id===current.id);
 const num=n=>String(n).padStart(2,'0');
 const labelForGroup=(e)=>e==='6.examples'?(lang==='ta'?'எடுத்துக்காட்டுகள்':'Worked examples'):(e.includes('practice')?ui('practice')+' '+e.split('.')[0]:(e.endsWith('.unit')?'Unit Exercise '+e.split('.')[0]:(lang==='ta'?'பயிற்சி ':'Exercise ')+e));
 function updateUrl(replace=false){const u=new URL(location.href);u.searchParams.set('class',grade);u.searchParams.set('question',current.id);try{history[replace?'replaceState':'pushState']({grade,question:current.id},'',u.pathname+u.search+u.hash)}catch{}}
 function remember(){lastByGrade[grade]=current.id;store('triggle.lastByGrade.v119',lastByGrade)}
 function changeGrade(g){g=Number(g);if(!classes[g])return;grade=g;current=classes[g].items.find(x=>x.id===lastByGrade[g])||classes[g].items[0];$('search').value='';updateUrl();remember();render();closeDrawer();if(mobile.matches)document.querySelector('.lesson-container').scrollTop=0;else window.scrollTo({top:0,behavior:reduced.matches?'auto':'smooth'});}
 function selectLesson(item){if(item.id===current.id){closeDrawer();return;}current=item;updateUrl();remember();render();closeDrawer();$('lessonCard').scrollIntoView({block:'start',behavior:'instant'});if(mobile.matches){document.querySelector('.lesson-container').scrollTop=0;}else window.scrollTo({top:0,behavior:'instant'});}
 function navMove(delta){const list=activeList(),i=currentIndex()+delta;if(i<0||i>=list.length)return;selectLesson(list[i])}

 function renderBreadcrumb(chapter){
   const nav=$('crumb');nav.replaceChildren();
   const choices=[{text:ui('class')+' '+grade,type:'class'},{text:tr(chapter),type:'chapter'},{text:labelForGroup(current.exercise),type:'exercise'}];
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
     const group=new Map();activeList().forEach(i=>{if(!group.has(i.chapter))group.set(i.chapter,{num:i.chapter,chapter:classes[grade].chapters[i.chapter]||i.topic,first:i,count:0});group.get(i.chapter).count++});
     [...group.values()].forEach(g=>options.push({title:(lang==='ta'?'அத்தியாயம் ':'Chapter ')+g.num+' · '+tr(g.chapter),meta:g.count+' '+ui('lessons'),active:g.num===current.chapter,choose:()=>selectLesson(g.first)}));
   }else{
     const group=new Map();activeList().filter(i=>i.chapter===current.chapter).forEach(i=>{const k=i.exercise;if(!group.has(k))group.set(k,{key:k,count:0,first:i});group.get(k).count++});
     [...group.values()].forEach(g=>options.push({title:labelForGroup(g.key),meta:g.count+' '+ui('lessons'),active:g.key===current.exercise,choose:()=>selectLesson(g.first)}));
   }
   options.forEach(option=>{const button=document.createElement('button');button.type='button';button.className='path-option'+(option.active?' selected':'');button.innerHTML='<span><strong>'+esc(option.title)+'</strong><small>'+esc(option.meta)+'</small></span><span aria-hidden="true">'+(option.active?'✓':'›')+'</span>';
     button.onclick=()=>{dialog.close();option.choose()};list.append(button)
   });
   dialog.showModal();
 }
 function renderGrades(){const data=[{num:9,icon:'◈'},{num:10,icon:'◈'},{num:11,icon:'◈'},{num:12,icon:'◈'}];
  for(const type of ['side','dock']){
   const where=$(type==='side'?'sideClasses':'classDock');where.replaceChildren();
   for(const g of data){const b=document.createElement('button');b.type='button';b.className=type==='side'?'side-grade':'dock-grade';b.classList.toggle('active',grade===g.num);b.setAttribute('aria-pressed',String(grade===g.num));b.setAttribute('aria-label',ui('class')+' '+g.num);b.innerHTML=type==='side'?'<span>'+ui('class')+'</span><b>'+g.num+'</b>':'<strong>'+g.num+'</strong><span>'+ui('class')+'</span>';b.addEventListener('click',()=>changeGrade(g.num));where.append(b);}
  }
 }
 const expanded=new Set();
 function renderList(){const q=$('search').value.trim().toLowerCase(),list=activeList(),filtered=list.filter(item=>{if(!q)return true;return [item.label.en,item.label.ta,item.title?.en,item.q.en,item.q.ta,item.topic.en,item.topic.ta,item.exercise].join(' ').toLowerCase().includes(q)});
  $('sideCount').textContent=filtered.length+' '+ui('lessons');const container=$('exerciseList');container.replaceChildren();
  const groups=new Map();for(const item of filtered){const key=item.chapter+':'+item.exercise;if(!groups.has(key))groups.set(key,[]);groups.get(key).push(item)}
  const currentGroup=current.chapter+':'+current.exercise;
  for(const [key,group] of groups){const e=group[0].exercise,c=group[0].chapter;
    const details=document.createElement('details');details.className='exercise-group';details.open=q!==''||expanded.has(key)||key===currentGroup;
    const summary=document.createElement('summary');const head=document.createElement('span');head.textContent='Ch '+c+' · '+labelForGroup(e);const count=document.createElement('span');count.className='exercise-number';count.textContent=group.length;summary.append(head,count);details.append(summary);
    details.addEventListener('toggle',()=>{if(details.open)expanded.add(key);else expanded.delete(key)});
    for(const item of group){const b=document.createElement('button');b.type='button';b.className='exercise-question';b.classList.toggle('active',current.id===item.id);b.setAttribute('aria-current',current.id===item.id?'true':'false');const icon=document.createElement('span');icon.className='question-bullet '+(completed.has(item.id)?'question-done':'');icon.textContent=completed.has(item.id)?'✓':'○';const txt=document.createElement('span');txt.textContent=tr(item.label)+' · '+tr(item.title);b.append(icon,txt);b.title=tr(item.q);b.addEventListener('click',()=>selectLesson(item));details.append(b)}container.append(details);
  }
  if(!groups.size){const no=document.createElement('div');no.className='empty-search';no.textContent=ui('empty');container.append(no)}
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

 function renderSteps(){const all=current.steps||[];const stepCount=all.length;const ul=$('stepsList');ul.replaceChildren();all.forEach((s,i)=>ul.append(buildStep(s,i)));
  $('stepCount').textContent=lang==='ta'?all.length+' படிகள்':all.length+' steps';
  $('answerBox').hidden=false;
  const parts=String(current.answer||'').split(/\s+;\s+/);
  const canGrid=parts.length>1&&parts.length<=8&&parts.every(v=>v.length<60);
  $('answerText').classList.toggle('answer-grid',canGrid);
  $('answerText').classList.toggle('answer-grid-many',canGrid&&parts.length>=4);
  $('answerText').innerHTML=canGrid?parts.map(v=>'<span class="answer-part">'+math(v)+'</span>').join(''):math(current.answer||'');
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
  return ['triangle','two-triangles','two-right','kite','tree','unitcircle','complement-pairs','tower','circle','wave','inverse'].includes(kind);
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
  $('deepQuestionContext').open=deepStageIndex===0;
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
  $('guidedQuestion').innerHTML=math(tr(current.q));
  $('deepSourceStatus').textContent=deepStageData.reviewed?(lang==='ta'?'விரிவான பாடம்':'CONCEPT LESSON'):(lang==='ta'?'தீர்வு வழிமுறை':'WORKED-PATH GUIDE');
  const start=Number.isInteger(stageNumber)?stageNumber:(deepResume[current.id]||0);
  if(!dlg.open)dlg.showModal();
  $('tabGuided').setAttribute('aria-expanded','true');
  deepNavTo(start);
  $('closeGuided').focus({preventScroll:true});
 }
 function closeGuided(){if($('guidedDialog').open)$('guidedDialog').close();}
 function renderMode(){
  $('tabQuick').classList.add('is-selected');
  $('tabQuick').setAttribute('aria-pressed','true');
  $('quickSteps').hidden=false;
 }
 function renderText(){document.documentElement.lang=lang;document.body.classList.toggle('lang-ta',lang==='ta');document.querySelectorAll('[data-i18n]').forEach(el=>el.textContent=ui(el.dataset.i18n));$('search').placeholder=ui('search');$('classSubtitle').textContent=ui('subtitle');$('langEn').classList.toggle('active',lang==='en');$('langTa').classList.toggle('active',lang==='ta');$('langEn').setAttribute('aria-pressed',String(lang==='en'));$('langTa').setAttribute('aria-pressed',String(lang==='ta'))}
 function render(){renderText();renderGrades();const list=activeList();const n=currentIndex(),position=n+1,chapter=classes[grade].chapters[current.chapter]||current.topic;
  $('classHeading').textContent=ui('class')+' '+grade;$('classEmblem').querySelector('span').textContent=grade;
  renderBreadcrumb(chapter);
  $('gradeTotal').textContent=list.length+' '+ui('lessons');$('questionLabel').textContent=labelForGroup(current.exercise).toUpperCase();$('itemPosition').textContent=num(position)+' / '+num(list.length);
  $('questionTitle').textContent=tr(current.topic);$('questionHead').textContent=tr(current.label);
  $('questionText').innerHTML=math(tr(current.q));$('kindBadge').textContent=ui(current.kind==='practice'?'typePractice':'typeBook');
  $('markDone').setAttribute('aria-pressed',String(completed.has(current.id)));$('markDone').setAttribute('aria-label',ui(completed.has(current.id)?'learned':'markDone'));$('markDone').innerHTML=(completed.has(current.id)?'✓ ':'○ ')+'<span>'+esc(ui(completed.has(current.id)?'learned':'markDone'))+'</span>';
  $('referenceLink').hidden=!current.source;if(current.source)$('referenceLink').href=current.source;
  $('editionNote').textContent=ui(current.kind==='practice'?'notePractice':grade===9?'noteOld':'noteBook');
  $('figureBtn').hidden=!hasUsefulFigure(current);
  renderInlineFigure();
  $('pageStatus').textContent=position+' '+ui('of')+' '+list.length;$('pageFill').style.width=(position/list.length*100)+'%';
  $('previous').disabled=n===0;$('next').disabled=n===list.length-1;
  $('previous').innerHTML='← '+esc(ui('previous'));$('next').innerHTML=esc(ui('nextQuestion'))+' →';
  $('classicLink').hidden=grade!==9;
  $('solutionModeRow').hidden=!hasDeepLesson(current);
  renderSteps();renderMode();renderList();
  window.dispatchEvent(new CustomEvent('triggle:lessonchange',{detail:{item:current,lang,grade}}));
 }
 function openDrawer(){if(!mobile.matches){$('search').focus();return}drawerOpen=true;document.body.classList.add('drawer-open');$('browseBtn').setAttribute('aria-expanded','true');$('sidebar').inert=false;$('sidebar').setAttribute('role','dialog');$('sidebar').setAttribute('aria-modal','true');setTimeout(()=>$('search').focus({preventScroll:true}),180)}
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
 $('guidedDialog').addEventListener('close',()=>{$('tabGuided').setAttribute('aria-expanded','false');(deepLauncher?.isConnected?deepLauncher:$('tabGuided')).focus({preventScroll:true})});
 $('guidedDialog').addEventListener('click',e=>{if(e.target===$('guidedDialog'))closeGuided()});
 $('figureBtn').onclick=showDiagram;$('closeDiagram').onclick=()=>$('figureDialog').close();
 $('figureDialog').addEventListener('click',ev=>{if(ev.target===$('figureDialog'))$('figureDialog').close()});
 $('langEn').onclick=()=>changeLanguage('en');$('langTa').onclick=()=>changeLanguage('ta');
 function changeLanguage(v){lang=v;try{localStorage.setItem('triggle-language',v)}catch{}render()}
 window.addEventListener('keydown',e=>{
  if(e.key==='Escape'&&drawerOpen){closeDrawer();return}
  if(e.key==='/'&&!e.ctrlKey&&!e.metaKey&&e.target.tagName!=='INPUT'&&e.target.tagName!=='TEXTAREA'){e.preventDefault();openDrawer();$('search').focus();return}
  if(drawerOpen&&e.key==='Tab'){const focusable=[...$('sidebar').querySelectorAll('button:not([disabled]),input:not([disabled]),a[href],summary')].filter(el=>el.getClientRects().length);if(focusable.length){const first=focusable[0],last=focusable.at(-1);if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus()}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus()}}}
  if(e.target.matches('input,textarea,select,button')||$('figureDialog').open||$('guidedDialog').open||drawerOpen||e.altKey||e.metaKey||e.ctrlKey)return;
  if(e.key==='ArrowRight'){e.preventDefault();navMove(1)}else if(e.key==='ArrowLeft'){e.preventDefault();navMove(-1)}
 });
 window.addEventListener('popstate',()=>{const p=new URL(location.href).searchParams,g=Number(p.get('class'));grade=classes[g]?g:9;current=classes[grade].items.find(x=>x.id===p.get('question'))||classes[grade].items[0];$('search').value='';render();closeDrawer()});
 mobile.addEventListener('change',onBreakpoint);onBreakpoint();remember();updateUrl(true);render();
})();
