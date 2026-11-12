#!/usr/bin/env node
'use strict';
// Compile a reviewed coefficient model, never parse or invent textbook wording.
const fs=require('node:fs'),math=require('../../assets/matrix-core.js'),{hashRecord}=require('../curriculum_bulk.cjs');
const clone=v=>JSON.parse(JSON.stringify(v));
const fraction=x=>math.q(x);
const fmt=x=>math.fmt(x).replaceAll('-','−');
const tex=x=>{x=fraction(x);return x.d===1?String(x.n):`${x.n<0?'-':''}\\frac{${Math.abs(x.n)}}{${x.d}}`;};
const matrixTex=(A,env='bmatrix')=>`\\begin{${env}}${A.map(r=>r.map(tex).join(' & ')).join(' \\\\ ')}\\end{${env}}`;
const matrixText=A=>'[['+A.map(r=>r.map(fmt).join(', ')).join('; ')+']]';
function validateModel(model){
 if(model?.schemaVersion!==1||model.method!=='cramer'||!Array.isArray(model.variables)||![2,3].includes(model.variables.length))throw Error('MODEL_SCHEMA');
 const n=model.variables.length;if(model.variables.some(v=>!v||!/^[a-z]$/.test(v.name)||!['identity','reciprocal'].includes(v.transform)||!['none','positive','nonnegative','nonnegative-integer'].includes(v.constraint||'none'))||new Set(model.variables.map(v=>v.name)).size!==n)throw Error('MODEL_VARIABLES');
 const A=math.matrix(model.A),B=math.matrix(model.B);
 if(A.length!==n||A.some(r=>r.length!==n)||B.length!==n||B.some(r=>r.length!==1))throw Error('MODEL_DIMENSIONS');
 return {A,B};
}
function determinantNode(A,label){
 const terms=A[0].map((coefficient,j)=>{
  const minor=math.minorMatrix(A,0,j),minorValue=math.det(minor),sign=j%2?-1:1;
  return {sign,coefficient,minor,minorValue,value:math.mul(math.mul(sign,coefficient),minorValue)};
 });
 return {kind:'determinant',label,matrix:A,terms,value:math.det(A)};
}
function satisfies(value,constraint){return constraint==='positive'?value.n>0:constraint==='nonnegative'?value.n>=0:constraint==='nonnegative-integer'?value.n>=0&&value.d===1:true;}
function compile(model){
 const {A,B}=validateModel(model),n=A.length,determinant=determinantNode(A,'Δ');
 if(!determinant.value.n)throw Error('CRAMER_NOT_APPLICABLE_SINGULAR_REVIEW_REQUIRED');
 const determinants=model.variables.map((v,j)=>determinantNode(A.map((row,i)=>row.map((x,k)=>k===j?B[i][0]:x)),`Δ_${v.name}`));
 const transformed=determinants.map(d=>math.div(d.value,determinant.value));
 const values=transformed.map((x,i)=>{
  if(model.variables[i].transform==='reciprocal'&&!x.n)throw Error('NO_FINITE_RECIPROCAL_SOLUTION');
  const value=model.variables[i].transform==='reciprocal'?math.div(1,x):x;
  if(!satisfies(value,model.variables[i].constraint||'none'))throw Error('MODEL_CONTEXT_CONSTRAINT_FAILED');return value;
 });
 const substitution=A.map(row=>row.reduce((sum,a,j)=>math.add(sum,math.mul(a,transformed[j])),fraction(0)));
 if(!substitution.every((x,i)=>math.eq(x,B[i][0])))throw Error('SUBSTITUTION_FAILED');
 const ir={schemaVersion:1,family:'CRAMER_LINEAR_SYSTEM',modelHash:hashRecord(model),model:clone(model),
  domain:model.variables.filter(v=>v.transform==='reciprocal').map(v=>({variable:v.name,excludedValue:fraction(0)})),
  determinant,determinants,transformed,values,substitution,
  applicability:{square:true,determinantNonzero:true,uniqueInTransformedVariables:true},
  review:{source:'REQUIRES_SEPARATE_SOURCE_EVIDENCE',language:'PROFESSIONAL_REVIEW_PENDING',release:'NOT_APPROVED'}};
 return clone(ir);
}
function step(en,eq,latex){return {en,eq,math:[{latex,fallback:eq,display:true}]};}
function minorExpansion(A){
 if(A.length===1)return {text:fmt(A[0][0]),latex:tex(A[0][0])};
 return {text:`(${fmt(A[0][0])})(${fmt(A[1][1])}) − (${fmt(A[0][1])})(${fmt(A[1][0])})`,latex:`(${tex(A[0][0])})(${tex(A[1][1])})-(${tex(A[0][1])})(${tex(A[1][0])})`};
}
function render(ir){
 validateModel(ir.model);const vars=ir.model.variables;
 const names=vars.map(v=>v.transform==='reciprocal'?`u_${v.name}`:v.name),steps=[];
 if(ir.domain.length)steps.push(step('Every denominator must be nonzero. Introduce a reciprocal variable for each denominator; these substitutions will be reversed after solving.',
  vars.filter(v=>v.transform==='reciprocal').map(v=>`${v.name} ≠ 0; u_${v.name} = 1/${v.name}`).join('; '),
  vars.filter(v=>v.transform==='reciprocal').map(v=>`${v.name}\\ne0,\\quad u_{${v.name}}=\\frac1{${v.name}}`).join('\\qquad ')));
 steps.push(step('Arrange the coefficients and constants in the same variable order. Each row is one of the equations in the reviewed model.',
  `A = ${matrixText(ir.model.A)}; U = [[${names.join('; ')}]]; B = ${matrixText(ir.model.B)}`,
  `A=${matrixTex(ir.model.A)},\\quad U=\\begin{bmatrix}${names.map(v=>v.replace('_','_{')+(v.includes('_')?'}':'')).join(' \\\\ ')}\\end{bmatrix},\\quad B=${matrixTex(ir.model.B)}`));
 for(const [index,d] of [ir.determinant,...ir.determinants].entries()){
  const label=index===0?'\\Delta':`\\Delta_{${vars[index-1].name}}`;
  const explanation=index===0?'Compute the coefficient determinant.':'Replace only the '+vars[index-1].name+' column of A by the constants B, then compute this determinant.';
  steps.push(step(explanation,`${d.label} = det ${matrixText(d.matrix)}`,`${label}=${matrixTex(d.matrix,'vmatrix')}`));
  d.terms.forEach((term,j)=>{
   const m=minorExpansion(term.minor);
   if(term.minor.length===2)steps.push(step('Delete the first row and column '+(j+1)+'. Evaluate the remaining 2 by 2 minor by multiplying its diagonal entries and subtracting the other diagonal product.',
    `Minor ${j+1} = ${m.text} = ${fmt(term.minorValue)}`,
    `M_{${j+1}}=${m.latex}=${tex(term.minorValue)}`));
   steps.push(step('First-row term '+(j+1)+' is the entry in column '+(j+1)+' times its minor, with the '+(term.sign<0?'minus':'plus')+' sign from the alternating cofactor pattern. Call this term T'+(j+1)+'.',
    `T${j+1} = ${term.sign<0?'−':''}(${fmt(term.coefficient)})(${fmt(term.minorValue)}) = ${fmt(term.value)}`,
    `T_{${j+1}}=${term.sign<0?'-':''}(${tex(term.coefficient)})(${tex(term.minorValue)})=${tex(term.value)}`));
  });
  steps.push(step('Add the signed first-row terms to obtain the determinant.',
   `${d.label} = ${d.terms.map(t=>'('+fmt(t.value)+')').join(' + ')} = ${fmt(d.value)}`,
   `${label}=${d.terms.map(t=>'('+tex(t.value)+')').join('+')}=${tex(d.value)}`));
 }
 steps.push(step('The coefficient determinant is nonzero, so Cramer’s rule applies and gives one unique solution for the transformed variables.',
  `Δ = ${fmt(ir.determinant.value)} ≠ 0`, `\\Delta=${tex(ir.determinant.value)}\\ne0`));
 vars.forEach((v,j)=>{
  const name=names[j],tname=v.transform==='reciprocal'?`u_{${v.name}}`:v.name;
  steps.push(step('Divide the replacement determinant by the coefficient determinant.',
   `${name} = (${fmt(ir.determinants[j].value)})/(${fmt(ir.determinant.value)}) = ${fmt(ir.transformed[j])}`,
   `${tname}=\\frac{\\Delta_{${v.name}}}{\\Delta}=\\frac{${tex(ir.determinants[j].value)}}{${tex(ir.determinant.value)}}=${tex(ir.transformed[j])}`));
  if(v.transform==='reciprocal')steps.push(step('Reverse the reciprocal substitution. A transformed value of zero would not give a finite original variable.',
   `${v.name} = 1/(${fmt(ir.transformed[j])}) = ${fmt(ir.values[j])}`,
   `${v.name}=\\frac1{${tex(ir.transformed[j])}}=${tex(ir.values[j])}`));
 });
 ir.model.A.forEach((row,i)=>{
  const terms=row.map((a,j)=>`(${fmt(a)})(${fmt(ir.transformed[j])})`).join(' + ');
  steps.push(step('Substitute the computed values into equation '+(i+1)+'. Reciprocal variables stand for the original denominators, so this also checks that original equation.',
   `${terms} = ${fmt(ir.substitution[i])} = ${fmt(ir.model.B[i][0])}`,
   `${row.map((a,j)=>`(${tex(a)})(${tex(ir.transformed[j])})`).join('+')}=${tex(ir.substitution[i])}=${tex(ir.model.B[i][0])}`));
 });
 return {steps,answer:vars.map((v,j)=>`${v.name} = ${fmt(ir.values[j])}`).join(', ')+'.',answerMath:{latex:vars.map((v,j)=>`${v.name}=${tex(ir.values[j])}`).join(',\\quad '),fallback:vars.map((v,j)=>`${v.name} = ${fmt(ir.values[j])}`).join(', ')+'.',display:true}};
}
module.exports={validateModel,compile,render,fmt,tex,matrixTex};
if(require.main===module){try{const model=JSON.parse(fs.readFileSync(process.argv[2],'utf8'));console.log(JSON.stringify({reasoning:compile(model),presentation:render(compile(model))},null,2));}catch(e){console.error(e.message);process.exitCode=1;}}
