'use strict';
// Independent Math, Source & Bilingual QA for Grade 10 Mensuration Ex 7.2 & Ex 7.3.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const katex = require('../assets/vendor/katex/katex.min.js');

const root = path.resolve(__dirname, '../..');
const read = (rel) => fs.readFileSync(path.join(root, rel), 'utf8');

// 1. Load HTML, Service Worker, and runtime scripts in a sandboxed VM context.
const html = read('site/index.html');
const sw = read('site/service-worker.js');

const vmFiles = [
  'site/data/class-10.js',
  'site/data/curriculum.js',
  'site/data/textbook-exercises/g10-ch7-ex7-1-q1-q5-en.js',
  'site/data/textbook-exercises/g10-ch7-ex7-1-q6-q10-en.js',
  'site/data/textbook-exercises/g10-ch7-ex7-2.js',
  'site/data/textbook-exercises/g10-ch7-ex7-3.js',
  'site/data/problem-difficulty.js',
];

const sandbox = { window: {}, console };
vm.createContext(sandbox);
for (const rel of vmFiles) {
  vm.runInContext(read(rel), sandbox, { filename: rel, timeout: 15000 });
}

const grade10 = sandbox.window.TRIGGLE_CLASSES[10];
assert.ok(grade10 && Array.isArray(grade10.items), 'TRIGGLE_CLASSES[10].items must exist');
const ch7 = sandbox.window.TRIGGLE_CURRICULUM.grades
  .find((g) => g.grade === 10)
  .chapters.find((c) => c.number === 7);
assert.ok(ch7 && Array.isArray(ch7.textbookQuestionIds), 'Chapter 7 textbookQuestionIds must exist');
const difficulty = sandbox.window.TriggleDifficulty;
assert.ok(difficulty && difficulty.entries, 'TriggleDifficulty.entries must exist');

// 2. Assert all 19 IDs exist once in TRIGGLE_CLASSES[10].items, chapter.textbookQuestionIds, and difficulty.entries.
const ex72Ids = Array.from({ length: 10 }, (_, i) => `c10-7-ex7-2-q${i + 1}`);
const ex73Ids = [
  ...Array.from({ length: 6 }, (_, i) => `c10-7-ex7-3-q${i + 1}`),
  'c10-7-ex7-3-q7-i',
  'c10-7-ex7-3-q7-ii',
  'c10-7-ex7-3-q7-iii',
];
const all19Ids = [...ex72Ids, ...ex73Ids];
assert.equal(all19Ids.length, 19, 'Expected 19 question/subpart IDs');

const byId = new Map();
for (const id of all19Ids) {
  const matches = grade10.items.filter((item) => item.id === id);
  assert.equal(matches.length, 1, `TRIGGLE_CLASSES[10].items must contain ${id} exactly once`);
  const navMatches = ch7.textbookQuestionIds.filter((qId) => qId === id);
  assert.equal(navMatches.length, 1, `chapter.textbookQuestionIds must contain ${id} exactly once`);
  const diffEntry = difficulty.entries[id];
  assert.ok(diffEntry, `TriggleDifficulty.entries must contain ${id}`);
  assert.equal(diffEntry.grade, 10, `Difficulty grade must be 10 for ${id}`);
  assert.ok(['easy', 'medium', 'difficult'].includes(diffEntry.level), `Valid difficulty level for ${id}`);
  byId.set(id, matches[0]);
}

// 3. Cross-check against source inventories and verify SVG figures.
const inv72 = JSON.parse(read('docs/trace/source-inventories/g10-ch7-ex7-2.json'));
const inv73 = JSON.parse(read('docs/trace/source-inventories/g10-ch7-ex7-3.json'));

assert.equal(inv72.questionParts, 10, 'Ex 7.2 inventory must have 10 questionParts');
assert.equal(inv73.questionParts, 9, 'Ex 7.3 inventory must have 9 questionParts');

