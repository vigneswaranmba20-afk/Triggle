'use strict';
/*
 * Audit #346 premerge + production browser evidence:
 * seven 2025 English exercise parts, 2 interface languages, 3 phone widths.
 * Tamil prompt and explanations are checked on each visible card.
 */
const assert=require('node:assert/strict');
const fs=require('node:fs/promises'),path=require('node:path');
const {chromium}=require('playwright');
const {server,launchOptions}=require('./dashboard_test_support.cjs');
const LIVE=(process.env.TRIGGLE_LIVE_BASE||'').replace(/\/index\.html(?:\?.*)?$/,'').replace(/\/$/,'');
const OUT=path.resolve('screenshots/g9-ex64-q2q3');
const CASES=[
 ['q2-i','0.9975','85°57′ or 85°58′ or 85°59′'],
 ['q2-ii','0.6763','47°27′'],
 ['q2-iii','0.0720','4°7′'],
 ['q2-iv','0.0410','87°39′'],
 ['q2-v','7.5958','82°30′'],
 ['q3-i','65','1.9970'],
 ['q3-ii','70','2.8659']
];
(async()=>{
 const app=LIVE?{base:LIVE,close:async()=>{}}:await server();
 const browser=await chromium.launch(launchOptions());
 const evidence=[];let assetsMatch=null;
 await fs.mkdir(OUT,{recursive:true});
 try{
  const ctx=await browser.newContext({viewport:{width:390,height:844},serviceWorkers:'block',reducedMotion:'reduce'});
  if(LIVE){
   const assetPaths=['data/textbook-exercises/g9-ch6-ex6-4-q2-q3-en.js','data/g9-clear-math.js'];
   const match={};
   for(const file of assetPaths){
    const response=await ctx.request.get(app.base+'/'+file+'?sha='+encodeURIComponent(process.env.GITHUB_SHA||'audit346'),{
     headers:{'Cache-Control':'no-cache'},timeout:30000});
    assert(response.ok(),'Live student asset HTTP 200: '+file);
    const expected=await fs.readFile(path.resolve(__dirname,'..',file));
    match[file]=(await response.body()).equals(expected);
    assert(match[file],'Published asset must match exact tested Git source: '+file);
   }
   assetsMatch=match;
  }
  const page=await ctx.newPage(),errors=[];
  page.on('pageerror',e=>errors.push(String(e)));
  for(const width of [320,390,430]){
   await page.setViewportSize({width,height:844});
   for(const lang of ['en','ta']){
    for(const [part,sourceValue,answer] of CASES){
     const id='c9-exercise-6-4-'+part;
     const row={id,width,language:lang,passed:false};
     try{
      const response=await page.goto(app.base+'/index.html?class=9&question='+id,{waitUntil:'load',timeout:45000});
      assert(response&&response.ok(),'Lesson response HTTP 200');
      await page.locator(lang==='ta'?'#langTa':'#langEn').click({timeout:20000});
      await page.waitForFunction(({value,language})=>{
       const q=document.querySelector('#questionText'),a=document.querySelector('#stepsList .final-answer-step');
       return document.documentElement.lang===language&&q&&q.textContent.includes(value)&&a&&a.textContent.trim().length>0;
      },{value:sourceValue,language:lang},{timeout:20000});
      await page.evaluate(()=>document.fonts.ready);
      const state=await page.evaluate(()=>({
       language:document.documentElement.lang,
       title:document.querySelector('#questionHead')?.textContent||'',
       pendingBadge:document.querySelector('#kindBadge')?.textContent||'',
       question:document.querySelector('#questionText')?.textContent||'',
       answer:document.querySelector('#stepsList .final-answer-step')?.textContent||'',
       steps:document.querySelectorAll('#stepsList .worked-step').length,
       visible:!!document.querySelector('#questionText')?.getBoundingClientRect().height,
       mathErrors:document.querySelectorAll('[data-math-error]').length,
       overflowPx:document.documentElement.scrollWidth-window.innerWidth,
       finalVisible:!!document.querySelector('#stepsList .final-answer-step')?.getBoundingClientRect().height,
       answerBoxHidden:document.querySelector('#answerBox')?.hidden
      }));
      assert.equal(state.language,lang,'Language toggle');
      assert(state.question.includes(sourceValue),'Textbook source numeric prompt '+id);
      assert(state.title.includes(part.replace(/^q([23])-(.*)$/,lang==='ta'?'வினா $1($2)':'Q$1($2)')),'Displayed original question part '+id);
      // KaTeX may present minute primes as apostrophes. Check semantics, not Unicode glyph identity.
      if(part.startsWith('q3'))for(const fn of ['sin','cos','tan'])assert(state.question.includes(fn),'Three source trig terms '+fn+' '+id);
      assert(state.steps>=4,'Three mathematical explanations and final answer '+id);
      assert(state.visible&&state.finalVisible,'Question and final answer visibly rendered '+id);
      assert(state.answerBoxHidden,'No duplicate final-answer card');
      assert.equal(state.mathErrors,0,'All Grade 9 mathematical notation rendered');
      assert(state.overflowPx<=3,'No horizontal viewport overflow '+id+' '+lang+' '+width+' '+state.overflowPx);
      const compact=state.answer.replace(/\s+/g,'');
      if(part==='q2-i' && lang==='ta')assert(state.answer.includes('அல்லது'),'Three accepted angles joined in Tamil');
      const digits=part==='q2-i'?['85','57','58','59']:answer.match(/\d+/g)||[];
      for(const token of digits)assert(compact.includes(token),'Final answer token '+token+' for '+id);
      if(lang==='ta'){
       assert.match(state.question,/[\u0B80-\u0BFF]/u,'Tamil task is visible');
       assert((await page.locator('.step-reason').allInnerTexts()).every(text=>/[\u0B80-\u0BFF]/u.test(text)),'Tamil worked instructions');
      }
      if(part==='q3-ii')assert(!compact.includes('2.8665'),'Do not replace the prescribed table answer with calculator value');
      row.passed=true;
      row.steps=state.steps;row.overflowPx=state.overflowPx;row.mathErrors=state.mathErrors;
      if(part==='q2-i'||part==='q3-ii')await page.screenshot({path:path.join(OUT,part+'-'+lang+'-'+width+'.png'),fullPage:false});
     }catch(e){
      row.error=String(e.stack||e);
      await page.screenshot({path:path.join(OUT,part+'-'+lang+'-'+width+'-FAIL.png'),fullPage:false}).catch(()=>{});
      throw Error('G9 Ex6.4 '+id+' '+lang+' @'+width+': '+row.error);
     }finally{evidence.push(row);}
    }
   }
  }
  assert.deepEqual(errors,[],'No uncaught JS exceptions on tested pages');
  assert.equal(evidence.length,42,'Exactly seven parts x two locales x three viewports');
  console.log('PASS '+(LIVE?'LIVE':'LOCAL')+' G9 Ex6.4 42/42 EN/TA mobile browser states; all seven questions, final answers, structured math and no horizontal overflow.');
 }finally{
  await fs.writeFile(path.join(OUT,'evidence.json'),JSON.stringify({origin:app.base,mode:LIVE?'live':'local',sourceCommit:process.env.GITHUB_SHA||'unknown',expected:42,passed:evidence.filter(r=>r.passed).length,assetsMatch,tamilEditorial:'pending',results:evidence},null,2));
  await browser.close();await app.close();
 }
})().catch(e=>{console.error(e);process.exitCode=1;});
