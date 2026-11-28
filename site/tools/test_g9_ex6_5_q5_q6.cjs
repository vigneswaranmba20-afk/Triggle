'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const siteRoot = path.resolve(__dirname, '..');
const read = rel => fs.readFileSync(path.join(siteRoot, rel), 'utf8');

const ctx = { window: {}, console };
ctx.window = ctx;
vm.createContext(ctx);

for (const rel of [
  'data/class-9.js',
  'data/curriculum.js',
  'data/textbook-exercises/g9-ch6-ex6-5-q5-q6.js',
  'data/problem-difficulty.js'
]) {
  vm.runInContext(read(rel), ctx, { filename: rel });
}

const items = ctx.window.TRIGGLE_CLASSES[9].items;
const ch6 = ctx.window.TRIGGLE_CURRICULUM.grades.find(g => g.grade === 9).chapters.find(c => c.number === 6);
const fidelity = JSON.parse(read('data/textbook-fidelity/g9-ch6-ex6-5-q5-q6.json'));

assert.equal(fidelity.items.length, 2);

for (const fid of fidelity.items) {
  const item = items.find(x => x.id === fid.id);
  assert.ok(item, 'Missing item ' + fid.id);
  assert.equal(item.exercise, '6.5');
  assert.equal(item.q.en, fid.textbookPrompt.en);
  assert.equal(item.q.ta, fid.textbookPrompt.ta);
  assert.equal(item.answer, fid.verifiedAnswer);
  assert.equal(item.answerTa, fid.verifiedAnswer);
  assert.ok(Array.isArray(item.steps) && item.steps.length === 3);
  assert.ok(item.steps.every(s => s.en && s.ta && s.math && s.math.latex));
  assert.ok(item.questionMath && item.answerMath);
  assert.ok(ch6.textbookQuestionIds.includes(fid.id), 'Not registered in ch6.textbookQuestionIds: ' + fid.id);
  assert.ok(ctx.window.TriggleDifficulty.get(item), 'Missing difficulty for ' + fid.id);
}

const html = read('index.html');
assert.ok(html.includes('g9-ch6-ex6-5-q5-q6.js'), 'site/index.html must load g9-ch6-ex6-5-q5-q6.js');

console.log('PASS: Grade 9 Exercise 6.5 Q5 & Q6 source fidelity, bilingual steps, KaTeX, difficulty and registration verified.');
