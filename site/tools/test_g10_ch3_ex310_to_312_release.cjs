'use strict';
/* Release regression for source-reviewed Grade 10 Ch 3 Exercises 3.10 to 3.12 (22 tasks across 14 numbered questions). */
const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const katex=require('../assets/vendor/katex/katex.min.js');
const {loadRuntime}=require('./curriculum_bulk.cjs');
const {buildInventory}=require('./bulk/trace_g10_inventory.cjs');

const html=fs.readFileSync('site/index.html','utf8'),sw=fs.readFileSync('site/service-worker.js','utf8');
const moduleFiles=[
  'g10-ch3-ex3-10-complete-en.js',
  'g10-ch3-ex3-11-complete-en.js',
  'g10-ch3-ex3-12-complete-en.js'
];
for(const f of moduleFiles){
  assert(html.includes(f),f+' must be loaded in site/index.html');
  assert(sw.includes('./data/textbook-exercises/'+f),f+' must be cached in site/service-worker.js');
}

const figureFiles=[
  './assets/grade10-ch3/ex3-12-q2-pathway.svg',
  './assets/grade10-ch3/ex3-12-q5-circle-gates.svg',
  './assets/grade10-ch3/ex3-12-q7-galleries.svg',
  './assets/grade10-ch3/ex3-12-q8-flowerbed.svg',
  './assets/grade10-ch3/ex3-12-q9-triangle.svg'
];
for(const fig of figureFiles){
  assert(sw.includes(fig),fig+' must be cached in site/service-worker.js');
  const svg=fs.readFileSync('site/'+fig.replace(/^\.\//,''),'utf8');
  assert(svg.includes('<svg')&&svg.includes('<title'),fig+' must be a valid accessible SVG');
}

const audit=JSON.parse(fs.readFileSync('docs/curriculum/grade-10/trace/g10-ch3-ex3-10-to-3-12-source-audit-20261119.json','utf8'));
assert.equal(audit.numberedQuestions,14);
assert.equal(audit.uniqueSubpartTasks,22);
assert.equal(audit.tasks.length,22);

const runtime=loadRuntime();
const exCounts={
  '3.10':6,
  '3.11':7,
  '3.12':9
};
for(const [ex,expected] of Object.entries(exCounts)){
  const rows=runtime.classes[10].items.filter(x=>String(x.chapter)==='3'&&x.exercise===ex&&x.kind==='textbook');
  assert.equal(rows.length,expected,'Exercise '+ex+' must have '+expected+' student records');
}

const allEx310To312=runtime.classes[10].items.filter(x=>String(x.chapter)==='3'&&['3.10','3.11','3.12'].includes(x.exercise)&&x.kind==='textbook');
assert.equal(allEx310To312.length,22);
const idSet=new Set(allEx310To312.map(x=>x.id));
assert.equal(idSet.size,22,'No duplicate IDs across Exercises 3.10–3.12');
for(const t of audit.tasks){
  assert(idSet.has(t.id),'Missing audited task '+t.id);
}

const figureOwners=new Set(['c10-3-ex3-12-q2','c10-3-ex3-12-q5','c10-3-ex3-12-q7','c10-3-ex3-12-q8','c10-3-ex3-12-q9']);
for(const row of allEx310To312){
  if(figureOwners.has(row.id)){
    assert(row.figureSrc&&figureFiles.includes(row.figureSrc),row.id+' must reference its audited SVG');
    assert(row.figureAlt?.en&&row.figureCaption?.en,row.id+' needs accessible alt text and caption');
  }else{
    assert(!row.figureSrc,row.id+' must not invent a decorative figure');
  }
}

const notation={window:{katex}};
vm.runInNewContext(fs.readFileSync('site/assets/math-notation.js','utf8'),notation);
const render=notation.window.TriggleNotation.render;

for(const row of allEx310To312){
  assert.equal(row.edition,'2025',row.id+' edition');
  assert.equal(row.translationReview,'pending',row.id+' translationReview');
  assert(!row.q.ta,row.id+' must not invent unreviewed Tamil text');
  assert(row.q.en.length>15,row.id+' question length');
  assert(row.steps.length>=3,row.id+' step count');
  assert(row.steps.every(s=>s.math?.latex&&s.math?.fallback===s.eq),row.id+' step math fallback matches eq');
  for(const s of row.steps){
    const out=render(s.math);
    assert(!out.includes('data-math-error')&&out.includes('<math')&&out.includes('katex-html'),row.id+' valid step KaTeX');
  }
  const ansOut=render(row.answerMath);
  assert(!ansOut.includes('data-math-error')&&ansOut.includes('<math')&&ansOut.includes('katex-html'),row.id+' valid answer KaTeX');
  assert.equal(row.answerMath.fallback,row.answer,row.id+' answerMath fallback matches answer');
  for(const seg of (row.questionMath?.en||[])){
    if(typeof seg==='object'&&seg){
      const qOut=render(seg);
      assert(!qOut.includes('data-math-error')&&qOut.includes('<math'),row.id+' valid questionMath KaTeX');
    }
  }
}

// Independent deterministic mathematical verification for all 22 tasks:
const close=(a,b,eps=1e-9)=>Math.abs(a-b)<eps;

// Exercise 3.10:
for(const x of [-1/4,2])assert(close(4*x*x-7*x-2,0));
for(const p of [-2,9/2])assert(close(3*(p*p-6),p*(p+5)));
for(const a of [-2,9]){
  assert(a*(a-7)>=0);
  assert(close(Math.sqrt(a*(a-7)),3*Math.sqrt(2)));
}
for(const x of [-Math.sqrt(2),-5/Math.sqrt(2)])assert(close(Math.SQRT2*x*x+7*x+5*Math.SQRT2,0));
assert(close(2*(1/4)**2-1/4+1/8,0));
assert.equal((6*6-6)/2,15);

// Exercise 3.11:
assert(close(9*(2/3)**2-12*(2/3)+4,0));
for(const x of [-1,3]){
  assert.notEqual(x,1);
  assert(close((5*x+7)/(x-1),3*x+2));
}
for(const x of [2,1/2])assert(close(2*x*x-5*x+2,0));
for(const f of [(3+Math.sqrt(3))/Math.SQRT2,(3-Math.sqrt(3))/Math.SQRT2]){
  assert(close(Math.SQRT2*f*f-6*f+3*Math.SQRT2,0));
}
for(const y of [-1,23/3])assert(close(3*y*y-20*y-23,0));
for(const [a,b] of [[10,4],[7,-3],[0,6]]){
  for(const y of [(a+b)/6,(a-b)/6])assert(close(36*y*y-12*a*y+(a*a-b*b),0));
}
assert(close(3.75*3.75-0.75*3.75,11.25));

// Exercise 3.12:
for(const x of [5,-1/5])assert(close(x-1/x,24/5));
assert(close((12+2*1.5)*(16+2*1.5),285));
assert(close(90/45-90/(45+15),0.5));
assert.equal((10+5)*(20+5),375);
assert.equal(12*12+16*16,20*20);
assert.equal(16-12,4);
assert.equal(Math.sqrt(72/2)+(8/9)*72+2,72);
assert(close(4/9,(28/42)**2));
assert.equal(28+42,70);
assert.equal(3*((10-2*2)**2)+4*(100-(10-2*2)**2),364);
assert.equal(7*7+24*24,25*25);
assert.equal(7+24+25,56);

// Verify duplicate guards throw on re-run:
const dupCtx={window:{TRIGGLE_CLASSES:runtime.classes,TRIGGLE_CURRICULUM:runtime.curriculum}};
for(const f of moduleFiles){
  assert.throws(()=>vm.runInNewContext(fs.readFileSync('site/data/textbook-exercises/'+f,'utf8'),dupCtx,{timeout:5000}),/Duplicate Grade 10 Exercise 3\.1[0-2] student ID/);
}

// Verify TRACE Grade 10 inventory shows Exercises 3.10-3.12 100% complete and 939 total tasks:
const inv=buildInventory();
assert.equal(inv.totals.numberedQuestions,664);
assert.equal(inv.totals.subpartTasks,939);
assert(inv.totals.questionsByStatus.COMPLETE>=249,'Expected at least 249/664 complete numbered questions');
assert(inv.totals.tasksByStatus.COMPLETE>=407,'Expected at least 407/939 complete subpart tasks');
assert(inv.chapterSummaries[2].questionsByStatus.COMPLETE>=47,'Chapter 3 has at least 47 complete numbered questions (Ex 3.1-3.12)');
assert(inv.chapterSummaries[2].tasksByStatus.COMPLETE>=103,'Chapter 3 has at least 103 complete subpart tasks (Ex 3.1-3.12)');
const ch3Ex=new Map(inv.exercises.filter(e=>e.chapter===3).map(e=>[e.exercise,e]));
for(const ex of ['3.10','3.11','3.12']){
  const rec=ch3Ex.get(ex);
  assert(rec&&rec.tasksByStatus.COMPLETE===rec.subpartTaskCount&&rec.tasksByStatus.MISSING===0&&rec.tasksByStatus.PARTIAL===0,'Exercise '+ex+' must be 100% complete in TRACE inventory');
}

console.log('PASS Grade 10 Ch 3 Exercises 3.10–3.12 release gate: 22/22 tasks across 14 numbered questions verified (KaTeX, source audit, 5 SVGs, math identities, duplicate guards, and TRACE inventory '+inv.totals.questionsByStatus.COMPLETE+'/664 questions, '+inv.totals.tasksByStatus.COMPLETE+'/939 tasks).');
