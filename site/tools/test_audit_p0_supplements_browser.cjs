'use strict';

const assert = require('node:assert/strict');
const {chromium} = require('playwright');
const {launchOptions, server} = require('./dashboard_test_support.cjs');

async function verifyReader(page, base, id, width) {
  const grade = id.startsWith('c10-') ? 10 : 9;
  await page.goto(base + '/index.html?class=' + grade + '&question=' + id, {waitUntil: 'domcontentloaded'});
  const card = page.locator('#p0SupplementHost');
  await card.waitFor({state: 'visible'});
  for (const language of ['ta', 'en']) {
    await page.locator(language === 'ta' ? '#langTa' : '#langEn').tap();
    await page.waitForFunction(lang => document.documentElement.lang === lang, language);
    const state = await card.evaluate((el, {id, language}) => {
      const entry = window.TriggleP0Supplements.get(id);
      const text = cell => cell.textContent;
      const table = el.querySelector('table');
      const expected = entry.table;
      const tamil = language === 'ta';
      const formula = el.querySelector('.p0-supp-math');
      return {
        title: el.querySelector('h4').textContent,
        expectedTitle: entry.title[language],
        note: el.querySelector('p')?.textContent,
        expectedNote: entry.note?.[language],
        table: table && [...table.rows].map(row => [...row.cells].map(text)),
        expectedTable: expected ? [
          tamil ? expected.headersTa : expected.headers,
          ...((tamil && expected.rowsTa) || expected.rows),
          ...(expected.footer ? [tamil ? expected.footerTa : expected.footer] : [])
        ] : null,
        mathErrors: el.querySelectorAll('[data-math-error],.katex-error').length,
        tex: formula?.querySelector('annotation[encoding="application/x-tex"]')?.textContent,
        expectedTex: (tamil && entry.latexTa) || entry.latex,
        width: document.documentElement.scrollWidth,
        viewport: document.documentElement.clientWidth
      };
    }, {id, language});
    const label = id + ' ' + language + ' at ' + width + 'px';
    assert.equal(state.title, state.expectedTitle, label + ': heading');
    assert.equal(state.note, state.expectedNote, label + ': explanation');
    assert.deepEqual(state.table, state.expectedTable, label + ': all table cells');
    assert.equal(state.mathErrors, 0, label + ': valid mathematics');
    assert.equal(state.tex, state.expectedTex, label + ': formula');
    assert.equal(state.viewport, width, label + ': viewport');
    assert(state.width <= width + 1, label + ': horizontal page overflow');
  }
}

async function main() {
  const app = await server();
  let browser;
  try {
    browser = await chromium.launch(launchOptions());
    const context = await browser.newContext({isMobile: true, hasTouch: true, serviceWorkers: 'block'});
    const page = await context.newPage();
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.goto(app.base + '/index.html?class=10&question=c10-8-ex8-1-q10');
    const ids = await page.evaluate(() => window.TriggleP0Supplements.ids);
    assert.equal(ids.length, 21);
    for (const width of [320, 390, 412]) {
      await page.setViewportSize({width, height: 840});
      for (const id of ids) await verifyReader(page, app.base, id, width);
    }
    // Exercise 8.1 Q14 follows a supplemented question; it must not inherit Q13's table.
    await page.goto(app.base + '/index.html?class=10&question=c10-8-ex8-1-q13');
    await page.locator('#p0SupplementHost').waitFor({state: 'visible'});
    await page.locator('#next').click();
    await page.waitForURL(url => url.searchParams.get('question') === 'c10-8-ex8-1-q14');
    assert.equal(await page.locator('#p0SupplementHost').isVisible(), false);
    assert.deepEqual(errors, []);
    console.log('PASS 21 exercise supplements in English and Tamil at 320, 390 and 412 px, including tables, formulae and next-question cleanup.');
  } finally {
    if (browser) await browser.close();
    await app.close();
  }
}

main().catch(error => { console.error(error); process.exitCode = 1; });
