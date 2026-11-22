#!/usr/bin/env node
// EVOLVE shadow laboratory — no production writes, no automatic model calls.
import assert from 'node:assert/strict';
import { readFile, writeFile } from 'node:fs/promises';

const pi = 22 / 7;
const near = (a,b,t=1e-8) => typeof a === 'number' && Number.isFinite(a) && Math.abs(a-b) <= t;
const valid = (...xs) => xs.every(x => typeof x === 'number' && Number.isFinite(x) && x > 0);
const cases = [
  {id:'c10-7-ex7-1-q1', prompt:'Cylinder: radius:height = 5:7, curved area = 5500 cm2. Find dimensions. Use pi=22/7.', fields:['radius_cm','height_cm'],
   check:v => valid(v.radius_cm,v.height_cm) && near(v.radius_cm/v.height_cm,5/7) && near(2*pi*v.radius_cm*v.height_cm,5500)},
  {id:'c10-7-ex7-1-q2', prompt:'Cylinder: total surface area 1848 cm2; curved area is 5/6 of total. Find radius and height using pi=22/7.', fields:['radius_cm','height_cm'],
   check:v => valid(v.radius_cm,v.height_cm) && near(2*pi*v.radius_cm*(v.radius_cm+v.height_cm),1848) && near(v.height_cm/(v.radius_cm+v.height_cm),5/6)},
  {id:'c10-7-ex7-1-q3', prompt:'Hollow cylindrical log: outer radius 16 cm, radial wall thickness 4 cm, length 13 cm. Find total exposed area including both annular ends. Use pi=22/7.', fields:['total_area_cm2'],
   check:v => near(v.total_area_cm2,2*pi*(16+12)*13+2*pi*(16**2-12**2))},
  {id:'c10-7-ex7-1-q4', prompt:'Right triangle PQR: Q=90 degrees, QR=16 cm, PR=20 cm. Compare curved cone areas rotating about QR and PQ. Give CSA_QR / CSA_PQ and axis giving larger area.', fields:['ratio_qr_to_pq','larger_axis'],
   check:v => near(v.ratio_qr_to_pq,Math.sqrt(20**2-16**2)/16) && v.larger_axis === 'PQ'},
  {id:'c10-7-ex7-1-q5', prompt:'Conical tent slant height 19 m. Four people require 22 m2 of floor area each. Find vertical height to two decimals, pi=22/7.', fields:['height_m'],
   check:v => near(v.height_m,Math.sqrt(19**2-(4*22)/pi),0.006)}
];
const control = [
 {radius_cm:25,height_cm:35},
 {radius_cm:7,height_cm:35},
 {total_area_cm2:2992},
 {ratio_qr_to_pq:0.75,larger_axis:'PQ'},
 {height_m:18.25}
];
const mutants = [
 {radius_cm:35,height_cm:25},
 {radius_cm:7,height_cm:30},
 {total_area_cm2:2880},
 {ratio_qr_to_pq:4/3,larger_axis:'QR'},
 {height_m:17.25}
];
function fixture(values,model) {
 return {model,origin:'hand-authored-offline-fixture-not-ai',answers:cases.map((c,i)=>({id:c.id,result:values[i]}))};
}
function score(candidate) {
 if (!candidate || typeof candidate.model !== 'string' || !Array.isArray(candidate.answers)) throw new Error('Invalid candidate schema');
 const answers = new Map();
 for (const row of candidate.answers) {
  if (!row || typeof row.id !== 'string' || answers.has(row.id) || !cases.some(c=>c.id===row.id)) throw new Error('Unknown or duplicated candidate ID');
  answers.set(row.id,row.result);
 }
 const results = cases.map(c=>{
  const result=answers.get(c.id);
  const fieldCheck=result && typeof result==='object' && c.fields.every(f=>Object.hasOwn(result,f));
  const passed=!!(fieldCheck && c.check(result));
  return {id:c.id,passed,reason:passed?null:!result?'missing answer':!fieldCheck?'missing fields':'numerical oracle failed'};
 });
 return {model:candidate.model,origin:candidate.origin||'unspecified',total:5,passed:results.filter(x=>x.passed).length,results,
  reasoningReviewed:false,tamilTeachingReviewed:false,releaseApproved:false,
  note:'Numerical oracle only. No student-facing changes, no deployment and no textbook/teaching approval.'};
}
async function main() {
 const args=process.argv.slice(2);
 if (args.includes('--self-test')) {
  assert.equal(cases.length,5);
  assert.equal(new Set(cases.map(c=>c.id)).size,5);
  assert.equal(score(fixture(control,'control')).passed,5);
  assert.equal(score(fixture(mutants,'mutant')).passed,0);
  assert.equal(score({model:'missing',answers:[]}).passed,0);
  assert.throws(()=>score({model:'duplicate',answers:[{id:cases[0].id,result:control[0]},{id:cases[0].id,result:control[0]}]}));
  assert.equal(score(fixture(control.map((v,i)=>i===0?{...v,radius_cm:Infinity}:v),'nonfinite')).passed,4);
  console.log('PASS EVOLVE: 7 offline assertions; 5/5 correct controls; 5/5 errors detected; 0 model calls.');
  return;
 }
 if (args.includes('--demo')) {
  console.log(JSON.stringify({control:score(fixture(control,'offline-control')),mutant:score(fixture(mutants,'offline-mutant'))},null,2));
  return;
 }
 if (args.includes('--score')) {
  const file=args[args.indexOf('--score')+1];
  if (!file) throw new Error('Use --score path/to/candidate.json');
  const candidate=JSON.parse(await readFile(file,'utf8'));
  const report=score(candidate);
  console.log(JSON.stringify(report,null,2));
  if (report.passed!==5) process.exitCode=1;
  return;
 }
 if (args.includes('--hf-once')) {
  const token=process.env.HF_TOKEN, model=process.env.HF_MODEL;
  const outIndex=args.indexOf('--out'), out=outIndex<0?null:args[outIndex+1];
  if (!args.includes('--allow-billing') || !token || !model || !out) throw new Error('Stopped before any network call. Required: HF_TOKEN, HF_MODEL, --hf-once --allow-billing --out <local.json>. Check billing first.');
  const schema=cases.map(c=>({id:c.id,fields:c.fields}));
  const prompt='Solve all five mathematics problems independently, using pi=22/7. Output ONLY valid JSON with one top-level key answers; each answer needs id, result, explanation and verification. The result keys must be precisely those listed in fields. Larger axis must be QR or PQ. Do not claim textbook or Tamil review. Schema: '+JSON.stringify(schema)+' Problems: '+JSON.stringify(cases.map(c=>({id:c.id,task:c.prompt})));
  const controller=new AbortController();
  const timer=setTimeout(()=>controller.abort(),90000);
  try {
   const response=await fetch('https://router.huggingface.co/v1/chat/completions',{
    method:'POST',signal:controller.signal,headers:{Authorization:'Bearer '+token,'Content-Type':'application/json'},
    body:JSON.stringify({model,messages:[{role:'user',content:prompt}],temperature:0.1,max_tokens:2500,stream:false})
   });
   if (!response.ok) throw new Error('Hugging Face HTTP '+response.status+' (check availability and billing)');
   const payload=await response.json();
   let content=payload?.choices?.[0]?.message?.content;
   if (typeof content!=='string') throw new Error('Model returned no text');
   content=content.trim();
   const fence=String.fromCharCode(96).repeat(3);
   if (content.startsWith(fence)) {
    const lines=content.split('\n'); lines.shift();
    if (lines.length && lines[lines.length-1].trim()===fence) lines.pop();
    content=lines.join('\n').trim();
   }
   const parsed=JSON.parse(content);
   const candidate={model,origin:'huggingface-inference-provider',answers:parsed.answers};
   const report=score(candidate);
   await writeFile(out,JSON.stringify(candidate,null,2)+'\n','utf8');
   console.log(JSON.stringify({report,tokenUsage:payload.usage||null},null,2));
  } finally {clearTimeout(timer);}
  return;
 }
 console.log('Usage: node experiments/evolve/evolve.mjs --self-test | --demo | --score candidate.json | --hf-once --allow-billing --out file.json');
}
main().catch(err=>{console.error('EVOLVE: '+err.message);process.exitCode=2;});
