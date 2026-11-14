'use strict';
const assert=require('node:assert/strict'),{chromium}=require('playwright');
const {server,launchOptions}=require('./dashboard_test_support.cjs');
(async()=>{
 const app=await server(),browser=await chromium.launch(launchOptions());
 try{
  const context=await browser.newContext({viewport:{width:390,height:844},serviceWorkers:'block',deviceScaleFactor:2});
  const page=await context.newPage(),errors=[],missing=[];
  page.on('pageerror',e=>errors.push(e.message));
  page.on('response',r=>{if(r.status()>=400)missing.push(r.url());});
  const question='c10-1-ex1-1-q4',route=id=>app.base+'/index.html?class=10&question='+id;
  for(const width of [320,360,390,412,768]){
   await page.setViewportSize({width,height:844});
   await page.goto(route(question),{waitUntil:'domcontentloaded'});
   const steps=page.locator('#stepsList li.worked-step:not(.final-answer-step)');
   assert.equal(await steps.count(),4,'Q4 retains all four textbook worked steps');
   const why=page.locator('#stepsList details.why-step-g10');
   assert.equal(await why.count(),2,'Q4 step 1 and 2 must have contextual explanations');
   assert.equal(await why.filter({has:page.locator('.why-step-visual')}).count(),2);
   assert.equal(await why.first().evaluate(el=>el.open),false,'Closed by default');
   const sourceBefore=await page.evaluate(()=>({
    q:document.querySelector('#questionText').innerHTML,
    steps:[...document.querySelectorAll('#stepsList li.worked-step:not(.final-answer-step)')].map(li=>li.querySelector('.step-equation')?.innerHTML),
    answer:document.querySelector('.final-answer-step')?.innerHTML
   }));
   await why.nth(0).locator('summary').click();
   assert.equal(await why.nth(0).evaluate(el=>el.open),true,'Native first step expanded');
   const table=page.locator('#stepsList .why-pair-grid');
   assert.equal(await table.count(),1,'Step 1 must show explicit Cartesian pairing diagram');
   assert.equal(await table.locator('tbody tr').count(),2);
   const cells=await table.locator('tbody td').allTextContents();
   assert.deepEqual(cells.map(x=>x.replace(/\s+/g,'')),['(5,5)','(5,6)','(6,5)','(6,6)']);
   await why.nth(1).locator('summary').click();
   assert.equal(await page.locator('#stepsList .why-step-visual svg circle').count(),2,'Step 2 set intersection picture');
   assert.ok((await why.nth(1).innerText()).includes('5, 6'),'Shared members visible');
   assert.equal(await page.locator('#lessonCard .math-fallback').count(),0,'KaTeX not broken');
   const after=await page.evaluate(()=>({
    q:document.querySelector('#questionText').innerHTML,
    steps:[...document.querySelectorAll('#stepsList li.worked-step:not(.final-answer-step)')].map(li=>li.querySelector('.step-equation')?.innerHTML),
    answer:document.querySelector('.final-answer-step')?.innerHTML,
    sw:document.documentElement.scrollWidth,vw:innerWidth
   }));
   assert.deepEqual(after.q,sourceBefore.q,'Textbook question unchanged');
   assert.deepEqual(after.steps,sourceBefore.steps,'Original 4 equations unchanged');
   assert.deepEqual(after.answer,sourceBefore.answer,'Final answer unchanged');
   assert.ok(after.sw<=after.vw+1,'No mobile horizontal page overflow at '+width);
   await why.first().locator('summary').click();
   assert.equal(await why.first().evaluate(el=>el.open),false,'Dismiss without leaving question');
   if(width===390)await page.screenshot({path:'screenshots/g10-why-q4-390.png',fullPage:true});
  }
  const samples=[
   'c10-1-ex1-1-q1-ii','c10-1-1-3-q1','c10-1-1-4-q3','c10-1-1-5-q1',
   'c10-1-1-6-q10','c10-1-1-unit-q2','c10-2-ex2-1-q7','c10-2-ex2-2-q6',
   'c10-3-ex3-1-q1-i','c10-4-ex4-1-q2','c10-5-5-practice-20',
   'c10-6-6-2-4','c10-6-6-3-7','c10-6-6-4-12',
   'c10-8-ex8-1-q11','c10-8-ex8-1-q13','c10-8-ex8-1-q15'
  ];
  for(const width of [320,390,412]){
   await page.setViewportSize({width,height:844});
   for(const id of samples){
    await page.goto(route(id),{waitUntil:'domcontentloaded'});
    const control=page.locator('#stepsList details.why-step-g10');
    assert.ok(await control.count()>0,'Every sampled Grade 10 question has a Why: '+id);
    await control.first().locator('summary').click();
    assert.equal(await control.first().evaluate(el=>el.open),true,'Must expand '+id);
    assert.ok((await control.first().locator('.why-step-panel p').innerText()).length>=35);
    assert.equal(await page.locator('#lessonCard .math-fallback').count(),0,'No invalid math '+id);
    const sizes=await page.evaluate(()=>({width:document.documentElement.scrollWidth,viewport:innerWidth}));
    assert.ok(sizes.width<=sizes.viewport+1,'No screen overflow '+id+' @'+width+'px');
   }
  }
  await page.goto(route(question));
  await page.locator('#langTa').click();
  assert.equal(await page.locator('#stepsList .why-step-g10').count(),2);
  await page.locator('#stepsList .why-step-g10 summary').first().click();
  assert.ok((await page.locator('#stepsList .why-step-panel p').first().innerText()).includes('கணம்'));
  await page.locator('#stepsList .why-step-g10 summary').first().focus();
  await page.keyboard.press('ArrowRight');
  assert.ok(page.url().includes('question='+question),'ArrowRight on disclosure cannot change question');
  await page.goto(app.base+'/index.html?class=9&question=c9-2-2-1');
  assert.equal(await page.locator('#stepsList .why-step-g10').count(),0,'Other grades unaffected');
  assert.deepEqual(errors,[],'Uncaught browser errors');
  assert.deepEqual(missing,[],'Missing static assets');
  console.log('PASS Grade 10 full Why browser: Q4 2 conceptual diagrams, 4 untouched steps at 320–768px; 17 other questions × 3 phones, Tamil, keyboard and unaffected Grade 9.');
  await context.close();
 }finally{await browser.close();await app.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
