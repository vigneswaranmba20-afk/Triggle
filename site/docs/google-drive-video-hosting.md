# Triggle — Google Drive video publishing

## Pilot asset
- Source video: `Triggle_Class12_English_Clean_No_Intro_Outro_No_Subtitles.mp4`
- 720 × 1280 H.264/AAC, 170.17 seconds, approximately 4.8 MiB
- Class 12 · Exercise 4.1 · Q1(ii): `c12-4-4-1-2`
- Correct math: `sin x = -1`, `-3π ≤ x ≤ 3π`, solutions `-5π/2, -π/2, 3π/2`
- English Gemini narration; no Tamil subtitles; no spoken opening or closing branding

## Google Drive upload (owner action required)
1. Download the finished video from the ChatGPT attachment.
2. Upload the MP4 to the owner's Triggle Voice Studio — Private folder at https://drive.google.com/drive/folders/14lTOUFOGIhUkSZvpD-rA4X-cuA-pjw5Z.
3. On the MP4 (not necessarily the folder), choose **Share → General access → Anyone with the link → Viewer → Done**. This makes the video viewable by anyone visiting the public Triggle site; do not do this for private files or reference voice samples.
4. Copy the share link such as `https://drive.google.com/file/d/FILE_ID/view?usp=sharing`. No credentials or access tokens are needed.
5. Confirm the share link plays in an Incognito browser; Google Drive may initially need time to process the upload.

## Publish in Triggle
The viewer supports a trusted Google Drive file ID and builds its own preview and view URLs. Do not put a Drive `/view` link in the HTML5 `video` element: it is an HTML page, not a playable MP4 source.

Add the following single entry to `site/data/video-lessons.json` only after confirming the uploaded file is accessible:
```json
{
  "questionId": "c12-4-4-1-2",
  "class": 12,
  "chapter": "4",
  "exercise": "4.1",
  "question": "Q1(ii)",
  "title": {
    "en": "All angles where sin x = −1",
    "ta": "sin x = −1 ஆகும் கோணங்கள்"
  },
  "language": "en",
  "status": "ready",
  "provider": "google-drive",
  "fileId": "FILE_ID",
  "downloadAllowed": false
}
```

Do not mark as ready with a placeholder ID. Video playback is activated by clicking **Watch Visual Lesson**, not at page load. Drive provides its own controls inside the iframe. Use the **Open in Google Drive** fallback if phone tracking settings block embedded playback. Confirm English/Tamil language switches and Android Back close the modal. The existing lesson text and chapter roadmap remain unchanged.

## Limits and later migration
Google Drive is convenient for privately administered pilot videos but is not a dedicated video CDN. Shared files may be rate-limited, need post-upload processing, or prompt external viewing. For many videos or substantial traffic, move to direct MP4 hosting (e.g. object storage with range-request support). Never publish the owner's voice-reference WAV or private files in the public repository.
