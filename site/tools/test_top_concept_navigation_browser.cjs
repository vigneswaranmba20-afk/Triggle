'use strict';
const assert=require('node:assert/strict');
const {chromium}=require('playwright');
const {server,launchOptions}=require('./dashboard_test_support.cjs');
(async()=>{
 const app=await server(),browser=await chromium.launch(launchOptions());
 try {
  for(const width of [320,390]){
   const page=await browser.newPage({viewport:{width,height:852},serviceWorkers:'block',reducedMotion:'reduce'});
   const errors=[];page.on('pageerror',e=>errors.push(e.message));
   const cases=[
    {grade:9,chapter:'g9-ch1',count:7,languages:['en','ta']},
    {grade:9,chapter:'g9-ch2',count:8,languages:['en','ta']},
    {grade:9,chapter:'g9-ch9',count:5,languages:['en','ta']},
    {grade:10,chapter:'g10-ch2',count:15,languages:['en','ta']},
    {grade:12,chapter:'g12-ch1',count:9,languages:['en']}
   ];
   for(const item of cases)for(const lang of item.languages){
    const url=app.base+'/index.html?class='+item.grade+'&chapter='+item.chapter+'&section=concepts';
    await page.goto(url);
    await page.locator(lang==='en'?'#langEn':'#langTa').click();
    const index=item.grade===12?page.locator('#mc-index [data-scene]'):page.locator('.sp2-index-view .sp2-nav-button');
    assert.equal(await index.count(),item.count,'Concept index '+item.chapter+' '+lang);
    await index.first().click();
    const top=page.locator('[data-top-next]'),back=page.locator(item.grade===12?'[data-index-toggle]':'[data-back-index]');
    assert(await top.isVisible(),'Top next is visible '+item.chapter);
    const a=await back.boundingBox(),b=await top.boundingBox();
    assert(a&&b&&b.x>a.x+a.width-1,'Top next is to the right of Back '+item.chapter);
    assert(b.y>=0&&b.y+b.height<=852,'Top next is reachable without scrolling '+item.chapter);
    assert(b.height>=44,'Touch target is at least 44px '+item.chapter);
    assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),'No horizontal overflow '+item.chapter+' '+lang+' '+width);
    assert((await top.innerText()).includes(lang==='ta'?'அடுத்த கருத்து':'Next concept'),'Top label is clear');
    await top.click();
    assert.equal(new URL(page.url()).searchParams.get('concept'),'1','Advances to second idea '+item.chapter);
    assert.equal(await page.locator('[data-detail-view]').isVisible(),true);
    await page.goto(url+'&concept='+(item.count-1));
    await page.locator(lang==='en'?'#langEn':'#langTa').click();
    const last=page.locator('[data-top-next]');
    assert(await last.isVisible(),'Last concept top control visible');
    assert((await last.innerText()).includes(lang==='ta'&&item.grade!==12?'கருத்துகள்':'Concept list'),'Last action does not cross chapter');
    await last.click();
    assert.equal(await page.locator('[data-index-view]').isVisible(),true,'Returns to index');
    assert.equal(new URL(page.url()).searchParams.has('concept'),false,'Index deep link reset');
   }
   assert.deepEqual(errors,[],'No JavaScript errors at '+width);
   await page.close();
  }
  console.log('Top concept navigation browser flow passed: all viewers, 320/390, EN/TA');
 } finally {await browser.close();await app.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
