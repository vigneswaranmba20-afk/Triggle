'use strict';
// Grade 10, Ex 1.1 Q6(ii) supplementary preparation.
// This does NOT certify the textbook's exact mathematical typography.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const lesson = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/textbook-exercises/g10-ch1-ex1-1-q6ii-supplement.json'), 'utf8'));
assert.equal(lesson.classification, 'supplementary mathematical preparation; NOT textbook-exact transcription');
assert.equal(lesson.source.exactQuestionVerified, false);
assert.equal(lesson.review.sourceVerified, false);
assert.equal(lesson.review.merged, false);
assert.equal(lesson.review.liveVerified, false);
assert.equal(lesson.review.tamilEditorial, 'pending');
assert.ok(lesson.steps.length >= 4);
for (const step of lesson.steps) {
  assert.ok(step.en && step.ta && step.equation, 'Each mathematical step needs English, Tamil and an equation');
}
const key = ([x,y]) => JSON.stringify([x,y]);
const product = (a,b) => new Set(a.flatMap(x => b.map(y => key([x,y]))));
const intersection = (a,b) => new Set([...a].filter(x => b.has(x)));
const equal = (a,b) => a.size === b.size && [...a].every(x => b.has(x));
const universe = [0,1,2,3];
const subset = mask => universe.filter((_,i) => mask & (1 << i));
let verified = 0;
for (let a=0; a<16; a++) for (let b=0; b<16; b++) for (let c=0; c<16; c++) {
  const A=subset(a), B=subset(b), C=subset(c);
  const lhs=intersection(product(A,B), product(C,A));
  const rhs=product(A.filter(x => C.includes(x)), B.filter(x => A.includes(x)));
  assert.ok(equal(lhs,rhs), 'Intersection identity fails for '+JSON.stringify({A,B,C}));
  verified++;
}
const {A,B,C} = lesson.sets;
assert.deepEqual(A,[0,1]);
assert.deepEqual(B,[2,3,4]);
assert.deepEqual(C,[3,5]);
assert.ok(equal(intersection(product(A,B),product(C,A)),new Set()));
assert.ok(lesson.steps.some(s => s.equation.includes('(A∩C)×(B∩A)')));
console.log('Grade 10 Q6(ii) supplementary intersection: '+verified+' exhaustive finite-set cases passed; source-exact remains blocked.');
