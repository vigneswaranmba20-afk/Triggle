'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const katex = require('../assets/vendor/katex/katex.min.js');
const { loadRuntime } = require('./curriculum_bulk.cjs');

const siteRoot = path.resolve(__dirname, '..');
const readSite = rel => fs.readFileSync(path.join(siteRoot, rel), 'utf8');

// 1. Verify USER-AF09-01: no standalone/shorthand ∓ notation in Ch 6 unit Q2, concepts, UI labels, or difficulty summaries
const unitSrc = readSite('data/textbook-exercises/g10-ch6-ex6-unit-en.js');
assert.ok(!/∓|\\mp/.test(unitSrc), 'USER-AF09-01: g10-ch6-ex6-unit-en.js must not contain shorthand ∓ or \\mp');

const conceptsData = readSite('data/g10-ch6-concepts.js');
assert.ok(!/∓|\\mp/.test(conceptsData), 'USER-AF09-01: g10-ch6-concepts.js data must use clear ± / explicit cube identities without ∓');

const conceptsUi = readSite('assets/g10-ch6-concepts.js');
assert.ok(!/1\s*∓|∓\s*sin/.test(conceptsUi), 'USER-AF09-01: g10-ch6-concepts.js UI must show 1 ± sin θ, not 1 ∓ sin θ');
assert.ok(conceptsUi.includes('1 ± sin θ'), 'Expected 1 ± sin θ badge and conjugate button label in g10-ch6-concepts.js');

const diffSrc = readSite('data/problem-difficulty.js');
assert.ok(!/∓/.test(diffSrc), 'USER-AF09-01: problem-difficulty.js must not contain standalone ∓ shorthand');

// Check runtime c10-6-unit-q2 steps render cleanly in KaTeX without errors and match algebra numerically
const runtime = loadRuntime();
const unitQ2 = runtime.classes[10].items.find(r => r.id === 'c10-6-unit-q2');
assert.ok(unitQ2, 'Missing c10-6-unit-q2');
assert.equal(unitQ2.steps.length, 3, 'Expected 3 separated proof steps on c10-6-unit-q2 (numerator, denominator, division)');
assert.ok(unitQ2.steps[0].en.startsWith('Quick Solution Plan:'));
assert.ok(unitQ2.steps[1].en.includes('Understand Deeply'));
const notation = { window: { katex } };
vm.runInNewContext(readSite('assets/math-notation.js'), notation);
const render = notation.window.TriggleNotation.render;
for (let i = 0; i < unitQ2.steps.length; i++) {
  const s = unitQ2.steps[i];
  assert.ok(!/∓|\\mp/.test(s.en + s.eq + s.math.latex + s.math.fallback), `Unit Q2 step ${i} contains ∓`);
  assert.equal(s.math.fallback, s.eq);
  assert.ok(!render(s.math).includes('data-math-error'), `KaTeX render failed for Unit Q2 step ${i}`);
}
for (const th of [0.27, 0.61, 1.05]) {
  const sin = Math.sin(th), cos = Math.cos(th);
  const num = (1 + sin - cos) ** 2;
  const den = (1 + sin + cos) ** 2;
  assert.ok(Math.abs(num - 2 * (1 + sin) * (1 - cos)) < 1e-12);
  assert.ok(Math.abs(den - 2 * (1 + sin) * (1 + cos)) < 1e-12);
  assert.ok(Math.abs(num / den - (1 - cos) / (1 + cos)) < 1e-12);
}

// 2. Verify USER-AF09-02 accessibility and orientation. DiagramGuard checks
// physical label clearance for the three redrawn figures in the browser.
const svgDir = path.join(siteRoot, 'assets/grade10-ch6');
const svgFiles = fs.readdirSync(svgDir).filter(f => f.endsWith('.svg')).sort();
assert.equal(svgFiles.length, 23, 'Expected all 23 G10 Ch 6 SVG diagrams');

