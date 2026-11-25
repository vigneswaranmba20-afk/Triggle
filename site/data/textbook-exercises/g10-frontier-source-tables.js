/* Source tables from the revised 2025 Grade 10 Mathematics textbooks. */
(() => {
  'use strict';
  const tex=(latex,fallback=latex)=>({latex,fallback});
  const tagged=(value,fragments)=>value.split(fragments).filter(Boolean).map(part=>
    /^(?:[pq]\(x\)|y=ax\+b|40|53\.3)$/.test(part)?tex(part):part);
  const forearm={
    headers:['Forearm length (cm)','Height (inches)'],
    ta:{headers:['முன்னங்கையின் நீளம் (செ.மீ.)','உயரம் (அங்குலம்)'],caption:'பாடநூல் தரவுகள்'},
    caption:'Textbook data',rows:[[35,56],[45,65],[50,69.5],[55,74]]
  };
  const algebra={
    'c10-3-ex3-3-q4-i':[
      tex('a^3-10a^2+11a+70','a³ − 10a² + 11a + 70'),
      tex('a-7','a − 7'),tex('a^2-12a+35','a² − 12a + 35'),null
    ],
    'c10-3-ex3-3-q4-ii':[
      tex('(x^4-y^4)(x^4+x^2y^2+y^4)','(x⁴ − y⁴)(x⁴ + x²y² + y⁴)'),
      tex('x^2-y^2','x² − y²'),null,
      tex('(x^4-y^4)(x^2+y^2-xy)','(x⁴ − y⁴)(x² + y² − xy)')
    ]
  };
  function relationPrompt(question,lang){
    const table=question.indexOf(lang==='ta'?' முன்னங்கை நீளம் (செமீ), உயரம்':' Data (x cm,y inches)');
    const firstPart=question.indexOf(' (i)');
    const markup=/(y=ax\+b|\b40\b|\b53\.3\b)/;
    return {before:tagged(question.slice(0,table),markup),after:tagged(question.slice(firstPart),markup)};
  }
  function algebraPrompt(question,part,lang){
    const number=' ('+part+') ';
    const split=question.indexOf(number);
    return {
      before:tagged(question.slice(0,split)+number,/(p\(x\)|q\(x\))/),
      after:lang==='ta'?[tex(part==='i'?'q(x)':'p(x)'),' ஐக் காண்க.']:['Find ',tex(part==='i'?'q(x)':'p(x)'),'.']
    };
  }
  window.TriggleG10SourceTables=items=>{
    for(const item of items){
      if(item.id==='c10-1-1-3-q10'){
        item.dataTable={...forearm,sourcePrompt:{en:relationPrompt(item.q.en,'en'),ta:relationPrompt(item.q.ta,'ta')}};
        item.figureInSolution=true;
        continue;
      }
      const polynomials=algebra[item.id];
      if(!polynomials)continue;
      const part=item.id.endsWith('-ii')?'ii':'i';
      const rows=(headings,unknown)=>headings.map((heading,index)=>[heading,polynomials[index]??unknown]);
      item.dataTable={
        headers:['Quantity','Polynomial'],caption:'Textbook data',
        rows:rows(['LCM','GCD',tex('p(x)'),tex('q(x)')],'Find this value'),
        ta:{headers:['விவரம்','பல்லுறுப்புக் கோவை'],caption:'பாடநூல் தரவுகள்',
          rows:rows(['மீ.சி.ம','மீ.பெ.வ',tex('p(x)'),tex('q(x)')],'காண்க')},
        sourcePrompt:{en:algebraPrompt(item.q.en,part,'en'),ta:algebraPrompt(item.q.ta,part,'ta')}
      };
    }
  };
})();
