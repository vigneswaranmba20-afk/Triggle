'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs/promises');
const os = require('node:os');
const path = require('node:path');
const {gzipSync} = require('node:zlib');
const {buildStudentRelease} = require('./build_student_release.cjs');
const {server,launchOptions} = require('./dashboard_test_support.cjs');

const site = path.resolve(__dirname,'..');
const name = 'Triggle — Samacheer Kalvi Mathematics (Grades 9 & 10)';
const budgets = {
  homeWire: 310_000, homeJsWire: 150_000, homeCssWire: 90_000, homeRequests: 16,
  homeCache: 1_550_000, visitedCache: 5_500_000, questionP95: 240, cls: .05,
};
const p95 = values => [...values].sort((a,b)=>a-b)[Math.ceil(values.length*.95)-1];
const text = (root,file) => fs.readFile(path.join(root,file),'utf8');
const config = worker => JSON.parse(worker.match(/^const release = (.*);$/m)[1]);

async function checkBuild(root) {
  const [manifest, worker, html, sitemap] = await Promise.all([
    text(root,'manifest.webmanifest').then(JSON.parse),text(root,'service-worker.js'),
    text(root,'index.html'),text(root,'sitemap.xml'),
  ]);
  const release = config(worker);
  assert.equal(manifest.name,name);
  assert.equal(manifest.short_name,'Triggle');
  assert.equal(manifest.display,'standalone');
  const scope = new URL('https://example.com/Triggle/site/');
  assert.equal(new URL(manifest.start_url,scope).href,new URL('index.html',scope).href);
  assert.equal(new URL(manifest.id,new URL(manifest.start_url,scope)).href,new URL(manifest.start_url,scope).href);
  assert.equal(new URL(manifest.scope,scope).href,scope.href);
  for (const size of [192,512]) for (const purpose of ['any','maskable']) {
    const icon = manifest.icons.find(i=>i.sizes===size+'x'+size&&i.purpose===purpose);
    assert(icon,purpose+' '+size);
    const png = await fs.readFile(path.join(root,icon.src));
    assert.equal(png.toString('ascii',12,16),'IHDR');
    assert.equal(png.readUInt32BE(16),size);
    assert.equal(png.readUInt32BE(20),size);
    assert(png.length<=32_000,icon.src+' exceeds icon budget');
    if (purpose==='maskable') assert.equal(png[25],2,'Maskable icon must be opaque RGB');
  }
  assert(html.includes('data-student-release="'+release.version+'"'));
  assert.equal(Object.keys(release.chapters).length,17);
  assert.equal((sitemap.match(/<loc>/g)||[]).length,40);
  for (const inputs of Object.values(release.chapters)) {
    assert(!inputs.some(file=>release.shell.includes(file)),'Chapter inputs must stay out of shell install');
  }
  const files = new Set([...release.immutable,...release.media,...release.shell,...release.fonts]);
  await Promise.all([...files].map(file=>fs.access(path.join(root,file.split('?')[0]))));
  const active = release.shell.filter(file=>!/(?:icon-(?:192|512)|home-studio\.webp|tamil\.woff2)/.test(file));
  const responses = await Promise.all(['index.html',...active].map(async file=>{
    const bytes = await fs.readFile(path.join(root,file.split('?')[0]));
    return {file,wire:/\.(?:webp|png|ico|woff2)$/.test(file)?bytes.length:gzipSync(bytes).length};
  }));
  const bytes = match => responses.filter(row=>match.test(row.file)).reduce((n,r)=>n+r.wire,0);
  const measured = {homeWire:bytes(/./),homeJsWire:bytes(/\.js$/),homeCssWire:bytes(/\.css(?:\?|$)/)};
  assert(measured.homeWire<=budgets.homeWire,JSON.stringify(measured));
  assert(measured.homeJsWire<=budgets.homeJsWire,JSON.stringify(measured));
  assert(measured.homeCssWire<=budgets.homeCssWire,JSON.stringify(measured));
  console.log('PASS VER SpeedGuard build',JSON.stringify(measured));
  return release;
}

const boot = page => page.locator('body:not(.ver-starting)').waitFor();
const saved = page => page.waitForSelector('html[data-offline-ready="true"]');
const question = '?class=10&question=c10-4-ex4-1-q1-i';
const unseen = '?class=9&chapter=g9-ch9&section=concepts';
const cacheState = page => page.evaluate(async()=>{
  const entries = [];
  for (const key of await caches.keys()) {
    const cache = await caches.open(key);
    for (const request of await cache.keys()) {
      const response = await cache.match(request);
      entries.push([new URL(request.url).pathname,(await response.arrayBuffer()).byteLength]);
    }
  }
  return {paths:entries.map(([file])=>file),bytes:entries.reduce((sum,[,bytes])=>sum+bytes,0)};
});

