'use strict';

const assert = require('node:assert/strict');
const {chromium} = require('playwright');
const {server, launchOptions} = require('./dashboard_test_support.cjs');
const [source] = require('../data/textbook-fidelity/g9-ch5-frontier-plot-order.json').items;

async function checkFigure(page, language) {
  const tamil = language === 'ta';
  await page.locator(tamil ? '#langTa' : '#langEn').evaluate(button => button.click());
  const answer = (await page.locator('.final-answer-value').innerText()).replace(/\s+/g,' ');
  assert.match(answer, tamil ? /குறுக்கிடும்.*சரிவகம்/ : /sides cross.*trapezium/i);
  assert.equal(await page.locator('#lessonCard [data-math-error="true"],#lessonCard .katex-error').count(),0);
  assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth + 1),false);
  assert.equal(await page.locator('#stepsList details[class*=why-step]').count(),1);
  await page.locator('#inlineFigureOpen:visible, #figureBtn:visible').click();
  const figure = page.locator('#diagramContent img');
  await figure.evaluate(image => image.decode());
  assert.equal(await figure.getAttribute('src'),source.figure);
  const alt = await figure.getAttribute('alt');
  assert.match(alt,tamil ? /குறுக்கிடுகின்றன/ : /crosses/);
  assert.match(alt,/ABCDA.*ABDCA/);
  await page.locator('#closeDiagram').click();
}

(async () => {
  const live = process.env.TRIGGLE_LIVE_BASE;
  const app = live ? null : await server();
  const base = live || app.base;
  const browser = await chromium.launch(launchOptions());
  try {
    for(const width of live ? [390] : [320,360,390,412]) {
      const context = await browser.newContext({viewport:{width,height:844},isMobile:true,hasTouch:true,ignoreHTTPSErrors:!!live});
      try {
        const page = await context.newPage();
        await page.goto(base + '/index.html?class=9&question=' + source.id);
        await checkFigure(page,'en');
        await checkFigure(page,'ta');
        await page.locator('#markDone').evaluate(button => button.click());
        assert.equal(await page.locator('#markDone').getAttribute('aria-pressed'),'true');
        assert(await page.locator('#next').isDisabled());
        await page.locator('#previous').evaluate(button => button.click());
        assert.equal(new URL(page.url()).searchParams.get('question'),'g9-ch5-ex5.1-q3');
        await page.locator('#next').evaluate(button => button.click());
        assert.equal(await page.locator('#markDone').getAttribute('aria-pressed'),'true');
        if(!live && width === 390) {
          await page.evaluate(() => navigator.serviceWorker.ready);
          await page.waitForFunction(() => !!navigator.serviceWorker.controller);
          await context.setOffline(true);
          await page.reload();
          await checkFigure(page,'ta');
          assert.equal(await page.locator('#markDone').getAttribute('aria-pressed'),'true');
        }
        console.log(`Grade 9 5.1 Q4 plotted order, bilingual walkthrough and progress at ${width}px passed.`);
      } finally {
        await context.close();
      }
    }
  } finally {
    await browser.close();
    await app?.close();
  }
})().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
