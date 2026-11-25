'use strict';

const assert=require('node:assert/strict');
const {chromium}=require('playwright');
const {server,launchOptions}=require('./dashboard_test_support.cjs');
const {items}=require('../data/textbook-fidelity/g9-ch5-ex5-2-frontier.json');
const route=id=>'?class=9&question='+id;

async function reader(page,lang,row){
  await page.locator(lang==='ta'?'#langTa':'#langEn').click();
  const prompt=await page.locator('#questionText').innerText();
  assert.match(prompt,lang==='ta'?/\p{Script=Tamil}/u:/[a-z]{4}/i);
  for(const text of await page.locator('.step-reason').allTextContents()) {
    assert.match(text,lang==='ta'?/\p{Script=Tamil}/u:/[a-z]{4}/i);
  }
  if(lang==='ta'){
    assert.doesNotMatch(prompt,/English|Tamil version/);
    const english=/Collinear|Parallelogram|Rhombus|square|\bor\b|Centre|radius|\bunits\b|\bwhen\b/;
    assert.doesNotMatch(await page.locator('.final-answer-value').innerText(),english);
    for(const equation of await page.locator('.step-equation').allInnerTexts())assert.doesNotMatch(equation,english);
  }
  assert.equal(await page.locator('#lessonCard .katex-error,#lessonCard [data-math-error="true"]').count(),0);
  assert(await page.locator('#lessonCard .katex').count()>1);
  assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));
  if(row.figureFiles.length){
    await page.locator('#figureBtn').click();
    const image=page.locator('#diagramContent img');
    await image.evaluate(img=>img.decode());
    assert.equal(await image.getAttribute('src'),row.figureFiles[0]);
    assert.match(await image.getAttribute('alt'),lang==='ta'?/\p{Script=Tamil}/u:/[a-z]{4}/i);
    await page.locator('#closeDiagram').click();
  }
}

async function run(){
  const live=process.env.TRIGGLE_LIVE_BASE?.replace(/\/$/,'');
  const app=live?null:await server();
  const base=(live||app.base)+'/index.html';
  const browser=await chromium.launch(launchOptions());
  try{
    for(const width of live?[390]:[320,360,390,412]){
      const ctx=await browser.newContext({viewport:{width,height:844},isMobile:true,hasTouch:true,serviceWorkers:'block',ignoreHTTPSErrors:!!live});
      try{
        const page=await ctx.newPage();
        const errors=[];
        page.on('pageerror',e=>errors.push(e.message));
        await page.goto(base+'?class=9&chapter=g9-ch5&section=exercises');
        await page.locator('.hub-exercise-link[data-exercise="5.2"]').click();
        assert(page.url().endsWith('g9-ch5-ex5.2-q1'));
        assert(await page.locator('#previous').isDisabled());
        await page.locator('#next').click();
        assert(page.url().endsWith('g9-ch5-ex5.2-q2'));
        for(const row of width===390?items:items.filter(q=>[2,3,6,11].includes(q.question))){
          await page.goto(base+route(row.id),{waitUntil:'domcontentloaded'});
          await reader(page,'en',row);
          await reader(page,'ta',row);
        }
        await page.goto(base+route('g9-ch5-ex5.2-q12'));
        assert(await page.locator('#next').isDisabled());
        assert.deepEqual(errors,[]);
      }finally{await ctx.close();}
      console.log('PASS Grade 9 Exercise 5.2 at '+width+'px, bilingual working, navigation and figures');
    }
    if(!live){
      const ctx=await browser.newContext({viewport:{width:390,height:844}});
      try{
        const page=await ctx.newPage(),row=items.find(q=>q.question===11);
        await page.addInitScript(id=>{
          if(localStorage.getItem('triggle.learned.v119')===null)localStorage.setItem('triggle.learned.v119',JSON.stringify([id]));
        },row.id);
        await page.goto(base+route(row.id));
        await page.waitForFunction(()=>navigator.serviceWorker.controller!==null);
        await ctx.setOffline(true);
        await page.reload({waitUntil:'domcontentloaded'});
        await reader(page,'ta',row);
        assert.equal(await page.locator('#markDone').getAttribute('aria-pressed'),'true');
      }finally{await ctx.close();}
      console.log('PASS Grade 9 Exercise 5.2 offline Tamil, KaTeX, figure and restored progress');
    }
  }finally{await browser.close();await app?.close();}
}
run().catch(error=>{console.error(error);process.exitCode=1;});
