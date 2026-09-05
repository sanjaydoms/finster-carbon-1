// 3D tyre → granules → four material streams, driven by the karbn:progress event.
// Mounts into [data-karbn-3d="tyre"]. Phases match the scroll timeline:
//   A 0.00–0.22 intact tyre turning
//   B 0.22–0.46 carcass fractures into 12 segments that push out and tumble
//   C 0.46–0.64 segments shrink away as granules emerge from them
//   D 0.64–1.00 granules fall and sort into four heaps
import * as THREE from "three";

const SEL = '[data-karbn-3d="tyre"]';
if (document.querySelector(SEL)) init();
else {
  const wait = setInterval(() => {
    if (document.querySelector(SEL)) { clearInterval(wait); init(); }
  }, 60);
}

function init() {
  const SEGMENTS = 12;
  const R = 1.5;          // tyre outer radius
  const TUBE = 0.44;      // section radius
  const FLOOR = -2.9;
  const LANES = [-3.5, -1.17, 1.17, 3.5];

  const STREAMS = [
    { name: "rCB", color: 0x8d8d88, rough: 0.95, metal: 0.0, mix: 0.36, geo: () => new THREE.IcosahedronGeometry(0.055, 0) },
    { name: "TPO", color: 0xc8912f, rough: 0.22, metal: 0.1, mix: 0.26, geo: () => new THREE.SphereGeometry(0.062, 10, 8) },
    { name: "Steel", color: 0xc9cbd0, rough: 0.28, metal: 0.95, mix: 0.12, geo: () => new THREE.BoxGeometry(0.20, 0.026, 0.026) },
    { name: "Gas", color: 0xb9bfc6, rough: 0.4, metal: 0.0, mix: 0.26, geo: () => new THREE.SphereGeometry(0.05, 8, 6) },
  ];
  const TOTAL = 620;

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, preserveDrawingBuffer: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.shadowMap.enabled = false;
  renderer.domElement.style.cssText = "display:block;width:100%;height:100%";
  const attach = () => {
    const host = document.querySelector(SEL);
    if (host && renderer.domElement.parentElement !== host) host.appendChild(renderer.domElement);
    return host;
  };
  attach();

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 100);

  scene.add(new THREE.HemisphereLight(0xdfe3ea, 0x101114, 0.85));
  const key = new THREE.DirectionalLight(0xffffff, 2.1);
  key.position.set(4, 6, 5);
  scene.add(key);
  const rim = new THREE.DirectionalLight(0xa8bb2e, 0.7);
  rim.position.set(-5, 2, -4);
  scene.add(rim);
  const fill = new THREE.DirectionalLight(0xffffff, 0.35);
  fill.position.set(-2, -3, 3);
  scene.add(fill);

  /* ---- tyre: 12 carcass segments, each with a tread band ---- */
  const tyre = new THREE.Group();
  scene.add(tyre);

  const rubber = new THREE.MeshStandardMaterial({ color: 0x1b1c20, roughness: 0.88, metalness: 0.02 });
  const tread = new THREE.MeshStandardMaterial({ color: 0x0e0f12, roughness: 0.98, metalness: 0.0 });
  const bead = new THREE.MeshStandardMaterial({ color: 0x35373d, roughness: 0.55, metalness: 0.35 });

  const arc = (Math.PI * 2) / SEGMENTS;
  const segs = [];
  for (let i = 0; i < SEGMENTS; i++) {
    const g = new THREE.Group();
    const a0 = i * arc;

    const carcass = new THREE.Mesh(
      new THREE.TorusGeometry(R, TUBE, 14, 10, arc * 0.94),
      rubber
    );
    carcass.rotation.z = a0;
    g.add(carcass);

    // tread band sits slightly proud of the crown
    const band = new THREE.Mesh(
      new THREE.TorusGeometry(R + TUBE * 0.34, TUBE * 0.5, 8, 10, arc * 0.94),
      tread
    );
    band.rotation.z = a0;
    band.scale.z = 0.62;
    g.add(band);

    // tread blocks
    for (let t = 0; t < 3; t++) {
      const ta = a0 + arc * (0.2 + t * 0.3);
      const blk = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.1, TUBE * 1.15), tread);
      blk.position.set(Math.cos(ta) * (R + TUBE * 0.52), Math.sin(ta) * (R + TUBE * 0.52), 0);
      blk.rotation.z = ta;
      g.add(blk);
    }

    // bead ring fragment on the inner edge — where the steel comes from
    const bd = new THREE.Mesh(new THREE.TorusGeometry(R - TUBE * 0.86, 0.045, 6, 8, arc * 0.94), bead);
    bd.rotation.z = a0;
    g.add(bd);

    const mid = a0 + arc / 2;
    g.userData = { dir: new THREE.Vector3(Math.cos(mid), Math.sin(mid), 0), spin: (i % 2 ? 1 : -1) * (0.5 + (i % 3) * 0.2) };
    tyre.add(g);
    segs.push(g);
  }

  /* ---- granules: one instanced mesh per stream ---- */
  const parts = [];
  const dummy = new THREE.Object3D();
  let cursor = 0;
  STREAMS.forEach((s, si) => {
    const count = Math.max(1, Math.round(TOTAL * s.mix));
    const mesh = new THREE.InstancedMesh(
      s.geo(),
      new THREE.MeshStandardMaterial({ color: s.color, roughness: s.rough, metalness: s.metal }),
      count
    );
    mesh.frustumCulled = false;
    scene.add(mesh);
    const items = [];
    for (let i = 0; i < count; i++) {
      // born on the carcass
      const a = Math.random() * Math.PI * 2;
      const band = (Math.random() - 0.5) * 2;
      const rr = R + band * TUBE * 0.8;
      const start = new THREE.Vector3(Math.cos(a) * rr, Math.sin(a) * rr, (Math.random() - 0.5) * TUBE * 1.4);
      // funnel point
      const funnel = new THREE.Vector3((Math.random() - 0.5) * 0.9, -0.9, (Math.random() - 0.5) * 0.9);
      // heap: conical pile in this stream's lane
      const t = Math.random(), ang = Math.random() * Math.PI * 2;
      // gas rises in a loose column; the other three heap on the floor
      const spread = si === 3 ? 0.5 : 0.95 * (1 - t * 0.75);
      const end = new THREE.Vector3(
        LANES[si] + Math.cos(ang) * spread,
        si === 3 ? FLOOR + 0.7 + t * 2.4 : FLOOR + t * 0.85,
        Math.sin(ang) * spread * (si === 3 ? 0.5 : 0.7)
      );
      items.push({
        start, funnel, end,
        seg: Math.floor((a / (Math.PI * 2)) * SEGMENTS) % SEGMENTS,
        rot: new THREE.Vector3(Math.random() * 6, Math.random() * 6, Math.random() * 6),
        spin: 0.4 + Math.random() * 1.6,
        delay: Math.random() * 0.35,
        scale: 0.95 + Math.random() * 0.7,
      });
      cursor++;
    }
    parts.push({ mesh: mesh, items: items, index: si, target: new THREE.Color(s.color), rough: s.rough, metal: s.metal });
  });

  /* ---- lane markers under each heap ---- */
  const markers = [];
  const markerMat = new THREE.MeshStandardMaterial({ color: 0xa8bb2e, roughness: 0.6, transparent: true, opacity: 0 });
  LANES.forEach(x => {
    const m = new THREE.Mesh(new THREE.RingGeometry(0.95, 1.02, 40), markerMat.clone());
    m.rotation.x = -Math.PI / 2;
    m.position.set(x, FLOOR - 0.06, 0);
    scene.add(m);
    markers.push(m);
  });

  const state = { p: 0, highlight: -1 };
  const ease = t => t * t * (3 - 2 * t);
  const seg01 = (p, a, b) => Math.max(0, Math.min(1, (p - a) / (b - a)));

  function resize(host) {
    const r = host.getBoundingClientRect();
    const w = Math.max(1, r.width), h = Math.max(1, r.height);
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }

  function frame(now) {
    const time = now / 1000;
    const p = state.p;
    const pb = ease(seg01(p, 0.22, 0.46));
    const pc = ease(seg01(p, 0.46, 0.64));
    const pd = ease(seg01(p, 0.64, 1.0));

    // camera pulls back and looks down as the material spreads out
    camera.position.set(0, 0.9 - pd * 1.5, 8.4 + pd * 1.6);
    camera.lookAt(0, 0.55 - pd * 2.1, 0);

    // tyre turns, then the segments break away
    tyre.rotation.z = time * 0.22 * (1 - pb * 0.6);
    tyre.position.y = 0.55 - pd * 0.4;
    tyre.visible = pc < 0.995;
    for (let i = 0; i < segs.length; i++) {
      const g = segs[i], d = g.userData;
      const push = pb * 1.5;
      g.position.set(d.dir.x * push, d.dir.y * push - pb * 0.5, d.dir.z);
      g.rotation.x = pb * d.spin * 1.6;
      g.rotation.y = pb * d.spin * 0.9;
      const s = Math.max(0.001, 1 - pc);
      g.scale.setScalar(s);
    }

    // granules
    for (let k = 0; k < parts.length; k++) {
      const P = parts[k];
      const dim = state.highlight >= 0 && state.highlight !== P.index;
      const mat = P.mesh.material;
      mat.opacity = pc * (dim ? 0.2 : 1) * (P.index === 3 ? 0.6 : 1);
      mat.transparent = mat.opacity < 0.99;
      P.mesh.visible = pc > 0.01;
      // granules are born as dark rubber crumb and take on their stream identity as
      // the sort progresses — matching the story: processing yields crumb, pyrolysis separates
      const ident = Math.min(1, pd * 2.4);
      mat.color.setHex(0x24211f).lerp(P.target, ident);
      mat.roughness = 0.92 + (P.rough - 0.92) * ident;
      mat.metalness = 0.02 + (P.metal - 0.02) * ident;
      for (let i = 0; i < P.items.length; i++) {
        const q = P.items[i];
        const local = Math.max(0, Math.min(1, (pd - q.delay) / (1 - q.delay || 1)));
        const e = ease(local);
        let x, y, z;
        if (pd <= 0) {
          const w = pc * 0.4;
          x = q.start.x + (q.funnel.x - q.start.x) * w;
          y = q.start.y + (q.funnel.y - q.start.y) * w + 0.55;
          z = q.start.z + (q.funnel.z - q.start.z) * w;
        } else {
          const mx = q.start.x + (q.funnel.x - q.start.x) * 0.4;
          const my = q.start.y + (q.funnel.y - q.start.y) * 0.4 + 0.55;
          const mz = q.start.z + (q.funnel.z - q.start.z) * 0.4;
          x = mx + (q.end.x - mx) * e;
          y = my + (q.end.y - my) * e - Math.sin(e * Math.PI) * 0.5;
          z = mz + (q.end.z - mz) * e;
        }
        // settled gas keeps rising and shrinking away, like escaping vapour
        let sc = q.scale;
        if (P.index === 3 && pd > 0) {
          const rise = ((time * 0.3 + q.delay * 9) % 1);
          y += rise * 2.2 * e;
          sc *= (1 - rise * 0.8);
        }
        dummy.position.set(x, y, z);
        const settled = e > 0.98;
        const spin = settled ? 0 : time * q.spin;
        dummy.rotation.set(q.rot.x + spin, q.rot.y + spin * 0.7, q.rot.z);
        dummy.scale.setScalar(sc);
        dummy.updateMatrix();
        P.mesh.setMatrixAt(i, dummy.matrix);
      }
      P.mesh.instanceMatrix.needsUpdate = true;
    }

    markers.forEach((m, i) => {
      m.material.opacity = pd * (state.highlight === i ? 0.85 : 0.14);
    });

    renderer.render(scene, camera);
  }

  // Interval-driven and also ticked on scroll: rAF is throttled to zero in some
  // embedded contexts, which would freeze the scene.
  let last = 0;
  const tick = () => {
    const now = performance.now();
    if (now - last < 24) return;
    last = now;
    const host = attach();
    if (!host) return;
    resize(host);
    frame(now);
  };
  setInterval(tick, 33);
  window.addEventListener("scroll", tick, { passive: true });
  window.addEventListener("resize", tick);
  window.addEventListener("karbn:progress", e => {
    // the sort completes within the first 78% of the list, matching the 2D timeline
    state.p = Math.min(1, (e.detail.tyre || 0) / 0.78);
  });
  window.KARBN_TYRE3D = { setHighlight(i) { state.highlight = i >= 0 && i < 4 ? i : -1; } };
  tick();
}
