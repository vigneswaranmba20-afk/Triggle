'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
const html = fs.readFileSync(path.join(__dirname, '../grade-12/inverse-method-lab.html'), 'utf8');
const script = html.match(/<script>([\s\S]*?)<\/script>/);
assert.ok(script, 'calculator script must exist');
const context = {
  document: { getElementById: () => ({ addEventListener() {} }) }
};
vm.runInNewContext(script[1], context);
assert.match(context.inverseSteps(2,1,3,2), /A⁻¹ = adj\(A\)\/det\(A\)/);
assert.match(context.inverseSteps(1,2,2,4), /singular/);
assert.match(context.inverseSteps(100000000,0,0,100000000), /Integer overflow/);
// Previously 1e16 - 1e16 could cancel to a safe determinant even though
// the intermediate products were rounded; reject that unsafe computation.
assert.match(context.inverseSteps(100000000,100000000,100000000,100000000), /Integer overflow/);
assert.match(context.inverseSteps(Number.MAX_SAFE_INTEGER,1,1,2), /Integer overflow/);
assert.match(context.inverseSteps(1.5,0,0,1), /safe integers/);
assert.match(context.inverseSteps(1,0,0,1), /அணிக்கோவை/);
console.log('Grade 12 inverse lab safe-integer intermediate-product regressions passed');