async function browserChecks(root, release) {
  const {chromium} = require('playwright');
  const app = await server(root);
  const browser = await chromium.launch(launchOptions());
  try {
    const context = await browser.newContext({viewport:{width:390,height:844},isMobile:true,hasTouch:true,
      reducedMotion:'reduce',userAgent:'Mozilla/5.0 (Linux; Android 13) AppleWebKit/537.36 Chrome/149.0 Mobile Safari/537.36'});
    const page = await context.newPage();
    const cdp = await context.newCDPSession(page);
    await cdp.send('Emulation.setCPUThrottlingRate',{rate:4});
    const errors = [];
    page.on('pageerror',e=>errors.push(e.message));
    page.on('console',m=>{if(m.type()==='error')errors.push(m.text());});
    await page.addInitScript(()=>{
      window.speedGuardCls=0;
      new PerformanceObserver(list=>{
        for(const e of list.getEntries())if(!e.hadRecentInput)window.speedGuardCls+=e.value;
      }).observe({type:'layout-shift',buffered:true});
    });
    const base = app.base+'/index.html';
    await page.goto(base);
    await boot(page);
    await saved(page);
    const perf = await page.evaluate(()=>({
      cls:window.speedGuardCls,
      requests:performance.getEntriesByType('resource').map(entry=>entry.name),
    }));
    assert(perf.cls<budgets.cls,JSON.stringify(perf));
    assert(perf.requests.length+1<=budgets.homeRequests,JSON.stringify(perf));
    assert(perf.requests.every(file=>new URL(file).origin===app.base),JSON.stringify(perf));
    assert(!perf.requests.some(file=>/student-g(?:9|10)|katex\.min\.js|\.(mp4|webm)/.test(file)),JSON.stringify(perf));
    const homeCache = await cacheState(page);
    assert(homeCache.bytes<=budgets.homeCache,JSON.stringify(homeCache));
    assert(!homeCache.paths.some(file=>/student-(?:lesson|g(?:9|10))\./.test(file)),JSON.stringify(homeCache));

    const opener = page.locator('#discoveryView [data-triggle-install]');
    await opener.click();
    assert.match(await page.locator('#triggleInstallHelp').innerText(),/Add to Home screen/);
    assert(await page.locator('#triggleNativeInstall').isHidden());
    await page.keyboard.press('Escape');
    assert(await opener.evaluate(el=>document.activeElement===el));
    const evidence = process.env.TRIGGLE_SPEEDGUARD_EVIDENCE;
    const photo = file => evidence?page.screenshot({path:path.join(evidence,file)}):Promise.resolve();
    for (const choice of ['dismissed','accepted']) {
      await page.evaluate(choice=>{
        const event = new Event('beforeinstallprompt',{cancelable:true});
        Object.assign(event,{prompt:async()=>{},userChoice:Promise.resolve({outcome:choice})});
        window.dispatchEvent(event);
      },choice);
      await opener.click();
      assert(await page.locator('#triggleNativeInstall').isVisible());
      await photo('install-native-entry-'+choice+'.png');
      await page.locator('#triggleNativeInstall').click();
      assert.match(await page.locator('#triggleInstallStatus').innerText(),new RegExp(choice));
      await page.keyboard.press('Escape');
    }
    await page.locator('#langTa').click();
    await opener.click();
    assert.equal(await page.locator('#triggleInstallTitle').innerText(),'Triggle செயலியை நிறுவுக');
    await photo('install-tamil-fallback.png');
    await page.keyboard.press('Escape');
    await page.evaluate(()=>window.dispatchEvent(new Event('appinstalled')));
    assert.equal(await opener.innerText(),'Triggle பற்றி');

    await context.setOffline(true);
    await page.goto(base+unseen);
    assert(await page.locator('#triggleUnavailable').isVisible());
    assert.match(await page.locator('#triggleUnavailable [lang=ta] [role=status]').innerText(),/இணைய இணைப்பு தேவை/);
    await photo('offline-unvisited-ta.png');
    await page.locator('#triggleUnavailable [lang=ta] a').click();
    await boot(page);
    assert(await page.locator('#triggleOffline').isVisible());
    await context.setOffline(false);

    await page.goto(base+question);
    await boot(page);
    await saved(page);
    assert.equal(await page.locator('html').getAttribute('lang'),'ta');
    await page.locator('#markDone').click();
    const samples = [];
    for (let i=0;i<20;i++) {
      samples.push(await page.evaluate(async forward=>{
        const start = performance.now();
        document.getElementById(forward?'next':'previous').click();
        await new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve)));
        return performance.now()-start;
      },i%2===0));
    }
    assert(p95(samples)<=budgets.questionP95,JSON.stringify(samples));
    const visitedCache = await cacheState(page);
    assert(visitedCache.bytes<=budgets.visitedCache,JSON.stringify(visitedCache));
    assert(visitedCache.paths.every(file=>!/\.(?:mp4|webm)$/.test(file)));
    const questionMarkup = await page.locator('#questionText').innerHTML();
    await context.setOffline(true);
    await page.reload();
    await boot(page);
    assert.equal(await page.locator('#questionText').innerHTML(),questionMarkup);
    assert.equal(await page.locator('#markDone').getAttribute('aria-pressed'),'true');
    await page.locator('#inlineFigureVisual img').evaluate(img=>img.decode());
    const math = await page.locator('#stepsList .katex').count();
    assert(math>0,'Missing KaTeX offline');
    await photo('offline-visited-ta.png');
    for (const language of ['en','ta']) {
      await page.locator(language==='ta'?'#langTa':'#langEn').click();
      await page.locator('#inlineFigureVisual img').evaluate(img=>img.decode());
    }
    await context.setOffline(false);
    assert.deepEqual(errors,[]);
    console.log('PASS VER SpeedGuard browser',JSON.stringify({
      release:release.version,requests:perf.requests.length+1,cls:perf.cls,
      homeCache:homeCache.bytes,visitedCache:visitedCache.bytes,questionP95:p95(samples),offlineMathNodes:math,
    }));
    await context.close();
    await verifyUpdate(root,base,browser,release);
  } finally {
    await browser.close();
    await app.close();
  }
}

