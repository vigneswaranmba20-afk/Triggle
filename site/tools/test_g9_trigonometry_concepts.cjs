'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const {chromium} = require('playwright');
const katex = require('../assets/vendor/katex/katex.min.js');
const {load} = require('./build_g9_math.cjs');
const {server, launchOptions} = require('./dashboard_test_support.cjs');

const source = fs.readFileSync(path.join(__dirname, '../data/g9-trigonometry-concepts.js'), 'utf8');
const {TRIGGLE_TRIGONOMETRY_LESSONS: lessons} = vm.runInNewContext(source + '\nwindow', {window: {}});
const sectionIds = ['6.1', '6.2', '6.3', '6.4'];
const keys = [1, 2, 0, 1];

function checkMath() {
  assert.deepEqual(Array.from(lessons, lesson => lesson.section), sectionIds);
  const questions = new Map(load().map(question => [question.id, question]));
  for (const [index, lesson] of lessons.entries()) {
    const bilingual = [lesson.title, lesson.intro, lesson.explanation, lesson.activity.label, lesson.check.question,
      lesson.check.hint, ...lesson.details.map(detail => detail.text),
      ...lesson.activity.options.flatMap(option => [option.label, option.result]),
      ...lesson.check.options.flatMap(option => [option.label, option.feedback])];
    assert.ok(bilingual.every(value => value.en && value.ta), lesson.section);
    assert.equal(lesson.check.options.filter(option => option.correct).length, 1);
    assert.equal(lesson.check.options[keys[index]].correct, true);
    assert.equal(questions.get(lesson.exercise).exercise, lesson.section);
    const formulas = [lesson, ...lesson.activity.options, ...lesson.details].map(node => node.math).filter(Boolean);
    for (const latex of formulas) assert.match(katex.renderToString(latex, {strict:'error', throwOnError:true}), /<math/);
  }
  const [ratios, specialAngles, complementary, tables] = lessons;
  assert.match(ratios.activity.options[0].math, /sin A=\\dfrac\{5\}\{13\}/);
  assert.match(ratios.activity.options[1].math, /sin C=\\dfrac\{12\}\{13\}/);
  assert.match(ratios.activity.options[0].diagram('ta'), /AB = 12 \(அடுத்துள்ள பக்கம்\), BC = 5 \(எதிர்ப்பக்கம்\), AC = 13 \(கர்ணம்\)/);
  assert.match(ratios.activity.options[1].diagram('ta'), /AB = 12 \(எதிர்ப்பக்கம்\), BC = 5 \(அடுத்துள்ள பக்கம்\), AC = 13 \(கர்ணம்\)/);
  assert.equal(Math.hypot(5, 12), 13);
  const exact = [
    [/\\sin/, Math.sin], [/\\cos/, Math.cos], [/\\tan/, Math.tan],
    [/\\operatorname\{cosec\}/, radians => 1 / Math.sin(radians)],
    [/\\sec/, radians => 1 / Math.cos(radians)], [/\\cot/, radians => 1 / Math.tan(radians)]
  ];
  const magnitude = token => token.startsWith('\\sqrt')
    ? Math.sqrt(Number(token.match(/[23]/u)[0])) : Number(token);
  const number = latex => {
    const fraction = latex.match(/^\\dfrac\{(\\sqrt\{[23]\}|\d)\}\{(\\sqrt\{[23]\}|\d)\}$/u);
    return fraction ? magnitude(fraction[1]) / magnitude(fraction[2]) : magnitude(latex);
  };
  for (const option of specialAngles.activity.options) {
    const angle = Number.parseInt(option.label.en, 10);
    const radians = angle * Math.PI / 180;
    const parts = option.math.replace('\\begin{gathered}', '').replace('\\end{gathered}', '').split(/\\\\|\\quad /u);
    const undefinedOperators = angle === 0 ? [3, 5] : angle === 90 ? [2, 4] : [];
    for (const [index, [operator, expected]] of exact.entries()) {
      const matched = parts.find(part => operator.test(part));
      if (undefinedOperators.includes(index)) {
        assert.equal(matched, undefined);
        assert.match(option.result.ta, /வரையறுக்கப்படவில்லை/);
      } else {
        assert.ok(matched, option.label.en);
        assert.ok(Math.abs(number(matched.split('=')[1]) - expected(radians)) < 1e-10, matched);
      }
    }
  }
  const alpha = Math.atan2(3, 4);
  const beta = Math.PI / 2 - alpha;
  const values = [Math.sin(alpha), Math.tan(alpha), 1 / Math.cos(alpha)];
  const complementaryValues = [Math.cos(beta), 1 / Math.tan(beta), 1 / Math.sin(beta)];
  complementary.activity.options.forEach((option, index) => {
    const actual = number(option.math.split('=')[1]);
    assert.ok(Math.abs(actual - values[index]) < 1e-10);
    assert.ok(Math.abs(actual - complementaryValues[index]) < 1e-10);
  });
  const tableCases = [
    [1925 + 9, '0.1934'], [9409 - 2, '0.9407'], [2162 + 12, '0.2174']
  ];
  for (const [index, [units, result]] of tableCases.entries()) {
    assert.equal((units / 10000).toFixed(4), result);
    assert.ok(tables.activity.options[index].math.includes(result));
  }
  const reverse = tables.activity.options[3];
  assert.equal(7660 - 7654, 6);
  assert.match(reverse.diagram('ta'), /<th scope="row">3′<\/th><td>6<\/td><td>0\.0006<\/td>/);
  assert.match(reverse.math, /40\^\{\\circ\}3\^\{\\prime\}/);
  console.log('PASS Grade 9 Trigonometry source map, exercise targets, all 30 special-angle values, complementary pairs, and table arithmetic.');
}

