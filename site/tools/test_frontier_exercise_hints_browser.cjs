'use strict';

const assert = require('node:assert/strict');
const {chromium} = require('playwright');
const {server, launchOptions} = require('./dashboard_test_support.cjs');

const cases = [
  [9, 'g9-ch1-ex1.1-q1-i', '1.1'],
  [9, 'g9-ch2-ex1-q1', '2.1'],
  [9, 'g9-ch3-ex3.1-q10', '3.1'],
  [9, 'g9-ch4-ex4.1-q2', '4.1'],
  [9, 'g9-ch5-ex5.2-q2', '5.2'],
  [9, 'c9-exercise-6-1-q1', '6.1'],
  [9, 'g9-ch7-ex7.1-q1', '7.1'],
  [9, 'g9-ch8-ex8.1-q1', '8.1'],
  [9, 'g9-ch9-ex9.1-q1', '9.1'],
  [10, 'c10-1-ex1-1-q1-i', '1.1'],
  [10, 'c10-2-ex2-1-q1', '2.1'],
  [10, 'c10-3-ex3-1-q1-i', '3.1'],
  [10, 'c10-4-ex4-1-q2', '4.1'],
  [10, 'c10-5-ex5-1-q1-i', '5.1'],
  [10, 'c10-6-ex6-1-q2-i', '6.1'],
  [10, 'c10-7-ex7-1-q1', '7.1'],
  [10, 'c10-8-ex8-1-q1-i', '8.1'],
  [10, 'c10-3-ex3-unit-q1', '3.unit'],
];

const route = (base, grade, id) => base + '/index.html?class=' + grade + '&question=' + id;

async function inspectHint(page, grade, id, exercise, language) {
  await page.locator(language === 'en' ? '#langEn' : '#langTa').evaluate(button => button.click());
  const summary = page.locator('#g9GeometryHint summary');
  const details = page.locator('#g9GeometryHint');
  assert(await summary.isVisible(), id + ' ' + language);
  assert.equal(await summary.innerText(), language === 'en' ? 'Hint' : 'குறிப்பு');
  assert.equal(await details.evaluate(element => element.open), false);
  assert(await page.locator('#stepsList details[class*="why-step"]').count(), id + ' step explanation');
  await summary.click();
  const observed = await details.locator('p').innerText();
  const expected = await page.evaluate(({grade, exercise, language}) => {
    const item = window.testExercise?.item;
    const authored = item?.hint || (grade === 9 && exercise.startsWith('4.') &&
      window.TriggleGrade9Geometry?.preservedHints[item.id.slice(9)]);
    return authored?.en && authored?.ta ? authored[language] :
      window.TriggleExerciseHints.forExercise(grade, exercise)[language];
  }, {grade, exercise, language});
  assert.equal(observed, expected, id + ' ' + language);
  assert.match(observed, language === 'ta' ? /\p{Script=Tamil}/u : /[A-Za-z]/, id);
  assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth + 1), false, id);
}

(async () => {
  const live = process.env.TRIGGLE_LIVE_BASE;
  const app = live ? null : await server();
  const base = live || app.base;
  const browser = await chromium.launch(launchOptions());
  try {
    await Promise.all((live ? [390] : [320, 360, 390, 412]).map(async width => {
      const context = await browser.newContext({
        viewport: {width, height: 844}, isMobile: true, hasTouch: true, ignoreHTTPSErrors: !!live,
      });
      try {
        const page = await context.newPage();
        await page.addInitScript(() => {
          window.addEventListener('triggle:lessonchange', event => { window.testExercise = event.detail; });
        });
        for (const [grade, id, exercise] of cases) {
          await page.goto(route(base, grade, id));
          await inspectHint(page, grade, id, exercise, 'en');
          await inspectHint(page, grade, id, exercise, 'ta');
        }
        const authored = [9, 'g9-ch1-ex1.3-q1', '1.3'];
        await page.goto(route(base, authored[0], authored[1]));
        assert(await page.evaluate(() => !!window.testExercise.item.hint.ta));
        await inspectHint(page, ...authored, 'ta');
        const practice = 'c9-5-5-practice-6';
        await page.goto(route(base, 9, practice));
        assert.equal(await page.evaluate(() => window.testExercise?.item?.id), practice);
        assert(await page.locator('#g9GeometryHint').isHidden(), practice);
        if (!live && width === 390) {
          await page.waitForFunction(() => !!navigator.serviceWorker.controller, {}, {timeout: 60000});
          await context.setOffline(true);
          const offline = cases.find(([grade, , exercise]) => grade === 10 && exercise === '3.unit');
          await page.goto(route(base, offline[0], offline[1]));
          await inspectHint(page, ...offline, 'en');
          await inspectHint(page, ...offline, 'ta');
        }
        console.log('PASS bilingual exercise hints, authored hints and practice isolation at ' + width + ' px.');
      } finally {
        await context.close();
      }
    }));
  } finally {
    await browser.close();
    await app?.close();
  }
})().catch(error => { console.error(error); process.exitCode = 1; });
