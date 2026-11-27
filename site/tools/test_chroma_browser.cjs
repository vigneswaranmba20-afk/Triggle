'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs/promises');
const path = require('node:path');
const { chromium, devices } = require('playwright');
const { server, launchOptions } = require('./dashboard_test_support.cjs');

const palette = {
  primary: 'rgb(24, 27, 32)', explanation: 'rgb(64, 70, 80)', secondary: 'rgb(82, 91, 98)',
  accent: 'rgb(110, 41, 51)', correct: 'rgb(22, 99, 83)', incorrect: 'rgb(180, 35, 24)',
  gold: 'rgb(183, 146, 83)', page: 'rgb(247, 246, 242)', paper: 'rgb(255, 255, 255)'
};
const viewports = [[320, 844], [360, 844], [390, 844], [412, 844], [430, 844], [768, 1024], [1280, 900], [667, 375]];
const screenshots = [
  ['home-en', '', 'en'],
  ['directory-ta', '?class=10', 'ta'],
  ['concept-ta', '?class=9&chapter=g9-ch2&section=concepts&concept=0', 'ta'],
  ['exercise-en', '?class=10&question=c10-1-ex1-1-q1-i', 'en'],
  ['exercise-ta', '?class=10&question=c10-1-ex1-1-q1-i', 'ta'],
  ['quiz-ta', '?class=9&chapter=g9-ch1&section=quizzes', 'ta']
];

