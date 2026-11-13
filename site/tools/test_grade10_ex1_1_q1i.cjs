/* Grade 10 2025 source-verified Cartesian product content checks. Run: node site/tools/test_grade10_ex1_1_q1i.cjs */
'use strict';
const assert = require('node:assert/strict');
const lesson = require('../data/textbook-exercises/g10-ch1-ex1-1-q1i.json');
const A=[2,-2,3], B=[1,-4];
const cross=(xs,ys)=>xs.flatMap(x=>ys.map(y=>[x,y]));
const normalize=xs=>xs.map(p=>JSON.stringify(p)).sort();
assert.equal(lesson.id,'g10-ch1-ex1-1-q1i');
assert.equal(lesson.source.edition,'2025 revised');
assert.equal(lesson.source.english.printedPage,6);
assert.equal(lesson.source.tamil.printedPage,6);
for(const [name,expected] of [['AxB',cross(A,B)],['AxA',cross(A,A)],['BxA',cross(B,A)]]){
  const actual=lesson.answers[name];
  assert.equal(actual.length,expected.length,name+' cardinality');
  assert.equal(new Set(normalize(actual)).size,expected.length,name+' duplicate pair');
  assert.deepEqual(normalize(actual),normalize(expected),name+' Cartesian product');
}
for(const step of lesson.steps){
  assert.ok(step.en&&step.ta&&step.equation,'complete bilingual reasoning');
}
assert.equal(lesson.review.tamilEditorial,'pending');
assert.equal(lesson.review.merged,false);
assert.equal(lesson.review.liveVerified,false);
console.log('PASS Grade 10 exercise 1.1 question 1(i): 3 Cartesian products, 21 unique pairs, bilingual steps, source and review metadata');
