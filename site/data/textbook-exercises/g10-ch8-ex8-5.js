/* Grade 10, revised 2025. Exercise 8.5. The under-specified Q11 is in the fidelity record. */
(() => {
  'use strict';
  const grade = window.TRIGGLE_CLASSES[10];
  const chapter = window.TRIGGLE_CURRICULUM.grades.find(g => g.grade === 10).chapters.find(c => c.number === 8);
  const tex = String.raw;
  const math = (fallback, latex, display = true) => ({fallback, latex, display});
  const both = (en, ta) => ({en, ta});
  const step = (en, ta, eq, latex) => ({en, ta, eq, math: math(eq, latex)});
  const literal = parts => Array.isArray(parts) ? parts.map(p => typeof p === 'string' ? p : p.fallback).join('') : parts;
  const inline = (fallback, latex) => math(fallback, latex, false);
  const group = value => value.includes(' ') ? '(' + value + ')' : value;
  const fraction = (n, d) => inline(group(n) + '/' + group(d), tex`\dfrac{${n}}{${d}}`);
  const options = (...values) => values.map(value => typeof value === 'object' && !value.latex ? value : both(value, value));

  function question(number, title, en, ta, answers, correctIndex, steps, answer, answerLatex) {
    const englishPage = number <= 12 ? 330 : 331;
    const tamilPage = number <= 4 ? 342 : 343;
    return {
      id: 'c10-8-ex8-5-q' + number,
      classNum: 10,
      chapter: '8',
      exercise: '8.5',
      topic: chapter.title,
      label: both('Exercise 8.5 · Q' + number, 'பயிற்சி 8.5 · வினா ' + number),
      title,
      q: both(literal(en), literal(ta)),
      questionMath: both(en, ta),
      choices: answers.map((value, i) => both(
        ['(' + 'ABCD'[i] + ') ', value.en],
        ['(' + 'அஆஇஈ'[i] + ') ', value.ta]
      )),
      correctIndex,
      steps,
      answer,
      ...(answerLatex ? {answerMath: math(answer.en, tex`\boxed{${answerLatex}}`)} : {}),
      kind: 'textbook',
      source: 'https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view',
      reference: `TN SCERT, Grade 10 Mathematics, revised 2025. English printed p. ${englishPage} / PDF p. ${englishPage + 6}. Tamil printed p. ${tamilPage} / PDF p. ${tamilPage + 6}. Both pages visually checked.`,
      edition: '2025',
      translationReview: 'pending',
      tamilQuestionSourceVerified: true,
      tamilWorkedSolutionReview: 'pending',
      sourceFidelity: {status: 'page-visual-checked', sourcePdfPage: {en: englishPage + 6, ta: tamilPage + 6}}
    };
  }
  const same = value => both(value, value);
  const items = [
    question(1, both('Recognising a measure of centre', 'மைய அளவை அறிதல்'),
      '1. Which of the following is not a measure of dispersion?',
      '1. கீழே கொடுக்கப்பட்டவைகளில் எது பரவல் அளவை இல்லை?',
      options(both('Range', 'வீச்சு'), both('Standard deviation', 'திட்டவிலக்கம்'), both('Arithmetic mean', 'கூட்டுச் சராசரி'), both('Variance', 'விலக்க வர்க்கச் சராசரி')), 2, [
        both('A measure of dispersion describes how spread out the data are. Range uses the two extremes. Variance uses the squared distances from the mean, and standard deviation is its square root.',
          'பரவல் அளவை தரவுகள் எவ்வளவு பரவியுள்ளன என்பதைக் காட்டுகிறது. வீச்சு இரு எல்லை மதிப்புகளைப் பயன்படுத்துகிறது. விலக்க வர்க்கச் சராசரி, சராசரியிலிருந்து உள்ள விலக்கங்களின் வர்க்கங்களைப் பயன்படுத்துகிறது. அதன் வர்க்கமூலம் திட்டவிலக்கம்.'),
        step('The arithmetic mean is obtained by sharing the total equally among the observations. It locates the centre of the data.',
          'தரவு மதிப்புகளின் கூடுதலைத் தரவுகளின் எண்ணிக்கையால் வகுத்தால் கூட்டுச் சராசரி கிடைக்கும். இது தரவுகளின் மையத்தைக் காட்டும்.',
          'x̄ = Σxᵢ/n', tex`\bar x=\dfrac{\sum x_i}{n}`)
      ], both('(C) Arithmetic mean', '(இ) கூட்டுச் சராசரி')),
    question(2, both('Range of equal values', 'சமமான மதிப்புகளின் வீச்சு'),
      '2. The range of the data 8, 8, 8, 8, 8. . . 8 is',
      '2. 8, 8, 8, 8, 8. . ., 8 ஆகிய தரவின் வீச்சு',
      options('0', '1', '8', '3'), 0, [
        step('Every value is 8, so the largest and smallest values are both 8.',
          'எல்லா மதிப்புகளும் 8 என்பதால் மிகப்பெரிய மதிப்பும் மிகச்சிறிய மதிப்பும் 8 ஆகும்.', 'L = S = 8', 'L=S=8'),
        step('Subtract the smallest value from the largest.', 'மிகப்பெரிய மதிப்பிலிருந்து மிகச்சிறிய மதிப்பைக் கழிக்கவும்.', 'L − S = 8 − 8 = 0', 'L-S=8-8=0')
      ], same('0'), '0'),
    question(3, both('Sum of deviations from the mean', 'சராசரியிலிருந்து விலக்கங்களின் கூடுதல்'),
      '3. The sum of all deviations of the data from its mean is',
      '3. சராசரியிலிருந்து கிடைக்கப் பெற்ற தரவுப் புள்ளிகளுடைய விலக்கங்களின் கூடுதலானது _____.',
      options(both('Always positive', 'எப்பொழுதும் மிகை எண்'), both('always negative', 'எப்பொழுதும் குறை எண்'), both('zero', 'பூச்சியம்'), both('non-zero integer', 'பூச்சியமற்ற முழுக்கள்')), 2, [
        step('If there are n values, the total of the values is n times their mean.',
          'n மதிப்புகள் இருந்தால், அவற்றின் கூடுதல் சராசரியின் n மடங்கு ஆகும்.', 'Σxᵢ = n x̄', tex`\sum x_i=n\bar x`),
        step('Subtract the mean once from each of the n values. The total of those subtractions is the same as the original total.',
          'n மதிப்புகள் ஒவ்வொன்றிலிருந்தும் சராசரியைக் கழிக்கவும். கழிக்கப்படும் மொத்தம் தரவு மதிப்புகளின் கூடுதலுக்குச் சமம்.',
          'Σ(xᵢ − x̄) = Σxᵢ − n x̄ = 0', tex`\sum(x_i-\bar x)=\sum x_i-n\bar x=0`)
      ], same('0'), '0'),
    question(4, both('Recovering a sum of squares', 'வர்க்கங்களின் கூடுதலைக் காணுதல்'),
      '4. The mean of 100 observations is 40 and their standard deviation is 3. The sum of squares of all observations is',
      '4. 100 தரவுப் புள்ளிகளின் சராசரி 40 மற்றும் திட்டவிலக்கம் 3 எனில், தரவுகளின் வர்க்கங்களின் கூடுதலானது',
      options('40000', '160900', '160000', '30000'), 1, [
        step('The direct variance formula subtracts the square of the mean from the mean of the squares.',
          'நேரடி முறையில் வர்க்கங்களின் சராசரியிலிருந்து சராசரியின் வர்க்கத்தைக் கழித்தால் விலக்க வர்க்கச் சராசரி கிடைக்கும்.',
          'σ² = Σxᵢ²/n − x̄²', tex`\sigma^2=\dfrac{\sum x_i^2}{n}-\bar x^2`),
        step('Rearrange and use the mean, standard deviation and number of observations.',
          'சூத்திரத்தை மாற்றியமைத்து சராசரி, திட்டவிலக்கம், தரவுகளின் எண்ணிக்கை ஆகியவற்றைப் பிரதியிடுக.',
          'Σxᵢ² = 100(3² + 40²) = 100(1609) = 160900',
          tex`\begin{aligned}\sum x_i^2&=100(3^2+40^2)\\&=100(1609)=160900\end{aligned}`)
      ], same('160900'), '160900'),
    question(5, both('Variance of the first twenty natural numbers', 'முதல் இருபது இயல் எண்களின் விலக்க வர்க்கச் சராசரி'),
      '5. Variance of first 20 natural numbers is',
      '5. முதல் 20 இயல் எண்களின் விலக்க வர்க்கச் சராசரியானது',
      options('32.25', '44.25', '33.25', '30'), 2, [
        step('For the values 1 to n, the mean is (n + 1)/2 and the mean of their squares is (n + 1)(2n + 1)/6.',
          '1 முதல் n வரையான எண்களின் சராசரி (n + 1)/2. அவற்றின் வர்க்கங்களின் சராசரி (n + 1)(2n + 1)/6.',
          'x̄ = (n + 1)/2; Σxᵢ²/n = (n + 1)(2n + 1)/6',
          tex`\begin{aligned}\bar x&=\dfrac{n+1}{2}\\\dfrac{\sum x_i^2}{n}&=\dfrac{(n+1)(2n+1)}6\end{aligned}`),
        step('Subtract the square of the mean from the mean of the squares, then substitute 20 for n.',
          'வர்க்கங்களின் சராசரியிலிருந்து சராசரியின் வர்க்கத்தைக் கழிக்கவும். பின்னர் n-க்கு 20-ஐப் பிரதியிடுக.',
          'σ² = (n² − 1)/12 = (400 − 1)/12 = 33.25',
          tex`\sigma^2=\dfrac{n^2-1}{12}=\dfrac{400-1}{12}=33.25`)
      ], same('33.25'), '33.25'),
    question(6, both('Variance under multiplication', 'பெருக்கலால் விலக்க வர்க்கச் சராசரியில் ஏற்படும் மாற்றம்'),
      '6. The standard deviation of a data is 3. If each value is multiplied by 5 then the new variance is',
      '6. ஒரு தரவின் திட்டவிலக்கமானது 3. ஒவ்வொரு மதிப்பையும் 5-ஆல் பெருக்கினால் கிடைக்கும் புதிய தரவின் விலக்க வர்க்கச் சராசரியானது',
      options('3', '15', '5', '225'), 3, [
        step('Multiplying every value by 5 multiplies the mean and each deviation from the mean by 5. The standard deviation is multiplied by 5.',
          'ஒவ்வொரு மதிப்பையும் 5-ஆல் பெருக்கும்போது சராசரியும் ஒவ்வொரு விலக்கமும் 5 மடங்காகும். எனவே திட்டவிலக்கமும் 5 மடங்காகும்.',
          'σnew = 5 × 3 = 15', tex`\sigma_{\text{new}}=5\times3=15`),
        step('Square the new standard deviation to get the variance.',
          'புதிய திட்டவிலக்கத்தை வர்க்கப்படுத்தினால் புதிய விலக்க வர்க்கச் சராசரி கிடைக்கும்.',
          'σnew² = 15² = 225', tex`\sigma_{\text{new}}^2=15^2=225`)
      ], same('225'), '225'),
    question(7, both('Standard deviation after scaling and shifting', 'பெருக்கிக் கூட்டியபின் திட்டவிலக்கம்'),
      ['7. If the standard deviation of ', inline('x, y, z', 'x,y,z'), ' is ', inline('p', 'p'), ' then the standard deviation of ', inline('3x + 5, 3y + 5, 3z + 5', tex`3x+5,\ 3y+5,\ 3z+5`), ' is'],
      ['7. ', inline('x, y, z', 'x,y,z'), ' ஆகியவற்றின் திட்டவிலக்கம் ', inline('p', 'p'), '-எனில், ', inline('3x + 5, 3y + 5, 3z + 5', tex`3x+5,\ 3y+5,\ 3z+5`), ' ஆகியவற்றின் திட்டவிலக்கமானது'],
      options(inline('3p + 5','3p+5'), inline('3p','3p'), inline('p + 5','p+5'), inline('9p + 15','9p+15')), 1, [
        step('Let m be the old mean. The new mean is three times m plus five. Subtract it from a transformed value to find its deviation.',
          'பழைய சராசரியை m என்க. புதிய சராசரி m-இன் மூன்று மடங்குடன் ஐந்தைக் கூட்டிய மதிப்பு. மாற்றிய மதிப்பிலிருந்து அதைக் கழித்து விலக்கத்தைக் காண்க.',
          '(3x + 5) − (3m + 5) = 3(x − m)', '(3x+5)-(3m+5)=3(x-m)'),
        step('The same holds for y and z. Squaring the deviations multiplies the variance by 9. Its nonnegative square root is three times the old standard deviation.',
          'y மற்றும் z-க்கும் இதுவே பொருந்தும். விலக்கங்களின் வர்க்கங்கள் ஒன்பது மடங்காகும். அதன் குறையற்ற வர்க்கமூலம் பழைய திட்டவிலக்கத்தின் மூன்று மடங்கு.',
          'σnew = √(9p²) = 3p', tex`\sigma_{\text{new}}=\sqrt{9p^2}=3p`)
      ], same('3p'), '3p'),
    question(8, both('Standard deviation from coefficient of variation', 'மாறுபாட்டுக் கெழுவிலிருந்து திட்டவிலக்கம்'),
      '8. If the mean and coefficient of variation of a data are 4 and 87.5% then the standard deviation is',
      '8. ஒரு தரவின் சராசரி மற்றும் மாறுபாட்டுக் கெழு முறையே 4 மற்றும் 87.5% எனில் திட்டவிலக்கமானது',
      options('3.5', '3', '4.5', '2.5'), 0, [
        step('The coefficient of variation is the standard deviation as a percentage of the mean.',
          'மாறுபாட்டுக் கெழு என்பது சராசரியை அடிப்படையாகக் கொண்டு திட்டவிலக்கத்தைச் சதவீதமாகக் குறிப்பதாகும்.',
          'CV = (σ/x̄) × 100%', tex`\mathrm{CV}=\dfrac{\sigma}{\bar x}\times100\%`),
        step('Convert 87.5% to a decimal and multiply by the mean.',
          '87.5%-ஐத் தசம எண்ணாக மாற்றி சராசரியால் பெருக்கவும்.',
          'σ = (87.5/100) × 4 = 3.5', tex`\sigma=\dfrac{87.5}{100}\times4=3.5`)
      ], same('3.5'), '3.5'),
    question(9, both('Bounds on probability', 'நிகழ்தகவின் எல்லைகள்'),
      '9. Which of the following is incorrect?',
      '9. கொடுக்கப்பட்டவைகளில் எது தவறானது?',
      options(inline('P(A) > 1', 'P(A)>1'), inline('0 ≤ P(A) ≤ 1', tex`0\le P(A)\le 1`), inline('P(ϕ) = 0', tex`P(\phi)=0`), inline('P(A) + P(Ā) = 1', tex`P(A)+P(\overline A)=1`)), 0, [
        step('An event is within the sample space. Its probability lies between zero and one, so option A is the incorrect statement.',
          'ஒரு நிகழ்ச்சி கூறுவெளியின் உட்கணம். அதன் நிகழ்தகவு பூச்சியத்திற்கும் ஒன்றிற்கும் இடையே அமையும். எனவே (அ) தவறானது.',
          '0 ≤ P(A) ≤ 1', tex`0\le P(A)\le1`),
        step('The impossible event has probability zero. An event and its complement together have probability one, so the other rules hold.',
          'இயலாத நிகழ்ச்சியின் நிகழ்தகவு பூச்சியம். ஒரு நிகழ்ச்சி மற்றும் அதன் நிரப்பு நிகழ்ச்சியின் நிகழ்தகவுகளின் கூடுதல் ஒன்று. எனவே மற்ற விதிகள் சரியானவை.',
          'P(ϕ) = 0; P(A) + P(Ā) = 1', tex`P(\phi)=0,\qquad P(A)+P(\overline A)=1`)
      ], same('P(A) > 1'), 'P(A)>1'),
    question(10, both('Probability of drawing a red marble', 'சிவப்புக் கூழாங்கல் கிடைப்பதற்கான நிகழ்தகவு'),
      '10. The probability a red marble selected at random from a jar containing p red, q blue and r green marbles is',
      '10. p சிவப்பு, q நீல, r பச்சை நிறக் கூழாங்கற்கள் உள்ள ஒரு குடுவையில் இருந்து ஒரு சிவப்பு கூழாங்கல் எடுப்பதற்கான நிகழ்தகவானது',
      options(fraction('q','p + q + r'), fraction('p','p + q + r'), fraction('p + q','p + q + r'), fraction('p + r','p + q + r')), 1, [
        step('The colours are disjoint groups of marbles. Only the p red marbles are favourable, and the total is the sum of all three counts.',
          'நிறங்களின்படி கூழாங்கற்கள் மூன்று தனித்தொகுதிகளாக உள்ளன. p சிவப்புக் கூழாங்கற்கள் மட்டுமே சாதகமானவை. மொத்தம் மூன்று எண்ணிக்கைகளின் கூடுதல்.',
          'n(A) = p; n(S) = p + q + r', tex`n(A)=p,\qquad n(S)=p+q+r`),
        step('Divide the favourable count by the total, since each marble is equally likely.',
          'ஒவ்வொரு கூழாங்கல்லும் சமவாய்ப்பில் கிடைப்பதால் சாதகமான எண்ணிக்கையை மொத்த எண்ணிக்கையால் வகுக்கவும்.',
          'P(A) = p/(p + q + r)', tex`P(A)=\dfrac{p}{p+q+r}`)
      ], same('p/(p + q + r)'), tex`\dfrac{p}{p+q+r}`),
    question(12, both('Getting a job and its complement', 'வேலை கிடைப்பதும் அதன் நிரப்பு நிகழ்ச்சியும்'),
      ['12. The probability of getting a job for a person is ', fraction('x','3'), '. If the probability of not getting the job is ', fraction('2','3'), ' then the value of x is'],
      ['12. ஒரு நபருக்கு வேலை கிடைப்பதற்கான நிகழ்தகவானது ', fraction('x','3'), '. வேலை கிடைக்காமல் இருப்பதற்கான நிகழ்தகவு ', fraction('2','3'), ' எனில் x-யின் மதிப்பானது'],
      options('2', '1', '3', '1.5'), 1, [
        step('Getting and not getting the job are complementary events, so their probabilities sum to one.',
          'வேலை கிடைப்பதும் கிடைக்காமல் இருப்பதும் நிரப்பு நிகழ்ச்சிகள். அவற்றின் நிகழ்தகவுகளின் கூடுதல் ஒன்று.',
          'x/3 + 2/3 = 1', tex`\dfrac{x}{3}+\dfrac23=1`),
        step('Subtract two thirds, then multiply by three.',
          'மூன்றில் இரண்டு பங்கைக் கழித்து, பின்னர் மூன்றால் பெருக்கவும்.',
          'x/3 = 1 − 2/3 = 1/3 ⇒ x = 1', tex`\dfrac{x}{3}=1-\dfrac23=\dfrac13\quad\Longrightarrow\quad x=1`)
      ], same('1'), '1'),
    question(13, both('Number of lucky-draw tickets', 'குலுக்கல் சீட்டுகளின் எண்ணிக்கை'),
      ['13. Kamalam went to play a lucky draw contest. 135 tickets of the lucky draw were sold. If the probability of Kamalam winning is ', fraction('1','9'), ', then the number of tickets bought by Kamalam is'],
      ['13. கமலம், குலுக்கல் போட்டியில் கலந்துகொண்டாள். அங்கு மொத்தம் 135 சீட்டுகள் விற்கப்பட்டன. கமலம் வெற்றி பெறுவதற்கான வாய்ப்பு ', fraction('1','9'), ' எனில், கமலம் வாங்கிய சீட்டுகளின் எண்ணிக்கை,'],
      options('5', '10', '15', '20'), 2, [
        step('With one winning ticket drawn uniformly, Kamalam wins when one of her k tickets is drawn.',
          'ஒரு வெற்றிச் சீட்டு சமவாய்ப்பில் எடுக்கப்படுவதாகக் கொள்க. கமலத்தின் k சீட்டுகளில் ஒன்று எடுக்கப்பட்டால் அவள் வெல்வாள்.',
          'k/135 = 1/9', tex`\dfrac{k}{135}=\dfrac19`),
        step('Multiply both sides by 135 to find how many tickets she bought.',
          'அவள் வாங்கிய சீட்டுகளின் எண்ணிக்கையைக் காண இரு பக்கங்களையும் 135-ஆல் பெருக்கவும்.',
          'k = 135/9 = 15', tex`k=\dfrac{135}{9}=15`)
      ], same('15'), '15'),
    question(14, both('English letters before x', 'x-க்கு முந்தைய ஆங்கில எழுத்துகள்'),
      '14. If a letter is chosen at random from the English alphabets {a,b,...,z}, then the probability that the letter chosen precedes x',
      '14. ஆங்கில எழுத்துகள் {a,b,...,z} -யிலிருந்து ஓர் எழுத்து சமவாய்ப்பு முறையில் தேர்வு செய்யப்படுகிறது. அந்த எழுத்து x -க்கு முந்தைய எழுத்துகளில் ஒன்றாக இருப்பதற்கான நிகழ்தகவு',
      options(fraction('12','13'), fraction('1','13'), fraction('23','26'), fraction('3','26')), 2, [
        step('Of the 26 letters, x, y and z are excluded. All the 23 letters from a to w precede x.',
          '26 எழுத்துகளில் x, y, z ஆகியவை விலக்கப்படுகின்றன. a முதல் w வரையான 23 எழுத்துகளும் x-க்கு முந்தையவை.',
          'n(S) = 26; n(A) = 26 − 3 = 23', tex`n(S)=26,\qquad n(A)=26-3=23`),
        step('Divide by 26 because every letter is equally likely to be chosen.',
          'ஒவ்வொரு எழுத்துக்கும் சமவாய்ப்பு இருப்பதால் 26-ஆல் வகுக்கவும்.',
          'P(A) = 23/26', tex`P(A)=\dfrac{23}{26}`)
      ], same('23/26'), tex`\dfrac{23}{26}`),
    question(15, both('Probability of drawing one of two denominations', 'இரு மதிப்புகளுள் ஒரு நோட்டு கிடைப்பதற்கான நிகழ்தகவு'),
      '15. A purse contains 10 notes of ₹2000, 15 notes of ₹500, and 25 notes of ₹200. One note is drawn at random. What is the probability that the note is either a ₹500 note or ₹200 note?',
      '15. ஒரு பணப்பையில் ₹2000 நோட்டுகள் 10-ம், ₹500 நோட்டுகள் 15-ம், ₹200 நோட்டுகள் 25-ம் உள்ளன. ஒரு நோட்டு சமவாய்ப்பு முறையில் எடுக்கப்படுகின்றது எனில், அந்த நோட்டு ₹500 நோட்டாகவோ அல்லது ₹200 நோட்டாகவோ இருப்பதற்கான நிகழ்தகவு என்ன?',
      options(fraction('1','5'), fraction('3','10'), fraction('2','3'), fraction('4','5')), 3, [
        step('There are 50 notes in all. The two requested denominations do not overlap, so 15 plus 25 notes are favourable.',
          'மொத்தம் 50 நோட்டுகள் உள்ளன. கேட்கப்பட்ட இரு மதிப்புகளுக்கும் பொதுவான நோட்டு இல்லை. ஆகவே 15 மற்றும் 25 நோட்டுகளின் கூடுதல் சாதகமான எண்ணிக்கையாகும்.',
          'n(S) = 10 + 15 + 25 = 50; n(A) = 15 + 25 = 40',
          tex`\begin{aligned}n(S)&=10+15+25=50\\n(A)&=15+25=40\end{aligned}`),
        step('Divide the favourable count by the total number of notes and simplify.',
          'சாதகமான நோட்டுகளின் எண்ணிக்கையை மொத்த நோட்டுகளின் எண்ணிக்கையால் வகுத்துச் சுருக்குக.',
          'P(A) = 40/50 = 4/5', tex`P(A)=\dfrac{40}{50}=\dfrac45`)
      ], same('4/5'), tex`\dfrac45`)
  ];

  const ids = new Set(grade.items.map(item => item.id));
  chapter.textbookQuestionIds ||= [];
  for (const item of items) {
    if (ids.has(item.id)) throw Error('Duplicate textbook ID ' + item.id);
    ids.add(item.id);
    grade.items.push(item);
    chapter.textbookQuestionIds.push(item.id);
  }
})();