function scan({ palette }) {
  const roles = [
    ['correct', '.math-answer, .final-answer-step .structured-equation, .final-answer-value'],
    ['primary', '#questionText, #questionTitle, .question-text, .step-equation, .structured-equation, .sp2-concept-heading, .sp2-nav-title, .hub-quiz-question h4, .hub-question-title, .discover-chapter strong, .chapter-hub h2, .discover-class-header h1'],
    ['explanation', '.step-reason, .sp2-stage-summary, .sp2-intro, .sp2-teach-text, .sp2-why, .hub-section-description'],
    ['secondary', '.crumb, .page-status, .sp2-stage-reference, #itemPosition, #questionLabel, #stepCount, .discover-chapter-meta, .hub-section-count, .hub-quiz-progress']
  ];
  // Our diagrams, media controls, and source-authored TeX may encode domain colours.
  const domain = 'svg, canvas, video, .katex, math, .ver-icon, .logo, .home-wordmark-dot, .brand-mobile .gold, .side-brand .gold';
  const rgb = color => color.match(/[\d.]+/g)?.map(Number);
  const blend = (front, back) => {
    const alpha = front[3] ?? 1;
    return front.slice(0, 3).map((value, i) => value * alpha + back[i] * (1 - alpha));
  };
  const light = color => color.reduce((sum, value, i) => {
    const v = value / 255;
    return sum + [.2126, .7152, .0722][i] * (v <= .04045 ? v / 12.92 : ((v + .055) / 1.055) ** 2.4);
  }, 0);
  const contrast = (front, back) => {
    const levels = [light(front), light(back)].sort((a, b) => b - a);
    return (levels[0] + .05) / (levels[1] + .05);
  };
  const classes = el => [...el.classList].filter(c => !/^(?:is-|has-|active$|current$|hidden$)/.test(c));
  const selector = el => el.id ? '#' + el.id : classes(el).length ? '.' + classes(el).join('.') : el.localName;
  const cache = new Map();
  function styleFor(el) {
    if (!cache.has(el)) cache.set(el, getComputedStyle(el));
    return cache.get(el);
  }
  const backgrounds = new Map();
  function backdrop(el) {
    if (!el) return [255, 255, 255];
    if (backgrounds.has(el)) return backgrounds.get(el);
    const color = rgb(styleFor(el).backgroundColor);
    const result = (color[3] ?? 1) === 1 ? color.slice(0, 3) : blend(color, backdrop(el.parentElement));
    backgrounds.set(el, result);
    return result;
  }
  const allowed = new Set(Object.values(palette).filter(color => color !== palette.gold));
  // Algebra highlights min/max/sum separately and traces a matrix operand.
  // Probability marks favourable outcomes alongside their diagrams.
  const domainText = '.g10ch3-fg-row.is-result, .g10ch3-mat-static, .g10ch8-favourable';
  const failures = new Map();
  const measured = new Map();
  const reading = new Map();
  const report = (kind, key, data) => failures.set(JSON.stringify([kind, key, data.color, data.background]), { kind, key, ...data });
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  const examined = new Set();
  while (walker.nextNode()) {
    const node = walker.currentNode;
    const el = node.parentElement;
    if (!el || examined.has(el) || !node.textContent.trim()) continue;
    examined.add(el);
    if (el.closest(domain + ',[hidden],[inert],[aria-hidden=true],script,style,template,option,button:disabled,.sr-only,.visually-hidden,.ver-sr-only')) continue;
    const css = styleFor(el);
    const rect = el.getBoundingClientRect();
    if (css.visibility !== 'visible' || !rect.width || !rect.height || css.clipPath === 'inset(50%)' || css.clip === 'rect(0px, 0px, 0px, 0px)') continue;
    const target = roles.map(([role, selectors]) => [role, el.closest(selectors)]).find(([, match]) => match);
    const parent = el.parentElement;
    const key = selector(el) + (el.id || !parent ? '' : ' in ' + selector(parent));
    const bg = backdrop(el);
    const fg = blend(rgb(css.color), bg);
    const ratio = contrast(fg, bg);
    const large = parseFloat(css.fontSize) >= (Number(css.fontWeight) >= 700 ? 18.66 : 24);
    const data = { color: css.color, background: bg.map(v => Math.round(v)).join(','), ratio: +ratio.toFixed(2), sample: node.textContent.trim().slice(0, 72) };
    const minimum = large ? 3 : 4.5;
    if (ratio < minimum) report('contrast', key, data);
    if (!allowed.has(css.color) && !el.closest(domainText)) report('palette', key, data);
    if (target) {
      const [role, match] = target;
      const roleKey = role + ':' + selector(match);
      if (!measured.has(roleKey)) measured.set(roleKey, new Set());
      measured.get(roleKey).add(css.color);
      reading.set(role, Math.min(reading.get(role) ?? Infinity, ratio));
      if (css.color !== palette[role]) report('role', roleKey, data);
    }
  }
  const answerControls = '.hub-quiz-answers button, .sp2-answers button, .triggle-mcq-btn, .probability-answers button, .g9a-answer-options button, .why-step-transfer-choice, #quizAnswers button';
  let controlMinimum = Infinity;
  for (const el of document.querySelectorAll(answerControls)) {
    if (el.disabled || el.closest('[hidden],[inert]') || !el.getClientRects().length) continue;
    const css = styleFor(el);
    const bg = backdrop(el);
    const boundary = blend(rgb(css.borderTopColor), bg);
    const ratio = Math.min(contrast(boundary, bg), contrast(boundary, backdrop(el.parentElement)));
    controlMinimum = Math.min(controlMinimum, ratio);
    if (ratio < 3) report('control contrast', selector(el) + ' in ' + selector(el.parentElement), {
      color: css.borderTopColor, background: bg.map(v => Math.round(v)).join(','), ratio: +ratio.toFixed(2)
    });
  }
  return {
    failures: [...failures.values()], roles: Array.from(measured, ([key, values]) => [key, [...values].sort()]),
    reading: [...reading], controlMinimum, overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
    math: document.querySelectorAll('#questionText .katex, #stepsList .katex, .chapter-hub .katex').length
  };
}

async function navigate(page, query) {
  // Exercise the application's normal same-document history path without downloading the source data again.
  await page.evaluate(query => {
    history.replaceState(null, '', location.pathname + query);
    dispatchEvent(new PopStateEvent('popstate'));
  }, query);
}

async function inventory(page) {
  return page.evaluate(() => {
    const grades = window.TRIGGLE_CURRICULUM.grades.filter(({ grade }) => grade === 9 || grade === 10);
    const classes = window.TrigglePrepareStudentRecords(window);
    return grades.map(({ grade, chapters }) => ({
      grade, chapters: chapters.map(({ id, number, title }) => ({
        id, title: title?.en,
        questions: classes[grade].items.filter(item => String(item.chapter) === String(number) && item.kind !== 'example')
          .map(({ id, kind, exercise }) => ({ id, kind, exercise }))
      }))
    }));
  });
}

async function chapterRoutes(page, grade, chapter, exhaustive) {
  const base = '?class=' + grade + '&chapter=' + chapter.id;
  await navigate(page, base + '&section=concepts');
  const conceptCount = await page.locator('.sp2-nav-button').count();
  const indices = Array.from({ length: conceptCount }, (_, i) => String(i));
  const exercises = exhaustive ? chapter.questions : [...new Map(chapter.questions.map(q => [q.exercise ?? q.kind, q])).values()];
  return [
    ...['', '&section=exercises', '&section=concepts', '&section=quizzes', '&section=activities', '&section=sources'].map(section => base + section),
    ...[...new Set(indices.length ? indices : ['0'])].map(index => base + '&section=concepts&concept=' + index),
    ...exercises.map(question => '?class=' + grade + '&question=' + question.id)
  ];
}

