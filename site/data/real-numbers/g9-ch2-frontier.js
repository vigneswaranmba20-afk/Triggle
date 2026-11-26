/* Grade 9 Real Numbers, 2025 revised, EN PDF pp.80–82 and TA PDF pp.86–87.
 * Reviewed display fields for the existing exercise ids. Original lesson records
 * continue to serve as the immutable source for the legacy notation compiler.
 */
(() => {
  'use strict';
  const tex = (fallback, latex, display = false) => ({fallback, latex, display});
  const math = (fallback, latex) => tex(fallback, latex);
  const work = (en, ta, fallback, latex) => ({en, ta, eq:fallback, math:tex(fallback, latex, true)});
  const flat = value => (Array.isArray(value) ? value.map(flat).join('') : value.fallback ?? value);
  const roots = (...values) => values.map(value => math('√'+value, String.raw`\sqrt{${value}}`));
  const ratio = (top, bottom) => math(top+'/'+bottom, String.raw`\dfrac{${top}}{${bottom}}`);
  const recurring = (prefix, digits) => math(prefix+'('+digits+')', String.raw`${prefix}\overline{${digits}}`);
  const bilingual = (en, ta = en) => ({en, ta});

  const reviewed = [
    {
      prompt:bilingual(['If ',math('n','n'),' is a natural number then ',...roots('n'),' is'],
        [math('n','n'),' என்பது ஓர் இயல் எண் எனில் ',...roots('n'),' என்பது']),
      options:[
        bilingual('always a natural number.','எப்போதும் ஓர் இயல் எண்.'),
        bilingual('always an irrational number.','எப்போதும் ஒரு விகிதமுறா எண்.'),
        bilingual('always a rational number','எப்போதும் ஒரு விகிதமுறு எண்'),
        bilingual('may be rational or irrational','ஒரு விகிதமுறு அல்லது விகிதமுறா எண்')
      ], correct:4,
      steps:[
        work('Use a perfect square as the first value of n. Its square root is a whole number, which is rational.',
          'முதலில் n-க்குப் பூரண வர்க்க எண்ணை எடுத்துக்கொள்வோம். அதன் வர்க்கமூலம் ஒரு முழு எண். அது விகிதமுறு எண்.',
          '√4 = 2 = 2/1',String.raw`\sqrt{4}=2=\dfrac{2}{1}`),
        work('For a natural number that is not a perfect square, its square root is irrational. Both outcomes are possible.',
          'இயல் எண் ஒரு பூரண வர்க்கமாக இல்லாவிட்டால், அதன் வர்க்கமூலம் விகிதமுறா எண். எனவே இரு வகையும் சாத்தியம்.',
          '1² < 2 < 2²',String.raw`1^2<2<2^2`)
      ]
    },
    {
      prompt:bilingual('Which of the following is not true?','பின்வருவனவற்றுள் எது உண்மையல்ல?'),
      options:[
        bilingual('Every rational number is a real number.','ஒவ்வொரு விகிதமுறு எண்ணும் மெய்யெண்.'),
        bilingual('Every integer is a rational number.','ஒவ்வொரு முழுக்களும் விகிதமுறு எண்.'),
        bilingual('Every real number is an irrational number.','ஒவ்வொரு மெய்யெண்ணும் விகிதமுறா எண்.'),
        bilingual('Every natural number is a whole number.','ஒவ்வோர் இயல் எண்ணும் ஒரு முழு எண்.')
      ], correct:3,
      steps:[
        work('A real number can be rational or irrational. Take the real number 2 as a counterexample to (3).',
          'மெய்யெண் விகிதமுறு எண்ணாகவோ விகிதமுறா எண்ணாகவோ இருக்கலாம். கூற்று (3)-க்கு எதிர் எடுத்துக்காட்டாக 2-ஐ எடுத்துக்கொள்வோம்.',
          '2 = 2/1',String.raw`2=\dfrac{2}{1}`),
        work('Every integer can be written with denominator 1. Rational numbers are real, and natural numbers are whole. The other three statements hold.',
          'ஒவ்வொரு முழுக்களையும் பகுதி 1 கொண்ட பின்னமாக எழுதலாம். விகிதமுறு எண்கள் மெய்யெண்கள். இயல் எண்கள் முழு எண்கள். எனவே மற்ற மூன்று கூற்றுகளும் உண்மை.',
          'a = a/1',String.raw`a=\dfrac{a}{1}`)
      ]
    },
    {
      prompt:bilingual('Which one of the following, regarding sum of two irrational numbers, is true?',
        'இரு விகிதமுறா எண்களின் கூடுதல் பற்றிய கீழ்க்காணும் கூற்றுகளில் எது உண்மை?'),
      options:[
        bilingual('always an irrational number.','எப்போதும் ஒரு விகிதமுறா எண்.'),
        bilingual('may be a rational or an irrational number.','ஒரு விகிதமுறு அல்லது விகிதமுறா எண்ணாக இருக்கலாம்.'),
        bilingual('always a rational number.','எப்போதும் ஒரு விகிதமுறு எண்.'),
        bilingual('always an integer.','எப்போதும் ஒரு முழுக்களாகும்.')
      ], correct:2,
      steps:[
        work('Add a pair of opposite irrational numbers. Their sum is rational.',
          'எதிரெதிர் குறிகளுடைய இரண்டு விகிதமுறா எண்களைக் கூட்டுவோம். கூடுதல் விகிதமுறு எண்.',
          '√2 + (−√2) = 0',String.raw`\sqrt2+(-\sqrt2)=0`),
        work('Add two copies of the same irrational number. If their sum were rational, halving it would make the original number rational too.',
          'ஒரே விகிதமுறா எண்ணை இருமுறை கூட்டுவோம். கூடுதல் விகிதமுறு எண் எனில், அதைப் பாதியாக்கும்போது கிடைக்கும் மூல எண்ணும் விகிதமுறு எண்ணாகிவிடும். எனவே இக்கூடுதல் விகிதமுறா எண்.',
          '√2 + √2 = 2√2',String.raw`\sqrt2+\sqrt2=2\sqrt2`)
      ]
    },
    {
      prompt:bilingual('Which one of the following has a terminating decimal expansion?',
        'பின்வருவனவற்றுள் எது முடிவுறு தசமத் தீர்வு?'),
      options:[ratio(5,64),ratio(8,9),ratio(14,15),ratio(1,12)],correct:1,
      steps:[
        work('The four fractions are already in lowest terms. A fraction terminates precisely when its denominator has no prime factors other than 2 and 5.',
          'நான்கு பின்னங்களும் எளிய வடிவில் உள்ளன. பகுதியின் பகாக் காரணிகளாக 2 அல்லது 5 மட்டுமே இருந்தால் அந்தப் பின்னத்தின் தசம விரிவு முடிவுறும்.',
          '64 = 2⁶; 9 = 3²; 15 = 3 × 5; 12 = 2² × 3',
          String.raw`\begin{gathered}64=2^6,\quad9=3^2\\15=3\times5,\quad12=2^2\times3\end{gathered}`),
        work('Only the denominator 64 meets that test. Its decimal expansion terminates.',
          '64 என்ற பகுதி மட்டுமே இந்நிபந்தனையை நிறைவு செய்கிறது. எனவே அதன் தசம விரிவு முடிவுறும்.',
          '5/64 = 0.078125',String.raw`\dfrac5{64}=0.078125`)
      ]
    },
    {
      prompt:bilingual('Which one of the following is an irrational number','பின்வருவனவற்றுள் எது விகிதமுறா எண்?'),
      options:[...roots(25),math('√(9/4)',String.raw`\sqrt{\dfrac94}`),ratio(7,11),math('π',String.raw`\pi`)],correct:4,
      steps:[
        work('Simplify the square roots and check whether each result is a ratio of integers.',
          'வர்க்கமூலங்களைச் சுருக்கி, ஒவ்வொரு விடையையும் இரண்டு முழுக்களின் விகிதமாக எழுத முடியுமா எனப் பார்ப்போம்.',
          '√25 = 5; √(9/4) = 3/2',String.raw`\sqrt{25}=5,\quad\sqrt{\dfrac94}=\dfrac32`),
        work('The third choice is already a ratio of integers. The circle constant π is irrational.',
          'மூன்றாவது விடை ஏற்கெனவே இரண்டு முழுக்களின் விகிதம். வட்ட மாறிலி π ஒரு விகிதமுறா எண்.',
          '7/11 ∈ ℚ; π ∉ ℚ',String.raw`\dfrac7{11}\in\mathbb Q,\quad \pi\notin\mathbb Q`)
      ]
    },
    {
      prompt:bilingual('An irrational number between 2 and 2.5 is','2 மற்றும் 2.5 என்ற எண்களுக்கிடையே உள்ள ஒரு விகிதமுறா எண்'),
      options:roots(11,5,2.5,8),correct:2,
      steps:[
        work('The bounds are positive. Square them to obtain the interval for the radicand.',
          'இரு எல்லைகளும் மிகை எண்கள். அவற்றை வர்க்கமிட்டால் மூலத்திற்குள் இருக்க வேண்டிய எண்ணின் எல்லைகள் கிடைக்கும்.',
          '2² = 4; 2.5² = 6.25',String.raw`2^2=4,\quad 2.5^2=6.25`),
        work('Of the given radicands, only 5 lies in this interval. Since 5 is not a perfect square, its square root is irrational.',
          'கொடுக்கப்பட்ட மூல எண்களில் 5 மட்டுமே இவ்வெல்லைகளுக்குள் உள்ளது. 5 பூரண வர்க்கம் இல்லை என்பதால் அதன் வர்க்கமூலம் விகிதமுறா எண்.',
          '4 < 5 < 6.25 ⇒ 2 < √5 < 2.5',String.raw`\begin{gathered}4<5<6.25\\\Rightarrow\ 2<\sqrt5<2.5\end{gathered}`)
      ]
    },
    {
      prompt:bilingual(['The smallest rational number by which ',ratio(1,3),' should be multiplied so that its decimal expansion terminates with one place of decimal is'],
        [ratio(1,3),' ஐ எந்த மிகச் சிறிய விகிதமுறு எண்ணால் பெருக்கினால் அதன் தசம விரிவு ஓர் இலக்கத்தோடு முடிவுறு தசம விரிவாக அமையும்?']),
      options:[ratio(1,10),ratio(3,10),math('3','3'),math('30','30')],correct:2,
      steps:[
        work('Test the two smallest listed multipliers first. Only the second cancels the factor of 3 in the denominator.',
          'கொடுத்துள்ள மிகச் சிறிய இரு பெருக்கிகளை முதலில் சோதிப்போம். இரண்டாவது பெருக்கி மட்டுமே பகுதியிலுள்ள 3-ஐ நீக்குகிறது.',
          '(1/3)(1/10) = 1/30; (1/3)(3/10) = 1/10 = 0.1',
          String.raw`\begin{aligned}\dfrac13\cdot\dfrac1{10}&=\dfrac1{30}\\\dfrac13\cdot\dfrac3{10}&=\dfrac1{10}=0.1\end{aligned}`),
        work('The first product repeats. The larger choices yield integers. The second option is the smallest listed choice with the required decimal expansion.',
          'முதல் பெருக்கற்பலன் ஒரு சுழல் தசமம். பெரிய பெருக்கிகள் முழுக்களைத் தருகின்றன. எனவே கொடுக்கப்பட்டவற்றில் இரண்டாவது விடையே தேவையான தசம விரிவைத் தரும் மிகச் சிறிய பெருக்கி.',
          '(1/3) × 3 = 1; (1/3) × 30 = 10',String.raw`\dfrac13\times3=1,\quad\dfrac13\times30=10`)
      ]
    },
    {
      prompt:bilingual(['If ',math('1/7 = 0.(142857)',String.raw`\dfrac17=0.\overline{142857}`),' then the value of ',ratio(5,7),' is'],
        [math('1/7 = 0.(142857)',String.raw`\dfrac17=0.\overline{142857}`),' எனில் ',ratio(5,7),' இன் மதிப்பு என்ன?']),
      options:[recurring('0.','142857'),recurring('0.','714285'),recurring('0.','571428'),math('0.714285','0.714285')],correct:2,
      steps:[
        work('In long division the successive remainders are 1, 3, 2, 6, 4 and then 5 again. The six quotient digits therefore repeat.',
          'நீள்வகுத்தலில் மீதிகள் முறையே 1, 3, 2, 6, 4 என வந்து மீண்டும் 5 கிடைக்கிறது. எனவே ஈவின் ஆறு இலக்கங்கள் மீண்டும் வருகின்றன.',
          '50 = 7 × 7 + 1; 40 = 7 × 5 + 5',String.raw`\begin{gathered}50=7\times7+1\\40=7\times5+5\end{gathered}`),
        work('Write the repeating digits under the bar. The finite decimal in choice (4) ends after six digits.',
          'மீண்டும் வரும் இலக்கங்களின் மேல் கோடிடுவோம். நான்காவது விடையிலுள்ள முடிவுறு தசமம் ஆறு இலக்கங்களுடன் முடிகிறது.',
          '5/7 = 0.(714285)',String.raw`\dfrac57=0.\overline{714285}`)
      ]
    },
    {
      prompt:bilingual('Find the odd one out of the following.','பின்வருவனவற்றுள் பொருந்தாததைக் காண்க.'),
      options:[
        math('√32 × √2',String.raw`\sqrt{32}\times\sqrt2`),math('√27 / √3',String.raw`\dfrac{\sqrt{27}}{\sqrt3}`),
        math('√72 × √8',String.raw`\sqrt{72}\times\sqrt8`),math('√54 / √18',String.raw`\dfrac{\sqrt{54}}{\sqrt{18}}`)
      ],correct:4,
      steps:[
        work('Combine each pair of positive radicands by multiplication or division. The first three give whole numbers.',
          'நேர்ம மூல எண்களைப் பெருக்கல் அல்லது வகுத்தல் மூலம் ஒன்றிணைப்போம். முதல் மூன்று கோவைகளும் முழு எண்களைத் தருகின்றன.',
          '√64 = 8; √9 = 3; √576 = 24',String.raw`\begin{gathered}\sqrt{64}=8,\quad\sqrt9=3\\\sqrt{576}=24\end{gathered}`),
        work('In the fourth expression the radicand reduces to 3, which is not a perfect square. Its value is the only irrational result.',
          'நான்காவது கோவையில் மூல எண் 3 ஆகச் சுருங்குகிறது. 3 பூரண வர்க்கம் இல்லை. எனவே இதன் மதிப்பு மட்டுமே விகிதமுறா எண்.',
          '√54 / √18 = √3',String.raw`\dfrac{\sqrt{54}}{\sqrt{18}}=\sqrt3`)
      ]
    },
    {
      prompt:bilingual(math('0.(34) + 0.3(4) =',String.raw`0.\overline{34}+0.3\overline4=`)),
      options:[recurring('0.6','87'),recurring('0.','68'),recurring('0.6','8'),recurring('0.68','7')],correct:1,
      steps:[
        work('Write the recurring decimals as fractions. Shift by two places for the first number. For the second, subtract its one-place shift from its two-place shift.',
          'சுழல் தசமங்களைப் பின்னங்களாக மாற்றுவோம். முதல் எண்ணை இரண்டு இடங்கள் நகர்த்திக் கழிக்கவும். இரண்டாவது எண்ணில் இரண்டு இடம் நகர்த்தியதிலிருந்து ஓர் இடம் நகர்த்தியதைக் கழிக்கவும்.',
          '0.(34) = 34/99; 0.3(4) = (34 − 3)/90 = 31/90',
          String.raw`\begin{aligned}0.\overline{34}&=\dfrac{34}{99}\\0.3\overline4&=\dfrac{34-3}{90}=\dfrac{31}{90}\end{aligned}`),
        work('Use the common denominator 990. Reduce the sum, then divide to identify the repeating block.',
          'பொதுப்பகுதி 990-ஐப் பயன்படுத்திக் கூட்டுவோம். பின்னத்தைச் சுருக்கி வகுத்தால் சுழலும் இலக்கத் தொகுதி கிடைக்கும்.',
          '340/990 + 341/990 = 681/990 = 227/330 = 0.6(87)',
          String.raw`\begin{aligned}\dfrac{340}{990}+\dfrac{341}{990}&=\dfrac{681}{990}\\&=\dfrac{227}{330}=0.6\overline{87}\end{aligned}`)
      ]
    },
    {
      prompt:bilingual('Which of the following statement is false?','கீழ்க்காணும் கூற்றுகளில் எது தவறு?'),
      options:[
        bilingual('The square root of 25 is 5 or −5','25 இன் வர்க்கமூலம் 5 அல்லது −5'),
        math('−√25 = −5',String.raw`-\sqrt{25}=-5`),math('√25 = 5',String.raw`\sqrt{25}=5`),
        math('√25 = ±5',String.raw`\sqrt{25}=\pm5`)
      ],correct:4,
      steps:[
        work('In choice (1) the two square roots are the two solutions of the squaring equation. Both have square 25.',
          'முதல் கூற்றில் வர்க்கமூலங்கள் என்பது வர்க்கச் சமன்பாட்டின் இரு தீர்வுகளைக் குறிக்கிறது. இரண்டையும் வர்க்கமிட்டால் 25 கிடைக்கும்.',
          '5² = 25; (−5)² = 25',String.raw`5^2=25,\quad(-5)^2=25`),
        work('The radical symbol on its own denotes the nonnegative root. A minus sign outside the radical gives the negative root. Choice (4) confuses these two meanings.',
          'வர்க்கமூலக் குறி மட்டும் எதிர்மறையற்ற மூலத்தைக் குறிக்கும். குறிக்கு முன் கழித்தல் குறியிட்டால் குறை மூலம் கிடைக்கும். நான்காவது கூற்று இவ்விரு பொருள்களையும் ஒன்றாகக் கருதுகிறது.',
          '√25 = 5; −√25 = −5',String.raw`\sqrt{25}=5,\quad-\sqrt{25}=-5`)
      ]
    },
    {
      prompt:bilingual('Which one of the following is not a rational number?','பின்வருவனவற்றுள் எது விகிதமுறு எண் அல்ல?'),
      options:[math('√(8/18)',String.raw`\sqrt{\dfrac8{18}}`),ratio(7,3),...roots(0.01,13)],correct:4,
      steps:[
        work('Reduce the first fraction under its radical. Write the terminating decimal in the third option as a fraction before taking the square root.',
          'முதல் விடையின் மூலத்திற்குள் உள்ள பின்னத்தைச் சுருக்குவோம். மூன்றாவது விடையிலுள்ள முடிவுறு தசமத்தைப் பின்னமாக எழுதி வர்க்கமூலம் காண்போம்.',
          '√(8/18) = 2/3; √0.01 = 1/10',String.raw`\sqrt{\dfrac8{18}}=\dfrac23,\quad\sqrt{0.01}=\dfrac1{10}`),
        work('The second option is already a fraction of integers. The last radicand is between two consecutive squares, so its root is irrational.',
          'இரண்டாவது விடை முழுக்களின் பின்னமாகவே உள்ளது. கடைசி மூல எண் அடுத்தடுத்த இரு பூரண வர்க்கங்களுக்கு இடையில் உள்ளது. அதன் வர்க்கமூலம் விகிதமுறா எண்.',
          '3² < 13 < 4²',String.raw`3^2<13<4^2`)
      ]
    },
    {
      prompt:bilingual(math('√27 + √12 =',String.raw`\sqrt{27}+\sqrt{12}=`)),
      options:[...roots(39),math('5√6',String.raw`5\sqrt6`),math('5√3',String.raw`5\sqrt3`),math('3√5',String.raw`3\sqrt5`)],correct:3,
      steps:[
        work('Find the largest square factor of each radicand and take its root outside.',
          'ஒவ்வொரு மூல எண்ணிலும் உள்ள மிகப்பெரிய வர்க்கக் காரணியைக் கண்டுபிடித்து அதன் மூலத்தை வெளியே எடுப்போம்.',
          '√27 = √(9 × 3) = 3√3; √12 = √(4 × 3) = 2√3',
          String.raw`\begin{aligned}\sqrt{27}&=\sqrt{9\times3}=3\sqrt3\\\sqrt{12}&=\sqrt{4\times3}=2\sqrt3\end{aligned}`),
        work('The two surds now have the same radical part. Add their coefficients.',
          'இரு முறுடுகளும் இப்போது ஒரே மூலப் பகுதியைக் கொண்டுள்ளன. அவற்றின் கெழுக்களைக் கூட்டுவோம்.',
          '3√3 + 2√3 = 5√3',String.raw`3\sqrt3+2\sqrt3=5\sqrt3`)
      ]
    },
    {
      prompt:bilingual(['If ',math('√80 = k√5',String.raw`\sqrt{80}=k\sqrt5`),', then ',math('k =','k=')],
        [math('√80 = k√5',String.raw`\sqrt{80}=k\sqrt5`),' எனில் ',math('k = ?','k=?')]),
      options:['2','4','8','16'].map(n=>math(n,n)),correct:2,
      steps:[
        work('Factor 80 as 16 times 5. Take the square root of the perfect-square factor.',
          '80-ஐ 16 மற்றும் 5-இன் பெருக்கலாக எழுதுவோம். பூரண வர்க்கக் காரணியான 16-இன் வர்க்கமூலத்தை எடுப்போம்.',
          '√80 = √(16 × 5) = 4√5',String.raw`\sqrt{80}=\sqrt{16\times5}=4\sqrt5`),
        work('Divide both sides by the nonzero radical to read the coefficient.',
          'இருபுறத்தையும் பூச்சியமல்லாத வர்க்கமூலத்தால் வகுத்துக் கெழுவைப் பெறுவோம்.',
          'k = 4√5 / √5 = 4',String.raw`k=\dfrac{4\sqrt5}{\sqrt5}=4`)
      ]
    },
    {
      prompt:bilingual(math('4√7 × 2√3 =',String.raw`4\sqrt7\times2\sqrt3=`)),
      options:[
        math('6√10',String.raw`6\sqrt{10}`),math('8√21',String.raw`8\sqrt{21}`),
        math('8√10',String.raw`8\sqrt{10}`),math('6√21',String.raw`6\sqrt{21}`)
      ],correct:2,
      steps:[
        work('Regroup the coefficients, then combine the positive radicands under one radical.',
          'கெழுக்களை ஒன்றாகச் சேர்ப்போம். மிகை மூல எண்களின் பெருக்கலை ஒரே வர்க்கமூலக் குறிக்குள் எழுதுவோம்.',
          '4√7 × 2√3 = (4 × 2)√(7 × 3)',String.raw`4\sqrt7\times2\sqrt3=(4\times2)\sqrt{7\times3}`),
        work('Multiply both pairs. The radicand 21 has no perfect-square factor greater than 1.',
          'இரு சோடிகளையும் பெருக்குவோம். 21-க்கு 1-ஐ விடப் பெரிய பூரண வர்க்கக் காரணி இல்லை.',
          '(4 × 2)√(7 × 3) = 8√21',String.raw`(4\times2)\sqrt{7\times3}=8\sqrt{21}`)
      ]
    },
    {
      prompt:bilingual(['When written with a rational denominator, the expression ',math('2√3/(3√2)',String.raw`\dfrac{2\sqrt3}{3\sqrt2}`),' can be simplified as'],
        [math('2√3/(3√2)',String.raw`\dfrac{2\sqrt3}{3\sqrt2}`),' இன் பகுதியை விகிதமுறு எண்ணாக மாற்றிய பின் சுருங்கிய வடிவம்']),
      options:[
        math('√2/3',String.raw`\dfrac{\sqrt2}{3}`),math('√3/2',String.raw`\dfrac{\sqrt3}{2}`),
        math('√6/3',String.raw`\dfrac{\sqrt6}{3}`),ratio(2,3)
      ],correct:3,
      steps:[
        work('Multiply the numerator and denominator by the same nonzero square root. The product of the two square roots in the denominator is 2.',
          'தொகுதியையும் பகுதியையும் ஒரே பூச்சியமற்ற வர்க்கமூலத்தால் பெருக்குவோம். பகுதியிலுள்ள இரு வர்க்கமூலங்களின் பெருக்கல் 2.',
          '2√3/(3√2) × √2/√2 = 2√6/6',String.raw`\dfrac{2\sqrt3}{3\sqrt2}\times\dfrac{\sqrt2}{\sqrt2}=\dfrac{2\sqrt6}{6}`),
        work('Cancel the common factor 2. The remaining denominator is rational.',
          'பொதுக் காரணி 2-ஐ நீக்குவோம். மீதமுள்ள பகுதி விகிதமுறு எண்.',
          '2√6/6 = √6/3',String.raw`\dfrac{2\sqrt6}{6}=\dfrac{\sqrt6}{3}`)
      ]
    },
    {
      prompt:bilingual(['When ',math('(2√5 − √2)²',String.raw`(2\sqrt5-\sqrt2)^2`),' is simplified, we get'],
        [math('(2√5 − √2)²',String.raw`(2\sqrt5-\sqrt2)^2`),' இன் சுருங்கிய வடிவம்']),
      options:[
        math('4√5 + 2√2',String.raw`4\sqrt5+2\sqrt2`),math('22 − 4√10',String.raw`22-4\sqrt{10}`),
        math('8 − 4√10',String.raw`8-4\sqrt{10}`),math('2√10 − 2',String.raw`2\sqrt{10}-2`)
      ],correct:2,
      steps:[
        work('Use the square of a difference. Keep the middle term from multiplying the two unlike terms.',
          'வித்தியாசத்தின் வர்க்க முற்றொருமையைப் பயன்படுத்துவோம். இரு மாறுபட்ட உறுப்புகளைப் பெருக்கும்போது கிடைக்கும் நடு உறுப்பையும் வைத்திருக்க வேண்டும்.',
          '(a − b)² = a² − 2ab + b²',String.raw`(a-b)^2=a^2-2ab+b^2`),
        work('The squared terms give 20 and 2. The middle term gives negative four times the square root of 10.',
          'வர்க்க உறுப்புகள் 20 மற்றும் 2-ஐத் தருகின்றன. நடு உறுப்பு 10-இன் வர்க்கமூலத்தின் எதிர்மறையான நான்கு மடங்கு.',
          '(2√5 − √2)² = 20 − 4√10 + 2 = 22 − 4√10',
          String.raw`\begin{aligned}(2\sqrt5-\sqrt2)^2&=20-4\sqrt{10}+2\\&=22-4\sqrt{10}\end{aligned}`)
      ]
    },
    {
      prompt:bilingual(math('(0.000729)^(−3/4) × (0.09)^(−3/4) = ______',
        String.raw`(0.000729)^{-\frac34}\times(0.09)^{-\frac34}=\underline{\qquad}`)),
      options:[3,5,2,6].map((n,i)=>math(['10³/3³','10⁵/3⁵','10²/3²','10⁶/3⁶'][i],String.raw`\dfrac{10^{${n}}}{3^{${n}}}`)),correct:4,
      steps:[
        work('Write both decimals as powers of the same positive fraction.',
          'இரு தசமங்களையும் ஒரே மிகை பின்னத்தின் அடுக்குகளாக எழுதுவோம்.',
          '0.000729 = (3/10)⁶; 0.09 = (3/10)²',
          String.raw`\begin{aligned}0.000729&=\left(\dfrac3{10}\right)^6\\0.09&=\left(\dfrac3{10}\right)^2\end{aligned}`),
        work('Multiply the inner exponents by the outer exponent, add them for the product, and apply the reciprocal rule for the negative exponent.',
          'உள் அடுக்குகளை வெளி அடுக்கால் பெருக்குவோம். ஒரே அடிமானத்தின் பெருக்கலில் அடுக்குகளைக் கூட்டி, குறை அடுக்கின் தலைகீழ் விதியைப் பயன்படுத்துவோம்.',
          '6(−3/4) + 2(−3/4) = −6; (3/10)⁻⁶ = 10⁶/3⁶',
          String.raw`\begin{gathered}6\left(-\dfrac34\right)+2\left(-\dfrac34\right)=-6\\\left(\dfrac3{10}\right)^{-6}=\dfrac{10^6}{3^6}\end{gathered}`)
      ]
    },
    {
      prompt:bilingual(['If ',math('√(9ˣ) = ∛(9²)',String.raw`\sqrt{9^x}=\sqrt[3]{9^2}`),', then ',math('x = ______',String.raw`x=\underline{\qquad}`)],
        [math('√(9ˣ) = ∛(9²)',String.raw`\sqrt{9^x}=\sqrt[3]{9^2}`),' எனில், ',math('x = ______',String.raw`x=\underline{\qquad}`)]),
      options:[ratio(2,3),ratio(4,3),ratio(1,3),ratio(5,3)],correct:2,
      steps:[
        work('Rewrite the roots as fractional powers of 9. Because 9 is greater than 1, equal powers have equal exponents.',
          'மூலங்களை 9-இன் பின்ன அடுக்குகளாக எழுதுவோம். 9 என்பது 1-ஐ விடப் பெரியது. அதன் அடுக்கு வடிவங்கள் சமம் எனில் அவற்றின் அடுக்குகளும் சமம்.',
          '9^(x/2) = 9^(2/3) ⇒ x/2 = 2/3',String.raw`9^{\frac x2}=9^{\frac23}\quad\Rightarrow\quad\dfrac x2=\dfrac23`),
        work('Multiply both sides of the exponent equation by 2.',
          'அடுக்குச் சமன்பாட்டின் இருபுறத்தையும் 2-ஆல் பெருக்குவோம்.',
          'x = 2 × (2/3) = 4/3',String.raw`x=2\times\dfrac23=\dfrac43`)
      ]
    },
    {
      prompt:bilingual(['The length and breadth of a rectangular plot are ',math('5 × 10⁵',String.raw`5\times10^5`),' and ',
        math('4 × 10⁴',String.raw`4\times10^4`),' metres respectively. Its area is ______.'],
        ['ஒரு செவ்வக வடிவ வீட்டு மனையின் நீளம் மற்றும் அகலங்கள் முறையே ',math('5 × 10⁵',String.raw`5\times10^5`),' மற்றும் ',
        math('4 × 10⁴',String.raw`4\times10^4`),' மீட்டர் எனில், அதன் பரப்பளவு என்ன?']),
      options:[['9 × 10¹',9,1],['9 × 10⁹',9,9],['2 × 10¹⁰',2,10],['20 × 10²⁰',20,20]].map(([fallback,n,p])=>{
        const magnitude=math(fallback,String.raw`${n}\times10^{${p}}`);
        return bilingual([magnitude,' m²'],[magnitude,' மீ²']);
      }),correct:3,
      steps:[
        work('Multiply length by breadth. Multiply the leading numbers and add the powers of ten.',
          'நீளத்தையும் அகலத்தையும் பெருக்குவோம். முன்னுள்ள எண்களைப் பெருக்கி, 10-இன் அடுக்குகளைக் கூட்டுவோம்.',
          '(5 × 10⁵)(4 × 10⁴) = (5 × 4) × 10⁵⁺⁴ = 20 × 10⁹',
          String.raw`\begin{aligned}(5\times10^5)(4\times10^4)&=(5\times4)\times10^{5+4}\\&=20\times10^9\end{aligned}`),
        work('Move one factor of ten from 20 to the power. The multiplication of two lengths gives square metres.',
          '20-இலிருந்து ஒரு 10-ஐ அடுக்குடன் சேர்ப்போம். இரு நீளங்களைப் பெருக்குவதால் பரப்பளவின் அலகு சதுர மீட்டர்.',
          '20 × 10⁹ = 2 × 10¹⁰',String.raw`20\times10^9=2\times10^{10}`)
      ]
    }
  ];

  const answerOnly = {
    'ex1-q1':['அம்புக்குறி D (',math('11/3 = 3⅔ ≈ 3.667',String.raw`\dfrac{11}{3}=3\dfrac23\approx3.667`),')'],
    'ex2-q1-i':[recurring('0.','285714'),' — சுழல் தசமம், சுழற்சி நீளம் 6'],
    'ex2-q1-ii':[recurring('−5.','27'),' — சுழல் தசமம், சுழற்சி நீளம் 2'],
    'ex2-q1-iii':[recurring('7.','3'),' — சுழல் தசமம், சுழற்சி நீளம் 1'],
    'ex2-q1-iv':[math('1.635','1.635'),' — முடிவுறு தசமம்'],
    'ex2-q2':[math('1/13 = 0.(076923)',String.raw`\dfrac{1}{13}=0.\overline{076923}`),' — சுழற்சி நீளம் 6'],
    'ex2-q5-i':'ஆம், முடிவுறு தசமம்.',
    'ex2-q5-ii':'ஆம், முடிவுறு தசமம்.',
    'ex2-q5-iii':'இல்லை, சுழல் தசமம்.',
    'ex2-q5-iv':'இல்லை, சுழல் தசமம்.',
    'ex3-q2-ii':[math('√3/2',String.raw`\dfrac{\sqrt3}{2}`),' மற்றும் ',math('√(4/5)',String.raw`\sqrt{\dfrac45}`)],
    'ex3-q2-iii':[math('√(5/2)',String.raw`\sqrt{\dfrac52}`),' மற்றும் ',math('√(8/3)',String.raw`\sqrt{\dfrac83}`)],
    'ex6-q5-i':['ஆம். ',math('√2/2 + √2/2 = √2',String.raw`\dfrac{\sqrt2}2+\dfrac{\sqrt2}2=\sqrt2`)],
    'ex6-q5-ii':['ஆம். ',math('√8 − √2 = √2',String.raw`\sqrt8-\sqrt2=\sqrt2`)],
    'ex6-q5-iii':['ஆம். ',math('√2 × √3 = √6',String.raw`\sqrt2\times\sqrt3=\sqrt6`)],
    'ex6-q5-iv':['ஆம். ',math('√6 ÷ √2 = √3',String.raw`\dfrac{\sqrt6}{\sqrt2}=\sqrt3`)],
    'ex6-q6-i':['ஆம். ',math('√2 + (−√2) = 0',String.raw`\sqrt2+(-\sqrt2)=0`)],
    'ex6-q6-ii':['ஆம். ',math('√3 − √3 = 0',String.raw`\sqrt3-\sqrt3=0`)],
    'ex6-q6-iii':['ஆம். ',math('√2 × √8 = 4',String.raw`\sqrt2\times\sqrt8=4`)],
    'ex6-q6-iv':['ஆம். ',math('√18 ÷ √2 = 3',String.raw`\dfrac{\sqrt{18}}{\sqrt2}=3`)]
  };
  const pureSurds = [
    'தனி முறுடுகளுக்கான எடுத்துக்காட்டுகள் ',...roots(2),', ',...roots(3),', ',...roots(6),'.'
  ];
  const tamilEquations = {
    'ex1-q1':{1:['அம்புக்குறி D, ',math('11/3 ≈ 3.67',String.raw`\dfrac{11}{3}\approx3.67`)]},
    'ex2-q1-i':{1:'சுழல் தசமம். சுழற்சி நீளம் 6.'},
    'ex2-q1-ii':{1:'சுழல் தசமம். சுழற்சி நீளம் 2.'},
    'ex2-q1-iii':{1:'சுழல் தசமம். சுழற்சி நீளம் 1.'},
    'ex2-q1-iv':{1:'முடிவுறு தசமம்.'},
    'ex2-q2':{1:'சுழற்சி நீளம் 6.'},
    'ex2-q5-i':{1:'ஆம், முடிவுறு தசமம்.'},
    'ex2-q5-ii':{1:'ஆம், முடிவுறு தசமம்.'},
    'ex2-q5-iii':{1:'இல்லை, சுழல் தசமம்.'},
    'ex2-q5-iv':{0:[math('2200 = 2³ × 5² × 11',String.raw`2200=2^3\times5^2\times11`),'. தொகுதி 219 என்பது 11-ஆல் வகுபடாது.'],
      1:'இல்லை, சுழல் தசமம்.'},
    'ex6-q5-i':{0:pureSurds},
    'ex6-q5-ii':{0:pureSurds},
    'ex6-q5-iii':{0:pureSurds},
    'ex6-q5-iv':{0:pureSurds}
  };

  const stageForQuestion = [0,0,0,1,0,0,1,1,4,2,0,0,4,4,4,5,4,3,3,6];
  const hintForStage = {
    0:bilingual('Recall the difference between rational and irrational numbers and how square roots are defined.',
      'விகிதமுறு, விகிதமுறா எண்களின் வேறுபாட்டையும் வர்க்கமூலத்தின் பொருளையும் நினைவுகூர்க.'),
    1:bilingual('Work with fractions in lowest terms and inspect the denominators.',
      'பின்னங்களை எளிய வடிவில் எழுதி அவற்றின் பகுதிகளைக் கவனிக்கவும்.'),
    2:bilingual('Turn each recurring decimal into a fraction before adding.',
      'கூட்டுவதற்கு முன்பு ஒவ்வொரு சுழல் தசமத்தையும் பின்னமாக மாற்றுக.'),
    3:bilingual('Rewrite the expressions using one common positive base.',
      'கோவைகளை ஒரே மிகை அடிமானத்தின் அடுக்குகளாக எழுதுக.'),
    4:bilingual('Use square factors to simplify the radicals before combining terms.',
      'உறுப்புகளை இணைப்பதற்கு முன் வர்க்கக் காரணிகளைக் கொண்டு முறுடுகளைச் சுருக்குக.'),
    5:bilingual('Look for a factor that turns the radical in the denominator into a whole number.',
      'பகுதியிலுள்ள வர்க்கமூலத்தை ஒரு முழு எண்ணாக மாற்றும் காரணியைக் கண்டறிக.'),
    6:bilingual('Write the area as a product of two lengths before simplifying the powers of ten.',
      '10-இன் அடுக்குகளைச் சுருக்குவதற்கு முன்பு பரப்பளவை இரு நீளங்களின் பெருக்கலாக எழுதுக.')
  };

  window.TriggleG9RealFrontier = items => {
    const byId = new Map(items.filter(item=>item.chapter==='2').map(item=>[item.id,item]));
    for (const [suffix,ta] of Object.entries(answerOnly)) {
      const item = byId.get('g9-ch2-'+suffix);
      if (!item) continue;
      const localized = tamilEquations[suffix];
      if(localized)item.steps=item.steps.map((step,i)=>localized[i]?{...step,mathTa:localized[i]}:step);
      Object.assign(item,{answerTa:flat(ta),answerMath:{ta}});
    }
    reviewed.forEach(({prompt,options,correct,steps},index) => {
      const item = byId.get('g9-ch2-ex9-q'+(index+1));
      if (!item) return;
      const choices = options.map((value,optionIndex) => {
        const number = '('+(optionIndex+1)+') ';
        return bilingual([number,value.en??value],[number,value.ta??value]);
      });
      const realConcept = stageForQuestion[index];
      const why = window.TriggleWhyStepG9?.hints[item.id];
      const answer = choices[correct-1];
      Object.assign(item,{
        q:{en:flat(prompt.en),ta:flat(prompt.ta)},questionMath:prompt,
        choices,correctIndex:correct-1,steps:steps.map((row,i)=>i===0&&why?{...row,why:{en:why.en,ta:why.ta}}:row),
        answerTa:flat(['விடை ',answer.ta]),
        answerMath:bilingual(['Option ',answer.en],['விடை ',answer.ta]),
        realConcept,hint:hintForStage[realConcept],notationSource:'authored'
      });
    });
  };
})();
