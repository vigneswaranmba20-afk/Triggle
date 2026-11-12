'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs/promises');
const {chromium}=require('playwright'),{server,launchOptions}=require('./dashboard_test_support.cjs');
const {load}=require('./build_g9_math.cjs');
const samples=['g9-ch2-ex2-q4-iv','g9-ch2-ex5-q3-iv','g9-ch2-ex6-q4-i','g9-ch2-ex7-q2-i','g9-ch2-ex7-q4','g9-ch2-ex8-q3-iii','g9-ch3-ex3.1-q10','g9-ch3-ex3.1-q11','g9-ch3-ex3.1-q12','g9-ch3-ex3.2-q4'];
async function geometry(page,id){
 const state=await page.evaluate(()=>({viewport:innerWidth,width:document.documentElement.scrollWidth,
  formulas:[...document.querySelectorAll('#lessonCard .triggle-tex')].map(el=>({height:el.clientHeight,glyphHeight:el.querySelector('.katex-html').getBoundingClientRect().height,width:el.clientWidth,scroll:el.scrollWidth,tab:el.tabIndex}))}));
 assert(state.width<=state.viewport+1,'Page overflow: '+id+' '+JSON.stringify(state));
 for(const f of state.formulas){assert(f.height+1>=f.glyphHeight,'Clipped radical/power: '+id);if(f.scroll>f.width+1)assert.equal(f.tab,0,'Keyboard accessible equation scroll: '+id);}
}
(async()=>{
 const app=await server(),browser=await chromium.launch(launchOptions());
 try{
  const context=await browser.newContext({viewport:{width:390,height:844},serviceWorkers:'block'}),page=await context.newPage(),errors=[];
  await context.addInitScript(()=>{if(!localStorage.getItem('triggle.learned.v119'))localStorage.setItem('triggle.learned.v119',JSON.stringify(['g9-ch2-ex7-q1-i']));});
  page.on('pageerror',e=>errors.push(e.message));
  for(const width of [320,390,1280]){
   await page.setViewportSize({width,height:844});
   const items=width===390?load():load().filter(q=>samples.includes(q.id));
   for(const q of items){
    await page.goto(app.base+'/index.html?class=9&question='+encodeURIComponent(q.id));
    await page.evaluate(()=>document.fonts.ready);
    assert.equal(await page.locator('[data-math-error]').count(),0,q.id+' valid math');
    assert.equal(await page.locator('#stepsList .worked-step').count(),q.steps.length+1,q.id+' full standard solution');
    assert(await page.locator('#lessonCard .katex').count()>0,q.id+' uses typeset notation');
    if(q.id==='g9-ch3-ex3.2-q4'){
     assert.equal(await page.locator('#questionText .katex').count(),4,'All four polynomial equations render');
     assert.equal(await page.locator('.final-answer-step mfrac').count(),3,'All fractional roots retain numerator/denominator structure');
    }
    await geometry(page,q.id);
    if(width===390||samples.includes(q.id)){
     await page.locator('#langTa').click();assert.equal(await page.locator('[data-math-error]').count(),0,q.id+' Tamil math');await geometry(page,q.id+' Tamil');await page.locator('#langEn').click();
    }
   }
   if(width===390){await page.goto(app.base+'/index.html?class=9&question=g9-ch2-ex7-q2-i');await fs.mkdir('screenshots',{recursive:true});await page.screenshot({path:'screenshots/g9-clear-math-390.png',fullPage:true});}
   console.log('PASS Grade 9 notation '+width+'px: '+items.length+' questions in English/Tamil');
  }
  await page.goto(app.base+'/index.html?class=9&question=g9-ch2-ex7-q1-i');
  await page.locator('#next').click();assert.equal(new URL(page.url()).searchParams.get('question'),'g9-ch2-ex7-q1-ii');
  await page.locator('#previous').click();assert.equal(new URL(page.url()).searchParams.get('question'),'g9-ch2-ex7-q1-i');
  await page.reload();assert.equal(await page.locator('#markDone').getAttribute('aria-pressed'),'true','Existing saved progress survives reload');
  await page.goto(app.base+'/index.html?class=9&question=g9-ch2-ex3-q1-i');
  await page.locator('#figureBtn').click();assert(await page.locator('#figureDialog').isVisible(),'Existing question figure remains available');await page.keyboard.press('Escape');
  assert.deepEqual(errors,[]);await context.close();
  const offline=await browser.newContext({viewport:{width:390,height:844},serviceWorkers:'allow'}),cached=await offline.newPage();
  await cached.goto(app.base+'/index.html?class=9&question=g9-ch2-ex7-q2-i');
  await cached.evaluate(async()=>{await navigator.serviceWorker.ready;if(!navigator.serviceWorker.controller)await new Promise(r=>navigator.serviceWorker.addEventListener('controllerchange',r,{once:true}));});
  await offline.setOffline(true);await cached.reload();assert(await cached.locator('#stepsList mfrac').count()>0,'Offline stacked fractions');
  await cached.goto(app.base+'/index.html?class=9&question=g9-ch3-ex3.2-q4');assert(await cached.locator('#stepsList .katex').count()>0,'Offline Algebra');assert.equal(await cached.locator('[data-math-error]').count(),0);
  await offline.close();console.log('PASS Grade 9 navigation, saved progress, figure, offline Real Numbers/Algebra and no browser errors');
 }finally{await browser.close();await app.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
