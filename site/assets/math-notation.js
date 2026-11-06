/* Small offline notation renderer. Zero CDN requests; source math is escaped. */
(() => {
  'use strict';
  const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({
    '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'
  })[c]);
  const exponents = {'²':'2','³':'3','⁴':'4'};
  function power(p) { return exponents[p] || String(p).replace(/^\^/,''); }
  function render(value) {
    const tokens = [];
    const stash = html => {
      tokens.push(html);
      return '\uE000N' + (tokens.length - 1) + '\uE001';
    };
    let s = esc(value);
    // A fraction in parentheses, all raised to a power, must display the
    // exponent AFTER the closing bracket, not on the denominator.
    s = s.replace(/\(\s*\[\[([^\]|]+)\|([^\]]+)\]\]\s*\)(²|³|⁴|\^[0-9]+)/g,
      (_full,n,d,p) => stash(
        '<span class="math-group-power" role="math"><span class="math-group">' +
        '<span class="math-bracket">(</span><span class="frac"><span>' + n +
        '</span><span>' + d + '</span></span><span class="math-bracket">)</span>' +
        '</span><sup>' + power(p) + '</sup></span>'
      ));
    // Explicitly support squared SQUARE brackets, ordinary parentheses and braces.
    // This is intentionally limited to compact groups; complex formula authoring
    // will use accessible native MathML or a locally bundled typesetter later.
    s = s.replace(/(\[[^\[\]\n]{1,100}\]|\([^()\n]{1,100}\)|\{[^{}\n]{1,100}\})(²|³|⁴|\^[0-9]+)/g,
      (_full,group,p) => stash(
        '<span class="math-group-power" role="math"><span class="math-group">' +
        '<span class="math-bracket">' + group[0] + '</span>' +
        '<span class="math-group-inner">' + render(group.slice(1,-1)) + '</span>' +
        '<span class="math-bracket">' + group[group.length - 1] + '</span>' +
        '</span><sup>' + power(p) + '</sup></span>'
      ));
    s = s.replace(/\[\[([^\]|]+)\|([^\]]+)\]\]/g, (_full,n,d) =>
      stash('<span class="frac"><span>' + n + '</span><span>' + d + '</span></span>')
    );
    s = s.replace(/[²³⁴]/g,c => '<sup>' + power(c) + '</sup>')
      .replace(/\^([0-9]+)/g,'<sup>$1</sup>');
    tokens.forEach((html,i) => {s=s.replace('\uE000N'+i+'\uE001',html);});
    return s;
  }
  window.TriggleNotation = Object.freeze({render});
})();
