'use strict';
// TRACE Wave 1: economical PRODUCTION screening of historically repaired findings.
// This is deliberately NOT a closure oracle: a passing render/overflow screen
// cannot prove the original mathematical, source, interaction or diagram fix.
const assert=require('node:assert/strict');
const fs=require('node:fs');
const fsp=require('node:fs/promises');
const path=require('node:path');
const crypto=require('node:crypto');
const {chromium}=require('playwright');

const repo=path.resolve(__dirname,'../..');
const ledger=fs.readFileSync(path.join(repo,'docs/audit/WEEKEND_AF09_FIX_LOG.md'),'utf8');
const statuses=new Map(ledger.split('\n').filter(x=>/^\|\s*(?:AUD|USER-AF09)/.test(x)).map(line=>{
  const cells=line.split('|').map(x=>x.trim());
  return [cells[1],cells[4]];
}));
const fixed=[...statuses].filter(x=>x[1]==='FIXED_NOT_LIVE_VERIFIED').map(x=>x[0]).sort();
assert.equal(fixed.length,34,'Original AF-10R ledger must contain 34 repaired but unverified findings');

function c(grade,chapter,concept){return 'class='+grade+'&chapter=g'+grade+'-ch'+chapter+'&section=concepts&concept='+concept;}
function q(grade,id){return 'class='+grade+'&question='+id;}
function section(grade,chapter,name){return 'class='+grade+'&chapter=g'+grade+'-ch'+chapter+'&section='+name;}
const targets={
  'AUD01-03':c(9,1,4), 'AUD01-04':c(9,1,0),
  'AUD01-06':c(9,1,5), 'AUD01-07':c(9,1,1), 'AUD01-08':c(9,1,0),
  'AUD02-01':c(9,2,3), 'AUD02-02':c(9,2,2),
  'AUD02-03':c(9,2,1), 'AUD02-04':c(9,2,4),
  'AUD02-05':c(9,2,1), 'AUD02-06':c(9,2,0),
  'AUD03-02':c(10,3,0), 'AUD03-03':c(10,3,5),
  'AUD03-04':c(10,3,8), 'AUD03-05':c(10,3,12), 'AUD03-06':c(10,3,11),
  'AUD04-01':c(10,5,11), 'AUD04-02':c(10,5,0),
  'AUD04-03':c(10,5,1), 'AUD04-04':c(10,5,4), 'AUD04-05':c(10,5,0),
  'AUD05-01':c(10,6,8), 'AUD05-02':c(10,6,0),
  'AUD05-03':c(10,6,1), 'AUD05-05':c(10,6,9), 'AUD05-06':c(10,6,9),
  'AUD06-01':section(9,9,'exercises'),
  'AUD06-03':c(9,9,0), 'AUD06-04':c(9,9,0),
  'AUD07-02':q(10,'c10-1-1-3-q4'),
  'AUD07-03':q(10,'c10-1-1-5-q1'),
  'AUD07-04':q(10,'c10-1-1-5-q8'),
  'AUD07-05':q(10,'c10-1-1-4-q1'),
  'AUD07-06':section(10,1,'sources')
};
assert.deepEqual(Object.keys(targets).sort(),fixed,'Every historical unverified ID has one screening target');
const group=new Map();
for(const id of fixed){
  const query=targets[id];
  if(!group.has(query))group.set(query,[]);
  group.get(query).push(id);
}
const plan=[...group].sort((a,b)=>a[0].localeCompare(b[0]));
const shard=Number(process.env.AUDIT_SHARD_INDEX??0);
const total=Number(process.env.AUDIT_SHARD_TOTAL??4);
assert(Number.isInteger(shard)&&Number.isInteger(total)&&total>0&&shard>=0&&shard<total);
const assigned=plan.filter((_,i)=>i%total===shard);
assert(assigned.length>0,'No routes assigned to shard');
const BASE=process.env.TRIGGLE_LIVE_BASE||'https://vigneswaranmba20-afk.github.io/Triggle/site/index.html';
const OUT=path.join(repo,'screenshots/audit-wave1/shard-'+shard);
const WIDTHS=[320,390,412];
const LANGS=['en','ta'];
const sha=s=>crypto.createHash('sha256').update(s).digest('hex');
const safe=s=>s.replace(/[^a-zA-Z0-9_-]/g,'_');

