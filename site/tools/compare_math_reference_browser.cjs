const fs=require('fs/promises'),assert=require('assert/strict');
const path=require('node:path');
const baseline=process.argv.find(s=>s.startsWith('--baseline='))?.slice(11);
if(!baseline)throw Error('Pass --baseline=/absolute/path/to/clean/main/checkout');
const {chromium}=require('playwright');
const after=require('./dashboard_test_support.cjs');
const before=require(path.resolve(baseline,'site/tools/dashboard_test_support.cjs'));
(async()=>{const a=await before.server(),z=await after.server(),b=await chromium.launch(after.launchOptions());try{
for(const width of [320,393,430])for(const id of ['c10-1-ex1-1-q1-i','c10-8-ex8-1-q5']){
 const images=[];for(const [label,app] of [['baseline',a],['updated',z]]){const c=await b.newContext({viewport:{width,height:852},serviceWorkers:'block'}),p=await c.newPage();
 await p.goto(app.base+'/index.html?class=10&question='+id);assert.equal(new URL(p.url()).searchParams.get('question'),id,'Requested Grade 10 question actually loaded');await p.locator('#stepsList .katex').first().waitFor();await p.evaluate(async()=>{document.body.getBoundingClientRect();await document.fonts.ready;await new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r)));});
 const file=path.resolve('screenshots/g9-typography')+'/g10-'+id+'-'+width+'-'+label+'.png';images.push(await p.locator('#lessonCard').screenshot({path:file,animations:'disabled'}));await c.close();}
 assert(images[0].equals(images[1]),id+' '+width+' exact Grade 10 screenshot comparison');console.log('PASS exact screenshot match '+id+' '+width+'px');
}
}finally{await b.close();await a.close();await z.close();}})().catch(e=>{console.error(e);process.exitCode=1;});
