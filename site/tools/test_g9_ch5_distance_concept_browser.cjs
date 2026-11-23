'use strict';
// Grade 9 §5.3 coordinate distance: mobile, bilingual, video and navigation smoke.
const assert=require('node:assert/strict');
const fs=require('node:fs/promises');
const http=require('node:http');
const path=require('node:path');
const {chromium}=require('playwright');
const root=path.resolve(__dirname,'..');
async function main(){
  const server=http.createServer(async(req,res)=>{
    try{
      const url=new URL(req.url,'http://localhost');
      const location=decodeURIComponent(url.pathname);
      const file=path.resolve(root,'.'+(location.endsWith('/')?location+'index.html':location));
      if(!file.startsWith(root+path.sep))throw Error('unsafe path');
      const body=await fs.readFile(file);
      const type={'.js':'application/javascript','.css':'text/css','.json':'application/json','.svg':'image/svg+xml','.woff2':'font/woff2','.mp4':'video/mp4'}[path.extname(file)]||'text/html';
      res.writeHead(200,{'content-type':type,'cache-control':'no-store','accept-ranges':'bytes'});res.end(body);
    }catch{res.writeHead(404);res.end();}
  });
  await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
  const base='http://127.0.0.1:'+server.address().port;
  let browser;
  try{
    browser=await chromium.launch({headless:true,...(process.env.CHROMIUM_PATH?{executablePath:process.env.CHROMIUM_PATH}:{}),args:['--no-sandbox']});
    for(const width of [320,390,412]){
      const ctx=await browser.newContext({viewport:{width,height:740},isMobile:true,hasTouch:true,serviceWorkers:'block'});
      const page=await ctx.newPage();
      const errors=[];page.on('pageerror',e=>errors.push(e.message));
      try{
        const url=base+'/index.html?class=9&chapter=g9-ch5&section=concepts&concept=0';
        await page.goto(url,{waitUntil:'load'});
        await page.locator('.g9-distance-lab svg').waitFor({state:'visible'});
        assert.equal(await page.locator('.sp2-nav-button').count(),1,'One new concept, not entire chapter');
        assert.equal(await page.locator('.sp2-formula .katex').count(),1,'Complete radical must use KaTeX');
        assert.equal(await page.locator('.sp2-formula .mord.sqrt').count()>0,true,'Square-root notation visible');
        assert.match(await page.locator('.g9-distance-lab').innerText(),/Horizontal 3/);
        assert.equal(await page.locator('.g9-distance-lab svg line').count(),0,'Grid segments are labelled SVG paths');
        assert.equal(await page.locator('[data-adaptive-dock]').isVisible(),true);
        assert.equal(await page.locator('.hub-back-menu').isVisible(),false);
        assert.equal(await page.locator('.sp2-concept-video-button').count(),1,'Video link exists');
        assert.match(await page.locator('.sp2-concept-video-button').innerText(),/1:16/);
        assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),'No English overflow at '+width);
        await page.locator('.sp2-concept-video-button').tap();
        const dialog=page.locator('.sp2-concept-video-dialog');
        assert.equal(await dialog.isVisible(),true);
        const media=dialog.locator('video');
        assert.equal(await media.getAttribute('preload'),'none','Do not prefetch media before explicit play');
        assert.equal(await media.evaluate(v=>v.paused),true,'No autoplay');
        assert.equal(await media.evaluate(v=>v.controls),true);
        assert.equal(await media.getAttribute('src'),'https://pub-ed71b86e97a64b428086e292b26fb7a2.r2.dev/trace-videos/g9-ch5-distance-formula/8ada907f59bf11788bad196fc8e3ec876de4bc5d98caef53fa50368d78277323.mp4','Distance video must stream from the exact approved Cloudflare R2 object');
        await dialog.locator('.sp2-concept-video-close').tap();
        // dialog.close() emits its close event asynchronously. Wait for the app's
        // event-driven media teardown instead of asserting within the same tick.
        await dialog.waitFor({state:'detached',timeout:2500});
        assert.equal(await page.locator('.sp2-concept-video-dialog').count(),0,'Dialog and media source disposed');
        await page.locator('.sp2-answers button').first().tap();
        assert.match(await page.locator('[data-feedback]').innerText(),/Correct/);
        await page.locator('#langTa').tap();
        await page.locator('.g9-distance-lab svg').waitFor({state:'visible'});
        assert.equal(await page.locator('html').getAttribute('lang'),'ta');
        assert.match(await page.locator('.g9-distance-plot-note').innerText(),/கிடைமட்டம்/);
        assert.equal(await page.locator('.sp2-formula .katex').count(),1);
        assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),'No Tamil overflow at '+width);
        await page.locator('.sp2-concept-video-button').tap();
        assert.match(await page.locator('.sp2-concept-video-heading').innerText(),/ஆங்கிலக் குரல்/);
        await page.locator('.sp2-concept-video-close').tap();
        assert.deepEqual(errors,[],'No JS exceptions at '+width);
      }finally{await ctx.close();}
    }
    console.log('PASS G9 Ch5 distance: 320/390/412px EN/TA, KaTeX, full MP4 player, exercise check and navigation.');
  }finally{if(browser)await browser.close();await new Promise(resolve=>server.close(resolve));}
}
main().catch(e=>{console.error(e);process.exitCode=1;});
