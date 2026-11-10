import { installTeacherInbox } from "./teacher-inbox.js?v=1";
import { firebaseConfig } from "../data/teacher-portal-config.js";
import { initializeApp, getApps, getApp } from "https://www.gstatic.com/firebasejs/13.2.0/firebase-app.js";
import {
  getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut
} from "https://www.gstatic.com/firebasejs/13.2.0/firebase-auth.js";
import {
  getFirestore, addDoc, collection, doc, getDocFromServer, getDocs, limit, query, serverTimestamp, where
} from "https://www.gstatic.com/firebasejs/13.2.0/firebase-firestore.js";

const startup = window.TriggleReviewStartup;
const $ = id => document.getElementById(id);
const views = ["unconfigured", "login", "denied", "workspace"];
let auth = null;
let db = null;
let reviewer = null;
let records = [];
let selectedRecord = null;
let currentDigest = "";
let authEpoch = 0;
let saving = false;
let unsubscribeAuth = null;
function bounded(promise) {
  let timer;
  return Promise.race([promise, new Promise((_, reject) => {
    timer = setTimeout(() => reject(new Error("Connection timed out. Select Retry to reconnect.")), startup.timeout);
  })]).finally(() => clearTimeout(timer));
}
window.addEventListener("triggle-review-unavailable", () => {
  authEpoch++; reviewer = null; selectedRecord = null; records = [];
  $("history").replaceChildren(); $("review-form").reset();
  if (unsubscribeAuth) unsubscribeAuth();
});
const reviewEvents = "teacherReviewEvents";
const inbox = installTeacherInbox(() => ({db, reviewer, bounded, active:startup.active, selectQuestion(entry) {
  const item = records.find(r=>r.id===entry.questionId);
  if (!item) { message("This reviewed record is not in the current curriculum. Preserve its history and inspect the source.", true); return; }
  $("grade-select").value=String(entry.grade); updateGrade();
  $("chapter-select").value=entry.chapter; updateChapter();
  $("exercise-select").value=entry.exercise; updateExercise();
  $("question-select").value=entry.questionId; void showSelected();
}}));
window.addEventListener("triggle-review-unavailable", () => inbox.clear());
function mathText(node, value) {
  if (window.TriggleNotation) node.innerHTML = window.TriggleNotation.render(value);
  else node.textContent = value;
}

