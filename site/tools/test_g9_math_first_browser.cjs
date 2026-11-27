'use strict';
const assert = require('node:assert/strict');
const { chromium } = require('playwright');
const { server, launchOptions } = require('./dashboard_test_support.cjs');

const coefficient = 'g9-ch3-ex3.1-q2-i';
const coordinates = 'g9-ch5-ex5.2-q5';
const sets = 'g9-ch1-ex1.1-q3-b-i';
const statistics = 'g9-ch8-ex8.4-q1';
const radicals = 'g9-ch2-ex7-q2-i';
const coefficientPairs = [
  ['i', [['2/5', '25', 'mfrac'], ['−3', '−3']]],
  ['ii', [['−2', '−2'], ['−√7', '−7', 'msqrt']]],
  ['iii', [['π', 'π'], ['−1', '−1']]],
  ['iv', [['√3', '3', 'msqrt'], ['√2', '2', 'msqrt']]],
  ['v', [['1', '1'], ['−7/2', '−72', 'mfrac']]],
];
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
  await page.waitForFunction(selector => [...document.querySelectorAll(selector)].every(formula =>
    formula.scrollWidth <= formula.clientWidth + 1 || formula.tabIndex === 0), formulaSelector, { timeout: 3000 });
  if (id === coordinates && width === 430) {
    const layoutWidth = await page.locator('#questionText .triggle-tex').first().evaluate(formula => {
      const tabIndex = formula.getAttribute('tabindex');
      formula.removeAttribute('tabindex');
      try { return document.documentElement.scrollWidth; }
      finally { if (tabIndex !== null) formula.setAttribute('tabindex', tabIndex); }
    });
    assert.equal(layoutWidth, width, name + ' the page fits before local scrolling is enabled');
  }
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
      viewport: innerWidth,
      question: font('#questionText'), reason: font('.step-reason'),
      answer: document.querySelectorAll('.final-answer-step').length,
      failures: document.querySelectorAll('[data-math-error]').length,
      details,
    };
  }, formulaSelector);
  assert.equal(metrics.overflow, false, name + ' page width');
  assert.equal(metrics.viewport, width, name + ' mobile viewport width');
  assert.equal(metrics.failures, 0, name + ' renders');
  assert(metrics.question >= 18 && metrics.question <= 22, name + ' responsive question size');
  assert.equal(metrics.reason, 16, name + ' worked instruction size');
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

async function checkExerciseLanguages(page, base, id, verify) {
  await load(page, base, id);
  try {
    for (const language of ['en', 'ta']) {
      await page.locator(language === 'en' ? '#langEn' : '#langTa').click();
      assert.equal(await page.locator('html').getAttribute('lang'), language);
      if (language === 'ta') {
        const prompt = page.locator('#questionText');
        assert.equal(await prompt.getAttribute('lang'), null);
        assert.match(await prompt.innerText(), /\p{Script=Tamil}/u);
      }
      assert.equal(await page.locator('[data-math-error]').count(), 0, id);
      assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), id + ' fits the page');
      await verify(`${id} in ${language} at ${page.viewportSize().width}px`, language);
    }
  } finally { await page.locator('#langEn').click(); }
}

