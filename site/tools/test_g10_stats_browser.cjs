'use strict';
const assert=require('node:assert/strict'),{chromium}=require('playwright');
const {server,launchOptions}=require('./dashboard_test_support.cjs');
(async()=>{
 const app=await server(),browser=await chromium.launch(launchOptions());
 try{
  const page=await browser.newPage({viewport:{width:390,height:844},serviceWorkers:'block'});
  const errors=[],missing=[];
  page.on('pageerror',e=>errors.push(e.message));
  page.on('response',r=>{if(r.status()>=400)missing.push(r.url());});
  for(const width of [320,390,412,768]){
   await page.setViewportSize({width,height:844});
   for(const number of [5,6,7,8,9,10]){
    const id='c10-8-ex8-1-q'+number;
    await page.goto(app.base+'/index.html?class=10&question='+id);
    await page.locator('#stepsList .worked-step').first().waitFor();
    const state=await page.evaluate(id=>{
      const r=window.TRIGGLE_CLASSES[10].items.find(x=>x.id===id),chapter=window.TRIGGLE_CURRICULUM.grades.find(x=>x.grade===10).chapters.find(x=>String(x.number)==='8');
      return {questionPresent:!document.querySelector('#lessonCard').hidden,
        text:document.querySelector('#questionText').textContent,
        result:document.querySelector('#answerText').textContent,
        stepCount:document.querySelectorAll('#stepsList .worked-step:not(.final-answer-step)').length,
        expected:r?.steps.length,difficulty:document.querySelector('#difficultyIndicator').dataset.level,
        registered:chapter.textbookQuestionIds.includes(id),
        width:document.documentElement.scrollWidth,viewport:innerWidth};
    },id);
    assert(state.questionPresent&&state.text.trim().length>10,JSON.stringify({id,state}));
    assert(state.result.trim().length>0,'Final answer missing for '+id);
    assert.equal(state.stepCount,state.expected,'Omitted worked solution '+id);
    assert(state.registered,'Not discoverable in chapter 8 '+id);
    assert(['easy','medium','difficult'].includes(state.difficulty),'Unclassified '+id);
    assert(state.width<=state.viewport+1,'Horizontal overflow '+JSON.stringify({id,state}));
   }
  }
  // Mobile language switching must not falsely translate unreviewed textbook wording.
  await page.setViewportSize({width:390,height:844});
  await page.goto(app.base+'/index.html?class=10&question=c10-8-ex8-1-q5');
  await page.locator('#langTa').click();
  assert.equal(await page.locator('html').getAttribute('lang'),'ta');
  assert.ok((await page.locator('#questionText').innerText()).includes('310'),'English-only source numbers preserved under Tamil UI');
  assert.deepEqual(errors,[],'Browser console errors');assert.deepEqual(missing,[],'Missing mobile app assets');
  console.log('PASS G10 Statistics Q5-Q10: six routes, entire working, chapter navigation, difficulty, final answers, 320/390/412/768px and Tamil fallback');
  await page.close();
 }finally{await browser.close();await app.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
