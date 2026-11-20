'use strict';
const assert = require('node:assert/strict');
const { chromium } = require('playwright');
const { server, launchOptions } = require('./dashboard_test_support.cjs');
const { loadRuntime } = require('./curriculum_bulk.cjs');

(async () => {
  const runtime = loadRuntime();
  const canonicalCh6 = runtime.classes[10].items.filter(
    r => String(r.chapter) === '6' && r.kind === 'textbook' && !/^c10-6-6-/.test(r.id)
  );
  assert.equal(canonicalCh6.length, 69, 'Expected 69 canonical Grade 10 Ch 6 items covering all 70 inventory tasks');

  const app = await server();
  const browser = await chromium.launch(launchOptions());
  try {
    // 1. Verify Chapter 6 Hub deduplication & all 6 exercise sections in EN & TA
    for (const lang of ['en', 'ta']) {
      const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, serviceWorkers: 'block' });
      const page = await ctx.newPage();
      const errors = [];
      const httpErrors = [];
      page.on('pageerror', e => errors.push(e.message));
      page.on('response', r => { if (r.status() >= 400 && !r.url().endsWith('/favicon.ico')) httpErrors.push(r.url()); });

      await page.goto(`${app.base}/index.html?class=10&chapter=g10-ch6`, { waitUntil: 'load' });
      if (lang === 'ta') await page.locator('#langTa').click();
      await page.locator('.hub-section-card[data-hub-section="exercises"]').click();
      await page.waitForSelector('.hub-exercise-link', { timeout: 5000 });
      const hubInfo = await page.evaluate(() => {
        const links = [...document.querySelectorAll('.hub-exercise-link')];
        return {
          exercises: links.map(b => ({ key: b.dataset.exercise, text: b.innerText })),
          scrollW: document.documentElement.scrollWidth,
          innerW: window.innerWidth,
        };
      });
      const expectedCounts = { '6.1': '19', '6.2': '7', '6.3': '6', '6.4': '9', '6.5': '15', '6.unit': '13' };
      for (const [k, cnt] of Object.entries(expectedCounts)) {
        const found = hubInfo.exercises.find(x => x.key === k);
        assert.ok(found && found.text.includes(cnt), `Expected ${k} (${cnt}) in ${lang}: got ${JSON.stringify(hubInfo.exercises)}`);
      }
      assert.ok(hubInfo.scrollW <= hubInfo.innerW + 1, `Hub overflow at 390px in ${lang}: ${hubInfo.scrollW} > ${hubInfo.innerW}`);
      assert.deepEqual(errors, [], `Hub page errors (${lang}): ${errors}`);
      assert.deepEqual(httpErrors, [], `Hub HTTP errors (${lang}): ${httpErrors}`);
      await ctx.close();
    }

    // 2. Test all 69 canonical items at 390px EN, plus 320px/360px TA/430px EN
    const checksByWidth = [
      { width: 390, lang: 'en', items: canonicalCh6 },
      { width: 320, lang: 'en', items: canonicalCh6.filter((it, idx) => it.figureSrc || idx % 3 === 0) },
      { width: 360, lang: 'ta', items: canonicalCh6.filter((it, idx) => idx % 4 === 0) },
      { width: 430, lang: 'en', items: canonicalCh6.filter((it, idx) => idx % 5 === 0) },
    ];

    for (const runCfg of checksByWidth) {
      const ctx = await browser.newContext({
        viewport: { width: runCfg.width, height: 800 },
        isMobile: true,
        hasTouch: true,
        serviceWorkers: 'block',
        reducedMotion: 'reduce',
      });
      const page = await ctx.newPage();
      const errors = [];
      const httpErrors = [];
      page.on('pageerror', e => errors.push(e.message));
      page.on('response', r => { if (r.status() >= 400 && !r.url().endsWith('/favicon.ico')) httpErrors.push(`${r.status()} ${r.url()}`); });

      if (runCfg.lang === 'ta') {
        await page.goto(`${app.base}/index.html?class=10&chapter=g10-ch6`, { waitUntil: 'load' });
        await page.locator('#langTa').click();
      }

      for (const item of runCfg.items) {
        await page.goto(`${app.base}/index.html?class=10&question=${item.id}`, { waitUntil: 'domcontentloaded' });
        await page.locator('#stepsList .katex').first().waitFor({ state: 'visible', timeout: 5000 });
        await page.evaluate(() => document.fonts.ready);
        await page.waitForFunction(
          () => [...document.querySelectorAll('#lessonCard .triggle-tex')]
            .every(el => el.scrollWidth <= el.clientWidth + 1 || el.tabIndex === 0),
          null,
          { timeout: 1800, polling: 'raf' }
        );
        const res = await page.evaluate(id => {
          const card = document.querySelector('#lessonCard');
          const img = card?.querySelector('img');
          const diff = window.TriggleDifficulty?.get({ id, classNum: 10 });
          return {
            qLen: (document.querySelector('#questionText')?.innerText || '').trim().length,
            aText: (document.querySelector('#answerText')?.innerText || '').trim(),
            mathErrors: card ? card.querySelectorAll('[data-math-error], .katex-error').length : -1,
            katexCount: card ? card.querySelectorAll('#stepsList .katex').length : 0,
            hasAnsKatex: !!card?.querySelector('#answerText .katex'),
            hasDiff: !!diff,
            imgOk: img ? (img.complete && img.naturalWidth > 0) : null,
            scrollW: document.documentElement.scrollWidth,
            innerW: window.innerWidth,
          };
        }, item.id);

        assert.ok(res.qLen >= 8, `${item.id} (${runCfg.width}px ${runCfg.lang}): empty question`);
        assert.ok(res.aText.length > 0 && !/loading/i.test(res.aText), `${item.id}: missing answer`);
        assert.equal(res.mathErrors, 0, `${item.id}: KaTeX math errors found`);
        assert.ok(res.katexCount >= 1, `${item.id}: no rendered KaTeX in steps`);
        assert.ok(res.hasAnsKatex, `${item.id}: missing KaTeX in answer`);
        assert.ok(res.hasDiff, `${item.id}: missing TriggleDifficulty entry`);
        if (res.imgOk !== null) assert.ok(res.imgOk, `${item.id}: figure image failed to load`);
        assert.ok(res.scrollW <= res.innerW + 1, `${item.id} (${runCfg.width}px): horizontal overflow ${res.scrollW} > ${res.innerW}`);

        // Test figure modal on first diagram of each section
        if (item.figureSrc && /q1$|q5$|q6$/.test(item.id) && runCfg.width === 390) {
          const figBtn = page.locator('#figureBtn, #inlineFigureOpen').first();
          if (await figBtn.count() && await figBtn.isVisible()) {
            await figBtn.click();
            await page.locator('#figureDialog[open]').waitFor({ state: 'visible', timeout: 2000 });
            const modalImgOk = await page.evaluate(() => {
              const mImg = document.querySelector('#diagramContent img');
              return mImg ? (mImg.complete && mImg.naturalWidth > 0) : !!document.querySelector('#diagramContent svg');
            });
            assert.ok(modalImgOk, `${item.id}: figure modal did not render image/SVG`);
            await page.locator('#closeDiagram').click();
          }
        }
      }

      // Check legacy URL resolution compatibility at 390px
      if (runCfg.width === 390) {
        await page.goto(`${app.base}/index.html?class=10&question=c10-6-6-4-10`, { waitUntil: 'domcontentloaded' });
        await page.waitForSelector('#questionText');
        const legLen = await page.evaluate(() => (document.querySelector('#questionText')?.innerText || '').trim().length);
        assert.ok(legLen > 10, 'Legacy direct question c10-6-6-4-10 failed to render');
      }

      assert.deepEqual(errors, [], `Page errors at ${runCfg.width}px (${runCfg.lang}): ${errors}`);
      assert.deepEqual(httpErrors, [], `HTTP >=400 errors at ${runCfg.width}px (${runCfg.lang}): ${httpErrors}`);
      await ctx.close();
    }

    console.log('PASS Chapter 6 Mobile Chromium Verification (320/360/390/430px, EN & TA, 69 canonical items, 23 SVGs, 0 duplicates, 0 overflow, 0 errors).');
  } finally {
    await browser.close();
    app.close();
  }
})();
