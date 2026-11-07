/* Grade 10: independent Cartesian-product property checks and coverage consistency.
 * Run: node site/tools/test_grade10_cartesian_properties.cjs
 */
'use strict';
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const root=path.join(__dirname,'../data/textbook-exercises');
const product=(a,b)=>a.flatMap(x=>b.map(y=>[x,y]));
const canonical=x=>x.map(p=>JSON.stringify(p)).sort();
const inputs=[
 {part:'i',a:[2,-2,3],b:[1,-4]},
 {part:'ii',a:['p','q'],b:['p','q']}
];
const ledger=JSON.parse(fs.readFileSync(path.join(root,'grade-10-coverage-2025.json'),'utf8'));
assert.equal(ledger.grade,10);
assert.deepEqual(ledger.chapters.map(c=>c.chapter),[1,2,3,4,5,6,7,8]);
for(const entry of inputs){
 const id='g10-ch1-ex1-1-q1'+entry.part;
 const lesson=JSON.parse(fs.readFileSync(path.join(root,id+'.json'),'utf8'));
 const expected={AxB:product(entry.a,entry.b),AxA:product(entry.a,entry.a),BxA:product(entry.b,entry.a)};
 for(const [key,pairs] of Object.entries(expected)){
   assert.deepEqual(canonical(lesson.answers[key]),canonical(pairs),id+': '+key+' full enumeration');
   assert.equal(lesson.answers[key].length,new Set(canonical(lesson.answers[key])).size,id+': duplicate pairs');
 }
 assert.equal(expected.AxB.length,entry.a.length*entry.b.length);
 assert.equal(expected.AxA.length,entry.a.length**2);
 assert.equal(expected.BxA.length,entry.b.length*entry.a.length);
 for(const lang of ['en','ta']){
   assert.ok(lesson.questionParaphrase[lang]?.trim());
   assert.ok(lesson.steps.every(s=>s[lang]?.trim()));
 }
 assert.equal(lesson.review.mathVerified,true);
 assert.equal(lesson.review.tamilEditorial,'pending');
 assert.equal(lesson.review.merged,false);
 assert.equal(lesson.review.liveVerified,false);
 assert.ok(ledger.chapters[0].verifiedQuestionSubparts.includes('1('+entry.part+')'));
 console.log('PASS',id);
}
for(const chapter of ledger.chapters){
 assert.equal(chapter.fullChapterExerciseInventoryComplete,false);
 assert.deepEqual(chapter.mergedQuestionSubparts,[]);
 assert.deepEqual(chapter.liveVerifiedQuestionSubparts,[]);
}
console.log('PASS Grade 10 property checks and conservative coverage flags');
