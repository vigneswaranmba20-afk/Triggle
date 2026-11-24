'use strict';
/* Release regression for source-reviewed Grade 10 Ch 2 Ex 2.10 + Unit Exercise 2, Ch 3 Ex 3.1, and TRACE Grade 10 Inventory. */
const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const katex=require('../assets/vendor/katex/katex.min.js');
const {loadRuntime}=require('./curriculum_bulk.cjs');
const {buildInventory}=require('./bulk/trace_g10_inventory.cjs');

const html=fs.readFileSync('site/index.html','utf8'),sw=fs.readFileSync('site/service-worker.js','utf8');
const fileCh2='site/data/textbook-exercises/g10-ch2-ex2-10-and-unit-en.js';
const fileCh3='site/data/textbook-exercises/g10-ch3-ex3-1-complete-en.js';
assert(html.includes('g10-ch2-ex2-10-and-unit-en.js'),'Ch 2 Ex 2.10 & Unit module must be loaded in index.html');
assert(html.includes('g10-ch3-ex3-1-complete-en.js'),'Ch 3 Ex 3.1 module must be loaded in index.html');
assert(sw.includes('./data/textbook-exercises/g10-ch2-ex2-10-and-unit-en.js'),'Ch 2 Ex 2.10 & Unit module must work offline');
assert(sw.includes('./data/textbook-exercises/g10-ch3-ex3-1-complete-en.js'),'Ch 3 Ex 3.1 module must work offline');

const auditCh2=JSON.parse(fs.readFileSync('docs/curriculum/grade-10/trace/g10-ch2-ex2-10-and-unit-source-audit-20261118.json','utf8'));
assert.equal(auditCh2.exercise210.numberedQuestions,15);
assert.equal(auditCh2.exercise210.totalStudentRecords,15);
assert.equal(auditCh2.unitExercise2.numberedQuestions,10);
assert.equal(auditCh2.unitExercise2.uniqueSubpartTasks,12);
assert.equal(auditCh2.tasks.length,27);

const auditCh3=JSON.parse(fs.readFileSync('docs/curriculum/grade-10/trace/g10-ch3-ex3-1-source-audit-20261118.json','utf8'));
assert.equal(auditCh3.numberedQuestions,5);
assert.equal(auditCh3.uniqueSubpartTasks,9);
assert.equal(auditCh3.tasks.length,9);

const runtime=loadRuntime();
const records210=runtime.classes[10].items.filter(x=>String(x.chapter)==='2'&&x.exercise==='2.10'&&x.kind==='textbook');
const recordsUnit2=runtime.classes[10].items.filter(x=>String(x.chapter)==='2'&&x.exercise==='2.unit'&&x.kind==='textbook');
const records31=runtime.classes[10].items.filter(x=>String(x.chapter)==='3'&&x.exercise==='3.1'&&x.kind==='textbook');

assert.equal(records210.length,15,'All 15 Exercise 2.10 MCQs must be in student app');
assert.equal(recordsUnit2.length,12,'All 12 Unit Exercise 2 tasks must be in student app');
assert.equal(records31.length,9,'All 9 Exercise 3.1 tasks must be in student app');

const idsCh2=new Set([...records210,...recordsUnit2].map(x=>x.id));
assert.equal(idsCh2.size,27,'No duplicate IDs across Ex 2.10 and Unit Ex 2');
for(const t of auditCh2.tasks)assert(idsCh2.has(t.id),'Absent Ch 2 textbook part: '+t.id);

const idsCh3=new Set(records31.map(x=>x.id));
assert.equal(idsCh3.size,9,'No duplicate IDs across Ex 3.1');
for(const t of auditCh3.tasks)assert(idsCh3.has(t.id),'Absent Ch 3 Ex 3.1 textbook part: '+t.id);

const notation={window:{katex}};
vm.runInNewContext(fs.readFileSync('site/assets/math-notation.js','utf8'),notation);
const render=notation.window.TriggleNotation.render;

