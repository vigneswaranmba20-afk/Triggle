'use strict';
// Rasterize the same offline KaTeX used on the learning site. All formulas are
// measured before capture so even broad radical bars stay within the frame.
const {chromium}=require('playwright');
const fs=require('node:fs');
const path=require('node:path');

async function main(){
  const [config,out]=process.argv.slice(2);
  const katex=path.resolve(__dirname,'../assets/vendor/katex');
  const formulas=JSON.parse(fs.readFileSync(config,'utf8'));
  fs.mkdirSync(out,{recursive:true});
  const html=`<!doctype html><meta charset="utf-8">
    <link rel="stylesheet" href="/katex.min.css">
    <script src="/katex.min.js"></script>
    <style>body{margin:32px;color:#192842} #eq{display:inline-block;padding:12px 8px;font-size:38px}
    .katex-display{margin:0}</style><div id="eq"></div>`;
  const executablePath=process.env.CHROMIUM_PATH ||
    (fs.existsSync('/usr/bin/chromium')?'/usr/bin/chromium':undefined);
  const browser=await chromium.launch({executablePath,args:['--no-sandbox','--disable-dev-shm-usage']});
  try{
    const page=await browser.newPage({viewport:{width:1280,height:450},deviceScaleFactor:1});
    await page.route('http://localhost/**',route=>{
      const file=new URL(route.request().url()).pathname;
      if(file==='/')return route.fulfill({contentType:'text/html',body:html});
      if(!/^\/(?:katex\.min\.(?:css|js)|fonts\/[\w.-]+)$/.test(file))return route.abort();
      return route.fulfill({path:path.join(katex,file)});
    });
    await page.goto('http://localhost/');
    for(const [key,latex] of Object.entries(formulas)){
      if(!/^[0-9]+$/.test(key))throw Error('Expected a numeric formula ID');
      const fontSize=await page.evaluate(async(tex)=>{
        const box=document.querySelector('#eq');
        box.style.fontSize='39px';
        katex.render(tex,box,{displayMode:true,throwOnError:true,strict:'error'});
        await document.fonts.ready;
        const width=box.getBoundingClientRect().width;
        if(width>602)box.style.fontSize=`${Math.floor(39*602/width)}px`;
        if(parseInt(box.style.fontSize,10)<33)throw Error('Split this equation into shorter rows: '+tex);
        return box.style.fontSize;
      },latex);
      await page.locator('#eq').screenshot({path:path.join(out,key+'.png'),omitBackground:true});
      console.log('PASS',key,fontSize,latex);
    }
  }finally{
    await browser.close();
  }
}
main().catch(error=>{console.error(error);process.exitCode=1;});
