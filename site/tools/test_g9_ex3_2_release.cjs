'use strict';

const assert = require('node:assert/strict');
const crypto = require('node:crypto');
const fs = require('node:fs');
const path = require('node:path');
const {ROOT, loadRuntime, validateBatch, generateModule} = require('./curriculum_bulk.cjs');
const fidelity = require('../data/textbook-fidelity/g9-ch3-ex3-2.json');
const batch = require('../../docs/curriculum/grade-9/batches/g9-ch3-ex3-2-english.json');
const books = require('../../docs/reference-library/2025-user-textbook-manifest.json').books;
const {build, load} = require('./build_g9_math.cjs');
const katex = require('../assets/vendor/katex/katex.min.js');
const vm = require('node:vm');

const readSite = file => fs.readFileSync(path.join(ROOT, 'site', file), 'utf8');
const runtime = loadRuntime(ROOT, { omit: ['data/textbook-exercises/g9-ch3-ex3-1-ex3-2-ta.js'] });
const fullRuntime = loadRuntime();
const report = validateBatch(batch, {runtime, integrated: true});
assert.equal(report.passed, true, report.errors.join('\n'));
assert.deepEqual(report.coverage.exercises, [{exercise: '3.2', inventoryVerified: true, numberedQuestions: 6, complete: true}]);
assert.equal(report.coverage.chapterComplete, false);
assert.deepEqual(report.coverage.missing, []);
assert.equal(report.metrics.tamilSourceVerifiedRecords, 0);
assert.equal(report.metrics.solvedSubparts, 23);
assert.equal(report.metrics.mathematicallyVerifiedRecords, 20);
assert.equal(report.metrics.verifiedNumberedQuestions, 6);
assert.equal(report.metrics.labelledSubparts, 22);

const partInventory = [['i', 'ii', 'iii'], ['whole'], ['i', 'ii', 'iii', 'iv', 'v', 'vi'], ['i', 'ii', 'iii', 'iv'],
  ['i', 'ii', 'iii', 'iv'], ['i', 'ii', 'iii', 'iv', 'v']];
assert.deepEqual(batch.inventory.exercises[0].questions.map(q => q.parts), partInventory);
assert.deepEqual(fidelity.coverage.before, {numberedQuestions: 1, labeledSubparts: 4, tasks: 4, studentRecords: 1});
assert.deepEqual(fidelity.coverage.after, {numberedQuestions: 6, labeledSubparts: 22, tasks: 23, studentRecords: 20});
assert.deepEqual(fidelity.pages.en, {printed: [91, 92], pdf: [97, 98], answerAppendixPrinted: [310], answerAppendixPdf: [316]});
assert.deepEqual(fidelity.pages.ta, {printed: [99], pdf: [105]});
for (const [language, book] of Object.entries(fidelity.source)) {
  assert.equal(book.sha256, books.find(row => row.grade === 9 && row.medium === language).sha256);
  assert.ok(book.url.includes(book.driveId));
}
assert.deepEqual(Object.keys(fidelity.pageImageSha256At120Dpi).sort(), ['en-2.png', 'en-316.png', 'en-97.png', 'en-98.png', 'ta-105.png', 'ta-2.png']);
for (const hash of Object.values(fidelity.pageImageSha256At120Dpi)) assert.match(hash, /^[a-f0-9]{64}$/);
assert.equal(fidelity.tamilEditorialReview, 'pending');
assert.equal(fidelity.teacherReview, 'pending');

const grade = fullRuntime.classes[9];
const chapter = fullRuntime.curriculum.grades.find(row => row.grade === 9).chapters.find(row => row.id === 'g9-ch3');
const records = grade.items.filter(row => row.chapter === '3' && row.exercise === '3.2');
const ids = records.map(row => row.id);
const unique = new Set(ids);
assert.equal(unique.size, 20);
assert.equal(records.length, unique.size);
assert.deepEqual([...unique].sort(), fidelity.items.map(row => row.id).sort());
assert.deepEqual(chapter.textbookQuestionIds.filter(id => unique.has(id)).sort(), [...unique].sort());
assert.equal(chapter.status, 'planned');

const legacyId = fidelity.preservedRecord.id;
const replacement = runtime.classes[9].items.find(record => record.id === legacyId);
const {id, classNum, chapter: chapterNumber, exercise, topic, label, title, q, steps, answer} = replacement;
const protectedLegacy = {id, classNum, chapter: chapterNumber, exercise, topic, label, title,
  q: q.en, steps: steps.map(({en, eq}) => ({en, eq})), answer};
