# TRACE Dual Intelligence — low-cost pilot (17 November 2026)

## Scope and deployment

This pilot adds optional server-side adapters for OpenAI and Gemini independent mathematical reviews, and extends the existing TRACE broker with an optional calendar-month reserved-cost cap.

**Safe default: all examples and CI tests are offline.** No API keys, paid usage, subscription login, Google quota changes, Cloudflare upload, or live website modification are needed for this pilot. No student-facing AI endpoint is exposed. Provider output cannot mark textbook exercises source-verified, mathematically certified, or publish-ready.

Files:
- site/tools/bulk/trace_dual_ai.cjs — dual-model adapters and orchestration
- site/tools/bulk/trace_dual_cli.cjs — local command-line entry point
- site/tools/bulk/test_trace_dual_ai.cjs — offline contract tests
- site/tools/bulk/trace_broker.cjs — existing budget broker with month cap

## Design

1. **Source first.** Never submit textbook content unless it has an independently verified source record for the actual textbook edition and page images. The caller flag sourceVerified=true is not proof of source verification. This pilot does not fetch or certify books. Keep private student data out of model requests.
2. **Local-first.** Easy and medium items are skipped. Only explicitly flagged difficult items can go to the dual-model review.
3. **Independent candidates.** OpenAI Responses API uses gpt-6-luna and Gemini generateContent uses gemini-3.8-flash. Both return strict JSON with issues and a review verdict. Disagreement or provider failure requires review; agreement alone never certifies content.
4. **Spending control.** Each provider attempt reserves $0.025. The pilot reserves at most $0.05 per run, $0.25 per UTC day and $5 per UTC month. These are **internal worst-case reservations** rather than provider billing limits or guarantees. Input size and output tokens are bounded. No provider retry occurs automatically.
5. **Rate limits.** HTTP 429 leaves the review incomplete instead of launching repeated requests. Do not rotate keys to evade provider limits.
6. **Never auto-release.** Every output has releaseApproved=false. Existing lessons, website and media publishing workflows are untouched.

## Android Termux demo — no paid calls

From an existing repository clone in Termux:

~~~sh
cd ~/Triggle
git fetch origin
git switch feature/trace-dual-intelligence-pilot-20261117
node site/tools/bulk/test_trace_dual_ai.cjs
node site/tools/bulk/trace_dual_cli.cjs --demo
~~~

The demo uses a synthetic 1+2+4+8 fixture, not a textbook question. Expected result: SYNTHETIC_REVIEW_ONLY and $0 reserved. Node.js 22 is suitable.

## Optional live pilot — requires explicit owner setup

1. Check API credits benefit under ChatGPT Settings → Billing. Eligible Pro subscriptions may provide API credits, but the subscription itself does not grant unlimited API usage; API billing remains separate.
2. Check project-level API quotas in Google AI Studio, independent from the consumer Google AI Pro subscription.
3. Set provider-side spending controls independently. TRACE's ledger is not a substitute for platform billing caps.
4. Create a small PRIVATE input JSON file with id, sourceRef, sourceVerified, difficulty, problem and solution. Verify the official EN/TA textbook images before marking sourceVerified=true. Never include student names or personal data.
5. Set OPENAI_API_KEY and GEMINI_API_KEY securely in environment variables (never in chats, commits, public Pages or screenshots).
6. Use a persistent private accounting directory across attempts. Ephemeral GitHub runners need a durable external ledger before any paid schedule.

The following is deliberately opt-in, not automatically executed:

~~~sh
export TRACE_DUAL_AI_SPEND_APPROVED=YES
mkdir -p "$HOME/.local/share/trace-dual"
chmod 700 "$HOME/.local/share/trace-dual"
node site/tools/bulk/trace_dual_cli.cjs \
  --live --authorize-spend \
  --input "$HOME/trace-reviewed-item.json" \
  --state-dir "$HOME/.local/share/trace-dual"
~~~

The live API contract is tested with mocked HTTP responses only. Verify model availability and billing rules before sending real work.

## Rollout sequence

