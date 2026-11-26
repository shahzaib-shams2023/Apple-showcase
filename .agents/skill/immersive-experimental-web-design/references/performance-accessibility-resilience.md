# Performance, Accessibility, and Resilience

Contents: 1 Targets · 2 Asset and loading budgets · 3 Rendering optimization · 4 Adaptive quality · 5 DOM and CSS performance · 6 Accessibility and reduced motion · 7 Failure states and recovery · 8 Responsive and device strategy · 9 SEO and browser behavior · 10 Measuring

---

## 1. Targets

Set targets from the declared audience; defaults below assume a mid-range Android phone on a decent mobile connection and a typical laptop.

| Metric | Target |
|---|---|
| LCP (poster or headline, not the 3D) | ≤ 2.5 s |
| INP | ≤ 200 ms |
| CLS | ≤ 0.1 |
| Entrance readiness | Meaningful content immediately; scene ready ≲ 3 s on target |
| Frame rate while scrolling | Hold 60 fps on desktop; ≥ 30 fps stable on mobile target; never long stalls (>100 ms) |
| Main-thread long tasks | None > 200 ms during scroll |
| JS (initial, compressed) | ≲ 200–300 KB before the 3D chunk |
| Total initial transfer | Page shell ≲ 1 MB; 3D streams after |

If the target hardware is unknown, say so, assume mid-range mobile, and state it in the report.

## 2. Asset and loading budgets

- Defer the 3D bundle (`import()` the scene module) so the HTML, CSS, fonts, and poster paint first.
- Priority: LCP image/heading → fonts (one preload) → hero asset → everything else.
- Hashed, immutable, compressed (brotli) assets; HTTP/2 or 3; CDN.
- Images: sized to display, AVIF/WebP, `srcset`, `loading="lazy"` except the LCP.
- Video: short, compressed, muted, `preload="metadata"` until needed, paused offscreen.
- Models: see budgets in `blender-three-pipeline.md` §5. Keep a separate lighter mobile asset when the hero is expensive.
- Do not preload everything "for smoothness"; preloading competes with critical resources.
- `navigator.connection?.saveData` and `matchMedia('(prefers-reduced-data: reduce)')` (where supported) → skip heavy tiers and video.

## 3. Rendering optimization

- **Draw calls:** merge static meshes sharing a material; use `InstancedMesh` for repeats; atlas textures; reduce material count.
- **Geometry:** LODs for distant or secondary objects; remove hidden faces; avoid dense transparent geometry.
- **Textures:** KTX2 for GPU compression; mipmaps on; limit anisotropy (4 to 8); right-size per tier; reuse textures.
- **Shadows:** at most one or two casters; tight frustum; small map; consider baked/contact shadows.
- **Pixel ratio:** cap (1.5 on touch, 2 on desktop). Fill rate is the usual bottleneck.
- **Post-processing:** minimal, tiered; render full-screen passes at reduced resolution when possible.
- **Overdraw:** reduce large overlapping transparent layers and glass/blur on top of WebGL.
- **Render on demand:** if nothing changes, don't render (`frameloop="demand"` in R3F, or skip frames in vanilla).
- **Pause:** when the tab is hidden, the canvas is off-screen, or the entrance has not completed.
- **GC pressure:** do not allocate vectors/objects inside per-frame loops; preallocate and reuse.
- **Memory:** dispose what you create, once. Watch `renderer.info.memory` and `renderer.info.render` for leaks across route changes.

## 4. Adaptive quality

Define quality tiers and move between them from measurements, not user-agent guesses.

```js
const tiers = [
  { name: 'low',  dpr: 1.0, post: false, shadows: false, textures: 'mobile' },
  { name: 'mid',  dpr: 1.5, post: false, shadows: true,  textures: 'desktop' },
  { name: 'high', dpr: 2.0, post: true,  shadows: true,  textures: 'desktop' },
];
```

- Start from a conservative guess (coarse pointer or low `deviceMemory`/`hardwareConcurrency` → lower tier).
- Sample average frame time over ~1–2 s windows; step down when below target (e.g. >22 ms avg), step up cautiously with hysteresis to avoid flapping.
- Apply changes live (DPR, pass toggles) without reloading the scene.
- Persist the chosen tier per session.
- drei's `PerformanceMonitor` or a small custom monitor is fine.
- Never depend on a single benchmark at load; thermals change.

## 5. DOM and CSS performance

- Limit the number of animated DOM nodes; avoid animating hundreds of split characters at once.
- Use `contain: layout paint` and `content-visibility: auto` (with `contain-intrinsic-size`) on long, off-screen sections.
- Animate `transform`/`opacity`; avoid animating `filter` and `backdrop-filter` over WebGL on mobile.
- Avoid layout thrash: batch reads and writes; do not read layout inside scroll/animation loops without caching.
- Prefer `IntersectionObserver` over scroll listeners for visibility logic; use passive listeners where listeners are needed.
- Keep React re-renders out of the scroll path.
- Use `will-change` sparingly and clean it up after animations.
- Large SVG filters and many gradients can be costly; test on mobile.

## 6. Accessibility and reduced motion

