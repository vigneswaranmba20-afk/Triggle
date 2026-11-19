'use strict';
const assert=require('node:assert/strict'),{chromium}=require('playwright');
const {server,launchOptions}=require('./dashboard_test_support.cjs');

async function swipeUp(cdp,x,start,end){
 const point=y=>({x,y,id:1,radiusX:4,radiusY:4,force:1});
 await cdp.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[point(start)]});
 for(let i=1;i<=10;i++){
  await cdp.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[point(start+(end-start)*i/10)]});
  await new Promise(r=>setTimeout(r,15));
 }
 await cdp.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});
}

(async()=>{
 const app=await server(),browser=await chromium.launch(launchOptions());
 try{
  const items=[
   ['c10-3-ex3-13-q1-i','15x² + 11x + 2 = 0','Real and unequal'],
   ['c10-3-ex3-13-q1-ii','x² − x − 1 = 0','Real and unequal'],
   ['c10-3-ex3-13-q1-iii','√2 t² − 3t + 3√2 = 0','Not real'],
   ['c10-3-ex3-13-q1-iv','9y² − 6√2 y + 2 = 0','Real and equal'],
   ['c10-3-ex3-13-q1-v','9a²b²x² − 24abcdx + 16c²d² = 0','Real and equal'],
   ['c10-3-ex3-13-q2-i','(5k − 6)x² + 2kx + 1 = 0','2, 3'],
   ['c10-3-ex3-13-q2-ii','kx² + (6k + 2)x + 16 = 0','1, 1/9'],
   ['c10-3-ex3-13-q3','(a − b)x² + (b − c)x + (c − a) = 0','Hence proved: b, a, c are in arithmetic progression.'],
   ['c10-3-ex3-13-q4','(a − b)x² − 6(a + b)x − 9(a − b) = 0','Hence proved: the roots are real and unequal.'],
   ['c10-3-ex3-13-q5','(c² − ab)x² − 2(a² − bc)x + b² − ac = 0','Hence proved: either a = 0 or a³ + b³ + c³ = 3abc.'],
   ['c10-3-ex3-14-q1-i','α/(3β) + β/(3α)','((α + β)² − 2αβ)/(3αβ)'],
   ['c10-3-ex3-14-q1-ii','1/(α²β) + 1/(β²α)','(α + β)/(αβ)²'],
   ['c10-3-ex3-14-q1-iii','(3α − 1)(3β − 1)','9αβ − 3(α + β) + 1'],
   ['c10-3-ex3-14-q1-iv','(α + 3)/β + (β + 3)/α','((α + β)² − 2αβ + 3(α + β))/(αβ)'],
   ['c10-3-ex3-14-q2-i','2x² − 7x + 5 = 0','7/5'],
   ['c10-3-ex3-14-q2-ii','α/β + β/α','29/10'],
   ['c10-3-ex3-14-q2-iii','(α + 2)/(β + 2) + (β + 2)/(α + 2)','13/6'],
   ['c10-3-ex3-14-q3-i','α² and β²','x² − 44x + 16 = 0'],
   ['c10-3-ex3-14-q3-ii','2/α and 2/β','x² − 3x − 1 = 0'],
   ['c10-3-ex3-14-q3-iii','α²β and β²α','x² − 24x − 64 = 0'],
   ['c10-3-ex3-14-q4','7x² + ax + 2 = 0','−15, 15'],
   ['c10-3-ex3-14-q5','2y² − ay + 64 = 0','−24, 24'],
   ['c10-3-ex3-14-q6','3x² + kx + 81 = 0','−36']
  ];
  const widths=[320,360,393,412,430];
  for(const width of widths){
   const context=await browser.newContext({viewport:{width,height:800},isMobile:true,hasTouch:true,serviceWorkers:'block',reducedMotion:'reduce'});
   const page=await context.newPage(),errors=[],missing=[];
   page.on('pageerror',e=>errors.push(e.message));
   page.on('response',r=>{if(r.status()>=400)missing.push(r.url());});
   const sample=width===393||width===320?items:items.filter((_,idx)=>idx%3===0||idx===items.length-1);
   for(const [id,qToken,ansToken] of sample){
    await page.goto(app.base+'/index.html?class=10&question='+id,{waitUntil:'domcontentloaded'});
    await page.locator('#stepsList .structured-equation .triggle-tex').first().waitFor({state:'visible'});
    await page.evaluate(()=>document.fonts.ready);
    await page.waitForTimeout(40);
    const check=await page.evaluate(id=>{
     const item=window.TRIGGLE_CLASSES?.[10]?.items.find(x=>x.id===id);
     const whole=document.querySelector('#lessonCard');
     const steps=[...whole.querySelectorAll('#stepsList .worked-step:not(.final-answer-step)')];
     const formulas=[...whole.querySelectorAll('.triggle-tex')];
     const reader=document.querySelector('.lesson-container');
     return {
      source:item?{question:item.q?.en,answer:item.answer}:null,
      qText:document.querySelector('#questionText')?.innerText||'',
      ansText:document.querySelector('#answerText')?.innerText||'',
      pageWidth:document.documentElement.scrollWidth,
      innerWidth,
      scrollTop:document.scrollingElement.scrollTop,
      readerY:getComputedStyle(reader).overflowY,
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
    assert(check.katexCount>=3,'KaTeX rendered in steps '+id);
    assert(check.hasFinal,'Final answer uses KaTeX '+id);
    assert.equal(check.stepsCount,check.expectedSteps,'All steps rendered '+id);
    assert.equal(check.missingFallback,0,'No missing fallback '+id);
    assert.equal(check.mathError,0,'No KaTeX error '+id);
    assert.equal(check.scrollTop,0,'Question loads at top without unnecessary scroll '+id+' @'+width);
    assert.equal(check.readerY,'visible','Lesson container does not trap Android vertical swipes '+id+' @'+width);
    assert(check.pageWidth<=check.innerWidth+1,'No horizontal overflow '+id+' @'+width+': '+check.pageWidth+'>'+check.innerWidth);
    for(const f of check.formulas){
     assert(f.visible+1>=f.glyph,'No vertical glyph clipping '+id+' @'+width+': '+JSON.stringify(f));
     if(f.scroll>f.width+1)assert.equal(f.tab,0,'Wide formula must be keyboard-focusable '+id);
    }
    assert(await page.locator('#figureBtn').isHidden(),'No decorative figure button '+id);
    assert(await page.locator('#inlineFigure').isHidden(),'No decorative inline figure '+id);
   }

   if(width===393){
    // Android touch swipe + final answer never covered by #questionNavDock:
    await page.goto(app.base+'/index.html?class=10&question=c10-3-ex3-14-q2-iii',{waitUntil:'domcontentloaded'});
    await page.locator('#stepsList .final-answer-step').waitFor({state:'visible'});
    const cdp=await context.newCDPSession(page);
    const dockTop=await page.locator('#questionNavDock').evaluate(el=>el.getBoundingClientRect().top);
    await swipeUp(cdp,196,Math.round(dockTop-40),200);
    await page.waitForTimeout(180);
    assert(await page.evaluate(()=>document.scrollingElement.scrollTop)>20,'Android swipe scrolls document smoothly');
    await page.evaluate(()=>window.scrollTo({top:document.scrollingElement.scrollHeight,behavior:'instant'}));
    await page.waitForTimeout(80);
    const pos=await page.evaluate(()=>{
     const a=document.querySelector('#stepsList .final-answer-step').getBoundingClientRect();
     const d=document.getElementById('questionNavDock').getBoundingClientRect();
     return {aBottom:a.bottom,dTop:d.top};
    });
    assert(pos.aBottom<=pos.dTop-2,'Final answer is not covered by bottom navigation dock');
    await cdp.detach();

    // Navigate from Chapter 3 Exercises index directly into 3.13 & 3.14 without unnecessary scrolling:
    await page.goto(app.base+'/index.html?class=10&chapter=g10-ch3&section=exercises',{waitUntil:'domcontentloaded'});
    await page.locator('.hub-exercise-index').waitFor({state:'visible'});
    const link313=page.locator('.hub-exercise-link[data-exercise="3.13"]');
    const link314=page.locator('.hub-exercise-link[data-exercise="3.14"]');
    assert(await link313.isVisible(),'Exercise 3.13 listed in Ch 3 exercise index');
    assert(await link314.isVisible(),'Exercise 3.14 listed in Ch 3 exercise index');
    await link313.click();
    await page.locator('#stepsList .katex').first().waitFor({state:'visible'});
    assert.equal(new URL(page.url()).searchParams.get('question'),'c10-3-ex3-13-q1-i');
    assert.equal(await page.evaluate(()=>document.scrollingElement.scrollTop),0,'Opening Exercise 3.13 starts at top');

    // Step through Next/Previous inside Exercise 3.13 and 3.14:
    for(const [start,end] of [
     ['c10-3-ex3-13-q1-v','c10-3-ex3-13-q2-i'],
     ['c10-3-ex3-13-q2-ii','c10-3-ex3-13-q3'],
     ['c10-3-ex3-13-q4','c10-3-ex3-13-q5'],
     ['c10-3-ex3-14-q1-iv','c10-3-ex3-14-q2-i'],
     ['c10-3-ex3-14-q2-iii','c10-3-ex3-14-q3-i'],
     ['c10-3-ex3-14-q3-iii','c10-3-ex3-14-q4'],
     ['c10-3-ex3-14-q5','c10-3-ex3-14-q6']
    ]){
     await page.goto(app.base+'/index.html?class=10&question='+start);
     await page.locator('#next').click();
     assert.equal(new URL(page.url()).searchParams.get('question'),end,'Next follows textbook order '+start+' -> '+end);
     assert.equal(await page.evaluate(()=>document.scrollingElement.scrollTop),0,'Next resets scroll to top for '+end);
    }
    for(const lastId of ['c10-3-ex3-13-q5','c10-3-ex3-14-q6']){
     await page.goto(app.base+'/index.html?class=10&question='+lastId);
     assert(await page.locator('#next').isDisabled(),'Last question disables Next: '+lastId);
    }

    // Top <- Exercises button visible immediately without scrolling and returns to Exercises list:
    await page.goto(app.base+'/index.html?class=10&question=c10-3-ex3-14-q4');
    const exBtnTop=await page.locator('#exerciseIndexLink').evaluate(el=>el.getBoundingClientRect().top);
    assert(exBtnTop>=0&&exBtnTop<250,'Top <- Exercises button visible immediately without scrolling');
    await page.locator('#exerciseIndexLink').click();
    await page.locator('#chapterOverview').waitFor({state:'visible'});
    assert(new URL(page.url()).searchParams.get('section')==='exercises','Exercises link opens Ch 3 exercises list');

    // Tamil language toggle keeps KaTeX readable and error-free:
    await page.goto(app.base+'/index.html?class=10&question=c10-3-ex3-13-q5');
    await page.locator('#langTa').click();
    assert((await page.locator('#stepsList .katex').count())>=3,'Tamil toggle preserves KaTeX working');
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
   await swPage.goto(app.base+'/index.html?class=10&question=c10-3-ex3-13-q1-i',{waitUntil:'load'});
   await swPage.evaluate(async()=>{await navigator.serviceWorker.ready;});
   await swCtx.setOffline(true);
   await swPage.goto(app.base+'/index.html?class=10&question=c10-3-ex3-14-q6',{waitUntil:'domcontentloaded'});
   await swPage.locator('#stepsList .katex').first().waitFor({state:'visible'});
   const offAns=await swPage.locator('#answerText').innerText();
   assert(/36/.test(offAns),'Offline SW serves Ex 3.14 Q6 answer');
   await swCtx.close();
  }
  console.log('PASS Grade 10 Ch 3 Exercises 3.13–3.14 browser release: 23/23 tasks, 320/360/393/412/430px KaTeX, Android swipe scroll, exercise navigation, Tamil toggle, offline SW, and zero overflow.');
 }finally{await browser.close();await app.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
