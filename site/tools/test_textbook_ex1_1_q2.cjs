'use strict';
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const d=JSON.parse(fs.readFileSync(path.join(__dirname,'../data/textbook-exercises/g9-ch1-ex1-1-q2.json'),'utf8'));
const words=['INDIA','PARALLELOGRAM','MISSISSIPPI','CZECHOSLOVAKIA'];
assert.equal(d.questions.length,4);
assert.equal(new Set(d.questions.map(q=>q.id)).size,4);
d.questions.forEach((q,i)=>{
 const expected=new Set(words[i]);
 assert.equal(q.id,'g9-ch1-ex1.1-q2-'+['i','ii','iii','iv'][i]);
 assert.equal(q.source.page.en,5);assert.equal(q.source.page.ta,5);
 for(const lang of ['en','ta']){
  assert.ok(q.prompt[lang].length>20);
  assert.equal(q.steps[lang].length,3);
  assert.ok(q.steps[lang].every(s=>s.length>20));
  const actual=q.answer[lang].slice(1,-1).split(', ');
  assert.equal(actual.length,expected.size);
  assert.deepEqual(new Set(actual),expected);
 }
 assert.equal(q.review.publication,'draft');
});
console.log('PASS: Grade 9 Exercise 1.1 Q2 four bilingual roster subparts');
