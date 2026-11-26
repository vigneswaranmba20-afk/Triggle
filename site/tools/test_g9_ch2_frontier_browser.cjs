'use strict';

const assert=require('node:assert/strict');
const {chromium}=require('playwright');
const {launchOptions,server}=require('./dashboard_test_support.cjs');
const route=n=>'?class=9&question=g9-ch2-ex9-q'+n;

async function reader(page,n,lang) {
  await page.locator(lang==='ta'?'#langTa':'#langEn').click();
  await page.evaluate(()=>document.fonts.ready);
  const choices=page.locator('.triggle-mcq-btn');
  assert.equal(await choices.count(),4);
  for (let i=0;i<4;i++) assert.match(await choices.nth(i).innerText(),new RegExp('^\\('+ (i+1) +'\\)'));
  const index=await page.evaluate(number=>window.TRIGGLE_CLASSES[9].items.find(q=>q.id==='g9-ch2-ex9-q'+number).correctIndex,n);
  await choices.nth((index+1)%4).click();
  assert(await page.locator('.triggle-mcq-feedback.is-wrong').isVisible());
  await choices.nth(index).click();
  assert(await page.locator('.triggle-mcq-feedback.is-correct').isVisible());
  if (lang==='ta') {
    assert.match(await page.locator('.triggle-mcq-feedback').innerText(),/சரியான விடை/);
    assert.match(await page.locator('.final-answer-value').innerText(),/விடை/);
    for (const reason of await page.locator('.step-reason').allTextContents()) assert.match(reason,/\p{Script=Tamil}/u);
  }
  assert(await page.locator('#g9GeometryHint summary').isVisible());
  assert(await page.locator('#chapter8QuestionConcept').isVisible());
  await page.locator('.why-step-g9 summary').click();
  assert(await page.locator('.why-step-g9[open]').isVisible());
  assert.equal(await page.locator('#lessonCard .katex-error, #lessonCard [data-math-error="true"], #lessonCard .math-fallback').count(),0);
  assert(await page.locator('#lessonCard .katex').count()>1);
  assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));
}

async function run() {
  const live=process.env.TRIGGLE_LIVE_BASE?.replace(/\/$/,'');
  const app=live?null:await server();
  const base=(live||app.base)+'/index.html';
  const browser=await chromium.launch(launchOptions());
  try {
    for (const width of live?[390]:[320,360,390,412]) {
      const context=await browser.newContext({viewport:{width,height:844},isMobile:true,hasTouch:true,
        ignoreHTTPSErrors:!!live,serviceWorkers:'block'});
      const page=await context.newPage();
      const errors=[];
      page.on('pageerror',error=>errors.push(error.message));
      try {
        await page.goto(base+'?class=9&chapter=g9-ch2&section=exercises');
        await page.locator('.hub-exercise-link[data-exercise="2.9"]').click();
        assert(page.url().endsWith('g9-ch2-ex9-q1'));
        assert(await page.locator('#previous').isDisabled());
        const questions=width===390?Array.from({length:20},(_,i)=>i+1):[1,4,6,10,16,18,20];
        for (const n of questions) {
          await page.goto(base+route(n),{waitUntil:'domcontentloaded'});
          await reader(page,n,'en');
          await reader(page,n,'ta');
        }
        assert(await page.locator('#next').isDisabled());
        await page.locator('#previous').click();
        assert(page.url().endsWith('g9-ch2-ex9-q19'));
        await page.locator('#chapter8QuestionConcept').click();
        assert.equal(new URL(page.url()).searchParams.get('chapter'),'g9-ch2');
        assert.equal(new URL(page.url()).searchParams.get('section'),'concepts');
        await page.goto(base+'?class=9&question=g9-ch2-ex2-q1-i',{waitUntil:'domcontentloaded'});
        assert.match(await page.locator('.final-answer-value').innerText(),/சுழல் தசமம்/);
        assert.deepEqual(errors,[]);
      } finally {await context.close();}
      console.log('PASS Grade 9 Ex 2.9 at '+width+'px: '+(width===390?20:7)+' cards in both languages');
    }
    if (!live) {
      const context=await browser.newContext({viewport:{width:390,height:844}});
      try {
        const page=await context.newPage();
        await page.addInitScript(()=>{
          const key='triggle.learned.v119';
          if (localStorage.getItem(key)===null) {
            localStorage.setItem(key,JSON.stringify(['g9-ch2-ex9-q10','g9-ch2-ex2-q1-i']));
          }
        });
        await page.goto(base+route(10));
        await page.locator('#langTa').click();
        assert.equal(await page.locator('#markDone').getAttribute('aria-pressed'),'true');
        await page.evaluate(()=>navigator.serviceWorker.ready);
        await page.waitForFunction(()=>navigator.serviceWorker.controller!==null);
        await context.setOffline(true);
        await page.reload({waitUntil:'domcontentloaded'});
        assert.equal(await page.locator('#markDone').getAttribute('aria-pressed'),'true');
        assert.deepEqual(await page.evaluate(()=>JSON.parse(localStorage.getItem('triggle.learned.v119'))),
          ['g9-ch2-ex9-q10','g9-ch2-ex2-q1-i']);
        assert.match(await page.locator('.final-answer-value').innerText(),/விடை/);
        assert(await page.locator('.final-answer-value .katex').isVisible());
        assert.equal(await page.locator('.triggle-mcq-btn').count(),4);
      } finally {await context.close();}
      console.log('PASS Grade 9 Real Numbers: bilingual answer, offline KaTeX, and unchanged progress key');
    }
  } finally {await browser.close();await app?.close();}
}

run().catch(error=>{console.error(error);process.exitCode=1;});