async function checkFeedback(page, add, lang) {
  const concept = (grade, chapter) => '?class=' + grade + '&chapter=g' + grade + '-ch' + chapter + '&section=concepts&concept=0';
  const fixtures = [
    ['exercise MCQ', '?class=9&question=g9-ch2-ex9-q20', '#questionText', '.triggle-mcq-btn', '.triggle-mcq-feedback'],
    ['chapter quiz', '?class=9&chapter=g9-ch1&section=quizzes', '.hub-quiz-question', '.hub-quiz-answers button', '.hub-quiz-feedback'],
    ['set-language check', concept(9, 1), '.sp2-recall', '[data-answers] button', '[data-feedback]', '[data-hint]'],
    ['real-numbers check', concept(9, 2), '.sp2-recall', '[data-answers] button', '[data-feedback]', '[data-hint]'],
    ['geometry investigation', concept(9, 4), '.g9-investigation-check', '.sp2-answers button', '.g9-investigation-feedback', '.sp2-recall-actions button', '.g9-investigation-reset'],
    ['statistics check', concept(9, 8), '[data-panel]', '[data-answers] button', '[data-stats-feedback]'],
    ['probability check', concept(9, 9), '[data-panel]', '.probability-answers button', '.probability-feedback', '[data-probability-actions] button'],
    ['sequences check', concept(10, 2), '.sp2-recall', '[data-answers] button', '[data-feedback]', '[data-hint]']
  ];
  for (const [name, route, container, buttons, message, hint, reset] of fixtures) {
    await navigate(page, route);
    const root = page.locator(container).first();
    const result = root.locator(message);
    const options = root.locator(buttons);
    const neutral = await options.evaluateAll(elements => elements.every(el =>
      !el.dataset.answerState && !['rgb(22, 99, 83)', 'rgb(180, 35, 24)'].includes(getComputedStyle(el).color)));
    if (!neutral || await result.textContent()) add({ kind: 'feedback', key: name + ' neutral' }, route, lang);
    const seen = new Set();
    for (const option of await options.all()) {
      await option.click();
      const caption = await result.textContent();
      const right = /^(?:✓ ?)?(?:Correct|You got it|சரி)/i.test(caption.trim());
      const state = right ? 'correct' : 'incorrect';
      seen.add(state);
      await option.evaluate(el => Promise.all(el.getAnimations().map(animation => animation.finished)));
      const actual = await result.evaluate(async el => {
        await new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)));
        return {
          state: el.dataset.answerState, color: getComputedStyle(el).color,
          announced: el.matches('[role=status],[aria-live=polite]'),
          icon: getComputedStyle(el, '::before').content
        };
      });
      const active = await options.evaluateAll(elements => elements.map(el => ({
        state: el.dataset.answerState, color: getComputedStyle(el).color, selected: el.getAttribute('aria-pressed') === 'true'
      })).filter(el => el.state || el.selected));
      if (actual.color !== palette[state] || actual.state !== state || !actual.announced || !caption.trim() || (actual.icon === 'none' && !/^[✓✕✗]/.test(caption.trim()))) {
        add({ kind: 'feedback', key: name + ' ' + state + ' message', color: actual.color, sample: caption }, route, lang);
      }
      if (active.length !== 1 || active[0].color !== palette[state] || active[0].state !== state || !active[0].selected) {
        add({ kind: 'feedback', key: name + ' ' + state + ' option', color: active[0]?.color }, route, lang);
      }
    }
    assert.equal(seen.size, 2, 'Both outcomes shown by ' + name + ' (' + lang + ')');
    if (hint) {
      await root.locator(hint).first().click();
      const state = await result.getAttribute('data-answer-state');
      if (state) add({ kind: 'feedback', key: name + ' hint', sample: state }, route, lang);
    }
    if (reset) {
      await root.locator(reset).click();
      if (await result.textContent() || await options.locator('..').first().locator('[data-answer-state]').count()) {
        add({ kind: 'feedback', key: name + ' reset' }, route, lang);
      }
    }
  }
}

