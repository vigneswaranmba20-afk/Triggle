'use strict';

const assert=require('node:assert/strict');
const {chromium}=require('playwright');
const {server,launchOptions}=require('./dashboard_test_support.cjs');
const {items}=require('../data/textbook-fidelity/g10-frontier-tamil-answers.json');
const route=id=>'?class=10&question='+id;
const untranslated=/\b(?:True|Verified|both sides|proved|where|Mean|and|term)\b/;

async function check(page,id){
  const result=page.locator('.final-answer-value');
  assert(await result.isVisible());
  const item=await page.evaluate(id=>window.TRIGGLE_CLASSES[10].items.find(row=>row.id===id),id);
  assert(item.answerMath.en&&item.answerMath.ta);
  const enText=await result.innerText();
  assert(enText.trim());
  await page.locator('#langTa').click();
  assert.doesNotMatch(await result.innerText(),untranslated);
  const plain=await result.evaluate(el=>{
    const copy=el.cloneNode(true);
    for(const math of copy.querySelectorAll('.triggle-tex'))math.replaceWith(document.createTextNode(math.dataset.mathFallback));
    return copy.textContent;
  });
  assert.equal(plain,item.answerTa);
  assert(await page.locator('#lessonCard .katex').count()>0);
  assert.equal(await page.locator('#lessonCard .katex-error,#lessonCard [data-math-error="true"]').count(),0);
  assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));
  await page.locator('#langEn').click();
  assert.equal(await result.innerText(),enText,'Language switching preserves the English reader answer');
}

async function run(){
 const live=process.env.TRIGGLE_LIVE_BASE?.replace(/\/$/,'');
 const app=live?null:await server();
 const base=(live||app.base)+'/index.html';
 const browser=await chromium.launch(launchOptions());
 try{
  for(const width of live?[390]:[320,360,390,412]){
   const ctx=await browser.newContext({viewport:{width,height:844},isMobile:true,hasTouch:true,serviceWorkers:'block',ignoreHTTPSErrors:!!live});
   try{
    const page=await ctx.newPage(),errors=[];
    page.on('pageerror',e=>errors.push(e.message));
    await page.goto(base+'?class=10&chapter=g10-ch1&section=exercises');
    await page.locator('.hub-exercise-link[data-exercise="1.1"]').click();
    assert(page.url().endsWith('c10-1-ex1-1-q1-i'));
    assert(await page.locator('#previous').isDisabled());
    const sample=width===390?items:items.filter(r=>['c10-1-ex1-1-q7-ii','c10-2-unit-q4','c10-6-ex6-1-q8-i','c10-8-unit-q5'].includes(r.id));
    for(const {id} of sample){
      await page.goto(base+route(id),{waitUntil:'domcontentloaded'});
      await check(page,id);
    }
    assert.deepEqual(errors,[]);
   }finally{await ctx.close();}
   console.log('PASS Grade 10 Tamil final answers at '+width+'px');
  }
  if(!live){
   const ctx=await browser.newContext({viewport:{width:390,height:844}});
   try{
    const id='c10-8-unit-q5',page=await ctx.newPage();
    await page.addInitScript(id=>{
      if(localStorage.getItem('triggle.learned.v119')===null) localStorage.setItem('triggle.learned.v119',JSON.stringify([id]));
    },id);
    await page.goto(base+route(id));
    await page.waitForFunction(()=>navigator.serviceWorker.controller!==null);
    await ctx.setOffline(true);
    await page.reload({waitUntil:'domcontentloaded'});
    await check(page,id);
    assert.equal(await page.locator('#markDone').getAttribute('aria-pressed'),'true');
   }finally{await ctx.close();}
   console.log('PASS offline Grade 10 Tamil answer, KaTeX and progress restoration');
  }
 }finally{await browser.close();await app?.close();}
}
run().catch(e=>{console.error(e);process.exitCode=1;});
