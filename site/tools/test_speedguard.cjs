'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs/promises');
const os = require('node:os');
const path = require('node:path');
const {gzipSync} = require('node:zlib');
const {setTimeout:delay} = require('node:timers/promises');
const {buildStudentRelease} = require('./build_student_release.cjs');
const {server,launchOptions} = require('./dashboard_test_support.cjs');

const site = path.resolve(__dirname,'..');
const name = 'Triggle — Samacheer Kalvi Mathematics (Grades 9 & 10)';
const budgets = {
  homeWire: 310_000, homeJsWire: 150_000, homeCssWire: 90_000, homeRequests: 16,
  homeCache: 1_750_000, visitedCache: 5_500_000, questionWorkP95: 400, cls: .05,
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
  assert.equal(new URL(manifest.id,scope.origin).href,new URL(manifest.start_url,scope).href);
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
  for (const language of ['en','ta']) {
    const home = html.match(new RegExp('<template id="startup-'+language+'">([\\s\\S]*?)</template>'))?.[1];
    assert(home, 'Missing prepainted home for '+language);
    assert.equal((home.match(/<section\b/g)||[]).length,1);
    assert.doesNotMatch(home,/discover-home-recent|discover-resume-card|discover-no-recent/);
  }
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
  const app = await server(path.dirname(path.dirname(root)));
  const browser = await chromium.launch(launchOptions());
  try {
    const context = await browser.newContext({viewport:{width:390,height:844},isMobile:true,hasTouch:true,
      reducedMotion:'reduce',userAgent:'Mozilla/5.0 (Linux; Android 13) AppleWebKit/537.36 Chrome/149.0 Mobile Safari/537.36'});
    const page = await context.newPage();
    const cdp = await context.newCDPSession(page);
    await cdp.send('Emulation.setCPUThrottlingRate',{rate:4});
    const errors = [];
    page.on('pageerror',e=>errors.push(e.message));
    page.on('console',m=>{if(m.type()==='error')errors.push(m.text()+' '+(m.location().url||''));});
    await page.addInitScript(()=>{
      window.speedGuardCls=0;
      new PerformanceObserver(list=>{
        for(const e of list.getEntries())if(!e.hadRecentInput)window.speedGuardCls+=e.value;
      }).observe({type:'layout-shift',buffered:true});
    });
    const base = app.base+'/Triggle/site/index.html';
    await page.goto(base);
    await boot(page);
    await saved(page);
    const manifest = await cdp.send('Page.getAppManifest');
    assert.deepEqual(manifest.errors,[]);
    // Chromium's headless shell parses the manifest but has no installed-app registry.
    assert.equal(manifest.manifest.id,base,'Chrome must resolve the same application identity as the previous manifest');
    const {installabilityErrors} = await cdp.send('Page.getInstallabilityErrors');
    assert(installabilityErrors.every(error=>error.errorId==='in-incognito'),JSON.stringify(installabilityErrors));
    const perf = await page.evaluate(()=>({
      cls:window.speedGuardCls,
      requests:performance.getEntriesByType('resource').map(entry=>entry.name),
    }));
    assert(perf.cls<budgets.cls,JSON.stringify(perf));
    assert(perf.requests.length+1<=budgets.homeRequests,JSON.stringify(perf));
    assert(perf.requests.every(file=>new URL(file).origin===app.base),JSON.stringify(perf));
    assert(!perf.requests.some(file=>/student-g(?:9|10)|katex\.min\.js|\.(?:mp4|webm)(?:\?|$)/.test(file)),JSON.stringify(perf));
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
    await page.locator('#markDone').evaluate(el=>el.click());
    const samples = [];
    for (let i=0;i<24;i++) {
      samples.push(await page.evaluate(async forward=>{
        const start = performance.now();
        document.getElementById(forward?'next':'previous').click();
        const work = performance.now()-start;
        await new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve)));
        return {work,paint:performance.now()-start};
      },i%2===0));
    }
    const questionWorkP95 = p95(samples.slice(4).map(value=>value.work));
    const questionPaintP95 = p95(samples.slice(4).map(value=>value.paint));
    assert(questionWorkP95<=budgets.questionWorkP95,JSON.stringify(samples));
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
      homeCache:homeCache.bytes,visitedCache:visitedCache.bytes,questionWorkP95,questionPaintP95,offlineMathNodes:math,
    }));
    await context.close();
    await verifyUpdate(root,base,browser,release);
  } finally {
    await browser.close();
    await app.close();
  }
}

