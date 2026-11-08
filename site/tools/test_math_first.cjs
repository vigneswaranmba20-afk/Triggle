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
assert(html.includes('math-first.css?v=math-first-1'),'New CSS not loaded');
assert(html.includes('textbook-activities.js?v=math-first-1'),'New activities renderer not versioned');
assert(html.includes('chapter-hub.js?v=math-first-1'),'New chapter route not versioned');
assert(html.includes('app.js?v=math-first-1'),'New reader behavior not versioned');
assert(sw.includes("'./assets/math-first.css'"),'Offline shell must include new CSS');
assert(/v46-math-first/.test(sw),'Old service worker cache not invalidated');
console.log('PASS: math-first routing, truthful fallbacks, quiz/activity first content, accessible figure comparison, mobile layout and offline cache');
