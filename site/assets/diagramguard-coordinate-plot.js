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

  function drawGrid(svg, toPlot, bounds, step) {
    const labels = [...svg.querySelectorAll('text')].map(node=>node.getBBox());
    const [left,bottom] = toPlot(bounds.xMin,bounds.yMin);
    const [right,top] = toPlot(bounds.xMax,bounds.yMax);
    const group = shape('g',{'aria-hidden':'true',stroke:grid,'stroke-width':'.8'});
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
        if (from > cursor) group.append(line(point(cursor),point(Math.min(from,end)),{}));
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
    const {points,outlines=[],segments=[],guides=[],circle,rightAngle,directions={},edgeDirections={},insideLabels='',associateLabels='',
      axes=true,showOrigin=true,fullAxes=false,labelNegativeAxes=true,compactAxes=false,quadrants=false,projections=false,pointNames=true}=config;
    const xy = Object.values(points);
    const xs = xy.map(([x])=>x);
    const ys = xy.map(([,y])=>y);
    if (circle) {
      const [[x,y],radius] = circle;
      xs.push(x-radius,x+radius);
      ys.push(y-radius,y+radius);
    }
    const axisReach = compactAxes ? 0 : 3;
    const xMin = (fullAxes ? Math.min(-axisReach,...xs) : Math.min(...xs))-(axes ? 1 : 0);
    const xMax = (fullAxes ? Math.max(axisReach,...xs) : axes && xMin<0 ? Math.max(0,...xs) : Math.max(...xs))+(axes ? 1 : 0);
    const yMin = axes ? Math.min(0,...ys)-1 : Math.min(...ys);
    const yMax = (axes ? Math.max(0,...ys) : Math.max(...ys))+(axes ? 1 : 0);
    const inset = rem*(projections ? 1.3 : 1.12);
    const verticalInset = rem*1.45;
    const verticalRatio = projections || quadrants ? 1 : axes ? .72 : .88;
    const scale = Math.min((width-2*inset)/(xMax-xMin),width*verticalRatio/(yMax-yMin));
    const edgeLabels = projections && scale<rem*1.18;
    const height = Math.ceil((yMax-yMin)*scale+2*verticalInset);
    const originX = (width-(xMax-xMin)*scale)/2-xMin*scale;
    const originY = verticalInset+yMax*scale;
    const toPlot = (x,y) => [originX+x*scale,originY-y*scale];
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
    for (const names of segments) edges.set([...names].sort().join(''),[names,indigo,1.4]);
    for (const [index,[names,color]] of outlines.entries())
      [...names].forEach((id,i)=>{
        const edge = id+names[(i+1)%names.length];
        // Later outlines own any shared edges so the highlighted boundary remains continuous.
        edges.set([...edge].sort().join(''),[edge,color,index ? 2 : 1.65]);
      });

    const placements = [];
    const secondaryTicks = [];
    function addArrow(id,tip,[dx,dy],showLabel=true) {
      const [x,y] = tip;
      const arrow = [[x-5*dx-2.5*dy,y-5*dy+2.5*dx],tip,[x-5*dx+2.5*dy,y-5*dy-2.5*dx]];
      svg.append(
        shape('polyline',{points:arrow.map(point=>point.join(',')).join(' '),fill:'none',stroke:axis,
          'stroke-width':'1.1','data-dg-obstacle':id+'-arrow'}));
      if (!showLabel) return;
      let candidates;
      if (edgeLabels && id==='X') candidates = [[.78*rem,-.21*rem]];
      if (id==='X′') {
        // Wider fallback fonts can use the space above or below the arrow while keeping the axis association.
        candidates = [[-.69,0],[-.4,-.78],[-.4,.78],[0,-.97],[0,.97],[.2,-1.08],[.2,1.08]]
          .map(([x,y])=>[x*rem,y*rem]);
      }
      placements.push({label:text(id,axis),anchor:tip,direction:[dx,dy],candidates});
    }
    function addAxes(id,start,end,direction) {
      svg.append(line(start,end,{stroke:axis,'stroke-width':'1.1','data-dg-obstacle':id+'-axis'}));
      addArrow(id,end,direction);
      if (fullAxes) addArrow(id+'′',start,direction.map(value=>-value),labelNegativeAxes);
    }
    if (axes) addAxes('X',toPlot(xMin,0),toPlot(xMax,0),[1,0]);
    if (axes && xMin<0) addAxes('Y',toPlot(0,yMin),toPlot(0,yMax),[0,-1]);
    if (projections) drawProjections(svg,points,toPlot,{width,yMin,yMax},edgeLabels,rem,placements,secondaryTicks);
    if (quadrants) {
      const names = ['I','II','III','IV'];
      const centers = [[xMax,yMax],[xMin,yMax],[xMin,yMin],[xMax,yMin]];
      centers.forEach(([x,y],index)=>{
        const anchor = toPlot(x*.53,y*.55);
        const candidates = [[0,0], ...[[.74,.41],[.72,.69],[.48,.76],[.39,.63]].map(([fx,fy])=>{
          const [px,py]=toPlot(x*fx,y*fy);
          return [px-anchor[0],py-anchor[1]];
        })];
        placements.push({label:text(names[index],axis),anchor,candidates});
      });
    }
    if (axes && xMin<0 && showOrigin) {
      const aroundOrigin = [[-1,1],[1,1],[-1,-1],[1,-1]];
      const candidates = [.57,.68,.79,.9,1.05].flatMap(offset=>
        aroundOrigin.map(([x,y])=>[x*offset*rem,y*offset*rem]));
      placements.push({label:text('O',axis),anchor:toPlot(0,0),candidates});
    }

    for (const [names,color,weight,dashes] of edges.values()) {
      const [a,b] = names;
      svg.append(line(projected[a],projected[b],{stroke:color,'stroke-width':weight,
        'stroke-linecap':'round','data-dg-obstacle':a+b,'data-dg-edge':a+b,
        ...(dashes?{'stroke-dasharray':dashes}:{})}));
    }
    if (rightAngle) {
      const [a,vertex,b] = [...rightAngle].map(id=>projected[id]);
      const offsets = [a,b].map(([x,y])=>{
        const dx=x-vertex[0],dy=y-vertex[1];
        const length=Math.hypot(dx,dy);
        const ratio=Math.min(8/length,1/3);
        return [dx*ratio,dy*ratio];
      });
      const [[ax,ay],[bx,by]]=offsets;
      const [x,y]=vertex;
      svg.append(shape('polyline',{points:`${x+ax},${y+ay} ${x+ax+bx},${y+ay+by} ${x+bx},${y+by}`,
        fill:'none',stroke:axis,'stroke-width':1.25,'data-dg-obstacle':'right-angle'}));
    }
    const center = toPlot((Math.min(...xs)+Math.max(...xs))/2,(Math.min(...ys)+Math.max(...ys))/2);
    const innerCenter = [...insideLabels].reduce(([x,y],id)=>[
      x+projected[id][0]/insideLabels.length,y+projected[id][1]/insideLabels.length
    ],[0,0]);
    for (const [id,anchor] of Object.entries(projected)) {
      const [cx,cy] = anchor;
      svg.append(shape('circle',{cx,cy,r:3.1,fill:ink,'data-dg-obstacle':'point-'+id,
        'data-dg-fill':'','data-dg-point':id}));
      if (!pointNames) continue;
      const label = text(id,ink);
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

    guard.place(svg,[...placements,...secondaryTicks]);
    if (axes) drawGrid(svg,toPlot,{xMin,xMax,yMin,yMax},projections ? 1 : Math.max(1,Math.ceil(rem*.68/scale)));
  }

  function drawProjections(svg, points, project, bounds, edgeLabels, rem, placements, secondaryTicks) {
    const values = Object.values(points);
    for (const [id,xy] of Object.entries(points)) {
      const [x,y] = xy;
      for (const [name,anchor] of [['x',[x,0]],['y',[0,y]]]) {
        svg.append(line(project(...xy),project(...anchor),{stroke:indigo,'stroke-width':'1.4',
          'stroke-dasharray':'4 3','data-dg-obstacle':id+'-'+name+'-guide'}));
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
        if (edgeLabels) {
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
    const plan = plotsById.get(id);
    if (!plan) return false;
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
        heading.textContent = plot.heading;
        figure.append(heading);
      }
      const svg = shape('svg',{class:'diagramguard-svg diagramguard-coordinate',role:'img',
        'aria-label':plot.heading || description});
      figure.append(svg);
      if (plot.key!==false) {
        const key = document.createElement('span');
        key.className = 'diagramguard-coordinate-key';
        key.setAttribute('role','list');
        key.setAttribute('aria-label',lang==='ta' ? 'ஆயத்தொலைகள்' : 'Coordinates');
        for (const [name,[x,y]] of Object.entries(plot.points)) {
          const entry = document.createElement('span');
          entry.setAttribute('role','listitem');
          entry.textContent = `${name} (${number(x)}, ${number(y)})`;
          key.append(entry);
        }
        figure.append(key);
      }
      guard.responsive(svg,(width,rem)=>draw(svg,plot,width,rem));
    }
    return true;
  }

  window.TriggleCoordinateFigures = Object.freeze({register,mount});
})();
