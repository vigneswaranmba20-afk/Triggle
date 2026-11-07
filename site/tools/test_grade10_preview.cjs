/* Grade 10 preview contract: run node site/tools/test_grade10_preview.cjs */
'use strict';
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const site=path.resolve(__dirname,'..');
const html=fs.readFileSync(path.join(site,'grade-10/cartesian-preview.html'),'utf8');
const root=path.join(site,'data/textbook-exercises');
const ids=['g10-ch1-ex1-1-q1i','g10-ch1-ex1-1-q1ii'];
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
assert.match(html,/Array\.isArray\(q\.steps\)/);
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
 for(const s of q.steps){assert.ok(s.en&&s.ta&&s.equation);}
 for(const lang of ['english','tamil']){assert.equal(q.source[lang].printedPage,6);assert.equal(q.source[lang].pdfPage,12);}
}
console.log('PASS Grade 10 bilingual preview content, accessibility markup, and coverage contract');
