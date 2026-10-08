/* ============================================================
   LOOP — hero chrome blob (Three.js)

   A reflective blob that leans toward the pointer. The
   environment it mirrors is painted into a canvas rather than
   loaded, so there is no HDR to download and the chrome still
   has something to reflect.

   If WebGL is missing or throws, start() leaves the static
   chrome wordmark in place and returns quietly.
   ============================================================ */

const Hero3D = {
  started: false,
  renderer: null,
  mesh: null,
  pointer: { x: 0, y: 0 },

  start() {
    if (this.started) return;
    if (typeof THREE === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const canvas = document.getElementById("hero-canvas");
    if (!canvas) return;

    try {
      this.build(canvas);
      this.started = true;
      canvas.hidden = false;
    } catch (err) {
      console.warn("hero blob unavailable, keeping the flat wordmark", err);
    }
  },

  /* A studio painted into a canvas: bright bar above, dark floor
     below, a couple of soft lamps. Good enough to read as chrome. */
  envTexture() {
    const c = document.createElement("canvas");
    c.width = 512; c.height = 256;
    const g = c.getContext("2d");

    const sky = g.createLinearGradient(0, 0, 0, 256);
    sky.addColorStop(0.00, "#ffffff");
    sky.addColorStop(0.42, "#9aa0a8");
    sky.addColorStop(0.52, "#2a2d31");
    sky.addColorStop(1.00, "#050505");
    g.fillStyle = sky;
    g.fillRect(0, 0, 512, 256);

    const lamp = (x, y, r, a) => {
      const rg = g.createRadialGradient(x, y, 0, x, y, r);
      rg.addColorStop(0, "rgba(255,255,255," + a + ")");
      rg.addColorStop(1, "rgba(255,255,255,0)");
      g.fillStyle = rg;
      g.fillRect(x - r, y - r, r * 2, r * 2);
    };
    lamp(120, 70, 95, 0.95);
    lamp(360, 48, 70, 0.8);
    lamp(260, 200, 110, 0.22);

    const tex = new THREE.CanvasTexture(c);
    tex.mapping = THREE.EquirectangularReflectionMapping;
    tex.colorSpace = THREE.SRGBColorSpace || tex.colorSpace;
    return tex;
  },

  build(canvas) {
    const wrap = canvas.parentElement;
    const w = wrap.clientWidth || window.innerWidth;
    const h = wrap.clientHeight || 520;

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(w, h, false);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, w / h, 0.1, 100);
    camera.position.set(0, 0, 7.6);

    const env = this.envTexture();
    scene.environment = env;

    const geo = new THREE.IcosahedronGeometry(1.75, 64);
    geo.userData.base = geo.attributes.position.array.slice(0);

    const mat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      metalness: 1.0,
      roughness: 0.055,
      envMap: env,
      envMapIntensity: 1.9,
    });

    const mesh = new THREE.Mesh(geo, mat);
    scene.add(mesh);
    scene.add(new THREE.AmbientLight(0xffffff, 0.35));
    const key = new THREE.DirectionalLight(0xffffff, 1.6);
    key.position.set(3, 4, 5);
    scene.add(key);

    this.renderer = renderer;
    this.mesh = mesh;

    window.addEventListener("pointermove", (e) => {
      this.pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
      this.pointer.y = (e.clientY / window.innerHeight) * 2 - 1;
    });

    const resize = () => {
      const nw = wrap.clientWidth || window.innerWidth;
      const nh = wrap.clientHeight || 520;
      camera.aspect = nw / nh;
      camera.updateProjectionMatrix();
      renderer.setSize(nw, nh, false);
    };
    window.addEventListener("resize", resize);

    /* Wobble the surface by pushing each vertex along its own
       normal with a few summed sines — cheap, and it reads as
       liquid metal rather than a spinning ball. */
    const pos = geo.attributes.position;
    const base = geo.userData.base;
    const v = new THREE.Vector3();

    const tick = (ms) => {
      const t = ms * 0.00042;
      for (let i = 0; i < pos.count; i++) {
        const ix = i * 3;
        v.set(base[ix], base[ix + 1], base[ix + 2]);
        const n = v.clone().normalize();
        const d =
          0.14 * Math.sin(n.x * 3.1 + t * 1.7) +
          0.11 * Math.sin(n.y * 2.6 - t * 1.3) +
          0.09 * Math.sin(n.z * 3.7 + t * 2.1);
        v.addScaledVector(n, d);
        pos.setXYZ(i, v.x, v.y, v.z);
      }
      pos.needsUpdate = true;
      geo.computeVertexNormals();

      mesh.rotation.y += 0.0022;
      mesh.rotation.x = THREE.MathUtils.lerp(mesh.rotation.x, -this.pointer.y * 0.42, 0.045);
      mesh.rotation.z = THREE.MathUtils.lerp(mesh.rotation.z,  this.pointer.x * 0.26, 0.045);

      renderer.render(scene, camera);
      requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  },
};
