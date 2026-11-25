'use strict';

const assert=require('node:assert/strict');
const {chromium}=require('playwright');
const {launchOptions,server}=require('./dashboard_test_support.cjs');
const {items}=require('../data/textbook-fidelity/g10-frontier-coordinate.json');
const {loadHints}=require('./test_g10_frontier_numbers_hints.cjs');
const hints=Object.entries(loadHints().TriggleG10FrontierHints).filter(([id])=>id.startsWith('c10-5-'));
const route=id=>'?class=10&question='+id;

async function exercise(page,row,lang){
  await page.locator(lang==='ta'?'#langTa':'#langEn').click();
  await page.evaluate(()=>document.fonts.ready);
  const answer=await page.locator('.final-answer-value').innerText();
  const why=page.locator('.why-step-g10 summary').first();
  await why.click();
  assert.match(await page.locator('.why-step-g10[open] .why-step-panel').innerText(),lang==='ta'?/\p{Script=Tamil}/u:/[a-z]{4}/i);
  if(row.sourceTable) {
    assert.equal(await page.locator('#questionText th[scope=row]').count(),2);
    const fallback=await page.locator('.final-answer-value [data-math-fallback]').getAttribute('data-math-fallback');
    assert.equal(fallback,row.id.endsWith('-ii')?'p ∈ {13, −3}':'p ∈ {44, 4}');
    assert.match(answer,lang==='ta'?/இடஞ்சுழி/:/anticlockwise/);
  }else if(row.figureFiles) {
    assert.match(answer,/ABCD.*ABDC/s);
    await page.locator('#figureBtn').click();
    const image=page.locator('#diagramContent img');
    await image.evaluate(el=>el.decode());
    assert.match(await image.getAttribute('alt'),/ABDC.*ABCD.*25\/4/s);
    await page.locator('#closeDiagram').click();
  }else {
    assert.match(answer,/−\s*5/);
    const rejected=row.id.includes('ex5-1')?'11':'67';
    assert.match(await page.locator('#stepsList').innerText(),new RegExp(rejected));
  }
  assert.equal(await page.locator('#lessonCard .katex-error,#lessonCard [data-math-error=true]').count(),0);
  assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));
}

(async()=>{
  const live=process.env.TRIGGLE_LIVE_BASE?.replace(/\/$/,'');
  const app=live?null:await server();
  const base=(live||app.base)+'/index.html';
  const browser=await chromium.launch(launchOptions());
  try {
    await Promise.all((live?[390]:[320,360,390,412]).map(async width=>{
      const context=await browser.newContext({viewport:{width,height:844},isMobile:true,hasTouch:true,
        ignoreHTTPSErrors:!!live,serviceWorkers:'block'});
      try {
        const page=await context.newPage();
        const errors=[];
        page.on('pageerror',error=>errors.push(error.message));
        for(const row of items){
          await page.goto(base+route(row.id),{waitUntil:'domcontentloaded'});
          for(const lang of ['en','ta'])await exercise(page,row,lang);
        }
        for(const [id,hint] of hints) {
          await page.evaluate(url=>{history.pushState({},'',url);dispatchEvent(new PopStateEvent('popstate'));},base+route(id));
          for(const lang of ['en','ta']) {
            const visible=await page.evaluate(({id,hint,lang})=>{
              document.querySelector(lang==='ta'?'#langTa':'#langEn').click();
              const detail=document.querySelector('.why-step-g10[data-question="'+id+'"][data-step="'+(hint.step+1)+'"]');
              if(!detail)return null;
              detail.querySelector('summary').click();
              return detail.querySelector('.why-step-panel p').textContent;
            },{id,hint,lang});
            assert.equal(visible,hint[lang],id+' '+lang);
          }
        }
        await page.goto(base+route('c10-5-ex5-1-q3-i'),{waitUntil:'domcontentloaded'});
        await page.locator('#next').click();
        assert.equal(new URL(page.url()).searchParams.get('question'),'c10-5-ex5-1-q3-ii');
        assert.deepEqual(errors,[]);
      } finally {await context.close();}
      console.log('Grade 10 Coordinate Geometry: all five corrections and 97 explanations in both languages at '+width+'px.');
    }));
    if(!live) {
      const context=await browser.newContext({viewport:{width:390,height:844}});
      try {
        const page=await context.newPage();
        const row=items.find(item=>item.figureFiles);
        await page.addInitScript(id=>{
          const key='triggle.learned.v119';
          if(localStorage.getItem(key)===null)localStorage.setItem(key,JSON.stringify([id]));
        },row.id);
        await page.goto(base+route(row.id));
        await page.evaluate(()=>navigator.serviceWorker.ready);
        await page.waitForFunction(()=>navigator.serviceWorker.controller!==null);
        await context.setOffline(true);
        await page.reload({waitUntil:'domcontentloaded'});
        await exercise(page,row,'ta');
        assert.equal(await page.locator('#markDone').getAttribute('aria-pressed'),'true');
        assert.deepEqual(await page.evaluate(()=>JSON.parse(localStorage.getItem('triggle.learned.v119'))),[row.id]);
      } finally {await context.close();}
      console.log('Grade 10 Coordinate Geometry: offline Figure, KaTeX and saved question progress.');
    }
  } finally {await browser.close();await app?.close();}
})().catch(error=>{console.error(error);process.exitCode=1;});
