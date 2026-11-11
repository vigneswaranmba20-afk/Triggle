'use strict';
const assert=require('node:assert/strict');
const {chromium,webkit}=require('playwright');
const {server,launchOptions}=require('./dashboard_test_support.cjs');
const widths=[320,360,390,412,1280];
const selector='#tabGuided,#guidedDialog,#solutionModeRow,#g12ModeChooser,[role="tablist"],[role="tabpanel"],[data-mode="exam"],[data-mode="detailed"],[data-mode="fun"]';
async function geometry(page){
 await page.evaluate(()=>document.fonts.ready);
 const size=await page.evaluate(()=>({w:innerWidth,scroll:document.documentElement.scrollWidth,badge:document.querySelector('#difficultyIndicator').getBoundingClientRect().height}));
 assert.ok(size.scroll<=size.w+1,JSON.stringify(size));assert.ok(size.badge<=30,'Compact difficulty marker');
}
async function verify(browser,name,base){
 const ctx=await browser.newContext({viewport:{width:390,height:844},serviceWorkers:'block'}),page=await ctx.newPage();
 const errors=[],missing=[];page.on('console',m=>{if(m.text().startsWith('AuditProgress '))console.log(name+' '+m.text());});page.on('pageerror',e=>errors.push(e.message));page.on('response',r=>{if(r.status()>=400)missing.push(r.url());});
 try{
  await page.goto(base+'/index.html?class=12&question=g12-ch1-ex1.1-q8');
  for(const width of widths){
   await page.setViewportSize({width,height:844});
   for(const lang of ['en','ta']){
    await page.locator(lang==='ta'?'#langTa':'#langEn').click();
    assert.equal(await page.locator(selector).count(),0);
    assert.match(await page.locator('#difficultyIndicator').innerText(),/🔴 Difficult/);
    assert.equal(await page.locator('#solutionReview').isVisible(),true);
    assert.equal(await page.locator('#stepsList .worked-step:not(.final-answer-step):visible').count(),4);
    assert.ok(await page.locator('#stepsList mtable').count()>0);
    assert.equal(await page.locator('#lessonCard .math-fallback').count(),0);
    await geometry(page);
   }
  }
  console.log('PASS '+name+' five responsive widths and both interfaces');
  // Enumerate every authored question in the actual reader, both interfaces.
  // The same popstate route handles real browser Back/Forward navigation.
  for(const lang of ['en','ta']){
   await page.locator(lang==='ta'?'#langTa':'#langEn').click();
   for(const grade of [9,10,11,12]){
    const result=await page.evaluate(async({grade,selector,paceHistory})=>{
     const failures=[];let count=0;
     for(const item of window.TRIGGLE_CLASSES[grade].items){
      // WebKit throttles History API calls to 100 per ten seconds.
      // Pace exhaustive synthetic navigation; keep real keyboard/Back checks below.
      if(paceHistory)await new Promise(resolve=>setTimeout(resolve,125));
      history.replaceState(null,'','?class='+grade+'&question='+encodeURIComponent(item.id));dispatchEvent(new PopStateEvent('popstate'));
      const fail=msg=>failures.push(item.id+': '+msg),root=document.querySelector('#lessonCard');
      if(root.hidden)fail('Question inaccessible');
      if(root.querySelectorAll(selector).length||document.querySelector('#guidedDialog'))fail('Explanation control remains');
      const meta=window.TriggleDifficulty.get(item),badge=document.querySelector('#difficultyIndicator');
      if(badge.hidden||badge.dataset.level!==meta.level)fail('Difficulty mismatch');
      const special=!!window.TriggleWorkedDisplay.get(item,document.documentElement.lang);
      if(!special){
       const steps=[...document.querySelectorAll('#stepsList .worked-step:not(.final-answer-step)')];
       if(steps.length!==item.steps.length||steps.some(s=>s.hidden))fail('Omitted working');
       item.steps.forEach((s,i)=>{
        const reason=s[document.documentElement.lang]||s.en;
        if(!s.reasonMath&&steps[i]?.querySelector('.step-reason')?.textContent!==reason)fail('Changed reasoning');
       });
       const final=document.querySelector('#stepsList .final-answer-value');
       if(!final||final.innerHTML!==document.querySelector('#answerText').innerHTML)fail('Omitted or changed final answer');
      }else if(document.querySelectorAll('#stepsList .twd-question-answer-pair').length!==4)fail('Missing subquestion working');
      if(!document.querySelector('#questionText').textContent.trim())fail('Empty question');
      count++;if(paceHistory&&count%50===0)console.log('AuditProgress grade '+grade+' question '+count);
     }
     return {count,failures};
    },{grade,selector,paceHistory:name==='WebKit'});
    assert.deepEqual(result.failures,[],name+' grade '+grade+' '+lang);
    console.log('PASS '+name+' '+lang+' all '+result.count+' grade '+grade+' questions, working, final answers and difficulty');
   }
  }
  // Keyboard navigation and real Previous/Next retain the original question order.
  await page.goto(base+'/index.html?class=12&question=g12-ch1-ex1.1-q8');
  const original=page.url();await page.locator('#next').focus();await page.keyboard.press('Enter');
  assert.notEqual(page.url(),original);await page.locator('#previous').click();assert.equal(page.url(),original);
  await page.locator('#next').click();await page.goBack();assert.equal(page.url(),original);
  assert.deepEqual(errors,[]);assert.deepEqual(missing,[]);
  console.log('PASS '+name+' all five requested widths, both interfaces, keyboard, Previous/Next and browser Back');
 }finally{await ctx.close();}
}
async function offline(browser){
 const app=await server(),ctx=await browser.newContext({viewport:{width:390,height:844},serviceWorkers:'allow'}),page=await ctx.newPage();
 try{
  await page.goto(app.base+'/index.html?class=12&question=g12-ch1-ex1.1-q8');
  await page.evaluate(async()=>{
   localStorage.setItem('triggle.deep.positions.v123',JSON.stringify({'g12-ch1-ex1.1-q8':3}));
   await navigator.serviceWorker.ready;
   if(!navigator.serviceWorker.controller)await new Promise(r=>navigator.serviceWorker.addEventListener('controllerchange',r,{once:true}));
  });
  await page.locator('#markDone').evaluate(el=>el.click());
  const stored=await page.evaluate(()=>({...localStorage}));
  await ctx.setOffline(true);await page.reload();
  assert.equal(await page.locator(selector).count(),0);
  assert.match(await page.locator('#difficultyIndicator').innerText(),/Difficult/);
  assert.equal(await page.locator('#markDone').getAttribute('aria-pressed'),'true');
  assert.ok(await page.locator('#stepsList mtable').count()>0);
  const after=await page.evaluate(()=>({...localStorage}));
  for(const [key,value]of Object.entries(stored))assert.equal(after[key],value,'Preserve saved '+key);
  await page.locator('#langTa').click();assert.equal(await page.locator('html').getAttribute('lang'),'ta');
  await page.goto(app.base+'/matrix-pilot.html?mode=fun');
  await page.waitForURL('**/index.html?class=12&question=g12-ch1-ex1.1-q8');
  assert.equal(await page.locator(selector).count(),0);
  console.log('PASS offline canonical Q8, metadata, MathML, Tamil, old prototype bookmarks and saved progress');
 }finally{await ctx.close();await app.close();}
}
(async()=>{const app=await server();try{
 const chrome=await chromium.launch(launchOptions());try{await verify(chrome,'Chromium',app.base);await offline(chrome);}finally{await chrome.close();}
 const wk=await webkit.launch({headless:true,...(process.env.WEBKIT_PATH?{executablePath:process.env.WEBKIT_PATH}:{})});try{await verify(wk,'WebKit',app.base);}finally{await wk.close();}
}finally{await app.close();}})().catch(e=>{console.error(e);process.exitCode=1;});
