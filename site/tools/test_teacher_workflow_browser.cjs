'use strict';
// UI fault injection uses a controlled SDK double. Production Firebase is separately tested only where documented.
const assert=require('node:assert/strict');
const {chromium}=require('playwright'),{server,launchOptions}=require('./dashboard_test_support.cjs');
const firestore=`
const h=window.__reviewHarness;
export const getFirestore=()=>({});
export const collection=(_db,...parts)=>({path:parts.join('/')});
export const doc=(_db,...parts)=>({path:parts.join('/')});
export const where=(field,op,value)=>({field,op,value});
export const limit=n=>({limit:n});
export const orderBy=(field,order)=>({field,order});
export const startAfter=cursor=>({cursor});
export const query=(collection,...filters)=>({...collection,filters});
export const serverTimestamp=()=>({seconds:Math.floor(Date.now()/1000),toDate:()=>new Date()});
function snap(id,data){return {id,exists:()=>!!data,data:()=>data};}
export async function getDocFromServer(ref){
 if(ref.path.startsWith('teacherAccess/')){h.grantReads++;if(h.hangGrant)return new Promise(()=>{});if(h.delayGrant)await new Promise(r=>setTimeout(r,h.delayGrant));if(h.grantError)throw Object.assign(Error('offline'),{code:'unavailable'});return snap('grant',h.authorized?{role:'reviewer'}:null);}
 return snap(ref.path.split('/').at(-1),h.cases[ref.path]);
}
export async function getDocs(q){
 h.privateReads++;
 if(q.path.includes('/history'))return {docs:Object.entries(h.cases).filter(([p])=>p.startsWith(q.path+'/')).map(([p,v])=>snap(p.split('/').at(-1),v))};
 let rows=h.reviews.map((v,i)=>snap('review-'+i,v));
 const filter=q.filters?.find(f=>f.field==='questionId');if(filter)rows=rows.filter(r=>r.data().questionId===filter.value);
 return {docs:rows};
}
export async function addDoc(_ref,value){h.writes++;h.reviews.push(value);return {id:'review-'+(h.reviews.length-1)};}
export async function runTransaction(_db,fn){
 const pending=[];await fn({get:async ref=>snap(ref.path,h.cases[ref.path]),set:(ref,value)=>pending.push([ref.path,value])});
 for(const [p,v] of pending)h.cases[p]=v;
}
`;
const appSdk=`export const initializeApp=()=>{window.__reviewHarness.apps++;return {};};export const getApps=()=>[];export const getApp=()=>({});`;
const authSdk=`
const h=window.__reviewHarness;
const user={uid:'test-reviewer',getIdTokenResult:async()=>({claims:{firebase:{sign_in_provider:'google.com'}}})};
let observer;export const getAuth=()=>({});export class GoogleAuthProvider{setCustomParameters(){}}
export function onAuthStateChanged(_auth,fn){observer=fn;if(!h.hangAuth)queueMicrotask(()=>fn(h.signedIn?user:null));return ()=>{observer=null;};}
export async function signInWithPopup(){h.popups++;if(h.cancelPopup)throw Object.assign(Error('cancel'),{code:'auth/popup-closed-by-user'});h.signedIn=true;observer?.(user);}
export async function signOut(){h.signedIn=false;observer?.(null);}
`;
async function harness(browser,base,options={}){
 const ctx=await browser.newContext({viewport:{width:options.width||390,height:850},permissions:['clipboard-read','clipboard-write'],serviceWorkers:'block'});
 await ctx.addInitScript(opts=>{window.__reviewHarness={signedIn:false,authorized:true,hangAuth:false,hangGrant:false,grantError:false,cancelPopup:false,apps:0,popups:0,privateReads:0,grantReads:0,writes:0,reviews:[],cases:{},...opts};},options);
 const page=await ctx.newPage(),errors=[];
 if(options.shortTimeout)await page.route('**/teacher-review.html',async r=>{const response=await r.fetch();await r.fulfill({response,body:(await response.text()).replace('name="review-startup-timeout" content="12000"','name="review-startup-timeout" content="250"')});});
 if(options.failCss)await page.route('**/teacher-portal.css*',r=>r.abort());page.on('pageerror',e=>errors.push(e.message));
 await page.route('https://www.gstatic.com/firebasejs/**',r=>r.fulfill({contentType:'application/javascript',body:r.request().url().includes('firebase-auth')?authSdk:r.request().url().includes('firebase-firestore')?firestore:appSdk}));
 await page.goto(base+'/teacher-review.html');return {ctx,page,errors};
}
(async()=>{const app=await server(),browser=await chromium.launch(launchOptions());try{
 for(const width of [320,390,430]){
  const {ctx,page,errors}=await harness(browser,app.base,{width});
  await page.locator('#login').waitFor({state:'visible'});assert.equal(await page.locator('body').getAttribute('data-startup-state'),'ready-to-sign-in');
  assert.equal(await page.evaluate(()=>window.__reviewHarness.privateReads),0,'No anonymous review reads');
  await page.evaluate(()=>{window.__reviewHarness.cancelPopup=true;});await page.locator('#google-login').click();await page.waitForFunction(()=>document.getElementById('message').textContent.includes('cancelled'));assert.equal(await page.locator('#google-login').isEnabled(),true);
  await page.evaluate(()=>{window.__reviewHarness.cancelPopup=false;});await page.locator('#google-login').click();
  await page.waitForFunction(()=>document.body.dataset.startupState==='authorized');await page.waitForFunction(()=>document.getElementById('grade-select').options.length===4);
  await page.locator('#grade-select').selectOption('12');await page.waitForFunction(()=>document.getElementById('question-select').value.startsWith('g12-ch1'));
  await page.waitForFunction(()=>!document.getElementById('save-review').disabled);
  assert.ok(await page.locator('#question-text math').count()>0,'MathML matrices rendered in teacher view');
  await page.locator('#review-language').selectOption('ta');assert.match(await page.locator('#language-status').innerText(),/Tamil.*pending/);await page.locator('#review-language').selectOption('en');
  await page.locator('input[value="needs-correction"]').check();await page.locator('#issue-type').selectOption({label:'Incorrect calculation'});await page.locator('#remarks').fill('சரிபார்க்கவும் — synthetic test feedback.');
  await page.locator('#review-form').evaluate(form=>{form.requestSubmit();form.requestSubmit();});await page.waitForFunction(()=>window.__reviewHarness.writes===1);
  await page.waitForFunction(()=>document.getElementById('inbox-items').textContent.includes('synthetic test feedback'));
  assert.equal(await page.evaluate(()=>window.__reviewHarness.reviews[0].recordSha256.length),64);
  await page.locator('#inbox-items input[type="checkbox"]').check();await page.locator('#prepare-handoff').click();await page.locator('#copy-handoff').click();
  assert.match(await page.evaluate(()=>navigator.clipboard.readText()),/synthetic test feedback/);assert.match(await page.locator('#handoff-text').inputValue(),/Reviewed content SHA-256/);
  await page.locator('#inbox-decision').selectOption('approved');assert.equal(await page.locator('#inbox-items article').count(),0);await page.locator('#inbox-decision').selectOption('needs-correction');
  await page.locator('#inbox-items button').click();await page.locator('#correction-evidence').fill('Synthetic test source check');await page.locator('#correction-save').click();
  await page.waitForFunction(()=>Object.keys(window.__reviewHarness.cases).length===2);assert.ok(await page.locator('#correction-history').innerText().then(t=>t.includes('Reported')));
  assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),'No teacher overflow '+width);
  await page.locator('#signout').click();await page.locator('#login').waitFor({state:'visible'});assert.equal(await page.locator('#handoff-text').inputValue(),'');assert.equal(await page.locator('#inbox-items').innerText(),'');assert.equal(await page.locator('#history').innerText(),'');assert.deepEqual(errors,[]);
  await ctx.close();
 }
 for(const opts of [{signedIn:true,authorized:false},{signedIn:true,authorized:true}]){
  const {ctx,page}=await harness(browser,app.base,opts);await page.waitForFunction(()=>['unauthorized','authorized'].includes(document.body.dataset.startupState));
  if(!opts.authorized){assert.equal(await page.locator('#workspace').isVisible(),false);assert.equal(await page.locator('#denied').isVisible(),true);assert.equal(await page.evaluate(()=>window.__reviewHarness.privateReads),0);}
  else{await page.reload();await page.waitForFunction(()=>document.body.dataset.startupState==='authorized');assert.equal(await page.evaluate(()=>window.__reviewHarness.apps),1,'One app per page, also after persisted-login reload');}
  await ctx.close();
 }
 {const {ctx,page}=await harness(browser,app.base,{signedIn:true,authorized:true,shortTimeout:true,delayGrant:600});await page.locator('#startup-error').waitFor({state:'visible'});await page.waitForTimeout(700);assert.equal(await page.locator('#workspace').isVisible(),false,'Late authorization cannot revive a timed-out session');await ctx.close();}
 {const {ctx,page}=await harness(browser,app.base,{failCss:true});await page.locator('#login').waitFor({state:'visible'});assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));await ctx.close();}
 const {ctx,page}=await harness(browser,app.base,{signedIn:true,grantError:true});await page.locator('#startup-error').waitFor({state:'visible'});assert.equal(await page.locator('#workspace').isVisible(),false);await ctx.close();
 console.log('PASS teacher UI (controlled SDK): auth observer, sign-in/cancellation, unauthorized denial, persisted-login reload, server-grant outage, MathML/Tamil, review hash/note/duplicate prevention, inbox filters, private handoff, correction history, sign-out clearing, 320/390/430px.');
}finally{await browser.close();await app.close();}})().catch(e=>{console.error(e);process.exitCode=1;});
