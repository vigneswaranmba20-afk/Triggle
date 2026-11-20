'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const lesson = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/textbook-exercises/g10-ch1-ex1-1-q6ii-supplement.json'),'utf8'));
const product = (a,b)=>a.flatMap(x=>b.map(y=>JSON.stringify([x,y])));
const intersect=(a,b)=>a.filter(x=>b.includes(x));
const {A,B,C}=lesson.sets;
const lhs=intersect(product(A,B),product(C,A));
const rhs=product(intersect(A,C),intersect(B,A));
assert.deepEqual(lhs,[]);
assert.deepEqual(rhs,[]);
for(let maskA=0;maskA<16;maskA++) for(let maskB=0;maskB<16;maskB++) for(let maskC=0;maskC<16;maskC++){
 const set=m=>[0,1,2,3].filter(x=>(m&(1<<x))!==0);
 const a=set(maskA),b=set(maskB),c=set(maskC);
 assert.deepEqual(intersect(product(a,b),product(c,a)).sort(),product(intersect(a,c),intersect(b,a)).sort());
}
assert.equal(lesson.source.exactQuestionVerified,false);
assert.equal(lesson.review.sourceVerified,false);
assert.equal(lesson.review.liveVerified,false);
assert.match(lesson.classification,/NOT textbook-exact/);
assert.ok(lesson.steps.length>=4,'expanded worked solution must retain at least four steps');
assert.ok(lesson.steps.some(s=>s.equation.includes('A×B=')),'worked solution must enumerate A×B');
assert.ok(lesson.steps.some(s=>s.equation.includes('C×A=')),'worked solution must enumerate C×A');
for(const s of lesson.steps)for(const k of ['en','ta','equation'])assert.ok(s[k].length>10);
console.log('Grade 10 supplementary Cartesian intersection: 4096 finite-set triples passed; source-fidelity gates preserved.');
