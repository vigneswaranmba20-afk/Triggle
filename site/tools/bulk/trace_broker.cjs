#!/usr/bin/env node
'use strict';
// Development/CI only. No network implementation or provider credentials shipped.
const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto');
const bulk=require('../curriculum_bulk.cjs');
const digest=bulk.hashRecord;
class BrokerError extends Error{constructor(code){super(code);this.code=code;}}
const fail=code=>{throw new BrokerError(code);};
function usd(value){if(typeof value!=='number'||!Number.isFinite(value)||value<0||value>1000)fail('INVALID_BUDGET');return Math.ceil(value*1e6);}
function schemaCheck(value,schema){
 if(!schema||typeof schema!=='object'||Array.isArray(schema))fail('UNSUPPORTED_SCHEMA');
 const allowed=['type','required','properties','additionalProperties','items','enum','maxLength','maxItems'];
 if(Object.keys(schema).some(k=>!allowed.includes(k)))fail('UNSUPPORTED_SCHEMA');
 if(!['object','array','string','number','integer','boolean','null'].includes(schema.type))fail('UNSUPPORTED_SCHEMA');
 if(schema.enum&&(!Array.isArray(schema.enum)||!schema.enum.some(v=>digest(v)===digest(value))))fail('BAD_SCHEMA');
 if(schema.type==='object'){
  if(!value||typeof value!=='object'||Array.isArray(value))fail('BAD_SCHEMA');
  if(!Array.isArray(schema.required)||schema.additionalProperties!==false||!schema.properties||typeof schema.properties!=='object')fail('UNSUPPORTED_SCHEMA');
  if(schema.required.some(k=>!Object.hasOwn(value,k))||Object.keys(value).some(k=>!Object.hasOwn(schema.properties,k)))fail('BAD_SCHEMA');
  for(const [key,v] of Object.entries(value))schemaCheck(v,schema.properties[key]);
 }else if(schema.type==='array'){
  if(!Array.isArray(value)||!Number.isInteger(schema.maxItems)||schema.maxItems<0||value.length>schema.maxItems)fail('BAD_SCHEMA');
  for(const v of value)schemaCheck(v,schema.items);
 }else if(schema.type==='null'){if(value!==null)fail('BAD_SCHEMA');}
 else if(schema.type==='integer'){if(!Number.isSafeInteger(value))fail('BAD_SCHEMA');}
 else if(typeof value!==schema.type||schema.type==='number'&&!Number.isFinite(value))fail('BAD_SCHEMA');
 if(schema.type==='string'&&(!Number.isInteger(schema.maxLength)||schema.maxLength<0||value.length>schema.maxLength))fail('BAD_SCHEMA');
 return value;
}
function mask(value,secrets=[]){let text=String(value);for(const s of secrets.filter(s=>typeof s==='string'&&s))text=text.split(s).join('[REDACTED]');return text;}
const outputSchema={type:'object',required:['label','reviewRequired'],additionalProperties:false,properties:{label:{type:'string',maxLength:80},reviewRequired:{type:'boolean'}}};
const taskKey=(task,adapter)=>digest({input_hash:task.input_hash,capability:task.capability,sensitivity:task.sensitivity,quality:task.quality_level,schema:task.schema,max_output_tokens:task.max_output_tokens,adapter:adapter.id,version:adapter.version});
function mockAdapter(){return {id:'offline-mock-v1',version:'1',capabilities:['classification'],qualityLevels:['standard'],local:true,maxCostUsd:0,
 run:async()=>({output:{label:'SYNTHETIC_CANDIDATE',reviewRequired:true},costUsd:0})};}
function taskFixture(input='synthetic fixture'){return {capability:'classification',sensitivity:'public',quality_level:'standard',latency_sla:1000,budget:0,
 input,input_hash:digest(input),schema:outputSchema,max_output_tokens:128,retry_policy:{max_retries:1,max_delay_ms:1000}};}
