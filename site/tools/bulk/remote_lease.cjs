'use strict';
// Cross-executor leases use compare-and-swap Git refs. Ref commits never change main.
const cp=require('node:child_process'),crypto=require('node:crypto'),os=require('node:os'),fs=require('node:fs'),path=require('node:path');
const ENV='TRIGGLE_BULK_REMOTE_LEASES';
const shaPattern=/^[a-f0-9]{40,64}$/;
function git(root,args,{input,env}={}){
 try{return cp.execFileSync('git',args,{cwd:root,encoding:'utf8',input,env:env||process.env,stdio:['pipe','pipe','pipe'],timeout:50000,maxBuffer:1024*1024}).trim();}
 catch(error){const failure=new Error('Git operation failed; repository access, credentials, or the lease precondition is unavailable');failure.code=error.code;failure.status=error.status;throw failure;}
}
function refFor(scope){if(!/^(?:grade-(?:9|10|11|12)|integration)$/.test(scope))throw Error('Invalid remote lease scope');return 'refs/heads/triggle-locks/'+scope;}
function context(scope,{root,remote='origin'}={}){
 if(!root)throw Error('Remote lease requires repository root');
 const ref=refFor(scope),url=git(root,['remote','get-url',remote]),remoteId=crypto.createHash('sha256').update(url).digest('hex'),common=path.resolve(root,git(root,['rev-parse','--git-common-dir']));
 return {root,remote,scope,ref,remoteId,key:remoteId+':'+scope,stateFile:path.join(common,'triggle-remote-leases',remoteId.slice(0,16)+'-'+scope+'.json')};
}
function remoteHead(root,remote,ref){const text=git(root,['ls-remote','--refs',remote,ref]);if(!text)return null;const lines=text.split('\n');if(lines.length!==1||!new RegExp('^[a-f0-9]{40,64}\\s+'+ref.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')+'$').test(lines[0]))throw Error('Ambiguous remote lease response');return lines[0].split(/\s+/)[0];}
function persistentFreeCommit(root){
 const file=path.join(root,'docs/curriculum/remote-lease-sentinel.json');
 if(!fs.existsSync(file))return null; // Legacy clone compatibility, e.g. the original lease unit fixtures.
 const state=JSON.parse(fs.readFileSync(file,'utf8'));
 if(state.schemaVersion!==1||state.mode!=='persistent-cas'||!shaPattern.test(state.freeCommitSha||''))throw Error('Invalid persistent remote lease configuration');
 return state.freeCommitSha;
}
function inheritedLeases(){let leases;try{leases=JSON.parse(process.env[ENV]||'{}');}catch{throw Error('Invalid inherited remote lease context');}if(!leases||Array.isArray(leases)||typeof leases!=='object')throw Error('Invalid inherited remote lease context');return leases;}
function savedOwner(ctx){try{return JSON.parse(fs.readFileSync(ctx.stateFile,'utf8'));}catch{throw Error('Saved remote lease ownership is unavailable; inspect '+ctx.ref+' before manual recovery');}}
function acquireRemoteLease(scope,options={}){
 const ctx=context(scope,options);
 if(fs.existsSync(ctx.stateFile))throw Error('Saved '+scope+' lease ownership already exists; inspect its owner before manual recovery');
 const free=persistentFreeCommit(ctx.root),current=remoteHead(ctx.root,ctx.remote,ctx.ref);
 if((free&&current!==free)||(!free&&current!==null))throw Error('Remote '+scope+' lease is already held or its persistent free ref is missing at '+ctx.ref+'; inspect its owner before manual recovery');
 const token=crypto.randomBytes(24).toString('hex'),head=git(ctx.root,['rev-parse','HEAD']),tree=git(ctx.root,['rev-parse','HEAD^{tree}']);
 const owner={pid:process.pid,hostname:os.hostname(),startedAt:new Date().toISOString(),head};
 const metadata={schemaVersion:1,purpose:'Triggle curriculum execution lease; not a content change',scope,token,owner};
 const identity={...process.env,GIT_AUTHOR_NAME:'Triggle curriculum lease',GIT_AUTHOR_EMAIL:'triggle-lease@localhost',GIT_COMMITTER_NAME:'Triggle curriculum lease',GIT_COMMITTER_EMAIL:'triggle-lease@localhost'};
 const sha=git(ctx.root,['commit-tree',tree,'-p',head],{input:JSON.stringify(metadata)+'\n',env:identity});
 try{git(ctx.root,['push','--porcelain','--force-with-lease='+ctx.ref+':'+(free||''),ctx.remote,sha+':'+ctx.ref]);}
 catch{throw Error('Remote '+scope+' lease claim rejected: another run claimed '+ctx.ref+' or push access is unavailable');}
 const ownership={schemaVersion:1,scope,ref:ctx.ref,sha,token,owner,remoteId:ctx.remoteId,stateFile:ctx.stateFile};
 try{fs.mkdirSync(path.dirname(ctx.stateFile),{recursive:true});fs.writeFileSync(ctx.stateFile,JSON.stringify(ownership,null,2)+'\n',{flag:'wx',mode:0o600});}
 catch(error){
  try{git(ctx.root,['push','--porcelain','--force-with-lease='+ctx.ref+':'+sha,ctx.remote,(free||'')+':'+ctx.ref]);}catch{const failure=new Error('Remote '+scope+' lease claimed but local ownership could not be saved; '+ctx.ref+' requires owner inspection');failure.ownership=ownership;throw failure;}
  throw Error('Remote lease ownership could not be saved; the claimed ref was released');
 }
 return ownership;
}
function releaseRemoteLease(scope,{root,remote='origin',expectedSha,token}={}){
 const ctx=context(scope,{root,remote});if(!shaPattern.test(expectedSha||''))throw Error('Lease release requires the exact owned SHA');
 const ownership=savedOwner(ctx);
 if(ownership.scope!==scope||ownership.ref!==ctx.ref||ownership.remoteId!==ctx.remoteId||ownership.sha!==expectedSha||(token!==undefined&&ownership.token!==token))throw Error('Lease release does not match saved ownership; no ref was removed');
 if(remoteHead(root,remote,ctx.ref)!==expectedSha)throw Error('Remote '+scope+' lease owner changed or disappeared; no ref was removed');
 const free=persistentFreeCommit(root);
 try{git(root,['push','--porcelain','--force-with-lease='+ctx.ref+':'+expectedSha,remote,(free||'')+':'+ctx.ref]);}
 catch{const failure=new Error('Remote '+scope+' lease release rejected; '+ctx.ref+' was not removed. Inspect the recorded owner before manual recovery');failure.ref=ctx.ref;failure.ownedSha=expectedSha;throw failure;}
 // Remove only the exact saved owner. A changed local state must also be inspected manually.
 const latest=savedOwner(ctx);if(latest.sha!==expectedSha||latest.token!==ownership.token)throw Error('Remote lease released, but local ownership changed; saved state was retained');
 fs.unlinkSync(ctx.stateFile);return {scope,ref:ctx.ref,sha:expectedSha,released:true};
}
function withRemoteLease(scope,fn,options={}){
 const ctx=context(scope,options),leases=inheritedLeases(),existing=leases[ctx.key];
 if(existing){
  if(!shaPattern.test(existing.sha||'')||!existing.token||remoteHead(ctx.root,ctx.remote,ctx.ref)!==existing.sha)throw Error('Inherited remote '+scope+' lease no longer belongs to this run');
  const saved=savedOwner(ctx);if(saved.sha!==existing.sha||saved.token!==existing.token)throw Error('Inherited remote lease token mismatch');
  const value=fn({...saved,reentrant:true});if(value&&typeof value.then==='function')throw Error('Remote lease callback must be synchronous');return value;
 }
 const ownership=acquireRemoteLease(scope,options),previous=process.env[ENV];process.env[ENV]=JSON.stringify({...leases,[ctx.key]:{sha:ownership.sha,token:ownership.token}});let value,error;
 try{value=fn({...ownership,reentrant:false});if(value&&typeof value.then==='function')throw Error('Remote lease callback must be synchronous');}catch(e){error=e;}
 finally{if(previous===undefined)delete process.env[ENV];else process.env[ENV]=previous;}
 try{releaseRemoteLease(scope,{...options,expectedSha:ownership.sha,token:ownership.token});}
 catch(cleanup){if(error)cleanup.cause=error;throw cleanup;}
 if(error)throw error;return value;
}
module.exports={acquireRemoteLease,releaseRemoteLease,withRemoteLease,refFor,remoteHead,persistentFreeCommit,ENV};
