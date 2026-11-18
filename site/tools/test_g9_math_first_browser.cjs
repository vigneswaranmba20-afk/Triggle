'use strict';
const assert = require('node:assert/strict');
const { chromium } = require('playwright');
const { server, launchOptions } = require('./dashboard_test_support.cjs');

const coefficient = 'g9-ch3-ex3.1-q2-i';
const coordinates = 'g9-ch5-ex5.2-q5';
const sets = 'g9-ch1-ex1.1-q3-b-i';
const statistics = 'g9-ch8-ex8.4-q1';
const radicals = 'g9-ch2-ex7-q2-i';
const samples = [sets, radicals, coefficient, 'g9-ch3-ex3.2-q4', 'g9-ch4-ex4.1-q4',
  coordinates, 'c9-exercise-6-4-q1-i', 'g9-ch7-ex7.2-q4', statistics, 'g9-ch9-ex9.1-q4'];
const widths = [320, 360, 390, 393, 412, 430, 768, 1280];
const formulaSelector = '#questionText .triggle-tex, #stepsList .triggle-tex';
const lesson = (base, id) => base + '/index.html?class=9&question=' + encodeURIComponent(id);

async function load(page, base, id) {
  await page.goto(lesson(base, id));
  await page.locator('body.g9-math-first #lessonCard').waitFor();
  await page.evaluate(async () => {
    await document.fonts.ready;
    await new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)));
  });
  assert.equal(new URL(page.url()).searchParams.get('question'), id);
}

async function sample(page, base, id, width) {
  await load(page, base, id);
  const name = `${id} at ${width}px`;
  const metrics = await page.evaluate(selector => {
    const font = element => parseFloat(getComputedStyle(document.querySelector(element)).fontSize);
    const details = [...document.querySelectorAll(selector)].map(formula => {
      const visual = formula.querySelector('.katex-html');
      return {
        visible: formula.clientHeight + 1 >= visual.getBoundingClientRect().height,
        accessible: !!formula.querySelector('math') && visual.getAttribute('aria-hidden') === 'true',
        overflow: formula.scrollWidth > formula.clientWidth + 1,
        tabIndex: formula.tabIndex,
      };
    });
    return {
      overflow: document.documentElement.scrollWidth > innerWidth + 1,
      question: font('#questionText'), reason: font('.step-reason'),
      answer: document.querySelectorAll('.final-answer-step').length,
      failures: document.querySelectorAll('[data-math-error]').length,
      details,
    };
  }, formulaSelector);
  assert.equal(metrics.overflow, false, name + ' page width');
  assert.equal(metrics.failures, 0, name + ' renders');
  assert(metrics.question >= 18 && metrics.reason >= 16, name + ' reading scale');
  assert.equal(metrics.answer, 1, name + ' visible final answer');
  for (const formula of metrics.details) {
    assert(formula.visible && formula.accessible, name + ' glyphs and MathML');
    if (formula.overflow) assert.equal(formula.tabIndex, 0, name + ' local overflow is keyboard accessible');
  }
  if (width <= 800) {
    await page.evaluate(() => window.scrollTo(0, document.scrollingElement.scrollHeight));
    const answer = await page.locator('.final-answer-step').boundingBox();
    const dock = await page.locator('#questionNavDock').boundingBox();
    assert(answer.y >= 0 && answer.y + answer.height <= dock.y + 1, name + ' answer clears dock');
  }
}

async function navigation(page, base) {
  await load(page, base, 'g9-ch3-ex3.1-q1-i');
  assert(await page.locator('#previous').isDisabled());
  await page.locator('#next').click();
  assert.equal(new URL(page.url()).searchParams.get('question'), 'g9-ch3-ex3.1-q1-ii');
  await page.goBack();
  await page.waitForFunction(() => document.querySelector('#previous').disabled);
  await load(page, base, 'g9-ch3-ex3.1-q12');
  assert(await page.locator('#next').isDisabled());

  await load(page, base, coefficient);
  assert.equal(await page.locator('#questionText .triggle-tex-display .mfrac').count(), 1);
  assert.equal(await page.locator('.final-answer-value .katex math').count(), 1);
  await page.locator('#langTa').click();
  assert.equal(await page.locator('html').getAttribute('lang'), 'ta');
  assert.equal(await page.locator('#questionText').getAttribute('lang'), 'en');
  await load(page, base, sets);
  assert.match(await page.locator('#questionText').innerText(), /\p{Script=Tamil}/u);
  await load(page, base, 'g9-ch2-ex3-q1-i');
  await page.locator('#figureBtn').click();
  assert(await page.locator('#figureDialog').isVisible());
  assert.equal(await page.locator('#closeDiagram').evaluate(el => el === document.activeElement), true);
  await page.keyboard.press('Escape');
  assert.equal(await page.locator('#figureDialog').isVisible(), false);
  await page.locator('#langEn').click();
  await load(page, base, statistics);
  const options = page.locator('#questionText .g9-question-option');
  assert.equal(await options.count(), 4);
  const labels = await options.evaluateAll(items => items.map(el => el.firstChild.textContent.trim()));
  assert.deepEqual(labels, ['(1)', '(2)', '(3)', '(4)']);
}

