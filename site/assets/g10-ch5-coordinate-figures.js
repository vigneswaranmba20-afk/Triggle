/* Grade 10 Exercise 5.1. Plot the source coordinates at one scale on both axes. */
(() => {
  'use strict';
  const guard = window.TriggleDiagramGuard;
  const svgNS = 'http://www.w3.org/2000/svg';
  const ink = '#24203c';
  const axis = '#5c566e';
  const grid = '#dedbe4';
  const indigo = '#443878';
  const rust = '#963f1b';
  const teal = '#166353';

  const shared = {A:[-5,3], B:[-4,-2], C:[2,-1], D:[1,3], E:[1.5,1], F:[-2,3], G:[-4.5,.5]};
  const partition = highlight => ({
    points:shared, outlines:[['ABCD',indigo,.07], [highlight,rust,.23]],
    segments:['GF','FE','EG'], directions:{F:[0,-1], E:[1,0], G:[-1,-.6]}, showOrigin:false
  });
  const plots = {
    'q5-i': {points:{A:[-9,-2], B:[-8,-4], C:[1,-3], D:[2,2]}, outlines:[['ABCD',teal,.12]]},
    'q5-ii': {points:{A:[-9,0], B:[-6,-3], C:[-1,-2], D:[-8,6]}, outlines:[['ABCD',indigo,.12]]},
    'q8': {
      points:{A:[7,7], B:[15,7], C:[12,1], P:[11,7], Q:[13.5,4], R:[9.5,4]},
      outlines:[['ABC',teal,.09], ['PQR',rust,.21]],
      directions:{A:[-1,-1], B:[1,-1], C:[1,1], P:[0,-1], Q:[1,0], R:[-1,0]}
    },
    'q9': {
      points:{A:[-4,-8], B:[8,-4], C:[6,10], D:[-10,6], E:[-3,-5], F:[6,-2], G:[3,7], H:[-6,4]},
      outlines:[['ABCD',indigo,.11], ['EFGH',teal,.24]],
      insideLabels:'EFGH', axes:false
    },
    'q11-i': partition('AGF'),
    'q11-ii': partition('FED'),
    'q11-iii': partition('BCEG')
  };

  function shape(name, attrs) {
    const node = document.createElementNS(svgNS,name);
    for (const [key,value] of Object.entries(attrs)) node.setAttribute(key,value);
    return node;
  }
  const line = ([x1,y1],[x2,y2],attrs) => shape('line',{x1,y1,x2,y2,...attrs});
  const text = (id,color) => {
    const node = shape('text',{'text-anchor':'middle',dy:'.35em',fill:color,
      'data-dg-label':id,'data-dg-font':'vertex'});
    node.textContent = id;
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

  function draw(svg, {points,outlines,segments=[],directions={},insideLabels='',axes=true,showOrigin=true}, width, rem) {
    const xy = Object.values(points);
    const xs = xy.map(([x])=>x);
    const ys = xy.map(([,y])=>y);
    const xMin = Math.min(...xs)-(axes ? 1 : 0);
    const xMax = Math.max(...xs, ...(axes && xMin<0 ? [0] : []))+(axes ? 1 : 0);
    const yMin = axes ? Math.min(0,...ys)-1 : Math.min(...ys);
    const yMax = Math.max(...ys)+(axes ? 1 : 0);
    const inset = rem*1.12;
    const verticalInset = rem*1.45;
    const scale = Math.min((width-2*inset)/(xMax-xMin),width*(axes ? .72 : .88)/(yMax-yMin));
    const height = Math.ceil((yMax-yMin)*scale+2*verticalInset);
    const originX = (width-(xMax-xMin)*scale)/2-xMin*scale;
    const originY = verticalInset+yMax*scale;
    const toPlot = (x,y) => [originX+x*scale,originY-y*scale];
    const projected = Object.fromEntries(Object.entries(points).map(([id,[x,y]])=>[id,toPlot(x,y)]));
    svg.setAttribute('viewBox',`0 0 ${width} ${height}`);
    svg.replaceChildren();

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
    for (const names of segments) edges.set([...names].sort().join(''),[names,indigo,1.4]);
    for (const [index,[names,color]] of outlines.entries())
      [...names].forEach((id,i)=>{
        const edge = id+names[(i+1)%names.length];
        // Later outlines own any shared edges so the highlighted boundary remains continuous.
        edges.set([...edge].sort().join(''),[edge,color,index ? 2 : 1.65]);
      });

    const placements = [];
    function addAxes(id, start, end, direction) {
      const [x,y] = end;
      const arrow = direction[0] ? [[x-5,y-2.5],end,[x-5,y+2.5]] : [[x-2.5,y+5],end,[x+2.5,y+5]];
      svg.append(line(start,end,{stroke:axis,'stroke-width':'1.1','data-dg-obstacle':id+'-axis'}),
        shape('polyline',{points:arrow.map(point=>point.join(',')).join(' '),fill:'none',stroke:axis,
          'stroke-width':'1.1','data-dg-obstacle':id+'-arrow'}));
      placements.push({label:text(id,axis),anchor:end,direction});
    }
    if (axes) addAxes('X',toPlot(xMin,0),toPlot(xMax,0),[1,0]);
    if (axes && xMin<0) addAxes('Y',toPlot(0,yMin),toPlot(0,yMax),[0,-1]);
    if (axes && xMin<0 && showOrigin) {
      const quadrants = [[-1,1],[1,1],[-1,-1],[1,-1]];
      const candidates = [.57,.68,.79,.9,1.05].flatMap(offset=>
        quadrants.map(([x,y])=>[x*offset*rem,y*offset*rem]));
      placements.push({label:text('O',axis),anchor:toPlot(0,0),candidates});
    }

    for (const [names,color,weight] of edges.values()) {
      const [a,b] = names;
      svg.append(line(projected[a],projected[b],{stroke:color,'stroke-width':weight,
        'stroke-linecap':'round','data-dg-obstacle':a+b,'data-dg-edge':a+b}));
    }
    const center = toPlot((Math.min(...xs)+Math.max(...xs))/2,(Math.min(...ys)+Math.max(...ys))/2);
    const innerCenter = [...insideLabels].reduce(([x,y],id)=>[
      x+projected[id][0]/insideLabels.length,y+projected[id][1]/insideLabels.length
    ],[0,0]);
    for (const [id,anchor] of Object.entries(projected)) {
      const [cx,cy] = anchor;
      svg.append(shape('circle',{cx,cy,r:3.1,fill:ink,'data-dg-obstacle':'point-'+id,
        'data-dg-fill':'','data-dg-point':id}));
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
        const direction = directions[id] || [cx-center[0],cy-center[1]];
        placements.push({label,anchor,direction});
      }
    }

    guard.place(svg,placements);
    if (axes) drawGrid(svg,toPlot,{xMin,xMax,yMin,yMax},Math.max(1,Math.ceil(rem*.68/scale)));
  }

  function mount(container,id,description,lang) {
    const prefix = 'c10-5-ex5-1-';
    const plot = id.startsWith(prefix) && plots[id.slice(prefix.length)];
    if (!plot) return false;
    const figure = document.createElement('span');
    figure.className = 'diagramguard-figure';
    const svg = shape('svg',{class:'diagramguard-svg diagramguard-coordinate',role:'img',
      'aria-label':description,'aria-hidden':'true'});
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
    // The inline expand button supplies its own accessible name. The enlarged dialog exposes the plot and key.
    if (!container.closest('button')) svg.removeAttribute('aria-hidden');
    else key.setAttribute('aria-hidden','true');
    figure.append(svg,key);
    container.replaceChildren(figure);
    guard.responsive(svg,(width,rem)=>draw(svg,plot,width,rem));
    return true;
  }

  window.TriggleCoordinateFigures = Object.freeze({mount});
})();
