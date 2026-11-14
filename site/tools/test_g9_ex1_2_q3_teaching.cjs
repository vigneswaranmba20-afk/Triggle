'use strict';
// Staged teaching content gate: no student release is authorized by this test.
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const root=path.resolve(__dirname,'../..');
const read=p=>fs.readFileSync(path.join(root,p),'utf8');
const source=JSON.parse(read('site/data/textbook-fidelity/g9-ch1-ex1-2-q3-source.json'));
const teaching=JSON.parse(read('docs/curriculum/grade-9/candidates/g9-ch1-ex1-2-q3-teaching-en.json'));
assert.equal(teaching.status,'staged-not-live');
assert.equal(teaching.language,'en');
assert.equal(teaching.tamilEditorial,'deferred');
assert.equal(teaching.teacherReview,'deferred');
assert.equal(teaching.rows.length,4);
assert.deepEqual(teaching.rows.map(r=>r.id),source.rows.map(r=>r.id));
assert.deepEqual(teaching.rows.map(r=>r.answer),source.rows.map(r=>r.classification));
for(const row of teaching.rows){
 assert(['Easy','Medium','Difficult'].includes(row.difficulty));
 assert(row.steps.length>=3);
 for(const step of row.steps){
  assert(step.why.length>=25,'Why-step must explain a mathematical reason');
  assert(step.latex.length>=3);
  assert(!/\$|\\\\|<[^>]+>/.test(step.latex),'Use raw KaTeX expressions, not Markdown/HTML');
 }
}
assert(teaching.rows[0].steps.some(s=>s.latex.includes('n(A)=5')));
assert(teaching.rows[1].steps.some(s=>s.latex.includes('n(D)=3')));
assert(teaching.rows[2].steps.some(s=>s.latex.includes('X=Y')));
assert(teaching.rows[3].steps.some(s=>s.latex.includes('n(G)=n(H)=6')));
assert(!read('site/index.html').includes('g9-ch1-ex1-2-q3-teaching-en.json'));
assert(!read('site/service-worker.js').includes('g9-ch1-ex1-2-q3-teaching-en.json'));
console.log('PASS: four authored Q3 English KaTeX/Why-step candidates; classifications and IDs source-aligned; Tamil and teacher deferred; not student-facing.');
