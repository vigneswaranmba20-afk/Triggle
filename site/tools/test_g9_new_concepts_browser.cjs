'use strict';

const assert = require('node:assert/strict');
const {chromium} = require('playwright');
const {launchOptions, server} = require('./dashboard_test_support.cjs');

const chapters = [
  {number: 4, count: 7, keys: [0, 1, 2, 3, 4, 5, 6], data: 'TRIGGLE_GEOMETRY_LESSONS'},
  {number: 5, count: 7, keys: [1, 2, 0, 3, 4, 5, 6], data: 'TRIGGLE_COORDINATE_LESSONS'},
  {number: 6, count: 4, keys: [0, 1, 2, 3], data: 'TRIGGLE_TRIGONOMETRY_LESSONS'}
];

async function checkChapter(page, base, chapter, width, lang) {
  const chapterRoute = base + '?class=9&chapter=g9-ch' + chapter.number;
  await page.goto(chapterRoute, {waitUntil: 'domcontentloaded'});
  await page.locator(lang === 'ta' ? '#langTa' : '#langEn').click();
  const concepts = page.locator('button[data-hub-section="concepts"]');
  assert.match(await concepts.innerText(), lang === 'ta' ? /கருத்துகள்/ : /Concepts/);
  await concepts.click();
  const index = page.locator('[data-index-view]');
  const items = index.locator('.sp2-nav-button');
  assert.equal(await items.count(), chapter.count);
  const data = await page.evaluate(name => window[name].map(lesson => ({
    title: lesson.title, section: lesson.section, exercise: lesson.exercise, additionalExercises: lesson.additionalExercises || [],
    diagram: Boolean(lesson.activity.options[1].diagram),
    optionCount: lesson.activity.options.length,
    math: Boolean(lesson.math || lesson.activity.options[1].math || lesson.details?.some(entry => entry.math)),
    hint: lesson.check.hint,
    wrong: lesson.check.options.findIndex(option => !option.correct),
    right: lesson.check.options.findIndex(option => option.correct)
  })), chapter.data);
  for (let i = 0; i < chapter.count; i++) {
    const routeKey = chapter.keys[i];
    const source = chapter.number === 5 && i > 2 ? data[i - 1] : data[i];
    await items.nth(i).click();
    assert.equal(new URL(page.url()).searchParams.get('concept'), String(routeKey));
    const panel = page.locator('[data-panel]');
    const label = '§' + chapter.number + '.' + (i + 1) + ' ' + lang + ' at ' + width + 'px';
    if (chapter.number === 5 && i === 2) {
      assert.equal(await panel.locator('.g9-distance-lab svg').isVisible(), true, label);
      assert.equal(await panel.locator('.sp2-concept-video-button').isVisible(), true, label);
    } else {
      assert.equal(await panel.locator('h4').innerText(), source.section + ' ' + source.title[lang]);
      assert.equal(await panel.locator('.sp2-stage-reference').isVisible(), true, label);
      if (i === 0) {
        const other = lang === 'ta' ? 'en' : 'ta';
        await page.locator(other === 'ta' ? '#langTa' : '#langEn').click();
        assert.equal(await panel.locator('h4').innerText(), source.section + ' ' + source.title[other]);
        assert.equal(new URL(page.url()).searchParams.get('concept'), String(routeKey));
        await page.locator(lang === 'ta' ? '#langTa' : '#langEn').click();
      }
      const activity = panel.locator('.g9-investigation-activity');
      const options = activity.locator('button');
      assert.ok(source.optionCount >= 2, label);
      assert.equal(await options.nth(0).getAttribute('aria-pressed'), 'true', label);
      const initialResult = await activity.locator('.g9-investigation-result').innerText();
      await options.nth(1).click();
      assert.equal(await options.nth(1).getAttribute('aria-pressed'), 'true', label);
      assert.notEqual(await activity.locator('.g9-investigation-result').innerText(), initialResult, label);
      if (source.diagram) {
        const diagram = activity.locator('.g9-investigation-diagram');
        const svg = diagram.locator('svg');
        assert.equal(await diagram.isVisible(), true, label);
        if (await svg.count()) {
          const accessibleName = await svg.getAttribute('aria-label') || await svg.locator('title').first().textContent();
          assert.ok(accessibleName, label);
          if (lang === 'ta') assert.match(accessibleName, /[\u0B80-\u0BFF]/, label);
        } else {
          assert.ok(await diagram.locator('table').count(), label);
        }
      }
      if (source.math) assert.ok(await panel.locator('.katex').count(), label);
      const check = panel.locator('.g9-investigation-check');
      const answers = check.locator('.sp2-answers button');
      const feedback = check.getByRole('status');
      assert.ok(source.wrong >= 0 && source.right >= 0, label);
      assert.ok(source.hint?.[lang], label);
      await check.getByRole('button', {name: lang === 'ta' ? 'குறிப்பு' : 'Hint', exact: true}).click();
      assert.equal(await feedback.innerText(), source.hint[lang], label);
      await answers.nth(source.wrong).click();
      assert.match(await feedback.innerText(), lang === 'ta' ? /மீண்டும் முயலுங்கள்/ : /Try again/, label);
      await answers.nth(source.right).click();
      assert.match(await feedback.innerText(), lang === 'ta' ? /சரி!/ : /Correct!/, label);
      await check.locator('.g9-investigation-reset').click();
      assert.equal(await options.nth(0).getAttribute('aria-pressed'), 'true', label);
      assert.equal(await feedback.innerText(), '', label);
      assert.equal(await panel.locator('.katex-error, [data-math-error]').count(), 0, label);
      const expectedExercises=[source.exercise,...source.additionalExercises].filter(Boolean);
      const practiceLinks=panel.locator('.g10ch2-practice-link');
      assert.equal(await practiceLinks.count(),expectedExercises.length,label);
      for(const [linkIndex,exerciseId] of expectedExercises.entries()){
        await practiceLinks.nth(linkIndex).click();
        assert.equal(new URL(page.url()).searchParams.get('question'),exerciseId,label);
        await page.goBack();
        await panel.locator('.g9-investigation-check').waitFor({state: 'visible'});
      }
    }
    const more = panel.locator('.g9-investigation-more summary');
    if (await more.count()) await more.click();
    assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), label);
    const next = page.locator('[data-footer-next]');
    const previous = page.locator('[data-footer-prev]');
    assert.equal(await previous.isDisabled(), i === 0, label);
    if (i < chapter.count - 1) {
      await next.click();
      assert.equal(new URL(page.url()).searchParams.get('concept'), String(chapter.keys[i + 1]), label);
      await previous.click();
      assert.equal(new URL(page.url()).searchParams.get('concept'), String(routeKey), label);
    }
    await page.locator('[data-back-index]').click();
    await index.waitFor({state: 'visible'});
  }
}

