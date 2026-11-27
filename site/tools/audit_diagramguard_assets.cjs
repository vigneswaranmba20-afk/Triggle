'use strict';
// Exploratory scan of legacy SVGs. Reports candidates for review, never a release pass.
const fs=require('node:fs/promises');
const path=require('node:path');
const {chromium}=require('playwright');
const {server,launchOptions}=require('./dashboard_test_support.cjs');
const site=path.resolve(__dirname,'..');

async function main(){
  const branches=await fs.readdir(path.join(site,'assets'));
  const files=(await Promise.all(branches.filter(dir=>/^grade(9|10)-/.test(dir)).map(async dir=>
    (await fs.readdir(path.join(site,'assets',dir))).filter(name=>name.endsWith('.svg'))
      .map(name=>'assets/'+dir+'/'+name)))).flat();
  const app=await server();
  let browser;
  try{
    browser=await chromium.launch(launchOptions());
    const page=await browser.newPage({viewport:{width:390,height:844},serviceWorkers:'block'});
    await page.goto(app.base+'/index.html?class=10');
    const report=await page.evaluate(async files=>{
      const unique=new Map();
      const stored=await Promise.all(files.map(async asset=>{
        const response=await fetch('./'+asset);
        if(!response.ok)throw Error(asset+' '+response.status);
        return {asset,markup:await response.text()};
      }));
      for(const {asset,markup} of stored){
        const signature=markup.replace(/<(title|desc)\b[^>]*>[\s\S]*?<\/\1>/g,'');
        if(!unique.has(signature))unique.set(signature,{assets:[],markup});
        unique.get(signature).assets.push(asset);
      }
      await document.fonts.load('16px "Triggle Noto Sans Tamil"','வடிவியல்');
      await document.fonts.ready;
      const host=document.createElement('div');
      host.style.cssText='position:absolute;left:-2000px;top:0;pointer-events:none';
      document.body.append(host);
      const root=host.attachShadow({mode:'closed'});
      const figures=[];
      for(const {assets,markup} of unique.values()){
        root.innerHTML=markup;
        const svg=root.querySelector('svg');
        if(!svg){figures.push({assets,measured:false,unmeasured:['invalid SVG']});continue;}
        svg.style.cssText='display:block;width:300px;height:auto;font-family:var(--ver-font, sans-serif)';
        const {measured,labels,issues,unmeasured}=window.TriggleDiagramGuard.audit(svg,{discover:true});
        figures.push({assets,measured,labelCount:labels.length,issues,unmeasured});
      }
      host.remove();
      return {assetFiles:files.length,distinctRenderings:unique.size,figures};
    },files);
    console.log(JSON.stringify(report,null,2));
  }finally{
    await browser?.close();
    await app.close();
  }
}
main().catch(error=>{console.error(error);process.exitCode=1;});
