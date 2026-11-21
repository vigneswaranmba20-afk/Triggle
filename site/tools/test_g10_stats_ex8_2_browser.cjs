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
  for(const width of [360,320,412]){
   await page.setViewportSize({width,height:780});
   for(const n of [1,2,3]){
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
      width:document.documentElement.scrollWidth,vw:innerWidth,diff:document.querySelector('#difficultyIndicator')?.dataset.level};
    },id);
    assert.ok(s.text.includes(String(n)+'.'),id);assert.ok(s.answer.trim(),'answer '+id);
    assert.equal(s.steps,s.expected);assert.ok(s.reg);assert.ok(s.katex>=s.expected,'KaTeX rendered '+id);
    assert.equal(s.clipped,0,'clipped KaTeX '+JSON.stringify(s));assert.ok(s.width<=s.vw+1,'overflow '+JSON.stringify(s));
    assert.equal(s.diff,'easy');
   }
  }
  // Regression: neighbouring Chapter 8 records still render
  for(const id of ['c10-8-ex8-1-q11','c10-8-ex8-1-q5']){
   await page.goto(app.base+'/index.html?class=10&question='+id);await page.locator('#stepsList .worked-step').first().waitFor();}
  assert.deepEqual(errors,[]);assert.deepEqual(missing,[]);
  console.log('PASS G10 Ex8.2 Q1-Q3 browser: 320/360/412px, KaTeX, no overflow, navigation, 8.1 regression');
 }finally{await browser.close();await app.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
