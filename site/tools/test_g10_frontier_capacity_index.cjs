'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const {items,legacyBookmark} = require('../data/textbook-fidelity/g10-ch2-frontier-capacity.json');
const read = file => fs.readFileSync(path.resolve(__dirname,'..',file),'utf8');
const context = vm.createContext({window:{}});
for (const match of read('index.html').matchAll(/<script(?: defer)? src="\.\/(data\/[^?\"]+)/g)) {
  vm.runInContext(read(match[1]),context,{filename:match[1]});
}
const cards = context.window.TRIGGLE_CLASSES[10].items;
context.window.TriggleG10NumbersTamil(cards);
const chapter = context.window.TRIGGLE_CURRICULUM.grades.find(grade=>grade.grade===10).chapters.find(chapter=>chapter.number===2);
for (const scope of [chapter.textbookQuestionIds,chapter.legacyQuestionIds]) {
  assert(!scope.includes(legacyBookmark.id));
}
assert.equal(chapter.textbookQuestionIds.filter(id=>id===legacyBookmark.duplicateOf).length,1);
assert.equal(cards.filter(row=>row.id===legacyBookmark.id).length,1);
const canonical = cards.find(row=>row.id===legacyBookmark.duplicateOf);
const duplicate = cards.find(row=>row.id===legacyBookmark.id);
assert.equal(duplicate.duplicateOf,canonical.id);
assert.match(canonical.answer,/√2, 2, 2√2/);
assert.match(duplicate.answer,/√2, 2, 2√2/);

// A common full capacity c implies 175/c : 105/c = 5 : 3.
// Positive integer counts with that reduced ratio are exactly 5k and 3k.
assert.equal(175*3,105*5);
for(let k=1;k<=100;k++) {
  assert.equal(35*(5*k),175*k);
  assert.equal(35*(3*k),105*k);
}
assert.equal(175/35,5);
assert.equal(105/35,3);
assert.equal(175/7,25);
assert.equal(105/7,15);
for(const proof of items) {
  const card = cards.find(row=>row.id===proof.id);
  assert.match(card.steps.at(-1).en,/35\/k/);
  assert.match(card.steps.at(-1).ta,/35\/k/);
  assert.match(card.answer,/35\/k/);
  assert.match(card.answerTa,/35|5|3/);
  assert.equal(proof.verification.largestCapacityLitres,35);
}
assert.match(cards.find(row=>row.id==='c10-2-unit-q2-i').q.ta,/மிகப் பெரிய|அதிகபட்ச|மிகப் பெரு/);
console.log('Grade 10 milk-capacity domain, intact bilingual parts and unlisted direct bookmark verified.');
