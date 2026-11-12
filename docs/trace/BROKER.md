# Offline routing broker

`site/tools/bulk/trace_broker.cjs` is a development/CI module, never imported by the student app. It ships only `offline-mock-v1`, a local synthetic classification fixture. There are **no OpenAI, Gemini, Anthropic or other live adapters**, endpoint URLs, model IDs, provider prices, batch submissions or network calls. The environment reported no configured secrets. No provider credentials were read for this run; tests use clearly synthetic strings.

The programmatic `Broker` accepts trusted adapter implementations; it validates capability, quality, locality, credential availability, spending authority, task limits and independent run/day/provider ceilings before invoking a non-local adapter. Local adapters have zero cost. This is an interface with simulated contract tests, not a claim that a real provider connection works.

Each task declares `capability`, `sensitivity`, `quality_level`, `latency_sla` (milliseconds), `budget` (USD), `input`, canonical `input_hash`, `schema`, `max_output_tokens`, and `retry_policy` (`max_retries`, `max_delay_ms`). An optional `idempotency_key` is persistently bound to its request fingerprint. Input JSON is limited to 64 KiB and output JSON to 64 KiB. Private inputs cannot reach non-local adapters. No textbook is bulk-uploaded.

Only a strict JSON-schema subset is supported: object/array/string/number/integer/boolean/null, explicit required fields, `additionalProperties:false`, enums, bounded strings and bounded arrays. Unknown schema keywords fail closed. JSON schemas are not proof of mathematical truth. Every successful result is `UNTRUSTED_CANDIDATE`.

Routing prefers compatible local rules/mock adapters and validated cached results, then the lowest declared maximum cost among compatible adapters. Open circuits exclude fresh calls; valid cached results remain usable. There is no automatic expensive second-model vote. An independent proof/source/editorial pipeline must review outputs.

Concurrency is bounded for direct calls and batch calls, queues are bounded, duplicate pending work shares one promise, and cache keys include capability, quality, sensitivity, schema, token limit and adapter version. Cached outputs are revalidated and checksummed. A mismatched idempotency replay fails. State lives in a private directory outside the public site. Synchronous accounting writes use the existing integration lock and atomic JSON replacement. Inputs and exception messages are not written to traces; known credential values in results cause rejection. Traces contain hashes, adapter IDs, fixed error codes, attempts and reserved costs.

Each attempted billable request reserves its adapter's full declared worst-case cost **before** invocation, in integer microdollars, against task, run, day and provider ceilings. Failed/ambiguous requests retain their reservations. This deliberately conservative accounting is an upper-bound ledger, not an invoice. Corrupt accounting fails closed. A timeout or cancellation leaves an interrupted checkpoint; an uncached interrupted request requires review before replay. No retry starts while cancellation of a timed-out request is uncertain.

429 responses support numeric and HTTP-date `Retry-After`; delays exceeding policy stop the task. Other retryable failures use bounded exponential backoff; circuits stop repeated failures. The callback receives an abort signal, stable idempotency key and token ceiling. An adapter must actually honor these controls, accurately bound request cost and account for input tokens before any connection is approved. An adapter ignoring abort cannot be forcibly stopped by JavaScript; the broker quarantines that request instead of retrying it.

Manual zero-spend run:

```bash
node site/tools/bulk/trace_broker.cjs --offline --dry-run \
  --budget-usd 0 --max-items 1 \
  --state-dir /tmp/triggle-trace-private \
  --report /tmp/triggle-broker.json
```

Before adding a real adapter: verify current official endpoint/model/schema/pricing/terms and excerpt permissions; bind only the approved environment-variable name; implement endpoint-specific hard limits and cancellation; verify mock failure cases; obtain explicit spending authority and positive run/day/provider ceilings; perform a bounded one-item connection test. Never put secrets in configuration, repository artifacts or Pages. The shipped CLI rejects nonzero budgets and cannot initiate a live test.
