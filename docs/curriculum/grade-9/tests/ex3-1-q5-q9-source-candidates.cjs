'use strict';
// 2025 English textbook original pages 93–94 and answer appendix page 316: Exercise 3.1 Q5–Q9 (11 parts) source + polynomial arithmetic gate.
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const root=path.resolve(__dirname,'../../../../');
const katex=require(path.join(root,'site/assets/vendor/katex/katex.min.js'));
const m=JSON.parse(fs.readFileSync(path.join(root,'docs/curriculum/grade-9/candidates/g9-ch3-ex3-1-q5-q9-english-11.json'),'utf8'));
const index=fs.readFileSync(path.join(root,'site/index.html'),'utf8');

assert.equal(m.schemaVersion,1);
assert.equal(m.englishPartCount,11);
assert.equal(m.rows.length,11);
assert.equal(m.imageEvidenceChecked,true);
assert.equal(m.status,'student-source-registered-not-live-verified');
assert.deepEqual(m.sourceOriginalPdfPages,[93,94]);
assert.deepEqual(m.sourceAnswerAppendixPdfPages,[316]);
assert.equal(m.externalApiSpendUsd,0);
assert.equal(m.tamilReview,'pending');
assert.equal(m.teacherReview,'pending');

const expectedIds=[
 'g9-ch3-ex3.1-q5-i','g9-ch3-ex3.1-q5-ii','g9-ch3-ex3.1-q5-iii',
 'g9-ch3-ex3.1-q6-i','g9-ch3-ex3.1-q6-ii','g9-ch3-ex3.1-q6-iii',
 'g9-ch3-ex3.1-q7','g9-ch3-ex3.1-q8',
 'g9-ch3-ex3.1-q9-i','g9-ch3-ex3.1-q9-ii','g9-ch3-ex3.1-q9-iii'
];
assert.deepEqual(m.rows.map(x=>x.id),expectedIds);
assert.equal(new Set(expectedIds).size,11);

let renders=0,steps=0;
for(const row of m.rows){
 assert.equal(row.translationReview,'pending');
 assert.equal(row.studentPublished,false);
 assert.equal(row.studentRegisteredOnBranch,true,'Student source registration tracked: '+row.id);
 assert(index.includes('data/textbook-exercises/g9-ch3-ex3-1-q3-q9-en.js'),'Source module included in student index');
 assert([93,94].includes(row.sourceEvidence.enPdfPage),'Valid source PDF page for '+row.id);
 assert.equal(row.sourceEvidence.answerEnPdfPage,316);
 assert.equal(row.steps.length,3);
 for(const tex of [row.sourceMathLatex,row.answerMathLatex,...row.steps.map(s=>s.mathLatex)]){
  const rendered=katex.renderToString(tex,{throwOnError:true,trust:false,strict:'error',output:'htmlAndMathml'});
  assert(rendered.includes('katex-html')&&rendered.includes('<math'),'Accessible TeX for '+row.id);
  renders++;
 }
 for(const step of row.steps){
  assert(step.reason.length>=40&&step.equation&&step.mathLatex,'Complete step for '+row.id);
  steps++;
 }
}
assert.equal(renders,55);
assert.equal(steps,33);

// Independent polynomial arithmetic & coefficient-degree witnesses across sample points [-3, -1, 0, 2, 5].
const samples=[-3,-1,0,2,5];
const close=(a,b,id)=>assert(Math.abs(a-b)<1e-9,`Polynomial evaluation mismatch for ${id}: ${a} vs ${b}`);
const evalTerms=(terms,x)=>terms.reduce((sum,[p,c])=>sum+c*(x**p),0);

