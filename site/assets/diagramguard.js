/* VER DiagramGuard. Inspect rendered geometry in CSS pixels. */
(() => {
  'use strict';
  const geometrySelector = 'line,polyline,polygon,path,rect,circle,ellipse';
  const epsilon = 1e-7;
  const map = (matrix, x, y) => [matrix.a*x + matrix.c*y + matrix.e, matrix.b*x + matrix.d*y + matrix.f];
  const corners = (matrix, {x, y, width, height}) => [
    map(matrix, x, y), map(matrix, x+width, y),
    map(matrix, x+width, y+height), map(matrix, x, y+height)
  ];
  const edges = quad => quad.map((p, i) => [p, quad[(i+1)%quad.length]]);
  const cross = (a,b,c) => (b[0]-a[0])*(c[1]-a[1]) - (b[1]-a[1])*(c[0]-a[0]);
  const inside = (point, quad) => {
    const signs = edges(quad).map(([a,b]) => cross(a,b,point));
    return signs.every(s => s >= -epsilon) || signs.every(s => s <= epsilon);
  };
  const distance = (a,b) => Math.hypot(a[0]-b[0],a[1]-b[1]);
  function pointSegment(p,a,b) {
    const x=b[0]-a[0], y=b[1]-a[1], squared=x*x+y*y;
    const t=squared ? Math.max(0,Math.min(1,((p[0]-a[0])*x+(p[1]-a[1])*y)/squared)) : 0;
    return distance(p,[a[0]+t*x,a[1]+t*y]);
  }
  function segmentDistance(a,b,c,d) {
    const across=(p,q,r,s) => (cross(p,q,r)>epsilon && cross(p,q,s)<-epsilon) ||
      (cross(p,q,s)>epsilon && cross(p,q,r)<-epsilon);
    if(across(a,b,c,d)&&across(c,d,a,b))return 0;
    return Math.min(pointSegment(a,c,d),pointSegment(b,c,d),pointSegment(c,a,b),pointSegment(d,a,b));
  }
  const segmentHits = ([a,b], quad, padding) => inside(a,quad)||inside(b,quad)||
    edges(quad).some(([c,d])=>segmentDistance(a,b,c,d)<=padding);
  const quadsHit = (a,b,padding) => edges(a).some(edge=>segmentHits(edge,b,padding))||inside(b[0],a);
  function sizes(box) {
    const xs=box.map(p=>p[0]), ys=box.map(p=>p[1]);
    return [Math.min(...xs),Math.min(...ys),Math.max(...xs),Math.max(...ys)];
  }
  const boxesNear = (a,b,pad) => a[0]<=b[2]+pad&&a[2]>=b[0]-pad&&a[1]<=b[3]+pad&&a[3]>=b[1]-pad;
  const matrixScale = m => {
    const sum=m.a*m.a+m.b*m.b+m.c*m.c+m.d*m.d;
    const det=m.a*m.d-m.b*m.c;
    return Math.sqrt((sum+Math.sqrt(Math.max(0,sum*sum-4*det*det)))/2);
  };
  const visible = (node,style) => node.getClientRects().length&&style.visibility!=='hidden'&&
    style.visibility!=='collapse'&&style.display!=='none'&&Number(style.opacity)>0;
  const localValue = (el,name) => el[name].baseVal.value;
  function segments(el,matrix,scale,bounds) {
    if(el.localName==='line')return [[
      map(matrix,localValue(el,'x1'),localValue(el,'y1')),
      map(matrix,localValue(el,'x2'),localValue(el,'y2'))
    ]];
    if(el.points){
      const points=Array.from(el.points,p=>map(matrix,p.x,p.y));
      if(el.localName==='polygon'&&points.length)points.push(points[0]);
      return points.slice(1).map((p,i)=>[points[i],p]);
    }
    if(el.localName==='circle'||el.localName==='ellipse'){
      const rx=bounds.width/2, ry=bounds.height/2;
      const cx=bounds.x+rx, cy=bounds.y+ry;
      if(!rx||!ry)return [];
      // Use the rendered radii and transform directly for these closed curves.
      const count=Math.min(768,Math.max(8,Math.ceil(Math.PI*Math.max(rx,ry)*scale)));
      const points=Array.from({length:count},(_,i)=>{
        const t=i*2*Math.PI/count;
        return map(matrix,cx+rx*Math.cos(t),cy+ry*Math.sin(t));
      });
      return edges(points);
    }
    const length=el.getTotalLength();
    if(!length)return [];
    const count=Math.min(768,Math.max(8,Math.ceil(length*scale/2)));
    const stride=length/count;
    const pointAt=t=>{
      const p=el.getPointAtLength(t);
      return map(matrix,p.x,p.y);
    };
    const result=[];
    // An SVG move command contributes no length. Split at jumps between subpaths.
    function sample(start,end,a,b,depth) {
      if(distance(a,b)<=(end-start)*scale+.02){result.push([a,b]);return;}
      if(depth===0)return;
      const mid=(start+end)/2, p=pointAt(mid);
      sample(start,mid,a,p,depth-1);
      sample(mid,end,p,b,depth-1);
    }
    let a=pointAt(0);
    for(let i=1;i<=count;i++){
      const b=pointAt(stride*i);
      sample(stride*(i-1),stride*i,a,b,5);
      a=b;
    }
    return result;
  }
  function labelBounds(el) {
    const matrix=el.getScreenCTM();
    const style=getComputedStyle(el);
    if(!matrix||!visible(el,style))return null;
    const rect=el.getBBox();
    if(!rect.width||!rect.height)return null;
    const quad=corners(matrix,rect);
    return {id:el.dataset.dgLabel||el.textContent.trim(),quad,box:sizes(quad),matrix,
      fontPx:parseFloat(style.fontSize)*Math.hypot(matrix.c,matrix.d),
      allow:new Set((el.dataset.dgAllow||'').split(/\s+/).filter(Boolean))};
  }
  function figureBounds(svg) {
    const matrix=svg.getScreenCTM(), view=svg.viewBox.baseVal;
    if(!matrix||!view.width||!view.height)return null;
    return corners(matrix,view);
  }
  function obstacles(svg,discover) {
    const selector=discover?geometrySelector:'[data-dg-obstacle]';
    return [...svg.querySelectorAll(selector)].flatMap((el,index)=>{
      if(el.closest('defs,clipPath,mask,marker,[data-dg-ignore]')||typeof el.getTotalLength!=='function')return [];
      const matrix=el.getScreenCTM(),style=getComputedStyle(el);
      if(!matrix||!visible(el,style))return [];
      const scale=matrixScale(matrix);
      const stroke=style.stroke!=='none'&&Number(style.strokeOpacity)>0?
        parseFloat(style.strokeWidth)*(style.vectorEffect==='non-scaling-stroke'?1:scale)/2:0;
      const filled=el.hasAttribute('data-dg-fill')&&style.fill!=='none'&&Number(style.fillOpacity)>0;
      if(!stroke&&!filled)return [];
      const inverse=filled?matrix.inverse():null;
      const bounds=el.getBBox();
      return [{
        id:el.dataset.dgObstacle||el.id||el.localName+'-'+(index+1),
        type:el.dataset.dgRole||(filled?'fill':'stroke'),stroke,
        box:sizes(corners(matrix,bounds)),segments:segments(el,matrix,scale,bounds),
        contains:inverse?point=>{
          const [x,y]=map(inverse,...point);
          return el.isPointInFill(new DOMPoint(x,y));
        }:null
      }];
    });
  }
  function markerEndpoint(edge,end) {
    if(edge.localName==='line'){
      const a=[localValue(edge,'x1'),localValue(edge,'y1')],b=[localValue(edge,'x2'),localValue(edge,'y2')];
      return {point:end?b:a,dx:b[0]-a[0],dy:b[1]-a[1]};
    }
    if(edge.localName==='path'){
      const length=edge.getTotalLength();
      if(!length||((edge.getAttribute('d')||'').match(/[mM]/g)||[]).length!==1)return null;
      const step=Math.min(length,.01);
      const a=edge.getPointAtLength(end?length-step:0),b=edge.getPointAtLength(end?length:step);
      return {point:end?[b.x,b.y]:[a.x,a.y],dx:b.x-a.x,dy:b.y-a.y};
    }
    return null;
  }
  function markerShapes(svg,edge,position,id) {
    const style=getComputedStyle(edge), url=style.getPropertyValue('marker-'+position);
    if(url==='none'||!visible(edge,style))return [];
    const fragment=url.match(/^url\(["']?([^"')]*#[^"')]+)["']?\)$/)?.[1];
    if(!fragment||position==='mid'||style.vectorEffect==='non-scaling-stroke')return null;
    const target=new URL(fragment,document.baseURI), source=new URL(document.baseURI);
    if(target.origin!==source.origin||target.pathname!==source.pathname||target.search!==source.search)return null;
    const marker=svg.querySelector('marker#'+CSS.escape(target.hash.slice(1)));
    const matrix=edge.getScreenCTM(), end=position==='end', endpoint=markerEndpoint(edge,end);
    if(!marker||!matrix||!endpoint||(!endpoint.dx&&!endpoint.dy))return null;
    const view=marker.viewBox.baseVal, aspect=marker.preserveAspectRatio.baseVal;
    const ref=[localValue(marker,'refX'),localValue(marker,'refY')];
    if(!view.width||!view.height||aspect.meetOrSlice===2)return null;
    const orientation=marker.getAttribute('orient');
    const angle=['auto','auto-start-reverse'].includes(orientation)?(Math.atan2(endpoint.dy,endpoint.dx)*180/Math.PI+
      (orientation==='auto-start-reverse'&&!end?180:0)):marker.orientAngle.baseVal.value;
    const unit=marker.getAttribute('markerUnits')==='userSpaceOnUse'?1:parseFloat(style.strokeWidth);
    const ratios=[localValue(marker,'markerWidth')/view.width,localValue(marker,'markerHeight')/view.height];
    const scales=aspect.align===1?ratios:ratios.map(()=>Math.min(...ratios));
    const transform=new DOMMatrix([matrix.a,matrix.b,matrix.c,matrix.d,matrix.e,matrix.f])
      .translate(...endpoint.point).rotate(angle).scale(...scales.map(n=>n*unit)).translate(-ref[0],-ref[1]);
    const inverse=transform.inverse(), scale=matrixScale(transform), shapes=[];
    for(const path of marker.children){
      if(path.localName!=='path'||path.transform.baseVal.numberOfItems)return null;
      const style=getComputedStyle(path), box=path.getBBox();
      if(style.display==='none'||style.visibility==='hidden'||Number(style.opacity)===0)continue;
      if(!box.width||!box.height)return null;
      const stroke=style.stroke!=='none'&&Number(style.strokeOpacity)>0?parseFloat(style.strokeWidth)/2:0;
      if(box.x-stroke<view.x-epsilon||box.y-stroke<view.y-epsilon||box.x+box.width+stroke>view.x+view.width+epsilon||
        box.y+box.height+stroke>view.y+view.height+epsilon)return null;
      const filled=style.fill!=='none'&&Number(style.fillOpacity)>0;
      if(!stroke&&!filled)continue;
      const outline=segments(path,transform,scale,box);
      if(!outline.length)return null;
      shapes.push({id,type:'arrowhead',stroke:stroke*scale,box:sizes(corners(transform,box)),
        segments:outline.map(segment=>({segment,box:sizes(segment)})),contains:filled?point=>{
          const [x,y]=map(inverse,...point);
          return path.isPointInFill(new DOMPoint(x,y));
        }:null});
    }
    return shapes;
  }
  function markers(svg,discover) {
    const shapes=[],unmeasured=[];
    const marked=svg.querySelectorAll('[marker-start],[marker-mid],[marker-end]');
    for(const [index,edge] of Array.from(marked).entries()){
      if(edge.closest('defs,clipPath,mask,marker,[data-dg-ignore]')||edge.hasAttribute('data-dg-markers-covered')||
        (!discover&&!edge.hasAttribute('data-dg-obstacle')))continue;
      const id=edge.dataset.dgObstacle||edge.id||edge.localName+'-marker-'+(index+1);
      for(const position of ['start','mid','end']){
        if(!edge.hasAttribute('marker-'+position))continue;
        const shape=markerShapes(svg,edge,position,id+'-'+position);
        if(shape)shapes.push(...shape);
        else unmeasured.push(id+'-'+position);
      }
    }
    return {shapes,unmeasured};
  }
  function collisions(label,boundary,shapes,earlier,gap) {
    const issues=[];
    const add=(kind,withId)=>issues.push({kind,label:label.id,with:withId});
    if(boundary&&!label.allow.has('boundary')&&!label.quad.every(p=>inside(p,boundary)))add('boundary','viewBox');
    for(const shape of shapes){
      if(label.allow.has(shape.id)||!boxesNear(label.box,shape.box,shape.stroke+gap))continue;
      if(shape.contains&&label.quad.some(shape.contains))add(shape.type,shape.id);
      else if(shape.segments.some(segment=>segmentHits(segment,label.quad,shape.stroke+gap)))add(shape.type,shape.id);
    }
    for(const other of earlier){
      if(!label.allow.has(other.id)&&!other.allow.has(label.id)&&
         boxesNear(label.box,other.box,gap)&&quadsHit(label.quad,other.quad,gap))add('label',other.id);
    }
    return issues;
  }
  function audit(svg,{discover=false,gap=.55}={}) {
    const boundary=figureBounds(svg);
    if(!boundary)return {measured:false,labels:[],issues:[],unmeasured:['viewBox']};
    const marked=markers(svg,discover);
    const shapes=[...obstacles(svg,discover),...marked.shapes], labels=[], issues=[];
    const nodes=svg.querySelectorAll(discover?'text':'text[data-dg-label]');
    for(const node of nodes){
      if(node.closest('defs,clipPath,mask,marker,[data-dg-ignore]'))continue;
      const label=labelBounds(node);
      if(!label)continue;
      issues.push(...collisions(label,boundary,shapes,labels,gap));
      labels.push(label);
    }
    return {measured:true,labels:labels.map(({id,fontPx,box})=>({id,fontPx,box})),issues,unmeasured:marked.unmeasured};
  }
  function offsets(direction,font) {
    const n=distance(direction,[0,0]);
    const [x,y]=n?direction.map(v=>v/n):[0,-1];
    const swing=[0,-.28,.28,-.56,.56,-.85,.85];
    const rise=font*.21;
    return [font*.69,font*.9,font*1.12,font*1.4,font*1.72,font*2.08,font*2.55].flatMap(r=>
      swing.map(t=>[x*r-y*t*(r+rise),y*r+x*t*(r+rise)]))
      .sort((a,b)=>Math.hypot(...a)-Math.hypot(...b));
  }
  function place(svg,placements,{gap=1.5}={}) {
    const fragment=document.createDocumentFragment();
    for(const {label,anchor} of placements){
      label.setAttribute('x',anchor[0]);
      label.setAttribute('y',anchor[1]);
      fragment.append(label);
    }
    svg.append(fragment);
    const shapes=[...obstacles(svg,false),...markers(svg,false).shapes], boundary=figureBounds(svg), placed=[];
    const origins=placements.map(({label})=>labelBounds(label));
    for(const [index,{label,anchor,direction,candidates,optional,neighborPoints}] of placements.entries()){
      const origin=origins[index];
      if(!origin)continue;
      const font=parseFloat(getComputedStyle(label).fontSize);
      const trials=candidates||(Array.isArray(direction?.[0])
        ? direction.flatMap(heading=>offsets(heading,font)).sort((a,b)=>Math.hypot(...a)-Math.hypot(...b))
        : offsets(direction,font));
      let best=null;
      for(const [x,y] of trials){
        const {a,b,c,d}=origin.matrix;
        const dx=a*x+c*y, dy=b*x+d*y;
        const quad=origin.quad.map(([px,py])=>[px+dx,py+dy]);
        const box={...origin,quad,box:sizes(quad)};
        const count=collisions(box,boundary,shapes,placed,gap).length;
        const position=[anchor[0]+x,anchor[1]+y];
        const nearNeighbor=neighborPoints?.some(point=>distance(position,point)+epsilon<Math.hypot(x,y));
        // Among equally clear placements, keep the label nearest to its own point.
        const rank=count*2+Number(!!nearNeighbor);
        if(!best||rank<best.rank)best={position,count,rank,box};
        if(rank===0)break;
      }
      if(!best)continue;
      // A reference tick may keep its mark without repeating a number.
      if(optional&&best.count){label.remove();continue;}
      placed.push({...best.box,label,position:best.position});
    }
    for(const {label,position:[x,y]} of placed){
      label.setAttribute('x',x);
      label.setAttribute('y',y);
    }
  }
  function canvasLabel(ctx,text,x,y) {
    const m=ctx.measureText(text), rect=ctx.canvas.getBoundingClientRect();
    const transform=ctx.getTransform(), sx=rect.width/ctx.canvas.width, sy=rect.height/ctx.canvas.height;
    const screen={a:transform.a*sx,b:transform.b*sy,c:transform.c*sx,d:transform.d*sy,
      e:rect.left+transform.e*sx,f:rect.top+transform.f*sy};
    return corners(screen,{x:x-m.actualBoundingBoxLeft,y:y-m.actualBoundingBoxAscent,
      width:m.actualBoundingBoxLeft+m.actualBoundingBoxRight,height:m.actualBoundingBoxAscent+m.actualBoundingBoxDescent});
  }
  function responsive(svg,draw) {
    const probe=document.createElement('span');
    probe.className='diagramguard-font-probe';probe.setAttribute('aria-hidden','true');
    svg.after(probe);
    let signature='', mounted=svg.isConnected, fontsReady=false;
    const refresh=(force=false)=>{
      if(!svg.isConnected){if(mounted)observer.disconnect();return;}
      mounted=true;
      if(!fontsReady)return;
      const width=svg.clientWidth;
      if(!width)return;
      const rem=probe.getBoundingClientRect().width||16;
      const size=width+':'+rem;
      if(size===signature&&!force)return;
      signature=size;
      draw(width,rem);
      svg.setAttribute('data-dg-ready','');
    };
    let scheduled=false;
    const observer=new ResizeObserver(()=>{
      if(scheduled)return;
      scheduled=true;
      // Changing the viewBox can change the height being observed.
      requestAnimationFrame(()=>{
        scheduled=false;
        refresh();
      });
    });
    observer.observe(svg);
    observer.observe(probe);
    document.fonts.ready.then(()=>{
      fontsReady=true;
      refresh(true);
    });
    return ()=>refresh(true);
  }
  window.TriggleDiagramGuard=Object.freeze({audit,place,canvasLabel,responsive});
})();
