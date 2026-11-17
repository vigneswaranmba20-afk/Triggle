'use strict';
// TRACE evidence gate. Checks book identity and claimed page-image fingerprints.
// It does NOT itself inspect a PDF, confirm that a screenshot matches a page,
// or certify that an exercise/transcription is correct. English-only reviews
// require explicit sourceMedium:'en' and cannot certify Tamil content.
const path=require('node:path');
const fs=require('node:fs');
const crypto=require('node:crypto');
const {ROOT}=require('../curriculum_bulk.cjs');

const DIGEST=/^[a-f0-9]{64}$/;
function sha(value){return crypto.createHash('sha256').update(JSON.stringify(value)).digest('hex');}
function fail(){throw Error('UNVERIFIED_SOURCE_EVIDENCE');}
function verifyEvidence(record,{root=ROOT}={}){
  const match=/^g(9|10|11|12)-ch(\d+)-/.exec(record?.id||'');
  if(!match)fail();
  const grade=Number(match[1]),chapter=Number(match[2]),evidence=record.sourceEvidence;
  if(!evidence||evidence.edition!=='2025'||!evidence.pages||
     !['en','ta','bilingual'].includes(record.sourceMedium||'bilingual'))fail();
  const requestedMedium=record.sourceMedium||'bilingual';
  const requiredMediums=requestedMedium==='bilingual'?['en','ta']:[requestedMedium];
  if(Object.keys(evidence.pages).sort().join(',')!==requiredMediums.slice().sort().join(','))fail();
  const registry=JSON.parse(fs.readFileSync(path.join(root,'docs/reference-library/2025-user-textbook-manifest.json'),'utf8'));
  const normalized=[];
  for(const medium of requiredMediums){
    const page=evidence.pages[medium];
    const fields=['bookSha256','imageSha256','pdfPage','printedPage','visualChecked'];
    if(!page||Object.keys(page).sort().join(',')!==fields.sort().join(','))fail();
    if(!DIGEST.test(page.bookSha256)||!DIGEST.test(page.imageSha256)||
       page.bookSha256===page.imageSha256||page.visualChecked!==true||
       !Number.isSafeInteger(page.pdfPage)||!Number.isSafeInteger(page.printedPage))fail();
    const book=registry.books.find(b=>b.grade===grade&&b.medium===medium&&b.sha256===page.bookSha256);
    if(!book||!book.chapterNumbers.includes(chapter)||page.pdfPage<1||
       page.pdfPage>book.pdfPages||page.printedPage<1||page.printedPage>book.pdfPages)fail();
    // The reported image hash is an asserted evidence fingerprint, not a page check.
    normalized.push({medium,bookSha256:page.bookSha256,imageSha256:page.imageSha256,
      pdfPage:page.pdfPage,printedPage:page.printedPage});
  }
  if(normalized.length===2&&normalized[0].imageSha256===normalized[1].imageSha256)fail();
  return {claim:'STRUCTURALLY_VALIDATED_NOT_VISUALLY_CERTIFIED',
    evidenceSha256:sha({recordId:record.id,grade,chapter,sourceMedium:requestedMedium,pages:normalized}),
    scope:requestedMedium,
    pageIdentities:normalized};
}
module.exports={verifyEvidence};
