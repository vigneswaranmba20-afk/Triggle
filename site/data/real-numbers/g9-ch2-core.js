/* Grade 9 Real Numbers · 2025 revised Tamil Nadu SCERT.
   Textbook source PDFs: Google Drive 1WxLnjLPhAGkTylUHNFvh8UL34Z8eqC4J (EN),
   1gp6z1UOuqoH6MCuZt_qNi492R3vZUWaj (TA).
   Explanations original; Tamil full editorial review pending.
 */
(()=>{'use strict';
 const grade=window.TRIGGLE_CLASSES?.[9];
 const chapter=window.TRIGGLE_CURRICULUM?.grades?.find(x=>x.grade===9)?.chapters?.find(x=>x.id==='g9-ch2');
 if(!grade||!chapter)throw Error('Real Numbers content dependencies not loaded');
 const known=new Set(grade.items.map(x=>x.id));
 const base={
   classNum:9,chapter:'2',
   topic:{en:'Real Numbers',ta:'மெய்யெண்கள்'},
   sourceEdition:'2025 revised',
   source:'https://drive.google.com/file/d/1WxLnjLPhAGkTylUHNFvh8UL34Z8eqC4J/view',
   tamilSource:'https://drive.google.com/file/d/1gp6z1UOuqoH6MCuZt_qNi492R3vZUWaj/view'
 };
 const ensure=(x)=>{
   if(known.has(x.id))return false;
   if(!x.q?.en||!x.q?.ta||!x.answer||!Array.isArray(x.steps)||x.steps.length<2)throw Error('Incomplete real-number question '+x.id);
   for(const [i,s] of x.steps.entries())if(!s.en||!s.ta||!s.eq)throw Error('Incomplete real-number step '+x.id+' #'+i);
   grade.items.push(x);known.add(x.id);chapter.legacyQuestionIds.push(x.id);return true;
 };
 const row=(type,key,opts)=>{
   const q=opts.q,ta=opts.ta,ans=opts.answer,st=opts.steps;
   const label=type==='example'?{en:'Example 2.'+key,ta:'எடுத்துக்காட்டு 2.'+key}:
     {en:'Exercise 2.'+opts.ex+' · Q'+opts.n+(opts.part?' ('+opts.part+')':''),
      ta:'பயிற்சி 2.'+opts.ex+' · வினா '+opts.n+(opts.part?' ('+opts.part+')':'')};
   return {
      ...base,id:type==='example'?'g9-ch2-example-'+key:'g9-ch2-ex'+opts.ex+'-q'+opts.n+(opts.part?'-'+opts.part:''),
      exercise:type==='example'?'2.examples':'2.'+opts.ex,
      kind:type==='example'?'textbook-example':'textbook-exercise',
      label,title:{en:opts.title||'Real Numbers · '+label.en,ta:opts.titleTa||'மெய்யெண்கள் · '+label.ta},
      q:{en:q,ta:ta},steps:st.map(s=>Array.isArray(s)?{en:s[0],ta:s[1],eq:s[2]}:s),
      answer:ans,printedPage:opts.page,tamilPrintedPage:opts.tamilPage||null,
      reference:'Tamil Nadu SCERT Mathematics, 2025 revised, Grade 9, Chapter 2, '+label.en+', printed page '+opts.page,
      difficulty:opts.hard?'hard':'standard',detailed:opts.hard?opts.detailed||null:null,
      ...(opts.diagram?{diagram:opts.diagram}:{})
   };
 };
 const addExample=(n,opts)=>ensure(row('example',n,opts));
 const addExercise=(ex,n,part,opts)=>ensure(row('exercise',0,{...opts,ex,n,part}));
 window.TriggleRealCh2={addExample,addExercise,chapter,grade};
})();