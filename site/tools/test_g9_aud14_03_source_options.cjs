'use strict';
/* AUD14-03: independent 2025 SCERT source-choice audit.
 * Original math, answer and step list must remain identical. Missing
 * textbook Ex6.5 Q5/Q6 are a separate release gate, not fabricated here. */
const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm'),path=require('node:path'),crypto=require('node:crypto');
const root=path.resolve(__dirname,'../..'),read=p=>fs.readFileSync(path.join(root,p),'utf8');
const proof=JSON.parse(read('docs/audit/AUD14_03_EX61_EX65_SOURCE_EVIDENCE.json'));
const baseline=JSON.parse(read('docs/standard-solution-preservation.json'));
assert.equal(proof.auditId,'AUD14-03');
assert.equal(proof.gates.englishPageImages,'passed');
assert.equal(proof.gates.tamilEditorial,'pending');
const ids=['c9-exercise-6-1-q2',...['q1','q2','q3','q4','q7','q8','q9','q10'].map(p=>'c9-exercise-6-5-'+p)];
assert.deepEqual(Object.keys(proof.records),ids,'Exactly nine previously published source records');
const context={window:{}};vm.runInNewContext(read('site/data/class-9.js'),context);
const questions=context.window.TRIGGLE_CLASSES[9].items;
const classicMatch=read('site/class9-classic.html').match(/const SOLUTIONS=(\[[^\n]+\]);/);
assert.ok(classicMatch);const classic=JSON.parse(classicMatch[1]);
assert.equal(classic.length,44,'Keep existing classic reader inventory');
for(const id of ids){
 const q=questions.find(x=>x.id===id),p=proof.records[id];assert(q&&p,'Evidence and published question '+id);
 assert.equal(p.originalRecordSha256,baseline.sha256[id],'Immutable 568-question source baseline '+id);
 assert.equal(q.answer,p.originalFinalAnswer,'Original final math answer '+id);
 assert.equal(JSON.stringify(q.steps),JSON.stringify(p.originalRecord.steps),'Original solution steps '+id);
 assert.equal(q.source,proof.source.english2025);
 assert.equal(crypto.createHash('sha256').update(JSON.stringify(q)).digest('hex'),p.correctedRecordSha256,'Source-exact immutable exception '+id);
 const legacy=classic.find(x=>x.id===id.slice(3));
 assert.ok(legacy,'Classic record exists '+id);
 assert.equal(legacy.prompt,q.q.en,'English question parity '+id);
 assert.equal(legacy.promptTa,q.q.ta,'Tamil question parity '+id);
 assert.equal(JSON.stringify(legacy),JSON.stringify(p.correctedClassicRecord),'Only documented classic edits '+id);
 if(id==='c9-exercise-6-1-q2'){
  for(const label of p.requiredLabels){assert.ok(q.q.en.includes(label),'Missing English ratio '+label);assert.ok(q.q.ta.includes(label),'Missing Tamil math label '+label);}
  assert(q.q.en.includes('AD ⟂ BC'),'Preserve figure accessibility measurements');
 }else{
  assert.equal(p.choiceOptions.length,4);
  for(let k=1;k<=4;k++){
   for(const lang of ['en','ta']){
    assert(q.q[lang].includes('('+k+') '+p.choiceOptions[k-1]),'Exact 2025 MCQ choice '+id+' '+lang+' #'+k);
   }
  }
  assert(Number.isInteger(p.correctChoice)&&p.correctChoice>=1&&p.correctChoice<=4);
  const answerKey={q1:1,q2:2,q3:2,q4:3,q7:3,q8:1,q9:2,q10:2};
  assert.equal(p.correctChoice,answerKey[id.split('-').at(-1)],'Official 2025 option key');
 }
}
assert(!questions.some(q=>['c9-exercise-6-5-q5','c9-exercise-6-5-q6'].includes(q.id)),'Do not fabricate missing 6.5 Q5/Q6 inside this source-fidelity audit');
assert.ok(read('site/service-worker.js').includes('./data/class-9.js'));
console.log('PASS AUD14-03: nine source-pinned Grade 9 questions, 32 original option choices, six named ratios, original solutions, bilingual text and classic reader parity.');
