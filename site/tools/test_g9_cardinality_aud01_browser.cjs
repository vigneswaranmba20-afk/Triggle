'use strict';
// AUD01-02: student-facing cardinality math, first-glance givens and
// three-set prerequisite, independently tested in English/Tamil on phones.
const assert=require('node:assert/strict');
const {chromium}=require('playwright');
const {server,launchOptions}=require('./dashboard_test_support.cjs');
(async()=>{
 const app=await server(),browser=await chromium.launch(launchOptions());
 try{
  const page=await browser.newPage({viewport:{width:360,height:852},serviceWorkers:'block'});
  const errors=[];
  page.on('pageerror',e=>errors.push(e.message));
  for(const width of [320,360,390,430]){
   await page.setViewportSize({width,height:852});
   for(const lang of ['en','ta']){
    await page.goto(app.base+'/index.html?class=9&chapter=g9-ch1&section=concepts&concept=6');
    await page.locator(lang==='ta'?'#langTa':'#langEn').click();
    const givens=page.locator('.sp2-count-givens');
    await givens.waitFor({state:'visible'});
    assert.equal(await givens.locator('> span').count(),3,'Three given cardinalities');
    const norm=s=>s.replace(/\s+/g,'').replace(/−/g,'-');
    const text=norm(await givens.innerText());
    for(const expected of ['n(U)=30','n(A)=14','n(B)=11'])
      assert(text.includes(expected),'First glance contains '+expected+' at '+width+' '+lang+': '+text);
    assert.equal(await page.locator('#sp2-overlap-control').inputValue(),'6');
    async function check(both,union,neither){
      await page.locator('#sp2-overlap-control').evaluate((node,v)=>{
        node.value=String(v);
        node.dispatchEvent(new Event('input',{bubbles:true}));
      },both);
      const math=norm(await page.locator('[data-slider-formula]').innerText());
      assert(math.includes('n(A∪B)=14+11-'+both+'='+union),
        'Union cardinality formula '+width+' '+lang+': '+math);
      assert(math.includes('n((A∪B)′)=30-'+union+'='+neither)||
        math.includes('n((A∪B)')&&math.includes('=30-'+union+'='+neither),
        'Neither cardinality formula '+width+' '+lang+': '+math);
      assert(!math.includes('AorB='),'Never equate the set itself to its size');
      const output=await page.locator('[data-demo-output]').innerText();
      assert(output.includes(String(union))&&output.includes(String(neither)),
        'Both union and neither are updated at '+width+' '+lang);
    }
    await check(6,19,11);
    await check(8,17,13);
    await check(0,25,5);
    await check(11,14,16);
    const explanation=page.locator('.sp2-explanation');
    await explanation.locator('summary').click();
    const three=page.locator('.sp2-count-three-bridge');
    await three.waitFor({state:'visible'});
    assert.equal(await three.locator('.sp2-three-set-math').count(),1,'A dedicated three-set equation appears in Understand');
    const mathematicalText=norm(await three.locator('.sp2-three-set-math').innerText());
    assert(mathematicalText.includes('n(A∪B∪C)'),'Three-set formula is mathematically named');
    assert(mathematicalText.includes('n(A∩B∩C)'),'The triple-overlap term is taught');
    await page.locator('[data-why-button]').click();
    const why=norm(await page.locator('[data-why]').innerText());
    assert(!why.includes('11sum'),'No malformed 11sum token');
    assert(why.includes('8+6+5+11=30'),'Exact four-region verification');
    assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),
      'No full-page horizontal overflow at '+width+' '+lang);
    assert.equal(await page.locator('[data-math-error]').count(),0,'KaTeX/MathML all render');
   }
  }
  assert.deepEqual(errors,[],'No JavaScript errors in the bilingual counting lesson');
  console.log('PASS AUD01-02: given sizes, two-set and three-set notation, arithmetic, EN/TA, 320–430px');
  await page.close();
 }finally{await browser.close();await app.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
