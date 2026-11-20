'use strict';
const assert=require('node:assert/strict');
const q=require('../data/textbook-exercises/g10-ch1-ex1-1-q5.json');
const ledger=require('../data/textbook-exercises/grade-10-coverage-2025.json');
const product=(X,Y)=>X.flatMap(x=>Y.map(y=>[x,y]));
const intersect=(X,Y)=>X.filter(x=>Y.includes(x));
const equal=(X,Y)=>assert.deepEqual(X.map(JSON.stringify).sort(),Y.map(JSON.stringify).sort());
const {A,B,C,D}=q.answers;
assert.equal(q.id,'g10-ch1-ex1-1-q5');
assert.deepEqual([A,B,C,D],[[1,2,3],[2,3,5],[3,4],[1,3,5]]);
const lhs=product(intersect(A,C),intersect(B,D));
const rhs=product(A,B).filter(pair=>product(C,D).some(other=>JSON.stringify(pair)===JSON.stringify(other)));
equal(lhs,rhs);equal(lhs,[[3,3],[3,5]]);
equal(q.answers.left,lhs);equal(q.answers.right,rhs);
equal(q.answers.AxB,product(A,B));equal(q.answers.CxD,product(C,D));
equal(q.answers.intersection,rhs);
assert.ok(ledger.chapters[0].verifiedQuestionSubparts.includes('5'));
for(const lang of ['en','ta']) {
 assert.ok(q.steps.length>=4);
 assert.ok(q.steps.every(s=>s[lang].length>12&&s.equation.length>10));
 assert.ok(q.questionParaphrase[lang].length>35);
}
for(const lang of ['english','tamil']) {
 assert.equal(q.source[lang].printedPage,6);
 assert.equal(q.source[lang].pdfPage,12);
}
assert.equal(q.review.tamilEditorial,'pending');
console.log('PASS Grade 10 Ex 1.1 Q5 source, bilingual steps, independent Cartesian identity');
