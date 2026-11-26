'use strict';

const assert = require('node:assert/strict');
const {chromium} = require('playwright');
const {server, launchOptions} = require('./dashboard_test_support.cjs');

const cases = [
  [9, 'g9-ch3-ex3.1-q1-i', /பல்லுறுப்புக் கோவை/, /Not a polynomial/],
  [9, 'g9-ch3-ex3.2-q5-iii', /பூச்சியமாகும்|பூச்சியம்/, /zero/],
  [9, 'g9-ch3-ex3.3-q10', /நிரூபிக்கப்பட்டது/, /proved|a\s*=\s*b/i],
  [9, 'g9-ch3-ex3.5-q3-ii', /5\s*x/, /5\s*x/],
  [9, 'g9-ch3-ex3.10-q2-ii', /எண்ணற்ற தீர்வுகள்/, /Infinitely many solutions/],
  [9, 'g9-ch5-ex5.1-q3', /இணையான நேர்க்கோடு/, /Parallel to/],
  [9, 'g9-ch5-ex5.1-q4', /சதுரம்.*சரிவகம்/s, /Square.*Trapezium/s],
  [9, 'g9-ch5-ex5.3-q7', /நடுப்புள்ளி.*இணைகரம்/s, /Parallelogram/],
  [9, 'g9-ch5-ex5.4-q6', /ஒரே கோட்டில்/, /Collinear/],
  [9, 'g9-ch5-ex5.5-q5', /அலகுகள்/, /units/],
  [9, 'g9-ch5-ex5.6-q9', /வெற்றுக் கணம்/, /Null set/],
  [10, 'c10-7-ex7-2-q4', /நிமிடங்கள்/, /minutes/],
  [10, 'c10-7-ex7-4-q2', /மணி நேரம்/, /approx/],
  [10, 'c10-8-ex8-2-q6', /பாடநூல் விடை.*இறுதியில் சுற்றினால்/s, /textbook rounding.*rounded at the end/s],
  [10, 'c10-8-ex8-3-q2', /வரிசைச் சோடிகள்/, /ordered pairs/],
  [10, 'c10-8-ex8-3-q6-i', /எனில்/, /for/],
  [10, 'c10-8-ex8-3-q10', /பழுதடைந்த மின்விளக்குகள்/, /defective bulbs/]
];

async function checkAnswer(page, expected, id) {
  const answer = page.locator('.final-answer-value');
  assert.match((await answer.innerText()).replace(/\s+/g, ' '), expected, id);
  assert.equal(await answer.locator('[data-math-error],.katex-error').count(), 0, id);
  assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth + 1), false, id);
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
        await page.goto(base + '/index.html?class=9&question=' + cases[0][1]);
        for (const [grade,id,tamil,english] of cases) {
          await page.evaluate(url => {
            history.pushState({}, '', url);
            dispatchEvent(new PopStateEvent('popstate'));
          }, base + '/index.html?class=' + grade + '&question=' + id);
          await page.locator('#langEn').evaluate(button => button.click());
          await checkAnswer(page, english, id);
          await page.locator('#langTa').evaluate(button => button.click());
          await checkAnswer(page, tamil, id);
          if (id === 'g9-ch3-ex3.5-q3-ii') {
            const formula = page.locator('.final-answer-value .triggle-tex');
            assert.equal(await formula.getAttribute('data-math-fallback'), '(5x − 2y − 3z)²');
          }
        }
        if (!live && width === 390) {
          await page.evaluate(() => navigator.serviceWorker.ready);
          await page.waitForFunction(() => !!navigator.serviceWorker.controller);
          await context.setOffline(true);
          await page.reload();
          await checkAnswer(page, /பழுதடைந்த மின்விளக்குகள்/, 'offline answer');
        }
        console.log(`Bilingual final-answer display passed at ${width}px.`);
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
