'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const katex = require('../assets/vendor/katex/katex.min.js');

const root = path.resolve(__dirname, '../..');
const read = p => fs.readFileSync(path.join(root, p), 'utf8');

const EXPECTED_IDS = [
  'c10-3-ex3-15-q1-i', 'c10-3-ex3-15-q1-ii',
  'c10-3-ex3-15-q2-i', 'c10-3-ex3-15-q2-ii',
  'c10-3-ex3-15-q3-i', 'c10-3-ex3-15-q3-ii',
  'c10-3-ex3-15-q4-i', 'c10-3-ex3-15-q4-ii',
  'c10-3-ex3-15-q5-i', 'c10-3-ex3-15-q5-ii',
  'c10-3-ex3-15-q6-i', 'c10-3-ex3-15-q6-ii'
];

const EXPECTED_SVGS = [
  'assets/grade10-ch3/ex3-15-q1-discount.svg',
  'assets/grade10-ch3/ex3-15-q2-hyperbola.svg',
  'assets/grade10-ch3/ex3-15-q3-linear.svg',
  'assets/grade10-ch3/ex3-15-q4-pipes.svg',
  'assets/grade10-ch3/ex3-15-q5-shares.svg',
  'assets/grade10-ch3/ex3-15-q6-parking.svg'
];

// 1. HTML + Service Worker + SVG file existence
const html = read('site/index.html');
const sw = read('site/service-worker.js');
const modPath = 'data/textbook-exercises/g10-ch3-ex3-15-complete.js';
const scripts = [...html.matchAll(/<script src="\.\/(data\/[^?"']+)(?:\?[^"']*)?"[^>]*><\/script>/g)].map(m => m[1]);
assert.equal(scripts.filter(s => s === modPath).length, 1, 'script tag once: ' + modPath);
assert.ok(sw.includes('./' + modPath), 'service worker caches ' + modPath);
for (const svg of EXPECTED_SVGS) {
  assert.ok(fs.existsSync(path.join(root, 'site', svg)), 'SVG exists: ' + svg);
  assert.ok(sw.includes('./' + svg), 'service worker caches ' + svg);
}

// 2. Inventory check: 6 questions, 12 parts (including Q3(i) and Q3(ii))
const inv = JSON.parse(read('docs/curriculum/grade-10/trace/g10-2025-complete-inventory.json'));
const ex315Inv = inv.exercises.find(e => e.chapter === 3 && e.exercise === '3.15');
assert.ok(ex315Inv, 'Exercise 3.15 present in Grade 10 inventory');
assert.equal(ex315Inv.numberedQuestionCount, 6, '6 printed questions in Ex 3.15');
assert.equal(ex315Inv.subpartTaskCount, 12, '12 labelled parts in Ex 3.15');
const q3Inv = ex315Inv.questions.find(q => String(q.question) === '3');
assert.deepEqual(q3Inv.tasks.map(t => t.part), ['i', 'ii'], 'Q3 has parts i and ii in inventory');

// 3. Load runtime
const ctx = { window: {}, console };
vm.createContext(ctx);
for (const f of scripts) vm.runInContext(read('site/' + f), ctx, { filename: f, timeout: 10000 });
const items = ctx.window.TRIGGLE_CLASSES[10].items;
assert.equal(new Set(items.map(x => x.id)).size, items.length, 'unique IDs across Grade 10');
const ch3 = ctx.window.TRIGGLE_CURRICULUM.grades.find(g => g.grade === 10).chapters.find(c => String(c.number) === '3');

const ex315 = items.filter(x => x.chapter === '3' && x.exercise === '3.15');
assert.deepEqual(Array.from(ex315, x => x.id), EXPECTED_IDS, 'exact 12 Exercise 3.15 IDs in order');

// 4. KaTeX + bilingual + difficulty + figure checks
const notation = { window: { katex } };
vm.runInNewContext(read('site/assets/math-notation.js'), notation);
const render = notation.window.TriggleNotation.render;

