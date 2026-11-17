# Grade 9 Chapter 2 (Real Numbers) — Exercise 2.1 Source-Image Audit (2026-11-17)

## 1. Source Provenance & Visual Inspection Evidence

- **Textbook:** `Class_9_Mathematics_English_2025_Edition-www.tntextbooks.in.pdf`
- **Google Drive ID:** `1WxLnjLPhAGkTylUHNFvh8UL34Z8eqC4J` (`https://drive.google.com/file/d/1WxLnjLPhAGkTylUHNFvh8UL34Z8eqC4J/view`)
- **PDF SHA-256:** `e6890ec79f4ad09c42f4829f0a14f4fbc3c6814887c4ba14f2b3fa559638c037` (328 PDF pages)
- **Inspected Page Images (144 DPI via `tools/inspect_textbook_pdf.py`):**
  1. **Imprint page:** PDF page `2` (`printedPage: ii`, `imageSha256: 72f075e09f09a8bab7e19c6bd0ef984bd7ec7c2b29cc7c37a780d4c57e4afc02`) — confirms *Government of TamilNadu, First Edition - 2018, Revised Edition - 2019, 2020, 2022, 2023, 2025*.
  2. **Exercise 2.1 page:** PDF page `51` (`printedPage: 45`, `imageSha256: c3fbff5162db395a3e93014a044d9569e78c9992abed7eb14841d875dc1ddac4`) — contains the complete **Exercise 2.1** followed immediately by Section `2.3 Irrational Numbers`.
  3. **Answer Appendix page:** PDF page `314` (`printedPage: 308`, `imageSha256: 3af6ece4ad56a2bffe6e3ad0b124968b1a667ce644911fcdd7d4cce6d74ec60b`) — contains the official answers for **Chapter 2 Real Numbers · Exercise 2.1**.

## 2. Complete Question & Subpart Inventory (Exercise 2.1)

Exercise 2.1 on printed page 45 contains **3 numbered questions** and **5 total subparts**:

| App ID | Question / Subpart | Verbatim 2025 Textbook Prompt (Printed p. 45 / PDF p. 51) | Official 2025 Answer Key (Printed p. 308 / PDF p. 314) | Preserved App Answer (`g9-ch2-exercises-a.js`) | Status |
|---|---|---|---|---|---|
| `g9-ch2-ex1-q1` | Q1 (`whole`) | `1. Which arrow best shows the position of 11/3 on the number line?` (with number line from `–5` to `5` and arrows `A`, `B`, `C`, `D`) | `1. D` | `Arrow D (11/3 = 3⅔ ≈ 3.667)` | Present & verified |
| `g9-ch2-ex1-q2` | Q2 (`whole`) | `2. Find any three rational numbers between -7/11 and 2/11.` | `2. -6/11, -5/11, -4/11, ... 1/11` | `−6/11, −5/11, −4/11` | Present & verified |
| `g9-ch2-ex1-q3-i` | Q3 `(i)` | `3. Find any five rational numbers between (i) 1/4 and 1/5` | `3. (i) 9/40, 19/80, 39/160, 79/320, 159/640 ; The given answer is one of the answers. There can be many more answers` | `0.21, 0.22, 0.23, 0.24, 0.245` | Present & verified |
| `g9-ch2-ex1-q3-ii` | Q3 `(ii)` | `3. Find any five rational numbers between ... (ii) 0.1 and 0.11` | `(ii) 0.101, 0.102, ... 0.109 The given answer is one of the answers. There can be many more answers` | `0.101, 0.102, 0.103, 0.104, 0.105` | Present & verified |
| `g9-ch2-ex1-q3-iii` | Q3 `(iii)` | `3. Find any five rational numbers between ... (iii) –1 and –2` | `(iii) -3/2, -5/4, -9/8, -17/16, -33/32 The given answer is one of the answers. There can be many more answers` | `−1.1, −1.2, −1.3, −1.4, −1.5` | Present & verified |

## 3. Audit Counts & Repairs Applied

- **Existing Exercise 2.1 subparts in `main`:** `5` (`g9-ch2-ex1-q1`, `g9-ch2-ex1-q2`, `g9-ch2-ex1-q3-i`, `g9-ch2-ex1-q3-ii`, `g9-ch2-ex1-q3-iii`)
- **Missing subparts in 2025 textbook:** `0` (Section 2.3 begins immediately after Q3 on printed page 45)
- **Duplicated question IDs:** `0`
- **Repaired items (`2` presentation/pedagogy defects repaired while preserving baseline SHA-256 record locks):**
  1. **`g9-ch2-ex1-q3-ii` Why-step misconception repair (`site/data/why-step-g9.js`):** Replaced an erroneous `"rounding"` template explanation (*"Rounding changes the chosen digit only when that next digit is 5 or more"*) with a beginner-friendly explanation of decimal place-value equivalence (`0.1 = 0.100` and `0.11 = 0.110`) and rational density, and expanded all five Exercise 2.1 English Why-step bridges to connect the decimal/common-denominator working with the textbook's midpoint formula $\frac{1}{2}(a+b)$.
  2. **`g9-ch2-ex1-q1` KaTeX notation layout repair (`site/data/math-layout/g9-authored-math.json` & `site/data/g9-clear-math.js`):** Anchored `11/3` in `questionAnchors` so prose labels `A, B, C, D` stay typographically consistent, and unified step 2 (`D: approximately 3.67`) into a single display KaTeX formula rather than splitting `D` and `3.67` across two separate display blocks.
