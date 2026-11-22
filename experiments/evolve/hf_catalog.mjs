#!/usr/bin/env node
// EVOLVE public catalog inspection only; no auth, inference, or application writes.
const url='https://router.huggingface.co/v1/models';
const names=/qwen|phi|deepseek|gemma|llama|mistral/i;
const cost=x => x!=null && x!=='' && Number.isFinite(Number(x)) && Number(x)>=0 ? Number(x) : null;
export function catalogCandidates(body){
 if(!body||!Array.isArray(body.data)) throw new Error('Catalog data[] missing');
 const c=[];
 for(const m of body.data){
  if(!m || typeof m.id!=='string' || !names.test(m.id))continue;
  for(const p of Array.isArray(m.providers)?m.providers:[]){
   if(!p || p.status!=='live'||!p.provider)continue;
   const a=cost(p.pricing?.input),b=cost(p.pricing?.output);
   c.push({model:m.id,provider:p.provider,inputUSDPer1M:a,outputUSDPer1M:b,
    exampleCostUSD:a===null||b===null?null:+(a*2000/1e6+b*1000/1e6).toFixed(8),
    freeFlag:p.is_free===true});
  }
 }
 c.sort((a,b)=>(a.exampleCostUSD??Infinity)-(b.exampleCostUSD??Infinity)||a.model.localeCompare(b.model));
 return {source:url,observedAtUTC:new Date().toISOString(),exampleTokens:{input:2000,output:1000},
  optionCount:c.length,candidates:c.slice(0,20),billedInferenceCalls:0,
  note:'Public metadata only; no token, inference, GitHub permission or release. Unknown prices never mean free.'};
}
async function main(){
 const a=new AbortController(),t=setTimeout(()=>a.abort(),20000);
 try{
  const r=await fetch(url,{signal:a.signal,headers:{Accept:'application/json'}});
  if(!r.ok)throw Error('HTTP '+r.status);
  console.log(JSON.stringify(catalogCandidates(await r.json()),null,2));
 }finally{clearTimeout(t);}
}
if(process.argv[1]&&import.meta.url.endsWith(process.argv[1].split('/').pop()))
 main().catch(e=>{console.error('Catalog error: '+e.message);process.exitCode=1;});