const ex72Items = grade10.items.filter((item) => item.exercise === '7.2' && item.chapter === '7');
const ex73Items = grade10.items.filter((item) => item.exercise === '7.3' && item.chapter === '7');
assert.equal(ex72Items.length, 10, 'Ex 7.2 must have exactly 10 records');
assert.equal(ex73Items.length, 9, 'Ex 7.3 must have exactly 9 records');

for (const item of ex72Items) {
  assert.ok(!item.figureSrc, `Ex 7.2 item ${item.id} must NOT have figureSrc`);
}
for (const invQ of inv72.questions) {
  assert.equal(invQ.figuresRequired, false, `Ex 7.2 Q${invQ.question} figuresRequired must be false`);
}

const expectedFigures = new Map([
  ['c10-7-ex7-3-q4', 'assets/grade10-ch7/ex7-3-q4.svg'],
  ['c10-7-ex7-3-q6', 'assets/grade10-ch7/ex7-3-q6.svg'],
]);
for (const item of ex73Items) {
  if (expectedFigures.has(item.id)) {
    const expectedSrc = expectedFigures.get(item.id);
    assert.equal(item.figureSrc, expectedSrc, `${item.id} figureSrc mismatch`);
    const svg = read('site/' + expectedSrc);
    assert.match(svg, /<svg\b/, `${expectedSrc} must be an SVG`);
    assert.match(svg, /<title\b[^>]*>[\s\S]+?<\/title>/, `${expectedSrc} must contain non-empty <title>`);
    assert.match(svg, /<desc\b[^>]*>[\s\S]+?<\/desc>/, `${expectedSrc} must contain non-empty <desc>`);
    assert.ok(!/<script\b/i.test(svg), `${expectedSrc} must not contain <script>`);
  } else {
    assert.ok(!item.figureSrc, `Ex 7.3 item ${item.id} must NOT have figureSrc`);
  }
}

// 4. Bilingual completeness check across all 19 records.
const TAMIL_RE = /[\u0B80-\u0BFF]/;
const FORBIDDEN_TA_RE = /English explanation|Tamil review pending|English only/i;

function assertBilingualString(val, label, requireTamil, allowPureSymbolic = false) {
  assert.equal(typeof val, 'string', `${label} must be a string`);
  assert.ok(val.trim().length > 0, `${label} must be non-empty`);
  if (requireTamil) {
    if (!allowPureSymbolic || /[A-Za-z]/.test(val)) {
      assert.match(val, TAMIL_RE, `${label} must contain Tamil Unicode characters`);
    }
    assert.ok(!FORBIDDEN_TA_RE.test(val), `${label} must not contain placeholder text`);
  }
}

for (const id of all19Ids) {
  const item = byId.get(id);
  assertBilingualString(item.topic?.en, `${id}.topic.en`, false);
  assertBilingualString(item.topic?.ta, `${id}.topic.ta`, true);
  assertBilingualString(item.label?.en, `${id}.label.en`, false);
  assertBilingualString(item.label?.ta, `${id}.label.ta`, true);
  assertBilingualString(item.title?.en, `${id}.title.en`, false);
  assertBilingualString(item.title?.ta, `${id}.title.ta`, true);
  assertBilingualString(item.q?.en, `${id}.q.en`, false);
  assertBilingualString(item.q?.ta, `${id}.q.ta`, true);
  assertBilingualString(item.answer, `${id}.answer`, false);
  assertBilingualString(item.answerTa, `${id}.answerTa`, true, true);

  assert.ok(Array.isArray(item.steps) && item.steps.length >= 1, `${id} must have steps`);
  item.steps.forEach((step, idx) => {
    assertBilingualString(step.en, `${id}.steps[${idx}].en`, false);
    assertBilingualString(step.ta, `${id}.steps[${idx}].ta`, true);
    assertBilingualString(step.eq, `${id}.steps[${idx}].eq`, false);
    assert.ok(
      step.math && typeof step.math.latex === 'string' && step.math.latex.trim().length > 0,
      `${id}.steps[${idx}].math.latex must be non-empty`
    );
  });
}

