'use strict';

const assert = require('node:assert/strict');
const {loadRuntime} = require('./curriculum_bulk.cjs');
const evidence = require('../data/textbook-fidelity/g10-frontier-compositions.json');

const records = new Map(loadRuntime().classes[10].items.map(record => [record.id, record]));
const [rationalEvidence, rangeEvidence] = evidence.items;
const rational = records.get(rationalEvidence.id);
const ranges = records.get(rangeEvidence.id);

assert.match(rational.steps[2].eq, /x≠±1\/√2/);
assert.match(rational.steps[2].eq, /x≠0/);
assert.match(rational.steps[2].ta, /சார்பகங்களும் வேறுபடுகின்றன/);
const rationalF = x => x === 0 ? undefined : 2 / x;
const rationalG = x => 2 * x * x - 1;
assert.equal(rationalF(rationalG(0)), -2, 'zero belongs to the domain of f after g');
assert.equal(rationalF(0), undefined, 'zero does not belong to the domain of g after f');
assert.equal(2 * 1 - 2, 0, 'on each sign of the root, x²=1/2 makes the inner output zero');
for (const x of [-3, -1, 1, 2]) {
  assert.equal(rationalF(rationalG(x)), 2 / (2 * x * x - 1));
  assert.equal(rationalG(rationalF(x)), 8 / (x * x) - 1);
}
const linearF = x => (x + 6) / 3;
const linearG = x => 3 - x;
for (const x of [-3, 0, 3, 6]) {
  assert.equal(linearF(linearG(x)), (9 - x) / 3);
  assert.equal(linearG(linearF(x)), (3 - x) / 3);
}
assert.match(rational.steps[3].eq, /\(9−x\)\/3.*\(3−x\)\/3/);

for (const locale of ['en', 'ta']) {
  assert(ranges.steps.every(step => step[locale] && step.math.length));
  for (const {fallback} of ranges.answerMath[locale].filter(part => typeof part !== 'string')) {
    assert.match(fallback, /[ABD]/);
  }
  assert.equal(ranges.answerMath[locale].filter(part => typeof part !== 'string').length, 3);
}
for (const field of ['allowedInputsForFAfterG', 'rangeFAfterG', 'rangeGAfterF']) {
  const expression = rangeEvidence.mathematicalEvidence[field];
  assert(ranges.answer.includes(expression), expression);
  assert(ranges.answerTa.includes(expression), expression + ' Tamil');
}

const subset = (universe, mask) => universe.filter((_, i) => mask & (1 << i));
const f = x => 2 * x + 1;
const g = x => x * x;
const possibilitiesA = [1, 2, 3, 4];
const possibilitiesB = [1, 2, 3, 4, 5, 6, 7, 8, 9];
let checked = 0;
let undefinedOnB = 0;
for (let a = 0; a < 1 << possibilitiesA.length; a++) {
  const A = subset(possibilitiesA, a);
  for (let b = 0; b < 1 << possibilitiesB.length; b++) {
    const B = subset(possibilitiesB, b);
    if (!A.every(x => B.includes(f(x)))) continue;
    const fValues = new Map(A.map(x => [x, f(x)]));
    const gValues = new Map(B.map(x => [x, g(x)]));
    const D = B.filter(x => fValues.has(gValues.get(x)));
    const inverseOrderRange = D.map(x => fValues.get(gValues.get(x)));
    assert.deepEqual(D, B.filter(x => A.includes(x * x)));
    assert.deepEqual(inverseOrderRange, D.map(x => 2 * x * x + 1));
    assert.deepEqual(A.map(x => gValues.get(fValues.get(x))), A.map(x => (2 * x + 1) ** 2));
    checked++;
    if (D.length !== B.length) undefinedOnB++;
  }
}
assert(checked > 1000 && undefinedOnB > 1000);
const example = rangeEvidence.mathematicalEvidence.counterexample;
assert.deepEqual(example.A.map(x => g(f(x))), [9]);
assert.deepEqual(example.B.filter(x => example.A.includes(g(x))), []);
console.log(`Grade 10 composition formulas, domain exclusions and appendix order checked independently. Verified ${checked} compatible finite subset pairs and the printed special case.`);
