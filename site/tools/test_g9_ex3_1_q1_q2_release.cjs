'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const ROOT=path.resolve(__dirname,'../..'),read=p=>fs.readFileSync(path.join(ROOT,p),'utf8');
const source=JSON.parse(read('docs/curriculum/grade-9/candidates/g9-ch3-ex3-1-q1-q2-english-11.json'));
const html=read('site/index.html'),sw=read('site/service-worker.js');
const student='data/textbook-exercises/g9-ch3-ex3-1-q1-q2-en.js',why='data/why-step-g9-ex3-1-q1-q2.js';
for(const f of [student,why]){
 assert.equal(html.split(f).length-1,1,'Exactly one student and hint module: '+f);
 assert(sw.includes("'./"+f+"'"),'Offline module '+f);
}
assert(html.includes('g9-math-ex31-q1q2-20261117'));
const ctx={window:{},console};vm.createContext(ctx);
for(const match of html.matchAll(/<script src="\.\/(data\/[^?"']+)(?:\?[^"]*)?"/g)){
 const p='site/'+match[1];vm.runInContext(read(p),ctx,{filename:p,timeout:20000});
}
const grade=ctx.window.TRIGGLE_CLASSES[9],chapter=ctx.window.TRIGGLE_CURRICULUM.grades.find(g=>g.grade===9).chapters.find(c=>c.id==='g9-ch3');
assert.equal(source.rows.length,11);
assert.equal(ctx.window.TRIGGLE_G9_EX3_1_Q1_Q2_IDS.length,11);
assert.equal(new Set(grade.items.map(x=>x.id)).size,grade.items.length);
assert.equal(new Set(chapter.textbookQuestionIds).size,chapter.textbookQuestionIds.length);
for(const row of source.rows){
 const item=grade.items.find(x=>x.id===row.id);assert(item,'Unregistered original part '+row.id);
 assert.equal(grade.items.filter(x=>x.id===row.id).length,1);
 assert.equal(chapter.textbookQuestionIds.filter(id=>id===row.id).length,1);
 assert.equal(item.q.en,row.question+'. '+row.stem+'\n('+row.part+') '+row.sourceEnglish);
 assert.equal(item.answer,row.answer);
 assert.equal(item.questionMath.en.find(p=>p&&p.latex)?.fallback,row.sourceEnglish);
 assert.equal(item.answerMath.fallback,row.answer);
 assert.equal(item.answerMath.latex,row.answerMathLatex);
 assert.equal(item.steps.length,3);
 assert.equal(item.releaseStatus,'english-preview');
 assert(!item.q.ta,'No invented Tamil');
 for(let n=0;n<3;n++){
  assert.equal(item.steps[n].eq,row.steps[n].equation);
  assert.equal(item.steps[n].en,row.steps[n].reason);
  assert.equal(item.steps[n].math.fallback,item.steps[n].eq);
 }
 const hint=ctx.window.TriggleWhyStepG9.hints[row.id];
 assert(hint&&hint.en&&hint.en.length>60&&!hint.ta,'English-only Why explanation '+row.id);
 assert.equal(hint.expected,item.steps[hint.step].en);
 assert.equal(ctx.window.TriggleDifficulty.get(item)?.grade,9);
}
const app=read('site/assets/app.js');
assert(app.includes("['1','3'].includes(String(chapter?.number))"),'Grade 9 Chapter 3 Next navigation must sort by question');
console.log('PASS G9 Algebra Ex3.1: 11 visual-source-verified English parts, 33 complete steps, 11 Why hints, one-per-ID chapter navigation, offline assets and no invented Tamil.');
