# TRACE Tamil validation — experimental pilot, 25 Nov 2026

This branch-only experiment does not modify site content, site deployment, existing tests, review status or production release gates.

## Run
```sh
node docs/trace/tamil-validation-pilot/run.cjs build/tamil-validation-pilot
```
The script checks pinned source manifests, constructs exactly 60 cases from 10 Grade 10 Mensuration questions, and reports an offline baseline: 20 unchanged/formatting controls; 10 altered quantities; 10 changed mathematical terms; 10 changed meanings; 10 synthetic agreement errors. These are development cases, not a hidden benchmark or certified good Tamil. The script's strict source drift field is separate from its limited semantic-risk heuristics. The output includes a blind EN/TA input file, a separate answer key and baseline report. Never publish mutations to student content.

## Next stages
1. Independently review the benchmark labels with a Tamil-medium mathematics educator; add a held-out set of natural errors and valid alternate phrasings, including original explanations and concept text.
2. Run the Tamil mT5 GEC model (https://huggingface.co/manavdhamecha77/GEC-mT5-Small-Tamil) as a read-only suggestion generator. Compare proposed edits; never apply automatically. Its published GLEU is not domain accuracy.
3. Evaluate Tamil-to-English back-translation using AI4Bharat IndicTrans2 distilled 200M (https://huggingface.co/ai4bharat/indictrans2-indic-en-dist-200M), or a verified newer compatible model. The former is gated; accept terms and use a least-privilege secret HF_TOKEN only if needed. Review model remote code and pin immutable revisions before executing. Use CPU batch inference, no paid inference API by default. Stop honestly on model access or resource failures.
4. Test each model separately, then in combination, on blinded held-out inputs. Measure precision, recall, false positives, critical misses and latency. Grammar suggestions are not verdicts; back-translation may miss number/negation/geometry errors. Record model/version and outputs. Gemini and ChatGPT adjudicate discrepancies with original Tamil textbook evidence.
5. Run read-only inventory of the 62 Mensuration exercise records plus nine concept lessons, across questions, options, steps, final answers and explanatory fields. Preserve source questions, flag missing/English-only Tamil, language leakage, quantities, units, symbol/term drift and meaning. Do not count 71 records as 71 certified translations: some are multi-field, some may lack Tamil. Independently verify inventory on the current main branch before reporting.
6. Do not enable any production quality gate until the held-out evidence is reviewed. Proposed threshold: no missed critical errors on the reviewed benchmark, >=90% precision on critical flags; always report denominator and uncertainty. Even passing this pilot is not an editorial certification.

No model inference or external API is executed in this initial run. No new paid service required.
