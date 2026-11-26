# Art Direction, Typography, Color, Imagery, Content

Contents: 1 Visual world · 2 Composition · 3 Typography · 4 Color · 5 Imagery · 6 Surfaces · 7 Copy and content integrity · 8 Design tokens starter · 9 Direction examples

---

## 1. Build a coherent visual world

The direction comes from the subject, not from a trend list. Answer these before choosing anything:

- **Dominant metaphor:** archive, laboratory, stage, landscape, machine, workshop, library, signal, tide?
- **Light:** bright, dark, neutral, warm, clinical, dusk, studio, practical lights?
- **Material:** matte, glossy, brushed metal, translucent, rough, paper, liquid, emissive, ceramic?
- **Form:** geometric, organic, monumental, delicate, modular, irregular?
- **Composition:** centered, asymmetric, cropped, layered, deliberately unstable?
- **Emotion:** calm, tense, mysterious, tactile, playful, formal, intimate?

Pick a small set and apply them everywhere: type, color, imagery, 3D materials, lighting, motion easing, sound, copy tone. Combine unrelated languages only with a stated reason.

**Consistency check:** cover the logo. Would a stranger still tell the screenshots belong to one project? If not, the system is not coherent.

## 2. Composition and hierarchy

- One dominant focal point per viewport.
- Hierarchy comes from scale, position, contrast, space, and type. Decoration is not hierarchy.
- Asymmetry is for tension and movement; do not make every section asymmetric to look experimental.
- Cropping is intentional. Important content is never accidentally clipped at any width.
- Broken grids must look deliberately broken: one dominant alignment line violated on purpose, not random offsets.
- Whitespace is an active element. Alternate dense and empty moments.
- Change scale and density between chapters (giant type → small caption → full-bleed image → quiet paragraph).
- Full-bleed media only when it serves the narrative and keeps text legible.
- Cards represent real grouped objects or actions. Not every item is a rounded card.

**Chapter variety menu** (use at least four distinct layouts across a page): full-bleed scene with sparse caption · oversized type with masked image · split with sticky text · horizontal-travel gallery (scroll-mapped) · index/list with hover-preview (pointer-fine only) · quote/pause chapter · data or diagram moment · closing statement with CTA.

## 3. Typography

Type is a primary material.

- Choose families for personality and reading. One family with several weights is often enough; a second needs a clear role (display vs text, or text vs mono utility).
- Define a scale: display, heading, body, label, caption, utility. Use `clamp()` with sane min and max.
- Body line length 45 to 75 characters. Display text may run tighter leading (0.9 to 1.05); body 1.4 to 1.65.
- Letter-spacing: tighten large display slightly, open small uppercase labels slightly; never use tiny uppercase labels as a hierarchy substitute.
- Let headings wrap naturally; avoid forced `<br>` that breaks on narrow screens. Use `text-wrap: balance` for headings and `text-wrap: pretty` for paragraphs where supported.
- Support the content's languages: check diacritics, numerals, and fallback metrics.
- Prefer variable fonts for several weights/widths in one file.
- Font loading: self-host WOFF2, subset, `font-display: swap` (or `optional` for display fonts when layout stability matters), `<link rel="preload" as="font" crossorigin>` for the single most critical face only, size-adjusted fallbacks (`size-adjust`, `ascent-override`) to avoid layout shift.
- When splitting text for animation (per line/word/char), keep an unsplit accessible version: `aria-label` on the parent plus `aria-hidden="true"` on split spans, or use a library that handles it. Re-split on resize and after fonts load.

```css
:root {
  --fs-display: clamp(3rem, 1.2rem + 7vw, 9rem);
  --fs-h1:      clamp(2.25rem, 1.2rem + 4vw, 5rem);
  --fs-h2:      clamp(1.75rem, 1.1rem + 2.4vw, 3rem);
  --fs-body:    clamp(1rem, 0.95rem + 0.25vw, 1.2rem);
  --fs-label:   0.8125rem;
  --lh-display: 0.95;
  --lh-body:    1.55;
  --measure:    62ch;
}
h1, h2 { text-wrap: balance; }
p      { text-wrap: pretty; max-inline-size: var(--measure); }
```

## 4. Color and contrast

- Define by role: background, foreground, muted text, surface, border, accent, interactive, focus, status.
- Controlled palette. One strong accent usually beats three competing ones.
- Text and controls stay legible over images and 3D. Add scrims, gradients behind text, or dedicated text surfaces when the background varies.
- Contrast: WCAG 2.2 AA minimums are 4.5:1 for body text, 3:1 for large text (about 24px regular or 19px bold) and for UI component boundaries and focus indicators. Check the *worst frame* of a scrolling 3D background, not the best.
- Never convey state by color alone.
- No low-contrast gray text because it looks refined.
- Define both a dark and light treatment only if the concept needs it; otherwise commit to one and do it well. Respect `color-scheme` when you do both.
- Consider tone mapping and color management in WebGL: set `renderer.outputColorSpace = THREE.SRGBColorSpace`, choose tone mapping deliberately, and verify that DOM colors and scene colors agree.

