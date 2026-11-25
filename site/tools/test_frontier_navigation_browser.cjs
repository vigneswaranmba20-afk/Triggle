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
const conceptLinks = [
  [2, 'congruence', ['c10-2-ex2-3-q1-i']],
  [4, 'pythagoras', ['c10-4-ex4-3-q6']],
  [4, 'circles-tangents', ['c10-4-ex4-4-q1', 'c10-4-ex4-4-q11']],
  [4, 'concurrency', ['c10-4-ex4-4-q9', 'c10-4-unit-q3']],
  [5, 'distance-midpoint-centroid', ['c10-5-5-practice-20', 'c10-5-ex5-1-q8']],
  [5, 'area-triangle', ['c10-5-ex5-1-q1-i']],
  [5, 'collinearity', ['c10-5-ex5-1-q2-i']],
  [5, 'area-quadrilateral', ['c10-5-ex5-1-q5-i']],
  [5, 'inclination-slope', ['c10-5-ex5-2-q1-i']],
  [5, 'parallel-perpendicular-slopes', ['c10-5-ex5-2-q9-i', 'c10-5-ex5-2-q10']],
  [5, 'axes-and-parallel-lines', ['c10-5-ex5-3-q1-i', 'c10-5-ex5-3-q1-ii']],
  [5, 'slope-intercept-form', ['c10-5-ex5-3-q3']],
  [5, 'point-slope-and-two-point', ['c10-5-ex5-3-q7-i', 'c10-5-ex5-3-q10']],
  [5, 'intercept-form', ['c10-5-ex5-3-q12-i']],
  [5, 'general-form', ['c10-5-ex5-4-q1-i']],
  [5, 'parallel-perpendicular-general', ['c10-5-ex5-4-q5', 'c10-5-unit-q8']],
];

async function checkConceptLinks(page, base, language) {
  for (const [chapter, stage, expected] of conceptLinks) {
    const chapterId = 'g10-ch' + chapter;
    const index = await page.evaluate(({chapter, id}) =>
      window['TRIGGLE_G10_CH' + chapter + '_PATH'].stages.findIndex(stage => stage.id === id),
    {chapter, id: chapterId + '-' + stage});
    assert(index >= 0, stage + ' remains registered');
    const url = `${base}/index.html?class=10&chapter=${chapterId}&section=concepts&concept=${index}`;
    await page.goto(url, {waitUntil: 'domcontentloaded'});
    const links = page.locator('#chapterSectionContent .g10ch2-practice-link');
    assert.equal(await links.count(), expected.length, stage);
    for (const [position, id] of expected.entries()) {
      const link = links.nth(position);
      assert(await link.isVisible(), stage + ' has a visible practice link');
      assert.match(await link.innerText(), language === 'ta' ? /\p{Script=Tamil}/u : /Solve|Try/);
      await link.evaluate(button => button.click());
      assert.equal(question(page), id);
      if (position < expected.length - 1) await page.goBack({waitUntil: 'domcontentloaded'});
    }
  }
}

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
          await checkConceptLinks(page, live || local.base, language);
        } finally {
          await context.close();
        }
      }
      console.log(`65 cards in source order and 16 concept paths, bilingual, with boundaries and retained progress at ${width}px.`);
    }));
  } finally {
    await browser.close();
    await local?.close();
  }
})().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
