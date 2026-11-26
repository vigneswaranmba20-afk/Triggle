'use strict';

const assert = require('node:assert/strict');
const {chromium} = require('playwright');
const {server, launchOptions} = require('./dashboard_test_support.cjs');

const id = number => 'c10-1-1-5-q' + number;

async function verify(page, number, language) {
  const work = await page.locator('#stepsList').innerText();
  if (number === 1) {
    assert.match(work, language === 'ta' ? /சார்பகங்களும் வேறுபடுகின்றன/ : /different domains/);
    const part = await page.locator('#stepsList .worked-step').nth(2).locator('math').all();
    assert.equal(part.length, 2);
  } else {
    assert.match(work, language === 'ta' ? /இயல் எண்களின் கணமாக/ : /special case/);
    const answer = page.locator('.final-answer-value');
    assert.match(await answer.innerText(), language === 'ta' ? /வீச்சகம்/ : /Range/);
    assert.equal(await answer.locator('math').count(), 3);
    const formula = (await answer.locator('annotation').allTextContents()).join(' ');
    assert(formula.includes('x\\in B:x^2\\in A') && formula.includes('x\\in D') && formula.includes('x\\in A'));
  }
  assert.equal(await page.locator('#lessonCard [data-math-error]').count(), 0);
  assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false);
}

(async () => {
  const live = process.env.TRIGGLE_LIVE_BASE;
  const local = live ? null : await server();
  const browser = await chromium.launch(launchOptions());
  try {
    await Promise.all((live ? [390] : [320, 360, 390, 412]).map(async width => {
      const context = await browser.newContext({
        viewport: {width, height: 844}, isMobile: true, hasTouch: true, ignoreHTTPSErrors: !!live
      });
      try {
        const page = await context.newPage();
        for (const number of [1, 5]) {
          const url = (live || local.base) + '/index.html?class=10&question=' + id(number);
          await page.goto(url);
          for (const [language, button] of [['en','#langEn'], ['ta','#langTa']]) {
            await page.locator(button).evaluate(element => element.click());
            await verify(page, number, language);
          }
        }
        await page.locator('#markDone').evaluate(button => button.click());
        await page.locator('#next').evaluate(button => button.click());
        assert.match(page.url(), /c10-1-1-5-q6$/);
        await page.locator('#previous').evaluate(button => button.click());
        assert.match(page.url(), /c10-1-1-5-q5$/);
        assert.equal(await page.locator('#markDone').getAttribute('aria-pressed'), 'true');
        if (!live && width === 390) {
          await page.evaluate(() => navigator.serviceWorker.ready);
          await page.waitForFunction(() => !!navigator.serviceWorker.controller);
          await context.setOffline(true);
          await page.reload();
          await verify(page, 5, 'ta');
          assert.equal(await page.locator('#markDone').getAttribute('aria-pressed'), 'true');
        }
        console.log(`Grade 10 Exercise 1.5 at ${width}px. Both languages, exact notation, boundaries and retained progress passed.`);
      } finally {
        await context.close();
      }
    }));
  } finally {
    await browser.close();
    await local?.close();
  }
})().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
