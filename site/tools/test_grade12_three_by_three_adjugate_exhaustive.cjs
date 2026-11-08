'use strict';
// Independent integer arithmetic audit of the 3x3 adjugate identity.
// This is supplementary verification, NOT new textbook-question coverage.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const coverage = JSON.parse(fs.readFileSync(path.join(__dirname,'../../docs/grade-12/coverage-2025.json'),'utf8'));
const det3 = a => a[0][0]*(a[1][1]*a[2][2]-a[1][2]*a[2][1])-a[0][1]*(a[1][0]*a[2][2]-a[1][2]*a[2][0])+a[0][2]*(a[1][0]*a[2][1]-a[1][1]*a[2][0]);
const cofactor = (a,i,j) => {
 const r=[0,1,2].filter(x=>x!==i), c=[0,1,2].filter(x=>x!==j);
 return ((i+j)%2?-1:1)*(a[r[0]][c[0]]*a[r[1]][c[1]]-a[r[0]][c[1]]*a[r[1]][c[0]]);
};
const adj = a => Array.from({length:3},(_,i)=>Array.from({length:3},(_,j)=>cofactor(a,j,i)));
const mul = (a,b) => a.map(row=>[0,1,2].map(j=>row.reduce((sum,v,k)=>sum+v*b[k][j],0)));
const identity = d => [[d,0,0],[0,d,0],[0,0,d]];
const check = a => {
 const d=det3(a), b=adj(a), target=identity(d);
 assert.deepEqual(mul(a,b),target,'A adj(A) = det(A) I');
 assert.deepEqual(mul(b,a),target,'adj(A) A = det(A) I');
};
for(let n=0;n<19683;n++){
 let k=n;const entries=[];
 for(let i=0;i<9;i++){entries.push(k%3-1);k=Math.floor(k/3);}
 check([entries.slice(0,3),entries.slice(3,6),entries.slice(6,9)]);
}
check([[2,3,1],[3,4,1],[3,7,2]]);
check([[2,2,1],[-2,1,2],[1,-2,2]]);
assert.equal(coverage.items.length,3,'supplementary test must not imply new textbook coverage');
assert.ok(coverage.items.every(x=>x.merged===false&&x.liveVerified===false&&x.tamilEditorialReview==='pending'));
console.log('PASS: 19,683 integer 3x3 matrices, both adjugate identities; textbook coverage unchanged (3 drafts, 0 live).');
