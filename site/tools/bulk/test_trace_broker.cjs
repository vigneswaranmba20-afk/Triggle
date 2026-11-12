'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),os=require('node:os');
const {Broker,BrokerError,mockAdapter,taskFixture,mask}=require('./trace_broker.cjs');
const root=fs.mkdtempSync(path.join(os.tmpdir(),'trace-broker-tests-'));let count=0;
const fresh=()=>fs.mkdtempSync(path.join(root,'case-'));
const local=run=>({...mockAdapter(),run});
const ok=()=>({output:{label:'fixture',reviewRequired:true},costUsd:0});
const rejects=(p,code)=>assert.rejects(p,e=>e instanceof BrokerError&&e.code===code);
async function test(name,fn){await fn();count++;console.log('PASS TRACE broker '+name);}
const paid=(run=async()=>({...ok(),costUsd:0.01}))=>({id:'simulated-provider',version:'1',capabilities:['classification'],qualityLevels:['standard'],local:false,credentialName:'TRACE_TEST_KEY',maxCostUsd:0.01,run});
const paidConfig=()=>({stateDir:fresh(),adapters:[paid()],offline:false,spendingAuthorized:true,runBudgetUsd:0.1,dayBudgetUsd:0.1,providerBudgetsUsd:{'simulated-provider':0.1},env:{TRACE_TEST_KEY:'fixture-secret-never-a-real-key'}});
const paidTask=()=>({...taskFixture(),budget:0.1});
(async()=>{try{
 await test('offline default, output remains an untrusted candidate',async()=>{
  const b=new Broker({stateDir:fresh()});const r=await b.run(taskFixture());assert.equal(r.status,'UNTRUSTED_CANDIDATE');assert.equal(b.report().reservedCostUsd,0);
  await rejects(b.run({...taskFixture(),input_hash:'forged'}),'INPUT_HASH_MISMATCH');
  assert.throws(()=>new Broker({stateDir:fresh(),concurrency:9}),/INVALID_LIMITS/);
  assert.throws(()=>new Broker({stateDir:fresh(),spendingAuthorized:'false'}),/INVALID_AUTHORIZATION_FLAGS/);
  assert.throws(()=>new Broker({stateDir:fresh(),offline:'false'}),/INVALID_AUTHORIZATION_FLAGS/);
 });
 await test('missing keys and absent spending authority fail before invocation',async()=>{
  let calls=0;const conf=paidConfig();conf.adapters=[paid(async()=>{calls++;return ok();})];
  await rejects(new Broker({...conf,env:{}}).run(paidTask()),'MISSING_CREDENTIAL');
  await rejects(new Broker({...conf,spendingAuthorized:false}).run(paidTask()),'SPENDING_NOT_AUTHORIZED');
  await rejects(new Broker({...conf,offline:true}).run(paidTask()),'NO_COMPATIBLE_ADAPTER');
  await rejects(new Broker(conf).run({...paidTask(),sensitivity:'private'}),'SENSITIVE_INPUT_BLOCKED');assert.equal(calls,0);
 });
 await test('strict schema rejection, no unvalidated cache writes',async()=>{
  const dir=fresh(),b=new Broker({stateDir:dir,adapters:[local(async()=>({output:{label:42},costUsd:0}))]});
  await rejects(b.run(taskFixture()),'BAD_SCHEMA');assert.equal(fs.readdirSync(dir).filter(f=>/^[a-f0-9]{64}\.json$/.test(f)).length,0);
  await rejects(b.run({...taskFixture(),schema:{...taskFixture().schema,$ref:'unhandled'}}),'UNSUPPORTED_SCHEMA');
 });
 await test('timeout aborts and an uncertain job cannot be replayed',async()=>{
  let aborted=false,calls=0;const dir=fresh(),adapter=local(async(_t,{signal})=>{calls++;signal.addEventListener('abort',()=>{aborted=true;});return new Promise(()=>{});});
  const t={...taskFixture(),latency_sla:5};await rejects(new Broker({stateDir:dir,adapters:[adapter]}).run(t),'TIMEOUT');assert(aborted);
  await rejects(new Broker({stateDir:dir,adapters:[adapter]}).run(t),'INTERRUPTED_REVIEW_REQUIRED');assert.equal(calls,1);
 });
 await test('429 respects Retry-After and rejects excessive delays',async()=>{
  let calls=0;const delays=[];const adapter=local(async()=>{if(calls++===0)throw {status:429,retryAfter:'0.25'};return ok();});
  await new Broker({stateDir:fresh(),adapters:[adapter],sleep:async ms=>{delays.push(ms);}}).run(taskFixture());assert.deepEqual(delays,[250]);assert.equal(calls,2);
  await rejects(new Broker({stateDir:fresh(),adapters:[local(async()=>{throw {status:429,retryAfter:60};})]}).run(taskFixture()),'RETRY_AFTER_EXCEEDS_POLICY');
 });
 await test('Retry-After HTTP date and 5xx backoff',async()=>{
  const timestamp=Date.UTC(2026,10,12);let calls=0;const delays=[];
  const adapter=local(async()=>{if(calls++===0)throw {status:429,retryAfter:new Date(timestamp+1000).toUTCString()};return ok();});
  await new Broker({stateDir:fresh(),adapters:[adapter],now:()=>timestamp,sleep:async ms=>{delays.push(ms);}}).run(taskFixture());assert.deepEqual(delays,[1000]);
  calls=0;const b=new Broker({stateDir:fresh(),adapters:[local(async()=>{if(calls++===0)throw {status:503};return ok();})],sleep:async()=>{}});await b.run(taskFixture());assert.equal(calls,2);
 });
 await test('outage opens a circuit without exposing exception text',async()=>{
  let calls=0;const b=new Broker({stateDir:fresh(),circuitThreshold:1,adapters:[local(async()=>{calls++;throw Error('fixture-secret-never-a-real-key');})]});
  await rejects(b.run(taskFixture()),'ADAPTER_FAILED');await rejects(b.run(taskFixture('next')),'CIRCUIT_OPEN');assert.equal(calls,1);assert(!JSON.stringify(b.report()).includes('fixture-secret'));
 });
 await test('duplicate concurrency, persistent cache and idempotency conflict',async()=>{
  let calls=0;const dir=fresh(),adapter=local(async()=>{calls++;await new Promise(r=>setTimeout(r,5));return ok();}),b=new Broker({stateDir:dir,adapters:[adapter]});
  const t={...taskFixture(),idempotency_key:'stable-fixture'};await Promise.all([b.run(t),b.run(t)]);assert.equal(calls,1);
  const resumed=new Broker({stateDir:dir,adapters:[adapter]});assert((await resumed.run(t)).cacheHit);assert.equal(calls,1);
  await rejects(resumed.run({...taskFixture('different'),idempotency_key:'stable-fixture'}),'IDEMPOTENCY_CONFLICT');
  resumed.failures.set(adapter.id,3);assert((await resumed.run(t)).cacheHit,'A valid cache remains usable during a provider outage');
 });
 await test('run, daily, provider and task ceilings reserve each failed attempt',async()=>{
  for(const limit of ['run','day','provider','task']){
   let calls=0;const conf=paidConfig();conf.adapters=[paid(async()=>{calls++;throw {status:503};})];conf.sleep=async()=>{};
   if(limit==='run')conf.runBudgetUsd=0.01;if(limit==='day')conf.dayBudgetUsd=0.01;if(limit==='provider')conf.providerBudgetsUsd={'simulated-provider':0.01};
   const task=paidTask();if(limit==='task')task.budget=0.01;
   await rejects(new Broker(conf).run(task),'COST_CEILING');assert.equal(calls,1,limit);
  }
  const conf=paidConfig();conf.dayBudgetUsd=0.01;await new Broker(conf).run(paidTask());
  await rejects(new Broker(conf).run({...paidTask(),input:'next',input_hash:require('../curriculum_bulk.cjs').hashRecord('next')}),'COST_CEILING');
 });
 await test('secret masking and output protection',async()=>{
  const conf=paidConfig(),secret=conf.env.TRACE_TEST_KEY;conf.adapters=[paid(async()=>({output:{label:secret,reviewRequired:true},costUsd:0.01}))];
  await rejects(new Broker(conf).run(paidTask()),'PROTECTED_OUTPUT');
  const files=fs.readdirSync(conf.stateDir).map(f=>fs.readFileSync(path.join(conf.stateDir,f),'utf8')).join('');assert(!files.includes(secret));assert.equal(mask('x '+secret,[secret]),'x [REDACTED]');
 });
 await test('cancellation, queue bound and concurrency limit',async()=>{
  let active=0,peak=0;const adapter=local(async()=>{active++;peak=Math.max(peak,active);await new Promise(r=>setTimeout(r,5));active--;return ok();});
  const b=new Broker({stateDir:fresh(),adapters:[adapter],maxItems:4,concurrency:2});assert((await b.batch([0,1,2,3].map(i=>taskFixture(String(i))))).every(r=>r.ok));assert.equal(peak,2);
  await Promise.all([4,5,6,7,8,9].map(i=>b.run(taskFixture(String(i)))));assert.equal(peak,2,'Direct calls also respect broker concurrency');
  await rejects(b.batch([0,1,2,3,4].map(i=>taskFixture(String(i)))),'MAX_ITEMS_EXCEEDED');
  const c=new AbortController();c.abort();await rejects(b.run(taskFixture(),{signal:c.signal}),'CANCELLED');
 });
 await test('corrupt accounting fails closed and public state is forbidden',async()=>{
  const dir=fresh();fs.writeFileSync(path.join(dir,'accounting.json'),'{"schemaVersion":1,"days":{"today":{"total":-1,"providers":{}}},"jobs":{},"bindings":{}}');
  await rejects(new Broker({stateDir:dir}).run(taskFixture()),'INVALID_ACCOUNTING');
  assert.throws(()=>new Broker({stateDir:path.join(__dirname,'public-state-test')}),/PUBLIC_STATE_DIRECTORY_FORBIDDEN/);fs.rmdirSync(path.join(__dirname,'public-state-test'));
 });
 console.log(`PASS ${count} TRACE broker groups; all provider calls simulated, external spend USD 0`);
}finally{fs.rmSync(root,{recursive:true,force:true});}})().catch(e=>{console.error(e);process.exitCode=1;});
