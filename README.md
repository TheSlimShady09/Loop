# LOOP — store package

Everything built so far for the LOOP streetwear launch (Canada / CAD).

```
LOOP-store/
├── prototypes/
│   ├── loop-homepage.html            Live homepage prototype — full identity,
│   │                                 rope-loop logo, load animation, scroll
│   │                                 reveals, and the 3D hoodie showcase
│   │                                 (image embedded, no external assets).
│   └── loop-merchant-dashboard.html  Store analytics dashboard prototype —
│                                     Overview / Sales / Products / Customers /
│                                     Inventory / Marketing, sample CAD data.
│
├── brand-assets/
│   ├── favicon.svg                   Rope mark only, Dark Khaki on Bright Gold.
│   ├── logo-white-on-gold.svg        Header — cream wordmark, gold ground.
│   ├── logo-black-on-gold.svg        Hero / gold sections — khaki wordmark.
│   └── logo-black-on-white.svg       Footer / cream sections.
│
├── product-images/
│   ├── loop-hoodie-gold-2048.png     Higgsfield render, full res (2048²).
│   └── loop-hoodie-gold-web.jpg      1200px compressed — the one embedded
│                                     in the homepage 3D showcase.
│
└── shopify/
    ├── loop-shopify-setup.md         Step-by-step build guide: currency,
    │                                 markets/EN-FR, theme colours + type,
    │                                 homepage sections, collections, variants,
    │                                 size chart, shipping, taxes, checklist,
    │                                 copy bank.
    └── loop-theme.css                Paste into Shopify Theme settings →
                                      Custom CSS. Anton headings, khaki nav,
                                      brand buttons, Palm Leaf / Sunflower badges.
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
| Bright Gold | `#F7DA39` | hero, primary accent, favicon ground |
| Sunflower Gold | `#FFBA4A` | hover, sale badges |
| Dark Khaki | `#373D20` | "black" — text, nav, footer |
| Olive Wood | `#7B562D` | borders, secondary buttons |
| Palm Leaf | `#8E9843` | new badges, tags |
| Cream | `#F4EDDA` | "white" — page ground |

- Display type: **Anton** (free stand-in for Extenda). Body: **Inter** (per brief).
- Tagline: **"Made for more"** — used as a full stop; recurs in product copy
  as *"Made for more <noun>"*.

## Status / what needs you

- **Shopify store itself** — needs your account + billing; follow
  `shopify/loop-shopify-setup.md`.
- **Real 3D (GLB) model** — the homepage showcase is a scroll/cursor-driven
  pseudo-3D of the garment render. A true rotating mesh needs ~20 Higgsfield
  credits (free plan had 6); top up and it can be swapped in.
- **French copy** — machine-translate then hand-check nav, hero, size chart,
  policies.
- **Extenda web licence** — optional; Anton is the substitute until then.
