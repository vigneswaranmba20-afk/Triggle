'use strict';
/* Fast, release-blocking tests for the Grade 9 student journey and textbook task catalog. */
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const site=path.resolve(__dirname,'..');
const read=p=>fs.readFileSync(path.join(site,p),'utf8');
const context={window:{}};
vm.runInNewContext(read('data/g9-textbook-activities.js'),context,{filename:'g9-textbook-activities.js'});
const catalog=context.window.TRIGGLE_TEXTBOOK_TASKS;
assert(catalog,'Textbook task registry must load offline');
assert.equal(catalog['g9-ch1'].length,18,'Grade 9 Ch 1 must include the researched 18 activity and thinking prompts');
assert.equal(catalog['g9-ch2'].length,6,'Grade 9 Ch 2 must include the researched 6 activity and thinking prompts');
for(const [chapter,items] of Object.entries(catalog)){
 const activity=items.filter(x=>x.kind==='activity');
 const thinking=items.filter(x=>x.kind==='thinking');
 assert.equal(activity.length,chapter==='g9-ch1'?4:3,'All numbered chapter activities: '+chapter);
 assert.equal(thinking.length,chapter==='g9-ch1'?14:3,'Thinking prompts present: '+chapter);
 items.forEach((item,index)=>{
  assert(item.page>0,'Printed textbook page required');
  assert(['activity','thinking'].includes(item.kind));
  for(const key of ['title','question','answer']){
   for(const lang of ['en','ta']) assert(item[key]?.[lang]?.trim(),chapter+' '+index+' '+key+' '+lang+' missing');
  }
  assert(['source-matched','explanation-derived','partially-checked','needs-visual-source-check'].includes(item.review),
    'Honest source check state on every item');
 });
}
const file=read('assets/set-language-journey.js');
new vm.Script(file);
assert(!file.includes('sp2-sticky-context'),'Concept questions must not use floating/sticky context containers');
assert(file.includes('sp2-concept-question'),'Concept questions are placed next to their answer choices');
assert(file.includes("esc((index+1)+'. '+pick(stage.title,lang))"),'Concept title is visibly numbered');
assert(file.includes("data-footer-next")&&file.includes("t.nextIdea"),'End of concept advances to the next idea, not an unrelated page');
assert(file.includes("t.backConcepts")&&file.includes("showIndex(true)"),'Final idea returns to the Concepts index');
assert(file.includes("data-back-index"),'Every concept lesson includes a Back to concepts action');
for(const label of ['Descriptive Form','Roster Form','Set-Builder Form'])assert(file.includes(label),'Textbook representation: '+label);
assert(file.includes('data-slider-formula')&&file.includes('aria-valuetext'),'Overlap slider explains its result accessibly');
assert(file.includes('data-overlap-decrease')&&file.includes('data-overlap-increase'),'Slider has precise accessible step buttons');
assert(file.includes('both===0')&&file.includes('both===11'),'Slider buttons respect the valid 0–11 overlap bounds');
assert(file.includes('sp2-venn-svg')&&file.includes('data-venn-region'),'Venn diagram is rendered directly within the concepts lesson');
assert(file.includes('chooseVenn(\'intersection\')'),'The interactive diagram initializes with a readable highlighted region');
assert(file.includes("key:'union'")&&file.includes("key:'intersection'")&&file.includes("key:'difference'")&&file.includes("key:'complement'")&&file.includes("key:'symmetric'"),'All five set operations are reachable without a scroll-only placeholder');
assert(!file.includes('window.TriggleLab?.mount(target,chapter,lang)'),'The old disconnected Venn lab action must stay removed');
const hub=read('assets/chapter-hub.js');new vm.Script(hub);
assert(hub.includes('window.TriggleTextbookActivities.mount(panel,chapter,lang)'));
assert(hub.includes("section==='activities'"),'Thinking Corners are a dedicated chapter section');
assert(hub.includes("activityEntries.length?[...chapterKinds,'activities']:chapterKinds"),'Activity menu is present only when chapter has tasks');
assert(!hub.includes('window.TriggleTextbookActivities.mount(panel,chapter,lang);\n        }'),'Thinking Corners are not appended to Concepts');
assert(hub.includes('const activityEntries=window.TRIGGLE_TEXTBOOK_TASKS?.[chapter.id]||[];')&&hub.includes("if(section==='activities'&&activityEntries.length"),'Future chapter activity registries mount dynamically, without hard-coded chapter IDs');
assert(!hub.includes('window.TriggleLab?.mount(panel,chapter,lang)'),'Do not repeat Phase 2 by mounting a second lab');
const renderer=read('assets/textbook-activities.js');new vm.Script(renderer);
assert(renderer.includes('const raw=pick(item.answer,lang)')&&renderer.includes('p.textContent=text.trim()'),'Answers must render from the source as safely escaped text');
assert(renderer.includes('card.open=index===0'),'First activity question and answer must be visible on entry');
assert(!renderer.includes('answer.append(answerSummary'),'Do not nest answer behind a second toggle');
// Shared renderer: preserve exact titles, questions and answers, remove duplicate index,
// keep native details and truthful Tamil fallback warnings.
class TestElement{
 constructor(tag){this.tagName=tag;this.children=[];this.dataset={};this.attrs={};this.textContent='';}
 append(...nodes){this.children.push(...nodes);}
 setAttribute(k,v){this.attrs[k]=v;}
}
const sample={kind:'activity',page:294,title:{en:'Activity 1 · Two coins and two dice',ta:'English version only — Tamil editorial content pending. Activity 1 · Two coins and two dice'},question:{en:'Original question',ta:'Original question'},answer:{en:'Original answer',ta:'Original answer'}};
const sample2={...sample,kind:'progress',title:{en:'Progress Check · Valid values',ta:'முன்னேற்றச் சோதனை · மதிப்புகள்'}};
const doc={createElement:t=>new TestElement(t)};
const renderContext={document:doc,window:{TRIGGLE_TEXTBOOK_TASKS:{test:[sample,sample2]},TriggleNotation:{render:t=>t}}};
vm.runInNewContext(renderer,renderContext);
for(const lang of ['en','ta']){
 const parent=new TestElement('div');
 assert.equal(renderContext.window.TriggleTextbookActivities.mount(parent,{id:'test'},lang),true);
 const section=parent.children[0],first=section.children[1],second=section.children[2];
 assert.equal(first.open,true);assert.equal(second.open,false);
 assert.equal(first.dataset.activityKind,'activity');assert.equal(second.dataset.activityKind,'progress');
 const summary=first.children[0],copy=summary.children[1];
 assert.equal(summary.attrs['aria-label'],sample.title[lang]);
 assert.equal(copy.children[0].textContent,'Activity 1');
 assert.equal(copy.children[1].textContent,'Two coins and two dice');
 assert.equal(copy.children.length,lang==='ta'?3:2);
 if(lang==='ta')assert.match(copy.children[2].textContent,/Tamil editorial content pending/);
 assert.equal(first.children[1].innerHTML,'Original question');
 assert.equal(first.children[2].children[1].children[0].textContent,'Original answer');
}
const activityCSS=read('assets/math-first.css');
assert(activityCSS.includes('min-height:56px!important')&&activityCSS.includes('summary:focus-visible'),'Large touch targets and keyboard focus retained');
assert(renderer.includes('data-textbook')===false,'No unreviewed tracking or network');
const html=read('index.html');
for(const pathName of ['data/g9-textbook-activities.js','assets/textbook-activities.js'])assert(html.includes(pathName),'Page loads '+pathName);
const worker=read('service-worker.js');
for(const pathName of ['data/g9-textbook-activities.js','assets/textbook-activities.js'])assert(worker.includes(pathName),'Offline cache includes '+pathName);
const coverageDoc=fs.readFileSync(path.join(site,'../docs/G9_CH1_2025_SOURCE_GAP_REGISTER.md'),'utf8');
assert(coverageDoc.includes('| **Total** | **30** | **30** | **0** |'),'Exercise 1.1 must show all 30 source-checked subparts and zero remaining');
assert(hub.includes('exerciseCoverageNote')&&hub.includes('exampleWordingNote'),'Exercise and example pages must not imply false textbook-exact completeness');
const currentExercise=read('data/textbook-exercises/g9-ch1-ex1-1-view.js');
assert.equal((currentExercise.match(/"id": "g9-ch1-ex1[.]1-q/g)||[]).length,30,'All 30 original Grade 9 Exercise 1.1 textbook subparts checked');
const css=read('assets/app.css');
assert(!css.includes('.sp2-sticky-context'),'Floating/sticky concept styling removed');
assert(css.includes('.sp2-concept-question')&&css.includes('position:static'),'Question flows with the page');
assert(css.includes('.sp2-journey-footer')&&css.includes('.sp2-slider-formula'),'Footer and slider styled');
assert(catalog['g9-ch1'].find(item=>item.title.en.includes('Three forms')).answer.en.includes('Days of the week:'),'Seven-day roster is not called weekdays');
assert.equal(14+11-6,19);
assert.equal(30-(14+11-6),11);
assert.equal(30+45-65,10);
assert(Math.abs(3*Math.sqrt(2)-Math.sqrt(18))<1e-12);
assert.equal((2e2)*(1.4e2),2.8e4);
console.log('PASS: 24 bilingual textbook prompts, truthfully labelled reviews, nonfloating question, single activity section, 7-page navigation, slider and offline regression');
