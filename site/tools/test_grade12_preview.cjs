'use strict';
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const page=fs.readFileSync(path.resolve(__dirname,'../grade-12/adjugate-preview.html'),'utf8');
const ledger=JSON.parse(fs.readFileSync(path.resolve(__dirname,'../../docs/grade-12/coverage-2025.json'),'utf8'));
assert.match(page,/<meta name="viewport"/);
assert.match(page,/<html lang="en">/);
assert.match(page,/id="ta"[^>]*lang="ta"/);
assert.match(page,/aria-pressed="true"/);
assert.match(page,/function language\(lang\)/);
assert.match(page,/\.tamil'\)\.forEach\(x=>x.hidden=lang!=='ta'\)/);
assert.equal((page.match(/<article data-q=/g)||[]).length,3);
for(const part of ['i','ii','iii']){
 assert.match(page,new RegExp('data-q="'+part+'"'));
 const item=ledger.items.find(x=>x.id==='g12-ch1-ex1.1-q1-'+part);
 assert.ok(item&&item.sourceVerified&&item.status==='mathematically_verified');
 assert.equal(item.merged,false);
 assert.equal(item.liveVerified,false);
 assert.equal(item.tamilEditorialReview,'pending');
}
assert.match(page,/Tamil human editorial review pending/);
assert.match(page,/English Vol\. I p\.15 \(PDF 23\)/);
assert.match(page,/Tamil Vol\. I p\.16 \(PDF 24\)/);
assert.match(page,/det\(A\)=2/);
assert.match(page,/det\(A\)=\(−3\)\(2\)−\(4\)\(6\)=−30/);
console.log('PASS Grade 12 bilingual preview structure, source metadata, editorial and publication safeguards');
