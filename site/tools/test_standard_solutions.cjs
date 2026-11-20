'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm'),crypto=require('node:crypto');
const read=p=>fs.readFileSync('site/'+p,'utf8'),html=read('index.html'),ctx={window:{}};
for(const m of html.matchAll(/<script src="\.\/(data\/[^?\"]+)[^\"]*"/g))vm.runInNewContext(read(m[1]),ctx,{filename:m[1]});
const {TRIGGLE_CLASSES:classes,TriggleDifficulty:registry}=ctx.window;
const preserved=require('../../docs/standard-solution-preservation.json');
const approvedBatch=require('../../docs/curriculum/grade-10/batches/g10-ch2-ex2-2.json');
const approvedEx22=['1','2','3','4','5','6','7','8','9'].map(n=>'c10-2-ex2-2-q'+n);
const recoveredBatch=require('../../docs/curriculum/grade-10/g10-seven-recovery-20261113.json');
const recoveryIds=recoveredBatch.records.map(r=>r.id);
const statisticsBatch=require('../../docs/curriculum/grade-10/g10-ch8-ex8-1-q5-q10-20261113.json');
const statisticsIds=statisticsBatch.records.map(r=>r.id);
const statisticsFollowup=require('../../docs/curriculum/grade-10/g10-ch8-ex8-1-q11-q15-20261113.json');
const followupIds=statisticsFollowup.records.map(r=>r.id);
assert.equal(statisticsIds.length,6);
assert.equal(followupIds.length,5);
assert.equal(recoveryIds.length,7);
const traceSourceGate=require('../../docs/curriculum/grade-10/trace/g10-ch2-source-gate.json');
const traceIds=traceSourceGate.records.map(r=>r.id);
assert.equal(traceIds.length,63,'Only the 63 reconciled Chapter 2 additions are approved');
// Source-image checked 2025 TN Mathematics Ex 2.3, printed page 51.
// Run in an isolated registry and freeze the same ten exact records used by
// the student's app; independent modular arithmetic has its own release gate.
const modularContext={window:{TRIGGLE_CLASSES:{10:{items:[]}},TRIGGLE_CURRICULUM:{grades:[{grade:10,chapters:[{number:2,textbookQuestionIds:[]}]}]}}};
vm.runInNewContext(read('data/textbook-exercises/g10-ch2-ex2-3-modular-en.js'),modularContext,{filename:'g10-ch2-ex2-3-modular-en.js'});
const modularRecords=modularContext.window.TRIGGLE_CLASSES[10].items;
const modularIds=modularRecords.map(r=>r.id);
assert.equal(modularIds.length,10,'Ten source-verified modular tasks (Q1 five parts + Q2/Q3/Q4/Q8/Q9)');
assert.equal(new Set(modularIds).size,10);
const sequenceContext={window:{TRIGGLE_CLASSES:{10:{items:[]}},TRIGGLE_CURRICULUM:{grades:[{grade:10,chapters:[{number:2,textbookQuestionIds:[]}]}]}}};
vm.runInNewContext(read('data/textbook-exercises/g10-ch2-ex2-4-sequences-en.js'),sequenceContext,{filename:'g10-ch2-ex2-4-sequences-en.js'});
const sequenceRecords=sequenceContext.window.TRIGGLE_CLASSES[10].items;
const sequenceIds=sequenceRecords.map(r=>r.id);
assert.equal(sequenceIds.length,10,'Ten original-page Ex 2.4 Q2–Q6 parts');
assert.equal(new Set(sequenceIds).size,10);
const ex25Context={window:{TRIGGLE_CLASSES:{10:{items:[]}},TRIGGLE_CURRICULUM:{grades:[{grade:10,chapters:[{number:2,textbookQuestionIds:[]}]}]}}};
vm.runInNewContext(read('data/textbook-exercises/g10-ch2-ex2-5-ap-missing-en.js'),ex25Context,{filename:'g10-ch2-ex2-5-ap-missing-en.js'});
const ex25Records=ex25Context.window.TRIGGLE_CLASSES[10].items;
const ex25Ids=ex25Records.map(r=>r.id);
assert.equal(ex25Records.length,6,'Six source-reviewed Exercise 2.5 parts');
const ex26Context={window:{TRIGGLE_CLASSES:{10:{items:[]}},TRIGGLE_CURRICULUM:{grades:[{grade:10,chapters:[{number:2,textbookQuestionIds:[]}]}]}}};
vm.runInNewContext(read('data/textbook-exercises/g10-ch2-ex2-6-ap-sum-missing-en.js'),ex26Context,{filename:'g10-ch2-ex2-6-ap-sum-missing-en.js'});
const ex26Records=ex26Context.window.TRIGGLE_CLASSES[10].items;
const ex26Ids=ex26Records.map(r=>r.id);
assert.equal(ex26Records.length,5,'Five source-reviewed Exercise 2.6 parts');
const ex28Context={window:{TRIGGLE_CLASSES:{10:{items:[]}},TRIGGLE_CURRICULUM:{grades:[{grade:10,chapters:[{number:2,textbookQuestionIds:[]}]}]}}};
vm.runInNewContext(read('data/textbook-exercises/g10-ch2-ex2-8-gp-sum-missing-en.js'),ex28Context,{filename:'g10-ch2-ex2-8-gp-sum-missing-en.js'});
const ex28Records=ex28Context.window.TRIGGLE_CLASSES[10].items;
const ex28Ids=ex28Records.map(r=>r.id);
assert.equal(ex28Records.length,7,'Seven source-reviewed Exercise 2.8 parts');
const ex29Context={window:{TRIGGLE_CLASSES:{10:{items:[]}},TRIGGLE_CURRICULUM:{grades:[{grade:10,chapters:[{number:2,textbookQuestionIds:[]}]}]}}};
vm.runInNewContext(read('data/textbook-exercises/g10-ch2-ex2-9-special-series-missing-en.js'),ex29Context,{filename:'g10-ch2-ex2-9-special-series-missing-en.js'});
const ex29Records=ex29Context.window.TRIGGLE_CLASSES[10].items;
const ex29Ids=ex29Records.map(r=>r.id);
assert.equal(ex29Records.length,9,'Nine source-reviewed Exercise 2.9 parts');
const ex27Context={window:{TRIGGLE_CLASSES:{10:{items:[]}},TRIGGLE_CURRICULUM:{grades:[{grade:10,chapters:[{number:2,textbookQuestionIds:[]}]}]}}};
vm.runInNewContext(read('data/textbook-exercises/g10-ch2-ex2-7-gp-missing-en.js'),ex27Context,{filename:'g10-ch2-ex2-7-gp-missing-en.js'});
const ex27Records=ex27Context.window.TRIGGLE_CLASSES[10].items;
const ex27Ids=ex27Records.map(r=>r.id);
assert.equal(ex27Records.length,6,'Six source-reviewed Exercise 2.7 parts');
const ex210UnitContext={window:{TRIGGLE_CLASSES:{10:{items:[]}},TRIGGLE_CURRICULUM:{grades:[{grade:10,chapters:[{number:2,textbookQuestionIds:[]}]}]}}};
vm.runInNewContext(read('data/textbook-exercises/g10-ch2-ex2-10-and-unit-en.js'),ex210UnitContext,{filename:'g10-ch2-ex2-10-and-unit-en.js'});
const ex210UnitRecords=ex210UnitContext.window.TRIGGLE_CLASSES[10].items;
const ex210UnitIds=ex210UnitRecords.map(r=>r.id);
assert.equal(ex210UnitRecords.length,15,'Fifteen source-reviewed Exercise 2.10 & Unit Exercise 2 parts');
const ex31Context={window:{TRIGGLE_CLASSES:{10:{items:[]}},TRIGGLE_CURRICULUM:{grades:[{grade:10,chapters:[{number:3,textbookQuestionIds:[]}]}]}}};
vm.runInNewContext(read('data/textbook-exercises/g10-ch3-ex3-1-complete-en.js'),ex31Context,{filename:'g10-ch3-ex3-1-complete-en.js'});
const ex31Records=ex31Context.window.TRIGGLE_CLASSES[10].items;
const ex31Ids=ex31Records.map(r=>r.id);
assert.equal(ex31Records.length,6,'Six source-reviewed Exercise 3.1 parts');
const ex32Context={window:{TRIGGLE_CLASSES:{10:{items:[]}},TRIGGLE_CURRICULUM:{grades:[{grade:10,chapters:[{number:3,textbookQuestionIds:[]}]}]}}};
vm.runInNewContext(read('data/textbook-exercises/g10-ch3-ex3-2-complete-en.js'),ex32Context,{filename:'g10-ch3-ex3-2-complete-en.js'});
const ex32Records=ex32Context.window.TRIGGLE_CLASSES[10].items;
const ex32Ids=ex32Records.map(r=>r.id);
assert.equal(ex32Records.length,10,'Ten source-reviewed Exercise 3.2 parts');
const ex33Context={window:{TRIGGLE_CLASSES:{10:{items:[]}},TRIGGLE_CURRICULUM:{grades:[{grade:10,chapters:[{number:3,textbookQuestionIds:[]}]}]}}};
vm.runInNewContext(read('data/textbook-exercises/g10-ch3-ex3-3-complete-en.js'),ex33Context,{filename:'g10-ch3-ex3-3-complete-en.js'});
const ex33Records=ex33Context.window.TRIGGLE_CLASSES[10].items;
const ex33Ids=ex33Records.map(r=>r.id);
assert.equal(ex33Records.length,9,'Nine source-reviewed Exercise 3.3 parts');
const ex34Context={window:{TRIGGLE_CLASSES:{10:{items:[]}},TRIGGLE_CURRICULUM:{grades:[{grade:10,chapters:[{number:3,textbookQuestionIds:[]}]}]}}};
vm.runInNewContext(read('data/textbook-exercises/g10-ch3-ex3-4-complete-en.js'),ex34Context,{filename:'g10-ch3-ex3-4-complete-en.js'});
const ex34Records=ex34Context.window.TRIGGLE_CLASSES[10].items;
const ex34Ids=ex34Records.map(r=>r.id);
assert.equal(ex34Records.length,8,'Eight source-reviewed Exercise 3.4 parts');
const ex35Context={window:{TRIGGLE_CLASSES:{10:{items:[]}},TRIGGLE_CURRICULUM:{grades:[{grade:10,chapters:[{number:3,textbookQuestionIds:[]}]}]}}};
vm.runInNewContext(read('data/textbook-exercises/g10-ch3-ex3-5-complete-en.js'),ex35Context,{filename:'g10-ch3-ex3-5-complete-en.js'});
const ex35Records=ex35Context.window.TRIGGLE_CLASSES[10].items;
const ex35Ids=ex35Records.map(r=>r.id);
assert.equal(ex35Records.length,11,'Eleven source-reviewed Exercise 3.5 parts');
const ex36Context={window:{TRIGGLE_CLASSES:{10:{items:[]}},TRIGGLE_CURRICULUM:{grades:[{grade:10,chapters:[{number:3,textbookQuestionIds:[]}]}]}}};
vm.runInNewContext(read('data/textbook-exercises/g10-ch3-ex3-6-complete-en.js'),ex36Context,{filename:'g10-ch3-ex3-6-complete-en.js'});
const ex36Records=ex36Context.window.TRIGGLE_CLASSES[10].items;
const ex36Ids=ex36Records.map(r=>r.id);
assert.equal(ex36Records.length,11,'Eleven source-reviewed Exercise 3.6 parts');
const ex37Context={window:{TRIGGLE_CLASSES:{10:{items:[]}},TRIGGLE_CURRICULUM:{grades:[{grade:10,chapters:[{number:3,textbookQuestionIds:[]}]}]}}};
vm.runInNewContext(read('data/textbook-exercises/g10-ch3-ex3-7-complete-en.js'),ex37Context,{filename:'g10-ch3-ex3-7-complete-en.js'});
const ex37Records=ex37Context.window.TRIGGLE_CLASSES[10].items;
const ex37Ids=ex37Records.map(r=>r.id);
assert.equal(ex37Records.length,7,'Seven source-reviewed Exercise 3.7 parts');
const ex38Context={window:{TRIGGLE_CLASSES:{10:{items:[]}},TRIGGLE_CURRICULUM:{grades:[{grade:10,chapters:[{number:3,textbookQuestionIds:[]}]}]}}};
vm.runInNewContext(read('data/textbook-exercises/g10-ch3-ex3-8-complete-en.js'),ex38Context,{filename:'g10-ch3-ex3-8-complete-en.js'});
const ex38Records=ex38Context.window.TRIGGLE_CLASSES[10].items;
const ex38Ids=ex38Records.map(r=>r.id);
assert.equal(ex38Records.length,8,'Eight source-reviewed Exercise 3.8 parts');
const ex39Context={window:{TRIGGLE_CLASSES:{10:{items:[]}},TRIGGLE_CURRICULUM:{grades:[{grade:10,chapters:[{number:3,textbookQuestionIds:[]}]}]}}};
vm.runInNewContext(read('data/textbook-exercises/g10-ch3-ex3-9-complete-en.js'),ex39Context,{filename:'g10-ch3-ex3-9-complete-en.js'});
const ex39Records=ex39Context.window.TRIGGLE_CLASSES[10].items;
const ex39Ids=ex39Records.map(r=>r.id);
assert.equal(ex39Records.length,8,'Eight source-reviewed Exercise 3.9 parts');
const ex310Context={window:{TRIGGLE_CLASSES:{10:{items:[]}},TRIGGLE_CURRICULUM:{grades:[{grade:10,chapters:[{number:3,textbookQuestionIds:[]}]}]}}};
vm.runInNewContext(read('data/textbook-exercises/g10-ch3-ex3-10-complete-en.js'),ex310Context,{filename:'g10-ch3-ex3-10-complete-en.js'});
const ex310Records=ex310Context.window.TRIGGLE_CLASSES[10].items;
const ex310Ids=ex310Records.map(r=>r.id);
assert.equal(ex310Records.length,6,'Six source-reviewed Exercise 3.10 parts');
const ex311Context={window:{TRIGGLE_CLASSES:{10:{items:[]}},TRIGGLE_CURRICULUM:{grades:[{grade:10,chapters:[{number:3,textbookQuestionIds:[]}]}]}}};
vm.runInNewContext(read('data/textbook-exercises/g10-ch3-ex3-11-complete-en.js'),ex311Context,{filename:'g10-ch3-ex3-11-complete-en.js'});
const ex311Records=ex311Context.window.TRIGGLE_CLASSES[10].items;
const ex311Ids=ex311Records.map(r=>r.id);
assert.equal(ex311Records.length,7,'Seven source-reviewed Exercise 3.11 parts');
const ex312Context={window:{TRIGGLE_CLASSES:{10:{items:[]}},TRIGGLE_CURRICULUM:{grades:[{grade:10,chapters:[{number:3,textbookQuestionIds:[]}]}]}}};
vm.runInNewContext(read('data/textbook-exercises/g10-ch3-ex3-12-complete-en.js'),ex312Context,{filename:'g10-ch3-ex3-12-complete-en.js'});
const ex312Records=ex312Context.window.TRIGGLE_CLASSES[10].items;
const ex312Ids=ex312Records.map(r=>r.id);
assert.equal(ex312Records.length,9,'Nine source-reviewed Exercise 3.12 parts');
const ex313Context={window:{TRIGGLE_CLASSES:{10:{items:[]}},TRIGGLE_CURRICULUM:{grades:[{grade:10,chapters:[{number:3,textbookQuestionIds:[]}]}]}}};
vm.runInNewContext(read('data/textbook-exercises/g10-ch3-ex3-13-complete-en.js'),ex313Context,{filename:'g10-ch3-ex3-13-complete-en.js'});
const ex313Records=ex313Context.window.TRIGGLE_CLASSES[10].items;
const ex313Ids=ex313Records.map(r=>r.id);
assert.equal(ex313Records.length,10,'Ten source-reviewed Exercise 3.13 parts');
const ex314Context={window:{TRIGGLE_CLASSES:{10:{items:[]}},TRIGGLE_CURRICULUM:{grades:[{grade:10,chapters:[{number:3,textbookQuestionIds:[]}]}]}}};
vm.runInNewContext(read('data/textbook-exercises/g10-ch3-ex3-14-complete-en.js'),ex314Context,{filename:'g10-ch3-ex3-14-complete-en.js'});
const ex314Records=ex314Context.window.TRIGGLE_CLASSES[10].items;
const ex314Ids=ex314Records.map(r=>r.id);
assert.equal(ex314Records.length,13,'Thirteen source-reviewed Exercise 3.14 parts');
const geometry=require('../data/textbook-fidelity/g10-ch4-ex4-1-to-4-2.json');
const geometryEx43=require('../data/textbook-fidelity/g10-ch4-ex4-3.json');
const geometryById=new Map([...geometry.items,...geometryEx43.items].map(item=>[item.id,item]));
const geometryNewIds=geometry.items.filter(item=>!item.wasAvailableOnMain).map(item=>item.id);
assert.equal(geometryNewIds.length,32);
const geometryEx43NewIds=geometryEx43.items.map(item=>item.id);
assert.equal(geometryEx43NewIds.length,8,'Eight source-indexed Ex4.3 tasks');
const ch5Ex51=require('../data/textbook-fidelity/g10-ch5-ex5-1.json');
const ch5Ex51ById=new Map(ch5Ex51.items.map(item=>[item.id,item]));
const ch5Ex51NewIds=ch5Ex51.items.map(item=>item.id);
assert.equal(ch5Ex51NewIds.length,18,'Eighteen source-indexed Ch5 Ex5.1 tasks');
const ch5Ex52=require('../data/textbook-fidelity/g10-ch5-ex5-2.json');
const ch5Ex52ById=new Map(ch5Ex52.items.map(item=>[item.id,item]));
const ch5Ex52NewIds=ch5Ex52.items.map(item=>item.id);
assert.equal(ch5Ex52NewIds.length,17,'Seventeen source-indexed Ch5 Ex5.2 tasks');
const ch5Ex53=require('../data/textbook-fidelity/g10-ch5-ex5-3.json');
const ch5Ex53ById=new Map(ch5Ex53.items.map(item=>[item.id,item]));
const ch5Ex53NewIds=ch5Ex53.items.map(item=>item.id);
assert.equal(ch5Ex53NewIds.length,22,'Twenty-two source-indexed Ch5 Ex5.3 tasks');
const ch5Ex54=require('../data/textbook-fidelity/g10-ch5-ex5-4.json');
const ch5Ex54ById=new Map(ch5Ex54.items.map(item=>[item.id,item]));
const ch5Ex54NewIds=ch5Ex54.items.map(item=>item.id);
assert.equal(ch5Ex54NewIds.length,15,'Fifteen source-indexed Ch5 Ex5.4 tasks');
const ch5Ex55=require('../data/textbook-fidelity/g10-ch5-ex5-5.json');
const ch5Ex55ById=new Map(ch5Ex55.items.map(item=>[item.id,item]));
const ch5Ex55NewIds=ch5Ex55.items.map(item=>item.id);
assert.equal(ch5Ex55NewIds.length,15,'Fifteen source-indexed Ch5 Ex5.5 MCQs');
const ch5Unit=require('../data/textbook-fidelity/g10-ch5-ex5-unit.json');
const ch5UnitById=new Map(ch5Unit.items.map(item=>[item.id,item]));
const ch5UnitNewIds=ch5Unit.items.map(item=>item.id);
assert.equal(ch5UnitNewIds.length,10,'Ten source-indexed Ch5 Unit Ex5 questions');
const ch6Ex61=require('../data/textbook-fidelity/g10-ch6-ex6-1.json');
const ch6Ex61ById=new Map(ch6Ex61.items.map(item=>[item.id,item]));
const ch6Ex61NewIds=ch6Ex61.items.map(item=>item.id);
assert.equal(ch6Ex61NewIds.length,18,'Eighteen new source-indexed Ch6 Ex6.1 tasks (+1 preserved Q2(i))');
const ch6Ex62=require('../data/textbook-fidelity/g10-ch6-ex6-2.json');
const ch6Ex62ById=new Map(ch6Ex62.items.map(item=>[item.id,item]));
const ch6Ex62NewIds=ch6Ex62.items.map(item=>item.id);
assert.equal(ch6Ex62NewIds.length,7,'Seven source-indexed Ch6 Ex6.2 tasks');
const ch6Ex63=require('../data/textbook-fidelity/g10-ch6-ex6-3.json');
const ch6Ex63ById=new Map(ch6Ex63.items.map(item=>[item.id,item]));
const ch6Ex63NewIds=ch6Ex63.items.map(item=>item.id);
assert.equal(ch6Ex63NewIds.length,6,'Six source-indexed Ch6 Ex6.3 questions');
const ch6Ex64=require('../data/textbook-fidelity/g10-ch6-ex6-4.json');
const ch6Ex64ById=new Map(ch6Ex64.items.map(item=>[item.id,item]));
const ch6Ex64NewIds=ch6Ex64.items.map(item=>item.id);
assert.equal(ch6Ex64NewIds.length,9,'Nine source-indexed Ch6 Ex6.4 tasks');
const ch6Ex65=require('../data/textbook-fidelity/g10-ch6-ex6-5.json');
const ch6Ex65ById=new Map(ch6Ex65.items.map(item=>[item.id,item]));
const ch6Ex65NewIds=ch6Ex65.items.map(item=>item.id);
assert.equal(ch6Ex65NewIds.length,15,'Fifteen source-indexed Ch6 Ex6.5 MCQs');
const ch6Unit=require('../data/textbook-fidelity/g10-ch6-ex6-unit.json');
const ch6UnitById=new Map(ch6Unit.items.map(item=>[item.id,item]));
const ch6UnitNewIds=ch6Unit.items.map(item=>item.id);
assert.equal(ch6UnitNewIds.length,13,'Thirteen source-indexed Ch6 Unit Ex6 tasks');
const approvedNewIds=[...approvedEx22,...traceIds,...modularIds,...sequenceIds,...ex25Ids,...ex26Ids,...ex27Ids,...ex28Ids,...ex29Ids,...recoveryIds,...statisticsIds,...followupIds,...ex210UnitIds,...ex31Ids,...ex32Ids,...ex33Ids,...ex34Ids,...ex35Ids,...ex36Ids,...ex37Ids,...ex38Ids,...ex39Ids,...ex310Ids,...ex311Ids,...ex312Ids,...ex313Ids,...ex314Ids,...geometryNewIds,...geometryEx43NewIds,...ch5Ex51NewIds,...ch5Ex52NewIds,...ch5Ex53NewIds,...ch5Ex54NewIds,...ch5Ex55NewIds,...ch5UnitNewIds,...ch6Ex61NewIds,...ch6Ex62NewIds,...ch6Ex63NewIds,...ch6Ex64NewIds,...ch6Ex65NewIds,...ch6UnitNewIds];
const g9Fidelity=require('../data/textbook-fidelity/g9-ch1-ex1-2-q1.json');
const g9Candidates=require('../../docs/curriculum/grade-9/candidates/g9-ch1-ex1-2-english-34.json');
const g9Q2Fidelity=require('../data/textbook-fidelity/g9-ch1-ex1-2-q2.json');
const g9Q5Q6Fidelity=require('../data/textbook-fidelity/g9-ch1-ex1-2-q5-iii-q6.json');
const g9Batch1Fidelity=require('../data/textbook-fidelity/g9-ch1-ex1-2-q3-q5-batch1.json');
const g9Q7Q10Fidelity=require('../data/textbook-fidelity/g9-ch1-ex1-2-q7-q10.json');
const g9AlgebraSource=require('../../docs/curriculum/grade-9/candidates/g9-ch3-ex3-1-q1-q2-english-11.json');
const g9AlgebraQ3Q4Source=require('../../docs/curriculum/grade-9/candidates/g9-ch3-ex3-1-q3-q4-english-9.json');
const g9AlgebraQ5Q9Source=require('../../docs/curriculum/grade-9/candidates/g9-ch3-ex3-1-q5-q9-english-11.json');
const g9AlgebraRows=[...g9AlgebraSource.rows,...g9AlgebraQ3Q4Source.rows,...g9AlgebraQ5Q9Source.rows];
const g9Ex32Batch=require('../../docs/curriculum/grade-9/batches/g9-ch3-ex3-2-english.json');
const g9Ex32ById=new Map(g9Ex32Batch.records.map(record=>[record.id,record]));
const g9Ex32NewIds=g9Ex32Batch.records.map(record=>record.id).filter(id=>!Object.hasOwn(preserved.sha256,id));
assert.equal(g9Ex32NewIds.length,19);
const approvedG9Ids=[...g9AlgebraRows.map(p=>p.id),...g9Fidelity.partIds,...g9Q2Fidelity.parts.map(p=>p.id),...g9Q5Q6Fidelity.parts.map(p=>p.id),...g9Batch1Fidelity.parts.map(p=>p.id),...g9Q7Q10Fidelity.parts.map(p=>p.id),...g9Ex32NewIds];
assert.equal(approvedG9Ids.length,84);
assert(!approvedG9Ids.some(id=>Object.hasOwn(preserved.sha256,id)));

