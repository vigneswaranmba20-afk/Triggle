'use strict';
const assert=require('node:assert/strict'),{chromium}=require('playwright');
const {server,launchOptions}=require('./dashboard_test_support.cjs');
(async()=>{
 const app=await server(),browser=await chromium.launch(launchOptions());
 try{
  const items=[
   ['c10-2-ex2-10-q6','7^{4k}','Option (A)'],
   ['c10-2-ex2-10-q13','3/16','Option (B)'],
   ['c10-2-ex2-10-q15','15³','Option (C)'],
   ['c10-2-unit-q1','n² − n','multiple of 2'],
   ['c10-2-unit-q2-i','175 litres','35 litres'],
   ['c10-2-unit-q2-ii','cow’s milk','5'],
   ['c10-2-unit-q2-iii','buffalow’s milk','3'],
   ['c10-2-unit-q3','a + 2b + 3c','1'],
   ['c10-2-unit-q4','107','4(26) + 3'],
   ['c10-2-unit-q5','(3m + 1)th','2t_{m+n+1}'],
   ['c10-2-unit-q6','12th term','−78'],
   ['c10-2-unit-q7','same common difference','5'],
   ['c10-2-unit-q8','16500','1200'],
   ['c10-2-unit-q9','9√6','√2, √6'],
   ['c10-2-unit-q10','45,000','27636'],
   ['c10-3-ex3-1-q2-i','x + 2y − z = 6','infinitely many'],
   ['c10-3-ex3-1-q2-ii','3(−x + 1)','no solution'],
   ['c10-3-ex3-1-q2-iii','x + y + z = 27','unique solution'],
   ['c10-3-ex3-1-q3','Vani','24 years, 51 years, 84 years'],
   ['c10-3-ex3-1-q4','three-digit','137'],
   ['c10-3-ex3-1-q5','12 pieces','7, 3, 2']
  ];
  for(const width of [320,390,412]){
   const context=await browser.newContext({viewport:{width,height:780},serviceWorkers:'block',reducedMotion:'reduce'});
   const page=await context.newPage(),errors=[];
   page.on('pageerror',e=>errors.push(e.message));
   for(const [id,qToken,ansToken] of items){
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
    assert((await page.locator('#stepsList .katex').count())>=1,'KaTeX rendered in steps '+id);
    assert((await page.locator('#stepsList li.worked-step').count())>=2,'At least 2 steps '+id);
    assert.equal(await page.locator('[data-math-error]').count(),0,'No KaTeX error '+id);
    assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),'No horizontal overflow '+id+' @'+width);
   }
   if(width===390){
    for(const [start,end] of [
     ['c10-2-ex2-10-q5','c10-2-ex2-10-q6'],
     ['c10-2-ex2-10-q6','c10-2-ex2-10-q7'],
     ['c10-2-ex2-10-q12','c10-2-ex2-10-q13'],
     ['c10-2-ex2-10-q13','c10-2-ex2-10-q14'],
     ['c10-2-ex2-10-q14','c10-2-ex2-10-q15'],
     ['c10-2-unit-q1','c10-2-unit-q2-i'],
     ['c10-2-unit-q2-iii','c10-2-unit-q3'],
     ['c10-2-unit-q9','c10-2-unit-q10'],
     ['c10-3-ex3-1-q1-iii','c10-3-ex3-1-q2-i'],
     ['c10-3-ex3-1-q2-iii','c10-3-ex3-1-q3'],
     ['c10-3-ex3-1-q4','c10-3-ex3-1-q5']
    ]){
     await page.goto(app.base+'/index.html?class=10&question='+start);
     await page.locator('#next').click();
     assert.equal(new URL(page.url()).searchParams.get('question'),end,'Next follows textbook order '+start+' -> '+end);
    }
   }
   assert.deepEqual(errors,[],'No JS pageerror @'+width);
   await context.close();
  }
  console.log('PASS Grade 10 Ex 2.10, Unit Ex 2, and Ex 3.1 browser release: all 21 parts, textbook-order navigation, 320/390/412px KaTeX and zero horizontal overflow.');
 }finally{await browser.close();await app.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
