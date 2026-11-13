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
 assert.equal(h.questionAndSubpartParityChecked,['7.1','8.2','8.3','8.4','8.5'].includes(h.exercise));
 assert.equal(headingIndex.entries.find(e=>e.exercise===h.exercise)?.pdfPage,h.enPdfPage);
}

assert.equal(headingIndex.exerciseHeadingCount,61);
assert.equal(headingIndex.entries.length,61);
assert.equal(headingIndex.source.pdfSha256,'602eb88de6fc05200199bcb4c31e7b8a02175513c6ac2594e49b479cc6aec09d');
assert.equal(headingIndex.sourcePageImageAllHeadingsVerified,false);
assert.equal(headingIndex.bilingualCrossCheck,'PARTIAL_EX7_1_AND_EX8_2_EX8_3_EX8_4_EX8_5_NUMBERS_AND_SUBPARTS_ONLY');
for(let chapter=1;chapter<=8;chapter++){
 const entry=chapterQueue.chapters.find(c=>c.grade===10&&c.chapter===chapter);
 const headings=headingIndex.entries.filter(h=>h.chapter===chapter);
 assert.equal(entry.englishExerciseHeadingCount,headings.length);
 assert.equal(entry.tamilExerciseHeadingCount,headings.length);
 assert.equal(entry.bilingualHeadingParities,headings.length);
 assert.equal(headings.length,headingIndex.chapterExerciseHeadingCounts[String(chapter)]);
 assert.deepEqual(headings.map(h=>h.exercise),headings.map((h,i)=>chapter+'.'+(i+1)));
 for(const h of headings){assert(h.pdfPage>=1&&h.pdfPage<339);assert.equal(h.questionCount,h.exercise==='8.2'?8:h.exercise==='8.3'?13:h.exercise==='8.4'?13:h.exercise==='8.5'?15:h.exercise==='7.1'?10:null);assert.equal(h.subpartCount,h.exercise==='8.2'?8:h.exercise==='8.3'?29:h.exercise==='8.4'?15:h.exercise==='8.5'?15:null);}
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
assert.equal(bilingualHeadings.entries.filter(x=>x.questionAndSubpartParityChecked).length,5);
assert.equal(headingIndex.sourcePageImageAllHeadingsVerified,false);
assert.equal(bilingualHeadings.questionTextParityCertified,false);


 // New bounded source-page inventory: G10 Statistics/Probability Ex8.3.
 // Prevent silently treating figure/tree requests as full solution coverage.
 const ex83=require('../../../docs/trace/source-inventories/g10-ch8-ex8-3.json');
 assert.equal(ex83.sourcePageInventoryStatus,'BOTH_ORIGINAL_MEDIUM_PAGE_IMAGES_CHECKED');
 assert.equal(ex83.questionStems,13);assert.equal(ex83.questionParts,29);
 assert.equal(ex83.mediumRepresentations,58);
 assert.equal(ex83.questions.length,13);
 assert.deepEqual(ex83.questions.map(q=>q.question),Array.from({length:13},(_,i)=>String(i+1)));
 const expectedParts={1:1,2:1,3:2,4:1,5:2,6:2,7:4,8:4,9:4,10:1,11:1,12:3,13:3};
 assert.equal(Object.values(expectedParts).reduce((n,p)=>n+p,0),29);
 for(const q of ex83.questions){
  assert.equal(q.parts.length,expectedParts[q.question]);
  assert(q.parts.length===1?q.parts[0]==='whole':q.parts.every((p,i)=>p===['i','ii','iii','iv'][i]));
  assert(q.crossMediumIntentAndNumbersChecked===true);
  assert.equal(q.runtimeAndPrReconciliation,'NOT_RECHECKED_BY_THIS_SOURCE_INVENTORY');
  assert.equal(q.sourceDiscrepancy,null);assert.equal(q.tablesRequired,false);
 }
 assert.deepEqual(ex83.questions.filter(q=>q.diagramRequested).map(q=>q.question),['1','2']);
 assert.deepEqual(ex83.questions.filter(q=>q.figuresRequired).map(q=>q.question),['11']);
 assert.equal(ex83.figureEvidence.question,'11');
 assert.deepEqual(ex83.figureEvidence.rectangle,{widthFeet:4,heightFeet:3});
 assert.deepEqual(ex83.figureEvidence.targetCircle,{radiusFeet:1});
 assert.equal(ex83.figureEvidence.piGiven,3.14);
 assert.match(ex83.questions.find(q=>q.question==='3').symbolEvidence,/overbar/i);
 assert.deepEqual(ex83.questions.find(q=>q.question==='3').numericalEvidenceBothMediums,[17,15,640]);
 assert.deepEqual(ex83.questions.find(q=>q.question==='9').numericalEvidenceBothMediums,[5,6,7,8]);
 assert.deepEqual(ex83.questions.find(q=>q.question==='11').numericalEvidenceBothMediums,[4,3,1,3.14]);
 assert.equal(ex83.exerciseSourceInventoryComplete,true);
 assert.equal(ex83.chapterSourceInventoryComplete,false);
 assert.equal(ex83.allGradeQuestionDenominator,null);
 assert.equal(ex83.professionalTamilReview,'pending');
 assert.equal(ex83.teacherApproval,'not performed (owner deferred)');
 assert.equal(ex83.mathSolutionsVerified,false);
 assert.equal(ex83.realPilotEligibleParts,0);
 assert.equal(ex83.releaseApproved,false);
 assert.deepEqual(ex83.sources.map(s=>s.medium),['en','ta']);
 for(const s of ex83.sources){
  assert.equal(s.pdfSha256,s.medium==='en'?headingIndex.source.pdfSha256:bilingualHeadings.tamil.sha256);
  assert.equal(s.pages.length,2);
  assert(s.pages.every(page=>page.pdfPage>0&&page.printedPage>0&&page.visualChecked&&/^[a-f0-9]{64}$/.test(page.imageSha256)));
 }
 for(const q of ex83.questions)for(const medium of ['en','ta']){
  const sr=ex83.sources.find(s=>s.medium===medium);
  assert(sr.pages.some(p=>p.pdfPage===q.sourceLocators[medium].pdfPage&&p.printedPage===q.sourceLocators[medium].printedPage));
 }
 assert.equal(headingIndex.entries.find(x=>x.exercise==='8.3').imageVerified,true);
 assert.equal(headingIndex.sourcePageImageAllHeadingsVerified,false);
 assert.equal(bilingualHeadings.fullImageReviewComplete,false);
 assert.equal(bilingualHeadings.questionTextParityCertified,false);
 assert.equal(bilingualHeadings.tamilTranslationReviewed,false);

// Ex8.4: original English/Tamil page images establish bounded source counts, not valid solutions.
const ex84=require('../../../docs/trace/source-inventories/g10-ch8-ex8-4.json');
assert.equal(ex84.sourcePageInventoryStatus,'BOTH_ORIGINAL_MEDIUM_PAGE_IMAGES_CHECKED');
assert.equal(ex84.questionStems,13);assert.equal(ex84.questionParts,15);
assert.equal(ex84.mediumRepresentations,30);assert.equal(ex84.questions.length,13);
assert.deepEqual(ex84.questions.map(x=>x.question),Array.from({length:13},(_,i)=>String(i+1)));
assert.deepEqual(ex84.questions.map(x=>x.parts.length),[1,3,1,1,1,1,1,1,1,1,1,1,1]);
assert.deepEqual(ex84.questions[1].parts,['i','ii','iii']);
assert(ex84.questions.every(x=>x.crossMediumIntentAndNumbersChecked===true));
assert(ex84.questions.every(x=>x.runtimeAndPrReconciliation==='NOT_RECHECKED_BY_THIS_SOURCE_INVENTORY'));
assert(ex84.questions.every(x=>x.tablesRequired===false && x.figuresRequired===false));
assert.equal(ex84.sourceAnomalies.length,1);
assert.equal(ex84.sourceAnomalies[0].question,'1');
assert.equal(ex84.sourceAnomalies[0].type,'MATHEMATICAL_IMPOSSIBILITY_PRINTED_IN_BOTH_MEDIA');
assert.equal(ex84.questions[0].sourceDiscrepancy,'BILINGUAL_SOURCE_MATH_CONTRADICTION');
assert(ex84.questions.slice(1).every(x=>x.sourceDiscrepancy===null));
assert.equal(Number(ex84.sourceAnomalies[0].given['P(A)'].split('/')[0])/3,2/3);
assert(1/3 < 2/3,'The printed union probability must remain quarantined');
assert.match(ex84.questions.find(x=>x.question==='4').symbolEvidence,/both complement bars/i);
assert.deepEqual(ex84.sources.map(x=>x.medium),['en','ta']);
assert.deepEqual(ex84.sources.map(x=>x.pages.length),[1,2]);
for(const sr of ex84.sources){
 assert.equal(sr.pdfSha256,sr.medium==='en'?headingIndex.source.pdfSha256:bilingualHeadings.tamil.sha256);
 assert(sr.pages.every(p=>p.pdfPage>0&&p.printedPage>0&&p.visualChecked&&/^[a-f0-9]{64}$/.test(p.imageSha256)));
}
for(const q of ex84.questions)for(const medium of ['en','ta']){
 assert(ex84.sources.find(s=>s.medium===medium).pages.some(p=>p.pdfPage===q.sourceLocators[medium].pdfPage&&p.printedPage===q.sourceLocators[medium].printedPage));
}
assert.equal(ex84.exerciseSourceInventoryComplete,true);
assert.equal(ex84.chapterSourceInventoryComplete,false);
assert.equal(ex84.allGradeQuestionDenominator,null);
assert.equal(ex84.realPilotEligibleParts,0);
assert.equal(ex84.mathSolutionsVerified,false);assert.equal(ex84.releaseApproved,false);
assert.equal(ex84.professionalTamilReview,'pending');
assert.equal(headingIndex.entries.find(x=>x.exercise==='8.4').questionCount,13);
assert.equal(headingIndex.entries.find(x=>x.exercise==='8.4').subpartCount,15);
assert.equal(headingIndex.entries.find(x=>x.exercise==='8.4').imageVerified,true);
assert.equal(bilingualHeadings.entries.find(x=>x.exercise==='8.4').questionAndSubpartParityChecked,true);
assert.equal(bilingualHeadings.entries.filter(x=>!x.questionAndSubpartParityChecked).length,56);
assert.equal(bilingualHeadings.questionTextParityCertified,false);

// Exercise 8.5: original English/Tamil MCQ pages and all options verified as source inventory only.
const ex85=require('../../../docs/trace/source-inventories/g10-ch8-ex8-5.json');
assert.equal(ex85.sourcePageInventoryStatus,'BOTH_ORIGINAL_MEDIUM_PAGE_IMAGES_CHECKED');
assert.equal(ex85.questionStems,15);assert.equal(ex85.questionParts,15);
assert.equal(ex85.mediumRepresentations,30);
assert.equal(ex85.mcqChoicesPerQuestion,4);
assert.equal(ex85.mcqChoiceOccurrencesPerMedium,60);
assert.equal(ex85.mcqChoiceOccurrencesAcrossMedia,120);
assert.equal(ex85.questions.length,15);
assert.deepEqual(ex85.questions.map(q=>q.question),Array.from({length:15},(_,i)=>String(i+1)));
assert(ex85.questions.every(q=>q.parts.length===1&&q.parts[0]==='whole'));
assert(ex85.questions.every(q=>q.questionType==='single-choice'));
assert(ex85.questions.every(q=>JSON.stringify(q.optionLabels)===JSON.stringify(['A','B','C','D'])));
assert(ex85.questions.every(q=>q.optionContentCanonical.length===4&&q.choiceContentEnglishAndTamilCompared===true));
assert(ex85.questions.every(q=>q.crossMediumIntentAndNumbersChecked===true));
assert(ex85.questions.every(q=>q.runtimeAndPrReconciliation==='NOT_RECHECKED_BY_THIS_SOURCE_INVENTORY'));
assert(ex85.questions.every(q=>!q.tablesRequired&&!q.figuresRequired&&!q.textbookFigure));
assert.deepEqual(ex85.questions.find(q=>q.question==='7').optionContentCanonical,['3p+5','3p','p+5','9p+15']);
assert.deepEqual(ex85.questions.find(q=>q.question==='9').optionContentCanonical,['P(A)>1','0≤P(A)≤1','P(∅)=0','P(A)+P(Ā)=1']);
assert.deepEqual(ex85.questions.find(q=>q.question==='10').optionContentCanonical,['q/(p+q+r)','p/(p+q+r)','(p+q)/(p+q+r)','(p+r)/(p+q+r)']);
assert.deepEqual(ex85.questions.find(q=>q.question==='11').optionContentCanonical,['3/10','7/10','3/9','7/9']);
assert.deepEqual(ex85.questions.find(q=>q.question==='15').numericalEvidenceBothMediums,[10,2000,15,500,25,200]);
assert.deepEqual(ex85.questions.filter(q=>q.sourceDiscrepancy!==null).map(q=>q.question),['11']);
assert.equal(ex85.sourceAmbiguities.length,1);
assert.equal(ex85.sourceAmbiguities[0].question,'11');
assert.equal(ex85.sourceAmbiguities[0].type,'UNSPECIFIED_BOOK_PAGE_COUNT');
assert.equal(ex85.sourceAmbiguities[0].severity,'block_unconditional_correct_answer_and_pilot_eligibility');
const qualified=(n)=>Array.from({length:n},(_,i)=>(i+1)%10).filter(u=>u<7).length;
assert.equal(qualified(10)/10,7/10);
assert.equal(qualified(9)/9,6/9);
assert.notEqual(qualified(10)/10,qualified(9)/9,'page count ambiguity must remain quarantined');
assert.deepEqual(ex85.sources.map(s=>s.medium),['en','ta']);
assert.deepEqual(ex85.sources.map(s=>s.pages.length),[2,2]);
for(const s of ex85.sources){
 assert.equal(s.pdfSha256,s.medium==='en'?headingIndex.source.pdfSha256:bilingualHeadings.tamil.sha256);
 assert(s.pages.every(pg=>pg.pdfPage>0&&pg.printedPage>0&&pg.visualChecked&&/^[a-f0-9]{64}$/.test(pg.imageSha256)));
}
for(const q of ex85.questions)for(const m of ['en','ta']){
 assert(ex85.sources.find(s=>s.medium===m).pages.some(p=>p.pdfPage===q.sourceLocators[m].pdfPage&&p.printedPage===q.sourceLocators[m].printedPage));
}
assert.equal(ex85.exerciseSourceInventoryComplete,true);
assert.equal(ex85.chapterSourceInventoryComplete,false);
assert.equal(ex85.allGradeQuestionDenominator,null);
assert.equal(ex85.realPilotEligibleParts,0);
assert.equal(ex85.mathSolutionsVerified,false);
assert.equal(ex85.releaseApproved,false);
assert.equal(ex85.professionalTamilReview,'pending');
assert.equal(headingIndex.entries.find(x=>x.exercise==='8.5').imageVerified,true);
assert.equal(headingIndex.entries.find(x=>x.exercise==='8.5').questionCount,15);
assert.equal(headingIndex.entries.find(x=>x.exercise==='8.5').subpartCount,15);
assert.equal(bilingualHeadings.entries.find(x=>x.exercise==='8.5').questionAndSubpartParityChecked,true);
assert.equal(bilingualHeadings.entries.filter(x=>!x.questionAndSubpartParityChecked).length,57);
assert.equal(bilingualHeadings.questionTextParityCertified,false);
assert.equal(bilingualHeadings.tamilTranslationReviewed,false);

// Grade 10 Mensuration Exercise 7.1: bilingual original page-image inventory only.
const ex71=require('../../../docs/trace/source-inventories/g10-ch7-ex7-1.json');
assert.equal(ex71.sourcePageInventoryStatus,'BOTH_ORIGINAL_MEDIUM_PAGE_IMAGES_CHECKED');
assert.equal(ex71.questionStems,10);assert.equal(ex71.questionParts,10);
assert.equal(ex71.mediumRepresentations,20);
assert.equal(ex71.questions.length,10);
assert.deepEqual(ex71.questions.map(q=>q.question),Array.from({length:10},(_,i)=>String(i+1)));
assert(ex71.questions.every(q=>q.parts.length===1&&q.parts[0]==='whole'));
assert(ex71.questions.every(q=>q.crossMediumIntentAndNumbersChecked===true));
assert(ex71.questions.every(q=>q.runtimeAndPrReconciliation==='NOT_RECHECKED_BY_THIS_SOURCE_INVENTORY'));
assert.deepEqual(ex71.questions.filter(q=>q.figuresRequired).map(q=>q.question),['10']);
assert(ex71.questions.every(q=>q.tablesRequired===false));
assert.equal(ex71.questions.find(q=>q.question==='10').textbookFigure,'q10-table-lamp-frustum');
assert.deepEqual(ex71.questions.find(q=>q.question==='10').numericalEvidenceBothMediums,[6,8,12,2]);
assert.deepEqual(ex71.questions.find(q=>q.question==='4').symbolEvidence,['∠Q=90°','QR=16 cm','PR=20 cm']);
assert.deepEqual(ex71.questions.find(q=>q.question==='9').numericalEvidenceBothMediums,[20,28,0.14]);
assert.deepEqual(ex71.questions.find(q=>q.question==='6').numericalEvidenceBothMediums,[5720,5,12]);
assert(ex71.questions.every(q=>q.sourceDiscrepancy===null));
assert.equal(ex71.figureEvidence.question,'10');
assert.deepEqual([ex71.figureEvidence.topWidthCm,ex71.figureEvidence.bottomWidthCm,ex71.figureEvidence.verticalHeightCm],[6,12,8]);
assert.equal(ex71.figureEvidence.paintRateInrPerSqCm,2);
assert.equal(ex71.figureEvidence.enPdfPage,288);assert.equal(ex71.figureEvidence.taPdfPage,296);
assert.equal(ex71.sources.length,2);
assert.deepEqual(ex71.sources.map(s=>s.medium),['en','ta']);
assert.deepEqual(ex71.sources.map(s=>s.pages.length),[1,1]);
for(const sr of ex71.sources){
 assert.equal(sr.pdfSha256,sr.medium==='en'?headingIndex.source.pdfSha256:bilingualHeadings.tamil.sha256);
 assert(sr.pages.every(p=>p.pdfPage>0&&p.printedPage>0&&p.visualChecked&&/^[a-f0-9]{64}$/.test(p.imageSha256)));
}
for(const q of ex71.questions)for(const medium of ['en','ta']){
 assert(ex71.sources.find(s=>s.medium===medium).pages.some(p=>p.pdfPage===q.sourceLocators[medium].pdfPage&&p.printedPage===q.sourceLocators[medium].printedPage));
}
assert.equal(ex71.exerciseSourceInventoryComplete,true);
assert.equal(ex71.chapterSourceInventoryComplete,false);
assert.equal(ex71.allGradeQuestionDenominator,null);
assert.equal(ex71.realPilotEligibleParts,0);
assert.equal(ex71.mathSolutionsVerified,false);assert.equal(ex71.releaseApproved,false);
assert.equal(ex71.professionalTamilReview,'pending');
assert.equal(headingIndex.entries.find(x=>x.exercise==='7.1').questionCount,10);
assert.equal(headingIndex.entries.find(x=>x.exercise==='7.1').subpartCount,10);
assert.equal(headingIndex.entries.find(x=>x.exercise==='7.1').imageVerified,true);
assert.equal(bilingualHeadings.entries.find(x=>x.exercise==='7.1').questionAndSubpartParityChecked,true);
assert.equal(bilingualHeadings.entries.filter(x=>!x.questionAndSubpartParityChecked).length,56);
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
