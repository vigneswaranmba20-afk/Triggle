#!/usr/bin/env node
'use strict';
// Public allowlisted projection. Never read Firestore, teacher exports, or credentials.
const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto'),cp=require('node:child_process');
const bulk=require('./curriculum_bulk.cjs');
const ROOT=bulk.ROOT, repo='https://github.com/vigneswaranmba20-afk/Triggle';
const read=p=>JSON.parse(fs.readFileSync(path.join(ROOT,p),'utf8'));
const sha=p=>crypto.createHash('sha256').update(fs.readFileSync(path.join(ROOT,p))).digest('hex');
const files=dir=>fs.existsSync(path.join(ROOT,dir))?fs.readdirSync(path.join(ROOT,dir)).filter(f=>f.endsWith('.json')).map(f=>dir+'/'+f):[];
function build(){
 const runtime=bulk.loadRuntime(), audit=read('docs/curriculum/audit-2026-11-10.json');
 const inputs=new Set(['site/index.html','docs/curriculum/audit-2026-11-10.json',...runtime.loaded.map(p=>'site/'+p)]);
 const inventory=bulk.inventory(), actions=[], grades=[];
 for(const inv of inventory.grades){
  const grade=inv.grade, checkpointPath=`docs/curriculum/grade-${grade}/checkpoint.json`, checkpoint=read(checkpointPath);inputs.add(checkpointPath);
  const batches=files(`docs/curriculum/grade-${grade}/batches`).map(file=>{
   inputs.add(file); const batch=read(file), report=bulk.validateBatch(batch,{integrated:true,runtime});
   if(!report.passed)throw Error('Invalid curriculum batch '+file+': '+report.errors.join('; '));
   return {file,batch,report};
  });
  const inventories=files(`docs/curriculum/grade-${grade}/chapters`).map(file=>{inputs.add(file);return {file,doc:read(file)};});
  const chapters=[];
  for(const ch of inv.chapters){
   const records=bulk.chapterItems(runtime,grade,ch.chapter).filter(bulk.exerciseItem);
   const relevant=batches.filter(b=>b.batch.chapter===ch.chapter), authority=inventories.find(i=>i.doc.chapter===ch.chapter);
   const knownExercises=new Set([...records.map(r=>String(r.exercise)),...relevant.flatMap(b=>b.batch.inventory.exercises.map(e=>e.id)),...(authority?.doc.inventory.exercises||[]).map(e=>e.id)]);
   const exercises=[];
   for(const id of [...knownExercises].sort((a,b)=>a.localeCompare(b,undefined,{numeric:true}))){
    const subset=records.filter(r=>String(r.exercise)===id), bs=relevant.filter(b=>b.batch.inventory.exercises.some(e=>e.id===id));
    const sourceExercise=authority?.doc.inventory.exercises.find(e=>e.id===id)||bs.map(b=>b.batch.inventory.exercises.find(e=>e.id===id)).find(e=>e.complete);
    const mapping=bs.flatMap(b=>b.batch.mapping.filter(m=>m.exercise===id));
    const verifiedTasks=new Set(mapping.flatMap(m=>m.parts.map(p=>m.question+':'+p)));
    const questionNumbers=new Set(mapping.map(m=>m.question));
    const tasks=(sourceExercise?.questions||[]).flatMap(q=>q.parts.map(part=>({question:q.number,part,printedPages:q.printedPages||[],pdfPages:q.pdfPages||[],sourceId:q.sourceId,verified:verifiedTasks.has(q.number+':'+part),recordIds:mapping.filter(m=>m.question===q.number&&m.parts.includes(part)).map(m=>m.recordId)})));
    const release=checkpoint.release;
    const deployedBatch=b=>{
     if(!release?.deployment?.live?.passed)return false;
     const expected=sha('site/'+b.batch.module), live=release.deployment.live;
     return live.batches?.some(v=>v.batch===b.batch.batchId&&v.live&&v.moduleSha256===expected) || (grade===10&&live.publishedModuleSha256===expected&&b.batch.batchId==='g10-ch2-ex2-1');
    };
    const deployed=bs.length>0&&bs.every(deployedBatch);
    const complete=sourceExercise?.complete===true&&tasks.length>0&&tasks.every(t=>t.verified);
    const firstMissing=tasks.find(t=>!t.verified)||null;
    const sources=(authority?.doc.sources||bs.flatMap(b=>b.batch.sources)).map(s=>({title:s.title,url:s.url,id:s.id,language:s.language}));
    const ex={id,records:subset.map(r=>({id:r.id,label:r.label.en,url:`../index.html?class=${grade}&question=${encodeURIComponent(r.id)}`,englishAvailable:!!r.q?.en,tamilAvailable:!!r.q?.ta,recordSha256:bulk.hashRecord(r),verified:mapping.some(m=>m.recordId===r.id)})),verifiedNumberedQuestions:questionNumbers.size,verifiedTasks:verifiedTasks.size,totalNumberedQuestions:sourceExercise?.complete?sourceExercise.questions.length:null,totalTasks:sourceExercise?.complete?tasks.length:null,missingTasks:sourceExercise?.complete?tasks.filter(t=>!t.verified).length:null,tasks,nextMissing:firstMissing,englishComplete:complete,tamilReview:'pending',teacherApproval:'unknown (private)',status:complete?(deployed?'Deployed':'Awaiting verification'):subset.length?'Awaiting verification':'Not started',stages:{locallyCompleted:subset.length>0,tested:bs.length>0,merged:deployed,deployed,teacherApproved:null},sources,evidence:[...bs.map(b=>b.file),...(authority?[authority.file]:[])],deployment:deployed?{commit:release.commit,url:release.deployment.workflowUrl}:null};
    exercises.push(ex);
    if(!complete){
     actions.push({id:`g${grade}-ch${ch.chapter}-ex${id}`,priority:grade===12?3:4,grade,chapter:ch.chapter,exercise:id,startingQuestion:firstMissing?`Q${firstMissing.question}${firstMissing.part==='whole'?'':'('+firstMissing.part+')'}`:'Unknown — source inventory required',questionIds:firstMissing?[]:subset.map(r=>r.id),scope:firstMissing?tasks.filter(t=>!t.verified).map(t=>`Q${t.question}${t.part==='whole'?'':'('+t.part+')'}`):[],status:ex.status,type:firstMissing?'Exercise completion':'Source reconciliation',reason:grade===12?'Owner priority: finish Grade 12 textbook exercises in source order.':'Reconcile the earliest source-verified exercise gap before producing content.',dependencies:sourceExercise?['Reopen matching English and Tamil PDF page images; Tamil editorial review remains pending.']:['Full question/subpart inventory and exact first missing question are not verified.'],sources,sourcePages:firstMissing?{printed:firstMissing.printedPages,pdf:firstMissing.pdfPages}:null,evidence:[checkpointPath,...ex.evidence]});
    }
   }
   let acceptedComplete=false,acceptedEvidence=[];
   // Preserve the accepted Grade 10 reference only when the recorded source bytes match.
   if(grade===10&&ch.chapter==='1'){
    const ref=audit.grade10Chapter1Reference;acceptedComplete=Object.entries(ref.preservedFiles).every(([p,h])=>{inputs.add(p);return sha(p)===h;});
    acceptedEvidence=ref.evidence||[];
    if(acceptedComplete)for(const ex of exercises){ex.totalNumberedQuestions=ref.sourceQuestionCounts[ex.id]??null;ex.referenceComplete=true;ex.status='Awaiting teacher review';}
   }
   if(!exercises.length) actions.push({id:`g${grade}-ch${ch.chapter}-inventory`,grade,chapter:ch.chapter,exercise:'Unknown',startingQuestion:'Unknown — source inventory required',questionIds:[],scope:[],priority:grade===12?3:4,type:'Source reconciliation',status:'Blocked',reason:'No exercise records or verified question/subpart inventory for this chapter.',dependencies:['Inspect matching English/Tamil source pages; reconcile existing drafts before authoring.'],sources:[],evidence:[checkpointPath]});
   const complete=ch.complete||acceptedComplete;
   chapters.push({number:ch.chapter,title:ch.title.en,exerciseRecords:records.length,completeEnglish:complete,completionBasis:acceptedComplete?'Accepted preserved Chapter 1 reference; full Tamil and teacher review pending.':ch.complete?'Validated exercise inventory':'Incomplete or denominator unknown',verifiedNumberedQuestions:ch.sourceVerifiedNumberedQuestions,verifiedTasks:ch.sourceVerifiedTasks,totalNumberedQuestions:acceptedComplete?69:ch.verifiedTextbookDenominator,totalTasks:ch.chapterReconciliation?.passed?ch.chapterReconciliation.sourceTasks:null,missingTasks:ch.chapterReconciliation?.passed?ch.chapterReconciliation.missingSourceTasks.length:null,coveragePercent:ch.completionPercent,englishVerifiedRecords:ch.englishCoverage.verifiedRecords,tamilReview:'pending',nextMissing:exercises.find(e=>e.nextMissing)?.nextMissing||null,exercises,evidence:[checkpointPath,...acceptedEvidence]});
  }
  const inherited=audit.grades.find(g=>g.grade===grade)?.committedVisualEvidence;
  grades.push({grade,totalChapters:chapters.length,completedEnglishChapters:chapters.filter(c=>c.completeEnglish).length,partialChapters:chapters.filter(c=>!c.completeEnglish&&c.exerciseRecords>0).length,pendingChapters:chapters.filter(c=>!c.completeEnglish&&!c.exerciseRecords).length,exerciseRecords:chapters.reduce((n,c)=>n+c.exerciseRecords,0),verifiedNumberedQuestions:chapters.reduce((n,c)=>n+c.verifiedNumberedQuestions,0),verifiedTasks:chapters.reduce((n,c)=>n+c.verifiedTasks,0),wholeGradeQuestionDenominator:null,wholeGradeTaskDenominator:null,coveragePercent:null,englishVerifiedRecords:chapters.reduce((n,c)=>n+c.englishVerifiedRecords,0),inheritedVisualEvidence:inherited?{numberedQuestions:inherited.numberedQuestions,records:inherited.appRecords,tasks:inherited.solvedTasks,evidence:'docs/curriculum/audit-2026-11-10.json'}:null,tamilReview:'pending',mathematicsState:'Validated batches independently checked; legacy records require reconciliation.',lastVerifiedDeployment:grade===10||grade===12?{commit:checkpoint.release.commit,url:checkpoint.release.deployment.workflowUrl,scope:checkpoint.release.scope}:null,nextAction:checkpoint.nextActionableBatch,chapters});
  if(!chapters.some(c=>c.exercises.length)) actions.push({id:`g${grade}-inventory`,grade,priority:4,chapter:'1',exercise:'Unknown',startingQuestion:'Unknown — source inventory required',questionIds:[],scope:[],type:'Source reconciliation',status:'Blocked',reason:checkpoint.nextActionableBatch,dependencies:['Inspect original textbook page images and reconcile existing drafts.'],sources:[],evidence:[checkpointPath]});
 }
 // Omit accepted-complete reference exercises from the pending queue.
 const pending=actions.filter(a=>!grades.find(g=>g.grade===a.grade).chapters.find(c=>c.number===a.chapter)?.completeEnglish).sort((a,b)=>a.priority-b.priority|| (b.grade===12)-(a.grade===12)||Number(a.chapter)-Number(b.chapter)||a.exercise.localeCompare(b.exercise,undefined,{numeric:true}));
 const inputHashes=Object.fromEntries([...inputs].sort().map(p=>[p,sha(p)]));
 const sourceCommit=cp.execFileSync('git',['log','-1','--format=%H','--',...Object.keys(inputHashes)],{cwd:ROOT,encoding:'utf8'}).trim();
 const updatedAt=cp.execFileSync('git',['show','-s','--format=%cI',sourceCommit],{cwd:ROOT,encoding:'utf8'}).trim();
 const knownRemaining=grades.flatMap(g=>g.chapters).reduce((n,c)=>n+(c.missingTasks||0),0);
 return {schemaVersion:1,repository:'vigneswaranmba20-afk/Triggle',sourceCommit,updatedAt,inputHashes,policy:{scope:'Textbook exercises only. Runtime availability is separate from source/math verification, deployment and private teacher approval.',verifiedCounts:'Strict integrated bulk-engine validation. Inherited Grade 9 visual evidence and accepted Grade 10 Chapter 1 reference are shown separately, not added to strict totals.',denominators:'Whole-grade denominators remain unknown. Known gaps are lower bounds; never show them as whole-project totals.',teacherSummary:'Private teacher feedback is available through the Teacher Dashboard.'},summary:{verifiedDeployedTasks:grades.flatMap(g=>g.chapters).flatMap(c=>c.exercises).filter(e=>e.stages.deployed).reduce((n,e)=>n+e.verifiedTasks,0),knownRemainingTasks:knownRemaining,remainingIsLowerBound:true,blockers:grades.map(g=>({grade:g.grade,text:'Whole-grade textbook question/subpart denominator and Tamil editorial review pending.',evidence:`docs/curriculum/grade-${g.grade}/checkpoint.json`})),recommendedActions:pending.length},grades,actions:pending};
}
if(require.main===module){const out=path.join(ROOT,'site/data/project-status.json'),value=JSON.stringify(build(),null,2)+'\n';if(process.argv.includes('--check')){if(!fs.existsSync(out)||fs.readFileSync(out,'utf8')!==value)throw Error('Project status stale. Run npm run status:build and commit the generated projection.');console.log('PASS public project status matches validated repository sources');}else{fs.writeFileSync(out,value);console.log('Generated '+out);}}
module.exports={build};
