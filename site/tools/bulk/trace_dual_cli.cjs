#!/usr/bin/env node
'use strict';
// Terminal-only pilot. Do NOT bundle into GitHub Pages or schedule paid mode.
const fs=require('node:fs');
const path=require('node:path');
const {runDualReview}=require('./trace_dual_ai.cjs');
const {atomicJson,ROOT}=require('../curriculum_bulk.cjs');
const DEMO=Object.freeze({
 id:'g10-ch2-gp-sum',sourceRef:'SYNTHETIC_DEMO_NOT_A_TEXTBOOK_SOURCE',
 sourceVerified:true,difficulty:'difficult',
 problem:'Synthetic exercise: add 1 + 2 + 4 + 8.',
 solution:'S = 1 + 2 + 4 + 8 = 15.'
});
function parse(args){
 const opts={};
 for(let i=0;i<args.length;i++){
  const arg=args[i];
  if(['--demo','--live','--authorize-spend'].includes(arg)){opts[arg]=true;continue;}
  if(['--input','--state-dir','--report'].includes(arg)&&args[i+1]){opts[arg]=args[++i];continue;}
  throw Error('INVALID_ARGUMENT');
 }
 if(opts['--live']&&opts['--demo'])throw Error('DEMO_CANNOT_SPEND');
 if(opts['--live']&&(!opts['--input']||!opts['--state-dir']||!opts['--authorize-spend']))throw Error('LIVE_REQUIRES_INPUT_PERSISTENT_STATE_AND_APPROVAL');
 if(!opts['--live']&&!opts['--demo']&&!opts['--input'])throw Error('PROVIDE_DEMO_OR_INPUT');
 return opts;
}
async function main(args){
 const o=parse(args);
 let input=DEMO;
 if(o['--input']){
  const file=path.resolve(o['--input']),size=fs.statSync(file).size;
  if(size>7500)throw Error('INPUT_TOO_LARGE');
  input=JSON.parse(fs.readFileSync(file,'utf8'));
 }
 const result=await runDualReview(input,{
  live:!!o['--live'],authorizeSpend:!!o['--authorize-spend'],
  stateDir:o['--state-dir']?path.resolve(o['--state-dir']):undefined
 });
 if(o['--report']){
  const report=path.resolve(o['--report']),publicDir=path.resolve(ROOT,'site');
  if(report===publicDir||report.startsWith(publicDir+path.sep))throw Error('PUBLIC_REPORT_FORBIDDEN');
  atomicJson(report,result);
 }
 // Keep model response content out of CI logs, and never include credentials.
 console.log(JSON.stringify({
  status:result.status,releaseApproved:false,
  providers:result.entries.map(e=>({provider:e.provider,ok:e.ok,verdict:e.candidate?.verdict||null,error:e.error||null})),
  budgetReservationUsd:result.accounting?.reservedCostUsd||0,
  note:'AI output is a review candidate, never release authority'
 },null,2));
 if(result.status==='INCOMPLETE_REVIEW')process.exitCode=2;
}
module.exports={parse,DEMO};
if(require.main===module)main(process.argv.slice(2)).catch(error=>{
 const allowed=['INVALID_ARGUMENT','DEMO_CANNOT_SPEND','LIVE_REQUIRES_INPUT_PERSISTENT_STATE_AND_APPROVAL',
 'PROVIDE_DEMO_OR_INPUT','INPUT_TOO_LARGE','PUBLIC_REPORT_FORBIDDEN','EXPLICIT_SPEND_APPROVAL_REQUIRED',
 'PERSISTENT_ACCOUNTING_REQUIRED','SOURCE_NOT_VERIFIED','INVALID_REVIEW_RECORD',
 'INVALID_REVIEW_ID','MISSING_SOURCE_EVIDENCE','INVALID_DIFFICULTY','INVALID_PROBLEM','INVALID_SOLUTION',
 'REVIEW_INPUT_TOO_LARGE'];
 const msg=String(error?.message||'');
 console.error(allowed.includes(msg)?msg:'REVIEW_FAILED_NO_DETAILS');
 process.exitCode=1;
});
