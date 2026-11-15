'use strict';
const assert=require('node:assert/strict'),{chromium}=require('playwright');
const {server,launchOptions}=require('./dashboard_test_support.cjs');
(async()=>{
 const app=await server(),browser=await chromium.launch(launchOptions());
 try{
  for(const width of [320,390]){
   const context=await browser.newContext({viewport:{width,height:760},serviceWorkers:'block',reducedMotion:'reduce'});
   const page=await context.newPage(),errors=[];
   page.on('pageerror',e=>errors.push(e.message));
   for(const [id,queryToken,answerToken] of [
    ['q2-i','n³','62'],['q2-ii','(−1)','−20'],['q2-iii','2n²','26'],
    ['q3-i','2, 5, 10','n²'],['q3-ii','1/2','(n − 1)/n'],['q3-iii','3, 8, 13','5n'],
    ['q4-i','5n','15/4'],['q4-ii','n²','−117'],['q5','even','225/31'],['q6','a₁','41']
   ]){
    await page.goto(app.base+'/index.html?class=10&question=c10-2-ex2-4-'+id);
    await page.locator('#stepsList .worked-step').first().waitFor({state:'visible'});
    // Rendering replaces Unicode powers/fractions with KaTeX MathML. Never
    // compare visual innerText against unrendered Unicode source bytes.
    const source=await page.evaluate(id=>{
      const item=window.TRIGGLE_CLASSES?.[10]?.items.find(item=>item.id===id);
      return item?{question:item.q?.en,answer:item.answer,label:item.label?.en}:null;
    },'c10-2-ex2-4-'+id);
    assert(source&&source.question.includes(queryToken),
      'Exact source question must match the specified textbook expression '+id);
    assert(source.answer.includes(answerToken),'Source-verified canonical answer '+id);
    const q=await page.locator('#questionText').innerText();
    assert(q.length>=10&&q.startsWith(source.question.split(/\s+/)[0]),
      'Actual question text must be displayed, not a loading placeholder '+id+' @'+width+': '+q);
    const answer=await page.locator('#answerText').innerText();
    assert(answer.trim().length>0&&!/loading/i.test(answer),
      'Rendered final answer must be visible '+id+' @'+width+': '+answer);
    assert((await page.locator('#stepsList .katex').count())>=1,
      'Student working must render at least one mathematical expression '+id);
    assert((await page.locator('#stepsList li.worked-step').count())>=2,'At least two explained steps '+id);
    assert.equal(await page.locator('[data-math-error]').count(),0,'Math notation correctly typeset '+id);
    assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),
      'No horizontal overflow '+id+' @'+width);
   }
   // Q1 is one published grouped lesson with three subparts. The separately
   // authored Q1(i–iii) drafts are intentionally suppressed to avoid duplicate
   // student questions; the next visible lesson must be Q2(i).
   const q1=await page.evaluate(()=>{
     const rows=window.TRIGGLE_CLASSES?.[10]?.items||[];
     return {grouped:rows.some(r=>r.id==='c10-2-ex2-4-q1'),
       suppressed:['i','ii','iii'].every(s=>!rows.some(r=>r.id==='c10-2-ex2-4-q1-'+s))};
   });
   assert(q1.grouped&&q1.suppressed,
     'Exercise 2.4 Q1 must be one canonical grouped lesson, not duplicated');
   for(const [start,end] of [
    ['q1','q2-i'],['q2-i','q2-ii'],['q2-iii','q3-i'],
    ['q3-iii','q4-i'],['q4-ii','q5'],['q5','q6']
   ]){
    await page.goto(app.base+'/index.html?class=10&question=c10-2-ex2-4-'+start);
    await page.locator('#next').click();
    assert.equal(new URL(page.url()).searchParams.get('question'),'c10-2-ex2-4-'+end,
      'Next follows printed Exercise 2.4 order '+start+' to '+end);
   }
   assert.deepEqual(errors,[],'No application JS error @'+width);
   await context.close();
  }
  console.log('PASS Grade 10 Exercise 2.4 full student release: all 10 parts, textbook-order navigation, 320/390px KaTeX, steps, answers and no overflow.');
 }finally{await browser.close();await app.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
