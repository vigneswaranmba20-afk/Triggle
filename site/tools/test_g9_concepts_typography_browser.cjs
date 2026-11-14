'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs/promises'),path=require('node:path'),{chromium}=require('playwright');
const {server,launchOptions}=require('./dashboard_test_support.cjs');
(async()=>{const app=await server(),browser=await chromium.launch(launchOptions());try{
const page=await browser.newPage({viewport:{width:320,height:852},serviceWorkers:'block'}),errors=[];page.on('pageerror',e=>errors.push(e.message));
async function check(label){await page.evaluate(()=>document.fonts.ready);await page.evaluate(()=>window.TriggleNotation.prepare(document));
 assert.equal(await page.locator('[data-math-error]').count(),0,label+' valid notation');
 assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),label+' no page overflow');
 const clipped=await page.locator('.triggle-tex').evaluateAll(nodes=>nodes.filter(el=>el.getClientRects().length&&el.clientHeight+1<el.querySelector('.katex-html').getBoundingClientRect().height).length);assert.equal(clipped,0,label+' no clipped formula glyphs');
}
for(const width of [320,360,393,430]){await page.setViewportSize({width,height:852});
for(const lang of ['en','ta'])for(const chapter of [1,2,9]){
 await page.goto(app.base+'/index.html?class=9&chapter=g9-ch'+chapter+'&section=concepts');await page.locator(lang==='en'?'#langEn':'#langTa').click();
 const nav=await page.locator('.sp2-nav [data-index]').count();
 if(chapter===1){
  assert.equal(nav,7,'All seven concepts remain available on the index');
  assert.equal(await page.locator('[data-index-view]').isVisible(),true,'Concepts opens the index');
  assert.equal(await page.locator('[data-detail-view]').isVisible(),false,'No detail before selection');
  assert.equal(await page.locator('[data-idea-picker]').count(),0,'Dropdown is removed');
  assert.equal(await page.locator('.sp2-nav-button:visible').count(),7);
  if(width===360||width===393){
   const directory=path.resolve('screenshots/g9-compact-concepts');
   await fs.mkdir(directory,{recursive:true});
   await page.screenshot({path:path.join(directory,'index-'+width+'-'+lang+'.png'),fullPage:false});
  }
 }
 for(let index=0;index<Math.max(nav,1);index++){
  if(nav){
   if(chapter===1 && await page.locator('[data-detail-view]').isVisible())
     await page.locator('[data-back-index]').click();
   await page.locator('.sp2-nav [data-index]').nth(index).click();
   if(chapter===1){
     assert.equal(await page.locator('[data-detail-view]').isVisible(),true);
     assert.equal(await page.locator('[data-index-view]').isVisible(),false);
     assert.equal(new URL(page.url()).searchParams.get('concept'),String(index),'Lesson deep link identifies the selected idea');
     const back=await page.locator('[data-back-index]').boundingBox();
     assert(back&&back.y>=0&&back.y+back.height<=page.viewportSize().height,
       'Back to concepts must remain in the initial lesson viewport '+width+' '+lang);
   }
  }
  await check(chapter+'/'+index+' '+lang+' '+width);
  if(chapter===1){
   assert.equal(await page.locator('.sp2-explanation').count(),1,'Textbook meaning is available on demand');
   assert.equal(await page.locator('.sp2-explanation').evaluate(el=>el.open),false,'Discover first, explain second');
   assert.equal(await page.locator('[data-demo]').count(),1,'Every idea retains its own interaction');
   if(index===0){
    assert.equal(await page.locator('.lc-membership .lc-scene').count(),1,'Visual set must be present');
    await page.locator('[data-demo-mode="8"]').click();
    const eq=await page.locator('[data-demo-output]').innerText();
    assert(eq.includes('8')&&eq.includes('∈'),'Set membership and MathML feedback respond together '+eq);
    assert.equal(await page.locator('[data-lc-outsider]').getAttribute('visibility'),'hidden');
    await page.locator('[data-demo-mode="3"]').click();
    assert.equal(await page.locator('[data-lc-outsider]').getAttribute('visibility'),'visible');
    assert.equal(await page.locator('.lc-selected').count(),0,'No inside number stays highlighted for an outsider');
    assert.equal(await page.locator('.lc-detective').count(),1,'Canonical textbook check becomes Rule Detective');
    assert.equal(await page.locator('.sp2-panel > .sp2-recall').count(),1,'One canonical quick check; extra practice stays optional');
    if(width===360&&lang==='en'){
     const dir=path.resolve('screenshots/g9-compact-concepts');
     await fs.mkdir(dir,{recursive:true});
     await page.screenshot({path:path.join(dir,'living-first-fold-360-en.png'),fullPage:false});
    }
   }
   if(index===5){
    assert.equal(await page.locator('[data-lc-venn]').count(),6,'De Morgan visual preserves the universe');
    await page.locator('[data-demo-mode="intersection"]').click();
    assert.equal(await page.locator('.lc-highlight').count(),5,'Complement of intersection highlights five members');
   }
   if(index===6){
    const input=page.locator('#sp2-overlap-control');
    await input.evaluate(el=>{el.value='8';el.dispatchEvent(new Event('input',{bubbles:true}));});
    assert.equal(await page.locator('[data-lc-both]').textContent(),'8','Overlap diagram follows slider');
    assert.equal(await page.locator('[data-lc-only-a]').textContent(),'6');
    assert.equal(await page.locator('[data-lc-only-b]').textContent(),'3');
   }
  }
  if(chapter===1&&index===6){
   const formula=await page.locator('.sp2-formula').evaluate(el=>({width:el.clientWidth,scroll:el.scrollWidth}));
   assert(formula.scroll<=formula.width+1,'Cardinality KaTeX fits without horizontal clipping '+lang+' '+width+' '+JSON.stringify(formula));
  }
  if(chapter===1){
   const layout=await page.locator('.sp2-journey').evaluate(el=>{
    const css=getComputedStyle(el),nav=el.querySelector('[data-back-index]');
    const heading=el.querySelector('.sp2-concept-heading h4'),panel=el.querySelector('.sp2-panel');
    return {padding:parseFloat(css.paddingLeft),navHeight:nav?.getBoundingClientRect().height,
      headingVisible:!!heading?.getClientRects().length,panelVisible:!!panel?.getClientRects().length,
      viewportWidth:document.documentElement.clientWidth};
   });
   assert(layout.padding<=14,'Compact concepts padding '+width+' '+lang);
   assert(layout.navHeight>=44,'Back to concepts touch height '+width+' '+lang);
   assert(layout.headingVisible&&layout.panelVisible,'Concept heading and lesson remain visible '+width+' '+lang);
   assert.equal(await page.locator('.hub-back-menu').isVisible(),false,'No second Back button inside lesson');
   if(index===1){
    const alternate=lang==='en'?'#langTa':'#langEn';
    await page.locator(alternate).click();
    assert.equal(await page.locator('[data-detail-view]').isVisible(),true,'Lesson remains open after switching language');
    assert.equal(new URL(page.url()).searchParams.get('concept'),'1','Concept deep link persists through language switch');
    await page.locator(lang==='en'?'#langEn':'#langTa').click();
    assert.equal(await page.locator('.sp2-nav [aria-current="step"]').getAttribute('data-index'),'1','Restoring language preserves concept');
   }
   if(index===0 && (width===360||width===393)){
    const directory=path.resolve('screenshots/g9-compact-concepts');
    await fs.mkdir(directory,{recursive:true});
    await page.screenshot({path:path.join(directory,'concepts-'+width+'-'+lang+'.png'),fullPage:true});
   }
  }
  const controls=await page.locator('[data-demo-mode]').count();
  for(let i=0;i<controls;i++){
   const button=page.locator('[data-demo-mode]').nth(i);if(await button.getAttribute('data-demo-mode')==='go')continue;
   await button.click();await check('concept control '+chapter+'/'+index+'/'+i);
  }
  const sliders=page.locator('.sp2-panel input[type=range]');
  for(let i=0;i<await sliders.count();i++)for(const extreme of ['min','max']){await sliders.nth(i).evaluate((el,key)=>{el.value=el[key];el.dispatchEvent(new Event('input',{bubbles:true}));},extreme);await check('slider '+chapter+'/'+index);}
 }
}
for(const id of ['c9-exercise-6-1-q1','c9-1-1-practice-1']){
 await page.goto(app.base+'/index.html?class=9&question='+id);if(await page.evaluate(()=>window.TriggleQuietReader?.isActive()))await page.keyboard.press('Tab');await page.locator('#figureBtn').click();await check('figure '+id);
 assert(await page.locator('#figureDialog').isVisible());assert.equal(await page.locator('#figureDialog [data-math-error]').count(),0);await page.keyboard.press('Escape');
}
console.log('PASS concepts, dynamic controls, both languages, figures '+width+'px');
}
assert.deepEqual(errors,[]);await page.close();}finally{await browser.close();await app.close();}})().catch(e=>{console.error(e);process.exitCode=1;});
