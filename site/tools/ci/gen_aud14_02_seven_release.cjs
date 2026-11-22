'use strict';
/*
 * One-shot, audit-scoped local generator. Run only in the approved release
 * branch, and remove before merging. No secrets, downloads or API access.
 */
const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto'),cp=require('node:child_process');
const root=path.resolve(__dirname,'../../..');
const read=p=>fs.readFileSync(path.join(root,p),'utf8');
const write=(p,text)=>{fs.mkdirSync(path.dirname(path.join(root,p)),{recursive:true});fs.writeFileSync(path.join(root,p),text);};
const replace=(file,a,b)=>{let s=read(file);if(s.split(a).length!==2)throw Error('Refusing non-unique source anchor in '+file+': '+a.slice(0,70));write(file,s.replace(a,b));};
const manifest=JSON.parse(read('docs/audit/AUD14_02_EX64_Q2_Q3_STAGED.json'));
if(manifest.records.length!==7||manifest.gates.tamilEditorial!=='pending')throw Error('Unapproved source batch');
const eqs={
 'q2-i':['sin θ = 0.9975','sin 85°54′ ≈ 0.9974; MD(3′–5′) ≈ 0.0001','θ = 85°57′ or 85°58′ or 85°59′'],
 'q2-ii':['cos 47°24′ ≈ 0.6769','0.6769 − 0.0006 = 0.6763','θ = 47°27′'],
 'q2-iii':['tan 4°06′ ≈ 0.0717','0.0717 + 0.0003 = 0.0720','θ = 4°7′'],
 'q2-iv':['cos 87°36′ ≈ 0.0419','0.0419 − 0.0009 = 0.0410','θ = 87°39′'],
 'q2-v':['tan 82°30′ ≈ 7.5958','MD(0′) = 0','θ = 82°30′'],
 'q3-i':['sin 65°39′ ≈ 0.9111','cos 24°57′ ≈ 0.9066; tan 10°10′ ≈ 0.1793','0.9111 + 0.9066 + 0.1793 = 1.9970'],
 'q3-ii':['tan 70°58′ ≈ 2.8982','cos 15°26′ ≈ 0.9639; sin 84°59′ ≈ 0.9962','2.8982 + 0.9639 − 0.9962 = 2.8659']};
const records=manifest.records.map(p=>{
 const part=p.id.split('-').slice(-2).join('-');
 if(eqs[part]?.length!==p.stepsEnglish.length)throw Error('Missing approved source steps '+p.id);
 return {
  id:p.id,classNum:9,chapter:'6',exercise:'6.4',topic:{en:'Trigonometry'},
  label:{en:p.label,ta:p.label+' (English only · Tamil review pending)'},
  title:{en:part.startsWith('q3')?'Read a four-figure trig table':'Find an angle using the trig table'},
  q:{en:p.englishPrompt},steps:p.stepsEnglish.map((en,i)=>({en,eq:eqs[part][i]})),
  answer:p.answer,kind:'textbook',source:manifest.source.englishPrimary,
  reference:'TN SCERT Standard Nine Mathematics (English), revised 2025. Exercise 6.4 printed p.239 / PDF p.245, answer appendix printed p.316 / PDF p.322. Values follow prescribed four-figure tables; Tamil editorial review pending.',
  page:245,edition:'2025',translationReview:'pending',releaseStatus:'english-preview',
  sourceFidelity:{status:'english-source-page-visual-checked',enPrintedPage:239,enPdfPage:245,answerKeyEnPrintedPage:316,answerKeyEnPdfPage:322,tamilReview:'pending',teacherReview:'pending'}
 };
});
const mod='site/data/textbook-exercises/g9-ch6-ex6-4-q2-q3-en.js';
write(mod,'/* AUD14-02 Ex6.4: seven page-verified English-only subparts; Tamil review pending. */\n'+
 "(()=>{'use strict';\nconst grade=window.TRIGGLE_CLASSES?.[9];\nif(!grade||!Array.isArray(grade.items))throw Error('Grade 9 core must load first');\n"+
 'const entries='+JSON.stringify(records,null,2)+';\n'+
 'const ids=new Set(grade.items.map(q=>q.id));\nfor(const entry of entries){if(ids.has(entry.id))throw Error("Duplicate source exercise "+entry.id);ids.add(entry.id);grade.items.push(entry);}\n})();\n');
const pin={auditId:'AUD14-02-FOLLOWUP-EX6.4-Q2-Q3',sourceManifest:'docs/audit/AUD14_02_EX64_Q2_Q3_STAGED.json',status:'ENGLISH_RELEASE_CANDIDATE_REVIEW_PENDING',source:manifest.source.englishPrimary,
 gates:{englishPageImage:'verified',tamilEditorial:'pending',independentNeon:'pending',productionLive:'pending'},
 records:Object.fromEntries(records.map((r,i)=>[r.id,{sourcePart:manifest.records[i].sourcePart,expectedFinalAnswer:r.answer,sha256:crypto.createHash('sha256').update(JSON.stringify(r)).digest('hex')}] ))};
