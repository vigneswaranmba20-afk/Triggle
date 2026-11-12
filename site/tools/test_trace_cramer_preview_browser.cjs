'use strict';
// Isolated browser-only preview. Candidate records are injected by the test;
// this creates no module, source registry entry, precache or student release.
const assert=require('node:assert/strict'),fs=require('node:fs/promises'),path=require('node:path');
const {chromium}=require('playwright'),{server,launchOptions}=require('./dashboard_test_support.cjs');
const {build}=require('./bulk/trace_g12_ex1_4.cjs');
const {batch,difficultyEntries}=build();
async function authored(locator){return locator.evaluate(el=>{const copy=el.cloneNode(true);copy.querySelectorAll('.triggle-tex').forEach(m=>m.replaceWith(document.createTextNode(m.dataset.mathFallback)));copy.querySelectorAll('math[aria-label]').forEach(m=>m.replaceWith(document.createTextNode(m.getAttribute('aria-label'))));return copy.textContent.replace(/\s+/g,' ').trim();});}
async function main(){
 const app=await server();let browser;
 try{
  const original=await fs.readFile(path.resolve(__dirname,'../data/problem-difficulty.js'),'utf8');
  const marker='for(const entry of Object.values(metadata.entries))';assert(original.includes(marker));
  const injection=`Object.assign(metadata.entries,${JSON.stringify(difficultyEntries)}); const preview=${JSON.stringify(batch.records)}; const grade=window.TRIGGLE_CLASSES[12]; const chapter=window.TRIGGLE_CURRICULUM.grades.find(g=>g.grade===12).chapters.find(c=>String(c.number)==='1'); grade.items.push(...preview); chapter.textbookQuestionIds.push(...preview.map(r=>r.id));\n`;
  const script=original.replace(marker,injection+marker);
  browser=await chromium.launch(launchOptions());
  for(const width of [320,390,1280]){
   const ctx=await browser.newContext({viewport:{width,height:850},serviceWorkers:'block'}),page=await ctx.newPage(),errors=[];
   page.on('pageerror',e=>errors.push(e.message));
   await ctx.route('**/data/problem-difficulty.js*',r=>r.fulfill({status:200,contentType:'application/javascript',body:script}));
   await page.goto(app.base+'/index.html?class=12&question='+batch.records[0].id);
   for(let i=0;i<batch.records.length;i++){
    const record=batch.records[i];assert.equal(new URL(page.url()).searchParams.get('question'),record.id);
    assert.equal(await authored(page.locator('#questionText')),record.q.en.replace(/\s+/g,' ').trim(),'Source transcription '+record.id);
    assert.equal(await page.locator('#stepsList .final-answer-step').count(),1);
    assert((await authored(page.locator('#stepsList .final-answer-step'))).includes(record.answer));
    assert(await page.locator('#stepsList math').count()>5,'Native determinant/fraction structures');
    assert.equal(await page.locator('.katex-error').count(),0);
    assert.equal(await page.locator('#figureBtn').isVisible(),false);
    assert(await page.locator('#stepsRegion').isVisible());
    assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),'No page overflow '+record.id+' '+width);
    if(i+1<batch.records.length)await page.locator('#next').click();
   }
   await page.locator('#previous').focus();await page.keyboard.press('Enter');
   assert.equal(new URL(page.url()).searchParams.get('question'),batch.records.at(-2).id);
   await page.locator('#langTa').click();assert.match(await page.locator('#questionHead').innerText(),/English.*pending/i);
   if(process.env.TRACE_PREVIEW_SCREENSHOT&&width===390)await page.screenshot({path:process.env.TRACE_PREVIEW_SCREENSHOT,fullPage:true});
   assert.deepEqual(errors,[]);await ctx.close();
  }
  console.log('PASS isolated eight-part Cramer preview: source text, native maths, answers, keyboard, Tamil pending, 320/390/1280px; unregistered content remains unpublished');
 }finally{if(browser)await browser.close();await app.close();}
}
main().catch(e=>{console.error(e);process.exitCode=1;});
