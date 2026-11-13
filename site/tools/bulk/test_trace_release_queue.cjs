'use strict';
const assert=require('node:assert/strict');
const {locate,extract,shape,classify,validate}=require('./trace_release_queue.cjs');
const bulk=require('../curriculum_bulk.cjs');
const queue=require('../../../docs/trace/release-queue/queue.json');
let groups=0;const test=(name,fn)=>{fn();groups++;console.log('PASS release queue '+name);};
test('legacy aliases retain source part identity without changing app IDs',()=>{
 const wanted={grade:12,chapter:'1',exercise:'1.4',question:'1',part:'iv'};
 for(const id of ['g12-ch1-ex1.4-q1-iv','g12-c1-ex1.4-q1-iv','g12-ex1.4-q1-iv'])assert.deepEqual(locate(id),wanted);
 assert.equal(locate('example-1.4'),null);
});
test('nested drafts retain parent source and prose solutions remain distinct from runtime schema',()=>{
 const source={driveFileId:'original-book',pageImageVerified:false};
 const result=extract({grade:11,chapter:1,exercise:'1.1',source,items:[{id:'g11-ch1-ex1.1-q5',questionEnglish:'Claim to prove',stepsEnglish:['A counterexample'],answerEnglish:'False'}]});
 assert.equal(result.length,1);assert.deepEqual(result[0].sourceEvidence,source);
 assert.deepEqual(shape(result[0].record),{questionPresent:true,stepCount:1,answerPresent:true,structuredRuntime:false});
 const nested=extract({grade:12,chapter:1,exercise:'1.4',question:1,parts:[{part:'i',questionEnglish:'First system',stepsEnglish:['Solve'],answerEnglish:'1'},{part:'ii',questionEnglish:'Second system',stepsEnglish:['Solve'],answerEnglish:'2'}]});
 assert.deepEqual(nested.map(e=>e.location.part),['i','ii']);assert(nested.every(e=>e.location.question==='1'));
});
test('math and source success cannot silently grant human approval or source-only readiness',()=>{
 const none={origins:[{authored:{questionPresent:false,stepCount:0,answerPresent:false}}],exactRuntime:[]};
 assert.equal(classify({...none,mathPassed:true,sourceChecked:true}),'BLOCKED');
 const full={origins:[{authored:{questionPresent:true,stepCount:20,answerPresent:true}}],exactRuntime:[],mathPassed:true,sourceChecked:true,reviewHold:true};
 assert.equal(classify(full),'NEEDS_REVIEW');assert.equal(classify({...full,exactRuntime:['preserved-id']}),'DUPLICATE');
});
test('invented READY, language eligibility, duplicates and inflated counts fail closed',()=>{
 validate(queue);
 for(const mutate of [q=>{q.candidates[0].status='READY';},q=>{q.candidates[0].english.eligible=true;},q=>{q.candidates[0].tamil.eligible=true;},q=>{q.candidates[0].deployment.eligible=true;},q=>{const r=q.candidates.find(c=>!c.existingApp.exactRecordDuplicates.length);r.status='DUPLICATE';},q=>{q.counts.candidatesDiscovered++;},q=>{q.candidates.push(q.candidates[0]);}]){
  const bad=structuredClone(queue);mutate(bad);assert.throws(()=>validate(bad));
 }
});
test('eight record-bound validated candidates retain explicit teacher and Tamil holds',()=>{
 const batch=require('../../../docs/trace/candidates/g12-ex1-4/batch.json');
 const review=require('../../../docs/trace/candidates/g12-ex1-4/source-review-20261113.json');
 assert.equal(review.batchSha256,bulk.hashRecord(batch));
 const rows=queue.candidates.filter(c=>c.mathematicalValidation.status==='PASSED');assert.equal(rows.length,8);
 for(const r of rows){const record=batch.records.find(x=>x.id===r.origins.find(o=>o.kind==='COMPILER_CANDIDATE').appId);assert.equal(r.mathematicalValidation.recordSha256,bulk.hashRecord(record));assert.equal(r.status,'NEEDS_REVIEW');assert(r.english.blockingReasons.includes('TEACHER_REVIEW_OWNER_DEFERRED_EXPLICIT_EX1_4_RELEASE_HOLD'));assert.equal(r.tamil.eligible,false);}
 assert.equal(queue.counts.candidatesPromotedReady,0);assert.equal(queue.counts.exercisesIntegrated,0);
 assert.equal(queue.counts.exercisesLiveVerified,0);
});
test('eight source-equivalent record duplicates are current Ex2.2 records, not mere label matches',()=>{
 const runtime=bulk.loadRuntime(),items=Object.values(runtime.classes).flatMap(g=>g.items),dupes=queue.candidates.filter(c=>c.status==='DUPLICATE');assert.equal(dupes.length,8);
 for(const c of dupes)for(const id of c.existingApp.exactRecordDuplicates){const record=items.find(r=>r.id===id);assert(record);assert(c.origins.some(o=>o.recordSha256===bulk.hashRecord(record)));assert.equal(c.location.exercise,'2.2');}
 assert(queue.candidates.some(c=>c.existingApp.samePartIds.length&&!c.existingApp.exactRecordDuplicates.length&&c.status!=='DUPLICATE'));
 assert(queue.candidates.some(c=>c.origins.some(o=>o.kind==='MARKDOWN_SOLUTION_AUDIT'&&o.authored.narrativeWorking)));
});
console.log(`PASS ${groups} release queue regression groups; no student integration or review approval`);
