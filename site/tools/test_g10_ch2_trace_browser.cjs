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
    const wrong=await page.locator('[data-feedback]').innerText();
    assert(wrong.includes(language==='ta'?'மீண்டும்':'Try again'),'Wrong first choice asks student to retry');
    assert(wrong.length>28,'Wrong choice provides a useful mathematical hint, not just a generic retry');
    await button.nth(2).click();
    assert((await page.locator('[data-feedback]').innerText()).includes(language==='ta'?'சரி!':'Correct!'),'Third choice is correct in first concept');
    assert.equal(await button.nth(2).getAttribute('aria-pressed'),'true','Correct choice retains accessible selected state');
    assert(await page.locator('[data-back-index]').isVisible(),'Back to concepts remains visible');
    assert(await page.locator('[data-footer-next]').isVisible(),'One bottom Next control');
    await page.locator('[data-back-index]').click();
    await nav.nth(1).click();
    await page.locator('.sp2-answers button').first().click();
    assert((await page.locator('[data-feedback]').innerText()).includes(language==='ta'?'சரி!':'Correct!'),'First choice is correct in second concept');
    await page.locator('[data-back-index]').click();
    await nav.nth(2).click();
    assert.equal(await page.locator('.sp2-formula').count(),0,'Do not reveal shortcut before discovery');
    const stepButtons=page.locator('.g10ch2-discovery-controls button');
    assert.equal(await stepButtons.count(),2,'Student can step through backward substitution');
    assert((await page.locator('.g10ch2-discovery-progress').innerText()).includes('1'),'Starts with first division');
    for(let step=0;step<5;step++)await stepButtons.nth(1).click();
    const expression=await page.locator('.g10ch2-discovery-math').innerText();
    assert(expression.includes('32')&&expression.includes('60'),'Backward substitution discovers original-number coefficients');
    assert(await page.locator('.g10ch2-discovery-complete').isVisible(),'Concluding reasoning only revealed after all steps');
    await page.locator('.sp2-answers button').first().click();
    assert((await page.locator('[data-feedback]').innerText()).includes(language==='ta'?'சரி!':'Correct!'),'Independent transfer check accepts x=-2, y=3');
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
    await page.goto(app.base+'/index.html?class=10&question=c10-2-ex2-2-q8');
    await page.locator('#stepsList .worked-step').first().waitFor({state:'visible'});
    assert.match(await page.locator('#questionText').innerText(),/35[\s\S]*56[\s\S]*91/,'Exercise 2.2 Q8 opens with authentic divisors');
    const answerQ8=await page.locator('#answerText').innerText();
    assert.match(answerQ8,/3647/,'Student sees the textbook appendix answer');
    assert.match(answerQ8,/Literally,\s*7/,'Student is not told that the literal mathematical minimum is wrong');
    const stepsQ8=await page.locator('#stepsList').innerText();
    assert(stepsQ8.includes('3640')&&stepsQ8.includes('35')&&stepsQ8.includes('zero'),'Student sees LCM reasoning and zero-quotient caveat');
    assert.equal(new URL(page.url()).searchParams.get('question'),'c10-2-ex2-2-q8','Q8 remains deep-linkable');
    assert.equal(await page.locator('[data-math-error]').count(),0,'No malformed Q8 mathematical notation');
    assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),'No horizontal page overflow');
   }
   assert.deepEqual(errors,[],'No uncaught JavaScript exceptions at '+width);
   await context.close();
   console.log('PASS G10 Ch2 foundations, interactive HCF, arithmetic, exercise links EN/TA at '+width);
  }
 }finally{await browser.close();await app.close()}
}
main().catch(e=>{console.error(e);process.exitCode=1;});
