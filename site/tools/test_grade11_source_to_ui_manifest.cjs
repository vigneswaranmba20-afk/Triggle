'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '../..');
const ledger = JSON.parse(fs.readFileSync(path.join(root, 'docs/coverage/grade-11-2025.json'), 'utf8'));
const manifest = JSON.parse(fs.readFileSync(path.join(root, 'docs/reference-library/2025-user-textbook-manifest.json'), 'utf8'));
const books = manifest.books.filter(b => b.grade === 11 && b.volume === 1);
assert.equal(books.length, 2, 'both 2025 Grade 11 Volume I source books required');
let checked = 0;
for (const item of ledger.items.filter(i => i.sourceExact === true)) {
  assert.ok(item.sourceCheckpoint && item.lessonPath, item.id + ': missing paths');
  const cp = JSON.parse(fs.readFileSync(path.join(root, item.sourceCheckpoint), 'utf8'));
  const lesson = JSON.parse(fs.readFileSync(path.join(root, item.lessonPath), 'utf8'));
  const q = lesson.questions.find(q => q.id === item.id);
  assert.ok(q, item.id + ': student-facing question missing');
  assert.equal(cp.grade, 11);
  assert.equal(cp.chapter, 1);
  assert.equal(cp.exercise, '1.1');
  assert.equal(cp.source.en.printedPage, item.englishPrintedPage);
  assert.equal(cp.source.ta.printedPage, item.tamilPrintedPage);
  for (const lang of ['en', 'ta']) {
    const source = cp.source[lang];
    const book = books.find(b => b.medium === lang);
    assert.ok(book, lang + ': textbook manifest missing');
    assert.equal(source.edition, '2025 revised');
    assert.equal(source.volume, 1);
    assert.ok(source.driveFileId, lang + ': Google Drive source ID missing');
    assert.equal(source.pageImageChecked, true, item.id + ': page not visually checked ' + lang);
    assert.equal(q.prompt[lang], source.stemExact + '\n' + source.subpartExact,
      item.id + ': textbook-exact UI mismatch ' + lang);
    assert.equal(q.source.page[lang], source.printedPage);
    assert.equal(q.source.pdfPage[lang], source.pdfPage);
    assert.ok(q.steps[lang].length >= 3, item.id + ': incomplete derivation ' + lang);
  }
  assert.equal(q.review.tamilEditorial, item.tamilEditorial);
  checked++;
}
assert.ok(checked >= 2, 'expected previously image-verified Grade 11 Q4(iii,iv) lessons');
console.log('PASS Grade 11 source checkpoint -> student UI exact-match for ' + checked + ' verified items');