async function checkPlayground(browser, base, add) {
  const context = await browser.newContext({ ...devices['Pixel 5'], viewport: { width: 390, height: 844 }, reducedMotion: 'reduce', serviceWorkers: 'block' });
  try {
    await context.route('**/*', route => {
      if (new URL(route.request().url()).origin === base) return route.continue();
      return route.abort();
    });
    const page = await context.newPage();
    const url = '/playground.html';
    await page.goto(base + url);
    for (const lang of ['en', 'ta']) {
      await page.locator(lang === 'en' ? '#basicLangEn' : '#basicLangTa').click();
      await page.setViewportSize({ width: 320, height: 844 });
      for (const tab of await page.getByRole('tab').all()) {
        await tab.click();
        await page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))));
        const route = url + '#' + await tab.getAttribute('id');
        const clipped = await page.locator('.scene.active .lesson-copy').evaluateAll(paragraphs =>
          paragraphs.some(p => p.scrollHeight > p.clientHeight + 1));
        if (clipped) add({ kind: 'clipped instructions', key: route }, route, lang);
      }
      await page.setViewportSize({ width: 390, height: 844 });
      for (const tab of await page.getByRole('tab').all()) {
        await tab.click();
        await page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))));
        const view = await page.evaluate(scan, { palette });
        const route = url + '#' + await tab.getAttribute('id');
        for (const issue of view.failures) add({ ...issue, key: 'Basics ' + issue.key }, route, lang);
      }
      const route = url + '#tab-game';
      await page.locator('#tab-game').click();
      await page.locator('#quizRestart').click();
      const options = page.locator('#quizAnswers button');
      const message = page.locator('#quizFeedback');
      const paintedFeedback = () => message.evaluate(async el => {
        await new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)));
        return { color: getComputedStyle(el).color, sample: el.textContent };
      });
      await options.nth(1).click();
      if (!(await options.nth(0).isEnabled())) {
        add({ kind: 'feedback', key: 'Basics retry is locked' }, route, lang);
        await page.locator('#quizRestart').click();
      } else {
        const result = await paintedFeedback();
        if (result.color !== palette.incorrect) {
          add({ kind: 'feedback', key: 'Basics incorrect message colour', ...result }, route, lang);
        }
      }
      await options.nth(0).click();
      const result = await paintedFeedback();
      if (result.color !== palette.correct) {
        add({ kind: 'feedback', key: 'Basics correct message colour', ...result }, route, lang);
      }
      await page.locator('#quizRestart').click();
      if (await message.getAttribute('data-answer-state') || await options.locator('..').first().locator('.wrong,.correct').count()) {
        add({ kind: 'feedback', key: 'Basics quiz reset' }, route, lang);
      }
    }
  } finally {
    await context.close();
  }
}

async function checkOffline(browser, base) {
  const context = await browser.newContext({ ...devices['Pixel 5'], viewport: { width: 390, height: 844 } });
  try {
    const page = await context.newPage();
    await page.goto(base + '?class=10&question=c10-1-ex1-1-q1-i');
    await page.waitForFunction(() => !!navigator.serviceWorker.controller);
    await context.setOffline(true);
    await page.reload();
    await page.locator('#langTa').click();
    assert.equal(await page.locator('html').getAttribute('lang'), 'ta');
    assert.equal(await page.locator('#questionText').evaluate(el => getComputedStyle(el).color), palette.primary);
    assert.ok(await page.locator('#stepsList .katex').count(), 'KaTeX renders on a cached exercise');
  } finally {
    await context.close();
  }
}