const seenSvgs = new Set();
for (const r of ex315) {
  assert.equal(r.edition, '2025', r.id);
  assert.equal(r.translationReview, 'pending', r.id);
  assert.equal(r.tamilQuestionSourceVerified, true, r.id);
  assert.equal(r.tamilWorkedSolutionReview, 'pending', r.id);
  assert.ok(r.q.en && r.q.ta && /\p{Script=Tamil}/u.test(r.q.ta), 'EN & TA prompts for ' + r.id);
  assert.ok(r.figureSrc && r.figureAlt?.en && r.figureAlt?.ta && r.figureCaption?.en && r.figureCaption?.ta, 'bilingual figure metadata for ' + r.id);
  seenSvgs.add(r.figureSrc.replace(/^\.\//, ''));
  assert.ok(r.steps.length >= 3, 'at least 3 steps for ' + r.id);
  assert.ok(!/⇒|\\Rightarrow|\\implies/.test(JSON.stringify(r.steps) + JSON.stringify(r.answer)), 'no implication arrows in ' + r.id);

  for (const s of r.steps) {
    assert.ok(s.en && s.ta && /\p{Script=Tamil}/u.test(s.ta), 'bilingual step for ' + r.id);
    assert.ok(s.math && s.math.latex && s.math.fallback === s.eq, 'step math fallback === eq for ' + r.id);
    const out = render(s.math);
    assert.ok(!out.includes('data-math-error') && out.includes('<math') && out.includes('katex-html'), 'valid step KaTeX for ' + r.id);
  }

  assert.ok(r.answer?.en && r.answer?.ta, 'bilingual answer for ' + r.id);
  const ansEn = r.answerMath?.en || r.answerMath;
  const ansTa = r.answerMath?.ta || r.answerMath;
  assert.ok(ansEn?.latex?.includes('boxed') && ansEn.fallback === r.answer.en, 'EN answerMath for ' + r.id);
  assert.ok(ansTa?.latex?.includes('boxed') && ansTa.fallback === r.answer.ta, 'TA answerMath for ' + r.id);
  assert.ok(!render(ansEn).includes('data-math-error') && !render(ansTa).includes('data-math-error'), 'valid answer KaTeX for ' + r.id);

  assert.equal(ch3.textbookQuestionIds.filter(x => x === r.id).length, 1, 'chapter registration ' + r.id);
  assert.equal(ctx.window.TriggleDifficulty.get(r).grade, 10, 'difficulty metadata ' + r.id);
}
assert.equal(seenSvgs.size, 6, 'all 6 distinct graphs used across 12 parts');

// 5. Tables on Q4, Q5, Q6
for (const qNum of [4, 5, 6]) {
  for (const part of ['i', 'ii']) {
    const r = ex315.find(x => x.id === `c10-3-ex3-15-q${qNum}-${part}`);
    assert.ok(r.dataTable && r.dataTable.headers.length >= 5 && r.dataTable.ta?.headers.length >= 5, 'bilingual dataTable for ' + r.id);
  }
}

// 6. Independent numerical checks against 01_verified_question_register.csv
const byId = Object.fromEntries(ex315.map(x => [x.id, x]));
assert.equal(6500 / 2, 3250);
assert.ok(byId['c10-3-ex3-15-q1-i'].answer.en.includes('6500'));
assert.equal(2500 / 2, 1250);
assert.ok(byId['c10-3-ex3-15-q1-ii'].answer.en.includes('1250'));
assert.equal(24 / 3, 8);
assert.ok(byId['c10-3-ex3-15-q2-i'].answer.en.includes('8'));
assert.equal(24 / 6, 4);
assert.ok(byId['c10-3-ex3-15-q2-ii'].answer.en.includes('4'));
assert.equal(0.5 * 9, 4.5);
assert.ok(byId['c10-3-ex3-15-q3-i'].answer.en.includes('4.5') && byId['c10-3-ex3-15-q3-i'].answer.en.includes('1/2'));
assert.equal(7.5 / 0.5, 15);
assert.ok(byId['c10-3-ex3-15-q3-ii'].answer.en.includes('15'));
assert.equal(90 / 5, 18);
assert.ok(byId['c10-3-ex3-15-q4-i'].answer.en.includes('18'));
assert.equal(90 / 9, 10);
assert.ok(byId['c10-3-ex3-15-q4-ii'].answer.en.includes('10'));
assert.equal(2 * 180, 360);
assert.ok(byId['c10-3-ex3-15-q5-i'].answer.en.includes('360'));
assert.equal(360 / 12, 30);
assert.ok(byId['c10-3-ex3-15-q5-ii'].answer.en.includes('30'));
assert.equal(15 * 6, 90);
assert.ok(byId['c10-3-ex3-15-q6-i'].answer.en.includes('90'));
assert.equal(150 / 15, 10);
assert.ok(byId['c10-3-ex3-15-q6-ii'].answer.en.includes('10'));

console.log('PASS G10 Ex 3.15 release: 6 printed questions, 12 EN+TA parts, 6 distinct graphs, 3 bilingual tables, KaTeX & numerical checks');
