'use strict';
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const root=path.join(__dirname,'../data/textbook-exercises');
const q=JSON.parse(fs.readFileSync(path.join(root,'g10-ch1-ex1-1-q6i.json'),'utf8'));
const product=(a,b)=>a.flatMap(x=>b.map(y=>[x,y]));
const sorted=x=>x.map(p=>JSON.stringify(p)).sort();
const unique=x=>[...new Set(x.map(p=>JSON.stringify(p)))].sort();
assert.equal(q.id,'g10-ch1-ex1-1-q6i');
assert.deepEqual(q.answers.A,[0,1]);assert.deepEqual(q.answers.B,[2,3,4]);assert.deepEqual(q.answers.C,[3,5]);
assert.deepEqual(q.answers.BunionC,[2,3,4,5]);
assert.deepEqual(sorted(q.answers.left),sorted(product(q.answers.A,q.answers.BunionC)));
assert.deepEqual(sorted(q.answers.AxB),sorted(product(q.answers.A,q.answers.B)));
assert.deepEqual(sorted(q.answers.AxC),sorted(product(q.answers.A,q.answers.C)));
assert.deepEqual(sorted(q.answers.right),unique([...q.answers.AxB,...q.answers.AxC]));
assert.deepEqual(sorted(q.answers.left),sorted(q.answers.right));
assert.equal(q.answers.left.length,8);
for(const step of q.steps){assert.ok(step.en.length>10 && step.ta.length>10 && step.equation.length>5);}
assert.equal(q.source.english.driveFileId,'13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of');
assert.equal(q.source.tamil.driveFileId,'1BLAJHjMzbBuYesS2qL6NDEl7Tf3xmNBC');
for(const medium of ['english','tamil']){
  assert.equal(q.source[medium].printedPage,6);
  assert.equal(q.source[medium].pdfPage,12);
  assert.equal(q.source.fidelity[medium+'ExactQuestionVerified'],false,'Do not claim textbook-exact source before page-image review');
  assert.equal(q.source.fidelity[medium+'PageImageVerified'],false);
}
assert.ok(q.questionParaphrase && !q.questionExact,'Draft paraphrase must not masquerade as exact textbook question');
assert.equal(q.review.sourceVerified,false,'PDF glyph review must not be falsely marked complete');
assert.equal(q.review.tamilEditorial,'pending');
assert.equal(q.review.merged,false);
const preview=fs.readFileSync(path.join(__dirname,'../grade-10/cartesian-preview.html'),'utf8');
assert.match(preview,/g10-ch1-ex1-1-q6i/);
assert.match(preview,/Source notation pending visual verification/);
const js=preview.match(/<script>([\s\S]*?)<\/script>/);
assert.ok(js);
new Function(js[1]);
console.log('Grade 10 Q6(i): exact finite-set enumeration, bilingual fields, review flags and preview syntax PASS');
