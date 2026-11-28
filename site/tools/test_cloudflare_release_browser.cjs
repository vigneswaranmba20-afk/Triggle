'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs/promises');
const http = require('node:http');
const os = require('node:os');
const path = require('node:path');
const {chromium, devices} = require('playwright');
const {launchOptions} = require('./dashboard_test_support.cjs');

const expected = new URL('https://samacheermaths.in/site/');
const timeout = 30000;
const mobile = {...devices['Pixel 7'], reducedMotion:'reduce'};
const ready = page => page.locator('body:not(.ver-starting)').waitFor();
const offlineReady = page => page.locator('html[data-offline-ready="true"]').waitFor({timeout:60000});
const controlled = page => page.waitForFunction(() => !!navigator.serviceWorker.controller);
const route = (base, params, entry = './') => new URL(entry + '?' + new URLSearchParams(params), base);

// Model the production failure with the same old cache key and followed redirect.
function previousWorker(release) {
  const chapter = release.chapters['g10-ch6'].at(-1);
  return `
    const shell = new URL('./index.html', self.registration.scope).href;
    const cacheName = 'triggle-lightspeed-previous';
    self.addEventListener('install', event => event.waitUntil((async () => {
      const cache = await caches.open(cacheName);
      await cache.put(shell, await fetch(shell));
      await cache.add(${JSON.stringify(chapter)});
    })()));
    self.addEventListener('activate', event => event.waitUntil(self.clients.claim()));
    self.addEventListener('fetch', event => {
      if (event.request.mode === 'navigate') {
        event.respondWith(caches.open(cacheName).then(cache => cache.match(shell)));
      }
    });
  `;
}

async function servePages(root) {
  const worker = await fs.readFile(path.join(root, 'site/service-worker.js'), 'utf8');
  const config = JSON.parse(worker.match(/^const release = (.+);$/m)[1]);
  let currentWorker = previousWorker(config);
  const types = {
    '.html':'text/html', '.js':'application/javascript', '.json':'application/json',
    '.css':'text/css', '.png':'image/png', '.webp':'image/webp', '.svg':'image/svg+xml',
    '.woff2':'font/woff2', '.webmanifest':'application/manifest+json', '.xml':'application/xml',
  };
  const server = http.createServer(async (req, res) => {
    const {pathname, search} = new URL(req.url, 'http://localhost');
    const redirect = {'/index.html':'/', '/site':'/site/', '/site/index.html':'/site/'};
    res.setHeader('Cache-Control', 'no-cache');
    if (Object.hasOwn(redirect, pathname)) {
      res.writeHead(308, {Location:redirect[pathname] + search}).end();
      return;
    }
    if (pathname === '/site/service-worker.js') {
      res.writeHead(200, {'Content-Type':types['.js']}).end(currentWorker);
      return;
    }
    const file = path.resolve(root, '.' + pathname + (pathname.endsWith('/') ? 'index.html' : ''));
    try {
      assert(file.startsWith(root + path.sep));
      const body = await fs.readFile(file);
      res.writeHead(200, {'Content-Type':types[path.extname(file)] || 'application/octet-stream'}).end(body);
    } catch {
      res.writeHead(404).end();
    }
  });
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  return {
    base:new URL('http://127.0.0.1:' + server.address().port + '/site/'),
    upgrade() { currentWorker = worker; },
    close:() => new Promise(resolve => server.close(resolve)),
  };
}

async function checkShell(page, base, chapter, lang) {
  await ready(page);
  await controlled(page);
  assert.equal(new URL(page.url()).pathname, base.pathname);
  assert.equal(await page.locator('html').getAttribute('lang'), lang);
  assert.equal(await page.evaluate(() => window.TriggleStudentRelease.chapter), chapter);
  assert.equal(await page.locator('#triggleUnavailable').isHidden(), true);
}

async function question(page, base, chapter, lang, id) {
  await checkShell(page, base, chapter, lang);
  const params = new URL(page.url()).searchParams;
  assert.equal(params.get('question'), id);
  for (const selector of ['#questionText', '#stepsList', '#stepsList :is(.final-answer-value, .twd-final-value)']) {
    const node = page.locator(selector).first();
    await node.waitFor();
    assert((await node.innerText()).trim(), chapter + ' ' + lang + ' ' + selector);
  }
  const canonical = new URL(await page.locator('link[rel=canonical]').getAttribute('href'));
  assert.equal(canonical.origin + canonical.pathname, expected.href);
  assert.equal(canonical.searchParams.get('question'), id);
  assert.equal(canonical.searchParams.get('lang'), lang === 'ta' ? 'ta' : null);
}

