#!/usr/bin/env node
'use strict';
// Read-only recovery. The bulk engine remains the only curriculum publisher.
const fs=require('node:fs'),path=require('node:path'),cp=require('node:child_process');
const bulk=require('../curriculum_bulk.cjs'),reconcile=require('./trace_reconcile.cjs');
const ROOT=bulk.ROOT,read=f=>JSON.parse(fs.readFileSync(path.join(ROOT,f),'utf8'));
const hash=bulk.hashRecord,sha=s=>require('node:crypto').createHash('sha256').update(s).digest('hex');
const git=args=>cp.execFileSync('git',args,{cwd:ROOT,encoding:'utf8',maxBuffer:32*1024*1024});
const STATES=['READY','NEEDS_REPAIR','NEEDS_REVIEW','DUPLICATE','BLOCKED'];
const norm=s=>typeof s==='string'?s.normalize('NFC').replace(/\s+/g,' ').trim():null;
function locate(id,context={}){
 const s=String(id||'').replace(/^g(9|10|11|12)-c(\d+)-/,'g$1-ch$2-').replace(/^g(9|10|11|12)-ex/,'g$1-ch'+(context.chapter||1)+'-ex');
 return reconcile.idLocation(s);
}
const key=l=>reconcile.labelKey(l);
function english(r){return r.q?.en||r.prompt?.en||r.questionText?.en||r.sourceExtract||r.sourceTextLayer||r.questionTextExtracted||r.questionEnglish||(typeof r.questionText==='string'?r.questionText:null)||r.sourceQuestion||r.source?.extractedText||r.task||r.verifiedWording?.en||(typeof r.question==='string'&&!/^\d+$/.test(r.question)?r.question:null);}
function shape(r){
 const steps=Array.isArray(r.steps)?r.steps:r.steps?.en||r.stepsEnglish||r.solution?.steps||r.reasoning||r.proofs;
 const answer=typeof r.answer==='string'?r.answer:r.answer?.en||r.answer||r.answerEnglish||r.result||r.answerKeyExtract;
 return {questionPresent:!!norm(english(r)),stepCount:Array.isArray(steps)?steps.length:0,answerPresent:answer!==undefined&&answer!==null&&answer!=='',
  structuredRuntime:!!(r.q?.en&&Array.isArray(r.steps)&&r.steps.every(s=>typeof s?.en==='string'&&s.en.trim())&&typeof r.answer==='string'&&r.answer.trim())};
}
function extract(value,context={},pointer='',out=[]){
 if(Array.isArray(value)){value.forEach((v,i)=>extract(v,context,pointer+'/'+i,out));return out;}
 if(!value||typeof value!=='object')return out;
 const grade=Number(value.grade||value.classNum||context.grade),chapter=String(value.chapter||value.chapterId?.match(/ch(\d+)/)?.[1]||context.chapter||''),exercise=value.exercise||context.exercise;
 const number=String(value.number??value.questionNumber??value.question??context.question??'');
 const ctx={grade,chapter,exercise,question:/^\d+$/.test(number)?number:context.question,source:value.source||value.sources||context.source};
 let loc=locate(value.id,ctx);
 if(!loc&&[9,10,11,12].includes(grade)&&/^\d+$/.test(chapter)&&/^\d+\.\d+$/.test(exercise||'')&&/^\d+$/.test(number))loc={grade,chapter,exercise,question:number,part:String(value.subpart||value.part||'whole')};
 if(loc){
  const parts=value.parts||value.subparts;
  const authored=!!(english(value)||value.steps||value.stepsEnglish||value.answer||value.result||value.solution||value.proofs||value.conditionalProof||value.answerKeyExtract);
  const labels=Array.isArray(parts)&&parts.length?parts.filter(p=>typeof p==='string'):[loc.part];
  if(authored||value.id||Array.isArray(parts))for(const part of labels)out.push({location:{...loc,part:String(part)},record:value,pointer,sourceEvidence:ctx.source||null});
 }
 for(const [k,v]of Object.entries(value))if(v&&typeof v==='object')extract(v,ctx,pointer+'/'+k,out);
 return out;
}
function classify({origins,exactRuntime,reviewHold=false,mathPassed=false,sourceChecked=false}){
 if(exactRuntime.length)return 'DUPLICATE';
 if(!origins.some(o=>o.authored.questionPresent||o.authored.stepCount||o.authored.answerPresent))return 'BLOCKED';
 if(!origins.some(o=>o.authored.questionPresent&&o.authored.stepCount&&o.authored.answerPresent))return 'NEEDS_REPAIR';
 // No automated path grants human approval. Source/model gates cannot clear a review hold.
 if(reviewHold||!mathPassed||!sourceChecked)return 'NEEDS_REVIEW';
 return 'NEEDS_REVIEW';
}
function build({snapshotFile='docs/trace/open-pr-snapshot-20261113.json'}={}){
 const snapshot=read(snapshotFile),intake=read('docs/trace/trace_intake_2026-11-12.json');
 const report=reconcile.reconcile({prSnapshot:snapshot,intakeSnapshot:intake});reconcile.validateReport(report);
 const runtime=bulk.loadRuntime(),runtimeRecords=Object.values(runtime.classes).flatMap(g=>g.items).filter(bulk.exerciseItem),groups=new Map(),artifacts=[];
 const add=(loc,origin)=>{const k=key(loc);if(!groups.has(k))groups.set(k,{key:k,location:loc,origins:[]});const g=groups.get(k);if(!g.origins.some(o=>o.ref===origin.ref&&o.file===origin.file&&o.pointer===origin.pointer&&o.appId===origin.appId))g.origins.push(origin);};
 const origin=(record,{file,ref,pointer='',pr=null,kind='PR_ARTIFACT',sourceEvidence=null})=>({kind,pr,ref,file,pointer,appId:record.id||null,recordSha256:hash(record),questionSha256:norm(english(record))?sha(norm(english(record))):null,authored:shape(record),sourceEvidence,
  inheritedClaims:{source:record.source||null,reference:record.reference||null,review:record.review||null,status:record.status||record.sourceStatus||null,blockers:record.releaseBlockers||record.blockedReason||record.fidelityWarning||record.sourceTextStatus||null},
  evidenceNote:'Presence/claims only; full solution correctness and source fidelity require separate validation.'});
 // Refresh every pinned open PR, including documentation-only Grade 12 drafts omitted by the older adapter.
 for(const p of snapshot.pullRequests){
  const files=git(['diff','--name-only',p.base_sha,p.head_sha]).trim().split('\n').filter(f=>/^(site\/data\/|docs\/)/.test(f)&&/\.(json|md)$/.test(f)&&!/checkpoint|ledger|sources\.json/.test(f));
  for(const file of files){
   const text=git(['show',p.head_sha+':'+file]);let entries=[];
   const inferred={grade:Number(file.match(/(?:grade[-/]|g)(9|10|11|12)(?:[-/]|\b)/)?.[1]),chapter: file.match(/ch(\d+)/)?.[1]||'1',exercise:file.match(/ex(\d+)[.-](\d+)/)?.slice(1).join('.'),question:file.match(/-q(\d+)(?:-|\.)/)?.[1]};
   if(file.endsWith('.json')){try{entries=extract(JSON.parse(text),inferred);}catch(e){artifacts.push({pr:p.number,ref:p.head_sha,file,status:'INVALID_JSON',error:e.message});continue;}}
   // #129 is a 34-task authored Markdown audit, not just the nine tasks in its stale PR description.
   if(p.number===129&&file.endsWith('exercise-1-2-source-audit-20261110.md')){
    const counts=[5,4,4,4,3,4,1,4,2,3],roman=['i','ii','iii','iv','v'];
    entries=counts.flatMap((n,i)=>Array.from({length:n},(_,j)=>({location:{grade:9,chapter:'1',exercise:'1.2',question:String(i+1),part:n===1?'whole':roman[j]},record:{id:`g9-ch1-ex1.2-q${i+1}${n===1?'':'-'+roman[j]}`},pointer:'#Q'+(i+1)+'/'+(n===1?'whole':roman[j]),markdownWorking:true})));
   }
   if(p.number===38&&/ex1\.1-q1-(i|ii|iii)\.md$/.test(file))entries=[{location:{grade:12,chapter:'1',exercise:'1.1',question:'1',part:file.match(/q1-(i+)\.md$/)[1]},record:{id:'g12-ch1-ex1.1-q1-'+file.match(/q1-(i+)\.md$/)[1]},pointer:'',markdownWorking:true}];
   // Locate ID references even when a heterogeneous audit has no extractable record body.
   for(const m of text.matchAll(/(["'`])(g(?:9|10|11|12)-(?:ch\d+-|c\d+-)?ex\d+[.-]\d+-q\d+(?:-?[a-z]+(?:-[a-z0-9]+)*)?)\1/gi)){
    const l=locate(m[2],inferred);if(l&&/^(?:whole|[ivx]+|[ab](?:-[ivx]+)?)$/.test(l.part)&&!entries.some(e=>key(e.location)===key(l)))entries.push({location:l,record:{id:m[2]},pointer:'literal-id-reference:'+m.index});
   }
   const excluded=/worked-examples/.test(file);
   artifacts.push({pr:p.number,ref:p.head_sha,file,fileSha256:sha(text),locatedOccurrences:entries.length,status:entries.length?'LOCATED':excluded?'EXCLUDED_WORKED_EXAMPLES':'MANUAL_EXTRACTION_PENDING'});
   for(const e of entries){const o=origin(e.record,{file,ref:p.head_sha,pr:p.number,pointer:e.pointer,sourceEvidence:e.sourceEvidence||null});
    if(e.markdownWorking){o.kind='MARKDOWN_SOLUTION_AUDIT';o.authored={questionPresent:true,stepCount:null,answerPresent:true,structuredRuntime:false,narrativeWorking:true};o.evidenceNote='Existing question, reasoning and answer are in the linked Markdown section. Ordered runtime steps require normalization; this is not a missing-solution claim.';}
    add(e.location,o);
   }
  }
 }
 // The old JS adapter supplies literal IDs only; never execute unmerged PR JavaScript.
 for(const c of report.prs.candidates){
  const loc=c.location,g=groups.get(key(loc));if(g?.origins.some(o=>o.pr===c.pr&&o.file===c.file&&o.appId===c.id))continue;
  add(loc,origin({id:c.id},{file:c.file,ref:c.headSha,pr:c.pr,kind:'PR_ID_ONLY'}));
 }
 // Source inventories are gaps, not authored or deployment-ready questions.
 for(const file of fs.readdirSync(path.join(ROOT,'docs/trace/source-inventories')).filter(f=>/^g10-ch.*\.json$/.test(f))){
  const name='docs/trace/source-inventories/'+file,doc=read(name);
  for(const q of doc.questions)for(const part of q.parts)add({grade:doc.grade,chapter:String(doc.chapter),exercise:doc.exercise,question:String(q.question),part},origin({}, {file:name,ref:report.mainSha,pointer:'/questions/'+q.question,kind:'SOURCE_INVENTORY_ONLY',sourceEvidence:{sources:doc.sources,locators:q.sourceLocators,discrepancy:q.sourceDiscrepancy||null,professionalTamilReview:doc.professionalTamilReview,teacherApproval:doc.teacherApproval}}));
 }
 for(const r of report.expectedMissingParts)add({grade:r.location.grade,chapter:r.location.chapter,exercise:r.location.exercise,question:r.location.question,part:r.location.part},origin({}, {file:r.source.file,ref:report.mainSha,pointer:r.key,kind:'CHAPTER_SOURCE_GAP',sourceEvidence:r.source}));
 for(const r of intake.records){const loc=locate(r.id);add(loc,origin({id:r.id},{file:'docs/trace/trace_intake_2026-11-12.json',ref:report.mainSha,pointer:r.key,kind:'ARCHIVE_SNAPSHOT_ONLY',sourceEvidence:{archive:r.archive,sha256:r.source_sha256,status:'OWNER_DEFERRED_ORIGINAL_BYTES_NOT_REOPENED',riskFlags:r.risk_flags}}));}
 const batchFile='docs/trace/candidates/g12-ex1-4/batch.json',batch=read(batchFile),validation=bulk.validateBatch(batch),sourceReview=read('docs/trace/candidates/g12-ex1-4/source-review-20261113.json');
 for(const m of batch.mapping){const r=batch.records.find(r=>r.id===m.recordId);add(locate(r.id),origin(r,{file:batchFile,ref:report.mainSha,pointer:'/records/'+r.id,kind:'COMPILER_CANDIDATE',sourceEvidence:{sources:batch.sources,mapping:m,review:'docs/trace/candidates/g12-ex1-4/source-review-20261113.json'}}));}
 const candidates=[...groups.values()].sort((a,b)=>a.key.localeCompare(b.key)).map(g=>{
  const hits=runtimeRecords.filter(r=>{const loc=locate(r.id)||reconcile.location(r);return loc&&key(loc)===g.key;});
  const sameQuestion=runtimeRecords.filter(r=>{const l=locate(r.id)||reconcile.location(r);return l&&reconcile.numberedKey(l)===reconcile.numberedKey(g.location);});
  const exactRuntime=hits.filter(r=>g.origins.some(o=>o.recordSha256===hash(r))).map(r=>r.id);
  const textMatches=hits.filter(r=>g.origins.some(o=>o.questionSha256&&o.questionSha256===sha(norm(r.q?.en)||''))).map(r=>r.id);
  const compiler=g.origins.find(o=>o.kind==='COMPILER_CANDIDATE');
  const mathPassed=!!compiler&&validation.passed,sourceChecked=!!compiler&&sourceReview.batchSha256===hash(batch)&&['en','ta'].every(m=>sourceReview.pages.some(p=>p.medium===m&&p.visualChecked===true&&p.purpose.startsWith('Exercise')));
  const authored=g.origins.some(o=>o.authored.questionPresent||o.authored.stepCount||o.authored.answerPresent);
  const blockingReasons=[];
  if(!authored)blockingReasons.push('NO_RECOVERED_AUTHORED_QUESTION_AND_COMPLETE_SOLUTION');
  if(!mathPassed)blockingReasons.push('CURRENT_RECORD_BOUND_INDEPENDENT_MATH_VALIDATION_MISSING');
  if(!sourceChecked)blockingReasons.push('ORIGINAL_2025_EN_TA_SOURCE_FIDELITY_NOT_REVALIDATED_FOR_THIS_CANDIDATE');
  if(!g.origins.some(o=>o.authored.structuredRuntime))blockingReasons.push('BULK_BATCH_SCHEMA_AND_FULL_STANDARD_SOLUTION_NOT_ESTABLISHED');
  if(compiler)blockingReasons.push('TEACHER_REVIEW_OWNER_DEFERRED_EXPLICIT_EX1_4_RELEASE_HOLD');
  if(hits.length&&!exactRuntime.length)blockingReasons.push('RUNTIME_LOCATION_OVERLAP_REQUIRES_SOURCE_EQUIVALENCE_REVIEW');
  if(g.origins.some(o=>o.sourceEvidence?.discrepancy))blockingReasons.push('INHERITED_SOURCE_DISCREPANCY_REQUIRES_RESOLUTION');
  if(g.origins.some(o=>o.kind==='ARCHIVE_SNAPSHOT_ONLY'))blockingReasons.push('W1_W5_ORIGINAL_ARCHIVE_RECONCILIATION_OWNER_DEFERRED');
  const status=classify({origins:g.origins,exactRuntime,reviewHold:!!compiler,mathPassed,sourceChecked});
  return {...g,status,candidateKind:authored?'AUTHORED_OR_PARTIAL':'SOURCE_OR_ID_ONLY',existingApp:{samePartIds:hits.map(r=>r.id),sameNumberedQuestionIds:sameQuestion.map(r=>r.id),exactRecordDuplicates:exactRuntime,normalizedEnglishTextMatches:textMatches,policy:'Only full record equality is classified DUPLICATE. Labels/text matches alone require review; no deletion or new ID assignment.'},
   mathematicalValidation:{status:mathPassed?'PASSED':'NOT_ESTABLISHED',recordSha256:compiler?.recordSha256||null,report:mathPassed?'docs/trace/release-queue/g12-ex1-4-validation.json':null,method:mathPassed?'Bulk verifier, exact Cramer compiler and independent BigInt Gauss-Jordan critic':null},
   english:{sourceFidelity:sourceChecked?'PAGE_IMAGES_RECHECKED':'NOT_REVALIDATED',solution:mathPassed?'FULL_STANDARD_STEPS_VALIDATED':'REVIEW_REQUIRED',teacherReview:compiler?'OWNER_DEFERRED_REQUIRED':'NOT_ESTABLISHED',eligible:false,blockingReasons},
   tamil:{sourceCorrespondence:compiler?'NUMBERS_AND_EQUATIONS_COMPARED':'NOT_REVALIDATED',fullTranscription:compiler?false:null,professionalReview:'OWNER_DEFERRED_PENDING',eligible:false,blockingReasons:['FULL_TAMIL_WORDING_AND_SOLUTION_REVIEW_PENDING','PROFESSIONAL_TAMIL_TEACHER_REVIEW_OWNER_DEFERRED']},
   deployment:{eligible:false,integrated:false,liveVerified:false,blockingReasons:status==='DUPLICATE'?['ALREADY_PRESENT_EXACT_RECORD_DO_NOT_REDEPLOY']:[...blockingReasons,'EXACT_HEAD_SOURCE_UNIT_MOBILE_SECURITY_CI_AND_PAGES_GATES_NOT_RUN_FOR_INTEGRATION']},
   nextAction:status==='DUPLICATE'?'Retain runtime progress key; supersede this occurrence without changing existing PRs.':compiler?'Obtain the explicitly required teacher review; retain Tamil pending. Then use bulk register with grade/integration leases and exact-head release gates.':authored?'Recover the linked authored record, compare original EN/TA images and runtime IDs, normalize to bulk schema and independently validate.':'Recover existing authored evidence if available; source-only inventory is not permission to author unrelated exercises.'};
 });
 const counts={candidatesDiscovered:candidates.length,authoredOrPartial:candidates.filter(r=>r.candidateKind==='AUTHORED_OR_PARTIAL').length,sourceOrIdOnly:candidates.filter(r=>r.candidateKind==='SOURCE_OR_ID_ONLY').length,existingDuplicates:candidates.filter(r=>r.status==='DUPLICATE').length,candidatesValidated:candidates.filter(r=>r.mathematicalValidation.status==='PASSED').length,candidatesPromotedReady:0,exercisesIntegrated:0,exercisesLiveVerified:0,remainingBlockedCandidates:candidates.filter(r=>r.status!=='DUPLICATE').length,statuses:Object.fromEntries(STATES.map(s=>[s,candidates.filter(r=>r.status===s).length]))};
 return {queue:{schemaVersion:1,type:'TRACE_EXERCISE_RELEASE_QUEUE',mainSha:report.mainSha,observedAt:snapshot.observedAt,inputHashes:{prSnapshot:hash(snapshot),intake:hash(intake),compilerBatch:hash(batch)},policy:{identity:'Location-based triage groups; not a claim of edition/source equivalence. Every original app ID and artifact is retained.',scope:'Pinned open-PR data/docs, eight compiler candidates, historical intake, bounded source inventories and known chapter gaps. No 41-chapter queue promotion.',completeness:'Unparsed documents are explicitly listed. Source-only/ID-only entries are counted separately; all-grade denominator unknown.',englishOnly:'Supported by docs/curriculum/SCHEMA.md. Ex1.4 is held by the explicit teacher release requirement in docs/trace/SPRINT-2-2026-11-12.md; this run cannot grant that approval.',deferred:['W1-W5 original archives','Professional Tamil/teacher review'],publisher:'site/tools/curriculum_bulk.cjs; grade and integration leases; exact-head CI; Pages and live verification'},counts,runtimeSummary:report.summary,artifacts,candidates},validation,report};
}
function validate(q){
 if(q.schemaVersion!==1||q.type!=='TRACE_EXERCISE_RELEASE_QUEUE'||!Array.isArray(q.candidates)||!/^[a-f0-9]{40}$/.test(q.mainSha))throw Error('Invalid queue');
 const seen=new Set();for(const c of q.candidates){if(seen.has(c.key)||key(c.location)!==c.key||!STATES.includes(c.status)||!c.origins.length||!/^[-a-z0-9]+$/.test(c.location.part))throw Error('Invalid/duplicate candidate');seen.add(c.key);
  if(c.status==='DUPLICATE'&&!c.existingApp.exactRecordDuplicates.length)throw Error('Duplicate lacks exact evidence');
  if(c.status==='READY'||c.english.eligible||c.tamil.eligible||c.deployment.eligible)throw Error('This recovery queue cannot manufacture release approval; add a reviewed, record-bound gate implementation first');
  if(c.status!=='DUPLICATE'&&!c.english.blockingReasons.length)throw Error('Missing blockers');
 }
 const expected={candidatesDiscovered:seen.size,authoredOrPartial:q.candidates.filter(c=>c.candidateKind==='AUTHORED_OR_PARTIAL').length,sourceOrIdOnly:q.candidates.filter(c=>c.candidateKind==='SOURCE_OR_ID_ONLY').length,existingDuplicates:q.candidates.filter(c=>c.status==='DUPLICATE').length,candidatesValidated:q.candidates.filter(c=>c.mathematicalValidation.status==='PASSED').length,candidatesPromotedReady:0,exercisesIntegrated:0,exercisesLiveVerified:0,remainingBlockedCandidates:q.candidates.filter(c=>c.status!=='DUPLICATE').length,statuses:Object.fromEntries(STATES.map(s=>[s,q.candidates.filter(c=>c.status===s).length]))};
 if(hash(expected)!==hash(q.counts))throw Error('Count mismatch');
 for(const c of q.candidates)for(const o of c.origins)if(!/^[a-f0-9]{40}$/.test(o.ref)||!/^[a-f0-9]{64}$/.test(o.recordSha256))throw Error('Unpinned origin');
 return q;
}
function write(out){const result=build();validate(result.queue);fs.mkdirSync(out,{recursive:true});bulk.atomicJson(path.join(out,'queue.json'),result.queue);bulk.atomicJson(path.join(out,'g12-ex1-4-validation.json'),result.validation);
 // Compact refreshed evidence; historical full ledger is retained without another multi-megabyte copy.
 bulk.atomicJson(path.join(out,'reconciliation.json'),{...result.report,ledger:undefined,prs:undefined,ledgerStorage:'Reproduce full ledger via trace_reconcile.cjs using the pinned 20261113 PR snapshot; runtimeSummary and all candidate overlaps are retained here.'});
 console.log(JSON.stringify(result.queue.counts,null,2));return result.queue;}
module.exports={locate,extract,shape,classify,build,validate,write};
if(require.main===module)try{const args=process.argv.slice(2);if(args.length!==2||args[0]!=='--report')throw Error('Usage: trace_release_queue.cjs --report DIRECTORY');write(path.resolve(args[1]));}catch(e){console.error(e.stack);process.exitCode=1;}
