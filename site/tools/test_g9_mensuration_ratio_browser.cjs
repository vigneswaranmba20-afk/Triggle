'use strict';

const assert = require('node:assert/strict');
const {chromium} = require('playwright');
const {server, launchOptions} = require('./dashboard_test_support.cjs');

const question = 'g9-ch7-ex7.4-q7';

async function checkRatio(page, language) {
  const final = await page.locator('.final-answer-value').innerText();
  assert.match(final, /4\s*:\s*9/);
  assert.match(final, /16\s*:\s*36/);
  assert.match(final, language === 'ta' ? /சமமான விகிதம்/ : /equivalent/);
  const reasons = await page.locator('.step-reason').allTextContents();
  assert(reasons.some(reason => reason.includes(language === 'ta' ? 'இரண்டுமே கணிதப்படி சரி' : 'both (2) and (4) are mathematically correct')));
  assert.equal(await page.locator('.triggle-mcq-btn').count(), 0, 'the printed options have no single-answer grading');
  assert.equal(await page.locator('[data-math-error]').count(), 0);
  assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false);
}

(async () => {
  const live = process.env.TRIGGLE_LIVE_BASE;
  const local = live ? null : await server();
  const browser = await chromium.launch(launchOptions());
  try {
    await Promise.all((live ? [390] : [320, 360, 390, 412]).map(async width => {
      const context = await browser.newContext({viewport: {width, height: 844}, isMobile: true, hasTouch: true});
      try {
        const page = await context.newPage();
        const url = (live || local.base) + '/index.html?class=9&question=' + question;
        await page.goto(url);
        await checkRatio(page, 'en');
        await page.locator('#langTa').evaluate(button => button.click());
        await checkRatio(page, 'ta');
        await page.locator('#markDone').evaluate(button => button.click());
        await page.locator('#previous').evaluate(button => button.click());
        assert.equal(new URL(page.url()).searchParams.get('question'), 'g9-ch7-ex7.4-q6');
        await page.locator('#next').evaluate(button => button.click());
        assert.equal(new URL(page.url()).searchParams.get('question'), question);
        assert.equal(await page.locator('#markDone').getAttribute('aria-pressed'), 'true');
        if (!live && width === 390) {
          await page.evaluate(() => navigator.serviceWorker.ready);
          await page.waitForFunction(() => !!navigator.serviceWorker.controller);
          await context.setOffline(true);
          await page.reload();
          await checkRatio(page, 'ta');
          assert.equal(await page.locator('#markDone').getAttribute('aria-pressed'), 'true');
        }
        console.log(`Grade 9 Exercise 7.4 Q7 at ${width}px. The two equivalent options, bilingual explanation, navigation and progress passed.`);
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
