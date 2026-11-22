'use strict';
/* AUD13-02 — independently re-check Grade 9 Ex5.2 Q2/Q5/Q6 mathematical
 * reasoning. Source prompt IDs, English/Tamil fallbacks and final answers
 * are preserved. 2025 textbook page-image editorial verification remains
 * a distinct gate and is not claimed by this test. */
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const src=fs.readFileSync(path.join(__dirname,'../data/textbook-exercises/g9-ch5-ex5-2-en.js'),'utf8');
const sandbox={window:{
  TRIGGLE_CLASSES:{9:{items:[]}},
  TRIGGLE_CURRICULUM:{grades:[{grade:9,chapters:[{id:'g9-ch5',textbookQuestionIds:[]}]}]}
}};
vm.runInNewContext(src,sandbox,{filename:'g9-ch5-ex5-2-en.js'});
const entries=sandbox.window.TRIGGLE_CLASSES[9].items;
assert.equal(entries.length,8,'Preserve eight existing exercise questions');
const get=id=>{
  const q=entries.find(x=>x.id==='g9-ch5-ex5.2-q'+id);
  assert(q,'Expected Q'+id);return q;
};
const expected={
  2:{answer:'(i) Collinear; (ii) Collinear',steps:7},
  5:{answer:'(i) Parallelogram; (ii) Parallelogram',steps:9},
  6:{answer:'(i) Rhombus, side 4√5; (ii) Rhombus (a square), side 1',steps:10}
};
for(const [num,spec] of Object.entries(expected)){
  const q=get(num);
  assert.equal(q.answer,spec.answer,'Do not change published final answer Q'+num);
  assert.equal(q.steps.length,spec.steps,'Full worked steps Q'+num);
  assert.match(q.q.en,new RegExp('(?:collinear|parallelogram|rhombus)','i'),'Original question present Q'+num);
  assert.equal(q.sourceFidelity.status,'pdf-text-checked-en-visual-pending','Do not forge primary source page image evidence');
  assert.equal(q.sourceFidelity.tamilEditorial,'not-in-scope','Do not forge Tamil teaching approval');
  const text=q.steps.map(x=>x.en+' '+x.eq).join(' | ');
  assert.match(text,/distance formula/i,'Class 9 method used Q'+num);
  assert(!/direction vectors match|Compare slopes|AB=C−D|AB=\(−3,−8\)/.test(text),'No invalid or out-of-syllabus method Q'+num);
  assert(q.steps.every(x=>typeof x.en==='string'&&typeof x.ta==='string'&&typeof x.eq==='string'&&x.eq.length),'Bilingual fallback remains explicit');
  assert(q.steps.every(x=>x.ta.startsWith('English explanation (Tamil unchanged):')),'No fictitious Tamil editorial completion');
}
assert.match(get(2).steps.map(s=>s.eq).join(' '),/AB=√.*BC=√|AB=√/,'Lengths derived explicitly');
assert.match(get(2).steps.map(s=>s.eq).join(' '),/3\+2=5/,'Q2 vertical collinearity proof');
assert.match(get(5).steps.map(s=>s.eq).join(' '),/√73/,'Q5 first opposite pair');
assert.match(get(5).steps.map(s=>s.eq).join(' '),/√313/,'Q5 second case');
assert.match(get(6).steps.map(s=>s.eq).join(' '),/AC≠BD/,'Unequal diagonals exclude square');
assert.match(get(6).steps.map(s=>s.eq).join(' '),/AB⊥BC/,'Part ii right-angle check');

// Independent oracle: compute from source coordinates rather than trusting
// any narrative equation in the authored file.
const sq=(A,B)=>(B[0]-A[0])**2+(B[1]-A[1])**2;
const len=(A,B)=>Math.sqrt(sq(A,B));
const collinear=(A,B,C)=>Math.abs(len(A,B)+len(B,C)-len(A,C))<1e-10
 || Math.abs(len(A,B)+len(A,C)-len(B,C))<1e-10
 || Math.abs(len(A,C)+len(B,C)-len(A,B))<1e-10;
assert(collinear([7,-2],[5,1],[3,4]),'Q2 i');
for(const a of [-11,0,7])assert(collinear([a,-2],[a,3],[a,0]),'Q2 ii, arbitrary x=a');
const parallelogram=([A,B,C,D])=>sq(A,B)===sq(C,D)&&sq(B,C)===sq(D,A);
assert(parallelogram([[-3,1],[-6,-7],[3,-9],[6,-1]]),'Q5 i opposite sides');
assert(parallelogram([[-7,-3],[5,10],[15,8],[3,-5]]),'Q5 ii opposite sides');
const rhombus=([A,B,C,D])=>new Set([sq(A,B),sq(B,C),sq(C,D),sq(D,A)]).size===1;
const quad1=[[3,-2],[7,6],[-1,2],[-5,-6]];
const quad2=[[1,1],[2,1],[2,2],[1,2]];
assert(rhombus(quad1),'Q6 i rhombus');
assert.equal(sq(quad1[0],quad1[2]),32,'Q6 i AC²');
assert.equal(sq(quad1[1],quad1[3]),288,'Q6 i BD²');
assert(rhombus(quad2),'Q6 ii rhombus');
assert.equal(sq(quad2[0],quad2[2]),sq(quad2[1],quad2[3]),'Q6 ii equal diagonals');
assert.equal((quad2[1][0]-quad2[0][0])*(quad2[2][0]-quad2[1][0])+
 (quad2[1][1]-quad2[0][1])*(quad2[2][1]-quad2[1][1]),0,'Q6 ii perpendicular adjacent sides');

// Negative controls ensure this oracle would reject tempting false claims.
assert(!collinear([0,0],[1,1],[2,3]),'Reject non-collinear points');
assert(!parallelogram([[0,0],[4,0],[3,1],[0,1]]),'Reject unequal opposite sides');
assert(!rhombus([[0,0],[2,0],[2,1],[0,1]]),'Reject rectangle as rhombus');
console.log('PASS AUD13-02: Grade 9 distance-formula reasoning, answers, invalid-step guards and independent geometry oracle.');
