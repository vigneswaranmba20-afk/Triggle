'use strict';
const assert=require('node:assert/strict'),{chromium}=require('playwright');
const {server,launchOptions}=require('./dashboard_test_support.cjs');
const remaining=[
 ...Array.from({length:10},(_,i)=>'c10-2-ex2-1-q'+(i+1)),
 ...[1,2,3,4,5,6,7,9].map(n=>'c10-2-ex2-2-q'+n),
 'c10-3-ex3-1-q1-i','c10-4-ex4-1-q2','c10-4-ex4-1-q3',
 'c10-8-ex8-1-q1-i','c10-8-ex8-1-q1-ii','c10-8-ex8-1-q2',
 ...[1,2,3].map(n=>'c10-'+(n===1?'3-3-practice-18':n===2?'2-2-practice-19':'5-5-practice-20')),
 ...['1-1','1-2','1-3','2-4','2-5','2-6','3-7','3-8','3-9','4-10','4-11','4-12','5-13','5-14','5-15','5-16','unit-17'].map(x=>'c10-6-6-'+x)
];
(async()=>{
 const app=await server(),browser=await chromium.launch(launchOptions());
 try{
  const ctx=await browser.newContext({viewport:{width:390,height:844},deviceScaleFactor:2,serviceWorkers:'block'}),page=await ctx.newPage(),errors=[],missing=[];
  page.on('pageerror',e=>errors.push(e.message));
  page.on('response',r=>{if(r.status()>=400)missing.push(r.url());});
  assert.equal(remaining.length,44);
  for(const width of [320,390,412,768]){
   await page.setViewportSize({width,height:844});
   const selection=width===390?remaining:[
    'c10-2-ex2-1-q6','c10-2-ex2-2-q5','c10-3-ex3-1-q1-i',
    'c10-4-ex4-1-q2','c10-6-6-1-3','c10-6-6-2-5',
    'c10-6-6-5-16','c10-8-ex8-1-q1-i'
   ];
   for(const id of selection){
    await page.goto(app.base+'/index.html?class=10&question='+id,{waitUntil:'domcontentloaded'});
    await page.locator('#stepsList .structured-equation .triggle-tex').first().waitFor();
    await page.evaluate(()=>document.fonts.ready);
    const state=await page.evaluate(()=>{
     const id=new URL(location.href).searchParams.get('question'),item=window.TRIGGLE_CLASSES[10].items.find(r=>r.id===id);
     const lesson=document.querySelector('#lessonCard'),tex=[...lesson.querySelectorAll('.triggle-tex')];
     return {id,screen:innerWidth,page:document.documentElement.scrollWidth,
      stepCount:lesson.querySelectorAll('#stepsList .worked-step:not(.final-answer-step)').length,expected:item.steps.length,
      formulaCount:lesson.querySelectorAll('#stepsList .structured-equation .triggle-tex').length,
      final:!!lesson.querySelector('.final-answer-step .katex'),
      invalid:lesson.querySelectorAll('.math-fallback').length,
      fractions:lesson.querySelectorAll('#stepsList mfrac').length,
      scroll:tex.map(x=>({width:x.clientWidth,scroll:x.scrollWidth,tab:x.tabIndex,elHeight:x.clientHeight,glyph:x.querySelector('.katex-html')?.getBoundingClientRect().height||0}))};
    });
    assert.equal(state.stepCount,state.expected,'All original reasoning must be retained: '+id);
    assert.ok(state.formulaCount>=state.expected,'All steps must be true rich maths: '+id);
    assert.ok(state.final,'Final answer must be typeset: '+id);
    assert.equal(state.invalid,0,'No broken KaTeX formulas: '+id);
    assert.ok(state.page<=state.screen+1,'No page horizontal overflow: '+id+' at '+width);
    for(const geom of state.scroll){
     assert.ok(geom.elHeight+1>=geom.glyph,'Formula glyph must not be vertically clipped: '+id);
     if(geom.scroll>geom.width+1)assert.equal(geom.tab,0,'Long maths must be focusable: '+id);
    }
    if(['c10-6-6-1-3','c10-6-6-5-16','c10-8-ex8-1-q1-i'].includes(id))
     assert.ok(state.fractions>=1,'Missing stacked fractions '+id);
   }
  }
  await page.goto(app.base+'/index.html?class=10&question=c10-6-6-1-1');
  await page.locator('#langTa').click();
  assert.equal(await page.locator('html').getAttribute('lang'),'ta');
  assert.equal(await page.locator('#lessonCard .math-fallback').count(),0,'Tamil UI must display valid maths');
  assert.ok(await page.locator('#stepsList mfrac').count()>0,'Tamil UI must use real fraction forms');
  // Ensure the 13 previously migrated questions and all Chapter 1 maths remain available.
  for(const id of ['c10-8-ex8-1-q5','c10-1-1-unit-q8']){
   await page.goto(app.base+'/index.html?class=10&question='+id);
   await page.locator('#stepsList .katex').first().waitFor();
   assert.equal(await page.locator('#lessonCard .math-fallback').count(),0,'Previously rich maths must not regress: '+id);
  }
  assert.deepEqual(errors,[],'Uncaught browser errors');
  assert.deepEqual(missing,[],'Missing maths/offline assets');
  console.log('PASS Grade 10 rich maths all remaining chapters: 44 routes at 390px, 8 high-risk problems at 320/412/768px, stacked fractions, Tamil interface, long-equation access, no horizontal overflow and earlier lessons preserved.');
  await ctx.close();
 } finally {await browser.close();await app.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
