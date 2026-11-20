# TRACE Video Factory — G.P. dual-AI real-video recording kit

**Goal:** make the full Grade 10 Geometric Progression / Geometric Series concept video with ChatGPT-checked mathematics and Gemini narration, without any extra model API billing.

**Status:** recording kit and import workflow; **not** proof that Fola audio has been recorded or that a final video has been published.

## Responsibilities

- **ChatGPT / TRACE:** maintain the correct script, exact rendered mathematical animation, synchronization and final quality review.
- **Gemini in Google AI Studio:** create the human-sounding narration WAV files in a free/no-billing interface **only if your signed-in session clearly allows it**. Google AI Pro is not a promise of included developer API usage.
- **GitHub Actions:** assemble these existing WAVs into a 720×1280 MP4 with FFmpeg and local Python/Pillow. **No AI inference calls; no Gemini API keys; no R2 publication.**
- **Owner:** listen, confirm voice identity and clarity, and approve the finished video before anything reaches students.

Do not use the previous workflow's paid `generate` mode. Leave `approve_paid_tts=false`. If Google AI Studio requests a billing account, API key linked to billing, or paid upgrade, stop rather than proceed.

## Step 1 — record nine separate voice clips

Open [Google AI Studio speech generator](https://aistudio.google.com/generate-speech). If available without activating billing, choose **Gemini 3.8 Flash TTS**, use the **Fola** voice, single-speaker, and give the following *delivery directions* separately from the spoken text:

> Friendly, warm, encouraging mathematics teacher; expressive but never theatrical. Natural neutral English, unhurried and conversational, with gentle pauses after numbers and mathematical reasoning. No background music. Read the transcript exactly, including the numbers; do not add or omit any words.

Generate one clip per numbered beat. Listen to it before saving. Export or convert to **WAV** and rename exactly as shown. These transcripts match the checked storyboard file `site/video-factory/lessons/g10-ch2-gp-sum.json`. If using a different TTS model or voice due to free-tier availability, record the change; never label it Fola without listening.

| Beat | Filename | Exact words to speak |
| --- | --- | --- |
| 1 | `wonder.wav` | How can we add one, two, four, and eight quickly? There is a pattern hiding here. |
| 2 | `doubling-pattern.wav` | Each term is double the previous one. That fixed multiplier, two, is called the common ratio. |
| 3 | `name-the-sum.wav` | Call the sum S. So S equals one plus two plus four plus eight. |
| 4 | `double-the-sum.wav` | Double every term. Two S equals two plus four plus eight plus sixteen. Notice how the terms shift. |
| 5 | `align-the-rows.wav` | Align the doubled sum and the original. Two, four, and eight now match, column for column. |
| 6 | `cancel-the-middle.wav` | Subtract S from two S. The three matching terms cancel. Sixteen minus one remains. Since two S minus S equals S, the sum is fifteen. |
| 7 | `discover-formula.wav` | The same idea works with any first term a and ratio r. Multiply by r and subtract. For n terms, the sum is a times the bracket r to the power n minus one, all divided by r minus one. But r must not equal one. |
| 8 | `your-turn.wav` | Your turn. Add one, three, nine, and twenty-seven. Multiply the sum by three, then subtract. Which terms cancel? Pause and try it yourself. |
| 9 | `check-your-thinking.wav` | Three S equals three plus nine plus twenty-seven plus eighty-one. Subtract S. Two S equals eighty-one minus one, which is eighty. So S equals forty. That's the shortcut. |

**Please preserve the filenames exactly.** The length of each real WAV drives its matching animation. The render engine adds its designed pause after each spoken segment.

## Step 2 — provide the nine WAV files

**Easiest on Android:** attach the nine WAV files to our dedicated ChatGPT Video conversation. We can run the existing-WAV renderer using the supplied files and review the MP4 together.

**For self-service GitHub Actions:** place the nine WAV files (all together, either ZIP root or one enclosing folder) in a ZIP, attach that ZIP to an issue comment in the Triggle GitHub repository, and copy the resulting `https://github.com/user-attachments/files/...` URL. Note: this makes the audio publicly accessible if the issue is public.

Run [TRACE G.P. — recorded WAV to real video](https://github.com/vigneswaranmba20-afk/Triggle/actions/workflows/trace-gp-recorded-wav-review.yml), select `main`, and paste the ZIP attachment URL. The workflow validates the ZIP, checks every WAV, renders the real MP4, and uploads the MP4 + provenance as a **review-only** GitHub Actions artifact for seven days.

This workflow cannot work until its PR passes CI and is merged. No manual recording, AI inference, GitHub upload or student publication occurs just by merging it.

## Step 3 — acceptance tests before publication

1. **Mathematics:** visually check `1+2+4+8=15`, `1+3+9+27=40`, and `S_n=a(r^n-1)/(r-1)` with `r≠1`.
2. **Narration:** confirm the intended voice, no unwanted accent, correct number pronunciation, warm slow pace, no hallucinated terms.
3. **Alignment:** watch each of nine animations while its exact WAV plays; confirm term matching/cancellation is synchronized.
4. **Mobile:** test on Android portrait, 320–430px-equivalent viewing, large readable symbols, audio controls, replay and seeking.
5. **Evidence:** retain the manifest SHA-256, MP4 SHA-256 and review verdict. Only release to Cloudflare R2 after explicit quality approval.

**Release gate:** this workflow does **not** upload to Cloudflare, modify the live lesson, or automatically publish anything. No exercise videos; concept-only production.
