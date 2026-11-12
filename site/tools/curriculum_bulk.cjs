#!/usr/bin/env node
'use strict';
// Deterministic authoring/QA support. Extraction candidates never certify textbook coverage.
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const crypto=require('node:crypto'),cp=require('node:child_process');
const ROOT=path.resolve(__dirname,'../..');
const stable=value=>Array.isArray(value)?value.map(stable):value&&typeof value==='object'?Object.fromEntries(Object.keys(value).sort().map(k=>[k,stable(value[k])])):value;
const hashRecord=value=>crypto.createHash('sha256').update(JSON.stringify(stable(value))).digest('hex');
const readJson=file=>JSON.parse(fs.readFileSync(file,'utf8'));
const nonempty=value=>typeof value==='string'&&value.trim().length>0;
const same=(a,b)=>JSON.stringify(stable(a))===JSON.stringify(stable(b));
const pages=value=>Array.isArray(value)&&value.length>0&&value.every(p=>Number.isInteger(p)&&p>0);
const fileHash=file=>crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex');
const cachedAssets=sw=>new Set([...sw.matchAll(/[\"'](\.\/[^\"']+)[\"']/g)].map(m=>m[1]));
function inside(root,relative){
 if(!nonempty(relative)||path.isAbsolute(relative))throw Error('Expected repository-relative path: '+relative);
 const p=path.resolve(root,relative);if(!p.startsWith(path.resolve(root)+path.sep))throw Error('Path escapes repository: '+relative);return p;
}
function atomicJson(file,value){fs.mkdirSync(path.dirname(file),{recursive:true});const tmp=file+'.'+process.pid+'.'+crypto.randomBytes(4).toString('hex')+'.tmp';try{fs.writeFileSync(tmp,JSON.stringify(value,null,2)+'\n',{flag:'wx'});fs.renameSync(tmp,file);}finally{if(fs.existsSync(tmp))fs.unlinkSync(tmp);}}
function scripts(root=ROOT){
 const html=fs.readFileSync(path.join(root,'site/index.html'),'utf8');
 return [...html.matchAll(/<script\b[^>]*\bsrc=["'](?:\.\/)?([^"'?]+)(?:\?[^"']*)?["']/g)].map(m=>m[1]);
}
function loadRuntime(root=ROOT,{omit=[],trace=false}={}){
 const context=vm.createContext({window:{},console});const loaded=[],registrations=[];let previous=new Map();
 for(const file of scripts(root).filter(f=>f.startsWith('data/')&&f.endsWith('.js')&&!omit.includes(f))){
  vm.runInContext(fs.readFileSync(inside(path.join(root,'site'),file),'utf8'),context,{filename:file,timeout:5000});loaded.push(file);
  if(trace){
   const current=new Map();
   for(const [grade,value] of Object.entries(context.window.TRIGGLE_CLASSES||{}))for(const item of value.items||[]){
    const digest=hashRecord(JSON.parse(JSON.stringify(item)));current.set(item.id,digest);
    if(previous.get(item.id)!==digest)registrations.push({id:item.id,grade:Number(grade),module:file,change:previous.has(item.id)?'updated':'added',recordSha256:digest});
   }
   for(const id of previous.keys())if(!current.has(id))registrations.push({id,module:file,change:'removed'});
   previous=current;
  }
 }
 if(!context.window.TRIGGLE_CLASSES||!context.window.TRIGGLE_CURRICULUM)throw Error('Runtime data/curriculum was not registered');
 // JSON round trip removes VM prototypes and gives verifiers ordinary data, not live objects.
 return JSON.parse(JSON.stringify({classes:context.window.TRIGGLE_CLASSES,curriculum:context.window.TRIGGLE_CURRICULUM,loaded,...(trace?{registrations}:{})}));
}
function exerciseItem(item){return item.kind!=='practice'&&/^(?:Exercise|Unit Exercise)\b/i.test(item.label?.en||'');}
function chapterItems(runtime,grade,chapter){
 const c=runtime.curriculum.grades.find(g=>g.grade===grade)?.chapters.find(c=>String(c.number)===String(chapter));
 if(!c)return [];
 const ids=new Set([...(c.legacyQuestionIds||[]),...(c.textbookQuestionIds||[])]);
 return (runtime.classes[grade]?.items||[]).filter(item=>ids.has(item.id)||(grade===10&&Number(c.number)===1&&String(item.chapter)==='1'&&item.kind==='textbook'));
}
function validateBatch(batch,{root=ROOT,runtime,integrated=false,allowCorrections={}}={}){
 const errors=[],warnings=[],issues=[];const fail=(code,message,recordId)=>{errors.push(message);issues.push({code,message,...(recordId?{recordId}:{})});};
 const report={schemaVersion:1,batchId:batch.batchId??null,grade:batch.grade??null,chapter:batch.chapter??null,passed:false,errors,warnings,issues,metrics:{},coverage:{},mathematics:{checks:[]}};
 try{
 if(batch.schemaVersion!==1)fail('SCHEMA','batch.schemaVersion must be 1');
 if(!/^[a-z0-9][a-z0-9._-]*$/i.test(batch.batchId||''))fail('SCHEMA','Stable batchId is required');
 if(![9,10,11,12].includes(batch.grade))fail('SCHEMA','Grade must be 9, 10, 11 or 12');
 if(!/^\d+$/.test(batch.chapter||''))fail('SCHEMA','chapter must be the existing numeric string');
 const module=inside(path.join(root,'site'),batch.module);if(!/^data\/.+\.js$/.test(batch.module))fail('SCHEMA','Module must be a data/*.js path');
 runtime??=loadRuntime(root);
 const chapter=runtime.curriculum.grades.find(g=>g.grade===batch.grade)?.chapters.find(c=>String(c.number)===batch.chapter);
 if(!chapter)fail('CHAPTER','No matching chapter in runtime curriculum');
 const sources=new Map();
 for(const s of batch.sources||[]){
  if(!nonempty(s.id)||sources.has(s.id))fail('SOURCE','Source IDs must be unique');sources.set(s.id,s);
  if(s.grade!==batch.grade||!['en','ta'].includes(s.language)||!nonempty(s.title)||!nonempty(s.edition)||!/^https:\/\//.test(s.url||'')||!/^[a-f0-9]{64}$/.test(s.sha256||'')||s.verification!=='verified'||s.imprintVisualChecked!==true||!Number.isInteger(s.imprintPdfPage)||s.imprintPdfPage<1)fail('SOURCE','Source metadata/imprint/digest not verified: '+s.id);
 }
 const exercises=new Map(),tasks=new Map();let labelledParts=0;
 if(typeof batch.inventory?.completeChapter!=='boolean')fail('INVENTORY','inventory.completeChapter must be explicit');
 for(const ex of batch.inventory?.exercises||[]){
  if(!nonempty(ex.id)||exercises.has(ex.id))fail('INVENTORY','Exercise IDs must be unique');exercises.set(ex.id,ex);
  if(typeof ex.complete!=='boolean')fail('INVENTORY','Exercise complete must be explicit: '+ex.id);
  const nums=[];
  for(const q of ex.questions||[]){
   const key=ex.id+':'+q.number;nums.push(Number(q.number));
   if(tasks.has(key))fail('INVENTORY','Duplicate numbered source question '+key);
   if(!/^\d+$/.test(q.number||'')||!Array.isArray(q.parts)||(!q.parts.length&&q.status!=='blocked')||new Set(q.parts).size!==q.parts.length||q.parts.some(p=>!nonempty(p)))fail('INVENTORY','Explicit numbered question and task/subpart labels required: '+key);
   if(q.parts?.includes('whole')&&q.parts.length!==1)fail('INVENTORY','whole cannot be mixed with labelled subparts: '+key);
   if(q.parts&&!q.parts.includes('whole'))labelledParts+=q.parts.length;
   if(q.status!=='blocked'&&(!sources.has(q.sourceId)||sources.get(q.sourceId)?.language!=='en'||q.visualChecked!==true||!pages(q.printedPages)||!pages(q.pdfPages)))fail('SOURCE','Original English page-image evidence missing: '+key);
   if(!Array.isArray(q.requiredFigures)||!Array.isArray(q.tables)||!Array.isArray(q.graphs)||typeof q.mcq!=='boolean'||!Object.hasOwn(q,'answerKey'))fail('INVENTORY','Explicit figure/table/graph/MCQ/answer-key inventory required: '+key);
   if(q.answerKey!==null&&(!q.answerKey||typeof q.answerKey!=='object'||!nonempty(q.answerKey.text)||!sources.has(q.answerKey.sourceId)||!pages(q.answerKey.printedPages)||!pages(q.answerKey.pdfPages)||q.answerKey.visualChecked!==true))fail('SOURCE','Answer-key evidence not verified: '+key);
   if(q.status==='blocked'&&!nonempty(q.blockedReason))fail('INVENTORY','Blocked source item needs a reason: '+key);
   tasks.set(key,{...q,exercise:ex.id,mapped:new Set(),verified:new Set(),figures:new Set()});
  }
  if(!nums.length)fail('INVENTORY','Empty exercise inventory: '+ex.id);
  if(ex.complete&&nums.slice().sort((a,b)=>a-b).some((n,i)=>n!==i+1))fail('INVENTORY','Complete exercise must reconcile sequential numbered questions from 1: '+ex.id);
 }
 if(!tasks.size)fail('INVENTORY','No source questions inventoried');
 if(batch.inventory?.completeChapter){
  const expected=batch.inventory.chapterExerciseIds;
  if(batch.inventory.headingScanVerified!==true||!Array.isArray(expected)||!same([...expected].sort(),[...exercises.keys()].sort())||[...exercises.values()].some(e=>!e.complete))fail('INVENTORY','Chapter completion requires verified heading scan and every exercise');
 }
 const records=new Map(),allRuntime=new Map();
 for(const g of Object.values(runtime.classes))for(const item of g.items||[]){if(allRuntime.has(item.id))fail('DUPLICATE_ID','Runtime ID collision: '+item.id);allRuntime.set(item.id,item);}
 for(const r of batch.records||[]){
  if(!nonempty(r.id)||records.has(r.id))fail('DUPLICATE_ID','Duplicate/missing batch ID '+r.id);records.set(r.id,r);
  for(const f of ['id','chapter','exercise','answer','source','reference'])if(!nonempty(r[f]))fail('SCHEMA',r.id+' needs string '+f,r.id);
  if(r.classNum!==batch.grade||r.chapter!==batch.chapter||r.kind!=='textbook')fail('SCHEMA','Wrong grade/chapter/kind: '+r.id,r.id);
  for(const f of ['topic','label','title','q'])if(!nonempty(r[f]?.en))fail('SCHEMA',r.id+' needs '+f+'.en',r.id);
  if(!Array.isArray(r.steps)||r.steps.length<2||r.steps.some(s=>!nonempty(s.en)||('eq'in s&&typeof s.eq!=='string')))fail('MISSING_STEPS','At least two explained steps required: '+r.id,r.id);
  if(!r.q?.ta&&!/(?:English only|Tamil pending)/i.test(r.label?.ta||''))fail('TAMIL','English-only record needs a truthful Tamil pending label: '+r.id,r.id);
  if(r.q?.ta&&!nonempty(r.q.ta))fail('SCHEMA','Empty Tamil text: '+r.id,r.id);
  if(r.figureSrc){try{const f=inside(path.join(root,'site'),r.figureSrc.replace(/^\.\//,''));if(!fs.statSync(f).isFile())throw Error();}catch{fail('MISSING_FIGURE','Missing figure: '+r.figureSrc,r.id);}}
  if(allRuntime.has(r.id)&&!same(allRuntime.get(r.id),r)&&!(allowCorrections[r.id]===hashRecord(allRuntime.get(r.id))&&allRuntime.get(r.id).classNum===batch.grade&&allRuntime.get(r.id).chapter===batch.chapter&&!(batch.grade===10&&batch.chapter==='1')))fail('DUPLICATE_ID','Existing ID has different content; isolate a correction instead of overwriting: '+r.id,r.id);
 }
 if(!records.size)fail('SCHEMA','Empty batch');
 const mappings=new Map();
 for(const m of batch.mapping||[]){
  if(mappings.has(m.recordId))fail('MAPPING','Duplicate record mapping: '+m.recordId);mappings.set(m.recordId,m);
  const r=records.get(m.recordId),q=tasks.get(m.exercise+':'+m.question),s=sources.get(m.sourceId);
  if(!r||!q){fail('MAPPING','Mapping does not resolve: '+m.recordId,m.recordId);continue;}
  if(String(r.label?.en?.match(/(?:\bQ|Question\s+)(\d+)/i)?.[1])!==String(m.question))fail('MAPPING','Question label and numbered source mapping differ: '+r.id,r.id);
  if(m.exercise!==r.exercise||m.sourceId!==q.sourceId||s?.url!==r.source)fail('MAPPING','Record/source/exercise mismatch: '+r.id,r.id);
  if(q.status==='blocked')fail('BLOCKED','Blocked source question cannot be integrated: '+r.id,r.id);
  if(!Array.isArray(m.parts)||!m.parts.length||new Set(m.parts).size!==m.parts.length||m.parts.some(p=>!q.parts.includes(p)))fail('MAPPING','Unknown or missing source subpart: '+r.id,r.id);
  for(const p of m.parts||[]){if(q.mapped.has(p))fail('MAPPING','Subpart covered by multiple records: '+m.exercise+':'+m.question+':'+p,r.id);q.mapped.add(p);}
  if(m.sourceText?.en!==r.q?.en||m.visualChecked?.en!==true||!same(m.printedPages,q.printedPages)||!same(m.pdfPages,q.pdfPages))fail('WORDING','Exact English source wording/page evidence mismatch: '+r.id,r.id);
  if(r.q?.ta){
   const ts=sources.get(m.tamilSourceId);
   if(ts?.language!=='ta'||m.sourceText?.ta!==r.q.ta||m.visualChecked?.ta!==true||!pages(m.tamilPrintedPages)||!pages(m.tamilPdfPages)||r.steps.some(s=>!nonempty(s.ta)))fail('TAMIL','Tamil source wording/steps not verified: '+r.id,r.id);
  }
  if(r.figureSrc)q.figures.add(r.figureSrc);
  for(const table of q.tables||[]){const text=typeof table==='string'?table:table?.text;if(!nonempty(text)||!m.sourceText?.en?.includes(text))fail('TABLE','Source table content is absent from exact question: '+r.id,r.id);}
  for(const graph of q.graphs||[]){const figure=typeof graph==='string'?graph:graph?.figureSrc;if(!nonempty(figure)||!(q.requiredFigures||[]).includes(figure))fail('MISSING_FIGURE','Required graph needs an inventoried figure asset: '+r.id,r.id);}
 }
 for(const q of tasks.values())if(q.mapped.size)for(const figure of q.requiredFigures||[])if(!q.figures.has(figure))fail('MISSING_FIGURE','Compulsory figure not attached to question: '+q.exercise+':'+q.number+' → '+figure);
 for(const id of records.keys())if(!mappings.has(id))fail('MAPPING','No traceable source mapping: '+id,id);
 if(batch.tamilStatus!=='pending'&&batch.tamilStatus!=='source-verified')fail('TAMIL','Explicit tamilStatus pending/source-verified required');
 if(batch.tamilStatus==='source-verified'&&[...records.values()].some(r=>!r.q?.ta))fail('TAMIL','English-only batch cannot be marked Tamil source-verified');
 let math=[];
 if(!nonempty(batch.verification?.script))fail('MATH','Independent mathematical verifier is required');
 else{
  try{
   const verifierPath=inside(root,batch.verification.script);
   if(!verifierPath.endsWith('.cjs')||!fs.statSync(verifierPath).isFile())throw Error('Expected repository .cjs verifier');
   delete require.cache[require.resolve(verifierPath)];const verifier=require(verifierPath);
   if(typeof verifier!=='function')throw Error('Verifier must export a function');
   const result=verifier(JSON.parse(JSON.stringify({records:batch.records,mapping:batch.mapping,inventory:batch.inventory})),{hashRecord});
   if(result&&typeof result.then==='function')throw Error('Verifier must be synchronous');
   math=result?.checks;if(!Array.isArray(math)||!math.length)throw Error('No mathematical checks returned');
   for(const check of math){
    const r=records.get(check.recordId),m=mappings.get(check.recordId);
    if(!r||!m||check.passed!==true||!nonempty(check.method)||check.recordSha256!==hashRecord(r)||!Array.isArray(check.parts)||!check.parts.length||check.parts.some(p=>!m.parts.includes(p))){fail('MATH','Invalid, failed or stale math evidence: '+check.recordId,check.recordId);continue;}
    const q=tasks.get(m.exercise+':'+m.question);for(const p of check.parts)q.verified.add(p);
   }
   report.mathematics={script:batch.verification.script,verifierSha256:crypto.createHash('sha256').update(fs.readFileSync(verifierPath)).digest('hex'),checks:math};
  }catch(e){fail('MATH','Mathematical verifier failed: '+e.message);}
 }
 for(const [id,m] of mappings){const q=tasks.get(m.exercise+':'+m.question);if(q&&m.parts?.some(p=>!q.verified.has(p)))fail('MATH','Unchecked mathematical subpart: '+id,id);}
 const missing=[],blocked=[];
 for(const [key,q] of tasks){if(q.status==='blocked')blocked.push({question:key,reason:q.blockedReason});for(const p of q.parts||[])if(!q.mapped.has(p))missing.push(key+':'+p);}
 const exerciseCoverage=[...exercises.values()].map(ex=>({exercise:ex.id,inventoryVerified:ex.complete,numberedQuestions:ex.questions.length,complete:ex.complete&&ex.questions.every(q=>q.parts.every(p=>tasks.get(ex.id+':'+q.number).verified.has(p)))}));
 report.coverage={inventoryCompleteChapter:batch.inventory?.completeChapter===true,exercises:exerciseCoverage,missing,blocked,chapterComplete:batch.inventory?.completeChapter===true&&exerciseCoverage.every(e=>e.complete)&&!errors.length};
 report.metrics={numberedQuestions:tasks.size,labelledSubparts:labelledParts,sourceTasks:[...tasks.values()].reduce((n,q)=>n+(q.parts?.length||0),0),appRecords:records.size,newAppRecords:[...records.keys()].filter(id=>!allRuntime.has(id)).length,sourceVerifiedNumberedQuestions:[...tasks.values()].filter(q=>q.status!=='blocked').length,verifiedNumberedQuestions:[...tasks.values()].filter(q=>q.status!=='blocked'&&q.parts.every(p=>q.verified.has(p))).length,mathematicallyVerifiedRecords:[...records.keys()].filter(id=>{const m=mappings.get(id),q=m&&tasks.get(m.exercise+':'+m.question);return m&&q&&m.parts.every(p=>q.verified.has(p));}).length,solvedSubparts:[...tasks.values()].reduce((n,q)=>n+q.verified.size,0),englishSourceVerifiedRecords:[...records.values()].filter(r=>mappings.get(r.id)?.sourceText?.en===r.q?.en&&mappings.get(r.id)?.visualChecked?.en===true).length,tamilSourceVerifiedRecords:[...records.values()].filter(r=>r.q?.ta&&mappings.get(r.id)?.sourceText?.ta===r.q.ta&&mappings.get(r.id)?.visualChecked?.ta===true).length};
 for(const ex of exercises.values())if(ex.complete&&ex.questions.some(q=>q.status==='blocked'||q.parts.some(p=>!tasks.get(ex.id+':'+q.number).verified.has(p))))fail('RECONCILIATION','Exercise declared complete has missing/unverified tasks: '+ex.id);
 if(missing.length)warnings.push(missing.length+' source tasks remain unproduced; this chapter/exercise is not complete');
 if(integrated){
  const listed=scripts(root),sw=fs.readFileSync(path.join(root,'site/service-worker.js'),'utf8'),cached=cachedAssets(sw);
  if(!listed.includes(batch.module)||listed.indexOf(batch.module)<=listed.indexOf('data/curriculum.js')||listed.indexOf(batch.module)>=listed.indexOf('assets/app.js'))fail('INTEGRATION','Module must load after curriculum and before app');
  if(!fs.existsSync(module))fail('INTEGRATION','Generated module is absent');
  if(!cached.has('./'+batch.module))fail('OFFLINE','Module missing from offline assets');
  const visible=new Set(chapterItems(runtime,batch.grade,batch.chapter).map(r=>r.id));
  for(const r of records.values()){
   if(!visible.has(r.id)||!same(allRuntime.get(r.id),r))fail('NAVIGATION','Question absent or stale in chapter navigation: '+r.id,r.id);
   if(r.figureSrc&&!cached.has('./'+r.figureSrc.replace(/^\.\//,'')))fail('OFFLINE','Figure missing from offline assets: '+r.figureSrc,r.id);
  }
 }
 }catch(e){fail('INVALID_BATCH',e.message);}
 report.passed=!errors.length;if(report.coverage.chapterComplete&&!report.passed)report.coverage.chapterComplete=false;return report;
}
function generateModule(batch){
 const data=JSON.stringify(batch.records,null,2).replace(/</g,'\\u003c');
 return `/* Generated by curriculum_bulk.cjs from ${batch.batchId}; edit its batch manifest. */\n(()=>{'use strict';\nconst grade=window.TRIGGLE_CLASSES?.[${batch.grade}];\nconst chapter=window.TRIGGLE_CURRICULUM?.grades?.find(g=>g.grade===${batch.grade})?.chapters?.find(c=>String(c.number)===${JSON.stringify(batch.chapter)});\nif(!grade||!chapter)throw Error('Bulk content dependencies missing: ${batch.batchId}');\nconst entries=${data};\nconst stable=v=>Array.isArray(v)?v.map(stable):v&&typeof v==='object'?Object.fromEntries(Object.keys(v).sort().map(k=>[k,stable(v[k])])):v;\nconst same=(a,b)=>JSON.stringify(stable(a))===JSON.stringify(stable(b));\nconst ids=new Set(Object.values(window.TRIGGLE_CLASSES).flatMap(g=>g.items.map(q=>q.id)));\nchapter.textbookQuestionIds=chapter.textbookQuestionIds||[];\nconst pending=new Set();\nfor(const item of entries){const existing=grade.items.find(q=>q.id===item.id);if(pending.has(item.id)||(ids.has(item.id)&&(!existing||!same(existing,item))))throw Error('Duplicate bulk ID '+item.id);pending.add(item.id);}\nfor(const item of entries){if(!ids.has(item.id)){grade.items.push(item);ids.add(item.id);}if(!chapter.textbookQuestionIds.includes(item.id))chapter.textbookQuestionIds.push(item.id);}\n})();\n`;
}
function commonGitDir(root=ROOT){
 let git=path.join(root,'.git');if(fs.statSync(git).isFile()){const match=fs.readFileSync(git,'utf8').match(/^gitdir:\s*(.+)\s*$/m);if(!match)throw Error('Invalid git worktree pointer');git=path.resolve(root,match[1]);}
 const common=path.join(git,'commondir');return fs.existsSync(common)?path.resolve(git,fs.readFileSync(common,'utf8').trim()):git;
}
function withLock(name,fn,{root=ROOT}={}){
 if(!/^(?:grade-(?:9|10|11|12)|integration)$/.test(name))throw Error('Invalid lock scope');
 const dir=path.join(commonGitDir(root),'triggle-bulk-locks'),file=path.join(dir,name+'.lock');fs.mkdirSync(dir,{recursive:true});
 const inherited=JSON.parse(process.env.TRIGGLE_BULK_LOCK_TOKENS||'{}');
 if(inherited[file]&&fs.existsSync(file)&&readJson(file).token===inherited[file])return fn();
 const token=crypto.randomBytes(16).toString('hex');let handle;
 try{handle=fs.openSync(file,'wx');fs.writeFileSync(handle,JSON.stringify({pid:process.pid,hostname:require('node:os').hostname(),token,startedAt:new Date().toISOString(),worktree:root}));}
 catch(e){if(e.code==='EEXIST')throw Error('Another '+name+' run holds '+file+'; inspect its owner before manual recovery');throw e;}
 const previous=process.env.TRIGGLE_BULK_LOCK_TOKENS;process.env.TRIGGLE_BULK_LOCK_TOKENS=JSON.stringify({...inherited,[file]:token});
 try{return fn();}finally{if(previous===undefined)delete process.env.TRIGGLE_BULK_LOCK_TOKENS;else process.env.TRIGGLE_BULK_LOCK_TOKENS=previous;if(handle!==undefined)fs.closeSync(handle);try{if(readJson(file).token===token)fs.unlinkSync(file);}catch{}}
}
function registerBatch(batch,{root=ROOT,expectedModuleSha}={}){
 return withLock('grade-'+batch.grade,()=>withLock('integration',()=>{
  const module=inside(path.join(root,'site'),batch.module),body=generateModule(batch),allowCorrections={};
  if(expectedModuleSha){
   if(batch.grade===10&&batch.chapter==='1')throw Error('Grade 10 Chapter 1 is preserved and cannot be corrected by this engine');
   if(!/^[a-f0-9]{64}$/.test(expectedModuleSha)||!fs.existsSync(module)||fileHash(module)!==expectedModuleSha)throw Error('Previous module SHA-256 guard mismatch');
   const full=loadRuntime(root),without=loadRuntime(root,{omit:[batch.module]}),otherIds=new Set(Object.values(without.classes).flatMap(g=>g.items.map(r=>r.id)));
   const owned=Object.values(full.classes).flatMap(g=>g.items).filter(r=>!otherIds.has(r.id));
   if(!same(owned.map(r=>r.id).sort(),batch.records.map(r=>r.id).sort()))throw Error('Correction must preserve exactly every ID owned by its existing module');
   for(const old of owned){if(old.classNum!==batch.grade||old.chapter!==batch.chapter||(batch.records.find(r=>r.id===old.id)?.exercise!==old.exercise||batch.records.find(r=>r.id===old.id)?.label?.en!==old.label?.en))throw Error('Correction crossed grade/chapter boundary');allowCorrections[old.id]=hashRecord(old);}
  }
  assertNoManifestConflict(batch,{root});
  const report=validateBatch(batch,{root,allowCorrections});if(!report.passed)throw Error('Batch gate failed:\n'+report.errors.join('\n'));
  const changed=fs.existsSync(module)&&fs.readFileSync(module,'utf8')!==body;
  if(changed&&!expectedModuleSha)throw Error('Refusing to replace different module: '+batch.module);
  const htmlFile=path.join(root,'site/index.html'),swFile=path.join(root,'site/service-worker.js');let html=fs.readFileSync(htmlFile,'utf8'),sw=fs.readFileSync(swFile,'utf8');
  const listed=scripts(root),version=hashRecord(batch.records).slice(0,12);
  if(!listed.includes(batch.module)){
   const app=/<script\b[^>]*src=["']\.\/assets\/app\.js[^"']*["'][^>]*><\/script>/;
   if(!app.test(html))throw Error('App script anchor unavailable');
   html=html.replace(app,`<script src="./${batch.module}?v=${version}"></script>$&`);
  }
  const assets=[batch.module,...batch.records.map(r=>r.figureSrc).filter(Boolean).map(f=>f.replace(/^\.\//,''))];
  const cached=cachedAssets(sw);const missing=[...new Set(assets)].filter(a=>!cached.has('./'+a));
  if(missing.length){
   const anchor="self.addEventListener('install'";if(!sw.includes(anchor))throw Error('Service-worker install anchor unavailable');
   sw=sw.replace(anchor,`CORE.push(${missing.map(a=>JSON.stringify('./'+a)).join(',')});\n`+anchor);
  }
  if(missing.length||changed){const cache=sw.match(/const CACHE='([^']+)';/);if(!cache)throw Error('Cache version anchor unavailable');sw=sw.replace(cache[0],`const CACHE='${cache[1].replace(/-bulk-[a-f0-9]{12}$/, '')}-bulk-${version}';`);}
  // Validate all replacement data before mutation and roll back if runtime registration fails.
  const backups=new Map([[module,fs.existsSync(module)?fs.readFileSync(module):null],[htmlFile,fs.readFileSync(htmlFile)],[swFile,fs.readFileSync(swFile)]]);
  try{fs.mkdirSync(path.dirname(module),{recursive:true});fs.writeFileSync(module,body);fs.writeFileSync(htmlFile,html);fs.writeFileSync(swFile,sw);const post=validateBatch(batch,{root,integrated:true});if(!post.passed)throw Error(post.errors.join('\n'));post.metrics.newAppRecords=report.metrics.newAppRecords;if(expectedModuleSha)post.correction={previousModuleSha256:expectedModuleSha,affectedRecordIds:batch.records.filter(r=>allowCorrections[r.id]!==hashRecord(r)).map(r=>r.id)};return post;}
  catch(e){for(const [file,old] of backups){if(old===null){if(fs.existsSync(file))fs.unlinkSync(file);}else fs.writeFileSync(file,old);}throw e;}
 },{root}),{root});
}
function batchFiles(root=ROOT,grade){
 const dir=path.join(root,'docs/curriculum',`grade-${grade}`,'batches');if(!fs.existsSync(dir))return [];
 return fs.readdirSync(dir).filter(f=>f.endsWith('.json')).sort().map(f=>path.join(dir,f));
}
function sourceTaskKey(batch,m,part){
 const source=batch.sources?.find(s=>s.id===m.sourceId);return [batch.grade,batch.chapter,source?.sha256||source?.url,m.exercise,m.question,part].join('|');
}
function assertNoManifestConflict(batch,{root=ROOT}={}){
 const own=new Set((batch.mapping||[]).flatMap(m=>(m.parts||[]).map(p=>sourceTaskKey(batch,m,p))));
 for(const file of batchFiles(root,batch.grade)){
  const peer=readJson(file);if(peer.batchId===batch.batchId&&peer.module===batch.module)continue;
  if(peer.batchId===batch.batchId||peer.module===batch.module)throw Error('Batch ID/module already belongs to another manifest: '+path.relative(root,file));
  for(const m of peer.mapping||[])for(const part of m.parts||[])if(own.has(sourceTaskKey(peer,m,part)))throw Error('Source task already claimed by '+peer.batchId+': '+m.exercise+' Q'+m.question+' '+part);
 }
}
function collectBatches(root,grade,runtime){
 const entries=batchFiles(root,grade).map(file=>{const batch=readJson(file);return {file:path.relative(root,file),batch,report:validateBatch(batch,{root,runtime,integrated:true})};});
 const keys=new Map(),batchIds=new Map(),modules=new Map();
 const conflict=(entry,message)=>{entry.report.passed=false;entry.report.errors.push(message);entry.report.issues.push({code:'DUPLICATE_MAPPING',message});entry.report.coverage.chapterComplete=false;};
 for(const entry of entries){
  if(entry.batch.grade!==grade)conflict(entry,'Manifest grade differs from its per-grade folder');
  if(modules.has(entry.batch.module)){conflict(entry,'Module owned by multiple manifests: '+entry.batch.module);conflict(modules.get(entry.batch.module),'Module owned by multiple manifests: '+entry.batch.module);}else modules.set(entry.batch.module,entry);
  if(batchIds.has(entry.batch.batchId)){conflict(entry,'Duplicate batch ID '+entry.batch.batchId);conflict(batchIds.get(entry.batch.batchId),'Duplicate batch ID '+entry.batch.batchId);}else batchIds.set(entry.batch.batchId,entry);
  for(const m of entry.batch.mapping||[]){const source=entry.batch.sources?.find(s=>s.id===m.sourceId);for(const part of m.parts||[]){const key=sourceTaskKey(entry.batch,m,part);if(keys.has(key)){const previous=keys.get(key);conflict(entry,'Source task mapped by multiple manifests: '+key);conflict(previous,'Source task mapped by multiple manifests: '+key);}else keys.set(key,entry);}}
 }
 return entries;
}
function chapterInventoryFiles(root,grade){
 const dir=path.join(root,'docs/curriculum',`grade-${grade}`,'chapters');return fs.existsSync(dir)?fs.readdirSync(dir).filter(f=>f.endsWith('.json')).sort().map(f=>path.join(dir,f)):[];
}
function validateChapterInventory(doc,{root=ROOT,runtime,grade}={}){
 const errors=[],fail=message=>errors.push(message),sources=new Map((doc.sources||[]).map(s=>[s.id,s]));if(sources.size!==(doc.sources||[]).length)fail('Duplicate chapter source ID');
 if(doc.schemaVersion!==1||![9,10,11,12].includes(doc.grade)||doc.grade!==(grade||doc.grade)||typeof doc.chapter!=='string')fail('Invalid chapter inventory identity');
 runtime??=loadRuntime(root);if(!runtime.curriculum.grades.find(g=>g.grade===doc.grade)?.chapters.find(c=>String(c.number)===doc.chapter))fail('Unknown curriculum chapter');
 for(const s of doc.sources||[])if(s.grade!==doc.grade||!['en','ta'].includes(s.language)||!nonempty(s.title)||!nonempty(s.edition)||!/^https:\/\//.test(s.url||'')||!/^[a-f0-9]{64}$/.test(s.sha256||'')||s.verification!=='verified'||s.imprintVisualChecked!==true||!Number.isInteger(s.imprintPdfPage)||s.imprintPdfPage<1)fail('Unverified source '+s.id);
 const inv=doc.inventory,exerciseIds=[],questionKeys=new Set(),tasks=[];
 if(inv?.completeChapter!==true||inv?.headingScanVerified!==true||!Array.isArray(inv?.chapterExerciseIds)||!inv.chapterExerciseIds.length)fail('Full chapter heading scan is not verified');
 for(const ex of inv?.exercises||[]){
  exerciseIds.push(ex.id);if(!nonempty(ex.id)||ex.complete!==true||!Array.isArray(ex.questions)||!ex.questions.length)fail('Incomplete exercise inventory '+ex.id);
  const nums=[];for(const q of ex.questions||[]){
   const key=ex.id+':'+q.number;nums.push(Number(q.number));if(questionKeys.has(key))fail('Duplicate question '+key);questionKeys.add(key);
   if(typeof q.number!=='string'||!/^\d+$/.test(q.number)||!Array.isArray(q.parts)||!q.parts.length||q.parts.some(p=>!nonempty(p))||new Set(q.parts).size!==q.parts.length||(q.parts.includes('whole')&&q.parts.length!==1))fail('Incomplete task inventory '+key);
   const source=sources.get(q.sourceId);if(source?.language!=='en'||q.status==='blocked'||q.visualChecked!==true||!pages(q.printedPages)||!pages(q.pdfPages))fail('Unverified original page '+key);
   if(!Array.isArray(q.requiredFigures)||!Array.isArray(q.tables)||!Array.isArray(q.graphs)||typeof q.mcq!=='boolean'||!Object.hasOwn(q,'answerKey'))fail('Missing visual/MCQ/answer-key inventory '+key);
   if(q.answerKey!==null&&(!q.answerKey||!nonempty(q.answerKey.text)||!sources.has(q.answerKey.sourceId)||!pages(q.answerKey.printedPages)||!pages(q.answerKey.pdfPages)||q.answerKey.visualChecked!==true))fail('Unverified answer key '+key);
   for(const part of q.parts||[])tasks.push({key:sourceTaskKey(doc,{sourceId:q.sourceId,exercise:ex.id,question:q.number},part),question:key,part});
  }
  if(nums.sort((a,b)=>a-b).some((n,i)=>n!==i+1))fail('Numbered-question gap '+ex.id);
 }
 if(new Set(exerciseIds).size!==exerciseIds.length||!same([...exerciseIds].sort(),[...(inv?.chapterExerciseIds||[])].sort()))fail('Exercise headings do not reconcile');
 return {schemaVersion:1,grade:doc.grade,chapter:doc.chapter,passed:!errors.length,errors,numberedQuestions:questionKeys.size,sourceTasks:tasks.length,tasks};
}
function reconcileChapter(doc,entries,options){
 const checked=validateChapterInventory(doc,options);if(!checked.passed)return {...checked,complete:false,completionPercent:null};
 const actual=new Set();for(const entry of entries.filter(e=>e.report.passed&&e.batch.chapter===doc.chapter))for(const m of entry.batch.mapping)for(const part of m.parts)actual.add(sourceTaskKey(entry.batch,m,part));
 const expected=new Set(checked.tasks.map(t=>t.key)),missing=checked.tasks.filter(t=>!actual.has(t.key)),unexpected=[...actual].filter(key=>!expected.has(key));
 if(unexpected.length)checked.errors.push('Produced tasks do not match authoritative chapter inventory: '+unexpected.join(', '));
 const questions=new Set(checked.tasks.map(t=>t.question)),completeQuestions=[...questions].filter(q=>checked.tasks.filter(t=>t.question===q).every(t=>actual.has(t.key))).length;
 return {...checked,passed:!checked.errors.length,verifiedNumberedQuestions:completeQuestions,missingSourceTasks:missing.map(t=>t.question+':'+t.part),unexpectedSourceTasks:unexpected,complete:!missing.length&&!unexpected.length,completionPercent:Math.round(10000*completeQuestions/checked.numberedQuestions)/100};
}
function validateAll({root=ROOT,grade}={}){
 const runtime=loadRuntime(root),graded=(grade?[grade]:[9,10,11,12]).map(g=>({grade:g,entries:collectBatches(root,g,runtime)})),reports=graded.flatMap(g=>g.entries.map(({file,report})=>({file,...report})));
 const seen=new Map(),chapterInventories=graded.flatMap(g=>chapterInventoryFiles(root,g.grade).map(file=>{const doc=readJson(file),result={file:path.relative(root,file),...reconcileChapter(doc,g.entries,{root,runtime,grade:g.grade})},key=g.grade+':'+doc.chapter;if(seen.has(key)){result.passed=false;result.errors.push('Multiple authoritative chapter inventories');seen.get(key).passed=false;seen.get(key).errors.push('Multiple authoritative chapter inventories');}else seen.set(key,result);return result;}));
 return {schemaVersion:1,passed:reports.every(r=>r.passed)&&chapterInventories.every(r=>r.passed),batchCount:reports.length,reports,chapterInventories};
}
function inventory({root=ROOT,grade}={}){
 const runtime=loadRuntime(root),grades=grade?[grade]:[9,10,11,12];const output={schemaVersion:1,grades:[],warnings:[]};
 for(const n of grades){
  const reports=collectBatches(root,n,runtime),chapterInventories=chapterInventoryFiles(root,n).map(file=>({file:path.relative(root,file),doc:readJson(file)}));
  const chapters=runtime.curriculum.grades.find(g=>g.grade===n).chapters.map(c=>{
   const visible=chapterItems(runtime,n,c.number),app=visible.filter(exerciseItem),related=reports.filter(b=>b.batch.chapter===String(c.number)),valid=related.filter(b=>b.report.passed),ids=new Set(valid.flatMap(b=>b.batch.records.map(r=>r.id)));
   const taskKeys=new Set(),numberKeys=new Set();for(const b of valid)for(const ex of b.batch.inventory.exercises)for(const q of ex.questions){if(q.status==='blocked')continue;numberKeys.add(ex.id+':'+q.number);for(const p of q.parts)taskKeys.add(ex.id+':'+q.number+':'+p);}
   const singleComplete=valid.find(b=>b.report.coverage.chapterComplete),authoritative=chapterInventories.filter(i=>i.doc.chapter===String(c.number));
   const reconciliation=authoritative.length===1?{file:authoritative[0].file,...reconcileChapter(authoritative[0].doc,reports,{root,runtime,grade:n})}:authoritative.length>1?{passed:false,errors:['Multiple authoritative chapter inventories'],complete:false,completionPercent:null}:null;
   const complete=authoritative.length?reconciliation?.passed&&reconciliation.complete:!!singleComplete,denominator=authoritative.length?(reconciliation?.passed?reconciliation.numberedQuestions:null):singleComplete?singleComplete.report.metrics.numberedQuestions:null;
   return {chapter:String(c.number),chapterId:c.id,title:c.title||c.name,appRecords:app.length,exerciseAppRecords:app.length,totalAppRecords:(runtime.classes[n]?.items||[]).filter(r=>String(r.chapter)===String(c.number)).length,registeredItems:visible.length,sourceVerifiedNumberedQuestions:numberKeys.size,sourceVerifiedTasks:taskKeys.size,mathematicallyVerifiedRecords:ids.size,englishCoverage:{verifiedRecords:ids.size},tamilCoverage:{status:'pending',sourceVerifiedRecords:new Set(valid.flatMap(b=>b.batch.records.filter(r=>r.q?.ta).map(r=>r.id))).size},verifiedTextbookDenominator:denominator,completionPercent:authoritative.length?(reconciliation?.passed?reconciliation.completionPercent:null):singleComplete?100:null,complete:!!complete,chapterReconciliation:reconciliation,batches:related.map(b=>({file:b.file,batchId:b.batch.batchId,passed:b.report.passed,errors:b.report.errors})),blockers:related.flatMap(b=>b.report.coverage.blocked||[]),missingSourceTasks:related.flatMap(b=>b.report.coverage.missing||[])};
  });
  output.grades.push({grade:n,chapters,appRecords:runtime.classes[n].items.length,totalAppRecords:runtime.classes[n].items.length,exerciseAppRecords:chapters.reduce((a,c)=>a+c.appRecords,0),newEngineVerifiedRecords:chapters.reduce((a,c)=>a+c.mathematicallyVerifiedRecords,0)});
 }
 return output;
}
function extractCandidates(text){
 const lines=text.split(/\r?\n/);const exercises=[];let active=null,current=null;
 for(let i=0;i<lines.length;i++){
  const line=lines[i].trim(),heading=line.match(/\b((?:UNIT\s+)?EXERCISE)\s+(\d+(?:\.\d+)?)/i);
  if(heading){active={id:/unit/i.test(heading[1])?heading[2]+'.unit':heading[2],line:i+1,questions:[]};exercises.push(active);current=null;continue;}
  if(!active)continue;
  const number=line.match(/^(\d+)\s*[.)]\s+(.*)/);if(number){current={number:number[1],line:i+1,text:line,parts:[],figureMarkers:[],tableMarkers:[],graphMarkers:[],mcqMarkers:[]};active.questions.push(current);}
  else if(current&&line)current.text+='\n'+line;
  if(current){for(const m of line.matchAll(/\(([ivxlcdm]+|[a-z])\)/gi))if(!current.parts.includes(m[1]))current.parts.push(m[1]);if(/\bfig(?:ure)?\b/i.test(line))current.figureMarkers.push(i+1);if(/\btable\b/i.test(line))current.tableMarkers.push(i+1);if(/\bgraph\b/i.test(line))current.graphMarkers.push(i+1);if(/\([A-D]\)/.test(line))current.mcqMarkers.push(i+1);}
 }
 return {schemaVersion:1,status:'CANDIDATES_ONLY',note:'Text-layer parsing is a worklist aid. Check original PDF images, heading boundaries, subparts, tables, figures and answer key; do not use these counts as verified denominators.',exercises};
}
function checkpoint(grade,{root=ROOT}={}){
 if(![9,10,11,12].includes(grade))throw Error('Grade is required');
 return withLock('grade-'+grade,()=>{
  const next=inventory({root,grade}),file=path.join(root,'docs/curriculum',`grade-${grade}`,'checkpoint.json');
  // Preserve operator/release facts; deterministic inventory cannot certify a PR or deployment.
  const old=fs.existsSync(file)?readJson(file):{};
  const value={...old,schemaVersion:1,grade,inventory:next.grades[0]};atomicJson(file,value);return value;
 },{root});
}
function main(args){
 const command=args.shift(),opts={},pos=[];
 if(command==='--help'||command==='help'||!command){process.stdout.write('Usage: curriculum_bulk.cjs inventory [--grade N] | extract --text FILE | validate BATCH [--integrated] [--report FILE] | validate-all | register BATCH | correct BATCH --expected-module-sha HEX | checkpoint --grade N | lock --grade N -- COMMAND [ARGS] | acquire-lease --grade N [--report FILE] | release-lease --grade N --expected-sha SHA | lease --grade N -- COMMAND [ARGS]\n');return;}for(let i=0;i<args.length;i++){if(args[i]==='--'){pos.push(...args.slice(i+1));break;}if(args[i].startsWith('--'))opts[args[i].slice(2)]=args[i+1]&&!args[i+1].startsWith('--')?args[++i]:true;else pos.push(args[i]);}
 const root=opts.root?path.resolve(opts.root):ROOT;let result;
 if(command==='inventory')result=inventory({root,grade:opts.grade?Number(opts.grade):undefined});
 else if(command==='extract'){const text=fs.readFileSync(path.resolve(opts.text||pos[0]),'utf8');result=extractCandidates(text);}
 else if(command==='validate-all'){result=validateAll({root,grade:opts.grade?Number(opts.grade):undefined});if(!result.passed)process.exitCode=1;}
 else if(command==='validate'||command==='register'||command==='correct'){if(command==='correct'&&!opts['expected-module-sha'])throw Error('correct requires --expected-module-sha');const batch=readJson(path.resolve(pos[0]));result=command!=='validate'?registerBatch(batch,{root,expectedModuleSha:command==='correct'?opts['expected-module-sha']:undefined}):validateBatch(batch,{root,integrated:!!opts.integrated});if(!result.passed)process.exitCode=1;}
 else if(command==='checkpoint')result=checkpoint(Number(opts.grade),{root});
 else if(command==='acquire-lease'||command==='release-lease'){const leases=require('./bulk/remote_lease.cjs'),scope=opts.integration?'integration':'grade-'+Number(opts.grade);result=command==='acquire-lease'?leases.acquireRemoteLease(scope,{root,remote:opts.remote||'origin'}):leases.releaseRemoteLease(scope,{root,remote:opts.remote||'origin',expectedSha:opts['expected-sha']});}
 else if(command==='lease'){const leases=require('./bulk/remote_lease.cjs'),scope=opts.integration?'integration':'grade-'+Number(opts.grade);if(!pos.length)throw Error('lease needs -- COMMAND [ARGS]');withLock(scope,()=>leases.withRemoteLease(scope,()=>{const child=cp.spawnSync(pos[0],pos.slice(1),{cwd:root,stdio:'inherit'});if(child.error)throw child.error;process.exitCode=child.status??1;},{root,remote:opts.remote||'origin'}),{root});return;}
 else if(command==='lock'){
  const name=opts.integration?'integration':'grade-'+Number(opts.grade);if(!pos.length)throw Error('lock needs -- COMMAND [ARGS]');
  withLock(name,()=>{const child=cp.spawnSync(pos[0],pos.slice(1),{cwd:root,stdio:'inherit'});if(child.error)throw child.error;process.exitCode=child.status??1;},{root});return;
 }
 else throw Error('Unknown command. Run curriculum_bulk.cjs --help');
 if(opts.report)atomicJson(path.resolve(opts.report),result);else process.stdout.write(JSON.stringify(result,null,2)+'\n');
}
module.exports={ROOT,stable,hashRecord,loadRuntime,exerciseItem,chapterItems,validateBatch,generateModule,registerBatch,validateAll,validateChapterInventory,reconcileChapter,inventory,extractCandidates,withLock,checkpoint,atomicJson};
if(require.main===module)try{main(process.argv.slice(2));}catch(e){console.error('BLOCKED: '+e.message);process.exitCode=1;}