// 5. Strict KaTeX check on all questionMath, steps[].math, and answerMath (en and ta).
function assertStrictKatex(latex, displayMode, contextLabel) {
  assert.equal(typeof latex, 'string', `${contextLabel} latex must be a string`);
  assert.ok(latex.trim().length > 0, `${contextLabel} latex must be non-empty`);
  const rendered = katex.renderToString(latex, {
    displayMode: Boolean(displayMode),
    strict: 'error',
    throwOnError: true,
    trust: false,
  });
  assert.ok(rendered.includes('katex'), `${contextLabel} KaTeX output invalid`);
}

for (const id of all19Ids) {
  const item = byId.get(id);

  if (item.questionMath) {
    for (const lang of ['en', 'ta']) {
      const qm = item.questionMath[lang];
      if (Array.isArray(qm)) {
        qm.forEach((seg, idx) => {
          if (seg && typeof seg === 'object' && seg.latex !== undefined) {
            assertStrictKatex(seg.latex, seg.display, `${id}.questionMath.${lang}[${idx}]`);
          }
        });
      } else if (qm && typeof qm === 'object' && qm.latex !== undefined) {
        assertStrictKatex(qm.latex, qm.display, `${id}.questionMath.${lang}`);
      }
    }
  }

  item.steps.forEach((step, idx) => {
    assertStrictKatex(step.math.latex, step.math.display, `${id}.steps[${idx}].math`);
  });

  assert.ok(item.answerMath && item.answerMath.en && item.answerMath.ta, `${id} must have answerMath.en and answerMath.ta`);
  assertStrictKatex(item.answerMath.en.latex, item.answerMath.en.display, `${id}.answerMath.en`);
  assertStrictKatex(item.answerMath.ta.latex, item.answerMath.ta.display, `${id}.answerMath.ta`);
}

// 6. Independent exact arithmetic checks for all 19 parts + negative/mutation assertions for mandatory traps.
const PI = 22 / 7;
const round2 = (x) => Math.round(x * 100) / 100;
const close = (a, b, tol = 1e-9) => Math.abs(a - b) < tol;

// --- Ex 7.2 ---
// Q1: Well depth 14, d=10 (r=5), embankment width 5 (R=10)
const q72_1_H = (PI * 5 * 5 * 14) / (PI * (10 * 10 - 5 * 5));
assert.ok(close(q72_1_H, 14 / 3));
assert.equal(round2(q72_1_H), 4.67);
assert.ok(byId.get('c10-7-ex7-2-q1').answer.includes('4.67'));

// Q2: Glass d=20 (R=10), metal r=5, h=4
const q72_2_H = (PI * 5 * 5 * 4) / (PI * 10 * 10);
assert.equal(q72_2_H, 1);
assert.ok(byId.get('c10-7-ex7-2-q2').answer.includes('1 cm'));

// Q3: Cone C=484, h=105
const q72_3_r = 484 / (2 * PI);
assert.equal(q72_3_r, 77);
const q72_3_V = (1 / 3) * PI * q72_3_r * q72_3_r * 105;
assert.equal(q72_3_V, 652190);
assert.ok(byId.get('c10-7-ex7-2-q3').answer.includes('652190'));

// Q4: Petrol cone r=10, h=15, rate=25 m³/min
const q72_4_V = (1 / 3) * PI * 10 * 10 * 15;
const q72_4_time = q72_4_V / 25;
assert.ok(close(q72_4_time, 440 / 7));
assert.equal(Math.round(q72_4_time), 63);
assert.ok(byId.get('c10-7-ex7-2-q4').answer.includes('63'));

