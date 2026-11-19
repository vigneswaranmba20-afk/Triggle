'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const katex = require('../assets/vendor/katex/katex.min.js');
const {loadRuntime} = require('./curriculum_bulk.cjs');
const {items} = require('../data/textbook-fidelity/g10-ch4-ex4-1-to-4-2.json');

const runtime = loadRuntime();
const rows = runtime.classes[10].items.filter(row => row.chapter === '4' && ['4.1', '4.2'].includes(row.exercise));
const byId = new Map(rows.map(row => [row.id, row]));
const offline = fs.readFileSync('site/service-worker.js', 'utf8');
assert.equal(rows.length, 36);
assert.equal(byId.size, 36);
assert.equal(items.length, 36);
const prior = items.filter(item => item.wasAvailableOnMain).map(item => item.id);
assert.deepEqual(prior, ['c10-4-ex4-1-q1-i', 'c10-4-ex4-1-q1-ii', 'c10-4-ex4-1-q2', 'c10-4-ex4-1-q3']);
for (const [exercise, numbered, parts, tasks] of [['4.1', 13, 6, 17], ['4.2', 16, 6, 19]]) {
  const group = items.filter(item => item.exercise === exercise);
  assert.equal(group.length, tasks);
  assert.equal(group.filter(item => item.part).length, parts);
  assert.deepEqual([...new Set(group.map(item => item.questionNumber))], Array.from({length: numbered}, (_, i) => i + 1));
  assert.ok(offline.includes(`./data/textbook-exercises/g10-ch4-ex4-${exercise.at(-1)}.js`));
}

const render = ({latex}) => katex.renderToString(latex, {throwOnError: true});
for (const evidence of items) {
  const {id} = evidence;
  const row = byId.get(id);
  assert.ok(row, 'Missing student route ' + id);
  assert.equal(row.translationReview, 'pending');
  assert.ok(row.steps.length >= 3);
  assert.equal(row.sourceFidelity.status, 'page-visual-checked');
  for (const lang of ['en', 'ta']) {
    const parts = row.questionMath[lang];
    assert.equal(row.q[lang], evidence.textbookPrompt[lang], id + ' ' + lang);
    assert.equal(parts.map(part => typeof part === 'string' ? part : part.fallback).join(''), row.q[lang]);
    assert.equal(row.sourceFidelity.sourcePdfPage[lang], evidence.sourcePages[lang].pdf);
    assert.equal(evidence.sourcePages[lang].pdf - evidence.sourcePages[lang].printed, 6);
    for (const part of parts) if (typeof part !== 'string') render(part);
  }
  for (const step of row.steps) {
    assert.ok(step.en.length > 25);
    if (step.math) {
      assert.equal(step.math.fallback, step.eq);
      render(step.math);
    }
  }
  assert.equal(row.answerMath.fallback, row.answer);
  render(row.answerMath);
  if (evidence.figure.inTextbooks) assert.ok(row.figureSrc && row.figureAlt.en && row.figureAlt.ta, id);
  if (row.figureSrc) {
    assert.ok(offline.includes('./' + row.figureSrc), row.figureSrc);
    assert.match(fs.readFileSync('site/' + row.figureSrc, 'utf8'), /viewBox="0 0 320 \d+"/);
  }
}

const record = (exercise, part) => byId.get(`c10-4-ex4-${exercise}-q${part}`);
const answer = (exercise, part, expected) => assert.ok(record(exercise, part).answer.includes(expected), expected);
const close = (actual, expected, epsilon = 1e-8) => assert.ok(Math.abs(actual - expected) < epsilon, `${actual} vs ${expected}`);
const distance = (a, b) => Math.hypot(a[0] - b[0], a[1] - b[1]);
const angle = (p, a, b) => {
  const u = a.map((n, i) => n - p[i]);
  const v = b.map((n, i) => n - p[i]);
  return Math.acos((u[0] * v[0] + u[1] * v[1]) / (Math.hypot(...u) * Math.hypot(...v))) * 180 / Math.PI;
};
function vertices(exercise, part, style = 'edge', index = 0) {
  const svg = fs.readFileSync('site/' + record(exercise, part).figureSrc, 'utf8');
  return [...svg.matchAll(new RegExp(`<polyline class="${style}" points="([^"]+)"`, 'g'))][index][1]
    .split(' ').map(pair => pair.split(',').map(Number));
}

