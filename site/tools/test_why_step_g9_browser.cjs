'use strict';
const assert=require('node:assert/strict'),{chromium}=require('playwright');
const {server,launchOptions}=require('./dashboard_test_support.cjs');
(async()=>{
 const app=await server(),browser=await chromium.launch(launchOptions());
 try{
  const context=await browser.newContext({viewport:{width:390,height:844},serviceWorkers:'block'});
  const page=await context.newPage(),errors=[],missing=[];
  page.on('pageerror',e=>errors.push(e.message));
  page.on('response',r=>{if(r.status()>=400)missing.push(r.url());});
  const cases=[
   ['g9-ch1-ex1.1-q3-b-i','1'],
   ['g9-ch2-ex9-q6','2'],
   ['g9-ch3-ex3.1-q10','3'],
   ['g9-ch4-ex4.2-q1','4'],
   ['g9-ch5-ex5.2-q5','5'],
   ['c9-exercise-6-1-q1','6'],
   ['g9-ch7-ex7.2-q4','7'],
   ['g9-ch8-ex8.4-q1','8'],
   ['g9-ch9-ex9.1-q4','9']
  ];
  const route=id=>app.base+'/index.html?class=9&question='+id;
  const snapshot=()=>page.evaluate(()=>{
    function content(node){
      const copy=node?.cloneNode(true);
      // Font loading and reflow may independently change overflow affordances.
      copy?.querySelectorAll('.triggle-tex[aria-label="Scrollable mathematical expression"]').forEach(formula=>{
        for(const attribute of ['tabindex','role','aria-label'])formula.removeAttribute(attribute);
      });
      return copy?.innerHTML;
    }
    return {
      q:content(document.querySelector('#questionText')),
      steps:[...document.querySelectorAll('#stepsList li.worked-step:not(.final-answer-step)')].map(li=>content(li.querySelector('.step-equation'))),
      final:content(document.querySelector('.final-answer-step')),
      scroll:document.documentElement.scrollWidth,viewport:innerWidth
    };
  });
  const widths=[320,360,390,393,412,430,768,1280];
  for(const width of widths){
   await page.setViewportSize({width,height:844});
   for(const [id] of cases){
    await page.goto(route(id),{waitUntil:'domcontentloaded'});
    const control=page.locator('#stepsList details.why-step-g9');
    const summary=control.locator('summary');
    await control.waitFor({timeout:12000});
    assert.equal(await control.count(),1,'Quiet one disclosure per authored exercise '+id);
    assert.equal(await control.evaluate(el=>el.open),false,'Collapsed by default '+id);
    assert.ok(await summary.evaluate(el=>el.offsetHeight>=44),'Readable touch target '+id+' @'+width);
    assert.ok(await summary.evaluate(el=>parseFloat(getComputedStyle(el).fontSize)===(innerWidth<=800?12:14)),'Readable disclosure label '+id+' @'+width);
    const before=await snapshot();
    await summary.click();
    assert.equal(await control.evaluate(el=>el.open),true,'Open on tap '+id);
    const explanation=control.locator('.why-step-panel p');
    assert.ok((await explanation.innerText()).length>34,'Explanation is meaningful '+id);
    assert.ok(await explanation.evaluate(el=>parseFloat(getComputedStyle(el).fontSize)>=16),'Explanation uses reader prose scale '+id+' @'+width);
    const after=await snapshot();
    assert.deepEqual(after.q,before.q,'Question unchanged '+id);
    assert.deepEqual(after.steps,before.steps,'Every original mathematical step unchanged '+id);
    assert.deepEqual(after.final,before.final,'Final answer unchanged '+id);
    assert.ok(after.scroll<=Math.max(before.scroll,after.viewport)+1,'No overflow introduced '+id+' @'+width);
    await summary.click();
    assert.equal(await control.evaluate(el=>el.open),false,'Close in place '+id);
   }
  }
  // A relevant set-intersection question gets a conceptual Venn when authored.
  await page.setViewportSize({width:320,height:844});
  await page.goto(route('g9-ch1-ex1.1-q3-b-i'));
  const first=page.locator('#stepsList details.why-step-g9');
  await first.locator('summary').focus();await page.keyboard.press('ArrowRight');
  assert.ok(page.url().includes('question=g9-ch1-ex1.1-q3-b-i'),'Arrow key on summary must not navigate away');
  await page.locator('#langTa').click();
  assert.equal(await page.locator('#stepsList details.why-step-g9').count(),1,'Tamil disclosure accessible');
  await page.locator('#stepsList details.why-step-g9 summary').click();
  const expected=await page.evaluate(()=>window.TriggleWhyStepG9.hints['g9-ch1-ex1.1-q3-b-i'].ta);
  const explanation=page.locator('#stepsList .why-step-g9 .why-step-panel p');
  const original=await explanation.evaluate(node=>{const clone=node.cloneNode(true);clone.querySelectorAll('.triggle-tex').forEach(el=>el.replaceWith(document.createTextNode(el.dataset.mathFallback)));return clone.textContent;});
  assert.equal(original.trim(),expected,'Tamil optional explanation preserves its exact source');
  assert((await explanation.locator('math mo').allTextContents()).includes('∈'),'Membership is semantic MathML in the Tamil explanation');
  assert.ok(await explanation.evaluate(el=>parseFloat(getComputedStyle(el).fontSize)>=16),'Tamil explanation uses reader prose scale');
  await page.goto(route('g9-ch7-ex7.1-q3'));
  const altitude=page.locator('#stepsList details.why-step-g9');
  await altitude.locator('summary').click();
  const sketch=altitude.getByRole('img',{name:'Triangle with an altitude perpendicular to its base'});
  assert.ok(await sketch.isVisible(),'Accessible name describes the generic altitude shown in the figure');
  assert.equal(await sketch.getAttribute('lang'),'en','English figure description is marked in the Tamil interface');
  // Generic diagrams are optional: when present, they must be inline SVG and
  // remain hidden until the specific explanation is opened.
  await page.goto(route('c9-exercise-6-1-q1'));
  const triangle=page.locator('#stepsList details.why-step-g9');
  if(await triangle.locator('figure').count()){
   assert.equal(await triangle.evaluate(el=>el.open),false);
   await triangle.locator('summary').click();
   assert.ok(await triangle.locator('figure svg').count()>0,'Trigonometry figure is original inline vector');
  }
  await page.goto(app.base+'/index.html?class=10&question=c10-1-ex1-1-q4');
  assert.equal(await page.locator('#stepsList .why-step-g9').count(),0,'Grade 10 unaffected');
  assert.equal(await page.locator('#stepsList .why-step-g10').count(),2,'Grade 10 existing explanations retained');
  assert.deepEqual(errors,[],'No browser runtime exceptions');
  assert.deepEqual(missing,[],'No missing resources');
  console.log('PASS Grade 9 Why: nine chapters at '+widths.join('/')+'px, readable disclosures, bilingual switch, keyboard, figure descriptions, preserved questions/equations/answers, and Grade 10 regression.');
  await context.close();
 }finally{await browser.close();await app.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
