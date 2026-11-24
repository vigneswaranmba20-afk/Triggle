'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const katex = require('../assets/vendor/katex/katex.min.js');
const { loadRuntime } = require('./curriculum_bulk.cjs');

const ctx = { window: {} };
vm.runInNewContext(fs.readFileSync('site/data/audit-p0-supplements.js', 'utf8'), ctx);
const sup = ctx.window.TriggleP0Supplements;
assert.ok(sup && Array.isArray(sup.ids) && sup.ids.length === 21, 'Expected 21 P0 supplement entries');

const rt = loadRuntime();
const allIds = new Set([
  ...rt.classes[9].items.map(i => i.id),
  ...rt.classes[10].items.map(i => i.id),
]);

for (const id of sup.ids) {
  assert.ok(allIds.has(id), `Supplement target ${id} missing from runtime`);
  const entry = sup.get(id);
  assert.ok(entry.title?.en && entry.title?.ta, `Bilingual title required on ${id}`);
  if (entry.note) {
    assert.ok(entry.note.en && entry.note.ta, `Bilingual note required on ${id}`);
  }
  if (entry.table) {
    assert.ok(Array.isArray(entry.table.headers) && entry.table.headers.length >= 2);
    assert.ok(Array.isArray(entry.table.rows) && entry.table.rows.length >= 1);
    const {headers, headersTa, rows, rowsTa, footer, footerTa} = entry.table;
    assert.equal(headersTa.length, headers.length, id + ' Tamil column headers');
    assert.match(headersTa.join(' '), /[\u0B80-\u0BFF]/u, id + ' translated headers');
    if (rowsTa) assert.equal(rowsTa.length, rows.length, id + ' translated rows');
    for (const row of [...rows, ...(rowsTa || [])]) assert.equal(row.length, headers.length, id + ' table width');
    if (footer) {
      assert.equal(footer.length, headers.length, id + ' totals');
      assert.equal(footerTa.length, headers.length, id + ' Tamil totals');
      assert.match(footerTa.join(' '), /[\u0B80-\u0BFF]/u, id + ' translated totals');
    }
  }
  for (const tex of [entry.latex, entry.latexTa].filter(Boolean)) {
    const html = katex.renderToString(tex, { displayMode: true, throwOnError: true, strict: 'error' });
    assert.ok(html.includes('katex'), `KaTeX render failed for ${id}`);
  }
}

// TN 2025 Ex 8.1: EN printed pp. 313–314, TA p. 323; keys EN p. 342, TA p. 357.
// Recompute the population standard deviation directly from the textbook observations,
// independently of the step-deviation method the student sees.
const distributions = [
  {q:10, x:[45,50,55,60,65,70], f:[5,13,4,9,5,4], assumed:55, width:5, answer:'7.76'},
  {q:11, x:[5,15,25,35,45,55,65], f:[3,5,16,18,12,7,4], assumed:35, width:10, answer:'14.6'},
  {q:12, x:[22.5,26.5,30.5,34.5,38.5,42.5], f:[15,18,20,16,8,7], assumed:30.5, width:4, answer:'6'},
  {q:13, x:[9,10,11,12,13], f:[6,8,17,10,9], assumed:11, width:1, answer:'1.24'}
];
const numeric = text => Number(String(text).replace(/−/g, '-'));
for (const {q,x,f,assumed,width,answer} of distributions) {
  const {table,latex} = sup.get('c10-8-ex8-1-q' + q);
  const n = f.reduce((sum, freq) => sum + freq, 0);
  const mean = x.reduce((sum, value, i) => sum + value*f[i], 0) / n;
  const variance = x.reduce((sum, value, i) => sum + (value-mean)**2*f[i], 0) / n;
  const decimals = answer.split('.')[1]?.length || 0;
  assert.equal(Math.sqrt(variance).toFixed(decimals), answer, 'Q' + q + ' printed precision');
  assert(latex.endsWith('\\approx ' + answer + '\\end{aligned}'), 'Q' + q + ' displayed final result');
  assert.equal(table.rows.length, x.length, 'Q' + q + ' complete source table');
  let fdTotal = 0, fdSquaredTotal = 0;
  table.rows.forEach((row, i) => {
    const d = (x[i] - assumed)/width;
    const expected = [x[i], f[i], d, f[i]*d, f[i]*d*d];
    assert.deepEqual(Array.from(row.slice(-5), numeric), expected, 'Q' + q + ' row ' + (i+1));
    fdTotal += expected[3];
    fdSquaredTotal += expected[4];
  });
  assert(Math.abs(width**2*(fdSquaredTotal/n-(fdTotal/n)**2)-variance)<1e-10, 'Q' + q + ' method agreement');
  for (const footer of [table.footer, table.footerTa]) {
    assert.deepEqual(Array.from(footer.slice(-4), String), [String(n),'—',String(fdTotal),String(fdSquaredTotal)]);
  }
}


