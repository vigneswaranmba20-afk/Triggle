'use strict';
const assert = require('node:assert/strict');
const {chromium} = require('playwright');
const {server, launchOptions} = require('./dashboard_test_support.cjs');
const {items} = require('../data/textbook-fidelity/g10-ch8-ex8-4.json');

(async () => {
  const app = await server();
  const browser = await chromium.launch(launchOptions());
  try {
    const errors = [];
    const page = await browser.newPage({serviceWorkers: 'block'});
    page.on('pageerror', error => errors.push(error.message));
    page.on('response', response => {
      if (response.status() >= 400) errors.push(response.status() + ' ' + response.url());
    });
    const open = id => page.goto(app.base + '/index.html?class=10&question=' + id);
    const compact = text => text.replace(/\s+/g, ' ').trim();
    for (const width of [320, 390, 412, 1024]) {
      await page.setViewportSize({width, height: 900});
      for (const language of ['en', 'ta']) {
        await open(items[0].id);
        await page.locator(language === 'ta' ? '#langTa' : '#langEn').click();
        const covered = width === 390 ? items : items.filter(row => /q(4|6|9|12)$/.test(row.id));
        for (const row of covered) {
          await open(row.id);
          await page.locator('#stepsList .worked-step').first().waitFor();
          const result = await page.evaluate(() => {
            const question = document.querySelector('#questionText').cloneNode(true);
            for (const formula of question.querySelectorAll('[data-math-fallback]')) {
              formula.replaceWith(document.createTextNode(formula.dataset.mathFallback));
            }
            return {
              question: question.textContent,
              mathCount: document.querySelectorAll('#stepsList .katex-mathml math').length,
              fallbacks: document.querySelectorAll('#questionText .math-fallback, #stepsList .math-fallback').length,
              overflow: document.documentElement.scrollWidth > window.innerWidth + 1,
              tamil: [...document.querySelectorAll('#stepsList .step-reason')].every(el => /\p{Script=Tamil}/u.test(el.textContent))
            };
          });
          const expected = compact(row.textbookPrompt[language]);
          assert.equal(compact(result.question), expected, row.id + ' source prompt ' + language);
          assert.ok(result.mathCount >= 2, row.id + ' KaTeX');
          assert.equal(result.fallbacks, 0, row.id + ' fallback');
          assert.equal(result.overflow, false, row.id + ' overflow at ' + width);
          if (language === 'ta') assert.equal(result.tamil, true, row.id + ' Tamil steps');
        }
      }
    }
    await open('c10-8-ex8-4-q6');
    await page.locator('#inlineFigureOpen').click();
    await page.locator('#figureDialog[open] img[src*="ex8-4-q6-dice-grid.svg"]').waitFor();
    await page.locator('#closeDiagram').click();
    await page.locator('#next').click();
    await page.waitForURL(/question=c10-8-ex8-4-q7/);
    await page.locator('#previous').click();
    await page.waitForURL(/question=c10-8-ex8-4-q6/);
    assert.deepEqual(errors, []);
    console.log('PASS: Exercise 8.4 exact English and Tamil prompts, KaTeX, figure, navigation and responsive widths.');
  } finally {
    await browser.close();
    await app.close();
  }
})().catch(error => { console.error(error); process.exitCode = 1; });