async function coefficientConclusions(page, base) {
  for (const [part, pair] of coefficientPairs) {
    const id = 'g9-ch3-ex3.1-q2-' + part;
    await load(page, base, id);
    try {
      for (const language of ['en', 'ta']) {
        await page.locator(language === 'en' ? '#langEn' : '#langTa').click();
        assert.equal(await page.locator('html').getAttribute('lang'), language);
        if (language === 'ta') {
          assert.equal(await page.locator('#questionText').getAttribute('lang'), null);
          assert.match(await page.locator('#questionText').innerText(), /\p{Script=Tamil}/u);
        }
        assert.equal(await page.locator('[data-math-error]').count(), 0, id);
        assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), id + ' fits the page');
        const name = `${id} in ${language} at ${page.viewportSize().width}px`;
        const rows = page.locator('#stepsList > .worked-step:not(.final-answer-step)');
        for (const [index, [value, mathText, structure]] of pair.entries()) {
          const row = rows.nth(index + 1);
          const reason = row.locator('.step-reason');
          const term = index === 0 ? 'x²' : 'x';
          assert(await reason.isVisible(), name + ' shows the conclusion in the worked solution');
          const conclusion = await reason.evaluate(el => [...el.childNodes]
            .map(node => node.dataset?.mathFallback || node.textContent).join(''));
          if (language === 'en') {
            assert(conclusion.includes(`The coefficient of ${term} is ${value}.`), name + ' explains ' + term);
            if (part === 'iii' && index === 1) assert.match(conclusion, /negative one times x/);
            if (part === 'v' && index === 0) assert.match(conclusion, /understood even when it is not written/);
            const coefficient = await reason.locator('.triggle-tex').evaluateAll((elements, { value, structure }) => {
              const el = elements.find(element => element.dataset.mathFallback === value &&
                element.previousSibling?.textContent === ' is ');
              if (!el) return null;
              const semanticValue = el.querySelector('math semantics').firstElementChild;
              const glyph = el.querySelector('.katex-html').getBoundingClientRect();
              const box = el.getBoundingClientRect();
              return {
                value: semanticValue.textContent.replace(/\s+/g, ''),
                structured: !structure || semanticValue.matches(structure) || !!semanticValue.querySelector(structure),
                fits: glyph.x >= 0 && glyph.right <= innerWidth && (getComputedStyle(el).overflowY === 'visible' ||
                  glyph.y >= box.y - 1 && glyph.bottom <= box.bottom + 1),
              };
            }, { value, structure });
            assert.deepEqual(coefficient, { value: mathText, structured: true, fits: true }, name + ' displays the signed value in MathML');
          } else {
            assert.match(conclusion, /\p{Script=Tamil}/u, name + ' displays Tamil explanation');
          }
          if (index === 0) assert(await reason.locator('math msup').count(), name + ' typesets the exponent');
          assert((await row.locator('.step-equation math mo').allTextContents()).includes('⇒'), name + ' explains the arrow in the same row');
        }
      }
    } finally { await page.locator('#langEn').click(); }
  }
}

