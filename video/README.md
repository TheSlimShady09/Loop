# Hero background clip

The homepage hero looks for a looping clip here and fades it in over the
still image once it can play. Until a file exists, the still
(`ugc-images/loop-ugc-mornings.webp`) stays up — nothing breaks.

Drop in either or both, with these exact names:

| File | Notes |
| --- | --- |
| `loop-hero-loop.webm` | VP9/AV1, preferred — smaller |
| `loop-hero-loop.mp4` | H.264, fallback for Safari |

Specs that suit the hero:

- **5 seconds**, cut so the last frame meets the first — the `loop`
  attribute restarts it instantly, and a mismatched seam reads as a jump.
- **1920×1080** or wider; it is cropped with `object-fit: cover`.
- **No audio track** — the element is muted and autoplay needs it.
- Keep it under ~3 MB. It loads on every visit.
- Slow, low-contrast motion works best: the hero lays type and the
  product shot over it behind a beige veil at 70–97% opacity.

The markup already carries `autoplay muted loop playsinline`, which is
what mobile Safari and Chrome require to start a clip without a tap.
`prefers-reduced-motion: reduce` hides the video and keeps the still.
