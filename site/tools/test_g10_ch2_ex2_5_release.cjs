'use strict';
/* Release regression for source-reviewed Grade 10 Ex 2.5 (English). */
const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const {loadRuntime}=require('./curriculum_bulk.cjs');
const html=fs.readFileSync('site/index.html','utf8'),sw=fs.readFileSync('site/service-worker.js','utf8');
const file='site/data/textbook-exercises/g10-ch2-ex2-5-ap-missing-en.js';
assert(html.includes('g10-ch2-ex2-5-ap-missing-en.js'),'Student module must be loaded');
assert(sw.includes('./data/textbook-exercises/g10-ch2-ex2-5-ap-missing-en.js'),'Must work offline');
const audit=JSON.parse(fs.readFileSync('docs/curriculum/grade-10/trace/g10-ch2-ex2-5-source-audit-20261115.json','utf8'));
assert.equal(audit.numberedQuestions,14);
assert.equal(audit.uniqueSubpartTasks,21);
assert.equal(audit.tasks.length,21);
assert.equal(new Set(audit.tasks.map(x=>x.id)).size,21);
const runtime=loadRuntime();
const records=runtime.classes[10].items.filter(x=>String(x.chapter)==='2'&&x.exercise==='2.5'&&x.kind==='textbook');
const expected=['q1-i','q1-v','q2-iii','q3-i','q3-ii','q8'].map(s=>'c10-2-ex2-5-'+s);
assert.equal(records.length,21,'All 21 textbook tasks must be in student app');
const ids=new Set(records.map(x=>x.id));assert.equal(ids.size,21,'No duplicate IDs');
for(const t of audit.tasks)assert(ids.has(t.id),'Absent textbook part: '+t.id);
for(const id of expected){const row=records.find(x=>x.id===id);assert(row,'Missing newly released '+id);assert.equal(row.translationReview,'pending');assert(row.q.en.length>30);assert(row.steps.length>=3);assert(row.steps.every(s=>s.math?.latex&&s.math?.fallback===s.eq));}
assert.equal(records.filter(x=>!expected.includes(x.id)).length,15,'Preserve 15 earlier tasks');
const k=4;assert.equal(2*(18-k),(3+k)+(5*k+1));
for(const a of [-40,0,1,8.5,100])assert.equal((a-5)-(a-3),(a-7)-(a-5));
assert.deepEqual([0,1,2,3].map(x=>3/4+x/2),[3/4,5/4,7/4,9/4]);
const c={window:{TRIGGLE_CLASSES:runtime.classes,TRIGGLE_CURRICULUM:runtime.curriculum}};
assert.throws(()=>vm.runInNewContext(fs.readFileSync(file,'utf8'),c,{timeout:5000}),/Duplicate Grade 10 Exercise 2\.5 student ID/);
console.log('PASS English Exercise 2.5 has 21 of 21 source-audited tasks, six new unique parts, correct arithmetic and offline import; Tamil pending');
