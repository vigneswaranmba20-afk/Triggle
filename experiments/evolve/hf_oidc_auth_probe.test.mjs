import test from 'node:test';
import assert from 'node:assert/strict';
import {preflight,tokenExchangeRequest,probe} from './hf_oidc_auth_probe.mjs';
const env={
 GITHUB_REPOSITORY:'vigneswaranmba20-afk/Triggle',
 GITHUB_REF:'refs/heads/experiment/evolve-shadow-v1-20261122',
 GITHUB_WORKFLOW_REF:'vigneswaranmba20-afk/Triggle/.github/workflows/evolve-audit-repair.yml@refs/heads/experiment/evolve-shadow-v1-20261122',
 GITHUB_EVENT_NAME:'push',
 EVOLVE_HF_USERNAME:'example_hf',
 ACTIONS_ID_TOKEN_REQUEST_URL:'https://fake.test/oidc',
 ACTIONS_ID_TOKEN_REQUEST_TOKEN:'not-a-real-token'
};
test('rejects wrong GitHub repository, branch, or workflow',()=>{
 for(const key of ['GITHUB_REPOSITORY','GITHUB_REF','GITHUB_WORKFLOW_REF']){
  assert.throws(()=>preflight({...env,[key]:'attacker'}));
 }
});
test('rejects absent user variable and no permission',()=>{
 assert.throws(()=>preflight({...env,EVOLVE_HF_USERNAME:''}));
 assert.throws(()=>preflight({...env,ACTIONS_ID_TOKEN_REQUEST_TOKEN:''}));
});
test('token-exchange request contains only correct OAuth fields',()=>{
 const x=tokenExchangeRequest('fake-jwt','example_hf');
 assert.equal(x.resource,'example_hf');
 assert.equal(x.subject_token_type,'urn:ietf:params:oauth:token-type:id_token');
 assert.equal(Object.keys(x).length,4);
});
test('mock auth exchange returns no secrets or inference calls',async()=>{
 let calls=0;
 const mock=async (url,options)=>{
  calls++;
  if(calls===1){
   assert.match(url,/audience=https%3A%2F%2Fhuggingface.co/);
   return {ok:true,json:async()=>({value:'eyFakeNotRealJwtWithMoreThanTwentyChars'})};
  }
  assert.equal(url,'https://huggingface.co/oauth/token');
  assert.equal(JSON.parse(options.body).resource,'example_hf');
  return {ok:true,json:async()=>({access_token:'fake-short-lived-hf-token',expires_in:3600})};
 };
 const out=await probe(env,mock);
 assert.equal(out.ok,true);
 assert.equal(out.inferenceCalls,0);
 assert.equal(out.tokenLogged,false);
 assert.equal(calls,2);
 assert.equal(JSON.stringify(out).includes('fake-short-lived-hf-token'),false);
});
test('failed HF identity rejected without leaking token',async()=>{
 let n=0;
 const mock=async()=>{n++;return n===1?{ok:true,json:async()=>({value:'eyFakeNotRealJwtWithMoreThanTwentyChars'})}:{ok:false,status:400}};
 await assert.rejects(probe(env,mock),/exchange rejected/);
});
