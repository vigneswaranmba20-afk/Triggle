'use strict';

const assert = require('node:assert/strict');
const {createHash} = require('node:crypto');
const {chromium} = require('playwright');
const {load} = require('./build_g9_math.cjs');
const {launchOptions, server} = require('./dashboard_test_support.cjs');
const {records} = require('../data/textbook-fidelity/g9-ch4-bilingual-20261124.json');

const phoneSizes = [[320, 740], [360, 800], [390, 844], [412, 915]];
const figureIds = new Set(['g9-ch4-ex4.1-q4','g9-ch4-ex4.2-q3','g9-ch4-ex4.2-q4','g9-ch4-ex4.2-q6','g9-ch4-ex4.3-q1','g9-ch4-ex4.3-q2','g9-ch4-ex4.3-q4','g9-ch4-ex4.3-q6']);
const fallback = /English.language question|Tamil (?:version not changed|unchanged)|English explanation/i;

function normalize(text) {
  return text.normalize('NFC').replace(/[−–—]/g, '-').replace(/[‘’]/g, "'").replace(/\s+/gu, '');
}

function equationText(step, lang) {
  if (lang !== 'ta' || !step.mathTa) return step.eq;
  return step.mathTa.map(part => typeof part === 'string' ? part : part.fallback).join('');
}

function questions() {
  const items = load().filter(item => Object.hasOwn(records, item.id));
  assert.equal(items.length, 11);
  assert.equal(items.reduce((count, item) => count + item.steps.length, 0), 42);
  assert.equal(items.flatMap(item => item.steps).filter(step => step.mathTa).length, 12);
  for (const item of items) {
    const digest = createHash('sha256').update(JSON.stringify(item)).digest('hex');
    assert.equal(digest, records[item.id].reviewedRecordSha256, item.id + ' reviewed bilingual source');
  }
  return items;
}

function readLesson() {
  function semanticText(node) {
    const copy = node.cloneNode(true);
    // KaTeX exposes parallel visual/MathML trees. Count each formula's accessible text once.
    for (const formula of copy.querySelectorAll('[data-math-fallback], math[aria-label]')) {
      formula.replaceWith(formula.getAttribute('data-math-fallback') ?? formula.getAttribute('aria-label'));
    }
    return copy.textContent;
  }
  const prompt = document.querySelector('#questionText');
  const steps = document.querySelector('#stepsList');
  const reasons = [...steps.querySelectorAll('.step-reason')];
  const equations = [...steps.querySelectorAll('.step-equation')];
  const answer = steps.querySelector('.final-answer-value');
  return {
    id: new URL(location.href).searchParams.get('question'),
    lang: document.documentElement.lang,
    prompt: semanticText(prompt),
    reasons: reasons.map(semanticText),
    equations: equations.map(semanticText),
    answer: semanticText(answer),
    visible: [prompt, ...reasons, ...equations, answer].every(el => el.getClientRects().length > 0 && getComputedStyle(el).visibility === 'visible'),
    mathErrors: [prompt, steps].reduce((sum, el) => sum + el.querySelectorAll('[data-math-error="true"], .katex-error').length, 0),
    typeset: steps.querySelectorAll('.katex').length,
    pageWidth: document.documentElement.scrollWidth,
    viewport: document.documentElement.clientWidth
  };
}

async function checkPhone(browser, base, items, width, height) {
  const context = await browser.newContext({
    viewport: {width, height}, isMobile: true, hasTouch: true, serviceWorkers: 'block'
  });
  try {
    const page = await context.newPage();
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    for (const item of items) {
      const url = new URL('index.html', base.replace(/\/?$/, '/'));
      url.searchParams.set('class', '9');
      url.searchParams.set('question', item.id);
      const response = await page.goto(url.toString(), {waitUntil: 'domcontentloaded'});
      assert(response?.ok(), item.id + ' reader loads');
      await page.locator('#stepsList .final-answer-value').waitFor();
      for (const lang of ['ta', 'en']) {
        const tag = item.id + ' ' + lang + ' ' + width + 'px';
        await page.locator(lang === 'ta' ? '#langTa' : '#langEn').tap();
        await page.waitForFunction(code => document.documentElement.lang === code, lang);
        await page.evaluate(() => document.fonts.ready);
        const actual = await page.evaluate(readLesson);
        assert.equal(actual.id, item.id, tag + ' route');
        assert.equal(actual.lang, lang, tag + ' active language');
        assert.equal(normalize(actual.prompt), normalize(records[item.id].prompt[lang]), tag + ' textbook prompt');
        assert.deepEqual(actual.reasons.map(normalize), Array.from(item.steps, step => normalize(step[lang])), tag + ' explanations');
        assert.deepEqual(actual.equations.map(normalize), Array.from(item.steps, step => normalize(equationText(step, lang))), tag + ' equations and labels');
        assert.equal(normalize(actual.answer), normalize(lang === 'ta' ? item.answerTa : item.answer), tag + ' final answer');
        assert.doesNotMatch([actual.prompt, ...actual.reasons, actual.answer].join(' '), fallback, tag + ' language fallback');
        assert(actual.visible, tag + ' reader fields visible');
        assert.equal(actual.mathErrors, 0, tag + ' valid notation');
        assert(actual.typeset > 0, tag + ' typeset mathematics');
        assert.equal(actual.viewport, width, tag + ' mobile viewport');
        assert(actual.pageWidth <= width + 1, tag + ' page fits without horizontal scrolling');
        // AUD12-02: the eight geometry illustrations must load in the student reader.
        if (figureIds.has(item.id)) {
          const figure = page.locator('#inlineFigure');
          const image = figure.locator('#inlineFigureVisual img');
          await image.waitFor({state: 'visible'});
          await image.evaluate(img => img.decode());
          const info = await image.evaluate(img => ({
            src: new URL(img.src).pathname,
            alt: img.alt,
            width: img.getBoundingClientRect().width,
            height: img.getBoundingClientRect().height,
            naturalWidth: img.naturalWidth
          }));
          const file = item.id.replace('g9-ch4-', '').replace(/\./g, '-') + '.svg';
          assert(info.src.endsWith('/assets/grade9-ch4/' + file), tag + ' correct figure');
          assert(info.naturalWidth > 0 && info.width > 0 && info.width <= width + 1 && info.height > 0, tag + ' figure loaded and fits');
          assert(info.alt.length > 0, tag + ' accessible figure');
          if (lang === 'ta') assert.match(info.alt, /[\u0B80-\u0BFF]/u, tag + ' Tamil alt text');
          const caption = await figure.locator('#inlineFigureCaption').innerText();
          assert(caption.trim().length > 0, tag + ' figure caption');
          if (lang === 'ta') assert.match(caption, /[\u0B80-\u0BFF]/u, tag + ' Tamil figure caption');
        }
      }
    }
    assert.deepEqual(errors, [], width + 'px uncaught reader errors');
    console.log('PASS Grade 9 Geometry ' + width + 'px, 11 questions and 42 explanations in each language');
  } finally {
    await context.close();
  }
}

async function main() {
  const items = questions();
  const browser = await chromium.launch(launchOptions());
  let app;
  try {
    if (!process.env.TRIGGLE_LIVE_BASE) app = await server();
    const base = process.env.TRIGGLE_LIVE_BASE || app.base;
    for (const [width, height] of phoneSizes) await checkPhone(browser, base, items, width, height);
    console.log('PASS 88 Geometry reader views, 336 explanations, 336 equation comparisons and 64 bilingual figure views');
  } finally {
    await browser.close();
    if (app) await app.close();
  }
}

main().catch(error => { console.error(error); process.exitCode = 1; });
