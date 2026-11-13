/* Grade 10 Chapter 1: independent, exhaustive Cartesian set-law checks.
 * Supplementary Q6(ii) is NOT certified as the textbook's exact wording.
 * Run: node site/tools/test_grade10_ex1_1_q6_set_laws.cjs
 */
'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const base = path.join(__dirname, '../data/textbook-exercises');
const load = name => JSON.parse(fs.readFileSync(path.join(base, name), 'utf8'));
const union = (a,b) => [...new Set([...a,...b])];
const intersect = (a,b) => a.filter(x=>b.includes(x));
const product = (a,b) => a.flatMap(x=>b.map(y=>[x,y]));
const canonical = pairs => pairs.map(pair=>JSON.stringify(pair)).sort();
const pairUnion = (a,b) => [...new Map([...a,...b].map(p=>[JSON.stringify(p),p])).values()];
const pairIntersect = (a,b) => {
 const keys = new Set(b.map(p=>JSON.stringify(p)));
 return a.filter(p=>keys.has(JSON.stringify(p)));
};
const eq = (actual,expected,message) => assert.deepEqual(canonical(actual),canonical(expected),message);
const q6i=load('g10-ch1-ex1-1-q6i.json');
const q6ii=load('g10-ch1-ex1-1-q6ii-supplement.json');
const A=[0,1], B=[2,3,4], C=[3,5];
assert.deepEqual(q6i.answers.A,A);
assert.deepEqual(q6i.answers.B,B);
assert.deepEqual(q6i.answers.C,C);
assert.deepEqual(q6ii.sets,{A,B,C});
eq(q6i.answers.AxB,product(A,B),'Q6(i) A×B');
eq(q6i.answers.AxC,product(A,C),'Q6(i) A×C');
eq(q6i.answers.left,product(A,union(B,C)),'Q6(i) left');
eq(q6i.answers.right,pairUnion(product(A,B),product(A,C)),'Q6(i) right');
eq(q6ii.answers.AxB,product(A,B),'supplement A×B');
eq(q6ii.answers.CxA,product(C,A),'supplement C×A');
eq(q6ii.answers.intersection,pairIntersect(product(A,B),product(C,A)),'supplement intersection');
assert.deepEqual(q6ii.answers.AintersectionC,intersect(A,C));
assert.deepEqual(q6ii.answers.BintersectionA,intersect(B,A));
// Enumerate every subset of a 3-element universe: 8³=512 independent cases.
const universe=[0,1,2];
const subsets=Array.from({length:8},(_,mask)=>universe.filter((_,i)=>mask&(1<<i)));
let cases=0;
for(const x of subsets) for(const y of subsets) for(const z of subsets){
 eq(product(x,union(y,z)),pairUnion(product(x,y),product(x,z)),'distributive union');
 eq(pairIntersect(product(x,y),product(z,x)),product(intersect(x,z),intersect(y,x)),'intersection law');
 cases++;
}
for(const lesson of [q6i,q6ii]){
 assert.equal(lesson.review.mathVerified,true);
 assert.equal(lesson.review.sourceVerified,false);
 assert.equal(lesson.review.merged,false);
 assert.equal(lesson.review.deployed,false);
 assert.equal(lesson.review.liveVerified,false);
 assert.equal(lesson.review.tamilEditorial,'pending');
 assert.ok(lesson.steps.length>=4);
 for(const step of lesson.steps){
  assert.ok(step.en?.trim() && step.ta?.trim() && step.equation?.trim());
 }
}
assert.equal(q6i.source.fidelity.englishPageImageVerified,false);
assert.equal(q6i.source.fidelity.tamilPageImageVerified,false);
assert.equal(q6ii.source.exactQuestionVerified,false);
assert.match(q6ii.classification,/NOT textbook-exact/);
console.log('PASS Grade 10 Q6 mathematical checks: '+cases+' exhaustive finite-set triples; both bilingual drafts remain source-pending');
