'use strict';
// Grade 10 Exercise 1.1 Q6(i): verify EACH displayed derivation against independently
// calculated finite sets, not merely the final answer or the number of steps.
// Exact English/Tamil textbook transcription is a separate blocking review.
const assert = require('node:assert/strict');
const q = require('../data/textbook-exercises/g10-ch1-ex1-1-q6i.json');
const A = [0,1], B = [2,3,4], C = [3,5];
const union = (a,b) => [...new Set([...a,...b])];
const cart = (a,b) => a.flatMap(x => b.map(y => [x,y]));
const pairs = x => '{'+x.map(([a,b])=>`(${a},${b})`).join(',')+'}';
const set = x => '{'+x.join(',')+'}';
const bc = union(B,C), ab = cart(A,B), ac = cart(A,C);
const lhs = cart(A,bc);
const unionPairs = new Set([...ab,...ac].map(p=>JSON.stringify(p)));
const rhs = cart(A,bc).filter(p=>unionPairs.has(JSON.stringify(p)));
const expected = [
  `A=${set(A)}; B=${set(B)}; C=${set(C)}`,
  `B∪C=${set(bc)}`,
  `A×(B∪C)=${pairs(lhs)}`,
  `A×B=${pairs(ab)}; A×C=${pairs(ac)}`,
  `(A×B)∪(A×C)=${pairs(rhs)}`,
  'A×(B∪C)=(A×B)∪(A×C)'
];
assert.equal(q.steps.length,expected.length);
for(let i=0;i<expected.length;i++) {
  assert.equal(q.steps[i].equation.replace(/\s+/g,''),expected[i].replace(/\s+/g,''),`Displayed derivation step ${i+1} differs from independently enumerated result`);
  assert.ok(q.steps[i].en?.trim() && q.steps[i].ta?.trim(),`Missing bilingual reasoning step ${i+1}`);
}
assert.equal(new Set(lhs.map(p=>JSON.stringify(p))).size,lhs.length);
assert.equal(new Set(rhs.map(p=>JSON.stringify(p))).size,rhs.length);
assert.deepEqual(new Set(lhs.map(p=>JSON.stringify(p))),new Set(rhs.map(p=>JSON.stringify(p))));
assert.equal(q.review.mathVerified,true);
assert.equal(q.review.sourceVerified,false);
for(const lang of ['english','tamil']) {
  assert.equal(q.source.fidelity[lang+'ExactQuestionVerified'],false);
  assert.equal(q.source.fidelity[lang+'PageImageVerified'],false);
  assert.equal(q.source[lang].printedPage,6);
  assert.equal(q.source[lang].pdfPage,12);
  assert.ok(q.source[lang].driveFileId);
}
assert.equal(q.review.liveVerified,false);
console.log('PASS: Q6(i) six displayed derivation equations independently enumerated; exact-source review remains blocked');
