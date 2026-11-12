'use strict';
const assert=require('node:assert/strict'),{summarize}=require('./trace_progress.cjs');
const manifest=require('../../../docs/trace/task-checklist.json');
const report=summarize(manifest);
const chapterQueue=require('../../../docs/trace/source-inventories/41-chapter-pair-work-queue.json');
assert.equal(chapterQueue.chapterPairs,41);
assert.equal(chapterQueue.chapters.length,41);
assert.equal(new Set(chapterQueue.chapters.map(c=>c.pairKey)).size,41);
assert.equal(chapterQueue.chapters.filter(c=>c.priority==='high').length,20);
for(const c of chapterQueue.chapters){
 assert(c.mediumSources.en?.sha256&&c.mediumSources.ta?.sha256);
 assert.equal(c.chapterQuestionCount,null);assert.equal(c.chapterSubpartCount,null);
 assert.equal(c.completeSourcePageInventory,false);
}
assert.equal(chapterQueue.knownBoundedExercises.length,2);
const headingIndex=require('../../../docs/trace/source-inventories/g10-en-2025-exercise-heading-index.json');
assert.equal(headingIndex.exerciseHeadingCount,61);
assert.equal(headingIndex.entries.length,61);
assert.equal(headingIndex.source.pdfSha256,'602eb88de6fc05200199bcb4c31e7b8a02175513c6ac2594e49b479cc6aec09d');
assert.equal(headingIndex.sourcePageImageAllHeadingsVerified,false);
assert.equal(headingIndex.bilingualCrossCheck,'NOT_YET_PERFORMED');
for(let chapter=1;chapter<=8;chapter++){
 const entry=chapterQueue.chapters.find(c=>c.grade===10&&c.chapter===chapter);
 const headings=headingIndex.entries.filter(h=>h.chapter===chapter);
 assert.equal(entry.englishExerciseHeadingCount,headings.length);
 assert.equal(headings.length,headingIndex.chapterExerciseHeadingCounts[String(chapter)]);
 assert.deepEqual(headings.map(h=>h.exercise),headings.map((h,i)=>chapter+'.'+(i+1)));
 for(const h of headings){assert(h.pdfPage>=1&&h.pdfPage<339);assert.equal(h.questionCount,null);assert.equal(h.subpartCount,null);}
}

assert.equal(report.totalMilestones,18);assert.equal(report.baselinePercentComplete,44.44);assert.equal(report.originalBaselinePercentComplete,40);
assert.equal(report.curriculumPercent,null);assert.equal(report.pilotRealPercent,0);
assert.equal(report.percentComplete,88.89);assert.deepEqual(report.deferredMilestones.map(x=>x.id).sort(),['original-zip-reconciliation','professional-tamil-review']);
for(const mutate of [
 m=>m.requiredMilestones=19,m=>m.activeRequiredMilestones=19,m=>m.milestones.pop(),m=>m.milestones[1].id=m.milestones[0].id,
 m=>m.baselineCompletedIds.push(m.baselineCompletedIds[0]),m=>m.baselineCompletedIds[0]='invented',
 m=>m.milestones[0].evidence=[],m=>m.milestones[0].evidence=[{file:'../outside'}],
 m=>m.milestones[0].evidence=[{file:'AGENTS.md',sha256:'0'.repeat(64)}],
 m=>m.milestones[0].evidence=[{url:'https://github.com/unrelated/project/pull/1'}],
 m=>m.milestones.find(x=>x.id==='original-zip-reconciliation').status='blocked',
 m=>m.milestones.find(x=>x.id==='professional-tamil-review').deferredReason='',
 m=>m.milestones.find(x=>x.id==='pilot-real').status='deferred'
]){const changed=structuredClone(manifest);mutate(changed);assert.throws(()=>summarize(changed));}
const partial=structuredClone(manifest);const blocked=partial.milestones.find(m=>m.status==='blocked');blocked.status='partial';assert.equal(summarize(partial).percentComplete,report.percentComplete);
console.log('PASS owner-revised active-denominator progress: no partial credit, evidence/baseline/duplicate guards, curriculum unknown and real pilot zero');
