# Edition and Tamil terminology verification — evidence audit
**Date:** 2026-11-06  
**Project:** Triggle, Tamil Nadu State Board Mathematics, Grades 9–12  
**Status:** **archived textbook evidence improved**; **2026–27 edition equivalence and full terminology approval are not yet certified**.

**NEWER INPUT NOW AVAILABLE:** The user subsequently attached **all 12 required PDFs whose imprint pages explicitly state revised edition 2025**. For the present access status and 41-chapter pagination, consult [the newer 2025 uploaded-book audit](2025-upload-audit.md) and [manifest](2025-user-textbook-manifest.json). The historic access statements below describe the **earlier research snapshot** only. **No 2025 textbook file is missing**; Class 9 Tamil and Class 12 Tamil Volume I arrived in the follow-up upload. The 2026–27 prescribed-printing comparison remains unverified.

This is a factual research ledger, not a declaration that all editions are verified. It supplements the historical [Phase 0 audit](../phase-0-audit.md) and the [source register](README.md). The academic-year books reportedly uploaded elsewhere in the project were **not available in this conversation's readable files**. The accessible local upload was a historical `Triggle-main.zip`, which contains website source files but no textbook PDFs. Consequently no supplied 2026–27 textbook imprint could be compared directly.

## A. Current-year government evidence, and its limitations

