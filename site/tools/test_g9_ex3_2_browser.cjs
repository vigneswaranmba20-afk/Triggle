'use strict';

const assert = require('node:assert/strict');
const {chromium} = require('playwright');
const {server, launchOptions} = require('./dashboard_test_support.cjs');
const batch = require('../../docs/curriculum/grade-9/batches/g9-ch3-ex3-2-english.json');
const fidelity = require('../data/textbook-fidelity/g9-ch3-ex3-2.json');
const evidence = new Map(fidelity.items.map(row => [row.id, row]));

const recoveredText = locator => locator.evaluate(element => {
  const clone = element.cloneNode(true);
  for (const notation of clone.querySelectorAll('.triggle-tex')) {
    notation.replaceWith(clone.ownerDocument.createTextNode(notation.dataset.mathFallback));
  }
  return clone.textContent.trim();
});

async function checkGeometry(page, id) {
  const layout = await page.evaluate(() => ({
    viewport: innerWidth,
    pageWidth: document.documentElement.scrollWidth,
    formulas: [...document.querySelectorAll('#lessonCard .triggle-tex')].map(el => ({
      width: el.clientWidth,
      scrollWidth: el.scrollWidth,
      height: el.clientHeight,
      glyphHeight: el.querySelector('.katex-html').getBoundingClientRect().height
    })),
    figure: document.querySelector('#inlineFigureVisual img')?.getBoundingClientRect().toJSON()
  }));
  assert.ok(layout.pageWidth <= layout.viewport + 1, 'Page overflows for ' + id + ' at ' + layout.viewport);
  for (const formula of layout.formulas) {
    assert.ok(formula.height + 1 >= formula.glyphHeight, 'Clipped formula for ' + id);
    assert.ok(formula.scrollWidth <= formula.width + 1, 'Formula requires horizontal scrolling for ' + id + ' at ' + layout.viewport);
  }
  if (layout.figure) {
    assert.ok(layout.figure.width > 130 && layout.figure.height > 60, 'Readable figure for ' + id);
    assert.ok(layout.figure.left >= 0 && layout.figure.right <= layout.viewport + 1, 'Figure fits for ' + id);
  }
}

