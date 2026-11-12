#!/usr/bin/env node
'use strict';
const fs=require('node:fs'),path=require('node:path'),bulk=require('../curriculum_bulk.cjs');
const compiler=require('./trace_cramer.cjs'),critic=require('./trace_cramer_verify.cjs');
const sourcePath='docs/trace/candidates/g12-ex1-4-models.json';
const presentationStep=s=>({en:s.en,eq:s.eq,math:[{latex:s.latex,fallback:s.eq,display:true}]});
function build(data=JSON.parse(fs.readFileSync(path.join(bulk.ROOT,sourcePath),'utf8'))){
 const src=data.source,englishId='tn-g12-en-v1-2025-owner',tamilId='tn-g12-ta-v1-2025-owner';
 const sources=[['en',englishId,src.englishDriveId,src.englishSha256],['ta',tamilId,src.tamilDriveId,src.tamilSha256]].map(([language,id,driveId,sha256])=>({id,grade:12,language,volume:1,
  title:`Class_12_Mathematics_${language==='en'?'English':'Tamil'}_Volume_1_2025_Edition-www.tntextbooks.in.pdf`,edition:'First edition 2019; revised editions 2020, 2022, 2023, 2025',url:`https://drive.google.com/file/d/${driveId}/view`,driveId,sha256,verification:'verified',imprintPdfPage:2,imprintVisualChecked:true}));
 const records=[],mapping=[],reasoning=[],difficultyEntries={};
 for(const item of data.models){
  const ir=compiler.compile(item.model),proof=critic.verify(ir),rendered=compiler.render(ir);
  const modelSteps=(item.modelling||[]).map(presentationStep);let steps;
  if(ir.domain.length){
   if(item.question==='4')steps=[modelSteps[0],rendered.steps[0],...modelSteps.slice(1),...rendered.steps.slice(1)];
   else steps=[rendered.steps[0],...modelSteps,...rendered.steps.slice(1)];
  }else steps=[...modelSteps,...rendered.steps];
  steps.push(...(item.afterSolution||[]).map(presentationStep));
  const record={id:item.id,classNum:12,chapter:'1',exercise:'1.4',kind:'textbook',
   topic:{en:'Applications of Matrices and Determinants'},title:{en:'Cramer’s rule'},
   label:{en:`Exercise 1.4 · Q${item.question}${item.parts[0]==='whole'?'':'('+item.parts[0]+')'}`,ta:`Exercise 1.4 · Q${item.question} · English only; Tamil pending`},
   q:{en:item.q},steps,answer:item.answer,source:sources[0].url,reference:`2025 revised English Volume I; printed p${item.printedPage}; PDF p${item.pdfPage}`};
  if(item.question==='1'){
   const marker='('+item.parts[0]+')',start=item.q.indexOf(marker),prefix=item.q.slice(0,start+marker.length)+' ',equation=item.q.slice(start+marker.length).trim();
   const lines=item.equationLatex.split(',\\quad');
   record.questionMath={en:[prefix,{latex:'\\begin{gathered}'+lines.join(' \\\\ ')+'\\end{gathered}',fallback:equation,display:true}]};
   record.answerMath={...rendered.answerMath,latex:rendered.answerMath.latex,fallback:item.answer};
  }
  records.push(record);
  mapping.push({recordId:item.id,exercise:'1.4',question:item.question,parts:item.parts,sourceId:englishId,sourceText:{en:item.q},visualChecked:{en:true},printedPages:[item.printedPage],pdfPages:[item.pdfPage],
   tamilCounterpart:{sourceId:tamilId,printedPages:[39],pdfPages:[47],visualChecked:true,numericalDataCompared:true,fullTranscription:false,professionalReview:'pending'}});
  reasoning.push({recordId:item.id,model:ir.model,reasoning:ir,critic:proof,recordSha256:bulk.hashRecord(record)});
  difficultyEntries[item.id]={grade:12,level:item.difficulty,basis:item.difficulty==='difficult'?'Reciprocal variables or reversed-rate modelling with multiple nonzero-domain checks.':'A coefficient model, several determinant evaluations and independent substitution.',review:'source-and-math-implementation-audit; teacher editorial pending'};
 }
 const questions=[...new Set(data.models.map(r=>r.question))].map(number=>{
  const entries=data.models.filter(m=>m.question===number),item=entries[0];
  return {number,parts:entries.flatMap(r=>r.parts),sourceId:englishId,printedPages:[item.printedPage],pdfPages:[item.pdfPage],visualChecked:true,requiredFigures:[],tables:[],graphs:[],mcq:false,
   answerKey:{text:entries.map(r=>r.answer).join(' '),sourceId:englishId,printedPages:[282],pdfPages:[290],visualChecked:true}};
 });
 return {batch:{schemaVersion:1,batchId:'g12-ch1-ex1-4',grade:12,chapter:'1',chapterTitle:'Applications of Matrices and Determinants',module:'data/textbook-exercises/g12-ch1-ex1-4-en.js',sources,
  inventory:{completeChapter:false,exercises:[{id:'1.4',complete:true,questions}]},records,mapping,verification:{script:'site/tools/bulk/verify_g12_ch1_ex1_4.cjs'},tamilStatus:'pending'},reasoning,difficultyEntries};
}
function write(out){
 const result=build();fs.mkdirSync(out,{recursive:true});
 for(const [name,value] of [['batch',result.batch],['reasoning',result.reasoning],['difficulty',result.difficultyEntries]])bulk.atomicJson(path.join(out,name+'.json'),value);
 return result;
}
module.exports={build,write,sourcePath};
if(require.main===module){try{const args=process.argv.slice(2);if(args.length!==2||args[0]!=='--report')throw Error('Usage: trace_g12_ex1_4.cjs --report PRIVATE_OR_DOCS_DIRECTORY');const value=write(path.resolve(args[1]));console.log(JSON.stringify({records:value.batch.records.length,parts:value.batch.mapping.reduce((n,m)=>n+m.parts.length,0),sourceChecked:'Original EN/TA page images, English literal transcription',languageReviewed:false,readyForIntegration:false,published:false}));}catch(e){console.error(e.message);process.exitCode=1;}}
