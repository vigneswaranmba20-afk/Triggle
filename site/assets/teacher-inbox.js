import {collection,doc,getDocs,getDocFromServer,query,orderBy,limit,startAfter,runTransaction,serverTimestamp} from 'https://www.gstatic.com/firebasejs/13.2.0/firebase-firestore.js';

// This module is loaded only by the authenticated teacher page. All reads and
// writes remain subject to the UID grant and server rules, regardless of UI state.
export function installTeacherInbox(context) {
 const $=id=>document.getElementById(id),workflow=window.TriggleTeacherWorkflow;
 let entries=[],cursor=null,more=true,busy=false,selected=new Set(),session=0,transitionBusy=false;
 function el(tag,text){const e=document.createElement(tag);if(text!=null)e.textContent=String(text);return e;}
 function active(epoch){return context().reviewer&&context().active()&&epoch===session;}
 function clear(){session++;entries=[];cursor=null;more=true;selected.clear();$('inbox-items').replaceChildren();$('handoff-text').value='';$('handoff-panel').hidden=true;$('correction-panel').hidden=true;current=null;for(const id of ['correction-evidence','correction-hash','approval-review-id'])$(id).value='';$('correction-history').replaceChildren();$('correction-title').textContent='Correction history';$('inbox-status').textContent='Private inbox cleared.';}
 async function load(reset=true){
  if(busy||!context().reviewer)return;busy=true;$('inbox-refresh').disabled=true;
  const epoch=session,{db,bounded}=context();
  if(reset){entries=[];cursor=null;more=true;selected.clear();}
  $('inbox-status').textContent='Loading private feedback…';
  try{
   const parts=[orderBy('createdAt','desc'),limit(50)];if(cursor)parts.push(startAfter(cursor));
   const result=await bounded(getDocs(query(collection(db,'teacherReviewEvents'),...parts)));
   if(!active(epoch))return;
   const page=result.docs.map(d=>({id:d.id,...d.data()}));
   await Promise.all(page.filter(e=>e.decision==='needs-correction').map(async e=>{
    try{const c=await bounded(getDocFromServer(doc(db,'teacherCorrectionCases',e.id)));if(c.exists())e.correction=c.data();}
    catch{e.lifecycleUnavailable=true;}
   }));
   if(!active(epoch))return;entries.push(...page);cursor=result.docs.at(-1)||cursor;more=result.docs.length===50;render();
  }catch{if(active(epoch))$('inbox-status').textContent='Private inbox could not load. Check authorization and connection, then Refresh.';}
  finally{busy=false;$('inbox-refresh').disabled=false;}
 }
 function filters(e){const f=id=>$(id).value;return (!f('inbox-grade')||String(e.grade)===f('inbox-grade'))&&(!f('inbox-chapter')||String(e.chapter)===f('inbox-chapter'))&&(!f('inbox-exercise')||String(e.exercise)===f('inbox-exercise'))&&(!f('inbox-question')||e.questionId.toLowerCase().includes(f('inbox-question').toLowerCase()))&&(!f('inbox-decision')||e.decision===f('inbox-decision'))&&(!f('inbox-correction')||(e.correction?.status||(e.decision==='needs-correction'?'untracked':''))===f('inbox-correction'))&&(!f('inbox-date')||e.createdAt?.toDate?.().toISOString().slice(0,10)>=f('inbox-date'));}
 function render(){
  if(!context().reviewer)return;const filtered=entries.filter(filters).sort((a,b)=>($('inbox-sort').value==='oldest'?1:-1)*((a.createdAt?.seconds||0)-(b.createdAt?.seconds||0)));
  $('inbox-status').textContent=`${filtered.length} matching review events · ${entries.length} loaded${more?' · more may be available (Load more)':' · all available events loaded'}. Older approvals describe their recorded content hash only.`;
  $('inbox-more').hidden=!more;const list=$('inbox-items');list.replaceChildren();
  if(!filtered.length)list.append(el('p','No review events match these filters.'));
  for(const e of filtered){
   const card=el('article');card.className='history-item';
   const select=el('label'),checkbox=el('input');checkbox.type='checkbox';checkbox.checked=selected.has(e.id);checkbox.addEventListener('change',()=>{checkbox.checked?selected.add(e.id):selected.delete(e.id);});select.append(checkbox,document.createTextNode(' Select '+e.questionId));
   const title=el('h3',`Grade ${e.grade} · Chapter ${e.chapter} · Exercise ${e.exercise}`);
   card.append(select,title,el('p',e.decision+' · '+(e.createdAt?.toDate?.().toLocaleString()||'Timestamp pending')));
   card.append(el('p',e.note||'No teacher note.'),el('p','Reviewed content SHA-256: '+e.recordSha256));
   const a=el('a','Open question in review');a.href='#review-question';a.addEventListener('click',()=>context().selectQuestion(e));card.append(a);
   if(e.decision==='needs-correction'){
    card.append(el('p','Correction: '+(workflow.labels[e.correction?.status]||'Not tracked')));
    const button=el('button',e.correction?'View correction history / update':'Start correction tracking');button.type='button';button.className='quiet';button.disabled=!!e.lifecycleUnavailable;button.addEventListener('click',()=>openCorrection(e));card.append(button);
    if(e.lifecycleUnavailable)card.append(el('p','Correction tracking unavailable. The owner may need to publish the new Firestore rules. Review notes remain private and can still be copied.'));
   }
   list.append(card);
  }
 }
 let current=null;
 async function openCorrection(entry){
  current=entry;$('correction-panel').hidden=false;$('correction-title').textContent='Correction · '+entry.questionId;$('correction-evidence').value='';$('correction-hash').value=entry.correction?.targetRecordSha256||entry.recordSha256;$('approval-review-id').value='';
  const status=entry.correction?.status;$('correction-next').replaceChildren();for(const next of status?workflow.transitions[status]:['reported'])$('correction-next').append(new Option(workflow.labels[next],next));
  $('correction-save').disabled=!!status&&!workflow.transitions[status].length;$('correction-status').textContent='Current: '+(workflow.labels[status]||'Not tracked')+'. Every transition appends an immutable history event.';
  const latestApproval=entries.find(e=>e.questionId===entry.questionId&&e.decision==='approved');if(latestApproval)$('approval-review-id').value=latestApproval.id;
  $('correction-history').textContent='Loading correction history…';$('correction-panel').scrollIntoView({block:'start'});
  const epoch=session;
  try{const results=await context().bounded(getDocs(query(collection(context().db,'teacherCorrectionCases',entry.id,'history'),orderBy('revision','asc'))));if(!active(epoch)||current!==entry)return;$('correction-history').replaceChildren(...results.docs.map(d=>{const v=d.data();return el('p',`#${v.revision} ${workflow.labels[v.status]||v.status} · ${v.updatedAt?.toDate?.().toLocaleString()||'Timestamp pending'} · ${v.evidence||'No additional evidence'}`);}));}
  catch{if(active(epoch))$('correction-history').textContent='Correction history unavailable. Existing review feedback is preserved. Ask the owner to deploy the documented Firestore rules if tracking is not provisioned.';}
 }
 async function saveCorrection(event){
  event.preventDefault();if(transitionBusy||!current||!context().reviewer)return;
  const entry=current,epoch=session,{db,reviewer}=context(),next=$('correction-next').value,evidence=$('correction-evidence').value.trim(),targetHash=$('correction-hash').value.trim(),approvalReviewId=$('approval-review-id').value.trim();
  if(!/^[a-f0-9]{64}$/.test(targetHash)||!evidence){$('correction-status').textContent='Enter the actual content SHA-256 and evidence for this transition.';return;}
  transitionBusy=true;$('correction-save').disabled=true;
  try{
   // Do not race a timeout against a write: its commit outcome could be ambiguous.
   // The button stays disabled until the transaction resolves, preventing duplicates.
   await runTransaction(db,async tx=>{
    const ref=doc(db,'teacherCorrectionCases',entry.id),before=await tx.get(ref),old=before.exists()?before.data():null;
    if(!active(epoch))throw Error('Session ended');
    if(old&&!workflow.canTransition(old.status,next))throw Error('Status changed. Refresh the inbox before retrying.');
    if(!old&&next!=='reported')throw Error('Start with Reported.');
    const value={reviewEventId:entry.id,questionId:entry.questionId,grade:entry.grade,chapter:entry.chapter,exercise:entry.exercise,recordSha256:entry.recordSha256,targetRecordSha256:targetHash,status:next,revision:old?old.revision+1:0,evidence,approvalReviewId:next==='approved'?approvalReviewId:'',updatedByUid:reviewer.uid,updatedAt:serverTimestamp()};
    tx.set(ref,value);tx.set(doc(db,'teacherCorrectionCases',entry.id,'history',String(value.revision)),value);
   });
   if(active(epoch)){$('correction-status').textContent='Private status and immutable history saved. Deployment does not imply teacher approval.';await load(true);const refreshed=entries.find(e=>e.id===entry.id);if(refreshed)await openCorrection(refreshed);}
  }catch(error){if(active(epoch))$('correction-status').textContent=error.code==='permission-denied'?'Transition denied by server rules. Verify access, the lifecycle order, fresh teacher re-approval and deployed Firestore rules.':'Could not save transition. Refresh and inspect history before retrying.';}
  finally{transitionBusy=false;$('correction-save').disabled=false;}
 }
 function exportSelected(){const chosen=entries.filter(e=>selected.has(e.id));if(!context().reviewer||!chosen.length){$('inbox-status').textContent='Select at least one feedback item to prepare a private handoff.';return;}$('handoff-text').value=workflow.handoff(chosen);$('handoff-panel').hidden=false;$('handoff-status').textContent='Private text stays in this authenticated page. Copy only into an authorized workflow.';$('handoff-panel').scrollIntoView({block:'start'});}
 $('inbox-refresh').addEventListener('click',()=>load(true));$('inbox-more').addEventListener('click',()=>load(false));$('prepare-handoff').addEventListener('click',exportSelected);$('correction-form').addEventListener('submit',saveCorrection);
 for(const id of ['inbox-grade','inbox-chapter','inbox-exercise','inbox-question','inbox-decision','inbox-correction','inbox-date','inbox-sort'])$(id).addEventListener('input',render);
 $('copy-handoff').addEventListener('click',async()=>{if(!context().reviewer)return;try{await navigator.clipboard.writeText($('handoff-text').value);$('handoff-status').textContent='Private correction request copied. Do not publish it in a public issue.';}catch{$('handoff-text').select();$('handoff-status').textContent='Use your browser’s Copy action on the selected text.';}});
 $('download-handoff').addEventListener('click',()=>{if(!context().reviewer)return;const blob=new Blob([$('handoff-text').value],{type:'text/plain;charset=utf-8'}),url=URL.createObjectURL(blob),a=el('a');a.href=url;a.download='triggle-private-corrections.txt';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);});
 return {load,clear};
}