async function checkBrowser() {
  const live = process.env.TRIGGLE_TRIGONOMETRY_LIVE_BASE;
  const app = live ? null : await server();
  const route = (live || app.base + '/index.html') + '?class=9&chapter=g9-ch6';
  const browser = await chromium.launch(launchOptions());
  try {
    for (const width of [320, 390, 412]) {
      const context = await browser.newContext({viewport:{width, height:760}, hasTouch:true, isMobile:true, serviceWorkers:'block'});
      try {
        const page = await context.newPage();
        const errors = [];
        page.on('pageerror', error => errors.push(error.message));
        await page.goto(route, {waitUntil:'domcontentloaded'});
        for (const lang of ['en', 'ta']) {
          if (lang === 'ta') await page.locator('#langTa').tap();
          assert.equal(await page.locator('html').getAttribute('lang'), lang);
          await page.locator('button[data-hub-section="concepts"]').tap();
          const index = page.locator('[data-index-view]');
          const panel = page.locator('[data-panel]');
          assert.equal(await index.locator('button').count(), 4);
          for (const [i, lesson] of lessons.entries()) {
            await index.locator('button').nth(i).tap();
            assert.equal(new URL(page.url()).searchParams.get('concept'), String(i));
            assert.match(await panel.locator('h4').innerText(), new RegExp('^' + lesson.section.replace('.', '\\.') + ' '));
            const activity = panel.locator('.g9-investigation-activity');
            const activityButtons = activity.locator('button');
            for (const [j, option] of lesson.activity.options.entries()) {
              await activityButtons.nth(j).tap();
              assert.equal(await activityButtons.nth(j).getAttribute('aria-pressed'), 'true');
              assert.equal(await activity.locator('.g9-investigation-result p').innerText(), option.result[lang]);
              assert.ok(await activity.locator('.katex math').count());
              if (i < 3) {
                const diagram = activity.locator('.g9-investigation-diagram svg');
                assert.ok(await diagram.isVisible());
                assert.match(await diagram.getAttribute('aria-label'), lang === 'ta' ? /[\u0b80-\u0bff]/u : /angle/u);
                const clippedLabels = await diagram.evaluate(svg => [...svg.querySelectorAll('text')].filter(label => {
                  const bounds = label.getBBox();
                  const view = svg.viewBox.baseVal;
                  return bounds.x < view.x || bounds.x + bounds.width > view.x + view.width ||
                    bounds.y < view.y || bounds.y + bounds.height > view.y + view.height;
                }).map(label => label.textContent));
                assert.deepEqual(clippedLabels, [], 'SVG labels fit at ' + width + ' px, ' + lang + ', ' + lesson.section);
              } else {
                assert.equal(await activity.locator('table').count(), 2);
                assert.equal(await activity.locator('caption').last().innerText(), lang === 'ta' ? 'பொது வித்தியாசம்' : 'Mean difference');
              }
            }
            const check = panel.locator('.g9-investigation-check');
            const answers = check.locator('.sp2-answers button');
            const wrong = (keys[i] + 1) % 3;
            const feedback = check.locator('[role="status"]');
            await check.getByRole('button', {name:lang === 'ta' ? 'குறிப்பு' : 'Hint', exact:true}).tap();
            assert.ok(await check.getByText(lesson.check.hint[lang], {exact:true}).isVisible());
            await answers.nth(wrong).tap();
            assert.match(await feedback.innerText(), lang === 'ta' ? /^மீண்டும் முயலுங்கள்/ : /^Try again/);
            await answers.nth(keys[i]).tap();
            assert.match(await feedback.innerText(), lang === 'ta' ? /^சரி!/ : /^Correct!/);
            await check.locator('.g9-investigation-reset').tap();
            assert.equal(await feedback.innerText(), '');
            assert.equal(await activityButtons.first().getAttribute('aria-pressed'), 'true');
            await panel.locator('summary').tap();
            assert.equal(await panel.locator('.math-fallback').count(), 0);
            assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1),
              'No page overflow at ' + width + ' px, ' + lang + ', ' + lesson.section);
            assert.ok(await panel.locator('.triggle-tex').evaluateAll(nodes => nodes.every(node =>
              node.scrollWidth <= node.clientWidth + 1 || (node.tabIndex === 0 && node.getAttribute('aria-label'))
            )), 'Formulas fit or have accessible scrolling');
            await panel.locator('.g10ch2-practice-link').tap();
            await page.locator('#questionText').waitFor({state:'visible'});
            assert.equal(new URL(page.url()).searchParams.get('question'), lesson.exercise);
            await page.goBack();
            await panel.locator('h4').waitFor({state:'visible'});
            assert.equal(new URL(page.url()).searchParams.get('concept'), String(i));
            if (i > 0) {
              await page.locator('[data-footer-prev]').tap();
              assert.equal(new URL(page.url()).searchParams.get('concept'), String(i - 1));
              await page.locator('[data-footer-next]').tap();
              assert.equal(new URL(page.url()).searchParams.get('concept'), String(i));
            }
            await page.locator('[data-back-index]').tap();
          }
          await page.locator('.hub-back-menu').tap();
        }
        await page.locator('button[data-hub-section="concepts"]').tap();
        await page.locator('[data-index-view] button').first().tap();
        await page.locator('#langEn').tap();
        assert.equal(new URL(page.url()).searchParams.get('concept'), '0');
        assert.match(await page.locator('.g9-investigation-diagram svg').getAttribute('aria-label'), /Selected angle A/);
        assert.deepEqual(errors, []);
        console.log('PASS Trigonometry English/Tamil chapter routes and interactions at ' + width + ' px.');
      } finally {
        await context.close();
      }
    }
    if (app) {
      const context = await browser.newContext({viewport:{width:320, height:760}, hasTouch:true, isMobile:true});
      try {
        const page = await context.newPage();
        await page.goto(route, {waitUntil:'domcontentloaded'});
        await page.waitForFunction(() => Boolean(navigator.serviceWorker.controller), null, {timeout:20000});
        await context.setOffline(true);
        await page.goto(route + '&section=concepts&concept=3', {waitUntil:'domcontentloaded'});
        await page.locator('#langTa').tap();
        await page.getByRole('button', {name:'கோணத்தைக் காண்க', exact:true}).tap();
        assert.match(await page.locator('.g9-investigation-result').innerText(), /0\.0006/);
        assert.match(await page.locator('.g9-investigation-diagram').innerText(), /பொது வித்தியாசம்/);
        console.log('PASS Trigonometry Tamil reverse lookup and diagrams after offline reload.');
      } finally {
        await context.close();
      }
    }
  } finally {
    await browser.close();
    if (app) await app.close();
  }
}

checkMath();
checkBrowser().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
