'use strict';
const fs=require('node:fs');
const path=require('node:path');
const {spawnSync}=require('node:child_process');
const repo=path.resolve(__dirname,'../..');
const manifest=require(path.join(repo,'package.json'));
const full=manifest.scripts['test:browser'];
if(!full||typeof full!=='string')throw Error('Missing complete browser-test script');
const commands=full.split(/\s+&&\s+/).map(s=>s.trim()).filter(Boolean);
const index=Number(process.env.BROWSER_SHARD_INDEX);
const count=Number(process.env.BROWSER_SHARD_TOTAL);
if(!Number.isInteger(index)||!Number.isInteger(count)||count<1||index<0||index>=count)throw Error('Invalid browser shard index/count');
console.log('Complete browser suite: '+commands.length+' commands, shard '+index+'/'+count);
let executed=0;
for(let i=0;i<commands.length;i++){
  if(i%count!==index)continue;
  const command=commands[i];
  const match=/^node (site\/tools\/[A-Za-z0-9_.-]+\.cjs)$/.exec(command);
  if(!match)throw Error('Unrecognized test command: '+command);
  const absolute=path.resolve(repo,match[1]);
  if(!fs.existsSync(absolute))throw Error('Missing test script: '+match[1]);
  console.log('\n=== Browser regression '+(i+1)+'/'+commands.length+' — '+match[1]+' ===');
  const started=Date.now();
  const result=spawnSync(process.execPath,[absolute],{
    cwd:repo,stdio:'inherit',env:process.env,
    timeout:4*60*1000
  });
  const seconds=((Date.now()-started)/1000).toFixed(1);
  if(result.error||result.signal||result.status!==0){
    console.error('FAILED '+match[1]+' after '+seconds+'s; status '+result.status+'; signal '+result.signal);
    if(result.error)console.error(result.error);
    process.exit(1);
  }
  console.log('PASSED '+match[1]+' in '+seconds+'s');
  executed++;
}
if(executed===0)throw Error('Empty browser shard');
console.log('Browser shard '+index+' passed: '+executed+' complete tests; all commands accounted for across '+count+' shards.');
