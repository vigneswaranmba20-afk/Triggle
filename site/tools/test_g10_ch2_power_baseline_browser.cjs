'use strict';
const assert=require('node:assert/strict'),{chromium}=require('playwright');
const {server,launchOptions}=require('./dashboard_test_support.cjs');
(async()=>{
 const site=await server(),browser=await chromium.launch(launchOptions());
 try{
  for(const width of [360,390,412,430]){
   const context=await browser.newContext({viewport:{width,height:820},deviceScaleFactor:1,isMobile:true,hasTouch:true,serviceWorkers:'block'});
   const page=await context.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));
   await page.goto(site.base+'/index.html?class=10&question=c10-2-ex2-1-q5');
   await page.locator('#stepsList .worked-step').nth(2).waitFor();
   const proof=await page.evaluate(()=>{
    const nodes=[...document.querySelectorAll('#stepsList .step-equation math.triggle-math')];
    const groups=nodes.filter(m=>m.getAttribute('aria-label')==='4k²');
    const valid=groups.every(m=>{
      const row=m.querySelector('mrow'),coefficient=row?.querySelector(':scope > mn'),power=row?.querySelector(':scope > msup');
      const base=power?.querySelector('mi'),exp=power?.querySelector('mn');
      return coefficient?.textContent==='4'&&base?.textContent==='k'&&exp?.textContent==='2';
    });
    return {groups:groups.length,valid,
      original:document.querySelector('#stepsList .worked-step:nth-child(3) .step-equation')?.textContent||'',
      overflowY:getComputedStyle(document.querySelector('.lesson-container')).overflowY,
      horizontal:document.documentElement.scrollWidth-innerWidth};
   });
   assert(proof.groups===2,'Expected 4k² in both Q5 derivations '+JSON.stringify({width,proof}));
   assert(proof.valid,'Coefficient/base baseline semantics '+JSON.stringify({width,proof}));
   assert(proof.original.includes('4k+1'),'No missing expression after 4k² '+JSON.stringify({width,proof}));
   assert(proof.horizontal<=1,'No horizontal clipping '+JSON.stringify({width,proof}));
   assert(proof.overflowY==='visible','Preserve Android document scroll');
   await page.goto(site.base+'/index.html?class=10&question=c10-1-ex1-1-q1-i');
   assert(!(await page.locator('body').evaluate(el=>el.classList.contains('g10-ch2-type'))),
     'Chapter 1 must not inherit Chapter 2 styling');
   assert.deepEqual(errors,[],'Browser errors');
   await context.close();
  }
  console.log('PASS Chapter 2 Q5 4k² unified maths baseline at 360/390/412/430px, original equation, vertical scroll, chapter isolation');
 }finally{await browser.close();await site.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
