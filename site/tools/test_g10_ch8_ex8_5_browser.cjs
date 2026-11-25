'use strict';
const assert = require('node:assert/strict');
const {chromium} = require('playwright');
const {server, launchOptions} = require('./dashboard_test_support.cjs');
const {items} = require('../data/textbook-fidelity/g10-ch8-ex8-5.json');

(async () => {
  const app = await server();
  const browser = await chromium.launch(launchOptions());
  try {
    const page = await browser.newPage({serviceWorkers: 'block'});
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    const open = id => page.goto(app.base + '/index.html?class=10&question=' + id);
    for (const width of [320, 390, 412]) {
      await page.setViewportSize({width, height: 900});
      for (const lang of ['en', 'ta']) {
        await open(items[0].id);
        await page.locator(lang === 'ta' ? '#langTa' : '#langEn').click();
        const subset = width === 390 ? items : items.filter(x => /q(7|9|10|13|15)$/.test(x.id));
        for (const row of subset) {
          await open(row.id);
          const buttons = page.locator('.triggle-mcq-btn');
          await buttons.first().waitFor();
          const actual = await page.evaluate(() => {
            const prompt = document.querySelector('#questionText').cloneNode(true);
            for (const formula of prompt.querySelectorAll('[data-math-fallback]')) {
              formula.replaceWith(document.createTextNode(formula.dataset.mathFallback));
            }
            const choices = [...prompt.querySelectorAll('.triggle-mcq-btn')].map(button => button.textContent);
            prompt.querySelector('.triggle-mcq-choices').remove();
            prompt.querySelector('.triggle-mcq-feedback').remove();
            return {
              prompt: prompt.textContent,
              choices,
              correct: window.TRIGGLE_CLASSES[10].items.find(row => row.id === new URLSearchParams(location.search).get('question')).correctIndex,
              typeset: document.querySelector('#stepsList .katex-mathml math') !== null,
              mathFallbacks: document.querySelectorAll('#questionText .math-fallback, #stepsList .math-fallback').length,
              overflow: document.documentElement.scrollWidth > innerWidth + 1
            };
          });
          assert.equal(actual.prompt, row.textbookPrompt[lang], row.id + ' prompt ' + lang);
          assert.deepEqual(actual.choices, row.textbookChoices[lang], row.id + ' choices ' + lang);
          assert.equal(actual.typeset, true, row.id + ' KaTeX');
          assert.equal(actual.mathFallbacks, 0, row.id + ' fallbacks');
          assert.equal(actual.overflow, false, row.id + ' viewport ' + width);
          if (width === 390) {
            await buttons.nth((actual.correct + 1) % 4).click();
            assert.match(await page.locator('.triggle-mcq-feedback').textContent(), lang === 'ta' ? /மீண்டும் முயற்சிக்கவும்/ : /Try again/);
            await buttons.nth(actual.correct).click();
            assert.match(await page.locator('.triggle-mcq-feedback').textContent(), lang === 'ta' ? /சரியான விடை/ : /Correct!/);
          }
        }
      }
    }
    await open('c10-8-ex8-5-q10');
    await page.locator('#next').click();
    await page.waitForURL(/question=c10-8-ex8-5-q12/);
    await page.locator('#previous').click();
    await page.waitForURL(/question=c10-8-ex8-5-q10/);
    assert.deepEqual(errors, []);
    console.log('PASS: Exercise 8.5 exact bilingual prompts and choices, feedback, KaTeX, mobile widths and navigation.');
  } finally {
    await browser.close();
    await app.close();
  }
})().catch(error => { console.error(error); process.exitCode = 1; });
