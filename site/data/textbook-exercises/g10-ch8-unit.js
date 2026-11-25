/* Grade 10, revised 2025. Unit Exercise 8, English pp. 331–332 / Tamil p. 344. */
(() => {
  'use strict';
  const grade = window.TRIGGLE_CLASSES[10];
  const chapter = window.TRIGGLE_CURRICULUM.grades.find(g => g.grade === 10).chapters.find(c => c.number === 8);
  const tex = String.raw;
  const both = (en, ta) => ({en, ta});
  const math = (fallback, latex, display = true) => ({fallback, latex, display});
  const step = (en, ta, eq, latex) => ({en, ta, eq, math: math(eq, latex)});
  const common = value => both(value, value);

  function question(number, title, q, steps, answer, answerLatex, extra = {}) {
    const englishPage = number <= 7 ? 331 : 332;
    return {
      id: 'c10-8-unit-q' + number,
      classNum: 10,
      chapter: '8',
      exercise: '8.unit',
      topic: chapter.title,
      label: both('Unit Exercise 8 · Q' + number, 'அலகுப் பயிற்சி 8 · வினா ' + number),
      title, q, steps, answer,
      ...(answerLatex ? {answerMath: math(answer.en, tex`\boxed{${answerLatex}}`)} : {}),
      kind: 'textbook',
      source: 'https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view',
      reference: `TN SCERT, Grade 10 Mathematics, revised 2025. English printed p. ${englishPage} / PDF p. ${englishPage + 6}. Tamil printed p. 344 / PDF p. 350. Both pages visually checked.`,
      edition: '2025',
      translationReview: 'pending',
      tamilQuestionSourceVerified: true,
      tamilWorkedSolutionReview: 'pending',
      sourceFidelity: {status: 'page-visual-checked', sourcePdfPage: {en: englishPage + 6, ta: 350}},
      ...extra
    };
  }

  function table(caption, header, label, headers, values, betweenSentences = false) {
    return {
      caption: caption.en,
      headers: [header.en, ...headers],
      rows: [[label.en, ...values]],
      ta: {caption: caption.ta, headers: [header.ta, ...headers], rows: [[label.ta, ...values]]},
      ...(betweenSentences ? {replaceRegex: '\\n'} : {})
    };
  }

  const items = [
    question(1, both('Recovering two missing frequencies', 'இரு விடுபட்ட நிகழ்வெண்களைக் காணுதல்'), both(
      '1. The mean of the following frequency distribution is 62.8 and the sum of all frequencies is 50. Compute the missing frequencies f₁ and f₂.',
      '1. பின்வரும் நிகழ்வெண் பரவலின் சராசரியானது 62.8 மற்றும் அனைத்து நிகழ்வெண்களின் கூடுதல் 50. விடுபட்ட நிகழ்வெண்கள் f₁ மற்றும் f₂ -ஐக் கணக்கிடுக.'
    ), [
      step('The known frequencies add to 30. Subtract their sum from the total to find the sum of the two unknown frequencies.',
        'தெரிந்த நிகழ்வெண்களின் கூடுதல் 30. இரு விடுபட்ட நிகழ்வெண்களின் கூடுதலைக் காண மொத்தத்திலிருந்து 30-ஐக் கழிக்கவும்.',
        'f₁ + f₂ = 50 − (5 + 10 + 7 + 8) = 20', tex`f_1+f_2=50-(5+10+7+8)=20`),
      step('The class midpoints are 10, 30, 50, 70, 90 and 110. Multiplying the mean by the total frequency gives the sum of frequency times midpoint.',
        'பிரிவுகளின் மைய மதிப்புகள் 10, 30, 50, 70, 90, 110. சராசரியையும் மொத்த நிகழ்வெண்ணையும் பெருக்கினால் நிகழ்வெண்–மைய மதிப்புப் பெருக்கல்களின் கூடுதல் கிடைக்கும்.',
        'Σfᵢxᵢ = 62.8 × 50 = 3140; known terms = 50 + 500 + 630 + 880 = 2060',
        tex`\begin{aligned}\sum f_ix_i&=62.8\times50=3140\\5(10)+10(50)+7(90)+8(110)&=2060\end{aligned}`),
      step('Subtract the known total and replace the first unknown by 20 minus the second. Solve for the second frequency and then find the first.',
        'தெரிந்த பெருக்கல்களின் கூடுதலைக் கழிக்கவும். முதல் நிகழ்வெண்ணிற்கு பதிலாக 20-லிருந்து இரண்டாம் நிகழ்வெண்ணைக் கழித்ததைப் பிரதியிடுக. இரண்டாம் நிகழ்வெண்ணைக் கண்டபின் முதலாவதைக் காண்க.',
        '30f₁ + 70f₂ = 1080 ⇒ 600 + 40f₂ = 1080 ⇒ f₂ = 12 and f₁ = 8',
        tex`\begin{aligned}30f_1+70f_2&=3140-2060=1080\\30(20-f_2)+70f_2&=1080\\40f_2&=480\\ f_2&=12,\qquad f_1=8\end{aligned}`),
      step('Check that the recovered frequencies satisfy the total count and the mean.',
        'பெற்ற நிகழ்வெண்கள் மொத்த எண்ணிக்கைக்கும் சராசரிக்கும் பொருந்துவதைச் சரிபார்க்கவும்.',
        '30 + 8 + 12 = 50; (2060 + 240 + 840)/50 = 62.8',
        tex`30+8+12=50,\qquad\dfrac{2060+240+840}{50}=62.8`)
    ], common('f₁ = 8 and f₂ = 12'), tex`f_1=8,\qquad f_2=12`, {
      dataTable: table(both('Frequency distribution', 'நிகழ்வெண் பரவல்'), both('Class Interval', 'பிரிவு இடைவெளி'), both('Frequency', 'நிகழ்வெண்'),
        ['0-20','20-40','40-60','60-80','80-100','100-120'], [5,'f₁',10,'f₂',7,8])
    }),
    question(2, both('Standard deviation of grouped diameters', 'தொகுக்கப்பட்ட விட்டங்களின் திட்டவிலக்கம்'), both(
      '2. The diameter of circles (in mm) drawn in a design are given below.\nCalculate the standard deviation.',
      '2. ஒரு வடிவமைப்பில் வரையப்பட்ட வட்டங்களின் விட்ட அளவுகள் (மி.மீ-ல்) கீழே கொடுக்கப்பட்டுள்ளன.\nதிட்டவிலக்கத்தைக் கணக்கிடுக.'
    ), [
      step('Use the class midpoints as representative diameters. Take 42.5 mm as the assumed mean and divide each deviation by the class width, 4 mm.',
        'ஒவ்வொரு பிரிவின் மைய மதிப்பையும் அதன் விட்டத்திற்கு எடுத்துக்கொள்க. 42.5 மி.மீ-ஐ ஊகச் சராசரியாகக் கொண்டு, ஒவ்வொரு விலக்கத்தையும் பிரிவு அகலம் 4 மி.மீ-ஆல் வகுக்கவும்.',
        'xᵢ = 34.5, 38.5, 42.5, 46.5, 50.5; dᵢ = (xᵢ − 42.5)/4 = −2, −1, 0, 1, 2',
        tex`\begin{aligned}x_i &: 34.5,38.5,42.5,46.5,50.5\\d_i&=\dfrac{x_i-42.5}{4} : -2,-1,0,1,2\end{aligned}`),
      step('Multiply the coded deviations and the squared coded deviations by their corresponding frequencies, and add.',
        'படி விலக்கங்களையும் அவற்றின் வர்க்கங்களையும் உரிய நிகழ்வெண்களால் பெருக்கிக் கூட்டவும்.',
        'N = 100; Σfᵢdᵢ = −30 − 17 + 0 + 22 + 50 = 25; Σfᵢdᵢ² = 60 + 17 + 0 + 22 + 100 = 199',
        tex`\begin{aligned}N&=100\\\sum f_id_i&=-30-17+0+22+50=25\\\sum f_id_i^2&=60+17+0+22+100=199\end{aligned}`),
      step('Apply the step-deviation formula and multiply by the class width to return to millimetres.',
        'படி விலக்க முறையின் சூத்திரத்தைப் பயன்படுத்துக. மில்லிமீட்டரில் விடையைப் பெற பிரிவு அகலத்தால் பெருக்கவும்.',
        'σ = 4√(199/100 − (25/100)²) = √30.84 ≈ 5.55 mm',
        tex`\begin{aligned}\sigma&=4\sqrt{\dfrac{199}{100}-\left(\dfrac{25}{100}\right)^2}\\&=\sqrt{30.84}\approx5.55\ \text{mm}\end{aligned}`)
    ], both('Approximately 5.55 mm', 'தோராயமாக 5.55 மி.மீ'), tex`\sigma\approx5.55\ \mathrm{mm}`, {
      dataTable: table(both('Circle diameters', 'வட்டங்களின் விட்டங்கள்'), both('Diameters', 'விட்டங்கள்'), both('Number of circles', 'வட்டங்களின் எண்ணிக்கை'),
        ['33-36','37-40','41-44','45-48','49-52'], [15,17,21,22,25], true)
    }),
    question(3, both('Unknown scale from variance', 'விலக்க வர்க்கச் சராசரியிலிருந்து பெருக்கி காணுதல்'), both(
      '3. The frequency distribution is given below.\nIn the table, k is a positive integer, has a variance of 160. Determine the value of k.',
      '3. ஒரு நிகழ்வெண் பரவல் கீழே கொடுக்கப்பட்டுள்ளது.\nஅட்டவணையில், k ஒரு மிகை முழு. விலக்க வர்க்கச் சராசரியானது 160 எனில், k -ன் மதிப்பைக் காண்க.'
    ), [
      step('Count both occurrences of k. Multiply each value and its square by the corresponding frequency before adding.',
        'k இருமுறை வருவதைக் கணக்கில் கொள்க. ஒவ்வொரு மதிப்பையும் அதன் வர்க்கத்தையும் உரிய நிகழ்வெண்ணால் பெருக்கிக் கூட்டவும்.',
        'N = 7; Σfᵢxᵢ = (2 + 2 + 3 + 4 + 5 + 6)k = 22k; Σfᵢxᵢ² = (2 + 4 + 9 + 16 + 25 + 36)k² = 92k²',
        tex`\begin{aligned}N&=7\\\sum f_ix_i&=(2+2+3+4+5+6)k=22k\\\sum f_ix_i^2&=(2+4+9+16+25+36)k^2=92k^2\end{aligned}`),
      step('Subtract the square of the mean from the mean of the squares.',
        'வர்க்கங்களின் சராசரியிலிருந்து சராசரியின் வர்க்கத்தைக் கழிக்கவும்.',
        'σ² = 92k²/7 − (22k/7)² = (644 − 484)k²/49 = 160k²/49',
        tex`\begin{aligned}\sigma^2&=\dfrac{92k^2}{7}-\left(\dfrac{22k}{7}\right)^2\\&=\dfrac{160k^2}{49}\end{aligned}`),
      step('Equate the variance to 160. The specified positive integer is the positive square root of 49.',
        'விலக்க வர்க்கச் சராசரியை 160-க்குச் சமமாக்குக. k மிகை முழு என்பதால் 49-ன் மிகை வர்க்கமூலத்தை எடுத்துக்கொள்க.',
        '160k²/49 = 160 ⇒ k² = 49 ⇒ k = 7',
        tex`\dfrac{160k^2}{49}=160\quad\Longrightarrow\quad k^2=49\quad\Longrightarrow\quad k=7`)
    ], common('k = 7'), 'k=7', {
      dataTable: table(both('Frequency distribution', 'நிகழ்வெண் பரவல்'), common('x'), common('f'), ['k','2 k','3 k','4 k','5 k','6 k'], [2,1,1,1,1,1], true)
    }),
    question(4, both('Variance after converting temperature units', 'வெப்பநிலை அலகு மாற்றத்திற்குப் பின் விலக்க வர்க்கச் சராசரி'), both(
      '4. The standard deviation of some temperature data in degree celsius (°C) is 5. If the data were converted into degree Farenheit (°F) then what is the variance?',
      '4. செல்சியஸில் குறிக்கப்பட்ட வெப்பநிலை தரவின் திட்டவிலக்கமானது 5. இந்த வெப்பநிலை தரவை ஃபாரன்ஹீட் ஆக மாற்றும்பொழுது கிடைக்கும் தரவின் விலக்க வர்க்கச் சராசரியைக் காண்க.'
    ), [
      step('The conversion multiplies every Celsius reading by nine fifths and adds 32. The mean is converted by the same rule, so adding 32 has no effect on deviations from the mean.',
        'ஒவ்வொரு செல்சியஸ் அளவையும் ஐந்தில் ஒன்பது என்ற பின்னத்தால் பெருக்கி 32-ஐக் கூட்டினால் ஃபாரன்ஹீட் அளவு கிடைக்கும். சராசரியும் இதே முறையில் மாறுவதால் 32-ஐக் கூட்டுவது விலக்கங்களை மாற்றாது.',
        'F = (9/5)C + 32; F − F̄ = (9/5)(C − C̄)',
        tex`\begin{aligned}F&=\dfrac95C+32\\F-\bar F&=\dfrac95(C-\bar C)\end{aligned}`),
      step('The Fahrenheit standard deviation scales by nine fifths. Square that standard deviation to obtain the Fahrenheit variance.',
        'ஃபாரன்ஹீட் திட்டவிலக்கம் செல்சியஸ் திட்டவிலக்கத்தின் 9/5 மடங்கு. அதனை வர்க்கப்படுத்தினால் ஃபாரன்ஹீட் விலக்க வர்க்கச் சராசரி கிடைக்கும்.',
        'σF = (9/5) × 5 = 9 °F; σF² = 81 (°F)²',
        tex`\sigma_F=\dfrac95\times5=9\,{}^\circ\mathrm F,\qquad \sigma_F^2=81\,({}^\circ\mathrm F)^2`)
    ], common('81 (°F)²'), tex`81\,({}^\circ\mathrm F)^2`),
    question(5, both('Mean and standard deviation from shifted data', 'விலக்கத் தரவிலிருந்து சராசரியும் திட்டவிலக்கமும்'), both(
      '5. If for a distribution, ∑(x − 5) = 3, ∑(x − 5)² = 43, and total number of observations is 18, find the mean and standard deviation.',
      '5. ஒரு பரவலில் ∑(x − 5) = 3, ∑(x − 5)² = 43, மற்றும் மொத்த தரவுப் புள்ளிகளின் எண்ணிக்கை 18 எனில் சராசரி, திட்ட விலக்கத்தைக் காண்க.'
    ), [
      step('Let d be the deviation from the assumed mean 5. The true mean is 5 plus the mean of these deviations.',
        'ஊகச் சராசரி 5-லிருந்து உள்ள விலக்கத்தை d என்க. இவ்விலக்கங்களின் சராசரியுடன் 5-ஐக் கூட்டினால் உண்மையான சராசரி கிடைக்கும்.',
        'd = x − 5; x̄ = 5 + 3/18 = 31/6',
        tex`d=x-5,\qquad \bar x=5+\dfrac{3}{18}=\dfrac{31}{6}`),
      step('Use the assumed-mean formula. Subtract the square of the mean deviation from the mean squared deviation.',
        'ஊகச் சராசரி முறையைப் பயன்படுத்துக. விலக்கங்களின் வர்க்கங்களின் சராசரியிலிருந்து சராசரி விலக்கத்தின் வர்க்கத்தைக் கழிக்கவும்.',
        'σ² = 43/18 − (3/18)² = 86/36 − 1/36 = 85/36',
        tex`\sigma^2=\dfrac{43}{18}-\left(\dfrac3{18}\right)^2=\dfrac{85}{36}`),
      step('Take the nonnegative square root to find the standard deviation.',
        'திட்டவிலக்கத்தைக் காணக் குறையற்ற வர்க்கமூலத்தை எடுக்கவும்.',
        'σ = √85/6 ≈ 1.54', tex`\sigma=\dfrac{\sqrt{85}}6\approx1.54`)
    ], common('Mean = 31/6, σ = √85/6 ≈ 1.54'), tex`\bar x=\dfrac{31}{6},\qquad\sigma=\dfrac{\sqrt{85}}6\approx1.54`, {
      questionMath: both(
        ['5. If for a distribution, ', math('∑(x − 5) = 3', tex`\sum(x-5)=3`, false), ', ', math('∑(x − 5)² = 43', tex`\sum(x-5)^2=43`, false), ', and total number of observations is 18, find the mean and standard deviation.'],
        ['5. ஒரு பரவலில் ', math('∑(x − 5) = 3', tex`\sum(x-5)=3`, false), ', ', math('∑(x − 5)² = 43', tex`\sum(x-5)^2=43`, false), ', மற்றும் மொத்த தரவுப் புள்ளிகளின் எண்ணிக்கை 18 எனில் சராசரி, திட்ட விலக்கத்தைக் காண்க.']
      )
    }),
    question(6, both('Comparing price stability', 'விலைகளின் நிலைத்தன்மையை ஒப்பிடுதல்'), both(
      '6. Prices of peanut packets in various places of two cities are given below. In which city, prices were more stable?',
      '6. இரண்டு நகரங்களின் பல்வேறு இடங்களில் விற்பனை செய்யும் நிலக்கடலை பொட்டலங்களின் விலைகள் கொடுக்கப்பட்டுள்ளன. எந்த நகரத்தில் விலைகளானது மிகவும் நிலையானதாக உள்ளது?'
    ), [
      step('Add the five prices in each city and divide by five to find each city’s mean.',
        'ஒவ்வொரு நகரத்திற்கும் ஐந்து விலைகளைக் கூட்டி ஐந்தால் வகுத்துச் சராசரியைக் காண்க.',
        'x̄A = 100/5 = 20; x̄B = 75/5 = 15', tex`\bar x_A=\dfrac{100}{5}=20,\qquad\bar x_B=\dfrac{75}{5}=15`),
      step('For A, the deviations are 0, 2, −1, 3 and −4. For B, they are −5, 5, 3, −3 and 0. Find the mean of the squared deviations for each city.',
        'A நகரத்தின் விலக்கங்கள் 0, 2, −1, 3, −4. B நகரத்தின் விலக்கங்கள் −5, 5, 3, −3, 0. ஒவ்வொரு நகரத்திற்கும் விலக்கங்களின் வர்க்கச் சராசரியைக் காண்க.',
        'σA² = (0 + 4 + 1 + 9 + 16)/5 = 6; σB² = (25 + 25 + 9 + 9 + 0)/5 = 13.6',
        tex`\begin{aligned}\sigma_A^2&=\dfrac{0+4+1+9+16}{5}=6\\\sigma_B^2&=\dfrac{25+25+9+9+0}{5}=13.6\end{aligned}`),
      step('Compare the coefficient of variation, the standard deviation as a percentage of the mean. City A has smaller relative variation.',
        'சராசரியின் சதவீதமாகத் திட்டவிலக்கத்தைக் கூறும் மாறுபாட்டுக் கெழுக்களை ஒப்பிடுக. A நகரத்தின் சார்பு மாறுபாடு குறைவு.',
        'CVA = (√6/20) × 100% ≈ 12.25%; CVB = (√13.6/15) × 100% ≈ 24.59%',
        tex`\begin{aligned}\mathrm{CV}_A&=\dfrac{\sqrt6}{20}\times100\%\approx12.25\%\\\mathrm{CV}_B&=\dfrac{\sqrt{13.6}}{15}\times100\%\approx24.59\%\end{aligned}`)
    ], both('Prices are more stable in city A.', 'A நகரத்தில் விலைகள் அதிக நிலைத்தன்மை உடையவை.'), null, {
      dataTable: table(both('Prices of peanut packets', 'நிலக்கடலைப் பொட்டலங்களின் விலைகள்'), both('Prices in city A', 'நகரம் A-ன் விலைகள்'),
        both('Prices in city B', 'நகரம் B-ன் விலைகள்'), [20,22,19,23,16], [10,20,18,12,15])
    }),
    question(7, both('Extremes from the range and its coefficient', 'வீச்சு மற்றும் வீச்சுக்கெழுவிலிருந்து எல்லை மதிப்புகள்'), both(
      '7. If the range and coefficient of range of the data are 20 and 0.2 respectively, then find the largest and smallest values of the data.',
      '7. ஒரு புள்ளி விவரத்தின் வீச்சு மற்றும் வீச்சுக்கெழு முறையே 20 மற்றும் 0.2 எனில், விவரங்களின் மிகப்பெரிய மதிப்பு மற்றும் மிகச்சிறிய மதிப்புகளைக் காண்க.'
    ), [
      step('Let L and S be the largest and smallest values. The range gives their difference. The coefficient of range divides that difference by their sum.',
        'மிகப்பெரிய, மிகச்சிறிய மதிப்புகளை முறையே L, S என்க. வீச்சு அவற்றின் வித்தியாசம். அந்த வித்தியாசத்தை அவற்றின் கூடுதலால் வகுத்தால் வீச்சுக்கெழு கிடைக்கும்.',
        'L − S = 20; (L − S)/(L + S) = 0.2 ⇒ L + S = 20/0.2 = 100',
        tex`\begin{aligned}L-S&=20\\\dfrac{L-S}{L+S}&=0.2\quad\Longrightarrow\quad L+S=100\end{aligned}`),
      step('Add the sum and difference equations to find L, then subtract it from 100 to find S.',
        'கூடுதல் மற்றும் வித்தியாசச் சமன்பாடுகளைக் கூட்டி L-ஐக் காண்க. பின்னர் அதை 100-லிருந்து கழித்து S-ஐக் காண்க.',
        '2L = 100 + 20 = 120 ⇒ L = 60; S = 100 − 60 = 40',
        tex`2L=120\quad\Longrightarrow\quad L=60,\qquad S=100-60=40`)
    ], common('L = 60, S = 40'), tex`L=60,\qquad S=40`),
    question(8, both('Product six or difference five', 'பெருக்கல் ஆறு அல்லது வித்தியாசம் ஐந்து'), both(
      '8. If two dice are rolled, then find the probability of getting the product of face value 6 or the difference of face values 5.',
      '8. இரண்டு முறையான பகடைகள் உருட்டப்படும் பொழுது, முக மதிப்புகளின் பெருக்கல் 6 ஆகவோ அல்லது முக மதிப்புகளின் வித்தியாசம் 5 ஆகவோ இருப்பதற்கான நிகழ்தகவைக் காண்க?'
    ), [
      step('Assume the fair dice are independent, so all 36 ordered pairs are equally likely. Let A be the event that the product is six, and B the event that the absolute difference is five.',
        'சீரான பகடைகளின் விளைவுகள் ஒன்றையொன்று சாராதவை எனில் 36 வரிசைச் சோடிகளும் சமவாய்ப்புடையவை. பெருக்கல் ஆறாகும் நிகழ்ச்சியை A எனவும், வித்தியாசத்தின் தனி மதிப்பு ஐந்தாகும் நிகழ்ச்சியை B எனவும் கொள்க.',
        'n(S) = 6 × 6 = 36', tex`n(S)=6\times6=36`),
      step('List the qualifying pairs. Both pairs whose difference is five already have product six.',
        'பொருந்தும் சோடிகளைப் பட்டியலிடுக. வித்தியாசம் ஐந்து தரும் இரு சோடிகளின் பெருக்கலும் ஆறு ஆகும்.',
        'A = {(1,6), (2,3), (3,2), (6,1)}; B = {(1,6), (6,1)} ⊆ A',
        tex`\begin{aligned}A&=\{(1,6),(2,3),(3,2),(6,1)\}\\B&=\{(1,6),(6,1)\}\subseteq A\end{aligned}`),
      step('The union is A, so divide its four favourable pairs by 36.',
        'சேர்ப்பு A-க்குச் சமம். எனவே அதன் நான்கு சாதகமான சோடிகளை 36-ஆல் வகுக்கவும்.',
        'P(A ∪ B) = 4/36 = 1/9', tex`P(A\cup B)=\dfrac4{36}=\dfrac19`)
    ], common('1/9'), tex`\dfrac19`),
    question(9, both('At least one girl in a two-child family', 'இரு குழந்தைகளில் குறைந்தபட்சம் ஒரு பெண் குழந்தை'), both(
      '9. In a two children family, find the probability that there is at least one girl in a family.',
      '9. இரண்டு குழந்தைகள் உள்ள ஒரு குடும்பத்தில், குறைந்தது ஒரு பெண் குழந்தையாவது இருப்பதற்கான நிகழ்தகவைக் காண்க?'
    ), [
      step('Use the equally likely textbook model: each child’s outcome is independent, with probability one half for a boy or a girl. Write B for boy and G for girl, in birth order.',
        'பாடநூலின் சமவாய்ப்பு மாதிரியைப் பயன்படுத்துக. ஒவ்வொரு குழந்தையின் விளைவும் சாராதது என்றும் ஆண் அல்லது பெண் குழந்தைக்கு தலா அரை வாய்ப்பு என்றும் கொள்க. பிறப்பு வரிசையில் ஆண் குழந்தையை B எனவும் பெண் குழந்தையை G எனவும் குறிக்கவும்.',
        'S = {BB, BG, GB, GG}; n(S) = 4', tex`S=\{BB,BG,GB,GG\},\qquad n(S)=4`),
      step('Only BB contains no girl, so subtract its probability from one.',
        'BB என்ற ஒரே விளைவில் பெண் குழந்தை இல்லை. அதன் நிகழ்தகவை ஒன்றிலிருந்து கழிக்கவும்.',
        'P(at least one girl) = 1 − 1/4 = 3/4', tex`1-P(\{BB\})=1-\dfrac14=\dfrac34`)
    ], common('3/4'), tex`\dfrac34`),
    question(10, both('Number of black balls', 'கருப்புப் பந்துகளின் எண்ணிக்கை'), both(
      '10. A bag contains 5 white and some black balls. If the probability of drawing a black ball from the bag is twice the probability of drawing a white ball then find the number of black balls.',
      '10. ஒரு பையில் 5 வெள்ளை மற்றும் சில கருப்பு பந்துகள் உள்ளன. பையிலிருந்து கருப்பு பந்து கிடைப்பதற்கான நிகழ்தகவானது வெள்ளைப் பந்து கிடைப்பதற்கான நிகழ்தகவைப்போல் இரு மடங்கு எனில், கருப்புப் பந்துகளின் எண்ணிக்கையைக் காண்க.'
    ), [
      step('Let x be the number of black balls. Both probabilities use the same total, x plus five.',
        'கருப்புப் பந்துகளின் எண்ணிக்கையை x என்க. இரு நிகழ்தகவுகளுக்கும் மொத்தப் பந்துகளின் எண்ணிக்கை x + 5 ஆகும்.',
        'P(black) = x/(x + 5); P(white) = 5/(x + 5)',
        tex`P(B)=\dfrac{x}{x+5},\qquad P(W)=\dfrac5{x+5}`),
      step('Set the black probability equal to twice the white probability and multiply by the positive total.',
        'கருப்புப் பந்துக்கான நிகழ்தகவை வெள்ளைப் பந்துக்கான நிகழ்தகவின் இரு மடங்கிற்குச் சமப்படுத்தி, இரு பக்கங்களையும் மிகையான மொத்த எண்ணிக்கையால் பெருக்கவும்.',
        'x/(x + 5) = 2 × 5/(x + 5) ⇒ x = 10',
        tex`\dfrac{x}{x+5}=2\cdot\dfrac5{x+5}\quad\Longrightarrow\quad x=10`)
    ], common('10'), '10'),
    question(11, both('Probability of passing Tamil', 'தமிழ்த் தேர்வில் தேர்ச்சி பெறுவதற்கான நிகழ்தகவு'), both(
      '11. The probability that a student will pass the final examination in both English and Tamil is 0.5 and the probability of passing neither is 0.1. If the probability of passing the English examination is 0.75, what is the probability of passing the Tamil examination?',
      '11. ஒரு மாணவன் இறுதித் தேர்வில் ஆங்கிலம் மற்றும் தமிழில் தேர்ச்சி பெறுவதற்கான நிகழ்தகவு 0.5, ஒன்றிலும் தேர்ச்சி அடையாமல் இருப்பதற்கான நிகழ்தகவு 0.1 ஆங்கிலத் தேர்வில் தேர்ச்சி அடைவதற்கான நிகழ்தகவு 0.75 எனில், தமிழ்த் தேர்வில் தேர்ச்சி பெறுவதற்கான நிகழ்தகவு என்ன?'
    ), [
      step('Let E and T denote passing English and passing Tamil. Passing neither is the complement of passing at least one.',
        'ஆங்கிலத்தில் தேர்ச்சி பெறுவதை E எனவும் தமிழில் தேர்ச்சி பெறுவதை T எனவும் கொள்க. ஒன்றிலும் தேர்ச்சி பெறாத நிகழ்ச்சி, குறைந்தது ஒன்றில் தேர்ச்சி பெறும் நிகழ்ச்சியின் நிரப்பு ஆகும்.',
        'P(E ∪ T) = 1 − 0.1 = 0.9',
        tex`P(E\cup T)=1-0.1=0.9`),
      step('In the addition theorem, subtract the intersection to avoid counting students who pass both twice. Rearrange to isolate the Tamil probability.',
        'கூட்டல் தேற்றத்தில் இரண்டிலும் தேர்ச்சி பெறுபவர்களை இருமுறை எண்ணாமல் இருக்க வெட்டின் நிகழ்தகவைக் கழிக்கவும். தமிழில் தேர்ச்சி பெறும் நிகழ்தகவை மட்டும் காணச் சமன்பாட்டை மாற்றியமைக்கவும்.',
        'P(T) = P(E ∪ T) − P(E) + P(E ∩ T) = 0.9 − 0.75 + 0.5 = 0.65',
        tex`\begin{aligned}P(T)&=P(E\cup T)-P(E)+P(E\cap T)\\&=0.9-0.75+0.5=0.65\end{aligned}`)
    ], common('0.65'), '0.65')
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
