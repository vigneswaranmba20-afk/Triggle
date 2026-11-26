'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const [source] = require('../data/textbook-fidelity/g10-ch2-frontier-salary.json').items;
const root = path.resolve(__dirname,'..');
const read = file => fs.readFileSync(path.join(root,file),'utf8');

// Work in thousandths of a rupee so every multiplication and subtraction is exact.
const pay = (starting, factor) => starting * factor**3n * 1000n / 100n**3n;
const a = pay(20000n,106n), b = pay(22000n,103n);
const delta = b-a;
assert.equal(a,23820320n);
assert.equal(b,24039994n);
assert.equal(delta,219674n);
const rounded = (number, amount) => (number+amount/2n)/amount;
assert.equal(rounded(b,10n),2403999n);
assert.equal(rounded(delta,10n),21967n);
assert.deepEqual([Number(rounded(a,1000n)),Number(rounded(b,1000n))],source.results.keyWholeRupees);

const context = vm.createContext({window:{}});
for (const match of read('index.html').matchAll(/<script(?: defer)? src="\.\/(data\/[^?\"]+)/g)) {
  vm.runInContext(read(match[1]),context,{filename:match[1]});
}
const items = context.window.TRIGGLE_CLASSES[10].items;
context.window.TriggleG10NumbersTamil(items);
const cards = items.filter(card => card.id === source.id);
assert.equal(cards.length,1);
const [card] = cards;
assert.equal(card.q.en,source.publishedPrompt.en);
assert.equal(card.q.ta,source.publishedPrompt.ta);
for (const answer of [card.answer,card.answerTa]) {
  assert.match(answer,/₹23,820\.32.*₹24,039\.99.*₹219\.67/);
}
assert.match(card.steps[1].math.latex,/24\{,\}039\.994/);
assert.match(card.steps[2].math.latex,/219\.674/);
assert.match(card.steps[2].ta,/₹23,820 மற்றும் ₹24,040/);
assert(card.steps.every(step=>step.en && step.ta));
assert(read('service-worker.js').includes('frontier-salary-1'));
console.log('Grade 10 Exercise 2.7 Q11 printed prompts, exact multiplication and appendix rounding verified.');
