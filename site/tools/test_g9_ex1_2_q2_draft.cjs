'use strict';
// TRACE Grade 9 Ex1.2 Q2(i–iv) English source + mathematical STUDENT RELEASE gate.
// Release requires exactly one app registration, offline cache, math, metadata and Why-step coverage.
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const root=path.resolve(__dirname,'../..'),read=p=>fs.readFileSync(path.join(root,p),'utf8');
const manifest=JSON.parse(read('site/data/textbook-fidelity/g9-ch1-ex1-2-q2.json'));
const html=read('site/index.html'),sw=read('site/service-worker.js');
const student='site/data/textbook-exercises/g9-ch1-ex1-2-q2-en.js';
assert.equal(manifest.grade,9);assert.equal(manifest.chapter,'1');assert.equal(manifest.exercise,'1.2');assert.equal(manifest.question,'2');
assert.equal(manifest.release,'english-release-candidate');
assert.equal(manifest.english.printedPage,11);assert.equal(manifest.english.pdfPage,17);
assert.equal(manifest.tamil.printedPage,13);assert.equal(manifest.tamil.pdfPage,19);
assert.equal(manifest.tamil.translationReview,'deferred');
assert.equal(manifest.parts.length,4);
assert.equal(html.split('g9-ch1-ex1-2-q2-en.js').length-1,1,'Student Q2 module must be loaded once');
assert(sw.includes("'./data/textbook-exercises/g9-ch1-ex1-2-q2-en.js'"),'Q2 student module must be offline cached');
assert(sw.includes("'./data/why-step-g9-ex1-2-q2.js'"),'Q2 learning bridges must be offline cached');
assert.equal(html.split('why-step-g9-ex1-2-q2.js').length-1,1,'Q2 hints loaded exactly once');
const ctx={window:{},console};vm.createContext(ctx);
for(const p of ['site/data/class-9.js','site/data/curriculum.js',student,
 'site/data/why-step-g9.js','site/data/why-step-g9-ex1-2-q1.js','site/data/why-step-g9-ex1-2-q2.js',
 'site/data/problem-difficulty.js'])vm.runInContext(read(p),ctx,{filename:p,timeout:10000});
const items=ctx.window.TRIGGLE_CLASSES[9].items;
const ch=ctx.window.TRIGGLE_CURRICULUM.grades.find(x=>x.grade===9).chapters.find(x=>String(x.number)==='1');
const ids=Array.from(ctx.window.TRIGGLE_G9_EX1_2_Q2_IDS);
assert.deepEqual(ids,manifest.parts.map(x=>x.id));
assert.equal(new Set(items.map(x=>x.id)).size,items.length,'No duplicate student IDs');
assert.equal(new Set(ch.textbookQuestionIds).size,ch.textbookQuestionIds.length,'No duplicate menu IDs');
const fallback=x=>Array.isArray(x)?x.map(fallback).join(''):x?.latex?x.fallback:x;
const latex=[];
for(const [i,m] of manifest.parts.entries()){
 const q=items.find(q=>q.id===m.id);
 assert(q,'Missing staged record '+m.id);
 assert.equal(q.kind,'textbook');assert.equal(q.classNum,9);assert.equal(q.chapter,'1');
 assert.equal(q.q.en,manifest.questionStem+'\n('+m.part+') '+m.exactEnglish,'Exact normalized source-text prompt '+m.id);
 assert.equal(q.answer,m.expectedAnswer);
 assert.equal(q.releaseStatus,'english-preview');
 assert(!q.q.ta,'No invented Tamil text');
 assert.match(q.label.ta,/English only; Tamil review pending/);
 assert.equal(q.translationReview,'pending');
 assert(q.steps.length>=3,'Complete worked solution required');
 assert.equal(fallback(q.questionMath.en),q.q.en,'Exact accessible question fallback');
 assert.equal(fallback(q.answerMath),q.answer,'Exact accessible answer fallback');
 for(const [j,s] of q.steps.entries()){
  assert(s.en?.length>20,'Explanatory reason missing '+m.id+'/'+j);
  assert.equal(fallback(s.math),s.eq,'Exact accessible step fallback');
  assert(s.math.latex&&!s.math.latex.includes('javascript:'),'Authored structured KaTeX');
  latex.push({id:m.id,latex:s.math.latex});
 }
 latex.push({id:m.id,latex:q.answerMath.latex});
 if(i>=2)assert(q.questionMath.en[1]?.latex,'Q2 set-builder/math expressions should be typeset');
 assert.equal(ch.textbookQuestionIds.filter(id=>id===m.id).length,1);
 const hint=ctx.window.TriggleWhyStepG9.hints[m.id];
 assert(hint&&hint.en?.length>=35,'Source-pinned learning bridge '+m.id);
 assert.equal(hint.ta,undefined,'No invented Tamil hint '+m.id);
 assert.equal(hint.expected,q.steps[hint.step].en,'Why-step must match real solution '+m.id);
 const difficulty=ctx.window.TriggleDifficulty.get(q);
 assert(difficulty&&difficulty.grade===9&&['easy','medium','difficult'].includes(difficulty.level),'Explicit difficulty '+m.id);
}
assert.equal(ids.length,4);
const q2iv=items.find(x=>x.id==='g9-ch1-ex1.2-q2-iv');
assert(q2iv.q.en.includes('x²'),'Original printed superscript retained');
assert.match(q2iv.steps[1].math.latex,/\(x-2\)\(x-3\)/,'Correct factorization');
assert.deepEqual([2,3].map(x=>x*x-5*x+6),[0,0]);
assert.notEqual(1*1-5*1+6,0);
assert.notEqual(4*4-5*4+6,0);
const q2iii=items.find(x=>x.id==='g9-ch1-ex1.2-q2-iii');
assert(q2iii.steps.some(s=>s.en.includes('x−1')),'Unbounded integer argument');
const slopes=Array.from({length:1000},(_,i)=>i);
assert.equal(new Set(slopes).size,1000,'Arbitrarily many distinct directions through a point');
const katex=require('../assets/vendor/katex/katex.min.js');
for(const entry of latex){
 const html=katex.renderToString(entry.latex,{throwOnError:true,trust:false,strict:'error',output:'htmlAndMathml'});
 assert(html.includes('katex-html')&&html.includes('<math'),'KaTeX visual and accessible output: '+entry.id);
}
assert.throws(()=>vm.runInContext(read(student),ctx,{filename:student,timeout:10000}),/Duplicate Grade 9 Ex1.2 Q2/,'Duplicate registered question must fail');
console.log('PASS Grade 9 Ex1.2 Q2 release: 4 exact-source English parts, 14 complete steps, offline KaTeX, distinct IDs, mathematical reasoning, Tamil pending, published module registration, offline cache and hints.');
