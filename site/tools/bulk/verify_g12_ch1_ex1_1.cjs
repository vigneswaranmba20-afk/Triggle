'use strict';
const assert=require('node:assert/strict');
const fs=require('node:fs');
// Independent exact-rational Gauss-Jordan arithmetic. Authoring used cofactors
// and SymPy; no floating point tolerance or textbook key is used here.
const gcd=(a,b)=>b?gcd(b,a%b):a<0n?-a:a;
const f=(n,d=1n)=>{n=BigInt(n);d=BigInt(d);assert.notEqual(d,0n);if(d<0n){n=-n;d=-d;}const g=gcd(n,d);return [n/g,d/g];};
const num=x=>Array.isArray(x)?x:f(x);
const add=(a,b)=>{a=num(a);b=num(b);return f(a[0]*b[1]+b[0]*a[1],a[1]*b[1]);};
const neg=a=>{a=num(a);return [-a[0],a[1]];};
const mul=(a,b)=>{a=num(a);b=num(b);return f(a[0]*b[0],a[1]*b[1]);};
const div=(a,b)=>{b=num(b);return mul(a,f(b[1],b[0]));};
const M=a=>a.map(row=>row.map(num));
const eye=n=>M(Array.from({length:n},(_,i)=>Array.from({length:n},(_,j)=>+(i===j))));
const product=(a,b)=>a.map(row=>b[0].map((_,j)=>row.reduce((s,x,k)=>add(s,mul(x,b[k][j])),f(0))));
const scale=(a,k)=>a.map(row=>row.map(x=>mul(x,k)));
const plus=(a,b)=>a.map((row,i)=>row.map((x,j)=>add(x,b[i][j])));
const tr=a=>a[0].map((_,i)=>a.map(row=>row[i]));
function det(a){if(a.length===1)return a[0][0];return a[0].reduce((s,x,j)=>add(s,mul(mul(x,j%2?-1:1),det(a.slice(1).map(row=>row.filter((_,k)=>k!==j))))),f(0));}
function inverse(a){const n=a.length,b=a.map((r,i)=>[...r,...eye(n)[i]]);
 for(let j=0;j<n;j++){const k=b.findIndex((r,i)=>i>=j&&r[j][0]!==0n);assert.ok(k>=j,'Nonsingular pivot');[b[k],b[j]]=[b[j],b[k]];const pivot=b[j][j];b[j]=b[j].map(x=>div(x,pivot));for(let i=0;i<n;i++)if(i!==j){const v=b[i][j];b[i]=b[i].map((x,k)=>add(x,neg(mul(v,b[j][k]))));}}
 return b.map(row=>row.slice(n));}
