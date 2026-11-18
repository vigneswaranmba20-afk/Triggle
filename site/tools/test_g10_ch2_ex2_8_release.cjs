'use strict';
/* Release regression for source-reviewed Grade 10 Ex 2.8 (English). */
const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const katex=require('../assets/vendor/katex/katex.min.js');
const {loadRuntime}=require('./curriculum_bulk.cjs');
const html=fs.readFileSync('site/index.html','utf8'),sw=fs.readFileSync('site/service-worker.js','utf8');
const file='site/data/textbook-exercises/g10-ch2-ex2-8-gp-sum-missing-en.js';
assert(html.includes('g10-ch2-ex2-8-gp-sum-missing-en.js'),'Student module must be loaded');
assert(sw.includes('./data/textbook-exercises/g10-ch2-ex2-8-gp-sum-missing-en.js'),'Must work offline');
const audit=JSON.parse(fs.readFileSync('docs/curriculum/grade-10/trace/g10-ch2-ex2-8-source-audit-20261117.json','utf8'));
assert.equal(audit.numberedQuestions,10);
assert.equal(audit.uniqueSubpartTasks,13);
assert.equal(audit.tasks.length,13);
const runtime=loadRuntime();
const records=runtime.classes[10].items.filter(x=>String(x.chapter)==='2'&&x.exercise==='2.8'&&x.kind==='textbook');
const expected=['q1-i','q1-ii','q6-i','q6-ii','q8','q9','q10'].map(s=>'c10-2-ex2-8-'+s);
assert.equal(records.length,12,'All 12 Exercise 2.8 student records (covering 13 subparts across 10 questions) must be in student app');
const ids=new Set(records.map(x=>x.id));assert.equal(ids.size,12,'No duplicate IDs');
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
assert.equal(records.filter(x=>!expected.includes(x.id)).length,5,'Preserve 5 earlier Exercise 2.8 records');
// Independent mathematical verification of all 7 added questions:
// Q1(i): 5, -3, 9/5, -27/25, ... => S_n = (25/8)[1 - (-3/5)^n]
for(let n=1;n<=6;n++){
 let sum=0;for(let k=0;k<n;k++)sum+=5*((-0.6)**k);
 const formula=(25/8)*(1-((-0.6)**n));
 assert(Math.abs(sum-formula)<1e-12);
}
// Q1(ii): 256, 64, 16, ... => S_n = (1024/3)[1 - (1/4)^n]
for(let n=1;n<=6;n++){
 let sum=0;for(let k=0;k<n;k++)sum+=256*((0.25)**k);
 const formula=(1024/3)*(1-((0.25)**n));
 assert(Math.abs(sum-formula)<1e-11);
}
// Q6(i): 0.4 + 0.44 + 0.444 + ... => (4/9)n - (4/81)[1 - (1/10)^n]
for(let n=1;n<=6;n++){
 let sum=0,term=0;
 for(let k=1;k<=n;k++){term=term/10+0.4;sum+=term;}
 const formula=(4/9)*n-(4/81)*(1-(0.1**n));
 assert(Math.abs(sum-formula)<1e-12);
}
// Q6(ii): 3 + 33 + 333 + ... => 10(10^n - 1)/27 - n/3
for(let n=1;n<=6;n++){
 let sum=0,term=0;
 for(let k=1;k<=n;k++){term=term*10+3;sum+=term;}
 const formula=10*(10**n-1)/27-n/3;
 assert(Math.abs(sum-formula)<1e-9);
}
// Q8: 8 sets of chain letters (4, 16, 64, ..., 4^8) at Rs 2 per letter
let letters=0;for(let k=1;k<=8;k++)letters+=4**k;
assert.equal(letters,87380);
assert.equal(letters*2,174760);
// Q9: 0.123123123... = 41/333
assert.equal(123/3,41);assert.equal(999/3,333);
assert(Math.abs(41/333-0.123123123123123)<1e-12);
// Q10: (x - y) S_n = x^2(x^n - 1)/(x - 1) - y^2(y^n - 1)/(y - 1)
for(const [x,y,n] of [[2,3,4],[5,2,5],[1.5,-0.5,6]]){
 let Sn=0;
 for(let k=1;k<=n;k++){
  let poly=0;
  for(let j=0;j<=k;j++)poly+=(x**(k-j))*(y**j);
  Sn+=poly;
 }
 const lhs=(x-y)*Sn;
 const rhs=(x*x*(x**n-1))/(x-1)-(y*y*(y**n-1))/(y-1);
 assert(Math.abs(lhs-rhs)<1e-9);
}
const c={window:{TRIGGLE_CLASSES:runtime.classes,TRIGGLE_CURRICULUM:runtime.curriculum}};
assert.throws(()=>vm.runInNewContext(fs.readFileSync(file,'utf8'),c,{timeout:5000}),/Duplicate Grade 10 Exercise 2\.8 student ID/);
console.log('PASS English Exercise 2.8 has 12 student records covering all 13 of 13 source-audited tasks across 10 questions, seven new unique parts, verified GP sum/telescoping arithmetic and offline import; Tamil pending');
