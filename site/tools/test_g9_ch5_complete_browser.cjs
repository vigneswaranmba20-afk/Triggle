'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs');
const http = require('node:http');
const path = require('node:path');
const { chromium } = require('playwright');

const siteDir = path.join(__dirname, '..');
const mime = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.json': 'application/json; charset=utf-8',
  '.woff2': 'font/woff2',
  '.webmanifest': 'application/manifest+json'
};

function startServer() {
  return new Promise(resolve => {
    const server = http.createServer((req, res) => {
      const cleanUrl = (req.url || '/').split('?')[0];
      let filePath = path.join(siteDir, cleanUrl === '/' ? 'index.html' : cleanUrl);
      if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
        res.writeHead(404);
        res.end('Not found');
        return;
      }
      const ext = path.extname(filePath);
      res.writeHead(200, { 'Content-Type': mime[ext] || 'application/octet-stream' });
      fs.createReadStream(filePath).pipe(res);
    });
    server.listen(0, '127.0.0.1', () => resolve({ server, port: server.address().port }));
  });
}

(async () => {
  const { server, port } = await startServer();
  const baseUrl = `http://127.0.0.1:${port}/index.html`;
  const browser = await chromium.launch();
  const pageErrors = [];
  try {
    for (const width of [320, 360, 390, 412]) {
      const context = await browser.newContext({ viewport: { width, height: 800 } });
      const page = await context.newPage();
      page.on('pageerror', err => pageErrors.push(`w=${width}: ${err.message}`));

      // 1. Open Ex 5.1 Q2 (Fig 5.11 SVG)
      await page.goto(`${baseUrl}?class=9&question=g9-ch5-ex5.1-q2`, { waitUntil: 'networkidle' });
      await page.waitForSelector('#lessonCard:not([hidden])');
      const overflow51 = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
      assert.equal(overflow51, false, `No horizontal overflow at ${width}px on Ex 5.1 Q2`);
      const figure = page.locator('#inlineFigureVisual svg.diagramguard-coordinate[data-dg-ready]');
      await figure.waitFor();
      assert.equal(await figure.locator('[data-dg-point]').count(),4,`Fig 5.11 SVG must render at ${width}px`);

      // Switch to Tamil and verify question stays on g9-ch5-ex5.1-q2
      await page.click('#langTa');
      await page.waitForTimeout(150);
      const qHeadTa = await page.textContent('#questionHead');
      assert(qHeadTa.includes('வினா 2') && await page.locator('#questionLabel').innerText() === 'பயிற்சி 5.1', `Tamil label preserved at ${width}px: ${qHeadTa}`);
      const overflowTa = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
      assert.equal(overflowTa, false, `No horizontal overflow in Tamil at ${width}px`);

      // 2. Open Ex 5.6 Q15 (MCQ with stacked fraction + interactive buttons)
      await page.goto(`${baseUrl}?class=9&question=g9-ch5-ex5.6-q15`, { waitUntil: 'networkidle' });
      await page.click('#langEn');
      await page.waitForSelector('.triggle-mcq-choices');
      const buttons = await page.locator('.triggle-mcq-btn').count();
      assert.equal(buttons, 4, 'Ex 5.6 Q15 must render 4 MCQ buttons');
      await page.locator('.triggle-mcq-btn').nth(0).click();
      let fb = await page.textContent('.triggle-mcq-feedback');
      assert(fb.includes('Try again'), `Wrong MCQ click gives Try again, got: ${fb}`);
      await page.locator('.triggle-mcq-btn').nth(1).click();
      fb = await page.textContent('.triggle-mcq-feedback');
      assert(fb.includes('Correct'), `Right MCQ click gives Correct, got: ${fb}`);

      // Check KaTeX glyphs and zero katex-error
      const katexCount = await page.locator('#lessonCard .katex').count();
      const katexErrors = await page.locator('#lessonCard .katex-error').count();
      assert(katexCount > 0, `KaTeX rendered at ${width}px`);
      assert.equal(katexErrors, 0, `Zero KaTeX errors at ${width}px`);

      if (width === 390) {
        const shotDir = process.env.TRIGGLE_SHOT_DIR || path.join(__dirname, '../../screenshots');
        fs.mkdirSync(shotDir, { recursive: true });
        await page.goto(`${baseUrl}?class=9&question=g9-ch5-ex5.1-q2`, { waitUntil: 'networkidle' });
        await page.screenshot({ path: path.join(shotDir, 'g9-ch5-ex51-q2-en-390.png'), fullPage: true });
        await page.click('#langTa');
        await page.waitForTimeout(150);
        await page.screenshot({ path: path.join(shotDir, 'g9-ch5-ex51-q2-ta-390.png'), fullPage: true });
        await page.goto(`${baseUrl}?class=9&question=g9-ch5-ex5.6-q15`, { waitUntil: 'networkidle' });
        await page.locator('.triggle-mcq-btn').nth(1).click();
        await page.screenshot({ path: path.join(shotDir, 'g9-ch5-ex56-q15-en-390.png'), fullPage: true });
      }
      await context.close();
    }

    // 3. Check Chapter 5 hub exercises index (6 exercises: 5.1-5.6) & Distance Formula concept video
    const ctx = await browser.newContext({ viewport: { width: 390, height: 800 } });
    const p = await ctx.newPage();
    await p.goto(`${baseUrl}?class=9&chapter=g9-ch5&section=exercises`, { waitUntil: 'networkidle' });
    const exBtns = await p.locator('.hub-exercise-link').count();
    assert.equal(exBtns, 6, 'Chapter 5 hub must list all 6 exercises (5.1-5.6)');

    await p.goto(`${baseUrl}?class=9&chapter=g9-ch5&section=concepts&concept=0`, { waitUntil: 'networkidle' });
    await p.locator('.sp2-concept-video-button').click();
    const hasVideo = await p.evaluate(() => !!document.querySelector('video source, video[src]'));
    assert.equal(hasVideo, true, 'Distance Formula concept video element must remain present');
    await ctx.close();

    assert.equal(pageErrors.length, 0, `Zero page errors expected, got: ${pageErrors.join('; ')}`);
    console.log('PASS G9 Ch5 mobile browser suite (320/360/390/412px, EN+TA, KaTeX, SVGs, MCQs, hub, video).');
  } finally {
    await browser.close();
    server.close();
  }
})();
