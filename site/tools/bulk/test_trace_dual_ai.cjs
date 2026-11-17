'use strict';
const assert=require('node:assert/strict');
const fs=require('node:fs'),os=require('node:os'),path=require('node:path');
const {
 REVIEW_SCHEMA,MODELS,IDS,checkRecord,validateCandidate,makeAdapter,taskFor,runDualReview,mergeReviews
}=require('./trace_dual_ai.cjs');
const fixture={
 id:'g10-ch2-gp-sum',sourceRef:'2025 EN/TA image-verified evidence fixture',
 sourceVerified:true,difficulty:'difficult',
 problem:'Find the sum 1 + 2 + 4 + 8.',
 solution:'S = 1 + 2 + 4 + 8 = 15. Independently 2S - S = 16 - 1 = 15.'
};
const candidate={verdict:'agree',summary:'The exact sum is fifteen.',issues:[],reviewRequired:true};
let count=0;
async function test(label,fn){await fn();count++;console.log('PASS TRACE dual '+label);}
const restore=(key,old)=>{if(old===undefined)delete process.env[key];else process.env[key]=old;};
(async()=>{
 await test('source evidence, difficulty, payload and schema guards',async()=>{
   assert.equal(checkRecord(fixture),fixture);
   assert.throws(()=>checkRecord({...fixture,sourceVerified:false}),/SOURCE_NOT_VERIFIED/);
   assert.throws(()=>checkRecord({...fixture,sourceRef:''}),/MISSING_SOURCE_EVIDENCE/);
   assert.throws(()=>checkRecord({...fixture,id:'../../oops'}),/INVALID_REVIEW_ID/);
   assert.throws(()=>checkRecord({...fixture,solution:'x'.repeat(4000)}),/INVALID_SOLUTION/);
   assert.throws(()=>validateCandidate({...candidate,reviewRequired:false}),/INVALID_PROVIDER_REVIEW/);
   assert.throws(()=>validateCandidate({...candidate,extra:'bad'}),/INVALID_PROVIDER_REVIEW/);
   assert.equal(REVIEW_SCHEMA.additionalProperties,false);
   assert.equal(MODELS.openai,'gpt-6-luna');
 });
 await test('OpenAI request is private, strict JSON and bounded',async()=>{
   let called=0;const captured=[];
   const adapter=makeAdapter('openai',{env:{OPENAI_API_KEY:'fixture-openai-secret'},fetchImpl:async(url,request)=>{
     called++;captured.push({url,request});return {ok:true,json:async()=>({status:'completed',output:[{content:[{type:'output_text',text:JSON.stringify(candidate)}]}]})};
   }});
   const response=await adapter.run({input:{claim:'demo'}},{maxOutputTokens:512});
   assert.equal(response.output.verdict,'agree');assert.equal(called,1);
   assert.equal(captured[0].url,'https://api.openai.com/v1/responses');
   assert.equal(captured[0].request.headers.authorization,'Bearer fixture-openai-secret');
   const body=JSON.parse(captured[0].request.body);
   assert.equal(body.model,MODELS.openai);assert.equal(body.store,false);
   assert.equal(body.text.format.strict,true);assert.equal(body.text.format.schema.additionalProperties,false);
   assert.equal(body.max_output_tokens,512);
   assert.equal(adapter.credentialName,'OPENAI_API_KEY');
 });
 await test('Gemini request uses structured JSON without unsupported constraints',async()=>{
   let calls=0;
   const adapter=makeAdapter('gemini',{env:{GEMINI_API_KEY:'fixture-gemini-secret'},fetchImpl:async(url,request)=>{
     calls++;assert(url.endsWith('/gemini-3.8-flash:generateContent'));
     assert.equal(request.headers['x-goog-api-key'],'fixture-gemini-secret');
     const body=JSON.parse(request.body);
     assert.equal(body.generationConfig.responseMimeType,'application/json');
     assert(!JSON.stringify(body.generationConfig.responseJsonSchema).includes('maxLength'));
     assert.equal(body.generationConfig.maxOutputTokens,512);
     return {ok:true,json:async()=>({candidates:[{content:{parts:[{text:JSON.stringify(candidate)}]}}]})};
   }});
   assert.equal((await adapter.run({input:{claim:'demo'}},{maxOutputTokens:512})).output.reviewRequired,true);
   assert.equal(calls,1);assert.equal(adapter.credentialName,'GEMINI_API_KEY');
 });
 await test('429 reports safe status without leaking provider body',async()=>{
   const adapter=makeAdapter('gemini',{env:{GEMINI_API_KEY:'secret'},fetchImpl:async()=>({
     ok:false,status:429,headers:{get:()=> '12'},json:async()=>{throw Error('SHOULD_NOT_READ_BODY');}
   })});
   await assert.rejects(adapter.run({input:{claim:'demo'}},{maxOutputTokens:128}),error=>
     error.status===429&&error.retryAfter===12&&error.message==='PROVIDER_HTTP_ERROR');
 });
 await test('local-first skips medium, and live cannot silently spend',async()=>{
   assert.equal((await runDualReview({...fixture,difficulty:'medium'})).status,'LOCAL_FIRST_SKIPPED');
   await assert.rejects(runDualReview(fixture,{live:true,authorizeSpend:false}),/EXPLICIT_SPEND_APPROVAL_REQUIRED/);
   assert.equal(taskFor('openai',fixture,true,{evidenceSha256:'a'.repeat(64),claim:'STRUCTURALLY_VALIDATED_NOT_VISUALLY_CERTIFIED'}).retry_policy.max_retries,0);
 });
 await test('offline pilot runs both mocked adapters and publishes nothing',async()=>{
   const dir=fs.mkdtempSync(path.join(os.tmpdir(),'trace-dual-tests-'));
   try{
     const result=await runDualReview(fixture,{stateDir:dir});
     assert.equal(result.status,'SYNTHETIC_REVIEW_ONLY');
     assert.equal(result.releaseApproved,false);
     assert.equal(result.entries.length,2);
     assert(result.entries.every(e=>e.ok&&e.candidate.reviewRequired));
     assert.equal(result.accounting.reservedCostUsd,0);
     const repeat=await runDualReview(fixture,{stateDir:dir});
     assert(repeat.entries.every(e=>e.cacheHit));
     assert(!fs.readdirSync(dir).some(x=>x.includes('secret')));
   }finally{fs.rmSync(dir,{recursive:true,force:true});}
 });
 await test('a disagreement never authorizes publication',async()=>{
   const entries=[
     {ok:true,result:{output:candidate,cacheHit:false}},
     {ok:true,result:{output:{...candidate,verdict:'disagree',issues:['Review cancellation']},cacheHit:false}}
   ];
   const result=mergeReviews(entries,'live');
   assert.equal(result.status,'DISAGREEMENT_REQUIRES_REVIEW');
   assert.equal(result.releaseApproved,false);
   assert.deepEqual(Object.keys(IDS).sort(),['gemini','openai']);
 });
 console.log('PASS '+count+' TRACE dual-AI groups; all HTTP calls mocked, external spend USD 0');
})().catch(e=>{console.error(e);process.exitCode=1;});
