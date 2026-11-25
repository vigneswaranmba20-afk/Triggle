/* Tamil final answers for existing Grade 10 cards with English-only reader
 * labels. Source locators are in g10-frontier-tamil-answers.json.
 */
(() => {
  'use strict';
  const tex = (latex,fallback) => ({latex,fallback,display:true});
  const flat = value => Array.isArray(value)?value.map(flat).join(''):value?.fallback??value;
  const roster = pairs => {
    const rows=[];
    for (let i=0;i<pairs.length;i+=3) {
      rows.push(pairs.slice(i,i+3).map(pair=>'('+pair.join(',')+')').join(',\\,'));
    }
    const latex='\\left\\{\\begin{gathered}'+rows.join(',\\\\')+'\\end{gathered}\\right\\}';
    return ['இருபுறமும் ஒரே கணம். ',tex(latex,'{'+pairs.map(pair=>'('+pair.join(',')+')').join(', ')+'}')];
  };
  const cartesian = (A,B) => A.flatMap(x=>B.map(y=>[x,y]));
  const proved = (latex,fallback,conditions) => [
    'நிரூபிக்கப்பட்டது. ',tex(latex,fallback),...(conditions?[' வரையறை நிபந்தனை ',conditions]:[])
  ];
  const betaConditions = tex(String.raw`\sin\beta\ne0,\quad\cos\beta\ne0`,'sin β ≠ 0, cos β ≠ 0');
  const thetaConditions = tex(String.raw`\sin\theta\ne0,\quad\cos\theta\ne0`,'sin θ ≠ 0, cos θ ≠ 0');
  const answers={
    'c10-1-ex1-1-q5':roster([[3,3],[3,5]]),
    'c10-1-ex1-1-q6-i':roster(cartesian([0,1],[2,3,4,5])),
    'c10-1-ex1-1-q6-ii':roster([[0,3],[1,3]]),
    'c10-1-ex1-1-q6-iii':roster(cartesian([0,1,2,3,4],[3,5])),
    'c10-1-ex1-1-q7-i':roster(cartesian([2,3,5,7],[2])),
    'c10-1-ex1-1-q7-ii':roster(cartesian([1,2,3,4,5,6,7],[3,5,7])),
    'c10-2-ex2-3-q2':tex('7x-3\\equiv3\\pmod{17}','7x − 3 ≡ 3 (mod 17)'),
    'c10-2-ex2-5-q5':'15-ஆவது உறுப்பு.',
    'c10-2-unit-q4':['தேவையான முழு ',tex('q=26','q = 26'),'. அந்த மதிப்பில் ',tex('107=4(26)+3','107 = 4(26) + 3'),'.'],
    'c10-2-unit-q5':proved(String.raw`t_{3m+1}=2(2m-n)d=2t_{m+n+1}`,'t₍₃ₘ₊₁₎ = 2(2m − n)d = 2t₍ₘ₊ₙ₊₁₎'),
    'c10-2-unit-q7':['இரண்டாவது தொடரின் உறுப்பிலிருந்து முதல் தொடரின் ஒத்த உறுப்பைக் கழித்தால் வித்தியாசம் எப்போதும் 5. ',
      tex('T_{10}-t_{10}=T_{21}-t_{21}=T_n-t_n=5','T₁₀ − t₁₀ = T₂₁ − t₂₁ = Tₙ − tₙ = 5')],
    'c10-6-ex6-1-q4-i':proved(String.raw`\sec^6\theta=\tan^6\theta+3\tan^2\theta\sec^2\theta+1`,
      'sec⁶ θ = tan⁶ θ + 3 tan² θ sec² θ + 1',tex(String.raw`\cos\theta\ne0`,'cos θ ≠ 0')),
    'c10-6-ex6-1-q8-i':['இருபுற மதிப்பும் ',tex('n^2','n²'),'. வரையறை நிபந்தனை ',betaConditions,'.'],
    'c10-6-ex6-1-q8-ii':['இருபுற மதிப்பும் 1. வரையறை நிபந்தனை ',thetaConditions,'.'],
    'c10-6-ex6-1-q9-i':proved(String.raw`q(p^2-1)=2p`,'q(p² − 1) = 2p',thetaConditions),
    'c10-6-ex6-1-q9-ii':proved(String.raw`\cos^6\theta-4\cos^4\theta+8\cos^2\theta=4`,'cos⁶ θ − 4 cos⁴ θ + 8 cos² θ = 4'),
    'c10-6-ex6-1-q10':proved(String.raw`\dfrac{a^2-1}{a^2+1}=\sin\theta`,'(a² − 1)/(a² + 1) = sin θ',
      tex(String.raw`\cos\theta\ne0,\quad\sin\theta\ne\pm1`,'cos θ ≠ 0, sin θ ≠ ±1')),
    'c10-8-unit-q1':tex(String.raw`f_1=8,\quad f_2=12`,'f₁ = 8, f₂ = 12'),
    'c10-8-unit-q5':['சராசரி ',tex(String.raw`\dfrac{31}{6}`,'31/6'),'. திட்ட விலக்கம் ',
      tex(String.raw`\sigma=\dfrac{\sqrt{85}}6\approx1.54`,'σ = √85/6 ≈ 1.54'),'.']
  };
  window.TriggleG10FrontierTamilAnswers = items => {
    for(const item of items) {
      const ta=answers[item.id];
      if(!ta)continue;
      const presentation = item.answerMath;
      const hasLocales=presentation?.en||presentation?.ta;
      const en=(hasLocales?presentation.en:presentation)||
        window.TriggleChapter1Math?.getAnswer?.(item)||
        window.TriggleG10RemainingMath?.getAnswer?.(item)||
        window.TriggleG10Ch2FractionMath?.getAnswer?.(item)||
        item.answer?.en||item.answer;
      item.answerTa=flat(ta);
      item.answerMath={en,ta};
    }
  };
})();
