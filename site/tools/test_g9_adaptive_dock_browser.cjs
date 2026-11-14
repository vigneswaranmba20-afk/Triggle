'use strict';
const assert=require('node:assert/strict');
const {chromium}=require('playwright');
const {server,launchOptions}=require('./dashboard_test_support.cjs');
(async()=>{
 const app=await server();
 const browser=await chromium.launch(launchOptions());
 try{
  const page=await browser.newPage({viewport:{width:360,height:852},serviceWorkers:'block'});
  const errors=[];
  page.on('pageerror',error=>errors.push(error.message));
  async function geometry(){
   return page.evaluate(()=>{
    const scroller=document.querySelector('.lesson-container');
    const footer=document.querySelector('.sp2-journey-footer');
    const r=footer.getBoundingClientRect(),c=scroller.getBoundingClientRect();
    return {position:getComputedStyle(footer).position,top:r.top,bottom:r.bottom,
     scrollerTop:c.top,scrollerBottom:c.bottom,scrollTop:scroller.scrollTop,
     maxScroll:scroller.scrollHeight-scroller.clientHeight,
     nextCount:footer.querySelectorAll('[data-footer-next]').length,
     prevHeight:footer.querySelector('[data-footer-prev]').getBoundingClientRect().height,
     nextHeight:footer.querySelector('[data-footer-next]').getBoundingClientRect().height,
     pageOverflow:document.documentElement.scrollWidth>innerWidth+1};
   });
  }
  async function dockAtBottom(label){
   const g=await geometry();
   assert.equal(g.position,'sticky',label+' uses a single CSS sticky dock');
   assert.equal(g.nextCount,1,label+' has one Next button');
   assert(g.prevHeight>=48 && g.nextHeight>=48,label+' both buttons are touchable '+JSON.stringify(g));
   assert(!g.pageOverflow,label+' no horizontal overflow');
   assert(g.bottom<=g.scrollerBottom+3&&g.bottom>=g.scrollerBottom-110,
    label+' navigation stays near the bottom of the usable scrollport '+JSON.stringify(g));
   return g;
  }
  for(const width of [320,360,393,430]){
   await page.setViewportSize({width,height:852});
   for(const lang of ['en','ta']){
    await page.goto(app.base+'/index.html?class=9&chapter=g9-ch1&section=concepts');
    if(lang==='ta')await page.locator('#langTa').click();
    assert.equal(await page.locator('.sp2-journey-footer:visible').count(),0,'Index has no navigation dock');
    await page.locator('.sp2-nav [data-index="1"]').click();
    assert.equal(await page.locator('.sp2-journey-footer:visible').count(),1,'Lesson has exactly one navigation dock');
    const nextLabel=await page.locator('[data-footer-next]').innerText();
    assert(nextLabel.includes(lang==='ta'?'அடுத்த கருத்து':'Next idea'),
     'Next correctly says idea rather than page: '+JSON.stringify({lang,width,nextLabel,url:page.url()}));
    const first=await dockAtBottom('start '+width+' '+lang);
    assert(first.maxScroll>100,'Enough scrollable lesson content to validate dock behavior');
    await page.locator('.lesson-container').evaluate(el=>el.scrollTop=el.scrollHeight/2);
    await page.waitForTimeout(45);
    await dockAtBottom('middle '+width+' '+lang);
    const choices=page.locator('.sp2-panel > .sp2-recall [data-choice]');
    if(await choices.count()){
      await choices.last().focus();
      await page.waitForTimeout(55);
      const positions=await page.evaluate(()=>{
       const footer=document.querySelector('.sp2-journey-footer').getBoundingClientRect();
       const focus=document.activeElement.getBoundingClientRect();
       return {focusBottom:focus.bottom,footerTop:footer.top};
      });
      assert(positions.focusBottom<=positions.footerTop+2,'Focused quiz answer stays above dock '+width+' '+lang+' '+JSON.stringify(positions));
    }
    await page.locator('.lesson-container').evaluate(el=>el.scrollTop=el.scrollHeight);
    await page.waitForTimeout(45);
    const end=await geometry();
    assert(end.bottom<=end.scrollerBottom+3&&end.top>=end.scrollerTop-2,
     'Dock returns to its normal footer at page end '+JSON.stringify(end));
    await page.locator('[data-footer-prev]').click();
    assert.equal(new URL(page.url()).searchParams.get('concept'),'0','Previous opens prior idea');
    assert.equal(await page.locator('[data-footer-prev]').isDisabled(),true,'Previous disabled on first idea');
    await page.locator('[data-footer-next]').click();
    assert.equal(new URL(page.url()).searchParams.get('concept'),'1','Next opens following idea');
    await page.locator('[data-back-index]').click();
    assert.equal(await page.locator('.sp2-journey-footer:visible').count(),0,'Dock disappears on Concepts index');
   }
  }
  assert.deepEqual(errors,[]);
  console.log('PASS adaptive bottom dock, non-obscured answers, language, and mobile widths');
  await page.close();
 }finally{await browser.close();await app.close();}
})().catch(error=>{console.error(error);process.exitCode=1;});
