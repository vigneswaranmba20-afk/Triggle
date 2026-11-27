/* Lengths in these original diagrams come from the similarity criteria and the rectangle proof. */
(() => {
  'use strict';
  const guard=window.TriggleDiagramGuard;
  const ns='http://www.w3.org/2000/svg';
  const ink='#272836', teal='#166353', plum='#70384b', gold='#856222', muted='#706977';
  const smallFill='#f6f3fa', largeFill='#edf6f2';
  const degrees=value=>value*Math.PI/180;
  const add=(a,b)=>[a[0]+b[0],a[1]+b[1]];
  const subtract=(a,b)=>[a[0]-b[0],a[1]-b[1]];
  const multiply=(v,k)=>v.map(x=>k*x);
  const length=v=>Math.hypot(...v);
  const unit=v=>multiply(v,1/length(v));
  const midpoint=(a,b)=>multiply(add(a,b),.5);
  const center=points=>multiply(points.reduce(add,[0,0]),1/points.length);
  const pointsOf=points=>points.map(p=>p.join(',')).join(' ');
  function shape(tag,attrs,value){
    const node=document.createElementNS(ns,tag);
    for(const [name,val] of Object.entries(attrs))node.setAttribute(name,val);
    if(value!==undefined)node.textContent=value;
    return node;
  }
  function scene(id,description,extraClass=''){
    return shape('svg',{class:'diagramguard-svg '+extraClass,viewBox:'0 0 300 160',
      role:'img','aria-label':description,'data-dg-scene':id});
  }
  function setFrame(svg,width,height){
    svg.setAttribute('viewBox','0 0 '+width+' '+Math.ceil(height));
    svg.setAttribute('width',width);
    svg.setAttribute('height',Math.ceil(height));
    svg.replaceChildren();
  }
  function polygon(svg,id,points,stroke,fill,extra={}){
    svg.append(shape('polygon',{points:pointsOf(points),stroke,fill,
      'data-dg-obstacle':id,'data-dg-vertices':id,'stroke-width':'1.75',...extra}));
  }
  function line(svg,id,a,b,color,extra={}){
    svg.append(shape('line',{x1:a[0],y1:a[1],x2:b[0],y2:b[1],stroke:color,fill:'none',
      'data-dg-obstacle':id,'stroke-width':'1.65',...extra}));
  }
  function label(id,value,anchor,direction,kind,color=ink,candidates){
    return {anchor,direction,candidates,label:shape('text',{
      'data-dg-label':id,'data-dg-font':kind,'text-anchor':'middle',
      'dominant-baseline':'central',fill:color
    },value)};
  }
  function side(id,value,a,b,inside,color){
    const anchor=midpoint(a,b);
    const delta=subtract(b,a);
    const normal=[delta[1],-delta[0]];
    const toward=subtract(inside,anchor);
    const outward=normal[0]*toward[0]+normal[1]*toward[1]>0?multiply(normal,-1):normal;
    return label(id,value,anchor,outward,'measurement',color);
  }
  function angle(svg,id,at,to1,to2,color,rem){
    const u=subtract(to1,at),v=subtract(to2,at);
    const r=Math.min(rem*.82,length(u)*.24,length(v)*.24);
    const a=add(at,multiply(unit(u),r)),b=add(at,multiply(unit(v),r));
    const sweep=u[0]*v[1]-u[1]*v[0]>0?1:0;
    svg.append(shape('path',{d:'M '+a.join(' ')+' A '+r+' '+r+' 0 0 '+sweep+' '+b.join(' '),fill:'none',stroke:color,
      'stroke-width':'1.4','data-dg-obstacle':id,'data-dg-role':'angle'}));
  }
  const bounds=points=>{
    const xs=points.map(p=>p[0]),ys=points.map(p=>p[1]);
    return {x0:Math.min(...xs),x1:Math.max(...xs),y0:Math.min(...ys),y1:Math.max(...ys)};
  };
  const models=[
    {vertices:[[0,-Math.tan(degrees(65))],[-1,0],[1,0]],factor:1.5},
    {vertices:[[0,0],[-4*Math.sin(degrees(25)),4*Math.cos(degrees(25))],
      [6*Math.sin(degrees(25)),6*Math.cos(degrees(25))]],factor:1.5,sides:[[0,1,4],[0,2,6]]},
    {vertices:[[0,-3],[0,0],[4,0]],factor:2,sides:[[0,1,3],[1,2,4],[2,0,5]]}
  ];

  function drawPair(svg,width,rem,mode){
    const {vertices,factor,sides}=models[mode];
    const large=vertices.map(p=>multiply(p,factor));
    const largeBox=bounds(large);
    const sideBySide=width>=24*rem;
    const slot=sideBySide?width/2:width;
    const rim=Math.min(rem*2.35,slot*.28);
    const scale=Math.min((slot-2*rim)/(largeBox.x1-largeBox.x0),
      Math.min(165,width*.56)/(largeBox.y1-largeBox.y0));
    const sidesHeight=[vertices,large].map(points=>{
      const b=bounds(points);
      return (b.y1-b.y0)*scale;
    });
    const firstHeight=sidesHeight[0]+2*rim;
    setFrame(svg,width,sideBySide?sidesHeight[1]+2*rim:firstHeight+sidesHeight[1]+2*rim+rem*.4);
    const placements=[];
    for(const [index,points] of [vertices,large].entries()){
      const box=bounds(points);
      const midX=sideBySide?slot*(index+.5):slot/2;
      const top=rim+(index&&!sideBySide?firstHeight+rem*.4:sideBySide?sidesHeight[1]-sidesHeight[index]:0);
      const p=points.map(([x,y])=>[midX+(x-(box.x0+box.x1)/2)*scale,top+(y-box.y0)*scale]);
      const names=index?['P','Q','R']:['A','B','C'];
      const color=index?teal:ink;
      polygon(svg,names.join(''),p,color,index?largeFill:smallFill);
      const mid=center(p);
      for(const [i,name] of names.entries())placements.push(label(name,name,p[i],subtract(p[i],mid),'vertex',color));
      const angles=mode===0?[0,1,2]:mode===1?[0]:[];
      for(const i of angles)angle(svg,'angle-'+names[i],p[i],p[(i+1)%3],p[(i+2)%3],i===0?plum:teal,rem);
      for(const [a,b,size] of sides||[]){
        placements.push(side(names[a]+names[b],String(size*(index?factor:1)),p[a],p[b],mid,color));
      }
    }
    guard.place(svg,placements);
  }

  function drawSSA(svg,width,rem,active,ssa){
    const rim=Math.min(rem*2.5,width*.28);
    const aHeight=ssa.c*Math.sin(degrees(ssa.degB));
    const scale=Math.min((width-2*rim)/ssa.a1,155/aHeight);
    const baseY=rim+aHeight*scale;
    const B=[rim,baseY];
    const A=[B[0]+ssa.c*Math.cos(degrees(ssa.degB))*scale,rim];
    const ends=[ssa.a1,ssa.a2].map(a=>[B[0]+a*scale,baseY]);
    const current=ends[active], other=ends[1-active];
    const radius=ssa.b*scale;
    setFrame(svg,width,baseY+rem*3.7);
    line(svg,'base-ray',B,[width-rem*.85,baseY],muted,{'stroke-dasharray':'4 4'});
    svg.append(shape('path',{d:'M '+ends[1].join(' ')+' A '+radius+' '+radius+' 0 0 0 '+ends[0].join(' '),
      stroke:gold,fill:'none','stroke-width':'1.65','stroke-dasharray':'4 3','data-dg-obstacle':'swing-arc'}));
    polygon(svg,'alternate-ssa',[A,B,other],muted,'none',{'stroke-dasharray':'5 4'});
    polygon(svg,'selected-ssa',[A,B,current],plum,'#f8edf1');
    angle(svg,'angle-B',B,A,ends[0],plum,rem);
    for(const [index,[cx,cy]] of ends.entries())svg.append(shape('circle',{cx,cy,r:3.1,
      fill:index===active?plum:muted,'data-dg-obstacle':'point-C'+index,'data-dg-fill':'','data-dg-role':'vertex'}));
    guard.place(svg,[
      label('A','A',A,[0,-1],'vertex',plum),
      label('B','B',B,[-.6,1],'vertex',plum),
      label('C1','C₁',ends[0],[0,1],'vertex'),
      label('C2','C₂',ends[1],[0,1],'vertex'),
      side('AB','8',A,B,current,ink),
      side('AC','5.5',A,current,B,plum)
    ]);
  }

  function lab(description,getState){
    const svg=scene('similarity-lab',description,'g10ch4-svg');
    const frames=new Map();
    let measuredSize='';
    return {svg,observe:()=>guard.responsive(svg,(width,rem)=>{
      const {mode,active,ssa}=getState();
      const state=mode===3?'ssa-'+(active+1):['aa','sas','sss'][mode];
      const size=width+':'+rem;
      if(size!==measuredSize){
        measuredSize=size;
        frames.clear();
      }
      svg.dataset.dgState=state;
      const cached=frames.get(state);
      if(cached){
        setFrame(svg,width,cached.height);
        svg.append(...cached.nodes);
        return;
      }
      if(mode===3)drawSSA(svg,width,rem,active,ssa);
      else drawPair(svg,width,rem,mode);
      frames.set(state,{height:svg.viewBox.baseVal.height,nodes:[...svg.childNodes]});
    })};
  }

  function preview(host,description,id,language){
    const svg=scene(id+'-preview',description,'g10ch4-glance-svg');
    setFrame(svg,300,97);
    const points=[[-18,0],[38,0],[10,-43]];
    const factor=id==='similarity-scale'?1.55:1.42;
    const a=points.map(p=>add([47,78],p));
    const b=points.map(p=>add([194,78],multiply(p,factor)));
    polygon(svg,'ABC',a,ink,smallFill);
    polygon(svg,'PQR',b,teal,largeFill);
    const caption=document.createElement('p');caption.className='diagramguard-annotation';
    caption.textContent=id==='similarity-scale'?'△ABC → △PQR  (× k)':id==='similarity-criteria'?'AA · SAS · SSS':
      language==='ta'?'பக்கம் k மடங்கு · பரப்பளவு k² மடங்கு':'Side × k · area × k²';
    host.append(svg,caption);
  }

  function rectangle(container,description){
    const svg=scene('wxyz-rectangle',description,'diagramguard-rectangle');
    const figure=document.createElement('span');
    figure.className='diagramguard-figure';
    const caption=document.createElement('span');
    caption.className='diagramguard-annotation';
    caption.textContent='XZ = YW';
    figure.append(svg,caption);
    container.replaceChildren(figure);
    guard.responsive(svg,(width,rem)=>{
      const rim=Math.min(rem*2.25,width*.28);
      const horizontal=width-2*rim;
      const vertical=horizontal*5/12;
      setFrame(svg,width,vertical+2*rim);
      const W=[rim,rim+vertical],X=[rim+horizontal,rim+vertical],Y=[X[0],rim],Z=[rim,rim];
      polygon(svg,'WXYZ',[W,X,Y,Z],ink,smallFill);
      const dash={'stroke-dasharray':'5 3'};
      line(svg,'XZ',X,Z,teal,dash);
      line(svg,'YW',Y,W,teal,dash);
      const mid=midpoint(W,Y);
      const placements=[W,X,Y,Z].map((p,i)=>label('WXYZ'[i],'WXYZ'[i],p,subtract(p,mid),'vertex'));
      placements.push(side('long-side','a',W,X,mid,ink),side('short-side','b',X,Y,mid,ink));
      guard.place(svg,placements);
    });
  }
  window.TriggleG10DiagramGuard=Object.freeze({lab,preview,rectangle});
})();