class Broker{
 constructor({stateDir,adapters=[mockAdapter()],offline=true,spendingAuthorized=false,runBudgetUsd=0,dayBudgetUsd=0,providerBudgetsUsd={},
  maxItems=20,concurrency=2,maxOutputTokens=1024,circuitThreshold=3,env=process.env,now=()=>Date.now(),sleep,root=bulk.ROOT}={}){
  if(!stateDir)fail('STATE_DIRECTORY_REQUIRED');
  this.root=root;this.stateDir=path.resolve(stateDir);
  fs.mkdirSync(this.stateDir,{recursive:true,mode:0o700});
  const real=fs.realpathSync(this.stateDir),publicDir=path.resolve(root,'site');
  if(real===publicDir||real.startsWith(publicDir+path.sep))fail('PUBLIC_STATE_DIRECTORY_FORBIDDEN');
  if(fs.statSync(real).mode&0o077)fail('STATE_DIRECTORY_MUST_BE_PRIVATE');
  if(!Number.isInteger(maxItems)||maxItems<1||maxItems>1000||!Number.isInteger(concurrency)||concurrency<1||concurrency>8||!Number.isInteger(maxOutputTokens)||maxOutputTokens<1||maxOutputTokens>32768||!Number.isInteger(circuitThreshold)||circuitThreshold<1)fail('INVALID_LIMITS');
  if(new Set(adapters.map(a=>a.id)).size!==adapters.length)fail('DUPLICATE_ADAPTER');
  this.adapters=adapters;this.offline=offline;this.spendingAuthorized=spendingAuthorized;this.env=env;this.now=now;
  this.runCeiling=usd(runBudgetUsd);this.dayCeiling=usd(dayBudgetUsd);this.providerCeilings=Object.fromEntries(Object.entries(providerBudgetsUsd).map(([k,v])=>[k,usd(v)]));
  this.maxItems=maxItems;this.concurrency=concurrency;this.maxOutputTokens=maxOutputTokens;this.circuitThreshold=circuitThreshold;
  this.sleep=sleep||((ms,signal)=>new Promise((resolve,reject)=>{
   if(signal?.aborted)return reject(new BrokerError('CANCELLED'));
   const onAbort=()=>{clearTimeout(timer);reject(new BrokerError('CANCELLED'));};
   const timer=setTimeout(()=>{signal?.removeEventListener('abort',onAbort);resolve();},ms);signal?.addEventListener('abort',onAbort,{once:true});
  }));
  this.runId=crypto.randomUUID();this.runSpent=0;this.failures=new Map();this.pending=new Map();this.bindings=new Map();this.events=[];this.active=0;this.waiting=[];
 }
 file(name){return path.join(this.stateDir,name);}
 readState(){const f=this.file('accounting.json');if(!fs.existsSync(f))return {schemaVersion:1,days:{},jobs:{},bindings:{}};
  try{const s=JSON.parse(fs.readFileSync(f,'utf8'));if(s.schemaVersion!==1||!s.days||!s.jobs||!s.bindings)fail('INVALID_ACCOUNTING');
   for(const d of Object.values(s.days))if(!Number.isSafeInteger(d.total)||d.total<0||!d.providers||Object.values(d.providers).some(v=>!Number.isSafeInteger(v)||v<0)||Object.values(d.providers).reduce((a,b)=>a+b,0)!==d.total)fail('INVALID_ACCOUNTING');
   return s;}catch{fail('INVALID_ACCOUNTING');}}
 mutate(fn){return bulk.withLock('integration',()=>{const state=this.readState(),value=fn(state);bulk.atomicJson(this.file('accounting.json'),state);return value;},{root:this.root});}
 validateTask(task){
  if(!task||typeof task!=='object'||typeof task.capability!=='string'||!task.capability||!['public','textbook-excerpt','private'].includes(task.sensitivity)||!['standard','high'].includes(task.quality_level)||
   !Number.isInteger(task.latency_sla)||task.latency_sla<1||task.latency_sla>60000||!Number.isInteger(task.max_output_tokens)||task.max_output_tokens<1||task.max_output_tokens>this.maxOutputTokens||
   !task.retry_policy||!Number.isInteger(task.retry_policy.max_retries)||task.retry_policy.max_retries<0||task.retry_policy.max_retries>3||!Number.isInteger(task.retry_policy.max_delay_ms)||task.retry_policy.max_delay_ms<0||task.retry_policy.max_delay_ms>60000)fail('INVALID_TASK');
  usd(task.budget);if(task.input_hash!==digest(task.input))fail('INPUT_HASH_MISMATCH');
  if(Buffer.byteLength(JSON.stringify(task.input)??'')>65536)fail('INPUT_TOO_LARGE');
  // Compile the supported schema subset even on cache hits. No unsupported keyword is ignored.
  const checkSchema=s=>{if(!s||typeof s!=='object')fail('UNSUPPORTED_SCHEMA');
   if(Object.keys(s).some(k=>!['type','required','properties','additionalProperties','items','enum','maxLength','maxItems'].includes(k)))fail('UNSUPPORTED_SCHEMA');
   if(s.type==='object'){if(s.additionalProperties!==false||!Array.isArray(s.required)||!s.properties)fail('UNSUPPORTED_SCHEMA');for(const v of Object.values(s.properties))checkSchema(v);}
   else if(s.type==='array'){if(!Number.isInteger(s.maxItems)||s.maxItems<0)fail('UNSUPPORTED_SCHEMA');checkSchema(s.items);}
   else if(s.type==='string'){if(!Number.isInteger(s.maxLength)||s.maxLength<0)fail('UNSUPPORTED_SCHEMA');}
   else if(!['number','integer','boolean','null'].includes(s.type))fail('UNSUPPORTED_SCHEMA');};checkSchema(task.schema);
 }
 route(task){
  const choices=this.adapters.filter(a=>a.capabilities?.includes(task.capability)&&a.qualityLevels?.includes(task.quality_level)&&(!this.offline||a.local));
  if(!choices.length)fail('NO_COMPATIBLE_ADAPTER');
  choices.sort((a,b)=>Number(!a.local)-Number(!b.local)||usd(a.maxCostUsd)-usd(b.maxCostUsd)||a.id.localeCompare(b.id));
  const adapter=choices.find(a=>fs.existsSync(this.file(taskKey(task,a)+'.json'))||(this.failures.get(a.id)||0)<this.circuitThreshold);if(!adapter)fail('CIRCUIT_OPEN');
  if(!/^[a-z0-9-]{1,80}$/.test(adapter.id)||typeof adapter.run!=='function'||typeof adapter.version!=='string'||typeof adapter.local!=='boolean')fail('INVALID_ADAPTER');
  const cost=usd(adapter.maxCostUsd);
  if(!adapter.local&&!fs.existsSync(this.file(taskKey(task,adapter)+'.json'))){
   if(task.sensitivity==='private')fail('SENSITIVE_INPUT_BLOCKED');
   if(!adapter.credentialName||!this.env[adapter.credentialName])fail('MISSING_CREDENTIAL');
   if(!this.spendingAuthorized||cost<=0||!this.runCeiling||!this.dayCeiling||!this.providerCeilings[adapter.id])fail('SPENDING_NOT_AUTHORIZED');
  }else if(adapter.local&&cost!==0)fail('INVALID_LOCAL_COST');
  return adapter;
 }
 async run(task,{signal}={}){
  this.validateTask(task);if(signal?.aborted)fail('CANCELLED');const adapter=this.route(task);
  const key=taskKey(task,adapter);
  const identity=task.idempotency_key||key;if(typeof identity!=='string'||identity.length>200)fail('INVALID_IDEMPOTENCY_KEY');
  const old=this.bindings.get(identity);if(old&&old!==key)fail('IDEMPOTENCY_CONFLICT');this.bindings.set(identity,key);
  this.mutate(state=>{const binding=digest(identity);if(state.bindings[binding]&&state.bindings[binding]!==key)fail('IDEMPOTENCY_CONFLICT');state.bindings[binding]=key;});
  if(this.pending.has(key))return this.pending.get(key);
  const promise=this.withSlot(()=>this.execute(task,adapter,key,signal),signal);this.pending.set(key,promise);
  try{return await promise;}finally{this.pending.delete(key);}
 }
 async withSlot(fn,signal){
  if(signal?.aborted)fail('CANCELLED');
  if(this.active<this.concurrency)this.active++;
  else{
   if(this.waiting.length>=this.maxItems)fail('QUEUE_LIMIT');
   await new Promise((resolve,reject)=>{
    const waiter={resolve:()=>{signal?.removeEventListener('abort',onAbort);resolve();}};
    const onAbort=()=>{this.waiting=this.waiting.filter(w=>w!==waiter);reject(new BrokerError('CANCELLED'));};
    this.waiting.push(waiter);signal?.addEventListener('abort',onAbort,{once:true});
   });
  }
  try{if(signal?.aborted)fail('CANCELLED');return await fn();}
  finally{const next=this.waiting.shift();if(next)next.resolve();else this.active--;}
 }
 async execute(task,adapter,key,signal){
  const cached=this.file(key+'.json'),secretValues=this.adapters.map(a=>a.credentialName?this.env[a.credentialName]:null).filter(Boolean);
  if(fs.existsSync(cached)){
   let c;try{c=JSON.parse(fs.readFileSync(cached,'utf8'));}catch{fail('INVALID_CACHE');}
   if(c.key!==key||c.outputHash!==digest(c.output))fail('INVALID_CACHE');schemaCheck(c.output,task.schema);
   if(mask(JSON.stringify(c.output),secretValues)!==JSON.stringify(c.output))fail('PROTECTED_OUTPUT');
   return {key,adapter:adapter.id,status:'UNTRUSTED_CANDIDATE',output:c.output,cacheHit:true};
  }
  if(['reserved','interrupted'].includes(this.readState().jobs[key]?.status))fail('INTERRUPTED_REVIEW_REQUIRED');
  const maxCost=usd(adapter.maxCostUsd),taskCeiling=usd(task.budget);let taskSpent=0;
  for(let attempt=0;attempt<=task.retry_policy.max_retries;attempt++){
   if(signal?.aborted)fail('CANCELLED');
   this.mutate(state=>{
    const day=new Date(this.now()).toISOString().slice(0,10),d=state.days[day]||{total:0,providers:{}};
    if(maxCost>0&&(taskSpent+maxCost>taskCeiling||this.runSpent+maxCost>this.runCeiling||d.total+maxCost>this.dayCeiling||(d.providers[adapter.id]||0)+maxCost>(this.providerCeilings[adapter.id]??0)))fail('COST_CEILING');
    if(['reserved','interrupted'].includes(state.jobs[key]?.status))fail('INTERRUPTED_REVIEW_REQUIRED');
    d.total+=maxCost;d.providers[adapter.id]=(d.providers[adapter.id]||0)+maxCost;state.days[day]=d;
    state.jobs[key]={status:'reserved',runId:this.runId,adapter:adapter.id,attempt,reservedMicros:maxCost,inputHash:task.input_hash};
   });
   this.runSpent+=maxCost;taskSpent+=maxCost;
   const controller=new AbortController(),onAbort=()=>controller.abort();signal?.addEventListener('abort',onAbort,{once:true});
   let timer,abortListener;
   try{
    const interrupted=new Promise((_,reject)=>{abortListener=()=>reject(new BrokerError(signal?.aborted?'CANCELLED':'TIMEOUT'));controller.signal.addEventListener('abort',abortListener,{once:true});});
    timer=setTimeout(()=>controller.abort(),task.latency_sla);
    const response=await Promise.race([Promise.resolve().then(()=>adapter.run(task,{signal:controller.signal,idempotencyKey:key,maxOutputTokens:task.max_output_tokens})),interrupted]);
    schemaCheck(response?.output,task.schema);
    if(usd(response.costUsd)>maxCost)fail('ADAPTER_COST_CONTRACT_VIOLATION');
    const encoded=JSON.stringify(response.output);if(encoded.length>65536)fail('OUTPUT_TOO_LARGE');
    if(mask(encoded,secretValues)!==encoded)fail('PROTECTED_OUTPUT');
    // Reserve worst-case cost permanently, including ambiguous failed attempts.
    // Accounting intentionally never assumes an unconfirmed refund.
    bulk.atomicJson(cached,{key,output:response.output,outputHash:digest(response.output)});
    this.mutate(s=>{s.jobs[key].status='completed';});this.failures.set(adapter.id,0);
    this.events.push({key,adapter:adapter.id,attempt,status:'candidate',reservedMicros:maxCost});
    return {key,adapter:adapter.id,status:'UNTRUSTED_CANDIDATE',output:response.output,cacheHit:false};
   }catch(error){
    const status=Number(error?.status),code=error instanceof BrokerError?error.code:status===429?'RATE_LIMITED':status>=500&&status<=599?'PROVIDER_5XX':'ADAPTER_FAILED';
    this.mutate(s=>{s.jobs[key].status=['TIMEOUT','CANCELLED'].includes(code)?'interrupted':'failed';});this.failures.set(adapter.id,(this.failures.get(adapter.id)||0)+1);
    this.events.push({key,adapter:adapter.id,attempt,status:code,reservedMicros:maxCost});
    if(code==='CANCELLED'||signal?.aborted)fail('CANCELLED');
    if(code==='TIMEOUT')fail('TIMEOUT'); // Do not overlap a retry with an unconfirmed cancelled request.
    if(!['TIMEOUT','RATE_LIMITED','PROVIDER_5XX','ADAPTER_FAILED'].includes(code)||attempt===task.retry_policy.max_retries||(this.failures.get(adapter.id)||0)>=this.circuitThreshold)fail(code);
    let delay=100*2**attempt;
    if(status===429&&error.retryAfter!==undefined){const v=error.retryAfter;delay=/^\d+(?:\.\d+)?$/.test(String(v))?Number(v)*1000:Date.parse(v)-this.now();if(!Number.isFinite(delay)||delay<0)fail('INVALID_RETRY_AFTER');}
    if(delay>task.retry_policy.max_delay_ms)fail('RETRY_AFTER_EXCEEDS_POLICY');
    await this.sleep(delay,signal);
   }finally{clearTimeout(timer);signal?.removeEventListener('abort',onAbort);if(abortListener)controller.signal.removeEventListener('abort',abortListener);}
  }
 }
 async batch(tasks,{signal}={}){
  if(!Array.isArray(tasks)||tasks.length>this.maxItems)fail('MAX_ITEMS_EXCEEDED');
  // Validate the whole queue before starting any work.
  tasks.forEach(t=>this.validateTask(t));const results=new Array(tasks.length);let next=0;
  await Promise.all(Array.from({length:Math.min(this.concurrency,tasks.length)},async()=>{
   while(next<tasks.length){const i=next++;try{results[i]={ok:true,result:await this.run(tasks[i],{signal})};}catch(e){results[i]={ok:false,code:e instanceof BrokerError?e.code:'INTERNAL_ERROR'};}}
  }));return results;
 }
 report(){return {schemaVersion:1,mode:this.offline?'offline':'adapter-injection',adapterAvailability:this.adapters.map(a=>({id:a.id,local:!!a.local,credentialAvailable:a.credentialName?!!this.env[a.credentialName]:null})),
  reservedCostUsd:this.runSpent/1e6,events:this.events,policy:'Outputs are candidates. Reserved cost is a conservative ceiling, not a provider invoice. No input text or credential values in traces.'};}
}
async function main(args){
 const opts={};for(let i=0;i<args.length;i++){if(['--offline','--dry-run'].includes(args[i]))opts[args[i]]=true;else if(['--budget-usd','--max-items','--report','--state-dir'].includes(args[i])&&args[i+1])opts[args[i]]=args[++i];else fail('INVALID_ARGUMENT');}
 if(!opts['--offline']||!opts['--dry-run'])fail('OFFLINE_DRY_RUN_REQUIRED');if(Number(opts['--budget-usd']||0)!==0)fail('NO_LIVE_ADAPTER_INSTALLED');
 const broker=new Broker({stateDir:opts['--state-dir']||'/tmp/triggle-trace-state',maxItems:Number(opts['--max-items']||1)});
 const results=await broker.batch([taskFixture()]);const report={...broker.report(),fixture:'LABELLED_SYNTHETIC_NOT_TEXTBOOK_CONTENT',results};
 if(opts['--report']){const file=path.resolve(opts['--report']);if(file===path.join(bulk.ROOT,'site')||file.startsWith(path.join(bulk.ROOT,'site')+path.sep))fail('PUBLIC_REPORT_FORBIDDEN');bulk.atomicJson(file,report);}
 console.log(JSON.stringify(report,null,2));if(results.some(r=>!r.ok))process.exitCode=1;
}
module.exports={Broker,BrokerError,schemaCheck,mask,outputSchema,mockAdapter,taskFixture};
if(require.main===module)main(process.argv.slice(2)).catch(e=>{console.error(e instanceof BrokerError?e.code:'INTERNAL_ERROR');process.exitCode=1;});
