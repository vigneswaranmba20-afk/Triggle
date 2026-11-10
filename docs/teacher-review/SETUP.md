# Private Triggle Teacher Review — mobile-first setup

This is an isolated feature draft at site/teacher-review.html; it is **not published** on the student app until deployed and tested. Public grades 9–12 still need no login. Teacher decisions are stored as append-only Firestore events.

The reviewer Gmail address is **never** hard-coded into this public repository. An owner confirms the correct signed-in Google identity in Firebase Authentication and grants access to its **Firebase Auth UID** through the Firestore Console. No custom claims, Admin SDK, administrator scripts, passwords, private keys or paid Cloud Functions are required for this method.

## Owner setup, from a phone

1. Firebase project triggle-teacher-review: enable Authentication > Google and authorize vigneswaranmba20-afk.github.io in Authentication > Settings > Authorized domains. Create Firestore in locked/production mode.
2. In Firestore > Rules, publish the version committed in teacher-review/firestore.rules. **IMPORTANT:** The earlier custom-claim rules are not compatible with this mobile-friendly UID method; they must be replaced and published before allowing the designated teacher to review anything. Never use test mode or allow-all rules. Until the owner creates an authorized UID document, nobody can access private reviews.
3. The owner must finish verifying CI and the login UI before merging PR #122. Only after the draft is deployed should the intended teacher open the teacher-review.html URL and sign in with the approved Google account. An initial "not authorized" message is expected.
4. Firebase Console > Authentication > Users: locate the newly signed-in user and **confirm the email address** belongs to the intended teacher. Copy only the Firebase UID (not a password or email) for the matching Google account.
5. Firebase Console > Firestore Database > Data > Start collection. Set collection ID to teacherAccess, document ID exactly to the copied Firebase UID, and create one string field named role with value reviewer. Save. This document is written by the owner in the Firebase Console (privileged control plane), not through the public app.
6. The teacher signs out and signs back in, or reloads teacher-review.html, then sees the dashboard. Check student/anonymous and an unrelated Google account cannot access or write reviews.

**Revocation:** Delete the teacherAccess/{UID} document in the Firestore Console. Review history remains. Existing roles must not be duplicated without the owner's authorization.

## Why it is secure

The security rules enforce authenticated Google sign-in, require an owner-created teacherAccess/{UID} document with role reviewer, allow a user to read only their own role record, and deny all client creation, update, listing or deletion of roles. Review event reads/creates are allowed only to approved teacher accounts. Review updates/deletes are denied. Every write requires reviewed structure, UID matching and a server timestamp. All other database paths are denied.

Firebase console project administrators can manage role documents. Do not give untrusted people Firebase editor access.

## Test gates before deploying

- Unauthorized/anonymous Firebase clients cannot read or create review events or access another person's role record.
- Unapproved Google accounts can read only their own nonexistent role record, but cannot submit or read reviews.
- Teacher's Google UID is authorized only after the owner verified the identity; the authorized teacher can submit and read review events.
- Firestore roles cannot be written by web clients, and existing reviews cannot be modified or deleted.
- Mobile Google sign-in, review navigation, English/Tamil rendering, history, signout, network interruptions, 320/390/1280px and accessibility are tested against staging; required repository CI, npm test and npm run test:browser pass.
- Reconcile the draft branch with latest main and don't interfere with the four existing grade schedules.
- Never publish until the security rules used by the app have been deployed and tested. The Firebase web config is public metadata, not a server secret.

## Correction automation remains a separate milestone

Teacher events currently record approved, needs-correction and pending decisions privately. There is **no** connected teacher feedback-to-Codex correction queue yet. A server-authorized integration needs to sync approved correction requests to a grade-specific queue (e.g. GitHub issues) without placing GitHub credentials in the browser. Only after that integration has been tested should the existing Grade 9/10/11/12 task prompts be updated and read back to prioritize teacher corrections. Every repair should use guarded bulk-engine correction, source checks, independent mathematics, CI and live validation. Failed work is blocked, not automatically published. The teacher re-approves a fixed exercise.

See GitHub issue #121 and draft PR #122.
