'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const katex = require('../assets/vendor/katex/katex.min.js');
const evidence = require('../data/textbook-fidelity/g10-ch8-unit.json');
const inventory = require('../../docs/curriculum/grade-10/trace/g10-2025-complete-inventory.json');
const read = file => fs.readFileSync(path.join(__dirname, '..', file), 'utf8');
const context = vm.createContext({window: {}, console});
for (const [, file] of read('index.html').matchAll(/<script src="\.\/(data\/[^?"']+)(?:\?[^"']*)?"/g)) {
  vm.runInContext(read(file), context, {filename: file});
}
const grade = context.window.TRIGGLE_CLASSES[10];
const chapter = context.window.TRIGGLE_CURRICULUM.grades.find(g => g.grade === 10).chapters.find(c => c.number === 8);
const items = grade.items.filter(row => row.chapter === '8' && row.exercise === '8.unit');
const unit = inventory.exercises.find(ex => String(ex.chapter) === '8' && ex.exercise === '8.unit');
const canonical = unit.questions.map(q => 'c10-8-unit-q' + q.question);
assert.equal(canonical.length, 11);
assert.equal(new Set(grade.items.map(row => row.id)).size, grade.items.length);
assert.deepEqual(Array.from(items, row => row.id), canonical);
assert.deepEqual(evidence.items.map(row => row.id), canonical);
assert.ok(read('service-worker.js').includes('./data/textbook-exercises/g10-ch8-unit.js'));
const serialise = value => JSON.parse(JSON.stringify(value));
const checkMath = (part, fallback) => {
  assert.equal(part.fallback, fallback);
  assert.match(katex.renderToString(part.latex, {throwOnError: true, strict: 'error'}), /<math/);
  return part.fallback;
};
for (const [index, row] of items.entries()) {
  const source = evidence.items[index];
  assert.equal(row.kind, 'textbook');
  assert.equal(row.translationReview, 'pending');
  assert.ok(context.window.TriggleDifficulty.get(row));
  assert.equal(chapter.textbookQuestionIds.filter(id => id === row.id).length, 1);
  for (const language of ['en', 'ta']) {
    assert.equal(row.q[language], source.textbookPrompt[language]);
    assert.equal(source.visualStatus[language], 'page-checked');
    assert.equal(row.sourceFidelity.sourcePdfPage[language], source.sourcePages[language].pdf);
    if (row.dataTable) {
      const data = language === 'en' ? row.dataTable : row.dataTable.ta;
      assert.deepEqual(serialise([data.headers, ...data.rows]), source.textbookTable[language]);
    }
    const parts = row.questionMath?.[language];
    if (parts) assert.equal(parts.map(p => typeof p === 'string' ? p : checkMath(p, p.fallback)).join(''), row.q[language]);
    assert.ok(row.answer[language]);
  }
  assert.match(row.q.ta, /\p{Script=Tamil}/u);
  assert.ok(row.steps.length >= 2);
  row.steps.forEach(step => {
    assert.ok(step.en);
    assert.match(step.ta, /\p{Script=Tamil}/u);
    checkMath(step.math, step.eq);
  });
  if (row.answerMath) checkMath(row.answerMath, row.answer.en);
}

// Independent computations from the source givens and probability models.
const range = (first, last) => Array.from({length: last - first + 1}, (_, i) => i + first);
const mean = xs => xs.reduce((sum, x) => sum + x, 0) / xs.length;
const variance = xs => mean(xs.map(x => (x - mean(xs)) ** 2));
const cv = xs => 100 * Math.sqrt(variance(xs)) / mean(xs);
const fillFrequencies = range(0, 20).map(f => [f, 20 - f]).filter(([f1, f2]) =>
  5 * 10 + f1 * 30 + 10 * 50 + f2 * 70 + 7 * 90 + 8 * 110 === 3140);
assert.deepEqual(fillFrequencies, [[8, 12]]);
const diameters = [15,17,21,22,25].flatMap((n, i) => Array(n).fill(34.5 + 4 * i));
assert.equal(diameters.length, 100);
assert.equal(mean(diameters), 43.5);
assert.equal(variance(diameters), 30.84);
const validK = range(1, 20).filter(k => Math.abs(variance([1,1,2,3,4,5,6].map(v => v * k)) - 160) < 1e-9);
assert.deepEqual(validK, [7]);
assert.equal(variance([0,10].map(c => 9 * c / 5 + 32)), 81);
assert.equal((Math.sqrt((43 * 18 - 3 ** 2) / 18 ** 2)).toFixed(2), '1.54');
assert.ok(cv([20,22,19,23,16]) < cv([10,20,18,12,15]));
const extremes = range(20, 100).flatMap(hi => range(0, hi - 1).map(lo => [hi, lo])).filter(([hi, lo]) =>
  hi - lo === 20 && 5 * (hi - lo) === hi + lo);
assert.deepEqual(extremes, [[60, 40]]);
const dice = range(1, 6).flatMap(a => range(1, 6).map(b => [a, b]));
const favourable = dice.filter(([a, b]) => a * b === 6 || Math.abs(a - b) === 5);
assert.equal(favourable.length, 4);
assert.equal(['BB','BG','GB','GG'].filter(outcome => outcome.includes('G')).length, 3);
const black = range(1, 20).filter(b => b / (b + 5) === 2 * (5 / (b + 5)));
assert.deepEqual(black, [10]);
const examRegions = [50, 75 - 50, 100 - 10 - 75, 10];
assert.ok(examRegions.every(n => n >= 0));
assert.equal(examRegions.reduce((a, b) => a + b, 0), 100);
const expected = [
  'f₁ = 8 and f₂ = 12', 'Approximately ' + Math.sqrt(variance(diameters)).toFixed(2) + ' mm',
  'k = ' + validK[0], '81 (°F)²', 'Mean = 31/6, σ = √85/6 ≈ 1.54', 'Prices are more stable in city A.',
  'L = 60, S = 40', favourable.length / 4 + '/' + dice.length / 4, '3/4',
  String(black[0]), String((examRegions[0] + examRegions[2]) / 100)
];
assert.deepEqual(Array.from(items, row => row.answer.en), expected);
assert.equal(evidence.discrepancies[0].roundedStandardDeviation, '1.54');
console.log('PASS: all 11 Unit Exercise 8 tasks, source and table fidelity, bilingual working, exact arithmetic and rounding.');
