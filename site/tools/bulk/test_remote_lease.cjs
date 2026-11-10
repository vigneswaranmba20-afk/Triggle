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
 console.log('PASS remote curriculum leases: persistent ownership, two-clone exclusion, inherited nesting, failure cleanup and guarded release; main unchanged.');
}finally{fs.rmSync(tmp,{recursive:true,force:true});}
