'use strict';
/* Build-time notation compiler for the existing Grade 9 presentation annotations.
 * It accepts a bounded mathematical grammar, never HTML or runtime prose.
 * Unknown tokens remain verbatim; compiled spans retain exact source anchors.
 */
const supers={'⁰':'0','¹':'1','²':'2','³':'3','⁴':'4','⁵':'5','⁶':'6','⁷':'7','⁸':'8','⁹':'9','⁻':'-','ⁿ':'n','ᵏ':'k'};
const subs={'₀':'0','₁':'1','₂':'2','₃':'3','₄':'4','₅':'5','₆':'6','₇':'7','₈':'8','₉':'9','ᵢ':'i'};
const ops={'−':'-','–':'-','×':'\\times','÷':'\\div','≤':'\\le','≥':'\\ge','≠':'\\ne','≈':'\\approx','⇒':'\\Rightarrow','∈':'\\in','∉':'\\notin','∪':'\\cup','∩':'\\cap','⊂':'\\subset','⊆':'\\subseteq','∅':'\\varnothing','ℕ':'\\mathbb{N}','ℤ':'\\mathbb{Z}','π':'\\pi','θ':'\\theta','φ':'\\phi','α':'\\alpha','β':'\\beta','Σ':'\\sum','σ':'\\sigma','μ':'\\mu','∠':'\\angle','Δ':'\\triangle','≅':'\\cong','°':'^{\\circ}','…':'\\ldots','...':'\\ldots','′':"'",'∣':'|'};
const functions=new Set(['sin','cos','tan','sec','cosec','cot','deg']);
const labels=new Set(['LHS','RHS','TSA','LSA','CF','Mean','Median','Mode','mean','median','mode','Sum','sum','Total','Area','Cost','Base','Side','Volume','Number','Opposite','Adjacent','Hypotenuse','Green','Blue','Red','Goals','Vwall','Vbrick','Vcube','Vcuboid','height','base','breadth','length','cost','Angles','Answer','Unshaded','Diagonal','Wall','Ceiling','total','brick','wall','sides','Unknown','Modes','Maximum','chord','cf','triangle','parallelogram']);
const units=new Set(['cm','mm','kg','km','m','litres']);
const products=new Set(['ab','bh','lb','lh','fx','fd','fu','xy','ax','cx','dx','acx']);
const word=t=>/^[A-Za-z]+$/.test(t);
const identifier=t=>/^[A-Za-z]$/.test(t)||/^[A-Z]{2,4}$/.test(t)||functions.has(t)||labels.has(t)||units.has(t)||products.has(t);
const lex=source=>[...source.matchAll(/\[\[|\]\]|\.{3}|\d{1,3}(?:,\d{3})+(?!\d)|\d+(?:\.\d+)?|[A-Za-z]+|_+|[⁰¹²³⁴⁵⁶⁷⁸⁹⁻ⁿᵏ]+|[₀₁₂₃₄₅₆₇₈₉ᵢ]+|\s+|./gu)].map(m=>({text:m[0],start:m.index,end:m.index+m[0].length}));
const textLatex=s=>'\\text{'+s.replace(/[\\{}%&#_$]/g,c=>'\\'+c)+'}';
const allowed=t=>/^\s+$/.test(t)||/^\d/.test(t)||identifier(t)||Object.hasOwn(ops,t)||['[[',']]','|','(',')','[',']','{','}','√','∛','∜','+','-','/','^','=','<','>',',',':',';',"'",'±','̄'].includes(t)||/^_+$/.test(t)||/^[⁰¹²³⁴⁵⁶⁷⁸⁹⁻ⁿᵏ₀₁₂₃₄₅₆₇₈₉ᵢ]+$/u.test(t);
function expression(source,{display=false}={}){
 const tokenData=lex(source).filter(t=>!/^\s+$/.test(t.text)),ts=tokenData.map(t=>t.text==='∣'?'|':t.text);let at=0;
 const slice=(a,b)=>source.slice(tokenData[a]?.start??source.length,tokenData[b-1]?.end??source.length);
 const peek=()=>ts[at],take=()=>ts[at++],expect=t=>{if(take()!==t)throw Error('Expected '+t+' in '+source);};
 const isSuper=t=>/^[⁰¹²³⁴⁵⁶⁷⁸⁹⁻ⁿᵏ]+$/u.test(t||'');
 const node=(latex,kind='atom')=>({latex,kind});
 const begins=t=>t&&((identifier(t)&&!units.has(t))||/^\d/.test(t)||/^_+$/.test(t)||['(','[','{','[[','√','∛','∜','π','θ','φ','α','β','Σ','σ','μ','ℕ','ℤ','∅','∠','Δ','∣'].includes(t));
 function atom(){
  const t=take();if(!t)throw Error('Missing operand');
  if(t==='[['){
   const start=at;let depth=0,split=-1,end=-1;
   for(let i=at;i<ts.length;i++){if(ts[i]==='[[')depth++;else if(ts[i]===']]'){if(depth===0){end=i;break;}depth--;}else if(ts[i]==='|'&&depth===0)split=i;}
   if(split<0||end<0)throw Error('Unbalanced authored fraction');
   const compile=source=>{try{return expression(source).latex;}catch{return textLatex(source);}};
   const n=compile(slice(start,split)),d=compile(slice(split+1,end));at=end+1;
   return node('\\dfrac{'+n+'}{'+d+'}','fraction');
  }
  if(['(','[','{'].includes(t)){
   const close={'(':')','[':']','{':'}'}[t];const inner=sequence(close);expect(close);
   return node('\\left'+(t==='{'?'\\{':t)+inner.latex+'\\right'+(close==='}'?'\\}':close),'group');
  }
  if(t==='|'||t==='∣'){const body=sequence(t);expect(t);return node('\\left|'+body.latex+'\\right|','group');}
  if(['√','∛','∜'].includes(t)){
   const base=power();let body=base.latex;
   if(base.kind==='group'&&(body.startsWith('\\left(')||body.startsWith('\\left[')))body=body.slice(6,-7);
   return node('\\sqrt'+(t==='∛'?'[3]':t==='∜'?'[4]':'')+'{'+body+'}','root');
  }
  if(t==='∠'||t==='Δ'){return node(ops[t]+' '+atom().latex);}
  if(t==='P'&&peek()==='('){take();const start=at;let depth=0;while(at<ts.length){if(peek()==='(')depth++;if(peek()===')'){if(depth===0)break;depth--;}take();}const body=slice(start,at);expect(')');let latex;try{latex=expression(body).latex;}catch{latex=textLatex(body);}return node('P\\left('+latex+'\\right)');}
  if(t==='Σ')return node('\\sum '+atom().latex);
  if(functions.has(t)){
   let exponent='';if(isSuper(peek()))exponent='^{'+[...take()].map(c=>supers[c]).join('')+'}';
   const name=t==='cosec'?'\\operatorname{cosec}':t==='deg'?'\\operatorname{deg}':'\\'+t;
   // A function's argument is its following atom/power, not the entire sum.
   return node(name+exponent+' '+power().latex,'function');
  }
  if(/^\d/.test(t))return node(t.replaceAll(',','{,}'),'number');
  if(/^_+$/.test(t))return node('\\underline{\\phantom{000}}');
  if(units.has(t))return node('\\mathrm{'+t+'}','unit');
  if(labels.has(t))return node('\\text{'+t+'}','label');
  if(identifier(t))return node(t);
  if(ops[t])return node(ops[t]);
  throw Error('Unsupported atom '+t);
 }
 function power(){let base=atom();
  while(isSuper(peek())||/^[₀₁₂₃₄₅₆₇₈₉ᵢ]+$/u.test(peek()||'')||peek()==='^'||peek()==='°'||peek()==="'"||peek()==='′'||peek()==='̄'){
   const t=take();let suffix;
   if(t==='^'){if(peek()==='('){take();suffix='^{'+sequence(')').latex+'}';expect(')');}else suffix='^{'+unary().latex+'}';}
   else if(t==='̄'){base=node('\\bar{'+base.latex+'}',base.kind);continue;}
   else if(t==='°')suffix='^{\\circ}';
   else if(t==="'"||t==='′')suffix="'";
   else if(isSuper(t))suffix='^{'+[...t].map(c=>supers[c]).join('')+'}';
   else suffix='_{'+[...t].map(c=>subs[c]).join('')+'}';
   base=node(base.latex+suffix,base.kind);
  }return base;
 }
 function unary(){if(['+','-','−','–','±','≈'].includes(peek())){const t=take();return node((ops[t]|| (t==='±'?'\\pm':t))+' '+unary().latex);}return power();}
 function juxtapose(){let v=unary();while(begins(peek())){if(v.kind==='number'&&/^\d/.test(peek()))throw Error('Adjacent data values retain their source spacing');const r=unary();v=node(v.latex+(['unit','root'].includes(r.kind)?'\\,':' ')+r.latex,'product');}return v;}
 function product(){let v=juxtapose();while(['/','×','÷'].includes(peek())){const t=take(),r=juxtapose();v=t==='/'?node('\\dfrac{'+v.latex+'}{'+r.latex+'}','fraction'):node(v.latex+' '+ops[t]+' '+r.latex);}while(units.has(peek())){const unit=power();v=node(v.latex+'\\,'+unit.latex,'quantity');}return v;}
 function sum(){let v=product();while(['+','-','−','–','±','∪','∩'].includes(peek())){const t=take();v=node(v.latex+' '+(ops[t]||(t==='±'?'\\pm':t))+' '+product().latex);}return v;}
 function relation(){let v=sum();while(['=','<','>','≤','≥','≠','≈','⇒','∈','∉','⊂','⊆','≅'].includes(peek())){const t=take();v=node(v.latex+' '+(ops[t]||t)+' '+sum().latex);}return v;}
 function sequence(stop){let v=relation();while(peek()&&peek()!==stop&&[',',':',';'].includes(peek())){const t=take();v=node(v.latex+(t===','?', ':t===';'?';\\quad ':' : ')+relation().latex);}if(peek()==='…'||peek()==='...'){v=node(v.latex+'\\ldots');take();}return v;}
 let latex=sequence().latex;if(at!==ts.length)throw Error('Unconsumed '+peek());
 // Break top-level equality chains and independent statements, never relations
 // inside groups, sets, powers, or fractions. This preserves grouping semantics.
 if(display){let depth=0,start=0,rows=[],seen=false;
  for(let i=0;i<latex.length;i++){
   if(['{','(','['].includes(latex[i]))depth++;else if(['}',')',']'].includes(latex[i]))depth--;
   if(depth===0&&latex[i]===','&&seen&&/^[^,;]*=/.test(latex.slice(i+1))){rows.push('&'+latex.slice(start,i));start=i+1;seen=false;}
   else if(depth===0&&latex.slice(i,i+11)==='\\Rightarrow'){rows.push((seen?'&': '&')+latex.slice(start,i));start=i+11;i+=10;seen=false;}
   else if(depth===0&&latex[i]==='='){
    if(seen){rows.push('&'+latex.slice(start,i));start=i;}
    seen=true;
   }else if(depth===0&&latex[i]===';'){rows.push('&'+latex.slice(start,i));start=i+7;i+=6;seen=false;}
  }
  if(rows.length){rows.push('&'+latex.slice(start));latex='\\begin{aligned}'+rows.join(' \\\\ ')+'\\end{aligned}';}
 }
 return {latex,fallback:source,...(display?{display:true}:{})};
}
function rich(source,{display=false}={}){
 if(Array.isArray(source))return source;
 if(source&&typeof source==='object')return source.latex?source:Object.fromEntries(Object.entries(source).map(([k,v])=>[k,rich(v,{display})]));
 if(typeof source!=='string')return source;
 // Preserve already authored structured notation and keep unsupported prose as
 // exact strings. The lexer cannot select text from inside an HTML element.
 if(/<\/?(?:span|math|svg|div|sup|sub)\b[^>]*>/.test(source)||source.includes('\\'))return source;
 const ts=lex(source),out=[];let cursor=0,index=0;
 const text=t=>{if(t){if(typeof out.at(-1)==='string')out[out.length-1]+=t;else out.push(t);}};
 const labels=/^(?:\((?:[iv]+|[1-9]|[a-d])\))/;
 while(index<ts.length){const t=ts[index];
  if(t.text==='('){const m=source.slice(t.start).match(labels);if(m){index=ts.findIndex((v,i)=>i>=index&&v.end>=t.start+m[0].length)+1;continue;}}
  if(!allowed(t.text)||/^\s+$/.test(t.text)||(t.text==='s'&&/[’']/.test(source[t.start-1]||'')&&/[A-Za-z]/.test(source[t.start-2]||''))){index++;continue;}
  // Find the longest valid bounded expression at this token. Failed enclosing
  // groups cannot swallow a smaller valid formula later in the same sentence.
  let end=index,fractionDepth=0,eventDepth=0;while(end<ts.length){const token=ts[end].text;if(token==='[[')fractionDepth++;if(!fractionDepth&&!allowed(token)&&!eventDepth)break;if(token===']]')fractionDepth--;if(token==='P'&&ts[end+1]?.text==='(')eventDepth=1;else if(eventDepth&&token===')')eventDepth=0;if(/^\n/.test(token))break;end++;}
  let found;
  for(let j=end;j>index;j--){const raw=source.slice(t.start,ts[j-1].end).trimEnd();
   if(!raw||/[=+\-−–×÷/:;,]$/.test(raw))continue;
   if(/^[aAiI]$/.test(raw)&&raw!==source.trim())continue;
   if(/[A-Za-z]{2,}/.test(raw)&&!/[0-9=+−–×÷/<>∈∉∪∩√∠Δ²³Σ°₀₁₂₃₄₅₆₇₈₉]/.test(raw)&&!/^[A-Za-z]\(/.test(raw)&&! /\b(?:sin|cos|tan|sec|cosec|cot|deg)\b/.test(raw)&&!products.has(raw)&&!/^\d/.test(raw)&&!/^[A-Z]{2,4}$/.test(raw))continue;
   // A bare prose word/number is not a product; only variables, mathematical
   // symbols and complete numeric tokens are eligible as isolated anchors.
   if(word(raw)&&raw.length>1&&!/^[A-Z]{2,4}$/.test(raw))continue;
   try{found={value:expression(raw,{display:display&&raw.length>12}),end:t.start+raw.length,index:j};break;}catch{}
  }
  if(found){text(source.slice(cursor,t.start));out.push(found.value);cursor=found.end;index=found.index;}else index++;
 }
 text(source.slice(cursor));
 if(!out.length)return source;
 if(display&&out.filter(p=>p?.latex).length>1&&out.every(p=>p?.latex||/^[\s;,]*$/.test(p))){return {latex:'\\begin{gathered}'+out.filter(p=>p?.latex).map(p=>p.latex).join(' \\\\ ')+'\\end{gathered}',fallback:source,display:true};}
 return out.length===1?out[0]:out;
}
module.exports={expression,rich};
