'use strict';
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const q=JSON.parse(fs.readFileSync(path.resolve(__dirname,'../data/textbook-exercises/g11-ch1-ex1-1-q4-ii.json'),'utf8')).questions[0];
assert.equal(q.id,'g11-ch1-ex1.1-q4-ii');
assert.deepEqual(q.source.page,{en:7,ta:10});
assert.deepEqual(q.source.pdfPage,{en:15,ta:18});
assert.equal(q.review.mathematics,'independently checked');
assert.equal(q.review.tamilEditorial,'pending');
assert.equal(q.source.tamilGlyphsVisuallyConfirmed,false);
for(const lang of ['en','ta']){
 assert.ok(q.prompt[lang].length>40);
 assert.ok(q.steps[lang].length>=6);
 assert.ok(q.steps[lang].every(s=>s.length>25));
 assert.ok(q.answer[lang].length>30);
}
const product=(A,B)=>new Set(A.flatMap(a=>B.map(b=>JSON.stringify([a,b]))));
const union=(A,B)=>new Set([...A,...B]);
const equal=(A,B)=>A.size===B.size&&[...A].every(x=>B.has(x));
let cases=0;
for(const A of [[],[1],[1,2],[1,2,3]])for(const B of [[],['a'],['a','b'],['b','c']])for(const C of [[],['b'],['a','c'],['a','b','c']]){
 const lhs=product(A,[...union(new Set(B),new Set(C))]);
 const rhs=union(product(A,B),product(A,C));
 assert.ok(equal(lhs,rhs),JSON.stringify({A,B,C}));cases++;
}
assert.equal(cases,64);
const A=[1,2],B=['a','b'],C=['b','c'];
assert.deepEqual([...product(A,[...union(new Set(B),new Set(C))])].sort(),['[1,"a"]','[1,"b"]','[1,"c"]','[2,"a"]','[2,"b"]','[2,"c"]']);
const html=fs.readFileSync(path.resolve(__dirname,'../grade-11/sets-q4-ii-preview.html'),'utf8');
assert.ok(html.includes('g11-ch1-ex1-1-q4-ii.json'));
console.log('PASS Grade 11 Q4(ii) bilingual metadata and '+cases+' independent Cartesian union cases');
