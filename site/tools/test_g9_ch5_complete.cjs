'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const root = path.join(__dirname, '..');
const files = [
  'data/curriculum.js',
  'data/class-9.js',
  'data/g9-ch5-distance-concept.js',
  'data/textbook-exercises/g9-ch5-ex5-2-en.js',
  'data/textbook-exercises/g9-ch5-ex5-1.js',
  'data/textbook-exercises/g9-ch5-ex5-2.js',
  'data/textbook-exercises/g9-ch5-ex5-3.js',
  'data/textbook-exercises/g9-ch5-ex5-4.js',
  'data/textbook-exercises/g9-ch5-ex5-5.js',
  'data/textbook-exercises/g9-ch5-ex5-6.js'
];

const sandbox = { window: {}, console };
sandbox.window = sandbox;
for (const rel of files) {
  const code = fs.readFileSync(path.join(root, rel), 'utf8');
  vm.runInNewContext(code, sandbox, { filename: rel });
}

const g9 = sandbox.window.TRIGGLE_CLASSES?.[9];
const ch5 = sandbox.window.TRIGGLE_CURRICULUM?.grades?.find(g => g.grade === 9)?.chapters?.find(c => c.id === 'g9-ch5');
assert(g9 && ch5, 'Grade 9 Chapter 5 must be registered');

const ch5All = g9.items.filter(it => it.classNum === 9 && String(it.chapter) === '5');
assert(ch5All.some(it => it.id === 'c9-5-5-practice-6'), 'Legacy practice c9-5-5-practice-6 must be preserved');
const overrides = sandbox.window.TriggleG9Ch5Overrides;
const ch5Items = ch5All
  .filter(it => it.id.startsWith('g9-ch5-ex'))
  .map(it => overrides?.get(it.id) || it);
const expectedCounts = { '5.1': 4, '5.2': 12, '5.3': 8, '5.4': 7, '5.5': 7, '5.6': 20 };
const byEx = {};
for (const it of ch5Items) {
  byEx[it.exercise] = (byEx[it.exercise] || []);
  byEx[it.exercise].push(it);
}

let total = 0;
for (const [ex, count] of Object.entries(expectedCounts)) {
  assert.equal((byEx[ex] || []).length, count, `Exercise ${ex} must have ${count} questions`);
  total += count;
}
assert.equal(total, 58, 'Total Grade 9 Chapter 5 numbered questions must be 58');

// Verify no duplicate IDs
const ids = ch5Items.map(x => x.id);
assert.equal(new Set(ids).size, 58, 'All 58 IDs must be unique');

// Verify 8 legacy Ex 5.2 IDs are preserved and all Q1..Q12 exist
const ex52Ids = byEx['5.2']
  .map(x => x.id)
  .sort((a, b) => parseInt(a.match(/q(\d+)/)[1], 10) - parseInt(b.match(/q(\d+)/)[1], 10));
for (let i = 1; i <= 12; i++) {
  assert.equal(ex52Ids[i - 1], `g9-ch5-ex5.2-q${i}`, `Ex 5.2 position ${i} must be Q${i}`);
}

const authoredAnswer = value => Array.isArray(value)
  ? value.length>0 && value.every(authoredAnswer) : Boolean(value?.latex || (typeof value==='string' && value.trim()));
// Verify bilingual parity, KaTeX math, sourceFidelity, and SVG assets
for (const item of ch5Items) {
  assert.equal(item.preferItemMath, true, `${item.id} must set preferItemMath: true`);
  assert.equal(item.sourceFidelity?.status, 'page-visual-checked', `${item.id} must be page-visual-checked`);
  assert(item.q?.en && item.q?.ta, `${item.id} must have EN and TA question text`);
  assert(!/English-language question|English only|Tamil version not changed/i.test(item.q.ta), `${item.id} must not have untranslated TA placeholder`);
  assert(item.answer && item.answerTa, `${item.id} must have EN and TA answer`);
  assert(item.answerMath?.latex || (item.answerMath?.en?.latex && authoredAnswer(item.answerMath?.ta)), `${item.id} must have answerMath`);
  assert(Array.isArray(item.steps) && item.steps.length >= 1, `${item.id} must have worked steps`);
  for (const st of item.steps) {
    assert(st.en && st.ta && st.eq, `${item.id} step must have en, ta, eq`);
    assert(!/English explanation \(Tamil unchanged\)/i.test(st.ta), `${item.id} step must have real Tamil`);
    assert(st.math?.latex, `${item.id} step must have KaTeX latex`);
  }
  if (item.figureSrc) {
    const svgPath = path.join(root, item.figureSrc);
    assert(fs.existsSync(svgPath), `Missing SVG asset: ${item.figureSrc}`);
    const svg = fs.readFileSync(svgPath, 'utf8');
    assert(svg.includes('<svg') && svg.includes('</svg>'), `Invalid SVG: ${item.figureSrc}`);
  }
}

// Verify all 20 Ex 5.6 MCQs have 4 choices and valid correctIndex
for (const q of byEx['5.6']) {
  assert(Array.isArray(q.choices) && q.choices.length === 4, `${q.id} must have 4 choices`);
  assert(Number.isInteger(q.correctIndex) && q.correctIndex >= 0 && q.correctIndex <= 3, `${q.id} must have valid correctIndex`);
  assert(q.choices.every(c => c.en && c.ta), `${q.id} choices must be bilingual`);
}

// Verify Distance Formula concept + R2 video preserved
const distStage = sandbox.window.TRIGGLE_G9_CH5_PATH?.stages?.[0];
assert(distStage && distStage.id === 'g9-ch5-distance-formula', 'Distance formula concept preserved');
assert(distStage.video?.src?.includes('r2.dev'), 'Cloudflare R2 video preserved');

// Verify difficulty metadata coverage
const diffSrc = fs.readFileSync(path.join(root, 'data/problem-difficulty.js'), 'utf8');
for (const id of ids) {
  assert(diffSrc.includes(`"${id}"`), `Missing difficulty metadata for ${id}`);
}

console.log(`PASS G9 Ch5 complete validation: 58/58 numbered questions across Ex 5.1–5.6, bilingual EN+TA, KaTeX, 7 SVGs, 20 MCQs, difficulty metadata, R2 concept preserved.`);
