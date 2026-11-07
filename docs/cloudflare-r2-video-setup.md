# Cloudflare R2 pilot for Triggle videos

**Status: code ready for R2, storage not connected.** This procedure is a deployment checklist, not evidence that an R2 bucket exists. Until a working public URL is confirmed, the published Class 12 lesson stays on GitHub Pages. No changes to video hosting, billing, or credentials were made by the code preparation PR.

## 1. Create the account and bucket

1. Visit https://dash.cloudflare.com and sign in or sign up. Open **Storage & databases → R2 → Overview**. Complete Cloudflare's R2 subscription/checkout setup yourself. R2 has a monthly free tier, but Cloudflare can charge for usage exceeding its included allowance; check the Cloudflare billing page.
2. Create an R2 bucket such as `triggle-lessons`. Choose **Standard** storage, not Infrequent Access (the free tier applies only to Standard).
3. Upload only a small test lesson first. Upload the original Class 12 MP4 to an object key such as `grade-12/chapter-4/exercise-4-1/q1-ii/en.mp4`. Optionally upload the compatible VP9/Opus file as `.../en.webm`. Use proper content types **video/mp4** and **video/webm**.
4. Under bucket **Settings → Public Development URL**, temporarily enable `r2.dev` for testing if needed. This makes objects publicly readable by anyone who has a link. Do not use `r2.dev` for a public launch: it is rate-limited and not production-ready.

## 2. Production public hostname

For production video delivery use **Settings → Custom Domains** and a subdomain from a domain already in the same Cloudflare account, for example `videos.your-domain.example`. Cloudflare connects the bucket and creates the needed DNS record. This is **not** a commitment that Triggle already owns a domain. Domain registration may cost extra; the public video CDN hostname is a later decision if none is available.

A public R2 video URL must be an actual HTTPS direct file URL, for example:

`https://videos.your-domain.example/grade-12/chapter-4/exercise-4-1/q1-ii/en.mp4`

Do **not** use the private S3 endpoint, an R2 dashboard URL, an upload API token, an AWS-style key, or a presigned URL in any public GitHub file.

## 3. CORS and streaming

Cloudflare R2 → bucket → **Settings → CORS policy**. For Triggle's existing GitHub Pages origin, a starting policy is:

```json
[
  {
    "AllowedOrigins": ["https://vigneswaranmba20-afk.github.io"],
    "AllowedMethods": ["GET", "HEAD"],
    "AllowedHeaders": ["Range"],
    "ExposeHeaders": ["Accept-Ranges", "Content-Range", "Content-Length", "ETag"],
    "MaxAgeSeconds": 3600
  }
]
```

Use the actual Android app origin / verified production site origin if those differ. Cross-origin HTML5 media can often play without a CORS request, but CORS is needed for app-driven fetching and some future offline-download features. Confirm public video requests support **HTTP byte ranges**, and serve correct MIME content types. Purge cached responses when adjusting existing custom-domain CORS rules.

## 4. Connect one reviewed video to Triggle

The player now supports records with `provider: "cloudflare-r2"`, with **public HTTPS direct MP4** and optional same-origin WebM URLs:

```json
{
  "questionId": "c12-4-4-1-2",
  "class": 12,
  "chapter": "4",
  "exercise": "4.1",
  "question": "Q1(ii)",
  "status": "ready",
  "language": "en",
  "provider": "cloudflare-r2",
  "title": {"en": "All angles where sin x = −1", "ta": "sin x = −1 ஆகும் கோணங்கள்"},
  "downloadAllowed": false,
  "video": "https://videos.your-domain.example/grade-12/chapter-4/exercise-4-1/q1-ii/en.mp4",
  "webm": "https://videos.your-domain.example/grade-12/chapter-4/exercise-4-1/q1-ii/en.webm",
  "poster": "./videos/posters/triggle-class12-sine.svg"
}
```

**The example URL is a placeholder, not a working endpoint.** Do not add it to the live manifest. Once the R2 bucket is active, upload the real file(s), check direct HTTPS GET/HEAD and range playback, then substitute the real URLs in `site/data/video-lessons.json`. Set `downloadAllowed: false` initially for cloud storage: browsers cannot be relied on to download cross-origin files merely from an HTML `download` attribute. Re-enable only after app-specific downloads or appropriate response headers are implemented and tested.

For Tamil audio/video, publish separate reviewed objects such as `ta.mp4` / `ta.webm` and add a second manifest record with `language: "ta"`. The current Class 12 lesson has English audio only; do not mislabel it as Tamil.

## 5. Validation and cost precautions

- Run `npm test` and `npm run test:browser`, including phone viewport tests.
- Verify the exact Class 12 question and ensure the **written solution still works offline**, while videos are on-demand and need internet.
- Public bucket files are readable by anyone with a URL; **R2 is not DRM**. Do not upload private student data.
- Cloudflare's published **Standard** free allowance (October 2026) is **10 GB-month storage**, **1 million Class A operations**, and **10 million Class B operations per month**, with free R2 internet egress. Beyond that, usage-based charges apply. See https://developers.cloudflare.com/r2/pricing/.
- Video data should stay outside the Android APK. Later, the app may stream over HTTPS and optionally offer explicit offline downloads into app-managed storage. This code does not yet implement an Android offline-media manager.
- Keep the existing GitHub file active until a first R2 object plays on a real Android phone. Then migrate remaining lessons gradually.

Cloudflare documentation: https://developers.cloudflare.com/r2/get-started/ · https://developers.cloudflare.com/r2/buckets/public-buckets/ · https://developers.cloudflare.com/r2/buckets/cors/
