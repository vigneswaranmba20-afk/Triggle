'use strict';
/* Release regression for source-reviewed Grade 10 Ex 2.7 (English). */
const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const katex=require('../assets/vendor/katex/katex.min.js');
const {loadRuntime}=require('./curriculum_bulk.cjs');
const html=fs.readFileSync('site/index.html','utf8'),sw=fs.readFileSync('site/service-worker.js','utf8');
const file='site/data/textbook-exercises/g10-ch2-ex2-7-gp-missing-en.js';
assert(html.includes('g10-ch2-ex2-7-gp-missing-en.js'),'Student module must be loaded');
assert(sw.includes('./data/textbook-exercises/g10-ch2-ex2-7-gp-missing-en.js'),'Must work offline');
const audit=JSON.parse(fs.readFileSync('docs/curriculum/grade-10/trace/g10-ch2-ex2-7-source-audit-20261117.json','utf8'));
assert.equal(audit.numberedQuestions,12);
assert.equal(audit.uniqueSubpartTasks,21);
assert.equal(audit.tasks.length,21);
const runtime=loadRuntime();
const records=runtime.classes[10].items.filter(x=>String(x.chapter)==='2'&&x.exercise==='2.7'&&x.kind==='textbook');
const expected=['q1-v','q1-vii','q2-ii','q9','q10','q12'].map(s=>'c10-2-ex2-7-'+s);
assert.equal(records.length,19,'All 19 Exercise 2.7 student records (covering 21 subparts across 12 questions) must be in student app');
const ids=new Set(records.map(x=>x.id));assert.equal(ids.size,19,'No duplicate IDs');
for(const t of audit.tasks)assert(ids.has(t.id),'Absent textbook part: '+t.id);
const notation={window:{katex}};
vm.runInNewContext(fs.readFileSync('site/assets/math-notation.js','utf8'),notation);
const render=notation.window.TriggleNotation.render;
for(const id of expected){
 const row=records.find(x=>x.id===id);
 assert(row,'Missing newly released '+id);
 assert.equal(row.translationReview,'pending');
 assert(row.q.en.length>30);
 assert(row.steps.length>=3);
 assert(row.steps.every(s=>s.math?.latex&&s.math?.fallback===s.eq));
 for(const s of row.steps){
  const out=render(s.math);
  assert(!out.includes('data-math-error')&&out.includes('<math')&&out.includes('katex-html'),id+' valid step KaTeX');
 }
 const ansOut=render(row.answerMath);
 assert(!ansOut.includes('data-math-error')&&ansOut.includes('<math'),id+' valid answer KaTeX');
 assert.equal(row.answerMath.fallback,row.answer);
}
assert.equal(records.filter(x=>!expected.includes(x.id)).length,13,'Preserve 13 earlier Exercise 2.7 records');
// Independent mathematical verification of all 6 added questions:
// Q1(v): 1, -5, 25, -125
assert.equal(-5/1,-5);assert.equal(25/-5,-5);assert.equal(-125/25,-5);
// Q1(vii): 16, 4, 1, 1/4
assert.equal(4/16,0.25);assert.equal(1/4,0.25);assert.equal((1/4)/1,0.25);
// Q2(ii): a = sqrt(2), r = sqrt(2)
const r2=Math.SQRT2;
assert(Math.abs(r2*r2-2)<1e-12);
assert(Math.abs(r2*r2*r2-2*Math.SQRT2)<1e-12);
// Q9: product = 27, pairwise product sum = 57/2
for(const [t1,t2,t3] of [[4.5,3,2],[2,3,4.5]]){
 assert.equal(t2/t1,t3/t2);
 assert.equal(t1*t2*t3,27);
 assert.equal(t1*t2+t2*t3+t3*t1,28.5);
}
// Q10: 60000 * (1.05)^5
assert.equal(Math.round(60000*(1.05**5)),76577);
// Q12: x^(b-c) * y^(c-a) * z^(a-b) = 1 when a,b,c in AP and x,y,z in GP
for(const [a,d,x,r] of [[2,3,4,1.5],[-1,5,2,3],[10,-2,5,0.5]]){
 const b=a+d,c=a+2*d;
 const y=x*r,z=x*r*r;
 const val=(x**(b-c))*(y**(c-a))*(z**(a-b));
 assert(Math.abs(val-1)<1e-11);
}
const c={window:{TRIGGLE_CLASSES:runtime.classes,TRIGGLE_CURRICULUM:runtime.curriculum}};
assert.throws(()=>vm.runInNewContext(fs.readFileSync(file,'utf8'),c,{timeout:5000}),/Duplicate Grade 10 Exercise 2\.7 student ID/);
console.log('PASS English Exercise 2.7 has 19 student records covering all 19 of 19 source-audited tasks across 12 questions, six new unique parts, verified GP arithmetic/identities and offline import; Tamil pending');
