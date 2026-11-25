'use strict';
const assert = require('node:assert/strict');
const {chromium} = require('playwright');
const {server, launchOptions} = require('./dashboard_test_support.cjs');

(async () => {
  const app = await server();
  const browser = await chromium.launch(launchOptions());
  try {
    const page = await browser.newPage({serviceWorkers: 'block'});
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    page.on('response', response => {
      if (response.status() >= 400) errors.push(response.status() + ' ' + response.url());
    });
    const chapter = app.base + '/index.html?class=10&chapter=g10-ch8';
    const concepts = chapter + '&section=concepts';
    for (const width of [320, 390, 412, 1024]) {
      await page.setViewportSize({width, height: 900});
      for (const language of ['en', 'ta']) {
        await page.goto(concepts);
        await page.locator(language === 'en' ? '#langEn' : '#langTa').click();
        const total = await page.locator('[data-nav] button').count();
        assert.equal(total, 15);
        const chosen = width === 390 ? Array.from({length: total}, (_, i) => i) : [0, 4, 7, 8, 9, 12, 14];
        for (const index of chosen) {
          await page.goto(concepts + '&concept=' + index);
          await page.locator('.g10ch8-lab select').first().waitFor();
          const rendered = await page.evaluate(i => {
            const stage = window.TRIGGLE_G10_CH8_PATH.stages[i];
            const panel = document.querySelector('.g10ch4-studio');
            return {
              title: document.querySelector('.sp2-concept-heading h4').textContent,
              expected: stage.title[document.documentElement.lang],
              math: panel.querySelectorAll('.katex-mathml math').length,
              fallbacks: panel.querySelectorAll('.math-fallback').length,
              correct: stage.correct,
              overflow: document.documentElement.scrollWidth > innerWidth + 1,
              links: panel.querySelectorAll('[data-g10ch4-connect] button').length,
              expectedLinks: [stage.practiceId, stage.secondaryPracticeId, stage.tertiaryPracticeId].filter(Boolean).length
            };
          }, index);
          assert.ok(rendered.title.includes(rendered.expected), 'Wrong localized concept title');
          assert.ok(rendered.math >= 3, 'Missing semantic mathematics for concept ' + index);
          assert.equal(rendered.fallbacks, 0);
          assert.equal(rendered.overflow, false, 'Page overflow for concept ' + index + ', ' + language + ', ' + width);
          assert.equal(rendered.links, rendered.expectedLinks);
          if (width === 390) {
            await page.locator('[data-choice="' + (rendered.correct === 0 ? 1 : 0) + '"]').click();
            assert.match(await page.locator('[data-feedback]').textContent(), language === 'ta' ? /மீண்டும்/ : /Try again/);
            await page.locator('[data-choice="' + rendered.correct + '"]').click();
            assert.match(await page.locator('[data-feedback]').textContent(), language === 'ta' ? /சரி!/ : /Correct!/);
            await page.locator('[data-why]').click();
            assert.ok(await page.locator('[data-why-response]').isVisible());
          }
        }
      }
    }
    await page.setViewportSize({width: 390, height: 844});
    await page.locator('#langEn').click();
    const select = n => page.locator('.g10ch8-lab select').nth(n);
    const result = () => page.locator('.g10ch8-result').textContent();
    await page.goto(concepts + '&concept=0');
    await select(0).selectOption('5');
    assert.match(await result(), /Mean: 9/);
    await page.goto(concepts + '&concept=1');
    await select(0).selectOption('8');
    assert.match(await result(), /Mean: 10.*Range: 16.*Variance: 26/);
    await page.goto(concepts + '&concept=4');
    await select(0).selectOption('-2');
    await select(1).selectOption('4');
    assert.match(await result(), /Mean: -6.*Variance: 20.*Standard deviation: 4\.47/);
    await page.goto(concepts + '&concept=7');
    assert.match(await result(), /32\.66%.*32\.66%/);
    await select(1).selectOption('4');
    assert.match(await result(), /32\.66%.*27\.22%/);
    await page.goto(concepts + '&concept=8');
    await select(0).selectOption('coins');
    assert.equal(await page.locator('.g10ch8-favourable').count(), 3);
    assert.match(await result(), /3 of 4.*0\.75/);
    await page.goto(concepts + '&concept=9');
    await select(0).selectOption('T');
    assert.match(await result(), /TH, TT/);
    assert.equal(await page.locator('.g10ch8-tree-active').count(), 3);
    await page.goto(concepts + '&concept=12');
    await select(0).selectOption('intersection');
    assert.match(await result(), /\{4, 6\}.*2\/6/);
    assert.equal(await page.locator('.g10ch8-region.is-selected').count(), 1);
    await select(0).selectOption('neither');
    assert.match(await result(), /\{1, 3\}.*2\/6/);
    await page.goto(concepts + '&concept=14');
    assert.match(await result(), /3 − 3 \+ 1 = 1/);
    await select(0).selectOption('2');
    assert.match(await result(), /2 − 1 \+ 0 = 1/);
    await page.locator('[data-g10ch4-connect] button').nth(1).click();
    await page.waitForURL(/question=c10-8-ex8-4-q12/);
    await page.locator('#chapter8QuestionConcept').click();
    await page.waitForURL(/section=concepts&concept=14/);
    await page.goBack();
    await page.waitForURL(/question=c10-8-ex8-4-q12/);
    assert.deepEqual(errors, []);
    console.log('PASS: 15 English and Tamil concept lessons, checked interactions, four viewport widths, feedback and exercise links.');
  } finally {
    await browser.close();
    await app.close();
  }
})().catch(error => { console.error(error); process.exitCode = 1; });
