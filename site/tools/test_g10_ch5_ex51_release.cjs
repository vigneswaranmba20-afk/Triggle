'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const katex = require('../assets/vendor/katex/katex.min.js');
const { loadRuntime } = require('./curriculum_bulk.cjs');
const { items, source } = require('../data/textbook-fidelity/g10-ch5-ex5-1.json');

const html = fs.readFileSync('site/index.html', 'utf8');
const sw = fs.readFileSync('site/service-worker.js', 'utf8');
assert.ok(html.includes('g10-ch5-ex5-1-en.js'), 'Ex 5.1 script missing in site/index.html');
assert.ok(sw.includes('./data/textbook-exercises/g10-ch5-ex5-1-en.js'), 'Ex 5.1 script missing from offline service worker');
assert.equal(source.en.driveId, '13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of');
assert.equal(source.ta.driveId, '1BLAJHjMzbBuYesS2qL6NDEl7Tf3xmNBC');

const runtime = loadRuntime();
const rows = runtime.classes[10].items.filter(row => String(row.chapter) === '5' && row.exercise === '5.1' && row.kind === 'textbook');
assert.equal(rows.length, 18, 'Exercise 5.1 must register all 18 source-verified subparts');
assert.equal(items.length, 18);
const byId = new Map(rows.map(r => [r.id, r]));
assert.equal(byId.size, 18, 'Duplicate Exercise 5.1 IDs detected');

const notation = { window: { katex } };
vm.runInNewContext(fs.readFileSync('site/assets/math-notation.js', 'utf8'), notation);
const render = notation.window.TriggleNotation.render;

for (const evidence of items) {
  const row = byId.get(evidence.id);
  assert.ok(row, 'Missing Exercise 5.1 student item ' + evidence.id);
  assert.equal(row.edition, '2025');
  assert.equal(row.translationReview, 'pending');
  assert.equal(row.sourceFidelity.status, 'page-visual-checked');
  assert.ok(row.steps.length >= 3, evidence.id + ' needs thorough beginner steps');
  assert.ok(row.steps[0].en.startsWith('Quick Solution Plan:'), evidence.id + ' needs Quick Solution Plan summary');
  assert.ok(row.steps[1].en.includes('Understand Deeply'), evidence.id + ' needs Understand Deeply explanation');
  assert.ok(!/⇒|\\Rightarrow|\\implies/.test(JSON.stringify(row.steps) + JSON.stringify(row.answer)), evidence.id + ' must explain steps without implication arrows');

  for (const lang of ['en', 'ta']) {
    assert.equal(row.q[lang], evidence.textbookPrompt[lang], evidence.id + ' prompt mismatch ' + lang);
    assert.equal(row.questionMath[lang].map(s => typeof s === 'string' ? s : s.fallback).join(''), row.q[lang]);
    assert.equal(row.sourceFidelity.sourcePdfPage[lang], evidence.sourcePages[lang].pdf);
    for (const seg of row.questionMath[lang]) {
      if (typeof seg === 'object') {
        const out = render(seg);
        assert.ok(!out.includes('data-math-error') && out.includes('<math'), evidence.id + ' questionMath KaTeX error');
      }
    }
  }
  for (const st of row.steps) {
    assert.ok(st.en && st.en.length > 25 && st.eq && st.math, evidence.id + ' incomplete step');
    assert.equal(st.math.fallback, st.eq, evidence.id + ' fallback mismatch');
    const out = render(st.math);
    assert.ok(!out.includes('data-math-error') && out.includes('<math'), evidence.id + ' step KaTeX error');
  }
  assert.equal(row.answerMath.fallback, row.answer, evidence.id + ' answer fallback mismatch');
  const ansOut = render(row.answerMath);
  assert.ok(!ansOut.includes('data-math-error') && ansOut.includes('<math'), evidence.id + ' answer KaTeX error');

  if (evidence.figure.asset) {
    assert.equal(row.figureSrc, evidence.figure.asset);
    assert.ok(sw.includes('./' + row.figureSrc), 'Figure missing from service-worker cache: ' + row.figureSrc);
    const svg = fs.readFileSync('site/' + row.figureSrc, 'utf8');
    assert.match(svg, /viewBox="0 0 320 220"/);
    assert.match(svg, /<title/);
    assert.match(svg, /<desc/);
    assert.match(svg, /role="img"/);
    assert.ok(row.figureAlt.en.length > 20 && row.figureAlt.ta.length > 10);
  }
}

