'use strict';

const assert=require('node:assert/strict');
const {chromium}=require('playwright');
const {server,launchOptions}=require('./dashboard_test_support.cjs');
const {items}=require('../data/textbook-fidelity/frontier-geometry-descriptions.json');

const route=(base,id)=>`${base}/index.html?class=${id.startsWith('g9-')?9:10}&question=${id}`;
async function open(page,base,id){
  await page.evaluate(url=>{
    history.pushState({},'',url);
    dispatchEvent(new PopStateEvent('popstate'));
  },route(base,id));
}

async function inspect(page,record,locale){
  await page.locator(locale==='en'?'#langEn':'#langTa').evaluate(button=>button.click());
  await page.locator('#inlineFigureOpen:visible, #figureBtn:visible').evaluate(button=>button.click());
  assert(await page.locator('#figureDialog').evaluate(dialog=>dialog.open));
  const figure=await page.locator('#diagramContent').evaluate(async content=>{
    const image=content.querySelector('img');
    if(image){
      await image.decode();
      return {description:image.alt,src:image.getAttribute('src')};
    }
    return {description:content.querySelector('svg[role="img"]')?.getAttribute('aria-label')};
  });
  const caption=await page.locator('#visualTitle').innerText();
  assert((figure.description+' '+caption).toLowerCase().includes(record[locale].toLowerCase()), record.id+' '+locale);
  assert(figure.description.length>55,record.id+' description');
  if(record.asset) {
    const pathname=locale==='ta'?record.asset:record.asset.replace('-ta.svg','.svg');
    assert.equal(figure.src.replace(/^\.\//,''),pathname);
  }
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1),false);
  await page.locator('#closeDiagram').evaluate(button=>button.click());
}

async function compareAsset(page,asset){
  const result=await page.evaluate(async asset=>{
    const parse=async url=>new DOMParser().parseFromString(await (await fetch('./'+url)).text(),'image/svg+xml').documentElement;
    const english=await parse(asset.replace('-ta.svg','.svg')), tamil=await parse(asset);
    const shapes=svg=>[...svg.querySelectorAll('line,polyline,rect,circle,path,polygon')].map(element=>element.outerHTML);
    if(JSON.stringify(shapes(english))!==JSON.stringify(shapes(tamil)))return ['geometry differs'];
    tamil.style.position='absolute';tamil.style.top='-10000px';
    document.body.appendChild(tamil);
    try{
      await document.fonts.ready;
      const {x,y,width,height}=tamil.viewBox.baseVal;
      return [...tamil.querySelectorAll('text')].filter(label=>/\p{Script=Tamil}/u.test(label.textContent)).filter(label=>{
        const bounds=label.getBBox();
        return bounds.x<x-1||bounds.y<y-1||bounds.x+bounds.width>x+width+1||bounds.y+bounds.height>y+height+1;
      }).map(label=>label.textContent);
    } finally{tamil.remove();}
  },asset);
  assert.deepEqual(result,[],asset);
}

(async()=>{
  const live=process.env.TRIGGLE_LIVE_BASE;
  const app=live?null:await server();
  const base=live||app.base;
  const browser=await chromium.launch(launchOptions());
  try{
    await Promise.all((live?[390]:[320,360,390,412]).map(async width=>{
      const context=await browser.newContext({viewport:{width,height:844},isMobile:true,hasTouch:true,ignoreHTTPSErrors:!!live});
      try{
        const page=await context.newPage();
        await page.goto(route(base,items[0].id));
        for(const item of items){
          await open(page,base,item.id);
          await inspect(page,item,'en');
          await inspect(page,item,'ta');
          if(item.asset) await compareAsset(page,item.asset);
        }
        if(!live&&width===390){
          await page.evaluate(()=>navigator.serviceWorker.ready);
          await page.waitForFunction(()=>!!navigator.serviceWorker.controller);
          await context.setOffline(true);
          const item=items.find(item=>item.asset);
          await open(page,base,item.id);
          await page.reload();
          await inspect(page,item,'ta');
        }
        console.log(`Six bilingual geometry figure descriptions, exact shapes and label bounds passed at ${width}px.`);
      } finally{await context.close();}
    }));
  } finally{
    await browser.close();
    await app?.close();
  }
})().catch(error=>{console.error(error);process.exitCode=1;});
