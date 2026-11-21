# TRACE Single-WAV Fola Recording Guide — Why parallel lines divide a triangle proportionally

**Lesson:** `g10-ch4-bpt-thales` · English · 9 scenes.
**Voice:** Fola. Choose the existing voice in AI Studio; never enable billable API access.

## One recording, not nine separate generations

1. Open [Google AI Studio Speech](https://aistudio.google.com/generate-speech), single-speaker Fola, ONLY if your access has no additional billing.
2. Keep the voice style outside the narration field: Warm, clear, unhurried mathematics teacher. Read mathematical letters separately, allow time to see each segment, no music or dramatic expressions. For one-take recording, deliberately leave at least two seconds of silence between each scene.
3. Copy the **nine paragraphs below** as one speech request. Ask for clear, completely silent **2.5–3 second gaps** BETWEEN paragraphs. Do not speak stage titles, numbering, cues, or the words "pause two seconds".
4. Preview the output. Preserve the WAV in **uncompressed 16-bit PCM, 16–48 kHz**, mono/stereo. If a download is another format, convert **locally** with FFmpeg, without paid services.
5. TRACE's one-WAV import demands exactly **eight internal silent gaps of at least 1.6 seconds**. A blank line, punctuation, or a TTS prompt is not proof that the waveform contains them. If missing or extra, the pipeline refuses to guess. Use the nine-WAV fallback, or insert gaps with a local editor before re-testing.
6. Upload the single WAV as a GitHub issue attachment. When Mission 05's guarded workflow is merged, run its manual action with the attachment URL. The output is a **private review MP4**, not an automatic publication.

## Copy this complete narration into one Fola speech request

```text
Can one straight line divide two different sides of a triangle in exactly the same proportion? Watch this line move.

This is triangle A B C. D lies on side A B, and E lies on side A C. The short line D E runs parallel to the base B C.

Slide D E upward while keeping it parallel to B C. Both cut points move, but their positions stay linked.

The top piece A D divided by the bottom piece D B equals A E divided by E C. Each side compares top with bottom.

Parallel lines make corresponding angles equal. So the little triangle A D E has the same angles as the whole triangle A B C.

Similar triangles give A D over A B equals A E over A C. Subtract the top pieces from the whole sides to obtain the same top-to-bottom ratio.

If A D is three, D B is five, and the full side A C is sixteen, then A B is eight. A E is three eighths of sixteen, which is six.

Your turn. A D is four, D B is six, and A C is twenty. How long is A E? Pause and try it before the answer appears.

A B equals ten. So A E is four tenths of twenty, which is eight. E C is twelve. Four divided by six equals eight divided by twelve. The ratios match.
```

## Alignment checklist (not part of spoken narration)

- [ ] Scene 1: `parallel-line-mystery` — bpt-hook — followed by a 2.5–3 s silent separator
- [ ] Scene 2: `meet-the-triangle` — bpt-points — followed by a 2.5–3 s silent separator
- [ ] Scene 3: `slide-the-line` — bpt-slide — followed by a 2.5–3 s silent separator
- [ ] Scene 4: `matching-ratios` — bpt-rule — followed by a 2.5–3 s silent separator
- [ ] Scene 5: `matching-angles` — bpt-angles — followed by a 2.5–3 s silent separator
- [ ] Scene 6: `discover-the-proof` — bpt-proof — followed by a 2.5–3 s silent separator
- [ ] Scene 7: `three-five-sixteen` — bpt-example — followed by a 2.5–3 s silent separator
- [ ] Scene 8: `practice-pause` — bpt-practice — followed by a 2.5–3 s silent separator
- [ ] Scene 9: `verify-both-sides` — bpt-answer — final scene, no separator

**Cost:** The factory importer/renderer makes zero Gemini/OpenAI API calls. AI Studio itself must be used only within account limits; subscriptions do not guarantee free developer API access.
**Mathematics:** `DE ∥ BC` implies `AD/DB = AE/EC`; for the first example, `AE=6 cm`. Do not accidentally reveal the independent practice answer (`8 cm`) before scene nine.
**Review boundary:** The first assembled video requires mathematical, narration, mobile and checksum review and explicit approval before student publication.
