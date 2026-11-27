'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs/promises');
const path = require('node:path');
const {chromium, webkit} = require('playwright');
const {server, launchOptions} = require('./dashboard_test_support.cjs');

const pilot = [
  ['algebra', 9, 'g9-ch3-ex3.2-q1-i'],
  ['sets', 9, 'g9-ch1-ex1.1-q5-ii'],
  ['geometry', 10, 'c10-4-ex4-1-q1-i'],
  ['trigonometry', 10, 'c10-6-ex6-1-q1-i'],
  ['mensuration', 10, 'c10-7-ex7-1-q4'],
  ['matrices', 10, 'c10-3-ex3-unit-q18']
];
const viewports = [320, 360, 375, 390, 412, 430, 768, 1280]
  .map(width => ({name: String(width), width, height: 844}))
  .concat({name: 'landscape', width: 667, height: 375});
const output = process.env.TRIGGLE_SCREENSHOTS;
const before = process.env.TRIGGLE_BEFORE === '1';
const useWebKit = process.env.TRIGGLE_BROWSER === 'webkit';
const route = (grade, id) => '/index.html?class=' + grade + '&question=' + encodeURIComponent(id);

function readerMetrics() {
  const paragraph = document.querySelector('#questionText');
  const lesson = document.querySelector('#lessonCard');
  const range = document.createRange();
  const walker = document.createTreeWalker(paragraph, NodeFilter.SHOW_TEXT);
  for (let node = walker.nextNode(); node; node = walker.nextNode()) {
    if (node.textContent.trim() && node.parentElement.getBoundingClientRect().width > 0) {
      range.selectNodeContents(node);
      const firstLine = range.getClientRects()[0];
      if (firstLine?.width) break;
    }
  }
  const style = getComputedStyle(paragraph);
  const heading = document.querySelector('#questionHead');
  const firstWord = document.createRange();
  firstWord.setStart(heading.firstChild, 0);
  firstWord.setEnd(heading.firstChild, heading.textContent.split(/\s/)[0].length);
  const rect = paragraph.getBoundingClientRect();
  const bounds = el => el.getBoundingClientRect();
  const formulas = [...lesson.querySelectorAll('.triggle-tex')].filter(el => el.offsetWidth && el.offsetHeight);
  const clips = formulas.filter(el => {
    const box = bounds(el);
    return [...el.querySelectorAll('.katex-html > .base')].some(glyph => {
      const g = bounds(glyph);
      return g.top < box.top - 2 || g.bottom > box.bottom + 2;
    });
  }).length;
  const wide = formulas.filter(el => el.scrollWidth > el.clientWidth + 1);
  const overlapping = selector => {
    const boxes = [...document.querySelectorAll(selector)].filter(el => el.offsetWidth && el.offsetHeight).map(bounds);
    return boxes.some((box, index) => boxes.slice(index + 1).some(other =>
      Math.min(box.right, other.right) - Math.max(box.left, other.left) > 1 &&
      Math.min(box.bottom, other.bottom) - Math.max(box.top, other.top) > 1));
  };
  const dock = document.querySelector('#questionNavDock');
  const controls = [...document.querySelectorAll(
    '#questionPicker, #quickSolutionAction, #langEn, #langTa, #figureBtn, #questionTopNext, #previous, #next'
  )].filter(el => el.offsetWidth).map(el => ({id: el.id, width: bounds(el).width, height: bounds(el).height}));
  return {
    promptY: Math.round(range.getClientRects()[0]?.top || rect.top + parseFloat(style.paddingTop)),
    headerHeight: Math.round(bounds(document.querySelector('.appbar')).height),
    promptSize: parseFloat(style.fontSize),
    promptText: paragraph.innerText,
    question: new URL(location.href).searchParams.get('question'),
    documentOverflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
    readerOverflow: lesson.scrollWidth - lesson.clientWidth,
    overlap: overlapping('.question-top > :not([hidden])') ||
      overlapping('.appbar .brand-mobile, .appbar #browseBtn, .appbar #homeBtn, .appbar .lang-switch'),
    replacementGlyphs: /�/.test(lesson.innerText),
    firstWordLines: firstWord.getClientRects().length,
    visibleQuestionHeadings: [...lesson.querySelectorAll('h1, h2')].filter(el => el.offsetWidth).map(el => el.innerText),
    displayMathSizes: [...new Set(formulas.filter(el => el.classList.contains('triggle-tex-display'))
      .map(el => Math.round(parseFloat(getComputedStyle(el.querySelector('.katex')).fontSize) * 10) / 10))],
    formulas: formulas.length,
    clips,
    wide: wide.length,
    wideWithoutKeyboard: wide.filter(el => el.tabIndex !== 0).length,
    mathErrors: lesson.querySelectorAll('.katex-error, [data-math-error]').length,
    mathMarkup: [...lesson.querySelectorAll('.triggle-tex .katex-mathml math')].length,
    dockHeight: Math.round(bounds(dock).height),
    controls
  };
}

