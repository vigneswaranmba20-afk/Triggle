'use strict';

const assert = require('node:assert/strict');
const {chromium} = require('playwright');
const {server, launchOptions} = require('./dashboard_test_support.cjs');
const {items,legacyBookmark} = require('../data/textbook-fidelity/g10-ch2-frontier-capacity.json');
const followingId = 'c10-2-ex2-7-q3';

async function navigate(page,base,id) {
  await page.evaluate(url=>{
    history.pushState({},'',url);
    dispatchEvent(new PopStateEvent('popstate'));
  },base+'/index.html?class=10&question='+id);
}

const question = page => new URL(page.url()).searchParams.get('question');

async function checkReader(page,language) {
  const tamil = language === 'ta';
  await page.locator(tamil ? '#langTa' : '#langEn').evaluate(button=>button.click());
  const reasons = (await page.locator('#stepsList .step-reason').allTextContents()).join(' ');
  assert.match(reasons,tamil ? /சம கொள்ளளவு/ : /English.*equal[- ]capacit/);
  assert.equal(await page.locator('#lessonCard [data-math-error="true"],#lessonCard .katex-error').count(),0);
  assert(await page.locator('#stepsList details[class*=why-step]').count()>0);
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1),false);
}

(async () => {
  const live = process.env.TRIGGLE_LIVE_BASE;
  const app = live ? null : await server();
  const base = live || app.base;
  const browser = await chromium.launch(launchOptions());
  try {
    await Promise.all((live ? [390] : [320,360,390,412]).map(async width=>{
      const context = await browser.newContext({viewport:{width,height:844},isMobile:true,hasTouch:true,ignoreHTTPSErrors:!!live});
      try {
        const page = await context.newPage();
        await page.goto(base+'/index.html?class=10&question='+items[0].id);
        for(const item of items) {
          await navigate(page,base,item.id);
          await checkReader(page,'en');
          await checkReader(page,'ta');
        }
        await navigate(page,base,legacyBookmark.duplicateOf);
        await page.locator('#next').evaluate(button=>button.click());
        assert.equal(question(page),followingId);
        await navigate(page,base,legacyBookmark.id);
        assert.equal(question(page),legacyBookmark.id);
        await page.locator('#markDone').evaluate(button=>button.click());
        await page.locator('#previous').evaluate(button=>button.click());
        assert.equal(question(page),legacyBookmark.duplicateOf);
        await navigate(page,base,legacyBookmark.id);
        await page.locator('#next').evaluate(button=>button.click());
        assert.equal(question(page),followingId);
        await navigate(page,base,legacyBookmark.id);
        assert.equal(await page.locator('#markDone').getAttribute('aria-pressed'),'true');
        if(!live && width===390) {
          await page.evaluate(()=>navigator.serviceWorker.ready);
          await page.waitForFunction(()=>!!navigator.serviceWorker.controller);
          await context.setOffline(true);
          await page.reload();
          assert.equal(question(page),legacyBookmark.id);
          assert.equal(await page.locator('#markDone').getAttribute('aria-pressed'),'true');
          await navigate(page,base,items[0].id);
          await checkReader(page,'ta');
        }
        console.log(`Grade 10 exact capacity and direct-bookmark navigation passed at ${width}px.`);
      } finally {
        await context.close();
      }
    }));
  } finally {
    await browser.close();
    await app?.close();
  }
})().catch(error=>{
  console.error(error);
  process.exitCode = 1;
});
