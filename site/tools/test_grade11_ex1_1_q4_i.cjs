'use strict';
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const q=JSON.parse(fs.readFileSync(path.resolve(__dirname,'../data/textbook-exercises/g11-ch1-ex1-1-q4-i.json'),'utf8')).questions[0];
assert.equal(q.id,'g11-ch1-ex1.1-q4-i');
assert.deepEqual(q.source.page,{en:7,ta:10});
assert.deepEqual(q.source.pdfPage,{en:15,ta:18});
assert.equal(q.review.mathematics,'independently checked');
assert.equal(q.review.tamilEditorial,'pending');
for(const lang of ['en','ta']){
 assert.ok(q.prompt[lang].length>40);
 assert.ok(q.steps[lang].length>=5);
 assert.ok(q.steps[lang].every(s=>s.length>20));
 assert.ok(q.answer[lang].length>30);
}
const product=(A,B)=>new Set(A.flatMap(a=>B.map(b=>JSON.stringify([a,b]))));
const intersection=(A,B)=>new Set([...A].filter(x=>B.has(x)));
const equal=(A,B)=>A.size===B.size&&[...A].every(x=>B.has(x));
for(const A of [[],[1],[1,2],[1,2,3]]){
 for(const B of [[],['a'],['a','b'],['b','c']]){
  for(const C of [[],['b'],['a','c'],['a','b','c']]){
   const lhs=product(A,[...intersection(new Set(B),new Set(C))]);
   const rhs=intersection(product(A,B),product(A,C));
   assert.ok(equal(lhs,rhs),JSON.stringify({A,B,C}));
  }
 }
}
const A=[1,2],B=['a','b'],C=['b','c'];
assert.deepEqual([...product(A,[...intersection(new Set(B),new Set(C))])].sort(),['[1,"b"]','[2,"b"]']);
const html=fs.readFileSync(path.resolve(__dirname,'../grade-11/sets-q4-i-preview.html'),'utf8');
assert.ok(html.includes('g11-ch1-ex1-1-q4-i.json'));
console.log('PASS Grade 11 Q4(i) bilingual metadata and 64 independent Cartesian-product cases');
