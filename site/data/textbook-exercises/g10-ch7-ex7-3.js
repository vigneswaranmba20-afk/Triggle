/* Grade 10 Mensuration Exercise 7.3 (Q1–Q7): Bilingual (EN/TA) 2025 source-page verified records. */
(()=>{'use strict';
const SHARED={
  classNum:10,
  chapter:"7",
  exercise:"7.3",
  topic:{
    en:"Mensuration — Combined Solids",
    ta:"அளவியல் — இணைந்த திண்மங்கள்"
  },
  kind:"textbook",
  edition:"2025",
  source:"https://drive.google.com/file/d/13XJXdPhuGqU3BG3BPrsmzZwUUFOuH6Of/view",
  translationReview:"2025-tamil-pdf-checked-teacher-review-pending",
  sourceFidelity:{
    status:"page-visual-checked",
    sourcePdfPage:{en:300,ta:308},
    sourcePrintedPage:{en:294,ta:302}
  },
  reference:"TN SCERT Standard Ten Mathematics, revised 2025; English Exercise 7.3, printed p.294 / PDF p.300 (answers printed p.341 / PDF p.347); Tamil Exercise 7.3, printed p.302 / PDF p.308 (answers printed p.356 / PDF p.362)."
};

const entries=[
  {
    ...SHARED,
    id:"c10-7-ex7-3-q1",
    label:{
      en:"Exercise 7.3 · Q1",
      ta:"பயிற்சி 7.3 · வினா 1"
    },
    title:{
      en:"Capacity of a hemispherical bowl topped by a cylinder",
      ta:"அரைக்கோளத்தின் மேல் உள்ள உருளை வடிவக் கிண்ணத்தின் கொள்ளளவு"
    },
    q:{
      en:"1. A vessel is in the form of a hemispherical bowl mounted by a hollow cylinder. The diameter is 14 cm and the height of the vessel is 13 cm. Find the capacity of the vessel.",
      ta:"1. ஓர் அரைக்கோளத்தின் மேல் ஓர் உள்ளீடற்ற உருளையைப் பொருத்திய வடிவத்தில் அமைந்த ஒரு கிண்ணத்தின் விட்டம் 14 செ.மீ மற்றும் உயரம் 13 செ.மீ எனில், அதன் கொள்ளளவைக் காண்க."
    },
    steps:[
      {
        en:"Let r be the common radius of both the hemispherical bowl and the hollow cylinder, and let H be the total height of the vessel. Half of the given diameter d = 14 cm gives the radius r.",
        ta:"அரைக்கோளக் கிண்ணம் மற்றும் உள்ளீடற்ற உருளை ஆகிய இரண்டின் பொது ஆரம் r எனவும், கிண்ணத்தின் மொத்த உயரம் H = 13 செ.மீ எனவும் கொள்வோம். கொடுக்கப்பட்ட விட்டம் d = 14 செ.மீ என்பதால், ஆரம் r அதன் பாதியாகும்.",
        eq:"r = d/2 = 14/2 = 7 cm",
        math:{
          latex:"\\begin{aligned}r&=\\dfrac{d}{2}\\\\&=\\dfrac{14}{2}=7\\,\\mathrm{cm}\\end{aligned}",
          fallback:"r = d/2 = 14/2 = 7 cm",
          display:true
        }
      },
      {
        en:"A hemisphere has height equal to its radius r = 7 cm. Subtract the hemisphere's height from the total vessel height H = 13 cm to get the cylinder's height h.",
        ta:"அரைக்கோளப் பகுதியின் உயரம் அதன் ஆரம் r = 7 செ.மீ-க்குச் சமம். எனவே கிண்ணத்தின் மொத்த உயரம் 13 செ.மீ-லிருந்து 7 செ.மீ-ஐக் கழித்தால் உருளைப் பகுதியின் உயரம் h கிடைக்கும்.",
        eq:"h = 13 − 7 = 6 cm",
        math:{
          latex:"\\begin{aligned}h&=H-r\\\\&=13-7=6\\,\\mathrm{cm}\\end{aligned}",
          fallback:"h = 13 − 7 = 6 cm",
          display:true
        }
      },
      {
        en:"The capacity of the vessel is the sum of the volume of the cylindrical part and the volume of the hemispherical bowl.",
        ta:"கிண்ணத்தின் மொத்தக் கொள்ளளவு என்பது உருளைப் பகுதியின் கனஅளவும் அரைக்கோளப் பகுதியின் கனஅளவும் கூடிய கூட்டுத்தொகையாகும்.",
        eq:"V = πr²h + (2/3)πr³ = πr²(h + 2r/3)",
        math:{
          latex:"\\begin{aligned}V&=\\pi r^2 h+\\dfrac{2}{3}\\pi r^3\\\\&=\\pi r^2\\left(h+\\dfrac{2}{3}r\\right)\\end{aligned}",
          fallback:"V = πr²h + (2/3)πr³ = πr²(h + 2r/3)",
          display:true
        }
      },
      {
        en:"Substitute π = 22/7, r = 7 cm, and h = 6 cm, then simplify carefully.",
        ta:"π = 22/7, r = 7 செ.மீ மற்றும் h = 6 செ.மீ எனப் பிரதியிட்டுச் சுருக்கவும்.",
        eq:"V = (22/7)×7²×(6 + 14/3) = 154×(32/3) = 4928/3 ≈ 1642.67 cm³",
        math:{
          latex:"\\begin{aligned}V&=\\dfrac{22}{7}\\times7^2\\times\\left(6+\\dfrac{2\\times7}{3}\\right)\\\\&=154\\times\\dfrac{32}{3}\\\\&=\\dfrac{4928}{3}\\approx1642.67\\,\\mathrm{cm}^3\\end{aligned}",
          fallback:"V = (22/7)×7²×(6 + 14/3) = 4928/3 ≈ 1642.67 cm³",
          display:true
        }
      }
    ],
    answer:"Capacity of the vessel ≈ 1642.67 cm³ (exact 4928/3 cm³).",
    answerTa:"கிண்ணத்தின் கொள்ளளவு ≈ 1642.67 கன செ.மீ (துல்லியமாக 4928/3 கன செ.மீ).",
    answerMath:{
      en:{
        latex:"\\boxed{1642.67\\,\\mathrm{cm}^3}",
        fallback:"1642.67 cm³",
        display:true
      },
      ta:{
        latex:"\\boxed{1642.67\\text{ செ.மீ}^3}",
        fallback:"1642.67 கன செ.மீ",
        display:true
      }
    }
  },
  {
    ...SHARED,
    id:"c10-7-ex7-3-q2",
    label:{
      en:"Exercise 7.3 · Q2",
      ta:"பயிற்சி 7.3 · வினா 2"
    },
    title:{
      en:"Volume of a cylinder with two cones attached at its ends",
      ta:"இருபுறமும் கூம்புகள் இணைந்த உருளை வடிவ மாதிரியின் கனஅளவு"
    },
    q:{
      en:"2. Nathan, an engineering student was asked to make a model shaped like a cylinder with two cones attached at its two ends. The diameter of the model is 3 cm and its length is 12 cm. If each cone has a height of 2 cm, find the volume of the model that Nathan made.",
      ta:"2. நாதன் என்ற பொறியியல் மாணவர் ஓர் உருளையின் இருபுறமும் கூம்புகள் உள்ளவாறு மாதிரி ஒன்றை உருவாக்கினார். மாதிரியின் நீளம் 12 செ.மீ மற்றும் விட்டம் 3 செ.மீ ஆகும். ஒவ்வொரு கூம்பின் உயரமும் 2 செ.மீ இருக்குமானால் நாதன் உருவாக்கிய மாதிரியின் கனஅளவைக் காண்க"
    },
    steps:[
      {
        en:"Let r be the common radius of the cylinder and each cone. From diameter d = 3 cm, find r. Let h_cone = 2 cm be the height of each cone.",
        ta:"உருளை மற்றும் இரு கூம்புகளின் பொது ஆரம் r எனவும், ஒவ்வொரு கூம்பின் உயரம் h_கூம்பு = 2 செ.மீ எனவும் கொள்வோம். விட்டம் d = 3 செ.மீ என்பதால் ஆரம் r = 3/2 செ.மீ ஆகும்.",
        eq:"r = 3/2 = 1.5 cm, h_cone = 2 cm",
        math:{
          latex:"\\begin{aligned}r&=\\dfrac{3}{2}=1.5\\,\\mathrm{cm}\\\\h_{\\text{cone}}&=2\\,\\mathrm{cm}\\end{aligned}",
          fallback:"r = 3/2 = 1.5 cm, h_cone = 2 cm",
          display:true
        }
      },
      {
        en:"Subtract the heights of both cones (2 cm each) from the total length 12 cm to find the cylinder's height h_cyl.",
        ta:"மாதிரியின் மொத்த நீளம் 12 செ.மீ-லிருந்து இருபுறமும் உள்ள இரு கூம்புகளின் உயரங்களைக் (2 × 2 = 4 செ.மீ) கழித்தால் உருளையின் உயரம் h_உருளை கிடைக்கும்.",
        eq:"h_cyl = 12 − 2(2) = 8 cm",
        math:{
          latex:"\\begin{aligned}h_{\\text{cyl}}&=12-2(2)\\\\&=8\\,\\mathrm{cm}\\end{aligned}",
          fallback:"h_cyl = 12 − 2(2) = 8 cm",
          display:true
        }
      },
      {
        en:"Add the volume of the central cylinder and the volumes of the two identical cones.",
        ta:"மாதிரியின் மொத்தக் கனஅளவு என்பது நடுவில் உள்ள உருளையின் கனஅளவையும் இரு கூம்புகளின் கனஅளவுகளையும் கூட்டுவதால் கிடைக்கும்.",
        eq:"V = πr²h_cyl + 2×(1/3)πr²h_cone = πr²(h_cyl + 2h_cone/3)",
        math:{
          latex:"\\begin{aligned}V&=\\pi r^2 h_{\\text{cyl}}+2\\cdot\\dfrac{1}{3}\\pi r^2 h_{\\text{cone}}\\\\&=\\pi r^2\\left(h_{\\text{cyl}}+\\dfrac{2}{3}h_{\\text{cone}}\\right)\\end{aligned}",
          fallback:"V = πr²h_cyl + 2×(1/3)πr²h_cone",
          display:true
        }
      },
      {
        en:"Substitute π = 22/7, r = 3/2 cm, h_cyl = 8 cm, and h_cone = 2 cm.",
        ta:"π = 22/7, r = 3/2 செ.மீ, h_உருளை = 8 செ.மீ மற்றும் h_கூம்பு = 2 செ.மீ எனப் பிரதியிட்டுக் கணக்கிடவும்.",
        eq:"V = (22/7)×(9/4)×(8 + 4/3) = (22/7)×(9/4)×(28/3) = 66 cm³",
        math:{
          latex:"\\begin{aligned}V&=\\dfrac{22}{7}\\times\\left(\\dfrac{3}{2}\\right)^2\\times\\left(8+\\dfrac{4}{3}\\right)\\\\&=\\dfrac{22}{7}\\times\\dfrac{9}{4}\\times\\dfrac{28}{3}\\\\&=66\\,\\mathrm{cm}^3\\end{aligned}",
          fallback:"V = (22/7)×(9/4)×(28/3) = 66 cm³",
          display:true
        }
      }
    ],
    answer:"Volume of the model = 66 cm³.",
    answerTa:"மாதிரியின் கனஅளவு = 66 கன செ.மீ.",
    answerMath:{
      en:{
        latex:"\\boxed{66\\,\\mathrm{cm}^3}",
        fallback:"66 cm³",
        display:true
      },
      ta:{
        latex:"\\boxed{66\\text{ செ.மீ}^3}",
        fallback:"66 கன செ.மீ",
        display:true
      }
    }
  },
  {
    ...SHARED,
    id:"c10-7-ex7-3-q3",
    label:{
      en:"Exercise 7.3 · Q3",
      ta:"பயிற்சி 7.3 · வினா 3"
    },
    title:{
      en:"Remaining volume after carving a cone out of a cylinder",
      ta:"உருளையிலிருந்து கூம்பை வெட்டி எடுத்த பின் மீதமுள்ள திண்மத்தின் கனஅளவு"
    },
    q:{
      en:"3. From a solid cylinder whose height is 2.4 cm and the diameter 1.4 cm, a cone of the same height and same diameter is carved out. Find the volume of the remaining solid to the nearest cm³.",
      ta:"3. உயரம் 2.4 செ.மீ மற்றும் விட்டம் 1.4 செ.மீ கொண்ட ஒரு திண்ம உருளையில் இருந்து அதே விட்டமும் உயரமும் உள்ள ஒரு கூம்பு வெட்டி எடுக்கப்பட்டால் மீதமுள்ள திண்மத்தின் கனஅளவு எவ்வளவு கன செ.மீ ஆகும்?"
    },
    steps:[
      {
        en:"Let r be the common radius and h = 2.4 cm be the common height of both the solid cylinder and the carved-out cone. Halve the diameter d = 1.4 cm to find r.",
        ta:"திண்ம உருளை மற்றும் வெட்டி எடுக்கப்படும் கூம்பு ஆகிய இரண்டின் பொது உயரம் h = 2.4 செ.மீ மற்றும் பொது ஆரம் r எனக் கொள்வோம். விட்டம் d = 1.4 செ.மீ என்பதால் ஆரம் r அதன் பாதியாகும்.",
        eq:"r = 1.4/2 = 0.7 cm, h = 2.4 cm",
        math:{
          latex:"\\begin{aligned}r&=\\dfrac{1.4}{2}=0.7\\,\\mathrm{cm}\\\\h&=2.4\\,\\mathrm{cm}\\end{aligned}",
          fallback:"r = 0.7 cm, h = 2.4 cm",
          display:true
        }
      },
      {
        en:"Because the cone is removed from inside the cylinder, subtract the cone's volume from the cylinder's volume.",
        ta:"உருளையிலிருந்து கூம்பு வெட்டி எடுக்கப்படுவதால், உருளையின் கனஅளவிலிருந்து கூம்பின் கனஅளவைக் கழிக்க வேண்டும்.",
        eq:"V_rem = πr²h − (1/3)πr²h = (2/3)πr²h",
        math:{
          latex:"\\begin{aligned}V_{\\text{rem}}&=\\pi r^2 h-\\dfrac{1}{3}\\pi r^2 h\\\\&=\\dfrac{2}{3}\\pi r^2 h\\end{aligned}",
          fallback:"V_rem = πr²h − (1/3)πr²h = (2/3)πr²h",
          display:true
        }
      },
      {
        en:"Substitute π = 22/7, r = 0.7 cm, and h = 2.4 cm to find the exact remaining volume.",
        ta:"π = 22/7, r = 0.7 செ.மீ மற்றும் h = 2.4 செ.மீ எனப் பிரதியிட்டு மீதமுள்ள கனஅளவைக் காண்க.",
        eq:"V_rem = (2/3)×(22/7)×0.7×0.7×2.4 = 2.464 cm³",
        math:{
          latex:"\\begin{aligned}V_{\\text{rem}}&=\\dfrac{2}{3}\\times\\dfrac{22}{7}\\times0.7\\times0.7\\times2.4\\\\&=2\\times22\\times0.1\\times0.7\\times0.8\\\\&=2.464\\,\\mathrm{cm}^3\\end{aligned}",
          fallback:"V_rem = (2/3)×(22/7)×0.7×0.7×2.4 = 2.464 cm³",
          display:true
        }
      },
      {
        en:"Rounding 2.464 cm³ to two decimal places gives 2.46 cm³ (which matches both the English and Tamil 2025 textbook answer keys). Note: rounding literally to the nearest whole cm³ as phrased in the English question gives 2 cm³.",
        ta:"2.464 கன செ.மீ-ஐ இரண்டு தசம இடங்களுக்கு முழுமையாக்கினால் 2.46 கன செ.மீ கிடைக்கும் (இது 2025 தமிழ் மற்றும் ஆங்கிலப் பாடநூல் விடைக்குறிப்புடன் பொருந்துகிறது). முழு எண் கன செ.மீ-க்கு முழுமையாக்கினால் 2 கன செ.மீ ஆகும்.",
        eq:"2.464 cm³ ≈ 2.46 cm³ (nearest whole cm³: 2 cm³)",
        math:{
          latex:"2.464\\,\\mathrm{cm}^3\\approx2.46\\,\\mathrm{cm}^3",
          fallback:"2.464 cm³ ≈ 2.46 cm³",
          display:true
        }
      }
    ],
    answer:"2.46 cm³ (2025 textbook key; 2 cm³ if rounded to the nearest whole cm³).",
    answerTa:"2.46 கன செ.மீ (முழு எண் கன செ.மீ-க்கு முழுமையாக்கினால் 2 கன செ.மீ).",
    answerMath:{
      en:{
        latex:"\\boxed{2.46\\,\\mathrm{cm}^3}",
        fallback:"2.46 cm³",
        display:true
      },
      ta:{
        latex:"\\boxed{2.46\\text{ செ.மீ}^3}",
        fallback:"2.46 கன செ.மீ",
        display:true
      }
    }
  },
  {
    ...SHARED,
    id:"c10-7-ex7-3-q4",
    label:{
      en:"Exercise 7.3 · Q4",
      ta:"பயிற்சி 7.3 · வினா 4"
    },
    title:{
      en:"Water displaced by a cone-on-hemisphere solid in a cylinder",
      ta:"நீர் நிரம்பிய உருளையில் கூம்பு-அரைக்கோள திண்மத்தால் வெளியேறும் நீரின் கனஅளவு"
    },
    q:{
      en:"4. A solid consisting of a right circular cone of height 12 cm and radius 6 cm standing on a hemisphere of radius 6 cm is placed upright in a right circular cylinder full of water such that it touches the bottom. Find the volume of the water displaced out of the cylinder, if the radius of the cylinder is 6 cm and height is 18 cm.",
      ta:"4. ஒரு திண்மத்தின் அடிப்புறம் 6 செ.மீ ஆரம் உடைய அரைக்கோள வடிவிலும் மேற்புறம் 12 செ.மீ உயரமும் 6 செ.மீ ஆரமும் கொண்ட கூம்பு வடிவிலும் உள்ளது. முழுவதும் நீரால் நிரப்பப்பட்ட ஓர் உருளையின் அடிப்புறத்தைத் தொடுமாறு அத்திண்மம் வைக்கப்படும்போது வெளியேறும் நீரின் கனஅளவைக் காண்க. உருளையின் ஆரம் 6 செ.மீ மற்றும் உயரம் 18 செ.மீ எனக் கொள்க."
    },
    steps:[
      {
        en:"Check that the solid fits completely inside the cylinder: total height of the solid = cone height (12 cm) + hemisphere radius (6 cm) = 18 cm, which equals the cylinder's height (18 cm), and both share radius r = 6 cm.",
        ta:"திண்மம் உருளையினுள் முழுமையாகப் பொருந்துகிறதா எனச் சரிபார்ப்போம்: திண்மத்தின் மொத்த உயரம் = கூம்பின் உயரம் (12 செ.மீ) + அரைக்கோள ஆரம் (6 செ.மீ) = 18 செ.மீ. இது உருளையின் உயரத்திற்கு (18 செ.மீ) சமமாகவும், பொது ஆரம் r = 6 செ.மீ ஆகவும் உள்ளது.",
        eq:"r = 6 cm, h_cone = 12 cm, H_solid = 12 + 6 = 18 cm",
        math:{
          latex:"\\begin{aligned}r&=6\\,\\mathrm{cm},\\quad h_{\\text{cone}}=12\\,\\mathrm{cm}\\\\H_{\\text{solid}}&=12+6=18\\,\\mathrm{cm}\\end{aligned}",
          fallback:"r = 6 cm, h_cone = 12 cm, H_solid = 18 cm",
          display:true
        }
      },
      {
        en:"Since the cylinder is initially full of water and the solid is completely submerged, the volume of water displaced equals the volume of the immersed solid (cone + hemisphere).",
        ta:"உருளை முழுவதும் நீரால் நிரப்பப்பட்டு திண்மம் முழுமையாக மூழ்குவதால், வெளியேறும் நீரின் கனஅளவு அத்திண்மத்தின் கனஅளவிற்குச் (கூம்பு + அரைக்கோளம்) சமமாகும்.",
        eq:"V_displaced = V_cone + V_hemisphere = (1/3)πr²h_cone + (2/3)πr³",
        math:{
          latex:"\\begin{aligned}V_{\\text{displaced}}&=V_{\\text{cone}}+V_{\\text{hemi}}\\\\&=\\dfrac{1}{3}\\pi r^2 h_{\\text{cone}}+\\dfrac{2}{3}\\pi r^3\\end{aligned}",
          fallback:"V_displaced = (1/3)πr²h_cone + (2/3)πr³",
          display:true
        }
      },
      {
        en:"Substitute r = 6 cm and h_cone = 12 cm to express the displaced volume in terms of π first.",
        ta:"r = 6 செ.மீ மற்றும் h_கூம்பு = 12 செ.மீ எனப் பிரதியிட்டு முதலில் π வடிவில் கனஅளவைக் காண்க.",
        eq:"V_displaced = (1/3)π(36)(12) + (2/3)π(216) = 144π + 144π = 288π cm³",
        math:{
          latex:"\\begin{aligned}V_{\\text{displaced}}&=\\dfrac{1}{3}\\pi(6)^2(12)\\\\&\\quad+\\dfrac{2}{3}\\pi(6)^3\\\\&=144\\pi+144\\pi\\\\&=288\\pi\\,\\mathrm{cm}^3\\end{aligned}",
          fallback:"V_displaced = 144π + 144π = 288π cm³",
          display:true
        }
      },
      {
        en:"Substitute π = 22/7 to obtain the numerical volume of displaced water.",
        ta:"π = 22/7 எனப் பிரதியிட்டு வெளியேறிய நீரின் கனஅளவை எண் மதிப்பில் காண்க.",
        eq:"V_displaced = 288×(22/7) = 6336/7 ≈ 905.14 cm³",
        math:{
          latex:"\\begin{aligned}V_{\\text{displaced}}&=288\\times\\dfrac{22}{7}\\\\&=\\dfrac{6336}{7}\\approx905.14\\,\\mathrm{cm}^3\\end{aligned}",
          fallback:"V_displaced = 6336/7 ≈ 905.14 cm³",
          display:true
        }
      }
    ],
    answer:"Volume of water displaced ≈ 905.14 cm³ (exact 288π cm³).",
    answerTa:"வெளியேறும் நீரின் கனஅளவு ≈ 905.14 கன செ.மீ (துல்லியமாக 288π கன செ.மீ).",
    answerMath:{
      en:{
        latex:"\\boxed{905.14\\,\\mathrm{cm}^3}",
        fallback:"905.14 cm³",
        display:true
      },
      ta:{
        latex:"\\boxed{905.14\\text{ செ.மீ}^3}",
        fallback:"905.14 கன செ.மீ",
        display:true
      }
    },
    figureSrc:"assets/grade10-ch7/ex7-3-q4.svg",
    figureAlt:{
      en:"Schematic diagram of a right circular cylinder of radius 6 cm and height 18 cm filled with water, containing an upright solid made of a hemisphere of radius 6 cm topped by a cone of height 12 cm and radius 6 cm.",
      ta:"ஆரம் 6 செ.மீ மற்றும் உயரம் 18 செ.மீ கொண்ட நீர் நிரம்பிய உருளையினுள், 6 செ.மீ ஆரமுள்ள அரைக்கோளத்தின் மேல் 12 செ.மீ உயரமும் 6 செ.மீ ஆரமும் கொண்ட கூம்பு அமர்ந்த திண்மம் வைக்கப்பட்டுள்ள படம்."
    },
    figureCaption:{
      en:"The solid (12 cm + 6 cm = 18 cm) fits exactly inside the cylinder, so displaced water equals V_cone + V_hemisphere.",
      ta:"திண்மத்தின் உயரம் (12 + 6 = 18 செ.மீ) உருளையின் உயரத்திற்குச் சமம்; எனவே வெளியேறும் நீர் = கூம்பு + அரைக்கோள கனஅளவு."
    }
  },
  {
    ...SHARED,
    id:"c10-7-ex7-3-q5",
    label:{
      en:"Exercise 7.3 · Q5",
      ta:"பயிற்சி 7.3 · வினா 5"
    },
    title:{
      en:"Medicine capacity of a capsule",
      ta:"மருந்து குப்பியின் (கேப்சூல்) கொள்ளளவு"
    },
    q:{
      en:"5. A capsule is in the shape of a cylinder with two hemisphere stuck to each of its ends. If the length of the entire capsule is 12 mm and the diameter of the capsule is 3 mm, how much medicine it can hold?",
      ta:"5. ஒரு மருந்து குப்பி, ஓர் உருளையின் இருபுறமும் அரைக் கோளம் இணைந்த வடிவில் உள்ளது. குப்பியின் மொத்த நீளம் 12 மி.மீ மற்றும் விட்டம் 3 மி.மீ எனில், அதில் அடைக்கப்படும் மருந்தின் கனஅளவைக் காண்க?"
    },
    steps:[
      {
        en:"All measurements are in millimetres (mm). Let r be the common radius of the cylinder and each hemispherical end. From diameter d = 3 mm, find r.",
        ta:"அனைத்து அளவுகளும் மில்லிமீட்டரில் (மி.மீ) உள்ளன. உருளை மற்றும் இரு அரைக்கோள முனைகளின் பொது ஆரம் r எனக் கொள்வோம். விட்டம் d = 3 மி.மீ என்பதால் ஆரம் r = 1.5 மி.மீ ஆகும்.",
        eq:"r = 3/2 = 1.5 mm",
        math:{
          latex:"r=\\dfrac{3}{2}=1.5\\,\\mathrm{mm}",
          fallback:"r = 3/2 = 1.5 mm",
          display:true
        }
      },
      {
        en:"Each hemispherical end has length equal to its radius r = 1.5 mm. Subtract both ends (2 × 1.5 = 3 mm) from the total capsule length 12 mm to get the cylinder's length h.",
        ta:"இருபுறமும் உள்ள ஒவ்வொரு அரைக்கோளத்தின் நீளமும் அதன் ஆரம் 1.5 மி.மீ-க்குச் சமம். மொத்த நீளம் 12 மி.மீ-லிருந்து இரு அரைக்கோளங்களின் நீளத்தைக் (2 × 1.5 = 3 மி.மீ) கழித்தால் உருளைப் பகுதியின் நீளம் h கிடைக்கும்.",
        eq:"h = 12 − 2(1.5) = 9 mm",
        math:{
          latex:"\\begin{aligned}h&=12-2(1.5)\\\\&=12-3=9\\,\\mathrm{mm}\\end{aligned}",
          fallback:"h = 12 − 2(1.5) = 9 mm",
          display:true
        }
      },
      {
        en:"The two hemispheres together form one full sphere of radius r. Add the cylinder volume and the sphere volume.",
        ta:"இரு அரைக்கோளங்களும் சேர்ந்து ஆரம் r கொண்ட ஒரு முழுக் கோளத்தை உருவாக்கும். எனவே உருளையின் கனஅளவையும் கோளத்தின் கனஅளவையும் கூட்ட வேண்டும்.",
        eq:"V = πr²h + (4/3)πr³",
        math:{
          latex:"V=\\pi r^2 h+\\dfrac{4}{3}\\pi r^3",
          fallback:"V = πr²h + (4/3)πr³",
          display:true
        }
      },
      {
        en:"Compute each part with π = 22/7 and r = 1.5 mm: cylinder ≈ 63.64 mm³ and sphere ≈ 14.14 mm³, giving 77.78 mm³ (note: exact value 1089/14 = 77.7857… mm³).",
        ta:"π = 22/7 மற்றும் r = 1.5 மி.மீ எனப் பிரதியிட, உருளைப் பகுதியின் கனஅளவு ≈ 63.64 மி.மீ³ மற்றும் கோளப் பகுதியின் கனஅளவு ≈ 14.14 மி.மீ³ ஆகும். இவற்றின் கூட்டுத்தொகை 77.78 மி.மீ³ (துல்லிய மதிப்பு 1089/14 ≈ 77.7857… மி.மீ³).",
        eq:"V = 63.64 + 14.14 = 77.78 mm³",
        math:{
          latex:"\\begin{aligned}V_{\\text{cyl}}&=\\dfrac{22}{7}\\times(1.5)^2\\times9\\approx63.64\\,\\mathrm{mm}^3\\\\V_{\\text{sph}}&=\\dfrac{4}{3}\\times\\dfrac{22}{7}\\times(1.5)^3\\approx14.14\\,\\mathrm{mm}^3\\\\V&=63.64+14.14=77.78\\,\\mathrm{mm}^3\\end{aligned}",
          fallback:"V = 63.64 + 14.14 = 77.78 mm³",
          display:true
        }
      }
    ],
    answer:"77.78 mm³ of medicine (exact 1089/14 mm³).",
    answerTa:"அடைக்கப்படும் மருந்தின் கனஅளவு = 77.78 கன மி.மீ (துல்லியமாக 1089/14 கன மி.மீ).",
    answerMath:{
      en:{
        latex:"\\boxed{77.78\\,\\mathrm{mm}^3}",
        fallback:"77.78 mm³",
        display:true
      },
      ta:{
        latex:"\\boxed{77.78\\text{ மி.மீ}^3}",
        fallback:"77.78 கன மி.மீ",
        display:true
      }
    }
  },
  {
    ...SHARED,
    id:"c10-7-ex7-3-q6",
    label:{
      en:"Exercise 7.3 · Q6",
      ta:"பயிற்சி 7.3 · வினா 6"
    },
    title:{
      en:"Surface area of a cube surmounted by a hemisphere",
      ta:"கனச்சதுரத்தின் மீது அரைக்கோளம் பொருந்திய திண்மத்தின் புறப்பரப்பு"
    },
    q:{
      en:"6. As shown in figure a cubical block of side 7 cm is surmounted by a hemisphere. Find the surface area of the solid.",
      ta:"6. 7 செ.மீ பக்க அளவுள்ள கனச்சதுரத்தின் மீது ஓர் அரைக்கோளம் படத்தில் உள்ளவாறு பொருந்தியுள்ளது. திண்மத்தின் புறப்பரப்பு காண்க."
    },
    steps:[
      {
        en:"Let a = 7 cm be the side of the cube. The hemisphere rests on the top square face with diameter equal to the cube's side (d = 7 cm), so its radius is r = 7/2 = 3.5 cm.",
        ta:"கனச்சதுரத்தின் பக்கம் a = 7 செ.மீ என்க. அதன் மேல் சதுர முகத்தில் பொருந்தியுள்ள அரைக்கோளத்தின் விட்டம் d = 7 செ.மீ என்பதால், அதன் ஆரம் r = 7/2 = 3.5 செ.மீ ஆகும்.",
        eq:"a = 7 cm, r = 7/2 = 3.5 cm",
        math:{
          latex:"\\begin{aligned}a&=7\\,\\mathrm{cm}\\\\r&=\\dfrac{7}{2}=3.5\\,\\mathrm{cm}\\end{aligned}",
          fallback:"a = 7 cm, r = 3.5 cm",
          display:true
        }
      },
      {
        en:"The circular base of the hemisphere (area πr²) covers part of the cube's top face and is no longer exposed, while the curved dome adds 2πr². So subtract πr² from the cube's total surface area 6a² and add 2πr².",
        ta:"அரைக்கோளத்தின் வட்ட அடிப்பரப்பு (πr²) கனச்சதுரத்தின் மேல் முகத்தின் ஒரு பகுதியை மறைத்துவிடுகிறது; ஆனால் அரைக்கோளத்தின் வளைபரப்பு (2πr²) புதிதாகத் தெரிகிறது. எனவே கனச்சதுரத்தின் மொத்தப் புறப்பரப்பு 6a²-லிருந்து πr²-ஐக் கழித்து 2πr²-ஐக் கூட்ட வேண்டும்.",
        eq:"TSA = 6a² − πr² + 2πr² = 6a² + πr²",
        math:{
          latex:"\\begin{aligned}\\text{TSA}&=6a^2-\\pi r^2+2\\pi r^2\\\\&=6a^2+\\pi r^2\\end{aligned}",
          fallback:"TSA = 6a² − πr² + 2πr² = 6a² + πr²",
          display:true
        }
      },
      {
        en:"Substitute a = 7 cm, r = 7/2 cm, and π = 22/7, then add the two terms.",
        ta:"a = 7 செ.மீ, r = 7/2 செ.மீ மற்றும் π = 22/7 எனப் பிரதியிட்டுக் கூட்டவும்.",
        eq:"TSA = 6(7²) + (22/7)×(7/2)² = 294 + 38.5 = 332.5 cm²",
        math:{
          latex:"\\begin{aligned}\\text{TSA}&=6(7)^2+\\dfrac{22}{7}\\times\\dfrac{7}{2}\\times\\dfrac{7}{2}\\\\&=294+\\dfrac{77}{2}\\\\&=294+38.5=332.5\\,\\mathrm{cm}^2\\end{aligned}",
          fallback:"TSA = 294 + 38.5 = 332.5 cm²",
          display:true
        }
      }
    ],
    answer:"Surface area of the solid = 332.5 cm².",
    answerTa:"திண்மத்தின் புறப்பரப்பு = 332.5 சதுர செ.மீ.",
    answerMath:{
      en:{
        latex:"\\boxed{332.5\\,\\mathrm{cm}^2}",
        fallback:"332.5 cm²",
        display:true
      },
      ta:{
        latex:"\\boxed{332.5\\text{ செ.மீ}^2}",
        fallback:"332.5 சதுர செ.மீ",
        display:true
      }
    },
    figureSrc:"assets/grade10-ch7/ex7-3-q6.svg",
    figureAlt:{
      en:"Cubical block of side 7 cm surmounted by a hemisphere of diameter 7 cm (radius 3.5 cm). The circular base covers part of the top square face while the dome adds 2πr².",
      ta:"7 செ.மீ பக்க அளவுள்ள கனச்சதுரத்தின் மேல் 7 செ.மீ விட்டமும் 3.5 செ.மீ ஆரமும் கொண்ட அரைக்கோளம் பொருந்தியுள்ள படம்."
    },
    figureCaption:{
      en:"Exposed surface = 6a² (cube) − πr² (covered circle) + 2πr² (hemisphere dome) = 6a² + πr².",
      ta:"தெரியும் புறப்பரப்பு = 6a² (கனச்சதுரம்) − πr² (மறைந்த வட்டம்) + 2πr² (அரைக்கோளம்) = 6a² + πr²."
    }
  },
  {
    ...SHARED,
    id:"c10-7-ex7-3-q7-i",
    label:{
      en:"Exercise 7.3 · Q7(i)",
      ta:"பயிற்சி 7.3 · வினா 7(i)"
    },
    title:{
      en:"Surface area of a sphere enclosed in a cylinder",
      ta:"உருளையினுள் பொருந்திய கோளத்தின் புறப்பரப்பு"
    },
    q:{
      en:"7. A right circular cylinder just enclose a sphere of radius r units. Calculate (i) the surface area of the sphere",
      ta:"7. ஆரம் r அலகுகள் கொண்ட ஒரு கோளம் ஒரு நேர் வட்ட உருளையினுள் மிகச் சரியாகப் பொருத்தப்பட்டுள்ளது எனில், கீழ்க்காண்பனவற்றைக் கணக்கிடுக. (i) கோளத்தின் புறப்பரப்பு"
    },
    steps:[
      {
        en:"Let the radius of the sphere be r units. A sphere has no flat faces, so its entire surface area is given by the standard sphere surface area formula.",
        ta:"கோளத்தின் ஆரம் r அலகுகள் என்க. கோளத்திற்குத் தட்டையான முகங்கள் இல்லாததால், அதன் முழுப் புறப்பரப்பு நிலையான கோளப் புறப்பரப்பு சூத்திரத்தால் தரப்படுகிறது.",
        eq:"Surface area of sphere = 4πr² sq. units",
        math:{
          latex:"A_{\\text{sphere}}=4\\pi r^2\\text{ sq. units}",
          fallback:"Surface area of sphere = 4πr² sq. units",
          display:true
        }
      }
    ],
    answer:"4πr² sq. units.",
    answerTa:"4πr² சதுர அலகுகள்.",
    answerMath:{
      en:{
        latex:"\\boxed{4\\pi r^2\\text{ sq. units}}",
        fallback:"4πr² sq. units",
        display:true
      },
      ta:{
        latex:"\\boxed{4\\pi r^2\\text{ ச.அலகுகள்}}",
        fallback:"4πr² சதுர அலகுகள்",
        display:true
      }
    }
  },
  {
    ...SHARED,
    id:"c10-7-ex7-3-q7-ii",
    label:{
      en:"Exercise 7.3 · Q7(ii)",
      ta:"பயிற்சி 7.3 · வினா 7(ii)"
    },
    title:{
      en:"Curved surface area of the enclosing cylinder",
      ta:"கோளத்தைச் சரியாக மூடும் உருளையின் வளைபரப்பு"
    },
    q:{
      en:"7. A right circular cylinder just enclose a sphere of radius r units. Calculate (ii) the curved surface area of the cylinder",
      ta:"7. ஆரம் r அலகுகள் கொண்ட ஒரு கோளம் ஒரு நேர் வட்ட உருளையினுள் மிகச் சரியாகப் பொருத்தப்பட்டுள்ளது எனில், கீழ்க்காண்பனவற்றைக் கணக்கிடுக. (ii) உருளையின் வளைபரப்பு"
    },
    steps:[
      {
        en:"Because the cylinder just encloses the sphere of radius r, the cylinder's base radius equals r and its height h equals the sphere's full diameter 2r.",
        ta:"ஆரம் r கொண்ட கோளம் உருளையினுள் மிகச் சரியாகப் பொருந்துவதால், உருளையின் அடி ஆரம் r ஆகவும், அதன் உயரம் h கோளத்தின் விட்டம் 2r-க்குச் சமமாகவும் இருக்கும்.",
        eq:"Radius = r, Height h = 2r",
        math:{
          latex:"\\begin{aligned}\\text{Radius}&=r\\\\h&=2r\\end{aligned}",
          fallback:"Radius = r, h = 2r",
          display:true
        }
      },
      {
        en:"Substitute h = 2r into the curved surface area formula of a cylinder, 2πrh.",
        ta:"உருளையின் வளைபரப்பு சூத்திரம் 2πrh-இல் h = 2r எனப் பிரதியிடவும்.",
        eq:"CSA = 2πr(2r) = 4πr² sq. units",
        math:{
          latex:"\\begin{aligned}\\text{CSA}_{\\text{cyl}}&=2\\pi r h\\\\&=2\\pi r(2r)\\\\&=4\\pi r^2\\text{ sq. units}\\end{aligned}",
          fallback:"CSA = 2πr(2r) = 4πr² sq. units",
          display:true
        }
      }
    ],
    answer:"4πr² sq. units.",
    answerTa:"4πr² சதுர அலகுகள்.",
    answerMath:{
      en:{
        latex:"\\boxed{4\\pi r^2\\text{ sq. units}}",
        fallback:"4πr² sq. units",
        display:true
      },
      ta:{
        latex:"\\boxed{4\\pi r^2\\text{ ச.அலகுகள்}}",
        fallback:"4πr² சதுர அலகுகள்",
        display:true
      }
    }
  },
  {
    ...SHARED,
    id:"c10-7-ex7-3-q7-iii",
    label:{
      en:"Exercise 7.3 · Q7(iii)",
      ta:"பயிற்சி 7.3 · வினா 7(iii)"
    },
    title:{
      en:"Ratio of sphere surface area to enclosing cylinder CSA",
      ta:"கோளத்தின் புறப்பரப்பிற்கும் உருளையின் வளைபரப்பிற்கும் உள்ள விகிதம்"
    },
    q:{
      en:"7. A right circular cylinder just enclose a sphere of radius r units. Calculate (iii) the ratio of the areas obtained in (i) and (ii).",
      ta:"7. ஆரம் r அலகுகள் கொண்ட ஒரு கோளம் ஒரு நேர் வட்ட உருளையினுள் மிகச் சரியாகப் பொருத்தப்பட்டுள்ளது எனில், கீழ்க்காண்பனவற்றைக் கணக்கிடுக. (iii) (i) மற்றும் (ii) -ல் பெறப்பட்ட பரப்புகளின் விகிதம்"
    },
    steps:[
      {
        en:"From parts (i) and (ii), both the surface area of the sphere and the curved surface area of the just-enclosing cylinder equal 4πr² sq. units.",
        ta:"பிரிவுகள் (i) மற்றும் (ii)-லிருந்து, கோளத்தின் புறப்பரப்பும் அதனைச் சரியாக மூடும் உருளையின் வளைபரப்பும் 4πr² சதுர அலகுகளாகச் சமமாக உள்ளன.",
        eq:"Area (i) = 4πr², Area (ii) = 4πr²",
        math:{
          latex:"\\begin{aligned}\\text{Area (i)}&=4\\pi r^2\\\\\\text{Area (ii)}&=4\\pi r^2\\end{aligned}",
          fallback:"Area (i) = 4πr², Area (ii) = 4πr²",
          display:true
        }
      },
      {
        en:"Divide both terms of the ratio by the common nonzero factor 4πr² to obtain the simplest ratio.",
        ta:"விகிதத்தின் இரு உறுப்புகளையும் பொதுக் காரணி 4πr²-ஆல் வகுத்தால் எளிய விகிதம் கிடைக்கும்.",
        eq:"Ratio = 4πr² : 4πr² = 1 : 1",
        math:{
          latex:"\\begin{aligned}\\text{Ratio}&=4\\pi r^2 : 4\\pi r^2\\\\&=1 : 1\\end{aligned}",
          fallback:"Ratio = 4πr² : 4πr² = 1 : 1",
          display:true
        }
      }
    ],
    answer:"1 : 1.",
    answerTa:"1 : 1.",
    answerMath:{
      en:{
        latex:"\\boxed{1 : 1}",
        fallback:"1 : 1",
        display:true
      },
      ta:{
        latex:"\\boxed{1 : 1}",
        fallback:"1 : 1",
        display:true
      }
    }
  }
];

const grade=window.TRIGGLE_CLASSES?.[10];
const chapter=window.TRIGGLE_CURRICULUM?.grades?.find(g=>g.grade===10)?.chapters?.find(c=>c.number===7);
if(!grade||!chapter)throw Error('Missing Grade 10 Chapter 7 dependencies');
chapter.textbookQuestionIds=chapter.textbookQuestionIds||[];
for(const e of entries){
  if(grade.items.some(x=>x.id===e.id))throw Error('Duplicate Mensuration record '+e.id);
  grade.items.push(e);
  if(!chapter.textbookQuestionIds.includes(e.id))chapter.textbookQuestionIds.push(e.id);
}
})();
