# Scheduled execution diagnostics and repair

## Verified on 10 November 2026

This repair concerns execution tooling only. No curriculum records, coverage
counts, historical grade branches, schedule rules, or free-sentinel SHA changed.
The existing Grade 11 draft PR #40 and Grade 12 draft PR #38 remain unmerged.

The current managed cloud shell initially failed local GitHub DNS lookups and
could not connect to its inherited HTTP proxy from the command sandbox.
The **same read-only requests outside that sandbox**, using the inherited proxy
and normal TLS verification, returned HTTP 200 from github.com and
api.github.com. `gh api user` authenticated as `vigneswaranmba20-afk`;
`git ls-remote` read main and the lease refs. An authenticated Grade 11
lease claim succeeded, an incorrect owner release was rejected, and release of
the exact saved owner returned the ref to the immutable free sentinel.
This establishes the working route in the repair session. It does not prove
which capabilities a future scheduled invocation receives.

## GitHub preflight before production

1. Inspect the actual scheduled invocation's environment status and tools. Use
   inherited proxy variables, credential bindings and CA trust. Local DNS
   failure alone does not establish failure of proxied HTTPS.
2. Probe `https://github.com/vigneswaranmba20-afk/Triggle` and
   `https://api.github.com/repos/vigneswaranmba20-afk/Triggle` with normal curl.
   If the command sandbox cannot connect to the inherited proxy, retry the
   **same read-only command** with the execution tool's approved
   `sandbox_permissions: require_escalated` route when available. This does not
   disable the cloud proxy or destination policy. Do not edit resolv.conf,
   hard-code GitHub IPs, unset the proxy, disable TLS verification, or copy tokens.
3. In an isolated current-main checkout, run:

   ```sh
   node site/tools/bulk/execution_preflight.cjs --grade 11
   ```

   Use 12 for Grade 12. The command writes nothing. It requires a credential-free
   Triggle HTTPS origin, authenticated GitHub identity and repository push
   permission, exact Git/API agreement on main and both relevant lease refs,
   and a remote sentinel read pinned to that main SHA matching the local marker.
   Missing, duplicate, malformed or mismatched refs fail closed. Held refs give
   `ready: false` and exit 2; do not reset them. A free observation is not ownership.
4. Only then use the existing `curriculum_bulk.cjs acquire-lease` command and
   save its returned owner receipt. Authenticated push and exact owner readback
   are mandatory. On release, require the exact saved owner and read back the
   free sentinel before discarding local evidence. The engine now performs both
   post-push readbacks. An uncertain readback retains the receipt for inspection.
5. If local Git remains unavailable but connected GitHub actions work, follow
   [CONNECTOR_EXECUTION.md](CONNECTOR_EXECUTION.md) with guarded expected-SHA CAS
   and readbacks. Read access alone is not write authorization or ownership.
   Missing guarded actions block production; never use an unguarded ref update.

Do not change existing schedules, claim another run's lease, reset historical
branches or create a replacement automation. Repeat preflight in each scheduled
invocation. Do not describe a saved prompt as provisioned infrastructure.

## Grade 12 original PDF inspection

Search the owner's connected Drive first. Metadata search succeeds for all four
Grade 12 PDFs. For the earliest Chapter 1 work, the following Volume 1 originals
were downloaded through the authenticated Drive connector and materialized from
its returned `sediment://` file IDs. Both file digests matched the existing
2025 upload manifest:

| Medium | Drive ID | Bytes | SHA-256 | PDF pages |
| --- | --- | ---: | --- | ---: |
| English Vol. 1 | `1_auJ33Wb1pI2_DxahdqJ1poiRUh6hqvm` | 26639753 | `d930d0c7d4ca52ebdbceeeca3e2f11e372b0874024f69691b63a639d067feb3a` | 304 |
| Tamil Vol. 1 | `1fzvsKbCtL8QoqXO7bO-VzcPEez5L4Q2c` | 28427958 | `2aed3006325727da9cb9be4eaadb76d89586b71677200652c8c95b4ad66845e8` | 336 |

The imprints on PDF page 2 in both books were visually inspected: first edition
2019; revised editions include 2025. English PDF page 23 / printed page 15 and
Tamil PDF page 24 / printed page 16 were visually inspected as original Exercise
1.1 question pages, including Q1(i)'s matrix. These are question pages, not an
answer appendix. This source-access check does not certify PR #38, full exercise
coverage, Tamil editorial accuracy or 2026–27 edition equivalence.

In each new invocation, read/reuse Drive metadata to establish `application/pdf`,
then call Drive `fetch(url=..., download_raw_file=true, include_base64=false)`.
Materialize the returned top-level `file_uri.file_id` with the Sediment download
tool, removing the `sediment://` prefix. Do not pass a Drive ID to that tool.
Do not request inline base64, scrape Drive thumbnails, use extracted answer text
as original questions, or reuse an expiring bearer download URL in a prompt.
Reacquire raw bytes when the local file is absent. Connected PDFs are not mounted
automatically, and they must stay outside the public repository.

With Python 3 and Poppler (`pdfinfo`, `pdftoppm`), render source images:

```sh
python3 tools/inspect_textbook_pdf.py \
  --pdf /tmp/grade12-en-v1.pdf \
  --sha256 d930d0c7d4ca52ebdbceeeca3e2f11e372b0874024f69691b63a639d067feb3a \
  --pages 2,23,24 --output /tmp/grade12-en-v1-pages \
  --drive-id 1_auJ33Wb1pI2_DxahdqJ1poiRUh6hqvm
```

For Tamil use its digest and Drive ID above, pages `2,24,25`, and a separate new
private output directory. The tool rejects wrong digests, invalid/out-of-range
pages, existing output directories and destinations inside the repository.
Receipts record source/page-image hashes and **leave visualChecked false**.
Open images with the environment's image viewer and record printed-page and
visual-review evidence separately. Rendering does not certify source fidelity.
Do not commit PDFs or scans to GitHub. Volume 2 bytes/pages were not inspected
in this repair; fetch the appropriate originals when work reaches that volume.

## Verification and next run

The local preflight tests cover absent/malformed/duplicate/moved refs, Git/API
disagreement, sentinel disagreement, unavailable authentication, denied write
permission and held leases. Lease fixtures use two isolated clones of a
synthetic bare repository, including server-side changes after successful claim
and release pushes; uncertain readbacks retain ownership evidence and never
reset the foreign ref. Existing legacy and persistent-sentinel tests remain.

Report the repair results before authoring resumes. Each future Grade 11/12
run must repeat its live preflight, obtain its own lease and inspect its actual
source pages before producing curriculum. Historical drafts still require
reconciliation and all existing source, math, browser, CI and deployment gates.
