'use strict';
// Offline screening only; not a grammar model or a proof of mathematical correctness.
const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto'),assert=require('node:assert/strict');
const root=path.resolve(__dirname,'../../..'),spec=require('./benchmark.json');
const out=process.argv[2]?path.resolve(process.argv[2]):path.join(root,'build/tamil-validation-pilot');
const norm=s=>String(s).normalize('NFC').replace(/\s+/gu,' ').trim();
const body=s=>norm(s).replace(/^\d+\.\s*/u,'');
const numberSignature=s=>body(s).match(/\d+(?:[.,]\d+)?/gu)||[];
const same=(a,b)=>JSON.stringify(a)===JSON.stringify(b);
const terms={
 radius:/ஆரம்|ஆரம|ஆரங்|ஆரத்த/gu,diameter:/விட்ட/gu,slantHeight:/சாயுயர/gu,
 height:/(?<!சாய்)உயர/gu,volume:/கன\s*அளவ/gu,curvedArea:/வளை\s*பரப்ப/gu,
 thickness:/தடிம/gu,hollow:/உள்ளீடற்ற/gu,sphere:/கோள/gu,cone:/கூம்ப/gu,
 cylinder:/உருள/gu,frustum:/இடைக்கண்ட/gu
};
const intents={negation:/வேண்டாம்|இணைக்காமல்/gu,increase:/அதிக|உயரும்/gu,
 decrease:/குறைந்த|குறையும்/gu,remaining:/மீதமுள்ள/gu,uniform:/சீரான/gu,
 nonuniform:/சீரற்ற/gu,outflow:/வெளியேற்ற/gu,inflow:/நிரப்பப்படுமானால்/gu,
 unitRate:/ஒரு சதுர மீட்டருக்கு/gu};
const counts=(s,patterns)=>Object.fromEntries(Object.entries(patterns).map(([key,re])=>[key,(norm(s).match(re)||[]).length]));
function screen(reference,candidate){
 const flags=[];
 if(!/[\u0B80-\u0BFF]/u.test(candidate))flags.push('missing_tamil');
 if(!same(numberSignature(reference),numberSignature(candidate)))flags.push('numeric_sequence');
 if(!same(counts(reference,terms),counts(candidate,terms)))flags.push('math_terminology');
 if(!same(counts(reference,intents),counts(candidate,intents)))flags.push('intent_marker');
 return {flags,sourceDrift:norm(reference)!==norm(candidate),requiresReview:flags.length>0};
}
const load=p=>JSON.parse(fs.readFileSync(path.join(root,p),'utf8'));
for(const f of spec.sourceFiles){
 const bytes=fs.readFileSync(path.join(root,f.path));
 const blob=crypto.createHash('sha1').update('blob '+bytes.length+'\0').update(bytes).digest('hex');
 if(f.blobSha)assert.equal(blob,f.blobSha,'Pinned source blob '+f.path);
}
const sources=new Map(spec.sourceFiles.flatMap(f=>load(f.path).items.map(e=>[e.id,e])));
const cases=[];
function add(seed,label,candidate,source){cases.push({id:seed.id+'-'+label,recordId:seed.id,label,isError:!['clean','format'].includes(label),en:source.textbookPrompt.en,ta:candidate,reference:source.textbookPrompt.ta});}
for(const seed of spec.recipes){
 const s=sources.get(seed.id);assert.ok(s);
 const ta=s.textbookPrompt.ta;
 add(seed,'clean',ta,s);
 add(seed,'format',' '+ta.replace(/ /gu,'  ').normalize('NFD')+' ',s);
 for(const [kind,[from,to]] of Object.entries(seed.mutations)){
  assert.equal(ta.split(from).length,2,'Unique source mutation '+seed.id+' '+kind);
  add(seed,kind,ta.replace(from,to),s);
 }
}
assert.equal(cases.length,60);assert.equal(new Set(cases.map(c=>c.id)).size,60);
const results=cases.map(c=>({...c,...screen(c.reference,c.ta)}));
const perCategory=Object.fromEntries(Object.keys(spec.labels).map(label=>{
 const r=results.filter(c=>c.label===label);
 return [label,{cases:r.length,flagged:r.filter(c=>c.requiresReview).length,sourceDrift:r.filter(c=>c.sourceDrift).length}];
}));
const tp=results.filter(c=>c.isError&&c.requiresReview).length,fp=results.filter(c=>!c.isError&&c.requiresReview).length;
const fn=results.filter(c=>c.isError&&!c.requiresReview).length,tn=results.filter(c=>!c.isError&&!c.requiresReview).length;
assert.equal(tp+fp+fn+tn,60);
assert.equal(perCategory.clean.sourceDrift,0);assert.equal(perCategory.format.sourceDrift,0);
assert.equal(perCategory.quantity.flagged,10,'Numeric mutations must be detected');
assert.equal(perCategory.terminology.flagged,10,'Targeted term mutations must be detected');
assert.equal(fp,0,'Clean and formatting controls must not be flagged');
assert.equal(results.filter(c=>c.isError&&c.sourceDrift).length,40,'Strict source question comparison must detect all exact edits');
const report={schemaVersion:1,sourceCommit:spec.sourceCommit,scope:spec.scope,modelInference:"NOT_RUN",teacherReview:"PENDING",cases:60,perCategory,confusion:{tp,fp,fn,tn},precision:tp/(tp+fp),recall:tp/(tp+fn),limitations:["Synthetic development benchmark; not held-out or human-validated.","Source-drift is reported separately, never counted as semantic detection.","Exact question wording is independently checked against existing fidelity manifests; not appropriate for original explanatory prose.","No model inference, formal Tamil editorial approval, formula equivalence or full-curriculum audit performed."]};
fs.mkdirSync(out,{recursive:true});
function write(name,value){fs.writeFileSync(path.join(out,name),JSON.stringify(value,null,2)+'\n');}
const blind=results.map(c=>({caseId:'case-'+crypto.createHash('sha256').update(c.id+'|'+spec.sourceCommit).digest('hex').slice(0,16),en:c.en,ta:c.ta}));
const key=results.map((c,i)=>({caseId:blind[i].caseId,recordId:c.recordId,label:c.label,isError:c.isError,baselineFlags:c.flags,sourceDrift:c.sourceDrift}));
// Deterministic pseudorandom ordering; identifiers reveal neither class nor original record.
blind.sort((a,b)=>a.caseId.localeCompare(b.caseId));key.sort((a,b)=>a.caseId.localeCompare(b.caseId));
write('blind-input.json',blind);write('answer-key.json',key);write('baseline-report.json',report);
console.log(JSON.stringify(report,null,2));console.log('PASS 60-case benchmark contract; model evaluations and full pilot audit remain pending.');
