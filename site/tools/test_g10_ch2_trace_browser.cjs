'use strict';
/* Student-facing tests of Grade 10 Chapter 2, mobile first, both mediums.
   No exercise screenshots used as a proxy for actual child comprehension. */
const assert=require('node:assert/strict'),{chromium}=require('playwright'),{server,launchOptions}=require('./dashboard_test_support.cjs');

const texSource=locator=>locator.locator('annotation[encoding="application/x-tex"]').textContent();

async function verifyConceptChecks(page,width,language){
 const nav=page.locator('.sp2-nav-button');
 const answerPositions=[2,0,0,1,2,0,2,1,0,0,1,1,1,1,2];
 for(const [i,correct] of answerPositions.entries()){
  await nav.nth(i).click();
  const panel=page.locator('.sp2-panel');
  const answers=panel.locator('[data-answers] button');
  const why=panel.locator('[data-why]'),response=panel.locator('[data-why-response]');
  const feedback=panel.locator('[data-feedback]');
  const label='Concept '+(i+1)+', '+language+', '+width+'px';
  assert(await why.isDisabled(),label+' waits for an attempt');
  await panel.locator('[data-hint]').click();
  assert(await why.isDisabled(),label+' still waits after a hint');
  const clues=[];
  for(let j=0;j<3;j++){
   if(j===correct)continue;
   await answers.nth(j).press('Enter');
   assert.equal(await answers.nth(j).getAttribute('aria-pressed'),'true',label+' keeps selection');
   assert(await response.isHidden(),label+' gives feedback before working');
   clues.push(await feedback.innerText());
  }
  assert.notEqual(clues[0],clues[1],label+' addresses the two misconceptions separately');
  await answers.nth(correct).press('Enter');
  assert.match(await feedback.innerText(),language==='ta'?/சரி!/:/Correct!/,label+' grades the intended answer');
  await why.press('Enter');
  assert(await response.isVisible(),label+' explains the answer after an attempt');
  const layout=await panel.evaluate(async panel=>{
   await document.fonts.ready;
   const visible=node=>node.getClientRects().length>0;
   const targets=[...panel.querySelectorAll('button,input[type=range],summary')].filter(visible);
   const formulas=[...panel.querySelectorAll('.triggle-tex-display')].filter(visible);
   return {pageWidth:document.documentElement.scrollWidth,language:document.documentElement.lang,
    smallTargets:targets.filter(node=>node.offsetWidth<44||node.offsetHeight<44).map(node=>node.textContent),
    wideFormulas:formulas.filter(node=>node.scrollWidth>node.clientWidth+1).map(node=>node.dataset.mathFallback),
    mathErrors:panel.querySelectorAll('[data-math-error]').length};
  });
  assert(layout.pageWidth<=width+1,label+' has no page overflow');
  assert.equal(layout.language,language,label+' has the correct document language');
  assert.deepEqual(layout.smallTargets,[],label+' has 44px touch targets');
  assert.deepEqual(layout.wideFormulas,[],label+' has no equation overflow');
  assert.equal(layout.mathErrors,0,label+' renders all authored TeX, including worked feedback');
  await page.locator('[data-back-index]').click();
 }
}

async function verifyQuizSection(page,base,language){
 await page.goto(base+'/index.html?class=10&chapter=g10-ch2&section=quizzes');
 const questions=page.locator('.hub-quiz-question');
 assert.equal(await questions.count(),15);
 const sequence=questions.nth(6);
 assert.equal(await texSource(sequence.locator(':scope > .triggle-tex-display')),'a_n=2n+1');
 const help=sequence.locator('details');
 await help.locator('summary').press('Enter');
 assert(await help.locator('.triggle-tex-display').isHidden());
 await sequence.locator('.hub-quiz-answers button').first().press('Enter');
 assert.match(await sequence.locator('.hub-quiz-feedback').innerText(),language==='ta'?/6 என்பது இடம்/:/Six is the position/);
 assert(await help.locator('.triggle-tex-display').isVisible());
 assert.equal(await texSource(help),'a_6=2\\times6+1=13');
}