// AUD15: original distributions from the two 2025 Grade 9 textbooks. Check the
// printed columns separately from the extra midpoint, product and total columns.
{
  const sourceColumns = [
    ['8.1-q4', 0, '1 2 3 4 5 6', 1, '145 148 142 141 139 140'],
    ['8.1-q5', 0, '10 15 20 25 30', 1, '6 8 p 10 6'],
    ['8.1-q6', 0, '15–25 25–35 35–45 45–55 55–65 65–75', 2, '4 11 19 14 0 2'],
    ['8.1-q7', 0, '0–10 10–20 20–30 30–40 40–50', 2, '5 7 15 28 8'],
    ['8.1-q8', 0, '15–19 20–24 25–29 30–34 35–39 40–44', 3, '4 20 38 24 10 9'],
    ['8.2-q5', 0, '0–10 10–20 20–30 30–40 40–50 50–60', 1, '2 7 15 10 11 5'],
    ['8.3-q4', 0, '38 39 40 41 42 43 44 45', 1, '36 15 37 13 26 8 6 2'],
    ['8.3-q5', 0, '0–10 10–20 20–30 30–40 40–50', 1, '22 38 46 34 20'],
    ['8.3-q6', 0, '25–34 35–44 45–54 55–64 65–74 75–84', 2, '4 8 10 14 8 6']
  ];
  const get = id => sup.get('g9-ch8-ex' + id);
  const rows = id => get(id).table.rows;
  const sum = values => values.reduce((a, b) => a + b, 0);
  const number = cell => Number(cell.replace('−', '-'));
  const column = (id, index) => Array.from(rows(id), row => number(row[index]));
  const bounds = range => range.split('–').map(Number);
  for (const [id, category, labels, frequency, counts] of sourceColumns) {
    const {table} = get(id);
    assert.deepEqual(Array.from(table.rows, row => row[category]), labels.split(' '), id + ' textbook categories');
    assert.deepEqual(Array.from(table.rows, row => row[frequency]), counts.split(' '), id + ' textbook measurements/frequencies');
    assert.equal(table.headersTa.length, table.headers.length, id + ' Tamil headings');
    assert.ok(table.headersTa.some(cell => /\p{Script=Tamil}/u.test(cell)), id + ' Tamil table');
    if (table.footer) {
      assert.equal(table.footerTa.length, table.footer.length, id + ' Tamil totals');
      assert.deepEqual(Array.from(table.footerTa).slice(1), Array.from(table.footer).slice(1), id + ' matching totals');
    }
  }

  const volumes = column('8.1-q4', 1);
  assert.equal(number(get('8.1-q4').table.footer[1]), sum(volumes));
  assert.equal(sum(volumes) / volumes.length, 142.5);
  assert.match(get('8.1-q4').latex, /=142\.5\\,\\mathrm\{mm\}\^3$/);

  const marks = rows('8.1-q5');
  const known = marks.filter(([, count]) => count !== 'p');
  const knownCount = sum(known.map(row => number(row[1])));
  const knownMarks = sum(known.map(row => number(row[0]) * number(row[1])));
  const missingMark = number(marks.find(([, count]) => count === 'p')[0]);
  for (const [value, count, product] of marks) {
    assert.equal(product, count === 'p' ? value + 'p' : String(number(value) * number(count)));
  }
  const p = (202 * knownCount - 10 * knownMarks) / (10 * missingMark - 202);
  assert.equal(p, 20);
  assert.deepEqual(Array.from(get('8.1-q5').table.footer).slice(1), [knownCount + ' + p', knownMarks + ' + ' + missingMark + 'p']);
  assert.match(get('8.1-q5').latex, /p&=20\\end\{aligned\}$/);

  // Direct, assumed-mean, and step-deviation methods must all agree with
  // computing the weighted mean directly from the printed interval midpoints.
  for (const [id, midpoint, frequency, assumedMean, stepWidth, expected, result] of [
    ['8.1-q6', 1, 2, 0, 1, 40.2, /=40\.2\\,\\mathrm\{kg\}$/],
    ['8.1-q7', 1, 2, 25, 1, 205 / 7, /=\\dfrac\{205\}\{7\}\\approx29\.29$/],
    ['8.1-q8', 2, 3, 27, 5, 610 / 21, /=\\dfrac\{610\}\{21\}\\approx29\.05$/]
  ]) {
    let n = 0, weighted = 0, productSum = 0;
    for (const row of rows(id)) {
      const [lower, upper] = bounds(row[0]);
      const x = (lower + upper) / 2, f = number(row[frequency]);
      assert.equal(number(row[midpoint]), x, id + ' midpoint');
      const d = (x - assumedMean) / stepWidth;
      if (assumedMean) assert.equal(number(row.at(-2)), d, id + ' deviation');
      if (stepWidth === 5) assert.equal(row[1], (lower - 0.5) + '–' + (upper + 0.5), id + ' continuous boundaries');
      assert.equal(number(row.at(-1)), f * d, id + ' weighted product');
      n += f;
      weighted += f * x;
      productSum += f * d;
    }
    assert.equal(number(get(id).table.footer[frequency]), n);
    assert.equal(number(get(id).table.footer.at(-1)), productSum);
    assert.equal(weighted / n, expected, id + ' weighted mean');
    assert.match(get(id).latex, result, id + ' displayed mean');
  }

  let cumulative = 0;
  const medianRows = rows('8.2-q5');
  for (const row of medianRows) {
    cumulative += number(row[1]);
    assert.equal(number(row[2]), cumulative, '8.2 Q5 cumulative frequency');
  }
  assert.equal(number(get('8.2-q5').table.footer[1]), cumulative);
  const medianIndex = medianRows.findIndex(row => number(row[2]) >= cumulative / 2);
  const [lower, upper] = bounds(medianRows[medianIndex][0]);
  const m = number(medianRows[medianIndex - 1][2]);
  assert.equal(lower + (cumulative / 2 - m) / number(medianRows[medianIndex][1]) * (upper - lower), 31);
  assert.match(get('8.2-q5').latex, /N\/2-m\}\{f\}.*=31$/);

  const mostDemanded = rows('8.3-q4').reduce((a, b) => number(a[1]) > number(b[1]) ? a : b);
  assert.deepEqual(Array.from(mostDemanded), ['40', '37']);
  assert.match(get('8.3-q4').note.en, /size 40/);
  assert.match(get('8.3-q4').note.ta, /அளவு 40/);
  for (const [id, frequency, expected, result] of [
    ['8.3-q5', 1, 24, /=24$/], ['8.3-q6', 2, 58.5, /=58\.5\\,\\mathrm\{kg\}$/]
  ]) {
    const f = column(id, frequency), i = f.indexOf(Math.max(...f));
    const [l, u] = bounds(rows(id)[i][frequency - 1]);
    if (frequency === 2) {
      for (const [range, boundary] of rows(id)) {
        const [lo, hi] = bounds(range);
        assert.equal(boundary, (lo - 0.5) + '–' + (hi + 0.5), id + ' continuous boundaries');
      }
    }
    assert.equal(l + (u - l) * (f[i] - f[i - 1]) / (2 * f[i] - f[i - 1] - f[i + 1]), expected);
    assert.match(get(id).latex, /\\dfrac\{f-f_1\}\{2f-f_1-f_2\}/, id + ' textbook modal-frequency symbols');
    assert.match(get(id).latex, result, id + ' displayed mode');
  }
  console.log('PASS Grade 9 Statistics: nine printed distributions, derived columns, totals and solutions.');
}
function checkNumberSystem(sup) {
  const entry = suffix => sup.get('g9-ch2-' + suffix);
  const [positive, negative] = ['ex1-q3-i', 'ex1-q3-iii'].map(entry);

  // Compare a/b and c/d using only small exact integers.
  function compare([a, b], [c, d]) { return Math.sign(a * d - c * b); }
  function midpoint([a, b], [c, d]) { return [a * d + c * b, 2 * b * d]; }
  function readMidpoints(latex) {
    const pattern = /(-?)\\dfrac(?:\{(\d+)\}|(\d))(?:\{(\d+)\}|(\d))/g;
    return [...latex.matchAll(pattern)].map(([, sign, n1, n2, d1, d2]) =>
      [(sign ? -1 : 1) * Number(n1 || n2), Number(d1 || d2)]);
  }
  for (const [card, lower, upper] of [
    [positive, [1, 5], [1, 4]],
    [negative, [-2, 1], [-1, 1]]
  ]) {
    const fractions = readMidpoints(card.latex);
    assert.equal(fractions.length, 5, 'Five separate appendix midpoints');
    let previous = lower;
    for (const value of fractions) {
      assert.equal(compare(value, midpoint(previous, upper)), 0, 'Exact midpoint');
      assert.equal(compare(previous, value), -1, 'Strictly above earlier midpoint');
      assert.equal(compare(value, upper), -1, 'Strictly below upper bound');
      previous = value;
    }
  }

  const repeat = entry('ex9-q8');
  assert.match(repeat.latex, /0\.\\overline\{714285\}/);
  assert.equal(5 * 999999, 7 * 714285, '5/7 has this exact six-digit repeating block');
  for (const language of ['en', 'ta']) {
    const note = repeat.note[language];
    assert.match(note, /\(2\)/);
    assert.match(note, /\(4\)/);
    const [choice2, choice4] = note.split('(4)');
    assert.match(choice2, language === 'en' ? /repeat/i : /மீண்டும்/);
    assert.match(choice4, language === 'en' ? /end|terminat/i : /முடிகிறது/);
  }

  const addition = entry('ex9-q10');
  for (const numeric of ['34}{99', '31}{90', '681}{990', '0.6\\overline{87}']) {
    assert.ok(addition.latex.includes(numeric), 'Exact recurring sum ' + numeric);
  }
  assert.equal(34 * 10 + 31 * 11, 681, 'Common denominator 990');
  assert.equal(681, 6 * 99 + 87, 'The single 6 precedes the repeating 87');
  const product = entry('ex9-q18');
  assert.ok(product.latex.includes('a^m b^m&=(ab)^m'));
  assert.ok(product.latex.includes('\\dfrac{10^6}{3^6}'));
  assert.equal((6 + 2) * (-3) / 4, -6);
  for (const language of ['en', 'ta']) {
    assert.match(addition.note[language], /\(1\)/);
    assert.match(product.note[language], /\(4\)/);
  }

  // A finite prefix fixes the number inside [prefix, prefix + one last place].
  // Rebuild the growing runs from the appendix instead of accepting arbitrary
  // digits followed by an ellipsis as an irrational-number construction.
  function growingPrefix(lead, digit, length) {
    let value = lead;
    for (let n = 1; value.length < length; n++) {
      value += digit.repeat(n) + '1'.repeat(n);
    }
    return value.slice(0, length);
  }
  for (const [id, lead, digits, interval] of [
    ['ex3-q2-ii', '0.8', ['6', '7'], 'fractions'],
    ['ex3-q2-iii', '1.', ['5', '6'], 'roots']
  ]) {
    const card = entry(id);
    for (const digit of digits) {
      const start = lead + digit;
      const shown = [...card.latex.matchAll(/\d\.\d+(?=\\ldots)/g)]
        .map(match => match[0]).find(value => value.startsWith(start));
      assert.ok(shown && shown.length >= 10, 'Show the growing decimal ' + start);
      assert.equal(shown, growingPrefix(lead, digit, shown.length));
      const places = BigInt(shown.split('.')[1].length);
      const denominator = 10n ** places;
      const numerator = BigInt(shown.replace('.', ''));
      const upper = numerator + 1n;
      if (interval === 'fractions') {
        assert.ok(7n * numerator > 6n * denominator);
        assert.ok(13n * upper < 12n * denominator);
      } else {
        assert.ok(numerator ** 2n > 2n * denominator ** 2n);
        assert.ok(upper ** 2n < 3n * denominator ** 2n);
      }
    }
    assert.match(card.note.en, /increas|grow/i, 'Explain why the blocks never become periodic');
    assert.match(card.note.ta, /அதிகரிப்ப/, 'Explain the construction in Tamil');
  }

  const rational = entry('ex3-q3');
  assert.match(rational.note.en, /2\.2362.*2\.2363/);
  assert.match(rational.note.ta, /2\.2362.*2\.2363/);
  for (const n of [22362, 22363]) {
    assert.ok(rational.latex.includes('\\dfrac{' + n + '}{10000}'));
    // Lower endpoint begins 2.2360679… and upper endpoint 2.236505500….
    // Even their worst unseen tails cannot change either strict inequality.
    const scaled = BigInt(n);
    assert.ok(22360680n * 10000n < scaled * 10000000n);
    assert.ok(scaled * 1000000000n < 2236505500n * 10000n);
  }
}
checkNumberSystem(sup);
console.log('PASS 21 reviewed audit supplements: exact mathematics, bilingual tables and strict KaTeX.');
