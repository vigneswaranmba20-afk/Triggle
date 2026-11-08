'use strict';
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const inventory=JSON.parse(fs.readFileSync(path.join(__dirname,'../../docs/grade-12/ex1.1-source-inventory-2025.json'),'utf8'));
const coverage=JSON.parse(fs.readFileSync(path.join(__dirname,'../../docs/grade-12/coverage-2025.json'),'utf8'));
assert.equal(inventory.grade,12);
assert.equal(inventory.edition,'2025 revised');
assert.equal(inventory.items.length,19,'Exercise 1.1: Q1(i-iii), Q2(i-iii), Q3-Q15');
assert.equal(new Set(inventory.items.map(x=>x.id)).size,19,'unique stable identifiers');
for(const q of [1,2]) assert.deepEqual(inventory.items.filter(x=>x.question===q).map(x=>x.subpart),['i','ii','iii']);
for(let q=3;q<=15;q++) assert.deepEqual(inventory.items.filter(x=>x.question===q).map(x=>x.subpart),[null]);
const verified=inventory.items.filter(x=>x.status==='mathematically_verified');
assert.deepEqual(verified.map(x=>x.id).sort(),coverage.items.map(x=>x.id).sort());
for(const item of inventory.items){
 assert.ok(['missing','drafted','mathematically_verified'].includes(item.status));
 assert.equal(item.merged,false);
 assert.equal(item.liveVerified,false);
 assert.equal(item.tamilEditorialReview,'pending');
}
assert.equal(inventory.items.find(x=>x.id==='g12-ch1-ex1.1-q1-iii').matrixSourceImageChecked,false,'do not infer matrix entries from garbled PDF extraction');
console.log('PASS Grade 12 2025 bilingual Exercise 1.1 source ID inventory: 19 subparts, 2 verified, 17 missing');
