'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs/promises');
const {chromium,webkit}=require('playwright');
const {server,launchOptions}=require('./dashboard_test_support.cjs');
const batch=require('../../docs/curriculum/grade-12/batches/g12-ch1-ex1-1.json');
const migrated=[
 ...batch.records.slice(6),
 ...require('../../docs/curriculum/grade-12/batches/g12-ch1-ex1-2.json').records,
 ...require('../../docs/curriculum/grade-12/batches/g12-ch1-ex1-3.json').records
];
assert.equal(migrated.length,32);
const widths=[320,360,390,412,1280];
async function geometry(page){
 const metrics=await page.evaluate(()=>{
  const formulas=[...document.querySelectorAll('#lessonCard .triggle-tex')];
  return {width:innerWidth,pageWidth:document.documentElement.scrollWidth,
   formulas:formulas.map(el=>{const glyphs=el.querySelector('.katex-html').getBoundingClientRect(),box=el.getBoundingClientRect();return {height:el.clientHeight,glyphHeight:glyphs.height,boxHeight:box.height,width:el.clientWidth,scroll:el.scrollWidth,tab:el.tabIndex};})};
 });
 assert.ok(metrics.pageWidth<=metrics.width+1,'Page overflow at '+metrics.width);
 for(const m of metrics.formulas){
  assert.ok(m.height+1>=m.glyphHeight,'Formula vertically clipped');
  if(m.scroll>m.width+1)assert.equal(m.tab,0,'Scrollable formula is keyboard reachable');
 }
}
async function run(engine,name,base){
 const browser=await engine.launch(name==='chromium'?launchOptions():{headless:true,...(process.env.WEBKIT_PATH?{executablePath:process.env.WEBKIT_PATH}:{})});
 try{
  for(const width of widths){
   const ctx=await browser.newContext({viewport:{width,height:844},deviceScaleFactor:3,serviceWorkers:'block'}),page=await ctx.newPage(),errors=[],missing=[];
   await page.addInitScript(()=>{if(!localStorage.getItem('triggle.learned.v119'))localStorage.setItem('triggle.learned.v119',JSON.stringify(['g12-ch1-ex1.1-q2-iii']));});
   page.on('pageerror',e=>errors.push(e.message));page.on('response',r=>{if(r.status()>=400)missing.push(r.url());});
   await page.goto(base+'/index.html?class=12&question='+batch.records[0].id);
   await page.evaluate(()=>document.fonts.ready);
   for(let i=0;i<6;i++){
    const r=batch.records[i];
    assert.equal(new URL(page.url()).searchParams.get('question'),r.id);
    assert.equal(await page.locator('.math-fallback').count(),0,'No failed mathematics');
    assert.ok(await page.locator('#stepsList msub').count()>0,'True subscripts');
    assert.ok(await page.locator('#stepsList msup').count()>0,'True superscripts');
    assert.ok(await page.locator('#stepsList mtable').count()>0,'Structured matrices');
    if(i>=2)assert.ok(await page.locator('#stepsList mfrac').count()>0,'Stacked fractions');
    const final=await page.locator('.final-answer-step .triggle-tex').getAttribute('data-math-fallback');
    assert.equal(final,r.answer);
    const expected=i===0||i===3?2:3;
    const table=page.locator('#questionText mtable').first();
    assert.equal(await table.locator('mtr').count(),expected);
    assert.equal(await table.locator('mtd').count(),expected*expected);
    if(i===0){
     assert.deepEqual(await table.locator('mtd').allTextContents(),['−3','4','6','2']);
     assert.deepEqual(await page.locator('.final-answer-step mtd').allTextContents(),['2','−4','−6','−3']);
     assert.equal(await page.locator('#stepsList .worked-step').count(),12,'Full derivation and final answer');
     assert.ok(await page.locator('#stepsList .step-reason .katex').count()>0,'Inline symbol definitions');
     assert.equal(await page.locator('#deepBtn').isVisible().catch(()=>false),false,'No extra detailed tab for easy question');
     if(name==='chromium'&&width===390){await fs.mkdir('screenshots',{recursive:true});await page.screenshot({path:'screenshots/g12-adjoint-after-390.png',fullPage:true,scale:'css'});}
    }
    await geometry(page);
    if(i<5)await page.locator('#next').click();
   }
   // Verify saved progress on a direct reload before testing browser history.
   // WPE 26's Back→reload also crashes on static grades.html with pushState.
   await page.reload();assert.equal(await page.locator('#markDone').getAttribute('aria-pressed'),'true');
   await page.locator('#previous').click();assert.equal(new URL(page.url()).searchParams.get('question'),batch.records[4].id);
   await page.goBack();assert.equal(new URL(page.url()).searchParams.get('question'),batch.records[5].id);
   await page.waitForFunction(()=>document.querySelector('#questionHead').textContent.includes('Q2(iii)'));
   await page.waitForLoadState('networkidle');
   await page.locator('#langTa').click();assert.match(await page.locator('#questionHead').innerText(),/English.*pending/i);
   assert.ok(await page.locator('#stepsList .katex').count()>0);await geometry(page);
   await page.locator('#langEn').click();
   // Exercise shared APIs in a real browser, including malformed markup and Tamil prose.
   await page.evaluate(()=>{
    const host=document.createElement('div');host.id='math-fixture';host.style.cssText='width:180px;max-width:100%';
    host.innerHTML=window.TriggleNotation.render(['தமிழ் / English ',{latex:'\\frac{a+b}{c+d}',fallback:'a plus b over c plus d'},
     {latex:'\\begin{aligned}x&=1+2\\\\&=3\\end{aligned}',fallback:'x = 1 + 2 = 3',display:true},
     {latex:'\\frac{1}{',fallback:'Expression unavailable <safe>'},
     {latex:'x_1+x_2+x_3+x_4+x_5+x_6+x_7+x_8+x_9+x_{10}=55',fallback:'Sum of first ten terms is 55',display:true}]);
    document.querySelector('#lessonCard').append(host);window.TriggleNotation.prepare(host);
   });
   assert.match(await page.locator('#math-fixture').textContent(),/தமிழ் \/ English/);
   assert.equal(await page.locator('#math-fixture .math-fallback').textContent(),'Expression unavailable <safe>');
   assert.equal(await page.locator('#math-fixture .triggle-tex[tabindex="0"]').count(),1);
   const scrolling=page.locator('#math-fixture .triggle-tex[tabindex="0"]');await scrolling.focus();await page.keyboard.press('End');
   await geometry(page);
   // Exhaustive Chromium review of every remaining question at 390px and
   // representative cases at 320/1280px. WebKit retains the original six-
   // question matrix, language, history, offline and multi-width regression
   // without revisiting dozens of expensive 3x pixel-ratio pages per context.
   if(name==='chromium'&&(width===390||width===320||width===1280)){
    const sample=width===390?migrated:[
     migrated[0],migrated[3],migrated[8],migrated[12],
     migrated[14],migrated[23],migrated[25],migrated[31]
    ];
    for(const question of sample){
     await page.goto(base+'/index.html?class=12&question='+encodeURIComponent(question.id));
     assert.equal(new URL(page.url()).searchParams.get('question'),question.id);
     assert.equal(await page.locator('.math-fallback').count(),0,'No KaTeX fallback: '+question.id);
     assert.ok(await page.locator('#stepsList .katex').count()>0,'Structured worked equations: '+question.id);
     assert.ok(await page.locator('#stepsList mtable').count()>0,'Semantic matrices in steps: '+question.id);
     if(question.q.en.includes('[['))assert.ok(await page.locator('#questionText mtable').count()>0,'Textbook question matrix: '+question.id);
     await geometry(page);
    }
   }
   assert.deepEqual(errors,[]);assert.deepEqual(missing,[]);await ctx.close();
   console.log('PASS '+name+' mathematical reader at '+width+'px');
  }
  // Fresh-context WebKit smoke test for each migrated exercise family. Use
  // deviceScaleFactor 1 to avoid unrelated 3x raster-memory stress from the
  // extensive original six-question regression.
  if(name==='webkit'){
   for(const question of [migrated[0],migrated[15],migrated[27]]){
    const clean=await browser.newContext({viewport:{width:390,height:844},deviceScaleFactor:1,serviceWorkers:'block'});
    try{
     const sample=await clean.newPage();
     await sample.goto(base+'/index.html?class=12&question='+encodeURIComponent(question.id),{waitUntil:'domcontentloaded'});
     await sample.locator('#stepsList .katex').first().waitFor();
     assert.equal(await sample.locator('.math-fallback').count(),0,'Fresh WebKit KaTeX: '+question.id);
     assert.ok(await sample.locator('#stepsList mtable').count()>0,'Fresh WebKit matrices: '+question.id);
     await geometry(sample);
    }finally{await clean.close();}
   }
   console.log('PASS webkit: isolated Exercise 1.1, 1.2 and 1.3 rich math routes at 390px.');
  }
  // Cold cache includes *every* KaTeX font, even those absent from the first lesson.
  const offlineApp=await server();
  const ctx=await browser.newContext({viewport:{width:390,height:844},serviceWorkers:'allow'}),page=await ctx.newPage();
  await page.goto(offlineApp.base+'/index.html?class=12&question='+batch.records[0].id);
  await page.evaluate(()=>Promise.race([
   (async()=>{await navigator.serviceWorker.ready;if(!navigator.serviceWorker.controller)await new Promise(r=>navigator.serviceWorker.addEventListener('controllerchange',r,{once:true}));})(),
   new Promise((_,reject)=>setTimeout(()=>reject(Error('Offline cache did not become ready')),30000))
  ]));
  const cached=await page.evaluate(async()=>{const cache=await caches.open((await caches.keys()).find(k=>k.startsWith('triggle-shell')));const keys=await cache.keys();return keys.filter(k=>k.url.includes('/vendor/katex/')).length;});
  assert.equal(cached,23,'20 WOFF2 fonts plus script, stylesheet and license cached');
  // Stop the actual origin: every HTTP request now fails, including requests
  // made inside the service worker (which browser route mocks cannot intercept).
  await offlineApp.close();
  if(name==='chromium')await ctx.setOffline(true);
  await page.reload();await page.evaluate(()=>document.fonts.ready);
  assert.ok(await page.locator('#stepsList .katex msub').count()>0);
  assert.equal(await page.locator('.math-fallback').count(),0);
  await page.locator('#next').click();await page.locator('#next').click();
  assert.ok(await page.locator('#stepsList .katex mfrac').count()>0);
  assert.equal(await page.locator('.math-fallback').count(),0);await geometry(page);
  if(name==='chromium')for(const question of [migrated[15],migrated[27]]){
   await page.goto(offlineApp.base+'/index.html?class=12&question='+encodeURIComponent(question.id));
   assert.equal(new URL(page.url()).searchParams.get('question'),question.id);
   assert.equal(await page.locator('.math-fallback').count(),0,'Offline notation: '+question.id);
   assert.ok(await page.locator('#stepsList mtable').count()>0,'Offline matrices: '+question.id);
   await geometry(page);
  }
  await ctx.close();
 }finally{await browser.close();}
 console.log('PASS '+name+': six migrated questions, 320/360/390/412/1280px, 3× density, semantic math, safe fallback, scrolling, language, history, saved progress, offline fonts/rendering.');
}
(async()=>{const app=await server();try{for(const [name,engine] of Object.entries({chromium,webkit}))await run(engine,name,app.base);}finally{await app.close();}})().catch(e=>{console.error(e);process.exitCode=1;});
