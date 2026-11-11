'use strict';
const assert=require('node:assert/strict'),M=require('../assets/matrix-core.js');
const det2=A=>A[0][0]*A[1][1]-A[0][1]*A[1][0];
const det3=A=>A[0][0]*(A[1][1]*A[2][2]-A[1][2]*A[2][1])-A[0][1]*(A[1][0]*A[2][2]-A[1][2]*A[2][0])+A[0][2]*(A[1][0]*A[2][1]-A[1][1]*A[2][0]);
const independentRank=A=>{
 if(A.length===3&&A[0].length===3&&det3(A))return 3;
 for(let r=0;r<A.length;r++)for(let s=r+1;s<A.length;s++)for(let c=0;c<A[0].length;c++)for(let d=c+1;d<A[0].length;d++)if(A[r][c]*A[s][d]-A[r][d]*A[s][c])return 2;
 return A.some(r=>r.some(Boolean))?1:0;
};
assert.equal(M.fmt(M.q(-4,-6)),'2/3');assert.equal(M.fmt(M.add(M.q(1,3),M.q(1,6))),'1/2');
assert.throws(()=>M.div(1,0));assert.throws(()=>M.q(1,0));assert.throws(()=>M.product([[1,2]],[[1,2]]));
assert.deepEqual(M.numbers(M.cofactors([[1,2],[3,4]])),[[4,-3],[-2,1]]);
assert.deepEqual(M.numbers(M.adjoint([[1,2],[3,4]])),[[4,-2],[-3,1]]);
let seed=7141;const rand=()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed%7-3;};
let nonsingular=0,singular=0;
for(const n of [2,3])for(let t=0;t<160;t++){
 const A=Array.from({length:n},()=>Array.from({length:n},rand));if(t%5===0)A[1]=[...A[0]];
 const d=n===2?det2(A):det3(A),I=M.identity(n),adj=M.adjoint(A),inv=M.inverse(A);
 assert.equal(M.value(M.det(A)),d||0);assert.equal(M.rank(A),independentRank(A));
 assert(M.same(M.product(A,adj),M.scale(I,d)));assert(M.same(M.product(adj,A),M.scale(I,d)));
 assert.equal(inv!==null,d!==0);
 if(d){nonsingular++;assert(M.same(M.product(A,inv),I));assert(M.same(M.product(inv,A),I));
  assert(M.same(inv,M.scale(adj,M.q(1,d))));assert(M.same(M.inverse(M.transpose(A)),M.transpose(inv)));
  assert(M.same(M.inverse(M.scale(A,3)),M.scale(inv,M.q(1,3))));
  const X=Array.from({length:n},()=>[rand()]),B=M.product(A,X);
  assert(M.same(M.solve(A,B).solution,X));assert(M.same(M.cramer(A,B),X));
 }else singular++;
 for(let i=0;i<n;i++)for(let j=0;j<n;j++){
  const minor=M.numbers(M.minorMatrix(A,i,j)),md=n===2?minor[0][0]:det2(minor);
  assert.equal(M.value(M.cofactor(A,i,j)),((i+j)%2?-1:1)*md||0);
 }
}
const A=[[1,1],[0,1]],B=[[2,0],[0,1]];
assert(!M.same(M.product(A,B),M.product(B,A)));
assert(M.same(M.inverse(M.product(A,B)),M.product(M.inverse(B),M.inverse(A))));
assert(!M.same(M.inverse(M.product(A,B)),M.product(M.inverse(A),M.inverse(B))));
const R=[[1,2,3],[2,4,6],[0,1,2]];
assert.deepEqual(M.numbers(M.row(R,{kind:'swap',target:0,source:2})),[[0,1,2],[2,4,6],[1,2,3]]);
assert.deepEqual(M.numbers(M.row(R,{kind:'scale',target:0,k:M.q(1,2)})),[[.5,1,1.5],[2,4,6],[0,1,2]]);
assert.deepEqual(M.numbers(M.row(R,{kind:'add',target:1,source:0,k:-2})),[[1,2,3],[0,0,0],[0,1,2]]);
assert.throws(()=>M.row(R,{kind:'scale',target:0,k:0}));assert.throws(()=>M.row(R,{kind:'add',target:0,source:0}));
for(const kind of ['swap','scale','add'])assert.equal(M.rank(M.row(R,{kind,target:0,source:1,k:-2})),M.rank(R));
assert(!M.echelon([[1,2],[0,0],[0,1]]).ok);assert(!M.echelon([[1,2],[2,3]]).ok);
assert(M.echelon([[1,2,0],[0,1,2],[0,0,0]]).ok);assert.equal(M.rank([[0,0],[0,0]]),0);
assert.equal(M.solve([[1,1],[2,2]],[[3],[6]]).type,'infinite');
assert.equal(M.solve([[1,1],[2,2]],[[3],[7]]).type,'none');
assert.equal(M.cramer([[1,1],[2,2]],[[3],[7]]),null);
assert.equal(M.solve([[1,0,1],[0,1,1]],[[0],[0]]).free,1);
assert.equal(M.solve([[1,0],[0,1]],[[0],[0]]).type,'unique');
const G=[[1,2,1,0],[1,3,0,1]],g1=M.row(G,{kind:'add',target:1,source:0,k:-1}),g2=M.row(g1,{kind:'add',target:0,source:1,k:-2});
assert.deepEqual(M.numbers(g2),[[1,0,3,-2],[0,1,-1,1]]);
assert(M.same(g2.map(r=>r.slice(2)),M.inverse([[1,2],[1,3]])));
assert.deepEqual(M.applyFloat(M.rotation(90),[2,0]),[0,2]);assert.deepEqual(M.applyFloat(M.rotation(90,true),[2,0]),[0,-2]);
for(const angle of [0,30,45,90,180,-60]){
 const p=[2,1],moved=M.applyFloat(M.rotation(angle),p),restored=M.applyFloat(M.rotation(angle,true),moved);
 restored.forEach((x,i)=>assert(Math.abs(x-p[i])<1e-10));
}
for(const msg of ['HI','MATH','GO','A B'])for(const key of [[[1,1],[1,2]],[[2,1],[1,1]]]){
 const e=M.encode(msg,key);assert(M.same(M.product(e.coded,M.inverse(key)),e.plain));
}
assert.throws(()=>M.encode('HI',[[1,2],[2,4]]));
console.log(`PASS exact Grade 12 math: 320 seeded matrices (${nonsingular} invertible, ${singular} singular), cofactor/adjoint identities, independent ranks, row operations, inverse methods, rotation signs and cipher round trips.`);
