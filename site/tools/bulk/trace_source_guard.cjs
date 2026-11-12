'use strict';
// Guard manually transcribed page observations; this does not perform OCR or
// substitute for opening original images. Never confers editorial approval.
const {hashRecord}=require('../curriculum_bulk.cjs');
const digest=s=>typeof s==='string'&&/^[a-f0-9]{64}$/.test(s);
function inspect(item,books){
 if(!item?.id||!Array.isArray(books)||!Array.isArray(item.sources))throw Error('INVALID_SOURCE_OBSERVATION');
 const issues=[],add=(code,medium)=>issues.push({code,...(medium?{medium}:{})});
 const sources={};
 for(const medium of ['en','ta']){
  const matches=item.sources.filter(s=>s.medium===medium);
  if(matches.length!==1){add('MISSING_OR_DUPLICATE_MEDIUM',medium);continue;}
  const s=sources[medium]=matches[0],book=books.find(b=>b.driveId===s.driveId&&b.medium===medium);
  if(!book||!digest(s.pdfSha256)||s.pdfSha256!==book.sourceSha256)add('BOOK_DIGEST_MISMATCH',medium);
  if(s.edition!=='2025'||book?.revisionSeen!=='2025')add('EDITION_UNCONFIRMED',medium);
  if(s.visualChecked!==true||!digest(s.imageSha256)||!Number.isInteger(s.pdfPage)||s.pdfPage<1||s.pdfPage>(book?.pdfPages||0)||!Number.isInteger(s.printedPage)||s.printedPage<1)add('PAGE_IMAGE_EVIDENCE_REQUIRED',medium);
  if(!Array.isArray(s.uncertainties)||s.uncertainties.length)add('TRANSCRIPTION_UNCERTAIN',medium);
  if(!s.quantities||typeof s.quantities!=='object'||Array.isArray(s.quantities))add('QUANTITY_COMPARISON_REQUIRED',medium);
  else for(const [name,q] of Object.entries(s.quantities)){
   if(!q||!Array.isArray(q.values)||q.values.some(v=>typeof v!=='number'||!Number.isFinite(v))||q.declaredCount!==undefined&&(!Number.isSafeInteger(q.declaredCount)||q.declaredCount<0))add('INVALID_QUANTITY_OBSERVATION',medium);
   else if(q.declaredCount!==undefined&&q.declaredCount!==q.values.length)add('DECLARED_COUNT_DIFFERS_FROM_VALUES:'+name,medium);
  }
  if(item.figureRequired===true&&s.figureVisualChecked!==true)add('FIGURE_REVIEW_REQUIRED',medium);
  if(!digest(s.mathModelHash))add('MATH_COMPARISON_REQUIRED',medium);
 }
 if(sources.en&&sources.ta){
  if(sources.en.mathModelHash!==sources.ta.mathModelHash)add('CROSS_MEDIUM_MATH_DIFFERENCE');
  if(hashRecord(sources.en.quantities||{})!==hashRecord(sources.ta.quantities||{}))add('CROSS_MEDIUM_QUANTITY_DIFFERENCE');
  if(sources.en.methodInstruction!==sources.ta.methodInstruction)add('CROSS_MEDIUM_METHOD_INSTRUCTION_DIFFERENCE');
 }
 return {schemaVersion:1,id:item.id,observationHash:hashRecord(item),status:issues.length?'QUARANTINED_FOR_SOURCE_REVIEW':'SOURCE_COMPARISON_PASSED',issues,
  professionalTamilReview:'pending',releaseApproved:false,
  limitation:'Checks recorded manual observations against pinned book metadata. A pass does not certify uninspected pages, full Tamil prose or release readiness.'};
}
module.exports={inspect};
