'use strict';
const fs=require('node:fs/promises'),path=require('node:path'),http=require('node:http');
async function server(){
 const root=path.resolve(__dirname,'..');
 const app=http.createServer(async(req,res)=>{try{const url=new URL(req.url,'http://localhost');let pathname=url.pathname;if(pathname==='/dashboard'){res.writeHead(301,{Location:'/dashboard/'});res.end();return;}const file=path.resolve(root,'.'+(pathname.endsWith('/')?pathname+'index.html':pathname));if(!file.startsWith(root+path.sep))throw Error('outside');const bytes=await fs.readFile(file);res.writeHead(200,{'content-type':({'.html':'text/html','.js':'application/javascript','.css':'text/css','.json':'application/json','.png':'image/png','.svg':'image/svg+xml','.webmanifest':'application/manifest+json'})[path.extname(file)]||'application/octet-stream'});res.end(bytes);}catch{res.writeHead(404);res.end();}});
 await new Promise(r=>app.listen(0,'127.0.0.1',r));return {base:'http://127.0.0.1:'+app.address().port,close:()=>new Promise(r=>app.close(r))};
}
const launchOptions=()=>({headless:true,...(process.env.CHROMIUM_PATH?{executablePath:process.env.CHROMIUM_PATH}:{}),args:['--no-sandbox']});
module.exports={server,launchOptions};
