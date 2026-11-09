(function(){'use strict';
const sbEscapeMath=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
function drawClassic(s){
      const d=s.demo;if(!d||!d.kind)return '';
      const line=(x1,y1,x2,y2,color,width=5)=>`<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${color}" stroke-width="${width}" stroke-linecap="round"/>`;
      const label=(x,y,value,color='#494872',size=17)=>`<text x="${x}" y="${y}" font-size="${size}" text-anchor="middle" fill="${color}" font-family="Arial, sans-serif" font-weight="700">${sbEscapeMath(value)}</text>`;
      let t='';
      if(d.kind==='probability-spinner'){
        // Original SVG reconstruction of an eight-equal-sector textbook spinner.
        const cx=200,cy=132,r=96,numbered=Array.isArray(d.sectors)&&d.sectors.length===8?d.sectors:[1,2,3,4,5,6,7,8];
        const polar=(radius,a)=>[cx+Math.cos(a)*radius,cy+Math.sin(a)*radius];
        numbered.forEach((value,i)=>{
          const a=-Math.PI/2+i*Math.PI/4,b=a+Math.PI/4,mid=(a+b)/2;
          const p=polar(r,a),q=polar(r,b),center=polar(r*.71,mid);
          const fill=i%2===0?'#eee6fb':'#d8ecf6';
          t+=`<path d="M${cx} ${cy} L${p[0].toFixed(2)} ${p[1].toFixed(2)} A${r} ${r} 0 0 1 ${q[0].toFixed(2)} ${q[1].toFixed(2)} Z" fill="${fill}" stroke="#756ca6" stroke-width="2"/>`+
             label(center[0].toFixed(2),center[1].toFixed(2)+0, value, '#354365',22);
        });
        t+=`<circle cx="${cx}" cy="${cy}" r="9" fill="#6654a9"/>`+
           `<path d="M${cx} ${cy} L${cx+26} ${cy-32}" stroke="#df4778" stroke-width="6" stroke-linecap="round"/>`+
           `<text x="200" y="256" text-anchor="middle" font-size="13" fill="#465776">Eight equally likely outcomes: 1–8</text>`;
      }else if(d.kind==='complement-pairs'){
        const pairs=d.pairs||[];
        t=`<text x="200" y="35" text-anchor="middle" font-size="17" font-weight="700" fill="#4b5d89">Complementary angles add to 90°</text>`;
        pairs.forEach(([a,b],i)=>{
          const y=66+i*59,left=42,total=315,widthA=total*a/90;
          t+=`<rect x="${left}" y="${y}" rx="9" width="${widthA}" height="26" fill="#8d80dc" opacity=".85"/>`+
             `<rect x="${left+widthA}" y="${y}" rx="8" width="${total-widthA}" height="26" fill="#f0aa50" opacity=".9"/>`+
             `<text x="${left+widthA/2}" y="${y+19}" text-anchor="middle" fill="white" font-weight="700" font-size="16">${a}°</text>`+
             `<text x="${left+widthA+(total-widthA)/2}" y="${y+19}" text-anchor="middle" fill="#443251" font-weight="700" font-size="16">${b}°</text>`+
             `<text x="200" y="${y+45}" text-anchor="middle" fill="#596789" font-size="14">${a}° + ${b}° = 90°</text>`;
        });
      }else if(d.kind==='triangle'){
        const a=Number(d.adj),o=Number(d.opp);
        // Keep the measurement labels exact; artwork is not a scale drawing.
        // Spread the vertices across the available picture area for legibility.
        const k=Math.min(252/Math.max(.1,a),145/Math.max(.1,o));
        const base=Math.min(255,Math.max(139,a*k)),high=Math.min(153,Math.max(92,o*k));
        const left=55,bottom=214,x=left+base,y=bottom-high;
        const angleName=String(d.angle||'θ'),cornerAtLeft=angleName==='B'?'B':angleName==='A'?'A':angleName;
        const rightName=angleName==='B'?'A':angleName==='A'?'B':'';
        const topName=(angleName==='A'||angleName==='B')?'C':'';
        const leftLabel=label(left-10,bottom+22,cornerAtLeft,'#584aa1',20);
        t=`<path d="M${left} ${bottom} L${x} ${bottom} L${x} ${y} Z" fill="#fff0c9" stroke="#dcc9b6" stroke-width="1.5"/>`+
        line(left,bottom,x,bottom,'#3b82f6',6)+line(x,bottom,x,y,'#ec639b',6)+line(left,bottom,x,y,'#e4a13d',7)+
        `<path d="M${x-15} ${bottom} v-15 h15" fill="none" stroke="#65688e" stroke-width="2.5"/>`+
        `<path d="M${left+32} ${bottom} A32 32 0 0 0 ${left+32*Math.cos(Math.atan2(high,base))} ${bottom-32*Math.sin(Math.atan2(high,base))}" stroke="#8067c6" stroke-width="3" fill="none"/>`+
        label((x+left)/2,bottom+22,a.toString(),'#1b6bc3',20)+
        label(x+27,(bottom+y)/2+6,o.toString(),'#c83978',20)+
        label((x+left)/2-15,(bottom+y)/2-20,d.hyp,'#95611f',19)+
        leftLabel+(rightName?label(x+15,bottom+22,rightName,'#4c5077',18):'')+
        (topName?label(x+15,y-9,topName,'#4c5077',18):'')+
        (/°/.test(angleName)?label(left+38,bottom-11,angleName,'#7356b4',18):'');
      }else if(d.kind==='two-triangles'){
        t=`<path d="M44 220 L98 52 L328 220 Z" fill="#f8f0ff" stroke="#e4d8f6" stroke-width="1"/>`+
        line(44,220,98,52,'#e7a242')+line(98,52,328,220,'#e7a242')+line(44,220,328,220,'#3b82f6')+line(98,52,98,220,'#ef6d9d')+
        `<path d="M98 205 h15 v15" fill="none" stroke="#565276" stroke-width="2"/>`+
        label(62,132,'13')+label(205,142,'20')+label(71,238,'5')+label(222,238,'16')+label(116,132,'12','#d34d8d')+label(98,37,'A')+label(37,237,'B')+label(328,241,'C')+label(98,241,'D');
      }else if(d.kind==='two-right'){
        t=`<path d="M42 220 L153 72 L348 220 Z" fill="#f0edff" stroke="#d9cff5" stroke-width="1"/>`+
        line(42,220,348,220,'#3b82f6')+line(42,220,153,72,'#e7a242')+line(153,72,348,220,'#e7a242')+line(153,72,153,220,'#ef6d9d')+
        `<path d="M153 206 H167 V220" fill="none" stroke="#5e5579" stroke-width="2"/>`+
        label(97,232,'9')+label(251,233,'16')+label(180,156,'12','#d34d8d')+label(82,143,'15')+label(271,141,'20')+
        label(43,244,'A')+label(153,244,'D')+label(348,244,'B')+label(154,59,'C')+label(74,211,'α','#7253b7',15)+label(322,211,'β','#7253b7',15)+label(141,104,'θ','#7253b7',15)+label(180,106,'φ','#7253b7',15);
      }else if(d.kind==='kite'){
        t=`<path d="M48 222 L263 171 L351 151" fill="none" stroke="#eaa65a" stroke-width="6" stroke-linecap="round"/>`+
        line(48,222,351,222,'#3b82f6',4)+line(263,171,263,222,'#ef6d9d',5)+line(351,151,351,222,'#ef6d9d',5)+
        `<path d="M263 210 h12 v12 M351 210 h12 v12" fill="none" stroke="#656183" stroke-width="2"/>`+
        label(155,183,'25 m','#a67327',15)+label(314,149,'10 m','#a67327',15)+label(282,205,'5 m','#d34d8d',15)+label(374,191,'h','#d34d8d',20)+
        label(48,244,'O')+label(263,244,'M')+label(351,244,'N')+label(263,161,'P')+label(351,140,'Q');
      }else if(d.kind==='tree'){
        t=line(54,223,350,223,'#3b82f6',4)+line(54,223,54,53,'#ef6d9d',6)+line(54,53,350,223,'#e7a242',6)+
        `<path d="M54 209 h14 v14" fill="none" stroke="#656183" stroke-width="2"/>`+
        label(207,245,'60 m','#3b79d1',17)+label(82,126,'h','#d34d8d',22)+label(311,215,'42°','#6651bd',20)+label(54,43,'H')+label(54,246,'T')+label(353,245,'P')+
        `<path d="M38 182 L54 128 L70 182 Z M30 152 L54 69 L78 152 Z" fill="#9ad8bb" opacity=".75"/>`;
      }else if(d.kind==='unitcircle'){
        const theta=d.angle*Math.PI/180,cx=184,cy=145,r=97,x=cx+Math.cos(theta)*r,y=cy-Math.sin(theta)*r;
        t=`<circle cx="${cx}" cy="${cy}" r="${r}" fill="#f7f4ff" stroke="#c5b7ed" stroke-width="2"/>`+
        line(52,cy,320,cy,'#bcb6d4',2)+line(cx,249,cx,27,'#bcb6d4',2)+line(cx,cy,x,y,'#dba44f',5)+line(cx,cy,x,cy,'#3b82f6',5)+line(x,cy,x,y,'#ef6d9d',5)+
        `<circle cx="${x}" cy="${y}" r="7" fill="#7053c4"/>`+label(278,44,`${d.angle}°`,'#6954b4',25)+label(242,252,'cos','#3b82f6',14)+label(326,130,'sin','#ef6d9d',14);
      }else if(d.kind==='symbolic-x'){
        t=`<path d="M67 220 L304 220 L304 57 Z" fill="#fff3df" stroke="#e8d4bd" stroke-width="2"/>`+
        line(67,220,304,220,'#3685e8',6)+line(304,220,304,57,'#ea69a4',6)+line(67,220,304,57,'#dea447',7)+
        `<path d="M286 220 v-18 h18" fill="none" stroke="#606d8b" stroke-width="2"/>`+
        label(185,246,'2x','#3075be',20)+label(349,135,'∣1−x²∣','#c94379',17)+
        label(163,104,'1+x²','#a3772c',20)+label(102,208,'A','#7152b2',21)+
        `<text x="199" y="269" fill="#65738e" font-size="12" text-anchor="middle">The side lengths change with x.</text>`;
      }else if(d.kind==='symbolic'){
        t=`<path d="M90 218 L309 218 L309 48 Z" fill="#fbf5ff" stroke="#a49bd4" stroke-width="3"/>`+line(90,218,309,218,'#3b82f6')+line(309,218,309,48,'#ef6d9d')+line(90,218,309,48,'#e7a242')+
        label(198,243,'b','#3b82f6')+label(340,132,'a','#ef6d9d')+label(161,105,'√(a² + b²)','#a4732f',14);
      }
      const views={triangle:'24 15 345 240','two-triangles':'12 15 358 240','two-right':'12 20 366 238',kite:'20 70 365 182',tree:'12 20 365 242',unitcircle:'36 20 316 245',symbolic:'54 20 325 240','complement-pairs':'0 10 400 245','symbolic-x':'20 18 370 250'};
      const title=s.ref+' — '+s.title;
      return `<div class="diagram-wrap"><svg viewBox="${views[d.kind]||'0 0 400 270'}" preserveAspectRatio="xMidYMid meet" role="img" aria-label="${sbEscapeMath(title)}. Clearly labelled geometry diagram; not necessarily drawn to scale"><title>${sbEscapeMath(title)}</title>${t}</svg></div>`;
    }
function drawSimple(kind){
  const bg='<rect width="440" height="285" rx="18" fill="#faf9ff"/>';
  const lab=(x,y,v,color='#574d89',size=19)=>`<text x="${x}" y="${y}" font-size="${size}" fill="${color}" text-anchor="middle" font-family="system-ui" font-weight="800">${v}</text>`;
  let shape='';
  if(kind==='tower') shape='<rect x="300" y="34" width="24" height="201" fill="#c4a38d"/><path d="M45 235H393" stroke="#527dd8" stroke-width="5"/><path d="M63 235L300 34" stroke="#e5ad3d" stroke-width="5"/><path d="M300 235V34" stroke="#e871a4" stroke-width="5"/><path d="M96 235 A35 35 0 0 0 90 209" stroke="#8872c6" fill="none" stroke-width="3"/>'+lab(93,216,'θ')+lab(194,254,'distance')+lab(363,134,'height');
  else if(kind==='identity'||kind==='triangle')shape='<path d="M83 232L320 232L320 64Z" fill="#fff1d1" stroke="#f5d09d" stroke-width="2"/><path d="M83 232H320" stroke="#5484e9" stroke-width="7"/><path d="M320 232V64" stroke="#ed7ea7" stroke-width="7"/><path d="M83 232L320 64" stroke="#e5b045" stroke-width="7"/>'+lab(200,261,'cos θ')+lab(370,156,'sin θ')+lab(191,130,'1')+lab(110,221,'θ');
  else if(kind==='wave'){let a=[],b=[];for(let i=0;i<=360;i+=3){const x=39+i*1.01;a.push((i===0?'M':'L')+x.toFixed(1)+' '+(144-75*Math.sin(i*Math.PI/180)).toFixed(1));b.push((i===0?'M':'L')+x.toFixed(1)+' '+(144-75*Math.cos(i*Math.PI/180)).toFixed(1))}shape='<path d="M39 144H407M39 35V255" stroke="#b0b1c5" stroke-width="3"/><path d="'+a.join(' ')+'" fill="none" stroke="#eb6b9f" stroke-width="5"/><path d="'+b.join(' ')+'" fill="none" stroke="#5388e8" stroke-width="5"/>'+lab(100,35,'sine','#da5d8f',16)+lab(320,35,'cosine','#4976d8',16);}
  else if(kind==='area'){shape='<rect x="85" y="50" width="270" height="170" fill="#e8f5fa" stroke="#6191bc" stroke-width="5"/>'+lab(220,248,'length')+lab(390,143,'width');}
  else if(kind==='stats'){shape='<path d="M60 228H393M60 228V46" stroke="#a1a4ba" stroke-width="3"/><rect x="105" y="138" width="44" height="90" rx="5" fill="#f6ba62"/><rect x="170" y="105" width="44" height="123" rx="5" fill="#8f80dd"/><rect x="235" y="65" width="44" height="163" rx="5" fill="#ec88ac"/><rect x="300" y="96" width="44" height="132" rx="5" fill="#78bac1"/>'}
  else if(kind==='sets'){shape='<circle cx="169" cy="141" r="94" fill="#f9cee3b0" stroke="#dd7ca2" stroke-width="4"/><circle cx="272" cy="141" r="94" fill="#cadbffb0" stroke="#6587cd" stroke-width="4"/>'+lab(139,143,'A')+lab(300,143,'B')+lab(220,143,'A∩B');}
  else if(kind==='inverse'){shape='<path d="M35 146H407 M220 260V20" stroke="#a4abc5" stroke-width="3"/><path d="M75 240Q130 200 220 146T365 45" fill="none" stroke="#8d73d0" stroke-width="6"/>'+lab(265,67,'principal range','#735aba',17);}
  else {shape='<circle cx="218" cy="142" r="99" fill="#f0edff" stroke="#af9ce6" stroke-width="4"/><path d="M70 142H367M218 17V267" stroke="#9caac5" stroke-width="2"/><path d="M218 142L291 77" stroke="#e8aa40" stroke-width="6"/><path d="M218 142H291" stroke="#5488e9" stroke-width="6"/><path d="M291 142V77" stroke="#ea7fab" stroke-width="6"/><circle cx="291" cy="77" r="10" fill="#e5b158"/>'+lab(340,67,'sin θ','#cb5689',17)+lab(337,177,'cos θ','#3e77cf',17)}
  return `<svg viewBox="0 0 440 285" role="img" aria-label="Illustration of ${sbEscapeMath(kind)}" preserveAspectRatio="xMidYMid meet">${bg}${shape}</svg>`;
}
window.TriggleDraw={drawClassic,drawSimple};
})();
