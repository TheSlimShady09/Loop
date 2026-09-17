# LOOP — Shopify build guide

Everything needed to stand up the LOOP store. Work top to bottom; each
section is a screen in Shopify admin. Items marked **[you]** need your
login or a business decision I can't make for you (account, billing, tax
registration, publishing).

Brand: **LOOP** · Tagline: **"Made for more"** · Market: **Canada** (CAD),
US as optional secondary · Category: streetwear / apparel.

Assets in this folder:

| File | Use |
| --- | --- |
| `favicon.svg` | Favicon — rope mark only, Dark Khaki on Bright Gold |
| `logo-white-on-gold.svg` | Header logo (cream wordmark, gold ground) |
| `logo-black-on-gold.svg` | Hero / gold sections (khaki wordmark) |
| `logo-black-on-white.svg` | Footer / cream sections |
| `loop-theme.css` | Paste into theme Custom CSS |
| `loop-storefront.html` | Living visual reference for the homepage (the published artifact) |

---

## 0. Account & plan **[you]**

1. Create the store at [shopify.com](https://www.shopify.com) → **Start free trial**.
2. Store name: `LOOP` (Shopify will suggest a `.myshopify.com` subdomain like `loop-apparel.myshopify.com` — fine as the internal URL).
3. Buy the real domain under **Settings → Domains** (e.g. `loopapparel.ca` or `wearloop.ca`). A `.ca` reinforces the Canadian positioning.
4. Plan: **Basic** is enough to launch. Upgrade to **Shopify** (mid tier) once you need lower card rates or more staff accounts.

---

## 1. Store standards — currency, region, units

**Settings → General**

- Store currency: **Canadian Dollar (CAD)**. ⚠️ This is permanent-ish — changing it later requires Shopify support and breaks historical reports. Set it correctly now.
- Store address / billing region: Canada.
- Time zone: your operating zone (e.g. `(GMT-05:00) Eastern Time`).
- Unit system: **Metric**. Default weight unit: **kg** (used for shipping rates).
- Order ID format: prefix `LOOP-` → orders read `LOOP-1001`.

**Settings → Store details**

- Store name: `LOOP`
- "Powered by Shopify" — remove it via Custom CSS (already handled: add `.footer .powered-by { display:none; }` if your theme shows it) or the theme editor.

---

## 2. Markets & bilingual EN/FR

**Settings → Markets**

- **Canada** — primary market. Currency CAD. Assign your `.ca` domain here.
- **United States** — add as a second market only if you plan to ship there.
  Currency USD, let Shopify auto-convert with a rounding rule (`.00` or `.99`).
  Add a US shipping zone (section 6) before activating.

**Languages (bilingual — "nice to have" per brief)**

1. **Settings → Languages → Add language → French (Canada) `fr-CA`.**
2. Install **Translate & Adapt** (free, first-party Shopify app).
3. Auto-translate the store, then hand-correct: navigation, product titles,
   the homepage hero, size chart, and policies. Streetwear copy is
   voice-heavy — don't ship raw machine French for anything customer-facing.
4. Theme editor → Header → enable the **language selector**. Place it in the
   header on desktop, in the footer on mobile.
5. French tagline options for "Made for more":
   - `Fait pour plus.` (literal, punchy — recommended)
   - `Toujours plus.` (looser, more native-feeling)
   Pick one and use it consistently the way EN uses "Made for more".

---

## 3. Theme

**Online Store → Themes.**

**Recommended:** start on **Dawn** (free, fastest, best-maintained) and apply
the LOOP look through settings + `loop-theme.css`. It matches the homepage
structure in the brief exactly.

If you want a premium streetwear feel out of the box and have ~$400 CAD
budget: **Impulse** or **Motion** (both by Archetype). They ship with the
sticky promo bar, large-type hero, and lookbook sections streetwear stores
lean on. The colour/type steps below still apply — the setting names are
nearly identical.

### 3.1 Colors — **Theme settings → Colors**

Dawn uses "colour schemes". Set them up like this:

| Scheme | Background | Text | Button | Button label | Used for |
| --- | --- | --- | --- | --- | --- |
| **Scheme 1** (default) | `#F4EDDA` cream | `#373D20` | `#373D20` | `#F7DA39` | Body, product pages, collection grid |
| **Scheme 2** (accent / hero) | `#F7DA39` gold | `#373D20` | `#373D20` | `#F7DA39` | Full-bleed hero, CTA banners |
| **Scheme 3** (dark) | `#373D20` khaki | `#F4EDDA` cream | `#F7DA39` | `#373D20` | Brand-story block, footer |
| **Scheme 4** (secondary) | `#F4EDDA` cream | `#373D20` | `#7B562D` olive | `#F4EDDA` | Secondary buttons, sale sections |

- Badge / "on sale" accent: `#8E9843` Palm Leaf for **New**, `#FFBA4A`
  Sunflower for **Sale** (handled in `loop-theme.css`).
- Never use `#000000` or `#FFFFFF`. Khaki is the black, cream is the white.

### 3.2 Typography — **Theme settings → Typography**

- **Headings:** Shopify's font picker doesn't include Anton or Extenda.
  Closest built-in is **"Archivo"** at the heaviest weight, or **"Assistant"** —
  set it there as a fallback, then `loop-theme.css` overrides all headings
  and buttons with **Anton** loaded from Google Fonts. That gives you the
  chunky condensed display face the brief asks for.
  - If you license **Extenda** for web later: upload the `.woff2` files as
    theme assets and change the `@import` line in `loop-theme.css` to a
    local `@font-face`.
- **Body:** set to **"Inter"** if available in the picker (some theme
  versions list it), otherwise **"Assistant"** or **"Work Sans"**. Body copy
  stays on this face — the CSS only forces the display face on headings.
- Heading scale: base size 100%, heading scale **140–150%** (big, loud).
- Letter spacing on headings: `0` to `+0.01em` (Anton is already tight).
- Button text: uppercase (theme setting "Uppercase buttons" → on).

### 3.3 Layout / shape — **Theme settings**

- Corner radius: inputs/buttons `6px`, cards `6px`, image `4px`. Slightly
  soft, not pill-shaped — streetwear reads better squared-off.
- Page width: `1200px`.
- Spacing between sections: `Large`.
- Animations: "Reveal on scroll" → **on**; "Hover effect" on product cards →
  **Zoom** (subtle). Keep it restrained.
- Card style: **Standard**, image ratio **Portrait (4:5)**, show second image
  on hover **on**, show vendor **off**.

### 3.4 Custom CSS

Paste the full contents of `loop-theme.css` into
**Theme settings → scroll to bottom → Custom CSS**. Save. Preview on mobile
and desktop.

---

## 4. Logo & favicon

**Theme settings → Logo**

- Desktop logo: upload a PNG export of `logo-white-on-gold.svg` at **500px**
  wide, transparent background *(export the wordmark + rope only, no gold
  rectangle — the khaki nav is the background)*. Actually: export
  `logo-white-on-gold.svg` art on transparent → cream wordmark + olive rope.
- Logo max width: `140px` desktop, `110px` mobile.
- Favicon: upload `favicon.svg` (Shopify accepts SVG and will also take a
  512×512 PNG). This is the rope mark alone on Bright Gold — exactly the
  brief's spec.

Keep all three logo SVGs in **Content → Files** so you can drop them into
sections and emails.

---

## 5. Homepage — section by section

**Online Store → Themes → Customize.** Build the homepage to match the
published reference (`loop-storefront.html`). Order of sections:

1. **Announcement bar** — Scheme 3 (khaki). Text:
   `FREE SHIPPING IN CANADA OVER $150 — MADE FOR MORE`. Auto-rotate a
   second message: `NEW: THE LOOP HOODIE →`.

2. **Header** — Scheme 3 (khaki), sticky. Logo left, menu centre, cart +
   search + language right. Menu: `Shop · Best Sellers · Outerwear · Story`.

3. **Image banner / Hero** — Scheme 2 (gold), full width, **large** height.
   - Heading: `MADE FOR MORE` (H0 / largest).
   - Subheading: `Heavyweight streetwear, drawn in Canada. Built to loop back for.`
   - Button 1 (primary): `SHOP THE DROP` → `/collections/all`
   - Button 2 (outline): `OUR STORY` → `/pages/story`
   - Background: solid gold (no photo needed for launch) or a desaturated
     lookbook shot with a gold overlay at 40%.

4. **Featured collection — "The line-up"** — Scheme 1 (cream). 4 collections
   as a grid (use the **Collage** or **Multicolumn** section with collection
   images): Hoodies · Tees · Outerwear · Accessories. Caption each with its
   "Made for more…" line (section 8).

5. **Rich text — Brand story** — Scheme 3 (khaki, cream text).
   - Eyebrow: `THE NAME`
   - Heading: `ONE LOOP OF ROPE. ONE IDEA: COME BACK FOR MORE.`
   - Body: story copy from section 8.
   - Button: `READ THE FULL STORY` → `/pages/story`

6. **Featured collection — "Best sellers"** — Scheme 1. Source = the
   `best-sellers` collection. Show 4–8, carousel on mobile, "Shop all" link.

7. **Instagram / UGC gallery** — Scheme 1. Use a free UGC app
   (**Instafeed** or **Foursixty**) or a static **Multicolumn** of 6 images
   with `@loop.wear` captions. Heading: `@LOOP.WEAR`.

8. **Email signup** — Scheme 2 (gold) or Scheme 3.
   - Heading: `GET ON THE LIST`
   - Text: `Early access to every drop. No spam — just first dibs.`
   - Connect to **Shopify Email** (free up to 10k sends/mo) or Klaviyo.

9. **Footer** — Scheme 3 (khaki). Columns: Shop · Help · Brand · Newsletter.
   Payment icons on, language + country selector on, social links to IG/TikTok.

---

## 6. Navigation menus

**Online Store → Navigation.**

**Main menu**
- Shop ▾ → Hoodies, Tees, Outerwear, Accessories, New Arrivals, Sale
- Best Sellers → `/collections/best-sellers`
- Outerwear → `/collections/outerwear`
- Story → `/pages/story`

**Footer menu**
- Shop: Hoodies, Tees, Outerwear, Accessories
- Help: Size Chart, Shipping & Returns, Track Order, Contact
- Brand: Our Story, Journal, Stockists

---

## 7. Catalog structure

### 7.1 Collections — **Products → Collections**

| Collection | Handle | Type | Condition |
| --- | --- | --- | --- |
| Hoodies & Fleece | `hoodies` | Automated | Product type = `Hoodie` OR tag = `hoodie` |
| T-Shirts | `tees` | Automated | Product type = `Tee` |
| Outerwear | `outerwear` | Automated | Product type = `Jacket` OR `Outerwear` |
| Accessories | `accessories` | Automated | Product type = `Accessory` |
| New Arrivals | `new-arrivals` | Automated | Tag = `new` |
| Best Sellers | `best-sellers` | Manual (or automated on `bestseller` tag) | — |
| Sale | `sale` | Automated | "Compare at price" is greater than `0` |
| All Products | `all` | (Shopify default) | — |

Give Hoodies / Tees / Outerwear / Accessories a **collection image** (a
lookbook shot or a flat-lay on cream) — that's what section 5.4 renders.

### 7.2 Products — options & variants

Standard apparel setup. For each garment:

- **Option 1: Size** — values depending on category:
  - Tops / hoodies / outerwear: `XS, S, M, L, XL, XXL`
  - Bottoms: `28, 30, 32, 34, 36`
  - Accessories (beanies etc.): `One Size`
- **Option 2: Color** — e.g. `Bright Gold, Dark Khaki, Olive, Cream, Palm`.
- Track inventory per variant. Set `Continue selling when out of stock` = off.
- **Weights** (for shipping): tee ~0.25 kg, hoodie ~0.7 kg, jacket ~1.2 kg,
  beanie ~0.1 kg.
- **Product type** must match the collection conditions above
  (`Hoodie` / `Tee` / `Jacket` / `Accessory`).
- **Tags:** `new`, `bestseller`, plus season/material tags.
- Barcodes/SKUs: `LOOP-<style>-<colour>-<size>` e.g. `LOOP-HOOD-KHK-M`.

### 7.3 Metafields (optional but worth it)

**Settings → Custom data → Products** — add:
- `Fit` (single line): `Oversized`, `Regular`, `Cropped`
- `Fabric weight` (single line): e.g. `480 gsm`
- `Model wears` (single line): e.g. `Model is 183 cm, wears M`
Then add these to the product template in the theme editor under
**Product information → Add block → Metafield**.

---

## 8. Copy bank

### Tagline
`Made for more` — use as a full stop, not a sentence fragment. Recurs in
product copy as `Made for more <noun>`.

### Homepage strings
- Hero H1: `MADE FOR MORE`
- Hero sub: `Heavyweight streetwear, drawn in Canada. Built to loop back for.`
- Announcement: `FREE SHIPPING IN CANADA OVER $150 — MADE FOR MORE`
- Story eyebrow / head: `THE NAME` / `ONE LOOP OF ROPE. ONE IDEA: COME BACK FOR MORE.`
- Story body:
  > LOOP started in a Canadian garage with a lasso knot and a heavyweight
  > blank. We cut everything oversized, brush every fleece twice, and stitch
  > a rope-loop label into the hem so you always know where it came from.
  >
  > No seasonal churn. No throwaway fits. Just pieces made to be worn into
  > the ground and bought again.
- Newsletter: `GET ON THE LIST` / `Early access to every drop. No spam — just first dibs.`
- Empty cart: `Nothing here yet. Go get more.`
- 404: `This one looped out. Head back to the drop.`

### Collection captions
| Collection | Caption |
| --- | --- |
| Hoodies | Made for more cold starts |
| Tees | Made for more everyday |
| Outerwear | Made for more weather |
| Accessories | Made for more carry |

### Product description template
```
[One-line hook — "Made for more <noun>."]

[2–3 short sentences. What it's made of, how it fits, why it lasts.
 Confident, punchy, no fluff.]

• Fabric: <weight / composition>
• Fit: <Oversized / Regular>. <Model note>
• <Detail — rope-loop hem label, double-brushed interior, YKK zip>
• Designed in Canada

Made for more.
```

Example — **The Loop Hoodie**
```
Made for more cold starts.

A 480 gsm brushed-back hoodie with a boxy, dropped-shoulder cut. Heavy
enough to skip a jacket, soft enough to live in. The rope-loop label is
stitched into the left hem — that's how you know.

• Fabric: 480 gsm, 80% cotton / 20% recycled poly, double-brushed interior
• Fit: Oversized. Model is 183 cm, wearing M
• Rope-loop woven hem label · ribbed cuffs that hold their shape
• Designed in Canada

Made for more.
```

### Microcopy
- Add to cart → toast: `Added — made for more.`
- Newsletter success: `You're on the list. Watch your inbox for the first drop.`
- Shipping page header: `Made for more miles. Here's how it gets to you.`

---

## 9. Size chart page

**Online Store → Pages → Add page**, title **Size Chart**, handle
`size-chart`. Link it from the footer and from each product page (theme
editor → Product → add a "Collapsible row" or install a free size-chart app
like **Kiwi Sizing** for a popup).

**Content (EN):**

> ### How LOOP fits
> Our tops are cut **oversized** — if you want a regular fit, size down one.
> Bottoms run true to waist size. Measurements are of the garment laid flat,
> in centimetres. Allow ±1.5 cm.
>
> **Tops (Hoodies, Tees, Crews)**
>
> | Size | Chest (flat) | Length (HPS) | Sleeve |
> | --- | --- | --- | --- |
> | XS | 54 | 68 | 60 |
> | S  | 57 | 70 | 61 |
> | M  | 60 | 72 | 63 |
> | L  | 63 | 74 | 65 |
> | XL | 66 | 76 | 66 |
> | XXL| 70 | 78 | 67 |
>
> **Bottoms**
>
> | Size | Waist | Inseam | Front rise |
> | --- | --- | --- | --- |
> | 28 | 74 | 74 | 27 |
> | 30 | 79 | 74 | 28 |
> | 32 | 84 | 75 | 29 |
> | 34 | 89 | 75 | 30 |
> | 36 | 94 | 76 | 31 |
>
> **How to measure:** lay a garment you already like flat and compare.
> Chest = pit to pit. Length = highest point of shoulder (HPS) straight down.
>
> Still unsure? Email **fit@loopapparel.ca** — we answer in a day.

Translate to `fr-CA` in Translate & Adapt (keep the cm values, translate
headers: *Poitrine, Longueur, Manche, Taille, Entrejambe, Montant*).

---

## 10. Shipping **[you]**

**Settings → Shipping and delivery.**

### Canada (primary zone)
Create rate zone **Canada**. Suggested rates (tune to your carrier quote):

| Rate name | Condition | Price |
| --- | --- | --- |
| Standard (3–7 business days) | order < $150 | `$12.00 CAD` |
| Free standard | order ≥ $150 | `$0.00` |
| Express (1–3 business days) | all | `$22.00 CAD` |

- Connect **Canada Post** (and optionally **UPS**) under **Carrier accounts**
  to show live calculated rates instead of flat rates once volume grows.
- Turn on **Shopify Shipping** to buy discounted Canada Post labels in admin.

### United States (secondary zone) — only if shipping there
| Rate name | Condition | Price |
| --- | --- | --- |
| Standard to US (5–10 days) | order < $200 | `$25.00 CAD` |
| Free to US | order ≥ $200 | `$0.00` |

- Add a note at checkout: `US orders: import duties & taxes collected at
  delivery.` Or enable **Managed Markets / DDP** so duties are prepaid.

### Packaging
Default package: poly mailer `30×40 cm`, ~`0.05 kg`. Add a box for jackets.

---

## 11. Taxes **[you]**

**Settings → Taxes and duties → Canada.**

- Register for a **GST/HST number** with CRA before you cross $30k in sales
  (you can register voluntarily from day one — usually worth it).
- Enter the number in Shopify; it auto-applies the right rate per province
  (5% GST / 13% HST / 15% HST / GST+PST/QST depending on ship-to province).
- Decide: **tax included in prices** (cleaner for apparel, common in Canada
  DTC) or added at checkout. If included, tick "All prices include tax" and
  set price points to round numbers ($98, $120).
- If you activate the US market, set up US tax via Shopify Tax (nexus-based).

I can't register you with CRA or file anything — that's on you or your
accountant.

---

## 12. Policies & pages

**Settings → Policies** — generate from Shopify templates, then edit:
- Refund policy: 30-day returns, unworn with tags, customer pays return
  shipping unless the item was faulty. Final sale on `Sale` items — state it.
- Privacy, Terms of Service, Shipping policy.
- Contact information page.

**Pages to create:** `Story` (long-form brand story), `Journal` (blog — use
**Online Store → Blog posts**), `Stockists`, `Track Order`, `Contact` (use
the `page.contact` template).

---

## 13. Apps (keep it lean)

| Need | App | Cost |
| --- | --- | --- |
| FR translation | Translate & Adapt | Free (first-party) |
| Email / flows | Shopify Email or Klaviyo | Free tier |
| Reviews | Judge.me | Free tier |
| Size chart popup | Kiwi Sizing | Free tier |
| Instagram feed | Instafeed | Free tier |
| Bundles / promos | Shopify Functions (native discounts) | Free |

Resist installing more — each app adds script weight and hurts mobile speed,
which matters most for your apparel traffic.

---

## 14. Pre-launch checklist

- [ ] Currency = CAD, confirmed before first order
- [ ] `.ca` domain live and set as primary, SSL green
- [ ] Favicon shows the rope mark (hard-refresh to check)
- [ ] Logo crisp on retina, correct variant in header vs footer
- [ ] Homepage matches the reference on **mobile** first, then desktop
- [ ] All 4 category collections have images and products
- [ ] Every product: size + colour variants, weight, product type, price, 1+ image
- [ ] Size chart page linked from footer + product pages
- [ ] Canada shipping rates tested with a $50 and a $200 test cart
- [ ] Taxes: GST/HST number entered (or conscious decision to defer)
- [ ] Policies filled in, not placeholder text
- [ ] Checkout test order with Shopify's **Bogus Gateway**, then a real $1 order
- [ ] Google/Meta: connect **Shopify → Google & YouTube** and **Meta** channels for the product feed
- [ ] `robots.txt` / SEO: store not password-protected, homepage title =
      `LOOP — Streetwear Made for More | Designed in Canada`
- [ ] Reduced-motion: animations still readable with motion off
- [ ] FR: navigation, hero, size chart, policies hand-checked

---

## 15. What I can't do from here

- Log into or create your Shopify account, or enter billing details.
- Register your business or GST/HST number with the CRA.
- Publish the theme live or point DNS — you approve those.
- License Extenda for web (needs a purchase from the foundry).

Hand me admin access to a dev/staging store (or a theme `.zip`) and I can
wire the sections, `loop-theme.css`, and Liquid snippets directly instead of
you doing it in the editor.
