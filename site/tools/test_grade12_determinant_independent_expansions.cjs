'use strict';
// Independent determinant audit for Grade 12 supplementary 3×3 adjugate work.
// Not a textbook-question transcription or additional curriculum coverage.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const ledger = JSON.parse(fs.readFileSync(path.join(__dirname, '../../docs/grade-12/coverage-2025.json'), 'utf8'));
const permutations = [[0,1,2],[0,2,1],[1,0,2],[1,2,0],[2,0,1],[2,1,0]];
const parity = p => {
 let inversions=0;
 for(let i=0;i<3;i++)for(let j=i+1;j<3;j++)if(p[i]>p[j])inversions++;
 return inversions%2 ? -1 : 1;
};
const leibniz = a => permutations.reduce((sum,p)=>sum+parity(p)*a[0][p[0]]*a[1][p[1]]*a[2][p[2]],0);
const minor = (a,i,j) => {
 const r=[0,1,2].filter(k=>k!==i),c=[0,1,2].filter(k=>k!==j);
 return a[r[0]][c[0]]*a[r[1]][c[1]]-a[r[0]][c[1]]*a[r[1]][c[0]];
};
const expand = (a,row) => a[row].reduce((sum,v,j)=>sum+((row+j)%2?-1:1)*v*minor(a,row,j),0);
const transpose = a => a[0].map((_,j)=>a.map(row=>row[j]));
const mul = (a,b) => a.map(row=>b[0].map((_,j)=>row.reduce((s,v,k)=>s+v*b[k][j],0)));
let singular=0, invertible=0;
for(let n=0;n<19683;n++){
 let q=n;const e=[];
 for(let i=0;i<9;i++){e.push(q%3-1);q=Math.floor(q/3);}
 const a=[e.slice(0,3),e.slice(3,6),e.slice(6,9)];
 const d=leibniz(a);
 for(let row=0;row<3;row++)assert.equal(expand(a,row),d,'all cofactor rows agree with permutation determinant');
 assert.equal(leibniz(transpose(a)),d,'transpose determinant unchanged');
 const adj=transpose(a.map((_,i)=>a[i].map((_,j)=>((i+j)%2?-1:1)*minor(a,i,j))));
 const target=[[d,0,0],[0,d,0],[0,0,d]];
 assert.deepEqual(mul(a,adj),target,'left adjugate identity');
 assert.deepEqual(mul(adj,a),target,'right adjugate identity');
 if(d===0)singular++;else invertible++;
}
assert.equal(singular+invertible,19683);
assert.equal(ledger.items.length,3,'supplementary test cannot increase textbook coverage');
assert.ok(ledger.items.every(item=>!item.merged&&!item.liveVerified&&item.tamilEditorialReview==='pending'));
console.log('PASS: 19,683 matrices; six-term determinant, three cofactor rows, transpose, two-sided adjugate; singular='+singular+' invertible='+invertible);
