'use strict';
const assert=require('node:assert/strict');
const q=require('../data/textbook-exercises/g10-ch1-ex1-1-q4.json');
const ledger=require('../data/textbook-exercises/grade-10-coverage-2025.json');
const product=(X,Y)=>X.flatMap(x=>Y.map(y=>[x,y]));
const intersection=(X,Y)=>X.filter(x=>Y.includes(x));
const keys=pairs=>new Set(pairs.map(p=>JSON.stringify(p)));
const eq=(left,right)=>assert.deepEqual([...keys(left)].sort(),[...keys(right)].sort());
assert.equal(q.id,'g10-ch1-ex1-1-q4');
assert.equal(q.question,'4');assert.equal(q.subpart,null);
assert.deepEqual(q.answers.A,[5,6]);
assert.deepEqual(q.answers.B,[4,5,6]);
assert.deepEqual(q.answers.C,[5,6,7]);
const {A,B,C}=q.answers;
const both=product(B,B).filter(pair=>keys(product(C,C)).has(JSON.stringify(pair)));
eq(q.answers.AxA,product(A,A));
eq(q.answers.BxB,product(B,B));
eq(q.answers.CxC,product(C,C));
eq(q.answers.intersection,both);
eq(both,product(intersection(B,C),intersection(B,C)));
eq(both,product(A,A));
assert.equal(keys(both).size,4);
assert.ok(ledger.chapters[0].verifiedQuestionSubparts.includes('4'));
assert.equal(q.review.tamilEditorial,'pending');
for(const language of ['en','ta']) {
 assert.ok(q.questionParaphrase[language].length>20);
 assert.ok(q.steps.every(step=>step[language].length>10));
}
for(const language of ['english','tamil']){
 assert.equal(q.source[language].printedPage,6);
 assert.equal(q.source[language].pdfPage,12);
}
console.log('PASS Grade 10 Ex 1.1 Q4 independent Cartesian intersection, bilingual and source checks');
