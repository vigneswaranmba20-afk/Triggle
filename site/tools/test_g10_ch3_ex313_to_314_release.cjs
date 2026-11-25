'use strict';
/* Release regression for source-reviewed Grade 10 Ch 3 Exercises 3.13 to 3.14 (23 tasks across 11 numbered questions). */
const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const katex=require('../assets/vendor/katex/katex.min.js');
const {loadRuntime}=require('./curriculum_bulk.cjs');
const {buildInventory}=require('./bulk/trace_g10_inventory.cjs');

const html=fs.readFileSync('site/index.html','utf8'),sw=fs.readFileSync('site/service-worker.js','utf8');
const moduleFiles=[
  'g10-ch3-ex3-13-complete-en.js',
  'g10-ch3-ex3-14-complete-en.js'
];
for(const f of moduleFiles){
  assert(html.includes(f),f+' must be loaded in site/index.html');
  assert(sw.includes('./data/textbook-exercises/'+f),f+' must be cached in site/service-worker.js');
}

const audit=JSON.parse(fs.readFileSync('docs/curriculum/grade-10/trace/g10-ch3-ex3-13-to-3-14-source-audit-20261119.json','utf8'));
assert.equal(audit.numberedQuestions,11);
assert.equal(audit.uniqueSubpartTasks,23);
assert.equal(audit.tasks.length,23);

const runtime=loadRuntime();
const exCounts={
  '3.13':10,
  '3.14':13
};
for(const [ex,expected] of Object.entries(exCounts)){
  const rows=runtime.classes[10].items.filter(x=>String(x.chapter)==='3'&&x.exercise===ex&&x.kind==='textbook');
  assert.equal(rows.length,expected,'Exercise '+ex+' must have '+expected+' student records');
}

const allEx313To314=runtime.classes[10].items.filter(x=>String(x.chapter)==='3'&&['3.13','3.14'].includes(x.exercise)&&x.kind==='textbook');
assert.equal(allEx313To314.length,23);
const idSet=new Set(allEx313To314.map(x=>x.id));
assert.equal(idSet.size,23,'No duplicate IDs across Exercises 3.13–3.14');
for(const t of audit.tasks){
  assert(idSet.has(t.id),'Missing audited task '+t.id);
}

const notation={window:{katex}};
vm.runInNewContext(fs.readFileSync('site/assets/math-notation.js','utf8'),notation);
const render=notation.window.TriggleNotation.render;

for(const row of allEx313To314){
  assert.equal(row.edition,'2025',row.id+' edition');
  assert.equal(row.translationReview,'pending',row.id+' translationReview');
  assert(/[அ-ஹ]/.test(row.q.ta)&&row.steps.every(s=>/[அ-ஹ]/.test(s.ta)),row.id+' reviewed Tamil prompt and reasons');
  assert(!row.figureSrc,row.id+' must not invent a decorative figure');
  assert(row.q.en.length>15,row.id+' question length');
  assert(row.steps.length>=3,row.id+' step count');
  assert(row.steps.every(s=>s.math?.latex&&s.math?.fallback===s.eq),row.id+' step math fallback matches eq');
  // Family-approved teaching rule: no bare implication symbols forcing students to infer algebraic steps.
  assert(!/⇒|\\Rightarrow|\\implies/.test(JSON.stringify(row.steps)+JSON.stringify(row.answer)+JSON.stringify(row.answerMath)),row.id+' must explain steps without implication symbols');
  for(const s of row.steps){
    const out=render(s.math);
    assert(!out.includes('data-math-error')&&out.includes('<math')&&out.includes('katex-html'),row.id+' valid step KaTeX');
  }
  const english=row.answerMath.en || row.answerMath;
  const ansOut=render(english);
  if(row.answerMath.ta){const tamil=render(row.answerMath.ta);assert(tamil.includes('<math')&&!tamil.includes('data-math-error'),row.id+' Tamil answer KaTeX');}
  assert(!ansOut.includes('data-math-error')&&ansOut.includes('<math')&&ansOut.includes('katex-html'),row.id+' valid answer KaTeX');
  assert.equal(english.fallback,row.answer,row.id+' answerMath fallback matches answer');
  for(const seg of (row.questionMath?.en||[])){
    if(typeof seg==='object'&&seg){
      const qOut=render(seg);
      assert(!qOut.includes('data-math-error')&&qOut.includes('<math'),row.id+' valid questionMath KaTeX');
    }
  }
}

