// Grade 9 student usability audit. Node 22 + Playwright; no student data.
'use strict';
const fs=require('node:fs/promises');
const http=require('node:http');
const path=require('node:path');
const assert=require('node:assert/strict');
const {chromium}=require('playwright');
const root=path.resolve(__dirname,'..');
const out=path.resolve(root,'../audit-output/g9');
const types={'.html':'text/html','.js':'application/javascript','.css':'text/css','.json':'application/json','.webmanifest':'application/manifest+json','.svg':'image/svg+xml','.png':'image/png','.woff2':'font/woff2'};
const checks=[],findings=[];
function note(c,category,name,passed,details='',severity='high'){
 const result={...c,category,name,passed,details:String(details),severity};
 checks.push(result);
 if(!passed)findings.push(result);
}
async function check(c,name,category,run,severity='high'){
 try{note(c,category,name,true,await run()||'',severity);}
 catch(e){note(c,category,name,false,String(e.message||e).slice(0,600),severity);}
}
async function serve(){
 const server=http.createServer(async(req,res)=>{
  try{
   const uri=new URL(req.url,'http://localhost');
   const pathname=decodeURIComponent(uri.pathname);
   const file=path.resolve(root,'.'+(pathname.endsWith('/')?pathname+'index.html':pathname));
   if(!file.startsWith(root+path.sep))throw Error('outside site');
   const data=await fs.readFile(file);
   res.writeHead(200,{'content-type':types[path.extname(file)]||'application/octet-stream','cache-control':'no-store'});res.end(data);
  }catch{res.writeHead(404);res.end();}
 });
 await new Promise(r=>server.listen(0,'127.0.0.1',r));
 return {server,url:'http://127.0.0.1:'+server.address().port};
}
async function main(){
 await fs.mkdir(out,{recursive:true});
 const {server,url}=await serve();
 let browser;
 try{
  browser=await chromium.launch({headless:true,args:['--no-sandbox'],...(process.env.CHROMIUM_PATH?{executablePath:process.env.CHROMIUM_PATH}:{})});
  const AxeBuilder=(()=>{try{return require('@axe-core/playwright').default;}catch{return null;}})();
  for(const config of [{chapter:'g9-ch1',expected:7},{chapter:'g9-ch2',expected:8}])
  for(const lang of ['en','ta'])for(const width of [320,390,1280]){
   const c={chapter:config.chapter,lang,width};
   const context=await browser.newContext({viewport:{width,height:850},isMobile:width<500,hasTouch:width<500,reducedMotion:'reduce',serviceWorkers:'block'});
   const page=await context.newPage(),errors=[];
   page.on('pageerror',e=>errors.push(e.message));
   try{
    await check(c,'Direct chapter URL works','navigation',async()=>{
      await page.goto(url+'/index.html?class=9&chapter='+config.chapter,{waitUntil:'domcontentloaded'});
      await page.locator('#chapterOverviewTitle').waitFor({state:'visible',timeout:15000});
      return await page.locator('#chapterOverviewTitle').innerText();
    });
    if(!await page.locator('#chapterOverviewTitle').isVisible())continue;
    if(lang==='ta')await page.locator('#langTa').click();
    await check(c,'Translated chapter heading','bilingual',async()=>{
     const h=await page.locator('#chapterOverviewTitle').innerText();
     assert.ok(lang==='ta'?/[\u0B80-\u0BFF]/.test(h):/[A-Za-z]/.test(h),h);return h;
    });
    await check(c,'Four section choices','orientation',async()=>{
     for(const key of ['concepts','examples','exercises','quizzes'])
      assert.equal(await page.locator('.hub-section-card[data-hub-section="'+key+'"]').count(),1,key);
    });
    await check(c,'Readiness and question categories are clear','orientation',async()=>{
     const note=(await page.locator('.hub-question-breakdown').innerText()).trim();
     assert.ok(note.length>30,'Missing clear count explanation');
     assert.match(note,/\d+/,'Counts unavailable');
    });
    await check(c,'Interactive lesson stages available','interactivity',async()=>{
     await page.locator('.hub-section-card[data-hub-section="concepts"]').click();
     await page.locator('#chapterOverview .sp2-journey [data-nav] button').first().waitFor({state:'visible'});
     const count=await page.locator('#chapterOverview .sp2-journey [data-nav] button').count();
     assert.equal(count,config.expected);return count+' stages';
    });
    const lab=page.locator('#chapterOverview .sp2-journey');
    if(!await lab.isVisible())continue;
    await check(c,'Discoverable previous/next controls reach all concepts','navigation',async()=>{
     const prev=lab.locator('[data-journey-prev]'),next=lab.locator('[data-journey-next]'),index=lab.locator('[data-journey-index]');
     assert.equal(await prev.isDisabled(),true);
     assert.ok((await index.innerText()).includes('1'));
     await next.click();assert.ok((await index.innerText()).includes('2'));
     await prev.click();assert.ok((await index.innerText()).includes('1'));
     for(let n=1;n<config.expected;n++)await next.click();
     assert.equal(await next.isDisabled(),true);
     assert.equal(await lab.locator('[data-nav] button[aria-current="step"]').count(),1);
     await lab.locator('[data-nav] button').first().click();
    });
    await check(c,'Demo and self-check are usable','learning',async()=>{
     assert.ok(await lab.locator('[data-demo-controls] button,input[type=range]').count()>0,'No demo control');
     assert.ok(await lab.locator('[data-answers] button').count()>1,'No answer choices');
    });
    await check(c,'Answers produce explicit feedback','feedback',async()=>{
     await lab.locator('[data-answers] button').first().click();
     const msg=(await lab.locator('[data-feedback]').innerText()).trim();
     assert.ok(msg.length>2,'Feedback empty');return msg.slice(0,100);
    });
    await check(c,'Hints produce text','feedback',async()=>{
     await lab.locator('[data-hint]').click();
     const msg=(await lab.locator('[data-feedback]').innerText()).trim();
     assert.ok(msg.length>3,'Hint empty');return msg.slice(0,100);
    });
    await check(c,'Switching stages updates the problem','orientation',async()=>{
     const before=await lab.locator('[data-panel] h4').innerText();
     await lab.locator('[data-nav] button').nth(1).click();
     assert.notEqual(await lab.locator('[data-panel] h4').innerText(),before);
    });
    await check(c,'Second wrong answer gives a concept-specific clue','feedback',async()=>{
     await lab.locator('[data-nav] button').first().click();
     const idx=await page.evaluate(chapter=>{
       const p=chapter==='g9-ch1'?window.TRIGGLE_SET_PATH:window.TRIGGLE_REAL_PATH;
       return p.stages[0].correct===0?1:0;
     },config.chapter);
     const option=lab.locator('[data-answers] button').nth(idx);
     await option.click();const first=(await lab.locator('[data-feedback]').innerText()).trim();
     await option.click();const second=(await lab.locator('[data-feedback]').innerText()).trim();
     assert.ok(second.length>first.length,JSON.stringify({first,second}));
    });
    await check(c,'No browser JavaScript exceptions','stability',async()=>assert.deepEqual(errors,[]));
    await check(c,'No document-width overflow','reflow',async()=>{
     const m=await page.evaluate(()=>({window:innerWidth,document:document.documentElement.scrollWidth}));
     assert.ok(m.document<=m.window+1,JSON.stringify(m));
    },'medium');
    await check(c,'Controls have accessible text','accessibility',async()=>{
     const unnamed=await page.evaluate(()=>[...document.querySelectorAll('#chapterOverview button')].filter(el=>{
      const r=el.getBoundingClientRect();return r.width&&r.height&&!(el.textContent.trim()||el.ariaLabel||el.title);
     }).map(el=>el.outerHTML.slice(0,120)));
     assert.equal(unnamed.length,0,JSON.stringify(unnamed.slice(0,8)));
    },'medium');
    await check(c,'Touch targets are at least 24px (advisory)','touch',async()=>{
     const small=await page.evaluate(()=>[...document.querySelectorAll('#chapterOverview button')].filter(el=>{
      const r=el.getBoundingClientRect();return r.width&&r.height&&(r.width<24||r.height<24);
     }).map(el=>({name:el.innerText.trim().slice(0,35),w:Math.round(el.getBoundingClientRect().width),h:Math.round(el.getBoundingClientRect().height)})));
     assert.equal(small.length,0,JSON.stringify(small.slice(0,10)));
    },'advisory');
    await check(c,'200 percent text scaling (advisory)','magnification',async()=>{
     const r=await page.evaluate(()=>{document.documentElement.style.fontSize='200%';const d={window:innerWidth,document:document.documentElement.scrollWidth};document.documentElement.style.fontSize='';return d;});
     assert.ok(r.document<=r.window+1,JSON.stringify(r));
    },'advisory');
    if(AxeBuilder&&width===390){
     await check(c,'Axe WCAG 2.2 A/AA release gate','accessibility',async()=>{
      const a=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21a','wcag21aa','wcag22aa']).analyze();
      const violations=a.violations.map(v=>({id:v.id,impact:v.impact,nodes:v.nodes.length,details:v.nodes.slice(0,9).map(n=>({target:n.target,html:n.html.slice(0,180),why:(n.failureSummary||'').slice(0,240)}))}));
      assert.equal(violations.length,0,JSON.stringify(violations));
     },'high');
    }
    if(width<500)await page.screenshot({path:path.join(out,config.chapter+'-'+lang+'-'+width+'.png'),fullPage:true,animations:'disabled'});
   }finally{await context.close();}
  }
 }finally{if(browser)await browser.close();await new Promise(r=>server.close(r));}
 const blocking=findings.filter(v=>v.severity!=='advisory');
 const result={generatedAt:new Date().toISOString(),counts:{checks:checks.length,passed:checks.filter(v=>v.passed).length,findings:findings.length,blocking:blocking.length},findings,checks};
 await fs.writeFile(path.join(out,'results.json'),JSON.stringify(result,null,2));
 const md=['# Grade 9 Chapters 1 and 2 — Student Usability Audit','','Generated: '+result.generatedAt,
  'Checks: '+checks.length+'; passed: '+result.counts.passed+'; findings: '+findings.length+'.',
  '','These results DO NOT show that children understood the material. Supervised student pilots remain mandatory.',
  '','| Chapter | Language | Width | Severity | Area | Check | Detail |','|---|---|---:|---|---|---|---|',
  ...findings.map(f=>'| '+[f.chapter,f.lang,f.width,f.severity,f.category,f.name,f.details.replaceAll('|','/').replaceAll('\n',' ')].join(' | ')+' |')];
 await fs.writeFile(path.join(out,'report.md'),md.join('\n'));
 console.log(JSON.stringify(result.counts));
 for(const f of findings)console.log(f.severity+': '+f.chapter+' '+f.lang+' '+f.width+' '+f.name+' '+f.details);
 if(blocking.length)process.exitCode=1;
}
main().catch(e=>{console.error(e);process.exitCode=1;});