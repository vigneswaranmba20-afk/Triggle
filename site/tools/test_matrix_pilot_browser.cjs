'use strict';
const assert=require('node:assert/strict');
const {chromium,webkit}=require('playwright');
const {server,launchOptions}=require('./dashboard_test_support.cjs');
async function smoke(browser,base,name,width){
 const ctx=await browser.newContext({viewport:{width,height:820},deviceScaleFactor:1,serviceWorkers:'block'});
 const page=await ctx.newPage(),errors=[],missing=[];
 page.on('pageerror',e=>errors.push(e.message));
 page.on('response',r=>{if(r.status()>=400)missing.push(r.url());});
 try{
  await page.goto(base+'/matrix-pilot.html',{waitUntil:'load'});
  assert.equal(await page.locator('#panel-learn').isVisible(),true);
  assert.equal(await page.locator('#tab-fun, #panel-fun').count(),0,'Pilot Fun Mode removed');
  assert.equal(await page.locator('[role="tab"]').count(),2,'Two accessible tabs');
  assert.equal(await page.locator('.math-fallback').count(),0,'All authored mathematics should render');
  assert.ok(await page.locator('.equation mtable').count()>=1,'The original matrix needs semantic MathML');
  assert.equal(await page.locator('#panel-learn .teach-step:visible').count(),1);
  await page.locator('[data-next="learn"]').click();
  assert.equal(await page.locator('#panel-learn .teach-step:visible').count(),2);
  await page.locator('[data-show-all="learn"]').click();
  assert.equal(await page.locator('#panel-learn .teach-step:visible').count(),6);
  await page.locator('#tab-exam').click();
  assert.equal(await page.locator('#panel-exam').isVisible(),true);
  assert.ok(await page.locator('#panel-exam .answer mtable').count()>0);
  await page.locator('#tab-exam').focus();
  await page.keyboard.press('ArrowLeft');
  assert.equal(await page.locator('#tab-learn').getAttribute('aria-selected'),'true');
  await page.keyboard.press('ArrowRight');
  assert.equal(await page.locator('#tab-exam').getAttribute('aria-selected'),'true');
  await page.locator('[name="sign"][value="correct"]').check();
  await page.locator('[data-check="sign"]').click();
  assert.match(await page.locator('[data-result="sign"]').textContent(),/Both signs/);
  await page.locator('[name="scope"][value="wrong1"]').check();
  await page.locator('[data-check="scope"]').click();
  assert.match(await page.locator('[data-result="scope"]').textContent(),/Try again/);
  await page.locator('[name="scope"][value="correct"]').check();
  await page.locator('[data-check="scope"]').click();
  assert.match(await page.locator('[data-result="scope"]').textContent(),/entire matrix/);
  await page.locator('[data-vote="Detailed"]').click();
  assert.equal(await page.locator('[data-vote="Detailed"]').getAttribute('aria-pressed'),'true');
  const metrics=await page.evaluate(()=>({width:innerWidth,pageWidth:document.documentElement.scrollWidth}));
  assert.ok(metrics.pageWidth<=metrics.width+1,'Phone should not scroll horizontally: '+JSON.stringify(metrics));
  assert.deepEqual(errors,[]);assert.deepEqual(missing,[]);
  console.log('PASS pilot '+name+' '+width+'px: tabs, progressive steps, semantic math, checks and no overflow');
 }finally{await ctx.close();}
}
(async()=>{
 const app=await server();
 try{
  const chromiumBrowser=await chromium.launch(launchOptions());
  try{
   for(const width of [320,390,1280])await smoke(chromiumBrowser,app.base,'chromium',width);
   const offline=await server();
   const ctx=await chromiumBrowser.newContext({viewport:{width:390,height:820},serviceWorkers:'allow'});
   const page=await ctx.newPage();
   try{
    await page.goto(offline.base+'/matrix-pilot.html');
    await page.evaluate(()=>Promise.race([
     (async()=>{await navigator.serviceWorker.ready;if(!navigator.serviceWorker.controller)await new Promise(r=>navigator.serviceWorker.addEventListener('controllerchange',r,{once:true}));})(),
     new Promise((_,reject)=>setTimeout(()=>reject(Error('Pilot offline cache was not activated')),20000))
    ]));
    await offline.close();
    await ctx.setOffline(true);
    await page.reload();
    assert.equal(await page.locator('.math-fallback').count(),0);
    await page.locator('#tab-exam').click();
    assert.ok(await page.locator('#panel-exam .answer mtable').count()>0);
    console.log('PASS pilot chromium offline reload');
   }finally{await ctx.close();}
  }finally{await chromiumBrowser.close();}
  const webkitBrowser=await webkit.launch({headless:true,...(process.env.WEBKIT_PATH?{executablePath:process.env.WEBKIT_PATH}:{})});
  try{await smoke(webkitBrowser,app.base,'webkit',390);}finally{await webkitBrowser.close();}
 }finally{await app.close();}
})().catch(err=>{console.error(err);process.exitCode=1;});
