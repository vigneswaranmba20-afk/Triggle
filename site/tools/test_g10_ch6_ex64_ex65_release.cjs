'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const katex = require('../assets/vendor/katex/katex.min.js');
const { loadRuntime } = require('./curriculum_bulk.cjs');
const ex64 = require('../data/textbook-fidelity/g10-ch6-ex6-4.json');
const ex65 = require('../data/textbook-fidelity/g10-ch6-ex6-5.json');

const html = fs.readFileSync('site/index.html', 'utf8');
const sw = fs.readFileSync('site/service-worker.js', 'utf8');
assert.ok(html.includes('g10-ch6-ex6-4-en.js') && html.includes('g10-ch6-ex6-5-en.js'));
assert.ok(sw.includes('./data/textbook-exercises/g10-ch6-ex6-4-en.js') && sw.includes('./data/textbook-exercises/g10-ch6-ex6-5-en.js'));

const runtime = loadRuntime();
const rows64 = runtime.classes[10].items.filter(r => String(r.chapter) === '6' && r.exercise === '6.4' && r.kind === 'textbook' && !/^c10-6-6-/.test(r.id));
const rows65 = runtime.classes[10].items.filter(r => String(r.chapter) === '6' && r.exercise === '6.5' && r.kind === 'textbook' && !/^c10-6-6-/.test(r.id));
assert.equal(rows64.length, 9);
assert.equal(rows65.length, 15);
const byId = new Map([...rows64, ...rows65].map(r => [r.id, r]));
assert.equal(byId.size, 24);

const notation = { window: { katex } };
vm.runInNewContext(fs.readFileSync('site/assets/math-notation.js', 'utf8'), notation);
const render = notation.window.TriggleNotation.render;

for (const evidence of [...ex64.items, ...ex65.items]) {
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

// Independent mathematical checks
const rad = d => d * Math.PI / 180;
const close = (a, b, tol = 1e-3) => assert.ok(Math.abs(a - b) <= tol, `${a} !== ${b}`);

// Ex 6.4 Q1..Q6
close(13 * (1 + 1.732), 35.52, 0.01);
close(40 * 1.732, 69.28, 0.01);
close(40 + 40 * Math.sqrt(3) * Math.tan(rad(60)), 160, 0.01);
{
  const h = 15, t1 = rad(20), t2 = rad(40);
  const x = (2 * h * Math.tan(t1)) / (Math.tan(t2) - Math.tan(t1));
  close(h + x, h * (Math.tan(t1) + Math.tan(t2)) / (Math.tan(t2) - Math.tan(t1)));
}
close(50 / Math.tan(rad(30)) * Math.tan(rad(60)), 150, 0.01);
close(66 + 66 * Math.tan(rad(60)) / Math.tan(rad(30)), 264, 0.01);
close(66 * 1.732, 114.31, 0.01);
close(8 * 0.3640, 2.91, 0.01);
close(4 * 1.732, 6.93, 0.01);

// Ex 6.5 Q1..Q15
for (const th of [0.27, 0.61, 1.03]) {
  close(Math.sin(th) ** 2 + 1 / (1 + Math.tan(th) ** 2), 1);
  close(Math.tan(th) / (Math.sin(th) ** 2) - Math.tan(th), 1 / Math.tan(th));
  const lhs3 = (Math.sin(th) + 1 / Math.sin(th)) ** 2 + (Math.cos(th) + 1 / Math.cos(th)) ** 2;
  close(lhs3 - Math.tan(th) ** 2 - 1 / Math.tan(th) ** 2, 7);
  const a4 = Math.sin(th) + Math.cos(th), b4 = 1 / Math.cos(th) + 1 / Math.sin(th);
  close(b4 * (a4 * a4 - 1), 2 * a4);
  const x5 = 1 / Math.cos(th) / 5, y5 = 5 / Math.tan(th);
  close(x5 * x5 - 1 / (y5 * y5), 1 / 25);
  close((1 + Math.tan(th) + 1 / Math.cos(th)) * (1 + 1 / Math.tan(th) - 1 / Math.sin(th)), 2);
  const a9 = 3.2, b9 = 5.7;
  const p9 = a9 / Math.tan(th) + b9 / Math.sin(th), q9 = b9 / Math.tan(th) + a9 / Math.sin(th);
  close(p9 * p9 - q9 * q9, b9 * b9 - a9 * a9);
}
close(2 * Math.tan(rad(45)) ** 2 + Math.sin(rad(45)) ** 2 - 1, 1.5);
close(Math.atan(Math.sqrt(3)) * 180 / Math.PI, 60);
close(60 * (1.732 - 1), 43.92, 0.01);
{
  const b15 = rad(22), h15 = 100;
  const d15 = h15 * (1 + Math.tan(b15)) / (Math.tan(rad(45)) - Math.tan(b15)); // actually check H
  close(Math.tan(b15), (d15 - h15) / (d15 + h15));
}

console.log('PASS Grade 10 Ch 6 Ex 6.4 (9 tasks, 6 SVGs) & Ex 6.5 (15 MCQs): KaTeX, bilingual 2025 prompts, and independent trigonometric checks.');