// Q5: Right triangle 6-8-10 rotated about two legs
const q72_5_V1 = (1 / 3) * PI * 6 * 6 * 8;
const q72_5_V2 = (1 / 3) * PI * 8 * 8 * 6;
const q72_5_diff = Math.abs(q72_5_V2 - q72_5_V1);
assert.ok(close(q72_5_diff, 704 / 7));
assert.equal(round2(round2(q72_5_V2) - round2(q72_5_V1)), 100.58);
assert.ok(byId.get('c10-7-ex7-2-q5').answer.includes('100.58'));

// Q6: Volumes 3600 and 5040, same radius -> h1:h2
assert.equal(3600 / 5040, 5 / 7);
assert.ok(byId.get('c10-7-ex7-2-q6').answer.includes('5 : 7'));

// Q7: Radii ratio 4:7 -> volume ratio 64:343
assert.equal(4 ** 3, 64);
assert.equal(7 ** 3, 343);
assert.ok(byId.get('c10-7-ex7-2-q7').answer.includes('64 : 343'));

// Q8: TSA(sphere)=TSA(hemisphere) => 4πr1² = 3πr2² => r1/r2 = √3/2 => V1/V2 = 3√3 : 4
const q72_8_ratio = 2 * Math.pow(Math.sqrt(3) / 2, 3);
assert.ok(close(q72_8_ratio, (3 * Math.sqrt(3)) / 4));
const q72_8 = byId.get('c10-7-ex7-2-q8');
assert.ok(q72_8.answer.includes('3√3 : 4'), '7.2 Q8 answer must include 3√3 : 4');
assert.ok(q72_8.answerMath.en.latex.includes('3\\sqrt{3}:4'), '7.2 Q8 answerMath.en must include 3\\sqrt{3}:4');
assert.ok(q72_8.answerMath.ta.latex.includes('3\\sqrt{3}:4'), '7.2 Q8 answerMath.ta must include 3\\sqrt{3}:4');
assert.ok(!/\b33\s*:\s*4\b/.test(q72_8.answer) && !/\b33\s*:\s*4\b/.test(q72_8.answerTa), '7.2 Q8 must NOT have 33:4');
assert.ok(!/(?:^|[^√\d])3\s*:\s*4\b/.test(q72_8.answer), '7.2 Q8 must NOT have 3:4 as final answer');
// Mutation check: dropping √3 gives 3:4 or 33:4, which does not equal (3√3)/4
assert.equal(close(3 / 4, q72_8_ratio), false, 'Mutation: 3:4 must not match 3√3:4');
assert.equal(close(33 / 4, q72_8_ratio), false, 'Mutation: 33:4 must not match 3√3:4');

// Q9: Hollow spherical shell, outer 576π, inner 324π -> R=12, r=9 -> V = 4186.29
const q72_9_R = Math.sqrt(576 / 4);
const q72_9_r = Math.sqrt(324 / 4);
assert.equal(q72_9_R, 12);
assert.equal(q72_9_r, 9);
const q72_9_V = (4 / 3) * PI * (q72_9_R ** 3 - q72_9_r ** 3);
assert.equal(round2(q72_9_V), 4186.29);
const q72_9 = byId.get('c10-7-ex7-2-q9');
assert.ok(q72_9.q.en.includes('576') && q72_9.q.en.includes('324'), '7.2 Q9 must use 576 and 324');
assert.ok(q72_9.answer.includes('4186.29'), '7.2 Q9 must produce 4186.29');
// Mutation check: forgetting (4/3) or using (R-r)^3 fails
assert.equal(close((4 / 3) * PI * (12 - 9) ** 3, q72_9_V), false, 'Mutation: (R-r)^3 must fail');

