---
name: immersive-experimental-web-design
description: Build original, art-directed, immersive and experimental websites with editorial design, scroll-led storytelling, purposeful motion, interactive 3D (Three.js, React Three Fiber, GLB/Blender pipelines, shaders), and production-grade frontend engineering. Use this skill whenever the user asks for a portfolio, studio site, product experience, brand site, campaign, digital story, scrollytelling page, 3D landing page, or a redesign that should feel bespoke, cinematic, atmospheric, award-level, or "not like a template" — even if they never say "immersive" or "3D". Also use it when the user supplies reference sites for quality bar, a .blend/.glb/.gltf asset to put on the web, or asks for GSAP/ScrollTrigger/Lenis/WebGL work. Do NOT use it for dashboards, admin tools, forms-heavy apps, documentation sites, or plain marketing pages where the brief wants a conventional layout.
---

# Immersive & Experimental Website Design

Build websites that feel like authored digital experiences: distinctive, coherent, scroll-led, responsive, fast, accessible, and useful. Visual ambition never excuses broken navigation, inaccessible controls, slow loading, clipped content, unreadable type, or fragile code.

## 0. How this skill is organized

This file is the operating manual: principles, workflow, decision rules, gates. Detail lives in `references/`. Read a reference when its phase starts, not all at once.

| Read this | When |
|---|---|
| `references/art-direction-and-content.md` | Phase 2–4: visual thesis, type, color, imagery, copy, design tokens |
| `references/scroll-narrative-and-entrance.md` | Phase 3: chapters, entrance, scroll choreography, pinning, mobile story |
| `references/motion-interaction-audio.md` | Phase 4–5: motion tokens, interaction contracts, cursor, sound, text choreography |
| `references/blender-three-pipeline.md` | Any 3D: Blender export, GLB optimization, Three.js / R3F code, shaders, fallbacks |
| `references/performance-accessibility-resilience.md` | Phase 5–6: budgets, adaptive quality, WCAG, reduced motion, failure states |
| `references/qa-and-delivery.md` | Phase 6–7: test matrix, Playwright script, quality gate, templates, final report |

Templates (experience brief, chapter score, asset manifest, QA report) are in `references/qa-and-delivery.md`.

---

## 1. Mission and quality bar

The target is **not** to reproduce any reference site, trend, or designer's signature. References prove a level of craft; they are not blueprints. Extract principles (composition, pacing, depth, restraint, materiality, technical execution) and invent a direction that belongs to this project.

A strong result has all of these:

- One coherent idea carried by concept, copy, layout, type, color, imagery, 3D, motion, sound, and interaction.
- A first viewport that sets a memorable identity and makes the purpose clear within seconds.
- Scrolling with rhythm: quiet and dense moments, scale changes, deliberate pauses. Not a stack of unrelated sections.
- Interactions that have a reason to exist and give feedback.
- 3D that adds meaning, atmosphere, product understanding, or spatial storytelling. Never 3D to show off.
- Full usability on phones, touch, keyboard, reduced-motion, screen readers, and mid-range hardware.
- Maintainable code, not a single fragile animation demo.

**One-sentence test:** you must be able to state the visual thesis in one sentence, e.g. "A quiet archive where each object is revealed like a specimen." If you cannot, you do not have a concept yet.

---

## 2. When to use, when not to

Use for: portfolios, studio/agency sites, product showcases, brand experiences, campaigns, digital stories, redesigns that need stronger art direction, any site using GLB/Blender/Three.js/R3F/shaders/spatial transitions.

Do not force WebGL where it does not serve the content. The skill requires an *original experience*, not maximum technology.

### 2.1 Does this project need 3D?

| Situation | Choose |
|---|---|
| Physical product whose form, material, or mechanism is the story | Real-time 3D |
| Spatial narrative (journey through a place, architecture, anatomy, scale) | Real-time 3D |
| Atmosphere only, no object to understand | CSS/SVG/canvas 2D, shader background, or video |
| Beautiful but static hero object, rarely interacted with | Pre-rendered image sequence or short looping video; cheaper, more reliable |
| Content-heavy site (articles, docs, listings) | No 3D; strong typography and layout instead |
| Low-end audience, emerging markets, heavy mobile traffic | 3D only as progressive enhancement over a complete 2D experience |

If the answer is "no 3D", say so and deliver an equally ambitious non-3D experience. This is a valid and often better outcome.

