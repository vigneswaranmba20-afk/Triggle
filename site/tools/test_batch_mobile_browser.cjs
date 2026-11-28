'use strict';
const assert = require('node:assert/strict');
const { chromium } = require('playwright');
const { server, launchOptions } = require('./dashboard_test_support.cjs');

const cases = [
  { grade: 9, id: 'c9-exercise-6-5-q5', lang: 'en', expectText: 'acute' },
  { grade: 9, id: 'c9-exercise-6-5-q5', lang: 'ta', expectText: 'குறுங்கோண' },
  { grade: 9, id: 'c9-exercise-6-5-q6', lang: 'en', expectText: 'complementary-angle' },
  { grade: 9, id: 'c9-exercise-6-5-q6', lang: 'ta', expectText: 'நிரப்புக்கோண' },
  { grade: 9, id: 'g9-ch5-ex5.2-q2', lang: 'ta', expectTamil: true },
  { grade: 9, id: 'g9-ch5-ex5.2-q8', lang: 'ta', expectTamil: true },
  { grade: 10, id: 'c10-7-ex7-1-q1', lang: 'ta', expectTamil: true },
  { grade: 10, id: 'c10-7-ex7-1-q10', lang: 'ta', expectTamil: true }
];

(async () => {
  const app = await server();
  let browser;
  try {
    browser = await chromium.launch(launchOptions());
    for (const width of [320, 390, 412]) {
      const context = await browser.newContext({
        viewport: { width, height: 820 },
        isMobile: true,
        hasTouch: true,
        serviceWorkers: 'block',
        reducedMotion: 'reduce'
      });
      const page = await context.newPage();
      const pageErrors = [];
      const missingAssets = [];
      page.on('pageerror', e => pageErrors.push(e.message));
      page.on('response', r => {
        if (r.status() >= 400 && !r.url().endsWith('/favicon.ico')) {
          missingAssets.push(`${r.status()} ${r.url()}`);
        }
      });

      for (const c of cases) {
        await page.goto(`${app.base}/index.html?class=${c.grade}&question=${c.id}&lang=${c.lang}`, { waitUntil: 'load' });
        await page.locator('#lessonCard:not([hidden])').waitFor({ timeout: 7000 });
        await page.locator('#stepsList .katex').first().waitFor({ state: 'visible', timeout: 7000 });
        await page.evaluate(() => document.fonts.ready);

        const state = await page.evaluate(() => {
          const lesson = document.querySelector('#lessonCard');
          return {
            question: (document.querySelector('#questionText')?.innerText || '').trim(),
            stepsText: (document.querySelector('#stepsList')?.innerText || '').trim(),
            answer: (document.querySelector('#answerText')?.innerText || '').trim(),
            katexCount: lesson?.querySelectorAll('#stepsList .katex').length || 0,
            errors: lesson?.querySelectorAll('.katex-error,[data-math-error]').length || 0,
            viewportW: window.innerWidth,
            documentW: document.documentElement.scrollWidth
          };
        });

        assert.ok(state.question.length > 15, `${c.id} (${c.lang}) ${width}px: empty question`);
        assert.ok(state.answer.length > 2, `${c.id} (${c.lang}) ${width}px: empty answer`);
        assert.ok(state.katexCount >= 1, `${c.id} (${c.lang}) ${width}px: missing KaTeX`);
        assert.equal(state.errors, 0, `${c.id} (${c.lang}) ${width}px: KaTeX error`);
        assert.ok(state.documentW <= state.viewportW + 1, `${c.id} (${c.lang}) ${width}px: horizontal overflow ${state.documentW} > ${state.viewportW}`);

        const combined = `${state.question}\n${state.stepsText}\n${state.answer}`;
        if (c.expectText) {
          assert.ok(combined.includes(c.expectText), `${c.id} (${c.lang}) ${width}px: missing expected text "${c.expectText}"`);
        }
        if (c.expectTamil) {
          assert.ok(/[\u0B80-\u0BFF]/.test(state.question), `${c.id} ${width}px: missing Tamil script in rendered question`);
          assert.ok(/[\u0B80-\u0BFF]/.test(state.stepsText), `${c.id} ${width}px: missing Tamil script in rendered steps`);
          assert.ok(!/English-language question|Tamil version not changed|English explanation \(Tamil unchanged\)/i.test(combined), `${c.id} ${width}px: placeholder leaked to UI`);
        }
      }

      assert.deepEqual(pageErrors, [], `${width}px page errors`);
      assert.deepEqual(missingAssets, [], `${width}px missing assets`);
      await context.close();
    }
    console.log('PASS: Mobile browser regression checks (320/390/412px, EN+TA, KaTeX, zero overflow/errors) for G9 Ex6.5 Q5-Q6, G9 Ex5.2 Tamil, and G10 Ex7.1 Tamil.');
  } finally {
    await browser?.close();
    await app.close();
  }
})();
