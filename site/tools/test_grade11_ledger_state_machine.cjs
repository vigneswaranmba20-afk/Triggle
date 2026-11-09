'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '../..');
const ledger = JSON.parse(fs.readFileSync(path.join(root,'docs/coverage/grade-11-2025.json'),'utf8'));
const manifest = JSON.parse(fs.readFileSync(path.join(root,ledger.sourceManifest),'utf8'));
assert.equal(ledger.grade,11);
assert.equal(ledger.chapters.length,12);
assert.equal(ledger.inventoryComplete,false);
assert.equal(ledger.exerciseQuestionSubpartTotal,null);
const ids = new Set();
const expectedMissing = ['q4-v','q4-vi','q5','q6','q7','q8','q9','q10'].map(x=>'g11-ch1-ex1.1-'+x);
for(const item of ledger.items){
 assert.ok(!ids.has(item.id),'duplicate '+item.id); ids.add(item.id);
 assert.ok(/^g11-ch(?:[1-9]|1[0-2])-ex\d+\.\d+-q\d+(?:-[ivx]+)?$/.test(item.id),'invalid id '+item.id);
 assert.ok(Number.isInteger(item.englishPrintedPage)&&item.englishPrintedPage>0,item.id);
 assert.ok(Number.isInteger(item.tamilPrintedPage)&&item.tamilPrintedPage>0,item.id);
 assert.ok(['pending','approved'].includes(item.tamilEditorial),item.id);
 if(item.liveVerified) assert.ok(item.deployed&&item.merged&&item.ciPassed,'invalid live state '+item.id);
 if(item.deployed) assert.ok(item.merged&&item.ciPassed,'invalid deployment state '+item.id);
 if(item.merged) assert.ok(item.ciPassed,'invalid merge state '+item.id);
 if(item.status!=='draft') assert.equal(item.mathChecked,false,'unverified source marked mathematically complete '+item.id);
}
for(const id of expectedMissing){
 const item=ledger.items.find(x=>x.id===id);
 assert.ok(item,'missing checkpoint '+id);
 assert.equal(item.status,'missing-source-image-verification',id);
 assert.equal(item.mathChecked,false,id);
 assert.equal(item.ciPassed,false,id);
 assert.equal(item.merged,false,id);
 assert.equal(item.deployed,false,id);
 assert.equal(item.liveVerified,false,id);
 assert.equal(item.tamilEditorial,'pending',id);
 assert.equal(item.englishPdfPage,15,id);
 assert.equal(item.tamilPdfPage,18,id);
}
for(const ch of ledger.chapters){
 const items=ledger.items.filter(x=>x.id.startsWith(ch.chapterId+'-'));
 for(const [field,fn] of [
 ['draftedSubparts',x=>x.status==='draft'],
 ['mathematicallyCheckedSubparts',x=>x.mathChecked],
 ['ciPassed',x=>x.ciPassed],
 ['merged',x=>x.merged],
 ['liveVerified',x=>x.liveVerified],
 ['tamilEditorialApproved',x=>x.tamilEditorial==='approved']
 ]) assert.equal(ch[field],items.filter(fn).length,ch.chapterId+': '+field);
}
assert.ok(manifest && typeof manifest==='object','source manifest missing');
console.log('PASS Grade 11 ledger state machine, 12 chapter aggregates, 8 source-image blockers, manifest presence');
