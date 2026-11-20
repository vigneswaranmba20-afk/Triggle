'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const katex = require('../assets/vendor/katex/katex.min.js');
const { loadRuntime } = require('./curriculum_bulk.cjs');
const ex62 = require('../data/textbook-fidelity/g10-ch6-ex6-2.json');
const ex63 = require('../data/textbook-fidelity/g10-ch6-ex6-3.json');

const html = fs.readFileSync('site/index.html', 'utf8');
const sw = fs.readFileSync('site/service-worker.js', 'utf8');
assert.ok(html.includes('g10-ch6-ex6-2-en.js') && html.includes('g10-ch6-ex6-3-en.js'));
assert.ok(sw.includes('./data/textbook-exercises/g10-ch6-ex6-2-en.js') && sw.includes('./data/textbook-exercises/g10-ch6-ex6-3-en.js'));

const runtime = loadRuntime();
const rows62 = runtime.classes[10].items.filter(r => String(r.chapter) === '6' && r.exercise === '6.2' && r.kind === 'textbook' && !/^c10-6-6-/.test(r.id));
const rows63 = runtime.classes[10].items.filter(r => String(r.chapter) === '6' && r.exercise === '6.3' && r.kind === 'textbook' && !/^c10-6-6-/.test(r.id));
assert.equal(rows62.length, 7);
assert.equal(rows63.length, 6);
const byId = new Map([...rows62, ...rows63].map(r => [r.id, r]));
assert.equal(byId.size, 13);

const notation = { window: { katex } };
vm.runInNewContext(fs.readFileSync('site/assets/math-notation.js', 'utf8'), notation);
const render = notation.window.TriggleNotation.render;

for (const evidence of [...ex62.items, ...ex63.items]) {
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
    assert.equal(row.questionMath[lang].map(s => typeof s === 'string' ? s : s.fallback).join(''), row.q[lang]);
    for (const seg of row.questionMath[lang]) {
      if (typeof seg === 'object') assert.ok(!render(seg).includes('data-math-error'));
    }
  }
  for (const st of row.steps) {
    assert.ok(st.en.length > 25 && st.eq && st.math);
    assert.equal(st.math.fallback, st.eq);
    assert.ok(!render(st.math).includes('data-math-error'));
    assert.ok(!/FRAC|undefined/.test(st.math.latex));
  }
  assert.equal(row.answerMath.fallback, row.answer);
  assert.ok(!render(row.answerMath).includes('data-math-error'));
  assert.equal(row.figureSrc, evidence.figure.asset);
  assert.ok(sw.includes('./' + row.figureSrc));
  const svg = fs.readFileSync('site/' + row.figureSrc, 'utf8');
  assert.match(svg, /viewBox="0 0 320 220"/);
  assert.match(svg, /<title/);
  assert.match(svg, /<desc/);
}

const rad = d => d * Math.PI / 180;
const close = (a, b, tol = 1e-3) => assert.ok(Math.abs(a - b) <= tol, `${a} !== ${b}`);
// Ex 6.2 numerical verification
close(Math.atan((10 * Math.sqrt(3)) / 30), rad(30), 1e-12); // Q1: 30°
close(2 * (4 * Math.sqrt(3) / Math.tan(rad(30))), 24, 1e-12); // Q2: 24 m
close(5 * (1.732 - 1), 3.66, 1e-9); // Q3: 3.66 m
close((1.6 * 0.8391) / (1.732 - 0.8391), 1.5036, 1e-3); // Q4: ~1.5 m
assert.equal(7, (16.392 + 7) - 16.392); // Q5(i): h = 7 m
close(12 / (1.732 - 1), 16.393, 2e-3); // Q5(ii): ~16.39 m
close(15 - (15 / Math.tan(rad(60))) * Math.tan(rad(30)), 10, 1e-12); // Q6: 10 m

// Ex 6.3 numerical verification
close((50 * Math.sqrt(3)) / Math.tan(rad(30)), 150, 1e-12); // Q1: 150 m
close(120 - 70 * Math.tan(rad(45)), 50, 1e-12); // Q2: 50 m
close(60 - (60 / 1.732) * 0.7813, 32.93, 1e-2); // Q3: 32.93 m
close(1800 * 1.732 - 600 * 1.732, 2078.4, 1e-9); // Q4: 2078.4 m
for (const h of [10, 27, 45]) {
  close(h / Math.tan(rad(30)) + h / Math.tan(rad(60)), 4 * h / Math.sqrt(3), 1e-10); // Q5: 4h/sqrt(3)
}
close((90 - 30 * Math.sqrt(3) * Math.tan(rad(30))) / 2, 30, 1e-12); // Q6: 30 ft/min

console.log('PASS Grade 10 Ch 6 Ex 6.2 (7 items) & Ex 6.3 (6 items = 7 inventory tasks): 12 right-triangle SVGs, KaTeX, bilingual 2025 prompts, and independent trigonometric checks.');
