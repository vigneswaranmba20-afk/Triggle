'use strict';

const assert = require('node:assert/strict');
const {chromium} = require('playwright');
const {launchOptions, server} = require('./dashboard_test_support.cjs');
const sections = [
  {...require('../data/textbook-fidelity/g9-ch1-ex1-3.json'),concept:3,solutionFigures:[7],offlineFigure:6},
  {...require('../data/textbook-fidelity/g9-ch1-ex1-4.json'),concept:4,solutionFigures:[],offlineFigure:4},
  {...require('../data/textbook-fidelity/g9-ch1-ex1-5.json'),concept:5,solutionFigures:[4,9,11],offlineFigure:1},
  {...require('../data/textbook-fidelity/g9-ch1-ex1-6.json'),concept:6,solutionFigures:[7,9,12],offlineFigure:11},
  {...require('../data/textbook-fidelity/g9-ch1-ex1-7.json'),concept:5,solutionFigures:[],offlineFigure:19}
];

const index = '?class=9&chapter=g9-ch1&section=exercises';
const route = id => '?class=9&question=' + encodeURIComponent(id);
const currentId = page => new URL(page.url()).searchParams.get('question');
const normalize = value => value.normalize('NFC').replace(/\s+/gu,'');

async function checkReader(page, row, lang, section) {
  await page.locator(lang === 'ta' ? '#langTa' : '#langEn').click();
  await page.evaluate(() => document.fonts.ready);
  const state = await page.locator('#lessonCard').evaluate(card => {
    const question = card.querySelector('#questionText').cloneNode(true);
    for (const formula of question.querySelectorAll('[data-math-fallback]')) {
      formula.replaceWith(formula.getAttribute('data-math-fallback'));
    }
    const choices=[...question.querySelectorAll('.triggle-mcq-btn')].map(node=>node.textContent);
    for (const extra of question.querySelectorAll('.triggle-mcq-choices,.triggle-mcq-feedback')) extra.remove();
    return {
      choices,prompt:question.textContent, reasons:[...card.querySelectorAll('.step-reason')].map(node=>node.textContent),
      errors:card.querySelectorAll('[data-math-error="true"], .katex-error, .math-fallback').length,
      formulas:card.querySelectorAll('.katex').length,
      overflow:document.documentElement.scrollWidth > innerWidth + 1,
      truncated:[...card.querySelectorAll('.triggle-tex')].some(node =>
        node.clientWidth && node.scrollWidth > node.clientWidth + 1 && node.tabIndex !== 0)
    };
  });
  assert.equal(normalize(state.prompt), normalize(row.textbookPrompt[lang]), row.id + ' source ' + lang);
  const options=row.sourceStatus ? [] : row.textbookChoices||[];
  assert.deepEqual(state.choices.map(normalize),options.map(choice=>normalize(choice[lang])),row.id+' choice fidelity');
  if (options.length) {
    const buttons=page.locator('.triggle-mcq-btn');
    await buttons.nth((row.correctIndex+1)%4).click();
    assert(await page.locator('.triggle-mcq-feedback.is-wrong').isVisible());
    await buttons.nth(row.correctIndex).click();
    assert(await page.locator('.triggle-mcq-feedback.is-correct').isVisible());
  }
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
    if (section.solutionFigures.includes(row.question)) assert.equal(await inline.count(), 0, 'Construction figure remains part of the solution');
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
   for (const section of sections.filter(s => !process.env.TRIGGLE_SET_EXERCISE || s.exercise === process.env.TRIGGLE_SET_EXERCISE)) {
    const {items, exercise} = section;
    for (const width of live ? [390] : [320, 360, 390, 412]) {
      const ctx = await browser.newContext({viewport:{width,height:844}, isMobile:true, hasTouch:true, serviceWorkers:'block',ignoreHTTPSErrors:!!live});
      const page = await ctx.newPage();
      const errors = [];
      page.on('pageerror', error => errors.push(error.message));
      await page.goto(base + index, {waitUntil:'domcontentloaded'});
      await page.locator('.hub-exercise-link[data-exercise="'+exercise+'"]').click();
      assert.equal(currentId(page), items[0].id);
      assert(await page.locator('#previous').isDisabled(), 'Do not cross in from a different exercise');
      const sample = width===390 ? items : items.filter((row,i)=>
        i<2 || i===items.length-1 || row.sourceStatus || row.figureFiles.length ||
        (exercise==='1.4' && row.question===4) || (exercise==='1.5' && [3,8].includes(row.question)));
      for (const [i, row] of sample.entries()) {
        if(currentId(page)!==row.id) await page.goto(base+route(row.id),{waitUntil:'domcontentloaded'});
        assert.equal(currentId(page), row.id);
        await checkReader(page,row,'en',section);
        await checkReader(page,row,'ta',section);
        if (i===0 || (sample.length===items.length && i<items.length-1)) await page.locator('#next').click();
      }
      assert(await page.locator('#next').isDisabled(), 'Do not cross the final question');
      await page.locator('#previous').click();
      assert.equal(currentId(page), items.at(-2).id);
      await page.locator('#chapter8QuestionConcept').click();
      assert.equal(new URL(page.url()).searchParams.get('section'), 'concepts');
      assert.equal(new URL(page.url()).searchParams.get('concept'), String(section.concept));
      assert(await page.locator('.g10ch2-practice-link').filter({hasText:exercise}).first().isVisible());
      await page.goBack();
      assert.equal(currentId(page), items.at(-2).id);
      await page.locator('#exerciseIndexLink').click();
      assert(await page.locator('.hub-exercise-link[data-exercise="1.2"]').isVisible());
      assert.deepEqual(errors, []);
      await ctx.close();
      console.log('PASS Exercise '+exercise+' at '+width+'px: '+sample.length+' bilingual questions, figures, hints, and navigation');
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
      await checkReader(page,items[0],'ta',section);
      const figureRow = items.find(row=>row.question===section.offlineFigure);
      await page.goto(base + route(figureRow.id));
      await checkReader(page,figureRow,'ta',section);
      await ctx.close();
      console.log('PASS offline deep links, Tamil Venn diagrams and KaTeX, with student progress restored');
    }
   }
  } finally {
    await browser.close();
    if (app) await app.close();
  }
}

run().catch(error => { console.error(error); process.exitCode = 1; });
