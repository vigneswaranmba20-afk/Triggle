'use strict';
// Grade 12-only coverage audit: reject inflated chapter counts, unsupported
// publication claims and missing per-question source evidence.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const ledger = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../../docs/grade-12/coverage-2025.json'),'utf8'));
assert.equal(ledger.grade,12);
assert.equal(ledger.chapterCount,12);
assert.equal(ledger.chapterStatus.length,12);
assert.equal(ledger.inventoryComplete,false);
const ids = new Set();
for (let ch=1;ch<=12;ch++) {
 const row=ledger.chapterStatus.find(x=>x.chapter===ch);
 assert.ok(row,'missing chapter '+ch);
 const verified=ledger.items.filter(x=>x.chapter===ch&&x.status==='mathematically_verified').length;
 assert.equal(row.verifiedSubparts,verified,'verified count mismatch chapter '+ch);
 assert.equal(row.mergedSubparts,ledger.items.filter(x=>x.chapter===ch&&x.merged===true).length);
 assert.equal(row.liveVerifiedSubparts,ledger.items.filter(x=>x.chapter===ch&&x.liveVerified===true).length);
 if(row.exerciseInventory==='UNKNOWN')assert.equal(row.missingSubparts,'UNKNOWN');
}
for(const item of ledger.items) {
 assert.ok(!ids.has(item.id),'duplicate '+item.id); ids.add(item.id);
 assert.match(item.id,new RegExp('^g12-ch'+item.chapter+'-ex'));
 assert.ok(item.sourceVerified===true);
 assert.ok(item.bilingualTextCheckedAgainstSource===true);
 assert.ok(item.sourcePages,'missing sourcePages '+item.id);
 for(const lang of ['english','tamil']) {
  const src=item.sourcePages[lang];
  assert.ok(src&&Number.isInteger(src.pdfPage)&&Number.isInteger(src.printedPage)&&src.volume>=1,item.id+' '+lang);
 }
 assert.ok(['pending','approved'].includes(item.tamilEditorialReview));
 assert.ok(!item.liveVerified||item.merged,'live but not merged '+item.id);
 assert.ok(item.ci!=='passed'||item.browser==='passed','CI claim without browser validation '+item.id);
}
console.log('PASS Grade 12: twelve chapter counts, source evidence, unique IDs and honest publication flags');
