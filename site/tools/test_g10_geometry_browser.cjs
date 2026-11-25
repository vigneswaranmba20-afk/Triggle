'use strict';

const assert = require('node:assert/strict');
const {chromium} = require('playwright');
const {server, launchOptions} = require('./dashboard_test_support.cjs');
const {items: previousItems} = require('../data/textbook-fidelity/g10-ch4-ex4-1-to-4-2.json');
const {items: newItems} = require('../data/textbook-fidelity/g10-ch4-ex4-3.json');
const items = [...previousItems,...newItems];

const recoveredText = locator => locator.evaluate(element => {
  const clone = element.cloneNode(true);
  for (const notation of clone.querySelectorAll('.triggle-tex')) {
    notation.replaceWith(clone.ownerDocument.createTextNode(notation.dataset.mathFallback));
  }
  return clone.textContent.trim();
});

async function checkLayout(page, id, width) {
  await page.evaluate(() => document.fonts.ready);
  const layout = await page.evaluate(() => {
    const reader = document.querySelector('.lesson-container');
    const bounds = el => el.getBoundingClientRect();
    return {
      viewport: innerWidth,
      pageWidth: document.documentElement.scrollWidth,
      readerWidth: reader.scrollWidth,
      readerVisibleWidth: reader.clientWidth,
      formulas: [...document.querySelectorAll('#lessonCard .triggle-tex')].map(el => ({
        height: el.clientHeight,
        glyphHeight: bounds(el.querySelector('.katex-html')).height,
        width: el.clientWidth,
        scrollWidth: el.scrollWidth,
        tabIndex: el.tabIndex
      })),
      controls: ['questionTopPrevious', 'questionTopNext', 'previous', 'next', 'figureBtn']
        .map(id => bounds(document.getElementById(id))).filter(rect => rect.width > 0)
        .map(({width, height}) => [width, height]),
      figure: document.querySelector('#inlineFigure:not([hidden]) #inlineFigureVisual img')?.getBoundingClientRect().toJSON()
    };
  });
  assert.equal(layout.viewport, width);
  assert.ok(layout.pageWidth <= width + 1 && layout.readerWidth <= layout.readerVisibleWidth + 1, id + ' reader overflow at ' + width);
  for (const f of layout.formulas) {
    assert.ok(f.height + 1 >= f.glyphHeight, id + ' formula clipped at ' + width);
    if (f.scrollWidth > f.width + 1) assert.equal(f.tabIndex, 0, id + ' overflow needs accessible scrolling');
  }
  for (const [w,h] of layout.controls) assert.ok(w >= 44 && h >= 44, id + ' small touch target at ' + width + ' (' + w + ' × ' + h + ')');
  if (layout.figure) {
    assert.ok(layout.figure.width >= 135 && layout.figure.height >= 60, id + ' figure is too small');
    assert.ok(layout.figure.left >= 0 && layout.figure.right <= width + 1, id + ' figure overflow');
  }
}

