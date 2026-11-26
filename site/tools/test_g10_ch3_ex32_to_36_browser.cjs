'use strict';
const assert=require('node:assert/strict'),{chromium}=require('playwright');
const {server,launchOptions}=require('./dashboard_test_support.cjs');
(async()=>{
 const app=await server(),browser=await chromium.launch(launchOptions());
 try{
  const items=[
   ['c10-3-ex3-2-q1-i','x⁴ + 3x³ − x − 3','x² + 2x − 3'],
   ['c10-3-ex3-2-q1-ii','x⁴ − 1','x² + 1'],
   ['c10-3-ex3-2-q1-iii','3x⁴ + 6x³','x(x² + 4x + 4)'],
   ['c10-3-ex3-2-q1-iv','3x³ + 3x² + 3x + 3','3(x² + 1)'],
   ['c10-3-ex3-2-q2-i','4x²y','8x³y²'],
   ['c10-3-ex3-2-q2-ii','9a³b²','36a³b²c'],
   ['c10-3-ex3-2-q2-iii','16m','48m²n²'],
   ['c10-3-ex3-2-q2-iv','p² − 3p + 2','(p − 1)(p − 2)(p + 2)'],
   ['c10-3-ex3-2-q2-v','2x² − 5x − 3','4(x + 3)(2x + 1)(x − 3)'],
   ['c10-3-ex3-2-q2-vi','(2x² − 3xy)²','(2x − 3y)³(4x² + 6xy + 9y²)'],
   ['c10-3-ex3-3-q1-i','21x²y','7xy, 105x²y²'],
   ['c10-3-ex3-3-q1-ii','x³ − 1','(x + 1)'],
   ['c10-3-ex3-3-q1-iii','x²y + xy²','x(x + y), xy(x + y)'],
   ['c10-3-ex3-3-q2-i','a² + 4a − 12','(a + 6)(a − 2)(a − 3)'],
   ['c10-3-ex3-3-q2-ii','x⁴ − 27a³x','x(x − 3a)²(x² + 3ax + 9a²)'],
   ['c10-3-ex3-3-q3-i','12(x⁴ − x³)','4x²(x − 1)'],
   ['c10-3-ex3-3-q3-ii','x³ + y³','x² − xy + y²'],
   ['c10-3-ex3-3-q4-i','LCM and GCD','(a + 2)(a − 7)'],
   ['c10-3-ex3-3-q4-ii','LCM and GCD','(x² − y²)(x² + xy + y²)'],
   ['c10-3-ex3-4-q1-i','x² − 1','(x − 1)/x'],
   ['c10-3-ex3-4-q1-ii','x² − 11x + 18','(x − 9)/(x − 2)'],
   ['c10-3-ex3-4-q1-iii','9x² + 81x','9/(x − 1)'],
   ['c10-3-ex3-4-q1-iv','p² − 3p − 40','(p + 5)/[2p(p − 4)]'],
   ['c10-3-ex3-4-q2-i','excluded values','−5, 5'],
   ['c10-3-ex3-4-q2-ii','excluded values','2, 3'],
   ['c10-3-ex3-4-q2-iii','excluded values','x = −2, 1 are excluded'],
   ['c10-3-ex3-4-q2-iv','excluded values','0, −3, 2'],
   ['c10-3-ex3-5-q1-i','4x²y','(3x³z)/(5y³)'],
   ['c10-3-ex3-5-q1-ii','p² − 10p + 21','p + 4'],
   ['c10-3-ex3-5-q1-iii','5t³','(3t²)/4'],
   ['c10-3-ex3-5-q2-i','x + 4','(3x − 4y)/(2x − 5)'],
   ['c10-3-ex3-5-q2-ii','x³ − y³','(x² + xy + y²)/[3(x + 2y)]'],
   ['c10-3-ex3-5-q3-i','2a² + 5a + 3','−5'],
   ['c10-3-ex3-5-q3-ii','b² + 3b − 28','(b − 4)/(b + 2)'],
   ['c10-3-ex3-5-q3-iii','x + 2','(3y)/(x − 3)'],
   ['c10-3-ex3-5-q3-iv','12t² − 22t + 8','4(2t − 1)/3'],
   ['c10-3-ex3-5-q4','a² + 3a − 4','4/9'],
   ['c10-3-ex3-5-q5','x² − 5x − 14','x² + 4x + 4'],
   ['c10-3-ex3-6-q1-i','x(x + 1)','(2x)/(x − 2)'],
   ['c10-3-ex3-6-q1-ii','x + 2','(2x² + 2x − 7)/[(x + 3)(x − 2)]'],
   ['c10-3-ex3-6-q1-iii','x³/(x − y)','x² + xy + y²'],
   ['c10-3-ex3-6-q2-i','(2x + 1)(x − 2)','2(x − 2)/(x − 4)'],
   ['c10-3-ex3-6-q2-ii','4x/(x² − 1)','(1 − x)/(1 + x)'],
   ['c10-3-ex3-6-q3','2x³ + x² + 3','(2x³ + 1)/(x² + 2)²'],
   ['c10-3-ex3-6-q4','x² + 6x + 8','(x + 1)/(x² − 2x + 4)'],
   ['c10-3-ex3-6-q5','2x + 1','(4x² − 1)/[2(4x² + 1)]'],
   ['c10-3-ex3-6-q6','x/(x + 1)','2(x² + 1)/[x(x + 1)²]'],
   ['c10-3-ex3-6-q7','Pari','2 hrs 24 minutes'],
   ['c10-3-ex3-6-q8','Iniya','30 kgs, 20 kgs']
  ];
  for(const width of [320,390,412]){
   const context=await browser.newContext({viewport:{width,height:780},serviceWorkers:'block',reducedMotion:'reduce'});
   const page=await context.newPage(),errors=[];
   page.on('pageerror',e=>errors.push(e.message));
   const sample=width===390?items:items.filter((_,idx)=>idx%4===0||idx===items.length-1);
   for(const [id,qToken,ansToken] of sample){
    await page.goto(app.base+'/index.html?class=10&question='+id);
    await page.locator('#stepsList .worked-step').first().waitFor({state:'visible'});
    const source=await page.evaluate(id=>{
     const item=window.TRIGGLE_CLASSES?.[10]?.items.find(item=>item.id===id);
     return item?{question:item.q?.en,answer:item.answer,label:item.label?.en}:null;
    },id);
    assert(source&&source.question.includes(qToken),'Source question matches textbook expression '+id);
    assert(source.answer.includes(ansToken),'Source-verified canonical answer '+id);
    const qText=await page.locator('#questionText').innerText();
    assert(qText.trim().length>=10,'Question text rendered '+id+' @'+width);
    const ansText=await page.locator('#answerText').innerText();
    assert(ansText.trim().length>0&&!/loading/i.test(ansText),'Answer text rendered '+id+' @'+width);
    if(id==='c10-3-ex3-4-q2-iii'){
     for (const lang of ['Ta','En']){
      await page.locator('#lang'+lang).click();
      const rendered=await page.locator('#answerText annotation').textContent();
      assert.match(rendered,/x=-2,\\,1/);
      assert.match(rendered,/(?:Reduced form|எளிய வடிவம்).*x=1/);
     }
    }
    if(id.startsWith('c10-3-ex3-2-')){
     for(const lang of ['Ta','En']){
      await page.locator('#lang'+lang).click();
      const prompt=await page.locator('#questionText').innerText();
      const reasons=await page.locator('#stepsList .step-reason').allInnerTexts();
      if(lang==='Ta'){
       assert.match(prompt,/காண்க/);
       assert(reasons.length>=3 && reasons.slice(0,3).every(t=>/[அ-ஹ]/.test(t)),id);
      }
      if(['c10-3-ex3-2-q2-ii','c10-3-ex3-2-q2-iii'].includes(id)){
       const formula=await page.locator('#questionText .katex-html').innerText();
       const answer=await page.locator('.final-answer-value .katex-html').innerText();
       assert.doesNotMatch(formula+answer,/[−-]/);
       assert.match(answer,id.endsWith('-ii')?/36/:/48/);
      }
     }
    }
    assert((await page.locator('#stepsList .katex').count())>=1,'KaTeX rendered in steps '+id);
    assert((await page.locator('#stepsList li.worked-step').count())>=2,'At least 2 steps '+id);
    assert.equal(await page.locator('[data-math-error]').count(),0,'No KaTeX error '+id);
    assert(await page.locator('#figureBtn').isHidden(),'No decorative figure button on pure-algebra item '+id);
    assert(await page.locator('#inlineFigure').isHidden(),'No decorative inline figure on pure-algebra item '+id);
    assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),'No horizontal overflow '+id+' @'+width);
   }
   if(width===390){
    for(const [start,end] of [
     ['c10-3-ex3-2-q1-iv','c10-3-ex3-2-q2-i'],
     ['c10-3-ex3-3-q1-iii','c10-3-ex3-3-q2-i'],
     ['c10-3-ex3-3-q3-ii','c10-3-ex3-3-q4-i'],
     ['c10-3-ex3-4-q1-iv','c10-3-ex3-4-q2-i'],
     ['c10-3-ex3-5-q1-iii','c10-3-ex3-5-q2-i'],
     ['c10-3-ex3-5-q3-iv','c10-3-ex3-5-q4'],
     ['c10-3-ex3-6-q1-iii','c10-3-ex3-6-q2-i'],
     ['c10-3-ex3-6-q2-ii','c10-3-ex3-6-q3'],
     ['c10-3-ex3-6-q7','c10-3-ex3-6-q8']
    ]){
     await page.goto(app.base+'/index.html?class=10&question='+start);
     await page.locator('#next').click();
     assert.equal(new URL(page.url()).searchParams.get('question'),end,'Next follows textbook order '+start+' -> '+end);
    }
    assert(await page.locator('#next').isDisabled(),'Last question of Exercise 3.6 disables Next button');
    // Check Tamil language toggle fallback on c10-3-ex3-6-q8:
    await page.goto(app.base+'/index.html?class=10&question=c10-3-ex3-6-q8');
    await page.locator('#langTa').click();
    assert((await page.locator('#stepsList .katex').count())>=1,'KaTeX rendered in Tamil fallback view');
    assert.equal(await page.locator('[data-math-error]').count(),0,'No KaTeX error in Tamil fallback view');
   }
   assert.deepEqual(errors,[],'No JS pageerror @'+width);
   await context.close();
  }
  console.log('PASS Grade 10 Ch 3 Exercises 3.2–3.6 browser release: all 49 parts, textbook-order navigation across exercise boundaries, Tamil fallback, 320/390/412px KaTeX and zero horizontal overflow.');
 }finally{await browser.close();await app.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