---

## 3. Precedence rules (resolve conflicts here)

When instructions inside this skill or from the user collide, apply in this order:

1. **The user's explicit brief.** If they ask for a configurator, a carousel, a slider, or a game HUD, build it well. The interface-restraint defaults below are defaults, not vetoes.
2. **Safety and access.** Keyboard operability, readable content, reduced-motion, no scroll traps, no seizure-risk flashing. These cannot be traded for visual effect.
3. **Performance floor.** The site must load, scroll, and respond on the declared target hardware.
4. **Scroll-first narrative.** Scrolling is the primary interface.
5. **Art direction.** The visual thesis decides the look.
6. **Effects.** Last. Effects serve the layers above them.

If a user's brief conflicts with rule 2 or 3, build the nearest compliant version and state the trade-off in one line. Do not silently comply with an inaccessible request, and do not silently ignore it.

---

## 4. Principles

1. **Originality over imitation.** Never clone a reference's composition, sequence, type pairing, color values, objects, transitions, copy, or choreography. Avoid trend stacks (dark background + huge type + grain + glow gradients + floating blob + glass cards + cursor trail). A trend stack is not a concept.
2. **Purpose before decoration.** Every prominent element must explain, establish identity, guide attention, communicate state, or aid memory. Remove anything that does none. No fake controls, fake stats, filler cards, random particles, or placeholder copy.
3. **Craft over effects.** A restrained, beautifully composed page beats a noisy page full of shaders. Motion and 3D reinforce design; they do not rescue weak design.
4. **Whole journey, not a hero.** Every section gets considered layout, hierarchy, transition, and mobile behavior.
5. **Responsive means recomposed.** Mobile is a different direction, not a shrunk desktop.
6. **Production behavior is design.** Loading, errors, empty states, focus, reduced motion, low power, and WebGL failure are designed states.

---

## 5. Workflow

Never jump straight to writing components. Each phase has an **exit criterion**; do not advance without it.

### Phase 1: Inspect the project
- Read repo structure, package manager, framework, build tools, scripts, routes, entry point, existing components, styles, tokens, fonts, icon and animation libraries, installed 3D deps, and assets (`.blend`, `.glb`/`.gltf`, textures, video, images).
- Continue with the existing stack unless there is a strong technical reason to change. Reuse dependencies before adding new ones.
- Note working behavior to preserve and known responsive issues. Avoid unrelated refactors. Never delete user content or config to simplify your work.
- If the folder is empty, pick a stack using section 6.

**Exit:** a short internal note: stack, constraints, assets, what must change, what must not.

### Phase 2: Experience brief
Decide, in writing (template in `qa-and-delivery.md`): purpose, audience, primary action, 3 to 5 personality attributes (not "modern, clean, beautiful"), visual thesis, material and imagery language, information architecture, interaction model, motion language, 3D role (or explicit "none"), responsive strategy, fallback strategy, target hardware and network.

If the brief is incomplete, make sensible assumptions and list them for easy revision. Do not block on a questionnaire. Ask at most one or two questions, and only when a wrong guess would waste major work (e.g. no subject at all).

**Exit:** the brief exists and the visual thesis passes the one-sentence test.

### Phase 3: Diverge, then choose
Generate **three genuinely different** directions. They must differ in concept, spatial metaphor, composition, and interaction model, not just palette. Score each against the brief (fit, originality, feasibility on target hardware, accessibility risk). Pick one, name why, and keep the rejected two as a source of contrast, not decoration.

Then write the **chapter score**: the entire journey as ordered beats (opening, development, climax, resolution, action). For each: purpose, message, layout, main visual or 3D state, scroll behavior, mobile composition, fallback. Vary density and scale; do not repeat the same two-column block.

**Exit:** a chosen direction and a complete chapter score with a real ending and next action.

### Phase 4: Design system
Define tokens before components: color roles and contrast pairs, type families and fluid scale, spacing scale, widths and grid, borders/radii/shadows/surfaces, motion durations and easings, z-index layers, breakpoints derived from the layout (not device names). Centralize in CSS variables or the project's token system. See `art-direction-and-content.md` and `motion-interaction-audio.md` for starter token sets.

**Exit:** tokens committed; no stray one-off values planned.

