#!/usr/bin/env node
// TRIGGLE EVOLVE: public-only, no authentication or inference; catalog coverage study.
import {writeFile} from 'node:fs/promises';
import {join} from 'node:path';
const dateCutoff='2026-11-22T23:59:59Z';
const routes=[
 ['code','text-generation',250],
 ['vision','image-text-to-text',250],
 ['translation','translation',250],
 ['ocr','image-to-text',250],
 ['speech','text-to-speech',250],
 ['embeddings','sentence-similarity',250],
 ['asr','automatic-speech-recognition',250]
];
const named=[
 'Qwen/Qwen3-Coder-30B-A3B-Instruct',
 'Qwen/Qwen3-Coder-480B-A35B-Instruct',
 'Qwen/Qwen3-32B',
 'Qwen/Qwen3-VL-8B-Instruct',
 'deepseek-ai/DeepSeek-R1',
 'deepseek-ai/DeepSeek-V3.2',
 'openai/gpt-oss-20b',
 'google/gemma-3-27b-it',
 'ai4bharat/indictrans2-en-indic-dist-200M',
 'ai4bharat/indictrans2-en-indic-1B',
 'ai4bharat/indictrans2-indic-en-dist-200M',
 'PaddlePaddle/PaddleOCR-VL-1.6',
 'PaddlePaddle/PaddleOCR-VL',
 'hexgrad/Kokoro-82M',
 'BAAI/bge-m3',
 'Qwen/Qwen3-Embedding-0.6B',
 'nvidia/parakeet-unified-en-0.6b'
];
const opts={signal:undefined,headers:{Accept:'application/json','User-Agent':'Triggle-Evolve-ReadOnly-Discovery/1.0'}};
async function get(url){
 const controller=new AbortController(),tm=setTimeout(()=>controller.abort(),15000);
 try{
  const res=await fetch(url,{...opts,signal:controller.signal});
  if(!res.ok)throw Error('HTTP '+res.status+' '+url);
  return await res.json();
 }finally{clearTimeout(tm);}
}
const usableLicense=m=>{
 const x=(m.cardData&&m.cardData.license)||'unknown';
 return typeof x==='string'?x:JSON.stringify(x);
};
const compact=m=>({id:m.id,downloads:m.downloads||0,likes:m.likes||0,
 pipeline:m.pipeline_tag||null,license:usableLicense(m),gated:m.gated||false,
 createdAt:m.createdAt||null,lastModified:m.lastModified||null});
function oldEnough(m){
 const date=m.createdAt;
 return !date || date<=dateCutoff;
}
function price(v){return v==null||v===''||!Number.isFinite(Number(v))?null:Number(v)}
const interesting=/qwen|deepseek|phi|gpt-oss|gemma|glm|mistral|coder|nemotron|kokoro|indictrans|ocr|paddle|whisper|parakeet|bge|embedding|e5|nllb/i;
const body={scannedAtUTC:new Date().toISOString(),observedScope:'All chat-compatible hosted providers, plus sampled high-download Hub models across seven task categories and targeted official model cards',paidCalls:0,exhaustiveWholeHub:false,router:{},hub:{},verifiedNamed:[],errors:[],advice:[
 'Model card existence is not proof of hosted Inference Provider availability',
 'Model licenses and gating may prevent commercial use or automated downloads',
 'No inference or evaluation scores were measured by this scan',
 'Use only sandbox proposals: no direct edits to site/main and no access to student data'
]};
try{
 const router=await get('https://router.huggingface.co/v1/models');
 const all=Array.isArray(router.data)?router.data:[];
 const providerOptions=[];
 for(const m of all){
  for(const p of m.providers||[]){
   if(p.status!=='live')continue;
   providerOptions.push({model:m.id,provider:p.provider,inputUSDper1M:price(p.pricing?.input),outputUSDper1M:price(p.pricing?.output),
    exampleUSD:p.pricing&&price(p.pricing.input)!=null&&price(p.pricing.output)!=null?
      Number((price(p.pricing.input)*3000/1e6+price(p.pricing.output)*1500/1e6).toFixed(6)):null,
    context:p.context_length||null,structured:p.supports_structured_output??null,
    tools:p.supports_tools??null});
  }
 }
 body.router={listedModels:all.length,liveProviderOptions:providerOptions.length,
  uniqueLiveModels:new Set(providerOptions.map(p=>p.model)).size,
  affordableSorted:providerOptions.filter(p=>interesting.test(p.model)).sort((a,b)=>(a.exampleUSD??1e6)-(b.exampleUSD??1e6)).slice(0,60),
  candidates:providerOptions.filter(p=>interesting.test(p.model))};
}catch(e){body.errors.push('router: '+e.message)}
for(const [label,task,limit] of routes){
 try{
  const url='https://huggingface.co/api/models?pipeline_tag='+encodeURIComponent(task)+'&sort=downloads&direction=-1&limit='+limit+'&full=true';
  const models=await get(url);
  if(!Array.isArray(models))throw Error('non-array response');
  body.hub[label]={task,returned:models.length,createdByCutoff:models.filter(oldEnough).length,
   shortlist:models.filter(m=>oldEnough(m)&&(m.downloads||0)>1000).slice(0,25).map(compact)};
 }catch(e){body.errors.push(label+': '+e.message)}
}
for(const id of named){
 try{
  const m=await get('https://huggingface.co/api/models/'+id+'?blobs=false&cardData=true');
  if(oldEnough(m))body.verifiedNamed.push(compact(m));
  else body.errors.push('future-dated excluded: '+id);
 }catch(e){body.errors.push('model '+id+': '+e.message)}
}
const tmp=process.env.RUNNER_TEMP||'/tmp';
await writeFile(join(tmp,'evolve-model-landscape.json'),JSON.stringify(body,null,2));
const fmt=x=>x===null?'?':'$'+x;
console.log('EVOLVE MODEL LANDSCAPE | PUBLIC DISCOVERY ONLY | PAID CALLS 0');
console.log('ROUTER: listed models '+(body.router.listedModels||0)+', unique live '+(body.router.uniqueLiveModels||0)+', provider options '+(body.router.liveProviderOptions||0));
for(const [name,obj] of Object.entries(body.hub))console.log('HUB TASK: '+name+' '+obj.returned+' sampled, '+obj.createdByCutoff+' age-eligible');
console.log('TARGETED MODEL CARDS VERIFIED: '+body.verifiedNamed.length);
for(const m of body.verifiedNamed)console.log('MODEL CARD '+m.id+' | '+m.pipeline+' | license '+m.license+' | gated '+m.gated+' | downloads '+m.downloads);
const byName=new Map();
for(const p of body.router.candidates||[]){
 const k=p.model;
 if(!byName.has(k)||((p.exampleUSD??1e6)<(byName.get(k).exampleUSD??1e6)))byName.set(k,p);
}
console.log('HOSTED LOWEST-PRICE REPRESENTATIVE BY MODEL');
for(const x of [...byName.values()].sort((a,b)=>(a.exampleUSD??1e6)-(b.exampleUSD??1e6)).slice(0,45))
 console.log('HOSTED '+x.model+' | '+x.provider+' | example '+fmt(x.exampleUSD)+' | input '+fmt(x.inputUSDper1M)+' | output '+fmt(x.outputUSDper1M));
for(const err of body.errors)console.log('DISCOVERY LIMIT: '+err);
