'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '../..');
const checkpoint = JSON.parse(fs.readFileSync(path.join(root,'docs/coverage/grade-11-ex1-1-q4-iii-source-checkpoint.json'),'utf8'));
assert.equal(checkpoint.grade,11);
assert.equal(checkpoint.exercise,'1.1');
assert.equal(checkpoint.question,4);
assert.equal(checkpoint.subpart,'iii');
assert.equal(checkpoint.source.en.driveFileId,'12u6WLVsxzxvSRUa6KlaQz4vi8cxwZ6xS');
assert.equal(checkpoint.source.ta.driveFileId,'1GMWimYfgDs59fCNkV3pNiLTPt4eDa48A');
assert.equal(checkpoint.source.en.printedPage,7);
assert.equal(checkpoint.source.ta.printedPage,10);
assert.equal(checkpoint.source.en.pdfPage,15);
assert.equal(checkpoint.source.ta.pdfPage,18);
assert.equal(checkpoint.source.en.pageImageChecked,false);
assert.equal(checkpoint.source.ta.pageImageChecked,false);
assert.equal(checkpoint.studentFacingPublished,false);
assert.equal(checkpoint.editorial,'pending');
// Exhaustively verify the Q4(iii) identity for all triples of subsets of a
// four-element universe (16^3 = 4096 cases). No textbook transcription is
// asserted by this mathematical check.
const universe=[0,1,2,3];
const subsets=Array.from({length:16},(_,mask)=>universe.filter((_,i)=>mask&(1<<i)));
const product=(a,b)=>new Set(a.flatMap(x=>b.map(y=>JSON.stringify([x,y]))));
const intersection=(a,b)=>new Set([...a].filter(x=>b.has(x)));
let cases=0;
for(const A of subsets) for(const B of subsets) for(const C of subsets){
  const axb=product(A,B), bxa=product(B,A);
  const left=intersection(axb,bxa);
  const shared=A.filter(x=>B.includes(x));
  const right=product(shared,shared);
  assert.deepEqual([...left].sort(),[...right].sort(),JSON.stringify({A,B,C}));
  cases++;
}
assert.equal(cases,4096);
console.log('PASS Grade 11 Q4(iii) identity: 4096 exhaustive cases; source-image and exact Tamil transcription remain blocked');