async function main() {
  const args = process.argv.slice(2);
  const reportOnly = args.includes('--report');
  const exhaustive = args.includes('--all-questions');
  const feedbackOnly = args.includes('--feedback-only');
  const out = process.env.CHROMA_OUTPUT;
  const app = await server(process.env.CHROMA_SITE_ROOT);
  const browser = await chromium.launch(launchOptions());
  const totals = { issues: {}, routes: { en: 0, ta: 0 }, chapters: {}, minima: {}, controlMinimum: Infinity, mathViews: 0, overflow: [], errors: [] };
  const add = (row, route, lang) => {
    const key = JSON.stringify([row.kind, row.key, row.color, row.background]);
    const issue = totals.issues[key] ??= { ...row, locations: 0, example: route, lang };
    issue.locations++;
  };
  try {
    const context = await browser.newContext({ ...devices['Pixel 5'], viewport: { width: 390, height: 844 }, deviceScaleFactor: 1, reducedMotion: 'reduce', serviceWorkers: 'block' });
    const page = await context.newPage();
    page.on('pageerror', error => totals.errors.push(error.message));
    await page.goto(app.base + '/index.html');
    await page.locator('body:not(.ver-starting) .appbar').waitFor();
    await page.evaluate(() => document.fonts.ready);
    const chapters = await inventory(page);
    const routeColors = new Map();
    for (const lang of ['en', 'ta']) {
      await page.locator(lang === 'en' ? '#langEn' : '#langTa').click();
      const inspect = async (route, width) => {
        await navigate(page, route);
        const summary = await page.evaluate(scan, { palette });
        totals.routes[lang]++;
        if (summary.overflow > 1) totals.overflow.push({ route, lang, width, pixels: summary.overflow });
        totals.mathViews += Number(summary.math > 0);
        for (const failure of summary.failures) add(failure, route, lang);
        for (const [role, ratio] of summary.reading) totals.minima[role] = Math.min(totals.minima[role] ?? Infinity, ratio);
        totals.controlMinimum = Math.min(totals.controlMinimum, summary.controlMinimum);
        if (width === 390) {
          if (lang === 'en') routeColors.set(route, new Map(summary.roles));
          else {
            const english = routeColors.get(route);
            for (const [key, list] of summary.roles) {
              const other = english?.get(key);
              if (other && JSON.stringify(list) !== JSON.stringify(other)) {
                add({ kind: 'language parity', key, color: list.join(' / '), background: other.join(' / ') }, route, lang);
              }
            }
          }
        }
      };
      if (!feedbackOnly) {
        await inspect('', 390);
        for (const { grade, chapters: list } of chapters) {
          await inspect('?class=' + grade, 390);
          for (const chapter of list) {
            const routes = await chapterRoutes(page, grade, chapter, exhaustive);
            for (const route of routes) await inspect(route, 390);
            totals.chapters[chapter.id] = { routes: routes.length, title: chapter.title };
            console.log(lang, chapter.id, routes.length, 'routes');
          }
        }
        for (const [width, height] of viewports) {
          if (width === 390) continue;
          await page.setViewportSize({ width, height });
          for (const [, route, screenshotLang] of screenshots) {
            if (screenshotLang === lang) await inspect(route, width);
          }
        }
        await page.setViewportSize({ width: 390, height: 844 });
      }
      await checkFeedback(page, add, lang);
    }
    await checkPlayground(browser, app.base, add);
    if (out) {
      await fs.mkdir(out, { recursive: true });
      for (const [name, route, lang] of screenshots) {
        await page.locator(lang === 'en' ? '#langEn' : '#langTa').click();
        await navigate(page, route);
        await page.evaluate(async () => {
          await document.fonts.ready;
          await new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)));
        });
        await page.screenshot({ path: path.join(out, name + '.png'), animations: 'disabled' });
        if (name === 'quiz-ta') {
          const options = page.locator('.hub-quiz-question').first().locator('.hub-quiz-answers button');
          const correct = await page.evaluate(() => window.TRIGGLE_SET_PATH.stages[0].correct);
          await options.nth((correct + 1) % await options.count()).click();
          await page.screenshot({ path: path.join(out, 'quiz-ta-retry.png'), animations: 'disabled' });
          await options.nth(correct).click();
          await page.screenshot({ path: path.join(out, 'quiz-ta-correct.png'), animations: 'disabled' });
        }
      }
      await fs.writeFile(path.join(out, 'audit.json'), JSON.stringify(totals, null, 2) + '\n');
    }
    const counts = Object.values(totals.issues).reduce((result, issue) => {
      result[issue.kind] = (result[issue.kind] ?? 0) + 1;
      return result;
    }, {});
    console.log(JSON.stringify({ counts, routes: totals.routes, chapters: Object.keys(totals.chapters).length, minima: totals.minima, controlMinimum: totals.controlMinimum, overflow: totals.overflow.length, mathViews: totals.mathViews, errors: totals.errors.length }));
    if (!reportOnly) {
      assert.deepEqual(totals.errors, [], 'No browser exceptions');
      assert.deepEqual(totals.overflow, [], 'Student views fit their viewport');
      await checkOffline(browser, app.base + '/index.html');
      assert.deepEqual(counts, {}, JSON.stringify(Object.values(totals.issues).slice(0, 15)));
    }
  } finally {
    await browser.close();
    await app.close();
  }
}

main().catch(error => { console.error(error); process.exitCode = 1; });
