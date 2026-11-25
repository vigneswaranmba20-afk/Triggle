'use strict';
const assert = require('node:assert/strict');
const {chromium} = require('playwright');
const {server, launchOptions} = require('./dashboard_test_support.cjs');
const {items} = require('../data/textbook-fidelity/g10-ch8-unit.json');

(async () => {
  const app = await server();
  const browser = await chromium.launch(launchOptions());
  try {
    const page = await browser.newPage({serviceWorkers: 'block'});
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    const open = id => page.goto(app.base + '/index.html?class=10&question=' + id);
    const compact = text => text.replace(/\s+/g, ' ').trim();
    for (const width of [320, 390, 412]) {
      await page.setViewportSize({width, height: 900});
      for (const lang of ['en', 'ta']) {
        await open(items[0].id);
        await page.locator(lang === 'ta' ? '#langTa' : '#langEn').click();
        const subset = width === 390 ? items : items.filter(row => row.textbookTable || row.questionNumber === '5');
        for (const row of subset) {
          await open(row.id);
          await page.locator('#stepsList .worked-step').first().waitFor();
          const actual = await page.evaluate(() => {
            const table = document.querySelector('#questionText table');
            const cells = table ? [...table.rows].map(row => [...row.cells].map(cell =>
              (cell.querySelector('[data-math-fallback]')?.dataset.mathFallback ?? cell.textContent).trim())) : null;
            const question = document.querySelector('#questionText').cloneNode(true);
            question.querySelector('.triggle-table-wrap')?.replaceWith(document.createTextNode(' '));
            for (const formula of question.querySelectorAll('[data-math-fallback]')) {
              formula.replaceWith(document.createTextNode(formula.dataset.mathFallback));
            }
            return {
              table: cells,
              question: question.textContent,
              overflow: document.documentElement.scrollWidth > innerWidth + 1,
              typeset: document.querySelectorAll('#stepsList .katex-mathml math').length,
              fallbacks: document.querySelectorAll('#stepsList .math-fallback, #questionText .math-fallback').length
            };
          });
          assert.equal(compact(actual.question), compact(row.textbookPrompt[lang]), row.id + ' prompt ' + lang);
          const table = row.textbookTable?.[lang].map(line => line.map(String)) ?? null;
          assert.deepEqual(actual.table, table, row.id + ' original table ' + lang);
          assert.equal(actual.overflow, false, row.id + ' viewport ' + width);
          assert.ok(actual.typeset >= 2, row.id + ' KaTeX');
          assert.equal(actual.fallbacks, 0, row.id + ' fallback');
        }
      }
    }
    await open('c10-8-unit-q7');
    await page.locator('#next').click();
    await page.waitForURL(/question=c10-8-unit-q8/);
    await page.locator('#previous').click();
    await page.waitForURL(/question=c10-8-unit-q7/);
    assert.deepEqual(errors, []);
    console.log('PASS: Unit Exercise 8 bilingual wording, source tables, KaTeX, mobile widths and previous/next routes.');
  } finally {
    await browser.close();
    await app.close();
  }
})().catch(error => { console.error(error); process.exitCode = 1; });
