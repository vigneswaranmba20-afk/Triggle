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
// Release gate: chapter cards NEVER bypass section choices, and sections NEVER
// bypass the complete worked-example/exercise list.
assert(app.includes('function selectChapter(chapter)'), 'Explicit chapter-menu route missing');
assert(app.includes('homeView=false;classIndex=false;chapterOverview=chapter;chapterSection=null;conceptIndex=null;'), 'Chapter card must open its hub');
assert(!app.includes('openSectionFirst('), 'Do not bypass section lists automatically');
assert(app.includes('function openChapterSection(section,chapter=chapterOverview,concept=null)'), 'Section navigation missing');
assert(app.includes("b.onclick=()=>openPath(c.type)"), 'Chapter chevron must invoke chapter picker');
assert(app.includes("chapterList().forEach(c=>options.push"), 'Chapter picker must list active-class chapters');
assert(app.includes("choose:()=>selectChapter(c)"), 'Chapter selection must open the selected chapter menu');
assert(app.includes("openChapterSection(section,chapter);"), 'Back to worked examples must open their full list');
assert(app.includes('if(chapterOverview)questionOrigin={grade,chapterId:chapterOverview.id,section:chapterSection}'), 'Return-to-list destination must be tracked');
assert(!html.includes('id="chapterMenuBtn"'), 'Remove redundant question-page Chapter sections button');
assert(!app.includes('openChapterMenu('), 'Chapter breadcrumbs must not secretly open section menus');
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
assert(html.includes('math-first.css?v=venn-clear-1'),'Updated chapter-navigation CSS must load');
const glass=/\.figure-dialog\{[\s\S]*?background:rgba\(239,232,250,\.68\)!important/.test(css);
assert(glass,'Venn dialog must be visibly translucent, not nearly opaque');
assert(html.includes('textbook-activities.js?v=math-first-1'),'New activities renderer not versioned');
assert(html.includes('chapter-hub.js?v=math-first-1'),'New chapter route not versioned');
assert(html.includes('app.js?v=venn-clear-1'),'Chapter menu reader code must load');
assert(sw.includes("'./assets/math-first.css'"),'Offline shell must include new CSS');
assert(/v51-venn-clear/.test(sw),'Offline chapter navigation cache not invalidated');
assert(css.includes('body.textbook-reader .question-return button{'),'Single quiet return control must be styled');
assert(!css.includes('body.textbook-reader #chapterMenuBtn{'),'No leftover chapter-section visual clutter');
assert(html.includes('id="pathHint"'),'Chapter dialog should show class-specific chapter count');
assert(app.includes("hint.textContent=lang==='ta'"),'Chapter picker must communicate chapter count in both languages');
assert(css.includes('.path-dialog.is-chapter-picker .path-options{'),'Chapter picker must be scrollable on small Android phones');
assert(!html.includes('id="diagramCaption"'),'Remove visually cluttering metadata caption from modal');
assert(app.includes("if(window.TriggleSetVenn?.supports(item))return false"),'Suppress redundant mini Venn cards');
assert(!app.includes("$('diagramCaption').textContent"),'Removed figure caption must not cause a null dereference');
assert(!html.includes('id="chapterMenuBtn"'),'Do not reintroduce old reader clutter');
assert(html.includes('assets/set-venn-figures.js?v=venn-clear-1'),'New Venn SVG geometry must be loaded');
const venn=read('assets/set-venn-figures.js');
new vm.Script(venn,{filename:'set-venn-figures.js'});
assert(venn.includes('ax=192,bx=368,cy=166,rx=150,ry=128'),'Venn must expand to use drawing area');
assert(venn.includes('<ellipse cx='),'Venn masks must use matching ellipse geometry');
assert(!venn.includes('<circle cx='),'Old circle clipping must not mismatch ellipse shading');
assert(!venn.includes('g9-venn-text-alternative'),'No redundant visual region commentary');
assert(css.includes('.figure-dialog .diagram-content .g9-venn-svg{'),'Figure viewer must use full available width');
console.log('PASS: chapter → section → list → question navigation, truthful fallbacks, quiz/activity first content, accessible figure comparison, mobile layout and offline cache');