async function assertSpecialMathFits(page,width,language){
 await page.evaluate(async()=>{await document.fonts.ready;});
 const layout=await page.locator('.sp2-panel').evaluate(panel=>({
  pageWidth:document.documentElement.scrollWidth,
  forms:[...panel.querySelectorAll('.triggle-tex-display')].filter(el=>el.getClientRects().length).map(el=>{
   const box=el.getBoundingClientRect();
   const clipped=[...el.querySelectorAll('.katex-html .base')].some(base=>{
    const glyphs=base.getBoundingClientRect();
    return glyphs.width&&(glyphs.left<box.left-1||glyphs.right>box.right+1||
     glyphs.top<box.top-1||glyphs.bottom>box.bottom+1);
   });
   return {clipped,overflow:el.scrollWidth>el.clientWidth+1,tex:el.querySelector('annotation')?.textContent};
  })
 }));
 assert(layout.pageWidth<=width+1,'Special Series stays inside '+width+'px ('+language+')');
 assert(layout.forms.length>5,'Real display equations are visible');
 assert.deepEqual(layout.forms.filter(form=>form.clipped||form.overflow),[],'No formula clipping at '+width+'px ('+language+')');
}

async function verifySpecialSeries(page,language,width){
 const ta=language==='ta',lesson=page.locator('.g10ch2-special');
 const demo=lesson.locator('.g10ch2-discovery');
 const modes=demo.getByRole('button');
 const slider=demo.getByRole('slider',{name:ta?'எத்தனை உறுப்புகள்?':'How many terms?'});
 const formula=demo.locator('.g10ch2-discovery-math');
 const answers=page.locator('.sp2-answers button');
 const response=page.locator('[data-why-response]'),why=page.locator('[data-why]'),feedback=page.locator('[data-feedback]');
 assert.deepEqual(await modes.allTextContents(),ta?['இயல் எண்கள்','வர்க்கங்கள்','கனங்கள்']:['Natural numbers','Squares','Cubes']);
 assert.equal(await modes.nth(1).getAttribute('aria-pressed'),'true','Squares demonstration starts selected');
 assert.equal(await slider.inputValue(),'4');
 assert((await texSource(formula)).includes('\\frac{4(4+1)(2\\times4+1)}{6}'),'Display 2 × 4, never the concatenated 24');
 assert(await why.isDisabled(),'Worked feedback requires an attempt');
 assert.equal(await response.textContent(),'','Worked answer is absent before an attempt');
 assert.equal(await texSource(page.locator('.sp2-recall')),'1^2+2^2+\\cdots+9^2=?');
 assert.deepEqual(await answers.allTextContents(),['45','2025','285']);
 for(const answer of await answers.all())assert.equal(await answer.getAttribute('aria-pressed'),'false');
 await page.locator('[data-hint]').click();
 assert.doesNotMatch(await feedback.innerText(),/\b285\b/);
 assert(await why.isDisabled(),'Opening a hint does not count as an attempt');

 const totals=[[1,3,6,10,15,21,28,36],[1,5,14,30,55,91,140,204],[1,9,36,100,225,441,784,1296]];
 const oddFactors=[3,5,7,9,11,13,15,17];
 const fraction=(numerator,denominator)=>'\\frac{'+numerator+'}{'+denominator+'}';
 for(const power of [1,2,3]){
  await modes.nth(power-1).click();
  assert.equal(await modes.nth(power-1).getAttribute('aria-pressed'),'true');
  await slider.press('End');
  assert.equal(await slider.inputValue(),'8','Keyboard can select the largest term count');
  await slider.press('Home');
  assert.equal(await slider.inputValue(),'1','Keyboard can select the boundary case');
  for(let n=1;n<=8;n++){
   await slider.fill(String(n));
   const terms=demo.locator('.g10ch2-discovery-chip');
   const direct=Array.from({length:n},(_,i)=>(i+1)**power).reduce((sum,k)=>sum+k,0);
   assert.equal(direct,totals[power-1][n-1]);
   assert.equal(await terms.count(),n,'One chip per term');
   assert.deepEqual(await terms.evaluateAll(chips=>chips.map(chip=>chip.querySelector('annotation')?.textContent||chip.textContent)),
    Array.from({length:n},(_,i)=>String(i+1)+(power===1?'':'^'+power)));
   const [substituted,simplified]=[
    [fraction(n+'\\times('+n+'+1)',2),fraction(n+'\\times'+(n+1),2)],
    [fraction(n+'('+n+'+1)(2\\times'+n+'+1)',6),fraction(n+'\\times'+(n+1)+'\\times'+oddFactors[n-1],6)],
    ['\\left('+fraction(n+'\\times('+n+'+1)',2)+'\\right)^2',totals[0][n-1]+'^2']
   ][power-1];
   assert.equal(await texSource(formula),
    '\\begin{aligned}S_{'+n+'}&='+substituted+'\\\\&='+simplified+'\\\\&='+direct+'\\end{aligned}',
    'Check both numerical expressions and their total for power '+power+' at n='+n);
   assert.match(await demo.getByRole('status').textContent(),new RegExp(' '+direct+'$'));
  }
  await assertSpecialMathFits(page,width,language);
 }
 assert.doesNotMatch(await lesson.innerText(),/\b285\b/,'No slider state supplies the independent answer');
 assert(await why.isDisabled());
 assert.equal(await response.textContent(),'','Moving demonstration controls cannot populate the answer');

 const odd=lesson.locator('.g10ch2-special-odd');
 assert(await odd.locator('.katex').isHidden(),'Odd-number derivation is optional');
 await odd.locator('summary').press('Enter');
 assert.match(await texSource(odd),/S_4&=1\+3\+5\+7=16/);
 await assertSpecialMathFits(page,width,language);
 await odd.locator('summary').press('Enter');

 const diagram=lesson.getByRole('img',{name:ta?/முக்கோணத்தின் மூன்று/:/Three rotations/});
 assert(await diagram.isVisible());
 assert.equal(await diagram.locator('rect').count(),24,'Six cells in each of four groups');
 const labels=await diagram.locator('[data-triangle]').evaluateAll(groups=>groups.map(group=>
  [...group.querySelectorAll('[data-triangle-row]')].map(row=>[...row.querySelectorAll('text')].map(text=>text.textContent))));
 assert.deepEqual(labels,[
  [['1'],['2','2'],['3','3','3']],
  [['3'],['3','2'],['3','2','1']],
  [['3'],['2','3'],['1','2','3']],
  [['7'],['7','7'],['7','7','7']]
 ]);
 assert.match(await diagram.locator('desc').textContent(),ta?/முதல் முக்கோணம்/:/First triangle/);
 const proof=lesson.locator('.g10ch2-special-proof'),summary=proof.locator('summary');
 const identities=proof.locator('.g10ch2-special-math');
 assert(await identities.first().isHidden(),'Cube derivation is optional');
 await summary.press('Enter');
 assert(await identities.first().isVisible(),'Keyboard opens the cube derivation');
 assert((await texSource(identities.nth(2))).includes('T_k^2-T_{k-1}^2'));
 assert((await texSource(identities.last())).includes('T_3^2-T_0^2'));
 assert((await texSource(lesson.locator('.g10ch2-special-section').last())).includes('385-30=355'));
 await assertSpecialMathFits(page,width,language);
 await summary.press('Enter');
 assert(await identities.first().isHidden());

 await answers.first().click();
 assert.match(await feedback.innerText(),ta?/இயல் எண்களின் கூடுதல்/:/adds the natural numbers/);
 assert(await response.isHidden(),'Wrong attempts get a hint before showing the full solution');
 await answers.nth(1).click();
 assert.match(await feedback.innerText(),ta?/கனங்களின் கூடுதல்/:/sum of cubes/);
 await answers.nth(2).click();
 assert.match(await feedback.innerText(),ta?/சரி!/:/Correct!/);
 await why.click();
 assert.equal(await why.getAttribute('aria-expanded'),'true');
 assert((await texSource(response)).includes('\\frac{9\\times10\\times19}{6}=285'));
 await assertSpecialMathFits(page,width,language);
 assert.equal(await page.locator('[data-math-error]').count(),0);

 await page.locator('.g10ch2-practice-link').click();
 assert.equal(new URL(page.url()).searchParams.get('question'),'c10-2-ex2-9-q1-v','Pairs with textbook Exercise 2.9 Q1(v)');
 await page.locator('#stepsList .worked-step').first().waitFor({state:'visible'});
 assert.match(await page.locator('#answerText').innerText(),/3256/,'Original textbook exercise solution is available');
}

