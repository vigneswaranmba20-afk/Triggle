'use strict';
const assert=require('node:assert/strict'),{chromium}=require('playwright');
const {server,launchOptions}=require('./dashboard_test_support.cjs');
(async()=>{
 const app=await server(),browser=await chromium.launch(launchOptions());
 try{
  const figureItems=new Set(['c10-3-ex3-12-q2','c10-3-ex3-12-q5','c10-3-ex3-12-q7','c10-3-ex3-12-q8','c10-3-ex3-12-q9']);
  const items=[
   ['c10-3-ex3-10-q1-i','4x² − 7x − 2 = 0','−1/4, 2'],
   ['c10-3-ex3-10-q1-ii','3(p² − 6) = p(p + 5)','−2, 9/2'],
   ['c10-3-ex3-10-q1-iii','√(a(a − 7)) = 3√2','−2, 9'],
   ['c10-3-ex3-10-q1-iv','√2 x² + 7x + 5√2 = 0','−√2, −5/√2'],
   ['c10-3-ex3-10-q1-v','2x² − x + 1/8 = 0','1/4, 1/4'],
   ['c10-3-ex3-10-q2','G(n) = (n² − n)/2','6'],
   ['c10-3-ex3-11-q1-i','9x² − 12x + 4 = 0','2/3, 2/3'],
   ['c10-3-ex3-11-q1-ii','(5x + 7)/(x − 1) = 3x + 2','−1, 3'],
   ['c10-3-ex3-11-q2-i','2x² − 5x + 2 = 0','2, 1/2'],
   ['c10-3-ex3-11-q2-ii','√2 f² − 6f + 3√2 = 0','(3 + √3)/√2, (3 − √3)/√2'],
   ['c10-3-ex3-11-q2-iii','3y² − 20y − 23 = 0','−1, 23/3'],
   ['c10-3-ex3-11-q2-iv','36y² − 12ay + (a² − b²) = 0','(a + b)/6, (a − b)/6'],
   ['c10-3-ex3-11-q3','d = t² − 0.75t','3.75 seconds'],
   ['c10-3-ex3-12-q1','reciprocal is 24/5','5, −1/5'],
   ['c10-3-ex3-12-q2','12m by 16m','1.5 m'],
   ['c10-3-ex3-12-q3','90 km at a uniform speed','45 km/hr'],
   ['c10-3-ex3-12-q4','twice as old as her sister','20 years, 10 years'],
   ['c10-3-ex3-12-q5','diameter 20 m','Yes, 12 m, 16 m'],
   ['c10-3-ex3-12-q6','2x² black bees','72'],
   ['c10-3-ex3-12-q7','Music is been played','28 m, 42 m'],
   ['c10-3-ex3-12-q8','side is 10 m','2 m'],
   ['c10-3-ex3-12-q9','hypotenuse of a right angled triangle is 25 cm','7 cm']
  ];
  const widths=[320,360,393,430];
  for(const width of widths){
   const context=await browser.newContext({viewport:{width,height:800},serviceWorkers:'block',reducedMotion:'reduce'});
   const page=await context.newPage(),errors=[],missing=[];
   page.on('pageerror',e=>errors.push(e.message));
   page.on('response',r=>{if(r.status()>=400)missing.push(r.url());});
   const sample=width===393||width===320?items:items.filter(([id],idx)=>idx%2===0||figureItems.has(id)||idx===items.length-1);
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
     const figImg=document.querySelector('#inlineFigureVisual img');
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
      imgReady:figImg?Boolean(figImg.complete&&figImg.naturalWidth>0):false,
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
    assert(check.pageWidth<=check.innerWidth+1,'No horizontal overflow '+id+' @'+width+': '+check.pageWidth+'>'+check.innerWidth);
    for(const f of check.formulas){
     assert(f.visible+1>=f.glyph,'No vertical glyph clipping '+id+' @'+width+': '+JSON.stringify(f));
     if(f.scroll>f.width+1)assert.equal(f.tab,0,'Wide formula must be keyboard-focusable '+id);
    }
    if(figureItems.has(id)){
     assert(await page.locator('#inlineFigureOpen:visible, #figureBtn:visible').isVisible(),'Useful figure button visible '+id);
     assert(await page.locator('#inlineFigure').isVisible(),'Inline figure visible '+id);
     assert(check.imgReady,'Figure SVG loaded cleanly '+id+' @'+width);
    }else{
     assert(await page.locator('#figureBtn').isHidden(),'No decorative figure button '+id);
     assert(await page.locator('#inlineFigure').isHidden(),'No decorative inline figure '+id);
    }
   }
   if(width===393){
    // Verify modal figure dialog opens cleanly on Ex 3.12 Q5 and compares with answer:
    await page.goto(app.base+'/index.html?class=10&question=c10-3-ex3-12-q5');
    await page.locator('#inlineFigureOpen').click();
    await page.locator('#figureDialog[open]').waitFor({state:'visible'});
    assert(/Yes[\s\S]*12\s*m[\s\S]*16\s*m/.test(await page.locator('#diagramCompareAnswer').innerText()),'Figure modal shows final answer');
    await page.locator('#closeDiagram').click();

    // Top & bottom navigation across exercise order:
    for(const [start,end] of [
     ['c10-3-ex3-10-q1-v','c10-3-ex3-10-q2'],
     ['c10-3-ex3-11-q1-ii','c10-3-ex3-11-q2-i'],
     ['c10-3-ex3-11-q2-iv','c10-3-ex3-11-q3'],
     ['c10-3-ex3-12-q1','c10-3-ex3-12-q2'],
     ['c10-3-ex3-12-q8','c10-3-ex3-12-q9']
    ]){
     await page.goto(app.base+'/index.html?class=10&question='+start);
     await page.locator('#next').click();
     assert.equal(new URL(page.url()).searchParams.get('question'),end,'Next follows textbook order '+start+' -> '+end);
    }
    for(const lastId of ['c10-3-ex3-10-q2','c10-3-ex3-11-q3','c10-3-ex3-12-q9']){
     await page.goto(app.base+'/index.html?class=10&question='+lastId);
     assert(await page.locator('#next').isDisabled(),'Last question disables Next: '+lastId);
    }
    // Check top Exercises back button and Chapter 3 Concepts access:
    await page.goto(app.base+'/index.html?class=10&question=c10-3-ex3-11-q2-iv');
    assert(await page.locator('#exerciseIndexLink').isVisible(),'Top <- Exercises button visible');
    await page.locator('#exerciseIndexLink').click();
    await page.locator('#chapterOverview').waitFor({state:'visible'});
    assert(new URL(page.url()).searchParams.get('section')==='exercises','Exercises link opens Ch 3 exercises list');
    const exText=await page.locator('#chapterOverview').innerText();
    for(const ex of ['3.10','3.11','3.12'])assert(exText.includes(ex),'Chapter 3 exercises list includes Exercise '+ex);
    await page.locator('.hub-back-menu').click();
    const conceptsCard=page.locator('.hub-section-card[data-hub-section="concepts"]');
    await conceptsCard.waitFor({state:'visible'});
    assert(/14\s*available/i.test(await conceptsCard.innerText()),'Chapter 3 hub retains 14 interactive Concepts');

    // Tamil language toggle keeps KaTeX readable and error-free:
    await page.goto(app.base+'/index.html?class=10&question=c10-3-ex3-12-q7');
    await page.locator('#langTa').click();
    assert((await page.locator('#stepsList .katex').count())>=3,'Tamil toggle preserves KaTeX working');
    assert.equal(await page.locator('[data-math-error]').count(),0,'No KaTeX error in Tamil fallback');
   }
   assert.deepEqual(errors,[],'No JS pageerror @'+width);
   assert.deepEqual(missing,[],'No HTTP 4xx/5xx @'+width);
   await context.close();
  }
  // Offline Service Worker check including SVG figure:
  {
   const swCtx=await browser.newContext({viewport:{width:393,height:800},reducedMotion:'reduce'});
   const swPage=await swCtx.newPage();
   await swPage.goto(app.base+'/index.html?class=10&question=c10-3-ex3-10-q2',{waitUntil:'load'});
   await swPage.evaluate(async()=>{await navigator.serviceWorker.ready;});
   await swCtx.setOffline(true);
   await swPage.goto(app.base+'/index.html?class=10&question=c10-3-ex3-12-q8',{waitUntil:'domcontentloaded'});
   await swPage.locator('#stepsList .katex').first().waitFor({state:'visible'});
   const offAns=await swPage.locator('#answerText').innerText();
   assert(/2\s*m/.test(offAns),'Offline SW serves Ex 3.12 Q8 answer');
   assert(await swPage.evaluate(()=>Boolean(document.querySelector('#inlineFigureVisual img')?.complete)),'Offline SW caches and displays Ex 3.12 Q8 SVG');
   await swCtx.close();
  }
  console.log('PASS Grade 10 Ch 3 Exercises 3.10–3.12 browser release: 22/22 tasks, 5 SVGs, 320/360/393/430px KaTeX, navigation, Concepts link, Tamil toggle, offline SW, and zero overflow.');
 }finally{await browser.close();await app.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
