/* VER DiagramGuard coordinate plots share a single scale on both axes. */
(() => {
  'use strict';
  const guard = window.TriggleDiagramGuard;
  const svgNS = 'http://www.w3.org/2000/svg';
  const ink = '#24203c';
  const axis = '#5c566e';
  const grid = '#dedbe4';
  const indigo = '#443878';

  const plotsById = new Map();
  const mountedFigures = new WeakMap();

  function register(prefix, plots) {
    for (const [suffix,plot] of Object.entries(plots)) plotsById.set(prefix+suffix,plot);
  }

  function shape(name, attrs) {
    const node = document.createElementNS(svgNS,name);
    for (const [key,value] of Object.entries(attrs)) node.setAttribute(key,value);
    return node;
  }
  const line = ([x1,y1],[x2,y2],attrs) => shape('line',{x1,y1,x2,y2,...attrs});
  const text = (id,color,font='vertex',content=id) => {
    const node = shape('text',{'text-anchor':'middle',dy:'.35em',fill:color,
      'data-dg-label':id,'data-dg-font':font});
    node.textContent = content;
    return node;
  };
  const number = value => String(value).replace('-','−');

  function clipLine([a,b,c],{xMin,xMax,yMin,yMax}) {
    const tolerance=1e-9;
    const points=[];
    if (b) for (const x of [xMin,xMax]) {
      const y=(-a*x-c)/b;
      if(y>=yMin-tolerance&&y<=yMax+tolerance)points.push([x,Math.max(yMin,Math.min(yMax,y))]);
    }
    if (a) for (const y of [yMin,yMax]) {
      const x=(-b*y-c)/a;
      if(x>=xMin-tolerance&&x<=xMax+tolerance)points.push([Math.max(xMin,Math.min(xMax,x)),y]);
    }
    const ends=points.filter(([x,y],index)=>!points.slice(0,index).some(([u,v])=>Math.hypot(x-u,y-v)<tolerance));
    return ends.length===2?ends:null;
  }

  function drawGrid(svg, toPlot, bounds, step, labels=[...svg.querySelectorAll('text')].map(node=>node.getBBox())) {
    const [left,bottom] = toPlot(bounds.xMin,bounds.yMin);
    const [right,top] = toPlot(bounds.xMax,bounds.yMax);
    const group = shape('g',{'aria-hidden':'true','data-dg-reference-grid':'',stroke:grid,'stroke-width':'.8'});
    // Break only reference grid lines around labels. Axes and geometric edges stay whole.
    function gridLine(fixed,start,end,vertical) {
      const gaps = labels.flatMap(({x,y,width,height})=>{
        const [across,length] = vertical ? [x,width] : [y,height];
        const [along,extent] = vertical ? [y,height] : [x,width];
        return fixed >= across-3 && fixed <= across+length+3 ? [[along-3,along+extent+3]] : [];
      }).sort((a,b)=>a[0]-b[0]);
      const point = value => vertical ? [fixed,value] : [value,fixed];
      let cursor = start;
      for (const [from,to] of [...gaps,[end,end]]) {
        if (from > cursor) group.append(line(point(cursor),point(Math.min(from,end)),{'data-dg-grid-axis':vertical?'x':'y'}));
        cursor = Math.max(cursor,to);
        if (cursor >= end) break;
      }
    }
    for (let x=Math.ceil(bounds.xMin/step)*step;x<=bounds.xMax;x+=step)
      if (x!==0 || bounds.xMin>0) gridLine(toPlot(x,0)[0],top,bottom,true);
    for (let y=Math.ceil(bounds.yMin/step)*step;y<=bounds.yMax;y+=step)
      if (y!==0) gridLine(toPlot(0,y)[1],left,right,false);
    svg.prepend(group);
  }

  function draw(svg, config, width, rem) {
    const {points,outlines=[],segments=[],segmentColors={},guides=[],constructionPoints={},circle,rightAngle,rightAngles=[],analyticLines=[],bounds,
      directions={},edgeDirections={},insideLabels='',associateLabels='',
      axes=true,showOrigin=true,fullAxes=false,labelNegativeAxes=true,axisLabelDirections={},compactAxes=false,
      axisNames=['X','Y'],verticalAxis=false,activePoint,
      quadrants=false,projections=false,walk=false,pointNames=true,gridStep}=config;
    const xy = [...Object.values(points),...Object.values(constructionPoints)];
    const xs = xy.map(([x])=>x);
    const ys = xy.map(([,y])=>y);
    if (circle) {
      const [[x,y],radius] = circle;
      xs.push(x-radius,x+radius);
      ys.push(y-radius,y+radius);
    }
    const axisReach = compactAxes ? 0 : 3;
    const xMin = bounds?.xMin ?? ((fullAxes ? Math.min(-axisReach,...xs) : Math.min(...xs))-(axes ? 1 : 0));
    const xMax = bounds?.xMax ?? ((fullAxes ? Math.max(axisReach,...xs) : axes && xMin<0 ? Math.max(0,...xs) : Math.max(...xs))+(axes ? 1 : 0));
    const yMin = bounds?.yMin ?? (axes ? Math.min(0,...ys)-1 : Math.min(...ys));
    const yMax = bounds?.yMax ?? ((axes ? Math.max(0,...ys) : Math.max(...ys))+(axes ? 1 : 0));
    const hasVerticalAxis=verticalAxis||xMin<0;
    const inset = rem*(projections ? 1.3 : 1.12);
    const verticalInset = rem*1.45;
    const verticalRatio = projections || quadrants ? 1 : axes ? .72 : .88;
    const scale = Math.min((width-2*inset)/(xMax-xMin),width*verticalRatio/(yMax-yMin));
    const edgeLabels = projections && scale<rem*1.18;
    const height = Math.ceil((yMax-yMin)*scale+2*verticalInset);
    const originX = (width-(xMax-xMin)*scale)/2-xMin*scale;
    const originY = verticalInset+yMax*scale;
    const toPlot = (x,y) => [originX+x*scale,originY-y*scale];
    const windowBounds={xMin,xMax,yMin,yMax};
    const projected = Object.fromEntries(Object.entries(points).map(([id,[x,y]])=>[id,toPlot(x,y)]));
    svg.setAttribute('viewBox',`0 0 ${width} ${height}`);
    svg.replaceChildren();

    if (circle) {
      const [center,radius] = circle;
      const [cx,cy] = toPlot(...center);
      svg.append(shape('circle',{cx,cy,r:radius*scale,fill:indigo,'fill-opacity':.07,stroke:indigo,
        'stroke-width':1.65,'data-dg-obstacle':'circumference','data-dg-circle':''}));
    }
    for (const [index,[names,color,opacity]] of outlines.entries()) {
      const region = shape('polygon',{points:[...names].map(id=>projected[id].join(',')).join(' '),
        fill:color,'fill-opacity':opacity,'data-dg-region':names});
      if (index) {
        region.setAttribute('data-dg-obstacle','region-'+names);
        region.setAttribute('data-dg-fill','');
      }
      svg.append(region);
    }
    const edges = new Map();
    for (const names of guides) edges.set([...names].sort().join(''),[names,axis,1.4,'4 3']);
    for (const names of segments) edges.set([...names].sort().join(''),[names,segmentColors[names]||indigo,1.4]);
    for (const [index,[names,color]] of outlines.entries())
      [...names].forEach((id,i)=>{
        const edge = id+names[(i+1)%names.length];
        // Later outlines own any shared edges so the highlighted boundary remains continuous.
        edges.set([...edge].sort().join(''),[edge,color,index ? 2 : 1.65]);
      });

    const placements = [];
    const quadrantPlacements = walk ? [] : placements;
    const secondaryTicks = [];
    for (const {id,coefficients,color=indigo,dashed=false} of analyticLines) {
      const visible=clipLine(coefficients,windowBounds);
      if(!visible)continue;
      const [start,end]=visible.map(point=>toPlot(...point));
      svg.append(line(start,end,{stroke:color,'stroke-width':1.65,'data-dg-obstacle':'line-'+id,'data-dg-analytic-line':id,
        ...(dashed?{'stroke-dasharray':'4 3'}:{})}));
    }
    function addArrow(id,tip,[dx,dy],showLabel=true) {
      const [x,y] = tip;
      const arrow = [[x-5*dx-2.5*dy,y-5*dy+2.5*dx],tip,[x-5*dx+2.5*dy,y-5*dy-2.5*dx]];
      svg.append(
        shape('polyline',{points:arrow.map(point=>point.join(',')).join(' '),fill:'none',stroke:axis,
          'stroke-width':'1.1','data-dg-obstacle':id+'-arrow'}));
      if (!showLabel) return;
      let candidates;
      if (edgeLabels && id===axisNames[0]) candidates = [[.78*rem,-.21*rem]];
      if (id==='X′') {
        // Wider fallback fonts can use the space above or below the arrow while keeping the axis association.
        candidates = [[-.69,0],[-.4,-.78],[-.4,.78],[0,-.97],[0,.97],[.2,-1.08],[.2,1.08]]
          .map(([x,y])=>[x*rem,y*rem]);
      }
      placements.push({label:text(id,axis),anchor:tip,direction:axisLabelDirections[id]||[dx,dy],candidates});
    }
    function addAxes(id,start,end,direction) {
      svg.append(line(start,end,{stroke:axis,'stroke-width':'1.1','data-dg-obstacle':id+'-axis'}));
      addArrow(id,end,direction);
      if (fullAxes) addArrow(id+'′',start,direction.map(value=>-value),labelNegativeAxes);
    }
    if (axes) addAxes(axisNames[0],toPlot(xMin,0),toPlot(xMax,0),[1,0]);
    if (axes && hasVerticalAxis) addAxes(axisNames[1],toPlot(0,yMin),toPlot(0,yMax),[0,-1]);
    if (projections) drawProjections(svg,points,toPlot,{width,yMin,yMax},edgeLabels,rem,placements,secondaryTicks,walk);
    if (quadrants) {
      const names = ['I','II','III','IV'];
      const centers = [[xMax,yMax],[xMin,yMax],[xMin,yMin],[xMax,yMin]];
      centers.forEach(([x,y],index)=>{
        const anchor = toPlot(x*.53,y*.55);
        const nearby = [[.74,.41],[.72,.69],[.48,.76],[.39,.63]];
        if (walk) nearby.push(...[.39,.53,.72,.88,1.04].flatMap(fx=>[.75,.91,1.08,1.22].map(fy=>[fx,fy])));
        const candidates = [[0,0], ...nearby.map(([fx,fy])=>{
          const [px,py]=toPlot(x*fx,y*fy);
          return [px-anchor[0],py-anchor[1]];
        })];
        if (walk) candidates.sort((a,b)=>Math.hypot(...a)-Math.hypot(...b));
        quadrantPlacements.push({label:text(names[index],axis),anchor,candidates});
      });
    }
    if (axes && hasVerticalAxis && showOrigin) {
      const aroundOrigin = [[-1,1],[1,1],[-1,-1],[1,-1]];
      const candidates = [.57,.68,.79,.9,1.05].flatMap(offset=>
        aroundOrigin.map(([x,y])=>[x*offset*rem,y*offset*rem]));
      placements.push({label:text('O',axis),anchor:toPlot(0,0),candidates});
    }

    for (const [names,color,weight,dashes] of edges.values()) {
      const [a,b] = names;
      const start=projected[a]??toPlot(...constructionPoints[a]);
      const end=projected[b]??toPlot(...constructionPoints[b]);
      svg.append(line(start,end,{stroke:color,'stroke-width':weight,
        'stroke-linecap':'round','data-dg-obstacle':a+b,'data-dg-edge':a+b,
        ...(dashes?{'stroke-dasharray':dashes}:{})}));
    }
    for (const [name,point] of Object.entries(constructionPoints)) {
      const [cx,cy]=toPlot(...point);
      svg.append(shape('circle',{cx,cy,r:3,fill:axis,'data-dg-construction-point':name,
        'data-dg-obstacle':'construction-'+name,'data-dg-fill':''}));
    }
    const angles=rightAngle?[rightAngle]:rightAngles;
    for(const [index,angle] of angles.entries()) {
      const [a,vertex,b] = [...angle].map(endpoint=>Array.isArray(endpoint)?toPlot(...endpoint):projected[endpoint]);
      const offsets = [a,b].map(([x,y])=>{
        const dx=x-vertex[0],dy=y-vertex[1];
        const length=Math.hypot(dx,dy);
        const ratio=Math.min(8/length,1/3);
        return [dx*ratio,dy*ratio];
      });
      const [[ax,ay],[bx,by]]=offsets;
      const [x,y]=vertex;
      svg.append(shape('polyline',{points:`${x+ax},${y+ay} ${x+ax+bx},${y+ay+by} ${x+bx},${y+by}`,
        fill:'none',stroke:axis,'stroke-width':1.25,'data-dg-obstacle':index?'right-angle-'+(index+1):'right-angle'}));
    }
    const center = toPlot((Math.min(...xs)+Math.max(...xs))/2,(Math.min(...ys)+Math.max(...ys))/2);
    const innerCenter = [...insideLabels].reduce(([x,y],id)=>[
      x+projected[id][0]/insideLabels.length,y+projected[id][1]/insideLabels.length
    ],[0,0]);
    for (const [id,anchor] of Object.entries(projected)) {
      const [cx,cy] = anchor;
      const color=id===activePoint?'#13594e':ink;
      svg.append(shape('circle',{cx,cy,r:id===activePoint?4.25:3.1,fill:color,'data-dg-obstacle':'point-'+id,
        'data-dg-fill':'','data-dg-point':id}));
      if (!pointNames) continue;
      const label = text(id,color);
      if (insideLabels.includes(id)) {
        // Keep pool labels close to their corners with equal clearance inside the pool.
        label.setAttribute('data-dg-allow','region-'+insideLabels);
        const towardCenter = [innerCenter[0]-cx,innerCenter[1]-cy];
        const length = Math.hypot(...towardCenter);
        const candidates = [1.1,1.22,1.34,1.46].map(offset=>
          towardCenter.map(value=>value*Math.min(.62,offset*rem/length)));
        placements.push({label,anchor,candidates});
      } else {
        const direction = (edgeLabels && edgeDirections[id]) || directions[id] || [cx-center[0],cy-center[1]];
        const neighborPoints = associateLabels.includes(id) ? Object.values(projected).filter(point=>point!==anchor) : undefined;
        placements.push({label,anchor,direction,neighborPoints});
      }
    }

    if (walk) placements.push(...quadrantPlacements);
    guard.place(svg,[...placements,...secondaryTicks],walk&&quadrants?{gap:rem*.18}:undefined);
    if (axes) drawGrid(svg,toPlot,{xMin,xMax,yMin,yMax},gridStep??(projections ? 1 : Math.max(1,Math.ceil(rem*.68/scale))));
  }

  function drawProjections(svg, points, project, bounds, edgeLabels, rem, placements, secondaryTicks, walk) {
    const values = Object.values(points);
    for (const [id,xy] of Object.entries(points)) {
      const [x,y] = xy;
      const guides=walk ? [['x',[0,0],[x,0]],['y',[x,0],xy]] : [['x',xy,[x,0]],['y',xy,[0,y]]];
      for (const [name,from,to] of guides) {
        if (walk && from[0]===to[0] && from[1]===to[1]) continue;
        svg.append(line(project(...from),project(...to),{stroke:walk?'#13594e':indigo,
          'stroke-width':walk?'2':'1.4',...(walk&&name==='x'?{}:{'stroke-dasharray':'4 3'}),
          'data-dg-obstacle':id+'-'+name+'-guide'}));
      }
    }
    for (const [i,name] of [[0,'x'],[1,'y']]) {
      const ticks = new Map(values.map(xy=>[xy[i],Math.sign(xy[1-i])]));
      const min = Math.min(...ticks.keys()), max = Math.max(...ticks.keys());
      for (let value=min;value<=max;value++) {
        if (!value) continue;
        const anchor = i ? project(0,value) : project(value,0);
        const options = i ? [1,0] : [0,1];
        const [x,y] = anchor;
        const [dx,dy] = options;
        const id = name+'-tick-'+value;
        const side = ticks.get(value) || (i ? -Math.sign(value) : Math.sign(value));
        svg.append(line([x-2*dx,y-2*dy],[x+2*dx,y+2*dy],{stroke:axis,'stroke-width':'1.1',
          'data-dg-obstacle':id}));
        const required = ticks.has(value);
        if (!required && edgeLabels) continue;
        const label = text(id,axis,'secondary',number(value));
        const away = (i ? -1 : 1)*side;
        if (walk) {
          // Keep each marked value next to its axis and opposite the route when there is room.
          const signs = bounds.yMin===0 ? [i?-1:1] : [away,-away];
          const offsets = [.65,.83,1.02,1.24].flatMap(size=>signs.map(sign=>size*rem*sign));
          const queue = required ? placements : secondaryTicks;
          queue.push({label,anchor,optional:!required,candidates:offsets.map(distance=>[dx*distance,dy*distance])});
        } else if (edgeLabels) {
          // Follow the point's grid line to its nearest edge when the axis is crowded.
          if (i) {
            // Anchor the outer edge of the number so a wider minus glyph cannot clip.
            const left = away>0;
            label.setAttribute('text-anchor',left?'start':'end');
            const gutter = rem*.19;
            placements.push({label,anchor:[left?gutter:bounds.width-gutter,y],candidates:[[0,0]]});
          } else {
            const edge = project(value,away>0?bounds.yMax:bounds.yMin);
            placements.push({label,anchor:edge,candidates:[[0,-.71*rem*away]]});
          }
        } else {
          const signs = required ? [away] : [away,-away];
          const offsets = [.74,.91,1.08,1.35,1.62].flatMap(size=>signs.map(sign=>size*rem*sign));
          const queue = required ? placements : secondaryTicks;
          queue.push({label,anchor,optional:!required,candidates:offsets.map(distance=>[dx*distance,dy*distance])});
        }
      }
    }
  }

  function mount(container,id,description,lang) {
    const plan = typeof id==='string' ? plotsById.get(id) : id;
    if (!plan) return false;
    const font=getComputedStyle(container).getPropertyValue('--ver-font');
    const previous=mountedFigures.get(container);
    if(previous?.plan===plan&&previous.description===description&&previous.lang===lang&&previous.font===font&&
       previous.figure===container.firstElementChild)return true;
    const figure = document.createElement('span');
    figure.className = 'diagramguard-figure';
    const inline = Boolean(container.closest('button'));
    if (inline) figure.setAttribute('aria-hidden','true');
    const panels = Array.isArray(plan) ? plan : [plan];
    if (panels.length>1) {
      figure.setAttribute('role','group');
      figure.setAttribute('aria-label',description);
    }
    container.replaceChildren(figure);
    for (const plot of panels) {
      if (plot.heading) {
        const heading = document.createElement('span');
        heading.className = 'diagramguard-coordinate-heading';
        heading.textContent = typeof plot.heading==='string'?plot.heading:plot.heading[lang];
        figure.append(heading);
      }
      const svg = shape('svg',{class:'diagramguard-svg diagramguard-coordinate',role:'img',
        'aria-label':typeof plot.heading==='object'?plot.heading[lang]:plot.heading||description});
      figure.append(svg);
      if (plot.key!==false) {
        const key = document.createElement('span');
        key.className = 'diagramguard-coordinate-key';
        key.setAttribute('role','list');
        key.setAttribute('aria-label',lang==='ta' ? 'ஆயத்தொலைகள்' : 'Coordinates');
        for (const name of plot.keyPoints||Object.keys(plot.points)) {
          const [x,y]=plot.points[name];
          const meaning=plot.pointMeanings?.[name]?.[lang];
          const entry = document.createElement('span');
          entry.setAttribute('role','listitem');
          if(meaning)entry.className='diagramguard-named-point';
          entry.textContent = `${name}${meaning?' · '+meaning:''} (${number(x)}, ${number(y)})`;
          key.append(entry);
        }
        figure.append(key);
      }
      const equations=plot.analyticLines?.filter(line=>line.label);
      if(equations?.length) {
        const legend=document.createElement('span');
        legend.className='diagramguard-coordinate-legend';
        legend.setAttribute('role','list');
        legend.setAttribute('aria-label',lang==='ta'?'நேர்க்கோடுகள்':'Lines');
        for(const {label,color=indigo,dashed} of equations) {
          const entry=document.createElement('span');
          entry.setAttribute('role','listitem');
          const sample=document.createElement('span');
          sample.className='diagramguard-line-sample';
          sample.style.color=color;
          if(dashed)sample.dataset.dashed='';
          sample.setAttribute('aria-hidden','true');
          entry.append(sample,typeof label==='string'?label:label[lang]);
          legend.append(entry);
        }
        figure.append(legend);
      }
      guard.responsive(svg,(width,rem)=>draw(svg,plot,width,rem));
    }
    mountedFigures.set(container,{plan,description,lang,font,figure});
    return true;
  }

  window.TriggleCoordinateFigures = Object.freeze({register,mount,drawGrid});
})();
