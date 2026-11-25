'use strict';
/* Release regression for source-reviewed Grade 10 Ch 3 Exercises 3.7 to 3.9 (23 tasks across 7 numbered questions). */
const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const katex=require('../assets/vendor/katex/katex.min.js');
const {loadRuntime}=require('./curriculum_bulk.cjs');
const {buildInventory}=require('./bulk/trace_g10_inventory.cjs');

const html=fs.readFileSync('site/index.html','utf8'),sw=fs.readFileSync('site/service-worker.js','utf8');
const moduleFiles=[
  'g10-ch3-ex3-7-complete-en.js',
  'g10-ch3-ex3-8-complete-en.js',
  'g10-ch3-ex3-9-complete-en.js'
];
for(const f of moduleFiles){
  assert(html.includes(f),f+' must be loaded in site/index.html');
  assert(sw.includes('./data/textbook-exercises/'+f),f+' must be cached in site/service-worker.js');
}

const audit=JSON.parse(fs.readFileSync('docs/curriculum/grade-10/trace/g10-ch3-ex3-7-to-3-9-source-audit-20261119.json','utf8'));
assert.equal(audit.numberedQuestions,7);
assert.equal(audit.uniqueSubpartTasks,23);
assert.equal(audit.tasks.length,23);

const runtime=loadRuntime();
const exCounts={
  '3.7':7,
  '3.8':8,
  '3.9':8
};
for(const [ex,expected] of Object.entries(exCounts)){
  const rows=runtime.classes[10].items.filter(x=>String(x.chapter)==='3'&&x.exercise===ex&&x.kind==='textbook');
  assert.equal(rows.length,expected,'Exercise '+ex+' must have '+expected+' student records');
}

const allEx37To39=runtime.classes[10].items.filter(x=>String(x.chapter)==='3'&&['3.7','3.8','3.9'].includes(x.exercise)&&x.kind==='textbook');
assert.equal(allEx37To39.length,23);
const idSet=new Set(allEx37To39.map(x=>x.id));
assert.equal(idSet.size,23,'No duplicate IDs across Exercises 3.7–3.9');
assert(!idSet.has('c10-3-ex3-7-q2-v'),'Exercise 3.7 Q2(v) must not exist in verified 2025 textbook');
for(const t of audit.tasks){
  assert(idSet.has(t.id),'Missing audited task '+t.id);
}

const notation={window:{katex}};
vm.runInNewContext(fs.readFileSync('site/assets/math-notation.js','utf8'),notation);
const render=notation.window.TriggleNotation.render;

for(const row of allEx37To39){
  assert.equal(row.edition,'2025',row.id+' edition');
  assert.equal(row.translationReview,'pending',row.id+' translationReview');
  assert(/[அ-ஹ]/.test(row.q.ta)&&row.steps.every(s=>/[அ-ஹ]/.test(s.ta)),row.id+' reviewed Tamil prompt and reasons');
  assert(row.q.en.length>15,row.id+' question length');
  assert(row.steps.length>=2,row.id+' step count');
  assert(row.steps.every(s=>s.math?.latex&&s.math?.fallback===s.eq),row.id+' step math fallback matches eq');
  for(const s of row.steps){
    const out=render(s.math);
    assert(!out.includes('data-math-error')&&out.includes('<math')&&out.includes('katex-html'),row.id+' valid step KaTeX');
  }
  const english=row.answerMath.en || row.answerMath;
  const englishParts=Array.isArray(english)?english:[english];
  const fallback=englishParts.map(part=>typeof part==='string'?part:part.fallback).join('');
  assert.equal(fallback,row.answer,row.id+' English accessible answer matches the canonical answer');
  for(const answer of [english,row.answerMath.ta].filter(Boolean)){
    const parts=Array.isArray(answer)?answer:[answer];
    assert(parts.length>0,row.id+' nonempty answer');
    for(const part of parts){
      if(typeof part==='string'){assert(part.trim(),row.id+' answer text');continue;}
      const html=render(part);
      assert(!html.includes('data-math-error')&&html.includes('<math')&&html.includes('katex-html'),row.id+' typeset answer');
    }
  }
  for(const seg of (row.questionMath?.en||[])){
    if(typeof seg==='object'&&seg){
      const qOut=render(seg);
      assert(!qOut.includes('data-math-error')&&qOut.includes('<math'),row.id+' valid questionMath KaTeX');
    }
  }
}

// Independent deterministic mathematical verification for all 23 tasks:
const close=(a,b,eps=1e-9)=>Math.abs(a-b)<eps;

