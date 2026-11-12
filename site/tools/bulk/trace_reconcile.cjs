#!/usr/bin/env node
'use strict';
// Read-only adapter. The existing bulk engine owns validation and publishing.
const fs=require('node:fs'),path=require('node:path'),cp=require('node:child_process');
const bulk=require('../curriculum_bulk.cjs');
const sha=text=>require('node:crypto').createHash('sha256').update(text).digest('hex');
const STAGES=['missing','candidate','source-checked','math-checked','language-reviewed','ready-for-integration','merged','deployed','live-verified'];
const SHA=/^[a-f0-9]{40}$/;
const read=file=>JSON.parse(fs.readFileSync(file,'utf8'));
const hash=bulk.hashRecord;
function git(root,args){return cp.execFileSync('git',args,{cwd:root,encoding:'utf8',stdio:['ignore','pipe','pipe'],timeout:15000,maxBuffer:16*1024*1024});}
function idLocation(id){
 const text=String(id||'').replace(/^c(9|10|11|12)-(\d+)-ex/,'g$1-ch$2-ex');
 const m=text.match(/^g(9|10|11|12)-ch0*(\d+)-ex(\d+(?:[.-]\d+|[.-]unit)?)-q(\d+)(?:-?([a-z]+(?:-[a-z0-9]+)*|\d+))?$/i);
 return m?{grade:Number(m[1]),chapter:String(Number(m[2])),exercise:m[3].replace(/-/g,'.'),question:String(Number(m[4])),part:(m[5]||'whole').toLowerCase()}:null;
}
function location(r){
 const fromId=idLocation(r.id);if(fromId)return fromId;
 const label=typeof r.label==='object'?r.label.en:r.label;
 const m=String(label||'').match(/(?:Unit\s+)?Exercise\s+(\d+(?:\.\d+)?)\s*[·:-]?\s*Q\s*(\d+)(?:\s*\(([a-z0-9]+)\))?/i);
 const grade=Number(r.classNum||r.grade),chapter=String(r.chapter||'');
 if(!m||![9,10,11,12].includes(grade)||!/^\d+$/.test(chapter))return null;
 return {grade,chapter:String(Number(chapter)),exercise:/^Unit/i.test(m[0])?m[1]+'.unit':m[1],question:String(Number(m[2])),part:(m[3]||'whole').toLowerCase()};
}
const labelKey=l=>`g${l.grade}/ch${l.chapter}/ex${l.exercise}/q${l.question}/${l.part}`;
const numberedKey=l=>labelKey({...l,part:'*'});
function canonical(l,{edition='unknown',volume=null,medium='en'}={}){
 return `g${l.grade}/edition-${edition}/vol-${volume??'unknown'}/ch${l.chapter}/${l.exercise.endsWith('.unit')?'unit':'exercise'}-${l.exercise}/q${l.question}/${l.part}/${medium}`;
}
function objectRecords(value,out=[]){
 if(Array.isArray(value)){for(const v of value)objectRecords(v,out);}
 else if(value&&typeof value==='object'){
  if(typeof value.id==='string'&&(idLocation(value.id)||value.q||value.steps))out.push(value);
  for(const v of Object.values(value))if(v&&typeof v==='object')objectRecords(v,out);
 }
 return out;
}
function prEvidence(snapshot,{root=bulk.ROOT,mainSha}={}){
 if(snapshot.schemaVersion!==1||!Array.isArray(snapshot.pullRequests))throw Error('Invalid PR snapshot');
 const candidates=[],pullRequests=[];
 for(const p of snapshot.pullRequests){
  if(!SHA.test(p.head_sha)||!SHA.test(p.base_sha)||!Number.isInteger(p.number))throw Error('Invalid pinned PR reference');
  const files=git(root,['diff','--name-only',p.base_sha,p.head_sha]).trim().split('\n').filter(Boolean);
  const detail={number:p.number,url:p.url,headSha:p.head_sha,state:p.state,draft:p.draft,
   headReachableFromMain:cp.spawnSync('git',['merge-base','--is-ancestor',p.head_sha,mainSha],{cwd:root}).status===0,
   documentAuditFiles:files.filter(f=>f.startsWith('docs/')&&/audit|coverage|source/i.test(f)),files:[]};
  for(const file of files.filter(f=>f.startsWith('site/data/')&&/\.(?:json|js)$/.test(f))){
   let text;try{text=git(root,['show',p.head_sha+':'+file]);}catch{continue;}
   const fileSha256=sha(text);let equalsMain=false;
   try{equalsMain=sha(git(root,['show',mainSha+':'+file]))===fileSha256;}catch{}
   const entry={path:file,contentSha256:fileSha256,equalsMain,recordIds:[]};
   let records=[];
   if(file.endsWith('.json')){try{records=objectRecords(JSON.parse(text));}catch{entry.error='INVALID_JSON';}}
   // JS in unmerged PRs is never executed. Recognise literal IDs as candidates only.
   else records=[...text.matchAll(/["']id["']\s*:\s*["']((?:g|c)(?:9|10|11|12)-[^"']+)["']/g)].map(m=>({id:m[1]}));
   const seen=new Set();
   for(const r of records){
    const l=location(r);if(!l||seen.has(r.id))continue;seen.add(r.id);entry.recordIds.push(r.id);
    candidates.push({id:r.id,location:l,pr:p.number,headSha:p.head_sha,file,fileSha256,
     recordSha256:hash(r),textSha256:typeof r.q?.en==='string'?sha(r.q.en):null,
     fileEqualsMain:equalsMain,kind:'UNREVIEWED_PR_CANDIDATE'});
   }
   entry.recordIds.sort();detail.files.push(entry);
  }
  pullRequests.push(detail);
 }
 return {observedAt:snapshot.observedAt,pullRequests,candidates};
}
function reconcile({root=bulk.ROOT,prSnapshot,intakeSnapshot}={}){
 const mainSha=git(root,['rev-parse','origin/main']).trim(),runtime=bulk.loadRuntime(root,{trace:true});
 const inventory=bulk.inventory({root}),validation=bulk.validateAll({root});
 const prs=prSnapshot?prEvidence(prSnapshot,{root,mainSha}):{pullRequests:[],candidates:[],observedAt:null};
 const mappings=new Map();
 const books=read(path.join(root,'docs/reference-library/2025-user-textbook-manifest.json')).books;
 for(const report of validation.reports.filter(r=>r.passed)){
  const b=read(path.join(root,report.file));
  for(const m of b.mapping){const r=b.records.find(r=>r.id===m.recordId);mappings.set(r.id,{batch:b,mapping:m,report});}
 }
 const modules=new Map();for(const r of runtime.registrations)if(r.change!=='removed')modules.set(r.id,r.module);
 const moduleFacts=Object.fromEntries(runtime.loaded.map(file=>{
  const content=fs.readFileSync(path.join(root,'site',file),'utf8');let equalsMain=false;
  try{equalsMain=content===git(root,['show',mainSha+':site/'+file]);}catch{}
  return [file,{sha256:sha(content),equalsMain}];
 }));
 const ledger=[],unlocated=[];
 for(const [grade,g] of Object.entries(runtime.classes))for(const r of g.items.filter(bulk.exerciseItem)){
  const l=location({...r,classNum:Number(grade)});if(!l){unlocated.push({id:r.id,reason:'QUESTION_LOCATION_UNRESOLVED'});continue;}
  const checked=mappings.get(r.id),m=checked?.mapping,b=checked?.batch;
  const s=b?.sources.find(s=>s.id===m.sourceId),module=modules.get(r.id),book=books.find(x=>x.sha256===s?.sha256),volume=book?.volume??null;
  const langs=['en','ta'].filter(lang=>typeof r.q?.[lang]==='string'&&r.q[lang].trim());
  for(const part of m?.parts||[l.part])for(const medium of langs){
   const loc={...l,part},sourceChecked=!!checked&&(medium==='en'||m.visualChecked?.ta===true);
   const edition=book?'2025':'unknown';
   ledger.push({key:canonical(loc,{edition,volume,medium}),crossMediumKey:canonical(loc,{edition,volume,medium:'*'}),
    location:{...loc,edition,volume,medium},appId:r.id,module,
    hashes:{record:hash(r),text:sha(r.q[medium]),normalizedText:sha(r.q[medium].normalize('NFC').replace(/\s+/g,' ').trim()),module:moduleFacts[module]?.sha256??null},
    stages:Object.fromEntries(STAGES.map(stage=>[stage,stage==='candidate'?true:stage==='missing'?false:
     stage==='source-checked'?sourceChecked:stage==='math-checked'?!!checked:stage==='merged'?moduleFacts[module]?.equalsMain===true:
     stage==='deployed'||stage==='live-verified'?null:false])),
    source:checked?{batch:checked.report.file,sourceId:s.id,sourceSha256:s.sha256,volume,
     printedPages:medium==='en'?m.printedPages:m.tamilPrintedPages,pdfPages:medium==='en'?m.pdfPages:m.tamilPdfPages,
     evidence:'Inherited passing bulk-engine evidence; page images not inspected by this run'}:null,
    reportedProvenance:{source:r.source??null,reference:r.reference??null,figureSrc:r.figureSrc??null},
    uncertainty:[...(!checked?['SOURCE_AND_MATH_EVIDENCE_NOT_RECONCILED']:[]),'PROFESSIONAL_TAMIL_EDITORIAL_REVIEW_PENDING','DEPLOYMENT_NOT_RECHECKED'],
    figureVerification:r.figureSrc?'INHERITED_ASSET_NOT_VISUALLY_RECHECKED':'NOT_ESTABLISHED',
    possiblePrs:[...new Set(prs.candidates.filter(c=>numberedKey(c.location)===numberedKey(loc)).map(c=>c.pr))].sort((a,b)=>a-b)});
  }
 }
 const byLabel=new Map();for(const r of ledger){const k=r.key;if(!byLabel.has(k))byLabel.set(k,[]);byLabel.get(k).push(r.appId);}
 const labelCollisions=[...byLabel].filter(([,v])=>new Set(v).size>1).map(([key,ids])=>({key,appIds:[...new Set(ids)].sort()}));
 for(const r of ledger)if(labelCollisions.some(c=>c.key===r.key))r.uncertainty.push('SOURCE_NUMBER_COLLISION');
 const exact=new Map();for(const r of ledger){const k=`${r.location.grade}/${r.location.medium}/${r.hashes.text}`;if(!exact.has(k))exact.set(k,new Set());exact.get(k).add(r.appId);}
 const exactTextMatches=[...exact].filter(([,ids])=>ids.size>1).map(([fingerprint,ids])=>({fingerprint,appIds:[...ids].sort(),disposition:'REVIEW_ONLY_NOT_SOURCE_EQUIVALENCE'}));
 const normalized=new Map();for(const r of ledger){const key=`${r.location.grade}/${r.location.medium}/${r.hashes.normalizedText}`;if(!normalized.has(key))normalized.set(key,[]);normalized.get(key).push(r);}
 const nearTextMatches=[...normalized].filter(([,rows])=>new Set(rows.map(r=>r.hashes.text)).size>1).map(([fingerprint,rows])=>({fingerprint,appIds:[...new Set(rows.map(r=>r.appId))].sort(),method:'NFC_AND_WHITESPACE_ONLY',disposition:'REVIEW_ONLY_NOT_SOURCE_EQUIVALENCE'}));
 const historical=(intakeSnapshot?.records||[]).map(r=>{
  const l=idLocation(r.id);if(!l)throw Error('Unparseable intake identity: '+r.id);
  const hits=ledger.filter(x=>x.location.medium==='en'&&numberedKey(x.location)===numberedKey(l));
  return {id:r.id,key:r.key,archive:r.archive,archiveSha256:r.source_sha256,
   evidence:'HISTORICAL_INTAKE_SNAPSHOT_ORIGINAL_ZIP_NOT_REOPENED',
   samePartAppIds:[...new Set(hits.filter(x=>x.location.part===l.part).map(x=>x.appId))].sort(),
   sameNumberedQuestionAppIds:[...new Set(hits.map(x=>x.appId))].sort(),
   possiblePrs:[...new Set(prs.candidates.filter(c=>numberedKey(c.location)===numberedKey(l)).map(c=>c.pr))].sort((a,b)=>a-b),
   riskFlags:r.risk_flags||[],sourceChecked:false,mathChecked:false,languageReviewed:false};
 });
 const gaps=inventory.grades.flatMap(g=>g.chapters.map(c=>({grade:g.grade,chapter:c.chapter,
  numberedQuestionDenominator:c.verifiedTextbookDenominator,sourceTaskDenominator:c.chapterReconciliation?.passed?c.chapterReconciliation.sourceTasks:null,
  denominatorState:c.verifiedTextbookDenominator===null?'UNKNOWN':'INHERITED_VERIFIED_INVENTORY',
  knownMissingParts:c.chapterReconciliation?.passed?c.chapterReconciliation.missingSourceTasks:[],
  complete:c.complete,tamilEditorialReview:'pending'})));
 const expectedMissingParts=[];
 for(const g of inventory.grades)for(const c of g.chapters){
  if(!c.chapterReconciliation?.passed)continue;
  const doc=read(path.join(root,c.chapterReconciliation.file));
  for(const task of c.chapterReconciliation.missingSourceTasks){
   const [exercise,question,part]=task.split(':'),q=doc.inventory.exercises.find(e=>e.id===exercise)?.questions.find(q=>q.number===question),s=doc.sources.find(s=>s.id===q?.sourceId);
   if(!q||!s)throw Error('Unresolved authoritative missing task '+task);
   const volume=books.find(b=>b.sha256===s.sha256)?.volume??null,loc={grade:g.grade,chapter:c.chapter,exercise,question,part};
   expectedMissingParts.push({key:canonical(loc,{edition:'2025',volume,medium:'en'}),location:{...loc,edition:'2025',volume,medium:'en'},
    stages:Object.fromEntries(STAGES.map(stage=>[stage,stage==='missing'||stage==='source-checked'?true:stage==='deployed'||stage==='live-verified'||stage==='merged'?null:false])),
    source:{file:c.chapterReconciliation.file,sourceSha256:s.sha256,printedPages:q.printedPages,pdfPages:q.pdfPages},
    uncertainty:['SOURCE_INVENTORY_INHERITED_NOT_RECHECKED','PR_AUDITS_MAY_CONTAIN_WORK_NOT_REGISTERED']});
  }
 }
 const summary={runtimeRecords:Object.values(runtime.classes).reduce((n,g)=>n+g.items.length,0),
  runtimeExerciseRecords:inventory.grades.reduce((n,g)=>n+g.exerciseAppRecords,0),runtimeDataModules:runtime.loaded.length,
  runtimeGrade10Records:runtime.classes[10].items.length,legacyBaseGrade10Records:readBaseCount(root),
  strictMathCheckedAppRecords:new Set(ledger.filter(r=>r.stages['math-checked']).map(r=>r.appId)).size,
  ledgerMediumPartRows:ledger.length,unlocatedExerciseRecords:unlocated.length,
  openPrsInspected:prs.pullRequests.length,prCandidateOccurrences:prs.candidates.length,
  historicalStagingRecords:historical.length,historicalStagingWithRuntimeLabelOverlap:historical.filter(r=>r.sameNumberedQuestionAppIds.length).length,
  historicalStagingWithPrOverlap:historical.filter(r=>r.possiblePrs.length).length,
  knownMissingSourceParts:gaps.reduce((n,g)=>n+g.knownMissingParts.length,0),
  wholeProjectQuestionDenominator:null,wholeProjectTaskDenominator:null,
  newAcceptedUniqueParts:0,sourcePagesInspectedThisRun:0,modelProviderApiCalls:0,modelProviderApiCostUsd:0,
  stagePopulationMediumPartRows:ledger.length+expectedMissingParts.length,
  stages:Object.fromEntries(STAGES.map(s=>[s,{true:[...ledger,...expectedMissingParts].filter(r=>r.stages[s]===true).length,false:[...ledger,...expectedMissingParts].filter(r=>r.stages[s]===false).length,unknown:[...ledger,...expectedMissingParts].filter(r=>r.stages[s]===null).length}]))};
 return {schemaVersion:1,type:'TRACE_RECONCILIATION',mainSha,
  policy:{scope:'Runtime and pinned open-PR candidates plus inherited validation; no publication authority',denominators:'Unknown is null; known missing parts are a lower bound',stages:'Independent evidence states, never inferred from another stage',sourceAccess:'Drive metadata located; page images not inspected by this run',archiveAccess:'Original five WIP ZIPs not present locally or found by Drive search; historical snapshot only'},
  inputHashes:{prSnapshot:prSnapshot?hash(prSnapshot):null,intakeSnapshot:intakeSnapshot?hash(intakeSnapshot):null},
  summary,ledger:ledger.sort((a,b)=>a.key.localeCompare(b.key)||a.appId.localeCompare(b.appId)),
  gaps,expectedMissingParts,unlocated,labelCollisions,exactTextMatches,nearTextMatches,historicalStaging:historical,prs,
  validation:{passed:validation.passed,reports:validation.reports.map(r=>({file:r.file,passed:r.passed,errors:r.errors}))},
  unresolvedSourceMismatches:[{grade:10,exercise:'8.1',question:'5',status:'UNRESOLVED_INHERITED_REPORT',detail:'Historical report: English nine workers / Tamil ten workers, nine wage values; original images not rechecked.'}],
  pilot:{status:'NOT_STARTED',reason:'60 accessible source-verified unworked parts and independent bilingual reviewers not established'}};
}
function readBaseCount(root){const vm=require('node:vm'),c=vm.createContext({window:{}});vm.runInContext(fs.readFileSync(path.join(root,'site/data/class-10.js'),'utf8'),c,{timeout:5000});return c.window.TRIGGLE_CLASSES[10].items.length;}
function validateReport(r){
 if(r.schemaVersion!==1||r.type!=='TRACE_RECONCILIATION'||!SHA.test(r.mainSha)||!Array.isArray(r.ledger)||!Array.isArray(r.gaps)||!Array.isArray(r.expectedMissingParts)||!r.summary||!r.validation||!['NOT_STARTED','BLOCKED'].includes(r.pilot?.status))throw Error('Invalid TRACE report');
 for(const row of r.ledger){
  if(!row.key||!row.appId||!/^[a-f0-9]{64}$/.test(row.hashes.record)||!['en','ta'].includes(row.location.medium))throw Error('Invalid ledger row');
  if(canonical(row.location,row.location)!==row.key)throw Error('Ledger key/location mismatch');
  if(![9,10,11,12].includes(row.location.grade)||!['2025','unknown'].includes(row.location.edition)||![null,1,2].includes(row.location.volume))throw Error('Invalid source location');
  for(const s of STAGES)if(![true,false,null].includes(row.stages[s]))throw Error('Invalid stage '+s);
  if(row.stages['source-checked']&&(!row.source||!/^[a-f0-9]{64}$/.test(row.source.sourceSha256)||!row.source.printedPages?.length||!row.source.pdfPages?.length))throw Error('Source check without provenance');
 }
 for(const row of r.expectedMissingParts){if(canonical(row.location,row.location)!==row.key||row.stages.missing!==true||row.stages['math-checked']!==false||!row.source?.sourceSha256)throw Error('Invalid missing-part evidence');}
 if(r.summary.ledgerMediumPartRows!==r.ledger.length)throw Error('Ledger summary mismatch');
 return r;
}
function csv(rows,fields){const cell=v=>'"'+String(v??'unknown').replace(/"/g,'""')+'"';return fields.map(cell).join(',')+'\n'+rows.map(r=>fields.map(f=>cell(r[f]===null?null:typeof r[f]==='object'?JSON.stringify(r[f]):r[f])).join(',')).join('\n')+'\n';}
function writeReports(r,out){
 validateReport(r);fs.mkdirSync(out,{recursive:true});
 bulk.withLock('integration',()=>{
  bulk.atomicJson(path.join(out,'ledger.json'),r);
  for(const [name,rows,fields] of [['gaps',r.gaps,['grade','chapter','numberedQuestionDenominator','sourceTaskDenominator','denominatorState','knownMissingParts','tamilEditorialReview']],['ledger',r.ledger,['key','appId','module','stages','source','uncertainty']]]){
   const file=path.join(out,name+'.csv'),tmp=file+'.'+process.pid+'.tmp';try{fs.writeFileSync(tmp,csv(rows,fields),{flag:'wx'});fs.renameSync(tmp,file);}finally{if(fs.existsSync(tmp))fs.unlinkSync(tmp);}
  }
  fs.writeFileSync(path.join(out,'delta.md'),`# TRACE manual reconciliation\n\nMain: ${r.mainSha}\n\n${r.summary.runtimeExerciseRecords} exercise app records across ${r.summary.runtimeDataModules} runtime data modules; ${r.summary.strictMathCheckedAppRecords} app records have inherited passing bulk-engine math evidence.\n\nHistorical staging label overlaps: ${r.summary.historicalStagingWithRuntimeLabelOverlap}/${r.summary.historicalStagingRecords}; these are possible overlaps, not source-equivalent duplicate certifications. ${r.summary.openPrsInspected} pinned open PRs inspected.\n\n${r.summary.knownMissingSourceParts} known missing source parts (lower bound); whole-project denominators unknown. New accepted parts: 0. Source-page images inspected this run: 0. Tamil professional review pending. Pilot NOT_STARTED. No provider calls, integrations, deployments or schedule changes.\n`);
 });
}
function main(args){
 const opts={};for(let i=0;i<args.length;i++){if(['--offline','--dry-run'].includes(args[i]))opts[args[i]]=true;else if(['--report','--prs','--intake'].includes(args[i])&&args[i+1])opts[args[i]]=args[++i];else throw Error('Unknown or incomplete argument '+args[i]);}
 if(!opts['--offline']||!opts['--dry-run'])throw Error('This version requires --offline --dry-run; it never integrates or calls providers');
 const r=reconcile({prSnapshot:opts['--prs']?read(opts['--prs']):undefined,intakeSnapshot:opts['--intake']?read(opts['--intake']):undefined});validateReport(r);
 if(opts['--report'])writeReports(r,path.resolve(opts['--report']));console.log(JSON.stringify(r.summary,null,2));if(!r.validation.passed)process.exitCode=1;
}
module.exports={STAGES,location,idLocation,labelKey,numberedKey,canonical,objectRecords,prEvidence,reconcile,validateReport,writeReports,csv};
if(require.main===module)try{main(process.argv.slice(2));}catch(e){console.error('BLOCKED: '+e.message);process.exitCode=1;}
