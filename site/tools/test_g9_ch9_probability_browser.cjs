'use strict';
const assert=require('node:assert/strict');
const fs=require('node:fs/promises');
const http=require('node:http');
const path=require('node:path');
const {chromium}=require('playwright');
const root=path.resolve(__dirname,'..');
// Older interaction tests exercise the expanded state deliberately.
// A separate quiet-reader test verifies that real students start with Q+A only.
async function gotoWithControls(page,...args){
  const navigate=page.goto.bind(page);
  const response=await navigate(...args);
  if(await page.evaluate(()=>Boolean(window.TriggleQuietReader?.isActive())))
    await page.keyboard.press('Tab'); // accessible first-gesture reveal
  return response;
}

async function main(){
 const server=http.createServer(async(req,res)=>{
  try{
   const pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname);
   const file=path.resolve(root,'.'+(pathname.endsWith('/')?pathname+'index.html':pathname));
   if(!file.startsWith(root+path.sep))throw Error('Unsafe path');
   const b=await fs.readFile(file);
   res.writeHead(200,{'content-type':path.extname(file)==='.js'?'application/javascript':path.extname(file)==='.css'?'text/css':'text/html','cache-control':'no-store'});res.end(b);
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
   await page.locator('#questionText').waitFor({state:'visible'});
   assert.equal(new URL(page.url()).searchParams.get('question'),'g9-ch9-ex9.1-q1','Exercise 9.1 Q1 must open directly at '+width);
   assert.equal(await page.locator('#chapterOverview').isVisible(),false,'No Exercise 9.1 list before Q1 at '+width);
   assert.match(await page.locator('#questionText').innerText(),/birthday/i,'Original Q1 must be visible at '+width);
   assert.equal(await page.locator('#answerBox').isVisible(),true,'Q1 answer must be visible');
   assert.equal(await page.locator('#previous').isDisabled(),true,'Q1 must not navigate back into Practice Set');
   await gotoWithControls(page,base+'/index.html?class=9&question=g9-ch9-ex9.1-q4');
   await page.locator('#questionText').waitFor({state:'visible'});
   assert.match(await page.locator('#questionText').innerText(),/There are 24 balls in a pot/);
   assert.match(await page.locator('#questionText').innerText(),/Green ball/);
   assert.ok((await page.locator('#stepsList').innerText()).includes('24'),'Complete question and steps');
   assert.equal(await page.locator('#answerBox').isVisible(),true,'Final answer accessible');
   const metrics=await page.evaluate(()=>({viewport:innerWidth,document:document.documentElement.scrollWidth}));
   assert.ok(metrics.document<=metrics.viewport+1,'Horizontal scroll on '+width+'px');
   await gotoWithControls(page,base+'/index.html?class=9&question=g9-ch9-ex9.1-q6');
   await page.locator('#questionText').waitFor({state:'visible'});
   assert.match(await page.locator('#questionText').innerText(),/less than 13/);
   assert.match(await page.locator('#stepsList').innerText(),/sum of 4/);
   assert.deepEqual(errors,[],'Browser JS errors at '+width);
   await ctx.close();
  }
  console.log('PASS: Grade 9 2025 Probability Exercise 9.1 direct Q1 and Q4/Q6 and 320/390/1280 responsive browser scenarios.');
 }finally{if(browser)await browser.close();await new Promise(resolve=>server.close(resolve));}
}
main().catch(e=>{console.error(e);process.exitCode=1;});
