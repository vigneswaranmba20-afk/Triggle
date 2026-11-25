'use strict';

const assert = require('node:assert/strict');
const {chromium} = require('playwright');
const {server, launchOptions} = require('./dashboard_test_support.cjs');
const exerciseId = number => `c9-exercise-6-1-q${number}`;

async function examineReader(page, number, language) {
  const tamil = language === 'ta';
  await page.locator(tamil ? '#langTa' : '#langEn').evaluate(button => button.click());
  const prompt = (await page.locator('#questionText').innerText()).replace(/\s+/g,' ');
  const answer = (await page.locator('.final-answer-value').innerText()).replace(/\s+/g,' ');
  const reasons = (await page.locator('#stepsList .step-reason').allTextContents()).join(' ');
  if (number === 5) {
    assert.match(prompt,tamil ? /மதிப்புகளை/ : /in terms of/);
    assert.match(prompt,/cos/);
    assert.match(answer,/sin/);
  }
  if (number === 6) {
    assert.match(answer,tamil ? /நேர்மப் பக்க நீளங்களுக்கு/ : /positive side lengths/);
    assert.match(reasons,tamil ? /எதிரெதிர்க் குறிகளைக்/ : /opposite signs/);
    assert.match(await page.locator('#stepsList .step-equation').last().innerText(),/≠/);
  }
  if (number === 9) {
    assert.match(prompt,tamil ? /மேலும் இரு செங்கோண முக்கோணங்கள்/ : /two other right angled triangles/);
    await page.locator('#figureBtn').click();
    assert(await page.locator('#diagramContent svg,#diagramContent img').count()>0);
    await page.locator('#closeDiagram').click();
  }
  assert.equal(await page.locator('#lessonCard [data-math-error="true"],#lessonCard .katex-error').count(),0);
  assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth + 1),false);
}

(async () => {
  const live = process.env.TRIGGLE_LIVE_BASE;
  const app = live ? null : await server();
  const base = live || app.base;
  const route = number => base + '/index.html?class=9&question=' + exerciseId(number);
  const browser = await chromium.launch(launchOptions());
  try {
    await Promise.all((live ? [390] : [320,360,390,412]).map(async width => {
      const context = await browser.newContext({viewport:{width,height:844},isMobile:true,hasTouch:true,ignoreHTTPSErrors:!!live});
      try {
        const page = await context.newPage();
        await page.goto(route(5));
        for (const number of [5,6,9]) {
          await page.evaluate(url => {
            history.pushState({},'',url);
            dispatchEvent(new PopStateEvent('popstate'));
          }, route(number));
          await examineReader(page,number,'en');
          await examineReader(page,number,'ta');
        }
        await page.goto(route(6));
        await page.locator('#markDone').evaluate(button => button.click());
        await page.locator('#next').evaluate(button => button.click());
        assert.equal(new URL(page.url()).searchParams.get('question'),exerciseId(7));
        await page.locator('#previous').evaluate(button => button.click());
        if(!live && width === 390) {
          await page.evaluate(() => navigator.serviceWorker.ready);
          await page.waitForFunction(() => !!navigator.serviceWorker.controller);
          await context.setOffline(true);
          await page.reload();
          await examineReader(page,6,'ta');
        }
        assert.equal(await page.locator('#markDone').getAttribute('aria-pressed'),'true');
        console.log(`Grade 9 Trigonometry source prompts, conditional proof and navigation at ${width}px passed.`);
      } finally {
        await context.close();
      }
    }));
  } finally {
    await browser.close();
    await app?.close();
  }
})().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
