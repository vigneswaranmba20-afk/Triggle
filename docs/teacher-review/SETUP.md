# Triggle private Teacher Review — setup and safety

This feature has a standalone page at site/teacher-review.html and **does not alter student lessons**. Its Google sign-in UI and Firestore review event storage are built, but **do not treat it as deployed or working** until the owner completes Firebase setup and the deny-by-default rules are deployed and tested. The default configuration is null, so the review UI fails closed. It is online-only; Triggle students remain free and login-free.

## Keep the teacher identity private

The designated teacher's Gmail address was supplied to the Triggle owner in a private conversation. **Never add that email address to this public repository, issue tracker, client-side JavaScript, HTML, committed configuration, or CI logs.** Never ask for a password or one-time code. Authorize the Firebase user by a private server-issued **custom claim** after the teacher signs in with Google.

## One-time owner setup

1. Create a **dedicated Firebase project** for Teacher Review. Enable Authentication > Google provider and create a Cloud Firestore database. Use a separate project from any future student service to prevent unrelated data access.
2. Register a Firebase Web App. In Authentication > Settings > Authorized domains, authorize vigneswaranmba20-afk.github.io (and localhost only if needed for local testing). Firebase Google sign-in on a GitHub Pages URL requires its actual host in authorized domains.
3. Deploy teacher-review/firestore.rules using Firebase CLI from the teacher-review directory. The teacher-review/firebase.json file points to those rules. For example, after authenticating with Firebase CLI and choosing the correct project:

       cd teacher-review
       firebase deploy --only firestore:rules --project YOUR_PROJECT_ID

   The rules only grant read and append-only create access to a signed-in Google identity with the triggleTeacher custom claim. All other Firestore paths deny access. Never enable broad rules such as allow read, write: if true.
4. In site/data/teacher-review-config.js, change only firebaseConfig = null to the Firebase Web App's **public web configuration object** (apiKey, authDomain, projectId, appId and any supplied fields). Firebase Web App configuration is *not* an administrator credential; never include an Admin SDK service key, OAuth client secret, GitHub token or any account password. Commit the config only after the corresponding Firestore rules have been deployed and tested.
5. Have the teacher open site/teacher-review.html on the live host and use **Sign in with Google** once. Before authorization this creates an ordinary Firebase Authentication identity but is denied access to all review data. In Firebase Console > Authentication > Users, verify the intended Google identity is listed.
6. Grant this one user the teacher role **from a private admin environment**, using Google Cloud application default credentials with Firebase Authentication admin privileges. This script must not run from a browser or public CI:

       npm install --no-save firebase-admin
       export GOOGLE_CLOUD_PROJECT=YOUR_PROJECT_ID
       export TRIGGLE_REVIEWER_EMAIL='teacher-account-here'
       export TRIGGLE_APPROVE_TEACHER=YES
       node teacher-review/grant-reviewer.mjs

   Replace the placeholder with the verified teacher account privately. Avoid exposing the email or credentials in screenshots, shared terminals or logs. The script refuses unverified/non-Google accounts and preserves other existing claims. Clear sensitive shell environment variables after use. Only the authorized project owner should run this.
7. Ask the teacher to sign out/in to refresh the new ID token. Verify that **only** this account can read and create reviews.

## Required verification before publishing

- Anonymous visitor: no private review history; no create privilege.
- An unrelated Google account: permission denied both in the UI and directly via Firestore SDK.
- Approved Google account: can view questions, add an approval or correction request, and see its immutable history.
- Anonymous/unapproved clients cannot forge reviewerUid, delete/edit a review, create a teacher role, or read any other collection.
- Test on mobile, including Google sign-in popup behavior, lesson navigation, Tamil text, sign out, offline/reconnect notices and keyboard readability.
- Use the Firebase Local Emulator Suite and an actual staging project to verify the **deployed** rules. Static code checks alone are not security testing.
- Preserve all Grade 9–12 content, original IDs and the existing hourly grade schedules. Run required repository test suites/CI before merging.

## Review workflow

1. Teacher selects Grade -> Chapter -> Exercise -> Question.
2. The page displays the currently published English question, worked steps, source note and final answer, with an optional embedded student view.
3. Teacher submits approved, needs-correction or pending with an optional note.
4. A timestamped, append-only private Firestore event records the question ID, source record SHA-256, teacher UID and decision. Revisions remain auditable. This is **teacher feedback**, not proof of textbook or Tamil editorial certification.

**Important:** The current UI only saves private review events. It **does not yet create GitHub issues, notify Codex, or auto-correct an exercise.** That needs a server-authorized integration using a GitHub App or secure function. Never embed a GitHub token in the public web page. The four existing hourly ChatGPT tasks use site/tools/curriculum_bulk.cjs, but must not be pointed at a nonexistent feedback queue.

Follow-up implementation is tracked at [GitHub Issue #121](https://github.com/vigneswaranmba20-afk/Triggle/issues/121). Once the queue is implemented, each grade run may prioritize feedback, use the engine's guarded corrections, run verification and release gates, and mark fixed tasks as pending teacher re-review. No guarantee of correction in the *immediately next* scheduled execution if verification, credentials or source access fail.
