'use strict';
/* A real browser interaction regression for the Grade 10 GP sum discovery.
   English/Tamil, small Android viewports, complete five-step journey. */
const assert=require('node:assert/strict');
const {chromium}=require('playwright');
const {server,launchOptions}=require('./dashboard_test_support.cjs');
(async()=>{
 const app=await server(),browser=await chromium.launch(launchOptions());
 try{
  for(const width of [320,390,412]){
   const context=await browser.newContext({viewport:{width,height:780},deviceScaleFactor:1,
    isMobile:true,hasTouch:true,serviceWorkers:'block',reducedMotion:'reduce'});
   const page=await context.newPage(),errors=[];
   page.on('pageerror',error=>errors.push(error.message));
   for(const language of ['en','ta']){
    await page.goto(app.base+'/index.html?class=10&chapter=g10-ch2&section=concepts');
    if(language==='ta')await page.locator('#langTa').click();
    await page.locator('.sp2-nav-button').nth(12).click();
    const lab=page.locator('.g10ch2-gp-lab');
    await lab.waitFor({state:'visible'});
    assert.equal(await lab.getAttribute('data-step'),'0','Start with original sum');
    assert.equal(await page.locator('.sp2-formula').count(),0,'Do not reveal shortcut formula before discovery');
    assert.equal(await lab.locator('[data-row=original] .gp-lab-term:not(.is-gap)').count(),4);
    assert.equal(await lab.locator('[data-row=doubled]').isVisible(),false);
    const next=lab.locator('.gp-lab-actions button').last();
    const previous=lab.locator('.gp-lab-actions button').first();
    assert(await previous.isDisabled());
    await next.click();
    assert.equal(await lab.getAttribute('data-step'),'1');
    assert(await lab.locator('[data-row=doubled]').isVisible());
    assert.equal(await lab.locator('[data-row=doubled] .gp-lab-term:not(.is-gap)').count(),4);
    await next.click();
    assert.equal(await lab.getAttribute('data-step'),'2');
    assert.equal(await lab.locator('.is-cancelled').count(),6,'2,4,8 cancel from both rows');
    assert.equal(await lab.locator('.is-remaining').innerText(),'16');
    assert.equal(await lab.locator('.is-subtracted').innerText(),'1');
    await previous.click();
    assert.equal(await lab.getAttribute('data-step'),'1','Backwards step navigation works');
    await next.click();await next.click();
    assert.equal(await lab.getAttribute('data-step'),'3');
    assert.match(await lab.locator('.gp-lab-math').innerText(),/15/);
    await next.click();
    assert.equal(await lab.getAttribute('data-step'),'4');
    assert(await lab.locator('.gp-lab-general').isVisible(),'Show the general derivation after cancellation');
    assert((await lab.locator('.gp-lab-final').innerText()).includes('S'),'The general formula renders');
    assert.equal(await page.locator('[data-math-error]').count(),0,'Valid mathematical notation');
    const answers=page.locator('.sp2-answers button');
    assert.equal(await answers.count(),3);
    await answers.nth(0).click();
    assert.match(await page.locator('[data-feedback]').innerText(),language==='en'?/Try again/:/மீண்டும்/);
    await answers.nth(1).click();
    assert.match(await page.locator('[data-feedback]').innerText(),language==='en'?/Correct!/:/சரி!/);
    await next.click();
    assert.equal(await lab.getAttribute('data-step'),'0','Replay resets the lab');
    assert.equal(await page.locator('[data-back-index]').isVisible(),true,'Existing back navigation preserved');
    assert.equal(await page.locator('[data-footer-next]').isVisible(),true,'Existing next navigation preserved');
    assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),
     'No document horizontal overflow at '+width+'px '+language);
   }
   assert.deepEqual(errors,[],'No JavaScript exceptions at '+width);
   await context.close();
  }
  console.log('PASS GP sum discovery EN/TA, cancellation, transfer and Android 320/390/412px');
 }finally{await browser.close();await app.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