(async () => {
  const app = await server();
  let browser;
  try {
    browser = await chromium.launch(launchOptions());
    const route = id => app.base + '/index.html?class=9&question=' + encodeURIComponent(id);
    for (const width of [320, 360, 393, 430]) {
      const context = await browser.newContext({viewport: {width, height: 844}, isMobile: true, hasTouch: true, deviceScaleFactor: 2, serviceWorkers: 'block'});
      const page = await context.newPage();
      const errors = [];
      page.on('pageerror', error => errors.push(error.message));

      await page.goto(app.base + '/index.html?class=9&chapter=g9-ch3');
      await page.locator('.hub-section-card[data-hub-section="exercises"]').click();
      const link = page.locator('.hub-exercise-link[data-exercise="3.2"]');
      assert.equal(await link.count(), 1);
      await link.click();
      assert.equal(await page.locator('.hub-section-card[data-hub-section="examples"]').count(), 0);
      for (const [i, record] of batch.records.entries()) {
        assert.equal(new URL(page.url()).searchParams.get('question'), record.id);
        const card = page.locator('#lessonCard');
        const prompt = page.locator('#questionText');
        const final = page.locator('#stepsList .final-answer-step .triggle-tex');
        await page.evaluate(() => document.fonts.ready);
        assert.equal(await recoveredText(prompt), evidence.get(record.id).exactEnglish);
        assert.equal(await final.getAttribute('data-math-fallback'), record.answer);
        assert.equal(await page.locator('#stepsList .worked-step:not(.final-answer-step)').count(), record.steps.length);
        assert.equal(await page.locator('#stepsList .final-answer-step').count(), 1);
        assert.equal(await page.locator('#difficultyIndicator').isVisible(), true);
        assert.equal(await card.locator('.math-fallback').count(), 0);
        assert.ok(await card.locator('.katex math').count() > 0);
        assert.equal(await page.locator('#figureBtn').isVisible(), Boolean(record.figureSrc));
        if (record.figureSrc) {
          const image = page.locator('#inlineFigureVisual img');
          assert.equal(await image.getAttribute('alt'), record.figureAlt.en);
          await image.evaluate(el => el.decode());
          assert.equal(await page.locator('#inlineFigureCaption').textContent(), record.figureCaption.en);
          await page.locator('#inlineFigureOpen').click();
          assert.equal(await page.locator('#figureDialog').isVisible(), true);
          assert.equal(await page.locator('#diagramContent img').getAttribute('alt'), record.figureAlt.en);
          assert.equal(await page.locator('#visualTitle').textContent(), record.figureCaption.en);
          await page.locator('#closeDiagram').click();
          assert.equal(await page.locator('#figureDialog').isVisible(), false);
        }
        if (record.id === 'g9-ch3-ex3.2-q2') {
          assert.ok(await prompt.locator('msqrt').count() > 0);
          const why = page.locator('#stepsList details.why-step-g9');
          assert.equal(await why.evaluate(el => el.open), false);
          await why.locator('summary').click();
          assert.equal(await why.evaluate(el => el.open), true);
          await why.locator('summary').click();
        }
        if (record.id === 'g9-ch3-ex3.2-q4') {
          assert.equal(await final.locator('mfrac').count(), 3);
        }
        await checkGeometry(page, record.id);
        if (i < batch.records.length - 1) await page.locator('#next').click();
      }
      assert.equal(await page.locator('#next').isDisabled(), true);
      assert.match(await page.locator('#next').textContent(), /End of exercise/);
      assert.deepEqual(errors, []);
      await context.close();
      console.log('PASS Exercise 3.2 at ' + width + 'px: 20 records in order, complete prompts, KaTeX, figures and geometry.');
    }

    const context = await browser.newContext({viewport: {width: 360, height: 844}, serviceWorkers: 'allow'});
    const page = await context.newPage();
    const q4 = batch.records.find(record => record.id === 'g9-ch3-ex3.2-q4');
    await context.addInitScript(id => {
      if (!localStorage.getItem('triggle.learned.v119')) {
        localStorage.setItem('triggle.learned.v119', JSON.stringify([id]));
      }
    }, q4.id);
    await page.goto(route(q4.id));
    assert.equal(await page.locator('#markDone').getAttribute('aria-pressed'), 'true');
    await page.locator('#langTa').click();
    assert.match(await page.locator('#questionHead').textContent(), /English only/);
    assert.equal(await recoveredText(page.locator('#questionText')), q4.q.en);
    await page.locator('#langEn').click();
    await page.locator('#exerciseIndexLink').click();
    assert.equal(new URL(page.url()).searchParams.get('section'), 'exercises');

    await page.evaluate(async () => {
      await navigator.serviceWorker.ready;
      if (!navigator.serviceWorker.controller) {
        await new Promise(resolve => navigator.serviceWorker.addEventListener('controllerchange', resolve, {once: true}));
      }
    });
    await context.setOffline(true);
    for (const record of batch.records.filter(row => row.figureSrc)) {
      await page.goto(route(record.id));
      await page.locator('#inlineFigureVisual img').evaluate(image => image.decode());
      assert.ok(await page.locator('#stepsList .katex').count() > 0);
    }
    await page.goto(route('g9-ch3-ex3.2-q5-iii'));
    assert.ok(await page.locator('#stepsList mfrac').count() > 0);
    await context.close();

    const fallbackContext = await browser.newContext({viewport: {width: 320, height: 844}, serviceWorkers: 'block'});
    await fallbackContext.route('**/katex.min.js*', request => request.abort());
    const plain = await fallbackContext.newPage();
    const longest = batch.records.find(record => record.id === 'g9-ch3-ex3.2-q5-iii');
    await plain.goto(route(longest.id));
    assert.equal(await plain.locator('#questionText').textContent(), longest.q.en);
    assert.equal(await plain.locator('#stepsList .final-answer-step .math-fallback').textContent(), longest.answer);
    assert.equal(await plain.locator('#stepsList .step-equation .math-fallback').last().textContent(), longest.steps.at(-1).eq);
    await checkGeometry(plain, longest.id);
    await fallbackContext.close();
    console.log('PASS Exercise 3.2 offline figures and fractions, source text fallback, existing bookmark and learning progress.');
  } finally {
    if (browser) await browser.close();
    await app.close();
  }
})().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
