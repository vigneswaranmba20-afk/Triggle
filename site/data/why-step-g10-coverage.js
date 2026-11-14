/* Grade 10 comprehensive bridge coverage: audited against the authored steps at the source revision.
 * Every `expected` phrase is frozen from a specific question and step;
 * runtime refuses to show a stale hint after source changes.
 * Tamil pedagogical wording is provisional pending editorial review.
 * No textbook questions, full solutions or answers are overwritten.
 */
(()=>{'use strict';
const current=window.TriggleWhyStepG10;
if(!current?.hints)throw Error('Load original Class 10 why-step data first');
const additional={
  "c10-1-ex1-1-q1-i": {
    "step": 1,
    "expected": "For A × A, pair every member of A with every member of ",
    "en": "A Cartesian square pairs each element of a set with every element of that same set. Choose the first coordinate from the row and the second from the column; self-pairs are included.",
    "ta": "ஒரே கணத்தின் ஒவ்வோர் உறுப்பையும் அதே கணத்தின் எல்லா உறுப்புகளுடனும் சோடியாக்க வேண்டும். முதல் ஆயத்தை வரிசையிலிருந்தும் இரண்டாம் ஆயத்தை நெடுவரிசையிலிருந்தும் எடுக்கவும்; ஒரே உறுப்பு இரு இடங்களிலும் வரலாம்.",
    "diagram": {
      "type": "grid",
      "rows": [
        "2",
        "−2",
        "3"
      ],
      "cols": [
        "2",
        "−2",
        "3"
      ]
    }
  },
  "c10-1-ex1-1-q1-ii": {
    "step": 1,
    "expected": "List the ordered pairs, taking p and then q as the firs",
    "en": "A Cartesian square pairs each element of a set with every element of that same set. Choose the first coordinate from the row and the second from the column; self-pairs are included.",
    "ta": "ஒரே கணத்தின் ஒவ்வோர் உறுப்பையும் அதே கணத்தின் எல்லா உறுப்புகளுடனும் சோடியாக்க வேண்டும். முதல் ஆயத்தை வரிசையிலிருந்தும் இரண்டாம் ஆயத்தை நெடுவரிசையிலிருந்தும் எடுக்கவும்; ஒரே உறுப்பு இரு இடங்களிலும் வரலாம்.",
    "diagram": {
      "type": "grid",
      "rows": [
        "p",
        "q"
      ],
      "cols": [
        "p",
        "q"
      ]
    }
  },
  "c10-1-ex1-1-q3": {
    "step": 0,
    "expected": "In B × A, every first coordinate belongs to B.",
    "en": "The first coordinate identifies which set supplies the first entry. Repeated coordinates tell us which values belong to that set, but a set lists each only once.",
    "ta": "முதல் ஆயம் எந்த கணத்திலிருந்து முதல் உறுப்பு வரவேண்டும் என்பதைக் காட்டும். மீளும் மதிப்புகளைக் கணத்தில் ஒருமுறை மட்டும் எழுத வேண்டும்."
  },
  "c10-1-ex1-1-q4": [
    {
      "step": 0,
      "expected": "First find the Cartesian square of A.",
      "en": "Since A={5,6}, first pair 5 with both 5 and 6, then pair 6 with both 5 and 6. Reading the four cells gives the entire Cartesian square A×A.",
      "ta": "A={5,6} என்பதால் முதலில் 5-ஐ 5 மற்றும் 6 உடனும், பின்னர் 6-ஐ 5 மற்றும் 6 உடனும் சோடியாக்கவும். அட்டவணையின் நான்கு கட்டங்களும் A×A-இன் எல்லாச் சோடிகளும் ஆகும்.",
      "diagram": {
        "type": "grid",
        "rows": [
          "5",
          "6"
        ],
        "cols": [
          "5",
          "6"
        ]
      }
    },
    {
      "step": 1,
      "expected": "The common first and second coordinates of B and C are ",
      "en": "An ordered pair belongs to both Cartesian squares only if its first and second coordinates belong to both source sets. That means both must come from their intersection.",
      "ta": "இரு கார்டீசியன் வர்க்கங்களிலும் ஒரு சோடி இருக்க வேண்டுமெனில் அதன் இரு ஆயங்களும் இரண்டு கணங்களிலும் இருக்க வேண்டும்; அதாவது வெட்டுக் கணத்திலிருந்து வரவேண்டும்.",
      "diagram": {
        "type": "venn",
        "left": "B",
        "right": "C",
        "onlyLeft": [
          "4"
        ],
        "both": [
          "5",
          "6"
        ],
        "onlyRight": [
          "7"
        ]
      }
    }
  ],
  "c10-1-ex1-1-q5": {
    "step": 2,
    "expected": "On the right, keep only pairs that occur in both A × B ",
    "en": "For an ordered pair to be in both products, the coordinate chosen from the overlapping sets must be common to both. Thus the intersection survives on both sides.",
    "ta": "இரு பெருக்கல்களிலும் ஒரே சோடி இடம்பெற, அந்த ஆயம் இரு கணங்களுக்கும் பொதுவானதாக இருக்க வேண்டும். ஆகவே வெட்டுக் கணம் இருபக்கமும் பொருந்துகிறது."
  },
  "c10-1-ex1-1-q6-i": {
    "step": 1,
    "expected": "Unite B and C; then multiply by A.",
    "en": "An ordered pair using an element of a union is allowed when its chosen coordinate comes from either set. This is exactly why distributing the Cartesian product over a union works.",
    "ta": "ஒன்றியக் கணத்தில் இருந்து ஆயத்தைத் தேர்வது இரு கணங்களில் ஏதேனும் ஒன்றிலிருந்து தேர்வதற்குச் சமம். அதனால் கார்டீசியன் பெருக்கல் ஒன்றியத்தின் மீது பகிரப்படுகிறது."
  },
  "c10-1-ex1-1-q6-ii": {
    "step": 3,
    "expected": "Intersect A × B and A × C: the common ordered pairs are",
    "en": "For an ordered pair to be in both products, the coordinate chosen from the overlapping sets must be common to both. Thus the intersection survives on both sides.",
    "ta": "இரு பெருக்கல்களிலும் ஒரே சோடி இடம்பெற, அந்த ஆயம் இரு கணங்களுக்கும் பொதுவானதாக இருக்க வேண்டும். ஆகவே வெட்டுக் கணம் இருபக்கமும் பொருந்துகிறது."
  },
  "c10-1-ex1-1-q6-iii": {
    "step": 1,
    "expected": "Multiply this union by C to obtain the left-hand side.",
    "en": "An ordered pair using an element of a union is allowed when its chosen coordinate comes from either set. This is exactly why distributing the Cartesian product over a union works.",
    "ta": "ஒன்றியக் கணத்தில் இருந்து ஆயத்தைத் தேர்வது இரு கணங்களில் ஏதேனும் ஒன்றிலிருந்து தேர்வதற்குச் சமம். அதனால் கார்டீசியன் பெருக்கல் ஒன்றியத்தின் மீது பகிரப்படுகிறது."
  },
  "c10-1-ex1-1-q7-i": {
    "step": 3,
    "expected": "The pairs present in both A × C and B × C are exactly t",
    "en": "For an ordered pair to be in both products, the coordinate chosen from the overlapping sets must be common to both. Thus the intersection survives on both sides.",
    "ta": "இரு பெருக்கல்களிலும் ஒரே சோடி இடம்பெற, அந்த ஆயம் இரு கணங்களுக்கும் பொதுவானதாக இருக்க வேண்டும். ஆகவே வெட்டுக் கணம் இருபக்கமும் பொருந்துகிறது."
  },
  "c10-1-ex1-1-q7-ii": {
    "step": 3,
    "expected": "Remove those seven pairs from A × B; the 21 remaining p",
    "en": "Subtracting sets removes only the excluded members. After taking the product, remove the ordered pairs that use those excluded members in that position.",
    "ta": "கணங்களின் வேறுபாட்டில் நீக்கப்பட்ட உறுப்புகளையே விலக்க வேண்டும். பெருக்கலுக்குப் பின் அந்த இடத்தில் நீக்கப்பட்ட உறுப்பைக் கொண்ட சோடிகளை அகற்றவும்."
  },
  "c10-1-1-2-q5": {
    "step": 0,
    "expected": "The first coordinate is salary and the second coordinat",
    "en": "A relation is a set of ordered pairs. Read each pair in the direction stated in the question; reversing salary and employee would describe a different relation.",
    "ta": "ஒரு உறவு வரிசைச் சோடிகளின் கணம். வினாவில் கூறிய ஆய வரிசையையே பின்பற்ற வேண்டும்; ஊதியம், ஊழியர் ஆகியவற்றை மாற்றினால் வேறு உறவு அமையும்."
  },
  "c10-1-1-3-q1": {
    "step": 3,
    "expected": "Every natural x produces exactly one value 2x.",
    "en": "A function can send two different inputs to the same output, but each single input must have only one output. That is the rule to check.",
    "ta": "ஒரு சார்பு இரண்டு வேறு உள்ளீடுகளை ஒரே வெளியீட்டுக்கு அனுப்பலாம். ஆனால் ஒரு உள்ளீட்டுக்கு ஒரே ஒரு வெளியீடுதான் இருக்க வேண்டும்.",
    "diagram": {
      "type": "mapping",
      "pairs": [
        [
          "1",
          "2"
        ],
        [
          "2",
          "4"
        ],
        [
          "3",
          "6"
        ]
      ]
    }
  },
  "c10-1-1-3-q2": {
    "step": 2,
    "expected": "Each input has one natural-number output, so the relati",
    "en": "A function can send two different inputs to the same output, but each single input must have only one output. That is the rule to check.",
    "ta": "ஒரு சார்பு இரண்டு வேறு உள்ளீடுகளை ஒரே வெளியீட்டுக்கு அனுப்பலாம். ஆனால் ஒரு உள்ளீட்டுக்கு ஒரே ஒரு வெளியீடுதான் இருக்க வேண்டும்."
  },
  "c10-1-1-3-q3": {
    "step": 0,
    "expected": "Start from the given formula and substitute the chosen ",
    "en": "The symbol f(x) is a rule, not a number attached to f. Replace every occurrence of its input variable with the given expression before simplifying.",
    "ta": "f(x) என்பது ஒரு விதி. உள்ளீடாகத் தரப்பட்ட கோவையை அந்த விதியில் வரும் ஒவ்வொரு x-க்கும் பதிலிட வேண்டும்; அதன் பிறகே எளிமைப்படுத்தவும்."
  },
  "c10-1-1-3-q4": {
    "step": 1,
    "expected": "On the first straight segment, x=2 lies halfway between",
    "en": "The x-coordinate tells where to look horizontally; the y-coordinate is the corresponding graph height. For values between two points on a straight segment, follow that segment.",
    "ta": "x-ஆயம் கிடைமட்ட இடத்தையும் y-ஆயம் அங்குள்ள வரைபட உயரத்தையும் காட்டும். நேர்கோட்டுத் துண்டிலுள்ள இடைமதிப்பை அதே கோட்டில் படிக்கவும்."
  },
  "c10-1-1-3-q5": {
    "step": 2,
    "expected": "Simplify the difference quotient, using x≠0.",
    "en": "Compute the two function values first, then subtract. A factor in the numerator may cancel against the denominator only when the denominator is not zero.",
    "ta": "முதலில் இரு சார்பு மதிப்புகளையும் காண்க; பிறகு கழிக்கவும். பகுதியில் உள்ள காரணி பூஜ்ஜியமில்லாதபோதுதான் தொகுதியிலுள்ள அதே காரணியை நீக்கலாம்."
  },
  "c10-1-1-3-q6": {
    "step": 3,
    "expected": "For (iv), evaluate f(1−x), then equate the two outputs.",
    "en": "The symbol f(x) is a rule, not a number attached to f. Replace every occurrence of its input variable with the given expression before simplifying.",
    "ta": "f(x) என்பது ஒரு விதி. உள்ளீடாகத் தரப்பட்ட கோவையை அந்த விதியில் வரும் ஒவ்வொரு x-க்கும் பதிலிட வேண்டும்; அதன் பிறகே எளிமைப்படுத்தவும்."
  },
  "c10-1-1-3-q7": {
    "step": 1,
    "expected": "Cutting x from both ends reduces each base dimension by",
    "en": "A corner square of side x is cut away at both ends of each side. That removes 2x from the base length while the folded-up height is x.",
    "ta": "ஒவ்வொரு பக்கத்தின் இரண்டு முனைகளிலும் x நீளமுள்ள பகுதி வெட்டப்படுகிறது. ஆகவே அடியின் நீளம் 2x குறையும்; மடக்கிய பெட்டியின் உயரம் x ஆகும்."
  },
  "c10-1-1-3-q8": {
    "step": 2,
    "expected": "Equate both expressions and factor.",
    "en": "When a product of real factors equals zero, at least one factor must be zero. That is why factoring a quadratic reveals candidate roots.",
    "ta": "மெய்யெண் காரணிகளின் பெருக்கல் பூஜ்ஜியமானால் அவற்றில் குறைந்தது ஒரு காரணி பூஜ்ஜியம் ஆகவேண்டும். அதனால்தான் காரணிப்படுத்தல் வேர்களைக் காட்டுகிறது."
  },
  "c10-1-1-3-q9": {
    "step": 0,
    "expected": "Use distance=speed×time for constant speed.",
    "en": "At constant speed, distance increases in direct proportion to elapsed time. Multiplying speed (km per hour) by time (hours) leaves distance in kilometres.",
    "ta": "மாறாத வேகத்தில் பயணித்த தூரம் நேரத்திற்கு நேர் விகிதமாக அதிகரிக்கும். கி.மீ/மணி வேகத்தை மணிநேரத்தால் பெருக்கினால் தூரம் கி.மீ-யில் கிடைக்கும்."
  },
  "c10-1-1-3-q10": {
    "step": 1,
    "expected": "The slope a is the change in height divided by the chan",
    "en": "The slope tells how much the output changes when the input increases by one unit. Use the same straight-line rule with one known pair to find the intercept.",
    "ta": "உள்ளீடு ஒரு அலகு கூடும்போது வெளியீடு எவ்வளவு மாறுகிறது என்பதே சாய்வு. ஒரு தெரிந்த சோடியைப் பயன்படுத்தி நிலையான உறுப்பைக் காணலாம்."
  },
  "c10-1-1-4-q1": {
    "step": 0,
    "expected": "Apply the vertical-line test: any vertical line may mee",
    "en": "A vertical line fixes one x-value. If it hits the graph twice, that same input has two outputs, so the graph cannot represent a function.",
    "ta": "செங்குத்துக் கோடு ஒரே x மதிப்பைச் சுட்டுகிறது. அது வரைபடத்தை இரண்டு இடங்களில் வெட்டினால் ஒரே உள்ளீட்டுக்கு இரண்டு வெளியீடுகள்; அது சார்பு அல்ல."
  },
  "c10-1-1-4-q2": {
    "step": 2,
    "expected": "For the arrow diagram, connect each first coordinate to",
    "en": "Every left-side input must have one outgoing arrow. Multiple arrows may meet at one output; that is still a function, although not one-to-one.",
    "ta": "இடப்பக்கத்தின் ஒவ்வோர் உள்ளீட்டிலிருந்தும் ஒரு அம்புதான் செல்ல வேண்டும். பல அம்புகள் ஒரே வெளியீட்டில் சேரலாம்; அப்போதும் அது சார்புதான்."
  },
  "c10-1-1-4-q3": {
    "step": 0,
    "expected": "Each ordered pair (x,y) defines an arrow x→y.",
    "en": "Every left-side input must have one outgoing arrow. Multiple arrows may meet at one output; that is still a function, although not one-to-one.",
    "ta": "இடப்பக்கத்தின் ஒவ்வோர் உள்ளீட்டிலிருந்தும் ஒரு அம்புதான் செல்ல வேண்டும். பல அம்புகள் ஒரே வெளியீட்டில் சேரலாம்; அப்போதும் அது சார்புதான்.",
    "diagram": {
      "type": "mapping",
      "pairs": [
        [
          "1",
          "2"
        ],
        [
          "2",
          "2"
        ],
        [
          "3",
          "2"
        ],
        [
          "4",
          "3"
        ],
        [
          "5",
          "4"
        ]
      ]
    }
  },
  "c10-1-1-4-q4": {
    "step": 2,
    "expected": "The outputs are odd positive numbers; the even natural ",
    "en": "Onto means every member of the co-domain is reached. Finding even one allowed output that no input produces proves a function is not onto.",
    "ta": "முழுச் சார்பில் இணைச்சார்பகத்தின் ஒவ்வோர் உறுப்பும் அடையப்பட வேண்டும். எந்த உள்ளீட்டாலும் கிடைக்காத ஒரு மதிப்பே இருந்தாலும் அது முழுச் சார்பு அல்ல."
  },
  "c10-1-1-4-q5": {
    "step": 2,
    "expected": "Since m,n∈ℕ, m+n+1>0; therefore the only possibility is",
    "en": "To prove one-to-one, start with two outputs assumed equal and show their inputs must be equal. If distinct inputs share an output, the claim fails.",
    "ta": "ஒரு–ஒரு சார்பை நிரூபிக்க இரண்டு வெளியீடுகள் சமம் என வைத்து, உள்ளீடுகளும் சமம் எனக் காட்ட வேண்டும். வேறு உள்ளீடுகளுக்கு ஒரே வெளியீடு வந்தால் அது தோல்வி."
  },
  "c10-1-1-4-q6": {
    "step": 2,
    "expected": "The four outputs are all distinct, so f is one-one; B h",
    "en": "To prove one-to-one, start with two outputs assumed equal and show their inputs must be equal. If distinct inputs share an output, the claim fails.",
    "ta": "ஒரு–ஒரு சார்பை நிரூபிக்க இரண்டு வெளியீடுகள் சமம் என வைத்து, உள்ளீடுகளும் சமம் எனக் காட்ட வேண்டும். வேறு உள்ளீடுகளுக்கு ஒரே வெளியீடு வந்தால் அது தோல்வி."
  },
  "c10-1-1-4-q7": {
    "step": 2,
    "expected": "For (ii), opposite inputs have the same square and same",
    "en": "Odd powers keep the sign of a real input; even powers remove it. That is why opposite inputs can agree under an even power but not an odd power.",
    "ta": "ஒற்றைப்படை அடுக்குகள் உள்ளீட்டின் குறியைப் பாதுகாக்கும்; இரட்டைப்படை அடுக்குகள் அதை நீக்கும். அதனால் எதிரெண் உள்ளீடுகள் இரட்டைப்படையில் சமமாகலாம்."
  },
  "c10-1-1-4-q8": {
    "step": 0,
    "expected": "To be onto, the two distinct inputs −1 and 1 must give ",
    "en": "Onto means every member of the co-domain is reached. Finding even one allowed output that no input produces proves a function is not onto.",
    "ta": "முழுச் சார்பில் இணைச்சார்பகத்தின் ஒவ்வோர் உறுப்பும் அடையப்பட வேண்டும். எந்த உள்ளீட்டாலும் கிடைக்காத ஒரு மதிப்பே இருந்தாலும் அது முழுச் சார்பு அல்ல."
  },
  "c10-1-1-4-q9": {
    "step": 1,
    "expected": "For (ii), 0 lies between −1 and 1 inclusive.",
    "en": "Choose the rule by checking which interval contains the input. Notice strict signs < and > versus inclusive signs ≤ and ≥ at the boundaries.",
    "ta": "உள்ளீடு எந்த இடைவெளிக்குள் வருகிறது என்பதைப் பார்த்து அதற்குரிய விதியைத் தேர்வு செய்க. எல்லைகளில் <, > மற்றும் ≤, ≥ குறிகளின் வேறுபாட்டைக் கவனிக்கவும்."
  },
  "c10-1-1-4-q10": {
    "step": 1,
    "expected": "Use the second branch for 2≤x<6: evaluate 2 and 4.",
    "en": "Choose the rule by checking which interval contains the input. Notice strict signs < and > versus inclusive signs ≤ and ≥ at the boundaries.",
    "ta": "உள்ளீடு எந்த இடைவெளிக்குள் வருகிறது என்பதைப் பார்த்து அதற்குரிய விதியைத் தேர்வு செய்க. எல்லைகளில் <, > மற்றும் ≤, ≥ குறிகளின் வேறுபாட்டைக் கவனிக்கவும்."
  },
  "c10-1-1-4-q11": {
    "step": 1,
    "expected": "For t₂>t₁≥0, factor the difference of function values.",
    "en": "Compare the outputs at two times rather than relying on a sketch. If the difference is always positive for a later time, the function is increasing.",
    "ta": "வரைபடத்தை மட்டும் நம்பாமல் இரு நேரங்களில் வரும் வெளியீடுகளை ஒப்பிடவும். பின்னைய நேரத்தின் மதிப்பு எப்போதும் அதிகமானால் சார்பு ஏறுமுகமாக இருக்கும்."
  },
  "c10-1-1-4-q12": {
    "step": 2,
    "expected": "For boiling-water value, solve (9/5)C+32=212.",
    "en": "The conversion rule has two parts: scaling by 9/5 and shifting by 32. To find an unknown Celsius input, undo the shift before dividing by the scale.",
    "ta": "வெப்பநிலை மாற்றத்தில் முதலில் 9/5-ஆல் பெருக்கி, பிறகு 32-ஐக் கூட்டுகிறோம். செல்சியஸ் மதிப்பைத் திரும்பக் காண முதலில் 32-ஐக் கழிக்கவும்."
  },
  "c10-1-1-5-q1": {
    "step": 0,
    "expected": "Remember that (f∘g)(x)=f(g(x)) and (g∘f)(x)=g(f(x)); do",
    "en": "Function composition is read from right to left: the inner function acts first. Its output becomes the input to the next function.",
    "ta": "சார்புகளின் சேர்ப்பில் வலப்பக்க உள்ள்சார்பு முதலில் செயல்படும். அதன் வெளியீடு அடுத்த சார்பின் உள்ளீடாகும்.",
    "diagram": {
      "type": "flow",
      "nodes": [
        "Input x",
        "g(x)",
        "f(g(x))"
      ]
    }
  },
  "c10-1-1-5-q2": {
    "step": 1,
    "expected": "Equate constant terms and solve for k.",
    "en": "For two linear expressions to be equal for every x, their x-coefficients and constant terms must agree. This turns the condition into an equation for the parameter.",
    "ta": "இரு நேரியல் கோவைகளும் எல்லா x-க்கும் சமமாக இருக்க, x-இன் கெழுக்களும் நிலையான உறுப்புகளும் சமமாக வேண்டும். இதிலிருந்து அளபுருவின் மதிப்பைக் காணலாம்."
  },
  "c10-1-1-5-q3": {
    "step": 2,
    "expected": "Both compositions simplify to the identity function.",
    "en": "If applying one function then the other returns the original input, the two functions undo each other on that domain.",
    "ta": "ஒரு சார்பிற்குப் பின் மற்றொன்றைப் பயன்படுத்தி ஆரம்ப உள்ளீடே மீண்டும் கிடைத்தால், அந்தச் சார்புகள் அந்த வரம்பில் ஒன்றையொன்று நீக்குகின்றன."
  },
  "c10-1-1-5-q4": {
    "step": 2,
    "expected": "Take both square roots.",
    "en": "If a square equals a positive value, both the positive and negative square roots may solve the equation. Check both in the original condition.",
    "ta": "ஒரு வர்க்கம் நேர்ம மதிப்பாக இருந்தால் அதன் நேர்ம மற்றும் எதிர்ம வர்க்கமூலங்கள் இரண்டும் விடையாகலாம். இரண்டையும் முதற் சமன்பாட்டில் சரிபார்க்கவும்."
  },
  "c10-1-1-5-q5": {
    "step": 4,
    "expected": "Composition only applies where the inner function’s out",
    "en": "A composition is defined only when the output of the inside function is an allowed input for the outside function. Check this before substituting.",
    "ta": "உள்ள்சார்பின் வெளியீடு வெளிச்சார்பின் அனுமதிக்கப்பட்ட உள்ளீடாக இருந்தால்தான் சேர்ப்புச் சார்பு வரையறுக்கப்படும். பதிலிடும்முன் இதைப் பார்க்கவும்."
  },
  "c10-1-1-5-q6": {
    "step": 0,
    "expected": "Apply f to f(x) rather than multiplying f by itself.",
    "en": "The notation f∘f means apply f twice, using the first output as the next input. It is not ordinary multiplication or squaring of the symbol f.",
    "ta": "f∘f என்பது f-ஐ இருமுறை பயன்படுத்துதல். முதல் வெளியீட்டை அடுத்த உள்ளீடாகப் பயன்படுத்த வேண்டும்; இது சாதாரண பெருக்கல் அல்ல.",
    "diagram": {
      "type": "flow",
      "nodes": [
        "x",
        "f(x)",
        "f(f(x))"
      ]
    }
  },
  "c10-1-1-5-q7": {
    "step": 1,
    "expected": "The fourth power gives the same output to opposite nonz",
    "en": "Odd powers keep the sign of a real input; even powers remove it. That is why opposite inputs can agree under an even power but not an odd power.",
    "ta": "ஒற்றைப்படை அடுக்குகள் உள்ளீட்டின் குறியைப் பாதுகாக்கும்; இரட்டைப்படை அடுக்குகள் அதை நீக்கும். அதனால் எதிரெண் உள்ளீடுகள் இரட்டைப்படையில் சமமாகலாம்."
  },
  "c10-1-1-5-q8": {
    "step": 0,
    "expected": "Associativity means apply h first, g second and f last ",
    "en": "Changing parentheses does not change the order in which h, g and f are applied. The rightmost function still acts first.",
    "ta": "அடைப்புக்குறிகளின் இடத்தை மாற்றினாலும் h, g, f செயல்படும் வரிசை மாறாது. வலப்பக்க சார்பே முதலில் செயல்படும்.",
    "diagram": {
      "type": "flow",
      "nodes": [
        "h(x)",
        "g(h(x))",
        "f(g(h(x)))"
      ]
    }
  },
  "c10-1-1-5-q9": {
    "step": 0,
    "expected": "Let the linear rule have the form mx+c.",
    "en": "A linear function has the form mx+c. The output at x=0 gives c, while the change between two known points gives m.",
    "ta": "ஒரு நேரியல் சார்பு mx+c என்ற வடிவில் இருக்கும். x=0 இல் வரும் வெளியீடு c; இரு சோடிகளின் மாற்ற விகிதம் m."
  },
  "c10-1-1-5-q10": {
    "step": 0,
    "expected": "Evaluate the circuit at a linear combination of inputs.",
    "en": "Linearity means the rule preserves addition and scalar multiplication together. Expand the combined input to compare it with the combination of separate outputs.",
    "ta": "நேரியல்தன்மையில் கூட்டலும் மாறிலிப் பெருக்கலும் பாதுகாக்கப்படுகின்றன. இணைந்த உள்ளீட்டைப் பிரித்து தனித்தனி வெளியீடுகளுடன் ஒப்பிடவும்."
  },
  "c10-1-1-6-q1": {
    "step": 0,
    "expected": "The size of a Cartesian product equals the product of s",
    "en": "For each first-coordinate choice there are as many second-coordinate choices as the second set has. Multiplying the two counts avoids listing every pair.",
    "ta": "முதல் ஆயத்திற்கான ஒவ்வொரு தேர்வுக்கும் இரண்டாவது கணத்தின் எல்லா உறுப்புகளும் தேர்வாகும். அதனால் இரண்டு உறுப்பெண்ணிக்கைகளையும் பெருக்குகிறோம்."
  },
  "c10-1-1-6-q2": {
    "step": 0,
    "expected": "Count distinct members in A∪C; p occurs in both sets.",
    "en": "A union counts an element once even if it appears in both sets. Count unique members before calculating any Cartesian product size.",
    "ta": "ஒரு உறுப்பு இரு கணங்களிலும் இருந்தாலும் ஒன்றியத்தில் ஒருமுறை மட்டுமே எண்ண வேண்டும். தனித்த உறுப்புகளை எண்ணிய பிறகே கார்டீசியன் பெருக்கலைக் காணவும்."
  },
  "c10-1-1-6-q3": {
    "step": 1,
    "expected": "The Cartesian product preserves these component inclusi",
    "en": "If the first component set is contained in another first set, and likewise for the second component, every pair in the smaller product is also in the larger.",
    "ta": "முதல் கணம் மற்றொரு முதல் கணத்திற்குள்ளும் இரண்டாம் கணம் மற்றொரு இரண்டாம் கணத்திற்குள்ளும் இருந்தால், சிறிய பெருக்கலின் எல்லாச் சோடிகளும் பெரிய பெருக்கலில் இருக்கும்."
  },
  "c10-1-1-6-q4": {
    "step": 0,
    "expected": "Each relation is a subset of A×B, so the number of rela",
    "en": "A relation can include or exclude each pair in the Cartesian product independently. Each pair therefore offers two choices, producing a power of two.",
    "ta": "கார்டீசியன் பெருக்கலின் ஒவ்வொரு சோடியையும் உறவில் சேர்க்கலாம் அல்லது விடலாம். ஒவ்வொரு சோடிக்கும் இரு தேர்வுகள் இருப்பதால் இரண்டின் அடுக்கு கிடைக்கும்."
  },
  "c10-1-1-6-q5": {
    "step": 1,
    "expected": "Square each prime to obtain its image.",
    "en": "The range contains output values, not the prime inputs. List primes smaller than 13 first, then square each to build the set of outputs.",
    "ta": "வீச்சகத்தில் பகா எண் உள்ளீடுகள் அல்ல, அவற்றின் வெளியீடுகள் இடம்பெறும். முதலில் 13-ஐவிடச் சிறிய பகா எண்களைக் கண்டு ஒவ்வொன்றையும் வர்க்கப்படுத்தவும்."
  },
  "c10-1-1-6-q6": {
    "step": 0,
    "expected": "Equal pairs have equal first coordinates.",
    "en": "Two ordered pairs are equal only when their first coordinates match and their second coordinates match separately.",
    "ta": "இரு வரிசைச் சோடிகள் சமமாக இருக்க முதல் ஆயங்கள் ஒன்றுக்கொன்று சமமாகவும் இரண்டாம் ஆயங்களும் சமமாகவும் இருக்க வேண்டும்."
  },
  "c10-1-1-6-q7": {
    "step": 1,
    "expected": "Each subset gives a relation; exclude the empty subset.",
    "en": "A relation can include or exclude each pair in the Cartesian product independently. Each pair therefore offers two choices, producing a power of two.",
    "ta": "கார்டீசியன் பெருக்கலின் ஒவ்வொரு சோடியையும் உறவில் சேர்க்கலாம் அல்லது விடலாம். ஒவ்வொரு சோடிக்கும் இரு தேர்வுகள் இருப்பதால் இரண்டின் அடுக்கு கிடைக்கும்."
  },
  "c10-1-1-6-q8": {
    "step": 0,
    "expected": "For an identity function every ordered pair has equal c",
    "en": "An identity function sends every input to itself. So in every ordered pair its first and second coordinates must be the same.",
    "ta": "அடையாளச் சார்பு ஒவ்வோர் உள்ளீட்டையும் அதே மதிப்புக்கே அனுப்பும். ஆகவே ஒவ்வொரு வரிசைச் சோடியிலும் இரு ஆயங்களும் சமம்."
  },
  "c10-1-1-6-q9": {
    "step": 1,
    "expected": "This is injective (and onto B); choose the best matchin",
    "en": "A bijection is one-to-one and onto simultaneously. Every input and every output has exactly one partner, so finite sets must have matching sizes.",
    "ta": "இருவழிச் சார்பு ஒரே நேரத்தில் ஒரு–ஒரு சார்பும் முழுச் சார்பும் ஆகும். ஒவ்வோர் உள்ளீட்டுக்கும் வெளியீட்டுக்கும் ஒரே துணை இருப்பதால் முடிவுறு கணங்களின் எண்ணிக்கைகள் சமம்."
  },
  "c10-1-1-6-q10": {
    "step": 0,
    "expected": "Substitute g(x) into f.",
    "en": "Function composition is read from right to left: the inner function acts first. Its output becomes the input to the next function.",
    "ta": "சார்புகளின் சேர்ப்பில் வலப்பக்க உள்ள்சார்பு முதலில் செயல்படும். அதன் வெளியீடு அடுத்த சார்பின் உள்ளீடாகும்."
  },
  "c10-1-1-6-q11": {
    "step": 0,
    "expected": "A bijection pairs each element of A with exactly one di",
    "en": "A bijection is one-to-one and onto simultaneously. Every input and every output has exactly one partner, so finite sets must have matching sizes.",
    "ta": "இருவழிச் சார்பு ஒரே நேரத்தில் ஒரு–ஒரு சார்பும் முழுச் சார்பும் ஆகும். ஒவ்வோர் உள்ளீட்டுக்கும் வெளியீட்டுக்கும் ஒரே துணை இருப்பதால் முடிவுறு கணங்களின் எண்ணிக்கைகள் சமம்."
  },
  "c10-1-1-6-q12": {
    "step": 1,
    "expected": "Feed those values to f.",
    "en": "Function composition is read from right to left: the inner function acts first. Its output becomes the input to the next function.",
    "ta": "சார்புகளின் சேர்ப்பில் வலப்பக்க உள்ள்சார்பு முதலில் செயல்படும். அதன் வெளியீடு அடுத்த சார்பின் உள்ளீடாகும்."
  },
  "c10-1-1-6-q13": {
    "step": 0,
    "expected": "Expand the product for real x,y.",
    "en": "Compare squares of these nonnegative radical expressions. Expanding the product reveals an extra sum of squares, which cannot be negative.",
    "ta": "எதிர்மமற்ற வர்க்கமூலக் கோவைகளை வர்க்கமிட்டு ஒப்பிடலாம். பெருக்கலை விரித்தால் எதிர்மமாக முடியாத கூடுதல் வர்க்கங்களின் கூட்டல் தெரியும்."
  },
  "c10-1-1-6-q14": {
    "step": 0,
    "expected": "Use the first two points to find slope α.",
    "en": "The slope tells how much the output changes when the input increases by one unit. Use the same straight-line rule with one known pair to find the intercept.",
    "ta": "உள்ளீடு ஒரு அலகு கூடும்போது வெளியீடு எவ்வளவு மாறுகிறது என்பதே சாய்வு. ஒரு தெரிந்த சோடியைப் பயன்படுத்தி நிலையான உறுப்பைக் காணலாம்."
  },
  "c10-1-1-6-q15": {
    "step": 1,
    "expected": "Subtract and cancel cubic and linear terms.",
    "en": "A polynomial's degree is determined after like terms cancel, not before expanding. Highest powers can disappear during subtraction.",
    "ta": "பல்லுறுப்பின் படி விரித்து ஒத்த உறுப்புகளை நீக்கிய பின்னரே தீர்மானிக்கப்படுகிறது. கழித்தலில் உயர்ந்த அடுக்கு உறுப்புகள் மறையலாம்."
  },
  "c10-1-1-unit-q1": {
    "step": 0,
    "expected": "Equate the first coordinates and rearrange.",
    "en": "Two ordered pairs are equal only when their first coordinates match and their second coordinates match separately.",
    "ta": "இரு வரிசைச் சோடிகள் சமமாக இருக்க முதல் ஆயங்கள் ஒன்றுக்கொன்று சமமாகவும் இரண்டாம் ஆயங்களும் சமமாகவும் இருக்க வேண்டும்."
  },
  "c10-1-1-unit-q2": {
    "step": 1,
    "expected": "Both coordinates from both given pairs must belong to A",
    "en": "If A×A contains a pair, both its coordinates must be in A. Collect all coordinates from the supplied pairs, then use the product size to check no element is missing.",
    "ta": "A×A இல் ஒரு சோடி இருந்தால் அதன் இரு ஆயங்களும் A இல் இருக்க வேண்டும். கொடுத்த சோடிகளின் எல்லா ஆயங்களையும் சேகரித்து உறுப்பெண்ணிக்கையால் சரிபார்க்கவும்.",
    "diagram": {
      "type": "grid",
      "rows": [
        "−1",
        "0",
        "1"
      ],
      "cols": [
        "−1",
        "0",
        "1"
      ]
    }
  },
  "c10-1-1-unit-q3": {
    "step": 2,
    "expected": "Because a≥0, a+1≥1 so use the first branch.",
    "en": "Choose the rule by checking which interval contains the input. Notice strict signs < and > versus inclusive signs ≤ and ≥ at the boundaries.",
    "ta": "உள்ளீடு எந்த இடைவெளிக்குள் வருகிறது என்பதைப் பார்த்து அதற்குரிய விதியைத் தேர்வு செய்க. எல்லைகளில் <, > மற்றும் ≤, ≥ குறிகளின் வேறுபாட்டைக் கவனிக்கவும்."
  },
  "c10-1-1-unit-q4": {
    "step": 1,
    "expected": "For primes 11, 13 and 17, the highest prime factor is t",
    "en": "A prime factor is a prime that divides the number. Factor composites first; a prime number's greatest prime factor is the number itself.",
    "ta": "பகா காரணி என்பது எண்ணை வகுக்கும் பகா எண். பகு எண்களைக் காரணிப்படுத்தவும்; ஒரு பகா எண்ணின் மிகப் பெரிய பகா காரணி அதுவே."
  },
  "c10-1-1-unit-q5": {
    "step": 0,
    "expected": "The innermost square root must have a nonnegative radic",
    "en": "For real square roots the quantity inside every radical must be at least zero. Begin with the innermost restriction before checking outer radicals.",
    "ta": "மெய்யெண் வர்க்கமூலத்திற்குள் உள்ள கோவை பூஜ்ஜியமோ நேர்மமோ ஆகவேண்டும். முதலில் உள்ளேயுள்ள மூலத்தின் கட்டுப்பாட்டைச் சரிபார்த்து பிறகு வெளியேயுள்ளவற்றைப் பார்க்கவும்."
  },
  "c10-1-1-unit-q6": {
    "step": 2,
    "expected": "Compose g with h first, then apply f.",
    "en": "Changing parentheses does not change the order in which h, g and f are applied. The rightmost function still acts first.",
    "ta": "அடைப்புக்குறிகளின் இடத்தை மாற்றினாலும் h, g, f செயல்படும் வரிசை மாறாது. வலப்பக்க சார்பே முதலில் செயல்படும்."
  },
  "c10-1-1-unit-q7": {
    "step": 2,
    "expected": "Every one of these pairs also belongs to B×D, so the su",
    "en": "If the first component set is contained in another first set, and likewise for the second component, every pair in the smaller product is also in the larger.",
    "ta": "முதல் கணம் மற்றொரு முதல் கணத்திற்குள்ளும் இரண்டாம் கணம் மற்றொரு இரண்டாம் கணத்திற்குள்ளும் இருந்தால், சிறிய பெருக்கலின் எல்லாச் சோடிகளும் பெரிய பெருக்கலில் இருக்கும்."
  },
  "c10-1-1-unit-q8": {
    "step": 3,
    "expected": "Divide and cancel the common factor, requiring x≠−1,0.",
    "en": "A fraction is undefined when its denominator is zero. Exclude precisely those inputs rather than excluding every negative number.",
    "ta": "பகுதி பூஜ்ஜியமானால் பின்னம் வரையறுக்கப்படாது. அந்த உள்ளீடுகளை மட்டும் விலக்க வேண்டும்; எல்லா எதிர்ம எண்களையும் அல்ல."
  },
  "c10-1-1-unit-q9": {
    "step": 1,
    "expected": "Apply g a second time.",
    "en": "The notation f∘f means apply f twice, using the first output as the next input. It is not ordinary multiplication or squaring of the symbol f.",
    "ta": "f∘f என்பது f-ஐ இருமுறை பயன்படுத்துதல். முதல் வெளியீட்டை அடுத்த உள்ளீடாகப் பயன்படுத்த வேண்டும்; இது சாதாரண பெருக்கல் அல்ல."
  },
  "c10-1-1-unit-q10": {
    "step": 0,
    "expected": "For (i), the denominator must not be zero.",
    "en": "A fraction is undefined when its denominator is zero. Exclude precisely those inputs rather than excluding every negative number.",
    "ta": "பகுதி பூஜ்ஜியமானால் பின்னம் வரையறுக்கப்படாது. அந்த உள்ளீடுகளை மட்டும் விலக்க வேண்டும்; எல்லா எதிர்ம எண்களையும் அல்ல."
  },
  "c10-2-2-practice-19": {
    "step": 1,
    "expected": "Use aₙ=a+(n−1)d.",
    "en": "An arithmetic sequence changes by the same difference each time. The nth term starts at a and adds that difference n−1 times.",
    "ta": "கூட்டுத் தொடரில் ஒவ்வொரு முறையும் ஒரே வேறுபாடு சேரும். n-ஆவது உறுப்பிற்கு முதல் உறுப்புடன் பொதுவேறுபாட்டை n−1 முறை கூட்ட வேண்டும்."
  },
  "c10-2-ex2-1-q5": {
    "step": 2,
    "expected": "If n is odd, expand its square and separate a multiple ",
    "en": "Every integer is even or odd. Squaring 2k gives a multiple of four, while squaring 2k+1 gives a multiple of four plus one.",
    "ta": "ஒவ்வொரு முழு எண்ணும் இரட்டை அல்லது ஒற்றை. 2k-இன் வர்க்கம் நான்கின் மடங்கு; 2k+1-இன் வர்க்கம் நான்கின் மடங்கைவிட ஒன்று கூடுதலாகும்."
  },
  "c10-2-ex2-1-q6": {
    "step": 0,
    "expected": "In each pair, repeatedly divide the larger number by th",
    "en": "A divisor common to two numbers also divides their remainder after subtraction. Replacing the larger number by its remainder therefore preserves the HCF.",
    "ta": "இரு எண்களுக்கும் பொதுவான வகுத்தி அவற்றின் மீதியையும் வகுக்கும். பெரிய எண்ணை மீதியால் மாற்றினாலும் மீ.பொ.வ. மாறாது."
  },
  "c10-2-ex2-1-q7": {
    "step": 0,
    "expected": "If a number divides each original number leaving remain",
    "en": "Subtracting the common remainder turns each number into an exact multiple of the unknown divisor. Their HCF gives the largest candidate.",
    "ta": "பொதுவான மீதியைக் கழித்தால் ஒவ்வொரு எண்ணும் தேடப்படும் வகுத்தியால் முழுதாக வகுபடும். அவற்றின் மீ.பொ.வ. மிகப் பெரிய வாய்ப்பாகும்."
  },
  "c10-2-ex2-1-q8": {
    "step": 1,
    "expected": "Work backwards to express the remainder 4 in terms of 3",
    "en": "Euclid's algorithm first finds the HCF. Work backwards, replacing each remainder by the subtraction that produced it, to express the HCF with the original numbers.",
    "ta": "யூக்ளிடின் முறையில் முதலில் மீ.பொ.வ. கிடைக்கும். பின்னோக்கிச் செல்லும்போது ஒவ்வொரு மீதியையும் அதனை உருவாக்கிய கழித்தலால் மாற்றி ஆரம்ப எண்களால் எழுதலாம்."
  },
  "c10-2-ex2-1-q9": {
    "step": 1,
    "expected": "Both 88 and the largest multiple of 11 below 61 can be ",
    "en": "A multiple of the new divisor contributes no remainder. Rewrite the old divisor and remainder in terms of the new divisor, then keep only the smaller leftover.",
    "ta": "புதிய வகுப்பியின் மடங்கு மீதியில் பங்கு பெறாது. பழைய வகுப்பியையும் மீதியையும் புதிய வகுப்பியின் மடங்குகளாக எழுதி, சிறிய மீதியை மட்டும் எடுத்துக் கொள்ளவும்."
  },
  "c10-2-ex2-1-q10": {
    "step": 1,
    "expected": "A common divisor divides the difference of the two numb",
    "en": "Any common divisor of two consecutive numbers must divide their difference, which is one. The only possible positive common divisor is therefore one.",
    "ta": "அடுத்தடுத்த இரு எண்களின் எந்தப் பொதுவகுத்தியும் அவற்றின் வித்தியாசமான ஒன்றை வகுக்க வேண்டும். ஆகவே நேர்ம பொதுவகுத்தி ஒன்று மட்டுமே."
  },
  "c10-2-ex2-2-q4": {
    "step": 2,
    "expected": "By unique prime factorisation, compare the exponents wi",
    "en": "The fundamental theorem of arithmetic says prime factorisation is unique apart from ordering. Once each prime power is found, its exponent is fixed.",
    "ta": "எண்கணிதத்தின் அடிப்படைத் தேற்றப்படி பகாக்காரணிப் பகுப்பு வரிசையைத் தவிர தனித்துவமானது. ஒவ்வொரு பகா அடுக்கும் கண்ட பிறகு அதன் அடுக்கு நிலையானது."
  },
  "c10-2-ex2-2-q5": {
    "step": 2,
    "expected": "Combine like prime factors.",
    "en": "The fundamental theorem of arithmetic says prime factorisation is unique apart from ordering. Once each prime power is found, its exponent is fixed.",
    "ta": "எண்கணிதத்தின் அடிப்படைத் தேற்றப்படி பகாக்காரணிப் பகுப்பு வரிசையைத் தவிர தனித்துவமானது. ஒவ்வொரு பகா அடுக்கும் கண்ட பிறகு அதன் அடுக்கு நிலையானது."
  },
  "c10-2-ex2-2-q6": {
    "step": 1,
    "expected": "For HCF, take only shared primes with their smaller exp",
    "en": "The HCF keeps the smaller exponent of primes common to both numbers. The LCM keeps the larger exponent of every prime appearing in either number.",
    "ta": "மீ.பொ.வ. பொதுவான பகாக்களின் சிறிய அடுக்குகளை எடுக்கும். மீ.சி.ம. இரு எண்களிலுள்ள ஒவ்வொரு பகாவின் பெரிய அடுக்கையும் எடுக்கும்."
  },
  "c10-2-ex2-2-q7": {
    "step": 2,
    "expected": "The greatest six-digit number is 999999. Divide it by 3",
    "en": "A number divisible by several integers must be a multiple of their LCM. Use the greatest allowed limit and go down to its nearest whole multiple.",
    "ta": "பல எண்களாலும் வகுபடும் எண் அவற்றின் மீ.சி.ம.-இன் மடங்காக இருக்க வேண்டும். அனுமதிக்கப்பட்ட அதிகபட்ச எல்லைக்குக் கீழுள்ள பெரிய முழு மடங்கைத் தேர்வு செய்க."
  },
  "c10-2-ex2-2-q9": {
    "step": 1,
    "expected": "Choose the highest powers of primes needed by numbers f",
    "en": "The HCF keeps the smaller exponent of primes common to both numbers. The LCM keeps the larger exponent of every prime appearing in either number.",
    "ta": "மீ.பொ.வ. பொதுவான பகாக்களின் சிறிய அடுக்குகளை எடுக்கும். மீ.சி.ம. இரு எண்களிலுள்ள ஒவ்வொரு பகாவின் பெரிய அடுக்கையும் எடுக்கும்."
  },
  "c10-3-3-practice-18": {
    "step": 2,
    "expected": "Set each factor to zero.",
    "en": "When a product of real factors equals zero, at least one factor must be zero. That is why factoring a quadratic reveals candidate roots.",
    "ta": "மெய்யெண் காரணிகளின் பெருக்கல் பூஜ்ஜியமானால் அவற்றில் குறைந்தது ஒரு காரணி பூஜ்ஜியம் ஆகவேண்டும். அதனால்தான் காரணிப்படுத்தல் வேர்களைக் காட்டுகிறது."
  },
  "c10-6-6-3-7": {
    "step": 0,
    "expected": "Depression equals the car’s angle of elevation.",
    "en": "An angle of depression is measured downward from a horizontal line. Because the two horizontal lines are parallel, it equals the elevation angle at the lower point.",
    "ta": "இறக்கக் கோணம் கிடைமட்டக் கோட்டிலிருந்து கீழ்நோக்கி அளக்கப்படுகிறது. இரு கிடைமட்டக் கோடுகளும் இணையாக இருப்பதால் அது கீழுள்ள புள்ளியின் ஏற்றக் கோணத்திற்குச் சமம்.",
    "diagram": {
      "type": "triangle",
      "base": "Horizontal distance",
      "height": "50√3 m",
      "angle": "30°"
    }
  },
  "c10-6-6-3-8": {
    "step": 0,
    "expected": "The angle of depression gives the angle for the height ",
    "en": "The right triangle formed by a downward sightline measures the difference between the two heights, not the full height of either building.",
    "ta": "கீழ்நோக்கிய பார்வைக் கோட்டால் உருவாகும் செங்கோண முக்கோணம் இரு உயரங்களின் வித்தியாசத்தைக் காட்டுகிறது; எந்தக் கட்டிடத்தின் முழு உயரத்தையும் அல்ல.",
    "diagram": {
      "type": "triangle",
      "base": "70 m",
      "height": "Height difference",
      "angle": "45°"
    }
  },
  "c10-6-6-3-9": {
    "step": 2,
    "expected": "Subtract because the boats are on the same side.",
    "en": "When two objects lie in the same direction from the observer, their separation equals the farther horizontal distance minus the nearer one.",
    "ta": "இரண்டு பொருட்களும் பார்வையாளரின் ஒரே திசையில் இருந்தால் அவற்றின் இடைவெளி தொலைவில் உள்ள தூரத்திலிருந்து அருகில் உள்ள தூரத்தைக் கழித்ததாகும்."
  },
  "c10-6-6-4-10": {
    "step": 2,
    "expected": "Add the first tree’s 13 m height.",
    "en": "One triangle finds the rise above eye or deck level; the original elevation above the ground must be added to obtain the total height.",
    "ta": "ஒரு முக்கோணம் கண் அல்லது தள மட்டத்திற்கு மேலுள்ள உயரத்தைத் தருகிறது. மொத்த உயரம் பெற தரையிலிருந்து உள்ள ஆரம்ப உயரத்தைக் கூட்ட வேண்டும்."
  },
  "c10-6-6-4-11": {
    "step": 2,
    "expected": "Add the deck’s height above sea level.",
    "en": "One triangle finds the rise above eye or deck level; the original elevation above the ground must be added to obtain the total height.",
    "ta": "ஒரு முக்கோணம் கண் அல்லது தள மட்டத்திற்கு மேலுள்ள உயரத்தைத் தருகிறது. மொத்த உயரம் பெற தரையிலிருந்து உள்ள ஆரம்ப உயரத்தைக் கூட்ட வேண்டும்."
  },
  "c10-6-6-4-12": {
    "step": 0,
    "expected": "Use the apartment’s height to calculate horizontal dist",
    "en": "An angle of depression is measured downward from a horizontal line. Because the two horizontal lines are parallel, it equals the elevation angle at the lower point.",
    "ta": "இறக்கக் கோணம் கிடைமட்டக் கோட்டிலிருந்து கீழ்நோக்கி அளக்கப்படுகிறது. இரு கிடைமட்டக் கோடுகளும் இணையாக இருப்பதால் அது கீழுள்ள புள்ளியின் ஏற்றக் கோணத்திற்குச் சமம்.",
    "diagram": {
      "type": "triangle",
      "base": "Horizontal distance",
      "height": "50 m",
      "angle": "30°"
    }
  },
  "c10-6-6-5-13": {
    "step": 0,
    "expected": "Recall 1 + tan²θ = sec²θ.",
    "en": "Replace the expression with a standard identity only where all involved functions are defined. The substitution changes form, not value.",
    "ta": "சம்பந்தப்பட்ட முக்கோணவியல் சார்புகள் வரையறுக்கப்படும் இடங்களில் மட்டுமே முற்றொருமையைப் பயன்படுத்த வேண்டும். வடிவம் மாறும்; மதிப்பு மாறாது."
  },
  "c10-6-6-5-14": {
    "step": 0,
    "expected": "Take tan θ as a common factor.",
    "en": "Replace the expression with a standard identity only where all involved functions are defined. The substitution changes form, not value.",
    "ta": "சம்பந்தப்பட்ட முக்கோணவியல் சார்புகள் வரையறுக்கப்படும் இடங்களில் மட்டுமே முற்றொருமையைப் பயன்படுத்த வேண்டும். வடிவம் மாறும்; மதிப்பு மாறாது."
  },
  "c10-6-6-5-15": {
    "step": 1,
    "expected": "The tangent ratio is one wherever it is defined.",
    "en": "Replace the expression with a standard identity only where all involved functions are defined. The substitution changes form, not value.",
    "ta": "சம்பந்தப்பட்ட முக்கோணவியல் சார்புகள் வரையறுக்கப்படும் இடங்களில் மட்டுமே முற்றொருமையைப் பயன்படுத்த வேண்டும். வடிவம் மாறும்; மதிப்பு மாறாது."
  },
  "c10-6-6-5-16": {
    "step": 2,
    "expected": "Subtract using sec²θ − tan²θ = 1.",
    "en": "Use the two given equations to replace trigonometric ratios with algebraic ratios. A Pythagorean identity then removes the angle completely.",
    "ta": "கொடுக்கப்பட்ட இரு சமன்பாடுகளால் முக்கோணவியல் விகிதங்களை இயற்கணித விகிதங்களாக மாற்றவும். ஒரு முற்றொருமையால் கோணத்தை முழுதாக நீக்கலாம்."
  },
  "c10-6-6-unit-17": {
    "step": 1,
    "expected": "Use sin²θ + cos²θ = 1.",
    "en": "Replace the expression with a standard identity only where all involved functions are defined. The substitution changes form, not value.",
    "ta": "சம்பந்தப்பட்ட முக்கோணவியல் சார்புகள் வரையறுக்கப்படும் இடங்களில் மட்டுமே முற்றொருமையைப் பயன்படுத்த வேண்டும். வடிவம் மாறும்; மதிப்பு மாறாது."
  },
  "c10-8-ex8-1-q1-ii": {
    "step": 2,
    "expected": "Calculate the coefficient of range.",
    "en": "The range is the difference between the greatest and least observations. Its coefficient divides that difference by their sum, giving a relative measure.",
    "ta": "வீச்சு என்பது மிகப் பெரிய, மிகச் சிறிய தரவுகளின் வித்தியாசம். வீச்சுக் கெழு அந்த வித்தியாசத்தை இரு மதிப்புகளின் கூட்டால் வகுத்துக் காணப்படுகிறது."
  },
  "c10-8-ex8-1-q3": {
    "step": 0,
    "expected": "For grouped continuous data, take the beginning of the ",
    "en": "A grouped interval describes values between its boundaries. For the range, compare the lowest and highest boundaries; the frequencies do not alter those extremes.",
    "ta": "தொகுக்கப்பட்ட வகுப்பில் இரு எல்லைகளுக்கிடையிலான மதிப்புகள் உள்ளன. வீச்சுக்கு மிகக் குறைந்த, மிக அதிக எல்லைகளை ஒப்பிடவும்; நிகழ்வெண்கள் எல்லைகளை மாற்றாது."
  },
  "c10-8-ex8-1-q7": {
    "step": 3,
    "expected": "Use the population variance formula.",
    "en": "Variance averages the squared distances from the mean. Squaring prevents positive and negative deviations from cancelling each other.",
    "ta": "மாறுபாடு சராசரியிலிருந்து உள்ள விலக்கங்களின் வர்க்கங்களின் சராசரியாகும். வர்க்கமிடுவதால் நேர்ம, எதிர்ம விலக்கங்கள் ஒன்றையொன்று நீக்காது."
  },
  "c10-8-ex8-1-q9": {
    "step": 1,
    "expected": "Standard deviation scales by the absolute value of the ",
    "en": "Dividing all values by three also divides every deviation by three. Standard deviation scales by three; variance scales by the square, nine.",
    "ta": "எல்லா மதிப்புகளையும் மூன்றால் வகுத்தால் ஒவ்வொரு விலக்கமும் மூன்றால் வகுக்கப்படும். திட்டவிலக்கம் மூன்றாலும் மாறுபாடு ஒன்பதாலும் வகுக்கப்படும்."
  },
  "c10-8-ex8-1-q10": {
    "step": 2,
    "expected": "Multiply rainfall by frequency and add to obtain the we",
    "en": "A frequency tells how many times one value occurs. Multiplying value by frequency counts every occurrence without writing it repeatedly.",
    "ta": "நிகழ்வெண் ஒரு மதிப்பு எத்தனை முறை வருகிறது என்பதைக் காட்டும். மதிப்பை நிகழ்வெண்ணால் பெருக்கினால் எல்லா நிகழ்வுகளும் மீண்டும் எழுதாமல் கணக்கில் சேரும்."
  },
  "c10-8-ex8-1-q13": {
    "step": 0,
    "expected": "For each time interval use its midpoint in seconds; ret",
    "en": "For grouped data, use the middle of each interval as a representative value. Its midpoint is the average of the two interval limits.",
    "ta": "தொகுக்கப்பட்ட தரவின் ஒவ்வொரு இடைவெளிக்கும் நடுமதிப்பைப் பிரதிநிதியாகப் பயன்படுத்துகிறோம். அது இரு எல்லைகளின் சராசரியாகும்.",
    "diagram": {
      "type": "interval",
      "start": "8.5",
      "mid": "9",
      "end": "9.5",
      "unit": "seconds"
    }
  },
  "c10-8-ex8-1-q15": {
    "step": 4,
    "expected": "Use (a + b)² = a² + b² + 2ab to find the product.",
    "en": "The given mean fixes the sum of the two missing observations; the variance fixes their sum of squares. Together these determine their product and a quadratic with those roots.",
    "ta": "கொடுக்கப்பட்ட சராசரி காணாத இரு மதிப்புகளின் கூட்டலைத் தரும்; மாறுபாடு அவற்றின் வர்க்கங்களின் கூட்டலைத் தரும். இவற்றிலிருந்து பெருக்கலும் வேர்களைக் கொண்ட இருபடிச் சமன்பாடும் கிடைக்கும்."
  }
};
for(const [id,entry] of Object.entries(additional)){
  if(current.hints[id]){
    if(id!=='c10-1-ex1-1-q4')throw Error('Duplicate Grade 10 bridge: '+id);
    current.hints[id]=[].concat(current.hints[id],entry);
  }else current.hints[id]=entry;
}
})();