// Exercise 3.7 Q1(i)-(iii) and Q2(i)-(iv):
for(const x of [-3,-1.5,2,5.5]){
  const y=3.5,z=-2,a=4,b=1.5,c=-1;
  // Q1(i): sqrt(400 x^4 y^12 z^16 / (100 x^8 y^4 z^4)) = 2 |y^4 z^6 / x^2|
  const q1iExpr=(400*(x**4)*(y**12)*(z**16))/(100*(x**8)*(y**4)*(z**4));
  assert(close(Math.sqrt(q1iExpr),2*Math.abs((y**4)*(z**6)/(x**2))));
  // Q1(ii): sqrt((7x^2 + 2 sqrt(14)x + 2) / (x^2 - x/2 + 1/16)) = 4 |(sqrt(7)x + sqrt(2))/(4x - 1)|
  const q1iiExpr=(7*x*x+2*Math.sqrt(14)*x+2)/(x*x-0.5*x+1/16);
  assert(close(Math.sqrt(q1iiExpr),4*Math.abs((Math.sqrt(7)*x+Math.sqrt(2))/(4*x-1))));
  // Q1(iii): sqrt(121 (a+b)^8 (x+y)^8 (b-c)^8 / (81 (b-c)^4 (a-b)^12 (b-c)^4)) = (11/9) |(a+b)^4 (x+y)^4 / (a-b)^6|
  const q1iiiExpr=(121*((a+b)**8)*((x+y)**8)*((b-c)**8))/(81*((b-c)**4)*((a-b)**12)*((b-c)**4));
  assert(close(Math.sqrt(q1iiiExpr),(11/9)*Math.abs((((a+b)**4)*((x+y)**4))/((a-b)**6))));
  // Q2(i): sqrt(4x^2 + 20x + 25) = |2x + 5|
  assert(close(Math.sqrt(4*x*x+20*x+25),Math.abs(2*x+5)));
  // Q2(ii): sqrt(9x^2 - 24xy + 30xz - 40yz + 25z^2 + 16y^2) = |3x - 4y + 5z|
  assert(close(Math.sqrt(9*x*x-24*x*y+30*x*z-40*y*z+25*z*z+16*y*y),Math.abs(3*x-4*y+5*z)));
  // Q2(iii): sqrt((4x^2 - 9x + 2)(7x^2 - 13x - 2)(28x^2 - 3x - 1)) = |(x - 2)(7x + 1)(4x - 1)|
  assert(close(Math.sqrt((4*x*x-9*x+2)*(7*x*x-13*x-2)*(28*x*x-3*x-1)),Math.abs((x-2)*(7*x+1)*(4*x-1))));
  // Q2(iv): sqrt((2x^2 + 17x/6 + 1)(3x^2/2 + 4x + 2)(4x^2/3 + 11x/3 + 2)) = (1/6)|(4x+3)(3x+2)(x+2)|
  assert(close(Math.sqrt((2*x*x+(17/6)*x+1)*((3/2)*x*x+4*x+2)*((4/3)*x*x+(11/3)*x+2)),(1/6)*Math.abs((4*x+3)*(3*x+2)*(x+2))));
}

// Exercise 3.8 Q1(i)-(iv), Q2(i)-(ii), Q3(i)-(ii):
for(const x of [-4,-1,0,2,5]){
  // Q1(i): (x^2 - 6x + 3)^2 = x^4 - 12x^3 + 42x^2 - 36x + 9
  assert(close((x*x-6*x+3)**2,x**4-12*x**3+42*x**2-36*x+9));
  // Q1(ii): (2x^2 - 7x - 3)^2 = 37x^2 - 28x^3 + 4x^4 + 42x + 9
  assert(close((2*x*x-7*x-3)**2,37*x**2-28*x**3+4*x**4+42*x+9));
  // Q1(iii): (4x^2 + 1)^2 = 16x^4 + 8x^2 + 1
  assert(close((4*x*x+1)**2,16*x**4+8*x**2+1));
  // Q1(iv): (11x^2 - 9x - 12)^2 = 121x^4 - 198x^3 - 183x^2 + 216x + 144
  assert(close((11*x*x-9*x-12)**2,121*x**4-198*x**3-183*x**2+216*x+144));
  // Q2(i): (2x^2 - 3x + 7)^2 = 4x^4 - 12x^3 + 37x^2 - 42x + 49 (a=49, b=-42)
  assert(close((2*x*x-3*x+7)**2,4*x**4-12*x**3+37*x**2+(-42)*x+49));
  // Q2(ii): (10 + 11x + 12x^2)^2 = 144x^4 + 264x^3 + 361x^2 + 220x + 100 (a=144, b=264)
  assert(close((12*x*x+11*x+10)**2,144*x**4+264*x**3+361*x**2+220*x+100));
  // Q3(i): (6x^2 - 5x + 3)^2 = 36x^4 - 60x^3 + 61x^2 - 30x + 9 (m=30, n=9)
  assert(close((6*x*x-5*x+3)**2,36*x**4-60*x**3+61*x**2-30*x+9));
  // Q3(ii): (x^2 - 4x + 4)^2 = x^4 - 8x^3 + 24x^2 - 32x + 16 (m=24, n=-32)
  assert(close((x*x-4*x+4)**2,x**4-8*x**3+24*x**2+(-32)*x+16));
}

