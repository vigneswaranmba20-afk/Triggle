'use strict';
const assert=require('node:assert/strict');
const {exactGeometric,checkMath}=require('./trace_dual_math.cjs');
const {runDualReview,taskFor}=require('./trace_dual_ai.cjs');
const {cases,record,run}=require('./trace_dual_rehearsal.cjs');
const fixture=(a,r,n,claimedSum)=>({kind:'geometric-series',a,r,n,claimedSum});
(async()=>{
  for(const [spec,expected] of [
    [fixture(1,2,4,'15'),'15'],[fixture(1,3,4,'40'),'40'],
    [fixture(3,-2,4,'-15'),'-15'],[fixture(7,0,5,'7'),'7'],
    [fixture(5,1,4,'20'),'20'],[fixture(1,-1,9,'1'),'1'],
    [fixture(0,3,9,'0'),'0'],[fixture(20,-20,30,'-172729272719254285714285714280'),null]
  ]){
    const x=exactGeometric(spec);
    if(expected!==null){assert.equal(x.expectedSum,expected);assert.equal(x.status,'EXACT_MATCH');}
    assert.equal(x.telescopingIdentityPassed,true);
    assert.match(x.mathSpecSha256,/^[0-9a-f]{64}$/);
  }
  for(const spec of [
    fixture(1,2,0,'0'),fixture(1,2,31,'0'),fixture(21,2,4,'0'),
    fixture(1,2,4,'1.5'),fixture(1,2,4,'+15'),fixture(1,2,4,'15e0'),
    {...fixture(1,2,4,'15'), extra:true},{...fixture(1,2,4,'15'),n:2.5},
    {...fixture(1,2,4,'15'),r:'2'}
  ])assert.throws(()=>exactGeometric(spec),/INVALID_MATH_SPEC/);
  const bad=record(cases[10],10);
  const result=await runDualReview(bad,{live:false});
  assert.equal(result.status,'LOCAL_MATH_REJECTED');
  assert.equal(result.entries.length,0);
  assert.equal(result.releaseApproved,false);
  assert.equal(result.accounting.reservedCostUsd,0);
  assert.equal(result.localMathCheck.expectedSum,'15');
  const good=record(cases[0],0);
  const checked=checkMath(good);
  assert.equal(checked.status,'EXACT_MATCH');
  const fingerprinted=taskFor('openai',good,true,{evidenceSha256:'0'.repeat(64),claim:'STRUCTURALLY_VALIDATED_NOT_VISUALLY_CERTIFIED'},checked);
  assert.equal(fingerprinted.input.localMathSpecSha256,checked.mathSpecSha256);
  const report=await run();
  assert.equal(report.total,12);
  assert.equal(report.exactMatched,10);
  assert.equal(report.locallyRejected,2);
  assert.equal(report.providerMockCalls,20);
  assert.equal(report.actualProviderCalls,0);
  assert.equal(report.releaseApproved,false);
  assert(report.rows.every(r=>r.modelReview==='SYNTHETIC_ONLY'));
  console.log('PASS TRACE local exact GP oracle and 12-case dual-model rehearsal; USD 0, textbook fidelity not claimed');
})().catch(e=>{console.error(e);process.exitCode=1;});