// Q10: Frustum h=16, r=8, R=20, price=40/L -> cost 418.36
const q72_10_V_cm3 = (1 / 3) * PI * 16 * (20 * 20 + 20 * 8 + 8 * 8);
const q72_10_litres = Math.floor((q72_10_V_cm3 / 1000) * 1000) / 1000; // 10.459 L
assert.equal(q72_10_litres, 10.459);
assert.equal(round2(q72_10_litres * 40), 418.36);
const q72_10 = byId.get('c10-7-ex7-2-q10');
for (const num of ['16', '8', '20', '40']) {
  assert.ok(q72_10.q.en.includes(num), `7.2 Q10 must use ${num}`);
}
assert.ok(q72_10.answer.includes('418.36'), '7.2 Q10 must produce 418.36');
// Mutation check: omitting R*r term in frustum formula fails
assert.equal(close((1 / 3) * PI * 16 * (20 * 20 + 8 * 8), q72_10_V_cm3), false, 'Mutation: missing Rr must fail');

// --- Ex 7.3 ---
// Q1: Hemisphere + cylinder, d=14 (r=7), total H=13 (h=6)
const q73_1_V = PI * 7 * 7 * (6 + (2 * 7) / 3);
assert.ok(close(q73_1_V, 4928 / 3));
assert.equal(round2(q73_1_V), 1642.67);
assert.ok(byId.get('c10-7-ex7-3-q1').answer.includes('1642.67'));

// Q2: Cylinder + 2 cones, d=3 (r=1.5), total=12, each cone h=2 (cyl h=8)
const q73_2_V = PI * 1.5 * 1.5 * (8 + (2 * 2) / 3);
assert.ok(close(q73_2_V, 66));
assert.ok(byId.get('c10-7-ex7-3-q2').answer.includes('66'));

// Q3: Cylinder h=2.4, d=1.4 (r=0.7) minus cone -> 2.464 -> 2.46 and 2 cm³ note
const q73_3_V = (2 / 3) * PI * 0.7 * 0.7 * 2.4;
assert.ok(close(q73_3_V, 2.464));
const q73_3 = byId.get('c10-7-ex7-3-q3');
assert.ok(q73_3.answer.includes('2.46'), '7.3 Q3 must mention 2.46');
assert.ok(q73_3.answer.includes('2 cm'), '7.3 Q3 must mention 2 cm (nearest whole cm³ note)');
// Mutation check: taking cone volume (1/3) instead of remaining (2/3) fails
assert.equal(close((1 / 3) * PI * 0.7 * 0.7 * 2.4, q73_3_V), false, 'Mutation: 1/3 instead of 2/3 must fail');

// Q4: Cone (r=6, h=12) + hemisphere (r=6) displaced water = 288π ≈ 905.14 cm³
const q73_4_V = (1 / 3) * PI * 6 * 6 * 12 + (2 / 3) * PI * 6 ** 3;
assert.ok(close(q73_4_V, (288 * 22) / 7));
assert.equal(round2(q73_4_V), 905.14);
assert.ok(byId.get('c10-7-ex7-3-q4').answer.includes('905.14'));

// Q5: Capsule length 12 mm, diameter 3 mm (r=1.5 mm, h_cyl=9 mm) -> 1089/14 ≈ 77.7857 mm³
const q73_5_V = PI * 1.5 * 1.5 * 9 + (4 / 3) * PI * 1.5 ** 3;
assert.ok(close(q73_5_V, 1089 / 14));
const q73_5 = byId.get('c10-7-ex7-3-q5');
assert.ok(q73_5.answer.includes('77.78'));
assert.ok(q73_5.answer.includes('mm³'), '7.3 Q5 answer must use mm³');
assert.ok(q73_5.answerTa.includes('கன மி.மீ') || q73_5.answerTa.includes('மி.மீ³'), '7.3 Q5 answerTa must use கன மி.மீ / மி.மீ³');
assert.ok(q73_5.answerMath.ta.latex.includes('மி.மீ}^3'), '7.3 Q5 answerMath.ta must use மி.மீ^3');
assert.ok(!q73_5.answer.includes('cm³') && !q73_5.answerTa.includes('செ.மீ'), '7.3 Q5 must NOT use cm³');
// Mutation check: using total length 12 as cylinder height fails
assert.equal(close(PI * 1.5 * 1.5 * 12 + (4 / 3) * PI * 1.5 ** 3, q73_5_V), false, 'Mutation: using 12 mm as cylinder height must fail');

