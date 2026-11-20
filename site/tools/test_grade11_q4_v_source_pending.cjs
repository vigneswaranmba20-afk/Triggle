'use strict';
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const data=JSON.parse(fs.readFileSync(path.join(__dirname,'../data/textbook-exercises/g11-ch1-ex1-1-q4-v-source-pending.json'),'utf8'));
const q=data.questions[0];
assert.equal(q.id,'g11-ch1-ex1.1-q4-v');
assert.equal(q.source.page.en,7);assert.equal(q.source.pdfPage.en,15);
assert.equal(q.source.sourceExact,false);assert.equal(q.source.pageImagesVisuallyChecked.en,false);
assert.equal(q.review.tamilEditorial,'pending');assert.equal(q.prompt.ta,null);
assert.ok(q.steps.en.length>=6);assert.equal(q.review.publication,'source-pending-unmerged');
const diff=(a,b)=>a.filter(x=>!b.includes(x));
const intersection=(a,b)=>a.filter(x=>b.includes(x));
const same=(a,b)=>JSON.stringify([...a].sort())===JSON.stringify([...b].sort());
for(let a=0;a<256;a++)for(let b=0;b<256;b++)for(let c=0;c<256;c++){
 const A=Array.from({length:8},(_,i)=>i).filter(i=>a&(1<<i));
 const B=Array.from({length:8},(_,i)=>i).filter(i=>b&(1<<i));
 const C=Array.from({length:8},(_,i)=>i).filter(i=>c&(1<<i));
 const left=intersection(diff(B,A),C);
 assert.ok(same(left,diff(intersection(B,C),A)));
 assert.ok(same(left,intersection(B,diff(C,A))));
}
console.log('Grade 11 Q4(v): 16,777,216 exhaustive triples passed; source remains pending image verification.');
