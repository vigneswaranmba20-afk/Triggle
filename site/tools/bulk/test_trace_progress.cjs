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
const bilingualHeadings=require('../../../docs/trace/source-inventories/g10-2025-bilingual-exercise-heading-parity.json');
assert.equal(bilingualHeadings.matchingHeadingIdentifiers,61);
assert.equal(bilingualHeadings.uniqueEnglishHeadings,61);
assert.equal(bilingualHeadings.uniqueTamilHeadings,61);
assert.equal(bilingualHeadings.questionTextParityCertified,false);
assert.equal(bilingualHeadings.tamilTranslationReviewed,false);
assert.equal(bilingualHeadings.entries.length,61);
for(const h of bilingualHeadings.entries){
 assert(h.enPdfPage>0&&h.enPdfPage<340);
 assert(h.taPdfPage>0&&h.taPdfPage<351);
 assert.equal(h.questionAndSubpartParityChecked,h.exercise==='8.2');
 assert.equal(headingIndex.entries.find(e=>e.exercise===h.exercise)?.pdfPage,h.enPdfPage);
}

assert.equal(headingIndex.exerciseHeadingCount,61);
assert.equal(headingIndex.entries.length,61);
assert.equal(headingIndex.source.pdfSha256,'602eb88de6fc05200199bcb4c31e7b8a02175513c6ac2594e49b479cc6aec09d');
assert.equal(headingIndex.sourcePageImageAllHeadingsVerified,false);
assert.equal(headingIndex.bilingualCrossCheck,'PARTIAL_EX8_2_NUMBERS_AND_SUBPARTS_ONLY');
for(let chapter=1;chapter<=8;chapter++){
 const entry=chapterQueue.chapters.find(c=>c.grade===10&&c.chapter===chapter);
 const headings=headingIndex.entries.filter(h=>h.chapter===chapter);
 assert.equal(entry.englishExerciseHeadingCount,headings.length);
 assert.equal(entry.tamilExerciseHeadingCount,headings.length);
 assert.equal(entry.bilingualHeadingParities,headings.length);
 assert.equal(headings.length,headingIndex.chapterExerciseHeadingCounts[String(chapter)]);
 assert.deepEqual(headings.map(h=>h.exercise),headings.map((h,i)=>chapter+'.'+(i+1)));
 for(const h of headings){assert(h.pdfPage>=1&&h.pdfPage<339);assert.equal(h.questionCount,h.exercise==='8.2'?8:null);assert.equal(h.subpartCount,h.exercise==='8.2'?8:null);}
}


// Grade 10 Chapter 8 Exercise 8.2 is a bounded visually reviewed EN/TA inventory;
// no source-page check of the other 60 headings or any student release is inferred.
const ex82=require('../../../docs/trace/source-inventories/g10-ch8-ex8-2.json');
assert.equal(ex82.sourcePageInventoryStatus,'BOTH_ORIGINAL_MEDIUM_PAGE_IMAGES_CHECKED');
assert.equal(ex82.questionStems,8);assert.equal(ex82.questionParts,8);
assert.equal(ex82.mediumRepresentations,16);
assert.equal(ex82.exerciseSourceInventoryComplete,true);
assert.equal(ex82.chapterSourceInventoryComplete,false);
assert.equal(ex82.allGradeQuestionDenominator,null);
assert.equal(ex82.realPilotEligibleParts,0);
assert.equal(ex82.mathSolutionsVerified,false);
assert.equal(ex82.releaseApproved,false);
assert.equal(ex82.professionalTamilReview,'pending');
assert.equal(ex82.questions.length,8);
assert.deepEqual(ex82.questions.map(x=>x.question),['1','2','3','4','5','6','7','8']);
assert(ex82.questions.every(x=>x.parts.length===1&&x.parts[0]==='whole'));
assert(ex82.questions.every(x=>x.crossMediumIntentAndNumbersChecked===true));
assert(ex82.questions.every(x=>x.runtimeAndPrReconciliation==='NOT_RECHECKED_BY_THIS_SOURCE_INVENTORY'));
assert.equal(ex82.questions.filter(x=>x.tablesRequired).length,1);
assert.equal(ex82.questions.find(x=>x.question==='8').tablesRequired,true);
assert(ex82.questions.every(x=>x.figuresRequired===false));
assert.deepEqual(ex82.questions[3].numericalEvidenceBothMediums,[5,6,765]);
assert.deepEqual(ex82.questions[7].numericalEvidenceBothMediums,[56,12,65,14,60,10]);
assert.deepEqual(ex82.tableEvidence.rows.map(r=>[r.mean,r.standardDeviation]),[[56,12],[65,14],[60,10]]);
assert.deepEqual(ex82.sources.map(x=>x.medium),['en','ta']);
for(const s of ex82.sources){
 assert.equal(s.pdfSha256,s.medium==='en'?headingIndex.source.pdfSha256:bilingualHeadings.tamil.sha256);
 assert(s.pages.every(pg=>pg.pdfPage>0&&pg.printedPage>0&&pg.visualChecked&&/^[0-9a-f]{64}$/.test(pg.imageSha256)));
}
for(const q of ex82.questions){
 for(const medium of ['en','ta']){
  const source=ex82.sources.find(s=>s.medium===medium);
  assert(source.pages.some(p=>p.pdfPage===q.sourceLocators[medium].pdfPage&&p.printedPage===q.sourceLocators[medium].printedPage));
 }
}
assert.equal(headingIndex.entries.find(x=>x.exercise==='8.2').imageVerified,true);
assert.equal(bilingualHeadings.entries.filter(x=>x.questionAndSubpartParityChecked).length,1);
assert.equal(headingIndex.sourcePageImageAllHeadingsVerified,false);
assert.equal(bilingualHeadings.questionTextParityCertified,false);

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
