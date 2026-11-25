'use strict';

const assert = require('node:assert/strict');
const {chromium} = require('playwright');
const {launchOptions, server} = require('./dashboard_test_support.cjs');
const {items} = require('../data/textbook-fidelity/g9-ch1-ex1-3.json');

const index = '?class=9&chapter=g9-ch1&section=exercises';
const route = id => '?class=9&question=' + encodeURIComponent(id);
const currentId = page => new URL(page.url()).searchParams.get('question');
const normalize = value => value.normalize('NFC').replace(/\s+/gu,'');

async function checkReader(page, row, lang) {
  await page.locator(lang === 'ta' ? '#langTa' : '#langEn').click();
  await page.evaluate(() => document.fonts.ready);
  const state = await page.locator('#lessonCard').evaluate(card => {
    const question = card.querySelector('#questionText').cloneNode(true);
    for (const formula of question.querySelectorAll('[data-math-fallback]')) {
      formula.replaceWith(formula.getAttribute('data-math-fallback'));
    }
    return {
      prompt:question.textContent, reasons:[...card.querySelectorAll('.step-reason')].map(node=>node.textContent),
      errors:card.querySelectorAll('[data-math-error="true"], .katex-error, .math-fallback').length,
      formulas:card.querySelectorAll('.katex').length,
      overflow:document.documentElement.scrollWidth > innerWidth + 1,
      truncated:[...card.querySelectorAll('.triggle-tex')].some(node =>
        node.clientWidth && node.scrollWidth > node.clientWidth + 1 && node.tabIndex !== 0)
    };
  });
  assert.equal(normalize(state.prompt), normalize(row.textbookPrompt[lang]), row.id + ' source ' + lang);
  assert.equal(state.errors, 0);
  assert(state.formulas > 1 && !state.overflow && !state.truncated, row.id + ' mathematical layout');
  if (lang === 'ta') assert(state.reasons.every(reason => /\p{Script=Tamil}/u.test(reason)), row.id + ' Tamil reasoning');
  assert(await page.locator('.final-answer-step').isVisible());
  assert(await page.locator('#difficultyIndicator').isVisible());
  assert(await page.locator('#g9GeometryHint summary').isVisible());
  assert(await page.locator('#chapter8QuestionConcept').isVisible());
  const why = page.locator('.why-step-g9 summary').first();
  await why.click();
  assert(await page.locator('.why-step-g9[open] .why-step-panel').first().isVisible());
  if (lang === 'ta') assert.match(await page.locator('.why-step-g9[open] .why-step-panel').first().innerText(), /\p{Script=Tamil}/u);

  if (row.figureFiles.length) {
    const expected = lang === 'ta' ? row.figureFiles.at(-1) : row.figureFiles[0];
    const inline = page.locator('#inlineFigure:not([hidden]) img');
    if (row.question === 7) assert.equal(await inline.count(), 0, 'Construction figure remains part of the solution');
    else {
      assert.equal(await inline.getAttribute('src'), expected);
      await inline.evaluate(node => node.decode());
    }
    await page.locator('#figureBtn').click();
    const image = page.locator('#diagramContent img');
    await image.evaluate(node => node.decode());
    assert.equal(await image.getAttribute('src'), expected);
    if (lang === 'ta') assert.match(await image.getAttribute('alt'), /\p{Script=Tamil}/u);
    await page.locator('#closeDiagram').click();
  }
}

async function run() {
  const live = process.env.TRIGGLE_LIVE_BASE?.replace(/\/$/, '');
  const app = live ? null : await server();
  const base = (live || app.base) + '/index.html';
  const browser = await chromium.launch(launchOptions());
  try {
    for (const width of live ? [390] : [320, 360, 390, 412]) {
      const ctx = await browser.newContext({viewport:{width,height:844}, isMobile:true, hasTouch:true, serviceWorkers:'block'});
      const page = await ctx.newPage();
      const errors = [];
      page.on('pageerror', error => errors.push(error.message));
      await page.goto(base + index, {waitUntil:'domcontentloaded'});
      await page.locator('.hub-exercise-link[data-exercise="1.3"]').click();
      assert.equal(currentId(page), items[0].id);
      assert(await page.locator('#previous').isDisabled(), 'Do not cross in from Exercise 1.2');
      for (const [i, row] of items.entries()) {
        assert.equal(currentId(page), row.id);
        await checkReader(page,row,'en');
        await checkReader(page,row,'ta');
        if (i < items.length - 1) await page.locator('#next').click();
      }
      assert(await page.locator('#next').isDisabled(), 'Do not cross the final question');
      await page.locator('#previous').click();
      assert.equal(currentId(page), items[5].id);
      await page.locator('#chapter8QuestionConcept').click();
      assert.equal(new URL(page.url()).searchParams.get('section'), 'concepts');
      assert.equal(new URL(page.url()).searchParams.get('concept'), '3');
      assert(await page.locator('.g10ch2-practice-link').filter({hasText:'1.3'}).isVisible());
      await page.goBack();
      assert.equal(currentId(page), items[5].id);
      await page.locator('#exerciseIndexLink').click();
      assert(await page.locator('.hub-exercise-link[data-exercise="1.2"]').isVisible());
      assert.deepEqual(errors, []);
      await ctx.close();
      console.log('PASS Exercise 1.3 at ' + width + 'px: seven bilingual questions, figures, hints, and navigation');
    }

    if (!live) {
      const ctx = await browser.newContext({viewport:{width:360,height:800}, isMobile:true, hasTouch:true});
      const page = await ctx.newPage();
      const id = items[0].id;
      const legacyId = 'g9-ch1-ex1.1-q1-i';
      await page.addInitScript(ids => {
        const key = 'triggle.learned.v119';
        if (localStorage.getItem(key) === null) localStorage.setItem(key, JSON.stringify(ids));
      }, [legacyId, id]);
      await page.goto(base + route(id));
      await page.waitForFunction(() => navigator.serviceWorker.controller !== null, {}, {timeout:30000});
      assert.equal(await page.locator('#markDone').getAttribute('aria-pressed'), 'true');
      await ctx.setOffline(true);
      await page.reload({waitUntil:'domcontentloaded'});
      assert.equal(currentId(page), id);
      assert.equal(await page.locator('#markDone').getAttribute('aria-pressed'), 'true');
      assert.deepEqual(await page.evaluate(() => JSON.parse(localStorage.getItem('triggle.learned.v119'))), [legacyId, id]);
      await checkReader(page,items[0],'ta');
      await page.goto(base + route(items[5].id));
      await checkReader(page,items[5],'ta');
      await ctx.close();
      console.log('PASS offline deep links, Tamil Venn diagrams and KaTeX, with student progress restored');
    }
  } finally {
    await browser.close();
    if (app) await app.close();
  }
}

run().catch(error => { console.error(error); process.exitCode = 1; });
