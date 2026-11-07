'use strict';
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const d=JSON.parse(fs.readFileSync(path.join(__dirname,'../data/textbook-exercises/g9-ch1-ex1-1-q4.json'),'utf8'));
assert.equal(d.chapterId,'g9-ch1');assert.equal(d.questions.length,1);
const q=d.questions[0];assert.equal(q.id,'g9-ch1-ex1.1-q4-i');assert.equal(q.exercise,'1.1');assert.equal(q.question,4);assert.equal(q.part,'i');
assert.equal(q.source.edition,'2025 revised');assert.deepEqual(q.source.page,{en:5,ta:6});
const expected=Array.from({length:9},(_,i)=>2*(i+1));
const actual=[...q.answer.en.matchAll(/-?\\d+/g)].map(m=>Number(m[0]));
assert.deepEqual(actual,expected);assert.equal(q.answer.ta,q.answer.en);
for(const x of expected)assert(x>0&&x<20&&x%2===0);
for(let x=1;x<=20;x++)assert.equal(expected.includes(x),x%2===0&&x<20);
for(const lang of ['en','ta']){assert(q.prompt[lang].length>25);assert.equal(q.steps[lang].length,3);assert(q.steps[lang].every(s=>s.length>30));}
assert.equal(q.review.tamilEditorial,'pending');assert.equal(q.review.publication,'draft');
console.log('PASS: G9 Exercise 1.1 Q4(i), bilingual roster and independent boundary enumeration');
