'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const katex = require('../assets/vendor/katex/katex.min.js');
const { ROOT, chapterItems, generateModule, loadRuntime, validateBatch } = require('./curriculum_bulk.cjs');
const { buildInventory } = require('./bulk/trace_g10_inventory.cjs');

const files = ['a', 'b', 'c', 'd'].map(letter => 'g10-ch3-final-' + letter);
const audit = require('../../docs/curriculum/grade-10/trace/g10-ch3-final-source-audit-20261125.json');
const runtime = loadRuntime();
const chapter = chapterItems(runtime, 10, 3);
const languageText = parts => parts.map(part => typeof part === 'string' ? part : part.fallback).join('');
const enOptions = ['A', 'B', 'C', 'D'];
const taOptions = ['அ', 'ஆ', 'இ', 'ஈ'];

function checkNotation(value, id) {
  if (!value || typeof value !== 'object') return;
  if (value.latex) {
    assert(value.fallback?.trim(), id + ' formula fallback missing');
    const html = katex.renderToString(value.latex, {strict: 'error', throwOnError: true});
    assert.match(html, /class="katex"/, id);
  } else {
    Object.values(value).forEach(child => checkNotation(child, id));
  }
}

const graphIds = new Set();
let total = 0;
for (const file of files) {
  const batch = require('../../docs/curriculum/grade-10/batches/' + file + '.json');
  const manifest = require('../data/textbook-fidelity/' + file + '.json');
  const report = validateBatch(batch, {runtime, integrated: true});
  assert(report.passed, report.errors.join('\n'));
  assert.equal(fs.readFileSync(path.join(ROOT, 'site', batch.module), 'utf8'), generateModule(batch));
  assert.equal(report.metrics.appRecords, report.metrics.mathematicallyVerifiedRecords);
  assert.equal(report.metrics.tamilSourceVerifiedRecords, report.metrics.appRecords);
  const byId = new Map(manifest.items.map(item => [item.id, item]));
  for (const record of batch.records) {
    const item = chapter.find(row => row.id === record.id);
    const source = byId.get(item.id);
    assert.equal(item.tamilWorkedSolutionReview, 'pending');
    assert(item.steps.every(step => /\p{Script=Tamil}/u.test(step.ta)));
    assert(item.steps.some(step => step.why?.en && /\p{Script=Tamil}/u.test(step.why?.ta)));
    assert.match(item.hint.ta, /\p{Script=Tamil}/u);
    assert.match(item.difficulty, /^(easy|medium|difficult)$/);
    for (const language of ['en', 'ta']) {
      assert.equal(source.visualStatus[language], 'page-checked');
      assert.deepEqual(source.sourcePages[language].pdf, item.sourceFidelity.sourcePdfPage[language]);
      assert.equal(source.textbookPrompt[language], item.q[language]);
      const options = item.choices?.map(choice => '\n' + languageText(choice[language])).join('') || '';
      assert.equal(languageText(item.questionMath[language]) + options, item.q[language], item.id + ' ' + language);
    }
    if (item.exercise === '3.20') {
      assert.equal(item.choices.length, 4);
      assert.equal(enOptions[item.correctIndex], audit.records[item.id].independentResult);
      item.choices.forEach((choice, index) => {
        assert.equal(choice.en[0], '(' + enOptions[index] + ') ');
        assert.equal(choice.ta[0], '(' + taOptions[index] + ') ');
      });
    }
    if (item.figureSrc) {
      assert.match(item.figureAlt.ta, /\p{Script=Tamil}/u);
      assert.match(item.figureCaption.ta, /\p{Script=Tamil}/u);
      assert.equal(item.dataTable.rows.length, item.dataTable.ta.rows.length);
      assert.equal(item.dataTable.headers.length, item.dataTable.ta.headers.length);
      graphIds.add(item.id);
    }
    checkNotation(item, item.id);
    total++;
  }
}
assert.equal(total, 97);
assert.equal(graphIds.size, 13);
assert(!chapter.some(item => item.id === 'c10-3-ex3-20-q11'));
const inventory = buildInventory();
const algebra = inventory.chapterSummaries.find(ch => ch.chapter === 3);
assert.equal(algebra.numberedQuestions, 140);
assert.equal(algebra.subpartTasks, 236);
assert.deepEqual(algebra.tasksByStatus, { COMPLETE: 235, PARTIAL: 0, MISSING: 0, DUPLICATE: 0, BLOCKED: 1 });
assert.deepEqual(inventory.exercises.filter(e => e.chapter === 3).slice(-6).map(e => [e.numberedQuestionCount, e.subpartTaskCount]),
  [[8, 13], [7, 12], [8, 11], [13, 19], [20, 20], [20, 23]]);
console.log('PASS Grade 10 Algebra: 97 registered and reviewed bilingual tasks, 13 graphs, 19 MCQs, one source quarantine.');
