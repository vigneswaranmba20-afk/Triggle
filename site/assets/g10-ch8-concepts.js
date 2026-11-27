/* Offline concept interactions for Grade 10 Statistics and Probability. */
(() => {
  'use strict';
  const namespace = 'http://www.w3.org/2000/svg';
  const element = (tag, text, parent) => {
    const node = document.createElement(tag);
    if (text) node.textContent = text;
    parent?.append(node);
    return node;
  };
  const vector = (tag, attributes, parent) => {
    const node = document.createElementNS(namespace, tag);
    for (const [name, value] of Object.entries(attributes)) node.setAttribute(name, value);
    parent?.append(node);
    return node;
  };
  const label = (svg, x, y, text, attributes = {}) => {
    const node = vector('text', {x, y, 'text-anchor': 'middle', ...attributes}, svg);
    node.textContent = text;
    return node;
  };
  const graphic = (host, title, height = 148) => vector('svg', {
    viewBox: `0 0 300 ${height}`, role: 'img', 'aria-label': title, class: 'g10ch8-graphic'
  }, host);
  const range = (from, to) => Array.from({length: to - from + 1}, (_, i) => from + i);
  const display = n => Number(n.toFixed(2)).toString();
  const stats = values => {
    const mean = values.reduce((total, x) => total + x, 0) / values.length;
    const variance = values.reduce((total, x) => total + (x - mean) ** 2, 0) / values.length;
    return {mean, variance, deviation: Math.sqrt(variance), range: Math.max(...values) - Math.min(...values)};
  };

  function control(host, name, options, initial, update) {
    const label = element('label', '', host);
    label.className = 'g10ch8-control';
    const nameNode = element('span', name, label);
    const numeric = options.length > 1 && options.every(([value, text], i) =>
      typeof value === 'number' && Number.isFinite(value) && String(value) === String(text) &&
      (i === 0 || value - options[i - 1][0] === options[1][0] - options[0][0])) &&
      options[1][0] > options[0][0];
    if (numeric) {
      label.classList.add('g10ch8-range-control');
      nameNode.className = 'g10ch8-control-name';
      const current = element('span', String(initial), label);
      current.className = 'g10ch8-range-value';
      current.setAttribute('aria-hidden', 'true');
      const slider = element('input', '', label);
      slider.type = 'range';
      slider.min = options[0][0];
      slider.max = options[options.length - 1][0];
      slider.step = options[1][0] - options[0][0];
      slider.value = initial;
      slider.className = 'g10ch8-range';
      slider.setAttribute('aria-label', name);
      const bounds = element('span', '', label);
      bounds.className = 'g10ch8-range-bounds';
      bounds.setAttribute('aria-hidden', 'true');
      element('span', String(slider.min), bounds);
      element('span', String(slider.max), bounds);
      slider.addEventListener('input', () => {
        current.textContent = slider.value;
        update();
      });
      return slider;
    }
    const select = element('select', '', label);
    for (const [value, text] of options) {
      element('option', text, select).value = value;
    }
    select.value = initial;
    select.addEventListener('change', update);
    return select;
  }

  function output(host) {
    const value = element('p', '', host);
    value.className = 'g10ch8-result';
    value.setAttribute('role', 'status');
    return value;
  }

  function dotPlot(host, title, meanLabel, [min, max]) {
    const svg = graphic(host, title, 126);
    svg.classList.add('diagramguard-svg');
    const legend = element('div', '', host);
    legend.className = 'g10ch8-legend diagramguard-coordinate-legend';
    const entry = element('span', '', legend);
    const sample = element('span', '', entry);
    sample.className = 'diagramguard-line-sample g10ch8-mean-sample';
    sample.dataset.dashed = '';
    sample.setAttribute('aria-hidden', 'true');
    const meanText = element('span', '', entry);
    const chartNumber = value => display(value).replace('-', '−');
    let model;
    let paintData;
    let waitingForFonts = false;
    const refresh = window.TriggleDiagramGuard.responsive(svg, (width, rem) => {
      svg.replaceChildren();
      const axes = vector('g', {}, svg);
      const marks = vector('g', {}, svg);
      const unit = 300 / width;
      const tickFont = .875 * rem * unit;
      const padding = 3 * unit;
      const ticks = range(0, 4).map(i => min + i * (max - min) / 4);
      const labels = ticks.map(value => {
        const name = chartNumber(value);
        const text = label(svg, 0, 0, name, {'data-dg-label': name});
        text.style.fontSize = tickFont + 'px';
        text.style.fontWeight = '500';
        return text;
      });
      const boxes = labels.map(text => text.getBBox());
      const insetLeft = Math.max(24, -boxes[0].x + padding);
      const insetRight = Math.max(24, boxes[4].x + boxes[4].width + padding);
      const x = value => insetLeft + (value - min) / (max - min) * (300 - insetLeft - insetRight);
      const ascent = Math.max(...boxes.map(box => -box.y));
      const descent = Math.max(...boxes.map(box => box.y + box.height));
      const rowHeight = ascent + descent + padding;
      const rightEdges = [];
      vector('line', {x1: x(min), x2: x(max), y1: 90, y2: 90, class: 'g10ch8-axis'}, axes);
      for (const [index, value] of ticks.entries()) {
        const anchor = x(value);
        const box = boxes[index];
        let row = rightEdges.findIndex(edge => edge + padding <= anchor + box.x);
        if (row < 0) row = rightEdges.length;
        rightEdges[row] = anchor + box.x + box.width;
        vector('line', {x1: anchor, x2: anchor, y1: 90, y2: 97, class: 'g10ch8-axis'}, axes);
        labels[index].setAttribute('x', anchor);
        labels[index].setAttribute('y', 97 + padding + ascent + row * rowHeight);
      }
      svg.setAttribute('viewBox', `0 0 300 ${97 + padding + rightEdges.length * rowHeight}`);
      paintData = () => {
        marks.replaceChildren();
        if (!model) return;
        const {values, mean} = model;
        const meanX = x(mean);
        vector('line', {x1: meanX, x2: meanX, y1: 18, y2: 90, class: 'g10ch8-mean'}, marks);
        const occurrences = new Map();
        for (const value of values) {
          const level = occurrences.get(value) || 0;
          vector('circle', {cx: x(value), cy: 78 - level * 13, r: 5, class: 'g10ch8-point'}, marks);
          occurrences.set(value, level + 1);
        }
      };
      paintData();
      if (!waitingForFonts && document.fonts.status === 'loading') {
        waitingForFonts = true;
        document.fonts.addEventListener('loadingdone', () => refresh(), {once:true});
      }
    });
    return (values, mean) => {
      model = {values, mean};
      meanText.textContent = `${meanLabel} ${chartNumber(mean)}`;
      paintData?.();
    };
  }

  function distribution(host, kind, t) {
    const controls = element('div', '', host);
    const chart = element('div', '', host);
    const limits = {frequency:[0,16],spread:[0,20],scale:[-20,20]}[kind];
    const updatePlot = dotPlot(chart, t.distribution, t.mean, limits);
    const result = output(host);
    const render = () => {
      let values;
      if (kind === 'frequency') {
        values = [...Array(3).fill(4), ...Array(Number(primary.value)).fill(12)];
      } else if (kind === 'spread') {
        const d = Number(primary.value);
        values = [10 - d, 9, 10, 11, 10 + d];
      } else {
        const a = Number(primary.value), b = Number(shift.value);
        values = [2, 4, 6, 8].map(x => a * x + b);
      }
      const summary = stats(values);
      updatePlot(values, summary.mean);
      result.textContent = `${t.values} ${values.join(', ')}. ${t.mean} ${display(summary.mean)}. ${t.range} ${display(summary.range)}. ${t.variance} ${display(summary.variance)}. ${t.sd} ${display(summary.deviation)}.`;
    };
    const options = kind === 'frequency' ? [1, 2, 3, 4, 5] : kind === 'spread' ? [1, 2, 3, 4, 5, 6, 7, 8] : [-2, -1, 0, 1, 2];
    const primary = control(controls, t[kind], options.map(n => [n, n]), kind === 'frequency' ? 1 : kind === 'spread' ? 2 : 1, render);
    const shift = kind === 'scale' ? control(controls, t.shift, [-4, 0, 4].map(n => [n, n]), 0, render) : null;
    render();
  }

  function compareVariation(host, t) {
    const controls = element('div', '', host);
    const result = output(host);
    const render = () => {
      const a = stats([6, 10, 14]);
      const scale = Number(multiplier.value), offset = Number(shift.value);
      const b = stats([6, 10, 14].map(x => scale * x + offset));
      const relative = data => display(100 * data.deviation / data.mean) + '%';
      result.textContent = `A · ${t.mean} ${display(a.mean)}, ${t.sd} ${display(a.deviation)}, ${t.cv} ${relative(a)}. B · ${t.mean} ${display(b.mean)}, ${t.sd} ${display(b.deviation)}, ${t.cv} ${relative(b)}.`;
    };
    const multiplier = control(controls, t.scale, [1, 2, 3].map(n => [n, n]), 2, render);
    const shift = control(controls, t.shift, [-4, 0, 4].map(n => [n, n]), 0, render);
    render();
  }

  const tosses = ['H', 'T'];
  const coinPairs = tosses.flatMap(a => tosses.map(b => a + b));
  const die = range(1, 6);
  function sampleSpace(host, t) {
    const controls = element('div', '', host);
    const outcomes = element('ul', '', host);
    outcomes.className = 'g10ch8-outcomes';
    outcomes.setAttribute('aria-label', t.sample);
    const result = output(host);
    const render = () => {
      const values = experiment.value === 'die' ? die : coinPairs;
      outcomes.replaceChildren();
      let count = 0;
      for (const value of values) {
        const favourable = experiment.value === 'die' ? value % 2 === 0 : value.includes('H');
        const item = element('li', String(value), outcomes);
        item.className = favourable ? 'g10ch8-favourable' : '';
        item.setAttribute('aria-label', value + ' · ' + (favourable ? t.favourable : t.other));
        if (favourable) count++;
      }
      const event = experiment.value === 'die' ? t.even : t.head;
      result.textContent = `${event} · ${count} ${t.of} ${values.length} · ${t.probability} ${display(count / values.length)}`;
    };
    const experiment = control(controls, t.experiment, [['die', t.die], ['coins', t.coins]], 'die', render);
    render();
  }

  function tree(host, t) {
    const controls = element('div', '', host);
    const chart = element('div', '', host);
    const result = output(host);
    const render = () => {
      chart.replaceChildren();
      const svg = graphic(chart, t.tree, 164);
      const first = branch.value;
      const show = path => first === 'all' || path.startsWith(first);
      const edge = (x1, y1, x2, y2, path) => vector('line', {x1, y1, x2, y2,
        class: show(path) ? 'g10ch8-tree-active' : 'g10ch8-tree-muted'}, svg);
      label(svg, 26, 87, 'S');
      for (const [i, a] of tosses.entries()) {
        const y = 43 + i * 76;
        edge(34, 82, 104, y, a);
        label(svg, 118, y + 4, a);
        for (const [j, b] of tosses.entries()) {
          const leaf = y - 21 + j * 42;
          edge(130, y, 208, leaf, a + b);
          label(svg, 231, leaf + 4, a + b);
        }
      }
      result.textContent = `${t.paths} ${coinPairs.filter(show).join(', ')}`;
    };
    const branch = control(controls, t.firstToss, [['all', t.all], ['H', 'H'], ['T', 'T']], 'all', render);
    render();
  }

  function venn(host, t) {
    const controls = element('div', '', host);
    const chart = element('div', '', host);
    const svg = graphic(chart, `${t.venn}. A: ${t.even}. B: ${t.aboveThree}.`, 200);
    svg.classList.add('diagramguard-svg');
    const result = output(host);
    const mode = {
      union: [t.union, (a,b) => a || b],
      intersection: [t.intersection, (a,b) => a && b],
      onlyA: [t.onlyA, (a,b) => a && !b],
      onlyB: [t.onlyB, (a,b) => !a && b],
      neither: [t.neither, (a,b) => !a && !b],
      complement: [t.complement, a => !a]
    };
    const memberA = n => n % 2 === 0;
    const memberB = n => n > 3;
    let regions = [];
    const render = () => {
      const [name, condition] = mode[selection.value];
      for (const [node, a, b] of regions) node.classList.toggle('is-selected', condition(a, b));
      const selected = die.filter(n => condition(memberA(n), memberB(n)));
      result.textContent = `${name} · {${selected.join(', ')}} · ${t.probability} ${selected.length}/${die.length}`;
    };
    const legend = element('div', '', host);
    legend.className = 'g10ch8-legend diagramguard-coordinate-legend';
    element('span', `A: ${t.even}`, legend);
    element('span', `B: ${t.aboveThree}`, legend);
    const selection = control(controls, t.region, Object.entries(mode).map(([key, [name]]) => [key, name]), 'union', render);
    window.TriggleDiagramGuard.responsive(svg, (width, rem) => {
      const font = .875 * rem * 300 / width;
      const radius = 69, offset = 29, center = 100 + 1.25 * font;
      const delta = Math.sqrt(radius ** 2 - offset ** 2);
      const height = center + radius + 1.85 * font + 10;
      const arc = (y, large, sweep) => `A${radius} ${radius} 0 ${large} ${sweep} 150 ${y}`;
      svg.setAttribute('viewBox', `0 0 300 ${height}`);
      svg.replaceChildren();
      const outside=vector('rect',{x:5,y:5,width:290,height:height-10,rx:8,class:'g10ch8-region','data-region':'outside'},svg);
      const diagram=vector('g',{transform:`translate(0 ${center})`},svg);
      const region=(d,name)=>vector('path',{d,class:'g10ch8-region','data-region':name},diagram);
      regions = [
        [outside,false,false],
        [region(`M150 ${-delta} ${arc(delta,1,0)} ${arc(-delta,0,1)} Z`,'only-a'),true,false],
        [region(`M150 ${-delta} ${arc(delta,0,1)} ${arc(-delta,0,1)} Z`,'both'),true,true],
        [region(`M150 ${-delta} ${arc(delta,1,1)} ${arc(-delta,0,0)} Z`,'only-b'),false,true]
      ];
      for (const cx of [150-offset,150+offset]) vector('circle',{cx,cy:0,r:radius,class:'g10ch8-circle'},diagram);
      const title = -radius - 1.1*font;
      for (const [x,y,value,location] of [[121,title,'A','a'],[179,title,'B','b'],[268,title,'S','sample'],
        [86,0,'2','only-a'],[150,0,'4, 6','both'],[214,0,'5','only-b'],[45,radius+.9*font,'1, 3','outside']]) {
        const text=label(diagram,x,y,value,{dy:'.35em','data-dg-label':value,'data-region-label':location});
        text.style.fontSize=font+'px';
        text.style.fontWeight='500';
      }
      render();
    });
    render();
  }

  function inclusionExclusion(host, t) {
    const controls = element('div', '', host);
    const result = output(host);
    const render = () => {
      const n = Number(memberCount.value);
      const pairs = n * (n - 1) / 2;
      const triple = Number(n === 3);
      result.textContent = `${t.count} ${n} − ${pairs} + ${triple} = ${n - pairs + triple}.`;
    };
    const memberCount = control(controls, t.membership, [1, 2, 3].map(n => [n, n]), 3, render);
    render();
  }

  const copy = {
    en: {
      distribution: 'Distribution on a number line', frequency: 'Frequency of 12', spread: 'Distance of extreme points from 10',
      scale: 'Multiplier', shift: 'Amount added', values: 'Data:', mean: 'Mean:', range: 'Range:',
      variance: 'Variance:', sd: 'Standard deviation:', cv: 'Coefficient of variation:',
      experiment: 'Random experiment', sample: 'Sample space', die: 'One die', coins: 'Two coin tosses',
      favourable: 'Favourable', other: 'Other outcome', even: 'Even number', head: 'At least one head',
      of: 'of', probability: 'Probability:', tree: 'Tree of two coin tosses', all: 'All branches', firstToss: 'First toss',
      paths: 'Complete paths:', venn: 'Venn diagram for one die', region: 'Highlight event',
      aboveThree: 'Greater than 3', union: 'A or B', intersection: 'A and B', onlyA: 'Only A',
      onlyB: 'Only B', neither: 'Neither A nor B', complement: 'Not A',
      membership: 'Number of events containing the outcome', count: 'Number of times counted:'
    },
    ta: {
      distribution: 'எண் கோட்டில் தரவுப் பரவல்', frequency: '12-இன் நிகழ்வெண்', spread: '10-இலிருந்து எல்லை மதிப்புகளின் தொலைவு',
      scale: 'பெருக்கி', shift: 'கூட்டும் மதிப்பு', values: 'தரவுகள்:', mean: 'சராசரி:', range: 'வீச்சு:',
      variance: 'விலக்க வர்க்கச் சராசரி:', sd: 'திட்ட விலக்கம்:', cv: 'மாறுபாட்டுக் கெழு:',
      experiment: 'சமவாய்ப்புச் சோதனை', sample: 'கூறுவெளி', die: 'ஒரு பகடை', coins: 'இரு நாணயச் சுண்டல்கள்',
      favourable: 'சாதகமான விளைவு', other: 'பிற விளைவு', even: 'இரட்டைப்படை எண்', head: 'குறைந்தபட்சம் ஒரு தலை',
      of: 'இல்', probability: 'நிகழ்தகவு:', tree: 'இரு நாணயச் சுண்டல்களின் மர வரைபடம்', all: 'அனைத்துக் கிளைகள்', firstToss: 'முதல் சுண்டல்',
      paths: 'முழுப் பாதைகள்:', venn: 'ஒரு பகடைக்கான வென் படம்', region: 'நிகழ்ச்சியைத் தேர்ந்தெடுக்கவும்',
      aboveThree: '3-ஐ விடப் பெரியது', union: 'A அல்லது B', intersection: 'A மற்றும் B', onlyA: 'A மட்டும்',
      onlyB: 'B மட்டும்', neither: 'A, B இரண்டும் இல்லை', complement: 'A இல்லை',
      membership: 'விளைவு இடம்பெறும் நிகழ்ச்சிகளின் எண்ணிக்கை', count: 'கணக்கிடப்படும் முறை:'
    }
  };

  window.TriggleG10Ch8Labs = {
    mount(stage, host, language) {
      if (!host || !stage.visual) return;
      host.classList.add('g10ch8-lab');
      const t = copy[language] || copy.en;
      switch (stage.visual) {
        case 'frequency':
        case 'spread':
        case 'scale': distribution(host, stage.visual, t); break;
        case 'cv': compareVariation(host, t); break;
        case 'sample': sampleSpace(host, t); break;
        case 'tree': tree(host, t); break;
        case 'venn': venn(host, t); break;
        case 'three': inclusionExclusion(host, t); break;
      }
    }
  };
})();
