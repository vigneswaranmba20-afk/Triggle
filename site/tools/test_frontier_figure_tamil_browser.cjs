'use strict';

const assert = require('node:assert/strict');
const {chromium} = require('playwright');
const {server, launchOptions} = require('./dashboard_test_support.cjs');

const gradeOf = id => id.startsWith('g9-') ? 9 : 10;

async function openQuestion(page, base, id) {
  const url = `${base}/index.html?class=${gradeOf(id)}&question=${id}`;
  await page.evaluate(url => {
    history.pushState({}, '', url);
    dispatchEvent(new PopStateEvent('popstate'));
  }, url);
}

async function figure(page) {
  return page.locator('#diagramContent').evaluate(async element => {
    const image = element.querySelector('img');
    if (image) {
      await image.decode();
      return {description:image.alt, image:image.getAttribute('src')};
    }
    return {description:element.querySelector('svg[role="img"]')?.getAttribute('aria-label'), image:null};
  });
}

async function checkLabelsInBounds(page, path) {
  return page.evaluate(async path => {
    const content = await (await fetch(path)).text();
    const root = new DOMParser().parseFromString(content, 'image/svg+xml').documentElement;
    const svg = document.importNode(root, true);
    svg.style.position = 'absolute';
    svg.style.top = '-10000px';
    document.body.append(svg);
    try {
      const {x, y, width, height} = svg.viewBox.baseVal;
      return [...svg.querySelectorAll('text')].filter(text => /\p{Script=Tamil}/u.test(text.textContent)).map(text => {
        const {x: left, y: top, width: labelWidth, height: labelHeight} = text.getBBox();
        return {label:text.textContent, bounds:[left,top,left+labelWidth,top+labelHeight], inside:left >= x - 0.5 && top >= y - 0.5 &&
          left + labelWidth <= x + width + 0.5 && top + labelHeight <= y + height + 0.5};
      });
    } finally {
      svg.remove();
    }
  }, path);
}

(async () => {
  const live = process.env.TRIGGLE_LIVE_BASE;
  const local = live ? null : await server();
  const base = live || local.base;
  const browser = await chromium.launch(launchOptions());
  try {
    await Promise.all((live ? [390] : [320, 360, 390, 412]).map(async width => {
      const context = await browser.newContext({
        viewport:{width,height:844},isMobile:true,hasTouch:true,ignoreHTTPSErrors:!!live,
      });
      try {
        const page = await context.newPage();
        await page.goto(base + '/index.html?class=9');
        const descriptions = await page.evaluate(() => window.TriggleFrontierFigureTamil);
        assert.equal(Object.keys(descriptions).length, 37);
        assert.equal(Object.values(descriptions).filter(item => item.src).length, 14);
        const clippedLabels = [];
        for (const [id, expected] of Object.entries(descriptions)) {
          await openQuestion(page, base, id);
          for (const [language, toggle] of [['en','#langEn'], ['ta','#langTa']]) {
            await page.locator(toggle).evaluate(button => button.click());
            await page.locator('#figureBtn').evaluate(button => button.click());
            assert.equal(await page.locator('#figureDialog').evaluate(dialog => dialog.open), true);
            const observed = await figure(page);
            assert(observed.description, id + ' accessible name in ' + language);
            if (language === 'ta') {
              assert.equal(observed.description, expected.description, id);
              assert.match(observed.description, /\p{Script=Tamil}/u);
              if (expected.src) assert.equal(observed.image, expected.src, id + ' localized visible labels');
              if (expected.caption) assert.equal(await page.locator('#visualTitle').innerText(), expected.caption, id);
            } else {
              assert.doesNotMatch(observed.description, /\p{Script=Tamil}/u, id + ' original English description');
              if (expected.src) assert.notEqual(observed.image, expected.src, id + ' English image remains available');
            }
            assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false, id);
            await page.locator('#figureDialog').evaluate(dialog => dialog.close());
          }
          if (!live && width === 390 && expected.src) {
            const labels = await checkLabelsInBounds(page, expected.src);
            assert(labels.length > 0, id + ' readable Tamil labels in SVG');
            clippedLabels.push(...labels.filter(label => !label.inside).map(label => ({id,...label})));
          }
        }
        assert.deepEqual(clippedLabels, [], 'All Tamil figure labels stay inside their original viewBox');
        if (!live && width === 390) {
          await page.evaluate(() => navigator.serviceWorker.ready);
          await page.waitForFunction(() => !!navigator.serviceWorker.controller);
          await context.setOffline(true);
          await openQuestion(page, base, 'c10-3-ex3-12-q7');
          await page.reload();
          await page.locator('#figureBtn').evaluate(button => button.click());
          assert.equal((await figure(page)).image, descriptions['c10-3-ex3-12-q7'].src);
        }
        console.log(`37 original figures have bilingual descriptions and 14 Tamil-label assets at ${width}px.`);
      } finally {
        await context.close();
      }
    }));
  } finally {
    await browser.close();
    await local?.close();
  }
})().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
