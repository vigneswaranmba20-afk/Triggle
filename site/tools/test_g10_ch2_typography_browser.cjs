'use strict';
const assert=require('node:assert/strict');
const {chromium}=require('playwright');
const {server,launchOptions}=require('./dashboard_test_support.cjs');
(async()=>{
 const http=await server();const browser=await chromium.launch(launchOptions());
 try{
  const page=await browser.newPage({viewport:{width:390,height:844},serviceWorkers:'block'});
  const errors=[];page.on('pageerror',error=>errors.push(error.message));
  for(const width of [320,390,768,1280]){
   await page.setViewportSize({width,height:844});
   for(const id of ['c10-2-ex2-1-q1','c10-2-ex2-2-q5','c10-2-ex2-2-q9']){
    await page.goto(http.base+'/index.html?class=10&question='+id);
    await page.locator('#stepsList .worked-step').first().waitFor();
    const state=await page.evaluate(()=>{
      const css=sel=>getComputedStyle(document.querySelector(sel));
      return {scope:document.body.classList.contains('g10-ch2-type'),
        questionSize:parseFloat(css('#questionText').fontSize),
        reasonSize:parseFloat(css('#stepsList .step-reason').fontSize),
        equationSize:parseFloat(css('#stepsList .step-equation').fontSize),
        textFont:css('#questionText').fontFamily,
        mathFont:css('#stepsList .step-equation').fontFamily,
        scroll:document.documentElement.scrollWidth,viewport:innerWidth,
        count:document.querySelectorAll('#stepsList .worked-step').length
      };
    });
    assert(state.scope,'Grade 10 Chapter 2 typography missing for '+id);
    assert(state.questionSize>=15.5&&state.reasonSize>=15&&state.equationSize>=17,'Readability regression '+JSON.stringify(state));
    assert(state.textFont.includes('Inter')&&state.mathFont.includes('KaTeX_Main'),'Font family missing '+JSON.stringify(state));
    assert(state.scroll<=state.viewport+1,'Horizontal page overflow '+JSON.stringify(state));
    assert(state.count>=2,'No full solution '+id);
   }
  }
  await page.goto(http.base+'/index.html?class=10&chapter=g10-ch2');
  assert(await page.locator('body').evaluate(el=>el.classList.contains('g10-ch2-type')),'Chapter 2 overview must match reader font');
  await page.goto(http.base+'/index.html?class=10&question=c10-1-ex1-1-q1-i');
  assert(!(await page.locator('body').evaluate(el=>el.classList.contains('g10-ch2-type'))),'Grade 10 Chapter 1 must be unchanged');
  await page.goto(http.base+'/index.html?class=9');
  assert(!(await page.locator('body').evaluate(el=>el.classList.contains('g10-ch2-type'))),'Other grades must be unchanged');
  assert.deepEqual(errors,[],'Browser errors');
  console.log('PASS Grade 10 Chapter 2 typography: 320/390/768/1280px, exercises 2.1/2.2, chapter hub, isolation and no horizontal overflow');
  await page.close();
 }finally{await browser.close();await http.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
