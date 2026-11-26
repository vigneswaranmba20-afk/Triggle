/* VER Triggle | Grade 10 Chapter 4 | Geometry — Textbook-Order Interactive Concept Studio.
 * Original learning explanations, interactive experiments, visual proofs, and transfer checks.
 * Grounded in Tamil Nadu Standard Ten Mathematics, revised 2025, Chapter 4 (pp. 161–202 EN / pp. 165–209 TA).
 * Tamil copy is an initial authored draft using 2025 textbook terminology; independent Tamil editorial review pending.
 * No network, tracking, account, autoplay, or worked-example clutter. */
(()=>{'use strict';
window.TRIGGLE_G10_CH4_PATH={
  "chapterId": "g10-ch4",
  "source": "Tamil Nadu Standard Ten Mathematics, revised 2025, Ch 4 pp. 161–202 (EN) & pp. 165–209 (TA)",
  "tamilStatus": "draft, editorial review pending",
  "stages": [
    {
      "id": "g10-ch4-similarity-vs-congruence",
      "section": "4.1–4.2.1",
      "title": {
        "en": "Similarity vs congruence & scale factor",
        "ta": "வடிவொத்தவை vs சர்வசமம் மற்றும் அளவு விகிதம்"
      },
      "firstGlance": {
        "en": "Two triangles are similar when they have the exact same shape—equal angles and proportional sides—while congruent triangles are the special case where the scale factor is 1.",
        "ta": "இரு முக்கோணங்கள் சம கோணங்களையும் விகிதசமப் பக்கங்களையும் கொண்டிருந்தால் அவை வடிவொத்தவை ஆகும்; அளவு விகிதம் 1 எனில் அவை சர்வசம முக்கோணங்கள்."
      },
      "rule": {
        "en": "△ABC ∼ △PQR means ∠A = ∠P, ∠B = ∠Q, ∠C = ∠R and AB/PQ = BC/QR = CA/RP = k",
        "ta": "△ABC ∼ △PQR எனில் ∠A = ∠P, ∠B = ∠Q, ∠C = ∠R மற்றும் AB/PQ = BC/QR = CA/RP = k"
      },
      "math": {
        "latex": "\\begin{aligned}&\\triangle ABC\\sim\\triangle PQR\\\\&\\angle A=\\angle P,\\;\\angle B=\\angle Q,\\;\\angle C=\\angle R\\\\&\\dfrac{AB}{PQ}=\\dfrac{BC}{QR}=\\dfrac{CA}{RP}=k\\end{aligned}",
        "fallback": "△ABC ∼ △PQR means corresponding angles are equal and AB/PQ = BC/QR = CA/RP = k"
      },
      "glanceVisual": "similarity-scale",
      "visual": { "kind": "ch4-lab", "id": "similarity-scale" },
      "understand": {
        "intro": {
          "en": "Similarity compares shape first, then tracks how much larger or smaller one triangle is compared to the other.",
          "ta": "வடிவொப்புமை முதலில் வடிவத்தை ஒப்பிட்டு, பின்னர் ஒரு முக்கோணம் மற்றதை விட எத்தனை மடங்கு பெரியது அல்லது சிறியது என்பதைக் காட்டுகிறது."
        },
        "symbols": [
          {
            "symbol": { "latex": "\\sim", "fallback": "∼" },
            "en": "Read as 'is similar to'. The two triangles have the same angles, so one is a uniform zoom (enlargement or reduction) of the other.",
            "ta": "'வடிவொத்தது' என்று படிக்கப்படுகிறது. இரு முக்கோணங்களும் சம கோணங்களைப் பெற்றிருக்கும்; ஒன்று மற்றதன் சீரான பெரிதாக்கம் அல்லது சிறிதாக்கம்."
          },
          {
            "symbol": { "latex": "\\cong", "fallback": "≅" },
            "en": "Read as 'is congruent to'. Every side also has the exact same length, so congruence is similarity with scale ratio 1.",
            "ta": "'சர்வசமம்' என்று படிக்கப்படுகிறது. ஒத்த பக்கங்களும் சம நீளமாக இருப்பதால், அளவு விகிதம் 1 கொண்ட வடிவொப்புமையே சர்வசமம்."
          },
          {
            "symbol": { "latex": "\\dfrac{PQ}{AB}=k", "fallback": "PQ/AB = k" },
            "en": "The scale factor k multiplies every side of △ABC to produce △PQR. Vertex order matters: A pairs with P, B with Q, and C with R.",
            "ta": "அளவுக் காரணி k என்பது △ABC-யின் ஒவ்வொரு பக்கத்தையும் பெருக்கி △PQR-ஐத் தருகிறது. முனை வரிசை மிக முக்கியம்: A↔P, B↔Q, C↔R."
          }
        ],
        "watchOut": {
          "en": "Common trap: adding the same number to every side (for instance +2 cm to each side) changes the side ratios and destroys similarity. Only multiplying every side by the same k keeps angles unchanged.",
          "ta": "பொதுவான தவறு: எல்லாப் பக்கங்களுக்கும் ஒரே எண்ணைக் கூட்டினால் (எ.கா. +2 செ.மீ) பக்க விகிதங்கள் மாறி வடிவொப்புமை கெட்டுவிடும். ஒரே k-ஆல் பெருக்கினால் மட்டுமே கோணங்கள் மாறாது."
        }
      },
      "proof": {
        "figure": "similarity-scale",
        "steps": [
          {
            "title": { "en": "1. Fix the vertex correspondence", "ta": "1. ஒத்த முனைகளைப் பொருத்துக" },
            "math": { "latex": "\\begin{aligned}\\angle A&=\\angle P,\\quad \\angle B=\\angle Q\\\\\\angle C&=\\angle R\\end{aligned}", "fallback": "∠A = ∠P, ∠B = ∠Q, ∠C = ∠R" },
            "reason": {
              "en": "Line up the corners that carry equal angles so opposite sides pair correctly: AB pairs with PQ, BC with QR, and CA with RP.",
              "ta": "சம கோணங்களைக் கொண்ட உச்சிகளை வரிசைப்படுத்தினால், அவற்றிற்கு எதிரே உள்ள ஒத்த பக்கங்கள் சரியாகப் பொருந்தும்."
            }
          },
          {
            "title": { "en": "2. Equal ratios define similarity", "ta": "2. சம விகிதம் வடிவொப்புமையைத் தருகிறது" },
            "math": { "latex": "\\dfrac{PQ}{AB}=\\dfrac{QR}{BC}=\\dfrac{RP}{CA}=k>0", "fallback": "PQ/AB = QR/BC = RP/CA = k > 0" },
            "reason": {
              "en": "Because every side scales by the same positive multiplier k, the triangle keeps its exact proportions whether k < 1 (shrink) or k > 1 (enlarge).",
              "ta": "ஒவ்வொரு பக்கமும் ஒரே மிகை எண் k-ஆல் பெருக்கப்படுவதால், k < 1 (சுருக்கம்) அல்லது k > 1 (விரிவு) எதுவானாலும் வடிவம் மாறாது."
            }
          },
          {
            "title": { "en": "3. Special case k = 1 gives congruence", "ta": "3. k = 1 எனில் சர்வசமம்" },
            "math": { "latex": "\\begin{aligned}k=1&\\implies PQ=AB,\\;QR=BC,\\\\&\\qquad RP=CA\\\\&\\implies\\triangle ABC\\cong\\triangle PQR\\end{aligned}", "fallback": "k = 1 gives PQ = AB, QR = BC, RP = CA so △ABC ≅ △PQR" },
            "reason": {
              "en": "Therefore every pair of congruent triangles is automatically similar, whereas similar triangles need not be congruent.",
              "ta": "எனவே அனைத்து சர்வசம முக்கோணங்களும் வடிவொத்தவை ஆகும்; ஆனால் வடிவொத்த முக்கோணங்கள் அனைத்தும் சர்வசமமாக இருக்க வேண்டியதில்லை."
            }
          }
        ]
      },
      "question": {
        "en": "Suppose △ABC ∼ △PQR with AB = 6 cm, BC = 8 cm, and PQ = 9 cm. What is the length of QR?",
        "ta": "△ABC ∼ △PQR என்பதில் AB = 6 செ.மீ, BC = 8 செ.மீ மற்றும் PQ = 9 செ.மீ எனில், QR-இன் நீளம் என்ன?"
      },
      "questionMath": {
        "latex": "\\begin{aligned}&\\triangle ABC\\sim\\triangle PQR\\\\&AB=6,\\;BC=8,\\;PQ=9\\\\&QR=\\;?\\end{aligned}",
        "fallback": "△ABC ∼ △PQR: AB = 6, BC = 8, PQ = 9, QR = ?"
      },
      "choices": [
        { "en": "11 cm", "ta": "11 செ.மீ" },
        { "en": "12 cm", "ta": "12 செ.மீ" },
        { "en": "5.33 cm", "ta": "5.33 செ.மீ" }
      ],
      "correct": 1,
      "hint": {
        "en": "Find the scale factor by dividing the new side PQ by its matching side AB, then multiply BC by that same scale factor.",
        "ta": "புதிய பக்கம் PQ-வை அதன் ஒத்த பக்கம் AB-ஆல் வகுத்து அளவுக் காரணியைக் கண்டறிந்து, அதனால் BC-ஐப் பெருக்குங்கள்."
      },
      "incorrectFeedback": [
        {
          "en": "11 cm adds 3 cm (9 − 6 = 3) to BC instead of multiplying by the scale ratio 9/6 = 1.5.",
          "ta": "11 செ.மீ என்பது 9 − 6 = 3 என்பதை BC-யுடன் கூட்டியதால் வந்தது; கூட்டக் கூடாது, 9/6 = 1.5 என்ற விகிதத்தால் பெருக்க வேண்டும்."
        },
        null,
        {
          "en": "5.33 cm divides by 1.5 instead of multiplying. Since PQ = 9 is larger than AB = 6, QR must be larger than BC = 8.",
          "ta": "PQ = 9 என்பது AB = 6-ஐ விடப் பெரியது என்பதால், QR-ம் BC = 8-ஐ விடப் பெரியதாக இருக்க வேண்டும்."
        }
      ],
      "why": {
        "en": "Corresponding sides of similar triangles have the same ratio. Dividing PQ = 9 by AB = 6 gives a scale factor of 3/2, so QR = 8 × (3/2) = 12 cm.",
        "ta": "வடிவொத்த முக்கோணங்களின் ஒத்த பக்கங்கள் சம விகிதத்தில் இருக்கும். அளவுக் காரணி PQ/AB = 9/6 = 3/2 என்பதால் QR = 8 × (3/2) = 12 செ.மீ."
      },
      "whyMath": {
        "latex": "\\begin{aligned}\\dfrac{QR}{BC}&=\\dfrac{PQ}{AB}=\\dfrac{9}{6}=\\dfrac{3}{2}\\\\QR&=8\\times\\dfrac{3}{2}=12\\,\\text{cm}\\end{aligned}",
        "fallback": "QR/BC = PQ/AB = 9/6 = 3/2, so QR = 8 × 3/2 = 12 cm"
      },
      "explainAfterAttempt": true,
      "connect": {
        "en": "Once you identify which vertices correspond—for instance matching ground-to-mirror angles in Exercise 4.1 Q2 or swapped labels in Q6—you write the three side ratios in vertex order and solve for the unknown height or side.",
        "ta": "பயிற்சி 4.1 வினா 2 மற்றும் வினா 6 ஆகியவற்றில் சம கோணங்களுக்கு ஏற்ப முனைகளை வரிசைப்படுத்தி, ஒத்த பக்க விகிதங்களை எழுதித் தெரியாத நீளத்தைக் காணலாம்."
      },
      "practiceId": "c10-4-ex4-1-q2",
      "secondaryPracticeId": "c10-4-ex4-1-q6"
    },
    {
      "id": "g10-ch4-similarity-criteria",
      "section": "4.2.2",
      "title": {
        "en": "Similarity criteria: AA, SAS, SSS (and why SSA fails)",
        "ta": "வடிவொத்த முக்கோண விதிகள்: AA, SAS, SSS (SSA ஏன் போதாது?)"
      },
      "firstGlance": {
        "en": "You only need two matching angles (AA), an included angle between two proportional sides (SAS), or three proportional sides (SSS) to guarantee two triangles are similar.",
        "ta": "இரு கோணங்கள் சமம் (AA), ஓர் உள்ளடங்கிய கோணமும் அதைச் சுற்றியுள்ள பக்கங்களின் விகிதமும் சமம் (SAS), அல்லது மூன்று பக்க விகிதங்கள் சமம் (SSS) எனில் முக்கோணங்கள் வடிவொத்தவை."
      },
      "rule": {
        "en": "Valid similarity tests: AA (= AAA), SAS (included angle), SSS · Invalid: SSA",
        "ta": "சரியான விதிகள்: AA (= AAA), SAS (உள்ளடங்கிய கோணம்), SSS · தவறானது: SSA"
      },
      "math": {
        "latex": "\\begin{aligned}\\text{AA: }&\\angle A=\\angle P,\\;\\angle B=\\angle Q\\\\\\text{SAS: }&\\angle A=\\angle P,\\;\\dfrac{AB}{PQ}=\\dfrac{AC}{PR}\\\\\\text{SSS: }&\\dfrac{AB}{PQ}=\\dfrac{BC}{QR}=\\dfrac{CA}{RP}\\end{aligned}",
        "fallback": "AA: ∠A=∠P, ∠B=∠Q | SAS: ∠A=∠P and AB/PQ = AC/PR | SSS: AB/PQ = BC/QR = CA/RP"
      },
      "glanceVisual": "similarity-criteria",
      "visual": { "kind": "ch4-lab", "id": "similarity-criteria" },
      "understand": {
        "intro": {
          "en": "Criteria let us prove similarity from partial measurements instead of checking all three angles and all three sides every time.",
          "ta": "மூன்று கோணங்களையும் மூன்று பக்கங்களையும் எப்போதும் அளக்காமல், குறைந்தபட்சத் தகவல்களிலிருந்து வடிவொப்புமையை நிரூபிக்க இவ்விதிகள் உதவுகின்றன."
        },
        "symbols": [
          {
            "symbol": { "latex": "\\text{AA}\\equiv\\text{AAA}", "fallback": "AA ≡ AAA" },
            "en": "Because angles of any triangle sum to 180°, matching two pairs of angles automatically forces the third pair to be equal.",
            "ta": "முக்கோணத்தின் மூன்று கோணங்களின் கூடுதல் 180° என்பதால், இரு கோணங்கள் சமமானால் மூன்றாவது கோணமும் தானாகச் சமமாகும்."
          },
          {
            "symbol": { "latex": "\\text{SAS (included)}", "fallback": "SAS (included)" },
            "en": "The equal angle MUST sit directly between the two proportional sides (for example ∠A sits between AB and AC).",
            "ta": "சமமான கோணம் கட்டாயம் விகிதசமமாக உள்ள இரு பக்கங்களுக்கு இடையிலேயே அமைந்திருக்க வேண்டும்."
          },
          {
            "symbol": { "latex": "\\text{SSA fails}", "fallback": "SSA fails" },
            "en": "When the equal angle sits outside the two given sides, the second side can swing to two different positions on the ray—producing two completely different triangle shapes!",
            "ta": "சம கோணம் இரு பக்கங்களுக்கு வெளியே இருந்தால், இரண்டாவது பக்கம் இரு வேறு இடங்களில் வெட்டி வெவ்வேறு வடிவ முக்கோணங்களைத் தரக்கூடும்."
          }
        ],
        "watchOut": {
          "en": "Before applying SAS, check that the known equal angle is actually formed by the two sides whose ratio you compared. If not, the triangles might not be similar (just like Exercise 4.1 Q1(i) vs Q1(ii)!).",
          "ta": "SAS விதியைப் பயன்படுத்தும் முன், சம கோணம் அந்த இரு விகிதசமப் பக்கங்களுக்கு இடையில் உள்ளதா என்பதைச் சரிபார்க்கவும்."
        }
      },
      "proof": {
        "figure": "similarity-criteria",
        "steps": [
          {
            "title": { "en": "1. Why AA guarantees all three angles", "ta": "1. AA ஏன் மூன்று கோணங்களையும் தருகிறது?" },
            "math": { "latex": "\\begin{aligned}\\angle C&=180^\\circ-(\\angle A+\\angle B)\\\\&=180^\\circ-(\\angle P+\\angle Q)=\\angle R\\end{aligned}", "fallback": "∠C = 180° − (∠A + ∠B) = 180° − (∠P + ∠Q) = ∠R" },
            "reason": {
              "en": "Matching two angles fixes the third angle immediately, making the two triangles equiangular and hence similar.",
              "ta": "இரண்டு கோணங்கள் சமமானால் மூன்றாவது கோணம் சமமாகி, இரு முக்கோணங்களும் சமகோண முக்கோணங்களாகி வடிவொத்தவையாகும்."
            }
          },
          {
            "title": { "en": "2. Why SAS locks the third side", "ta": "2. SAS ஏன் மூன்றாவது பக்கத்தையும் பூட்டுகிறது?" },
            "math": { "latex": "\\begin{aligned}&\\dfrac{PQ}{AB}=\\dfrac{PR}{AC}=k,\\;\\angle A=\\angle P\\\\&\\implies QR=k\\cdot BC\\end{aligned}", "fallback": "PQ/AB = PR/AC = k with ∠A = ∠P makes △PQR a k-scaled copy of △ABC" },
            "reason": {
              "en": "Fixing the corner angle ∠A and scaling both arms by k determines the exact endpoints of the third side QR, forcing QR = k·BC.",
              "ta": "கோணம் ∠A நிலையாக இருந்து இரு கைகளும் k மடங்கு நீட்டப்படுவதால், மூன்றாவது பக்கம் QR-ம் k·BC ஆகவே அமையும்."
            }
          },
          {
            "title": { "en": "3. Why SSA fails by swinging arc", "ta": "3. SSA ஏன் தோல்வியடைகிறது?" },
            "math": { "latex": "\\begin{aligned}&\\text{Two distinct triangles share }\\\\&\\angle B,\\;AB,\\text{ and }AC\\text{ when }AC<AB\\end{aligned}", "fallback": "Two distinct triangles can share ∠B, AB, and AC when AC < AB" },
            "reason": {
              "en": "A circle of radius AC centred at A can cut the base ray at two points C₁ and C₂, proving SSA does not determine a single shape.",
              "ta": "A-ஐ மையமாகக் கொண்ட AC ஆர வட்டம் அடிப்பக்கக் கதிரை இரு புள்ளிகளில் வெட்ட முடியும் என்பதால் SSA போதுமானதல்ல."
            }
          }
        ]
      },
      "question": {
        "en": "In △ABC and △PQR, we know ∠B = ∠Q = 40°, AB/PQ = 2/3, and AC/PR = 2/3. Is that always enough to conclude △ABC ∼ △PQR?",
        "ta": "△ABC மற்றும் △PQR ஆகியவற்றில் ∠B = ∠Q = 40°, AB/PQ = 2/3, மற்றும் AC/PR = 2/3 எனக் கொடுக்கப்பட்டுள்ளது. இவை △ABC ∼ △PQR என நிரூபிக்க எப்போதும் போதுமா?"
      },
      "questionMath": {
        "latex": "\\begin{aligned}&\\angle B=\\angle Q=40^\\circ,\\;\\dfrac{AB}{PQ}=\\dfrac{AC}{PR}=\\dfrac{2}{3}\\\\&(\\angle B\\text{ NOT between }AB,\\;AC)\\end{aligned}",
        "fallback": "∠B = ∠Q = 40°, AB/PQ = AC/PR = 2/3 (angle not between AB and AC)"
      },
      "choices": [
        { "en": "No — ∠B is not included between sides AB and AC (this is SSA)", "ta": "போதாது — ∠B என்பது AB, AC பக்கங்களுக்கு இடையில் இல்லை (SSA)" },
        { "en": "Yes — by SAS similarity", "ta": "போதும் — SAS விதிப்படி" },
        { "en": "Yes — any two triangles with equal acute angle are similar", "ta": "போதும் — ஒரு குறுங்கோணம் சமமெனில் போதும்" }
      ],
      "correct": 0,
      "hint": {
        "en": "Which vertex sits between sides AB and AC? Is it B or A?",
        "ta": "AB மற்றும் AC ஆகிய இரு பக்கங்களுக்கு இடையே உள்ள கோணம் B-ஆ அல்லது A-ஆ?"
      },
      "incorrectFeedback": [
        null,
        {
          "en": "Sides AB and AC meet at vertex A, not vertex B. Because ∠B is outside the pair (AB, AC), this is SSA, which can produce two non-similar triangles.",
          "ta": "AB-யும் AC-யும் சந்திக்கும் புள்ளி A ஆகும், B அல்ல. கோணம் B இடையில் இல்லாததால் இது SAS அல்ல, SSA ஆகும்."
        },
        {
          "en": "One matching angle alone cannot lock the remaining two angles; you need at least two equal angles (AA) or the included angle with proportional arms (SAS).",
          "ta": "ஒரே ஒரு கோணம் சமமாக இருப்பதால் மற்ற இரு கோணங்களும் சமமாக வேண்டியதில்லை."
        }
      ],
      "why": {
        "en": "Sides AB and AC form angle ∠A, not ∠B. Because the equal angle ∠B = ∠Q is not the included angle between the proportional sides, the given data is SSA—which fails to guarantee similarity.",
        "ta": "AB மற்றும் AC பக்கங்களுக்கு இடையேயான கோணம் ∠A ஆகும்; ∠B அல்ல. உள்ளடங்கிய கோணம் தரப்படாததால் இது SSA நிலையாகும்; எனவே வடிவொப்புமையை உறுதியாகக் கூற முடியாது."
      },
      "whyMath": {
        "latex": "\\begin{aligned}&AB\\text{ and }AC\\text{ enclose }\\angle A\\neq\\angle B\\\\&\\text{(SSA is ambiguous)}\\end{aligned}",
        "fallback": "AB and AC enclose ∠A, not ∠B (SSA is ambiguous)"
      },
      "explainAfterAttempt": true,
      "connect": {
        "en": "In Exercise 4.1 Q1(i), Q1(ii), and Q4, carefully check whether two angles match (AA), or whether the shared angle sits between proportional sides (SAS), before claiming similarity.",
        "ta": "பயிற்சி 4.1 வினா 1(i), 1(ii) மற்றும் வினா 4 ஆகியவற்றில் இரு கோணங்கள் சமமா (AA) அல்லது உள்ளடங்கிய கோணமா (SAS) எனச் சோதித்த பிறகே வடிவொப்புமை கூற வேண்டும்."
      },
      "practiceId": "c10-4-ex4-1-q1-i",
      "secondaryPracticeId": "c10-4-ex4-1-q1-ii",
      "tertiaryPracticeId": "c10-4-ex4-1-q4"
    },
    {
      "id": "g10-ch4-similarity-results",
      "section": "4.2.2",
      "title": {
        "en": "Right-triangle altitude, perimeter & area-squared ratios",
        "ta": "செங்கோணக் குத்துயரம், சுற்றளவு மற்றும் பரப்பளவு வர்க்க விகிதம்"
      },
      "firstGlance": {
        "en": "Scaling a triangle by k multiplies its sides, altitudes, and perimeter by k, but multiplies its area by k²—and a right-triangle altitude splits one right triangle into two smaller similar ones.",
        "ta": "ஒரு முக்கோணத்தின் பக்கங்களை k மடங்கு மாற்றினால் சுற்றளவும் குத்துயரமும் k மடங்காகும், ஆனால் பரப்பளவு k² மடங்காகும்; செங்கோண உச்சியின் குத்துக்கோடு இரு சிறிய வடிவொத்த முக்கோணங்களை உருவாக்கும்."
      },
      "rule": {
        "en": "Perimeter ratio = k, Area ratio = k², and right-triangle altitude gives △ADB ∼ △BDC ∼ △ABC",
        "ta": "சுற்றளவு விகிதம் = k, பரப்பளவு விகிதம் = k², செங்கோணக் குத்துயரம் ⇒ △ADB ∼ △BDC ∼ △ABC"
      },
      "math": {
        "latex": "\\begin{aligned}\\dfrac{\\operatorname{Perim}(\\triangle ABC)}{\\operatorname{Perim}(\\triangle PQR)}&=\\dfrac{AB}{PQ}=k\\\\\\dfrac{\\operatorname{area}(\\triangle ABC)}{\\operatorname{area}(\\triangle PQR)}&=\\left(\\dfrac{AB}{PQ}\\right)^2=k^2\\end{aligned}",
        "fallback": "Perimeter ratio = AB/PQ = k; Area ratio = (AB/PQ)² = k²"
      },
      "glanceVisual": "similarity-results",
      "visual": { "kind": "ch4-lab", "id": "similarity-results" },
      "understand": {
        "intro": {
          "en": "Students often confuse 1D length ratios with 2D area ratios. Lengths grow linearly (k), whereas flat surface area grows in two directions at once (k × k = k²).",
          "ta": "1D நீள விகிதத்தையும் 2D பரப்பளவு விகிதத்தையும் குழப்பிக் கொள்ளக் கூடாது. நீளங்கள் k மடங்காகும்போது, பரப்பளவு நீளமும் அகலமும் சேர்ந்து k × k = k² மடங்காகிறது."
        },
        "symbols": [
          {
            "symbol": { "latex": "\\dfrac{\\operatorname{area}(\\triangle ABC)}{\\operatorname{area}(\\triangle PQR)}=\\dfrac{AB^2}{PQ^2}", "fallback": "area(△ABC)/area(△PQR) = AB²/PQ²" },
            "en": "If sides double (k = 2), area becomes 2² = 4 times as large! Conversely, taking the square root of an area ratio gives the side ratio.",
            "ta": "பக்கங்கள் இரு மடங்கானால் (k = 2), பரப்பளவு 2² = 4 மடங்காகும்! பரப்பளவு விகிதத்தின் வர்க்கமூலம் எடுத்தால் பக்க விகிதம் கிடைக்கும்."
          },
          {
            "symbol": { "latex": "\\triangle ADB\\sim\\triangle BDC\\sim\\triangle ABC", "fallback": "△ADB ∼ △BDC ∼ △ABC" },
            "en": "In right △ABC (∠B = 90°) with altitude BD ⟂ AC, notice the careful vertex order: ∠A matches ∠CBD and ∠C matches ∠ABD.",
            "ta": "∠B = 90° கொண்ட △ABC-யில் BD ⟂ AC எனில், சம கோணங்களுக்கு ஏற்ப முனை வரிசை △ADB ∼ △BDC ∼ △ABC என அமையும்."
          },
          {
            "symbol": { "latex": "\\dfrac{\\operatorname{area}(\\triangle ABD)}{\\operatorname{area}(\\triangle BDC)}=\\dfrac{AD}{DC}", "fallback": "area(△ABD)/area(△BDC) = AD/DC" },
            "en": "When two triangles share the same vertex (so they share the same height) and their bases lie on one line, their area ratio equals their base ratio (not squared!).",
            "ta": "பொதுவான உச்சியையும் ஒரே நேர்க்கோட்டில் அடிப்பக்கங்களையும் கொண்ட இரு முக்கோணங்களுக்கு உயரம் சமம் என்பதால் பரப்பளவு விகிதம் அடிப்பக்க விகிதத்திற்குச் சமம்."
          }
        ],
        "watchOut": {
          "en": "Never set area ratio equal to side ratio! When given area(△ABC) / area(△DEF) = 9/16, take the square root first to get side ratio 3/4 before finding an unknown side.",
          "ta": "பரப்பளவு விகிதத்தைப் பக்க விகிதத்திற்கு நேராகச் சமப்படுத்தாதீர்கள்! 9/16 என்பது பரப்பு விகிதமானால், பக்க விகிதம் √(9/16) = 3/4 ஆகும்."
        }
      },
      "proof": {
        "figure": "similarity-results",
        "steps": [
          {
            "title": { "en": "1. Why area scales as k²", "ta": "1. பரப்பளவு ஏன் k² மடங்காகிறது?" },
            "math": { "latex": "\\begin{aligned}\\dfrac{\\text{area}(\\triangle PQR)}{\\text{area}(\\triangle ABC)}&=\\dfrac{\\tfrac{1}{2}(k\\cdot BC)(k\\cdot h)}{\\tfrac{1}{2}\\cdot BC\\cdot h}\\\\&=k^2\\end{aligned}", "fallback": "area(△PQR)/area(△ABC) = [½(k·BC)(k·h)] / [½·BC·h] = k²" },
            "reason": {
              "en": "Both the base and the corresponding altitude multiply by k, so their product multiplies by k × k = k².",
              "ta": "அடிப்பக்கமும் ஒத்த குத்துயரமும் தனித்தனியே k மடங்காவதால், அவற்றின் பெருக்கல் k × k = k² மடங்காகிறது."
            }
          },
          {
            "title": { "en": "2. Why right-angle altitude splits into similar triangles", "ta": "2. செங்கோணக் குத்துயரம் தரும் வடிவொப்புமை" },
            "math": { "latex": "\\begin{aligned}\\angle ABD&=90^\\circ-\\angle A=\\angle C\\\\\\angle BDC&=\\angle BDA=90^\\circ\\end{aligned}", "fallback": "∠ABD = 90° − ∠A = ∠C and ∠BDC = ∠BDA = 90°" },
            "reason": {
              "en": "By AA similarity, △ADB and △BDC both share an acute angle and a 90° angle with △ABC, so all three triangles have identical angles.",
              "ta": "ஒரு குறுங்கோணமும் 90° கோணமும் சமமாதலால் AA விதிப்படி △ADB, △BDC மற்றும் △ABC ஆகிய மூன்றும் வடிவொத்தவை."
            }
          }
        ]
      },
      "question": {
        "en": "If △ABC ∼ △DEF with area(△ABC) = 9 cm², area(△DEF) = 25 cm², and BC = 6 cm, what is EF?",
        "ta": "△ABC ∼ △DEF என்பதில் பரப்பு(△ABC) = 9 செ.மீ², பரப்பு(△DEF) = 25 செ.மீ² மற்றும் BC = 6 செ.மீ எனில் EF எவ்வளவு?"
      },
      "questionMath": {
        "latex": "\\begin{aligned}\\dfrac{\\operatorname{area}(\\triangle ABC)}{\\operatorname{area}(\\triangle DEF)}&=\\dfrac{9}{25}\\\\BC=6\\,\\text{cm},\\quad EF&=\\;?\\end{aligned}",
        "fallback": "area(△ABC)/area(△DEF) = 9/25, BC = 6 cm, EF = ?"
      },
      "choices": [
        { "en": "16.67 cm", "ta": "16.67 செ.மீ" },
        { "en": "15 cm", "ta": "15 செ.மீ" },
        { "en": "10 cm", "ta": "10 செ.மீ" }
      ],
      "correct": 2,
      "hint": {
        "en": "Take the square root of the area ratio 9/25 first to find the ratio BC/EF.",
        "ta": "முதலில் பரப்பு விகிதம் 9/25-இன் வர்க்கமூலம் எடுத்து BC/EF விகிதத்தைக் காண்க."
      },
      "incorrectFeedback": [
        {
          "en": "16.67 cm uses 9/25 directly as the side ratio instead of taking the square root √(9/25) = 3/5.",
          "ta": "பக்க விகிதத்திற்கு 9/25-ஐ நேரடியாகப் பயன்படுத்தக் கூடாது; அதன் வர்க்கமூலம் √(9/25) = 3/5 எடுக்க வேண்டும்."
        },
        {
          "en": "Check carefully: BC/EF = 3/5 means 6/EF = 3/5, so 3·EF = 30, giving EF = 10 cm.",
          "ta": "BC/EF = 3/5 என்பதில் 6/EF = 3/5; எனவே EF = (6 × 5)/3 = 10 செ.மீ."
        },
        null
      ],
      "why": {
        "en": "The ratio of areas equals the square of the ratio of corresponding sides: (BC/EF)² = 9/25, so BC/EF = 3/5. Since BC = 6 cm, EF = 6 × (5/3) = 10 cm.",
        "ta": "பரப்பளவுகளின் விகிதம் ஒத்த பக்கங்களின் வர்க்க விகிதத்திற்குச் சமம்: (BC/EF)² = 9/25 ⇒ BC/EF = 3/5. BC = 6 செ.மீ என்பதால் EF = 10 செ.மீ."
      },
      "whyMath": {
        "latex": "\\begin{aligned}\\left(\\dfrac{BC}{EF}\\right)^2&=\\dfrac{9}{25}\\\\\\dfrac{6}{EF}=\\dfrac{3}{5}&\\implies EF=10\\,\\text{cm}\\end{aligned}",
        "fallback": "(BC/EF)² = 9/25 gives 6/EF = 3/5, so EF = 10 cm"
      },
      "explainAfterAttempt": true,
      "connect": {
        "en": "These results unlock Exercise 4.1 Q5 (nested right triangles), Q7(i)–(iv) (chasing similar right triangles around an inscribed square), and Q8 (converting an area ratio into a side length).",
        "ta": "இவ்விதிகள் பயிற்சி 4.1 வினா 5, வினா 7(i)–(iv) மற்றும் வினா 8 (பரப்பு விகிதத்திலிருந்து பக்க நீளம் காணுதல்) ஆகியவற்றைத் தீர்க்க உதவுகின்றன."
      },
      "practiceId": "c10-4-ex4-1-q5",
      "secondaryPracticeId": "c10-4-ex4-1-q7-i",
      "tertiaryPracticeId": "c10-4-ex4-1-q8"
    },
    {
      "id": "g10-ch4-similar-construction",
      "section": "4.2.3",
      "title": {
        "en": "Constructing a similar triangle (scale factor m/n)",
        "ta": "வடிவொத்த முக்கோணம் வரைதல் (அளவுக் காரணி m/n)"
      },
      "firstGlance": {
        "en": "Marking equal steps along an acute ray lets us divide or extend a triangle's base in any ratio m/n using parallel lines—shrinking inside when m < n and enlarging outside when m > n.",
        "ta": "குறுங்கோணக் கதிரில் சம பாகங்களைக் குறித்து இணைகோடுகள் வரைவதன் மூலம், m < n எனில் உள்ளேயும் m > n எனில் வெளியேயும் m/n விகிதத்தில் வடிவொத்த முக்கோணத்தை வரையலாம்."
      },
      "rule": {
        "en": "Mark max(m, n) equal arcs on ray QX · Join denominator Qₙ to R · Draw parallel through numerator Qₘ",
        "ta": "QX கதிரில் max(m, n) சம வில்கள் · பகுதி Qₙ-ஐ R உடன் இணைக்க · தொகுதி Qₘ வழியே இணைகோடு வரைக"
      },
      "math": {
        "latex": "\\begin{aligned}\\dfrac{QR'}{QR}&=\\dfrac{QQ_m}{QQ_n}=\\dfrac{m}{n}\\\\m<n:\\;&\\text{inside }\\triangle PQR\\\\m>n:\\;&\\text{beyond }R\\end{aligned}",
        "fallback": "QR'/QR = QQ_m / QQ_n = m/n (inside when m < n, beyond R when m > n)"
      },
      "glanceVisual": "similar-construction",
      "visual": { "kind": "ch4-lab", "id": "similar-construction" },
      "understand": {
        "intro": {
          "en": "The key decision in every scale-factor construction is knowing which point on the ray connects to the original corner R, and which point gets the parallel line.",
          "ta": "எல்லா அளவுக் காரணி வரைபடத்திலும் எந்தப் புள்ளியை மூல முக்கோணத்தின் R-உடன் இணைக்க வேண்டும், எதன் வழியே இணைகோடு வரைய வேண்டும் என்பதே முக்கியம்."
        },
        "symbols": [
          {
            "symbol": { "latex": "\\max(m,n)", "fallback": "max(m, n)" },
            "en": "The total number of equal compass marks Q₁, Q₂, … along the acute ray QX. For 2/3 mark 3 points; for 7/3 mark 7 points.",
            "ta": "குறுங்கோணக் கதிர் QX-இல் குறிக்க வேண்டிய சம அளவுப் புள்ளிகளின் எண்ணிக்கை. 2/3 எனில் 3 புள்ளிகள்; 7/3 எனில் 7 புள்ளிகள்."
          },
          {
            "symbol": { "latex": "Q_n R", "fallback": "QₙR" },
            "en": "Always join the DENOMINATOR point Qₙ to R first, because n represents the original triangle △PQR.",
            "ta": "எப்போதும் பகுதி (denominator) புள்ளி Qₙ-ஐ R உடன் முதலில் இணைக்க வேண்டும்; ஏனெனில் n மூல முக்கோணம் △PQR-ஐக் குறிக்கிறது."
          },
          {
            "symbol": { "latex": "Q_m R'\\parallel Q_n R,\\; R'P'\\parallel RP", "fallback": "QₘR' ∥ QₙR and R'P' ∥ RP" },
            "en": "Drawing a line parallel to QₙR through the NUMERATOR point Qₘ transfers the exact ratio m : n onto base QR (extended if m > n), then R'P' ∥ RP completes △P'QR'.",
            "ta": "தொகுதிப் புள்ளி Qₘ வழியே QₙR-க்கு இணையான கோடு வரைந்தால் m : n விகிதம் அடிப்பக்கம் QR-க்கு மாறும்; பின் R'P' ∥ RP வரைந்து △P'QR' பெறலாம்."
          }
        ],
        "watchOut": {
          "en": "Never join the numerator Qₘ to R by mistake! If you join Q₇ to R for scale factor 7/3 and draw a parallel from Q₃, you will accidentally construct a 3/7 shrinking triangle instead of a 7/3 enlargement.",
          "ta": "7/3 அளவுக் காரணிக்கு தவறுதலாக Q₇-ஐ R உடன் இணைத்துவிடாதீர்கள்! பகுதியான Q₃-ஐத்தான் R உடன் இணைக்க வேண்டும்."
        }
      },
      "proof": {
        "figure": "similar-construction",
        "steps": [
          {
            "title": { "en": "1. Equal segments transfer via parallel lines", "ta": "1. இணைகோடுகளால் சம விகிதம் மாறுகிறது" },
            "math": { "latex": "\\begin{aligned}&Q_m R'\\parallel Q_n R\\\\&\\implies\\dfrac{QR'}{QR}=\\dfrac{QQ_m}{QQ_n}=\\dfrac{m}{n}\\end{aligned}", "fallback": "QₘR' ∥ QₙR gives QR'/QR = QQₘ/QQₙ = m/n" },
            "reason": {
              "en": "Because every step QQ₁ = Q₁Q₂ = … is equal and QₘR' ∥ QₙR, Thales' theorem guarantees QR' is m/n of QR.",
              "ta": "கதிரில் உள்ள பிரிவுகள் சமம் என்பதாலும் QₘR' ∥ QₙR என்பதாலும் தேல்ஸ் தேற்றப்படி QR'/QR = m/n ஆகும்."
            }
          },
          {
            "title": { "en": "2. Second parallel preserves all angles", "ta": "2. இரண்டாம் இணைகோடு வடிவொப்புமையை உறுதிசெய்கிறது" },
            "math": { "latex": "\\begin{aligned}&R'P'\\parallel RP,\\;\\text{common }\\angle Q\\\\&\\implies\\triangle P'QR'\\sim\\triangle PQR\\end{aligned}", "fallback": "R'P' ∥ RP gives ∠QR'P' = ∠QRP and common ∠Q, so △P'QR' ∼ △PQR" },
            "reason": {
              "en": "Corresponding angles are equal and ∠Q is shared, so by AA similarity △P'QR' ∼ △PQR with every side scaled by m/n.",
              "ta": "ஒத்த கோணங்கள் சமமாகவும் ∠Q பொதுவாகவும் உள்ளதால் AA விதிப்படி △P'QR' ∼ △PQR மற்றும் பக்க விகிதம் m/n."
            }
          }
        ]
      },
      "question": {
        "en": "To construct a triangle similar to △PQR with sides 7/3 of the corresponding sides of △PQR, which point on the acute ray QX must be joined directly to R?",
        "ta": "△PQR-இன் ஒத்த பக்கங்களின் 7/3 பங்குடைய வடிவொத்த முக்கோணம் வரைய, QX கதிரில் உள்ள எந்தப் புள்ளியை R உடன் முதலில் இணைக்க வேண்டும்?"
      },
      "questionMath": {
        "latex": "\\begin{aligned}&\\text{Scale factor }=\\dfrac{7}{3}\\\\&\\text{Which }Q_k\\text{ joins directly to }R?\\end{aligned}",
        "fallback": "Scale factor = 7/3: which Qₖ joins to R?"
      },
      "choices": [
        { "en": "Q₇ (the numerator)", "ta": "Q₇ (தொகுதி)" },
        { "en": "Q₃ (the denominator)", "ta": "Q₃ (பகுதி)" },
        { "en": "Q₄ (the difference 7 − 3)", "ta": "Q₄ (வித்தியாசம் 7 − 3)" }
      ],
      "correct": 1,
      "hint": {
        "en": "Remember: the original triangle △PQR corresponds to the denominator of the scale factor m/n.",
        "ta": "நினைவில் கொள்ளுங்கள்: மூல முக்கோணம் △PQR என்பது m/n பின்னத்தின் பகுதிக்கு (denominator) ஒப்பானது."
      },
      "incorrectFeedback": [
        {
          "en": "Joining Q₇ to R makes QR correspond to 7 parts instead of 3, which would shrink the triangle to 3/7 instead of enlarging it to 7/3.",
          "ta": "Q₇-ஐ R உடன் இணைத்தால் மூல முக்கோணம் 7 பங்காகவும் புதியது 3 பங்காகவும் மாறி 3/7 எனச் சுருங்கிவிடும்."
        },
        null,
        {
          "en": "You mark 7 points in total, then connect the denominator Q₃ to R and draw a parallel through Q₇ along the extended ray QR.",
          "ta": "மொத்தம் 7 புள்ளிகள் குறித்து, பகுதியான Q₃-ஐ R உடன் இணைத்து Q₇ வழியே இணைகோடு வரைய வேண்டும்."
        }
      ],
      "why": {
        "en": "In scale factor m/n = 7/3, the original side QR represents n = 3 equal parts and the new side QR' represents m = 7 equal parts. Therefore we join Q₃ to R and draw Q₇R' parallel to Q₃R.",
        "ta": "அளவுக் காரணி 7/3-இல் மூலப் பக்கம் QR என்பது 3 பங்குகளையும், புதிய பக்கம் QR' என்பது 7 பங்குகளையும் குறிக்கும். எனவே Q₃-ஐ R உடன் இணைத்து, Q₇ வழியே இணையான கோடு வரைய வேண்டும்."
      },
      "whyMath": {
        "latex": "\\begin{aligned}\\dfrac{QR'}{QR}&=\\dfrac{QQ_7}{QQ_3}=\\dfrac{7}{3}\\\\&\\text{Join }Q_3\\text{ to }R,\\text{ parallel at }Q_7\\end{aligned}",
        "fallback": "QR'/QR = QQ₇/QQ₃ = 7/3 (join Q₃ to R, parallel at Q₇)"
      },
      "explainAfterAttempt": true,
      "connect": {
        "en": "Exercise 4.1 Q10–Q13 cover both cases directly: Q10 (2/3) and Q11 (4/5) shrink inside the original triangle, while Q12 (6/5) and Q13 (7/3) enlarge beyond the original sides.",
        "ta": "பயிற்சி 4.1 வினாக்கள் 10–13 இவ்விரண்டு வகைகளையும் நேரடியாகக் கேட்கின்றன: வினா 10 (2/3) சிறிதாக்கல்; வினா 12 (6/5), 13 (7/3) பெரிதாக்கல்."
      },
      "practiceId": "c10-4-ex4-1-q10",
      "secondaryPracticeId": "c10-4-ex4-1-q12"
    },
    {
      "id": "g10-ch4-bpt-thales",
      "video": {"src": "https://pub-ed71b86e97a64b428086e292b26fb7a2.r2.dev/trace-videos/g10-ch4-bpt-thales/2c07afb76d30e65c707b0df1e56a2aa99bbfc8d092efa949ec91d920d898f201.mp4", "language": "en", "durationSeconds": 99.85},
      "section": "4.3.1 · Theorem 1",
      "title": {
        "en": "Basic Proportionality Theorem (Thales Theorem)",
        "ta": "அடிப்படை விகிதசமத் தேற்றம் (தேல்ஸ் தேற்றம்)"
      },
      "firstGlance": {
        "en": "A straight line drawn parallel to one side of a triangle intersecting the other two sides always divides those two sides in the exact same ratio.",
        "ta": "ஒரு முக்கோணத்தின் ஒரு பக்கத்திற்கு இணையாகவும் மற்ற இரு பக்கங்களை வெட்டுமாறும் வரையப்படும் நேர்க்கோடு அவ்விரண்டு பக்கங்களையும் சம விகிதத்தில் பிரிக்கிறது."
      },
      "rule": {
        "en": "In △ABC, if DE ∥ BC then AD/DB = AE/EC (and AB/AD = AC/AE, AB/DB = AC/EC)",
        "ta": "△ABC-இல் DE ∥ BC எனில் AD/DB = AE/EC (மற்றும் AB/AD = AC/AE, AB/DB = AC/EC)"
      },
      "math": {
        "latex": "\\begin{aligned}&DE\\parallel BC\\text{ in }\\triangle ABC\\\\&\\dfrac{AD}{DB}=\\dfrac{AE}{EC},\\quad\\dfrac{AB}{AD}=\\dfrac{AC}{AE}\\\\&\\dfrac{AB}{DB}=\\dfrac{AC}{EC}\\end{aligned}",
        "fallback": "If DE ∥ BC in △ABC, then AD/DB = AE/EC (and AB/AD = AC/AE, AB/DB = AC/EC)"
      },
      "glanceVisual": "bpt-thales",
      "visual": { "kind": "ch4-lab", "id": "bpt-thales" },
      "understand": {
        "intro": {
          "en": "Thales' theorem turns a parallel line into an algebraic proportion between segments along the two cut sides.",
          "ta": "தேல்ஸ் தேற்றம், இணைக்கோடு என்ற வடிவியல் பண்பை இரு பக்கத் துண்டுகளின் சம விகிதச் சமன்பாடாக மாற்றுகிறது."
        },
        "symbols": [
          {
            "symbol": { "latex": "\\dfrac{AD}{DB}=\\dfrac{AE}{EC}", "fallback": "AD/DB = AE/EC" },
            "en": "Part-to-part ratio: top piece over bottom piece on AB equals top piece over bottom piece on AC.",
            "ta": "பகுதி-க்கு-பகுதி விகிதம்: AB-இல் மேல் துண்டு / கீழ் துண்டு = AC-இல் மேல் துண்டு / கீழ் துண்டு."
          },
          {
            "symbol": { "latex": "\\dfrac{AB}{AD}=\\dfrac{AC}{AE}", "fallback": "AB/AD = AC/AE" },
            "en": "Corollary (whole-to-part): the whole side AB divided by top piece AD equals whole side AC divided by top piece AE.",
            "ta": "கிளைத் தேற்றம் (முழுப் பக்கம் / மேல் துண்டு): AB/AD = AC/AE."
          },
          {
            "symbol": { "latex": "\\dfrac{AB}{DB}=\\dfrac{AC}{EC}", "fallback": "AB/DB = AC/EC" },
            "en": "Corollary (whole-to-bottom): whole side AB over bottom piece DB equals whole side AC over bottom piece EC.",
            "ta": "கிளைத் தேற்றம் (முழுப் பக்கம் / கீழ் துண்டு): AB/DB = AC/EC."
          }
        ],
        "watchOut": {
          "en": "Never mix part-to-part on the left (AD/DB) with part-to-whole on the right (AE/AC)! Always verify that both sides compare the exact same pieces (top/bottom or top/whole).",
          "ta": "இடப்பக்கம் மேல்/கீழ் (AD/DB) எனவும் வலப்பக்கம் மேல்/முழு (AE/AC) எனவும் கலந்து எழுதாதீர்கள்! இரு பக்கமும் ஒரே அமைப்பில் இருக்க வேண்டும்."
        }
      },
      "proof": {
        "figure": "bpt-thales",
        "steps": [
          {
            "title": { "en": "1. Parallel line creates equal corresponding angles", "ta": "1. இணைகோடு சம ஒத்த கோணங்களைத் தருகிறது" },
            "math": { "latex": "\\begin{aligned}\\angle ADE&=\\angle ABC\\\\\\angle AED&=\\angle ACB,\\;\\angle A\\text{ common}\\end{aligned}", "fallback": "∠ADE = ∠ABC, ∠AED = ∠ACB, ∠A common" },
            "reason": {
              "en": "Because DE ∥ BC, corresponding angles along AB and AC are equal, and both △ADE and △ABC share angle A.",
              "ta": "DE ∥ BC என்பதால் ஒத்த கோணங்கள் சமம்; மேலும் ∠A இரு முக்கோணங்களுக்கும் பொதுவானது."
            }
          },
          {
            "title": { "en": "2. AAA similarity gives whole-over-top ratios", "ta": "2. AAA வடிவொப்புமையால் முழுப்பக்க விகிதம்" },
            "math": { "latex": "\\triangle ABC\\sim\\triangle ADE\\implies\\dfrac{AB}{AD}=\\dfrac{AC}{AE}", "fallback": "△ABC ∼ △ADE gives AB/AD = AC/AE" },
            "reason": {
              "en": "Corresponding sides of similar triangles are proportional.",
              "ta": "வடிவொத்த முக்கோணங்களின் ஒத்த பக்கங்கள் விகிதசமமானவை."
            }
          },
          {
            "title": { "en": "3. Split AB = AD + DB and AC = AE + EC", "ta": "3. பக்கங்களைப் பிரித்து 1-ஐ நீக்குக" },
            "math": { "latex": "\\begin{aligned}\\dfrac{AD+DB}{AD}&=\\dfrac{AE+EC}{AE}\\\\1+\\dfrac{DB}{AD}&=1+\\dfrac{EC}{AE}\\\\\\dfrac{AD}{DB}&=\\dfrac{AE}{EC}\\end{aligned}", "fallback": "(AD+DB)/AD = (AE+EC)/AE becomes 1 + DB/AD = 1 + EC/AE" },
            "reason": {
              "en": "Subtracting 1 from both sides gives DB/AD = EC/AE, and taking reciprocals gives AD/DB = AE/EC.",
              "ta": "இருபுறமும் 1-ஐக் கழித்து தலைகீழாக மாற்றினால் AD/DB = AE/EC கிடைக்கிறது."
            }
          }
        ]
      },
      "question": {
        "en": "In △ABC, DE ∥ BC with AD = 3 cm, DB = 5 cm, and total side AC = 16 cm. What is the length of AE?",
        "ta": "△ABC-இல் DE ∥ BC, AD = 3 செ.மீ, DB = 5 செ.மீ மற்றும் முழுப்பக்கம் AC = 16 செ.மீ எனில் AE-இன் நீளம் என்ன?"
      },
      "questionMath": {
        "latex": "\\begin{aligned}&DE\\parallel BC,\\quad AD=3,\\;DB=5\\\\&AC=16\\,\\text{cm},\\quad AE=\\;?\\end{aligned}",
        "fallback": "DE ∥ BC, AD = 3, DB = 5, AC = 16 cm, AE = ?"
      },
      "choices": [
        { "en": "9.6 cm", "ta": "9.6 செ.மீ" },
        { "en": "10 cm", "ta": "10 செ.மீ" },
        { "en": "6 cm", "ta": "6 செ.மீ" }
      ],
      "correct": 2,
      "hint": {
        "en": "Since AC is the WHOLE side, use the whole-to-part ratio AD/AB = AE/AC, where AB = 3 + 5 = 8 cm.",
        "ta": "AC என்பது முழுப்பக்கம் என்பதால், AD/AB = AE/AC என்ற விகிதத்தைப் பயன்படுத்துங்கள் (AB = 3 + 5 = 8 செ.மீ)."
      },
      "incorrectFeedback": [
        {
          "en": "9.6 cm comes from setting 3/5 = AE/16, which mixes part-to-part (AD/DB) on the left with part-to-whole (AE/AC) on the right.",
          "ta": "3/5 = AE/16 என எழுதினால் ஒரு பக்கம் பகுதி/பகுதியையும் மறுபக்கம் பகுதி/முழுப்பக்கத்தையும் கலக்கும் தவறு நிகழும்."
        },
        {
          "en": "10 cm is the remaining bottom segment EC (16 − 6 = 10), not the top segment AE.",
          "ta": "10 செ.மீ என்பது கீழ் துண்டு EC ஆகும்; மேல் துண்டு AE அல்ல."
        },
        null
      ],
      "why": {
        "en": "First find the full side AB = AD + DB = 3 + 5 = 8 cm. By the Thales corollary, AE/AC = AD/AB = 3/8, so AE = (3/8) × 16 = 6 cm (and EC = 10 cm, verifying 6/10 = 3/5).",
        "ta": "முழுப் பக்கம் AB = 3 + 5 = 8 செ.மீ. தேல்ஸ் கிளைத் தேற்றப்படி AE/16 = 3/8 என்பதால் AE = 6 செ.மீ (EC = 10 செ.மீ; 6/10 = 3/5)."
      },
      "whyMath": {
        "latex": "\\begin{aligned}\\dfrac{AE}{AC}&=\\dfrac{AD}{AB}=\\dfrac{3}{3+5}=\\dfrac{3}{8}\\\\AE&=\\dfrac{3}{8}\\times 16=6\\,\\text{cm}\\end{aligned}",
        "fallback": "AE/AC = AD/AB = 3/8, so AE = (3/8) × 16 = 6 cm"
      },
      "explainAfterAttempt": true,
      "connect": {
        "en": "Thales' theorem and its corollaries drive almost the entire first half of Exercise 4.2: Q1(i)–(ii), Q2 (trapezium parallel cut), Q4, Q5 (inscribed rhombus), Q6, and Q7.",
        "ta": "பயிற்சி 4.2 வினா 1(i)–(ii), வினா 2 (சரிவகம்), வினா 4, வினா 5 (சாய்சதுரம்), வினா 6 மற்றும் வினா 7 ஆகிய அனைத்திற்கும் தேல்ஸ் தேற்றமே அடிப்படை."
      },
      "practiceId": "c10-4-ex4-2-q1-i",
      "secondaryPracticeId": "c10-4-ex4-2-q2",
      "tertiaryPracticeId": "c10-4-ex4-2-q5"
    },
    {
      "id": "g10-ch4-converse-bpt",
      "section": "4.3.1 · Theorem 2",
      "title": {
        "en": "Converse of Basic Proportionality Theorem",
        "ta": "அடிப்படை விகிதசமத் தேற்றத்தின் மறுதலை"
      },
      "firstGlance": {
        "en": "If a straight line divides any two sides of a triangle in the same ratio, then that line is guaranteed to be parallel to the third side.",
        "ta": "ஒரு நேர்க்கோடு முக்கோணத்தின் ஏதேனும் இரு பக்கங்களைச் சம விகிதத்தில் பிரித்தால், அந்நேர்க்கோடு மூன்றாவது பக்கத்திற்கு இணையாக இருக்கும்."
      },
      "rule": {
        "en": "If AD/DB = AE/EC (with D on AB, E on AC), then DE ∥ BC",
        "ta": "AD/DB = AE/EC எனில் (D ∈ AB, E ∈ AC), DE ∥ BC ஆகும்"
      },
      "math": {
        "latex": "\\begin{aligned}&\\dfrac{AD}{DB}=\\dfrac{AE}{EC}\\;(D\\text{ on }AB,\\;E\\text{ on }AC)\\\\&\\implies DE\\parallel BC\\end{aligned}",
        "fallback": "If AD/DB = AE/EC (with D on AB, E on AC), then DE ∥ BC"
      },
      "glanceVisual": "converse-bpt",
      "visual": { "kind": "ch4-lab", "id": "converse-bpt" },
      "understand": {
        "intro": {
          "en": "Do not confuse a theorem with its converse! BPT starts from parallel lines to find ratios; the Converse starts from equal ratios to prove lines are parallel.",
          "ta": "தேற்றத்தையும் அதன் மறுதலையையும் குழப்பக் கூடாது! தேல்ஸ் தேற்றம் இணைகோட்டிலிருந்து விகிதத்தைத் தரும்; மறுதலை சம விகிதத்திலிருந்து இணைகோட்டை நிரூபிக்கும்."
        },
        "symbols": [
          {
            "symbol": { "latex": "\\dfrac{AD}{DB}=\\dfrac{AE}{EC}", "fallback": "AD/DB = AE/EC" },
            "en": "The premise (what we test numerically). Also works if you check AD/AB = AE/AC.",
            "ta": "நாம் எண்களால் சோதிக்கும் நிபந்தனை (அல்லது AD/AB = AE/AC-ஐயும் சோதிக்கலாம்)."
          },
          {
            "symbol": { "latex": "DF\\parallel BC", "fallback": "DF ∥ BC" },
            "en": "In the proof, F is the unique point on AC where a true parallel through D meets AC. Equal ratios force E to land exactly on F!",
            "ta": "நிரூபணத்தில், D வழியே BC-க்கு இணையாகச் செல்லும் கோடு AC-ஐ F-இல் வெட்டும்; சம விகிதம் E புள்ளியை F மீதே கொண்டுவந்துவிடும்."
          }
        ],
        "watchOut": {
          "en": "Make sure you match segments starting from the SAME vertex A (comparing AD/DB with AE/EC, not EC/AE upside down!).",
          "ta": "இரு பக்கத் துண்டுகளையும் ஒரே உச்சி A-விலிருந்து வரிசைப்படுத்துங்கள் (AD/DB = AE/EC; ஒன்றைத் தலைகீழாக எழுதிவிடாதீர்கள்)."
        }
      },
      "proof": {
        "figure": "converse-bpt",
        "steps": [
          {
            "title": { "en": "1. Suppose DE is not parallel to BC", "ta": "1. DE ∥ BC இல்லை எனக் கொள்வோம்" },
            "math": { "latex": "\\text{Draw } DF\\parallel BC \\text{ meeting } AC \\text{ at } F", "fallback": "Draw DF ∥ BC meeting AC at F" },
            "reason": {
              "en": "By Thales' theorem on DF ∥ BC, we know AD/DB = AF/FC.",
              "ta": "DF ∥ BC என்பதால் தேல்ஸ் தேற்றப்படி AD/DB = AF/FC."
            }
          },
          {
            "title": { "en": "2. Equate both ratios and add 1", "ta": "2. இரு விகிதங்களையும் சமப்படுத்தி 1 கூட்டுக" },
            "math": { "latex": "\\begin{aligned}\\dfrac{AE}{EC}&=\\dfrac{AF}{FC}\\\\\\dfrac{AE}{EC}+1&=\\dfrac{AF}{FC}+1\\\\\\text{So }\\dfrac{AC}{EC}&=\\dfrac{AC}{FC}\\end{aligned}", "fallback": "AE/EC = AF/FC gives AC/EC = AC/FC" },
            "reason": {
              "en": "Adding 1 turns AE + EC and AF + FC both into the full side AC.",
              "ta": "இருபுறமும் 1 கூட்ட, AE + EC மற்றும் AF + FC ஆகிய இரண்டும் முழுப் பக்கம் AC ஆக மாறும்."
            }
          },
          {
            "title": { "en": "3. Cancelling AC forces E = F", "ta": "3. AC-ஐ நீக்க E = F கிடைக்கிறது" },
            "math": { "latex": "\\begin{aligned}EC&=FC\\text{ on }AC\\\\\\text{so point }E&=\\text{point }F\\\\\\text{hence }DE&\\parallel BC\\end{aligned}", "fallback": "EC = FC on AC forces E = F, so DE ∥ BC" },
            "reason": {
              "en": "Two points on the same side AC at the exact same distance from C must be the same point, so DE coincides with the parallel DF.",
              "ta": "AC-இன் மேல் C-யிலிருந்து ஒரே தொலைவில் உள்ள இரு புள்ளிகள் ஒன்றே என்பதால் DE மற்றும் DF ஒரே கோடாகும்; ஆகவே DE ∥ BC."
            }
          }
        ]
      },
      "question": {
        "en": "In △ABC, points D and E lie on AB and AC with AB = 12 cm, AD = 8 cm, and AC = 18 cm. What value of AE makes DE ∥ BC?",
        "ta": "△ABC-இல் AB = 12 செ.மீ, AD = 8 செ.மீ மற்றும் AC = 18 செ.மீ எனில், DE ∥ BC ஆக இருக்க AE-இன் மதிப்பு என்னவாக இருக்க வேண்டும்?"
      },
      "questionMath": {
        "latex": "\\begin{aligned}&AB=12,\\;AD=8,\\;AC=18\\,\\text{cm}\\\\&DE\\parallel BC\\text{ when }AE=\\;?\\end{aligned}",
        "fallback": "AB = 12, AD = 8, AC = 18 cm; DE ∥ BC when AE = ?"
      },
      "choices": [
        { "en": "12 cm", "ta": "12 செ.மீ" },
        { "en": "6 cm", "ta": "6 செ.மீ" },
        { "en": "14 cm", "ta": "14 செ.மீ" }
      ],
      "correct": 0,
      "hint": {
        "en": "Find the ratio AD/AB = 8/12 = 2/3, then take 2/3 of AC = 18 cm.",
        "ta": "AD/AB = 8/12 = 2/3 என்ற விகிதத்தைக் கண்டு, AC = 18 செ.மீ-இல் 2/3 பங்கைக் கணக்கிடுங்கள்."
      },
      "incorrectFeedback": [
        null,
        {
          "en": "6 cm is EC (18 − 12 = 6), which is 1/3 of AC, matching DB = 4 cm. AE must be 2/3 of 18 cm.",
          "ta": "6 செ.மீ என்பது மீதமுள்ள EC (18 − 12) ஆகும்; AE என்பது 18-இன் 2/3 பங்கான 12 செ.மீ."
        },
        {
          "en": "14 cm adds 6 to 8 instead of keeping the ratio 8/12 = 12/18.",
          "ta": "நீளங்களின் வித்தியாசம் சமமாக இருக்கக் கூடாது; விகிதம் AD/AB = AE/AC சமமாக இருக்க வேண்டும்."
        }
      ],
      "why": {
        "en": "For DE ∥ BC by the Converse of BPT, we need AD/DB = AE/EC, or equivalently AD/AB = AE/AC. Since 8/12 = 2/3, AE must be (2/3) × 18 = 12 cm (leaving EC = 6 cm, so 8/4 = 12/6 = 2).",
        "ta": "தேல்ஸ் தேற்றத்தின் மறுதலைப்படி AD/AB = AE/AC இருக்க வேண்டும். 8/12 = 2/3 என்பதால் AE = (2/3) × 18 = 12 செ.மீ (அப்போது DB = 4, EC = 6; 8/4 = 12/6 = 2)."
      },
      "whyMath": {
        "latex": "\\begin{aligned}\\dfrac{AD}{AB}&=\\dfrac{8}{12}=\\dfrac{2}{3}\\\\AE&=\\dfrac{2}{3}\\times 18=12\\,\\text{cm}\\end{aligned}",
        "fallback": "AD/AB = 8/12 = 2/3 requires AE = (2/3) × 18 = 12 cm"
      },
      "explainAfterAttempt": true,
      "connect": {
        "en": "Exercise 4.2 Q3 asks directly whether DE ∥ BC from four given lengths, and Q6 uses the converse idea to prove three lines cut transversals proportionally.",
        "ta": "பயிற்சி 4.2 வினா 3 (DE ∥ BC என நிறுவுதல்) மற்றும் வினா 6 ஆகியவற்றிற்கு இம்மறுதலைத் தேற்றம் நேரடியாகப் பயன்படுகிறது."
      },
      "practiceId": "c10-4-ex4-2-q3",
      "secondaryPracticeId": "c10-4-ex4-2-q6"
    },
    {
      "id": "g10-ch4-angle-bisector",
      "section": "4.3.1 · Theorem 3",
      "title": {
        "en": "Angle Bisector Theorem (Internal)",
        "ta": "கோண இருசமவெட்டித் தேற்றம் (உட்புறம்)"
      },
      "firstGlance": {
        "en": "The internal bisector of an angle of a triangle splits the opposite side in the exact ratio of the two sides forming that angle.",
        "ta": "ஒரு முக்கோணத்தின் கோணத்தின் உட்புற இருசமவெட்டியானது அக்கோணத்தின் எதிர்ப் பக்கத்தை உட்புறமாக அக்கோணத்தை அடக்கிய பக்கங்களின் விகிதத்தில் பிரிக்கும்."
      },
      "rule": {
        "en": "If AD bisects ∠BAC, then AB/AC = BD/DC",
        "ta": "AD ஆனது ∠BAC-இன் இருசமவெட்டி எனில், AB/AC = BD/DC"
      },
      "math": {
        "latex": "\\angle BAD=\\angle DAC \\implies \\dfrac{AB}{AC}=\\dfrac{BD}{DC}",
        "fallback": "If ∠BAD = ∠DAC, then AB/AC = BD/DC"
      },
      "glanceVisual": "angle-bisector",
      "visual": { "kind": "ch4-lab", "id": "angle-bisector" },
      "understand": {
        "intro": {
          "en": "An angle bisector splits the angle equally, NOT necessarily the opposite side! The side splits in proportion to the left and right arms of the angle.",
          "ta": "கோண இருசமவெட்டி கோணத்தை மட்டுமே இரு சம பாகங்களாகப் பிரிக்கும்; எதிர்ப் பக்கத்தை அல்ல! எதிர்ப் பக்கம் இரு பக்கங்களின் விகிதத்தில்தான் பிரியும்."
        },
        "symbols": [
          {
            "symbol": { "latex": "\\angle BAD=\\angle DAC", "fallback": "∠BAD = ∠DAC" },
            "en": "Ray AD cuts ∠A into two equal half-angles. Point D moves closer to the shorter adjacent side.",
            "ta": "AD கோடு ∠A-வை இரு சம கோணங்களாகப் பிரிக்கிறது. D புள்ளி சிறிய பக்கத்திற்கு அருகில் நகரும்."
          },
          {
            "symbol": { "latex": "\\dfrac{AB}{AC}=\\dfrac{BD}{DC}", "fallback": "AB/AC = BD/DC" },
            "en": "Notice the pairing: left side AB pairs with left segment BD; right side AC pairs with right segment DC.",
            "ta": "பொருத்தம் கவனிக்க: இடது பக்கம் AB ↔ இடது துண்டு BD; வலது பக்கம் AC ↔ வலது துண்டு DC."
          }
        ],
        "watchOut": {
          "en": "Biggest misconception: assuming BD = DC just because AD bisects ∠A. That only happens when AB = AC (isosceles triangle)!",
          "ta": "மிகப் பெரிய தவறு: கோண இருசமவெட்டி எதிர்ப் பக்கத்தை சமமாகப் பிரிக்கும் (BD = DC) என நினைப்பது. AB = AC (இருசமபக்க முக்கோணம்) எனில் மட்டுமே BD = DC."
        }
      },
      "proof": {
        "figure": "angle-bisector",
        "steps": [
          {
            "title": { "en": "1. Draw CE ∥ AB to meet extended AD at E", "ta": "1. AB-க்கு இணையாக CE வரைந்து AD-ஐ E வரை நீட்டுக" },
            "math": { "latex": "\\begin{aligned}\\angle AEC&=\\angle BAE=\\angle 1\\\\&\\text{(alternate interior angles)}\\end{aligned}", "fallback": "∠AEC = ∠BAE = ∠1 (alternate interior angles)" },
            "reason": {
              "en": "Since AD bisects ∠A, ∠CAE = ∠1 too. Thus △ACE has two equal angles, making it isosceles with AC = CE.",
              "ta": "∠CAE = ∠1 என்பதால் △ACE இருசமபக்க முக்கோணமாகிறது; எனவே AC = CE."
            }
          },
          {
            "title": { "en": "2. Compare △ABD and △ECD", "ta": "2. △ABD மற்றும் △ECD-ஐ ஒப்பிடுக" },
            "math": { "latex": "\\begin{aligned}\\triangle ABD&\\sim\\triangle ECD\\;\\text{(AA)}\\\\\\implies\\dfrac{AB}{CE}&=\\dfrac{BD}{CD}\\end{aligned}", "fallback": "△ABD ∼ △ECD (AA) gives AB/CE = BD/CD" },
            "reason": {
              "en": "Alternate angles ∠ABD = ∠ECD and vertically opposite angles at D are equal, so the two triangles are similar by AA.",
              "ta": "ஒன்றுவிட்ட கோணங்களும் குத்தெதிர்க் கோணங்களும் சமமாதலால் AA விதிப்படி △ABD ∼ △ECD."
            }
          },
          {
            "title": { "en": "3. Replace CE with AC", "ta": "3. CE-க்கு பதிலாக AC-ஐ இடுக" },
            "math": { "latex": "\\text{Since }CE=AC,\\quad \\dfrac{AB}{AC}=\\dfrac{BD}{CD}", "fallback": "Since CE = AC, AB/AC = BD/CD" },
            "reason": {
              "en": "Replacing CE by the equal segment AC completes the Angle Bisector Theorem.",
              "ta": "CE = AC என்பதால் AB/AC = BD/CD என்பது நிரூபிக்கப்படுகிறது."
            }
          }
        ]
      },
      "question": {
        "en": "In △ABC, AD is the internal bisector of ∠A meeting BC at D. If AB = 6 cm, AC = 9 cm, and BC = 10 cm, find BD.",
        "ta": "△ABC-இல் ∠A-இன் உட்புற இருசமவெட்டி AD ஆனது BC-ஐ D-இல் சந்திக்கிறது. AB = 6 செ.மீ, AC = 9 செ.மீ மற்றும் BC = 10 செ.மீ எனில் BD எவ்வளவு?"
      },
      "questionMath": {
        "latex": "\\begin{aligned}&\\angle BAD=\\angle DAC\\\\&AB=6,\\;AC=9,\\;BC=10\\,\\text{cm}\\\\&BD=\\;?\\end{aligned}",
        "fallback": "AD bisects ∠A; AB = 6, AC = 9, BC = 10 cm; BD = ?"
      },
      "choices": [
        { "en": "5 cm", "ta": "5 செ.மீ" },
        { "en": "4 cm", "ta": "4 செ.மீ" },
        { "en": "6 cm", "ta": "6 செ.மீ" }
      ],
      "correct": 1,
      "hint": {
        "en": "By ABT, BD : DC = 6 : 9 = 2 : 3. Out of 2 + 3 = 5 total shares of BC = 10 cm, how many shares is BD?",
        "ta": "தேற்றப்படி BD : DC = 6 : 9 = 2 : 3. மொத்த BC = 10 செ.மீ-இல் (2 + 3 = 5 பங்குகளில்) BD எத்தனை பங்கு?"
      },
      "incorrectFeedback": [
        {
          "en": "5 cm assumes AD bisects the base BC in half. Only a median cuts BC in half; an angle bisector cuts BC in the ratio AB : AC = 6 : 9.",
          "ta": "5 செ.மீ என்பது AD-ஐ நடுக்கோடாகக் கருதியதால் வந்த தவறு. கோண இருசமவெட்டி BC-ஐ AB : AC = 6 : 9 விகிதத்தில் பிரிக்கும்."
        },
        null,
        {
          "en": "6 cm is DC (the longer segment adjacent to AC = 9), whereas BD lies adjacent to the shorter side AB = 6.",
          "ta": "6 செ.மீ என்பது DC-இன் நீளம்! சிறிய பக்கம் AB = 6-க்கு அருகிலுள்ள BD சிறியதாக (4 செ.மீ) இருக்கும்."
        }
      ],
      "why": {
        "en": "By the Angle Bisector Theorem, BD/DC = AB/AC = 6/9 = 2/3. So BC = 10 cm splits into 2 + 3 = 5 shares of 2 cm each, giving BD = 2 × 2 = 4 cm and DC = 6 cm.",
        "ta": "கோண இருசமவெட்டித் தேற்றப்படி BD/DC = 6/9 = 2/3. BC = 10 செ.மீ என்பது 2 + 3 = 5 பங்குகளாகப் பிரிய, BD = 4 செ.மீ மற்றும் DC = 6 செ.மீ."
      },
      "whyMath": {
        "latex": "\\begin{aligned}\\dfrac{BD}{DC}&=\\dfrac{6}{9}=\\dfrac{2}{3}\\\\BD&=\\dfrac{2}{2+3}\\times 10=4\\,\\text{cm}\\end{aligned}",
        "fallback": "BD/DC = 6/9 = 2/3, so BD = (2/5) × 10 = 4 cm"
      },
      "explainAfterAttempt": true,
      "connect": {
        "en": "Exercise 4.2 Q9 combines the Angle Bisector Theorem with similar right triangles to prove ST(PQ + PR) = PQ·PR, and Q15–Q16 use ABT in triangle constructions.",
        "ta": "பயிற்சி 4.2 வினா 9, வினா 15 மற்றும் வினா 16 ஆகியவை கோண இருசமவெட்டித் தேற்றத்தை நேரடியாகப் பயன்படுத்துகின்றன."
      },
      "practiceId": "c10-4-ex4-2-q9",
      "secondaryPracticeId": "c10-4-ex4-2-q15"
    },
    {
      "id": "g10-ch4-converse-abt",
      "section": "4.3.1 · Theorem 4",
      "title": {
        "en": "Converse of Angle Bisector Theorem & triangle validity",
        "ta": "கோண இருசமவெட்டித் தேற்றத்தின் மறுதலை"
      },
      "firstGlance": {
        "en": "If a segment from a vertex divides the opposite side in the ratio of the other two sides—and the three lengths actually form a triangle—then that segment bisects the vertex angle.",
        "ta": "ஒரு முக்கோணத்தின் உச்சியிலிருந்து எதிர்ப்பக்கத்தை மற்ற இரு பக்கங்களின் விகிதத்தில் பிரிக்கும் கோடு, அம்முக்கோணம் அமையுமானால், உச்சிக்கோணத்தை இருசமக்கூறிடும்."
      },
      "rule": {
        "en": "In a valid △ABC (triangle inequality holds), if AB/AC = BD/DC then AD bisects ∠A",
        "ta": "சரியான △ABC-இல் AB/AC = BD/DC எனில் AD ஆனது ∠A-இன் இருசமவெட்டியாகும்"
      },
      "math": {
        "latex": "\\begin{aligned}&\\triangle ABC\\text{ valid and }\\dfrac{AB}{AC}=\\dfrac{BD}{DC}\\\\&\\implies\\angle BAD=\\angle DAC\\end{aligned}",
        "fallback": "If △ABC is valid and AB/AC = BD/DC, then ∠BAD = ∠DAC"
      },
      "glanceVisual": "converse-abt",
      "visual": { "kind": "ch4-lab", "id": "converse-abt" },
      "understand": {
        "intro": {
          "en": "Testing whether AD is an angle bisector requires TWO checks: first confirm the three side lengths can close into a triangle, then check whether AB/AC equals BD/DC.",
          "ta": "AD கோண இருசமவெட்டியா எனச் சோதிக்க இரண்டு சரிபார்ப்புகள் தேவை: (1) மூன்று பக்கங்களும் முக்கோணத்தை அமைக்குமா, (2) AB/AC = BD/DC சமமா."
        },
        "symbols": [
          {
            "symbol": { "latex": "AB+BC>AC", "fallback": "AB + BC > AC" },
            "en": "Triangle inequality: the sum of any two sides must be strictly greater than the third side. If AB + BC = AC, the vertices collapse onto a straight line (no triangle exists!).",
            "ta": "முக்கோணச் சமனிலி: எந்த இரு பக்கங்களின் கூடுதலும் மூன்றாவது பக்கத்தை விட அதிகமாக இருக்க வேண்டும்; சமமெனில் முக்கோணமே அமையாது."
          },
          {
            "symbol": { "latex": "\\dfrac{AB}{AC}=\\dfrac{BD}{DC}", "fallback": "AB/AC = BD/DC" },
            "en": "Once △ABC is confirmed to be a real triangle, equal ratios prove ∠BAD = ∠DAC.",
            "ta": "முக்கோணம் அமைவது உறுதியான பின், இரு விகிதங்களும் சமமானால் ∠BAD = ∠DAC என உறுதியாகக் கூறலாம்."
          }
        ],
        "watchOut": {
          "en": "Watch out for the Exercise 4.2 Q8(i) trap! Even if you compare 5/10 vs 1.5/3.5, notice that BC = 1.5 + 3.5 = 5 cm gives AB + BC = 5 + 5 = 10 = AC—so A, B, C collapse onto a single flat line!",
          "ta": "பயிற்சி 4.2 வினா 8(i)-இல் எச்சரிக்கை: AB = 5, AC = 10, BC = 1.5 + 3.5 = 5 என்பதால் AB + BC = AC ஆகி முக்கோணமே உருவாகாது!"
        }
      },
      "proof": {
        "figure": "converse-abt",
        "steps": [
          {
            "title": { "en": "1. Draw CE ∥ DA meeting extended BA at E", "ta": "1. DA-க்கு இணையாக CE வரைந்து BA-ஐ E வரை நீட்டுக" },
            "math": { "latex": "\\begin{aligned}\\angle 1&=\\angle BAD=\\angle AEC\\\\\\angle 2&=\\angle DAC=\\angle ACE\\end{aligned}", "fallback": "∠1 = ∠BAD = ∠AEC and ∠2 = ∠DAC = ∠ACE" },
            "reason": {
              "en": "Corresponding angles give ∠1 = ∠AEC, and alternate interior angles give ∠2 = ∠ACE.",
              "ta": "ஒத்த கோணங்களால் ∠1 = ∠AEC; ஒன்றுவிட்ட கோணங்களால் ∠2 = ∠ACE."
            }
          },
          {
            "title": { "en": "2. Apply Thales' theorem in △BCE", "ta": "2. △BCE-இல் தேல்ஸ் தேற்றத்தைப் பயன்படுத்துக" },
            "math": { "latex": "DA\\parallel CE\\implies\\dfrac{BA}{AE}=\\dfrac{BD}{DC}=\\dfrac{AB}{AC}", "fallback": "DA ∥ CE gives BA/AE = BD/DC = AB/AC" },
            "reason": {
              "en": "Since BA = AB, equating BA/AE with AB/AC immediately yields AE = AC.",
              "ta": "BA = AB என்பதால் BA/AE = AB/AC-லிருந்து AE = AC எனக் கிடைக்கிறது."
            }
          },
          {
            "title": { "en": "3. Isosceles △ACE forces ∠1 = ∠2", "ta": "3. இருசமபக்க △ACE மூலம் ∠1 = ∠2" },
            "math": { "latex": "\\begin{aligned}AC=AE&\\implies\\angle AEC=\\angle ACE\\\\&\\implies\\angle 1=\\angle 2\\end{aligned}", "fallback": "AC = AE makes ∠AEC = ∠ACE, so ∠1 = ∠2" },
            "reason": {
              "en": "Therefore ∠BAD = ∠DAC, proving AD bisects ∠A internally.",
              "ta": "எனவே ∠BAD = ∠DAC; ஆகவே AD கோணத்தை இருசமக்கூறிடுகிறது."
            }
          }
        ]
      },
      "question": {
        "en": "Suppose AB = 3 cm, AC = 6 cm, and point D lies on BC with BD = 1 cm and DC = 2 cm. Does AD bisect ∠A of a triangle ABC?",
        "ta": "AB = 3 செ.மீ, AC = 6 செ.மீ மற்றும் BC-இன் மேல் உள்ள புள்ளி D ஆனது BD = 1 செ.மீ, DC = 2 செ.மீ எனப் பிரித்தால், முக்கோணம் ABC-இல் AD கோண இருசமவெட்டியா?"
      },
      "questionMath": {
        "latex": "\\begin{aligned}&AB=3,\\;AC=6,\\;BD=1,\\;DC=2\\,\\text{cm}\\\\&(BC=1+2=3\\,\\text{cm})\\end{aligned}",
        "fallback": "AB = 3, AC = 6, BD = 1, DC = 2 cm (BC = 3 cm)"
      },
      "choices": [
        { "en": "Yes — because 3/6 = 1/2", "ta": "ஆம் — 3/6 = 1/2 என்பதால்" },
        { "en": "No — AD is a median instead", "ta": "இல்லை — AD ஒரு நடுக்கோடு" },
        { "en": "No — 3 + 3 = 6 means A, B, C collapse onto a straight line (no triangle)", "ta": "இல்லை — AB + BC = 3 + 3 = 6 = AC என்பதால் முக்கோணமே அமையாது" }
      ],
      "correct": 2,
      "hint": {
        "en": "Add AB + BC and compare with AC = 6 cm before checking the ratio!",
        "ta": "விகிதத்தைச் சோதிக்கும் முன் AB + BC-ஐக் கூட்டி AC = 6 செ.மீ உடன் ஒப்பிடுங்கள்!"
      },
      "incorrectFeedback": [
        {
          "en": "Wait! Check the triangle inequality first: BC = BD + DC = 3 cm, so AB + BC = 3 + 3 = 6 cm = AC. A triangle cannot have two sides summing to the third side!",
          "ta": "கவனிக்க: BC = 1 + 2 = 3 செ.மீ என்பதால் AB + BC = 3 + 3 = 6 = AC ஆகிறது; முக்கோணமே உருவாகாது!"
        },
        {
          "en": "BD = 1 and DC = 2 are not equal, so AD is not a median—more importantly, check whether AB + BC > AC!",
          "ta": "BD ≠ DC என்பதால் இது நடுக்கோடல்ல; அதைவிட முக்கியமாக AB + BC > AC உள்ளதா எனப் பாருங்கள்!"
        },
        null
      ],
      "why": {
        "en": "Always check triangle existence first! Here BC = 1 + 2 = 3 cm, so AB + BC = 3 + 3 = 6 cm = AC. By the triangle inequality, no triangle ABC can be formed—even though 3/6 = 1/2.",
        "ta": "முதலில் முக்கோணம் அமையுமா எனப் பார்க்க வேண்டும்: BC = 3 செ.மீ என்பதால் AB + BC = 3 + 3 = 6 = AC. எனவே முக்கோணம் ABC உருவாகாது."
      },
      "whyMath": {
        "latex": "\\begin{aligned}AB+BC&=3+3=6=AC\\\\&\\text{Fails }AB+BC>AC\\;(\\text{flat line})\\end{aligned}",
        "fallback": "AB + BC = 3 + 3 = 6 = AC violates AB + BC > AC (degenerate line)"
      },
      "explainAfterAttempt": true,
      "connect": {
        "en": "This directly illuminates Exercise 4.2 Q8(i) (collinear trap), Q8(ii) (valid converse bisector), and Q10 (using ABT then Converse ABT via Converse BPT).",
        "ta": "பயிற்சி 4.2 வினா 8(i), வினா 8(ii) மற்றும் வினா 10 ஆகியவற்றில் விகிதத்துடன் முக்கோணச் சமனிலியையும் சரிபார்க்க இக்கருத்து உதவுகிறது."
      },
      "practiceId": "c10-4-ex4-2-q8-i",
      "secondaryPracticeId": "c10-4-ex4-2-q8-ii",
      "tertiaryPracticeId": "c10-4-ex4-2-q10"
    },
    {
      "id": "g10-ch4-triangle-construction",
      "section": "4.3.2",
      "title": {
        "en": "Constructing a triangle from base, vertical angle & median / altitude / bisector",
        "ta": "அடிப்பக்கம், உச்சிக்கோணம் மற்றும் நடுக்கோடு/குத்துயரம்/இருசமவெட்டி கொண்டு முக்கோணம் வரைதல்"
      },
      "firstGlance": {
        "en": "Every point on the major circular arc above a fixed base sees that base at the exact same vertical angle, so intersecting that arc with a median, altitude, or bisector pins down the triangle.",
        "ta": "அடிப்பக்கத்தின் மேல் உள்ள பெரிய வட்டவில்லில் அமையும் எல்லாப் புள்ளிகளும் ஒரே உச்சிக்கோணத்தைத் தரும்; அதனுடன் நடுக்கோடு, குத்துக்கோடு அல்லது இருசமவெட்டியை வெட்டினால் முக்கோணம் கிடைக்கும்."
      },
      "rule": {
        "en": "Circumcircle arc holds ∠P = θ constant · Second condition (median / altitude / bisector) fixes P",
        "ta": "சுற்றுவட்ட வில் ∠P = θ-வை மாறாமல் வைக்கும் · இரண்டாம் நிபந்தனை P-ஐ நிலைநிறுத்தும்"
      },
      "math": {
        "latex": "\\begin{aligned}&\\angle RQX=\\theta,\\;QO\\perp QX\\\\&\\implies\\angle QPR=\\theta\\text{ on major arc }QR\\end{aligned}",
        "fallback": "With ∠RQX = θ and QO ⟂ QX, every P on the major arc QR has ∠QPR = θ"
      },
      "glanceVisual": "triangle-construction",
      "visual": { "kind": "ch4-lab", "id": "triangle-construction" },
      "understand": {
        "intro": {
          "en": "Exercise 4.2 Q11–Q16 all share the exact same circular-arc engine for the base and vertical angle, changing only the final step!",
          "ta": "பயிற்சி 4.2 வினாக்கள் 11–16 அனைத்தும் ஒரே சுற்றுவட்ட வில் முறையைப் பயன்படுத்தி, இறுதிப் படியில் மட்டுமே வேறுபடுகின்றன."
        },
        "symbols": [
          {
            "symbol": { "latex": "QO\\perp QX,\\; OG\\perp QR", "fallback": "QO ⟂ QX, OG ⟂ QR" },
            "en": "Drawing ∠RQX = θ below the base makes QX tangent to the circumcircle at Q, so the centre O lies where the perpendicular to QX meets the perpendicular bisector of QR.",
            "ta": "அடிப்பக்கத்திற்குக் கீழ் ∠RQX = θ வரைந்து QX-க்குச் செங்குத்தாக QO வரைந்தால், அது QR-இன் செங்குத்து இருசமவெட்டியை சுற்றுவட்ட மையம் O-இல் சந்திக்கும்."
          },
          {
            "symbol": { "latex": "\\text{Median }PG \\text{ vs Altitude }PM", "fallback": "Median PG vs Altitude PM" },
            "en": "For median PG, swing an arc of radius PG from midpoint G. For altitude h, draw a parallel line at height h above QR.",
            "ta": "நடுக்கோடு PG எனில் நடுப்புள்ளி G-யிலிருந்து PG ஆர வில் வரையவும்; குத்துக்கோடு h எனில் QR-க்கு h உயரத்தில் இணைகோடு வரையவும்."
          },
          {
            "symbol": { "latex": "\\text{Angle bisector }PD", "fallback": "Angle bisector PD" },
            "en": "Because equal arcs subtend equal angles, the bisector of ∠QPR always passes through the midpoint I of the lower minor arc QR! Connect I through D to meet the top arc at P.",
            "ta": "சம வில்கள் சம கோணங்களைத் தாங்கும் என்பதால், ∠P-இன் கோண இருசமவெட்டி எப்போதும் கீழ் வில்லின் நடுப்புள்ளி I வழியே செல்லும்; ID-ஐ நீட்டி P-ஐக் காணலாம்."
          }
        ],
        "watchOut": {
          "en": "Make sure you draw ∠RQX = θ BELOW the base QR, and remember that when you draw the perpendicular QO ⟂ QX upward, O sits inside or above/below the base depending on whether θ < 90° or θ > 90°.",
          "ta": "கோணம் ∠RQX = θ-வை அடிப்பக்கம் QR-க்குக் கீழ்புறம் வரைய வேண்டும்; அப்போதுதான் மேல் வில் முழுமையாக θ கோணத்தைத் தாங்கும்."
        }
      },
      "proof": {
        "figure": "triangle-construction",
        "steps": [
          {
            "title": { "en": "1. QX is tangent to the circle at Q", "ta": "1. Q-இல் QX ஒரு தொடுகோடாகும்" },
            "math": { "latex": "\\begin{aligned}&QO\\perp QX\\text{ makes }QX\\\\&\\text{tangent to circle }(O,OQ)\\text{ at }Q\\end{aligned}", "fallback": "QO ⟂ QX makes QX tangent to circle (O, OQ) at Q" },
            "reason": {
              "en": "A line perpendicular to a radius at its circle endpoint is always a tangent.",
              "ta": "ஆரத்திற்கு அதன் முனையில் வரையப்படும் செங்குத்துக் கோடு தொடுகோடாகும்."
            }
          },
          {
            "title": { "en": "2. Alternate Segment Theorem locks ∠QPR = θ", "ta": "2. ஒன்றுவிட்ட துண்டுத் தேற்றம் ∠QPR = θ-வை உறுதிசெய்கிறது" },
            "math": { "latex": "\\begin{aligned}\\angle QPR&=\\angle RQX=\\theta\\\\&\\text{for every }P\\text{ on major arc }QR\\end{aligned}", "fallback": "∠QPR = ∠RQX = θ for every P on major arc QR" },
            "reason": {
              "en": "The angle between tangent QX and chord QR equals the inscribed angle in the opposite (major) segment!",
              "ta": "தொடுகோடு QX-க்கும் நாண் QR-க்கும் இடையேயான கோணம், எதிர் வட்டத்துண்டில் அமையும் கோணம் ∠QPR-க்குச் சமம்."
            }
          },
          {
            "title": { "en": "3. Bisector passes through minor-arc midpoint I", "ta": "3. கோண இருசமவெட்டி கீழ்வில்லின் நடுப்புள்ளி I வழியே செல்லும்" },
            "math": { "latex": "\\begin{aligned}\\widehat{QI}&=\\widehat{IR}\\\\\\text{so }\\angle QPI&=\\angle IPR=\\dfrac{\\theta}{2}\\end{aligned}", "fallback": "arc QI = arc IR gives ∠QPI = ∠IPR = θ/2" },
            "reason": {
              "en": "Equal lower arcs QI and IR subtend equal half-angles θ/2 at P, so ray ID automatically locates the exact vertex P.",
              "ta": "சம வில்கள் QI, IR என்பன P-இல் சம அரைக் கோணங்களைத் (θ/2) தாங்குவதால், ID கோடு சரியாக P-ஐ வெட்டும்."
            }
          }
        ]
      },
      "question": {
        "en": "In Exercise 4.2 Q15–Q16, why do we join the lower minor-arc midpoint I through D on the base to find the third vertex P on the upper circle?",
        "ta": "பயிற்சி 4.2 வினா 15–16-இல் முக்கோணம் வரையும்போது, கீழ் வில்லின் நடுப்புள்ளி I-ஐ D வழியே நீட்டி ஏன் உச்சி P-ஐக் காண்கிறோம்?"
      },
      "questionMath": {
        "latex": "\\begin{aligned}&\\text{Why does line }ID\\text{ locate }P\\\\&\\text{so that }PD\\text{ bisects }\\angle P?\\end{aligned}",
        "fallback": "Why does line ID locate vertex P so PD bisects ∠P?"
      },
      "choices": [
        { "en": "Because equal arcs QI and IR subtend equal angles ∠QPI = ∠IPR at P", "ta": "சம வில்கள் QI, IR என்பன P-இல் சம கோணங்களைத் (∠QPI = ∠IPR) தாங்குவதால்" },
        { "en": "Because I is the centroid of △PQR", "ta": "I என்பது △PQR-இன் நடுக்கோட்டு மையம் என்பதால்" },
        { "en": "Because ID is always perpendicular to QR", "ta": "ID எப்போதும் QR-க்குச் செங்குத்தாக இருப்பதால்" }
      ],
      "correct": 0,
      "hint": {
        "en": "In a circle, what is true about inscribed angles that stand on two equal arcs QI and IR?",
        "ta": "ஒரு வட்டத்தில் சம வில்கள் QI மற்றும் IR மீது அமையும் இரு வட்டப் பரிதிக் கோணங்கள் எப்படி இருக்கும்?"
      },
      "incorrectFeedback": [
        null,
        {
          "en": "The centroid is inside the triangle where medians meet. Point I lies on the bottom arc of the circumcircle where the perpendicular bisector of QR cuts it.",
          "ta": "நடுக்கோட்டு மையம் முக்கோணத்திற்கு உள்ளே இருக்கும். I என்பது சுற்றுவட்டத்தின் கீழ் வில்லின் நடுப்புள்ளியாகும்."
        },
        {
          "en": "Only the perpendicular bisector line OG passes straight down through I at 90° to QR; line ID is slanted whenever D ≠ G.",
          "ta": "OG மட்டுமே QR-க்குச் செங்குத்து; D நடுப்புள்ளியில் இல்லாதபோது ID சாய்ந்தே செல்லும்."
        }
      ],
      "why": {
        "en": "Because the perpendicular bisector of QR cuts the minor arc at its midpoint I, arc QI equals arc IR. Equal arcs subtend equal inscribed angles at P (∠QPI = ∠IPR), so any line from I through D to P automatically bisects ∠QPR.",
        "ta": "QR-இன் செங்குத்து இருசமவெட்டி கீழ் வில்லை நடுப்புள்ளி I-இல் வெட்டுவதால் வில் QI = வில் IR. சம வில்கள் P-இல் சம கோணங்களைத் தாங்குவதால் ID கோடு ∠P-இன் இருசமவெட்டியாகிறது."
      },
      "whyMath": {
        "latex": "\\begin{aligned}\\widehat{QI}&=\\widehat{IR}\\\\\\text{so }\\angle QPI&=\\angle IPR\\\\&\\text{(bisector }PD\\text{ passes through }I\\text{)}\\end{aligned}",
        "fallback": "arc QI = arc IR ⇒ ∠QPI = ∠IPR (bisector passes through I)"
      },
      "explainAfterAttempt": true,
      "connect": {
        "en": "This single idea explains all six construction tasks at the end of Exercise 4.2: Q11–Q12 (median), Q13–Q14 (altitude), and Q15–Q16 (angle bisector).",
        "ta": "பயிற்சி 4.2-இன் இறுதி ஆறு வரைபடக் கணக்குகளுக்கும் (வினா 11–12 நடுக்கோடு, 13–14 குத்துக்கோடு, 15–16 கோண இருசமவெட்டி) இதுவே அடிப்படை."
      },
      "practiceId": "c10-4-ex4-2-q11",
      "secondaryPracticeId": "c10-4-ex4-2-q13",
      "tertiaryPracticeId": "c10-4-ex4-2-q15"
    },
    {
      "id": "g10-ch4-pythagoras",
      "section": "4.4 · Theorem 5",
      "title": {
        "en": "Pythagoras Theorem (Baudhayana) & Converse",
        "ta": "பிதாகரஸ் தேற்றம் (பௌதாயனர் தேற்றம்) & மறுதலை"
      },
      "firstGlance": {
        "en": "In any right-angled triangle, the square built on the hypotenuse has the exact same area as the two squares built on the other two sides combined.",
        "ta": "ஒரு செங்கோண முக்கோணத்தில் கர்ணத்தின் வர்க்கம் மற்ற இரு பக்கங்களின் வர்க்கங்களின் கூடுதலுக்குச் சமம்."
      },
      "rule": {
        "en": "∠C = 90° gives a² + b² = c² · Converse: if c² = a² + b² then ∠C = 90°",
        "ta": "∠C = 90° எனில் a² + b² = c² · மறுதலை: c² = a² + b² எனில் ∠C = 90°"
      },
      "math": {
        "latex": "\\begin{aligned}&\\angle C=90^\\circ\\iff a^2+b^2=c^2\\\\&(c\\text{ is hypotenuse opposite }90^\\circ)\\end{aligned}",
        "fallback": "∠C = 90° ⇔ a² + b² = c² (c is the hypotenuse)"
      },
      "glanceVisual": "pythagoras",
      "visual": { "kind": "ch4-lab", "id": "pythagoras" },
      "understand": {
        "intro": {
          "en": "Also known in India as the Baudhayana Theorem, Pythagoras' theorem connects geometry (90° corner) to algebra (a² + b² = c²) and works in reverse as well.",
          "ta": "இந்தியாவில் பௌதாயனர் தேற்றம் என்றும் அழைக்கப்படும் பிதாகரஸ் தேற்றம், செங்கோணத்தையும் பக்க நீளங்களின் வர்க்கங்களையும் இணைக்கிறது."
        },
        "symbols": [
          {
            "symbol": { "latex": "c", "fallback": "c" },
            "en": "The hypotenuse—always the longest side, sitting directly opposite the 90° angle.",
            "ta": "கர்ணம் — எப்போதும் 90° கோணத்திற்கு எதிரே உள்ள மிக நீளமான பக்கம்."
          },
          {
            "symbol": { "latex": "(a,b,c)", "fallback": "(a, b, c)" },
            "en": "A Pythagorean triplet when three natural numbers satisfy a² + b² = c², such as (3, 4, 5), (5, 12, 13), and (8, 15, 17).",
            "ta": "a² + b² = c²-ஐ நிறைவு செய்யும் மூன்று இயல் எண்கள் பிதாகோரியனின் மூன்றின் தொகுதி எனப்படும் (எ.கா. 3, 4, 5; 5, 12, 13)."
          }
        ],
        "watchOut": {
          "en": "Do not apply a² + b² = c² to non-right triangles, and always place the longest side (the hypotenuse) alone on the right-hand side c²!",
          "ta": "செங்கோண முக்கோணம் அல்லாதவற்றிற்கு இதைப் பயன்படுத்தக் கூடாது; மேலும் மிக நீளமான கர்ணத்தை மட்டுமே தனியே c² என வைக்க வேண்டும்."
        }
      },
      "proof": {
        "figure": "pythagoras",
        "steps": [
          {
            "title": { "en": "1. Similarity proof (2025 textbook): drop altitude AD ⟂ BC", "ta": "1. வடிவொப்புமை நிரூபணம்: AD ⟂ BC வரைக" },
            "math": { "latex": "\\begin{aligned}\\triangle ABC&\\sim\\triangle DBA\\\\\\implies\\dfrac{AB}{BD}&=\\dfrac{BC}{AB}\\\\\\implies AB^2&=BC\\cdot BD\\end{aligned}", "fallback": "△ABC ∼ △DBA gives AB² = BC × BD" },
            "reason": {
              "en": "Both triangles share ∠B and have a 90° angle (∠BAC = ∠BDA = 90°), so AA similarity gives AB² = BC × BD.",
              "ta": "∠B பொதுவாகவும் ∠BAC = ∠BDA = 90° ஆகவும் உள்ளதால் AA விதிப்படி AB² = BC × BD."
            }
          },
          {
            "title": { "en": "2. Repeat on the right sub-triangle △DAC", "ta": "2. வலப்பக்க முக்கோணம் △DAC-க்குத் தொடர்க" },
            "math": { "latex": "\\begin{aligned}\\triangle ABC&\\sim\\triangle DAC\\\\\\implies\\dfrac{BC}{AC}&=\\dfrac{AC}{DC}\\\\\\implies AC^2&=BC\\cdot DC\\end{aligned}", "fallback": "△ABC ∼ △DAC gives AC² = BC × DC" },
            "reason": {
              "en": "Sharing ∠C and a 90° angle gives AC² = BC × DC.",
              "ta": "∠C பொதுவாகவும் 90° சமமாகவும் உள்ளதால் AC² = BC × DC."
            }
          },
          {
            "title": { "en": "3. Add both equations (and compare the area square!)", "ta": "3. இரு சமன்பாடுகளையும் கூட்டுக" },
            "math": { "latex": "\\begin{aligned}AB^2+AC^2&=BC(BD+DC)\\\\&=BC\\cdot BC=BC^2\\end{aligned}", "fallback": "AB² + AC² = BC(BD + DC) = BC²" },
            "reason": {
              "en": "Because BD + DC = BC, the two parts add cleanly to BC². In the Discover lab above, rearranging four triangles inside an (a + b)² square shows the exact same identity geometrically!",
              "ta": "BD + DC = BC என்பதால் AB² + AC² = BC² கிடைக்கிறது. மேற்கண்ட காட்சியில் (a + b)² சதுரத்திற்குள் 4 முக்கோணங்களை நகர்த்தியும் இதைப் பரப்பளவாகக் காணலாம்."
            }
          }
        ]
      },
      "question": {
        "en": "A 5 m ladder leans against a vertical wall with its foot 3 m from the wall. If the foot is slid 1.6 m closer to the wall (now 1.4 m away), how high up the wall does the top reach?",
        "ta": "5 மீ நீளமுள்ள ஏணி சுவரிலிருந்து 3 மீ தொலைவில் சாய்த்து வைக்கப்பட்டுள்ளது. அதன் அடிப்பகுதியைச் சுவரை நோக்கி 1.6 மீ நகர்த்தினால் (தூரம் 1.4 மீ), ஏணியின் மேல் முனை எவ்வளவு உயரத்தை அடையும்?"
      },
      "questionMath": {
        "latex": "\\begin{aligned}&\\text{Hypotenuse }=5\\,\\text{m}\\\\&\\text{New base }=3-1.6=1.4\\,\\text{m}\\\\&h=\\;?\\end{aligned}",
        "fallback": "Hypotenuse = 5 m, new base = 3 − 1.6 = 1.4 m, h = ?"
      },
      "choices": [
        { "en": "5.6 m", "ta": "5.6 மீ" },
        { "en": "4.8 m", "ta": "4.8 மீ" },
        { "en": "3.6 m", "ta": "3.6 மீ" }
      ],
      "correct": 1,
      "hint": {
        "en": "The ladder length remains 5 m (hypotenuse). Compute h² = 5² − 1.4² = 25 − 1.96.",
        "ta": "ஏணியின் நீளம் 5 மீ (கர்ணம்) மாறாது. h² = 5² − 1.4² = 25 − 1.96 எனக் கணக்கிடுங்கள்."
      },
      "incorrectFeedback": [
        {
          "en": "5.6 m would mean the ladder reaches higher than its own 5 m length, which is impossible! Subtract 1.4² from 5², do not add.",
          "ta": "5.6 மீ என்பது ஏணியின் நீளமான 5 மீட்டரை விட அதிகம்—சாத்தியமில்லை! 5²-இலிருந்து 1.4²-ஐக் கழிக்க வேண்டும்."
        },
        null,
        {
          "en": "3.6 m subtracts 1.4 directly from 5 (5 − 1.4 = 3.6) instead of using squares: h² = 5² − 1.4².",
          "ta": "5 − 1.4 = 3.6 என நேரடியாகக் கழிக்கக் கூடாது; வர்க்கங்களின் வித்தியாசம் h² = 5² − 1.4² காண வேண்டும்."
        }
      ],
      "why": {
        "en": "By Pythagoras' theorem, h² + 1.4² = 5², so h² = 25 − 1.96 = 23.04. Taking the square root gives h = 4.8 m (the top slid up by 0.8 m from its original 4 m height).",
        "ta": "பிதாகரஸ் தேற்றப்படி h² = 5² − 1.4² = 25 − 1.96 = 23.04; ஆகவே h = 4.8 மீ."
      },
      "whyMath": {
        "latex": "\\begin{aligned}h&=\\sqrt{5^2-1.4^2}\\\\&=\\sqrt{23.04}=4.8\\,\\text{m}\\end{aligned}",
        "fallback": "h = √(5² − 1.4²) = √23.04 = 4.8 m"
      },
      "explainAfterAttempt": true,
      "connect": {
        "en": "Directly prepares Exercise 4.3 (Pythagoras applications, including Q6 ladder-slide) and supports right-triangle tangent and altitude lengths in Exercises 4.2 & 4.4.",
        "ta": "பயிற்சி 4.3 கணக்குகளுக்கும் (குறிப்பாக வினா 6 ஏணி கணக்கு), பயிற்சி 4.2, 4.4-இல் வரும் செங்கோணத் தொடர்புகளுக்கும் இது நேரடியாக உதவுகிறது."
      },
      "practiceId": "c10-4-ex4-3-q6",
      "relatedExercise": "4.3"
    },
    {
      "id": "g10-ch4-circles-tangents",
      "section": "4.5 · Theorem 6",
      "title": {
        "en": "Circles, Tangents & Alternate Segment Theorem",
        "ta": "வட்டங்கள், தொடுகோடுகள் & ஒன்றுவிட்ட துண்டுத் தேற்றம்"
      },
      "firstGlance": {
        "en": "A tangent touches a circle at one point perpendicular to the radius, and the angle between a tangent and a chord equals the inscribed angle in the opposite segment.",
        "ta": "தொடுகோடு வட்டத்தை ஒரே புள்ளியில் ஆரத்திற்குச் செங்குத்தாகத் தொடும்; தொடுகோட்டிற்கும் நாணுக்கும் இடையேயான கோணம் ஒன்றுவிட்ட வட்டத்துண்டுக் கோணத்திற்குச் சமம்."
      },
      "rule": {
        "en": "Radius ⟂ Tangent · PA = PB from external P · Tangent–chord angle ∠QPB = ∠PSQ",
        "ta": "ஆரம் ⟂ தொடுகோடு · வெளிப்புள்ளி P-லிருந்து PA = PB · ஒன்றுவிட்ட துண்டு: ∠QPB = ∠PSQ"
      },
      "math": {
        "latex": "\\begin{aligned}&OT\\perp PT,\\qquad PA=PB\\\\&\\angle QPB=\\angle PSQ\\;\\text{(Alternate Segment)}\\end{aligned}",
        "fallback": "OT ⟂ PT, PA = PB, and ∠QPB = ∠PSQ (Alternate Segment Theorem)"
      },
      "glanceVisual": "circles-tangents",
      "visual": { "kind": "ch4-lab", "id": "circles-tangents" },
      "understand": {
        "intro": {
          "en": "Tangents connect circles to right triangles (via OT ⟂ PT) and to inscribed angles (via the Alternate Segment Theorem).",
          "ta": "தொடுகோடுகள் வட்டத்தைச் செங்கோண முக்கோணங்களுடனும் (OT ⟂ PT) வட்டப் பரிதிக் கோணங்களுடனும் இணைக்கின்றன."
        },
        "symbols": [
          {
            "symbol": { "latex": "OT\\perp PT", "fallback": "OT ⟂ PT" },
            "en": "At the point of contact T, the radius OT meets the tangent PT at 90°, turning △OTP into a right triangle where OP² = OT² + PT².",
            "ta": "தொடுபுள்ளி T-இல் ஆரம் OT-யும் தொடுகோடு PT-யும் 90° கோணத்தில் சந்திக்கும்; எனவே △OTP ஒரு செங்கோண முக்கோணம்."
          },
          {
            "symbol": { "latex": "PA=PB", "fallback": "PA = PB" },
            "en": "From any exterior point P, exactly two tangents can be drawn and their lengths to the contact points A and B are equal.",
            "ta": "வட்டத்திற்கு வெளியே உள்ள ஒரு புள்ளியிலிருந்து 2 சம நீளத் தொடுகோடுகள் வரையலாம் (PA = PB). உள் புள்ளியிலிருந்து 0; வட்டத்தின் மேல் 1."
          },
          {
            "symbol": { "latex": "\\angle QPB=\\angle PSQ", "fallback": "∠QPB = ∠PSQ" },
            "en": "Chord PQ splits the circle into two segments. The angle ∠QPB on one side of PQ equals the inscribed angle ∠PSQ sitting in the alternate (opposite) segment!",
            "ta": "நாண் PQ வட்டத்தை இரு துண்டுகளாகப் பிரிக்கும். ஒரு பக்கத் தொடுகோட்டுக் கோணம் ∠QPB, எதிர் (ஒன்றுவிட்ட) வட்டத்துண்டில் உள்ள ∠PSQ-க்குச் சமம்."
          }
        ],
        "watchOut": {
          "en": "Make sure you pick the angle in the OPPOSITE segment from the tangent–chord angle: ∠QPB (to the right of PQ) equals ∠PSQ (to the left of PQ), whereas ∠QPA equals ∠PTQ.",
          "ta": "எப்போதும் தொடுகோட்டுக் கோணத்திற்கு எதிர்ப்புற வட்டத்துண்டில் உள்ள கோணத்தையே எடுக்க வேண்டும் (∠QPB = ∠PSQ; ∠QPA = ∠PTQ)."
        }
      },
      "proof": {
        "figure": "circles-tangents",
        "steps": [
          {
            "title": { "en": "1. Draw diameter POR through contact point P", "ta": "1. P வழியே விட்டம் POR வரைக" },
            "math": { "latex": "\\begin{aligned}\\angle RPB&=90^\\circ\\\\\\angle RPQ+\\angle QPB&=90^\\circ\\end{aligned}", "fallback": "∠RPB = 90° gives ∠RPQ + ∠QPB = 90°" },
            "reason": {
              "en": "Because diameter RP is perpendicular to tangent AB at P, the two adjacent angles sum to 90°.",
              "ta": "தொடுபுள்ளி P-இல் விட்டம் RP செங்குத்தாக இருப்பதால் ∠RPQ + ∠QPB = 90°."
            }
          },
          {
            "title": { "en": "2. Angle in semicircle ∠PQR = 90°", "ta": "2. அரைவட்டக் கோணம் ∠PQR = 90°" },
            "math": { "latex": "\\begin{aligned}\\angle QRP+\\angle RPQ&=90^\\circ\\\\\\implies\\angle QPB&=\\angle QRP\\end{aligned}", "fallback": "∠QRP + ∠RPQ = 90° so ∠QPB = ∠QRP" },
            "reason": {
              "en": "In right △PQR, the two acute angles also add to 90°, so ∠QPB equals ∠QRP.",
              "ta": "செங்கோண △PQR-இல் இரு குறுங்கோணங்களின் கூடுதல் 90° என்பதால் ∠QPB = ∠QRP."
            }
          },
          {
            "title": { "en": "3. Angles in the same segment are equal", "ta": "3. ஒரே வட்டத்துண்டுக் கோணங்கள் சமம்" },
            "math": { "latex": "\\begin{aligned}\\angle QRP&=\\angle PSQ\\\\\\implies\\angle QPB&=\\angle PSQ\\end{aligned}", "fallback": "∠QRP = ∠PSQ gives ∠QPB = ∠PSQ" },
            "reason": {
              "en": "Both R and S lie on the same upper arc standing on chord PQ, so ∠QRP = ∠PSQ = ∠QPB!",
              "ta": "R மற்றும் S ஆகிய இரண்டும் ஒரே வட்டத்துண்டில் PQ-இன் மேல் உள்ளதால் ∠QRP = ∠PSQ = ∠QPB."
            }
          }
        ]
      },
      "question": {
        "en": "A point P is 13 cm from the centre O of a circle of radius 5 cm. What is the length of the tangent PT drawn from P to the circle?",
        "ta": "5 செ.மீ ஆரமுள்ள வட்டத்தின் மையம் O-விலிருந்து 13 செ.மீ தொலைவில் உள்ள P என்ற புள்ளியிலிருந்து வரையப்படும் தொடுகோடு PT-இன் நீளம் என்ன?"
      },
      "questionMath": {
        "latex": "\\begin{aligned}&OP=13\\,\\text{cm},\\quad OT=5\\,\\text{cm}\\\\&OT\\perp PT,\\quad PT=\\;?\\end{aligned}",
        "fallback": "OP = 13 cm, OT = 5 cm, OT ⟂ PT, PT = ?"
      },
      "choices": [
        { "en": "12 cm", "ta": "12 செ.மீ" },
        { "en": "8 cm", "ta": "8 செ.மீ" },
        { "en": "13.93 cm", "ta": "13.93 செ.மீ" }
      ],
      "correct": 0,
      "hint": {
        "en": "Since OT ⟂ PT, OP = 13 cm is the hypotenuse of right △OTP!",
        "ta": "OT ⟂ PT என்பதால் செங்கோண △OTP-இல் OP = 13 செ.மீ கர்ணமாகும்!"
      },
      "incorrectFeedback": [
        null,
        {
          "en": "8 cm subtracts 13 − 5 instead of applying Pythagoras' theorem to right triangle △OTP.",
          "ta": "13 − 5 = 8 என நேரடியாகக் கழிக்கக் கூடாது; பிதாகரஸ் தேற்றத்தைப் பயன்படுத்த வேண்டும்."
        },
        {
          "en": "13.93 cm adds 13² + 5². Remember ∠OTP = 90°, so OP (from centre to outside point) is the hypotenuse, not PT!",
          "ta": "∠OTP = 90° என்பதால் OP கர்ணம் ஆகும்; எனவே PT² = 13² − 5², கூட்டக் கூடாது."
        }
      ],
      "why": {
        "en": "Because radius OT is perpendicular to tangent PT at the point of contact T, △OTP has ∠T = 90° and hypotenuse OP = 13 cm. Thus PT² = 13² − 5² = 169 − 25 = 144, giving PT = 12 cm.",
        "ta": "ஆரம் OT தொடுகோடு PT-க்குச் செங்குத்தாக உள்ளதால் OP = 13 செ.மீ கர்ணமாகும். PT² = 13² − 5² = 144 ⇒ PT = 12 செ.மீ."
      },
      "whyMath": {
        "latex": "\\begin{aligned}PT&=\\sqrt{OP^2-OT^2}\\\\&=\\sqrt{13^2-5^2}=\\sqrt{144}=12\\,\\text{cm}\\end{aligned}",
        "fallback": "PT = √(13² − 5²) = √144 = 12 cm"
      },
      "explainAfterAttempt": true,
      "connect": {
        "en": "Prepares Exercise 4.4 (tangents, touching circles, alternate segment calculations & constructions) and directly explains why QO ⟂ QX creates the constant-angle arc in Exercise 4.2 Q11–Q16.",
        "ta": "பயிற்சி 4.4-இன் தொடுகோடு கணக்குகளுக்கும், பயிற்சி 4.2 வினா 11–16-இல் உள்ள சுற்றுவட்ட வரைபடத்திற்கும் இத்தேற்றமே காரணம்."
      },
      "practiceId": "c10-4-ex4-4-q1",
      "secondaryPracticeId": "c10-4-ex4-4-q11",
      "relatedExercise": "4.4"
    },
    {
      "id": "g10-ch4-concurrency",
      "section": "4.6",
      "title": {
        "en": "Concurrency Theorems: Ceva's & Menelaus's Theorems",
        "ta": "ஒருங்கிசைவுத் தேற்றங்கள்: சீவாஸ் & மெனிலாஸ் தேற்றங்கள்"
      },
      "firstGlance": {
        "en": "Three cevians from a triangle's vertices meet at one point exactly when the product of their three side-division ratios equals 1, while three points on the sides lie on one straight line when the directed ratio product equals −1.",
        "ta": "முக்கோணத்தின் மூன்று சீவியன்கள் ஒரே புள்ளியில் சந்திக்க அவற்றின் பக்கப் பிரிவு விகிதங்களின் பெருக்கற்பலன் 1 ஆக இருக்க வேண்டும்; மூன்று புள்ளிகள் ஒரே கோட்டில் அமைய திசை விகிதப் பெருக்கல் −1 ஆக இருக்க வேண்டும்."
      },
      "rule": {
        "en": "Ceva (concurrent): (BD/DC)(CE/EA)(AF/FB) = 1 · Menelaus (collinear): (BP/PC)(CQ/QA)(AR/RB) = −1",
        "ta": "சீவா (ஒருங்கிசையும்): (BD/DC)(CE/EA)(AF/FB) = 1 · மெனிலாஸ் (நேர்க்கோட்டமைவு): (BP/PC)(CQ/QA)(AR/RB) = −1"
      },
      "math": {
        "latex": "\\begin{aligned}\\text{Ceva: }&\\dfrac{BD}{DC}\\cdot\\dfrac{CE}{EA}\\cdot\\dfrac{AF}{FB}=1\\\\\\text{Menelaus: }&\\dfrac{BP}{PC}\\cdot\\dfrac{CQ}{QA}\\cdot\\dfrac{AR}{RB}=-1\\end{aligned}",
        "fallback": "Ceva: (BD/DC)(CE/EA)(AF/FB) = 1 | Menelaus: (BP/PC)(CQ/QA)(AR/RB) = −1"
      },
      "glanceVisual": "concurrency",
      "visual": { "kind": "ch4-lab", "id": "concurrency" },
      "understand": {
        "intro": {
          "en": "Ceva's and Menelaus's theorems turn geometry questions about 'do three lines meet at one point?' or 'do three points lie on one line?' into simple fraction multiplication!",
          "ta": "மூன்று கோடுகள் ஒரே புள்ளியில் சந்திக்குமா அல்லது மூன்று புள்ளிகள் ஒரே கோட்டில் அமையுமா என்ற கேள்விகளை எளிய பின்னப் பெருக்கலாக மாற்றும் தேற்றங்கள் இவை."
        },
        "symbols": [
          {
            "symbol": { "latex": "\\text{Cevian }AD", "fallback": "Cevian AD" },
            "en": "Any line segment joining a vertex (like A) to a point D on the opposite side (or its extension). Medians, altitudes, and angle bisectors are special cevians.",
            "ta": "முக்கோணத்தின் ஒரு உச்சியை எதிர்ப் பக்கத்துடன் இணைக்கும் கோட்டுத்துண்டு சீவியன் ஆகும் (நடுக்கோடு, குத்துக்கோடு, கோண இருசமவெட்டி)."
          },
          {
            "symbol": { "latex": "\\dfrac{BD}{DC}\\cdot\\dfrac{CE}{EA}\\cdot\\dfrac{AF}{FB}=1", "fallback": "(BD/DC)·(CE/EA)·(AF/FB) = 1" },
            "en": "Walk consistently around the triangle: B→D→C, C→E→A, A→F→B. If the product equals 1, the three cevians AD, BE, CF are concurrent.",
            "ta": "முக்கோணத்தைச் சுற்றி ஒரே வரிசையில் (B→D→C, C→E→A, A→F→B) விகிதங்களைப் பெருக்க 1 வந்தால், மூன்று சீவியன்களும் ஒருங்கிசையும்."
          },
          {
            "symbol": { "latex": "\\dfrac{BP}{PC}\\cdot\\dfrac{CQ}{QA}\\cdot\\dfrac{AR}{RB}=-1", "fallback": "(BP/PC)·(CQ/QA)·(AR/RB) = −1" },
            "en": "For a straight transversal line, one point (or all three) must lie on an extended side, reversing one directed ratio's sign to give −1 (using lengths only gives +1).",
            "ta": "நேர்க்கோட்டில் அமையும் மூன்று புள்ளிகளில் குறைந்தது ஒன்று நீட்டப்பட்ட பக்கத்தில் அமையும்; திசை நீளங்களின் பெருக்கல் −1 (அளவு மட்டும் எனில் +1)."
          }
        ],
        "watchOut": {
          "en": "Always walk around the triangle in ONE cyclic order (B→C→A→B) when writing the numerators and denominators—reversing just one fraction turns 1 into a wrong ratio!",
          "ta": "எப்போதும் ஒரே சுழற்சி வரிசையில் (B→C→A→B) எழுதுங்கள்; ஏதேனும் ஒரு பின்னத்தை மட்டும் தலைகீழாக்கினால் விடை தவறாகிவிடும்."
        }
      },
      "proof": {
        "figure": "concurrency",
        "steps": [
          {
            "title": { "en": "1. Why medians always satisfy Ceva's theorem", "ta": "1. நடுக்கோடுகள் ஏன் எப்போதும் ஒருங்கிசைகின்றன?" },
            "math": { "latex": "\\begin{aligned}&BD=DC,\\;CE=EA,\\;AF=FB\\\\&\\implies 1\\times 1\\times 1=1\\end{aligned}", "fallback": "BD = DC, CE = EA, AF = FB gives 1 × 1 × 1 = 1" },
            "reason": {
              "en": "Every midpoint splits its side in ratio 1 : 1, so the product is immediately 1—proving the centroid exists in every triangle!",
              "ta": "ஒவ்வொரு நடுப்புள்ளியும் பக்கத்தை 1 : 1 விகிதத்தில் பிரிப்பதால் பெருக்கல் 1 ஆகும்; எனவே நடுக்கோட்டு மையம் எப்போதும் உண்டு."
            }
          },
          {
            "title": { "en": "2. Area-ratio mechanism behind Ceva's theorem", "ta": "2. சீவாஸ் தேற்றத்தின் பரப்பளவு அடிப்படை" },
            "math": { "latex": "\\begin{aligned}\\dfrac{BD}{DC}&=\\dfrac{\\text{area}(\\triangle ABD)}{\\text{area}(\\triangle ACD)}\\\\&=\\dfrac{\\text{area}(\\triangle APB)}{\\text{area}(\\triangle APC)}\\end{aligned}", "fallback": "BD/DC = area(△APB)/area(△APC)" },
            "reason": {
              "en": "Multiplying the three cyclic area ratios around concurrency point P cancels every triangle area in numerator and denominator, leaving exactly 1.",
              "ta": "ஒருங்கிசைவுப் புள்ளி P-ஐச் சுற்றிய மூன்று பரப்பு விகிதங்களையும் பெருக்கும்போது தொகுதியும் பகுதியும் நீங்கி 1 மட்டுமே மிஞ்சும்."
            }
          }
        ]
      },
      "question": {
        "en": "In △ABC, points D, E, F lie on BC, CA, AB with BD/DC = 2/3 and CE/EA = 3/4. What ratio AF/FB makes the cevians AD, BE, CF concurrent?",
        "ta": "△ABC-இல் D, E, F என்பன BC, CA, AB மீதுள்ளன. BD/DC = 2/3 மற்றும் CE/EA = 3/4 எனில், AD, BE, CF ஒருங்கிசைய AF/FB விகிதம் என்னவாக இருக்க வேண்டும்?"
      },
      "questionMath": {
        "latex": "\\begin{aligned}&\\dfrac{BD}{DC}=\\dfrac{2}{3},\\quad\\dfrac{CE}{EA}=\\dfrac{3}{4}\\\\&\\text{concurrent}\\implies\\dfrac{AF}{FB}=\\;?\\end{aligned}",
        "fallback": "BD/DC = 2/3, CE/EA = 3/4, concurrent ⇒ AF/FB = ?"
      },
      "choices": [
        { "en": "1/2", "ta": "1/2", "math": { "latex": "\\dfrac{1}{2}", "fallback": "1/2" } },
        { "en": "5/7", "ta": "5/7", "math": { "latex": "\\dfrac{5}{7}", "fallback": "5/7" } },
        { "en": "2", "ta": "2", "math": { "latex": "2", "fallback": "2" } }
      ],
      "correct": 2,
      "hint": {
        "en": "Multiply (2/3) × (3/4) first, then find what fraction multiplies that product to equal 1.",
        "ta": "முதலில் (2/3) × (3/4)-ஐப் பெருக்கி, அந்த விடையுடன் எதைப் பெருக்கினால் 1 வரும் எனக் காண்க."
      },
      "incorrectFeedback": [
        {
          "en": "1/2 is the product (2/3) × (3/4) itself! You need the reciprocal of 1/2 so the total product becomes (1/2) × 2 = 1.",
          "ta": "1/2 என்பது (2/3) × (3/4)-இன் பெருக்கல் மட்டுமே! மொத்தப் பெருக்கல் 1 ஆக அதன் தலைகீழி 2 தேவை."
        },
        {
          "en": "Ceva's theorem multiplies the three ratios together; do not add numerators and denominators.",
          "ta": "சீவாஸ் தேற்றம் விகிதங்களைப் பெருக்க வேண்டும்; தொகுதி பகுதிகளைக் கூட்டக் கூடாது."
        },
        null
      ],
      "why": {
        "en": "By Ceva's theorem, (BD/DC) × (CE/EA) × (AF/FB) = 1. Since (2/3) × (3/4) = 1/2, we need (1/2) × (AF/FB) = 1, so AF/FB = 2 (meaning AF : FB = 2 : 1).",
        "ta": "சீவாஸ் தேற்றப்படி (2/3) × (3/4) × (AF/FB) = 1 ⇒ (1/2) × (AF/FB) = 1 ⇒ AF/FB = 2."
      },
      "whyMath": {
        "latex": "\\begin{aligned}\\dfrac{2}{3}\\cdot\\dfrac{3}{4}\\cdot\\dfrac{AF}{FB}&=1\\\\\\dfrac{1}{2}\\cdot\\dfrac{AF}{FB}=1&\\implies\\dfrac{AF}{FB}=2\\end{aligned}",
        "fallback": "(2/3)·(3/4)·(AF/FB) = 1 gives AF/FB = 2"
      },
      "explainAfterAttempt": true,
      "connect": {
        "en": "Completes the Grade 10 Geometry theorem sequence—preparing concurrency and collinearity problems in Exercise 4.4 and Unit Exercise 4.",
        "ta": "பயிற்சி 4.4 மற்றும் அலகுப் பயிற்சி 4-இல் உள்ள ஒருங்கிசைவு மற்றும் நேர்க்கோட்டமைவுக் கணக்குகளைத் தீர்க்க இது உதவுகிறது."
      },
      "practiceId": "c10-4-ex4-4-q9",
      "secondaryPracticeId": "c10-4-unit-q3",
      "relatedExercise": "4.4 & Unit Exercise 4"
    }
  ]
};
})();
