'use strict';

const assert = require('node:assert/strict');
const {chromium} = require('playwright');
const {server, launchOptions} = require('./dashboard_test_support.cjs');

const id = number => 'g9-ch3-ex3.15-q' + number;
const questionUrl = (base, number) => base + '/index.html?class=9&question=' + id(number);

async function selectQuestion(page, base, number) {
  await page.evaluate(url => {
    history.pushState({}, '', url);
    dispatchEvent(new PopStateEvent('popstate'));
  }, questionUrl(base, number));
}

async function verifyCases(page, number, language) {
  const work = await page.locator('#stepsList .step-reason').allTextContents();
  const answer = await page.locator('.final-answer-value').innerText();
  const tamil = language === 'ta';
  if (number === 9) {
    assert.match(answer, tamil ? /வகுத்தி.*காரணி/ : /divisor.*factor/);
    assert.equal(await page.locator('.triggle-mcq-btn').count(), 0);
  }
  if (number === 15) {
    assert(work.some(line => line.includes(tamil ? 'தலைமைக் கெழு 1' : 'leading coefficient is 1')));
  }
  if (number === 17) {
    assert(work.some(line => line.includes(tamil ? 'பூச்சியக் கோவையின் படி வரையறுக்கப்படவில்லை' : 'zero polynomial is undefined')));
  }
  if (number === 28) {
    assert.match(answer, tamil ? /வெவ்வேறு பகா எண்களுக்கு/ : /Distinct primes/);
    assert(work.some(line => line.includes(tamil ? 'இரண்டு பகா எண்களும் சமமாக' : 'both primes are equal')));
    assert.equal(await page.locator('.triggle-mcq-btn').count(), 0);
  }
  assert.equal(await page.locator('#lessonCard [data-math-error]').count(), 0);
  assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false);
}

(async () => {
  const live = process.env.TRIGGLE_LIVE_BASE;
  const local = live ? null : await server();
  const base = live || local.base;
  const browser = await chromium.launch(launchOptions());
  try {
    await Promise.all((live ? [390] : [320,360,390,412]).map(async width => {
      const context = await browser.newContext({viewport:{width,height:844},isMobile:true,hasTouch:true,ignoreHTTPSErrors:!!live});
      try {
        const page = await context.newPage();
        await page.goto(questionUrl(base, 9));
        for (const number of [9,15,17,28]) {
          await selectQuestion(page, base, number);
          for (const [language,button] of [['en','#langEn'],['ta','#langTa']]) {
            await page.locator(button).evaluate(toggle => toggle.click());
            await verifyCases(page, number, language);
            assert((await page.locator('#stepsList details[class*="why-step"]').count()) > 0, id(number));
          }
        }
        for (const number of [3,8,16,25,26,27]) {
          await selectQuestion(page, base, number);
          const explicit = await page.evaluate(id => window.TRIGGLE_CLASSES[9].items.find(item => item.id === id).answerTa, id(number));
          if (/\p{Script=Tamil}/u.test(explicit)) assert.match(await page.locator('.final-answer-value').innerText(), /\p{Script=Tamil}/u);
        }
        await selectQuestion(page, base, 9);
        await page.locator('#markDone').evaluate(button => button.click());
        await page.locator('#next').evaluate(button => button.click());
        assert.equal(new URL(page.url()).searchParams.get('question'), id(10));
        await page.locator('#previous').evaluate(button => button.click());
        assert.equal(await page.locator('#markDone').getAttribute('aria-pressed'), 'true');
        if (!live && width === 390) {
          await page.evaluate(() => navigator.serviceWorker.ready);
          await page.waitForFunction(() => !!navigator.serviceWorker.controller);
          await context.setOffline(true);
          await page.reload();
          await verifyCases(page, 9, 'ta');
          assert.equal(await page.locator('#markDone').getAttribute('aria-pressed'), 'true');
        }
        console.log(`Grade 9 Algebra 3.15 bilingual source corrections and preserved progress passed at ${width}px.`);
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