- **A. Foundation** (this branch): schema, dual adapters, monthly reservation cap, mock tests, zero-spend demo.
- **B. Pilot**: independently review ten real, already source-verified difficult items, quantify disagreements, true billing cost and time saved. Requires explicit API authorization and provider quotas.
- **C. Video Factory**: keep Fola narration in its separate review branch. Bring its persistent per-attempt audio cache and quota-aware dispatch through its own quality-gated PR. No automatic media publishing.

## Validation

~~~sh
node site/tools/bulk/test_trace_broker.cjs
node site/tools/bulk/test_trace_dual_ai.cjs
node site/tools/bulk/trace_dual_cli.cjs --demo
npm run test:trace
npm test
~~~

Passing offline tests does not mean real Gemini quotas, API credit eligibility, Fola narration completion or actual production cost is verified.


## Phase B evidence gate (17 November)

Before any **live** OpenAI/Gemini review, TRACE requires source metadata for the actual Grade 9–12 English **and** Tamil textbook pages. The `sourceVerified: true` flag alone no longer passes.

The private input JSON must also contain a `sourceEvidence` object, structured as follows (the placeholder hashes below are **not real evidence**):

~~~json
{
  "sourceEvidence": {
    "edition": "2025",
    "pages": {
      "en": {
        "bookSha256": "ACTUAL_64_CHAR_HASH_FROM_REGISTRY",
        "imageSha256": "ACTUAL_64_CHAR_IMAGE_DIGEST",
        "pdfPage": 30,
        "printedPage": 25,
        "visualChecked": true
      },
      "ta": {
        "bookSha256": "ACTUAL_64_CHAR_HASH_FROM_REGISTRY",
        "imageSha256": "ACTUAL_64_CHAR_IMAGE_DIGEST",
        "pdfPage": 30,
        "printedPage": 25,
        "visualChecked": true
      }
    }
  }
}
~~~

**Limitation:** This code validates only registry book identity, reported page bounds, supplied hashes and flags. It does **not** independently open the PDF or prove that the image hash corresponds to a genuine page. Never mark `visualChecked` true without an actual source-page inspection. Page-specific question matching and English/Tamil fidelity still require Triggle's existing source review gate. No textbook certification follows merely from this evidence structure.

Added offline negative tests for swapped books, impossible pages, missing visual inspection, unrecognized image hashes, mismatched grades and provider refusals. No paid API requests occur in these tests.

API references: [GPT-6 Luna](https://developers.openai.com/api/docs/models/gpt-6-luna), [Gemini 3.8 Flash](https://ai.google.dev/gemini-api/docs/models/gemini-3.8-flash).


## Phase C: repeatable, $0 offline pilot rehearsal

The new command `npm run trace:dual-rehearsal` executes 12 **synthetic** Grade 10 geometric-series scenarios:

- Ten deliberately correct finite sums, including ratios 0, 1, negative ratios and a one-term boundary case.
- Two deliberately incorrect totals, which are rejected **before** OpenAI or Gemini is called.
- Twenty simulated reviewer responses for the ten correct totals. These are fixed offline mocks, **not** genuine OpenAI or Gemini model reasoning.
- All results explicitly carry `releaseApproved:false` and `externalApiCostUsd:0`.

Use `node site/tools/bulk/trace_dual_rehearsal.cjs --output /tmp/trace-dual-pilot.json` to save a local JSON report. A GitHub Actions workflow named **TRACE Dual Intelligence — offline pilot rehearsal** also uploads a review artifact, with no credentials, billable calls or publishing actions.

The supported mathematical oracle uses BigInt integer arithmetic for finite geometric series and checks the telescoping identity `(r-1)S = a(r^n-1)`. This verifies the stated **numeric total** for a known structured mathematical test fixture. It does not prove every written explanation step is valid, and it does not inspect copyrighted textbook PDF images.

This is a reproducible system rehearsal, **not a real 10-exercise textbook pilot**. Live model calls remain explicitly gated by verified API permissions, real textbook evidence and user-approved spending. Existing hourly curricula and Fola video workflows remain unchanged.

Android/Termux commands after the branch is merged:

~~~sh
cd ~/Triggle
git pull --ff-only
npm run trace:dual-rehearsal
~~~
