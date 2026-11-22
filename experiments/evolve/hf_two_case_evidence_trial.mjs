#!/usr/bin/env node
// Re-run exactly two rejected Hugging Face audits with evidence-grounded schema.
// No source edits, no patches applied, no retry, no deployment. Uses short-lived OIDC.
import {readFile,writeFile} from 'node:fs/promises';
import {join,resolve} from 'node:path';
import {fileURLToPath} from 'node:url';
import {acquireAccessToken} from './hf_oidc_auth_probe.mjs';
import {CASES,MODEL,SOURCE_SHA,evidencePacket,promptFor,validateProposal} from './hf_two_case_evidence_policy.mjs';

const APPROVAL='EVOLVE-HF-TWO-RETRY-20261123';
const MODEL_ID='Qwen/Qwen3-Coder-30B-A3B-Instruct';
const PROVIDER='amazon-bedrock';
const OUTPUT=join(process.env.RUNNER_TEMP||'/tmp','evolve-two-case-evidence.json');
async function loadCases(){
 const root=resolve(process.env.TRIGGLE_SOURCE_ROOT||'.');
 const arr=[];
 for(const c of CASES){
  const file=await readFile(join(root,c.file),'utf8');
  const evidence=evidencePacket(file,c);
  arr.push({case:c,evidence,prompt:promptFor(c,evidence)});
 }
 return arr;
}
async function liveRates(){
 const response=await fetch('https://router.huggingface.co/v1/models',{headers:{Accept:'application/json'}});
 if(!response.ok)throw Error('Model price fetch failure; no paid calls');
 const info=await response.json();
 const provider=info?.data?.find(x=>x.id===MODEL_ID)?.providers?.find(x=>x.provider===PROVIDER&&x.status==='live');
 const input=Number(provider?.pricing?.input),output=Number(provider?.pricing?.output);
 if(!provider||provider.pricing?.input==null||provider.pricing?.output==null||
   !Number.isFinite(input)||!Number.isFinite(output)||input<0||output<0)
  throw Error('Model price unavailable; no paid calls');
 return {input,output};
}
async function oneCall(prompt,token){
 const controller=new AbortController(),timer=setTimeout(()=>controller.abort(),65000);
 try{
  const response=await fetch('https://router.huggingface.co/v1/chat/completions',{
   method:'POST',signal:controller.signal,headers:{Authorization:'Bearer '+token,'Content-Type':'application/json'},
   body:JSON.stringify({model:MODEL,messages:[{role:'user',content:prompt}],
    temperature:0,max_tokens:850,stream:false})
  });
  if(!response.ok)throw Error('Inference HTTP '+response.status+' (no retry)');
  const body=await response.json(),raw=body?.choices?.[0]?.message?.content;
  if(typeof raw!=='string'||raw.length>16000)throw Error('Malformed response');
  let parsed=null,parseError=null;
  try{
   if(!raw.trim().startsWith('{'))throw Error('Exact JSON object required');
   parsed=JSON.parse(raw.trim());
  }catch(e){parseError=String(e.message).slice(0,120);}
  return {parsed,parseError,raw,usage:body?.usage||null};
 }finally{clearTimeout(timer);}
}
async function main(){
 const args=process.argv.slice(2);
 if(args.length!==1||!['--preflight','--infer-once'].includes(args[0]))throw Error('Choose --preflight or --infer-once');
 const cases=await loadCases();
 if(args[0]==='--preflight'){
  console.log(JSON.stringify({phase:'source-preflight',sourceSha:SOURCE_SHA,modelCalls:0,
   cases:cases.map(x=>({id:x.case.id,file:x.case.file,
    sha256:x.evidence.fileSha256,reportedLiteralPresent:x.evidence.reportedLiteralPresentInRecord,
    fieldCount:Object.keys(x.evidence.fields).length}))},null,2));
  return;
 }
 if(process.env.HF_INFER_APPROVED!==APPROVAL||
    process.env.HF_MODEL!==MODEL||
    process.env.TRIGGLE_SOURCE_SHA!==SOURCE_SHA||
    process.env.GITHUB_RUN_ATTEMPT!=='1'||process.env.GITHUB_EVENT_NAME!=='push')
   throw Error('One-run authorization or source pin failed');
 const price=await liveRates();
 const estimate=cases.reduce((sum,x)=>sum+Math.max(15000,x.prompt.length)*price.input/1e6+850*price.output/1e6,0);
 if(estimate>0.02)throw Error('Estimated cost exceeds $0.02 cap. No calls.');
 const {accessToken}=await acquireAccessToken();
 const report={experiment:'EVOLVE_HF_TWO_CASE_EVIDENCE_20261123',model:MODEL,sourceSha:SOURCE_SHA,
  pricePerMillion:price,estimatedTotalUSD:estimate,costGuardIsEstimateNotHardBillCap:true,
  callsAttempted:0,retries:0,productionWrites:0,deployments:0,modelChangesApplied:0,
  status:'unreviewed-model-proposals',cases:[]};
 let networkFailure=false;
 try{
  for(const x of cases){
   const item={findingId:x.case.id,file:x.case.file,fileSha256:x.evidence.fileSha256,
    sourceLiteralPresent:x.evidence.reportedLiteralPresentInRecord,status:'not-run'};
   report.cases.push(item);
   try{
    report.callsAttempted++;
    const result=await oneCall(x.prompt,accessToken);
    item.status='inference-returned';
    item.usage=result.usage;
    item.rawResponse=result.raw;
    item.parsedProposal=result.parsed;
    item.parseError=result.parseError;
    item.checks=result.parseError?{accepted:false,failures:['invalid-json']}:
       validateProposal(result.parsed,x.case,x.evidence);
   }catch(err){
    item.status='failed-no-retry';
    item.error=String(err.message).slice(0,180);
    networkFailure=true;
    break;
   }
  }
 }finally{
  report.usageTotals=report.cases.reduce((a,c)=>({
   promptTokens:a.promptTokens+(Number(c.usage?.prompt_tokens)||0),
   completionTokens:a.completionTokens+(Number(c.usage?.completion_tokens)||0),
   billedUSD:a.billedUSD+(Number(c.usage?.cost)||0)
  }),{promptTokens:0,completionTokens:0,billedUSD:0});
  await writeFile(OUTPUT,JSON.stringify(report,null,2));
  console.log(JSON.stringify({attempted:report.callsAttempted,
   acceptedByDeterministicEvidenceChecks:report.cases.filter(c=>c.checks?.accepted).length,
   rejected:report.cases.filter(c=>c.checks&&!c.checks.accepted).map(c=>({id:c.findingId,reasons:c.checks.failures})),
   usage:report.usageTotals,productionWrites:0,deployments:0},null,2));
 }
 if(networkFailure)process.exitCode=1;
}
if(process.argv[1]&&fileURLToPath(import.meta.url)===resolve(process.argv[1]))
 main().catch(e=>{console.error('Evidence benchmark blocked:',String(e.message).slice(0,220));process.exitCode=1;});
