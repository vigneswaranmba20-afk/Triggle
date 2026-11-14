'use strict';
const assert=require('node:assert/strict'),{chromium}=require('playwright');
const {server,launchOptions}=require('./dashboard_test_support.cjs');
(async()=>{
 const app=await server(),browser=await chromium.launch(launchOptions());
 try{
  const context=await browser.newContext({viewport:{width:390,height:844},serviceWorkers:'block'});
  const page=await context.newPage(),errors=[],missing=[];
  page.on('pageerror',e=>errors.push(e.message));
  page.on('response',r=>{if(r.status()>=400)missing.push(r.url());});
  const cases=[
   ['g9-ch1-ex1.1-q3-b-i','1'],
   ['g9-ch2-ex9-q6','2'],
   ['g9-ch3-ex3.1-q10','3'],
   ['g9-ch4-ex4.2-q1','4'],
   ['g9-ch5-ex5.2-q5','5'],
   ['c9-exercise-6-1-q1','6'],
   ['g9-ch7-ex7.2-q4','7'],
   ['g9-ch8-ex8.4-q1','8'],
   ['g9-ch9-ex9.1-q4','9']
  ];
  const route=id=>app.base+'/index.html?class=9&question='+id;
  for(const width of [320,360,390,412]){
   await page.setViewportSize({width,height:844});
   for(const [id] of cases){
    await page.goto(route(id),{waitUntil:'domcontentloaded'});
    const control=page.locator('#stepsList details.why-step-g9');
    await control.waitFor({timeout:12000});
    assert.equal(await control.count(),1,'Quiet one disclosure per authored exercise '+id);
    assert.equal(await control.evaluate(el=>el.open),false,'Collapsed by default '+id);
    const before=await page.evaluate(()=>({
      q:document.querySelector('#questionText')?.innerHTML,
      steps:[...document.querySelectorAll('#stepsList li.worked-step:not(.final-answer-step)')].map(li=>li.querySelector('.step-equation')?.innerHTML),
      final:document.querySelector('.final-answer-step')?.innerHTML,
      scroll:document.documentElement.scrollWidth,viewport:innerWidth
    }));
    await control.locator('summary').click();
    assert.equal(await control.evaluate(el=>el.open),true,'Open on tap '+id);
    assert.ok((await control.locator('.why-step-panel p').innerText()).length>34,'Explanation is meaningful '+id);
    const after=await page.evaluate(()=>({
      q:document.querySelector('#questionText')?.innerHTML,
      steps:[...document.querySelectorAll('#stepsList li.worked-step:not(.final-answer-step)')].map(li=>li.querySelector('.step-equation')?.innerHTML),
      final:document.querySelector('.final-answer-step')?.innerHTML,
      scroll:document.documentElement.scrollWidth,viewport:innerWidth
    }));
    assert.deepEqual(after.q,before.q,'Question unchanged '+id);
    assert.deepEqual(after.steps,before.steps,'Every original mathematical step unchanged '+id);
    assert.deepEqual(after.final,before.final,'Final answer unchanged '+id);
    assert.ok(after.scroll<=Math.max(before.scroll,after.viewport)+1,'No overflow introduced '+id+' @'+width);
    await control.locator('summary').click();
    assert.equal(await control.evaluate(el=>el.open),false,'Close in place '+id);
   }
  }
  // A relevant set-intersection question gets a conceptual Venn when authored.
  await page.setViewportSize({width:390,height:844});
  await page.goto(route('g9-ch1-ex1.1-q3-b-i'));
  const first=page.locator('#stepsList details.why-step-g9');
  await first.locator('summary').focus();await page.keyboard.press('ArrowRight');
  assert.ok(page.url().includes('question=g9-ch1-ex1.1-q3-b-i'),'Arrow key on summary must not navigate away');
  await page.locator('#langTa').click();
  assert.equal(await page.locator('#stepsList details.why-step-g9').count(),1,'Tamil disclosure accessible');
  await page.locator('#stepsList details.why-step-g9 summary').click();
  const expected=await page.evaluate(()=>window.TriggleWhyStepG9.hints['g9-ch1-ex1.1-q3-b-i'].ta);
  assert.equal((await page.locator('#stepsList .why-step-g9 .why-step-panel p').innerText()).trim(),expected);
  // Generic diagrams are optional: when present, they must be inline SVG and
  // remain hidden until the specific explanation is opened.
  await page.goto(route('c9-exercise-6-1-q1'));
  const triangle=page.locator('#stepsList details.why-step-g9');
  if(await triangle.locator('figure').count()){
   assert.equal(await triangle.evaluate(el=>el.open),false);
   await triangle.locator('summary').click();
   assert.ok(await triangle.locator('figure svg').count()>0,'Trigonometry figure is original inline vector');
  }
  await page.goto(app.base+'/index.html?class=10&question=c10-1-ex1-1-q4');
  assert.equal(await page.locator('#stepsList .why-step-g9').count(),0,'Grade 10 unaffected');
  assert.equal(await page.locator('#stepsList .why-step-g10').count(),2,'Grade 10 existing explanations retained');
  assert.deepEqual(errors,[],'No browser runtime exceptions');
  assert.deepEqual(missing,[],'No missing resources');
  console.log('PASS Grade 9 Why: nine chapters at 320/360/390/412px, bilingual switch, keyboard, preserved questions/equations/answers, and Grade 10 regression.');
  await context.close();
 }finally{await browser.close();await app.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
