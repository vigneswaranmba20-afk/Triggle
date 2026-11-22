'use strict';
const assert = require('node:assert/strict');
const crypto = require('node:crypto');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const cp = require('node:child_process');

const repoRoot = path.resolve(__dirname, '../..');
const siteRoot = path.join(repoRoot, 'site');
const readSite = rel => fs.readFileSync(path.join(siteRoot, rel), 'utf8');

// 1. Load bundled KaTeX & TriggleNotation cleanly
const katex = require('../assets/vendor/katex/katex.min.js');
const notationCtx = { window: { katex } };
vm.runInNewContext(readSite('assets/math-notation.js'), notationCtx);
const render = notationCtx.window.TriggleNotation.render;

// 2. Load full runtime data scripts as index.html loads them
const html = readSite('index.html');
const ctx = { window: {}, console };
vm.createContext(ctx);
for (const m of html.matchAll(/<script(?: defer)? src="\.\/(data\/[^?"]+)[^"]*"/g)) {
  vm.runInNewContext(readSite(m[1]), ctx, { filename: m[1] });
}

const g10Items = ctx.window.TRIGGLE_CLASSES[10].items;
const byId = new Map(g10Items.map(it => [it.id, it]));
const overlay = ctx.window.TriggleG10Ch2FractionMath;
assert.ok(overlay, 'TriggleG10Ch2FractionMath overlay must be loaded');

const expectedStepIds = [
  'c10-2-ex2-6-q7', 'c10-2-ex2-7-q3', 'c10-2-ex2-7-q4', 'c10-2-ex2-8-q4',
  'c10-2-ex2-5-q1-ii', 'c10-2-ex2-5-q1-iv', 'c10-2-ex2-7-q1-i', 'c10-2-ex2-7-q1-ii',
  'c10-2-ex2-7-q1-iii', 'c10-2-ex2-7-q1-iv', 'c10-2-ex2-7-q1-vi'
];
const expectedAnswerIds = [
  'c10-2-ex2-4-q1', 'c10-2-ex2-4-q4-i', 'c10-2-ex2-4-q5', 'c10-2-ex2-5-q1-iv',
  'c10-2-ex2-5-q2-iii', 'c10-2-ex2-7-q1-iii', 'c10-2-ex2-7-q1-iv', 'c10-2-ex2-8-q4',
  'c10-2-ex2-8-q5'
];
assert.deepEqual(Array.from(overlay.stepIds), expectedStepIds);
assert.deepEqual(Array.from(overlay.answerIds), expectedAnswerIds);

const ch2Records = g10Items.filter(it => String(it.chapter) === '2');
const ch2HashBefore = crypto.createHash('sha256').update(JSON.stringify(ch2Records)).digest('hex');

let stepCount = 0;
let answerCount = 0;
let stackedFractionNodes = 0;

for (const id of expectedStepIds) {
  const rec = byId.get(id);
  assert.ok(rec, `Missing Grade 10 Ch 2 record for step overlay: ${id}`);
  for (let i = 0; i < rec.steps.length; i++) {
    const spec = overlay.getStep(rec, i);
    if (!spec) continue;
    assert.equal(spec.fallback, rec.steps[i].eq, `Exact eq fallback altered for ${id} step ${i}`);
    assert.equal(spec.display, true);
    assert.ok(spec.latex.includes('\\dfrac'), `Expected \\dfrac in ${id} step ${i}`);
    katex.renderToString(spec.latex, { throwOnError: true, strict: 'error', displayMode: true, output: 'htmlAndMathml' });
    const rendered = render(spec);
    assert.ok(!rendered.includes('data-math-error'), `KaTeX render failed for ${id} step ${i}`);
    assert.ok(rendered.includes('<mfrac>'), `Expected MathML <mfrac> in ${id} step ${i}`);
    stackedFractionNodes += (rendered.match(/<mfrac>/g) || []).length;
    stepCount++;
  }
}
assert.equal(stepCount, 21, 'Expected 21 fractional step overlays');

for (const id of expectedAnswerIds) {
  const rec = byId.get(id);
  assert.ok(rec, `Missing Grade 10 Ch 2 record for answer overlay: ${id}`);
  const spec = overlay.getAnswer(rec);
  assert.ok(spec, `Missing answer overlay for ${id}`);
  assert.equal(spec.fallback, rec.answer, `Exact answer fallback altered for ${id}`);
  assert.equal(spec.display, true);
  assert.ok(spec.latex.includes('\\dfrac'), `Expected \\dfrac in ${id} answer`);
  katex.renderToString(spec.latex, { throwOnError: true, strict: 'error', displayMode: true, output: 'htmlAndMathml' });
  const rendered = render(spec);
  assert.ok(!rendered.includes('data-math-error'), `KaTeX answer render failed for ${id}`);
  assert.ok(rendered.includes('<mfrac>'), `Expected MathML <mfrac> in ${id} answer`);
  stackedFractionNodes += (rendered.match(/<mfrac>/g) || []).length;
  answerCount++;
}
assert.equal(answerCount, 9, 'Expected 9 fractional answer overlays');
assert.ok(stackedFractionNodes >= 30, 'Expected >= 30 rendered stacked fractions');

