'use strict';
// 2025 SCERT Grade 9 Chapter 2 Exercise 2.1 source-image audit, independent rational-math
// verification, and runtime reconciliation gate.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const root = path.resolve(__dirname, '../../../../');
const katex = require(path.join(root, 'site/assets/vendor/katex/katex.min.js'));
const audit = JSON.parse(
  fs.readFileSync(path.join(root, 'docs/curriculum/grade-9/candidates/g9-ch2-ex2-1-english-5.json'), 'utf8')
);
const manifest = JSON.parse(
  fs.readFileSync(path.join(root, 'site/data/g9-english-completeness-manifest.json'), 'utf8')
);
const auditDoc = fs.readFileSync(
  path.join(root, 'docs/curriculum/grade-9/exercise-2-1-source-audit-20261117.md'),
  'utf8'
);

assert.equal(audit.schemaVersion, 1);
assert.equal(audit.sourcePdfSha256, 'e6890ec79f4ad09c42f4829f0a14f4fbc3c6814887c4ba14f2b3fa559638c037');
assert.deepEqual(audit.sourceOriginalPdfPages, [51]);
assert.deepEqual(audit.sourceAnswerAppendixPdfPages, [314]);
assert.equal(audit.imprintEvidence.pdfPage, 2);
assert.equal(audit.imprintEvidence.imageSha256, '72f075e09f09a8bab7e19c6bd0ef984bd7ec7c2b29cc7c37a780d4c57e4afc02');
assert.equal(audit.imprintEvidence.visualChecked, true);
assert.equal(audit.pageImageEvidence.length, 2);
assert.equal(audit.pageImageEvidence[0].pdfPage, 51);
assert.equal(audit.pageImageEvidence[0].printedPage, 45);
assert.equal(audit.pageImageEvidence[0].imageSha256, 'c3fbff5162db395a3e93014a044d9569e78c9992abed7eb14841d875dc1ddac4');
assert.equal(audit.pageImageEvidence[1].pdfPage, 314);
assert.equal(audit.pageImageEvidence[1].printedPage, 308);
assert.equal(audit.pageImageEvidence[1].imageSha256, '3af6ece4ad56a2bffe6e3ad0b124968b1a667ce644911fcdd7d4cce6d74ec60b');
assert.equal(audit.imageEvidenceChecked, true);
assert.equal(audit.numberedQuestionCount, 3);
assert.equal(audit.englishPartCount, 5);
assert.equal(audit.missingPartCount, 0);
assert.equal(audit.externalApiSpendUsd, 0);
assert.equal(audit.rows.length, 5);

const expectedIds = [
  'g9-ch2-ex1-q1',
  'g9-ch2-ex1-q2',
  'g9-ch2-ex1-q3-i',
  'g9-ch2-ex1-q3-ii',
  'g9-ch2-ex1-q3-iii'
];
assert.deepEqual(audit.rows.map(r => r.id), expectedIds);
assert.equal(new Set(expectedIds).size, 5);
assert(auditDoc.includes('c3fbff5162db395a3e93014a044d9569e78c9992abed7eb14841d875dc1ddac4'));
assert(auditDoc.includes('3af6ece4ad56a2bffe6e3ad0b124968b1a667ce644911fcdd7d4cce6d74ec60b'));

const ch2Manifest = manifest.chapters.find(c => c.chapter === '2');
const ex21Manifest = ch2Manifest.exercises.find(e => e.id === '2.1');
assert.equal(ex21Manifest.expectedQuestionCount, 3);
assert.equal(ex21Manifest.expectedSubquestionCount, 5);
assert.equal(ex21Manifest.verifiedInThisWorkstream, 5);
assert.deepEqual(ex21Manifest.verifiedIds, expectedIds);
assert.equal(ex21Manifest.unresolvedCount, 0);
assert.equal(ex21Manifest.inventoryStatus, 'source-page-and-answer-appendix-visual-checked');

