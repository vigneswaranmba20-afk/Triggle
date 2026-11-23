'use strict';
// Complete-chapter verification for Grade 9 Chapter 3 Algebra (concepts §§3.1–3.8 + Exercises 3.1–3.15 EN+TA).
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const ROOT = path.resolve(__dirname, '../..');
const readSite = p => fs.readFileSync(path.join(ROOT, 'site', p), 'utf8');
const inventory = JSON.parse(fs.readFileSync(path.join(ROOT, 'docs/curriculum/grade-9/algebra-g9-ch3-source-inventory.json'), 'utf8'));
const katex = require('../assets/vendor/katex/katex.min.js');

const ctx = {
  window: { katex, addEventListener: () => {} },
  document: {},
  console
};
vm.createContext(ctx);

const html = readSite('index.html');
const sw = readSite('service-worker.js');
for (const match of html.matchAll(/<script\b[^>]*src="\.\/([^?"']+)(?:\?[^"]*)?"/g)) {
  const rel = match[1];
  if (rel.startsWith('data/') || rel === 'assets/math-notation.js' || rel === 'assets/g9-algebra-concepts.js') {
    vm.runInContext(readSite(rel), ctx, { filename: rel, timeout: 20000 });
  }
}

const grade = ctx.window.TRIGGLE_CLASSES[9];
const chapter = ctx.window.TRIGGLE_CURRICULUM.grades.find(g => g.grade === 9).chapters.find(c => c.id === 'g9-ch3');
const pathData = ctx.window.TRIGGLE_ALGEBRA_PATH;
const { TriggleNotation, TriggleDifficulty, TriggleG9AlgebraConcepts } = ctx.window;

// 1. Concepts §§3.1–3.8
assert.equal(pathData.stages.length, 10, '10 concept stages covering §§3.1–3.8');
for (const sec of ['3.1', '3.2', '3.3', '3.4', '3.5', '3.6', '3.7', '3.8']) {
  assert.ok(pathData.stages.some(s => String(s.section).startsWith(sec)), 'Missing concept section ' + sec);
}

// 2. All 15 exercises & exact inventory counts
const ch3Items = grade.items.filter(it => String(it.chapter) === '3' && it.kind !== 'practice');
const byEx = new Map();
for (const it of ch3Items) {
  byEx.set(it.exercise, (byEx.get(it.exercise) || 0) + 1);
}

let totalExpected = 0;
for (const exInv of inventory.exercises) {
  totalExpected += exInv.totalRecords;
  assert.equal(byEx.get(exInv.exercise), exInv.totalRecords, `Exercise ${exInv.exercise} count mismatch`);
}
assert.equal(ch3Items.length, totalExpected, `Total Ch3 records must be ${totalExpected}`);
assert.equal(totalExpected, 224);

// 3. Concept <-> Exercise links
let totalLinks = 0;
for (const stage of pathData.stages) {
  assert.ok(Array.isArray(stage.relatedQuestionIds) && stage.relatedQuestionIds.length >= 2, 'Stage needs >=2 links: ' + stage.id);
  for (const qid of stage.relatedQuestionIds) {
    assert.ok(ch3Items.some(it => it.id === qid), `Broken concept->exercise link ${stage.id} -> ${qid}`);
    totalLinks++;
  }
}

// 4. Bilingual parity, KaTeX rendering, difficulty, and navigation registration
for (const item of ch3Items) {
  assert.ok(chapter.textbookQuestionIds.includes(item.id), 'Missing from textbookQuestionIds: ' + item.id);
  assert.ok(item.q?.en && item.q.en.trim().length > 0, 'Missing q.en: ' + item.id);
  assert.ok(item.q?.ta && item.q.ta.trim().length > 0, 'Missing q.ta: ' + item.id);
  assert.ok(Array.isArray(item.steps) && item.steps.length >= 1, 'Missing steps: ' + item.id);
  for (const [si, st] of item.steps.entries()) {
    assert.ok(st.en && st.en.trim().length > 0, `Missing step.en ${item.id}#${si}`);
    assert.ok(st.ta && st.ta.trim().length > 0, `Missing step.ta ${item.id}#${si}`);
    if (st.math?.latex) {
      assert.doesNotMatch(TriggleNotation.render(st.math), /data-math-error/, `KaTeX error in step ${item.id}#${si}`);
    }
  }
  assert.ok(item.answer && item.answer.trim().length > 0, 'Missing answer: ' + item.id);
  if (item.answerMath?.latex) {
    assert.doesNotMatch(TriggleNotation.render(item.answerMath), /data-math-error/, `KaTeX error in answer ${item.id}`);
  }
  assert.ok(TriggleDifficulty.get(item)?.grade === 9, 'Missing difficulty: ' + item.id);
  const cIdx = TriggleG9AlgebraConcepts.conceptIndexForItem(item);
  assert.ok(Number.isInteger(cIdx) && cIdx >= 0 && cIdx < pathData.stages.length, 'Invalid conceptIndexForItem: ' + item.id);
}

// 5. Offline SW registration for all new modules
for (const mod of [
  'data/textbook-exercises/g9-ch3-ex3-1-ex3-2-ta.js',
  'data/textbook-exercises/g9-ch3-ex3-3-to-3-6.js',
  'data/textbook-exercises/g9-ch3-ex3-7-to-3-9.js',
  'data/textbook-exercises/g9-ch3-ex3-10-to-3-14.js',
  'data/textbook-exercises/g9-ch3-ex3-15.js'
]) {
  assert.ok(html.includes(mod), 'Missing in index.html: ' + mod);
  assert.ok(sw.includes('./' + mod), 'Missing in service-worker.js: ' + mod);
}

console.log(`PASS G9 Ch3 complete: 10/10 concepts (§§3.1–3.8), 15/15 exercises, ${ch3Items.length}/${totalExpected} bilingual EN+TA items, ${totalLinks} concept<->exercise links verified.`);
