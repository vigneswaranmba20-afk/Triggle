'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const {chromium}=require('playwright'),{server,launchOptions}=require('./dashboard_test_support.cjs');
const items=JSON.parse(fs.readFileSync(path.join(__dirname,'../data/textbook-fidelity/g10-ch7-ex7-5.json'),'utf8')).items;
const norm=s=>s.replace(/\s+/g,' ').trim().replace(/^\d+\.\s*/,'');
(async()=>{const app=await server();let browser;try{
browser=await chromium.launch(launchOptions());
for(const width of [320,390,412]){
 const context=await browser.newContext({viewport:{width,height:820},isMobile:true,hasTouch:true,serviceWorkers:'block',reducedMotion:'reduce'});
 const page=await context.newPage(),errors=[];
 page.on('pageerror',e=>errors.push(e.message));
 for(const f of items){
   await page.goto(app.base+'/index.html?class=10&question='+f.id,{waitUntil:'load'});
   await page.locator('#lessonCard:not([hidden])').waitFor();
   for(const lang of ['en','ta']){
     const btn=page.locator(lang==='en'?'#langEn':'#langTa');
     if(await btn.getAttribute('aria-pressed')!=='true')await btn.click();
     await page.locator('#stepsList .step-reason').first().waitFor({state:'visible'});
     await page.evaluate(()=>document.fonts.ready);
     const state=await page.evaluate(()=>{
       const unitPowers=[];
       const logical=(sel,checkVisible=false)=>{
         const original=document.querySelector(sel);
         const node=original.cloneNode(true);
         // KaTeX has both painted and assistive layers. Recover the exact authored fallback once.
         for(const tex of node.querySelectorAll('[data-math-fallback]'))tex.replaceWith(document.createTextNode(tex.getAttribute('data-math-fallback')));
         // Native MathML uses separate base/exponent nodes; textContent alone flattens cm² to cm2.
         // Do not normalize raw digits into powers. Accept only the actual, matching msup structure.
         const actual=[...original.querySelectorAll('math[aria-label]')].filter(m=>!m.closest('[data-math-fallback]')&&/^cm[²³]$/.test(m.getAttribute('aria-label')));
         for(const [i,m] of [...node.querySelectorAll('math[aria-label]')].filter(m=>/^cm[²³]$/.test(m.getAttribute('aria-label'))).entries()){
           const label=m.getAttribute('aria-label'),power=label.endsWith('²')?'2':'3';
           const sup=m.firstElementChild;
           if(sup?.localName!=='msup'||sup.children.length!==2||sup.children[0].textContent!=='cm'||sup.children[1].textContent!==power)throw Error('Malformed unit exponent: '+label);
           if(checkVisible){
             const rendered=actual[i]?.firstElementChild;
             if(!rendered||rendered.localName!=='msup')throw Error('Missing rendered unit exponent: '+label);
             const base=rendered.children[0].getBoundingClientRect(),exponent=rendered.children[1].getBoundingClientRect();
             unitPowers.push({label,raised:base.width>0&&exponent.width>0&&exponent.height>0&&exponent.bottom<base.bottom});
           }
           m.replaceWith(document.createTextNode(label));
         }
         return node.textContent;
       };
       return {question:logical('#questionText',true),answer:logical('#answerText'),visibleAnswer:logical('.final-answer-value',true),unitPowers,steps:[...document.querySelectorAll('#stepsList .step-reason')].map(n=>n.innerText),math:document.querySelectorAll('#lessonCard .katex').length,errors:document.querySelectorAll('#lessonCard .katex-error,#lessonCard [data-math-error]').length,doc:document.documentElement.scrollWidth,width:innerWidth};
     });
     assert.equal(norm(state.question),norm(f.textbookPrompt[lang]),f.id+' '+lang+' question');
     assert.equal(norm(state.answer),norm(f.answerValue[lang]),f.id+' '+lang+' answer');
     assert.equal(norm(state.visibleAnswer),norm(f.answerValue[lang]),f.id+' '+lang+' visible final answer');
     if(lang==='en'){
       const expected=(f.textbookPrompt.en.match(/cm[²³]/g)||[]).length+(f.answerValue.en.match(/cm[²³]/g)||[]).length;
       assert.equal(state.unitPowers.length,expected,f.id+' native unit exponent count');
       for(const power of state.unitPowers)assert.ok(power.raised,f.id+' '+power.label+' must be visibly raised');
     }
     assert.ok(state.steps.length>=1);assert.ok(state.doc<=state.width+1,f.id+' '+lang+' overflow');
     if(lang==='ta')for(const reason of state.steps)assert.match(reason,/[\u0B80-\u0BFF]/);
     assert.equal(state.errors,0);if(!f.id.endsWith('-q11'))assert.ok(state.math>0);
   }
 }
 assert.deepEqual(errors,[]);await context.close();
}
console.log('PASS 90 Exercise 7.5 bilingual mobile views');
}finally{if(browser)await browser.close();await app.close();}})().catch(e=>{console.error(e);process.exitCode=1;});
