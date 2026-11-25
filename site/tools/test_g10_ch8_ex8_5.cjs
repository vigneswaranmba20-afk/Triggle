'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const katex = require('../assets/vendor/katex/katex.min.js');
const evidence = require('../data/textbook-fidelity/g10-ch8-ex8-5.json');
const inventory = require('../../docs/trace/source-inventories/g10-ch8-ex8-5.json');
const read = file => fs.readFileSync(path.join(__dirname, '..', file), 'utf8');
const context = vm.createContext({window: {}, console});
for (const [, file] of read('index.html').matchAll(/<script src="\.\/(data\/[^?"']+)(?:\?[^"']*)?"/g)) {
  vm.runInContext(read(file), context, {filename: file});
}
const grade = context.window.TRIGGLE_CLASSES[10];
const chapter = context.window.TRIGGLE_CURRICULUM.grades.find(g => g.grade === 10).chapters.find(c => c.number === 8);
const items = grade.items.filter(row => row.chapter === '8' && row.exercise === '8.5');
const canonical = inventory.questions.map(q => 'c10-8-ex8-5-q' + q.question);
assert.equal(new Set(grade.items.map(row => row.id)).size, grade.items.length);
assert.equal(canonical.length, 15);
assert.deepEqual([...evidence.items, ...evidence.blocked].map(row => row.id).sort(), canonical.slice().sort());
assert.deepEqual(Array.from(items, row => row.id), evidence.items.map(row => row.id));
assert.ok(read('service-worker.js').includes('./data/textbook-exercises/g10-ch8-ex8-5.js'));

function checkMath(part) {
  assert.ok(part.fallback);
  assert.match(katex.renderToString(part.latex, {throwOnError: true, strict: 'error'}), /<math/);
  return part.fallback;
}
const literal = value => Array.isArray(value)
  ? Array.from(value, part => typeof part === 'string' ? part : checkMath(part)).join('') : value;
for (const [index, row] of items.entries()) {
  const source = evidence.items[index];
  assert.equal(row.kind, 'textbook');
  assert.equal(row.translationReview, 'pending');
  assert.ok(context.window.TriggleDifficulty.get(row));
  assert.equal(chapter.textbookQuestionIds.filter(id => id === row.id).length, 1);
  for (const language of ['en', 'ta']) {
    assert.equal(source.visualStatus[language], 'page-checked');
    assert.equal(row.q[language], source.textbookPrompt[language]);
    assert.equal(literal(row.questionMath[language]), source.textbookPrompt[language]);
    assert.equal(row.sourceFidelity.sourcePdfPage[language], source.sourcePages[language].pdf);
    assert.deepEqual(Array.from(row.choices, choice => literal(choice[language])), source.textbookChoices[language]);
    assert.equal(row.choices.length, 4);
    assert.ok(row.answer[language]);
  }
  assert.match(row.q.ta, /\p{Script=Tamil}/u);
  assert.ok(row.steps.length >= 2);
  row.steps.forEach(step => {
    assert.ok(step.en);
    assert.match(step.ta, /\p{Script=Tamil}/u);
    if (step.eq) assert.equal(checkMath(step.math), step.eq);
  });
  if (row.answerMath) assert.equal(checkMath(row.answerMath), row.answer.en);
}

// Independently calculate the answers and their position among the choices.
const mean = xs => xs.reduce((a, b) => a + b, 0) / xs.length;
const variance = xs => mean(xs.map(x => (x - mean(xs)) ** 2));
const naturals = Array.from({length: 20}, (_, i) => i + 1);
const constant = Array(5).fill(8);
const original = [-3, 3];
const relativeSD = 4 * 875 / 1000;
const letters = 'abcdefghijklmnopqrstuvwxyz';
const notes = [...Array(10).fill(2000), ...Array(15).fill(500), ...Array(25).fill(200)];
const selected = notes.filter(n => n === 500 || n === 200).length;
const xForJob = 3 - 2;
const expected = ['Arithmetic mean', String(Math.max(...constant) - Math.min(...constant)),
  String(naturals.reduce((sum, n) => sum + n - mean(naturals), 0)),
  String(100 * (40 ** 2 + 3 ** 2)), String(variance(naturals)), String(variance(original.map(x => 5 * x))),
  Math.sqrt(variance(original.map(x => 3 * x + 5)) / variance(original)) + 'p',
  String(relativeSD), 'P(A) > 1', 'p/(p + q + r)', String(xForJob), String(135 / 9),
  letters.indexOf('x') + '/' + letters.length, selected / 10 + '/' + notes.length / 10];
for (const [index, row] of items.entries()) {
  const answer = expected[index];
  assert.equal(evidence.items[index].textbookChoices.en[row.correctIndex].slice(4), index === 2 ? 'zero' : answer);
  assert.equal(row.answer.en, index === 0 ? '(C) Arithmetic mean' : answer);
}
const favourablePages = n => Array.from({length: n}, (_, i) => i + 1).filter(p => p % 10 < 7).length;
assert.equal(favourablePages(9), 6);
assert.equal(favourablePages(10), 7);
assert.notEqual(favourablePages(9) * 10, favourablePages(10) * 9);
assert.equal(evidence.blocked[0].id, 'c10-8-ex8-5-q11');
console.log('PASS: 14 bilingual Exercise 8.5 tasks, exact prompts and choices, independent calculations, KaTeX and Q11 source ambiguity.');
