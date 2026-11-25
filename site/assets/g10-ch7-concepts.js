/* VER Triggle | Grade 10 Chapter 7 | Mensuration — Interactive SVG Concept Studio.
 * Self-hosted, offline-capable, mobile-first (320px+) SVG visualizations and pure mensuration verification helpers.
 * Uses existing .g10ch4-* Bond-light studio classes for consistent visual hierarchy across Chapters 4, 5, 6, and 7. */
(()=>{'use strict';

const PI_22_7=22/7;
const fmt=(n,dec=2)=>!Number.isFinite(n)?'—':(Math.abs(n)<1e-9?0:Number(n.toFixed(dec))).toString();

/* Pure deterministic mensuration helpers (unit-tested independently of DOM) */
const math={
  unitConvert(m3){
    if(!(m3>0))return{valid:false};
    return{valid:true,m3,litres:m3*1000,cm3:m3*1e6};
  },
  cylinder(r,h,pi=PI_22_7){
    if(!(r>0&&h>0))return{valid:false};
    const csa=2*pi*r*h;
    const base=pi*r*r;
    const tsa=csa+2*base;
    const vol=base*h;
    return{valid:true,r,h,csa,tsa,base,vol};
  },
  hollowCylinder(R,r,h,pi=PI_22_7){
    if(!(R>0&&r>0&&h>0&&R>r))return{valid:false};
    const thickness=R-r;
    const csa=2*pi*(R+r)*h;
    const rings=2*pi*(R*R-r*r);
    const tsa=2*pi*(R+r)*(R-r+h);
    const vol=pi*(R*R-r*r)*h;
    return{valid:true,R,r,h,thickness,csa,rings,tsa,vol};
  },
  cone(r,h,pi=PI_22_7){
    if(!(r>0&&h>0))return{valid:false};
    const l=Math.hypot(r,h);
    const csa=pi*r*l;
    const base=pi*r*r;
    const tsa=pi*r*(l+r);
    const vol=(pi*r*r*h)/3;
    const sectorAngleDeg=(360*r)/l;
    return{valid:true,r,h,l,csa,base,tsa,vol,sectorAngleDeg};
  },
  sphere(r,pi=PI_22_7){
    if(!(r>0))return{valid:false};
    const sa=4*pi*r*r;
    const vol=(4/3)*pi*r*r*r;
    return{valid:true,r,sa,vol};
  },
  hemisphere(r,pi=PI_22_7){
    if(!(r>0))return{valid:false};
    const csa=2*pi*r*r;
    const tsa=3*pi*r*r;
    const vol=(2/3)*pi*r*r*r;
    return{valid:true,r,csa,tsa,vol};
  },
  hollowHemisphere(R,r,pi=PI_22_7){
    if(!(R>0&&r>0&&R>r))return{valid:false};
    const csa=2*pi*(R*R+r*r);
    const ring=pi*(R*R-r*r);
    const tsa=pi*(3*R*R+r*r);
    const vol=(2/3)*pi*(R*R*R-r*r*r);
    return{valid:true,R,r,thickness:R-r,csa,ring,tsa,vol};
  },
  hollowSphere(R,r,pi=PI_22_7){
    if(!(R>0&&r>0&&R>r))return{valid:false};
    const outerSa=4*pi*R*R;
    const totalSa=4*pi*(R*R+r*r);
    const vol=(4/3)*pi*(R*R*R-r*r*r);
    return{valid:true,R,r,thickness:R-r,outerSa,totalSa,vol};
  },
  frustum(R,r,h,pi=PI_22_7){
    if(!(R>0&&r>0&&h>0&&R>r))return{valid:false};
    const l=Math.hypot(h,R-r);
    const H=(h*R)/(R-r);
    const hTop=H-h;
    const csa=pi*(R+r)*l;
    const tsa=csa+pi*R*R+pi*r*r;
    const vol=(pi*h/3)*(R*R+R*r+r*r);
    const volDiff=(pi/3)*R*R*H-(pi/3)*r*r*hTop;
    return{valid:true,R,r,h,l,H,hTop,csa,tsa,vol,volDiff};
  },
  combinedSolid(mode,r,h,pi=PI_22_7){
    if(!(r>0&&h>0))return{valid:false};
    if(mode==='toy-cyl-hemi'){
      // Cylinder + hemisphere on top, flat circular base on bottom
      const tsa=2*pi*r*h+2*pi*r*r+pi*r*r;
      const vol=pi*r*r*h+(2/3)*pi*r*r*r;
      return{valid:true,mode,r,h,tsa,vol,hiddenArea:2*pi*r*r};
    }
    if(mode==='tent-cyl-cone'){
      // Open-floor tent: cylinder wall + cone wall (cone height = hCone = r for clean demo, or h/2)
      const hCone=Math.max(2,Math.round(h*0.6));
      const l=Math.hypot(r,hCone);
      const tsa=2*pi*r*h+pi*r*l;
      const vol=pi*r*r*h+(1/3)*pi*r*r*hCone;
      return{valid:true,mode,r,h,hCone,l,tsa,vol,hiddenArea:2*pi*r*r};
    }
    // mode === 'cavity-cyl-cone': solid cylinder with conical cavity of same r, h
    const l=Math.hypot(r,h);
    const tsa=2*pi*r*h+pi*r*l+pi*r*r;
    const vol=pi*r*r*h-(1/3)*pi*r*r*h;
    return{valid:true,mode:'cavity-cyl-cone',r,h,l,tsa,vol,hiddenArea:pi*r*r};
  },
  recastSphereToCylinder(R,rCyl){
    if(!(R>0&&rCyl>0))return{valid:false};
    const H=(4*R*R*R)/(3*rCyl*rCyl);
    const nSpheres=(R*R*R)/(rCyl*rCyl*rCyl);
    return{valid:true,R,rCyl,H,nSpheres};
  },
  pipeFlow(rPipeM,speedMPerH,tankAreaM2,riseM,pi=PI_22_7){
    if(!(rPipeM>0&&speedMPerH>0&&tankAreaM2>0&&riseM>0))return{valid:false};
    const rateM3PerH=pi*rPipeM*rPipeM*speedMPerH;
    const neededM3=tankAreaM2*riseM;
    const timeH=neededM3/rateM3PerH;
    return{valid:true,rateM3PerH,neededM3,timeH};
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
function makeMetrics(host,items){
  const grid=el('div','g10ch4-metrics');
  items.forEach(([k,v])=>{
    grid.append(el('div','g10ch4-metric',`<span>${k}</span><strong>${v}</strong>`));
  });
  host.append(grid);
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

/* Compact Bond-light Step 1 Glance SVGs (all text strictly inside 260x112, zero overlap) */
function renderGlance(stage,host,lang){
  if(!host)return;
  const id=stage.glanceVisual||stage.visual?.id||'solids-units';
  const ta=lang==='ta';
  const map={
    'solids-units':`<svg class="g10ch4-glance-svg" viewBox="0 0 260 112" aria-hidden="true">
      <rect x="24" y="24" width="54" height="54" fill="#F3EFE8" stroke="#6E2933" stroke-width="1.8"/>
      <text x="51" y="55" font-size="11" font-weight="700" text-anchor="middle" fill="#6E2933">cm²</text>
      <text x="51" y="96" font-size="10" text-anchor="middle" fill="#181B20">${ta?'பரப்பு (2D)':'Area (2D)'}</text>
      <polygon points="122,34 164,34 178,22 136,22" fill="#DCEEE8" stroke="#1E5248" stroke-width="1.5"/>
      <rect x="122" y="34" width="42" height="44" fill="#EFF8F4" stroke="#1E5248" stroke-width="1.8"/>
      <polygon points="164,34 178,22 178,66 164,78" fill="#C9E4DB" stroke="#1E5248" stroke-width="1.5"/>
      <text x="143" y="60" font-size="11" font-weight="700" text-anchor="middle" fill="#1E5248">cm³</text>
      <text x="150" y="96" font-size="10" text-anchor="middle" fill="#181B20">${ta?'கன அளவு (3D)':'Volume (3D)'}</text>
      <rect x="200" y="24" width="42" height="54" rx="4" fill="#FAF9F6" stroke="#181B20" stroke-width="1.6"/>
      <rect x="202" y="42" width="38" height="34" rx="2" fill="#DCEEE8"/>
      <text x="221" y="62" font-size="10.5" font-weight="700" text-anchor="middle" fill="#1E5248">1 L</text>
      <text x="221" y="96" font-size="9.5" text-anchor="middle" fill="#525B62">1000 cm³</text>
    </svg>`,
    'cylinder-sa':`<svg class="g10ch4-glance-svg" viewBox="0 0 260 112" aria-hidden="true">
      <ellipse cx="62" cy="28" rx="30" ry="9" fill="#DCEEE8" stroke="#1E5248" stroke-width="1.8"/>
      <path d="M32,28 L32,82 A30,9 0 0,0 92,82 L92,28" fill="#F3EFE8" stroke="#1E5248" stroke-width="1.8"/>
      <ellipse cx="62" cy="82" rx="30" ry="9" fill="none" stroke="#1E5248" stroke-width="1.2" stroke-dasharray="3 2"/>
      <text x="100" y="58" font-size="10.5" font-weight="700" fill="#1E5248">h</text>
      <rect x="136" y="34" width="96" height="44" fill="#F3EFE8" stroke="#6E2933" stroke-width="1.8"/>
      <text x="184" y="60" font-size="11" font-weight="700" text-anchor="middle" fill="#6E2933">2πr × h</text>
      <text x="184" y="96" font-size="10" text-anchor="middle" fill="#181B20">${ta?'விரித்த வளைபரப்பு':'Unrolled C.S.A.'}</text>
    </svg>`,
    'cone-sa':`<svg class="g10ch4-glance-svg" viewBox="0 0 260 112" aria-hidden="true">
      <polygon points="74,16 34,86 114,86" fill="#F3EFE8" stroke="#6E2933" stroke-width="1.8"/>
      <line x1="74" y1="16" x2="74" y2="86" stroke="#1E5248" stroke-width="1.6" stroke-dasharray="4 3"/>
      <line x1="74" y1="86" x2="114" y2="86" stroke="#181B20" stroke-width="1.8"/>
      <text x="66" y="58" font-size="10" font-weight="700" fill="#1E5248">h</text>
      <text x="94" y="100" font-size="10" font-weight="700" text-anchor="middle" fill="#181B20">r</text>
      <text x="102" y="50" font-size="10.5" font-weight="700" fill="#6E2933">l</text>
      <path d="M168,24 L144,82 A64,64 0 0,0 226,82 Z" fill="#DCEEE8" stroke="#1E5248" stroke-width="1.8"/>
      <text x="184" y="64" font-size="10.5" font-weight="700" text-anchor="middle" fill="#1E5248">πrl</text>
      <text x="184" y="100" font-size="10" text-anchor="middle" fill="#525B62">s = 2πr</text>
    </svg>`,
    'sphere-sa':`<svg class="g10ch4-glance-svg" viewBox="0 0 260 112" aria-hidden="true">
      <rect x="34" y="20" width="64" height="64" fill="none" stroke="#1E5248" stroke-width="1.6" stroke-dasharray="4 3"/>
      <circle cx="66" cy="52" r="32" fill="#F3EFE8" stroke="#6E2933" stroke-width="2"/>
      <ellipse cx="66" cy="52" rx="32" ry="9" fill="none" stroke="#6E2933" stroke-width="1.2" stroke-dasharray="3 2"/>
      <text x="66" y="102" font-size="10" font-weight="700" text-anchor="middle" fill="#6E2933">4πr²</text>
      <path d="M150,52 A36,36 0 0,0 222,52 Z" fill="#DCEEE8" stroke="#1E5248" stroke-width="1.8"/>
      <ellipse cx="186" cy="52" rx="36" ry="10" fill="#F8E7E9" stroke="#6E2933" stroke-width="1.6"/>
      <text x="186" y="55" font-size="9.5" font-weight="700" text-anchor="middle" fill="#6E2933">+πr²</text>
      <text x="186" y="102" font-size="10" font-weight="700" text-anchor="middle" fill="#1E5248">TSA = 3πr²</text>
    </svg>`,
    'frustum':`<svg class="g10ch4-glance-svg" viewBox="0 0 260 112" aria-hidden="true">
      <polygon points="130,14 96,44 164,44" fill="none" stroke="#B8B2A6" stroke-width="1.5" stroke-dasharray="4 3"/>
      <polygon points="96,44 164,44 188,88 72,88" fill="#DCEEE8" stroke="#1E5248" stroke-width="2"/>
      <line x1="130" y1="44" x2="164" y2="44" stroke="#6E2933" stroke-width="1.6"/>
      <line x1="130" y1="88" x2="188" y2="88" stroke="#6E2933" stroke-width="1.6"/>
      <line x1="130" y1="44" x2="130" y2="88" stroke="#181B20" stroke-width="1.5" stroke-dasharray="3 2"/>
      <text x="148" y="39" font-size="10" font-weight="700" fill="#6E2933">r</text>
      <text x="158" y="102" font-size="10" font-weight="700" fill="#6E2933">R</text>
      <text x="122" y="70" font-size="10" font-weight="700" fill="#181B20">h</text>
      <text x="186" y="68" font-size="10" font-weight="700" fill="#1E5248">l</text>
    </svg>`,
    'volume-cyl-cone':`<svg class="g10ch4-glance-svg" viewBox="0 0 260 112" aria-hidden="true">
      <polygon points="34,26 68,26 51,82" fill="#F8E7E9" stroke="#6E2933" stroke-width="1.6"/>
      <polygon points="78,26 112,26 95,82" fill="#F8E7E9" stroke="#6E2933" stroke-width="1.6"/>
      <polygon points="122,26 156,26 139,82" fill="#F8E7E9" stroke="#6E2933" stroke-width="1.6"/>
      <text x="168" y="58" font-size="14" font-weight="700" fill="#181B20">=</text>
      <rect x="188" y="26" width="42" height="56" fill="#DCEEE8" stroke="#1E5248" stroke-width="1.8"/>
      <text x="95" y="100" font-size="10" text-anchor="middle" fill="#6E2933">3 × Cone</text>
      <text x="209" y="100" font-size="10" font-weight="700" text-anchor="middle" fill="#1E5248">πr²h</text>
    </svg>`,
    'volume-sphere':`<svg class="g10ch4-glance-svg" viewBox="0 0 260 112" aria-hidden="true">
      <circle cx="62" cy="54" r="30" fill="#DCEEE8" stroke="#1E5248" stroke-width="2"/>
      <text x="62" y="58" font-size="10.5" font-weight="700" text-anchor="middle" fill="#1E5248">4/3 πr³</text>
      <text x="108" y="58" font-size="14" font-weight="700" fill="#181B20">=</text>
      <polygon points="128,24 170,24 149,84" fill="#F3EFE8" stroke="#6E2933" stroke-width="1.8"/>
      <polygon points="184,24 226,24 205,84" fill="#F3EFE8" stroke="#6E2933" stroke-width="1.8"/>
      <text x="177" y="102" font-size="10" text-anchor="middle" fill="#6E2933">2 × Cone (h = 2r)</text>
    </svg>`,
    'combined-solids':`<svg class="g10ch4-glance-svg" viewBox="0 0 260 112" aria-hidden="true">
      <path d="M56,44 A26,26 0 0,1 108,44" fill="#F8E7E9" stroke="#6E2933" stroke-width="1.8"/>
      <rect x="56" y="44" width="52" height="46" fill="#DCEEE8" stroke="#1E5248" stroke-width="1.8"/>
      <line x1="56" y1="44" x2="108" y2="44" stroke="#6E2933" stroke-width="1.5" stroke-dasharray="4 3"/>
      <text x="82" y="104" font-size="9.5" text-anchor="middle" fill="#6E2933">${ta?'மறைந்த தளம்':'Hidden seam'}</text>
      <rect x="160" y="24" width="60" height="66" fill="#F3EFE8" stroke="#181B20" stroke-width="1.8"/>
      <polygon points="160,24 220,24 190,84" fill="#FAF9F6" stroke="#6E2933" stroke-width="1.6" stroke-dasharray="4 3"/>
      <text x="190" y="104" font-size="9.5" text-anchor="middle" fill="#1E5248">${ta?'புதிய உள் சுவர்':'New inner wall'}</text>
    </svg>`,
    'volume-conservation':`<svg class="g10ch4-glance-svg" viewBox="0 0 260 112" aria-hidden="true">
      <rect x="28" y="24" width="64" height="48" fill="#DCEEE8" stroke="#1E5248" stroke-width="1.6"/>
      <line x1="44" y1="24" x2="44" y2="72" stroke="#1E5248"/><line x1="60" y1="24" x2="60" y2="72" stroke="#1E5248"/><line x1="76" y1="24" x2="76" y2="72" stroke="#1E5248"/>
      <line x1="28" y1="40" x2="92" y2="40" stroke="#1E5248"/><line x1="28" y1="56" x2="92" y2="56" stroke="#1E5248"/>
      <text x="60" y="92" font-size="10" font-weight="700" text-anchor="middle" fill="#1E5248">4 × 3 = 12</text>
      <text x="116" y="54" font-size="14" font-weight="700" fill="#181B20">=</text>
      <rect x="138" y="40" width="96" height="32" fill="#F3EFE8" stroke="#6E2933" stroke-width="1.6"/>
      <line x1="154" y1="40" x2="154" y2="72" stroke="#6E2933"/><line x1="170" y1="40" x2="170" y2="72" stroke="#6E2933"/><line x1="186" y1="40" x2="186" y2="72" stroke="#6E2933"/><line x1="202" y1="40" x2="202" y2="72" stroke="#6E2933"/><line x1="218" y1="40" x2="218" y2="72" stroke="#6E2933"/>
      <line x1="138" y1="56" x2="234" y2="56" stroke="#6E2933"/>
      <text x="186" y="92" font-size="10" font-weight="700" text-anchor="middle" fill="#6E2933">6 × 2 = 12</text>
    </svg>`
  };
  host.innerHTML=map[id]||map['solids-units'];
}

function mount(stage,host,lang){
  if(!host)return;
  const id=stage.visual?.id||'solids-units';
  const ta=lang==='ta';
  host.replaceChildren();
  const lab=el('div','g10ch4-lab');
  host.append(lab);

  if(id==='solids-units'){
    let m3=1.5;
    const title=el('p','g10ch4-lab-title',ta?'கன அளவை மீ³-இல் மாற்றி லிட்டர் மற்றும் செ.மீ³ மதிப்புகளை ஒப்பிடுக':'Adjust tank volume in m³ to see exact litres and cm³');
    const svgWrap=el('div'),controls=el('div'),metrics=el('div');
    const readout=el('div','g10ch4-readout g10ch4-formula');
    lab.append(title,svgWrap,controls,metrics,readout);
    const draw=()=>{
      const res=math.unitConvert(m3);
      const fillH=Math.round((m3/5)*72);
      svgWrap.innerHTML=`<svg class="g10ch4-svg" viewBox="0 0 320 148" role="img" aria-label="${ta?'தொட்டி கொள்ளளவு மாற்றி':'Tank capacity converter'}">
        <rect x="44" y="24" width="84" height="92" rx="4" fill="#FAF9F6" stroke="#181B20" stroke-width="2"/>
        <rect x="46" y="${114-fillH}" width="80" height="${fillH}" fill="#DCEEE8"/>
        <text x="86" y="74" font-size="13" font-weight="700" text-anchor="middle" fill="#1E5248">${fmt(m3,1)} m³</text>
        <text x="158" y="72" font-size="16" font-weight="700" fill="#181B20">→</text>
        <rect x="184" y="28" width="110" height="36" rx="8" fill="#F3EFE8" stroke="#6E2933" stroke-width="1.6"/>
        <text x="239" y="51" font-size="12" font-weight="700" text-anchor="middle" fill="#6E2933">${Math.round(res.litres)} L</text>
        <rect x="184" y="76" width="110" height="36" rx="8" fill="#EFF8F4" stroke="#1E5248" stroke-width="1.6"/>
        <text x="239" y="99" font-size="11.5" font-weight="700" text-anchor="middle" fill="#1E5248">${(res.cm3/1e6).toFixed(2)} × 10⁶ cm³</text>
      </svg>`;
      metrics.replaceChildren();
      makeMetrics(metrics,[
        [ta?'கன மீட்டர்':'Cubic metres',`${fmt(res.m3,1)} m³`],
        [ta?'லிட்டர் (×1000)':'Litres (×1000)',`${Math.round(res.litres)} L`],
        [ta?'கன செ.மீ':'Cubic cm',`${Math.round(res.cm3).toLocaleString('en-IN')} cm³`]
      ]);
      readout.innerHTML=tex(`${fmt(res.m3,1)}\\text{ m}^3=${Math.round(res.litres)}\\text{ L}=${fmt(res.m3,1)}\\times 10^6\\text{ cm}^3`,true);
    };
    makeSlider(controls,ta?'கன அளவு (மீ³)':'Volume (m³)',0.5,5,0.5,m3,' m³',v=>{m3=v;draw();});
    draw();
    return;
  }

  if(id==='cylinder-sa'){
    let hollow=false,R=6,r=4,h=10;
    const title=el('p','g10ch4-lab-title',ta?'திண்ம மற்றும் உள்ளீடற்ற உருளையை மாற்றி வளைபரப்பு, மொத்தப் புறப்பரப்பை ஒப்பிடுக':'Switch between solid and hollow cylinder and adjust radii and height');
    const tabs=el('div','g10ch4-tabs');
    const b1=el('button','g10ch4-tab',ta?'திண்ம உருளை':'Solid cylinder');
    const b2=el('button','g10ch4-tab',ta?'உள்ளீடற்ற உருளை':'Hollow cylinder');
    [b1,b2].forEach(b=>b.type='button');tabs.append(b1,b2);
    const svgWrap=el('div'),controls=el('div'),metrics=el('div');
    const readout=el('div','g10ch4-readout g10ch4-formula');
    lab.append(title,tabs,svgWrap,controls,metrics,readout);
    const draw=()=>{
      b1.classList.toggle('is-active',!hollow);
      b2.classList.toggle('is-active',hollow);
      if(r>=R)r=R-1;
      const res=hollow?math.hollowCylinder(R,r,h):math.cylinder(R,h);
      svgWrap.innerHTML=`<svg class="g10ch4-svg" viewBox="0 0 320 156" role="img" aria-label="${ta?'உருளை புறப்பரப்பு படம்':'Cylinder surface area diagram'}">
        <ellipse cx="76" cy="34" rx="34" ry="10" fill="#DCEEE8" stroke="#1E5248" stroke-width="1.8"/>
        ${hollow?'<ellipse cx="76" cy="34" rx="18" ry="5.5" fill="#FAF9F6" stroke="#6E2933" stroke-width="1.5"/>':''}
        <path d="M42,34 L42,114 A34,10 0 0,0 110,114 L110,34" fill="#F3EFE8" stroke="#1E5248" stroke-width="1.8"/>
        ${hollow?'<line x1="58" y1="34" x2="58" y2="114" stroke="#6E2933" stroke-dasharray="3 3"/><line x1="94" y1="34" x2="94" y2="114" stroke="#6E2933" stroke-dasharray="3 3"/>':''}
        <text x="120" y="78" font-size="11" font-weight="700" fill="#1E5248">h=${h}</text>
        <text x="76" y="138" font-size="11" font-weight="700" text-anchor="middle" fill="#6E2933">${hollow?`R=${R}, r=${r}`:`r=${R}`}</text>
        <rect x="162" y="42" width="132" height="62" fill="#F3EFE8" stroke="#6E2933" stroke-width="1.8"/>
        <text x="228" y="68" font-size="11" font-weight="700" text-anchor="middle" fill="#6E2933">${hollow?'2π(R+r)h':'2πrh'}</text>
        <text x="228" y="88" font-size="11" text-anchor="middle" fill="#181B20">≈ ${fmt(res.csa,1)} cm²</text>
      </svg>`;
      metrics.replaceChildren();
      makeMetrics(metrics,[
        [ta?'வளைபரப்பு (CSA)':'C.S.A.',`${fmt(res.csa,2)} cm²`],
        [ta?'மொ.பு.ப (TSA)':'T.S.A.',`${fmt(res.tsa,2)} cm²`],
        [ta?'தடிமன்':'Thickness',hollow?`${R-r} cm`:(ta?'திண்மம்':'Solid')]
      ]);
      readout.innerHTML=hollow
        ?tex(`\\begin{aligned}\\text{CSA}&=2\\pi(${R}+${r})(${h})\\approx ${fmt(res.csa,2)}\\\\\\text{TSA}&\\approx ${fmt(res.tsa,2)}\\text{ cm}^2\\end{aligned}`,true)
        :tex(`\\begin{aligned}\\text{CSA}&=2\\pi(${R})(${h})\\approx ${fmt(res.csa,2)}\\\\\\text{TSA}&=2\\pi(${R})(${h}+${R})\\approx ${fmt(res.tsa,2)}\\end{aligned}`,true);
    };
    b1.onclick=()=>{hollow=false;draw();};
    b2.onclick=()=>{hollow=true;draw();};
    makeSlider(controls,ta?'வெளி ஆரம் R / r':'Outer radius R / r',3,10,1,R,' cm',v=>{R=v;draw();});
    makeSlider(controls,ta?'உள் ஆரம் r (உள்ளீடற்றது)':'Inner radius r (hollow)',1,8,1,r,' cm',v=>{r=v;draw();});
    makeSlider(controls,ta?'உயரம் h':'Height h',4,20,1,h,' cm',v=>{h=v;draw();});
    draw();
    return;
  }

  if(id==='cone-sa'){
    let r=7,h=24;
    const title=el('p','g10ch4-lab-title',ta?'ஆரம் r மற்றும் உயரம் h-ஐ மாற்றி சாயுயரம் l மற்றும் வட்டக்கோணப் பகுதியைக் காண்க':'Adjust radius r and height h to see slant height l and the unrolled sector');
    const svgWrap=el('div'),controls=el('div'),metrics=el('div');
    const readout=el('div','g10ch4-readout g10ch4-formula');
    lab.append(title,svgWrap,controls,metrics,readout);
    const draw=()=>{
      const res=math.cone(r,h);
      svgWrap.innerHTML=`<svg class="g10ch4-svg" viewBox="0 0 320 156" role="img" aria-label="${ta?'கூம்பு சாயுயரம் மற்றும் வட்டக்கோணப் பகுதி':'Cone slant height and sector'}">
        <polygon points="86,20 38,118 134,118" fill="#F3EFE8" stroke="#6E2933" stroke-width="2"/>
        <line x1="86" y1="20" x2="86" y2="118" stroke="#1E5248" stroke-width="1.8" stroke-dasharray="4 3"/>
        <line x1="86" y1="118" x2="134" y2="118" stroke="#181B20" stroke-width="2"/>
        <text x="74" y="76" font-size="11" font-weight="700" fill="#1E5248">h=${h}</text>
        <text x="110" y="136" font-size="11" font-weight="700" text-anchor="middle" fill="#181B20">r=${r}</text>
        <text x="122" y="68" font-size="11" font-weight="700" fill="#6E2933">l=${fmt(res.l,2)}</text>
        <path d="M222,26 L176,112 A92,92 0 0,0 268,112 Z" fill="#DCEEE8" stroke="#1E5248" stroke-width="2"/>
        <text x="222" y="84" font-size="11" font-weight="700" text-anchor="middle" fill="#1E5248">CSA = πrl</text>
        <text x="222" y="136" font-size="10.5" text-anchor="middle" fill="#525B62">s = 2πr ≈ ${fmt(2*PI_22_7*r,1)}</text>
      </svg>`;
      metrics.replaceChildren();
      makeMetrics(metrics,[
        [ta?'சாயுயரம் l':'Slant height l',`${fmt(res.l,2)} cm`],
        [ta?'வளைபரப்பு (CSA)':'C.S.A.',`${fmt(res.csa,2)} cm²`],
        [ta?'மொ.பு.ப (TSA)':'T.S.A.',`${fmt(res.tsa,2)} cm²`]
      ]);
      readout.innerHTML=tex(`\\begin{aligned}l&=\\sqrt{${r}^2+${h}^2}=${fmt(res.l,2)}\\text{ cm}\\\\\\text{CSA}&=\\pi rl\\approx ${fmt(res.csa,2)}\\text{ cm}^2\\end{aligned}`,true);
    };
    makeSlider(controls,ta?'ஆரம் r':'Radius r',3,14,1,r,' cm',v=>{r=v;draw();});
    makeSlider(controls,ta?'உயரம் h':'Height h',4,28,1,h,' cm',v=>{h=v;draw();});
    draw();
    return;
  }

  if(id==='sphere-sa'){
    let mode='sphere',R=7,r=4;
    const title=el('p','g10ch4-lab-title',ta?'கோளம், அரைக்கோளம் மற்றும் உள்ளீடற்ற அரைக்கோள புறப்பரப்புகளை ஒப்பிடுக':'Switch between sphere, hemisphere, and hollow hemisphere surface areas');
    const tabs=el('div','g10ch4-tabs');
    const b1=el('button','g10ch4-tab',ta?'கோளம்':'Sphere');
    const b2=el('button','g10ch4-tab',ta?'அரைக்கோளம்':'Hemisphere');
    const b3=el('button','g10ch4-tab',ta?'உள்ளீடற்ற அரைக்கோளம்':'Hollow hemi');
    [b1,b2,b3].forEach(b=>b.type='button');tabs.append(b1,b2,b3);
    const svgWrap=el('div'),controls=el('div'),metrics=el('div');
    const readout=el('div','g10ch4-readout g10ch4-formula');
    lab.append(title,tabs,svgWrap,controls,metrics,readout);
    const draw=()=>{
      b1.classList.toggle('is-active',mode==='sphere');
      b2.classList.toggle('is-active',mode==='hemi');
      b3.classList.toggle('is-active',mode==='hollow');
      if(r>=R)r=R-1;
      const res=mode==='sphere'?math.sphere(R):mode==='hemi'?math.hemisphere(R):math.hollowHemisphere(R,r);
      svgWrap.innerHTML=`<svg class="g10ch4-svg" viewBox="0 0 320 148" role="img" aria-label="${ta?'கோள புறப்பரப்பு படம்':'Sphere surface diagram'}">
        ${mode==='sphere'
          ?`<rect x="114" y="24" width="92" height="92" fill="none" stroke="#1E5248" stroke-width="1.6" stroke-dasharray="4 3"/>
            <circle cx="160" cy="70" r="46" fill="#F3EFE8" stroke="#6E2933" stroke-width="2"/>
            <ellipse cx="160" cy="70" rx="46" ry="12" fill="none" stroke="#6E2933" stroke-dasharray="3 2"/>
            <text x="218" y="74" font-size="11" font-weight="700" fill="#1E5248">h=2r</text>`
          :mode==='hemi'
            ?`<path d="M106,66 A54,54 0 0,0 214,66 Z" fill="#DCEEE8" stroke="#1E5248" stroke-width="2"/>
              <ellipse cx="160" cy="66" rx="54" ry="14" fill="#F8E7E9" stroke="#6E2933" stroke-width="1.8"/>
              <text x="160" y="70" font-size="11" font-weight="700" text-anchor="middle" fill="#6E2933">+πr²</text>`
            :`<path d="M106,64 A54,54 0 0,0 214,64 Z" fill="#DCEEE8" stroke="#1E5248" stroke-width="2"/>
              <ellipse cx="160" cy="64" rx="54" ry="14" fill="#F8E7E9" stroke="#6E2933" stroke-width="1.8"/>
              <ellipse cx="160" cy="64" rx="30" ry="8" fill="#FAF9F6" stroke="#1E5248" stroke-width="1.5"/>
              <text x="160" y="136" font-size="11" font-weight="700" text-anchor="middle" fill="#6E2933">R=${R}, r=${r}</text>`}
      </svg>`;
      metrics.replaceChildren();
      if(mode==='sphere'){
        makeMetrics(metrics,[[ta?'ஆரம் r':'Radius r',`${R} cm`],[ta?'புறப்பரப்பு (4πr²)':'Surface Area',`${fmt(res.sa,2)} cm²`]]);
        readout.innerHTML=tex(`\\text{SA}=4\\pi(${R})^2\\approx ${fmt(res.sa,2)}\\text{ cm}^2`,true);
      }else if(mode==='hemi'){
        makeMetrics(metrics,[[ta?'வளைபரப்பு (2πr²)':'C.S.A.',`${fmt(res.csa,2)} cm²`],[ta?'மொ.பு.ப (3πr²)':'T.S.A.',`${fmt(res.tsa,2)} cm²`]]);
        readout.innerHTML=tex(`\\begin{aligned}\\text{CSA}&=2\\pi(${R})^2\\approx ${fmt(res.csa,2)}\\\\\\text{TSA}&=3\\pi(${R})^2\\approx ${fmt(res.tsa,2)}\\end{aligned}`,true);
      }else{
        makeMetrics(metrics,[[ta?'வளைபரப்பு':'C.S.A.',`${fmt(res.csa,2)} cm²`],[ta?'வளையம்':'Ring',`${fmt(res.ring,2)} cm²`],[ta?'மொ.பு.ப':'T.S.A.',`${fmt(res.tsa,2)} cm²`]]);
        readout.innerHTML=tex(`\\text{TSA}=\\pi(3\\cdot${R}^2+${r}^2)\\approx ${fmt(res.tsa,2)}\\text{ cm}^2`,true);
      }
    };
    b1.onclick=()=>{mode='sphere';draw();};
    b2.onclick=()=>{mode='hemi';draw();};
    b3.onclick=()=>{mode='hollow';draw();};
    makeSlider(controls,ta?'வெளி ஆரம் R / r':'Outer radius R / r',3,14,1,R,' cm',v=>{R=v;draw();});
    makeSlider(controls,ta?'உள் ஆரம் r (உள்ளீடற்றது)':'Inner radius r (hollow)',1,10,1,r,' cm',v=>{r=v;draw();});
    draw();
    return;
  }

  if(id==='frustum'){
    let R=7,r=3,h=8;
    const title=el('p','g10ch4-lab-title',ta?'இடைக்கண்டத்தின் ஆரங்கள் R, r மற்றும் உயரம் h-ஐ மாற்றி முழுக் கூம்பு H மற்றும் கன அளவைக் காண்க':'Adjust frustum radii R, r and height h to verify similar-triangle cone height H, l, and volume');
    const svgWrap=el('div'),controls=el('div'),metrics=el('div');
    const readout=el('div','g10ch4-readout g10ch4-formula');
    lab.append(title,svgWrap,controls,metrics,readout);
    const draw=()=>{
      if(r>=R)r=R-1;
      const res=math.frustum(R,r,h);
      const topW=18+r*5,botW=24+R*6;
      svgWrap.innerHTML=`<svg class="g10ch4-svg" viewBox="0 0 320 156" role="img" aria-label="${ta?'கூம்பின் இடைக்கண்டம்':'Frustum of a cone'}">
        <polygon points="160,14 ${160-topW},52 ${160+topW},52" fill="none" stroke="#B8B2A6" stroke-width="1.6" stroke-dasharray="4 3"/>
        <polygon points="${160-topW},52 ${160+topW},52 ${160+botW},124 ${160-botW},124" fill="#DCEEE8" stroke="#1E5248" stroke-width="2"/>
        <line x1="160" y1="52" x2="160" y2="124" stroke="#181B20" stroke-width="1.5" stroke-dasharray="3 2"/>
        <text x="150" y="92" font-size="11" font-weight="700" fill="#181B20">h=${h}</text>
        <text x="160" y="47" font-size="10.5" font-weight="700" text-anchor="middle" fill="#6E2933">r=${r}</text>
        <text x="160" y="142" font-size="10.5" font-weight="700" text-anchor="middle" fill="#6E2933">R=${R}</text>
        <text x="${170+botW}" y="92" font-size="10.5" font-weight="700" fill="#1E5248">l=${fmt(res.l,2)}</text>
      </svg>`;
      metrics.replaceChildren();
      makeMetrics(metrics,[
        [ta?'சாயுயரம் l':'Slant height l',`${fmt(res.l,2)} cm`],
        [ta?'முழுக் கூம்பு H':'Full cone H',`${fmt(res.H,2)} cm`],
        [ta?'வளைபரப்பு':'C.S.A.',`${fmt(res.csa,1)} cm²`],
        [ta?'கன அளவு V':'Volume V',`${fmt(res.vol,1)} cm³`]
      ]);
      readout.innerHTML=tex(`\\begin{aligned}V&=\\dfrac{\\pi(${h})}{3}(${R}^2+${R}\\cdot${r}+${r}^2)\\\\&\\approx ${fmt(res.vol,2)}\\text{ cm}^3\\end{aligned}`,true);
    };
    makeSlider(controls,ta?'பெரிய ஆரம் R':'Large radius R',4,12,1,R,' cm',v=>{R=v;draw();});
    makeSlider(controls,ta?'சிறிய ஆரம் r':'Small radius r',1,10,1,r,' cm',v=>{r=v;draw();});
    makeSlider(controls,ta?'உயரம் h':'Height h',3,16,1,h,' cm',v=>{h=v;draw();});
    draw();
    return;
  }

  if(id==='volume-cyl-cone'){
    let r=7,h=12,scale=1;
    const title=el('p','g10ch4-lab-title',ta?'ஆரம் மற்றும் அளவு மாற்றி k மூலம் உருளை (πr²h) மற்றும் கூம்பு (⅓πr²h) கன அளவுகளை ஒப்பிடுக':'Adjust r, h, and radius multiplier k to see why V_cyl = 3 V_cone and radius scales by k²');
    const svgWrap=el('div'),controls=el('div'),metrics=el('div');
    const readout=el('div','g10ch4-readout g10ch4-formula');
    lab.append(title,svgWrap,controls,metrics,readout);
    const draw=()=>{
      const rs=r*scale;
      const cyl=math.cylinder(rs,h),cn=math.cone(rs,h);
      svgWrap.innerHTML=`<svg class="g10ch4-svg" viewBox="0 0 320 148" role="img" aria-label="${ta?'உருளை மற்றும் கூம்பு கன அளவு ஒப்பீடு':'Cylinder vs cone volume comparison'}">
        <rect x="48" y="28" width="64" height="84" fill="#DCEEE8" stroke="#1E5248" stroke-width="2"/>
        <text x="80" y="74" font-size="11" font-weight="700" text-anchor="middle" fill="#1E5248">πr²h</text>
        <text x="80" y="132" font-size="10.5" text-anchor="middle" fill="#181B20">${fmt(cyl.vol,0)} cm³</text>
        <text x="150" y="76" font-size="13" font-weight="700" fill="#181B20">= 3 ×</text>
        <polygon points="236,28 196,112 276,112" fill="#F8E7E9" stroke="#6E2933" stroke-width="2"/>
        <text x="236" y="88" font-size="10.5" font-weight="700" text-anchor="middle" fill="#6E2933">⅓πr²h</text>
        <text x="236" y="132" font-size="10.5" text-anchor="middle" fill="#181B20">${fmt(cn.vol,0)} cm³</text>
      </svg>`;
      metrics.replaceChildren();
      makeMetrics(metrics,[
        [ta?'பயன்படும் ஆரம்':'Effective r',`${rs} cm`],
        [ta?'உருளை கன அளவு':'Cylinder V',`${fmt(cyl.vol,1)} cm³`],
        [ta?'கூம்பு கன அளவு':'Cone V',`${fmt(cn.vol,1)} cm³`]
      ]);
      readout.innerHTML=tex(`\\begin{aligned}V_{\\text{cyl}}&=${fmt(cyl.vol,1)}\\text{ cm}^3\\\\&=3\\times ${fmt(cn.vol,1)}\\text{ cm}^3\\end{aligned}`,true);
    };
    makeSlider(controls,ta?'அடிப்படை ஆரம் r':'Base radius r',3,10,1,r,' cm',v=>{r=v;draw();});
    makeSlider(controls,ta?'உயரம் h':'Height h',6,24,3,h,' cm',v=>{h=v;draw();});
    makeSlider(controls,ta?'ஆரம் பெருக்கி k':'Radius multiplier k',1,3,1,scale,'×',v=>{scale=v;draw();});
    draw();
    return;
  }

  if(id==='volume-sphere'){
    let R=6,r=3;
    const title=el('p','g10ch4-lab-title',ta?'வெளி ஆரம் R மற்றும் உள் ஆரம் r-ஐ மாற்றி கோளம், அரைக்கோளம், ஓட்டின் கன அளவைக் காண்க':'Adjust outer radius R and inner radius r to compare sphere, hemisphere, and hollow shell volumes');
    const svgWrap=el('div'),controls=el('div'),metrics=el('div');
    const readout=el('div','g10ch4-readout g10ch4-formula');
    lab.append(title,svgWrap,controls,metrics,readout);
    const draw=()=>{
      if(r>=R)r=R-1;
      const sp=math.sphere(R),hm=math.hemisphere(R),hl=math.hollowSphere(R,r);
      svgWrap.innerHTML=`<svg class="g10ch4-svg" viewBox="0 0 320 148" role="img" aria-label="${ta?'கோளம் மற்றும் உள்ளீடற்ற கோள கன அளவு':'Sphere and hollow shell volume'}">
        <circle cx="80" cy="70" r="42" fill="#DCEEE8" stroke="#1E5248" stroke-width="2"/>
        <text x="80" y="74" font-size="11" font-weight="700" text-anchor="middle" fill="#1E5248">R=${R}</text>
        <text x="80" y="132" font-size="10" text-anchor="middle" fill="#181B20">${ta?'திண்மக் கோளம்':'Solid sphere'}</text>
        <circle cx="224" cy="70" r="42" fill="#F3EFE8" stroke="#6E2933" stroke-width="2"/>
        <circle cx="224" cy="70" r="${Math.max(10,Math.round(42*(r/R)))}" fill="#FAF9F6" stroke="#1E5248" stroke-width="1.6"/>
        <text x="224" y="132" font-size="10" text-anchor="middle" fill="#6E2933">${ta?'ஓடு':'Shell'} R=${R}, r=${r}</text>
      </svg>`;
      metrics.replaceChildren();
      makeMetrics(metrics,[
        [ta?'கோளம் (4/3πR³)':'Sphere',`${fmt(sp.vol,1)} cm³`],
        [ta?'அரைக்கோளம் (2/3πR³)':'Hemisphere',`${fmt(hm.vol,1)} cm³`],
        [ta?'உள்ளீடற்ற கோளம்':'Hollow sphere',`${fmt(hl.vol,1)} cm³`]
      ]);
      readout.innerHTML=tex(`\\begin{aligned}V_{\\text{shell}}&=\\dfrac{4}{3}\\pi(${R}^3-${r}^3)\\\\&\\approx ${fmt(hl.vol,2)}\\text{ cm}^3\\end{aligned}`,true);
    };
    makeSlider(controls,ta?'வெளி ஆரம் R':'Outer radius R',3,12,1,R,' cm',v=>{R=v;draw();});
    makeSlider(controls,ta?'உள் ஆரம் r':'Inner radius r',1,10,1,r,' cm',v=>{r=v;draw();});
    draw();
    return;
  }

  if(id==='combined-solids'){
    let mode='toy-cyl-hemi',r=6,h=12;
    const title=el('p','g10ch4-lab-title',ta?'இணைந்த திண்ம வகையைத் தேர்ந்தெடுத்து மறைந்த முகப்புகளையும் புறப்பரப்பையும் காண்க':'Choose a combined solid to inspect hidden seams vs exposed surface area and volume');
    const tabs=el('div','g10ch4-tabs');
    const b1=el('button','g10ch4-tab',ta?'பொம்மை (உருளை+அரைக்கோளம்)':'Toy (Cyl+Hemi)');
    const b2=el('button','g10ch4-tab',ta?'கூடாரம் (உருளை+கூம்பு)':'Tent (Cyl+Cone)');
    const b3=el('button','g10ch4-tab',ta?'குழிவு (உருளை−கூம்பு)':'Cavity (Cyl−Cone)');
    [b1,b2,b3].forEach(b=>b.type='button');tabs.append(b1,b2,b3);
    const svgWrap=el('div'),controls=el('div'),metrics=el('div');
    const readout=el('div','g10ch4-readout g10ch4-formula');
    lab.append(title,tabs,svgWrap,controls,metrics,readout);
    const draw=()=>{
      b1.classList.toggle('is-active',mode==='toy-cyl-hemi');
      b2.classList.toggle('is-active',mode==='tent-cyl-cone');
      b3.classList.toggle('is-active',mode==='cavity-cyl-cone');
      const res=math.combinedSolid(mode,r,h);
      const fig=mode==='toy-cyl-hemi'
        ?`<path d="M120,62 A40,40 0 0,1 200,62" fill="#F8E7E9" stroke="#6E2933" stroke-width="2"/>
          <rect x="120" y="62" width="80" height="62" fill="#DCEEE8" stroke="#1E5248" stroke-width="2"/>
          <line x1="120" y1="62" x2="200" y2="62" stroke="#6E2933" stroke-dasharray="4 3" stroke-width="1.6"/>
          <text x="160" y="54" font-size="10" text-anchor="middle" fill="#6E2933">${ta?'மறைந்த இணைப்பு':'Hidden seam'}</text>`
        :mode==='tent-cyl-cone'
          ?`<polygon points="160,18 112,68 208,68" fill="#F8E7E9" stroke="#6E2933" stroke-width="2"/>
            <rect x="112" y="68" width="96" height="56" fill="#DCEEE8" stroke="#1E5248" stroke-width="2"/>
            <line x1="112" y1="68" x2="208" y2="68" stroke="#6E2933" stroke-dasharray="4 3" stroke-width="1.6"/>
            <text x="160" y="60" font-size="10" text-anchor="middle" fill="#6E2933">${ta?'மறைந்த இணைப்பு':'Hidden seam'}</text>`
          :`<rect x="120" y="30" width="80" height="94" fill="#DCEEE8" stroke="#1E5248" stroke-width="2"/>
            <polygon points="120,30 200,30 160,124" fill="#FAF9F6" stroke="#6E2933" stroke-width="1.8" stroke-dasharray="4 3"/>
            <text x="160" y="68" font-size="10" text-anchor="middle" fill="#6E2933">${ta?'உள் கூம்புச் சுவர்':'Exposed inner cone'}</text>`;
      svgWrap.innerHTML=`<svg class="g10ch4-svg" viewBox="0 0 320 148" role="img" aria-label="${ta?'இணைந்த திண்மம்':'Combined solid'}">${fig}</svg>`;
      metrics.replaceChildren();
      makeMetrics(metrics,[
        [ta?'புலப்படும் புறப்பரப்பு':'Exposed T.S.A.',`${fmt(res.tsa,1)} cm²`],
        [ta?'கன அளவு':'Volume',`${fmt(res.vol,1)} cm³`]
      ]);
      readout.innerHTML=mode==='toy-cyl-hemi'
        ?tex(`\\begin{aligned}\\text{TSA}&=2\\pi rh+3\\pi r^2\\approx ${fmt(res.tsa,1)}\\\\V&=\\pi r^2h+\\tfrac{2}{3}\\pi r^3\\approx ${fmt(res.vol,1)}\\end{aligned}`,true)
        :mode==='tent-cyl-cone'
          ?tex(`\\begin{aligned}\\text{CSA}&=2\\pi rh+\\pi rl\\approx ${fmt(res.tsa,1)}\\\\V&=\\pi r^2h+\\tfrac{1}{3}\\pi r^2h_c\\approx ${fmt(res.vol,1)}\\end{aligned}`,true)
          :tex(`\\begin{aligned}\\text{TSA}&=\\pi r(2h+l+r)\\approx ${fmt(res.tsa,1)}\\\\V&=\\tfrac{2}{3}\\pi r^2h\\approx ${fmt(res.vol,1)}\\end{aligned}`,true);
    };
    b1.onclick=()=>{mode='toy-cyl-hemi';draw();};
    b2.onclick=()=>{mode='tent-cyl-cone';draw();};
    b3.onclick=()=>{mode='cavity-cyl-cone';draw();};
    makeSlider(controls,ta?'ஆரம் r':'Radius r',3,10,1,r,' cm',v=>{r=v;draw();});
    makeSlider(controls,ta?'உருளை உயரம் h':'Cylinder height h',6,20,1,h,' cm',v=>{h=v;draw();});
    draw();
    return;
  }

  /* volume-conservation */
  let viewMode='cubes',R=12,rCyl=8;
  const title=el('p','g10ch4-lab-title',ta?'12 கனச்சதுர அடுக்குகள் மற்றும் கோள-உருளை உருமாற்றத்தில் கன அளவு மாறாதிருப்பதைச் சோதிக்கவும்':'Verify volume conservation across 12 unit cubes and sphere-to-cylinder recasting');
  const tabs=el('div','g10ch4-tabs');
  const b1=el('button','g10ch4-tab',ta?'12 கனச்சதுர அடுக்குகள்':'12 Unit Cubes');
  const b2=el('button','g10ch4-tab',ta?'கோளம் → உருளை':'Sphere → Cylinder');
  [b1,b2].forEach(b=>b.type='button');tabs.append(b1,b2);
  const svgWrap=el('div'),controls=el('div'),metrics=el('div');
  const readout=el('div','g10ch4-readout g10ch4-formula');
  lab.append(title,tabs,svgWrap,controls,metrics,readout);
  const draw=()=>{
    b1.classList.toggle('is-active',viewMode==='cubes');
    b2.classList.toggle('is-active',viewMode==='recast');
    controls.style.display=viewMode==='recast'?'':'none';
    if(viewMode==='cubes'){
      svgWrap.innerHTML=`<svg class="g10ch4-svg" viewBox="0 0 320 144" role="img" aria-label="${ta?'12 கனச்சதுரங்கள்':'12 unit cubes'}">
        <rect x="28" y="20" width="88" height="66" fill="#DCEEE8" stroke="#1E5248" stroke-width="2"/>
        <line x1="50" y1="20" x2="50" y2="86" stroke="#1E5248"/><line x1="72" y1="20" x2="72" y2="86" stroke="#1E5248"/><line x1="94" y1="20" x2="94" y2="86" stroke="#1E5248"/>
        <line x1="28" y1="42" x2="116" y2="42" stroke="#1E5248"/><line x1="28" y1="64" x2="116" y2="64" stroke="#1E5248"/>
        <text x="72" y="108" font-size="11" font-weight="700" text-anchor="middle" fill="#1E5248">4 × 3 × 1 = 12 cm³</text>
        <text x="142" y="60" font-size="16" font-weight="700" fill="#181B20">=</text>
        <rect x="166" y="42" width="132" height="44" fill="#F3EFE8" stroke="#6E2933" stroke-width="2"/>
        <line x1="188" y1="42" x2="188" y2="86" stroke="#6E2933"/><line x1="210" y1="42" x2="210" y2="86" stroke="#6E2933"/><line x1="232" y1="42" x2="232" y2="86" stroke="#6E2933"/><line x1="254" y1="42" x2="254" y2="86" stroke="#6E2933"/><line x1="276" y1="42" x2="276" y2="86" stroke="#6E2933"/>
        <line x1="166" y1="64" x2="298" y2="64" stroke="#6E2933"/>
        <text x="232" y="108" font-size="11" font-weight="700" text-anchor="middle" fill="#6E2933">6 × 2 × 1 = 12 cm³</text>
      </svg>`;
      metrics.replaceChildren();
      makeMetrics(metrics,[
        [ta?'அடுக்கு 1':'Stack 1','4 × 3 × 1 = 12 cm³'],
        [ta?'அடுக்கு 2':'Stack 2','6 × 2 × 1 = 12 cm³']
      ]);
      readout.innerHTML=tex('V_{\\text{before}}=12\\text{ cm}^3=V_{\\text{after}}',true);
    }else{
      const res=math.recastSphereToCylinder(R,rCyl);
      svgWrap.innerHTML=`<svg class="g10ch4-svg" viewBox="0 0 320 144" role="img" aria-label="${ta?'கோளம் உருளையாக உருமாற்றம்':'Sphere recast into cylinder'}">
        <circle cx="80" cy="64" r="36" fill="#DCEEE8" stroke="#1E5248" stroke-width="2"/>
        <text x="80" y="68" font-size="11" font-weight="700" text-anchor="middle" fill="#1E5248">R=${R}</text>
        <text x="150" y="68" font-size="16" font-weight="700" fill="#181B20">→</text>
        <rect x="194" y="22" width="56" height="86" fill="#F3EFE8" stroke="#6E2933" stroke-width="2"/>
        <text x="222" y="60" font-size="11" font-weight="700" text-anchor="middle" fill="#6E2933">r=${rCyl}</text>
        <text x="222" y="78" font-size="11" font-weight="700" text-anchor="middle" fill="#6E2933">H=${fmt(res.H,2)}</text>
      </svg>`;
      metrics.replaceChildren();
      makeMetrics(metrics,[
        [ta?'கோள ஆரம் R':'Sphere R',`${R} cm`],
        [ta?'உருளை ஆரம் r':'Cylinder r',`${rCyl} cm`],
        [ta?'உருளை உயரம் H':'Cylinder H',`${fmt(res.H,2)} cm`]
      ]);
      readout.innerHTML=tex(`\\dfrac{4}{3}\\pi(${R}^3)=\\pi(${rCyl}^2)H\\implies H=${fmt(res.H,2)}\\text{ cm}`,true);
    }
  };
  b1.onclick=()=>{viewMode='cubes';draw();};
  b2.onclick=()=>{viewMode='recast';draw();};
  makeSlider(controls,ta?'கோள ஆரம் R':'Sphere radius R',3,15,1,R,' cm',v=>{R=v;draw();});
  makeSlider(controls,ta?'உருளை ஆரம் r':'Cylinder radius r',2,12,1,rCyl,' cm',v=>{rCyl=v;draw();});
  draw();
}

window.TriggleG10Ch7Labs={renderGlance,mount,math};
})();
