'use strict';
// Grade 10 Exercise 1.1 Q6(i): independent exhaustive distributive-law check.
// This is a mathematics regression, NOT a claim of source-image transcription.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const q = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/textbook-exercises/g10-ch1-ex1-1-q6i.json'), 'utf8'));
const universe = [0, 1, 2, 3];
const subsets = Array.from({length: 16}, (_, mask) => universe.filter((_, i) => mask & (1 << i)));
const product = (a, b) => a.flatMap(x => b.map(y => JSON.stringify([x,y])));
const union = (a, b) => [...new Set([...a, ...b])];
const canonical = xs => [...new Set(xs)].sort();
let cases = 0;
for (const A of subsets) for (const B of subsets) for (const C of subsets) {
  const left = canonical(product(A, union(B,C)));
  const right = canonical([...product(A,B), ...product(A,C)]);
  assert.deepEqual(left, right, 'Distributive law failed for '+JSON.stringify({A,B,C}));
  cases++;
}
assert.equal(cases, 4096);
assert.equal(q.review.mathVerified, true);
assert.equal(q.review.sourceVerified, false);
assert.equal(q.source.fidelity.englishPageImageVerified, false);
assert.equal(q.source.fidelity.tamilPageImageVerified, false);
assert.equal(q.review.liveVerified, false);
assert.equal(q.review.tamilEditorial, 'pending');
console.log('PASS: Grade 10 Q6(i) distributivity over 4096 set triples; source-fidelity gate remains pending');
