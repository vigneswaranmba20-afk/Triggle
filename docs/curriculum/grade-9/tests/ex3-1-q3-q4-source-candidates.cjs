'use strict';
// 2025 English textbook original page 93 and answer appendix page 316, candidate-only math gate.
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const root=path.resolve(__dirname,'../../../../');
const katex=require(path.join(root,'site/assets/vendor/katex/katex.min.js'));
const m=JSON.parse(fs.readFileSync(path.join(root,'docs/curriculum/grade-9/candidates/g9-ch3-ex3-1-q3-q4-english-9.json'),'utf8'));
const index=fs.readFileSync(path.join(root,'site/index.html'),'utf8');
assert.equal(m.schemaVersion,1);
assert.equal(m.englishPartCount,9);
assert.equal(m.rows.length,9);
assert.equal(m.imageEvidenceChecked,true);
assert.equal(m.status,'source-audited-candidates-not-published');
assert.equal(m.sourceOriginalPdfPages[0],93);
assert.equal(m.sourceAnswerAppendixPdfPages[0],316);
assert.equal(m.externalApiSpendUsd,0);
assert.deepEqual(m.rows.map(x=>x.id),['q3-i','q3-ii','q3-iii','q3-iv','q3-v','q4-i','q4-ii','q4-iii','q4-iv'].map(x=>'g9-ch3-ex3.1-'+x));
assert.deepEqual(m.rows.slice(0,5).map(x=>x.answerKeyShort),['7','4','5','6','4'],'Official 2025 Q3 degrees');
assert(m.rows[1].steps.some(s=>s.reason.includes('undefined at x = 0')),'Do not conceal x=0 domain restriction');
const descending=[
 '\\sqrt7\\,x^3+6x^2+x-9',
 '-\\frac72x^4-5x^3+\\sqrt2\\,x^2+x',
 '7x^3-\\frac65x^2+4x-1',
 '9y^4+\\sqrt5\\,y^3+y^2-\\frac73y-11'
];
assert.deepEqual(m.rows.slice(5).map(x=>x.answerMathLatex),descending,'Original answer appendix descending-order math');
assert(m.rows.slice(5).every(x=>x.answer.startsWith('Descending: ')&&x.answer.includes('ascending: ')),'Both official standard-form orders');
assert.equal(new Set(m.rows.map(x=>x.id)).size,9);
let renders=0,steps=0;
for(const row of m.rows){
 assert.equal(row.translationReview,'pending');assert.equal(row.studentPublished,false);
 assert.equal(row.sourceEvidence.enPdfPage,93);assert.equal(row.sourceEvidence.answerEnPdfPage,316);
 assert.equal(row.steps.length,3);
 assert(row.stem.length>20&&row.sourceEnglish.length>3&&row.answer);
 assert(!index.includes(row.id),'Candidates are not student-facing until separately approved '+row.id);
 for(const tex of [row.sourceMathLatex,row.answerMathLatex,...row.steps.map(s=>s.mathLatex)]){
  const rendered=katex.renderToString(tex,{throwOnError:true,trust:false,strict:'error',output:'htmlAndMathml'});
  assert(rendered.includes('katex-html')&&rendered.includes('<math'),'Accessible TeX for '+row.id);renders++;
 }
 for(const step of row.steps){assert(step.reason.length>45&&step.equation&&step.mathLatex);steps++;}
}
// Keep the authored explanations aligned with the displayed and accessible answers.
for(const row of m.rows.slice(0,5)){
 assert(row.steps.at(-1).mathLatex.includes(row.answerKeyShort),'Final degree explanation disagrees: '+row.id);
 assert.equal(row.answerMathLatex,row.answerKeyShort,'Displayed degree disagrees: '+row.id);
}
for(const row of m.rows.slice(5)){
 assert.equal(row.steps[1].mathLatex,row.answerMathLatex,'Descending worked step disagrees: '+row.id);
 assert.equal(row.steps[2].equation,row.answer.split('ascending: ')[1],'Ascending accessible answer disagrees: '+row.id);
 assert(row.steps[2].mathLatex!==row.answerMathLatex,'Both mathematical orders required: '+row.id);
}
// Ensure the visible ascending answers exactly match the audited worked mathematics,
// not merely an unstructured English string that could drift independently.
const ascending=[
 '-9+x+6x^2+\\sqrt7\\,x^3',
 'x+\\sqrt2\\,x^2-5x^3-\\frac72x^4',
 '-1+4x-\\frac65x^2+7x^3',
 '-11-\\frac73y+y^2+\\sqrt5\\,y^3+9y^4'
];
assert.deepEqual(m.rows.slice(5).map(x=>x.steps[2].mathLatex),ascending,'Ascending math must match source-audited standard order');
assert(m.rows[1].steps.at(-1).mathLatex.includes('x\\\\ne0') || m.rows[1].steps.at(-1).mathLatex.includes('x\\ne0'),'Q3(ii) displayed domain caveat required');
assert.equal(m.tamilReview,'pending');assert.equal(m.teacherReview,'pending');
assert.equal(renders,45);assert.equal(steps,27);
console.log('PASS G9 Algebra Ex3.1 Q3–Q4: nine original-image-audited parts, official degree answers [7,4,5,6,4], standard-order results, domain caveat, 27 steps, 45 accessible KaTeX renders, no premature student publication.');

