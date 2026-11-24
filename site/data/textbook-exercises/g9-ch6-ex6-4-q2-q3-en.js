/* AUD14-02 Ex6.4: seven bilingual subparts. Tamil prompt source: 2025 edition, printed p.253. */
(()=>{'use strict';
const grade=window.TRIGGLE_CLASSES?.[9];
if(!grade||!Array.isArray(grade.items))throw Error('Grade 9 core must load first');
const entries=[
  {
    "id": "c9-exercise-6-4-q2-i",
    "classNum": 9,
    "chapter": "6",
    "exercise": "6.4",
    "topic": {
      "en": "Trigonometry",
      "ta": "முக்கோணவியல்"
    },
    "label": {
      "en": "Exercise 6.4 · Q2(i)",
      "ta": "பயிற்சி 6.4 · வினா 2(i)"
    },
    "title": {
      "en": "Find an angle using the trig table",
      "ta": "முக்கோணவியல் அட்டவணையிலிருந்து கோணத்தைக் காண்க"
    },
    "q": {
      "en": "Find the value of θ if\n(i) sin θ = 0.9975",
      "ta": "θ இன் மதிப்பு காண்க.\n(i) sin θ = 0.9975"
    },
    "steps": [
      {
        "en": "To reverse a sine table, find the value 0.9975 in the natural sines table rather than using an inverse-sine calculator.",
        "eq": "sin θ = 0.9975",
        "ta": "சைன் அட்டவணையில் 0.9975 என்ற மதிப்பைத் தேடி அதற்குரிய கோணத்தைக் காண்க."
      },
      {
        "en": "Near 90°, several adjacent one-minute entries round to the same four-figure value. The table gives 0.9974 at 85°54′. The prescribed mean difference for the remaining minutes is 0.0001.",
        "eq": "sin 85°54′ ≈ 0.9974; MD(3′–5′) ≈ 0.0001",
        "ta": "90° அருகில் அடுத்தடுத்த கலைகளுக்கு ஒரே நான்கு இலக்க மதிப்பு கிடைக்கலாம். 85°54′ இல் அட்டவணை மதிப்பு 0.9974. மீதமுள்ள கலைகளுக்குரிய சராசரி வேறுபாடு 0.0001."
      },
      {
        "en": "Therefore 85°57′, 85°58′ and 85°59′ are all accepted by the prescribed four-figure table and official key. Do not claim a single exact angle.",
        "eq": "θ = 85°57′ or 85°58′ or 85°59′",
        "ta": "எனவே அட்டவணைப்படி 85°57′, 85°58′, 85°59′ ஆகிய மூன்றுமே ஏற்கத்தக்க விடைகள்.",
        "mathTa": [
          {
            "latex": "\\theta = 85^{\\circ}\\,57'",
            "fallback": "θ = 85°57′"
          },
          " அல்லது ",
          {
            "latex": "85^{\\circ}\\,58'",
            "fallback": "85°58′"
          },
          " அல்லது ",
          {
            "latex": "85^{\\circ}\\,59'",
            "fallback": "85°59′"
          }
        ]
      }
    ],
    "answer": "85°57′ or 85°58′ or 85°59′",
    "kind": "textbook",
    "source": "https://drive.google.com/file/d/1WxLnjLPhAGkTylUHNFvh8UL34Z8eqC4J/view",
    "reference": "TN SCERT Standard Nine Mathematics (English), revised 2025. Exercise 6.4 printed p.239 / PDF p.245, answer appendix printed p.316 / PDF p.322. Values follow prescribed four-figure tables; Tamil editorial review pending.",
    "page": 245,
    "edition": "2025",
    "translationReview": "pending",
    "releaseStatus": "english-preview",
    "sourceFidelity": {
      "status": "english-source-page-visual-checked",
      "enPrintedPage": 239,
      "enPdfPage": 245,
      "answerKeyEnPrintedPage": 316,
      "answerKeyEnPdfPage": 322,
      "tamilReview": "pending",
      "teacherReview": "pending",
      "taPdfPage": 259,
      "taPrintedPage": 253,
      "taDriveId": "1gp6z1UOuqoH6MCuZt_qNi492R3vZUWaj",
      "taPromptEvidence": "Printed p.253, PDF p.259. Question compared with the 2025 Tamil edition."
    },
    "answerTa": "85°57′ அல்லது 85°58′ அல்லது 85°59′",
    "answerMath": {
      "en": [
        {
          "latex": "85^{\\circ}\\,57'",
          "fallback": "85°57′"
        },
        " or ",
        {
          "latex": "85^{\\circ}\\,58'",
          "fallback": "85°58′"
        },
        " or ",
        {
          "latex": "85^{\\circ}\\,59'",
          "fallback": "85°59′"
        }
      ],
      "ta": [
        {
          "latex": "85^{\\circ}\\,57'",
          "fallback": "85°57′"
        },
        " அல்லது ",
        {
          "latex": "85^{\\circ}\\,58'",
          "fallback": "85°58′"
        },
        " அல்லது ",
        {
          "latex": "85^{\\circ}\\,59'",
          "fallback": "85°59′"
        }
      ]
    }
  },
  {
    "id": "c9-exercise-6-4-q2-ii",
    "classNum": 9,
    "chapter": "6",
    "exercise": "6.4",
    "topic": {
      "en": "Trigonometry",
      "ta": "முக்கோணவியல்"
    },
    "label": {
      "en": "Exercise 6.4 · Q2(ii)",
      "ta": "பயிற்சி 6.4 · வினா 2(ii)"
    },
    "title": {
      "en": "Find an angle using the trig table",
      "ta": "முக்கோணவியல் அட்டவணையிலிருந்து கோணத்தைக் காண்க"
    },
    "q": {
      "en": "Find the value of θ if\n(ii) cos θ = 0.6763",
      "ta": "θ இன் மதிப்பு காண்க.\n(ii) cos θ = 0.6763"
    },
    "steps": [
      {
        "en": "Find the closest preceding six-minute column in the natural cosines table: cos 47°24′ is tabulated as 0.6769.",
        "eq": "cos 47°24′ ≈ 0.6769",
        "ta": "கொசைன் அட்டவணையில் முந்தைய ஆறு கலை நிரலைப் பார்க்கவும். 47°24′ இல் மதிப்பு 0.6769."
      },
      {
        "en": "Cosine decreases as the acute angle grows. The extra 3′ have mean difference 0.0006, which must be subtracted: 0.6769 − 0.0006 = 0.6763.",
        "eq": "0.6769 − 0.0006 = 0.6763",
        "ta": "குறுங்கோணம் அதிகரிக்கும்போது கொசைன் குறையும். கூடுதல் மூன்று கலைகளுக்கான சராசரி வேறுபாடு 0.0006 ஐக் கழித்தால் 0.6763 கிடைக்கும்."
      },
      {
        "en": "The required angle is θ = 47°27′.",
        "eq": "θ = 47°27′",
        "ta": "அதனால் தேவையான கோணம் 47°27′."
      }
    ],
    "answer": "47°27′",
    "kind": "textbook",
    "source": "https://drive.google.com/file/d/1WxLnjLPhAGkTylUHNFvh8UL34Z8eqC4J/view",
    "reference": "TN SCERT Standard Nine Mathematics (English), revised 2025. Exercise 6.4 printed p.239 / PDF p.245, answer appendix printed p.316 / PDF p.322. Values follow prescribed four-figure tables; Tamil editorial review pending.",
    "page": 245,
    "edition": "2025",
    "translationReview": "pending",
    "releaseStatus": "english-preview",
    "sourceFidelity": {
      "status": "english-source-page-visual-checked",
      "enPrintedPage": 239,
      "enPdfPage": 245,
      "answerKeyEnPrintedPage": 316,
      "answerKeyEnPdfPage": 322,
      "tamilReview": "pending",
      "teacherReview": "pending",
      "taPdfPage": 259,
      "taPrintedPage": 253,
      "taDriveId": "1gp6z1UOuqoH6MCuZt_qNi492R3vZUWaj",
      "taPromptEvidence": "Printed p.253, PDF p.259. Question compared with the 2025 Tamil edition."
    }
  },
  {
    "id": "c9-exercise-6-4-q2-iii",
    "classNum": 9,
    "chapter": "6",
    "exercise": "6.4",
    "topic": {
      "en": "Trigonometry",
      "ta": "முக்கோணவியல்"
    },
    "label": {
      "en": "Exercise 6.4 · Q2(iii)",
      "ta": "பயிற்சி 6.4 · வினா 2(iii)"
    },
    "title": {
      "en": "Find an angle using the trig table",
      "ta": "முக்கோணவியல் அட்டவணையிலிருந்து கோணத்தைக் காண்க"
    },
    "q": {
      "en": "Find the value of θ if\n(iii) tan θ = 0.0720",
      "ta": "θ இன் மதிப்பு காண்க.\n(iii) tan θ = 0.0720"
    },
    "steps": [
      {
        "en": "Look backwards through the natural tangents table. At 4°06′, the four-figure value is 0.0717.",
        "eq": "tan 4°06′ ≈ 0.0717",
        "ta": "டேன்ஜென்ட் அட்டவணையில் 4°06′ இல் நான்கு இலக்க மதிப்பு 0.0717."
      },
      {
        "en": "One extra minute adds a mean difference 0.0003: 0.0717 + 0.0003 = 0.0720.",
        "eq": "0.0717 + 0.0003 = 0.0720",
        "ta": "மேலும் ஒரு கலைக்கான சராசரி வேறுபாடு 0.0003. இதைக் கூட்டினால் 0.0720 கிடைக்கும்."
      },
      {
        "en": "Therefore θ = 4°7′ (four degrees seven minutes), the angle whose tabulated tangent is 0.0720.",
        "eq": "θ = 4°7′",
        "ta": "எனவே கோணம் 4°7′, அதாவது நான்கு பாகை ஏழு கலை."
      }
    ],
    "answer": "4°7′",
    "kind": "textbook",
    "source": "https://drive.google.com/file/d/1WxLnjLPhAGkTylUHNFvh8UL34Z8eqC4J/view",
    "reference": "TN SCERT Standard Nine Mathematics (English), revised 2025. Exercise 6.4 printed p.239 / PDF p.245, answer appendix printed p.316 / PDF p.322. Values follow prescribed four-figure tables; Tamil editorial review pending.",
    "page": 245,
    "edition": "2025",
    "translationReview": "pending",
    "releaseStatus": "english-preview",
    "sourceFidelity": {
      "status": "english-source-page-visual-checked",
      "enPrintedPage": 239,
      "enPdfPage": 245,
      "answerKeyEnPrintedPage": 316,
      "answerKeyEnPdfPage": 322,
      "tamilReview": "pending",
      "teacherReview": "pending",
      "taPdfPage": 259,
      "taPrintedPage": 253,
      "taDriveId": "1gp6z1UOuqoH6MCuZt_qNi492R3vZUWaj",
      "taPromptEvidence": "Printed p.253, PDF p.259. Question compared with the 2025 Tamil edition."
    }
  },
  {
    "id": "c9-exercise-6-4-q2-iv",
    "classNum": 9,
    "chapter": "6",
    "exercise": "6.4",
    "topic": {
      "en": "Trigonometry",
      "ta": "முக்கோணவியல்"
    },
    "label": {
      "en": "Exercise 6.4 · Q2(iv)",
      "ta": "பயிற்சி 6.4 · வினா 2(iv)"
    },
    "title": {
      "en": "Find an angle using the trig table",
      "ta": "முக்கோணவியல் அட்டவணையிலிருந்து கோணத்தைக் காண்க"
    },
    "q": {
      "en": "Find the value of θ if\n(iv) cos θ = 0.0410",
      "ta": "θ இன் மதிப்பு காண்க.\n(iv) cos θ = 0.0410"
    },
    "steps": [
      {
        "en": "Find 0.0410 using the four-figure natural cosines table. The preceding six-minute column is 87°36′ with value 0.0419.",
        "eq": "cos 87°36′ ≈ 0.0419",
        "ta": "நான்கு இலக்க கொசைன் அட்டவணையில் 0.0410 ஐத் தேடுக. முந்தைய ஆறு கலை நிரலில் 87°36′ க்கு 0.0419 உள்ளது."
      },
      {
        "en": "For the remaining 3′, subtract the cosine mean difference 0.0009: 0.0419 − 0.0009 = 0.0410.",
        "eq": "0.0419 − 0.0009 = 0.0410",
        "ta": "மீதமுள்ள மூன்று கலைகளுக்கான சராசரி வேறுபாடு 0.0009 ஐக் கழித்தால் 0.0410 கிடைக்கும்."
      },
      {
        "en": "Hence θ = 87°39′, giving the requested four-figure cosine value of 0.0410.",
        "eq": "θ = 87°39′",
        "ta": "எனவே தேவையான கொசைன் மதிப்புக்குரிய கோணம் 87°39′."
      }
    ],
    "answer": "87°39′",
    "kind": "textbook",
    "source": "https://drive.google.com/file/d/1WxLnjLPhAGkTylUHNFvh8UL34Z8eqC4J/view",
    "reference": "TN SCERT Standard Nine Mathematics (English), revised 2025. Exercise 6.4 printed p.239 / PDF p.245, answer appendix printed p.316 / PDF p.322. Values follow prescribed four-figure tables; Tamil editorial review pending.",
    "page": 245,
    "edition": "2025",
    "translationReview": "pending",
    "releaseStatus": "english-preview",
    "sourceFidelity": {
      "status": "english-source-page-visual-checked",
      "enPrintedPage": 239,
      "enPdfPage": 245,
      "answerKeyEnPrintedPage": 316,
      "answerKeyEnPdfPage": 322,
      "tamilReview": "pending",
      "teacherReview": "pending",
      "taPdfPage": 259,
      "taPrintedPage": 253,
      "taDriveId": "1gp6z1UOuqoH6MCuZt_qNi492R3vZUWaj",
      "taPromptEvidence": "Printed p.253, PDF p.259. Question compared with the 2025 Tamil edition."
    }
  },
  {
    "id": "c9-exercise-6-4-q2-v",
    "classNum": 9,
    "chapter": "6",
    "exercise": "6.4",
    "topic": {
      "en": "Trigonometry",
      "ta": "முக்கோணவியல்"
    },
    "label": {
      "en": "Exercise 6.4 · Q2(v)",
      "ta": "பயிற்சி 6.4 · வினா 2(v)"
    },
    "title": {
      "en": "Find an angle using the trig table",
      "ta": "முக்கோணவியல் அட்டவணையிலிருந்து கோணத்தைக் காண்க"
    },
    "q": {
      "en": "Find the value of θ if\n(v) tan θ = 7.5958",
      "ta": "θ இன் மதிப்பு காண்க.\n(v) tan θ = 7.5958"
    },
    "steps": [
      {
        "en": "Find 7.5958 directly in the natural tangents table.",
        "eq": "tan 82°30′ ≈ 7.5958",
        "ta": "டேன்ஜென்ட் அட்டவணையில் 7.5958 ஐ நேரடியாகத் தேடுக."
      },
      {
        "en": "It occurs at 82°30′, exactly at a six-minute column. There is no leftover minute and no mean-difference adjustment.",
        "eq": "MD(0′) = 0",
        "ta": "82°30′ என்ற ஆறு கலை நிரலிலேயே இம்மதிப்பு உள்ளது. மீதிக் கலை இல்லை என்பதால் சராசரி வேறுபாட்டுத் திருத்தம் தேவையில்லை."
      },
      {
        "en": "Therefore θ = 82°30′, read directly from the natural tangent table.",
        "eq": "θ = 82°30′",
        "ta": "அட்டவணையிலிருந்து நேரடியாகக் கிடைக்கும் கோணம் 82°30′."
      }
    ],
    "answer": "82°30′",
    "kind": "textbook",
    "source": "https://drive.google.com/file/d/1WxLnjLPhAGkTylUHNFvh8UL34Z8eqC4J/view",
    "reference": "TN SCERT Standard Nine Mathematics (English), revised 2025. Exercise 6.4 printed p.239 / PDF p.245, answer appendix printed p.316 / PDF p.322. Values follow prescribed four-figure tables; Tamil editorial review pending.",
    "page": 245,
    "edition": "2025",
    "translationReview": "pending",
    "releaseStatus": "english-preview",
    "sourceFidelity": {
      "status": "english-source-page-visual-checked",
      "enPrintedPage": 239,
      "enPdfPage": 245,
      "answerKeyEnPrintedPage": 316,
      "answerKeyEnPdfPage": 322,
      "tamilReview": "pending",
      "teacherReview": "pending",
      "taPdfPage": 259,
      "taPrintedPage": 253,
      "taDriveId": "1gp6z1UOuqoH6MCuZt_qNi492R3vZUWaj",
      "taPromptEvidence": "Printed p.253, PDF p.259. Question compared with the 2025 Tamil edition."
    }
  },
  {
    "id": "c9-exercise-6-4-q3-i",
    "classNum": 9,
    "chapter": "6",
    "exercise": "6.4",
    "topic": {
      "en": "Trigonometry",
      "ta": "முக்கோணவியல்"
    },
    "label": {
      "en": "Exercise 6.4 · Q3(i)",
      "ta": "பயிற்சி 6.4 · வினா 3(i)"
    },
    "title": {
      "en": "Read a four-figure trig table",
      "ta": "நான்கு இலக்க முக்கோணவியல் அட்டவணையைப் பயன்படுத்துக"
    },
    "q": {
      "en": "Find the value of the following:\n(i) sin 65°39′ + cos 24°57′ + tan 10°10′",
      "ta": "கீழ்க்காண்பனவற்றின் மதிப்பு காண்க.\n(i) sin 65°39′ + cos 24°57′ + tan 10°10′"
    },
    "steps": [
      {
        "en": "Read the prescribed four-figure trigonometric tables, including mean differences where the minutes are not an exact six-minute column.",
        "eq": "sin 65°39′ ≈ 0.9111",
        "ta": "கொடுக்கப்பட்ட கோணங்களுக்கான முக்கோணவியல் விகிதங்களை நான்கு இலக்க அட்டவணையில் காண்க. ஆறு கலை நிரல்களுக்கு இடையே வரும் கோணங்களுக்குச் சராசரி வேறுபாட்டைப் பயன்படுத்துக."
      },
      {
        "en": "The tabulated values used in the textbook calculation are sin 65°39′ ≈ 0.9111, cos 24°57′ ≈ 0.9066, and tan 10°10′ ≈ 0.1793.",
        "eq": "cos 24°57′ ≈ 0.9066; tan 10°10′ ≈ 0.1793",
        "ta": "அட்டவணைப்படி சைன் மதிப்பு 0.9111, கொசைன் மதிப்பு 0.9066, டேன்ஜென்ட் மதிப்பு 0.1793."
      },
      {
        "en": "Add the three four-figure table values, not intermediate unrounded calculator values: 0.9111 + 0.9066 + 0.1793 = 1.9970.",
        "eq": "0.9111 + 0.9066 + 0.1793 = 1.9970",
        "ta": "மூன்று அட்டவணை மதிப்புகளையும் கூட்டினால் 1.9970 கிடைக்கும்."
      }
    ],
    "answer": "1.9970",
    "kind": "textbook",
    "source": "https://drive.google.com/file/d/1WxLnjLPhAGkTylUHNFvh8UL34Z8eqC4J/view",
    "reference": "TN SCERT Standard Nine Mathematics (English), revised 2025. Exercise 6.4 printed p.239 / PDF p.245, answer appendix printed p.316 / PDF p.322. Values follow prescribed four-figure tables; Tamil editorial review pending.",
    "page": 245,
    "edition": "2025",
    "translationReview": "pending",
    "releaseStatus": "english-preview",
    "sourceFidelity": {
      "status": "english-source-page-visual-checked",
      "enPrintedPage": 239,
      "enPdfPage": 245,
      "answerKeyEnPrintedPage": 316,
      "answerKeyEnPdfPage": 322,
      "tamilReview": "pending",
      "teacherReview": "pending",
      "taPdfPage": 259,
      "taPrintedPage": 253,
      "taDriveId": "1gp6z1UOuqoH6MCuZt_qNi492R3vZUWaj",
      "taPromptEvidence": "Printed p.253, PDF p.259. Question compared with the 2025 Tamil edition."
    }
  },
  {
    "id": "c9-exercise-6-4-q3-ii",
    "classNum": 9,
    "chapter": "6",
    "exercise": "6.4",
    "topic": {
      "en": "Trigonometry",
      "ta": "முக்கோணவியல்"
    },
    "label": {
      "en": "Exercise 6.4 · Q3(ii)",
      "ta": "பயிற்சி 6.4 · வினா 3(ii)"
    },
    "title": {
      "en": "Read a four-figure trig table",
      "ta": "நான்கு இலக்க முக்கோணவியல் அட்டவணையைப் பயன்படுத்துக"
    },
    "q": {
      "en": "Find the value of the following:\n(ii) tan 70°58′ + cos 15°26′ − sin 84°59′",
      "ta": "கீழ்க்காண்பனவற்றின் மதிப்பு காண்க.\n(ii) tan 70°58′ + cos 15°26′ − sin 84°59′"
    },
    "steps": [
      {
        "en": "Use the prescribed four-figure tables and mean differences; do not silently replace a textbook table entry with an unrounded scientific-calculator value.",
        "eq": "tan 70°58′ ≈ 2.8982",
        "ta": "நான்கு இலக்க அட்டவணையையும் சராசரி வேறுபாடுகளையும் பயன்படுத்தி ஒவ்வொரு விகிதத்தையும் காண்க."
      },
      {
        "en": "The values in the school-table solution are tan 70°58′ ≈ 2.8982, cos 15°26′ ≈ 0.9639, and sin 84°59′ ≈ 0.9962.",
        "eq": "cos 15°26′ ≈ 0.9639; sin 84°59′ ≈ 0.9962",
        "ta": "அட்டவணை முறையில் டேன்ஜென்ட் மதிப்பு 2.8982, கொசைன் மதிப்பு 0.9639, சைன் மதிப்பு 0.9962."
      },
      {
        "en": "Apply the subtraction sign carefully: 2.8982 + 0.9639 − 0.9962 = 3.8621 − 0.9962 = 2.8659. This is the textbook's stated table-method answer; higher-precision calculator evaluation differs.",
        "eq": "2.8982 + 0.9639 − 0.9962 = 2.8659",
        "ta": "முதல் இரண்டைக் கூட்டி மூன்றாவதைக் கழிக்கவும். 3.8621 இலிருந்து 0.9962 ஐக் கழித்தால் பாடநூல் அட்டவணை முறையின்படி 2.8659 கிடைக்கும்."
      }
    ],
    "answer": "2.8659",
    "kind": "textbook",
    "source": "https://drive.google.com/file/d/1WxLnjLPhAGkTylUHNFvh8UL34Z8eqC4J/view",
    "reference": "TN SCERT Standard Nine Mathematics (English), revised 2025. Exercise 6.4 printed p.239 / PDF p.245, answer appendix printed p.316 / PDF p.322. Values follow prescribed four-figure tables; Tamil editorial review pending.",
    "page": 245,
    "edition": "2025",
    "translationReview": "pending",
    "releaseStatus": "english-preview",
    "sourceFidelity": {
      "status": "english-source-page-visual-checked",
      "enPrintedPage": 239,
      "enPdfPage": 245,
      "answerKeyEnPrintedPage": 316,
      "answerKeyEnPdfPage": 322,
      "tamilReview": "pending",
      "teacherReview": "pending",
      "taPdfPage": 259,
      "taPrintedPage": 253,
      "taDriveId": "1gp6z1UOuqoH6MCuZt_qNi492R3vZUWaj",
      "taPromptEvidence": "Printed p.253, PDF p.259. Question compared with the 2025 Tamil edition."
    }
  }
];
const ids=new Set(grade.items.map(q=>q.id));
for(const entry of entries){if(ids.has(entry.id))throw Error("Duplicate source exercise "+entry.id);ids.add(entry.id);grade.items.push(entry);}
})();
