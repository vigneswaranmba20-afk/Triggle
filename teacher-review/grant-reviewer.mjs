// One-time owner-only operation. Never run this in a browser or on GitHub Pages.
// Credentials must come from a properly authorized private environment.
import { applicationDefault, initializeApp } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';

const email = process.env.TRIGGLE_REVIEWER_EMAIL?.trim();
const projectId = process.env.GOOGLE_CLOUD_PROJECT?.trim();
const confirmation = process.env.TRIGGLE_APPROVE_TEACHER;
if (!email || !projectId || confirmation !== 'YES') {
  throw new Error('Set TRIGGLE_REVIEWER_EMAIL, GOOGLE_CLOUD_PROJECT and TRIGGLE_APPROVE_TEACHER=YES in the owner-only environment.');
}
initializeApp({ credential: applicationDefault(), projectId });
const auth = getAuth();
const user = await auth.getUserByEmail(email);
if (!user.emailVerified || !user.providerData.some(provider => provider.providerId === 'google.com')) {
  throw new Error('Refusing to grant reviewer permissions: the account must have verified Google sign-in.');
}
await auth.setCustomUserClaims(user.uid, { ...(user.customClaims || {}), triggleTeacher: true });
console.log('Teacher review role granted to the verified Google identity. Ask the teacher to sign out and sign in again.');
