// Browser regression checks: install Playwright separately, then run
// NODE_PATH=/path/to/node_modules node site/tools/test_diwali.cjs
// Set CHROMIUM_PATH if Chromium is not /usr/bin/chromium. The final integration
// check downloads the two pinned CDN scripts through the configured HTTP proxy.
const assert = require('node:assert/strict');
const fs = require('node:fs/promises');
const http = require('node:http');
const path = require('node:path');
const { chromium } = require('playwright');
const { promisify } = require('node:util');
const execFile = promisify(require('node:child_process').execFile);

const root = path.resolve(__dirname, '..');
const key = 'triggle:diwali:last-shown';
const day = '2026-11-06';
const initialTime = '2026-11-06T06:00:00Z';
const cdn = /https:\/\/cdn\.jsdelivr\.net\/npm\/(fireworks-js|canvas-confetti)@/;
const mockFireworks = `
window.Fireworks = { Fireworks: class {
  constructor(container) { this.container=container; this.canvas=document.createElement('canvas'); container.append(this.canvas); }
  start() { window.__diwaliTest.starts++; }
  stop() { window.__diwaliTest.stops++; }
  clear() { window.__diwaliTest.clears++; }
  updateSize() {}
  updateOptions() {}
  destroy() { window.__diwaliTest.destroys++; this.canvas.remove(); }
}};`;
const mockConfetti = `
window.confetti = Object.assign(function(){}, {create(canvas) {
  const instance=()=>{window.__diwaliTest.confetti++;return Promise.resolve();};
  instance.reset=()=>{window.__diwaliTest.resets++;};
  return instance;
}});`;

async function until(check, message, timeout = 5000) {
  const deadline = Date.now() + timeout;
  while (Date.now() < deadline) {
    if (await check()) return;
    await new Promise(resolve => setTimeout(resolve, 25));
  }
  assert.fail(message);
}

async function serve() {
  const server = http.createServer(async (req, res) => {
    try {
      const pathname = new URL(req.url, 'http://localhost').pathname;
      const file = path.resolve(root, '.' + (pathname.endsWith('/') ? pathname + 'index.html' : pathname));
      if (!file.startsWith(root + path.sep)) throw new Error('Outside site');
      const body = await fs.readFile(file);
      const types = { '.js': 'application/javascript', '.html': 'text/html', '.css': 'text/css', '.json': 'application/json', '.webmanifest': 'application/manifest+json' };
      res.writeHead(200, { 'content-type': types[path.extname(file)] || 'application/octet-stream', 'cache-control': 'no-store' });
      res.end(body);
    } catch {
      res.writeHead(404); res.end();
    }
  });
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  return { server, url: `http://127.0.0.1:${server.address().port}` };
}