const witnesses=[
 // Q5(i): (6x^2 - 7x + 2) + (6x^3 - 7x + 15) = 6x^3 + 6x^2 - 14x + 17, deg 3
 {id:'g9-ch3-ex3.1-q5-i',fn:x=>(6*x**2-7*x+2)+(6*x**3-7*x+15),terms:[[3,6],[2,6],[1,-14],[0,17]],deg:3},
 // Q5(ii): (7x^3 - 6x + 1) + (7x^2 + 17x - 9) = 7x^3 + 7x^2 + 11x - 8, deg 3
 {id:'g9-ch3-ex3.1-q5-ii',fn:x=>(7*x**3-6*x+1)+(7*x**2+17*x-9),terms:[[3,7],[2,7],[1,11],[0,-8]],deg:3},
 // Q5(iii): (16x^4 - 5x^2 + 9) + (-6x^3 + 7x - 15) = 16x^4 - 6x^3 - 5x^2 + 7x - 6, deg 4
 {id:'g9-ch3-ex3.1-q5-iii',fn:x=>(16*x**4-5*x**2+9)+(-6*x**3+7*x-15),terms:[[4,16],[3,-6],[2,-5],[1,7],[0,-6]],deg:4},
 // Q6(i): (7x^2 + 6x - 1) - (6x - 9) = 7x^2 + 8, deg 2
 {id:'g9-ch3-ex3.1-q6-i',fn:x=>(7*x**2+6*x-1)-(6*x-9),terms:[[2,7],[0,8]],deg:2},
 // Q6(ii): (6y^2 - 7y + 2) - (7y + y^3) = -y^3 + 6y^2 - 14y + 2, deg 3
 {id:'g9-ch3-ex3.1-q6-ii',fn:y=>(6*y**2-7*y+2)-(7*y+y**3),terms:[[3,-1],[2,6],[1,-14],[0,2]],deg:3},
 // Q6(iii): (z^5 - 6z^4 + z) - (6z^2 + 10z - 7) = z^5 - 6z^4 - 6z^2 - 9z + 7, deg 5
 {id:'g9-ch3-ex3.1-q6-iii',fn:z=>(z**5-6*z**4+z)-(6*z**2+10*z-7),terms:[[5,1],[4,-6],[2,-6],[1,-9],[0,7]],deg:5},
 // Q7: (2x^3 + 6x^2 - 5x + 8) + P(x) = 3x^3 - 2x^2 + 6x + 15 => P(x) = x^3 - 8x^2 + 11x + 7
 {id:'g9-ch3-ex3.1-q7',fn:x=>(3*x**3-2*x**2+6*x+15)-(2*x**3+6*x**2-5*x+8),terms:[[3,1],[2,-8],[1,11],[0,7]],deg:3},
 // Q8: (2x^4 + 4x^2 - 3x + 7) - P(x) = 3x^3 - x^2 + 2x + 1 => P(x) = 2x^4 - 3x^3 + 5x^2 - 5x + 6
 {id:'g9-ch3-ex3.1-q8',fn:x=>(2*x**4+4*x**2-3*x+7)-(3*x**3-x**2+2*x+1),terms:[[4,2],[3,-3],[2,5],[1,-5],[0,6]],deg:4},
 // Q9(i): (x^2 - 9)(6x^2 + 7x - 2) = 6x^4 + 7x^3 - 56x^2 - 63x + 18, deg 4
 {id:'g9-ch3-ex3.1-q9-i',fn:x=>(x**2-9)*(6*x**2+7*x-2),terms:[[4,6],[3,7],[2,-56],[1,-63],[0,18]],deg:4},
 // Q9(ii): (7x + 2)(15x - 9) = 105x^2 - 33x - 18, deg 2
 {id:'g9-ch3-ex3.1-q9-ii',fn:x=>(7*x+2)*(15*x-9),terms:[[2,105],[1,-33],[0,-18]],deg:2},
 // Q9(iii): (6x^2 - 7x + 1)(5x - 7) = 30x^3 - 77x^2 + 54x - 7, deg 3
 {id:'g9-ch3-ex3.1-q9-iii',fn:x=>(6*x**2-7*x+1)*(5*x-7),terms:[[3,30],[2,-77],[1,54],[0,-7]],deg:3}
];

for(let i=0;i<witnesses.length;i++){
 const w=witnesses[i],row=m.rows[i];
 assert.equal(row.id,w.id);
 const computedDegree=Math.max(...w.terms.filter(([,c])=>Math.abs(c)>1e-12).map(([p])=>p));
 assert.equal(computedDegree,w.deg,'Independent degree witness for '+w.id);
 assert.equal(row.resultDegree,computedDegree,'Authored degree matches witness for '+w.id);
 for(const x of samples){
  close(w.fn(x),evalTerms(w.terms,x),w.id);
 }
}
console.log('PASS G9 Algebra Ex3.1 Q5–Q9: 11 original-image-audited parts, 55 KaTeX renders, 33 steps, and 55 sample-point polynomial addition/subtraction/multiplication checks.');
