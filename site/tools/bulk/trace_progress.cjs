#!/usr/bin/env node
'use strict';
const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto');
const {ROOT,atomicJson}=require('../curriculum_bulk.cjs');
function summarize(manifest,{root=ROOT}={}){
 if(manifest.schemaVersion!==1||manifest.measure!=='equal-weight-required-milestones-not-curriculum-or-effort'||manifest.requiredMilestones!==20||!Array.isArray(manifest.milestones)||manifest.milestones.length!==20)throw Error('INVALID_PROGRESS_DENOMINATOR');
 const ids=new Set(),categories={};
 for(const m of manifest.milestones){
  if(!m.id||ids.has(m.id)||!m.acceptance||!m.category||!['complete','partial','blocked','not-started'].includes(m.status))throw Error('INVALID_OR_DUPLICATE_MILESTONE');ids.add(m.id);
  if(m.status==='complete'&&(!Array.isArray(m.evidence)||!m.evidence.length))throw Error('COMPLETION_WITHOUT_EVIDENCE');
  for(const e of m.evidence||[]){
   if(e.file){const f=path.resolve(root,e.file);if(!f.startsWith(path.resolve(root)+path.sep)||!fs.existsSync(f))throw Error('MISSING_OR_UNSAFE_EVIDENCE');if(e.sha256&&crypto.createHash('sha256').update(fs.readFileSync(f)).digest('hex')!==e.sha256)throw Error('STALE_PROGRESS_EVIDENCE');}
   else if(!/^https:\/\/github\.com\/vigneswaranmba20-afk\/Triggle\//.test(e.url||''))throw Error('INVALID_PROGRESS_EVIDENCE');
  }
  const c=categories[m.category]??={total:0,complete:0,partial:0,blocked:0,notStarted:0};c.total++;if(m.status==='complete')c.complete++;else if(m.status==='not-started')c.notStarted++;else c[m.status]++;
 }
 if(!Array.isArray(manifest.baselineCompletedIds)||manifest.baselineCompletedIds.length!==8||new Set(manifest.baselineCompletedIds).size!==8||manifest.baselineCompletedIds.some(id=>!ids.has(id)||manifest.milestones.find(m=>m.id===id).status!=='complete')||!ids.has('pilot-real'))throw Error('INVALID_PROGRESS_BASELINE');
 const completed=manifest.milestones.filter(m=>m.status==='complete').length;
 for(const c of Object.values(categories))c.percentComplete=Math.round(10000*c.complete/c.total)/100;
 return {schemaVersion:1,measure:manifest.measure,completedMilestones:completed,totalMilestones:20,percentComplete:100*completed/20,
  baselineCompletedMilestones:manifest.baselineCompletedIds.length,baselinePercentComplete:100*manifest.baselineCompletedIds.length/20,
  categories,curriculumPercent:null,curriculumDenominator:'unknown',pilotRealPercent:manifest.milestones.find(m=>m.id==='pilot-real').status==='complete'?100:0,
  note:'Counts completed acceptance milestones equally. It does not estimate effort, all-grade question coverage, exam readiness or Tamil certification. Partial milestones receive no completion credit.',
  incomplete:manifest.milestones.filter(m=>m.status!=='complete').map(({id,status,acceptance,blocker})=>({id,status,acceptance,blocker:blocker??null})),conditional:manifest.conditional};
}
function markdown(m,r){return '# TRACE task-checklist progress\n\n'+`**${r.percentComplete}% (${r.completedMilestones}/${r.totalMilestones})** of the fixed milestone checklist; baseline ${r.baselinePercentComplete}% (${r.baselineCompletedMilestones}/20).\n\n`+r.note+'\n\nWhole Grades 9–12 curriculum coverage: **unknown**. Real pilot completion: **'+r.pilotRealPercent+'%**.\n\n| Milestone | State | Acceptance |\n|---|---|---|\n'+m.milestones.map(x=>`| ${x.id} | ${x.status} | ${x.acceptance} |`).join('\n')+'\n';}
function main(args){let file=path.join(ROOT,'docs/trace/task-checklist.json'),out;for(let i=0;i<args.length;i++){if(args[i]==='--manifest'&&args[i+1])file=path.resolve(args[++i]);else if(args[i]==='--report'&&args[i+1])out=path.resolve(args[++i]);else throw Error('INVALID_ARGUMENT');}const m=JSON.parse(fs.readFileSync(file,'utf8')),r=summarize(m);if(out){fs.mkdirSync(out,{recursive:true});atomicJson(path.join(out,'progress.json'),r);fs.writeFileSync(path.join(out,'progress.md'),markdown(m,r));}console.log(JSON.stringify(r,null,2));}
module.exports={summarize,markdown};
if(require.main===module)try{main(process.argv.slice(2));}catch(e){console.error(e.message);process.exitCode=1;}
