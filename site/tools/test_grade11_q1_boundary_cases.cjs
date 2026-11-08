'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const lesson = JSON.parse(fs.readFileSync(path.join(root, 'data/textbook-exercises/g11-ch1-ex1-1-q1.json'), 'utf8'));
const coverage = JSON.parse(fs.readFileSync(path.join(root, '../docs/coverage/grade-11-2025.json'), 'utf8'));
const expectedIds = ['i','ii','iii','iv'].map(s => 'g11-ch1-ex1.1-q1-' + s);
assert.deepEqual(lesson.questions.map(q => q.id), expectedIds);
assert.deepEqual(coverage.items.map(q => q.id), expectedIds);
assert.equal(coverage.grade, 11);
assert.equal(coverage.inventoryComplete, false);
assert.equal(coverage.exerciseQuestionSubpartTotal, null);
assert.equal(coverage.chapters.length, 12);

const primes = n => Number.isInteger(n) && n >= 2 &&
  Array.from({length: Math.max(0, Math.floor(Math.sqrt(n)) - 1)}, (_,i) => i+2).every(d => n % d !== 0);
const q1 = Array.from({length: 121}, (_,i) => i).filter(n => primes(n) && n*n < 121);
assert.deepEqual(q1, [2,3,5,7]);
assert.equal(primes(1), false);
assert.equal(11*11 < 121, false);

const polynomial = x => (x-1)*(x+1)*(x*x-1);
assert.ok(polynomial(1) === 0, 'x=1 is a root (signed zero is mathematically zero)');
assert.ok(polynomial(-1) === 0, 'x=-1 is a root (signed zero is mathematically zero)');
assert.notEqual(polynomial(0), 0);
assert.deepEqual([-1,1].filter(x => x > 0), [1]);

const q3 = Array.from({length: 60}, (_,i) => i+1).filter(n => 4*n+9 < 52);
assert.deepEqual(q3, Array.from({length:10}, (_,i) => i+1));
assert.equal(4*10+9, 49);
assert.equal(4*11+9, 53);
assert.equal(43/4, 10.75);

const rational = x => (x-4)/(x+2);
assert.equal(rational(-5), 3);
assert.equal(Number.isFinite(rational(-2)), false);
assert.equal(-5-4, 3*(-5+2));
assert.deepEqual(lesson.questions.map(q => q.answer.en), [
  '{2, 3, 5, 7}', '{1}', '{1, 2, 3, 4, 5, 6, 7, 8, 9, 10}', '{−5}'
]);

for (const [index, q] of lesson.questions.entries()) {
  assert.equal(q.grade ?? lesson.grade, 11);
  assert.equal(q.source.edition, '2025 revised');
  assert.equal(q.source.page.en, 7);
  assert.equal(q.source.page.ta, 9);
  assert.equal(q.source.pdfPage.en, 15);
  assert.equal(q.source.pdfPage.ta, 17);
  assert.equal(q.review.publication, 'draft');
  assert.equal(q.review.tamilEditorial, 'pending');
  assert.equal(q.review.mathematics, 'independently checked');
  for (const lang of ['en','ta']) {
    assert.ok(q.prompt[lang].trim().length > 15);
    assert.ok(q.steps[lang].length >= 3);
    assert.ok(q.steps[lang].every(s => s.trim().length > 15));
    assert.equal(q.answer[lang], q.answer.en);
  }
  const row = coverage.items[index];
  assert.equal(row.mathChecked, true);
  assert.equal(row.ciPassed, false);
  assert.equal(row.merged, false);
  assert.equal(row.deployed, false);
  assert.equal(row.liveVerified, false);
  assert.equal(row.tamilEditorial, 'pending');
}
assert.ok(coverage.chapters.every(ch => ch.ciPassed === 0 && ch.merged === 0 && ch.liveVerified === 0));
console.log('PASS Grade 11 Q1(i-iv): boundary arithmetic, bilingual metadata, 2025 page references and publication safety gates');
