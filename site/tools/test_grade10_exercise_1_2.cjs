'use strict';
/** Source-checked Class 10 Chapter 1, Exercise 1.2 content-only checks. */
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const data=JSON.parse(fs.readFileSync(path.join(__dirname,'../data/grade10-ex1-2-content-only.json'),'utf8'));
const expected=['q1-i','q1-ii','q1-iii','q1-iv','q2','q3','q4-i','q4-ii','q5'].map(s=>'c10-1-ex1-2-'+s);
assert.equal(data.grade,10); assert.equal(data.chapter,1); assert.equal(data.exercise,'1.2');
assert.equal(data.entry_count,9); assert.equal(data.numbered_question_count,5);
assert.equal(data.source_file_id,'13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of');
assert.deepEqual(data.source_print_pages,[9,10]); assert.deepEqual(data.source_pdf_pages,[15,16]);
assert.deepEqual(data.items.map(x=>x.id),expected);
assert.equal(new Set(expected).size,9);
for(const item of data.items){
 assert.equal(item.kind,'textbook'); assert.equal(item.source_visual_status,'verified_against_original_page_image');
 assert.equal(item.source_edition,'TN SCERT revised 2025');
 assert.equal(item.language,'en'); assert.equal(item.tamil_status,'pending_original_source_transcription');
 assert.equal(item.integration_status,'staged_not_student_loaded');
 assert.ok(item.source_question_text.startsWith(item.original_question_stem));
 assert.ok(item.steps.length>=4 && item.steps.every(s=>s.en&&s.eq));
 assert.ok(item.answer); assert.equal(item.source_pdf_page,item.source_print_page+6);
}
const a=[1,2,3,7], b=[3,0,-1,7];
const rels=[[[2,1],[7,1]],[[-1,1]],[[2,-1],[7,7],[1,3]],[[7,-1],[0,3],[3,3],[0,7]]];
const relationCheck=rels.map(r=>r.every(([x,y])=>a.includes(x)&&b.includes(y)));
assert.deepEqual(relationCheck,[false,false,true,false]);
for(let j=0;j<4;j++) assert.ok(data.items[j].answer.startsWith(relationCheck[j]?'Relation':'Not a relation'));
const squares=Array.from({length:45},(_,i)=>i+1).filter(x=>x*x<=45).map(x=>[x,x*x]);
assert.deepEqual(squares,[[1,1],[2,4],[3,9],[4,16],[5,25],[6,36]]);
assert.ok(data.items[4].answer.includes('Domain = {1,2,3,4,5,6}'));
assert.ok(data.items[4].answer.includes('Range = {1,4,9,16,25,36}'));
const q3=Array.from({length:6},(_,x)=>[x,x+3]);
assert.deepEqual(q3,[[0,3],[1,4],[2,5],[3,6],[4,7],[5,8]]);
assert.ok(data.items[5].answer.includes('Range = {3,4,5,6,7,8}'));
const cross=(a,b)=>a.flatMap(x=>b.map(y=>[x,y]));
const relationI=cross([2,3,4,5],[1,2,3,4]).filter(([x,y])=>x===2*y);
const relationII=cross([1,2,3,4,5,6,7,8,9],[1,2,3,4,5,6,7,8,9]).filter(([x,y])=>y===x+3);
assert.deepEqual(relationI,[[2,1],[4,2]]);
assert.deepEqual(relationII,[[1,4],[2,5],[3,6],[4,7],[5,8],[6,9]]);
assert.deepEqual(data.items[6].diagram_spec.plot_points,relationI);
assert.deepEqual(data.items[7].diagram_spec.plot_points,relationII);
const groups=data.items[8].diagram_spec.salary_groups;
assert.deepEqual(Object.keys(groups).map(Number).sort((a,b)=>a-b),[10000,25000,50000,100000]);
assert.deepEqual(Object.values(groups).map(v=>v.length),[5,4,3,2]);
const pairs=Object.entries(groups).flatMap(([salary,employees])=>employees.map(employee=>[Number(salary),employee]));
assert.equal(pairs.length,14);
for (const [s,e] of pairs) assert.ok(data.items[8].answer.includes('('+s+','+e.replace(/(\d)/g,x=>'₁₂₃₄₅'[Number(x)-1]||x)+')') || data.items[8].answer.includes(String(s)));
console.log('PASS Grade 10 Exercise 1.2: 9/9 source-checked entries, 5 question groups, 9 independent mathematics checks; 3 visual renderings and Tamil pending.');