async function testActions(page, base) {
  await page.goto(base + route(9, 'g9-ch1-ex1.1-q5-ii'));
  await page.locator('#langEn').click();
  const id = () => new URL(page.url()).searchParams.get('question');
  await page.locator('#questionPicker').click();
  assert.equal(await page.locator('#pathDialog').evaluate(dialog => dialog.open), true);
  assert.equal(await page.locator('#pathOptions button[aria-current="true"]').count(), 1);
  await page.locator('#pathOptions button').filter({hasText: /(?:Question|Q)\s*5\s*\(iii\)/}).click();
  assert.equal(id(), 'g9-ch1-ex1.1-q5-iii');
  await page.locator('#previous').click();
  assert.equal(id(), 'g9-ch1-ex1.1-q5-ii');
  await page.locator('#next').click();
  await page.locator('#langTa').click();
  assert.equal(id(), 'g9-ch1-ex1.1-q5-iii');
  await page.reload();
  assert.equal(await page.locator('html').getAttribute('lang'), 'ta');
  await page.goto(base + route(9, 'g9-ch1-ex1.1-q1-i'));
  await page.locator('#g9GeometryHint summary').click();
  assert.equal(await page.locator('#g9GeometryHint').evaluate(el => el.open), true);
  assert.equal(await page.locator('#deepSolutionAction').count(), 0);
  const reasoning = page.locator('#stepsList details.why-step-g9').first();
  await reasoning.locator('summary').click();
  assert.equal(await reasoning.evaluate(el => el.open), true);
  await page.locator('#quickSolutionAction').click();
  assert.equal(await page.locator('#stepsRegion').evaluate(el => el === document.activeElement), true);
  await page.goto(base + route(9, 'g9-ch3-ex3.2-q1-i'));
  await page.locator('#chapter8QuestionConcept').click();
  assert.equal(new URL(page.url()).searchParams.get('section'), 'concepts');
  await page.goBack();
  await page.locator('#exerciseIndexLink').click();
  assert.equal(new URL(page.url()).searchParams.get('section'), 'exercises');
  await page.goto(base + route(10, 'c10-4-ex4-1-q1-i'));
  assert.equal(await page.locator('#figureBtn').isVisible(), false, 'One enlargement control for an inline figure');
  assert.match(await page.locator('#inlineFigureCaption').innerText(), /\(ii\).*PQ/);
  await page.locator('#inlineFigureOpen').focus();
  await page.keyboard.press('Enter');
  assert.equal(await page.locator('#figureDialog').evaluate(dialog => dialog.open), true);
  await page.keyboard.press('Escape');
  assert.equal(await page.locator('#figureDialog').evaluate(dialog => dialog.open), false);
  assert.ok(await page.locator('#inlineFigureOpen').evaluate(el => el === document.activeElement));
  // Check 200% enlargement independently of the 320 CSS px reflow matrix.
  for (const width of [640, 320]) {
    await page.setViewportSize({width, height: 844});
    for (const language of ['#langEn', '#langTa']) {
      await page.locator(language).click();
      const zoomed = await page.evaluate(() => {
        const root = document.documentElement;
        root.style.fontSize = '200%';
        const dimensions = {viewport: root.clientWidth, page: root.scrollWidth};
        root.style.fontSize = '';
        return dimensions;
      });
      assert.ok(zoomed.page <= zoomed.viewport + 1, language + ' 200% text enlargement overflow at ' + width);
    }
  }
  await page.locator('#homeBtn').click();
  assert.equal(await page.locator('.home-copyright').innerText(), '© 2026 VER labs');
  for (const section of ['quizzes', 'activities']) {
    await page.goto(base + '/index.html?class=9&chapter=g9-ch3&section=' + section);
    for (const language of ['#langEn', '#langTa']) {
      await page.locator(language).click();
      const panel = page.locator('#chapterSectionContent');
      assert.ok((await panel.innerText()).trim(), section + ' has a localized empty state');
      assert.equal(await panel.locator('.hub-quiz-question').count(), 0);
    }
  }
  for (const grade of [11, 12]) {
    await page.goto(base + '/index.html?class=' + grade + '&chapter=g' + grade + '-ch1');
    await page.waitForURL(url => !url.search);
    assert.equal(await page.locator('#discoveryView').isVisible(), true);
  }
}

