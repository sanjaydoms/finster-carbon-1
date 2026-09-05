/* Procedural material fields and technical diagrams for the KARBN site.
   No photography available — these draw the materials as particle systems and
   engineering-drawing style diagrams on canvas. */
window.KARBN_MAT = (function () {
  const PALETTE = {
    ink: "#17181B",
    paper: "#F6F4F0",
    accent: "#94A320",
  };

  function fitCanvas(cv) {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const r = cv.getBoundingClientRect();
    const w = Math.max(1, Math.round(r.width)), h = Math.max(1, Math.round(r.height));
    if (cv.width !== w * dpr || cv.height !== h * dpr) {
      cv.width = w * dpr; cv.height = h * dpr;
    }
    const ctx = cv.getContext("2d");
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    return { ctx, w, h };
  }

  // Driven by setInterval, not requestAnimationFrame: rAF is throttled to zero in some
  // embedded/preview contexts, which left every canvas unpainted. The element is
  // re-resolved each tick (a re-render can replace the node) and the first tick always
  // paints; off-screen ticks are skipped by a cheap rect test.
  function loop(target, draw) {
    const t0 = performance.now();
    let painted = false;
    const resolve = () => (typeof target === "function" ? target() : target);
    const tick = () => {
      const cv = resolve();
      if (!cv || !cv.isConnected) return;
      const r = cv.getBoundingClientRect();
      if (r.width < 1 || r.height < 1) return;
      const onScreen = r.bottom > -200 && r.top < window.innerHeight + 200;
      if (!onScreen && painted) return;
      painted = true;
      draw((performance.now() - t0) / 1000, cv);
    };
    const id = setInterval(tick, 33);
    tick();
    const stop = () => clearInterval(id);
    stop.tick = tick;
    return stop;
  }

  /* ---------- material field: dust → pellets → polymer → crumb ---------- */
  // form 0 = carbon dust, 1 = masterbatch pellets, 2 = polymer streaks, 3 = crumb rubber
  function materialField(cv, opts) {
    opts = opts || {};
    const count = opts.count || 900;
    const state = { form: opts.form || 0, target: opts.form || 0, mx: -1, my: -1, tint: opts.tint || "#F6F4F0" };
    const P = [];
    for (let i = 0; i < count; i++) {
      P.push({
        x: Math.random(), y: Math.random(),
        r: 0.4 + Math.random() * 2.6,
        vy: 0.006 + Math.random() * 0.02,
        vx: (Math.random() - 0.5) * 0.006,
        a: 0.18 + Math.random() * 0.72,
        rot: Math.random() * Math.PI,
        seed: Math.random(),
        ox: 0, oy: 0,
      });
    }
    const stop = loop(cv, (time, el) => {
      const { ctx, w, h } = fitCanvas(el);
      state.form += (state.target - state.form) * 0.045;
      const f = state.form;
      ctx.clearRect(0, 0, w, h);

      // depth wash
      const g = ctx.createRadialGradient(w * 0.5, h * 0.45, 0, w * 0.5, h * 0.45, Math.max(w, h) * 0.75);
      g.addColorStop(0, "rgba(255,255,255,0.05)");
      g.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = g; ctx.fillRect(0, 0, w, h);

      const dustW = Math.max(0, 1 - Math.abs(f - 0));
      const pelW = Math.max(0, 1 - Math.abs(f - 1));
      const polW = Math.max(0, 1 - Math.abs(f - 2));
      const crumbW = Math.max(0, 1 - Math.abs(f - 3));

      for (let i = 0; i < P.length; i++) {
        const p = P[i];
        p.y += p.vy * 0.004 + Math.sin(time * 0.25 + p.seed * 9) * 0.00012;
        p.x += p.vx * 0.004;
        if (p.y > 1.05) p.y = -0.05;
        if (p.x > 1.05) p.x = -0.05; else if (p.x < -0.05) p.x = 1.05;

        let px = p.x * w, py = p.y * h;
        if (state.mx >= 0) {
          const dx = px - state.mx, dy = py - state.my;
          const d2 = dx * dx + dy * dy, rad = 150;
          if (d2 < rad * rad) {
            const d = Math.sqrt(d2) || 1, force = (1 - d / rad) * 26;
            p.ox += (dx / d * force - p.ox) * 0.12;
            p.oy += (dy / d * force - p.oy) * 0.12;
          }
        }
        p.ox *= 0.93; p.oy *= 0.93;
        px += p.ox; py += p.oy;

        const scale = dustW * 0.85 + pelW * 3.0 + polW * 1.5 + crumbW * 2.3;
        const rr = p.r * scale;
        ctx.save();
        ctx.translate(px, py);
        ctx.globalAlpha = p.a * (0.5 + dustW * 0.5);

        if (pelW > 0.5) {
          ctx.rotate(p.rot + time * 0.05);
          ctx.fillStyle = "rgba(28,29,33,0.95)";
          ctx.beginPath(); ctx.ellipse(0, 0, rr * 1.5, rr, 0, 0, Math.PI * 2); ctx.fill();
          ctx.fillStyle = "rgba(255,255,255,0.5)";
          ctx.beginPath(); ctx.ellipse(-rr * 0.45, -rr * 0.4, rr * 0.42, rr * 0.2, -0.5, 0, Math.PI * 2); ctx.fill();
        } else if (polW > 0.5) {
          ctx.rotate(0.5 + Math.sin(time * 0.2 + p.seed * 6) * 0.25);
          ctx.fillStyle = "rgba(246,244,240," + (0.10 + p.seed * 0.25) + ")";
          ctx.fillRect(-rr * 5, -rr * 0.35, rr * 10, rr * 0.7);
        } else if (crumbW > 0.5) {
          ctx.rotate(p.rot + time * 0.08);
          ctx.fillStyle = "rgba(34,32,31,0.92)";
          ctx.beginPath();
          const n = 5;
          for (let k = 0; k < n; k++) {
            const ang = (k / n) * Math.PI * 2;
            const rad = rr * (0.6 + ((p.seed * 97 + k * 31) % 10) / 22);
            k ? ctx.lineTo(Math.cos(ang) * rad, Math.sin(ang) * rad) : ctx.moveTo(Math.cos(ang) * rad, Math.sin(ang) * rad);
          }
          ctx.closePath(); ctx.fill();
        } else {
          ctx.fillStyle = state.tint;
          ctx.globalAlpha = p.a * 0.55;
          ctx.beginPath(); ctx.arc(0, 0, Math.max(0.3, rr), 0, Math.PI * 2); ctx.fill();
        }
        ctx.restore();
      }
    });

    const onMove = e => {
      const el = typeof cv === "function" ? cv() : cv;
      if (!el) return;
      const r = el.getBoundingClientRect();
      state.mx = e.clientX - r.left; state.my = e.clientY - r.top;
    };
    const onLeave = () => { state.mx = -1; state.my = -1; };
    const host = opts.pointerTarget || (typeof cv === "function" ? null : cv);
    if (host) { host.addEventListener("pointermove", onMove); host.addEventListener("pointerleave", onLeave); }

    return {
      render: stop.tick,
      setForm(v) { state.target = v; },
      setTint(c) { state.tint = c; },
      destroy() { stop(); if (host) { host.removeEventListener("pointermove", onMove); host.removeEventListener("pointerleave", onLeave); } },
    };
  }

  /* ---------- process flow: nodes on a line with a travelling particle ---------- */
  function flowDiagram(cv, opts) {
    opts = opts || {};
    const n = opts.stages || 6;
    const ACC = opts.accent || PALETTE.accent;
    const ACC_RGB = opts.accentRgb || "148,163,32";
    const state = { progress: 0 };
    const stop = loop(cv, (time, el) => {
      const { ctx, w, h } = fitCanvas(el);
      ctx.clearRect(0, 0, w, h);
      const padY = h * 0.08, x = w * 0.5, span = h - padY * 2;

      // measurement grid
      ctx.strokeStyle = "rgba(246,244,240,0.07)";
      ctx.lineWidth = 1;
      for (let i = 0; i <= 10; i++) {
        const y = padY + (span * i) / 10;
        ctx.beginPath(); ctx.moveTo(x - w * 0.34, y); ctx.lineTo(x + w * 0.34, y); ctx.stroke();
      }

      // spine
      ctx.strokeStyle = "rgba(246,244,240,0.2)";
      ctx.beginPath(); ctx.moveTo(x, padY); ctx.lineTo(x, padY + span); ctx.stroke();
      ctx.strokeStyle = ACC;
      ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(x, padY); ctx.lineTo(x, padY + span * state.progress); ctx.stroke();

      for (let i = 0; i < n; i++) {
        const t = (i + 0.5) / n;
        const y = padY + span * t;
        const on = state.progress >= t;
        // caliper ticks
        ctx.strokeStyle = on ? "rgba(" + ACC_RGB + ",0.7)" : "rgba(246,244,240,0.16)";
        ctx.lineWidth = 1;
        const armw = w * (on ? 0.22 : 0.13);
        ctx.beginPath(); ctx.moveTo(x - armw, y); ctx.lineTo(x + armw, y); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(x - armw, y - 5); ctx.lineTo(x - armw, y + 5); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(x + armw, y - 5); ctx.lineTo(x + armw, y + 5); ctx.stroke();
        // node
        ctx.fillStyle = on ? ACC : "rgba(246,244,240,0.3)";
        ctx.beginPath(); ctx.arc(x, y, on ? 6 : 3.5, 0, Math.PI * 2); ctx.fill();
        if (on) {
          ctx.strokeStyle = "rgba(" + ACC_RGB + ",0.35)";
          ctx.beginPath(); ctx.arc(x, y, 12 + Math.sin(time * 2 + i) * 2, 0, Math.PI * 2); ctx.stroke();
        }
      }

      // travelling material
      for (let k = 0; k < 26; k++) {
        const t = ((time * 0.16 + k / 26) % 1);
        if (t > state.progress) continue;
        const y = padY + span * t;
        ctx.fillStyle = "rgba(" + ACC_RGB + "," + (0.5 - Math.abs(0.5 - t) * 0.6) + ")";
        ctx.beginPath();
        ctx.arc(x + Math.sin(t * 18 + k) * 5, y, 1.6, 0, Math.PI * 2);
        ctx.fill();
      }
    });
    return { render: stop.tick, setProgress(p) { state.progress = Math.max(0, Math.min(1, p)); }, destroy: stop };
  }

  /* ---------- tyre transformation: tyre → chunks → granules → four streams ----------
     Phases, driven by progress p:
       A  0.00–0.22  intact tyre, slowly turning
       B  0.22–0.46  carcass fractures into arc chunks that tumble apart
       C  0.46–0.64  chunks granulate: particles appear as the chunks fade
       D  0.64–1.00  granules sort into four lanes and heap up
     Each particle belongs to one output stream and is drawn accordingly:
       0 rCB (fine black dust) · 1 TPO (amber droplets) · 2 crumb rubber (angular
       granules) · 3 recovered steel (bright slivers).                              */
  function tyreTransform(cv, opts) {
    opts = opts || {};
    const ACC = opts.accent || PALETTE.accent;
    const CHUNKS = 12;
    const LANES = 4;
    const STREAM_MIX = [0.34, 0.24, 0.30, 0.12];
    const state = { progress: 0, highlight: -1 };

    const pick = r => {
      let acc = 0;
      for (let i = 0; i < STREAM_MIX.length; i++) { acc += STREAM_MIX[i]; if (r < acc) return i; }
      return STREAM_MIX.length - 1;
    };

    const N = 560;
    const P = [];
    for (let i = 0; i < N; i++) {
      const ang = (i / N) * Math.PI * 2 + Math.random() * 0.06;
      const band = Math.random();
      // steel comes from the belt package near the inner carcass
      const stream = band > 0.78 ? 3 : pick(Math.random() * (1 - STREAM_MIX[3]));
      P.push({
        ang, band, stream,
        chunk: Math.floor((ang / (Math.PI * 2)) * CHUNKS) % CHUNKS,
        size: 0.7 + Math.random() * 1.7,
        jx: Math.random(), jy: Math.random(),
        spin: (Math.random() - 0.5) * 2,
        drift: (Math.random() - 0.5) * 0.6,
      });
    }

    const ease = t => t * t * (3 - 2 * t);
    const seg = (p, a, b) => Math.max(0, Math.min(1, (p - a) / (b - a)));

    const stop = loop(cv, (time, el) => {
      const { ctx, w, h } = fitCanvas(el);
      ctx.clearRect(0, 0, w, h);
      const p = state.progress;

      const R = Math.min(w * 0.22, h * 0.30);
      const cx = w * 0.5;
      const cy = h * 0.30 + R * 0.1;
      const laneW = w * 0.13;
      const laneCx = i => w * (0.155 + i * 0.23);
      const floorY = h * 0.95;
      const heapH = h * 0.26;

      const pb = ease(seg(p, 0.22, 0.46));   // fracture
      const pc = ease(seg(p, 0.46, 0.64));   // granulate
      const pd = ease(seg(p, 0.64, 1.0));    // sort
      const spin = time * 0.10;

      /* ---- lane guides + collection floor ---- */
      if (pd > 0.01) {
        for (let l = 0; l < LANES; l++) {
          const on = state.highlight === l;
          ctx.strokeStyle = on ? "rgba(" + (opts.accentRgb || "148,163,32") + "," + pd * 0.9 + ")"
                               : "rgba(246,244,240," + pd * 0.14 + ")";
          ctx.lineWidth = 1;
          const x = laneCx(l);
          ctx.beginPath(); ctx.moveTo(x - laneW / 2, floorY + 6); ctx.lineTo(x + laneW / 2, floorY + 6); ctx.stroke();
          ctx.beginPath(); ctx.moveTo(x, h * 0.62); ctx.lineTo(x, floorY); ctx.stroke();
        }
      }

      /* ---- tyre body: intact through A, fracturing through B, gone by end of C ---- */
      const bodyAlpha = 1 - pc;
      if (bodyAlpha > 0.01) {
        const inner = R * 0.60;
        for (let c = 0; c < CHUNKS; c++) {
          const a0 = (c / CHUNKS) * Math.PI * 2 + spin;
          const a1 = ((c + 1) / CHUNKS) * Math.PI * 2 + spin;
          const gap = pb * 0.055;                       // chunks pull apart
          const push = pb * R * 0.55;                   // and drift outward
          const mid = (a0 + a1) / 2;
          const ox = Math.cos(mid) * push;
          const oy = Math.sin(mid) * push * 0.55 + pb * h * 0.06;
          const rot = pb * (c % 2 ? 0.5 : -0.42);

          ctx.save();
          ctx.translate(cx + ox, cy + oy);
          ctx.rotate(rot);
          ctx.globalAlpha = bodyAlpha;

          // annular sector = tyre carcass segment
          ctx.beginPath();
          ctx.arc(0, 0, R, a0 - mid + gap, a1 - mid - gap);
          ctx.arc(0, 0, inner, a1 - mid - gap, a0 - mid + gap, true);
          ctx.closePath();
          const g = ctx.createRadialGradient(0, 0, inner, 0, 0, R);
          g.addColorStop(0, "#26262A");
          g.addColorStop(0.7, "#191A1D");
          g.addColorStop(1, "#101114");
          ctx.fillStyle = g;
          ctx.fill();
          ctx.strokeStyle = "rgba(246,244,240,0.18)";
          ctx.lineWidth = 1;
          ctx.stroke();

          // tread blocks across the crown
          ctx.strokeStyle = "rgba(246,244,240,0.26)";
          for (let t = 0; t < 4; t++) {
            const ta = a0 - mid + gap + ((a1 - a0 - gap * 2) * (t + 0.5)) / 4;
            ctx.beginPath();
            ctx.moveTo(Math.cos(ta) * (R * 0.86), Math.sin(ta) * (R * 0.86));
            ctx.lineTo(Math.cos(ta) * (R * 0.99), Math.sin(ta) * (R * 0.99));
            ctx.stroke();
          }
          ctx.restore();
        }

        // sidewall bead ring, only while the tyre still reads as one object
        if (pb < 0.5) {
          ctx.globalAlpha = bodyAlpha * (1 - pb * 2);
          ctx.strokeStyle = "rgba(246,244,240,0.22)";
          ctx.lineWidth = 1;
          ctx.beginPath(); ctx.arc(cx, cy, R * 0.72, 0, Math.PI * 2); ctx.stroke();
          ctx.globalAlpha = 1;
        }
      }

      /* ---- granules ---- */
      if (pc > 0.01) {
        for (let i = 0; i < P.length; i++) {
          const q = P[i];
          const dim = state.highlight >= 0 && state.highlight !== q.stream;

          // where the granule is born: on the carcass, already pushed out by the fracture
          const rr = R * (0.60 + q.band * 0.40);
          const bx = cx + Math.cos(q.ang + spin) * rr * (1 + pb * 0.5);
          const by = cy + Math.sin(q.ang + spin) * rr * 0.6 * (1 + pb * 0.5) + pb * h * 0.06;

          // funnel: everything converges before it is sorted
          const fx = cx + q.drift * w * 0.06;
          const fy = h * 0.56;

          // lane heap: triangular pile, wider at the base
          const lx = laneCx(q.stream) + (q.jx - 0.5) * laneW * (1 - q.jy * 0.7);
          const ly = floorY - q.jy * heapH;

          let x, y;
          if (pd <= 0) {
            x = bx + (fx - bx) * pc * 0.35;
            y = by + (fy - by) * pc * 0.35;
          } else {
            const mx = bx + (fx - bx) * 0.35, my = by + (fy - by) * 0.35;
            const k = pd;
            x = mx + (lx - mx) * k;
            y = my + (ly - my) * k + Math.sin(k * Math.PI) * h * 0.05; // slight arc as it falls
          }

          const s = q.size * (1 - pc * 0.25);
          ctx.save();
          ctx.translate(x, y);
          ctx.globalAlpha = pc * (dim ? 0.18 : 0.92);

          if (q.stream === 1) {                       // TPO — amber droplet
            ctx.fillStyle = "#C8912F";
            ctx.beginPath(); ctx.ellipse(0, 0, s * 1.15, s * 1.5, 0, 0, Math.PI * 2); ctx.fill();
            ctx.globalAlpha *= 0.5;
            ctx.fillStyle = "#F0C87A";
            ctx.beginPath(); ctx.ellipse(-s * 0.3, -s * 0.45, s * 0.35, s * 0.5, 0, 0, Math.PI * 2); ctx.fill();
          } else if (q.stream === 3) {                // steel — bright sliver
            ctx.rotate(q.ang + q.spin * time * 0.25);
            ctx.fillStyle = "#C9CBD0";
            ctx.fillRect(-s * 2.6, -s * 0.28, s * 5.2, s * 0.56);
          } else if (q.stream === 2) {                // crumb rubber — angular granule
            ctx.rotate(q.ang + q.spin * time * 0.2);
            ctx.fillStyle = "#2C2926";
            ctx.beginPath();
            for (let k = 0; k < 5; k++) {
              const a = (k / 5) * Math.PI * 2;
              const rad = s * (1.15 + (((q.jx * 97 + k * 31) % 10) / 24));
              k ? ctx.lineTo(Math.cos(a) * rad, Math.sin(a) * rad) : ctx.moveTo(Math.cos(a) * rad, Math.sin(a) * rad);
            }
            ctx.closePath(); ctx.fill();
            ctx.strokeStyle = "rgba(246,244,240,0.20)"; ctx.lineWidth = 0.6; ctx.stroke();
          } else {                                     // rCB — fine dust
            ctx.fillStyle = "#F6F4F0";
            ctx.globalAlpha *= 0.5;
            ctx.beginPath(); ctx.arc(0, 0, Math.max(0.4, s * 0.7), 0, Math.PI * 2); ctx.fill();
          }
          ctx.restore();
        }
      }

      /* ---- phase caption ---- */
      const label = p < 0.22 ? "END-OF-LIFE TYRE"
                  : p < 0.46 ? "MECHANICAL PROCESSING"
                  : p < 0.64 ? "PYROLYSIS"
                  : "RECOVERED MATERIALS";
      ctx.globalAlpha = 0.55;
      ctx.fillStyle = ACC;
      ctx.font = "500 10px 'IBM Plex Mono', monospace";
      ctx.letterSpacing = "0.16em";
      ctx.fillText(label, 2, 12);
      ctx.globalAlpha = 1;
    });

    return {
      render: stop.tick,
      setProgress(v) { state.progress = Math.max(0, Math.min(1, v)); },
      setHighlight(i) { state.highlight = i >= 0 && i < LANES ? i : -1; },
      destroy: stop,
    };
  }

  /* ---------- self-running driver ----------------------------------------------
     Owns the visuals and the scroll measurement outside any component lifecycle: a
     component that mounts, boots and then unmounts used to take the tickers with it.
     Elements are found by data attribute; progress is broadcast as a window event that
     any UI can subscribe to, and the canvases keep animating regardless.            */
  const AUTO = { started: false, vis: {}, progress: { mfg: 0, tyre: 0 } };

  function listProgress(el, line) {
    const r = el.getBoundingClientRect();
    return Math.max(0, Math.min(1, (window.innerHeight * (line || 0.5) - r.top) / Math.max(1, r.height)));
  }

  function autorun(opts) {
    if (AUTO.started) return AUTO;
    const q = s => document.querySelector(s);
    const cv = kind => () => q('[data-karbn-cv="' + kind + '"]');
    if (!q('[data-karbn-cv]')) { setTimeout(() => autorun(opts), 60); return AUTO; }
    AUTO.started = true;
    opts = opts || {};
    const accent = opts.accent || PALETTE.accent;
    const accentRgb = opts.accentRgb || "148,163,32";

    if (q('[data-karbn-cv="mat"]')) AUTO.vis.mat = materialField(cv("mat"), { count: 620, tint: "#F6F4F0" });
    if (q('[data-karbn-cv="mfg"]')) AUTO.vis.flow = flowDiagram(cv("mfg"), { stages: 6, accent, accentRgb });
    if (q('[data-karbn-cv="tyre"]')) AUTO.vis.tyre = tyreTransform(cv("tyre"), { accent, accentRgb });
    if (q('[data-karbn-cv="specimen"]')) AUTO.vis.specimen = materialField(cv("specimen"), { count: 780, tint: "#F6F4F0" });

    const tick = () => {
      const mfgEl = q('[data-karbn-list="mfg"]');
      if (mfgEl && AUTO.vis.flow) {
        const p = listProgress(mfgEl, 0.5);
        AUTO.progress.mfg = p;
        AUTO.vis.flow.setProgress(p);
      }
      const tyreEl = q('[data-karbn-list="tyre"]');
      if (tyreEl) {
        const p = listProgress(tyreEl, 0.5);
        AUTO.progress.tyre = p;
        // finish the sort within the first 78% so the result is on screen while pinned
        if (AUTO.vis.tyre) AUTO.vis.tyre.setProgress(Math.min(1, p / 0.78));
      }
      Object.keys(AUTO.vis).forEach(k => { const v = AUTO.vis[k]; if (v && v.render) v.render(); });
      window.dispatchEvent(new CustomEvent("karbn:progress", { detail: { mfg: AUTO.progress.mfg, tyre: AUTO.progress.tyre } }));
    };
    setInterval(tick, 60);
    window.addEventListener("scroll", tick, { passive: true });
    window.addEventListener("resize", tick);
    tick();
    return AUTO;
  }

  // start as soon as there is a DOM to look at
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", () => autorun());
  else setTimeout(() => autorun(), 0);

  return { materialField, flowDiagram, tyreTransform, autorun, AUTO, PALETTE };
})();
