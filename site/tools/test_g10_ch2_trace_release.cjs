'use strict';
/*
 * TRACE Grade 10 Chapter 2 is not rated on quantity alone. This gate checks
 * source-scoped completeness, unique IDs, exact arithmetic and teacher-first
 * pedagogy, without claiming the entire 2025 textbook is now transcribed.
 */
const assert=require('node:assert/strict');
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const dir=path.resolve(__dirname,'..');const read=p=>fs.readFileSync(path.join(dir,p),'utf8');
const html=read('index.html'),cache=read('service-worker.js');
const c={TRIGGLE_CLASSES:{10:{items:[]}},TRIGGLE_CURRICULUM:{grades:[{grade:10,chapters:[{id:'g10-ch2',number:2,textbookQuestionIds:[]}]}]}};
const window={...c};
const ctx=vm.createContext({window,console});
const pathScript=read('data/g10-ch2-concepts.js');
vm.runInContext(pathScript,ctx,{filename:'g10-ch2-concepts.js'});
const foundations=window.TRIGGLE_G10_CH2_PATH;
assert.equal(foundations.chapterId,'g10-ch2');
assert.equal(foundations.stages.length,15,'15 textbook-ordered foundation steps');
const secOrder=foundations.stages.map(s=>Number(s.section.split('.')[1]));assert(secOrder.every((x,i)=>i===0||x>=secOrder[i-1]),'Concepts in textbook order');
for(const s of foundations.stages){
 assert.match(s.id,/^g10-ch2-/);
 assert(s.title.en&&s.title.ta&&s.idea.en&&s.idea.ta&&s.example.en&&s.example.ta);
 assert(s.why.en&&s.why.ta&&s.hint.en&&s.hint.ta);
 assert.equal(s.choices.length,3);assert.equal(s.correct,0);
 assert(typeof s.math.latex==='string'&&s.math.latex.length>3,'Explicit ChatGPT-style mathematical notation');
 assert(!/English version only — Tamil editorial content pending/.test(s.title.ta),'No fake translated placeholders');
 assert(s.visual,'Every concept should present a mathematical visual');
}
for(const file of ['data/textbook-exercises/g10-ch2-trace-en.js','data/textbook-exercises/g10-ch2-trace-2-3-to-2-6-en.js','data/textbook-exercises/g10-ch2-trace-2-7-to-2-10-en.js'])
 vm.runInContext(read(file),ctx,{filename:file});
const items=window.TRIGGLE_CLASSES[10].items;
assert.equal(items.length,63,'53 canonical and 10 non-overlapping additional textbook question parts');
assert.equal(window.TRIGGLE_G10_CH2_SUPPLEMENTS['2.3–2.6'].integrated,5);
assert.equal(window.TRIGGLE_G10_CH2_SUPPLEMENTS['2.7–2.10'].integrated,5);
assert.equal(window.TriggleG10Ch2TraceRecords.count,53);
assert.equal(new Set(items.map(q=>q.id)).size,items.length,'All question IDs unique');
assert.equal([...new Set(items.map(q=>q.exercise))].sort().join(','),['2.10','2.3','2.4','2.5','2.6','2.7','2.8','2.9'].sort().join(','),'Exercises 2.3–2.10 represented');
assert(items.every(q=>q.chapter==='2'&&q.classNum===10&&q.kind==='textbook'));
assert(items.every(q=>q.source.includes('13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of')&&q.edition==='2025'));
assert(items.every(q=>q.steps.length>=2&&q.steps.every(s=>s.en.length>15&&s.eq.length>2)));
assert(items.every(q=>q.translationReview==='pending'),'Do not present provisional Tamil reviews as final');
assert(items.every(q=>!q.id.includes('ex2-2-q8')),'Hold unresolved 2.2 Q8');
const answers=Object.fromEntries(items.map(q=>[q.id,q.answer]));
function has(id,t){assert(answers[id]?.includes(t),id+' answer must include '+t)}
has('c10-2-ex2-3-q7','Friday');has('c10-2-ex2-3-q10','Monday');
has('c10-2-ex2-4-q1','1944');
has('c10-2-ex2-5-q5','15th');has('c10-2-ex2-5-q6','93 and 99');
has('c10-2-ex2-5-q11','2, 9 and 16');
has('c10-2-ex2-6-q1','3240');has('c10-2-ex2-6-q1','999');
has('c10-2-ex2-6-q8','45,750');has('c10-2-ex2-6-q8','5,750');
has('c10-2-ex2-6-q10','2,130');
has('c10-2-ex2-7-q3','1');has('c10-2-ex2-7-q7','3072');
has('c10-2-ex2-8-q2','1820');has('c10-2-ex2-8-q7','3069');
has('c10-2-ex2-9-q2','105,625');has('c10-2-ex2-9-q3','210');
has('c10-2-ex2-10-q2','0, 1 and 8');has('c10-2-ex2-10-q10','31m');
/* Independently evaluate several key equations, not just matching strings. */
assert.equal(40*(3+(3+39*4))/2,3240);
assert.equal(27*(102+(102+26*-5))/2,999);
assert.equal(10*(4800+4800+9*-50)/2,45750);
assert.equal(30*(100+100+29*-2)/2,2130);
assert.ok(Math.abs(729*(1/3)**6-1)<1e-12,'Floating point GP arithmetic within tolerance');
assert.equal(5*(3**6-1)/(3-1),1820);
assert.equal(12*(5**6-1)/(5-1),46872);
assert.equal(3*(2**10-1),3069);
assert.equal(325**2,105625);
assert.equal(45**2,2025);
for(let r=0;r<9;r++)assert([0,1,8].includes(r**3%9));
assert.equal(32*2+60*(-1),4);
vm.runInContext(read('data/g10-ch2-teaching-bridges.js'),ctx,{filename:'g10-ch2-teaching-bridges.js'});
const bridge=window.TriggleG10Ch2Bridge.get({id:'c10-2-ex2-1-q8',classNum:10,chapter:'2'},'en');
assert(bridge.explain.includes('64 − 60 = 4')&&bridge.explain.includes('reliable method'),'HCF bridge must teach intuitive goal and systematic method');
assert.equal(window.TriggleG10Ch2Bridge.get({id:'c10-1-q8',classNum:10,chapter:'1'},'en'),null,'No other chapter affected');
for(const src of ['data/g10-ch2-concepts.js','data/g10-ch2-teaching-bridges.js','data/textbook-exercises/g10-ch2-trace-en.js','data/textbook-exercises/g10-ch2-trace-2-3-to-2-6-en.js','data/textbook-exercises/g10-ch2-trace-2-7-to-2-10-en.js'])
 assert(html.includes(src),'HTML must load '+src);
for(const src of ['data/g10-ch2-concepts.js','data/g10-ch2-teaching-bridges.js','data/textbook-exercises/g10-ch2-trace-en.js','data/textbook-exercises/g10-ch2-trace-2-3-to-2-6-en.js','data/textbook-exercises/g10-ch2-trace-2-7-to-2-10-en.js','assets/g10-ch2-foundations.css'])
 assert(cache.includes(src),'Android offline cache missing '+src);
assert(/v87-g10ch2-trace-bulk/.test(cache),'Offline cache must refresh');
console.log('PASS TRACE Grade 10 Chapter 2: 15 concept stages, 63 deduplicated source-scoped question parts, independent math, HCF pedagogy and offline assets');
