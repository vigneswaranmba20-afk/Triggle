'use strict';
const assert=require('node:assert/strict');
const fs=require('node:fs/promises');
const http=require('node:http');
const path=require('node:path');
const {chromium}=require('playwright');
const root=path.resolve(__dirname,'..');

async function run(){
 const server=http.createServer(async(req,res)=>{
  try{
   const pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname);
   const file=path.resolve(root,'.'+(pathname.endsWith('/')?pathname+'index.html':pathname));
   if(!file.startsWith(root+path.sep))throw Error('Unsafe path');
   const buffer=await fs.readFile(file);
   const contentType=file.endsWith('.js')?'application/javascript':file.endsWith('.css')?'text/css':'text/html';
   res.writeHead(200,{'content-type':contentType,'cache-control':'no-store'});res.end(buffer);
  }catch{res.writeHead(404);res.end();}
 });
 await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
 const base='http://127.0.0.1:'+server.address().port;
 let browser;
 try{
  browser=await chromium.launch({headless:true,...(process.env.CHROMIUM_PATH?{executablePath:process.env.CHROMIUM_PATH}:{}),args:['--no-sandbox']});
  for(const width of [320,390,1280]){
   const context=await browser.newContext({viewport:{width,height:840},serviceWorkers:'block'});
   const page=await context.newPage(),errors=[];
   page.on('pageerror',error=>errors.push(error.message));
   await page.goto(base+'/index.html?class=9&question=g9-ch9-ex9.1-q4');
   await page.locator('#questionText').waitFor({state:'visible'});
   assert.match(await page.locator('#questionText').innerText(),/There are 24 balls/);
   assert.equal(await page.locator('#answerBox').isVisible(),true);
   assert.ok(await page.locator('#stepsList li').count()>=3,'Steps must remain in DOM');
   if(width<=800){
    assert.equal(await page.evaluate(()=>window.TriggleQuietReader?.isActive()),true,'Mobile reader active');
    for(const selector of ['.appbar','#questionNavDock','.status-row','#questionReturn',
      '.question-top','.lesson-title-row','#stepsRegion','.lesson-bottom']){
     assert.equal(await page.locator(selector).first().isVisible(),false,selector+' must be concealed at '+width);
    }
    assert.equal(await page.locator('#questionText').isVisible(),true);
    assert.equal(await page.locator('#answerBox').isVisible(),true);

    // Press down, not click: controls appear while the finger is still touching.
    await page.mouse.move(160,240);
    await page.mouse.down();
    assert.equal(await page.evaluate(()=>window.TriggleQuietReader.isVisible()),true,'Touch-down immediately reveals');
    assert.equal(await page.locator('.appbar').isVisible(),true);
    assert.equal(await page.locator('#questionNavDock').isVisible(),true);
    assert.equal(await page.locator('#stepsRegion').isVisible(),true,'Explanation appears when requested');
    await page.mouse.up();
    assert.equal(await page.locator('#questionNavDock').isVisible(),true,'Give time to select an option after release');
    await page.waitForFunction(()=>!document.body.classList.contains('reader-options-visible'),null,{timeout:8000});
    assert.equal(await page.locator('#questionNavDock').isVisible(),false,'Return to question/answer only');

    await page.keyboard.press('Tab');
    assert.equal(await page.locator('#questionNavDock').isVisible(),true,'Keyboard reveals controls');
    await page.keyboard.press('Escape');
    assert.equal(await page.locator('#questionNavDock').isVisible(),false,'Escape conceals controls');

    // Navigate from the now-available controls without losing the new question.
    await page.mouse.move(150,220);await page.mouse.down();await page.mouse.up();
    await page.locator('#next').click();
    await page.waitForFunction(()=>new URL(location.href).searchParams.get('question')==='g9-ch9-ex9.1-q5');
    assert.equal(await page.locator('#answerBox').isVisible(),true);
    assert.equal(await page.locator('#questionNavDock').isVisible(),false,'New question starts quiet');
    assert.ok((await page.locator('#questionText').innerText()).includes('two coins'));
    const m=await page.evaluate(()=>({w:innerWidth,doc:document.documentElement.scrollWidth}));
    assert.ok(m.doc<=m.w+1,'No horizontal overflow at '+width);
   }else{
    assert.equal(await page.evaluate(()=>window.TriggleQuietReader?.isActive()),false,'Desktop layout unchanged');
    assert.equal(await page.locator('.appbar').isVisible(),true);
    assert.equal(await page.locator('#stepsRegion').isVisible(),true);
   }
   assert.deepEqual(errors,[],'JavaScript errors at width '+width);
   await context.close();
  }
  console.log('PASS: question/answer-only mobile entry, first-contact options, release auto-hide, keyboard and next-question resets at 320/390px; desktop remains unchanged.');
 }finally{if(browser)await browser.close();await new Promise(resolve=>server.close(resolve));}
}
run().catch(error=>{console.error(error);process.exitCode=1;});