write('docs/audit/AUD14_02_EX64_Q2_Q3_RELEASE_EVIDENCE.json',JSON.stringify(pin,null,2)+'\n');
const anchor='<script src="./data/textbook-exercises/g9-ch3-ex3-2-missing-en.js?v=ex32-1"></script>';
replace('site/index.html',anchor,anchor+'<script src="./data/textbook-exercises/g9-ch6-ex6-4-q2-q3-en.js?v=aud14-02-q2q3-20261122"></script>');
replace('site/service-worker.js',"CORE.push('./data/textbook-exercises/g9-ch3-ex3-2-missing-en.js'","CORE.push('./data/textbook-exercises/g9-ch6-ex6-4-q2-q3-en.js');\nCORE.push('./data/textbook-exercises/g9-ch3-ex3-2-missing-en.js'");
replace('site/tools/test_standard_solutions.cjs','const approvedG9Ids=[...g9AlgebraRows.map(p=>p.id),',
 "const g9Ex64Release=require('../../docs/audit/AUD14_02_EX64_Q2_Q3_RELEASE_EVIDENCE.json');\n"+
 "const g9Ex64NewIds=Object.keys(g9Ex64Release.records);\n"+
 'const approvedG9Ids=[...g9AlgebraRows.map(p=>p.id),');
replace('site/tools/test_standard_solutions.cjs','...g9Ex32NewIds];\nassert.equal(approvedG9Ids.length,84);',
 '...g9Ex32NewIds,...g9Ex64NewIds];\nassert.equal(approvedG9Ids.length,91);');
const condition="  }else if(grade==='9'&&g9Ex32ById.has(item.id)){";
replace('site/tools/test_standard_solutions.cjs',condition,
 "  }else if(grade==='9'&&g9Ex64Release.records[item.id]){\n"+
 "   const proof=g9Ex64Release.records[item.id];\n"+
 "   assert.equal(hash,proof.sha256,'Source-pinned four-figure-table release '+item.id);\n"+
 "   assert.equal(item.answer,proof.expectedFinalAnswer,'Official textbook table answer '+item.id);\n"+
 "   assert(item.q.en.includes(proof.sourcePart),'2025 source prompt '+item.id);\n"+
 "   assert.equal(item.translationReview,'pending');\n"+
 "   assert.equal(item.releaseStatus,'english-preview');\n"+
 "   assert(!item.q.ta,'Do not invent Tamil explanation '+item.id);\n"+
 condition);
const newDifficulty=records.map(rec=>({id:rec.id,grade:9,level:rec.id.includes('-q2-')?'medium':'difficult',basis:rec.id.includes('-q2-')?'Reverse a natural trigonometric table with six-minute columns and mean differences':'Evaluate a multi-term expression with prescribed four-figure trigonometric tables',review:'implementation-audit'}));
replace('site/data/problem-difficulty.js','  "entries": {\n','  "entries": {\n'+newDifficulty.map(({id,...values})=>'    '+JSON.stringify(id)+': '+JSON.stringify(values)+',\n').join(''));
replace('site/tools/test_g9_clear_math.cjs','assert.equal(items.length,397);','assert.equal(items.length,404);');
replace('site/tools/test_g9_clear_math.cjs',"assert.equal(new Set(items.map(q=>q.id)).size,397","assert.equal(new Set(items.map(q=>q.id)).size,404");
replace('site/tools/test_g9_clear_math.cjs',"assert.equal(items.filter(q=>q.kind!=='practice').length,388);","assert.equal(items.filter(q=>q.kind!=='practice').length,395);");
replace('site/tools/test_g9_clear_math.cjs','const preservation=items.map(q=>{',
 "const newIds=new Set(['q2-i','q2-ii','q2-iii','q2-iv','q2-v','q3-i','q3-ii'].map(p=>'c9-exercise-6-4-'+p));\n"+
 "assert.equal(JSON.stringify(items.slice(-7).map(q=>q.id)),JSON.stringify([...newIds]),'Only seven approved IDs appended');\n"+
 'const preservation=items.filter(q=>!newIds.has(q.id)).map(q=>{');
replace('site/tools/test_g9_clear_math.cjs','[65,121,56,12,9,40,37,31,26]','[65,121,56,12,9,47,37,31,26]');
replace('site/tools/test_g9_ex64_q2_q3_stage.cjs',"assert.equal(complete.length,397,'Full assembled Grade 9 runtime inventory must remain unchanged during staging');",
 "assert.equal(complete.length,404,'Seven approved records appended to assembled Grade 9 inventory');");
replace('site/tools/test_g9_ex64_q2_q3_stage.cjs',
 "for(const id of expectedIds)assert(!complete.some(q=>q.id===id),'Staging must not silently publish a missing exercise '+id);",
 "for(const id of expectedIds)assert(complete.some(q=>q.id===id),'Released English source must contain approved exercise '+id);");
replace('site/tools/test_g9_ex64_q2_q3_stage.cjs',
 "console.log('PASS AUD14-02 staging: seven source-exact textbook prompts, immutable Grade 9 product inventory, five reverse-table checks, two four-figure sums, official answer key, Q2(i) ambiguity and negative calculator control. No student-facing integration claimed.');",
 "console.log('PASS AUD14-02 released source: seven source-exact textbook prompts, immutable Grade 9 core, five reverse-table checks, two school-table sums, official key and negative calculator control.');");
cp.execFileSync('node',['site/tools/build_g9_math.cjs'],{cwd:root,stdio:'inherit'});
cp.execFileSync('node',['site/tools/build_project_status.cjs'],{cwd:root,stdio:'inherit'});
for(const test of ['test_g9_ex64_q2_q3_stage.cjs','test_g9_clear_math.cjs','test_standard_solutions.cjs']){
 cp.execFileSync('node',['site/tools/'+test],{cwd:root,stdio:'inherit'});
}
console.log('PASS AUD14 integration generation: 404 G9 questions, strict source gate, KaTeX and historical hashes.');
