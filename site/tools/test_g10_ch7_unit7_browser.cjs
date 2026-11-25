'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const {chromium}=require('playwright'),{server,launchOptions}=require('./dashboard_test_support.cjs');
const items=JSON.parse(fs.readFileSync(path.join(__dirname,'../data/textbook-fidelity/g10-ch7-unit7.json'),'utf8')).items;
const norm=s=>s.replace(/\s+/g,' ').trim().replace(/^\d+\.\s*/,'');
(async()=>{const app=await server();let browser;try{
 browser=await chromium.launch(launchOptions());
 for(const width of [320,390,412]){
  const context=await browser.newContext({viewport:{width,height:820},isMobile:true,hasTouch:true,serviceWorkers:'block',reducedMotion:'reduce'});
  const page=await context.newPage(),errors=[];
  page.on('pageerror',e=>errors.push(e.message));
  for(const f of items){
   await page.goto(app.base+'/index.html?class=10&question='+f.id,{waitUntil:'load'});
   await page.locator('#lessonCard:not([hidden])').waitFor();
   for(const lang of ['en','ta']){
    const btn=page.locator(lang==='en'?'#langEn':'#langTa');
    if(await btn.getAttribute('aria-pressed')!=='true')await btn.click();
    await page.locator('#stepsList .katex').first().waitFor({state:'visible'});
    await page.evaluate(()=>document.fonts.ready);
    const state=await page.evaluate(()=>{
      const logical=sel=>{const node=document.querySelector(sel).cloneNode(true);for(const tex of node.querySelectorAll('[data-math-fallback]'))tex.replaceWith(document.createTextNode(tex.getAttribute('data-math-fallback')));return node.textContent;};
      return {question:logical('#questionText'),answer:logical('#answerText'),steps:[...document.querySelectorAll('#stepsList .step-reason')].map(n=>n.innerText),math:document.querySelectorAll('#lessonCard .katex').length,errors:document.querySelectorAll('#lessonCard .katex-error,#lessonCard [data-math-error]').length,doc:document.documentElement.scrollWidth,width:innerWidth};
    });
    assert.equal(norm(state.question),norm(f.textbookPrompt[lang]),f.id+' '+lang+' question');
    assert.equal(norm(state.answer),norm(f.answerValue[lang]),f.id+' '+lang+' answer');
    assert.ok(state.steps.length>=2);assert.ok(state.doc<=state.width+1,f.id+' '+lang+' overflow');assert.equal(state.errors,0);assert.ok(state.math>0);
    if(lang==='ta')for(const reason of state.steps)assert.match(reason,/[\u0B80-\u0BFF]/);
   }
  }
  assert.deepEqual(errors,[]);await context.close();
 }
 console.log('PASS 60 Unit Exercise 7 bilingual mobile views');
}finally{if(browser)await browser.close();await app.close();}})().catch(e=>{console.error(e);process.exitCode=1;});