async function checkMigration(browser, local) {
  const context = await browser.newContext(mobile);
  try {
    const page = await context.newPage();
    const {base} = local;
    await page.goto(route(base, {class:10}).href);
    await controlled(page);
    assert(await page.evaluate(async () =>
      (await (await caches.open('triggle-lightspeed-previous')).match('./index.html')).redirected));
    const failed = await context.newPage();
    await assert.rejects(failed.goto(route(base, {class:10, chapter:'g10-ch6'}).href), /net::ERR_FAILED/);
    await failed.close();
    // Keep the old worker's client open while the recovery worker takes over.
    local.upgrade();
    await page.evaluate(async () => {
      window.workerReplaced = false;
      navigator.serviceWorker.addEventListener('controllerchange', () => { window.workerReplaced = true; }, {once:true});
      await (await navigator.serviceWorker.ready).update();
    });
    await page.waitForFunction(() => window.workerReplaced && navigator.serviceWorker.controller?.state === 'activated');
    const keys = await page.evaluate(() => caches.keys());
    assert.equal(keys.length, 1, JSON.stringify(keys));
    assert.notEqual(keys[0], 'triggle-lightspeed-previous');
    const shell = await page.evaluate(async cacheName => {
      const response = await (await caches.open(cacheName)).match('./index.html');
      return {redirected:response.redirected, url:response.url};
    }, keys[0]);
    assert.deepEqual(shell, {redirected:false, url:base.href});
    await context.setOffline(true);
    const retained = route(base, {class:10, chapter:'g10-ch6', section:'concepts', concept:0, lang:'ta'}, 'index.html');
    retained.hash = 'reopen';
    await page.goto(retained.href);
    await checkShell(page, base, 'g10-ch6', 'ta');
    assert.equal(new URL(page.url()).hash, '#reopen');
    await page.locator('#chapterSectionContent [data-detail-view]:not([hidden])').waitFor();
    console.log('PASS reproduced Chromium ERR_FAILED and replaced the active worker, retaining the saved chapter offline');
  } finally {
    await context.close();
  }
}

async function checkManifest(context, page, base) {
  const manifestUrl = new URL(await page.locator('link[rel=manifest]').getAttribute('href'), page.url());
  const manifest = await (await context.request.get(manifestUrl.href)).json();
  assert.equal(manifest.id, '/site/');
  assert.equal(new URL(manifest.start_url, manifestUrl).href, base.href);
  assert.equal(new URL(manifest.scope, manifestUrl).href, base.href);
  assert.equal(manifest.display, 'standalone');
  for (const size of ['192x192', '512x512']) {
    const icon = manifest.icons.find(entry => entry.sizes === size && entry.purpose === 'any');
    assert(icon, 'Missing install icon ' + size);
    const downloaded = await context.request.get(new URL(icon.src, manifestUrl).href);
    assert(downloaded.ok());
    assert.match(downloaded.headers()['content-type'], /^image\/png/);
  }
  const cdp = await context.newCDPSession(page);
  assert.deepEqual((await cdp.send('Page.getInstallabilityErrors')).installabilityErrors, []);
  await page.locator('[data-triggle-install]:visible').first().tap();
  await page.locator('#triggleInstallDialog[open]').waitFor();
  await page.locator('#triggleInstallClose').tap();
  assert.equal(await page.evaluate(async () => (await navigator.serviceWorker.ready).scope), base.href);
  const xml = await (await context.request.get(new URL('sitemap.xml', base).href)).text();
  assert.equal((xml.match(/<loc>/g) || []).length, 40);
  assert(!xml.includes('github.io') && xml.includes(expected.href));
  const manifestId = new URL(manifest.id, manifestUrl).href;
  await cdp.send('PWA.install', {manifestId, installUrlOrBundleUrl:base.href});
  await cdp.send('PWA.changeAppUserSettings', {manifestId, displayMode:'standalone'});
  return {cdp, manifestId};
}

