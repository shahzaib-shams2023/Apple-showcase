# Scroll Narrative, Entrance, and Chapter Choreography

Contents: 1 Journey as chapters · 2 Narrative arc patterns · 3 Entrance · 4 Scroll is the timeline · 5 Techniques and when to use them · 6 Pinned scenes · 7 Progress without a slider · 8 Scroll engineering (GSAP, Lenis, CSS) · 9 Mobile story · 10 Storyboard row template

---

## 1. Design the journey as chapters

Write the journey before the sections. A section is a container. A chapter is a *beat* in a story: it changes what the visitor knows, feels, or can do.

For each chapter define:

| Field | Question |
|---|---|
| Purpose | What changes for the visitor? |
| Message | One sentence that survives if all visuals fail |
| Scroll length | Viewport-heights of travel (0.8 to 3 typical) |
| Scene state | Camera, subject, light, background, scale |
| Content | Headline, body, proof, action |
| Entrance / exit | How it arrives and releases |
| Mobile | Recomposition, simplified scene, shorter travel |
| Fallback | What shows with no WebGL / reduced motion |

A journey needs a **beginning** (orient), **middle** (develop, reveal, deepen), and **end** (resolve, act). Flat energy across chapters is a failure; plan peaks and rests.

## 2. Narrative arc patterns (adapt, do not copy)

Choose by content type; mix if needed.

- **Reveal arc:** hidden → hint → partial → whole → detail → action. Good for products and objects.
- **Journey arc:** arrive → travel → obstacle → discovery → destination → invitation. Good for places, brands with origin stories.
- **Zoom arc:** context → system → part → detail → meaning. Good for technical, scientific, architectural.
- **Transformation arc:** before → mechanism → after → proof → action. Good for services and campaigns.
- **Index arc:** overview → selected entries → depth on one → return → contact. Good for portfolios and studios.

Each arc ends in one clear action.

## 3. The entrance: design the first ten seconds

The entrance is a threshold, not a loading screen with a logo.

**Requirements**
- It orients: who, what, mood, in the first moment.
- It does real work: loads critical assets while beginning the story (title reveal, camera arrival, object assembling).
- It never blocks access longer than necessary. Show meaningful content quickly; stream heavier assets behind it.
- It has a skip or instant path for repeat visitors, reduced-motion users, and slow connections.
- It is deterministic: same state on reload, back button, and tab restore.
- Total forced wait stays short. Aim for readiness well under 3 seconds on the target device class; if assets need longer, show real progress and keep content reachable.

**State machine**

```
idle → preloading-critical → ready-to-enter → entering → active → (error | reduced | fallback)
```

- `preloading-critical`: fonts, the single hero asset, first-chapter scene data.
- `ready-to-enter`: either auto-advance or a single, meaningful "enter" action when audio or fullscreen needs a user gesture.
- `entering`: authored transition; input is accepted again as soon as it can be.
- `active`: scroll unlocked; remaining assets stream in tiers.
- `error | reduced | fallback`: same content, no heavy scene or motion.

Keep this state in one place (a store or a small state module), not scattered flags. Drive `data-state` attributes on the root so CSS can respond.

**Patterns** (pick one that fits the concept): camera push-through · masked reveal of the first image · object assembling from parts · typographic cascade resolving to a title · light turning on in a dark space · drawing/line that becomes the scene.

**Accessibility:** no keyboard trap; focus lands on a sensible element when the entrance ends; screen readers get the real page content, not only the loader; `aria-live="polite"` for progress text if shown; skip link available from the first tab stop.

**Loading strategy:** critical path small; progressive tiers (poster → low-res scene → full textures → optional extras). Never fake a progress bar. If real progress is unknown, use an indeterminate state.

## 4. Scroll is the timeline, not a trigger collection

Map scroll **progress** to an authored timeline: camera position/target, object transforms, material uniforms, light intensity, text reveal, background tone. Do not scatter independent "when this enters, fade it in" triggers and call it a story.

Rules:
- Storytelling must not depend on one exact scroll speed. Test slow, fast, reverse, stop mid-scene.
- Every state is reachable by scrolling back.
- Scene state is a pure function of scroll progress (plus time-based ambient motion), so jumping via anchor links or restoring scroll position gives the correct state.
- Use easing/smoothing (damping toward target progress) to hide the stepped nature of wheel input, but keep it short so the scene never feels disconnected from the hand.

## 5. Techniques, and when each earns its place

| Technique | Use when | Avoid when |
|---|---|---|
| Scrubbed timeline (progress-linked) | Camera moves, transformations, assemblies | Text-heavy content that must be read at any pace |
| Triggered one-shot | Revealing text, small emphasis | It is the only technique used on the page |
| Pinned scene | A sequence of states over one stationary stage | The pin is just a delay; more than ~3 pins in a row; on small mobile |
| Horizontal travel mapped to vertical scroll | Galleries, timelines, journeys | Content longer than a few screens; poor mobile fit |
| Parallax layers | Depth cues in a flat scene | Applied to everything; motion-sensitive audiences |
| Scene cut (hard or masked) | Chapter changes, rhythm breaks | Needs easing to feel natural |
| Camera path | Spatial storytelling | The model has no meaningful spatial structure |
| Section snap | Rarely; slide-like content | Almost always; fights natural scrolling. If used: `scroll-snap-type: y proximity`, never `mandatory` on long text |

Vary techniques across chapters. Repeating one treatment is a design smell.

## 6. Pinned scenes: rules

