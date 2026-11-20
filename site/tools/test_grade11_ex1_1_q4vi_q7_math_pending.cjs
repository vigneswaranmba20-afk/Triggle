'use strict';
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const d=JSON.parse(fs.readFileSync(path.join(__dirname,'../../docs/coverage/grade-11-ex1-1-q4vi-q7-math-drafts-2026-11-09.json'),'utf8'));
assert.equal(d.grade,11);assert.equal(d.items.length,4);
assert.equal(new Set(d.items.map(x=>x.id)).size,4);
assert.deepEqual(d.items.map(x=>x.id),['g11-ch1-ex1.1-q4-vi','g11-ch1-ex1.1-q5','g11-ch1-ex1.1-q6','g11-ch1-ex1.1-q7']);
assert(d.items.every(x=>x.mathChecked && !x.sourceExact && x.stepsEnglish.length>=4));
assert.equal(d.releaseEligible,false);assert.equal(d.studentFacingRegistered,false);
assert.equal(d.source.englishPageImageChecked,false);assert.equal(d.source.tamilPageImageChecked,false);
assert.equal(2**10,1024);assert.equal(2**5,32);assert.equal(10+5-15,0);
assert.equal(2**(10-3),128);
for(let a=0;a<256;a++)for(let b=0;b<256;b++)for(let c=0;c<256;c++){
  const left=((b&~a)|c)&255;
  const right=((b|c)&~(a&~c))&255;
  assert.equal(left,right);
}
console.log('Grade 11 Q4(vi), Q5-Q7 mathematical and release guards PASS');
