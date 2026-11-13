'use strict';
const assert=require('node:assert/strict');
// Independent exact-integer proof for textbook Exercise 1.1 Q1(iii).
// A=M/3; adj(A)=adj(M)/9. No floating-point rounding is involved.
const M=[[2,2,1],[-2,1,2],[1,-2,2]];
const expectedAdj=[[6,-6,3],[6,3,-6],[3,6,6]];
const det2=a=>a[0][0]*a[1][1]-a[0][1]*a[1][0];
const minor=(a,i,j)=>a.filter((_,r)=>r!==i).map(row=>row.filter((_,c)=>c!==j));
const cofactor=M.map((row,i)=>row.map((_,j)=>((i+j)%2?-1:1)*det2(minor(M,i,j))));
const adj=cofactor[0].map((_,j)=>cofactor.map(row=>row[j]));
assert.deepEqual(adj,expectedAdj,'independently calculated nine cofactors');
const determinant=M[0].reduce((sum,x,j)=>sum+x*cofactor[0][j],0);
assert.equal(determinant,27);
assert.equal(determinant/27,1,'det(M/3)=det(M)/27');
const multiply=(a,b)=>a.map(row=>b[0].map((_,j)=>row.reduce((sum,x,k)=>sum+x*b[k][j],0)));
const identity=Array.from({length:3},(_,i)=>Array.from({length:3},(_,j)=>i===j?27:0));
assert.deepEqual(multiply(M,adj),identity);
assert.deepEqual(multiply(adj,M),identity);
assert.deepEqual(adj.map(row=>row.map(x=>x/9)),[[2/3,-2/3,1/3],[2/3,1/3,-2/3],[1/3,2/3,2/3]]);
console.log('PASS Grade 12 Q1(iii): nine cofactors, rational scaling, determinant, both multiplication orders');
