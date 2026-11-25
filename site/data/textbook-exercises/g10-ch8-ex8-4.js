/* Grade 10, revised 2025. Exercise 8.4, English p. 329 / Tamil pp. 341–342. */
(() => {
  'use strict';
  const grade = window.TRIGGLE_CLASSES[10];
  const chapter = window.TRIGGLE_CURRICULUM.grades.find(g => g.grade === 10).chapters.find(c => c.number === 8);
  const source = 'https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view';
  const math = (fallback, latex, display = true) => ({fallback, latex, display});
  const step = (en, ta, eq, latex) => ({en, ta, eq, math: math(eq, latex)});
  const bilingual = (en, ta) => ({en, ta});
  const prompt = (...segments) => segments.map(s => Array.isArray(s) ? math(...s, false) : s);
  const fallback = segments => segments.map(s => typeof s === 'string' ? s : s.fallback).join('');
  const tex = String.raw;

  function question(number, title, questionMath, steps, answer, answerLatex) {
    const tamilPage = Number.parseInt(number, 10) < 9 ? 341 : 342;
    return {
      id: 'c10-8-ex8-4-q' + number.replace(/\(([iv]+)\)/, '-$1'),
      classNum: 10,
      chapter: '8',
      exercise: '8.4',
      topic: chapter.title,
      label: bilingual('Exercise 8.4 · Q' + number, 'பயிற்சி 8.4 · வினா ' + number),
      title,
      q: bilingual(fallback(questionMath.en), fallback(questionMath.ta)),
      questionMath,
      steps,
      answer: bilingual(answer, answer),
      answerMath: math(answer, tex`\boxed{${answerLatex}}`),
      kind: 'textbook',
      source,
      reference: `TN SCERT, Grade 10 Mathematics, revised 2025. English printed p. 329 / PDF p. 335. Tamil printed p. ${tamilPage} / PDF p. ${tamilPage + 6}. Both pages visually checked.`,
      edition: '2025',
      translationReview: 'pending',
      tamilQuestionSourceVerified: true,
      tamilWorkedSolutionReview: 'pending',
      sourceFidelity: {status: 'page-visual-checked', sourcePdfPage: {en: 335, ta: tamilPage + 6}}
    };
  }

  const givenA = ['P(A) = 0.42', tex`P(A)=0.42`];
  const givenB = ['P(B) = 0.48', tex`P(B)=0.48`];
  const overlap = ['P(A ∩ B) = 0.16', tex`P(A\cap B)=0.16`];
  const q2 = bilingual(
    prompt('2. A and B are two events such that, ', givenA, ', ', givenB, ', and ', overlap, '. Find (i) ', ['P(not A)', tex`P(\text{not }A)`], ' (ii) ', ['P(not B)', tex`P(\text{not }B)`], ' (iii) ', ['P(A or B)', tex`P(A\text{ or }B)`]),
    prompt('2. A மற்றும் B ஆகியவை இரு நிகழ்ச்சிகள். மேலும், ', givenA, ', ', givenB, ' மற்றும் ', overlap, ' எனில் (i) P(A இல்லை) (ii) P(B இல்லை) (iii) P(A அல்லது B) ஆகியவற்றைக் காண்க.')
  );
  const complement = step('An event and its complement cover the whole sample space without overlap.',
    'ஒரு நிகழ்ச்சியும் அதன் நிரப்பு நிகழ்ச்சியும் பொதுவான விளைவுகள் இல்லாமல் கூறுவெளி முழுவதையும் உள்ளடக்கும்.',
    'P(E) + P(Ē) = 1', tex`P(E)+P(\overline E)=1`);
  const addition = step('When adding the two probabilities, the outcomes common to both events are counted twice. Subtract their probability once.',
    'இரு நிகழ்தகவுகளைக் கூட்டும்போது பொது விளைவுகள் இருமுறை கணக்கிடப்படுகின்றன. எனவே அவற்றின் நிகழ்தகவை ஒருமுறை கழிக்க வேண்டும்.',
    'P(A ∪ B) = P(A) + P(B) − P(A ∩ B)', tex`P(A\cup B)=P(A)+P(B)-P(A\cap B)`);
  const plain = (en, ta) => bilingual(prompt(en), prompt(ta));

  const items = [
    question('2(i)', bilingual('Probability of not A', 'A நிகழாமல் இருப்பதற்கான நிகழ்தகவு'), q2, [
      complement,
      step('Use the complement rule for A.', 'நிரப்பு நிகழ்ச்சிக்கான விதியை A-க்குப் பயன்படுத்துக.',
        'P(Ā) = 1 − P(A) = 1 − 0.42 = 0.58', tex`P(\overline A)=1-P(A)=1-0.42=0.58`)
    ], '0.58', '0.58'),
    question('2(ii)', bilingual('Probability of not B', 'B நிகழாமல் இருப்பதற்கான நிகழ்தகவு'), q2, [
      complement,
      step('Use the complement rule for B.', 'நிரப்பு நிகழ்ச்சிக்கான விதியை B-க்குப் பயன்படுத்துக.',
        'P(B̄) = 1 − P(B) = 1 − 0.48 = 0.52', tex`P(\overline B)=1-P(B)=1-0.48=0.52`)
    ], '0.52', '0.52'),
    question('2(iii)', bilingual('Probability of A or B', 'A அல்லது B நிகழ்வதற்கான நிகழ்தகவு'), q2, [
      addition,
      step('Substitute the given probabilities.', 'கொடுக்கப்பட்ட நிகழ்தகவுகளைப் பிரதியிடுக.',
        'P(A ∪ B) = 0.42 + 0.48 − 0.16 = 0.74', tex`P(A\cup B)=0.42+0.48-0.16=0.74`)
    ], '0.74', '0.74'),
    question('3', bilingual('Union of mutually exclusive events', 'ஒன்றையொன்று விலக்கும் நிகழ்ச்சிகளின் சேர்ப்பு'), bilingual(
      prompt('3. If A and B are two mutually exclusive events of a random experiment and ', ['P(not A) = 0.45', tex`P(\text{not } A)=0.45`], ', ', ['P(A ∪ B) = 0.65', tex`P(A\cup B)=0.65`], ', then find ', ['P(B)', 'P(B)'], '.'),
      prompt('3. ஒரு சமவாய்ப்புச் சோதனையில் A, B ஆகியவை ஒன்றையொன்று விலக்கும் நிகழ்ச்சிகள். மேலும் ', 'P(A இல்லை) = 0.45, ', ['P(A ∪ B) = 0.65', tex`P(A\cup B)=0.65`], ' எனில், ', ['P(B)', 'P(B)'], ' -ஐக் காண்க.')
    ), [
      step('Recover the probability of A from its complement.', 'A-இன் நிரப்பு நிகழ்ச்சியின் நிகழ்தகவிலிருந்து A-இன் நிகழ்தகவைக் காண்க.',
        'P(A) = 1 − 0.45 = 0.55', 'P(A)=1-0.45=0.55'),
      step('Mutually exclusive events cannot happen together. Their intersection has probability zero, so add their probabilities to get the union.',
        'ஒன்றையொன்று விலக்கும் நிகழ்ச்சிகள் ஒரே நேரத்தில் நிகழாது. அவற்றின் வெட்டின் நிகழ்தகவு பூச்சியம் என்பதால் சேர்ப்பின் நிகழ்தகவு அவற்றின் கூடுதலாகும்.',
        'P(A ∩ B) = 0; 0.65 = 0.55 + P(B)', tex`P(A\cap B)=0,\qquad 0.65=0.55+P(B)`),
      step('Subtract the probability of A.', 'A-இன் நிகழ்தகவைக் கழிக்கவும்.',
        'P(B) = 0.65 − 0.55 = 0.10', 'P(B)=0.65-0.55=0.10')
    ], '0.10', '0.10'),
    question('4', bilingual('Sum of two complement probabilities', 'இரு நிரப்பு நிகழ்ச்சிகளின் நிகழ்தகவுகளின் கூடுதல்'), bilingual(
      prompt('4. The probability that atleast one of A and B occur is 0.6. If A and B occur simultaneously with probability 0.2, then find ', ['P(Ā) + P(B̄)', tex`P(\overline A)+P(\overline B)`], '.'),
      prompt('4. A மற்றும் B -யில், குறைந்தது ஏதாவது ஒன்று நிகழ்வதற்கான நிகழ்தகவு 0.6. A மற்றும் B ஒரே நேரத்தில் நடைபெறுவதற்கான நிகழ்தகவு 0.2 எனில், ', ['P(Ā) + P(B̄)', tex`P(\overline A)+P(\overline B)`], ' -ஐக் காண்க.')
    ), [
      step('“At least one” is the union, and “simultaneously” is the intersection. Add their probabilities to recover the sum of the individual probabilities.',
        '“குறைந்தது ஒன்று” என்பது சேர்ப்பு. “ஒரே நேரத்தில்” என்பது வெட்டு. இவற்றின் நிகழ்தகவுகளைக் கூட்டினால் தனித்தனி நிகழ்தகவுகளின் கூடுதல் கிடைக்கும்.',
        'P(A) + P(B) = P(A ∪ B) + P(A ∩ B) = 0.6 + 0.2 = 0.8',
        tex`\begin{aligned}P(A)+P(B)&=P(A\cup B)+P(A\cap B)\\&=0.6+0.2=0.8\end{aligned}`),
      step('Each complement equals one minus its own event probability. The sum counts two separate probabilities, so it can exceed one.',
        'ஒவ்வொரு நிரப்பு நிகழ்ச்சியின் நிகழ்தகவும் ஒன்றிலிருந்து அதற்குரிய நிகழ்ச்சியின் நிகழ்தகவைக் கழித்த மதிப்பு. இது இரு நிகழ்தகவுகளின் கூடுதல் என்பதால் ஒன்றை விட அதிகமாக இருக்கலாம்.',
        'P(Ā) + P(B̄) = 2 − (P(A) + P(B)) = 2 − 0.8 = 1.2',
        tex`\begin{aligned}P(\overline A)+P(\overline B)&=2-[P(A)+P(B)]\\&=2-0.8=1.2\end{aligned}`)
    ], '1.2', '1.2'),
    question('5', bilingual('Probability of neither event', 'இரு நிகழ்ச்சிகளும் நிகழாமல் இருப்பதற்கான நிகழ்தகவு'), plain(
      '5. The probability of happening of an event A is 0.5 and that of B is 0.3. If A and B are mutually exclusive events, then find the probability that neither A nor B happen.',
      '5. நிகழ்ச்சி A -க்கான நிகழ்தகவு 0.5 மற்றும் B -க்கான நிகழ்தகவு 0.3. A மற்றும் B ஆகியவை ஒன்றையொன்று விலக்கும் நிகழ்ச்சிகள் எனில், A -ம், B -ம் நிகழாமல் இருப்பதற்கான நிகழ்தகவைக் காண்க.'
    ), [
      step('The events are mutually exclusive, so their union has probability equal to the sum.',
        'இவை ஒன்றையொன்று விலக்கும் நிகழ்ச்சிகள் என்பதால் சேர்ப்பின் நிகழ்தகவு அவற்றின் நிகழ்தகவுகளின் கூடுதலாகும்.',
        'P(A ∪ B) = 0.5 + 0.3 = 0.8', tex`P(A\cup B)=0.5+0.3=0.8`),
      step('Neither event occurs exactly when the union does not occur.',
        'இரு நிகழ்ச்சிகளும் நிகழாமல் இருப்பது சேர்ப்பின் நிரப்பு நிகழ்ச்சியாகும்.',
        'P((A ∪ B)̄) = 1 − 0.8 = 0.2', tex`P(\overline{A\cup B})=1-0.8=0.2`)
    ], '0.2', '0.2'),
    question('6', bilingual('Even first die or a sum of eight', 'முதல் பகடையில் இரட்டைப்படை எண் அல்லது கூடுதல் எட்டு'), plain(
      '6. Two dice are rolled once. Find the probability of getting an even number on the first die or a total of face sum 8.',
      '6. இரண்டு பகடைகள் ஒரு முறை உருட்டப்படுகின்றன. முதல் பகடையில் முக மதிப்பு இரட்டைப்படை எண் அல்லது முக மதிப்புகளின் கூடுதல் 8 ஆகக் கிடைப்பதற்கான நிகழ்தகவைக் காண்க.'
    ), [
      step('Record the first and second dice as an ordered pair. Assuming fair dice with independent outcomes gives 36 equally likely pairs. Let A be the event that the first die is even and B the event that the sum is eight.',
        'முதல் மற்றும் இரண்டாம் பகடைகளின் முக மதிப்புகளை வரிசைச் சோடியாக எழுதுக. சீரான பகடைகளின் விளைவுகள் ஒன்றையொன்று சாராதவை எனக் கொண்டால், 36 சமவாய்ப்புச் சோடிகள் கிடைக்கும். முதல் பகடையில் இரட்டைப்படை எண் கிடைப்பதை A எனவும், கூடுதல் எட்டு கிடைப்பதை B எனவும் கொள்க.',
        'n(S) = 6 × 6 = 36; n(A) = 3 × 6 = 18', tex`n(S)=6\times6=36,\quad n(A)=3\times6=18`),
      step('List the five pairs with sum eight. Of these, three have first value 2, 4 or 6.',
        'கூடுதல் எட்டு தரும் ஐந்து சோடிகளை எழுதுக. அவற்றில் மூன்றில் முதல் பகடையின் முக மதிப்பு 2, 4 அல்லது 6 ஆகும்.',
        'B = {(2,6), (3,5), (4,4), (5,3), (6,2)}; n(A ∩ B) = 3',
        tex`\begin{aligned}B&=\{(2,6),(3,5),(4,4),\\&\qquad(5,3),(6,2)\}\\n(A\cap B)&=3\end{aligned}`),
      step('Count the union by subtracting the three pairs that were counted twice, then divide by the total.',
        'இருமுறை எண்ணப்பட்ட மூன்று சோடிகளைக் கழித்து சேர்ப்பில் உள்ள சோடிகளின் எண்ணிக்கையைப் பெறுக. பிறகு மொத்த எண்ணிக்கையால் வகுக்கவும்.',
        'P(A ∪ B) = (18 + 5 − 3)/36 = 20/36 = 5/9',
        tex`P(A\cup B)=\dfrac{18+5-3}{36}=\dfrac{20}{36}=\dfrac59`)
    ], '5/9', tex`\dfrac59`),
    question('7', bilingual('Multiples of seven or primes', 'ஏழின் மடங்குகள் அல்லது பகா எண்கள்'), plain(
      '7. A box contains cards numbered 3, 5, 7, 9, … 35, 37. A card is drawn at random from the box. Find the probability that the drawn card have either multiples of 7 or a prime number.',
      '7. ஒரு பெட்டியில் 3, 5, 7, 9, … 35, 37 என்ற எண்கள் குறிக்கப்பட்ட அட்டைகள் உள்ளன. சமவாய்ப்பு முறையில் எடுக்கப்படும் ஒரு அட்டை ஆனது 7 -ன் மடங்காக அல்லது பகா எண்ணாக இருப்பதற்கான நிகழ்தகவைக் காண்க.'
    ), [
      step('The cards form an arithmetic progression with common difference 2. Let A be the event of drawing a multiple of 7 and B the event of drawing a prime.',
        'அட்டைகளிலுள்ள எண்கள் பொது வித்தியாசம் 2 கொண்ட கூட்டுத் தொடராகும். 7-ன் மடங்கு கிடைக்கும் நிகழ்ச்சியை A எனவும் பகா எண் கிடைக்கும் நிகழ்ச்சியை B எனவும் கொள்க.',
        'n(S) = (37 − 3)/2 + 1 = 18', tex`n(S)=\dfrac{37-3}{2}+1=18`),
      step('List the multiples and the primes. The only common number is 7.',
        'மடங்குகளையும் பகா எண்களையும் பட்டியலிடுக. 7 மட்டுமே இரண்டிற்கும் பொதுவானது.',
        'A = {7, 21, 35}; B = {3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37}; n(A ∩ B) = 1',
        tex`\begin{aligned}A&=\{7,21,35\}\\B&=\{3,5,7,11,13,17,19,\\&\qquad23,29,31,37\}\\n(A\cap B)&=1\end{aligned}`),
      step('Count the union, counting 7 just once, and divide by the number of cards.',
        '7-ஐ ஒருமுறை மட்டும் எண்ணிச் சேர்ப்பின் எண்ணிக்கையைக் காண்க. பின்னர் அட்டைகளின் மொத்த எண்ணிக்கையால் வகுக்கவும்.',
        'P(A ∪ B) = (3 + 11 − 1)/18 = 13/18', tex`P(A\cup B)=\dfrac{3+11-1}{18}=\dfrac{13}{18}`)
    ], '13/18', tex`\dfrac{13}{18}`),
    question('8', bilingual('Union of overlapping coin events', 'பொது விளைவுகளுள்ள நாணய நிகழ்ச்சிகளின் சேர்ப்பு'), plain(
      '8. Three unbiased coins are tossed once. Find the probability of getting atmost 2 tails or atleast 2 heads.',
      '8. சீரான மூன்று நாணயங்கள் ஒரு முறை சுண்டப்படுகின்றன. அதிகபட்சம் 2 பூக்கள் அல்லது குறைந்தபட்சம் 2 தலைகள் கிடைப்பதற்கான நிகழ்தகவைக் காண்க.'
    ), [
      step('Write H for heads and T for tails. The three fair, independent coins give eight equally likely ordered outcomes.',
        'தலையைக் H எனவும் பூவை T எனவும் குறிக்கவும். மூன்று சீரான நாணயங்களின் விளைவுகள் சாராதவை என்பதால் வரிசைப்படுத்தப்பட்ட எட்டு சமவாய்ப்பு விளைவுகள் கிடைக்கும்.',
        'S = {HHH, HHT, HTH, HTT, THH, THT, TTH, TTT}; n(S) = 8',
        tex`\begin{aligned}S&=\{HHH,HHT,HTH,HTT,\\&\qquad THH,THT,TTH,TTT\}\\n(S)&=2^3=8\end{aligned}`),
      step('Let A mean at most two tails and B mean at least two heads. Every outcome in B has at most one tail and is already in A. Only TTT is outside A.',
        'அதிகபட்சம் இரண்டு பூக்கள் கிடைப்பதை A எனவும் குறைந்தபட்சம் இரண்டு தலைகள் கிடைப்பதை B எனவும் கொள்க. B-இன் ஒவ்வொரு விளைவிலும் அதிகபட்சம் ஒரு பூ மட்டுமே இருப்பதால் அது A-இலும் உள்ளது. TTT மட்டுமே A-இல் இல்லை.',
        'B ⊆ A; A ∪ B = A; n(A) = 8 − 1 = 7',
        tex`B\subseteq A,\qquad A\cup B=A,\qquad n(A)=7`),
      step('Divide the seven favourable outcomes by the eight possible outcomes.',
        'ஏழு சாதகமான விளைவுகளை மொத்தம் எட்டு விளைவுகளால் வகுக்கவும்.',
        'P(A ∪ B) = 7/8', tex`P(A\cup B)=\dfrac78`)
    ], '7/8', tex`\dfrac78`),
    question('9', bilingual('Probability of winning both contracts', 'இரண்டு ஒப்பந்தங்களும் கிடைப்பதற்கான நிகழ்தகவு'), bilingual(
      prompt('9. The probability that a person will get an electrification contract is ', ['3/5', tex`\dfrac35`], ' and the probability that he will not get plumbing contract is ', ['5/8', tex`\dfrac58`], '. The probability of getting atleast one contract is ', ['5/7', tex`\dfrac57`], '. What is the probability that he will get both?'),
      prompt('9. ஒருவருக்கு மின்சார ஒப்பந்தம் கிடைப்பதற்கான நிகழ்தகவு ', ['3/5', tex`\dfrac35`], ' மற்றும் குழாய்கள் பொருத்துவதற்கான ஒப்பந்தம் கிடைக்காமல் இருப்பதற்கான நிகழ்தகவு ', ['5/8', tex`\dfrac58`], ' ஆகும். மேலும் குறைந்தபட்சம் ஏதாவது ஒரு ஒப்பந்தம் கிடைக்கப்பெறுவதற்கான நிகழ்தகவு ', ['5/7', tex`\dfrac57`], ' எனில், இரண்டு ஒப்பந்தங்களும் கிடைப்பதற்கான நிகழ்தகவு என்ன?')
    ), [
      step('Let A mean getting the electrification contract and B mean getting the plumbing contract. Use the complement rule to find the probability of B.',
        'மின்சார ஒப்பந்தம் கிடைப்பதை A எனவும் குழாய்கள் பொருத்தும் ஒப்பந்தம் கிடைப்பதை B எனவும் கொள்க. நிரப்பு நிகழ்ச்சிக்கான விதியால் B-இன் நிகழ்தகவைக் காண்க.',
        'P(B) = 1 − 5/8 = 3/8', tex`P(B)=1-\dfrac58=\dfrac38`),
      addition,
      step('Solve the addition formula for the intersection. Use 280 as the common denominator.',
        'கூட்டல் தேற்றத்தை மாற்றியமைத்து வெட்டின் நிகழ்தகவைக் காண்க. 280-ஐப் பொது பகுதியாகப் பயன்படுத்துக.',
        'P(A ∩ B) = 3/5 + 3/8 − 5/7 = (168 + 105 − 200)/280 = 73/280',
        tex`\begin{aligned}P(A\cap B)&=\dfrac35+\dfrac38-\dfrac57\\&=\dfrac{168+105-200}{280}=\dfrac{73}{280}\end{aligned}`)
    ], '73/280', tex`\dfrac{73}{280}`),
    question('10', bilingual('Female or over fifty years old', 'பெண் அல்லது ஐம்பது வயதிற்கு மேற்பட்டவர்'), plain(
      '10. In a town of 8000 people, 1300 are over 50 years and 3000 are females. It is known that 30% of the females are over 50 years. What is the probability that a chosen individual from the town is either a female or over 50 years?',
      '10. 8000 மக்கள்தொகை கொண்ட ஒரு நகரத்தில், 1300 பேர் 50 வயதிற்கு மேற்பட்டவர்கள் மற்றும் 3000 பேர் பெண்கள். மேலும் 50 வயதிற்கு மேற்பட்ட பெண்கள் 30% உள்ளனர் எனவும் தெரியவருகிறது. தேர்ந்தெடுக்கப்படும் ஒரு நபர், பெண்ணாக அல்லது 50 வயதிற்கு மேற்பட்டவராக இருப்பதற்கான நிகழ்தகவைக் காண்க.'
    ), [
      step('Let F represent females and O represent people over 50. Apply the given percentage to the 3000 females.',
        'பெண்களை F எனவும் 50 வயதிற்கு மேற்பட்டவர்களை O எனவும் கொள்க. 3000 பெண்களில் கொடுக்கப்பட்ட சதவீதத்தைக் கணக்கிடுக.',
        'n(F ∩ O) = (30/100) × 3000 = 900', tex`n(F\cap O)=\dfrac{30}{100}\times3000=900`),
      step('Count both groups, then subtract the 900 people in both groups once.',
        'இரு தொகுதிகளின் எண்ணிக்கைகளைக் கூட்டி, இரண்டிலும் உள்ள 900 பேரை ஒருமுறை கழிக்கவும்.',
        'n(F ∪ O) = 3000 + 1300 − 900 = 3400', tex`n(F\cup O)=3000+1300-900=3400`),
      step('Divide by the number of residents, with each resident equally likely to be chosen.',
        'நகரத்தில் உள்ள ஒவ்வொருவரும் சமவாய்ப்பில் தேர்வுசெய்யப்படுவதால், நகர மக்களின் மொத்த எண்ணிக்கையால் வகுக்கவும்.',
        'P(F ∪ O) = 3400/8000 = 17/40', tex`P(F\cup O)=\dfrac{3400}{8000}=\dfrac{17}{40}`)
    ], '17/40', tex`\dfrac{17}{40}`),
    question('11', bilingual('Three overlapping coin events', 'பொது விளைவுகளுள்ள மூன்று நாணய நிகழ்ச்சிகள்'), plain(
      '11. A coin is tossed thrice. Find the probability of getting exactly two heads or atleast one tail or two consecutive heads.',
      '11. ஒரு நாணயம் மூன்று முறை சுண்டப்படுகிறது. சரியாக இரண்டு தலைகள் அல்லது குறைந்தபட்சம் ஒரு பூ அல்லது அடுத்தடுத்து இரண்டு தலைகள் கிடைப்பதற்கான நிகழ்தகவைக் காண்க.'
    ), [
      step('Let A be exactly two heads, B be at least one tail, and C be a pair of consecutive heads. Every outcome in A already has a tail, so A is contained in B.',
        'சரியாக இரண்டு தலைகளை A எனவும் குறைந்தபட்சம் ஒரு பூவை B எனவும் அடுத்தடுத்து இரண்டு தலைகளை C எனவும் கொள்க. A-இன் ஒவ்வொரு விளைவிலும் ஒரு பூ உள்ளது. எனவே A ஆனது B-இன் உட்கணம்.',
        'A = {HHT, HTH, THH} ⊆ B', tex`A=\{HHT,HTH,THH\}\subseteq B`),
      step('The only outcome outside B is HHH. It contains consecutive heads and therefore belongs to C.',
        'B-இல் இல்லாத ஒரே விளைவு HHH ஆகும். அதில் அடுத்தடுத்து தலைகள் இருப்பதால் அது C-இல் உள்ளது.',
        'B̄ = {HHH}; C = {HHH, HHT, THH}', tex`\overline B=\{HHH\},\quad C=\{HHH,HHT,THH\}`),
      step('The union therefore contains the entire sample space. The event is certain.',
        'எனவே சேர்ப்பில் கூறுவெளி முழுவதும் உள்ளது. இது உறுதி நிகழ்ச்சி.',
        'A ∪ B ∪ C = S; P(A ∪ B ∪ C) = 1', tex`A\cup B\cup C=S,\quad P(A\cup B\cup C)=1`)
    ], '1', '1'),
    question('12', bilingual('Addition theorem for three events', 'மூன்று நிகழ்ச்சிகளுக்கான கூட்டல் தேற்றம்'), (() => {
      const ab = ['P(A ∩ B) = 1/6', tex`P(A\cap B)=\dfrac16`];
      const bc = ['P(B ∩ C) = 1/4', tex`P(B\cap C)=\dfrac14`];
      const ac = ['P(A ∩ C) = 1/8', tex`P(A\cap C)=\dfrac18`];
      const union = ['P(A ∪ B ∪ C) = 9/10', tex`P(A\cup B\cup C)=\dfrac9{10}`];
      const abc = ['P(A ∩ B ∩ C) = 1/15', tex`P(A\cap B\cap C)=\dfrac1{15}`];
      return bilingual(
        prompt('12. If A, B, C are any three events such that probability of B is twice as that of probability of A and probability of C is thrice as that of probability of A and if ', ab, ', ', bc, ', ', ac, ', ', union, ', ', abc, ', then find P(A), P(B) and P(C)?'),
        prompt('12. A, B, C என்பன ஏதேனும் மூன்று நிகழ்ச்சிகள். மேலும் B கிடைப்பதற்கான நிகழ்தகவு A -ன் நிகழ்தகவைப் போல இருமடங்காகவும், C கிடைப்பதற்கான நிகழ்தகவு A-ஐ விட மூன்று மடங்காகவும் உள்ளன. மேலும் ', ab, ', ', bc, ', ', ac, ', ', union, ', ', abc, ' எனில், P(A), P(B) மற்றும் P(C) -ஐக் காண்க?')
      );
    })(), [
      step('Write the three event probabilities in terms of x.', 'மூன்று நிகழ்ச்சிகளின் நிகழ்தகவுகளையும் x மூலம் எழுதுக.',
        'P(A) = x; P(B) = 2x; P(C) = 3x', tex`P(A)=x,\quad P(B)=2x,\quad P(C)=3x`),
      step('Add the individual probabilities, subtract the pairwise intersections, and add the triple intersection back once. This counts every outcome in the union once.',
        'தனித்தனி நிகழ்தகவுகளைக் கூட்டி, இரண்டிரண்டு நிகழ்ச்சிகளின் வெட்டுகளைக் கழிக்கவும். மூன்று நிகழ்ச்சிகளுக்கும் பொதுவான வெட்டின் நிகழ்தகவை மீண்டும் ஒருமுறை கூட்டவும். இதனால் சேர்ப்பில் உள்ள ஒவ்வொரு விளைவும் ஒருமுறை கணக்கிடப்படும்.',
        'P(A ∪ B ∪ C) = P(A) + P(B) + P(C) − P(A ∩ B) − P(B ∩ C) − P(A ∩ C) + P(A ∩ B ∩ C)',
        tex`\begin{aligned}P(A\cup B\cup C)&=P(A)+P(B)+P(C)\\&\quad-P(A\cap B)-P(B\cap C)\\&\quad-P(A\cap C)+P(A\cap B\cap C)\end{aligned}`),
      step('Substitute the given values and solve using common denominator 120.',
        'கொடுக்கப்பட்ட மதிப்புகளைப் பிரதியிட்டு 120-ஐப் பொது பகுதியாகக் கொண்டு தீர்க்கவும்.',
        '9/10 = 6x − 1/6 − 1/4 − 1/8 + 1/15 ⇒ 6x = 165/120 = 11/8 ⇒ x = 11/48',
        tex`\begin{aligned}\dfrac9{10}&=6x-\dfrac16-\dfrac14-\dfrac18+\dfrac1{15}\\6x&=\dfrac{108+20+30+15-8}{120}=\dfrac{11}{8}\\x&=\dfrac{11}{48}\end{aligned}`),
      step('Multiply x by two and three to obtain the other probabilities.',
        'மற்ற இரு நிகழ்தகவுகளைக் காண x-ஐ முறையே இரண்டு மற்றும் மூன்றால் பெருக்கவும்.',
        'P(B) = 2 × 11/48 = 11/24; P(C) = 3 × 11/48 = 11/16',
        tex`\begin{aligned}P(B)&=2\times\dfrac{11}{48}=\dfrac{11}{24}\\P(C)&=3\times\dfrac{11}{48}=\dfrac{11}{16}\end{aligned}`)
    ], 'P(A) = 11/48, P(B) = 11/24, P(C) = 11/16',
    tex`\begin{aligned}P(A)&=\dfrac{11}{48}\\P(B)&=\dfrac{11}{24}\\P(C)&=\dfrac{11}{16}\end{aligned}`),
    question('13', bilingual('Prime, composite and even roll numbers', 'பகா, பகு மற்றும் இரட்டைப்படை வரிசை எண்கள்'), plain(
      '13. In a class of 35, students are numbered from 1 to 35. The ratio of boys to girls is 4:3. The roll numbers of students begin with boys and end with girls. Find the probability that a student selected is either a boy with prime roll number or a girl with composite roll number or an even roll number.',
      '13. 35 மாணவர்கள் உள்ள ஒரு வகுப்பில் ஒவ்வொருவருக்கும் 1 முதல் 35 வரை எண்கள் கொடுக்கப்பட்டுள்ளன. மாணவர்களுக்கும் மாணவிகளுக்கும் உள்ள விகிதமானது 4:3 ஆகும். வரிசை எண்கள் மாணவர்களில் தொடங்கி மாணவிகளில் முடிவடைகிறது. ஒருவர் வகுப்பிலிருந்து தேர்ந்தெடுக்கப்படுகிறார். அவர் பகா எண்ணை வரிசை எண்ணாகக் கொண்ட மாணவராகவோ அல்லது பகு எண்ணை வரிசை எண்ணாகக் கொண்ட மாணவியாகவோ அல்லது இரட்டை எண்ணை வரிசை எண்ணாகக் கொண்டவராகவோ இருப்பதற்கான நிகழ்தகவைக் காண்க.'
    ), [
      step('Divide the class into seven equal ratio parts. The boys have roll numbers 1 through 20, and the girls have 21 through 35.',
        'விகிதத்தின்படி வகுப்பை ஏழு சம பங்குகளாகப் பிரிக்கவும். மாணவர்களின் வரிசை எண்கள் 1 முதல் 20 வரை. மாணவிகளின் வரிசை எண்கள் 21 முதல் 35 வரை.',
        '35/(4 + 3) = 5; boys = 4 × 5 = 20; girls = 3 × 5 = 15',
        tex`\dfrac{35}{4+3}=5,\qquad 4\times5=20,\qquad 3\times5=15`),
      step('Count all 17 even roll numbers first. Then list the odd prime roll numbers among the boys and the odd composite roll numbers among the girls. These three groups are disjoint.',
        'முதலில் 17 இரட்டைப்படை வரிசை எண்களை எண்ணுக. பின்னர் மாணவர்களில் உள்ள ஒற்றைப்படைப் பகா எண்களையும் மாணவிகளில் உள்ள ஒற்றைப்படைப் பகு எண்களையும் பட்டியலிடுக. இம்மூன்று தொகுதிகளிலும் பொதுவான எண்கள் இல்லை.',
        'Odd primes in 1–20: 3, 5, 7, 11, 13, 17, 19. Odd composites in 21–35: 21, 25, 27, 33, 35.',
        tex`\begin{aligned}&\{3,5,7,11,13,17,19\}\\&\{21,25,27,33,35\}\end{aligned}`),
      step('Add the three counts and divide by 35, with each student equally likely to be selected.',
        'மூன்று எண்ணிக்கைகளையும் கூட்டி 35-ஆல் வகுக்கவும். ஒவ்வொரு மாணவரும் சமவாய்ப்பில் தேர்ந்தெடுக்கப்படுகிறார்.',
        'P = (17 + 7 + 5)/35 = 29/35', tex`P=\dfrac{17+7+5}{35}=\dfrac{29}{35}`)
    ], '29/35', tex`\dfrac{29}{35}`),
  ];

  Object.assign(items.find(item => item.id === 'c10-8-ex8-4-q6'), {
    figureSrc: 'assets/grade10-ch8/ex8-4-q6-dice-grid.svg',
    figureAlt: bilingual(
      'Rows are first-die values and columns are second-die values. Shaded rows 2, 4 and 6 show event A. The five outlined cells show event B. Three outlined cells lie in shaded rows.',
      'வரிசைகள் முதல் பகடையின் மதிப்புகளையும் நிரல்கள் இரண்டாம் பகடையின் மதிப்புகளையும் காட்டுகின்றன. நிறமிட்ட 2, 4, 6 வரிசைகள் A நிகழ்ச்சியைக் காட்டுகின்றன. கோடிட்ட ஐந்து கட்டங்கள் B நிகழ்ச்சியைக் காட்டுகின்றன. அவற்றில் மூன்று நிறமிட்ட வரிசைகளில் உள்ளன.'
    ),
    figureCaption: bilingual('Event A: shaded. Event B: outlined.', 'நிகழ்ச்சி A: நிறமிட்டவை. நிகழ்ச்சி B: கோடிட்டவை.')
  });

  const ids = new Set(grade.items.map(item => item.id));
  chapter.textbookQuestionIds ||= [];
  for (const item of items) {
    if (ids.has(item.id)) throw Error('Duplicate textbook ID ' + item.id);
    ids.add(item.id);
    grade.items.push(item);
    chapter.textbookQuestionIds.push(item.id);
  }
})();
