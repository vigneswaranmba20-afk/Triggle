'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const ledger = JSON.parse(fs.readFileSync(path.join(__dirname,'../../docs/grade-12/coverage-2025.json'),'utf8'));
assert.equal(ledger.grade,12);
assert.equal(ledger.chapterStatus.length,12);
assert.equal(ledger.inventoryComplete,false);
assert.equal(ledger.verifiedSources.english.driveFileId,'1_auJ33Wb1pI2_DxahdqJ1poiRUh6hqvm');
assert.equal(ledger.verifiedSources.tamil.driveFileId,'1fzvsKbCtL8QoqXO7bO-VzcPEez5L4Q2c');
const verified = ledger.items.filter(x=>x.status==='mathematically_verified');
assert.equal(verified.length,3);
for(const item of verified){
 assert.equal(item.sourceVerified,true,item.id);
 assert.equal(item.tamilEditorialReview,'pending',item.id);
 assert.equal(item.merged,false,item.id);
 assert.equal(item.liveVerified,false,item.id);
 assert.equal(item.ci,'passed',item.id);
 assert.equal(item.browser,'passed',item.id);
 assert.ok(item.ciEvidence?.grade12Run,item.id);
}
assert.equal(ledger.chapterStatus[0].verifiedSubparts,verified.length);
assert.equal(ledger.chapterStatus[0].liveVerifiedSubparts,0);
console.log('Grade 12 source IDs, CI evidence and unpublished coverage: OK');