### Phase 5: Build in this order
1. Semantic HTML and real content (the page must make sense with CSS and JS off).
2. Global type, color, spacing, layout.
3. Responsive layouts for every chapter.
4. Minimal, functional navigation and controls.
5. Media and 3D assets with loading tiers.
6. Scroll choreography and motion.
7. Loading, error, reduced-motion, no-WebGL, low-power states.
8. Polish.

This order keeps structure and usability from being compromised by effects.

**Exit:** the site works end to end with effects disabled, then improves as layers are enabled.

### Phase 6: Verify in a real browser
Run the project's real dev and build scripts. Drive the running site (see the Playwright pattern in `qa-and-delivery.md`). Check the entrance, every chapter, scroll up and down, resize mid-timeline, touch viewport, reduced motion, WebGL disabled, console errors, layout overflow, performance. A successful compile is not verification. If browser tooling is unavailable, say visual runtime verification was not performed.

**Exit:** the quality gate in `qa-and-delivery.md` passes; failures are fixed or disclosed.

### Phase 7: Report
Deliver the final report format in section 11. Claim only what was implemented and verified.

---

## 6. Stack decisions

Prefer the existing stack. For greenfield work use these defaults and deviate with a stated reason.

| Decision | Default | Choose otherwise when |
|---|---|---|
| Framework | Vite + the user's framework; Next.js if SSR/SEO/routing is needed | Static single page: plain HTML + modules is fine |
| 3D integration | **Vanilla Three.js** for one persistent scene driven by scroll | **R3F + drei** when the app is already React and scene state must share component state |
| Scroll engine | Native scroll + **GSAP ScrollTrigger** | Simple reveals and progress-linked CSS only: **CSS scroll-driven animations** (`animation-timeline: scroll()/view()`) with `@supports` fallback |
| Smooth scrolling | None by default (native scroll feels best and is most accessible) | Use **Lenis** only if the choreography needs inertia; sync it to GSAP's ticker, disable for reduced motion, never hijack wheel/touch |
| Page transitions | **View Transitions API** where supported, with plain fallback | Heavy cross-route 3D continuity: keep one persistent canvas above the router |
| Renderer | **WebGLRenderer** | WebGPU only as an enhancement with automatic WebGL fallback, and only if the effect needs it |
| Model format | **GLB** with Meshopt or Draco + KTX2 | Tiny props: uncompressed GLB is fine |
| Timeline tooling | GSAP timelines mapped to scroll | Hand-authored camera paths: Theatre.js is acceptable if already in the project |
| Styling | Project's system + CSS variables | Never introduce a second styling paradigm |

Check installed versions before writing code. Import paths and APIs (Three.js addons, drei helpers, ScrollTrigger plugins) change between releases; read `package.json` and the library's installed types rather than relying on memory.

---

## 7. Interaction budget (scroll-first by default)

**Hierarchy:**
1. **Scroll** advances the story: chapters, camera, environment, content, lighting.
2. **Passive pointer or device-orientation response**: subtle parallax or object response. No extra controls.
3. **A few direct actions**: start, enter, navigate, submit, choose. Only where scroll cannot express it.
4. **Accessible equivalents**: semantic links, keyboard access, reduced-motion path, non-animated access to the same content.

**Do not add, unless the brief asks:** range sliders or scrubbers, button clusters, per-animation play/pause, prev/next for scroll-discoverable content, tabs/pills/accordions/dropdowns/segmented controls/filter chips, arrow-and-dots carousels, drag knobs, HUDs, control panels, decorative hamburgers, gimmick scroll indicators.

**Allowed visible controls:** primary CTA, minimal navigation (logo/menu/contact), skip link, sound toggle when audio exists, a pause control when auto-playing motion exceeds 5 seconds, form controls, and one signature interaction specific to this project.

Every control that exists must be real. Every interaction has a contract: trigger, feedback, result, keyboard equivalent, touch equivalent, reduced-motion equivalent, failure behavior.

---

## 8. Engineering floor (non-negotiable)

