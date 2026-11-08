/* Triggle Teacher Review v1 — mobile, offline-first, independent of student app.
   This local workflow records teacher decisions; it does not authenticate or certify them. */
(()=>{
'use strict';
const KEY='triggle.teacher-review.g9-ch2.v1',BATCH=15,CHAPTER='g9-ch2',VALID=new Set(['approved','revise','error']);
const $=id=>document.getElementById(id);
const pick=(x,lang)=>typeof x==='string'?x:String(x?.[lang]??x?.en??'');
const book=window.TriggleRealCh2;
if(!book||!window.TRIGGLE_REAL_PATH||!window.TriggleDraw){
  $('reviewProgress').textContent='Textbook files unavailable / பாடநூல் கிடைக்கவில்லை';
  return;
}
const textbooks=book.grade.items.filter(x=>x.chapter==='2'&&(x.kind==='textbook-example'||x.kind==='textbook-exercise'));
const concepts=window.TRIGGLE_REAL_PATH.stages.map((stage,i)=>({
  id:'g9-ch2-concept-'+stage.id,kind:'review-concept',chapter:'2',
  label:{en:'Interactive concept '+(i+1),ta:'செயல்பாட்டுக் கருத்து '+(i+1)},
  title:stage.title,q:stage.question,
  answer:pick(stage.choices[stage.correct],'en')+' / '+pick(stage.choices[stage.correct],'ta'),
  steps:[
    {en:stage.idea.en,ta:stage.idea.ta,eq:stage.rule.en},
    {en:stage.why.en,ta:stage.why.ta,eq:pick(stage.example,'en')}
  ],
  printedPage:stage.page?.en,tamilPrintedPage:stage.page?.ta,section:stage.section,
  questionChoices:stage.choices,sourceEdition:'2025 revised'
}));
const all=[...textbooks,...concepts];
if(textbooks.length!==151||concepts.length!==8||new Set(all.map(x=>x.id)).size!==all.length){
  $('reviewProgress').textContent='Review dataset count error / தரவு எண்ணிக்கையில் பிழை';
  return;
}
// Hash of the exact reviewed question and solution. Approvals go stale after edits.
function fingerprint(item){
 const content=JSON.stringify([item.id,item.title,item.q,item.answer,item.steps,item.diagram||null,item.questionChoices||null]);
 let hash=2166136261;
 for(let i=0;i<content.length;i++){hash^=content.charCodeAt(i);hash=Math.imul(hash,16777619)}
 return (hash>>>0).toString(16).padStart(8,'0');
}
const byId=new Map(all.map(item=>[item.id,item]));
let state={schemaVersion:1,chapterId:CHAPTER,reviewerName:'',records:{}};
try{
 const raw=JSON.parse(localStorage.getItem(KEY)||'null');
 if(raw?.schemaVersion===1&&raw?.chapterId===CHAPTER&&raw.records&&typeof raw.records==='object'){
   state.records=raw.records;
   state.reviewerName=typeof raw.reviewerName==='string'?raw.reviewerName.slice(0,100):'';
 }
}catch{}
function persist(){
 try{localStorage.setItem(KEY,JSON.stringify(state));return true}
 catch{$('saveNotice').textContent='Storage unavailable: export your notes / சேமிப்பு இல்லை; பதிவிறக்கவும்';return false}
}
const recordOf=item=>{
 const r=state.records[item.id];
 return r&&typeof r==='object'&&r.fingerprint===fingerprint(item)?r:null;
};
const isReviewed=item=>VALID.has(recordOf(item)?.status);
const batches=Math.ceil(all.length/BATCH);
for(let n=0;n<batches;n++){
 const opt=document.createElement('option');opt.value=String(n);
 opt.textContent='Batch '+(n+1)+' · '+(n*BATCH+1)+'–'+Math.min((n+1)*BATCH,all.length);
 $('batchSelect').append(opt);
}
$('reviewerName').value=state.reviewerName;
$('reviewerName').addEventListener('input',e=>{
 state.reviewerName=e.target.value.slice(0,100);persist();
});
let batch=0,filter='all',position=0;
function batchItems(){
 return all.slice(batch*BATCH,Math.min((batch+1)*BATCH,all.length));
}
function visible(){
 const items=batchItems();
 if(filter==='pending')return items.filter(x=>!isReviewed(x));
 if(filter==='flagged')return items.filter(x=>['revise','error'].includes(recordOf(x)?.status));
 return items;
}
function current(){return visible()[position]||null}
function counts(){
 const reviewed=all.filter(isReviewed).length,approved=all.filter(x=>recordOf(x)?.status==='approved').length,flagged=all.filter(x=>['revise','error'].includes(recordOf(x)?.status)).length;
 return {reviewed,approved,flagged};
}
function updateCounts(){
 const totals=counts(),done=batchItems().filter(isReviewed).length;
 $('reviewProgress').textContent=totals.reviewed+' / '+all.length+' reviewed · '+totals.flagged+' need attention';
 $('batchProgress').textContent=done+' / '+batchItems().length+' in batch';
 $('reviewMeter').setAttribute('aria-valuemax',String(all.length));
 $('reviewMeter').setAttribute('aria-valuenow',String(totals.reviewed));
 $('reviewFill').style.width=(100*totals.reviewed/all.length).toFixed(2)+'%';
}
function paragraph(text,lang,el){
 const node=document.createElement(el||'p');if(lang)node.lang=lang;node.textContent=String(text??'');return node;
}
function render(){
 const candidates=visible(),item=candidates[position]||null;
 updateCounts();
 $('questionCard').hidden=!item;$('emptyState').hidden=!!item;
 $('prevBtn').disabled=!item||position<=0;
 $('nextBtn').disabled=!item||position>=candidates.length-1;
 $('navPosition').textContent=item?(position+1)+' / '+candidates.length:'0 / 0';
 if(!item)return;
 const r=recordOf(item),old=state.records[item.id],outdated=!!old&&!r;
 $('itemTitle').textContent=pick(item.label,'en')+' · '+pick(item.title,'en');
 $('itemType').textContent=item.kind==='textbook-example'?'Worked example / எடுத்துக்காட்டு':item.kind==='textbook-exercise'?'Exercise / பயிற்சி':'Interactive lesson / செயல்பாட்டுப் பாடம்';
 $('itemPosition').textContent=(all.indexOf(item)+1)+' / '+all.length;
 const ep=item.printedPage||'—',tp=item.tamilPrintedPage||'—';
 $('itemSource').textContent='SCERT 2025 · English p. '+ep+' · Tamil p. '+tp+(item.section?' · §'+item.section:'');
 $('questionEn').textContent=pick(item.q,'en');
 $('questionTa').textContent=pick(item.q,'ta');
 $('answerText').textContent=pick(item.answer,'en');
 const steps=$('stepList');steps.replaceChildren();
 for(const step of item.steps){
  const li=document.createElement('li');
  li.append(paragraph(step.en,'en'),paragraph(step.ta,'ta'));
  if(step.eq)li.append(paragraph(step.eq,null,'code'));
  steps.append(li);
 }
 if(item.questionChoices){
  const li=document.createElement('li');
  li.append(paragraph('Choices / தேர்வுகள்','en'));
  item.questionChoices.forEach((opt,i)=>li.append(paragraph((i+1)+'. '+pick(opt,'en')+' · '+pick(opt,'ta'),null)));
  steps.append(li);
 }
 const figure=$('figureBox');figure.replaceChildren();figure.hidden=true;
 if(item.diagram){
  try{
   const markup=window.TriggleDraw.drawClassic({demo:item.diagram,ref:pick(item.label,'en'),title:pick(item.q,'en')});
   if(markup){figure.innerHTML=markup;figure.hidden=false;}
  }catch{}
 }
 $('enPdf').href='https://drive.google.com/file/d/1WxLnjLPhAGkTylUHNFvh8UL34Z8eqC4J/view';
 $('taPdf').href='https://drive.google.com/file/d/1gp6z1UOuqoH6MCuZt_qNi492R3vZUWaj/view';
 $('visualLink').hidden=item.kind!=='review-concept';
 $('visualLink').href='./index.html?class=9&chapter=g9-ch2&section=concepts';
 for(const btn of document.querySelectorAll('.tr-decisions button')){
  btn.setAttribute('aria-pressed',String(r?.status===btn.dataset.status));
 }
 $('reviewComment').value=r?.comment||'';
 $('saveNotice').textContent=outdated?'Question changed since last review; please check again. / பழைய மதிப்பீட்டை மீண்டும் சரிபார்க்கவும்.':r?.status?'Saved on this phone / சாதனத்தில் சேமிக்கப்பட்டது':'';
}
function setRecord(status){
 const item=current();if(!item)return;
 const old=recordOf(item)||{};
 state.records[item.id]={
   fingerprint:fingerprint(item),
   status:status??(VALID.has(old.status)?old.status:null),
   comment:$('reviewComment').value.trim().slice(0,5000),
   updatedAt:new Date().toISOString(),
   reviewerName:state.reviewerName||null
 };
 persist();
}
function decide(status){
 const item=current();if(!item)return;
 const i=position;
 setRecord(status);
 const candidates=visible();
 if(status==='approved'){
  // The green action is intentionally one tap: approve this and open the next.
  if(filter==='all')position=Math.min(i+1,candidates.length-1);
  else position=Math.min(i,candidates.length-1);
 }else position=Math.max(0,Math.min(i,candidates.length-1));
 render();
 if(status==='approved'&&position!==i)$('questionCard').scrollIntoView({block:'start',behavior:'instant'});
}
for(const btn of document.querySelectorAll('.tr-decisions button')){
 btn.addEventListener('click',()=>decide(btn.dataset.status));
}
$('reviewComment').addEventListener('input',()=>{
 if(!current())return;
 setRecord(null);updateCounts();
 $('saveNotice').textContent='Note saved on this phone / குறிப்பு சேமிக்கப்பட்டது';
});
function nav(step){
 const n=visible().length;
 if(!n)return;
 position=Math.max(0,Math.min(n-1,position+step));render();
 $('questionCard').scrollIntoView({block:'start',behavior:'instant'});
}
$('prevBtn').addEventListener('click',()=>nav(-1));
$('nextBtn').addEventListener('click',()=>nav(1));
$('batchSelect').addEventListener('change',e=>{batch=Number(e.target.value);position=0;render()});
$('reviewFilter').addEventListener('change',e=>{filter=e.target.value;position=0;render()});
$('showAllBtn').addEventListener('click',()=>{$('reviewFilter').value='all';filter='all';position=0;render()});
function exportData(){
 return {
  schemaVersion:1,chapterId:CHAPTER,
  textbookEdition:'Tamil Nadu SCERT Mathematics 2025 revised',
  reviewerName:state.reviewerName||null,
  createdAt:new Date().toISOString(),
  disclaimer:'Teacher-entered local records. Not independently authenticated or officially certified.',
  totalItems:all.length,summary:counts(),
  reviews:all.filter(item=>recordOf(item)).map(item=>{
   const r=recordOf(item);
   return {id:item.id,label:pick(item.label,'en'),englishPage:item.printedPage||null,tamilPage:item.tamilPrintedPage||null,
    fingerprint:r.fingerprint,status:r.status||null,comment:r.comment||'',updatedAt:r.updatedAt||null,reviewerName:r.reviewerName||null};
  })
 };
}
function fileName(){return 'triggle-g9-real-teacher-review-'+new Date().toISOString().slice(0,10)+'.json'}
function makeFile(){
 return new File([JSON.stringify(exportData(),null,2)],fileName(),{type:'application/json'});
}
function download(file){
 const url=URL.createObjectURL(file),a=document.createElement('a');a.href=url;a.download=file.name;
 document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1500);
 $('exportMessage').textContent='Backup downloaded. Please keep it safe. / பதிவு பதிவிறக்கம் செய்யப்பட்டது.';
}
$('downloadBtn').addEventListener('click',()=>download(makeFile()));
$('shareBtn').addEventListener('click',async()=>{
 const file=makeFile();
 if(navigator.share&&navigator.canShare?.({files:[file]})){
  try{await navigator.share({files:[file],title:'Triggle · Teacher review',text:'Grade 9 Real Numbers teacher corrections. Not a public certification.'});$('exportMessage').textContent='Share action completed.';return;}
  catch(e){if(e.name==='AbortError'){$('exportMessage').textContent='Share cancelled; all records remain on this phone.';return;}}
 }
 download(file);
 $('exportMessage').textContent='Backup downloaded; share the JSON file using your phone’s share menu.';
});
$('copyBtn').addEventListener('click',async()=>{
 const flagged=all.filter(item=>['revise','error'].includes(recordOf(item)?.status));
 const lines=['Triggle · Grade 9 Real Numbers · Teacher corrections',
  'Reviewer: '+(state.reviewerName||'Not specified'),
  'Date: '+new Date().toISOString().slice(0,10),
  'Flagged: '+flagged.length+' of '+all.length,
  ...flagged.map((item,i)=>{
    const r=recordOf(item);
    return (i+1)+'. '+pick(item.label,'en')+' ['+r.status+']\n'+(r.comment||'(No comment)')+'\nID: '+item.id;
  })];
 try{
  await navigator.clipboard.writeText(lines.join('\n\n'));
  $('exportMessage').textContent='Corrections copied. Paste into WhatsApp or a message. / திருத்தங்கள் நகலெடுக்கப்பட்டன.';
 }catch{
  $('exportMessage').textContent='Clipboard unavailable. Use Download backup instead.';
 }
});
$('importFile').addEventListener('change',async e=>{
 const file=e.target.files?.[0];if(!file)return;
 try{
  if(file.size>2000000)throw Error('Backup too large');
  const raw=JSON.parse(await file.text());
  if(raw.schemaVersion!==1||raw.chapterId!==CHAPTER||!Array.isArray(raw.reviews))throw Error('Not a Grade 9 Real Numbers review backup');
  if(!confirm('Import this backup into this phone? Matching question reviews will be merged. / பதிவை மீட்டெடுக்கவா?'))return;
  let restored=0,stale=0;
  for(const entry of raw.reviews.slice(0,all.length*2)){
   const item=byId.get(entry?.id);
   if(!item||typeof entry.fingerprint!=='string'||typeof entry.comment!=='string'||entry.comment.length>5000)continue;
   if(!VALID.has(entry.status)&&entry.status!==null)continue;
   if(entry.fingerprint!==fingerprint(item)){stale++;continue;}
   state.records[item.id]={
    fingerprint:entry.fingerprint,status:entry.status,comment:entry.comment.slice(0,5000),
    updatedAt:typeof entry.updatedAt==='string'?entry.updatedAt:null,
    reviewerName:typeof entry.reviewerName==='string'?entry.reviewerName.slice(0,100):null
   };
   restored++;
  }
  if(!state.reviewerName&&typeof raw.reviewerName==='string'){state.reviewerName=raw.reviewerName.slice(0,100);$('reviewerName').value=state.reviewerName;}
  persist();position=0;render();
  $('exportMessage').textContent=restored+' matching reviews restored; '+stale+' old-version reviews skipped. / பதிவுகள் மீட்டெடுக்கப்பட்டன.';
 }catch(err){$('exportMessage').textContent='Import failed: '+err.message}
 finally{e.target.value='';}
});
window.TriggleTeacherReview=Object.freeze({
  totalItems:all.length,batchSize:BATCH,
  // Expose non-sensitive totals for regression tests; no remote upload or signoff.
  counts
});
render();
})();