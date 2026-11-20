/* VER Triggle | Grade 10 Chapter 6 | Trigonometry — Textbook-Order Interactive Concept Studio.
 * Original learning explanations, interactive right-triangle & heights-and-distances labs, visual proofs, and transfer checks.
 * Grounded in Tamil Nadu Standard Ten Mathematics, revised 2025, Chapter 6 (pp. 239–268 EN / pp. 247–276 TA).
 * Tamil copy is an initial authored draft using 2025 textbook terminology; independent Tamil editorial review pending.
 * No network, tracking, account, autoplay, or worked-example clutter. */
(()=>{'use strict';
window.TRIGGLE_G10_CH6_PATH={
  "chapterId": "g10-ch6",
  "source": "Tamil Nadu Standard Ten Mathematics, revised 2025, Ch 6 pp. 239–268 (EN) & pp. 247–276 (TA)",
  "tamilStatus": "draft, editorial review pending",
  "stages": [
    {
      "id": "g10-ch6-trig-ratios",
      "section": "6.1",
      "title": {
        "en": "Six trigonometric ratios in a right triangle",
        "ta": "செங்கோண முக்கோணத்தில் ஆறு முக்கோணவியல் விகிதங்கள்"
      },
      "firstGlance": {
        "en": "In any right triangle, the six trigonometric ratios compare pairs of sides relative to acute angle θ and stay identical whenever θ stays fixed, no matter how large or small the triangle is drawn.",
        "ta": "எந்தவொரு செங்கோண முக்கோணத்திலும் குறுங்கோணம் θ-வைப் பொறுத்து பக்கங்களின் விகிதங்கள் முக்கோணத்தின் அளவைச் சார்ந்து மாறாமல் ஒரே மதிப்பைப் பெறுகின்றன."
      },
      "rule": {
        "en": "sin θ = Opp/Hyp, cos θ = Adj/Hyp, tan θ = Opp/Adj, and their reciprocals cosec θ, sec θ, cot θ",
        "ta": "sin θ = எதிர்ப்பக்கம்/கர்ணம், cos θ = அடுத்துள்ள பக்கம்/கர்ணம், tan θ = எதிர்ப்பக்கம்/அடுத்துள்ள பக்கம் மற்றும் தலைகீழிகள்"
      },
      "math": {
        "latex": "\\begin{aligned}&\\sin\\theta=\\dfrac{\\text{Opp}}{\\text{Hyp}},\\;\\operatorname{cosec}\\theta=\\dfrac{\\text{Hyp}}{\\text{Opp}}\\\\&\\cos\\theta=\\dfrac{\\text{Adj}}{\\text{Hyp}},\\;\\sec\\theta=\\dfrac{\\text{Hyp}}{\\text{Adj}}\\\\&\\tan\\theta=\\dfrac{\\text{Opp}}{\\text{Adj}},\\;\\cot\\theta=\\dfrac{\\text{Adj}}{\\text{Opp}}\\end{aligned}",
        "fallback": "sin θ = Opp/Hyp, cos θ = Adj/Hyp, tan θ = Opp/Adj; cosec θ = Hyp/Opp, sec θ = Hyp/Adj, cot θ = Adj/Opp"
      },
      "glanceVisual": "trig-ratios",
      "visual": { "kind": "ch6-lab", "id": "trig-ratios" },
      "understand": {
        "intro": {
          "en": "For acute angle θ (0° < θ < 90°) at O in right-angled △OMP (right angle at M), MP faces θ (Opposite), OM sits beside θ (Adjacent), and OP faces 90° (Hypotenuse).",
          "ta": "M-இல் செங்கோணம் கொண்ட △OMP-இல் θ-க்கு எதிரே உள்ள MP எதிர்ப்பக்கம், அருகிலுள்ள OM அடுத்துள்ள பக்கம், மற்றும் 90°-க்கு எதிரே உள்ள OP கர்ணம் ஆகும்."
        },
        "symbols": [
          {
            "symbol": { "latex": "\\text{Opp}\\;(MP)", "fallback": "Opp (MP)" },
            "en": "Side opposite to angle θ—always across the triangle from vertex O.",
            "ta": "கோணம் θ-க்கு நேர் எதிரே உள்ள பக்கம் (MP)."
          },
          {
            "symbol": { "latex": "\\text{Adj}\\;(OM)", "fallback": "Adj (OM)" },
            "en": "The non-hypotenuse leg touching angle θ between vertex O and the right angle M.",
            "ta": "கோணம் θ-வையும் செங்கோணம் M-ஐயும் இணைக்கும் அடுத்துள்ள பக்கம் (OM)."
          },
          {
            "symbol": { "latex": "\\text{Hyp}\\;(OP)", "fallback": "Hyp (OP)" },
            "en": "Longest side, always opposite the 90° angle, so sin θ and cos θ stay strictly less than 1 for 0° < θ < 90°.",
            "ta": "செங்கோணத்திற்கு எதிரே உள்ள மிக நீளமான பக்கம் கர்ணம் (OP); எனவே 0° < θ < 90°-க்கு sin θ, cos θ எப்போதும் 1-ஐ விடக் குறைவு."
          }
        ],
        "watchOut": {
          "en": "Do not lock 'Opposite' onto vertical lines forever! Opposite depends on WHICH acute angle θ you pick—switching from ∠O to ∠P swaps Opposite and Adjacent.",
          "ta": "எதிர்ப்பக்கம் என்பது எப்போதும் செங்குத்துப் பக்கமல்ல! எந்தக் கோணம் θ-வை எடுத்துக்கொள்கிறோமோ, அதற்கு எதிரே உள்ள பக்கமே எதிர்ப்பக்கம்."
        }
      },
      "proof": {
        "figure": "trig-ratios",
        "steps": [
          {
            "title": { "en": "1. All right triangles with acute angle θ are similar", "ta": "1. θ கோணம் கொண்ட எல்லா செங்கோண முக்கோணங்களும் வடிவொத்தவை" },
            "math": { "latex": "\\begin{aligned}&\\triangle OMP\\sim\\triangle OM'P'\\quad(\\text{AA})\\\\&\\implies \\dfrac{MP}{OP}=\\dfrac{M'P'}{OP'}\\end{aligned}", "fallback": "△OMP ~ △OM'P' by AA similarity, so MP/OP = M'P'/OP'" },
            "reason": {
              "en": "Both triangles share angle θ and a 90° right angle, so scaling the triangle by k multiplies every side by k and k/k cancels to 1.",
              "ta": "θ மற்றும் 90° ஆகிய இரு கோணங்களும் சமமாதலால் AA விதிப்படி முக்கோணங்கள் வடிவொத்தவை; எனவே அளவு k மாறினாலும் விகிதம் மாறாது."
            }
          },
          {
            "title": { "en": "2. Reciprocals reverse numerator and denominator", "ta": "2. தலைகீழ் விகிதங்கள் பகுதியையும் தொகுதியையும் மாற்றுகின்றன" },
            "math": { "latex": "\\begin{aligned}&\\sin\\theta\\cdot\\operatorname{cosec}\\theta=\\dfrac{MP}{OP}\\cdot\\dfrac{OP}{MP}=1\\\\&\\cos\\theta\\cdot\\sec\\theta=1,\\quad \\tan\\theta\\cdot\\cot\\theta=1\\end{aligned}", "fallback": "sin θ · cosec θ = (MP/OP)(OP/MP) = 1; similarly cos θ · sec θ = 1 and tan θ · cot θ = 1" },
            "reason": {
              "en": "Each reciprocal ratio flips the side fraction upside down whenever the denominator side is non-zero.",
              "ta": "பகுதி பூச்சியமற்றதாக இருக்கும்போது ஒவ்வொரு தலைகீழ் விகிதமும் பின்னத்தைத் தலைகீழாக்குகிறது."
            }
          }
        ]
      },
      "question": {
        "en": "In right-angled △ABC (∠B = 90°), side AB = 5 cm, BC = 12 cm, and hypotenuse AC = 13 cm. What is sin C?",
        "ta": "செங்கோண முக்கோணம் △ABC (∠B = 90°)-இல் AB = 5 செ.மீ, BC = 12 செ.மீ, AC = 13 செ.மீ எனில் sin C எவ்வளவு?"
      },
      "questionMath": {
        "latex": "\\angle B=90^\\circ,\\;AB=5,\\;BC=12,\\;AC=13",
        "fallback": "∠B = 90°, AB = 5, BC = 12, AC = 13"
      },
      "choices": [
        { "en": "5/13", "ta": "5/13", "math": { "latex": "\\dfrac{5}{13}", "fallback": "5/13" } },
        { "en": "12/13", "ta": "12/13", "math": { "latex": "\\dfrac{12}{13}", "fallback": "12/13" } },
        { "en": "5/12", "ta": "5/12", "math": { "latex": "\\dfrac{5}{12}", "fallback": "5/12" } }
      ],
      "correct": 0,
      "hint": {
        "en": "Stand at vertex C and look across the triangle: which side is directly opposite ∠C?",
        "ta": "உச்சி C-இலிருந்து எதிர் பக்கத்தைப் பாருங்கள்: ∠C-க்கு எதிரே உள்ள பக்கம் எது?"
      },
      "incorrectFeedback": [
        null,
        {
          "en": "12/13 uses BC, which sits next to angle C (adjacent = cos C), not opposite angle C!",
          "ta": "12/13 என்பது ∠C-க்கு அடுத்துள்ள பக்கம் BC-ஐப் பயன்படுத்துகிறது; அது cos C ஆகும்."
        },
        {
          "en": "5/12 is Opp/Adj = tan C; sin C divides Opposite by the Hypotenuse AC = 13.",
          "ta": "5/12 என்பது எதிர்ப்பக்கம்/அடுத்துள்ள பக்கம் = tan C; sin C-க்கு கர்ணம் 13-ஆல் வகுக்க வேண்டும்."
        }
      ],
      "why": {
        "en": "For angle C, the opposite side is AB = 5 cm and the hypotenuse is AC = 13 cm. Therefore sin C = Opp/Hyp = 5/13.",
        "ta": "கோணம் C-க்கு எதிர்ப்பக்கம் AB = 5 செ.மீ, கர்ணம் AC = 13 செ.மீ. எனவே sin C = 5/13."
      },
      "whyMath": {
        "latex": "\\sin C=\\dfrac{AB}{AC}=\\dfrac{5}{13}",
        "fallback": "sin C = AB/AC = 5/13"
      },
      "explainAfterAttempt": true,
      "connect": {
        "en": "Before applying identities in Exercises 6.1 and 6.5, knowing exactly which pair of sides each ratio represents lets you spot cancellations and reciprocals on sight.",
        "ta": "பயிற்சி 6.1 மற்றும் 6.5 கணக்குகளில் முக்கோணவியல் விகிதங்களின் தலைகீழ் உறவுகள் உடனடியாகச் சுருக்க உதவுகின்றன."
      },
      "practiceId": "c10-6-6-5-14",
      "relatedExercise": "6.1 & 6.5"
    },
    {
      "id": "g10-ch6-quotient-reciprocal",
      "section": "6.1",
      "title": {
        "en": "Quotient and reciprocal links between the six ratios",
        "ta": "விகிதங்களுக்கு இடையேயான ஈவு மற்றும் தலைகீழ் தொடர்புகள்"
      },
      "firstGlance": {
        "en": "Once you know sin θ and cos θ, you get all remaining four ratios automatically by dividing or flipping them.",
        "ta": "sin θ மற்றும் cos θ தெரிந்தாலே வகுத்தல் மற்றும் தலைகீழ் மூலம் மற்ற நான்கு விகிதங்களையும் உடனே பெறலாம்."
      },
      "rule": {
        "en": "tan θ = sin θ / cos θ, cot θ = cos θ / sin θ, cosec θ = 1 / sin θ, sec θ = 1 / cos θ",
        "ta": "tan θ = sin θ / cos θ, cot θ = cos θ / sin θ, cosec θ = 1 / sin θ, sec θ = 1 / cos θ"
      },
      "math": {
        "latex": "\\begin{aligned}&\\tan\\theta=\\dfrac{\\sin\\theta}{\\cos\\theta},\\quad \\cot\\theta=\\dfrac{\\cos\\theta}{\\sin\\theta}\\\\&\\operatorname{cosec}\\theta=\\dfrac{1}{\\sin\\theta},\\quad \\sec\\theta=\\dfrac{1}{\\cos\\theta}\\end{aligned}",
        "fallback": "tan θ = sin θ / cos θ, cot θ = cos θ / sin θ, cosec θ = 1 / sin θ, sec θ = 1 / cos θ"
      },
      "glanceVisual": "quotient-reciprocal",
      "visual": { "kind": "ch6-lab", "id": "quotient-reciprocal" },
      "understand": {
        "intro": {
          "en": "Scaling any right triangle so Hypotenuse OP = 1 makes Opp = sin θ and Adj = cos θ directly—turning tan θ, sec θ, cosec θ, and cot θ into simple ratios of those two numbers.",
          "ta": "கர்ணம் OP = 1 என எடுத்துக்கொண்டால், எதிர்ப்பக்கம் = sin θ மற்றும் அடுத்துள்ள பக்கம் = cos θ ஆகும்; மற்ற நான்கு விகிதங்களும் இவற்றிலிருந்தே பிறக்கின்றன."
        },
        "symbols": [
          {
            "symbol": { "latex": "\\tan\\theta=\\dfrac{\\sin\\theta}{\\cos\\theta}", "fallback": "tan θ = sin θ / cos θ" },
            "en": "Dividing Opp/Hyp by Adj/Hyp cancels Hyp cleanly, leaving Opp/Adj.",
            "ta": "(எதிர்ப்பக்கம்/கர்ணம்) ÷ (அடுத்துள்ள பக்கம்/கர்ணம்) = எதிர்ப்பக்கம்/அடுத்துள்ள பக்கம்."
          },
          {
            "symbol": { "latex": "\\cot\\theta=\\dfrac{1}{\\tan\\theta}=\\dfrac{\\cos\\theta}{\\sin\\theta}", "fallback": "cot θ = 1/tan θ = cos θ/sin θ" },
            "en": "Reciprocal of tan θ, putting cos θ on top and sin θ below.",
            "ta": "tan θ-இன் தலைகீழி; cos θ தொகுதியிலும் sin θ பகுதியிலும் இருக்கும்."
          },
          {
            "symbol": { "latex": "\\sec\\theta,\\;\\operatorname{cosec}\\theta", "fallback": "sec θ, cosec θ" },
            "en": "Remember the 'co' rule for reciprocals: sec (no 'co') pairs with cos (has 'co'), while cosec pairs with sin.",
            "ta": "தலைகீழி நினைவுக் குறிப்பு: sin ↔ cosec மற்றும் cos ↔ sec ('co' ஒன்றுக்கு மட்டும் வரும்)."
          }
        ],
        "watchOut": {
          "en": "Never write sec θ = 1/sin θ! Notice the opposite 'co-' pairing: sec θ = 1/cos θ and cosec θ = 1/sin θ.",
          "ta": "sec θ = 1/sin θ எனத் தவறாக எழுதாதீர்கள்! sec θ = 1/cos θ மற்றும் cosec θ = 1/sin θ என்பதே சரி."
        }
      },
      "proof": {
        "figure": "quotient-reciprocal",
        "steps": [
          {
            "title": { "en": "1. Cancel the hypotenuse inside sin θ / cos θ", "ta": "1. sin θ / cos θ-இல் கர்ணத்தை நீக்குதல்" },
            "math": { "latex": "\\begin{aligned}\\dfrac{\\sin\\theta}{\\cos\\theta}&=\\dfrac{MP/OP}{OM/OP}\\\\&=\\dfrac{MP}{OM}=\\tan\\theta\\end{aligned}", "fallback": "(MP/OP)/(OM/OP) = MP/OM = tan θ" },
            "reason": {
              "en": "Both sin θ and cos θ share the same non-zero denominator OP (hypotenuse), which cancels out when dividing.",
              "ta": "sin θ மற்றும் cos θ இரண்டின் பகுதியிலும் ஒரே கர்ணம் OP உள்ளதால் வகுக்கும்போது OP நீங்கி MP/OM = tan θ கிடைக்கிறது."
            }
          },
          {
            "title": { "en": "2. Express everything in sin θ and cos θ to simplify expressions", "ta": "2. அனைத்து விகிதங்களையும் sin θ, cos θ வடிவில் மாற்றுதல்" },
            "math": { "latex": "\\begin{aligned}\\cot\\theta+\\tan\\theta&=\\dfrac{\\cos\\theta}{\\sin\\theta}+\\dfrac{\\sin\\theta}{\\cos\\theta}\\\\&=\\dfrac{\\cos^2\\theta+\\sin^2\\theta}{\\sin\\theta\\cos\\theta}\\end{aligned}", "fallback": "cot θ + tan θ = cos θ/sin θ + sin θ/cos θ = (cos²θ + sin²θ)/(sin θ cos θ)" },
            "reason": {
              "en": "Converting unfamiliar ratios into sin θ and cos θ puts fractions over a single common denominator ready for Pythagoras.",
              "ta": "எல்லா விகிதங்களையும் sin θ, cos θ-ஆக மாற்றும்போது பொதுப் பகுதி கிடைத்து சுருக்குவது எளிதாகிறது."
            }
          }
        ]
      },
      "question": {
        "en": "Which expression is always equal to tan θ · cos θ for 0° < θ < 90°?",
        "ta": "0° < θ < 90° எனும்போது tan θ · cos θ என்பதற்கு எப்போதும் சமமானது எது?"
      },
      "questionMath": {
        "latex": "\\tan\\theta\\cdot\\cos\\theta=\\;?",
        "fallback": "tan θ · cos θ = ?"
      },
      "choices": [
        { "en": "cosec θ", "ta": "cosec θ", "math": { "latex": "\\operatorname{cosec}\\theta", "fallback": "cosec θ" } },
        { "en": "sin θ", "ta": "sin θ", "math": { "latex": "\\sin\\theta", "fallback": "sin θ" } },
        { "en": "cot θ", "ta": "cot θ", "math": { "latex": "\\cot\\theta", "fallback": "cot θ" } }
      ],
      "correct": 1,
      "hint": {
        "en": "Replace tan θ with sin θ / cos θ and cancel the matching factor.",
        "ta": "tan θ-க்குப் பதிலாக sin θ / cos θ எனப் பிரதியிட்டுப் பொது உறுப்பை நீக்குங்கள்."
      },
      "incorrectFeedback": [
        {
          "en": "cosec θ = 1/sin θ is the reciprocal of sin θ, whereas cos θ cancels from the denominator leaving sin θ on top.",
          "ta": "cosec θ என்பது 1/sin θ; இங்கு பகுதி cos θ நீங்கித் தொகுதியில் sin θ மட்டுமே நிற்கும்."
        },
        null,
        {
          "en": "cot θ = cos θ / sin θ; here cos θ is multiplied in the numerator, not divided.",
          "ta": "cot θ = cos θ / sin θ; இங்கு cos θ பெருக்கப்படுவதால் அது நீங்கிவிடும்."
        }
      ],
      "why": {
        "en": "Since tan θ = sin θ / cos θ and cos θ ≠ 0, multiplying by cos θ cancels cos θ cleanly: (sin θ / cos θ) · cos θ = sin θ.",
        "ta": "tan θ = sin θ / cos θ என்பதால் cos θ-ஆல் பெருக்கும்போது cos θ நீங்கி sin θ கிடைக்கிறது."
      },
      "whyMath": {
        "latex": "\\left(\\dfrac{\\sin\\theta}{\\cos\\theta}\\right)\\cos\\theta=\\sin\\theta",
        "fallback": "(sin θ / cos θ) cos θ = sin θ"
      },
      "explainAfterAttempt": true,
      "connect": {
        "en": "Rewriting tan θ and cot θ in terms of sin θ and cos θ immediately unlocks Exercise 6.1 Q1(i) and Exercise 6.5 Q2.",
        "ta": "பயிற்சி 6.1 வினா 1(i) மற்றும் பயிற்சி 6.5 வினா 2 ஆகியவற்றில் sin θ, cos θ மாற்றம் நேரடித் தீர்வைத் தருகிறது."
      },
      "practiceId": "c10-6-6-1-1",
      "secondaryPracticeId": "c10-6-6-5-14",
      "relatedExercise": "6.1 & 6.5"
    },
    {
      "id": "g10-ch6-complementary-angles",
      "section": "6.1",
      "title": {
        "en": "Trigonometric ratios of complementary angles (90° − θ)",
        "ta": "நிரப்புக் கோணங்களின் முக்கோணவியல் விகிதங்கள் (90° − θ)"
      },
      "firstGlance": {
        "en": "In a right triangle, the two acute angles add up to 90°, so switching from θ to 90° − θ simply swaps 'opposite' and 'adjacent' and pairs each ratio with its 'co-' partner.",
        "ta": "செங்கோண முக்கோணத்தில் இரு குறுங்கோணங்களின் கூடுதல் 90°; எனவே θ-விலிருந்து (90° − θ)-க்கு மாறும்போது எதிர்ப்பக்கமும் அடுத்துள்ள பக்கமும் இடமாறுகின்றன."
      },
      "rule": {
        "en": "sin(90°−θ) = cos θ, cos(90°−θ) = sin θ, tan(90°−θ) = cot θ (and reciprocals)",
        "ta": "sin(90°−θ) = cos θ, cos(90°−θ) = sin θ, tan(90°−θ) = cot θ (மற்றும் தலைகீழிகள்)"
      },
      "math": {
        "latex": "\\begin{aligned}&\\sin(90^\\circ-\\theta)=\\cos\\theta\\\\&\\cos(90^\\circ-\\theta)=\\sin\\theta\\\\&\\tan(90^\\circ-\\theta)=\\cot\\theta\\\\&\\cot(90^\\circ-\\theta)=\\tan\\theta\\\\&\\sec(90^\\circ-\\theta)=\\operatorname{cosec}\\theta\\\\&\\operatorname{cosec}(90^\\circ-\\theta)=\\sec\\theta\\end{aligned}",
        "fallback": "sin(90°−θ)=cos θ, cos(90°−θ)=sin θ, tan(90°−θ)=cot θ, cot(90°−θ)=tan θ, sec(90°−θ)=cosec θ, cosec(90°−θ)=sec θ"
      },
      "glanceVisual": "complementary-angles",
      "visual": { "kind": "ch6-lab", "id": "complementary-angles" },
      "understand": {
        "intro": {
          "en": "In rectangle OPQR inside a radius-1 semicircle (2025 Fig. 6.2), diagonal OQ = 1 makes ∠QOP = θ and alternate interior angle ∠QOR = 90° − θ.",
          "ta": "ஆரம் 1 கொண்ட அரைவட்டத்திற்குள் அமையும் செவ்வகம் OPQR-இல் (படம் 6.2), ∠QOP = θ எனில் ∠QOR = 90° − θ ஆகும்."
        },
        "symbols": [
          {
            "symbol": { "latex": "90^\\circ-\\theta", "fallback": "90° − θ" },
            "en": "The complement of acute angle θ—the other acute angle of the right triangle since θ + (90° − θ) + 90° = 180°.",
            "ta": "θ-இன் நிரப்புக் கோணம் (90° − θ); செங்கோண முக்கோணத்தின் மற்றொரு குறுங்கோணம்."
          },
          {
            "symbol": { "latex": "OP=RQ,\\;OR=PQ", "fallback": "OP = RQ, OR = PQ" },
            "en": "Opposite sides of rectangle OPQR are equal, matching cos θ = sin(90° − θ) and sin θ = cos(90° − θ) directly.",
            "ta": "செவ்வகம் OPQR-இன் எதிர்ப் பக்கங்கள் சமமாதலால் cos θ = sin(90° − θ) மற்றும் sin θ = cos(90° − θ)."
          },
          {
            "symbol": { "latex": "\\text{Co-ratios}", "fallback": "Co-ratios" },
            "en": "'Cosine' literally means 'complement's sine'; likewise cotangent and cosecant are the complement partners of tangent and secant.",
            "ta": "சைன்↔கொசைன், டேன்ஜென்ட்↔கோடேன்ஜென்ட், சீக்கன்ட்↔கொசீக்கன்ட் ஆகியவை நிரப்புக் கோண இணைகள்."
          }
        ],
        "watchOut": {
          "en": "Do not confuse complementary pairing with reciprocals! Reciprocal of sin θ is cosec θ, whereas complement sin(90° − θ) is cos θ.",
          "ta": "தலைகீழி விகிதத்தையும் நிரப்புக் கோணத்தையும் குழப்பாதீர்கள்: sin θ-இன் தலைகீழி cosec θ, ஆனால் sin(90° − θ) = cos θ."
        }
      },
      "proof": {
        "figure": "complementary-angles",
        "steps": [
          {
            "title": { "en": "1. Read (cos θ, sin θ) and (cos(90°−θ), sin(90°−θ)) in rectangle OPQR", "ta": "1. செவ்வகம் OPQR-இல் இரு முக்கோண விகிதங்களைப் படிக்க" },
            "math": { "latex": "\\begin{aligned}&OP=\\cos\\theta,\\quad PQ=\\sin\\theta\\\\&OR=\\cos(90^\\circ-\\theta)\\\\&RQ=\\sin(90^\\circ-\\theta)\\end{aligned}", "fallback": "In radius-1 semicircle Fig. 6.2: OP = cos θ, PQ = sin θ; OR = cos(90°−θ), RQ = sin(90°−θ)" },
            "reason": {
              "en": "In △OPQ (hypotenuse OQ = 1), adjacent OP = cos θ and opposite PQ = sin θ; in △QOR, adjacent OR = cos(90°−θ) and opposite RQ = sin(90°−θ).",
              "ta": "OQ = 1 அலகு ஆரமுள்ள செவ்வகத்தில் △OPQ மற்றும் △QOR இரண்டிலிருந்தும் sin மற்றும் cos மதிப்புகள் நேரடியாகக் கிடைக்கின்றன."
            }
          },
          {
            "title": { "en": "2. Equate opposite rectangle sides to link all 6 ratios", "ta": "2. செவ்வக எதிர்ப் பக்கங்களைச் சமப்படுத்தி 6 விகிதங்களையும் இணைக்க" },
            "math": { "latex": "\\begin{aligned}&RQ=OP\\implies\\sin(90^\\circ-\\theta)=\\cos\\theta\\\\&\\tan(90^\\circ-\\theta)=\\dfrac{\\cos\\theta}{\\sin\\theta}=\\cot\\theta\\end{aligned}", "fallback": "RQ = OP gives sin(90°−θ) = cos θ; dividing gives tan(90°−θ) = cot θ" },
            "reason": {
              "en": "Opposite sides of a rectangle have equal lengths (OP = RQ and OR = PQ), and dividing or taking reciprocals gives the other four complementary formulas.",
              "ta": "செவ்வகத்தின் எதிர்ப் பக்கங்கள் சமமென்பதால் sin(90°−θ) = cos θ; வகுத்தும் தலைகீழாக்கியும் மற்ற நான்கு சூத்திரங்களும் கிடைக்கின்றன."
            }
          }
        ]
      },
      "question": {
        "en": "Evaluate cos 52° / sin 38° without a calculator.",
        "ta": "கணிப்பான் இல்லாமல் cos 52° / sin 38°-இன் மதிப்பைக் காண்க."
      },
      "questionMath": {
        "latex": "\\dfrac{\\cos 52^\\circ}{\\sin 38^\\circ}=\\;?",
        "fallback": "cos 52° / sin 38° = ?"
      },
      "choices": [
        { "en": "52/38", "ta": "52/38" },
        { "en": "0", "ta": "0" },
        { "en": "1", "ta": "1" }
      ],
      "correct": 2,
      "hint": {
        "en": "Notice 52° + 38° = 90°, so replace cos 52° using cos θ = sin(90° − θ).",
        "ta": "52° + 38° = 90° என்பதைக் கவனித்து, cos 52°-ஐ sin(90° − 52°) என மாற்றுங்கள்."
      },
      "incorrectFeedback": [
        {
          "en": "Trigonometric ratios operate on the angle, not by dividing the degree numbers 52 and 38!",
          "ta": "கோண அளவுகளான 52 மற்றும் 38-ஐ நேரடியாக வகுக்கக் கூடாது!"
        },
        {
          "en": "Subtracting equal quantities gives 0, whereas here we divide two equal non-zero values.",
          "ta": "இரண்டு சம எண்களைக் கழித்தால் 0; இங்கு வகுப்பதால் ஈவு 1 கிடைக்கும்."
        },
        null
      ],
      "why": {
        "en": "Since 52° = 90° − 38°, we have cos 52° = cos(90° − 38°) = sin 38°. Dividing sin 38° by itself equals 1.",
        "ta": "52° = 90° − 38° என்பதால் cos 52° = sin 38°. எனவே sin 38° / sin 38° = 1."
      },
      "whyMath": {
        "latex": "\\dfrac{\\cos(90^\\circ-38^\\circ)}{\\sin 38^\\circ}=\\dfrac{\\sin 38^\\circ}{\\sin 38^\\circ}=1",
        "fallback": "cos(90°−38°)/sin 38° = sin 38°/sin 38° = 1"
      },
      "explainAfterAttempt": true,
      "connect": {
        "en": "When sin θ = cos θ (as in Exercise 6.5 Q6), complementary symmetry shows θ = 90° − θ, immediately giving θ = 45°.",
        "ta": "பயிற்சி 6.5 வினா 6-இல் sin θ = cos θ எனில் நிரப்புக் கோணச் சமச்சீரால் θ = 45° என உடனே அறியலாம்."
      },
      "practiceId": "c10-6-6-5-15",
      "relatedExercise": "6.1 & 6.5"
    },
    {
      "id": "g10-ch6-standard-angles",
      "section": "6.1",
      "title": {
        "en": "Exact ratios for standard angles 0°, 30°, 45°, 60°, 90°",
        "ta": "0°, 30°, 45°, 60°, 90° சிறப்புக் கோணங்களின் துல்லிய விகிதங்கள்"
      },
      "firstGlance": {
        "en": "Splitting a square in half gives 45° exact ratios, splitting an equilateral triangle in half gives 30° and 60° exact ratios, and flattening to 0° or 90° explains zeros and undefined values.",
        "ta": "சதுரத்தை மடக்கினால் 45° விகிதங்களும், சமபக்க முக்கோணத்தைப் பிரித்தால் 30°, 60° விகிதங்களும், 0°/90° எல்லைகளில் 0 மற்றும் வரையறுக்கப்படாத மதிப்புகளும் கிடைக்கின்றன."
      },
      "rule": {
        "en": "sin(0°,30°,45°,60°,90°) = (√0, √1, √2, √3, √4)/2; cos reverses order; tan = sin/cos",
        "ta": "sin(0°,30°,45°,60°,90°) = (√0, √1, √2, √3, √4)/2; cos தலைகீழ் வரிசை; tan = sin/cos"
      },
      "math": {
        "latex": "\\begin{aligned}&\\sin(0^\\circ,30^\\circ,45^\\circ,60^\\circ,90^\\circ):\\\\&\\quad 0,\\;\\dfrac{1}{2},\\;\\dfrac{1}{\\sqrt{2}},\\;\\dfrac{\\sqrt{3}}{2},\\;1\\\\&\\tan(0^\\circ,30^\\circ,45^\\circ,60^\\circ,90^\\circ):\\\\&\\quad 0,\\;\\dfrac{1}{\\sqrt{3}},\\;1,\\;\\sqrt{3},\\;\\text{undef.}\\end{aligned}",
        "fallback": "sin(0°,30°,45°,60°,90°) = 0, 1/2, 1/√2, √3/2, 1; tan = 0, 1/√3, 1, √3, undefined"
      },
      "glanceVisual": "standard-angles",
      "visual": { "kind": "ch6-lab", "id": "standard-angles" },
      "understand": {
        "intro": {
          "en": "Every entry in the textbook's standard table (2025 p. 241 EN / p. 249 TA) comes directly from geometry—and 'undefined' always marks division by zero.",
          "ta": "பாடநூலின் சிறப்புக் கோண அட்டவணை மதிப்புகள் அனைத்தும் வடிவியல் முக்கோணங்களிலிருந்து பிறக்கின்றன; பகுதி 0 ஆகும்போது மதிப்பு 'வரையறுக்கப்படவில்லை' ஆகிறது."
        },
        "symbols": [
          {
            "symbol": { "latex": "45^\\circ:(1,1,\\sqrt{2})", "fallback": "45°: (1, 1, √2)" },
            "en": "Isosceles right triangle with equal legs 1, 1 and hypotenuse √2 gives sin 45° = cos 45° = 1/√2 and tan 45° = 1.",
            "ta": "பக்கங்கள் 1, 1 மற்றும் கர்ணம் √2 கொண்ட இருசமபக்க செங்கோண முக்கோணம் 45° விகிதங்களைத் தருகிறது."
          },
          {
            "symbol": { "latex": "30^\\circ,60^\\circ:(1,\\sqrt{3},2)", "fallback": "30°, 60°: (1, √3, 2)" },
            "en": "Half of an equilateral triangle of side 2 has base 1, altitude √3, hypotenuse 2—giving 30° and 60° ratios immediately.",
            "ta": "பக்கம் 2 கொண்ட சமபக்க முக்கோணத்தின் பாதியில் பக்கங்கள் 1, √3, 2 என்பதால் 30°, 60° விகிதங்கள் கிடைக்கின்றன."
          },
          {
            "symbol": { "latex": "\\text{undefined}\\;(1/0)", "fallback": "undefined (1/0)" },
            "en": "At θ = 0°, Opp = 0 makes cosec 0° and cot 0° undefined; at θ = 90°, Adj = 0 makes tan 90° and sec 90° undefined.",
            "ta": "θ = 0°-இல் cosec 0°, cot 0° மற்றும் θ = 90°-இல் tan 90°, sec 90° ஆகியவை 0-ஆல் வகுக்க முடியாததால் வரையறுக்கப்படவில்லை."
          }
        ],
        "watchOut": {
          "en": "Do not swap tan 30° = 1/√3 and tan 60° = √3! At 60° (steeper than 45°), slope tan θ must be GREATER than 1 (√3 ≈ 1.732), whereas at 30° it is LESS than 1 (1/√3 ≈ 0.577).",
          "ta": "tan 30° (1/√3 ≈ 0.577) மற்றும் tan 60° (√3 ≈ 1.732) ஆகியவற்றை மாற்றாதீர்கள்: 45°-ஐ விடப் பெரிய கோணத்தில் tan θ > 1."
        }
      },
      "proof": {
        "figure": "standard-angles",
        "steps": [
          {
            "title": { "en": "1. Halve a unit square for 45°", "ta": "1. அலகுச் சதுரத்தைப் பாதியாகப் பிரித்து 45° காண்க" },
            "math": { "latex": "\\begin{aligned}&c=\\sqrt{1^2+1^2}=\\sqrt{2}\\\\&\\sin 45^\\circ=\\cos 45^\\circ=\\dfrac{1}{\\sqrt{2}},\\;\\tan 45^\\circ=1\\end{aligned}", "fallback": "Hypotenuse √(1²+1²)=√2 gives sin 45°=cos 45°=1/√2, tan 45°=1" },
            "reason": {
              "en": "A diagonal splits a 1×1 square into two 45°–45°–90° triangles with opposite = adjacent = 1 and hypotenuse √2.",
              "ta": "1×1 சதுரத்தின் மூலைவிட்டம் இரு 45°–45°–90° முக்கோணங்களை உருவாக்குகிறது."
            }
          },
          {
            "title": { "en": "2. Drop altitude of a side-2 equilateral triangle for 30° and 60°", "ta": "2. பக்கம் 2 சமபக்க முக்கோணத்தின் குத்துக்கோட்டால் 30°, 60° காண்க" },
            "math": { "latex": "\\begin{aligned}&h=\\sqrt{2^2-1^2}=\\sqrt{3}\\\\&\\sin 30^\\circ=\\dfrac{1}{2},\\;\\sin 60^\\circ=\\dfrac{\\sqrt{3}}{2}\\\\&\\tan 60^\\circ=\\sqrt{3}\\end{aligned}", "fallback": "Altitude h=√(2²−1²)=√3 yields sin 30°=1/2, sin 60°=√3/2, tan 60°=√3" },
            "reason": {
              "en": "Splitting a 60°–60°–60° triangle of side 2 along its median creates a 30°–60°–90° triangle with sides 1, √3, and 2.",
              "ta": "சமபக்க முக்கோணத்தின் நடுக்கோடு அடிப்பக்கத்தை 1 எனப் பிரித்து 30°–60°–90° முக்கோணத்தைத் தருகிறது."
            }
          }
        ]
      },
      "question": {
        "en": "What is the exact value of tan 60° / cot 30° − sin 30°?",
        "ta": "tan 60° / cot 30° − sin 30° என்பதன் துல்லிய மதிப்பு என்ன?"
      },
      "questionMath": {
        "latex": "\\dfrac{\\tan 60^\\circ}{\\cot 30^\\circ}-\\sin 30^\\circ=\\;?",
        "fallback": "tan 60° / cot 30° − sin 30° = ?"
      },
      "choices": [
        { "en": "0.5 (or 1/2)", "ta": "0.5 (அல்லது 1/2)", "math": { "latex": "\\dfrac{1}{2}", "fallback": "1/2" } },
        { "en": "√3 − 1/2", "ta": "√3 − 1/2", "math": { "latex": "\\sqrt{3}-\\dfrac{1}{2}", "fallback": "√3 − 1/2" } },
        { "en": "3/2", "ta": "3/2", "math": { "latex": "\\dfrac{3}{2}", "fallback": "3/2" } }
      ],
      "correct": 0,
      "hint": {
        "en": "Both tan 60° and cot 30° equal √3—or note that 60° and 30° are complementary angles!",
        "ta": "tan 60° மற்றும் cot 30° இரண்டும் √3-க்குச் சமம் (அவை நிரப்புக் கோணங்கள்!)."
      },
      "incorrectFeedback": [
        null,
        {
          "en": "Remember cot 30° is ALSO √3, not 1! So √3 / √3 simplifies completely to 1.",
          "ta": "cot 30°-உம் √3 ஆகும், 1 அல்ல! எனவே √3 / √3 = 1 எனச் சுருங்கும்."
        },
        {
          "en": "1 + 1/2 gives 3/2, but the expression subtracts sin 30°: 1 − 1/2.",
          "ta": "1 + 1/2 அல்ல; இங்கு sin 30°-ஐக் கழிக்க வேண்டும்: 1 − 1/2 = 1/2."
        }
      ],
      "why": {
        "en": "Since tan 60° = √3 and cot 30° = √3, their ratio is 1. Subtracting sin 30° = 1/2 gives 1 − 1/2 = 1/2.",
        "ta": "tan 60° = √3 மற்றும் cot 30° = √3 என்பதால் அவற்றின் விகிதம் 1; பிறகு 1 − 1/2 = 1/2."
      },
      "whyMath": {
        "latex": "\\dfrac{\\sqrt{3}}{\\sqrt{3}}-\\dfrac{1}{2}=1-\\dfrac{1}{2}=\\dfrac{1}{2}",
        "fallback": "√3/√3 − 1/2 = 1/2"
      },
      "explainAfterAttempt": true,
      "connect": {
        "en": "Exact values for 30°, 45°, and 60° appear in every Heights and Distances calculation (Exercises 6.2–6.4) as well as Exercise 6.5 Q6.",
        "ta": "பயிற்சி 6.2–6.4 உயர-தொலைவு கணக்குகள் அனைத்திலும் 30°, 45°, 60° துல்லிய மதிப்புகளே பயன்படுகின்றன."
      },
      "practiceId": "c10-6-6-5-15",
      "secondaryPracticeId": "c10-6-6-2-4",
      "relatedExercise": "6.1, 6.2 & 6.5"
    },
    {
      "id": "g10-ch6-identity-sin-cos",
      "section": "6.2",
      "title": {
        "en": "First fundamental identity: sin²θ + cos²θ = 1",
        "ta": "முதல் அடிப்படை முற்றொருமை: sin²θ + cos²θ = 1"
      },
      "firstGlance": {
        "en": "Dividing Pythagoras's equation Opp² + Adj² = Hyp² by Hyp² locks the sum of the squares of sine and cosine at 1 for every angle θ.",
        "ta": "பிதாகரஸ் தேற்றம் Opp² + Adj² = Hyp²-ஐ Hyp²-ஆல் வகுத்தால், எந்தக் கோணம் θ-விற்கும் sin²θ + cos²θ எப்போதும் 1 ஆகும்."
      },
      "rule": {
        "en": "sin²θ + cos²θ = 1, so sin²θ = 1 − cos²θ and cos²θ = 1 − sin²θ",
        "ta": "sin²θ + cos²θ = 1; எனவே sin²θ = 1 − cos²θ மற்றும் cos²θ = 1 − sin²θ"
      },
      "math": {
        "latex": "\\begin{aligned}&\\sin^2\\theta+\\cos^2\\theta=1\\\\&\\sin^2\\theta=1-\\cos^2\\theta,\\quad \\cos^2\\theta=1-\\sin^2\\theta\\end{aligned}",
        "fallback": "sin²θ + cos²θ = 1; sin²θ = 1 − cos²θ; cos²θ = 1 − sin²θ"
      },
      "glanceVisual": "identity-sin-cos",
      "visual": { "kind": "ch6-lab", "id": "identity-sin-cos" },
      "understand": {
        "intro": {
          "en": "An equation is a trigonometric identity when it holds true for ALL allowed values of θ—not just one special angle.",
          "ta": "வரையறுக்கப்பட்ட எல்லா θ மதிப்புகளுக்கும் மெய்யாகும் முக்கோணவியல் சமன்பாடு 'முக்கோணவியல் முற்றொருமை' எனப்படும்."
        },
        "symbols": [
          {
            "symbol": { "latex": "\\sin^2\\theta", "fallback": "sin²θ" },
            "en": "Textbook notation for (sin θ)²—square the RATIO, never the angle θ!",
            "ta": "(sin θ)² என்பதன் சுருக்கம்—இதில் sin θ விகிதம் வர்க்கப்படுத்தப்படுகிறது, கோணம் θ அல்ல."
          },
          {
            "symbol": { "latex": "1-\\sin^2\\theta=(1-\\sin\\theta)(1+\\sin\\theta)", "fallback": "1−sin²θ = (1−sin θ)(1+sin θ)" },
            "en": "Difference-of-squares form used constantly to simplify fractions containing 1 ± sin θ or 1 ± cos θ.",
            "ta": "வர்க்கங்களின் வித்தியாச வடிவம்—பகுதியில் 1 ± sin θ உள்ள கணக்குகளைச் சுருக்கப் பெரிதும் பயன்படுகிறது."
          }
        ],
        "watchOut": {
          "en": "Watch the textbook Note (2025 p. 241): (sin θ)² is written sin²θ, NOT sin θ². Never write √(1 − cos²θ) without noting sin θ ≥ 0 on 0° ≤ θ ≤ 90°.",
          "ta": "(sin θ)² என்பதை sin²θ என எழுத வேண்டும், sin θ² அல்ல; மேலும் 0° ≤ θ ≤ 90° என்பதால் sin θ ≥ 0."
        }
      },
      "proof": {
        "figure": "identity-sin-cos",
        "steps": [
          {
            "title": { "en": "1. Start from Pythagoras in right triangle △OMP", "ta": "1. △OMP-இல் பிதாகரஸ் தேற்றத்துடன் தொடங்குக" },
            "math": { "latex": "MP^2+OM^2=OP^2", "fallback": "MP² + OM² = OP²" },
            "reason": {
              "en": "In △OMP right-angled at M, the squares of opposite leg MP and adjacent leg OM sum to the hypotenuse square OP².",
              "ta": "M-இல் செங்கோணம் கொண்ட △OMP-இல் இரு பக்க வர்க்கங்களின் கூடுதல் கர்ண வர்க்கம் OP²-க்குச் சமம்."
            }
          },
          {
            "title": { "en": "2. Divide every term by OP² (OP ≠ 0)", "ta": "2. அனைத்து உறுப்புகளையும் OP²-ஆல் வகுக்க (OP ≠ 0)" },
            "math": { "latex": "\\begin{aligned}\\left(\\dfrac{MP}{OP}\\right)^2+\\left(\\dfrac{OM}{OP}\\right)^2&=\\left(\\dfrac{OP}{OP}\\right)^2\\\\\\sin^2\\theta+\\cos^2\\theta&=1\\end{aligned}", "fallback": "(MP/OP)² + (OM/OP)² = (OP/OP)² gives sin²θ + cos²θ = 1" },
            "reason": {
              "en": "Recognizing MP/OP = sin θ and OM/OP = cos θ converts the geometric Pythagoras equation into the first identity.",
              "ta": "MP/OP = sin θ மற்றும் OM/OP = cos θ எனப் பிரதியிட முதல் அடிப்படை முற்றொருமை கிடைக்கிறது."
            }
          }
        ]
      },
      "question": {
        "en": "Given sin θ = 3/5 (0° < θ < 90°), find cos θ using the fundamental identity.",
        "ta": "0° < θ < 90° மற்றும் sin θ = 3/5 எனில், அடிப்படை முற்றொருமை மூலம் cos θ காண்க."
      },
      "questionMath": {
        "latex": "\\sin\\theta=\\dfrac{3}{5}\\implies\\cos\\theta=\\;?",
        "fallback": "sin θ = 3/5 implies cos θ = ?"
      },
      "choices": [
        { "en": "2/5", "ta": "2/5", "math": { "latex": "\\dfrac{2}{5}", "fallback": "2/5" } },
        { "en": "4/5", "ta": "4/5", "math": { "latex": "\\dfrac{4}{5}", "fallback": "4/5" } },
        { "en": "16/25", "ta": "16/25", "math": { "latex": "\\dfrac{16}{25}", "fallback": "16/25" } }
      ],
      "correct": 1,
      "hint": {
        "en": "Compute cos²θ = 1 − (3/5)², then take the positive square root.",
        "ta": "cos²θ = 1 − (3/5)² கணக்கிட்டு, பிறகு நேர்மறை வர்க்கமூலம் எடுங்கள்."
      },
      "incorrectFeedback": [
        {
          "en": "sin θ + cos θ is NOT 1—only their SQUARES sin²θ + cos²θ add up to 1!",
          "ta": "sin θ + cos θ = 1 அல்ல; அவற்றின் வர்க்கங்களின் கூடுதலே sin²θ + cos²θ = 1."
        },
        null,
        {
          "en": "16/25 is cos²θ! Take the square root √(16/25) to finish finding cos θ.",
          "ta": "16/25 என்பது cos²θ மட்டுமே; வர்க்கமூலம் எடுத்து cos θ காண வேண்டும்."
        }
      ],
      "why": {
        "en": "cos²θ = 1 − sin²θ = 1 − 9/25 = 16/25. Since θ is acute, cos θ > 0, giving cos θ = 4/5 (a 3–4–5 triangle).",
        "ta": "cos²θ = 1 − 9/25 = 16/25; குறுங்கோணத்தில் cos θ > 0 என்பதால் cos θ = 4/5."
      },
      "whyMath": {
        "latex": "\\cos\\theta=\\sqrt{1-\\dfrac{9}{25}}=\\sqrt{\\dfrac{16}{25}}=\\dfrac{4}{5}",
        "fallback": "cos θ = √(1 − 9/25) = 4/5"
      },
      "explainAfterAttempt": true,
      "connect": {
        "en": "Replacing 1 − sin²θ with cos²θ (or 1 − cos²θ with sin²θ) drives both Exercise 6.1 Q2(ii) and Exercise 6.5 Q1.",
        "ta": "1 − sin²θ = cos²θ என்ற மாற்றமே பயிற்சி 6.1 வினா 2(ii) மற்றும் பயிற்சி 6.5 வினா 1-இன் அடித்தளம்."
      },
      "practiceId": "c10-6-6-5-13",
      "secondaryPracticeId": "c10-6-6-1-3",
      "relatedExercise": "6.1 & 6.5"
    },
    {
      "id": "g10-ch6-identity-sec-cosec",
      "section": "6.2",
      "title": {
        "en": "Secant-tangent and cosecant-cotangent Pythagorean identities",
        "ta": "sec²θ = 1 + tan²θ மற்றும் cosec²θ = 1 + cot²θ முற்றொருமைகள்"
      },
      "firstGlance": {
        "en": "Dividing Pythagoras's equation by the other two leg squares (Adj² and Opp²) creates the second and third fundamental identities.",
        "ta": "பிதாகரஸ் தேற்றத்தை மற்ற இரு பக்க வர்க்கங்களான OM² மற்றும் MP²-ஆல் வகுக்கும்போது 1 + tan²θ = sec²θ மற்றும் 1 + cot²θ = cosec²θ கிடைக்கின்றன."
      },
      "rule": {
        "en": "1 + tan²θ = sec²θ (sec²θ − tan²θ = 1) and 1 + cot²θ = cosec²θ (cosec²θ − cot²θ = 1)",
        "ta": "1 + tan²θ = sec²θ (sec²θ − tan²θ = 1) மற்றும் 1 + cot²θ = cosec²θ (cosec²θ − cot²θ = 1)"
      },
      "math": {
        "latex": "\\begin{aligned}&1+\\tan^2\\theta=\\sec^2\\theta\\\\&\\quad\\iff \\sec^2\\theta-\\tan^2\\theta=1\\\\&1+\\cot^2\\theta=\\operatorname{cosec}^2\\theta\\\\&\\quad\\iff \\operatorname{cosec}^2\\theta-\\cot^2\\theta=1\\end{aligned}",
        "fallback": "1 + tan²θ = sec²θ (sec²θ − tan²θ = 1) and 1 + cot²θ = cosec²θ (cosec²θ − cot²θ = 1)"
      },
      "glanceVisual": "identity-sec-cosec",
      "visual": { "kind": "ch6-lab", "id": "identity-sec-cosec" },
      "understand": {
        "intro": {
          "en": "Every fundamental identity is simply Pythagoras MP² + OM² = OP² scaled to set one side of the triangle equal to 1.",
          "ta": "மூன்று அடிப்படை முற்றொருமைகளுமே செங்கோண முக்கோணத்தின் ஒரு பக்கத்தை 1-ஆக மாற்றும்போது கிடைக்கும் பிதாகரஸ் வடிவங்களாகும்."
        },
        "symbols": [
          {
            "symbol": { "latex": "1+\\tan^2\\theta=\\sec^2\\theta", "fallback": "1 + tan²θ = sec²θ" },
            "en": "Dividing MP² + OM² = OP² by OM² (Adj² ≠ 0) scales the base to 1, giving leg tan θ and hypotenuse sec θ.",
            "ta": "OM²-ஆல் வகுக்க அடுத்துள்ள பக்கம் 1 ஆகி, எதிர்ப்பக்கம் tan θ மற்றும் கர்ணம் sec θ என ஆகின்றன."
          },
          {
            "symbol": { "latex": "1+\\cot^2\\theta=\\operatorname{cosec}^2\\theta", "fallback": "1 + cot²θ = cosec²θ" },
            "en": "Dividing MP² + OM² = OP² by MP² (Opp² ≠ 0) scales the height to 1, giving leg cot θ and hypotenuse cosec θ.",
            "ta": "MP²-ஆல் வகுக்க எதிர்ப்பக்கம் 1 ஆகி, அடுத்துள்ள பக்கம் cot θ மற்றும் கர்ணம் cosec θ என ஆகின்றன."
          },
          {
            "symbol": { "latex": "(\\sec\\theta+\\tan\\theta)(\\sec\\theta-\\tan\\theta)=1", "fallback": "(sec θ + tan θ)(sec θ − tan θ) = 1" },
            "en": "Factoring sec²θ − tan²θ = 1 shows sec θ + tan θ and sec θ − tan θ are exact reciprocals!",
            "ta": "sec²θ − tan²θ = 1-ஐக் காரணிப்படுத்த sec θ + tan θ மற்றும் sec θ − tan θ ஒன்றுக்கொன்று தலைகீழிகள் என அறியலாம்."
          }
        ],
        "watchOut": {
          "en": "Keep the signs straight: it is sec²θ − tan²θ = +1 (with MINUS, not plus), so tan²θ = sec²θ − 1 and NEVER 1 − sec²θ!",
          "ta": "குறிகளைச் சரிபாருங்கள்: sec²θ − tan²θ = 1 என்பதால் tan²θ = sec²θ − 1 (மாறாக 1 − sec²θ அல்ல!)."
        }
      },
      "proof": {
        "figure": "identity-sec-cosec",
        "steps": [
          {
            "title": { "en": "1. Divide Pythagoras by adjacent square OM²", "ta": "1. பிதாகரஸை OM²-ஆல் வகுக்க" },
            "math": { "latex": "\\begin{aligned}\\left(\\dfrac{MP}{OM}\\right)^2+\\left(\\dfrac{OM}{OM}\\right)^2&=\\left(\\dfrac{OP}{OM}\\right)^2\\\\\\tan^2\\theta+1&=\\sec^2\\theta\\end{aligned}", "fallback": "(MP/OM)² + 1 = (OP/OM)² gives 1 + tan²θ = sec²θ" },
            "reason": {
              "en": "For 0° < θ < 90°, OM ≠ 0; substituting MP/OM = tan θ and OP/OM = sec θ yields the second identity.",
              "ta": "OM ≠ 0 எனும்போது MP/OM = tan θ மற்றும் OP/OM = sec θ என்பதால் 1 + tan²θ = sec²θ பெறப்படுகிறது."
            }
          },
          {
            "title": { "en": "2. Divide Pythagoras by opposite square MP²", "ta": "2. பிதாகரஸை MP²-ஆல் வகுக்க" },
            "math": { "latex": "\\begin{aligned}\\left(\\dfrac{MP}{MP}\\right)^2+\\left(\\dfrac{OM}{MP}\\right)^2&=\\left(\\dfrac{OP}{MP}\\right)^2\\\\1+\\cot^2\\theta&=\\operatorname{cosec}^2\\theta\\end{aligned}", "fallback": "1 + (OM/MP)² = (OP/MP)² gives 1 + cot²θ = cosec²θ" },
            "reason": {
              "en": "Since MP ≠ 0 for acute θ, replacing OM/MP with cot θ and OP/MP with cosec θ gives the third identity.",
              "ta": "MP ≠ 0 எனும்போது OM/MP = cot θ மற்றும் OP/MP = cosec θ என்பதால் 1 + cot²θ = cosec²θ கிடைக்கிறது."
            }
          }
        ]
      },
      "question": {
        "en": "Which simplified expression equals tan⁴θ + tan²θ?",
        "ta": "tan⁴θ + tan²θ என்பதற்குச் சமமான சுருக்கிய வடிவம் எது?"
      },
      "questionMath": {
        "latex": "\\tan^4\\theta+\\tan^2\\theta=\\;?",
        "fallback": "tan⁴θ + tan²θ = ?"
      },
      "choices": [
        { "en": "sec⁴θ + sec²θ", "ta": "sec⁴θ + sec²θ", "math": { "latex": "\\sec^4\\theta+\\sec^2\\theta", "fallback": "sec⁴θ + sec²θ" } },
        { "en": "tan⁶θ", "ta": "tan⁶θ", "math": { "latex": "\\tan^6\\theta", "fallback": "tan⁶θ" } },
        { "en": "sec⁴θ − sec²θ", "ta": "sec⁴θ − sec²θ", "math": { "latex": "\\sec^4\\theta-\\sec^2\\theta", "fallback": "sec⁴θ − sec²θ" } }
      ],
      "correct": 2,
      "hint": {
        "en": "Factor out tan²θ first: tan²θ(tan²θ + 1). Notice what tan²θ + 1 equals!",
        "ta": "முதலில் tan²θ-ஐப் பொதுவாக வெளியில் எடுங்கள்: tan²θ(tan²θ + 1). இப்போது tan²θ + 1 = sec²θ என மாற்றுங்கள்."
      },
      "incorrectFeedback": [
        {
          "en": "When converting the outer tan²θ into sec²θ − 1, multiplying (sec²θ − 1)·sec²θ creates a MINUS sign: sec⁴θ − sec²θ.",
          "ta": "வெளியே உள்ள tan²θ = sec²θ − 1 எனும்போது பெருக்கலில் கழித்தல் குறியுடன் sec⁴θ − sec²θ வரும்."
        },
        {
          "en": "Exponents add only when MULTIPLYING tan⁴θ · tan²θ = tan⁶θ, not when adding terms!",
          "ta": "அடுக்குகள் பெருக்கலின்போதே கூட்டப்படும்; கூட்டலில் அடுக்குகளைக் கூட்டக் கூடாது!"
        },
        null
      ],
      "why": {
        "en": "Factor out tan²θ to get tan²θ(tan²θ + 1) = tan²θ · sec²θ. Replacing tan²θ with (sec²θ − 1) gives (sec²θ − 1)sec²θ = sec⁴θ − sec²θ.",
        "ta": "tan²θ(tan²θ + 1) = (sec²θ − 1)sec²θ = sec⁴θ − sec²θ."
      },
      "whyMath": {
        "latex": "\\begin{aligned}\\tan^2\\theta(\\tan^2\\theta+1)&=(\\sec^2\\theta-1)\\sec^2\\theta\\\\&=\\sec^4\\theta-\\sec^2\\theta\\end{aligned}",
        "fallback": "tan²θ(tan²θ+1) = (sec²θ−1)sec²θ = sec⁴θ − sec²θ"
      },
      "explainAfterAttempt": true,
      "connect": {
        "en": "This exact factoring move solves Exercise 6.1 Q1(ii), and sec²θ − tan²θ = 1 eliminates θ directly in Exercise 6.5 Q7.",
        "ta": "பயிற்சி 6.1 வினா 1(ii) மற்றும் பயிற்சி 6.5 வினா 7 (கோணம் நீக்குதல்) ஆகியவற்றில் இம்முறை நேரடியாகப் பயன்படுகிறது."
      },
      "practiceId": "c10-6-6-1-2",
      "secondaryPracticeId": "c10-6-6-5-16",
      "relatedExercise": "6.1 & 6.5"
    },
    {
      "id": "g10-ch6-proving-identities",
      "section": "6.2",
      "title": {
        "en": "Toolkit for proving trigonometric identities",
        "ta": "முக்கோணவியல் முற்றொருமைகளை நிரூபிப்பதற்கான வழிமுறைகள்"
      },
      "firstGlance": {
        "en": "To prove LHS = RHS, transform only the more complex side step by step—switching to sin/cos, factoring powers, or multiplying by a conjugate—until it matches the target side.",
        "ta": "இடது பக்கம் = வலது பக்கம் என நிரூபிக்க, சிக்கலான பக்கத்தை மட்டும் sin/cos மாற்றம், காரணிப்படுத்தல் அல்லது இணை எண்ணால் பெருக்கி எளிய பக்கத்திற்குச் சமமாக்கவும்."
      },
      "rule": {
        "en": "Three core moves: (1) convert to sin θ, cos θ; (2) factor & swap identities; (3) multiply by conjugate (1 ∓ sin θ) or (1 ∓ cos θ)",
        "ta": "மூன்று முக்கிய உத்திகள்: (1) sin θ, cos θ-ஆக மாற்றுக; (2) காரணிப்படுத்துக; (3) இணை எண்ணால் (1 ∓ sin θ) பெருக்குக"
      },
      "math": {
        "latex": "\\begin{aligned}&\\dfrac{\\cos\\theta}{1+\\sin\\theta}=\\dfrac{\\cos\\theta(1-\\sin\\theta)}{1-\\sin^2\\theta}\\\\&=\\dfrac{\\cos\\theta(1-\\sin\\theta)}{\\cos^2\\theta}=\\sec\\theta-\\tan\\theta\\end{aligned}",
        "fallback": "cos θ / (1 + sin θ) = cos θ(1 − sin θ) / cos²θ = sec θ − tan θ"
      },
      "glanceVisual": "proving-identities",
      "visual": { "kind": "ch6-lab", "id": "proving-identities" },
      "understand": {
        "intro": {
          "en": "Plugging a numerical angle θ checks whether an equation COULD be an identity, while algebraic transformation from LHS to RHS proves it for ALL acute θ.",
          "ta": "ஒரு θ மதிப்பைப் பிரதியிடுவது சரிபார்க்க மட்டுமே உதவும்; இயற்கணிதச் சுருக்கலே அனைத்துக் கோணங்களுக்கும் நிரூபணமாக அமையும்."
        },
        "symbols": [
          {
            "symbol": { "latex": "1\\mp\\sin\\theta", "fallback": "1 ∓ sin θ" },
            "en": "Conjugate multiplier for denominators (1 ± sin θ): produces 1 − sin²θ = cos²θ cleanly.",
            "ta": "பகுதியில் (1 ± sin θ) இருந்தால் அதன் இணை (1 ∓ sin θ)-ஆல் பெருக்க cos²θ கிடைக்கும்."
          },
          {
            "symbol": { "latex": "a^3\\pm b^3", "fallback": "a³ ± b³" },
            "en": "Algebraic identities (a²−b²), (a±b)², and a³±b³=(a±b)(a²∓ab+b²) appear throughout Exercise 6.1.",
            "ta": "(a²−b²), (a±b)², a³±b³ போன்ற இயற்கணித முற்றொருமைகள் பயிற்சி 6.1-இல் அதிகம் பயன்படுகின்றன."
          }
        ],
        "watchOut": {
          "en": "In a 'Prove that' question, do not cross-multiply across the '=' sign as if equality were already known—start with LHS and derive RHS (or reduce both sides independently to the same expression).",
          "ta": "நிரூபணக் கணக்கில் '=' குறியின் குறுக்கே பெருக்காதீர்கள்! LHS-லிருந்து தொடங்கி RHS-ஐ அடையுங்கள்."
        }
      },
      "proof": {
        "figure": "proving-identities",
        "steps": [
          {
            "title": { "en": "1. Rationalise denominator 1 + sin θ using its conjugate", "ta": "1. 1 + sin θ பகுதியை இணை எண்ணால் பெருக்கிச் சுருக்குக" },
            "math": { "latex": "\\begin{aligned}\\dfrac{\\cos\\theta}{1+\\sin\\theta}&=\\dfrac{\\cos\\theta}{1+\\sin\\theta}\\cdot\\dfrac{1-\\sin\\theta}{1-\\sin\\theta}\\\\&=\\dfrac{\\cos\\theta(1-\\sin\\theta)}{1-\\sin^2\\theta}\\end{aligned}", "fallback": "Multiply top and bottom by (1 − sin θ) to get cos θ(1 − sin θ)/(1 − sin²θ)" },
            "reason": {
              "en": "Multiplying numerator and denominator by 1 − sin θ ≠ 0 keeps the fraction unchanged and uses (1+sin θ)(1−sin θ) = 1 − sin²θ.",
              "ta": "பகுதியையும் தொகுதியையும் (1 − sin θ)-ஆல் பெருக்கும்போது மதிப்பு மாறாமல் பகுதியில் 1 − sin²θ = cos²θ உருவாகிறது."
            }
          },
          {
            "title": { "en": "2. Replace 1 − sin²θ with cos²θ and split terms", "ta": "2. 1 − sin²θ = cos²θ என மாற்றிப் பிரித்து எழுதுக" },
            "math": { "latex": "\\begin{aligned}&=\\dfrac{1-\\sin\\theta}{\\cos\\theta}\\\\&=\\dfrac{1}{\\cos\\theta}-\\dfrac{\\sin\\theta}{\\cos\\theta}=\\sec\\theta-\\tan\\theta\\end{aligned}", "fallback": "= (1 − sin θ)/cos θ = sec θ − tan θ" },
            "reason": {
              "en": "Canceling one cos θ factor leaves a single denominator cos θ, which splits cleanly into sec θ − tan θ.",
              "ta": "ஒரு cos θ நீங்கியபின் இரண்டு உறுப்புகளையும் cos θ-ஆல் தனித்தனியாக வகுக்க sec θ − tan θ கிடைக்கிறது."
            }
          }
        ]
      },
      "question": {
        "en": "To simplify √[(1 + sin θ) / (1 − sin θ)] into sec θ + tan θ (for 0° < θ < 90°), which factor should multiply numerator and denominator inside the radical?",
        "ta": "0° < θ < 90°-க்கு √[(1 + sin θ)/(1 − sin θ)] என்பதை sec θ + tan θ எனச் சுருக்க, தொகுதி மற்றும் பகுதியை எதனால் பெருக்க வேண்டும்?"
      },
      "questionMath": {
        "latex": "\\sqrt{\\dfrac{1+\\sin\\theta}{1-\\sin\\theta}}=\\sec\\theta+\\tan\\theta",
        "fallback": "√[(1 + sin θ)/(1 − sin θ)] = sec θ + tan θ"
      },
      "choices": [
        { "en": "1 + sin θ", "ta": "1 + sin θ" },
        { "en": "1 − sin θ", "ta": "1 − sin θ" },
        { "en": "tan θ", "ta": "tan θ" }
      ],
      "correct": 0,
      "hint": {
        "en": "We want the denominator (1 − sin θ) to become 1 − sin²θ = cos²θ, a perfect square under the root!",
        "ta": "பகுதி (1 − sin θ) என்பது 1 − sin²θ = cos²θ என்ற முழு வர்க்கமாக மாற அதன் இணையைப் பயன்படுத்துங்கள்."
      },
      "incorrectFeedback": [
        null,
        {
          "en": "Multiplying by 1 − sin θ makes the denominator (1 − sin θ)² and leaves 1 − sin²θ inside the top radical—not the cleanest path.",
          "ta": "1 − sin θ-ஆல் பெருக்கினால் தொகுதியில் 1 − sin²θ வந்து வர்க்கமூலம் எடுப்பது சுற்றலாகும்; பகுதியின் இணை 1 + sin θ-ஆல் பெருக்குவதே எளிது."
        },
        {
          "en": "Multiplying by tan θ does not turn 1 − sin θ into a perfect square.",
          "ta": "tan θ-ஆல் பெருக்கினால் 1 − sin θ முழு வர்க்கமாக மாறாது."
        }
      ],
      "why": {
        "en": "Multiplying top and bottom by (1 + sin θ) gives (1 + sin θ)² / (1 − sin²θ) = (1 + sin θ)² / cos²θ. Taking positive roots yields (1 + sin θ)/cos θ = sec θ + tan θ.",
        "ta": "தொகுதி, பகுதியை (1 + sin θ)-ஆல் பெருக்க (1 + sin θ)²/cos²θ கிடைக்கும்; வர்க்கமூலம் எடுக்க (1 + sin θ)/cos θ = sec θ + tan θ."
      },
      "whyMath": {
        "latex": "\\sqrt{\\dfrac{(1+\\sin\\theta)^2}{\\cos^2\\theta}}=\\dfrac{1+\\sin\\theta}{\\cos\\theta}=\\sec\\theta+\\tan\\theta",
        "fallback": "√[(1+sin θ)² / cos²θ] = (1+sin θ)/cos θ = sec θ + tan θ"
      },
      "explainAfterAttempt": true,
      "connect": {
        "en": "Master these three algebraic patterns to solve Exercise 6.1 Q1(i), Q2(ii), Q3(i) and Unit Exercise 6 Q1(ii) systematically.",
        "ta": "இம்மூன்று உத்திகளும் பயிற்சி 6.1 மற்றும் அலகுப் பயிற்சி 6-இன் அனைத்து நிரூபணக் கணக்குகளுக்கும் நேரடியாக உதவுகின்றன."
      },
      "practiceId": "c10-6-6-1-1",
      "secondaryPracticeId": "c10-6-6-1-3",
      "tertiaryPracticeId": "c10-6-6-unit-17",
      "relatedExercise": "6.1 & Unit Ex 6"
    },
    {
      "id": "g10-ch6-angle-elevation",
      "section": "6.3.1",
      "title": {
        "en": "Line of sight, clinometer and angle of elevation",
        "ta": "பார்வைக்கோடு, சாய்வுமானி மற்றும் ஏற்றக்கோணம்"
      },
      "firstGlance": {
        "en": "Looking upward from eye level tilts your line of sight above the horizontal; that upward tilt is the angle of elevation, and tan θ connects vertical height directly to horizontal distance.",
        "ta": "கிடைநிலைக் கோட்டிற்கு மேலே உள்ள ஒரு பொருளைப் பார்க்கும்போது பார்வைக்கோட்டிற்கும் கிடைநிலைக்கும் இடையே அமையும் கோணமே ஏற்றக்கோணம் ஆகும்."
      },
      "rule": {
        "en": "tan θ = (Height above eye level) / (Horizontal distance); moving closer or taller target increases θ",
        "ta": "tan θ = (கண் மட்டத்திற்கு மேலுள்ள உயரம்) / (கிடைமட்டத் தொலைவு); அருகே செல்லும்போது θ அதிகரிக்கும்"
      },
      "math": {
        "latex": "\\begin{aligned}&\\tan\\theta=\\dfrac{\\text{Rise above eye}}{\\text{Horizontal dist.}}\\\\&d_2<d_1\\implies\\beta>\\alpha\\\\&h_1>h_2\\implies\\alpha>\\beta\\end{aligned}",
        "fallback": "tan θ = (Height above eye level)/(Horizontal distance); d₂ < d₁ implies β > α"
      },
      "glanceVisual": "angle-elevation",
      "visual": { "kind": "ch6-lab", "id": "angle-elevation" },
      "understand": {
        "intro": {
          "en": "In 2025 textbook Section 6.3 (pp. 250–252 EN / pp. 258–260 TA), surveyors measure elevation angles with a theodolite or clinometer, then solve the right triangle formed with the horizontal eye-level line.",
          "ta": "தியோடலைட் அல்லது சாய்வுமானி (Clinometer) கொண்டு அளக்கப்படும் ஏற்றக்கோணம், கிடைநிலை பார்வைக் கோட்டுடன் ஒரு செங்கோண முக்கோணத்தை அமைக்கிறது."
        },
        "symbols": [
          {
            "symbol": { "latex": "\\text{Line of sight}", "fallback": "Line of sight" },
            "en": "Straight ray drawn from the observer's eye directly to the target object.",
            "ta": "உற்றுநோக்குபவரின் கண்ணிலிருந்து பார்க்கப்படும் பொருளுக்கு வரையப்படும் நேர்க்கோடு."
          },
          {
            "symbol": { "latex": "\\theta\\;(\\text{elevation})", "fallback": "θ (elevation)" },
            "en": "Angle measured UPWARD from the horizontal ray at the observer's eye to the line of sight (Fig. 6.7).",
            "ta": "கண்ணின் கிடைநிலைக் கோட்டிலிருந்து மேல்நோக்கிப் பார்வைக்கோடு வரை அளக்கப்படும் கோணம்."
          },
          {
            "symbol": { "latex": "h=h_{\\triangle}+e", "fallback": "h = h_△ + e" },
            "en": "Total object height equals the triangle's vertical leg PLUS observer eye height e when e > 0.",
            "ta": "உற்றுநோக்குபவரின் உயரம் e கொடுக்கப்பட்டால், பொருளின் மொத்த உயரம் = முக்கோண உயரம் + e."
          }
        ],
        "watchOut": {
          "en": "Two classic traps: (1) Measuring θ from the vertical tower instead of the horizontal, and (2) forgetting to add the observer's eye height e to the right triangle's opposite side!",
          "ta": "இரு பொதுவான தவறுகள்: (1) செங்குத்துக் கோட்டிலிருந்து கோணம் எடுப்பது, (2) உற்றுநோக்குபவரின் உயரம் e-ஐக் கூட்ட மறப்பது!"
        }
      },
      "proof": {
        "figure": "angle-elevation",
        "steps": [
          {
            "title": { "en": "1. Form the right triangle along the observer's horizontal eye line", "ta": "1. கண்ணின் கிடைநிலைக் கோட்டுடன் செங்கோண முக்கோணம் அமைக்க" },
            "math": { "latex": "\\tan\\theta=\\dfrac{h_{\\text{above eye}}}{d}", "fallback": "tan θ = h(above eye) / d" },
            "reason": {
              "en": "The horizontal line from the observer's eye meets the vertical object perpendicularly, placing (h_total − e) opposite θ and distance d adjacent to θ.",
              "ta": "கண்ணிலிருந்து செல்லும் கிடைநிலைக் கோடு பொருளின் செங்குத்துத் தண்டை 90°-இல் சந்திப்பதால் tan θ = மேல் உயரம் / கிடைமட்டத் தொலைவு."
            }
          },
          {
            "title": { "en": "2. Why moving closer makes the angle steeper (Fig. 6.10b)", "ta": "2. கோபுரத்தை நெருங்கும்போது ஏற்றக்கோணம் ஏன் அதிகரிக்கிறது?" },
            "math": { "latex": "\\begin{aligned}&d_2<d_1\\implies \\dfrac{h}{d_2}>\\dfrac{h}{d_1}\\\\&\\implies \\tan\\beta>\\tan\\alpha\\implies \\beta>\\alpha\\end{aligned}", "fallback": "d₂ < d₁ gives h/d₂ > h/d₁, so tan β > tan α and β > α" },
            "reason": {
              "en": "Shrinking denominator d increases h/d = tan θ, and tan θ grows strictly on 0° < θ < 90°, so you tilt your head higher as you step nearer.",
              "ta": "தொலைவு d குறையக் குறைய h/d = tan θ மதிப்பு கூடுவதால் (0° < θ < 90°) கோணமும் அதிகரிக்கும்."
            }
          }
        ]
      },
      "question": {
        "en": "An observer 1.8 m tall stands 5 m away from a wall. From her eyes, the angle of elevation to the bottom of a window on the wall is 45°. How high above the ground is the bottom of the window?",
        "ta": "1.8 மீ உயரமுள்ள ஒருவர் சுவரிலிருந்து 5 மீ தொலைவில் நின்று, சாளரத்தின் அடிப்பகுதியை 45° ஏற்றக்கோணத்தில் பார்க்கிறார். தரையிலிருந்து சாளரத்தின் அடி எவ்வளவு உயரத்தில் உள்ளது?"
      },
      "questionMath": {
        "latex": "e=1.8\\text{ m},\\;d=5\\text{ m},\\;\\theta=45^\\circ",
        "fallback": "e = 1.8 m, d = 5 m, θ = 45°"
      },
      "choices": [
        { "en": "5 m", "ta": "5 மீ" },
        { "en": "6.8 m", "ta": "6.8 மீ" },
        { "en": "3.2 m", "ta": "3.2 மீ" }
      ],
      "correct": 1,
      "hint": {
        "en": "First find height above eye level using d tan 45°, then add her eye height 1.8 m!",
        "ta": "முதலில் 5 × tan 45° மூலம் கண் மட்டத்திற்கு மேலுள்ள உயரத்தைக் கண்டு, பின் 1.8 மீ-ஐக் கூட்டுங்கள்."
      },
      "incorrectFeedback": [
        {
          "en": "5 m is only the vertical leg above the observer's eyes! Do not forget to add her 1.8 m eye height down to the ground.",
          "ta": "5 மீ என்பது கண் மட்டத்திற்கு மேலே உள்ள உயரம் மட்டுமே! தரையிலிருந்து மொத்த உயரத்திற்கு 1.8 மீ-ஐக் கூட்ட வேண்டும்."
        },
        null,
        {
          "en": "Add the 1.8 m height up to the observer's eyes instead of subtracting it.",
          "ta": "கண் மட்ட உயரத்தைக் கழிக்கக் கூடாது; கூட்ட வேண்டும்."
        }
      ],
      "why": {
        "en": "Height above eye level = 5 × tan 45° = 5 × 1 = 5 m. Adding observer height gives 5 + 1.8 = 6.8 m above the ground.",
        "ta": "கண் மட்டத்திற்கு மேல் = 5 × tan 45° = 5 மீ. தரையிலிருந்து மொத்த உயரம் = 5 + 1.8 = 6.8 மீ."
      },
      "whyMath": {
        "latex": "H=5\\tan 45^\\circ+1.8=5+1.8=6.8\\text{ m}",
        "fallback": "H = 5 tan 45° + 1.8 = 6.8 m"
      },
      "explainAfterAttempt": true,
      "connect": {
        "en": "Applies directly to Exercise 6.2 Q1 (tower distance), Q2 (road midpoint), and Q3 (1.8 m observer looking at a window).",
        "ta": "பயிற்சி 6.2 வினாக்கள் 1, 2 மற்றும் 3 ஆகிய மூன்றையும் தீர்க்க இப்பயிற்சி நேரடியாக உதவுகிறது."
      },
      "practiceId": "c10-6-6-2-4",
      "secondaryPracticeId": "c10-6-6-2-5",
      "tertiaryPracticeId": "c10-6-6-2-6",
      "relatedExercise": "6.2"
    },
    {
      "id": "g10-ch6-angle-depression",
      "section": "6.3.2",
      "title": {
        "en": "Angle of depression and alternate interior angle equality",
        "ta": "இறக்கக்கோணம் மற்றும் ஒன்றுவிட்ட உள்கோணங்களின் சமத்துவம்"
      },
      "firstGlance": {
        "en": "Looking downward from an elevated point creates the angle of depression below the top horizontal—which equals the ground-level angle of elevation inside your right triangle by alternate interior angles.",
        "ta": "உயரமான இடத்திலிருந்து கீழே பார்க்கும்போது மேல் கிடைநிலைக் கோட்டுடன் அமையும் இறக்கக்கோணம், ஒன்றுவிட்ட உள்கோண விதியால் கீழே முக்கோணத்திற்குள் உள்ள ஏற்றக்கோணத்திற்குச் சமம்."
      },
      "rule": {
        "en": "Angle of depression below top horizontal = Angle of elevation from target on ground (parallel horizontals)",
        "ta": "மேல் கிடைநிலையிலுள்ள இறக்கக்கோணம் = கீழ் கிடைநிலையிலுள்ள ஏற்றக்கோணம் (இணைக் கோடுகள்)"
      },
      "math": {
        "latex": "\\begin{aligned}&CX\\parallel AB\\;(\\text{both horizontal})\\\\&\\implies\\angle XCA=\\angle CAB=\\theta\\\\&\\tan\\theta=\\dfrac{\\text{Height}}{\\text{Horizontal distance}}\\end{aligned}",
        "fallback": "CX ∥ AB (horizontals) gives alternate interior angles ∠XCA = ∠CAB = θ, so tan θ = Height / Distance"
      },
      "glanceVisual": "angle-depression",
      "visual": { "kind": "ch6-lab", "id": "angle-depression" },
      "understand": {
        "intro": {
          "en": "Every angle of depression is anchored to the observer's HORIZONTAL level at the top—never to the vertical tower wall.",
          "ta": "இறக்கக்கோணம் எப்போதும் மேலே உள்ள கிடைநிலைக் கோட்டுக்கும் பார்வைக்கோட்டுக்கும் இடையில்தான் அமையும்—செங்குத்துச் சுவருடன் அல்ல."
        },
        "symbols": [
          {
            "symbol": { "latex": "CX\\parallel AB", "fallback": "CX ∥ AB" },
            "en": "Observer's top horizontal ray CX and flat ground AB are always parallel.",
            "ta": "மேலே உள்ள கிடைநிலைக் கதிர் CX மற்றும் தரை AB ஆகியவை எப்போதும் ஒன்றுக்கொன்று இணை."
          },
          {
            "symbol": { "latex": "\\angle XCA=\\angle CAB", "fallback": "∠XCA = ∠CAB" },
            "en": "Line of sight CA acts as a transversal, creating a Z-shape so depression angle ∠XCA equals triangle base angle ∠CAB.",
            "ta": "பார்வைக்கோடு CA குறுக்குவெட்டியாகச் செயல்பட்டு Z-வடிவத்தில் சமமான ஒன்றுவிட்ட உள்கோணங்களைத் தருகிறது."
          }
        ],
        "watchOut": {
          "en": "Never place the depression angle θ inside the triangle next to the VERTICAL wall at the top! The angle beside the vertical tower is 90° − θ, not θ.",
          "ta": "கட்டிடத்தின் செங்குத்துச் சுவரை ஒட்டி θ-வைக் குறிக்காதீர்கள்! செங்குத்துக் கோட்டிற்கும் பார்வைக்கோட்டுக்கும் இடையேயான கோணம் 90° − θ ஆகும்."
        }
      },
      "proof": {
        "figure": "angle-depression",
        "steps": [
          {
            "title": { "en": "1. Apply parallel-line alternate interior angles (Z-rule)", "ta": "1. இணைக் கோடுகளின் ஒன்றுவிட்ட உள்கோண விதியைப் பயன்படுத்துக" },
            "math": { "latex": "\\begin{aligned}&\\text{Top horizontal }CX\\parallel\\text{Ground }AB\\\\&\\implies \\angle XCA=\\angle CAB=\\theta\\end{aligned}", "fallback": "CX ∥ AB implies alternate interior angles ∠XCA = ∠CAB = θ" },
            "reason": {
              "en": "Because every horizontal level is perpendicular to vertical gravity lines, CX ∥ AB and transversal AC forces ∠XCA = ∠CAB (2025 Fig. 6.20).",
              "ta": "மேல் கிடைநிலையும் தரையும் செங்குத்திற்கு 90°-இல் உள்ள இணை கோடுகள் என்பதால் பார்வைக்கோடு CA சமமான ஒன்றுவிட்ட உள்கோணங்களை உருவாக்குகிறது."
            }
          },
          {
            "title": { "en": "2. Solve the grounded right triangle △ABC directly", "ta": "2. செங்கோண முக்கோணம் △ABC-இல் tan θ பயன்படுத்துக" },
            "math": { "latex": "\\tan\\theta=\\dfrac{BC}{AB}\\implies AB=\\dfrac{BC}{\\tan\\theta}", "fallback": "tan θ = BC / AB gives AB = BC / tan θ" },
            "reason": {
              "en": "With θ moved safely into corner A of △ABC, vertical height difference BC is opposite θ and ground distance AB is adjacent.",
              "ta": "θ முக்கோணத்தின் அடிப்புள்ளி A-க்கு வந்ததும் உயரம் BC எதிர்ப்பக்கமாகவும் தொலைவு AB அடுத்துள்ள பக்கமாகவும் அமைகின்றன."
            }
          }
        ]
      },
      "question": {
        "en": "From the top of a rock 50√3 m high, the angle of depression of a car on the ground is 30°. How far is the car horizontally from the foot of the rock?",
        "ta": "50√3 மீ உயரமுள்ள பாறையின் உச்சியிலிருந்து தரையிலுள்ள மகிழுந்தின் இறக்கக்கோணம் 30° எனில், பாறையின் அடியிலிருந்து மகிழுந்தின் தொலைவு என்ன?"
      },
      "questionMath": {
        "latex": "h=50\\sqrt{3}\\text{ m},\\;\\theta_{\\text{dep}}=30^\\circ",
        "fallback": "h = 50√3 m, depression = 30°"
      },
      "choices": [
        { "en": "50 m", "ta": "50 மீ" },
        { "en": "100√3 m", "ta": "100√3 மீ" },
        { "en": "150 m", "ta": "150 மீ" }
      ],
      "correct": 2,
      "hint": {
        "en": "Transfer the 30° depression angle to the car's ground angle (alternate interior), then solve tan 30° = 50√3 / d.",
        "ta": "ஒன்றுவிட்ட உள்கோண விதிப்படி மகிழுந்தின் இடத்தில் உள்ள கோணம் 30°; எனவே tan 30° = 50√3 / d."
      },
      "incorrectFeedback": [
        {
          "en": "50 m comes from placing 30° against the vertical cliff wall (using d = h tan 30° = 50√3 × 1/√3 = 50)—the classic wall-angle trap!",
          "ta": "50 மீ என்பது 30°-ஐச் செங்குத்துப் பாறையை ஒட்டி வைத்ததால் வந்த தவறான விடை (tan 30°-ஆல் பெருக்காமல் வகுக்க வேண்டும்)!"
        },
        {
          "en": "Check tan 30° = 1/√3: dividing 50√3 by 1/√3 multiplies √3 × √3 = 3, giving 50 × 3 = 150 m.",
          "ta": "50√3 ÷ (1/√3) = 50√3 × √3 = 50 × 3 = 150 மீ."
        },
        null
      ],
      "why": {
        "en": "By alternate interior angles, the ground elevation angle at the car is 30°. Then tan 30° = (50√3)/d ⇒ 1/√3 = (50√3)/d ⇒ d = 50(3) = 150 m.",
        "ta": "மகிழுந்தின் இடத்தில் கோணம் 30° என்பதால் tan 30° = 50√3 / d ⇒ d = 50√3 × √3 = 150 மீ."
      },
      "whyMath": {
        "latex": "d=\\dfrac{50\\sqrt{3}}{\\tan 30^\\circ}=50\\sqrt{3}\\cdot\\sqrt{3}=150\\text{ m}",
        "fallback": "d = 50√3 / tan 30° = 150 m"
      },
      "explainAfterAttempt": true,
      "connect": {
        "en": "Direct match for Exercise 6.3 Q1 (car from a rock), Q2 (building height difference via horizontal bridge), and Q4 (two boats).",
        "ta": "பயிற்சி 6.3 வினாக்கள் 1, 2 மற்றும் 4 ஆகியவற்றில் இறக்கக்கோணத் தத்துவம் நேரடியாகப் பயன்படுகிறது."
      },
      "practiceId": "c10-6-6-3-7",
      "secondaryPracticeId": "c10-6-6-3-8",
      "tertiaryPracticeId": "c10-6-6-3-9",
      "relatedExercise": "6.3"
    },
    {
      "id": "g10-ch6-combined-elevation-depression",
      "section": "6.3.3",
      "title": {
        "en": "Two-triangle heights and combined elevation & depression",
        "ta": "இரு செங்கோண முக்கோணங்கள் — ஏற்றமும் இறக்கமும் இணைந்த கணக்குகள்"
      },
      "firstGlance": {
        "en": "When a problem views both the top and foot of an object—or views two positions from one tower—two right triangles share a common horizontal (or vertical) leg that links both equations.",
        "ta": "ஒரு பொருளின் உச்சியையும் அடியையும் (அல்லது இரு பொருள்களை) பார்க்கும்போது உருவாகும் இரு செங்கோண முக்கோணங்களை அவற்றின் பொதுவான கிடைமட்ட அல்லது செங்குத்துப் பக்கம் இணைக்கிறது."
      },
      "rule": {
        "en": "Find the shared distance x from the simpler triangle, then substitute x into the second triangle to get total height or gap",
        "ta": "முதல் முக்கோணத்திலிருந்து பொதுப் பக்கம் x-ஐக் கண்டு, அதை இரண்டாம் முக்கோணத்தில் பிரதியிட்டு மொத்த உயரம் அல்லது இடைவெளியைக் காண்க"
      },
      "math": {
        "latex": "\\begin{aligned}&x=h\\cot\\beta\\quad(\\text{depression }\\beta\\text{ to base})\\\\&H_{\\text{total}}=h+x\\tan\\alpha=h\\left(1+\\dfrac{\\tan\\alpha}{\\tan\\beta}\\right)\\end{aligned}",
        "fallback": "x = h cot β from depression to base, then H_total = h + x tan α"
      },
      "glanceVisual": "combined-heights",
      "visual": { "kind": "ch6-lab", "id": "combined-heights" },
      "understand": {
        "intro": {
          "en": "Exercise 6.4 and the two-ship/plane problems split neatly into an upper right triangle and a lower right triangle sharing one horizontal bridge.",
          "ta": "பயிற்சி 6.4 மற்றும் கப்பல்/விமானக் கணக்குகள் ஒரே கிடைமட்டப் பாலத்தைப் பகிரும் மேல் மற்றும் கீழ் செங்கோண முக்கோணங்களாகப் பிரிகின்றன."
        },
        "symbols": [
          {
            "symbol": { "latex": "x=h_1\\cot\\beta", "fallback": "x = h₁ cot β" },
            "en": "Common horizontal separation computed first from the known height h₁ and depression angle β to the foot.",
            "ta": "தெரிந்த உயரம் h₁ மற்றும் இறக்கக்கோணம் β மூலம் முதலில் கிடைக்கும் பொது கிடைமட்டத் தொலைவு x."
          },
          {
            "symbol": { "latex": "h_2=x\\tan\\alpha", "fallback": "h₂ = x tan α" },
            "en": "Extra vertical rise above observer level found from the upper elevation triangle using shared width x.",
            "ta": "பொதுத் தொலைவு x மற்றும் ஏற்றக்கோணம் α மூலம் கிடைக்கும் மேல் பகுதி உயரம் h₂."
          },
          {
            "symbol": { "latex": "\\text{Same vs. opposite sides}", "fallback": "Same vs opposite sides" },
            "en": "For two boats seen at α and β on the SAME side of a tower, subtract x₁ − x₂; on OPPOSITE sides, add x₁ + x₂!",
            "ta": "இரு படகுகள் கோபுரத்தின் ஒரே பக்கத்தில் இருந்தால் x₁ − x₂; எதிரெதிர் பக்கங்களில் இருந்தால் x₁ + x₂."
          }
        ],
        "watchOut": {
          "en": "Check the diagram direction! Adding x₁ + x₂ when both objects lie on the same side—or forgetting the observer deck height h₁ below eye level—gives the wrong total.",
          "ta": "படத்தின் திசையைச் சரிபாருங்கள்: இரு பொருள்கள் ஒரே பக்கமா எதிரெதிர் பக்கமா என்பதையும், கீழ்ப்பகுதி உயரம் h₁-ஐக் கூட்டியதையும் உறுதிசெய்க."
        }
      },
      "proof": {
        "figure": "combined-heights",
        "steps": [
          {
            "title": { "en": "1. Solve the lower triangle (depression β) for the shared horizontal x", "ta": "1. கீழ் முக்கோணத்திலிருந்து பொது கிடைமட்டத் தொலைவு x காண்க" },
            "math": { "latex": "\\tan\\beta=\\dfrac{h_1}{x}\\implies x=\\dfrac{h_1}{\\tan\\beta}", "fallback": "tan β = h₁/x gives x = h₁/tan β" },
            "reason": {
              "en": "Looking down at the base with depression β creates a rectangle bridge of width x between the two buildings/ships.",
              "ta": "அடிப்பகுதியின் இறக்கக்கோணம் β கொண்டு கீழ் முக்கோணத்திலிருந்து இரு பொருள்களுக்கும் இடையேயான கிடைமட்டத் தொலைவு x கிடைக்கிறது."
            }
          },
          {
            "title": { "en": "2. Feed shared x into the upper triangle (elevation α) for total height", "ta": "2. பொது x-ஐ மேல் முக்கோணத்தில் பிரதியிட்டு மொத்த உயரம் காண்க" },
            "math": { "latex": "\\begin{aligned}&h_2=x\\tan\\alpha=h_1\\dfrac{\\tan\\alpha}{\\tan\\beta}\\\\&H_{\\text{total}}=h_1+h_2\\end{aligned}", "fallback": "h₂ = x tan α = h₁(tan α / tan β), and total height H = h₁ + h₂" },
            "reason": {
              "en": "Because both horizontal sides form a rectangle, the same width x sits inside the upper triangle—letting you find h₂ and add h₁.",
              "ta": "செவ்வகத்தின் எதிர்ப் பக்கங்கள் சமமாதலால் அதே அகலம் x மேல் முக்கோணத்திலும் பயன்பட்டு மொத்த உயரம் h₁ + h₂ கிடைக்கிறது."
            }
          }
        ]
      },
      "question": {
        "en": "From a deck 40 m above sea level, a hilltop appears at 60° angle of elevation and the base of the hill appears at 30° angle of depression. What is the total height of the hill above sea level?",
        "ta": "கடல் மட்டத்திலிருந்து 40 மீ உயரக் கப்பல் தளத்திலிருந்து, குன்றின் உச்சி 60° ஏற்றக்கோணத்திலும் குன்றின் அடி 30° இறக்கக்கோணத்திலும் தெரிகிறது. குன்றின் மொத்த உயரம் என்ன?"
      },
      "questionMath": {
        "latex": "h_1=40\\text{ m},\\;\\beta=30^\\circ,\\;\\alpha=60^\\circ",
        "fallback": "h₁ = 40 m, β = 30°, α = 60°"
      },
      "choices": [
        { "en": "120 m", "ta": "120 மீ" },
        { "en": "160 m", "ta": "160 மீ" },
        { "en": "40√3 m", "ta": "40√3 மீ" }
      ],
      "correct": 1,
      "hint": {
        "en": "Lower triangle: x = 40 / tan 30° = 40√3 m. Upper triangle: above-deck height h₂ = x tan 60° = (40√3)(√3) = 120 m. Now add the 40 m deck!",
        "ta": "கீழ் முக்கோணம்: x = 40√3 மீ. மேல் முக்கோணம்: h₂ = 40√3 × √3 = 120 மீ. இப்போது கப்பல் தள உயரம் 40 மீ-ஐக் கூட்டுங்கள்!"
      },
      "incorrectFeedback": [
        {
          "en": "120 m is ONLY the upper section of the hill above the 40 m ship deck! Add the lower 40 m to measure from sea level.",
          "ta": "120 மீ என்பது 40 மீ கப்பல் தளத்திற்கு மேலுள்ள உயரம் மட்டுமே! கடல் மட்டத்திலிருந்து அளக்க 40 மீ-ஐக் கூட்ட வேண்டும்."
        },
        null,
        {
          "en": "40√3 m is the horizontal distance x between the ship and the hill, not the hill's height.",
          "ta": "40√3 மீ என்பது கப்பலுக்கும் குன்றுக்கும் இடையேயான கிடைமட்டத் தொலைவு x ஆகும்; உயரம் அல்ல."
        }
      ],
      "why": {
        "en": "From the depression triangle, distance x = 40 / tan 30° = 40√3 m. From the elevation triangle, upper height h₂ = 40√3 × tan 60° = 120 m. Total hill height = 40 + 120 = 160 m.",
        "ta": "கிடைமட்டத் தொலைவு x = 40√3 மீ. மேல் உயரம் h₂ = (40√3)(√3) = 120 மீ. குன்றின் மொத்த உயரம் = 40 + 120 = 160 மீ."
      },
      "whyMath": {
        "latex": "\\begin{aligned}&x=40\\sqrt{3}\\text{ m}\\\\&H=40+(40\\sqrt{3})\\sqrt{3}=40+120=160\\text{ m}\\end{aligned}",
        "fallback": "x = 40√3 m; H = 40 + 40√3·√3 = 160 m"
      },
      "explainAfterAttempt": true,
      "connect": {
        "en": "Directly models Exercise 6.4 Q1 (two trees), Q2 (hill from ship deck), and Q4 (apartment to tower) plus two-boat Exercise 6.3 Q4.",
        "ta": "பயிற்சி 6.4 வினாக்கள் 1, 2, 4 மற்றும் பயிற்சி 6.3 வினா 4 ஆகிய அனைத்து இரு-முக்கோணக் கணக்குகளையும் இதன் மூலம் தீர்க்கலாம்."
      },
      "practiceId": "c10-6-6-4-10",
      "secondaryPracticeId": "c10-6-6-4-11",
      "tertiaryPracticeId": "c10-6-6-4-12",
      "relatedExercise": "6.3 & 6.4"
    }
  ]
};
})();
