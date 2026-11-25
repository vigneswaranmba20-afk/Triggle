'use strict';

const assert = require('node:assert/strict');
const {chromium} = require('playwright');
const {server, launchOptions} = require('./dashboard_test_support.cjs');
const [source] = require('../data/textbook-fidelity/g10-ch2-frontier-salary.json').items;

async function checkReader(page,language) {
  const tamil = language === 'ta';
  await page.locator(tamil ? '#langTa' : '#langEn').evaluate(button => button.click());
  const prompt = (await page.locator('#questionText').innerText()).replace(/\s+/g,' ');
  const answer = (await page.locator('.final-answer-value').innerText()).replace(/\s+/g,' ');
  assert.match(prompt,tamil ? /சிவமணி/ : /Sivamani/);
  assert.match(answer,/23,820\.32.*24,039\.99.*219\.67/);
  const teaching = (await page.locator('#stepsList').innerText()).replace(/\s+/g,' ');
  assert.match(teaching,/24,039\.994/);
  assert.match(teaching,/219\.674/);
  assert.match(teaching,/23,820.*24,040/);
  assert.equal(await page.locator('#lessonCard [data-math-error="true"],#lessonCard .katex-error').count(),0);
  assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth + 1),false);
}

(async () => {
  const live = process.env.TRIGGLE_LIVE_BASE;
  const app = live ? null : await server();
  const base = live || app.base;
  const browser = await chromium.launch(launchOptions());
  try {
    await Promise.all((live ? [390] : [320,360,390,412]).map(async width => {
      const context = await browser.newContext({viewport:{width,height:844},isMobile:true,hasTouch:true,ignoreHTTPSErrors:!!live});
      try {
        const page = await context.newPage();
        await page.goto(base + '/index.html?class=10&question=' + source.id);
        await checkReader(page,'en');
        await checkReader(page,'ta');
        await page.locator('#markDone').evaluate(button => button.click());
        await page.locator('#next').evaluate(button => button.click());
        assert.equal(new URL(page.url()).searchParams.get('question'),'c10-2-ex2-7-q12');
        await page.locator('#previous').evaluate(button => button.click());
        if(!live && width === 390) {
          await page.evaluate(() => navigator.serviceWorker.ready);
          await page.waitForFunction(() => !!navigator.serviceWorker.controller);
          await context.setOffline(true);
          await page.reload();
          await checkReader(page,'ta');
        }
        assert.equal(await page.locator('#markDone').getAttribute('aria-pressed'),'true');
        console.log(`Grade 10 salary arithmetic, both languages and saved progress at ${width}px passed.`);
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