- Semantic structure; real headings, landmarks, links, buttons. Content readable without JS.
- One canvas for the persistent scene unless a budget justifies more.
- No per-frame React state. Use refs, GSAP, or the render loop.
- Animate `transform` and `opacity`; avoid layout-triggering properties in loops.
- Scroll must stay native, bidirectional, resizable, and never trapped. No `preventDefault` on wheel/touch to fake scrolling.
- All timelines, ScrollTriggers, observers, listeners, loaders, and animation frames are created and destroyed in lifecycle-correct places (`gsap.context()`, `useGSAP`, `ctx.revert()`, `dispose()`).
- Render loop pauses when the tab is hidden, the canvas is off-screen, or nothing changes.
- Loading, failure, no-WebGL, WebGL context loss, reduced-motion, and low-power paths exist and were tested.
- Fonts, images, and models are sized, compressed, and lazily loaded by priority.
- No console errors, broken assets, horizontal overflow, clipped text, or stuck scroll at release.

Numbers and techniques are in `performance-accessibility-resilience.md`.

---

## 9. Anti-patterns and their replacements

| Anti-pattern | Replace with |
|---|---|
| 3D hero + fade-in sections + footer | Chapters where scroll changes the scene, camera, light, or subject state |
| Loader that only hides loading | Entrance that orients the visitor and begins the story |
| Floating object with mouse parallax as the "experience" | A model that demonstrates something: explode, section, reveal, scale, transform |
| Same dark + glow + grain treatment on every project | Material and color decisions derived from the subject |
| Opacity-and-translateY on everything | Varied choreography tied to meaning: scale, mask, camera, clip, depth |
| Glass cards for every content block | Cards only for real grouped objects; otherwise typography and space |
| Huge uppercase micro-labels as hierarchy | Scale, weight, and position hierarchy |
| Fake "Explore", "Scroll", "Discover", "Sound" controls | Remove, or implement for real |
| Cursor effects on touch-first content | Pointer-fine only; skip on touch |
| Scroll-jacking with wheel interception | Native scroll mapped to a timeline |
| Lorem ipsum, invented metrics, repeated microcopy | Real content, or clearly marked temporary content with a note |
| A second canvas per section | One persistent scene with chapter states |
| 40 MB hero model | Optimized GLB under budget, tiered loading, poster fallback |
| Desktop screenshot squeezed to mobile | Recomposed mobile layout and simplified scene |

---

## 10. Quality gate (summary)

Full checklist is in `qa-and-delivery.md`. Hard rules:

- A 3D hero with a few fade-in sections and a footer **does not pass**.
- A beautiful entrance with no coherent journey **does not pass**.
- Complex motion with no story **does not pass**.
- A site that only works on a powerful desktop **does not pass**.
- A site that is inaccessible by keyboard or traps scroll **does not pass**.
- A site whose controls are decorative or inert **does not pass**.

---

## 11. Agent behavior

Act as an experience director and senior creative developer, not a template generator.

1. **Inspect before building.** Read the project, then write the brief and chapter score.
2. **Do not settle for the first plausible design.** Compare three directions.
3. **Handle references honestly.** If the user supplies URLs, inspect only what you can actually access and observe. Never claim to have studied interactions you could not load. Use them as a quality bar; never copy assets, text, sequences, or signatures.
4. **Build the complete journey.** Entrance, chapters, interaction, resolution, ending. No placeholder sections.
5. **Prefer authored scenes over stacked effects.** If a scene needs a custom model or material, say what asset is needed and use a clearly temporary stand-in only if it does not undermine the result.
6. **Make real controls work.** Do not present unimplemented features as functional.
7. **Verify in a browser** and fix visual defects before reporting. If you cannot, disclose it.
8. **Log assumptions** in one short list; keep them easy to change.
9. **Keep changes scoped.** Respect existing architecture, naming, and behavior.
10. **Never claim** a feature, animation, browser test, device test, or performance number that was not implemented or measured.

### Final report format

Report briefly:
- Concept and narrative arc (visual thesis, chapters).
- Entrance interaction.
- Chapter and signature interactions implemented.
- Key assets and technologies.
- Responsive, accessibility, and reduced-motion behavior.
- Performance and fallback work, with measured numbers where measured.
- What was verified (viewports, browsers, tools) and what was not.
- Known limitations and assumptions.

---

## 12. Final directive

Build a website that feels like entering a designed world with a reason to explore it. The visitor should be invited in, oriented, given agency, guided through meaningful discoveries, and brought to a satisfying resolution with a real next action.

References set an ambition for **entrance, continuity, cinematic pacing, scroll-led storytelling, interactivity, and craft**. They do not define the design. Invent a new world, language, and story for every project.

**Do not deliver a 3D-themed website. Deliver a complete interactive experience.**
