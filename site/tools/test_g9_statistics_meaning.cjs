'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const { load } = require('./build_g9_math.cjs');

const read = name => fs.readFileSync(path.join(__dirname, '../data', name), 'utf8');
const byId = new Map(load().filter(q => q.chapter === '8').map(q => [q.id, q]));
const context = { window: {} };
vm.runInNewContext(read('g9-clear-math.js'), context);
const presentation = context.window.TriggleG9Math;

const tamilPages = new Map([
  ['8.1', ['g9-ch8-ex8-1-en', [300, 300, 300, 300, 300, 300, 300, 300]]],
  ['8.2', ['g9-ch8-ex8.2-en', [306, 306, 306, 307, 307, 307]]],
  ['8.3', ['g9-ch8-ex8.3-en', [310, 310, 310, 310, 310, 311]]],
  ['8.4', ['g9-ch8-ex8-4-en', [311, 311, 311, 311, 311, 311, 311, 311, 311, 311]]]
]);

for (const [exercise, [filename, pages]] of tamilPages) {
  const manifest = JSON.parse(read(`textbook-fidelity/${filename}.json`));
  const records = manifest.items || manifest.records;
  assert.equal(manifest.englishSourceId, '1WxLnjLPhAGkTylUHNFvh8UL34Z8eqC4J');
  assert.equal(manifest.tamilSourceId, '1gp6z1UOuqoH6MCuZt_qNi492R3vZUWaj');
  assert.equal(records.length, pages.length);
  for (const [index, pdfPage] of pages.entries()) {
    const id = `g9-ch8-ex${exercise}-q${index + 1}`;
    const source = records.find(record => record.id === id);
    const evidence = source.sourceFidelity || source.sourcePages;
    const question = byId.get(id);
    assert.equal(question.q.en, source.q || source.question, id);
    assert.equal(question.answer, source.answer, id);
    assert.equal(evidence.taPdfPage, pdfPage, id);
    assert.equal(evidence.taPrintedPage, pdfPage - 6, id);
    assert.equal(evidence.tamilEditorial, 'pending', id);
    assert.deepEqual(JSON.parse(JSON.stringify(question.sourceFidelity)), evidence, id);
  }
}

function fallback(value) {
  if (Array.isArray(value)) return value.map(fallback).join('');
  return typeof value === 'string' ? value : value.fallback;
}

const reviewed = [
  ['8.1-q5', 3, /20 students scored 20 marks/, /p = 20$/],
  ['8.1-q7', 1, /deviation tells how far a midpoint is above or below 25/, /^d =/],
  ['8.1-q7', 3, /average deviation.+estimated mean of 29\.29/, /29\.29$/],
  ['8.1-q8', 0, /deviation from 27 in signed steps of five years/, /u=/],
  ['8.1-q8', 2, /convert it back to years.+29\.05 years/, /29\.05 years$/],
  ['8.2-q5', 1, /Each running total counts the students through that class/, /^CF = 2,9,24,34,45,50$/],
  ['8.2-q5', 2, /24 and 34, so 30–40 is the median class.+L is the lower boundary, cf the previous running total, f the frequency, and h the width/, /^L=30/, ['L', '\\text{cf}', 'f', 'h']],
  ['8.2-q5', 3, /one-tenth of the class width.+median at 31 marks/, / = 31$/],
  ['8.3-q5', 0, /f₁ for this class, f₀ for the previous class, and f₂ for the next class/, /f₁=46, f₀=38, f₂=34$/, ['f_1', 'f_0', 'f_2']],
  ['8.3-q5', 2, /mode is 24 marks, a value inside the modal class/, / = 24$/],
  ['8.3-q6', 0, /frequency is f₁, the previous class has frequency f₀, and the next class has frequency f₂/, /f₁=14, f₀=10, f₂=8$/, ['f_1', 'f_0', 'f_2']],
  ['8.3-q6', 1, /half a kilogram closes the gaps.+L is the lower boundary and h is the class width/, /^L=54\.5/, ['L', 'h']],
  ['8.3-q6', 3, /estimated mode is 58\.5 kg/, / = 58\.5 kg$/]
];

for (const [part, index, explanation, working, symbols] of reviewed) {
  const id = `g9-ch8-ex${part}`;
  const question = byId.get(id);
  const source = question.steps[index];
  const shown = presentation.get(question).steps[index];
  assert.equal(question.sourceFidelity.status, 'english-source-page-visual-checked', id);
  assert.match(source.en, explanation, id);
  assert.match(source.eq, working, id);
  assert.equal(source.ta, `English explanation (Tamil version pending): ${source.en}`, id);
  assert.equal(fallback(shown.math), source.eq, id);
  for (const language of ['en', 'ta']) {
    const reason = shown.reasonMath[language];
    assert.equal(fallback(reason), source[language], id);
    if (symbols) {
      assert.deepEqual(Array.from(reason.filter(fragment => fragment.latex), fragment => fragment.latex), symbols, id);
    }
  }
}

