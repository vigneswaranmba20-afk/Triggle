'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const katex=require('../assets/vendor/katex/katex.min.js');
const root=path.join(__dirname,'..');
const html=fs.readFileSync(path.join(root,'matrix-pilot.html'),'utf8');
const js=fs.readFileSync(path.join(root,'assets/matrix-pilot.js'),'utf8');
const sw=fs.readFileSync(path.join(root,'service-worker.js'),'utf8');
const lesson=JSON.parse(fs.readFileSync(path.join(root,'../docs/curriculum/grade-12/batches/g12-ch1-ex1-1.json'),'utf8')).records.find(r=>r.id==='g12-ch1-ex1.1-q8');
assert.ok(lesson,'Existing source-verified Q8 must remain present');
assert.match(lesson.q.en,/find A/i);
assert.match(lesson.answer,/\u00b1\[\[6, 2, 1; 5, 2, 2; 6, 2, 3\]\]/);
for(const mode of ['exam','learn','fun']){
 assert.ok(html.includes('id="tab-'+mode+'"'));
 assert.ok(html.includes('id="panel-'+mode+'"'));
 assert.ok(html.includes('data-mode="'+mode+'"'));
}
assert.equal((html.match(/data-step="/g)||[]).length,11,'Six detailed steps plus five funny clues');
assert.equal((html.match(/data-question="/g)||[]).length,2);
assert.match(html,/data-check="sign"/);
assert.match(html,/data-check="scope"/);
assert.match(html,/Tamil pending/);
assert.match(html,/g12-ch1-ex1.1-q8/);
assert.match(html,/No marks, labels, logins, or analytics/);
assert.ok(sw.includes("'./matrix-pilot.html'")&&sw.includes("'./assets/matrix-pilot.js'"));
assert.ok(!/(?:fetch\(|XMLHttpRequest|sendBeacon|localStorage|sessionStorage)/.test(js),'Pilot must not collect or transmit child data');
const tex=[...html.matchAll(/data-tex="([^"]+)"/g)].map(m=>m[1].replaceAll('&amp;','&').replaceAll('&lt;','<').replaceAll('&gt;','>'));
assert.ok(tex.length>=16,'Enough authored diagrams and equations');
for(const latex of tex){
 const math=katex.renderToString(latex,{displayMode:true,output:'htmlAndMathml',throwOnError:true,trust:false,strict:'error'});
 assert.ok(math.includes('<math')&&!math.includes('katex-error'),'MathML and valid KaTeX: '+latex);
}
const final='A=\\pm\\begin{bmatrix}6&2&1\\\\5&2&2\\\\6&2&3\\end{bmatrix}';
assert.ok(tex.filter(x=>x.includes(final)).length===3,'All modes must share the same verified final matrix');
const det=J=>J[0][0]*(J[1][1]*J[2][2]-J[1][2]*J[2][1])-J[0][1]*(J[1][0]*J[2][2]-J[1][2]*J[2][0])+J[0][2]*(J[1][0]*J[2][1]-J[1][1]*J[2][0]);
const J=[[2,-4,2],[-3,12,-7],[-2,0,2]],A=[[6,2,1],[5,2,2],[6,2,3]];
assert.equal(det(J),16);assert.equal(det(A),4);assert.equal(det(A.map(row=>row.map(x=>-x))),-4);
const adj=B=>B[0].map((_,row)=>B.map((_,col)=>{const m=B.filter((_,r)=>r!==col).map(r=>r.filter((_,c)=>c!==row));const value=((row+col)%2?-1:1)*(m[0][0]*m[1][1]-m[0][1]*m[1][0]);return value===0?0:value;}));
assert.deepEqual(adj(A),J);assert.deepEqual(adj(A.map(row=>row.map(x=>-x))),J);
console.log('PASS Q8 pilot: 3 styles, 11 learning steps, 2 concept checks, offline, '+tex.length+' valid KaTeX formulae, and both verified ± matrices.');
