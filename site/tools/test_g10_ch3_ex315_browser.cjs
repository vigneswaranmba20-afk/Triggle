'use strict';
const assert = require('node:assert/strict');
const { chromium } = require('playwright');
const { server, launchOptions } = require('./dashboard_test_support.cjs');

(async () => {
  const app = await server();
  const browser = await chromium.launch(launchOptions());
  try {
    const page = await browser.newPage({ viewport: { width: 390, height: 844 }, serviceWorkers: 'block' });
    const errors = [];
    const missing = [];
    page.on('pageerror', e => errors.push(e.message));
    page.on('response', r => { if (r.status() >= 400) missing.push(r.url()); });

    const allIds = [
      'c10-3-ex3-15-q1-i', 'c10-3-ex3-15-q1-ii',
      'c10-3-ex3-15-q2-i', 'c10-3-ex3-15-q2-ii',
      'c10-3-ex3-15-q3-i', 'c10-3-ex3-15-q3-ii',
      'c10-3-ex3-15-q4-i', 'c10-3-ex3-15-q4-ii',
      'c10-3-ex3-15-q5-i', 'c10-3-ex3-15-q5-ii',
      'c10-3-ex3-15-q6-i', 'c10-3-ex3-15-q6-ii'
    ];
    const responsiveSpotIds = [
      'c10-3-ex3-15-q1-i',
      'c10-3-ex3-15-q3-i',
      'c10-3-ex3-15-q3-ii',
      'c10-3-ex3-15-q4-i',
      'c10-3-ex3-15-q6-ii'
    ];

    for (const width of [320, 390, 412]) {
      await page.setViewportSize({ width, height: 844 });
      const idsToCheck = width === 390 ? allIds : responsiveSpotIds;
      for (const lang of ['en', 'ta']) {
        await page.goto(app.base + '/index.html?class=10&question=c10-3-ex3-15-q1-i');
        await page.locator(lang === 'ta' ? '#langTa' : '#langEn').click();
        for (const id of idsToCheck) {
          await page.goto(app.base + '/index.html?class=10&question=' + id);
          await page.locator('#stepsList .worked-step').first().waitFor();
          await page.waitForFunction(() => document.querySelectorAll('#stepsList .katex').length > 0);
          const s = await page.evaluate(() => {
            const k = [...document.querySelectorAll('#questionText .katex, #stepsList .katex, #answerText .katex')];
            const clipped = k.filter(e => {
              const b = e.getBoundingClientRect();
              return b.width > 0 && b.right > innerWidth + 1 && !e.closest('[tabindex],.katex-display');
            }).length;
            const img = document.querySelector('#inlineFigureVisual img');
            return {
              q: document.querySelector('#questionText').textContent,
              ans: document.querySelector('#answerText').textContent,
              steps: [...document.querySelectorAll('#stepsList .worked-step:not(.final-answer-step) .step-reason')].map(e => e.textContent),
              katexCount: k.length,
              clipped,
              width: document.documentElement.scrollWidth,
              vw: innerWidth,
              inlineFigHidden: document.querySelector('#inlineFigure').hidden,
              inlineImgSrc: img?.getAttribute('src') || '',
              inlineImgLoaded: Boolean(img && img.complete && img.naturalWidth > 0),
              tableCount: document.querySelectorAll('#questionText table.triggle-data-table').length,
              badge: document.querySelector('#kindBadge').textContent
            };
          });

          assert.ok(s.katexCount >= 2, 'KaTeX rendered ' + id + ' ' + lang);
          assert.equal(s.clipped, 0, 'no clipped KaTeX ' + id + ' ' + lang + ' @' + width);
          assert.ok(s.width <= s.vw + 1, 'no horizontal overflow ' + id + ' ' + lang + ' @' + width + ': ' + s.width + '>' + s.vw);
          assert.equal(s.inlineFigHidden, false, 'inline figure visible ' + id);
          assert.ok(s.inlineImgSrc.includes('grade10-ch3/ex3-15-'), 'inline SVG src ' + id);
          assert.equal(s.inlineImgLoaded, true, 'inline SVG loaded ' + id);
          if (/q[456]-/.test(id)) {
            assert.equal(s.tableCount, 1, 'dataTable rendered for ' + id);
          }
          if (lang === 'ta') {
            assert.ok(/\p{Script=Tamil}/u.test(s.q), 'Tamil question ' + id);
            assert.ok(s.steps.every(t => /\p{Script=Tamil}/u.test(t)), 'Tamil steps ' + id);
            assert.ok(!s.badge.includes('மொழிபெயர்ப்பு நிலுவையில்'), 'no missing-Tamil badge ' + id);
          }
        }
      }
    }

    // Expanded figure modal check on Q3(i)
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(app.base + '/index.html?class=10&question=c10-3-ex3-15-q3-i');
    await page.locator('#inlineFigureOpen').click();
    await page.locator('#figureDialog[open]').waitFor();
    const diagImg = await page.locator('#diagramContent img').getAttribute('src');
    assert.ok(diagImg && diagImg.includes('ex3-15-q3-linear.svg'), 'Q3 expanded figure opens');
    await page.locator('#closeDiagram').click();

    // Next/Previous across Q3(i) <-> Q3(ii) and final Q6(ii) boundary
    await page.locator('#next').click();
    await page.waitForFunction(() => location.search.includes('c10-3-ex3-15-q3-ii'));
    await page.locator('#previous').click();
    await page.waitForFunction(() => location.search.includes('c10-3-ex3-15-q3-i'));

    await page.goto(app.base + '/index.html?class=10&question=c10-3-ex3-15-q6-ii');
    await page.locator('#stepsList .worked-step').first().waitFor();
    assert.ok((await page.locator('#answerText').textContent()).includes('10'));

    assert.deepEqual(errors, []);
    assert.deepEqual(missing, []);
    console.log('PASS G10 Ex 3.15 browser: 320/390/412px, EN/TA, all 12 parts, 6 SVG graphs, 3 tables, Next/Prev, Q6 boundary');
  } finally {
    await browser.close();
    await app.close();
  }
})().catch(e => {
  console.error(e);
  process.exitCode = 1;
});
