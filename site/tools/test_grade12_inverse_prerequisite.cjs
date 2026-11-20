'use strict';
// Grade 12 Exercise 1.1 Q2 inverse-method prerequisite.
// This is a mathematical regression, NOT a source-exact textbook answer.
// Do not mark Q2(i) drafted until both 2025 page images are checked.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const coverage = JSON.parse(fs.readFileSync(path.join(__dirname, '../../docs/grade-12/coverage-2025.json'),'utf8'));
const inventory = JSON.parse(fs.readFileSync(path.join(__dirname, '../../docs/grade-12/ex1.1-source-inventory-2025.json'),'utf8'));
const q2 = inventory.items.find(item => item.id === 'g12-ch1-ex1.1-q2-i');
assert(q2 && q2.status === 'missing' && q2.matrixSourceImageChecked === false,
  'Q2(i) must remain missing until the exact original matrix is visually checked');
assert(!coverage.items.some(item => item.id === q2.id),
  'Do not publish an unverified textbook Q2(i) as a verified lesson');
let nonsingular=0, singular=0;
for(let a=-3;a<=3;a++) for(let b=-3;b<=3;b++)
for(let c=-3;c<=3;c++) for(let d=-3;d<=3;d++){
  const det=a*d-b*c;
  if(det===0){singular++;continue;}
  nonsingular++;
  // A^{-1} = (1/det) [d,-b;-c,a]. Multiply by det to test exactly.
  const left=[a*d-b*c, -a*b+b*a, c*d-d*c, -c*b+d*a];
  const right=[d*a-b*c, d*b-b*d, -c*a+a*c, -c*b+a*d];
  assert.deepEqual(left,[det,0,0,det]);
  assert.deepEqual(right,[det,0,0,det]);
}
assert.equal(nonsingular+singular,2401);
assert(nonsingular>0 && singular>0);
console.log('PASS Grade 12 inverse prerequisite: '+nonsingular+' invertible and '+singular+' singular 2x2 integer matrices; Q2(i) remains source-blocked');
