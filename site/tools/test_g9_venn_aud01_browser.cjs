'use strict';
// AUD01-01 — direct mobile acceptance of inline Venn, EN/TA.
const assert=require('node:assert/strict');
const {chromium}=require('playwright');
const {server,launchOptions}=require('./dashboard_test_support.cjs');
const operations=[
 ['intersection','{3,5}',['both']],
 ['union','{1,2,3,4,5,6}',['a','both','b']],
 ['difference','{1,2}',['a']],
 ['complement','{4,6,7}',['b','outside']],
 ['symmetric','{1,2,4,6}',['a','b']]
];
(async()=>{
 const app=await server(),browser=await chromium.launch(launchOptions());
 try {
  const page=await browser.newPage({viewport:{width:360,height:852},serviceWorkers:'block'});
  const errors=[];
  page.on('pageerror',e=>errors.push(e.message));
  for(const width of [320,360,390,430]){
   await page.setViewportSize({width,height:852});
   for(const lang of ['en','ta']){
    await page.goto(app.base+'/index.html?class=9&chapter=g9-ch1&section=concepts&concept=3');
    await page.locator(lang==='ta'?'#langTa':'#langEn').click();
    const svg=page.locator('.sp2-venn-svg');
    await svg.waitFor({state:'visible'});
    assert.equal(await svg.getAttribute('role'),'img','Accessible diagram '+lang);
    assert.equal(await svg.locator('desc').count(),1,'Region text equivalent');
    const definitions=await page.locator('.sp2-venn-defs').innerText();
    assert(definitions.includes(lang==='ta'?'அனைத்துக் கணம்':'universal set'),'U explained for '+lang);
    const buttons=page.locator('.sp2-venn-controls button');
    assert.equal(await buttons.count(),5,'Exactly five operations');
    const heights=await buttons.evaluateAll(nodes=>nodes.map(n=>n.getBoundingClientRect().height));
    assert(heights.every(h=>h>=44),'44px touch targets '+width+' '+lang);
    const bounds=await svg.boundingBox();
    assert(bounds&&bounds.width>150&&bounds.width<=width+1,'SVG fits '+width+'px');
    assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),'No mobile horizontal overflow '+width);
    for(const [key,answer,selected] of operations){
     await page.locator('[data-demo-mode="'+key+'"]').click();
     assert.equal(await page.locator('.sp2-venn-controls [aria-pressed="true"]').count(),1,'One active operation');
     const output=(await page.locator('[data-demo-output]').innerText()).replace(/\s+/g,'');
     assert(output.includes(answer),key+' calculated set '+width+' '+lang+': '+output);
     const fills=await svg.locator('[data-venn-region]').evaluateAll(nodes=>
      Object.fromEntries(nodes.map(n=>[n.dataset.vennRegion,n.getAttribute('fill')])));
     for(const [region,fill] of Object.entries(fills))
      assert.equal(fill,selected.includes(region)?'#c4ecd9':(region==='outside'?'#fbf9ff':'#fff'),
       key+' region '+region+' '+width+' '+lang);
     assert((await page.locator('[data-venn-explain]').innerText()).length>10,'Explanation follows '+key);
    }
    await page.locator('[data-demo-mode="intersection"]').focus();
    await page.keyboard.press('Enter');
    assert.equal(await page.locator('[data-demo-mode="intersection"]').getAttribute('aria-pressed'),'true');
    assert.equal(await page.locator('[data-math-error]').count(),0,'No math rendering errors');
    await page.goto(app.base+'/index.html?class=9&chapter=g9-ch1&section=concepts&concept=4');
    await page.locator(lang==='ta'?'#langTa':'#langEn').click();
    const distributiveSVG=page.locator('svg[aria-labelledby="sp2-distributive-title sp2-distributive-desc"]');
    assert.equal(await distributiveSVG.isVisible(),false,'Commutative mode starts without the distributive diagram');
    for(const [key,mode,members] of [['associative','associative',['1','2','3','4']],['distributive','intersection',['2']],['distributive-union','union',['1','2','3']]]){
     await page.locator('[data-demo-mode="'+key+'"]').click();
     assert(await distributiveSVG.isVisible(),'Diagram is visible for '+key);
     const selected=await distributiveSVG.evaluate((node,mode)=>{
      const regions={};
      for(const letter of ['a','b']){
       regions[letter]=node.querySelector('#sp2-distributive-'+letter+' circle');
      }
      regions.c=node.querySelector('g[stroke] circle:last-child');
      return [...node.querySelectorAll('text')].filter(label=>/^\d+$/.test(label.textContent)).filter(label=>{
       const point=new DOMPoint(Number(label.getAttribute('x')),Number(label.getAttribute('y')));
       const [a,b,c]=['a','b','c'].map(letter=>regions[letter].isPointInFill(point));
       if(mode==='associative')return a||b||c;
       return mode==='intersection'?a&&(b||c):a||(b&&c);
      }).map(label=>label.textContent);
     },mode);
     assert.deepEqual(selected,members,'Actual member positions represent '+key);
     assert((await page.locator('[data-demo-output]').innerText()).replace(/\s+/g,'').includes('{'+members.join(',')+'}'));
     assert.equal(await distributiveSVG.locator('[data-distributive="'+mode+'"]').isVisible(),true);
     for(const region of await distributiveSVG.locator('[data-distributive]:not([data-distributive="'+mode+'"])').all())assert.equal(await region.isVisible(),false);
     assert((await distributiveSVG.locator('desc').textContent()).length>15);
     assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),'Responsive distributive diagram');
    }
    assert.equal(await page.locator('[data-demo] .sp2-count-givens > span').count(),3,'All three sets appear before choosing a law');
    await page.goto(app.base+'/index.html?class=9&chapter=g9-ch1&section=concepts&concept=5');
    await page.locator(lang==='ta'?'#langTa':'#langEn').click();
    const difference=page.locator('[data-set-difference]');
    await difference.locator('summary').click();
    const formulas=(await difference.locator('p .katex-mathml math').allTextContents()).join(' ').replace(/\s+/g,'');
    assert(formulas.includes('(A−B)∩(A−C)={1}'),'Removing the union keeps only 1');
    assert(formulas.includes('(A−B)∪(A−C)={1,2,3}'),'Removing the intersection keeps all three');
    await page.goto(app.base+'/index.html?class=9&chapter=g9-ch1&section=concepts&concept=0');
    const memberButtons=page.locator('[data-demo-controls] button');
    assert.equal(await memberButtons.locator('.katex').count(),5,'Every membership chip uses the same math font');
    await page.locator('[data-demo-mode="3"]').click();
    await page.locator('#langTa').click();
    assert.equal(await page.locator('html').getAttribute('lang'),'ta');
    assert.equal(await page.locator('[data-demo-mode="3"]').getAttribute('aria-pressed'),'true','Tamil keeps the selected member');
    const tamilFont=await page.evaluate(async()=>await document.fonts.load('700 16px "Triggle Noto Sans Tamil"','அ'));
    assert(tamilFont.length>0,'Tamil font is locally loadable');
    await page.locator('#langEn').click();
    assert.equal(await page.locator('[data-demo-mode="3"]').getAttribute('aria-pressed'),'true','English keeps the selected member');
    await page.goto(app.base+'/index.html?class=9&chapter=g9-ch1&section=concepts&concept=1');
    await page.locator('[data-demo-mode="builder"]').click();
    const symbols=page.locator('[data-demo] .sp2-venn-explain');
    assert.match(await symbols.innerText(),/ℕ.*natural numbers.*belongs to.*such that/);
    assert.equal(await page.locator('[data-demo-output] mi[mathvariant="double-struck"]').textContent(),'N','MathML encodes blackboard-bold N');
    assert(await page.locator('[data-demo-output] .katex-html .mathbb').isVisible(),'The displayed KaTeX glyph is also blackboard-bold');


   }
  }
  assert.deepEqual(errors,[],'No browser JS errors');
  console.log('PASS AUD01-01: five Venn calculations and shadings, EN/TA, keyboard, 320–430px');
  await page.close();
 } finally { await browser.close(); await app.close(); }
})().catch(e=>{console.error(e);process.exitCode=1;});
