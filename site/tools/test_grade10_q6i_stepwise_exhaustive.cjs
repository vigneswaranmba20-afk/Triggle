'use strict';
// Grade 10 Exercise 1.1 Q6(i): independently recompute every displayed
// finite-set intermediate result. This is NOT textbook-source verification.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const lesson = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/textbook-exercises/g10-ch1-ex1-1-q6i.json'), 'utf8'));
const A = [0,1], B = [2,3,4], C = [3,5];
const union = (a,b) => [...new Set([...a,...b])].sort((x,y)=>x-y);
const product = (a,b) => a.flatMap(x=>b.map(y=>[x,y]));
const canonical = pairs => pairs.map(p=>JSON.stringify(p)).sort();
const left = product(A,union(B,C));
const right = [...new Map([...product(A,B),...product(A,C)].map(p=>[JSON.stringify(p),p])).values()];
assert.deepEqual(canonical(left),canonical(right),'distributive identity');
for(const [key,expected] of Object.entries({A,B,C,BunionC:union(B,C)}))
  assert.deepEqual(lesson.answers[key],expected,key);
for(const [key,expected] of Object.entries({AxB:product(A,B),AxC:product(A,C),left,right}))
  assert.deepEqual(canonical(lesson.answers[key]),canonical(expected),key);
assert.equal(lesson.steps.length,6);
const expectedEquations = [
 'A={0,1}; B={2,3,4}; C={3,5}',
 'B∪C={2,3,4,5}',
 'A×(B∪C)={(0,2),(0,3),(0,4),(0,5),(1,2),(1,3),(1,4),(1,5)}',
 'A×B={(0,2),(0,3),(0,4),(1,2),(1,3),(1,4)}; A×C={(0,3),(0,5),(1,3),(1,5)}',
 '(A×B)∪(A×C)={(0,2),(0,3),(0,4),(0,5),(1,2),(1,3),(1,4),(1,5)}',
 'A×(B∪C)=(A×B)∪(A×C)'
];
lesson.steps.forEach((step,i)=>{
 assert.equal(step.equation,expectedEquations[i],`step ${i+1} displayed equation`);
 assert.ok(step.en?.trim() && step.ta?.trim(),`step ${i+1} bilingual explanation`);
});
assert.equal(lesson.review.mathVerified,true);
assert.equal(lesson.review.sourceVerified,false);
assert.equal(lesson.source.fidelity.englishPageImageVerified,false);
assert.equal(lesson.source.fidelity.tamilPageImageVerified,false);
assert.equal(lesson.review.merged,false);
assert.equal(lesson.review.liveVerified,false);
assert.equal(lesson.review.tamilEditorial,'pending');
// Exhaustive identity check for 3 arbitrary subsets of a 4-element universe:
const subsets = Array.from({length:16},(_,mask)=>[0,1,2,3].filter(x=>mask&(1<<x)));
let cases=0;
for(const a of subsets) for(const b of subsets) for(const c of subsets){
 assert.deepEqual(canonical(product(a,union(b,c))),canonical([...new Map([...product(a,b),...product(a,c)].map(p=>[JSON.stringify(p),p])).values()]));
 cases++;
}
assert.equal(cases,4096);
console.log('PASS Grade 10 Q6(i): six bilingual equations, all answer arrays and 4096 exhaustive cases; textbook image verification still pending');