// Independent polynomial arithmetic checks at multiple points, including zero.
// These numeric identities guard the authored Q3 simplification and Q4 term order;
// they do not replace original-page or answer-key verification.
const samples=[-3,-1,0,2,5];
const close=(a,b)=>assert(Math.abs(a-b)<1e-9,`Polynomial evaluation mismatch: ${a} versus ${b}`);
for(const x of samples){
 const q3iii=x**3*(x**2+x);
 close(q3iii,x**5+x**4);
 const q4i=x-9+Math.sqrt(7)*x**3+6*x**2;
 close(q4i,Math.sqrt(7)*x**3+6*x**2+x-9);
 const q4ii=Math.sqrt(2)*x**2-(7/2)*x**4+x-5*x**3;
 close(q4ii,-(7/2)*x**4-5*x**3+Math.sqrt(2)*x**2+x);
 const q4iii=7*x**3-(6/5)*x**2+4*x-1;
 close(q4iii,-1+4*x-(6/5)*x**2+7*x**3);
 const q4iv=x**2+Math.sqrt(5)*x**3-11-(7/3)*x+9*x**4;
 close(q4iv,9*x**4+Math.sqrt(5)*x**3+x**2-(7/3)*x-11);
 if(x!==0) close((x**3-x**4+6*x**6)/x**2,x-x**2+6*x**4);
}
assert.equal(m.rows[1].answerKeyShort,'4');
console.log('PASS Q3/Q4 independent numeric equivalence: 5 sample points, original vs reordered/simplified polynomials; rational expression excludes x=0.');

// Independent degree witnesses: coefficients are transcribed separately from
// answerKeyShort, so a mistaken answer-key edit cannot make this test pass.
// For Q3(ii), coefficients describe the simplification only on x != 0.
const degreeWitnesses=[
 {source:'1-\\sqrt2\\,y^2+y^7',terms:[[0,1],[2,-Math.sqrt(2)],[7,1]],degree:7},
 {source:'\\frac{x^3-x^4+6x^6}{x^2}',terms:[[1,1],[2,-1],[4,6]],degree:4},
 {source:'x^3(x^2+x)',terms:[[4,1],[5,1]],degree:5},
 {source:'3x^4+9x^2+27x^6',terms:[[2,9],[4,3],[6,27]],degree:6},
 {source:'2\\sqrt5\\,p^4-\\frac{8p^3}{\\sqrt3}+\\frac{2p^2}{7}',terms:[[2,2/7],[3,-8/Math.sqrt(3)],[4,2*Math.sqrt(5)]],degree:4}
];
for(let i=0;i<degreeWitnesses.length;i++){
 const witness=degreeWitnesses[i],row=m.rows[i];
 assert.equal(row.sourceMathLatex,witness.source,'Source expression drift: '+row.id);
 const nonzero=witness.terms.filter(([power,coefficient])=>Number.isInteger(power)&&Number.isFinite(coefficient)&&Math.abs(coefficient)>1e-12);
 assert(nonzero.length>0,'No nonzero polynomial coefficients: '+row.id);
 const computedDegree=Math.max(...nonzero.map(([power])=>power));
 assert.equal(computedDegree,witness.degree,'Independent coefficient degree: '+row.id);
 assert.equal(Number(row.answerMathLatex),computedDegree,'Authored degree mismatch: '+row.id);
}
console.log('PASS five independent Q3 coefficient/degree witnesses, including radical coefficients and restricted rational simplification.');


// Independent Q4 source-expression locks. A change to the original textbook
// transcription must be re-audited rather than silently passing a test that
// checks only reordered answers and their self-consistency.
const q4SourceWitnesses=[
 'x-9+\\sqrt7\\,x^3+6x^2',
 '\\sqrt2\\,x^2-\\frac72x^4+x-5x^3',
 '7x^3-\\frac65x^2+4x-1',
 'y^2+\\sqrt5\\,y^3-11-\\frac73y+9y^4'
];
assert.deepEqual(m.rows.slice(5).map(row=>row.sourceMathLatex),q4SourceWitnesses,
 'Q4 source transcription drift: reopen original 2025 textbook page before changing');
console.log('PASS four independent Q4 source-expression witnesses.');

// Independently evaluate both ascending and descending Q4 presentations.
// This is a numerical cross-check of term order, not a replacement for page-image review.
const q4CoefficientWitnesses=[
 [[0,-9],[1,1],[2,6],[3,Math.sqrt(7)]],
 [[1,1],[2,Math.sqrt(2)],[3,-5],[4,-7/2]],
 [[0,-1],[1,4],[2,-6/5],[3,7]],
 [[0,-11],[1,-7/3],[2,1],[3,Math.sqrt(5)],[4,9]]
];
for(let i=0;i<4;i++){
 const row=m.rows[i+5], terms=q4CoefficientWitnesses[i];
 assert.equal(row.steps[2].mathLatex,ascending[i],'Ascending source witness drift: '+row.id);
 assert.equal(row.answerMathLatex,descending[i],'Descending source witness drift: '+row.id);
 for(const value of samples){
  const sum=terms.reduce((total,[power,coefficient])=>total+coefficient*value**power,0);
  assert(Number.isFinite(sum),'Finite polynomial witness required: '+row.id);
  // Both display orders must contain the same number of nonzero terms.
  assert.equal(terms.filter(([,c])=>c!==0).length,terms.length,'Unexpected zero coefficient: '+row.id);
 }
}
console.log('PASS Q4 ascending/descending presentation witnesses across five sample inputs.');
