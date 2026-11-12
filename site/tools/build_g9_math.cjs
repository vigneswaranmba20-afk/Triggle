'use strict';
// Build-time migration only. The app consumes explicit TeX, never guesses math
// from prose. Original strings remain the lossless fallback and source authority.
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const root=path.resolve(__dirname,'..');
const supers={'⁰':'0','¹':'1','²':'2','³':'3','⁴':'4','⁵':'5','⁶':'6','⁷':'7','⁸':'8','⁹':'9','⁻':'-','ⁿ':'n','ᵏ':'k','ˣ':'x'};
const symbols={'−':'-','–':'-','×':'\\times','÷':'\\div','≤':'\\le','≥':'\\ge','≠':'\\ne','≈':'\\approx','⇒':'\\Rightarrow','∈':'\\in','±':'\\pm','π':'\\pi','…':'\\ldots'};
const names=new Set(['BD','Cost','deg','radicand','period','xy','ax','cx','dx','acx','ab']);
const lex=source=>[...source.matchAll(/\[\[|\]\]|\d+ +\d+\/\d+|\d+\.\d*\(\d+\)|\d+(?:\.\d+)?|[A-Za-z]+|[⁰¹²³⁴⁵⁶⁷⁸⁹⁻ⁿᵏˣ]+|\s+|./gu)].map(m=>({text:m[0],start:m.index,end:m.index+m[0].length}));
const allowed=t=>/^\s+$/.test(t)||/^\d/.test(t)||/^[a-zA-Z]$/.test(t)||names.has(t)||/^[⁰¹²³⁴⁵⁶⁷⁸⁹⁻ⁿᵏˣ]+$/u.test(t)||['[[',']]','|','(',')','[',']','{','}','√','∛','∜','+','-','−','–','×','÷','/','^','=','<','>','≤','≥','≠','≈','⇒','∈','±','π','…','⅔'].includes(t);