async function verifySpecialOffline(browser,base){
 const context=await browser.newContext({viewport:{width:320,height:852},isMobile:true,hasTouch:true});
 try{
  const page=await context.newPage();
  const oldCache='triggle-g9-math-first-student-lab-hcf-gp-20261118-g9-lesson-read-special-series-g9ex32';
  await page.goto(base+'/grades.html');
  await page.evaluate(async cacheName=>{
   const cache=await caches.open(cacheName);
   await cache.put('./assets/g10-ch2-discovery-labs.js',new Response('Old lesson asset'));
  },oldCache);
  await page.goto(base+'/index.html?class=10&chapter=g10-ch2&section=concepts&concept=14');
  await page.waitForFunction(()=>!!navigator.serviceWorker.controller);
  assert(!await page.evaluate(cacheName=>caches.has(cacheName),oldCache),'Activation clears the previous offline cache');
  await context.setOffline(true);
  await page.reload({waitUntil:'domcontentloaded'});
  const demo=page.locator('.g10ch2-special .g10ch2-discovery');
  await demo.waitFor({state:'visible'});
  assert((await texSource(demo.locator('.g10ch2-discovery-math'))).includes('2\\times4+1'));
  await page.locator('#langTa').click();
  await demo.getByRole('button',{name:'கனங்கள்'}).click();
  assert.match(await demo.getByRole('status').textContent(),/100$/);
  assert.equal(await page.locator('[data-math-error]').count(),0,'KaTeX and Tamil lesson run from offline assets');
 }finally{await context.close();}
}

