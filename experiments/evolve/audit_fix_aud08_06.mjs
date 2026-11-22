#!/usr/bin/env node
// NEON AUD08-06 => controlled Hugging Face proposal only. Never deploys.
import assert from 'node:assert/strict';
import {readFile,writeFile} from 'node:fs/promises';
import {resolve} from 'node:path';
const file='site/data/textbook-exercises/g10-ch8-ex8-1-q5-q10-en.js';
const a='"id": "c10-8-ex8-1-q5"',b='"id": "c10-8-ex8-1-q6"',c='"id": "c10-8-ex8-1-q7"';
const oldCurrency='\\\\text{Rs.}',newCurrency='\\\\text{₹}';
const oldExplanation='Use population variance = mean square minus square of the mean.';
const fixture={findingId:'AUD08-06',currencyLatex:newCurrency,explanation:'A 12-hour clock has values 1 through 12, repeated twice in a day. Repeating the observations does not change their variance; calculate it as the mean square minus the square of the mean.'};
export function patchSource(source,proposal){
 if(!proposal||proposal.findingId!=='AUD08-06'||proposal.currencyLatex!==newCurrency)throw Error('Reject: proposal outside audit allowlist');
 const value=proposal.explanation;
 if(typeof value!=='string'||value.length<95||value.length>350||!value.includes('12')||!/\btwice\b/i.test(value)||!/\bvariance\b/i.test(value)||/[\r\n<>;$]/.test(value))throw Error('Reject: explanation constraints');
 const x=source.indexOf(a),y=source.indexOf(b),z=source.indexOf(c);
 if(x<0||y<=x||z<=y)throw Error('Reject: current file no longer matches audited question IDs');
 const q5=source.slice(x,y),q6=source.slice(y,z);
 const n=q5.split(oldCurrency).length-1;
 if(n!==6||q6.split(oldExplanation).length!==2)throw Error('Reject: current source unexpected, no patch');
 const result=source.slice(0,x)+q5.split(oldCurrency).join(newCurrency)+q6.replace(oldExplanation,value)+source.slice(z);
 return {result,meta:{findingId:'AUD08-06',file,currencyTokens:n,explanationChanged:true,productionWrites:0,deployments:0}};
}
function snippets(source){
 const x=source.indexOf(a),y=source.indexOf(b),z=source.indexOf(c);
 if(x<0||y<=x||z<=y)throw Error('Question locations invalid');
 return [source.slice(x,y),source.slice(y,z)];
}
async function infer(source){
 if(process.env.HF_INFER_APPROVED!=='yes'||!process.env.HF_TOKEN||!process.env.HF_MODEL)throw Error('No approved inference credentials/consent');
 const parts=snippets(source);
 const prompt='Repair only Neon audit AUD08-06. Return JSON only with keys findingId, currencyLatex, explanation. findingId must be AUD08-06. currencyLatex must be LaTeX text currency using the rupee sign, not Rs. Explanation replaces the clock variance step: it must explain the values 1 to 12 repeat twice and that repetition does not change variance. Do not alter any mathematical answers, questions, sources or Tamil. Q5 source: '+parts[0]+' Q6 source: '+parts[1];
 const controller=new AbortController();const timeout=setTimeout(()=>controller.abort(),60000);
 try{
  const res=await fetch('https://router.huggingface.co/v1/chat/completions',{method:'POST',signal:controller.signal,headers:{Authorization:'Bearer '+process.env.HF_TOKEN,'Content-Type':'application/json'},body:JSON.stringify({model:process.env.HF_MODEL,messages:[{role:'user',content:prompt}],temperature:0,max_tokens:650,stream:false})});
  if(!res.ok)throw Error('HF HTTP '+res.status);
  const body=await res.json();
  const txt=body?.choices?.[0]?.message?.content;
  if(typeof txt!=='string')throw Error('HF returned no text');
  const json=txt.trim();if(!json.startsWith('{'))throw Error('HF non-JSON response rejected');
  return {proposal:JSON.parse(json),usage:body.usage||null};
 }finally{clearTimeout(timeout);}
}
async function main(){
 const source=await readFile(file,'utf8'),args=process.argv.slice(2);
 if(args.includes('--self-test')){
  const r=patchSource(source,fixture);
  assert.equal(r.meta.currencyTokens,6);
  assert.equal(r.result.includes(oldExplanation),false);
  assert.equal(r.result.slice(0,source.indexOf(a)),source.slice(0,source.indexOf(a)));
  assert.equal(r.result.slice(r.result.indexOf(c)),source.slice(source.indexOf(c)));
  assert.throws(()=>patchSource(source,{...fixture,findingId:'AUD14-02'}));
  assert.throws(()=>patchSource(source,{...fixture,currencyLatex:'write-anything'}));
  const numbers=Array.from({length:12},(_,i)=>i+1).flatMap(v=>[v,v]);
  const mean=numbers.reduce((sum,v)=>sum+v,0)/24;
  const variance=numbers.reduce((sum,v)=>sum+(v-mean)**2,0)/24;
  assert.equal(24*mean,156);assert.ok(Math.abs(variance-143/12)<1e-10);
  console.log('PASS: 8 assertions; 6 safely targeted currency tokens, 1 explanation; zero HF calls');
  return;
 }
 let proposal=fixture,usage=null,mode='offline-handwritten-fixture',model=null;
 if(args.includes('--infer-once')){
  ({proposal,usage}=await infer(source));mode='huggingface-candidate';model=process.env.HF_MODEL;
 }else if(!args.includes('--dry-run'))throw Error('Choose --self-test, --dry-run or --infer-once');
 const result=patchSource(source,proposal),dest=process.env.RUNNER_TEMP||'/tmp';
 await writeFile(resolve(dest,'evolve-aud08-06-proposed.js'),result.result);
 await writeFile(resolve(dest,'evolve-aud08-06-evidence.json'),JSON.stringify({...result.meta,mode,model,usage,proposal,independentReview:false,ciApproved:false,merged:false,liveVerified:false},null,2));
 console.log('EVOLVE proposal prepared:',mode,'currency tokens',result.meta.currencyTokens,'deployment 0');
}
main().catch(e=>{console.error(e.message);process.exitCode=1;});
