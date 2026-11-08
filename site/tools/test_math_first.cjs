'use strict';
/* Release-gate assertions for the shared Grade 9–12 math-first reader.
   Textbook source fidelity is covered independently by existing exact-text tests. */
const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const read=p=>fs.readFileSync('site/'+p,'utf8');
const app=read('assets/app.js'),hub=read('assets/chapter-hub.js');
const activities=read('assets/textbook-activities.js'),html=read('index.html');
const css=read('assets/math-first.css'),sw=read('service-worker.js');
for(const [path,body] of [['app.js',app],['chapter-hub.js',hub],['textbook-activities.js',activities]]){
 new vm.Script(body,{filename:path});
}
assert(app.includes('function openSectionFirst(chapter,section)'), 'First-item direct navigation missing');
assert(app.includes("book.find(item=>item.exercise===chapter.number+'.1')"),'Prefer Exercise N.1');
assert(app.includes("if(openSectionFirst(chapter,'exercises'))return;"),'Clicking chapter must open its first exercise');
assert(app.includes("section==='examples'||section==='exercises'"),'Example/exercise short-circuit must exist');
assert(app.includes('openChapterSection(section,chapter,null,true)'), 'Back to all examples/exercises must open browsable list');
assert(app.includes("questionOrigin={grade,chapterId:chapter.id,section}"),'Return destination must be preserved');
assert(hub.includes("section==='activities'||section==='quizzes'"),'No duplicate Thinking Corner/quiz landing titles');
assert(!activities.includes("const h=document.createElement('h3')"),'Do not repeat Thinking Corner heading');
assert(activities.includes('card.open=index===0'),'First activity must open');
assert(activities.includes("const raw=pick(item.answer,lang)"),'Original explanation text remains source of truth');
assert(activities.includes('cardinalityTable(raw,body,lang)'),'Cardinality activity must use a real table');
assert(activities.includes('document.createElement(\'table\')'),'No fake paragraph-table');
assert(html.includes('id="diagramCompareAnswer"'),'Glass viewer must contain compared answer');
assert(app.includes("$('diagramCompareAnswer').innerHTML=$('answerText').innerHTML"),'Figure must display same final answer without modifying mathematics');
assert(css.includes('body.textbook-reader .lesson-card>#answerBox{order:4}'),'Final answer must follow question on mobile');
assert(css.includes('body.textbook-reader .lesson-card>#stepsRegion{order:7}'),'Reasoning follows answer on mobile');
assert(css.includes('backdrop-filter:blur(14px)'),'Glass figure panel missing');
assert(css.includes('@media(prefers-reduced-transparency:reduce)'),'Opaque fallback missing');
assert(css.includes('grid-template-areas:"chapters chapters" "previous next"'),'Reader navigation must reserve two compact rows');
assert(css.includes('body.textbook-reader .page-controls{'),'Shared reader navigation missing');
assert(html.includes('math-first.css?v=chapter-sections-1'),'Updated chapter-navigation CSS must load');
const glass=/\.figure-dialog\{[\s\S]*?background:rgba\(239,232,250,\.68\)!important/.test(css);
assert(glass,'Venn dialog must be visibly translucent, not nearly opaque');
assert(html.includes('textbook-activities.js?v=math-first-1'),'New activities renderer not versioned');
assert(html.includes('chapter-hub.js?v=math-first-1'),'New chapter route not versioned');
assert(html.includes('app.js?v=chapter-sections-1'),'Chapter menu reader code must load');
assert(sw.includes("'./assets/math-first.css'"),'Offline shell must include new CSS');
assert(/v48-chapter-sections/.test(sw),'Offline chapter navigation cache not invalidated');
assert(html.includes('id="chapterMenuBtn"'),'A visible chapter-menu button must exist beside the exercises return');
assert(app.includes('function openChapterMenu(chapter=chapterForItem(current))'),'All grades must provide direct chapter-menu routing');
assert(app.includes("b.onclick=()=>c.type==='chapter'?openChapterMenu():openPath(c.type)"),'Chapter breadcrumb must open chapter sections');
assert(app.includes("$('chapterMenuBtn').onclick=()=>openChapterMenu()"),'Chapter button must be wired');
assert(app.includes("$('chapterMenuBtn').hidden=false"),'Chapter button must appear on known question chapters');
assert(app.includes("lang==='ta'?'☷ அத்தியாயப் பகுதிகள்':'☷ Chapter sections'"),'Chapter menu must be bilingual');
assert(css.includes('body.textbook-reader #chapterMenuBtn{'),'Chapter menu needs a distinct accessible style');
assert(css.includes('min-height:48px!important;padding:7px 9px!important'),'Chapter navigation must have large tap targets');
console.log('PASS: math-first routing, truthful fallbacks, quiz/activity first content, accessible figure comparison, mobile layout and offline cache');
