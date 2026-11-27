'use strict';
/* Real Chromium verification for all 14 Grade 10 Ch3 Algebra Concepts at 320/360/393/430 px (EN + TA + Offline + Keyboard). */
const assert=require('node:assert/strict');
const http=require('node:http'),fs=require('node:fs/promises'),path=require('node:path');
const {chromium}=require('playwright');

const SITE=path.resolve(__dirname,'..');
const MIME={
  '.html':'text/html; charset=utf-8','.js':'application/javascript; charset=utf-8',
  '.css':'text/css; charset=utf-8','.json':'application/json; charset=utf-8',
  '.svg':'image/svg+xml','.png':'image/png','.woff2':'font/woff2','.webmanifest':'application/manifest+json'
};

function startServer(){
  const srv=http.createServer(async(req,res)=>{
    try{
      const pathname=decodeURIComponent(new URL(req.url,'http://127.0.0.1').pathname);
      const rel=pathname.endsWith('/')?pathname+'index.html':pathname;
      const file=path.resolve(SITE,'.'+rel);
      if(!file.startsWith(SITE+path.sep)&&file!==SITE)throw Error('Forbidden');
      const data=await fs.readFile(file);
      res.writeHead(200,{'content-type':MIME[path.extname(file)]||'application/octet-stream','cache-control':'no-store'});
      res.end(data);
    }catch{res.writeHead(404);res.end();}
  });
  return new Promise(r=>srv.listen(0,'127.0.0.1',()=>r(srv)));
}

async function assertNoOverflowAndValidMath(page,ctxLabel){
  const check=await page.evaluate(()=>{
    const doc=document.documentElement;
    const errors=document.querySelectorAll('.math-error,[data-math-error="true"]').length;
    const clippedTex=[...document.querySelectorAll('.triggle-tex-display')]
      .filter(el=>{
        const r=el.getBoundingClientRect();
        return r.width>0&&(el.scrollWidth>el.clientWidth+2);
      })
      .map(el=>({text:el.textContent.trim().slice(0,40),scrollW:Math.round(el.scrollWidth),clientW:Math.round(el.clientWidth)}));
    const svgs=[...document.querySelectorAll('.g10ch3-lab svg')].filter(s=>!s.closest('.katex')).map(s=>{
      const r=s.getBoundingClientRect();return {w:r.width,h:r.height};
    });
    const smallButtons=[...document.querySelectorAll('.g10ch3-lab button, .sp2-answers button, .sp2-recall-actions button, .g10ch3-deep-dive summary, .sp2-back-index, .sp2-top-next, [data-adaptive-dock] button')]
      .filter(el=>{const r=el.getBoundingClientRect();return r.width>0&&r.height>0&&(r.height<43.5||r.width<43.5);})
      .map(el=>({text:el.textContent.trim(),w:Math.round(el.getBoundingClientRect().width),h:Math.round(el.getBoundingClientRect().height)}));
    return {
      overflow:doc.scrollWidth-doc.clientWidth,
      scrollW:doc.scrollWidth,clientW:doc.clientWidth,
      mathErrors:errors,
      clippedTex,
      katexCount:document.querySelectorAll('.katex').length,
      svgs,smallButtons
    };
  });
  assert(check.overflow<=1,`${ctxLabel}: horizontal overflow ${check.overflow}px (${check.scrollW} > ${check.clientW})`);
  assert.equal(check.mathErrors,0,`${ctxLabel}: KaTeX math errors detected`);
  assert.deepEqual(check.clippedTex,[],`${ctxLabel}: clipped display formulas detected: ${JSON.stringify(check.clippedTex)}`);
  assert(check.katexCount>=1,`${ctxLabel}: expected KaTeX rendering`);
  for(const s of check.svgs)assert(s.w>100&&s.h>60,`${ctxLabel}: SVG degenerate box ${JSON.stringify(s)}`);
  assert.deepEqual(check.smallButtons,[],`${ctxLabel}: touch targets below 44px: ${JSON.stringify(check.smallButtons)}`);
}

