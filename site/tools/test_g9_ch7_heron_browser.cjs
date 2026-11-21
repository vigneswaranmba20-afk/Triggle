'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs/promises');
const http = require('node:http');
const path = require('node:path');
const {chromium} = require('playwright');
const root = path.resolve(__dirname, '..');
async function main() {
  const server = http.createServer(async (req, res) => {
    try {
      const pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
      const file = path.resolve(root, '.' + (pathname.endsWith('/') ? pathname + 'index.html' : pathname));
      if (!file.startsWith(root + path.sep)) throw Error('unsafe path');
      const data = await fs.readFile(file);
      const ext = path.extname(file);
      const type = {'.js':'application/javascript','.css':'text/css','.woff2':'font/woff2','.svg':'image/svg+xml'}[ext] || 'text/html';
      res.writeHead(200, {'content-type':type, 'cache-control':'no-store'});
      res.end(data);
    } catch { res.writeHead(404); res.end(); }
  });
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  const base = 'http://127.0.0.1:' + server.address().port;
  let browser;
  try {
    browser = await chromium.launch({headless:true, ...(process.env.CHROMIUM_PATH ? {executablePath:process.env.CHROMIUM_PATH} : {}), args:['--no-sandbox']});
    for (const width of [320, 360, 393, 430]) {
      const context = await browser.newContext({viewport:{width, height:750}, hasTouch:true, isMobile:true, serviceWorkers:'block'});
      const page = await context.newPage();
      const errors = [];
      page.on('pageerror', e => errors.push(e.message));
      try {
        const route = base + '/index.html?class=9&chapter=g9-ch7&section=concepts&concept=0';
        await page.goto(route);
        await page.locator('.g9m-lab').waitFor({state:'visible'});
        assert.match(await page.locator('.sp2-concept-heading').innerText(), /Heron/);
        assert.equal(await page.locator('.sp2-nav-button').count(), 4);
        assert.equal(await page.locator('[data-top-next]').isVisible(), true);
        assert.equal(await page.locator('.g9m-choices button').count(), 4);
        assert.equal(await page.locator('.g9m-triangle').count(), 1);
        assert.match(await page.locator('.g9m-result').innerText(), /6 cm²/);
        assert.ok(await page.locator('.g9m-choices button').evaluateAll(nodes => nodes.every(n => n.offsetHeight >= 44 && n.offsetWidth >= 44)));
        await page.locator('.g9m-choices button').nth(1).tap();
        assert.match(await page.locator('.g9m-result').innerText(), /12 cm²/);
        await page.locator('.g9m-choices button').nth(2).tap();
        assert.match(await page.locator('.g9m-result').innerText(), /24 cm²/);
        await page.locator('.g9m-choices button').last().tap();
        assert.equal(await page.locator('.g9m-triangle').count(), 0);
        assert.match(await page.locator('.g9m-result').innerText(), /There is no triangle/);
        await page.locator('.g9m-choices button').first().focus();
        await page.keyboard.press('Enter');
        assert.match(await page.locator('.g9m-result').innerText(), /6 cm²/);
        assert.ok(await page.locator('.sp2-formula .katex, .sp2-formula .triggle-tex').count() > 0);
        const quiz = page.locator('.sp2-answers button');
        assert.equal(await quiz.count(), 3);
        await quiz.first().tap();
        assert.match(await page.locator('[data-feedback]').innerText(), /Try again/);
        await quiz.nth(1).tap();
        assert.match(await page.locator('[data-feedback]').innerText(), /Correct/);
        await page.locator('details.g10ch3-deep-dive summary').tap();
        assert.match(await page.locator('details.g10ch3-deep-dive').innerText(), /half the perimeter/);
        assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), 'No page overflow at ' + width);
        await page.locator('#langTa').click();
        await page.locator('.g9m-lab').waitFor({state:'visible'});
        assert.equal(await page.locator('html').getAttribute('lang'), 'ta');
        assert.match(await page.locator('.g9m-result').innerText(), /அரைச் சுற்றளவு/);
        assert.equal(await page.locator('.g9m-tamil-badge').count(), 1, 'Tamil review warning must be visible');
        await page.locator('[data-top-next]').tap();
        assert.match(await page.locator('.sp2-concept-heading').innerText(), /நாற்கரம்/);
        assert.equal(await page.locator('.g9m-quad-svg').count(), 1);
        assert.equal(await page.locator('.g9m-quad-half.is-active').count(), 1);
        await page.locator('.g9m-choices button').last().tap();
        assert.equal(await page.locator('.g9m-quad-half.is-active').count(), 2);
        assert.match(await page.locator('.g9m-result').innerText(), /24 செ.மீ²/);
        assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), 'Quadrilateral overflow at ' + width);

        await page.locator('[data-top-next]').tap();
        assert.equal(await page.locator('.g9m-net-svg').count(), 1);
        const labBottom=await page.locator('.g9m-lab').boundingBox();
        const formula=await page.locator('.sp2-formula').boundingBox();
        assert.ok(labBottom.y < formula.y, 'Meaningful visual is introduced before formula, not buried below it');
        assert.equal(await page.locator('.g9m-net-face').count(), 6);
        assert.match(await page.locator('.g9m-result').innerText(), /52/);
        await page.locator('.g9m-choices').nth(1).locator('button').last().tap();
        assert.equal(await page.locator('.g9m-net-face.is-muted').count(), 2);
        assert.match(await page.locator('.g9m-result').innerText(), /28/);
        await page.locator('.g9m-choices').first().locator('button').last().tap();
        assert.match(await page.locator('.g9m-result').innerText(), /36/);
        await page.locator('.g9m-choices').nth(1).locator('button').first().tap();
        assert.match(await page.locator('.g9m-result').innerText(), /54/);

        await page.locator('[data-top-next]').tap();
        assert.match(await page.locator('.sp2-concept-heading').innerText(), /கனஅளவு/);
        assert.equal(await page.locator('.g9m-layer').count(), 2);
        assert.equal(await page.locator('.g9m-unit-cube').count(), 24);
        assert.match(await page.locator('.g9m-result').innerText(), /24/);
        await page.locator('.g9m-choices button').nth(2).tap();
        assert.equal(await page.locator('.g9m-unit-cube').count(), 27);
        await page.locator('.g9m-choices button').last().tap();
        assert.equal(await page.locator('.g9m-unit-cube').count(), 64);
        assert.notEqual(await page.locator('.g9m-layers').evaluate(el => getComputedStyle(el).overflowY), 'auto', 'No nested scrolling inside cube diagram');
        assert.match(await page.locator('.g9m-result').innerText(), /64/);
        assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), 'Volume overflow at ' + width);

        await page.locator('[data-top-next]').tap();
        assert.equal(await page.locator('[data-index-view]').isVisible(), true);
        assert.equal(await page.locator('.sp2-nav-button').count(), 4);
        await page.locator('.sp2-nav-button').last().tap();
        assert.match(await page.locator('.sp2-concept-heading').innerText(), /கனஅளவு/);
        await page.goBack();
        assert.equal(await page.locator('[data-index-view]').isVisible(), true);
        assert.deepEqual(errors, [], 'No JS errors at width ' + width);
      } finally {
        await context.close();
      }
    }
    console.log('Grade 9 Mensuration mobile: four concepts, side checks, face nets, volume layers, Tamil, quiz, and Next idea passed.');
  } finally {
    if (browser) await browser.close();
    await new Promise(resolve => server.close(resolve));
  }
}
main().catch(e => { console.error(e); process.exitCode = 1; });
