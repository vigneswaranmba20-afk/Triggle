'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const katex=require('../assets/vendor/katex/katex.min.js');
const root=path.join(__dirname,'..');
const html=fs.readFileSync(path.join(root,'matrix-pilot.html'),'utf8');
const archived=fs.readFileSync(path.join(root,'../docs/history/discontinued-explanation-modes/matrix-pilot.html.txt'),'utf8');
const sw=fs.readFileSync(path.join(root,'service-worker.js'),'utf8');
const lesson=JSON.parse(fs.readFileSync(path.join(root,'../docs/curriculum/grade-12/batches/g12-ch1-ex1-1.json'),'utf8')).records.find(r=>r.id==='g12-ch1-ex1.1-q8');
assert.ok(lesson,'Existing source-verified Q8 must remain present');
assert.match(lesson.q.en,/find A/i);
assert.match(lesson.answer,/\u00b1\[\[6, 2, 1; 5, 2, 2; 6, 2, 3\]\]/);
assert.ok(html.includes("location.replace('./index.html?class=12&question=g12-ch1-ex1.1-q8')"));
assert.ok(!/role="tab|data-mode|Detailed mode|Exam mode/.test(html));
assert.ok(!fs.existsSync(path.join(root,'assets/matrix-pilot.js')));
assert.ok(sw.includes("'./matrix-pilot.html'")&&!sw.includes('assets/matrix-pilot.js'));
// Retain the mathematical checks on archived intermediate working as review evidence.
const tex=[...archived.matchAll(/data-tex="([^"]+)"/g)].map(m=>m[1].replaceAll('&amp;','&').replaceAll('&lt;','<').replaceAll('&gt;','>'));
assert.equal(tex.length,13,'All 13 remaining Exam/Detailed math expressions must be present');
for(const latex of tex){
 const math=katex.renderToString(latex,{displayMode:true,output:'htmlAndMathml',throwOnError:true,trust:false,strict:'error'});
 assert.ok(math.includes('<math')&&!math.includes('katex-error'),'MathML and valid KaTeX: '+latex);
}
const final='A=\\pm\\begin{bmatrix}6&2&1\\\\5&2&2\\\\6&2&3\\end{bmatrix}';
assert.ok(tex.filter(x=>x.includes(final)).length===2,'Exam and Detailed share the same verified final matrix');
const det=J=>J[0][0]*(J[1][1]*J[2][2]-J[1][2]*J[2][1])-J[0][1]*(J[1][0]*J[2][2]-J[1][2]*J[2][0])+J[0][2]*(J[1][0]*J[2][1]-J[1][1]*J[2][0]);
const J=[[2,-4,2],[-3,12,-7],[-2,0,2]],A=[[6,2,1],[5,2,2],[6,2,3]];
assert.equal(det(J),16);assert.equal(det(A),4);assert.equal(det(A.map(row=>row.map(x=>-x))),-4);
const adj=B=>B[0].map((_,row)=>B.map((_,col)=>{const m=B.filter((_,r)=>r!==col).map(r=>r.filter((_,c)=>c!==row));const value=((row+col)%2?-1:1)*(m[0][0]*m[1][1]-m[0][1]*m[1][0]);return value===0?0:value;}));
assert.deepEqual(adj(A),J);assert.deepEqual(adj(A.map(row=>row.map(x=>-x))),J);
console.log('PASS retired Q8 redirect, archived intermediate mathematics, valid KaTeX and both verified ± matrices.');
