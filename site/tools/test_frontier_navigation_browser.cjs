'use strict';

const assert = require('node:assert/strict');
const {chromium} = require('playwright');
const {server, launchOptions} = require('./dashboard_test_support.cjs');

const exercises = [
  {
    grade: 9, chapter: 1, number: '1.1', prefix: 'g9-ch1-ex1.1-q',
    sequence: '1-i 1-ii 1-iii 1-iv 2-i 2-ii 2-iii 2-iv 3-a-i 3-a-ii 3-a-iii 3-a-iv 3-a-v 3-a-vi 3-b-i 3-b-ii 3-b-iii 3-b-iv 4-i 4-ii 4-iii 4-iv 5-i 5-ii 5-iii 5-iv 6-i 6-ii 6-iii 6-iv',
  },
  {
    grade: 9, chapter: 6, number: '6.4', prefix: 'c9-exercise-6-4-q',
    sequence: '1-i 1-ii 1-iii 1-iv 1-v 1-vi 2-i 2-ii 2-iii 2-iv 2-v 3-i 3-ii 4 5 6',
  },
  {
    grade: 10, chapter: 3, number: '3.19', prefix: 'c10-3-ex3-19-q',
    sequence: '1-i 1-ii 1-iii 1-iv 1-v 2 3 4 5 6 7-i 7-ii 7-iii 8 9 10 11 12 13',
  },
];

const question = page => new URL(page.url()).searchParams.get('question');

async function checkExercise(page, base, {grade, chapter, number, prefix, sequence}, language) {
  const ids = sequence.split(' ').map(suffix => prefix + suffix);
  await page.goto(`${base}/index.html?class=${grade}&chapter=g${grade}-ch${chapter}&section=exercises`);
  await page.locator(language === 'ta' ? '#langTa' : '#langEn').evaluate(button => button.click());
  await page.locator(`.hub-exercise-link[data-exercise="${number}"]`).click();
  assert.equal(question(page), ids[0]);
  assert.equal(await page.locator('#previous').isDisabled(), true);

  const crumb = page.locator('#crumb button').last();
  assert.match(await crumb.innerText(), language === 'ta' ? /பயிற்சி/ : /Exercise/);
  await page.locator('#exerciseIndexLink').click();
  await page.locator(`.hub-exercise-link[data-exercise="${number}"]`).click();
  assert.equal(question(page), ids[0]);
  await page.locator('#markDone').evaluate(button => button.click());
  assert.equal(await page.locator('#markDone').getAttribute('aria-pressed'), 'true');

  for (const id of ids.slice(1)) {
    await page.locator('#next').evaluate(button => button.click());
    assert.equal(question(page), id);
  }
  assert.equal(await page.locator('#next').isDisabled(), true);
  for (const id of ids.slice(0, -1).reverse()) {
    await page.locator('#previous').evaluate(button => button.click());
    assert.equal(question(page), id);
  }
  assert.equal(await page.locator('#previous').isDisabled(), true);
  assert.equal(await page.locator('#markDone').getAttribute('aria-pressed'), 'true');
}

(async () => {
  const live = process.env.TRIGGLE_LIVE_BASE;
  const local = live ? null : await server();
  const browser = await chromium.launch(launchOptions());
  try {
    await Promise.all((live ? [390] : [320, 360, 390, 412]).map(async width => {
      for (const language of ['en', 'ta']) {
        const context = await browser.newContext({viewport: {width, height: 844}, isMobile: true, hasTouch: true});
        try {
          const page = await context.newPage();
          for (const exercise of exercises) await checkExercise(page, live || local.base, exercise, language);
        } finally {
          await context.close();
        }
      }
      console.log(`65 cards in textbook order with bilingual chapter entry, breadcrumbs, boundaries and retained progress at ${width}px.`);
    }));
  } finally {
    await browser.close();
    await local?.close();
  }
})().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