async function setLanguageAndStatistics(page, base) {
  for (const id of ['g9-ch1-ex1.2-q7', 'g9-ch1-ex1.2-q10-i']) {
    await checkExerciseLanguages(page, base, id, async name => {
      const exponent = page.locator('#stepsList .step-reason math msup').filter({ hasText: '2n(A)' });
      assert.equal(await exponent.count(), 1, name + ' typesets the power-set exponent in the explanation');
      const prose = await page.locator('#stepsList .step-reason').evaluateAll(nodes => nodes.flatMap(node =>
        [...node.childNodes].filter(child => child.nodeType === Node.TEXT_NODE).map(child => child.textContent)).join(' '));
      assert.doesNotMatch(prose, /\^\{n\(A\)\}/, name + ' displays no raw caret notation');
    });
  }
  const stats = [
    ['g9-ch8-ex8.2-q5', '30–40 is the median class', 'estimate the median at 31 marks', '31', ['L', '\\text{cf}', 'f', 'h']],
    ['g9-ch8-ex8.3-q5', 'The modal class is 20–30', 'The estimated mode is 24 marks', '24 marks', ['f_1', 'f_0', 'f_2']],
  ];
  for (const [id, interval, result, answer, symbols] of stats) {
    await checkExerciseLanguages(page, base, id, async (name, language) => {
      const reasons = page.locator('#stepsList .step-reason');
      const prose = await reasons.evaluateAll(nodes => nodes.map(node => [...node.childNodes]
        .map(child => child.dataset?.mathFallback || child.textContent).join('')));
      const phrases = language === 'en' ? [interval,result] : id.includes('ex8.2')
        ? ['30–40 தான் இடைநிலைப் பிரிவு','31 மதிப்பெண்கள்']
        : ['20–30 பிரிவே முகட்டுப் பிரிவு','24 மதிப்பெண்கள்'];
      for (const phrase of phrases) {
        const index = prose.findIndex(reason => reason.includes(phrase));
        assert(index >= 0 && await reasons.nth(index).isVisible(), name + ' explains ' + phrase);
      }
      const math = await reasons.nth(prose.findIndex(reason => reason.includes(phrases[0])))
        .locator('math annotation').allTextContents();
      assert.deepEqual(math, symbols, name + ' names the formula symbols using inline math');
      const final = page.locator('.final-answer-value');
      assert.equal(await final.evaluate(el => [...el.childNodes]
        .map(node => node.dataset?.mathFallback || node.textContent).join('')),
        language === 'ta' ? answer.replace('marks','மதிப்பெண்கள்') : answer, name + ' preserves the final answer');
    });
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
  assert.equal(await page.locator('#questionText').getAttribute('lang'), null);
  assert.match(await page.locator('#questionText').innerText(), /\p{Script=Tamil}/u);
  await load(page, base, sets);
  assert.match(await page.locator('#questionText').innerText(), /\p{Script=Tamil}/u);
  await load(page, base, 'g9-ch2-ex3-q1-i');
  await page.locator('#inlineFigureOpen:visible, #figureBtn:visible').click();
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

async function glyphWidthReflow(page, base) {
  // Regression: KaTeX glyph width may change after its parent was measured,
  // especially on mobile font load. That must refresh keyboard scrollability.
  await load(page, base, coordinates);
  const formulas = page.locator(formulaSelector);
  const index = await formulas.evaluateAll(items => items.findIndex(el =>
    el.classList.contains('triggle-tex-display') && el.clientWidth > 50 && !!el.querySelector('.katex-html')));
  assert(index >= 0, 'A visible formula with KaTeX glyphs exists');
  const formula = formulas.nth(index);
  await formula.evaluate(el => {
    const glyphs = el.querySelector('.katex-html');
    glyphs.style.minWidth = (innerWidth + 140) + 'px';
  });
  try {
    await page.waitForFunction(i => {
      const el=document.querySelectorAll('#questionText .triggle-tex, #stepsList .triggle-tex')[i];
      return !!el && el.scrollWidth > el.clientWidth + 15 && el.tabIndex === 0
        && el.getAttribute('role') === 'group'
        && el.getAttribute('aria-label') === 'Scrollable mathematical expression';
    }, index, { timeout: 6000 });
  } finally {
    await formula.evaluate(el => el.querySelector('.katex-html')?.style.removeProperty('min-width'));
  }
  // After restoring natural width, every actually overflowing expression
  // remains keyboard reachable; a fitting expression may lose its tab stop.
  await page.waitForFunction(() => [...document.querySelectorAll(
    '#questionText .triggle-tex, #stepsList .triggle-tex'
  )].every(el => el.scrollWidth <= el.clientWidth + 1 || el.tabIndex === 0));
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
    const reasons = await page.locator('#stepsList .step-reason').allTextContents();
    assert(reasons[1].includes('The coefficient of x² is 2/5.'));
    assert(reasons[2].includes('The coefficient of x is −3.'));
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
        if (width === 320 || width === 393) {
          await coefficientConclusions(page, app.base);
          await setLanguageAndStatistics(page, app.base);
        }
        if (width === 320) await scrollFormula(page, app.base);
        if (width === 430) await glyphWidthReflow(page, app.base);
        if (width === 393) await navigation(page, app.base);
      } finally { await context.close(); }
    }
    await offline(browser, app.base);
    await rendererFallback(browser, app.base);
    assert.deepEqual(errors, []);
    console.log(`PASS Class 9 math-first: ${samples.length} exercises in all nine chapters × ${widths.join('/')}px, keyboard/touch/rotation, bilingual navigation, figures, saved progress, offline and fallback.`);
    console.log('PASS Class 9 explanations: all five coefficient pairs, Set Language exponents and grouped median/mode in English and Tamil shells at 320/393px.');
  } finally {
    await browser.close();
    await app.close();
  }
})().catch(error => { console.error(error); process.exitCode = 1; });