async function checkMatrix(base) {
  const profile = await fs.mkdtemp(path.join(os.tmpdir(), 'triggle-cloudflare-browser-'));
  let context;
  let launch;
  let manifestId;
  try {
    context = await chromium.launchPersistentContext(profile, {...launchOptions(), channel:'chromium', ...mobile});
    context.setDefaultTimeout(timeout);
    const page = context.pages()[0];
    const errors = [];
    const watch = tab => tab.on('pageerror', error => errors.push(error.message));
    watch(page);
    context.on('page', watch);
    context.on('requestfailed', request => {
      if (request.isNavigationRequest() && request.failure()?.errorText !== 'net::ERR_ABORTED') {
        errors.push(request.url() + ' ' + request.failure()?.errorText);
      }
    });

    const rootLink = new URL('/index.html?class=10&lang=ta#root-link', base);
    await page.goto(rootLink.href);
    await page.waitForURL(url => url.pathname === base.pathname);
    await checkShell(page, base, null, 'ta');
    assert.equal(new URL(page.url()).hash, '#root-link');
    await page.goto(base.href);
    await checkShell(page, base, null, 'en');
    ({cdp:launch, manifestId} = await checkManifest(context, page, base));
    const compared = [];

    for (const lang of ['en', 'ta']) {
      for (const [grade, count] of [[9, 9], [10, 8]]) {
        await page.goto(base.href);
        await ready(page);
        await page.locator(lang === 'ta' ? '#langTa' : '#langEn').tap();
        await page.locator('.discover-grade[data-grade="' + grade + '"]').tap();
        const cards = page.locator('.discover-chapter');
        assert.equal(await cards.count(), count);
        for (let index = 1; index <= count; index++) {
          const chapter = 'g' + grade + '-ch' + index;
          await cards.and(page.locator('[data-chapter="' + chapter + '"]')).tap();
          await page.waitForURL(url => url.searchParams.get('chapter') === chapter);
          await checkShell(page, base, chapter, lang);
          await offlineReady(page);
          await page.locator('[data-hub-section="concepts"]').tap();
          const panel = page.locator('#chapterOverview[data-hub-section="concepts"] #chapterSectionContent');
          await panel.locator('[data-nav] button').first().tap();
          assert((await panel.locator('[data-panel]').innerText()).trim(), chapter + ' concept detail');
          await panel.locator('[data-back-index]').tap();
          await page.locator('.hub-back-menu').tap();
          await page.locator('[data-hub-section="exercises"]').tap();
          const exercise = page.locator('button.hub-exercise-link').first();
          await exercise.tap();
          const id = new URL(page.url()).searchParams.get('question');
          assert(id, chapter + ' did not open an exercise');
          await question(page, base, chapter, lang, id);
          compared.push({grade, chapter, lang, id});
          await page.goBack();
          await page.locator('#chapterOverview[data-hub-section="exercises"]').waitFor();
          await page.locator('.hub-back-menu').tap();
          await page.locator('.hub-back-class').tap();
          await cards.first().waitFor();
        }
        console.log('PASS grade ' + grade + ' ' + lang + ' (' + count + ' chapters)');
      }
    }
    assert.equal(compared.length, 34);
    console.log('PASS 34 mobile touch paths from grade directory through chapter, Concepts, Exercises, solution and browser Back');

    const math = {class:9, question:'g9-ch3-ex3.2-q1-i', lang:'ta'};
    await page.goto(route(base, math, 'index.html').href);
    await question(page, base, 'g9-ch3', 'ta', math.question);
    await offlineReady(page);
    await checkMath(page);

    const chapterLink = route(base, {class:10, chapter:'g10-ch6', section:'concepts', concept:0, lang:'ta'}, 'index.html');
    chapterLink.hash = 'concept-link';
    await page.goto(chapterLink.href);
    await checkShell(page, base, 'g10-ch6', 'ta');
    await page.locator('#chapterSectionContent [data-detail-view]:not([hidden])').waitFor();
    assert.equal(new URL(page.url()).hash, '#concept-link');
    const launcher = await context.newPage();
    launch = await context.newCDPSession(launcher);
    await context.setOffline(true);
    await page.close();
    const app = context.waitForEvent('page');
    await launch.send('PWA.launch', {manifestId});
    const reopened = await app;
    await checkShell(reopened, base, null, 'ta');
    assert(await reopened.evaluate(() => !navigator.onLine && matchMedia('(display-mode: standalone)').matches));
    await reopened.locator('.discover-grade[data-grade="10"]').tap();
    await reopened.locator('.discover-chapter[data-chapter="g10-ch6"]').tap();
    await reopened.waitForURL(url => url.searchParams.get('chapter') === 'g10-ch6');
    await checkShell(reopened, base, 'g10-ch6', 'ta');
    for (const {grade, chapter, lang, id} of compared) {
      await reopened.goto(route(base, {class:grade, question:id, lang}, 'index.html').href);
      await question(reopened, base, chapter, lang, id);
    }
    await reopened.goto(chapterLink.href);
    await reopened.locator('#chapterSectionContent [data-detail-view]:not([hidden])').waitFor();
    await reopened.goto(route(base, math, 'index.html').href);
    await checkMath(reopened);
    assert.deepEqual(errors, []);
    console.log('PASS 34 offline exercise links, concept bookmark, KaTeX and installed Chromium app relaunch offline');
  } finally {
    if (manifestId) await launch.send('PWA.uninstall', {manifestId}).catch(() => {});
    await context?.close();
    await fs.rm(profile, {recursive:true, force:true});
  }
}

async function checkMath(page) {
  const glyph = page.locator('#stepsList .katex-html').first();
  await glyph.waitFor();
  assert(await glyph.evaluate(async element => {
    await document.fonts.ready;
    return element.getBoundingClientRect().width > 0 &&
      [...document.fonts].some(font => font.family.startsWith('KaTeX') && font.status === 'loaded');
  }), 'Expected rendered KaTeX glyphs and a loaded math font');
}

(async () => {
  const local = process.argv[2] === '--local' ? await servePages(path.resolve(process.argv[3])) : null;
  let browser;
  try {
    if (local) {
      browser = await chromium.launch({...launchOptions(), channel:'chromium'});
      await checkMigration(browser, local);
      await browser.close();
    }
    await checkMatrix(local?.base || new URL(process.argv[2]));
  } finally {
    await browser?.close();
    await local?.close();
  }
})().catch(error => {console.error(error); process.exitCode = 1;});
