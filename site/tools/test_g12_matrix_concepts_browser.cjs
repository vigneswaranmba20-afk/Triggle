'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs/promises'),path=require('node:path');
const {chromium}=require('playwright'),{server,launchOptions}=require('./dashboard_test_support.cjs');
const route='/index.html?class=12&chapter=g12-ch1',shots=path.resolve(__dirname,'../../screenshots');
const noOverflow=async p=>assert(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),'Page must not scroll horizontally');
async function main(){
 const app=await server(),browser=await chromium.launch(launchOptions());await fs.mkdir(shots,{recursive:true});
 try{
  for(const width of [320,360,390,412,430,1280]){
   const ctx=await browser.newContext({viewport:{width,height:width===360?640:844},serviceWorkers:'block',reducedMotion:'reduce'}),p=await ctx.newPage(),errors=[],missing=[];
   p.on('pageerror',e=>errors.push(e.message));p.on('response',r=>{if(r.status()===404)missing.push(r.url());});
   await p.goto(app.base+route);
   assert.equal(await p.locator('.hub-section-card').count(),3,'Preserve Concepts/Exercises/Quizzes cards');
   assert.match(await p.locator('[data-hub-section=concepts]').innerText(),/9 available/);
   assert.match(await p.locator('[data-hub-section=quizzes]').innerText(),/More coming/,'No invented quiz coverage');
   await p.locator('[data-hub-section=concepts]').click();
   const lab=p.locator('.matrix-concepts'),control=key=>lab.locator('[data-control="'+key+'"]'),action=key=>lab.locator('[data-action="'+key+'"]'),result=()=>lab.locator('[data-result]').innerText();
   const go=async i=>{await lab.locator('[data-index-toggle]').click();await lab.locator('[data-scene="'+i+'"]').click();assert.equal(new URL(p.url()).searchParams.get('concept'),String(i));};
   await noOverflow(p);
   await lab.locator('[data-cell="1,0"]').click();await action('cofactor-step').click();assert.match(await result(),/M21 = 1 × 1 − 0 × 1 = 1/);
   await action('cofactor-step').click();assert.match(await result(),/C21 = −1 × \(1\) = -1/);
   await action('cofactor-step').click();assert.equal(await lab.locator('.mc-transpose').count(),1);
   assert.equal(await lab.locator('.mc-transpose td').first().evaluate(el=>getComputedStyle(el).animationName),'none','Reduced motion disables transpose animation');
   await lab.locator('[data-proof]').click();assert(await p.locator('dialog.mc-dialog').isVisible());await p.keyboard.press('Escape');await p.locator('dialog.mc-dialog').waitFor({state:'detached'});
   assert.equal(await lab.locator('[data-cell="1,0"]').getAttribute('aria-pressed'),'true','Proof returns to same visual state');
   await lab.locator('[data-check-toggle]').click();await lab.locator('[data-answer="0"]').click();assert.match(await lab.locator('[data-feedback]').innerText(),/odd.*negative/);
   await control('size').selectOption('2');await action('cofactor-step').click();assert.match(await result(),/M12 = 1/);await noOverflow(p);
   await go(1);await action('apply').click();assert.match(await result(),/AP = \(3, 1\)/);await action('undo').click();assert.match(await result(),/AA⁻¹ = I; A⁻¹A = I/);
   await control('height').selectOption('0');await action('apply').click();assert(await action('undo').isDisabled());assert.match(await result(),/both map to \(3, 0\)/);await noOverflow(p);
   await go(2);for(const expected of ['Bv = (2, 1)','A(Bv) = (3, 1)','A⁻¹(ABv) = Bv = (2, 1)','B⁻¹A⁻¹(ABv) = v = (1, 1)']){await action('order-step').click();assert((await result()).includes(expected));}
   await go(3);assert.match(await result(),/\(0, -2\)/);await control('mode').selectOption('point');assert.match(await result(),/\(0, 2\)/);
   await go(4);await action('cipher-step').click();assert.match(await result(),/First pair/);await action('cipher-step').click();assert.match(await result(),/Recovered message: HI/);await control('message').selectOption('MATH');await control('key').selectOption('two');await action('cipher-step').click();await action('cipher-step').click();assert.match(await result(),/Recovered message: MATH/);await noOverflow(p);
   await go(5);await action('row-apply').click();assert.match(await lab.locator('[data-visual] table').getAttribute('aria-label'),/1, 1, 3; 0, 1, 2; 1, 2, 5/);
   await control('target').selectOption('3');await control('scalar').selectOption('-1');await action('row-apply').click();await control('source').selectOption('2');await action('row-apply').click();assert.match(await result(),/Echelon form/);
   await control('kind').selectOption('scale');await control('scalar').selectOption('0');assert(await action('row-apply').isDisabled());assert.match(await result(),/erase an equation/);
   await action('row-undo').click();await control('kind').selectOption('swap');await control('target').selectOption('1');await control('source').selectOption('2');await action('row-apply').click();await noOverflow(p);
   await go(6);assert.match(await result(),/ρ\(A\) = 2/);await control('case').selectOption('independent');assert.match(await result(),/ρ\(A\) = 3/);await control('mode').selectOption('inverse');await action('identity-step').click();await action('identity-step').click();assert.match(await result(),/Right block = A⁻¹/);await control('case').selectOption('singular');await action('identity-step').click();assert.match(await result(),/No inverse exists/);
   await go(7);assert.match(await result(),/One intersection \(0, 1\)/);for(const method of ['inverse','cramer','gaussian']){await control('method').selectOption(method);assert.match(await result(),/One intersection \(0, 1\)/);}
   await control('slope').selectOption('1');assert.match(await result(),/infinitely many/);await control('rhs').selectOption('3');assert.match(await result(),/no solution/);await control('method').selectOption('inverse');assert.match(await result(),/does not exist/);await noOverflow(p);
   await go(8);assert.match(await result(),/1 free variable/);await control('case').selectOption('conflict');assert.match(await result(),/Inconsistent/);await control('homogeneous').selectOption('yes');assert.match(await result(),/nonzero solutions also exist/);await control('case').selectOption('unique');assert.match(await result(),/Only the trivial solution/);await control('case').selectOption('three');assert.match(await result(),/1 free variable/);await noOverflow(p);
   if(width===390){
    await go(6);await lab.locator('[data-exercises]').click();assert.equal(new URL(p.url()).searchParams.get('question'),'g12-ch1-ex1.2-q1-i');await p.goBack();
    await go(7);await control('method').selectOption('inverse');await lab.locator('[data-exercises]').click();assert.equal(new URL(p.url()).searchParams.get('question'),'g12-ch1-ex1.3-q1-i');await p.goBack();await go(8);
   }
   if([360,390,430,1280].includes(width)){
    await go(0);await p.screenshot({path:path.join(shots,'g12-cofactor-'+width+'.png'),fullPage:true});
    await go(8);await p.screenshot({path:path.join(shots,'g12-consistency-'+width+'.png'),fullPage:true});
   }
   await p.reload();assert.match(await lab.locator('.mc-scene-heading').innerText(),/Consistency Scanner/);assert.equal(await control('case').inputValue(),'three','Refresh keeps visual state');
   await go(2);await go(3);await p.goBack();assert.match(await lab.locator('.mc-scene-heading').innerText(),/Order Matters/,'Browser Back returns to prior scene');
   await p.locator('.hub-back-menu').click();assert.equal(await p.locator('.hub-section-card').count(),3);await p.locator('[data-hub-section=exercises]').click();assert.equal(new URL(p.url()).searchParams.get('question'),'g12-ch1-ex1.1-q1-i');assert(await p.locator('#stepsList .final-answer-step').isVisible());
   await p.locator('#langTa').click();assert.equal(await p.locator('.matrix-concepts').count(),0);assert(await p.locator('#questionText').innerText());await p.goto(app.base+route+'&section=concepts');assert.equal(await p.locator('.matrix-concepts').count(),0,'Tamil does not falsely expose English concepts');
   await p.locator('#langEn').click();assert.equal(await p.locator('.matrix-concepts').count(),1);await p.locator('#homeBtn').click();assert(await p.locator('#discoveryView').isVisible());
   assert.deepEqual(errors,[]);assert.deepEqual(missing,[]);await ctx.close();console.log('PASS all matrix interactions, predictions, proof, Back, refresh, exercises and EN/TA at '+width+'px');
  }
  const large=await browser.newContext({viewport:{width:360,height:640},serviceWorkers:'block'}),largePage=await large.newPage();
  await largePage.goto(app.base+route+'&section=concepts');await largePage.addStyleTag({content:'html{font-size:200%!important}'});
  for(let i=0;i<9;i++){if(i){await largePage.locator('[data-index-toggle]').click();await largePage.locator('[data-scene="'+i+'"]').click();}await noOverflow(largePage);assert(await largePage.locator('.mc-stage').evaluate(el=>el.scrollWidth<=el.clientWidth+1));}
  await large.close();console.log('PASS 200% text scaling at 360 × 640 with no clipped lesson stage');
  // The lesson is static and cached with the rest of the existing offline shell.
  const ctx=await browser.newContext({viewport:{width:390,height:844}}),p=await ctx.newPage();await p.goto(app.base+route+'&section=concepts&concept=1');
  await p.evaluate(async()=>{await navigator.serviceWorker.ready;await new Promise(resolve=>{if(navigator.serviceWorker.controller)resolve();else navigator.serviceWorker.addEventListener('controllerchange',resolve,{once:true});});});
  await p.waitForFunction(async()=>{const c=await caches.keys();return (await Promise.all(c.map(async k=>{const cache=await caches.open(k);return !!(await cache.match('./assets/matrix-concepts.js',{ignoreSearch:true}));}))).some(Boolean);});
  await ctx.setOffline(true);await p.reload();await p.locator('[data-action=apply]').click();assert.match(await p.locator('[data-result]').innerText(),/AP = \(3, 1\)/);await noOverflow(p);await ctx.close();
  console.log('PASS matrix lesson offline reload with exact current math and cached assets');
 }finally{await browser.close();await app.close();}
}
main().catch(e=>{console.error(e);process.exitCode=1;});
