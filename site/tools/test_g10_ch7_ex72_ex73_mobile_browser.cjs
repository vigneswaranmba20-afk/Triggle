'use strict';
/* Chapter 7 Mensuration Exercises 7.2 & 7.3: mobile-browser QA at 320/390/412px.
 * Checks EN/TA bilingual toggle, KaTeX typesetting, SVG diagrams + modal,
 * exercise-bounded navigation, zero horizontal overflow, and zero console/HTTP errors.
 */
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { chromium } = require('playwright');
const { server, launchOptions } = require('./dashboard_test_support.cjs');

const requiredIds = [
  'c10-7-ex7-2-q1',
  'c10-7-ex7-2-q8',
  'c10-7-ex7-2-q9',
  'c10-7-ex7-2-q10',
  'c10-7-ex7-3-q3',
  'c10-7-ex7-3-q4',
  'c10-7-ex7-3-q5',
  'c10-7-ex7-3-q6',
  'c10-7-ex7-3-q7-i',
  'c10-7-ex7-3-q7-ii',
  'c10-7-ex7-3-q7-iii',
];

const diagramIds = new Set(['c10-7-ex7-3-q4', 'c10-7-ex7-3-q6']);

const screenshotDir = path.resolve(
  __dirname,
  '../../docs/curriculum/grade-10/evidence/ex72-ex73-screenshots'
);

async function collectState(page) {
  return page.evaluate(() => {
    const lesson = document.querySelector('#lessonCard');
    const stepsList = document.querySelector('#stepsList');
    const stepsRight = stepsList ? stepsList.getBoundingClientRect().right : window.innerWidth;
    const img = lesson ? lesson.querySelector('#inlineFigureVisual img, img') : null;
    const clippedEquations = stepsList
      ? [...stepsList.querySelectorAll('.katex')]
          .map((el, index) => ({ index, right: el.getBoundingClientRect().right }))
          .filter((el) => el.right > stepsRight + 4)
      : [];
    return {
      question: (document.querySelector('#questionText')?.innerText || '').trim(),
      answer: (document.querySelector('#answerText')?.innerText || '').trim(),
      answerNumbers: [...document.querySelectorAll('.final-answer-value .katex-mathml mn')].map((el) => el.textContent),
      answerVisible: !!document.querySelector('.final-answer-value .katex')?.getClientRects().length,
      working: stepsList?.innerText || '',
      stepsKatex: lesson ? lesson.querySelectorAll('#stepsList .katex').length : 0,
      answerKatex: !!(lesson && lesson.querySelector('#answerText .katex')),
      mathErrors: lesson ? lesson.querySelectorAll('.katex-error, [data-math-error]').length : 0,
      clippedEquations,
      image: img
        ? {
            src: img.getAttribute('src') || '',
            ok: img.complete && img.naturalWidth > 0,
            width: img.getBoundingClientRect().width,
            height: img.getBoundingClientRect().height,
          }
        : null,
      viewportW: window.innerWidth,
      documentW: document.documentElement.scrollWidth,
    };
  });
}

function assertQuestionState(state, id, width, lang) {
  assert.ok(state.question.length > 15, `${id} ${width}px (${lang}): missing question text`);
  if (lang === 'ta') {
    assert.match(
      state.question,
      /[\u0B80-\u0BFF]/,
      `${id} ${width}px (ta): expected Tamil text in #questionText`
    );
  }
  assert.ok(state.answer.length > 2, `${id} ${width}px (${lang}): missing answer text`);
  assert.ok(
    state.stepsKatex >= 1,
    `${id} ${width}px (${lang}): expected KaTeX in #stepsList, found ${state.stepsKatex}`
  );
  assert.ok(state.answerKatex, `${id} ${width}px (${lang}): expected KaTeX in #answerText`);
  if (id === 'c10-7-ex7-3-q3') {
    assert.ok(state.answerVisible, `${id} ${width}px (${lang}): final answer must be visible`);
    assert.deepEqual(state.answerNumbers, [lang === 'en' ? '2' : '2.46', '3']);
    assert.match(state.working, lang === 'en' ? /answer keys give 2\.46 cm³/ : /ஆங்கில வினா.*2 கன செ\.மீ/);
  }
  assert.equal(
    state.mathErrors,
    0,
    `${id} ${width}px (${lang}): found ${state.mathErrors} KaTeX errors`
  );
  assert.deepEqual(
    state.clippedEquations,
    [],
    `${id} ${width}px (${lang}): equations clipped beyond #stepsList`
  );
  assert.ok(
    state.documentW <= state.viewportW + 1,
    `${id} ${width}px (${lang}): horizontal overflow ${state.documentW} > ${state.viewportW}`
  );
}

