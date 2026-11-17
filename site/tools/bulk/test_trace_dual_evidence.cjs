'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const {verifyEvidence}=require('./trace_dual_evidence.cjs');
const {responseText,taskFor,runDualReview}=require('./trace_dual_ai.cjs');
const registry=require('../../../docs/reference-library/2025-user-textbook-manifest.json');
const books=Object.fromEntries(['en','ta'].map(m=>[m,registry.books.find(b=>b.grade===10&&b.medium===m)]));
const fresh=()=>({
 id:'g10-ch2-gp-sum',sourceVerified:true,sourceRef:'VERIFIED_SOURCE_REQUIRED_BEFORE_ANY_REAL_REVIEW',
 difficulty:'difficult',problem:'Synthetic ratio sum; not a textbook transcription',
 solution:'S = 1+2+4+8 = 15',
 sourceEvidence:{edition:'2025',pages:Object.fromEntries(['en','ta'].map((m,i)=>[m,{
   bookSha256:books[m].sha256,imageSha256:(i?'b':'a').repeat(64),
   pdfPage:30,printedPage:25,visualChecked:true
 }]))}
});
const expectBad=(fn)=>assert.throws(fn,/UNVERIFIED_SOURCE_EVIDENCE/);
let tests=0;
function check(name,fn){fn();tests++;console.log('PASS TRACE dual evidence '+name);}
check('grade 10 metadata fingerprints bind both books',()=>{
 const e=verifyEvidence(fresh());
 assert.equal(e.claim,'STRUCTURALLY_VALIDATED_NOT_VISUALLY_CERTIFIED');
 assert.match(e.evidenceSha256,/^[a-f0-9]{64}$/);
 assert.equal(e.pageIdentities.length,2);
 assert.equal(taskFor('openai',fresh(),true,e).input.evidenceMetadataSha256,e.evidenceSha256);
});
check('explicit English-first evidence does not assert Tamil review',()=>{
 const r=fresh();r.sourceMedium='en';delete r.sourceEvidence.pages.ta;
 const e=verifyEvidence(r);
 assert.equal(e.scope,'en');assert.equal(e.pageIdentities.length,1);
 assert.equal(e.pageIdentities[0].medium,'en');
 assert.equal(taskFor('gemini',r,true,e).input.reviewMedium,'en');
 const copy=fresh();delete copy.sourceEvidence.pages.ta;
 expectBad(()=>verifyEvidence(copy)); // implicit default remains bilingual
});
check('single-language metadata fails closed on swapped or extra pages',()=>{
 const r=fresh();r.sourceMedium='en';delete r.sourceEvidence.pages.ta;
 r.sourceEvidence.pages.en.bookSha256=books.ta.sha256;
 expectBad(()=>verifyEvidence(r));
 const x=fresh();x.sourceMedium='en';expectBad(()=>verifyEvidence(x));
 const t=fresh();t.sourceMedium='ta';delete t.sourceEvidence.pages.en;
 assert.equal(verifyEvidence(t).scope,'ta');
});
check('reject missing and fake book identity',()=>{
 const r=fresh();delete r.sourceEvidence;expectBad(()=>verifyEvidence(r));
 const q=fresh();q.sourceEvidence.pages.en.bookSha256='f'.repeat(64);expectBad(()=>verifyEvidence(q));
});
check('reject impossible page claims and inconsistent grade',()=>{
 const r=fresh();r.sourceEvidence.pages.en.pdfPage=9999;expectBad(()=>verifyEvidence(r));
 const q=fresh();q.id='g12-ch2-gp-sum';expectBad(()=>verifyEvidence(q));
});
check('reject absent image inspection and forged image hash',()=>{
 const r=fresh();r.sourceEvidence.pages.en.visualChecked=false;expectBad(()=>verifyEvidence(r));
 const q=fresh();q.sourceEvidence.pages.en.imageSha256='x'.repeat(64);expectBad(()=>verifyEvidence(q));
});
check('reject swapped medium and same-page image hashes',()=>{
 const r=fresh();r.sourceEvidence.pages.en.bookSha256=books.ta.sha256;expectBad(()=>verifyEvidence(r));
 const q=fresh();q.sourceEvidence.pages.ta.imageSha256=q.sourceEvidence.pages.en.imageSha256;expectBad(()=>verifyEvidence(q));
});
check('refusals never turn into completed review candidates',()=>{
 assert.throws(()=>responseText('openai',{status:'completed',output:[{content:[{type:'refusal',refusal:'Cannot comply'}]}]}),/PROVIDER_REFUSAL/);
 assert.throws(()=>responseText('gemini',{promptFeedback:{blockReason:'SAFETY'}}),/PROVIDER_REFUSAL/);
 assert.throws(()=>responseText('openai',{status:'incomplete',output:[]}),/INCOMPLETE_PROVIDER_REVIEW/);
});
check('offline mode remains safe without source attestations',()=>{
 const without=fresh();delete without.sourceEvidence;
 assert.equal(verifyEvidence(fresh()).pageIdentities[0].bookSha256,books.en.sha256);
 // This is a mock; the offline path must never infer that the PDFs were reviewed.
 assert.equal(taskFor('openai',without,false).input.evidenceMetadataSha256,undefined);
});
console.log('PASS '+tests+' extra source-identity/response tests, external spend USD 0');
