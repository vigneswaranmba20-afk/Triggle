'use strict';

const assert=require('node:assert/strict');
const {chromium}=require('playwright');
const {launchOptions,server}=require('./dashboard_test_support.cjs');
const {loadHints}=require('./test_g9_frontier_hints.cjs');
const targets=Object.entries(loadHints().TriggleG9FrontierHints);
const route=id=>'?class=9&question='+id;

async function checkHint(page,id,hint,lang){
  const details=page.locator('.why-step-g9[data-question="'+id+'"][data-step="'+(hint.step+1)+'"]');
  await details.locator('summary').click();
  const body=details.locator('.why-step-panel');
  assert.equal(await body.getAttribute('lang'),lang);
  assert.match(await body.innerText(),lang==='ta'?/\p{Script=Tamil}/u:/[a-z]{4}/i);
  const prose=await body.locator('p').evaluate(el=>{
    const clone=el.cloneNode(true);
    for(const formula of clone.querySelectorAll('[data-math-fallback]'))formula.replaceWith(formula.dataset.mathFallback);
    return clone.textContent;
  });
  assert.equal(prose,hint[lang]);
  assert.equal(await page.locator('#lessonCard [data-math-error=true],#lessonCard .katex-error').count(),0);
  assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));
}

(async()=>{
  const live=process.env.TRIGGLE_LIVE_BASE?.replace(/\/$/,'');
  const app=live?null:await server();
  const base=(live||app.base)+'/index.html';
  const browser=await chromium.launch(launchOptions());
  try {
    for(const width of live?[390]:[320,360,390,412]) {
      const context=await browser.newContext({viewport:{width,height:844},isMobile:true,hasTouch:true,
        serviceWorkers:'block',ignoreHTTPSErrors:!!live});
      try {
        const page=await context.newPage();
        const errors=[];
        page.on('pageerror',error=>errors.push(error.message));
        for(const [id,hint] of targets) {
          await page.goto(base+route(id),{waitUntil:'domcontentloaded'});
          for(const lang of ['en','ta']){
            await page.locator(lang==='ta'?'#langTa':'#langEn').click();
            await checkHint(page,id,hint,lang);
          }
        }
        assert.deepEqual(errors,[]);
      } finally {await context.close();}
      console.log('Grade 9: all 21 source-matched explanations in both languages at '+width+'px.');
    }
    if(!live) {
      const context=await browser.newContext({viewport:{width:390,height:844}});
      try {
        const page=await context.newPage();
        const [id,hint]=targets.at(-1);
        await page.addInitScript(id=>{
          const key='triggle.learned.v119';
          if(localStorage.getItem(key)===null)localStorage.setItem(key,JSON.stringify([id]));
        },id);
        await page.goto(base+route(id));
        await page.locator('#langTa').click();
        await page.evaluate(()=>navigator.serviceWorker.ready);
        await page.waitForFunction(()=>navigator.serviceWorker.controller!==null);
        await context.setOffline(true);
        await page.reload({waitUntil:'domcontentloaded'});
        await checkHint(page,id,hint,'ta');
        assert.equal(await page.locator('#markDone').getAttribute('aria-pressed'),'true');
        assert.deepEqual(await page.evaluate(()=>JSON.parse(localStorage.getItem('triggle.learned.v119'))),[id]);
      } finally {await context.close();}
      console.log('Grade 9: new why-step explanations work offline with existing progress.');
    }
  } finally {await browser.close();await app?.close();}
})().catch(error=>{console.error(error);process.exitCode=1;});
