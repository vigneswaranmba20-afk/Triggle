'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const site = path.resolve(__dirname, '../..');

const format = n => String(n).replace('-', '−');
const evaluate = (coefficients, x) => coefficients.reduce((sum, coefficient) => sum * x + coefficient, 0n);

function linearRoot(a, b) {
  const sign = a < 0n ? -1n : 1n;
  const numerator = -sign * b;
  const denominator = sign * a;
  const gcd = (x, y) => y === 0n ? x : gcd(y, x % y);
  const divisor = gcd(numerator < 0n ? -numerator : numerator, denominator);
  const fraction = [numerator / divisor, denominator / divisor];
  assert.equal(a * fraction[0] + b * fraction[1], 0n);
  return fraction;
}

function rootText([numerator, denominator]) {
  return format(numerator) + (denominator === 1n ? '' : '/' + denominator);
}

function horizontalIntersections(figure) {
  // Use the actual points in the shipped curve. Keep one hit when two
  // adjacent segments share a point on the horizontal axis.
  const svg = fs.readFileSync(path.join(site, figure), 'utf8');
  const axis = Number(svg.match(/<path d="M\d+ (\d+)H\d+" data-axis="horizontal"\/>/)[1]);
  const points = svg.match(/<polyline points="([^"]+)"/)[1].split(' ').map(pair => pair.split(',').map(Number));
  const hits = new Set();
  for (let i = 1; i < points.length; i++) {
    const [x0, y0] = points[i - 1];
    const [x1, y1] = points[i];
    assert.ok(y0 !== axis || y1 !== axis, 'A single curve segment cannot lie on the horizontal axis');
    if (y0 === axis) hits.add(x0);
    if (y1 === axis) hits.add(x1);
    if ((y0 - axis) * (y1 - axis) < 0) hits.add(x0 + (x1 - x0) * ((axis - y0) / (y1 - y0)));
  }
  return hits.size;
}

module.exports = ({records, mapping, inventory}, {hashRecord}) => {
  const byId = new Map(records.map(record => [record.id, record]));
  const map = new Map(mapping.map(row => [row.recordId, row]));
  const checks = [];
  const q = suffix => byId.get('g9-ch3-ex3.2-q' + suffix);
  const check = (suffix, expected, method) => {
    const record = q(suffix);
    assert.equal(record.answer, expected, record.id);
    checks.push({recordId: record.id, parts: map.get(record.id).parts, recordSha256: hashRecord(record), passed: true, method});
  };
  const [q1, q2, q3, q4, q5, q6] = inventory.exercises[0].questions;
  const appendix = question => [...question.answerKey.text.matchAll(/\([ivx]+\) (\S+)/g)].map(match => match[1]);

  const evaluations = [1n, -1n, 0n].map(input => evaluate([-3n, 6n, 3n], input));
  assert.deepEqual(evaluations.map(format), appendix(q1));
  for (const [index, suffix] of ['i', 'ii', 'iii'].entries()) {
    const input = [1n, -1n, 0n][index];
    check('1-' + suffix, 'f(' + format(input) + ') = ' + format(evaluations[index]), 'Exact integer polynomial evaluation');
  }

  // Arithmetic in Q(√2) using pairs [rational part, radical coefficient].
  const mul = ([a, b], [c, d]) => [a * c + 2n * b * d, a * d + b * c];
  const add = ([a, b], [c, d]) => [a + c, b + d];
  const input = [0n, 2n];
  const radicalResult = add(mul(add(input, [0n, -2n]), input), [1n, 0n]);
  assert.equal(radicalResult[1], 0n);
  assert.equal(String(radicalResult[0]), q2.answerKey.text);
  check('2', 'p(2√2) = ' + radicalResult[0], 'Exact arithmetic with rational and radical coefficients');

  const numericalRoots = [[1n, -3n], [2n, 5n], [2n, -3n], [8n, 0n]].map(pair => linearRoot(...pair));
  assert.deepEqual(numericalRoots.map(rootText), appendix(q3).slice(0, 4));
  for (const [index, variable] of ['x', 'x', 'y', 'z'].entries()) {
    check('3-' + ['i', 'ii', 'iii', 'iv'][index], variable + ' = ' + rootText(numericalRoots[index]), 'Reduced rational root checked by substitution');
  }

  // Multiplying a(-b/a) + b by the nonzero a gives -ab + ab.
  // The coefficient of ab is zero, independently of the values of a and b.
  const substitutionTerms = [-1n, 1n];
  assert.equal(substitutionTerms.reduce((sum, term) => sum + term, 0n), 0n);
  assert.deepEqual(appendix(q3).slice(4), ['0', '−b/a']);
  for (const a of [-7n, 2n, 11n]) {
    assert.equal(a * 0n, 0n);
    for (const b of [-5n, 0n, 3n]) assert.equal(a * -b + a * b, 0n);
  }
  check('3-v', 'x = 0', 'Nonzero a implies ax = 0 exactly when x = 0');
  check('3-vi', 'x = −b/a', 'Symbolic substitution with a nonzero, then cancellation of the two ab terms');

  const fourRoots = [[5n, -6n], [1n, 3n], [10n, 9n], [9n, -4n]].map(pair => linearRoot(...pair));
  assert.deepEqual(fourRoots.map(rootText), appendix(q4));
  const fourAnswer = fourRoots.map(([n, d], i) => {
    const number = n < 0n ? -n : n;
    const value = d === 1n ? format(n) : (n < 0n ? '−' : '') + '[[' + number + '|' + d + ']]';
    return '(' + ['i', 'ii', 'iii', 'iv'][i] + ') ' + value;
  }).join('; ');
  check('4', fourAnswer, 'Exact rational substitution in all four preserved equations');

  assert.equal(q5.answerKey, null, 'The printed appendix skips Q5');
  assert.equal(2n * 1n - 1n * 2n, 0n);
  check('5-i', 'Yes, 1/2 is a zero.', 'Clear the denominator after substitution');
  assert.equal(evaluate([1n, 0n, 0n, -1n], 1n), 0n);
  check('5-ii', 'Yes, 1 is a zero.', 'Exact evaluation of the cubic at 1');
  assert.match(q('5-iii').steps[0].eq, /^a ≠ 0$/);
  check('5-iii', 'Yes, −b/a is a zero when a ≠ 0.', 'Clear the nonzero denominator in the symbolic substitution');
  for (const x of [4n, -3n]) assert.equal(evaluate([1n, -1n, -12n], x), 0n);
  assert.match(q('5-iv').steps[0].eq, /^p\(4\)/);
  assert.match(q('5-iv').steps[1].eq, /^p\(−3\)/);
  check('5-iv', 'Yes, both 4 and −3 are zeros.', 'Expand the product independently and test both inputs');

  for (const [index, part] of q6.parts.entries()) {
    const record = q('6-' + part);
    const count = horizontalIntersections(record.figureSrc);
    assert.equal(String(count), appendix(q6)[index]);
    check('6-' + part, count + (count === 1 ? ' zero' : ' zeros'),
      'Count distinct meetings of the rendered curve and horizontal axis');
  }

  assert.equal(checks.length, records.length);
  return {checks};
};
