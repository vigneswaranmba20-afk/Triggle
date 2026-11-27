/* Grade 10: neither restatements nor supplementary examples are textbook-exact. */
'use strict';
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const site=path.resolve(__dirname,'..');
const html=fs.readFileSync(path.join(site,'grade-10/cartesian-preview.html'),'utf8');
assert.match(html,/Learning restatement — not a verified verbatim textbook transcription:/);
assert.match(html,/கற்றலுக்கான மறுவடிவாக்கம்/);
assert.match(html,/article\.append\(el\('p',q\.questionParaphrase\[lang\]\)\)/);
assert.match(html,/Source notation pending visual verification/);
const files=fs.readdirSync(path.join(site,'data/textbook-exercises')).filter(x=>/^g10-ch1-ex1-1-q.*\.json$/.test(x));
assert.ok(files.length>=8,'Expected current preview lesson records');
for(const name of files){
 const q=JSON.parse(fs.readFileSync(path.join(site,'data/textbook-exercises',name),'utf8'));
 assert.equal(q.grade,10,name);
 assert.equal(q.source.edition,'2025 revised',name);
 if(q.classification?.includes('supplementary')){
  assert.match(q.classification,/NOT textbook-exact/,name);
  assert.equal(q.source.exactQuestionVerified,false,name);
  assert.ok(q.title?.en && q.title?.ta,name);
  assert.match(q.note,/not an assertion that the source question/,name);
  assert.equal(q.review.sourceVerified,false,name);
 }else{
  assert.ok(q.questionParaphrase?.en && q.questionParaphrase?.ta,name);
 }
 assert.equal(q.review.tamilEditorial,'pending',name);
 assert.notEqual(q.review.liveVerified,true,name);
 assert.notEqual(q.review.merged,true,name);
 if(q.source.fidelity?.englishExactQuestionVerified===false || q.source.fidelity?.tamilExactQuestionVerified===false){
  assert.notEqual(q.review.liveVerified,true,name);
 }
}
console.log('PASS Grade 10 preview distinguishes supplementary examples, restatements and source-exact questions');