// Verify the student-facing module actually registers the authored questions.
const vm=require('node:vm');
const sandbox={window:{}};
for(const name of ['class-10.js','class-10-ex1-1-2025.js','class-10-ex1-2-2025.js']){
 const filename=path.join(__dirname,'../data',name);
 vm.runInNewContext(fs.readFileSync(filename,'utf8'),sandbox,{filename,timeout:2000});
}
const loaded=sandbox.window.TRIGGLE_CLASSES[10].items;
assert.equal(loaded.length,41,'20 preserved items + 12 Exercise 1.1 + 9 Exercise 1.2');
assert.equal(new Set(loaded.map(x=>x.id)).size,loaded.length);
for(const id of expected){
 const q=loaded.find(x=>x.id===id);
 assert.ok(q,'Student-facing question '+id+' missing');
 assert.equal(q.classNum,10);
 assert.equal(q.exercise,'1.2');
 assert.ok(q.q.en&&q.q.ta);
 assert.ok(q.steps.length>=4 && q.steps.every(s=>s.en&&s.ta&&s.eq));
 assert.ok(q.reference.includes('2025'));
 assert.equal(q.translationReview,'pending');
}
const page=fs.readFileSync(path.join(__dirname,'../index.html'),'utf8');
assert.ok(page.includes('data/class-10-ex1-2-2025.js'),'Exercise 1.2 script not loaded');
const offline=fs.readFileSync(path.join(__dirname,'../service-worker.js'),'utf8');
assert.ok(offline.includes("'./data/class-10-ex1-2-2025.js'"),'Exercise 1.2 missing from offline shell');
console.log('PASS Grade 10 Exercise 1.2 student registration: 9/9 entries; 20 legacy IDs retained; script and offline cache registered.');

const svgSource=fs.readFileSync(path.join(__dirname,'../assets/diagrams.js'),'utf8');
vm.runInNewContext(svgSource,sandbox,{filename:'diagrams.js',timeout:2000});
const relationSource=fs.readFileSync(path.join(__dirname,'../assets/grade10-relation-figures.js'),'utf8');
vm.runInNewContext(relationSource,sandbox,{filename:'grade10-relation-figures.js',timeout:2000});
const visualIds=['c10-1-ex1-2-q4-i','c10-1-ex1-2-q4-ii','c10-1-ex1-2-q5'];
for(const id of visualIds){
 const item=loaded.find(q=>q.id===id);
 assert.ok(item?.diagram && typeof item.diagram==='object','Missing rendered figure data: '+id);
 const markup=sandbox.window.TriggleDraw.drawClassic({demo:item.diagram,ref:id,title:'Grade 10 relation'});
 assert.ok(markup.includes('<svg') && markup.includes('</svg>'),'Missing accessible SVG rendering: '+id);
 assert.ok(markup.includes('role="img"'),'Diagram accessible image role missing: '+id);
}
assert.deepEqual(loaded.find(x=>x.id==='c10-1-ex1-2-q4-i').diagram.pairs,[[2,1],[4,2]]);
assert.deepEqual(loaded.find(x=>x.id==='c10-1-ex1-2-q4-ii').diagram.pairs,[[1,4],[2,5],[3,6],[4,7],[5,8],[6,9]]);
assert.equal(loaded.find(x=>x.id==='c10-1-ex1-2-q5').diagram.groups.reduce((n,g)=>n+g.employees.length,0),14);
console.log('PASS Grade 10 Exercise 1.2: 3 SVG relation figures and 14 salary arrows verified.');