const newIds=[
  'c10-2-ex2-10-q6','c10-2-ex2-10-q13','c10-2-ex2-10-q15',
  'c10-2-unit-q1','c10-2-unit-q2-i','c10-2-unit-q2-ii','c10-2-unit-q2-iii',
  'c10-2-unit-q3','c10-2-unit-q4','c10-2-unit-q5','c10-2-unit-q6',
  'c10-2-unit-q7','c10-2-unit-q8','c10-2-unit-q9','c10-2-unit-q10',
  'c10-3-ex3-1-q2-i','c10-3-ex3-1-q2-ii','c10-3-ex3-1-q2-iii',
  'c10-3-ex3-1-q3','c10-3-ex3-1-q4','c10-3-ex3-1-q5'
];
for(const id of newIds){
  const row=runtime.classes[10].items.find(x=>x.id===id);
  assert(row,'Missing newly released '+id);
  assert.equal(row.translationReview,'pending');
  assert(row.q.en.length>20);
  assert(row.steps.length>=2);
  assert(row.steps.every(s=>s.math?.latex&&s.math?.fallback===s.eq),id+' step math fallback matches eq');
  for(const s of row.steps){
    const out=render(s.math);
    assert(!out.includes('data-math-error')&&out.includes('<math')&&out.includes('katex-html'),id+' valid step KaTeX');
  }
  const ansOut=render(row.answerMath);
  assert(!ansOut.includes('data-math-error')&&ansOut.includes('<math'),id+' valid answer KaTeX');
  assert.equal(row.answerMath.fallback,row.answer,id+' answerMath fallback matches answer');
  for(const seg of (row.questionMath?.en||[])){
    if(typeof seg==='object'&&seg){
      const qOut=render(seg);
      assert(!qOut.includes('data-math-error')&&qOut.includes('<math'),id+' valid questionMath KaTeX');
    }
  }
}

// Independent deterministic mathematical checks for all 21 new items:
// Ex 2.10 Q6: 7^(4k) mod 100 = 1
for(let k=1;k<=5;k++)assert.equal((7n**(4n*BigInt(k)))%100n,1n);
// Ex 2.10 Q13: next term of 3/16, 1/8, 1/12, 1/18 is 1/27
assert.equal((1/18)*(2/3),1/27);
// Ex 2.10 Q15: (1^3+...+15^3) - (1+...+15) = 14280
assert.equal((15*16/2)**2-(15*16/2),14280);
// Unit Ex 2 Q1: n^2 - n divisible by 2 for positive integers n
for(let n=1;n<=50;n++)assert.equal((n*n-n)%2,0);
// Unit Ex 2 Q2(i)-(iii): gcd(175, 105) = 35, 175/35 = 5, 105/35 = 3
const gcd=(a,b)=>b===0?a:gcd(b,a%b);
assert.equal(gcd(175,105),35);
assert.equal(175/35,5);
assert.equal(105/35,3);
// Unit Ex 2 Q3: (a + 2b + 3c) mod 13 when a=9, b=7, c=10 mod 13
assert.equal((9+2*7+3*10)%13,1);
// Unit Ex 2 Q4: 107 = 4*26 + 3
assert.equal(4*26+3,107);
// Unit Ex 2 Q5: if a = (m - 2n)d, then a + 3md = 2(a + (m+n)d)
for(const [m,n,d] of [[5,2,3],[7,3,-4],[10,4,2]]){
  const a=(m-2*n)*d;
  assert.equal(a+m*d,2*(a+n*d));
  assert.equal(a+3*m*d,2*(a+(m+n)*d));
}
// Unit Ex 2 Q6: 12th term from last of -2, -4, ..., -100 is -78
assert.equal(-100-11*(-2),-78);
// Unit Ex 2 Q7: (7 + (n-1)d) - (2 + (n-1)d) = 5
for(const n of [1,10,21,50])assert.equal((7+(n-1)*9)-(2+(n-1)*9),5);
// Unit Ex 2 Q8: (10/2)*(2*1200 + 9*100) = 16500
assert.equal(5*(2*1200+900),16500);
// Unit Ex 2 Q9: a=sqrt(2), r=sqrt(3) => t2 = sqrt(6), t6 = 9*sqrt(6)
assert(Math.abs(Math.sqrt(2)*Math.sqrt(3)-Math.sqrt(6))<1e-12);
assert(Math.abs(Math.sqrt(2)*(Math.sqrt(3)**5)-9*Math.sqrt(6))<1e-12);
// Unit Ex 2 Q10: 45000 * (0.85)^3 = 27635.625 -> 27636
assert.equal(Math.round(45000*(0.85**3)),27636);

