'use strict';
// Every allocation/result here is a labelled test fixture, including real-mode policy tests.
const assert=require('node:assert/strict'),p=require('./trace_pilot.cjs'),{hashRecord}=require('../curriculum_bulk.cjs');
let count=0;const test=(name,fn)=>{fn();count++;console.log('PASS TRACE pilot '+name);};
const reviewers=synthetic=>[{id:'FIXTURE_MATH',role:'math',available:true,synthetic},{id:'FIXTURE_LANGUAGE',role:'bilingual',available:true,synthetic}];
const synthetic=p.makePlan(p.syntheticPool(),{synthetic:true,reviewers:reviewers(true)});
const realFixture=()=>p.syntheticPool().map(i=>({...i,id:i.id.replace('SYNTHETIC','TEST_ONLY'),synthetic:false,dedupChecked:true,figureChecked:true,ledgerHash:hashRecord('fixture-ledger'),prSnapshotHash:hashRecord('fixture-prs'),sourceEvidence:['en','ta'].map(medium=>({medium,edition:'2025',visualChecked:true,printedPage:35,pdfPage:43,pdfHash:hashRecord('fixture-pdf'),imageHash:hashRecord('fixture-image')}))}));
test('seeded 30/30 stratification, stable assignment and input-order independence',()=>{
 assert.equal(synthetic.assignments.length,60);assert.equal(synthetic.assignments.filter(a=>a.arm==='trace').length,30);
 assert.deepEqual(p.makePlan(p.syntheticPool().reverse(),{synthetic:true,reviewers:reviewers(true)}).assignments,synthetic.assignments);
 assert.notDeepEqual(p.makePlan(p.syntheticPool(),{seed:2,synthetic:true,reviewers:reviewers(true)}).assignments,synthetic.assignments);
 assert.equal(new Set(synthetic.assignments.map(a=>a.crossMediumId)).size,60);
});
test('source claims, missing reviewers and fewer than 60 never start a real trial',()=>{
 const plain=p.syntheticPool().map(i=>({...i,synthetic:false}));assert.equal(p.makePlan(plain,{reviewers:reviewers(false)}).eligibleCount,0,'Booleans alone cannot establish source evidence');
 assert.equal(p.makePlan(realFixture().slice(0,59),{reviewers:reviewers(false)}).status,'BLOCKED');
 assert.equal(p.makePlan(realFixture()).status,'BLOCKED');
 const samePerson=reviewers(false).map(r=>({...r,id:'ONE_PERSON'}));assert.equal(p.makePlan(realFixture(),{reviewers:samePerson}).status,'BLOCKED');
 const worked=realFixture();worked[0].worked=true;assert.equal(p.makePlan(worked,{reviewers:reviewers(false)}).status,'BLOCKED');
 const diagram=realFixture();diagram.find(i=>i.diagram).figureChecked=false;assert.equal(p.makePlan(diagram,{reviewers:reviewers(false)}).status,'BLOCKED');
 assert.throws(()=>p.makePlan(p.syntheticPool(),{reviewers:reviewers(false)}),/SYNTHETIC_ITEMS_NOT_REAL/);
});
test('duplicates cannot inflate the 60-part denominator',()=>{
 const pool=p.syntheticPool();pool[1].crossMediumId=pool[0].crossMediumId;assert.throws(()=>p.makePlan(pool,{synthetic:true,reviewers:reviewers(true)}),/DUPLICATE_QUESTION_PART/);
});
test('synthetic speedups are never reported as actual pilot adoption',()=>{
 const results=p.syntheticResults(synthetic),e=p.evaluate(synthetic,results,{mandatoryTestsPassed:true});
 assert.equal(e.realPilotStatus,'NOT_STARTED');assert.equal(e.adoptionDecision,'NOT_EVALUATED_SYNTHETIC');assert.equal(e.syntheticDiagnosticWouldMeetThreshold,true);
 assert(e.medianEffortReduction>=.3);assert(e.bootstrap95ReductionInterval.length===2);assert.equal(e.arms.trace.zeroObservedSourceMathFaultUpper95,null);
});
const plan=p.makePlan(realFixture(),{reviewers:reviewers(false)});
test('real-mode threshold logic needs reviews, all results, tests and no new observed faults',()=>{
 const results=p.syntheticResults(plan);const e=p.evaluate(plan,results,{mandatoryTestsPassed:true});assert.equal(e.adoptionDecision,'MEETS_PREREGISTERED_THRESHOLD');
 assert.equal(p.evaluate(plan,results).adoptionDecision,'NOT_ADOPTED');
 assert.equal(p.evaluate(plan,results.slice(1),{mandatoryTestsPassed:true}).realPilotStatus,'INCOMPLETE');
 const bad=structuredClone(results);bad.find(r=>r.arm==='trace').defects.math=1;assert.equal(p.evaluate(plan,bad,{mandatoryTestsPassed:true}).adoptionDecision,'NOT_ADOPTED');
 const pending=structuredClone(results);pending[0].review.teacher='pending';assert.throws(()=>p.evaluate(plan,pending),/ACCEPTANCE_WITHOUT_REQUIRED_REVIEWS/);
 assert(e.arms.trace.zeroObservedSourceMathFaultUpper95>0.09&&e.arms.trace.zeroObservedSourceMathFaultUpper95<0.10,'Zero observed errors in 30 reviews is not proof of zero error probability');
});
test('failed-case effort/cost stay in the experiment and can erase an apparent speedup',()=>{
 const results=p.syntheticResults(plan),failed=results.find(r=>r.arm==='trace');Object.assign(failed,{status:'failed',firstPassAccepted:false,activeAuthoringMinutes:100,computeWallSeconds:0,wallClockSeconds:6000,costUsd:5,providerCalls:3});
 const e=p.evaluate(plan,results,{mandatoryTestsPassed:true});assert.equal(e.arms.trace.accepted,29);assert.equal(e.arms.trace.allocated,30);assert.equal(e.arms.trace.failedOrRejected,1);
 assert.equal(e.arms.trace.nonacceptedEffortMinutes,100);assert.equal(e.arms.trace.totals.costUsd,5);assert.equal(e.arms.trace.totals.providerCalls,3);
 assert(e.arms.trace.failureAdjustedMedianEffortMinutes>8);assert.equal(e.adoptionDecision,'NOT_ADOPTED');
});
test('no post-allocation exclusions, result duplication, arm changes or plan edits',()=>{
 const results=p.syntheticResults(plan);assert.throws(()=>p.evaluate(plan,[...results,results[0]]),/UNEXPECTED_OR_DUPLICATE/);
 const changed=structuredClone(results);changed[0].arm=changed[0].arm==='trace'?'baseline':'trace';assert.throws(()=>p.evaluate(plan,changed),/ARM_CHANGED/);
 const altered=structuredClone(plan);altered.metric.computeWeight=0;assert.throws(()=>p.evaluate(altered,results),/CHANGED_PLAN/);
 const impossible=structuredClone(results);impossible[0].computeWallSeconds=Infinity;assert.throws(()=>p.evaluate(plan,impossible),/INVALID_RESULT/);
});
console.log(`PASS ${count} pilot harness groups; no real experiment run`);
