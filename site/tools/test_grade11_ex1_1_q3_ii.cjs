'use strict';
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const data=JSON.parse(fs.readFileSync(path.join(__dirname,'../data/textbook-exercises/g11-ch1-ex1-1-q3-ii.json'),'utf8'));
assert.equal(data.grade,11);assert.equal(data.exercise,'1.1');assert.equal(data.questions.length,1);
const q=data.questions[0];assert.equal(q.id,'g11-ch1-ex1.1-q3-ii');assert.equal(q.subpart,'ii');
assert.equal(q.source.edition,'2025 revised');assert.equal(q.source.page.en,7);assert.equal(q.source.page.ta,9);
for(const lang of ['en','ta']){assert.ok(q.prompt[lang].length>20);assert.equal(q.steps[lang].length,5);assert.ok(q.answer[lang].length>10);}
assert.equal(q.review.mathematics,'independently checked');assert.equal(q.review.tamilEditorial,'pending');
const isPrime=n=>{if(n<2)return false;for(let d=2;d*d<=n;d++)if(n%d===0)return false;return true;};
for(const primes of [[3],[3,5],[3,5,7],[3,5,7,11,13]]) {
  const N=2n*primes.reduce((a,b)=>a*BigInt(b),1n)+1n;
  assert.ok(N>1n && N%2n===1n);
  for(const p of primes)assert.equal(N%BigInt(p),1n);
  let factor=null;
  for(let d=3n;d*d<=N;d+=2n){if(N%d===0n){factor=d;break;}}
  const divisor=factor??N;
  assert.ok(divisor>2n && divisor%2n===1n && isPrime(Number(divisor)));
  assert.ok(!primes.includes(Number(divisor)));
}
const preview=fs.readFileSync(path.join(__dirname,'../grade-11/sets-q3-ii-preview.html'),'utf8');
assert.ok(preview.includes('g11-ch1-ex1-1-q3-ii.json'));
assert.ok(preview.includes('aria-pressed') && preview.includes('role="alert"'));
console.log('Grade 11 Exercise 1.1 Q3(ii) bilingual schema and independent Euclid constructions passed.');
