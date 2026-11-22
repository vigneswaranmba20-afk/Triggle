'use strict';
/* Chapter 7 Mensuration Exercise 7.1 Q6–Q10: fast change-specific mobile-browser smoke.
 * Source-fidelity and mathematics are checked separately by test_g10_ch7_ex71_q6_q10_draft.cjs.
 */
const assert=require('node:assert/strict');
const {chromium}=require('playwright');
const {server,launchOptions}=require('./dashboard_test_support.cjs');
const ids=[6,7,8,9,10].map(n=>'c10-7-ex7-1-q'+n);
(async()=>{
 const app=await server();let browser;
 try {
  browser=await chromium.launch(launchOptions());
  for(const width of [320,390,412]){
   const context=await browser.newContext({viewport:{width,height:820},isMobile:true,hasTouch:true,serviceWorkers:'block',reducedMotion:'reduce'});
   const page=await context.newPage();
   const pageErrors=[];const missingAssets=[];
   page.on('pageerror',e=>pageErrors.push(e.message));
   page.on('response',r=>{if(r.status()>=400&&!r.url().endsWith('/favicon.ico'))missingAssets.push(r.status()+' '+r.url());});
   for(const id of ids){
    await page.goto(app.base+'/index.html?class=10&question='+id,{waitUntil:'load'});
    await page.locator('#lessonCard:not([hidden])').waitFor({timeout:7000});
    await page.locator('#stepsList .katex').first().waitFor({state:'visible',timeout:7000});
    await page.evaluate(()=>document.fonts.ready);
    const state=await page.evaluate(()=>{
     const lesson=document.querySelector('#lessonCard');
     const img=lesson?.querySelector('img');
     return {
      question:(document.querySelector('#questionText')?.innerText||'').trim(),
      answer:(document.querySelector('#answerText')?.innerText||'').trim(),
      steps:lesson?.querySelectorAll('#stepsList .katex').length||0,
      finalMath:!!lesson?.querySelector('#answerText .katex'),
      errors:lesson?.querySelectorAll('.katex-error,[data-math-error]').length||0,
      clippedEquations:[...lesson.querySelectorAll('#stepsList .katex')].map((el,index)=>({index,right:el.getBoundingClientRect().right})).filter(el=>el.right>document.querySelector('#stepsList').getBoundingClientRect().right+4),
      image:img?{src:img.getAttribute('src'),ok:img.complete&&img.naturalWidth>0,
        width:img.getBoundingClientRect().width,height:img.getBoundingClientRect().height,
        top:img.getBoundingClientRect().top,bottom:img.getBoundingClientRect().bottom,
        actionTop:lesson.querySelector('#inlineFigureOpen .inline-figure-action')?.getBoundingClientRect().top??-1}:null,
      viewportW:window.innerWidth,
      documentW:document.documentElement.scrollWidth,
     };
    });
    assert.ok(state.question.length>35,id+' '+width+'px: missing question');
    assert.ok(state.answer.length>5,id+' '+width+'px: missing final answer');
    assert.ok(state.steps>=4,id+' '+width+'px: incomplete typeset work ('+state.steps+' rendered; mathErrors='+state.errors+')');
    assert.ok(state.finalMath,id+' '+width+'px: final answer not typeset');
    assert.equal(state.errors,0,id+' '+width+'px: KaTeX error');
    assert.deepEqual(state.clippedEquations,[],id+' '+width+'px: equations extend beyond their reading column');
    if(id.endsWith('q9')||id.endsWith('q10'))assert.ok(state.answer.includes('Rs.'),id+' '+width+'px: KaTeX-safe rupee abbreviation missing');
    if(id.endsWith('q10')){
     assert.ok(state.image&&state.image.ok,id+' '+width+'px: figure broken');
     assert.ok(state.image.src.includes('grade10-ch7'),id+' '+width+'px: unrelated figure');
     assert.ok(state.image.width>=210,id+' '+width+'px: Q10 thumbnail squeezed to '+state.image.width+'px');
     assert.ok(state.image.height>=120,id+' '+width+'px: Q10 labels too small');
     assert.ok(state.image.actionTop>=state.image.bottom-2,id+' '+width+'px: diagram enlarge action must be below artwork');
    }
    assert.ok(state.documentW<=state.viewportW+1,id+' '+width+'px: horizontal overflow '+state.documentW+' > '+state.viewportW);
   }
   // User-journey regression: use the REAL buttons rather than direct-linking each question.
   await page.goto(app.base+'/index.html?class=10&question=c10-7-ex7-1-q5',{waitUntil:'load'});
   await page.locator('#lessonCard:not([hidden])').waitFor({timeout:7000});
   assert.equal(await page.locator('#next').isDisabled(),false,'Q5 must continue to Q6');
   await page.locator('#next').click();
   await page.waitForFunction(()=>new URLSearchParams(location.search).get('question')==='c10-7-ex7-1-q6');
   assert.match(await page.locator('#questionText').innerText(),/birthday caps/,'Q5→Q6 must show the next textbook question');
   await page.locator('#langTa').click();
   assert.equal(await page.locator('#langTa').getAttribute('aria-pressed'),'true','Tamil toggle must activate');
   assert.match(await page.locator('#kindBadge').innerText(),/தமிழ் மொழிபெயர்ப்பு நிலுவையில்/,'Unreviewed Tamil must be visibly marked pending');
   assert.match(await page.locator('#questionText').innerText(),/birthday caps/,'Tamil toggle must preserve source English until approved');
   await page.locator('#langEn').click();
   assert.equal(await page.locator('#langEn').getAttribute('aria-pressed'),'true');
   await page.goto(app.base+'/index.html?class=10&question=c10-7-ex7-1-q10',{waitUntil:'load'});
   await page.locator('#lessonCard:not([hidden])').waitFor({timeout:7000});
   await page.locator('#inlineFigureVisual img').waitFor({state:'visible'});
   assert.equal(await page.locator('#next').isDisabled(),true,'Q10 must stop at end of Exercise 7.1');
   assert.match(await page.locator('#next').innerText(),/End of exercise/);
   await page.locator('#inlineFigureOpen').click();
   await page.locator('#figureDialog[open]').waitFor({timeout:4000});
   const enlarged=await page.locator('#diagramContent img').evaluate(img=>img.complete&&img.naturalWidth>0);
   assert.ok(enlarged,'Enlarge diagram must open a loaded full-size illustration');
   await page.locator('#closeDiagram').click();
   assert.equal(await page.locator('#figureDialog').evaluate(d=>d.open),false,'Diagram dialog must close');
   const answer=page.locator('#stepsList .final-answer-step .final-answer-value');
   await answer.scrollIntoViewIfNeeded();
   const clearance=await page.evaluate(()=>{
    const answer=document.querySelector('#stepsList .final-answer-step .final-answer-value')?.getBoundingClientRect();
    const docks=[document.querySelector('#questionNavDock'),document.querySelector('.class-dock')].filter(Boolean);
    const fixed=docks.filter(d=>!d.hidden&&['fixed','sticky'].includes(getComputedStyle(d).position)).map(d=>d.getBoundingClientRect());
    const overlaps=fixed.some(d=>Math.max(d.left,answer.left)<Math.min(d.right,answer.right)&&Math.max(d.top,answer.top)<Math.min(d.bottom,answer.bottom));
    return {answerVisible:answer.bottom>0&&answer.top<innerHeight,boxVisible:!!document.querySelector('#stepsList .final-answer-step'),overlaps};
   });
   assert.ok(clearance.answerVisible&&clearance.boxVisible,width+'px: final answer should be visible when focused');
   assert.equal(clearance.overlaps,false,width+'px: fixed navigation dock obscures visible final worked step');
   await page.locator('#previous').click();
   await page.waitForFunction(()=>new URLSearchParams(location.search).get('question')==='c10-7-ex7-1-q9');
   assert.match(await page.locator('#questionText').innerText(),/hemispherical vessel/,'Q10→Q9 previous control must work');
   assert.deepEqual(pageErrors,[],'JS errors at '+width+'px: '+pageErrors.join('; '));
   assert.deepEqual(missingAssets,[],'HTTP errors at '+width+'px: '+missingAssets.join('; '));
   await context.close();
  }
  console.log('PASS G10 Mensuration 7.1 Q6–Q10 mobile: all 5 questions at 320/390/412px, KaTeX, SVG legibility, modal, Q5/Q6 and Q10/Q9 navigation, Tamil pending state, dock clearance, zero overflow/errors.');
 }finally{if(browser)await browser.close();await app.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
