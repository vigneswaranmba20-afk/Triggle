'use strict';
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const data=JSON.parse(fs.readFileSync(path.join(__dirname,'../data/textbook-exercises/g9-ch1-ex1-1-q3a.json'),'utf8'));
const sets={A:[0,3,5,8],B:[2,4,6,10],C:[12,14,18,20]};
const expected=[true,true,false,true,false,false];
assert.equal(data.questions.length,6);
const seen=new Set();
for(const [i,q] of data.questions.entries()){
 assert.ok(!seen.has(q.id));seen.add(q.id);
 assert.equal(q.exercise,'1.1');assert.equal(q.question,3);assert.equal(q.section,'a');
 assert.equal(q.source.page.en,5);assert.equal(q.source.page.ta,5);
 for(const lang of ['en','ta']){assert.ok(q.prompt[lang]);assert.ok(q.answer[lang]);assert.ok(q.steps[lang].length>=3);for(const s of q.steps[lang])assert.ok(s.trim());}
 const m=q.prompt.en.match(/(\d+)\s*(∈|∉)\s*([ABC])\.$/);assert.ok(m,'Statement missing: '+q.id);
 const [,raw,op,set]=m;const found=sets[set].includes(Number(raw));const truth=op==='∈'?found:!found;
 assert.equal(truth,expected[i]);assert.equal(q.answer.en,truth?'True':'False');assert.equal(q.answer.ta,truth?'சரி':'தவறு');
 assert.equal(q.verification.status,'mathematically-checked');
 assert.equal(q.review.publication,'draft');assert.equal(q.review.tamilEditorial,'pending');
}
console.log('PASS: 6 bilingual Q3(a) subparts, unique IDs, source refs, independent set-membership truth tables and draft gates');