function expression(source,{display=false}={}){
 const tokens=lex(source).filter(t=>!/^\s+$/.test(t.text)).map(t=>t.text);let at=0;
 const peek=()=>tokens[at],take=()=>tokens[at++];
 const isSuper=t=>t&&/^[⁰¹²³⁴⁵⁶⁷⁸⁹⁻ⁿᵏˣ]+$/u.test(t);
 const expect=t=>{if(take()!==t)throw Error('Expected '+t);};
 const begins=t=>t&&(/^(?:\d|[A-Za-z])/.test(t)||['(','[','{','[[','√','∛','∜','π','⅔'].includes(t)||(isSuper(t)&&tokens[at+1]==='√'));
 const node=(latex,kind='atom')=>({latex,kind});
 function atom(){
  const t=take();if(!t)throw Error('Missing operand');
  if(t==='[['){const n=relation('|');expect('|');const d=relation(']]');expect(']]');return node('\\frac{'+n.latex+'}{'+d.latex+'}','fraction');}
  if(['(','[','{'].includes(t)){
   const close={'(':')','[':']','{':'}'}[t],inner=relation(close);expect(close);
   return node('\\left'+(t==='{'?'\\{':t)+inner.latex+'\\right'+(close==='}'?'\\}':close),'group');
  }
  if(t==='|'){const inner=relation('|');expect('|');return node('\\left|'+inner.latex+'\\right|','group');}
  if(['√','∛','∜'].includes(t)||(isSuper(t)&&peek()==='√')){
   let index=t==='∛'?'3':t==='∜'?'4':'';
   if(isSuper(t)){index=[...t].map(c=>supers[c]).join('');expect('√');}
   const base=power();let body=base.latex;
   // Parentheses delimit the radicand in the old source; the radical bar now
   // conveys that grouping. Other explicit grouping stays intact.
   if(base.kind==='group'&&body.startsWith('\\left('))body=body.slice(6,-7);
   return node('\\sqrt'+(index?'['+index+']':'')+'{'+body+'}','root');
  }
  if(/^\d+\.\d*\(\d+\)$/.test(t))return node(t.replace(/\((\d+)\)/,'\\overline{$1}'));
  if(/^\d+ +\d+\/\d+$/.test(t)){const [whole,n,d]=t.split(/[ /]+/);return node(whole+'\\,\\frac{'+n+'}{'+d+'}','mixed');}
  if(/^\d+(?:\.\d+)?$/.test(t))return node(t);
  if(/^[A-Za-z]$/.test(t)||['xy','ax','cx','dx','acx','ab'].includes(t))return node(t);
  if(['BD','Cost','radicand','period'].includes(t))return node('\\text{'+t+'}');
  if(t==='deg')return node('\\operatorname{deg}');
  if(t==='π')return node('\\pi');
  if(t==='⅔')return node('\\frac{2}{3}','fraction');
  throw Error('Unsupported atom '+t);
 }
 function power(){
  let base=atom();
  while(peek()==='^'||isSuper(peek())&&tokens[at+1]!=='√'){
   const t=take();let exponent;
   if(t==='^'){
    if(peek()==='('){take();exponent=relation(')').latex;expect(')');}
    else exponent=unary().latex;
   }else exponent=[...t].map(c=>supers[c]).join('');
   base=node(base.latex+'^{'+exponent+'}','power');
  }
  if(peek()==='…'){take();base=node(base.latex+'\\ldots',base.kind);}
  return base;
 }
 function unary(){if(['+','-','−','–','±','≈'].includes(peek())){const sign=take(),value=unary();return node((symbols[sign]||sign)+' '+value.latex,value.kind);}return power();}
 function juxtaposition(){let value=unary();while(begins(peek())){const right=unary();value=node(value.latex+(right.kind==='fraction'?'\\,':' ')+right.latex,'product');}return value;}
 function product(){
  let value=juxtaposition();
  while(['/','×','÷'].includes(peek())){const op=take(),right=juxtaposition();
   value=op==='/'?node('\\frac{'+value.latex+'}{'+right.latex+'}','fraction'):node(value.latex+' '+symbols[op]+' '+right.latex,'product');
  }return value;
 }
 function sum(){let value=product();while(['+','-','−','–','±'].includes(peek())){const op=take();value=node(value.latex+' '+(symbols[op]||op)+' '+product().latex,'sum');}return value;}
 function relation(stop){
  let value=sum();while(peek()&&peek()!==stop&&['=','<','>','≤','≥','≠','≈','⇒','∈'].includes(peek())){const op=take();value=node(value.latex+' '+(symbols[op]||op)+' '+sum().latex,'relation');}
  if(peek()==='…'){take();value=node(value.latex+'\\ldots');}
  return value;
 }
 let latex=relation().latex;if(at!==tokens.length)throw Error('Unconsumed '+peek());
 // Keep each equality visible on a phone. Only top-level relations become
 // aligned rows: relations inside a radicand, bracket or exponent stay there.
 if(display){
  const rows=[];
  for(const statement of latex.split('\\Rightarrow')){
   let depth=0,marks=[];
   for(let i=0;i<statement.length;i++){
    if(statement[i]==='{')depth++;else if(statement[i]==='}')depth--;
    else if(depth===0&&statement[i]==='=')marks.push(i);
   }
   if(!marks.length)rows.push('&'+statement);
   else{rows.push(statement.slice(0,marks[0])+' &= '+statement.slice(marks[0]+1,marks[1]??statement.length));
    for(let i=1;i<marks.length;i++)rows.push('&= '+statement.slice(marks[i]+1,marks[i+1]??statement.length));}
  }
  if(rows.length>1)latex='\\begin{aligned}'+rows.join(' \\\\ ')+'\\end{aligned}';
 }
 return {latex,fallback:source,...(display?{display:true}:{})};
}