// Independent deterministic mathematical verification for all 23 tasks:
const close=(a,b,eps=1e-9)=>Math.abs(a-b)<eps;
const disc=(a,b,c)=>b*b-4*a*c;

// Exercise 3.13:
assert.equal(disc(15,11,2),1);
assert.equal(disc(1,-1,-1),5);
assert(close(disc(Math.SQRT2,-3,3*Math.SQRT2),-15));
assert(close(disc(9,-6*Math.SQRT2,2),0));
for(const [a,b,c,d] of [[2,3,5,7],[-1,4,2,-3]]){
  assert.equal(disc(9*a*a*b*b,-24*a*b*c*d,16*c*c*d*d),0);
}
for(const k of [2,3]){
  assert.notEqual(5*k-6,0);
  assert.equal(disc(5*k-6,2*k,1),0);
}
for(const k of [1,1/9]){
  assert.notEqual(k,0);
  assert(close(disc(k,6*k+2,16),0));
}
// Q3: (a-b)x^2 + (b-c)x + (c-a) = 0 equal roots => 2a = b + c
for(const [b,d] of [[3,4],[-2,5],[10,-3]]){
  const a=b+d, c=b+2*d;
  assert.equal(disc(a-b,b-c,c-a),0);
}
// Q4: (a-b)x^2 - 6(a+b)x - 9(a-b) = 0 => Delta = 36[(a+b)^2 + (a-b)^2] > 0 for real a != b
for(const [a,b] of [[5,2],[-3,7],[1.5,-0.5]]){
  assert(close(disc(a-b,-6*(a+b),-9*(a-b)),36*((a+b)**2+(a-b)**2)));
  assert(disc(a-b,-6*(a+b),-9*(a-b))>0);
}
// Q5: (c^2-ab)x^2 - 2(a^2-bc)x + (b^2-ac) = 0 => Delta = 4a(a^3+b^3+c^3-3abc)
for(const [a,b,c] of [[0,2,5],[2,3,-5],[-1,4,-3]]){
  const delta=disc(c*c-a*b,-2*(a*a-b*c),b*b-a*c);
  assert(close(delta,4*a*(a**3+b**3+c**3-3*a*b*c)));
  if(a===0||a**3+b**3+c**3===3*a*b*c)assert(close(delta,0));
}

