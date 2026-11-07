/* Grade 10 2025 Ex 1.1 Q1(ii): verify products independently and bilingual content. */
'use strict';
const assert=require('node:assert/strict');
const lesson=require('../data/textbook-exercises/g10-ch1-ex1-1-q1ii.json');
const A=['p','q'],B=['p','q'];
const cross=(xs,ys)=>xs.flatMap(x=>ys.map(y=>[x,y]));
const normalized=xs=>xs.map(p=>JSON.stringify(p)).sort();
assert.equal(lesson.id,'g10-ch1-ex1-1-q1ii');
assert.equal(lesson.source.edition,'2025 revised');
assert.equal(lesson.source.english.printedPage,6);
assert.equal(lesson.source.tamil.printedPage,6);
for(const [name,expected] of [['AxB',cross(A,B)],['AxA',cross(A,A)],['BxA',cross(B,A)]]){
 const actual=lesson.answers[name];
 assert.equal(actual.length,4,name+' cardinality');
 assert.equal(new Set(normalized(actual)).size,4,name+' duplicate pairs');
 assert.deepEqual(normalized(actual),normalized(expected),name+' exact ordered pairs');
}
assert.deepEqual(lesson.answers.AxB,lesson.answers.AxA);
assert.deepEqual(lesson.answers.AxA,lesson.answers.BxA);
assert.ok(lesson.questionParaphrase.en&&lesson.questionParaphrase.ta);
for(const step of lesson.steps)assert.ok(step.en&&step.ta&&step.equation,'bilingual derivation');
assert.equal(lesson.review.tamilEditorial,'pending');
assert.equal(lesson.review.merged,false);
assert.equal(lesson.review.liveVerified,false);
console.log('PASS Grade 10 2025 Ex 1.1 Q1(ii): three equal Cartesian products, four ordered pairs each, bilingual reasoning');
