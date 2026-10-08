/* ============================================================
   LOOP — transition controller
   One place that owns every screen-covering move, so pages,
   modes and sections all animate from the same vocabulary.

   Every public method returns a GSAP timeline (or a resolved
   promise-ish tween) and takes an optional swap callback that
   fires while the screen is covered.

   With prefers-reduced-motion the chrome plates are skipped and
   each move collapses to a short crossfade of the same length,
   so the swap callback still lands at the same point.
   ============================================================ */

const T = {
  ASSET: "images/transitions/",
  reduced: window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  layer: null,
  nodes: {},

  /* No GSAP means no covered swap is possible. Rather than drop the
     callback on the floor and strand the page mid-change, run it now. */
  instant(swap) { if (swap) swap(); return null; },
  get dead() { return typeof gsap === "undefined"; },

  init() {
    const layer = document.createElement("div");
    layer.className = "fx";
    layer.setAttribute("aria-hidden", "true");
    layer.innerHTML = `
      <div class="fx__fade"></div>
      <img class="fx__wave"  src="${this.ASSET}wave-wipe.webp"   alt="">
      <img class="fx__drip"  src="${this.ASSET}drip-curtain.webp" alt="">
      <div class="fx__swirl"><img src="${this.ASSET}men-swirl.webp" alt=""></div>
      <img class="fx__splash" src="${this.ASSET}splash.webp" alt="">
    `;
    document.body.appendChild(layer);

    this.layer = layer;
    this.nodes = {
      fade:   layer.querySelector(".fx__fade"),
      wave:   layer.querySelector(".fx__wave"),
      drip:   layer.querySelector(".fx__drip"),
      swirl:  layer.querySelector(".fx__swirl"),
      swirlImg: layer.querySelector(".fx__swirl img"),
      splash: layer.querySelector(".fx__splash"),
    };

    // honour the OS switch if it is flipped while the page is open
    window.matchMedia("(prefers-reduced-motion: reduce)")
      .addEventListener("change", (e) => { this.reduced = e.matches; });
    return this;
  },

  /* A plain crossfade, used on its own and as the reduced-motion
     stand-in for every other move. */
  fade(swap, dur = 0.5) {
    if (this.dead) return this.instant(swap);
    const n = this.nodes.fade;
    const tl = gsap.timeline();
    tl.set(this.layer, { pointerEvents: "auto" })
      .fromTo(n, { opacity: 0, display: "block" }, { opacity: 1, duration: dur / 2, ease: "power2.out" })
      .add(() => { if (swap) swap(); })
      .to(n, { opacity: 0, duration: dur / 2, ease: "power2.in" })
      .set(n, { display: "none" })
      .set(this.layer, { pointerEvents: "none" });
    return tl;
  },

  /* Route change: a chrome wave travels left to right, the content
     swaps behind it, and a sparkle pops where it leaves the frame. */
  waveWipe(swap) {
    if (this.dead) return this.instant(swap);
    if (this.reduced) return this.fade(swap, 0.5);
    const w = this.nodes.wave;
    const tl = gsap.timeline();
    tl.set(this.layer, { pointerEvents: "auto" })
      .set(w, { display: "block", xPercent: -130, scaleY: 1.9, opacity: 1 })
      .to(w, { xPercent: -15, duration: 0.5, ease: "power3.in" })
      .add(() => { if (swap) swap(); })
      .add(() => this.sparkle(window.innerWidth * 0.82, window.innerHeight * 0.5, 1.4))
      .to(w, { xPercent: 130, duration: 0.6, ease: "power3.out" })
      .set(w, { display: "none" })
      .set(this.layer, { pointerEvents: "none" });
    return tl;
  },

  /* Section entry: the curtain drips down over the section, then
     retracts upward to reveal it. */
  dripCurtain(swap) {
    if (this.dead) return this.instant(swap);
    if (this.reduced) return this.fade(swap, 0.45);
    const d = this.nodes.drip;
    const tl = gsap.timeline();
    tl.set(this.layer, { pointerEvents: "auto" })
      .set(d, { display: "block", yPercent: -105, opacity: 1 })
      .to(d, { yPercent: -4, duration: 0.5, ease: "power3.in" })
      .add(() => { if (swap) swap(); })
      .to(d, { yPercent: -112, duration: 0.65, ease: "power3.out" }, "+=0.05")
      .set(d, { display: "none" })
      .set(this.layer, { pointerEvents: "none" });
    return tl;
  },

  /* Mode switch: the matching swirl opens as a circular mask from
     the click point, turns while the content changes, then clears. */
  swirl(mode, x, y, swap) {
    if (this.dead) return this.instant(swap);
    if (this.reduced) return this.fade(swap, 0.55);
    const s = this.nodes.swirl;
    const img = this.nodes.swirlImg;
    img.src = `${this.ASSET}${mode === "women" ? "women" : "men"}-swirl.webp`;

    const far = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );
    const tl = gsap.timeline();
    tl.set(this.layer, { pointerEvents: "auto" })
      .set(s, { display: "block", opacity: 1, clipPath: `circle(0px at ${x}px ${y}px)` })
      .set(img, { rotate: 0, scale: 1.25 })
      .to(s, { clipPath: `circle(${far}px at ${x}px ${y}px)`, duration: 0.8, ease: "expo.out" })
      .to(img, { rotate: 14, scale: 1.4, duration: 1.1, ease: "power2.inOut" }, 0)
      .add(() => { if (swap) swap(); }, 0.55)
      .add(() => this.sparkle(x, y, 1.8), 0.6)
      .to(s, { opacity: 0, duration: 0.5, ease: "power2.in" }, "+=0.1")
      .set(s, { display: "none" })
      .set(this.layer, { pointerEvents: "none" });
    return tl;
  },

  /* "Enter the Loop": a splash bursts from the button, then clears. */
  splash(x, y, done) {
    if (this.dead) return this.instant(done);
    if (this.reduced) return this.fade(done, 0.45);
    const p = this.nodes.splash;
    const tl = gsap.timeline();
    tl.set(p, { display: "block", opacity: 0, scale: 0.25, xPercent: -50, yPercent: -50, left: x, top: y })
      .to(p, { opacity: 1, scale: 1.5, duration: 0.45, ease: "power3.out" })
      .add(() => { if (done) done(); }, 0.3)
      .to(p, { opacity: 0, scale: 2.4, duration: 0.6, ease: "power2.out" })
      .set(p, { display: "none" });
    return tl;
  },

  /* Click feedback — a chrome ripple that scales out and fades. */
  ripple(x, y) {
    if (this.reduced || this.dead) return;
    const el = document.createElement("img");
    el.className = "fx-ripple";
    el.src = `${this.ASSET}ripple.webp`;
    el.alt = "";
    el.style.left = x + "px";
    el.style.top = y + "px";
    document.body.appendChild(el);
    gsap.fromTo(el,
      { opacity: 0.75, scale: 0.08 },
      { opacity: 0, scale: 1.05, duration: 0.85, ease: "power2.out", onComplete: () => el.remove() }
    );
    setTimeout(() => el.remove(), 2000);   // backstop: never leak the node
  },

  /* The ✦ flash, used as punctuation on bigger moves. */
  sparkle(x, y, scale = 1) {
    if (this.reduced || this.dead) return;
    const el = document.createElement("img");
    el.className = "fx-sparkle";
    el.src = `${this.ASSET}sparkle.webp`;
    el.alt = "";
    el.style.left = x + "px";
    el.style.top = y + "px";
    document.body.appendChild(el);
    gsap.fromTo(el,
      { opacity: 0, scale: 0.2 * scale, rotate: -25 },
      {
        opacity: 1, scale: 1.1 * scale, rotate: 0, duration: 0.25, ease: "power3.out",
        onComplete: () => gsap.to(el, {
          opacity: 0, scale: 1.5 * scale, duration: 0.45,
          ease: "power2.in", onComplete: () => el.remove(),
        }),
      }
    );
    setTimeout(() => el.remove(), 2000);   // backstop: never leak the node
  },
};