(async () => {
  fs.mkdirSync(screenshotDir, { recursive: true });
  const app = await server();
  const savedScreenshots = [];
  let browser;
  try {
    browser = await chromium.launch(launchOptions());
    for (const width of [320, 390, 412]) {
      const context = await browser.newContext({
        viewport: { width, height: 820 },
        isMobile: true,
        hasTouch: true,
        serviceWorkers: 'block',
        reducedMotion: 'reduce',
      });
      const page = await context.newPage();
      const pageErrors = [];
      const missingAssets = [];
      page.on('pageerror', (e) => pageErrors.push(e.message));
      page.on('response', (r) => {
        if (r.status() >= 400 && !r.url().endsWith('/favicon.ico')) {
          missingAssets.push(`${r.status()} ${r.url()}`);
        }
      });

      for (const id of requiredIds) {
        await page.goto(`${app.base}/index.html?class=10&question=${id}`, { waitUntil: 'load' });
        await page.locator('#lessonCard:not([hidden])').waitFor({ timeout: 7000 });
        await page.locator('#stepsList .katex').first().waitFor({ state: 'visible', timeout: 7000 });
        await page.evaluate(() => document.fonts.ready);

        // Ensure English mode first
        if ((await page.locator('#langEn').getAttribute('aria-pressed')) !== 'true') {
          await page.locator('#langEn').click();
          await page.waitForFunction(
            () => document.querySelector('#langEn')?.getAttribute('aria-pressed') === 'true'
          );
        }

        const enState = await collectState(page);
        assertQuestionState(enState, id, width, 'en');

        if (diagramIds.has(id)) {
          await page.locator('#inlineFigureVisual img').waitFor({ state: 'visible', timeout: 7000 });
          const figState = await collectState(page);
          assert.ok(
            figState.image && figState.image.ok,
            `${id} ${width}px: SVG figure failed to load (${JSON.stringify(figState.image)})`
          );
          await page.locator('#inlineFigureOpen').click();
          await page.locator('#figureDialog[open]').waitFor({ timeout: 4000 });
          const modalOk = await page
            .locator('#diagramContent img')
            .evaluate((img) => img.complete && img.naturalWidth > 0);
          assert.ok(modalOk, `${id} ${width}px: enlarged modal diagram failed to load`);
          await page.locator('#closeDiagram').click();
          const stillOpen = await page.locator('#figureDialog').evaluate((d) => d.open);
          assert.equal(stillOpen, false, `${id} ${width}px: diagram modal failed to close`);
        }

        // Representative EN screenshots
        if (
          (width === 320 && (id === 'c10-7-ex7-2-q8' || id === 'c10-7-ex7-3-q4' || id === 'c10-7-ex7-3-q6')) ||
          (width === 390 && (id === 'c10-7-ex7-2-q8' || id === 'c10-7-ex7-3-q4')) ||
          (width === 412 && (id === 'c10-7-ex7-2-q10' || id === 'c10-7-ex7-3-q6'))
        ) {
          const fname = `${width}px-${id}-en.png`;
          await page.screenshot({ path: path.join(screenshotDir, fname), fullPage: true });
          savedScreenshots.push(fname);
        }

        // Switch to Tamil mode and verify
        await page.locator('#langTa').click();
        await page.waitForFunction(
          () => document.querySelector('#langTa')?.getAttribute('aria-pressed') === 'true'
        );
        await page.locator('#stepsList .katex').first().waitFor({ state: 'visible', timeout: 7000 });
        await page.evaluate(() => document.fonts.ready);

        const taState = await collectState(page);
        assertQuestionState(taState, id, width, 'ta');

        // Representative TA screenshots
        if (
          (width === 320 && (id === 'c10-7-ex7-2-q8' || id === 'c10-7-ex7-3-q7-i')) ||
          (width === 390 && id === 'c10-7-ex7-3-q6') ||
          (width === 412 && id === 'c10-7-ex7-3-q7-iii')
        ) {
          const fname = `${width}px-${id}-ta.png`;
          await page.screenshot({ path: path.join(screenshotDir, fname), fullPage: true });
          savedScreenshots.push(fname);
        }

        // Switch back to EN for clean state
        await page.locator('#langEn').click();
        await page.waitForFunction(
          () => document.querySelector('#langEn')?.getAttribute('aria-pressed') === 'true'
        );
      }

      // Exercise-bounded navigation checks:
      // 1) On c10-7-ex7-2-q10, Next must NOT navigate to c10-7-ex7-3-q1
      await page.goto(`${app.base}/index.html?class=10&question=c10-7-ex7-2-q10`, {
        waitUntil: 'load',
      });
      await page.locator('#lessonCard:not([hidden])').waitFor({ timeout: 7000 });
      if (await page.locator('#next').isDisabled()) {
        assert.equal(
          await page.locator('#next').isDisabled(),
          true,
          `${width}px: ex7-2-q10 Next button should stop at end of exercise`
        );
      } else {
        await page.locator('#next').click();
        await page.waitForTimeout(300);
        const qAfter = new URL(page.url()).searchParams.get('question');
        assert.notEqual(
          qAfter,
          'c10-7-ex7-3-q1',
          `${width}px: ex7-2-q10 Next must NOT cross into c10-7-ex7-3-q1`
        );
      }

      // 2) On c10-7-ex7-3-q1, Previous must NOT navigate to c10-7-ex7-2-q10
      await page.goto(`${app.base}/index.html?class=10&question=c10-7-ex7-3-q1`, {
        waitUntil: 'load',
      });
      await page.locator('#lessonCard:not([hidden])').waitFor({ timeout: 7000 });
      if (await page.locator('#previous').isDisabled()) {
        assert.equal(
          await page.locator('#previous').isDisabled(),
          true,
          `${width}px: ex7-3-q1 Previous button should stop at start of exercise`
        );
      } else {
        await page.locator('#previous').click();
        await page.waitForTimeout(300);
        const qAfter = new URL(page.url()).searchParams.get('question');
        assert.notEqual(
          qAfter,
          'c10-7-ex7-2-q10',
          `${width}px: ex7-3-q1 Previous must NOT cross into c10-7-ex7-2-q10`
        );
      }

      // 3) On c10-7-ex7-3-q7-iii, Next must NOT cross into another exercise
      await page.goto(`${app.base}/index.html?class=10&question=c10-7-ex7-3-q7-iii`, {
        waitUntil: 'load',
      });
      await page.locator('#lessonCard:not([hidden])').waitFor({ timeout: 7000 });
      if (await page.locator('#next').isDisabled()) {
        assert.equal(
          await page.locator('#next').isDisabled(),
          true,
          `${width}px: ex7-3-q7-iii Next button should stop at end of exercise`
        );
      } else {
        await page.locator('#next').click();
        await page.waitForTimeout(300);
        const qAfter = new URL(page.url()).searchParams.get('question');
        assert.ok(
          !qAfter || qAfter.startsWith('c10-7-ex7-3-'),
          `${width}px: ex7-3-q7-iii Next crossed into another exercise: ${qAfter}`
        );
      }

      assert.deepEqual(pageErrors, [], `JS errors at ${width}px: ${pageErrors.join('; ')}`);
      assert.deepEqual(missingAssets, [], `HTTP errors at ${width}px: ${missingAssets.join('; ')}`);
      await context.close();
    }

    console.log(
      `PASS G10 Mensuration 7.2 & 7.3 mobile: all ${requiredIds.length} required questions verified in EN & TA at 320/390/412px, KaTeX, SVG diagrams + modal, exercise-bounded navigation, zero overflow/errors.`
    );
    console.log(`Screenshots (${savedScreenshots.length}): ${savedScreenshots.join(', ')}`);
  } finally {
    if (browser) await browser.close();
    await app.close();
  }
})().catch((e) => {
  console.error(e);
  process.exitCode = 1;
});
