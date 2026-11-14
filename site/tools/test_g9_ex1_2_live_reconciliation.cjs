'use strict';
// TRACE release blocker: source-audited 34-part candidate overlaps 9 live
// Grade 9 Exercise 1.2 parts. Never register all 34 without reconciling IDs.
const assert=require('node:assert/strict');
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const root=path.resolve(__dirname,'../..');
const read=p=>fs.readFileSync(path.join(root,p),'utf8');
const candidate=JSON.parse(read('docs/curriculum/grade-9/candidates/g9-ch1-ex1-2-english-34.json'));
const html=read('site/index.html');
const files=[
 'site/data/textbook-exercises/g9-ch1-ex1-2-q1-en.js',
 'site/data/textbook-exercises/g9-ch1-ex1-2-q2-en.js'
];
for(const file of files)assert(html.includes(path.basename(file)),'Existing released module must be registered: '+file);
const ctx={window:{
 TRIGGLE_CLASSES:{9:{items:[]}},
 TRIGGLE_CURRICULUM:{grades:[{grade:9,chapters:[{number:1,textbookQuestionIds:[]}]}]}
}};
for(const file of files)vm.runInNewContext(read(file),ctx,{filename:file,timeout:5000});
const live=ctx.window.TRIGGLE_CLASSES[9].items;
const candidateIds=new Set(candidate.rows.map(row=>row.id));
const liveIds=new Set(live.map(row=>row.id));
assert.equal(candidate.rows.length,34,'2025 source inventory must remain 34 parts');
assert.equal(candidateIds.size,34,'No duplicate source candidate IDs');
assert.equal(live.length,9,'Expected Q1 (5) and Q2 (4) registered English preview parts');
assert.equal(liveIds.size,9,'No duplicate registered IDs');
const overlap=live.filter(row=>candidateIds.has(row.id));
assert.equal(overlap.length,9,'All 9 Q1/Q2 parts overlap candidate archive');
assert(overlap.every(row=>row.releaseStatus==='english-preview'),'Existing English preview status preserved');
assert(overlap.every(row=>row.translationReview==='pending'),'Tamil approval must not be inferred');
const remaining=candidate.rows.filter(row=>!liveIds.has(row.id));
assert.equal(remaining.length,25,'Only 25 parts remain unregistered from Exercise 1.2');
assert.deepEqual([...new Set(remaining.map(x=>Number(x.question)))],[3,4,5,6,7,8,9,10]);
for(const row of overlap){
 const source=candidate.rows.find(x=>x.id===row.id);
 assert(source&&source.sourceEnglish&&row.q.en.includes(source.sourceEnglish),
   'Already-registered English text differs from source candidate: '+row.id);
 assert.equal(row.answer,source.answer,'Already-registered final answer differs: '+row.id);
}
// Fail loudly if somebody tries to register the full candidate module on top of Q1/Q2.
const full=read('site/data/textbook-exercises/g9-ch1-ex1-2-en.js');
assert(!html.includes('g9-ch1-ex1-2-en.js'),'Full 34-part archive must remain isolated');
assert.throws(()=>vm.runInNewContext(full,ctx,{filename:'g9-ch1-ex1-2-en.js',timeout:5000}),
 /Duplicate Grade 9 textbook ID/,'Bulk release must reject duplicate IDs');
console.log('PASS TRACE G9 Ex1.2: 34 source parts, 9 registered English previews, 25 remaining, 9 ID collisions blocked; no Tamil/teacher approval claimed.');