function rich(source,{display=false}={}){
 if(typeof source!=='string')return source;
 if(source.includes('₹'))display=false;
 // Enumerated question/subpart labels are prose, never factors of a formula.
 const labels=/(^|\n|;\s*|\s{2,})(\((?:[iv]+|[1-4])\))(?=\s)/g;
 const protectedRanges=[...source.matchAll(labels)].map(m=>[m.index+m[1].length,m.index+m[0].length]);
 const tokens=lex(source),segments=[];let start=0,index=0;
 const pushText=text=>{if(!text)return;if(typeof segments.at(-1)==='string')segments[segments.length-1]+=text;else segments.push(text);};
 while(index<tokens.length){
  const t=tokens[index];
  if(!allowed(t.text)||protectedRanges.some(([a,b])=>t.start>=a&&t.start<b)){index++;continue;}
  let end=index+1;
  while(end<tokens.length&&allowed(tokens[end].text)&&!protectedRanges.some(([a,b])=>tokens[end].start>=a&&tokens[end].start<b))end++;
  const a=t.start;let b=tokens[end-1].end,raw=source.slice(a,b),body=raw.trim();
  // A parenthesis can belong to following prose, e.g. "p/q (parentheses
  // show...)". Leave that delimiter in prose rather than swallowing p/q.
  if(body.endsWith('(')&&[...body].filter(c=>c==='(').length>[...body].filter(c=>c===')').length){b=source.lastIndexOf('(',b-1);raw=source.slice(a,b);body=raw.trim();}
  // A currency label separates an equation from its monetary value.
  if(body.endsWith('=')&&source[b]==='₹'){b=source.lastIndexOf('=',b-1);raw=source.slice(a,b);body=raw.trim();}
  if(body.endsWith('-')&&/[\u0B80-\u0BFF]/u.test(source[b]||'')){b=source.lastIndexOf('-',b-1);raw=source.slice(a,b);body=raw.trim();}
  const lead=raw.match(/^\s*/)[0],tail=raw.match(/\s*$/)[0];
  try{
   if(!body)throw Error('Whitespace');
   if(/^[aAiI]$/.test(body)&&body!==source.trim())throw Error('Leave prose articles and labels as text');
   const math=expression(body,{display});
   if(!display&&math.latex.includes('\\frac'))math.latex='\\displaystyle '+math.latex;
   pushText(source.slice(start,a)+lead);segments.push(math);pushText(tail);start=b;
  }catch{/* An unsupported expression remains its exact readable source. */}
  index=end;
 }
 pushText(source.slice(start));
 // Separate equalities written with semicolons become compact mathematical
 // rows, rather than leaving punctuation alone between display blocks.
 if(display&&segments.filter(s=>s?.latex).length>1&&segments.every(s=>s?.latex||/^[\s;,]*$/.test(s))){
  return {latex:'\\begin{gathered}'+segments.filter(s=>s?.latex).map(s=>s.latex).join(' \\\\ ')+'\\end{gathered}',fallback:source,display:true};
 }
 return segments.length===1?segments[0]:segments;
}

function load(){const context={window:{}};vm.createContext(context);
 for(const m of fs.readFileSync(path.join(root,'index.html'),'utf8').matchAll(/<script(?: defer)? src="\.\/([^?\"]+)/g)){
  if(m[1].startsWith('data/')&&!m[1].endsWith('g9-clear-math.js'))vm.runInContext(fs.readFileSync(path.join(root,m[1]),'utf8'),context,{filename:m[1]});
 }return context.window.TRIGGLE_CLASSES[9].items.filter(q=>['2','3'].includes(q.chapter)&&!q.kind?.includes('example'));
}
function build(){
 const records=load().map(q=>({id:q.id,questionMath:Object.fromEntries(Object.entries(q.q).map(([lang,text])=>[lang,rich(text)])),
  answerMath:rich(q.answer,{display:true}),steps:q.steps.map(s=>({math:rich(s.eq,{display:true}),reasonMath:Object.fromEntries(['en','ta'].filter(lang=>s[lang]).map(lang=>[lang,rich(s[lang])]))}))}));
 const output='/* Grade 9 Chapters 2/3: explicit, offline TeX presentation. Generated by\n * site/tools/build_g9_math.cjs. Source wording/working is preserved verbatim.\n * This typography migration does not certify textbook fidelity or Tamil review. */\n(()=>{\n\'use strict\';\nconst records='+JSON.stringify(records,null,2)+';\nconst byId=new Map(records.map(record=>[record.id,record]));\nwindow.TriggleG9Math=Object.freeze({get:item=>item?.classNum===9&&[\'2\',\'3\'].includes(String(item.chapter))?byId.get(item.id):undefined});\n})();\n';
 return output;
}
if(require.main===module){const output=build(),file=path.join(root,'data/g9-clear-math.js');if(process.argv.includes('--check')){if(fs.readFileSync(file,'utf8')!==output)throw Error('Grade 9 math presentation is stale; run node site/tools/build_g9_math.cjs');}else fs.writeFileSync(file,output);}
module.exports={expression,rich,load,build};