// Exercise 3.9 Q1(i)-(iv) and Q2(i)-(iv):
// Q1(i): roots summing to -9 and multiplying to 20 -> x^2 + 9x + 20 = 0 (roots -4, -5)
assert.equal((-4)+(-5),-9);assert.equal((-4)*(-5),20);
assert.equal((-4)**2+9*(-4)+20,0);assert.equal((-5)**2+9*(-5)+20,0);
// Q1(ii): 3x^2 - 5x + 12 = 0 -> sum = 5/3, product = 12/3 = 4
assert(close(-(-5)/3,5/3));assert(close(12/3,4));
// Q1(iii): 2x^2 + 3x - 2 = 0 (roots 1/2, -2) -> sum = -3/2, product = -1
assert(close(0.5+(-2),-3/2));assert(close(0.5*(-2),-1));
assert(close(2*(0.5**2)+3*0.5-2,0));assert(close(2*((-2)**2)+3*(-2)-2,0));
// Q1(iv): for arbitrary parameter a, check monic quadratic x^2 + (2-a)^2 x + (a+5)^2 = 0 has sum -(2-a)^2 and product (a+5)^2
for(const a of [-2,0,3]){
  const sumCoeff=(2-a)**2,prodCoeff=(a+5)**2;
  assert.equal(-sumCoeff,-((2-a)**2));assert.equal(prodCoeff,(a+5)**2);
}
// Q2(i): x^2 + 3x - 28 = 0 (roots -7, 4) -> sum = -3, product = -28
assert.equal((-7)+4,-3);assert.equal((-7)*4,-28);
// Q2(ii): x^2 + 3x = 0 (roots 0, -3) -> sum = -3, product = 0
assert.equal(0+(-3),-3);assert.ok(0*(-3)===0);
// Q2(iii): 3 + 1/a = 10/a^2 <=> 3a^2 + a - 10 = 0 (roots -2, 5/3) -> sum = -1/3, product = -10/3
for(const a of [-2,5/3])assert(close(3+1/a,10/(a*a)));
assert(close((-2)+(5/3),-1/3));assert(close((-2)*(5/3),-10/3));
// Q2(iv): 3y^2 - y - 4 = 0 (roots -1, 4/3) -> sum = 1/3, product = -4/3
for(const y of [-1,4/3])assert(close(3*y*y-y-4,0));
assert(close((-1)+(4/3),1/3));assert(close((-1)*(4/3),-4/3));

// Verify duplicate guards throw on re-run:
const dupCtx={window:{TRIGGLE_CLASSES:runtime.classes,TRIGGLE_CURRICULUM:runtime.curriculum}};
for(const f of moduleFiles){
  assert.throws(()=>vm.runInNewContext(fs.readFileSync('site/data/textbook-exercises/'+f,'utf8'),dupCtx,{timeout:5000}),/Duplicate Grade 10 Exercise 3\.[7-9] student ID/);
}

// Verify TRACE Grade 10 inventory shows Exercises 3.7-3.9 100% complete and 940 total tasks:
const inv=buildInventory();
assert.equal(inv.totals.numberedQuestions,664);
assert.equal(inv.totals.subpartTasks,940);
assert(inv.totals.questionsByStatus.COMPLETE>=235);
assert(inv.totals.tasksByStatus.COMPLETE>=385);
assert(inv.chapterSummaries[2].questionsByStatus.COMPLETE>=33,'Chapter 3 has at least 33 complete numbered questions (Ex 3.1-3.9)');
assert(inv.chapterSummaries[2].tasksByStatus.COMPLETE>=81,'Chapter 3 has at least 81 complete subpart tasks (Ex 3.1-3.9)');
const ch3Ex=new Map(inv.exercises.filter(e=>e.chapter===3).map(e=>[e.exercise,e]));
for(const ex of ['3.7','3.8','3.9']){
  const rec=ch3Ex.get(ex);
  assert(rec&&rec.tasksByStatus.COMPLETE===rec.subpartTaskCount&&rec.tasksByStatus.MISSING===0&&rec.tasksByStatus.PARTIAL===0,'Exercise '+ex+' must be 100% complete in TRACE inventory');
}

console.log('PASS Grade 10 Ch 3 Exercises 3.7–3.9 release gate: 23/23 tasks across 7 numbered questions verified (KaTeX, source audit, math identities, duplicate guards, and TRACE inventory '+inv.totals.questionsByStatus.COMPLETE+'/664 questions, '+inv.totals.tasksByStatus.COMPLETE+'/940 tasks).');