const digest = crypto.createHash('sha256').update(JSON.stringify(protectedLegacy)).digest('hex');
assert.equal(digest, fidelity.preservedRecord.englishLearningContentSha256);
assert.equal(replacement.sourceFidelity.enPrintedPage, 91);
assert.equal(replacement.page, 97);
assert.equal(readSite(batch.module), generateModule({...batch, records: batch.records.filter(row => row.id !== legacyId)}));

const html = readSite('index.html');
const sw = readSite('service-worker.js');
for (const asset of [batch.module, 'data/why-step-g9-ex3-2.js']) {
  assert.equal(html.split(asset).length - 1, 1);
  assert.ok(sw.includes("'./" + asset + "'"));
}
assert.match(sw, /const CACHE='[^']*-g9ex32-aud14-02-tables-20261122-q46-20261122-aud14-03-choices-20261122(?:-[^']+)?'/, 'Grade 9 Ex3.2 cache milestone survives subsequent cache revisions');
const context = vm.createContext({window: {katex}});
for (const file of ['assets/math-notation.js', 'data/problem-difficulty.js', 'data/g9-clear-math.js']) {
  vm.runInContext(readSite(file), context);
}
const {TriggleG9Math, TriggleDifficulty, TriggleNotation} = context.window;
const fallback = value => Array.isArray(value) ? value.map(fallback).join('') : typeof value === 'string' ? value : value.fallback;
const checkMath = (value, plain) => {
  assert.equal(fallback(value), plain);
  assert.doesNotMatch(TriggleNotation.render(value), /data-math-error/);
};
assert.equal(readSite('data/g9-clear-math.js'), build());
assert.equal(load().filter(record => unique.has(record.id)).length, 20);

for (const evidence of fidelity.items) {
  const record = records.find(row => row.id === evidence.id);
  assert.equal(record.q.en, evidence.exactEnglish);
  assert.equal(record.page, evidence.pdfPage);
  assert.equal(record.sourceFidelity.enPrintedPage, evidence.printedPage);
  assert.equal(record.sourceFidelity.status, 'english-source-page-visual-checked');
  assert.equal(record.sourceFidelity.teacherReview, 'pending');
  assert.equal(record.translationReview, '2025-tamil-pdf-checked-teacher-review-pending');
  assert.equal(record.releaseStatus, 'bilingual-2025-source-checked');
  assert.equal(record.kind, 'textbook');
  assert.ok(record.q.ta && record.q.ta.length > 5, 'Verified 2025 Tamil prompt ' + record.id);
  assert.ok(record.steps.every(step => typeof step.ta === 'string' && step.ta.length > 5), 'Verified Tamil steps ' + record.id);
  assert.ok(TriggleDifficulty.get(record));
  assert.equal(record.figureSrc, evidence.figureSrc);
  if (evidence.figure) {
    assert.match(record.figureAlt.en, /axis/);
    assert.ok(record.figureCaption.en.includes(evidence.figure));
    assert.ok(sw.includes("'" + record.figureSrc + "'"));
  }
  const presentation = TriggleG9Math.get(record);
  checkMath(presentation.questionMath.en, record.q.en);
  checkMath(presentation.answerMath, record.answer);
  for (const [i, step] of record.steps.entries()) {
    if (step.eq) checkMath(presentation.steps[i].math, step.eq);
  }
}
// Independent arithmetic guard: do not validate answers merely by comparing them to the source manifest.
// These expected values are computed from the displayed polynomial definitions, not from batch answers.
const q1Inputs = new Map([['i', 1], ['ii', -1], ['iii', 0]]);
for (const [part, y] of q1Inputs) {
  const actual = 6 * y - 3 * y ** 2 + 3;
  const record = records.find(row => row.id === 'g9-ch3-ex3.2-q1-' + part);
  assert.ok(record, 'missing Q1(' + part + ')');
  assert.equal(record.answer, 'f(' + (y < 0 ? '−' + Math.abs(y) : y) + ') = ' + (actual < 0 ? '−' + Math.abs(actual) : actual));
}
// p(x)=x²−2√2 x+1 at x=2√2: (2√2)²−2√2(2√2)+1=8−8+1=1.
const radicalInput = 2 * Math.sqrt(2);
const radicalResult = radicalInput ** 2 - 2 * Math.sqrt(2) * radicalInput + 1;
assert.ok(Math.abs(radicalResult - 1) < 1e-12);
assert.equal(records.find(row => row.id === 'g9-ch3-ex3.2-q2')?.answer, 'p(2√2) = 1');

assert.equal(records.filter(row => row.figureSrc).length, 5);
console.log('PASS Grade 9 Exercise 3.2: 6 numbered questions, 22 labeled subparts, 23 checked tasks, five cached graphs, and unique source-aligned records.');
