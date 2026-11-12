'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm'),path=require('node:path');
const root=path.resolve(__dirname,'..'),katex=require('../assets/vendor/katex/katex.min.js');
const ctx={window:{katex}};
vm.runInNewContext(fs.readFileSync(path.join(root,'assets/math-notation.js'),'utf8'),ctx);
const {render}=ctx.window.TriggleNotation;
const example='n² = (2k+1)² = 4k²+4k+1 = 4(k²+k)+1';
const plain=render(example),aligned=render(example,{alignCoefficientPowers:true});
assert.notEqual(plain,aligned,'New opt-in formatting must change coefficients in powered terms');
assert(!render('4k²').includes('<mrow><mn>4</mn><msup>'),'Unopted chapters retain original output');
assert(aligned.includes('aria-label="4k²"'),'Preserve exact mathematical text');
assert(aligned.includes('<mrow><mn>4</mn><msup><mi>k</mi><mn>2</mn></msup></mrow>'),
  'Coefficient 4 and powered k² must share a native MathML row and baseline');
assert(aligned.includes('4k+1'),'Keep plain algebraic coefficients intact');
assert(aligned.includes('4('),'Do not rewrite equality chain or textbook solution');
for(const [input,mrow] of [
 ['12a²','<mrow><mn>12</mn><msup><mi>a</mi><mn>2</mn></msup></mrow>'],
 ['4k^2','<mrow><mn>4</mn><msup><mi>k</mi><mn>2</mn></msup></mrow>'],
 ['4k³','<mrow><mn>4</mn><msup><mi>k</mi><mn>3</mn></msup></mrow>']
])assert(render(input,{alignCoefficientPowers:true}).includes(mrow),input+' semantics');
assert(render(['Observe: ','4k²'],{alignCoefficientPowers:true}).includes('<mrow><mn>4</mn><msup>'),'Arrays retain opt-in');
const app=fs.readFileSync(path.join(root,'assets/app.js'),'utf8'),html=fs.readFileSync(path.join(root,'index.html'),'utf8');
const sw=fs.readFileSync(path.join(root,'service-worker.js'),'utf8');
assert(app.includes("grade===10&&String(selectedChapter()?.number)==='2'"),
  'Only Grade 10 Chapter 2 invokes the baseline correction');
assert(html.includes('math-notation.js?v=g10-ch2-math-baseline-1'),'Version bump for Android');
assert(sw.includes('scroll2-baseline1'),'Offline cache should refresh');
console.log('PASS coefficient and powered base share a MathML row only in Grade 10 Chapter 2; original text and other grades preserved');
