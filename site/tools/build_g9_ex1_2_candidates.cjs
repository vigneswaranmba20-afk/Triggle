#!/usr/bin/env node
'use strict';
// Generates source-preserving student module from reviewed TRACE candidates.
// Intentionally NOT added to index.html or service-worker.js until release gates pass.
const fs=require('node:fs'),path=require('node:path');
const root=path.resolve(__dirname,'../..');
const candidatePath=path.join(root,'docs/curriculum/grade-9/candidates/g9-ch1-ex1-2-english-34.json');
const target=path.join(root,'site/data/textbook-exercises/g9-ch1-ex1-2-en.js');
const titles={
  1:'Cardinal numbers',2:'Finite and infinite sets',3:'Equal and equivalent sets',
  4:'Null and singleton sets',5:'Disjoint and overlapping sets',6:'Subsets of shapes',
  7:'Nested sets and subsets',8:'Writing power sets',9:'Subsets and proper subsets',
  10:'Power-set cardinality'
};
function build(){
 const c=JSON.parse(fs.readFileSync(candidatePath,'utf8'));
 if(c.grade!==9||c.chapter!=='1'||c.exercise!=='1.2'||c.stage!=='CANDIDATE_NOT_REGISTERED')throw Error('Unexpected release state');
 if(c.rows.length!==34||new Set(c.rows.map(x=>x.id)).size!==34)throw Error('Incomplete or duplicate candidate IDs');
 const records=c.rows.map(row=>{
  const tag='Q'+row.question+(row.part==='whole'?'':'('+row.part+')');
  if(!row.id.startsWith('g9-ch1-ex1.2-q')||!titles[Number(row.question)]||!row.steps?.length||!row.answer)throw Error('Invalid candidate '+row.id);
  const text=Number(row.question)===10
   ?'10. '+(row.part==='whole'?'':'('+row.part+') ')+row.sourceEnglish
   :row.question+'. '+row.stem+'\n'+(row.part==='whole'?'':'('+row.part+') ')+row.sourceEnglish;
  return {
   id:row.id,classNum:9,chapter:'1',exercise:'1.2',
   topic:{en:'Set Language'},label:{en:'Exercise 1.2 · '+tag,ta:'Exercise 1.2 · '+tag+' (English only; Tamil review pending)'},
   title:{en:titles[Number(row.question)]+': '+tag},
   q:{en:text},
   steps:row.steps.map(step=>({en:step.reason,eq:step.equation})),
   answer:row.answer,kind:'textbook',
   source:'https://drive.google.com/file/d/1WxLnjLPhAGkTylUHNFvh8UL34Z8eqC4J/view',
   reference:'Tamil Nadu SCERT Standard Nine Mathematics, revised 2025; Exercise 1.2, printed pp. 11–12 / PDF pp. 17–18. Source images and English solution reasoning audited in PR #129. Tamil editorial and teacher approval deferred.',
   edition:'2025',translationReview:'pending',
   sourceFidelity:{status:'original-english-page-images-checked-in-source-audit',enPrintedPages:[11,12],enPdfPages:[17,18],sourceAudit:c.sourceAudit,tamilEditorial:'deferred'}
  };
 });
 return '/* Generated TRACE Grade 9 Exercise 1.2 English candidates. NOT LIVE until index and cache registration. */\n'+
  "(()=>{'use strict';\n"+
  'const entries='+JSON.stringify(records,null,2)+';\n'+
  "const grade=window.TRIGGLE_CLASSES?.[9];\n"+
  "const chapter=window.TRIGGLE_CURRICULUM?.grades?.find(g=>g.grade===9)?.chapters?.find(c=>String(c.number)==='1');\n"+
  "if(!grade||!chapter)throw Error('Grade 9 Exercise 1.2 dependencies missing');\n"+
  "chapter.textbookQuestionIds=chapter.textbookQuestionIds||[];\n"+
  "for(const item of entries){if(grade.items.some(existing=>existing.id===item.id)||chapter.textbookQuestionIds.includes(item.id))throw Error('Duplicate Grade 9 textbook ID: '+item.id);grade.items.push(item);chapter.textbookQuestionIds.push(item.id);}\n"+
  "window.TRIGGLE_G9_EX1_2_IDS=Object.freeze(entries.map(item=>item.id));\n"+
  '})();\n';
}
if(require.main===module){
 const content=build();
 if(process.argv.includes('--check')){
  if(!fs.existsSync(target)||fs.readFileSync(target,'utf8')!==content)throw Error('Exercise 1.2 candidate module is stale: run node site/tools/build_g9_ex1_2_candidates.cjs');
 }else fs.writeFileSync(target,content);
 console.log('PASS: 34 English parts prepared; NOT registered in student app.');
}
module.exports={build};
