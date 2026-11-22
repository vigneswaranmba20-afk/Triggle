# EVOLVE — Hugging Face / Triggle integration experiment
Status: Read-only public model discovery; no paid inference and no production deployment.

Architecture: Triggle GitHub repo -> isolated experimental branch -> public Hugging Face model catalog -> GitHub Actions artifact. Existing Triggle site, Cloudflare and Pages remain unaffected.

## What is tested
- Whether useful Qwen/Phi/Gemma/DeepSeek/Llama/Mistral models have live inference providers
- Advertised provider token prices and example USD cost of 2,000 input + 1,000 output tokens
- Correct treatment of missing rates: UNKNOWN, never free
- Zero model inference calls, zero access tokens and no Hugging Face write permissions

## Next stages (not enabled)
1. Choose 2-3 candidates by model capability, licensing and current price.
2. Run a capped, explicitly approved inference comparison on five existing Grade 10 Mensuration questions.
3. Score exact math, reasoning, teaching clarity, latency, model availability and real costs; independent tests and Gemini Neon blind review.
4. Only after successful validation consider a private Cloudflare Worker proxy and optional teacher-side AI features. Do not expose tokens in student-facing static JS. Do not upload copyrighted textbook scans or student data.

## Security gates
No automatic mirroring of full Triggle repository into Hugging Face. No direct release to main. No disabling tests. Do not place HF tokens in source, logs or screenshots. Branch-scoped GitHub Actions has only contents:read. The current inference token does not need to be shared with GitHub for stage 1.
