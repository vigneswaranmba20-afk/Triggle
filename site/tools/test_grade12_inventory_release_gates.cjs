'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '../..');
const ledger = JSON.parse(fs.readFileSync(path.join(root,'docs/grade-12/coverage-2025.json'),'utf8'));
const inventory = JSON.parse(fs.readFileSync(path.join(root,'docs/grade-12/ex1.1-source-inventory-2025.json'),'utf8'));
assert.equal(ledger.grade,12);
assert.equal(inventory.grade,12);
assert.equal(ledger.chapterCount,12);
assert.deepEqual(ledger.chapterStatus.map(x=>x.chapter),Array.from({length:12},(_,i)=>i+1));
assert.equal(ledger.inventoryComplete,false,'Do not imply full-book coverage before source inventory');
const ids = inventory.items.map(x=>x.id);
assert.equal(new Set(ids).size,ids.length,'Duplicate textbook subpart IDs');
assert.equal(ids.length,19,'Exercise 1.1 inventory changed: verify original 2025 pages first');
const published = ledger.items.filter(x=>x.merged || x.liveVerified);
assert.equal(published.length,0,'Unpublished Grade 12 work must not be marked live');
const verified = inventory.items.filter(x=>x.status==='mathematically_verified');
const missing = inventory.items.filter(x=>x.status==='missing');
assert.equal(verified.length+missing.length,inventory.items.length,'Every inventoried item needs a known status');
assert.deepEqual(verified.map(x=>x.id).sort(),ledger.items.map(x=>x.id).sort(),'Verified coverage ledger must match source inventory');
for(const item of inventory.items){
 assert.match(item.id,/^g12-ch1-ex1\.1-q\d+(?:-(?:i|ii|iii))?$/);
 assert.equal(item.tamilEditorialReview,'pending',item.id);
 assert.equal(item.merged,false,item.id);
 assert.equal(item.liveVerified,false,item.id);
 if(item.status==='missing')assert.equal(item.matrixSourceImageChecked,false,item.id);
 if(item.status==='mathematically_verified')assert.equal(item.matrixSourceImageChecked,true,item.id);
}
for(const item of ledger.items){
 assert.equal(item.sourceVerified,true,item.id);
 assert.equal(item.bilingualTextCheckedAgainstSource,true,item.id);
 assert.equal(item.ci,'passed',item.id);
 assert.equal(item.browser,'passed',item.id);
 assert.equal(item.tamilEditorialReview,'pending',item.id);
 assert.ok(item.sourcePages?.english?.pdfPage>0,item.id);
 assert.ok(item.sourcePages?.tamil?.pdfPage>0,item.id);
 assert.ok(item.ciEvidence?.grade12Run,item.id);
}
assert.equal(ledger.chapterStatus[0].verifiedSubparts,verified.length);
assert.match(ledger.chapterStatus[0].missingSubparts,/16 known missing/);
for(const chapter of ledger.chapterStatus.slice(1)){
 assert.equal(chapter.exerciseInventory,'UNKNOWN');
 assert.equal(chapter.missingSubparts,'UNKNOWN');
 assert.equal(chapter.verifiedSubparts,0);
}
console.log('Grade 12: 19 unique source slots; 3 verified, 16 missing; bilingual, CI, editorial and publication integrity OK');
