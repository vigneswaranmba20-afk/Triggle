'use strict';
const katex=require('../assets/vendor/katex/katex.min.js');
const candidates=[
 ['literal rupee', String.raw`\text{₹}`],
 ['char text rupee', String.raw`\text{\char"20B9}`],
 ['char math rupee', String.raw`\char"20B9`],
 ['char lowercase', String.raw`\char"20b9`],
 ['numeric INR', String.raw`\text{INR}`],
 ['plain Rs', String.raw`\text{Rs.}`]
];
for(const [name,src] of candidates){
 try{
  const html=katex.renderToString(src,{displayMode:true,output:'htmlAndMathml',throwOnError:true,trust:false,strict:'error',maxExpand:200,maxSize:20,macros:{}});
  console.log(JSON.stringify({name,ok:html.includes('<math'),rupee:html.includes('₹'),errors:html.includes('mathcolor="#cc0000"')}));
 }catch(e){console.log(JSON.stringify({name,ok:false,error:String(e.message).slice(0,130)}));}
}
