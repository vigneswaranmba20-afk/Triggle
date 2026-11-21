'use strict';
/* Real-browser Playwright checks for Grade 10 Chapter 6 Trigonometry Concept Studio across mobile viewports, EN/TA, KaTeX clipping, interactions & SW offline reload. */
const assert=require('node:assert/strict');
const fs=require('node:fs'),http=require('node:http'),path=require('node:path');
const {chromium}=require('playwright');

const ROOT=path.resolve(__dirname,'..');
const CHROMIUM=process.env.CHROMIUM_PATH||(fs.existsSync('/usr/bin/chromium')?'/usr/bin/chromium':undefined);
const MIME={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.json':'application/json; charset=utf-8','.woff2':'font/woff2','.woff':'font/woff','.svg':'image/svg+xml','.png':'image/png','.webmanifest':'application/manifest+json'};

function startServer(){
  return new Promise(resolve=>{
    const srv=http.createServer((req,res)=>{
      const urlPath=(req.url||'/').split('?')[0];
      const file=path.join(ROOT,urlPath==='/'?'index.html':urlPath.replace(/^\/+/,''));
      const safe=file.startsWith(ROOT)&&fs.existsSync(file)&&fs.statSync(file).isFile()?file:path.join(ROOT,'index.html');
      res.writeHead(200,{'Content-Type':MIME[path.extname(safe)]||'application/octet-stream'});
      fs.createReadStream(safe).pipe(res);
    });
    srv.listen(0,'127.0.0.1',()=>resolve({srv,base:`http://127.0.0.1:${srv.address().port}`}));
  });
}

async function assertStudioAndLayout(page,label){
  await page.waitForSelector('.g10ch4-studio');
  const metrics=await page.evaluate(()=>{
    const docOverflow=document.documentElement.scrollWidth-document.documentElement.clientWidth;
    const clipped=[...document.querySelectorAll('.g10ch4-studio .triggle-tex-display')].map(el=>({
      text:el.textContent.replace(/[\s\u200b]+/g,' ').slice(0,55),
      scrollW:el.scrollWidth,
      clientW:el.clientWidth
    })).filter(x=>x.scrollW>x.clientW+1);
    const smallButtons=[...document.querySelectorAll('.g10ch4-studio button, .g10ch4-studio input[type="range"]')].map(b=>{
      const r=b.getBoundingClientRect();
      return{cls:b.className,w:Math.round(r.width),h:Math.round(r.height)};
    }).filter(b=>b.h>0&&(b.h<40||b.w<40));
    const svgs=[...document.querySelectorAll('.g10ch4-studio svg')].map(s=>s.getBoundingClientRect()).filter(r=>r.width>40&&r.height>40);
    return{docOverflow,clipped,smallButtons,svgCount:svgs.length};
  });
  assert.equal(metrics.docOverflow,0,`${label}: horizontal overflow ${metrics.docOverflow}px`);
  assert.deepEqual(metrics.clipped,[],`${label}: clipped display formulas: ${JSON.stringify(metrics.clipped)}`);
  assert.deepEqual(metrics.smallButtons,[],`${label}: sub-40px touch controls: ${JSON.stringify(metrics.smallButtons)}`);
  assert(metrics.svgCount>=1,`${label}: expected rendered SVGs`);
}

async function run(){
  const{srv,base}=await startServer();
  let browser;
  try{
    browser=await chromium.launch({...(CHROMIUM?{executablePath:CHROMIUM}:{}),headless:true});

    /* 1. Discovery + Chapter Overview + Index + Keyboard + Deep Links + Practice Connect + Back */
    {
      const ctx=await browser.newContext({viewport:{width:390,height:844},serviceWorkers:'block'});
      const page=await ctx.newPage();
      const pageErrors=[];page.on('pageerror',err=>pageErrors.push(err.message));

      await page.goto(base+'/index.html?class=10&browse=chapters',{waitUntil:'load'});
      const ch6Meta=await page.locator('.discover-chapter[data-chapter="g10-ch6"] .discover-chapter-meta').innerText();
      assert.match(ch6Meta,/10 Interactive mini-lessons available/i);

      await page.locator('.discover-chapter[data-chapter="g10-ch6"]').click();
      assert.match(await page.locator('.hub-section-card[data-hub-section="concepts"] .hub-section-count').innerText(),/10 available/i);

      await page.locator('.hub-section-card[data-hub-section="concepts"]').click();
      await page.locator('.sp2-index-view .sp2-nav-button').first().waitFor({state:'visible'});
      assert.equal(await page.locator('.sp2-index-view .sp2-nav-button').count(),10);

      await page.locator('.sp2-index-view .sp2-nav-button').nth(4).focus();
      await page.keyboard.press('Enter');
      assert.equal(await page.locator('.sp2-journey').getAttribute('data-view'),'lesson');
      assert.match(await page.locator('.sp2-concept-heading h4').innerText(),/^5\./);

      // Connect -> Ex 6.4 Q1 / Q2 (Concept 10) + Back
      await page.goto(base+'/index.html?class=10&chapter=g10-ch6&section=concepts&concept=9',{waitUntil:'load'});
      const connectBtn=page.locator('.g10ch4-exercise-row .g10ch2-practice-link').first();
      await connectBtn.scrollIntoViewIfNeeded();
      await connectBtn.click();
      await page.waitForSelector('#lessonCard:not([hidden])');
      assert.match(page.url(),/question=c10-6-6-4-10/);
      await page.goBack();
      await page.waitForSelector('.g10ch4-studio');
      assert.equal(pageErrors.length,0,'No page errors: '+pageErrors.join('; '));
      await ctx.close();
    }

    /* 2. All 10 concepts across 320px and 390px in EN + TA */
    for(const width of [320,390]){
      const ctx=await browser.newContext({viewport:{width,height:740},serviceWorkers:'block'});
      const page=await ctx.newPage();
      const pageErrors=[];page.on('pageerror',err=>pageErrors.push(err.message));

      for(let i=0;i<10;i++){
        await page.goto(base+'/index.html?class=10&chapter=g10-ch6&section=concepts&concept='+i,{waitUntil:'load'});
        await assertStudioAndLayout(page,`EN ${width}px Concept ${i+1}`);
      }

      await page.locator('#langTa').click();
      await page.waitForSelector('.g10ch4-tamil-badge');
      for(let i=0;i<10;i++){
        await page.goto(base+'/index.html?class=10&chapter=g10-ch6&section=concepts&concept='+i,{waitUntil:'load'});
        assert(await page.locator('.g10ch4-tamil-badge').isVisible(),`TA badge missing Concept ${i+1}`);
        await assertStudioAndLayout(page,`TA ${width}px Concept ${i+1}`);
      }
      assert.equal(pageErrors.length,0,`No errors at ${width}px: `+pageErrors.join('; '));
      await ctx.close();
    }

    /* 3. Viewport spot checks 360px, 412px, 430px */
    for(const width of [360,412,430]){
      const ctx=await browser.newContext({viewport:{width,height:844},serviceWorkers:'block'});
      const page=await ctx.newPage();
      for(const idx of [0,2,5,9]){
        await page.goto(base+'/index.html?class=10&chapter=g10-ch6&section=concepts&concept='+idx,{waitUntil:'load'});
        await assertStudioAndLayout(page,`EN ${width}px Concept ${idx+1}`);
      }
      await ctx.close();
    }

    /* 4. Interactive sliders, mode tabs, presets, and Try It Yourself feedback + Why? */
    {
      const ctx=await browser.newContext({viewport:{width:390,height:844},serviceWorkers:'block'});
      const page=await ctx.newPage();

      // Concept 1: focus tab flips Opp/Adj readout
      await page.goto(base+'/index.html?class=10&chapter=g10-ch6&section=concepts&concept=0',{waitUntil:'load'});
      const before1=(await page.locator('.g10ch4-readout').innerText()).replace(/[\s\u200b]+/g,'');
      await page.locator('.g10ch4-tab').nth(1).click();
      const after1=(await page.locator('.g10ch4-readout').innerText()).replace(/[\s\u200b]+/g,'');
      assert.notEqual(after1,before1,'Switching focused acute angle updates trig readout');

      // AUD05-03: use exact symbolic ratios, and mark displayed decimals as rounded.
      await page.goto(base+'/index.html?class=10&chapter=g10-ch6&section=concepts&concept=1',{waitUntil:'load'});
      const trigReadout=page.locator('.g10ch4-readout .katex-mathml math');
      const operators=await trigReadout.locator('mo').allTextContents();
      assert(operators.includes('=')&&operators.includes('≈'),'Exact quotient and rounded values use distinct operators');
      const angle=35*Math.PI/180;
      const [tangent,cotangent]=[Math.tan(angle),1/Math.tan(angle)].map(n=>String(Number(n.toFixed(3))));
      const quotient=await trigReadout.locator('mfrac').first().textContent();
      assert.match(quotient,/sin.*35.*cos.*35/u,'The exact fraction keeps sine and cosine');
      const values=await trigReadout.locator('mn').allTextContents();
      assert(values.includes(tangent),'Tangent uses the unrounded quotient');
      assert(values.includes(cotangent),'Cotangent uses the unrounded quotient');

      // Concept 4: 90° standard angle shows undef.
      await page.goto(base+'/index.html?class=10&chapter=g10-ch6&section=concepts&concept=3',{waitUntil:'load'});
      await page.locator('.g10ch4-chip-btn').nth(4).click();
      assert.match((await page.locator('.g10ch4-readout').innerText()).replace(/[\s\u200b]+/g,' '),/undef\./);

      // Concept 9: Trap button toggles wall-trap formula warning
      await page.goto(base+'/index.html?class=10&chapter=g10-ch6&section=concepts&concept=8',{waitUntil:'load'});
      await page.locator('.g10ch4-chip-btn').nth(1).click();
      assert.match((await page.locator('.g10ch4-readout').innerText()).replace(/[\s\u200b]+/g,' '),/Not the horizon-angle method/);

      // Concept 10: Try It Yourself Hint + wrong + correct + Why?
      await page.goto(base+'/index.html?class=10&chapter=g10-ch6&section=concepts&concept=9',{waitUntil:'load'});

      const practice=page.locator('.sp2-answers button');
      const sharedDistance=24/Math.tan(Math.PI/6);
      const totalHeight=24+sharedDistance*Math.tan(Math.PI/3);
      assert(Math.abs(sharedDistance-24*Math.sqrt(3))<1e-9);
      assert(Math.abs(totalHeight-96)<1e-9);
      assert.equal(await practice.nth(1).getAttribute('aria-label'),'Horizontal distance 24√3 m, total height '+Math.round(totalHeight)+' m');
      assert.match(await page.locator('.g10ch4-readout').innerText(),/160/,'Default discovery keeps its distinct height');
      const whyBtn=page.locator('[data-why]');
      assert.equal(await whyBtn.isDisabled(),true);
      await page.locator('[data-hint]').click();
      assert((await page.locator('[data-feedback]').innerText()).length>10);
      await page.locator('.sp2-answers button').nth(0).click();
      assert.match(await page.locator('[data-feedback]').innerText(),/Try again/);
      assert.equal(await whyBtn.isDisabled(),false);
      await page.locator('.sp2-answers button').nth(1).click();
      assert.match(await page.locator('[data-feedback]').innerText(),/Correct/);
      await whyBtn.click();
      assert.equal(await page.locator('[data-why-response]').isHidden(),false);
      await ctx.close();
    }

    /* 5. Real Service Worker offline reload */
    {
      const ctx=await browser.newContext({viewport:{width:390,height:844},serviceWorkers:'allow'});
      const page=await ctx.newPage();
      await page.goto(base+'/index.html?class=10&chapter=g10-ch6&section=concepts&concept=4',{waitUntil:'load'});
      await page.evaluate(async()=>{
        if(!navigator.serviceWorker)return;
        await navigator.serviceWorker.ready;
      });
      await ctx.setOffline(true);
      await page.reload({waitUntil:'load'});
      await page.waitForSelector('.g10ch4-studio');
      assert.match(await page.locator('.sp2-concept-heading h4').innerText(),/^5\./);
      await ctx.setOffline(false);
      await ctx.close();
    }

    console.log('PASS Grade 10 Chapter 6 Concepts Browser Suite: 10 interactive 6-part labs, 320/360/390/412/430px, EN/TA, keyboard nav, KaTeX & offline SW');
  }finally{
    if(browser)await browser.close();
    srv.close();
  }
}
run().catch(err=>{console.error(err);process.exit(1);});
