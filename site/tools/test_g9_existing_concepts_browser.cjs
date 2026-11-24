'use strict';

const assert = require('node:assert/strict');
const { chromium } = require('playwright');
const { launchOptions, server } = require('./dashboard_test_support.cjs');

const chapters = {
  1: { path: 'TRIGGLE_SET_PATH', total: 7 },
  2: { path: 'TRIGGLE_REAL_PATH', total: 8 },
  3: { path: 'TRIGGLE_ALGEBRA_PATH', total: 10 },
  7: { path: 'TRIGGLE_MENSURATION_PATH', total: 4 }
};

const setLanguage = (page, lang) => page.locator(lang === 'ta' ? '#langTa' : '#langEn').click();

async function checkChapter(page, base, chapter, lang, width) {
  const { path, total } = chapters[chapter];
  const route = base + '?class=9&chapter=g9-ch' + chapter;
  await page.goto(route, { waitUntil: 'domcontentloaded' });
  await setLanguage(page, lang);
  await page.locator('button[data-hub-section="concepts"]').click();
  const index = page.locator('[data-index-view]');
  const items = index.locator('.sp2-nav-button');
  const panel = page.locator('[data-panel]');
  assert.equal(await items.count(), total);
  const stages = await page.evaluate(name => window[name].stages.map(stage => ({
    title: stage.title,
    correct: stage.correct,
    exerciseIds: stage.practiceId ? [stage.practiceId] : (stage.relatedQuestionIds || [])
  })), path);

  for (const [number, stage] of stages.entries()) {
    const label = 'Chapter ' + chapter + ', concept ' + number + ', ' + lang + ', width ' + width;
    await items.nth(number).click();
    const heading = panel.locator('h4');
    assert.equal(await heading.innerText(), (number + 1) + '. ' + stage.title[lang], label);
    assert.equal(new URL(page.url()).searchParams.get('concept'), String(number), label);
    await setLanguage(page, lang === 'ta' ? 'en' : 'ta');
    assert.equal(new URL(page.url()).searchParams.get('concept'), String(number), label);
    await setLanguage(page, lang);

    const controls = panel.locator('[data-demo-controls] button, .g9a-choices button, .g9m-choices button');
    const unselected = controls.and(panel.locator('button[aria-pressed="false"]'));
    if (await unselected.count()) {
      const button = await unselected.first().elementHandle();
      await button.click();
      assert.equal(await button.getAttribute('aria-pressed'), 'true', label);
    } else {
      const slider = panel.locator('input[type="range"]');
      assert.equal(await slider.count(), 1, label);
      await slider.press('ArrowRight');
    }

    if (chapter === 3) {
      const options = panel.locator('.g9a-answer-options').first().locator('button');
      await options.last().click();
      const feedback = await panel.locator('.g9a-feedback').first().innerText();
      assert.match(feedback, lang === 'ta' ? /[\u0B80-\u0BFF]/ : /Correct|Check again/, label);
      await options.first().click();
      assert.notEqual(await panel.locator('.g9a-feedback').first().innerText(), feedback, label);
    } else {
      const answers = panel.locator('.sp2-answers').first().locator('button');
      const feedback = panel.locator('[data-feedback]');
      await answers.nth((stage.correct + 1) % 3).click();
      assert.match(await feedback.innerText(), lang === 'ta' ? /[\u0B80-\u0BFF]/ : /Not yet|Try again/, label);
      await panel.locator('[data-hint]').click();
      assert.ok(await feedback.innerText(), label);
      await answers.nth(stage.correct).click();
      assert.match(await feedback.innerText(), lang === 'ta' ? /சரி/ : /Correct|You got it/, label);
    }
    if (lang === 'ta') {
      const names = await panel.locator('svg[role="img"]').evaluateAll(nodes =>
        nodes.map(node => node.getAttribute('aria-label') || node.querySelector('title')?.textContent));
      assert.ok(names.every(name => /[\u0B80-\u0BFF]/.test(name)), label + ' localized diagrams');
      if (chapter === 3) {
        const displayed = await panel.locator('.g9a-choices, .g9a-verdict, .g9a-feedback').allInnerTexts();
        assert.doesNotMatch(displayed.join(' '), /Divisor|factor first|Factoring|Coinciding|Substitution|nonzero|degrees/i, label);
      }
    }
    assert.equal(await panel.locator('[data-math-error="true"]').count(), 0, label);
    assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), label + ' no page overflow');

    if (stage.exerciseIds.length) {
      const practice = panel.locator('.g10ch2-practice-link, .g9a-practice-btn').first();
      assert.ok(await practice.isVisible(), label + ' exercise link');
      if (lang === 'ta') assert.match(await practice.innerText(), /[\u0B80-\u0BFF]/, label);
      await practice.click();
      await page.waitForURL(url => stage.exerciseIds.includes(url.searchParams.get('question')));
      await page.goBack();
      assert.equal(new URL(page.url()).searchParams.get('concept'), String(number), label);
    }

    const previous = page.locator('[data-footer-prev]');
    assert.equal(await previous.isDisabled(), number === 0, label);
    if (number > 0) {
      await previous.click();
      assert.equal(new URL(page.url()).searchParams.get('concept'), String(number - 1), label);
      await page.locator('[data-footer-next]').click();
      assert.equal(new URL(page.url()).searchParams.get('concept'), String(number), label);
    }
    await page.locator('[data-back-index]').click();
    assert.ok(await index.isVisible(), label);
  }
}

(async () => {
  const app = process.env.TRIGGLE_EXISTING_LIVE ? null : await server();
  const base = process.env.TRIGGLE_EXISTING_LIVE || app.base + '/index.html';
  const browser = await chromium.launch(launchOptions());
  try {
    for (const width of [320, 390, 412]) {
      const context = await browser.newContext({ viewport: { width, height: 850 }, serviceWorkers: 'block' });
      const page = await context.newPage();
      const errors = [];
      page.on('pageerror', error => errors.push(error.message));
      try {
        for (const lang of ['en', 'ta']) {
          for (const chapter of [1, 2, 3, 7]) await checkChapter(page, base, chapter, lang, width);
        }
        assert.deepEqual(errors, [], 'Page errors at width ' + width);
      } finally {
        await context.close();
      }
    }
    console.log('Passed 29 existing Grade 9 concept routes in English and Tamil at 320, 390 and 412px.');
  } finally {
    await browser.close();
    if (app) await app.close();
  }
})().catch(error => { console.error(error); process.exitCode = 1; });
