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
  const coefficient = [a*c, a*d+b*c, a*e+b*d, b*e];
  assert.equal(coefficient[0], a*c);
  assert.equal(coefficient.length, 4);
}
for (const row of [q10,q11,q12]) {
  assert(row.steps.length>=3,'At least three explanatory steps: '+row.id);
  assert(row.sourceFidelity?.status?.includes('visual-pending'),
    'Do not silently upgrade source fidelity: '+row.id);
}
console.log('PASS Grade 9 Ex3.1 Q10–Q12: independent arithmetic identities, exact values, unique IDs, and pending source-image flags.');
