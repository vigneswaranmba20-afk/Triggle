'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const katex = require('../assets/vendor/katex/katex.min.js');
const root = path.resolve(__dirname, '..');
const read = file => fs.readFileSync(path.join(root, file), 'utf8');
const context = vm.createContext({window: {}, console});
for (const [, file] of read('index.html').matchAll(/<script src="\.\/(data\/[^?"']+)(?:\?[^"']*)?"/g)) {
  vm.runInContext(read(file), context, {filename: file});
}
const {stages} = context.window.TRIGGLE_G10_CH8_PATH;
const grade = context.window.TRIGGLE_CLASSES[10];
const byId = new Map(grade.items.filter(row => row.chapter === '8' && row.kind === 'textbook').map(row => [row.id, row]));
assert.equal(stages.length, 15);
assert.equal(new Set(stages.map(stage => stage.id)).size, stages.length);
const expected = ['8.1','8.2–8.2.1','8.2.2–8.2.3','8.2.4','8.2.5','8.2.5','8.2.5','8.3','8.4','8.4.1','8.4.1–8.4.2','8.4.2','8.5','8.6','8.6'];
assert.deepEqual(Array.from(stages, stage => stage.section), expected);

function bilingual(text) {
  assert.ok(text.en && text.ta);
}
function math(formula) {
  assert.ok(formula.fallback);
  assert.match(katex.renderToString(formula.latex, {throwOnError: true, strict: 'error'}), /<math/);
}
for (const stage of stages) {
  for (const text of [stage.title, stage.firstGlance, stage.understand.intro, stage.question, stage.why, stage.hint]) {
    bilingual(text);
    assert.match(text.ta, /\p{Script=Tamil}/u);
  }
  assert.ok(stage.page.en && stage.page.ta);
  math(stage.math);
  assert.ok(stage.understand.symbols.length > 0);
  stage.understand.symbols.forEach(row => { bilingual(row); math(row.symbol); });
  assert.ok(stage.proof.steps.length > 0);
  stage.proof.steps.forEach(row => { bilingual(row.title); bilingual(row.reason); math(row.math); });
  stage.choices.forEach(choice => { bilingual(choice); if (choice.math) math(choice.math); });
  assert.ok(stage.correct >= 0 && stage.correct < stage.choices.length);
  math(stage.whyMath);
  for (const id of [stage.practiceId, stage.secondaryPracticeId, stage.tertiaryPracticeId].filter(Boolean)) {
    assert.ok(byId.has(id), 'Broken question link ' + id);
  }
  assert.ok(stage.visual);
  assert.equal(stage.video, undefined);
}
const expectedChoices = [
  String((2 * 3 + 8) / 4),
  String((12 - 4) / (12 + 4)),
  String((-3) ** 2),
  String(((2 - 4) ** 2 + (6 - 4) ** 2) / 2),
  String(Math.abs(-2) * 4),
  '√' + (5 ** 2 - 1) / 12,
  String((30 + 40) / 2),
  4 / 20 < 2 / 8 ? 'A' : 'B',
  String(6 * 6),
  String(3 * 2),
  [2,4,6].some(a => a > 3) ? 'No' : 'Yes',
  '5/6',
  String((6 - 2) / 10),
  String((5 + 4 - 2) / 10),
  String(3 - 3)
];
assert.deepEqual(Array.from(stages, stage => stage.choices[stage.correct].en), expectedChoices);
const cache = read('service-worker.js');
for (const asset of ['data/g10-ch8-concepts.js','assets/g10-ch8-concepts.js','assets/g10-ch8-concepts.css']) {
  assert.ok(read('index.html').includes(asset));
  assert.ok(cache.includes('./' + asset));
}
console.log('PASS: 15 textbook-order bilingual concepts, valid KaTeX, independently checked answers and intact exercise links.');
