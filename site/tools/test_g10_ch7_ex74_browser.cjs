'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const {chromium}=require('playwright'),{server,launchOptions}=require('./dashboard_test_support.cjs');
const items=JSON.parse(fs.readFileSync(path.join(__dirname,'../data/textbook-fidelity/g10-ch7-ex7-4.json'),'utf8')).items;
const norm=s=>s.replace(/\s+/g,' ').trim().replace(/^\d+\.\s*/,'');
(async()=>{const app=await server();let browser;try{
browser=await chromium.launch(launchOptions());
for(const width of [320,390,412]){
 const context=await browser.newContext({viewport:{width,height:820},isMobile:true,hasTouch:true,serviceWorkers:'block',reducedMotion:'reduce'});
 const page=await context.newPage(); const errors=[];
 page.on('pageerror',e=>errors.push(e.message));
 for(const f of items){
  await page.goto(app.base+'/index.html?class=10&question='+f.id,{waitUntil:'load'});
  await page.locator('#lessonCard:not([hidden])').waitFor();
  for(const lang of ['en','ta']){
   const button=page.locator(lang==='en'?'#langEn':'#langTa');
   if(await button.getAttribute('aria-pressed')!=='true')await button.click();
   await page.locator('#stepsList .katex').first().waitFor({state:'visible'});
   await page.evaluate(()=>document.fonts.ready);
   const q=await page.locator('#questionText').evaluate(node=>{const copy=node.cloneNode(true);for(const el of copy.querySelectorAll('[data-math-fallback]'))el.replaceWith(document.createTextNode(el.getAttribute('data-math-fallback')));return copy.textContent;});
   assert.equal(norm(q),norm(f.textbookPrompt[lang]),f.id+' '+lang+' source prompt');
   const state=await page.evaluate(()=>({width:innerWidth,doc:document.documentElement.scrollWidth,errors:document.querySelectorAll('#lessonCard .katex-error,#lessonCard [data-math-error]').length,steps:document.querySelectorAll('#stepsList .katex').length,answer:!!document.querySelector('#answerText .katex')}));
   assert.ok(state.doc<=state.width+1,f.id+' '+lang+' overflow');
   assert.equal(state.errors,0);assert.ok(state.steps>=3);assert.ok(state.answer);
   if(lang==='ta')assert.match(await page.locator('#stepsList').innerText(),/[\u0B80-\u0BFF]/);
  }
 }
 assert.deepEqual(errors,[]);await context.close();
}
console.log('PASS 48 Exercise 7.4 bilingual mobile views');
}finally{if(browser)await browser.close();await app.close();}})().catch(e=>{console.error(e);process.exitCode=1;});
