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
    // True semantic KaTeX MathML keeps coefficient 4 next to k squared;
    // do not depend on the old stand-alone math.triggle-math wrapper.
    const nodes=[...document.querySelectorAll('#stepsList .step-equation .triggle-tex math')];
    const powers=nodes.flatMap(m=>[...m.querySelectorAll('msup')]);
    const groups=powers.filter(power=>{
      const parts=[...power.children],base=parts[0],exponent=parts[1];
      if(base?.textContent!=='k'||exponent?.textContent!=='2')return false;
      let previous=power.previousElementSibling;
      while(previous?.localName==='mspace')previous=previous.previousElementSibling;
      return previous?.localName==='mn'&&previous.textContent==='4';
    });
    const valid=groups.every(power=>{
      const parts=[...power.children];let previous=power.previousElementSibling;
      while(previous?.localName==='mspace')previous=previous.previousElementSibling;
      return !!power.closest('math')&&previous?.textContent==='4'&&
        parts[0]?.textContent==='k'&&parts[1]?.textContent==='2';
    });
    return {groups:groups.length,valid,
      original:document.querySelector('#stepsList .worked-step:nth-child(3) .step-equation')?.textContent||'',
      overflowY:getComputedStyle(document.querySelector('.lesson-container')).overflowY,
      horizontal:document.documentElement.scrollWidth-innerWidth};
   });
   assert(proof.groups===2,'Expected 4k² coefficient and exponent in both Q5 derivations '+JSON.stringify({width,proof}));
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
