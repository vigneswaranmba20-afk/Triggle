'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const katex = require('../assets/vendor/katex/katex.min.js');
const { loadRuntime } = require('./curriculum_bulk.cjs');
const unit = require('../data/textbook-fidelity/g10-ch6-ex6-unit.json');

const html = fs.readFileSync('site/index.html', 'utf8');
const sw = fs.readFileSync('site/service-worker.js', 'utf8');
assert.ok(html.includes('g10-ch6-ex6-unit-en.js'));
assert.ok(sw.includes('./data/textbook-exercises/g10-ch6-ex6-unit-en.js'));

const runtime = loadRuntime();
const rows = runtime.classes[10].items.filter(r => String(r.chapter) === '6' && r.exercise === '6.unit' && r.kind === 'textbook' && !/^c10-6-6-/.test(r.id));
assert.equal(rows.length, 13);
const byId = new Map(rows.map(r => [r.id, r]));
assert.equal(byId.size, 13);

const notation = { window: { katex } };
vm.runInNewContext(fs.readFileSync('site/assets/math-notation.js', 'utf8'), notation);
const render = notation.window.TriggleNotation.render;

for (const evidence of unit.items) {
  const row = byId.get(evidence.id);
  assert.ok(row, 'Missing item ' + evidence.id);
  assert.equal(row.edition, '2025');
  assert.equal(row.translationReview, 'pending');
  assert.equal(row.sourceFidelity.status, 'page-visual-checked');
  assert.ok(row.steps[0].en.startsWith('Quick Solution Plan:'));
  assert.ok(row.steps[1].en.includes('Understand Deeply'));
  assert.ok(!/⇒|\\Rightarrow|\\implies/.test(JSON.stringify(row.steps) + JSON.stringify(row.answer)));
  for (const lang of ['en', 'ta']) {
    assert.equal(row.q[lang], evidence.textbookPrompt[lang], evidence.id + ' ' + lang);
    assert.equal(row.questionMath[lang].map(s => typeof s === 'string' ? s : s.fallback).join(''), row.q[lang], evidence.id + ' qMath ' + lang);
    for (const seg of row.questionMath[lang]) {
      if (typeof seg === 'object') assert.ok(!render(seg).includes('data-math-error'), evidence.id + ' seg ' + seg.latex);
    }
  }
  for (const st of row.steps) {
    assert.ok(st.en.length > 25 && st.eq && st.math);
    assert.equal(st.math.fallback, st.eq, evidence.id + ' fallback mismatch');
    assert.ok(!render(st.math).includes('data-math-error'), evidence.id + ' step math error: ' + st.math.latex);
    assert.ok(!/FRAC|undefined/.test(st.math.latex));
  }
  assert.equal(row.answerMath.fallback, row.answer);
  assert.ok(!render(row.answerMath).includes('data-math-error'));
  assert.ok(!/FRAC|undefined/.test(row.answerMath.latex));
  if (evidence.figure?.asset) {
    assert.equal(row.figureSrc, evidence.figure.asset);
    assert.ok(sw.includes('./' + row.figureSrc));
    const svg = fs.readFileSync('site/' + row.figureSrc, 'utf8');
    assert.match(svg, /viewBox="0 0 320 220"/);
    assert.match(svg, /<title/);
    assert.match(svg, /<desc/);
  }
}

// Independent trigonometric & numerical checks for Unit Exercise 6
const rad = d => d * Math.PI / 180;
const close = (a, b, tol = 1e-3) => assert.ok(Math.abs(a - b) <= tol, `${a} !== ${b}`);

for (const th of [0.33, 0.58, 0.94]) {
  const sec = 1 / Math.cos(th), cot = 1 / Math.tan(th), sin = Math.sin(th), cos = Math.cos(th), tan = Math.tan(th);
  close(cot * cot * ((sec - 1) / (1 + sin)) + sec * sec * ((sin - 1) / (1 + sec)), 0);
  close((tan * tan - 1) / (tan * tan + 1), 1 - 2 * cos * cos);
  close(((1 + sin - cos) / (1 + sin + cos)) ** 2, (1 - cos) / (1 + cos));
  // Q3
  const x3 = cos, y3 = sin;
  close(x3 * sin ** 3 + y3 * cos ** 3, sin * cos);
  close(x3 * sin, y3 * cos);
  close(x3 * x3 + y3 * y3, 1);
  // Q4
  const a4 = 3.1, b4 = -2.4, c4 = a4 * cos - b4 * sin;
  close(Math.abs(a4 * sin + b4 * cos), Math.sqrt(a4 * a4 + b4 * b4 - c4 * c4));
}
close(40 * (1.732 - 1), 29.28, 0.01); // Q5
close((600 / 0.7536 - 600 / 1.3270) / 175, 1.97, 0.01); // Q6
close(30 * 0.8192, 24.58, 0.01); // Q7(i)
close(30 * 0.5736, 17.21, 0.01); // Q7(ii)
close(32 * 0.6691, 21.41, 0.01); // Q7(iii)
close(32 * 0.7431, 23.78, 0.01); // Q7(iv)
{
  const dist8 = 200 * (Math.sqrt(3) + 1) / Math.sqrt(3);
  const h8 = dist8 / (1 / Math.tan(rad(60)) + 1 / Math.tan(rad(45)));
  close(h8, 200);
}
close(35 * (0.4452 + 0.6745), 39.19, 0.01); // Q9

console.log('PASS Grade 10 Ch 6 Unit Exercise 6 (13 tasks, 5 SVGs): KaTeX, bilingual 2025 prompts, and independent trigonometric checks.');
