/* Exact arithmetic for the small, original Grade 12 concept demonstrations. */
(function (root) {
  'use strict';
  const gcd = (a,b) => b ? gcd(b,a%b) : Math.abs(a);
  const safe = n => { if(!Number.isSafeInteger(n)) throw RangeError('Exact arithmetic range exceeded'); return n; };
  function q(n,d=1) {
    if(n && typeof n==='object') return q(n.n,n.d);
    safe(n);safe(d);if(!d)throw RangeError('Denominator must be nonzero');
    const g=gcd(n,d),sign=d<0?-1:1;return Object.freeze({n:n===0?0:sign*n/g,d:Math.abs(d)/g});
  }
  const add=(a,b)=>{a=q(a);b=q(b);const g=gcd(a.d,b.d);return q(safe(a.n*(b.d/g)+b.n*(a.d/g)),safe(a.d/g*b.d));};
  const neg=a=>{a=q(a);return q(-a.n,a.d);};
  const sub=(a,b)=>add(a,neg(b));
  const mul=(a,b)=>{a=q(a);b=q(b);const g=gcd(a.n,b.d),h=gcd(b.n,a.d);return q(safe((a.n/g)*(b.n/h)),safe((a.d/h)*(b.d/g)));};
  const div=(a,b)=>{b=q(b);if(!b.n)throw RangeError('Cannot divide by zero');return mul(a,q(b.d,b.n));};
  const eq=(a,b)=>{a=q(a);b=q(b);return a.n===b.n&&a.d===b.d;};
  const value=a=>{a=q(a);return a.n/a.d;};
  const fmt=a=>{a=q(a);return a.d===1?String(a.n):a.n+'/'+a.d;};
  function matrix(A) {
    if(!Array.isArray(A)||!A.length||!Array.isArray(A[0])||!A[0].length||A.some(r=>!Array.isArray(r)||r.length!==A[0].length))throw TypeError('A rectangular matrix is required');
    return A.map(r=>r.map(x=>q(x)));
  }
  const identity=n=>Array.from({length:n},(_,i)=>Array.from({length:n},(_,j)=>q(i===j?1:0)));
  const transpose=A=>A[0].map((_,j)=>A.map(r=>q(r[j])));
  const scale=(A,k)=>matrix(A).map(r=>r.map(x=>mul(x,k)));
  function product(A,B) {
    A=matrix(A);B=matrix(B);if(A[0].length!==B.length)throw RangeError('Columns of the first matrix must match rows of the second');
    return A.map(r=>B[0].map((_,j)=>r.reduce((s,x,k)=>add(s,mul(x,B[k][j])),q(0))));
  }
  const same=(A,B)=>A.length===B.length&&A.every((r,i)=>r.length===B[i].length&&r.every((x,j)=>eq(x,B[i][j])));
  const numbers=A=>A.map(r=>r.map(value));
  const square=A=>{A=matrix(A);if(A.length!==A[0].length)throw RangeError('A square matrix is required');return A;};
  const minorMatrix=(A,i,j)=>A.filter((_,r)=>r!==i).map(r=>r.filter((_,c)=>c!==j));
  function det(A) {
    A=square(A);if(A.length===1)return A[0][0];
    return A[0].reduce((s,x,j)=>add(s,mul(mul(j%2?-1:1,x),det(minorMatrix(A,0,j)))),q(0));
  }
  function cofactor(A,i,j) {
    A=square(A);if(i<0||i>=A.length||j<0||j>=A.length)throw RangeError('Entry outside matrix');
    return mul((i+j)%2?-1:1,A.length===1?1:det(minorMatrix(A,i,j)));
  }
  const cofactors=A=>square(A).map((r,i)=>r.map((_,j)=>cofactor(A,i,j)));
  const adjoint=A=>transpose(cofactors(A));
  function row(A,op) {
    const B=matrix(A),{kind,target,source}=op,k=q(op.k===undefined?1:op.k);
    if(!Number.isInteger(target)||target<0||target>=B.length)throw RangeError('Invalid target row');
    if(kind==='scale') {if(!k.n)throw RangeError('Scaling a row by zero loses information');B[target]=B[target].map(x=>mul(x,k));}
    else {
      if(!Number.isInteger(source)||source<0||source>=B.length||source===target)throw RangeError('Choose two different rows');
      if(kind==='swap') [B[target],B[source]]=[B[source],B[target]];
      else if(kind==='add')B[target]=B[target].map((x,j)=>add(x,mul(k,B[source][j])));
      else throw RangeError('Unknown row operation');
    }
    return B;
  }
  function rref(A) {
    let B=matrix(A),r=0;const pivots=[];
    for(let c=0;c<B[0].length&&r<B.length;c++) {
      const p=B.findIndex((x,i)=>i>=r&&x[c].n!==0);if(p<0)continue;
      if(p!==r)B=row(B,{kind:'swap',target:r,source:p});
      B=row(B,{kind:'scale',target:r,k:div(1,B[r][c])});
      for(let i=0;i<B.length;i++)if(i!==r&&B[i][c].n)B=row(B,{kind:'add',target:i,source:r,k:neg(B[i][c])});
      pivots.push(c);r++;
    }
    return {matrix:B,pivots,rank:pivots.length};
  }
  const rank=A=>rref(A).rank;
  function echelon(A) {
    A=matrix(A);let last=-1,zero=false;const pivots=[];
    for(const r of A){const p=r.findIndex(x=>x.n);if(p<0){zero=true;continue;}if(zero||p<=last)return {ok:false,pivots:[]};last=p;pivots.push(p);}
    return {ok:true,pivots};
  }
  function inverse(A) {
    A=square(A);const n=A.length,I=identity(n),reduced=rref(A.map((r,i)=>[...r,...I[i]])).matrix;
    if(!same(reduced.map(r=>r.slice(0,n)),I))return null;
    return reduced.map(r=>r.slice(n));
  }
  function solve(A,B) {
    A=matrix(A);B=matrix(B);if(A.length!==B.length||B[0].length!==1)throw RangeError('One right-hand-side value per equation is required');
    const augmented=A.map((r,i)=>[...r,B[i][0]]),a=rank(A),b=rank(augmented),n=A[0].length,reduced=rref(augmented);
    return {rankA:a,rankAug:b,n,free:n-a,type:a!==b?'none':a===n?'unique':'infinite',
      solution:a===b&&a===n?reduced.matrix.slice(0,n).map(r=>[r[n]]):null,reduced:reduced.matrix};
  }
  function cramer(A,B) {
    A=square(A);B=matrix(B);if(B.length!==A.length||B[0].length!==1)throw RangeError('RHS dimensions must match');
    const d=det(A);if(!d.n)return null;
    return A.map((_,j)=>[div(det(A.map((r,i)=>r.map((x,k)=>k===j?B[i][0]:x))),d)]);
  }
  function rotation(degrees,passive=false) {
    const angle=(passive?-1:1)*degrees*Math.PI/180,c=Math.cos(angle),s=Math.sin(angle);
    const clean=x=>Math.abs(x)<1e-12?0:x;return [[clean(c),clean(-s)],[clean(s),clean(c)]];
  }
  const applyFloat=(A,p)=>A.map(r=>r.reduce((s,x,i)=>s+x*p[i],0));
  const encode=(message,key)=>{
    const text=message.toUpperCase();if(!/^[A-Z ]+$/.test(text)||key.length!==2||key[0].length!==2||!inverse(key))throw RangeError('Use letters/spaces and an invertible 2×2 key');
    const padded=text+(text.length%2?' ':''),plain=[];
    for(let i=0;i<padded.length;i+=2)plain.push([...padded.slice(i,i+2)].map(c=>c===' '?0:c.charCodeAt(0)-64));
    return {plain:matrix(plain),coded:product(plain,key),text};
  };
  const api=Object.freeze({q,add,sub,mul,div,neg,eq,value,fmt,matrix,identity,transpose,scale,product,same,numbers,minorMatrix,det,cofactor,cofactors,adjoint,row,rref,rank,echelon,inverse,solve,cramer,rotation,applyFloat,encode});
  if(typeof module==='object'&&module.exports)module.exports=api;
  root.TriggleMatrixMath=api;
})(typeof window!=='undefined'?window:globalThis);
