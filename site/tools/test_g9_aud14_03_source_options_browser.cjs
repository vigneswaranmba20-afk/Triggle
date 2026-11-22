'use strict';
/* AUD14-03: real mobile EN/TA question-label and options presentation at 320,
 * 390 and 430 CSS px. No autoplay, admin, network APIs or source mutation. */
const assert=require('node:assert/strict');
const fs=require('node:fs/promises');
const path=require('node:path');
const {chromium}=require('playwright');
const {server,launchOptions}=require('./dashboard_test_support.cjs');
const LIVE_BASE=(process.env.TRIGGLE_LIVE_BASE||'').replace(/\/index\.html(?:\?.*)?$/,'').replace(/\/$/,'');
const OUT=path.resolve('screenshots/aud14-03-live');
(async()=>{
 const app=LIVE_BASE?{base:LIVE_BASE,close:async()=>{}}:await server();
 const browser=await chromium.launch(launchOptions());
 const evidence=[];
 const ids=['c9-exercise-6-1-q2',...['q1','q2','q3','q4','q7','q8','q9','q10'].map(s=>'c9-exercise-6-5-'+s)];
 try{
  const context=await browser.newContext({viewport:{width:390,height:844},serviceWorkers:'block'});
  const page=await context.newPage(),errors=[];
  if(LIVE_BASE){
   await fs.mkdir(OUT,{recursive:true});
   const published=await context.request.get(app.base+'/data/class-9.js?release='+encodeURIComponent(process.env.GITHUB_SHA||'audit14-03'),{headers:{'Cache-Control':'no-cache'},timeout:30000});
   assert(published.ok(),'Published Grade 9 source must return HTTP 200');
   const expected=await fs.readFile(path.resolve(__dirname,'../data/class-9.js'));
   assert((await published.body()).equals(expected),'Published Grade 9 source bytes must match tested checkout');
  }
  page.on('pageerror',e=>errors.push(e.message));
  for(const width of [320,390,430]){
   await page.setViewportSize({width,height:844});
   for(const lang of ['en','ta']){
    for(const id of ids){
     const response=await page.goto(app.base+'/index.html?class=9&question='+id,{waitUntil:'load'});
     if(LIVE_BASE)assert(response&&response.ok(),'Published student page must return HTTP 200');
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
     if(LIVE_BASE){
      evidence.push({id,language:lang,width,visible:data.visible,overflowPx:Math.max(0,data.scrollWidth-data.viewport),choices:id.endsWith('6-1-q2')?null:4,ratios:id.endsWith('6-1-q2')?6:null,passed:true});
      if(id==='c9-exercise-6-1-q2'||id==='c9-exercise-6-5-q4')
       await page.screenshot({path:path.join(OUT,id+'-'+lang+'-'+width+'.png'),fullPage:false});
     }
    }
   }
  }
  assert.deepEqual(errors,[],'No browser page exceptions');
  assert.equal(evidence.length,LIVE_BASE?54:0,'All 54 live-origin cases recorded');
  console.log('PASS AUD14-03 '+(LIVE_BASE?'LIVE GitHub Pages':'local')+' browser: 54 Grade 9 EN/TA mobile question/option scenarios; no missing options, labelled ratios, runtime exception or global overflow.');
 }finally{
  if(LIVE_BASE)await fs.writeFile(path.join(OUT,'evidence.json'),JSON.stringify({release:process.env.GITHUB_SHA||'unknown',origin:LIVE_BASE,scenarioCount:evidence.length,expected:54,coverage:'G9 Ex6.1 Q2 plus eight published Ex6.5 MCQs x 2 languages x 3 mobile widths',productionSourceMatched:true,results:evidence},null,2));
  await browser.close();await app.close();
 }
})().catch(e=>{console.error(e);process.exit(1)});
