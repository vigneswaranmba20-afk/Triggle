'use strict';
const assert=require('node:assert/strict');
const {chromium,webkit}=require('playwright');
const {server,launchOptions}=require('./dashboard_test_support.cjs');
const examples=[
 'g12-ch1-ex1.1-q8',
 'g12-ch1-ex1.2-q2-ii',
 'g12-ch1-ex1.3-q4',
 'c12-4-4-4-13'
];
const easy='g12-ch1-ex1.1-q1-i';
async function geometry(page,width){
 const dims=await page.evaluate(()=>({viewport:innerWidth,document:document.documentElement.scrollWidth}));
 assert.ok(dims.document<=dims.viewport+1,
  'No page horizontal overflow at '+width+'px: '+JSON.stringify(dims));
}
async function verify(browser,name,base,width,all){
 const context=await browser.newContext({viewport:{width,height:850},deviceScaleFactor:1,serviceWorkers:'block'});
 const page=await context.newPage(),errors=[],missing=[];
 page.on('pageerror',e=>errors.push(e.message));
 page.on('response',r=>{if(r.status()>=400)missing.push(r.url());});
 try{
  const targets=all?examples:examples.slice(0,1);
  for(const id of targets){
   await page.goto(base+'/index.html?class=12&question='+encodeURIComponent(id));
   await page.locator('#g12-tab-exam').waitFor({state:'visible'});
   assert.equal(await page.locator('#g12ModeChooser').isVisible(),true);
   assert.equal(await page.locator('#g12-tab-exam').getAttribute('aria-selected'),'true');
   assert.ok(await page.locator('#stepsList .worked-step').count()>=2);
   const expected=await page.locator('#stepsList .final-answer-value').innerHTML();
   const n=await page.locator('#stepsList .worked-step:not(.final-answer-step)').count();
   assert.ok(n>=2,'Canonical steps present');
   await page.locator('#g12-tab-detailed').click();
   assert.equal(await page.locator('#quickSteps').isVisible(),false);
   assert.equal(await page.locator('#g12-detailed-panel').isVisible(),true);
   assert.equal(await page.locator('#g12-detailed-panel .worked-step:visible').count(),1);
   await page.locator('#g12-detailed-panel .g12-primary').click();
   assert.equal(await page.locator('#g12-detailed-panel .worked-step:visible').count(),2);
   await page.locator('#g12-detailed-panel .g12-secondary').first().click();
   assert.equal(await page.locator('#g12-detailed-panel .worked-step:visible').count(),n);
   assert.equal(await page.locator('#g12-detailed-panel .g12-exp-answer').innerHTML(),expected);
   assert.ok(await page.locator('#g12-detailed-panel .g12-check').isVisible());
   await page.locator('#g12-detailed-panel input[type="radio"][value="0"]').first().check();
   await page.locator('#g12-detailed-panel .g12-check button').click();
   assert.match(await page.locator('#g12-detailed-panel .g12-check-feedback').textContent(),/✅ Yes/);
   assert.equal(await page.locator('#g12-tab-fun, #g12-fun-panel').count(),0,'Fun Mode is removed');
   assert.equal(await page.locator('.g12-mode-tab').count(),2,'Only Exam and Detailed remain');
   await page.locator('#g12-tab-detailed').focus();
   await page.keyboard.press('ArrowRight');
   assert.equal(await page.locator('#g12-tab-exam').getAttribute('aria-selected'),'true');
   assert.equal(await page.locator('#quickSteps').isVisible(),true);
   await page.keyboard.press('ArrowLeft');
   assert.equal(await page.locator('#g12-tab-detailed').getAttribute('aria-selected'),'true');
   assert.equal(await page.locator('#lessonCard .math-fallback').count(),0,'No failed notation: '+id);
   await geometry(page,width);
  }
  await page.goto(base+'/index.html?class=12&question='+encodeURIComponent(easy));
  assert.equal(await page.locator('#g12ModeChooser').isVisible(),false,'Easy questions remain simple');
  await page.goto(base+'/index.html?class=10&question=c10-1-1-1-1');
  assert.equal(await page.locator('#g12ModeChooser').isVisible(),false,'Other grades unaffected');
  assert.deepEqual(errors,[],'No script exceptions');
  assert.deepEqual(missing,[],'No broken asset requests');
  console.log('PASS G12 depth modes '+name+' '+width+'px: canonical final, progressive steps, checks, no overflow');
 }finally{await context.close();}
}
(async()=>{
 const app=await server();
 try{
  const chrome=await chromium.launch(launchOptions());
  try{
   for(const w of [320,390,1280])await verify(chrome,'chromium',app.base,w,w===390);
   const offline=await server();
   const ctx=await chrome.newContext({viewport:{width:390,height:844},serviceWorkers:'allow'});
   const page=await ctx.newPage();
   try{
    await page.goto(offline.base+'/index.html?class=12&question=g12-ch1-ex1.1-q8');
    await page.evaluate(()=>Promise.race([
      (async()=>{await navigator.serviceWorker.ready;if(!navigator.serviceWorker.controller)
       await new Promise(resolve=>navigator.serviceWorker.addEventListener('controllerchange',resolve,{once:true}));})(),
      new Promise((_,reject)=>setTimeout(()=>reject(Error('Service worker not ready')),30000))
    ]));
    await offline.close();await ctx.setOffline(true);
    await page.reload();
    assert.equal(await page.locator('#g12-tab-fun, #g12-fun-panel').count(),0);
    await page.locator('#g12-tab-detailed').click();
    assert.equal(await page.locator('#g12-detailed-panel .worked-step:visible').count(),1);
    await page.locator('#g12-detailed-panel .g12-secondary').first().click();
    assert.ok(await page.locator('#g12-detailed-panel mtable').count()>0);
    assert.equal(await page.locator('.math-fallback').count(),0);
    console.log('PASS G12 depth modes offline Chromium at 390px');
   }finally{await ctx.close();}
  }finally{await chrome.close();}
  const wk=await webkit.launch({headless:true,...(process.env.WEBKIT_PATH?{executablePath:process.env.WEBKIT_PATH}:{})});
  try{await verify(wk,'webkit',app.base,390,false);}
  finally{await wk.close();}
 }finally{await app.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
