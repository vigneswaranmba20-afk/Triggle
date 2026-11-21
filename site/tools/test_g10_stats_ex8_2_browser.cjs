'use strict';
const assert=require('node:assert/strict'),{chromium}=require('playwright');
const {server,launchOptions}=require('./dashboard_test_support.cjs');
(async()=>{
 const app=await server(),browser=await chromium.launch(launchOptions());
 try{
  const page=await browser.newPage({viewport:{width:360,height:780},serviceWorkers:'block'});
  const errors=[],missing=[];
  page.on('pageerror',e=>errors.push(e.message));
  page.on('response',r=>{if(r.status()>=400)missing.push(r.url());});
  for(const width of [320,360,390,412]){
   await page.setViewportSize({width,height:780});
   for(const n of [1,2,3,4,5,6,7,8]){
    const id='c10-8-ex8-2-q'+n;
    await page.goto(app.base+'/index.html?class=10&question='+id);
    await page.locator('#stepsList .worked-step').first().waitFor();
    await page.waitForFunction(()=>document.querySelectorAll('#stepsList .katex').length>0);
    const s=await page.evaluate(id=>{
     const r=window.TRIGGLE_CLASSES[10].items.find(x=>x.id===id),ch=window.TRIGGLE_CURRICULUM.grades.find(g=>g.grade===10).chapters.find(c=>String(c.number)==='8');
     const k=[...document.querySelectorAll('#stepsList .katex, #answerText .katex')];
     return {text:document.querySelector('#questionText').textContent,answer:document.querySelector('#answerText').textContent,
      steps:document.querySelectorAll('#stepsList .worked-step:not(.final-answer-step)').length,expected:r.steps.length,
      reg:ch.textbookQuestionIds.includes(id),katex:k.length,
      clipped:k.filter(e=>{const b=e.getBoundingClientRect();return b.width>0&&b.right>innerWidth+1&&!e.closest('[tabindex],.katex-display')}).length,
      width:document.documentElement.scrollWidth,vw:innerWidth,diff:document.querySelector('#difficultyIndicator')?.dataset.level,tableRows:document.querySelectorAll('#questionText .triggle-data-table tbody tr').length,stepsText:document.querySelector('#stepsList').textContent};
    },id);
    assert.ok(s.text.includes(String(n)+'.'),id);assert.ok(s.answer.trim(),'answer '+id);
    assert.equal(s.steps,s.expected);assert.ok(s.reg);assert.ok(s.katex>=s.expected,'KaTeX rendered '+id);
    assert.equal(s.clipped,0,'clipped KaTeX '+JSON.stringify(s));assert.ok(s.width<=s.vw+1,'overflow '+JSON.stringify(s));
    assert.equal(s.diff,n<=3?'easy':'medium');
    if(n===8)assert.equal(s.tableRows,3,'Q8 source table must render as a native accessible table');
    if(n===6)assert.ok(s.stepsText.includes('10.07')&&s.stepsText.includes('10.06'),'explain exact vs textbook rounding');
   }
  }
  // Regression: neighbouring Chapter 8 records still render
  for(const id of ['c10-8-ex8-1-q11','c10-8-ex8-1-q5']){
   await page.goto(app.base+'/index.html?class=10&question='+id);await page.locator('#stepsList .worked-step').first().waitFor();}

  // Offline PWA regression: the HTML uses a ?v= URL while CORE precaches its
  // unversioned URL. The existing SW fallback must match with ignoreSearch:true.
  const offlineContext=await browser.newContext({viewport:{width:360,height:800},serviceWorkers:'allow'});
  try{
   const offlinePage=await offlineContext.newPage();
   const offlineUrl=app.base+'/index.html?class=10&question=c10-8-ex8-2-q8';
   await offlinePage.goto(offlineUrl);
   await offlinePage.locator('#questionText .triggle-data-table tbody tr').first().waitFor();
   await offlinePage.evaluate(async()=>{await navigator.serviceWorker.ready;});
   await offlinePage.waitForFunction(()=>!!navigator.serviceWorker?.controller,null,{timeout:60000});
   const cached=await offlinePage.evaluate(async()=>{
    const url=new URL('./data/textbook-exercises/g10-ch8-ex8-2-q4-q8-en.js?v=g10-ex8-2-q4-q8-20261121-1',location.href);
    return !!(await caches.match(url.href,{ignoreSearch:true}));
   });
   assert.ok(cached,'Exercise 8.2 Q4-Q8 must be cached despite ?v= version query');
   await offlineContext.setOffline(true);
   await offlinePage.reload({waitUntil:'domcontentloaded'});
   await offlinePage.locator('#questionText .triggle-data-table tbody tr').first().waitFor();
   assert.equal(await offlinePage.locator('#questionText .triggle-data-table tbody tr').count(),3,'Q8 offline table');
   assert.ok(await offlinePage.locator('#stepsList .katex').count()>0,'offline math rendered');
   assert.ok((await offlinePage.locator('#answerText').textContent()).includes('Social Science'),'offline answer');
  }finally{await offlineContext.close();}

  assert.deepEqual(errors,[]);assert.deepEqual(missing,[]);
  console.log('PASS G10 Ex8.2 Q1-Q8 browser: 320/360/390/412px, KaTeX, no overflow, navigation, 8.1 regression, offline ?v= reload');
 }finally{await browser.close();await app.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