async function run(){
  const srv=await startServer();
  const base='http://127.0.0.1:'+srv.address().port;
  const screenshotDir=process.env.TRIGGLE_CH3_SCREENSHOTS||'';
  let browser;
  try{
    browser=await chromium.launch({
      headless:true,
      ...(process.env.CHROMIUM_PATH?{executablePath:process.env.CHROMIUM_PATH}:{}),
      args:['--no-sandbox']
    });

    /* 1. Discovery + Chapter Overview + Index + Keyboard + Deep Links + Back Navigation */
    {
      const ctx=await browser.newContext({viewport:{width:393,height:852},serviceWorkers:'block'});
      const page=await ctx.newPage();
      const pageErrors=[];page.on('pageerror',err=>pageErrors.push(err.message));

      await page.goto(base+'/index.html?class=10&browse=chapters',{waitUntil:'load'});
      const ch3Meta=await page.locator('.discover-chapter[data-chapter="g10-ch3"] .discover-chapter-meta').innerText();
      assert.match(ch3Meta,/14 Interactive mini-lessons available/i);

      await page.locator('.discover-chapter[data-chapter="g10-ch3"]').click();
      assert.match(await page.locator('.hub-section-card[data-hub-section="concepts"] .hub-section-count').innerText(),/14 available/i);

      await page.locator('.hub-section-card[data-hub-section="concepts"]').click();
      await page.locator('.sp2-index-view .sp2-nav-button').first().waitFor({state:'visible'});
      assert.equal(await page.locator('.sp2-index-view .sp2-nav-button').count(),14);
      assert.equal(await page.locator('.sp2-index-view .sp2-progress').isVisible(),false,'No progress counter on concept index');
      assert.equal(await page.locator('.hub-top-actions').isVisible(),true,'Single Back to chapter on concept index');

      // Bad concept fallback -> index
      await page.goto(base+'/index.html?class=10&chapter=g10-ch3&section=concepts&concept=99',{waitUntil:'load'});
      assert.equal(await page.locator('.sp2-journey').getAttribute('data-view'),'index');

      // Keyboard Tab + Enter opens Concept 1
      await page.locator('.sp2-index-view .sp2-nav-button').first().focus();
      await page.keyboard.press('Enter');
      assert.equal(await page.locator('.sp2-journey').getAttribute('data-view'),'lesson');
      assert.equal(await page.locator('.hub-top-actions').isVisible(),false,'Parent back hidden inside lesson');
      assert.match(await page.locator('.sp2-concept-heading h4').innerText(),/^1\./);

      // Deep Dive collapsible toggle + Try it yourself wrong->Hint->right->Why + Exercise link + Back
      const deep=page.locator('details.g10ch3-deep-dive');
      assert.equal(await deep.evaluate(d=>d.open),false);
      await deep.locator('summary').click();
      assert.equal(await deep.evaluate(d=>d.open),true);

      const whyBtn=page.locator('[data-why]');
      assert.equal(await whyBtn.isDisabled(),true,'Why disabled before attempt');
      await page.locator('[data-answers] button[data-choice="0"]').click();
      assert.match(await page.locator('[data-feedback]').innerText(),/2\(x \+ y \+ z\)/);
      assert.equal(await whyBtn.isDisabled(),false,'Why unlocks after attempt');
      await page.locator('[data-hint]').click();
      assert.match(await page.locator('[data-feedback]').innerText(),/Add all three/);
      await page.locator('[data-answers] button[data-choice="1"]').click();
      assert.match(await page.locator('[data-feedback]').innerText(),/Correct!/);
      await whyBtn.click();
      await page.locator('[data-why-response]').waitFor({state:'visible'});

      // Exercise link opens Ex 3.1 Q1(i) and Back returns to Concept 1 (0-based index 0)
      await page.locator('.g10ch2-practice-link').first().click();
      assert.equal(new URL(page.url()).searchParams.get('question'),'c10-3-ex3-1-q1-i');
      await page.goBack();
      assert.equal(new URL(page.url()).searchParams.get('concept'),'0');

      // Top-right Next concept -> Concept 2; Concept 14 (index 13) Next -> returns to index
      await page.locator('[data-top-next]').click();
      assert.match(await page.locator('.sp2-concept-heading h4').innerText(),/^2\./);

      await page.goto(base+'/index.html?class=10&chapter=g10-ch3&section=concepts&concept=13',{waitUntil:'load'});
      assert.match(await page.locator('[data-top-next]').innerText(),/Back to concepts/);
      await page.locator('[data-top-next]').click();
      assert.equal(await page.locator('.sp2-journey').getAttribute('data-view'),'index');

      assert.deepEqual(pageErrors,[],'Unexpected runtime errors during navigation flow');
      await ctx.close();
    }

    /* 2. Sweep ALL 14 Concepts (indices 0..13) across Android portrait widths 320, 360, 393, 430 px */
    for(const width of [320,360,393,430]){
      const ctx=await browser.newContext({viewport:{width,height:800},serviceWorkers:'block'});
      const page=await ctx.newPage();
      const pageErrors=[];page.on('pageerror',err=>pageErrors.push(err.message));

      for(let idx=0;idx<14;idx++){
        const c=idx+1;
        await page.goto(base+'/index.html?class=10&chapter=g10-ch3&section=concepts&concept='+idx,{waitUntil:'load'});
        await page.locator('.g10ch3-lab').waitFor({state:'visible'});
        await assertNoOverflowAndValidMath(page,`EN ${width}px Concept ${c}`);
        if(width===320){
          const topCount=await page.locator('.g10ch3-lab > .g10ch3-tabs').first().locator('.g10ch3-tab').count().catch(()=>0);
          for(let t=0;t<topCount;t++){
            await page.locator('.g10ch3-lab > .g10ch3-tabs').first().locator('.g10ch3-tab').nth(t).click();
            await assertNoOverflowAndValidMath(page,`EN 320px Concept ${c} tab ${t}`);
          }
          await page.locator('[data-answers] button').first().click();
          await page.locator('[data-why]').click();
          await assertNoOverflowAndValidMath(page,`EN 320px Concept ${c} why`);
        }
        if(screenshotDir&&(width===320||width===393)){
          await page.screenshot({path:path.join(screenshotDir,`en-${width}-c${String(c).padStart(2,'0')}.png`),fullPage:true});
        }
      }
      assert.deepEqual(pageErrors,[],`Page errors at ${width}px EN`);
      await ctx.close();
    }

    /* 3. Interactive Lab Behavioral Assertions on All 14 Modules (360px) */
    {
      const ctx=await browser.newContext({viewport:{width:360,height:800},serviceWorkers:'block'});
      const page=await ctx.newPage();

      // Lab 1 (idx 0): linear-3vars
      await page.goto(base+'/index.html?class=10&chapter=g10-ch3&section=concepts&concept=0',{waitUntil:'load'});
      await page.locator('.g10ch3-btn-primary').click();
      assert.match(await page.locator('.g10ch3-lab .g10ch3-note').innerText(),/3x \+ 2z = 14/);
      await page.locator('.g10ch3-tab').nth(1).click();
      assert.equal(await page.locator('.g10ch3-lab svg circle').count(),1);

      // Lab 2 (idx 1): poly-gcd
      await page.goto(base+'/index.html?class=10&chapter=g10-ch3&section=concepts&concept=1',{waitUntil:'load'});
      await page.locator('.g10ch3-tab').nth(2).click();
      assert.match(await page.locator('.g10ch3-lab .g10ch3-note').innerText(),/x² − x \+ 1/);
      await page.locator('.g10ch3-chip-toggle').click();
      assert.equal(await page.locator('.g10ch3-callout').isVisible(),true);

      // Lab 3 (idx 2): lcm-gcd
      await page.goto(base+'/index.html?class=10&chapter=g10-ch3&section=concepts&concept=2',{waitUntil:'load'});
      await page.locator('.g10ch3-tab').nth(2).click();
      assert.match(await page.locator('.g10ch3-lab .g10ch3-note').innerText(),/TWO polynomials only/);

      // Lab 4 (idx 3): rational-excluded
      await page.goto(base+'/index.html?class=10&chapter=g10-ch3&section=concepts&concept=3',{waitUntil:'load'});
      await page.locator('.g10ch3-tab').nth(2).click();
      assert.equal(await page.locator('.g10ch3-lab .g10ch3-note.is-danger').count(),1);

      // Lab 5 (idx 4): rational-ops
      await page.goto(base+'/index.html?class=10&chapter=g10-ch3&section=concepts&concept=4',{waitUntil:'load'});
      await page.locator('.g10ch3-tab').nth(1).click();
      assert.match(await page.locator('.g10ch3-lab .g10ch3-note').innerText(),/flipping ONLY the second/i);
      assert.equal(await page.locator('.g10ch3-exercise-row .g10ch2-practice-link').count(),2,'Links Ex 3.5 & Ex 3.6');

      // Lab 6 (idx 5): poly-sqrt
      await page.goto(base+'/index.html?class=10&chapter=g10-ch3&section=concepts&concept=5',{waitUntil:'load'});
      await page.locator('.g10ch3-tab').nth(1).click();
      await page.locator('.g10ch3-stage .g10ch3-tab').nth(2).click();
      assert.match(await page.locator('.g10ch3-lab .g10ch3-note').innerText(),/3x² − 2x \+ 1/);

      // Lab 7 (idx 6): quad-form
      await page.goto(base+'/index.html?class=10&chapter=g10-ch3&section=concepts&concept=6',{waitUntil:'load'});
      await page.locator('.g10ch3-tab').nth(0).click();
      assert.match(await page.locator('.g10ch3-lab .g10ch3-note').innerText(),/α \+ β = 7, αβ = 10/);

      // Lab 8 (idx 7): quad-solve
      await page.goto(base+'/index.html?class=10&chapter=g10-ch3&section=concepts&concept=7',{waitUntil:'load'});
      assert.equal(await page.locator('.g10ch3-lab svg rect').count(),4);
      await page.locator('.g10ch3-tabs').first().locator('.g10ch3-tab').nth(1).click();
      await page.locator('.g10ch3-tabs').nth(1).locator('.g10ch3-tab').nth(2).click();
      assert.match(await page.locator('.g10ch3-lab .g10ch3-note').innerText(),/irrational roots/i);

      // Lab 9 (idx 8): discriminant
      await page.goto(base+'/index.html?class=10&chapter=g10-ch3&section=concepts&concept=8',{waitUntil:'load'});
      await page.locator('.g10ch3-lab svg[data-dg-ready]').waitFor();
      assert.equal(await page.locator('.g10ch3-lab svg circle').count(),2,'c=3 gives 2 real roots');
      await page.locator('.g10ch3-tab').nth(2).click(); // c=4
      await page.locator('.g10ch3-lab svg[data-dg-ready]').waitFor();
      assert.equal(await page.locator('.g10ch3-lab svg circle').count(),1,'c=4 gives 1 tangent root');
      await page.locator('.g10ch3-tab').nth(3).click(); // c=5
      await page.locator('.g10ch3-lab svg[data-dg-ready]').waitFor();
      assert.equal(await page.locator('.g10ch3-lab svg circle').count(),0,'c=5 gives 0 real roots');

      // Lab 10 (idx 9): roots-coeff
      await page.goto(base+'/index.html?class=10&chapter=g10-ch3&section=concepts&concept=9',{waitUntil:'load'});
      await page.locator('.g10ch3-tab').nth(3).click();
      assert.match(await page.locator('.g10ch3-lab .g10ch3-note').innerText(),/35/);

      // Lab 11 (idx 10): variations
      await page.goto(base+'/index.html?class=10&chapter=g10-ch3&section=concepts&concept=10',{waitUntil:'load'});
      await page.locator('.g10ch3-tabs').first().locator('.g10ch3-tab').nth(1).click();
      assert.match(await page.locator('.g10ch3-lab .g10ch3-note').innerText(),/xy = 12/);

      // Lab 12 (idx 11): quad-graphs
      await page.goto(base+'/index.html?class=10&chapter=g10-ch3&section=concepts&concept=11',{waitUntil:'load'});
      await page.locator('.g10ch3-tabs').first().locator('.g10ch3-tab').nth(1).click();
      await page.locator('.g10ch3-lab svg[data-dg-ready]').waitFor();
      assert.equal(await page.locator('.g10ch3-lab svg circle').count(),2,'2 intersection points');
      assert.match(await page.locator('.g10ch3-lab .g10ch3-note').innerText(),/x = −1 and x = 2/);

      // Lab 13 (idx 12): matrix-types
      await page.goto(base+'/index.html?class=10&chapter=g10-ch3&section=concepts&concept=12',{waitUntil:'load'});
      await page.locator('.g10ch3-mat-cell').nth(5).click();
      assert.match(await page.locator('.g10ch3-lab .g10ch3-note').innerText(),/Row 2, Column 3/);
      await page.locator('.g10ch3-chip-toggle').click();
      assert.equal(await page.locator('.g10ch3-mat-cell').count(),6);

      // Lab 14 (idx 13): matrix-ops
      await page.goto(base+'/index.html?class=10&chapter=g10-ch3&section=concepts&concept=13',{waitUntil:'load'});
      await page.locator('.g10ch3-mat-cell').nth(0).click();
      assert.match(await page.locator('.g10ch3-lab .g10ch3-note').innerText(),/AB ≠ BA/);
      await page.locator('.g10ch3-tabs').first().locator('.g10ch3-tab').nth(2).click();
      assert.match(await page.locator('.g10ch3-lab .g10ch3-note').innerText(),/zero matrix O/);

      await ctx.close();
    }

    /* 4. Tamil UI Render + Honest Draft Notice + No Overflow (320px & 393px) */
    for(const width of [320,393]){
      const ctx=await browser.newContext({viewport:{width,height:800},serviceWorkers:'block'});
      await ctx.addInitScript(()=>{try{localStorage.setItem('triggle-language','ta');}catch{}});
      const page=await ctx.newPage();
      await page.goto(base+'/index.html?class=10&chapter=g10-ch3&section=concepts',{waitUntil:'load'});
      assert.equal(await page.locator('html').getAttribute('lang'),'ta');
      assert.equal(await page.locator('.sp2-index-view .sp2-nav-button').count(),14);
      const ov=await page.evaluate(()=>document.documentElement.scrollWidth-document.documentElement.clientWidth);
      assert(ov<=1,`TA ${width}px Index overflow ${ov}`);

      for(const idx of [0,3,7,8,11,13]){
        const c=idx+1;
        await page.goto(base+'/index.html?class=10&chapter=g10-ch3&section=concepts&concept='+idx,{waitUntil:'load'});
        await page.locator('.g10ch3-tamil-badge').waitFor({state:'visible'});
        assert.match(await page.locator('.g10ch3-tamil-badge').innerText(),/ஆசிரியர் மீளாய்வு நிலுவையில்/);
        await assertNoOverflowAndValidMath(page,`TA ${width}px Concept ${c}`);
        if(screenshotDir&&width===393){
          await page.screenshot({path:path.join(screenshotDir,`ta-${width}-c${String(c).padStart(2,'0')}.png`),fullPage:true});
        }
      }
      await ctx.close();
    }

    /* 5. Offline Service Worker Persistence Check */
    {
      const ctx=await browser.newContext({viewport:{width:393,height:800},serviceWorkers:'allow'});
      const page=await ctx.newPage();
      await page.goto(base+'/index.html?class=10&chapter=g10-ch3&section=concepts&concept=8',{waitUntil:'load'});
      await page.evaluate(async()=>{
        if(!navigator.serviceWorker)return;
        await navigator.serviceWorker.ready;
        if(navigator.serviceWorker.controller)return;
        await new Promise(resolve=>{
          navigator.serviceWorker.addEventListener('controllerchange',()=>resolve(),{once:true});
          setTimeout(resolve,2500);
        });
      });
      await ctx.setOffline(true);
      await page.goto(base+'/index.html?class=10&chapter=g10-ch3&section=concepts&concept=8',{waitUntil:'load'});
      await page.locator('.g10ch3-lab svg').waitFor({state:'visible'});
      await assertNoOverflowAndValidMath(page,'Offline 393px Concept 9');
      await ctx.close();
    }

    console.log('PASS Grade 10 Chapter 3 Concepts Browser Suite: 14 interactive labs, 320/360/393/430px portrait, EN/TA bilingual, keyboard nav, KaTeX & offline SW');
  }finally{
    if(browser)await browser.close();
    await new Promise(r=>srv.close(r));
  }
}

run().catch(err=>{console.error(err);process.exit(1);});
