'use strict';
const assert = require('node:assert/strict');
const { chromium } = require('playwright');
const { server, launchOptions } = require('./dashboard_test_support.cjs');

const batches = ['a', 'b', 'c', 'd'].map(letter =>
  require('../../docs/curriculum/grade-10/batches/g10-ch3-final-' + letter + '.json'));
const all = batches.flatMap(batch => batch.records);
const baseLive = process.env.TRIGGLE_ALGEBRA_LIVE;
const representativeIds = new Set([
  'c10-3-ex3-16-q1-i', 'c10-3-ex3-16-q3', 'c10-3-ex3-16-q6',
  'c10-3-ex3-17-q1-iii', 'c10-3-ex3-17-q3-ii', 'c10-3-ex3-18-q5-ii',
  'c10-3-ex3-19-q4', 'c10-3-ex3-19-q11', 'c10-3-ex3-19-q12',
  'c10-3-ex3-20-q7', 'c10-3-ex3-20-q20',
  'c10-3-ex3-unit-q7', 'c10-3-ex3-unit-q17-ii', 'c10-3-ex3-unit-q18'
]);
const specimens = all.filter(item => representativeIds.has(item.id));
assert.equal(specimens.length, representativeIds.size);
const widths = [320, 360, 390, 412];

function questionUrl(base, id) {
  return `${base}/index.html?class=10&question=${encodeURIComponent(id)}`;
}

async function checkReader(page, item, lang, width) {
  const result = await page.evaluate(() => {
    const reader = '#questionText, #stepsList, #answerText';
    const math = [...document.querySelectorAll('#questionText .katex-html, #stepsList .katex-html, #answerText .katex-html')];
    const unreachable = math.filter(node => {
      const formula = node.closest('.triggle-tex');
      const rect = node.getBoundingClientRect();
      if (rect.width === 0 || (rect.left >= 0 && rect.right <= innerWidth + 1 && formula.scrollWidth <= formula.clientWidth + 1)) return false;
      const scrolling = formula.scrollWidth > formula.clientWidth + 1 && formula.clientWidth > 0 &&
        ['auto', 'scroll'].includes(getComputedStyle(formula).overflowX);
      return !scrolling || formula.tabIndex !== 0;
    }).map(node => node.closest('.triggle-tex').dataset.mathFallback);
    const img = document.querySelector('#inlineFigureVisual img');
    return {
      overflow: document.documentElement.scrollWidth - innerWidth,
      math: math.length,
      errors: [...document.querySelectorAll(reader)].reduce((sum, node) => sum + node.querySelectorAll('[data-math-error]').length, 0),
      unreachable,
      text: document.querySelector('#questionText').textContent,
      steps: [...document.querySelectorAll('.worked-step:not(.final-answer-step) .step-reason')].map(node => node.textContent),
      answer: document.querySelector('#answerText').textContent,
      difficulty: document.querySelector('#kindBadge').textContent,
      why: document.querySelector('.why-step-g10 .why-step-panel')?.textContent,
      image: img && img.complete && img.naturalWidth > 0 && img.clientWidth > 0,
      alt: img?.alt,
      tableCount: document.querySelectorAll('#questionText .triggle-data-table').length
    };
  });
  const label = item.id + ' ' + lang + ' @' + width;
  assert.ok(result.overflow <= 1, 'Page overflow ' + label + ' by ' + result.overflow);
  assert.equal(result.errors, 0, 'Math rendering error ' + label);
  assert.deepEqual(result.unreachable, [], 'Clipped math ' + label);
  assert.ok(result.math > 0, 'KaTeX missing ' + label);
  assert.ok(result.answer.trim(), 'Final answer missing ' + label);
  assert.ok(result.difficulty.trim(), 'Difficulty missing ' + label);
  assert.ok(result.why, 'Why this step missing ' + label);
  if (item.figureSrc) {
    assert.ok(result.image, 'Graph missing ' + label);
    assert.equal(result.tableCount, 1, 'Graph table missing ' + label);
  }
  if (lang === 'ta') {
    assert.match(result.text, /\p{Script=Tamil}/u, label);
    assert.ok(result.steps.every(step => /\p{Script=Tamil}/u.test(step)), label);
    assert.match(result.why, /\p{Script=Tamil}/u, label);
    if (item.figureSrc) assert.match(result.alt, /\p{Script=Tamil}/u, label);
  }
}

