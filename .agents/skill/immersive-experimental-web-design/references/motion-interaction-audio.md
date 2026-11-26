# Motion, Interaction, Cursor, Sound, Text Choreography

Contents: 1 Motion language · 2 Motion tokens · 3 Rules · 4 Interaction contracts · 5 Navigation · 6 Interactive 3D objects · 7 Cursor · 8 Micro-interactions · 9 Sound · 10 Text choreography · 11 Persistent UI

---

## 1. Define a motion language

Pick a consistent system for:

- **Duration:** feedback, standard transition, cinematic movement.
- **Easing:** crisp ease-out for arrivals, symmetric in-out for repositioning, linear only for movement tied directly to physical progress (scroll-scrubbed).
- **Direction:** where things enter and leave, and why (e.g. everything arrives from the "light source" side).
- **Stagger:** how groups reveal relative to each other; keep gaps small (40 to 90 ms).
- **Distance:** how far elements travel; small for UI (8 to 32px), larger only for hero moments.
- **Depth:** how scale, blur, opacity, and parallax express space.
- **Continuity:** how one chapter hands off to the next (shared element, shared motion curve, shared light).

Write the motion language in one paragraph in the brief, e.g. "Slow, weighted arrivals that decelerate like heavy objects; hard cuts only at chapter boundaries; no bounce."

## 2. Motion tokens

```js
// motion.js — single source for timing, imported by CSS-in-JS, GSAP, and Three code
export const motion = {
  dur:   { fast: 0.16, base: 0.32, slow: 0.64, cine: 1.2 },      // seconds
  ease:  { out: 'power3.out', inOut: 'power2.inOut', linear: 'none' },
  dist:  { ui: 16, section: 48, hero: 120 },                     // px
  stagger: { tight: 0.04, base: 0.07, loose: 0.12 },
};
```

Mirror the same values as CSS variables so DOM and canvas animation feel like one system. Do not assign ad-hoc durations per component.

## 3. Motion rules

- Motion clarifies; it never delays access to content.
- Primary content is visible quickly. No mandatory long intro to use the site.
- Avoid long entrance sequences for ordinary text and controls.
- Animate `transform` and `opacity`; use `will-change` sparingly and remove it after the animation.
- Avoid constant ambient motion that competes with reading; if ambient motion exists, keep it low-amplitude and slow.
- Do not animate all sections the same way.
- Animations must fail safe: if JS or WebGL fails, content remains visible. Prefer "hidden only after JS confirms it will animate" (add a `js-ready` class, then set initial hidden states).
- Make state deterministic so repeat visits, back/forward, and anchors behave consistently.
- No flashing more than three times per second; avoid large high-contrast flicker (WCAG 2.3.1).
- Avoid excessive scroll-linked transforms on text; large moving text is hard to read and can cause discomfort.
- Respect `prefers-reduced-motion` in CSS, GSAP, **and** Three.js (see `performance-accessibility-resilience.md` §6).
- Clean up timelines, observers, listeners, and rAF on unmount.

## 4. Interaction contracts

Before building any interaction, write its contract:

| Field | Example (signature interaction: "open the case") |
|---|---|
| Purpose | Let the visitor see the interior without leaving the story |
| Trigger | Click/tap on the case; Enter/Space when focused |
| Affordance | Cursor change (fine pointers), subtle pulse on first view, visible label for touch |
| Feedback | Immediate (≤100 ms) highlight, then lid animation |
| Result | Lid opens, caption appears, scroll resumes |
| States | idle, hover/focus, pressed, active, disabled, error |
| Keyboard | Focusable button element with visible focus ring |
| Touch | Tap target ≥ 44px; no hover dependency |
| Reduced motion | Instant state change with fade, no camera travel |
| Failure | If scene is unavailable, show the static interior image |

Interaction grammar: define a small, consistent vocabulary (scroll = progress; hover/focus = inspect; click/tap = commit; drag = rare and always with alternative). Do not mix metaphors across chapters without reason.

