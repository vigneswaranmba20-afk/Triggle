'use strict';
const assert=require('node:assert/strict'),{chromium}=require('playwright');
const {server,launchOptions}=require('./dashboard_test_support.cjs');
const ids=[
 'c10-3-ex3-1-q1-ii','c10-3-ex3-1-q1-iii',
 'c10-4-ex4-1-q1-i','c10-4-ex4-1-q1-ii',
 'c10-6-ex6-1-q2-i','c10-8-ex8-1-q3','c10-8-ex8-1-q4',
 ...[5,6,7,8,9,10].map(n=>'c10-8-ex8-1-q'+n)
];
(async()=>{
 const site=await server(),browser=await chromium.launch(launchOptions());
 try{
  const context=await browser.newContext({viewport:{width:390,height:844},deviceScaleFactor:2,serviceWorkers:'block'}),page=await context.newPage();
  const errors=[],missing=[];
  page.on('pageerror',e=>errors.push(e.message));
  page.on('response',r=>{if(r.status()>=400)missing.push(r.url());});
  for(const width of [320,390,412,768]){
   await page.setViewportSize({width,height:844});
   const selection=width===390?ids:['c10-8-ex8-1-q4','c10-8-ex8-1-q5'];
   for(const id of selection){
    await page.goto(site.base+'/index.html?class=10&question='+id,{waitUntil:'domcontentloaded'});
    await page.locator('#stepsList .structured-equation .triggle-tex').first().waitFor();
    await page.evaluate(()=>document.fonts.ready);
    await page.waitForTimeout(80);
    const state=await page.evaluate(()=>{
     const whole=document.querySelector('#lessonCard');
     const steps=[...whole.querySelectorAll('#stepsList .worked-step:not(.final-answer-step)')];
     const formulas=[...whole.querySelectorAll('.triggle-tex')];
     return {pageWidth:document.documentElement.scrollWidth,width:innerWidth,
      formulaCount:formulas.length,missingFallback:whole.querySelectorAll('.math-fallback').length,
      fractionCount:whole.querySelectorAll('.step-equation mfrac').length,
      rootCount:whole.querySelectorAll('.step-equation msqrt').length,
      hasFinal:!!whole.querySelector('.final-answer-step .katex'),
      steps:steps.length,
      expected:window.TRIGGLE_CLASSES[10].items.find(x=>x.id===new URL(location.href).searchParams.get('question')).steps.length,
      formulas:formulas.map(el=>{const glyph=el.querySelector('.katex-html');return {width:el.clientWidth,scroll:el.scrollWidth,tab:el.tabIndex,visible:el.getBoundingClientRect().height,
       glyph:glyph?.getBoundingClientRect().height||0};})};
    });
    assert.ok(state.pageWidth<=state.width+1,'Whole-page horizontal overflow '+width+' '+id+' '+JSON.stringify(state));
    assert.equal(state.missingFallback,0,'Unsupported KaTeX glyph or invalid source formula '+id);
    assert.ok(state.hasFinal,'Final answer lost rich notation '+id);
    assert.equal(state.steps,state.expected,'Mathematics step omitted '+id);
    assert.ok(state.formulaCount>=state.steps+1,'Incomplete rich typesetting '+id);
    for(const f of state.formulas){
      assert.ok(f.visible+1>=f.glyph,'Formula glyph vertically clipped '+id+': '+JSON.stringify(f));
      if(f.scroll>f.width+1)assert.equal(f.tab,0,'Wide formula must be keyboard-focusable '+id);
    }
    if(id.endsWith('q4')&&id.includes('ex8-1') || id.endsWith('q5')&&id.includes('ex8-1')){
      assert.ok(state.fractionCount>=2,'No stacked fractions in screenshot problem '+id);
      assert.ok(state.rootCount>=1,'No complete radicals in screenshot problem '+id);
    }
   }
  }
  await page.goto(site.base+'/index.html?class=10&question=c10-8-ex8-1-q5');
  await page.locator('#langTa').click();
  assert.equal(await page.locator('#lessonCard .math-fallback').count(),0,'Tamil UI must preserve rich maths for English-only content');
  assert.ok(await page.locator('#stepsList mfrac').count()>0);
  assert.deepEqual(errors,[],'Uncaught browser errors');
  assert.deepEqual(missing,[],'Missing assets');
  console.log('PASS ChatGPT-style math: 13 questions, 4 widths (320/390/412/768), correct KaTeX maths/fractions/roots, complete steps, focusable wide equations, Tamil interface, no overflow');
  await context.close();
 }finally{await browser.close();await site.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
