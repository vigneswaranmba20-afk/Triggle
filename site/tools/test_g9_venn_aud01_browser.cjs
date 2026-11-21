'use strict';
// AUD01-01 — direct mobile acceptance of inline Venn, EN/TA.
const assert=require('node:assert/strict');
const {chromium}=require('playwright');
const {server,launchOptions}=require('./dashboard_test_support.cjs');
const operations=[
 ['intersection','{3,5}',['both']],
 ['union','{1,2,3,4,5,6}',['a','both','b']],
 ['difference','{1,2}',['a']],
 ['complement','{4,6,7}',['b','outside']],
 ['symmetric','{1,2,4,6}',['a','b']]
];
(async()=>{
 const app=await server(),browser=await chromium.launch(launchOptions());
 try {
  const page=await browser.newPage({viewport:{width:360,height:852},serviceWorkers:'block'});
  const errors=[];
  page.on('pageerror',e=>errors.push(e.message));
  for(const width of [320,360,390,430]){
   await page.setViewportSize({width,height:852});
   for(const lang of ['en','ta']){
    await page.goto(app.base+'/index.html?class=9&chapter=g9-ch1&section=concepts&concept=3');
    await page.locator(lang==='ta'?'#langTa':'#langEn').click();
    const svg=page.locator('.sp2-venn-svg');
    await svg.waitFor({state:'visible'});
    assert.equal(await svg.getAttribute('role'),'img','Accessible diagram '+lang);
    assert.equal(await svg.locator('desc').count(),1,'Region text equivalent');
    const definitions=await page.locator('.sp2-venn-defs').innerText();
    assert(definitions.includes(lang==='ta'?'அனைத்துக் கணம்':'universal set'),'U explained for '+lang);
    const buttons=page.locator('.sp2-venn-controls button');
    assert.equal(await buttons.count(),5,'Exactly five operations');
    const heights=await buttons.evaluateAll(nodes=>nodes.map(n=>n.getBoundingClientRect().height));
    assert(heights.every(h=>h>=44),'44px touch targets '+width+' '+lang);
    const bounds=await svg.boundingBox();
    assert(bounds&&bounds.width>150&&bounds.width<=width+1,'SVG fits '+width+'px');
    assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),'No mobile horizontal overflow '+width);
    for(const [key,answer,selected] of operations){
     await page.locator('[data-demo-mode="'+key+'"]').click();
     assert.equal(await page.locator('.sp2-venn-controls [aria-pressed="true"]').count(),1,'One active operation');
     const output=(await page.locator('[data-demo-output]').innerText()).replace(/\s+/g,'');
     assert(output.includes(answer),key+' calculated set '+width+' '+lang+': '+output);
     const fills=await svg.locator('[data-venn-region]').evaluateAll(nodes=>
      Object.fromEntries(nodes.map(n=>[n.dataset.vennRegion,n.getAttribute('fill')])));
     for(const [region,fill] of Object.entries(fills))
      assert.equal(fill,selected.includes(region)?'#c4ecd9':(region==='outside'?'#fbf9ff':'#fff'),
       key+' region '+region+' '+width+' '+lang);
     assert((await page.locator('[data-venn-explain]').innerText()).length>10,'Explanation follows '+key);
    }
    await page.locator('[data-demo-mode="intersection"]').focus();
    await page.keyboard.press('Enter');
    assert.equal(await page.locator('[data-demo-mode="intersection"]').getAttribute('aria-pressed'),'true');
    assert.equal(await page.locator('[data-math-error]').count(),0,'No math rendering errors');
   }
  }
  assert.deepEqual(errors,[],'No browser JS errors');
  console.log('PASS AUD01-01: five Venn calculations and shadings, EN/TA, keyboard, 320–430px');
  await page.close();
 } finally { await browser.close(); await app.close(); }
})().catch(e=>{console.error(e);process.exitCode=1;});
