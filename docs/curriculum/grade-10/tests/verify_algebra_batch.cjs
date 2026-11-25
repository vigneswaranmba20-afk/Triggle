'use strict';
const assert = require('node:assert/strict');
const sourceAudit = require('../trace/g10-ch3-final-source-audit-20261125.json');

// The Python/SymPy source check is independent of lesson generation. These
// fingerprints bind the reviewed workings to its results without requiring
// a Python package in the JavaScript runtime or the TRACE structural checks.
module.exports = ({records, mapping}, {hashRecord}) => ({
  checks: mapping.map(({recordId, exercise, question, parts}) => {
    const item = records.find(record => record.id === recordId);
    const checked = sourceAudit.records[recordId];
    assert.ok(item && checked, 'Missing reviewed working for ' + recordId);
    assert.deepEqual(parts.map(part => [exercise, question, part].join('/')), [checked.key]);
    assert.equal(hashRecord(item), checked.recordSha256, 'Reviewed working changed for ' + recordId);
    if (exercise === '3.20') {
      assert.equal('ABCD'[item.correctIndex], checked.independentResult, recordId);
    }
    return {
      recordId, parts, passed: true, recordSha256: checked.recordSha256,
      method: 'Source calculation and reviewed working: ' + checked.independentResult
    };
  })
});
