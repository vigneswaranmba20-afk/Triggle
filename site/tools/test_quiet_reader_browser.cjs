'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs/promises'),http=require('node:http'),path=require('node:path');
const {chromium}=require('playwright');
const root=path.resolve(__dirname,'..');
async function main(){
 const server=http.createServer(async(req,res)=>{
  try{
   const pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname);
   const file=path.resolve(root,'.'+(pathname.endsWith('/')?pathname+'index.html':pathname));
   if(!file.startsWith(root+path.sep))throw Error('Unsafe path');
   const b=await fs.readFile(file);
   const type=path.extname(file)==='.js'?'application/javascript':path.extname(file)==='.css'?'text/css':'text/html';
   res.writeHead(200,{'content-type':type,'cache-control':'no-store'});res.end(b);
  }catch{res.writeHead(404);res.end();}
 });
 await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
 let browser;
 const url='http://127.0.0.1:'+server.address().port;
 try{
  browser=await chromium.launch({headless:true,...(process.env.CHROMIUM_PATH?{executablePath:process.env.CHROMIUM_PATH}:{}),args:['--no-sandbox']});
  for(const width of [320,390,1280]){
   const ctx=await browser.newContext({viewport:{width,height:840},serviceWorkers:'block'});
   const page=await ctx.newPage(),errors=[];
   page.on('pageerror',e=>errors.push(e.message));
   for(const [grade,id] of [[9,'g9-ch9-ex9.1-q4'],[9,'g9-ch1-ex1.1-q1-i'],[10,'c10-6-6-1-1']]){
    await page.goto(url+'/index.html?class='+grade+'&question='+id);
    await page.locator('#questionText').waitFor({state:'visible'});
    assert.equal(await page.locator('#answerBox').isVisible(),true,'Answer always visible');
    assert.equal(await page.locator('#questionLabel').isVisible(),true,'Exercise badge always visible');
    assert.match(await page.locator('#questionLabel').innerText(),/EXERCISE/);
    assert.equal(await page.locator('#questionHead').isVisible(),true,'Exercise question heading visible');
    assert.equal(await page.locator('#stepsRegion').isVisible(),true,'How it works must be visible without touch');
    assert.match(await page.locator('#quickSteps').innerText(),/HOW IT WORKS|எப்படி|தீர்வு|WORKS/);
    assert.ok(await page.locator('#stepsList li').count()>0,'Full explanation present');
    assert.equal(await page.locator('#stepsList li').first().isVisible(),true,'Explanation should actually render');
    assert.equal(await page.locator('#questionNavDock').isVisible(),true,'Bottom dock always visible');
    assert.equal(await page.locator('#allChaptersButton').isVisible(),true,'Back to all chapters always visible');
    assert.equal(await page.locator('#previous').isVisible(),true,'Previous always visible');
    assert.equal(await page.locator('#next').isVisible(),true,'Next page always visible');
    if(width<=800){
     assert.equal(await page.evaluate(()=>window.TriggleQuietReader?.isActive()),true);
     assert.equal(await page.locator('.appbar').isVisible(),false,'Optional global header hidden at rest');
     await page.mouse.move(145,230);await page.mouse.down();
     assert.equal(await page.evaluate(()=>window.TriggleQuietReader.isVisible()),true,'Touch-down opens all optional controls');
     assert.equal(await page.locator('.appbar').isVisible(),true,'Main header available after touch');
     assert.equal(await page.locator('#stepsRegion').isVisible(),true,'Touch must not disrupt solution');
     assert.equal(await page.locator('#questionNavDock').isVisible(),true,'Touch must not disrupt page navigation');
     await page.mouse.up();
     await page.waitForFunction(()=>!document.body.classList.contains('reader-options-visible'),null,{timeout:8000});
     assert.equal(await page.locator('.appbar').isVisible(),false,'Secondary header may retract');
     assert.equal(await page.locator('#stepsRegion').isVisible(),true,'Worked steps persist after release');
     assert.equal(await page.locator('#allChaptersButton').isVisible(),true,'Chapter return persists after release');
     assert.equal(await page.locator('#next').isVisible(),true,'Next persists after release');
    }else{
     assert.equal(await page.evaluate(()=>window.TriggleQuietReader?.isActive()),false);
     assert.equal(await page.locator('.appbar').isVisible(),true,'Desktop remains unchanged');
    }
    const dims=await page.evaluate(()=>({sw:document.documentElement.scrollWidth,vw:innerWidth}));
    assert.ok(dims.sw<=dims.vw+1,'No horizontal overflow at '+width+' for '+id);
   }
   if(width<=800){
    await page.goto(url+'/index.html?class=9&question=g9-ch9-ex9.1-q4');
    await page.locator('#next').click();
    await page.waitForFunction(()=>new URL(location.href).searchParams.get('question')==='g9-ch9-ex9.1-q5');
    assert.equal(await page.locator('#stepsRegion').isVisible(),true,'Next question keeps worked steps visible');
    assert.equal(await page.locator('#questionNavDock').isVisible(),true,'Next question keeps dock visible');
    await page.locator('#allChaptersButton').click();
    assert.equal(new URL(page.url()).searchParams.get('browse'),'chapters');
    assert.equal(await page.locator('#questionNavDock').isVisible(),false,'Dock hidden when leaving question view');
   }
   assert.deepEqual(errors,[],'No JavaScript exceptions at '+width);
   await ctx.close();
  }
  console.log('PASS: exercise+question+answer+How it works+chapter/previous/next visible by default at 320,390,1280; touch reveals secondary options only.');
 }finally{if(browser)await browser.close();await new Promise(resolve=>server.close(resolve));}
}
main().catch(e=>{console.error(e);process.exitCode=1;});