Use real elements: `<button>` for actions, `<a>` for navigation. Canvas-only interactions must have DOM equivalents.

## 5. Navigation

- Minimal: logo, a compact menu or a few links, primary CTA.
- Real links with real `href`s so open-in-new-tab, copy link, and crawling work.
- Chapter navigation (if any) is anchor-based and works with the scroll system.
- Active state reflects the current chapter without relying on color alone.
- Menu overlay: focus trap while open, `Escape` closes, background inert (`inert` attribute), focus returns to the trigger on close.
- Don't hide primary navigation behind an unlabeled icon-only control without an accessible name.
- Keep a persistent skip link as the first focusable element.

## 6. Interactive 3D objects

- **Raycast** only against simplified proxy meshes or a limited list of interactables, not the whole scene graph, and only on pointer events that matter (throttle `pointermove`).
- Give every interactive object: hover state, focus-equivalent DOM control, pressed state, disabled state.
- Provide DOM buttons (visually hidden if the design is canvas-only) for each canvas hotspot, so keyboard and screen-reader users can reach them.
- Pointer-driven response (tilt, look-at) uses damped values and caps; disable on touch unless it has a touch equivalent.
- Dragging/orbiting: constrain polar and azimuth angles and distance, add inertia, provide a reset, and never trap the page scroll (use `touch-action` carefully; allow vertical page scroll over the canvas on touch unless the canvas is the focused task).
- Never let user control break the narrative camera: define when control is granted and when it returns to the scripted path.

## 7. Cursor and pointer effects

- Pointer-fine devices only: `@media (hover: hover) and (pointer: fine)`.
- Never remove the native cursor without providing a clearer one; keep click targets obvious.
- Custom cursors must not lag so much that precision suffers; keep the interactive hotspot aligned to the real pointer.
- Cursor states communicate real affordances (link, drag, view, disabled), not decoration.
- No cursor trails or magnetic effects on text-heavy areas.
- Disable under reduced motion if the effect involves continuous following motion.

## 8. Micro-interactions

Short feedback for press, focus, validation, toggles, and copy-to-clipboard. 100 to 200 ms, ease-out, small scale/opacity changes. Focus styles are never removed without a stronger replacement (`:focus-visible` ring with ≥3:1 contrast and at least 2px thickness). Hover alone never carries essential information.

## 9. Sound

- Off by default. Autoplaying audio is blocked by browsers and unwelcome to users.
- Offer one real toggle (labeled, with state) if sound exists; remember the choice.
- Start audio only after a user gesture; use the entrance's "enter" action when sound is a core part of the concept.
- Sound is designed: ambient bed, a few sparse event sounds mapped to meaningful moments; fades in and out; normalized loudness; never loud peaks.
- Pause on tab hidden; respect system mute where detectable; provide captions/text for any information carried only by audio.
- Compress and lazy-load audio; do not block the entrance on it.

## 10. Text choreography and editorial motion

- Reveal text in meaningful chunks (line or phrase), not per-character for long paragraphs.
- Keep reading speed in mind: never animate text so slowly that reading is delayed.
- Split-text rules: preserve accessible text (`aria-label` on the container, `aria-hidden` on animated fragments), recompute on resize and after fonts load, and revert splits on cleanup.
- Large display type can use masks, clip-paths, variable-font axis changes, and scale; body text uses simple fades or none.
- Keep text over 3D legible at every scroll position: scrims, safe zones from the camera framing, and text that moves out of the way of the subject.
- Do not animate letter-spacing or layout properties in loops.

## 11. Persistent interface inside the experience

Persistent UI (logo, menu, CTA, chapter label) should be:

- Small and stable; it frames the experience without competing with it.
- Adaptive to the chapter's background contrast (switch tone or add a blend/scrim; test at all scroll positions).
- Not overlapping essential content or the subject.
- Reachable by keyboard, with visible focus and logical tab order.
- Hidden or simplified during the entrance when appropriate, but never unreachable for assistive tech.
