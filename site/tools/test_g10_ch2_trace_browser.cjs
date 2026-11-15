'use strict';
/* Student-facing tests of Grade 10 Chapter 2, mobile first, both mediums.
   No exercise screenshots used as a proxy for actual child comprehension. */
const assert=require('node:assert/strict'),{chromium}=require('playwright'),{server,launchOptions}=require('./dashboard_test_support.cjs');
async function main(){
 const app=await server(),browser=await chromium.launch(launchOptions());
 try{
  for(const width of [320,360,393,430]){
   const context=await browser.newContext({viewport:{width,height:852},serviceWorkers:'block',reducedMotion:'reduce'});
   const page=await context.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));
   const url=app.base+'/index.html?class=10&chapter=g10-ch2&section=concepts';
   for(const language of ['en','ta']){
    await page.goto(url);
    await page.locator(language==='en'?'#langEn':'#langTa').click();
    const nav=page.locator('.sp2-nav-button');
    await nav.first().waitFor({state:'visible'});
    assert.equal(await nav.count(),15,'15 textbook-ordered concepts '+language);
    assert.equal(await page.locator('.sp2-index-view').isVisible(),true,'Index-first default');
    assert.equal(await page.locator('.sp2-detail-view').isVisible(),false,'No lesson rendered before tapping');
    assert.equal(await page.locator('.hub-header').evaluate(el=>el.classList.contains('hub-heading-a11y')),true,'No redundant heading');
    assert.equal(await page.locator('[data-adaptive-dock]:visible').count(),0,'No navigation clutter on index');
    await nav.first().click();
    assert.equal(await page.locator('.sp2-detail-view').isVisible(),true);
    assert.equal(await page.locator('[data-g10ch2-visual] input[type=range]').count(),1);
    assert.equal(await page.locator('[data-math-error]').count(),0,'KaTeX does not silently fail');
    const group=page.locator('[data-g10ch2-visual] input[type=range]');
    await group.fill('23');
    const message=await page.locator('.g10ch2-visual-feedback').innerText();
    assert(message.includes('23 = 5 × 4 + 3'),'Remainder manipulative validates actual division: '+message);
    const button=page.locator('.sp2-answers button');
    assert.equal(await button.count(),3,'Self-check has three accessible options');
    await button.first().click();
    assert((await page.locator('[data-feedback]').innerText()).length>0,'Feedback updates after a tap');
    assert(await page.locator('[data-back-index]').isVisible(),'Back to concepts remains visible');
    assert(await page.locator('[data-footer-next]').isVisible(),'One bottom Next control');
    await page.locator('[data-back-index]').click();
    await nav.nth(2).click();
    const expression=await page.locator('.sp2-formula').innerText();
    assert(expression.includes('32')&&expression.includes('60'),'HCF shortcut shown before formal algorithm');
    assert.equal(await page.locator('.g10ch2-practice-link').count(),1,'Linked textbook exercise');
    assert.equal(await page.locator('[data-math-error]').count(),0,'HCF formula valid');
    assert.equal(new URL(page.url()).searchParams.get('concept'),'2','Individual lesson can be deep-linked');
    await page.locator('.g10ch2-practice-link').click();
    assert.equal(new URL(page.url()).searchParams.get('question'),'c10-2-ex2-1-q8','HCF explanation opens authentic exercise');
    await page.goto(app.base+'/index.html?class=10&question=c10-2-ex2-9-q5');
    await page.locator('#stepsList .worked-step').first().waitFor({state:'visible'});
    assert.match(await page.locator('#questionText').innerText(),/cubes|கனங்கள்|2025/i,'Correct newly published textbook question');
    assert.match(await page.locator('#answerText').innerText(),/9/,'Computed final answer');
    assert.equal(await page.locator('[data-math-error]').count(),0,'Rendered exercise maths valid');
    assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),'No horizontal page overflow');
   }
   assert.deepEqual(errors,[],'No uncaught JavaScript exceptions at '+width);
   await context.close();
   console.log('PASS G10 Ch2 foundations, interactive HCF, arithmetic, exercise links EN/TA at '+width);
  }
 }finally{await browser.close();await app.close()}
}
main().catch(e=>{console.error(e);process.exitCode=1;});
