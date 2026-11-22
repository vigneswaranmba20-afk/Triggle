'use strict';
// Read-only accessibility timing probe; never mutates project source or deployment.
const assert=require('node:assert/strict');
const {chromium}=require('playwright');
const {server,launchOptions}=require('./dashboard_test_support.cjs');
(async()=>{
 const app=await server(),browser=await chromium.launch(launchOptions());
 try{
  for(const width of [320,393,430]){
   const ctx=await browser.newContext({viewport:{width,height:800},serviceWorkers:'block',reducedMotion:'reduce'});
   const page=await ctx.newPage();
   for(let round=0;round<3;round++){
    await page.goto(app.base+'/index.html?class=10&question=c10-3-ex3-7-q2-iii',{waitUntil:'domcontentloaded'});
    await page.locator('#stepsList .structured-equation .triggle-tex').first().waitFor({state:'visible'});
    await page.evaluate(()=>document.fonts.ready);
    await page.waitForTimeout(40);
    const measure=()=>page.evaluate(()=>{
     const wrappers=[...document.querySelectorAll('#lessonCard .triggle-tex')];
     return {formulas:wrappers.length,overflows:wrappers.filter(x=>x.scrollWidth>x.clientWidth+1).map((x,i)=>({
      index:wrappers.indexOf(x),width:x.clientWidth,scroll:x.scrollWidth,tab:x.tabIndex,label:x.getAttribute('aria-label')
     }))};
    });
    const immediate=await measure();
    await page.evaluate(()=>new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve))));
    const afterFrames=await measure();
    await page.waitForTimeout(300);
    const settled=await measure();
    const failing=settled.overflows.filter(x=>x.tab!==0);
    // Distinguish stale observers from a truly unreachable overflow container.
    let afterExplicit=null;
    if(failing.length){
     await page.evaluate(()=>window.TriggleNotation?.prepare?.(document.querySelector('#lessonCard')));
     afterExplicit=await measure();
    }
    console.log('FOCUS-PROBE '+JSON.stringify({width,round,immediate,afterFrames,settled,afterExplicit}));
    assert(immediate.formulas>=2,'Expected rendered mathematical formulas');
    assert.equal(failing.length,0,'Still keyboard-inaccessible after layout settlement');
   }
   await ctx.close();
  }
  console.log('PASS: all visible overflowing formulas keyboard-focusable after layout settlement');
 }finally{await browser.close();await app.close();}
})().catch(e=>{console.error('FOCUS-PROBE ERROR',e.message);process.exitCode=1;});
