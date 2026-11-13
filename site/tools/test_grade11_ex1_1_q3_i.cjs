'use strict';
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const q=JSON.parse(fs.readFileSync(path.join(__dirname,'../data/textbook-exercises/g11-ch1-ex1-1-q3-i.json'),'utf8')).questions[0];
assert.equal(q.id,'g11-ch1-ex1.1-q3-i');
assert.equal(q.question,3);assert.equal(q.subpart,'i');
assert.deepEqual(q.source.page,{en:7,ta:9});
assert.deepEqual(q.source.pdfPage,{en:15,ta:17});
assert.equal(q.review.tamilEditorial,'pending');
assert.equal(q.review.mathematics,'independently checked');
for(const language of ['en','ta']) {
 assert.ok(q.prompt[language].length>20);
 assert.ok(q.steps[language].length>=4);
 assert.ok(q.steps[language].every(step=>step.trim().length>10));
 assert.match(q.answer[language],/2/);
}
const isPrime=n=>n>=2&&Array.from({length:Math.max(0,Math.floor(Math.sqrt(n))-1)},(_,i)=>i+2).every(d=>n%d!==0);
const evenPrimes=Array.from({length:10000},(_,i)=>i+1).filter(n=>n%2===0&&isPrime(n));
assert.deepEqual(evenPrimes,[2]);
const html=fs.readFileSync(path.join(__dirname,'../grade-11/sets-q3-i-preview.html'),'utf8');
assert.match(html,/g11-ch1-ex1-1-q3-i\.json/);
assert.match(html,/aria-pressed/);
assert.match(html,/role="alert"/);
assert.match(html,/tamilEditorial|editorial review pending/i);
console.log('PASS Grade 11 Ex 1.1 Q3(i) source, bilingual steps, independent prime enumeration and preview');
