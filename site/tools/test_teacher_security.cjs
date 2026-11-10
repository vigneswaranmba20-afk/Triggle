'use strict';
// Real Firestore emulator rule evaluation; no production credentials or claims of live account testing.
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const {initializeTestEnvironment,assertFails,assertSucceeds}=require('@firebase/rules-unit-testing');
const {doc,collection,getDoc,getDocs,setDoc,updateDoc,deleteDoc,writeBatch,serverTimestamp}=require('firebase/firestore');
(async()=>{
 const env=await initializeTestEnvironment({projectId:'demo-triggle-review',firestore:{rules:fs.readFileSync(path.resolve(__dirname,'../../teacher-review/firestore.rules'),'utf8'),host:'127.0.0.1',port:8085}});
 try{
  await env.clearFirestore();
  const google=uid=>env.authenticatedContext(uid,{firebase:{sign_in_provider:'google.com'}}).firestore(),teacher=google('teacher'),stranger=google('stranger'),anon=env.unauthenticatedContext().firestore(),password=env.authenticatedContext('teacher',{firebase:{sign_in_provider:'password'}}).firestore();
  await env.withSecurityRulesDisabled(async c=>setDoc(doc(c.firestore(),'teacherAccess','teacher'),{role:'reviewer'}));
  const base={questionId:'g12-ch1-ex1.1-q1-i',grade:12,chapter:'1',exercise:'1.1',decision:'needs-correction',note:'கணக்கீட்டைச் சரிபார்க்கவும். Check the calculation.',reviewerUid:'teacher',recordSha256:'a'.repeat(64),createdAt:serverTimestamp()};
  for(const db of [anon,stranger,password]){
   await assertFails(getDocs(collection(db,'teacherReviewEvents')));await assertFails(setDoc(doc(db,'teacherReviewEvents','forbidden'),base));await assertFails(getDocs(collection(db,'teacherCorrectionCases')));
  }
  await assertSucceeds(getDoc(doc(teacher,'teacherAccess','teacher')));
  await assertFails(getDoc(doc(stranger,'teacherAccess','teacher')));await assertFails(getDocs(collection(teacher,'teacherAccess')));
  await assertFails(setDoc(doc(stranger,'teacherAccess','stranger'),{role:'reviewer'}));await assertFails(updateDoc(doc(teacher,'teacherAccess','teacher'),{role:'reviewer'}));
  await assertFails(setDoc(doc(teacher,'teacherReviewEvents','wrong-uid'),{...base,reviewerUid:'stranger'}));
  await assertFails(setDoc(doc(teacher,'teacherReviewEvents','extra'),{...base,public:true}));
  await assertFails(setDoc(doc(teacher,'teacherReviewEvents','fake-time'),{...base,createdAt:new Date(0)}));
  await assertFails(setDoc(doc(teacher,'teacherReviewEvents','bad-hash'),{...base,recordSha256:'bad'}));
  await assertSucceeds(setDoc(doc(teacher,'teacherReviewEvents','report'),base));
  await assertSucceeds(getDocs(collection(teacher,'teacherReviewEvents')));
  await assertFails(updateDoc(doc(teacher,'teacherReviewEvents','report'),{note:'rewrite'}));await assertFails(deleteDoc(doc(teacher,'teacherReviewEvents','report')));
  const initial={reviewEventId:'report',questionId:base.questionId,grade:12,chapter:'1',exercise:'1.1',recordSha256:base.recordSha256,targetRecordSha256:base.recordSha256,status:'reported',revision:0,evidence:'Teacher reported a calculation issue.',approvalReviewId:'',updatedByUid:'teacher',updatedAt:serverTimestamp()};
  const pair=async(value,db=teacher,id='report')=>{const batch=writeBatch(db);batch.set(doc(db,'teacherCorrectionCases',id),value);batch.set(doc(db,'teacherCorrectionCases',id,'history',String(value.revision)),value);return batch.commit();};
  await assertFails(setDoc(doc(teacher,'teacherCorrectionCases','report'),initial));
  await assertFails(pair({...initial,questionId:'another-question'}));
  await assertFails(pair({...initial,status:'approved'}));
  await assertSucceeds(pair(initial));
  await assertFails(setDoc(doc(teacher,'teacherCorrectionCases','report','history','1'),{...initial,revision:1}));
  await assertFails(pair({...initial,status:'deployed',revision:1,evidence:'https://github.com/example'}));
  let state={...initial,status:'in-progress',revision:1,evidence:'Source rechecked.'};await assertSucceeds(pair(state));
  await assertFails(pair({...state,revision:2,status:'fixed',recordSha256:'b'.repeat(64)}));
  state={...state,revision:2,status:'fixed',targetRecordSha256:'b'.repeat(64),evidence:'Independent math and tests passed.'};await assertSucceeds(pair(state));
  await assertFails(pair({...state,revision:3,status:'deployed',evidence:'merged'}));
  state={...state,revision:3,status:'deployed',evidence:'https://github.com/vigneswaranmba20-afk/Triggle/commit/'+'c'.repeat(40)};await assertSucceeds(pair(state));
  await assertFails(pair({...state,revision:4,status:'approved',approvalReviewId:'missing'}));
  // An approval from before the re-review state cannot close the correction.
  await assertSucceeds(setDoc(doc(teacher,'teacherReviewEvents','stale-approval'),{...base,decision:'approved',recordSha256:'b'.repeat(64)}));
  state={...state,revision:4,status:'awaiting-rereview',evidence:'Teacher asked to recheck the deployed question.'};await assertSucceeds(pair(state));
  await assertFails(pair({...state,revision:5,status:'approved',approvalReviewId:'stale-approval'}));
  await assertSucceeds(setDoc(doc(teacher,'teacherReviewEvents','wrong-hash-approval'),{...base,decision:'approved'}));
  await assertFails(pair({...state,revision:5,status:'approved',approvalReviewId:'wrong-hash-approval'}));
  await assertSucceeds(setDoc(doc(teacher,'teacherReviewEvents','fresh-approval'),{...base,decision:'approved',recordSha256:'b'.repeat(64)}));
  state={...state,revision:5,status:'approved',approvalReviewId:'fresh-approval',evidence:'Teacher explicitly checked the corrected content.'};await assertSucceeds(pair(state));
  await assertFails(pair({...state,revision:6,status:'in-progress',approvalReviewId:''}));
  const history=await assertSucceeds(getDocs(collection(teacher,'teacherCorrectionCases','report','history')));assert.equal(history.size,6,'All six states retained');
  await assertFails(updateDoc(doc(teacher,'teacherCorrectionCases','report','history','0'),{evidence:'rewrite'}));await assertFails(deleteDoc(doc(teacher,'teacherCorrectionCases','report')));
  await assertFails(getDocs(collection(anon,'teacherCorrectionCases','report','history')));
  await assertFails(pair({...initial,reviewEventId:'forged'},stranger,'forged'));
  // Blocked can resume work, never skip directly to deployment or approval.
  await assertSucceeds(setDoc(doc(teacher,'teacherReviewEvents','blocked-report'),base));
  let blocked={...initial,reviewEventId:'blocked-report'};await assertSucceeds(pair(blocked,teacher,'blocked-report'));
  blocked={...blocked,revision:1,status:'blocked',evidence:'Original source unavailable.'};await assertSucceeds(pair(blocked,teacher,'blocked-report'));
  await assertFails(pair({...blocked,revision:2,status:'approved'},teacher,'blocked-report'));
  await assertSucceeds(pair({...blocked,revision:2,status:'in-progress',evidence:'Source access restored.'},teacher,'blocked-report'));
  await env.withSecurityRulesDisabled(async c=>deleteDoc(doc(c.firestore(),'teacherAccess','teacher')));
  await assertFails(getDocs(collection(teacher,'teacherReviewEvents')));await assertFails(setDoc(doc(teacher,'teacherReviewEvents','revoked'),base));
  console.log('PASS real Firestore emulator: anonymous/unapproved/non-Google/revoked denial, UID grants, private review creation, immutable history, atomic lifecycle, blocked recovery, deployment evidence and fresh hash-specific re-approval.');
 }finally{await env.cleanup();}
})().catch(e=>{console.error(e);process.exitCode=1;});