async function main(){
 const app=await server(),browser=await chromium.launch(launchOptions());
 try{
  for(const width of [320,360,393,430]){
   const context=await browser.newContext({viewport:{width,height:852},deviceScaleFactor:1,isMobile:true,hasTouch:true,serviceWorkers:'block',reducedMotion:'reduce'});
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
    assert.equal(await group.inputValue(),'34','Division opens on the taught example');
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
    // Student Psychology Lab: every Euclidean step must be readable on a narrow phone.
    assert.equal(await page.locator('.g10ch2-hcf-step').count(),3,'HCF uses three visible division steps');
    assert.equal(await page.locator('[data-g10ch2-visual] input[type=range]').count(),0,'HCF needs no number-selection slider');
    assert.equal(await page.locator('.sp2-formula').count(),0,'Do not clip a chained gcd equality');
    assert((await page.locator('.g10ch2-hcf-answer').innerText()).includes('4'),'HCF ends with the last nonzero remainder');
    assert((await page.locator('.g10ch2-hcf-step').last().innerText()).includes('0'),'HCF shows the final zero remainder');
    for(const math of await page.locator('.g10ch2-hcf-equation').all()){
      const bounds=await math.evaluate(el=>({width:el.clientWidth,scroll:el.scrollWidth}));
      assert(bounds.scroll<=bounds.width+1,'HCF math must not require horizontal scrolling: '+JSON.stringify(bounds));
    }
    assert.equal(await page.locator('[data-math-error]').count(),0,'HCF steps render without notation errors');
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
    // Re-enter concepts and exercise the weakest redesigned lessons in both languages.
    await page.goto(url);
    await page.locator(language==='en'?'#langEn':'#langTa').click();
    await page.locator('.sp2-nav-button').nth(4).click();
    const clock=page.locator('[data-g10ch2-visual] input[type=range]');
    assert.equal(await clock.inputValue(),'45','Clock starts at its 45-day example');
    assert((await page.locator('.g10ch2-visual-feedback').innerText()).includes('45 = 7 × 6 + 3'),'Clock makes the full-cycle division visible');
    assert.equal(await page.locator('.g10ch2-chip.is-selected').innerText(),language==='ta'?'வெள்ளி':'Friday');
    await clock.press('Home');
    assert.equal(await page.locator('.g10ch2-chip.is-selected').innerText(),language==='ta'?'செவ்வாய்':'Tuesday');
    await page.locator('[data-back-index]').click();
    await page.locator('.sp2-nav-button').nth(5).click();
    const congruence=page.locator('[data-g10ch2-visual] input[type=range]');
    assert.equal(await congruence.inputValue(),'14','Congruence starts at the teaching example');
    assert((await page.locator('.g10ch2-visual-feedback').innerText()).includes('14 ≡ 4 (mod 5)'),'Congruence joins the remainder to its residue');
    await page.locator('[data-back-index]').click();
    await page.locator('.sp2-nav-button').nth(6).click();
    const position=page.locator('[data-g10ch2-visual] input[type=range]');
    assert.equal(await position.inputValue(),'4','One-based term-position slider');
    assert((await page.locator('.g10ch2-visual-feedback').innerText()).includes('4 = 11'),'Fourth sequence term corresponds to position four');
    await position.fill('5');
    assert((await page.locator('.g10ch2-visual-feedback').innerText()).includes('5 = 14'),'Student can reveal the next sequence term');
    await page.locator('[data-back-index]').click();
    await page.locator('.sp2-nav-button').nth(7).click();
    assert((await page.locator('.sp2-formula').innerText()).includes('a'), 'Recursive rule is visible');
    assert.equal(await page.locator('[data-math-error]').count(),0,'Recursive initial terms render');
    await page.locator('[data-back-index]').click();
    await page.locator('.sp2-nav-button').nth(11).click();
    assert.equal(await page.locator('[data-g10ch2-visual] input[type=range]').count(),0,'GP uses meaningful term controls');
    const gpTerms=page.locator('.g10ch2-gp-term');
    assert.equal(await gpTerms.count(),4,'GP displays all four terms together');
    assert((await page.locator('.g10ch2-gp-equation').innerText()).includes('5 × 3 = 15'),'GP initially demonstrates multiplication');
    await gpTerms.nth(3).click();
    assert.equal(await gpTerms.nth(3).getAttribute('aria-pressed'),'true','Selected term announced to assistive tech');
    assert((await page.locator('.g10ch2-gp-equation').innerText()).includes('45 × 3 = 135'),'Last term explains the operation');
    await page.locator('.g10ch2-gp-actions button').first().click();
    assert((await page.locator('.g10ch2-gp-equation').innerText()).includes('15 × 3 = 45'),'Previous restores earlier multiplication');
    await gpTerms.first().focus();
    await page.keyboard.press('Enter');
    assert((await page.locator('.g10ch2-gp-equation').innerText()).trim()==='5','Keyboard selection reaches starting term');
    assert.equal(await page.locator('[data-math-error]').count(),0,'GP formula and multiplication render cleanly');
    assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),'GP fits mobile viewport without page-wide overflow');
    await page.locator('[data-back-index]').click();
    await page.locator('.sp2-nav-button').nth(12).click();
    const gpNext=page.locator('.gp-lab-actions button').last();
    for(let step=0;step<3;step++)await gpNext.click();
    assert((await page.locator('.gp-lab-math').innerText()).includes('15'),'GP cancellation yields 15');
    await gpNext.click();
    assert(await page.locator('.gp-lab-general').isVisible(),'General formula revealed last');
    await page.locator('[data-back-index]').click();
    await page.locator('.sp2-nav-button').nth(13).click();
    const ratios=page.locator('.g10ch2-discovery-choices button');
    assert.equal(await ratios.count(),5,'Include an alternating negative ratio');
    await ratios.nth(1).click();
    assert.equal(await ratios.nth(1).getAttribute('aria-pressed'),'true');
    await page.locator('.g10ch2-discovery-range-row input').fill('6');
    assert((await page.locator('.g10ch2-discovery-note').innerText()).includes('0.65625'),'Negative-ratio partial sum');
    assert(await page.locator('.g10ch2-discovery-track').isHidden(),'No deceptive progress bar for oscillation');
    await ratios.nth(2).click();
    assert.match(await texSource(page.locator('.g10ch2-discovery-math').first()),/\\approx/,'A rounded partial sum uses approximate equality');
    assert.match(await texSource(page.locator('.g10ch2-discovery-math').last()),/S_\{\\infty\}/,'An exact limit rule is available before the check');
    assert.equal(await page.locator('[data-math-error]').count(),0);
    await page.locator('[data-back-index]').click();
    await page.locator('.sp2-nav-button').nth(14).click();
    assert.equal(new URL(page.url()).searchParams.get('concept'),'14','Concept 15 retains its direct URL');
    await verifySpecialSeries(page,language,width);
    await page.goto(url);
    await verifyConceptChecks(page,width,language);
    if(width===320)await verifyQuizSection(page,app.base,language);
   }
   assert.deepEqual(errors,[],'No uncaught JavaScript exceptions at '+width);
   await context.close();
   console.log('PASS G10 Ch2 foundations and all Special Series modes EN/TA at '+width+'px');
  }
  await verifySpecialOffline(browser,app.base);
  console.log('PASS Special Series offline cache migration, reload and bilingual interaction');
 }finally{await browser.close();await app.close()}
}
if(require.main===module)main().catch(e=>{console.error(e);process.exitCode=1;});
module.exports={verifySpecialSeries};