// Exercise 3.14:
// Q1 symbolic identities over arbitrary non-zero (alpha, beta):
for(const [alpha,beta] of [[2,5],[-3,4],[1.5,-2.5]]){
  const s=alpha+beta, p=alpha*beta;
  assert(close(alpha/(3*beta)+beta/(3*alpha),(s*s-2*p)/(3*p)));
  assert(close(1/(alpha*alpha*beta)+1/(beta*beta*alpha),s/(p*p)));
  assert(close((3*alpha-1)*(3*beta-1),9*p-3*s+1));
  assert(close((alpha+3)/beta+(beta+3)/alpha,(s*s-2*p+3*s)/p));
}
// Q2: 2x^2 - 7x + 5 = 0 has roots 5/2 and 1:
{
  const alpha=5/2, beta=1;
  assert.equal(2*alpha*alpha-7*alpha+5,0);
  assert.equal(2*beta*beta-7*beta+5,0);
  assert(close(1/alpha+1/beta,7/5));
  assert(close(alpha/beta+beta/alpha,29/10));
  assert(close((alpha+2)/(beta+2)+(beta+2)/(alpha+2),13/6));
}
// Q3: x^2 + 6x - 4 = 0 has roots -3 ± sqrt(13):
{
  const alpha=-3+Math.sqrt(13), beta=-3-Math.sqrt(13);
  assert(close(alpha*alpha+6*alpha-4,0));
  assert(close(beta*beta+6*beta-4,0));
  for(const r of [alpha*alpha,beta*beta])assert(close(r*r-44*r+16,0));
  for(const r of [2/alpha,2/beta])assert(close(r*r-3*r-1,0));
  for(const r of [alpha*alpha*beta,beta*beta*alpha])assert(close(r*r-24*r-64,0));
}
// Q4: 7x^2 + ax + 2 = 0 with beta - alpha = -13/7 => a in {-15, 15}:
assert(close(7*(2**2)-15*2+2,0));
assert(close(7*((1/7)**2)-15*(1/7)+2,0));
assert(close(1/7-2,-13/7));
assert(close(7*((-2)**2)+15*(-2)+2,0));
assert(close(7*((-1/7)**2)+15*(-1/7)+2,0));
assert(close(-2-(-1/7),-13/7));
// Q5: 2y^2 - ay + 64 = 0 with roots alpha, 2*alpha => a in {-24, 24}:
assert.equal(2*(4**2)-24*4+64,0);
assert.equal(2*(8**2)-24*8+64,0);
assert.equal(2*((-4)**2)+24*(-4)+64,0);
assert.equal(2*((-8)**2)+24*(-8)+64,0);
// Q6: 3x^2 + kx + 81 = 0 with real roots alpha, alpha^2 => k = -36 (roots 3, 9):
assert.equal(3*(3**2)-36*3+81,0);
assert.equal(3*(9**2)-36*9+81,0);

// Verify duplicate guards throw on re-run:
const dupCtx={window:{TRIGGLE_CLASSES:runtime.classes,TRIGGLE_CURRICULUM:runtime.curriculum}};
for(const f of moduleFiles){
  assert.throws(()=>vm.runInNewContext(fs.readFileSync('site/data/textbook-exercises/'+f,'utf8'),dupCtx,{timeout:5000}),/Duplicate Grade 10 Exercise 3\.1[34] student ID/);
}

// Verify TRACE Grade 10 inventory shows Exercises 3.13-3.14 100% complete and 935 total tasks:
const inv=buildInventory();
assert.equal(inv.totals.numberedQuestions,664);
assert.equal(inv.totals.subpartTasks,935);
assert(inv.totals.questionsByStatus.COMPLETE>=260,'Expected at least 260/664 complete numbered questions');
assert(inv.totals.tasksByStatus.COMPLETE>=430,'Expected at least 430/935 complete subpart tasks');
assert(inv.chapterSummaries[2].questionsByStatus.COMPLETE>=58,'Chapter 3 has at least 58 complete numbered questions (Ex 3.1-3.14)');
assert(inv.chapterSummaries[2].tasksByStatus.COMPLETE>=126,'Chapter 3 has at least 126 complete subpart tasks (Ex 3.1-3.14)');
const ch3Ex=new Map(inv.exercises.filter(e=>e.chapter===3).map(e=>[e.exercise,e]));
for(const ex of ['3.13','3.14']){
  const rec=ch3Ex.get(ex);
  assert(rec&&rec.tasksByStatus.COMPLETE===rec.subpartTaskCount&&rec.tasksByStatus.MISSING===0&&rec.tasksByStatus.PARTIAL===0,'Exercise '+ex+' must be 100% complete in TRACE inventory');
}

console.log('PASS Grade 10 Ch 3 Exercises 3.13–3.14 release gate: 23/23 tasks across 11 numbered questions verified (KaTeX, source audit, no implication symbols, math identities, duplicate guards, and TRACE inventory '+inv.totals.questionsByStatus.COMPLETE+'/664 questions, '+inv.totals.tasksByStatus.COMPLETE+'/935 tasks).');
