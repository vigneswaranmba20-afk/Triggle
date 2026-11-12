'use strict';
const assert=require('node:assert/strict');
const {chromium}=require('playwright');
const {server,launchOptions}=require('./dashboard_test_support.cjs');

async function swipeUp(cdp,x,start,end){
 const point=y=>({x,y,id:1,radiusX:4,radiusY:4,force:1});
 await cdp.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[point(start)]});
 for(let i=1;i<=12;i++){
  await cdp.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[point(start+(end-start)*i/12)]});
  await new Promise(resolve=>setTimeout(resolve,18));
 }
 await cdp.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});
}
(async()=>{
 const {base,close}=await server(),browser=await chromium.launch(launchOptions());
 try{
  for(const width of [320,390,412]){
   const ctx=await browser.newContext({viewport:{width,height:720},deviceScaleFactor:1,isMobile:true,hasTouch:true,serviceWorkers:'block'});
   const page=await ctx.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));
   for(const id of ['c10-2-ex2-2-q4','c10-2-ex2-2-q5']){
    await page.goto(base+'/index.html?class=10&question='+id);
    await page.locator('#stepsList .final-answer-step').waitFor();
    const initial=await page.evaluate(()=>{
     const reader=document.querySelector('.lesson-container');
     const root=document.scrollingElement;
     return {
      readerY:getComputedStyle(reader).overflowY,
      readerX:getComputedStyle(reader).overflowX,
      readerScroll:reader.scrollHeight-reader.clientHeight,
      scrollHeight:root.scrollHeight,clientHeight:root.clientHeight,scrollTop:root.scrollTop,
      rootOverflow:getComputedStyle(root).overflowY,
      dockTop:document.getElementById('questionNavDock').getBoundingClientRect().top,
      answerTop:document.querySelector('#stepsList .final-answer-step').getBoundingClientRect().top,
      viewport:innerHeight,
      horizontal:document.documentElement.scrollWidth-innerWidth
     };
    });
    assert.equal(initial.readerY,'visible','Lesson must not trap vertical swipes '+id+' '+JSON.stringify(initial));
    assert.equal(initial.readerX,'visible','Do not make vertical scroll auto by hiding x overflow '+id);
    assert(initial.scrollHeight>initial.clientHeight+35,'Document should have enough scroll range to reveal answer '+JSON.stringify(initial));
    assert(initial.horizontal<=1,'No horizontal overflow '+JSON.stringify(initial));
    const startY=Math.round(Math.min(560,initial.dockTop-35)),endY=205;
    assert(startY>endY+100,'Swipe area too small');
    const cdp=await ctx.newCDPSession(page);
    await swipeUp(cdp,Math.round(width/2),startY,endY);
    await page.waitForTimeout(240);
    const after=await page.evaluate(()=>document.scrollingElement.scrollTop);
    assert(after>30,'Android touch swipe did not move the actual document '+id+' '+JSON.stringify({width,initial,after}));
    for(let i=0;i<7;i++){
      const atBottom=await page.evaluate(()=>document.scrollingElement.scrollHeight-document.scrollingElement.clientHeight-document.scrollingElement.scrollTop<6);
      if(atBottom)break;
      await swipeUp(cdp,Math.round(width/2),startY,endY);
      await page.waitForTimeout(90);
    }
    await page.evaluate(()=>window.scrollTo({top:document.scrollingElement.scrollHeight,behavior:'instant'}));
    await page.waitForTimeout(110);
    const bottom=await page.evaluate(()=>{
      const a=document.querySelector('#stepsList .final-answer-step').getBoundingClientRect();
      const d=document.getElementById('questionNavDock').getBoundingClientRect();
      const root=document.scrollingElement;
      return {answerTop:a.top,answerBottom:a.bottom,dockTop:d.top,
        lastScroll:root.scrollTop,lastMax:root.scrollHeight-root.clientHeight};
    });
    assert(bottom.lastMax-bottom.lastScroll<6,'Document does not reach final page '+JSON.stringify(bottom));
    assert(bottom.answerTop>=0&&bottom.answerBottom<=bottom.dockTop-3,
      'Final answer is covered by fixed navigation '+id+' '+JSON.stringify(bottom));
    assert.equal(await page.locator('#next').isVisible(),true,'Navigation must remain visible');
    await cdp.detach();
   }
   await page.goto(base+'/index.html?class=10&question=c10-1-ex1-1-q1-i');
   assert.equal(await page.locator('body').evaluate(el=>el.classList.contains('g10-ch2-type')),false,
     'Chapter 1 must remain unchanged');
   assert.deepEqual(errors,[], 'Browser errors '+width);
   await ctx.close();
  }
  console.log('PASS Android touch swipes at 320/390/412px, one document scroller, both textbook solutions, final answer not covered, other chapters untouched');
 }finally{await browser.close();await close();}
})().catch(error=>{console.error(error);process.exitCode=1;});
