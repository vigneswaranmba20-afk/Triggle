'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),os=require('node:os'),cp=require('node:child_process');
const bulk=require('./curriculum_bulk.cjs');
const root=fs.mkdtempSync(path.join(os.tmpdir(),'triggle-bulk-test-'));
const crypto=require('node:crypto');
const audit=require('../../docs/curriculum/audit-2026-11-10.json');
for(const [file,digest] of Object.entries(audit.grade10Chapter1Reference.preservedFiles))assert.equal(crypto.createHash('sha256').update(fs.readFileSync(path.join(bulk.ROOT,file))).digest('hex'),digest,'Preserve Grade 10 Chapter 1: '+file);
const clone=x=>JSON.parse(JSON.stringify(x));
try{
 fs.mkdirSync(path.join(root,'site/data'),{recursive:true});fs.mkdirSync(path.join(root,'site/assets'),{recursive:true});fs.mkdirSync(path.join(root,'site/tools'),{recursive:true});
 fs.mkdirSync(path.join(root,'.git'));
 fs.writeFileSync(path.join(root,'site/data/classes.js'),"window.TRIGGLE_CLASSES={9:{items:[]},10:{items:[]},11:{items:[]},12:{items:[]}};");
 fs.writeFileSync(path.join(root,'site/data/curriculum.js'),"window.TRIGGLE_CURRICULUM={grades:[9,10,11,12].map(grade=>({grade,chapters:[{id:'g'+grade+'-ch1',number:1,legacyQuestionIds:[]}]}))};");
 fs.writeFileSync(path.join(root,'site/index.html'),'<script src="./data/classes.js"></script><script src="./data/curriculum.js"></script><script src="./assets/app.js"></script>');
 fs.writeFileSync(path.join(root,'site/service-worker.js'),"const CACHE='triggle-test';const CORE=['./index.html'];self.addEventListener('install',()=>{});");
 fs.writeFileSync(path.join(root,'site/tools/verify.cjs'),`const assert=require('node:assert/strict');module.exports=({records,mapping},{hashRecord})=>({checks:records.map(r=>{const [,a,b]=r.q.en.match(/Add (\\d+) and (\\d+)/);assert.equal(Number(r.answer),Number(a)+Number(b));assert.ok(r.steps.some(s=>s.eq===a+'+'+b+'='+r.answer));return {recordId:r.id,parts:mapping.find(m=>m.recordId===r.id).parts,passed:true,method:'Independent arithmetic with answer and step comparison',recordSha256:hashRecord(r)}})});`);
 const batch={schemaVersion:1,batchId:'fixture-g10-ch1-ex1-1',grade:10,chapter:'1',module:'data/fixture.js',tamilStatus:'pending',sources:[{id:'source',grade:10,language:'en',title:'Synthetic test fixture; not textbook evidence',edition:'fixture',url:'https://example.invalid/test-source',sha256:'a'.repeat(64),verification:'verified',imprintPdfPage:2,imprintVisualChecked:true}],inventory:{completeChapter:false,exercises:[{id:'1.1',complete:true,questions:[{number:'1',parts:['whole'],sourceId:'source',printedPages:[1],pdfPages:[2],visualChecked:true,requiredFigures:[],tables:[],graphs:[],mcq:false,answerKey:null}]}]},records:[{id:'fixture-g10-q1',classNum:10,chapter:'1',exercise:'1.1',kind:'textbook',topic:{en:'Synthetic arithmetic'},label:{en:'Exercise 1.1 · Q1',ta:'Exercise 1.1 · Q1 (English only; Tamil pending)'},title:{en:'Addition'},q:{en:'Add 2 and 3.'},steps:[{en:'Add the two whole numbers.',eq:'2+3=5'},{en:'Check by subtracting the second number.',eq:'5−3=2'}],answer:'5',source:'https://example.invalid/test-source',reference:'Synthetic fixture, page 1'}],mapping:[{recordId:'fixture-g10-q1',exercise:'1.1',question:'1',parts:['whole'],sourceId:'source',sourceText:{en:'Add 2 and 3.'},visualChecked:{en:true},printedPages:[1],pdfPages:[2]}],verification:{script:'site/tools/verify.cjs'}};
 let report=bulk.validateBatch(batch,{root});assert.ok(report.passed,report.errors.join('\n'));assert.equal(report.coverage.chapterComplete,false);assert.equal(report.metrics.numberedQuestions,1);assert.equal(report.metrics.solvedSubparts,1);assert.equal(report.metrics.newAppRecords,1);
 const fails=(change,code)=>{const b=clone(batch);change(b);const r=bulk.validateBatch(b,{root});assert.equal(r.passed,false,'must block '+code);assert.ok(r.issues.some(i=>i.code===code),JSON.stringify(r));};
 fails(b=>b.records[0].answer='6','MATH');
 fails(b=>b.sources[0].imprintVisualChecked=false,'SOURCE');
 fails(b=>b.inventory.exercises[0].questions[0].answerKey={text:'5',sourceId:'missing',printedPages:[-3],pdfPages:[2],visualChecked:false},'SOURCE');
 fails(b=>b.inventory.exercises[0].questions[0].pdfPages=['2'],'SOURCE');
 fails(b=>b.records[0].q.en='Add 2 and 4.','WORDING');
 fails(b=>b.inventory.exercises[0].questions[0].visualChecked=false,'SOURCE');
 fails(b=>b.records[0].steps=[],'MISSING_STEPS');
 fails(b=>b.inventory.exercises[0].questions[0].tables=['missing table contents'],'TABLE');
 fails(b=>b.inventory.exercises[0].questions[0].graphs=['assets/graph.svg'],'MISSING_FIGURE');
 fs.writeFileSync(path.join(root,'site/tools/stale.cjs'),"module.exports=()=>({checks:[{recordId:'fixture-g10-q1',parts:['whole'],passed:true,method:'old arithmetic',recordSha256:'"+bulk.hashRecord(batch.records[0])+"'}]});");fails(b=>{b.verification.script='site/tools/stale.cjs';b.records[0].steps[1].en='Changed reasoning not reviewed';},'MATH');
 fails(b=>b.inventory.exercises[0].questions[0].parts=['i','ii'],'MAPPING');
 fails(b=>b.inventory.exercises[0].questions[0].requiredFigures=['assets/absent.svg'],'MISSING_FIGURE');
 fails(b=>b.records.push(clone(b.records[0])),'DUPLICATE_ID');
 fails(b=>b.records[0].classNum=9,'SCHEMA');
 fails(b=>b.records[0].answer={en:'5'},'SCHEMA');
 fails(b=>b.tamilStatus='source-verified','TAMIL');
 fails(b=>b.records[0].q.ta='Invented Tamil','TAMIL');
 fails(b=>b.inventory.completeChapter=true,'INVENTORY');
 fails(b=>b.module='../escaped.js','INVALID_BATCH');
 fails(b=>b.mapping=[],'MAPPING');
 // A partial inventory must never yield a chapter percentage or a completion claim.
 const partial=clone(batch);partial.inventory.exercises[0].complete=false;partial.inventory.exercises[0].questions.push({...clone(partial.inventory.exercises[0].questions[0]),number:'2'});report=bulk.validateBatch(partial,{root});assert.ok(report.passed);assert.equal(report.coverage.exercises[0].complete,false);assert.equal(report.coverage.missing.length,1);
 const missingPart=clone(batch);missingPart.inventory.exercises[0].questions[0].parts=['whole','ii'];assert.equal(bulk.validateBatch(missingPart,{root}).passed,false);
 const blocked=clone(batch);blocked.inventory.exercises[0].complete=false;blocked.inventory.exercises[0].questions.push({number:'2',parts:[],status:'blocked',blockedReason:'unreadable original scan',sourceId:'missing',visualChecked:false,printedPages:[],pdfPages:[],requiredFigures:[],tables:[],graphs:[],mcq:false,answerKey:null});const blockedReport=bulk.validateBatch(blocked,{root});assert.ok(blockedReport.passed,blockedReport.errors.join('\n'));assert.equal(blockedReport.metrics.sourceVerifiedNumberedQuestions,1);assert.equal(blockedReport.coverage.blocked.length,1);
 // No blanket "true" verifier is accepted without complete record/task hash coverage.
 fs.writeFileSync(path.join(root,'site/tools/blank.cjs'),"module.exports=()=>({checks:[{recordId:'fixture-g10-q1',parts:['whole'],passed:true,method:'unchecked'}]});");fails(b=>b.verification.script='site/tools/blank.cjs','MATH');
 // Registration wires the actual curriculum navigation and offline assets, and reruns are byte-stable.
 report=bulk.registerBatch(batch,{root});assert.ok(report.passed,report.errors.join('\n'));
 assert.ok(bulk.chapterItems(bulk.loadRuntime(root),10,'1').some(r=>r.id==='fixture-g10-q1'));
 const before=['site/index.html','site/service-worker.js','site/data/fixture.js'].map(f=>fs.readFileSync(path.join(root,f),'utf8'));
 assert.ok(bulk.registerBatch(batch,{root}).passed);assert.deepEqual(['site/index.html','site/service-worker.js','site/data/fixture.js'].map(f=>fs.readFileSync(path.join(root,f),'utf8')),before);
 // Changed source/answer cannot silently replace an existing stable ID.
 fails(b=>{b.records[0].answer='6';},'DUPLICATE_ID');
 // Both grade-run and shared integration scopes exclude a second owner; inherited nested runs work.
 bulk.withLock('grade-10',()=>{assert.equal(bulk.withLock('grade-10',()=>42,{root}),42);const token=process.env.TRIGGLE_BULK_LOCK_TOKENS;delete process.env.TRIGGLE_BULK_LOCK_TOKENS;assert.throws(()=>bulk.withLock('grade-10',()=>{}, {root}),/Another grade-10/);process.env.TRIGGLE_BULK_LOCK_TOKENS=token;},{root});
 const corrected=clone(batch);corrected.batchId='fixture-g9-correction';corrected.grade=9;corrected.module='data/g9-fixture.js';corrected.sources[0].grade=9;corrected.records[0].classNum=9;corrected.records[0].id='fixture-g9-q1';corrected.mapping[0].recordId='fixture-g9-q1';assert.ok(bulk.registerBatch(corrected,{root}).passed);
 const oldModuleHash=crypto.createHash('sha256').update(fs.readFileSync(path.join(root,'site',corrected.module))).digest('hex');corrected.records[0].q.en='Add 2 and 4.';corrected.mapping[0].sourceText.en='Add 2 and 4.';corrected.records[0].answer='6';corrected.records[0].steps[0].eq='2+4=6';assert.throws(()=>bulk.registerBatch(corrected,{root}),/Batch gate failed/);assert.throws(()=>bulk.registerBatch(corrected,{root,expectedModuleSha:'0'.repeat(64)}),/guard mismatch/);const correction=bulk.registerBatch(corrected,{root,expectedModuleSha:oldModuleHash});assert.ok(correction.passed);assert.deepEqual(correction.correction.affectedRecordIds,['fixture-g9-q1']);assert.throws(()=>bulk.registerBatch(batch,{root,expectedModuleSha:crypto.createHash('sha256').update(fs.readFileSync(path.join(root,'site',batch.module))).digest('hex')}),/preserved/);
 const c=bulk.extractCandidates('EXERCISE 1.1\n1. Find (i) x (ii) y in Fig. 1.\n2. Read the graph and table.\nUNIT EXERCISE 1\n1. Choose (A) 1 (B) 2');assert.equal(c.status,'CANDIDATES_ONLY');assert.equal(c.exercises.length,2);assert.deepEqual(c.exercises[0].questions[0].parts,['i','ii']);assert.equal(c.exercises[1].id,'1.unit');
 // Verified denominators are unknown outside a full, reconciled chapter heading inventory.
 const dir=path.join(root,'docs/curriculum/grade-10/batches');fs.mkdirSync(dir,{recursive:true});fs.writeFileSync(path.join(dir,'fixture.json'),JSON.stringify(batch));const inv=bulk.inventory({root,grade:10});assert.equal(inv.grades[0].chapters[0].verifiedTextbookDenominator,null);assert.equal(inv.grades[0].chapters[0].completionPercent,null);assert.equal(inv.grades[0].newEngineVerifiedRecords,1);
 // Independent authoritative chapter inventories reconcile unions without duplicating batch ownership.
 const chapter={schemaVersion:1,grade:10,chapter:'1',sources:clone(batch.sources),inventory:clone(batch.inventory)};chapter.inventory.completeChapter=true;chapter.inventory.headingScanVerified=true;chapter.inventory.chapterExerciseIds=['1.1'];const chapterDir=path.join(root,'docs/curriculum/grade-10/chapters');fs.mkdirSync(chapterDir,{recursive:true});fs.writeFileSync(path.join(chapterDir,'chapter-1.json'),JSON.stringify(chapter));assert.ok(bulk.inventory({root,grade:10}).grades[0].chapters[0].complete);chapter.inventory.chapterExerciseIds.push('1.2');chapter.inventory.exercises.push({...clone(chapter.inventory.exercises[0]),id:'1.2'});fs.writeFileSync(path.join(chapterDir,'chapter-1.json'),JSON.stringify(chapter));const reconciled=bulk.inventory({root,grade:10}).grades[0].chapters[0];assert.equal(reconciled.complete,false);assert.equal(reconciled.verifiedTextbookDenominator,2);assert.equal(reconciled.completionPercent,50);
 const unexpectedChapter=clone(chapter);unexpectedChapter.sources[0].sha256='b'.repeat(64);fs.writeFileSync(path.join(chapterDir,'chapter-1.json'),JSON.stringify(unexpectedChapter));assert.equal(bulk.validateAll({root,grade:10}).passed,false);fs.writeFileSync(path.join(chapterDir,'chapter-1.json'),JSON.stringify(chapter));fs.writeFileSync(path.join(chapterDir,'duplicate.json'),JSON.stringify(chapter));assert.equal(bulk.validateAll({root,grade:10}).passed,false);fs.unlinkSync(path.join(chapterDir,'duplicate.json'));
 const duplicate=clone(batch);duplicate.batchId='duplicate-source-task';duplicate.module='data/duplicate.js';duplicate.records[0].id='duplicate-q1';duplicate.mapping[0].recordId='duplicate-q1';assert.throws(()=>bulk.registerBatch(duplicate,{root}),/already claimed/);fs.writeFileSync(path.join(dir,'duplicate.json'),JSON.stringify(duplicate));assert.equal(bulk.validateAll({root,grade:10}).passed,false);assert.equal(bulk.inventory({root,grade:10}).grades[0].newEngineVerifiedRecords,0);fs.unlinkSync(path.join(dir,'duplicate.json'));
 const old={grade:10,deployment:{status:'pending'},nextAction:'source review'};bulk.atomicJson(path.join(root,'docs/curriculum/grade-10/checkpoint.json'),old);const checkpoint=bulk.checkpoint(10,{root});assert.deepEqual(checkpoint.deployment,old.deployment);assert.equal(checkpoint.nextAction,old.nextAction);
 console.log('PASS bulk engine: source/math/subpart gates, truthful coverage, runtime registration, offline assets, idempotence, locks and checkpoint isolation.');
}finally{fs.rmSync(root,{recursive:true,force:true});}
