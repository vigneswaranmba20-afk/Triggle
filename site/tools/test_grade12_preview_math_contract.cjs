'use strict';
/* Grade 12 Chapter 1: independently recompute both adjugates and compare the
   student preview with the source-verified coverage ledger. No paid services. */
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '../..');
const html = fs.readFileSync(path.join(root, 'site/grade-12/adjugate-preview.html'), 'utf8');
const ledger = JSON.parse(fs.readFileSync(path.join(root, 'docs/grade-12/coverage-2025.json'), 'utf8'));
const det2 = m => m[0][0]*m[1][1]-m[0][1]*m[1][0];
const minor = (a,i,j) => a.filter((_,r)=>r!==i).map(row=>row.filter((_,c)=>c!==j));
const det = a => a.length===2 ? det2(a) : a[0].reduce((s,x,j)=>s+(-1)**j*x*det(minor(a,0,j)),0);
const adj = a => a.length===2
 ? [[a[1][1],-a[0][1]],[-a[1][0],a[0][0]]]
 : a.map((row,i)=>row.map((_,j)=>(-1)**(i+j)*det(minor(a,j,i))));
const mul = (a,b) => a.map(row=>b[0].map((_,j)=>row.reduce((s,x,k)=>s+x*b[k][j],0)));
const I = (n,d) => Array.from({length:n},(_,i)=>Array.from({length:n},(_,j)=>i===j?d:0));
const examples = [
 {part:'i',a:[[-3,4],[6,2]],expected:[[2,-4],[-6,-3]],det:-30},
 {part:'ii',a:[[2,3,1],[3,4,1],[3,7,2]],expected:[[1,1,-1],[-3,1,1],[9,-5,-1]],det:2}
];
assert.equal(ledger.chapterCount,12);
assert.equal(ledger.inventoryComplete,false);
for (const {part,a,expected,det:expectedDet} of examples) {
 const id='g12-ch1-ex1.1-q1-'+part;
 const item=ledger.items.find(x=>x.id===id);
 assert.ok(item && item.sourceVerified && item.status==='mathematically_verified',id);
 assert.equal(item.tamilEditorialReview,'pending',id);
 assert.equal(item.merged,false,id);
 assert.equal(item.liveVerified,false,id);
 assert.equal(det(a),expectedDet,id+' determinant');
 assert.deepEqual(adj(a),expected,id+' adjugate');
 assert.deepEqual(mul(a,adj(a)),I(a.length,expectedDet),id+' left identity');
 assert.deepEqual(mul(adj(a),a),I(a.length,expectedDet),id+' right identity');
 assert.match(html,new RegExp('<article data-q="'+part+'">'));
}
assert.match(html,/lang="ta"/);
assert.match(html,/aria-pressed/);
assert.match(html,/Tamil human editorial review pending/);
console.log('PASS Grade 12: 2 bilingual subparts, determinants, adjugates, both identities, coverage and preview markers');