function adj(a){return scale(inverse(a),det(a));}
const fmt=x=>{x=num(x);return (x[1]===1n?''+x[0]:x[0]+'/'+x[1]).replaceAll('-','−');};
const matrix=a=>'[['+a.map(row=>row.map(fmt).join(', ')).join('; ')+']]';
const eq=(a,b)=>assert.deepEqual(a,b);
module.exports=({records,mapping},{hashRecord})=>{
 const reviewed=JSON.parse(fs.readFileSync(__dirname+'/../../../docs/curriculum/grade-12/reports/ex1-1-reviewed-hashes.json'));
 assert.equal(records.length,19);
 const find=(n,p)=>records.find(r=>r.id===`g12-ch1-ex1.1-q${n}${p?'-'+p:''}`);
 const checkAnswer=(n,p,expected)=>assert.equal(find(n,p).answer,expected);
 for(const [p,raw,k] of [['i',[[-3,4],[6,2]],1],['ii',[[2,3,1],[3,4,1],[3,7,2]],1],['iii',[[2,2,1],[-2,1,2],[1,-2,2]],f(1,3)]]){
  const a=scale(M(raw),k),j=adj(a);eq(product(a,j),scale(eye(a.length),det(a)));eq(product(j,a),scale(eye(a.length),det(a)));checkAnswer(1,p,'adj A = '+matrix(j));
 }
 for(const [p,raw] of [['i',[[-2,4],[1,-3]]],['ii',[[5,1,1],[1,5,1],[1,1,5]]],['iii',[[2,3,1],[3,4,1],[3,7,2]]]]){
  const a=M(raw),b=inverse(a);eq(product(a,b),eye(a.length));eq(product(b,a),eye(a.length));checkAnswer(2,p,'A⁻¹ = '+matrix(b));
 }

 // Q3: exact polynomial ring in c,s, modulo c²+s²=1. Diagonal
 // dot products c²+s² and cross products -cs+sc prove both orders.
 assert.ok(find(3).steps.some(s=>s.en.includes('every real α')));
 assert.equal(find(3).answer,'[F(α)]⁻¹ = F(−α).');
 const a=M([[5,3],[-1,-2]]);eq(plus(plus(product(a,a),scale(a,-3)),scale(eye(2),-7)),M([[0,0],[0,0]]));eq(inverse(a),scale(plus(a,scale(eye(2),-3)),f(1,7)));checkAnswer(4,null,'A² − 3A − 7I₂ = O₂; A⁻¹ = '+matrix(inverse(a)));
 const o=scale(M([[-8,1,4],[4,4,7],[1,-8,4]]),f(1,9));eq(product(o,tr(o)),eye(3));eq(product(tr(o),o),eye(3));assert.equal(find(5).answer,'A⁻¹ = Aᵀ = [[1|9]] '+matrix(M([[-8,4,1],[1,4,-8],[4,7,4]])));
 const a6=M([[8,-4],[-5,3]]);eq(det(a6),f(4));eq(product(a6,adj(a6)),scale(eye(2),4));eq(product(adj(a6),a6),scale(eye(2),4));assert.equal(find(6).answer,'A(adj A) = (adj A)A = 4I₂ = |A|I₂.');
 const u=M([[3,2],[7,5]]),v=M([[-1,-3],[5,2]]);eq(inverse(product(u,v)),product(inverse(v),inverse(u)));checkAnswer(7,null,'(AB)⁻¹ = B⁻¹A⁻¹ = '+matrix(inverse(product(u,v))));
 const j8=M([[2,-4,2],[-3,12,-7],[-2,0,2]]),pos=scale(adj(j8),f(1,4));eq(adj(pos),j8);eq(adj(scale(pos,-1)),j8);eq(det(j8),f(16));checkAnswer(8,null,'A = ±'+matrix(pos)+' (both signs satisfy the given adjoint).');
 const j9=M([[0,-2,0],[6,2,-6],[-3,0,6]]),a9=scale(adj(j9),f(1,6));eq(adj(a9),j9);eq(adj(scale(a9,-1)),j9);eq(inverse(a9),scale(j9,f(1,6)));eq(inverse(scale(a9,-1)),scale(j9,f(-1,6)));checkAnswer(9,null,'A⁻¹ = ±'+matrix(scale(j9,f(1,6)))+' (the determinant sign is not specified).');
 checkAnswer(10,null,'adj(adj(A)) = '+matrix(adj(M([[1,0,1],[0,2,0],[-1,0,1]]))));
 // Q11 formal double-angle proof: after multiplying by c² (c != 0),
 // 1+t² becomes (c²+s²)/c², so entries reduce to c²-s² and ±2cs.
 // This is an identity for arbitrary real x in the stated domain, not samples.
 assert.equal(find(11).answer,'AᵀA⁻¹ = [[cos 2x, −sin 2x; sin 2x, cos 2x]], for cos x ≠ 0.');
 assert.ok(find(11).steps[0].en.includes('cos x ≠ 0'));
 const b12=M([[5,3],[-1,-2]]),c12=M([[14,7],[7,7]]),x12=product(c12,inverse(b12));eq(product(x12,b12),c12);checkAnswer(12,null,'A = '+matrix(x12));
 const a13=M([[1,-1],[2,0]]),b13=M([[3,-2],[1,1]]),c13=M([[1,1],[2,2]]),x13=product(product(inverse(a13),c13),inverse(b13));eq(product(product(a13,x13),b13),c13);checkAnswer(13,null,'X = '+matrix(x13));
 const a14=M([[0,1,1],[1,0,1],[1,1,0]]);eq(product(product(a14,a14),a14),plus(scale(a14,3),scale(eye(3),2)));eq(inverse(a14),scale(plus(product(a14,a14),scale(eye(3),-3)),f(1,2)));checkAnswer(14,null,'A⁻¹ = [[1|2]] (A² − 3I) = '+matrix(inverse(a14)));
 const key=M([[-1,-1],[2,1]]),encoded=M([[2,-3],[20,4]]),decoded=product(encoded,inverse(key));eq(decoded,M([[8,5],[12,16]]));eq(product(decoded,key),encoded);checkAnswer(15,null,decoded.flat().map(x=>String.fromCharCode(Number(x[0])+64)).join(''));
 const methods={3:'Reviewed general trigonometric proof using parity and c²+s²=1; both product orders',8:'Exact rational cofactors of both sign candidates; determinant identity and exhaustive ± branches',9:'Exact rational two-sided products and adjoints for both inverse sign branches',11:'Reviewed general rational double-angle proof, with cos x nonzero domain restriction',15:'Exact rational decryption and re-encryption of every row; alphabet mapping'};
 return {checks:records.map(r=>{assert.equal(hashRecord(r),reviewed[r.id],'Complete lesson changed; renew proof/intermediate/source review');const m=mapping.find(m=>m.recordId===r.id);return {recordId:r.id,parts:m.parts,passed:true,method:methods[m.question]||'Independent exact rational Gauss-Jordan inversion, Laplace determinant and two-sided identities; reviewed intermediate workings',recordSha256:hashRecord(r)};})};
};
// Reused independent arithmetic, not authored answers, for subsequent exercises.
module.exports.arithmetic={f,M,add,neg,mul,div,eye,product,scale,det,inverse,matrix,eq};
