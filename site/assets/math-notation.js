/* Offline, escaped mathematics typesetting for Triggle. Native MathML handles
 * radicals and fractional powers; older compact HTML fractions remain supported.
 */
(() => {
  'use strict';
  const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({
    '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'
  })[c]);
  const exponents = {'⁰':'0','¹':'1','²':'2','³':'3','⁴':'4','ᵏ':'k'};
  const xml = ' xmlns="http://www.w3.org/1998/Math/MathML" class="triggle-math"';
  const number = value => /^\d+(?:\.\d+)?$/.test(value);
  const symbol = value => '<' + (number(value) ? 'mn' : 'mi') + '>' + esc(value) + '</' + (number(value) ? 'mn' : 'mi') + '>';
  const signed = value => {
    const str = String(value);
    return /^[-−]/.test(str) ? '<mrow><mo>−</mo>'+symbol(str.slice(1))+'</mrow>' : symbol(str);
  };
  const typeset = (source, body) => '<math' + xml + ' aria-label="' + esc(source) + '">' + body + '</math>';
  // Keep radicands inside MathML, including products and common powers.
  function simpleMath(value) {
    const parts = String(value).match(/\d+(?:\.\d+)?|[a-zA-Z]+|[⁰¹²³⁴ᵏ]|[^\s]/gu) || [];
    let body = '';
    for(let i=0;i<parts.length;i++) {
      const part=parts[i], next=parts[i+1];
      if(/[⁰¹²³⁴ᵏ]/u.test(next||'') && next.length===1 && /^(?:\d+(?:\.\d+)?|[a-zA-Z]+)$/.test(part)) {
        body+='<msup>'+symbol(part)+symbol(exponents[next])+'</msup>';i++;continue;
      }
      body += /^(?:\d+(?:\.\d+)?|[a-zA-Z]+)$/.test(part) ? symbol(part) : '<mo>'+esc(part)+'</mo>';
    }
    return '<mrow>'+body+'</mrow>';
  }
  function render(value) {
    const tokens=[];
    const stash=html=>{tokens.push(html);return '\uE000N'+(tokens.length-1)+'\uE001';};
    let s=esc(value);
    // A parenthesized fraction raised to a power: include the parentheses.
    s=s.replace(/\(\s*\[\[([^\]|]+)\|([^\]]+)\]\]\s*\)([⁰¹²³⁴]|\^[a-zA-Z0-9−-]+)/g,
      (_full,n,d,p)=>stash('<span class="math-group-power" role="math"><span class="math-group">'+
      '<span class="math-bracket">(</span><span class="frac"><span>'+render(n)+'</span><span>'+render(d)+
      '</span></span><span class="math-bracket">)</span></span><sup>'+esc(exponents[p]||p.slice(1))+'</sup></span>'));
    // Legacy authored [[numerator|denominator]] markup: stacked fraction.
    s=s.replace(/\[\[([^\]|]+)\|([^\]]+)\]\]/g,(_full,n,d)=>stash(
      '<span class="frac triggle-frac" role="math" aria-label="'+esc(n)+' over '+esc(d)+'"><span>'+render(n)+'</span><span>'+render(d)+'</span></span>'));
    // Keep group powers attached, even when the group contains a radical.
    s=s.replace(/(\[[^\[\]\n]{1,100}\]|\([^()\n]{1,100}\)|\{[^{}\n]{1,100}\})([⁰¹²³⁴]|\^[a-zA-Z0-9−-]+)/g,
      (_full,group,p)=>stash('<span class="math-group-power" role="math"><span class="math-group">'+
        '<span class="math-bracket">'+group[0]+'</span><span class="math-group-inner">'+render(group.slice(1,-1))+
        '</span><span class="math-bracket">'+group[group.length-1]+'</span></span><sup>'+esc(exponents[p]||p.slice(1))+'</sup></span>'));
    // x^(m/n), 64^(−2/3), etc: a genuine stacked exponent fraction.
    s=s.replace(/([a-zA-Z]|\d+(?:\.\d+)?)\^\(([−-]?[a-zA-Z0-9]+)\s*\/\s*([a-zA-Z0-9]+)\)/g,
      (whole,base,n,d)=>stash(typeset(whole,'<msup>'+symbol(base)+'<mfrac>'+signed(n)+symbol(d)+'</mfrac></msup>')));
    // x^(−k) or 10^−6, and simple letter powers (avoid raw caret notation).
    s=s.replace(/([a-zA-Z]|\d+(?:\.\d+)?)\^\(([−-]?[a-zA-Z0-9]+)\)/g,
      (whole,base,p)=>stash(typeset(whole,'<msup>'+symbol(base)+signed(p)+'</msup>')));
    s=s.replace(/([a-zA-Z]|\d+(?:\.\d+)?)\^([−-]?[a-zA-Z0-9]+)/g,
      (whole,base,p)=>stash(typeset(whole,'<msup>'+symbol(base)+signed(p)+'</msup>')));
    // Indexed roots: ³√2, ⁴√3, ⁿ√a; and standalone Unicode ∛, ∜.
    s=s.replace(/([³⁴ⁿ])√(\([^()\n]{1,100}\)|[a-zA-Z]+|\d+(?:\.\d+)?)/gu,
      (whole,index,raw)=>stash(typeset(whole,'<mroot>'+simpleMath(raw[0]==='('?raw.slice(1,-1):raw)+symbol(exponents[index]||'n')+'</mroot>')));
    s=s.replace(/([∛∜])(\([^()\n]{1,100}\)|[a-zA-Z]+|\d+(?:\.\d+)?)/gu,
      (whole,root,raw)=>stash(typeset(whole,'<mroot>'+simpleMath(raw[0]==='('?raw.slice(1,-1):raw)+symbol(root==='∛'?'3':'4')+'</mroot>')));
    s=s.replace(/√(\([^()\n]{1,100}\)|[a-zA-Z]+|\d+(?:\.\d+)?)/gu,
      (whole,raw)=>stash(typeset(whole,'<msqrt>'+simpleMath(raw[0]==='('?raw.slice(1,-1):raw)+'</msqrt>')));
    // Existing ordinary powers and Unicode superscripts continue to work.
    s=s.replace(/[⁰¹²³⁴ᵏ]/gu,c=>'<sup>'+exponents[c]+'</sup>');
    for(let i=tokens.length-1;i>=0;i--) s=s.replace('\uE000N'+i+'\uE001',tokens[i]);
    return s;
  }
  window.TriggleNotation=Object.freeze({render});
})();