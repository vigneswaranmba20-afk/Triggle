import { firebaseConfig } from "../data/teacher-portal-config.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/13.2.0/firebase-app.js";
import {
  getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut
} from "https://www.gstatic.com/firebasejs/13.2.0/firebase-auth.js";
import {
  getFirestore, addDoc, collection, doc, getDoc, getDocs, limit, query, serverTimestamp, where
} from "https://www.gstatic.com/firebasejs/13.2.0/firebase-firestore.js";

const $ = id => document.getElementById(id);
const views = ["unconfigured", "login", "denied", "workspace"];
let auth = null;
let db = null;
let reviewer = null;
let records = [];
let selectedRecord = null;
let currentDigest = "";
const reviewEvents = "teacherReviewEvents";

function message(text, isError = false) {
  $("message").textContent = text;
  $("message").classList.toggle("error", isError);
}
function view(name) {
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
function gradeItems() {
  return records.filter(item => String(item.classNum) === $("grade-select").value);
}
function chapterItems() {
  return gradeItems().filter(item => String(item.chapter) === $("chapter-select").value);
}
function exerciseItems() {
  return chapterItems().filter(item => String(item.exercise || "Other") === $("exercise-select").value);
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
    detail.textContent = step.en || "";
    li.appendChild(detail);
    if (step.eq) {
      const eq = document.createElement("span");
      eq.className = "step-eq";
      eq.textContent = step.eq;
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
  $("question-text").textContent = item.q?.en || "Original English source text not available.";
  $("source-note").textContent = item.reference || "";
  $("answer-text").textContent = String(item.answer?.en || item.answer || "No answer recorded");
  renderSteps(item);
  const url = questionUrl(item);
  $("app-link").href = url;
  $("student-frame").removeAttribute("src");
  $("student-frame").dataset.url = url;
  $("review-form").reset();
  $("history").textContent = "Loading private review history…";
  const computedDigest = await digest(item);
  if (selectedRecord !== item) return;
  currentDigest = computedDigest;
  await loadHistory(item.id);
}
async function loadHistory(questionId) {
  if (!db) return;
  try {
    const results = await getDocs(query(
      collection(db, reviewEvents), where("questionId", "==", questionId), limit(100)
    ));
    if (!selectedRecord || selectedRecord.id !== questionId) return;
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
    const response = await fetch("./index.html", { cache: "no-store" });
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
      await new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.src = new URL(src, new URL("./index.html", location.href)).href;
        script.onload = resolve;
        script.onerror = () => reject(new Error("Could not load: " + src));
        document.head.appendChild(script);
      });
    }
    if (!window.TriggleTeacherQuestions?.collect) {
      throw new Error("Teacher question selection module is missing");
    }
    records = window.TriggleTeacherQuestions.collect(
      window.TRIGGLE_CLASSES, window.TRIGGLE_CURRICULUM
    );
    if (!records.length) throw new Error("No textbook questions were available");
    options("grade-select", uniqueSorted(records.map(item => item.classNum)).map(grade => ({ value: grade, label: "Grade " + grade })), "10");
    selectors.forEach(id => { $(id).disabled = false; });
    updateGrade();
    message("Teacher access verified. " + records.length + " published textbook questions are ready for review.");
  } catch (error) {
    message("Your teacher account is authorized, but the questions could not load: " +
      error.message + ". Refresh the page to retry.", true);
    throw error;
  }
}
async function beginGoogleLogin() {
  if (!auth) return;
  $("google-login").disabled = true;
  message("Opening Google sign-in…");
  try {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });
    await signInWithPopup(auth, provider);
  } catch (error) {
    message("Sign-in unsuccessful: " + (error.code || "Please try again"), true);
  } finally {
    $("google-login").disabled = false;
  }
}
async function signout() {
  if (auth) await signOut(auth);
  reviewer = null;
  selectedRecord = null;
}
async function authChanged(user) {
  reviewer = null;
  if (!user) {
    view("login");
    message("Sign in with the Google account authorized by the Triggle owner.");
    return;
  }
  try {
    const token = await user.getIdTokenResult(true);
    if (token.claims.firebase?.sign_in_provider !== "google.com") {
      view("denied");
      message("Sign in with the authorized Google account.", true);
      return;
    }
    const grant = await getDoc(doc(db, "teacherAccess", user.uid));
    if (!grant.exists() || grant.data().role !== "reviewer") {
      view("denied");
      message("Google sign-in succeeded, but this account has not been approved by the Triggle administrator. Ask the owner to authorize it in Firebase.", true);
      return;
    }
    reviewer = user;
    view("workspace");
    message("Authenticated teacher access. Loading questions…");
    if (!records.length) {
      try { await loadCurriculum(); }
      catch (loadError) { console.error("Teacher question loading failed:", loadError); }
    }
  } catch (error) {
    view("denied");
    message("Could not verify teacher permission: " + (error.code || error.message), true);
  }
}
async function saveReview(event) {
  event.preventDefault();
  if (!reviewer || !selectedRecord || !db) return;
  const decision = new FormData($("review-form")).get("decision");
  if (!["approved", "needs-correction", "pending"].includes(decision)) {
    message("Select a review outcome before saving.", true);
    return;
  }
  const item = selectedRecord;
  const note = $("remarks").value.trim();
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
    message("Private review saved. Automated correction is not connected yet.");
    $("review-form").reset();
    await loadHistory(item.id);
  } catch (error) {
    message("Couldn't save review: " + (error.code || error.message), true);
  } finally {
    $("save-review").disabled = false;
  }
}
$("google-login").addEventListener("click", beginGoogleLogin);
$("try-another").addEventListener("click", async () => {
  await signout();
  await beginGoogleLogin();
});
$("signout").addEventListener("click", signout);
$("grade-select").addEventListener("change", updateGrade);
$("chapter-select").addEventListener("change", updateChapter);
$("exercise-select").addEventListener("change", updateExercise);
$("question-select").addEventListener("change", () => { void showSelected(); });
$("review-form").addEventListener("submit", saveReview);
document.querySelector("details").addEventListener("toggle", event => {
  if (event.currentTarget.open && $("student-frame").dataset.url) {
    $("student-frame").src = $("student-frame").dataset.url;
  } else {
    $("student-frame").removeAttribute("src");
  }
});

if (!firebaseConfig?.apiKey || !firebaseConfig?.projectId || !firebaseConfig?.authDomain) {
  view("unconfigured");
  message("Teacher Review is awaiting secure Firebase configuration.");
} else {
  try {
    const app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    db = getFirestore(app);
    onAuthStateChanged(auth, user => { void authChanged(user); });
  } catch (error) {
    view("unconfigured");
    message("Teacher Review setup is incomplete: " + error.message, true);
  }
}
