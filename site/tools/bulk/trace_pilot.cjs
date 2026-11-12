#!/usr/bin/env node
'use strict';
const fs=require('node:fs'),path=require('node:path'),{hashRecord,atomicJson}=require('../curriculum_bulk.cjs');
const fail=message=>{throw Error(message);};
function rng(seed){let n=seed>>>0;return ()=>{n=(1664525*n+1013904223)>>>0;return n/4294967296;};}
function shuffle(items,random){const a=[...items];for(let i=a.length-1;i>0;i--){const j=Math.floor(random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}
const stratum=item=>JSON.stringify([item.grade,item.archetype,item.difficulty,item.diagram,item.medium]);
function eligible(item,{synthetic}){
 if(!item||typeof item.id!=='string'||!item.id||typeof item.crossMediumId!=='string'||!item.crossMediumId||![9,10,11,12].includes(item.grade)||typeof item.archetype!=='string'||!['easy','medium','difficult'].includes(item.difficulty)||typeof item.diagram!=='boolean'||!['en','ta'].includes(item.medium)||!/^[a-f0-9]{64}$/.test(item.sourceHash||''))return false;
 if(!synthetic){
  if(item.dedupChecked!==true||!/^[a-f0-9]{64}$/.test(item.ledgerHash||'')||!/^[a-f0-9]{64}$/.test(item.prSnapshotHash||'')||item.diagram&&item.figureChecked!==true)return false;
  if(!['en','ta'].every(medium=>item.sourceEvidence?.some(s=>s.medium===medium&&s.edition==='2025'&&s.visualChecked===true&&Number.isInteger(s.printedPage)&&s.printedPage>0&&Number.isInteger(s.pdfPage)&&s.pdfPage>0&&/^[a-f0-9]{64}$/.test(s.pdfHash||'')&&/^[a-f0-9]{64}$/.test(s.imageHash||''))))return false;
 }
 return item.synthetic===synthetic&&item.sourceChecked===true&&item.sourceAccessible===true&&item.worked===false&&item.uncertain===false;
}
function makePlan(pool,{seed=20261112,synthetic=false,reviewers=[],computeWeight=1}={}){
 if(!Number.isSafeInteger(seed)||seed<0||seed>0xffffffff||typeof synthetic!=='boolean'||typeof computeWeight!=='number'||!Number.isFinite(computeWeight)||computeWeight<0||!Array.isArray(pool))fail('INVALID_PLAN_OPTIONS');
 const ids=new Set(),parts=new Set();for(const item of pool){if(ids.has(item.id)||parts.has(item.crossMediumId))fail('DUPLICATE_QUESTION_PART');ids.add(item.id);parts.add(item.crossMediumId);}
 if(!Array.isArray(reviewers))fail('INVALID_REVIEWERS');
 const available=reviewers.filter(r=>typeof r?.id==='string'&&r.id&&r.available===true&&r.synthetic===synthetic);
 const selectedPool=pool.filter(item=>eligible(item,{synthetic})),missingReviewers=!available.some(a=>a.role==='math'&&available.some(b=>b.role==='bilingual'&&b.id!==a.id));
 if(!synthetic&&pool.some(i=>i.synthetic===true))fail('SYNTHETIC_ITEMS_NOT_REAL_EVIDENCE');
 const base={schemaVersion:1,kind:'TRACE_60_PART_PILOT',seed,mode:synthetic?'LABELLED_SYNTHETIC':'REAL',eligibleCount:selectedPool.length,poolHash:hashRecord(pool),metric:{name:'active-human-plus-compute-minutes',computeWeight,formula:'activeAuthoringMinutes + computeWeight * computeWallSeconds / 60',failureAccounting:'Distribute every nonaccepted case effort equally over accepted parts in the same arm; also report total effort/accepted count.'},reviewers:reviewers.map(({id,role,available,synthetic})=>({id,role,available,synthetic}))};
 if(selectedPool.length<60||missingReviewers)return {...base,status:'BLOCKED',realPilotStatus:'NOT_STARTED',assignments:[],blockers:[...(selectedPool.length<60?['FEWER_THAN_60_ACCESSIBLE_SOURCE_CHECKED_UNWORKED_UNCERTAIN_FREE_PARTS']:[]),...(missingReviewers?['INDEPENDENT_MATH_AND_BILINGUAL_REVIEWERS_UNAVAILABLE']:[])]};
 const random=rng(seed),buckets=new Map();
 for(const item of selectedPool.slice().sort((a,b)=>a.id.localeCompare(b.id))){const key=stratum(item);if(!buckets.has(key))buckets.set(key,[]);buckets.get(key).push(item);}
 // Seeded round-robin sampling keeps small strata visible when the pool exceeds 60.
 const groups=shuffle([...buckets].sort(([a],[b])=>a.localeCompare(b)),random).map(([key,items])=>({key,items:shuffle(items,random),selected:[]}));
 let remaining=60;while(remaining)for(const group of groups)if(remaining&&group.items.length){group.selected.push(group.items.shift());remaining--;}
 const assignments=[],leftovers=[],counts={baseline:0,trace:0};
 const put=(item,arm,key)=>{assignments.push({id:item.id,crossMediumId:item.crossMediumId,arm,stratum:key,sourceHash:item.sourceHash});counts[arm]++;};
 for(const group of groups){const items=group.selected;for(let i=0;i+1<items.length;i+=2){const arm=random()<0.5?'baseline':'trace';put(items[i],arm,group.key);put(items[i+1],arm==='baseline'?'trace':'baseline',group.key);}if(items.length%2)leftovers.push({item:items.at(-1),key:group.key});}
 for(const {item,key} of shuffle(leftovers,random)){const arm=counts.baseline<counts.trace?'baseline':counts.trace<counts.baseline?'trace':random()<0.5?'baseline':'trace';put(item,arm,key);}
 if(counts.baseline!==30||counts.trace!==30)fail('ALLOCATION_IMBALANCE');
 const plan={...base,status:synthetic?'SYNTHETIC_HARNESS_ONLY':'ALLOCATED_NOT_STARTED',realPilotStatus:synthetic?'NOT_STARTED':'ALLOCATED_NOT_STARTED',assignments:assignments.sort((a,b)=>a.id.localeCompare(b.id)),strata:groups.filter(g=>g.selected.length).map(g=>({key:g.key,selected:g.selected.length})),blockers:[]};
 return {...plan,planHash:hashRecord(plan)};
}
const finiteNonnegative=n=>typeof n==='number'&&Number.isFinite(n)&&n>=0;
const median=values=>{const a=[...values].sort((x,y)=>x-y),m=Math.floor(a.length/2);return !a.length?null:a.length%2?a[m]:(a[m-1]+a[m])/2;};
function evaluate(plan,results,{mandatoryTestsPassed=false,bootstrapSamples=1000}={}){
 const {planHash,...body}=plan;if(planHash!==hashRecord(body)||plan.assignments?.length!==60)fail('UNALLOCATED_OR_CHANGED_PLAN');
 if(!Array.isArray(results)||typeof mandatoryTestsPassed!=='boolean'||!Number.isInteger(bootstrapSamples)||bootstrapSamples<100||bootstrapSamples>10000)fail('INVALID_EVALUATION_OPTIONS');
 const assigned=new Map(plan.assignments.map(a=>[a.id,a])),seen=new Set(),byArm={baseline:[],trace:[]};
 for(const r of results){
  if(!assigned.has(r.id)||seen.has(r.id))fail('UNEXPECTED_OR_DUPLICATE_RESULT');seen.add(r.id);
  if(r.arm&&r.arm!==assigned.get(r.id).arm)fail('RESULT_ARM_CHANGED');
  if(!['accepted','rejected','failed','interrupted','pending'].includes(r.status)||!['wallClockSeconds','computeWallSeconds','activeAuthoringMinutes','costUsd','providerTokens','providerCalls','corrections'].every(k=>finiteNonnegative(r[k]))||!['providerTokens','providerCalls','corrections'].every(k=>Number.isSafeInteger(r[k]))||r.wallClockSeconds>366*86400||r.costUsd>1000000||r.providerTokens>1e10||r.providerCalls>1e6||r.corrections>1e6||r.computeWallSeconds>r.wallClockSeconds||r.activeAuthoringMinutes*60>r.wallClockSeconds||typeof r.firstPassAccepted!=='boolean'||typeof r.duplicateAvoided!=='boolean')fail('INVALID_RESULT');
  if(!r.defects||!['source','math','language','integration'].every(k=>Number.isSafeInteger(r.defects[k])&&r.defects[k]>=0)||!r.review||!['source','math','bilingual','teacher'].every(k=>['passed','pending','rejected'].includes(r.review[k])))fail('MISSING_REVIEW_OR_DEFECT_DATA');
  if(r.status==='accepted'&&Object.values(r.review).some(v=>v!=='passed'))fail('ACCEPTANCE_WITHOUT_REQUIRED_REVIEWS');
  const effort=r.activeAuthoringMinutes+plan.metric.computeWeight*r.computeWallSeconds/60;byArm[assigned.get(r.id).arm].push({...r,effort});
 }
 const arms={};for(const arm of ['baseline','trace']){
  const rows=byArm[arm],accepted=rows.filter(r=>r.status==='accepted'),overhead=rows.filter(r=>r.status!=='accepted').reduce((n,r)=>n+r.effort,0),totalEffort=rows.reduce((n,r)=>n+r.effort,0);
  const adjusted=accepted.map(r=>r.effort+overhead/accepted.length);
  arms[arm]={allocated:30,recorded:rows.length,missing:30-rows.length,accepted:accepted.length,failedOrRejected:rows.filter(r=>['failed','rejected','interrupted'].includes(r.status)).length,pending:rows.filter(r=>r.status==='pending').length,
   acceptanceRate:accepted.length/30,firstPassAccepted:rows.filter(r=>r.status==='accepted'&&r.firstPassAccepted).length,corrections:rows.reduce((n,r)=>n+r.corrections,0),duplicatesAvoided:rows.filter(r=>r.duplicateAvoided).length,
   totals:{effortMinutes:totalEffort,wallClockSeconds:rows.reduce((n,r)=>n+r.wallClockSeconds,0),activeAuthoringMinutes:rows.reduce((n,r)=>n+r.activeAuthoringMinutes,0),providerCalls:rows.reduce((n,r)=>n+r.providerCalls,0),providerTokens:rows.reduce((n,r)=>n+r.providerTokens,0),costUsd:rows.reduce((n,r)=>n+r.costUsd,0)},
   nonacceptedEffortMinutes:overhead,effortMinutesPerAccepted:accepted.length?totalEffort/accepted.length:null,failureAdjustedMedianEffortMinutes:median(adjusted),
   defects:Object.fromEntries(['source','math','language','integration'].map(k=>[k,rows.reduce((n,r)=>n+r.defects[k],0)])),
   sourceMathReviewed:rows.filter(r=>r.review.source==='passed'&&r.review.math==='passed').length,_adjusted:adjusted};
 }
 const a=arms.baseline.failureAdjustedMedianEffortMinutes,b=arms.trace.failureAdjustedMedianEffortMinutes,reduction=a>0&&b!==null?1-b/a:null;
 let interval=null;
 if(a>0&&b!==null){const random=rng(plan.seed^0xfeedbabe),ratios=[];for(let i=0;i<bootstrapSamples;i++){const sample=arm=>Array.from({length:arms[arm]._adjusted.length},()=>{const rows=arms[arm]._adjusted;return rows[Math.floor(random()*rows.length)];});const x=median(sample('baseline')),y=median(sample('trace'));if(x>0)ratios.push(1-y/x);}ratios.sort((x,y)=>x-y);if(ratios.length)interval=[ratios[Math.floor(ratios.length*.025)],ratios[Math.min(ratios.length-1,Math.floor(ratios.length*.975))]];}
 const complete=results.length===60&&Object.values(arms).every(a=>a.pending===0&&a.missing===0),qualityPassed=Object.values(arms.trace.defects).every(n=>n===0),reviewsComplete=results.every(r=>Object.values(r.review).every(v=>v!=='pending'));
 const passes=complete&&reviewsComplete&&mandatoryTestsPassed&&qualityPassed&&arms.trace.accepted>=arms.baseline.accepted&&reduction!==null&&reduction>=0.3;
 const real=plan.mode==='REAL';
 for(const arm of Object.values(arms)){arm.zeroObservedSourceMathFaultUpper95=real&&arm.sourceMathReviewed>0&&arm.defects.source+arm.defects.math===0?1-Math.pow(.05,1/arm.sourceMathReviewed):null;delete arm._adjusted;}
 return {schemaVersion:1,planHash,mode:plan.mode,realPilotStatus:real?(complete?'COMPLETED':'INCOMPLETE'):'NOT_STARTED',complete,arms,
  medianEffortReduction:reduction,bootstrap95ReductionInterval:interval,bootstrapNote:'Small-sample descriptive bootstrap of failure-adjusted accepted-part effort; does not establish causal generalization or zero error.',
  mandatoryTestsPassed,qualityPassed,reviewsComplete,adoptionDecision:!real?'NOT_EVALUATED_SYNTHETIC':passes?'MEETS_PREREGISTERED_THRESHOLD':'NOT_ADOPTED',syntheticDiagnosticWouldMeetThreshold:!real?passes:null,
  limitation:'Every allocated case remains in denominators. Failed/nonaccepted effort is charged to accepted parts. Small samples cannot prove zero error. Synthetic timings/costs are not measured project performance.'};
}
function syntheticPool(){return Array.from({length:60},(_,i)=>({id:`SYNTHETIC-${String(i+1).padStart(2,'0')}`,crossMediumId:`SYNTHETIC-PART-${i+1}`,grade:[9,10,11,12][i%4],archetype:['sets','linear-system','trigonometry'][i%3],difficulty:['easy','medium','difficult'][Math.floor(i/4)%3],diagram:i%5===0,medium:i%2?'ta':'en',sourceHash:hashRecord({synthetic:i}),synthetic:true,sourceChecked:true,sourceAccessible:true,worked:false,uncertain:false}));}
function syntheticResults(plan){return plan.assignments.map((a,i)=>({id:a.id,arm:a.arm,status:'accepted',wallClockSeconds:a.arm==='baseline'?600:360,computeWallSeconds:60,activeAuthoringMinutes:a.arm==='baseline'?8:4,costUsd:0,providerTokens:0,providerCalls:0,corrections:0,firstPassAccepted:true,duplicateAvoided:false,defects:{source:0,math:0,language:0,integration:0},review:{source:'passed',math:'passed',bilingual:'passed',teacher:'passed'}}));}
function main(args){const opts={};for(let i=0;i<args.length;i++){if(['--offline','--dry-run','--synthetic'].includes(args[i]))opts[args[i]]=true;else if(['--seed','--report','--pool','--reviewers'].includes(args[i])&&args[i+1])opts[args[i]]=args[++i];else fail('INVALID_ARGUMENT');}
 if(!opts['--offline']||!opts['--dry-run'])fail('OFFLINE_DRY_RUN_REQUIRED');const synthetic=!!opts['--synthetic'];
 const reviewers=synthetic?[{id:'SYNTHETIC_MATH',role:'math',available:true,synthetic:true},{id:'SYNTHETIC_BILINGUAL',role:'bilingual',available:true,synthetic:true}]:opts['--reviewers']?JSON.parse(fs.readFileSync(opts['--reviewers'],'utf8')):[];
 const pool=synthetic?syntheticPool():opts['--pool']?JSON.parse(fs.readFileSync(opts['--pool'],'utf8')):[],plan=makePlan(pool,{seed:Number(opts['--seed']||20261112),synthetic,reviewers});
 const evaluation=synthetic?evaluate(plan,syntheticResults(plan),{mandatoryTestsPassed:true}):null;
 if(opts['--report']){const dir=path.resolve(opts['--report']);fs.mkdirSync(dir,{recursive:true});atomicJson(path.join(dir,'plan.json'),plan);if(evaluation)atomicJson(path.join(dir,'synthetic-evaluation.json'),evaluation);}
 console.log(JSON.stringify({status:plan.status,realPilotStatus:plan.realPilotStatus,eligible:plan.eligibleCount,allocated:plan.assignments.length,adoptionDecision:evaluation?.adoptionDecision??null,blockers:plan.blockers},null,2));
}
module.exports={eligible,makePlan,evaluate,syntheticPool,syntheticResults};
if(require.main===module)try{main(process.argv.slice(2));}catch(e){console.error(e.message);process.exitCode=1;}
