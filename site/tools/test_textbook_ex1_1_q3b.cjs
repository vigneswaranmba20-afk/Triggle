'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const file = path.join(__dirname, '../data/textbook-exercises/g9-ch1-ex1-1-q3b.json');
const data = JSON.parse(fs.readFileSync(file, 'utf8'));
const sets = {A:[0,3,5,8],B:[2,4,6,10],C:[12,14,18,20]};
const expected = [
  ['i', 3, 'A', 'A'],
  ['ii', 14, 'C', 'C'],
  ['iii', 18, 'B', '∉'],
  ['iv', 4, 'B', '∈']
];
assert.equal(data.questions.length, 4);
assert.equal(new Set(data.questions.map(q=>q.id)).size,4);
for(let i=0;i<expected.length;i++){
  const [part,number,set,answer]=expected[i];
  const q=data.questions[i];
  assert.equal(q.id,`g9-ch1-ex1.1-q3-b-${part}`);
  assert.equal(q.exercise,'1.1');
  assert.equal(q.question,3);
  assert.equal(q.section,'b');
  assert.equal(q.part,part);
  assert.equal(q.answer.en,answer);
  assert.equal(q.answer.ta,answer);
  assert.equal(q.source.page.en,5);
  assert.equal(q.source.page.ta,6);
  assert.equal(q.source.edition,'2025 revised');
  assert.ok(q.prompt.en.includes('___'));
  assert.ok(q.prompt.ta.includes('___'));
  for(const lang of ['en','ta']) {
    assert.ok(q.steps[lang].length>=3);
    assert.ok(q.steps[lang].every(s=>s.trim().length>10));
  }
  assert.equal(q.review.tamilEditorial,'pending');
  assert.equal(q.review.publication,'draft');
  assert.equal(q.review.studentBrowser,'not-integrated');
  assert.equal(sets[set].includes(number),true=== (part!=='iii'));
}
assert.equal(sets.B.includes(18),false);
assert.equal(sets.B.includes(4),true);
console.log('Grade 9 Exercise 1.1 Q3(b): 4 bilingual subparts validated.');
