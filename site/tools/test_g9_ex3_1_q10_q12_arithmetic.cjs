'use strict';
// Independent arithmetic regression for existing Grade 9 Exercise 3.1 Q10–Q12.
// Textbook page-image fidelity remains a separate release gate.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const file = path.resolve(__dirname, '../data/textbook-exercises/g9-ch3-ex3-1-q10-q12-en.js');
const grade = { items: [] };
const chapter = { id: 'g9-ch3', textbookQuestionIds: [] };
const context = { window: { TRIGGLE_CLASSES: { 9: grade }, TRIGGLE_CURRICULUM: { grades: [{ grade: 9, chapters: [chapter] }] } }, console };
vm.createContext(context);
vm.runInContext(fs.readFileSync(file, 'utf8'), context, { filename: file, timeout: 10000 });
const entries = context.window.TRIGGLE_CLASSES?.[9]?.items || [];
const ids = ['g9-ch3-ex3.1-q10', 'g9-ch3-ex3.1-q11', 'g9-ch3-ex3.1-q12'];
for (const id of ids) {
  assert.equal(entries.filter(x => x.id === id).length, 1, 'Unique registered ID: ' + id);
}
const byId = id => entries.find(x => x.id === id);
const q10 = byId(ids[0]), q11 = byId(ids[1]), q12 = byId(ids[2]);
// Check the recorded question inputs, not just independently true identities.
// This guards against a question being changed while an old final answer still passes.
assert.match(q10.q.en, /\(x\s*\+\s*y\)/, 'Q10 must retain its (x+y) purchase expression');
assert.match(q10.q.en, /x\s*=\s*10\s*,?\s*y\s*=\s*5/, 'Q10 must retain x=10, y=5');
assert.match(q10.answer, /x²\s*\+\s*2xy\s*\+\s*y²/, 'Q10 must retain the symbolic answer');
assert.match(q11.q.en, /3x\s*\+\s*2/, 'Q11 must retain its length');
assert.match(q11.q.en, /3x\s*[−–-]\s*2/, 'Q11 must retain its breadth');
assert.match(q11.q.en, /x\s*=\s*20/, 'Q11 must retain x=20');
assert.match(q11.answer, /9x²\s*[−-]\s*4/, 'Q11 must retain the symbolic area');
assert.match(q12.q.en, /degree\s*1/, 'Q12 must retain the first polynomial degree');
assert.match(q12.q.en, /degree\s*2/, 'Q12 must retain the second polynomial degree');
for (const [x,y] of [[10,5],[0,2],[3,7],[-2,5]]) {
  assert.equal((x+y)*(x+y), x*x+2*x*y+y*y, 'Chocolate cost identity');
}
assert.match(q10.answer, /225/);
assert.equal((10+5)**2, 225);
for (const x of [1,2,10,20,35]) {
  assert.equal((3*x+2)*(3*x-2), 9*x*x-4, 'Rectangle area identity');
}
assert.match(q11.answer, /3596/);
assert.equal((3*20+2)*(3*20-2), 3596);
assert.match(q12.answer, /degree 3/i);
for (const [a,b,c,d,e] of [[1,2,3,4,5],[-2,7,4,1,9],[3,-1,-5,8,2]]) {
  assert.notEqual(a*c,0);
  // Leading term of (ax+b)(cx²+dx+e) is acx³.
  // Independently multiply coefficient arrays in ascending power order.
  const p = [b,a], q = [e,d,c];
  const product = Array(p.length + q.length - 1).fill(0);
  for (let i = 0; i < p.length; i++) {
    for (let j = 0; j < q.length; j++) product[i+j] += p[i]*q[j];
  }
  assert.deepEqual(product, [b*e, a*e+b*d, a*d+b*c, a*c]);
  assert.notEqual(product[3], 0, 'Degree 3 requires a nonzero cubic coefficient');
  assert.equal(product.length-1, 3);
}
// Guard student-readable mathematical working, not only the final numeric answer.
// These records use plain-text equations as the offline fallback.
assert(q10.steps.some(s => /x²\s*\+\s*2xy\s*\+\s*y²/.test(s.eq)), 'Q10 must show the expanded identity');
assert(q11.steps.some(s => /9x²\s*[−-]\s*4/.test(s.eq)), 'Q11 must show the simplified area formula');
assert(q12.steps.some(s => /acx³/.test(s.eq)), 'Q12 must show the nonzero cubic leading term');
for (const row of [q10,q11,q12]) {
  assert(row.steps.every(s => typeof s.en === 'string' && s.en.trim().length > 0 && typeof s.eq === 'string' && s.eq.trim().length > 0),
    'Every solution step must have readable English and a mathematical fallback: '+row.id);
  assert.equal(row.sourceFidelity?.tamilEditorial, 'not-in-scope', 'Do not imply Tamil editorial approval: '+row.id);
}
for (const row of [q10,q11,q12]) {
  assert(row.steps.length>=3,'At least three explanatory steps: '+row.id);
  assert(row.sourceFidelity?.status?.includes('visual-pending'),
    'Do not silently upgrade source fidelity: '+row.id);
}
console.log('PASS Grade 9 Ex3.1 Q10–Q12: independent arithmetic identities, exact values, unique IDs, and pending source-image flags.');
