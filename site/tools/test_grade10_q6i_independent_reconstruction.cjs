'use strict';
// Independently reconstruct the Grade 10 Exercise 1.1 Q6(i) draft's
// Cartesian products, rather than trusting its stored answer arrays.
// This does NOT establish textbook-exact wording or page-image fidelity.
const assert = require('node:assert/strict');
const q = require('../data/textbook-exercises/g10-ch1-ex1-1-q6i.json');
const key = p => JSON.stringify(p);
const canonical = pairs => [...new Set(pairs.map(key))].sort();
const product = (a,b) => a.flatMap(x => b.map(y => [x,y]));
const union = (a,b) => [...new Set([...a,...b])];
assert.equal(q.review.sourceVerified,false,'Page-image verification remains pending');
assert.equal(q.review.mathVerified,true);
assert.equal(q.review.merged,false);
assert.equal(q.review.liveVerified,false);
assert.equal(q.source.fidelity.englishPageImageVerified,false);
assert.equal(q.source.fidelity.tamilPageImageVerified,false);
const {A,B,C,BunionC,AxB,AxC,left,right} = q.answers;
assert.deepEqual(A,[0,1]);
assert.deepEqual(B,[2,3,4]);
assert.deepEqual(C,[3,5]);
assert.deepEqual([...BunionC].sort(),union(B,C).sort());
assert.deepEqual(canonical(AxB),canonical(product(A,B)));
assert.deepEqual(canonical(AxC),canonical(product(A,C)));
assert.deepEqual(canonical(left),canonical(product(A,union(B,C))));
assert.deepEqual(canonical(right),canonical([...product(A,B),...product(A,C)]));
assert.deepEqual(canonical(left),canonical(right));
assert.equal(left.length,8);
assert.equal(right.length,8);
for(const step of q.steps){
 assert(step.en?.trim() && step.ta?.trim() && step.equation?.trim(),
 'Every mathematical step must have bilingual explanation and equation');
}
console.log('PASS: Grade 10 Q6(i) independently reconstructed all Cartesian products; source-image fidelity still pending');
