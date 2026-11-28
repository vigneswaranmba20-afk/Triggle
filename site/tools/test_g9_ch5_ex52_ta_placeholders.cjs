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
  'data/textbook-exercises/g9-ch5-ex5-2-en.js',
  'data/textbook-exercises/g9-ch5-ex5-2.js',
  'data/textbook-exercises/g9-ch5-ex5-2-ta.js'
]) {
  vm.runInContext(read(rel), ctx, { filename: rel });
}

const ids = [
  'g9-ch5-ex5.2-q2', 'g9-ch5-ex5.2-q3', 'g9-ch5-ex5.2-q5', 'g9-ch5-ex5.2-q6',
  'g9-ch5-ex5.2-q7', 'g9-ch5-ex5.2-q8', 'g9-ch5-ex5.2-q9', 'g9-ch5-ex5.2-q11'
];

for (const id of ids) {
  const item = ctx.window.TRIGGLE_CLASSES[9].items.find(x => x.id === id);
  assert.ok(item, 'Missing item ' + id);
  assert.ok(/[\u0B80-\u0BFF]/.test(item.q?.ta || ''), 'Missing Tamil script in q.ta: ' + id);
  assert.ok(!/English-language question|Tamil version not changed/i.test(item.q?.ta || ''), 'Placeholder q.ta remains: ' + id);
  assert.ok(typeof item.answerTa === 'string' && item.answerTa.trim().length > 0, 'Missing answerTa: ' + id);
  assert.ok(Array.isArray(item.steps) && item.steps.length > 0);
  item.steps.forEach((s, i) => {
    assert.ok(/[\u0B80-\u0BFF]/.test(s.ta || ''), `Missing Tamil script in step ${i}: ${id}`);
    assert.ok(!/English explanation \(Tamil unchanged\)/i.test(s.ta || ''), `Placeholder step ${i} remains: ${id}`);
  });
}

assert.ok(read('index.html').includes('g9-ch5-ex5-2-ta.js'));
console.log('PASS: 8 Grade 9 Exercise 5.2 Tamil placeholders replaced with 2025 Tamil textbook questions, aligned steps and answers.');
