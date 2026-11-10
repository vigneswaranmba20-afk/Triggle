'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),os=require('node:os'),cp=require('node:child_process');
const leases=require('./remote_lease.cjs');
const tmp=fs.mkdtempSync(path.join(os.tmpdir(),'triggle-remote-lease-'));
const remote=path.join(tmp,'origin.git'),a=path.join(tmp,'clone-a'),b=path.join(tmp,'clone-b');
const git=(cwd,args,input)=>cp.execFileSync('git',args,{cwd,encoding:'utf8',input,stdio:['pipe','pipe','pipe']}).trim();
try{
 git(tmp,['init','--bare','--initial-branch=main',remote]);git(tmp,['init','--initial-branch=main',a]);
 git(a,['config','user.name','Fixture']);git(a,['config','user.email','fixture@localhost']);
 fs.writeFileSync(path.join(a,'README.md'),'Synthetic repository for remote lease tests.\n');git(a,['add','README.md']);git(a,['commit','-m','Fixture']);git(a,['remote','add','origin',remote]);git(a,['push','origin','HEAD:main']);git(tmp,['clone',remote,b]);
 const original=git(a,['rev-parse','HEAD']);
 // Persistent acquisition survives its process, while another clone fails closed.
 const helper=path.resolve(__dirname,'remote_lease.cjs');
 const childOwnership=JSON.parse(cp.execFileSync(process.execPath,['-e',`process.stdout.write(JSON.stringify(require(${JSON.stringify(helper)}).acquireRemoteLease('grade-9',{root:${JSON.stringify(a)}})))`],{encoding:'utf8'}));
 assert.equal(leases.remoteHead(a,'origin',leases.refFor('grade-9')),childOwnership.sha);
 assert.throws(()=>leases.acquireRemoteLease('grade-9',{root:b}),/already held/);
 assert.throws(()=>leases.acquireRemoteLease('grade-9',{root:a}),/ownership already exists/);
 assert.throws(()=>leases.releaseRemoteLease('grade-9',{root:b,expectedSha:childOwnership.sha}),/ownership is unavailable/);
 assert.throws(()=>leases.releaseRemoteLease('grade-9',{root:a,expectedSha:'a'.repeat(40)}),/does not match/);
 assert.throws(()=>leases.releaseRemoteLease('grade-9',{root:a,expectedSha:childOwnership.sha,token:'wrong'}),/does not match/);
 assert.equal(leases.remoteHead(a,'origin',leases.refFor('grade-9')),childOwnership.sha);
 const other=leases.acquireRemoteLease('integration',{root:b});assert.ok(other.sha);leases.releaseRemoteLease('integration',{root:b,expectedSha:other.sha});
 assert.ok(leases.releaseRemoteLease('grade-9',{root:a,expectedSha:childOwnership.sha}).released);assert.equal(leases.remoteHead(a,'origin',leases.refFor('grade-9')),null);
 // Inherited ownership is reentrant only for the same saved token and live SHA.
 leases.withRemoteLease('grade-10',owner=>{
  assert.equal(leases.withRemoteLease('grade-10',nested=>nested.reentrant,{root:a}),true);
  const result=cp.execFileSync(process.execPath,['-e',`require(${JSON.stringify(helper)}).withRemoteLease('grade-10',x=>{if(!x.reentrant)throw Error('not nested');process.stdout.write(x.sha)},{root:${JSON.stringify(a)}})`],{encoding:'utf8'});
  assert.equal(result,owner.sha);
  // Atomic "must not exist" creation fails even when the claimant knows the current SHA.
  assert.throws(()=>git(b,['push','--force-with-lease='+owner.ref+':','origin',original+':'+owner.ref]));
 },{root:a});
 assert.equal(leases.remoteHead(a,'origin',leases.refFor('grade-10')),null);
 assert.throws(()=>leases.withRemoteLease('grade-11',()=>{throw Error('fixture callback failure');},{root:a}),/fixture callback failure/);
 assert.equal(leases.remoteHead(a,'origin',leases.refFor('grade-11')),null);
 // A changed owner is never removed, and its old local ownership evidence remains available.
 const old=leases.acquireRemoteLease('grade-12',{root:a}),tree=git(a,['rev-parse','HEAD^{tree}']);
 const foreign=git(a,['commit-tree',tree,'-p',original],'Foreign synthetic owner\n');
 git(a,['push','--force-with-lease='+old.ref+':'+old.sha,'origin',foreign+':'+old.ref]);
 assert.throws(()=>leases.releaseRemoteLease('grade-12',{root:a,expectedSha:old.sha}),/owner changed/);
 assert.equal(leases.remoteHead(a,'origin',old.ref),foreign);assert.ok(fs.existsSync(old.stateFile));
 // Explicit fixture teardown, with a lease for the changed synthetic owner; never used by production code.
 git(a,['push','--force-with-lease='+old.ref+':'+foreign,'origin',':'+old.ref]);fs.unlinkSync(old.stateFile);
 assert.equal(git(a,['rev-parse','HEAD']),original);assert.equal(git(remote,['rev-parse','main']),original);assert.equal(git(a,['status','--porcelain']),'');
 // Connector-compatible persistent CAS mode: the free state is a real remote
 // ref pointing to an immutable sentinel, never an absent branch.
 const config={schemaVersion:1,mode:'persistent-cas',freeCommitSha:original};
 for(const folder of [a,b]){
  const dir=path.join(folder,'docs/curriculum');fs.mkdirSync(dir,{recursive:true});
  fs.writeFileSync(path.join(dir,'remote-lease-sentinel.json'),JSON.stringify(config)+'\n');
 }
 for(const scope of ['grade-9','grade-10','integration']){
  const ref=leases.refFor(scope);git(a,['push','origin',original+':'+ref]);
  assert.equal(leases.remoteHead(a,'origin',ref),original);
 }
 assert.equal(leases.persistentFreeCommit(a),original);
 const held=leases.acquireRemoteLease('grade-9',{root:a});
 assert.equal(leases.remoteHead(a,'origin',leases.refFor('grade-9')),held.sha);
 assert.throws(()=>leases.acquireRemoteLease('grade-9',{root:b}),/already held/);
 assert.ok(leases.releaseRemoteLease('grade-9',{root:a,expectedSha:held.sha}).released);
 assert.equal(leases.remoteHead(a,'origin',leases.refFor('grade-9')),original);
 const shared=leases.acquireRemoteLease('integration',{root:b});
 assert.equal(leases.remoteHead(a,'origin',leases.refFor('integration')),shared.sha);
 assert.ok(leases.releaseRemoteLease('integration',{root:b,expectedSha:shared.sha}).released);
 assert.equal(leases.remoteHead(a,'origin',leases.refFor('integration')),original);
 // A blind no-expected-sha claim is forbidden: free sentinel is an occupied
 // remote ref, so the original absent-ref push precondition must fail.
 assert.throws(()=>git(a,['push','--force-with-lease='+leases.refFor('grade-10')+':','origin',foreign+':'+leases.refFor('grade-10')]));
 assert.equal(leases.remoteHead(a,'origin',leases.refFor('grade-10')),original);
 // A server-side ref change after a successful push must not be mistaken for
 // ownership or successful release. Only synthetic fixture refs are touched.
 const hook=path.join(remote,'hooks/post-receive');
 function raceHook(ref,trigger){
  fs.writeFileSync(hook,`#!/bin/sh\nwhile read before after ref; do\n if [ "$ref" = "${ref}" ] && ${trigger}; then\n  git update-ref "$ref" "${foreign}" "$after"\n fi\ndone\n`,{mode:0o755});
 }
 const raceRef=leases.refFor('grade-9');
 raceHook(raceRef,`[ "$after" != "${original}" ]`);
 assert.throws(()=>leases.acquireRemoteLease('grade-9',{root:a}),/claim readback mismatch/);
 assert.equal(leases.remoteHead(a,'origin',raceRef),foreign);
 const stateDir=path.join(a,'.git/triggle-remote-leases');
 const stateFile=fs.readdirSync(stateDir).find(f=>f.endsWith('-grade-9.json'));
 assert.ok(stateFile,'Uncertain claim retains ownership evidence');
 fs.unlinkSync(hook);git(a,['push','--force-with-lease='+raceRef+':'+foreign,'origin',original+':'+raceRef]);fs.unlinkSync(path.join(stateDir,stateFile));
 const releasing=leases.acquireRemoteLease('grade-9',{root:a});
 raceHook(raceRef,`[ "$after" = "${original}" ]`);
 assert.throws(()=>leases.releaseRemoteLease('grade-9',{root:a,expectedSha:releasing.sha}),/release readback mismatch/);
 assert.equal(leases.remoteHead(a,'origin',raceRef),foreign);assert.ok(fs.existsSync(releasing.stateFile));
 fs.unlinkSync(hook);git(a,['push','--force-with-lease='+raceRef+':'+foreign,'origin',original+':'+raceRef]);fs.unlinkSync(releasing.stateFile);
 assert.equal(git(remote,['rev-parse','main']),original);
 console.log('PASS remote curriculum leases: persistent ownership, two-clone exclusion, inherited nesting, failure cleanup and guarded release; legacy and persistent CAS refs guarded; main unchanged.');
}finally{fs.rmSync(tmp,{recursive:true,force:true});}
