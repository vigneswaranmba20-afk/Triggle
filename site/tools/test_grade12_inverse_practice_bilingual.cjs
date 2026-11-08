'use strict';
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const html=fs.readFileSync(path.join(__dirname,'../grade12-inverse-matrix-practice.html'),'utf8');
for(const marker of ['Original Triggle supplementary practice','not textbook-exact coverage','தமிழ் மனித ஆசிரியர் மொழி ஆய்வு நிலுவையில்','aria-label','aria-labelledby','document.documentElement.lang','Switch to English','Switch to Tamil']){
 assert.ok(html.includes(marker),'Missing accessibility/fidelity marker: '+marker);
}
assert.ok(!/<script[^>]+src=/.test(html),'Offline practice must not require external scripts');
const multiply=(a,b)=>[[a[0][0]*b[0][0]+a[0][1]*b[1][0],a[0][0]*b[0][1]+a[0][1]*b[1][1]],[a[1][0]*b[0][0]+a[1][1]*b[1][0],a[1][0]*b[0][1]+a[1][1]*b[1][1]]];
const A=[[2,1],[3,2]], inverse=[[2,-1],[-3,2]], identity=[[1,0],[0,1]];
assert.equal(A[0][0]*A[1][1]-A[0][1]*A[1][0],1);
assert.deepEqual(multiply(A,inverse),identity);
assert.deepEqual(multiply(inverse,A),identity);
assert.ok(html.includes('2 × 2 − 1 × 3 = 1'),'Student-facing determinant arithmetic must match verification');
assert.ok(html.includes('2×2 + 1×(−3)'),'Student-facing product check must match verification');
console.log('PASS Grade 12 bilingual offline inverse practice: determinant, both products, accessible language toggle and fidelity labels');
