/* ============================================================
   LOOP — catalogue
   One flat array; every view filters it. Prices in CAD.
   Photography is thin: the four cut-outs and six street frames
   are reused across fits and colourways until real shoots land.
   ============================================================ */

const IMG = {
  hoodie: "product-images/loop-hoodie-cutout.webp",
  tee:    "product-images/loop-tee-beige-cutout.webp",
  jacket: "product-images/loop-jacket-khaki-cutout.webp",
  beanie: "product-images/loop-beanie-gold-cutout.webp",
};

const SHOT = {
  miles:    "ugc-images/loop-ugc-miles.webp",
  layers:   "ugc-images/loop-ugc-layers.webp",
  mornings: "ugc-images/loop-ugc-mornings.webp",
  nights:   "ugc-images/loop-ugc-nights.webp",
  weekends: "ugc-images/loop-ugc-weekends.webp",
  reps:     "ugc-images/loop-ugc-reps.webp",
};

/* Entry, hero and lookbook frames per mode. */
const MODE_ART = {
  women: {
    entry:    SHOT.miles,
    hero:     SHOT.layers,
    lookbook: [SHOT.miles, SHOT.layers, SHOT.mornings, SHOT.weekends],
    label:    "Women",
  },
  men: {
    entry:    SHOT.reps,
    hero:     SHOT.weekends,
    lookbook: [SHOT.reps, SHOT.nights, SHOT.weekends, SHOT.mornings],
    label:    "Men",
  },
};

const CATEGORIES = {
  women: ["Dresses", "Tops", "Skirts & Pants", "Jackets", "Bags", "Jewelry", "Shoes"],
  men:   ["Hoodies", "Tees", "Pants", "Jackets", "Caps", "Chains & Rings", "Sneakers"],
};

const TOPS  = ["XS", "S", "M", "L", "XL", "XXL"];
const ONE   = ["One size"];
const SHOES = ["38", "39", "40", "41", "42", "43", "44"];

const COLORS = {
  gold:  { name: "Bright Gold", hex: "#f7da39" },
  sand:  { name: "Sand",        hex: "#d6c49f" },
  khaki: { name: "Dark Khaki",  hex: "#4a4327" },
  olive: { name: "Olive",       hex: "#7b562d" },
  chrome:{ name: "Chrome",      hex: "#c9ccd1" },
  ink:   { name: "Ink",         hex: "#1a1a1a" },
};

