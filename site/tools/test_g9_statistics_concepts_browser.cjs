'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs/promises');
const path = require('node:path');
const {chromium} = require('playwright');
const {server, launchOptions} = require('./dashboard_test_support.cjs');

async function main() {
 const app = await server();
 let browser;
 try {
  browser = await chromium.launch(launchOptions());
  const route = app.base + '/index.html?class=9&chapter=g9-ch8&section=concepts';
  const photos = process.env.STATISTICS_SCREENSHOTS;
  if (photos) await fs.mkdir(photos, {recursive: true});
  for (const width of [320, 360, 390, 393, 412, 430]) {
   const ctx = await browser.newContext({viewport: {width, height: 740}, hasTouch: true, isMobile: true, serviceWorkers: 'block'});
   try {
    const page = await ctx.newPage();
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.goto(app.base + '/index.html?class=9&chapter=g9-ch8', {waitUntil:'domcontentloaded'});
    await page.locator('button[data-hub-section="concepts"]').tap();
    const index = page.locator('[data-index-view]');
    const lesson = page.locator('.statistics-studio');
    const result = lesson.locator('[data-stats-result] p');
    assert.equal(await index.locator('button').count(), 6);
    assert.equal(await page.locator('.hub-back-menu').isVisible(), true);

    for (let i = 0; i < 6; i++) {
     await index.locator('button').nth(i).tap();
     await lesson.waitFor({state:'visible'});
     assert.equal(new URL(page.url()).searchParams.get('concept'), String(i));
     assert.equal(await page.locator('.hub-back-menu').isVisible(), false);
     assert.equal(await page.locator('[data-adaptive-dock]').count(), 1);
     const controls = lesson.locator('[data-stats-controls]');
     const formats = lesson.locator('[data-stats-format]');
     const button = controls.locator('button').first();
     const bounds = await button.boundingBox();
     assert.ok(bounds.height >= 44 && bounds.y >= 0 && bounds.y + bounds.height <= 740, 'Primary control visible at ' + width);
     const details = lesson.locator('details');
     assert.equal(await details.getAttribute('open'), null);
     if (photos && (width === 320 || i >= 3)) {
      await page.screenshot({path:path.join(photos, width + '-8.' + (i + 1) + '.png')});
     }
     const alt = controls.locator('button').nth(1);
     await alt.focus();
     await page.keyboard.press('Enter');
     const expected = [/Adventure/, /shortest trip/, /10\.6 minutes/, /4\.25 points/, /median of 7\.5/, /modes are 2 and 5/][i];
     assert.match(await result.innerText(), expected);
     const answers = lesson.locator('[data-answers] button');
     const keys = [1, 1, 1, 0, 0, 1];
     await answers.nth((keys[i] + 1) % 3).tap();
     assert.match(await lesson.locator('[data-stats-feedback]').innerText(), /^Try again/);
     await answers.nth(keys[i]).tap();
     assert.match(await lesson.locator('[data-stats-feedback]').innerText(), /^Correct/);

     if (i === 1) {
      await controls.getByRole('button', {name:'Tally', exact:true}).tap();
      assert.match(await result.innerText(), /10 and 18 occur twice/);
      await controls.getByRole('button', {name:'Group', exact:true}).tap();
      assert.match(await result.innerText(), /Four trips/);
     }
     if (i >= 3) {
      if (i === 3) {
       await details.locator('summary').tap();
       assert.equal(await details.locator('math mfrac').count(), 2);
       assert.ok(await details.locator('.triggle-tex').evaluate(el => el.scrollWidth <= el.clientWidth + 1));
      }
      await formats.getByRole('button', {name:'Frequency table'}).tap();
      assert.match(await result.innerText(), [/mean score is 8/, /median of 9/, /mode is 11/][i - 3]);
      if (i === 3) {
       assert.equal(await details.locator('math mfrac').count(), 2);
       assert.equal(await details.locator('.triggle-tex').isVisible(), true);
       assert.ok(await details.locator('.triggle-tex').evaluate(el => el.scrollWidth <= el.clientWidth + 1));
       await details.locator('summary').tap();
      }
      await formats.getByRole('button', {name:'Grouped classes'}).tap();
      assert.match(await result.innerText(), /16 minutes/);
      await controls.locator('button').nth(1).tap();
      assert.match(await result.innerText(), [/16 minutes/, /10 minutes/, /14 minutes/][i - 3]);
      if (i === 3) {
       await controls.getByRole('button', {name:'Step deviation'}).tap();
       assert.match(await result.innerText(), /16 minutes/);
      }
      if (i === 5) {
       await formats.getByRole('button', {name:'Raw data'}).tap();
       await controls.getByRole('button', {name:'No mode'}).tap();
       assert.match(await result.innerText(), /no mode/);
       await formats.getByRole('button', {name:'Empirical rule'}).tap();
       assert.match(await result.innerText(), /approximate mode of 17/);
      }
      assert.ok(await lesson.locator('[data-stats-result] .katex math').count());
     }
     await details.locator('summary').tap();
     assert.match(await details.innerText(), /Why it works/);
     assert.equal(await lesson.locator('.math-fallback').count(), 0);
     assert.ok(await lesson.locator('.triggle-tex').evaluateAll(formulas => formulas.every(el =>
      el.scrollWidth <= el.clientWidth + 1 && el.querySelector('.katex-html').getBoundingClientRect().height <= el.clientHeight + 1
     )), 'Visible KaTeX fits at ' + width + ', lesson ' + (i + 1));
     assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), 'No page overflow');

     if (i === 3) {
      await page.locator('#langTa').tap();
      assert.equal(await page.locator('html').getAttribute('lang'), 'ta');
      assert.equal(new URL(page.url()).searchParams.get('concept'), '3');
      assert.match(await lesson.innerText(), /Tamil editorial review pending/);
      await page.locator('#langEn').tap();
     }
     await page.locator('[data-back-index]').tap();
    }
    await index.locator('button').nth(4).tap();
    await lesson.locator('[data-stats-format]').getByRole('button', {name:'Grouped classes'}).tap();
    await lesson.locator('[data-exercise-id="g9-ch8-ex8.2-q5"]').tap();
    await page.locator('#questionText').waitFor({state:'visible'});
    assert.equal(new URL(page.url()).searchParams.get('question'), 'g9-ch8-ex8.2-q5');
    await page.goBack();
    await lesson.waitFor({state:'visible'});
    assert.equal(new URL(page.url()).searchParams.get('concept'), '4');
    await page.locator('[data-footer-next]').tap();
    await page.locator('[data-footer-next]').tap();
    assert.equal(await index.isVisible(), true);
    assert.deepEqual(errors, []);
    console.log('Statistics lessons, exercise link and navigation passed at ' + width + ' px.');
   } finally { await ctx.close(); }
  }

  const ctx = await browser.newContext({viewport:{width:360, height:740}});
  try {
   const page = await ctx.newPage();
   await page.goto(route, {waitUntil:'domcontentloaded'});
   await page.waitForFunction(() => !!navigator.serviceWorker.controller, null, {timeout:20000});
   await ctx.setOffline(true);
   await page.goto(route + '&concept=3', {waitUntil:'domcontentloaded'});
   await page.locator('[data-stats-format]').getByRole('button', {name:'Grouped classes'}).click();
   assert.equal(await page.locator('[data-stats-result] math mfrac').count(), 1);
   assert.match(await page.locator('[data-stats-result] p').innerText(), /16 minutes/);
  } finally { await ctx.close(); }
  console.log('PASS Statistics browser: six lessons, mobile, EN/Tamil shell, touch and keyboard, KaTeX, exercise return and offline.');
 } finally {
  if (browser) await browser.close();
  await app.close();
 }
}
main().catch(error => {console.error(error); process.exitCode = 1;});
