'use strict';
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const data=JSON.parse(fs.readFileSync(path.join(__dirname,'../data/textbook-exercises/g9-ch1-ex1-1-q1.json'),'utf8'));
assert.equal(data.chapterId,'g9-ch1');
assert.equal(data.questions.length,4);
assert.equal(new Set(data.questions.map(q=>q.id)).size,4);
const expected=['set','not a set','set','not a set'];
data.questions.forEach((q,i)=>{
 assert.equal(q.id,'g9-ch1-ex1.1-q1-'+['i','ii','iii','iv'][i]);
 assert.equal(q.answer.en,expected[i]);
 assert.equal(q.answer.ta,expected[i]==='set'?'கணம்':'கணமல்ல');
 assert.equal(q.source.edition,'2025 revised');
 assert.equal(q.source.page.en,5);assert.equal(q.source.page.ta,5);
 for(const lang of ['en','ta']){assert(q.prompt[lang]?.length>20);assert.equal(q.steps[lang].length,3);assert(q.steps[lang].every(s=>s.length>20));}
 assert.equal(q.review.publication,'draft');
 assert.equal(q.review.tamilEditorial,'pending');
});
console.log('PASS: Grade 9 exercise 1.1 Q1 all four bilingual subparts, answer keys, source and draft gates');
