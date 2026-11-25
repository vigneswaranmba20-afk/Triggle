'use strict';

const assert=require('node:assert/strict');
const {chromium}=require('playwright');
const {launchOptions,server}=require('./dashboard_test_support.cjs');
const manifest=require('../data/textbook-fidelity/g9-ch8-frontier-tables.json');
const route=id=>'?class=9&question='+encodeURIComponent(id);
const finalQuestion='g9-ch8-ex8.3-q6';

async function checkTable(page,lang) {
  const table=page.locator('#questionText table');
  assert.equal(await table.getAttribute('aria-label'),lang==='ta'?'பாடநூல் தரவுகள்':'Textbook data');
  assert.equal(await table.locator('thead th[scope=col]').count(),2);
  const rows=await table.locator('tbody tr').evaluateAll(elements=>elements.map(row=>Array.from(row.cells,cell=>{
    return cell.querySelector('[data-math-fallback]')?.dataset.mathFallback||cell.innerText.trim();
  })));
  const expected=await page.evaluate(()=>{
    const id=new URL(location.href).searchParams.get('question');
    return window.TRIGGLE_CLASSES[9].items.find(q=>q.id===id).dataTable.rows.map(row=>row.map(cell=>String(cell?.fallback??cell)));
  });
  assert.deepEqual(rows,expected);
  assert.equal(await table.locator('th[scope=row]').count(),rows.length);
  assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));
  assert.equal(await page.locator('#lessonCard .katex-error,#lessonCard [data-math-error=true]').count(),0);
}

async function checkSolution(page,lang) {
  const answer=page.locator('.final-answer-value');
  assert.match(await answer.innerText(),lang==='ta'?/சராசரி.*இடைநிலை அளவு.*முகடு/s:/Mode.*Tamil edition.*mean.*median/s);
  assert.deepEqual((await answer.locator('[data-math-fallback]').evaluateAll(parts=>parts.map(part=>part.dataset.mathFallback))).sort(),
    ['55.9','58.5','793/14 ≈ 56.64']);
  const worked=page.locator('#stepsList li.worked-step:not(.final-answer-step)');
  assert.equal(await worked.count(),8);
  const lastHint=worked.last().locator('.why-step-g9 summary');
  await lastHint.click();
  assert.match(await worked.last().locator('.why-step-panel').innerText(),lang==='ta'?/இடைநிலை அளவை மதிப்பிடுகிறோம்/:/median estimate/);
  assert.equal(await page.locator('#next').isDisabled(),true);
}

async function run() {
  const live=process.env.TRIGGLE_LIVE_BASE?.replace(/\/$/,'');
  const app=live?null:await server();
  const base=(live||app.base)+'/index.html';
  const browser=await chromium.launch(launchOptions());
  try {
    for(const width of live?[390]:[320,360,390,412]) {
      const context=await browser.newContext({viewport:{width,height:844},isMobile:true,hasTouch:true,
        ignoreHTTPSErrors:!!live,serviceWorkers:'block'});
      try {
        const page=await context.newPage();
        const errors=[];
        page.on('pageerror',error=>errors.push(error.message));
        for(const {id} of manifest.items) {
          await page.goto(base+route(id),{waitUntil:'domcontentloaded'});
          for(const lang of ['en','ta']) {
            await page.locator(lang==='ta'?'#langTa':'#langEn').click();
            await page.evaluate(()=>document.fonts.ready);
            await checkTable(page,lang);
            if(id===finalQuestion)await checkSolution(page,lang);
          }
        }
        await page.locator('#previous').click();
        assert.equal(new URL(page.url()).searchParams.get('question'),'g9-ch8-ex8.3-q5');
        assert.deepEqual(errors,[]);
      } finally {await context.close();}
      console.log('Grade 9 Statistics: nine exact tables and bilingual mean, median and mode at '+width+'px.');
    }
    if(!live) {
      const context=await browser.newContext({viewport:{width:390,height:844}});
      try {
        const page=await context.newPage();
        await page.addInitScript(id=>{
          const key='triggle.learned.v119';
          if(localStorage.getItem(key)===null)localStorage.setItem(key,JSON.stringify([id]));
        },finalQuestion);
        await page.goto(base+route(finalQuestion));
        await page.locator('#langTa').click();
        await page.evaluate(()=>navigator.serviceWorker.ready);
        await page.waitForFunction(()=>navigator.serviceWorker.controller!==null);
        await context.setOffline(true);
        await page.reload({waitUntil:'domcontentloaded'});
        assert.equal(await page.locator('#markDone').getAttribute('aria-pressed'),'true');
        assert.deepEqual(await page.evaluate(()=>JSON.parse(localStorage.getItem('triggle.learned.v119'))),[finalQuestion]);
        await checkTable(page,'ta');
        await checkSolution(page,'ta');
      } finally {await context.close();}
      console.log('Grade 9 Statistics: offline tables, KaTeX and preserved progress.');
    }
  } finally {await browser.close();await app?.close();}
}

run().catch(error=>{console.error(error);process.exitCode=1;});
