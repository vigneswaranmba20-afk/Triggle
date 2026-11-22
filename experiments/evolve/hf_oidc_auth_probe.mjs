#!/usr/bin/env node
/**
 * EVOLVE OIDC account identity proof. Zero model calls.
 * Account CI/CD identity configured: trigger auth-only probe from the isolated branch.
 * GitHub Actions -> OIDC -> Hugging Face user-scoped, short-lived token.
 * The exchanged access token and GitHub ID token never enter logs or artifacts.
 */
import {pathToFileURL} from 'node:url';
import {resolve} from 'node:path';
const REPO='vigneswaranmba20-afk/Triggle';
const REF='refs/heads/experiment/evolve-shadow-v1-20261122';
const WORKFLOW=REPO+'/.github/workflows/evolve-audit-repair.yml@'+REF;
const OAUTH='https://huggingface.co/oauth/token';
const AUDIENCE='https://huggingface.co';
export function preflight(e){
 if(e.GITHUB_REPOSITORY!==REPO || e.GITHUB_REF!==REF || e.GITHUB_WORKFLOW_REF!==WORKFLOW)
  throw Error('Rejected: GitHub repository/branch/workflow identity mismatch');
 if(e.GITHUB_EVENT_NAME!=='push')throw Error('Rejected: only authorized experimental push event may probe');
 if(!/^[A-Za-z0-9_-]{2,64}$/.test(e.EVOLVE_HF_USERNAME||''))throw Error('Rejected: set repository variable EVOLVE_HF_USERNAME to your HF account name');
 if(!e.ACTIONS_ID_TOKEN_REQUEST_URL || !e.ACTIONS_ID_TOKEN_REQUEST_TOKEN)
  throw Error('Rejected: GitHub id-token permission is unavailable');
 return true;
}
export function tokenExchangeRequest(idToken,username){
 if(!idToken||!username)throw Error('Missing OIDC subject/resource');
 return {
  grant_type:'urn:ietf:params:oauth:grant-type:token-exchange',
  subject_token_type:'urn:ietf:params:oauth:token-type:id_token',
  subject_token:idToken,resource:username
 };
}
export async function probe(e=process.env, http=fetch){
 preflight(e);
 const url=new URL(e.ACTIONS_ID_TOKEN_REQUEST_URL);
 url.searchParams.set('audience',AUDIENCE);
 // Metadata bearer token is provided by GitHub only inside this job.
 const oidc=await http(url.toString(),{
  headers:{Authorization:'Bearer '+e.ACTIONS_ID_TOKEN_REQUEST_TOKEN,Accept:'application/json'}
 });
 if(!oidc.ok)throw Error('GitHub OIDC request unsuccessful (HTTP '+oidc.status+')');
 const idPayload=await oidc.json();
 const idToken=idPayload?.value;
 if(typeof idToken!=='string'||idToken.length<20)throw Error('GitHub did not return an ID token');
 const hf=await http(OAUTH,{
  method:'POST',headers:{'Content-Type':'application/json',Accept:'application/json'},
  body:JSON.stringify(tokenExchangeRequest(idToken,e.EVOLVE_HF_USERNAME))
 });
 if(!hf.ok)throw Error('Hugging Face OIDC exchange rejected (HTTP '+hf.status+'); verify CI/CD Access repository/branch/workflow claims');
 const out=await hf.json();
 if(typeof out?.access_token!=='string'||out.access_token.length<10||
   !(Number(out.expires_in)>0 && Number(out.expires_in)<=3600))
  throw Error('Hugging Face returned an invalid short-lived token');
 // No Hugging Face model inference is performed and tokens never leave memory.
 return {ok:true,expiresWithinMinutes:Math.ceil(Number(out.expires_in)/60),inferenceCalls:0,
  githubWritePermissions:0, tokenLogged:false,tokenPersisted:false};
}
async function main(){
 if(process.argv.length!==3||process.argv[2]!=='--probe')throw Error('Only --probe mode available: no inference');
 const result=await probe();
 console.log('EVOLVE Hugging Face OIDC identity verified:',JSON.stringify(result));
}
if(process.argv[1]&&import.meta.url===pathToFileURL(resolve(process.argv[1])).href)
 main().catch(e=>{console.error('OIDC probe failed safely:',e.message);process.exitCode=1;});
