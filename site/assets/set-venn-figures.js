/* Original, source-aligned Venn diagrams for 2025 SCERT Grade 9 Set Language.
 * These schematic diagrams are NOT textbook artwork. Do not use a generic
 * figure for an example whose source values have not been checked. */
(()=>{'use strict';
 const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const S=Object.freeze({
  11:{a:'P',b:'Q',left:['n'],both:['m'],right:['i','j'],mode:'union',page:14},
  12:{a:'A',b:'B',left:['2','4','8','10'],both:['6','12'],right:['3','9'],mode:'intersection',page:15},
  13:{a:'A',b:'C',left:['2','3'],both:[],right:[],mode:'none',page:15},
  14:{a:'A',b:'B',left:['−3','−2'],both:['1','4'],right:['0','2'],mode:'onlyA',page:16},
  15:{a:'A',b:'B',left:['6','7','9'],both:['8'],right:['10','12'],mode:'symmetric',page:16},
  16:{a:'A',b:'B',left:[],both:[],right:[],mode:'symmetric',page:17,symbolic:true},
  17:{a:'A',b:'B',left:['a','i','u'],both:['e','o'],right:['b','c'],outside:['d','g'],mode:'none',page:17,universe:true},
  18:{a:'A',b:'B',left:[],both:[],right:[],mode:'complement-examples',page:18,symbolic:true,universe:true},
  25:{a:'A',b:'B',left:[],both:[],right:[],mode:'outsideUnion',page:26,symbolic:true,universe:true},
  27:{a:'A',b:'B',left:['5','15'],both:['10','20'],right:['30','40','50'],mode:'union',page:29},
  28:{a:'A',b:'B',left:['30'],both:['6'],right:['4'],outside:['23'],mode:'intersection',page:29,universe:true,count:true},
  29:{a:'A',b:'B',left:['b','d','g'],both:['e','h'],right:['a','c'],mode:'onlyA',page:30},
  30:{a:'H',b:'C',left:['190'],both:['110'],right:['140'],outside:['0'],mode:'union',page:30,universe:true,count:true},
  31:{a:'V',b:'C',left:['30'],both:['5'],right:['25'],outside:['0'],mode:'intersection',page:31,universe:true,count:true}
 });
 const exampleNumber=item=>{
  if(item?.classNum!==9)return null;
  const match=/^c9-textbook-example-1-(\d+)$/.exec(String(item.id||''));
  return match?Number(match[1]):null;
 };
 const supports=item=>Object.hasOwn(S,exampleNumber(item));
 const needsInline=item=>[11,16,17,18,25,27,30].includes(exampleNumber(item));
 const titles={
  en:{left:'Only',both:'Both',right:'Only',outside:'Neither',figure:'Original Venn diagram',description:'Venn regions for this example; not a copy of the textbook drawing.',source:'2025 textbook, printed page',label:'Students/objects per region',frame:'Schematic region; universe not specified',shading:'Highlighted region',modes:["A′","(A−B)′","(A∪B)′"]},
  ta:{left:'மட்டும்',both:'இரண்டிலும்',right:'மட்டும்',outside:'வெளியே',figure:'புதிய வென் படம்',description:'இவ்வெடுத்துக்காட்டுக்கான அசல் விளக்கப்படம்; பாடநூல் படத்தின் நகல் அல்ல.',source:'2025 பாடநூல், அச்சுப் பக்கம்',label:'ஒவ்வொரு பகுதியின் உறுப்புகள்',frame:'குறிப்பிட்ட அனைத்துக் கணம் தரப்படவில்லை',shading:'சுட்டப்பட்ட பகுதி',modes:["A′","(A−B)′","(A∪B)′"]}
 };
 function linesAt(x,y,values,fallback){
  const data=values.length?values:[fallback];
  const rows=[];let row='';
  for(const v of data){
   const next=row?row+', '+v:v;
   if(next.length>11&&row){rows.push(row);row=v;}
   else row=next;
  }
  if(row)rows.push(row);
  return rows.map((r,i)=>'<text x="'+x+'" y="'+(y+(i-(rows.length-1)/2)*22)+'" text-anchor="middle" font-size="'+(r.length>12?13:16)+'" font-family="system-ui,sans-serif" font-weight="700" fill="#263049">'+esc(r)+'</text>').join('');
 }
 function one(spec,mode,index,lang,n){
  const txt=titles[lang],id='g9venn-'+n+'-'+index,ax=208,bx=328,cy=151,r=102;
  const A='<circle cx="'+ax+'" cy="'+cy+'" r="'+r+'"/>',B='<circle cx="'+bx+'" cy="'+cy+'" r="'+r+'"/>';
  const masks='<defs>'+
   '<clipPath id="'+id+'-bclip">'+B+'</clipPath>'+
   '<clipPath id="'+id+'-aclip">'+A+'</clipPath>'+
   '<mask id="'+id+'-a"><rect width="560" height="330" fill="black"/><circle cx="'+ax+'" cy="'+cy+'" r="'+r+'" fill="white"/><circle cx="'+bx+'" cy="'+cy+'" r="'+r+'" fill="black"/></mask>'+
   '<mask id="'+id+'-b"><rect width="560" height="330" fill="black"/><circle cx="'+bx+'" cy="'+cy+'" r="'+r+'" fill="white"/><circle cx="'+ax+'" cy="'+cy+'" r="'+r+'" fill="black"/></mask>'+
   '<mask id="'+id+'-notA"><rect width="560" height="330" fill="white"/><circle cx="'+ax+'" cy="'+cy+'" r="'+r+'" fill="black"/></mask>'+
   '<mask id="'+id+'-notUnion"><rect width="560" height="330" fill="white"/><circle cx="'+ax+'" cy="'+cy+'" r="'+r+'" fill="black"/><circle cx="'+bx+'" cy="'+cy+'" r="'+r+'" fill="black"/></mask>'+
   '<mask id="'+id+'-notOnlyA"><rect width="560" height="330" fill="white"/><circle cx="'+ax+'" cy="'+cy+'" r="'+r+'" fill="black"/><circle cx="'+bx+'" cy="'+cy+'" r="'+r+'" fill="white" clip-path="url(#'+id+'-aclip)"/></mask>'+
   '</defs>';
  const rect='<rect x="24" y="26" width="512" height="272" rx="13" fill="#fff" stroke="#b6accd" stroke-width="2"/>';
  const shadeRect=(mask,color)=>'<rect x="26" y="28" width="508" height="268" fill="'+color+'" mask="url(#'+id+'-'+mask+')"/>';
  const clipIntersection='<circle cx="'+ax+'" cy="'+cy+'" r="'+r+'" fill="#7fcabb" clip-path="url(#'+id+'-bclip)"/>';
  let shade='';
  if(mode==='union')shade='<circle cx="'+ax+'" cy="'+cy+'" r="'+r+'" fill="#b7a9eb"/><circle cx="'+bx+'" cy="'+cy+'" r="'+r+'" fill="#b7a9eb"/>'+clipIntersection;
  if(mode==='intersection')shade=clipIntersection;
  if(mode==='onlyA')shade=shadeRect('a','#b7a9eb');
  if(mode==='onlyB')shade=shadeRect('b','#b7a9eb');
  if(mode==='symmetric')shade=shadeRect('a','#b7a9eb')+shadeRect('b','#b7a9eb');
  if(mode==='outsideA')shade=shadeRect('notA','#b7a9eb');
  if(mode==='notOnlyA')shade=shadeRect('notOnlyA','#b7a9eb');
  if(mode==='outsideUnion')shade=shadeRect('notUnion','#b7a9eb');
  const outline='<circle cx="'+ax+'" cy="'+cy+'" r="'+r+'" fill="none" stroke="#5542a0" stroke-width="3"/>'+
   '<circle cx="'+bx+'" cy="'+cy+'" r="'+r+'" fill="none" stroke="#2a8479" stroke-width="3"/>';
  const header='<text x="147" y="63" font-size="21" fill="#5542a0" font-weight="850">'+esc(spec.a)+'</text>'+
   '<text x="393" y="63" font-size="21" fill="#2a8479" font-weight="850">'+esc(spec.b)+'</text>'+
   (spec.universe?'<text x="39" y="53" font-size="18" fill="#635872" font-weight="800">U</text>':'');
  const left=spec.symbolic?[spec.a+' only']:spec.left;
  const both=spec.symbolic?[spec.a+'∩'+spec.b]:spec.both;
  const right=spec.symbolic?[spec.b+' only']:spec.right;
  const lab=linesAt(165,166,left,'∅')+linesAt(269,166,both,'∅')+linesAt(374,166,right,'∅')+
   (spec.outside?linesAt(465,260,spec.outside,''):spec.symbolic&&spec.universe?linesAt(470,258,['outside'],''):'');
  const desc=(spec.count?'Counts: ':'Members: ')+spec.a+' only '+left.join(',')+'; '+spec.a+'∩'+spec.b+' '+both.join(',')+'; '+spec.b+' only '+right.join(',')+(spec.outside?'; outside '+spec.outside.join(','):'')+'. '+txt.shading+': '+mode+'.';
  return '<svg class="g9-venn-svg" viewBox="0 0 560 330" role="img" aria-labelledby="'+id+'-title '+id+'-desc" xmlns="http://www.w3.org/2000/svg">'+
   '<title id="'+id+'-title">'+esc(txt.figure+' 1.'+n+(mode==='none'?'':' · '+mode))+'</title>'+
   '<desc id="'+id+'-desc">'+esc(desc)+'</desc>'+
   masks+rect+shade+outline+header+lab+'</svg>';
 }
 function render(item,language){
  if(!supports(item))return null;
  const n=exampleNumber(item),spec=S[n],lang=language==='ta'?'ta':'en',txt=titles[lang];
  const modes=spec.mode==='complement-examples'?['outsideA','notOnlyA','outsideUnion']:[spec.mode];
  const bodies=modes.map((mode,i)=>'<figure class="g9-venn-figure">'+
   (modes.length>1?'<figcaption>'+esc(txt.modes[i])+'</figcaption>':'')+
   one(spec,mode,i,lang,n)+'</figure>').join('');
  const alt=[txt.label,spec.a+' only: '+(spec.left.join(', ')||'∅'),spec.a+'∩'+spec.b+': '+(spec.both.join(', ')||'∅'),spec.b+' only: '+(spec.right.join(', ')||'∅')];
  if(spec.outside)alt.push(txt.outside+': '+spec.outside.join(', '));
  return {html:'<div class="g9-venn-gallery">'+bodies+'</div><p class="g9-venn-text-alternative">'+esc(alt.join(' · '))+'</p>',
   caption:txt.description+' · '+txt.source+' '+spec.page+'.'};
 }
 window.TriggleSetVenn=Object.freeze({supports,needsInline,render,exampleNumber});
})();