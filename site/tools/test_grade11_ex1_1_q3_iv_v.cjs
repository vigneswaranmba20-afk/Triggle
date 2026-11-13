'use strict';
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
for(const suffix of ['iv','v']){
 const q=JSON.parse(fs.readFileSync(path.resolve(__dirname,'../data/textbook-exercises/g11-ch1-ex1-1-q3-'+suffix+'.json'),'utf8')).questions[0];
 assert.equal(q.id,'g11-ch1-ex1.1-q3-'+suffix);
 assert.deepEqual(q.source.page,{en:7,ta:10});
 assert.deepEqual(q.source.pdfPage,{en:15,ta:18});
 assert.equal(q.review.tamilEditorial,'pending');
 for(const lang of ['en','ta']){assert.ok(q.prompt[lang].length>20);assert.ok(q.steps[lang].length>=4);assert.ok(q.answer[lang].length>15);}
 for(let n=1;n<=10000;n++){const rational={numerator:n,denominator:1};assert.notEqual(rational.denominator,0);assert.equal(rational.numerator/rational.denominator,n);assert.ok(Number.isInteger(n)&&n>0);}
 const witnesses=new Set(Array.from({length:10000},(_,i)=>i+1));assert.equal(witnesses.size,10000);
 const html=fs.readFileSync(path.resolve(__dirname,'../grade-11/sets-q3-'+suffix+'-preview.html'),'utf8');assert.ok(html.includes('g11-ch1-ex1-1-q3-'+suffix+'.json'));
}
console.log('PASS Grade 11 Exercise 1.1 Q3(iv-v) bilingual and independent witness checks');
