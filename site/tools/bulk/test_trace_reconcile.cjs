'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),os=require('node:os'),cp=require('node:child_process');
const bulk=require('../curriculum_bulk.cjs'),trace=require('./trace_reconcile.cjs');
let checks=0;function test(name,fn){fn();checks++;console.log('PASS TRACE '+name);}
test('identities preserve grade, unit exercises and nested subparts',()=>{
 assert.deepEqual(trace.idLocation('g10-ch01-ex1.2-q1-i'),{grade:10,chapter:'1',exercise:'1.2',question:'1',part:'i'});
 assert.deepEqual(trace.idLocation('c10-1-ex1-2-q1-i'),trace.idLocation('g10-ch1-ex1.2-q1-i'));
 assert.equal(trace.idLocation('g9-ch1-ex1.1-q3-a-vi').part,'a-vi');
 assert.equal(trace.location({classNum:12,chapter:'1',label:{en:'Unit Exercise 1 · Q6'}}).exercise,'1.unit');
 assert.equal(trace.idLocation('g8-ch1-ex1.2-q1'),null);
 assert.equal(trace.location({id:'unknown'}),null);
 assert.notEqual(trace.canonical(trace.idLocation('g10-ch1-ex1.2-q1-i')),trace.canonical(trace.idLocation('g10-ch1-ex1.2-q1-ii')));
});
test('runtime tracing leaves every final record and curriculum unchanged',()=>{
 const ordinary=bulk.loadRuntime(),traced=bulk.loadRuntime(bulk.ROOT,{trace:true});
 const {registrations,...same}=traced;assert.deepEqual(same,ordinary);
 const final=new Map();for(const r of registrations)if(r.change!=='removed')final.set(r.id,r);
 for(const [grade,g] of Object.entries(ordinary.classes))for(const r of g.items){assert.equal(final.get(r.id).recordSha256,bulk.hashRecord(r));assert.equal(final.get(r.id).grade,Number(grade));}
 assert.equal(final.get('c10-1-1-2-q1').module,'data/class-10-chapter-1.js');
 assert.equal(final.get('g12-ch1-ex1.1-q1-i').module,'data/textbook-exercises/g12-ch1-ex1-1-en.js');
});
test('pinned PR adapter reads data but never executes branch JavaScript',()=>{
 const root=fs.mkdtempSync(path.join(os.tmpdir(),'trace-pr-'));
 const run=args=>cp.execFileSync('git',args,{cwd:root,encoding:'utf8',stdio:['ignore','pipe','pipe']}).trim();
 try{
  run(['init']);run(['config','user.name','Fixture']);run(['config','user.email','fixture@example.invalid']);
  fs.writeFileSync(path.join(root,'README.md'),'base');run(['add','.']);run(['commit','-m','base']);const base=run(['rev-parse','HEAD']);
  fs.mkdirSync(path.join(root,'site/data'),{recursive:true});
  fs.writeFileSync(path.join(root,'site/data/draft.json'),JSON.stringify({items:[{id:'g10-ch1-ex1.2-q1-i',q:{en:'A?'}}]}));
  fs.writeFileSync(path.join(root,'site/data/untrusted.js'),'throw Error("MUST_NOT_EXECUTE"); const rows=[{"id":"c10-1-ex1-2-q2"}];');
  run(['add','.']);run(['commit','-m','draft']);const head=run(['rev-parse','HEAD']);
  const r=trace.prEvidence({schemaVersion:1,pullRequests:[{number:1,head_sha:head,base_sha:base,state:'open'}]},{root,mainSha:base});
  assert.equal(r.candidates.length,2);assert.equal(r.pullRequests[0].headReachableFromMain,false);
  assert(r.candidates.every(c=>!c.fileEqualsMain&&c.kind==='UNREVIEWED_PR_CANDIDATE'));
  assert.throws(()=>trace.prEvidence({schemaVersion:1,pullRequests:[{number:1,head_sha:'--help',base_sha:base}]},{root,mainSha:base}),/reference/);
 }finally{fs.rmSync(root,{recursive:true,force:true});}
});
const read=file=>JSON.parse(fs.readFileSync(path.join(bulk.ROOT,file),'utf8'));
const report=trace.reconcile({prSnapshot:read('docs/trace/open-pr-snapshot-20261112.json'),intakeSnapshot:read('docs/trace/trace_intake_2026-11-12.json')});
test('real reconciliation keeps source, math, Tamil and deployment separate',()=>{
 trace.validateReport(report);assert.equal(report.validation.passed,true);
 assert.equal(report.gaps.length,41);assert.equal(report.summary.unlocatedExerciseRecords,0);
 assert.equal(report.summary.wholeProjectTaskDenominator,null);
 assert.equal(report.summary.historicalStagingRecords,16);assert(report.summary.historicalStagingWithRuntimeLabelOverlap>=12);
 assert(report.summary.historicalStagingWithPrOverlap>=6);
 assert(report.summary.runtimeGrade10Records>report.summary.legacyBaseGrade10Records);
 assert(report.ledger.every(r=>r.stages.deployed===null&&r.stages['live-verified']===null&&!r.stages['language-reviewed']));
 assert(report.historicalStaging.every(r=>!r.sourceChecked&&!r.mathChecked&&!r.languageReviewed));
 assert.equal(report.expectedMissingParts.length,report.summary.knownMissingSourceParts);assert(report.expectedMissingParts.every(r=>r.stages.missing&&!r.stages['math-checked']));
 assert(report.ledger.some(r=>r.appId==='g12-ch1-ex1.1-q1-i'&&r.stages['math-checked']));
 assert(report.ledger.filter(r=>r.stages['math-checked']&&r.location.grade===12&&r.location.chapter==='1').every(r=>r.location.volume===1));
 const staged=report.historicalStaging.find(r=>r.id==='g10-ch01-ex1.2-q1-i');
 assert.deepEqual(staged.samePartAppIds,[],'A whole-question record is not proof of an exact subpart match');
 assert(staged.sameNumberedQuestionAppIds.includes('c10-1-1-2-q1'));
 assert.equal(report.pilot.status,'NOT_STARTED');
});
test('invalid stages and stale/missing evidence fail closed',()=>{
 const invalid=structuredClone(report);invalid.ledger[0].stages.deployed='yes';assert.throws(()=>trace.validateReport(invalid),/stage/);
 const mismatched=structuredClone(report);mismatched.ledger[0].key='forged';assert.throws(()=>trace.validateReport(mismatched),/mismatch/);
 const missing=structuredClone(report),row=missing.ledger.find(r=>r.stages['source-checked']);row.source=null;assert.throws(()=>trace.validateReport(missing),/provenance/);
});
test('reports are repeatable, atomic and CSV-safe',()=>{
 const out=fs.mkdtempSync(path.join(os.tmpdir(),'trace-report-'));
 try{
  trace.writeReports(report,out);const first=fs.readFileSync(path.join(out,'ledger.json'),'utf8');
  trace.writeReports(report,out);assert.equal(fs.readFileSync(path.join(out,'ledger.json'),'utf8'),first);
  assert(!fs.readdirSync(out).some(f=>f.endsWith('.tmp')));
  assert.match(trace.csv([{a:'a,"b\nc'}],['a']),/"a,""b\nc"/);
 }finally{fs.rmSync(out,{recursive:true,force:true});}
});
console.log(`PASS ${checks} TRACE reconciliation groups`);