async function main() {
  const { server, url } = await serve();
  const browser = await chromium.launch({
    headless: true,
    executablePath: process.env.CHROMIUM_PATH || '/usr/bin/chromium',
    args: ['--no-sandbox'],
  });
  const contexts = [];
  const errors = [];
  let passed = 0;
  async function context({ time = initialTime, reducedMotion = 'no-preference', mock = true, viewport = { width: 1280, height: 850 }, storage = true, locks = true, delayLibraries = 0 } = {}) {
    const ctx = await browser.newContext({ viewport, reducedMotion, serviceWorkers: 'block', timezoneId: 'America/Los_Angeles' });
    contexts.push(ctx);
    await ctx.addInitScript(({ time, storage, locks, mock }) => {
      const NativeDate = Date;
      let instant = NativeDate.parse(time);
      window.Date = class extends NativeDate {
        constructor(...args) { super(...(args.length ? args : [instant])); }
        static now() { return instant; }
      };
      window.__setDiwaliTime = value => { instant = NativeDate.parse(value); };
      window.__diwaliTest = { starts: 0, stops: 0, clears: 0, destroys: 0, confetti: 0, resets: 0 };
      if (!storage) {
        for (const method of ['getItem', 'setItem']) {
          const native = Storage.prototype[method];
          Storage.prototype[method] = function(key, ...args) {
            if (key === 'triggle:diwali:last-shown') throw new DOMException('Blocked', 'SecurityError');
            return native.call(this, key, ...args);
          };
        }
      }
      if (!locks) Object.defineProperty(navigator, 'locks', { value: undefined });
      // Only mocked-library scenarios bypass SRI. The real-library check keeps it.
      if (mock) Object.defineProperty(HTMLScriptElement.prototype, 'integrity', { get() { return ''; }, set() {} });
    }, { time, storage, locks, mock });
    if (mock) await ctx.route(cdn, async route => {
      if (delayLibraries) await new Promise(resolve => setTimeout(resolve, delayLibraries));
      await route.fulfill({ contentType: 'application/javascript', headers: { 'access-control-allow-origin': '*' }, body: route.request().url().includes('fireworks-js') ? mockFireworks : mockConfetti }).catch(() => {});
    });
    ctx.on('page', page => page.on('pageerror', error => errors.push(error.message)));
    return ctx;
  }
  async function visit(ctx, suffix = '/index.html') {
    const page = await ctx.newPage();
    await page.goto(url + suffix, { waitUntil: 'domcontentloaded' });
    await page.waitForFunction(() => document.getElementById('stepsList').children.length > 0);
    return page;
  }
  async function visible(page) { return page.locator('#diwaliGreeting').isVisible(); }
  async function check(name, body) { await body(); passed++; console.log('PASS:', name); }
  async function first(ctx) {
    const page = await visit(ctx);
    await until(() => visible(page), 'First visit must show the greeting');
    assert.equal(await page.evaluate(key => localStorage.getItem(key), key), day);
    return page;
  }
  try {
    await check('first visit persists IST day; fireworks and confetti run', async () => {
      const page = await first(await context());
      await until(() => page.evaluate(() => __diwaliTest.starts === 1 && __diwaliTest.confetti > 0), 'Both animation libraries must run');
      assert.equal(await page.locator('#diwaliEffects').evaluate(el => getComputedStyle(el).pointerEvents), 'none');
      const before = await page.locator('#questionText').innerText();
      await page.locator('#next').click();
      assert.notEqual(await page.locator('#questionText').innerText(), before, 'Overlay permits lesson navigation');
      await page.locator('#diwaliDismiss').click();
      await until(async () => !(await visible(page)), 'Dismiss closes celebration');
      assert.equal(await page.locator('#diwaliEffects canvas').count(), 0);
      assert.ok(await page.evaluate(() => __diwaliTest.stops + __diwaliTest.destroys > 0 && __diwaliTest.resets > 0), 'Animation instances cleaned up');
    });
    await check('reload, focus, tab switching and second tab never replay', async () => {
      const ctx = await context();
      const page = await first(ctx);
      await page.reload();
      await page.waitForTimeout(150);
      assert.equal(await visible(page), false);
      const second = await visit(ctx);
      await second.bringToFront();
      await page.bringToFront();
      await page.evaluate(() => {
        window.dispatchEvent(new Event('focus'));
        window.dispatchEvent(new PageTransitionEvent('pageshow', { persisted: true }));
        document.dispatchEvent(new Event('visibilitychange'));
      });
      await page.waitForTimeout(100);
      assert.equal(await visible(page), false);
      assert.equal(await visible(second), false);
      assert.equal(await page.evaluate(() => __diwaliTest.starts), 0);
    });
    await check('page navigation away and back does not replay', async () => {
      const page = await first(await context());
      await page.goto(url + '/playground.html');
      await page.goto(url + '/index.html');
      await page.waitForTimeout(150);
      assert.equal(await visible(page), false);
    });
    await check('simultaneous first tabs claim a single daily celebration', async () => {
      const ctx = await context();
      const pages = await Promise.all([ctx.newPage(), ctx.newPage()]);
      await Promise.all(pages.map(page => page.goto(url + '/index.html')));
      await pages[0].waitForTimeout(300);
      const states = await Promise.all(pages.map(page => page.evaluate(() => ({ shown: !document.getElementById('diwaliGreeting').hidden, starts: __diwaliTest.starts }))));
      assert.equal(states.filter(state => state.shown).length, 1);
      assert.equal(states.reduce((sum, state) => sum + state.starts, 0), 1);
    });
    await check('storage event synchronizes an already open tab without replay', async () => {
      const ctx = await context();
      const firstPage = await first(ctx);
      const second = await visit(ctx);
      await second.evaluate(({ key, day }) => {
        localStorage.setItem(key, '2026-11-05');
        localStorage.setItem(key, day);
      }, { key, day });
      await until(async () => !(await visible(firstPage)), 'Cross-tab storage event cancels active owner');
      assert.equal(await second.evaluate(() => __diwaliTest.starts), 0);
      assert.ok(await firstPage.evaluate(() => __diwaliTest.starts <= 1));
      assert.equal(await visible(second), false);
    });
    await check('hidden/pagehide cleanup never restarts on pageshow or focus', async () => {
      const page = await first(await context());
      await until(() => page.evaluate(() => __diwaliTest.starts === 1), 'Effects start');
      await page.evaluate(() => {
        Object.defineProperty(document, 'hidden', { configurable: true, get: () => true });
        document.dispatchEvent(new Event('visibilitychange'));
      });
      assert.equal(await visible(page), false);
      await page.evaluate(() => {
        Object.defineProperty(document, 'hidden', { configurable: true, get: () => false });
        document.dispatchEvent(new Event('visibilitychange'));
        window.dispatchEvent(new Event('focus'));
        window.dispatchEvent(new PageTransitionEvent('pageshow', { persisted: true }));
      });
      await page.waitForTimeout(100);
      assert.equal(await visible(page), false);
      assert.equal(await page.evaluate(() => __diwaliTest.starts), 1);
    });
    await check('late library completion after dismissal does not restart effects', async () => {
      const page = await first(await context({ delayLibraries: 350 }));
      await page.locator('#diwaliDismiss').click();
      await page.waitForTimeout(800);
      assert.equal(await visible(page), false);
      assert.equal(await page.evaluate(() => __diwaliTest.starts), 0);
      assert.equal(await page.locator('#diwaliEffects canvas').count(), 0);
    });
    await check('reduced motion shows a static greeting without loading effects', async () => {
      const ctx = await context({ reducedMotion: 'reduce' });
      let requests = 0; ctx.on('request', request => { if (cdn.test(request.url())) requests++; });
      const page = await first(ctx);
      assert.equal(requests, 0);
      assert.equal(await page.evaluate(() => __diwaliTest.starts + __diwaliTest.confetti), 0);
      await page.locator('#diwaliDismiss').click();
      assert.equal(await visible(page), false);
    });
    await check('changing reduced-motion preference immediately cleans up', async () => {
      const page = await first(await context());
      await until(() => page.evaluate(() => __diwaliTest.starts === 1), 'Effects start');
      await page.emulateMedia({ reducedMotion: 'reduce' });
      await until(async () => !(await visible(page)), 'Preference change stops celebration');
      assert.equal(await page.locator('#diwaliEffects canvas').count(), 0);
    });
    await check('mobile greeting and dismiss control fit the viewport', async () => {
      const page = await first(await context({ viewport: { width: 360, height: 740 } }));
      const bounds = await page.locator('#diwaliGreeting').boundingBox();
      assert.ok(bounds.x >= 0 && bounds.x + bounds.width <= 360);
      const close = await page.locator('#diwaliDismiss').boundingBox();
      assert.ok(close.width >= 40 && close.height >= 40 && close.x + close.width <= 360);
      await page.locator('#diwaliDismiss').click();
      assert.equal(await visible(page), false);
    });
    await check('an IST day change permits one new visit even in another visitor timezone', async () => {
      const ctx = await context({ time: '2026-11-06T18:30:01Z' });
      const seed = await ctx.newPage(); await seed.goto(url + '/playground.html');
      await seed.evaluate(({ key, day }) => localStorage.setItem(key, day), { key, day });
      const page = await visit(ctx);
      await until(() => visible(page), 'New IST day must permit a visit');
      assert.equal(await page.evaluate(key => localStorage.getItem(key), key), '2026-11-07');
      await page.reload(); await page.waitForTimeout(100);
      assert.equal(await visible(page), false);
    });
    await check('November 8 IST remains eligible; exact November 9 IST cutoff excludes it', async () => {
      const before = await visit(await context({ time: '2026-11-08T18:29:59Z' }));
      await until(() => visible(before), 'Last second of November 8 IST remains eligible');
      assert.equal(await before.evaluate(key => localStorage.getItem(key), key), '2026-11-08');
      const after = await visit(await context({ time: '2026-11-08T18:30:00Z' }));
      await after.waitForTimeout(100);
      assert.equal(await visible(after), false);
      assert.equal(await after.evaluate(key => localStorage.getItem(key), key), null);
    });
    await check('storage or Web Locks unavailable safely skips celebration', async () => {
      for (const settings of [{ storage: false }, { locks: false }]) {
        const page = await visit(await context(settings));
        await page.waitForTimeout(150);
        assert.equal(await visible(page), false);
        assert.equal(await page.evaluate(() => __diwaliTest.starts), 0);
      }
    });
    await check('automatic dismissal releases canvases and does not replay', async () => {
      const page = await first(await context());
      await until(async () => !(await visible(page)), 'Celebration automatically closes after 12 seconds', 14000);
      assert.equal(await page.locator('#diwaliEffects canvas').count(), 0);
      const counts = await page.evaluate(() => ({ ...__diwaliTest }));
      await page.waitForTimeout(400);
      assert.deepEqual(await page.evaluate(() => ({ ...__diwaliTest })), counts, 'No animation callbacks continue after cleanup');
      await page.evaluate(() => window.dispatchEvent(new Event('focus')));
      assert.equal(await visible(page), false);
    });
    await check('real pinned Fireworks.js and canvas-confetti pass SRI and render', async () => {
      const sources = [
        ['https://cdn.jsdelivr.net/npm/fireworks-js@2.10.8/dist/index.umd.js', process.env.DIWALI_FIREWORKS_PATH],
        ['https://cdn.jsdelivr.net/npm/canvas-confetti@1.9.3/dist/confetti.browser.min.js', process.env.DIWALI_CONFETTI_PATH],
      ];
      const libraries = new Map(await Promise.all(sources.map(async ([src, local]) => [src, local ? await fs.readFile(local, 'utf8') : (await execFile('curl', ['--fail', '--silent', '--show-error', '--location', '--max-time', '30', src], { maxBuffer: 2 * 1024 * 1024 })).stdout])));
      for (const [label, viewport] of [['desktop', { width: 1280, height: 850 }], ['mobile', { width: 360, height: 740 }]]) {
        const ctx = await context({ mock: false, viewport });
        await ctx.route(cdn, route => route.fulfill({ contentType: 'application/javascript', headers: { 'access-control-allow-origin': '*' }, body: libraries.get(route.request().url()) }));
        const page = await first(ctx);
        await until(() => page.evaluate(() => !!window.Fireworks?.Fireworks && !!window.confetti?.create && !document.getElementById('diwaliEffects').hidden && document.querySelectorAll('#diwaliEffects canvas').length === 2), 'Real effect libraries must initialize with SRI intact');
        await page.waitForTimeout(2100);
        const painted = await page.locator('#diwaliEffects canvas').evaluateAll(canvases => canvases.map(canvas => {
          const { data } = canvas.getContext('2d').getImageData(0, 0, canvas.width, canvas.height);
          for (let i = 3; i < data.length; i += 4) if (data[i]) return true;
          return false;
        }));
        assert.ok(painted.some(Boolean), 'Actual libraries paint visible particles');
        const screenshot = path.join(process.env.DIWALI_SCREENSHOT_DIR || require('node:os').tmpdir(), `triggle-diwali-${label}.png`);
        await page.screenshot({ path: screenshot });
        console.log('Screenshot:', screenshot);
        const resized = label === 'desktop' ? { width: 900, height: 700 } : { width: 412, height: 850 };
        await page.setViewportSize(resized);
        await page.waitForTimeout(100);
        const canvasSizes = await page.locator('#diwaliEffects canvas').evaluateAll(canvases => canvases.map(canvas => ({ width: canvas.width, height: canvas.height, cssWidth: canvas.getBoundingClientRect().width, cssHeight: canvas.getBoundingClientRect().height })));
        assert.ok(canvasSizes.every(size => size.width === resized.width && size.height === resized.height && size.cssWidth === resized.width && size.cssHeight === resized.height), 'Both real canvases resize with the viewport');
        const question = await page.locator('#questionText').innerText();
        await page.locator('#next').click();
        assert.notEqual(await page.locator('#questionText').innerText(), question, 'Real effect overlay permits lesson interaction');
        await page.locator('#diwaliDismiss').click();
        assert.equal(await page.locator('#diwaliEffects canvas').count(), 0);
        assert.equal(await visible(page), false);
      }
    });
    assert.deepEqual(errors, [], 'No browser runtime errors');
    console.log(`PASS: ${passed} Diwali browser regression scenarios`);
  } finally {
    await Promise.all(contexts.map(ctx => ctx.close()));
    await browser.close();
    await new Promise(resolve => server.close(resolve));
  }
}
main().catch(error => { console.error(error); process.exitCode = 1; });