// Q6: Cube side 7 cm surmounted by hemisphere (r=3.5 cm) -> 6*49 + 38.5 = 332.5 cm²
const q73_6_SA = 6 * 7 * 7 + PI * 3.5 * 3.5;
assert.equal(q73_6_SA, 332.5);
const q73_6 = byId.get('c10-7-ex7-3-q6');
assert.ok(q73_6.q.en.includes('7'), '7.3 Q6 must use 7');
assert.ok(q73_6.answer.includes('332.5'), '7.3 Q6 must produce 332.5');
// Mutation check: forgetting to subtract base circle (adding 2πr² instead of πr²) fails
assert.equal(close(6 * 7 * 7 + 2 * PI * 3.5 * 3.5, 332.5), false, 'Mutation: unsubtracted circular base must fail');

// Q7: (i) 4πr², (ii) 4πr², (iii) 1:1
const q73_7_i = byId.get('c10-7-ex7-3-q7-i');
const q73_7_ii = byId.get('c10-7-ex7-3-q7-ii');
const q73_7_iii = byId.get('c10-7-ex7-3-q7-iii');
assert.ok(q73_7_i.label.en.includes('(i)') && q73_7_i.answer.includes('4πr²'));
assert.ok(q73_7_ii.label.en.includes('(ii)') && q73_7_ii.answer.includes('4πr²'));
assert.ok(q73_7_iii.label.en.includes('(iii)') && q73_7_iii.answer.includes('1 : 1'));

// 7. Verify site/index.html loads both scripts once and site/service-worker.js registers both JS files and both SVGs in CORE.
const scripts = [...html.matchAll(/<script\s+src=["']([^"']+)["']/g)].map((m) => m[1].split('?')[0]);
const ex72Script = './data/textbook-exercises/g10-ch7-ex7-2.js';
const ex73Script = './data/textbook-exercises/g10-ch7-ex7-3.js';
assert.equal(scripts.filter((s) => s === ex72Script).length, 1, 'site/index.html must load g10-ch7-ex7-2.js once');
assert.equal(scripts.filter((s) => s === ex73Script).length, 1, 'site/index.html must load g10-ch7-ex7-3.js once');
assert.ok(scripts.indexOf('./data/class-10.js') < scripts.indexOf(ex72Script), 'class-10.js must load before ex7-2');
assert.ok(scripts.indexOf('./data/curriculum.js') < scripts.indexOf(ex72Script), 'curriculum.js must load before ex7-2');
assert.ok(scripts.indexOf(ex73Script) < scripts.indexOf('./assets/app.js'), 'ex7-3 must load before app.js');

const swSandbox = {
  CORE: null,
  self: { addEventListener() {} },
};
vm.createContext(swSandbox);
vm.runInContext(sw + '\nthis.CORE = CORE;', swSandbox, { filename: 'site/service-worker.js' });
const coreSet = new Set(swSandbox.CORE);
for (const asset of [
  './data/textbook-exercises/g10-ch7-ex7-2.js',
  './data/textbook-exercises/g10-ch7-ex7-3.js',
  './assets/grade10-ch7/ex7-3-q4.svg',
  './assets/grade10-ch7/ex7-3-q6.svg',
]) {
  assert.ok(coreSet.has(asset), `site/service-worker.js CORE must register ${asset}`);
}

console.log(
  'PASS G10 Mensuration Ex 7.2 & Ex 7.3 QA: 19/19 IDs in runtime/curriculum/difficulty, source-inventory & SVG parity, bilingual completeness, strict KaTeX (EN/TA), exact arithmetic + negative mutations, index.html & service-worker.js CORE.'
);
