/* Original examples aligned with the 2025 English and Tamil Statistics chapters. */
(() => {
  'use strict';
  const tex = String.raw;
  const t = (en, ta) => ({en, ta});
  const math = (latex, fallback) => ({latex, fallback, display: true});
  const check = (question, choices, correct, feedback) => ({question, choices, correct, feedback});

  window.TRIGGLE_STATISTICS_LESSONS = [
    {
      id: 'g9-stats-introduction',
      section: '8.1', title: {en: 'What data can tell us', ta: 'அறிமுகம்'},
      intro: t(
        'Four pupils log how many books they borrowed and name one genre (kind of book) each. Compare the two columns.',
        "நான்கு மாணவர்கள் தாங்கள் இரவல் வாங்கிய புத்தகங்களின் எண்ணிக்கையையும், தலா ஒரு புத்தக வகையையும் பதிவு செய்தனர். இரு பதிவுகளையும் ஒப்பிடு."
      ),
      exercise: 'g9-ch8-ex8.3-q4',
      views: [{
        notes: [
          t(
            'Data are recorded observations. A numerical (quantitative) observation counts or measures something. A categorical (qualitative) observation names a group or quality.',
            "பதிவு செய்த விவரங்களே தரவுகள். எண்ணுவதாலோ அளப்பதாலோ கிடைப்பவை எண் சார்ந்த தரவுகள். ஒரு வகையை அல்லது பண்பைக் குறிப்பவை தரம் சார்ந்த தரவுகள்."
          ),
          t(
            'Statistics means collecting, organising, analysing and interpreting data to answer a question. Choose a question first so you know what to record.',
            "ஒரு கேள்விக்கு விடை காணத் தரவுகளைத் திரட்டுதல், ஒழுங்குபடுத்துதல், பகுப்பாய்வு செய்தல், பொருள் விளக்குதல் ஆகியவை புள்ளியியலில் அடங்கும். முதலில் கேள்வியைத் தேர்ந்தெடுத்தால் எந்த விவரத்தைப் பதிவு செய்ய வேண்டும் என்பது தெரியும்."
          )
        ],
        why: t(
          'Adding book counts gives the number of books borrowed. Counting genre labels tells you how many pupils chose each genre. These totals describe the four pupils in the log.',
          "எண்ணிக்கைகளைக் கூட்டினால் இரவல் வாங்கிய புத்தகங்களின் மொத்தம் கிடைக்கும். ஒவ்வொரு வகைப் பெயரும் எத்தனை முறை வந்துள்ளது என்று எண்ணினால், அந்த வகையைத் தேர்ந்தெடுத்த மாணவர்களின் எண்ணிக்கை கிடைக்கும். இம்முடிவுகள் பதிவில் உள்ள நான்கு மாணவர்களைப் பற்றியவை."
        )
      }],
      practice: check(t(
        'A gardener records each plant’s height and flower colour. Which question needs the numerical data?',
        "தோட்டக்காரர் ஒவ்வொரு செடியின் உயரத்தையும் பூவின் நிறத்தையும் பதிவு செய்கிறார். எந்தக் கேள்விக்கு எண் சார்ந்த தரவுகள் தேவை?"
      ),
        [t('Which colour appears most often?', "எந்த நிறம் அதிக முறை வருகிறது?"),
         t(
           'How much taller is the tallest plant than the shortest?',
           "மிக உயரமான செடி, மிகக் குட்டையான செடியைவிட எவ்வளவு உயரம்?"
         ),
         t('Which plant has a red flower?', "எந்தச் செடியில் சிவப்புப் பூ உள்ளது?")], 1,
        [t(
          'Colour names are categories. Heights can be measured and compared.',
          "நிறப் பெயர்கள் வகைகளைக் குறிக்கின்றன. உயரங்களை அளந்து ஒப்பிடலாம்."
        ),
         t(
           'Heights are numerical measurements. Subtract the shortest height from the tallest.',
           "உயரம் என்பது எண் அளவு. மிகப் பெரிய உயரத்திலிருந்து மிகச் சிறிய உயரத்தைக் கழி."
         ),
         t('A flower colour tells you its category.', "பூவின் நிறம் அதன் வகையைக் குறிக்கிறது.")])
    },
    {
      id: 'g9-stats-collection',
      section: '8.2', title: {en: 'Collecting and organising data', ta: 'தரவுகளைத் திரட்டுதல்'},
      intro: t(
        'Seven cyclists record their journey times in minutes. Sort the readings, count repeats, then put them into ranges.',
        "மிதிவண்டியில் சென்ற ஏழு பேர் தங்கள் பயண நேரத்தை நிமிடங்களில் பதிவு செய்தனர். நேரங்களை வரிசைப்படுத்தி, ஒவ்வொரு நேரமும் எத்தனை முறை வந்தது என்று எண்ணு. பிறகு அவற்றைப் பிரிவு இடைவெளிகளில் தொகுத்துப் பார்."
      ),
      exercise: 'g9-ch8-ex8.4-q1',
      views: [{
        notes: [
          t(
            'Primary data come from your own observations, interviews or experiments. Secondary data were collected by someone else, such as times you read from a published travel report.',
            "நீயே கவனித்தோ, நேர்காணல் செய்தோ, சோதனை செய்தோ பெறுபவை முதல்நிலைத் தரவுகள். வேறொருவர் திரட்டிய தரவுகள் இரண்டாம் நிலைத் தரவுகள். வெளியான பயண அறிக்கையிலிருந்து எடுக்கும் பயண நேரங்கள் இதற்கு ஓர் உதாரணம்."
          ),
          t(
            'The original readings are raw data. A frequency is how many times a value or class occurs. Each tally mark records one observation. Group tally marks in fives by crossing the first four.',
            "முதலில் பதிவு செய்த மதிப்புகள் செப்பனிடப்படாத தரவுகள். ஒரு மதிப்பு அல்லது வகுப்பில் உள்ள பதிவுகளின் எண்ணிக்கை அதன் நிகழ்வெண். ஒவ்வொரு பதிவுக்கும் ஒரு நேர்க்கோட்டுக் குறி இடு. ஐந்தாவது குறியால் முதல் நான்கையும் குறுக்காகக் கோடிட்டு, ஐந்து ஐந்தாகத் தொகுக்கலாம்."
          ),
          t(
            'A class interval collects a range of values. Its lower and upper limits describe its ends. Here each class includes the lower limit and stops just before the upper limit. If whole-number classes are given as 1–5 and 6–10, each class includes both of its limits.',
            "ஒரு பிரிவு இடைவெளி குறிப்பிட்ட எல்லைகளுக்கு இடையிலான மதிப்புகளைத் தொகுக்கிறது. கீழ் எல்லையும் மேல் எல்லையும் இடைவெளியின் முனைகளைக் குறிக்கின்றன. இக்காட்சியில் கீழ் எல்லை அதே பிரிவிலும் மேல் எல்லை அடுத்த பிரிவிலும் சேரும். முழு எண்களுக்கு 1–5, 6–10 என்று பிரிவுகள் கொடுக்கப்பட்டால், ஒவ்வொரு பிரிவிலும் அதன் இரு எல்லைகளும் சேரும்."
          )
        ],
        why: t(
          'Give every reading one place in the table and count it once. The frequencies add to the size of the original list. Grouping helps compare ranges, but a table with only class totals cannot recover every original value.',
          "ஒவ்வொரு பதிவுக்கும் அட்டவணையில் ஒரே இடம் கொடுத்து, அதை ஒரு முறை எண்ணு. நிகழ்வெண்களின் கூட்டுத்தொகை மூலப் பதிவுகளின் மொத்த எண்ணிக்கைக்குச் சமம். வகுப்புகளாகத் தொகுப்பதால் இடைவெளிகளை ஒப்பிட முடியும். பிரிவு நிகழ்வெண்களை மட்டும் கொண்டு ஒவ்வொரு மூல மதிப்பையும் மீட்டெடுக்க முடியாது."
        )
      }],
      practice: check(t(
        'A record shows trips of 8, 10, 10 and 19 minutes. How many belong to the class “10 to under 20”?',
        "8, 10, 10, 19 நிமிடங்கள் என நான்கு பயண நேரங்கள் பதிவாகியுள்ளன. 10 முதல் 20 நிமிடத்திற்குக் குறைவான வகுப்பில் எத்தனை பதிவுகள் உள்ளன?"
      ),
        [t('Two', "இரண்டு"), t('Three', "மூன்று"), t('Four', "நான்கு")], 1,
        [t(
          'Count both readings of 10 and the reading of 19.',
          "இரண்டு 10 நிமிடப் பதிவுகளையும் 19 நிமிடப் பதிவையும் எண்ணு."
        ),
         t(
           'The two 10s and the 19 each belong to the class. The 8 is below it.',
           "இரண்டு 10 நிமிடப் பதிவுகளும் 19 நிமிடப் பதிவும் இந்த வகுப்பில் சேரும். 8 நிமிடப் பதிவு கீழ் எல்லையைவிடக் குறைவு."
         ),
         t(
           'Check the lower limit. The 8 belongs in an earlier class.',
           "கீழ் எல்லையைக் கவனி. 8 நிமிடப் பதிவு முந்தைய வகுப்பில் சேரும்."
         )])
    },
    {
      id: 'g9-stats-centre',
      section: '8.3', title: {en: 'Mean, median and mode', ta: 'மையப்போக்கு அளவைகள்'},
      intro: t(
        'Compare three summaries of the same five waiting times. Change the longest wait and see which summaries move.',
        "ஒரே ஐந்து காத்திருப்பு நேரங்களை மூன்று விதமாகச் சுருக்கிக் கூறலாம். மிக நீண்ட நேரத்தை மாற்றி, எந்த அளவைகள் மாறுகின்றன என்று பார்."
      ),
      exercise: 'g9-ch8-ex8.4-q4',
      views: [{
        notes: [
          t(
            'A measure of central tendency describes a typical value with one number. The mean is the total shared equally. The median is the middle of the ordered readings. The mode is the most frequent reading.',
            "மையப்போக்கு அளவை தரவுகளைப் பிரதிநிதித்துவப்படுத்தும் ஒரு மதிப்பைத் தருகிறது. மொத்தத்தைச் சமமாகப் பகிர்ந்தால் சராசரி கிடைக்கும். வரிசைப்படுத்திய தரவுகளின் நடுவில் இருப்பது இடைநிலை அளவு. அதிக முறை வரும் மதிப்பு முகடு."
          ),
          t(
            'An extreme value is far from most of the others. For a typical wait when one wait is unusually long, the median can be a good choice. Use the mode to find the most common wait and the mean to share the total.',
            "பெரும்பாலான மதிப்புகளிலிருந்து மிகவும் விலகிய மதிப்பு ஒன்று இருக்கலாம். ஒரே ஒரு காத்திருப்பு நேரம் வழக்கத்தைவிட மிக நீண்டதாக இருந்தால், வழக்கமான நேரத்தை விவரிக்க இடைநிலை அளவு உதவும். அதிக முறை வந்த நேரத்திற்கு முகட்டையும், மொத்தத்தைச் சமமாகப் பகிர சராசரியையும் பயன்படுத்து."
          )
        ],
        why: t(
          'Changing the largest reading changes the sum. The mean changes because the number of readings stays the same. In these two lists the middle position and the most frequent value stay the same.',
          "மிகப் பெரிய மதிப்பை மாற்றினால் கூட்டுத்தொகை மாறும். மதிப்புகளின் எண்ணிக்கை மாறாததால் சராசரி மாறும். இந்த இரு பட்டியல்களிலும் நடுவிலுள்ள மதிப்பும் அதிக முறை வந்த மதிப்பும் மாறவில்லை."
        )
      }],
      practice: check(t(
        'Five parcel weights in kg are 1, 2, 2, 3 and 17. A label should describe a typical weight despite the very heavy parcel. Which summary best uses the middle rank?',
        "ஐந்து பொட்டலங்களின் எடைகள் 1, 2, 2, 3, 17 கி.கி. மிகக் கனமான பொட்டலம் இருந்தாலும், வழக்கமான எடையைக் காட்ட வேண்டும். வரிசையின் நடுவைப் பயன்படுத்தும் அளவை எது?"
      ),
        [t('Mean', "சராசரி"), t('Median', "இடைநிலை அளவு"), t('Largest weight', "மிகப் பெரிய எடை")], 1,
        [t(
          'The mean includes the 17 kg reading and is pulled upward.',
          "17 கி.கி. எடையும் கூட்டுத்தொகையில் சேர்வதால் சராசரி உயர்கிறது."
        ),
         t(
           'The middle of the sorted list is 2 kg. The unusually large value stays at the end.',
           "ஏறுவரிசையின் நடுவிலுள்ள எடை 2 கி.கி. மிகப் பெரிய எடை வரிசையின் கடைசியில் உள்ளது."
         ),
         t(
           'The largest weight describes the single heaviest parcel.',
           "மிகப் பெரிய எடை என்பது மிகக் கனமான ஒரு பொட்டலத்தின் எடை மட்டுமே."
         )])
    },
    {
      id: 'g9-stats-mean',
      section: '8.4', title: {en: 'Arithmetic mean', ta: 'கூட்டுச் சராசரி'},
      intro: t(
        'Share a total equally. Change one reading or switch to a frequency table to see what gets added and counted.',
        "மொத்தத்தைச் சமமாகப் பகிர்ந்து பார். ஒரு மதிப்பெண்ணை மாற்று அல்லது நிகழ்வெண் அட்டவணையைத் தேர்ந்தெடு. எவற்றைக் கூட்டுகிறோம், எதை எண்ணுகிறோம் என்று கவனி."
      ),
      exercise: 'g9-ch8-ex8.1-q1',
      views: [{
        notes: [
          t(
            'Read x̄ as “x bar”. It names the arithmetic mean. The symbol ∑ means add the terms that follow. Each xᵢ is a reading, with i marking its position. The number n counts the readings.',
            "x̄ என்பதை எக்ஸ் பார் என்று படிக்கலாம். இது கூட்டுச் சராசரியைக் குறிக்கிறது. ∑ என்பது அடுத்து வரும் உறுப்புகளைக் கூட்டச் சொல்கிறது. xᵢ என்பது i-ஆவது மதிப்பு. n என்பது மதிப்புகளின் எண்ணிக்கை."
          ),
          t(
            'A deviation is the signed difference from a reference value. For the assumed-mean method, choose a convenient reference A. Each deviation dᵢ is xᵢ minus A. Average the deviations, then add A back.',
            "விலக்கம் என்பது தேர்ந்தெடுத்த ஒரு மதிப்பிலிருந்து எவ்வளவு விலகியிருக்கிறோம் என்பதைக் குறியுடன் காட்டும் வேறுபாடு. ஊகச் சராசரி முறையில் கணக்கிட எளிதான A என்ற மதிப்பைத் தேர்ந்தெடு. ஒவ்வொரு xᵢ மதிப்பிலிருந்தும் A-ஐக் கழித்தால் விலக்கம் dᵢ கிடைக்கும். விலக்குகளின் சராசரியுடன் A-ஐக் கூட்டு."
          )
        ],
        formula: math(tex`\begin{aligned}\bar{x}&=\dfrac{\sum x_i}{n}\\
\bar{x}&=A+\dfrac{\sum d_i}{n}\end{aligned}`, t(
  'Divide the total by the number of readings, or add the average deviation to the assumed mean.',
  "கூட்டுத்தொகையை மதிப்புகளின் எண்ணிக்கையால் வகு. அல்லது ஊகச் சராசரியுடன் விலக்குகளின் சராசரியைக் கூட்டு."
)),
        why: t(
          'Sharing the total gives n equal parts of size x̄. So the signed differences from x̄ add to zero. Adding or subtracting the same amount from every reading changes the mean by that amount. Multiplying or dividing every reading by the same number scales the mean in the same way. A divisor must be nonzero.',
          "மொத்தத்தை n சம பங்குகளாகப் பிரித்தால் ஒவ்வொரு பங்கும் x̄. அதனால் x̄-இலிருந்து உள்ள குறியுடனான விலக்குகளின் கூட்டுத்தொகை பூச்சியம். எல்லா மதிப்புகளுடனும் ஒரே எண்ணைக் கூட்டினாலோ, எல்லாவற்றிலிருந்தும் அதே எண்ணைக் கழித்தாலோ, சராசரியும் அந்த அளவு உயரும் அல்லது குறையும். எல்லா மதிப்புகளையும் ஒரே எண்ணால் பெருக்கினாலோ வகுத்தாலோ சராசரிக்கும் அதே மாற்றம் ஏற்படும். வகுக்கும் எண் பூச்சியமாக இருக்கக் கூடாது."
        ),
        practice: check(t(
          'Four daily scores have a mean of 12. One score is corrected upward by 6. What is the new mean?',
          "நான்கு நாள்களின் மதிப்பெண்களின் சராசரி 12. ஒரு நாள் மதிப்பெண் 6 கூடுதலாகத் திருத்தப்பட்டது. புதிய சராசரி என்ன?"
        ),
          ['13.5', '18', '12.6'], 0,
          [t(
            'The same four scores share six extra points. The mean rises by 1.5 points to 13.5.',
            "கூடுதலான 6 மதிப்பெண்களை நான்கு நாள்களுக்குச் சமமாகப் பகிர்ந்தால் சராசரி 1.5 உயர்ந்து 13.5 ஆகும்."
          ),
           t(
             'Only one score gained six points. Share the increase across all four scores.',
             "ஒரு நாளின் மதிப்பெண் மட்டும் 6 உயர்ந்தது. அந்த உயர்வை நான்கு நாள்களுக்கும் பகிர்."
           ),
           t(
             'The increase is six divided by four, which is 1.5.',
             "6-ஐ 4-ஆல் வகுத்தால் சராசரியின் உயர்வு 1.5."
           )])
      }, {
        exercise: 'g9-ch8-ex8.1-q5',
        notes: [t(
          'Here xᵢ names a distinct value, fᵢ counts its occurrences, and i is its table row. The symbol ∑ means add. The product fᵢxᵢ adds all copies of that value. When A is the assumed mean, dᵢ is the signed difference xᵢ minus A.',
          "இங்கு xᵢ என்பது i-ஆவது வரிசையிலுள்ள மதிப்பு. fᵢ என்பது அது எத்தனை முறை வந்தது என்பதைக் காட்டும் நிகழ்வெண். ∑ என்பது கூட்டுத்தொகையைக் குறிக்கிறது. fᵢxᵢ என்ற பெருக்கற்பலன், அந்த மதிப்பின் அனைத்துப் பதிவுகளின் கூட்டுத்தொகை. A என்பது ஊகச் சராசரி எனில் xᵢ-இலிருந்து A-ஐக் கழித்தால் குறியுடனான விலக்கம் dᵢ கிடைக்கும்."
        )],
        formula: math(tex`\begin{aligned}\bar{x}&=\dfrac{\sum f_i x_i}{\sum f_i}\\
\bar{x}&=A+\dfrac{\sum f_i d_i}{\sum f_i}\end{aligned}`, t(
  'Divide the frequency-weighted total by total frequency, or add the frequency-weighted average deviation to the assumed mean.',
  "மதிப்புகளையும் அவற்றின் நிகழ்வெண்களையும் பெருக்கிக் கூட்டிய பின் மொத்த நிகழ்வெண்ணால் வகு. அல்லது நிகழ்வெண்களைக் கணக்கில் கொண்ட சராசரி விலக்கத்தைக் ஊகச் சராசரியுடன் கூட்டு."
)),
        why: t(
          'Multiplying each value by its frequency replaces repeated addition. Divide by the total frequency because every observation contributes. For the assumed-mean method, average the signed differences with the same frequency weights, then add the reference value back.',
          "ஒரு மதிப்பைத் திரும்பத் திரும்பக் கூட்டுவதற்குப் பதிலாக அதன் நிகழ்வெண்ணால் பெருக்கு. ஒவ்வொரு பதிவும் கணக்கில் சேர்வதால் மொத்த நிகழ்வெண்ணால் வகு. ஊகச் சராசரி முறையில் விலக்குகளைக் கணக்கிடும்போதும் அதே நிகழ்வெண்களைப் பயன்படுத்து. விலக்குகளின் சராசரியுடன் ஊகச் சராசரியைக் கூட்டு."
        ),
        practice: check(t(
          'Two pupils score 3 and three pupils score 8. What is the mean score?',
          "இரண்டு மாணவர்கள் தலா 3 மதிப்பெண்களும், மூன்று மாணவர்கள் தலா 8 மதிப்பெண்களும் பெற்றனர். சராசரி மதிப்பெண் என்ன?"
        ),
          ['5.5', '6', '10'], 1,
          [t(
            'The scores have different frequencies. Count each copy in the total.',
            "மதிப்பெண்களின் நிகழ்வெண்கள் வேறுபடுகின்றன. மொத்தத்தில் ஒவ்வொரு பதிவையும் சேர்."
          ),
           t(
             'Two threes and three eights total 30 points. Five pupils share those points, giving 6.',
             "இரண்டு 3-களையும் மூன்று 8-களையும் கூட்டினால் 30. அதை ஐந்து மாணவர்களுக்குச் சமமாகப் பகிர்ந்தால் 6."
           ),
           t(
             'Add the five scores, then divide by five pupils.',
             "ஐந்து மதிப்பெண்களையும் கூட்டி, ஐந்தால் வகு."
           )])
      }, {
        exercise: 'g9-ch8-ex8.1-q6',
        notes: [
          t(
            'For grouped data xᵢ is the midpoint of class i, halfway between its boundaries. Each fᵢ counts the readings in that class. The sum signs ∑ add all the rows. Replacing readings with their class midpoints makes the mean an estimate. The symbol ≈ means “approximately equal to”.',
            "வகைப்படுத்தப்பட்ட தரவுகளில் xᵢ என்பது i-ஆவது வகுப்பின் மைய மதிப்பு. அது அந்த வகுப்பின் இரு எல்லைகளுக்கும் நடுவில் இருக்கும். fᵢ என்பது அந்த வகுப்பின் நிகழ்வெண். ∑ என்பது எல்லா வரிசைகளுக்கும் கூட்டலைச் செய்யச் சொல்கிறது. ஒவ்வொரு பதிவுக்கும் அதனுடைய வகுப்பின் மைய மதிப்பைப் பயன்படுத்துவதால் சராசரி ஒரு மதிப்பீடாகும். ≈ என்பது தோராயமாகச் சமம் என்று பொருள்."
          ),
          t(
            'For the assumed-mean method use A as a convenient reference and dᵢ as xᵢ minus A. For step deviation divide dᵢ by a common nonzero step c to get uᵢ. Equal-width classes make their width a convenient step.',
            "ஊகச் சராசரி முறையில் A-ஐத் தேர்ந்தெடு. xᵢ-இலிருந்து A-ஐக் கழித்தால் dᵢ கிடைக்கும். படிவிலக்க முறையில் dᵢ-ஐ பூச்சியம் அல்லாத பொதுப் படி அளவு c-ஆல் வகுத்தால் uᵢ கிடைக்கும். வகுப்புகளின் அகலங்கள் சமமாக இருந்தால், அந்த அகலத்தைப் படி அளவாக எடுத்துக்கொள்ளலாம்."
          )
        ],
        formula: math(tex`\begin{aligned}\bar{x}&\approx\dfrac{\sum f_i x_i}{\sum f_i}\\
\bar{x}&\approx A+\dfrac{\sum f_i d_i}{\sum f_i}\\
\bar{x}&\approx A+c\dfrac{\sum f_i u_i}{\sum f_i}\end{aligned}`, t(
  'Direct, assumed mean and step deviation give the same midpoint-based estimate.',
  "நேரடி முறை, ஊகச் சராசரி முறை, படிவிலக்க முறை ஆகிய மூன்றிலும் வகுப்பு மைய மதிப்புகளைப் பயன்படுத்தி ஒரே மதிப்பீட்டைப் பெறலாம்."
)),
        why: t(
          'The reference and step change how we write the midpoint. Adding A back restores the reference. Multiplying by c converts steps back into the original units before adding A.',
          "வகுப்பு மைய மதிப்பை விலக்கமாகவோ, படிகளின் எண்ணிக்கையாகவோ எழுதலாம். படிகளைக் கணக்கிட்டால் முதலில் c-ஆல் பெருக்கி, மீண்டும் மூல அலகிற்கு மாற்று. பிறகு A-ஐக் கூட்டு."
        ),
        practice: check(t(
          'A table puts four trips in 0 to under 10 minutes and two in 10 to under 20. What is the estimated mean?',
          "10 நிமிடத்திற்குக் குறைவான வகுப்பில் நான்கு பயணங்களும் 10 முதல் 20 நிமிடத்திற்குக் குறைவான வகுப்பில் இரண்டு பயணங்களும் உள்ளன. மதிப்பிடப்பட்ட சராசரி என்ன?"
        ),
          [t('Eight and one third minutes', "எட்டு முழுதும் மூன்றில் ஒரு பங்கும் நிமிடம்"), t('10 minutes', "10 நிமிடங்கள்"), t('Twelve and a half minutes', "பன்னிரண்டரை நிமிடங்கள்")], 0,
          [t(
            'Four copies of 5 and two copies of 15 total 50 minutes. Divide by six to get eight and one third.',
            "நான்கு 5-களையும் இரண்டு 15-களையும் கூட்டினால் மொத்தம் 50 நிமிடங்கள். ஆறால் வகுத்தால் எட்டு முழுதும் மூன்றில் ஒரு பங்கும் கிடைக்கும்."
          ),
           t(
             'The two midpoints have different frequencies. Weight each by the number of trips.',
             "இரு வகுப்பு மைய மதிப்புகளின் நிகழ்வெண்கள் வேறுபடுகின்றன. ஒவ்வொரு மைய மதிப்பையும் அதன் நிகழ்வெண்ணால் பெருக்கு."
           ),
           t(
             'The first class has the larger frequency, so the estimate is closer to 5 than to 15.',
             "முதல் வகுப்பின் நிகழ்வெண் அதிகம். எனவே மதிப்பீடு 15-ஐ விட 5-க்கு அருகில் இருக்கும்."
           )])
      }]
    },
    {
      id: 'g9-stats-median',
      section: '8.5', title: {en: 'Median', ta: 'இடைநிலை அளவு'},
      intro: t(
        'Order the readings, then find the centre by position. Compare a list, a frequency table and grouped intervals.',
        "மதிப்புகளை ஏறுவரிசையில் எழுதிப் பின் நடு இடத்தைக் கண்டுபிடி. ஒரு பட்டியல், நிகழ்வெண் அட்டவணை, பிரிவு இடைவெளி அட்டவணை ஆகியவற்றை ஒப்பிடு."
      ),
      exercise: 'g9-ch8-ex8.2-q1',
      views: [{
        notes: [t(
          'Sort the observations in increasing order. Keep duplicates because each observation takes one position. In the formulas, n is the number of observations, p is the single middle position, and p₁ and p₂ are the two middle positions when there are an even number of readings.',
          "மதிப்புகளை ஏறுவரிசையில் எழுது. ஒரு மதிப்பு பல முறை வந்தால் அதனை ஒவ்வொரு முறையும் எழுது. ஒவ்வொரு பதிவும் ஓர் இடத்தைப் பெறும். வாய்ப்பாடுகளில் n என்பது பதிவுகளின் எண்ணிக்கை. ஒற்றைப்படை எண்ணிக்கையில் p என்பது நடு இடம். இரட்டைப்படை எண்ணிக்கையில் p₁, p₂ ஆகியவை இரு நடு இடங்கள்."
        )],
        formula: math(tex`\begin{aligned}p&=\dfrac{n+1}{2}\\
p_1,\ p_2&=\dfrac n2,\ \dfrac n2+1\end{aligned}`, t(
  'Odd lists have one middle position. Even lists have two.',
  "ஒற்றைப்படை எண்ணிக்கைக்கு ஒரு நடு இடம் உண்டு. இரட்டைப்படை எண்ணிக்கைக்கு இரண்டு நடு இடங்கள் உண்டு."
)),
        why: t(
          'Pair the smallest with the largest, then work inward. An odd list leaves one central value. An even list leaves two, so take their mean. The median may be absent from the original list.',
          "மிகச் சிறிய மதிப்பை மிகப் பெரிய மதிப்புடன் இணை. இரு முனைகளிலிருந்தும் இவ்வாறு இணைத்துக்கொண்டே நடுவை நோக்கி வா. ஒற்றைப்படை எண்ணிக்கையில் ஒரு மதிப்பு நடுவில் எஞ்சும். இரட்டைப்படை எண்ணிக்கையில் இரண்டு மதிப்புகள் எஞ்சும். அவற்றின் சராசரியே இடைநிலை அளவு. அந்த அளவு மூலப் பட்டியலில் இல்லாமலும் இருக்கலாம்."
        ),
        practice: check(t('Find the median of 11, 3, 7 and 2.', "11, 3, 7, 2 ஆகியவற்றின் இடைநிலை அளவைக் காண்."), ['5', '7', '5.75'], 0,
          [t(
            'Sorted order is 2, 3, 7, 11. The two middle values are 3 and 7, whose mean is 5.',
            "ஏறுவரிசை 2, 3, 7, 11. நடுவிலுள்ள 3, 7 ஆகியவற்றின் சராசரி 5."
          ),
           t(
             'There are two middle positions. Use both 3 and 7.',
             "இரண்டு நடு இடங்கள் உள்ளன. 3 மற்றும் 7 இரண்டையும் பயன்படுத்து."
           ),
           t(
             'The median uses the middle two values after sorting.',
             "ஏறுவரிசைப்படுத்திய பின் நடுவில் உள்ள இரண்டு மதிப்புகளைப் பயன்படுத்து."
           )])
      }, {
        exercise: 'g9-ch8-ex8.2-q4',
        notes: [t(
          'The frequency f counts copies of a value. Cumulative frequency, abbreviated CF, is the running count through the current row. The last CF is N, the total number of observations.',
          "நிகழ்வெண் f என்பது ஒரு மதிப்பு வந்த முறை எண்ணிக்கை. CF என்பது குவிவு நிகழ்வெண். அது முதல் வரிசையிலிருந்து தற்போதைய வரிசை வரையிலான நிகழ்வெண்களின் கூட்டுத்தொகை. கடைசி CF, மொத்தப் பதிவுகளின் எண்ணிக்கை N ஆகும்."
        )],
        why: t(
          'Use N to find the one or two middle positions just as for a sorted list. Find the first row whose running count reaches each position. That row’s value occupies the position.',
          "ஏறுவரிசைப் பட்டியலில் செய்வதைப் போல, N-ஐக் கொண்டு ஒன்று அல்லது இரண்டு நடு இடங்களைக் காண். ஒவ்வொரு நடு இடத்தையும் எட்டும் முதல் குவிவு நிகழ்வெண்ணைத் தேடு. அந்த வரிசையின் மதிப்பே அந்த நடு இடத்தில் இருக்கும்."
        ),
        practice: check(t(
          'The values 2, 7 and 9 have frequencies 2, 1 and 3. What is the median?',
          "2, 7, 9 ஆகிய மதிப்புகளுக்கு முறையே 2, 1, 3 நிகழ்வெண்கள் உள்ளன. இடைநிலை அளவு என்ன?"
        ), ['7', '8', '9'], 1,
          [t(
            'The third reading is 7. The fourth is 9. Use both.',
            "மூன்றாவது மதிப்பு 7. நான்காவது மதிப்பு 9. இரண்டையும் பயன்படுத்து."
          ),
           t(
             'There are six readings. Positions 3 and 4 contain 7 and 9, giving a median of 8.',
             "ஆறு பதிவுகளில் 3, 4 ஆகிய இடங்களில் உள்ள 7, 9-ன் சராசரி 8."
           ),
           t(
             'Nine occupies the fourth position. The third is still 7.',
             "9 நான்காம் இடத்திலும் 7 மூன்றாம் இடத்திலும் உள்ளன."
           )])
      }, {
        exercise: 'g9-ch8-ex8.2-q5',
        notes: [
          t(
            'Use half the total frequency N to locate the middle of the grouped data. Find the first class whose running count reaches or passes that target.',
            "வகைப்படுத்தப்பட்ட தரவுகளில் மொத்த நிகழ்வெண் N-இன் பாதியைக் கணக்கிடு. அதன் அளவை முதலில் எட்டும் அல்லது கடக்கும் குவிவு நிகழ்வெண்ணுக்கு உரிய வகுப்பைக் கண்டுபிடி."
          ),
          t(
            'In the formula, M is the estimated median. The letter l is the lower boundary of the median class, m is the cumulative frequency before it, f is the class frequency, and c is its width. The width is its upper boundary minus its lower boundary. The symbol ≈ means “approximately equal to”. For whole-number classes 1–5 and 6–10, the shared boundary is 5.5, halfway between 5 and 6.',
            "வாய்ப்பாட்டில் M என்பது மதிப்பிடப்பட்ட இடைநிலை அளவு. l என்பது இடைநிலைப் பிரிவின் கீழ் எல்லை. m என்பது முந்தைய பிரிவு வரையிலான குவிவு நிகழ்வெண். f என்பது இடைநிலைப் பிரிவின் நிகழ்வெண். c என்பது அதன் அகலம். மேல் எல்லையிலிருந்து கீழ் எல்லையைக் கழித்தால் அகலம் கிடைக்கும். ≈ என்பது தோராயமாகச் சமம் என்று பொருள். 1–5, 6–10 என்ற முழு எண் வகுப்புகளுக்கு இடையிலான பொது எல்லை 5.5. அது 5-க்கும் 6-க்கும் நடுவில் உள்ளது."
          )
        ],
        formula: math(tex`M\approx l+\dfrac{\tfrac{N}{2}-m}{f}c`, t(
          'Estimated median is the lower boundary plus the fraction of the median class needed to reach the halfway count, times the class width.',
          "பாதி எண்ணிக்கையை எட்ட வகுப்பின் எவ்வளவு பங்கு தேவை என்று கணக்கிடு. வகுப்பு அகலத்தை அந்தப் பங்கால் பெருக்கி, அதன் கீழ் எல்லையுடன் கூட்டு."
        )),
        why: t(
          'Subtract the previous running count from the halfway count to see how many readings you still need. Estimate the same fraction of the class width by treating the readings as evenly spread within it. When the halfway count falls exactly at a class boundary, that boundary is the estimate.',
          "பாதி எண்ணிக்கையிலிருந்து முந்தைய குவிவு நிகழ்வெண்ணைக் கழித்தால் வகுப்பில் இன்னும் எத்தனை பதிவுகள் தேவை என்று தெரியும். பதிவுகள் வகுப்பு முழுவதும் சீராகப் பரவியுள்ளதாகக் கருதி, அதே பங்கை வகுப்பு அகலத்தில் எடு. பாதி எண்ணிக்கை சரியாகப் பொது எல்லையில் வந்தால் அந்த எல்லையே மதிப்பீடு."
        ),
        practice: check(t(
          'Three consecutive 10-minute classes start at 0, 10 and 20. Their frequencies are 4, 8 and 4. What is the estimated median?',
          "0, 10, 20 நிமிடங்களில் தொடங்கும் மூன்று தொடர்ச்சியான வகுப்புகள் ஒவ்வொன்றும் 10 நிமிட அகலம் கொண்டவை. அவற்றின் நிகழ்வெண்கள் முறையே 4, 8, 4. மதிப்பிடப்பட்ட இடைநிலை அளவு என்ன?"
        ),
          [t('10 minutes', "10 நிமிடங்கள்"), t('15 minutes', "15 நிமிடங்கள்"), t('20 minutes', "20 நிமிடங்கள்")], 1,
          [t(
            'Four readings are below 10 minutes. The halfway count is eight, so go into the second class.',
            "10 நிமிடத்திற்குக் கீழே நான்கு பதிவுகள்தான் உள்ளன. பாதி எண்ணிக்கை எட்டு என்பதால் இரண்டாவது வகுப்பிற்குள் செல்."
          ),
           t(
             'Four more readings are needed inside a class of eight. Halfway through 10 to 20 is 15.',
             "எட்டு பதிவுகள் கொண்ட வகுப்பில் மேலும் நான்கு பதிவுகள் தேவை. 10-க்கும் 20-க்கும் பாதி வழியில் 15 கிடைக்கும்."
           ),
           t(
             'The halfway count is reached before the second class ends.',
             "இரண்டாவது வகுப்பு முடிவதற்கு முன்பே பாதி எண்ணிக்கையை எட்டிவிடுகிறோம்."
           )])
      }]
    },
    {
      id: 'g9-stats-mode',
      section: '8.6', title: {en: 'Mode', ta: 'முகடு'},
      intro: t(
        'Find the most frequent value. Compare a clear winner, a tie and a grouped modal class.',
        "அதிக முறை வரும் மதிப்பைக் கண்டுபிடி. ஒரு முகடு, சமநிலையில் இரண்டு முகடுகள், தொகுக்கப்பட்ட தரவின் முகட்டுப் பிரிவு ஆகியவற்றை ஒப்பிடு."
      ),
      exercise: 'g9-ch8-ex8.3-q1',
      views: [{
        notes: [t(
          'Frequency means the number of times a value occurs. A mode is the value that occurs most often. It can describe numerical readings or categories, such as a popular library genre.',
          "ஒரு மதிப்பு எத்தனை முறை வருகிறது என்பது அதன் நிகழ்வெண். அதிக முறை வரும் மதிப்பு முகடு. எண் மதிப்புகளுக்கும் நூலகப் புத்தக வகை போன்ற வகைகளுக்கும் முகட்டைக் காணலாம்."
        )],
        why: t(
          'Count each copy and compare the counts. Tied most-frequent repeated values are modes. When every value occurs only once, there is no mode under the school convention. One, two and three modes give unimodal, bimodal and trimodal distributions. The book calls more than three modes multimodal.',
          "ஒவ்வொரு பதிவையும் எண்ணி நிகழ்வெண்களை ஒப்பிடு. அதிக முறை வரும் மதிப்புகள் ஒன்றுக்கு மேல் இருந்தால் அவை ஒவ்வொன்றும் ஒரு முகடு. ஒவ்வொரு மதிப்பும் ஒரே ஒரு முறை வந்தால் முகடு இல்லை. ஒன்று, இரண்டு, மூன்று முகடுகள் இருந்தால் முறையே ஒற்றை முகட்டுப் பரவல், இரட்டை முகட்டுப் பரவல், மும்முகட்டுப் பரவல் எனப்படும். மூன்றுக்கு மேற்பட்ட முகடுகள் இருந்தால் பன்முகட்டுப் பரவல் எனப்படும்."
        ),
        practice: check(t(
          'In a survey, five pupils choose dance, five choose art and two choose chess. What is the mode?',
          "ஒரு கணக்கெடுப்பில் ஐந்து மாணவர்கள் நடனத்தையும், ஐந்து மாணவர்கள் ஓவியத்தையும், இரண்டு மாணவர்கள் சதுரங்கத்தையும் தேர்ந்தெடுத்தனர். முகடு எது?"
        ),
          [t('Dance only', "நடனம் மட்டும்"), t('Dance and art', "நடனமும் ஓவியமும்"), t('Five', "ஐந்து")], 1,
          [t('Art has the same frequency as dance.', "நடனத்திற்கும் ஓவியத்திற்கும் சமமான நிகழ்வெண் உள்ளது."),
           t(
             'Dance and art tie for the highest frequency. Both are modes.',
             "நடனமும் ஓவியமும் சமமான மிகப் பெரிய நிகழ்வெண்ணைக் கொண்டவை. இரண்டுமே முகடுகள்."
           ),
           t(
             'Five is the frequency. The modes are the categories with that frequency.',
             "ஐந்து என்பது நிகழ்வெண். அந்த நிகழ்வெண்ணைக் கொண்ட வகைகளே முகடுகள்."
           )])
      }, {
        exercise: 'g9-ch8-ex8.3-q4',
        notes: [t(
          'An ungrouped table lists exact values and their frequencies. The row label gives the mode. The frequency tells how often that value occurs.',
          "வகைப்படுத்தப்படாத அட்டவணை ஒவ்வொரு மதிப்பையும் அதன் நிகழ்வெண்ணையும் காட்டுகிறது. மிகப் பெரிய நிகழ்வெண் உள்ள வரிசையின் மதிப்பே முகடு. நிகழ்வெண் அந்த மதிப்பு வந்த முறை எண்ணிக்கையைக் காட்டுகிறது."
        )],
        why: t(
          'Look down the frequency column for the largest count, then read its value. A large observation can have a small frequency.',
          "நிகழ்வெண் நிரலில் மிகப் பெரிய எண்ணைக் கண்டுபிடி. அதற்கு உரிய மதிப்பைப் படி. மிகப் பெரிய மதிப்புகூட ஒரு சில முறை மட்டுமே வந்திருக்கலாம்."
        ),
        practice: check(t(
          'The values 3, 5 and 12 have frequencies 2, 6 and 1. What is the mode?',
          "3, 5, 12 ஆகிய மதிப்புகளின் நிகழ்வெண்கள் முறையே 2, 6, 1. முகடு எது?"
        ), ['6', '5', '12'], 1,
          [t('Six is how often the mode occurs.', "ஆறு என்பது முகடு எத்தனை முறை வந்தது என்பதைக் காட்டுகிறது."),
           t(
             'The highest frequency is six, and it belongs to the value 5.',
             "மிகப் பெரிய நிகழ்வெண் ஆறு. அதற்குரிய மதிப்பு 5."
           ),
           t(
             'Twelve is the largest value, and it occurs only once.',
             "12 மிகப் பெரிய மதிப்பு. அது ஒரே ஒரு முறைதான் வருகிறது."
           )])
      }, {
        exercise: 'g9-ch8-ex8.3-q5',
        notes: [
          t(
            'With equal-width classes, the class with a unique highest frequency is the modal class. For the worked method, it has a neighbouring class on each side.',
            "சம அகலமுள்ள வகுப்புகளில் அதிக நிகழ்வெண் கொண்ட ஒரே வகுப்பு முகட்டுப் பிரிவு. இங்கு பயன்படுத்தும் முறைக்கு அதன் இருபுறமும் ஒரு வகுப்பு தேவை."
          ),
          t(
            'In the formula, Z is the estimated mode. The letter l marks the modal class’s lower boundary, c its width, f its frequency, f₁ the preceding frequency and f₂ the following frequency. For whole-number classes 1–5 and 6–10, use the shared boundary 5.5. Unequal widths require comparing frequency per unit width. The symbol ≈ means “approximately equal to”.',
            "வாய்ப்பாட்டில் Z என்பது மதிப்பிடப்பட்ட முகடு. l என்பது முகட்டுப் பிரிவின் கீழ் எல்லை, c அதன் அகலம், f அதன் நிகழ்வெண். f₁ என்பது முந்தைய பிரிவின் நிகழ்வெண், f₂ அடுத்த பிரிவின் நிகழ்வெண். 1–5, 6–10 என்ற முழு எண் வகுப்புகளின் பொது எல்லை 5.5. வெவ்வேறு அகலமுள்ள வகுப்புகளில் ஓர் அலகு அகலத்துக்கான நிகழ்வெண்களை ஒப்பிட வேண்டும். ≈ என்பது தோராயமாகச் சமம் என்று பொருள்."
          )
        ],
        formula: math(tex`Z\approx l+\dfrac{f-f_1}{2f-f_1-f_2}c`, t(
          'Estimated mode is the lower boundary plus the share of the total neighbour differences on the left, times the class width.',
          "அண்டை வகுப்புகளுடனான இரு நிகழ்வெண் வேறுபாடுகளையும் கூட்டு. அதில் இடப்புற வேறுபாட்டின் பங்கால் வகுப்பு அகலத்தைப் பெருக்கி, கீழ் எல்லையுடன் கூட்டு."
        )),
        why: t(
          'First identify the modal class by frequency. Measure the two drops from its frequency to those of the neighbours. The fraction compares the left drop with the sum of both drops and places the estimate inside the modal class. A tied peak needs more care than this single-peak estimate.',
          "முதலில் நிகழ்வெண்ணைக் கொண்டு முகட்டுப் பிரிவைக் கண்டுபிடி. அதன் நிகழ்வெண்ணிலிருந்து முந்தைய, அடுத்த வகுப்புகளின் நிகழ்வெண்களைத் தனித்தனியாகக் கழி. இரு வேறுபாடுகளின் மொத்தத்தில் இடப்புற வேறுபாட்டின் பங்கு, வகுப்புக்குள் மதிப்பீடு அமையும் இடத்தைக் குறிக்கிறது. மிகப் பெரிய நிகழ்வெண்ணில் சமநிலை இருந்தால் இந்த ஒரே முகட்டிற்கான வாய்ப்பாட்டை நேரடியாகப் பயன்படுத்த முடியாது."
        ),
        practice: check(t(
          'The classes 10–20, 20–30 and 30–40 have frequencies 4, 8 and 4. What is the estimated mode?',
          "10–20, 20–30, 30–40 என்ற வகுப்புகளின் நிகழ்வெண்கள் முறையே 4, 8, 4. மதிப்பிடப்பட்ட முகடு என்ன?"
        ),
          ['8', '20', '25'], 2,
          [t(
            'Eight is the highest frequency. The estimate lies inside the class 20–30.',
            "எட்டு என்பது மிகப் பெரிய நிகழ்வெண். மதிப்பீடு 20–30 என்ற வகுப்புக்குள் அமையும்."
          ),
           t(
             'That is the lower boundary. The drops to the neighbours are equal, so go halfway across.',
             "20 கீழ் எல்லை. இருபுற நிகழ்வெண் வேறுபாடுகள் சமம் என்பதால் வகுப்பின் நடுவுக்குச் செல்."
           ),
           t(
             'The equal drops put the estimated mode halfway across the modal class 20–30.',
             "இரு வேறுபாடுகளும் சமம். எனவே 20–30 என்ற முகட்டுப் பிரிவின் நடுவில் 25 கிடைக்கும்."
           )])
      }, {
        exercise: 'g9-ch8-ex8.4-q4',
        notes: [t(
          'Empirical means based on a pattern seen in data. For some single-peaked distributions whose shapes are close to symmetric, the three measures have an approximate relationship. In the formula, Z is the mode, M is the median, and x̄ is the mean. The symbol ≈ means “approximately equal to”.',
          "தரவுகளில் கண்டறிந்த ஒரு போக்கை அடிப்படையாகக் கொண்டது அனுபவத் தொடர்பு. ஒரே ஒரு உச்சி கொண்ட, ஏறத்தாழச் சமச்சீரான சில பரவல்களில் மூன்று மையப்போக்கு அளவைகளுக்கும் தோராயமான தொடர்பு உண்டு. வாய்ப்பாட்டில் Z என்பது முகடு, M இடைநிலை அளவு, x̄ சராசரி. ≈ என்பது தோராயமாகச் சமம் என்று பொருள்."
        )],
        formula: math(tex`\begin{aligned}Z&\approx 3M-2\bar{x}\\
M&\approx\dfrac{Z+2\bar{x}}{3}\end{aligned}`, t(
          'Estimate the mode by taking three times the median minus twice the mean. To estimate the median, add twice the mean to the mode and divide by three.',
          "இடைநிலை அளவின் மூன்று மடங்கிலிருந்து சராசரியின் இரு மடங்கைக் கழித்தால் முகட்டின் மதிப்பீடு கிடைக்கும். இடைநிலை அளவை மதிப்பிட, முகட்டுடன் சராசரியின் இரு மடங்கைக் கூட்டி மூன்றால் வகு."
        )),
        why: t(
          'Use this relationship as a rough estimate when two averages are given and the distribution is suitable. Actual frequencies give more direct evidence about the mode.',
          "பொருத்தமான பரவலில் இரண்டு அளவைகள் கொடுக்கப்பட்டால், மூன்றாவதைத் தோராயமாகக் காண இந்தத் தொடர்பைப் பயன்படுத்து. நிகழ்வெண்கள் கொடுக்கப்பட்டால் அவற்றிலிருந்தே முகட்டை நேரடியாகக் கண்டுபிடிக்கலாம்."
        ),
        practice: check(t(
          'A suitable distribution has mean 25 and median 24. What mode would this relationship estimate?',
          "பொருத்தமான ஒரு பரவலின் சராசரி 25, இடைநிலை அளவு 24. இந்தத் தொடர்பைப் பயன்படுத்தி மதிப்பிடும் முகடு என்ன?"
        ),
          ['22', '24', '26'], 0,
          [t(
            'Three times 24 is 72 and twice 25 is 50. The estimate is 22.',
            "24-ஐ மூன்றால் பெருக்கினால் 72. 25-ஐ இரண்டால் பெருக்கினால் 50. 72-இலிருந்து 50-ஐக் கழித்தால் 22."
          ),
           t(
             'Subtract twice the mean from three times the median.',
             "இடைநிலை அளவின் மூன்று மடங்கிலிருந்து சராசரியின் இரு மடங்கைக் கழி."
           ),
           t(
             'The order matters. Start with three medians and subtract two means.',
             "கழிக்கும் வரிசையைக் கவனி. முதலில் இடைநிலை அளவை மூன்றால் பெருக்கி, அதிலிருந்து சராசரியின் இரு மடங்கைக் கழி."
           )])
      }]
    }
  ];
})();
