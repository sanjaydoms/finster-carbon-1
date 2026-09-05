# Finster Carbon 1

Claude Design canvas export for the Finster Carbon website. Each `.dc.html` is a
standalone artboard — open one directly in a browser; there is no build step.

`index.html` is a copy of `Homepage v3.dc.html`, so `/` serves the homepage on a
static host. **Re-copy it after any canvas re-export**, or the deployed landing
page goes stale:

```bash
cp "Homepage v3.dc.html" index.html
```

Note: the brand token throughout the code is `KARBN` (`window.KARBN*`), not `finster`.

## Artboards

| File | Role |
|---|---|
| `SiteHeader.dc.html`, `SiteFooter.dc.html` | Shared chrome — sticky nav w/ mega menu, footer |
| `Homepage v3.dc.html` | **Canonical homepage** — what the header logo links to, and what `index.html` copies. |
| `Homepage.dc.html`, `Homepage v2.dc.html` | Earlier homepage iterations, unlinked. **v2** is the richest (3D tyre, world map, procedural materials) but is not wired into the site. |
| `Products.dc.html` | Product family listing |
| `Product.dc.html`, `Product v1.dc.html` | Product detail iterations |
| `Applications.dc.html` | End-market applications |
| `Technology.dc.html` | Pyrolysis process, 6 stages |
| `Sustainability.dc.html` | Circularity / impact |
| `About.dc.html`, `Contact.dc.html` | Company + enquiry |

## Shared modules

Loaded per-artboard from the `<helmet>` block, not bundled.

| File | Global | What it does |
|---|---|---|
| `support.js` | — | Claude Design canvas runtime. Loaded by every artboard. Do not hand-edit. |
| `data.js` | `KARBN` | All site copy: product families, grades, specs, applications. `[To be confirmed]` marks values deliberately left un-invented. |
| `materials.js` | `KARBN_MAT` | Procedural canvas renders of each material (no photography available) + engineering-style diagrams. |
| `worldmap.js` | — | Dot-matrix world map from land-110m TopoJSON, self-mounting on `[data-karbn-map="world"]`. |
| `tyre3d.js` | `KARBN_TYRE` | Scroll-driven 3D tyre → granules → four material streams. Mounts on `[data-karbn-3d="tyre"]`. |
| `image-slot.js` | — | `<image-slot>` custom element. Used by Homepage v2/v3 only. |

## Assets

- `images/` — production art referenced by the artboards.
- `uploads/` — raw pasted source images from the design session. Two are byte-identical
  to `images/hero-materials.png`; kept as-is rather than pruned.
- `favicon.ico` (16/32/48) + `favicon.png` (256) — the logo's "C" mark, cropped from `images/finster-logo.png`.
- `.thumbnail` — canvas preview, part of the export format.

The source `.zip` is gitignored — it is the same files, zipped. Re-zip this directory
(minus `.git`, `README.md`, `.gitignore`) to re-import into Claude Design.
