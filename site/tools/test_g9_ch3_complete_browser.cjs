'use strict';
// Mobile browser verification for complete Grade 9 Chapter 3 Algebra (EN+TA, concepts, exercises 3.1/3.7/3.15, reciprocal links).
const assert = require('node:assert/strict');
const fs = require('node:fs/promises');
const http = require('node:http');
const path = require('node:path');
const { chromium } = require('playwright');

const root = path.resolve(__dirname, '..');

async function main() {
  const server = http.createServer(async (req, res) => {
    try {
      const pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
      const file = path.resolve(root, '.' + (pathname.endsWith('/') ? pathname + 'index.html' : pathname));
      if (!file.startsWith(root + path.sep)) throw Error('unsafe path');
      const body = await fs.readFile(file);
      const ext = path.extname(file);
      res.writeHead(200, {
        'content-type': {
          '.js': 'application/javascript', '.css': 'text/css', '.woff2': 'font/woff2',
          '.json': 'application/json', '.svg': 'image/svg+xml'
        }[ext] || 'text/html',
        'cache-control': 'no-store'
      });
      res.end(body);
    } catch { res.writeHead(404); res.end(); }
  });
  await new Promise(r => server.listen(0, '127.0.0.1', r));
  const base = 'http://127.0.0.1:' + server.address().port;
  let browser;
  try {
    browser = await chromium.launch({
      headless: true,
      ...(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {}),
      args: ['--no-sandbox']
    });
    for (const width of [320, 390]) {
      const context = await browser.newContext({ viewport: { width, height: 700 }, hasTouch: true, isMobile: true, serviceWorkers: 'block' });
      const page = await context.newPage();
      const errors = [];
      page.on('pageerror', e => errors.push(e.message));
      try {
        // Check text that is actually painted. The accessible fallback used to
        // contain the entire question even when the student saw only equations.
        const exercises = {
          '3.3': [1,3,4,5,6,8,9,10,11,12], '3.4': [6,7,8,9,10,11,14],
          '3.7': [2,3,4,6,7], '3.10': [3], '3.11': [2,3], '3.12': [2,3],
          '3.13': [2,3], '3.14': [1,2,3,4,5,6]
        };
        await page.goto(base + '/index.html?class=9&question=g9-ch3-ex3.3-q1');
        for (const [exercise, numbers] of Object.entries(exercises)) {
          for (const number of numbers) {
            const id = 'g9-ch3-ex' + exercise + '-q' + number;
            await page.evaluate(id => {
              history.pushState({}, '', '?class=9&question=' + id);
              dispatchEvent(new PopStateEvent('popstate'));
            }, id);
            for (const lang of ['en', 'ta']) {
              await page.locator(lang === 'en' ? '#langEn' : '#langTa').click();
              const card = page.locator('#questionText');
              assert(await card.isVisible(), id + ' visible prompt');
              const visible = await card.innerText();
              const source = await page.evaluate(({id, lang}) =>
                window.TRIGGLE_CLASSES[9].items.find(item => item.id === id).q[lang], {id,lang});
              const words = source.match(/[A-Za-z]{2,}|[\u0B80-\u0BFF]+/gu);
              for (const word of words) assert(visible.includes(word), id + ' ' + lang + ' missing ' + word);
              if (exercise === '3.13' && number === 2) {
                for (const value of ['80','220','₹']) assert(visible.includes(value), id + ' missing ' + value);
                assert((await page.locator('.step-equation .katex-html').first().innerText()).includes('220'));
                assert(!visible.includes('x+y'), id + ' derived equations belong in the solution');
              }
            }
          }
        }
        // 1. Concept index (10 stages) + Practice this idea -> Exercise -> Understand this idea -> Concept
        await page.goto(base + '/index.html?class=9&chapter=g9-ch3&section=concepts&concept=4');
        await page.locator('.g9a-lab').waitFor({ state: 'visible' });
        assert.equal(await page.locator('.sp2-nav-button').count(), 10);
        await page.locator('.g9a-practice-btn').first().click();
        await page.locator('#lessonCard').waitFor({ state: 'visible' });
        assert.ok(await page.locator('.g9a-concept-return').isVisible(), 'Understand this idea link visible on exercise');
        assert.equal(await page.locator('[data-math-error="true"]').count(), 0);
        assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), 'No EN overflow at ' + width);

        // Return to concept via Understand this idea
        await page.locator('.g9a-concept-return').click();
        await page.locator('.g9a-lab').waitFor({ state: 'visible' });

        // 2. Check representative exercises (beginning, middle, end) in EN & TA
        for (const qid of ['g9-ch3-ex3.1-q1-i', 'g9-ch3-ex3.7-q5-i', 'g9-ch3-ex3.15-q24']) {
          await page.goto(base + '/index.html?class=9&question=' + qid);
          await page.locator('#lessonCard').waitFor({ state: 'visible' });
          await page.locator('#langEn').click();
          assert.equal(await page.locator('[data-math-error="true"]').count(), 0, 'EN math error on ' + qid);
          assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), 'No EN overflow on ' + qid);
          await page.locator('#langTa').click();
          assert.equal(await page.locator('html').getAttribute('lang'), 'ta');
          assert.equal(await page.locator('[data-math-error="true"]').count(), 0, 'TA math error on ' + qid);
          assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), 'No TA overflow on ' + qid);
        }
        assert.deepEqual(errors, [], 'Zero page errors at ' + width);
      } finally { await context.close(); }
    }
    console.log('PASS G9 Ch3 complete browser: 320px/390px EN+TA concepts, reciprocal links, Ex3.1/3.7/3.15 KaTeX & layout.');
  } finally {
    if (browser) await browser.close();
    await new Promise(r => server.close(r));
  }
}
main().catch(err => { console.error(err); process.exitCode = 1; });
