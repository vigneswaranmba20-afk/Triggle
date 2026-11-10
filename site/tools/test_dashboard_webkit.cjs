'use strict';
// Safari engine coverage. A real iOS/Google-account acceptance test is still separate.
const assert=require('node:assert/strict'),{webkit}=require('playwright');
const {server}=require('./dashboard_test_support.cjs'),{harness}=require('./test_teacher_workflow_browser.cjs');
(async()=>{const app=await server(),browser=await webkit.launch({headless:true,...(process.env.WEBKIT_PATH?{executablePath:process.env.WEBKIT_PATH}:{})});try{
 for(const width of [320,390,430]){
  const ctx=await browser.newContext({viewport:{width,height:850},isMobile:true,hasTouch:true,serviceWorkers:'block'}),page=await ctx.newPage(),errors=[];
  page.on('pageerror',e=>errors.push(e.message));await page.goto(app.base+'/dashboard/');
  await page.waitForURL(/\/index\.html(?:[?#]|$)/);
  await page.locator('#browseBtn').waitFor({state:'attached'});
  assert(!new URL(page.url()).pathname.includes('dashboard'));
  assert.equal(await page.locator('h1:has-text("Triggle Mission Control")').count(),0);
  assert.deepEqual(errors,[]);await ctx.close();
  const t=await harness(browser,app.base,{width,webKit:true,signedIn:true});await t.page.waitForFunction(()=>document.body.dataset.startupState==='authorized');
  await t.page.locator('#grade-select').selectOption('12');await t.page.waitForFunction(()=>document.getElementById('question-select').value.startsWith('g12-ch1'));await t.page.waitForFunction(()=>!document.getElementById('save-review').disabled);
  assert.ok(await t.page.locator('#question-text math').count()>0);await t.page.locator('input[value="needs-correction"]').check();await t.page.locator('#remarks').fill('Synthetic Safari-engine correction fixture.');await t.page.locator('#save-review').click();await t.page.waitForFunction(()=>window.__reviewHarness.writes===1);
  await t.page.waitForFunction(()=>document.getElementById('inbox-items').textContent.includes('Synthetic Safari-engine'));await t.page.locator('#inbox-items input[type="checkbox"]').check();await t.page.locator('#prepare-handoff').click();assert.match(await t.page.locator('#handoff-text').inputValue(),/Synthetic Safari-engine/);
  assert.ok(await t.page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));await t.page.locator('#signout').click();await t.page.locator('#login').waitFor({state:'visible'});assert.equal(await t.page.locator('#handoff-text').inputValue(),'');assert.deepEqual(t.errors,[]);await t.ctx.close();
 }
 const denied=await harness(browser,app.base,{webKit:true,signedIn:true,authorized:false});await denied.page.locator('#denied').waitFor({state:'visible'});assert.equal(await denied.page.locator('#workspace').isVisible(),false);await denied.ctx.close();
 const fail=await browser.newContext({viewport:{width:320,height:850}}),page=await fail.newPage();await page.route('**/teacher-portal.js*',r=>r.abort());await page.route('**/teacher-portal.css*',r=>r.abort());await page.goto(app.base+'/teacher-review.html');await page.locator('#startup-error').waitFor({state:'visible'});assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));assert.equal(await page.locator('#retry-startup').isVisible(),true);await fail.close();
 console.log('PASS WebKit/Safari engine: retired owner dashboard redirects; private review/inbox/handoff, unauthorized denial, startup/CSS recovery, MathML and 320/390/430px. Not physical iOS or production Google login.');
}finally{await browser.close();await app.close();}})().catch(e=>{console.error(e);process.exitCode=1;});
