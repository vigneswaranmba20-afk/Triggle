/* VER Triggle | Grade 10 Chapter 7 | Mensuration — Textbook-Order Interactive Concept Studio.
 * Original learning explanations, interactive 3D-solid nets/cross-sections/conservation labs, visual proofs, and transfer checks.
 * Grounded in Tamil Nadu Standard Ten Mathematics, revised 2025, Chapter 7 (pp. 269–300 EN / pp. 277–308 TA).
 * Tamil copy is an initial authored draft using 2025 textbook terminology; independent Tamil editorial review pending.
 * No network, tracking, account, autoplay, or worked-example clutter. */
(()=>{'use strict';
window.TRIGGLE_G10_CH7_PATH={
  "chapterId": "g10-ch7",
  "source": "Tamil Nadu Standard Ten Mathematics, revised 2025, Ch 7 pp. 269–300 (EN) & pp. 277–308 (TA)",
  "tamilStatus": "draft, editorial review pending",
  "stages": [
    {
      "id": "g10-ch7-solids-and-units",
      "section": "7.1",
      "page": { "en": "269–271", "ta": "277–279" },
      "title": {
        "en": "3D solids, surface area vs volume, and units",
        "ta": "திண்ம உருவங்கள், புறப்பரப்பு, கன அளவு மற்றும் அலகுகள்"
      },
      "firstGlance": {
        "en": "Surface area measures the outer skin of a 3D solid in square units (cm², m²), while volume measures the space inside it in cubic units (cm³, m³) or capacity in litres.",
        "ta": "புறப்பரப்பு என்பது ஒரு திண்மத்தின் வெளிப்பக்கப் பரப்பை சதுர அலகுகளில் (செ.மீ², மீ²) அளக்கிறது; கன அளவு என்பது அது ஆக்கிரமிக்கும் வெளியை கன அலகுகளில் (செ.மீ³, மீ³) அல்லது லிட்டரில் அளக்கிறது."
      },
      "rule": {
        "en": "1 L = 1000 cm³, 1 m³ = 1000 L, and π ≈ 22/7 unless stated otherwise",
        "ta": "1 லிட்டர் = 1000 செ.மீ³, 1 மீ³ = 1000 லிட்டர், மற்றும் மதிப்பு கொடுக்கப்படாதபோது π ≈ 22/7"
      },
      "math": {
        "latex": "\\begin{aligned}&1\\text{ L}=1000\\text{ cm}^3\\\\&1\\text{ m}^3=1000\\text{ L}=10^6\\text{ cm}^3\\\\&\\pi\\approx\\dfrac{22}{7}\\text{ (default)}\\end{aligned}",
        "fallback": "1 L = 1000 cm³, 1 m³ = 1000 L = 10⁶ cm³, π ≈ 22/7"
      },
      "glanceVisual": "solids-units",
      "visual": { "kind": "ch7-lab", "id": "solids-units" },
      "understand": {
        "intro": {
          "en": "2D plane figures have only length and breadth (area in sq. units). 3D solids like cylinders, cones, spheres, hemispheres, and frustums have exposed outer surfaces (C.S.A. and T.S.A.) and internal space (volume).",
          "ta": "இருபரிமாண தள உருவங்களுக்குப் பரப்பு மட்டுமே உண்டு. உருளை, கூம்பு, கோளம், அரைக்கோளம், இடைக்கண்டம் ஆகிய முப்பரிமாண திண்மங்களுக்குப் புறப்பரப்பும் (வளைபரப்பு, மொத்தப் புறப்பரப்பு) கன அளவும் உண்டு."
        },
        "symbols": [
          {
            "symbol": { "latex": "\\text{sq. units}", "fallback": "sq. units" },
            "en": "Square units (cm², m²) used for C.S.A. and T.S.A. Notice that 'surface area' alone means Total Surface Area (T.S.A.).",
            "ta": "வளைபரப்பு மற்றும் மொத்தப் புறப்பரப்பை அளக்கும் சதுர அலகுகள் (செ.மீ², மீ²). 'புறப்பரப்பு' என்றாலே மொத்தப் புறப்பரப்பைக் குறிக்கும்."
          },
          {
            "symbol": { "latex": "\\text{cu. units}", "fallback": "cu. units" },
            "en": "Cubic units (cm³, m³) used for volume. Always convert mixed units (mm, cm, m) into one common unit before substituting.",
            "ta": "கன அளவை அளக்கும் கன அலகுகள் (செ.மீ³, மீ³). கணக்கிடும் முன் மி.மீ, செ.மீ, மீ ஆகியவற்றை ஒரே அலகிற்கு மாற்ற வேண்டும்."
          },
          {
            "symbol": { "latex": "1\\text{ L}=\\dfrac{1}{1000}\\text{ m}^3", "fallback": "1 L = 1/1000 m³" },
            "en": "Capacity bridge: a 10 cm × 10 cm × 10 cm cube holds 1000 cm³ = 1 litre, and a 1 m × 1 m × 1 m tank holds 1000 litres.",
            "ta": "கொள்ளளவுத் தொடர்பு: 10 செ.மீ பக்கமுள்ள கனச்சதுரம் 1000 செ.மீ³ = 1 லிட்டர் கொள்ளும்; 1 மீ³ தொட்டி 1000 லிட்டர் கொள்ளும்."
          }
        ],
        "watchOut": {
          "en": "Never mix diameter and radius or centimetres and metres in one formula! Halve diameters first (r = d/2) and convert all lengths to the same unit.",
          "ta": "விட்டத்தையும் ஆரத்தையும் அல்லது செ.மீ-யையும் மீ-யையும் ஒரே சூத்திரத்தில் கலக்காதீர்கள்! முதலில் r = d/2 என ஆரம் கண்டு, எல்லா அளவுகளையும் ஒரே அலகிற்கு மாற்றுங்கள்."
        }
      },
      "proof": {
        "figure": "solids-units",
        "steps": [
          {
            "title": { "en": "1. Why 1 m³ equals 10⁶ cm³ (not 100 cm³)", "ta": "1. ஏன் 1 மீ³ = 10⁶ செ.மீ³ (100 செ.மீ³ அல்ல)?" },
            "math": { "latex": "\\begin{aligned}1\\text{ m}^3&=(100\\text{ cm})^3\\\\&=1{,}000{,}000\\text{ cm}^3\\end{aligned}", "fallback": "1 m³ = (100 cm)³ = 1,000,000 cm³" },
            "reason": {
              "en": "Each of the three perpendicular directions (length, breadth, height) is multiplied by 100, giving 100³ = 10⁶.",
              "ta": "நீளம், அகலம், உயரம் என்ற மூன்று திசைகளிலும் 100-ஆல் பெருக்குவதால் 100³ = 10,00,000 செ.மீ³ கிடைக்கிறது."
            }
          },
          {
            "title": { "en": "2. Linking cm³ and m³ to litres", "ta": "2. செ.மீ³ மற்றும் மீ³-ஐ லிட்டருடன் இணைத்தல்" },
            "math": { "latex": "\\begin{aligned}1\\text{ L}&=1000\\text{ cm}^3\\\\\\implies 1\\text{ m}^3&=\\dfrac{10^6\\text{ cm}^3}{1000\\text{ cm}^3/\\text{L}}=1000\\text{ L}\\end{aligned}", "fallback": "1 L = 1000 cm³, so 1 m³ = 1000 L" },
            "reason": {
              "en": "Dividing 1,000,000 cm³ by 1000 cm³ per litre shows that 1 cubic metre holds exactly 1000 litres.",
              "ta": "10,00,000 செ.மீ³-ஐ 1000 செ.மீ³-ஆல் வகுத்தால் 1 கன மீட்டரில் சரியாக 1000 லிட்டர் உள்ளதைப் பெறலாம்."
            }
          }
        ]
      },
      "question": {
        "en": "A cylindrical water tank has a volume of 2.5 m³. How many litres of water can it hold?",
        "ta": "ஓர் உருளை வடிவத் தண்ணீர்த் தொட்டியின் கன அளவு 2.5 மீ³ எனில், அதில் எத்தனை லிட்டர் தண்ணீர் கொள்ளும்?"
      },
      "questionMath": {
        "latex": "V=2.5\\text{ m}^3,\\quad 1\\text{ m}^3=1000\\text{ L}",
        "fallback": "V = 2.5 m³, 1 m³ = 1000 L"
      },
      "choices": [
        { "en": "2500 litres", "ta": "2500 லிட்டர்", "math": { "latex": "2500\\text{ L}", "fallback": "2500 L" } },
        { "en": "250 litres", "ta": "250 லிட்டர்", "math": { "latex": "250\\text{ L}", "fallback": "250 L" } },
        { "en": "25 litres", "ta": "25 லிட்டர்", "math": { "latex": "25\\text{ L}", "fallback": "25 L" } }
      ],
      "correct": 0,
      "hint": {
        "en": "Each 1 m³ equals 1000 litres. Multiply 2.5 by 1000.",
        "ta": "ஒவ்வொரு 1 மீ³-ம் 1000 லிட்டருக்குச் சமம். 2.5-ஐ 1000-ஆல் பெருக்கவும்."
      },
      "incorrectFeedback": [
        null,
        {
          "en": "Multiplying by 100 converts 1 m to cm, not 1 m³ to litres. Use 1 m³ = 1000 L.",
          "ta": "100-ஆல் பெருக்குவது நீளத்திற்கானது; 1 மீ³ = 1000 லிட்டர் ஆகும்."
        },
        {
          "en": "2.5 × 10 = 25 is too small by a factor of 100; 1 m³ holds 1000 litres.",
          "ta": "2.5 × 10 = 25 என்பது மிகவும் குறைவு; 1 மீ³ = 1000 லிட்டர்."
        }
      ],
      "why": {
        "en": "Since 1 m³ = 1000 L, a volume of 2.5 m³ equals 2.5 × 1000 = 2500 litres.",
        "ta": "1 மீ³ = 1000 லிட்டர் என்பதால், 2.5 மீ³ = 2.5 × 1000 = 2500 லிட்டர் ஆகும்."
      },
      "whyMath": {
        "latex": "2.5\\text{ m}^3\\times 1000\\dfrac{\\text{L}}{\\text{m}^3}=2500\\text{ L}",
        "fallback": "2.5 m³ × 1000 L/m³ = 2500 L"
      },
      "explainAfterAttempt": true,
      "connect": {
        "en": "Unit conversions and π ≈ 22/7 appear across Exercise 7.1 and every volume problem in Chapter 7.",
        "ta": "அலகு மாற்றங்களும் π ≈ 22/7 மதிப்பும் பயிற்சி 7.1 மற்றும் அத்தியாயம் 7 முழுவதும் பயன்படுகின்றன."
      },
      "practiceId": "c10-7-ex7-1-q1",
      "secondaryPracticeId": "c10-7-ex7-1-q8"
    },
    {
      "id": "g10-ch7-cylinder-surface-area",
      "localizedVideos": {"ta": {"src": "https://pub-ed71b86e97a64b428086e292b26fb7a2.r2.dev/trace-videos/g10-ch7-cylinder-surface-area/ta/47a73500d8475f6b01c0b0f39246eec7c603c1599a67750a1d6258c8d5657b99.mp4", "language": "ta", "title": "நேர் வட்ட உருளையின் புறப்பரப்பு", "durationSeconds": 70.25}},
      "video": {"src": "https://pub-ed71b86e97a64b428086e292b26fb7a2.r2.dev/trace-videos/g10-ch7-cylinder-surface-area/eb43f9acdb47ccec08209731a0fcdeb9936b0f3152a1618b5c87c77bf884e033.mp4", "language": "en", "durationSeconds": 45.42},
      "section": "7.2.1–7.2.2",
      "page": { "en": "270–273", "ta": "278–281" },
      "title": {
        "en": "Right circular & hollow cylinder surface area",
        "ta": "நேர் வட்ட உருளை மற்றும் உள்ளீடற்ற உருளையின் புறப்பரப்பு"
      },
      "firstGlance": {
        "en": "Unrolling a cylinder's curved wall gives a rectangle of width 2πr and height h. Adding the two circular lids gives T.S.A.; for a hollow pipe, both outer and inner walls plus two rings count.",
        "ta": "உருளையின் வளைபரப்பை விரித்தால் 2πr நீளமும் h அகலமும் கொண்ட செவ்வகம் கிடைக்கும். உள்ளீடற்ற உருளையில் வெளி, உள் வளைபரப்புகளுடன் இரு வட்ட வளையப் பரப்புகளும் சேரும்."
      },
      "rule": {
        "en": "Solid: C.S.A. = 2πrh, T.S.A. = 2πr(h + r); Hollow: C.S.A. = 2π(R + r)h, T.S.A. = 2π(R + r)(R − r + h)",
        "ta": "திண்ம உருளை: வளைபரப்பு = 2πrh, மொ.பு.ப = 2πr(h + r); உள்ளீடற்ற உருளை: வளைபரப்பு = 2π(R + r)h, மொ.பு.ப = 2π(R + r)(R − r + h)"
      },
      "math": {
        "latex": "\\begin{aligned}&\\text{Solid: CSA}=2\\pi rh\\\\&\\text{TSA}=2\\pi r(h+r)\\\\&\\text{Hollow: CSA}=2\\pi(R+r)h\\\\&\\text{TSA}=2\\pi(R+r)(R-r+h)\\end{aligned}",
        "fallback": "Solid: CSA = 2πrh, TSA = 2πr(h + r); Hollow: CSA = 2π(R + r)h, TSA = 2π(R + r)(R - r + h)"
      },
      "glanceVisual": "cylinder-sa",
      "visual": { "kind": "ch7-lab", "id": "cylinder-sa" },
      "understand": {
        "intro": {
          "en": "A right circular cylinder is formed by revolving a rectangle about one side as axis. A hollow cylinder has two co-axial walls of outer radius R, inner radius r, and wall thickness t = R − r.",
          "ta": "ஒரு செவ்வகத்தை அதன் ஒரு பக்கத்தை அச்சாகக் கொண்டு சுழற்றும்போது நேர் வட்ட உருளை உருவாகிறது. உள்ளீடற்ற உருளையில் வெளி ஆரம் R, உள் ஆரம் r, தடிமன் t = R − r ஆகும்."
        },
        "symbols": [
          {
            "symbol": { "latex": "r,\\;h", "fallback": "r, h" },
            "en": "Base radius r and perpendicular height h of the solid cylinder.",
            "ta": "திண்ம உருளையின் அடிப்புற ஆரம் r மற்றும் உயரம் h."
          },
          {
            "symbol": { "latex": "R,\\;r,\\;R-r", "fallback": "R, r, R-r" },
            "en": "Outer radius R, inner radius r, and thickness (R − r) of a hollow cylinder.",
            "ta": "உள்ளீடற்ற உருளையின் வெளி ஆரம் R, உள் ஆரம் r மற்றும் தடிமன் (R − r)."
          },
          {
            "symbol": { "latex": "2\\pi(R^2-r^2)", "fallback": "2π(R² - r²)" },
            "en": "Combined area of the top and bottom circular rings (annuli) on a hollow cylinder.",
            "ta": "உள்ளீடற்ற உருளையின் மேல் மற்றும் கீழ் உள்ள இரு வட்ட வளையப் பாதைகளின் பரப்பு."
          }
        ],
        "watchOut": {
          "en": "For a road roller or open pipe, only the curved surface touches or is painted—do not add the circular ends! Always check whether the problem gives thickness or outer/inner diameters.",
          "ta": "சமன்படுத்தும் உருளை அல்லது திறந்த குழாய்க்கு வளைபரப்பு மட்டுமே கணக்கிடப்படும்—அடி, மேல் வட்டங்களைச் சேர்க்காதீர்கள்!"
        }
      },
      "proof": {
        "figure": "cylinder-sa",
        "steps": [
          {
            "title": { "en": "1. Solid cylinder net: rectangle + two circles", "ta": "1. திண்ம உருளை வலை: செவ்வகம் + இரு வட்டங்கள்" },
            "math": { "latex": "\\text{TSA}=2\\pi rh+\\pi r^2+\\pi r^2=2\\pi r(h+r)", "fallback": "TSA = 2πrh + 2πr² = 2πr(h + r)" },
            "reason": {
              "en": "The unrolled lateral wall is a rectangle of length 2πr (base circumference) and height h, and each circular end has area πr².",
              "ta": "விரிக்கப்பட்ட வளைபரப்பு 2πr நீளமும் h உயரமும் கொண்ட செவ்வகம்; மேலும் மேல், கீழ் வட்டங்களின் பரப்பு தலா πr² ஆகும்."
            }
          },
          {
            "title": { "en": "2. Hollow cylinder: outer + inner walls + two rings", "ta": "2. உள்ளீடற்ற உருளை: வெளி + உள் வளைபரப்பு + இரு வளையங்கள்" },
            "math": { "latex": "\\begin{aligned}\\text{TSA}&=2\\pi(R+r)h+2\\pi(R^2-r^2)\\\\&=2\\pi(R+r)(R-r+h)\\end{aligned}", "fallback": "TSA = 2π(R+r)h + 2π(R²-r²) = 2π(R+r)(R-r+h)" },
            "reason": {
              "en": "Factoring R² − r² = (R + r)(R − r) lets us pull out the common factor 2π(R + r).",
              "ta": "R² − r² = (R + r)(R − r) எனக் காரணிப்படுத்தி 2π(R + r)-ஐப் பொதுவாக வெளியில் எடுக்கலாம்."
            }
          }
        ]
      },
      "question": {
        "en": "A hollow cylindrical pipe has outer radius R = 5 cm, inner radius r = 3 cm, and height h = 10 cm. What is its curved surface area (outer + inner)?",
        "ta": "வெளி ஆரம் R = 5 செ.மீ, உள் ஆரம் r = 3 செ.மீ மற்றும் உயரம் h = 10 செ.மீ கொண்ட உள்ளீடற்ற உருளைக் குழாயின் வளைபரப்பு (வெளி + உள்) எவ்வளவு?"
      },
      "questionMath": {
        "latex": "R=5\\text{ cm},\\;r=3\\text{ cm},\\;h=10\\text{ cm}",
        "fallback": "R = 5 cm, r = 3 cm, h = 10 cm"
      },
      "choices": [
        { "en": "40π cm²", "ta": "40π செ.மீ²", "math": { "latex": "40\\pi\\text{ cm}^2", "fallback": "40π cm²" } },
        { "en": "160π cm²", "ta": "160π செ.மீ²", "math": { "latex": "160\\pi\\text{ cm}^2", "fallback": "160π cm²" } },
        { "en": "192π cm²", "ta": "192π செ.மீ²", "math": { "latex": "192\\pi\\text{ cm}^2", "fallback": "192π cm²" } }
      ],
      "correct": 1,
      "hint": {
        "en": "Hollow C.S.A. adds both walls: 2π(R + r)h, not 2π(R − r)h.",
        "ta": "உள்ளீடற்ற உருளையின் வளைபரப்பு = 2π(R + r)h ஆகும் (R − r அல்ல)."
      },
      "incorrectFeedback": [
        {
          "en": "40π uses (R − r) = 2 instead of (R + r) = 8; paint covers both outer and inner walls!",
          "ta": "40π என்பது (R − r) = 2-ஐப் பயன்படுத்துகிறது; வெளி மற்றும் உள் சுவர்கள் இரண்டையும் கூட்ட (R + r) = 8 தேவை."
        },
        null,
        {
          "en": "192π cm² is the T.S.A. including the two top/bottom rings 2π(25 − 9) = 32π, not just C.S.A.",
          "ta": "192π செ.மீ² என்பது மேல், கீழ் வளையப் பரப்பு 32π-ஐயும் சேர்த்த மொத்தப் புறப்பரப்பு ஆகும்."
        }
      ],
      "why": {
        "en": "C.S.A. = 2π(R + r)h = 2π(5 + 3)(10) = 2π(8)(10) = 160π cm².",
        "ta": "வளைபரப்பு = 2π(R + r)h = 2π(5 + 3)(10) = 160π செ.மீ²."
      },
      "whyMath": {
        "latex": "\\text{CSA}=2\\pi(5+3)\\times 10=160\\pi\\text{ cm}^2",
        "fallback": "CSA = 2π(5 + 3)(10) = 160π cm²"
      },
      "explainAfterAttempt": true,
      "connect": {
        "en": "Apply solid and hollow cylinder formulas directly in Exercise 7.1 Q1–Q3.",
        "ta": "திண்ம மற்றும் உள்ளீடற்ற உருளை சூத்திரங்களைப் பயிற்சி 7.1 வினாக்கள் 1–3-இல் நேரடியாகப் பயன்படுத்துங்கள்."
      },
      "practiceId": "c10-7-ex7-1-q1",
      "secondaryPracticeId": "c10-7-ex7-1-q2",
      "tertiaryPracticeId": "c10-7-ex7-1-q3"
    },
    {
      "id": "g10-ch7-cone-slant-surface",
      "video": {"src": "https://pub-ed71b86e97a64b428086e292b26fb7a2.r2.dev/trace-videos/g10-ch7-cone-slant-surface/935196fd2e02b59b89e1547748c74069c67421f38ad5029444423449aca12b94.mp4", "language": "en", "durationSeconds": 57.25},
      "section": "7.2.3",
      "page": { "en": "273–276", "ta": "281–284" },
      "title": {
        "en": "Right circular cone: slant height and surface area",
        "ta": "நேர் வட்டக் கூம்பு: சாயுயரம் மற்றும் புறப்பரப்பு"
      },
      "firstGlance": {
        "en": "Inside every right circular cone sits a right triangle with legs r and h and hypotenuse l (slant height). Unrolling the cone's curved surface gives a circular sector of radius l and arc length 2πr.",
        "ta": "ஒவ்வொரு நேர் வட்டக் கூம்பினுள்ளும் r, h பக்கங்களும் l சாயுயரத்தைக் கர்ணமாகவும் கொண்ட செங்கோண முக்கோணம் உள்ளது. கூம்பின் வளைபரப்பை விரித்தால் l ஆரமும் 2πr வில் நீளமும் கொண்ட வட்டக்கோணப் பகுதி கிடைக்கும்."
      },
      "rule": {
        "en": "l = √(h² + r²), C.S.A. = πrl, and T.S.A. = πr(l + r)",
        "ta": "l = √(h² + r²), வளைபரப்பு = πrl, மற்றும் மொத்தப் புறப்பரப்பு = πr(l + r)"
      },
      "math": {
        "latex": "\\begin{aligned}&l=\\sqrt{h^2+r^2}\\\\&\\text{CSA}=\\pi rl,\\quad \\text{TSA}=\\pi r(l+r)\\end{aligned}",
        "fallback": "l = √(h² + r²), CSA = πrl, TSA = πr(l + r)"
      },
      "glanceVisual": "cone-sa",
      "visual": { "kind": "ch7-lab", "id": "cone-sa" },
      "understand": {
        "intro": {
          "en": "Revolving a right triangle about one leg forms a right circular cone. The stationary leg becomes height h, the rotating leg becomes base radius r, and the hypotenuse becomes slant height l.",
          "ta": "ஒரு செங்கோண முக்கோணத்தைச் செங்கோணத்தைத் தாங்கும் ஒரு பக்கத்தை அச்சாகக் கொண்டு சுழற்றினால் நேர் வட்டக் கூம்பு கிடைக்கும்; அச்சு உயரம் h, அடிப்பக்கம் ஆரம் r, கர்ணம் சாயுயரம் l ஆகும்."
        },
        "symbols": [
          {
            "symbol": { "latex": "h,\\;r", "fallback": "h, r" },
            "en": "Perpendicular vertical height h (from apex to base centre) and base radius r.",
            "ta": "உச்சியிலிருந்து அடி மையம் வரையிலான செங்குத்து உயரம் h மற்றும் அடிப்புற ஆரம் r."
          },
          {
            "symbol": { "latex": "l=\\sqrt{h^2+r^2}", "fallback": "l = √(h² + r²)" },
            "en": "Slant height l along the slanted side; always strictly greater than both h and r.",
            "ta": "சாய்வான பக்கத்தின் நீளம் சாயுயரம் l; இது எப்போதும் h மற்றும் r இரண்டையும் விடப் பெரியது."
          },
          {
            "symbol": { "latex": "s=2\\pi r", "fallback": "s = 2πr" },
            "en": "Arc length of the unrolled sector, which matches the cone's circular base circumference.",
            "ta": "விரிக்கப்பட்ட வட்டக்கோணப் பகுதியின் வில் நீளம்; இது கூம்பின் அடிச்சுற்றளவுக்குச் சமம்."
          }
        ],
        "watchOut": {
          "en": "Do not confuse vertical height h with slant height l! Surface area uses l (πrl), whereas volume uses h ((1/3)πr²h).",
          "ta": "உயரம் h-ஐயும் சாயுயரம் l-ஐயும் குழப்பிக்கொள்ளாதீர்கள்! புறப்பரப்புக்கு சாயுயரம் l (πrl) தேவை; கன அளவுக்கு உயரம் h ((1/3)πr²h) தேவை."
        }
      },
      "proof": {
        "figure": "cone-sa",
        "steps": [
          {
            "title": { "en": "1. Pythagoras theorem gives slant height l", "ta": "1. பிதாகரஸ் தேற்றம் மூலம் சாயுயரம் l" },
            "math": { "latex": "\\begin{aligned}l^2&=h^2+r^2\\\\l&=\\sqrt{h^2+r^2}\\end{aligned}", "fallback": "l² = h² + r², so l = √(h² + r²)" },
            "reason": {
              "en": "The axis AB is perpendicular to base radius BC, forming right-angled △ABC.",
              "ta": "உயரம் AB மற்றும் ஆரம் BC ஒன்றுக்கொன்று செங்குத்தாக உள்ளதால் △ABC ஒரு செங்கோண முக்கோணமாகும்."
            }
          },
          {
            "title": { "en": "2. Sector area proportion gives C.S.A. = πrl", "ta": "2. வட்டக்கோணப் பகுதி விகிதம் மூலம் வளைபரப்பு = πrl" },
            "math": { "latex": "\\begin{aligned}\\text{CSA}&=\\dfrac{s}{2\\pi l}\\times\\pi l^2\\\\&=\\dfrac{2\\pi r}{2\\pi l}\\times\\pi l^2=\\pi rl\\end{aligned}", "fallback": "CSA = (2πr / 2πl) × πl² = πrl" },
            "reason": {
              "en": "The sector is a fraction s/(2πl) of a full circle of radius l, where arc s = 2πr.",
              "ta": "l ஆரமுள்ள வட்டத்தில் s/(2πl) பங்கே வட்டக்கோணப் பகுதி; இங்கு வில் நீளம் s = 2πr."
            }
          }
        ]
      },
      "question": {
        "en": "A conical tent has base radius r = 7 m and vertical height h = 24 m. What is its curved surface area (using π = 22/7)?",
        "ta": "ஒரு கூம்பு வடிவக் கூடாரத்தின் ஆரம் r = 7 மீ மற்றும் உயரம் h = 24 மீ எனில், அதன் வளைபரப்பு (π = 22/7) எவ்வளவு?"
      },
      "questionMath": {
        "latex": "r=7\\text{ m},\\;h=24\\text{ m},\\;\\text{CSA}=\\pi rl",
        "fallback": "r = 7 m, h = 24 m, CSA = πrl"
      },
      "choices": [
        { "en": "528 m²", "ta": "528 மீ²", "math": { "latex": "528\\text{ m}^2", "fallback": "528 m²" } },
        { "en": "704 m²", "ta": "704 மீ²", "math": { "latex": "704\\text{ m}^2", "fallback": "704 m²" } },
        { "en": "550 m²", "ta": "550 மீ²", "math": { "latex": "550\\text{ m}^2", "fallback": "550 m²" } }
      ],
      "correct": 2,
      "hint": {
        "en": "First find slant height l = √(7² + 24²) = √625, then compute πrl.",
        "ta": "முதலில் சாயுயரம் l = √(7² + 24²) = √625 கண்டறிந்து, பிறகு πrl கணக்கிடுங்கள்."
      },
      "incorrectFeedback": [
        {
          "en": "528 m² comes from πrh using vertical height 24 instead of slant height l = 25!",
          "ta": "528 மீ² என்பது சாயுயரம் l = 25-க்குப் பதிலாக உயரம் h = 24-ஐப் பயன்படுத்தியதால் வந்த தவறான விடை."
        },
        {
          "en": "704 m² is the T.S.A. πr(l + r) including the circular floor πr² = 154 m².",
          "ta": "704 மீ² என்பது அடிப்பரப்பு 154 மீ²-ஐயும் சேர்த்த மொத்தப் புறப்பரப்பு ஆகும்."
        },
        null
      ],
      "why": {
        "en": "Slant height l = √(7² + 24²) = √(49 + 576) = √625 = 25 m. Thus C.S.A. = (22/7) × 7 × 25 = 550 m².",
        "ta": "சாயுயரம் l = √(7² + 24²) = √625 = 25 மீ. எனவே வளைபரப்பு = (22/7) × 7 × 25 = 550 மீ²."
      },
      "whyMath": {
        "latex": "\\begin{aligned}l&=\\sqrt{7^2+24^2}=25\\text{ m}\\\\\\text{CSA}&=\\dfrac{22}{7}\\times 7\\times 25=550\\text{ m}^2\\end{aligned}",
        "fallback": "l = 25 m, CSA = (22/7) × 7 × 25 = 550 m²"
      },
      "explainAfterAttempt": true,
      "connect": {
        "en": "Practise cone revolution, tent canvas, and cap problems in Exercise 7.1 Q4–Q6.",
        "ta": "கூம்பு சுழற்சி மற்றும் கூடாரக் கணக்குகளைப் பயிற்சி 7.1 வினாக்கள் 4–6-இல் தீர்க்கவும்."
      },
      "practiceId": "c10-7-ex7-1-q4",
      "secondaryPracticeId": "c10-7-ex7-1-q5",
      "tertiaryPracticeId": "c10-7-ex7-1-q6"
    },
    {
      "id": "g10-ch7-sphere-hemisphere-surface",
      "section": "7.2.4–7.2.6",
      "page": { "en": "276–279", "ta": "284–287" },
      "title": {
        "en": "Sphere, hemisphere, and hollow hemisphere surface area",
        "ta": "கோளம், அரைக்கோளம் மற்றும் உள்ளீடற்ற அரைக்கோளத்தின் புறப்பரப்பு"
      },
      "firstGlance": {
        "en": "Archimedes showed a sphere's surface equals the curved wall of a cylinder wrapping around it (4πr²). Cutting through a great circle gives a hemisphere whose flat circular face adds πr² to T.S.A.",
        "ta": "கோளத்தின் புறப்பரப்பு அதனைச் சுற்றியுள்ள h = 2r உயர உருளையின் வளைபரப்புக்குச் (4πr²) சமம் என ஆர்க்கிமெடிஸ் நிறுவினார். அரைக்கோளத்தில் வளைபரப்பு 2πr² உடன் அடிப்பரப்பு πr² சேர்ந்து மொத்தப் புறப்பரப்பு 3πr² ஆகிறது."
      },
      "rule": {
        "en": "Sphere: 4πr²; Solid hemisphere: C.S.A. = 2πr², T.S.A. = 3πr²; Hollow hemisphere: C.S.A. = 2π(R² + r²), T.S.A. = π(3R² + r²)",
        "ta": "கோளம்: 4πr²; அரைக்கோளம்: வ.ப = 2πr², மொ.பு.ப = 3πr²; உள்ளீடற்ற அரைக்கோளம்: வ.ப = 2π(R² + r²), மொ.பு.ப = π(3R² + r²)"
      },
      "math": {
        "latex": "\\begin{aligned}&\\text{Sphere: }4\\pi r^2\\\\&\\text{Hemi: CSA}=2\\pi r^2,\\;\\text{TSA}=3\\pi r^2\\\\&\\text{Hollow: CSA}=2\\pi(R^2+r^2)\\\\&\\text{TSA}=\\pi(3R^2+r^2)\\end{aligned}",
        "fallback": "Sphere: 4πr²; Hemisphere: CSA = 2πr², TSA = 3πr²; Hollow hemisphere: CSA = 2π(R² + r²), TSA = π(3R² + r²)"
      },
      "glanceVisual": "sphere-sa",
      "visual": { "kind": "ch7-lab", "id": "sphere-sa" },
      "understand": {
        "intro": {
          "en": "Every plane cut through a sphere's centre creates a great circle of radius r and splits the sphere into two hemispheres. A hollow hemispherical shell exposes an outer dome (2πR²), inner dome (2πr²), and flat annulus ring π(R² − r²).",
          "ta": "கோள மையத்தின் வழியாகச் செல்லும் தளம் மீப்பெரு வட்டத்தை உருவாக்கி இரு அரைக்கோளங்களாகப் பிரிக்கிறது. உள்ளீடற்ற அரைக்கோள ஓட்டில் வெளி (2πR²), உள் (2πr²) வளைபரப்புகளுடன் தட்டையான வளையம் π(R² − r²) உள்ளது."
        },
        "symbols": [
          {
            "symbol": { "latex": "4\\pi r^2", "fallback": "4πr²" },
            "en": "Surface area of a full sphere (4 great-circle areas). A sphere has no flat face, so C.S.A. = T.S.A.",
            "ta": "முழுக் கோளத்தின் புறப்பரப்பு (4 மீப்பெரு வட்டங்களின் பரப்பு). இதற்குத் தளப்பரப்பு இல்லை."
          },
          {
            "symbol": { "latex": "3\\pi r^2", "fallback": "3πr²" },
            "en": "Total surface area of a solid hemisphere: curved dome 2πr² plus one circular base πr².",
            "ta": "திண்ம அரைக்கோளத்தின் மொத்தப் புறப்பரப்பு: வளைபரப்பு 2πr² + வட்ட அடிப்பரப்பு πr²."
          },
          {
            "symbol": { "latex": "\\pi(3R^2+r^2)", "fallback": "π(3R² + r²)" },
            "en": "T.S.A. of a hollow hemisphere: 2π(R² + r²) + π(R² − r²) = π(3R² + r²).",
            "ta": "உள்ளீடற்ற அரைக்கோளத்தின் மொத்தப் புறப்பரப்பு: 2π(R² + r²) + π(R² − r²) = π(3R² + r²)."
          }
        ],
        "watchOut": {
          "en": "Do not write 2π(R² − r²) for hollow hemisphere C.S.A.! Both outer and inner domes are painted, so their areas ADD: 2πR² + 2πr² = 2π(R² + r²).",
          "ta": "உள்ளீடற்ற அரைக்கோளத்தின் வளைபரப்பில் R² − r² எனக் கழிக்காதீர்கள்! வெளி மற்றும் உள் பரப்புகள் இரண்டையும் கூட்ட வேண்டும்: 2π(R² + r²)."
        }
      },
      "proof": {
        "figure": "sphere-sa",
        "steps": [
          {
            "title": { "en": "1. Archimedes cylinder wrapper for a sphere", "ta": "1. கோளத்திற்கு ஆர்க்கிமெடிஸ் உருளை நிரூபணம்" },
            "math": { "latex": "\\begin{aligned}\\text{SA}_{\\text{sphere}}&=\\text{CSA}_{\\text{cyl}}(h=2r)\\\\&=2\\pi r(2r)=4\\pi r^2\\end{aligned}", "fallback": "SA_sphere = 2πr(2r) = 4πr²" },
            "reason": {
              "en": "A cylinder of radius r and height 2r wraps tightly around the sphere with equal curved area.",
              "ta": "r ஆரமும் 2r உயரமும் கொண்ட உருளையின் வளைபரப்பு கோளத்தின் புறப்பரப்பிற்குச் சமம்."
            }
          },
          {
            "title": { "en": "2. Hollow hemisphere T.S.A. simplification", "ta": "2. உள்ளீடற்ற அரைக்கோள மொத்தப் புறப்பரப்பு" },
            "math": { "latex": "\\begin{aligned}\\text{TSA}&=2\\pi(R^2+r^2)+\\pi(R^2-r^2)\\\\&=\\pi(3R^2+r^2)\\end{aligned}", "fallback": "TSA = 2π(R²+r²) + π(R²-r²) = π(3R²+r²)" },
            "reason": {
              "en": "Adding the outer and inner hemispherical surfaces to the flat ring simplifies cleanly to π(3R² + r²).",
              "ta": "வெளி, உள் வளைபரப்புகளுடன் வளையப் பரப்பைக் கூட்டும்போது π(3R² + r²) கிடைக்கிறது."
            }
          }
        ]
      },
      "question": {
        "en": "A hollow hemispherical bowl has outer radius R = 5 m and inner radius r = 3 m. What is its Total Surface Area (T.S.A.) in terms of π?",
        "ta": "வெளி ஆரம் R = 5 மீ மற்றும் உள் ஆரம் r = 3 மீ கொண்ட உள்ளீடற்ற அரைக்கோளக் கிண்ணத்தின் மொத்தப் புறப்பரப்பு π வழியே எவ்வளவு?"
      },
      "questionMath": {
        "latex": "R=5\\text{ m},\\;r=3\\text{ m},\\;\\text{TSA}=\\pi(3R^2+r^2)",
        "fallback": "R = 5 m, r = 3 m, TSA = π(3R² + r²)"
      },
      "choices": [
        { "en": "84π m²", "ta": "84π மீ²", "math": { "latex": "84\\pi\\text{ m}^2", "fallback": "84π m²" } },
        { "en": "68π m²", "ta": "68π மீ²", "math": { "latex": "68\\pi\\text{ m}^2", "fallback": "68π m²" } },
        { "en": "32π m²", "ta": "32π மீ²", "math": { "latex": "32\\pi\\text{ m}^2", "fallback": "32π m²" } }
      ],
      "correct": 0,
      "hint": {
        "en": "Use T.S.A. = π(3R² + r²) = π(3×25 + 9).",
        "ta": "மொத்தப் புறப்பரப்பு = π(3R² + r²) = π(3×25 + 9) சூத்திரத்தைப் பயன்படுத்துங்கள்."
      },
      "incorrectFeedback": [
        null,
        {
          "en": "68π m² is only the C.S.A. 2π(25 + 9) without adding the top flat ring π(25 − 9) = 16π.",
          "ta": "68π மீ² என்பது வளைபரப்பு 2π(R² + r²) மட்டுமே; மேல் வளையப் பரப்பு 16π சேர்க்கப்படவில்லை."
        },
        {
          "en": "32π uses 2π(R² − r²), which wrongly subtracts the inner hemisphere instead of adding it.",
          "ta": "32π என்பது 2π(R² − r²)-ஐப் பயன்படுத்துகிறது; உள் அரைக்கோளப் பரப்பைக் கூட்ட வேண்டும்."
        }
      ],
      "why": {
        "en": "T.S.A. = π(3R² + r²) = π(3×5² + 3²) = π(75 + 9) = 84π m².",
        "ta": "மொத்தப் புறப்பரப்பு = π(3×25 + 9) = 84π மீ²."
      },
      "whyMath": {
        "latex": "\\text{TSA}=\\pi(3\\times 25+9)=84\\pi\\text{ m}^2",
        "fallback": "TSA = π(75 + 9) = 84π m²"
      },
      "explainAfterAttempt": true,
      "connect": {
        "en": "Solve sphere scaling and hollow hemispherical bowl painting problems in Exercise 7.1 Q8–Q9.",
        "ta": "கோளப் புறப்பரப்பு உயர்வு மற்றும் உள்ளீடற்ற அரைக்கோளக் கிண்ணக் கணக்குகளைப் பயிற்சி 7.1 வினாக்கள் 8–9-இல் காண்க."
      },
      "practiceId": "c10-7-ex7-1-q8",
      "secondaryPracticeId": "c10-7-ex7-1-q9"
    },
    {
      "id": "g10-ch7-frustum-surface-volume",
      "video": {"src": "https://pub-ed71b86e97a64b428086e292b26fb7a2.r2.dev/trace-videos/g10-ch7-frustum-surface-volume/aa962dce89b98e8511e315de01141d0f9145be62dd138fffa28be53e76a9ca76.mp4", "language": "en", "durationSeconds": 55.12},
      "section": "7.2.7 & 7.3.8",
      "page": { "en": "280–281, 289–290", "ta": "288–290, 297–298" },
      "title": {
        "en": "Frustum of a cone: slant height, surface area, and volume",
        "ta": "கூம்பின் இடைக்கண்டம்: சாயுயரம், புறப்பரப்பு மற்றும் கன அளவு"
      },
      "firstGlance": {
        "en": "Slicing the top off a cone parallel to its base leaves a frustum (bucket shape) with two radii R > r. Its slant height uses (R − r), while its surface area and volume blend both ends symmetrically.",
        "ta": "கூம்பின் அடிப்பகுதிக்கு இணையாக ஒரு தளம் வெட்டும்போது கிடைக்கும் வாளி போன்ற பகுதியே இடைக்கண்டம் (R > r). சாயுயரத்தில் (R − r) வரும்; வளைபரப்பும் கன அளவும் R, r இரண்டையும் சமச்சீராகக் கொண்டிருக்கும்."
      },
      "rule": {
        "en": "l = √(h² + (R − r)²), C.S.A. = π(R + r)l, T.S.A. = π(R + r)l + πR² + πr², V = (πh/3)(R² + Rr + r²)",
        "ta": "l = √(h² + (R − r)²), வ.ப = π(R + r)l, மொ.பு.ப = π(R + r)l + πR² + πr², கன அளவு = (πh/3)(R² + Rr + r²)"
      },
      "math": {
        "latex": "\\begin{aligned}&l=\\sqrt{h^2+(R-r)^2}\\\\&\\text{CSA}=\\pi(R+r)l\\\\&\\text{TSA}=\\pi(R+r)l+\\pi R^2+\\pi r^2\\\\&V=\\dfrac{\\pi h}{3}(R^2+Rr+r^2)\\end{aligned}",
        "fallback": "l = √(h² + (R - r)²), CSA = π(R + r)l, TSA = π(R + r)l + πR² + πr², V = (πh/3)(R² + Rr + r²)"
      },
      "glanceVisual": "frustum",
      "visual": { "kind": "ch7-lab", "id": "frustum" },
      "understand": {
        "intro": {
          "en": "A frustum is the big cone of height H and radius R minus the similar top cone of height (H − h) and radius r. Setting r = 0 recovers all standard cone formulas!",
          "ta": "இடைக்கண்டம் என்பது H உயரமும் R ஆரமும் கொண்ட பெரிய கூம்பிலிருந்து (H − h) உயரமும் r ஆரமும் கொண்ட சிறிய கூம்பை நீக்கிய பகுதியாகும். இங்கு r = 0 என வைத்தால் கூம்பின் சூத்திரங்கள் திரும்பக் கிடைக்கும்."
        },
        "symbols": [
          {
            "symbol": { "latex": "R>r", "fallback": "R > r" },
            "en": "Larger circular end radius R and smaller circular end radius r.",
            "ta": "இடைக்கண்டத்தின் பெரிய வட்ட ஆரம் R மற்றும் சிறிய வட்ட ஆரம் r."
          },
          {
            "symbol": { "latex": "l=\\sqrt{h^2+(R-r)^2}", "fallback": "l = √(h² + (R - r)²)" },
            "en": "Slant height of the frustum, formed by vertical drop h and horizontal step (R − r).",
            "ta": "இடைக்கண்டத்தின் சாயுயரம் l; செங்குத்து உயரம் h மற்றும் ஆர வித்தியாசம் (R − r) கொண்ட செங்கோண முக்கோணத்தின் கர்ணம்."
          },
          {
            "symbol": { "latex": "H=\\dfrac{hR}{R-r}", "fallback": "H = hR / (R - r)" },
            "en": "Full height H of the parent cone before its top was cut off, from similar triangles (H − h)/H = r/R.",
            "ta": "வடிவொத்த முக்கோணங்கள் மூலம் பெறப்படும் முழுக் கூம்பின் உயரம் H = hR/(R − r)."
          }
        ],
        "watchOut": {
          "en": "Watch open vs closed frustums! A bucket or lamp shade open at one end has only ONE circular base (πr² or πR²), not both.",
          "ta": "மேற்புறம் திறந்த வாளி போன்ற கணக்குகளில் திறந்த வட்டத்தின் பரப்பைச் சேர்க்கக் கூடாது; மூடிய வட்டப் பரப்பை மட்டுமே கூட்ட வேண்டும்."
        }
      },
      "proof": {
        "figure": "frustum",
        "steps": [
          {
            "title": { "en": "1. Similar triangles give full cone height H", "ta": "1. வடிவொத்த முக்கோணங்கள் மூலம் முழுக் கூம்பின் உயரம் H" },
            "math": { "latex": "\\begin{aligned}\\dfrac{H-h}{H}&=\\dfrac{r}{R}\\\\\\implies H&=\\dfrac{hR}{R-r}\\end{aligned}", "fallback": "(H - h)/H = r/R gives H = hR/(R - r)" },
            "reason": {
              "en": "The cutting plane is parallel to the base, so the removed small cone and full cone are similar.",
              "ta": "வெட்டுத் தளம் அடிப்பகுதிக்கு இணையாக உள்ளதால் சிறிய கூம்பும் முழுக் கூம்பும் வடிவொத்தவை."
            }
          },
          {
            "title": { "en": "2. Difference of two cone volumes", "ta": "2. இரு கூம்புகளின் கன அளவுகளின் வித்தியாசம்" },
            "math": { "latex": "\\begin{aligned}V&=\\dfrac{\\pi}{3}R^2H-\\dfrac{\\pi}{3}r^2(H-h)\\\\&=\\dfrac{\\pi h}{3}(R^2+Rr+r^2)\\end{aligned}", "fallback": "V = (πh/3)(R² + Rr + r²)" },
            "reason": {
              "en": "Substituting H = hR/(R − r) cancels (R − r), leaving the symmetric quadratic factor R² + Rr + r².",
              "ta": "H = hR/(R − r)-ஐப் பிரதியிட (R − r) நீங்கி (πh/3)(R² + Rr + r²) கிடைக்கிறது."
            }
          }
        ]
      },
      "question": {
        "en": "A frustum has height h = 4 cm, top radius R = 5 cm, and bottom radius r = 2 cm. What is its slant height l?",
        "ta": "உயரம் h = 4 செ.மீ, மேல் ஆரம் R = 5 செ.மீ மற்றும் கீழ் ஆரம் r = 2 செ.மீ கொண்ட இடைக்கண்டத்தின் சாயுயரம் l எவ்வளவு?"
      },
      "questionMath": {
        "latex": "h=4\\text{ cm},\\;R=5\\text{ cm},\\;r=2\\text{ cm}",
        "fallback": "h = 4 cm, R = 5 cm, r = 2 cm"
      },
      "choices": [
        { "en": "√65 cm", "ta": "√65 செ.மீ", "math": { "latex": "\\sqrt{65}\\text{ cm}", "fallback": "√65 cm" } },
        { "en": "5 cm", "ta": "5 செ.மீ", "math": { "latex": "5\\text{ cm}", "fallback": "5 cm" } },
        { "en": "7 cm", "ta": "7 செ.மீ", "math": { "latex": "7\\text{ cm}", "fallback": "7 cm" } }
      ],
      "correct": 1,
      "hint": {
        "en": "Use the horizontal difference (R − r) = 5 − 2 = 3 cm with height h = 4 cm.",
        "ta": "ஆரங்களின் வித்தியாசம் (R − r) = 5 − 2 = 3 செ.மீ மற்றும் உயரம் h = 4 செ.மீ கொண்டு கணக்கிடுங்கள்."
      },
      "incorrectFeedback": [
        {
          "en": "√65 comes from adding (R + r) = 7 instead of subtracting (R − r) = 3 in √(h² + (R − r)²).",
          "ta": "√65 என்பது (R − r)-க்குப் பதிலாக (R + r) = 7-ஐப் பயன்படுத்தியதால் வந்தது."
        },
        null,
        {
          "en": "7 cm is R + r, not the slant height along the side.",
          "ta": "7 செ.மீ என்பது R + r ஆகும்; சாயுயரம் l = √(4² + 3²) = 5 செ.மீ."
        }
      ],
      "why": {
        "en": "l = √(h² + (R − r)²) = √(4² + (5 − 2)²) = √(16 + 9) = √25 = 5 cm.",
        "ta": "l = √(4² + (5 − 2)²) = √(16 + 9) = 5 செ.மீ."
      },
      "whyMath": {
        "latex": "l=\\sqrt{4^2+(5-2)^2}=\\sqrt{16+9}=5\\text{ cm}",
        "fallback": "l = √(16 + 9) = 5 cm"
      },
      "explainAfterAttempt": true,
      "connect": {
        "en": "Practise frustum painting and milk container capacity in Exercise 7.1 Q10 and Exercise 7.2 Q10.",
        "ta": "இடைக்கண்ட வர்ணப் பூச்சு மற்றும் கொள்ளளவு கணக்குகளைப் பயிற்சி 7.1 (வினா 10) மற்றும் 7.2 (வினா 10)-இல் தீர்க்கவும்."
      },
      "practiceId": "c10-7-ex7-1-q10",
      "secondaryPracticeId": "c10-7-ex7-2-q10"
    },
    {
      "id": "g10-ch7-volumes-cylinder-cone",
      "video": {"src": "https://pub-ed71b86e97a64b428086e292b26fb7a2.r2.dev/trace-videos/g10-ch7-volumes-cylinder-cone/9c0c9f031fd045dc8cc9b8c11b48d19b68db5f4f2f4f0ab91531b826cd369081.mp4", "language": "en", "durationSeconds": 45.12},
      "section": "7.3.1–7.3.3",
      "page": { "en": "282–286", "ta": "290–294" },
      "title": {
        "en": "Volumes of solid/hollow cylinders and cones, and scaling",
        "ta": "திண்ம, உள்ளீடற்ற உருளை மற்றும் கூம்பின் கன அளவுகளும் அளவு மாற்றமும்"
      },
      "firstGlance": {
        "en": "A cylinder's volume is Base Area × Height (πr²h), and a cone of the same base and height holds exactly one-third of that cylinder. Doubling radius quadruples volume (2² = 4×), while doubling height only doubles it.",
        "ta": "உருளையின் கன அளவு = அடிப்பரப்பு × உயரம் (πr²h); சம ஆரமும் உயரமும் கொண்ட கூம்பின் கன அளவு உருளையில் சரியாக மூன்றில் ஒரு பங்காகும். ஆரத்தை இரு மடங்காக்கினால் கன அளவு 4 மடங்காகும்."
      },
      "rule": {
        "en": "Cylinder: πr²h; Hollow cylinder: π(R² − r²)h; Cone: (1/3)πr²h",
        "ta": "உருளை: πr²h; உள்ளீடற்ற உருளை: π(R² − r²)h; கூம்பு: (1/3)πr²h"
      },
      "math": {
        "latex": "\\begin{aligned}&V_{\\text{cyl}}=\\pi r^2 h,\\quad V_{\\text{hollow cyl}}=\\pi(R^2-r^2)h\\\\&V_{\\text{cone}}=\\dfrac{1}{3}\\pi r^2 h\\end{aligned}",
        "fallback": "V_cyl = πr²h, V_hollow_cyl = π(R² - r²)h, V_cone = (1/3)πr²h"
      },
      "glanceVisual": "volume-cyl-cone",
      "visual": { "kind": "ch7-lab", "id": "volume-cyl-cone" },
      "understand": {
        "intro": {
          "en": "Three full cones of radius r and height h fill one cylinder of the same r and h. For a hollow cylinder (like an embankment or pipe wall), subtract the inner cylinder volume from the outer cylinder volume.",
          "ta": "சம ஆரமும் உயரமும் கொண்ட மூன்று கூம்புகளின் கொள்ளளவு ஒரு உருளையின் கொள்ளளவிற்குச் சமம். உள்ளீடற்ற உருளையில் (கிணற்று மேடை போன்றவை) வெளி உருளையிலிருந்து உள் உருளையின் கன அளவைக் கழிக்க வேண்டும்."
        },
        "symbols": [
          {
            "symbol": { "latex": "\\pi r^2", "fallback": "πr²" },
            "en": "Circular base area; because r is squared, scaling radius by k multiplies volume by k².",
            "ta": "வட்ட அடிப்பரப்பு; ஆரம் k மடங்கானால் கன அளவு k² மடங்காகும்."
          },
          {
            "symbol": { "latex": "\\pi(R^2-r^2)h", "fallback": "π(R² - r²)h" },
            "en": "Volume of material used in a hollow cylinder (outer minus inner).",
            "ta": "உள்ளீடற்ற உருளையில் பயன்படுத்தப்பட்ட பொருளின் கன அளவு (வெளி − உள்)."
          },
          {
            "symbol": { "latex": "\\dfrac{1}{3}\\pi r^2 h", "fallback": "(1/3)πr²h" },
            "en": "Volume of a right circular cone: exactly 1/3 of the enclosing cylinder.",
            "ta": "நேர் வட்டக் கூம்பின் கன அளவு: அதே அளவு உருளையின் கன அளவில் 1/3 பங்கு."
          }
        ],
        "watchOut": {
          "en": "Do not confuse hollow cylinder volume π(R² − r²)h with hollow cylinder C.S.A. 2π(R + r)h! Volume uses R² − r², whereas surface area uses R + r.",
          "ta": "உள்ளீடற்ற உருளையின் கன அளவு π(R² − r²)h-ஐ அதன் வளைபரப்பு 2π(R + r)h உடன் குழப்பிக்கொள்ளாதீர்கள்!"
        }
      },
      "proof": {
        "figure": "volume-cyl-cone",
        "steps": [
          {
            "title": { "en": "1. Three cones fill one matching cylinder", "ta": "1. மூன்று கூம்புகள் ஒரு உருளையை நிரப்புதல்" },
            "math": { "latex": "\\begin{aligned}3\\times V_{\\text{cone}}&=\\pi r^2 h\\\\\\implies V_{\\text{cone}}&=\\dfrac{1}{3}\\pi r^2 h\\end{aligned}", "fallback": "3 × V_cone = πr²h, so V_cone = (1/3)πr²h" },
            "reason": {
              "en": "Pouring three cones of identical base radius r and height h into a matching cylinder fills it to the brim.",
              "ta": "சம ஆரமும் உயரமும் கொண்ட மூன்று கூம்புகளின் அளவு சரியாக ஒரு உருளையை நிரப்புகிறது."
            }
          },
          {
            "title": { "en": "2. Scaling radius vs scaling height", "ta": "2. ஆரம் மற்றும் உயர மாற்றத்தின் விளைவு" },
            "math": { "latex": "\\begin{aligned}V(kr,\\,h)&=k^2(\\pi r^2 h)\\\\V(r,\\,kh)&=k(\\pi r^2 h)\\end{aligned}", "fallback": "Scaling r by k multiplies V by k²; scaling h by k multiplies V by k" },
            "reason": {
              "en": "Radius appears squared in πr²h while height appears to the first power, so radius changes have a quadratic impact.",
              "ta": "சூத்திரத்தில் ஆரம் வர்க்கமாகவும் (r²) உயரம் ஒருபடியாகவும் (h) உள்ளதால் ஆர மாற்றம் இருமடங்குத் தாக்கம் தருகிறது."
            }
          }
        ]
      },
      "question": {
        "en": "If the radius of a right circular cone is doubled while its height stays the same, the new volume becomes how many times the original volume?",
        "ta": "ஒரு நேர் வட்டக் கூம்பின் உயரத்தை மாற்றாமல் ஆரத்தை இரு மடங்காக மாற்றினால், புதிய கன அளவு பழைய கன அளவைப் போல் எத்தனை மடங்காகும்?"
      },
      "questionMath": {
        "latex": "r'=2r,\\;h'=h,\\;V=\\dfrac{1}{3}\\pi r^2 h",
        "fallback": "r' = 2r, h' = h"
      },
      "choices": [
        { "en": "2 times", "ta": "2 மடங்கு", "math": { "latex": "2V", "fallback": "2V" } },
        { "en": "8 times", "ta": "8 மடங்கு", "math": { "latex": "8V", "fallback": "8V" } },
        { "en": "4 times", "ta": "4 மடங்கு", "math": { "latex": "4V", "fallback": "4V" } }
      ],
      "correct": 2,
      "hint": {
        "en": "Substitute 2r in place of r inside (1/3)πr²h: what is (2r)²?",
        "ta": "(1/3)πr²h-இல் r-க்குப் பதிலாக 2r-ஐப் பிரதியிடுங்கள்: (2r)² எவ்வளவு?"
      },
      "incorrectFeedback": [
        {
          "en": "Volume becomes 2 times only when height is doubled; radius is squared, so (2r)² = 4r².",
          "ta": "உயரம் இரு மடங்கானால் மட்டுமே கன அளவு 2 மடங்காகும்; ஆரம் வர்க்கப்படுத்தப்படுவதால் (2r)² = 4r²."
        },
        {
          "en": "8 times happens for a sphere (r³) or when both radius and height are doubled, not radius alone.",
          "ta": "ஆரம் மட்டுமே இரு மடங்காகும்போது 4 மடங்காகும் (கோளத்தில் r³ என்பதால் 8 மடங்காகும்)."
        },
        null
      ],
      "why": {
        "en": "V_new = (1/3)π(2r)²h = 4 × [(1/3)πr²h] = 4V.",
        "ta": "புதிய கன அளவு = (1/3)π(2r)²h = 4 × [(1/3)πr²h] = 4V."
      },
      "whyMath": {
        "latex": "V_{\\text{new}}=\\dfrac{1}{3}\\pi(2r)^2 h=4\\left(\\dfrac{1}{3}\\pi r^2 h\\right)=4V",
        "fallback": "V_new = 4V"
      },
      "explainAfterAttempt": true,
      "connect": {
        "en": "Apply cylinder, embankment, and cone volume formulas in Exercise 7.2 Q1, Q3, and Q5.",
        "ta": "உருளை, கிணற்று மேடை மற்றும் கூம்பு கன அளவுக் கணக்குகளைப் பயிற்சி 7.2 வினாக்கள் 1, 3, 5-இல் தீர்க்கவும்."
      },
      "practiceId": "c10-7-ex7-2-q1",
      "secondaryPracticeId": "c10-7-ex7-2-q3",
      "tertiaryPracticeId": "c10-7-ex7-2-q5"
    },
    {
      "id": "g10-ch7-volumes-sphere-hemisphere",
      "section": "7.3.4–7.3.7",
      "page": { "en": "286–288", "ta": "294–296" },
      "title": {
        "en": "Volumes of solid and hollow spheres and hemispheres",
        "ta": "திண்ம, உள்ளீடற்ற கோளம் மற்றும் அரைக்கோளத்தின் கன அளவுகள்"
      },
      "firstGlance": {
        "en": "Two cones of radius r and height 2r fill one sphere of radius r, giving V = (4/3)πr³. Halving gives a hemisphere (2/3)πr³, and hollow shells subtract r³ from R³.",
        "ta": "r ஆரமும் 2r உயரமும் கொண்ட இரு கூம்புகள் r ஆரமுள்ள ஒரு கோளத்தை நிரப்புவதால் கோளத்தின் கன அளவு (4/3)πr³ ஆகும். அரைக்கோளத்தில் இது பாதி (2/3)πr³; உள்ளீடற்ற ஓடுகளில் R³ − r³ பயன்படும்."
      },
      "rule": {
        "en": "Sphere: (4/3)πr³, Hollow sphere: (4/3)π(R³ − r³); Hemisphere: (2/3)πr³, Hollow hemisphere: (2/3)π(R³ − r³)",
        "ta": "கோளம்: (4/3)πr³, உள்ளீடற்ற கோளம்: (4/3)π(R³ − r³); அரைக்கோளம்: (2/3)πr³, உள்ளீடற்ற அரைக்கோளம்: (2/3)π(R³ − r³)"
      },
      "math": {
        "latex": "\\begin{aligned}&V_{\\text{sphere}}=\\dfrac{4}{3}\\pi r^3\\\\&V_{\\text{hollow sph}}=\\dfrac{4}{3}\\pi(R^3-r^3)\\\\&V_{\\text{hemi}}=\\dfrac{2}{3}\\pi r^3\\\\&V_{\\text{hollow hemi}}=\\dfrac{2}{3}\\pi(R^3-r^3)\\end{aligned}",
        "fallback": "V_sphere = (4/3)πr³, V_hollow_sphere = (4/3)π(R³ - r³), V_hemi = (2/3)πr³, V_hollow_hemi = (2/3)π(R³ - r³)"
      },
      "glanceVisual": "volume-sphere",
      "visual": { "kind": "ch7-lab", "id": "volume-sphere" },
      "understand": {
        "intro": {
          "en": "Because sphere and hemisphere volumes depend on r³, scaling radius by k multiplies volume by k³. For hollow shells (brass spheres, copper shells, bowls), compute outer volume minus inner cavity volume using (R³ − r³).",
          "ta": "கோளம் மற்றும் அரைக்கோளத்தின் கன அளவுகள் r³-ஐச் சார்ந்திருப்பதால், ஆரம் k மடங்கானால் கன அளவு k³ மடங்காகும். உள்ளீடற்ற ஓடுகளில் வெளி மற்றும் உள் கன அளவுகளின் வித்தியாசம் (R³ − r³) கணக்கிடப்படுகிறது."
        },
        "symbols": [
          {
            "symbol": { "latex": "\\dfrac{4}{3}\\pi r^3", "fallback": "(4/3)πr³" },
            "en": "Volume of a solid sphere; note that V/SA = r/3, so V = SA × (r/3).",
            "ta": "திண்மக் கோளத்தின் கன அளவு; V = புறப்பரப்பு × (r/3) எனவும் எழுதலாம்."
          },
          {
            "symbol": { "latex": "\\dfrac{4}{3}\\pi(R^3-r^3)", "fallback": "(4/3)π(R³ - r³)" },
            "en": "Volume of material in a hollow spherical shell of outer radius R and inner radius r.",
            "ta": "உள்ளீடற்ற கோள ஓட்டில் உள்ள பொருளின் கன அளவு (வெளி ஆரம் R, உள் ஆரம் r)."
          },
          {
            "symbol": { "latex": "\\dfrac{2}{3}\\pi(R^3-r^3)", "fallback": "(2/3)π(R³ - r³)" },
            "en": "Volume of material in a hollow hemispherical bowl (half of a hollow sphere).",
            "ta": "உள்ளீடற்ற அரைக்கோளக் கிண்ணத்தின் பொருளின் கன அளவு."
          }
        ],
        "watchOut": {
          "en": "Never write (R − r)³ in place of (R³ − r³)! For R = 5 and r = 3, R³ − r³ = 125 − 27 = 98, whereas (5 − 3)³ = 8.",
          "ta": "(R³ − r³)-க்குப் பதிலாக (R − r)³ எனத் தவறாக எழுதாதீர்கள்! R = 5, r = 3 எனில் R³ − r³ = 125 − 27 = 98 ஆகும், (5 − 3)³ = 8 அல்ல."
        }
      },
      "proof": {
        "figure": "volume-sphere",
        "steps": [
          {
            "title": { "en": "1. Two cones of height 2r equal one sphere", "ta": "1. 2r உயரமுள்ள இரு கூம்புகள் ஒரு கோளத்திற்குச் சமம்" },
            "math": { "latex": "\\begin{aligned}V_{\\text{sphere}}&=2\\left(\\dfrac{1}{3}\\pi r^2(2r)\\right)\\\\&=\\dfrac{4}{3}\\pi r^3\\end{aligned}", "fallback": "V_sphere = 2 × (1/3)πr²(2r) = (4/3)πr³" },
            "reason": {
              "en": "The textbook demonstration matches a sphere of diameter 2r against two cones of radius r and height h = 2r.",
              "ta": "விட்டம் 2r கொண்ட கோளத்தை r ஆரமும் h = 2r உயரமும் கொண்ட இரு கூம்புகளின் கொள்ளளவு நிரப்புகிறது."
            }
          },
          {
            "title": { "en": "2. Equal-base cone, hemisphere, and cylinder ratio 1 : 2 : 3", "ta": "2. சம ஆரம் கொண்ட கூம்பு : அரைக்கோளம் : உருளை = 1 : 2 : 3" },
            "math": { "latex": "\\dfrac{1}{3}\\pi r^3 : \\dfrac{2}{3}\\pi r^3 : \\pi r^3 = 1 : 2 : 3", "fallback": "(1/3)πr³ : (2/3)πr³ : πr³ = 1 : 2 : 3" },
            "reason": {
              "en": "When h = r, cone, hemisphere, and cylinder volumes sit in the clean integer ratio 1 : 2 : 3.",
              "ta": "h = r ஆக இருக்கும்போது கூம்பு, அரைக்கோளம், உருளை ஆகியவற்றின் கன அளவு விகிதம் 1 : 2 : 3 ஆகும்."
            }
          }
        ]
      },
      "question": {
        "en": "If the radii of two solid spheres are in the ratio 2 : 3, what is the ratio of their volumes?",
        "ta": "இரு திண்மக் கோளங்களின் ஆரங்களின் விகிதம் 2 : 3 எனில், அவற்றின் கன அளவுகளின் விகிதம் என்ன?"
      },
      "questionMath": {
        "latex": "r_1:r_2=2:3,\\quad V_1:V_2=\\,?",
        "fallback": "r₁ : r₂ = 2 : 3, V₁ : V₂ = ?"
      },
      "choices": [
        { "en": "8 : 27", "ta": "8 : 27", "math": { "latex": "8:27", "fallback": "8 : 27" } },
        { "en": "4 : 9", "ta": "4 : 9", "math": { "latex": "4:9", "fallback": "4 : 9" } },
        { "en": "2 : 3", "ta": "2 : 3", "math": { "latex": "2:3", "fallback": "2 : 3" } }
      ],
      "correct": 0,
      "hint": {
        "en": "Volume of a sphere is proportional to r³. Cube both 2 and 3.",
        "ta": "கோளத்தின் கன அளவு r³-க்கு நேர்விகிதத்தில் உள்ளது. 2 மற்றும் 3-ஐக் கனப்படுத்துங்கள்."
      },
      "incorrectFeedback": [
        null,
        {
          "en": "4 : 9 is the ratio of their surface areas (2² : 3²), not their volumes (2³ : 3³).",
          "ta": "4 : 9 என்பது புறப்பரப்புகளின் விகிதம் (2² : 3²); கன அளவுகளின் விகிதம் 2³ : 3³ ஆகும்."
        },
        {
          "en": "2 : 3 is the ratio of radii; volumes scale as the cube of the radii.",
          "ta": "2 : 3 என்பது ஆரங்களின் விகிதம் மட்டுமே; கன அளவு ஆரத்தின் கனத்தைப் பொறுத்தது."
        }
      ],
      "why": {
        "en": "V₁ : V₂ = (4/3)πr₁³ : (4/3)πr₂³ = (r₁/r₂)³ = (2/3)³ = 8 : 27.",
        "ta": "V₁ : V₂ = (r₁/r₂)³ = (2/3)³ = 8 : 27."
      },
      "whyMath": {
        "latex": "\\dfrac{V_1}{V_2}=\\left(\\dfrac{r_1}{r_2}\\right)^3=\\left(\\dfrac{2}{3}\\right)^3=\\dfrac{8}{27}",
        "fallback": "V₁ / V₂ = (2/3)³ = 8/27"
      },
      "explainAfterAttempt": true,
      "connect": {
        "en": "Practise sphere ratios and hollow copper shell problems in Exercise 7.2 Q7–Q9.",
        "ta": "கோள கன அளவு விகிதம் மற்றும் உள்ளீடற்ற தாமிரக் கோளக் கணக்குகளைப் பயிற்சி 7.2 வினாக்கள் 7–9-இல் தீர்க்கவும்."
      },
      "practiceId": "c10-7-ex7-2-q7",
      "secondaryPracticeId": "c10-7-ex7-2-q8",
      "tertiaryPracticeId": "c10-7-ex7-2-q9"
    },
    {
      "id": "g10-ch7-combined-solids",
      "video": {"src": "https://pub-ed71b86e97a64b428086e292b26fb7a2.r2.dev/trace-videos/g10-ch7-combined-solids/982f3036f54994d84a02ddda8dce6531fe34130c00577d27a5401d18aa1b201d.mp4", "language": "en", "durationSeconds": 45.12},
      "section": "7.4",
      "page": { "en": "290–294", "ta": "299–302" },
      "title": {
        "en": "Combined solids: exposed surfaces vs total volume",
        "ta": "இணைந்த உருவங்கள்: புலப்படும் புறப்பரப்பு மற்றும் மொத்த கன அளவு"
      },
      "firstGlance": {
        "en": "When solids are joined together, volumes simply add (or subtract if carved out), but surface area counts ONLY the outer faces visible to your eyes—never the hidden glued bases.",
        "ta": "திண்மங்களை இணைக்கும்போது அவற்றின் கன அளவுகள் கூடுகின்றன (குழிவு எனில் கழிக்கப்படும்). ஆனால் புறப்பரப்பு என்பது வெளியே கண்ணுக்குப் புலப்படும் பரப்புகளின் கூடுதல் மட்டுமே—மறைந்த அடிப்பரப்புகளைச் சேர்க்கக் கூடாது."
      },
      "rule": {
        "en": "Volume = sum (or difference for cavities) of parts; Surface Area = sum of ONLY exposed surfaces",
        "ta": "கன அளவு = பகுதிகளின் கூடுதல் (குழிவு எனில் வித்தியாசம்); புறப்பரப்பு = வெளியே புலப்படும் பரப்புகள் மட்டும்"
      },
      "math": {
        "latex": "\\begin{aligned}&\\text{TSA}=\\sum(\\text{Exposed faces})\\\\&V_{\\text{joined}}=V_1+V_2\\\\&V_{\\text{carved}}=V_{\\text{outer}}-V_{\\text{cavity}}\\end{aligned}",
        "fallback": "TSA_combined = sum of exposed surfaces only; V_joined = V₁ + V₂; V_carved = V_outer - V_cavity"
      },
      "glanceVisual": "combined-solids",
      "visual": { "kind": "ch7-lab", "id": "combined-solids" },
      "understand": {
        "intro": {
          "en": "Real objects like ice-cream cones, capsules, tents, funnels, and hollowed blocks combine cylinders, cones, hemispheres, cubes, or frustums. Always sketch the seam where two solids meet before writing the surface area formula.",
          "ta": "மருந்துக் குப்பி, பனிக்கூழ், கூடாரம், புனல், குழிவுத் திண்மம் ஆகியவை இணைந்த உருவங்களாகும். புறப்பரப்பு எழுதும் முன் இரு திண்மங்களும் இணையும் முகப்பைக் கவனியுங்கள்."
        },
        "symbols": [
          {
            "symbol": { "latex": "\\text{CSA}_{1}+\\text{CSA}_{2}", "fallback": "CSA₁ + CSA₂" },
            "en": "For a cone on a hemisphere or a capsule, the glued circular bases disappear inside, leaving only curved surfaces.",
            "ta": "கூம்பு + அரைக்கோளம் அல்லது மருந்துக் குப்பியில் இணைந்த வட்ட அடிப்பரப்புகள் உள்ளே மறைந்துவிடும்; வளைபரப்புகள் மட்டுமே தெரியும்."
          },
          {
            "symbol": { "latex": "6a^2-\\pi r^2+2\\pi r^2", "fallback": "6a² - πr² + 2πr²" },
            "en": "Cube with hemisphere (surmounted OR hollowed out): you lose one flat disc πr² and gain one curved dome 2πr², giving 6a² + πr²!",
            "ta": "கனச்சதுரத்தின் மீது அரைக்கோளம் பொருத்தினாலும் அல்லது குழிவு வெட்டினாலும் ஒரு வட்டப்பரப்பு πr² குறைந்து 2πr² வளைபரப்பு கூடுவதால் 6a² + πr² கிடைக்கும்."
          },
          {
            "symbol": { "latex": "h_{\\text{total}}=h_{\\text{cyl}}+r", "fallback": "h_total = h_cyl + r" },
            "en": "A hemisphere's height equals its radius r, so subtract r (or 2r for two ends) from total length to find the cylinder height.",
            "ta": "அரைக்கோளத்தின் உயரம் அதன் ஆரம் r-க்குச் சமம்; எனவே மொத்த உயரத்திலிருந்து r-ஐக் கழித்து உருளையின் உயரம் காண வேண்டும்."
          }
        ],
        "watchOut": {
          "en": "When a conical cavity is hollowed out of a cylinder, the volume DECREASES (V_cyl − V_cone), but the surface area INCREASES because the inner cone wall is now exposed!",
          "ta": "உருளையிலிருந்து கூம்பு வடிவக் குழிவை வெட்டி எடுக்கும்போது கன அளவு குறையும் (V_உருளை − V_கூம்பு), ஆனால் உள் கூம்புச் சுவர் வெளிப்படுவதால் புறப்பரப்பு அதிகரிக்கும்!"
        }
      },
      "proof": {
        "figure": "combined-solids",
        "steps": [
          {
            "title": { "en": "1. Toy: cylinder surmounted by a hemisphere", "ta": "1. பொம்மை: உருளையின் மீது அரைக்கோளம்" },
            "math": { "latex": "\\begin{aligned}\\text{TSA}&=2\\pi rh+2\\pi r^2+\\pi r^2\\\\&=\\pi r(2h+3r)\\end{aligned}", "fallback": "TSA = 2πrh + 2πr² + πr² = πr(2h + 3r)" },
            "reason": {
              "en": "Exposed faces are the cylinder's curved wall (2πrh), the bottom base (πr²), and the top hemisphere dome (2πr²); the glued middle disc is hidden.",
              "ta": "உருளையின் வளைபரப்பு (2πrh), அடிப்பரப்பு (πr²), மற்றும் அரைக்கோள வளைபரப்பு (2πr²) ஆகியவை மட்டுமே வெளியே தெரிகின்றன."
            }
          },
          {
            "title": { "en": "2. Conical cavity hollowed from a solid cylinder", "ta": "2. உருளையில் கூம்பு வடிவக் குழிவு" },
            "math": { "latex": "\\begin{aligned}\\text{TSA}&=\\pi r(2h+l+r)\\\\V&=\\pi r^2 h-\\dfrac{1}{3}\\pi r^2 h=\\dfrac{2}{3}\\pi r^2 h\\end{aligned}", "fallback": "TSA = πr(2h + l + r), V = (2/3)πr²h" },
            "reason": {
              "en": "The top lid is removed, exposing the inner cone wall πrl while keeping the outer wall and bottom base.",
              "ta": "மேல் வட்டம் நீக்கப்பட்டு உள் கூம்பின் வளைபரப்பு πrl புதிதாக வெளிப்படுகிறது."
            }
          }
        ]
      },
      "question": {
        "en": "A hemispherical depression of diameter 7 cm is cut out from one face of a cubical block of side 7 cm. What is the surface area of the remaining solid?",
        "ta": "7 செ.மீ பக்க அளவுள்ள கனச்சதுரத்தின் ஒரு முகப்பிலிருந்து 7 செ.மீ விட்டமுள்ள அரைக்கோளக் குழிவு வெட்டி எடுக்கப்பட்டால், மீதமுள்ள திண்மத்தின் புறப்பரப்பு என்ன?"
      },
      "questionMath": {
        "latex": "a=7\\text{ cm},\\;r=\\dfrac{7}{2}\\text{ cm}",
        "fallback": "a = 7 cm, r = 7/2 cm"
      },
      "choices": [
        { "en": "6a² − 2πr²", "ta": "6a² − 2πr²", "math": { "latex": "6a^2-2\\pi r^2", "fallback": "6a² - 2πr²" } },
        { "en": "6a² + πr²", "ta": "6a² + πr²", "math": { "latex": "6a^2+\\pi r^2", "fallback": "6a² + πr²" } },
        { "en": "6a² + 2πr²", "ta": "6a² + 2πr²", "math": { "latex": "6a^2+2\\pi r^2", "fallback": "6a² + 2πr²" } }
      ],
      "correct": 1,
      "hint": {
        "en": "Start with 6a², subtract the circular hole (−πr²) on the top face, and add the inner hemisphere wall (+2πr²).",
        "ta": "6a²-லிருந்து மேல் முகப்பில் வெட்டப்பட்ட வட்டப் பரப்பை (−πr²) கழித்து, உள் அரைக்கோள வளைபரப்பை (+2πr²) கூட்டுங்கள்."
      },
      "incorrectFeedback": [
        {
          "en": "Carving a hollow bowl creates new exposed surface area inside—it does not reduce total surface area!",
          "ta": "குழிவு வெட்டும்போது உள்ளே புதிய பரப்பு உருவாவதால் மொத்தப் புறப்பரப்பு குறையாது, கூடும்!"
        },
        null,
        {
          "en": "6a² + 2πr² forgets to subtract the circular opening πr² removed from the cube's top face.",
          "ta": "6a² + 2πr² என்பது கனச்சதுர முகப்பில் நீக்கப்பட்ட வட்டப்பரப்பு πr²-ஐக் கழிக்க மறந்துவிட்டது."
        }
      ],
      "why": {
        "en": "Remaining T.S.A. = 6a² − πr² + 2πr² = 6a² + πr².",
        "ta": "மீதமுள்ள திண்மத்தின் புறப்பரப்பு = 6a² − πr² + 2πr² = 6a² + πr²."
      },
      "whyMath": {
        "latex": "\\text{TSA}=6a^2-\\pi r^2+2\\pi r^2=6a^2+\\pi r^2",
        "fallback": "TSA = 6a² + πr²"
      },
      "explainAfterAttempt": true,
      "connect": {
        "en": "Apply exposed surface area and combined volume in Exercise 7.3 Q1, Q4, and Q6.",
        "ta": "இணைந்த உருவங்களின் கொள்ளளவு மற்றும் புறப்பரப்பைப் பயிற்சி 7.3 வினாக்கள் 1, 4, 6-இல் தீர்க்கவும்."
      },
      "practiceId": "c10-7-ex7-3-q1",
      "secondaryPracticeId": "c10-7-ex7-3-q4",
      "tertiaryPracticeId": "c10-7-ex7-3-q6"
    },
    {
      "id": "g10-ch7-conversion-volume-conservation",
      "video": {"src": "https://pub-ed71b86e97a64b428086e292b26fb7a2.r2.dev/trace-videos/g10-ch7-conversion-volume-conservation/7fc65fdb191b0219f84c611501a1eadcfbc123ccc3922b6e7103450422b4941e.mp4", "language": "en", "durationSeconds": 47.04},
      "section": "7.5",
      "page": { "en": "295–297", "ta": "303–305" },
      "title": {
        "en": "Conversion of solids and flow with volume conservation",
        "ta": "கன அளவு மாறாமல் திண்ம உருமாற்றம் மற்றும் நீர்வரத்து"
      },
      "firstGlance": {
        "en": "When metal is melted and recast or liquid is poured without spilling, shape and surface area change, but total volume stays constant: V_before = V_after.",
        "ta": "உலோகத்தை உருக்கி மற்றொரு உருவமாக மாற்றும்போதும், நீரைச் சிந்தாமல் ஊற்றும்போதும் வடிவமும் புறப்பரப்பும் மாறினாலும் மொத்தக் கன அளவு மாறாது: V_முன்பு = V_பின்பு."
      },
      "rule": {
        "en": "V_before = V_after, n × V_small = V_large, and pipe flow volume = Cross-sectional Area × Speed × Time",
        "ta": "V_முன்பு = V_பின்பு, n × V_சிறியது = V_பெரியது, மற்றும் குழாய் நீர் அளவு = குறுக்குவெட்டுப் பரப்பு × வேகம் × நேரம்"
      },
      "math": {
        "latex": "\\begin{aligned}&V_{\\text{before}}=V_{\\text{after}}\\\\&n\\cdot V_{\\text{small}}=V_{\\text{large}}\\\\&V_{\\text{flow}}=(\\pi r^2)\\cdot v\\cdot t\\end{aligned}",
        "fallback": "V_before = V_after, n · V_small = V_large, V_flow = (πr²) · v · t"
      },
      "glanceVisual": "volume-conservation",
      "visual": { "kind": "ch7-lab", "id": "volume-conservation" },
      "understand": {
        "intro": {
          "en": "Imagine twelve 1 cm³ cubes stacked 4 per layer (3 layers) and rebuilt as 6 per layer (2 layers): the height and surface area change, yet both stacks occupy 12 cm³. The same conservation law solves melting/recasting and pipe-filling problems.",
          "ta": "தலா 1 செ.மீ³ கொண்ட 12 கனச்சதுரங்களை 4 × 3 அடுக்காகவும் 6 × 2 அடுக்காகவும் அடுக்கினால் உயரமும் புறப்பரப்பும் மாறும்; ஆனால் கன அளவு 12 செ.மீ³ மாறாது. இதே தத்துவமே உருக்கி மாற்றும் மற்றும் குழாய் கணக்குகளுக்குப் பயன்படுகிறது."
        },
        "symbols": [
          {
            "symbol": { "latex": "V_{\\text{before}}=V_{\\text{after}}", "fallback": "V_before = V_after" },
            "en": "Equate the volumes before and after conversion; π often cancels on both sides!",
            "ta": "மாற்றத்திற்கு முன்பும் பின்பும் உள்ள கன அளவுகளைச் சமப்படுத்துங்கள்; இருபுறமும் π பெரும்பாலும் நீங்கும்."
          },
          {
            "symbol": { "latex": "n=\\dfrac{V_{\\text{large}}}{V_{\\text{small}}}", "fallback": "n = V_large / V_small" },
            "en": "Number of identical small spheres, cones, or coins formed from one large solid.",
            "ta": "ஒரு பெரிய திண்மத்திலிருந்து கிடைக்கும் சிறிய உருவங்களின் எண்ணிக்கை n."
          },
          {
            "symbol": { "latex": "Q=\\pi r^2 v", "fallback": "Q = πr²v" },
            "en": "Volume per unit time flowing through a circular pipe of radius r at speed v (convert km/h to m/h or cm/s).",
            "ta": "r ஆரமுள்ள குழாயில் v வேகத்தில் ஓர் அலகு நேரத்தில் பாயும் நீரின் கன அளவு (அலகுகளைச் சீராக்கவும்)."
          }
        ],
        "watchOut": {
          "en": "Surface area is NOT conserved during melting or reshaping—never equate T.S.A. before and after! Only volume is conserved.",
          "ta": "உருக்கி மாற்றும்போது புறப்பரப்பு மாறாமல் இருக்காது—கன அளவை மட்டுமே சமப்படுத்த வேண்டும்!"
        }
      },
      "proof": {
        "figure": "volume-conservation",
        "steps": [
          {
            "title": { "en": "1. Same volume, new dimensions: π cancels cleanly", "ta": "1. மாறா கன அளவு: இருபுறமும் π நீங்குதல்" },
            "math": { "latex": "\\begin{aligned}\\dfrac{4}{3}\\pi R^3&=\\pi r^2 H\\\\\\implies H&=\\dfrac{4R^3}{3r^2}\\end{aligned}", "fallback": "(4/3)πR³ = πr²H gives H = 4R³/(3r²)" },
            "reason": {
              "en": "Equating sphere volume to cylinder volume lets us cancel π before doing arithmetic.",
              "ta": "கோளத்தின் கன அளவையும் உருளையின் கன அளவையும் சமப்படுத்தும்போது π இருபுறமும் நீங்கி கணக்கீடு எளிதாகிறது."
            }
          },
          {
            "title": { "en": "2. Water flowing through a pipe acts like a moving cylinder", "ta": "2. குழாயில் பாயும் நீர் நகரும் உருளை போன்றது" },
            "math": { "latex": "\\begin{aligned}\\text{Distance}&=v\\cdot t\\\\\\implies V_{\\text{inflow}}&=\\pi r^2(vt)\\end{aligned}", "fallback": "V_inflow = πr²(vt)" },
            "reason": {
              "en": "In time t, water travels distance v·t, forming a cylinder of cross-sectional area πr² and length v·t.",
              "ta": "t நேரத்தில் நீர் செல்லும் தொலைவு v·t என்பதால், குழாயில் வரும் நீர் πr² அடிப்பரப்பும் v·t நீளமும் கொண்ட உருளையாகும்."
            }
          }
        ]
      },
      "question": {
        "en": "A solid sphere of radius R = 6 cm is melted and recast into identical small spheres of radius r = 2 cm. How many small spheres are formed?",
        "ta": "6 செ.மீ ஆரமுள்ள ஒரு திண்மக் கோளம் உருக்கப்பட்டு 2 செ.மீ ஆரமுள்ள சிறிய கோளங்களாக மாற்றப்பட்டால் எத்தனை சிறிய கோளங்கள் கிடைக்கும்?"
      },
      "questionMath": {
        "latex": "R=6\\text{ cm},\\;r=2\\text{ cm},\\;n=\\dfrac{\\frac{4}{3}\\pi R^3}{\\frac{4}{3}\\pi r^3}",
        "fallback": "R = 6 cm, r = 2 cm, n = R³ / r³"
      },
      "choices": [
        { "en": "3 small spheres", "ta": "3 சிறிய கோளங்கள்", "math": { "latex": "3", "fallback": "3" } },
        { "en": "9 small spheres", "ta": "9 சிறிய கோளங்கள்", "math": { "latex": "9", "fallback": "9" } },
        { "en": "27 small spheres", "ta": "27 சிறிய கோளங்கள்", "math": { "latex": "27", "fallback": "27" } }
      ],
      "correct": 2,
      "hint": {
        "en": "Both (4/3) and π cancel, leaving n = (R/r)³ = (6/2)³.",
        "ta": "(4/3)π இருபுறமும் நீங்குவதால் n = (R/r)³ = (6/2)³ கிடைக்கும்."
      },
      "incorrectFeedback": [
        {
          "en": "3 is just R/r = 6/2; volume depends on the cube of the radius, not the radius itself.",
          "ta": "3 என்பது R/r மட்டுமே; கன அளவு ஆரத்தின் கனத்தைச் (r³) சார்ந்தது."
        },
        {
          "en": "9 is (6/2)² from comparing areas; spheres have 3D volume proportional to r³.",
          "ta": "9 என்பது (6/2)² ஆகும்; கோளத்தின் கன அளவிற்கு (6/2)³ கணக்கிட வேண்டும்."
        },
        null
      ],
      "why": {
        "en": "n = ((4/3)π × 6³) / ((4/3)π × 2³) = 6³ / 2³ = 3³ = 27 small spheres.",
        "ta": "n = 6³ / 2³ = 216 / 8 = 27 சிறிய கோளங்கள்."
      },
      "whyMath": {
        "latex": "n=\\dfrac{6^3}{2^3}=3^3=27",
        "fallback": "n = 6³/2³ = 27"
      },
      "explainAfterAttempt": true,
      "connect": {
        "en": "Apply volume conservation to recasting, pipe flow, and water transfer in Exercise 7.4 and Exercise 7.5.",
        "ta": "உருமாற்றம் மற்றும் குழாய் நீர்வரத்துக் கணக்குகளைப் பயிற்சி 7.4 மற்றும் 7.5-இல் தீர்க்கவும்."
      },
      "practiceId": "c10-7-ex7-4-q1",
      "secondaryPracticeId": "c10-7-ex7-4-q2",
      "tertiaryPracticeId": "c10-7-ex7-5-q12"
    }
  ]
};
})();
