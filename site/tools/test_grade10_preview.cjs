/* Grade 10 preview contract: run node site/tools/test_grade10_preview.cjs */
'use strict';
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const site=path.resolve(__dirname,'..');
const html=fs.readFileSync(path.join(site,'grade-10/cartesian-preview.html'),'utf8');
const root=path.join(site,'data/textbook-exercises');
const ids=['g10-ch1-ex1-1-q1i','g10-ch1-ex1-1-q1ii','g10-ch1-ex1-1-q1iii'];
const q2id='g10-ch1-ex1-1-q2';
const ledger=JSON.parse(fs.readFileSync(path.join(root,'grade-10-coverage-2025.json'),'utf8'));
assert.match(html,/<meta name="viewport"/);
assert.match(html,/<html lang="en">/);
assert.match(html,/aria-pressed="true"/);
assert.match(html,/aria-live="polite"/);
assert.match(html,/role="alert"/);
assert.match(html,/addEventListener\('click'/);
assert.match(html,/id="retry" hidden/);
assert.match(html,/retry\.addEventListener\('click',loadLessons\)/);
assert.match(html,/async function loadLessons\(/);
assert.match(html,/retry\.hidden=false/);
assert.match(html,/function validLesson\(q,id\)/);
assert.match(html,/q\.review\?\.sourceVerified===true/);
assert.match(html,/q\.review\?\.mathVerified===true/);
assert.doesNotMatch(html,/q\.review\?\.merged===false/);
assert.match(html,/Array\.isArray\(q\.steps\)/);
assert.match(html,/q\.chapter===1/);
assert.match(html,/q\.exercise==='1\.1'/);
assert.match(html,/q\.source\?\.edition==='2025 revised'/);
assert.match(html,/Number\.isInteger\(q\.source\?\.english\?\.pdfPage\)/);
assert.match(html,/\['AxB','AxA','BxA'\]\.every/);
assert.match(html,/className='pair-grid'/);
assert.match(html,/∅ — no ordered pairs/);
assert.match(html,/setAttribute\('role','list'\)/);
assert.match(html,/setAttribute\('role','listitem'\)/);
assert.match(html,/errorText\[lang\]/);
assert.match(html,/பாடங்களை மீண்டும் ஏற்றுக/);
assert.match(html,/textContent=text/);
assert.doesNotMatch(html,/innerHTML|eval\(/);
assert.match(html,/Promise\.all\(ids\.map\(id=>fetch/);
assert.match(html,/Tamil human editorial review pending/);
assert.match(html,/\.\.\/data\/textbook-exercises\//);
assert.deepEqual(ledger.chapters.map(x=>x.chapter),[1,2,3,4,5,6,7,8]);
for(const id of ids){
 assert.ok(html.includes(id),id+' must be requested by preview');
 const q=JSON.parse(fs.readFileSync(path.join(root,id+'.json'),'utf8'));
 assert.equal(q.id,id);assert.equal(q.grade,10);
 assert.equal(q.review.sourceVerified,true);assert.equal(q.review.mathVerified,true);
 assert.equal(q.review.tamilEditorial,'pending');
 assert.equal(q.review.merged,false);assert.equal(q.review.liveVerified,false);
 assert.ok(ledger.chapters[0].verifiedQuestionSubparts.includes('1('+q.subpart+')'));
 assert.equal(q.steps.length,4);
 const A=q.subpart==='i'?[2,-2,3]:q.subpart==='ii'?['p','q']:['m','n'];
 const B=q.subpart==='i'?[1,-4]:q.subpart==='ii'?['p','q']:[];
 const cart=(left,right)=>left.flatMap(a=>right.map(b=>[a,b]));
 for(const [key,expected] of Object.entries({AxB:cart(A,B),AxA:cart(A,A),BxA:cart(B,A)})){
  assert.deepEqual(q.answers[key],expected,`${id} ${key} must enumerate every ordered pair exactly once`);
  assert.equal(new Set(q.answers[key].map(pair=>JSON.stringify(pair))).size,expected.length);
 }
 for(const s of q.steps){assert.ok(s.en&&s.ta&&s.equation);}
 for(const lang of ['english','tamil']){assert.equal(q.source[lang].printedPage,6);assert.equal(q.source[lang].pdfPage,12);}
}
assert.ok(html.includes(q2id),'Q2 must be loaded by preview');
const q2=JSON.parse(fs.readFileSync(path.join(root,q2id+'.json'),'utf8'));
assert.equal(q2.question,'2');assert.equal(q2.subpart,null);
assert.equal(q2.review.mathVerified,true);assert.equal(q2.review.tamilEditorial,'pending');
assert.ok(ledger.chapters[0].verifiedQuestionSubparts.includes('2'));
const q2A=[1,2,3],q2B=[2,3,5,7];
const q2cross=(left,right)=>left.flatMap(a=>right.map(b=>[a,b]));
assert.deepEqual(q2.answers.AxB,q2cross(q2A,q2B));
assert.deepEqual(q2.answers.BxA,q2cross(q2B,q2A));
assert.equal(q2.answers.AxB.length,12);assert.equal(q2.answers.BxA.length,12);
assert.equal(new Set(q2.answers.AxB.map(JSON.stringify)).size,12);
assert.equal(new Set(q2.answers.BxA.map(JSON.stringify)).size,12);
for(const step of q2.steps)assert.ok(step.en&&step.ta&&step.equation);
for(const language of ['english','tamil']){assert.equal(q2.source[language].printedPage,6);assert.equal(q2.source[language].pdfPage,12);}
console.log('PASS Grade 10 bilingual preview content, accessibility markup, and coverage contract');
