/* VER Triggle | Grade 10 Chapter 5 Coordinate Geometry — Interactive Concept Studio Labs.
 * Self-contained, offline, bilingual (EN + TA draft), zero external assets or tracking.
 * Interactive Cartesian coordinate planes with smooth pointer dragging, snap-to-grid precision, and keyboard controls. */
(()=>{'use strict';
  const SVG_NS='http://www.w3.org/2000/svg';
  const e=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const el=(tag,cls,txt)=>{const n=document.createElement(tag);if(cls)n.className=cls;if(txt!=null)n.textContent=txt;return n;};
  const svgEl=(tag,attrs={},txt)=>{
    const n=document.createElementNS(SVG_NS,tag);
    for(const [k,v] of Object.entries(attrs))n.setAttribute(k,String(v));
    if(txt!=null)n.textContent=txt;
    return n;
  };
  const fmt=(v,d=2)=>Number.isFinite(v)?(Math.abs(v)<1e-9?'0':Number(v.toFixed(d)).toString()):'—';
  const sgnNum=(v,d=2)=>{
    if(!Number.isFinite(v))return '—';
    const n=Math.abs(v)<1e-9?0:Number(v.toFixed(d));
    return n<0?`-${Math.abs(n)}`:`${n}`;
  };
  const gcd=(a,b)=>{a=Math.abs(Math.round(a));b=Math.abs(Math.round(b));while(b){const t=a%b;a=b;b=t;}return a||1;};
  const fracTex=(num,den)=>{
    if(!Number.isFinite(num)||!Number.isFinite(den)||den===0)return '\\text{undef}';
    if(num===0)return '0';
    const sign=(num<0)!==(den<0)?'-':'';
    const g=gcd(num,den),n=Math.abs(Math.round(num))/g,d=Math.abs(Math.round(den))/g;
    return d===1?`${sign}${n}`:`${sign}\\dfrac{${n}}{${d}}`;
  };
  const term=(coef,sym,first=false)=>{
    const n=Number(coef.toFixed(2));
    if(Math.abs(n)<1e-9)return '';
    const abs=Math.abs(n);
    const mag=sym?(abs===1?'':fmt(abs)):fmt(abs);
    if(first)return (n<0?'-':'')+mag+sym;
    return (n<0?' - ':' + ')+mag+sym;
  };

  /* Pure mathematical helpers exposed for independent verification */
  const math={
    distance:(a,b)=>Math.hypot(b[0]-a[0],b[1]-a[1]),
    midpoint:(a,b)=>[(a[0]+b[0])/2,(a[1]+b[1])/2],
    sectionPoint:(a,b,m,n)=>{
      const den=m+n;
      if(Math.abs(den)<1e-9)return null;
      return [(m*b[0]+n*a[0])/den,(m*b[1]+n*a[1])/den];
    },
    centroid:(a,b,c)=>[(a[0]+b[0]+c[0])/3,(a[1]+b[1]+c[1])/3],
    triangleArea:(a,b,c)=>{
      const signed=0.5*(a[0]*(b[1]-c[1])+b[0]*(c[1]-a[1])+c[0]*(a[1]-b[1]));
      return {signed,area:Math.abs(signed),isCCW:signed>1e-9,collinear:Math.abs(signed)<1e-6};
    },
    quadSegmentsCross:(a,b,c,d)=>{
      const cross=(p,q,r)=>(q[0]-p[0])*(r[1]-p[1])-(q[1]-p[1])*(r[0]-p[0]);
      const segHit=(p1,p2,p3,p4)=>{
        const d1=cross(p3,p4,p1),d2=cross(p3,p4,p2),d3=cross(p1,p2,p3),d4=cross(p1,p2,p4);
        return ((d1>1e-9&&d2<-1e-9)||(d1<-1e-9&&d2>1e-9))&&((d3>1e-9&&d4<-1e-9)||(d3<-1e-9&&d4>1e-9));
      };
      return segHit(a,b,c,d)||segHit(b,c,d,a);
    },
    quadArea:(a,b,c,d)=>{
      const down=a[0]*b[1]+b[0]*c[1]+c[0]*d[1]+d[0]*a[1];
      const up=b[0]*a[1]+c[0]*b[1]+d[0]*c[1]+a[0]*d[1];
      const signed=0.5*(down-up);
      return {
        signed,area:Math.abs(signed),isCCW:signed>1e-9,
        selfIntersecting:math.quadSegmentsCross(a,b,c,d)
      };
    },
    slopeBetween:(a,b)=>{
      const dx=b[0]-a[0],dy=b[1]-a[1];
      if(Math.abs(dx)<1e-9)return {defined:false,m:Infinity,dx:0,dy,angleDeg:90};
      const m=dy/dx;
      let deg=Math.atan2(dy,dx)*180/Math.PI;
      if(deg<0)deg+=180;
      if(Math.abs(deg-180)<1e-7)deg=0;
      return {defined:true,m,dx,dy,angleDeg:deg};
    },
    relationSlopes:(m1,m2)=>{
      const v1=!Number.isFinite(m1),v2=!Number.isFinite(m2);
      if(v1&&v2)return 'parallel';
      if((v1&&Math.abs(m2)<1e-9)||(v2&&Math.abs(m1)<1e-9))return 'perpendicular';
      if(v1||v2)return 'neither';
      if(Math.abs(m1-m2)<1e-6)return 'parallel';
      if(Math.abs(m1*m2+1)<1e-6)return 'perpendicular';
      return 'neither';
    },
    lineFromGeneral:(a,b,c)=>{
      if(Math.abs(a)<1e-9&&Math.abs(b)<1e-9)return {valid:false,vertical:false,horizontal:false,m:null,xInt:null,yInt:null};
      if(Math.abs(b)<1e-9)return {valid:true,vertical:true,horizontal:false,m:null,xInt:-c/a,yInt:null};
      const m=-a/b,yInt=-c/b,xInt=Math.abs(a)<1e-9?null:-c/a;
      return {valid:true,vertical:false,horizontal:Math.abs(a)<1e-9,m,xInt,yInt};
    },
    generalRelation:(a1,b1,c1,a2,b2,c2)=>{
      const det=a1*b2-a2*b1,dot=a1*a2+b1*b2;
      if(Math.abs(det)<1e-8){
        const sameC=Math.abs(a1*c2-a2*c1)<1e-8&&Math.abs(b1*c2-b2*c1)<1e-8;
        return {kind:sameC?'coincident':'parallel',det,dot};
      }
      if(Math.abs(dot)<1e-8)return {kind:'perpendicular',det,dot};
      return {kind:'intersecting',det,dot};
    }
  };

  function tex(node,latex,fallback,displayMode=true){
    if(!node)return;
    node.innerHTML=typeof window.TriggleNotation?.renderLatex==='function'
      ?window.TriggleNotation.renderLatex(latex,{displayMode,fallback})
      :e(fallback);
    window.TriggleNotation?.prepare?.(node);
  }

  function makeTabs(items,activeIdx,onSelect,ariaLabel){
    const bar=el('div','g10ch4-tabs');bar.setAttribute('role','group');bar.setAttribute('aria-label',ariaLabel);
    const buttons=items.map((label,i)=>{
      const b=el('button','g10ch4-tab',label);b.type='button';
      b.setAttribute('aria-pressed',String(i===activeIdx));
      b.addEventListener('click',()=>onSelect(i));
      bar.append(b);return b;
    });
    const sync=idx=>buttons.forEach((b,i)=>b.setAttribute('aria-pressed',String(i===idx)));
    return {bar,sync};
  }

  function makeChips(items,onPick,ariaLabel){
    const bar=el('div','g10ch4-chips');bar.setAttribute('role','group');bar.setAttribute('aria-label',ariaLabel);
    items.forEach(item=>{
      const b=el('button','g10ch4-chip-btn',item.label);b.type='button';
      b.addEventListener('click',item.action);
      bar.append(b);
    });
    return bar;
  }

  function makeSlider(labelText,min,max,step,val,onInput){
    const row=el('div','g10ch4-slider-row');
    const id='g10ch5-s-'+Math.random().toString(36).slice(2,8);
    const top=el('div','g10ch4-slider-top');
    const label=el('label','g10ch4-slider-label',labelText);label.htmlFor=id;
    const valSpan=el('span','g10ch4-slider-val',String(val));
    top.append(label,valSpan);
    const input=document.createElement('input');
    input.type='range';input.id=id;input.className='g10ch4-slider';
    input.min=String(min);input.max=String(max);input.step=String(step);input.value=String(val);
    input.addEventListener('input',()=>{
      const num=Number(input.value);
      valSpan.textContent=String(num);
      onInput(num);
    });
    row.append(top,input);
    return {row,input,setVal:(v,txt)=>{input.value=String(v);valSpan.textContent=txt!=null?String(txt):String(v);}};
  }

  function makePlane(W=320,H=208,xMin=-6,xMax=6,yMin=-4,yMax=4){
    const availableWidth=W-38,availableHeight=H-30;
    const unit=Math.min(availableWidth/(xMax-xMin),availableHeight/(yMax-yMin));
    const pw=(xMax-xMin)*unit,ph=(yMax-yMin)*unit;
    const padL=24+(availableWidth-pw)/2,padT=12+(availableHeight-ph)/2;
    const sx=x=>padL+((x-xMin)/(xMax-xMin))*pw;
    const sy=y=>padT+((yMax-y)/(yMax-yMin))*ph;
    const mx=px=>xMin+((px-padL)/pw)*(xMax-xMin);
    const my=py=>yMax-((py-padT)/ph)*(yMax-yMin);
    const clampSnap=(x,y,step=1)=>[
      Math.max(xMin,Math.min(xMax,Math.round(x/step)*step)),
      Math.max(yMin,Math.min(yMax,Math.round(y/step)*step))
    ];
    function drawGrid(g){
      g.append(svgEl('rect',{x:padL,y:padT,width:pw,height:ph,rx:6,fill:'#FDFCF9',stroke:'#E4DFD4','stroke-width':1}));
      for(let x=Math.ceil(xMin);x<=Math.floor(xMax);x++){
        const px=sx(x),zero=x===0;
        g.append(svgEl('line',{x1:px,y1:padT,x2:px,y2:padT+ph,'data-dg-grid-axis':'x',stroke:zero?'#6E7781':'#ECE7DD','stroke-width':zero?1.35:0.85}));
        if(!zero&&x%2===0){
          g.append(svgEl('text',{x:px,y:sy(0)+11,'text-anchor':'middle',fill:'#6E7781','font-size':8.5,'font-weight':600},String(x)));
        }
      }
      for(let y=Math.ceil(yMin);y<=Math.floor(yMax);y++){
        const py=sy(y),zero=y===0;
        g.append(svgEl('line',{x1:padL,y1:py,x2:padL+pw,y2:py,'data-dg-grid-axis':'y',stroke:zero?'#6E7781':'#ECE7DD','stroke-width':zero?1.35:0.85}));
        if(!zero&&y%2===0){
          g.append(svgEl('text',{x:sx(0)-5,y:py+3,'text-anchor':'end',fill:'#6E7781','font-size':8.5,'font-weight':600},String(y)));
        }
      }
      g.append(svgEl('text',{x:padL+pw+5,y:sy(0)+3,fill:'#525B62','font-size':9,'font-weight':700},'X'));
      g.append(svgEl('text',{x:sx(0)+6,y:padT+2,fill:'#525B62','font-size':9,'font-weight':700},'Y'));
      g.append(svgEl('text',{x:sx(0)-4,y:sy(0)+10,'text-anchor':'end',fill:'#525B62','font-size':8.5,'font-weight':700},'O'));
    }
    function clipLine(a,b,c){
      if(Math.abs(a)<1e-9&&Math.abs(b)<1e-9)return null;
      const pts=[];
      const add=(x,y)=>{
        if(x>=xMin-1e-6&&x<=xMax+1e-6&&y>=yMin-1e-6&&y<=yMax+1e-6){
          if(!pts.some(p=>Math.hypot(p[0]-x,p[1]-y)<1e-4))pts.push([x,y]);
        }
      };
      if(Math.abs(b)>1e-9){add(xMin,(-a*xMin-c)/b);add(xMax,(-a*xMax-c)/b);}
      if(Math.abs(a)>1e-9){add((-b*yMin-c)/a,yMin);add((-b*yMax-c)/a,yMax);}
      return pts.length>=2?[pts[0],pts[1]]:null;
    }
    return {W,H,xMin,xMax,yMin,yMax,sx,sy,mx,my,clampSnap,drawGrid,clipLine};
  }

  function svgPoint(svg,evt){
    const matrix=svg.getScreenCTM();
    if(matrix){
      const point=new DOMPoint(evt.clientX,evt.clientY).matrixTransform(matrix.inverse());
      if(Number.isFinite(point.x)&&Number.isFinite(point.y))return [point.x,point.y];
    }
    return [160,104];
  }

  function attachMultiDrag(svg,findActive,onDrag){
    let activeId=null;
    svg.addEventListener('pointerdown',evt=>{
      const target=evt.target.closest('[data-handle]');
      if(target){
        activeId=target.getAttribute('data-handle');
        try{svg.setPointerCapture(evt.pointerId);}catch{}
        evt.preventDefault();
        onDrag(activeId,svgPoint(svg,evt));
      }else if(typeof findActive==='function'){
        const pt=svgPoint(svg,evt);
        const picked=findActive(pt);
        if(picked){
          activeId=picked;
          try{svg.setPointerCapture(evt.pointerId);}catch{}
          evt.preventDefault();
          onDrag(activeId,pt);
        }
      }
    });
    svg.addEventListener('pointermove',evt=>{
      if(!activeId)return;
      evt.preventDefault();
      onDrag(activeId,svgPoint(svg,evt));
    });
    const end=evt=>{
      if(activeId){activeId=null;try{svg.releasePointerCapture(evt.pointerId);}catch{}}
    };
    svg.addEventListener('pointerup',end);
    svg.addEventListener('pointercancel',end);
  }

  function drawHandle(g,x,y,label,color,handleId){
    const wrap=svgEl('g',{'data-drag-handle':'true','data-handle':handleId,style:'cursor:grab'});
    wrap.append(svgEl('circle',{cx:x,cy:y,r:14,fill:'transparent'}));
    wrap.append(svgEl('circle',{cx:x,cy:y,r:6.2,fill:color,stroke:'#FFFFFF','stroke-width':2}));
    const nearRightEdge=x>g.ownerSVGElement.viewBox.baseVal.width-58;
    const nearXAxisTicks=y>=114&&y<=134;
    const labelBelow=y<19||nearXAxisTicks;
    wrap.append(svgEl('text',{x:x+(nearRightEdge?-11:11),y:y+(labelBelow?15:-9),'text-anchor':nearRightEdge?'end':'start',
      fill:color,stroke:'#FDFCF9','stroke-width':3,'stroke-linejoin':'round','paint-order':'stroke',
      'font-size':10.5,'font-weight':800},label));
    g.append(wrap);
  }

  /* 1. Distance, Section, Midpoint & Centroid Lab */
  function labDistanceMidpoint(host,lang){
    const ta=lang==='ta';
    const pl=makePlane(320,206,-6,6,-4,4);
    let mode=0; // 0: midpoint/distance, 1: section 1:2, 2: centroid
    let A=[-4,-1],B=[4,3],C=[0,-3],ratio=1;
    const svg=svgEl('svg',{viewBox:'0 0 320 206',class:'g10ch4-svg',role:'img','aria-label':ta?'தொலைவு, பிரிவு மற்றும் நடுக்கோட்டு மைய வரைபடம்':'Interactive coordinate grid for distance, section point, midpoint and centroid'});
    const gridG=svgEl('g'),sceneG=svgEl('g');pl.drawGrid(gridG);svg.append(gridG,sceneG);

    const tabs=makeTabs(
      ta?['தொலைவு & நடுப்புள்ளி','பிரிவு m:n','நடுக்கோட்டு மையம்']:['Distance & Midpoint','Section m:n','Centroid G'],
      0,idx=>{mode=idx;tabs.sync(idx);ratioRow.row.hidden=(idx!==1);paint();},
      ta?'சூத்திர வகை':'Formula mode'
    );
    const ratioRow=makeSlider(ta?'விகிதம் m (n = 2)': 'Weight m (with n = 2)',1,4,1,ratio,v=>{ratio=v;paint();});
    ratioRow.row.hidden=true;
    const note=el('p','g10ch4-drag-note',ta?'A, B (அல்லது C) புள்ளிகளை இழுத்து ஆயத்தொலைவுகளை மாற்றலாம்.':'Drag points A, B (or C) directly on the coordinate plane.');
    const readout=el('div','g10ch4-readout');
    const chips=makeChips([
      {label:ta?'மீட்டமை A(−4,−1), B(4,3)':'Reset A(−4,−1), B(4,3)',action:()=>{A=[-4,-1];B=[4,3];C=[0,-3];paint();}},
      {label:ta?'3-4-5 செங்கோண கட்டம்':'3-4-5 Right Grid',action:()=>{A=[-2,-2];B=[2,1];C=[2,-2];paint();}}
    ],()=>{},ta?'முன்னமைவுகள்':'Grid presets');
    host.append(tabs.bar,ratioRow.row,svg,note,readout,chips);

    function paint(){
      sceneG.replaceChildren();
      const [ax,ay]=[pl.sx(A[0]),pl.sy(A[1])],[bx,by]=[pl.sx(B[0]),pl.sy(B[1])],[cx,cy]=[pl.sx(C[0]),pl.sy(C[1])];
      if(mode===2){
        sceneG.append(svgEl('polygon',{points:`${ax},${ay} ${bx},${by} ${cx},${cy}`,fill:'rgba(31,94,114,.10)',stroke:'#1F5E72','stroke-width':2}));
        const Mbc=math.midpoint(B,C),G=math.centroid(A,B,C);
        sceneG.append(svgEl('line',{x1:ax,y1:ay,x2:pl.sx(Mbc[0]),y2:pl.sy(Mbc[1]),stroke:'#6E2933','stroke-width':1.5,'stroke-dasharray':'4 3'}));
        sceneG.append(svgEl('circle',{cx:pl.sx(G[0]),cy:pl.sy(G[1]),r:5,fill:'#6E2933',stroke:'#FFFFFF','stroke-width':1.5}));
        sceneG.append(svgEl('text',{x:pl.sx(G[0])+8,y:pl.sy(G[1])+4,fill:'#6E2933','font-size':10.5,'font-weight':800},`G(${fmt(G[0],1)},${fmt(G[1],1)})`));
        drawHandle(sceneG,ax,ay,`A(${A[0]},${A[1]})`,'#1F5E72','A');
        drawHandle(sceneG,bx,by,`B(${B[0]},${B[1]})`,'#1F5E72','B');
        drawHandle(sceneG,cx,cy,`C(${C[0]},${C[1]})`,'#3F5D3A','C');
        tex(readout,`\\begin{aligned}G&=\\left(\\dfrac{${A[0]}+${B[0]}+${C[0]}}{3},\\;\\dfrac{${A[1]}+${B[1]}+${C[1]}}{3}\\right)\\\\&=(${fmt(G[0],2)},\\;${fmt(G[1],2)})\\end{aligned}`,`G = (${fmt(G[0])}, ${fmt(G[1])})`);
      }else if(mode===1){
        const P=math.sectionPoint(A,B,ratio,2);
        sceneG.append(svgEl('line',{x1:ax,y1:ay,x2:bx,y2:by,stroke:'#1F5E72','stroke-width':2.5}));
        sceneG.append(svgEl('circle',{cx:pl.sx(P[0]),cy:pl.sy(P[1]),r:5.2,fill:'#6E2933',stroke:'#FFFFFF','stroke-width':1.6}));
        sceneG.append(svgEl('text',{x:pl.sx(P[0])+7,y:pl.sy(P[1])+12,fill:'#6E2933','font-size':10,'font-weight':800},`P (${ratio}:2)`));
        drawHandle(sceneG,ax,ay,`A(${A[0]},${A[1]})`,'#1F5E72','A');
        drawHandle(sceneG,bx,by,`B(${B[0]},${B[1]})`,'#1F5E72','B');
        tex(readout,`\\begin{aligned}\\text{Ratio }${ratio}:2\\;\\implies\\;P&=\\left(\\dfrac{${ratio}(${B[0]})+2(${A[0]})}{${ratio+2}},\\;\\dfrac{${ratio}(${B[1]})+2(${A[1]})}{${ratio+2}}\\right)\\\\&=(${fmt(P[0],2)},\\;${fmt(P[1],2)})\\end{aligned}`,`P = (${fmt(P[0])}, ${fmt(P[1])})`);
      }else{
        const dx=B[0]-A[0],dy=B[1]-A[1],d=math.distance(A,B),M=math.midpoint(A,B);
        sceneG.append(svgEl('line',{x1:ax,y1:ay,x2:bx,y2:ay,stroke:'#525B62','stroke-width':1.4,'stroke-dasharray':'3 3'}));
        sceneG.append(svgEl('line',{x1:bx,y1:ay,x2:bx,y2:by,stroke:'#525B62','stroke-width':1.4,'stroke-dasharray':'3 3'}));
        sceneG.append(svgEl('line',{x1:ax,y1:ay,x2:bx,y2:by,stroke:'#1F5E72','stroke-width':2.5}));
        sceneG.append(svgEl('circle',{cx:pl.sx(M[0]),cy:pl.sy(M[1]),r:4.8,fill:'#6E2933',stroke:'#FFFFFF','stroke-width':1.5}));
        sceneG.append(svgEl('text',{x:pl.sx(M[0])+7,y:pl.sy(M[1])+11,fill:'#6E2933','font-size':10,'font-weight':800},`M(${fmt(M[0],1)},${fmt(M[1],1)})`));
        drawHandle(sceneG,ax,ay,`A(${A[0]},${A[1]})`,'#1F5E72','A');
        drawHandle(sceneG,bx,by,`B(${B[0]},${B[1]})`,'#1F5E72','B');
        tex(readout,`\\begin{aligned}AB&=\\sqrt{(${dx})^2+(${dy})^2}=\\sqrt{${dx*dx+dy*dy}}\\approx ${fmt(d,2)}\\\\M&=\\left(${fmt(M[0],1)},\\;${fmt(M[1],1)}\\right)\\end{aligned}`,`AB = ${fmt(d)}, M = (${fmt(M[0],1)}, ${fmt(M[1],1)})`);
      }
    }

    attachMultiDrag(svg,pt=>{
      const pts=mode===2?{A,B,C}:{A,B};
      let best=null,bestD=28;
      for(const [k,v] of Object.entries(pts)){
        const d=Math.hypot(pt[0]-pl.sx(v[0]),pt[1]-pl.sy(v[1]));
        if(d<bestD){bestD=d;best=k;}
      }
      return best;
    },(id,pt)=>{
      const g=pl.clampSnap(pl.mx(pt[0]),pl.my(pt[1]),1);
      if(id==='A')A=g; else if(id==='B')B=g; else if(id==='C')C=g;
      paint();
    });
    paint();
  }

  /* 2. Area of a Triangle Lab */
  function labAreaTriangle(host,lang){
    const ta=lang==='ta';
    const pl=makePlane(320,206,-5,5,-3,5);
    let A=[0,4],B=[-3,1],C=[4,2],showTrap=true;
    const svg=svgEl('svg',{viewBox:'0 0 320 206',class:'g10ch4-svg',role:'img','aria-label':ta?'முக்கோணத்தின் பரப்பு மற்றும் சரிவக அமைப்பு':'Interactive triangle area grid showing trapeziums under vertices'});
    const gridG=svgEl('g'),sceneG=svgEl('g');pl.drawGrid(gridG);svg.append(gridG,sceneG);

    const tabs=makeTabs(
      ta?['சரிவகங்களைக் காட்டு','முக்கோணம் மட்டும்']:['Show trapeziums','Triangle only'],
      0,idx=>{showTrap=(idx===0);tabs.sync(idx);paint();},
      ta?'காட்சி முறை':'Area view'
    );
    const note=el('p','g10ch4-drag-note',ta?'A, B, C உச்சிகளை இழுத்து இடஞ்சுழி/வலஞ்சுழி வரிசை மற்றும் பரப்பைச் சோதிக்கவும்.':'Drag vertices A, B, or C to see the signed determinant and positive area.');
    const readout=el('div','g10ch4-readout');
    const chips=makeChips([
      {label:ta?'இடஞ்சுழி (CCW)':'CCW order',action:()=>{A=[0,4];B=[-3,1];C=[4,2];paint();}},
      {label:ta?'வரிசை மாற்று (CW)':'Swap B & C (CW)',action:()=>{const t=B;B=C;C=t;paint();}}
    ],()=>{},ta?'வரிசை சோதனை':'Order presets');
    host.append(tabs.bar,svg,note,readout,chips);

    function paint(){
      sceneG.replaceChildren();
      const [ax,ay]=[pl.sx(A[0]),pl.sy(A[1])],[bx,by]=[pl.sx(B[0]),pl.sy(B[1])],[cx,cy]=[pl.sx(C[0]),pl.sy(C[1])];
      const y0=pl.sy(0);
      if(showTrap){
        sceneG.append(svgEl('polygon',{points:`${bx},${y0} ${bx},${by} ${ax},${ay} ${ax},${y0}`,fill:'rgba(31,94,114,.10)',stroke:'#1F5E72','stroke-width':1,'stroke-dasharray':'3 2'}));
        sceneG.append(svgEl('polygon',{points:`${ax},${y0} ${ax},${ay} ${cx},${cy} ${cx},${y0}`,fill:'rgba(63,93,58,.12)',stroke:'#3F5D3A','stroke-width':1,'stroke-dasharray':'3 2'}));
      }
      const res=math.triangleArea(A,B,C);
      sceneG.append(svgEl('polygon',{points:`${ax},${ay} ${bx},${by} ${cx},${cy}`,fill:res.collinear?'rgba(170,52,41,.22)':'rgba(110,41,51,.18)',stroke:'#6E2933','stroke-width':2}));
      drawHandle(sceneG,ax,ay,`A(${A[0]},${A[1]})`,'#6E2933','A');
      drawHandle(sceneG,bx,by,`B(${B[0]},${B[1]})`,'#1F5E72','B');
      drawHandle(sceneG,cx,cy,`C(${C[0]},${C[1]})`,'#3F5D3A','C');
      const ord=res.isCCW?'CCW (+)':(res.collinear?'Collinear (0)':'CW (-)');
      const ordFallback=res.isCCW?(ta?'இடஞ்சுழி (+)':'CCW (+)'):(res.collinear?(ta?'நேர்க்கோடு (0)':'Collinear (0)'):(ta?'வலஞ்சுழி (−)':'CW (−)'));
      tex(readout,`\\begin{aligned}\\text{Signed }\\Delta&=${fmt(res.signed,2)}\\;(\\text{${ord}})\\\\\\text{Area}&=|\\Delta|=${fmt(res.area,2)}\\text{ sq. units}\\end{aligned}`,`Signed Δ = ${fmt(res.signed)} (${ordFallback}), Area = ${fmt(res.area)} sq. units`);
    }

    attachMultiDrag(svg,pt=>{
      let best=null,bestD=28;
      for(const [k,v] of Object.entries({A,B,C})){
        const d=Math.hypot(pt[0]-pl.sx(v[0]),pt[1]-pl.sy(v[1]));
        if(d<bestD){bestD=d;best=k;}
      }
      return best;
    },(id,pt)=>{
      const g=pl.clampSnap(pl.mx(pt[0]),pl.my(pt[1]),1);
      if(id==='A')A=g; else if(id==='B')B=g; else C=g;
      paint();
    });
    paint();
  }

  /* 3. Collinearity Lab */
  function labCollinearity(host,lang){
    const ta=lang==='ta';
    const pl=makePlane(320,206,-5,5,-4,4);
    let A=[-4,-2],C=[4,2],B=[0,2];
    const svg=svgEl('svg',{viewBox:'0 0 320 206',class:'g10ch4-svg',role:'img','aria-label':ta?'ஒரு கோடமைந்த புள்ளிகள் சோதனை வரைபடம்':'Interactive collinearity test showing triangle collapsing to zero area'});
    const gridG=svgEl('g'),sceneG=svgEl('g');pl.drawGrid(gridG);svg.append(gridG,sceneG);
    const note=el('p','g10ch4-drag-note',ta?'புள்ளி B-ஐ நகர்த்தி AC கோட்டின் மீது கொண்டுவரும்போது பரப்பளவு 0 ஆவதைப் பாருங்கள்.':'Drag point B onto dashed line AC and watch Area(△ABC) collapse to 0.');
    const readout=el('div','g10ch4-readout');
    const chips=makeChips([
      {label:ta?'AC கோட்டில் வை (0,0)':'Snap B to line AC (0,0)',action:()=>{A=[-4,-2];C=[4,2];B=[0,0];paint();}},
      {label:ta?'தொலைவு சமம் ≠ நேர்க்கோடு':'Isosceles (Area ≠ 0)',action:()=>{A=[-3,0];C=[3,0];B=[0,3];paint();}}
    ],()=>{},ta?'சோதனைகள்':'Test cases');
    host.append(svg,note,readout,chips);

    function paint(){
      sceneG.replaceChildren();
      const [ax,ay]=[pl.sx(A[0]),pl.sy(A[1])],[bx,by]=[pl.sx(B[0]),pl.sy(B[1])],[cx,cy]=[pl.sx(C[0]),pl.sy(C[1])];
      const res=math.triangleArea(A,B,C),sAB=math.slopeBetween(A,B),sBC=math.slopeBetween(B,C);
      sceneG.append(svgEl('line',{x1:ax,y1:ay,x2:cx,y2:cy,stroke:'#1F5E72','stroke-width':1.5,'stroke-dasharray':'5 3'}));
      sceneG.append(svgEl('polygon',{points:`${ax},${ay} ${bx},${by} ${cx},${cy}`,fill:res.collinear?'rgba(63,93,58,.22)':'rgba(170,52,41,.16)',stroke:res.collinear?'#3F5D3A':'#AA3429','stroke-width':2}));
      drawHandle(sceneG,ax,ay,`A(${A[0]},${A[1]})`,'#1F5E72','A');
      drawHandle(sceneG,bx,by,`B(${B[0]},${B[1]})`,res.collinear?'#3F5D3A':'#6E2933','B');
      drawHandle(sceneG,cx,cy,`C(${C[0]},${C[1]})`,'#1F5E72','C');
      const m1=sAB.defined?fmt(sAB.m,2):'\\text{undef}',m2=sBC.defined?fmt(sBC.m,2):'\\text{undef}';
      const tag=res.collinear?(ta?'ஒரே நேர்க்கோடு!':'Collinear!'):(ta?'நேர்க்கோடு அல்ல':'Not collinear');
      tex(readout,`\\begin{aligned}\\operatorname{Area}(\\triangle ABC)&=${fmt(res.area,2)}\\;(\\text{${tag}})\\\\m_{AB}&=${m1},\\quad m_{BC}=${m2}\\end{aligned}`,`Area = ${fmt(res.area)}, m(AB)=${m1}, m(BC)=${m2}`);
    }
    attachMultiDrag(svg,pt=>{
      let best=null,bestD=28;
      for(const [k,v] of Object.entries({A,B,C})){
        const d=Math.hypot(pt[0]-pl.sx(v[0]),pt[1]-pl.sy(v[1]));
        if(d<bestD){bestD=d;best=k;}
      }
      return best;
    },(id,pt)=>{
      const g=pl.clampSnap(pl.mx(pt[0]),pl.my(pt[1]),1);
      if(id==='A')A=g; else if(id==='B')B=g; else C=g;
      paint();
    });
    paint();
  }

  /* 4. Area of a Quadrilateral Lab */
  function labAreaQuad(host,lang){
    const ta=lang==='ta';
    const pl=makePlane(320,206,-5,5,-4,4);
    let A=[-3,-2],B=[3,-2],C=[2,3],D=[-2,2];
    const svg=svgEl('svg',{viewBox:'0 0 320 206',class:'g10ch4-svg',role:'img','aria-label':ta?'நாற்கரத்தின் பரப்பு மற்றும் வரிசை வரைபடம்':'Interactive quadrilateral shoelace area lab'});
    const gridG=svgEl('g'),sceneG=svgEl('g');pl.drawGrid(gridG);svg.append(gridG,sceneG);

    const tabs=makeTabs(
      ta?['சரியான இடஞ்சுழி வரிசை','C & D இடம் மாற்று (தவறு)']:['Valid CCW boundary','Swap C & D (crossed!)'],
      0,idx=>{
        if(idx===0){A=[-3,-2];B=[3,-2];C=[2,3];D=[-2,2];}
        else{A=[-3,-2];B=[3,-2];C=[-2,2];D=[2,3];}
        tabs.sync(idx);paint();
      },
      ta?'முனை வரிசை':'Vertex order'
    );
    const note=el('p','g10ch4-drag-note',ta?'முனைகள் A, B, C, D-ஐ இழுக்கவும்; AC மூலைவிட்டம் இரு முக்கோணங்களாகப் பிரிக்கிறது.':'Drag A, B, C, D; diagonal AC splits the quad into two triangles.');
    const readout=el('div','g10ch4-readout');
    host.append(tabs.bar,svg,note,readout);

    function paint(){
      sceneG.replaceChildren();
      const res=math.quadArea(A,B,C,D);
      const pts=[A,B,C,D].map(p=>`${pl.sx(p[0])},${pl.sy(p[1])}`).join(' ');
      sceneG.append(svgEl('polygon',{points:pts,fill:res.selfIntersecting?'rgba(170,52,41,.22)':'rgba(31,94,114,.15)',stroke:res.selfIntersecting?'#AA3429':'#1F5E72','stroke-width':2}));
      sceneG.append(svgEl('line',{x1:pl.sx(A[0]),y1:pl.sy(A[1]),x2:pl.sx(C[0]),y2:pl.sy(C[1]),stroke:'#6E2933','stroke-width':1.4,'stroke-dasharray':'4 3'}));
      drawHandle(sceneG,pl.sx(A[0]),pl.sy(A[1]),'A','#6E2933','A');
      drawHandle(sceneG,pl.sx(B[0]),pl.sy(B[1]),'B','#1F5E72','B');
      drawHandle(sceneG,pl.sx(C[0]),pl.sy(C[1]),'C','#6E2933','C');
      drawHandle(sceneG,pl.sx(D[0]),pl.sy(D[1]),'D','#3F5D3A','D');
      if(res.selfIntersecting){
        tex(readout,`\\begin{aligned}\\text{Crossed edges! }\\Delta_{\\text{raw}}&=${fmt(res.area,2)}\\;(\\text{INVALID})\\\\\\text{Fix order }&\\text{so edges do not cross.}\\end{aligned}`,`Crossed polygon! Fix vertex order.`);
      }else{
        const t1=math.triangleArea(A,B,C).area,t2=math.triangleArea(A,C,D).area;
        tex(readout,`\\begin{aligned}\\Delta_{ABC}+\\Delta_{ACD}&=${fmt(t1,2)}+${fmt(t2,2)}=${fmt(t1+t2,2)}\\\\\\text{Shoelace Area}&=${fmt(res.area,2)}\\text{ sq. units}\\end{aligned}`,`Area = ${fmt(res.area)} sq. units`);
      }
    }
    attachMultiDrag(svg,pt=>{
      let best=null,bestD=28;
      for(const [k,v] of Object.entries({A,B,C,D})){
        const d=Math.hypot(pt[0]-pl.sx(v[0]),pt[1]-pl.sy(v[1]));
        if(d<bestD){bestD=d;best=k;}
      }
      return best;
    },(id,pt)=>{
      const g=pl.clampSnap(pl.mx(pt[0]),pl.my(pt[1]),1);
      if(id==='A')A=g; else if(id==='B')B=g; else if(id==='C')C=g; else D=g;
      paint();
    });
    paint();
  }

  /* 5. Inclination & Slope Lab */
  function labInclinationSlope(host,lang){
    const ta=lang==='ta';
    const pl=makePlane(320,206,-5,5,-4,4);
    let A=[-2,-1],B=[2,3];
    const svg=svgEl('svg',{viewBox:'0 0 320 206',class:'g10ch4-svg',role:'img','aria-label':ta?'கோட்டின் சாய்வுக் கோணம் மற்றும் சாய்வு வரைபடம்':'Interactive inclination angle and slope m = tan theta'});
    const gridG=svgEl('g'),sceneG=svgEl('g');pl.drawGrid(gridG);svg.append(gridG,sceneG);
    const note=el('p','g10ch4-drag-note',ta?'புள்ளி B-ஐ இழுக்கவும் அல்லது கீழே உள்ள கோணங்களைத் தேர்வு செய்யவும்.':'Drag point B across quadrants or test θ = 0°, 45°, 90°, 135°.');
    const readout=el('div','g10ch4-readout');
    const chips=makeChips([
      {label:'θ = 0°',action:()=>{A=[-2,1];B=[3,1];paint();}},
      {label:'θ = 45°',action:()=>{A=[-1,-1];B=[2,2];paint();}},
      {label:'θ = 90°',action:()=>{A=[1,-2];B=[1,3];paint();}},
      {label:'θ = 135°',action:()=>{A=[-1,2];B=[2,-1];paint();}}
    ],()=>{},ta?'சிறப்புக் கோணங்கள்':'Angle presets');
    host.append(svg,note,readout,chips);

    function paint(){
      sceneG.replaceChildren();
      const s=math.slopeBetween(A,B);
      const a=B[1]-A[1],b=A[0]-B[0],c=-(a*A[0]+b*A[1]);
      const seg=pl.clipLine(a,b,c);
      if(seg)sceneG.append(svgEl('line',{x1:pl.sx(seg[0][0]),y1:pl.sy(seg[0][1]),x2:pl.sx(seg[1][0]),y2:pl.sy(seg[1][1]),stroke:'#1F5E72','stroke-width':1.7}));
      sceneG.append(svgEl('line',{x1:pl.sx(A[0]),y1:pl.sy(A[1]),x2:pl.sx(B[0]),y2:pl.sy(A[1]),stroke:'#525B62','stroke-width':1.4,'stroke-dasharray':'3 3'}));
      sceneG.append(svgEl('line',{x1:pl.sx(B[0]),y1:pl.sy(A[1]),x2:pl.sx(B[0]),y2:pl.sy(B[1]),stroke:'#6E2933','stroke-width':1.4,'stroke-dasharray':'3 3'}));
      sceneG.append(svgEl('line',{x1:pl.sx(A[0]),y1:pl.sy(A[1]),x2:pl.sx(B[0]),y2:pl.sy(B[1]),stroke:'#6E2933','stroke-width':2.6,'data-dg-slope-line':'inclination'}));
      drawHandle(sceneG,pl.sx(A[0]),pl.sy(A[1]),`A(${A[0]},${A[1]})`,'#1F5E72','A');
      drawHandle(sceneG,pl.sx(B[0]),pl.sy(B[1]),`B(${B[0]},${B[1]})`,'#6E2933','B');
      if(!s.defined){
        tex(readout,`\\begin{aligned}\\theta&=90^\\circ\\;(\\Delta x=0)\\\\m&=\\dfrac{${s.dy}}{0}\\;(\\text{Undefined})\\end{aligned}`,`θ = 90°, slope undefined (Δx = 0)`);
      }else{
        tex(readout,`\\begin{aligned}m&=\\dfrac{${s.dy}}{${s.dx}}=${fmt(s.m,2)}\\\\\\theta&\\approx ${fmt(s.angleDeg,1)}^\\circ\\end{aligned}`,`m = ${fmt(s.m,2)}, θ ≈ ${fmt(s.angleDeg,1)}°`);
      }
    }
    attachMultiDrag(svg,pt=>{
      let best=null,bestD=28;
      for(const [k,v] of Object.entries({A,B})){
        const d=Math.hypot(pt[0]-pl.sx(v[0]),pt[1]-pl.sy(v[1]));
        if(d<bestD){bestD=d;best=k;}
      }
      return best;
    },(id,pt)=>{
      const g=pl.clampSnap(pl.mx(pt[0]),pl.my(pt[1]),1);
      if(id==='A')A=g; else B=g;
      if(A[0]===B[0]&&A[1]===B[1]){
        B=[A[0]+(A[0]===pl.xMax?-1:1),A[1]+(A[1]===pl.yMax?-1:1)];
      }
      paint();
    });
    paint();
  }

  /* 6. Parallel & Perpendicular Slopes Lab */
  function labParallelPerpSlopes(host,lang){
    const ta=lang==='ta';
    const pl=makePlane(320,206,-5,5,-4,4);
    let mode=1; // 0 parallel, 1 perpendicular
    let P=[3,2]; // direction from origin (0,0) -> (Px, Py)
    const svg=svgEl('svg',{viewBox:'0 0 320 206',class:'g10ch4-svg',role:'img','aria-label':ta?'இணை மற்றும் செங்குத்துக் கோடுகளின் சாய்வுகள்':'Interactive parallel and perpendicular line slopes on a grid'});
    const gridG=svgEl('g'),sceneG=svgEl('g');pl.drawGrid(gridG);svg.append(gridG,sceneG);

    const tabs=makeTabs(
      ta?['இணை (m₁ = m₂)','செங்குத்து (m₁m₂ = −1)']:['Parallel (m₁ = m₂)','Perpendicular (m₁m₂ = −1)'],
      1,idx=>{mode=idx;tabs.sync(idx);paint();},
      ta?'கோடு தொடர்பு':'Line relation'
    );
    const note=el('p','g10ch4-drag-note',ta?'முனை P-ஐ இழுத்து சாய்வு m₁-ஐ மாற்றும்போது L₂ கோடு எவ்வாறு மாறுகிறது எனப் பாருங்கள்.':'Drag P to change line L₁ and observe L₂ adjust automatically.');
    const readout=el('div','g10ch4-readout');
    host.append(tabs.bar,svg,note,readout);

    function paint(){
      sceneG.replaceChildren();
      const s1=math.slopeBetween([0,0],P);
      const a1=P[1],b1=-P[0],seg1=pl.clipLine(a1,b1,0);
      if(seg1)sceneG.append(svgEl('line',{x1:pl.sx(seg1[0][0]),y1:pl.sy(seg1[0][1]),x2:pl.sx(seg1[1][0]),y2:pl.sy(seg1[1][1]),stroke:'#1F5E72','stroke-width':2.4,'data-dg-slope-line':'first'}));
      let a2,b2,c2;
      if(mode===0){a2=a1;b2=b1;c2=2*b1;} // shifted parallel through (0,2) or right
      else{a2=-b1;b2=a1;c2=0;} // perpendicular rotated 90 deg through origin
      const seg2=pl.clipLine(a2,b2,c2);
      if(seg2)sceneG.append(svgEl('line',{x1:pl.sx(seg2[0][0]),y1:pl.sy(seg2[0][1]),x2:pl.sx(seg2[1][0]),y2:pl.sy(seg2[1][1]),stroke:'#6E2933','stroke-width':2.4,'data-dg-slope-line':'second'}));
      if(mode===1&&P[0]!==0&&P[1]!==0){
        const Q=[-P[1],P[0]];
        sceneG.append(svgEl('line',{x1:pl.sx(0),y1:pl.sy(0),x2:pl.sx(Q[0]),y2:pl.sy(Q[1]),stroke:'#6E2933','stroke-width':1.5,'stroke-dasharray':'3 3'}));
        sceneG.append(svgEl('circle',{cx:pl.sx(Q[0]),cy:pl.sy(Q[1]),r:4,fill:'#6E2933'}));
      }
      drawHandle(sceneG,pl.sx(P[0]),pl.sy(P[1]),`P(${P[0]},${P[1]})`,'#1F5E72','P');
      if(!s1.defined){
        tex(readout,mode===0?'L_1\\text{ vertical},\\;L_2\\text{ vertical }(\\parallel)':'L_1\\text{ vertical}\\perp L_2\\text{ horizontal }(m_2=0)',mode===0?'Both vertical (parallel)':'Vertical perpendicular to horizontal (m₂ = 0)');
      }else if(Math.abs(s1.m)<1e-9){
        tex(readout,mode===0?'m_1=0,\\;m_2=0\\;(\\parallel)':'m_1=0\\perp\\text{vertical }L_2\\;(\\text{undef})','m₁ = 0');
      }else{
        const m1Tex=fracTex(P[1],P[0]),m2Tex=mode===0?m1Tex:fracTex(-P[0],P[1]);
        const m1=s1.m,m2=mode===0?m1:-1/m1;
        tex(readout,mode===0
          ?`m_1=${m1Tex},\\;m_2=${m2Tex}\\;(m_1=m_2)`
          :`\\begin{aligned}m_1&=${m1Tex},\\;m_2=${m2Tex}\\\\m_1\\cdot m_2&=${fmt(m1*m2,2)}\\end{aligned}`,
          `m₁ = ${fmt(m1,2)}, m₂ = ${fmt(m2,2)}`);
      }
    }
    attachMultiDrag(svg,()=>'P',(_,pt)=>{
      const g=pl.clampSnap(pl.mx(pt[0]),pl.my(pt[1]),1);
      if(g[0]===0&&g[1]===0)return;
      P=g;paint();
    });
    paint();
  }

  /* 7. Axes & Parallel Lines Lab */
  function labAxesParallel(host,lang){
    const ta=lang==='ta';
    const pl=makePlane(320,206,-5,5,-4,4);
    let isHoriz=true,val=2;
    const svg=svgEl('svg',{viewBox:'0 0 320 206',class:'g10ch4-svg',role:'img','aria-label':ta?'X மற்றும் Y அச்சுகளுக்கு இணையான கோடுகள்':'Horizontal y = b and vertical x = c lines'});
    const gridG=svgEl('g'),sceneG=svgEl('g');pl.drawGrid(gridG);svg.append(gridG,sceneG);

    const tabs=makeTabs(
      ta?['y = b (X-அச்சுக்கு இணை)','x = c (Y-அச்சுக்கு இணை)']:['y = b (Parallel to X-axis)','x = c (Parallel to Y-axis)'],
      0,idx=>{isHoriz=(idx===0);tabs.sync(idx);val=isHoriz?2:-3;slider.setVal(val);paint();},
      ta?'கோடு திசை':'Line orientation'
    );
    const slider=makeSlider(ta?'மாறிலி மதிப்பு (b அல்லது c)':'Constant offset (b or c)',-3,3,1,val,v=>{val=v;paint();});
    const readout=el('div','g10ch4-readout');
    host.append(tabs.bar,slider.row,svg,readout);

    function paint(){
      sceneG.replaceChildren();
      if(isHoriz){
        const py=pl.sy(val);
        sceneG.append(svgEl('line',{x1:pl.sx(-5),y1:py,x2:pl.sx(5),y2:py,stroke:'#6E2933','stroke-width':2.8}));
        for(const x of [-3,0,3]){
          sceneG.append(svgEl('circle',{cx:pl.sx(x),cy:py,r:3.8,fill:'#1F5E72',stroke:'#FFFFFF','stroke-width':1.3}));
          sceneG.append(svgEl('text',{x:pl.sx(x),y:py-7,'text-anchor':'middle',fill:'#1F5E72','font-size':9,'font-weight':700},`(${x},${val})`));
        }
        tex(readout,val===0?`y=0\\;(\\text{Exact }X\\text{-axis},\\;m=0)`:`y=${val}\\;(\\parallel\\text{ to }X\\text{-axis},\\;m=0)`,`y = ${val}`);
      }else{
        const px=pl.sx(val);
        sceneG.append(svgEl('line',{x1:px,y1:pl.sy(-4),x2:px,y2:pl.sy(4),stroke:'#6E2933','stroke-width':2.8}));
        for(const y of [-2,0,2]){
          sceneG.append(svgEl('circle',{cx:px,cy:pl.sy(y),r:3.8,fill:'#1F5E72',stroke:'#FFFFFF','stroke-width':1.3}));
          sceneG.append(svgEl('text',{x:px+7,y:pl.sy(y)+3,fill:'#1F5E72','font-size':9,'font-weight':700},`(${val},${y})`));
        }
        tex(readout,val===0?`x=0\\;(\\text{Exact }Y\\text{-axis},\\;\\text{undef})`:`x=${val}\\;(\\parallel\\text{ to }Y\\text{-axis},\\;\\text{undef})`,`x = ${val}`);
      }
    }
    paint();
  }

  /* 8. Slope-Intercept y = mx + c Lab */
  function labSlopeIntercept(host,lang){
    const ta=lang==='ta';
    const pl=makePlane(320,206,-5,5,-4,4);
    let m=1,c=1;
    const svg=svgEl('svg',{viewBox:'0 0 320 206',class:'g10ch4-svg',role:'img','aria-label':ta?'சாய்வு வெட்டுத்துண்டு வடிவம் y = mx + c':'Interactive y = mx + c line with slope and y-intercept sliders'});
    const gridG=svgEl('g'),sceneG=svgEl('g');pl.drawGrid(gridG);svg.append(gridG,sceneG);

    const sM=makeSlider(ta?'சாய்வு m':'Slope m',-2,2,0.5,m,v=>{m=v;paint();});
    const sC=makeSlider(ta?'y-வெட்டுத்துண்டு c':'y-intercept c',-3,3,1,c,v=>{c=v;paint();});
    const readout=el('div','g10ch4-readout');
    host.append(sM.row,sC.row,svg,readout);

    function paint(){
      sceneG.replaceChildren();
      const seg=pl.clipLine(m,-1,c);
      if(seg)sceneG.append(svgEl('line',{x1:pl.sx(seg[0][0]),y1:pl.sy(seg[0][1]),x2:pl.sx(seg[1][0]),y2:pl.sy(seg[1][1]),stroke:'#1F5E72','stroke-width':2.5}));
      if(c>=-4&&c<=4){
        const p1=[1,m+c];
        sceneG.append(svgEl('line',{x1:pl.sx(0),y1:pl.sy(c),x2:pl.sx(1),y2:pl.sy(c),stroke:'#525B62','stroke-width':1.4,'stroke-dasharray':'3 2'}));
        sceneG.append(svgEl('line',{x1:pl.sx(1),y1:pl.sy(c),x2:pl.sx(1),y2:pl.sy(p1[1]),stroke:'#6E2933','stroke-width':1.4,'stroke-dasharray':'3 2'}));
        sceneG.append(svgEl('circle',{cx:pl.sx(0),cy:pl.sy(c),r:5,fill:'#6E2933',stroke:'#FFFFFF','stroke-width':1.5}));
        sceneG.append(svgEl('text',{x:pl.sx(0)+7,y:pl.sy(c)-6,fill:'#6E2933','font-size':9.5,'font-weight':800},`(0,${c})`));
      }
      const eq=m===0?`y=${c}`:`y=${m===1?'':(m===-1?'-':fmt(m))}x${c===0?'':(c>0?'+'+c:c)}`;
      tex(readout,`\\begin{aligned}${eq}\\\\m=${fmt(m)},&\\quad c=${c}\\end{aligned}`,`${eq} (m=${fmt(m)}, c=${c})`);
    }
    paint();
  }

  /* 9. Point-Slope & Two-Point Lab */
  function labPointSlope(host,lang){
    const ta=lang==='ta';
    const pl=makePlane(320,206,-5,5,-4,4);
    let mode=0,A=[-2,-1],B=[2,2],m=0.75;
    const svg=svgEl('svg',{viewBox:'0 0 320 206',class:'g10ch4-svg',role:'img','aria-label':ta?'புள்ளி-சாய்வு மற்றும் இரு புள்ளி வடிவ வரைபடம்':'Interactive Point-Slope and Two-Point line builder'});
    const gridG=svgEl('g'),sceneG=svgEl('g');pl.drawGrid(gridG);svg.append(gridG,sceneG);

    const tabs=makeTabs(
      ta?['புள்ளி–சாய்வு','இரு புள்ளி']:['Point–Slope','Two–Point'],
      0,idx=>{mode=idx;tabs.sync(idx);sM.row.hidden=(idx!==0);paint();},
      ta?'கோடு வடிவம்':'Line mode'
    );
    const sM=makeSlider(ta?'சாய்வு m':'Slope m',-2,2,0.5,m,v=>{m=v;paint();});
    const note=el('p','g10ch4-drag-note',ta?'புள்ளி A-ஐ (மற்றும் இரு புள்ளி முறையில் B-ஐ) இழுக்கவும்.':'Drag anchor A (and B in Two-Point mode) across the grid.');
    const readout=el('div','g10ch4-readout');
    host.append(tabs.bar,sM.row,svg,note,readout);

    function paint(){
      sceneG.replaceChildren();
      let a,b,c;
      if(mode===0){
        a=m;b=-1;c=A[1]-m*A[0];
        const seg=pl.clipLine(a,b,c);
        if(seg)sceneG.append(svgEl('line',{x1:pl.sx(seg[0][0]),y1:pl.sy(seg[0][1]),x2:pl.sx(seg[1][0]),y2:pl.sy(seg[1][1]),stroke:'#1F5E72','stroke-width':2.5}));
        drawHandle(sceneG,pl.sx(A[0]),pl.sy(A[1]),`A(${A[0]},${A[1]})`,'#6E2933','A');
        const yPart=A[1]===0?'y':(A[1]>0?`y-${A[1]}`:`y+${-A[1]}`);
        const xPart=A[0]===0?'x':(A[0]>0?`x-${A[0]}`:`x+${-A[0]}`);
        tex(readout,`\\begin{aligned}${yPart}&=${fmt(m)}(${xPart})\\\\\\implies y&=${fmt(m)}x${c>=0?'+'+fmt(c):fmt(c)}\\end{aligned}`,`${yPart} = ${fmt(m)}(${xPart})`);
      }else{
        a=B[1]-A[1];b=A[0]-B[0];c=-(a*A[0]+b*A[1]);
        const seg=pl.clipLine(a,b,c);
        if(seg)sceneG.append(svgEl('line',{x1:pl.sx(seg[0][0]),y1:pl.sy(seg[0][1]),x2:pl.sx(seg[1][0]),y2:pl.sy(seg[1][1]),stroke:'#1F5E72','stroke-width':2.5}));
        drawHandle(sceneG,pl.sx(A[0]),pl.sy(A[1]),`A(${A[0]},${A[1]})`,'#6E2933','A');
        drawHandle(sceneG,pl.sx(B[0]),pl.sy(B[1]),`B(${B[0]},${B[1]})`,'#3F5D3A','B');
        if(A[0]===B[0]){
          tex(readout,`x_1=x_2=${A[0]}\\;(\\text{Vertical }x=${A[0]})`,`x = ${A[0]}`);
        }else if(A[1]===B[1]){
          tex(readout,`y_1=y_2=${A[1]}\\;(\\text{Horizontal }y=${A[1]})`,`y = ${A[1]}`);
        }else{
          const s=math.slopeBetween(A,B);
          tex(readout,`\\begin{aligned}\\dfrac{y-(${A[1]})}{${B[1]-A[1]}}&=\\dfrac{x-(${A[0]})}{${B[0]-A[0]}}\\\\\\text{Slope }m&=${fmt(s.m,2)}\\end{aligned}`,`m = ${fmt(s.m,2)}`);
        }
      }
    }
    attachMultiDrag(svg,pt=>{
      const pts=mode===1?{A,B}:{A};
      let best=null,bestD=28;
      for(const [k,v] of Object.entries(pts)){
        const d=Math.hypot(pt[0]-pl.sx(v[0]),pt[1]-pl.sy(v[1]));
        if(d<bestD){bestD=d;best=k;}
      }
      return best;
    },(id,pt)=>{
      const g=pl.clampSnap(pl.mx(pt[0]),pl.my(pt[1]),1);
      if(id==='A'){if(mode===1&&g[0]===B[0]&&g[1]===B[1])return;A=g;}
      else{if(g[0]===A[0]&&g[1]===A[1])return;B=g;}
      paint();
    });
    paint();
  }

  /* 10. Intercept Form x/a + y/b = 1 Lab */
  function labInterceptForm(host,lang){
    const ta=lang==='ta';
    const pl=makePlane(320,206,-5,5,-4,4);
    let a=4,b=3;
    const svg=svgEl('svg',{viewBox:'0 0 320 206',class:'g10ch4-svg',role:'img','aria-label':ta?'வெட்டுத்துண்டு வடிவம் x/a + y/b = 1 வரைபடம்':'Interactive x and y axis intercepts forming x/a + y/b = 1'});
    const gridG=svgEl('g'),sceneG=svgEl('g');pl.drawGrid(gridG);svg.append(gridG,sceneG);
    const note=el('p','g10ch4-drag-note',ta?'அச்சுகளின் மீதுள்ள (a, 0) மற்றும் (0, b) புள்ளிகளை இழுத்து வெட்டுத்துண்டுகளை மாற்றவும்.':'Drag (a, 0) along X-axis and (0, b) along Y-axis.');
    const readout=el('div','g10ch4-readout');
    host.append(svg,note,readout);

    function paint(){
      sceneG.replaceChildren();
      // Line bx + ay - ab = 0
      const seg=pl.clipLine(b,a,-a*b);
      sceneG.append(svgEl('polygon',{points:`${pl.sx(0)},${pl.sy(0)} ${pl.sx(a)},${pl.sy(0)} ${pl.sx(0)},${pl.sy(b)}`,fill:'rgba(63,93,58,.14)'}));
      if(seg)sceneG.append(svgEl('line',{x1:pl.sx(seg[0][0]),y1:pl.sy(seg[0][1]),x2:pl.sx(seg[1][0]),y2:pl.sy(seg[1][1]),stroke:'#1F5E72','stroke-width':2.5}));
      drawHandle(sceneG,pl.sx(a),pl.sy(0),`(${a},0)`,'#6E2933','a');
      drawHandle(sceneG,pl.sx(0),pl.sy(b),`(0,${b})`,'#3F5D3A','b');
      const area=0.5*Math.abs(a*b);
      tex(readout,`\\begin{aligned}\\dfrac{x}{${a}}+\\dfrac{y}{${b}}&=1\\\\\\text{Area with axes}&=\\dfrac{1}{2}|ab|=${fmt(area,1)}\\end{aligned}`,`x/${a} + y/${b} = 1, Area = ${fmt(area,1)}`);
    }
    attachMultiDrag(svg,pt=>{
      const da=Math.hypot(pt[0]-pl.sx(a),pt[1]-pl.sy(0)),db=Math.hypot(pt[0]-pl.sx(0),pt[1]-pl.sy(b));
      return da<=db?'a':'b';
    },(id,pt)=>{
      const g=pl.clampSnap(pl.mx(pt[0]),pl.my(pt[1]),1);
      if(id==='a'&&g[0]!==0)a=g[0];
      if(id==='b'&&g[1]!==0)b=g[1];
      paint();
    });
    paint();
  }

  /* 11. General Form ax + by + c = 0 Lab */
  function labGeneralForm(host,lang){
    const ta=lang==='ta';
    const pl=makePlane(320,206,-5,5,-4,4);
    let a=2,b=3,c=-6;
    const svg=svgEl('svg',{viewBox:'0 0 320 206',class:'g10ch4-svg',role:'img','aria-label':ta?'பொது வடிவம் ax + by + c = 0 வரைபடம்':'Interactive general form ax + by + c = 0 plane'});
    const gridG=svgEl('g'),sceneG=svgEl('g');pl.drawGrid(gridG);svg.append(gridG,sceneG);

    const sA=makeSlider('a (x coeff)',-4,4,1,a,v=>{if(v===0&&b===0)return;a=v;paint();});
    const sB=makeSlider('b (y coeff)',-4,4,1,b,v=>{if(v===0&&a===0)return;b=v;paint();});
    const sC=makeSlider('c (constant)',-8,8,1,c,v=>{c=v;paint();});
    const readout=el('div','g10ch4-readout');
    host.append(sA.row,sB.row,sC.row,svg,readout);

    function paint(){
      sceneG.replaceChildren();
      const info=math.lineFromGeneral(a,b,c);
      const seg=pl.clipLine(a,b,c);
      if(seg)sceneG.append(svgEl('line',{x1:pl.sx(seg[0][0]),y1:pl.sy(seg[0][1]),x2:pl.sx(seg[1][0]),y2:pl.sy(seg[1][1]),stroke:'#1F5E72','stroke-width':2.5}));
      if(info.yInt!==null&&info.yInt>=-4&&info.yInt<=4){
        sceneG.append(svgEl('circle',{cx:pl.sx(0),cy:pl.sy(info.yInt),r:4.5,fill:'#6E2933',stroke:'#FFFFFF','stroke-width':1.5}));
      }
      if(info.xInt!==null&&info.xInt>=-5&&info.xInt<=5){
        sceneG.append(svgEl('circle',{cx:pl.sx(info.xInt),cy:pl.sy(0),r:4.5,fill:'#3F5D3A',stroke:'#FFFFFF','stroke-width':1.5}));
      }
      const lhs=`${a}x${b>=0?'+'+b:b}y${c>=0?'+'+c:c}=0`;
      if(info.vertical){
        tex(readout,`\\begin{aligned}${lhs}\\implies x&=${fmt(info.xInt,2)}\\\\\\text{Slope }m&=\\text{Undefined}\\end{aligned}`,`${lhs}: vertical line x=${fmt(info.xInt)}`);
      }else{
        const mTex=fracTex(-a,b),yIntTex=fracTex(-c,b);
        tex(readout,`\\begin{aligned}${lhs}\\\\m=${mTex},&\\;y\\text{-int}=${yIntTex}\\end{aligned}`,`${lhs}: m=${fmt(info.m)}, y-int=${fmt(info.yInt)}`);
      }
    }
    paint();
  }

  /* 12. Parallel & Perpendicular Families in General Form Lab */
  function labGeneralFamily(host,lang){
    const ta=lang==='ta';
    const pl=makePlane(320,206,-5,5,-4,4);
    let mode=1,k=-4; // Base line: 3x - 2y + 2 = 0 (a=3, b=-2)
    const a=3,b=-2,c=2;
    const svg=svgEl('svg',{viewBox:'0 0 320 206',class:'g10ch4-svg',role:'img','aria-label':ta?'பொது வடிவில் இணை மற்றும் செங்குத்துக் கோட்டுக் குடும்பம்':'Parallel and perpendicular general-form families'});
    const gridG=svgEl('g'),sceneG=svgEl('g');pl.drawGrid(gridG);svg.append(gridG,sceneG);

    const tabs=makeTabs(
      ta?['இணை (3x−2y+k=0)','செங்குத்து (2x+3y+k=0)']:['Parallel (3x−2y+k=0)','Perpendicular (2x+3y+k=0)'],
      1,idx=>{mode=idx;tabs.sync(idx);paint();},
      ta?'கோட்டுக் குடும்பம்':'Line family'
    );
    const sK=makeSlider(ta?'மாறிலி k':'Constant k',-10,10,1,k,v=>{k=v;paint();});
    const readout=el('div','g10ch4-readout');
    host.append(tabs.bar,sK.row,svg,readout);

    function paint(){
      sceneG.replaceChildren();
      const seg1=pl.clipLine(a,b,c);
      if(seg1)sceneG.append(svgEl('line',{x1:pl.sx(seg1[0][0]),y1:pl.sy(seg1[0][1]),x2:pl.sx(seg1[1][0]),y2:pl.sy(seg1[1][1]),stroke:'#1F5E72','stroke-width':2.4}));
      const a2=mode===0?a:2,b2=mode===0?b:3;
      const seg2=pl.clipLine(a2,b2,k);
      if(seg2)sceneG.append(svgEl('line',{x1:pl.sx(seg2[0][0]),y1:pl.sy(seg2[0][1]),x2:pl.sx(seg2[1][0]),y2:pl.sy(seg2[1][1]),stroke:'#6E2933','stroke-width':2.4}));
      const rel=math.generalRelation(a,b,c,a2,b2,k);
      if(mode===0){
        tex(readout,`\\begin{aligned}L_1:&\\;3x-2y+2=0\\\\L_2:&\\;3x-2y${k>=0?'+'+k:k}=0\\\\a_1b_2-a_2b_1&=${rel.det}\\;(\\parallel)\\end{aligned}`,`Parallel family: 3x − 2y + (${k}) = 0 (a₁b₂ − a₂b₁ = ${rel.det})`);
      }else{
        tex(readout,`\\begin{aligned}L_1:&\\;3x-2y+2=0\\\\L_2:&\\;2x+3y${k>=0?'+'+k:k}=0\\\\a_1a_2+b_1b_2&=${rel.dot}\\;(\\perp)\\end{aligned}`,`Perpendicular family: 2x + 3y + (${k}) = 0 (a₁a₂ + b₁b₂ = ${rel.dot})`);
      }
    }
    paint();
  }

  const BUILDERS={
    'distance-midpoint':labDistanceMidpoint,
    'area-triangle':labAreaTriangle,
    'collinearity':labCollinearity,
    'area-quadrilateral':labAreaQuad,
    'inclination-slope':labInclinationSlope,
    'parallel-perp-slopes':labParallelPerpSlopes,
    'axes-parallel':labAxesParallel,
    'slope-intercept':labSlopeIntercept,
    'point-slope':labPointSlope,
    'intercept-form':labInterceptForm,
    'general-form':labGeneralForm,
    'general-family':labGeneralFamily
  };

  function renderGlance(stage,host,lang){
    if(!host||!stage)return;
    host.replaceChildren();
    const id=stage.glanceVisual||stage.visual?.id;
    const pl=makePlane(240,118,-4,4,-2.5,2.5);
    const svg=svgEl('svg',{viewBox:'0 0 240 118',class:'g10ch4-glance-svg',role:'img','aria-label':stage.title?.[lang]||stage.title?.en||'Coordinate diagram'});
    const g=svgEl('g');pl.drawGrid(g);
    const previewLine=([x1,y1],[x2,y2],id,stroke,width=2.2)=>svgEl('line',{
      x1:pl.sx(x1),y1:pl.sy(y1),x2:pl.sx(x2),y2:pl.sy(y2),'data-dg-preview-line':id,stroke,'stroke-width':width
    });
    if(id==='distance-midpoint'){
      g.append(svgEl('line',{x1:pl.sx(-3),y1:pl.sy(-1),x2:pl.sx(3),y2:pl.sy(-1),stroke:'#525B62','stroke-width':1.1,'stroke-dasharray':'3 2'}));
      g.append(svgEl('line',{x1:pl.sx(3),y1:pl.sy(-1),x2:pl.sx(3),y2:pl.sy(2),stroke:'#525B62','stroke-width':1.1,'stroke-dasharray':'3 2'}));
      g.append(svgEl('line',{x1:pl.sx(-3),y1:pl.sy(-1),x2:pl.sx(3),y2:pl.sy(2),stroke:'#1F5E72','stroke-width':2.2}));
      g.append(svgEl('circle',{cx:pl.sx(0),cy:pl.sy(0.5),r:4,fill:'#6E2933'}));
    }else if(id==='area-triangle'){
      g.append(svgEl('polygon',{points:`${pl.sx(-2.5)},${pl.sy(-1)} ${pl.sx(0.5)},${pl.sy(2)} ${pl.sx(3)},${pl.sy(0)}`,fill:'rgba(110,41,51,.18)',stroke:'#6E2933','stroke-width':2}));
    }else if(id==='collinearity'){
      g.append(svgEl('line',{x1:pl.sx(-3),y1:pl.sy(-1.5),x2:pl.sx(3),y2:pl.sy(1.5),stroke:'#3F5D3A','stroke-width':2.2}));
      for(const p of [[-3,-1.5],[0,0],[3,1.5]])g.append(svgEl('circle',{cx:pl.sx(p[0]),cy:pl.sy(p[1]),r:3.8,fill:'#3F5D3A'}));
    }else if(id==='area-quadrilateral'){
      g.append(svgEl('polygon',{points:`${pl.sx(-2.5)},${pl.sy(-1.5)} ${pl.sx(2.5)},${pl.sy(-1.5)} ${pl.sx(2)},${pl.sy(1.8)} ${pl.sx(-1.5)},${pl.sy(1.5)}`,fill:'rgba(31,94,114,.16)',stroke:'#1F5E72','stroke-width':2}));
    }else if(id==='inclination-slope'){
      const start=[-3,-1],end=[3,2];
      const dx=end[0]-start[0],dy=end[1]-start[1];
      const cx=pl.sx(start[0]-start[1]*dx/dy),cy=pl.sy(0),radius=16;
      const scale=radius/Math.hypot(dx,dy);
      g.append(previewLine(start,end,'inclination','#6E2933'));
      g.append(svgEl('path',{d:`M ${cx+radius} ${cy} A ${radius} ${radius} 0 0 0 ${cx+dx*scale} ${cy-dy*scale}`,
        'data-dg-inclination-arc':'',fill:'none',stroke:'#1F5E72','stroke-width':1.5}));
    }else if(id==='parallel-perp-slopes'||id==='general-family'){
      const vector=[3,1.5];
      const normal=[-vector[1]*2.2/vector[0],2.2];
      g.append(previewLine(vector.map(n=>-n),vector,'reference','#1F5E72',2.1));
      g.append(previewLine(normal,normal.map(n=>-n),'perpendicular','#6E2933',2.1));
    }else if(id==='axes-parallel'){
      g.append(svgEl('line',{x1:pl.sx(-3.5),y1:pl.sy(1.5),x2:pl.sx(3.5),y2:pl.sy(1.5),stroke:'#6E2933','stroke-width':2.2}));
      g.append(svgEl('line',{x1:pl.sx(2),y1:pl.sy(-2.2),x2:pl.sx(2),y2:pl.sy(2.2),stroke:'#1F5E72','stroke-width':2.2}));
    }else if(id==='intercept-form'){
      const a=2.3,b=1.5;
      const point=x=>[x,b*(1-x/a)];
      g.append(previewLine(point(-1),point(3.5),'intercept','#1F5E72'));
      g.append(svgEl('circle',{cx:pl.sx(a),cy:pl.sy(0),r:3.8,fill:'#6E2933','data-dg-preview-intercept':'x'}));
      g.append(svgEl('circle',{cx:pl.sx(0),cy:pl.sy(b),r:3.8,fill:'#3F5D3A','data-dg-preview-intercept':'y'}));
    }else{
      g.append(svgEl('line',{x1:pl.sx(-3),y1:pl.sy(-1),x2:pl.sx(3),y2:pl.sy(2),stroke:'#1F5E72','stroke-width':2.2}));
      g.append(svgEl('circle',{cx:pl.sx(0),cy:pl.sy(0.5),r:3.8,fill:'#6E2933'}));
    }
    svg.append(g);host.append(svg);
  }

  function mount(stage,host,lang='en'){
    if(!host||!stage)return;
    host.replaceChildren();
    const id=stage.visual?.id;
    const fn=BUILDERS[id];
    const box=el('div','g10ch4-lab');
    box.dataset.labId=id||'';
    if(fn)fn(box,lang==='ta'?'ta':'en');
    host.append(box);
  }

  window.TriggleG10Ch5Labs=Object.freeze({
    mount,
    renderGlance,
    math,
    ids:Object.keys(BUILDERS)
  });
})();
