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
   assert.equal(await page.locator('article[data-q]').count(),3,'three source-verified subparts');
   assert.equal(await page.locator('html').getAttribute('lang'),'en');
   await page.locator('#ta').click();
   assert.equal(await page.locator('html').getAttribute('lang'),'ta');
   assert.equal(await page.locator('#ta').getAttribute('aria-pressed'),'true');
   await page.locator('article[data-q="i"] summary').focus();
   await page.keyboard.press('Enter');
   assert.equal(await page.locator('article[data-q="i"] details').getAttribute('open'),'');
   assert.equal(await page.locator('article[data-q="i"] .tamil').isVisible(),true);
   await page.locator('article[data-q="iii"] summary').focus();
   await page.keyboard.press('Enter');
   assert.equal(await page.locator('article[data-q="iii"] .tamil').isVisible(),true);
   assert.match(await page.locator('article[data-q="iii"] .tamil').innerText(),/adj\(A\)/);
   await page.locator('#verify-matrix').click();
   assert.match(await page.locator('#matrix-result').innerText(),/இரு முற்றொருமைகளும் சரிபார்க்கப்பட்டன/);
   const matrixText=await page.locator('#matrix-result').innerText();
   assert.ok(matrixText.split('\n').length>=5,'matrix verification must present readable separate lines, not literal backslash-n escapes');
   assert.ok(!matrixText.includes('\\n'),'matrix output must not expose escape sequences');
   await page.locator('#matrix-choice').selectOption('ii');
   await page.locator('#verify-matrix').click();
   assert.match(await page.locator('#matrix-result').innerText(),/அணிக்கோவை: 2/);
   await page.locator('#cofactor-row').selectOption('0');
   const column=page.locator('#cofactor-column');
   const selected=await column.selectOption({value:'1'});
   const observed=await column.evaluate(el=>({value:el.value,options:Array.from(el.options,o=>({value:o.value,selected:o.selected}))}));
   assert.deepEqual(selected,['1'],'Playwright must select the second cofactor column');
   assert.equal(observed.value,'1','column selection must persist before calculating C12: '+JSON.stringify(observed));
   assert.match(await page.locator('#cofactor-result').innerText(),/C12 = -1 × 3 = -3/,'selection changes immediately refresh C12');
   await page.locator('#show-cofactor').click();
   assert.match(await page.locator('#cofactor-result').innerText(),/C12 = -1 × 3 = -3/);
   // Set both coordinates in one browser task, then dispatch the same change event as a user selection.
   // This avoids platform-specific native-select focus behavior while still exercising the UI handler.
   await page.evaluate(()=>{
    const row=document.getElementById('cofactor-row'),column=document.getElementById('cofactor-column');
    row.value='2';column.value='0';row.dispatchEvent(new Event('change',{bubbles:true}));
   });
   assert.equal(await page.locator('#cofactor-row').inputValue(),'2','row selection must be applied before calculating C31');
   assert.equal(await page.locator('#cofactor-column').inputValue(),'0','column selection must be applied before calculating C31');
   assert.match(await page.locator('#cofactor-result').innerText(),/C31 = 1 × -1 = -1/,'selection changes immediately refresh C31');
   await page.locator('#show-cofactor').click();
   assert.match(await page.locator('#cofactor-result').innerText(),/C31 = 1 × -1 = -1/);
   // Exhaustively exercise every cofactor coordinate against independently derived values.
   const expected=[[1,-3,9],[1,1,-5],[-1,1,-1]];
   for(let r=0;r<3;r++)for(let col=0;col<3;col++){
    await page.evaluate(({r,col})=>{
     const row=document.getElementById('cofactor-row'),column=document.getElementById('cofactor-column');
     row.value=String(r);column.value=String(col);column.dispatchEvent(new Event('change',{bubbles:true}));
    },{r,col});
    const output=await page.locator('#cofactor-result').innerText();
    const expectedLine='C'+(r+1)+(col+1)+' = '+( ((r+col)%2) ? '-1' : '1')+' × ';
    assert.ok(output.includes(expectedLine),'cofactor sign and coordinate at '+width+'px: '+output);
    assert.ok(output.endsWith(' = '+expected[r][col]),'cofactor value at '+width+'px: '+output);
   }
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
