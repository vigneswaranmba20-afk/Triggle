'use strict';
const assert=require('node:assert/strict'),{inspect}=require('./trace_source_guard.cjs');
const audit=require('../../../docs/trace/source-audit-20261112.json');
const observations=require('../../../docs/trace/source-discrepancies-20261112.json');
const clone=x=>structuredClone(x),g10=observations.items.find(i=>i.id==='g10-ch8-ex8.1-q5');
const result=inspect(g10,audit.books);
assert.equal(result.status,'QUARANTINED_FOR_SOURCE_REVIEW');
assert(result.issues.some(i=>i.code==='DECLARED_COUNT_DIFFERS_FROM_VALUES:wages'&&i.medium==='ta'));
assert(result.issues.some(i=>i.code==='CROSS_MEDIUM_QUANTITY_DIFFERENCE'));
assert.equal(g10.sources[0].quantities.wages.declaredCount,9);
assert.equal(g10.sources[1].quantities.wages.declaredCount,10);
assert.equal(g10.sources[1].quantities.wages.values.length,9);
const q5=observations.items.find(i=>i.id==='g12-ch1-ex1.4-q5');
assert(inspect(q5,audit.books).issues.some(i=>i.code==='CROSS_MEDIUM_METHOD_INSTRUCTION_DIFFERENCE'));
const clean=clone(g10);clean.sources[1].quantities.wages.declaredCount=9;
assert.equal(inspect(clean,audit.books).status,'SOURCE_COMPARISON_PASSED');
for(const [change,code] of [
 [r=>r.sources.pop(),'MISSING_OR_DUPLICATE_MEDIUM'],
 [r=>r.sources[0].pdfSha256='f'.repeat(64),'BOOK_DIGEST_MISMATCH'],
 [r=>r.sources[0].edition='2026','EDITION_UNCONFIRMED'],
 [r=>r.sources[0].imageSha256='unknown','PAGE_IMAGE_EVIDENCE_REQUIRED'],
 [r=>r.sources[0].pdfPage=9999,'PAGE_IMAGE_EVIDENCE_REQUIRED'],
 [r=>r.sources[0].uncertainties=['minus or plus?'],'TRANSCRIPTION_UNCERTAIN'],
 [r=>r.figureRequired=true,'FIGURE_REVIEW_REQUIRED'],
 [r=>r.sources[0].mathModelHash='a'.repeat(64),'CROSS_MEDIUM_MATH_DIFFERENCE'],
 [r=>r.sources[0].quantities.wages.values[0]=NaN,'INVALID_QUANTITY_OBSERVATION']
]){const altered=clone(clean);change(altered);assert(inspect(altered,audit.books).issues.some(i=>i.code.startsWith(code)),code);}
assert.equal(inspect(clean,audit.books).releaseApproved,false);
assert.equal(inspect(clean,audit.books).professionalTamilReview,'pending');
console.log('PASS source guard: actual EN/TA count/method discrepancies, missing images, stale digest/edition, uncertain symbols, figures and math mutations');
