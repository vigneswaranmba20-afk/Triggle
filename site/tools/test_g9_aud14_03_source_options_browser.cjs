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
     await page.goto(app.base+'/index.html?class=9&question='+id,{waitUntil:'load'});
     await page.locator(lang==='ta'?'#langTa':'#langEn').click();
     // KaTeX's accessible MathML separates function names and operands into
     // adjacent nodes (e.g. "cosec" + "C").  Whitespace in textContent is
     // not a stable rendering contract; preserve exact semantic identities.
     try{
      await page.waitForFunction(({requested,language})=>{
       const question=document.querySelector('#questionText');
       if(!question||document.documentElement.lang!==language)return false;
       const text=question.textContent||'',compact=text.replace(/\s+/g,'');
       if(requested.endsWith('6-1-q2'))
        return ['sinB','secB','cotB','cosC','tanC','cosecC'].every(r=>compact.includes(r));
       return question.querySelectorAll('.g9-question-option').length===4
        &&[1,2,3,4].every(n=>text.includes('('+n+')'));
      },{requested:id,language:lang},{timeout:13000});
     }catch(error){
      const snapshot=await page.locator('#questionText').innerText().catch(()=>'<question unavailable>');
      throw Error('AUD14-03 browser render '+id+' '+lang+' @'+width+': '+error.message+'; visible='+JSON.stringify(snapshot.slice(0,380)));
     }
     const data=await page.evaluate(()=>({
      visible:!!(document.querySelector('#questionText')?.getBoundingClientRect().height),
      text:document.querySelector('#questionText')?.textContent||'',
      scrollWidth:document.documentElement.scrollWidth,
      viewport:window.innerWidth
     }));
     assert(data.visible,'Readable question panel '+id+' '+lang+' @'+width);
     assert(data.scrollWidth<=data.viewport+3,'Horizontal overflow '+id+' '+lang+' @'+width);
     if(id==='c9-exercise-6-1-q2'){
      const compact=data.text.replace(/\s+/g,'');
      for(const text of ['sinB','secB','cotB','cosC','tanC','cosecC'])
       assert(compact.includes(text),'Missing rendered source ratio '+text+' '+lang);
     }else{
      assert.equal(await page.locator('#questionText .g9-question-option').count(),4,'Four visible choice groups '+id+' '+lang);
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
