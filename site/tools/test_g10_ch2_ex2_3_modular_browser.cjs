'use strict';
const assert=require('node:assert/strict'),{chromium}=require('playwright');
const {server,launchOptions}=require('./dashboard_test_support.cjs');
(async()=>{
 const app=await server(),browser=await chromium.launch(launchOptions());
 try{
  for(const width of [320,390]){
   const context=await browser.newContext({viewport:{width,height:760},serviceWorkers:'block',reducedMotion:'reduce'});
   const page=await context.newPage(),errors=[];
   page.on('pageerror',e=>errors.push(e.message));
   for(const [id,queryPart,answerPart] of [
    ['q1-ii','78','5'],['q1-iv','96','7'],['q2','13','3'],
    ['q3','Solve','2'],['q4','Solve','8'],['q8','divisible','7'],['q9','remainder','2']
   ]){
    await page.goto(app.base+'/index.html?class=10&question=c10-2-ex2-3-'+id);
    await page.locator('#stepsList .worked-step').first().waitFor({state:'visible'});
    const q=await page.locator('#questionText').innerText();
    assert(q.includes(queryPart),'Correct authentic question '+id+' '+width);
    const answer=await page.locator('#answerText').innerText();
    assert(answer.includes(answerPart),'Correct answer '+id+' '+width);
    assert((await page.locator('#stepsList li.worked-step').count())>=3,'Full reasoning, not just a result: '+id);
    assert.equal(await page.locator('[data-math-error]').count(),0,'KaTeX renders checked expressions '+id);
    assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),'No horizontal mobile overflow '+id+' '+width);
   }
   // New modules may be appended late internally; visible navigation must
   // follow the textbook's Q1(i–v), Q2, Q3 ... Q9, Q10 order.
   await page.goto(app.base+'/index.html?class=10&question=c10-2-ex2-3-q1-v');
   await page.locator('#next').click();
   assert.equal(new URL(page.url()).searchParams.get('question'),'c10-2-ex2-3-q2','Q1(v) advances to Q2, not an unrelated later exercise');
   await page.locator('#previous').click();
   assert.equal(new URL(page.url()).searchParams.get('question'),'c10-2-ex2-3-q1-v','Previous returns to Q1(v)');
   await page.goto(app.base+'/index.html?class=10&question=c10-2-ex2-3-q9');
   await page.locator('#next').click();
   assert.equal(new URL(page.url()).searchParams.get('question'),'c10-2-ex2-3-q10','Q9 advances to textbook Q10');
   assert.deepEqual(errors,[],'No page errors on '+width+'px');
   await context.close();
  }
  console.log('PASS Grade 10 Ex 2.3 modular lessons at 320 and 390px: questions, full working, answers, KaTeX and overflow.');
 }finally{await browser.close();await app.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
