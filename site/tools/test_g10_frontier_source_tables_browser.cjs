'use strict';

const assert=require('node:assert/strict');
const {chromium}=require('playwright');
const {launchOptions,server}=require('./dashboard_test_support.cjs');
const manifest=require('../data/textbook-fidelity/g10-frontier-source-tables.json');
const route=id=>'?class=10&question='+id;
const localizedFigures={
  'c10-1-1-3-q10':'ex1-3-q10',
  'c10-1-1-4-q2':'ex1-4-q2',
  'c10-1-1-4-q3':'ex1-4-q3'
};

async function checkTable(page,id,lang) {
  const table=page.locator('#questionText table');
  assert.equal(await table.getAttribute('aria-label'),lang==='ta'?'பாடநூல் தரவுகள்':'Textbook data');
  assert.equal(await table.locator('th[scope=col]').count(),2);
  assert.equal(await table.locator('th[scope=row]').count(),4);
  const cells=await table.locator('tbody td').evaluateAll(elements=>elements.map(cell=>
    cell.querySelector('[data-math-fallback]')?.dataset.mathFallback||cell.innerText.trim()));
  if(id==='c10-1-1-3-q10') {
    assert.deepEqual(cells,['56','65','69.5','74']);
    assert.match(await page.locator('#questionText').innerText(),/\(iii\).*40.*\(iv\).*53\.3/s);
    const answer=(await page.locator('.final-answer-value').innerText()).replace(/\s/g,'');
    assert(answer.includes('60.5')&&answer.includes('32'));
  } else {
    const find=lang==='ta'?'காண்க':'Find this value';
    assert.deepEqual(cells,id.endsWith('-ii')?['(x⁴ − y⁴)(x⁴ + x²y² + y⁴)','x² − y²',find,'(x⁴ − y⁴)(x² + y² − xy)']:
      ['a³ − 10a² + 11a + 70','a − 7','a² − 12a + 35',find]);
    assert(await page.locator('.final-answer-value .katex').count()>0);
  }
  assert.equal(await page.locator('#lessonCard .katex-error,#lessonCard [data-math-error=true]').count(),0);
  assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));
}

async function checkFigure(page,id,lang) {
  if(id==='c10-1-1-3-q10')assert(await page.locator('#inlineFigure').isHidden());
  await page.locator('#figureBtn').click();
  const img=page.locator('#diagramContent img');
  await img.evaluate(image=>image.decode());
  assert.equal(await img.getAttribute('src'),'./assets/grade10-ch1/'+localizedFigures[id]+(lang==='ta'?'-ta':'')+'.svg');
  assert.match(await img.getAttribute('alt'),lang==='ta'?/\p{Script=Tamil}/u:/[a-z]{4}/i);
  await page.locator('#closeDiagram').click();
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
        for(const {id} of manifest.items) {
          await page.goto(base+route(id),{waitUntil:'domcontentloaded'});
          for(const lang of ['en','ta']) {
            await page.locator(lang==='ta'?'#langTa':'#langEn').click();
            await page.evaluate(()=>document.fonts.ready);
            await checkTable(page,id,lang);
          }
        }
        assert(await page.locator('#next').isDisabled());
        await page.locator('#previous').click();
        assert.equal(new URL(page.url()).searchParams.get('question'),'c10-3-ex3-3-q4-i');
        for(const id of Object.keys(localizedFigures)) {
          await page.goto(base+route(id),{waitUntil:'domcontentloaded'});
          for(const lang of ['en','ta']) {
            await page.locator(lang==='ta'?'#langTa':'#langEn').click();
            await checkFigure(page,id,lang);
          }
        }
        assert.deepEqual(errors,[]);
      } finally {await context.close();}
      console.log('Grade 10 source tables: all three bilingual cards at '+width+'px.');
    }
    if(!live) {
      const context=await browser.newContext({viewport:{width:390,height:844}});
      try {
        const page=await context.newPage();
        const id='c10-3-ex3-3-q4-ii';
        await page.addInitScript(question=>{
          const key='triggle.learned.v119';
          if(localStorage.getItem(key)===null)localStorage.setItem(key,JSON.stringify([question]));
        },id);
        await page.goto(base+route(id));
        await page.locator('#langTa').click();
        await page.evaluate(()=>navigator.serviceWorker.ready);
        await page.waitForFunction(()=>navigator.serviceWorker.controller!==null);
        await context.setOffline(true);
        await page.reload({waitUntil:'domcontentloaded'});
        await checkTable(page,id,'ta');
        assert.equal(await page.locator('#markDone').getAttribute('aria-pressed'),'true');
        assert.deepEqual(await page.evaluate(()=>JSON.parse(localStorage.getItem('triggle.learned.v119'))),[id]);
        const plot='c10-1-1-3-q10';
        await page.goto(base+route(plot),{waitUntil:'domcontentloaded'});
        await checkFigure(page,plot,'ta');
      } finally {await context.close();}
      console.log('Grade 10 source tables: offline KaTeX and progress preserved.');
    }
  } finally {await browser.close();await app?.close();}
})().catch(error=>{console.error(error);process.exitCode=1;});
