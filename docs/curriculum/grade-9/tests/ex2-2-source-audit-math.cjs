'use strict';
// 2025 SCERT Grade 9 Real Numbers Exercise 2.2 (printed pp.51-52, PDF pp.57-58,
// answer appendix printed p.308/PDF p.314).
// Verifies 16 source-pinned student records without modifying their locked solutions.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root = path.resolve(__dirname, '../../../../');
const read = (p) => fs.readFileSync(path.join(root, p), 'utf8');
const rows = [];
const win = { TriggleRealCh2: { addExercise(ex, n, part, data) {
  if (ex === 2) rows.push({ id: 'g9-ch2-ex2-q' + n + (part ? '-' + part : ''), n, part, ...data });
} } };
vm.runInNewContext(read('site/data/real-numbers/g9-ch2-exercises-a.js'), { window: win });
const ids = [
  'g9-ch2-ex2-q1-i', 'g9-ch2-ex2-q1-ii', 'g9-ch2-ex2-q1-iii', 'g9-ch2-ex2-q1-iv',
  'g9-ch2-ex2-q2', 'g9-ch2-ex2-q3',
  'g9-ch2-ex2-q4-i', 'g9-ch2-ex2-q4-ii', 'g9-ch2-ex2-q4-iii',
  'g9-ch2-ex2-q4-iv', 'g9-ch2-ex2-q4-v', 'g9-ch2-ex2-q4-vi',
  'g9-ch2-ex2-q5-i', 'g9-ch2-ex2-q5-ii', 'g9-ch2-ex2-q5-iii', 'g9-ch2-ex2-q5-iv'
];
assert.equal(rows.length, 16, '2025 source has 16 question-parts');
assert.deepEqual(rows.map(r => r.id), ids);
assert.equal(new Set(ids).size, 16);
const answers = [
  '0.(285714) — Recurring, period 6',
  '−5.(27) — Recurring, period 2',
  '7.(3) — Recurring, period 1',
  '1.635 — Terminating',
  '1/13=0.(076923), period 6',
  '1/33=0.(03); 71/33=2.(15)',
  '8/33','775/333','−1283/250','143/45','5681/330','−47731/2250',
  'Yes, terminating','Yes, terminating','No, recurring','No, recurring'
];
for (let i = 0; i < 16; i++) {
  assert.equal(rows[i].answer, answers[i], ids[i] + ': original answer must stay pinned');
  assert.equal(rows[i].page, i < 5 ? 51 : 52, ids[i] + ': source page mismatch');
  assert(Array.isArray(rows[i].steps) && rows[i].steps.length >= 2, ids[i] + ': teaching steps missing');
}
// Independent exact fraction verifier: use integer arithmetic, NEVER floating approximations.
function gcd(a, b) { a = a < 0n ? -a : a; b = b < 0n ? -b : b;
  while (b) [a, b] = [b, a % b]; return a;
}
function ratio(n, d) { n = BigInt(n); d = BigInt(d);
  assert(d !== 0n); if (d < 0n) { n = -n; d = -d; }
  const g = gcd(n, d); return [n / g, d / g].join('/');
}
// whole, finite prefix, recurring block, optional sign.
// The leading zero in e.g. 0.(076923) is preserved by repeat.length.
function repeat(whole, prefix, block, sign = 1) {
  const p = 10n ** BigInt(prefix.length), b = 10n ** BigInt(block.length) - 1n;
  const denominator = p * b;
  const numerator = BigInt(whole) * denominator + BigInt(prefix || '0') * b + BigInt(block);
  return ratio(sign * numerator, denominator);
}
function check(actual, n, d, name) { assert.equal(actual, ratio(n, d), name); }
// Q1: compare independently reconstructed decimal to the source rational number.
check(repeat(0, '', '285714'), 2, 7, '2/7');
check(repeat(5, '', '27', -1), -58, 11, '-5 3/11');
check(repeat(7, '', '3'), 22, 3, '22/3');
check(ratio(1635, 1000), 327, 200, '327/200');
check(repeat(0, '', '076923'), 1, 13, '1/13, leading zero and period six');
// Q3: using 1/11 and 1/33 to obtain 71/33.
check(repeat(0, '', '09'), 1, 11, '1/11');
check(repeat(0, '', '03'), 1, 33, '1/33');
check(repeat(2, '', '15'), 71, 33, '71/33');
// Q4: textbook bar placements; mixed recurring starts only after a finite prefix.
check(repeat(0, '', '24'), 8, 33, '0.(24)');
check(repeat(2, '', '327'), 775, 333, '2.(327)');
check(ratio(-5132, 1000), -1283, 250, 'terminating -5.132');
check(repeat(3, '1', '7'), 143, 45, '3.1(7)');
check(repeat(17, '2', '15'), 5681, 330, '17.2(15)');
check(repeat(21, '213', '7', -1), -47731, 2250, '-21.213(7)');
// The appendix's unreduced entries must agree with the simplified app forms.
check(ratio(24, 99), 8, 33, 'appendix Q4(i)');
check(ratio(2325, 999), 775, 333, 'appendix Q4(ii)');
check(ratio(-190924, 9000), -47731, 2250, 'appendix Q4(vi)');
// Q5: decide by REDUCED denominator factors only.
function terminates(n, d) {
  d = BigInt(d) / gcd(BigInt(n), BigInt(d));
  while (d % 2n === 0n) d /= 2n;
  while (d % 5n === 0n) d /= 5n;
  return d === 1n;
}
assert.equal(terminates(7, 128), true);
assert.equal(terminates(21, 15), true);
assert.equal(terminates(149, 35), false); // 4 9/35
assert.equal(terminates(219, 2200), false);
// Verify optional Why-step teaching content changed, while all original records remain.
const hintsWindow = {};
vm.runInNewContext(read('site/data/why-step-g9.js'), { window: hintsWindow });
const hints = hintsWindow.TriggleWhyStepG9.hints;
for (const id of ids) {
  assert(hints[id], 'missing Why-step for ' + id);
  assert.equal(typeof hints[id].en, 'string');
  assert(hints[id].en.length > 85, 'insufficient beginner explanation: ' + id);
}
for (const [id, terms] of Object.entries({
  'g9-ch2-ex2-q2': ['076923', 'six'],
  'g9-ch2-ex2-q4-i': ['BOTH', '100x'],
  'g9-ch2-ex2-q4-iii': ['NO recurring', 'terminating'],
  'g9-ch2-ex2-q4-iv': ['Only 7', '100x'],
  'g9-ch2-ex2-q4-v': ['NOT repeating', '1000x'],
  'g9-ch2-ex2-q4-vi': ['only the final 7', 'negative sign'],
  'g9-ch2-ex2-q5-ii': ['reduce', '7/5']
})) for (const term of terms) assert(hints[id].en.includes(term), id + ': missing ' + term);
const manifest = JSON.parse(read('site/data/g9-english-completeness-manifest.json'));
const ex = manifest.chapters.find(c => c.chapter === '2').exercises.find(e => e.id === '2.2');
assert.equal(ex.expectedQuestionCount, 5);
assert.equal(ex.expectedSubquestionCount, 16);
assert.equal(ex.verifiedInThisWorkstream, 16);
assert.equal(ex.unresolvedCount, 0);
assert.deepEqual(Array.from(ex.verifiedIds), ids);
const audit = read('docs/curriculum/grade-9/exercise-2-2-source-audit-20261117.md');
assert(audit.includes('e6890ec79f4ad09c42f4829f0a14f4fbc3c6814887c4ba14f2b3fa559638c037'));
assert(audit.includes('PDF pp. 57–58'));
assert(audit.includes('16 independently verified'));
console.log('PASS: SCERT 2025 G9 Ex2.2 all 16 source parts, exact arithmetic, 16 beginner Why-steps, pinned answers');
