'use strict';
/*
 * NEON Mission 03 — live-origin P0 evidence sweep.
 * Uses the PUBLIC GitHub Pages origin, never localhost. Focused smoke coverage
 * does not close all 46 findings or replace mathematical/source review.
 */
const assert=require('node:assert/strict');
const fs=require('node:fs/promises');
const path=require('node:path');
const {chromium}=require('playwright');
const BASE=process.env.TRIGGLE_LIVE_BASE||'https://vigneswaranmba20-afk.github.io/Triggle/site/index.html';
const OUT=path.resolve('screenshots/neon-m03-live-p0');
const WIDTHS=[320,390,412], LANGS=['en','ta'];
const CASES=[
  {id:'USER-AF09-01',label:'G10 Unit 6 Q2 signs',kind:'question',query:'class=10&question=c10-6-unit-q2'},
  {id:'USER-AF09-02',label:'G10 Unit 6 Q7 figure sample',kind:'question',query:'class=10&question=c10-6-unit-q7-iii'},
  {id:'AUD01-01',label:'G9 Venn five operations',kind:'concept',query:'class=9&chapter=g9-ch1&section=concepts&concept=3'},
  {id:'AUD02-01',label:'G9 nth-root symbols concept 4',kind:'concept',query:'class=9&chapter=g9-ch2&section=concepts&concept=3'},
  {id:'AUD02-01',label:'G9 exponent symbols concept 8',kind:'concept',query:'class=9&chapter=g9-ch2&section=concepts&concept=7'},
  {id:'AUD03-01',label:'G10 Algebra nested radical concept 10',kind:'concept',query:'class=10&chapter=g10-ch3&section=concepts&concept=9'},
  {id:'AUD03-02',label:'G10 Algebra glyph sample concept 1',kind:'concept',query:'class=10&chapter=g10-ch3&section=concepts&concept=0'},
  {id:'AUD06-02',label:'G9 Probability overlap union',kind:'concept',query:'class=9&chapter=g9-ch9&section=concepts&concept=4'},
  {id:'AUD07-02',label:'G10 Relations and Functions Ex1.3 Q4',kind:'question',query:'class=10&question=c10-1-1-3-q4'},
  {id:'AUD07-03',label:'G10 Relations and Functions Ex1.5 Q1',kind:'question',query:'class=10&question=c10-1-1-5-q1'}
];
function safe(s){return s.replace(/[^a-z0-9-]+/gi,'-');}
(async()=>{
 await fs.mkdir(OUT,{recursive:true});
 const browser=await chromium.launch({headless:true});
 const results=[];
 try{
  for(const width of WIDTHS){
   const context=await browser.newContext({viewport:{width,height:852},serviceWorkers:'block',reducedMotion:'reduce'});
   const page=await context.newPage();
   for(const lang of LANGS)for(let i=0;i<CASES.length;i++){
    const c=CASES[i],tag=safe(c.id+'-'+i+'-'+lang+'-'+width);
    const entry={id:c.id,label:c.label,kind:c.kind,language:lang,width,query:c.query,ok:false};
    const exceptions=[];
    const onError=e=>exceptions.push(e.message);page.on('pageerror',onError);
    try{
     const response=await page.goto(BASE+'?'+c.query,{waitUntil:'domcontentloaded',timeout:45000});
     assert(response&&response.ok(),'Published GitHub Pages must return HTTP 200');
     await page.locator(lang==='ta'?'#langTa':'#langEn').click({timeout:20000});
     await page.locator(c.kind==='concept'?'.sp2-journey[data-view="lesson"]':'#lessonCard:not([hidden])')
       .waitFor({state:'visible',timeout:20000});
     await page.evaluate(()=>document.fonts.ready);
     const state=await page.evaluate(()=>{
       const fonts=document.fonts.status;
       const mathErrors=document.querySelectorAll('[data-math-error]').length;
       const overflow=document.documentElement.scrollWidth-innerWidth;
       const badGlyphs=[...document.querySelectorAll('.sp2-journey math, #lessonCard math')]
         .some(n=>/[\uFFFD\uE000-\uF8FF]/u.test(n.textContent||''));
       return{fonts,mathErrors,overflow,badGlyphs,locale:document.documentElement.lang};
     });
     assert.equal(state.locale,lang,'English/Tamil toggle applied');
     assert.equal(state.mathErrors,0,'No math-render failure markers');
     assert(!state.badGlyphs,'No replacement/private-use glyphs in MathML');
     assert(state.overflow<=1,'No horizontal document overflow: '+state.overflow+'px');
     assert.deepEqual(exceptions,[],'No uncaught JavaScript errors');
     if(c.id==='USER-AF09-01'){
       const text=(await page.locator('#lessonCard').innerText()).replace(/\s+/g,' ');
       assert(!text.includes('∓'),'No stray inverted plus/minus sign in Unit 6 Q2');
     }
     if(c.id==='AUD01-01'){
       assert.equal(await page.locator('.sp2-venn-controls button').count(),5,'All five Venn operations exist');
       await page.locator('[data-demo-mode="union"]').click();
       assert((await page.locator('[data-demo-output]').innerText()).replace(/\s+/g,'').includes('{1,2,3,4,5,6}'),
        'Venn union output stays correct');
     }
     if(c.id==='AUD06-02'){
       await page.locator('.probability-demo button').last().click();
       assert.match(await page.locator('.probability-result').innerText(),/Ticket 4 matches both/i);
     }
     const scroller=page.locator('.lesson-container');
     await page.screenshot({path:path.join(OUT,tag+'-top.png'),fullPage:true});
     if(await scroller.count()){
       await scroller.evaluate(node=>{node.scrollTop=Math.max(0,node.scrollHeight-node.clientHeight);});
       await page.screenshot({path:path.join(OUT,tag+'-bottom.png'),fullPage:true});
     }
     entry.ok=true;entry.state=state;
    }catch(e){
     entry.error=String(e&&e.stack||e);
     try{await page.screenshot({path:path.join(OUT,tag+'-FAILED.png'),fullPage:true,timeout:10000});}catch{}
     console.error('FAIL '+tag+': '+entry.error);
    }finally{
     page.off('pageerror',onError);
     results.push(entry);
    }
   }
   await context.close();
  }
 }finally{
  await fs.writeFile(path.join(OUT,'review-manifest.json'),JSON.stringify({
   purpose:'NEON Mission 03 focused live-origin P0 smoke, NOT complete audit closure',
   liveOrigin:BASE,githubCommit:process.env.GITHUB_SHA||'unknown',
   checkedWidths:WIDTHS,checkedLanguages:LANGS,scenarios:CASES.length,
   total:results.length,passed:results.filter(x=>x.ok).length,
   failed:results.filter(x=>!x.ok).length,
   note:'Visual screenshots require independent human/NEON review. Coverage is a subset of the original 46 findings.',
   results
  },null,2));
  await browser.close();
 }
 assert.equal(results.length,CASES.length*WIDTHS.length*LANGS.length,'Every targeted case has evidence');
 assert.equal(results.filter(x=>!x.ok).length,0,'All live P0 smoke checks must pass');
 console.log('PASS NEON M03 live-origin P0 smoke: '+results.length+' viewport/language/route checks and screenshots');
})().catch(e=>{console.error(e);process.exitCode=1;});
