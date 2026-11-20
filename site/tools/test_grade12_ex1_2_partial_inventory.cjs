'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const inventory = JSON.parse(fs.readFileSync(path.join(__dirname, '../../docs/grade-12/ex1.2-partial-inventory-2025.json'), 'utf8'));
assert.equal(inventory.grade, 12);
assert.equal(inventory.exercise, '1.2');
assert.equal(inventory.inventoryComplete, false);
assert.equal(inventory.knownMissingSubparts, 11);
assert.equal(inventory.items.length, 11);
assert.equal(new Set(inventory.items.map(x => x.id)).size, 11);
const expected = [1,2,3].flatMap((q) => (q === 1 ? ['i','ii','iii','iv','v'] : ['i','ii','iii']).map(part => 'g12-ch1-ex1.2-q' + q + '-' + part));
assert.deepEqual(inventory.items.map(x => x.id), expected);
for (const item of inventory.items) {
  assert.equal(item.status, 'missing');
  assert.equal(item.sourceExact, false);
  assert.equal(item.mathVerified, false);
  assert.equal(item.merged, false);
  assert.equal(item.liveVerified, false);
  assert.equal(item.tamilEditorialReview, 'pending');
}
assert.equal(inventory.source.english.pageImageVerified, false);
assert.equal(inventory.source.tamil.pageImageVerified, false);
console.log('Grade 12 Exercise 1.2 partial inventory: 11 unique, unreleased, source-pending IDs');
