'use strict';
// Grade 9 Ex1.2 Q1(i-v) new English-only release gate; no invented Tamil.
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const root=path.resolve(__dirname,'../..'),read=p=>fs.readFileSync(path.join(root,p),'utf8');
const fidelity=JSON.parse(read('site/data/textbook-fidelity/g9-ch1-ex1-2-q1.json'));
const candidates=JSON.parse(read('docs/curriculum/grade-9/candidates/g9-ch1-ex1-2-english-34.json'));
const student='site/data/textbook-exercises/g9-ch1-ex1-2-q1-en.js';
const html=read('site/index.html'),sw=read('site/service-worker.js');
assert.equal(fidelity.grade,9);assert.equal(fidelity.exercise,'1.2');
assert.equal(fidelity.partIds.length,5);
assert.equal(fidelity.english.printedPage,11);assert.equal(fidelity.english.pdfPage,17);
assert.equal(fidelity.tamil.translationReview,'deferred');
assert.match(fidelity.mathAmbiguities[0].latex,/\\dfrac\{4\}\{3n\}/);
assert.equal(html.split(student.slice(5)).length-1,1,'Student module loaded exactly once');
assert(sw.includes("'./data/textbook-exercises/g9-ch1-ex1-2-q1-en.js'"),'Offline Q1 module missing');
assert(sw.includes("'./data/why-step-g9-ex1-2-q1.js'"),'Offline Q1 Why-step missing');
assert(!html.includes('g9-ch1-ex1-2-en.js'),'All 34 candidates must not be published accidentally');
const ctx={window:{},console};vm.createContext(ctx);
for(const f of [
 'site/data/class-9.js','site/data/curriculum.js',
 'site/data/textbook-exercises/g9-ch1-ex1-1-view.js',
 student,'site/data/why-step-g9.js','site/data/why-step-g9-ex1-2-q1.js',
 'site/data/problem-difficulty.js'
])vm.runInContext(read(f),ctx,{filename:f,timeout:10000});
const all=ctx.window.TRIGGLE_CLASSES[9].items;
const chapter=ctx.window.TRIGGLE_CURRICULUM.grades.find(g=>g.grade===9).chapters.find(x=>String(x.number)==='1');
const ids=ctx.window.TRIGGLE_G9_EX1_2_Q1_IDS;
assert.equal(ids.length,5);assert.deepEqual([...ids],[...fidelity.partIds]);
assert.equal(new Set(all.map(x=>x.id)).size,all.length,'No duplicate Grade 9 questions');
assert.equal(new Set(chapter.textbookQuestionIds).size,chapter.textbookQuestionIds.length);
for(const id of ids){
 const item=all.find(x=>x.id===id),source=candidates.rows.find(x=>x.id===id),hint=ctx.window.TriggleWhyStepG9.hints[id];
 assert(item&&source&&hint,'Missing full student record/source/hint '+id);
 assert.equal(item.kind,'textbook');assert.equal(item.classNum,9);
 assert.equal(item.q.en,source.question+'. '+source.stem+'\n('+source.part+') '+source.sourceEnglish);
 assert.equal(item.answer,source.answer,'Original answer '+id);
 assert.equal(item.steps.length,source.steps.length,'No deleted worked steps '+id);
 assert(item.steps.length>=3);
 assert(!item.q.ta,'Do not publish invented Tamil wording '+id);
 assert.match(item.label.ta,/English only; Tamil review pending/);
 assert.equal(item.translationReview,'pending');
 assert.equal(item.sourceFidelity.enPdfPages[0],17);
 assert.equal(item.sourceFidelity.taPdfPages[0],19);
 assert.equal(item.sourceFidelity.tamilEditorial,'deferred');
 assert.equal(chapter.textbookQuestionIds.filter(x=>x===id).length,1);
 assert.equal(hint.expected,item.steps[hint.step].en);
 assert(hint.en.length>=35);assert.equal(hint.ta,undefined);
 const meta=ctx.window.TriggleDifficulty.get(item);
 assert.equal(meta.grade,9);assert(['easy','medium','difficult'].includes(meta.level));
 assert.equal(meta.review,'implementation-audit');
 const fallback=x=>Array.isArray(x)?x.map(fallback).join(''):x?.latex?x.fallback:x;
 assert.equal(fallback(item.questionMath.en),item.q.en,'Math question retains original wording '+id);
 assert.equal(fallback(item.answerMath),item.answer,'Math final answer retains source '+id);
 for(let i=0;i<item.steps.length;i++){
  assert.equal(fallback(item.steps[i].math),item.steps[i].eq,'Math equation fallback '+id+'/'+i);
  assert.equal(fallback(item.steps[i].reasonMath.en),item.steps[i].en,'Explanation fallback '+id+'/'+i);
 }
}
assert.equal(ids.filter(x=>x.endsWith('iii')).length,1);
const frac=all.find(x=>x.id.endsWith('ex1.2-q1-iii'));
assert.match(frac.questionMath.en[1].latex,/\\dfrac\{4\}\{3n\}/,'Source denominator is 3n not 3');
assert.match(frac.steps[2].math.latex,/\\frac4\{15\}/);
assert.deepEqual(Array.from({length:5},(_,n)=>3*n+2).filter(x=>x<15),[2,5,8,11,14]);
assert.deepEqual([3,4,5].map(n=>4/(3*n)).length,[3,4,5].length);
assert.equal(new Set([3,4,5].map(n=>4/(3*n))).size,3);
assert.equal(Array.from({length:25},(_,i)=>1882+i).filter(y=>y%4===0&&(y%100!==0||y%400===0)).length,5);
assert.equal(Array.from({length:10},(_,i)=>i-5).length,10);
assert.equal(all.filter(q=>q.exercise==='1.2'&&q.chapter==='1'&&q.kind==='textbook').length,5,'Isolated Q1 fixture must register exactly five parts; Q2 is verified in the separate full-release regression');
console.log('PASS Grade 9 Ex1.2 Q1: 5 official parts, exact English question/fraction, all steps and answers, no duplicate IDs, matched Why-step hints, English-only notice, offline caching, and mathematical checks');