async function scrollFormula(page, base) {
  await load(page, base, coordinates);
  const formulas = page.locator(formulaSelector);
  const index = await formulas.evaluateAll(items => items.findIndex(el => el.tabIndex === 0));
  assert(index >= 0, 'Coordinate geometry has a genuinely wide expression at 320px');
  const formula = formulas.nth(index);
  await formula.focus();
  await page.keyboard.press('ArrowRight');
  await page.waitForFunction(index => document.querySelectorAll('#questionText .triggle-tex, #stepsList .triggle-tex')[index].scrollLeft > 0, index);
  assert.equal(new URL(page.url()).searchParams.get('question'), coordinates, 'Arrow keys scroll the formula');

  await formula.evaluate(el => { el.scrollLeft = 0; el.scrollIntoView({ block: 'center' }); });
  const { x, y, width, height } = await formula.boundingBox();
  const touch = await page.context().newCDPSession(page);
  const point = delta => ({ x: x + width * 0.8 - delta, y: y + height / 2 });
  await touch.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [point(0)] });
  for (const delta of [25, 55, 90]) {
    await touch.send('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints: [point(delta)] });
  }
  await touch.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
  await page.waitForFunction(index => document.querySelectorAll('#questionText .triggle-tex, #stepsList .triggle-tex')[index].scrollLeft > 0, index);
  await touch.detach();

  await page.setViewportSize({ width: 768, height: 852 });
  await page.waitForFunction(index => document.querySelectorAll('#questionText .triggle-tex, #stepsList .triggle-tex')[index].tabIndex === -1, index);
  assert.equal(await formula.getAttribute('aria-label'), null, 'Rotation removes unnecessary tab stops');
}

async function offline(browser, base) {
  const context = await browser.newContext({ viewport: { width: 393, height: 852 } });
  try {
    const page = await context.newPage();
    await load(page, base, radicals);
    await page.evaluate(id => localStorage.setItem('triggle.learned.v119', JSON.stringify([id])), radicals);
    await page.waitForFunction(() => navigator.serviceWorker.controller, undefined, { timeout: 20000 });
    assert((await page.evaluate(() => caches.keys())).some(key => key.includes('g9-math-first')));
    await context.setOffline(true);
    await page.reload();
    assert.equal(await page.locator('#markDone').getAttribute('aria-pressed'), 'true');
    assert.equal(await page.locator('[data-math-error]').count(), 0);
    assert(await page.locator('#stepsList .katex .sqrt').count(), 'Radical renders offline');
  } finally { await context.close(); }
}

async function rendererFallback(browser, base) {
  const context = await browser.newContext({ serviceWorkers: 'block' });
  try {
    const page = await context.newPage();
    await page.route(/\/assets\/math-notation\.js\?/, route => route.abort());
    await load(page, base, coefficient);
    assert.match(await page.locator('#questionText').innerText(), /4 \+ \(2\/5\)x² − 3x/);
    assert.equal(await page.locator('.final-answer-value').innerText(), 'Coefficient of x²: 2/5; coefficient of x: −3');
    assert.doesNotMatch(await page.locator('#stepsList').innerText(), /\[object Object\]/);
  } finally { await context.close(); }
}

(async () => {
  const app = await server();
  const browser = await chromium.launch(launchOptions());
  const errors = [];
  try {
    for (const width of widths) {
      const context = await browser.newContext({ viewport: { width, height: 852 },
        isMobile: width < 768, hasTouch: width < 768, reducedMotion: 'reduce', serviceWorkers: 'block' });
      try {
        const page = await context.newPage();
        page.on('pageerror', error => errors.push(error.message));
        for (const id of samples) await sample(page, app.base, id, width);
        if (width === 320) await scrollFormula(page, app.base);
        if (width === 393) await navigation(page, app.base);
      } finally { await context.close(); }
    }
    await offline(browser, app.base);
    await rendererFallback(browser, app.base);
    assert.deepEqual(errors, []);
    console.log(`PASS Class 9 math-first: ${samples.length} exercises in all nine chapters × ${widths.join('/')}px, keyboard/touch/rotation, bilingual navigation, figures, saved progress, offline and fallback.`);
  } finally {
    await browser.close();
    await app.close();
  }
})().catch(error => { console.error(error); process.exitCode = 1; });