async function run() {
  const app = baseLive ? null : await server();
  const base = baseLive || app.base;
  const browser = await chromium.launch(launchOptions());
  try {
    const page = await browser.newPage({viewport: {width: 390, height: 844}, serviceWorkers: 'block'});
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    const sweep = process.env.TRIGGLE_ALGEBRA_EXHAUSTIVE === '1' ? all : specimens;
    for (const lang of ['en', 'ta']) {
      await page.goto(questionUrl(base, specimens[0].id));
      await page.locator(lang === 'ta' ? '#langTa' : '#langEn').click();
      for (const item of sweep) {
        await page.goto(questionUrl(base, item.id));
        await page.locator('#stepsList .worked-step').first().waitFor();
        await page.waitForFunction(() => document.querySelector('.why-step-g10'));
        if (item.figureSrc) await page.waitForFunction(() => document.querySelector('#inlineFigureVisual img')?.naturalWidth > 0);
        for (const width of widths) {
          await page.setViewportSize({width, height: 844});
          await page.waitForFunction(() => document.fonts.status === 'loaded');
          await checkReader(page, item, lang, width);
        }
      }
    }
    await page.setViewportSize({width: 320, height: 844});
    await page.goto(questionUrl(base, 'c10-3-ex3-16-q1-i'));
    await page.locator('#inlineFigureOpen').click();
    await page.locator('#figureDialog[open] #diagramContent img').waitFor();
    await page.locator('#closeDiagram').click();
    await page.locator('#next').click();
    await page.waitForURL(/question=c10-3-ex3-16-q1-ii/);
    await page.locator('#previous').click();
    await page.waitForURL(/question=c10-3-ex3-16-q1-i/);
    await page.locator('#exerciseIndexLink').click();
    await page.waitForURL(/section=exercises/);
    const exerciseIndex = await page.locator('body').textContent();
    for (const exercise of ['3.16', '3.17', '3.18', '3.19', '3.20']) {
      assert.ok(exerciseIndex.includes(exercise), 'Missing exercise in chapter index: ' + exercise);
    }
    await page.goto(questionUrl(base, 'c10-3-ex3-20-q20'));
    const choices = page.locator('.triggle-mcq-btn');
    assert.equal(await choices.count(), 4);
    await choices.nth(1).click();
    assert.equal(await page.locator('.triggle-mcq-feedback.is-wrong').count(), 1);
    await choices.nth(0).click();
    assert.match(await page.locator('.triggle-mcq-feedback.is-correct').textContent(), /சரியான விடை/);
    await page.locator('#langEn').click();
    await choices.nth(0).click();
    assert.match(await page.locator('.triggle-mcq-feedback.is-correct').textContent(), /Correct/);
    for (const item of all.filter(record => record.figureSrc)) {
      await page.goto(new URL(item.figureSrc, base + '/').href);
      const clippedLabels = await page.evaluate(() => {
        const svg = document.querySelector('svg');
        const {x, y, width, height} = svg.viewBox.baseVal;
        return [...svg.querySelectorAll('text')].filter(label => {
          const box = label.getBBox();
          return box.x < x || box.y < y || box.x + box.width > x + width || box.y + box.height > y + height;
        }).map(label => label.textContent);
      });
      assert.deepEqual(clippedLabels, [], 'Clipped graph labels in ' + item.figureSrc);
    }
    assert.deepEqual(errors, []);
    await page.close();

    const offline = await browser.newContext({viewport: {width: 360, height: 800}});
    try {
      const cached = await offline.newPage();
      const url = questionUrl(base, 'c10-3-ex3-16-q3');
      await cached.goto(url);
      await cached.evaluate(() => navigator.serviceWorker.ready);
      await cached.waitForFunction(() => navigator.serviceWorker.controller !== null, null, {timeout: 60000});
      await offline.setOffline(true);
      await cached.reload();
      await cached.locator('#stepsList .katex').first().waitFor();
      await cached.waitForFunction(() => document.querySelector('#inlineFigureVisual img')?.naturalWidth > 0);
      await cached.goto(questionUrl(base, 'c10-3-ex3-17-q3-ii'));
      await cached.locator('#stepsList .katex-html .mtable').first().waitFor();
    } finally {
      await offline.close();
    }
    console.log('PASS Grade 10 Algebra browser: ' + sweep.length + ' records, 320/360/390/412px, EN/TA, graph, MCQ feedback, navigation, offline graphics and KaTeX.');
  } finally {
    await browser.close();
    await app?.close();
  }
}

run().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
