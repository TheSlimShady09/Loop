/* ============================================================
   LOOP — application
   Sections are rendered from PRODUCTS; every screen-covering
   move goes through the transition controller in transitions.js.
   ============================================================ */

const $  = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const REDUCED = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const App = {
  mode: null,
  category: "All",
  cart: [],

  /* ---------------------------------------------------------
     boot
     --------------------------------------------------------- */
  init() {
    T.init();
    this.pointerFx();
    this.smoothScroll();
    this.loader();
    this.entry();
    this.header();
    this.drawCart();
    this.newsletter();
  },

  /* ---------------------------------------------------------
     intro loader — infinity turns, blob breathes, then the
     wordmark takes their place
     --------------------------------------------------------- */
  loader() {
    const el = $("#loader");
    const start = Date.now();
    let handed = false;

    if (!REDUCED) {
      gsap.to("#loader-inf",  { rotate: 360, duration: 2.4, ease: "none", repeat: -1 });
      gsap.to("#loader-blob", { scale: 1.14, duration: 0.9, ease: "sine.inOut", yoyo: true, repeat: -1 });
    }

    const finish = () => {
      /* Reveal first, animate second. The exit used to be the last step
         of a GSAP timeline, which meant the whole site stayed behind the
         loader if the ticker never advanced — and rAF does not advance in
         a background tab, or in a headless render. The reveal now happens
         on a plain call; the timeline only dresses it. */
      this.afterLoader();

      if (typeof gsap === "undefined") { el.style.display = "none"; return; }
      gsap.timeline()
        .to("#loader-shapes", { opacity: 0, scale: 0.7, duration: 0.4, ease: "power2.in" })
        .fromTo("#loader-mark", { opacity: 0, scale: 0.82 },
                                { opacity: 1, scale: 1, duration: 0.55, ease: "expo.out" })
        .add(() => T.sparkle(window.innerWidth / 2, window.innerHeight / 2, 2))
        .to(el, { opacity: 0, duration: 0.5, ease: "power2.in" }, "+=0.35")
        .set(el, { display: "none" });
    };

    const done = () => {
      if (handed) return;
      handed = true;
      setTimeout(finish, Math.max(0, 1700 - (Date.now() - start)));
    };
    if (document.readyState === "complete") done();
    else window.addEventListener("load", done);
    setTimeout(done, 4000);           // never hang on a stalled asset
  },

  afterLoader() {
    let saved = null;
    try { saved = localStorage.getItem("loop-mode"); } catch (e) {}
    if (saved === "women" || saved === "men") {
      this.setMode(saved, { animate: false });
    } else {
      $("#entry").hidden = false;
      gsap.fromTo(".entry__half",
        { opacity: 0, scale: 1.06 },
        { opacity: 1, scale: 1, duration: 0.9, stagger: 0.12, ease: "expo.out" });
    }
  },

  /* ---------------------------------------------------------
     entry screen — two halves, a seam that bends toward the
     half you are not on
     --------------------------------------------------------- */
  entry() {
    const entry = $("#entry");
    const seam = $("#seam");

    $$(".entry__half", entry).forEach((half) => {
      const mode = half.dataset.mode;
      const other = entry.querySelector('.entry__half:not([data-mode="' + mode + '"])');

      const grow = () => {
        if (REDUCED) return;
        half.classList.add("is-active");
        gsap.to(half,  { flexGrow: 1.9, duration: 0.7, ease: "expo.out" });
        gsap.to(other, { flexGrow: 1,   duration: 0.7, ease: "expo.out" });
        gsap.to(seam,  { x: mode === "women" ? 26 : -26, skewX: mode === "women" ? -4 : 4,
                         duration: 0.7, ease: "expo.out" });
      };
      const reset = () => {
        if (REDUCED) return;
        half.classList.remove("is-active");
        gsap.to($$(".entry__half", entry), { flexGrow: 1, duration: 0.6, ease: "power3.out" });
        gsap.to(seam, { x: 0, skewX: 0, duration: 0.6, ease: "power3.out" });
      };

      half.addEventListener("mouseenter", grow);
      half.addEventListener("mouseleave", reset);
      half.addEventListener("focus", grow);
      half.addEventListener("blur", reset);

      half.addEventListener("click", (e) => {
        T.ripple(e.clientX, e.clientY);
        T.swirl(mode, e.clientX, e.clientY, () => {
          entry.hidden = true;
          this.setMode(mode, { animate: false });
        });
      });
    });
  },

  /* ---------------------------------------------------------
     mode
     --------------------------------------------------------- */
  setMode(mode, { animate = true, from = null } = {}) {
    const apply = () => {
      this.mode = mode;
      this.category = "All";
      document.documentElement.setAttribute("data-mode", mode);
      try { localStorage.setItem("loop-mode", mode); } catch (e) {}

      $("#site").hidden = false;
      $("#entry").hidden = true;
      $("#mode-label").textContent = MODE_ART[mode].label;
      $("#toggle-label").textContent = mode === "women" ? "Men" : "Women";
      $("#hero-shot").src = MODE_ART[mode].hero;
      $$(".mode-word").forEach((n) => { n.textContent = MODE_ART[mode].label; });

      this.renderCategories();
      this.renderRing();
      this.renderGrid();
      this.renderAccessories();
      this.renderLookbook();
      this.revealOnScroll();
      Hero3D.start();
      window.scrollTo(0, 0);
    };

    if (!animate) { apply(); return; }
    const x = from ? from.x : window.innerWidth / 2;
    const y = from ? from.y : 60;
    T.swirl(mode, x, y, apply);
  },

  header() {
    $("#mode-toggle").addEventListener("click", (e) => {
      const next = this.mode === "women" ? "men" : "women";
      T.ripple(e.clientX, e.clientY);
      this.setMode(next, { animate: true, from: { x: e.clientX, y: e.clientY } });
    });

    $("#enter-loop").addEventListener("click", (e) => {
      T.ripple(e.clientX, e.clientY);
      T.splash(e.clientX, e.clientY, () => {
        $("#ring-section").scrollIntoView({ behavior: REDUCED ? "auto" : "smooth" });
      });
    });

    $("#cart-open").addEventListener("click", () => this.openCart(true));
    $("#cart-close").addEventListener("click", () => this.openCart(false));
    $("#cart-scrim").addEventListener("click", () => this.openCart(false));
  },

  /* ---------------------------------------------------------
     the ring — products on a rotating 3D carousel
     --------------------------------------------------------- */
  renderRing() {
    const ring = $("#ring");
    const items = byMode(this.mode).filter((p) => !p.isAccessory).slice(0, 8);
    const step = 360 / items.length;
    const radius = window.innerWidth < 760 ? 330 : 520;

    ring.innerHTML = items.map((p, i) =>
      '<button class="ring__item" data-id="' + p.id + '" style="transform: rotateY(' +
      (i * step) + 'deg) translateZ(' + radius + 'px)">' +
      '<span class="ring__frame"><img src="' + p.images[0] + '" alt="' + p.name + '" loading="lazy"></span>' +
      '<span class="ring__name">' + p.name + '</span>' +
      '<span class="ring__price">$' + p.price + '</span></button>').join("");

    let angle = 0, dragging = false, lastX = 0, velocity = 0;
    const draw = () => { ring.style.transform = "translateZ(-" + radius + "px) rotateY(" + angle + "deg)"; };
    draw();

    if (!REDUCED) {
      const spin = () => {
        if (!dragging) {
          angle += velocity || 0.035;
          velocity *= 0.94;
          if (Math.abs(velocity) < 0.002) velocity = 0;
          draw();
        }
        requestAnimationFrame(spin);
      };
      spin();
    }

    ring.addEventListener("pointerdown", (e) => { dragging = true; lastX = e.clientX; velocity = 0; ring.classList.add("is-dragging"); });
    window.addEventListener("pointermove", (e) => {
      if (!dragging) return;
      const d = (e.clientX - lastX) * 0.28;
      angle += d; velocity = d; lastX = e.clientX; draw();
    });
    window.addEventListener("pointerup", () => { dragging = false; ring.classList.remove("is-dragging"); });

    $$(".ring__item", ring).forEach((btn) => {
      btn.addEventListener("click", (e) => {
        T.ripple(e.clientX, e.clientY);
        this.quickView(btn.dataset.id);
      });
    });
  },

  /* ---------------------------------------------------------
     categories + grid
     --------------------------------------------------------- */
  renderCategories() {
    const wrap = $("#cats");
    const cats = ["All"].concat(CATEGORIES[this.mode]);
    wrap.innerHTML = cats.map((c) =>
      '<button class="blob-tab' + (c === this.category ? " is-on" : "") + '" data-cat="' + c + '">' + c + "</button>").join("");

    $$(".blob-tab", wrap).forEach((b) => {
      b.addEventListener("click", (e) => {
        if (b.dataset.cat === this.category) return;
        T.ripple(e.clientX, e.clientY);
        T.waveWipe(() => {
          this.category = b.dataset.cat;
          $$(".blob-tab", wrap).forEach((x) => x.classList.toggle("is-on", x === b));
          this.renderGrid();
        });
      });
    });
  },

  renderGrid() {
    const grid = $("#grid");
    let items = byMode(this.mode).filter((p) => !p.isAccessory);
    if (this.category !== "All") items = items.filter((p) => p.category === this.category);

    grid.innerHTML = items.length
      ? items.map((p) =>
          '<article class="card" data-id="' + p.id + '" tabindex="0">' +
          '<div class="card__media"><img src="' + p.images[0] + '" alt="' + p.name + '" loading="lazy"><span class="card__sweep"></span></div>' +
          '<div class="card__body"><h3 class="card__name">' + p.name + "</h3>" +
          '<p class="card__blurb">' + p.blurb + "</p>" +
          '<p class="card__price">$' + p.price + ".00 CAD</p></div></article>").join("")
      : '<p class="empty">Nothing in this drawer yet. <span class="star">&#10022;</span></p>';

    $$(".card", grid).forEach((card) => {
      this.tilt(card);
      const open = (e) => {
        T.ripple(e.clientX || window.innerWidth / 2, e.clientY || window.innerHeight / 2);
        this.quickView(card.dataset.id);
      };
      card.addEventListener("click", open);
      card.addEventListener("keydown", (e) => { if (e.key === "Enter") open(e); });
    });
  },

  /* 3D tilt that follows the pointer across the card */
  tilt(el) {
    if (REDUCED) return;
    el.addEventListener("pointermove", (e) => {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      gsap.to(el, { rotateY: px * 13, rotateX: -py * 13, duration: 0.4, ease: "power2.out" });
      el.style.setProperty("--sweep-x", ((px + 0.5) * 100) + "%");
    });
    el.addEventListener("pointerleave", () =>
      gsap.to(el, { rotateY: 0, rotateX: 0, duration: 0.6, ease: "power3.out" }));
  },

  renderAccessories() {
    const wrap = $("#acc");
    const items = byMode(this.mode).filter((p) => p.isAccessory);
    wrap.innerHTML = items.map((p, i) =>
      '<button class="acc" data-id="' + p.id + '" style="--lift:' + ((i % 3) * 18) + 'px">' +
      '<span class="acc__frame"><img src="' + p.images[0] + '" alt="' + p.name + '" loading="lazy"></span>' +
      '<span class="acc__name">' + p.name + "</span>" +
      '<span class="acc__price">$' + p.price + "</span></button>").join("");

    $$(".acc", wrap).forEach((a) => a.addEventListener("click", (e) => {
      T.ripple(e.clientX, e.clientY);
      this.quickView(a.dataset.id);
    }));
  },

  renderLookbook() {
    const track = $("#look-track");
    track.innerHTML = MODE_ART[this.mode].lookbook.map((src, i) =>
      '<figure class="look"><img src="' + src + '" alt="" loading="lazy">' +
      '<figcaption><span class="star">&#10022;</span> Look ' +
      String(i + 1).padStart(2, "0") + "</figcaption></figure>").join("");
    this.pinLookbook();
  },

  pinLookbook() {
    if (REDUCED || !window.ScrollTrigger) return;
    ScrollTrigger.getAll().forEach((s) => { if (s.vars.id === "look") s.kill(); });
    const track = $("#look-track");
    const dist = () => Math.max(0, track.scrollWidth - window.innerWidth + 80);
    gsap.to(track, {
      x: () => -dist(),
      ease: "none",
      scrollTrigger: {
        id: "look",
        trigger: "#lookbook",
        start: "top top",
        end: () => "+=" + dist(),
        pin: true,
        scrub: 0.6,
        invalidateOnRefresh: true,
      },
    });
  },

  /* ---------------------------------------------------------
     quick view
     --------------------------------------------------------- */
  quickView(id) {
    const p = PRODUCTS.find((x) => x.id === id);
    if (!p) return;
    const modal = $("#quick");

    T.dripCurtain(() => {
      $("#q-media").innerHTML =
        '<img src="' + p.images[0] + '" alt="' + p.name + '">';
      $("#q-name").textContent = p.name;
      $("#q-blurb").textContent = p.blurb;
      $("#q-price").textContent = "$" + p.price + ".00 CAD";
      $("#q-sizes").innerHTML = p.sizes.map((s, i) =>
        '<button class="chip' + (i === 0 ? " is-on" : "") + '">' + s + "</button>").join("");
      $("#q-colors").innerHTML = p.colors.map((c, i) =>
        '<button class="swatch' + (i === 0 ? " is-on" : "") + '" style="--c:' + c.hex +
        '" title="' + c.name + '"><span class="sr">' + c.name + "</span></button>").join("");

      $$("#q-sizes .chip").forEach((b) => b.addEventListener("click", () => {
        $$("#q-sizes .chip").forEach((x) => x.classList.toggle("is-on", x === b));
      }));
      $$("#q-colors .swatch").forEach((b) => b.addEventListener("click", () => {
        $$("#q-colors .swatch").forEach((x) => x.classList.toggle("is-on", x === b));
      }));
      $("#q-add").onclick = (e) => {
        this.addToCart(p);
        T.sparkle(e.clientX, e.clientY, 1.3);
      };
      modal.hidden = false;
      $("#q-close").focus();
    });

    $("#q-close").onclick = () => T.dripCurtain(() => { modal.hidden = true; });
    modal.onkeydown = (e) => { if (e.key === "Escape") T.dripCurtain(() => { modal.hidden = true; }); };
  },

  /* ---------------------------------------------------------
     cart — shared across both modes
     --------------------------------------------------------- */
  addToCart(p) {
    const line = this.cart.find((l) => l.id === p.id);
    if (line) line.qty += 1;
    else this.cart.push({ id: p.id, name: p.name, price: p.price, mode: p.mode, qty: 1 });
    this.drawCart();
    gsap.fromTo("#cart-count", { scale: 1.6 }, { scale: 1, duration: 0.45, ease: "back.out(3)" });
  },

  drawCart() {
    const n = this.cart.reduce((a, l) => a + l.qty, 0);
    $("#cart-count").textContent = n;
    $("#cart-items").innerHTML = this.cart.length
      ? this.cart.map((l) =>
          '<li class="cart__line"><span class="cart__nm">' + l.name + "<em>" + l.mode + "</em></span>" +
          '<span class="cart__qty">&times;' + l.qty + "</span>" +
          '<span class="cart__pr">$' + (l.price * l.qty) + "</span></li>").join("")
      : '<li class="cart__empty">Empty. <span class="star">&#10022;</span></li>';
    $("#cart-total").textContent = "$" + this.cart.reduce((a, l) => a + l.price * l.qty, 0);
  },

  openCart(open) {
    const d = $("#cart");
    const scrim = $("#cart-scrim");
    if (open) {
      d.hidden = false; scrim.hidden = false;
      gsap.fromTo(d, { xPercent: 100 }, { xPercent: 0, duration: 0.6, ease: "expo.out" });
      gsap.fromTo(scrim, { opacity: 0 }, { opacity: 1, duration: 0.4 });
    } else {
      gsap.to(d, { xPercent: 100, duration: 0.45, ease: "power3.in", onComplete: () => { d.hidden = true; } });
      gsap.to(scrim, { opacity: 0, duration: 0.3, onComplete: () => { scrim.hidden = true; } });
    }
  },

  /* ---------------------------------------------------------
     newsletter
     --------------------------------------------------------- */
  newsletter() {
    $("#join").addEventListener("submit", (e) => {
      e.preventDefault();
      const r = $("#join").getBoundingClientRect();
      for (let i = 0; i < 7; i++) {
        setTimeout(() => T.sparkle(
          r.left + Math.random() * r.width,
          r.top + Math.random() * r.height, 0.6 + Math.random()), i * 70);
      }
      $("#join-msg").textContent = "You are in the loop. ✦";
      $("#join").reset();
    });
  },

  /* ---------------------------------------------------------
     scroll reveals + sphere parallax
     --------------------------------------------------------- */
  revealOnScroll() {
    if (REDUCED || !window.ScrollTrigger) {
      $$(".reveal").forEach((s) => s.classList.add("in"));
      return;
    }
    $$(".reveal").forEach((sec) => {
      ScrollTrigger.create({ trigger: sec, start: "top 78%", once: true,
        onEnter: () => sec.classList.add("in") });
    });
    $$(".sphere").forEach((s, i) => {
      gsap.to(s, { yPercent: -22 - i * 9, ease: "none",
        scrollTrigger: { trigger: document.body, start: "top top", end: "bottom bottom", scrub: 0.8 } });
    });
  },

  /* ---------------------------------------------------------
     pointer effects + smooth scroll

     The chrome cursor and its sparkle trail used to live here. They
     are gone; the native pointer is back. Sphere parallax and the
     click ripple stayed — they are their own features, not cursor
     decoration.
     --------------------------------------------------------- */
  pointerFx() {
    if (REDUCED) return;

    if (!window.matchMedia("(hover: none)").matches) {
      window.addEventListener("pointermove", (e) => {
        $$(".sphere").forEach((s, i) => {
          gsap.to(s, { x: (e.clientX / window.innerWidth - 0.5) * (20 + i * 14),
                       duration: 1.1, ease: "power2.out" });
        });
      });
    }

    window.addEventListener("pointerdown", (e) => T.ripple(e.clientX, e.clientY));
  },

  smoothScroll() {
    if (REDUCED || typeof Lenis === "undefined") return;
    const lenis = new Lenis({ duration: 1.1, smoothWheel: true });
    if (window.ScrollTrigger) {
      lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add((t) => lenis.raf(t * 1000));
      gsap.ticker.lagSmoothing(0);
    } else {
      const raf = (t) => { lenis.raf(t); requestAnimationFrame(raf); };
      requestAnimationFrame(raf);
    }
  },
};

window.addEventListener("DOMContentLoaded", () => App.init());
