'use strict';
const assert = require('node:assert/strict');
const { chromium, webkit } = require('playwright');
const { server, launchOptions } = require('./dashboard_test_support.cjs');

// Standalone expectations from both 2025 SCERT source books.
const quadrants = {P:[-7,6], Q:[7,-2], R:[-6,-7], S:[3,5], T:[3,9]};
const projections = {P:[-4,4], Q:[3,3], R:[4,-2], S:[-5,-3]};
const printed = {A:[-3,3], B:[2,3], C:[-6,-1], D:[5,-1]};
const fixtures = [
  [1,[{points:quadrants}]],
  [2,[{points:projections}]],
  [3,[{points:{A:[-5,3], B:[-1,3], C:[0,3], D:[5,3]}, edges:['AD']},
       {points:{E:[0,-4], F:[0,-2], G:[0,4], H:[0,5]}, edges:['EH']}]],
  [4,[{points:{P:[0,0], Q:[-4,0], R:[-4,-4], S:[0,-4]}, edges:['PQ','QR','RS','SP'], region:'PQRS'},
       {points:printed, edges:['AB','BC','CD','DA']},
       {points:printed, edges:['AB','BD','DC','CA'], region:'ABDC'}]]
];
const allWidths = [[320,844],[360,844],[375,844],[390,844],[412,844],[430,844],[768,1024],[1280,900],[667,375]];
const viewports = process.env.TRIGGLE_G9_COORDINATE_SMOKE ? [[320,844],[390,844]] : allWidths;
const route = question => '/index.html?class=9&chapter=g9-ch5&question=g9-ch5-ex5.1-q'+question;
const hypot = (a,b) => Math.hypot(a[0]-b[0],a[1]-b[1]);
const near = (actual,expected,context) => assert(Math.abs(actual-expected)<1e-4,`${context} ${actual} ≠ ${expected}`);

async function settle(page,percent) {
  await page.evaluate(async percent=>{
    document.documentElement.style.fontSize=percent+'%';
    await document.fonts.ready;
    for(let i=0;i<3;i++)await new Promise(requestAnimationFrame);
  },percent);
}

async function verify(figure, question, panels, lang, percent, context) {
  const svg = figure.locator('svg.diagramguard-coordinate[data-dg-ready]');
  await svg.nth(panels.length-1).waitFor();
  const measured = await svg.evaluateAll(list=>list.map(svg=>{
    const values = (el,names)=>names.map(name=>Number(el.getAttribute(name)));
    const lines = selector=>Object.fromEntries([...svg.querySelectorAll(selector)].map(el=>[
      el.dataset.dgObstacle,values(el,['x1','y1','x2','y2'])
    ]));
    const bounds = svg.getBoundingClientRect();
    return {
      audit:window.TriggleDiagramGuard.audit(svg,{discover:true}),
      points:Object.fromEntries([...svg.querySelectorAll('circle[data-dg-point]')].map(el=>[el.dataset.dgPoint,values(el,['cx','cy'])])),
      edges:lines('[data-dg-edge]'),
      xAxis:values(svg.querySelector('[data-dg-obstacle="X-axis"]'),['x1','y1','x2','y2']),
      yAxis:values(svg.querySelector('[data-dg-obstacle="Y-axis"]'),['x1','y1','x2','y2']),
      guides:lines('line[data-dg-obstacle$="-guide"]'),
      regions:[...svg.querySelectorAll('[data-dg-region]')].map(el=>el.dataset.dgRegion),
      labelPositions:Object.fromEntries([...svg.querySelectorAll('text')].map(el=>[el.dataset.dgLabel,values(el,['x','y'])])),
      description:svg.getAttribute('aria-label'),
      font:getComputedStyle(svg).fontFamily,
      bounds:[bounds.left,bounds.top,bounds.right,bounds.bottom],
      aspect:[bounds.width/svg.viewBox.baseVal.width,bounds.height/svg.viewBox.baseVal.height],
      overflow:document.documentElement.scrollWidth-document.documentElement.clientWidth
    };
  }));
  assert.equal(measured.length,panels.length,context);
  for (const [index,expected] of panels.entries()) {
    const panel = measured[index];
    const tag = context+' panel '+(index+1);
    assert(panel.audit.measured,tag);
    if (panel.audit.issues.length) {
      const ids=new Set(panel.audit.issues.flatMap(({label,with:withId})=>[label,withId]));
      const labels=panel.audit.labels.filter(({id})=>ids.has(id));
      assert.fail(tag+' intersections '+JSON.stringify({font:panel.font,bounds:panel.bounds,labels,issues:panel.audit.issues}));
    }
    assert.deepEqual(panel.audit.unmeasured,[],tag+' unmeasured obstacles');
    assert(panel.overflow<=1 && Math.abs(panel.aspect[0]-panel.aspect[1])<.005,tag+' reflow');
    if (panels.length===1) assert(panel.description.length>15&&(lang==='en'||/[\u0B80-\u0BFF]/.test(panel.description)),tag+' localized image');
    const [[a,first],[b,second]]=Object.entries(expected.points);
    const scale=hypot(panel.points[a],panel.points[b])/hypot(first,second);
    const origin=[panel.yAxis[0],panel.xAxis[1]];
    const project=([x,y])=>[origin[0]+x*scale,origin[1]-y*scale];
    for (const [id,source] of Object.entries(expected.points))
      near(hypot(panel.points[id],project(source)),0,tag+' point '+id);
    for (const id of expected.edges||[]) {
      const [x,y,u,v]=panel.edges[id];
      near(hypot([x,y],panel.points[id[0]]),0,tag+' '+id+' start');
      near(hypot([u,v],panel.points[id[1]]),0,tag+' '+id+' end');
    }
    assert.deepEqual(panel.regions,expected.region?[expected.region]:[],tag+' regions');
    for (const {id,fontPx} of panel.audit.labels) {
      const target=(id.includes('-tick-')?14:15)*percent/100;
      assert(Math.abs(fontPx-target)<.2,tag+' '+id+' font');
    }
    if (question===1) {
      for (const [id,[x,y]] of Object.entries({I:[1,-1],II:[-1,-1],III:[-1,1],IV:[1,1]})) {
        const [px,py]=panel.labelPositions[id];
        assert.equal(Math.sign(px-origin[0]),x,tag+' '+id+' x');
        assert.equal(Math.sign(py-origin[1]),y,tag+' '+id+' y');
      }
    }
    if (question===2) {
      for (const [id,[x,y]] of Object.entries(expected.points)) {
        const [[px,py],[xx,xy],[yx,yy]]=[[x,y],[x,0],[0,y]].map(project);
        assert.deepEqual(panel.guides[id+'-x-guide'].map(v=>v.toFixed(4)),[px,py,xx,xy].map(v=>v.toFixed(4)),tag+' x guide '+id);
        assert.deepEqual(panel.guides[id+'-y-guide'].map(v=>v.toFixed(4)),[px,py,yx,yy].map(v=>v.toFixed(4)),tag+' y guide '+id);
        near(panel.labelPositions['x-tick-'+x][0],px,tag+' x tick '+id);
        near(panel.labelPositions['y-tick-'+y][1],py,tag+' y tick '+id);
      }
    }
  }
  assert.equal(await figure.locator('.diagramguard-coordinate-key').count(),question===1?1:0,context+' key visibility');
  return measured.length;
}

