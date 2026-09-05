// Dot-matrix world map from real geodata (world-atlas land-110m TopoJSON, hand-decoded),
// with the group's verified presence marked. Self-running like materials.js: finds its
// canvas by [data-karbn-map="world"], survives re-renders, repaints on scroll/timer.
(function () {
  const SEL = '[data-karbn-map="world"]';
  const MARKERS = [
    { lon: 78.9, lat: 21.8, label: "INDIA", sub: "MANUFACTURING · R&D" },
    { lon: 9.5, lat: 50.5, label: "EUROPE", sub: "COMMERCIAL" },
  ];
  const LAT_MAX = 76, LAT_MIN = -56; // crop empty poles for an editorial frame

  let mask = null, maskW = 0, maskH = 0, failed = false;
  fetch("https://unpkg.com/world-atlas@2.0.2/land-110m.json")
    .then(r => r.json())
    .then(topo => {
      const tr = topo.transform;
      const arcs = topo.arcs.map(arc => {
        let x = 0, y = 0;
        return arc.map(p => { x += p[0]; y += p[1]; return [x * tr.scale[0] + tr.translate[0], y * tr.scale[1] + tr.translate[1]]; });
      });
      const ring = idxs => {
        const pts = [];
        idxs.forEach(i => {
          const a = i < 0 ? arcs[~i].slice().reverse() : arcs[i];
          for (let k = pts.length ? 1 : 0; k < a.length; k++) pts.push(a[k]);
        });
        return pts;
      };
      // land-110m wraps its geometry in a GeometryCollection
      const land = topo.objects.land;
      const geoms = land.type === "GeometryCollection" ? land.geometries : [land];
      const polysets = [];
      geoms.forEach(g => {
        if (g.type === "MultiPolygon") g.arcs.forEach(p => polysets.push(p));
        else if (g.type === "Polygon") polysets.push(g.arcs);
      });
      if (!polysets.length) throw new Error("no land geometry");
      maskW = 1024; maskH = 512;
      const off = document.createElement("canvas");
      off.width = maskW; off.height = maskH;
      const c = off.getContext("2d");
      c.fillStyle = "#fff";
      c.beginPath();
      polysets.forEach(poly => poly.forEach(idxs => {
        ring(idxs).forEach(([lon, lat], i) => {
          const x = ((lon + 180) / 360) * maskW;
          const y = ((90 - lat) / 180) * maskH;
          i ? c.lineTo(x, y) : c.moveTo(x, y);
        });
        c.closePath();
      }));
      c.fill();
      mask = c.getImageData(0, 0, maskW, maskH).data;
    })
    .catch(() => { failed = true; mask = null; });

  const project = (lon, lat, w, h) => [
    ((lon + 180) / 360) * w,
    ((LAT_MAX - lat) / (LAT_MAX - LAT_MIN)) * h,
  ];
  const sampleLand = (lon, lat) => {
    const mx = Math.round(((lon + 180) / 360) * maskW);
    const my = Math.round(((90 - lat) / 180) * maskH);
    return mask[(my * maskW + mx) * 4 + 3] > 100;
  };

  let dotLayer = null, dotW = 0, dotH = 0, mouse = null;

  function buildDots(w, h, dpr) {
    dotLayer = document.createElement("canvas");
    dotLayer.width = w; dotLayer.height = h;
    const c = dotLayer.getContext("2d");
    const step = Math.max(5, Math.round(w / 175));
    const r = Math.max(1, step * 0.24);
    c.fillStyle = "rgba(246,244,240,0.30)";
    for (let y = step / 2; y < h; y += step) {
      const lat = LAT_MAX - (y / h) * (LAT_MAX - LAT_MIN);
      for (let x = step / 2; x < w; x += step) {
        const lon = (x / w) * 360 - 180;
        if (sampleLand(lon, lat)) { c.beginPath(); c.arc(x, y, r, 0, Math.PI * 2); c.fill(); }
      }
    }
    dotW = w; dotH = h;
  }

  function tick() {
    const cv = document.querySelector(SEL);
    if (!cv) return;
    const rect = cv.getBoundingClientRect();
    if (rect.width < 10 || rect.bottom < -100 || rect.top > innerHeight + 100) return;
    const dpr = Math.min(devicePixelRatio || 1, 2);
    const w = Math.round(rect.width * dpr), h = Math.round(rect.height * dpr);
    if (cv.width !== w || cv.height !== h) { cv.width = w; cv.height = h; }
    const ctx = cv.getContext("2d");
    ctx.clearRect(0, 0, w, h);

    if (!mask) {
      ctx.fillStyle = "rgba(246,244,240,0.4)";
      ctx.font = 500 + " " + Math.round(11 * dpr) + "px 'IBM Plex Mono', monospace";
      ctx.fillText(failed ? "[WORLD MAP DATA UNAVAILABLE OFFLINE]" : "LOADING GEODATA…", 8, 20);
      return;
    }
    if (!dotLayer || dotW !== w || dotH !== h) buildDots(w, h, dpr);
    ctx.drawImage(dotLayer, 0, 0);

    const time = performance.now() / 1000;
    const pts = MARKERS.map(m => project(m.lon, m.lat, w, h));

    // connection arc, drawn as a shallow quadratic with a travelling dash
    const [ax, ay] = pts[0], [bx, by] = pts[1];
    const mx = (ax + bx) / 2, my = Math.min(ay, by) - h * 0.16;
    ctx.strokeStyle = "rgba(168,187,46,0.55)";
    ctx.lineWidth = Math.max(1, dpr);
    ctx.setLineDash([4 * dpr, 5 * dpr]);
    ctx.lineDashOffset = -time * 26 * dpr;
    ctx.beginPath();
    ctx.moveTo(bx, by);
    ctx.quadraticCurveTo(mx, my, ax, ay);
    ctx.stroke();
    ctx.setLineDash([]);

    MARKERS.forEach((m, i) => {
      const [x, y] = pts[i];
      const near = mouse && Math.hypot(mouse.x - x, mouse.y - y) < 34 * dpr;
      const pulse = (time * 0.9 + i * 0.5) % 1;
      ctx.strokeStyle = "rgba(168,187,46," + (0.6 * (1 - pulse)) + ")";
      ctx.lineWidth = dpr;
      ctx.beginPath(); ctx.arc(x, y, (5 + pulse * 15) * dpr, 0, Math.PI * 2); ctx.stroke();
      ctx.fillStyle = "#A8BB2E";
      ctx.beginPath(); ctx.arc(x, y, (near ? 5 : 3.6) * dpr, 0, Math.PI * 2); ctx.fill();
      ctx.strokeStyle = "#101114"; ctx.lineWidth = 1.5 * dpr; ctx.stroke();

      const fs = Math.round((near ? 12 : 11) * dpr);
      ctx.font = "600 " + fs + "px 'IBM Plex Mono', monospace";
      ctx.fillStyle = "#A8BB2E";
      const lx = x + 12 * dpr, ly = y - 8 * dpr;
      ctx.fillText(m.label, lx, ly);
      ctx.font = "500 " + Math.round(9.5 * dpr) + "px 'IBM Plex Mono', monospace";
      ctx.fillStyle = "rgba(246,244,240," + (near ? 0.9 : 0.55) + ")";
      ctx.fillText(m.sub, lx, ly + 13 * dpr);
    });
  }

  document.addEventListener("mousemove", e => {
    const cv = document.querySelector(SEL);
    if (!cv) { mouse = null; return; }
    const r = cv.getBoundingClientRect();
    const dpr = Math.min(devicePixelRatio || 1, 2);
    mouse = { x: (e.clientX - r.left) * dpr, y: (e.clientY - r.top) * dpr };
  }, { passive: true });

  setInterval(tick, 50);
  window.addEventListener("scroll", tick, { passive: true });
  window.addEventListener("resize", () => { dotLayer = null; tick(); });
})();