assert.deepEqual(approvedBatch.records.map(r=>r.id),approvedEx22);
assert(!approvedNewIds.some(id=>Object.hasOwn(preserved.sha256,id)));

assert.match(preserved.baselineCommit,/^[a-f0-9]{40}$/);
const old={window:{}};vm.runInNewContext(fs.readFileSync('docs/history/discontinued-explanation-modes/g12-explanation-catalog.js','utf8'),old);
let count=0,reviewed=0;
for(const [grade,data] of Object.entries(classes)){
 const baselineIds=preserved.grades[grade],currentIds=data.items.map(item=>item.id);
 assert.equal(JSON.stringify(currentIds.slice(0,baselineIds.length)),JSON.stringify(baselineIds),'Original 568 IDs/order preserved as the exact prefix');
 assert.equal(JSON.stringify(currentIds.slice(baselineIds.length)),JSON.stringify(grade==='10'?approvedNewIds:grade==='9'?approvedG9Ids:[]),'Only source-aligned, evidence-indexed Grade 9/10 additions allowed');
 for(const item of data.items){
  const hash=crypto.createHash('sha256').update(JSON.stringify(item)).digest('hex');
  if(grade==='10'&&geometryById.has(item.id)){
   const evidence=geometryById.get(item.id);
   assert.equal(item.q.en,evidence.textbookPrompt.en,'Geometry English source fidelity '+item.id);
   assert.equal(item.q.ta,evidence.textbookPrompt.ta,'Geometry Tamil source fidelity '+item.id);
   assert.equal(item.translationReview,'pending');
  }else if(grade==='10'&&ch5Ex51ById.has(item.id)){
   const evidence=ch5Ex51ById.get(item.id);
   assert.equal(item.q.en,evidence.textbookPrompt.en,'Ch5 English source fidelity '+item.id);
   assert.equal(item.q.ta,evidence.textbookPrompt.ta,'Ch5 Tamil source fidelity '+item.id);
   assert.equal(item.translationReview,'pending');
  }else if(grade==='10'&&ch5Ex52ById.has(item.id)){
   const evidence=ch5Ex52ById.get(item.id);
   assert.equal(item.q.en,evidence.textbookPrompt.en,'Ch5 Ex5.2 English source fidelity '+item.id);
   assert.equal(item.q.ta,evidence.textbookPrompt.ta,'Ch5 Ex5.2 Tamil source fidelity '+item.id);
   assert.equal(item.translationReview,'pending');
  }else if(grade==='10'&&ch5Ex53ById.has(item.id)){
   const evidence=ch5Ex53ById.get(item.id);
   assert.equal(item.q.en,evidence.textbookPrompt.en,'Ch5 Ex5.3 English source fidelity '+item.id);
   assert.equal(item.q.ta,evidence.textbookPrompt.ta,'Ch5 Ex5.3 Tamil source fidelity '+item.id);
   assert.equal(item.translationReview,'pending');
  }else if(grade==='10'&&ch5Ex54ById.has(item.id)){
   const evidence=ch5Ex54ById.get(item.id);
   assert.equal(item.q.en,evidence.textbookPrompt.en,'Ch5 Ex5.4 English source fidelity '+item.id);
   assert.equal(item.q.ta,evidence.textbookPrompt.ta,'Ch5 Ex5.4 Tamil source fidelity '+item.id);
   assert.equal(item.translationReview,'pending');
  }else if(grade==='10'&&ch5Ex55ById.has(item.id)){
   const evidence=ch5Ex55ById.get(item.id);
   assert.equal(item.q.en,evidence.textbookPrompt.en,'Ch5 Ex5.5 English source fidelity '+item.id);
   assert.equal(item.q.ta,evidence.textbookPrompt.ta,'Ch5 Ex5.5 Tamil source fidelity '+item.id);
   assert.equal(item.translationReview,'pending');
  }else if(grade==='10'&&ch5UnitById.has(item.id)){
   const evidence=ch5UnitById.get(item.id);
   assert.equal(item.q.en,evidence.textbookPrompt.en,'Ch5 Unit Ex5 English source fidelity '+item.id);
   assert.equal(item.q.ta,evidence.textbookPrompt.ta,'Ch5 Unit Ex5 Tamil source fidelity '+item.id);
   assert.equal(item.translationReview,'pending');
  }else if(grade==='10'&&ch6Ex61ById.has(item.id)){
   const evidence=ch6Ex61ById.get(item.id);
   assert.equal(item.q.en,evidence.textbookPrompt.en,'Ch6 Ex6.1 English source fidelity '+item.id);
   assert.equal(item.q.ta,evidence.textbookPrompt.ta,'Ch6 Ex6.1 Tamil source fidelity '+item.id);
   assert.equal(item.translationReview,'pending');
  }else if(grade==='10'&&ch6Ex62ById.has(item.id)){
   const evidence=ch6Ex62ById.get(item.id);
   assert.equal(item.q.en,evidence.textbookPrompt.en,'Ch6 Ex6.2 English source fidelity '+item.id);
   assert.equal(item.q.ta,evidence.textbookPrompt.ta,'Ch6 Ex6.2 Tamil source fidelity '+item.id);
   assert.equal(item.translationReview,'pending');
  }else if(grade==='10'&&ch6Ex63ById.has(item.id)){
   const evidence=ch6Ex63ById.get(item.id);
   assert.equal(item.q.en,evidence.textbookPrompt.en,'Ch6 Ex6.3 English source fidelity '+item.id);
   assert.equal(item.q.ta,evidence.textbookPrompt.ta,'Ch6 Ex6.3 Tamil source fidelity '+item.id);
   assert.equal(item.translationReview,'pending');
  }else if(grade==='10'&&ch6Ex64ById.has(item.id)){
   const evidence=ch6Ex64ById.get(item.id);
   assert.equal(item.q.en,evidence.textbookPrompt.en,'Ch6 Ex6.4 English source fidelity '+item.id);
   assert.equal(item.q.ta,evidence.textbookPrompt.ta,'Ch6 Ex6.4 Tamil source fidelity '+item.id);
   assert.equal(item.translationReview,'pending');
  }else if(grade==='10'&&ch6Ex65ById.has(item.id)){
   const evidence=ch6Ex65ById.get(item.id);
   assert.equal(item.q.en,evidence.textbookPrompt.en,'Ch6 Ex6.5 English source fidelity '+item.id);
   assert.equal(item.q.ta,evidence.textbookPrompt.ta,'Ch6 Ex6.5 Tamil source fidelity '+item.id);
   assert.equal(item.translationReview,'pending');
  }else if(grade==='10'&&ch6UnitById.has(item.id)){
   const evidence=ch6UnitById.get(item.id);
   assert.equal(item.q.en,evidence.textbookPrompt.en,'Ch6 Unit Ex6 English source fidelity '+item.id);
   assert.equal(item.q.ta,evidence.textbookPrompt.ta,'Ch6 Unit Ex6 Tamil source fidelity '+item.id);
   assert.equal(item.translationReview,'pending');
  }else if(grade==='9'&&g9Ex32ById.has(item.id)){
   const approved=g9Ex32ById.get(item.id);
   assert.equal(hash,crypto.createHash('sha256').update(JSON.stringify(approved)).digest('hex'),'Exercise 3.2 matches source-audited batch '+item.id);
  }else if(Object.hasOwn(preserved.sha256,item.id)){
   assert.equal(hash,preserved.sha256[item.id],'Entire original question, mathematical working, notation, answer and metadata: '+item.id);
  }else{
   const approvedG9=grade==='9'&&approvedG9Ids.includes(item.id);
   const approvedG10=grade==='10'&&approvedNewIds.includes(item.id);
   assert.ok(approvedG9||approvedG10,'No unapproved question '+item.id);
   if(approvedG9){
     if(g9Fidelity.partIds.includes(item.id)){
       const source=g9Candidates.rows.find(row=>row.id===item.id);
       assert.ok(source,'Missing original Grade 9 audited Q1 candidate '+item.id);
       assert.equal(item.q.en,source.question+'. '+source.stem+'\n('+source.part+') '+source.sourceEnglish);
       assert.equal(item.answer,source.answer,'Grade 9 audited Q1 answer '+item.id);
       assert.equal(item.steps.length,source.steps.length,'Grade 9 Q1 worked steps retained '+item.id);
       for(let n=0;n<item.steps.length;n++){
         assert.equal(item.steps[n].en,source.steps[n].reason);
         assert.equal(item.steps[n].eq,source.steps[n].equation);
       }
     }else if(g9AlgebraRows.some(p=>p.id===item.id)){
       const row=g9AlgebraRows.find(p=>p.id===item.id);
       const part=row.part&&!g9AlgebraSource.rows.includes(row)?'('+row.part+') ':'';
       const expectedPrompt=row.question+'. '+row.stem+(row.part?'\n':' ')+part+row.sourceEnglish;
       assert.equal(item.q.en,expectedPrompt);
       assert.equal(item.answer,row.answer);
       assert.equal(item.steps.length,row.steps.length);
       for(let i=0;i<row.steps.length;i++){
         assert.equal(item.steps[i].en,row.steps[i].reason);
         assert.equal(item.steps[i].eq,row.steps[i].equation);
         assert.equal(item.steps[i].math?.latex,row.steps[i].mathLatex);
       }
       assert.equal(item.releaseStatus,'english-preview');
       assert.equal(item.translationReview,'pending');
       assert(!item.q.ta,'Do not invent Tamil for Algebra '+item.id);
     }else if(g9Batch1Fidelity.parts.some(p=>p.id===item.id)){
       const source=g9Candidates.rows.find(p=>p.id===item.id);
       const manifest=g9Batch1Fidelity.parts.find(p=>p.id===item.id);
       assert(source&&manifest,'Missing source-audited G9 Q3-Q5 '+item.id);
       assert.equal(item.q.en,source.question+'. '+source.stem+'\n('+source.part+') '+source.sourceEnglish);
       assert.equal(item.q.en,manifest.exactEnglish,'Q3-Q5 exact source '+item.id);
       assert.equal(item.answer,source.answer,'Q3-Q5 source answer '+item.id);
       assert.equal(item.steps.length,source.steps.length,'Q3-Q5 source steps '+item.id);
       for(let i=0;i<source.steps.length;i++){
         assert.equal(item.steps[i].en,source.steps[i].reason,'Q3-Q5 source explanation '+item.id);
         assert.equal(item.steps[i].eq,source.steps[i].equation,'Q3-Q5 source equation '+item.id);
         assert.equal(item.steps[i].math?.fallback,item.steps[i].eq,'Q3-Q5 visible math fallback '+item.id);
       }
       assert.equal(item.releaseStatus,'english-preview');
       assert(!item.q.ta,'Do not invent Tamil '+item.id);
     }else{
       const source=g9Q2Fidelity.parts.find(p=>p.id===item.id)||g9Q5Q6Fidelity.parts.find(p=>p.id===item.id)||g9Q7Q10Fidelity.parts.find(p=>p.id===item.id);
       assert.ok(source,'Missing Grade 9 Exercise 1.2 source '+item.id);
       const stem=source.questionStem||g9Q2Fidelity.questionStem;
       const expectedPrompt=source.expectedPrompt||(stem+'\n('+source.part+') '+source.exactEnglish);
       assert.equal(item.q.en,expectedPrompt);
       assert.equal(item.answer,source.expectedAnswer,'Grade 9 source checked answer '+item.id);
       assert.ok(item.steps.length>=3,'No missing Grade 9 working '+item.id);
       for(const step of item.steps)assert.equal(step.math?.fallback,step.eq,'Full accessible KaTeX fallbacks: '+item.id);
       assert.equal(item.releaseStatus,'english-preview');
       assert(!item.q.ta,'Do not invent Grade 9 Tamil questions');
     }
   }else{
     const trace=traceSourceGate.records.find(r=>r.id===item.id);
     if(trace){
       assert.equal(hash,trace.recordSha256,'Immutable Grade 10 Chapter 2 source record '+item.id);
       assert.equal(item.q.en,trace.question,'Textbook question wording frozen '+item.id);
       assert.equal(item.answer,trace.answer,'Authored answer frozen '+item.id);
       assert.equal(item.edition,'2025','TRACE source edition '+item.id);
       assert.equal(item.translationReview,'pending','Do not invent Tamil teacher approval '+item.id);
     }else{
       const approved=approvedBatch.records.find(r=>r.id===item.id)||recoveredBatch.records.find(r=>r.id===item.id)||statisticsBatch.records.find(r=>r.id===item.id)||statisticsFollowup.records.find(r=>r.id===item.id)||modularRecords.find(r=>r.id===item.id)||sequenceRecords.find(r=>r.id===item.id)||ex25Records.find(r=>r.id===item.id)||ex26Records.find(r=>r.id===item.id)||ex27Records.find(r=>r.id===item.id)||ex28Records.find(r=>r.id===item.id)||ex29Records.find(r=>r.id===item.id)||ex210UnitRecords.find(r=>r.id===item.id)||ex31Records.find(r=>r.id===item.id)||ex32Records.find(r=>r.id===item.id)||ex33Records.find(r=>r.id===item.id)||ex34Records.find(r=>r.id===item.id)||ex35Records.find(r=>r.id===item.id)||ex36Records.find(r=>r.id===item.id)||ex37Records.find(r=>r.id===item.id)||ex38Records.find(r=>r.id===item.id)||ex39Records.find(r=>r.id===item.id)||ex310Records.find(r=>r.id===item.id)||ex311Records.find(r=>r.id===item.id)||ex312Records.find(r=>r.id===item.id)||ex313Records.find(r=>r.id===item.id)||ex314Records.find(r=>r.id===item.id);
       assert.equal(hash,crypto.createHash('sha256').update(JSON.stringify(approved)).digest('hex'),'New content exactly matches source-verified batch '+item.id);
     }
   }
  }
  const meta=registry.get(item);assert.ok(meta,'Explicit difficulty '+item.id);
  assert.ok(['easy','medium','difficult'].includes(meta.level));assert.ok(meta.basis&&meta.review);
  assert.equal(meta.grade,item.classNum);assert.ok(item.steps.length&&item.answer);
  if(grade==='12'){
   const prior=old.window.TriggleG12Catalog.entries[item.id];
   assert.equal(meta.level,prior.difficulty==='hard'?'difficult':prior.difficulty);
   assert.equal(JSON.stringify(meta.priorClassification),JSON.stringify(prior));reviewed++;
  }
  if(item.difficulty==='hard'){assert.equal(meta.level,'difficult');reviewed++;}
  count++;
 }
}
const classic=read('class9-classic.html');
const classicRecords=JSON.parse(classic.match(/const SOLUTIONS=(\[[^\n]+\]);/)[1]);
assert.equal(classicRecords.length,44);
for(const record of classicRecords){
 const item=classes[9].items.find(i=>i.id==='c9-'+record.id);
 assert.ok(item&&registry.get(item),'Legacy bookmark has the canonical difficulty '+record.id);
 assert.equal(item.q.en,record.prompt,'Classic question matches canonical question');
 assert.equal(item.answer,record.final,'Classic final answer matches canonical answer');
}
assert.ok(classic.includes('id="classicDifficulty"')&&classic.includes('./data/problem-difficulty.js'));
assert.equal(count,933+geometryNewIds.length+geometryEx43NewIds.length+ch5Ex51NewIds.length+ch5Ex52NewIds.length+ch5Ex53NewIds.length+ch5Ex54NewIds.length+ch5Ex55NewIds.length+ch5UnitNewIds.length+ch6Ex61NewIds.length+ch6Ex62NewIds.length+ch6Ex63NewIds.length+ch6Ex64NewIds.length+ch6Ex65NewIds.length+ch6UnitNewIds.length);assert.equal(reviewed,88);assert.equal(Object.keys(registry.entries).length,count);
assert.equal(registry.get({id:'unavailable',classNum:12}),null);
assert.equal(registry.get({id:classes[12].items[0].id,classNum:11}),null);
assert.ok(registry.solutionReviews['g12-ch1-ex1.1-q8'],'Flag cofactor completeness for review');
const app=read('assets/app.js'),sw=read('service-worker.js');
assert.doesNotMatch(html+app,/g12ModeChooser|TriggleG12Explain|tabGuided|solutionModeRow|guidedDialog|role="tab(?:list|panel)?"/);
for(const file of ['g12-explain-modes.js','g12-explain-modes.css','matrix-pilot.js','deep-lessons.js','deep-experience.js','guided-lessons.js','real-numbers-deep.js']){
 assert.ok(!fs.existsSync('site/assets/'+file),'Remove orphaned '+file);
 assert.ok(!sw.includes('./assets/'+file),'Do not cache retired '+file);
}
assert.ok(sw.includes('./data/problem-difficulty.js'));
assert.ok(html.indexOf('data/problem-difficulty.js')<html.indexOf('assets/app.js'));
assert.doesNotMatch(app,/localStorage\.clear|removeItem/,'Student progress is never cleared');
console.log('PASS original ID order, preserved records and source-audited additions, '+count+' explicit difficulties, '+reviewed+' retained classifications, single solutions and offline metadata.');
