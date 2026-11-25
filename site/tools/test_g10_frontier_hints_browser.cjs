'use strict';

const assert=require('node:assert/strict');
const {chromium}=require('playwright');
const {launchOptions,server}=require('./dashboard_test_support.cjs');
const {chapterHints}=require('./test_g10_frontier_hints.cjs');
const chapter=Number(process.argv[2]||process.env.TRIGGLE_HINT_CHAPTER);
const scope=chapterHints(chapter);
const route=id=>'?class=10&question='+id;

async function inspect(page,id,hint,lang){
  const actual=await page.evaluate(({id,hint,lang})=>{
    document.querySelector(lang==='ta'?'#langTa':'#langEn').click();
    const detail=document.querySelector('.why-step-g10[data-question="'+id+'"][data-step="'+(hint.step+1)+'"]');
    if(!detail)return null;
    detail.querySelector('summary').click();
    const panel=detail.querySelector('.why-step-panel');
    return {open:detail.open,lang:panel.lang,text:panel.querySelector('p').textContent,
      pageOverflow:document.documentElement.scrollWidth>innerWidth+1,
      mathErrors:document.querySelectorAll('#lessonCard .katex-error,#lessonCard [data-math-error=true]').length};
  },{id,hint,lang});
  assert.deepEqual(actual,{open:true,lang,text:hint[lang],pageOverflow:false,mathErrors:0},id+' '+lang);
}

(async()=>{
  const live=process.env.TRIGGLE_LIVE_BASE?.replace(/\/$/,'');
  const app=live?null:await server();
  const base=(live||app.base)+'/index.html';
  const browser=await chromium.launch(launchOptions());
  try {
    await Promise.all((live?[390]:[320,360,390,412]).map(async width=>{
      const context=await browser.newContext({viewport:{width,height:844},isMobile:true,hasTouch:true,
        serviceWorkers:'block',ignoreHTTPSErrors:!!live});
      try {
        const page=await context.newPage();
        const errors=[];
        page.on('pageerror',error=>errors.push(error.message));
        await page.goto(base+route(scope[0][0]),{waitUntil:'domcontentloaded'});
        for(const [id,hint] of scope) {
          await page.evaluate(url=>{history.pushState({},'',url);dispatchEvent(new PopStateEvent('popstate'));},base+route(id));
          await page.evaluate(()=>document.fonts.ready);
          for(const lang of ['en','ta'])await inspect(page,id,hint,lang);
        }
        assert.deepEqual(errors,[]);
      } finally {await context.close();}
      console.log('Grade 10 Chapter '+chapter+': '+scope.length+' bilingual explanations at '+width+'px.');
    }));
    if(!live) {
      const context=await browser.newContext({viewport:{width:390,height:844}});
      try {
        const page=await context.newPage();
        const [id,hint]=scope.at(-1);
        await page.addInitScript(id=>{
          const key='triggle.learned.v119';
          if(localStorage.getItem(key)===null)localStorage.setItem(key,JSON.stringify([id]));
        },id);
        await page.goto(base+route(id));
        await page.evaluate(()=>navigator.serviceWorker.ready);
        await page.waitForFunction(()=>navigator.serviceWorker.controller!==null);
        await context.setOffline(true);
        await page.reload({waitUntil:'domcontentloaded'});
        await inspect(page,id,hint,'ta');
        assert.equal(await page.locator('#markDone').getAttribute('aria-pressed'),'true');
        assert.deepEqual(await page.evaluate(()=>JSON.parse(localStorage.getItem('triggle.learned.v119'))),[id]);
      } finally {await context.close();}
      console.log('Grade 10 Chapter '+chapter+': offline bilingual explanation and retained progress.');
    }
  } finally {await browser.close();await app?.close();}
})().catch(error=>{console.error(error);process.exitCode=1;});
