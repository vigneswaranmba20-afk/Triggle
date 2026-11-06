// Run with Playwright installed: node site/tools/test_curriculum_ui.cjs
// Uses the system Chromium when CHROMIUM_PATH is set; otherwise Playwright's browser.
const assert = require('node:assert/strict');
const fs = require('node:fs/promises');
const http = require('node:http');
const path = require('node:path');
const { chromium } = require('playwright');
const root = path.resolve(__dirname, '..');

async function serve() {
  const server = http.createServer(async (req, res) => {
    try {
      const pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
      const file = path.resolve(root, '.' + (pathname.endsWith('/') ? pathname + 'index.html' : pathname));
      if (!file.startsWith(root + path.sep)) throw Error('Outside site');
      const body = await fs.readFile(file);
      const types = { '.js': 'application/javascript', '.html': 'text/html', '.css': 'text/css', '.json': 'application/json', '.webmanifest': 'application/manifest+json', '.png': 'image/png' };
      res.writeHead(200, { 'content-type': types[path.extname(file)] || 'application/octet-stream', 'cache-control': 'no-store' });
      res.end(body);
    } catch { res.writeHead(404); res.end(); }
  });
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  return { server, url: `http://127.0.0.1:${server.address().port}` };
}
async function main() {
  const { server, url } = await serve();
  let browser;
  try {
    browser = await chromium.launch({ headless: true, ...(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {}), args: ['--no-sandbox'] });
  } catch (error) {
    await new Promise(resolve => server.close(resolve));
    throw error;
  }
  const errors = [], failedRequests = [];
  let count = 0;
  const contexts = [];
  async function context(width, serviceWorkers = 'block') {
    const ctx = await browser.newContext({ viewport: { width, height: 900 }, serviceWorkers, reducedMotion: 'reduce' });
    contexts.push(ctx);
    await ctx.addInitScript(() => {
      // Keep an optional seasonal greeting from changing test focus or layout.
      try { localStorage.setItem('triggle:diwali:last-shown', new Date(Date.now() + 19800000).toISOString().slice(0, 10)); } catch {}
    });
    ctx.on('page', page => {
      page.on('pageerror', error => errors.push(error.message));
      page.on('response', response => { if (response.url().startsWith(url) && response.status() >= 400 && !response.url().endsWith('/favicon.ico')) failedRequests.push(response.url() + ': ' + response.status()); });
    });
    return ctx;
  }
  async function visit(ctx, suffix = '/index.html') {
    const page = await ctx.newPage();
    await page.goto(url + suffix);
    await page.waitForFunction(() => window.TRIGGLE_CURRICULUM && document.getElementById('exerciseList').children.length > 0);
    return page;
  }
  async function check(name, run) { await run(); count++; console.log('PASS:', name); }
  async function noOverflow(page, label) {
    const size = await page.evaluate(() => ({ width: innerWidth, scroll: document.documentElement.scrollWidth }));
    assert.ok(size.scroll <= size.width + 1, `${label}: document width ${size.scroll} exceeds viewport ${size.width}`);
  }
  async function openSidebar(page) {
    if ((await page.viewportSize()).width <= 800 && !await page.locator('body').evaluate(el => el.classList.contains('drawer-open'))) await page.locator('#browseBtn').click();
  }
  async function selectChapter(page, id) {
    await openSidebar(page);
    await page.locator(`#exerciseList [data-chapter-id="${id}"]`).click();
    await page.locator('#chapterOverview').waitFor({ state: 'visible' });
  }
  try {
    await check('41 chapters appear across grades without publishing legacy question coverage', async () => {
      const page = await visit(await context(1280));
      const expected = {9:9, 10:8, 11:12, 12:12};
      let total = 0;
      for (const [grade, amount] of Object.entries(expected)) {
        await page.locator('#sideClasses button').filter({ has: page.locator('b', { hasText: grade }) }).click();
        assert.equal(await page.locator('#exerciseList [data-chapter-id]').count(), amount, `Grade ${grade} chapter count`);
        const chapters = await page.evaluate(g => window.TRIGGLE_CURRICULUM.grades.find(row => row.grade === Number(g)).chapters.map(ch => ({ id:ch.id, title:ch.title.en })), grade);
        for (const chapter of chapters) {
          await selectChapter(page, chapter.id);
          assert.equal(new URL(page.url()).searchParams.get('chapter'), chapter.id);
          assert.equal(await page.locator('#chapterOverviewTitle').innerText(), chapter.title);
        }
        total += amount;
      }
      assert.equal(total, 41);
      assert.equal(await page.evaluate(() => window.TRIGGLE_CURRICULUM.grades.flatMap(g => g.chapters).filter(c => c.status === 'published').length), 0);
    });
    for (const width of [320, 390, 1280]) {
      await check(`empty chapters, Tamil, navigation history and responsive layout at ${width}px`, async () => {
        const page = await visit(await context(width), '/index.html?class=11&chapter=g11-ch1');
        await page.locator('#chapterOverview').waitFor({ state: 'visible' });
        assert.equal(await page.locator('#lessonCard').isVisible(), false);
        assert.equal(await page.locator('#classicLink').isVisible(), false, 'Class 9 classic interface stays hidden on Grade 11 overview');
        assert.equal(await page.locator('#visualLessonAction').isVisible(), false);
        assert.equal(await page.locator('#markDone').isVisible(), false);
        assert.match(await page.locator('#chapterOverview').innerText(), /Planned/);
        await noOverflow(page, `${width}px English overview`);
        await page.keyboard.press('ArrowRight');
        assert.equal(new URL(page.url()).searchParams.get('chapter'), 'g11-ch1', 'Question shortcuts do not navigate a planned chapter');
        await page.locator('#crumb button').nth(1).click();
        assert.equal(await page.locator('#pathDialog').evaluate(el => el.open), true);
        assert.equal(await page.locator('#pathOptions .path-option').count(), 12);
        await page.keyboard.press('Escape');
        assert.equal(await page.locator('#pathDialog').evaluate(el => el.open), false);
        await page.locator('#langTa').click();
        assert.equal(await page.locator('html').getAttribute('lang'), 'ta');
        assert.match(await page.locator('#chapterOverview').innerText(), /[\u0B80-\u0BFF]/);
        assert.doesNotMatch(await page.locator('#chapterOverview').innerText(), /Planned|Worked examples|Prerequisites|Quizzes|Terminology/);
        await noOverflow(page, `${width}px Tamil overview`);
        if (width < 430) {
          const browse = await page.locator('#browseBtn').boundingBox();
          const basics = await page.locator('.basics-link').boundingBox();
          assert.ok(browse && basics, 'Both header links remain visible');
          const overlapX = Math.min(browse.x + browse.width, basics.x + basics.width) - Math.max(browse.x, basics.x);
          const overlapY = Math.min(browse.y + browse.height, basics.y + basics.height) - Math.max(browse.y, basics.y);
          assert.ok(overlapX <= 1 || overlapY <= 1, `${width}px Tamil header controls must not overlap`);
          for (const selector of ['#browseBtn', '.basics-link']) {
            const fits = await page.locator(selector).evaluate(el => el.scrollWidth <= el.clientWidth + 1);
            assert.ok(fits, `${width}px ${selector} text must fit its control`);
          }
        }
        if (process.env.TRIGGLE_SCREENSHOTS_DIR) {
          await fs.mkdir(process.env.TRIGGLE_SCREENSHOTS_DIR, { recursive:true });
          await page.screenshot({ path:path.join(process.env.TRIGGLE_SCREENSHOTS_DIR, `curriculum-${width}-ta.png`), fullPage:true });
        }
        await selectChapter(page, 'g11-ch2');
        assert.equal(new URL(page.url()).searchParams.get('chapter'), 'g11-ch2');
        await page.goBack();
        await page.waitForFunction(() => new URL(location.href).searchParams.get('chapter') === 'g11-ch1');
        await page.reload();
        assert.equal(await page.locator('#chapterOverview').isVisible(), true);
        assert.equal(await page.locator('html').getAttribute('lang'), 'ta');
        await noOverflow(page, `${width}px restored overview`);
        await page.goto(url + '/index.html?class=9&question=c9-example-6-1');
        await page.locator('#lessonCard').waitFor({ state: 'visible' });
        await noOverflow(page, `${width}px legacy Tamil question`);
        await selectChapter(page, 'g9-ch6');
        await page.locator('#chapterOverview [data-question-id="c9-example-6-1"]').click();
        assert.equal(new URL(page.url()).searchParams.get('question'), 'c9-example-6-1');
        assert.equal(await page.locator('#lessonCard').isVisible(), true);
        await noOverflow(page, `${width}px legacy question from chapter`);
        await page.close();
      });
    }
    await check('all 105 legacy deep links retain questions and working solutions', async () => {
      const ctx = await context(1280);
      const page = await visit(ctx);
      const links = await page.evaluate(() => Object.entries(window.TRIGGLE_CLASSES).flatMap(([grade,data]) => data.items.map(item => ({ grade, id:item.id }))));
      assert.equal(links.length, 105);
      for (const {grade,id} of links) {
        await page.goto(url + `/index.html?class=${grade}&question=${id}`);
        await page.waitForFunction(id => new URL(location.href).searchParams.get('question') === id && document.querySelector('#stepsList li'), id);
        assert.equal(new URL(page.url()).searchParams.get('question'), id);
        assert.equal(await page.locator('#lessonCard').isVisible(), true, id);
        assert.equal(await page.locator('#chapterOverview').isVisible(), false, id);
        assert.ok(await page.locator('#stepsList li').count() > 0, id);
        assert.ok((await page.locator('#answerText').innerText()).trim(), id);
      }
      await page.close();
    });
    await check('legacy progress, diagrams and immersive lessons survive chapter navigation', async () => {
      const page = await visit(await context(1280), '/index.html?class=9&question=c9-example-6-2');
      const question = await page.locator('#questionText').innerText();
      await page.locator('#markDone').click();
      assert.equal(await page.locator('#markDone').getAttribute('aria-pressed'), 'true');
      await page.reload();
      assert.equal(await page.locator('#markDone').getAttribute('aria-pressed'), 'true');
      await page.locator('#figureBtn').click();
      assert.equal(await page.locator('#figureDialog').evaluate(el => el.open), true);
      assert.ok(await page.locator('#diagramContent svg').count() > 0);
      await page.locator('#closeDiagram').click();
      await page.locator('#tabGuided').click();
      assert.equal(await page.locator('#guidedDialog').evaluate(el => el.open), true);
      assert.ok((await page.locator('#guidedSteps').innerText()).trim());
      await page.locator('#deepNext').click();
      await page.locator('#closeGuided').click();
      assert.equal(await page.locator('#questionText').innerText(), question);
      const prior = page.url();
      await selectChapter(page, 'g9-ch1');
      await page.goBack();
      await page.waitForURL(prior);
      assert.equal(await page.locator('#lessonCard').isVisible(), true);
      assert.equal(await page.locator('#markDone').getAttribute('aria-pressed'), 'true');
      await noOverflow(page, 'legacy question after history navigation');
    });
    await check('search retains existing questions and returns to full chapter navigation', async () => {
      const page = await visit(await context(1280), '/index.html?class=9&question=c9-example-6-1');
      await page.locator('#search').fill('6.1');
      assert.ok(await page.locator('#exerciseList .exercise-question').count() > 0);
      const button = page.locator('#exerciseList .exercise-question').first();
      await button.click();
      assert.ok(new URL(page.url()).searchParams.get('question'));
      assert.equal(await page.locator('#lessonCard').isVisible(), true);
      await page.locator('#search').fill('');
      assert.equal(await page.locator('#exerciseList [data-chapter-id]').count(), 9);
    });
    await check('Phase 2 bilingual Set Language micro-lab works without leaving the chapter', async () => {
      const page = await visit(await context(320), '/index.html?class=9&chapter=g9-ch1');
      const lab = page.locator('#chapterOverview .p2-lab');
      await lab.waitFor({ state:'visible' });
      assert.equal(await lab.locator('[data-result-set]').innerText(), '{1, 2, 3, 4, 5, 6}');
      await lab.locator('[data-op="intersection"]').click();
      assert.equal(await lab.locator('[data-result-set]').innerText(), '{3, 5}');
      assert.equal(await lab.locator('[data-op="intersection"]').getAttribute('aria-pressed'), 'true');
      await lab.locator('[data-choice="0"]').click();
      assert.ok((await lab.locator('[data-feedback]').innerText()).includes('Try again'));
      await lab.locator('[data-hint]').click();
      assert.ok((await lab.locator('[data-feedback]').innerText()).includes('middle'));
      await lab.locator('[data-choice="1"]').click();
      assert.ok((await lab.locator('[data-feedback]').innerText()).includes('Correct'));
      await lab.locator('.p2-deeper summary').click();
      for(let i=0;i<4;i++) await lab.locator('[data-next-reason]').click();
      assert.equal(await lab.locator('[data-reasoning] li').count(), 4);
      assert.ok((await lab.locator('[data-reasoning]').innerText()).includes('20 − 16 = 4'));
      assert.equal(await lab.locator('[data-next-reason]').isVisible(), false);
      await page.locator('#langTa').click();
      assert.ok((await lab.locator('h3').first().innerText()).includes('கண மொழி'));
      await lab.locator('[data-op="difference"]').click();
      assert.equal(await lab.locator('[data-result-set]').innerText(), '{1, 2}');
      await noOverflow(page,'Tamil micro-lab at 320px');
    });
    await check('Grouped square-bracket exponents are visibly attached to their closing bracket', async () => {
      const page = await visit(await context(390), '/index.html?class=9&chapter=g9-ch1');
      const geometry = await page.evaluate(() => {
        const probe=document.createElement('div');
        probe.style.cssText='position:fixed;left:0;top:0;background:white;z-index:10000;font-size:24px';
        probe.innerHTML=window.TriggleNotation.render('[x+1]²')+' '+window.TriggleNotation.render('( [[1|2]] )²');
        document.body.append(probe);
        const powers=Array.from(probe.querySelectorAll('.math-group-power')).map(group => ({
          bracket:group.querySelectorAll('.math-bracket')[1].getBoundingClientRect().top,
          exponent:group.querySelector(':scope > sup').getBoundingClientRect().top,
          text:group.textContent
        }));
        probe.remove();
        return powers;
      });
      assert.equal(geometry.length,2);
      for(const item of geometry) {
        assert.ok(item.exponent < item.bracket + 3,'Exponent must sit above the closing bracket '+JSON.stringify(item));
        assert.ok(item.text.includes('2'),'The exponent must not disappear');
      }
    });
    await check('Phase 2 lesson is available during an offline mobile reload', async () => {
      const ctx = await context(390,'allow');
      const page = await visit(ctx,'/index.html?class=9&chapter=g9-ch1');
      await page.evaluate(async () => {await navigator.serviceWorker.ready;});
      await page.reload();
      await page.waitForFunction(() => !!navigator.serviceWorker.controller);
      await ctx.setOffline(true);
      await page.reload();
      const lab=page.locator('.p2-lab');
      await lab.waitFor({state:'visible'});
      await lab.locator('[data-op="neither"]').click();
      assert.equal(await lab.locator('[data-result-set]').innerText(),'{7, 8}');
      await ctx.setOffline(false);
    });
    await check('service worker caches curriculum and supports an offline chapter reload', async () => {
      const ctx = await context(390, 'allow');
      const page = await visit(ctx, '/index.html?class=12&chapter=g12-ch12');
      await page.evaluate(async () => { await navigator.serviceWorker.ready; });
      await page.reload();
      await page.waitForFunction(() => !!navigator.serviceWorker.controller);
      const cacheUrls = await page.evaluate(async () => (await Promise.all((await caches.keys()).map(async key => (await (await caches.open(key)).keys()).map(r => r.url)))).flat());
      assert.ok(cacheUrls.some(u => new URL(u).pathname.endsWith('/data/curriculum.js')), 'Curriculum data included in offline cache');
      await ctx.setOffline(true);
      await page.reload();
      await page.locator('#chapterOverview').waitFor({ state:'visible' });
      assert.equal(new URL(page.url()).searchParams.get('chapter'), 'g12-ch12');
      await noOverflow(page, 'offline mobile chapter');
      await ctx.setOffline(false);
    });
    assert.deepEqual(errors, [], 'No uncaught browser errors');
    assert.deepEqual(failedRequests, [], 'No broken local page assets');
    console.log(`PASS: ${count} curriculum browser scenarios; no uncaught errors or broken assets.`);
  } finally {
    for (const ctx of contexts) await ctx.close();
    await browser.close();
    await new Promise(resolve => server.close(resolve));
  }
}
main().catch(error => { console.error(error); process.exitCode = 1; });
