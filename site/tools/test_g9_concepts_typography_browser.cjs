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
 if([1,2,9].includes(chapter)){
  assert.equal(nav,chapter===1?7:chapter===2?8:5,'All chapter concepts remain available on the index');
  assert(await page.locator('.hub-header').evaluate(el=>el.classList.contains('hub-heading-a11y')&&el.getBoundingClientRect().width<=1&&el.getBoundingClientRect().height<=1),'Chapter title is screen-reader-only, not a visible repeated heading');
  assert.equal(await page.locator('.hub-back-menu').isVisible(),true,'One Back to chapter on the index');
  assert.equal(await page.locator('.sp2-progress:visible').count(),0,'No progress counter pushing down mathematics');
  assert.equal(await page.locator('.sp2-intro:visible').count(),0,'No promotional introductory copy');
  assert.equal(await page.locator('.sp2-journey-controls:visible').count(),0,'No extra navigation buttons');
  assert.equal(await page.locator('[data-index-view]').isVisible(),true,'Concepts opens the index');
  assert.equal(await page.locator('[data-detail-view]').isVisible(),false,'No detail before selection');
  assert.equal(await page.locator('[data-idea-picker]').count(),0,'Dropdown is removed');
  assert.equal(await page.locator('.sp2-nav-button:visible').count(),nav);
  if(width===360||width===393){
   const directory=path.resolve('screenshots/g9-compact-concepts');
   await fs.mkdir(directory,{recursive:true});
   await page.screenshot({path:path.join(directory,'index-'+width+'-'+lang+'.png'),fullPage:false});
  }
 }
 for(let index=0;index<Math.max(nav,1);index++){
  if(nav){
   if([1,2,9].includes(chapter) && await page.locator('[data-detail-view]').isVisible())
     await page.locator('[data-back-index]').click();
   await page.locator('.sp2-nav [data-index]').nth(index).click();
   if([1,2,9].includes(chapter)){
     assert.equal(await page.locator('[data-detail-view]').isVisible(),true);
     assert.equal(await page.locator('[data-index-view]').isVisible(),false);
     assert.equal(new URL(page.url()).searchParams.get('concept'),String(index),'Lesson deep link identifies the selected idea');
     const back=await page.locator('[data-back-index]').boundingBox();
     assert(back&&back.y>=0&&back.y+back.height<=page.viewportSize().height,
       'Back to concepts must remain in the initial lesson viewport '+width+' '+lang);
     if(width<=430){
       const dock=page.locator('[data-adaptive-dock]');
       assert.equal(await dock.count(),1,'Exactly one sequential navigation dock');
       const style=await dock.evaluate(el=>({position:getComputedStyle(el).position,buttons:[...el.querySelectorAll('button')].map(b=>b.getBoundingClientRect().height)}));
       const usesAfterActivityNavigation=await page.locator('.sp2-journey').evaluate(el=>el.classList.contains('sp2-simple-journey'));
       assert.equal(style.position,usesAfterActivityNavigation?'static':'sticky',
         'Navigation matches the intentionally non-overlapping mobile lesson layout');
       assert(style.buttons.every(h=>h>=48),'Navigation touch targets remain at least 48px');
       const next=await page.locator('[data-footer-next]').innerText();
       assert(next.includes(index===nav-1?(lang==='en'?'Back to concepts':'கருத்துகளுக்குத் திரும்பு'):(lang==='en'?'Next idea':'அடுத்த கருத்து')),'Correct localized Next idea / index label');
       if(usesAfterActivityNavigation){
         const followsPractice=await page.evaluate(()=>{
           const dock=document.querySelector('[data-adaptive-dock]');
           const panel=document.querySelector('.sp2-journey[data-view="lesson"] .sp2-panel');
           return !!panel&&!!dock&&!!(panel.compareDocumentPosition(dock)&Node.DOCUMENT_POSITION_FOLLOWING);
         });
         assert(followsPractice,'Mobile concept navigation follows the practice content in document order');
         await dock.scrollIntoViewIfNeeded();
         const bottomNav=await dock.boundingBox();
         assert(bottomNav&&bottomNav.y>=0&&bottomNav.y+bottomNav.height<=852,
           'After-activity navigation is accessible when reached');
       }else{
         await page.evaluate(()=>window.scrollTo(0,0));
         const initial=await dock.boundingBox();
         assert(initial&&initial.y>=0&&initial.y+initial.height<=852,'Sticky navigation remains visible at top');
         await page.evaluate(()=>window.scrollTo(0,document.documentElement.scrollHeight));
         const ending=await dock.boundingBox();
         assert(ending&&ending.y>=0&&ending.y+ending.height<=852,'Sticky navigation remains accessible at page end');
       }
       const answer=page.locator('.sp2-panel [data-answers] button').first();
       await answer.scrollIntoViewIfNeeded();
       const overlap=await page.evaluate(()=>{
         const dock=document.querySelector('[data-adaptive-dock]').getBoundingClientRect();
         const target=document.activeElement?.getBoundingClientRect();
         return !!target&&target.bottom>dock.top&&target.top<dock.bottom;
       });
       assert.equal(overlap,false,'Dock must not obscure focused question controls');
     }
   }
  }
  await check(chapter+'/'+index+' '+lang+' '+width);
  if(chapter===2){
   assert.equal(await page.locator('.sp2-explanation').evaluate(el=>el.open),false,'Real Numbers starts with the visual idea');
   assert.equal(await page.locator('[data-demo]').count(),1,'One mathematical activity per idea');
   await page.locator('.sp2-explanation summary').click();
   const beats=page.locator('.rnlab-foundation-tabs [data-foundation-step]');
   const expected=[3,4,3,3,4,3,4,3][index];
   assert.equal(await beats.count(),expected,'Real Numbers learning beats '+index+' '+lang+' '+width);
   const active=page.locator('.rnlab-foundation-tabs [aria-pressed="true"]');
   assert.equal(await active.count(),1,'exactly one foundation step selected');
   const before=await page.locator('[data-foundation-current]').innerText();
   await beats.last().click();
   assert.equal(await page.locator('.rnlab-foundation-tabs [aria-pressed="true"]').count(),1);
   const after=await page.locator('[data-foundation-current]').innerText();
   assert.notEqual(after,before,'tapping a learning step changes its explanation');
   assert(await page.locator('.rnlab-foundation-equation').count()===1,'one mathematical display');
   assert(await page.locator('.rnlab-pitfall').count()===1,'one optional misconception');
   await check('Real Numbers foundation '+index+' '+lang+' '+width);
   const geometry=await page.locator('.rnlab-foundation-equation').evaluate(el=>({
    elementWidth:el.getBoundingClientRect().width,pageWidth:document.documentElement.clientWidth,
    allowedScroll:el.scrollWidth>=el.clientWidth
   }));
   assert(geometry.elementWidth<=geometry.pageWidth+1,'math remains within phone width');
   if(index===2){
     const zoom=page.locator('.sp2-panel input[type="range"]');
     await zoom.evaluate(el=>{el.value='3';el.dispatchEvent(new Event('input',{bubbles:true}));});
     assert((await page.locator('[data-demo-output]').innerText()).includes('1.414'),'zoom to third decimal works');
   }
   if(index===4){
    assert.equal(await page.locator('.rnlab-surd-tile').count(),4,'√8 starts with a 2×2 perfect-square factor');
    assert.equal(await page.locator('.sp2-panel input[type=range]').count(),0,'surds no longer depend on an unexplained slider');
    assert.equal(await page.locator('.rnlab-surd-equation').count(),3,'three visible math steps explain the surd');
    const firstImpressionOrder=await page.locator('[data-demo]').evaluate(d=>{
      const visual=d.querySelector('[data-demo-visual]'),answer=d.querySelector('[data-demo-output]'),picker=d.querySelector('[data-demo-controls]');
      const heading=d.querySelector('.rnlab-surd-question');
      return !!(picker.compareDocumentPosition(visual)&Node.DOCUMENT_POSITION_FOLLOWING)&&
        !!(visual.compareDocumentPosition(answer)&Node.DOCUMENT_POSITION_FOLLOWING)&&
        !!heading&&picker.contains(heading);
    });
    assert(firstImpressionOrder,'surds switcher follows the question before the diagram and worked steps');
    const optionPosition=await page.locator('.rnlab-surd-options').boundingBox();
    assert(optionPosition&&optionPosition.y<page.viewportSize().height-110,'the example buttons start in the first phone viewport');
    assert((await page.locator('.rnlab-surd-question').innerText()).includes('√8'),'first-glance question explains the diagram');
    assert((await page.locator('.rnlab-surd-description').innerText()).includes('8'),'square group links to the original radicand');
    await page.locator('[data-demo-mode="eighteen"]').click();
    assert.equal(await page.locator('.rnlab-surd-tile').count(),9,'√18 has a 3×3 perfect-square factor');
    await page.locator('[data-demo-mode="thirtytwo"]').click();
    assert.equal(await page.locator('.rnlab-surd-tile').count(),16,'√32 has a 4×4 perfect-square factor');
    await page.locator('[data-demo-mode="eight"]').click();
    assert.equal(await page.locator('.rnlab-surd-tile').count(),4,'tapping back to √8 restores its model');
    await check('surds visual and math '+lang+' '+width);
   }
  }
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