The **Tamil Nadu Textbook and Educational Services Corporation** [official schools page](https://textbookcorp.in/schools) announces:

- **10 April 2026:** sale/distribution of annual Grade 9, Grade 10 and Grade 12 textbooks (Tamil and English media) for 2026–27.
- **14 May 2026:** sale/distribution of annual Grade 11 textbooks (Tamil and English media) for 2026–27.
- The [corporation price catalogue](https://www.textbookcorp.in/files/PRICELIST.pdf) lists Grades 9/10 Mathematics and Grades 11/12 Mathematics Volumes I/II, with language/medium and prices, but does not provide a copyright/imprint page or the chapter/exercise index.

**Correct interpretation:** Current-year textbooks exist. These notices do **not** prove that 2019, 2020, 2022 or 2024 PDFs match the books distributed in 2026–27. A URL labelled "2026–27" by a third-party collection is likewise insufficient to prove revision equivalence.

## B. Edition-status matrix

| Grade | English historical book evidence (Phase 0) | Tamil historical book evidence | Current 2026–27 prescribed imprint match |
|---|---|---|---|
| 9 | Government/SCERT reproduced 2019 revision; contents inspected in Phase 0 | Government/SCERT reproduced 2019 revision; Tamil headings cross-checked in Phase 0 | **Not established**; need 2026–27 imprint/contents |
| 10 | Government/SCERT first 2019 / comparative 2020; contents inspected in Phase 0 | Government/SCERT 2020 revision; headings cross-checked in Phase 0 | **Not established**; need 2026–27 imprint/contents |
| 11 | Volume I later reprint 2024, Volume II earlier 2018; contents inspected in Phase 0 | Volumes I and II, revisions through 2020, headings cross-checked in Phase 0 | **Not established**; need both 2026–27 volume imprints/contents |
| 12 | Volume I archived revision 2020, Volume II older 2019 extract; contents inspected in Phase 0 | **NEW:** SCERT Tamil Volume I 2020 revision, Volume II 2022 revision; contents and glossaries inspected from reproduced primary book material | **Not established**; need both 2026–27 volume imprints/contents |

### Newly identified Grade 12 Tamil textbook sources

1. **SCERT Mathematics, Higher Secondary Second Year, Volume I, Tamil medium.** [Archived textbook PDF](https://winmeen.com/wp-content/uploads/2020/09/12th_Std_Mathematics_Vol_1_TM_optimised.pdf). Title p I; imprint p II explicitly states first edition 2019 and revised edition 2020; contents pp IV–V list chapters 1–6. Extracted-text read confirms chapter starting printed pages listed below. **Important limitation:** web screenshot rendering of this 23-MB archived file was rejected by the image inspection service; extracted-text verification and independent index corroboration were used, not a complete visual typography proof.
2. **SCERT Mathematics, Higher Secondary Second Year, Volume II, Tamil medium.** [Archived textbook flipbook](https://fliphtml5.com/lniiy/xlka/12th_Mathematics_Vol-2_TM_-_www.tntextbooks.in_%281%29/3/). The book's reproduced imprint p II says first edition 2019, revised editions 2020 and 2022. Contents pp III–IV list chapters 7–12; the glossary p281 provides several English↔Tamil mathematics labels. The web publication date (December 2022) and the book revision years are **not** evidence of 2026–27 equivalence.
3. [SCERT Grade 12 Tamil Volume I older glossary PDF](https://athiyamanteam.com/wp-content/uploads/2019/10/New-TN-Samacheer-Book-12th-Std-Maths-TM-Athiyaman-Team.pdf) gives additional historical terminology examples. The source is a third-party reproduction with visible overlay branding; do not treat its hosting domain as the government publisher.

Original copyright remains with the Government/SCERT. These resources are **linked, not copied, redistributed or uploaded into the repository**.

## C. Grade 12 Tamil title and page crosswalk

The titles below are the chapter-navigation labels already held in `site/data/curriculum.js`. We now have **direct archived book-source page evidence** instead of *only* a secondary Tamil chapter index.

| Triggle ID | Tamil chapter heading (normalized; full spelling review pending) | Historical Tamil volume | Contents page | Printed opening page |
|---|---|---|---|---:|
| `g12-ch1` | அணிகள் மற்றும் அணிக்கோவைகளின் பயன்பாடுகள் | I (rev. 2020) | IV–V | 1 |
| `g12-ch2` | கலப்பு எண்கள் | I (rev. 2020) | IV–V | 58 |
| `g12-ch3` | சமன்பாட்டியல் | I (rev. 2020) | IV–V | 103 |
| `g12-ch4` | நேர்மாறு முக்கோணவியல் சார்புகள் | I (rev. 2020) | IV–V | 142 |
| `g12-ch5` | இருபரிமாண பகுமுறை வடிவியல் II | I (rev. 2020) | IV–V | 189 |
| `g12-ch6` | வெக்டர் இயற்கணிதத்தின் பயன்பாடுகள் | I (rev. 2020) | IV–V | 241 |
| `g12-ch7` | வகை நுண்கணிதத்தின் பயன்பாடுகள் | II (rev. 2022) | III–IV | 1 |
| `g12-ch8` | வகையீடுகள் மற்றும் பகுதி வகைக்கெழுக்கள் | II (rev. 2022) | III–IV | 61 |
| `g12-ch9` | தொகை நுண்கணிதத்தின் பயன்பாடுகள் | II (rev. 2022) | III–IV | 94 |
| `g12-ch10` | சாதாரண வகைக்கெழுச் சமன்பாடுகள் | II (rev. 2022) | III–IV | 151 |
| `g12-ch11` | நிகழ்தகவு பரவல்கள் | II (rev. 2022) | III–IV | 190 |
| `g12-ch12` | தனிநிலைக் கணிதம் | II (rev. 2022) | III–IV | 237 |

These are **printed pages in different historical language editions**, not PDF page offsets, and must not replace the different English printed-page references.

Note on text extraction: The Volume I extracted contents has OCR corruption (e.g. a heading rendered `பண்பாடுகள்` where the independent Tamil chapter index and Volume II conventions support `பயன்பாடுகள்`). Do not blindly copy corrupted PDF text into the UI. Keep spelling as an evidence-backed editorial candidate until an actual visual/printed page or native reviewer confirms exact typography.

## D. Tamil terminology evidence sample — Grade 12

The following short term pairs were observed in the reproduced **Grade 12 Tamil textbooks' glossary/contents**, not translated from NCERT or invented by AI. They are valid *historical-reference candidates* but **not yet approved as the complete vocabulary for the current 2026–27 edition**.

| English concept | Historical Tamil label | Chapter anchor |
|---|---|---|
| Inverse matrix | நேர்மாறு அணி | Vol I, ch1 glossary |
| Adjoint matrix | சேர்ப்பு அணி | Vol I, ch1 glossary |
| Rank | தரம் | Vol I, ch1 glossary |
| Elementary transformation | தொடக்க நிலை உருமாற்றங்கள் | Vol I, ch1 glossary |
| Complex numbers | கலப்பு எண்கள் | Vol I, ch2 contents |
| Imaginary unit | கற்பனை அலகு | Vol I, ch2 glossary |
| Argand plane | ஆர்கண்ட் தளம் | Vol I, ch2 glossary |
| Related rates | சார்ந்த வீதங்கள் | Vol II, ch7 glossary p281 |
| Mean value theorem | இடை மதிப்புத் தேற்றம் | Vol II, ch7 glossary p281 |
| Stationary points | நிலைப் புள்ளிகள் | Vol II, ch7 glossary p281 |
| Partial derivatives | பகுதி வகைக்கெழுக்கள் | Vol II, ch8 glossary p281 |
| Differential | வகையீடு | Vol II, ch8 glossary p281 |
| Definite integral | வரையறுத்தத் தொகை | Vol II, ch9 glossary p281 |
| Reduction formula | குறைப்பு சூத்திரம் | Vol II, ch9 glossary p281 |
| Dependent variable | சார்ந்த மாறி | Vol II, ch10 glossary p281 |
| Independent variable | சாரா மாறி | Vol II, ch10 glossary p281 |
| Integrating factor | தொகையீட்டுக் காரணி | Vol II, ch10 glossary p281 |

**Textbook chapter title verification is not the same as full Tamil mathematical terminology review.** The `terminology.ta = pending` flag remains in the application because a full chapter includes hundreds of technical terms and original explanations not checked against the currently prescribed Tamil textbook. We deliberately did **not** mark `verified` prematurely.

The chapter review notes for Grade 12 were updated in both languages to reflect archived evidence and this specific remaining dependency.

## E. Next required evidence to close the 2026–27 and Tamil approvals

For **each** of the 12 Grade–medium–volume combinations (Grade 9 EN+TA, Grade 10 EN+TA, Grade 11 Vol I/II EN+TA, Grade 12 Vol I/II EN+TA = **12 individual books**), obtain an identifiable 2026–27 prescribed physical/PDF copy, or written confirmation from Tamil Nadu SCERT/TNTBESC of the unchanged prescribed imprint/contents. Record:

- Title/copyright/imprint (first/revised/reprint year), medium, volume, ISBN/stock code if printed.
- Contents pages, chapter numbering and printed opening pages.
- Comparison of exercise numbering, worked examples and diagrams before claiming exact question fidelity.
- Tamil glossary and mathematical statements checked page-by-page by a competent Tamil-medium mathematics reviewer.

**Updated next step:** All 12 2025 PDF revisions were uploaded in this conversation and their imprints/contents inspected. The 2026–27 prescribed-printing equivalence check still needs an authoritative current-year reference; complete chapter exercise and Tamil lesson reviews are also pending. Codex cannot access the chat-local PDFs from a GitHub clone without separately provided access.

### Safety gates retained

- No lesson question IDs or user progress keys changed.
- Existing chapter status stays `planned` and review `unreviewed` until content approval.
- No auto-approval based solely on a public webpage's 2026–27 headline.
- App routes and printed-page citations stay edition specific.
