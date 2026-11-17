#!/usr/bin/env node
'use strict';
// Read-only TRACE Grade 9/10 release-candidate triage. No API calls, no publishing.
// Registration is inferred from scripts actually referenced by site/index.html;
// this is NOT live Pages verification or mathematical certification.
const fs=require('node:fs'),path=require('node:path');
const ROOT=path.resolve(__dirname,'../../..');
const file=p=>path.join(ROOT,p);
const json=p=>JSON.parse(fs.readFileSync(file(p),'utf8'));
const fail=code=>{throw Error(code);};
function assertUnique(rows){
 const ids=new Set();
 for(const row of rows){
   if(!row||typeof row.id!=='string'||ids.has(row.id))fail('DUPLICATE_OR_INVALID_CANDIDATE_ID');
   ids.add(row.id);
 }
 return ids;
}
function scriptsInIndex(root=ROOT){
 const html=fs.readFileSync(path.join(root,'site/index.html'),'utf8');
 const matches=[...html.matchAll(/<script\s+src=["']\.\/([^"'?]+)(?:\?[^"']*)?["']/g)];
 const scriptPaths=matches.map(m=>'site/'+m[1]).filter(p=>p.endsWith('.js'));
 if(!scriptPaths.length)fail('NO_STUDENT_SCRIPTS');
 if(new Set(scriptPaths).size!==scriptPaths.length)fail('DUPLICATE_STUDENT_SCRIPT');
 return scriptPaths;
}
function registeredIds(root=ROOT){
 const owners=new Map();
 for(const p of scriptsInIndex(root)){
   const full=path.join(root,p);
   if(!fs.existsSync(full))fail('MISSING_STUDENT_SCRIPT');
   const src=fs.readFileSync(full,'utf8');
   for(const m of src.matchAll(/["']id["']\s*:\s*["']((?:g9-ch1-ex1\.2|c10-2-ex2-5)-[^"']+)["']/g)){
     const id=m[1];
     if(!owners.has(id))owners.set(id,[]);
     if(!owners.get(id).includes(p))owners.get(id).push(p);
   }
 }
 return owners;
}
function batches(rows,size=10){
 if(!Number.isInteger(size)||size<1||size>20)fail('INVALID_BATCH_SIZE');
 const out=[];
 for(let i=0;i<rows.length;i+=size)out.push({
   batch:i/size+1,reviewRequired:true,releaseApproved:false,
   ids:rows.slice(i,i+size).map(r=>r.id)
 });
 return out;
}
function buildPlan({root=ROOT,batchSize=10}={}){
 // root override supports negative tests; do not infer textbook-wide coverage.
 const read=p=>JSON.parse(fs.readFileSync(path.join(root,p),'utf8'));
 const manifest=read('docs/reference-library/2025-user-textbook-manifest.json');
 const g9=read('docs/curriculum/grade-9/candidates/g9-ch1-ex1-2-english-34.json');
 const g10=read('docs/curriculum/grade-10/trace/g10-ch2-ex2-5-source-audit-20261115.json');
 const g9Book=manifest.books.find(b=>b.grade===9&&b.medium==='en');
 const g10Book=manifest.books.find(b=>b.grade===10&&b.medium==='en');
 if(!g9Book||!g10Book||g9.sourcePdfSha256!==g9Book.sha256||
    g10.originalPdfSha256!==g10Book.sha256)fail('SOURCE_BOOK_IDENTITY_MISMATCH');
 if(g9.grade!==9||String(g9.chapter)!=='1'||g9.exercise!=='1.2'||
    g9.englishOnly!==true||g9.stage!=='CANDIDATE_NOT_REGISTERED'||
    !Array.isArray(g9.rows)||g9.rows.length!==g9.englishTextbookParts)fail('G9_CANDIDATE_SCOPE_MISMATCH');
 const g9Ids=assertUnique(g9.rows);
 for(const r of g9.rows){
   if(!/^g9-ch1-ex1\.2-q\d+(?:-[a-z0-9]+)?$/.test(r.id)||
     r.verifiedInOriginalAudit!==true||typeof r.sourceEnglish!=='string'||!r.sourceEnglish.trim()||
     typeof r.answer!=='string'||!r.answer.trim()||!Array.isArray(r.steps)||
     r.steps.length<2||r.steps.some(s=>!s||!s.reason||!s.equation))
      fail('INCOMPLETE_G9_CANDIDATE');
 }
 if(g10.grade!==10||g10.chapter!==2||g10.exercise!=='2.5'||
   g10.sourceLanguages?.english!=='source-image checked'||
   !Array.isArray(g10.tasks)||g10.tasks.length!==g10.uniqueSubpartTasks)
   fail('G10_AUDIT_SCOPE_MISMATCH');
 const g10Ids=assertUnique(g10.tasks);
 for(const r of g10.tasks)if(!/^c10-2-ex2-5-q\d+(?:-[a-z0-9]+)?$/.test(r.id))fail('INVALID_G10_TASK_ID');
 const owners=registeredIds(root);
 const presentG9=g9.rows.filter(r=>owners.has(r.id));
 const pendingG9=g9.rows.filter(r=>!owners.has(r.id));
 const presentG10=g10.tasks.filter(r=>owners.has(r.id));
 const pendingG10=g10.tasks.filter(r=>!owners.has(r.id));
 const overlap=[...g9Ids,...g10Ids].filter(id=>(owners.get(id)||[]).length>1)
   .map(id=>({id,owners:owners.get(id)}));
 return {
  schemaVersion:1,kind:'READ_ONLY_ENGLISH_BATCH_PLAN',
  scope:'Selected 2025 English exercises, NOT textbook-wide completion',
  releaseApproved:false,sourceImageReviewPerformedNow:false,externalApiCalls:0,externalApiCostUsd:0,
  grade9:{exercise:'1.2',sourceAuditedCandidateParts:g9.rows.length,
    registeredCandidateIds:presentG9.length,notRegisteredCandidateIds:pendingG9.length,
    queue:batches(pendingG9,batchSize),missingIds:pendingG9.map(r=>r.id),
    wholeGradeCompletionPercent:null},
  grade10:{exercise:'2.5',sourceAuditUniqueTasks:g10.tasks.length,
    registeredTaskIds:presentG10.length,notRegisteredTaskIds:pendingG10.length,
    missingIds:pendingG10.map(r=>r.id),wholeGradeCompletionPercent:null},
  multipleRegistrations:overlap,
  validationRequired:['independent mathematics','source-to-UI fidelity',
    'notation and mobile browser','release gate and Pages verification'],
  note:'Script registration is not proof of release, source fidelity, correct mathematics, or full curriculum completion.'
 };
}
function main(argv){
 if(argv.length>2||argv.length===1||argv.length===2&&argv[0]!=='--output')
   fail('INVALID_ARGUMENT');
 const report=buildPlan();
 if(argv.length){
   const dest=path.resolve(argv[1]),publicDir=file('site');
   if(dest===publicDir||dest.startsWith(publicDir+path.sep))fail('PUBLIC_REPORT_FORBIDDEN');
   fs.mkdirSync(path.dirname(dest),{recursive:true,mode:0o700});
   fs.writeFileSync(dest,JSON.stringify(report,null,2)+'\n',{mode:0o600});
 }
 console.log(JSON.stringify(report,null,2));
}
module.exports={assertUnique,scriptsInIndex,registeredIds,batches,buildPlan};
if(require.main===module)try{main(process.argv.slice(2));}catch(e){console.error('TRACE_BATCH_BLOCKED: '+e.message);process.exitCode=1;}