const PRODUCTS = [
  /* ---------- WOMEN ---------- */
  { id: "w1", mode: "women", category: "Tops",           isAccessory: false, name: "Loop Hoodie — Cropped", price: 112, images: [IMG.hoodie, SHOT.miles],    sizes: TOPS,  colors: [COLORS.gold, COLORS.sand],  blurb: "480 gsm fleece, cropped hem" },
  { id: "w2", mode: "women", category: "Tops",           isAccessory: false, name: "Rope Logo Tee — Relaxed", price: 48, images: [IMG.tee, SHOT.layers],     sizes: TOPS,  colors: [COLORS.sand, COLORS.ink],   blurb: "240 gsm combed cotton" },
  { id: "w3", mode: "women", category: "Jackets",        isAccessory: false, name: "Work Jacket — Boxy",    price: 210, images: [IMG.jacket, SHOT.weekends], sizes: TOPS,  colors: [COLORS.khaki],              blurb: "Waxed cotton canvas" },
  { id: "w4", mode: "women", category: "Skirts & Pants", isAccessory: false, name: "Every-Mile Pant",       price: 98,  images: [SHOT.miles],                sizes: TOPS,  colors: [COLORS.ink, COLORS.sand],   blurb: "Brushed fleece, tapered" },
  { id: "w5", mode: "women", category: "Dresses",        isAccessory: false, name: "Chrome Slip Dress",     price: 168, images: [SHOT.mornings],             sizes: TOPS,  colors: [COLORS.chrome],             blurb: "Liquid satin, bias cut" },
  { id: "w6", mode: "women", category: "Tops",           isAccessory: false, name: "Every-Mile Crew",       price: 88,  images: [IMG.hoodie, SHOT.layers],   sizes: TOPS,  colors: [COLORS.sand],               blurb: "Brushed fleece, cream" },
  { id: "w7", mode: "women", category: "Bags",           isAccessory: true,  name: "Chrome Shoulder Bag",   price: 148, images: [SHOT.nights],               sizes: ONE,   colors: [COLORS.chrome],             blurb: "Mirror-finish shell" },
  { id: "w8", mode: "women", category: "Jewelry",        isAccessory: true,  name: "Sparkle Pendant ✦",     price: 64,  images: ["images/transitions/sparkle.webp"], sizes: ONE, colors: [COLORS.chrome],    blurb: "Four-point star, steel" },
  { id: "w9", mode: "women", category: "Bags",           isAccessory: true,  name: "Canvas Tote",           price: 38,  images: [SHOT.weekends],             sizes: ONE,   colors: [COLORS.sand],               blurb: "16 oz cotton" },
  { id: "w10",mode: "women", category: "Shoes",          isAccessory: true,  name: "Loop Runner",           price: 190, images: [SHOT.miles],                sizes: SHOES, colors: [COLORS.chrome, COLORS.ink], blurb: "Moulded chrome sole" },

  /* ---------- MEN ---------- */
  { id: "m1", mode: "men", category: "Hoodies",        isAccessory: false, name: "The Loop Hoodie",   price: 118, images: [IMG.hoodie, SHOT.nights],   sizes: TOPS,  colors: [COLORS.gold, COLORS.khaki], blurb: "480 gsm brushed-back fleece" },
  { id: "m2", mode: "men", category: "Tees",           isAccessory: false, name: "Rope Logo Tee",     price: 48,  images: [IMG.tee, SHOT.reps],        sizes: TOPS,  colors: [COLORS.sand, COLORS.ink],   blurb: "240 gsm combed cotton, boxy" },
  { id: "m3", mode: "men", category: "Jackets",        isAccessory: false, name: "Khaki Work Jacket", price: 210, images: [IMG.jacket, SHOT.reps],     sizes: TOPS,  colors: [COLORS.khaki],              blurb: "Waxed canvas, chore cut" },
  { id: "m4", mode: "men", category: "Hoodies",        isAccessory: false, name: "Every-Mile Crew",   price: 88,  images: [IMG.hoodie, SHOT.weekends], sizes: TOPS,  colors: [COLORS.olive],              blurb: "Brushed fleece, olive" },
  { id: "m5", mode: "men", category: "Pants",          isAccessory: false, name: "Utility Pant",      price: 128, images: [SHOT.weekends],             sizes: TOPS,  colors: [COLORS.khaki, COLORS.ink],  blurb: "Ripstop, double knee" },
  { id: "m6", mode: "men", category: "Tees",           isAccessory: false, name: "Chrome Graphic Tee",price: 54,  images: [IMG.tee, SHOT.mornings],    sizes: TOPS,  colors: [COLORS.ink],                blurb: "Liquid-chrome print" },
  { id: "m7", mode: "men", category: "Caps",           isAccessory: true,  name: "Lasso Beanie",      price: 34,  images: [IMG.beanie],                sizes: ONE,   colors: [COLORS.gold, COLORS.khaki], blurb: "Merino rib, folded cuff" },
  { id: "m8", mode: "men", category: "Caps",           isAccessory: true,  name: "Loop Cap",          price: 42,  images: [SHOT.nights],               sizes: ONE,   colors: [COLORS.khaki],              blurb: "Washed twill, strap back" },
  { id: "m9", mode: "men", category: "Chains & Rings", isAccessory: true,  name: "Infinity Chain",    price: 96,  images: ["images/transitions/infinity-loop.webp"], sizes: ONE, colors: [COLORS.chrome], blurb: "Polished steel ribbon" },
  { id: "m10",mode: "men", category: "Sneakers",       isAccessory: true,  name: "Loop Runner",       price: 190, images: [SHOT.layers],               sizes: SHOES, colors: [COLORS.chrome, COLORS.ink], blurb: "Moulded chrome sole" },
];

const byMode = (mode) => PRODUCTS.filter((p) => p.mode === mode);
