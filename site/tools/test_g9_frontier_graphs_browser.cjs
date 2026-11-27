'use strict';

const assert=require('node:assert/strict');
const {chromium}=require('playwright');
const {launchOptions,server}=require('./dashboard_test_support.cjs');
const manifest=require('../data/textbook-fidelity/g9-frontier-graphs.json');
const route=id=>'?class=9&question='+id;

async function checkGraph(page,record,lang) {
  assert(await page.locator('#inlineFigure').isHidden());
  assert.equal(await page.locator('#lessonCard .katex-error,#lessonCard [data-math-error=true]').count(),0);
  const why=page.locator('#stepsList .why-step-g9 summary').last();
  await why.click();
  assert.match(await page.locator('.why-step-g9[open] .why-step-panel').innerText(),lang==='ta'?/\p{Script=Tamil}/u:/[a-z]{4}/i);
  await page.locator('#inlineFigureOpen:visible, #figureBtn:visible').click();
  const dialog=page.locator('#figureDialog');
  const graphic=dialog.locator('#diagramContent img');
  await graphic.evaluate(image=>image.decode());
  assert(await dialog.isVisible());
  assert.equal(await graphic.getAttribute('src'),record.figureFiles[0]);
  assert.equal(await graphic.getAttribute('alt'),record.description[lang]);
  assert(await graphic.evaluate(img=>img.clientWidth<=innerWidth&&img.clientHeight>100));
  await page.locator('#closeDiagram').click();
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
        for(const record of manifest.items) {
          await page.goto(base+route(record.id),{waitUntil:'domcontentloaded'});
          for(const lang of ['en','ta']) {
            await page.locator(lang==='ta'?'#langTa':'#langEn').click();
            await page.evaluate(()=>document.fonts.ready);
            await checkGraph(page,record,lang);
          }
        }
        await page.goto(base+route('g9-ch3-ex3.10-q3'),{waitUntil:'domcontentloaded'});
        assert(await page.locator('#next').isDisabled());
        await page.locator('#previous').click();
        assert.equal(new URL(page.url()).searchParams.get('question'),'g9-ch3-ex3.10-q2-vi');
        await page.locator('.g9a-concept-return').click();
        const lesson=new URL(page.url()).searchParams;
        assert.equal(lesson.get('chapter'),'g9-ch3');
        assert.equal(lesson.get('section'),'concepts');
        assert.equal(lesson.get('concept'),'9');
        assert.deepEqual(errors,[]);
      } finally {await context.close();}
      console.log('Grade 9 graphical solutions: all 12 figures and why-step hints in both languages at '+width+'px.');
    }
    if(!live) {
      const context=await browser.newContext({viewport:{width:390,height:844}});
      try {
        const page=await context.newPage();
        const record=manifest.items[5];
        await page.addInitScript(id=>{
          const key='triggle.learned.v119';
          if(localStorage.getItem(key)===null)localStorage.setItem(key,JSON.stringify([id]));
        },record.id);
        await page.goto(base+route(record.id));
        await page.locator('#langTa').click();
        await page.evaluate(()=>navigator.serviceWorker.ready);
        await page.waitForFunction(()=>navigator.serviceWorker.controller!==null);
        await context.setOffline(true);
        await page.reload({waitUntil:'domcontentloaded'});
        await checkGraph(page,record,'ta');
        assert.equal(await page.locator('#markDone').getAttribute('aria-pressed'),'true');
        assert.deepEqual(await page.evaluate(()=>JSON.parse(localStorage.getItem('triggle.learned.v119'))),[record.id]);
      } finally {await context.close();}
      console.log('Grade 9 graphical solutions: offline KaTeX, Figure view and existing progress.');
    }
  } finally {await browser.close();await app?.close();}
})().catch(error=>{console.error(error);process.exitCode=1;});
