'use strict';
const assert=require('node:assert/strict');
const path=require('node:path');
const {pathToFileURL}=require('node:url');
const {chromium}=require('playwright');
(async()=>{
 const browser=await chromium.launch({headless:true});
 try {
  const url=pathToFileURL(path.resolve(__dirname,'../grade-12/adjugate-preview.html')).href;
  for(const width of [320,390,1280]){
   const context=await browser.newContext({viewport:{width,height:800}});
   const page=await context.newPage();
   await page.goto(url);
   assert.equal(await page.locator('article[data-q]').count(),2,'two source-verified subparts');
   assert.equal(await page.locator('html').getAttribute('lang'),'en');
   await page.locator('#ta').click();
   assert.equal(await page.locator('html').getAttribute('lang'),'ta');
   assert.equal(await page.locator('#ta').getAttribute('aria-pressed'),'true');
   await page.locator('article[data-q="i"] summary').focus();
   await page.keyboard.press('Enter');
   assert.equal(await page.locator('article[data-q="i"] details').getAttribute('open'),'');
   assert.equal(await page.locator('article[data-q="i"] .tamil').isVisible(),true);
   await page.locator('#verify-matrix').click();
   assert.match(await page.locator('#matrix-result').innerText(),/இரு முற்றொருமைகளும் சரிபார்க்கப்பட்டன/);
   await page.locator('#matrix-choice').selectOption('ii');
   await page.locator('#verify-matrix').click();
   assert.match(await page.locator('#matrix-result').innerText(),/அணிக்கோவை: 2/);
   await page.locator('#en').click();
   assert.equal(await page.locator('article[data-q="i"] .english').isVisible(),true);
   assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),'horizontal overflow at '+width);
   await context.setOffline(true);
   await page.locator('#verify-matrix').click();
   assert.match(await page.locator('#matrix-result').innerText(),/Both identities verified/);
   await context.close();
  }
  console.log('PASS Grade 12 browser: mobile/desktop, Tamil, keyboard, both matrices and offline interaction');
 } finally {await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
