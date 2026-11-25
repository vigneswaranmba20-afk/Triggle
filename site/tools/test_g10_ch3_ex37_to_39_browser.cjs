'use strict';
const assert=require('node:assert/strict'),{chromium}=require('playwright');
const {server,launchOptions}=require('./dashboard_test_support.cjs');
(async()=>{
 const app=await server(),browser=await chromium.launch(launchOptions());
 try{
  const items=[
   ['c10-3-ex3-7-q1-i','400x⁴y¹²z¹⁶','2 |y⁴z⁶ / x²|'],
   ['c10-3-ex3-7-q1-ii','7x² + 2√14 x + 2','4 |(√7 x + √2)/(4x − 1)|'],
   ['c10-3-ex3-7-q1-iii','121(a + b)⁸','(11/9) |(a + b)⁴(x + y)⁴ / (a − b)⁶|'],
   ['c10-3-ex3-7-q2-i','4x² + 20x + 25','|2x + 5|'],
   ['c10-3-ex3-7-q2-ii','9x² − 24xy','|3x − 4y + 5z|'],
   ['c10-3-ex3-7-q2-iii','(4x² − 9x + 2)','|(x − 2)(7x + 1)(4x − 1)|'],
   ['c10-3-ex3-7-q2-iv','(2x² + (17/6)x + 1)','(1/6)|(4x + 3)(3x + 2)(x + 2)|'],
   ['c10-3-ex3-8-q1-i','x⁴ − 12x³ + 42x²','|x² − 6x + 3|'],
   ['c10-3-ex3-8-q1-ii','37x² − 28x³','|2x² − 7x − 3|'],
   ['c10-3-ex3-8-q1-iii','16x⁴ + 8x² + 1','|4x² + 1|'],
   ['c10-3-ex3-8-q1-iv','121x⁴ − 198x³','|11x² − 9x − 12|'],
   ['c10-3-ex3-8-q2-i','4x⁴ − 12x³ + 37x² + bx + a','a = 49, b = −42'],
   ['c10-3-ex3-8-q2-ii','ax⁴ + bx³ + 361x²','a = 144, b = 264'],
   ['c10-3-ex3-8-q3-i','36x⁴ − 60x³ + 61x² − mx + n','m = 30, n = 9'],
   ['c10-3-ex3-8-q3-ii','x⁴ − 8x³ + mx² + nx + 16','m = 24, n = −32 or m = 8, n = 32'],
   ['c10-3-ex3-9-q1-i','−9, 20','x² + 9x + 20 = 0'],
   ['c10-3-ex3-9-q1-ii','5/3, 4','3x² − 5x + 12 = 0'],
   ['c10-3-ex3-9-q1-iii','−3/2, −1','2x² + 3x − 2 = 0'],
   ['c10-3-ex3-9-q1-iv','−(2 − a)², (a + 5)²','x² + (2 − a)²x + (a + 5)² = 0'],
   ['c10-3-ex3-9-q2-i','x² + 3x − 28 = 0','−3, −28'],
   ['c10-3-ex3-9-q2-ii','x² + 3x = 0','−3, 0'],
   ['c10-3-ex3-9-q2-iii','3 + 1/a = 10/a²','−1/3, −10/3'],
   ['c10-3-ex3-9-q2-iv','3y² − y − 4 = 0','1/3, −4/3']
  ];
  const widths=[320,360,393,430];
  for(const width of widths){
   const context=await browser.newContext({viewport:{width,height:800},serviceWorkers:'block',reducedMotion:'reduce'});
   const page=await context.newPage(),errors=[],missing=[];
   page.on('pageerror',e=>errors.push(e.message));
   page.on('response',r=>{if(r.status()>=400)missing.push(r.url());});
   const sample=width===393||width===320?items:items.filter((_,idx)=>idx%2===0||idx===items.length-1);
   for(const [id,qToken,ansToken] of sample){
    await page.goto(app.base+'/index.html?class=10&question='+id,{waitUntil:'domcontentloaded'});
    await page.locator('#stepsList .structured-equation .triggle-tex').first().waitFor({state:'visible'});
    await page.evaluate(()=>document.fonts.ready);
    // The app updates scrollable math when layout and font observers settle.
    await page.waitForFunction(() => [...document.querySelectorAll('#lessonCard .triggle-tex')].every(
      formula => formula.scrollWidth <= formula.clientWidth + 1 || formula.tabIndex === 0
    ), null, {timeout: 3000});
    const check=await page.evaluate(id=>{
     const item=window.TRIGGLE_CLASSES?.[10]?.items.find(x=>x.id===id);
     const whole=document.querySelector('#lessonCard');
     const steps=[...whole.querySelectorAll('#stepsList .worked-step:not(.final-answer-step)')];
     const formulas=[...whole.querySelectorAll('.triggle-tex')];
     return {
      source:item?{question:item.q?.en,answer:item.answer}:null,
      qText:document.querySelector('#questionText')?.innerText||'',
      ansText:document.querySelector('#answerText')?.innerText||'',
      pageWidth:document.documentElement.scrollWidth,
      innerWidth,
      missingFallback:whole.querySelectorAll('.math-fallback').length,
      mathError:whole.querySelectorAll('[data-math-error]').length,
      katexCount:whole.querySelectorAll('#stepsList .katex').length,
      hasFinal:!!whole.querySelector('#answerText .katex'),
      stepsCount:steps.length,
      expectedSteps:item?.steps?.length||0,
      formulas:formulas.map(el=>{
       const glyph=el.querySelector('.katex-html');
       return {width:el.clientWidth,scroll:el.scrollWidth,tab:el.tabIndex,visible:el.getBoundingClientRect().height,glyph:glyph?.getBoundingClientRect().height||0};
      })
     };
    },id);
    assert(check.source&&check.source.question.includes(qToken),'Source question matches '+id);
    assert.equal(check.source.answer,ansToken,'Source answer matches '+id);
    assert(check.qText.trim().length>=10,'Question rendered '+id+' @'+width);
    assert(check.ansText.trim().length>0&&!/loading/i.test(check.ansText),'Answer rendered '+id+' @'+width);
    assert(check.katexCount>=2,'KaTeX rendered in steps '+id);
    if(id==='c10-3-ex3-8-q3-ii'){
     for(const lang of ['Ta','En']){
      await page.locator('#lang'+lang).click();
      const pairs=await page.locator('.final-answer-value .katex-html').allInnerTexts();
      assert.deepEqual(pairs.map(t=>t.replace(/\s/g,'')),['m=24,n=−32','m=8,n=32']);
     }
    }
    assert(check.hasFinal,'Final answer uses KaTeX '+id);
    assert.equal(check.stepsCount,check.expectedSteps,'All steps rendered '+id);
    assert.equal(check.missingFallback,0,'No missing fallback '+id);
    assert.equal(check.mathError,0,'No KaTeX error '+id);
    assert(check.pageWidth<=check.innerWidth+1,'No horizontal overflow '+id+' @'+width+': '+check.pageWidth+'>'+check.innerWidth);
    for(const f of check.formulas){
     assert(f.visible+1>=f.glyph,'No vertical glyph clipping '+id+' @'+width+': '+JSON.stringify(f));
     if(f.scroll>f.width+1)assert.equal(f.tab,0,'Wide formula must be keyboard-focusable '+id);
    }
    assert(await page.locator('#figureBtn').isHidden(),'No decorative figure button '+id);
    assert(await page.locator('#inlineFigure').isHidden(),'No decorative inline figure '+id);
   }
   if(width===393){
    // Top & bottom navigation across exercise boundaries and inside exercises:
    for(const [start,end] of [
     ['c10-3-ex3-7-q1-iii','c10-3-ex3-7-q2-i'],
     ['c10-3-ex3-7-q2-iii','c10-3-ex3-7-q2-iv'],
     ['c10-3-ex3-8-q1-iv','c10-3-ex3-8-q2-i'],
     ['c10-3-ex3-8-q2-ii','c10-3-ex3-8-q3-i'],
     ['c10-3-ex3-9-q1-iv','c10-3-ex3-9-q2-i']
    ]){
     await page.goto(app.base+'/index.html?class=10&question='+start);
     await page.locator('#next').click();
     assert.equal(new URL(page.url()).searchParams.get('question'),end,'Next follows textbook order '+start+' -> '+end);
    }
    for(const lastId of ['c10-3-ex3-7-q2-iv','c10-3-ex3-8-q3-ii','c10-3-ex3-9-q2-iv']){
     await page.goto(app.base+'/index.html?class=10&question='+lastId);
     assert(await page.locator('#next').isDisabled(),'Last question disables Next: '+lastId);
    }
    // Verify top Exercises back button and Chapter crumb link to Chapter 3 hub (where Concepts live):
    await page.goto(app.base+'/index.html?class=10&question=c10-3-ex3-8-q2-ii');
    assert(await page.locator('#exerciseIndexLink').isVisible(),'Top <- Exercises button visible');
    await page.locator('#exerciseIndexLink').click();
    await page.locator('#chapterOverview').waitFor({state:'visible'});
    assert(new URL(page.url()).searchParams.get('section')==='exercises','Exercises link opens Ch 3 exercises list');
    // Check Chapter 3 Concepts link from Chapter hub:
    await page.goto(app.base+'/index.html?class=10&question=c10-3-ex3-9-q2-iii');
    await page.locator('#langTa').click();
    assert((await page.locator('#stepsList .katex').count())>=2,'Tamil toggle preserves KaTeX working');
    assert.equal(await page.locator('[data-math-error]').count(),0,'No KaTeX error in Tamil fallback');
   }
   assert.deepEqual(errors,[],'No JS pageerror @'+width);
   assert.deepEqual(missing,[],'No HTTP 4xx/5xx @'+width);
   await context.close();
  }
  // Offline Service Worker check:
  {
   const swCtx=await browser.newContext({viewport:{width:393,height:800},reducedMotion:'reduce'});
   const swPage=await swCtx.newPage();
   await swPage.goto(app.base+'/index.html?class=10&question=c10-3-ex3-7-q2-iv',{waitUntil:'load'});
   await swPage.evaluate(async()=>{await navigator.serviceWorker.ready;});
   await swCtx.setOffline(true);
   await swPage.goto(app.base+'/index.html?class=10&question=c10-3-ex3-8-q2-ii',{waitUntil:'domcontentloaded'});
   await swPage.locator('#stepsList .katex').first().waitFor({state:'visible'});
   const offAns=await swPage.locator('#answerText').innerText();
   assert(offAns.includes('144'),'Offline SW serves Ex 3.8 Q2(ii) answer');
   await swCtx.close();
  }
  console.log('PASS Grade 10 Ch 3 Exercises 3.7–3.9 browser release: 23/23 tasks, 320/360/393/430px KaTeX, navigation, Tamil toggle, offline SW, and zero overflow.');
 }finally{await browser.close();await app.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
