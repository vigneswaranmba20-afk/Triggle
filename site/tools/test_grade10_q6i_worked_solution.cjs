'use strict';
// Grade 10 2025 Exercise 1.1 Q6(i): independently check every listed worked-result pair.
// Source-page image verification is separate and remains pending.
const assert = require('node:assert/strict');
const q = require('../data/textbook-exercises/g10-ch1-ex1-1-q6i.json');
const key = pair => JSON.stringify(pair);
const normalized = pairs => [...new Set(pairs.map(key))].sort();
const cart = (a,b) => a.flatMap(x => b.map(y => [x,y]));
const union = (a,b) => [...new Set([...a,...b])];
const {A,B,C,BunionC,AxB,AxC,left,right} = q.answers;
assert.deepEqual(A,[0,1]);
assert.deepEqual(B,[2,3,4]);
assert.deepEqual(C,[3,5]);
assert.deepEqual(BunionC,union(B,C));
assert.deepEqual(normalized(AxB),normalized(cart(A,B)));
assert.deepEqual(normalized(AxC),normalized(cart(A,C)));
assert.deepEqual(normalized(left),normalized(cart(A,BunionC)));
assert.deepEqual(normalized(right),normalized([...AxB,...AxC]));
assert.deepEqual(normalized(left),normalized(right));
assert.equal(left.length,8);
assert.equal(new Set(left.map(key)).size,8);
assert.equal(q.steps.length,6);
for (const [index,step] of q.steps.entries()) {
  assert.ok(step.en?.trim() && step.ta?.trim() && step.equation?.trim(), 'Incomplete bilingual step '+(index+1));
}
assert.equal(q.review.mathVerified,true);
assert.equal(q.review.sourceVerified,false);
assert.equal(q.source.fidelity.englishExactQuestionVerified,false);
assert.equal(q.source.fidelity.tamilExactQuestionVerified,false);
assert.equal(q.review.liveVerified,false);
console.log('PASS: Grade 10 Q6(i) all worked pair sets and 6 bilingual steps structurally checked; exact-source review pending');
