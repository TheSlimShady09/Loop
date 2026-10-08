# LOOP — store package

Everything built so far for the LOOP streetwear launch (Canada / CAD).

```
LOOP-store/
├── prototypes/
│   ├── loop-homepage.html            Live homepage prototype — full identity,
│   │                                 wordmark logo, load animation, scroll
│   │                                 reveals, the hero product shot and the
│   │                                 3D hoodie showcase.
│   └── loop-merchant-dashboard.html  Store analytics dashboard prototype —
│                                     Overview / Sales / Products / Customers /
│                                     Inventory / Marketing, sample CAD data.
│
├── brand-assets/
│   ├── loop-logo-gold.webp           The logo — liquid-chrome wordmark,
│   │                                 recoloured gold. Used in the nav, the
│   │                                 footer, the loader and the dashboard.
│   ├── loop-logo-gold.png            Same, lossless.
│   ├── favicon.svg                   L monogram, beige on espresso.
│   ├── logo-white-on-gold.svg        Header — cream wordmark, gold ground.
│   ├── logo-black-on-gold.svg        Hero / gold sections — espresso wordmark.
│   └── logo-black-on-white.svg       Footer / cream sections.
│
├── product-images/
│   ├── loop-hoodie-gold-2048.png     Higgsfield render, full res (2048²).
│   ├── loop-hoodie-gold-web.jpg      1200px compressed, grey studio ground.
│   ├── loop-hoodie-cutout.webp       Background removed, sits on any ground.
│   ├── loop-tee-beige-cutout.webp    Generated, keyed off a green screen.
│   ├── loop-jacket-khaki-cutout.webp Generated, background removed.
│   └── loop-beanie-gold-cutout.webp  Generated, background removed.
│
├── ugc-images/                       Six generated @loop.wear tiles — miles,
│                                     layers, mornings, nights, weekends, reps.
│
├── vercel.json                       Static-host routing: / serves the homepage,
│                                     /dashboard serves the dashboard.
│
└── shopify/
    ├── loop-shopify-setup.md         Step-by-step build guide: currency,
    │                                 markets/EN-FR, theme colours + type,
    │                                 homepage sections, collections, variants,
    │                                 size chart, shipping, taxes, checklist,
    │                                 copy bank.
    └── loop-theme.css                Paste into Shopify Theme settings →
                                      Custom CSS. Anton headings, espresso nav,
                                      brand buttons, beige / Sunflower badges.
```

## Open the prototypes
Double-click either file in `prototypes/` — they run in any browser with no
server and no internet (fonts fall back gracefully offline).

Hosted versions:
- Homepage:  https://claude.ai/code/artifact/5e1b399b-2c81-480c-ac55-836e75bb0cca
- Dashboard: https://claude.ai/code/artifact/5eb35022-956e-4918-85d6-be1ff358c092

## Brand quick reference

| Token | Hex | Use |
| --- | --- | --- |
| Bright Gold | `#F7DA39` | primary accent, logo type |
| Sunflower Gold | `#FFBA4A` | hover, sale badges |
| Espresso | `#33261E` | "black" — text, nav, footer |
| Olive Wood | `#7B562D` | borders, secondary buttons |
| Warm Beige | `#E3D5B7` | hero ground, promise strip, badges |
| Cream | `#F4EDDA` | "white" — page ground |

- Display type: **Anton** (free stand-in for Extenda). Body: **Inter** (per brief).
- Tagline: **"Made for more"** — used as a full stop; recurs in product copy
  as *"Made for more <noun>"*.

## The chrome site (`/`)

The root is a single-page rebuild in liquid-chrome / Y2K dress, split
into WOMEN and MEN modes. It is a separate thing from the beige
prototypes in `prototypes/`, which stay reachable at `/classic` and
`/dashboard`.

```
index.html                  entry screen, both modes, every section
css/chrome.css              tokens, chrome gradients, mode accents
js/data.js                  the catalogue: 20 products across both modes
js/transitions.js           the transition controller (wave, drip, swirl,
                            splash, ripple, sparkle) — everything that
                            covers the screen goes through here
js/hero3d.js                Three.js chrome blob, with a painted canvas
                            environment instead of an HDR download
js/app.js                   loader, entry, modes, ring, grid, cart, cursor
images/transitions/         12 chrome plates, keyed to transparency
```

Libraries come from CDNs: GSAP + ScrollTrigger, Three.js, Lenis.

**Transitions.** One controller owns them. A route change runs a chrome
wave across the screen; a mode switch opens the matching swirl as a
circular mask from the click point; quick view drops the drip curtain;
clicks leave a ripple and bigger moves a ✦. Each method takes a swap
callback that fires while the screen is covered, and every one of them
falls back to a plain call if GSAP is missing — so a failed CDN cannot
strand the page mid-change.

**Photography is the gap.** Nine of the twenty products reuse the four
cut-outs and six street frames across fits and colourways; the rest lean
on chrome plates. Entry, hero and lookbook frames are the same six
photos. Real shoots would replace all of it.

## Deploying

There is no `index.html` at the repo root — the pages live in `prototypes/`.
`vercel.json` maps them onto clean URLs, so on Vercel:

| URL | Serves |
| --- | --- |
| `/` | `prototypes/loop-homepage.html` |
| `/dashboard` | `prototypes/loop-merchant-dashboard.html` |

Import the repo with **Framework Preset: Other**, no build command and no
output directory — it is plain static files. The asset paths are relative and
resolve to `/product-images/`, `/ugc-images/` and `/brand-assets/` from either
URL, so nothing needs rewriting to deploy.

## Status / what needs you

- **Shopify store itself** — needs your account + billing; follow
  `shopify/loop-shopify-setup.md`.
- **Real 3D (GLB) model** — the homepage showcase is a scroll/cursor-driven
  pseudo-3D of the garment render. A true rotating mesh needs ~20 Higgsfield
  credits (free plan had 6); top up and it can be swapped in.
- **French copy** — machine-translate then hand-check nav, hero, size chart,
  policies.
- **Extenda web licence** — optional; Anton is the substitute until then.
