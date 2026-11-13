'use strict';
const assert=require('node:assert/strict'),{chromium}=require('playwright');
const {server,launchOptions}=require('./dashboard_test_support.cjs');
(async()=>{
 const app=await server(),browser=await chromium.launch(launchOptions());
 try {
  const ctx=await browser.newContext({viewport:{width:390,height:844},deviceScaleFactor:2,serviceWorkers:'block'});
  const page=await ctx.newPage(),errors=[],missing=[];
  page.on('pageerror',e=>errors.push(e.message));
  page.on('response',r=>{if(r.status()>=400)missing.push(r.url());});
  const ids=await (async()=>{
    await page.goto(app.base+'/index.html?class=10&question=c10-1-ex1-1-q1-i');
    return page.evaluate(()=>window.TRIGGLE_CLASSES[10].items.filter(x=>x.chapter==='1'&&x.kind==='textbook').map(x=>x.id));
  })();
  assert.equal(ids.length,74,'Student-visible relations and functions content must have 74 parts');
  for(const width of [320,390,412,768]){
   await page.setViewportSize({width,height:844});
   const selection=width===390?ids:[
      'c10-1-ex1-1-q1-i','c10-1-ex1-1-q7-ii',
      'c10-1-1-3-q5','c10-1-1-4-q10','c10-1-1-5-q1','c10-1-1-6-q10',
      'c10-1-1-unit-q5','c10-1-1-unit-q8','c10-1-1-unit-q9','c10-1-1-unit-q10'
   ];
   for(const id of selection){
     await page.goto(app.base+'/index.html?class=10&question='+id,{waitUntil:'domcontentloaded'});
     await page.locator('#stepsList .structured-equation .triggle-tex').first().waitFor();
     await page.evaluate(()=>document.fonts.ready);
     const state=await page.evaluate(()=>{
      const item=window.TRIGGLE_CLASSES[10].items.find(r=>r.id===new URL(location.href).searchParams.get('question'));
      const lesson=document.querySelector('#lessonCard');
      const formulas=[...lesson.querySelectorAll('.triggle-tex')];
      return {id:item.id,whole:document.documentElement.scrollWidth,screen:innerWidth,
       fallback:lesson.querySelectorAll('.math-fallback').length,
       count:lesson.querySelectorAll('#stepsList .worked-step:not(.final-answer-step)').length,
       expected:item.steps.length,math:lesson.querySelectorAll('#stepsList .structured-equation .triggle-tex').length,
       final:!!lesson.querySelector('.final-answer-step .katex'),
       mfrac:lesson.querySelectorAll('mfrac').length,
       msqrt:lesson.querySelectorAll('msqrt').length,
       questionMath:lesson.querySelectorAll('#questionText .katex').length,
       glyphs:formulas.map(x=>({height:x.clientHeight,glyph:x.querySelector('.katex-html')?.getBoundingClientRect().height||0,
         scroll:x.scrollWidth,width:x.clientWidth,tab:x.tabIndex}))
      };
     });
     assert.equal(state.count,state.expected,'Missing worked step '+id);
     assert.ok(state.math>=state.expected,'Each original step must have a rendered formula '+id);
     assert.ok(state.final,'Final answer not typeset '+id);
     assert.equal(state.fallback,0,'KaTeX failed '+id);
     assert.ok(state.whole<=state.screen+1,'Page overflow at '+width+'px '+id);
     for(const g of state.glyphs){
       assert.ok(g.height+1>=g.glyph,'KaTeX glyph vertically clipped at '+width+' '+id);
       if(g.scroll>g.width+1)assert.equal(g.tab,0,'Long formula must be keyboard focusable '+id);
     }
     if(['c10-1-1-3-q5','c10-1-1-unit-q8','c10-1-1-unit-q9'].includes(id))
       assert.ok(state.mfrac>=2,'Fractions were not stacked '+id);
     if(id==='c10-1-1-unit-q5')assert.ok(state.msqrt>=3,'Nested radicals not displayed '+id);
     if(['c10-1-1-unit-q5','c10-1-1-4-q10','c10-1-1-unit-q10'].includes(id))
       assert.ok(state.questionMath>=1,'Question itself must use true mathematical glyphs '+id);
   }
  }
  await page.goto(app.base+'/index.html?class=10&question=c10-1-ex1-1-q1-i');
  await page.locator('#langTa').click();
  assert.equal(await page.locator('html').getAttribute('lang'),'ta');
  assert.ok(await page.locator('#stepsList .katex').count()>0,'Tamil interface must retain maths');
  assert.equal(await page.locator('#lessonCard .math-fallback').count(),0,'Tamil interface maths cannot fail');
  assert.deepEqual(errors,[],'Browser JavaScript errors');
  assert.deepEqual(missing,[],'Missing self-hosted maths assets');
  console.log('PASS Grade 10 Chapter 1 ChatGPT-style notation: 74 student parts at 390px, 10 difficult layouts at 320/412/768px, semantic fractions/cases/radicals, full working, accessible scroll, original Tamil and no page overflow.');
  await ctx.close();
 }finally{await browser.close();await app.close()}
})().catch(e=>{console.error(e);process.exitCode=1;});
