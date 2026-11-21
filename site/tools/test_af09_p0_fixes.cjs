'use strict';
/* Regression checks for Mission AF-09 Batch 2 P0/P1 notation, MathML font, Probability union, and G10 Ch1 KaTeX prose fixes. */
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const katex = require('../assets/vendor/katex/katex.min.js');

const siteRoot = path.resolve(__dirname, '..');
const readSite = rel => fs.readFileSync(path.join(siteRoot, rel), 'utf8');

// 1. AUD03-01: Nested-parenthesis radicals must not leak stash tokens or break aria-label attributes
const sandbox = { window: { katex } };
vm.runInNewContext(readSite('assets/math-notation.js'), sandbox);
const render = sandbox.window.TriggleNotation.render;

for (const sample of [
  'Taking the square root gives |α − β| = √((α + β)² − 4αβ).',
  '√(q(x))² = |q(x)|',
  '(∛64)²',
  '√((1 + sin θ)/(1 − sin θ))'
]) {
  const html = render(sample);
  assert.ok(!/[\uE000\uE001]/.test(html), `Stashed token leaked in: ${sample}`);
  assert.ok(!/\bN\d+\b/.test(html), `Placeholder identifier leaked in: ${sample}`);
  assert.ok(!html.includes(')">\uE000'), `Broken attribute quote in: ${sample}`);
}
const quadHtml = render('Taking the square root gives |α − β| = √((α + β)² − 4αβ).');
assert.match(quadHtml, /<msqrt><mrow><mo>\(<\/mo><mi>α<\/mi><mo>\+<\/mo><mi>β<\/mi><msup><mo>\)<\/mo><mn>2<\/mn><\/msup>/);

// 2. AUD03-02 & AUD07-03: MathML <mi>/<mn> bypass Plane-1 math-auto tofu via offline KaTeX fonts
const appCss = readSite('assets/app.css');
assert.match(appCss, /\.triggle-math\s+mi\{[^}]*text-transform:\s*none[^}]*KaTeX_Math/s);
assert.match(appCss, /\.triggle-math\s+mn\{[^}]*KaTeX_Main/s);

// 3. AUD02-01: Grade 9 indexed roots (ⁿ√a) and compact exponent fractions without \mathrm{m} unit coercion
const g9ClearMathSrc = readSite('data/g9-clear-math.js');
const g9Sandbox = { window: {} };
vm.runInNewContext(g9ClearMathSrc, g9Sandbox);
const g9Math = g9Sandbox.window.TriggleG9Math;
const lawEntry = g9Math.text('a^(m/n)=(ⁿ√a)^m; a^(−k)=[[1|aᵏ]] for a≠0.');
assert.ok(Array.isArray(lawEntry) && lawEntry[0] && typeof lawEntry[0].latex === 'string', 'Expected compiled entry for a^(m/n)');
assert.equal(lawEntry[0].latex, 'a^{\\frac{m}{n}} = \\left(\\sqrt[n]{a}\\right)^{m};\\quad a^{- k} = \\dfrac{1}{a^{k}}');
assert.ok(!lawEntry[0].latex.includes('\\mathrm{m}'), 'Exponent/root variable m must not become metre unit');
const q81 = g9Math.text('What is 81^(1/4)?');
assert.equal(q81[1].latex, '81^{\\frac{1}{4}}');
const surdAdd = g9Math.text('a√m+b√m=(a+b)√m.');
assert.equal(surdAdd[0].latex, 'a\\,\\sqrt{m} + b\\,\\sqrt{m} = \\left(a + b\\right)\\,\\sqrt{m}');

// 4. AUD06-02: Grade 9 Probability eventTypes widget explicitly contrasts P(A or B) for disjoint vs overlapping events
const probUi = readSite('assets/g9-probability-concepts.js');
assert.match(probUi, /P\(A\\text\{ or \}B\)/);
assert.ok(probUi.includes('Ticket 4 matches both'));
assert.ok(probUi.includes('Shared outcome'));
assert.ok(probUi.includes('Since they do not overlap'));

// 5. AUD07-04: G10 Ch1 KaTeX layout formulas wrap multi-word English prose and units cleanly
const ch1MathSrc = readSite('data/math-layout/g10-ch1-chatgpt-20261113.js');
const lines = ch1MathSrc.split('\n').slice(0, 1500);
const proseLeak = [];
for (let i = 0; i < lines.length; i++) {
  const s = lines[i].trim();
  if (!s.startsWith('"') || s.startsWith('"steps"') || s.startsWith('"answer"') || s.startsWith('"c10-')) continue;
  let val;
  try { val = JSON.parse(s.replace(/,$/, '')); } catch { continue; }
  if (typeof val !== 'string') continue;
  const stripped = val.replace(/\\(?:text|mathrm|operatorname|begin|end)\{[^}]*\}/g, ' ').replace(/\\[a-zA-Z]+/g, ' ');
  const bad = (stripped.match(/\b[a-zA-Z]{2,}\b/g) || []).filter(w =>
    !['ab', 'ac', 'bc', 'bd', 'fg', 'gf', 'vt', 'mx', 'aC', 'bC', 'mn', 'xy', 'ii', 'iii', 'iv'].includes(w)
  );
  if (bad.length) proseLeak.push({ line: i + 1, words: bad });
}
assert.deepEqual(proseLeak, [], `Found unescaped English prose/units in g10-ch1 KaTeX layout: ${JSON.stringify(proseLeak)}`);

console.log('PASS AF-09 P0/P1 fixes: AUD03-01, AUD03-02, AUD07-03, AUD02-01, AUD06-02, and AUD07-04.');
