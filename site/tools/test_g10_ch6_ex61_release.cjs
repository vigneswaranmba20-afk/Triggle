'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const katex = require('../assets/vendor/katex/katex.min.js');
const { loadRuntime } = require('./curriculum_bulk.cjs');
const { items, source, preservedCompleteIds } = require('../data/textbook-fidelity/g10-ch6-ex6-1.json');

const html = fs.readFileSync('site/index.html', 'utf8');
const sw = fs.readFileSync('site/service-worker.js', 'utf8');
assert.ok(html.includes('g10-ch6-ex6-1-en.js'), 'Ex 6.1 script missing in site/index.html');
assert.ok(sw.includes('./data/textbook-exercises/g10-ch6-ex6-1-en.js'), 'Ex 6.1 script missing from offline cache');
assert.equal(source.en.driveId, '13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of');

const runtime = loadRuntime();
const canonicalRows = runtime.classes[10].items.filter(row =>
  String(row.chapter) === '6' && row.exercise === '6.1' && row.kind === 'textbook' && !/^c10-6-6-/.test(row.id)
);
assert.equal(canonicalRows.length, 19, 'Exercise 6.1 must have 19 canonical source-verified subparts (18 new + 1 preserved Q2(i))');
assert.equal(items.length, 18);
assert.deepEqual(preservedCompleteIds, ['c10-6-ex6-1-q2-i']);
const byId = new Map(canonicalRows.map(r => [r.id, r]));
assert.equal(byId.size, 19);
assert.ok(byId.has('c10-6-ex6-1-q2-i'));

// Preserve legacy c10-6-6-1-1..1-3 for backward compatibility
for (const leg of ['c10-6-6-1-1', 'c10-6-6-1-2', 'c10-6-6-1-3']) {
  assert.ok(runtime.classes[10].items.some(r => r.id === leg), 'Legacy ID intact: ' + leg);
}

const notation = { window: { katex } };
vm.runInNewContext(fs.readFileSync('site/assets/math-notation.js', 'utf8'), notation);
const render = notation.window.TriggleNotation.render;

for (const evidence of items) {
  const row = byId.get(evidence.id);
  assert.ok(row, 'Missing Exercise 6.1 item ' + evidence.id);
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
    assert.ok(!/FRAC|undefined/.test(st.math.latex));
  }
  assert.equal(row.answerMath.fallback, row.answer);
  assert.ok(!render(row.answerMath).includes('data-math-error'));
  assert.ok(!/FRAC|undefined/.test(row.answerMath.latex));
}

// Independent numerical identity checks across multiple acute angles
const close = (a, b) => assert.ok(Math.abs(a - b) < 1e-10, `${a} !== ${b}`);
for (const deg of [17, 23, 37, 41]) {
  const th = deg * Math.PI / 180;
  const s = Math.sin(th), c = Math.cos(th), t = Math.tan(th), cot = 1 / t, sec = 1 / c, csc = 1 / s;
  close(cot + t, sec * csc); // Q1(i)
  close(t ** 4 + t ** 2, sec ** 4 - sec ** 2); // Q1(ii)
  close((1 - t * t) / (cot * cot - 1), t * t); // Q2(i)
  close(c / (1 + s), sec - t); // Q2(ii)
  close(Math.sqrt((1 + s) / (1 - s)), sec + t); // Q3(i)
  close(Math.sqrt((1 + s) / (1 - s)) + Math.sqrt((1 - s) / (1 + s)), 2 * sec); // Q3(ii)
  close(sec ** 6, t ** 6 + 3 * t * t * sec * sec + 1); // Q4(i)
  close((s + sec) ** 2 + (c + csc) ** 2, 1 + (sec + csc) ** 2); // Q4(ii)
  close((sec ** 4) * (1 - s ** 4) - 2 * t * t, 1); // Q5(i)
  close((cot - c) / (cot + c), (csc - 1) / (csc + 1)); // Q5(ii)
  const A = 0.4, B = 0.7;
  close((Math.sin(A) - Math.sin(B)) / (Math.cos(A) + Math.cos(B)) + (Math.cos(A) - Math.cos(B)) / (Math.sin(A) + Math.sin(B)), 0); // Q6(i)
  close((Math.sin(A) ** 3 + Math.cos(A) ** 3) / (Math.sin(A) + Math.cos(A)) + (Math.sin(A) ** 3 - Math.cos(A) ** 3) / (Math.sin(A) - Math.cos(A)), 2); // Q6(ii)
  const alpha = 0.5, beta = 0.8;
  const m = Math.cos(alpha) / Math.cos(beta), n = Math.cos(alpha) / Math.sin(beta);
  close((m * m + n * n) * (Math.cos(beta) ** 2), n * n); // Q8(i)
  const x = cot + t, y = sec - c;
  close((x * x * y) ** (2 / 3) - (x * y * y) ** (2 / 3), 1); // Q8(ii)
  const p = s + c, q = sec + csc;
  close(q * (p * p - 1), 2 * p); // Q9(i)
  const a = (1 + s) / c;
  close((a * a - 1) / (a * a + 1), s); // Q10
}
// Q7(ii): theta = 30 deg => tan(theta)=1/sqrt(3) => 1 - 3 tan^2(30) == 0
close(1 - 3 * Math.tan(Math.PI / 6) ** 2, 0);
// Q9(ii): numerical root where sin(th)*(1+sin^2(th)) - cos^2(th) == 0
let lo = 0, hi = Math.PI / 2;
for (let i = 0; i < 60; i++) {
  const mid = (lo + hi) / 2;
  const f = Math.sin(mid) * (1 + Math.sin(mid) ** 2) - Math.cos(mid) ** 2;
  if (f < 0) lo = mid; else hi = mid;
}
const c9 = Math.cos((lo + hi) / 2);
close(c9 ** 6 - 4 * c9 ** 4 + 8 * c9 ** 2, 4);

console.log('PASS Grade 10 Ch 6 Exercise 6.1: 19/19 canonical items verified (18 new + 1 preserved), bilingual 2025 prompts, KaTeX, and independent trigonometric identity checks.');