function message(text, isError = false) {
  $("message").textContent = text;
  $("message").classList.toggle("error", isError);
}
function view(name) {
  if (!startup.active()) return;
  for (const id of views) $(id).hidden = id !== name;
  $("signout").hidden = name !== "workspace";
}
function options(id, entries, preferred) {
  const select = $(id);
  const previous = preferred || select.value;
  select.replaceChildren();
  for (const entry of entries) {
    const opt = document.createElement("option");
    opt.value = String(entry.value);
    opt.textContent = entry.label;
    select.appendChild(opt);
  }
  if (entries.some(entry => String(entry.value) === previous)) select.value = previous;
}
function uniqueSorted(values) {
  return [...new Set(values.map(String))].sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
}
// Triggle's Grade 9 textbook exercises are marked "reference" while edition
// and language verification is pending. Do not exclude them from teacher QA.
// Keep worked examples and original practice items out of exercise review.
function isReviewableExercise(item) {
  return !!(item && item.id && item.q?.en && (
    item.kind === "textbook" ||
    (item.kind === "reference" && /^Exercise\s+\d/i.test(item.label?.en || ""))
  ));
}
function gradeItems() {
  return records.filter(item => String(item.classNum) === $("grade-select").value);
}
function chapterItems() {
  return gradeItems().filter(item => String(item.chapter) === $("chapter-select").value);
}
function exerciseItems() {
  return chapterItems().filter(item => String(item.exercise || "") === $("exercise-select").value);
}
function updateGrade() {
  const chapters = uniqueSorted(gradeItems().map(item => item.chapter));
  options("chapter-select", chapters.map(c => ({
    value: c, label: "Chapter " + c + (window.TRIGGLE_CLASSES?.[$("grade-select").value]?.chapters?.[c]?.en ? " · " + window.TRIGGLE_CLASSES[$("grade-select").value].chapters[c].en : "")
  })));
  updateChapter();
}
function updateChapter() {
  options("exercise-select", uniqueSorted(chapterItems().map(item => item.exercise || "Other")).map(ex => ({ value: ex, label: "Exercise " + ex })));
  updateExercise();
}
function updateExercise() {
  options("question-select", exerciseItems().map(item => ({
    value: item.id, label: (item.label?.en || item.title?.en || item.id)
  })));
  void showSelected();
}
function questionUrl(item) {
  const url = new URL("./index.html", location.href);
  url.searchParams.set("class", String(item.classNum));
  url.searchParams.set("question", item.id);
  return url.toString();
}
function stable(value) {
  if (Array.isArray(value)) return value.map(stable);
  if (value && typeof value === "object") {
    return Object.fromEntries(Object.keys(value).sort().map(key => [key, stable(value[key])]));
  }
  return value;
}
async function digest(item) {
  const data = new TextEncoder().encode(JSON.stringify(stable(item)));
  const bytes = new Uint8Array(await crypto.subtle.digest("SHA-256", data));
  return [...bytes].map(byte => byte.toString(16).padStart(2, "0")).join("");
}
function renderSteps(item) {
  const list = $("steps");
  list.replaceChildren();
  for (const step of item.steps || []) {
    const li = document.createElement("li");
    const detail = document.createElement("span");
    detail.textContent = step[$("review-language").value] || step.en || "";
    li.appendChild(detail);
    if (step.eq) {
      const eq = document.createElement("span");
      eq.className = "step-eq";
      mathText(eq, step.eq);
      li.appendChild(eq);
    }
    list.appendChild(li);
  }
}
async function showSelected() {
  const item = records.find(record => record.id === $("question-select").value);
  selectedRecord = item || null;
  if (!item) {
    $("question-label").textContent = "No question selected";
    $("history").textContent = "No question selected.";
    return;
  }
  $("question-label").textContent = item.label?.en || item.id;
  const language = $("review-language").value;
  mathText($("question-text"), item.q?.[language] || item.q?.en || "Original source text not available.");
  $("language-status").textContent = language === "ta" && !item.q?.ta ? "Tamil wording unavailable; English is shown. Tamil editorial review pending." : "Source and full-language review are separate from this decision.";
  $("review-figure").hidden = !item.figureSrc;
  if (item.figureSrc) {
    $("review-figure-image").src = item.figureSrc;
    $("review-figure-image").alt = item.figureAlt?.[language] || item.figureAlt?.en || "Question figure; verify labels against the original textbook.";
    $("review-figure-caption").textContent = item.figureCaption?.[language] || item.figureCaption?.en || "Existing question figure";
  } else $("review-figure-image").removeAttribute("src");
  $("source-note").textContent = item.kind === "reference"
    ? "Source verification pending: compare this exercise with the prescribed textbook edition before approving.\n" + (item.reference || "")
    : (item.reference || "");
  mathText($("answer-text"), String(item.answer?.[language] || item.answer?.en || item.answer || "No answer recorded"));
  renderSteps(item);
  const url = questionUrl(item);
  $("app-link").href = url;
  $("student-frame").removeAttribute("src");
  $("student-frame").dataset.url = url;
  $("review-form").reset();
  $("history").textContent = "Loading private review history…";
  $("save-review").disabled = true;
  const computedDigest = await digest(item);
  if (selectedRecord !== item) return;
  currentDigest = computedDigest;
  $("save-review").disabled = false;
  await loadHistory(item.id);
}
async function loadHistory(questionId) {
  if (!db) return;
  try {
    const results = await bounded(getDocs(query(
      collection(db, reviewEvents), where("questionId", "==", questionId), limit(100)
    )));
    if (!reviewer || !startup.active() || !selectedRecord || selectedRecord.id !== questionId) return;
    const entries = results.docs.map(doc => doc.data()).sort((a, b) =>
      (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0)
    );
    const history = $("history");
    history.replaceChildren();
    if (!entries.length) {
      history.textContent = "No reviews yet for this question.";
      return;
    }
    for (const entry of entries) {
      const wrapper = document.createElement("div");
      wrapper.className = "history-item";
      const heading = document.createElement("strong");
      heading.textContent = {
        approved: "Approved", "needs-correction": "Needs correction", pending: "Pending"
      }[entry.decision] || "Review";
      const meta = document.createElement("div");
      meta.className = "history-meta";
      const date = entry.createdAt?.toDate?.();
      meta.textContent = date ? date.toLocaleString() : "Date pending";
      wrapper.append(heading, meta);
      if (entry.note) {
        const p = document.createElement("p");
        p.textContent = entry.note;
        wrapper.appendChild(p);
      }
      history.appendChild(wrapper);
    }
  } catch (error) {
    $("history").textContent = "Could not load review history. Verify your permission and connection.";
    message("Review history access failed: " + (error.code || error.message), true);
  }
}
async function loadCurriculum() {
  const selectors = ["grade-select", "chapter-select", "exercise-select", "question-select"];
  selectors.forEach(id => { $(id).disabled = true; });
  options("grade-select", [{ value: "", label: "Loading questions…" }]);
  options("chapter-select", [{ value: "", label: "Loading…" }]);
  options("exercise-select", [{ value: "", label: "Loading…" }]);
  options("question-select", [{ value: "", label: "Loading…" }]);
  message("Teacher access verified. Loading current textbook questions…");
  try {
    const response = await bounded(fetch("./index.html", { cache: "no-store" }));
    if (!response.ok) throw new Error("Could not read the current Triggle question list");
    const doc = new DOMParser().parseFromString(await response.text(), "text/html");
    // Follow the same script order as the student app. Generated batches
    // depend on data/curriculum.js, not just class-N.js.
    const urls = [...doc.querySelectorAll("script[src]")].map(node => node.getAttribute("src"))
      .filter(src => /^\.?\/?data\/(class-|curriculum\.js|textbook-exercises\/)/.test(src));
    if (!urls.some(src => /data\/curriculum\.js(?:\?|$)/.test(src))) {
      throw new Error("Student curriculum registry is missing");
    }
    for (const [i, src] of urls.entries()) {
      message("Teacher access verified. Loading textbook modules " + (i + 1) + "/" + urls.length + "…");
      await bounded(new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.src = new URL(src, new URL("./index.html", location.href)).href;
        script.onload = resolve;
        script.onerror = () => reject(new Error("Could not load: " + src));
        document.head.appendChild(script);
      }));
      if (!reviewer || !startup.active()) return;
    }
    records = Object.values(window.TRIGGLE_CLASSES || {}).flatMap(grade => grade.items || [])
      .filter(isReviewableExercise)
      .sort((a, b) => a.classNum - b.classNum || Number(a.chapter) - Number(b.chapter) ||
        String(a.exercise).localeCompare(String(b.exercise), undefined, { numeric: true }) ||
        String(a.label?.en).localeCompare(String(b.label?.en), undefined, { numeric: true }));
    if (!records.length) throw new Error("No textbook questions were available");
    options("grade-select", uniqueSorted(records.map(item => item.classNum)).map(grade => ({ value: grade, label: "Grade " + grade })), "9");
    selectors.forEach(id => { $(id).disabled = false; });
    updateGrade();
    message("Teacher access verified. " + records.length + " exercise records are available for review. Items marked reference still need textbook-source verification.");
  } catch (error) {
    message("Your teacher account is authorized, but the questions could not load: " +
      error.message + ". Refresh the page to retry.", true);
    throw error;
  }
}
async function beginGoogleLogin() {
  if (!auth || $("google-login").disabled || !startup.active()) return;
  $("google-login").disabled = true;
  message("Opening Google sign-in…");
  try {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });
    await signInWithPopup(auth, provider);
  } catch (error) {
    message(error.code === "auth/popup-closed-by-user" ? "Sign-in cancelled. Select Sign in with Google to try again." : "Sign-in unsuccessful: " + (error.code || "Please try again"), true);
  } finally {
    $("google-login").disabled = false;
  }
}
async function signout() {
  authEpoch++; reviewer = null; selectedRecord = null; currentDigest = "";
  inbox.clear();
  $("history").replaceChildren();
  view("login");
  try { if (auth) await bounded(signOut(auth)); }
  catch { startup.fail(); }
}
async function authChanged(user) {
  const epoch = ++authEpoch;
  reviewer = null; selectedRecord = null; currentDigest = "";
  $("history").replaceChildren(); $("review-form").reset();
  inbox.clear(); view("checking");
  if (!startup.active()) return;
  if (!user) {
    startup.set("ready-to-sign-in");
    view("login");
    message("Sign in with the Google account authorized by the Triggle owner.");
    return;
  }
  startup.set("checking-authorization");
  message("Checking teacher authorization…");
  try {
    const token = await bounded(user.getIdTokenResult(true));
    if (epoch !== authEpoch || !startup.active()) return;
    if (token.claims.firebase?.sign_in_provider !== "google.com") {
      startup.set("unauthorized"); view("denied");
      message("Sign in with the authorized Google account.", true);
      return;
    }
    // Always consult the server. An offline cached grant must never unlock the UI.
    const grant = await bounded(getDocFromServer(doc(db, "teacherAccess", user.uid)));
    if (epoch !== authEpoch || !startup.active()) return;
    if (!grant.exists() || grant.data().role !== "reviewer") {
      startup.set("unauthorized"); view("denied");
      message("Google sign-in succeeded, but this account has not been approved by the Triggle administrator.", true);
      return;
    }
    reviewer = user;
    view("workspace");
    if (!records.length) {
      try { await loadCurriculum(); }
      catch (loadError) { startup.fail(); return; }
    }
    if (epoch !== authEpoch || !startup.active()) return;
    startup.set("authorized");
    message("Authenticated teacher access. Your review history is private.");
    void inbox.load();
  } catch (error) {
    if (epoch !== authEpoch) return;
    if (error.code === "permission-denied") {
      startup.set("unauthorized"); view("denied");
      message("This account cannot access Teacher Review.", true);
    } else startup.fail();
  }
}
async function saveReview(event) {
  event.preventDefault();
  if (!reviewer || !selectedRecord || !db || saving || !startup.active()) return;
  const decision = new FormData($("review-form")).get("decision");
  if (!["approved", "needs-correction", "pending"].includes(decision)) {
    message("Select a review outcome before saving.", true);
    return;
  }
  const item = selectedRecord;
  const category = $("issue-type").value;
  const remarks = $("remarks").value.trim();
  if (decision === "needs-correction" && !remarks) { message("Describe the correction in Tamil or English before saving.", true); return; }
  const note = (category ? "[" + category + "] " : "") + remarks;
  saving = true;
  $("save-review").disabled = true;
  try {
    await addDoc(collection(db, reviewEvents), {
      questionId: item.id,
      grade: Number(item.classNum),
      chapter: String(item.chapter),
      exercise: String(item.exercise || ""),
      decision,
      note,
      reviewerUid: reviewer.uid,
      recordSha256: await digest(item),
      createdAt: serverTimestamp()
    });
    if (!reviewer || !startup.active()) return;
    message("Private review saved. Select it in the inbox for manual correction handoff.");
    void inbox.load();
    $("review-form").reset();
    await loadHistory(item.id);
  } catch (error) {
    message("Couldn't save review: " + (error.code || error.message), true);
  } finally {
    saving = false;
    $("save-review").disabled = false;
  }
}
$("google-login").addEventListener("click", beginGoogleLogin);
// Return to the login button so the popup opens on a fresh user gesture on mobile.
$("try-another").addEventListener("click", () => { void signout(); });
$("signout").addEventListener("click", signout);
$("grade-select").addEventListener("change", updateGrade);
$("chapter-select").addEventListener("change", updateChapter);
$("exercise-select").addEventListener("change", updateExercise);
$("review-language").addEventListener("change", () => { void showSelected(); });
$("question-select").addEventListener("change", () => { void showSelected(); });
$("review-form").addEventListener("submit", saveReview);
document.querySelector("details").addEventListener("toggle", event => {
  if (event.currentTarget.open && $("student-frame").dataset.url) {
    $("student-frame").src = $("student-frame").dataset.url;
  } else {
    $("student-frame").removeAttribute("src");
  }
});

if (!startup.active()) {
  // A late import after the independent timeout cannot revive this session.
} else if (!firebaseConfig?.apiKey || !firebaseConfig?.projectId || !firebaseConfig?.authDomain) {
  startup.set("recoverable-error");
  view("unconfigured");
  message("Teacher Review is awaiting secure Firebase configuration.");
} else {
  try {
    startup.set("loading-authentication");
    message("Loading authentication…");
    const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
    auth = getAuth(app);
    db = getFirestore(app);
    unsubscribeAuth = onAuthStateChanged(auth, user => { void authChanged(user); }, () => startup.fail());
  } catch (error) {
    startup.fail();
  }
}
