'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const katex = require('../assets/vendor/katex/katex.min.js');
const {loadRuntime} = require('./curriculum_bulk.cjs');
const {items,source} = require('../data/textbook-fidelity/g10-ch4-ex4-3.json');

const runtime = loadRuntime();
const rows = runtime.classes[10].items.filter(item => item.chapter === '4' && item.exercise === '4.3');
const byId = new Map(rows.map(row => [row.id,row]));
const offline = fs.readFileSync('site/service-worker.js','utf8');
const html = fs.readFileSync('site/index.html','utf8');
const expectedIds = Array.from({length:8},(_,i) => 'c10-4-ex4-3-q'+(i+1));

assert.deepEqual(rows.map(row => row.id).sort(),expectedIds);
assert.equal(rows.length,8);
assert.equal(items.length,8);
assert.ok(html.includes('g10-ch4-ex4-3.js'), 'Exercise module absent from student app');
assert.ok(offline.includes("./data/textbook-exercises/g10-ch4-ex4-3.js"), 'Exercise module absent from offline cache');
assert.equal(new Set(rows.map(x=>x.id)).size,8);
assert.equal(source.en.driveId,'13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of');

for (const evidence of items) {
  const row = byId.get(evidence.id);
  assert.ok(row,'Missing student question: '+evidence.id);
  assert.equal(row.translationReview,'pending');
  assert.equal(row.kind,'textbook');
  assert.equal(row.sourceFidelity.status,'text-and-answer-key-checked');
  assert.equal(row.steps.length >= 4,true,evidence.id+' needs complete steps');
  for (const lang of ['en','ta']) {
    assert.equal(row.q[lang],evidence.textbookPrompt[lang]);
    assert.equal(row.questionMath[lang].map(part=>typeof part === 'string'?part:part.fallback).join(''),row.q[lang]);
    assert.equal(row.sourceFidelity.sourcePdfPage[lang],evidence.sourcePages[lang].pdf);
    assert.equal(evidence.sourcePages[lang].pdf-evidence.sourcePages[lang].printed,6);
    for(const part of row.questionMath[lang]) {
      if(typeof part !== 'string') katex.renderToString(part.latex,{throwOnError:true});
    }
  }
  for(const step of row.steps) {
    assert.ok(step.en.length > 25,evidence.id+' step is unexplained');
    if(step.math) {
      assert.equal(step.eq,step.math.fallback);
      katex.renderToString(step.math.latex,{throwOnError:true});
    }
  }
  assert.equal(row.answer,row.answerMath.fallback);
  katex.renderToString(row.answerMath.latex,{throwOnError:true});
  if(evidence.figure.inTextbooks){
    assert.ok(row.figureSrc,evidence.id+' missing source-referenced figure');
    assert.ok(offline.includes('./'+row.figureSrc),row.figureSrc+' missing from offline cache');
    const svg = fs.readFileSync('site/'+row.figureSrc,'utf8');
    if (row.id === 'c10-4-ex4-3-q4') {
      assert.match(svg,/viewBox="0 0 320 180"/);
      assert.match(svg,/<rect x="48" y="42" width="216" height="90"/);
    } else assert.match(svg,/viewBox="0 0 320 220"/);
    assert.match(svg,/<title/);
    assert.match(svg,/<desc/);
    assert.match(svg,/role="img"/);
    assert.ok(row.figureAlt.en.length > 30);
  } else assert.ok(!row.figureSrc,evidence.id+' has an unnecessary figure');
}
const answer=(n,expected)=>assert.ok(byId.get('c10-4-ex4-3-q'+n).answer.includes(expected));
answer(1,'30 m');answer(2,'1 mile');answer(3,'21.74 m');
answer(4,'12 cm');answer(4,'5 cm');
answer(5,'10 m');answer(5,'24 m');answer(5,'26 m');
answer(6,'0.8 m');
answer(7,'2PQ² = 2PR² + QR²');
answer(8,'8AE² = 3AC² + 5AD²');

const close=(a,b,eps=1e-9)=>assert.ok(Math.abs(a-b)<eps,`${a} vs ${b}`);
close(Math.hypot(18,24),30);
close(Math.hypot(2,1.5),2.5);
close((2+1.5)-Math.hypot(2,1.5),1);
close(75-Math.hypot(34,41),21.7365040576569);
close(12+5,17);close(2*Math.hypot(12,5),26);
close(10**2+24**2,26**2);
close(Math.hypot(3,4),5);
close(Math.hypot(1.4,4.8),5);
close(4.8-4,.8);
for(const t of [0.5,1,3,7]) {
  for(const h of [2,5,11]) {
    // Q7: QS=3 SR, QR=4 SR, and each Pythagoras calculation is independent.
    const PQ2=h*h+9*t*t,PR2=h*h+t*t,QR2=16*t*t;
    close(2*PQ2,2*PR2+QR2);
    // Q8: BD=DE=EC=t, B is the right angle.
    const AD2=h*h+t*t,AE2=h*h+4*t*t,AC2=h*h+9*t*t;
    close(8*AE2,3*AC2+5*AD2);
  }
}
assert.ok(byId.get('c10-4-ex4-3-q3').steps.some(step=>step.en.includes('nearest whole metre')),'Q3 rounding discrepancy missing');

console.log('PASS G10 Geometry Exercise 4.3: 8 textbook prompts (EN/TA), offline figures, KaTeX and independent numerical/proof checks.');
