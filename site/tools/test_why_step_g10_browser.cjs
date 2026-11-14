'use strict';
const assert=require('node:assert/strict'),{chromium}=require('playwright');
const {server,launchOptions}=require('./dashboard_test_support.cjs');
(async()=>{
 const app=await server(),browser=await chromium.launch(launchOptions());
 try{
  const context=await browser.newContext({viewport:{width:360,height:760},serviceWorkers:'block'});
  const page=await context.newPage(),errors=[],missing=[];
  page.on('pageerror',e=>errors.push(e.message));
  page.on('response',r=>{if(r.status()>=400)missing.push(r.url());});
  const ids=['c10-1-ex1-1-q1-iii','c10-2-ex2-1-q1','c10-3-ex3-1-q1-ii',
   'c10-4-ex4-1-q1-i','c10-5-5-practice-20','c10-6-6-1-3','c10-8-ex8-1-q11'];
  for(const width of [320,360,390,412]){
   await page.setViewportSize({width,height:760});
   for(const id of ids){
    await page.goto(app.base+'/index.html?class=10&question='+id,{waitUntil:'domcontentloaded'});
    const control=page.locator('#stepsList details.why-step-g10');
    await control.waitFor();
    assert.equal(await control.count(),1,'One optional control, not a button on every step: '+id);
    assert.equal(await control.evaluate(el=>el.open),false,'Explanations stay closed until requested');
    const before=await page.evaluate(()=>({
     question:document.querySelector('#questionText').textContent,
     steps:[...document.querySelectorAll('#stepsList li.worked-step:not(.final-answer-step)')].map(x=>x.querySelector('.step-equation')?.textContent),
     final:document.querySelector('.final-answer-step')?.textContent,
     width:document.documentElement.scrollWidth,viewport:innerWidth
    }));
    assert.ok(before.width<=before.viewport+1,'No page overflow before hint at '+width+': '+id);
    await control.locator('summary').click();
    assert.equal(await control.evaluate(el=>el.open),true,'Opens in place: '+id);
    const hintText=await control.locator('.why-step-panel p').innerText();
    assert.ok(hintText.length>30,'Meaningful extra explanation: '+id);
    const after=await page.evaluate(()=>({
      question:document.querySelector('#questionText').textContent,
      steps:[...document.querySelectorAll('#stepsList li.worked-step:not(.final-answer-step)')].map(x=>x.querySelector('.step-equation')?.textContent),
      final:document.querySelector('.final-answer-step')?.textContent,
      width:document.documentElement.scrollWidth,viewport:innerWidth
    }));
    assert.deepEqual(after.question,before.question,'Question must remain unchanged: '+id);
    assert.deepEqual(after.steps,before.steps,'Verified solution must remain unchanged: '+id);
    assert.deepEqual(after.final,before.final,'Final answer must remain unchanged: '+id);
    assert.ok(after.width<=after.viewport+1,'No page overflow after hint at '+width+': '+id);
    await control.locator('summary').click();
    assert.equal(await control.evaluate(el=>el.open),false,'Closes without mode change');
   }
  }
  await page.goto(app.base+'/index.html?class=10&question=c10-6-6-1-3');
  await page.locator('#stepsList .why-step-g10 summary').focus();
  await page.keyboard.press('ArrowRight');
  assert.ok(page.url().includes('question=c10-6-6-1-3'),'Keyboard arrows on focused summary must not navigate');
  await page.locator('#langTa').click();
  assert.equal(await page.locator('#stepsList details.why-step-g10').count(),1,'Tamil translation remains available');
  assert.ok((await page.locator('#stepsList .why-step-g10 summary').innerText()).includes('ஏன்'));
  await page.locator('#stepsList .why-step-g10 summary').click();
  assert.ok((await page.locator('#stepsList .why-step-panel p').innerText()).includes('பூஜ்ஜியமற்ற'));
  await page.goto(app.base+'/index.html?class=10&question=c10-8-ex8-1-q13');
  assert.equal(await page.locator('#stepsList .why-step-g10').count(),1,'New sourced explanation covers previously unreviewed Statistics Q13');
  assert.equal(await page.locator('#stepsList .why-step-g10').getAttribute('data-step'),'1','Q13 midpoint explanation must attach to its first worked step');
  await page.goto(app.base+'/index.html?class=9&question=c9-2-2-1');
  assert.equal(await page.locator('#stepsList .why-step-g10').count(),0,'No Grade 9 changes');
  assert.deepEqual(errors,[],'Browser errors');
  assert.deepEqual(missing,[],'Missing assets');
  console.log('PASS Grade 10 Why UI: 7 chapter exemplars at 320/360/390/412px, native open/close, immutable original maths, Tamil, keyboard arrows, unrelated lessons unaffected.');
  await context.close();
 }finally{await browser.close();await app.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