## 5. Imagery and media

- Relevant, high quality, consistent with the direction. Prefer authentic photography, original artwork, or commissioned/created renders over generic stock.
- Crop with a clear focal point; use `object-position` and art-directed `<picture>` sources so the subject survives narrow crops.
- Always reserve space: `width`/`height` attributes or `aspect-ratio`.
- Modern formats (AVIF, WebP) with fallbacks; responsive `srcset` and `sizes`.
- Lazy-load below the fold; mark the true LCP image with `fetchpriority="high"` and do not lazy-load it.
- Video: muted, `playsinline`, short, compressed (H.264 + AV1/VP9 where useful), poster frame, and a paused state under reduced-motion or data-saver.
- Alt text for meaningful images; empty `alt=""` for decorative ones. Do not bake essential text into images.
- Rights: do not use assets you cannot confirm are licensed. Say so when using placeholders.

## 6. Surface, depth, and detail

Borders, shadows, grain, blur, gradients, reflections, and texture communicate material, depth, grouping, or focus. Use few, consistently. Do not add blur, glow, noise, and gradient to every element. `backdrop-filter` is expensive over WebGL; test it. Fine detail should reward attention without competing with hierarchy.

## 7. Copy and content integrity

- Write real copy or request it. Voice matches the personality attributes.
- Headlines state something; labels name something real. No "Discover", "Explore", "Innovate" as filler.
- No invented statistics, testimonials, awards, client logos, or credentials. If sample content is unavoidable, mark it clearly as sample and tell the user.
- Microcopy for states: loading ("Preparing the scene"), failure ("The 3D view could not start. Browse the static version."), empty, success, error.
- Every chapter has a headline-level message that survives if the visuals fail.
- End with a real action: contact, buy, book, read, view, subscribe. Not "Thanks for scrolling".

## 8. Design tokens starter

Adapt names to the project's existing system.

```css
:root {
  /* color roles */
  --c-bg: #0e0f0c;      --c-fg: #f2efe6;
  --c-muted: #b9b5a8;   --c-surface: #171813;
  --c-line: #2b2c25;    --c-accent: #d9ff3f;
  --c-focus: #ffffff;
  /* space (4px base, modular) */
  --s-1: .25rem; --s-2: .5rem; --s-3: .75rem; --s-4: 1rem;
  --s-6: 1.5rem; --s-8: 2rem; --s-12: 3rem; --s-16: 4rem; --s-24: 6rem; --s-32: 8rem;
  /* layout */
  --w-content: min(72rem, 100% - 2 * var(--gutter));
  --gutter: clamp(1rem, 4vw, 3rem);
  /* layers */
  --z-scene: 0; --z-content: 10; --z-nav: 50; --z-overlay: 80; --z-entrance: 100;
  /* motion (see motion-interaction-audio.md) */
  --dur-fast: 160ms; --dur-base: 320ms; --dur-slow: 640ms; --dur-cine: 1200ms;
  --ease-out: cubic-bezier(.22,1,.36,1);
  --ease-inout: cubic-bezier(.65,0,.35,1);
}
```

Use `svh`/`dvh` for mobile viewport heights (`min-height: 100svh`) to avoid browser-chrome jumps.

## 9. Direction examples (to calibrate ambition, never to copy)

Each shows concept → material → type → motion → 3D role. They are illustrations of *specificity*, not templates.

1. **"Specimen archive"** for a ceramics studio. Warm paper whites, matte clay, museum labels in a mono face, slow ease-out masks. 3D: each piece rotates into a raking light like a catalogued object; scroll advances through the catalog.
2. **"Instrument lab"** for a precision audio product. Cool neutral, brushed metal, technical grotesk with tabular numerals, linear progress-tied motion. 3D: scroll sections the product, exposing driver, chamber, and cable path.
3. **"Tide table"** for a coastal conservation campaign. Layered blue-gray gradients, editorial serif, drifting horizontal motion. 3D or 2D: water level rises with scroll to show projected change, resolved by a donation action.
4. **"Night shift"** for a late-night radio studio. Deep ink with practical amber lights, condensed display type, hard cuts instead of easing. Mostly 2D with a shader signal-wave; no 3D because the content is audio and voice.

Notice that one of the four chooses no 3D.