- Pin only when the visitor benefits from a stationary stage while states change.
- Give every pin a clear reason, entry, and release; total pinned distance proportional to the amount of change shown.
- Never pin content taller than the viewport on short screens (landscape phones). Use `svh`, and let the pin release or switch to stacked content under a height or aspect-ratio query.
- Avoid nested pins.
- Always call `ScrollTrigger.refresh()` after fonts, images, and the 3D canvas settle; use `invalidateOnRefresh: true` for values computed from layout.
- Pin spacing adds document height; verify the page end and anchor links still land correctly.
- Verify browser back/forward and refresh restore a coherent state.

## 7. Progress indication without a slider

If the experience needs progress awareness, use ambient, non-interactive cues: chapter numerals that change, a thin progress line, a color/lighting shift, a caption index, scene-change typography. Do not add a scrub bar or draggable handle unless the brief requires direct scrubbing. Make cues `aria-hidden` unless they carry information, in which case expose the same info in text.

Anchored navigation (chapter links) is fine and good for accessibility; implement it with real `<a href="#chapter">` and `scroll-margin-top`.

## 8. Scroll engineering

### 8.1 GSAP + ScrollTrigger with lifecycle safety

```js
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

const mm = gsap.matchMedia();

mm.add(
  {
    desktop: '(min-width: 900px) and (prefers-reduced-motion: no-preference)',
    mobile: '(max-width: 899px) and (prefers-reduced-motion: no-preference)',
    reduced: '(prefers-reduced-motion: reduce)',
  },
  (ctx) => {
    const { desktop, mobile, reduced } = ctx.conditions;

    if (reduced) {
      // static composition: show final states, no scrubbed motion
      gsap.set('[data-reveal]', { autoAlpha: 1, y: 0 });
      return;
    }

    const state = { progress: 0 };           // single source of truth for the scene
    gsap.timeline({
      scrollTrigger: {
        trigger: '#story',
        start: 'top top',
        end: desktop ? '+=300%' : '+=180%',
        scrub: 0.6,                            // short damping, not a floaty lag
        pin: desktop,                          // pin only where it helps
        invalidateOnRefresh: true,
        onUpdate: (self) => { state.progress = self.progress; },
      },
    })
    .to(state, { progress: 1, ease: 'none' }); // scene reads state.progress each frame

    return () => { /* cleanup if needed; matchMedia reverts triggers automatically */ };
  }
);

// on component unmount / route leave:
// mm.revert();
```

Guidelines:
- Create everything inside `gsap.matchMedia()` or `gsap.context()` so teardown is one call.
- In React use `useGSAP()` (or `useLayoutEffect` + `gsap.context`) with `revertOnUpdate` where needed.
- Let the **render loop read** `state.progress` and apply it to the camera and uniforms. Do not call `setState` per scroll tick.
- Do not let two systems (GSAP and an OrbitControls-style controller) both own the camera in the same chapter. Define ownership per chapter.

### 8.2 Lenis (only if you need inertia)

```js
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
let lenis = null;

if (!reduce) {
  lenis = new Lenis({ lerp: 0.1, smoothWheel: true }); // do not smooth touch by default
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((t) => lenis.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);
}
// cleanup: gsap.ticker.remove(fn); lenis?.destroy();
```

Checklist: anchors work (`lenis.scrollTo`), nested scroll areas use the library's prevent attribute, keyboard scrolling and find-in-page still work, `Tab` focus scrolling into view still works, reduced-motion disables it, and it is destroyed on unmount. If native scroll feels fine, skip Lenis.

### 8.3 CSS scroll-driven animations (progressive enhancement)

For simple progress-linked effects with no JS cost:

```css
@supports (animation-timeline: view()) {
  .reveal {
    animation: rise linear both;
    animation-timeline: view();
    animation-range: entry 10% cover 40%;
  }
  @keyframes rise { from { opacity: 0; translate: 0 2rem; } to { opacity: 1; translate: 0 0; } }
}
@media (prefers-reduced-motion: reduce) { .reveal { animation: none; opacity: 1; translate: none; } }
```

Provide a visible-by-default fallback for unsupported browsers (content must never be stuck at `opacity: 0`).

### 8.4 Scroll-to-3D synchronization

- One progress source → derived per-chapter local progress (0..1) via a small helper.
- Interpolate camera/light/material from chapter keyframes defined as **data** (see `blender-three-pipeline.md` §6), not hard-coded across scattered handlers.
- Damp values in the render loop (`THREE.MathUtils.damp(current, target, lambda, delta)`) for frame-rate-independent smoothing.
- Pause expensive updates when the canvas is off-screen.

## 9. Mobile story

- Recompose; do not just shrink. Shorter scroll distances, fewer pins, simpler scene, larger tap targets (at least 44px recommended; 24px is the WCAG 2.2 AA floor).
- Replace hover with always-visible or tap-revealed content.
- Use `svh` and avoid heights that jump when browser bars collapse.
- Keep gyroscope/tilt effects opt-in and permission-aware.
- Avoid horizontal-scroll-by-vertical on very small screens unless you have tested thumb ergonomics.
- Reduce particle counts, shadow quality, texture sizes, and post-processing on touch devices.
- Test landscape.

## 10. Storyboard row template

```
Chapter 03 — "The mechanism"
Purpose:     Show how the lid seals (understanding)
Scroll:      2.4 vh, pinned on desktop; unpinned stack on mobile
Camera:      From (0.0, 0.6, 4.2) to (1.1, 0.2, 2.0), look-at hinge
Subject:     Lid rotates 0 → 110°, internal gasket highlights
Light:       Key warms from 4800K to 3600K
Text:        Headline L-aligned at 0.15–0.45 progress; caption at 0.6
Sound:       (optional) soft latch click at 0.55, off by default
Reduced:     Three static frames with captions
No-WebGL:    Pre-rendered stills
Mobile:      Camera closer, gasket highlight larger, caption below
```