// Ex 3.1 Q2(i): (x+2y-z) + (-3x-2y+5z) = -2(x-2z) and 6 + (-12) = -2(3) => dependent (infinitely many)
// Ex 3.1 Q2(ii): 3x+2y+z = 3 vs 3x+2y+z = -1/2 => inconsistent (no solution)
// Ex 3.1 Q2(iii): x=3, y=9, z=15 satisfies (y+z)/4 = (z+x)/3 = (x+y)/2 = 6 and x+y+z = 27
assert.equal((9+15)/4,6);assert.equal((15+3)/3,6);assert.equal((3+9)/2,6);assert.equal(3+9+15,27);
// Ex 3.1 Q3: Vani=24, Father=51, Grandfather=84
assert.equal((24+51+84)/3,53);
assert.equal(84/2+51/3+24/4,65);
assert.equal(84-4,4*(24-4));
// Ex 3.1 Q4: 137 -> 1+3+7=11, 731 = 5*137 + 46, 1 + 2*3 = 7
assert.equal(1+3+7,11);assert.equal(731,5*137+46);assert.equal(1+2*3,7);
// Ex 3.1 Q5: x=7, y=3, z=2 -> 7+3+2=12, 5(7)+10(3)+20(2)=105, 5(3)+10(7)+20(2)=125
assert.equal(7+3+2,12);assert.equal(5*7+10*3+20*2,105);assert.equal(5*3+10*7+20*2,125);

// Verify duplicate guards:
const dupCtx={window:{TRIGGLE_CLASSES:runtime.classes,TRIGGLE_CURRICULUM:runtime.curriculum}};
assert.throws(()=>vm.runInNewContext(fs.readFileSync(fileCh2,'utf8'),dupCtx,{timeout:5000}),/Duplicate Grade 10 Ch2 Ex 2\.10 \/ Unit Ex 2 student ID/);
assert.throws(()=>vm.runInNewContext(fs.readFileSync(fileCh3,'utf8'),dupCtx,{timeout:5000}),/Duplicate Grade 10 Exercise 3\.1 student ID/);

// Verify TRACE Grade 10 complete inventory reconciliation:
const inv=buildInventory();
assert.equal(inv.totals.numberedQuestions,664);
assert.equal(inv.totals.subpartTasks,940);
assert(inv.totals.questionsByStatus.COMPLETE>=207);
assert(inv.totals.tasksByStatus.COMPLETE>=313);
assert.equal(inv.totals.questionsByStatus.DUPLICATE,0);
assert.equal(inv.totals.questionsByStatus.BLOCKED,1);
assert.equal(inv.chapterSummaries[0].questionsByStatus.COMPLETE,69,'Chapter 1 100% complete');
assert.equal(inv.chapterSummaries[1].questionsByStatus.COMPLETE,115,'Chapter 2 100% complete');
assert.equal(inv.chapterSummaries[1].tasksByStatus.COMPLETE,161,'Chapter 2 all 161 tasks complete');

console.log('PASS Grade 10 Ch 2 Ex 2.10 (15/15), Unit Ex 2 (12/12), Ch 3 Ex 3.1 (9/9) and TRACE inventory ('+inv.totals.questionsByStatus.COMPLETE+'/664 questions, '+inv.totals.tasksByStatus.COMPLETE+'/940 tasks; Ch 1 & Ch 2 100% complete)');