async function checkOffline(browser, base) {
  const context = await browser.newContext({viewport: {width: 390, height: 740}, isMobile: true});
  try {
    const page = await context.newPage();
    await page.goto(base, {waitUntil: 'load'});
    await page.waitForFunction(() => !!navigator.serviceWorker.controller);
    await context.setOffline(true);
    for (const chapter of chapters) {
      const route = '?class=9&chapter=g9-ch' + chapter.number + '&section=concepts&concept=' + chapter.keys[0];
      await page.goto(base + route, {waitUntil: 'domcontentloaded'});
      await page.locator('#langTa').click();
      assert.match(await page.locator('[data-panel] h4').innerText(), /[஀-௿]/);
      assert.equal(await page.locator('.g9-investigation-diagram svg').isVisible(), true);
    }
  } finally {
    await context.close();
  }
}

async function main() {
  const liveBase = process.env.TRIGGLE_CONCEPT_LIVE_BASE;
  const app = liveBase ? null : await server();
  const base = liveBase || app.base + '/index.html';
  const browser = await chromium.launch(launchOptions());
  try {
    for (const width of [320, 390, 412]) {
      const context = await browser.newContext({
        viewport: {width, height: 740}, isMobile: true, hasTouch: true, serviceWorkers: 'block',
        ignoreHTTPSErrors: Boolean(liveBase)
      });
      try {
        const page = await context.newPage();
        const errors = [];
        page.on('pageerror', error => errors.push(error.message));
        for (const chapter of chapters) {
          await checkChapter(page, base, chapter, width, 'en');
          await checkChapter(page, base, chapter, width, 'ta');
        }
        assert.deepEqual(errors, []);
      } finally {
        await context.close();
      }
    }
    if (!liveBase) await checkOffline(browser, base);
    console.log('PASS Grade 9 Geometry, Coordinate Geometry and Trigonometry menus and lessons in English and Tamil at 320/390/412px.');
  } finally {
    await browser.close();
    await app?.close();
  }
}

main().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