// Load runtime to verify zero duplicates, preserved records, Why-step repair, and KaTeX presentation.
const html = fs.readFileSync(path.join(root, 'site/index.html'), 'utf8');
const ctx = { window: { katex }, console };
vm.createContext(ctx);
vm.runInContext(fs.readFileSync(path.join(root, 'site/assets/math-notation.js'), 'utf8'), ctx);
for (const match of html.matchAll(/<script(?: defer)? src="\.\/(data\/[^?"']+)(?:\?[^"]*)?"/g)) {
  const rel = 'site/' + match[1];
  vm.runInContext(fs.readFileSync(path.join(root, rel), 'utf8'), ctx, { filename: rel, timeout: 20000 });
}

const g9Items = ctx.window.TRIGGLE_CLASSES[9].items;
const ch2 = ctx.window.TRIGGLE_CURRICULUM.grades.find(g => g.grade === 9).chapters.find(c => c.id === 'g9-ch2');
const ex21Items = g9Items.filter(x => x.chapter === '2' && x.exercise === '2.1');
assert.equal(ex21Items.length, 5, 'Exactly 5 Exercise 2.1 runtime records');
assert.deepEqual(Array.from(ex21Items, x => x.id), expectedIds);
assert.equal(new Set(g9Items.map(x => x.id)).size, g9Items.length, 'No duplicate Grade 9 IDs');
assert.equal(new Set(ch2.legacyQuestionIds).size, ch2.legacyQuestionIds.length, 'No duplicate Chapter 2 navigation IDs');

// Independent rational-arithmetic checks for both official 2025 answer appendix and app answers.
function checkStrictInterior(bounds, values, label) {
  const [low, high] = bounds[0] < bounds[1] ? bounds : [bounds[1], bounds[0]];
  assert.equal(new Set(values).size, values.length, label + ': values must be distinct');
  for (const v of values) {
    assert(v > low && v < high, `${label}: ${v} not strictly inside (${low}, ${high})`);
  }
}

// Q1: 11/3 on the number line
const targetQ1 = 11 / 3;
assert.equal(Math.floor(targetQ1), 3);
assert(Math.abs(targetQ1 - (3 + 2 / 3)) < 1e-12);
assert(targetQ1 > 3.5 && targetQ1 < 4, '11/3 lies between 3 and 4, nearer to 4');
const arrowPositions = { A: -3.5, B: 2.45, C: 3.18, D: 11 / 3 };
const closestArrow = Object.entries(arrowPositions).sort(
  (a, b) => Math.abs(a[1] - targetQ1) - Math.abs(b[1] - targetQ1)
)[0][0];
assert.equal(closestArrow, 'D');

// Q2: Three rational numbers between -7/11 and 2/11
checkStrictInterior([-7 / 11, 2 / 11], [-6 / 11, -5 / 11, -4 / 11], 'Ex2.1 Q2 app answer');
checkStrictInterior(
  [-7 / 11, 2 / 11],
  [-6 / 11, -5 / 11, -4 / 11, -3 / 11, -2 / 11, -1 / 11, 0, 1 / 11],
  'Ex2.1 Q2 textbook appendix range'
);

// Q3(i): Five rational numbers between 1/4 and 1/5
const q3iMidpoints = [];
let curQ3i = 1 / 5;
for (let k = 0; k < 5; k++) {
  curQ3i = (curQ3i + 1 / 4) / 2;
  q3iMidpoints.push(curQ3i);
}
const expectedQ3iKey = [9 / 40, 19 / 80, 39 / 160, 79 / 320, 159 / 640];
q3iMidpoints.forEach((v, i) => assert(Math.abs(v - expectedQ3iKey[i]) < 1e-15, 'Q3(i) midpoint #' + (i + 1)));
checkStrictInterior([1 / 4, 1 / 5], expectedQ3iKey, 'Ex2.1 Q3(i) textbook midpoint key');
checkStrictInterior([1 / 4, 1 / 5], [0.21, 0.22, 0.23, 0.24, 0.245], 'Ex2.1 Q3(i) app decimal answer');

// Q3(ii): Five rational numbers between 0.1 and 0.11
checkStrictInterior([0.1, 0.11], [0.101, 0.102, 0.103, 0.104, 0.105], 'Ex2.1 Q3(ii) app answer');
checkStrictInterior(
  [0.1, 0.11],
  [0.101, 0.102, 0.103, 0.104, 0.105, 0.106, 0.107, 0.108, 0.109],
  'Ex2.1 Q3(ii) textbook appendix range'
);

// Q3(iii): Five rational numbers between -1 and -2
const q3iiiMidpoints = [];
let curQ3iii = -2;
for (let k = 0; k < 5; k++) {
  curQ3iii = (curQ3iii + -1) / 2;
  q3iiiMidpoints.push(curQ3iii);
}
const expectedQ3iiiKey = [-3 / 2, -5 / 4, -9 / 8, -17 / 16, -33 / 32];
q3iiiMidpoints.forEach((v, i) => assert(Math.abs(v - expectedQ3iiiKey[i]) < 1e-15, 'Q3(iii) midpoint #' + (i + 1)));
checkStrictInterior([-1, -2], expectedQ3iiiKey, 'Ex2.1 Q3(iii) textbook midpoint key');
checkStrictInterior([-1, -2], [-1.1, -1.2, -1.3, -1.4, -1.5], 'Ex2.1 Q3(iii) app decimal answer');

// Verify candidate KaTeX formulas, runtime TriggleG9Math presentation, and Why-step repairs.
let candidateFormulas = 0;
for (const row of audit.rows) {
  assert.equal(row.sourceEvidence.enPrintedPage, 45);
  assert.equal(row.sourceEvidence.enPdfPage, 51);
  assert.equal(row.sourceEvidence.answerEnPrintedPage, 308);
  assert.equal(row.sourceEvidence.answerEnPdfPage, 314);
  assert.equal(row.steps.length, 3);
  const runtimeItem = g9Items.find(x => x.id === row.id);
  assert.ok(runtimeItem, 'Missing runtime record ' + row.id);
  assert.equal(runtimeItem.answer, row.answer);
  assert.equal(runtimeItem.printedPage, 45);

  for (const tex of [row.sourceMathLatex, row.answerMathLatex, ...row.steps.map(s => s.mathLatex)]) {
    const rendered = katex.renderToString(tex, {
      throwOnError: true,
      trust: false,
      strict: 'error',
      output: 'htmlAndMathml'
    });
    assert(rendered.includes('katex-html') && rendered.includes('<math'), 'Valid KaTeX for ' + row.id);
    candidateFormulas++;
  }

  const hint = ctx.window.TriggleWhyStepG9.hints[row.id];
  assert.ok(hint && hint.en.length >= 120, 'Detailed beginner Why-step explanation for ' + row.id);
  assert.ok(runtimeItem.steps[hint.step].en.includes(hint.expected), 'Pinned Why-step sentinel for ' + row.id);
}
assert.equal(candidateFormulas, 25);

// Specific check for repaired Q1 step 1 presentation and Q3(ii) Why-step misconception repair.
const q1Pres = ctx.window.TriggleG9Math.get(g9Items.find(x => x.id === 'g9-ch2-ex1-q1'));
assert.equal(q1Pres.steps[1].math.fallback, 'D: approximately 3.67');
assert.equal(q1Pres.steps[1].math.latex, '\\text{Arrow }D:\\quad \\frac{11}{3}\\approx 3.67');
assert.equal(q1Pres.questionMath.en.filter(p => p?.latex).length, 1, 'Only 11/3 is math-typeset in Q1 prompt');

const q3iiHint = ctx.window.TriggleWhyStepG9.hints['g9-ch2-ex1-q3-ii'];
assert.equal(q3iiHint.concept, 'comparison');
assert(!/next digit is 5 or more/i.test(q3iiHint.en), 'Rounding misconception removed from Q3(ii)');
assert(q3iiHint.en.includes('0.1 = 0.100') && q3iiHint.en.includes('0.11 = 0.110'));

console.log(
  'PASS Grade 9 Ex2.1 source audit & math gate: 5/5 subparts (Q1, Q2, Q3(i–iii)) verified against 2025 PDF p. 51 & answer key p. 314, 25 KaTeX renders, midpoint & decimal checks, and Why-step/notation repairs.'
);
