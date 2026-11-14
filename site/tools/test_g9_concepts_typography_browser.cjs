'use strict';
const assert=require('node:assert/strict'),{chromium}=require('playwright');
const {server,launchOptions}=require('./dashboard_test_support.cjs');
(async()=>{const app=await server(),browser=await chromium.launch(launchOptions());try{
const page=await browser.newPage({viewport:{width:320,height:852},serviceWorkers:'block'}),errors=[];page.on('pageerror',e=>errors.push(e.message));
async function check(label){await page.evaluate(()=>document.fonts.ready);await page.evaluate(()=>window.TriggleNotation.prepare(document));
 assert.equal(await page.locator('[data-math-error]').count(),0,label+' valid notation');
 assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),label+' no page overflow');
}
for(const width of [320,360,393,430]){await page.setViewportSize({width,height:852});
for(const lang of ['en','ta'])for(const chapter of [1,2,9]){
 await page.goto(app.base+'/index.html?class=9&chapter=g9-ch'+chapter+'&section=concepts');await page.locator(lang==='en'?'#langEn':'#langTa').click();
 const nav=await page.locator('.sp2-nav [data-index]').count();
 for(let index=0;index<Math.max(nav,1);index++){
  if(nav)await page.locator('.sp2-nav [data-index]').nth(index).click();
  await check(chapter+'/'+index+' '+lang+' '+width);
  const controls=await page.locator('[data-demo-mode]').count();
  for(let i=0;i<controls;i++){
   const button=page.locator('[data-demo-mode]').nth(i);if(await button.getAttribute('data-demo-mode')==='go')continue;
   await button.click();await check('concept control '+chapter+'/'+index+'/'+i);
  }
  const sliders=page.locator('.sp2-panel input[type=range]');
  for(let i=0;i<await sliders.count();i++)for(const extreme of ['min','max']){await sliders.nth(i).evaluate((el,key)=>{el.value=el[key];el.dispatchEvent(new Event('input',{bubbles:true}));},extreme);await check('slider '+chapter+'/'+index);}
 }
}
for(const id of ['c9-exercise-6-1-q6','g9-ch1-ex1.1-q3-a-i']){
 await page.goto(app.base+'/index.html?class=9&question='+id);await page.locator('#figureBtn').click();await check('figure '+id);
 assert(await page.locator('#figureDialog').isVisible());assert.equal(await page.locator('#figureDialog [data-math-error]').count(),0);await page.keyboard.press('Escape');
}
console.log('PASS concepts, dynamic controls, both languages, figures '+width+'px');
}
assert.deepEqual(errors,[]);await page.close();}finally{await browser.close();await app.close();}})().catch(e=>{console.error(e);process.exitCode=1;});
