'use strict';
// Grade 9 Algebra polynomial pilot: local browser interaction / mobile regression.
const assert=require('node:assert/strict');
const fs=require('node:fs/promises');
const http=require('node:http');
const path=require('node:path');
const {chromium}=require('playwright');
const root=path.resolve(__dirname,'..');

async function main(){
  const server=http.createServer(async(req,res)=>{
    try{
      const pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname);
      const file=path.resolve(root,'.'+(pathname.endsWith('/')?pathname+'index.html':pathname));
      if(!file.startsWith(root+path.sep))throw Error('unsafe path');
      const body=await fs.readFile(file);
      const ext=path.extname(file);
      res.writeHead(200,{'content-type':{'.js':'application/javascript','.css':'text/css','.woff2':'font/woff2','.json':'application/json','.svg':'image/svg+xml'}[ext]||'text/html','cache-control':'no-store'});
      res.end(body);
    }catch{res.writeHead(404);res.end();}
  });
  await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
  const base='http://127.0.0.1:'+server.address().port;
  let browser;
  try {
    browser=await chromium.launch({headless:true,...(process.env.CHROMIUM_PATH?{executablePath:process.env.CHROMIUM_PATH}:{}),args:['--no-sandbox']});
    for(const width of [320,360,390,412]){
      const context=await browser.newContext({viewport:{width,height:width===320?568:700},hasTouch:true,isMobile:true,serviceWorkers:'block'});
      const page=await context.newPage();
      const errors=[];
      page.on('pageerror',e=>errors.push(e.message));
      try{
        const url=base+'/index.html?class=9&chapter=g9-ch3&section=concepts&concept=0';
        await page.goto(url);
        await page.locator('.g9a-lab').waitFor({state:'visible'});
        const journey=page.locator('.sp2-simple-journey');
        assert.equal(await journey.locator('.sp2-nav-button').count(),1,'Only one pilot, no full chapter claim');
        assert.equal(await page.locator('[data-top-next]').isVisible(),true);
        assert.equal(await page.locator('[data-back-index]').isVisible(),true);
        assert.equal(await page.locator('.hub-back-menu').isVisible(),false);
        assert.match(await page.locator('.sp2-concept-heading').innerText(),/polynomials/i);
        assert.equal(await page.locator('.g9a-choices button').count(),3);
        assert.equal(await page.locator('.g9a-powers .g9a-valid').count(),3);
        assert.match(await page.locator('.g9a-verdict').innerText(),/Every power of x/);
        assert.ok(await page.locator('.g9a-choices button, .g9a-answer-options button').evaluateAll(
          nodes=>nodes.every(n=>n.getBoundingClientRect().height>=44&&n.getBoundingClientRect().width>=44)),'Touch targets >=44 CSS px');
        assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),'No EN overflow at '+width);
        const lastBadge=await page.locator('.g9a-powers .g9a-chip').last().boundingBox();
        assert.ok(lastBadge && lastBadge.y+lastBadge.height<=(width===320?568:700),'Core idea fits first viewport; width='+width+' bottom='+(lastBadge?Math.round(lastBadge.y+lastBadge.height):'none'));
        await page.locator('.g9a-choices button').nth(1).tap();
        assert.match(await page.locator('.g9a-verdict').innerText(),/exponent −1/);
        assert.equal(await page.locator('.g9a-invalid').count(),1);
        await page.locator('.g9a-choices button').nth(2).tap();
        assert.match(await page.locator('.g9a-verdict').innerText(),/exponent ½/);
        assert.equal(await page.locator('.g9a-rewrite .triggle-tex').count(),1);
        await page.locator('.g9a-choices button').first().focus();
        await page.keyboard.press('Enter');
        assert.match(await page.locator('.g9a-verdict').innerText(),/Polynomial/);
        assert.equal(await page.locator('.g9a-choices [aria-pressed="true"]').count(),1);
        const transfer=page.locator('.g9a-transfer');
        assert.equal(await transfer.count(),3);
        await transfer.nth(0).locator('button').last().tap();
        assert.match(await transfer.nth(0).locator('.g9a-feedback').innerText(),/Check again/);
        await transfer.nth(0).locator('button').first().tap();
        assert.match(await transfer.nth(0).locator('.g9a-feedback').innerText(),/Correct/);
        await transfer.nth(1).locator('button').first().tap();
        assert.match(await transfer.nth(1).locator('.g9a-feedback').innerText(),/Negative and fractional coefficients/);
        await transfer.nth(2).locator('button').last().tap();
        assert.match(await transfer.nth(2).locator('.g9a-feedback').innerText(),/5x⁻¹/);
        await page.locator('#langTa').click();
        await page.locator('.g9a-lab').waitFor({state:'visible'});
        assert.equal(await page.locator('html').getAttribute('lang'),'ta');
        assert.match(await page.locator('.g9a-verdict').innerText(),/பல்லுறுப்புக் கோவை/);
        assert.equal(await page.locator('.g9a-review').count(),1,'Tamil review notice');
        assert.equal(await page.locator('.g9a-choices [aria-pressed="true"]').count(),1);
        assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),'No TA overflow at '+width);
        await page.locator('.g9a-deep summary').tap();
        assert.match(await page.locator('.g9a-deep').innerText(),/பூச்சிய/);
        assert.equal(await page.locator('.math-fallback[data-math-error="true"]').count(),0);
        await page.locator('[data-top-next]').tap();
        assert.equal(await page.locator('[data-index-view]').isVisible(),true,'Single lesson Next returns to index');
        await page.goto(base+'/index.html?class=9&chapter=g9-ch3&section=concepts&concept=99');
        assert.equal(await page.locator('[data-index-view]').isVisible(),true,'Invalid route returns to index');
        assert.deepEqual(errors,[],'No page errors at '+width);
      }finally{await context.close();}
    }
    console.log('PASS: G9 Algebra polynomial pilot: EN/TA choices, transfer, navigation, accessibility, mobile widths.');
  }finally{
    if(browser)await browser.close();
    await new Promise(resolve=>server.close(resolve));
  }
}
main().catch(err=>{console.error(err);process.exitCode=1;});