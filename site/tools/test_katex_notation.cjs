'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm'),path=require('node:path');
// Exercise the exact browser bundle; npm test also runs in Pages' dependency-free job.
const katex=require('../assets/vendor/katex/katex.min.js');
const root=path.resolve(__dirname,'..'),ctx={window:{katex}};
vm.runInNewContext(fs.readFileSync(path.join(root,'assets/math-notation.js'),'utf8'),ctx);
const {render,renderLatex}=ctx.window.TriggleNotation;
for(const [latex,tag] of [
 ['C_{ij}','msub'],['a_{12}','msub'],['M_{21}','msub'],['(-1)^{i+j}','msup'],['A^{-1}','msup'],
 ['\\frac{a+b}{c+d}','mfrac'],['\\sqrt{x^{2}+y^{2}}','msqrt'],
 ['\\begin{bmatrix}-3 & 4 \\\\ 6 & 2\\end{bmatrix}','mtable'],
 ['\\begin{vmatrix}a & b \\\\ c & d\\end{vmatrix}','mtable'],
 ['\\begin{aligned}x&=1+2\\\\&=3\\end{aligned}','mtable'],
 ['\\lim_{x\\to0}\\frac{\\sin x}{x}=1','mfrac'],
 ['\\frac{d}{dx}x^{2}=2x','mfrac'],['\\int_0^1 x\\,dx=\\frac12','msubsup'],
 ['\\vec v\\in\\mathbb{R}^{2},\\quad x\\leq y','mover']
]){
 const html=renderLatex(latex,{fallback:'Readable mathematics',displayMode:true});
 assert.ok(html.includes('<'+tag),latex+' semantic structure');
 assert.ok(html.includes('aria-hidden="true"'),'Visual HTML hidden from assistive tech');
 assert.ok(html.includes('<math'),'Accessible MathML');
 assert.ok(!html.includes('data-math-error'),'Valid TeX must render');
}
const mixed=render(['English / தமிழ்: ',{latex:'C_{12}=-6',fallback:'C₁₂ = −6'},' — இணைக்காரணி']);
assert.ok(mixed.includes('தமிழ்: ')&&mixed.includes('இணைக்காரணி')&&mixed.includes('<msub>'));
for(const latex of ['\\frac{1}{','\\unknowncommand{x}','x'.repeat(12001)]){
 const html=renderLatex(latex,{fallback:'Expression unavailable <safe>'});
 assert.ok(html.includes('data-math-error="true"'));
 assert.ok(html.includes('&lt;safe&gt;')&&!html.includes(latex));
}
const unsafe=renderLatex('\\href{javascript:alert(1)}{x}',{fallback:'x'});
assert.ok(!unsafe.includes('href=')&&!unsafe.includes('<script'));
assert.ok(unsafe.includes('data-math-error')&&!unsafe.includes('\\href'));
assert.ok(!render(['<img onerror=alert(1)>',{latex:'x',fallback:'x'}]).includes('<img'));
assert.ok(renderLatex('\\frac{1}{2}').includes('<mfrac>'));
delete ctx.window.katex;
assert.ok(renderLatex('x',{fallback:'x'}).includes('data-math-error'));
ctx.window.katex=katex;

const batch=require('../../docs/curriculum/grade-12/batches/g12-ch1-ex1-1.json');
function inspect(value){
 if(Array.isArray(value))return value.forEach(inspect);
 if(!value||typeof value!=='object')return;
 if('latex'in value){assert.ok(value.fallback);assert.ok(!render(value).includes('data-math-error'),value.latex);}
 else Object.values(value).forEach(inspect);
}
for(const r of batch.records.slice(0,6)){
 inspect(r);
 const source=r.questionMath.en.map(x=>typeof x==='string'?x:x.fallback).join('');
 assert.equal(source,r.q.en,'Mathematics migration preserves exact question text');
 assert.equal(r.answerMath.fallback,r.answer);
 for(const s of r.steps)if(s.math&&s.eq&&!s.eq.startsWith('Cᵢⱼ')){
  const math=Array.isArray(s.math)?s.math:[s.math];
  assert.equal(math.map(x=>x.fallback).join('; '),s.eq,'No missing calculation in rich display');
 }
}
const q=batch.records[0];
assert.equal(q.steps.length,11);
const cofactorSteps=q.steps.slice(4,8),A=[[-3,4],[6,2]],C=[];
for(let i=0;i<2;i++){
 C[i]=[];
 for(let j=0;j<2;j++){
  const sign=(-1)**(i+j+2),minor=A[1-i][1-j],v=sign*minor;C[i][j]=v;
  const s=cofactorSteps[i*2+j];
  assert.equal(s.eq,`C${i+1}${j+1} = (−1)^(${i+1}+${j+1}) × (${minor}) = ${v}`);
  assert.equal(s.math[0].latex,`C_{${i+1}${j+1}} = (-1)^{${i+1}+${j+1}} \\times  (${minor}) = ${v}`);
 }
}
assert.deepEqual(C,[[2,-6],[-4,-3]]);
const adj=C[0].map((_,i)=>C.map(row=>row[i]));
assert.deepEqual(adj,[[2,-4],[-6,-3]]);
assert.deepEqual(A.map(row=>adj[0].map((_,j)=>row.reduce((s,x,k)=>s+x*adj[k][j],0))),[[-30,0],[0,-30]]);
assert.ok(q.steps[9].math.latex.includes('C^{T}'));
assert.ok(q.steps[1].en.includes('2 × 2 matrix only'));

const html=fs.readFileSync(path.join(root,'index.html'),'utf8'),sw=fs.readFileSync(path.join(root,'service-worker.js'),'utf8');
assert.ok(html.indexOf('vendor/katex/katex.min.js')<html.indexOf('assets/math-notation.js'));
const vendor=path.join(root,'assets/vendor/katex');
const manifest=JSON.parse(fs.readFileSync(path.join(vendor,'manifest.json'),'utf8'));
assert.equal(manifest.version,'0.16.22');
for(const [file,expected] of Object.entries(manifest.files))assert.equal(require('node:crypto').createHash('sha256').update(fs.readFileSync(path.join(vendor,file))).digest('hex'),expected,'Pinned vendor asset '+file);
for(const file of ['katex.min.js','katex.min.css','LICENSE',...fs.readdirSync(path.join(vendor,'fonts')).map(f=>'fonts/'+f)])assert.ok(sw.includes('./assets/vendor/katex/'+file),'Precache '+file);
for(const match of fs.readFileSync(path.join(vendor,'katex.min.css'),'utf8').matchAll(/url\(([^)]+)\)/g))assert.ok(fs.existsSync(path.join(vendor,match[1])));
assert.equal(require('../../package.json').dependencies.katex,'0.16.22');
console.log('PASS structured KaTeX notation, safe fallback, mixed Tamil/English, exact source text, cofactor signs/transpose/two-sided identity, local assets and cache.');
