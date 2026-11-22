'use strict';
/*
 * AUD14-02 follow-up: frozen, independently source-checked seven missing
 * Grade 9 Ex6.4 subparts. This is a STAGING gate, not a release assertion.
 * Preserve the 2025 school-table answer rather than substituting a calculator.
 */
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const root=path.resolve(__dirname,'../..');
const read=(p)=>fs.readFileSync(path.join(root,p),'utf8');
const manifest=JSON.parse(read('docs/audit/AUD14_02_EX64_Q2_Q3_STAGED.json'));
const expectedIds=['q2-i','q2-ii','q2-iii','q2-iv','q2-v','q3-i','q3-ii'].map(s=>'c9-exercise-6-4-'+s);
const expectedAnswers=['85°57′ or 85°58′ or 85°59′','47°27′','4°7′','87°39′','82°30′','1.9970','2.8659'];
assert.equal(manifest.auditId,'AUD14-02-FOLLOWUP-EX6.4-Q2-Q3');
assert.equal(manifest.status,'STAGED_SOURCE_AND_ARITHMETIC_ONLY_NOT_STUDENT_PUBLISHED');
assert.equal(manifest.count,7);
assert.equal(manifest.gates.englishQuestionPageImage,'visually-verified');
assert.equal(manifest.gates.tamilEditorial,'pending');
assert.equal(manifest.gates.productionIntegration,'not-started');
assert.deepEqual(manifest.records.map(r=>r.id),expectedIds,'Seven stable unique question IDs in original order');
assert.deepEqual(manifest.records.map(r=>r.answer),expectedAnswers,'Preserve all textbook answers, including multiple accepted inverse values');
assert.match(manifest.source.englishPrimary,/^https:\/\/drive\.google\.com\/file\//);
assert.equal(manifest.source.printedPage,239);
const sourceParts=['sin θ = 0.9975','cos θ = 0.6763','tan θ = 0.0720','cos θ = 0.0410','tan θ = 7.5958','sin 65°39′ + cos 24°57′ + tan 10°10′','tan 70°58′ + cos 15°26′ − sin 84°59′'];
for(let i=0;i<7;i++){
 const item=manifest.records[i];
 assert.equal(item.sourcePart,sourceParts[i],'Exact 2025 English source part '+item.id);
 assert.equal(item.englishPrompt,item.sourceStem+'\n('+item.id.split('-').at(-1)+') '+item.sourcePart);
 assert.equal(item.label,'Exercise 6.4 · Q'+(i<5?'2':'3')+'('+item.id.split('-').at(-1)+')');
 assert.equal(item.stepsEnglish.length,3,'Three complete explanatory steps '+item.id);
 for(const line of item.stepsEnglish)assert(line.length>=28&&line.length<=550,'Beginner-friendly nonempty step '+item.id);
 assert.equal(item.languageStatus.tamilEditorial,'pending','No invented Tamil source sign-off');
 if(i<5){
  const t=item.table;
  assert.equal(t.baseInteger+t.adjustmentInteger,t.targetInteger,'School-table integer mean difference '+item.id);
  assert.match(t.baseAngle,/°\d{2}′/);
  if(i===0){
   assert.deepEqual(item.acceptedAnswers,['85°57′','85°58′','85°59′']);
   assert.deepEqual(t.multipleAcceptedMinutes,[57,58,59]);
   assert.match(item.stepsEnglish.join(' '),/multiple|several|adjacent/i);
  }else{
   assert.equal(item.answer,item.stepsEnglish.at(-1).includes(item.answer)?item.answer:'MISSING','Final inverse-table angle in conclusion '+item.id);
  }
 }else{
  assert.equal(item.tableTerms.length,3);
  const sum=item.tableTerms.reduce((s,t)=>s+t.integer*t.sign,0);
  assert.equal(sum,item.expectedTotalInteger,'Exact four-figure school-table arithmetic '+item.id);
  assert.equal((sum/10000).toFixed(4),item.answer,'Official four-decimal key '+item.id);
 }
}
const ctx={window:{}};
vm.runInNewContext(read('site/data/class-9.js'),ctx);
const published=ctx.window.TRIGGLE_CLASSES[9].items;
for(const id of expectedIds)assert(!published.some(q=>q.id===id),'STAGED ONLY: do not silently claim missing part is published '+id);
assert.equal(published.length,53,'Original core Grade 9 source module remains unchanged');
// Negative control: the 2025 key for Q3(ii) is table-based; a precise
// calculator expression has a different rounded result.
const rad=(d,m)=>(d+m/60)*Math.PI/180;
const calculator=Math.tan(rad(70,58))+Math.cos(rad(15,26))-Math.sin(rad(84,59));
assert.equal(calculator.toFixed(4),'2.8665');
assert.notEqual(calculator.toFixed(4),manifest.records[6].answer);
console.log('PASS AUD14-02 staging: seven source-exact textbook prompts, immutable Grade 9 product inventory, five reverse-table checks, two four-figure sums, official answer key, Q2(i) ambiguity and negative calculator control. No student-facing integration claimed.');
