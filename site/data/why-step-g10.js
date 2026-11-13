/* Triggle Grade 10: optional, step-specific learning bridges.
 * Textbook question, authored working and answer are never altered.
 * English and Tamil helpers are original Triggle teaching copy;
 * Tamil editorial review remains pending. No automated inference at runtime.
 */
(()=>{'use strict';window.TriggleWhyStepG10=Object.freeze({
  "version": "2026-11-14-g10-first",
  "grade": 10,
  "review": {
    "ta": "editorial-pending"
  },
  "hints": {
    "c10-1-ex1-1-q1-iii": {
      "step": 1,
      "expected": "A × B has no ordered",
      "en": "An ordered pair needs one entry from each set. The second set has no entries, so not even one pair can be formed.",
      "ta": "ஒரு வரிசைச் சோடிக்கு இரண்டு கணங்களிலிருந்தும் தலா ஓர் உறுப்பு வேண்டும். இரண்டாவது கணம் காலியாக இருப்பதால் ஒரு சோடியும் அமையாது.",
      "math": {
        "latex": "A\\times\\varnothing=\\varnothing",
        "display": true,
        "fallback": "An ordered pair needs one entry from each set. The second set has no entries, so not even one pair can be formed."
      }
    },
    "c10-1-ex1-1-q2": {
      "step": 2,
      "expected": "Reverse the coordinate",
      "en": "Order matters in an ordered pair: switching the two sets switches which value is written first.",
      "ta": "வரிசைச் சோடியில் உறுப்புகளின் இடம் முக்கியம். கணங்களின் வரிசையை மாற்றினால் முதல், இரண்டாம் இடங்களும் மாறும்."
    },
    "c10-1-1-2-q1": {
      "step": 1,
      "expected": "In (i), 1 is not",
      "en": "Check membership in the correct set: the first coordinate must belong to the starting set and the second to the target set.",
      "ta": "முதல் ஆயம் தொடக்கக் கணத்திலும் இரண்டாம் ஆயம் இலக்குக் கணத்திலும் இருக்க வேண்டும். அதற்கேற்ப ஒவ்வொரு சோடியையும் சரிபார்க்கவும்."
    },
    "c10-1-1-2-q2": {
      "step": 1,
      "expected": "Only natural numbers",
      "en": "The square grows faster than the original number. The next natural number would give a square larger than the permitted maximum.",
      "ta": "ஒரு எண்ணின் வர்க்கம் விரைவாக அதிகரிக்கும். அடுத்த இயல் எண்ணின் வர்க்கம் அனுமதிக்கப்பட்ட மிகப்பெரிய மதிப்பை மீறும்."
    },
    "c10-1-1-2-q3": {
      "step": 2,
      "expected": "Read the first",
      "en": "The domain collects the first coordinates; the range collects the second coordinates. Repeated values are listed only once.",
      "ta": "சார்பகத்தில் முதல் ஆயங்கள்; வீச்சகத்தில் இரண்டாம் ஆயங்கள் இடம்பெறும். ஒரே மதிப்பை மீண்டும் எழுத வேண்டாம்."
    },
    "c10-1-1-2-q4": {
      "step": 0,
      "expected": "For (i), solve",
      "en": "Solving a rule is not enough: the question also restricts which values may appear in each set.",
      "ta": "விதியைத் தீர்ப்பது மட்டும் போதாது. ஒவ்வொரு கணத்திலும் எந்த மதிப்புகள் இடம்பெறலாம் என்ற கட்டுப்பாட்டையும் பார்க்க வேண்டும்."
    },
    "c10-2-ex2-1-q1": {
      "step": 0,
      "expected": "Use the division algorithm",
      "en": "When dividing by a positive number, the remainder is what remains after removing whole groups of that size.",
      "ta": "ஒரு நேர்ம எண்ணால் வகுக்கும் போது முழுக் குழுக்களை எடுத்த பிறகு மீதமிருப்பதே மீதி.",
      "math": {
        "latex": "n=3k+2",
        "display": true,
        "fallback": "When dividing by a positive number, the remainder is what remains after removing whole groups of that size."
      }
    },
    "c10-2-ex2-1-q2": {
      "step": 0,
      "expected": "Divide the total",
      "en": "A complete row needs the full specified number of pots. The quotient counts full rows; the remainder counts unused pots.",
      "ta": "ஒரு முழு வரிசைக்கு குறிப்பிட்ட எண்ணிக்கையிலான தொட்டிகள் வேண்டும். ஈவு முழு வரிசைகளையும் மீதி பயன்படுத்தப்படாத தொட்டிகளையும் குறிக்கும்."
    },
    "c10-2-ex2-1-q3": {
      "step": 2,
      "expected": "If n is odd",
      "en": "Consecutive integers have opposite parity: when the first is odd, the next is even. An even factor makes their product divisible by two.",
      "ta": "அடுத்தடுத்த முழு எண்களில் ஒன்று ஒற்றை, மற்றொன்று இரட்டை. ஓர் இரட்டை காரணி இருப்பதால் அவற்றின் பெருக்கல் இரண்டால் வகுபடும்."
    },
    "c10-2-ex2-1-q4": {
      "step": 2,
      "expected": "The remainders sum",
      "en": "A remainder total may be larger than the divisor. Here the combined remainder itself forms complete groups, leaving none.",
      "ta": "மீதிகளின் கூட்டுத்தொகை வகுப்பியைவிடப் பெரிதாக இருக்கலாம். இங்கு அந்தக் கூட்டுத்தொகையே முழுக் குழுக்களாகப் பிரிகிறது.",
      "math": {
        "latex": "9+7+10=26=2\\times13",
        "display": true,
        "fallback": "A remainder total may be larger than the divisor. Here the combined remainder itself forms complete groups, leaving none."
      }
    },
    "c10-2-ex2-2-q1": {
      "step": 1,
      "expected": "The last digit alternates",
      "en": "Only the units digit matters for the units digit of the next product. The pattern therefore repeats every two powers.",
      "ta": "அடுத்த பெருக்கலின் ஒன்றுகள் இலக்கத்தைக் கண்டறிய தற்போதைய ஒன்றுகள் இலக்கமே போதும். அதனால் இரு அடுக்குகளுக்கு ஒருமுறை முறை மீள்கிறது."
    },
    "c10-2-ex2-2-q2": {
      "step": 1,
      "expected": "A factor of 10",
      "en": "Any whole number multiplied by ten ends in zero. The remaining factors cannot change that last digit.",
      "ta": "பத்தை ஒரு முழு எண்ணால் பெருக்கினால் ஒன்றுகள் இலக்கம் பூஜ்ஜியம். மீதமுள்ள காரணிகள் இதை மாற்ற முடியாது."
    },
    "c10-2-ex2-2-q3": {
      "step": 2,
      "expected": "Thus the common factor",
      "en": "After removing the known common factor, the leftover numbers share no factor greater than one. There is nothing more to add to the HCF.",
      "ta": "தெரிந்த பொதுக்காரணியை நீக்கிய பின் மீதமுள்ள இரு எண்களுக்கும் ஒன்றைத் தவிர பொதுக்காரணி இல்லை. ஆகவே மீ.பொ.வ. இன்னும் பெருகாது."
    },
    "c10-3-ex3-1-q1-i": {
      "step": 0,
      "expected": "Subtract the first",
      "en": "Subtracting two equations eliminates any variable whose coefficients are identical. That leaves fewer unknowns to solve.",
      "ta": "இரு சமன்பாடுகளைக் கழிக்கும்போது ஒரே கெழுக்களுள்ள மாறிகள் நீங்கும். தீர்க்க வேண்டிய தெரியாத மாறிகள் குறையும்."
    },
    "c10-3-ex3-1-q1-ii": {
      "step": 0,
      "expected": "Since x, y and z occur",
      "en": "Reciprocals turn the given fractional expressions into ordinary linear expressions. Solve those first, then convert back.",
      "ta": "தலைகீழ் மதிப்புகளைப் புதிய மாறிகளாகக் கொண்டால் பின்னங்களுள்ள சமன்பாடுகள் எளிய நேரியல் சமன்பாடுகளாக மாறும். முதலில் அவற்றைத் தீர்த்து பிறகு பழைய மாறிகளுக்குத் திரும்பவும்."
    },
    "c10-3-ex3-1-q1-iii": {
      "step": 2,
      "expected": "Use y = 105",
      "en": "Substitution removes one variable: replace every occurrence of it with an equal expression from the other equation.",
      "ta": "பதிலீட்டில் ஒரு மாறிக்கு இணையான கோவையை மற்றொரு சமன்பாட்டில் இடுகிறோம். இதனால் ஒரு தெரியாத மாறி நீங்கும்."
    },
    "c10-4-ex4-1-q1-i": {
      "step": 1,
      "expected": "For similar triangles",
      "en": "You must compare sides that face matching angles. Even a small inequality between their exact ratios disproves similarity.",
      "ta": "ஒத்த கோணங்களுக்கு எதிரே உள்ள பொருத்தமான பக்கங்களைத்தான் ஒப்பிட வேண்டும். சரியான விகிதங்கள் சிறிதளவு வேறுபட்டாலும் முக்கோணங்கள் வடிவொத்தவை அல்ல."
    },
    "c10-4-ex4-1-q1-ii": {
      "step": 2,
      "expected": "By the AA similarity",
      "en": "Two equal pairs of angles are enough: the third pair must also match because every triangle's angles sum to a straight angle.",
      "ta": "இரண்டு சோடி கோணங்கள் சமமாக இருந்தாலே போதும். ஒவ்வொரு முக்கோணத்தின் மூன்று கோணங்களின் கூடுதல் ஒரே அளவு என்பதால் மூன்றாவதும் சமம்."
    },
    "c10-4-ex4-1-q2": {
      "step": 0,
      "expected": "The girl/mirror",
      "en": "Reflection makes the viewing angle equal on both sides of the mirror. Along with the right angles, that gives similar triangles.",
      "ta": "கண்ணாடியில் விழும் கோணமும் பிரதிபலிக்கும் கோணமும் சமம். செங்கோணங்களுடன் சேர்த்து இது வடிவொத்த முக்கோணங்களைத் தருகிறது."
    },
    "c10-4-ex4-1-q3": {
      "step": 1,
      "expected": "At the same time",
      "en": "The sun's rays are effectively parallel, so the stick and tower make triangles with equal elevation angles. Corresponding height-to-shadow ratios match.",
      "ta": "சூரியக் கதிர்கள் ஏறத்தாழ இணையாக இருப்பதால் குச்சியும் கோபுரமும் சமமான உயரக் கோணங்களைக் கொண்ட முக்கோணங்களை உருவாக்குகின்றன. உயரம்–நிழல் விகிதங்கள் சமம்."
    },
    "c10-5-5-practice-20": {
      "step": 0,
      "expected": "Average the x coordinates",
      "en": "The midpoint lies halfway along the horizontal direction, so its first coordinate is the average of the endpoints' first coordinates.",
      "ta": "நடுப்புள்ளி கிடைமட்டத் திசையில் இரு முனைகளுக்கும் நடுவே இருக்கும். ஆகவே அதன் முதல் ஆயம் முனைகளின் முதல் ஆயங்களின் சராசரி.",
      "math": {
        "latex": "x_M=\\dfrac{x_1+x_2}{2}",
        "display": true,
        "fallback": "The midpoint lies halfway along the horizontal direction, so its first coordinate is the average of the endpoints' first coordinates."
      }
    },
    "c10-6-6-1-1": {
      "step": 1,
      "expected": "Combine the two fractions",
      "en": "The denominators differ. Multiply each fraction by the missing factor to give both the same denominator before adding.",
      "ta": "இரண்டு பின்னங்களின் பகுதிகள் வேறுபடுகின்றன. கூட்டுவதற்கு முன் இரண்டுக்கும் ஒரே பகுதியை உருவாக்க வேண்டும்."
    },
    "c10-6-6-1-2": {
      "step": 1,
      "expected": "Apply the Pythagorean",
      "en": "This identity is valid for angles where the trigonometric expressions are defined. It changes a sum of squares into a single squared function.",
      "ta": "முக்கோணவியல் கோவைகள் வரையறுக்கப்படும் கோணங்களில் இந்த முற்றொருமை பொருந்தும். இரண்டு வர்க்கங்களின் கூட்டலை ஓர் ஒற்றை வர்க்கச் சார்பாக மாற்றுகிறது."
    },
    "c10-6-6-1-3": {
      "step": 0,
      "expected": "Rationalise the denominator",
      "en": "Multiplying the numerator and denominator by the same nonzero expression does not change the fraction. The conjugate makes a difference of squares.",
      "ta": "தொகுதியையும் பகுதியையும் ஒரே பூஜ்ஜியமற்ற கோவையால் பெருக்கினால் பின்னத்தின் மதிப்பு மாறாது. இணைக் கோவை வர்க்கங்களின் வித்தியாசத்தை உருவாக்குகிறது."
    },
    "c10-6-6-2-4": {
      "step": 1,
      "expected": "Set up the tangent",
      "en": "Tangent compares the side opposite the angle with the adjacent side. Use those sides, not the hypotenuse.",
      "ta": "டேன்ஜென்ட் என்பது கோணத்திற்கு எதிர்ப்பக்கத்தையும் அடுத்த பக்கத்தையும் ஒப்பிடும் விகிதம். கர்ணத்தை இங்கு பயன்படுத்த வேண்டாம்."
    },
    "c10-6-6-2-5": {
      "step": 2,
      "expected": "Double the distance",
      "en": "The observer is in the middle. The single triangle reaches only one edge, so the whole width contains two equal halves.",
      "ta": "பார்வையாளர் நடுவில் உள்ளார். ஒரு முக்கோணம் சாலையின் ஒரு பாதியை மட்டுமே அளக்கும்; முழு அகலத்திற்கு இரு சமமான பாதிகள் வேண்டும்."
    },
    "c10-6-6-2-6": {
      "step": 2,
      "expected": "Subtract the two heights",
      "en": "Both rises are measured from the same eye-level baseline. Their difference is the vertical distance between the windows.",
      "ta": "இரண்டு உயரங்களும் ஒரே கண் மட்டத்திலிருந்து அளக்கப்படுகின்றன. அவற்றின் வித்தியாசம் சாளரங்களுக்கிடையிலான செங்குத்துத் தொலைவு."
    },
    "c10-6-ex6-1-q2-i": {
      "step": 2,
      "expected": "Divide by a fraction",
      "en": "Dividing by a fraction means multiplying by its reciprocal. Cancellation is valid only when the factor being cancelled is nonzero.",
      "ta": "ஒரு பின்னத்தால் வகுப்பது அதன் தலைகீழால் பெருக்குவதற்குச் சமம். நீக்கப்படும் காரணி பூஜ்ஜியமற்றதாக இருக்க வேண்டும்."
    },
    "c10-8-ex8-1-q1-i": {
      "step": 2,
      "expected": "Use the coefficient",
      "en": "Range gives the absolute difference. Dividing by the sum of the extreme values produces a relative measure, called the coefficient of range.",
      "ta": "வீச்சு மிகப் பெரிய, மிகச் சிறிய மதிப்புகளின் வித்தியாசம். அந்த வித்தியாசத்தை இரு மதிப்புகளின் கூட்டால் வகுப்பதே வீச்சுக் கெழு."
    },
    "c10-8-ex8-1-q2": {
      "step": 1,
      "expected": "Rearrange to isolate",
      "en": "Add the smallest observation to both sides. Doing the same operation on both sides preserves equality.",
      "ta": "சமன்பாட்டின் இரு பக்கங்களிலும் மிகச் சிறிய மதிப்பைக் கூட்டினால் சமம் மாறாது. அப்போது மிகப் பெரிய மதிப்பு மட்டும் கிடைக்கும்."
    },
    "c10-8-ex8-1-q4": {
      "step": 1,
      "expected": "Compute the mean",
      "en": "The mean is the total divided by the number of observations. Keep the original count, even when some values repeat.",
      "ta": "சராசரி என்பது மொத்தக் கூட்டுத்தொகையை தரவுகளின் எண்ணிக்கையால் வகுத்த மதிப்பு. சில மதிப்புகள் திரும்ப வந்தாலும் எண்ணிக்கை மாறாது.",
      "math": {
        "latex": "\\bar{x}=\\dfrac{\\sum x}{n}",
        "display": true,
        "fallback": "The mean is the total divided by the number of observations. Keep the original count, even when some values repeat."
      }
    },
    "c10-8-ex8-1-q5": {
      "step": 2,
      "expected": "Use the deviations",
      "en": "A deviation is each observation minus the mean. Values below the mean give negative deviations; values above it give positive ones.",
      "ta": "ஒரு தரவுக்கும் சராசரிக்கும் இடையிலான வித்தியாசமே விலக்கம். சராசரிக்குக் கீழுள்ளவை எதிர்மமாகவும் மேலுள்ளவை நேர்மமாகவும் அமையும்."
    },
    "c10-8-ex8-1-q6": {
      "step": 1,
      "expected": "The sum of the first",
      "en": "The pattern runs twice in one day, not once. Compute one 12-hour cycle first and then double it.",
      "ta": "ஒரே வரிசை ஒரு நாளில் இரண்டு முறை நிகழ்கிறது. முதலில் பன்னிரண்டு மணி நேரத்திற்கான கூட்டுத்தொகையைக் கண்டு இருமடங்காக்கவும்."
    },
    "c10-8-ex8-1-q8": {
      "step": 2,
      "expected": "Compare a new deviation",
      "en": "Subtracting the same constant from every value also shifts the mean by that constant. The two shifts cancel in every deviation.",
      "ta": "ஒவ்வொரு தரவிலிருந்தும் ஒரே எண்ணைக் கழித்தால் சராசரியும் அதே அளவு குறையும். விலக்கத்தைக் காணும்போது இரு குறைப்புகளும் ஒன்றையொன்று நீக்கும்.",
      "math": {
        "latex": "(x-5)-(\\bar{x}-5)=x-\\bar{x}",
        "display": true,
        "fallback": "Subtracting the same constant from every value also shifts the mean by that constant. The two shifts cancel in every deviation."
      }
    },
    "c10-8-ex8-1-q11": {
      "step": 0,
      "expected": "Find the class midpoints",
      "en": "Each class contains an interval, not a single age. Its midpoint represents the interval when applying the grouped-data formula.",
      "ta": "ஒவ்வொரு வகுப்பும் ஓர் இடைவெளியாக உள்ளது. தொகுக்கப்பட்ட தரவுக்கான சூத்திரத்தில் அந்த இடைவெளியின் நடுமதிப்பைப் பிரதிநிதியாகப் பயன்படுத்துகிறோம்.",
      "math": {
        "latex": "x=\\dfrac{\\text{lower limit}+\\text{upper limit}}{2}",
        "display": true,
        "fallback": "Each class contains an interval, not a single age. Its midpoint represents the interval when applying the grouped-data formula."
      }
    },
    "c10-8-ex8-1-q12": {
      "step": 0,
      "expected": "Replace each diameter",
      "en": "Frequency tells us how many plates fall in each interval. The midpoint stands in for the interval in the grouped calculation.",
      "ta": "ஒவ்வோர் இடைவெளியிலும் எத்தனை தட்டுகள் உள்ளன என்பதை நிகழ்வெண் காட்டுகிறது. தொகுக்கப்பட்ட கணக்கில் அந்த வகுப்பின் நடுமதிப்பைப் பயன்படுத்துகிறோம்."
    },
    "c10-8-ex8-1-q14": {
      "step": 1,
      "expected": "Subtract the incorrect",
      "en": "The reported total already includes the two wrong entries. Remove those numbers first, then add their correct replacements; the number of students stays the same.",
      "ta": "பழைய மொத்தத்தில் தவறான இரு மதிப்புகள் ஏற்கெனவே உள்ளன. முதலில் அவற்றை நீக்கி சரியான மதிப்புகளைக் கூட்டவும்; மாணவர்களின் எண்ணிக்கை மாறாது."
    }
  }
});})();