async function verifyUpdate(root, base, browser, release) {
  const previous = process.env.TRIGGLE_PREVIOUS_STAGE;
  const [html,worker] = await Promise.all([text(root,'index.html'),text(root,'service-worker.js')]);
  if (previous) await fs.cp(previous,root,{recursive:true});
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto(base);
  await boot(page);
  await page.waitForFunction(()=>navigator.serviceWorker.controller);
  await page.goto(base+question);
  await boot(page);
  if (!previous) await saved(page);
  await page.locator('#langTa').click();
  await page.locator('#markDone').click();
  const priorStamp = previous ? null : release.version;
  const stamp = previous ? release.version : release.version.replace(/^./,v=>v==='f'?'e':'f');
  const validWorker = priorStamp?worker.replaceAll(priorStamp,stamp):worker;
  const nextHTML = priorStamp?html.replaceAll(priorStamp,stamp):html;
  if (priorStamp) {
    const brokenWorker = validWorker.replace(release.shell[0],'./assets/missing-atomic-install.css');
    await fs.writeFile(path.join(root,'index.html'),nextHTML);
    await fs.writeFile(path.join(root,'service-worker.js'),brokenWorker);
    await page.evaluate(async()=>{
      const registration = await navigator.serviceWorker.ready;
      await registration.update();
      const installer = registration.installing;
      if (installer && installer.state !== 'redundant') await new Promise(resolve=>{
        installer.addEventListener('statechange',()=>{if(installer.state==='redundant')resolve();});
      });
    });
    assert.equal(await page.evaluate(async()=>!!(await navigator.serviceWorker.ready).waiting),false);
    await page.reload();
    await boot(page);
    assert.equal(await page.locator('html').getAttribute('data-student-release'),priorStamp);
  } else await fs.writeFile(path.join(root,'index.html'),nextHTML);
  await fs.writeFile(path.join(root,'service-worker.js'),validWorker);
  await page.evaluate(async()=>{await (await navigator.serviceWorker.ready).update();});
  await page.waitForFunction(async()=>!!(await navigator.serviceWorker.getRegistration()).waiting);
  await page.close();
  const next = await context.newPage();
  await next.goto(base+question);
  await boot(next);
  await next.waitForFunction(stamp=>caches.has('triggle-lightspeed-'+stamp),stamp);
  await next.waitForFunction(()=>navigator.serviceWorker.controller);
  await context.setOffline(true);
  await next.reload();
  await boot(next);
  assert.equal(await next.locator('html').getAttribute('data-student-release'),stamp);
  assert.equal(await next.locator('html').getAttribute('lang'),'ta');
  assert.equal(await next.locator('#markDone').getAttribute('aria-pressed'),'true');
  assert(await next.locator('#stepsList .katex').count());
  assert.deepEqual(await next.evaluate(()=>caches.keys()),['triggle-lightspeed-'+stamp]);
  await context.close();
  console.log('PASS VER SpeedGuard worker upgrade, offline recovery, language and learned progress');
}

(async()=>{
  const root = await fs.mkdtemp(path.join(os.tmpdir(),'triggle-speedguard-'));
  try {
    await fs.cp(site,root,{recursive:true});
    buildStudentRelease(root);
    const release = await checkBuild(root);
    if (process.argv.includes('--browser')) await browserChecks(root,release);
  } finally { await fs.rm(root,{recursive:true,force:true}); }
})().catch(error=>{console.error(error);process.exitCode=1;});
