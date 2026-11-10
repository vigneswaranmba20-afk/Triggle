'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs/promises');
const {chromium}=require('playwright'),{server,launchOptions}=require('./dashboard_test_support.cjs');
(async()=>{const app=await server(),browser=await chromium.launch(launchOptions());try{
 for(const width of [320,390,430,1280]){
  const ctx=await browser.newContext({viewport:{width,height:900},permissions:['clipboard-read','clipboard-write'],serviceWorkers:'block'}),page=await ctx.newPage(),errors=[],requests=[];
  page.on('pageerror',e=>errors.push(e.message));page.on('request',r=>requests.push(r.url()));
  await page.goto(app.base+'/dashboard');await page.locator('#content').waitFor({state:'visible'});
  assert.match(await page.locator('#recommendations').innerText(),/Exercise 1\.4/);
  assert.equal(await page.locator('.grade-card').count(),4);
  await page.locator('#recommendations button').first().click();
  assert.match(await page.evaluate(()=>navigator.clipboard.readText()),/Q1\(iv\)/);
  await page.locator('#close-prompt').click();
  await page.locator('#filter-grade').selectOption('12');await page.locator('#filter-exercise').selectOption('1.4');assert.equal(await page.locator('#task-list .task').count(),1);
  await page.goto(app.base+'/dashboard/#grade=12&chapter=1&exercise=1.4');await page.locator('#drilldown').waitFor({state:'visible'});assert.match(await page.locator('#drilldown').innerText(),/Q1\(i\).*Q1\(ii\)/);
  await page.goto(app.base+'/dashboard/#grade=12&chapter=1&exercise=1.1&question=g12-ch1-ex1.1-q1-i');await page.locator('#drilldown').waitFor({state:'visible'});assert.match(await page.locator('#drilldown').innerText(),/g12-ch1-ex1\.1-q1-i/);
  await page.locator('#drilldown a').first().click();await page.goBack();assert.match(page.url(),/question=g12/);
  await page.route('https://api.github.com/**',r=>r.abort());await page.locator('#refresh-github').click();await page.waitForFunction(()=>document.getElementById('github-status').textContent.includes('Refresh unavailable'));
  assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),'No overflow '+width);
  assert(!requests.some(u=>/firestore|firebase|identitytoolkit/i.test(u)),'Anonymous dashboard never calls private backend');assert.deepEqual(errors,[]);
  if(width===390){await fs.mkdir('screenshots',{recursive:true});await page.screenshot({path:'screenshots/mission-control-390.png',fullPage:true});}
  await ctx.close();
 }
 const ctx=await browser.newContext({serviceWorkers:'block'}),page=await ctx.newPage();await page.route('**/project-status.json',r=>r.abort());await page.goto(app.base+'/dashboard/');await page.locator('#load-error').waitFor({state:'visible'});assert.equal(await page.locator('#content').isVisible(),false);await ctx.close();
 console.log('PASS Owner Dashboard: bookmark route, accurate grade cards, prompt clipboard, search/filter, drill-down/history, API failure, data failure, public isolation and 320/390/430/1280px.');
}finally{await browser.close();await app.close();}})().catch(e=>{console.error(e);process.exitCode=1;});