(async()=>{
  await fsp.mkdir(OUT,{recursive:true});
  const entries=[],parity=[];
  const browser=await chromium.launch({headless:true});
  try{
    const context=await browser.newContext({viewport:{width:390,height:852},serviceWorkers:'block',reducedMotion:'reduce'});
    // Matching a handful of release-critical files is a provenance guard,
    // not evidence that every curriculum asset and source page is identical.
    const site=path.join(repo,'site');
    const publicDir=BASE.slice(0,BASE.lastIndexOf('/'));
    for(const rel of ['index.html','assets/app.js','assets/math-notation.js','service-worker.js']){
      try{
        const local=await fsp.readFile(path.join(site,rel));
        const remote=await context.request.get(publicDir+'/'+rel+'?wave1='+encodeURIComponent(process.env.GITHUB_SHA||'preview'),{timeout:45000});
        assert(remote.ok(),'HTTP status '+remote.status());
        const matches=sha(local)===sha(await remote.body());
        parity.push({path:rel,matches});
      }catch(e){parity.push({path:rel,matches:false,error:String(e)});}
    }
    const parityOK=parity.every(p=>p.matches);
    for(const [query,ids] of assigned){
      for(const width of WIDTHS)for(const lang of LANGS){
        const tag=safe(ids.join('_')+'_'+lang+'_'+width);
        const result={ids,query,width,lang,passed:false,screeningOnly:true};
        const page=await context.newPage();
        const errors=[];
        page.on('pageerror',e=>errors.push(e.message));
        try{
          await page.setViewportSize({width,height:852});
          const response=await page.goto(BASE+'?'+query,{waitUntil:'domcontentloaded',timeout:45000});
          assert(response&&response.ok(),'Live page HTTP 200');
          await page.locator(lang==='ta'?'#langTa':'#langEn').click({timeout:15000});
          const params=new URLSearchParams(query);
          const kind=params.has('question')?'question':params.get('section')==='concepts'?'concept':'page';
          if(kind==='question')await page.locator('#lessonCard:not([hidden])').waitFor({state:'visible',timeout:15000});
          if(kind==='concept')await page.locator('.sp2-journey[data-view="lesson"]').waitFor({state:'visible',timeout:15000});
          await page.evaluate(()=>document.fonts.ready);
          const state=await page.evaluate(()=>{
            const root=document.documentElement;
            return {
              language:root.lang,
              overflow:root.scrollWidth-root.clientWidth,
              mathErrors:document.querySelectorAll('[data-math-error]').length,
              visibleCharacters:(document.body.innerText||'').trim().length
            };
          });
          assert.equal(state.language,lang,'Language toggle');
          assert(state.overflow<=1,'Document horizontal overflow '+state.overflow+'px');
          assert.equal(state.mathErrors,0,'Math render errors');
          assert(state.visibleCharacters>100,'Nonempty learner page');
          assert.deepEqual(errors,[],'No page errors');
          result.state=state;result.passed=true;
          // Only one compact human-review screenshot per route, no fullPage
          // sticky-layout illusion, no repeated screenshot dumps per viewport.
          if(width===390&&lang==='en')await page.screenshot({path:path.join(OUT,tag+'-top.png'),fullPage:false});
        }catch(e){
          result.error=String(e&&e.stack||e);
          try{await page.screenshot({path:path.join(OUT,tag+'-FAILED.png'),fullPage:false,timeout:10000});}catch{}
          console.error('FAIL '+tag+' '+result.error);
        }finally{
          entries.push(result);
          await page.close();
        }
      }
    }
    await context.close();
    const summary={purpose:'Production screening only: NOT live closure of original audit behavior',
      branchSha:process.env.GITHUB_SHA||'unknown',liveBase:BASE,
      originalFixedPendingCount:fixed.length,distinctScreenRoutes:plan.length,
      shard,total,screenRoutesAssigned:assigned.length,
      routeAssetsCompared:parity,coreAssetParity:parityOK,
      checks:entries.length,passed:entries.filter(e=>e.passed).length,
      failed:entries.filter(e=>!e.passed).length,
      warning:'PASS means page/language/math-render/no-overflow smoke only. Requires independent original-bug reproduction and reviewer evidence for CLOSED_LIVE_VERIFIED.',
      entries};
    await fsp.writeFile(path.join(OUT,'manifest.json'),JSON.stringify(summary,null,2));
    console.log('Wave 1 shard '+shard+': '+summary.passed+'/'+summary.checks+' live screens passed; asset parity='+parityOK);
    assert(parityOK,'Live release assets must match tested branch before acceptance');
    assert.equal(summary.failed,0,'One or more live screening checks failed');
  }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
