'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const {chromium} = require('playwright');
const {server, launchOptions} = require('./dashboard_test_support.cjs');

const modulePath = path.join(__dirname, '../data/textbook-tamil-formula-labels.js');
const sandbox = {window: {}};
vm.runInNewContext(fs.readFileSync(modulePath, 'utf8'), sandbox);
const {translate} = sandbox.window.TriggleTamilFormulaLabels;
const raw = String.raw;
const formulaExamples = [
  [raw`p(2)\ne0\implies\text{Not a multiple}`, 'p(2) ≠ 0 ⇒ Not a multiple', 'மடங்கல்ல'],
  [raw`S_n=\dfrac{4}{9}(0.9+0.99+\dots\text{ to }n\text{ terms})`, 'Sₙ = (4/9)(0.9 + 0.99 + … to n terms)', 'உறுப்புகள் வரை', 'n உறுப்புகள் வரை'],
  [raw`y=3\implies\text{Straight line parallel to }x\text{-axis}`, 'y = 3 ⇒ Straight line parallel to x-axis', 'அச்சுக்கு இணையான நேர்க்கோடு', 'x-அச்சுக்கு இணையான நேர்க்கோடு'],
  [raw`V_{\text{cone}}=\dfrac{\pi r^2h}{3}\text{ cm}^3`, 'V cone = πr²h/3 cm³', 'கூம்பு'],
];
const mathOnly = latex => latex.replace(/\\(?:text|textrm|mathrm|operatorname)\s*\{[^{}]*\}/g, '').replace(/\s+/g, '');
for (const [latex, fallback, expected, accessible = expected] of formulaExamples) {
  const original = Object.freeze({latex,fallback,display:true});
  const localized = translate(original);
  assert.equal(mathOnly(localized.latex), mathOnly(latex));
  assert(localized.latex.includes(expected));
  assert(localized.fallback.includes(accessible));
  assert.equal(localized.display, original.display);
  assert.equal(translate(localized), localized, 'already localized formulas keep their value');
}
const conventional = {latex:raw`\operatorname{cosec}\theta\cdot\text{ cm}\cdot\text{ (ii)}`, fallback:'cosec θ × cm × (ii)'};
assert.equal(translate(conventional), conventional);

const cases = [
  [9, 'g9-ch3-ex3.3-q1', 'Not a multiple', 'மடங்கல்ல'],
  [9, 'c9-exercise-6-1-q1', 'Hypotenuse', 'கர்ணம்'],
  [9, 'g9-ch5-ex5.1-q3', 'Straight line parallel to', 'அச்சுக்கு இணையான நேர்க்கோடு'],
  [10, 'c10-2-ex2-8-q6-i', 'terms', 'உறுப்புகள் வரை'],
  [10, 'c10-3-ex3-17-q1-i', 'rows', 'நிரைகள்'],
  [10, 'c10-7-ex7-3-q4', 'cone', 'கூம்பு'],
  [10, 'c10-8-ex8-3-q1', '1st coin:', 'முதல் சுண்டல்'],
];

const link = (base, grade, id) => `${base}/index.html?class=${grade}&question=${id}`;

async function inspect(page, id, language, expected) {
  await page.locator(language === 'en' ? '#langEn' : '#langTa').evaluate(button => button.click());
  const read = await page.evaluate(() => ({
    labels:[...document.querySelectorAll('#stepsList .step-equation annotation')]
      .map(annotation=>annotation.textContent).join(' '),
    fallback:[...document.querySelectorAll('#stepsList .step-equation .triggle-tex')]
      .map(formula=>formula.dataset.mathFallback).join(' '),
    errors:document.querySelectorAll('#lessonCard [data-math-error],#lessonCard .katex-error').length,
    overflow:document.documentElement.scrollWidth>innerWidth+1,
  }));
  assert(read.labels.includes(expected), id + ' ' + language + ' structured label');
  assert.equal(read.errors, 0, id);
  assert.equal(read.overflow, false, id);
  if (language === 'ta') assert.match(read.fallback, /\p{Script=Tamil}/u, id + ' accessible Tamil');
}

(async () => {
  const live = process.env.TRIGGLE_LIVE_BASE;
  const app = live ? null : await server();
  const base = live || app.base;
  const browser = await chromium.launch(launchOptions());
  try {
    await Promise.all((live ? [390] : [320,360,390,412]).map(async width => {
      const context = await browser.newContext({
        viewport:{width,height:844}, isMobile:true, hasTouch:true, ignoreHTTPSErrors:!!live,
      });
      try {
        const page = await context.newPage();
        for (const [grade,id,en,ta] of cases) {
          await page.goto(link(base,grade,id));
          await inspect(page,id,'en',en);
          await inspect(page,id,'ta',ta);
        }
        await page.goto(link(base,10,'c10-8-ex8-2-q2'));
        await page.locator('#langTa').evaluate(button=>button.click());
        const mean=page.locator('.final-answer-value .triggle-tex');
        assert.equal(await mean.getAttribute('data-math-fallback'),'சராசரி 75/16 = 4.6875.');
        if (!live && width === 390) {
          await page.waitForFunction(()=>!!navigator.serviceWorker.controller, {}, {timeout:60000});
          await context.setOffline(true);
          const [grade,id,,ta] = cases[0];
          await page.goto(link(base,grade,id));
          await inspect(page,id,'ta',ta);
        }
        console.log(`PASS bilingual mathematical labels and accessible answers at ${width} px.`);
      } finally {
        await context.close();
      }
    }));
  } finally {
    await browser.close();
    await app?.close();
  }
})().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
