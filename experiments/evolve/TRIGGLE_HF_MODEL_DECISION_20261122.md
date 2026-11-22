# Triggle × Hugging Face: model and sandbox architecture decision

**Research date:** 2026-11-22. **Live discovery evidence:** GitHub Actions [run 45045023717](https://github.com/vigneswaranmba20-afk/Triggle/actions/runs/45045023717). **Status:** experimental proposal, not a claim that any model has repaired Triggle.

## Coverage and limits

- Enumerated all 158 currently listed chat models from the public router and 628 live model-provider combinations, at scan time.
- Sampled the first 250 top-downloads Hub models in each of 7 tasks: generation, image-text-to-text, translation, image-to-text, text-to-speech, similarity and automatic speech recognition = 1,750 listings. Verified 17 targeted official model cards.
- 2 static scanner tests passed. Zero inference calls, zero chargeable work, zero production writes.
- Not an exhaustive enumeration of every downloadable Hugging Face repository; Hub has many task-specific models, variants and forks, and hosted availability can change. Popularity and vendor benchmarks are not Triggle accuracy results.

## Pilot candidates and observed hosted price

Example usage is 3,000 input tokens and 1,500 output tokens, USD per **one** inference, from the provider catalog at scan time, before possible overhead. Costs are NOT an account-level spend limit and availability/prices may change.

| Role | Model/provider | Example charge | Licensing status / verification |
|---|---|---:|---|
| Repair code challenger | Qwen/Qwen3-Coder-30B-A3B-Instruct via amazon-bedrock | $0.00135 | Official model card says Apache-2.0; router live |
| Mathematical/reasoning challenger | deepseek-ai/DeepSeek-V3.2 via deepinfra | $0.00135 | MIT; router live |
| Cheap alternative/baseline | openai/gpt-oss-20b via akashml | $0.000189 | Apache-2.0; router live |
| Independent math baseline | Qwen/Qwen3-32B via deepinfra | $0.00066 | Apache-2.0; router live |
| Diagram screenshot reviewer | Qwen/Qwen3-VL-8B-Instruct via parasail | $0.001875 before image-token effects | Apache-2.0; router live |

**Not all listed models are chat models / directly hosted:**

| Specialist role | Repository | License/gating as verified | Why test |
|---|---|---|---|
| 2025 textbook page extraction, equations/tables | PaddlePaddle/PaddleOCR-VL-1.6 | Apache-2.0, ungated | Test scan transcription; compare independently with source pages; not hosted through chat router |
| English → Tamil draft translation | ai4bharat/indictrans2-en-indic-dist-200M | MIT, gated automatic approval | Might reduce Tamil drafting effort, but source fidelity and human Tamil review remain mandatory; requires suitable compute |
| Multilingual semantic retrieval / duplicate detection | BAAI/bge-m3 | MIT, ungated | Candidate for efficient cross-chapter source lookup and audit deduplication; requires serving or batch processing |
| Alternative embeddings | Qwen/Qwen3-Embedding-0.6B | Apache-2.0, ungated | Compare retrieval hit quality and index cost |
| English TTS for TRACE experiments | hexgrad/Kokoro-82M | Apache-2.0, ungated | Compare against currently preferred voice only after human listening tests, no automatic replacement |

## Usefulness gates (proposed, not yet measured)

1. **No duplicate work:** Reconcile each Neon finding with latest main and merged PRs before prompting a model. AUD13-02 was already merged in PR #341 when audited.
2. **Repair trial:** On 10-20 independently selected, still-open Neon issues, send narrow source excerpts with expected behavior. Candidate must return structured JSON or a unified diff, never execute commands or change source directly.
3. **Safety and quality:** Validate exact target IDs, original prompts, English and Tamil constraints, preservation manifests, 2025 textbook source, mathematics oracle, test changes, mobile rendering, and P0 regressions.
4. **Compare:** Record correct fix rate, partial/incorrect fix rate, hallucinated source references, clarity for beginners, latency, retries, actual token spend and total human review time.
5. **Stop rule:** Fewer passing patches or more supervision than baseline means model rejected for the job; automatically reject all unverified model changes.

## Security — chosen design

- First stage: Hugging Face account and Hub repository read/write permissions NOT required. Router metadata and model cards are public. **Keep Hugging Face repository write OFF.**
- Execution: GitHub Actions isolated branch `experiment/evolve-shadow-v1-20261122`, `contents: read`, temporary files and artifacts. Never give model GitHub token, repository credentials or deployment credentials. User prompts and model output are untrusted, never run as shell commands.
- Preferred identity for actual inference: Hugging Face **Account Authentication → CI/CD Access**, create **GitHub Actions identity** with exact GitHub repository + branch + workflow claim and tick Allow Inference Providers calls. GitHub job needs only `id-token: write` to obtain a short-lived HF inference token and `contents: read` for source. This does NOT grant GitHub source write. Documented at https://huggingface.co/docs/hub/trusted-publishers . Alternatively use a fine-grained HF token in a restricted GitHub environment secret, but a long-lived secret is less desirable.
- Commercial execution: User must explicitly authorize any billable inference. HF Free includes zero monthly inference credits as of research date. A max-output-token limit is not a hard USD cap.
- Release: ChatGPT performs PR creation/merge only following independent validation, then checks GitHub Pages & Cloudflare hashes/live visibility; zero automatic model merges.
- Keep textbook/student data to the minimum; no unreviewed copyrighted scans or any private student information passed to third-party model providers.

## Immediate order

1. Protect audit source state and reconcile historic report with current main. Create 10-item blind-evaluation set by finding category.
2. Configure short-lived CI/CD identity or restricted secret; test only 1 authorized call first.
3. Compare cheap coding vs reasoning models and choose *per task*, not a single universal model.
4. Introduce specialist Tamil/OCR/embedding/voice models in separate experiments only if measurable returns justify hosting.

## Official sources

- Hosted catalog: https://huggingface.co/docs/inference-providers/hub-api and https://huggingface.co/inference/models
- Pricing: https://huggingface.co/docs/inference-providers/pricing
- Model card API: https://huggingface.co/docs/huggingface_hub/package_reference/hf_api
- CI/CD identity: https://huggingface.co/docs/hub/trusted-publishers
- Least privilege: https://docs.github.com/en/actions/reference/security/secure-use
