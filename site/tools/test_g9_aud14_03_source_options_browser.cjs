'use strict';
/* AUD14-03: real mobile EN/TA question-label and options presentation at 320,
 * 390 and 430 CSS px. No autoplay, admin, network APIs or source mutation. */
const assert=require('node:assert/strict');
const {chromium}=require('playwright');
const {server,launchOptions}=require('./dashboard_test_support.cjs');
(async()=>{
 const app=await server(),browser=await chromium.launch(launchOptions());
 const ids=['c9-exercise-6-1-q2',...['q1','q2','q3','q4','q7','q8','q9','q10'].map(s=>'c9-exercise-6-5-'+s)];
 try{
  const context=await browser.newContext({viewport:{width:390,height:844},serviceWorkers:'block'});
  const page=await context.newPage(),errors=[];
  page.on('pageerror',e=>errors.push(e.message));
  for(const width of [320,390,430]){
   await page.setViewportSize({width,height:844});
   for(const lang of ['en','ta']){
    for(const id of ids){
     await page.goto(app.base+'/index.html?class=9&question='+id,{waitUntil:'domcontentloaded'});
     await page.locator(lang==='ta'?'#langTa':'#langEn').click();
     await page.waitForFunction((requested)=>{
      const text=document.querySelector('#questionText')?.textContent||'';
      return requested.endsWith('6-1-q2')?text.includes('cosec C'):text.includes('(1)')&&text.includes('(4)');
     },id,{timeout:13000});
     const data=await page.evaluate(()=>({
      visible:!!(document.querySelector('#questionText')?.getBoundingClientRect().height),
      text:document.querySelector('#questionText')?.textContent||'',
      scrollWidth:document.documentElement.scrollWidth,
      viewport:window.innerWidth
     }));
     assert(data.visible,'Readable question panel '+id+' '+lang+' @'+width);
     assert(data.scrollWidth<=data.viewport+3,'Horizontal overflow '+id+' '+lang+' @'+width);
     if(id==='c9-exercise-6-1-q2'){
      for(const text of ['sin B','sec B','cot B','cos C','tan C','cosec C'])
       assert(data.text.includes(text),'Missing exact source ratio '+text+' '+lang);
     }else{
      for(let n=1;n<=4;n++)assert(data.text.includes('('+n+')'),'Missing original MCQ choice '+n+' '+id+' '+lang);
      assert(data.text.includes('tan')||data.text.includes('cos')||data.text.includes('sin'),'Trigonometry source prompt visible '+id);
     }
    }
   }
  }
  assert.deepEqual(errors,[],'No browser page exceptions');
  console.log('PASS AUD14-03 browser: 54 Grade 9 EN/TA mobile question/option scenarios; no missing options, labelled ratios, runtime exception or global overflow.');
 }finally{await browser.close();await app.close();}
})().catch(e=>{console.error(e);process.exit(1)});