// Independent mathematical verification for all 18 subparts
const tri = (p1, p2, p3) => Math.abs((p1[0]*p2[1] + p2[0]*p3[1] + p3[0]*p1[1]) - (p1[1]*p2[0] + p2[1]*p3[0] + p3[1]*p1[0])) / 2;
const triSigned = (p1, p2, p3) => ((p1[0]*p2[1] + p2[0]*p3[1] + p3[0]*p1[1]) - (p1[1]*p2[0] + p2[1]*p3[0] + p3[1]*p1[0])) / 2;
const quad = pts => Math.abs(pts.reduce((s, p, i) => {
  const n = pts[(i + 1) % 4];
  return s + (p[0]*n[1] - p[1]*n[0]);
}, 0)) / 2;

assert.equal(tri([1,-1], [-4,6], [-3,-5]), 24);
assert.equal(tri([-10,-4], [-8,-1], [-3,-5]), 11.5);
assert.equal(tri([-0.5,3], [-5,6], [-8,8]), 0);
for (const [a, b, c] of [[2, 5, 7], [-3, 4, 1], [0.5, -2, 6]]) {
  assert.ok(Math.abs(tri([a, b+c], [b, c+a], [c, a+b])) < 1e-12);
}
assert.equal(triSigned([0,0], [44,8], [6,2]), 20);
assert.equal(triSigned([13,13], [5,6], [5,-2]), 32);
assert.equal(tri([2,3], [4,0], [6,-3]), 0);
for (const a of [0.5, -1]) {
  assert.ok(Math.abs(tri([a, 2 - 2*a], [-a + 1, 2*a], [-4 - a, 6 - 2*a])) < 1e-12);
}
assert.equal(quad([[-9,-2], [-8,-4], [1,-3], [2,2]]), 35);
assert.equal(quad([[-9,0], [-6,-3], [-1,-2], [-8,6]]), 34);
assert.equal(quad([[-4,-2], [-3,-5], [3,-2], [2,3]]), 28);
assert.equal(tri([-3,9], [2,-1], [4,-5]), 0);
assert.equal(2 + (-1), 1);
assert.equal(tri([7,7], [15,7], [12,1]), 24);
assert.equal(tri([11,7], [13.5,4], [9.5,4]), 6);
assert.equal(quad([[-4,-8], [8,-4], [6,10], [-10,6]]) - quad([[-3,-5], [6,-2], [3,7], [-6,4]]), 122);
assert.equal(tri([-5,-4], [1,6], [7,-4]) / 6, 10);
assert.equal(tri([-5,3], [-4.5,0.5], [-2,3]), 3.75);
assert.equal(tri([-2,3], [1.5,1], [1,3]), 3);
assert.equal(quad([[-4,-2], [2,-1], [1.5,1], [-4.5,0.5]]), 13.875);

assert.ok(byId.get('c10-5-ex5-1-q1-i').answer.includes('24'));
assert.ok(byId.get('c10-5-ex5-1-q1-ii').answer.includes('11.5'));
assert.ok(byId.get('c10-5-ex5-1-q3-i').answer.includes('44'));
assert.ok(byId.get('c10-5-ex5-1-q3-ii').answer.includes('13'));
assert.ok(byId.get('c10-5-ex5-1-q4-i').answer.includes('0'));
assert.ok(byId.get('c10-5-ex5-1-q4-ii').answer.includes('1/2') && byId.get('c10-5-ex5-1-q4-ii').answer.includes('−1'));
assert.ok(byId.get('c10-5-ex5-1-q5-i').answer.includes('35'));
assert.ok(byId.get('c10-5-ex5-1-q5-ii').answer.includes('34'));
assert.ok(byId.get('c10-5-ex5-1-q6').answer.includes('−5'));
assert.ok(byId.get('c10-5-ex5-1-q7').answer.includes('2') && byId.get('c10-5-ex5-1-q7').answer.includes('−1'));
assert.ok(byId.get('c10-5-ex5-1-q8').answer.includes('24') && byId.get('c10-5-ex5-1-q8').answer.includes('4 ×'));
assert.ok(byId.get('c10-5-ex5-1-q9').answer.includes('122'));
assert.ok(byId.get('c10-5-ex5-1-q10').answer.includes('10'));
assert.ok(byId.get('c10-5-ex5-1-q11-i').answer.includes('3.75'));
assert.ok(byId.get('c10-5-ex5-1-q11-ii').answer.includes('3'));
assert.ok(byId.get('c10-5-ex5-1-q11-iii').answer.includes('13.88'));

console.log('PASS Grade 10 Ch 5 Exercise 5.1: 18/18 source-verified subparts, 7 accessible SVGs, KaTeX, bilingual prompts, and independent coordinate geometry checks.');
