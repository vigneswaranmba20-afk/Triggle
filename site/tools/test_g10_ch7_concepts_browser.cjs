'use strict';
/* Real-browser Playwright checks for Grade 10 Chapter 7 Mensuration Concept Studio across mobile viewports (320/390/412px), EN/TA, KaTeX clipping, interactions, reduced motion & SW offline reload. */
const assert=require('node:assert/strict');
const fs=require('node:fs'),http=require('node:http'),path=require('node:path');
const {chromium}=require('playwright');

const ROOT=path.resolve(__dirname,'..');
const CHROMIUM=process.env.CHROMIUM_PATH||(fs.existsSync('/usr/bin/chromium')?'/usr/bin/chromium':(fs.existsSync('/usr/bin/google-chrome')?'/usr/bin/google-chrome':undefined));
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
    const refText=document.querySelector('.sp2-stage-reference')?.textContent||'';
    const svgIssues=[];
    for(const svg of [...document.querySelectorAll('.g10ch4-lab svg, .g10ch4-glance-visual svg')].filter(s=>!s.closest('.katex'))){
      const sr=svg.getBoundingClientRect();
      const texts=[...svg.querySelectorAll('text')].filter(t=>t.textContent.trim().length>0);
      for(const t of texts){
        const r=t.getBoundingClientRect();
        if(r.width>0&&(r.left<sr.left-2||r.right>sr.right+2||r.top<sr.top-2||r.bottom>sr.bottom+2)){
          svgIssues.push({type:'clip',text:t.textContent.trim()});
        }
      }
      for(let i=0;i<texts.length;i++){
        for(let j=i+1;j<texts.length;j++){
          const a=texts[i].getBoundingClientRect(),b=texts[j].getBoundingClientRect();
          const ox=Math.min(a.right,b.right)-Math.max(a.left,b.left);
          const oy=Math.min(a.bottom,b.bottom)-Math.max(a.top,b.top);
          if(ox>3&&oy>3)svgIssues.push({type:'overlap',a:texts[i].textContent.trim(),b:texts[j].textContent.trim()});
        }
      }
    }
    return{docOverflow,clipped,smallButtons,svgCount:svgs.length,refText,svgIssues};
  });
  assert.equal(metrics.docOverflow,0,`${label}: horizontal overflow ${metrics.docOverflow}px`);
  assert(metrics.refText.includes('EN p.')&&metrics.refText.includes('TA p.'),`${label}: missing 2025 EN/TA page citation: ${metrics.refText}`);
  assert.deepEqual(metrics.svgIssues,[],`${label}: SVG collision/clipping issues: ${JSON.stringify(metrics.svgIssues)}`);
  assert.deepEqual(metrics.clipped,[],`${label}: clipped display formulas: ${JSON.stringify(metrics.clipped)}`);
  assert.deepEqual(metrics.smallButtons,[],`${label}: sub-40px touch controls: ${JSON.stringify(metrics.smallButtons)}`);
  assert(metrics.svgCount>=1,`${label}: expected rendered SVGs`);
}

