'use strict';
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const q=JSON.parse(fs.readFileSync(path.resolve(__dirname,'../data/textbook-exercises/g11-ch1-ex1-1-q3-iii.json'),'utf8')).questions[0];
assert.equal(q.id,'g11-ch1-ex1.1-q3-iii');
assert.deepEqual(q.source.page,{en:7,ta:10});
assert.deepEqual(q.source.pdfPage,{en:15,ta:18});
for(const lang of ['en','ta']){assert.ok(q.prompt[lang].length>25);assert.ok(q.steps[lang].length>=4);assert.ok(q.answer[lang].length>15);}
assert.equal(q.review.tamilEditorial,'pending');
for(let n=1;n<=10000;n++){const x=-2*n;assert.ok(x%2===0);assert.ok(x<10);}
// A finite upper bound does not bound integers below: distinct witnesses -2n exist for every n.
const witnesses=new Set(Array.from({length:10000},(_,i)=>-2*(i+1)));
assert.equal(witnesses.size,10000);
assert.match(q.answer.en, /\binfinite set\b/i, 'answer must explicitly identify an infinite set');
const html=fs.readFileSync(path.resolve(__dirname,'../grade-11/sets-q3-iii-preview.html'),'utf8');
assert.match(html,/g11-ch1-ex1-1-q3-iii.json/);
assert.match(html,/q3-iii/);
console.log('PASS Grade 11 Exercise 1.1 Q3(iii) mathematical and bilingual integrity');
