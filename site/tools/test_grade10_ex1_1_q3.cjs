/* Grade 10 2025 revised Exercise 1.1 Q3: independently recover Cartesian factors. */
'use strict';
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const q=JSON.parse(fs.readFileSync(path.join(__dirname,'../data/textbook-exercises/g10-ch1-ex1-1-q3.json'),'utf8'));
const given=[[-2,-3],[-2,4],[0,-3],[0,4],[3,-3],[3,4]];
const norm=x=>x.map(p=>JSON.stringify(p)).sort();
const unique=(pairs,index)=>[...new Set(pairs.map(p=>p[index]))];
const B=unique(given,0),A=unique(given,1);
assert.deepEqual(A,[-3,4]);assert.deepEqual(B,[-2,0,3]);
assert.deepEqual(q.answers.A,A);assert.deepEqual(q.answers.B,B);
assert.deepEqual(norm(q.answers.BxA),norm(B.flatMap(b=>A.map(a=>[b,a]))));
assert.deepEqual(norm(q.answers.BxA),norm(given));
assert.equal(new Set(norm(q.answers.BxA)).size,6);
assert.equal(q.question,'3');assert.equal(q.subpart,null);
assert.equal(q.source.edition,'2025 revised');
for(const lang of ['english','tamil']){assert.equal(q.source[lang].printedPage,6);assert.equal(q.source[lang].pdfPage,12);}
assert.equal(q.review.mathVerified,true);assert.equal(q.review.sourceVerified,true);
assert.equal(q.review.tamilEditorial,'pending');
assert.equal(q.review.merged,false);assert.equal(q.review.liveVerified,false);
for(const step of q.steps){assert.ok(step.en.trim());assert.ok(step.ta.trim());assert.ok(step.equation.trim());}
const ledger=JSON.parse(fs.readFileSync(path.join(__dirname,'../data/textbook-exercises/grade-10-coverage-2025.json'),'utf8'));
assert.ok(ledger.chapters[0].verifiedQuestionSubparts.includes('3'));
console.log('PASS Grade 10 Exercise 1.1 Q3: six pairs, unique projections, reverse Cartesian product and bilingual content');
