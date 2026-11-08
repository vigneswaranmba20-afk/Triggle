# Grade 9 English 2025 — Exercise 1.2 source-extraction checkpoint (2026-11-09)

**Status: DRAFT / NOT SOURCE-IMAGE VERIFIED / NOT PUBLISHED.** This is a narrow checkpoint, not a completed exercise or a claim of full textbook coverage.

Source: user's connected `Class_9_Mathematics_English_2025_Edition-www.tntextbooks.in.pdf`, Drive ID `1WxLnjLPhAGkTylUHNFvh8UL34Z8eqC4J`. Its extracted text places Exercise 1.2 on printed pp. 11–12 (PDF-page positions require independent confirmation against actual rendered pages). Tamil source: Drive ID `1gp6z1UOuqoH6MCuZt_qNi492R3vZUWaj`, not yet consulted for this batch. **Text extraction is not page-image verification**; punctuation and mathematical typesetting remain provisional.

## Candidate next item: Exercise 1.2, Q1(i)

Extracted English text (provisional): `1. Find the cardinal number of the following sets.` / `(i) M = {p, q, r, s, t, u}`

Original Triggle draft explanation: A set's cardinal number counts its **distinct** elements. Here the six letters p, q, r, s, t and u are all different, so `n(M) = 6`. Independent check: enumerating the set gives six unique elements; a Python assertion `len(set(['p','q','r','s','t','u'])) == 6` **passed locally** on 2026-11-09. No Tamil translation is asserted.

| ID | Source-extracted | Image checked | Math checked | English UI | Tamil UI | CI/browser | Preview published | Human Tamil review |
|---|---|---|---|---|---|---|---|---|
| g9-ch1-ex1.2-q1-i | yes, provisional | no | yes, simple enumeration | no | no | not run (no UI change) | no | pending |

Next required action: open the 2025 PDF page image for printed p.11 and check the exact Q1 stem and (i), the printed/PDF page mapping and glyphs; consult corresponding Tamil page for source alignment. Only then add the question to the actual Exercises UI with a blocking source-fidelity assertion, run npm test, npm run test:browser, full CI and release verification. Continue Q1(ii–v) in source order; their extracted math needs page-image checking (especially the stacked fraction in Q1(iii)). Do not count this checkpoint as an additional published textbook subpart. Exercise 1.1 remains 30/30 previously source-checked; all later Chapter 1 exercises remain incomplete.