const ch2HashAfter = crypto.createHash('sha256').update(JSON.stringify(ch2Records)).digest('hex');
assert.equal(ch2HashAfter, ch2HashBefore, 'Source Chapter 2 records must remain byte-for-byte unmutated');

// Boundary guard: overlay ignores non-Class-10 or non-Ch-2 records
assert.equal(overlay.getStep({ id: 'c10-2-ex2-7-q3', classNum: 9, chapter: '2', steps: [{ eq: 'a=1/3' }] }, 0), null);
assert.equal(overlay.getAnswer({ id: 'c10-2-ex2-8-q5', classNum: 10, chapter: '3', answer: '1/4' }), null);

// 3. Offline cache, script order, and AF01-07 geometry guard tests
const sw = readSite('service-worker.js');
const overlayRel = 'data/math-layout/g10-ch2-fractions-20261120.js';
assert.ok(html.includes(overlayRel), 'index.html must include g10-ch2-fractions overlay');
assert.ok(html.indexOf(overlayRel) < html.indexOf('assets/app.js'), 'Overlay must load before app.js');
assert.ok(sw.includes('./' + overlayRel), 'service-worker.js must precache g10-ch2-fractions overlay');

const appJs = readSite('assets/app.js');
assert.ok(/if\(!s\.math&&!isGeometryExercise\(current\)\)[\s\S]{0,120}TriggleG10RemainingMath\?\.getStep/.test(appJs), 'getStep must guard geometry exercises');
assert.ok(appJs.includes('!isGeometryExercise(current)&&window.TriggleG10RemainingMath?.getAnswer'), 'getAnswer must guard geometry exercises (AF01-07)');
assert.ok(appJs.includes('!isGeometryExercise(current)&&window.TriggleG10RemainingMath?.getQuestion'), 'getQuestion must guard geometry exercises (AF01-07)');
for (const geomId of ['c10-4-ex4-1-q1-i', 'c10-4-ex4-1-q1-ii', 'c10-4-ex4-1-q2']) {
  const geomRec = byId.get(geomId);
  assert.ok(geomRec && String(geomRec.chapter) === '4', `Expected Chapter 4 geometry record: ${geomId}`);
}

// 4. CSS, HTML a11y, mobile touch targets, and Tamil localization parity
const appCss = readSite('assets/app.css');
assert.match(appCss, /@media\(max-width:430px\)[\s\S]*?\.lang-switch button\{[^}]*min-width:\s*28px[^}]*min-height:\s*34px/, 'AF01-02 language switch min target missing');

const livingCss = readSite('assets/living-concepts.css');
assert.match(livingCss, /\.chapter-hub \.rnlab-pitfall summary\{[^}]*min-height:\s*45px/, 'AF01-03 pitfall summary min height missing');

const bondCss = readSite('assets/bond-light.css');
assert.match(bondCss, /\.page-status,\s*\.crumb-link span,\s*\.hub-section-arrow\s*\{\s*color:\s*var\(--bond-muted\)\s*;\s*\}/, 'AF01-04 muted WCAG AA override missing');

assert.equal((html.match(/<span class="gold" aria-hidden="true">\.<\/span>/g) || []).length, 2, 'AF01-09 brand dots must be aria-hidden');
assert.doesNotMatch(html, /<span class="gold">\.<\/span>/, 'No exposed decorative .gold span allowed');

const ch5Concepts = readSite('assets/g10-ch5-concepts.js');
assert.ok(!ch5Concepts.includes('உதாரணம் (2,4),(8,10) அளவில்'), 'AF01-06 stale Tamil reset chip string must be removed');
assert.ok(ch5Concepts.includes('மீட்டமை A(−4,−1), B(4,3)'), 'AF01-06 Tamil reset label must match A(-4,-1), B(4,3)');
assert.ok(ch5Concepts.includes("'3-4-5 செங்கோண கட்டம்'"), 'AF01-06 Tamil grid chip translation must be present');

// 5. Run audit_af01.cjs --check to guarantee continuous pipeline & zero Grade 10 plain slash fractions
cp.execFileSync(process.execPath, [path.join(__dirname, 'audit_af01.cjs'), '--check'], { cwd: repoRoot, stdio: 'inherit' });

console.log(`PASS AF-01 remediations: ${stepCount} steps + ${answerCount} answers (${stackedFractionNodes} stacked fractions, SHA-256 preserved), geometry guards, WCAG targets/contrast, Tamil Ch 5 parity, and audit_af01 --check.`);