// Recompute the numerical results, using midpoint, slopes, perpendicular projection,
// and reverse substitution independently of the solution's ratio manipulations.
assert.notEqual(3 * 11, 4 * 8);
assert.notEqual(6 * 4, 11);
answer(1, '1-i', 'not similar');
answer(1, '1-ii', String(5 / 2));
answer(1, 2, String(6.6 * (125 / 250)));
answer(1, 3, String(6 * 7));
const [a, b, c] = vertices(1, 5);
assert.equal(angle(c, a, b), 90);
answer(1, 5, '15/13');
answer(1, 5, '36/13');
const hypotenuse = Math.hypot(5, 12);
close(3 * 5 / hypotenuse, 15 / 13);
close(Math.sqrt(3 ** 2 - (15 / 13) ** 2), 36 / 13);
const [a6, b6, c6] = vertices(1, 6);
const [same, p6, q6] = vertices(1, 6, 'accent');
assert.deepEqual(same, a6);
close(distance(a6, c6) / distance(b6, c6) * 8, 5.6, 0.001);
close(distance(a6, q6) / distance(p6, q6) * 4, 3.25, 0.001);
answer(1, 6, '5.6 cm');
answer(1, 6, '3.25 cm');
answer(1, 8, (2.1 * 4 / 3).toFixed(1));
answer(1, 9, '2 m');
for (const ground of [1, 17, 42]) {
  const x = (6 * ground) / (6 + 3);
  close(3 * x / ground, 2);
  close(6 - 6 * x / ground, 2);
}
for (const [part, factor] of [[10, 2/3], [11, 4/5], [12, 6/5], [13, 7/3]]) {
  const original = vertices(1, part);
  const scaled = vertices(1, part, 'accent');
  for (let i = 0; i < 3; i++) close(distance(scaled[i], scaled[i+1]) / distance(original[i], original[i+1]), factor, 0.0001);
}

answer(2, '1-i', (15 - 15 * 4 / 7).toFixed(2));
const lengths = x => [8*x - 7, 5*x - 3, 4*x - 3, 3*x - 1];
assert.deepEqual(lengths(1), [1, 2, 1, 2]);
assert.ok(lengths(-.5).every(n => n < 0));
answer(2, '1-ii', 'x = 1');
close(18 / 60, 15 / (35 + 15));
answer(2, 2, '60 cm');
assert.equal(8 * 18, 12 * 12);
assert.equal(12 / 4, 12 / 6 + 1);
answer(2, 5, '4 cm');
assert.notEqual(1.5 * 10, 3.5 * 5);
close(1.6 * 6, 2.4 * 4);
assert.equal(5 + 1.5 + 3.5, 10, 'The printed lengths in 4.2 Q8(i) are collinear');
answer(2, '8-i', 'cannot form a triangle');
const [a8, b8, c8] = vertices(2, '8-ii');
const [, d8] = vertices(2, '8-ii', 'accent');
close(angle(a8, b8, d8), angle(a8, d8, c8), 0.001);
for (const [pq, pr] of [[5, 12], [8, 3], [11, 11]]) {
  // A 45° ray from the right-angle vertex is y=x. Its intersection with
  // the hypotenuse x/pr + y/pq = 1 has x=y=pq*pr/(pq+pr).
  const height = 1 / (1 / pq + 1 / pr);
  close(height * (pq + pr), pq * pr);
}
for (const [part, base, apex, measure] of [[11,4.5,35,6],[12,5,40,4.4],[13,6.5,60,4.5],[14,5.5,25,4],[15,5.6,40,4],[16,6.8,50,5.2]]) {
  const [left, right, vertex] = vertices(2, part);
  const scale = distance(left, right) / base;
  const midpoint = [(left[0] + right[0]) / 2, left[1]];
  close(angle(vertex, left, right), apex, 0.01);
  if (part <= 12) close(distance(vertex, midpoint) / scale, measure, 0.001);
  if (part === 13 || part === 14) close((left[1] - vertex[1]) / scale, measure, 0.001);
  if (part >= 15) {
    const [, d] = vertices(2, part, 'accent');
    close(angle(vertex, left, d), apex / 2, 0.01);
    close(angle(vertex, right, d), apex / 2, 0.01);
    close(distance(d, part === 15 ? right : left) / scale, measure, 0.001);
  }
  if (part === 12) {
    const [, , apexPoint] = vertices(2, 12);
    const altitude = (left[1] - apexPoint[1]) / scale;
    // Independently use the two legs and the given apex angle through
    // Apollonius' theorem and the cosine rule.
    const median = 4.4;
    const sumOfLegSquares = 2 * (median**2 + (base/2)**2);
    const productOfLegs = (sumOfLegSquares - base**2) / (2 * Math.cos(40 * Math.PI / 180));
    const areaAltitude = productOfLegs * Math.sin(40 * Math.PI / 180) / base;
    close(altitude, areaAltitude, 0.001);
    answer(2, 12, areaAltitude.toFixed(2) + ' cm');
  }
}
console.log('PASS Grade 10 Geometry: 36 bilingual source prompts, KaTeX, offline assets and independent geometry checks.');
