'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm'),crypto=require('node:crypto');
const read=p=>fs.readFileSync('site/'+p,'utf8'),html=read('index.html'),ctx={window:{}};
for(const m of html.matchAll(/<script src="\.\/(data\/[^?\"]+)[^\"]*"/g))vm.runInNewContext(read(m[1]),ctx,{filename:m[1]});
const {TRIGGLE_CLASSES:classes,TriggleDifficulty:registry}=ctx.window;
const preserved=require('../../docs/standard-solution-preservation.json');
const auditedG9Proofs=require('../../docs/audit/AUD13_02_CORRECTION_HASHES.json');
const auditedG9TrigTable=require('../../docs/audit/AUD14_02_FOUR_FIGURE_TABLE_EVIDENCE.json');
const auditedG9TrigQ46=require('../../docs/audit/AUD14_02_Q4_Q6_TABLE_EVIDENCE.json');
const auditedG9SourceChoices=require('../../docs/audit/AUD14_03_EX61_EX65_SOURCE_EVIDENCE.json');
const g9BilingualGeometry=require('../data/textbook-fidelity/g9-ch4-bilingual-20261124.json');
const expectedGeometryIds=[
  '4.1-q2','4.1-q4','4.2-q1','4.2-q2','4.2-q3','4.2-q4',
  '4.2-q6','4.3-q1','4.3-q2','4.3-q4','4.3-q6'
].map(suffix=>'g9-ch4-ex'+suffix);
assert.deepEqual(Object.keys(g9BilingualGeometry.records),expectedGeometryIds);
assert.equal(auditedG9SourceChoices.auditId,'AUD14-03');
assert.equal(Object.keys(auditedG9SourceChoices.records).length,9);
assert.equal(auditedG9TrigQ46.auditId,'AUD14-02-Q4-Q6');
assert.deepEqual(Object.keys(auditedG9TrigQ46.records).sort(),['q4','q5','q6'].map(x=>'c9-exercise-6-4-'+x));
assert.equal(auditedG9TrigTable.auditId,'AUD14-02');
assert.deepEqual(Object.keys(auditedG9TrigTable.records).sort(),['i','ii','iii','iv','v','vi'].map(n=>'c9-exercise-6-4-q1-'+n).sort());
assert.equal(auditedG9Proofs.auditId,'AUD13-02');
assert.deepEqual(Object.keys(auditedG9Proofs.records).sort(),['g9-ch5-ex5.2-q2','g9-ch5-ex5.2-q5','g9-ch5-ex5.2-q6']);
const m04Batch=require('../../docs/curriculum/grade-10/batches/g10-ch2-ex2-1.json');
const m04ById=new Map(m04Batch.records.map(record=>[record.id,record]));
assert.equal(m04ById.size,10,'Exactly 10 independently reviewed Mission M04 records');
// Frozen English-only projections from the original immutable 2025-pilot baseline.
// Reviewers may add source-verified Tamil fields but must not rewrite English content.
const m04EnglishFingerprints={
  "c10-2-ex2-1-q1": "78da6f889b0fad9de22194b0ec45dd3cc239b2c0b2838d8fc79450fc82ed20d8",
  "c10-2-ex2-1-q2": "6215b1b7834ca05fcd40681372e65e1da4adb00c197416c47a10710815564eaa",
  "c10-2-ex2-1-q3": "e16dcb579c7f42413d0f3fabd93dcfcc1a9d35caa85fd4686457b71e5a4f3ac4",
  "c10-2-ex2-1-q4": "0728f6834e826ea20372acd94f9e7ae0780cabbfafda78140471b886741d6cbe",
  "c10-2-ex2-1-q5": "b6aa438449e2dd254a81a1783ed0253e774311bbf13072057a596e4eceba063c",
  "c10-2-ex2-1-q6": "a699b7f76caadb48f164d9aabfb46d28d77f148fbca08a6fd5c97c18fa4e69dc",
  "c10-2-ex2-1-q7": "c728874001eb9e910c0358d4246fccdd1c0ec8e6862a2ef05810e33a13b92990",
  "c10-2-ex2-1-q8": "c0fd2121834656ddf53f9fc4a6d27ed2036ba3415f184b86aead82e322b39567",
  "c10-2-ex2-1-q9": "8d75bc5353fbebeb86789bb568215759200fa827e240ce9439344844c13c5075",
  "c10-2-ex2-1-q10": "6e357e7d5f35eafbd682ca20e0e35eecc1461363b65903816c92a34dc68cfd44"
};
const m04EnglishProjection=record=>({id:record.id,classNum:record.classNum,chapter:record.chapter,exercise:record.exercise,topic:record.topic?.en,label:record.label?.en,title:record.title?.en,q:record.q?.en,steps:record.steps?.map(step=>({en:step.en,eq:step.eq})),answer:record.answer});
const approvedBatch=require('../../docs/curriculum/grade-10/batches/g10-ch2-ex2-2.json');
const approvedEx22=['1','2','3','4','5','6','7','8','9'].map(n=>'c10-2-ex2-2-q'+n);
const recoveredBatch=require('../../docs/curriculum/grade-10/g10-seven-recovery-20261113.json');
const recoveryIds=recoveredBatch.records.map(r=>r.id);
const statisticsBatch=require('../../docs/curriculum/grade-10/g10-ch8-ex8-1-q5-q10-20261113.json');
const statisticsIds=statisticsBatch.records.map(r=>r.id);
const statisticsEx82Batch=require('../../docs/curriculum/grade-10/g10-ch8-ex8-2-q1-q3-20261121.json');
const statisticsEx82FollowupBatch=require('../../docs/curriculum/grade-10/g10-ch8-ex8-2-q4-q8-20261121.json');
assert.equal(statisticsEx82FollowupBatch.records.length,5,'Exactly five source-verified Ex8.2 Q4-Q8 additions');
const statisticsEx82Ids=[...statisticsEx82Batch.records,...statisticsEx82FollowupBatch.records].map(r=>r.id);
assert.deepEqual(statisticsEx82Ids,Array.from({length:8},(_,i)=>'c10-8-ex8-2-q'+(i+1)),'All eight source-indexed Grade 10 Ex8.2 IDs');
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
const ex315Context={window:{TRIGGLE_CLASSES:{10:{items:[]}},TRIGGLE_CURRICULUM:{grades:[{grade:10,chapters:[{number:3,textbookQuestionIds:[]}]}]}}};
vm.runInNewContext(read('data/textbook-exercises/g10-ch3-ex3-15-complete.js'),ex315Context,{filename:'g10-ch3-ex3-15-complete.js'});
const ex315Records=ex315Context.window.TRIGGLE_CLASSES[10].items;
const ex315Ids=ex315Records.map(r=>r.id);
assert.equal(ex315Records.length,12,'Twelve source-reviewed Exercise 3.15 parts');
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
const ch7PilotPassports=require('../../docs/curriculum/grade-10/g10-ch7-ex7-1-pilot-passports-20261122.json');
const ch7PilotById=new Map(ch7PilotPassports.records.map(record=>[record.id,record]));
const ch7PilotIds=ch7PilotPassports.records.map(record=>record.id);
assert.equal(ch7PilotIds.length,5,'Five source-passport-indexed Chapter 7 pilot records');
assert.equal(ch7PilotPassports.source.pageImagesVerified,true,'Require documented 2025 source page-image verification');
assert.equal(ch7PilotPassports.source.english.answerAppendix.pdfPage,347,'English source answer page evidence');
assert.equal(ch7PilotPassports.source.tamil.answerAppendix.pdfPage,362,'Tamil source answer page evidence');
assert.equal(ch7PilotPassports.independentMathAudit.q1to5MathPassed,true,'Frozen Neon blind mathematical verification');
assert.equal(ch7PilotPassports.independentMathAudit.sourcePageImagesNotInspectedByNeon,true,'Do not retroactively attribute page inspection to Neon');
assert.equal(ch7PilotPassports.source.tamilWorkedSolutionsApproved,false,'Tamil lesson review remains pending');
const ch7BPassports=require('../../docs/curriculum/grade-10/g10-ch7-ex7-1-q6-q10-passports-20261122.json');
const ch7BById=new Map(ch7BPassports.records.map(record=>[record.id,record]));
const ch7BIds=ch7BPassports.records.map(record=>record.id);
assert.deepEqual(ch7BIds,[6,7,8,9,10].map(n=>'c10-7-ex7-1-q'+n),'Five source-indexed Q6-Q10 records');
assert.equal(ch7BPassports.source.questionPageImagesInspected,true,'Q6-Q10 official source page-images reviewed');
assert.equal(ch7BPassports.source.q10FigureInspected,true,'Frustum diagram dimensions verified from original image');
assert.equal(ch7BPassports.source.independentBlindAuditCompleted,true,'Require independently frozen Neon Phase 1 source/maths verification');
assert.equal(ch7BPassports.independentAudit.phase1.status,'PASS');
assert.equal(ch7BPassports.independentAudit.phase1.sourceUnblockAddendum.sha256,'54c1ffb7b66d0d721c5885953564c41de2002c010b6ce13a232c3553f6924745');
assert.equal(ch7BPassports.independentAudit.phase2.status,'CONDITIONAL_GO_REMEDIATION_IN_PROGRESS','Do not claim release-ready from conditional Phase 2 audit');
assert.equal(ch7BPassports.independentAudit.phase2.reportSha256,'bd84ad87f1593d7ab4d1539710a89ba4876071005e760628df8b31c06b8c0079');
assert.equal(ch7BPassports.releaseGates.merged,false,'Do not claim publication while draft');
const ch7Ex72Inv=require('../../docs/trace/source-inventories/g10-ch7-ex7-2.json');
assert.equal(ch7Ex72Inv.questionParts,10,'Ten source-indexed Ch7 Ex7.2 parts');
const ch7Ex72Ids=ch7Ex72Inv.questions.map(q=>'c10-7-ex7-2-q'+q.question);
const ch7Ex73Inv=require('../../docs/trace/source-inventories/g10-ch7-ex7-3.json');
assert.equal(ch7Ex73Inv.questionParts,9,'Nine source-indexed Ch7 Ex7.3 parts');
const ch7Ex73Ids=ch7Ex73Inv.questions.flatMap(q=>q.parts.length===1&&q.parts[0]==='whole'?['c10-7-ex7-3-q'+q.question]:q.parts.map(p=>'c10-7-ex7-3-q'+q.question+'-'+p));
const ch8Ex83Inv=require('../../docs/trace/source-inventories/g10-ch8-ex8-3.json');
assert.equal(ch8Ex83Inv.questionParts,29,'Twenty-nine source-indexed Ch8 Ex8.3 parts');
const ch8Ex83Context={window:{TRIGGLE_CLASSES:{10:{items:[]}},TRIGGLE_CURRICULUM:{grades:[{grade:10,chapters:[{number:8,textbookQuestionIds:[]}]}]}}};
vm.runInNewContext(read('data/textbook-exercises/g10-ch8-ex8-3-q1-q6.js'),ch8Ex83Context,{filename:'g10-ch8-ex8-3-q1-q6.js'});
vm.runInNewContext(read('data/textbook-exercises/g10-ch8-ex8-3-q7-q13.js'),ch8Ex83Context,{filename:'g10-ch8-ex8-3-q7-q13.js'});
const ch8Ex83Records=ch8Ex83Context.window.TRIGGLE_CLASSES[10].items;
const ch8Ex83Ids=ch8Ex83Inv.questions.flatMap(q=>q.parts.length===1&&q.parts[0]==='whole'?['c10-8-ex8-3-q'+q.question]:q.parts.map(p=>'c10-8-ex8-3-q'+q.question+'-'+p));
const approvedNewIds=[...approvedEx22,...traceIds,...modularIds,...sequenceIds,...ex25Ids,...ex26Ids,...ex27Ids,...ex28Ids,...ex29Ids,...recoveryIds,...statisticsIds,...followupIds,...statisticsEx82Ids,...ch8Ex83Ids,...ex210UnitIds,...ex31Ids,...ex32Ids,...ex33Ids,...ex34Ids,...ex35Ids,...ex36Ids,...ex37Ids,...ex38Ids,...ex39Ids,...ex310Ids,...ex311Ids,...ex312Ids,...ex313Ids,...ex314Ids,...ex315Ids,...geometryNewIds,...geometryEx43NewIds,...ch5Ex51NewIds,...ch5Ex52NewIds,...ch5Ex53NewIds,...ch5Ex54NewIds,...ch5Ex55NewIds,...ch5UnitNewIds,...ch6Ex61NewIds,...ch6Ex62NewIds,...ch6Ex63NewIds,...ch6Ex64NewIds,...ch6Ex65NewIds,...ch6UnitNewIds,...ch7PilotIds,...ch7BIds,...ch7Ex72Ids,...ch7Ex73Ids];
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
const g9Ex64Release=require('../../docs/audit/AUD14_02_EX64_Q2_Q3_RELEASE_EVIDENCE.json');
const g9Ex64NewIds=Object.keys(g9Ex64Release.records);
const g9Ch3CompleteNewIds=classes[9].items.filter(it=>/^g9-ch3-ex3\.(?:[3-9]|1[0-5])\b/.test(it.id)).map(it=>it.id);
assert.equal(g9Ch3CompleteNewIds.length,170,'170 new G9 Ch3 Ex 3.3–3.15 records');
const g9Ch5CompleteNewIds=classes[9].items.filter(it=>/^g9-ch5-ex5\.[1-6]\b/.test(it.id)&&!Object.hasOwn(preserved.sha256,it.id)).map(it=>it.id);
assert.equal(g9Ch5CompleteNewIds.length,50,'50 new G9 Ch5 Ex 5.1–5.6 records');
const approvedG9Ids=[...g9AlgebraRows.map(p=>p.id),...g9Fidelity.partIds,...g9Q2Fidelity.parts.map(p=>p.id),...g9Q5Q6Fidelity.parts.map(p=>p.id),...g9Batch1Fidelity.parts.map(p=>p.id),...g9Q7Q10Fidelity.parts.map(p=>p.id),...g9Ex32NewIds,...g9Ch3CompleteNewIds,...g9Ex64NewIds,...g9Ch5CompleteNewIds];
assert.equal(approvedG9Ids.length,311);
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
  }else if(grade==='10'&&ch7PilotById.has(item.id)){
   const passport=ch7PilotById.get(item.id);
   assert.equal(item.q.en,passport.englishQuestion,'Chapter 7 question matches archived English source text '+item.id);
   assert.equal(item.edition,'2025');
   assert.equal(item.translationReview,'pending');
   assert.equal(item.sourceFidelity?.status,'page-visual-checked');
   assert(!item.q.ta,'Do not invent unreviewed Tamil teaching copy '+item.id);
  }else if(grade==='10'&&ch7BById.has(item.id)){
   const passport=ch7BById.get(item.id);
   assert.equal(item.q.en,passport.englishQuestion,'G10 2025 Mensuration 7.1 Q6-Q10 English source fidelity '+item.id);
   assert.equal(item.edition,'2025');
   assert.equal(item.translationReview,'pending');
   assert.equal(item.sourceFidelity?.status,'page-visual-checked');
   assert(!item.q.ta,'Do not manufacture unreviewed Tamil authored teaching copy '+item.id);
  }else if(grade==='10'&&(ch7Ex72Ids.includes(item.id)||ch7Ex73Ids.includes(item.id))){
   assert.equal(item.edition,'2025');
   assert.equal(item.sourceFidelity?.status,'page-visual-checked');
   assert.equal(item.translationReview,'2025-tamil-pdf-checked-teacher-review-pending');
   assert.ok(item.q?.en&&item.q?.ta,'Bilingual 2025 source question '+item.id);
   assert.ok(item.answer&&item.answerTa,'Bilingual answer '+item.id);
  }else if(grade==='9'&&g9Ex64Release.records[item.id]){
   const proof=g9Ex64Release.records[item.id];
   const english=JSON.parse(JSON.stringify(item));
   delete english.topic.ta;
   delete english.title.ta;
   delete english.answerTa;
   delete english.answerMath;
   delete english.q.ta;
   english.label.ta=english.label.en+' (English only · Tamil review pending)';
   for(const step of english.steps){ delete step.ta; delete step.mathTa; }
   for(const key of ['taPdfPage','taPrintedPage','taDriveId','taPromptEvidence']) delete english.sourceFidelity[key];
   assert.equal(crypto.createHash('sha256').update(JSON.stringify(english)).digest('hex'),proof.sha256,'Source-pinned four-figure-table release '+item.id);
   assert.equal(item.answer,proof.expectedFinalAnswer,'Official textbook table answer '+item.id);
   assert(item.q.en.includes(proof.sourcePart),'2025 source prompt '+item.id);
   assert.equal(item.translationReview,'pending');
   assert.equal(item.releaseStatus,'english-preview');
   assert.match(item.q.ta,/[\u0B80-\u0BFF]/u);
   assert(item.steps.every(step=>step.ta));
  }else if(grade==='9'&&g9Ex32ById.has(item.id)){
   const approved=g9Ex32ById.get(item.id);
   assert.equal(crypto.createHash('sha256').update(JSON.stringify(m04EnglishProjection(item))).digest('hex'),
     crypto.createHash('sha256').update(JSON.stringify(m04EnglishProjection(approved))).digest('hex'),
     'Exercise 3.2 English content matches source-audited batch '+item.id);
   assert.ok(item.q?.ta&&item.steps.every(s=>s.ta),'Exercise 3.2 has verified 2025 Tamil '+item.id);
  }else if(grade==='10'&&m04ById.has(item.id)){
    // Approved bilingual extension of the existing immutable Exercise 2.1 source.
    // Original English question, title, working and answer remain pinned independently.
    const approved=m04ById.get(item.id);
    const evidence=m04Batch.mapping.find(row=>row.recordId===item.id);
    assert(Object.hasOwn(preserved.sha256,item.id),'M04 extension must refer to an original preserved ID '+item.id);
    assert(evidence&&evidence.visualChecked?.en===true&&evidence.visualChecked?.ta===true,'EN/TA page-image source evidence '+item.id);
    assert.equal(item.q.en,evidence.sourceText.en,'Immutable 2025 English textbook question '+item.id);
    assert.equal(item.q.ta,evidence.sourceText.ta,'Verified Tamil textbook question '+item.id);
    const englishDigest=crypto.createHash('sha256').update(JSON.stringify(m04EnglishProjection(item))).digest('hex');
    assert.equal(englishDigest,m04EnglishFingerprints[item.id],'M04 original English content preservation '+item.id);
    assert.equal(hash,crypto.createHash('sha256').update(JSON.stringify(approved)).digest('hex'),'Exact independently checked M04 bilingual record '+item.id);
    assert.equal(item.translationReview,'pending','Do not claim Tamil editorial signoff '+item.id);
    assert.equal(item.tamilWorkedSolutionReview,'pending','Do not claim Tamil solution signoff '+item.id);
  }else if(Object.hasOwn(preserved.sha256,item.id)){
   const correction=auditedG9Proofs.records[item.id];
   const trig=auditedG9TrigTable.records[item.id];
   const extended=auditedG9TrigQ46.records[item.id];
   const originalChoices=auditedG9SourceChoices.records[item.id];
   const bilingualGeometry=g9BilingualGeometry.records[item.id];
   assert.ok([trig,correction,extended,originalChoices,bilingualGeometry].filter(Boolean).length<=1,'Overlapping immutable-source exceptions '+item.id);
   const algebra=require('../data/textbook-fidelity/g9-ch3-ex3-1-q10-q12-bilingual.json').records[item.id];
   if(grade==='9' && /^g9-ch(?:7-ex7\.[1-4]|8-ex8\.[1-4]|9-ex9\.[1-3])-q\d+$/.test(item.id)){
    const original=JSON.parse(JSON.stringify(item));
    original.q.ta='English-language question; Tamil version pending. '+item.q.en;
    for(const step of original.steps){
     if(step.reasonMath){
      step.reasonMath.ta=[...step.reasonMath.en];
      step.reasonMath.ta[0]='English explanation (Tamil version pending): '+step.reasonMath.ta[0];
     }
    }
    original.topic.ta=item.topic.en+' (English version only)';
    original.label.ta=item.label.en+' (English only)';
    original.title.ta=item.title.en+' (English only)';
    for(const step of original.steps){step.ta='English explanation (Tamil version pending): '+step.en;delete step.mathTa;}
    if(item.id==='g9-ch9-ex9.2-q5'){delete original.dataTable.ta;delete original.dataTable.replaceRegexTa;}
    if(item.exercise==='7.3'){
     original.sourceFidelity.taPdfPage=294;
     delete original.sourceFidelity.taDriveId;
    }else if(item.exercise==='9.2' || item.exercise==='9.3'){
     const qNum=Number(item.id.split('-q')[1]);
     const page=item.exercise==='9.3' ? (qNum<=7 ? 335 : 336) : [334,334,334,335,325][qNum-1];
     original.sourceFidelity.taPdfPage=page;
     original.sourceFidelity.taPrintedPage=page-(item.id==='g9-ch9-ex9.2-q5' ? 6 : 16);
     delete original.sourceFidelity.taDriveId;
     if(item.id==='g9-ch9-ex9.2-q5') original.steps[3].ta="English explanation (Tamil version pending): If part-time maids includes families who also employ full-time maids, add 860 only-part-time and 250 both-types families. This is an alternative interpretation, not the printed answer key.";
    }else if(item.exercise==='9.1'){
     original.sourceFidelity.taPdfPage+=10;
     delete original.sourceFidelity.taDriveId;
    }else if(item.chapter==='8'){
     delete original.sourceFidelity.taDriveId;
    }else{
     for(const key of ['taPdfPage','taPrintedPage','taDriveId']) delete original.sourceFidelity[key];
    }
    delete original.answerTa;
    delete original.answerMath;
    assert.equal(crypto.createHash('sha256').update(JSON.stringify(original)).digest('hex'),preserved.sha256[item.id]);
    assert.match(item.q.ta,/[ஃ-௺]/u);
    assert(item.steps.every(step=>/[ஃ-௺]/u.test(step.ta)));
   }else if(algebra){
    const original={...item,...algebra.originalFields,steps:item.steps.map((step,i)=>({...step,ta:algebra.originalTamilReasons[i]}))};
    assert.equal(crypto.createHash('sha256').update(JSON.stringify(original)).digest('hex'),preserved.sha256[item.id]);
    assert.equal(item.q.en,algebra.originalFields.q.en);
    assert.equal(item.q.ta,algebra.prompt.ta);
    assert.deepEqual(item.steps.map(step=>step.ta).join('\n'),algebra.reasons.join('\n'));
   }else if(bilingualGeometry){
    assert.equal(grade,'9');
    assert.equal(bilingualGeometry.originalRecordSha256,preserved.sha256[item.id],'Original geometry baseline '+item.id);
    const englishDigest=crypto.createHash('sha256').update(JSON.stringify(m04EnglishProjection(item))).digest('hex');
    assert.equal(englishDigest,bilingualGeometry.originalEnglishAndEquationsSha256,'Original English content and every shared equation '+item.id);
    assert.equal(item.q.en,bilingualGeometry.prompt.en,'Source-checked English prompt '+item.id);
    assert.equal(item.q.ta,bilingualGeometry.prompt.ta,'Source-checked Tamil prompt '+item.id);
    assert.equal(hash,bilingualGeometry.reviewedRecordSha256,'Exact bilingual geometry record and source metadata '+item.id);
   }else if(originalChoices){
    assert.equal(originalChoices.originalRecordSha256,preserved.sha256[item.id],'Pre-existing immutable source hash '+item.id);
    assert.equal(item.answer,originalChoices.originalFinalAnswer,'Original math answer unchanged '+item.id);
    assert.equal(item.steps.length,originalChoices.originalSteps,'Original worked step count unchanged '+item.id);
    assert.equal(JSON.stringify(item.steps),JSON.stringify(originalChoices.originalRecord.steps),'Worked solutions byte-for-byte preserved '+item.id);
    assert.equal(item.q.en,originalChoices.correctedRecord.q.en,'2025 textbook source question '+item.id);
    assert.equal(item.q.ta,originalChoices.correctedRecord.q.ta,'Bilingual question accessibility '+item.id);
    assert.equal(hash,originalChoices.correctedRecordSha256,'Exact approved source question and choice correction '+item.id);
   }else if(extended){
    assert.equal(extended.originalRecordSha256,preserved.sha256[item.id],'Immutable Q4–Q6 source baseline '+item.id);
    assert.equal(item.q.en,extended.unchangedEnglishQuestion,'Preserve Ex6.4 question '+item.id);
    assert.equal(item.q.ta,extended.unchangedTamilQuestion,'Preserve Ex6.4 Tamil question '+item.id);
    assert.equal(item.answer,extended.unchangedFinalAnswer,'Preserve official 2025 final answer '+item.id);
    assert.equal(item.kind,'reference','Textbook exercise classification preserved '+item.id);
    assert.equal(item.steps.length,extended.originalRecord.steps.length,'Original teaching-step count retained '+item.id);
    assert.equal(item.source,auditedG9TrigQ46.source.english2025,'Required 2025 primary edition provenance '+item.id);
    assert.equal(hash,extended.correctedRecordSha256,'Exact source-audited Q4–Q6 solution hash '+item.id);
   }else if(trig){
    // Preserve the original 568-record baseline; only the six source-verified
    // Grade 9 four-figure-table teaching records may take corrected hashes.
    assert.equal(trig.originalRecordSha256,preserved.sha256[item.id],'Immutable table source baseline '+item.id);
    assert.equal(item.q.en,trig.unchangedEnglishQuestion,'Original English question retained '+item.id);
    assert.equal(item.q.ta,trig.unchangedTamilQuestion,'Original Tamil question retained '+item.id);
    assert.equal(item.kind,'reference','Exercise item type unchanged '+item.id);
    assert.equal(item.steps.length,3,'Exactly three Grade 9 table-teaching steps '+item.id);
    assert.equal(item.answer,trig.correctedFinalAnswer,'Source-key table answer '+item.id);
    assert.equal(item.source,auditedG9TrigTable.source.english2025,'Prescribed 2025 SCERT book '+item.id);
    assert.equal(hash,trig.correctedRecordSha256,'Exact audited table-method record '+item.id);
   }else if(correction){
    // Scoped math-only exception: NEVER rewrite the 568-entry preservation baseline.
    assert.equal(correction.originalRecordSha256,preserved.sha256[item.id],'Immutable source baseline for '+item.id);
    assert.equal(item.q.en,correction.unchangedEnglishQuestion,'Original textbook prompt preserved '+item.id);
    assert.equal(item.q.ta,correction.unchangedTamilFallback,'Original Tamil fallback preserved '+item.id);
    assert.equal(item.answer,correction.unchangedFinalAnswer,'Original final answer preserved '+item.id);
    assert.equal(hash,correction.correctedRecordSha256,'Exact independently checked proof amendment '+item.id);
   }else{
    assert.equal(hash,preserved.sha256[item.id],'Entire original question, mathematical working, notation, answer and metadata: '+item.id);
   }
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
       assert.equal(item.releaseStatus,'bilingual-2025-source-checked');
       assert.equal(item.translationReview,'2025-tamil-pdf-checked-teacher-review-pending');
       assert.ok(item.q.ta&&item.steps.every(s=>s.ta),'Verified 2025 Tamil for Algebra '+item.id);
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
       assert(item.q.ta&&item.steps.every(step=>step.ta),'Tamil Exercise 1.2 prompt and explanations '+item.id);
     }else if(g9Ch3CompleteNewIds.includes(item.id)||g9Ch5CompleteNewIds.includes(item.id)){
       assert.ok(item.q?.en&&item.q?.ta,'G9 bilingual prompt '+item.id);
       assert.ok(item.steps.length>=1&&item.steps.every(s=>s.en&&s.ta&&s.math?.latex),'G9 bilingual steps '+item.id);
       assert.equal(item.releaseStatus,'bilingual-2025-source-checked');
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
       assert(item.q.ta&&item.steps.every(step=>step.ta),'Tamil Exercise 1.2 prompt and explanations '+item.id);
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
       const approved=approvedBatch.records.find(r=>r.id===item.id)||recoveredBatch.records.find(r=>r.id===item.id)||statisticsBatch.records.find(r=>r.id===item.id)||statisticsFollowup.records.find(r=>r.id===item.id)||statisticsEx82Batch.records.find(r=>r.id===item.id)||statisticsEx82FollowupBatch.records.find(r=>r.id===item.id)||ch8Ex83Records.find(r=>r.id===item.id)||modularRecords.find(r=>r.id===item.id)||sequenceRecords.find(r=>r.id===item.id)||ex25Records.find(r=>r.id===item.id)||ex26Records.find(r=>r.id===item.id)||ex27Records.find(r=>r.id===item.id)||ex28Records.find(r=>r.id===item.id)||ex29Records.find(r=>r.id===item.id)||ex210UnitRecords.find(r=>r.id===item.id)||ex31Records.find(r=>r.id===item.id)||ex32Records.find(r=>r.id===item.id)||ex33Records.find(r=>r.id===item.id)||ex34Records.find(r=>r.id===item.id)||ex35Records.find(r=>r.id===item.id)||ex36Records.find(r=>r.id===item.id)||ex37Records.find(r=>r.id===item.id)||ex38Records.find(r=>r.id===item.id)||ex39Records.find(r=>r.id===item.id)||ex310Records.find(r=>r.id===item.id)||ex311Records.find(r=>r.id===item.id)||ex312Records.find(r=>r.id===item.id)||ex313Records.find(r=>r.id===item.id)||ex314Records.find(r=>r.id===item.id)||ex315Records.find(r=>r.id===item.id);
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
const approvedCount=Object.entries(preserved.grades).reduce((sum,[grade,originalIds])=>sum+originalIds.length+(grade==='10'?approvedNewIds.length:grade==='9'?approvedG9Ids.length:0),0);
assert.equal(count,approvedCount,'Every source-preserved or explicitly approved question has one difficulty record');assert.equal(reviewed,88);assert.equal(Object.keys(registry.entries).length,count);
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
