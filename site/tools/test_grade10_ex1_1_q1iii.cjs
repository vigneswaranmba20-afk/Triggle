/* Grade 10 2025 revised bilingual Exercise 1.1 Q1(iii) math and provenance contract. */
'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const root=path.resolve(__dirname,'../data/textbook-exercises');
const q=JSON.parse(fs.readFileSync(path.join(root,'g10-ch1-ex1-1-q1iii.json'),'utf8'));
const ledger=JSON.parse(fs.readFileSync(path.join(root,'grade-10-coverage-2025.json'),'utf8'));
const cart=(a,b)=>a.flatMap(x=>b.map(y=>[x,y]));
const A=['m','n'],B=[];
assert.equal(q.id,'g10-ch1-ex1-1-q1iii');
assert.equal(q.grade,10);assert.equal(q.chapter,1);assert.equal(q.exercise,'1.1');
assert.equal(q.question,'1');assert.equal(q.subpart,'iii');
assert.equal(q.source.edition,'2025 revised');
for(const k of ['english','tamil']){assert.equal(q.source[k].printedPage,6);assert.equal(q.source[k].pdfPage,12);}
assert.equal(q.review.sourceVerified,true);assert.equal(q.review.mathVerified,true);
assert.equal(q.review.tamilEditorial,'pending');
assert.equal(q.review.merged,false);assert.equal(q.review.deployed,false);assert.equal(q.review.liveVerified,false);
for(const [key,expected] of Object.entries({AxB:cart(A,B),AxA:cart(A,A),BxA:cart(B,A)})){
 assert.deepEqual(q.answers[key],expected,key+' independent enumeration');
 assert.equal(new Set(q.answers[key].map(JSON.stringify)).size,expected.length);
}
assert.deepEqual(Object.values(q.answers).map(x=>x.length),[0,4,0]);
assert.equal(q.steps.length,4);
for(const s of q.steps){assert.ok(s.en.trim()&&s.ta.trim()&&s.equation.trim());}
assert.ok(q.questionParaphrase.en.includes('∅')&&q.questionParaphrase.ta.includes('∅'));
assert.ok(ledger.chapters[0].verifiedQuestionSubparts.includes('1(iii)'));
assert.ok(!ledger.chapters[0].mergedQuestionSubparts.includes('1(iii)'));
console.log('PASS Grade 10 Q1(iii) independent math, bilingual steps, source and ledger');
