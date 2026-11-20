'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const katex = require('../assets/vendor/katex/katex.min.js');
const { loadRuntime } = require('./curriculum_bulk.cjs');
const { items, source } = require('../data/textbook-fidelity/g10-ch5-ex5-4.json');

const html = fs.readFileSync('site/index.html', 'utf8');
const sw = fs.readFileSync('site/service-worker.js', 'utf8');
assert.ok(html.includes('g10-ch5-ex5-4-en.js'), 'Ex 5.4 script missing in site/index.html');
assert.ok(sw.includes('./data/textbook-exercises/g10-ch5-ex5-4-en.js'), 'Ex 5.4 script missing from offline cache');
assert.equal(source.en.driveId, '13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of');

const runtime = loadRuntime();
const rows = runtime.classes[10].items.filter(row => String(row.chapter) === '5' && row.exercise === '5.4' && row.kind === 'textbook');
assert.equal(rows.length, 15, 'Exercise 5.4 must register all 15 source-verified subparts');
assert.equal(items.length, 15);
const byId = new Map(rows.map(r => [r.id, r]));
assert.equal(byId.size, 15);

const notation = { window: { katex } };
vm.runInNewContext(fs.readFileSync('site/assets/math-notation.js', 'utf8'), notation);
const render = notation.window.TriggleNotation.render;

for (const evidence of items) {
  const row = byId.get(evidence.id);
  assert.ok(row, 'Missing Exercise 5.4 item ' + evidence.id);
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
// Q1-Q3 slopes
close(-(0) / 5, 0);
close(-(1 / 3) / (1 / 4), -(2 / 3) / (1 / 2));
close((-5 / 23) * (23 / 5), -1);
// Q4: -(p+3)/12 * (12/7) = -1 => p = 4
close((-(4 + 3) / 12) * (12 / 7), -1);
// Q5: P(-5,2), parallel QR((3,-2),(-5,4)) => 3x + 4y + 7 = 0
assert.equal(3 * (-5) + 4 * 2 + 7, 0);
close(-3 / 4, (4 - (-2)) / (-5 - 3));
// Q6: through (6,-2) perp (6,7),(2,-3) => 2x + 5y - 2 = 0
assert.equal(2 * 6 + 5 * (-2) - 2, 0);
close((-2 / 5) * ((-3 - 7) / (2 - 6)), -1);
// Q7: A(-3,0), B(10,-2), C(12,3) => altitudes 2x+5y+6=0 and 5x+y-48=0
assert.equal(2 * (-3) + 5 * 0 + 6, 0);
close((-2 / 5) * ((3 - (-2)) / (12 - 10)), -1);
assert.equal(5 * 10 + (-2) - 48, 0);
close(-5 * ((3 - 0) / (12 - (-3))), -1);
// Q8: perp bisector of (-4,2),(6,-4) => 5x - 3y - 8 = 0
assert.equal(5 * 1 - 3 * (-1) - 8, 0);
close((5 / 3) * ((-4 - 2) / (6 - (-4))), -1);
// Q9: intersection of 7x+3y=10, 5x-4y=1 is (1,1), parallel 13x+5y+12=0 => 13x+5y-18=0
assert.equal(7 * 1 + 3 * 1, 10);
assert.equal(5 * 1 - 4 * 1, 1);
assert.equal(13 * 1 + 5 * 1 - 18, 0);
// Q10: intersection (16/7, 11/7), perp 4x-7y+13=0 => 49x+28y-156=0
close(5 * (16 / 7) - 6 * (11 / 7), 2);
close(3 * (16 / 7) + 2 * (11 / 7), 10);
close(49 * (16 / 7) + 28 * (11 / 7) - 156, 0);
close((-49 / 28) * (4 / 7), -1);
// Q11: P(0,-2), Q(-15/11,9/11) => 31x + 15y + 30 = 0
assert.equal(31 * 0 + 15 * (-2) + 30, 0);
close(31 * (-15 / 11) + 15 * (9 / 11) + 30, 0);
// Q12: P(9/4, 0), M(-1, 1) => 4x + 13y - 9 = 0
close(4 * (9 / 4) + 13 * 0 - 9, 0);
assert.equal(4 * (-1) + 13 * 1 - 9, 0);

console.log('PASS Grade 10 Ch 5 Exercise 5.4: 15/15 source-verified subparts, 2 coordinate SVGs, KaTeX, bilingual prompts, and independent verification.');
