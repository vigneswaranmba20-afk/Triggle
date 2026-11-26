'use strict';
const assert = require('node:assert/strict');
const path = require('node:path');
const { chromium } = require(path.resolve('node_modules/playwright'));
const { server, launchOptions } = require(path.resolve('site/tools/dashboard_test_support.cjs'));

// Verify both signs and a nonzero sine using angles outside the acute quadrant.
const close = (actual, expected) => assert(Math.abs(actual - expected) < 1e-12);
for (const degrees of [30, 120, 180, 300]) {
  const angle = degrees * Math.PI / 180;
  const s = Math.sin(angle), c = Math.cos(angle);
  const first = Math.sqrt((1 + s) / (1 - s));
  const second = Math.sqrt((1 - s) / (1 + s));
  close(first, (1 + s) / Math.abs(c));
  close(first + second, 2 / Math.abs(c));
  if (c < 0) {
    assert(first > 0 && (1 + s) / c < 0);
    assert(first + second > 0 && 2 / c < 0);
  }
}

(async () => {
  const local = await server();
  let browser;
  try {
    browser = await chromium.launch(launchOptions());
    for (const width of [320, 390, 412]) {
      const page = await browser.newPage({ viewport: { width, height: 850 }, isMobile: true, hasTouch: true });
      try {
        await page.addInitScript(() => window.addEventListener('triggle:lessonchange', event => {
          window.auditLesson = event.detail;
        }));
        for (const part of ['i', 'ii']) {
          const id = 'c10-6-ex6-1-q3-' + part;
          await page.goto(local.base + '/index.html?class=10&question=' + id);
          await page.waitForFunction(id => window.auditLesson?.item?.id === id, id);
          for (const [lang, selector] of [['en', '#langEn'], ['ta', '#langTa']]) {
            await page.locator(selector).evaluate(button => button.click());
            assert.equal(await page.evaluate(() => window.auditLesson.lang), lang);
            assert.equal(await page.locator('#answerText [data-math-error], #stepsList [data-math-error]').count(), 0);
            const math = (await page.locator('#answerText annotation').allTextContents()).join(' ');
            assert.match(math, /\\cos\\theta>0/);
            const work = (await page.locator('#stepsList annotation').allTextContents()).join(' ');
            assert.match(work, /\|\\cos\\theta\|/);
            assert(await page.locator('#stepsList details[class*="why-step"]').count());
            assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1));
          }
        }
      } finally {
        await page.close();
      }
    }
    console.log('PASS Grade 10 6.1 Q3(i–ii), bilingual domain and absolute-value rendering at 320/390/412 px.');
  } finally {
    await browser?.close();
    await local.close();
  }
})().catch(error => { console.error(error); process.exitCode = 1; });
