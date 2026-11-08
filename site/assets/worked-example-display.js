/* Reusable ChatGPT-style multi-part worked-example presentation.
 * Author-checked against the 2025 Tamil Nadu SCERT Grade 9 maths book, p.54.
 * Scope the first rollout to Example 2.12. No network or dynamic HTML input.
 */
(() => {
 'use strict';
 const ID='g9-ch2-example-12';
 const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const tag=(name,contents)=>'<'+name+'>'+contents+'</'+name+'>';
 const mn=v=>tag('mn',esc(v)),mi=v=>tag('mi',esc(v)),mo=v=>tag('mo',esc(v));
 const row=(...items)=>tag('mrow',items.join(''));
 const root=n=>tag('msqrt',mn(n));
 const frac=(a,b)=>tag('mfrac',row(a)+row(b));
 const paren=inside=>row(mo('(')+inside+mo(')'));
 const eq=(name,expr)=>row(mi(name)+mo('=')+expr);
 const plus=mo('+'), minus=mo('−'),times=mo('×');
 const math=(body,label)=>'<math xmlns="http://www.w3.org/1998/Math/MathML" display="block" class="twd-math" aria-label="'+esc(label)+'">'+row(body)+'</math>';
 const four=[
  {
   part:'i',a:row(mn(2),plus,root(3)),b:row(mn(2),minus,root(3)),operation:'sum',
   x:row(paren(row(mn(2),plus,root(3))),plus,paren(row(mn(2),minus,root(3)))),
   y:row(paren(row(mn(2),plus,root(3))),minus,paren(row(mn(2),minus,root(3)))),
   xEnd:mn(4),yEnd:row(mn(2),root(3)),xr:true,yr:false,
   why:{en:'Adding cancels the two opposite square-root terms. Subtracting makes them add together.',
     ta:'கூட்டும்போது எதிரெதிர் முறுடுகள் நீங்குகின்றன. கழிக்கும்போது அவை சேர்ந்து இரட்டிப்பாகின்றன.'}
  },
  {
   part:'ii',a:row(root(2),plus,mn(7)),b:row(root(2),minus,mn(7)),operation:'sum',
   x:row(paren(row(root(2),plus,mn(7))),plus,paren(row(root(2),minus,mn(7)))),
   y:row(paren(row(root(2),plus,mn(7))),minus,paren(row(root(2),minus,mn(7)))),
   xEnd:row(mn(2),'<mspace width="0.15em"/>',root(2)),yEnd:mn(14),xr:false,yr:true,
   why:{en:'The +7 and −7 cancel in the sum. In the difference, subtracting −7 produces +7.',
     ta:'கூட்டும்போது +7, −7 நீங்குகின்றன. கழிக்கும்போது −7 ஐக் கழிப்பதால் +7 கிடைக்கிறது.'}
  },
  {
   part:'iii',a:root(75),b:root(3),operation:'product',
   x:row(root(75),times,root(3)),
   y:frac(root(75),root(3)),
   xEnd:row(root(225),mo('='),mn(15)),xFinal:mn(15),
   yEnd:row(root(25),mo('='),mn(5)),yFinal:mn(5),xr:true,yr:true,
   why:{en:'Multiply the radicands for x; divide the radicands for y. Both results are perfect squares.',
     ta:'x க்கு மூலத்தின் உள்ளே உள்ள எண்களைப் பெருக்கவும்; y க்கு வகுக்கவும். இரண்டும் நிறைவர்க்கங்கள்.'}
  },
  {
   part:'iv',a:root(18),b:root(3),operation:'product',
   x:row(root(18),times,root(3)),
   y:frac(root(18),root(3)),
   xEnd:row(root(54),mo('='),mn(3),'<mspace width="0.15em"/>',root(6)),xFinal:row(mn(3),'<mspace width="0.15em"/>',root(6)),
   yEnd:root(6),xr:false,yr:false,
   why:{en:'The product simplifies to 3√6 and the quotient to √6. Since 6 is not a perfect square, both are irrational.',
     ta:'பெருக்கலில் 3√6, வகுத்தலில் √6 கிடைக்கின்றன. 6 நிறைவர்க்கம் அல்ல; எனவே இரண்டும் விகிதமுறா எண்கள்.'}
  }
 ];
 function classification(isRational,lang){
  return isRational
   ?(lang==='ta'?'விகிதமுறு எண்':'Rational')
   :(lang==='ta'?'விகிதமுறா எண்':'Irrational');
 }
 function operationFor(entry,isX){
  if(entry.operation==='sum')return isX?row(mi('a'),plus,mi('b')):row(mi('a'),minus,mi('b'));
  return isX?row(mi('a'),mi('b')):frac(mi('a'),mi('b'));
 }
 function quantity(name,body,label,css=''){
  return '<div class="twd-display-equation '+css+'">'+math(eq(name,body),label)+'</div>';
 }
 function question(lang){
  const intro=lang==='ta'
   ?'ஒவ்வொரு பகுதியிலும் x, y என்பவை விகிதமுறு எண்களா அல்லது விகிதமுறா எண்களா எனக் கண்டறிக.'
   :'For each part, decide whether x and y are rational or irrational.';
  return '<div class="twd-question-inner"><p class="twd-prompt">'+esc(intro)+'</p>'+
   '<div class="twd-question-parts">'+four.map(part=>{
    return '<section class="twd-question-part" data-worked-part="'+part.part+'">'+
     '<div class="twd-part-label">('+part.part+')</div>'+
     '<div class="twd-given-grid">'+
       quantity('a',part.a,'a given in part '+part.part,'twd-given')+
       quantity('b',part.b,'b given in part '+part.part,'twd-given')+
     '</div><div class="twd-relations">'+
       math(eq('x',operationFor(part,true)),'definition of x')+
       math(eq('y',operationFor(part,false)),'definition of y')+
     '</div></section>';
   }).join('')+'</div></div>';
 }
 function derivation(part,variable,lang){
  const isX=variable==='x',isRational=isX?part.xr:part.yr;
  const input=isX?part.x:part.y,out=isX?part.xEnd:part.yEnd;
  const label=classification(isRational,lang);
  const classificationClass=isRational?'twd-rational':'twd-irrational';
  return '<div class="twd-derivation" data-variable="'+variable+'">'+
    '<div class="twd-variable-title"><strong>'+variable+'</strong><span class="twd-kind '+classificationClass+'">'+esc(label)+'</span></div>'+
    '<div class="twd-calculation">'+
      '<div class="twd-display-equation">'+math(eq(variable,input),variable+' calculation')+'</div>'+
      '<div class="twd-display-equation twd-calculation-result">'+
       math(row(mo('='),out),variable+' simplified result')+'</div>'+
    '</div></div>';
 }
 function steps(lang){
  return four.map(part=>'<li class="worked-step twd-worked-step" data-worked-part="'+part.part+'">'+
    '<div class="twd-step-heading"><span class="twd-step-index">('+part.part+')</span>'+
      '<h3>'+esc(lang==='ta'?'பகுதி ('+part.part+') இன் தீர்வு':'Solution to part ('+part.part+')')+'</h3></div>'+
    '<p class="twd-step-reason">'+esc(part.why[lang]||part.why.en)+'</p>'+
    '<div class="twd-derivations">'+derivation(part,'x',lang)+derivation(part,'y',lang)+'</div>'+
    '</li>').join('');
 }
 function answer(lang){
  return '<div class="twd-final-list">'+four.map(part=>
   '<div class="twd-final-row" data-worked-part="'+part.part+'">'+
     '<strong class="twd-final-part">('+part.part+')</strong>'+
     '<div class="twd-final-values">'+
      '<div class="twd-final-value">'+math(eq('x',part.xFinal||part.xEnd), 'x result part '+part.part)+
       '<span class="twd-kind '+(part.xr?'twd-rational':'twd-irrational')+'">'+esc(classification(part.xr,lang))+'</span></div>'+
      '<div class="twd-final-value">'+math(eq('y',part.yFinal||part.yEnd), 'y result part '+part.part)+
       '<span class="twd-kind '+(part.yr?'twd-rational':'twd-irrational')+'">'+esc(classification(part.yr,lang))+'</span></div>'+
     '</div></div>').join('')+'</div>';
 }
 function get(item,language){
  if(item?.id!==ID)return null;
  const lang=language==='ta'?'ta':'en';
  return {question:question(lang),steps:steps(lang),answer:answer(lang)};
 }
 window.TriggleWorkedDisplay=Object.freeze({get});
})();