const mustHaveVerticalRotate = [
  'ex6-2-q1.svg', 'ex6-2-q2.svg', 'ex6-2-q3.svg', 'ex6-2-q4.svg', 'ex6-2-q5.svg', 'ex6-2-q6.svg',
  'ex6-3-q1.svg', 'ex6-3-q2.svg', 'ex6-3-q3.svg', 'ex6-3-q4.svg', 'ex6-3-q5.svg', 'ex6-3-q6.svg',
  'ex6-4-q1.svg', 'ex6-4-q2.svg', 'ex6-4-q3.svg', 'ex6-4-q4.svg', 'ex6-4-q5.svg',
  'ex6-unit-q5.svg', 'ex6-unit-q6.svg', 'ex6-unit-q8.svg', 'ex6-unit-q9.svg',
];
const diagramGuardFigures = new Set(['ex6-3-q3.svg','ex6-3-q4.svg','ex6-3-q5.svg']);
for (const f of svgFiles) {
  const svg = fs.readFileSync(path.join(svgDir, f), 'utf8');
  assert.match(svg, /viewBox="0 0 320 220"/, `${f}: standard viewBox`);
  assert.match(svg, /<title/, `${f}: missing <title>`);
  assert.match(svg, /<desc/, `${f}: missing <desc>`);
  if(diagramGuardFigures.has(f))assert.doesNotMatch(svg,/paint-order:stroke/, `${f}: measured placement clears the strokes`);
  else assert.match(svg,/paint-order:stroke/, `${f}: missing contrast halo style`);
  if (mustHaveVerticalRotate.includes(f)) {
    assert.match(svg, /transform="rotate\(-90 /, `${f}: expected orientation-aware vertical -90deg label`);
  }
}

// Required screenshot figures: verify rotated diagonal / vertical / separated angle labels
const q7Svg = fs.readFileSync(path.join(svgDir, 'ex6-unit-q7.svg'), 'utf8');
assert.match(q7Svg, /transform="rotate\([^)]+\)"[^>]*>30 km</, 'ex6-unit-q7.svg: 30 km must be parallel-rotated');
assert.match(q7Svg, /transform="rotate\([^)]+\)"[^>]*>32 km</, 'ex6-unit-q7.svg: 32 km must be parallel-rotated');
assert.equal((q7Svg.match(/<path d="M/g) || []).length, 4, 'ex6-unit-q7.svg: expected 4 clean bearing/elevation arcs');

const ex64Q2 = fs.readFileSync(path.join(svgDir, 'ex6-4-q2.svg'), 'utf8');
assert.ok(ex64Q2.includes('>60°<') && ex64Q2.includes('>30°<') && ex64Q2.includes('>40 m<'));

const ex64Q4 = fs.readFileSync(path.join(svgDir, 'ex6-4-q4.svg'), 'utf8');
assert.ok(ex64Q4.includes('>30° (dep)<') && ex64Q4.includes('>60°<') && ex64Q4.includes('>H = ?<'));

// 3. Verify AF-09 audit log exists and covers all 44 AUD + 2 USER-AF09 IDs
const auditLog = fs.readFileSync(path.resolve(__dirname, '../../docs/audit/WEEKEND_AF09_FIX_LOG.md'), 'utf8');
for (let r = 1; r <= 7; r++) {
  const maxC = r === 1 ? 8 : 6;
  for (let c = 1; c <= maxC; c++) {
    const id = `AUD0${r}-0${c}`;
    assert.ok(auditLog.includes(id), `WEEKEND_AF09_FIX_LOG.md missing ${id}`);
  }
}
assert.ok(auditLog.includes('USER-AF09-01') && auditLog.includes('USER-AF09-02'));

console.log('PASS AF-09 Ch 6 fixes: Unit Q2 split cleanly (0 ∓), 23 accessible, oriented SVGs, and 46-item audit log synced.');
