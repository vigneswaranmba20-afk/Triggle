#!/usr/bin/env node
'use strict';
// Read-only: no fetch, checkout, push, ref update, lease claim or credential write.
const cp=require('node:child_process'),fs=require('node:fs'),path=require('node:path');
const REPO='vigneswaranmba20-afk/Triggle',SHA=/^[a-f0-9]{40}$/;
function parseRefs(text,refs){
 const result={};
 for(const line of text.trim().split('\n').filter(Boolean)){
  const match=line.match(/^([a-f0-9]{40})\t(refs\/heads\/[^\s]+)$/);
  if(!match||!refs.includes(match[2])||result[match[2]])throw Error('Malformed, unexpected or duplicate remote reference');
  result[match[2]]=match[1];
 }
 if(refs.some(ref=>!result[ref]))throw Error('Required remote reference is missing; do not create or reset it');
 return result;
}
function preflight({root=path.resolve(__dirname,'../../..'),grade,run}={}){
 if(![9,10,11,12].includes(grade))throw Error('Select --grade 9, 10, 11 or 12');
 run??=((command,args)=>{
  try{return cp.execFileSync(command,args,{cwd:root,encoding:'utf8',env:{...process.env,GIT_TERMINAL_PROMPT:'0'},stdio:['ignore','pipe','pipe'],timeout:25000,maxBuffer:1024*1024}).trim();}
  catch{throw Error(command+' preflight failed: check inherited proxy access and authentication; retry the same read-only probe outside the sandbox if its proxy connection is blocked');}
 });
 const url=run('git',['remote','get-url','origin']);
 if(!['https://github.com/'+REPO,'https://github.com/'+REPO+'.git'].includes(url))throw Error('Origin must be the credential-free HTTPS Triggle URL');
 const refs=['refs/heads/main','refs/heads/triggle-locks/grade-'+grade,'refs/heads/triggle-locks/integration'];
 const heads=parseRefs(run('git',['ls-remote','--refs','origin',...refs]),refs);
 const api=endpoint=>JSON.parse(run('gh',['api','repos/'+REPO+'/'+endpoint]));
 const login=JSON.parse(run('gh',['api','user'])).login;
 const repo=JSON.parse(run('gh',['api','repos/'+REPO]));
 if(!login||repo.full_name!==REPO||repo.permissions?.push!==true)throw Error('Authenticated repository write permission is not established');
 const main=api('git/ref/heads/main');
 if(main.ref!==refs[0]||main.object?.type!=='commit'||main.object.sha!==heads[refs[0]])throw Error('Git/API main disagreement; repeat preflight from fresh state');
 const encoded=api('contents/docs/curriculum/remote-lease-sentinel.json?ref='+heads[refs[0]]);
 if(encoded.encoding!=='base64'||typeof encoded.content!=='string')throw Error('Remote sentinel content unavailable');
 const remote=JSON.parse(Buffer.from(encoded.content,'base64').toString('utf8'));
 const local=JSON.parse(fs.readFileSync(path.join(root,'docs/curriculum/remote-lease-sentinel.json'),'utf8'));
 if(remote.schemaVersion!==1||remote.mode!=='persistent-cas'||!SHA.test(remote.freeCommitSha||'')||remote.freeCommitSha!==local.freeCommitSha||!Array.isArray(remote.refs)||refs.slice(1).some(ref=>!remote.refs.includes(ref.slice(11))))throw Error('Pinned remote/local sentinel mismatch');
 const leases=refs.slice(1).map(ref=>{
  const value=api('git/ref/heads/'+ref.slice(11));
  if(value.ref!==ref||value.object?.type!=='commit'||value.object.sha!==heads[ref])throw Error('Git/API lease reference disagreement; no mutation permitted');
  return {ref,sha:heads[ref],state:heads[ref]===remote.freeCommitSha?'free':'held-or-unknown'};
 });
 return {schemaVersion:1,observedAt:new Date().toISOString(),repository:REPO,authenticatedLogin:login,writePermission:true,mainSha:heads[refs[0]],freeCommitSha:remote.freeCommitSha,leases,ready:leases.every(x=>x.state==='free'),note:'Read-only observation; availability is not ownership. Claim with guarded CAS and read back before authoring.'};
}
if(require.main===module){
 try{const args=process.argv.slice(2);if(args.length!==2||args[0]!=='--grade')throw Error('Usage: node site/tools/bulk/execution_preflight.cjs --grade N');const result=preflight({grade:Number(args[1])});console.log(JSON.stringify(result,null,2));if(!result.ready)process.exitCode=2;}
 catch(e){console.error(e.message);process.exitCode=1;}
}
module.exports={preflight,parseRefs};
