'use strict';
// Compare the inventory with figures reached through the public question and viewer entry points.
const fs=require('node:fs');
const path=require('node:path');
const {chromium,webkit}=require('playwright');
const {server,launchOptions}=require('./dashboard_test_support.cjs');

const wk=process.argv.includes('--webkit');
const width=Number(process.env.TRIGGLE_DIAGRAMGUARD_WIDTH||320);
const textSize=Number(process.env.TRIGGLE_DIAGRAMGUARD_TEXT_PERCENT||200);
if(!Number.isInteger(width)||width<320||![100,200].includes(textSize))throw Error('Expected a width of at least 320 and 100 or 200 percent text');
const inventoryFile=path.resolve(__dirname,'../../docs/evidence/ver-diagramguard-v1-0/inventory.csv');
const placements=new Map();
for(const line of fs.readFileSync(inventoryFile,'utf8').split('\n').slice(1)){
  const row=line.match(/^"([^"]*)","([^"]*)","([^"]*)","([^"]*)","([^"]*)"/);
  if(!row||!row[5].includes('figure dialog'))continue;
  for(const variant of row[1].split('; '))placements.set(variant.split(':')[0],row[5]);
}

(async()=>{
  const app=await server(process.env.TRIGGLE_DIAGRAMGUARD_SITE);
  let browser;
  try{
    browser=await(wk?webkit.launch():chromium.launch(launchOptions()));
    const context=await browser.newContext({viewport:{width,height:844},isMobile:width<768,hasTouch:width<768,serviceWorkers:'block'});
    const page=await context.newPage();
    const errors=[];
    page.on('pageerror',error=>errors.push({route:page.url(),message:error.message}));
    await page.goto(app.base+'/index.html?class=9');
    await page.locator('body:not(.ver-starting)').waitFor();
    const result=await page.evaluate(async ({placementRows,textSize,chapterFilter})=>{
      const expected=new Map(placementRows);
      const raf=()=>new Promise(requestAnimationFrame);
      const rows=[];
      const records=[9,10].flatMap(grade=>window.TRIGGLE_CLASSES[grade].items.filter(row=>expected.has(row.id))
        .map(row=>({grade,id:row.id,chapter:'g'+grade+'-ch'+row.chapter})));
      const read=async surface=>{
        const figures=[];
        for(const node of surface.querySelectorAll('svg,img')){
          if(node.closest('.katex')||!node.getClientRects().length)continue;
          if(node.tagName==='IMG'){
            const decoded=await node.decode().then(()=>true,()=>false);
            figures.push({kind:'image',src:new URL(node.currentSrc||node.src).pathname,decoded,alt:node.alt,
              horizontalClipping:window.TriggleDiagramGuard.horizontalClipping(node)});
          }else{
            const audit=window.TriggleDiagramGuard.audit(node,{discover:true});
            figures.push({kind:'svg',name:node.getAttribute('aria-label')||node.querySelector('title')?.textContent||'',
              issues:audit.issues,unmeasured:audit.unmeasured,horizontalClipping:audit.horizontalClipping});
          }
        }
        return figures;
      };
      document.documentElement.style.fontSize=textSize+'%';
      await document.fonts.load('16px "Triggle Noto Sans Tamil"','வடிவியல்');
      await document.fonts.ready;
      for(const locale of ['en','ta']){
        document.getElementById(locale==='en'?'langEn':'langTa').click();
        for(const {grade,id,chapter} of records){
          if(chapterFilter&&chapterFilter!==chapter)continue;
          history.replaceState({},'',`/index.html?class=${grade}&chapter=${chapter}&question=${encodeURIComponent(id)}`);
          dispatchEvent(new PopStateEvent('popstate'));
          await raf();
          const inlineHost=document.getElementById('inlineFigure');
          const inline=inlineHost.hidden?[]:await read(inlineHost);
          const open=inlineHost.hidden?document.getElementById('figureBtn'):document.getElementById('inlineFigureOpen');
          const dialog=document.getElementById('figureDialog');
          const close=document.getElementById('closeDiagram');
          let viewer=[];
          if(open.getClientRects().length&&!open.disabled){
            open.click();
            if(dialog.open){
              await raf();
              viewer=await read(document.getElementById('diagramContent'));
              close.click();
            }
          }
          rows.push({locale,chapter,id,expected:expected.get(id),inline,viewer});
        }
      }
      return {rows,missingRecords:placementRows.map(([id])=>id).filter(id=>!records.some(record=>record.id===id))};
    },{placementRows:[...placements],textSize,chapterFilter:process.env.TRIGGLE_DIAGRAMGUARD_CHAPTER});
    const figures=result.rows.flatMap(row=>[...row.inline,...row.viewer]);
    const summary={
      questions:new Set(result.rows.map(row=>row.id)).size, localeRoutes:result.rows.length,
      inline:result.rows.filter(row=>row.inline.length).length, viewers:result.rows.filter(row=>row.viewer.length).length,
      empty:result.rows.filter(row=>!row.inline.length&&!row.viewer.length).length,
      svgInstances:figures.filter(figure=>figure.kind==='svg').length,
      externalImages:figures.filter(figure=>figure.kind==='image').length,
      decodeErrors:figures.filter(figure=>figure.decoded===false).length,
      boundaryFlags:figures.flatMap(figure=>figure.issues||[]).filter(issue=>issue.kind==='boundary').length,
      horizontalClips:figures.filter(figure=>Object.values(figure.horizontalClipping||{}).some(px=>px>1)).length,
      flaggedSvgInstances:figures.filter(figure=>figure.issues?.length).length
    };
    console.log(JSON.stringify({engine:wk?'WebKit':'Chromium',width,textSize,summary,errors,...result},null,2));
    if(errors.length)process.exitCode=1;
  }finally{await browser?.close();await app.close();}
})().catch(error=>{console.error(error);process.exitCode=1});