assert.match(byId.get('g9-ch8-ex8.3-q6').sourceFidelity.notes.join(' '), /Tamil.+mean and median/);
const weightedMean = (values, counts) =>
  values.reduce((total, value, index) => total + value * counts[index], 0) /
  counts.reduce((total, count) => total + count, 0);
assert.equal(weightedMean([10, 15, 20, 25, 30], [6, 8, 20, 10, 6]), 20.2);
assert.equal(weightedMean([5, 15, 25, 35, 45], [5, 7, 15, 28, 8]), 205 / 7);
assert.equal(weightedMean([17, 22, 27, 32, 37, 42], [4, 20, 38, 24, 10, 9]), 610 / 21);
assert.equal(30 + ((50 / 2 - 24) / 10) * 10, 31);
assert.equal(20 + (8 / (8 + 12)) * 10, 24);
assert.equal(54.5 + (4 / (4 + 6)) * 10, 58.5);

console.log('PASS Grade 9 Statistics: 30 source locators, six worked explanations and answers, and rendered bilingual fallback parity.');

// The concept studio is independent of the exercise typography compiler.
const lessonWindow = {TriggleNotation: {render: () => { throw Error('Unit test attempted a browser render'); }}};
for (const file of ['data/g9-statistics-concepts.js', 'assets/g9-statistics-concepts.js']) {
  vm.runInNewContext(fs.readFileSync(path.join(__dirname, '..', file), 'utf8'), {window: lessonWindow});
}
const lessons = lessonWindow.TRIGGLE_STATISTICS_LESSONS;
const {frequency, summarize, groupedMedian, groupedMode} = lessonWindow.TriggleStatisticsConcepts;
const plain = value => JSON.parse(JSON.stringify(value));
assert.deepEqual(Array.from(lessons, x => x.section), ['8.1', '8.2', '8.3', '8.4', '8.5', '8.6']);
const katex = require('../assets/vendor/katex/katex.min.js');
function bilingual(value, context, numeric = false) {
  if (numeric && typeof value === 'string') {
    assert.match(value, /^\d+(\.\d+)?$/, context);
    return;
  }
  assert.match(value.en, /[A-Za-z]/, context);
  assert.match(value.ta, /\p{Script=Tamil}/u, context);
}
for (const stage of lessons) {
  assert.ok(byId.has(stage.exercise), stage.exercise);
  bilingual(stage.title, stage.id);
  bilingual(stage.intro, stage.id);
  for (const view of stage.views) {
    if (view.exercise) assert.ok(byId.has(view.exercise), view.exercise);
    view.notes.forEach(note => bilingual(note, stage.id));
    bilingual(view.why, stage.id);
    const practice = view.practice || stage.practice;
    bilingual(practice.question, stage.id);
    practice.choices.forEach(choice => bilingual(choice, stage.id, true));
    practice.feedback.forEach(feedback => bilingual(feedback, stage.id));
    assert.ok(practice.choices[practice.correct], stage.id);
    assert.equal(practice.feedback.length, practice.choices.length);
    if (view.formula) {
      bilingual(view.formula.fallback, stage.id);
      assert.match(katex.renderToString(view.formula.latex, {strict:'error', throwOnError:true}), /<math/);
    }
  }
}
for (const [set, mean, median, modes] of [
  [[], null, null, []],
  [[0], 0, 0, []],
  [[-7, 0, 2, -7, 0], -2.4, 0, [-7, 0]],
  [[11, 3, 7, 2], 5.75, 5, []],
  [[12, 4, 9, 6], 7.75, 7.5, []],
  [[4, 4, 7, 11, 11, 11], 8, 9, [11]],
  [[2, 3, 3, 4, 41], 10.6, 3, [3]]
]) {
  const data = summarize(frequency(set));
  assert.equal(data.mean, mean);
  assert.equal(data.median, median);
  assert.deepEqual(plain(data.modes), modes);
  assert.equal(data.count, set.length);
}
assert.deepEqual(plain(summarize([[4,2],[7,1],[11,3]]).cumulative), [2,3,6]);
assert.equal(groupedMedian([2,5,3]).value, 16);
assert.equal(groupedMedian([5,2,3]).value, 10);
assert.equal(groupedMedian([0,3,3]).value, 20);
assert.ok(Math.abs(groupedMedian([3,6,2]).value - 85 / 6) < 1e-12);
assert.equal(groupedMedian([0,0,0]), null);
assert.equal(groupedMode([2,5,3]).value, 16);
assert.equal(groupedMode([3,5,2]).value, 14);
assert.equal(groupedMode([2,5,5]), null);
assert.equal(groupedMode([6,5,4]), null);
console.log('PASS Statistics concepts: six sections, valid KaTeX, practice and exercise links, odd/even and grouped boundary cases.');