async function run(){
  const{srv,base}=await startServer();
  let browser;
  try{
    browser=await chromium.launch({...(CHROMIUM?{executablePath:CHROMIUM}:{}),headless:true,args:['--no-sandbox','--disable-dev-shm-usage']});

    /* 1. Discovery + Chapter Overview + Index + Keyboard + Practice Connect + Back */
    {
      const ctx=await browser.newContext({viewport:{width:390,height:844},serviceWorkers:'block'});
      const page=await ctx.newPage();
      const pageErrors=[];page.on('pageerror',err=>pageErrors.push(err.message));

      await page.goto(base+'/index.html?class=10&browse=chapters',{waitUntil:'load'});
      const ch7Meta=await page.locator('.discover-chapter[data-chapter="g10-ch7"] .discover-chapter-meta').innerText();
      assert.match(ch7Meta,/9 Interactive mini-lessons available/i);

      await page.locator('.discover-chapter[data-chapter="g10-ch7"]').click();
      assert.match(await page.locator('.hub-section-card[data-hub-section="concepts"] .hub-section-count').innerText(),/9 available/i);

      await page.locator('.hub-section-card[data-hub-section="concepts"]').click();
      await page.locator('.sp2-index-view .sp2-nav-button').first().waitFor({state:'visible'});
      assert.equal(await page.locator('.sp2-index-view .sp2-nav-button').count(),9);

      await page.locator('.sp2-index-view .sp2-nav-button').nth(4).focus();
      await page.keyboard.press('Enter');
      assert.equal(await page.locator('.sp2-journey').getAttribute('data-view'),'lesson');
      assert.match(await page.locator('.sp2-concept-heading h4').innerText(),/^5\./);

      // Connect -> Ex 7.3 Q1 (Concept 8) + Back
      await page.goto(base+'/index.html?class=10&chapter=g10-ch7&section=concepts&concept=7',{waitUntil:'load'});
      const connectBtn=page.locator('.g10ch4-exercise-row .g10ch2-practice-link').first();
      await connectBtn.scrollIntoViewIfNeeded();
      await connectBtn.click();
      await page.waitForSelector('#lessonCard:not([hidden])');
      assert.match(page.url(),/question=c10-7-ex7-3-q1/);
      await page.goBack();
      await page.waitForSelector('.g10ch4-studio');
      assert.equal(pageErrors.length,0,'No page errors: '+pageErrors.join('; '));
      await ctx.close();
    }

    /* 2. All 9 concepts across 320px, 390px, and 412px in EN + TA */
    for(const width of [320,390,412]){
      const ctx=await browser.newContext({viewport:{width,height:740},serviceWorkers:'block',reducedMotion:'reduce'});
      const page=await ctx.newPage();
      const pageErrors=[];page.on('pageerror',err=>pageErrors.push(err.message));

      for(let i=0;i<9;i++){
        await page.goto(base+'/index.html?class=10&chapter=g10-ch7&section=concepts&concept='+i,{waitUntil:'load'});
        await assertStudioAndLayout(page,`EN ${width}px Concept ${i+1}`);
      }

      await page.locator('#langTa').click();
      for(let i=0;i<9;i++){
        await page.goto(base+'/index.html?class=10&chapter=g10-ch7&section=concepts&concept='+i,{waitUntil:'load'});
        await assertStudioAndLayout(page,`TA ${width}px Concept ${i+1}`);
      }
      assert.equal(pageErrors.length,0,`No page errors at ${width}px: `+pageErrors.join('; '));
      await ctx.close();
    }

    /* The cylinder selects the matching video without requesting media on page open. */
    {
      const ctx=await browser.newContext({viewport:{width:390,height:844},serviceWorkers:'block'});
      const page=await ctx.newPage();
      const requests=[];
      page.on('request',request=>{if(request.url().includes('/trace-videos/'))requests.push(request.url());});
      const dialog=page.locator('.sp2-concept-video-dialog');
      const video=dialog.locator('video');
      await page.goto(base+'/index.html?class=10&chapter=g10-ch7&section=concepts&concept=1');
      await page.getByRole('button',{name:/Watch video explanation/}).click();
      assert.equal(await video.getAttribute('src'),'https://pub-ed71b86e97a64b428086e292b26fb7a2.r2.dev/trace-videos/g10-ch7-cylinder-surface-area/eb43f9acdb47ccec08209731a0fcdeb9936b0f3152a1618b5c87c77bf884e033.mp4');
      await dialog.getByRole('button',{name:'Close visual lesson'}).click();
      await page.locator('#langTa').click();
      const tamilButton=page.getByRole('button',{name:/காணொளி விளக்கம்/});
      await tamilButton.click();
      assert.match(await video.getAttribute('src'),/\/trace-videos\/g10-ch7-cylinder-surface-area\/ta\/[a-f0-9]{64}\.mp4$/);
      assert.equal(await dialog.getByRole('heading').innerText(),'நேர் வட்ட உருளையின் புறப்பரப்பு');
      assert.equal(await video.evaluate(v=>v.controls&&v.playsInline&&v.paused&&!v.autoplay),true);
      await page.setViewportSize({width:844,height:390});
      assert.equal(await dialog.evaluate(d=>d.clientWidth>=d.scrollWidth),true,'Landscape dialog has no horizontal overflow');
      await dialog.getByRole('button',{name:'காணொளியை மூடு'}).click();
      assert.equal(await tamilButton.evaluate(b=>document.activeElement===b),true);
      assert.deepEqual(requests,[],'The lesson only streams on play');
      await page.goto(base+'/index.html?class=10&chapter=g10-ch7&section=concepts&concept=2');
      await page.locator('.g10ch4-studio').waitFor();
      assert.equal(await page.locator('.sp2-concept-video-button').count(),0,'English-only concept has no Tamil player');
      await ctx.close();
    }

    /* 3. Interactive Labs + Try-It-Yourself MCQ + Offline SW Reload + Saved Progress */
    {
      const ctx=await browser.newContext({viewport:{width:390,height:844}});
      const page=await ctx.newPage();
      const pageErrors=[];page.on('pageerror',err=>pageErrors.push(err.message));

      // Cylinder Solid/Hollow toggle
      await page.goto(base+'/index.html?class=10&chapter=g10-ch7&section=concepts&concept=1',{waitUntil:'load'});
      await page.locator('.g10ch4-tab').nth(1).click();
      assert.match(await page.locator('.g10ch4-metrics').innerText(),/Thickness/i);

      // Combined solids Cavity mode + Try It Yourself MCQ
      await page.goto(base+'/index.html?class=10&chapter=g10-ch7&section=concepts&concept=7',{waitUntil:'load'});
      await page.locator('.g10ch4-tab').nth(2).click();
      assert.match(await page.locator('.g10ch4-lab svg').innerHTML(),/Exposed inner cone/i);

      const whyBtn=page.locator('[data-why]');
      assert.equal(await whyBtn.isDisabled(),true,'Why button starts disabled');
      await page.locator('[data-hint]').click();
      assert(await page.locator('[data-feedback]').innerText());
      await page.locator('[data-answers] button').nth(0).click();
      assert.equal(await whyBtn.isDisabled(),false,'Attempt unlocks Why button (explainAfterAttempt)');
      await page.locator('[data-answers] button').nth(1).click();
      assert.equal(await whyBtn.isDisabled(),false,'Correct answer keeps Why unlocked');
      await whyBtn.click();
      assert.equal(await page.locator('[data-why-response]').isVisible(),true);

      // Wait for Service Worker registration and test offline reload
      await page.waitForFunction(async()=>{
        if(!('serviceWorker' in navigator))return false;
        const reg=await navigator.serviceWorker.ready;
        return Boolean(reg&&reg.active);
      },{timeout:10000});
      await ctx.setOffline(true);
      await page.reload({waitUntil:'load'});
      await page.waitForSelector('.g10ch4-studio');
      assert.match(await page.locator('.sp2-concept-heading h4').innerText(),/^8\./);
      assert.equal(pageErrors.length,0,'No page errors during offline reload: '+pageErrors.join('; '));
      await ctx.close();
    }

    console.log('PASS Grade 10 Chapter 7 Mensuration Concepts Browser: 320/390/412px EN/TA, KaTeX, SVG collisions, interactions, MCQ & offline reload');
  }finally{
    if(browser)await browser.close();
    srv.close();
  }
}

run().catch(err=>{console.error(err);process.exit(1);});
