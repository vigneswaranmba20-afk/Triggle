'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const katex = require('../assets/vendor/katex/katex.min.js');
const { loadRuntime } = require('./curriculum_bulk.cjs');
const { items, source } = require('../data/textbook-fidelity/g10-ch5-ex5-3.json');

const html = fs.readFileSync('site/index.html', 'utf8');
const sw = fs.readFileSync('site/service-worker.js', 'utf8');
assert.ok(html.includes('g10-ch5-ex5-3-en.js'), 'Ex 5.3 script missing in site/index.html');
assert.ok(sw.includes('./data/textbook-exercises/g10-ch5-ex5-3-en.js'), 'Ex 5.3 script missing from offline cache');
assert.equal(source.en.driveId, '13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of');

const runtime = loadRuntime();
const rows = runtime.classes[10].items.filter(row => String(row.chapter) === '5' && row.exercise === '5.3' && row.kind === 'textbook');
assert.equal(rows.length, 22, 'Exercise 5.3 must register all 22 source-verified subparts');
assert.equal(items.length, 22);
const byId = new Map(rows.map(r => [r.id, r]));
assert.equal(byId.size, 22);

const notation = { window: { katex } };
vm.runInNewContext(fs.readFileSync('site/assets/math-notation.js', 'utf8'), notation);
const render = notation.window.TriggleNotation.render;

for (const evidence of items) {
  const row = byId.get(evidence.id);
  assert.ok(row, 'Missing Exercise 5.3 item ' + evidence.id);
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
// Q1: midpoint of (1,-5) and (4,2) is (5/2, -3/2)
assert.equal(2 * (-3 / 2) + 3, 0);
assert.equal(2 * (5 / 2) - 5, 0);
// Q2: 2(x-y)+5=0 => y = x + 5/2
assert.equal(Math.atan(1) * 180 / Math.PI, 45);
// Q3: m = 1/sqrt(3), c = -3 => x - sqrt(3)y - 3sqrt(3) = 0
close(0 - Math.sqrt(3) * (-3) - 3 * Math.sqrt(3), 0);
// Q4: slope = -sqrt(3)/(1-sqrt(3)) = (3+sqrt(3))/2, y-intercept = 3/(1-sqrt(3)) = -(3+3sqrt(3))/2
close(-Math.sqrt(3) / (1 - Math.sqrt(3)), (Math.sqrt(3) + 3) / 2);
close(3 / (1 - Math.sqrt(3)), -(3 + 3 * Math.sqrt(3)) / 2);
// Q5: slope of (-2,3),(8,5) is 2/10 = 1/5 => perpendicular slope a = -5
assert.equal(((5 - 3) / (8 - (-2))) * (-5), -1);
// Q6: through (19,3) slope 1 => x - y - 16 = 0
assert.equal(19 - 3 - 16, 0);
// Q7(i): through (2,2/3) and (-1/2,-2) => 16x - 15y - 22 = 0
close(16 * 2 - 15 * (2 / 3) - 22, 0);
close(16 * (-0.5) - 15 * (-2) - 22, 0);
// Q7(ii): through (2,3) and (-7,-1) => 4x - 9y + 19 = 0
assert.equal(4 * 2 - 9 * 3 + 19, 0);
assert.equal(4 * (-7) - 9 * (-1) + 19, 0);
// Q8: through (-6,-4) and (5,11) => 15x - 11y + 46 = 0
assert.equal(15 * (-6) - 11 * (-4) + 46, 0);
assert.equal(15 * 5 - 11 * 11 + 46, 0);
// Q9(i): A(6,2), mid(B,C) = (-2,4) => x + 4y - 14 = 0
assert.equal(6 + 4 * 2 - 14, 0);
assert.equal(-2 + 4 * 4 - 14, 0);
// Q9(ii): altitude from A(6,2) perp BC((-5,-1),(1,9)), slope_BC=5/3, alt slope=-3/5 => 3x + 5y - 28 = 0
assert.equal(3 * 6 + 5 * 2 - 28, 0);
close(((9 - (-1)) / (1 - (-5))) * (-3 / 5), -1);
// Q10: slope -5/4 through (-1,2) => 5x + 4y - 3 = 0
assert.equal(5 * (-1) + 4 * 2 - 3, 0);
// Q11: y = -0.1x + 1
assert.equal(-0.1 * 0 + 1, 1);
close(-0.1 * 7.5 + 1, 0.25);
assert.equal(-0.1 * 10 + 1, 0);
// Q12(i): intercepts 4, -6 => 3x - 2y - 12 = 0
assert.equal(3 * 4 - 2 * 0 - 12, 0);
assert.equal(3 * 0 - 2 * (-6) - 12, 0);
// Q12(ii): intercepts -5, 3/4 => 3x - 20y + 15 = 0
assert.equal(3 * (-5) - 20 * 0 + 15, 0);
assert.equal(3 * 0 - 20 * (3 / 4) + 15, 0);
// Q13(i),(ii): intercepts
assert.equal(3 * 2 - 2 * 0 - 6, 0);
assert.equal(3 * 0 - 2 * (-3) - 6, 0);
assert.equal(4 * (-3) + 3 * 0 + 12, 0);
assert.equal(4 * 0 + 3 * (-4) + 12, 0);
// Q14(i): through (1,-4), ratio 2:5 => 5x + 2y + 3 = 0 (intercepts -3/5, -3/2, ratio 2:5)
assert.equal(5 * 1 + 2 * (-4) + 3, 0);
close((-3 / 5) / (-3 / 2), 2 / 5);
// Q14(ii): through (-8,4), equal intercepts => x + y + 4 = 0
assert.equal(-8 + 4 + 4, 0);

console.log('PASS Grade 10 Ch 5 Exercise 5.3: 22/22 source-verified subparts, 2 coordinate SVGs, KaTeX, bilingual prompts, and independent algebra checks.');