async function waitForState(read, label) {
  const deadline = Date.now()+30_000;
  while (Date.now()<deadline) {
    if (await read()) return;
    await delay(100);
  }
  assert.fail(label);
}

async function verifyUpdate(root, base, browser, release) {
  const previous = process.env.TRIGGLE_PREVIOUS_STAGE;
  const [html,worker] = await Promise.all([text(root,'index.html'),text(root,'service-worker.js')]);
  if (previous) await fs.cp(previous,root,{recursive:true});
  const context = await browser.newContext();
  try {
    const page = await context.newPage();
    await page.goto(base);
    await boot(page);
    await page.waitForFunction(()=>navigator.serviceWorker.controller);
    await page.goto(base+question);
    await boot(page);
    if (!previous) await saved(page);
    await page.locator('#langTa').click();
    await page.locator('#markDone').evaluate(el=>el.click());
    const priorStamp = previous ? null : release.version;
    const stamp = previous ? release.version : release.version.replace(/^./,v=>v==='f'?'e':'f');
    const validWorker = priorStamp ? worker.replaceAll(priorStamp,stamp) : worker;
    const nextHTML = priorStamp ? html.replaceAll(priorStamp,stamp) : html;
    await fs.writeFile(path.join(root,'index.html'),nextHTML);
    if (priorStamp) {
      await fs.writeFile(path.join(root,'service-worker.js'),validWorker.replace(release.shell[0],'./assets/missing-atomic-install.css'));
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
    }
    await fs.writeFile(path.join(root,'service-worker.js'),validWorker);
    await page.evaluate(async()=>{await (await navigator.serviceWorker.ready).update();});
    await waitForState(()=>page.evaluate(async()=>!!(await navigator.serviceWorker.getRegistration()).waiting),
      'The verified update reaches the waiting state');
    const probe = await context.newPage();
    const probeFile = 'triggle-worker-probe.html';
    await fs.writeFile(path.join(path.dirname(path.dirname(root)),probeFile),'<!doctype html><title>Worker test</title>');
    await probe.goto(new URL('/'+probeFile,base).href);
    await page.close();
    await waitForState(()=>probe.evaluate(async ({base,stamp})=>{
      const registration = await navigator.serviceWorker.getRegistration(base);
      const keys = await caches.keys();
      return registration?.active?.state==='activated' && !registration.waiting &&
        keys.length===1 && keys[0]==='triggle-lightspeed-'+stamp;
    },{base,stamp}),'The new release activates after the last app tab closes');
    await context.setOffline(true);
    await probe.goto(base+question);
    await boot(probe);
    assert.equal(await probe.locator('html').getAttribute('data-student-release'),stamp);
    assert.equal(await probe.locator('html').getAttribute('lang'),'ta');
    assert.equal(await probe.locator('#markDone').getAttribute('aria-pressed'),'true');
    assert(await probe.locator('#stepsList .katex').count());
    await probe.locator('#inlineFigureVisual img').evaluate(img=>img.decode());
    assert.deepEqual(await probe.evaluate(()=>caches.keys()),['triggle-lightspeed-'+stamp]);
    console.log('PASS VER SpeedGuard worker upgrade, offline recovery, language and learned progress');
  } finally {
    await context.close();
  }
}

(async()=>{
  const temp = await fs.mkdtemp(path.join(os.tmpdir(),'triggle-speedguard-'));
  const root = path.join(temp,'Triggle','site');
  try {
    await fs.mkdir(root,{recursive:true});
    await fs.cp(site,root,{recursive:true});
    buildStudentRelease(root);
    const release = await checkBuild(root);
    if (process.argv.includes('--upgrade-only')) {
      const {chromium} = require('playwright');
      const app = await server(temp);
      const browser = await chromium.launch(launchOptions());
      try { await verifyUpdate(root,app.base+'/Triggle/site/index.html',browser,release); }
      finally { await browser.close(); await app.close(); }
    } else if (process.argv.includes('--browser')) await browserChecks(root,release);
  } finally { await fs.rm(temp,{recursive:true,force:true}); }
})().catch(error=>{console.error(error);process.exitCode=1;});
