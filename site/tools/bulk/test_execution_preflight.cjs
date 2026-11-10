'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),os=require('node:os'),path=require('node:path');
const {preflight,parseRefs}=require('./execution_preflight.cjs');
const root=fs.mkdtempSync(path.join(os.tmpdir(),'triggle-preflight-'));
const main='1'.repeat(40),free='2'.repeat(40),other='3'.repeat(40),repo='vigneswaranmba20-afk/Triggle';
const refs=['refs/heads/main','refs/heads/triggle-locks/grade-11','refs/heads/triggle-locks/integration'];
const sentinel={schemaVersion:1,mode:'persistent-cas',freeCommitSha:free,refs:refs.slice(1).map(r=>r.slice(11))};
fs.mkdirSync(path.join(root,'docs/curriculum'),{recursive:true});fs.writeFileSync(path.join(root,'docs/curriculum/remote-lease-sentinel.json'),JSON.stringify(sentinel));
function probe({held=false,missing=false,duplicate=false,moved=false,permission=true,wrongRepo=false,wrongSentinel=false,authFails=false}={}){
 const calls=[];
 const run=(cmd,args)=>{
  calls.push([cmd,...args]);
  if(cmd==='git'&&args[0]==='remote')return 'https://github.com/'+(wrongRepo?'someone/Other':repo)+'.git';
  if(cmd==='git'&&args[0]==='ls-remote')return refs.slice(0,missing?2:3).map((r,i)=>(i===0?main:held&&i===1?other:free)+'\t'+r).join('\n')+(duplicate?'\n'+free+'\t'+refs[1]:'');
  assert.equal(cmd,'gh');assert.equal(args[0],'api');
  const endpoint=args[1];
  if(endpoint==='user'){if(authFails)throw Error('Authentication unavailable');return JSON.stringify({login:'fixture'});}
  if(endpoint==='repos/'+repo)return JSON.stringify({full_name:repo,permissions:{push:permission}});
  if(endpoint.includes('/contents/'))return JSON.stringify({encoding:'base64',content:Buffer.from(JSON.stringify({...sentinel,freeCommitSha:wrongSentinel?other:free})).toString('base64')});
  const ref='refs/heads/'+endpoint.split('/git/ref/heads/')[1];
  return JSON.stringify({ref,object:{type:'commit',sha:ref===refs[0]?main:ref===refs[1]&&(held||moved)?other:free}});
 };
 const result=preflight({root,grade:11,run});
 assert(calls.every(([cmd,verb])=>cmd==='gh'?verb==='api':['remote','ls-remote'].includes(verb)));
 return result;
}
try{
 assert.equal(probe().ready,true);
 assert.equal(probe({held:true}).ready,false);
 for(const scenario of [{missing:true},{duplicate:true},{moved:true},{permission:false},{wrongRepo:true},{wrongSentinel:true},{authFails:true}])assert.throws(()=>probe(scenario));
 assert.throws(()=>parseRefs(free+'\trefs/heads/main\nmalformed',refs));
 assert.throws(()=>preflight({root,grade:13}));
 console.log('PASS read-only execution preflight: strict refs, Git/API agreement, pinned sentinel, auth/write permission, held/missing/changed refs fail closed.');
}finally{fs.rmSync(root,{recursive:true,force:true});}
