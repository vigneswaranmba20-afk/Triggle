# Private Triggle Teacher Dashboard

Teacher URL: https://vigneswaranmba20-afk.github.io/Triggle/site/teacher-review.html

Student lessons and the public Owner Dashboard need no login. Teacher access uses Google Firebase Authentication plus an owner-created `teacherAccess/{FirebaseAuthUID}` document containing the string `role: reviewer`. Firestore rules enforce access; the UI does not grant permission. Firebase browser app identifiers are public metadata, not privileged credentials. Never publish service keys, reviewer emails, feedback or exports.

## Production setup / update

1. In Firebase project `triggle-teacher-review`, keep Google Authentication enabled and authorize `vigneswaranmba20-afk.github.io`. Use production-mode Firestore.
2. **Publish the reviewed `teacher-review/firestore.rules` before enabling correction tracking.** Existing production review rules support the original inbox and review writes, but deny the new correction collection. Until publication, the inbox labels correction tracking unavailable and keeps feedback/handoff usable. This development session has no authorized Firebase CLI account; production rule publication must be completed by the owner or an authorized deployment environment.
3. In Firebase Console → Firestore → Rules, replace the rules with the reviewed repository file and Publish. Alternatively, in an already authorized local environment run:

   ```sh
   npx firebase deploy --only firestore:rules --config teacher-review/firebase.json --project triggle-teacher-review
   ```

4. To authorize a teacher, have them sign in, then confirm their identity privately in Firebase Console → Authentication → Users. Copy the **Firebase UID** and create `teacherAccess/{UID}` with `role: reviewer` in the privileged Firebase Console. The browser cannot create/edit/list/delete grants. Do not publish the UID or email in an issue.
5. Verify anonymous denial, unrelated-account denial, intended-account access, review submission, history, sign-out, reload and revocation. Delete the grant to revoke access; history remains immutable.

Never use test mode or allow-all rules. No new backend credentials are required in the browser. No recurring development automation is used or changed.

## Private feedback and correction lifecycle

The authenticated inbox reads append-only `teacherReviewEvents`, newest first, 50 events per page with Load more. Filters apply to loaded events. Notes accept Tamil/English and a correction category. Reviews retain the stable question ID, exact content SHA-256, authorized UID and server timestamp. A past approval applies to its recorded version, not any later code.

Select feedback and prepare/copy/export a **private manual Codex correction request**. Exported remarks are confidential; use only an authorized workspace and never post them to public GitHub Issues, public status JSON, URLs, logs or screenshots. The public Owner Dashboard cannot fetch this data. Sign-out/session loss clears loaded inbox/handoff fields. Text intentionally copied to the operating-system clipboard or downloaded by the authorized user remains under that user's control.

New rules add `teacherCorrectionCases/{reviewEventId}` and its immutable `history/{revision}` subcollection. Start from a real Needs Correction event. Each transition atomically updates the projection and creates its matching history revision:

`Reported → In Progress → Fixed → Deployed → Awaiting Teacher Re-review → Approved`

Blocked is supported from active states and can return to In Progress. Fixed and Awaiting Teacher Re-review may return to In Progress. A fresh correction report creates a new case; approved histories are never rewritten.

Each transition needs explicit evidence. Enter the actual corrected record SHA-256 at Fixed; later states must retain it. Deployed requires a GitHub/Pages evidence URL and is an authorized manual attestation, not automated deployment proof. Record the exact commit and actual live verification. Neither merge nor deploy approves anything.

To approve a correction: first set Awaiting Teacher Re-review; open the corrected live question; save a new **Approve** review for its current hash; refresh the inbox; then choose Approved with that fresh review event ID. The rules require the same stable question, grade/chapter/exercise, matching corrected hash, current authorized reviewer and a timestamp after re-review began. Old/wrong-hash approvals cannot close a case. All review/history updates and deletions are denied.

## Reliability and test evidence

An inline controller runs independently of Firebase/module imports, uses a configurable 12-second watchdog, and exposes Starting, Loading authentication, Ready to sign in, Checking authorization, Authorized, Unauthorized, Network unavailable and Recoverable error states. SDK/module/network failure shows English/Tamil recovery text and Retry. Critical inline CSS keeps sign-in/error content readable if external CSS fails. Retry reloads with a fresh URL; stale callbacks cannot authorize after timeout. Permission is always rechecked from the Firestore server. Teacher/status resources bypass the student worker cache and student-shell fallback. Browser translation is not established as a historical cause.

Run:

```sh
npm test
npm run test:browser
npm run test:security
npm run test:webkit
```

The security suite launches a local **demo** Firestore emulator, never production, and tests real rules for grants, unauthorized/revoked denial, append-only reviews, atomic correction history, invalid transitions, blocked recovery, evidence and fresh hash-specific re-approval. CI runs this suite. Browser authentication tests use a labelled controlled SDK and do not establish live Google/Firebase authorization. Playwright Chromium and WebKit cover both dashboards at 320/390/430px. Physical Android Chrome and iOS Safari plus production authorized/unapproved account checks remain owner-assisted acceptance gates.

PR #122 and issue #121 are historical context. Their older recurring-automation proposals are superseded by the owner's manual-only instructions.
