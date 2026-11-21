'use strict';
const assert=require('node:assert/strict');
const fs=require('node:fs/promises');
const http=require('node:http');
const path=require('node:path');
const {chromium}=require('playwright');
const root=path.resolve(__dirname,'..');
const sourceText=locator=>locator.evaluate(node=>{const clone=node.cloneNode(true);clone.querySelectorAll('.triggle-tex').forEach(el=>el.replaceWith(document.createTextNode(el.dataset.mathFallback)));return clone.textContent;});
// Older interaction tests exercise the expanded state deliberately.
// A separate quiet-reader test verifies that real students start with Q+A only.
async function gotoWithControls(page,...args){
  const navigate=page.goto.bind(page);
  const response=await navigate(...args);
  if(await page.evaluate(()=>Boolean(window.TriggleQuietReader?.isActive())))
    await page.keyboard.press('Tab'); // accessible first-gesture reveal
  return response;
}

async function checkConcepts(browser, base) {
 const route = base + '/index.html?class=9&chapter=g9-ch9&section=concepts';
 const shots = process.env.PROBABILITY_SCREENSHOTS;
 if (shots) await fs.mkdir(shots, {recursive: true});
 const practiceAnswers = [1, 2, 1, 2, 2];
 for (const width of [320, 360, 393, 430, 390, 412]) {
  const ctx = await browser.newContext({viewport: {width, height: 700}, hasTouch: true, isMobile: true});
  try {
   // A controlled sequence verifies the UI without expecting a random run to hit 50%.
   await ctx.addInitScript(() => {
    let calls = 0;
    Math.random = () => calls++ === 0 ? 0.1 : 0.9;
   });
   const page = await ctx.newPage();
   const errors = [];
   page.on('pageerror', error => errors.push(error.message));
   await page.goto(base + '/index.html?class=9&chapter=g9-ch9');
   const chapterSummary=await page.locator('[data-chapter-id="g9-ch9"] small').textContent();
   assert.match(chapterSummary,/5 interactive concepts.*25 exercise/, 'Sidebar uses the live probability concepts and exercise counts');
   await page.locator('button[data-hub-section="concepts"]').click();
   const journey = page.locator('.sp2-simple-journey');
   const index = journey.locator('[data-index-view]');
   const lesson = page.locator('.probability-lesson');
   await index.waitFor({state: 'visible'});
   assert.equal(await index.locator('button').count(), 5);
   assert.equal(await page.locator('.hub-back-menu').isVisible(), true);
   assert.equal(await page.locator('[data-adaptive-dock]').isVisible(), false);
   assert.equal(await page.getByRole('button', {name: /Worked Examples/}).count(), 0);
   if (shots) await page.screenshot({path: path.join(shots, width + '-index.png')});

   for (const lang of ['en', 'ta']) {
    for (let i = 0; i < 5; i++) {
     await page.goto(route + '&concept=' + i);
     await page.locator(lang === 'en' ? '#langEn' : '#langTa').click();
     await lesson.waitFor({state: 'visible'});
     assert.equal(await page.locator('html').getAttribute('lang'), lang);
     assert.equal(await lesson.getAttribute('lang'), 'en');
     assert.equal(await page.locator('.probability-language').isVisible(), lang === 'ta');
     assert.equal(await index.isVisible(), false);
     assert.equal(await page.locator('.hub-back-menu').isVisible(), false);
     assert.equal(await page.locator('[data-back-index]').isVisible(), true);
     assert.equal(await page.locator('[data-top-next]').count(), 1);
     assert.equal(await page.locator('[data-top-next]').isVisible(), true);
     assert.equal(await page.locator('[data-adaptive-dock]').isVisible(), true);
     assert.match(await journey.locator('h4').innerText(), new RegExp('^9\\.' + (i + 1) + ' '));

     const controls = lesson.locator('.probability-demo button');
     assert.ok(await controls.count() >= 2);
     const lastControl = await controls.last().boundingBox();
     const visual = await lesson.locator('.probability-outcomes, .probability-comparison').boundingBox();
     assert.ok(lastControl.y + lastControl.height <= visual.y, 'Controls are above the visual');
     assert.ok(lastControl.y + lastControl.height < 700, 'Controls fit in the first viewport at ' + width);
     assert.ok(await controls.evaluateAll(nodes => nodes.every(node => node.offsetHeight >= 44 && node.offsetWidth >= 44)));
     if (shots) await page.screenshot({path: path.join(shots, width + '-' + lang + '-9.' + (i + 1) + '.png')});

     const result = lesson.locator('.probability-result');
     if (i === 0) {
      assert.equal(await lesson.locator('.probability-match').count(), 3);
      await controls.nth(1).focus();
      await page.keyboard.press('Enter');
      assert.equal(await lesson.locator('.probability-match').count(), 0);
      assert.match(await result.innerText(), /sun is impossible/);
      await controls.nth(2).tap();
      assert.equal(await lesson.locator('.probability-match').count(), 4);
     } else if (i === 1) {
      assert.deepEqual(await lesson.locator('.probability-outcomes li').allTextContents(), ['RR', 'RB', 'BR', 'BB']);
      await controls.nth(1).tap();
      assert.deepEqual(await lesson.locator('.probability-match').allTextContents(), ['RB ✓', 'BR ✓']);
      assert.match(await result.innerText(), /which flash is blue/);
     } else if (i === 2) {
      assert.equal(await lesson.locator('.probability-match').count(), 3);
      await controls.nth(1).tap();
      assert.deepEqual(await lesson.locator('.probability-match').allTextContents(), ['3 ✓', '6 ✓']);
      assert.match(await result.innerText(), /one-third/);
     } else if (i === 3) {
      assert.equal(await result.locator('math').count(), 0, 'No fraction with zero trials');
      await controls.first().tap();
      assert.match(await result.innerText(), /1 head in 1 toss, above/);
      await controls.nth(1).tap();
      assert.match(await result.innerText(), /1 head in 21 tosses, below/);
      assert.equal(await lesson.locator('meter').last().evaluate(el => el.value), 1 / 21);
      await controls.last().tap();
      assert.match(await result.innerText(), /start counting/);
      assert.equal(await lesson.locator('meter').last().isVisible(), false);
      await controls.first().tap();
      assert.match(await result.innerText(), /0 heads in 1 toss, below/);
     } else {
      const membership = lesson.locator('.probability-outcomes li');
      assert.deepEqual(await membership.allTextContents(), ['1 · A', '2 · A', '3 · A', '4 · A']);
      await controls.nth(1).tap();
      assert.equal(await lesson.locator('[data-matches="Neither"]').count(), 2);
      await controls.nth(2).tap();
      assert.equal(await lesson.locator('[data-matches="Neither"]').count(), 0);
      assert.match(await result.innerText(), /exactly one rule/);
      await controls.last().tap();
      assert.match(await result.innerText(), /Ticket 4 matches both/);
      assert.equal(await lesson.locator('[data-matches="A and B"]').innerText(), '4 · A and B');
     }
     const detail = lesson.locator('details');
     assert.equal(await detail.getAttribute('open'), null);
     await detail.locator('summary').tap();
     const math = detail.locator('math');
     assert.equal(await math.count(), 1);
     assert.equal(await lesson.locator('.math-fallback').count(), 0);
     await page.evaluate(() => document.fonts.ready);
     assert.ok(await lesson.locator('.triggle-tex').evaluateAll(nodes => nodes.every(node => node.scrollWidth <= node.clientWidth + 1)), 'KaTeX fits at ' + width + ' for concept ' + (i + 1));
     assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), 'Page fits at ' + width);
     const choices = lesson.locator('.probability-answers button');
     await choices.first().tap();
     assert.match(await lesson.locator('.probability-feedback').innerText(), /^Try again/);
     await choices.nth(practiceAnswers[i]).tap();
     assert.match(await lesson.locator('.probability-feedback').innerText(), /^Correct/);
    }
   }

   await page.goto(route + '&concept=99');
   assert.equal(await index.isVisible(), true, 'Out-of-range route falls back to the index');
   await index.locator('button').first().tap();
   assert.equal(new URL(page.url()).searchParams.get('concept'), '0');
   assert.equal(await journey.locator('[data-footer-prev]').isDisabled(), true);
   await journey.locator('[data-top-next]').tap();
   assert.equal(new URL(page.url()).searchParams.get('concept'), '1');
   await page.goBack();
   assert.match(await journey.locator('h4').innerText(), /^9\.1/);
   await journey.locator('[data-footer-next]').tap();
   assert.equal(new URL(page.url()).searchParams.get('concept'), '1');
   await page.goBack();
   assert.match(await journey.locator('h4').innerText(), /^9\.1/);
   await journey.locator('[data-back-index]').tap();
   await index.locator('button').last().tap();
   await journey.locator('[data-footer-next]').tap();
   assert.equal(await index.isVisible(), true);
   assert.equal(new URL(page.url()).searchParams.has('concept'), false);
   assert.deepEqual(errors, [], 'No page errors at ' + width);
  } finally {
   await ctx.close();
  }
 }

 const ctx = await browser.newContext({viewport: {width: 360, height: 700}});
 try {
  const page = await ctx.newPage();
  await page.goto(route);
  await page.waitForFunction(() => navigator.serviceWorker.controller);
  await ctx.setOffline(true);
  await page.goto(route + '&concept=3');
  const lesson = page.locator('.probability-lesson');
  await lesson.locator('.probability-demo button').nth(1).click();
  assert.equal(await lesson.locator('.probability-result math mfrac').count(), 1);
  await page.locator('[data-footer-next]').click();
  assert.match(await lesson.locator('.probability-result').innerText(), /sure.*impossible/);
 } finally {
  await ctx.close();
 }
 console.log('PASS: five Probability concept lessons, both language shells, mobile layouts, navigation, touch, keyboard, independent practice, KaTeX and offline use.');
}

