'use strict';
/**
 * TRACE exact-integer oracle for the first geometric-series review pilot.
 * This checks a supplied mathematical claim, NOT transcription fidelity or
 * the reasoning of every displayed solution step.
 */
const crypto=require('node:crypto');
function invalid(){throw Error('INVALID_MATH_SPEC');}
function exactGeometric(spec){
  if(!spec||typeof spec!=='object'||Array.isArray(spec)||
      Object.keys(spec).sort().join(',')!=='a,claimedSum,kind,n,r'||
      spec.kind!=='geometric-series')invalid();
  const validInt=x=>Number.isSafeInteger(x)&&Math.abs(x)<=20;
  if(!validInt(spec.a)||!validInt(spec.r)||!Number.isInteger(spec.n)||spec.n<1||spec.n>30||
      typeof spec.claimedSum!=='string'||!/^-?(?:0|[1-9]\d{0,79})$/.test(spec.claimedSum))invalid();
  let term=BigInt(spec.a),sum=0n;
  for(let i=0;i<spec.n;i++){sum+=term;term*=BigInt(spec.r);}
  // Independently verify the finite geometric-series telescoping identity,
  // including ratio 0, 1, and negative values.
  const a=BigInt(spec.a),r=BigInt(spec.r),n=BigInt(spec.n);
  const identity=(r-1n)*sum===a*(r**n-1n);
  if(!identity)throw Error('INTERNAL_ORACLE_FAILURE');
  const claimed=BigInt(spec.claimedSum);
  const fingerprint=crypto.createHash('sha256').update(JSON.stringify(spec)).digest('hex');
  return {status:sum===claimed?'EXACT_MATCH':'EXACT_MISMATCH',
    expectedSum:sum.toString(),claimedSum:claimed.toString(),
    telescopingIdentityPassed:true,mathSpecSha256:fingerprint};
}
function checkMath(record){
  if(!Object.hasOwn(record,'mathSpec'))return null;
  return exactGeometric(record.mathSpec);
}
module.exports={exactGeometric,checkMath};
