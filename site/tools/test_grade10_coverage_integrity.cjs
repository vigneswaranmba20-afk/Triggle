'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '../data/textbook-exercises');
const ledger = JSON.parse(fs.readFileSync(path.join(root, 'grade-10-coverage-2025.json'), 'utf8'));
assert.equal(ledger.grade, 10);
assert.equal(ledger.edition, '2025 revised');
assert.equal(ledger.chapters.length, 8);
assert.deepEqual(ledger.chapters.map(c => c.chapter), [1,2,3,4,5,6,7,8]);
const seen = new Set();
let checked = 0;
for (const chapter of ledger.chapters) {
  assert.equal(chapter.fullChapterExerciseInventoryComplete, false, 'Do not mark uninventoried chapter complete');
  for (const key of ['verifiedQuestionSubparts','mergedQuestionSubparts','liveVerifiedQuestionSubparts']) assert.ok(Array.isArray(chapter[key]));
  for (const id of chapter.verifiedQuestionSubparts) {
    assert.ok(!seen.has(chapter.chapter + ':' + id), 'Duplicate verified item');
    seen.add(chapter.chapter + ':' + id);
    const m = /^(\\d+)\\(([ivx]+)\\)$/.exec(id);
    assert.ok(m, 'Unsupported item ID: ' + id);
    const file = path.join(root, 'g10-ch'+chapter.chapter+'-ex1-1-q'+m[1]+m[2]+'.json');
    const q = JSON.parse(fs.readFileSync(file, 'utf8'));
    assert.equal(q.grade, 10); assert.equal(q.chapter, chapter.chapter);
    assert.equal(q.exercise, '1.1'); assert.equal(q.question, m[1]); assert.equal(q.subpart, m[2]);
    assert.equal(q.source.edition, '2025 revised');
    assert.equal(q.review.sourceVerified, true); assert.equal(q.review.mathVerified, true);
    for (const language of ['en','ta']) {
      assert.ok(q.questionParaphrase[language].trim());
      assert.ok(q.steps.length >= 3);
      for (const step of q.steps) assert.ok(step[language].trim() && step.equation.trim());
    }
    for (const language of ['english','tamil']) {
      assert.ok(Number.isInteger(q.source[language].printedPage) && q.source[language].printedPage > 0);
      assert.ok(Number.isInteger(q.source[language].pdfPage) && q.source[language].pdfPage > 0);
    }
    if (chapter.liveVerifiedQuestionSubparts.includes(id)) {
      assert.ok(chapter.mergedQuestionSubparts.includes(id));
      assert.equal(q.review.merged, true);
      assert.equal(q.review.deployed, true);
      assert.equal(q.review.liveVerified, true);
    }
    checked++;
  }
  assert.ok(chapter.liveVerifiedQuestionSubparts.every(id => chapter.verifiedQuestionSubparts.includes(id)));
  assert.ok(chapter.mergedQuestionSubparts.every(id => chapter.verifiedQuestionSubparts.includes(id)));
}
assert.equal(checked, 3, 'Update verified-count contract when a new sourced lesson is added');
console.log('PASS: Grade 10 eight-chapter ledger and '+checked+' bilingual source/math lesson contracts');
