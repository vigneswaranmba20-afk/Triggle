'use strict';
const assert = require('node:assert/strict');
const ledger = require('../../docs/coverage/grade-11-2025.json');
assert.equal(ledger.grade,11);
assert.equal(ledger.chapters.length,12);
const ids=['q4-v','q4-vi','q5','q6','q7','q8','q9','q10'];
for(const suffix of ids){
 const id='g11-ch1-ex1.1-'+suffix;
 const matches=ledger.items.filter(item=>item.id===id);
 assert.equal(matches.length,1,id+' must appear exactly once');
 const item=matches[0];
 assert.equal(item.englishPrintedPage,7,id);
 assert.equal(item.englishPdfPage,15,id);
 assert.equal(item.tamilPrintedPage,10,id);
 assert.equal(item.tamilPdfPage,18,id);
 assert.equal(item.mathChecked,false,id);
 assert.equal(item.ciPassed,false,id);
 assert.equal(item.merged,false,id);
 assert.equal(item.liveVerified,false,id);
 assert.equal(item.tamilEditorial,'pending',id);
 assert.match(item.status,/missing/,id);
}
for(const item of ledger.items) assert.equal(ledger.items.filter(x=>x.id===item.id).length,1,item.id);
console.log('PASS Grade 11 Exercise 1.1 remaining source inventory: 8 distinct missing IDs; no premature verified/live claims');
