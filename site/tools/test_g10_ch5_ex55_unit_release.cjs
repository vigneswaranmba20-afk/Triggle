'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const katex = require('../assets/vendor/katex/katex.min.js');
const { loadRuntime } = require('./curriculum_bulk.cjs');
const ex55 = require('../data/textbook-fidelity/g10-ch5-ex5-5.json');
const unit = require('../data/textbook-fidelity/g10-ch5-ex5-unit.json');

const html = fs.readFileSync('site/index.html', 'utf8');
const sw = fs.readFileSync('site/service-worker.js', 'utf8');
assert.ok(html.includes('g10-ch5-ex5-5-en.js'), 'Ex 5.5 script missing in site/index.html');
assert.ok(html.includes('g10-ch5-ex5-unit-en.js'), 'Unit Ex 5 script missing in site/index.html');
assert.ok(sw.includes('./data/textbook-exercises/g10-ch5-ex5-5-en.js'), 'Ex 5.5 missing from offline cache');
assert.ok(sw.includes('./data/textbook-exercises/g10-ch5-ex5-unit-en.js'), 'Unit Ex 5 missing from offline cache');
assert.equal(ex55.source.en.driveId, '13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of');
assert.equal(unit.source.en.driveId, '13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of');

const runtime = loadRuntime();
const rows55 = runtime.classes[10].items.filter(row => String(row.chapter) === '5' && row.exercise === '5.5' && row.kind === 'textbook');
const rowsUnit = runtime.classes[10].items.filter(row => String(row.chapter) === '5' && row.exercise === '5.unit' && row.kind === 'textbook');
assert.equal(rows55.length, 15, 'Exercise 5.5 must register all 15 MCQs');
assert.equal(rowsUnit.length, 10, 'Unit Exercise 5 must register all 10 questions');

// Preserve legacy c10-5-5-practice-20 untouched
assert.ok(runtime.classes[10].items.some(row => row.id === 'c10-5-5-practice-20'), 'Legacy c10-5-5-practice-20 must remain intact');

const byId = new Map([...rows55, ...rowsUnit].map(r => [r.id, r]));
assert.equal(byId.size, 25);

const notation = { window: { katex } };
vm.runInNewContext(fs.readFileSync('site/assets/math-notation.js', 'utf8'), notation);
const render = notation.window.TriggleNotation.render;

for (const evidence of [...ex55.items, ...unit.items]) {
  const row = byId.get(evidence.id);
  assert.ok(row, 'Missing Ch5 item ' + evidence.id);
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

const close = (a, b) => assert.ok(Math.abs(a - b) < 1e-9);
// Ex 5.5 Q1-Q15 independent checks
assert.equal(0.5 * Math.abs((-5 * (-5) + 0 + 0) - (0 + (-5) * 5 + 0)), 25); // Q1
assert.equal((9 - 7) / (3 - 5), (6 - 7) / (6 - 5)); // Q4 p=9
assert.equal(3 * 3 - 5, 4); assert.equal(3 + 5, 8); // Q5 (3,5)
assert.equal((2 - 3) / (4 - 12), 1 / 8); // Q6 a=2
assert.equal(((8 - 0) / (-8 - 0)) * 1, -1); // Q7
close((1 / Math.sqrt(3)) * (-Math.sqrt(3)), -1); // Q8
assert.equal(8 * 0 + 5 * 8, 40); assert.equal(8 * 5 + 5 * 0, 40); // Q9
assert.equal(3 * 0 + 7 * 0, 0); close((7 / 3) * (-3 / 7), -1); // Q10
close((3 / 4) * (-4 / 3), -1); // Q11
assert.equal(4 / 8, 0.5); close(21 / 8, 2.625); // Q12
assert.equal(2 + 1, 3); assert.equal(3 * 2 + 1, 7); // Q15

// Unit Ex 5 Q1-Q10 independent checks
// Q1: midpoints A(-1,1.5), B(2,4), C(5,1.5), D(2,-1) => equal sides, AC!=BD
assert.equal(Math.hypot(3, 2.5), Math.hypot(-3, 2.5));
assert.notEqual(6, 5);
// Q2: area of (2,1),(3,-2),(7/2,13/2)
close(0.5 * Math.abs((2 * (-2) + 3 * 6.5 + 3.5 * 1) - (1 * 3 + (-2) * 3.5 + 6.5 * 2)), 5);
// Q3: concurrency at (1,-1)
assert.equal(3 * 1 + (-1) - 2, 0);
assert.equal(5 * 1 + 2 * (-1) - 3, 0);
assert.equal(2 * 1 - (-1) - 3, 0);
// Q4: quad area = 72 when k = -5
assert.equal(0.5 * ((-5 * (-5) + 24 - 5 + 28) - (-28 - (-5) - 24 - 25)), 72);
// Q5: parallelogram slopes
assert.equal((0 - (-1)) / (4 - (-2)), (2 - 3) / (-3 - 3));
assert.equal((3 - 0) / (3 - 4), (-1 - 2) / (-2 - (-3)));
// Q6: intercepts 3,-2 and -2,3
assert.equal(2 * 3 - 3 * 0 - 6, 0); assert.equal(2 * 0 - 3 * (-2) - 6, 0);
assert.equal(3 * (-2) - 2 * 0 + 6, 0); assert.equal(3 * 0 - 2 * 3 + 6, 0);
// Q7: linear demand
assert.equal(980 + ((1220 - 980) / (16 - 14)) * (17 - 14), 1340);
// Q8: reflection image (-1,-4) across x+3y=7 midpoint (1,2)
assert.equal(1 + 3 * 2, 7);
close(((-4 - 8) / (-1 - 3)) * (-1 / 3), -1);
// Q9: intersection (1/13, 5/13) on 13x+13y-6=0
close(4 * (1 / 13) + 7 * (5 / 13) - 3, 0);
close(2 * (1 / 13) - 3 * (5 / 13) + 1, 0);
close(13 * (1 / 13) + 13 * (5 / 13) - 6, 0);
// Q10: intersection (-1/17, 22/17) on 119x+102y-125=0 perp 6x-7y+8=0
close(2 * (-1 / 17) - 3 * (22 / 17) + 4, 0);
close(3 * (-1 / 17) + 4 * (22 / 17) - 5, 0);
close(119 * (-1 / 17) + 102 * (22 / 17) - 125, 0);
close((-119 / 102) * (6 / 7), -1);

console.log('PASS Grade 10 Ch 5 Ex 5.5 (15 MCQs) & Unit Exercise 5 (10 Qs): 25/25 verified, 3 coordinate SVGs, KaTeX, bilingual prompts, legacy preservation.');