**Baseline (WCAG 2.2 AA):**
- Semantic HTML: landmarks (`header`, `nav`, `main`, `footer`), real headings in order, lists, links, buttons.
- Skip link as the first focusable element, visible on focus.
- All functionality available by keyboard; visible `:focus-visible` indicators with ≥3:1 contrast; focus not hidden behind sticky UI (2.4.11).
- Touch/pointer targets at least 24×24 CSS px (2.5.8); aim for 44px on touch.
- Text contrast 4.5:1 (3:1 large); UI/graphic boundaries 3:1; never color-only meaning.
- Text resizes to 200% and reflows at 320 CSS px width without loss (1.4.4, 1.4.10).
- Pause/stop/hide for auto-moving content lasting > 5 s (2.2.2): provide a real control or avoid it.
- No content flashing more than three times per second (2.3.1).
- Alt text, captions or transcripts for meaningful media; decorative media `aria-hidden`/empty alt.
- Canvas: give it a role and label when meaningful (`role="img"` + `aria-label`) or mark decorative and provide equivalent DOM text. Interactive hotspots have DOM equivalents.
- Menus/overlays: focus management, `Escape`, `inert` background, restore focus.
- Announce meaningful dynamic changes with `aria-live` sparingly; do not announce every scroll tick.
- Page title, language attribute, and meaningful link text.

**Reduced motion (apply across systems, not only CSS):**

```css
@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

That CSS is only a baseline. Also:
- GSAP: branch inside `gsap.matchMedia()` (see scroll reference §8.1); set final states, no scrub.
- Three.js: no camera travel or parallax; snap chapter states or crossfade; stop ambient loops; lower DPR is fine.
- Lenis/smooth scroll: do not initialize.
- Video/Lottie: pause or show the poster.
- Keep all information; change the *delivery*, not the *content*.
- Provide an in-page "reduce motion" toggle only if there is a reason to override the system setting; honor the system setting by default.

Also support `prefers-contrast: more`, `forced-colors` (don't rely on background images for essential UI), and `color-scheme`.

## 7. Failure states and recovery

Design and test each case. All must preserve content and primary navigation.

| Case | Behavior |
|---|---|
| JS fails or is slow | Semantic HTML + CSS still readable; reveal states default to visible |
| WebGL unsupported/disabled | Static or video fallback for each chapter; one-line notice, no dead UI |
| GLB 404 / decode error | Poster fallback; retry once; log; no infinite spinner |
| Shader compile error | Fall back to a basic material; report once |
| Context lost | Stop render, show fallback, attempt restore, resume cleanly |
| Slow network | Real progress, content available early, skip/enter shortcut, reduced tier |
| Low memory / crash on mobile | Lower tier first visit heuristics; avoid large textures; fewer simultaneous assets |
| Resize / orientation change | Recompute camera, triggers (`ScrollTrigger.refresh`), text splits |
| Tab hidden/return | Pause/resume, no time jump, no audio blast |
| Back/forward, reload mid-scroll | Restore scroll and a coherent scene state |
| Audio blocked or off | Experience complete without sound |
| Reduced motion / save-data | Alternate static or simplified path |
| Repeat visit | Skip long entrance; cached assets |

Timeouts: if the hero asset has not loaded after a reasonable threshold (e.g. 8–12 s on slow connections), allow entry with the fallback and keep loading in the background if it makes sense.

## 8. Responsive and device strategy

- **Desktop:** richer composition, hover/focus inspection, wider camera framing, optional tier-high effects. Test ultrawide and 4k: cap content width and scale hero typography with maximums; ensure the scene does not look empty.
- **Tablet:** both orientations; treat as its own layout, not a stretched phone or squeezed desktop; touch first.
- **Mobile:** recomposed layouts, shorter scroll travel, simplified 3D, lower DPR, no hover reliance, large targets, reduced post/particles, test landscape and dynamic toolbar behavior (`svh`/`dvh`).
- **Low-power/constrained:** the lowest tier is still a good experience; offer the fallback ladder.
- **Breakpoints:** derive from where the layout breaks. Validate at least 320, 375, 414, 768, 1024, 1280, 1440, 1920, plus short-height viewports (e.g. 1366×600) and landscape phones.
- Use container queries for components that appear in different layout contexts.

## 9. SEO and browser behavior

- Meaningful `<title>`, meta description, canonical, Open Graph/Twitter images (a designed share image, not a screenshot of the loader).
- Content is in the DOM (SSR/SSG where appropriate) so crawlers and screen readers see it. Do not render all copy only in canvas.
- Real routes/anchors; working back/forward; scroll restoration handled deliberately.
- 404 and error pages designed.
- Favicons and theme color; correct viewport meta; `color-scheme`.
- No console errors or warnings shipped. No mixed content.
- Cookie/consent and analytics (if any) must not block the entrance.

## 10. Measuring

Measure; do not guess.

- **Lighthouse/PageSpeed** for baseline CWV (note: lab data, not full story).
- **Chrome DevTools Performance panel:** record scroll through the whole page; inspect long tasks, layout, GPU raster, frame timing.
- **Three.js:** `renderer.info` (calls, triangles, geometries, textures); log it per chapter. `stats.js`/`stats-gl` during development.
- **Spector.js** for draw-call and state inspection.
- **GPU/Memory:** Chrome Task Manager, `performance.memory` where available, Safari Web Inspector timelines.
- **Real devices:** at least one mid-range Android and one recent iPhone; throttle CPU 4–6× and network to Fast 3G/4G in DevTools as a stand-in when devices are unavailable.
- **RUM** (web-vitals library) if the project has analytics.

Report what was measured and how. If not measured, say so; never invent numbers.