(async () => {
  const app = process.env.TRIGGLE_QA_URL ? null : await server();
  const base = process.env.TRIGGLE_QA_URL || app.base;
  const browser = useWebKit ? await webkit.launch() : await chromium.launch(launchOptions());
  const rows = [], failures = [];
  try {
    for (const {name, width, height} of viewports) {
      const context = await browser.newContext({
        viewport: {width, height}, isMobile: width <= 430, hasTouch: width <= 768,
        serviceWorkers: 'block', reducedMotion: 'reduce'
      });
      const page = await context.newPage();
      const errors = [];
      page.on('pageerror', error => errors.push(error.message));
      for (const [sample, grade, id] of pilot) {
        await page.goto(base + route(grade, id), {waitUntil: 'domcontentloaded'});
        await page.locator('#lessonCard:not([hidden]) #questionHead').waitFor();
        for (const lang of ['en', 'ta']) {
          if (await page.locator('html').getAttribute('lang') !== lang) await page.locator(lang === 'en' ? '#langEn' : '#langTa').click();
          await page.evaluate(async () => {
            await document.fonts.ready;
            await new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)));
          });
          const metrics = await page.evaluate(readerMetrics);
          const label = [sample, name, lang].join('-');
          rows.push({label, ...metrics});
          if (output && [320, 390, 1280].includes(width)) {
            await page.screenshot({path: path.join(output, label + '.png'), animations: 'disabled'});
          }
          if (before) continue;
          function check(condition, message) { if (!condition) failures.push(label + ' ' + message); }
          check(metrics.question === id, 'question changed or deep link failed');
          check(metrics.documentOverflow <= 1 && metrics.readerOverflow <= 1, 'page or reader overflowed');
          check(!metrics.overlap && !metrics.replacementGlyphs, 'controls overlap or a glyph is missing');
          check(metrics.firstWordLines === 1, 'question heading begins with a split word');
          check(metrics.mathErrors === 0 && metrics.clips === 0, 'invalid or clipped mathematics');
          check(metrics.wideWithoutKeyboard === 0, 'wide formula has no keyboard access');
          check(metrics.visibleQuestionHeadings.length === 1, 'expected one question heading');
          check(!/\\(?:d?frac|sqrt|begin|end|left|right)\b/.test(metrics.promptText), 'raw TeX in prompt');
          check(metrics.controls.every(target => target.height >= 47 && target.width >= 44), 'small essential control');
        }
      }
      if (!before && errors.length) failures.push(name + ' browser errors: ' + errors.join('; '));
      await context.close();
    }
    if (!before) {
      const context = await browser.newContext({viewport: {width: 390, height: 844}, serviceWorkers: 'block'});
      await testActions(await context.newPage(), base);
      await context.close();
    }
  } finally {
    if (output) await fs.writeFile(path.join(output, 'metrics.json'), JSON.stringify({rows, failures}, null, 2));
    await browser.close();
    await app?.close();
  }
  assert.deepEqual(failures, []);
  console.log('PASS VER Glyph · ' + (useWebKit ? 'WebKit' : 'Chromium') + ' · ' + rows.length + ' bilingual viewport snapshots');
})().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
