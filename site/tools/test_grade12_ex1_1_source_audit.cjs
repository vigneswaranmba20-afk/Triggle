'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '../..');
const audit = JSON.parse(fs.readFileSync(path.join(root, 'docs/grade-12/ex1.1-unverified-extraction-audit-2025.json'), 'utf8'));
const inventory = JSON.parse(fs.readFileSync(path.join(root, 'docs/grade-12/ex1.1-source-inventory-2025.json'), 'utf8'));
const coverage = JSON.parse(fs.readFileSync(path.join(root, 'docs/grade-12/coverage-2025.json'), 'utf8'));
assert.equal(audit.grade, 12);
assert.equal(audit.sourceFidelityCertified, false);
assert.equal(audit.mathematicallyVerifiedNewSubparts, 0);
assert.equal(audit.sourceDriveFileId, coverage.verifiedSources.english.driveFileId);
assert.equal(audit.sourceTamilDriveFileId, coverage.verifiedSources.tamil.driveFileId);
assert.equal(audit.questionStems.length, 14);
assert.deepEqual(audit.questionStems.map(q=>q.question), Array.from({length:14}, (_,i)=>i+2));
const q2 = audit.questionStems[0];
assert.deepEqual(q2.subparts, ['i','ii','iii']);
assert.equal(q2.stem, 'Find the inverse (if it exists) of the following:');
for(const q of audit.questionStems) {
  assert(q.blocked && /page-image verification/.test(q.blocked));
  const parts=q.subparts||[null];
  for(const part of parts){
    const id='g12-ch1-ex1.1-q'+q.question+(part?'-'+part:'');
    const item=inventory.items.find(i=>i.id===id);
    assert(item && item.status==='missing' && item.matrixSourceImageChecked===false,id);
    assert(!coverage.items.some(i=>i.id===id),'Unverified question promoted: '+id);
  }
}
assert.equal(inventory.items.length,19);
assert.equal(coverage.items.length,3);
console.log('PASS Grade 12 source audit: 14 question stems / 16 missing IDs held behind page-image fidelity gate');
