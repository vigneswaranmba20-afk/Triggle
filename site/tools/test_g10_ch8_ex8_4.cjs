'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const site = path.resolve(__dirname, '..');
const read = file => fs.readFileSync(path.join(site, file), 'utf8');
const katex = require('../assets/vendor/katex/katex.min.js');
const evidence = JSON.parse(read('data/textbook-fidelity/g10-ch8-ex8-4.json'));
const inventory = JSON.parse(read('../docs/trace/source-inventories/g10-ch8-ex8-4.json'));
const html = read('index.html');
const context = vm.createContext({window: {}, console});
for (const [, file] of html.matchAll(/<script src="\.\/(data\/[^?"']+)(?:\?[^"']*)?"/g)) {
  vm.runInContext(read(file), context, {filename: file});
}
const grade = context.window.TRIGGLE_CLASSES[10];
assert.equal(new Set(grade.items.map(row => row.id)).size, grade.items.length);
const chapter = context.window.TRIGGLE_CURRICULUM.grades.find(g => g.grade === 10).chapters.find(c => c.number === 8);
const items = grade.items.filter(row => row.chapter === '8' && row.exercise === '8.4');
const canonical = inventory.questions.flatMap(q => q.parts.map(part =>
  'c10-8-ex8-4-q' + q.question + (part === 'whole' ? '' : '-' + part)));
assert.equal(canonical.length, 15);
assert.deepEqual([...evidence.blocked.map(row => row.id), ...Array.from(items, row => row.id)], canonical);
assert.equal(evidence.items.length, items.length);
const cache = read('service-worker.js');
assert.ok(cache.includes('./data/textbook-exercises/g10-ch8-ex8-4.js'));
function checkMath(math, fallback) {
  assert.equal(math.fallback, fallback);
  assert.match(katex.renderToString(math.latex, {throwOnError: true, strict: 'error'}), /<math/);
}
for (const [index, row] of items.entries()) {
  const source = evidence.items[index];
  assert.equal(row.id, source.id);
  assert.equal(chapter.textbookQuestionIds.filter(id => id === row.id).length, 1);
  assert.ok(context.window.TriggleDifficulty.get(row));
  assert.equal(row.translationReview, 'pending');
  assert.equal(row.kind, 'textbook');
  for (const language of ['en', 'ta']) {
    assert.equal(source.visualStatus[language], 'page-checked');
    assert.equal(row.q[language], source.textbookPrompt[language]);
    assert.equal(row.sourceFidelity.sourcePdfPage[language], source.sourcePages[language].pdf);
    const renderedPromptFallback = row.questionMath[language].map(part => {
      if (typeof part === 'string') return part;
      checkMath(part, part.fallback);
      return part.fallback;
    }).join('');
    assert.equal(renderedPromptFallback, source.textbookPrompt[language]);
  }
  assert.match(row.q.ta, /\p{Script=Tamil}/u);
  assert.equal(row.answer.ta, row.answer.en);
  checkMath(row.answerMath, row.answer.en);
  assert.ok(row.steps.length >= 2);
  for (const step of row.steps) {
    assert.ok(step.en);
    assert.match(step.ta, /\p{Script=Tamil}/u);
    checkMath(step.math, step.eq);
  }
  if (row.figureSrc) {
    assert.match(read(row.figureSrc), /<svg/);
    assert.ok(cache.includes('./' + row.figureSrc));
    assert.match(row.figureAlt.ta, /\p{Script=Tamil}/u);
  }
}

// Compute the printed tasks from their givens. Counts provide exact rational checks.
const range = (first, last) => Array.from({length: last - first + 1}, (_, i) => i + first);
const gcd = (a, b) => b === 0 ? a : gcd(b, a % b);
const fraction = (n, d) => {
  const factor = gcd(n, d);
  return n === d ? '1' : n / factor + '/' + d / factor;
};
const prime = n => n > 1 && range(2, Math.floor(Math.sqrt(n))).every(d => n % d !== 0);
const dice = range(1, 6).flatMap(a => range(1, 6).map(b => [a, b]));
const cards = range(3, 37).filter(n => n % 2);
const tosses = ['H', 'T'].flatMap(a => ['H', 'T'].flatMap(b => ['H', 'T'].map(c => a + b + c)));
const coins = count => fraction(tosses.filter(count).length, tosses.length);
const people = 8000;
const women = 3000;
const overFifty = 1300;
const contractOutcomes = [168 - 73, 105 - 73, 73, 280 - 200];
assert.ok(contractOutcomes.every(p => p >= 0));
assert.equal(contractOutcomes.reduce((sum, n) => sum + n, 0), 280);
const x = 216 + 40 + 60 + 30 - 16; // 6P(A), expressed in units of 1/240.
const abc = 16, ab = 40, bc = 60, ac = 30, a = x / 6, b = x / 3, c = x / 2;
const regions = [abc, ab - abc, bc - abc, ac - abc, a - ab - ac + abc,
  b - ab - bc + abc, c - ac - bc + abc, 240 - 216];
assert.ok(regions.every(p => p >= 0));
assert.equal(regions.reduce((sum, n) => sum + n, 0), 240);
const expected = [
  ((100 - 42) / 100).toFixed(2),
  ((100 - 48) / 100).toFixed(2),
  ((42 + 48 - 16) / 100).toFixed(2),
  ((65 - (100 - 45)) / 100).toFixed(2),
  String((200 - 60 - 20) / 100),
  String((100 - 50 - 30) / 100),
  fraction(dice.filter(([a, b]) => a % 2 === 0 || a + b === 8).length, dice.length),
  fraction(cards.filter(n => n % 7 === 0 || prime(n)).length, cards.length),
  coins(s => s.split('T').length - 1 <= 2 || s.split('H').length - 1 >= 2),
  fraction(3 * 56 + (8 - 5) * 35 - 5 * 40, 280),
  fraction(women + overFifty - women * 30 / 100, people),
  coins(s => s.split('H').length - 1 === 2 || s.includes('T') || s.includes('HH')),
  `P(A) = ${fraction(a, 240)}, P(B) = ${fraction(b, 240)}, P(C) = ${fraction(c, 240)}`,
  fraction(range(1, 35).filter(n => n % 2 === 0 || (n <= 20 ? prime(n) : !prime(n))).length, 35)
];
assert.deepEqual(Array.from(items, row => row.answer.en), expected);

// On a common denominator of 15, the union is 5 and A is 10. The
// answer key's intersection 11 exceeds both A and B (probability 6/15).
assert.equal(Math.max(10, 6) > 5, true);
assert.equal(10 + 6 - 5 > Math.min(10, 6), true);
assert.match(evidence.blocked[0].reason.ta, /\p{Script=Tamil}/u);
console.log('PASS: Exercise 8.4 source, runtime, KaTeX and independent arithmetic for 14 bilingual tasks, plus Q1 quarantine.');
