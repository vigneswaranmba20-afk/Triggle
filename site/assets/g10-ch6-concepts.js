/* VER Triggle | Grade 10 Chapter 6 | Trigonometry — Interactive SVG Concept Studio.
 * Self-hosted, offline-capable, mobile-first (320px+) SVG visualizations and pure trig verification helpers.
 * Uses existing .g10ch4-* Bond-light studio classes for consistent visual hierarchy across Chapters 4, 5, and 6. */
(()=>{'use strict';

const DEG=Math.PI/180;
const sinD=d=>Math.sin(d*DEG);
const cosD=d=>Math.cos(d*DEG);
const tanD=d=>Math.abs(d-90)<1e-9?Infinity:Math.tan(d*DEG);
const fmt=(n,dec=3)=>!Number.isFinite(n)?'∞':(Math.abs(n)<1e-6?0:Number(n.toFixed(dec))).toString();

/* Pure deterministic trigonometry helpers (unit-tested independently of DOM) */
const math={
  trigRatios(thetaDeg,scale=1){
    if(thetaDeg<=0||thetaDeg>=90||scale<=0)return{valid:false};
    const hyp=10*scale,opp=hyp*sinD(thetaDeg),adj=hyp*cosD(thetaDeg);
    const s=opp/hyp,c=adj/hyp,t=opp/adj;
    return{valid:true,thetaDeg,scale,opp,adj,hyp,sin:s,cos:c,tan:t,cosec:1/s,sec:1/c,cot:1/t};
  },
  complementary(thetaDeg){
    if(thetaDeg<0||thetaDeg>90)return{valid:false};
    const comp=90-thetaDeg;
    return{
      valid:true,thetaDeg,comp,
      sinT:sinD(thetaDeg),cosC:cosD(comp),
      cosT:cosD(thetaDeg),sinC:sinD(comp),
      tanT:thetaDeg===90?Infinity:tanD(thetaDeg),
      cotC:comp===0?Infinity:1/tanD(comp)
    };
  },
  standardAngle(deg){
    const table={
      0:{sin:'0',cos:'1',tan:'0',cosec:'undefined',sec:'1',cot:'undefined',sVal:0,cVal:1,tVal:0},
      30:{sin:'\\frac{1}{2}',cos:'\\frac{\\sqrt{3}}{2}',tan:'\\frac{1}{\\sqrt{3}}',cosec:'2',sec:'\\frac{2}{\\sqrt{3}}',cot:'\\sqrt{3}',sVal:0.5,cVal:Math.sqrt(3)/2,tVal:1/Math.sqrt(3)},
      45:{sin:'\\frac{1}{\\sqrt{2}}',cos:'\\frac{1}{\\sqrt{2}}',tan:'1',cosec:'\\sqrt{2}',sec:'\\sqrt{2}',cot:'1',sVal:Math.SQRT1_2,cVal:Math.SQRT1_2,tVal:1},
      60:{sin:'\\frac{\\sqrt{3}}{2}',cos:'\\frac{1}{2}',tan:'\\sqrt{3}',cosec:'\\frac{2}{\\sqrt{3}}',sec:'2',cot:'\\frac{1}{\\sqrt{3}}',sVal:Math.sqrt(3)/2,cVal:0.5,tVal:Math.sqrt(3)},
      90:{sin:'1',cos:'0',tan:'undefined',cosec:'1',sec:'undefined',cot:'0',sVal:1,cVal:0,tVal:Infinity}
    };
    return table[deg]||null;
  },
  identities(thetaDeg){
    if(thetaDeg<=0||thetaDeg>=90)return{valid:false};
    const s=sinD(thetaDeg),c=cosD(thetaDeg),t=tanD(thetaDeg),cot=1/t,sec=1/c,csc=1/s;
    return{
      valid:true,
      id1:s*s+c*c,
      id2Left:1+t*t,id2Right:sec*sec,
      id3Left:1+cot*cot,id3Right:csc*csc,
      s,c,t,cot,sec,csc
    };
  },
  elevation(heightAboveEye,dist,eye=0){
    if(heightAboveEye<=0||dist<=0)return{valid:false};
    const theta=Math.atan2(heightAboveEye,dist)/DEG;
    return{valid:true,heightAboveEye,dist,eye,totalHeight:heightAboveEye+eye,thetaDeg:theta,hyp:Math.hypot(heightAboveEye,dist)};
  },
  depression(height,angleDeg){
    if(height<=0||angleDeg<=0||angleDeg>=90)return{valid:false};
    const dist=height/tanD(angleDeg);
    const wrongWallDist=height*tanD(angleDeg);
    return{valid:true,height,angleDeg,dist,wrongWallDist,hyp:Math.hypot(height,dist)};
  },
  combinedTwoTriangles(mode,h1,alphaDeg,betaDeg){
    if(h1<=0||alphaDeg<=0||alphaDeg>=90||betaDeg<=0||betaDeg>=90)return{valid:false};
    if(mode==='deck-hill'){
      const x=h1/tanD(betaDeg);
      const h2=x*tanD(alphaDeg);
      return{valid:true,mode,x,h1,h2,total:h1+h2};
    }
    if(mode==='two-same'){
      if(alphaDeg<=betaDeg)return{valid:false,reason:'near angle alpha must exceed far angle beta'};
      const xNear=h1/tanD(alphaDeg),xFar=h1/tanD(betaDeg);
      return{valid:true,mode,xNear,xFar,gap:xFar-xNear};
    }
    const xLeft=h1/tanD(alphaDeg),xRight=h1/tanD(betaDeg);
    return{valid:true,mode:'two-opposite',xLeft,xRight,gap:xLeft+xRight};
  }
};

function tex(latex,displayMode=true,fallback=''){
  if(window.TriggleNotation?.renderLatex){
    return window.TriggleNotation.renderLatex(latex,{displayMode,fallback});
  }
  return `<code>${fallback||latex}</code>`;
}
function el(tag,cls,html){
  const node=document.createElement(tag);
  if(cls)node.className=cls;
  if(html!=null)node.innerHTML=html;
  return node;
}

/* Compact Bond-light Step 1 Glance SVGs */
function renderGlance(stage,host,lang){
  if(!host)return;
  const id=stage.glanceVisual||stage.visual?.id||'trig-ratios';
  const ta=lang==='ta';
  const map={
    'trig-ratios':`<svg class="g10ch4-glance-svg" viewBox="0 0 260 112" aria-hidden="true">
      <polygon points="36,92 192,92 192,26" fill="#F3EFE8" stroke="#6E2933" stroke-width="2.2"/>
      <polygon points="36,92 114,92 114,59" fill="none" stroke="#1E5248" stroke-width="1.6" stroke-dasharray="4 3"/>
      <path d="M180,92 L180,80 L192,80" fill="none" stroke="#525B62" stroke-width="1.4"/>
      <path d="M62,92 A26,26 0 0,0 59,81" fill="none" stroke="#1E5248" stroke-width="2"/>
      <text x="68" y="86" font-size="11" font-weight="700" fill="#1E5248">θ</text>
      <text x="114" y="106" font-size="10.5" text-anchor="middle" fill="#181B20">${ta?'அடுத்துள்ள (OM)':'Adj (OM)'}</text>
      <text x="200" y="62" font-size="10.5" fill="#6E2933">${ta?'எதிர் (MP)':'Opp (MP)'}</text>
      <text x="98" y="48" font-size="10.5" fill="#525B62" transform="rotate(-23 98 48)">Hyp (OP)</text>
    </svg>`,
    'quotient-reciprocal':`<svg class="g10ch4-glance-svg" viewBox="0 0 260 112" aria-hidden="true">
      <polygon points="44,92 184,92 184,26" fill="#F3EFE8" stroke="#181B20" stroke-width="2"/>
      <text x="108" y="48" font-size="11" font-weight="700" fill="#6E2933" transform="rotate(-25 108 48)">Hyp = 1</text>
      <text x="114" y="106" font-size="11" font-weight="700" text-anchor="middle" fill="#1E5248">cos θ</text>
      <text x="192" y="62" font-size="11" font-weight="700" fill="#8C3B2B">sin θ</text>
      <text x="72" y="86" font-size="11" fill="#181B20">θ</text>
    </svg>`,
    'complementary-angles':`<svg class="g10ch4-glance-svg" viewBox="0 0 260 112" aria-hidden="true">
      <path d="M40,94 A90,90 0 0,1 220,94" fill="none" stroke="#B8B2A6" stroke-width="1.6"/>
      <rect x="130" y="34" width="66" height="60" fill="#F3EFE8" stroke="#1E5248" stroke-width="1.8"/>
      <line x1="130" y1="94" x2="196" y2="34" stroke="#6E2933" stroke-width="2.2"/>
      <text x="148" y="88" font-size="10.5" font-weight="700" fill="#6E2933">θ</text>
      <text x="133" y="66" font-size="10" fill="#1E5248" transform="rotate(-90 133 66)">sin θ</text>
      <text x="163" y="29" font-size="10" text-anchor="middle" fill="#1E5248">cos(90°−θ)=sin θ</text>
      <text x="163" y="107" font-size="10" text-anchor="middle" fill="#6E2933">OP = RQ</text>
    </svg>`,
    'standard-angles':`<svg class="g10ch4-glance-svg" viewBox="0 0 260 132" aria-hidden="true">
      <polygon points="24,94 ${24+72/Math.sqrt(3)},94 ${24+72/Math.sqrt(3)},22" fill="#F3EFE8" stroke="#6E2933" stroke-width="1.8"/>
      <path d="M36 94 A12 12 0 0 0 30 ${94-6*Math.sqrt(3)}" fill="none" stroke="#6E2933" stroke-width="1.2"/>
      <text x="45" y="116" font-size="10" text-anchor="middle" fill="#181B20">1</text>
      <text x="73" y="62" font-size="10" fill="#181B20">√3</text>
      <text x="28" y="46" font-size="10" fill="#6E2933">2</text>
      <text x="14" y="113" font-size="9.5" font-weight="700" text-anchor="middle" fill="#6E2933">60°</text>
      <polygon points="154,94 226,94 226,22" fill="#EFF8F4" stroke="#1E5248" stroke-width="1.8"/>
      <path d="M166 94 A12 12 0 0 0 ${154+6*Math.sqrt(2)} ${94-6*Math.sqrt(2)}" fill="none" stroke="#1E5248" stroke-width="1.2"/>
      <text x="190" y="116" font-size="10" text-anchor="middle" fill="#181B20">1</text>
      <text x="233" y="62" font-size="10" fill="#181B20">1</text>
      <text x="168" y="44" font-size="10" fill="#1E5248">√2</text>
      <text x="144" y="113" font-size="9.5" font-weight="700" text-anchor="middle" fill="#1E5248">45°</text>
    </svg>`,
    'identity-sin-cos':`<svg class="g10ch4-glance-svg" viewBox="0 0 260 128" aria-hidden="true">
      <polygon points="78,72 126,72 126,26" fill="#F3EFE8" stroke="#181B20" stroke-width="2"/>
      <rect x="78" y="72" width="48" height="48" fill="#DCEEE8" stroke="#1E5248" stroke-width="1.5"/>
      <rect x="126" y="26" width="46" height="46" fill="#F8E7E9" stroke="#6E2933" stroke-width="1.5"/>
      <text x="102" y="99" font-size="10.5" font-weight="700" text-anchor="middle" fill="#1E5248">cos²θ</text>
      <text x="149" y="53" font-size="10.5" font-weight="700" text-anchor="middle" fill="#6E2933">sin²θ</text>
      <text x="94" y="40" font-size="10.5" font-weight="700" fill="#181B20">1</text>
    </svg>`,
    'identity-sec-cosec':`<svg class="g10ch4-glance-svg" viewBox="0 0 260 112" aria-hidden="true">
      <polygon points="48,88 188,88 188,24" fill="#F3EFE8" stroke="#6E2933" stroke-width="2"/>
      <text x="118" y="103" font-size="10.5" text-anchor="middle" fill="#1E5248">1</text>
      <text x="196" y="58" font-size="10.5" fill="#8C3B2B">tan θ</text>
      <text x="108" y="48" font-size="10.5" font-weight="700" fill="#6E2933" transform="rotate(-24 108 48)">sec θ</text>
      <text x="80" y="82" font-size="10" fill="#181B20">θ</text>
    </svg>`,
    'proving-identities':`<svg class="g10ch4-glance-svg" viewBox="0 0 260 112" aria-hidden="true">
      <rect x="18" y="20" width="96" height="30" rx="8" fill="#F3EFE8" stroke="#6E2933" stroke-width="1.5"/>
      <text x="66" y="39" font-size="10.5" font-weight="700" text-anchor="middle" fill="#6E2933">sin θ, cos θ</text>
      <rect x="146" y="20" width="96" height="30" rx="8" fill="#EFF8F4" stroke="#1E5248" stroke-width="1.5"/>
      <text x="194" y="39" font-size="10.5" font-weight="700" text-anchor="middle" fill="#1E5248">1 ± sin θ</text>
      <rect x="64" y="64" width="132" height="30" rx="8" fill="#FAF9F6" stroke="#181B20" stroke-width="1.5"/>
      <text x="130" y="83" font-size="10.5" font-weight="700" text-anchor="middle" fill="#181B20">LHS → Step → RHS</text>
    </svg>`,
    'angle-elevation':`<svg class="g10ch4-glance-svg" viewBox="0 0 260 112" aria-hidden="true">
      <line x1="22" y1="92" x2="238" y2="92" stroke="#525B62" stroke-width="1.5"/>
      <rect x="196" y="24" width="16" height="68" fill="#ECE7DC" stroke="#6E2933" stroke-width="1.8"/>
      <line x1="48" y1="74" x2="196" y2="74" stroke="#1E5248" stroke-width="1.5" stroke-dasharray="4 3"/>
      <line x1="48" y1="74" x2="196" y2="24" stroke="#6E2933" stroke-width="2.2"/>
      <circle cx="44" cy="74" r="4" fill="#181B20"/>
      <line x1="44" y1="78" x2="44" y2="92" stroke="#181B20" stroke-width="2"/>
      <path d="M74,74 A26,26 0 0,0 71,65" fill="none" stroke="#6E2933" stroke-width="2"/>
      <text x="80" y="68" font-size="10.5" font-weight="700" fill="#6E2933">θ</text>
      <text x="122" y="86" font-size="9.5" text-anchor="middle" fill="#1E5248">${ta?'கிடைநிலை':'Horizontal'}</text>
    </svg>`,
    'angle-depression':`<svg class="g10ch4-glance-svg" viewBox="0 0 260 112" aria-hidden="true">
      <line x1="22" y1="94" x2="238" y2="94" stroke="#1E5248" stroke-width="1.6"/>
      <rect x="34" y="28" width="22" height="66" fill="#ECE7DC" stroke="#181B20" stroke-width="1.6"/>
      <line x1="56" y1="28" x2="198" y2="28" stroke="#6E2933" stroke-width="1.6" stroke-dasharray="4 3"/>
      <line x1="56" y1="28" x2="206" y2="94" stroke="#6E2933" stroke-width="2.2"/>
      <circle cx="206" cy="94" r="4" fill="#1E5248"/>
      <text x="92" y="40" font-size="10.5" font-weight="700" fill="#6E2933">θ</text>
      <text x="166" y="88" font-size="10.5" font-weight="700" fill="#1E5248">θ</text>
    </svg>`,
    'combined-heights':`<svg class="g10ch4-glance-svg" viewBox="0 0 260 112" aria-hidden="true">
      <line x1="20" y1="94" x2="240" y2="94" stroke="#525B62" stroke-width="1.5"/>
      <rect x="34" y="54" width="18" height="40" fill="#DCEEE8" stroke="#1E5248" stroke-width="1.6"/>
      <rect x="200" y="18" width="22" height="76" fill="#F3EFE8" stroke="#6E2933" stroke-width="1.8"/>
      <line x1="52" y1="54" x2="200" y2="54" stroke="#181B20" stroke-width="1.6" stroke-dasharray="4 3"/>
      <line x1="52" y1="54" x2="200" y2="18" stroke="#6E2933" stroke-width="2"/>
      <line x1="52" y1="54" x2="200" y2="94" stroke="#1E5248" stroke-width="2"/>
      <text x="126" y="50" font-size="10" font-weight="700" text-anchor="middle" fill="#181B20">x (shared)</text>
    </svg>`
  };
  host.innerHTML=map[id]||map['trig-ratios'];
}

function makeMetrics(host,items){
  const grid=el('div','g10ch4-metrics');
  items.forEach(([k,v])=>{
    grid.append(el('div','g10ch4-metric',`<span>${k}</span><strong>${v}</strong>`));
  });
  host.append(grid);
}

function sightArc(x,y,r,from,to,color){
  const point=a=>[x+r*cosD(a),y+r*sinD(a)].join(',');
  return `<path d="M${point(from)} A${r},${r} 0 0,${to>from?1:0} ${point(to)}" fill="none" stroke="${color}" stroke-width="1.7" data-dg-obstacle="angle-${from}"/>`;
}

function sightFigure(host,title){
  const svg=document.createElementNS('http://www.w3.org/2000/svg','svg');
  svg.setAttribute('viewBox','0 0 320 200');
  svg.setAttribute('class','g10ch4-svg diagramguard-svg');
  svg.setAttribute('role','img');
  svg.setAttribute('aria-label',title);
  const key=el('div','diagramguard-coordinate-key');
  host.append(svg,key);
  const guard=window.TriggleDiagramGuard;
  let scene,marks;
  const refresh=guard.responsive(svg,(width,rem)=>{
    if(!scene)return;
    const unit=rem*320/width;
    const top=Math.max(0,1.55*unit-40), bottom=Math.max(0,1.8*unit-44);
    svg.setAttribute('viewBox',`0 ${-top} 320 ${200+top+bottom}`);
    svg.innerHTML=scene;
    const matrix=svg.getScreenCTM();
    const font=rem*.9375/Math.hypot(matrix.c,matrix.d);
    guard.place(svg,marks.map(({id,x,y,direction})=>{
      const label=document.createElementNS(svg.namespaceURI,'text');
      label.dataset.dgLabel=id;
      label.setAttribute('font-size',font);
      label.setAttribute('text-anchor','middle');
      label.setAttribute('dy','.34em');
      label.setAttribute('fill','#181B20');
      label.textContent=id;
      return {label,anchor:[x,y],direction};
    }));
  });
  return (geometry,labels,values)=>{
    scene=geometry;marks=labels;
    key.replaceChildren(...values.map(value=>el('span','diagramguard-named-point',value)));
    refresh();
  };
}

function makeSlider(host,label,min,max,step,val,unit,onInput){
  const row=el('div','g10ch4-slider-row');
  const lbl=el('label','g10ch4-slider-label',label);
  const input=document.createElement('input');
  input.type='range';input.className='g10ch4-slider';
  input.min=String(min);input.max=String(max);input.step=String(step);input.value=String(val);
  const out=el('span','g10ch4-slider-val',val+unit);
  input.setAttribute('aria-label',label);
  input.addEventListener('input',()=>{
    out.textContent=input.value+unit;
    onInput(Number(input.value));
  });
  row.append(lbl,input,out);
  host.append(row);
  return{input,out};
}

function mount(stage,host,lang){
  if(!host)return;
  const id=stage.visual?.id||'trig-ratios';
  const ta=lang==='ta';
  host.replaceChildren();
  const lab=el('div','g10ch4-lab');
  host.append(lab);

  if(id==='trig-ratios'){
    let theta=37,scale=1.0,flipCorner=false;
    const title=el('p','g10ch4-lab-title',ta?'சாய்வுக் கோணம் θ மற்றும் முக்கோண அளவு k-ஐ மாற்றி விகிதங்கள் நிலையாக இருப்பதைக் காண்க':'Change angle θ and triangle size k to verify that ratios depend only on θ');
    const tabs=el('div','g10ch4-tabs');
    const b1=el('button','g10ch4-tab',ta?'கோணம் O (θ)':'Focus ∠O = θ');
    const b2=el('button','g10ch4-tab',ta?'உச்சி P (90°−θ)':'Focus ∠P = 90°−θ');
    [b1,b2].forEach(b=>b.type='button');
    tabs.append(b1,b2);
    const svgWrap=el('div');
    const controls=el('div');
    const metrics=el('div');
    const readout=el('div','g10ch4-readout g10ch4-formula');
    lab.append(title,tabs,svgWrap,controls,metrics,readout);

    const draw=()=>{
      b1.setAttribute('aria-pressed',String(!flipCorner));
      b2.setAttribute('aria-pressed',String(flipCorner));
      const focusDeg=flipCorner?(90-theta):theta;
      const r=math.trigRatios(theta,scale);
      const pixelsPerUnit=10.4;
      const base=pixelsPerUnit*r.adj,rise=pixelsPerUnit*r.opp;
      const xO=54,yM=170,xM=xO+base,yP=yM-rise;
      const len=Math.hypot(base,rise)||1;
      const nx=-rise/len,ny=-base/len;
      const hypX=(xO+xM)/2+nx*14,hypY=(yM+yP)/2+ny*14;
      const oAngX=xO+(rise<30?10:16),oAngY=yM-(rise<30?16:7);
      const pAngX=xM-(base<40?8:28),pAngY=yP+(base<40?-6:24);
      svgWrap.innerHTML=`<svg class="g10ch4-svg" viewBox="0 0 320 200" role="img" aria-label="Right triangle OMP">
        <polygon points="${xO},${yM} ${xM},${yM} ${xM},${yP}" fill="#F3EFE8" stroke="#181B20" stroke-width="2.2"/>
        <path d="M${xM-12},${yM} L${xM-12},${yM-12} L${xM},${yM-12}" fill="none" stroke="#525B62" stroke-width="1.5"/>
        <circle cx="${xO}" cy="${yM}" r="4.5" fill="${!flipCorner?'#6E2933':'#525B62'}"/>
        <circle cx="${xM}" cy="${yP}" r="4.5" fill="${flipCorner?'#6E2933':'#525B62'}"/>
        <text x="${xO-14}" y="${yM+4}" font-size="12" font-weight="700" fill="#181B20">O</text>
        <text x="${xM+6}" y="${yM+4}" font-size="12" font-weight="700" fill="#181B20">M</text>
        <text x="${xM+6}" y="${yP-6}" font-size="12" font-weight="700" fill="#181B20">P</text>
        <text x="${oAngX}" y="${oAngY}" font-size="11" font-weight="700" fill="${!flipCorner?'#6E2933':'#525B62'}" stroke="#FAF9F6" stroke-width="2.5" paint-order="stroke">${theta}°</text>
        <text x="${pAngX}" y="${pAngY}" font-size="11" font-weight="700" text-anchor="${base<40?'end':'start'}" fill="${flipCorner?'#6E2933':'#525B62'}" stroke="#FAF9F6" stroke-width="2.5" paint-order="stroke">${90-theta}°</text>
        <text x="${(xO+xM)/2}" y="${yM+18}" font-size="11" font-weight="700" text-anchor="middle" fill="${flipCorner?'#8C3B2B':'#1E5248'}">OM ≈ ${fmt(r.adj,2)}</text>
        <text x="${xM+8}" y="${(yM+yP)/2+4}" font-size="11" font-weight="700" fill="${flipCorner?'#1E5248':'#8C3B2B'}">MP ≈ ${fmt(r.opp,2)}</text>
        <text x="${hypX}" y="${hypY}" font-size="11" font-weight="700" text-anchor="end" fill="#525B62" stroke="#FAF9F6" stroke-width="2.5" paint-order="stroke">OP=${fmt(r.hyp,2)}</text>
      </svg>`;
      const opp=flipCorner?r.adj:r.opp,adj=flipCorner?r.opp:r.adj;
      const oppSide=flipCorner?'OM':'MP',adjSide=flipCorner?'MP':'OM';
      const s=opp/r.hyp,c=adj/r.hyp,t=opp/adj;
      metrics.replaceChildren();
      makeMetrics(metrics,[
        [ta?`எதிர் (∠${focusDeg}°)`:`Opposite (∠${focusDeg}°)`,fmt(opp,2)],
        [ta?'அடுத்துள்ள பக்கம்':'Adjacent',fmt(adj,2)],
        [ta?'கர்ணம்':'Hypotenuse',fmt(r.hyp,2)],
        ['tan = Opp/Adj',fmt(t,3)]
      ]);
      readout.innerHTML=tex(`\\begin{aligned}&\\sin ${focusDeg}^\\circ=\\dfrac{${oppSide}}{OP}\\approx ${fmt(s,3)}\\\\&\\operatorname{cosec} ${focusDeg}^\\circ=\\dfrac{OP}{${oppSide}}\\approx ${fmt(1/s,3)}\\\\&\\cos ${focusDeg}^\\circ=\\dfrac{${adjSide}}{OP}\\approx ${fmt(c,3)}\\\\&\\sec ${focusDeg}^\\circ=\\dfrac{OP}{${adjSide}}\\approx ${fmt(1/c,3)}\\end{aligned}`,true,`sin ${focusDeg}° ≈ ${fmt(s,3)}, cos ≈ ${fmt(c,3)}`);
    };
    b1.onclick=()=>{flipCorner=false;draw();};
    b2.onclick=()=>{flipCorner=true;draw();};
    makeSlider(controls,ta?'கோணம் θ':'Angle θ',15,75,1,theta,'°',v=>{theta=v;draw();});
    makeSlider(controls,ta?'முக்கோண அளவு k':'Triangle scale k',0.6,1.3,0.1,scale,'×',v=>{scale=v;draw();});
    draw();
    return;
  }

  if(id==='quotient-reciprocal'){
    let theta=35,mode='quotient';
    const title=el('p','g10ch4-lab-title',ta?'கர்ணம் = 1 அலகு முக்கோணத்தில் sin θ மற்றும் cos θ-விலிருந்து மற்ற விகிதங்களைக் காண்க':'Inspect how sin θ and cos θ on a unit hypotenuse build all other ratios');
    const tabs=el('div','g10ch4-tabs');
    const modes=[
      ['quotient',ta?'ஈவு (tan, cot)':'Quotient (tan, cot)'],
      ['recip',ta?'தலைகீழி (sec, cosec)':'Reciprocal (sec, cosec)']
    ];
    const btns=modes.map(([k,lbl])=>{
      const b=el('button','g10ch4-tab',lbl);b.type='button';
      b.onclick=()=>{mode=k;draw();};
      tabs.append(b);return[k,b];
    });
    const svgWrap=el('div'),controls=el('div'),readout=el('div','g10ch4-readout g10ch4-formula');
    lab.append(title,tabs,svgWrap,controls,readout);
    const draw=()=>{
      btns.forEach(([k,b])=>b.setAttribute('aria-pressed',String(k===mode)));
      const s=sinD(theta),c=cosD(theta),t=tanD(theta);
      const xO=38,yM=165,W=156*c,H=156*s;
      svgWrap.innerHTML=`<svg class="g10ch4-svg" viewBox="0 0 326 190" role="img" aria-label="Unit hypotenuse triangle">
        <polygon points="${xO},${yM} ${xO+W},${yM} ${xO+W},${yM-H}" fill="#EFF8F4" stroke="#1E5248" stroke-width="2.2"/>
        <text x="${xO+W/2}" y="${yM+16}" font-size="11.5" font-weight="700" text-anchor="middle" fill="#1E5248">cos ${theta}° ≈ ${fmt(c,3)}</text>
        <text x="${xO+W+8}" y="${yM-H/2+4}" font-size="11.5" font-weight="700" fill="#6E2933">sin ${theta}° ≈ ${fmt(s,3)}</text>
        <text x="${xO+W/2-14}" y="${yM-H/2-12}" font-size="11.5" font-weight="700" text-anchor="end" fill="#181B20" stroke="#FAF9F6" stroke-width="2.5" paint-order="stroke">OP = 1</text>
        <text x="${xO+18}" y="${yM-(H<45?15:7)}" font-size="11" font-weight="700" fill="#181B20" stroke="#FAF9F6" stroke-width="2.5" paint-order="stroke">${theta}°</text>
      </svg>`;
      readout.innerHTML=mode==='quotient'
        ?tex(`\\begin{aligned}&\\tan ${theta}^\\circ=\\dfrac{\\sin ${theta}^\\circ}{\\cos ${theta}^\\circ}\\approx ${fmt(t,3)}\\\\&\\cot ${theta}^\\circ=\\dfrac{\\cos ${theta}^\\circ}{\\sin ${theta}^\\circ}\\approx ${fmt(1/t,3)},\\\\&\\tan ${theta}^\\circ\\cdot\\cot ${theta}^\\circ=1\\end{aligned}`,true)
        :tex(`\\begin{aligned}&\\sec ${theta}^\\circ=\\dfrac{1}{\\cos ${theta}^\\circ}\\approx ${fmt(1/c,3)},\\\\&\\sec ${theta}^\\circ\\cdot\\cos ${theta}^\\circ=1\\\\&\\operatorname{cosec} ${theta}^\\circ=\\dfrac{1}{\\sin ${theta}^\\circ}\\approx ${fmt(1/s,3)},\\\\&\\operatorname{cosec} ${theta}^\\circ\\cdot\\sin ${theta}^\\circ=1\\end{aligned}`,true);
    };
    makeSlider(controls,ta?'கோணம் θ':'Angle θ',15,75,1,theta,'°',v=>{theta=v;draw();});
    draw();
    return;
  }

  if(id==='complementary-angles'){
    let theta=32;
    const title=el('p','g10ch4-lab-title',ta?'படம் 6.2 அரைவட்டத்தில் θ-வை நகர்த்தி செவ்வகம் OPQR-இல் sin(90°−θ)=cos θ என்பதைக் காண்க':'Slide θ in Fig. 6.2 to watch △OPQ (θ) and △QOR (90°−θ) swap sides inside OPQR');
    const chips=el('div','g10ch4-preset-row');
    [25,45,65].forEach(deg=>{
      const b=el('button','g10ch4-chip-btn',`θ = ${deg}°`);b.type='button';
      b.onclick=()=>{theta=deg;slider.input.value=String(deg);slider.out.textContent=deg+'°';draw();};
      chips.append(b);
    });
    const svgWrap=el('div'),controls=el('div'),readout=el('div','g10ch4-readout g10ch4-formula');
    lab.append(title,chips,svgWrap,controls,readout);
    const draw=()=>{
      const c=math.complementary(theta);
      const R=120,cx=155,cy=160;
      const qx=cx+R*c.cosT,qy=cy-R*c.sinT;
      const narrow=qx-cx<54;
      svgWrap.innerHTML=`<svg class="g10ch4-svg" viewBox="0 0 310 185" role="img" aria-label="Complementary rectangle Fig 6.2">
        <path d="M${cx-R},${cy} A${R},${R} 0 0,1 ${cx+R},${cy}" fill="none" stroke="#B8B2A6" stroke-width="1.6"/>
        <line x1="${cx-R-10}" y1="${cy}" x2="${cx+R+10}" y2="${cy}" stroke="#525B62" stroke-width="1.4"/>
        <line x1="${cx}" y1="${cy}" x2="${cx}" y2="${cy-R-14}" stroke="#525B62" stroke-width="1.4"/>
        <polygon points="${cx},${cy} ${qx},${cy} ${qx},${qy}" fill="rgba(110,41,51,.12)" stroke="#6E2933" stroke-width="2"/>
        <polygon points="${cx},${cy} ${cx},${qy} ${qx},${qy}" fill="rgba(30,82,72,.12)" stroke="#1E5248" stroke-width="2"/>
        <circle cx="${qx}" cy="${qy}" r="5" fill="#6E2933"/>
        <text x="${cx-12}" y="${cy+14}" font-size="11" font-weight="700" fill="#181B20">O</text>
        <text x="${narrow?qx+8:qx-4}" y="${cy+14}" font-size="11" font-weight="700" fill="#6E2933">P</text>
        <text x="${qx+8}" y="${narrow?qy+12:qy-4}" font-size="11" font-weight="700" fill="#181B20">Q</text>
        <text x="${cx-14}" y="${narrow?qy+12:qy+4}" font-size="11" font-weight="700" fill="#1E5248">R</text>
        <text x="${narrow?qx+24:(cx+qx)/2}" y="${cy+14}" font-size="10.5" text-anchor="${narrow?'start':'middle'}" fill="#6E2933">${fmt(c.cosT,2)}</text>
        <text x="${narrow?qx+10:(cx+qx)/2}" y="${qy-8}" font-size="10.5" text-anchor="${narrow?'start':'middle'}" fill="#1E5248" stroke="#FAF9F6" stroke-width="2.5" paint-order="stroke">RQ ≈ ${fmt(c.sinC,2)}</text>
      </svg>`;
      readout.innerHTML=tex(`\\begin{aligned}&\\sin(${c.comp}^\\circ)=\\cos(${theta}^\\circ)\\approx ${fmt(c.cosT,3)}\\\\&\\cos(${c.comp}^\\circ)=\\sin(${theta}^\\circ)\\approx ${fmt(c.sinT,3)}\\end{aligned}`,true);
    };
    const slider=makeSlider(controls,ta?'கோணம் θ':'Angle θ',10,80,1,theta,'°',v=>{theta=v;draw();});
    draw();
    return;
  }

  if(id==='standard-angles'){
    let deg=45;
    const title=el('p','g10ch4-lab-title',ta?'சிறப்புக் கோணத்தைத் தேர்ந்தெடுத்து வடிவியல் முக்கோணத்தையும் துல்லிய பின்னத்தையும் பார்க்க':'Pick any standard angle to view its exact triangle geometry and radical ratios');
    const chips=el('div','g10ch4-preset-row');
    const btns=[0,30,45,60,90].map(a=>{
      const b=el('button','g10ch4-chip-btn',`${a}°`);b.type='button';
      b.onclick=()=>{deg=a;draw();};
      chips.append(b);return[a,b];
    });
    const svgWrap=el('div'),limits=el('span','diagramguard-annotation'),readout=el('div','g10ch4-readout g10ch4-formula');
    lab.append(title,chips,svgWrap,limits,readout);
    const draw=()=>{
      btns.forEach(([a,b])=>b.setAttribute('aria-pressed',String(a===deg)));
      const row=math.standardAngle(deg);
      let fig,frame='0 0 310 208';
      let description=`${ta?'சிறப்புக் கோணம்':'Standard angle'} ${deg}°`;
      limits.hidden=deg>0&&deg<90;
      if(!limits.hidden){
        limits.textContent=deg===0
          ? (ta?'எதிர்ப்பக்கம் 0 என்பதால் cosec 0°, cot 0° வரையறுக்கப்படவில்லை.':'The opposite side is 0, so cosec 0° and cot 0° are undefined.')
          : (ta?'அடுத்த பக்கம் 0 என்பதால் tan 90°, sec 90° வரையறுக்கப்படவில்லை.':'The adjacent side is 0, so tan 90° and sec 90° are undefined.');
      }
      if(deg>0&&deg<90){
        const adj=deg===30?'√3':'1',opp=deg===60?'√3':'1',hyp=deg===45?'√2':'2';
        const x=55,y=170,s=sinD(deg),c=cosD(deg),unit=80*(deg===45?Math.sqrt(2):2);
        const w=unit*c,h=unit*s,right=x+w;
        description+=ta?`. அடுத்த பக்கம் ${adj}. எதிர்ப்பக்கம் ${opp}. கர்ணம் ${hyp}.`:
          `. Adjacent side ${adj}. Opposite side ${opp}. Hypotenuse ${hyp}.`;
        fig=`<polygon points="${x},${y} ${right},${y} ${right},${y-h}" fill="#EFF8F4" stroke="#1E5248" stroke-width="2.2"/>
          <path d="M${right-11},${y} V${y-11} H${right}" fill="none" stroke="#1E5248" stroke-width="1.4" data-dg-obstacle="right-angle"/>
          <path d="M${x+22},${y} A22,22 0 0,0 ${x+22*c},${y-22*s}" fill="none" stroke="#6E2933" stroke-width="1.4" data-dg-obstacle="standard-angle-arc"/>
          <g font-size="15.5" font-weight="550" fill="#181B20">
            <text x="${x+w/2}" y="193" text-anchor="middle">${adj}</text>
            <text x="${right+14}" y="${y-h/2+3}">${opp}</text>
            <text x="${x+w/2-22*s}" y="${y-h/2-22*c}" text-anchor="middle">${hyp}</text>
            <text x="${x-20}" y="${y-19}" text-anchor="middle" fill="#6E2933">${deg}°</text>
          </g>`;
      }else if(deg===0){
        frame='0 0 310 100';
        fig=`<line x1="60" y1="40" x2="250" y2="40" stroke="#6E2933" stroke-width="4"/>
          <text x="155" y="74" font-size="15.5" text-anchor="middle" fill="#181B20">θ = 0° · Adj = Hyp = 1</text>`;
      }else{
        frame='0 0 310 178';
        fig=`<line x1="155" y1="20" x2="155" y2="126" stroke="#6E2933" stroke-width="4"/>
          <text x="155" y="156" font-size="15.5" text-anchor="middle" fill="#181B20">θ = 90° · Opp = Hyp = 1</text>`;
      }
      svgWrap.innerHTML=`<svg class="g10ch4-svg" viewBox="${frame}" role="img" aria-label="${description}">${fig}</svg>`;
      readout.innerHTML=tex(`\\begin{aligned}&\\sin ${deg}^\\circ=${row.sin},\\;\\cos ${deg}^\\circ=${row.cos}\\\\&\\tan ${deg}^\\circ=${row.tan==='undefined'?'\\text{undef.}':row.tan},\\;\\cot ${deg}^\\circ=${row.cot==='undefined'?'\\text{undef.}':row.cot}\\\\&\\sec ${deg}^\\circ=${row.sec==='undefined'?'\\text{undef.}':row.sec},\\;\\operatorname{cosec} ${deg}^\\circ=${row.cosec==='undefined'?'\\text{undef.}':row.cosec}\\end{aligned}`,true);
    };
    draw();
    return;
  }

  if(id==='identity-sin-cos'){
    let theta=37;
    const title=el('p','g10ch4-lab-title',ta?'θ மாறும்போது sin²θ + cos²θ சதுரப் பரப்புகளின் கூடுதல் எப்போதும் 1 என்பதைப் பார்க்க':'Slide θ and watch the squared areas sin²θ and cos²θ always sum to 1');
    const svgWrap=el('div'),legend=el('div','diagramguard-coordinate-legend'),controls=el('div'),readout=el('div','g10ch4-readout g10ch4-formula');
    legend.setAttribute('role','list');
    legend.setAttribute('aria-label',ta?'சதுரங்களின் பரப்புகள்':'Square areas');
    lab.append(title,svgWrap,legend,controls,readout);
    const draw=()=>{
      const s=sinD(theta),c=cosD(theta),s2=s*s,c2=c*c;
      const scale=81,xO=83,yM=105,w=scale*c,h=scale*s;
      svgWrap.innerHTML=`<svg class="g10ch4-svg" viewBox="0 0 310 221" role="img" aria-label="${ta?'ஓர் அலகு கர்ணமுள்ள முக்கோணத்தின் பக்கச் சதுரங்கள்':'Squares on the legs of a triangle with a unit hypotenuse'}">
        <rect data-dg-square="cosine" x="${xO}" y="${yM}" width="${w}" height="${w}" fill="#DCEEE8" stroke="#1E5248" stroke-width="1.5"/>
        <rect data-dg-square="sine" x="${xO+w}" y="${yM-h}" width="${h}" height="${h}" fill="#F8E7E9" stroke="#6E2933" stroke-width="1.5"/>
        <polygon points="${xO},${yM} ${xO+w},${yM} ${xO+w},${yM-h}" fill="#FAF9F6" stroke="#181B20" stroke-width="2"/>
        <path d="M${xO+w-8},${yM} V${yM-8} H${xO+w}" fill="none" stroke="#181B20" stroke-width="1.2"/>
        <text x="${xO+w/2-17*s}" y="${yM-h/2-17*c}" font-size="16" text-anchor="middle" dominant-baseline="middle" fill="#181B20">1</text>
        <rect x="28" y="200" width="${254*c2}" height="12" fill="#1E5248"/>
        <rect x="${28+254*c2}" y="200" width="${254*s2}" height="12" fill="#6E2933"/>
      </svg>`;
      legend.replaceChildren(...[[c2,'cos','#1E5248'],[s2,'sin','#6E2933']].map(([area,name,color])=>{
        const entry=el('span'),sample=el('span','diagramguard-line-sample');
        entry.setAttribute('role','listitem');
        sample.setAttribute('aria-hidden','true');sample.style.color=color;
        entry.append(sample,`${name}²θ ≈ ${fmt(area,2)}`);
        return entry;
      }));
      readout.innerHTML=tex(`\\sin^2 ${theta}^\\circ+\\cos^2 ${theta}^\\circ=1`,true);
    };
    makeSlider(controls,ta?'கோணம் θ':'Angle θ',10,80,1,theta,'°',v=>{theta=v;draw();});
    draw();
    return;
  }

  if(id==='identity-sec-cosec'){
    let mode='sec',theta=38;
    const title=el('p','g10ch4-lab-title',ta?'பிதாகரஸ் முக்கோணத்தை OM² அல்லது MP²-ஆல் வகுக்கும்போது பிறக்கும் முற்றொருமைகளைப் பார்க்க':'Switch which triangle leg is scaled to 1 to derive all three fundamental identities');
    const tabs=el('div','g10ch4-tabs');
    const btns=[
      ['sec',ta?'÷ Adj² (1+tan²=sec²)':'÷ Adj² (1+tan²=sec²)'],
      ['cosec',ta?'÷ Opp² (1+cot²=cosec²)':'÷ Opp² (1+cot²=cosec²)']
    ].map(([k,lbl])=>{
      const b=el('button','g10ch4-tab',lbl);b.type='button';
      b.onclick=()=>{mode=k;draw();};tabs.append(b);return[k,b];
    });
    const svgWrap=el('div'),controls=el('div'),readout=el('div','g10ch4-readout g10ch4-formula');
    lab.append(title,tabs,svgWrap,controls,readout);
    const draw=()=>{
      btns.forEach(([k,b])=>b.setAttribute('aria-pressed',String(k===mode)));
      const idn=math.identities(theta);
      const base=135,rise=Math.min(125,base*tanD(theta));
      const xO=55,yM=165;
      svgWrap.innerHTML=`<svg class="g10ch4-svg" viewBox="0 0 310 190" role="img" aria-label="Scaled identity triangle">
        <polygon points="${xO},${yM} ${xO+base},${yM} ${xO+base},${yM-rise}" fill="#F3EFE8" stroke="#6E2933" stroke-width="2.2"/>
        <text x="${xO+base/2}" y="${yM+16}" font-size="11" font-weight="700" text-anchor="middle" fill="#1E5248">${mode==='sec'?'Adj/Adj = 1':`cot ${theta}° ≈ ${fmt(idn.cot,2)}`}</text>
        <text x="${xO+base+8}" y="${yM-rise/2}" font-size="11" font-weight="700" fill="#8C3B2B">${mode==='sec'?`tan ${theta}° ≈ ${fmt(idn.t,2)}`:'Opp/Opp = 1'}</text>
        <text x="${xO+base/2-26}" y="${yM-rise/2-8}" font-size="11" font-weight="700" fill="#6E2933">${mode==='sec'?`sec ${theta}° ≈ ${fmt(idn.sec,2)}`:`cosec ${theta}° ≈ ${fmt(idn.csc,2)}`}</text>
      </svg>`;
      readout.innerHTML=mode==='sec'
        ?tex(`\\begin{aligned}&1+\\tan^2 ${theta}^\\circ=\\sec^2 ${theta}^\\circ\\approx ${fmt(idn.id2Left,3)}\\end{aligned}`,true)
        :tex(`\\begin{aligned}&1+\\cot^2 ${theta}^\\circ=\\operatorname{cosec}^2 ${theta}^\\circ\\approx ${fmt(idn.id3Left,3)}\\end{aligned}`,true);
    };
    makeSlider(controls,ta?'கோணம் θ':'Angle θ',20,70,1,theta,'°',v=>{theta=v;draw();});
    draw();
    return;
  }

  if(id==='proving-identities'){
    let strat='sin-cos',theta=40;
    const title=el('p','g10ch4-lab-title',ta?'நிரூபண உத்தியைத் தேர்ந்தெடுத்து, எந்த θ-விற்கும் LHS = RHS என்பதைச் சோதிக்க':'Inspect the three core algebraic proof moves and check LHS = RHS for any θ');
    const tabs=el('div','g10ch4-tabs');
    const btns=[
      ['sin-cos',ta?'sin/cos மாற்றம்':'To sin & cos'],
      ['factor',ta?'காரணிப்படுத்தல்':'Factor powers'],
      ['conj',ta?'இணை எண்':'Conjugate 1 ± sin θ']
    ].map(([k,lbl])=>{
      const b=el('button','g10ch4-tab',lbl);b.type='button';
      b.onclick=()=>{strat=k;draw();};tabs.append(b);return[k,b];
    });
    const controls=el('div'),metrics=el('div'),readout=el('div','g10ch4-readout g10ch4-formula');
    lab.append(title,tabs,controls,metrics,readout);
    const draw=()=>{
      btns.forEach(([k,b])=>b.setAttribute('aria-pressed',String(k===strat)));
      const idn=math.identities(theta);
      let lhs=0,rhs=0,eq='';
      if(strat==='sin-cos'){
        lhs=idn.cot+idn.t;rhs=idn.sec*idn.csc;
        eq=`\\begin{aligned}&\\cot\\theta+\\tan\\theta=\\dfrac{\\cos^2\\theta+\\sin^2\\theta}{\\sin\\theta\\cos\\theta}\\\\&=\\sec\\theta\\operatorname{cosec}\\theta\\end{aligned}`;
      }else if(strat==='factor'){
        lhs=Math.pow(idn.t,4)+idn.t*idn.t;rhs=Math.pow(idn.sec,4)-idn.sec*idn.sec;
        eq=`\\begin{aligned}&\\tan^2\\theta(\\tan^2\\theta+1)=(\\sec^2\\theta-1)\\sec^2\\theta\\\\&=\\sec^4\\theta-\\sec^2\\theta\\end{aligned}`;
      }else{
        lhs=idn.c/(1+idn.s);rhs=idn.sec-idn.t;
        eq=`\\begin{aligned}&\\dfrac{\\cos\\theta}{1+\\sin\\theta}\\cdot\\dfrac{1-\\sin\\theta}{1-\\sin\\theta}=\\dfrac{1-\\sin\\theta}{\\cos\\theta}\\\\&=\\sec\\theta-\\tan\\theta\\end{aligned}`;
      }
      metrics.replaceChildren();
      makeMetrics(metrics,[
        [`LHS (θ=${theta}°)`,fmt(lhs,4)],
        [`RHS (θ=${theta}°)`,fmt(rhs,4)],
        [ta?'வித்தியாசம்':'|LHS − RHS|',fmt(Math.abs(lhs-rhs),6)]
      ]);
      readout.innerHTML=tex(eq,true);
    };
    makeSlider(controls,ta?'சோதனைக் கோணம் θ':'Test angle θ',15,75,1,theta,'°',v=>{theta=v;draw();});
    draw();
    return;
  }

  if(id==='angle-elevation'){
    let dist=26,rise=18,eye=0;
    const title=el('p','g10ch4-lab-title',ta?'தொலைவு d மற்றும் உயரம் h-ஐ மாற்றி ஏற்றக்கோணம் θ எவ்வாறு மாறுகிறது எனப் பார்க்க':'Adjust distance d, target rise, and observer eye height e to track angle of elevation θ');
    const chips=el('div','g10ch4-preset-row');
    const bNoEye=el('button','g10ch4-chip-btn',ta?'தரை மட்டம் (e = 0)':'Ground eye (e = 0 m)');
    const bEye=el('button','g10ch4-chip-btn',ta?'நபர் உயரம் (e = 1.8 மீ)':'Observer height (e = 1.8 m)');
    [bNoEye,bEye].forEach(b=>b.type='button');
    bNoEye.onclick=()=>{eye=0;draw();};
    bEye.onclick=()=>{eye=1.8;draw();};
    chips.append(bNoEye,bEye);
    const svgWrap=el('div'),controls=el('div'),readout=el('div','g10ch4-readout g10ch4-formula');
    lab.append(title,chips,svgWrap,controls,readout);
    const figure=sightFigure(svgWrap,ta?'ஏற்றக்கோண வரைபடம்':'Angle of elevation diagram');
    const draw=()=>{
      bNoEye.setAttribute('aria-pressed',String(eye===0));
      bEye.setAttribute('aria-pressed',String(eye>0));
      const ev=math.elevation(rise,dist,eye);
      const scale=Math.min(176/dist,133/ev.totalHeight);
      const xObs=58,xT=xObs+dist*scale,yBase=156,yEye=yBase-eye*scale,yTop=yBase-ev.totalHeight*scale;
      const unit=ta?'மீ':'m';
      figure(`
        <line x1="20" y1="${yBase}" x2="289" y2="${yBase}" stroke="#525B62" stroke-width="1.6" data-dg-obstacle="ground"/>
        <rect x="${xT}" y="${yTop}" width="18" height="${yBase-yTop}" fill="#ECE7DC" stroke="#6E2933" stroke-width="1.8" data-dg-obstacle="target" data-dg-fill/>
        ${eye?`<line x1="${xObs}" y1="${yEye}" x2="${xT}" y2="${yEye}" stroke="#1E5248" stroke-width="1.5" stroke-dasharray="4 3" data-dg-obstacle="horizon"/>
          <line x1="${xObs}" y1="${yEye}" x2="${xObs}" y2="${yBase}" stroke="#181B20" stroke-width="2.5" data-dg-obstacle="eye-height"/>`:''}
        <line x1="${xObs}" y1="${yEye}" x2="${xT}" y2="${yTop}" stroke="#6E2933" stroke-width="2.2" data-dg-obstacle="sight"/>
        <circle cx="${xObs}" cy="${yEye}" r="3.5" fill="#181B20" data-dg-obstacle="observer" data-dg-fill/>
        ${sightArc(xObs,yEye,20,0,-ev.thetaDeg,'#6E2933')}`,[
        {id:'θ',x:xObs,y:yEye,direction:[[-1,-1],[0,-1],[-1,0]]},
        {id:'d',x:(xObs+xT)/2,y:yBase,direction:[0,1]},
        {id:'H',x:xT+18,y:(yTop+yBase)/2,direction:[1,0]},
        ...(eye?[{id:'e',x:xObs,y:(yEye+yBase)/2,direction:[[-1,0],[-1,1]]}]:[])
      ],[`θ ≈ ${fmt(ev.thetaDeg,1)}°`,`d = ${dist} ${unit}`,`H = ${fmt(ev.totalHeight,1)} ${unit}`,
        ...(eye?[`e = ${eye} ${unit}`]:[])]);
      readout.innerHTML=tex(`\\begin{aligned}&\\theta=\\arctan\\left(\\dfrac{${rise}}{${dist}}\\right)\\approx ${fmt(ev.thetaDeg,1)}^\\circ\\\\&H_{\\text{total}}=${rise}+${eye}=${fmt(ev.totalHeight,1)}\\text{ m}\\end{aligned}`,true);
    };
    makeSlider(controls,ta?'கிடைமட்டத் தொலைவு d (மீ)':'Horizontal distance d (m)',12,45,1,dist,' m',v=>{dist=v;draw();});
    makeSlider(controls,ta?'கண் மட்டத்திற்கு மேல் உயரம்':'Height above eye level (m)',8,36,1,rise,' m',v=>{rise=v;draw();});
    draw();
    return;
  }

  if(id==='angle-depression'){
    let angle=30,height=30,showTrap=false;
    const title=el('p','g10ch4-lab-title',ta?'மேல் கிடைநிலைக் கோட்டிலுள்ள இறக்கக்கோணம் Z-விதிப்படி தரையில் ஏற்றக்கோணத்திற்குச் சமமாவதைக் காண்க':'Compare the true horizontal depression angle with the vertical-wall misconception');
    const chips=el('div','g10ch4-preset-row');
    const bTrue=el('button','g10ch4-chip-btn',ta?'சரியான கிடைநிலைக் கோணம்':'True Horizon Z-Angles');
    const bTrap=el('button','g10ch4-chip-btn',ta?'பொதுத் தவறு: சுவர் கோணம்':'Misconception: Wall Angle');
    [bTrue,bTrap].forEach(b=>b.type='button');
    bTrue.onclick=()=>{showTrap=false;draw();};
    bTrap.onclick=()=>{showTrap=true;draw();};
    chips.append(bTrue,bTrap);
    const svgWrap=el('div'),controls=el('div'),readout=el('div','g10ch4-readout g10ch4-formula');
    lab.append(title,chips,svgWrap,controls,readout);
    const figure=sightFigure(svgWrap,ta?'இறக்கக்கோண வரைபடம்':'Angle of depression diagram');
    const draw=()=>{
      bTrue.setAttribute('aria-pressed',String(!showTrap));
      bTrap.setAttribute('aria-pressed',String(showTrap));
      const dep=math.depression(height,angle);
      const scale=Math.min(169/dep.dist,114/height);
      const xB=68,yB=154,yC=yB-height*scale,xA=xB+dep.dist*scale,xX=xA+18;
      figure(`
        <line x1="20" y1="${yB}" x2="289" y2="${yB}" stroke="#1E5248" stroke-width="1.6" data-dg-obstacle="ground"/>
        <rect x="${xB-17}" y="${yC}" width="17" height="${yB-yC}" fill="#ECE7DC" stroke="#181B20" stroke-width="1.8" data-dg-obstacle="wall" data-dg-fill/>
        <line x1="${xB}" y1="${yC}" x2="${xX}" y2="${yC}" stroke="#6E2933" stroke-width="1.6" stroke-dasharray="4 3" data-dg-obstacle="horizon"/>
        <line x1="${xB}" y1="${yC}" x2="${xA}" y2="${yB}" stroke="#6E2933" stroke-width="2.2" data-dg-obstacle="sight"/>
        <circle cx="${xA}" cy="${yB}" r="3.5" fill="#1E5248" data-dg-obstacle="target" data-dg-fill/>
        ${sightArc(xB,yC,21,0,angle,'#6E2933')}
        ${showTrap?sightArc(xB,yC,28,angle,90,'#9B4D29'):sightArc(xA,yB,21,180,180+angle,'#1E5248')}`,[
        {id:'C',x:xB,y:yC,direction:[[0,-1],[-1,-1]]},
        {id:'X',x:xX,y:yC,direction:[[1,0],[0,-1]]},
        {id:'B',x:xB,y:yB,direction:[[0,1],[-1,1]]},
        {id:'A',x:xA,y:yB,direction:[[0,1],[1,1]]},
        {id:'h',x:xB-17,y:(yC+yB)/2,direction:[-1,0]}
      ],[showTrap?(ta?`செங்குத்துச் சுவர் கோணம் = ${90-angle}°`:`Wall angle = ${90-angle}° (from vertical)`):
        `∠XCA = ∠CAB = ${angle}°`,`h = ${height} ${ta?'மீ':'m'}`]);
      readout.innerHTML=showTrap
        ?tex(`\\text{Wall-angle shortcut: }h\\tan ${angle}^\\circ\\approx ${fmt(dep.wrongWallDist,1)}\\text{ m}\\;(${angle===45?'\\text{Coincides at }45^\\circ\\text{ only; use horizon angle}':'\\text{Not the horizon-angle method}'})`,true)
        :tex(`\\begin{aligned}&\\angle XCA=\\angle CAB=${angle}^\\circ\\\\&d=\\dfrac{${height}}{\\tan ${angle}^\\circ}\\approx ${fmt(dep.dist,1)}\\text{ m}\\end{aligned}`,true);
    };
    makeSlider(controls,ta?'இறக்கக்கோணம் θ':'Depression angle θ',20,70,5,angle,'°',v=>{angle=v;draw();});
    makeSlider(controls,ta?'பாறை / கோபுர உயரம் h':'Cliff height h (m)',15,60,5,height,' m',v=>{height=v;draw();});
    draw();
    return;
  }

  /* Concept 10: combined-heights */
  let mode='deck-hill',alpha=60,beta=30;
  const h1=40;
  const title=el('p','g10ch4-lab-title',ta?'இரு செங்கோண முக்கோணங்களும் எவ்வாறு பொது கிடைமட்டப் பாலம் x மூலம் இணைகின்றன எனப் பார்க்க':'Explore how a shared horizontal bridge links two right triangles');
  const tabs=el('div','g10ch4-tabs');
  const btns=[
    ['deck-hill',ta?'கப்பல் → குன்று (ஏற்றம்+இறக்கம்)':'Deck → Hill (Elev + Dep)'],
    ['two-same',ta?'இரு படகுகள் (ஒரே பக்கம்)':'Two Boats (Same Side)'],
    ['two-opposite',ta?'இரு கப்பல்கள் (எதிரெதிர்)':'Two Ships (Opposite)']
  ].map(([k,lbl])=>{
    const b=el('button','g10ch4-tab',lbl);b.type='button';
    b.onclick=()=>{mode=k;if(mode==='two-same'&&alpha<=beta){alpha=60;beta=30;}draw();};
    tabs.append(b);return[k,b];
  });
  const svgWrap=el('div'),controls=el('div'),readout=el('div','g10ch4-readout g10ch4-formula');
  lab.append(title,tabs,svgWrap,controls,readout);
  const figure=sightFigure(svgWrap,ta?'இரு செங்கோண முக்கோணங்களின் பார்வைக்கோடுகள்':'Lines of sight in two right triangles');
  const unit=ta?'மீ':'m';
  const draw=()=>{
    btns.forEach(([k,b])=>b.setAttribute('aria-pressed',String(k===mode)));
    if(mode==='two-same'&&alpha<=beta)alpha=Math.min(75,beta+5);
    for(const [control,angle] of [[alphaSlider,alpha],[betaSlider,beta]]){
      control.input.value=String(angle);
      control.out.textContent=angle+'°';
    }
    const res=math.combinedTwoTriangles(mode,h1,alpha,beta);
    const y=154;
    const ground=`<line x1="20" y1="${y}" x2="289" y2="${y}" stroke="#1E5248" stroke-width="1.6" data-dg-obstacle="ground"/>`;
    const ray=(x1,y1,x2,y2,id,color)=>`<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${color}" stroke-width="2" data-dg-obstacle="${id}"/>`;
    const red='#6E2933',green='#1E5248';
    const values=[`α = ${alpha}°`,`β = ${beta}°`,`h₁ = ${h1} ${unit}`];
    if(mode==='deck-hill'){
      const scale=Math.min(178/res.x,128/res.total);
      const observer=59,target=observer+res.x*scale,eye=y-h1*scale,top=y-res.total*scale;
      figure(`${ground}
        <rect x="42" y="${eye}" width="17" height="${y-eye}" fill="#DCEEE8" stroke="${green}" data-dg-obstacle="deck" data-dg-fill/>
        <rect x="${target}" y="${top}" width="17" height="${y-top}" fill="#F3EFE8" stroke="${red}" data-dg-obstacle="target" data-dg-fill/>
        <line x1="${observer}" y1="${eye}" x2="${target}" y2="${eye}" stroke="#181B20" stroke-dasharray="4 3" data-dg-obstacle="horizon"/>
        ${ray(observer,eye,target,top,'alpha',red)}${ray(observer,eye,target,y,'beta',green)}
        ${sightArc(observer,eye,17,0,-alpha,red)}${sightArc(observer,eye,21,beta,0,green)}`,[
        {id:'α',x:observer,y:eye,direction:[[0,-1],[-1,-1],[1,-1]]},
        {id:'β',x:observer+20,y:eye+14,direction:[[0,1],[1,1],[1,0]]},
        {id:'x',x:(observer+target)/2,y,direction:[0,1]}
      ],[...values,`x ≈ ${fmt(res.x,1)} ${unit}`,`H ≈ ${fmt(res.total,1)} ${unit}`]);
      readout.innerHTML=tex(`\\begin{aligned}&x=\\dfrac{${h1}}{\\tan ${beta}^\\circ}\\approx ${fmt(res.x,1)}\\text{ m}\\\\&H=${h1}+x\\tan ${alpha}^\\circ\\approx ${fmt(res.total,1)}\\text{ m}\\end{aligned}`,true);
    }else{
      const same=mode==='two-same';
      const left=same?res.xNear:res.xLeft,right=same?res.xFar:res.xRight;
      const scale=Math.min(182/(same?right:left+right),112/h1);
      const tower=59+(same?0:left*scale),eye=y-h1*scale;
      const x1=tower+(same?1:-1)*left*scale,x2=tower+right*scale;
      const dot=(x,id,color)=>`<circle cx="${x}" cy="${y}" r="3.2" fill="${color}" data-dg-obstacle="${id}" data-dg-fill/>`;
      figure(`${ground}
        <rect x="${tower-7}" y="${eye}" width="14" height="${y-eye}" fill="#F3EFE8" stroke="${red}" data-dg-obstacle="tower" data-dg-fill/>
        ${ray(tower,eye,x1,y,'alpha',red)}${ray(tower,eye,x2,y,'beta',green)}
        ${dot(x1,'first-position',red)}${dot(x2,'second-position',green)}
        ${same?sightArc(x1,y,17,180,180+alpha,red):sightArc(x1,y,17,0,-alpha,red)}
        ${sightArc(x2,y,19,180,180+beta,green)}`,[
        {id:'α',x:x1,y,direction:[[-1,1],[0,1],[-1,0]]},
        {id:'β',x:x2,y,direction:[[1,1],[0,1],[1,0]]},
        {id:'h₁',x:tower,y:eye,direction:[[0,-1],[-1,-1],[1,-1]]}
      ],[...values,`d ≈ ${fmt(res.gap,1)} ${unit}`]);
      const first=same?right:left,second=same?left:right;
      readout.innerHTML=tex(`\\begin{aligned}&x_1\\approx ${fmt(first,1)}\\text{ m},\\;x_2\\approx ${fmt(second,1)}\\text{ m}\\\\&\\text{Gap}=x_1${same?'-':'+'}x_2\\approx ${fmt(res.gap,1)}\\text{ m}\\end{aligned}`,true);
    }
  };
  const alphaSlider=makeSlider(controls,ta?'மேல் / அருகில் கோணம் α':'Angle α',30,75,5,alpha,'°',v=>{alpha=v;draw();});
  const betaSlider=makeSlider(controls,ta?'கீழ் / தொலைவு கோணம் β':'Angle β',20,65,5,beta,'°',v=>{beta=v;draw();});
  draw();
}

window.TriggleG10Ch6Labs={renderGlance,mount,math};
})();
