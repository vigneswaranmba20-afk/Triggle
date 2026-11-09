'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const root = path.join(__dirname, '..', 'data');
const files = ['g9-ex1-2-q7-content-only.json', 'g9-ex1-2-q8-content-only.json'];
const docs = files.map(f => JSON.parse(fs.readFileSync(path.join(root, f), 'utf8')));
const entries = docs.flatMap(d => d.entries);
const expected = new Map([['g9-ch1-ex1-2-q7',4],['g9-ch1-ex1-2-q8-i',4],['g9-ch1-ex1-2-q8-ii',8],['g9-ch1-ex1-2-q8-iii',16],['g9-ch1-ex1-2-q8-iv',1]]);
assert.equal(entries.length, 5);
assert.equal(new Set(entries.map(e => e.id)).size, 5);
for (const d of docs) {
  assert.equal(d.source.driveFileId, '1WxLnjLPhAGkTylUHNFvh8UL34Z8eqC4J');
  assert.equal(d.source.printedPage, 12);
  assert.match(d.tamilStatus, /pending/);
  assert.match(d.status, /staged/);
}
for (const e of entries) {
  assert(expected.has(e.id));
  assert(e.steps.length >= 3 && e.steps.every(Boolean));
  assert(e.question && e.answer && e.sourceVisualReview === 'pending');
}
const power = a => a.reduce((acc, _) => acc.flatMap(s => [s, [...s, _]]), [[]]);
const cases = [
  ['g9-ch1-ex1-2-q7', ['a','{a,b}']],
  ['g9-ch1-ex1-2-q8-i', ['a','b']],
  ['g9-ch1-ex1-2-q8-ii', [1,2,3]],
  ['g9-ch1-ex1-2-q8-iii', ['p','q','r','s']],
  ['g9-ch1-ex1-2-q8-iv', []]
];
for (const [id, elements] of cases) {
  const subsets = power(elements);
  assert.equal(subsets.length, expected.get(id), id);
  assert.equal(new Set(subsets.map(s => JSON.stringify(s))).size, subsets.length);
}
console.log('PASS: 5 unique Grade 9 Q7-Q8 IDs, schema, provenance, 5 independent power-set cardinality checks');