async function main() {
  const isWebKit = process.argv.includes('--webkit');
  const live = process.env.TRIGGLE_G9_COORDINATE_BASE;
  const app = live ? {base:live.replace(/\/$/,''),close:async()=>{}} : await server();
  let browser,count=0;
  try {
    browser=await (isWebKit?webkit:chromium).launch(isWebKit?{headless:true}:launchOptions());
    const page=await browser.newPage({viewport:{width:390,height:844},serviceWorkers:'block'});
    page.setDefaultTimeout(10000);
    for (const [question,panels] of fixtures) {
      await page.goto(app.base+route(question));
      for (const lang of ['en','ta']) {
        if(await page.locator('html').getAttribute('lang')!==lang)
          await page.locator(lang==='ta'?'#langTa':'#langEn').evaluate(button=>button.click());
        await page.waitForFunction(lang=>document.documentElement.lang===lang,lang);
        if (process.env.TRIGGLE_COORDINATE_FALLBACK_FONT) {
          await page.evaluate(()=>document.body.style.setProperty('--ver-font','monospace'));
          await settle(page,150);
        }
        for (const [width,height] of viewports) {
          await page.setViewportSize({width,height});
          for (const percent of [100,200]) {
            await settle(page,percent);
            const name=`Q${question} ${lang} ${width}×${height} ${percent}%`;
            count+=await verify(page.locator('#inlineFigureVisual'),question,panels,lang,percent,name+' inline');
            const expand=page.locator('#inlineFigureOpen');
            await expand.click();
            await settle(page,percent);
            const dialog=page.locator('#figureDialog');
            assert(await dialog.locator('#closeDiagram').evaluate(node=>document.activeElement===node),name+' initial focus');
            count+=await verify(dialog.locator('.diagram-content'),question,panels,lang,percent,name+' enlarged');
            await page.keyboard.press('Escape');
            assert(await expand.evaluate(node=>document.activeElement===node),name+' returned focus');
          }
        }
      }
    }
    await page.setViewportSize({width:320,height:844});
    for (const [question,panels] of fixtures.slice(0,2)) {
      await page.goto(app.base+route(question));
      await page.evaluate(()=>document.body.style.setProperty('--ver-font','monospace'));
      await settle(page,150);
      const lang=await page.locator('html').getAttribute('lang');
      for (const percent of [100,200]) {
        await settle(page,percent);
        await verify(page.locator('#inlineFigureVisual'),question,panels,lang,percent,'Q'+question+' wide fallback font '+percent+'%');
      }
    }
    console.log(`PASS Grade 9 Exercise 5.1 coordinate figures in ${isWebKit?'WebKit':'Chromium'} (${count} bilingual panel renderings)`);
  } finally {
    await browser?.close();
    await app.close();
  }
}
main().catch(error=>{console.error(error);process.exitCode=1;});
