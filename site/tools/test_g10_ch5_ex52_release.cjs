'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const katex = require('../assets/vendor/katex/katex.min.js');
const { loadRuntime } = require('./curriculum_bulk.cjs');
const { items, source } = require('../data/textbook-fidelity/g10-ch5-ex5-2.json');

const html = fs.readFileSync('site/index.html', 'utf8');
const sw = fs.readFileSync('site/service-worker.js', 'utf8');
assert.ok(html.includes('g10-ch5-ex5-2-en.js'), 'Ex 5.2 script missing in site/index.html');
assert.ok(sw.includes('./data/textbook-exercises/g10-ch5-ex5-2-en.js'), 'Ex 5.2 script missing from offline cache');
assert.equal(source.en.driveId, '13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of');

const runtime = loadRuntime();
const rows = runtime.classes[10].items.filter(row => String(row.chapter) === '5' && row.exercise === '5.2' && row.kind === 'textbook');
assert.equal(rows.length, 17, 'Exercise 5.2 must register all 17 source-verified subparts');
assert.equal(items.length, 17);
const byId = new Map(rows.map(r => [r.id, r]));
assert.equal(byId.size, 17);

const notation = { window: { katex } };
vm.runInNewContext(fs.readFileSync('site/assets/math-notation.js', 'utf8'), notation);
const render = notation.window.TriggleNotation.render;

for (const evidence of items) {
  const row = byId.get(evidence.id);
  assert.ok(row, 'Missing Exercise 5.2 item ' + evidence.id);
  assert.equal(row.edition, '2025');
  assert.equal(row.translationReview, 'pending');
  assert.equal(row.sourceFidelity.status, 'page-visual-checked');
  assert.ok(row.steps[0].en.startsWith('Quick Solution Plan:'));
  assert.ok(row.steps[1].en.includes('Understand Deeply'));
  assert.ok(!/⇒|\\Rightarrow|\\implies/.test(JSON.stringify(row.steps) + JSON.stringify(row.answer)));
  for (const lang of ['en', 'ta']) {
    assert.equal(row.q[lang], evidence.textbookPrompt[lang], evidence.id + ' prompt ' + lang);
    assert.equal(row.questionMath[lang].map(s => typeof s === 'string' ? s : s.fallback).join(''), row.q[lang]);
    for (const seg of row.questionMath[lang]) {
      if (typeof seg === 'object') assert.ok(!render(seg).includes('data-math-error'));
    }
  }
  for (const st of row.steps) {
    assert.ok(st.en.length > 25 && st.eq && st.math);
    assert.equal(st.math.fallback, st.eq);
    assert.ok(!render(st.math).includes('data-math-error'));
  }
  assert.equal(row.answerMath.fallback, row.answer);
  assert.ok(!render(row.answerMath).includes('data-math-error'));
  if (evidence.figure.asset) {
    assert.equal(row.figureSrc, evidence.figure.asset);
    assert.ok(sw.includes('./' + row.figureSrc));
    const svg = fs.readFileSync('site/' + row.figureSrc, 'utf8');
    assert.match(svg, /viewBox="0 0 320 220"/);
    assert.match(svg, /<title/);
    assert.match(svg, /<desc/);
  }
}

const slope = (a, b) => (b[1] - a[1]) / (b[0] - a[0]);
const close = (a, b) => assert.ok(Math.abs(a - b) < 1e-9);
close(slope([0,0], [5, Math.sqrt(5)]), 1 / Math.sqrt(5));
assert.equal((3 - 1) / (-1 - 5), -1 / 3);
close(slope([-3,-4], [7,2]), slope([7,2], [12,5]));
close(slope([1,-3], [3,-1]), slope([3,-1], [7,3]));
assert.equal((3 - 8.5) / (9 - (-2)), -0.5);
assert.equal(slope([-2,6], [4,8]) * slope([8,12], [4,24]), -1);
assert.equal(slope([1,-4], [2,-3]) * slope([1,-4], [4,-7]), -1);
close(slope([9,12], [3,14]) * slope([0,5], [3,14]), -1);
assert.equal(slope([2.5,3.5], [10,-4]), slope([2.5,-2.5], [-5,5]));
assert.equal(slope([10,-4], [2.5,-2.5]), slope([-5,5], [2.5,3.5]));
assert.equal((2 + 1) / 2, (-2 + 5) / 2);
assert.equal((2 - 3) / 2, (-3 + 2) / 2);
assert.equal(slope([3,-4], [9,-4]), slope([5,-7], [7,-7]));
assert.notEqual(slope([9,-4], [5,-7]), slope([3,-4], [7,-7]));
assert.equal(slope([0.5,-1.5], [5.5,2]), slope([-0.5,5.5], [-5.5,2]));
assert.equal(slope([5.5,2], [-0.5,5.5]), slope([0.5,-1.5], [-5.5,2]));


// AUD24-01: preserve the printed prompt but distinguish its crossing order.
const trap = byId.get('c10-5-ex5-2-q12');
const A = [3,-4], B = [9,-4], C = [5,-7], D = [7,-7];
assert.equal(slope(A,B), 0);
assert.equal(slope(C,D), 0);
assert.equal(slope(A,C), -3/2);
assert.equal(slope(B,D), 3/2);
assert.equal(slope(B,C), 3/4);
assert.equal(slope(A,D), -3/4);
assert.equal(A[1]+slope(A,D)*(6-A[0]), -5.5);
assert.equal(B[1]+slope(B,C)*(6-B[0]), -5.5);
assert.match(trap.answerMath.latex, /m_\{BC\}/);
assert.match(trap.answerMath.latex, /m_\{AD\}/);
assert.match(trap.figureCaption.en, /ABDC/);
assert.match(trap.figureCaption.ta, /ABDC/);
assert.ok(trap.steps.every(s => typeof s.ta === 'string' && s.ta.length > 25));
const trapSvg = fs.readFileSync('site/' + trap.figureSrc, 'utf8');
assert.match(trapSvg, /stroke-dasharray="4 3"/);
assert.match(trapSvg, /x1="257" y1="64" x2="134\.3" y2="156"/);
assert.match(trapSvg, /x1="73" y1="64" x2="195\.7" y2="156"/);

console.log('PASS Grade 10 Ch 5 Exercise 5.2: 17/17 source-verified subparts, 5 coordinate SVGs, KaTeX, bilingual prompts, and independent slope checks.');
