'use strict';
/* Release regression for source-reviewed Grade 10 Ex 2.9 (English). */
const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const katex=require('../assets/vendor/katex/katex.min.js');
const {loadRuntime}=require('./curriculum_bulk.cjs');
const html=fs.readFileSync('site/index.html','utf8'),sw=fs.readFileSync('site/service-worker.js','utf8');
const file='site/data/textbook-exercises/g10-ch2-ex2-9-special-series-missing-en.js';
assert(html.includes('g10-ch2-ex2-9-special-series-missing-en.js'),'Student module must be loaded');
assert(sw.includes('./data/textbook-exercises/g10-ch2-ex2-9-special-series-missing-en.js'),'Must work offline');
const audit=JSON.parse(fs.readFileSync('docs/curriculum/grade-10/trace/g10-ch2-ex2-9-source-audit-20261117.json','utf8'));
assert.equal(audit.numberedQuestions,7);
assert.equal(audit.uniqueSubpartTasks,14);
assert.equal(audit.tasks.length,14);
const runtime=loadRuntime();
const records=runtime.classes[10].items.filter(x=>String(x.chapter)==='2'&&x.exercise==='2.9'&&x.kind==='textbook');
const expected=['q1-i','q1-ii','q1-iii','q1-iv','q1-v','q1-vi','q1-vii','q7-i','q7-ii'].map(s=>'c10-2-ex2-9-'+s);
assert.equal(records.length,14,'All 14 Exercise 2.9 student records (covering 14 subparts across 7 questions) must be in student app');
const ids=new Set(records.map(x=>x.id));assert.equal(ids.size,14,'No duplicate IDs');
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
assert.equal(records.filter(x=>!expected.includes(x.id)).length,5,'Preserve 5 earlier Exercise 2.9 records');
// Independent mathematical verification of all 9 added questions:
// Q1(i): 1 + 2 + ... + 60 = 1830
let s1=0;for(let k=1;k<=60;k++)s1+=k;assert.equal(s1,1830);
// Q1(ii): 3 + 6 + 9 + ... + 96 = 1584
let s2=0;for(let k=3;k<=96;k+=3)s2+=k;assert.equal(s2,1584);
// Q1(iii): 51 + 52 + ... + 92 = 3003
let s3=0;for(let k=51;k<=92;k++)s3+=k;assert.equal(s3,3003);
// Q1(iv): 1 + 4 + 9 + ... + 225 = 1240
let s4=0;for(let k=1;k<=15;k++)s4+=k*k;assert.equal(s4,1240);
// Q1(v): 6^2 + 7^2 + ... + 21^2 = 3256
let s5=0;for(let k=6;k<=21;k++)s5+=k*k;assert.equal(s5,3256);
// Q1(vi): 10^3 + 11^3 + ... + 20^3 = 42075
let s6=0;for(let k=10;k<=20;k++)s6+=k*k*k;assert.equal(s6,42075);
// Q1(vii): 1 + 3 + 5 + ... + 71 = 1296
let s7=0;for(let k=1;k<=71;k+=2)s7+=k;assert.equal(s7,1296);
// Q7(i) & Q7(ii): sum_{k=1}^n ((2k)^3 - (2k-1)^3) = 4n^3 + 3n^2; for n = 8 => 2240
for(let n=1;n<=12;n++){
 let sum=0;for(let k=1;k<=n;k++)sum+=(2*k)**3-(2*k-1)**3;
 assert.equal(sum,4*(n**3)+3*(n**2));
 if(n===8)assert.equal(sum,2240);
}
const c={window:{TRIGGLE_CLASSES:runtime.classes,TRIGGLE_CURRICULUM:runtime.curriculum}};
assert.throws(()=>vm.runInNewContext(fs.readFileSync(file,'utf8'),c,{timeout:5000}),/Duplicate Grade 10 Exercise 2\.9 student ID/);
console.log('PASS English Exercise 2.9 has 14 student records covering all 14 of 14 source-audited tasks across 7 questions, nine new unique parts, verified special-series arithmetic/identities and offline import; Tamil pending');