(async () => {
  const app = await server();
  let browser;
  try {
    browser = await chromium.launch(launchOptions());
    const route = id => app.base + '/index.html?class=10&question=' + encodeURIComponent(id);
    for (const width of [320, 360, 390, 412, 430]) {
      const context = await browser.newContext({viewport:{width,height:844},isMobile:true,hasTouch:true,serviceWorkers:'block',reducedMotion:'reduce'});
      const page = await context.newPage();
      const errors = [];
      page.on('pageerror', error => errors.push(error.message));
      for (const exercise of ['4.1','4.2','4.3']) {
        const group = items.filter(item => item.exercise === exercise);
        await page.goto(app.base + '/index.html?class=10&chapter=g10-ch4');
        await page.locator('.hub-section-card[data-hub-section="exercises"]').tap();
        await page.locator(`.hub-exercise-link[data-exercise="${exercise}"]`).tap();
        assert.ok(await page.locator('#questionTopPrevious').isDisabled());
        assert.ok(await page.locator('#previous').isDisabled());
        for (const [i, item] of group.entries()) {
          const {id, textbookPrompt} = item;
          assert.equal(new URL(page.url()).searchParams.get('question'), id);
          assert.equal(await recoveredText(page.locator('#questionText')), textbookPrompt.en);
          assert.equal(await page.locator('#lessonCard [data-math-error]').count(), 0, id);
          assert.ok(await page.locator('#stepsList .final-answer-step .katex').count(), id);
          const figure = page.locator('#inlineFigure:not([hidden]) #inlineFigureVisual img');
          if (await figure.count()) {
            await figure.evaluate(img => img.decode());
            assert.ok((await figure.getAttribute('alt')).length > 20);
          }
          await checkLayout(page, id, width);
          if (i === 0) {
            await page.locator('#questionTopNext').tap();
            assert.equal(new URL(page.url()).searchParams.get('question'), group[1].id);
            await page.locator('#questionTopPrevious').tap();
            assert.equal(new URL(page.url()).searchParams.get('question'), id);
            if (item.figure.inTextbooks) {
              await page.locator('#figureBtn').tap();
              assert.ok(await page.locator('#figureDialog').isVisible());
              await page.locator('#diagramContent img').evaluate(img => img.decode());
              await page.locator('#closeDiagram').tap();
              assert.ok(!await page.locator('#figureDialog').isVisible());
            }
          }
          if (i === 1) {
            await page.locator('#previous').tap();
            assert.equal(new URL(page.url()).searchParams.get('question'), group[0].id);
            await page.locator('#next').tap();
          }
          await page.locator('#langTa').tap();
          assert.equal(await recoveredText(page.locator('#questionText')), textbookPrompt.ta);
          assert.equal(await page.locator('#stepsList').getAttribute('lang'), 'ta');
          const reasons = await page.locator('#stepsList .worked-step:not(.final-answer-step) .step-reason').allInnerTexts();
          assert.ok(reasons.length && reasons.every(text => /[அ-ஹ]/.test(text)), id + ' visible Tamil working');
          if (i === 0 && item.figure.inTextbooks) {
            await page.locator('#figureBtn').tap();
            await page.locator('#diagramContent img').evaluate(img => img.decode());
            await page.locator('#closeDiagram').tap();
          }
          await checkLayout(page, id, width);
          await page.locator('#langEn').tap();
          if (i < group.length - 1) await page.locator('#next').tap();
        }
        assert.ok(await page.locator('#questionTopNext').isDisabled());
        assert.ok(await page.locator('#next').isDisabled());
      }
      assert.deepEqual(errors, []);
      await context.close();
      console.log(`PASS ${width}px touch layout, bilingual prompts, KaTeX, figures and both navigation positions for all 44 tasks.`);
    }

    const savedId = 'c10-4-ex4-1-q2';
    const context = await browser.newContext({viewport:{width:360,height:844},serviceWorkers:'allow'});
    await context.addInitScript(id => {
      if (!localStorage.getItem('triggle.learned.v119')) localStorage.setItem('triggle.learned.v119', JSON.stringify([id]));
    }, savedId);
    const page = await context.newPage();
    await page.goto(route(savedId));
    assert.equal(await page.locator('#markDone').getAttribute('aria-pressed'), 'true');
    await page.evaluate(async () => {
      await navigator.serviceWorker.ready;
      if (!navigator.serviceWorker.controller) {
        await new Promise(resolve => navigator.serviceWorker.addEventListener('controllerchange', resolve, {once:true}));
      }
    });
    await context.setOffline(true);
    for (const {id} of items) {
      await page.goto(route(id));
      const figure = page.locator('#inlineFigure:not([hidden]) #inlineFigureVisual img');
      if (await figure.count()) await figure.evaluate(img => img.decode());
      assert.ok(await page.locator('#stepsList .final-answer-step .katex').count());
    }
    await page.goto(route(savedId));
    assert.equal(await page.locator('#markDone').getAttribute('aria-pressed'), 'true');
    await context.close();

    const fallback = await browser.newContext({viewport:{width:320,height:844},serviceWorkers:'block'});
    await fallback.route('**/katex.min.js*', request => request.abort());
    const plain = await fallback.newPage();
    const {id,textbookPrompt} = items.find(item => item.id.endsWith('4-2-q12'));
    await plain.goto(route(id));
    assert.equal(await plain.locator('#questionText').textContent(), textbookPrompt.en);
    assert.match(await plain.locator('#stepsList .final-answer-step .math-fallback').textContent(), /2.20 cm/);
    await fallback.close();
    console.log('PASS all 44 direct routes offline, prior progress retained, and readable equation fallback.');
  } finally {
    if (browser) await browser.close();
    await app.close();
  }
})().catch(error => { console.error(error); process.exitCode = 1; });
