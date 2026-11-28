'use strict';
/**
 * Adversarial regression tests for multiple valid trigonometric solutions
 * and unstated domain restrictions in Grade 9 Trigonometry.
 */
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
  'data/textbook-exercises/g9-ch6-frontier-2025.js',
  'data/textbook-exercises/g9-ch6-ex6-5-q5-q6.js'
]) {
  vm.runInContext(read(rel), ctx, { filename: rel });
}

const items = ctx.window.TRIGGLE_CLASSES[9].items;

// 1. Adversarial check: 2 sin 2θ = √3 has two solutions in [0°, 90°]: θ = 30° and θ = 60°.
const degToRad = d => (d * Math.PI) / 180;
const lhs = theta => 2 * Math.sin(2 * degToRad(theta));
const rhs = Math.sqrt(3);
const validAnglesIn0To90 = [0, 30, 45, 60, 90].filter(t => Math.abs(lhs(t) - rhs) < 1e-12);
assert.deepEqual(validAnglesIn0To90, [30, 60], 'Both 30° and 60° satisfy 2 sin 2θ = √3 in [0°, 90°]');

// Verify c9-exercise-6-5-q5 does not silently ignore θ = 60° and explicitly states 0° < 2θ < 90°.
const q5 = items.find(x => x.id === 'c9-exercise-6-5-q5');
assert.ok(q5, 'Missing c9-exercise-6-5-q5');
assert.ok(q5.q.en.includes('(2) 30°') && q5.q.en.includes('(4) 60°'), 'Textbook options preserved');
assert.ok(q5.steps.some(s => s.en.includes('0° < 2θ < 90°') && s.en.includes('60°')), 'EN working must state acute-angle restriction and note 60°');
assert.ok(q5.steps.some(s => s.ta.includes('0° < 2θ < 90°') && s.ta.includes('60°')), 'TA working must state acute-angle restriction and note 60°');
assert.ok(q5.answer.includes('30°') && q5.answer.includes('60°'), 'Answer must note both textbook acute-angle root and unrestricted root');

// 2. Adversarial check: c9-exercise-6-1-q6 (b sin θ = a cos θ) must retain its positive-length domain caveat.
const q6 = items.find(x => x.id === 'c9-exercise-6-1-q6');
assert.ok(q6, 'Missing c9-exercise-6-1-q6');
assert.ok(q6.steps.some(s => s.en.includes('positive lengths') && s.eq.includes('≠')), 'Ch6 Ex6.1 Q6 must retain signed-length counterexample');

// 3. Negative control: an unannotated claim that θ = 30° is the ONLY solution over [0°, 90°] must fail.
assert.notEqual(validAnglesIn0To90.length, 1, 'Unrestricted [0°, 90°] domain must not yield a unique root');

console.log('PASS: Adversarial trigonometric multiple-solution and unstated-domain-restriction tests verified.');
