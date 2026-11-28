'use strict';
const assert = require('node:assert/strict');
const {chromium, devices} = require('playwright');

const base = new URL(process.argv[2]);
const expected = new URL('https://samacheermaths.in/site/');
const routes = [
  {grade:9, id:'g9-ch3-ex3.2-q1-i', chapter:'g9-ch3'},
  {grade:10, id:'c10-4-ex4-1-q1-i', chapter:'g10-ch4'},
];
const url = (route, lang) => new URL('?'+new URLSearchParams({
  class:route.grade,question:route.id,lang
}),base).href;

async function checkQuestion(page,route,lang) {
  await page.goto(url(route,lang), {waitUntil:'domcontentloaded'});
  await page.locator('body:not(.ver-starting)').waitFor({timeout:60000});
  await page.locator(lang==='ta'?'#langTa':'#langEn').click();
  await page.waitForFunction(({chapter,lang,id}) =>
    document.documentElement.lang===lang &&
    window.TriggleStudentRelease?.chapter===chapter &&
    new URL(location.href).searchParams.get('question')===id &&
    document.querySelector('#questionText')?.textContent.trim() &&
    document.querySelector('#stepsList')?.textContent.trim() &&
    document.querySelector('#answerText')?.textContent.trim(),
    {...route,lang},{timeout:60000});
  const canonical = new URL(await page.locator('link[rel=canonical]').getAttribute('href'));
  assert.equal(canonical.origin,expected.origin);
  assert.equal(canonical.pathname,expected.pathname);
  assert.equal(canonical.searchParams.get('question'),route.id);
  assert.equal(canonical.searchParams.get('lang'),lang==='ta'?'ta':null);
}

(async()=>{
  const browser = await chromium.launch({headless:true});
  try {
    const context = await browser.newContext({...devices['Pixel 7'],reducedMotion:'reduce'});
    const page = await context.newPage();
    page.setDefaultTimeout(60000);
    const errors=[];
    page.on('pageerror',error=>errors.push(error.message));
    await page.goto(base.href,{waitUntil:'domcontentloaded'});
    await page.locator('body:not(.ver-starting)').waitFor();
    assert(await page.evaluate(()=>window.isSecureContext),'Secure browser context required');
    const manifestUrl=new URL(await page.locator('link[rel=manifest]').getAttribute('href'),page.url());
    const response=await context.request.get(manifestUrl.href);
    assert(response.ok(),'Manifest not reachable');
    const manifest=await response.json();
    assert.equal(manifest.id,'/site/');
    assert.equal(new URL(manifest.start_url,manifestUrl).href,base.href);
    assert.equal(new URL(manifest.scope,manifestUrl).href,base.href);
    assert.equal(manifest.display,'standalone');
    for(const size of ['192x192','512x512']){
      const icon=manifest.icons.find(i=>i.sizes===size&&i.purpose==='any');
      assert(icon,'Missing '+size+' install icon');
      const res=await context.request.get(new URL(icon.src,manifestUrl).href);
      assert(res.ok(),'Missing icon '+size);
      assert.match(res.headers()['content-type'],/image\/png/);
    }
    const sitemap=await context.request.get(new URL('sitemap.xml',base).href);
    assert(sitemap.ok());
    const xml=await sitemap.text();
    assert.equal((xml.match(/<loc>/g)||[]).length,40);
    assert(!xml.includes('github.io')&&xml.includes(expected.href));
    await page.waitForFunction(()=>navigator.serviceWorker.controller,null,{timeout:90000});
    assert.equal(await page.evaluate(async()=>(await navigator.serviceWorker.ready).scope),base.href);
    for(const route of routes){
      for(const lang of ['en','ta']) await checkQuestion(page,route,lang);
      await page.waitForSelector('html[data-offline-ready="true"]',{timeout:90000});
    }
    await context.setOffline(true);
    for(const route of routes) for(const lang of ['en','ta']) await checkQuestion(page,route,lang);
    assert.deepEqual(errors,[]);
    console.log('PASS Android-sized Chromium: both grades in English/Tamil online and offline; manifest, icons, secure context, scope, sitemap and canonical URLs');
    await context.close();
  } finally { await browser.close(); }
})().catch(error=>{console.error(error);process.exitCode=1;});
