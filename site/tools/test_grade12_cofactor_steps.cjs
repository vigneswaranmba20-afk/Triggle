'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const A=[[2,3,1],[3,4,1],[3,7,2]];
const expected=[[1,-3,9],[1,1,-5],[-1,1,-1]];
const minor=(i,j)=>A.filter((_,r)=>r!==i).map(row=>row.filter((_,c)=>c!==j));
const C=A.map((row,i)=>row.map((_,j)=>{const m=minor(i,j);return ((i+j)%2?-1:1)*(m[0][0]*m[1][1]-m[0][1]*m[1][0]);}));
assert.deepEqual(C,expected,'all nine cofactors');
const adj=C.map((_,i)=>C.map(row=>row[i]));
assert.deepEqual(adj,[[1,1,-1],[-3,1,1],[9,-5,-1]]);
const det=A[0].reduce((s,v,j)=>s+v*C[0][j],0);
assert.equal(det,2);
const multiply=(X,Y)=>X.map(row=>Y[0].map((_,j)=>row.reduce((s,v,k)=>s+v*Y[k][j],0)));
const identity=A.map((row,i)=>row.map((_,j)=>i===j?det:0));
assert.deepEqual(multiply(A,adj),identity);
assert.deepEqual(multiply(adj,A),identity);
const file=path.resolve(__dirname,'../grade-12/adjugate-preview.html');
if(fs.existsSync(file)){
 const html=fs.readFileSync(file,'utf8');
 const section=html.match(/<article data-q="ii">([\s\S]*?)<\/article>/);
 assert.ok(section,'Q1(ii) visible');
 for(const step of ['C₁₁=8−7=1','C₁₂=−(6−3)=−3','C₁₃=21−12=9','C₂₁=−(6−7)=1','C₂₂=4−3=1','C₂₃=−(14−9)=−5','C₃₁=3−4=−1','C₃₂=−(2−3)=1','C₃₃=8−9=−1','adj(A)=[1 1 −1; −3 1 1; 9 −5 −1]'])assert.ok(section[1].includes(step),'missing '+step);
 assert.match(section[1],/class="tamil" lang="ta" hidden/);
 assert.match(html,/Tamil human editorial review pending/);
}
console.log('PASS Grade 12 Q1(ii) cofactor, adjugate, determinant, identity and preview checks');