'use strict';
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const data=JSON.parse(fs.readFileSync(path.join(__dirname,'../data/textbook-exercises/g11-ch1-ex1-1-q1.json'),'utf8'));
const ledger=JSON.parse(fs.readFileSync(path.join(__dirname,'../../docs/coverage/grade-11-2025.json'),'utf8'));
assert.equal(data.chapterId,'g11-ch1');
assert.equal(data.questions.length,4);
assert.equal(new Set(data.questions.map(q=>q.id)).size,4);
assert.deepEqual(data.questions.map(q=>q.answer.en),['{2, 3, 5, 7}','{1}','{1, 2, 3, 4, 5, 6, 7, 8, 9, 10}','{−5}']);
const primes=x=>x>1&&Array.from({length:Math.floor(Math.sqrt(x))-1},(_,i)=>i+2).every(d=>x%d!==0);
assert.deepEqual(Array.from({length:20},(_,i)=>i+1).filter(x=>x*x<121&&primes(x)),[2,3,5,7]);
assert.deepEqual([-3,-2,-1,0,1,2,3].filter(x=>(x-1)*(x+1)*(x*x-1)===0&&x>0),[1]);
assert.deepEqual(Array.from({length:30},(_,i)=>i+1).filter(x=>4*x+9<52),[1,2,3,4,5,6,7,8,9,10]);
assert.equal((-5-4)/(-5+2),3);
assert.equal(((-5)-4)-3*((-5)+2),0);
for(const [i,q] of data.questions.entries()){
 assert.equal(q.id,'g11-ch1-ex1.1-q1-'+['i','ii','iii','iv'][i]);
 assert.equal(q.source.edition,'2025 revised');
 assert.equal(q.source.page.en,7);assert.equal(q.source.page.ta,9);
 for(const lang of ['en','ta']){assert(q.prompt[lang].length>15);assert.equal(q.steps[lang].length,3);assert(q.steps[lang].every(s=>s.length>15));}
 assert.equal(q.review.publication,'draft');assert.equal(q.review.tamilEditorial,'pending');
}
assert.equal(ledger.chapters.length,12);
assert.equal(ledger.items.length,4);
assert.equal(ledger.inventoryComplete,false);
assert.equal(ledger.chapters[0].liveVerified,0);
console.log('PASS Grade 11 Chapter 1 Exercise 1.1 Q1(i–iv) bilingual drafts, mathematics, provenance, and conservative publication gates');
