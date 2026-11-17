'use strict';
/* Release regression for source-reviewed Grade 10 Ex 2.6 (English). */
const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const katex=require('../assets/vendor/katex/katex.min.js');
const {loadRuntime}=require('./curriculum_bulk.cjs');
const html=fs.readFileSync('site/index.html','utf8'),sw=fs.readFileSync('site/service-worker.js','utf8');
const file='site/data/textbook-exercises/g10-ch2-ex2-6-ap-sum-missing-en.js';
assert(html.includes('g10-ch2-ex2-6-ap-sum-missing-en.js'),'Student module must be loaded');
assert(sw.includes('./data/textbook-exercises/g10-ch2-ex2-6-ap-sum-missing-en.js'),'Must work offline');
const audit=JSON.parse(fs.readFileSync('docs/curriculum/grade-10/trace/g10-ch2-ex2-6-source-audit-20261117.json','utf8'));
assert.equal(audit.numberedQuestions,12);
assert.equal(audit.uniqueSubpartTasks,16);
assert.equal(audit.tasks.length,16);
const runtime=loadRuntime();
const records=runtime.classes[10].items.filter(x=>String(x.chapter)==='2'&&x.exercise==='2.6'&&x.kind==='textbook');
const expected=['q1-iii','q3','q4','q11','q12'].map(s=>'c10-2-ex2-6-'+s);
assert.equal(records.length,13,'All 13 Exercise 2.6 student records (covering 16 subparts across 12 questions) must be in student app');
const ids=new Set(records.map(x=>x.id));assert.equal(ids.size,13,'No duplicate IDs');
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
assert.equal(records.filter(x=>!expected.includes(x.id)).length,8,'Preserve 8 earlier Exercise 2.6 records');
// Independent mathematical verification of all 5 added questions:
// Q1(iii): 6 + 13 + 20 + ... + 97
const q1iiiTerms=[];for(let v=6;v<=97;v+=7)q1iiiTerms.push(v);
assert.equal(q1iiiTerms.length,14);
assert.equal(q1iiiTerms[q1iiiTerms.length-1],97);
assert.equal(q1iiiTerms.reduce((a,b)=>a+b,0),721);
// Q3: sum of first 28 terms of A.P. with t_n = 4n - 3
let q3Sum=0;for(let n=1;n<=28;n++)q3Sum+=4*n-3;
assert.equal(q3Sum,1540);
// Q4: S_n = 2n^2 - 3n => t_n = 4n - 5, constant difference 4
const S=n=>2*n*n-3*n;
for(let n=1;n<=25;n++){
 const tn=n===1?S(1):S(n)-S(n-1);
 assert.equal(tn,4*n-5);
 const tn1=S(n+1)-S(n);
 assert.equal(tn1-tn,4);
}
// Q11: S_1 + S_2 + ... + S_m = 1/2 * m * n * (m*n + 1)
for(const [m,n] of [[1,1],[3,4],[5,7],[8,6]]){
 let total=0;
 for(let k=1;k<=m;k++){
  const ak=k,dk=2*k-1;
  total+=(n/2)*(2*ak+(n-1)*dk);
 }
 assert.equal(total,0.5*m*n*(m*n+1));
}
// Q12: sum of 12 terms of [(a-b)/(a+b) + (3a-2b)/(a+b) + (5a-3b)/(a+b) + ...]
for(const [a,b] of [[3,1],[5,-2],[-4,7],[2.5,1.5]]){
 let sum=0;
 for(let k=1;k<=12;k++)sum+=((2*k-1)*a-k*b)/(a+b);
 const expectedVal=(6/(a+b))*(24*a-13*b);
 assert(Math.abs(sum-expectedVal)<1e-11);
}
const c={window:{TRIGGLE_CLASSES:runtime.classes,TRIGGLE_CURRICULUM:runtime.curriculum}};
assert.throws(()=>vm.runInNewContext(fs.readFileSync(file,'utf8'),c,{timeout:5000}),/Duplicate Grade 10 Exercise 2\.6 student ID/);
console.log('PASS English Exercise 2.6 has 13 student records covering all 16 of 16 source-audited tasks across 12 questions, five new unique parts, verified arithmetic/identities and offline import; Tamil pending');
