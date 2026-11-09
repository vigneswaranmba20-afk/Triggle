'use strict';
// Grade 10 2025 source-fidelity release gate. A mathematical proof alone
// must never promote a paraphrase to an exact textbook transcription.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const dir = path.join(__dirname, '../data/textbook-exercises');
const names = fs.readdirSync(dir).filter(n => /^g10-ch1-ex1-1-q.*\.json$/.test(n));
assert(names.length >= 9, 'Expected the existing Grade 10 Exercise 1.1 drafts');
let sourcePending = 0;
for (const name of names) {
  const q = JSON.parse(fs.readFileSync(path.join(dir, name), 'utf8'));
  assert.equal(q.grade, 10, name);
  assert.equal(q.source.edition, '2025 revised', name);
  assert.equal(q.review.tamilEditorial, 'pending', name);
  if (q.review.sourceVerified === false) {
    sourcePending++;
    assert.notEqual(q.review.liveVerified, true, name + ' is not source-verified');
    assert.notEqual(q.review.merged, true, name + ' must not claim a source-exact merge');
    assert.notEqual(q.review.deployed, true, name + ' must not claim deployed textbook fidelity');
    assert(q.steps?.length >= 1 && q.steps.every(step => step.en && step.ta),
      name + ' must retain bilingual supplementary learning steps');
    if (q.source.fidelity) {
      assert.equal(q.source.fidelity.englishExactQuestionVerified, false, name);
      assert.equal(q.source.fidelity.tamilExactQuestionVerified, false, name);
    } else {
      assert.equal(q.source.exactQuestionVerified, false, name);
      assert.match(q.classification, /NOT textbook-exact/, name);
    }
  }
}
assert(sourcePending >= 2, 'Q6(i/ii) source-image reviews must not be silently promoted');
console.log('PASS: Grade 10 source-fidelity release gate; '+sourcePending+' source-pending lessons stay unpublished as textbook-exact');