async function main(){
 const server=http.createServer(async(req,res)=>{
  try{
   const pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname);
   const file=path.resolve(root,'.'+(pathname.endsWith('/')?pathname+'index.html':pathname));
   if(!file.startsWith(root+path.sep))throw Error('Unsafe path');
   const b=await fs.readFile(file);
   res.writeHead(200,{'content-type':({'.js':'application/javascript','.css':'text/css','.woff2':'font/woff2','.woff':'font/woff','.svg':'image/svg+xml'}[path.extname(file)]||'text/html'),'cache-control':'no-store'});res.end(b);
  }catch{res.writeHead(404);res.end();}
 });
 await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
 const base='http://127.0.0.1:'+server.address().port;
 let browser;
 try{
  browser=await chromium.launch({headless:true,...(process.env.CHROMIUM_PATH?{executablePath:process.env.CHROMIUM_PATH}:{}),args:['--no-sandbox']});
  for(const width of [320,390,1280]){
   const ctx=await browser.newContext({viewport:{width,height:900},serviceWorkers:'block'});
   const page=await ctx.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));
   await gotoWithControls(page,base+'/index.html?class=9&chapter=g9-ch9&section=exercises');
   await page.locator('#chapterOverview').waitFor({state:'visible'});
   assert.match(await page.locator('#chapterOverview').innerText(),/Exercise 9\.1/,'Exercises list missing 9.1 at '+width);
   await gotoWithControls(page,base+'/index.html?class=9&question=g9-ch9-ex9.1-q4');
   await page.locator('#questionText').waitFor({state:'visible'});
   assert.match(await sourceText(page.locator('#questionText')),/There are 24 balls in a pot/);
   assert.match(await sourceText(page.locator('#questionText')),/Green ball/);
   assert((await page.locator('#questionText math mn').allTextContents()).includes('24'),'The original ball count is rendered as semantic mathematics');
   assert.ok((await sourceText(page.locator('#stepsList'))).includes('24'),'Complete question and steps');
   assert.equal(await page.locator('#answerBox').isVisible(),false,'No duplicate final answer card');
    assert.equal(await page.locator('#stepsList .final-answer-step').count(),1,'Answer highlighted at end of How it works');
   const metrics=await page.evaluate(()=>({viewport:innerWidth,document:document.documentElement.scrollWidth}));
   assert.ok(metrics.document<=metrics.viewport+1,'Horizontal scroll on '+width+'px');
   await gotoWithControls(page,base+'/index.html?class=9&question=g9-ch9-ex9.1-q6');
   await page.locator('#questionText').waitFor({state:'visible'});
   assert.match(await sourceText(page.locator('#questionText')),/less than 13/);
   assert.match(await sourceText(page.locator('#stepsList')),/sum of 4/);
   await page.goto(base+'/index.html?class=9&chapter=g9-ch9&section=quizzes');
   const rangeQuiz=page.locator('.hub-quiz-question').first();
   for(const [language,button,incorrect,correct] of [
    ['en','#langEn',/^Not quite/,/^Correct!/],
    ['ta','#langTa',/^இன்னும் சரியாகவில்லை/,/^சரி!/]
   ]){
    await page.locator(button).click();
    assert.equal(await page.locator('html').getAttribute('lang'),language);
    const heading=await rangeQuiz.locator('h4').innerText();
    assert.match(heading,/Which value cannot be a probability\?/);
    if(language==='ta')assert.match(heading,/English version only/);
    const choices=rangeQuiz.getByRole('button'),feedback=rangeQuiz.locator('.hub-quiz-feedback');
    assert.equal(await choices.count(),3);
    await choices.first().click();
    assert.match(await feedback.innerText(),incorrect,'Zero is a valid probability');
    await choices.last().click();
    assert.match(await feedback.innerText(),correct,'A value above one is invalid');
    await rangeQuiz.locator('.hub-quiz-help summary').click();
    assert.match(await sourceText(rangeQuiz.locator('.hub-quiz-help')),
      /An impossible event has probability 0, which is allowed/);
   }
   assert.deepEqual(errors,[],'Browser JS errors at '+width);
   await ctx.close();
  }
  await checkConcepts(browser, base);
  console.log('PASS: Grade 9 Probability Exercise 9.1 Q4/Q6 and range quiz in English and Tamil UI at 320/390/1280 px.');
 }finally{if(browser)await browser.close();await new Promise(resolve=>server.close(resolve));}
}
main().catch(e=>{console.error(e);process.exitCode=1;});
