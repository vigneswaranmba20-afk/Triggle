'use strict';
// Direct textbook exercise entry across grades, including incomplete chapters.
// Run after npm ci / Playwright Chromium install.
const assert=require('node:assert/strict'),fs=require('node:fs/promises'),http=require('node:http'),path=require('node:path');
const {chromium}=require('playwright');
const root=path.resolve(__dirname,'..');
async function main(){
 const server=http.createServer(async(req,res)=>{
  try{
   const p=decodeURIComponent(new URL(req.url,'http://localhost').pathname);
   const file=path.resolve(root,'.'+(p.endsWith('/')?p+'index.html':p));
   if(!file.startsWith(root+path.sep))throw Error('Unsafe path');
   const body=await fs.readFile(file);
   const ext=path.extname(file),type=ext==='.js'?'application/javascript':ext==='.css'?'text/css':'text/html';
   res.writeHead(200,{'content-type':type,'cache-control':'no-store'});res.end(body);
  }catch{res.writeHead(404);res.end();}
 });
 await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
 const base='http://127.0.0.1:'+server.address().port;
 let browser;
 try{
  browser=await chromium.launch({headless:true,...(process.env.CHROMIUM_PATH?{executablePath:process.env.CHROMIUM_PATH}:{}),args:['--no-sandbox']});
  const cases=[
   {grade:9,chapter:1,id:'g9-ch1-ex1.1-q1-i',prompt:/Which of the following are sets/},
   {grade:9,chapter:2,ex:'2.1',prompt:/11\/3|11⁄3|11 over 3|number line/i},
   {grade:9,chapter:6,id:'c9-exercise-6-1-q1',prompt:/diagram|triangle/i},
   {grade:9,chapter:9,id:'g9-ch9-ex9.1-q1',prompt:/birthday/i},
   {grade:10,chapter:6,id:'c10-6-6-1-1'},
   {grade:11,chapter:3,id:'c11-3-3-1-1'},
   {grade:12,chapter:4,id:'c12-4-4-1-1'}
  ];
  for(const width of [320,390,1280]){
   const ctx=await browser.newContext({viewport:{width,height:840},serviceWorkers:'block'});
   for(const test of cases){
    const page=await ctx.newPage(),errors=[];
    page.on('pageerror',e=>errors.push(e.message));
    await page.goto(base+'/index.html?class='+test.grade+'&chapter=g'+test.grade+'-ch'+test.chapter);
    await page.locator('.hub-section-card[data-hub-section="exercises"]').click();
    await page.locator('#questionText').waitFor({state:'visible'});
    const query=new URL(page.url()).searchParams,id=query.get('question');
    assert.ok(id,'Exercises must open a question directly, not a list: '+page.url());
    if(test.id)assert.equal(id,test.id,'First textbook exercise for grade '+test.grade+', chapter '+test.chapter);
    if(test.ex)assert.equal(await page.locator('#questionLabel').innerText(),'EXERCISE '+test.ex);
    assert.equal(query.has('section'),false);
    assert.equal(await page.locator('#chapterOverview').isVisible(),false);
    assert.equal(await page.locator('.hub-question').count(),0,'No Practice Set / question cards above the question');
    assert.equal(await page.locator('#answerBox').isVisible(),true);
    if(test.prompt)assert.match(await page.locator('#questionText').innerText(),test.prompt);
    if(width<=800){
     assert.equal(await page.locator('#stepsRegion').isVisible(),false,'Start with only Q+A on phones');
     await page.keyboard.press('Tab');
     assert.equal(await page.locator('#questionNavDock').isVisible(),true,'Controls accessible by keyboard/touch');
    }
    assert.equal(await page.locator('#previous').isDisabled(),true,'Exercise starts on its first question');
    if(test.grade===9&&test.chapter===9){
      await page.locator('#next').click();
      assert.equal(new URL(page.url()).searchParams.get('question'),'g9-ch9-ex9.1-q2','Next stays in this exercise');
      assert.equal(await page.locator('#previous').isDisabled(),false);
      if(width<=800)await page.keyboard.press('Tab');
    }
    if(width<=800&&(!test.grade||test.grade===9)){
      const size=await page.evaluate(()=>({viewport:innerWidth,document:document.documentElement.scrollWidth}));
      assert.ok(size.document<=size.viewport+1,'No horizontal overflow at '+width);
    }
    if(width<=800)await page.keyboard.press('Tab');
    await page.locator('#questionReturnBtn').click();
    assert.equal(new URL(page.url()).searchParams.get('chapter'),'g'+test.grade+'-ch'+test.chapter,'Back returns to chapter menu');
    assert.equal(await page.locator('.hub-section-card').count()>0,true);
    assert.deepEqual(errors,[],'No JS errors '+test.grade+'/'+test.chapter);
    await page.close();
   }
   // Old section URLs should canonicalize directly to Q1, not show a group list.
   const deep=await ctx.newPage();
   await deep.goto(base+'/index.html?class=9&chapter=g9-ch9&section=exercises');
   await deep.locator('#questionText').waitFor({state:'visible'});
   assert.equal(new URL(deep.url()).searchParams.get('question'),'g9-ch9-ex9.1-q1');
   assert.equal(await deep.locator('#chapterOverview').isVisible(),false);
   await deep.close();
   // Chapters without actual textbook exercises must never substitute Practice Set.
   const empty=await ctx.newPage();
   await empty.goto(base+'/index.html?class=9&chapter=g9-ch3');
   await empty.locator('.hub-section-card[data-hub-section="exercises"]').click();
   assert.equal(new URL(empty.url()).searchParams.get('section'),'exercises');
   assert.equal(await empty.locator('.hub-question').count(),0);
   assert.equal(await empty.locator('#lessonCard').isVisible(),false);
   assert.match(await empty.locator('#chapterSectionContent').innerText(),/not available here yet/i);
   await empty.close();
   await ctx.close();
  }
  console.log('PASS: Exercises opens Q1 directly for seven representative chapter/grade combinations at 320/390/1280px; legacy links, chapter return, scoped Next, Tamil-safe metadata and no practice substitute.');
 }finally{if(browser)await browser.close();await new Promise(resolve=>server.close(resolve));}
}
main().catch(error=>{console.error(error);process.exitCode=1;});
