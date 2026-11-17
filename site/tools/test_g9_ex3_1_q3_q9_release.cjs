'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const ROOT=path.resolve(__dirname,'../..'),read=p=>fs.readFileSync(path.join(ROOT,p),'utf8');
const sourceQ3Q4=JSON.parse(read('docs/curriculum/grade-9/candidates/g9-ch3-ex3-1-q3-q4-english-9.json'));
const sourceQ5Q9=JSON.parse(read('docs/curriculum/grade-9/candidates/g9-ch3-ex3-1-q5-q9-english-11.json'));
const rows=[...sourceQ3Q4.rows,...sourceQ5Q9.rows];
const html=read('site/index.html'),sw=read('site/service-worker.js');
const student='data/textbook-exercises/g9-ch3-ex3-1-q3-q9-en.js',why='data/why-step-g9-ex3-1-q3-q9.js';
for(const f of [student,why]){
 assert.equal(html.split(f).length-1,1,'Exactly one student and hint module: '+f);
 assert(sw.includes("'./"+f+"'"),'Offline module '+f);
}
assert(html.includes('ex31-q3q9=20261117')&&html.includes('20261117-algebra20'));
const ctx={window:{},console};vm.createContext(ctx);
for(const match of html.matchAll(/<script src="\.\/(data\/[^?"']+)(?:\?[^"]*)?"/g)){
 const p='site/'+match[1];vm.runInContext(read(p),ctx,{filename:p,timeout:20000});
}
const grade=ctx.window.TRIGGLE_CLASSES[9],chapter=ctx.window.TRIGGLE_CURRICULUM.grades.find(g=>g.grade===9).chapters.find(c=>c.id==='g9-ch3');
assert.equal(sourceQ3Q4.rows.length,9);
assert.equal(sourceQ5Q9.rows.length,11);
assert.equal(rows.length,20);
assert.equal(ctx.window.TRIGGLE_G9_EX3_1_Q3_Q9_IDS.length,20);
assert.equal(new Set(grade.items.map(x=>x.id)).size,grade.items.length);
assert.equal(new Set(chapter.textbookQuestionIds).size,chapter.textbookQuestionIds.length);
const ex31Items=grade.items.filter(x=>x.chapter==='3'&&x.exercise==='3.1');
assert.equal(ex31Items.length,34,'Complete 34/34 student-facing parts for Grade 9 Exercise 3.1');
for(const row of rows){
 const item=grade.items.find(x=>x.id===row.id);assert(item,'Unregistered original part '+row.id);
 assert.equal(grade.items.filter(x=>x.id===row.id).length,1);
 assert.equal(chapter.textbookQuestionIds.filter(id=>id===row.id).length,1);
 const expectedPrompt=row.part?row.question+'. '+row.stem+'\n('+row.part+') '+row.sourceEnglish:row.question+'. '+row.stem+' '+row.sourceEnglish;
 assert.equal(item.q.en,expectedPrompt);
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
console.log('PASS G9 Algebra Ex3.1 Q3-Q9: 20 visual-source-verified English parts (34/34 total Ex 3.1), 60 complete steps, 20 Why hints, one-per-ID chapter navigation, offline assets and no invented Tamil.');
