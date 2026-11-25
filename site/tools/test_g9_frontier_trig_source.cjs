'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const {load} = require('./build_g9_math.cjs');
const {items,registeredBooks} = require('../data/textbook-fidelity/g9-ch6-frontier-source.json');
const books = require('../data/textbook-fidelity/g9-ch5-ex5-2-frontier.json').sources;
const read = file => fs.readFileSync(path.resolve(__dirname,'..',file),'utf8');
const cards = new Map(load().map(card => [card.id,card]));
assert.equal(items.length,23);
for (const language of ['en','ta']) {
  assert.equal(registeredBooks.find(book => book.medium === language).sha256,books[language].sha256);
}
for (const proof of items) {
  const card = cards.get(proof.id);
  assert.equal(card.source,`https://drive.google.com/file/d/${books.en.driveId}/view`,proof.id);
  if (proof.originalReaderFields) {
    assert.equal(card.page,proof.sourcePages.en.pdfPages[0],proof.id);
    assert(card.reference.includes(`Tamil PDF p.${proof.sourcePages.ta.pdfPages.at(-1)}`),proof.id);
    const original = proof.originalReaderFields;
    if (original.steps) {
      assert.equal(JSON.stringify(card.steps.slice(0,original.steps.length)),JSON.stringify(original.steps));
    }
  }
}
const cosine = cards.get('c9-exercise-6-1-q5');
assert.equal(cosine.q.en,'If cos A = [[2x|1 + x²]], then find the values of sin A and tan A in terms of x.');
assert.match(cosine.q.ta,/மதிப்புகளை/);
assert.match(cosine.answer,/∣1−x²∣/);
const triangle = cards.get('c9-exercise-6-1-q9');
assert.match(triangle.q.en,/two other right angled triangles/);
assert.match(triangle.q.ta,/மேலும் இரு செங்கோண முக்கோணங்கள்/);
const condition = items.find(row => row.disposition === 'SOURCE_BLOCKED');
const {a,b} = condition.counterexample;
assert.equal(a*a + b*b,25);
const sine = a/5, cosineAcute = Math.sqrt(1-sine*sine);
assert.equal(sine,3/5);
assert.equal(cosineAcute,4/5);
assert.equal(b*a,-12);
assert.equal(a*Math.abs(b),12);
const card = cards.get(condition.id);
assert.match(card.answer,/positive side lengths/);
assert.match(card.answerTa,/நேர்மப் பக்க நீளங்களுக்கு/);
assert.match(card.steps.at(-1).math.latex,/-\\dfrac\{12\}\{5\}\\neq\\dfrac\{12\}\{5\}/);
const html = read('index.html'), sw = read('service-worker.js');
assert(html.indexOf('g9-ch6-frontier-2025.js') < html.indexOf('g9-clear-math.js'));
assert(sw.includes('g9-ch6-frontier-2025.js'));
const classic = read('class9-classic.html');
const classicRows = JSON.parse(classic.match(/const SOLUTIONS=(\[[^\n]+\]);/)[1]);
const classicCard = classicRows.find(row => 'c9-'+row.id === card.id);
assert.equal(classicCard.prompt,card.q.en);
assert.equal(classicCard.promptTa,card.q.ta);
assert.equal(classicCard.final,card.answer);
assert.equal(classicCard.finalTa,card.answerTa);
const classicPages = JSON.parse(classic.match(/const sourcePages=(\{[^\n]+\});/)[1]);
assert.deepEqual(classicPages[classicCard.id],{en:233,ta:247});
for (const language of ['en','ta']) assert(classic.includes(books[language].driveId));
console.log('Grade 9 Trigonometry source links, original prompts, signed counterexample and Classic route verified.');
