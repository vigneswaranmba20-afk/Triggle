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
  'data/class-10.js',
  'data/curriculum.js',
  'data/textbook-exercises/g10-ch7-ex7-1-q1-q5-en.js',
  'data/textbook-exercises/g10-ch7-ex7-1-q6-q10-en.js',
  'data/textbook-exercises/g10-ch7-ex7-1-ta.js'
]) {
  vm.runInContext(read(rel), ctx, { filename: rel });
}

const items = ctx.window.TRIGGLE_CLASSES[10].items.filter(x => x.id && x.id.startsWith('c10-7-ex7-1-q'));
assert.equal(items.length, 10);

for (const it of items) {
  assert.ok(it.q?.ta && /[\u0B80-\u0BFF]/.test(it.q.ta), 'Missing Tamil question for ' + it.id);
  assert.ok(it.title?.ta && /[\u0B80-\u0BFF]/.test(it.title.ta), 'Missing Tamil title for ' + it.id);
  assert.ok(it.answerTa && /[\u0B80-\u0BFF]/.test(it.answerTa), 'Missing Tamil answer for ' + it.id);
  assert.ok(Array.isArray(it.steps) && it.steps.length > 0);
  it.steps.forEach((s, idx) => {
    assert.ok(s.ta && /[\u0B80-\u0BFF]/.test(s.ta), `Missing Tamil step ${idx} for ${it.id}`);
  });
  assert.equal(it.translationReview, 'pending');
}

const html = read('index.html');
assert.ok(html.includes('g10-ch7-ex7-1-ta.js'), 'site/index.html must load g10-ch7-ex7-1-ta.js');

console.log('PASS: Grade 10 Exercise 7.1 Q1–Q10 bilingual Tamil questions, steps and answers verified.');
