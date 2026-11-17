'use strict';
// Reproducible synthetic fixture run: exercises the *integration* and exact
// series mathematics, not textbook transcriptions or real AI model responses.
const fs=require('node:fs'),path=require('node:path'),os=require('node:os');
const {runDualReview}=require('./trace_dual_ai.cjs');
const {exactGeometric}=require('./trace_dual_math.cjs');

const cases=[
  {name:'Doubling four terms',a:1,r:2,n:4,claimed:'15'},
  {name:'Tripling four terms',a:1,r:3,n:4,claimed:'40'},
  {name:'Five doubled terms',a:2,r:2,n:5,claimed:'62'},
  {name:'Negative-ratio alternation',a:3,r:-2,n:4,claimed:'-15'},
  {name:'Ratio one special case',a:5,r:1,n:4,claimed:'20'},
  {name:'Ratio zero special case',a:7,r:0,n:5,claimed:'7'},
  {name:'Negative initial term',a:-2,r:3,n:4,claimed:'-80'},
  {name:'Odd negative-one ratio',a:1,r:-1,n:9,claimed:'1'},
  {name:'One-term boundary',a:4,r:2,n:1,claimed:'4'},
  {name:'Five alternating terms',a:2,r:-3,n:5,claimed:'122'},
  {name:'Intentional off-by-one error',a:1,r:2,n:4,claimed:'16'},
  {name:'Intentional missing-one error',a:1,r:3,n:4,claimed:'39'}
];
function record(sample,index){
  const {a,r,n,claimed,name}=sample;
  return {id:'g10-ch2-gp-pilot-'+String(index+1).padStart(2,'0'),
    sourceRef:'SYNTHETIC_NOT_A_TEXTBOOK_SOURCE',
    sourceVerified:true,difficulty:'difficult',
    problem:'Synthetic challenge: sum '+n+' terms of a geometric series with first term '+a+' and ratio '+r+'.',
    solution:'Proposed total: '+claimed+'.',
    mathSpec:{kind:'geometric-series',a,r,n,claimedSum:claimed}
  };
}
async function run(){
  const dir=fs.mkdtempSync(path.join(os.tmpdir(),'trace-dual-rehearsal-'));
  const started=Date.now();const rows=[];
  try{
    for(let i=0;i<cases.length;i++){
      const item=record(cases[i],i),exact=exactGeometric(item.mathSpec);
      const result=await runDualReview(item,{stateDir:dir});
      const expected=exact.status==='EXACT_MATCH'?'SYNTHETIC_REVIEW_ONLY':'LOCAL_MATH_REJECTED';
      if(result.status!==expected)throw Error('PILOT_GATE_MISMATCH');
      if(result.releaseApproved!==false)throw Error('PILOT_RELEASE_NOT_BLOCKED');
      if(exact.status==='EXACT_MATCH'&&result.entries.length!==2)throw Error('MISSING_MOCK_PROVIDERS');
      if(exact.status==='EXACT_MISMATCH'&&result.entries.length!==0)throw Error('MISTAKEN_PAID_REVIEW');
      rows.push({id:item.id,scenario:cases[i].name,correctTotal:exact.expectedSum,
        proposedTotal:exact.claimedSum,exactMath:exact.status,
        modelReview:'SYNTHETIC_ONLY',providersMocked:result.entries.length,
        decision:result.status,releaseApproved:false});
    }
    const summary={schemaVersion:1,kind:'OFFLINE_SYNTHETIC_DUAL_AI_REHEARSAL',
      sourceFidelity:'NOT_CHECKED_SYNTHETIC_NO_TEXTBOOK_PAGES',
      modelResponses:'MOCKED_NOT_GENUINE_OPENAI_OR_GEMINI',
      total:rows.length,exactMatched:rows.filter(r=>r.exactMath==='EXACT_MATCH').length,
      locallyRejected:rows.filter(r=>r.exactMath==='EXACT_MISMATCH').length,
      providerMockCalls:rows.reduce((n,r)=>n+r.providersMocked,0),
      actualProviderCalls:0,externalApiCostUsd:0,releaseApproved:false,
      elapsedMs:Date.now()-started,rows};
    if(summary.exactMatched!==10||summary.locallyRejected!==2||summary.providerMockCalls!==20)
      throw Error('PILOT_EXPECTATIONS_CHANGED');
    return summary;
  }finally{fs.rmSync(dir,{recursive:true,force:true});}
}
async function main(args){
  if(args.length>2||args.length===1||args.length===2&&args[0]!=='--output')
    throw Error('INVALID_ARGUMENT');
  const result=await run();
  if(args.length){
    const dest=path.resolve(args[1]),repoRoot=path.resolve(__dirname,'../../..'),publicDir=path.join(repoRoot,'site');
    if(dest===publicDir||dest.startsWith(publicDir+path.sep))throw Error('PUBLIC_REPORT_FORBIDDEN');
    fs.mkdirSync(path.dirname(dest),{recursive:true,mode:0o700});
    fs.writeFileSync(dest,JSON.stringify(result,null,2)+'\n',{mode:0o600});
  }
  // Safe summary; never print real provider outputs or credentials.
  console.log(JSON.stringify({kind:result.kind,total:result.total,exactMatched:result.exactMatched,
    locallyRejected:result.locallyRejected,providerMockCalls:result.providerMockCalls,
    actualProviderCalls:0,externalApiCostUsd:0,releaseApproved:false},null,2));
}
module.exports={cases,record,run};
if(require.main===module)main(process.argv.slice(2)).catch(error=>{
  console.error(['INVALID_ARGUMENT','PUBLIC_REPORT_FORBIDDEN'].includes(error?.message)?error.message:'PILOT_FAILED');
  process.exitCode=1;
});
