/* VER Triggle | Grade 10 Chapter 5 | Coordinate Geometry — Textbook-Order Interactive Concept Studio.
 * Original learning explanations, interactive coordinate-plane experiments, visual proofs, and transfer checks.
 * Grounded in Tamil Nadu Standard Ten Mathematics, revised 2025, Chapter 5 (pp. 203–238 EN / pp. 210–246 TA).
 * Tamil copy is an initial authored draft using 2025 textbook terminology; independent Tamil editorial review pending.
 * No network, tracking, account, autoplay, or worked-example clutter. */
(()=>{'use strict';
window.TRIGGLE_G10_CH5_PATH={
  "chapterId": "g10-ch5",
  "source": "Tamil Nadu Standard Ten Mathematics, revised 2025, Ch 5 pp. 203–238 (EN) & pp. 210–246 (TA)",
  "tamilStatus": "draft, editorial review pending",
  "stages": [
    {
      "id": "g10-ch5-distance-midpoint-centroid",
      "section": "5.1",
      "page": { "en": "203–204", "ta": "210–211" },
      "title": {
        "en": "Distance, section, midpoint & centroid recall",
        "ta": "தொலைவு, பிரிவு, நடுப்புள்ளி மற்றும் நடுக்கோட்டு மையம்"
      },
      "firstGlance": {
        "en": "Every coordinate formula measures gaps or weighted averages along the x-axis and y-axis independently before combining them.",
        "ta": "ஆயத்தொலை வடிவியலின் அனைத்து சூத்திரங்களும் x-அச்சு மற்றும் y-அச்சு இடைவெளிகளைத் தனித்தனியாகக் கணக்கிட்டு இணைக்கின்றன."
      },
      "rule": {
        "en": "AB = √[(x₂−x₁)² + (y₂−y₁)²], Midpoint M = ((x₁+x₂)/2, (y₁+y₂)/2), Centroid G = ((x₁+x₂+x₃)/3, (y₁+y₂+y₃)/3)",
        "ta": "AB = √[(x₂−x₁)² + (y₂−y₁)²], நடுப்புள்ளி M = ((x₁+x₂)/2, (y₁+y₂)/2), நடுக்கோட்டு மையம் G = ((x₁+x₂+x₃)/3, (y₁+y₂+y₃)/3)"
      },
      "math": {
        "latex": "\\begin{aligned}AB&=\\sqrt{(x_2-x_1)^2+(y_2-y_1)^2}\\\\M&=\\left(\\dfrac{x_1+x_2}{2},\\;\\dfrac{y_1+y_2}{2}\\right)\\\\G&=\\left(\\dfrac{x_1+x_2+x_3}{3},\\;\\dfrac{y_1+y_2+y_3}{3}\\right)\\end{aligned}",
        "fallback": "AB = √[(x₂−x₁)² + (y₂−y₁)²], M = ((x₁+x₂)/2, (y₁+y₂)/2), G = ((x₁+x₂+x₃)/3, (y₁+y₂+y₃)/3)"
      },
      "glanceVisual": "distance-midpoint",
      "visual": { "kind": "ch5-lab", "id": "distance-midpoint" },
      "understand": {
        "intro": {
          "en": "Horizontal change Δx = x₂ − x₁ and vertical change Δy = y₂ − y₁ form the legs of a right triangle on the grid.",
          "ta": "கிடைமட்ட மாற்றம் (x₂ − x₁) மற்றும் செங்குத்து மாற்றம் (y₂ − y₁) ஆகியவை ஒரு செங்கோண முக்கோணத்தின் பக்கங்களாக அமைகின்றன."
        },
        "symbols": [
          {
            "symbol": { "latex": "AB=\\sqrt{\\Delta x^2+\\Delta y^2}", "fallback": "AB = √(Δx² + Δy²)" },
            "en": "The straight-line distance from A to B via Pythagoras on horizontal step Δx and vertical step Δy.",
            "ta": "பிதாகரஸ் தேற்றம் மூலம் கிடைக்கும் A மற்றும் B இடையேயான நேர்க்கோட்டுத் தொலைவு."
          },
          {
            "symbol": { "latex": "P=\\left(\\dfrac{mx_2+nx_1}{m+n},\\dfrac{my_2+ny_1}{m+n}\\right)", "fallback": "P = ((mx₂+nx₁)/(m+n), (my₂+ny₁)/(m+n))" },
            "en": "Section point dividing AB internally in ratio m : n. Notice m multiplies the far endpoint B and n multiplies A; setting m = n = 1 gives the midpoint M.",
            "ta": "AB-ஐ m : n விகிதத்தில் உட்புறமாகப் பிரிக்கும் புள்ளி P. m = n = 1 எனில் நடுப்புள்ளி M கிடைக்கும்."
          },
          {
            "symbol": { "latex": "G", "fallback": "G" },
            "en": "The centroid (balance point) of △ABC, found by averaging the three vertices and dividing the median from each vertex in the ratio 2 : 1.",
            "ta": "△ABC-இன் நடுக்கோட்டு மையம் G; இது மூன்று முனைகளின் சராசரி மற்றும் நடுக்கோட்டை 2 : 1 விகிதத்தில் பிரிக்கும் புள்ளியாகும்."
          }
        ],
        "watchOut": {
          "en": "Do not swap weights in the section formula! If point P is closer to A (ratio 1 : 3), then A gets the larger weight 3 and B gets 1.",
          "ta": "பிரிவுச் சூத்திரத்தில் எடைகளை மாற்றிப் போடாதீர்கள்: P புள்ளி A-க்கு அருகில் (1 : 3) இருந்தால், A-க்கு 3 என்ற பெரிய எடை செல்லும்."
        }
      },
      "proof": {
        "figure": "distance-midpoint",
        "steps": [
          {
            "title": { "en": "1. Build the right triangle for distance", "ta": "1. தொலைவுக்குச் செங்கோண முக்கோணம் அமைக்க" },
            "math": { "latex": "AB^2=(x_2-x_1)^2+(y_2-y_1)^2", "fallback": "AB² = (x₂−x₁)² + (y₂−y₁)²" },
            "reason": {
              "en": "Drawing horizontal and vertical grid segments from A(x₁, y₁) and B(x₂, y₂) creates a right angle at C(x₂, y₁), so Pythagoras gives AB directly.",
              "ta": "A மற்றும் B வழியே அச்சுகளுக்கு இணையான கோடுகள் வரைய C(x₂, y₁)-இல் செங்கோணம் உருவாகிறது; பிதாகரஸ் தேற்றப்படி AB கிடைக்கிறது."
            }
          },
          {
            "title": { "en": "2. Midpoint and 2 : 1 median yield centroid G", "ta": "2. நடுப்புள்ளியும் 2 : 1 விகிதமும் தரும் G" },
            "math": { "latex": "\\begin{aligned}D&=\\left(\\dfrac{x_2+x_3}{2},\\;\\dfrac{y_2+y_3}{2}\\right)\\\\G&=\\dfrac{2D+1A}{3}\\\\&=\\left(\\dfrac{x_1+x_2+x_3}{3},\\;\\dfrac{y_1+y_2+y_3}{3}\\right)\\end{aligned}", "fallback": "D = ((x₂+x₃)/2, (y₂+y₃)/2); G = (2D + A)/3 = ((x₁+x₂+x₃)/3, (y₁+y₂+y₃)/3)" },
            "reason": {
              "en": "Applying the 2 : 1 internal section formula between vertex A and opposite midpoint D cancels the factor 2 and leaves the clean average of all three vertices.",
              "ta": "உச்சி A மற்றும் எதிர் நடுப்புள்ளி D-ஐ 2 : 1 விகிதத்தில் பிரிக்க 2 நீங்கி மூன்று முனைகளின் சராசரி கிடைக்கிறது."
            }
          }
        ]
      },
      "question": {
        "en": "What is the centroid G of a triangle with vertices A(3, −1), B(−2, 7), and C(5, 3)?",
        "ta": "A(3, −1), B(−2, 7) மற்றும் C(5, 3) ஆகிய முனைகளைக் கொண்ட முக்கோணத்தின் நடுக்கோட்டு மையம் G என்ன?"
      },
      "questionMath": {
        "latex": "A(3,-1),\\;B(-2,7),\\;C(5,3)",
        "fallback": "A(3, −1), B(−2, 7), C(5, 3)"
      },
      "choices": [
        { "en": "(3, 4.5)", "ta": "(3, 4.5)" },
        { "en": "(2, 3)", "ta": "(2, 3)" },
        { "en": "(6, 9)", "ta": "(6, 9)" }
      ],
      "correct": 1,
      "hint": {
        "en": "Add the three x-coordinates together and divide by 3; do the same for the three y-coordinates.",
        "ta": "மூன்று x-ஆயத்தொலைவுகளையும் கூட்டி 3-ஆல் வகுக்கவும்; அதேபோல் y-ஆயத்தொலைவுகளுக்கும் செய்க."
      },
      "incorrectFeedback": [
        {
          "en": "(3, 4.5) divides the sum by 2 (as in a midpoint) instead of dividing by 3 for three vertices.",
          "ta": "(3, 4.5) என்பது நடுப்புள்ளி போல 2-ஆல் வகுத்ததால் வந்தது; மூன்று முனைகள் என்பதால் 3-ஆல் வகுக்க வேண்டும்."
        },
        null,
        {
          "en": "(6, 9) is the sum (3 − 2 + 5, −1 + 7 + 3) before dividing each coordinate by 3.",
          "ta": "(6, 9) என்பது மூன்று முனைகளின் கூடுதல் மட்டுமே; அதை இன்னும் 3-ஆல் வகுக்கவில்லை."
        }
      ],
      "why": {
        "en": "Averaging all three vertices gives x = (3 − 2 + 5)/3 = 6/3 = 2 and y = (−1 + 7 + 3)/3 = 9/3 = 3, so G = (2, 3).",
        "ta": "x = (3 − 2 + 5)/3 = 6/3 = 2 மற்றும் y = (−1 + 7 + 3)/3 = 9/3 = 3 என்பதால் நடுக்கோட்டு மையம் G = (2, 3)."
      },
      "whyMath": {
        "latex": "G=\\left(\\dfrac{3-2+5}{3},\\;\\dfrac{-1+7+3}{3}\\right)=(2,3)",
        "fallback": "G = ((3−2+5)/3, (−1+7+3)/3) = (2, 3)"
      },
      "explainAfterAttempt": true,
      "connect": {
        "en": "Practise finding a midpoint, then work backwards from three midpoints to find the triangle's vertices in Exercise 5.1 Q8.",
        "ta": "முதலில் நடுப்புள்ளியைக் காணப் பயிலுங்கள். பிறகு பயிற்சி 5.1 வினா 8-இல் கொடுத்துள்ள மூன்று நடுப்புள்ளிகளிலிருந்து முக்கோணத்தின் உச்சிகளைக் காணுங்கள்."
      },
      "practiceId": "c10-5-5-practice-20",
      "secondaryPracticeId": "c10-5-ex5-1-q8",
      "relatedExercise": "5.1"
    },
    {
      "id": "g10-ch5-area-triangle",
      "video": {"src": "https://pub-ed71b86e97a64b428086e292b26fb7a2.r2.dev/trace-videos/g10-ch5-area-triangle/7b0eac211cb97175a46f335ad339a3fb91c7649124fd4021143cbc08b68575ec.mp4", "language": "en", "durationSeconds": 109.6},
      "section": "5.2",
      "page": { "en": "205–207", "ta": "212–214" },
      "title": {
        "en": "Area of a triangle from coordinates",
        "ta": "ஆயத்தொலைவுகளால் அமையும் முக்கோணத்தின் பரப்பு"
      },
      "firstGlance": {
        "en": "You can find the exact area of any triangle directly from its three (x, y) pairs using two-column cross-products, without measuring a height.",
        "ta": "உயரத்தை அளக்காமலேயே முக்கோணத்தின் மூன்று புள்ளிகளின் (x, y) ஆயத்தொலைவுகளைக் குறுக்குப் பெருக்கல் செய்து நேரடியாகப் பரப்பளவைக் காணலாம்."
      },
      "rule": {
        "en": "Area = ½ |x₁(y₂−y₃) + x₂(y₃−y₁) + x₃(y₁−y₂)| = ½ |(x₁y₂ + x₂y₃ + x₃y₁) − (x₂y₁ + x₃y₂ + x₁y₃)|",
        "ta": "பரப்பு = ½ |x₁(y₂−y₃) + x₂(y₃−y₁) + x₃(y₁−y₂)| = ½ |(x₁y₂ + x₂y₃ + x₃y₁) − (x₂y₁ + x₃y₂ + x₁y₃)|"
      },
      "math": {
        "latex": "\\begin{aligned}\\text{Area}&=\\dfrac{1}{2}\\big|x_1(y_2-y_3)+x_2(y_3-y_1)\\\\&\\qquad+x_3(y_1-y_2)\\big|\\\\&=\\dfrac{1}{2}\\big|(x_1y_2+x_2y_3+x_3y_1)\\\\&\\qquad-(x_2y_1+x_3y_2+x_1y_3)\\big|\\end{aligned}",
        "fallback": "Area = ½ |x₁(y₂−y₃) + x₂(y₃−y₁) + x₃(y₁−y₂)|"
      },
      "glanceVisual": "area-triangle",
      "visual": { "kind": "ch5-lab", "id": "area-triangle" },
      "understand": {
        "intro": {
          "en": "Heron's formula with side lengths gets messy fast when sides contain square roots; the coordinate determinant skips radicals completely.",
          "ta": "வர்க்கமூலம் கொண்ட பக்க நீளங்களைக் கொண்டு ஹெரான் சூத்திரம் போடுவதை விட, ஆயத்தொலைவுக் குறுக்குப் பெருக்கல் முறை மிக எளிதானது."
        },
        "symbols": [
          {
            "symbol": { "latex": "|\\cdots|", "fallback": "|…|" },
            "en": "Absolute value bars guarantee positive area even if you list vertices clockwise. Listing vertices counter-clockwise makes the expression positive automatically.",
            "ta": "மட்டுக் குறியீடு (|…|) பரப்பளவு எப்போதும் மிகை எண்ணாக இருப்பதை உறுதி செய்கிறது; முனைகளை இடஞ்சுழி வரிசையில் எடுத்தால் இயல்பாகவே மிகை மதிப்பு வரும்."
          },
          {
            "symbol": { "latex": "x_1y_2+x_2y_3+x_3y_1", "fallback": "x₁y₂ + x₂y₃ + x₃y₁" },
            "en": "The downward diagonal products when you stack the coordinates x₁, x₂, x₃ and repeat x₁ at the end.",
            "ta": "ஆயத்தொலைவுகளை வரிசைப்படுத்தி முதல் புள்ளியை இறுதியில் மீண்டும் எழுதி கீழ்நோக்கிப் பெருக்கிக் கூட்டும் மதிப்பு."
          }
        ],
        "watchOut": {
          "en": "Do not forget to repeat the first vertex (x₁, y₁) as the fourth column in the array—stopping after three columns drops the closing edge CA!",
          "ta": "குறுக்குப் பெருக்கல் அட்டவணையில் முதல் புள்ளியை (x₁, y₁) கடைசியில் மீண்டும் எழுத மறக்காதீர்கள்—இல்லையெனில் CA பக்கத்தின் பங்கு விடுபடும்!"
        }
      },
      "proof": {
        "figure": "area-triangle",
        "steps": [
          {
            "title": { "en": "1. Drop perpendiculars to build three trapeziums", "ta": "1. X-அச்சுக்குச் செங்குத்துகள் வரைந்து மூன்று சரிவகங்கள் அமைக்க" },
            "math": { "latex": "\\begin{aligned}\\operatorname{Area}(\\triangle ABC)&=\\operatorname{Area}(ABQP)\\\\&\\quad+\\operatorname{Area}(APRC)\\\\&\\quad-\\operatorname{Area}(BQRC)\\end{aligned}", "fallback": "Area(△ABC) = Area(ABQP) + Area(APRC) − Area(BQRC)" },
            "reason": {
              "en": "Dropping feet Q, P, R onto the x-axis lets us cover △ABC with the two upper trapeziums and subtract the lower trapezium under side BC.",
              "ta": "B, A, C புள்ளிகளிலிருந்து x-அச்சுக்குச் செங்குத்துகள் வரைந்தால், மேல் இரு சரிவகங்களின் பரப்பளவிலிருந்து கீழ் சரிவகம் BQRC-ஐக் கழித்தால் △ABC பரப்பு கிடைக்கும்."
            }
          },
          {
            "title": { "en": "2. Substitute trapezium widths and expand", "ta": "2. சரிவக அளவுகளைப் பிரதியிட்டுச் சுருக்குக" },
            "math": { "latex": "\\begin{aligned}\\text{Area}&=\\dfrac{1}{2}(y_2+y_1)(x_1-x_2)\\\\&\\quad+\\dfrac{1}{2}(y_1+y_3)(x_3-x_1)\\\\&\\quad-\\dfrac{1}{2}(y_2+y_3)(x_3-x_2)\\\\&=\\dfrac{1}{2}\\big[x_1(y_2-y_3)\\\\&\\qquad+x_2(y_3-y_1)+x_3(y_1-y_2)\\big]\\end{aligned}", "fallback": "Expanding ½(y₂+y₁)(x₁−x₂)+½(y₁+y₃)(x₃−x₁)−½(y₂+y₃)(x₃−x₂) gives ½[x₁(y₂−y₃)+x₂(y₃−y₁)+x₃(y₁−y₂)]" },
            "reason": {
              "en": "Multiplying out and collecting terms around x₁, x₂, x₃ produces the exact cyclic determinant formula.",
              "ta": "பெருக்கி x₁, x₂, x₃ உறுப்புகளைத் தொகுத்தால் முக்கோணத்தின் பரப்பளவு சூத்திரம் கிடைக்கிறது."
            }
          }
        ]
      },
      "question": {
        "en": "Find the area of the triangle formed by vertices (1, −1), (−4, 6), and (−3, −5).",
        "ta": "(1, −1), (−4, 6) மற்றும் (−3, −5) ஆகிய முனைகளால் அமையும் முக்கோணத்தின் பரப்பு காண்க."
      },
      "questionMath": {
        "latex": "A(1,-1),\\;B(-4,6),\\;C(-3,-5)",
        "fallback": "A(1, −1), B(−4, 6), C(−3, −5)"
      },
      "choices": [
        { "en": "24 sq. units", "ta": "24 ச. அலகுகள்" },
        { "en": "48 sq. units", "ta": "48 ச. அலகுகள்" },
        { "en": "14 sq. units", "ta": "14 ச. அலகுகள்" }
      ],
      "correct": 0,
      "hint": {
        "en": "Compute downward products (6 + 20 + 3) and upward products (4 − 18 − 5), subtract, then halve.",
        "ta": "கீழ்நோக்குப் பெருக்கல் (6 + 20 + 3) மற்றும் மேல்நோக்குப் பெருக்கல் (4 − 18 − 5) ஆகியவற்றின் வித்தியாசத்தைப் பாதியாக்குங்கள்."
      },
      "incorrectFeedback": [
        null,
        {
          "en": "48 is double the area—you forgot to multiply by ½ at the front of the coordinate formula!",
          "ta": "48 என்பது ½-ஆல் பெருக்க மறந்ததால் வந்த இரட்டிப்பு மதிப்பு; முக்கோணப் பரப்பிற்கு ½-ஆல் பெருக்க வேண்டும்."
        },
        {
          "en": "14 comes from subtracting terms with a sign slip. Check (−4)×(−5) = +20 and (−3)×(−1) = +3 carefully.",
          "ta": "குறித் தவறால் 14 வந்துள்ளது. (−4)×(−5) = +20 மற்றும் (−3)×(−1) = +3 என்பதைச் சரிபார்க்கவும்."
        }
      ],
      "why": {
        "en": "Listing counter-clockwise A(1, −1), B(−4, 6), C(−3, −5): downward sum = 1(6) + (−4)(−5) + (−3)(−1) = 29; upward sum = (−4)(−1) + (−3)(6) + 1(−5) = −19. Area = ½ |29 − (−19)| = ½(48) = 24 sq. units.",
        "ta": "கீழ்நோக்குக் கூடுதல் = 6 + 20 + 3 = 29; மேல்நோக்குக் கூடுதல் = 4 − 18 − 5 = −19. பரப்பு = ½ |29 − (−19)| = ½(48) = 24 ச. அலகுகள்."
      },
      "whyMath": {
        "latex": "\\begin{aligned}\\text{Area}&=\\dfrac{1}{2}|(6+20+3)-(4-18-5)|\\\\&=\\dfrac{1}{2}|29-(-19)|=24\\text{ sq. units}\\end{aligned}",
        "fallback": "Area = ½ |29 − (−19)| = 24 sq. units"
      },
      "explainAfterAttempt": true,
      "connect": {
        "en": "In Exercise 5.1 (Q1–Q3, Q8, Q10), always plot a quick mental sketch first to pick counter-clockwise order so signs stay cleaner.",
        "ta": "பயிற்சி 5.1 (வினா 1–3, 8, 10) கணக்குகளில் புள்ளிகளை இடஞ்சுழியாக வரிசைப்படுத்தி எளிதாகப் பரப்பளவு காணலாம்."
      },
      "practiceId": "c10-5-ex5-1-q1-i",
      "relatedExercise": "5.1"
    },
    {
      "id": "g10-ch5-collinearity",
      "section": "5.2.1",
      "page": { "en": "206–207", "ta": "213–214" },
      "title": {
        "en": "Collinearity of three points",
        "ta": "மூன்று புள்ளிகள் ஒரே நேர்க்கோட்டில் அமைவதற்கான நிபந்தனை"
      },
      "firstGlance": {
        "en": "Three points lie on one straight line if and only if the triangle between them flattens completely to zero area.",
        "ta": "மூன்று புள்ளிகளால் உருவாக்கப்படும் முக்கோணத்தின் பரப்பளவு பூச்சியமாக இருந்தால், இருந்தால் மட்டுமே அவை ஒரே நேர்க்கோட்டில் அமையும்."
      },
      "rule": {
        "en": "A, B, C are collinear iff Area(△ABC) = 0, i.e., x₁y₂ + x₂y₃ + x₃y₁ = x₂y₁ + x₃y₂ + x₁y₃",
        "ta": "A, B, C ஒரே கோடமைந்தவை எனில் △ABC-இன் பரப்பு = 0; அதாவது x₁y₂ + x₂y₃ + x₃y₁ = x₂y₁ + x₃y₂ + x₁y₃"
      },
      "math": {
        "latex": "\\begin{aligned}&\\operatorname{Area}(\\triangle ABC)=0\\\\&\\iff x_1y_2+x_2y_3+x_3y_1\\\\&\\qquad=x_2y_1+x_3y_2+x_1y_3\\end{aligned}",
        "fallback": "Area(△ABC) = 0 iff x₁y₂ + x₂y₃ + x₃y₁ = x₂y₁ + x₃y₂ + x₁y₃"
      },
      "glanceVisual": "collinearity",
      "visual": { "kind": "ch5-lab", "id": "collinearity" },
      "understand": {
        "intro": {
          "en": "Think of pulling the middle vertex B closer and closer to segment AC—as B touches the line, the height drops to 0 and so does the area.",
          "ta": "நடுப்புள்ளி B-ஐ AC கோட்டிற்கு அருகே நகர்த்தும்போது உயரம் குறைந்து, கோட்டின் மீது வந்ததும் பரப்பளவு 0 ஆகிறது."
        },
        "symbols": [
          {
            "symbol": { "latex": "\\Delta=0", "fallback": "Δ = 0" },
            "en": "Zero enclosed area means no two-dimensional triangle exists; the three points share one straight path.",
            "ta": "மூடப்பட்ட பரப்பளவு 0 என்பதால் முக்கோணம் உருவாகாது; மூன்று புள்ளிகளும் ஒரே நேர்க்கோட்டில் உள்ளன."
          },
          {
            "symbol": { "latex": "m_{AB}=m_{BC}", "fallback": "m(AB) = m(BC)" },
            "en": "Alternative slope check (Section 5.4): sharing point B with equal slopes also guarantees collinearity, and works well when checking parallel-vertical alignment.",
            "ta": "சாய்வுச் சோதனை (பகுதி 5.4): AB மற்றும் BC ஆகியவற்றின் சாய்வு சமமாக இருந்தாலும் மூன்று புள்ளிகள் ஒரே நேர்க்கோட்டில் இருக்கும்."
          }
        ],
        "watchOut": {
          "en": "Two segments merely having equal length (AB = BC) does NOT make A, B, C collinear—any isosceles triangle has AB = BC with non-zero area!",
          "ta": "AB = BC என நீளங்கள் சமமாக இருந்தால் மட்டும் புள்ளிகள் ஒரே கோட்டில் அமையா; இருசமபக்க முக்கோணத்திலும் AB = BC ஆனால் பரப்பு 0 அல்ல!"
        }
      },
      "proof": {
        "figure": "collinearity",
        "steps": [
          {
            "title": { "en": "1. Base times altitude vanishes on a line", "ta": "1. நேர்க்கோட்டில் குத்துயரம் பூச்சியமாகும்" },
            "math": { "latex": "\\text{Area}=\\dfrac{1}{2}\\times AC\\times h=0\\iff h=0", "fallback": "Area = ½ × AC × h = 0 iff h = 0" },
            "reason": {
              "en": "For distinct points A and C, the perpendicular distance h from B to line AC is zero if and only if B lies on line AC.",
              "ta": "A மற்றும் C வெவ்வேறு புள்ளிகள் எனில், B-யிலிருந்து AC-க்கு உள்ள செங்குத்துத் தொலைவு h = 0 ஆகும்போது மட்டுமே B அந்த நேர்க்கோட்டில் அமையும்."
            }
          },
          {
            "title": { "en": "2. Cross-product balance equation", "ta": "2. குறுக்குப் பெருக்கல் சமன்பாடு" },
            "math": { "latex": "\\begin{aligned}&(x_1y_2+x_2y_3+x_3y_1)\\\\&\\quad-(x_2y_1+x_3y_2+x_1y_3)=0\\\\\\iff &\\;x_1y_2+x_2y_3+x_3y_1\\\\&=x_2y_1+x_3y_2+x_1y_3\\end{aligned}", "fallback": "½[(downward) − (upward)] = 0 iff downward = upward" },
            "reason": {
              "en": "Dividing away the factor ½ shows that collinearity occurs precisely when the downward and upward shoelace sums balance identically.",
              "ta": "½ என்ற காரணியை நீக்க, கீழ்நோக்குப் பெருக்கல் கூடுதலும் மேல்நோக்குப் பெருக்கல் கூடுதலும் சமமாக இருப்பதே நிபந்தனை எனப் புலனாகிறது."
            }
          }
        ]
      },
      "question": {
        "en": "For what value of a are the points (2, 3), (4, a), and (6, −3) collinear?",
        "ta": "(2, 3), (4, a) மற்றும் (6, −3) ஆகிய புள்ளிகள் ஒரே நேர்க்கோட்டில் அமைந்தால், a-இன் மதிப்பு என்ன?"
      },
      "questionMath": {
        "latex": "(2,3),\\;(4,a),\\;(6,-3)\\text{ collinear}\\implies a=\\;?",
        "fallback": "(2, 3), (4, a), (6, −3) collinear gives a = ?"
      },
      "choices": [
        { "en": "a = 1", "ta": "a = 1" },
        { "en": "a = −1", "ta": "a = −1" },
        { "en": "a = 0", "ta": "a = 0" }
      ],
      "correct": 2,
      "hint": {
        "en": "Notice x = 4 sits halfway between x = 2 and x = 6, so y = a must sit halfway between 3 and −3 (or set Area = 0).",
        "ta": "x = 4 என்பது 2 மற்றும் 6-இன் நடுவில் உள்ளது; எனவே y = a என்பது 3 மற்றும் −3-இன் நடுவில் இருக்கும் (அல்லது பரப்பு = 0)."
      },
      "incorrectFeedback": [
        {
          "en": "With a = 1, the area becomes ½|2(4) + 4(−6) + 6(3−1)| = 2 ≠ 0, so the middle point sits above the line.",
          "ta": "a = 1 எனில் பரப்பு = 2 ≠ 0; புள்ளி கோட்டிற்கு மேலே அமைகிறது."
        },
        {
          "en": "With a = −1, the y-drop from x = 2 to x = 4 is −4, while from x = 4 to x = 6 it would be −2—those slopes do not match.",
          "ta": "a = −1 எனில் முதல் பகுதிச் சாய்வு −2, இரண்டாவது பகுதிச் சாய்வு −1; சமமாக இல்லை."
        },
        null
      ],
      "why": {
        "en": "Setting Area = 0 gives ½ |2(a − (−3)) + 4(−3 − 3) + 6(3 − a)| = ½ |2a + 6 − 24 + 18 − 6a| = ½ |−4a| = 0, so a = 0.",
        "ta": "பரப்பு = 0 எனப் பிரதியிட ½ |2a + 6 − 24 + 18 − 6a| = ½ |−4a| = 0; எனவே a = 0."
      },
      "whyMath": {
        "latex": "2(a+3)+4(-6)+6(3-a)=0\\implies -4a=0\\implies a=0",
        "fallback": "2(a+3) + 4(−6) + 6(3−a) = 0 gives −4a = 0, so a = 0"
      },
      "explainAfterAttempt": true,
      "connect": {
        "en": "Exercise 5.1 Q2, Q4, and Q7 test collinearity directly using Area = 0—and once you master Section 5.4, you can double-check every answer with slopes too!",
        "ta": "பயிற்சி 5.1 வினா 2, 4 மற்றும் 7 ஆகியவை பரப்பு = 0 மூலம் நேர்க்கோடமைவைச் சோதிக்கின்றன; பகுதி 5.4 சாய்வு முறையிலும் சரிபார்க்கலாம்."
      },
      "practiceId": "c10-5-ex5-1-q2-i",
      "relatedExercise": "5.1"
    },
    {
      "id": "g10-ch5-area-quadrilateral",
      "section": "5.3",
      "page": { "en": "207–211", "ta": "214–218" },
      "title": {
        "en": "Area of a quadrilateral & vertex order",
        "ta": "நாற்கரத்தின் பரப்பு மற்றும் முனை வரிசை"
      },
      "firstGlance": {
        "en": "Splitting any quadrilateral along a diagonal into two triangles yields one four-vertex shoelace formula—provided the vertices are walked in boundary order.",
        "ta": "நாற்கரத்தை ஒரு மூலைவிட்டம் வழியே இரு முக்கோணங்களாகப் பிரித்தால் 4-முனைக் குறுக்குப் பெருக்கல் சூத்திரம் கிடைக்கும்; ஆனால் முனைகள் எல்லை வரிசையில் இருக்க வேண்டும்."
      },
      "rule": {
        "en": "Area(ABCD) = ½ |(x₁y₂ + x₂y₃ + x₃y₄ + x₄y₁) − (x₂y₁ + x₃y₂ + x₄y₃ + x₁y₄)| (in cyclic order)",
        "ta": "பரப்பு(ABCD) = ½ |(x₁y₂ + x₂y₃ + x₃y₄ + x₄y₁) − (x₂y₁ + x₃y₂ + x₄y₃ + x₁y₄)| (சுழல் வரிசையில்)"
      },
      "math": {
        "latex": "\\begin{aligned}\\text{Area}&=\\dfrac{1}{2}\\big|(x_1y_2+x_2y_3\\\\&\\qquad+x_3y_4+x_4y_1)\\\\&\\quad-(x_2y_1+x_3y_2\\\\&\\qquad+x_4y_3+x_1y_4)\\big|\\end{aligned}",
        "fallback": "Area(ABCD) = ½ |(x₁y₂ + x₂y₃ + x₃y₄ + x₄y₁) − (x₂y₁ + x₃y₂ + x₄y₃ + x₁y₄)|"
      },
      "glanceVisual": "area-quadrilateral",
      "visual": { "kind": "ch5-lab", "id": "area-quadrilateral" },
      "understand": {
        "intro": {
          "en": "Why does the textbook insist on plotting the four points before computing? Because swapping two adjacent vertices turns the polygon into a self-crossing bow-tie whose halves cancel out!",
          "ta": "கணக்கிடும் முன் நான்கு புள்ளிகளை வரைபடத்தில் குறிக்க வேண்டும் எனப் பாடநூல் ஏன் கூறுகிறது? முனை வரிசை மாறினால் குறுக்கு வெட்டு உருவாகி பரப்பு குறைந்துவிடும்!"
        },
        "symbols": [
          {
            "symbol": { "latex": "A\\to B\\to C\\to D\\to A", "fallback": "A → B → C → D → A" },
            "en": "Walking counter-clockwise around the perimeter so every edge connects adjacent corners, never diagonals.",
            "ta": "மூலைவிட்டத்தைத் தவிர்த்து சுற்று எல்லை வழியே இடஞ்சுழியாகச் செல்லும் வரிசை."
          },
          {
            "symbol": { "latex": "\\Delta_{ABC}+\\Delta_{ACD}", "fallback": "Area(△ABC) + Area(△ACD)" },
            "en": "Decomposing along diagonal AC cancels the shared diagonal terms and collapses into the 4-vertex shoelace.",
            "ta": "AC மூலைவிட்டத்தின் வழி இரு முக்கோணங்களாகப் பிரிக்கும்போது பொது உறுப்புகள் நீங்கி நாற்கரச் சூத்திரம் கிடைக்கிறது."
          }
        ],
        "watchOut": {
          "en": "Never plug four vertices blindly into the formula in unsorted order! Sketch the quadrant positions first and travel counter-clockwise.",
          "ta": "கொடுக்கப்பட்ட நான்கு புள்ளிகளையும் வரிசைப்படுத்தாமல் அப்படியே சூத்திரத்தில் போடாதீர்கள்! முதலில் காற்பகுதிகளில் குறித்து இடஞ்சுழியாக வரிசைப்படுத்துங்கள்."
        }
      },
      "proof": {
        "figure": "area-quadrilateral",
        "steps": [
          {
            "title": { "en": "1. Cut along diagonal AC", "ta": "1. AC மூலைவிட்டத்தால் இரண்டாகப் பிரிக்க" },
            "math": { "latex": "\\begin{aligned}\\operatorname{Area}(ABCD)&=\\operatorname{Area}(\\triangle ABC)\\\\&\\quad+\\operatorname{Area}(\\triangle ACD)\\end{aligned}", "fallback": "Area(ABCD) = Area(△ABC) + Area(△ACD)" },
            "reason": {
              "en": "When A, B, C, D lie in counter-clockwise boundary order, both △ABC and △ACD share the same orientation, so their signed areas add positively.",
              "ta": "A, B, C, D இடஞ்சுழி வரிசையில் இருந்தால், △ABC மற்றும் △ACD இரண்டும் ஒரே திசைப் பரப்பளவைக் கொண்டு கூடும்."
            }
          },
          {
            "title": { "en": "2. Internal diagonal products cancel out", "ta": "2. மூலைவிட்ட உறுப்புகள் நீங்கும்" },
            "math": { "latex": "\\begin{aligned}&(x_3y_1\\text{ in }\\triangle ABC)\\\\&\\quad+(-x_3y_1\\text{ in }\\triangle ACD)=0\\\\&(x_1y_3\\text{ in }\\triangle ACD)\\\\&\\quad+(-x_1y_3\\text{ in }\\triangle ABC)=0\\end{aligned}", "fallback": "x₃y₁ and x₁y₃ appear with opposite signs along diagonal AC and cancel" },
            "reason": {
              "en": "Because AC is traversed C → A in △ABC and A → C in △ACD, those two terms cancel cleanly, leaving only the four outer boundary edges.",
              "ta": "முதல் முக்கோணத்தில் C→A ஆகவும் இரண்டாவதில் A→C ஆகவும் மூலைவிட்டம் வருவதால் அதன் உறுப்புகள் நீங்கி வெளி எல்லை உறுப்புகள் மட்டுமே மிஞ்சும்."
            }
          }
        ]
      },
      "question": {
        "en": "Find the area of the quadrilateral formed by vertices (−4, −2), (−3, −5), (3, −2), and (2, 3) taken in order.",
        "ta": "வரிசைப்படி (−4, −2), (−3, −5), (3, −2) மற்றும் (2, 3) ஆகிய முனைகளால் அமையும் நாற்கரத்தின் பரப்பு காண்க."
      },
      "questionMath": {
        "latex": "(-4,-2),\\;(-3,-5),\\;(3,-2),\\;(2,3)",
        "fallback": "(−4, −2), (−3, −5), (3, −2), (2, 3)"
      },
      "choices": [
        { "en": "28 sq. units", "ta": "28 ச. அலகுகள்" },
        { "en": "56 sq. units", "ta": "56 ச. அலகுகள்" },
        { "en": "22 sq. units", "ta": "22 ச. அலகுகள்" }
      ],
      "correct": 0,
      "hint": {
        "en": "Check the vertices are already counter-clockwise: downward sum is (20 + 6 + 9 − 4) = 31; upward sum is (6 − 15 − 4 − 12) = −25.",
        "ta": "கீழ்நோக்குப் பெருக்கல் கூடுதல் = 20 + 6 + 9 − 4 = 31; மேல்நோக்குப் பெருக்கல் கூடுதல் = 6 − 15 − 4 − 12 = −25."
      },
      "incorrectFeedback": [
        null,
        {
          "en": "56 forgets the ½ factor in front of |(downward) − (upward)|.",
          "ta": "56 என்பது சூத்திரத்தின் முன்பு உள்ள ½-ஆல் பெருக்க மறந்ததால் வந்தது."
        },
        {
          "en": "22 mis-adds the negative products in the upward pass. Remember −(−25) becomes +25.",
          "ta": "மேல்நோக்குக் கூடுதல் −25-ஐக் கழிக்கும்போது +25 ஆக மாறும்; குறித் தவறால் 22 வந்துள்ளது."
        }
      ],
      "why": {
        "en": "Downward sum = (−4)(−5) + (−3)(−2) + 3(3) + 2(−2) = 31; upward sum = (−3)(−2) + 3(−5) + 2(−2) + (−4)(3) = −25. Area = ½ |31 − (−25)| = 56/2 = 28 sq. units.",
        "ta": "கீழ்நோக்கு = 31; மேல்நோக்கு = −25. பரப்பு = ½ |31 − (−25)| = 56/2 = 28 ச. அலகுகள்."
      },
      "whyMath": {
        "latex": "\\text{Area}=\\dfrac{1}{2}|31-(-25)|=\\dfrac{56}{2}=28\\text{ sq. units}",
        "fallback": "Area = ½ |31 − (−25)| = 28 sq. units"
      },
      "explainAfterAttempt": true,
      "connect": {
        "en": "Exercise 5.1 Q5, Q6, Q9 (patio surrounding pool), and Q11 all use this boundary-order quadrilateral formula.",
        "ta": "பயிற்சி 5.1 வினா 5, 6, 9 மற்றும் 11 அனைத்தும் இவ்வரிசை நாற்கரச் சூத்திரத்தைப் பயன்படுத்துகின்றன."
      },
      "practiceId": "c10-5-ex5-1-q5-i",
      "relatedExercise": "5.1"
    },
    {
      "id": "g10-ch5-inclination-slope",
      "section": "5.4–5.4.1",
      "page": { "en": "212–215", "ta": "219–222" },
      "title": {
        "en": "Inclination of a line & slope m = tan θ",
        "ta": "கோட்டின் சாய்வுக் கோணம் மற்றும் சாய்வு m = tan θ"
      },
      "firstGlance": {
        "en": "The slope m = tan θ = (y₂ − y₁)/(x₂ − x₁) measures both how steep a line climbs and which way it tilts relative to the positive x-axis.",
        "ta": "சாய்வு m = tan θ = (y₂ − y₁)/(x₂ − x₁) என்பது ஒரு கோடு எவ்வளவு செங்குத்தாக எந்தத் திசையில் சாய்ந்துள்ளது என்பதை அளவிடும்."
      },
      "rule": {
        "en": "m = tan θ (0° ≤ θ < 180°, θ ≠ 90°) and m = (y₂ − y₁)/(x₂ − x₁) for x₁ ≠ x₂",
        "ta": "m = tan θ (0° ≤ θ < 180°, θ ≠ 90°) மற்றும் m = (y₂ − y₁)/(x₂ − x₁) (x₁ ≠ x₂)"
      },
      "math": {
        "latex": "\\begin{aligned}m&=\\tan\\theta\\quad(0^\\circ\\le\\theta<180^\\circ,\\;\\theta\\neq 90^\\circ)\\\\m&=\\dfrac{y_2-y_1}{x_2-x_1}\\quad(x_1\\neq x_2)\\end{aligned}",
        "fallback": "m = tan θ = (y₂ − y₁)/(x₂ − x₁)"
      },
      "glanceVisual": "inclination-slope",
      "visual": { "kind": "ch5-lab", "id": "inclination-slope" },
      "understand": {
        "intro": {
          "en": "Inclination θ is always measured counter-clockwise from the positive direction of the X-axis to the part of the line above the X-axis.",
          "ta": "சாய்வுக் கோணம் θ என்பது எப்போதும் மிகை X-அச்சிலிருந்து இடஞ்சுழியாக X-அச்சுக்கு மேல் உள்ள கோட்டின் பகுதிக்கு அளவிடப்படும்."
        },
        "symbols": [
          {
            "symbol": { "latex": "\\theta", "fallback": "θ" },
            "en": "Angle of inclination: 0° for horizontal, 0° < θ < 90° for rising lines (m > 0), 90° < θ < 180° for falling lines (m < 0).",
            "ta": "சாய்வுக் கோணம்: கிடைமட்டம் எனில் 0°, ஏறுமுகம் எனில் 0° < θ < 90° (m > 0), இறங்குமுகம் எனில் 90° < θ < 180° (m < 0)."
          },
          {
            "symbol": { "latex": "m=\\dfrac{\\text{rise}}{\\text{run}}", "fallback": "m = rise / run" },
            "en": "Ratio of vertical change (y₂ − y₁) to horizontal change (x₂ − x₁). Vertical lines have Δx = 0, so their slope is undefined!",
            "ta": "செங்குத்து மாற்றம் (y₂ − y₁) மற்றும் கிடைமட்ட மாற்றம் (x₂ − x₁) இடையேயான விகிதம். செங்குத்துக் கோட்டிற்கு Δx = 0 என்பதால் சாய்வு வரையறுக்கப்படவில்லை."
          }
        ],
        "watchOut": {
          "en": "Do not confuse zero slope with undefined slope! A flat horizontal road (θ = 0°) has slope 0; a vertical cliff (θ = 90°) has undefined slope because dividing by x₂ − x₁ = 0 is impossible.",
          "ta": "சாய்வு 0 என்பதையும் வரையறுக்கப்படாத சாய்வையும் குழப்பாதீர்கள்! கிடைமட்டக் கோட்டின் (θ = 0°) சாய்வு 0; செங்குத்துக் கோட்டின் (θ = 90°) சாய்வு வரையறுக்கப்படவில்லை."
        }
      },
      "proof": {
        "figure": "inclination-slope",
        "steps": [
          {
            "title": { "en": "1. Draw the rise-run triangle with base parallel to X-axis", "ta": "1. X-அச்சுக்கு இணையான அடிப்பக்கத்துடன் முக்கோணம் அமைக்க" },
            "math": { "latex": "\\begin{aligned}\\angle BAC&=\\theta\\\\BC&=y_2-y_1,\\;AC=x_2-x_1\\end{aligned}", "fallback": "∠BAC = θ, opposite BC = y₂ − y₁, adjacent AC = x₂ − x₁" },
            "reason": {
              "en": "Because AC is parallel to the X-axis, corresponding angles match so the triangle's base angle at A equals the line's inclination θ.",
              "ta": "AC என்பது X-அச்சுக்கு இணை என்பதால் ஒத்த கோணங்கள் சமமாகி, A-இல் உள்ள கோணம் θ-க்குச் சமமாகும்."
            }
          },
          {
            "title": { "en": "2. Tangent connects angle θ to coordinates", "ta": "2. tan θ கோணத்தையும் ஆயத்தொலைவுகளையும் இணைக்கிறது" },
            "math": { "latex": "m=\\tan\\theta=\\dfrac{\\text{opposite}}{\\text{adjacent}}=\\dfrac{y_2-y_1}{x_2-x_1}", "fallback": "m = tan θ = (y₂ − y₁)/(x₂ − x₁)" },
            "reason": {
              "en": "Using right-triangle trigonometry connects the geometric tilt θ directly to the algebraic coordinate difference ratio.",
              "ta": "செங்கோண முக்கோணத்தின் tan θ விகிதம் சாய்வுக் கோணத்தை ஆயத்தொலைவுகளின் விகிதத்துடன் நேரடியாக இணைக்கிறது."
            }
          }
        ]
      },
      "question": {
        "en": "Find the slope of the line passing through (−6, 1) and (−3, 2).",
        "ta": "(−6, 1) மற்றும் (−3, 2) வழிச் செல்லும் கோட்டின் சாய்வு என்ன?"
      },
      "questionMath": {
        "latex": "A(-6,1),\\;B(-3,2)\\implies m=\\;?",
        "fallback": "A(−6, 1), B(−3, 2) gives m = ?"
      },
      "choices": [
        { "en": "m = 3", "ta": "m = 3" },
        { "en": "m = 1/3", "ta": "m = 1/3" },
        { "en": "m = −1/3", "ta": "m = −1/3" }
      ],
      "correct": 1,
      "hint": {
        "en": "Put the change in y on top and the change in x on the bottom: (2 − 1) / (−3 − (−6)).",
        "ta": "y-மாற்றத்தைத் தொகுதியிலும் x-மாற்றத்தைப் பகுதியிலும் எழுதுக: (2 − 1) / (−3 − (−6))."
      },
      "incorrectFeedback": [
        {
          "en": "3 is upside down (run divided by rise). Slope is always rise Δy over run Δx.",
          "ta": "3 என்பது தலைகீழாக (Δx/Δy) வகுத்ததால் வந்தது; சாய்வு என்பது எப்போதும் Δy/Δx ஆகும்."
        },
        null,
        {
          "en": "Watch the negative signs in the denominator: −3 − (−6) = −3 + 6 = +3, so the slope is positive.",
          "ta": "பகுதியில் உள்ள குறி மாற்றத்தைக் கவனிக்கவும்: −3 − (−6) = −3 + 6 = +3; எனவே சாய்வு மிகை எண்."
        }
      ],
      "why": {
        "en": "m = (2 − 1)/(−3 − (−6)) = 1/3.",
        "ta": "m = (2 − 1)/(−3 − (−6)) = 1/3."
      },
      "whyMath": {
        "latex": "m=\\dfrac{2-1}{-3-(-6)}=\\dfrac{1}{3}",
        "fallback": "m = (2−1)/(−3−(−6)) = 1/3"
      },
      "explainAfterAttempt": true,
      "connect": {
        "en": "Exercise 5.2 Q1–Q4 practice reading θ, calculating two-point slopes, and finding unknown coordinates from given slopes.",
        "ta": "பயிற்சி 5.2 வினா 1–4 ஆகியவை சாய்வுக் கோணம் θ மற்றும் இரு புள்ளிகளின் சாய்வைக் காண உதவுகின்றன."
      },
      "practiceId": "c10-5-ex5-2-q1-i",
      "relatedExercise": "5.2"
    },
    {
      "id": "g10-ch5-parallel-perpendicular-slopes",
      "section": "5.4.2–5.4.3",
      "page": { "en": "215–220", "ta": "222–227" },
      "title": {
        "en": "Slopes of parallel & perpendicular lines",
        "ta": "இணை மற்றும் செங்குத்துக் கோடுகளின் சாய்வுகள்"
      },
      "firstGlance": {
        "en": "Non-vertical parallel lines share the exact same slope (m₁ = m₂), while non-vertical perpendicular lines have negative-reciprocal slopes multiplying to −1 (m₁m₂ = −1).",
        "ta": "இரு இணைக்கோடுகளின் சாய்வுகள் சமம் (m₁ = m₂); இரு செங்குத்துக் கோடுகளின் சாய்வுகளின் பெருக்கற்பலன் −1 (m₁m₂ = −1) ஆகும்."
      },
      "rule": {
        "en": "Parallel: m₁ = m₂ | Perpendicular: m₁ × m₂ = −1 (so m₂ = −1/m₁)",
        "ta": "இணை: m₁ = m₂ | செங்குத்து: m₁ × m₂ = −1 (m₂ = −1/m₁)"
      },
      "math": {
        "latex": "\\begin{aligned}\\text{Parallel: }&m_1=m_2\\\\\\text{Perpendicular: }&m_1\\cdot m_2=-1\\end{aligned}",
        "fallback": "Parallel: m₁ = m₂ | Perpendicular: m₁ · m₂ = −1"
      },
      "glanceVisual": "parallel-perp-slopes",
      "visual": { "kind": "ch5-lab", "id": "parallel-perp-slopes" },
      "understand": {
        "intro": {
          "en": "Geometry shapes (parallelograms, rectangles, right triangles) become fast arithmetic tests once you translate parallel and 90° edges into slopes.",
          "ta": "இணைகரம், செவ்வகம், செங்கோண முக்கோணம் போன்ற வடிவியல் பண்புகளைச் சாய்வுகள் மூலம் எளிதாகச் சோதிக்கலாம்."
        },
        "symbols": [
          {
            "symbol": { "latex": "m_1=m_2", "fallback": "m₁ = m₂" },
            "en": "Equal tilt angle θ₁ = θ₂ above the positive X-axis guarantees the lines never diverge or meet.",
            "ta": "சம சாய்வுக் கோணங்கள் θ₁ = θ₂ கோடுகள் இணையாக இருப்பதை உறுதி செய்கின்றன."
          },
          {
            "symbol": { "latex": "m_1m_2=-1", "fallback": "m₁m₂ = −1" },
            "en": "Turning a right-triangle step (+run, +rise) by 90° counter-clockwise turns it into (−rise, +run), flipping the fraction AND changing the sign.",
            "ta": "செங்கோணப் படிகளை 90° சுழற்றும்போது தொகுதியும் பகுதியும் இடமாறி குறியும் எதிராகிறது; எனவே பெருக்கற்பலன் −1 ஆகிறது."
          }
        ],
        "watchOut": {
          "en": "A horizontal line (m₁ = 0) and a vertical line (undefined slope) are perpendicular, even though you cannot multiply 0 by 'undefined'!",
          "ta": "கிடைமட்டக் கோடும் (m = 0) செங்குத்துக் கோடும் (சாய்வு வரையறுக்கப்படவில்லை) ஒன்றுக்கொன்று செங்குத்தானவை; இங்கு 0 × undefined கணக்கிடத் தேவையில்லை."
        }
      },
      "proof": {
        "figure": "parallel-perp-slopes",
        "steps": [
          {
            "title": { "en": "1. Parallel lines match corresponding angles", "ta": "1. இணைக்கோடுகள் ஒத்த கோணங்களைச் சமப்படுத்தும்" },
            "math": { "latex": "\\begin{aligned}\\ell_1\\parallel\\ell_2&\\iff \\theta_1=\\theta_2\\\\&\\iff \\tan\\theta_1=\\tan\\theta_2\\\\&\\iff m_1=m_2\\end{aligned}", "fallback": "l₁ ∥ l₂ iff θ₁ = θ₂ iff m₁ = m₂" },
            "reason": {
              "en": "Since the X-axis is a transversal cutting both lines, corresponding angles θ₁ and θ₂ are equal precisely when the lines are parallel.",
              "ta": "X-அச்சு இரு கோடுகளையும் வெட்டும் குறுக்குவெட்டியாக இருப்பதால், ஒத்த கோணங்கள் சமமாகும்போது கோடுகள் இணையாகும்."
            }
          },
          {
            "title": { "en": "2. Rotating 90° swaps rise and run with a minus sign", "ta": "2. 90° சுழற்சி ஏற்ற-இறக்கத்தை எதிர் தலைகீழாக்கும்" },
            "math": { "latex": "\\begin{aligned}\\theta_2&=90^\\circ+\\theta_1\\\\\\tan\\theta_2&=\\tan(90^\\circ+\\theta_1)\\\\&=-\\cot\\theta_1=-\\dfrac{1}{\\tan\\theta_1}\\end{aligned}", "fallback": "θ₂ = 90° + θ₁ gives tan θ₂ = −cot θ₁ = −1/tan θ₁, so m₁m₂ = −1" },
            "reason": {
              "en": "By the exterior-angle theorem, the perpendicular line's inclination is 90° + θ₁, so its slope is −1/m₁ and m₁·m₂ = −1.",
              "ta": "வெளிக்கோணப் பண்பின்படி செங்குத்துக்கோட்டின் கோணம் 90° + θ₁ ஆகி, சாய்வு −1/m₁ ஆகிறது; ஆகவே m₁m₂ = −1."
            }
          }
        ]
      },
      "question": {
        "en": "Line p passes through (3, −2) and (12, 4). What is the slope of any line perpendicular to p?",
        "ta": "(3, −2) மற்றும் (12, 4) வழிச் செல்லும் கோடு p-க்குச் செங்குத்தான கோட்டின் சாய்வு என்ன?"
      },
      "questionMath": {
        "latex": "m_p=\\dfrac{4-(-2)}{12-3}=\\dfrac{6}{9}=\\dfrac{2}{3},\\quad m_\\perp=\\;?",
        "fallback": "Slope of p is 2/3; perpendicular slope = ?"
      },
      "choices": [
        { "en": "−3/2", "ta": "−3/2" },
        { "en": "2/3", "ta": "2/3" },
        { "en": "3/2", "ta": "3/2" }
      ],
      "correct": 0,
      "hint": {
        "en": "To get the perpendicular slope from m₁ = 2/3, flip the fraction AND negate the sign so m₁ × m₂ = −1.",
        "ta": "m₁ = 2/3 எனில், செங்குத்துச் சாய்வு காண பின்னத்தைத் தலைகீழாக்கி எதிர்க்குறி இட வேண்டும்."
      },
      "incorrectFeedback": [
        null,
        {
          "en": "2/3 is the slope of a parallel line (m₂ = m₁), not a perpendicular line.",
          "ta": "2/3 என்பது இணைக்கோட்டின் சாய்வு (m₁ = m₂); செங்குத்துக்கோட்டின் சாய்வு அல்ல."
        },
        {
          "en": "3/2 flips the fraction but keeps it positive: (2/3)×(3/2) = +1 instead of −1.",
          "ta": "3/2 பின்னத்தைத் தலைகீழாக்கினாலும் குறியை மாற்றவில்லை; (2/3)×(3/2) = +1 ஆகும், −1 ஆகாது."
        }
      ],
      "why": {
        "en": "Slope of p is (4 − (−2))/(12 − 3) = 6/9 = 2/3. Solving (2/3)·m⊥ = −1 gives m⊥ = −3/2.",
        "ta": "p-இன் சாய்வு 2/3. (2/3)·m⊥ = −1 என்பதால் செங்குத்துக் கோட்டின் சாய்வு m⊥ = −3/2."
      },
      "whyMath": {
        "latex": "\\dfrac{2}{3}\\cdot m_\\perp=-1\\implies m_\\perp=-\\dfrac{3}{2}",
        "fallback": "(2/3) · m⊥ = −1 gives m⊥ = −3/2"
      },
      "explainAfterAttempt": true,
      "connect": {
        "en": "Exercise 5.2 Q5–Q13 use m₁ = m₂ and m₁m₂ = −1 to test right triangles, parallelograms, and rhombuses without calculating a single distance.",
        "ta": "பயிற்சி 5.2 வினா 5–13 ஆகியவை தொலைவு காணாமலேயே செங்கோண முக்கோணம், இணைகரம், சாய்சதுரம் ஆகியவற்றை நிரூபிக்க இச்சாய்வு விதிகளைப் பயன்படுத்துகின்றன."
      },
      "practiceId": "c10-5-ex5-2-q9-i",
      "secondaryPracticeId": "c10-5-ex5-2-q10",
      "relatedExercise": "5.2"
    },
    {
      "id": "g10-ch5-axes-and-parallel-lines",
      "section": "5.5.1–5.5.3",
      "page": { "en": "221–223", "ta": "228–230" },
      "title": {
        "en": "Equations of axes & lines parallel to axes",
        "ta": "ஆய அச்சுகள் மற்றும் அச்சுகளுக்கு இணையான கோடுகள்"
      },
      "firstGlance": {
        "en": "Every point on a horizontal line shares the same height y = b (parallel to the X-axis), while every point on a vertical line shares the same x-position x = c (parallel to the Y-axis).",
        "ta": "X-அச்சுக்கு இணையான கிடைமட்டக் கோட்டில் அனைத்துப் புள்ளிகளின் y-அச்சும் சமம் (y = b); Y-அச்சுக்கு இணையான செங்குத்துக் கோட்டில் x-அச்சும் சமம் (x = c)."
      },
      "rule": {
        "en": "X-axis: y = 0 | Parallel to X-axis: y = b | Y-axis: x = 0 | Parallel to Y-axis: x = c",
        "ta": "X-அச்சு: y = 0 | X-அச்சுக்கு இணை: y = b | Y-அச்சு: x = 0 | Y-அச்சுக்கு இணை: x = c"
      },
      "math": {
        "latex": "\\begin{aligned}\\parallel X\\text{-axis: }&y=b\\;(X\\text{-axis: }y=0)\\\\\\parallel Y\\text{-axis: }&x=c\\;(Y\\text{-axis: }x=0)\\end{aligned}",
        "fallback": "Parallel to X-axis: y = b | Parallel to Y-axis: x = c"
      },
      "glanceVisual": "axes-parallel",
      "visual": { "kind": "ch5-lab", "id": "axes-parallel" },
      "understand": {
        "intro": {
          "en": "An equation of a straight line is simply the condition that every point (x, y) on that line obeys.",
          "ta": "ஒரு நேர்க்கோட்டின் சமன்பாடு என்பது அக்கோட்டின் மேல் உள்ள ஒவ்வொரு புள்ளியும் (x, y) நிறைவு செய்யும் நிபந்தனையாகும்."
        },
        "symbols": [
          {
            "symbol": { "latex": "y=b", "fallback": "y = b" },
            "en": "Horizontal line b units above (b > 0) or below (b < 0) the X-axis. Because y stays constant, it runs parallel to the X-axis.",
            "ta": "X-அச்சிற்கு b அலகுகள் மேல் அல்லது கீழ் இணையாகச் செல்லும் கோடு; இங்கு y எப்போதும் மாறாது."
          },
          {
            "symbol": { "latex": "x=c", "fallback": "x = c" },
            "en": "Vertical line c units right (c > 0) or left (c < 0) of the Y-axis. Because x stays fixed at c, it runs parallel to the Y-axis.",
            "ta": "Y-அச்சிற்கு c அலகுகள் வலது அல்லது இடதுபுறம் இணையாகச் செல்லும் கோடு; இங்கு x எப்போதும் c."
          }
        ],
        "watchOut": {
          "en": "Classic swap trap: students often write x = 5 for a line parallel to the X-axis! Test points on the X-axis: (1, 0), (2, 0), (3, 0) — it is y that stays constant (= 0), not x.",
          "ta": "X-அச்சுக்கு இணை எனப் படித்தவுடன் x = b எனத் தவறாக எழுதாதீர்கள்! X-அச்சின் மீது (1, 0), (2, 0) என y-தான் 0-ஆக மாறாமல் இருக்கும்."
        }
      },
      "proof": {
        "figure": "axes-parallel",
        "steps": [
          {
            "title": { "en": "1. Constant height defines horizontal lines", "ta": "1. மாறாத உயரம் கிடைமட்டக் கோட்டைத் தரும்" },
            "math": { "latex": "\\begin{aligned}&P(x,y)\\text{ at distance }b\\text{ from }X\\text{-axis}\\\\&\\implies y=b\\end{aligned}", "fallback": "Every point at signed height b above X-axis satisfies y = b" },
            "reason": {
              "en": "Whether x is −4, 0, or +5, the vertical coordinate stays locked at b, so the locus is y = b.",
              "ta": "x எதுவாக இருந்தாலும் y-ஆயத்தொலைவு எப்போதும் b என்பதால் சமன்பாடு y = b ஆகிறது."
            }
          },
          {
            "title": { "en": "2. Special case b = 0 or c = 0 gives the axes", "ta": "2. b = 0 அல்லது c = 0 எனில் ஆய அச்சுகள் கிடைக்கும்" },
            "math": { "latex": "\\begin{aligned}b=0&\\implies y=0\\;(X\\text{-axis})\\\\c=0&\\implies x=0\\;(Y\\text{-axis})\\end{aligned}", "fallback": "y = 0 is the X-axis and x = 0 is the Y-axis" },
            "reason": {
              "en": "Setting the offset to zero places the line right on the X-axis (y = 0) or Y-axis (x = 0).",
              "ta": "தொலைவு 0 எனும்போது அக்கோடு X-அச்சாகவோ (y = 0) அல்லது Y-அச்சாகவோ (x = 0) அமைகிறது."
            }
          }
        ]
      },
      "question": {
        "en": "Find the equation of the straight line passing through (5, 7) and parallel to the Y-axis.",
        "ta": "(5, 7) என்ற புள்ளி வழிச் செல்வதும், Y-அச்சுக்கு இணையானதுமான நேர்க்கோட்டின் சமன்பாடு என்ன?"
      },
      "questionMath": {
        "latex": "(5,7)\\text{ and parallel to }Y\\text{-axis}",
        "fallback": "Through (5, 7) and parallel to Y-axis"
      },
      "choices": [
        { "en": "y = 7", "ta": "y = 7" },
        { "en": "x = 5", "ta": "x = 5" },
        { "en": "y = 5", "ta": "y = 5" }
      ],
      "correct": 1,
      "hint": {
        "en": "A line parallel to the Y-axis goes straight up and down, so every point on it has the exact same x-coordinate.",
        "ta": "Y-அச்சுக்கு இணையான கோடு செங்குத்தாகச் செல்லும்; அதில் உள்ள அனைத்துப் புள்ளிகளுக்கும் x-ஆயத்தொலைவு மாறாது."
      },
      "incorrectFeedback": [
        {
          "en": "y = 7 keeps height fixed at 7, so it runs horizontally (parallel to the X-axis, not the Y-axis).",
          "ta": "y = 7 என்பது X-அச்சுக்கு இணையான கிடைமட்டக் கோடாகும்."
        },
        null,
        {
          "en": "y = 5 is a horizontal line at height 5; it does not even pass through (5, 7) where y = 7.",
          "ta": "y = 5 என்பது உயரம் 5 கொண்ட கிடைமட்டக் கோடு; இது (5, 7) வழிச் செல்லாது."
        }
      ],
      "why": {
        "en": "Every line parallel to the Y-axis has equation x = c. Since it passes through (5, 7), x must be 5 everywhere, giving x = 5.",
        "ta": "Y-அச்சுக்கு இணையான கோட்டின் சமன்பாடு x = c. புள்ளி (5, 7) வழிச் செல்வதால் x = 5."
      },
      "whyMath": {
        "latex": "x=c\\text{ through }(5,7)\\implies c=5\\implies x=5",
        "fallback": "x = c through (5, 7) gives x = 5"
      },
      "explainAfterAttempt": true,
      "connect": {
        "en": "Exercise 5.3 Q1 and Q2 test horizontal/vertical equations through intersection points and midpoints.",
        "ta": "பயிற்சி 5.3 வினா 1 மற்றும் 2 ஆகியவை அச்சுகளுக்கு இணையான கோடுகளின் சமன்பாடுகளைப் பயிற்சி செய்கின்றன."
      },
      "practiceId": "c10-5-ex5-3-q1-i",
      "secondaryPracticeId": "c10-5-ex5-3-q1-ii",
      "relatedExercise": "5.3"
    },
    {
      "id": "g10-ch5-slope-intercept-form",
      "section": "5.5.4",
      "page": { "en": "223–224", "ta": "230–231" },
      "title": {
        "en": "Slope-intercept form y = mx + c",
        "ta": "சாய்வு–வெட்டுத்துண்டு வடிவம் y = mx + c"
      },
      "firstGlance": {
        "en": "A slanted line with slope m that crosses the Y-axis at height c obeys y = mx + c: start at (0, c) and change y by m for every 1-unit step in x.",
        "ta": "சாய்வு m மற்றும் y-வெட்டுத்துண்டு c கொண்ட நேர்க்கோட்டின் சமன்பாடு y = mx + c; இது (0, c) புள்ளியில் தொடங்கி x-இன் ஒவ்வொரு அலகிற்கும் m அளவு மாறும்."
      },
      "rule": {
        "en": "y = mx + c (slope = m, y-intercept = c)",
        "ta": "y = mx + c (சாய்வு = m, y-வெட்டுத்துண்டு = c)"
      },
      "math": {
        "latex": "\\begin{aligned}y&=mx+c\\\\(\\text{slope }m,&\\;y\\text{-intercept }(0,c))\\end{aligned}",
        "fallback": "y = mx + c (slope m, y-intercept (0, c))"
      },
      "glanceVisual": "slope-intercept",
      "visual": { "kind": "ch5-lab", "id": "slope-intercept" },
      "understand": {
        "intro": {
          "en": "Two numbers completely lock a non-vertical line: where it starts on the Y-axis (c) and how steeply it tilts (m).",
          "ta": "செங்குத்தல்லாத ஒரு நேர்க்கோட்டை இரு எண்கள் முழுமையாகத் தீர்மானிக்கின்றன: Y-அச்சை வெட்டும் உயரம் c மற்றும் அதன் சாய்வு m."
        },
        "symbols": [
          {
            "symbol": { "latex": "m", "fallback": "m" },
            "en": "Slope (or tan θ from inclination θ). Controls the tilt/steepness of the line.",
            "ta": "சாய்வு (அல்லது tan θ); கோட்டின் சாய்வுத் தன்மையைத் தீர்மானிக்கிறது."
          },
          {
            "symbol": { "latex": "c", "fallback": "c" },
            "en": "The y-intercept: setting x = 0 gives y = c, so the line crosses the Y-axis at (0, c).",
            "ta": "y-வெட்டுத்துண்டு: x = 0 எனப் பிரதியிட y = c கிடைப்பதால் கோடு Y-அச்சை (0, c) புள்ளியில் வெட்டும்."
          }
        ],
        "watchOut": {
          "en": "Remember c is the Y-intercept (where x = 0), NOT the X-intercept! And if y has a coefficient like 2y = 6x + 4, divide by 2 first before reading m = 3 and c = 2.",
          "ta": "c என்பது y-வெட்டுத்துண்டு (x = 0) ஆகும், x-வெட்டுத்துண்டு அல்ல! 2y = 6x + 4 போல் y-க்குக் கெழு இருந்தால், முதலில் 2-ஆல் வகுத்துப் பிறகே m, c காண வேண்டும்."
        }
      },
      "proof": {
        "figure": "slope-intercept",
        "steps": [
          {
            "title": { "en": "1. Anchor the line at (0, c) and take a general point P(x, y)", "ta": "1. (0, c) மற்றும் பொதுப் புள்ளி P(x, y) இடையே சாய்வு" },
            "math": { "latex": "\\dfrac{y-c}{x-0}=m", "fallback": "(y − c)/(x − 0) = m" },
            "reason": {
              "en": "Any other point P(x, y) on the line joins (0, c) with the constant slope m.",
              "ta": "கோட்டின் மேல் உள்ள எந்தப் புள்ளி P(x, y)-க்கும் (0, c)-க்கும் இடையிலான சாய்வு m ஆகும்."
            }
          },
          {
            "title": { "en": "2. Multiply by x and add c", "ta": "2. x-ஆல் பெருக்கி c-ஐக் கூட்டுக" },
            "math": { "latex": "y-c=mx\\implies y=mx+c", "fallback": "y − c = mx gives y = mx + c" },
            "reason": {
              "en": "Rearranging immediately isolates y in terms of x, slope m, and y-intercept c.",
              "ta": "மாற்றி அமைத்தால் y = mx + c என்ற சாய்வு–வெட்டுத்துண்டு வடிவம் கிடைக்கிறது."
            }
          }
        ]
      },
      "question": {
        "en": "Find the equation of a straight line whose angle of inclination is 45° and y-intercept is 11.",
        "ta": "சாய்வுக் கோணம் 45° மற்றும் y-வெட்டுத்துண்டு 11 கொண்ட நேர்க்கோட்டின் சமன்பாடு என்ன?"
      },
      "questionMath": {
        "latex": "\\theta=45^\\circ,\\;c=11\\implies y=\\;?",
        "fallback": "θ = 45°, c = 11 gives y = ?"
      },
      "choices": [
        { "en": "y = 45x + 11", "ta": "y = 45x + 11" },
        { "en": "y = x − 11", "ta": "y = x − 11" },
        { "en": "y = x + 11", "ta": "y = x + 11" }
      ],
      "correct": 2,
      "hint": {
        "en": "First convert the inclination θ = 45° into slope m = tan 45° = 1, then substitute into y = mx + c.",
        "ta": "முதலில் சாய்வுக் கோணம் 45°-ஐ சாய்வு m = tan 45° = 1 என மாற்றி, y = mx + c-இல் பிரதியிடவும்."
      },
      "incorrectFeedback": [
        {
          "en": "45 is the angle in degrees, not the slope! Slope m is tan 45° = 1.",
          "ta": "45 என்பது கோணம்; சாய்வு m = tan 45° = 1 ஆகும்."
        },
        {
          "en": "Check the sign of the y-intercept: c = +11 goes on the right as +11.",
          "ta": "வெட்டுத்துண்டு +11 என்பதால் y = x + 11 வர வேண்டும்; y = x − 11 அல்ல."
        },
        null
      ],
      "why": {
        "en": "Slope m = tan 45° = 1 and y-intercept c = 11, so y = 1·x + 11 = x + 11 (or x − y + 11 = 0).",
        "ta": "சாய்வு m = tan 45° = 1 மற்றும் y-வெட்டுத்துண்டு c = 11 என்பதால் சமன்பாடு y = x + 11."
      },
      "whyMath": {
        "latex": "m=\\tan 45^\\circ=1,\\;c=11\\implies y=x+11",
        "fallback": "m = tan 45° = 1, c = 11 gives y = x + 11"
      },
      "explainAfterAttempt": true,
      "connect": {
        "en": "Exercise 5.3 Q3–Q5 and Q11 (song download rate y = −0.1x + 1) rely on interpreting m as rate of change and c as starting value.",
        "ta": "பயிற்சி 5.3 வினா 3–5 மற்றும் 11 ஆகியவை y = mx + c வடிவத்தைப் பயன்படுத்துகின்றன."
      },
      "practiceId": "c10-5-ex5-3-q3",
      "relatedExercise": "5.3"
    },
    {
      "id": "g10-ch5-point-slope-and-two-point",
      "section": "5.5.5–5.5.6",
      "page": { "en": "224–226", "ta": "231–233" },
      "title": {
        "en": "Point-slope & two-point forms",
        "ta": "புள்ளி–சாய்வு மற்றும் இரு புள்ளி வடிவங்கள்"
      },
      "firstGlance": {
        "en": "If you know one point (x₁, y₁) and slope m—or two points (x₁, y₁) and (x₂, y₂)—the line equation states that any point P(x, y) makes that exact same slope.",
        "ta": "ஒரு புள்ளி (x₁, y₁) மற்றும் சாய்வு m—அல்லது இரு புள்ளிகள்—தெரிந்தால், P(x, y) உடன் அமையும் சாய்வும் சமம் என்பதே சமன்பாடாகும்."
      },
      "rule": {
        "en": "Point-Slope: y − y₁ = m(x − x₁) | Two-Point: (y − y₁)/(y₂ − y₁) = (x − x₁)/(x₂ − x₁)",
        "ta": "புள்ளி–சாய்வு: y − y₁ = m(x − x₁) | இரு புள்ளி: (y − y₁)/(y₂ − y₁) = (x − x₁)/(x₂ − x₁)"
      },
      "math": {
        "latex": "\\begin{aligned}y-y_1&=m(x-x_1)\\\\\\dfrac{y-y_1}{y_2-y_1}&=\\dfrac{x-x_1}{x_2-x_1}\\end{aligned}",
        "fallback": "y − y₁ = m(x − x₁) | (y − y₁)/(y₂ − y₁) = (x − x₁)/(x₂ − x₁)"
      },
      "glanceVisual": "point-slope",
      "visual": { "kind": "ch5-lab", "id": "point-slope" },
      "understand": {
        "intro": {
          "en": "These two forms are really the same slope idea in disguise: the Two-Point form just replaces m with (y₂ − y₁)/(x₂ − x₁).",
          "ta": "இவ்விரு வடிவங்களும் ஒன்றே: இரு புள்ளி வடிவத்தில் சாய்வு m-க்குப் பதிலாக (y₂ − y₁)/(x₂ − x₁) பிரதியிடப்பட்டுள்ளது."
        },
        "symbols": [
          {
            "symbol": { "latex": "(x_1,y_1)", "fallback": "(x₁, y₁)" },
            "en": "The given anchor point; substituting x = x₁, y = y₁ automatically makes both sides 0 = 0.",
            "ta": "கொடுக்கப்பட்ட நிலைப் புள்ளி; x = x₁, y = y₁ எனப் பிரதியிட இருபுறமும் 0 = 0 எனச் சமனாகும்."
          },
          {
            "symbol": { "latex": "\\dfrac{y-y_1}{y_2-y_1}=\\dfrac{x-x_1}{x_2-x_1}", "fallback": "(y−y₁)/(y₂−y₁) = (x−x₁)/(x₂−x₁)" },
            "en": "Two-Point ratio equation (works whenever x₁ ≠ x₂ and y₁ ≠ y₂; if x₁ = x₂, the vertical line is simply x = x₁).",
            "ta": "இரு புள்ளி விகிதச் சமன்பாடு (x₁ = x₂ எனில் செங்குத்துக் கோடு x = x₁ கிடைக்கும்)."
          }
        ],
        "watchOut": {
          "en": "Keep the subtraction signs careful with negative coordinates! Through (−1, 2), (x − (−1)) becomes (x + 1), NOT (x − 1).",
          "ta": "குறை எண் ஆயத்தொலைவுகளில் கழித்தல் குறியைக் கவனமாகக் கையாளுங்கள்! (−1, 2) எனில் (x − (−1)) = (x + 1) ஆகும்."
        }
      },
      "proof": {
        "figure": "point-slope",
        "steps": [
          {
            "title": { "en": "1. Equate the slope from P₁ to any point P(x, y)", "ta": "1. நிலைப் புள்ளியிலிருந்து P(x, y) வரையுள்ள சாய்வைச் சமப்படுத்த" },
            "math": { "latex": "\\dfrac{y-y_1}{x-x_1}=m\\implies y-y_1=m(x-x_1)", "fallback": "(y − y₁)/(x − x₁) = m gives y − y₁ = m(x − x₁)" },
            "reason": {
              "en": "Multiplying by (x − x₁) keeps P₁(x₁, y₁) itself inside the solution set.",
              "ta": "(x − x₁)-ஆல் பெருக்கும்போது நிலைப் புள்ளி (x₁, y₁) தானாகவே சமன்பாட்டை நிறைவு செய்கிறது."
            }
          },
          {
            "title": { "en": "2. Substitute two-point slope m = (y₂ − y₁)/(x₂ − x₁)", "ta": "2. இரு புள்ளிச் சாய்வைப் பிரதியிட" },
            "math": { "latex": "\\begin{aligned}y-y_1&=\\dfrac{y_2-y_1}{x_2-x_1}(x-x_1)\\\\\\implies\\dfrac{y-y_1}{y_2-y_1}&=\\dfrac{x-x_1}{x_2-x_1}\\end{aligned}", "fallback": "Substituting m = (y₂−y₁)/(x₂−x₁) and dividing by (y₂−y₁) gives the two-point form" },
            "reason": {
              "en": "Dividing by (y₂ − y₁) puts all y-terms cleanly on the left and x-terms on the right.",
              "ta": "(y₂ − y₁)-ஆல் வகுத்தால் y-உறுப்புகள் இடப்புறமும் x-உறுப்புகள் வலப்புறமும் நேர்த்தியாக அமையும்."
            }
          }
        ]
      },
      "question": {
        "en": "Find the equation of a straight line passing through (−1, 2) with slope −5/4.",
        "ta": "(−1, 2) வழிச் செல்வதும் சாய்வு −5/4 கொண்டதுமான நேர்க்கோட்டின் சமன்பாடு என்ன?"
      },
      "questionMath": {
        "latex": "(x_1,y_1)=(-1,2),\\;m=-\\dfrac{5}{4}",
        "fallback": "(x₁, y₁) = (−1, 2), m = −5/4"
      },
      "choices": [
        { "en": "5x + 4y − 3 = 0", "ta": "5x + 4y − 3 = 0" },
        { "en": "5x − 4y + 13 = 0", "ta": "5x − 4y + 13 = 0" },
        { "en": "4x + 5y − 6 = 0", "ta": "4x + 5y − 6 = 0" }
      ],
      "correct": 0,
      "hint": {
        "en": "Write y − 2 = (−5/4)(x + 1), multiply both sides by 4, and move all terms to one side.",
        "ta": "y − 2 = (−5/4)(x + 1) என எழுதி, இருபுறமும் 4-ஆல் பெருக்கி ஒரு பக்கம் தொகுக்கவும்."
      },
      "incorrectFeedback": [
        null,
        {
          "en": "5x − 4y + 13 = 0 has positive slope +5/4 instead of −5/4.",
          "ta": "5x − 4y + 13 = 0 கோட்டின் சாய்வு +5/4; ஆனால் நமக்கு −5/4 தேவை."
        },
        {
          "en": "4x + 5y − 6 = 0 swaps 4 and 5, giving slope −4/5 instead of −5/4.",
          "ta": "4x + 5y − 6 = 0 என்பதில் 4 மற்றும் 5 இடமாறியுள்ளன (சாய்வு −4/5)."
        }
      ],
      "why": {
        "en": "y − 2 = −(5/4)(x − (−1)) gives 4(y − 2) = −5(x + 1), so 4y − 8 = −5x − 5, giving 5x + 4y − 3 = 0.",
        "ta": "4(y − 2) = −5(x + 1) என்பது 4y − 8 = −5x − 5 ஆகி, 5x + 4y − 3 = 0 எனக் கிடைக்கும்."
      },
      "whyMath": {
        "latex": "4(y-2)=-5(x+1)\\implies 5x+4y-3=0",
        "fallback": "4(y − 2) = −5(x + 1) gives 5x + 4y − 3 = 0"
      },
      "explainAfterAttempt": true,
      "connect": {
        "en": "Exercise 5.3 Q6–Q10 (including medians and altitudes through a vertex in Q9) use Point-Slope and Two-Point forms directly.",
        "ta": "பயிற்சி 5.3 வினா 6–10 (முக்கோணத்தின் நடுக்கோடு, குத்துக்கோடு உட்பட) இவ்விரு வடிவங்களைப் பயன்படுத்துகின்றன."
      },
      "practiceId": "c10-5-ex5-3-q7-i",
      "secondaryPracticeId": "c10-5-ex5-3-q10",
      "relatedExercise": "5.3"
    },
    {
      "id": "g10-ch5-intercept-form",
      "section": "5.5.7",
      "page": { "en": "226–229", "ta": "233–236" },
      "title": {
        "en": "Intercept form x/a + y/b = 1",
        "ta": "வெட்டுத்துண்டு வடிவம் x/a + y/b = 1"
      },
      "firstGlance": {
        "en": "When a line meets the X-axis at (a, 0) and the Y-axis at (0, b), its equation divides x by a and y by b to sum to 1.",
        "ta": "ஒரு கோடு X-அச்சை (a, 0)-இலும் Y-அச்சை (0, b)-இலும் வெட்டினால், அதன் சமன்பாடு x/a + y/b = 1 ஆகும்."
      },
      "rule": {
        "en": "x/a + y/b = 1 (x-intercept = a, y-intercept = b; a, b ≠ 0)",
        "ta": "x/a + y/b = 1 (x-வெட்டுத்துண்டு = a, y-வெட்டுத்துண்டு = b; a, b ≠ 0)"
      },
      "math": {
        "latex": "\\dfrac{x}{a}+\\dfrac{y}{b}=1\\quad(a,b\\neq 0)",
        "fallback": "x/a + y/b = 1 (a, b ≠ 0)"
      },
      "glanceVisual": "intercept-form",
      "visual": { "kind": "ch5-lab", "id": "intercept-form" },
      "understand": {
        "intro": {
          "en": "Think of why x/a + y/b = 1 works at a glance: plug in (a, 0) and you get a/a + 0 = 1; plug in (0, b) and you get 0 + b/b = 1!",
          "ta": "x/a + y/b = 1 ஏன் சரியாகிறது எனப் பாருங்கள்: (a, 0) பிரதியிட்டால் 1 + 0 = 1; (0, b) பிரதியிட்டால் 0 + 1 = 1!"
        },
        "symbols": [
          {
            "symbol": { "latex": "a", "fallback": "a" },
            "en": "The x-intercept: signed coordinate where the line crosses the X-axis at (a, 0).",
            "ta": "x-வெட்டுத்துண்டு: கோடு X-அச்சை வெட்டும் புள்ளி (a, 0)-இன் மதிப்பு."
          },
          {
            "symbol": { "latex": "b", "fallback": "b" },
            "en": "The y-intercept: signed coordinate where the line crosses the Y-axis at (0, b). Together, the line and axes enclose a right triangle of area ½|ab|.",
            "ta": "y-வெட்டுத்துண்டு: (0, b)-இன் மதிப்பு. அச்சுகளுடன் இக்கோடு அமைக்கும் முக்கோணத்தின் பரப்பு ½|ab|."
          }
        ],
        "watchOut": {
          "en": "Always make the right-hand side equal to +1 before reading off a and b! For 3x − 2y − 6 = 0, write 3x − 2y = 6 and divide by 6 to get x/2 + y/(−3) = 1, so b = −3, not +3.",
          "ta": "a, b மதிப்புகளைப் படிக்கும் முன் சமன்பாட்டின் வலதுபுறம் கட்டாயம் +1 இருக்க வேண்டும்! 3x − 2y = 6-ஐ 6-ஆல் வகுக்க x/2 + y/(−3) = 1 எனக் கிடைப்பதால் b = −3."
        }
      },
      "proof": {
        "figure": "intercept-form",
        "steps": [
          {
            "title": { "en": "1. Apply Two-Point form to (a, 0) and (0, b)", "ta": "1. (a, 0) மற்றும் (0, b) புள்ளிகளுக்கு இரு புள்ளி வடிவம் போடுக" },
            "math": { "latex": "\\dfrac{y-0}{b-0}=\\dfrac{x-a}{0-a}\\implies \\dfrac{y}{b}=1-\\dfrac{x}{a}", "fallback": "(y − 0)/(b − 0) = (x − a)/(0 − a) gives y/b = 1 − x/a" },
            "reason": {
              "en": "Dividing (x − a) by (−a) splits cleanly into −x/a + 1.",
              "ta": "(x − a)-ஐ (−a)-ஆல் வகுத்தால் 1 − x/a எனப் பிரியும்."
            }
          },
          {
            "title": { "en": "2. Move x/a to the left side", "ta": "2. x/a-ஐ இடப்புறம் கொண்டுவர" },
            "math": { "latex": "\\dfrac{x}{a}+\\dfrac{y}{b}=1", "fallback": "x/a + y/b = 1" },
            "reason": {
              "en": "Both intercepts sit neatly underneath their matching variables with +1 on the right.",
              "ta": "இரு வெட்டுத்துண்டுகளும் தத்தமது மாறிகளுக்குக் கீழே, வலப்புறம் 1 இருக்குமாறு அமைகின்றன."
            }
          }
        ]
      },
      "question": {
        "en": "Find the x- and y-intercepts made by the line 4x + 3y + 12 = 0 on the coordinate axes.",
        "ta": "4x + 3y + 12 = 0 என்ற நேர்க்கோடு ஆய அச்சுகளில் ஏற்படுத்தும் x மற்றும் y வெட்டுத்துண்டுகளைக் காண்க."
      },
      "questionMath": {
        "latex": "4x+3y+12=0\\implies \\dfrac{x}{a}+\\dfrac{y}{b}=1",
        "fallback": "4x + 3y + 12 = 0 in form x/a + y/b = 1"
      },
      "choices": [
        { "en": "a = 3, b = 4", "ta": "a = 3, b = 4" },
        { "en": "a = −4, b = −3", "ta": "a = −4, b = −3" },
        { "en": "a = −3, b = −4", "ta": "a = −3, b = −4" }
      ],
      "correct": 2,
      "hint": {
        "en": "Move +12 to the right side so 4x + 3y = −12, then divide every term by −12.",
        "ta": "+12-ஐ வலப்புறம் நகர்த்தி 4x + 3y = −12 ஆக்கி, அனைத்து உறுப்புகளையும் −12-ஆல் வகுக்கவும்."
      },
      "incorrectFeedback": [
        {
          "en": "Dividing by +12 leaves −1 on the right instead of +1, flipping the signs of both intercepts.",
          "ta": "+12-ஆல் வகுத்தால் வலப்புறம் −1 வரும்; +1 வர வேண்டுமெனில் −12-ஆல் வகுக்க வேண்டும்."
        },
        {
          "en": "Check which denominator sits under x and which under y: 4/(−12) = 1/(−3) under x, and 3/(−12) = 1/(−4) under y.",
          "ta": "4x/(−12) = x/(−3) என்பதால் a = −3 மற்றும் 3y/(−12) = y/(−4) என்பதால் b = −4."
        },
        null
      ],
      "why": {
        "en": "4x + 3y = −12; dividing by −12 yields x/(−3) + y/(−4) = 1, so x-intercept a = −3 and y-intercept b = −4.",
        "ta": "4x + 3y = −12 என்பதை −12-ஆல் வகுக்க x/(−3) + y/(−4) = 1; எனவே a = −3, b = −4."
      },
      "whyMath": {
        "latex": "4x+3y=-12\\implies \\dfrac{x}{-3}+\\dfrac{y}{-4}=1",
        "fallback": "4x + 3y = −12 gives x/(−3) + y/(−4) = 1"
      },
      "explainAfterAttempt": true,
      "connect": {
        "en": "Exercise 5.3 Q12–Q14 (equal intercepts and ratio intercepts) build directly on x/a + y/b = 1.",
        "ta": "பயிற்சி 5.3 வினா 12–14 ஆகியவை வெட்டுத்துண்டு வடிவத்தை நேரடியாகப் பயன்படுத்துகின்றன."
      },
      "practiceId": "c10-5-ex5-3-q12-i",
      "relatedExercise": "5.3"
    },
    {
      "id": "g10-ch5-general-form",
      "section": "5.6 & 5.6.3",
      "page": { "en": "230–235", "ta": "237–243" },
      "title": {
        "en": "General form ax + by + c = 0 (slope & intercepts)",
        "ta": "நேர்க்கோட்டுச் சமன்பாட்டின் பொது வடிவம் ax + by + c = 0"
      },
      "firstGlance": {
        "en": "Every straight line—slanted, horizontal, or vertical—fits the single equation ax + by + c = 0, whose slope is m = −a/b (when b ≠ 0).",
        "ta": "எந்தவொரு நேர்க்கோட்டையும் ax + by + c = 0 என்ற பொது வடிவத்தில் எழுதலாம்; இதன் சாய்வு m = −a/b (b ≠ 0) ஆகும்."
      },
      "rule": {
        "en": "ax + by + c = 0 (a, b not both 0) has slope m = −a/b and y-intercept = −c/b (for b ≠ 0)",
        "ta": "ax + by + c = 0 (a, b இரண்டும் 0 அல்ல) எனில் சாய்வு m = −a/b, y-வெட்டுத்துண்டு = −c/b (b ≠ 0)"
      },
      "math": {
        "latex": "\\begin{aligned}ax+by+c&=0\\quad(b\\neq 0)\\\\\\implies m=-\\dfrac{a}{b},&\\quad y\\text{-intercept}=-\\dfrac{c}{b}\\end{aligned}",
        "fallback": "ax + by + c = 0 gives slope m = −a/b and y-intercept = −c/b"
      },
      "glanceVisual": "general-form",
      "visual": { "kind": "ch5-lab", "id": "general-form" },
      "understand": {
        "intro": {
          "en": "Solving ax + by + c = 0 for y translates any general equation instantly into y = mx + c.",
          "ta": "ax + by + c = 0 சமன்பாட்டில் y-ஐத் தனிமைப்படுத்தினால் உடனடியாக y = mx + c வடிவம் கிடைக்கும்."
        },
        "symbols": [
          {
            "symbol": { "latex": "m=-\\dfrac{a}{b}", "fallback": "m = −a/b" },
            "en": "Minus (coefficient of x) divided by (coefficient of y). Notice the minus sign comes from moving ax to the opposite side!",
            "ta": "−(x-இன் கெழு) / (y-இன் கெழு); ax வலப்புறம் செல்லும்போது எதிர் குறி வருகிறது."
          },
          {
            "symbol": { "latex": "b=0", "fallback": "b = 0" },
            "en": "When b = 0 (and a ≠ 0), ax + c = 0 simplifies to vertical line x = −c/a whose slope is undefined.",
            "ta": "b = 0 எனில் சமன்பாடு x = −c/a என்ற செங்குத்துக் கோடாக மாறும்; சாய்வு வரையறுக்கப்படவில்லை."
          }
        ],
        "watchOut": {
          "en": "Do not read coefficients in the wrong order when x and y are scrambled! In 2y − 9x − 7 = 0, a = −9 (coefficient of x) and b = 2 (coefficient of y), so m = −(−9)/2 = 9/2.",
          "ta": "x மற்றும் y இடம் மாறி இருக்கும்போது கவனமாக இருங்கள்! 2y − 9x − 7 = 0 என்பதில் a = −9, b = 2; எனவே சாய்வு m = 9/2."
        }
      },
      "proof": {
        "figure": "general-form",
        "steps": [
          {
            "title": { "en": "1. Isolate the y-term on the left", "ta": "1. y-உறுப்பை மட்டும் இடப்புறம் வைக்க" },
            "math": { "latex": "ax+by+c=0\\implies by=-ax-c", "fallback": "by = −ax − c" },
            "reason": {
              "en": "Subtracting ax and c from both sides prepares the equation for dividing by b.",
              "ta": "ax மற்றும் c-ஐ வலப்புறம் கொண்டு சென்றால் b-ஆல் வகுக்கத் தயாராகும்."
            }
          },
          {
            "title": { "en": "2. Divide by b (assuming b ≠ 0) and match y = mx + c", "ta": "2. b-ஆல் வகுத்து y = mx + c உடன் ஒப்பிடுக" },
            "math": { "latex": "\\begin{aligned}y&=-\\dfrac{a}{b}x-\\dfrac{c}{b}\\\\\\implies m&=-\\dfrac{a}{b},\\;y\\text{-int}=-\\dfrac{c}{b}\\end{aligned}", "fallback": "y = (−a/b)x − c/b gives slope m = −a/b and y-intercept −c/b" },
            "reason": {
              "en": "Comparing directly with Slope-Intercept form extracts both slope and y-intercept in one step.",
              "ta": "சாய்வு–வெட்டுத்துண்டு வடிவத்துடன் ஒப்பிடுவதால் சாய்வும் y-வெட்டுத்துண்டும் உடனே கிடைக்கின்றன."
            }
          }
        ]
      },
      "question": {
        "en": "Find the slope and y-intercept of the line 8x − 7y + 6 = 0.",
        "ta": "8x − 7y + 6 = 0 என்ற நேர்க்கோட்டின் சாய்வு மற்றும் y-வெட்டுத்துண்டு காண்க."
      },
      "questionMath": {
        "latex": "8x-7y+6=0\\implies m=\\;?,\\;c=\\;?",
        "fallback": "8x − 7y + 6 = 0: slope m = ?, y-intercept c = ?"
      },
      "choices": [
        { "en": "m = −8/7, c = −6/7", "ta": "m = −8/7, c = −6/7" },
        { "en": "m = 8/7, c = 6/7", "ta": "m = 8/7, c = 6/7" },
        { "en": "m = 7/8, c = 6/8", "ta": "m = 7/8, c = 6/8" }
      ],
      "correct": 1,
      "hint": {
        "en": "Rewrite 8x − 7y + 6 = 0 as 7y = 8x + 6, then divide by 7.",
        "ta": "8x − 7y + 6 = 0-ஐ 7y = 8x + 6 என எழுதி 7-ஆல் வகுக்கவும்."
      },
      "incorrectFeedback": [
        {
          "en": "Be careful with the minus sign on −7y: b = −7, so m = −8/(−7) = +8/7 and c = −6/(−7) = +6/7.",
          "ta": "b = −7 என்பதை மறவாதீர்கள்: m = −8/(−7) = +8/7 மற்றும் c = −6/(−7) = +6/7."
        },
        null,
        {
          "en": "7/8 swaps a and b (computing −b/a instead of −a/b).",
          "ta": "7/8 என்பது a மற்றும் b-ஐத் தலைகீழாக (−b/a) மாற்றி எடுத்ததால் வந்தது."
        }
      ],
      "why": {
        "en": "With general-form coefficients a = 8, b = −7, C = 6, moving −7y gives 7y = 8x + 6, so y = (8/7)x + 6/7: slope m = 8/7 and y-intercept c = 6/7.",
        "ta": "a = 8, b = −7, மாறிலி C = 6; 7y = 8x + 6 என்பதால் y = (8/7)x + 6/7; எனவே சாய்வு m = 8/7, y-வெட்டுத்துண்டு c = 6/7."
      },
      "whyMath": {
        "latex": "7y=8x+6\\implies y=\\dfrac{8}{7}x+\\dfrac{6}{7}",
        "fallback": "7y = 8x + 6 gives y = (8/7)x + 6/7"
      },
      "explainAfterAttempt": true,
      "connect": {
        "en": "Exercise 5.4 Q1–Q4 check slope and y-intercept extraction from rearranged general equations.",
        "ta": "பயிற்சி 5.4 வினா 1–4 ஆகியவை பொது வடிவச் சமன்பாட்டிலிருந்து சாய்வும் வெட்டுத்துண்டும் காண்பதைச் சோதிக்கின்றன."
      },
      "practiceId": "c10-5-ex5-4-q1-i",
      "relatedExercise": "5.4"
    },
    {
      "id": "g10-ch5-parallel-perpendicular-general",
      "section": "5.6.1–5.6.2",
      "page": { "en": "230–235", "ta": "237–243" },
      "title": {
        "en": "Parallel & perpendicular lines in general form",
        "ta": "பொது வடிவில் இணை மற்றும் செங்குத்துக் கோடுகள்"
      },
      "firstGlance": {
        "en": "Any line parallel to ax + by + c = 0 keeps ax + by + k = 0, while any perpendicular line swaps a and b and flips the middle sign to bx − ay + k = 0.",
        "ta": "ax + by + c = 0-க்கு இணையான கோடு ax + by + k = 0 ஆகவும், செங்குத்தான கோடு bx − ay + k = 0 ஆகவும் அமையும்."
      },
      "rule": {
        "en": "Parallel: a₁b₂ − a₂b₁ = 0 (family ax + by + k = 0) | Perpendicular: a₁a₂ + b₁b₂ = 0 (family bx − ay + k = 0)",
        "ta": "இணை: a₁b₂ − a₂b₁ = 0 (ax + by + k = 0) | செங்குத்து: a₁a₂ + b₁b₂ = 0 (bx − ay + k = 0)"
      },
      "math": {
        "latex": "\\begin{aligned}\\parallel\\;\\text{to }ax+by+c=0:&\\;ax+by+k=0\\\\\\perp\\;\\text{to }ax+by+c=0:&\\;bx-ay+k=0\\end{aligned}",
        "fallback": "Parallel: ax + by + k = 0 | Perpendicular: bx − ay + k = 0"
      },
      "glanceVisual": "general-family",
      "visual": { "kind": "ch5-lab", "id": "general-family" },
      "understand": {
        "intro": {
          "en": "Instead of converting to y = mx + c and clearing fractions twice, these coefficient shortcuts write parallel and perpendicular equations in seconds!",
          "ta": "இரு முறை பின்னங்களைச் சுருக்குவதற்குப் பதிலாக, கெழு விதிகளால் இணை மற்றும் செங்குத்துக் கோடுகளை நொடியில் எழுதலாம்!"
        },
        "symbols": [
          {
            "symbol": { "latex": "a_1b_2-a_2b_1=0", "fallback": "a₁b₂ − a₂b₁ = 0" },
            "en": "Parallel test: slopes −a₁/b₁ = −a₂/b₂ match, so a₁/a₂ = b₁/b₂ (same x, y ratio, only constant k changes).",
            "ta": "இணைச் சோதனை: −a₁/b₁ = −a₂/b₂ சமமாக இருப்பதால் x, y கெழு விகிதம் மாறாது; மாறிலி k மட்டும் மாறும்."
          },
          {
            "symbol": { "latex": "a_1a_2+b_1b_2=0", "fallback": "a₁a₂ + b₁b₂ = 0" },
            "en": "Perpendicular test: multiplying slopes (−a₁/b₁)(−a₂/b₂) = −1 simplifies to a₁a₂ + b₁b₂ = 0, which holds automatically for ax + by + c = 0 and bx − ay + k = 0!",
            "ta": "செங்குத்துச் சோதனை: சாய்வுகளின் பெருக்கல் −1 என்பது a₁a₂ + b₁b₂ = 0 என எளிமையாகிறது; bx − ay + k = 0 எப்போதும் இதை நிறைவு செய்யும்."
          }
        ],
        "watchOut": {
          "en": "For the perpendicular family bx − ay + k = 0, swap BOTH coefficients AND flip ONE sign! Keeping bx + ay + k = 0 gives a₁a₂ + b₁b₂ = 2ab ≠ 0.",
          "ta": "செங்குத்துக் கோடு bx − ay + k = 0 எழுதும்போது a, b-ஐ இடமாற்றுவதுடன் நடுக்குறியையும் கட்டாயம் மாற்ற வேண்டும்."
        }
      },
      "proof": {
        "figure": "general-family",
        "steps": [
          {
            "title": { "en": "1. Verify perpendicularity of bx − ay + k = 0", "ta": "1. bx − ay + k = 0 செங்குத்தானதா எனச் சோதிக்க" },
            "math": { "latex": "\\begin{aligned}m_1\\cdot m_2&=\\left(-\\dfrac{a}{b}\\right)\\left(-\\dfrac{b}{-a}\\right)\\\\&=\\left(-\\dfrac{a}{b}\\right)\\left(\\dfrac{b}{a}\\right)=-1\\end{aligned}", "fallback": "(−a/b)(b/a) = −1" },
            "reason": {
              "en": "When a ≠ 0 and b ≠ 0, the slope of ax + by + c = 0 is −a/b and that of bx − ay + k = 0 is b/a, so m₁·m₂ = −1. When a = 0 or b = 0 (horizontal vs. vertical), a₁a₂ + b₁b₂ = ab − ba = 0 proves perpendicularity directly without dividing by zero.",
              "ta": "a ≠ 0 மற்றும் b ≠ 0 எனில் (−a/b)(b/a) = −1; மேலும் a = 0 அல்லது b = 0 எனும்போது சுழியால் வகுக்காமல் a₁a₂ + b₁b₂ = ab − ba = 0 நேரடியாகச் செங்குத்தை நிரூபிக்கிறது."
            }
          },
          {
            "title": { "en": "2. Solve for k using a given point (x₀, y₀)", "ta": "2. கொடுக்கப்பட்ட புள்ளி (x₀, y₀) மூலம் k காண்க" },
            "math": { "latex": "\\begin{aligned}bx_0-ay_0+k&=0\\\\\\implies k&=ay_0-bx_0\\end{aligned}", "fallback": "Plug (x₀, y₀) into bx − ay + k = 0 to solve k" },
            "reason": {
              "en": "Plugging the target point directly into the family locks the single unique line passing through (x₀, y₀).",
              "ta": "தரப்பட்ட புள்ளியைக் கோட்டுக் குடும்பச் சமன்பாட்டில் பிரதியிட k கிடைத்துத் தேவையான தனி நேர்க்கோடு அமையும்."
            }
          }
        ]
      },
      "question": {
        "en": "Which line is perpendicular to 3x − 4y + 5 = 0 and passes through (6, −2)?",
        "ta": "3x − 4y + 5 = 0 என்ற கோட்டிற்குச் செங்குத்தானதும் (6, −2) வழிச் செல்வதுமான கோடு எது?"
      },
      "questionMath": {
        "latex": "\\perp\\text{ to }3x-4y+5=0\\text{ through }(6,-2)",
        "fallback": "Perpendicular to 3x − 4y + 5 = 0 through (6, −2)"
      },
      "choices": [
        { "en": "4x − 3y − 30 = 0", "ta": "4x − 3y − 30 = 0" },
        { "en": "3x − 4y − 26 = 0", "ta": "3x − 4y − 26 = 0" },
        { "en": "4x + 3y − 18 = 0", "ta": "4x + 3y − 18 = 0" }
      ],
      "correct": 2,
      "hint": {
        "en": "In 3x − 4y + 5 = 0, swapping 3 and −4 and flipping the minus gives 4x + 3y + k = 0; substitute (6, −2) to find k.",
        "ta": "3x − 4y + 5 = 0-க்குச் செங்குத்து 4x + 3y + k = 0; (6, −2) பிரதியிட்டு k காண்க."
      },
      "incorrectFeedback": [
        {
          "en": "4x − 3y − 30 = 0 swapped the numbers but kept the minus sign: a₁a₂ + b₁b₂ = 12 + 12 = 24 ≠ 0.",
          "ta": "4x − 3y − 30 = 0 என்பதில் குறியை மாற்றாததால் a₁a₂ + b₁b₂ = 24 ≠ 0 ஆகிறது."
        },
        {
          "en": "3x − 4y − 26 = 0 is parallel to 3x − 4y + 5 = 0, not perpendicular.",
          "ta": "3x − 4y − 26 = 0 என்பது தரப்பட்ட கோட்டிற்கு இணையானது, செங்குத்தல்ல."
        },
        null
      ],
      "why": {
        "en": "Perpendicular family to 3x − 4y + 5 = 0 is 4x + 3y + k = 0. Plugging in (6, −2): 4(6) + 3(−2) + k = 24 − 6 + k = 0, so k = −18, giving 4x + 3y − 18 = 0.",
        "ta": "செங்குத்துக் கோடு 4x + 3y + k = 0. (6, −2) பிரதியிட 24 − 6 + k = 0 என k = −18 கிடைப்பதால் 4x + 3y − 18 = 0."
      },
      "whyMath": {
        "latex": "4(6)+3(-2)+k=0\\implies k=-18\\implies 4x+3y-18=0",
        "fallback": "4(6) + 3(−2) + k = 0 gives k = −18, so 4x + 3y − 18 = 0"
      },
      "explainAfterAttempt": true,
      "connect": {
        "en": "Exercise 5.4 Q5–Q12 and Unit Exercise 5 (foot of perpendicular, reflection across a line in Q8, and shortest path in Q10) rely directly on these general-form families.",
        "ta": "பயிற்சி 5.4 வினா 5–12 மற்றும் அலகுப் பயிற்சி 5 (சமதள ஆடி பிம்பம், குறுகிய பாதை) இக்கெழு விதிகளைப் பயன்படுத்துகின்றன."
      },
      "practiceId": "c10-5-ex5-4-q5",
      "secondaryPracticeId": "c10-5-unit-q8",
      "relatedExercise": "5.4 & Unit Ex 5"
    }
  ]
};
})();
