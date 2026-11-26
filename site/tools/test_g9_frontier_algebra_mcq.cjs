'use strict';

const assert = require('node:assert/strict');
const {loadRuntime} = require('./curriculum_bulk.cjs');
const evidence = require('../data/textbook-fidelity/g9-ch3-frontier-mcq.json');

const records = loadRuntime().classes[9].items.filter(row => row.exercise === '3.15');
assert.equal(records.length, 29);
assert.equal(new Set(records.map(row => row.id)).size, 29);
const [factor, quadratic, constant, prime] = evidence.items.map(row => records.find(record => record.id === row.id));
for (const row of [factor, quadratic, constant, prime]) {
  assert(row?.steps.every(step => /\p{Script=Tamil}/u.test(step.ta)));
}
for (const row of [factor, prime]) {
  assert.equal(row.correctIndex, undefined, row.id + ' has no misleading single-answer grading');
}

// One exact quotient witnesses both of the equivalent terms in Q9.
const divisor = x => x - 2;
const quotient = x => x + 3;
const dividend = x => x * x + x - 6;
assert.equal(dividend(2), 0);
for (const n of [-4, 0, 2, 7]) assert.equal(dividend(n), divisor(n) * quotient(n));
assert.match(factor.answer, /\(1\) divisor.*\(4\) factor/);
assert.match(factor.answerTa, /வகுத்தி.*காரணி/);

// Recover all coefficients of the product for arbitrary leading coefficient a.
for (const a of [-4, -1, 1, 6]) {
  const b = 2 * a;
  const c = -15 * a;
  const p = x => a * x * x + b * x + c;
  assert.equal(p(-5), 0);
  assert.equal(p(3), 0);
}
const options = [[1,2,3], [1,2,15], [1,2,-15], [1,-2,15]];
const matches = options.flatMap(([a,b,c], index) =>
  25 * a - 5 * b + c === 0 && 9 * a + 3 * b + c === 0 ? [index + 1] : []);
assert.deepEqual(matches, [3]);
assert.match(quadratic.steps[0].eq, /a ≠ 0/);
assert.match(quadratic.steps[1].eq, /ax² \+ 2ax − 15a/);

const degree = coefficients => coefficients.findLastIndex(coefficient => coefficient !== 0);
assert.equal(degree([7]), 0);
assert.equal(degree([0]), -1, 'no exponent has a nonzero coefficient');
assert.match(constant.steps[0].ta, /பூச்சியக் கோவையின் படி வரையறுக்கப்படவில்லை/);

const gcd = (a,b) => b === 0 ? a : gcd(b,a % b);
const primes = [2,3,5,7,11,13];
for (const p of primes) {
  for (const q of primes) assert.equal(gcd(p,q), p === q ? p : 1);
}
assert.equal(gcd(2,2), 2);
assert.match(prime.answer, /Distinct primes/);
assert.match(prime.steps[1].eq, /gcd\(p, p\) = p/);
console.log('Grade 9 Algebra Exercise 3.15: exact proof of both ambiguous choices, full coefficient family, zero-polynomial condition, and 29 stable IDs.');
