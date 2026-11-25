---
name: immersive-experimental-web-design
description: Build original, highly art-directed, immersive and experimental websites using strong editorial design, purposeful motion, interactive 3D, and production-grade frontend engineering. Use when creating or redesigning a portfolio, product experience, brand site, studio site, campaign, digital story, or other website that should feel bespoke, atmospheric, interactive, and technically polished rather than like a generic template.
---

# Immersive & Experimental Website Design Skill

## 1. Mission

Create websites that feel like carefully art-directed digital experiences: distinctive, atmospheric, coherent, interactive, responsive, fast, accessible, and genuinely useful.

The target is **not** to reproduce a particular reference website, award-winning layout, visual trend, or designer's signature. References are evidence of a level of craft and a set of possibilities, not templates. Study the principles behind them—composition, pacing, depth, interaction, materiality, typography, restraint, and technical execution—then invent a visual direction that belongs to the current project.

A strong result should feel deliberately designed at every level:

- The concept, content, layout, typography, color, imagery, 3D world, motion, sound (when appropriate), and interaction all support one coherent idea.
- The first viewport establishes a memorable visual identity and makes the purpose of the site understandable.
- Scrolling feels composed, with a clear rhythm rather than a stack of unrelated sections.
- Interactions have a reason to exist and provide useful feedback.
- 3D adds meaning, atmosphere, product understanding, or spatial storytelling. It is never included merely to advertise technical ability.
- The experience remains usable on narrow screens, touch devices, keyboard-only navigation, reduced-motion settings, and less powerful hardware.
- The implementation is maintainable and production-minded—not a single fragile animation demo.

**Quality standard:** bespoke art direction with the reliability of a well-engineered product. Visual ambition does not excuse broken navigation, inaccessible controls, slow loading, clipped content, unreadable typography, or fragile code.

---

## 2. When to use this skill

Use this skill when the task calls for one or more of the following:

- Immersive, experimental, expressive, or award-quality web design.
- A 3D-led landing page, product showcase, portfolio, studio site, brand experience, or interactive campaign.
- A website using Blender models, `.blend` source projects, glTF/GLB assets, Three.js, React Three Fiber, shaders, or spatial transitions.
- A conventional website redesign that needs a stronger visual concept, more sophisticated art direction, and a distinctive motion language.
- A page that should feel cinematic, editorial, tactile, spatial, playful, surreal, minimal, or otherwise intentionally authored.

Do not force a 3D scene into a task whose content and goals do not benefit from one. The skill requires an original experience, not the maximum possible amount of WebGL.

---

## 3. Non-negotiable principles

### 3.1 Originality over imitation

1. Never trace, clone, or reproduce a reference site's exact composition, page sequence, typography pairing, color values, 3D object, transitions, copy, or interaction choreography.
2. Extract high-level principles from references, then create a new combination appropriate to the project.
3. Do not use the same fashionable treatment on every project. A dark background, huge typography, grain, glowing gradients, floating objects, cursor effects, and glass panels are not a design concept by themselves.
4. Give the project a recognizable visual thesis. Be able to describe it in one sentence, for example: “A quiet archive where each object is revealed like a specimen,” or “A kinetic product laboratory built around precision and controlled movement.”
5. Use references as a quality bar, not as a source of assets or a blueprint.

### 3.2 Purpose before decoration

Every prominent visual element must do at least one of these jobs:

- Explain the product, brand, service, or story.
- Establish the visual identity or emotional tone.
- Guide the viewer's attention or hierarchy.
- Communicate state, progress, depth, or interaction.
- Make the content easier to understand or remember.

Remove elements that do none of these jobs. Do not add fake controls, arbitrary stats, meaningless labels, random particles, filler cards, decorative navigation, or fake functionality.

### 3.3 Craft over effects

Prioritize composition, proportion, type, color, spacing, imagery, and narrative before elaborate effects. A restrained, beautifully composed page is better than a noisy page with many shader effects. Motion and 3D should reinforce the design rather than conceal weak design decisions.

### 3.4 Complete experience, not just hero section

Do not spend all effort on the first viewport and leave the remaining page generic or unfinished. Every section must have a considered layout, content hierarchy, transition into the next section, and responsive behavior.

### 3.5 Responsive by design

Do not treat mobile as a desktop screenshot compressed into a narrow width. Recompose layouts, change interaction models, simplify 3D where needed, and preserve the core idea on touch devices.

### 3.6 Production behavior is part of design

Loading, errors, empty states, keyboard focus, reduced motion, low-power devices, and failed WebGL initialization are designed states. Do not leave them to chance.

---

## 4. Operating procedure

Follow this workflow for every project. Do not jump directly into writing components before understanding the project and defining a direction.

### Phase 1 — Inspect the project before changing it

1. Inspect the repository structure, package manager, framework, build tools, scripts, routes, existing components, styles, assets, and installed dependencies.
2. Read the existing app entry point and relevant page/component files. Identify what is already working.
3. Check whether the project uses React, Next.js, Vite, Vue, plain HTML, or another stack. Continue with the existing stack unless there is a strong technical reason to change it.
4. Check existing design tokens, fonts, icon libraries, animation packages, and 3D dependencies before adding new ones.
5. Identify the current route and page scope. Avoid unrelated refactors.
6. Inspect available images, videos, fonts, `.blend` files, `.glb`/`.gltf` files, and textures. Reuse relevant project assets where appropriate.
7. Check existing responsive behavior and known issues. Preserve working functionality.
8. Do not delete user content or configuration merely to simplify implementation.

**Output of this phase:** a short internal understanding of the stack, constraints, existing functionality, available assets, and what must change.

### Phase 2 — Define the design direction

Before coding, establish:

- **Purpose:** What is the site for, and what should a visitor understand or do?
- **Audience:** Who is visiting, what do they know, and what matters to them?
- **Primary action:** What is the most important action or next step?
- **Personality:** Choose a small number of clear attributes, not a generic list such as “modern, clean, beautiful.”
- **Visual thesis:** One sentence describing the central creative idea.
- **Art direction:** Define the visual world, references at a principle level, material language, imagery style, and overall atmosphere.
- **Information architecture:** Decide what content appears and in what order.
- **Interaction model:** Define a scroll-first narrative. Scrolling is the primary interface; direct controls are exceptional, minimal, and justified. Specify keyboard, touch, and reduced-motion equivalents.
- **Motion language:** Define the pace, easing, direction, and role of movement.
- **3D role:** State exactly what the 3D scene contributes. If it adds no meaningful value, do not use it.
- **Responsive strategy:** Decide how the experience changes at phone, tablet, laptop, and large desktop sizes.
- **Fallback strategy:** Define the experience when WebGL, motion, or high-resolution assets cannot be used.

If the brief is incomplete, make sensible assumptions based on the content and existing project. Avoid blocking progress with a long questionnaire. Keep assumptions easy to revise.

### Phase 3 — Design the full page before implementation

Create a section-by-section plan. For each section specify:

- Purpose and key message.
- Content and action.
- Layout and visual hierarchy.
- Main visual asset or 3D composition.
- Entrance, exit, and scroll behavior.
- Mobile composition.
- Loading or fallback behavior, where relevant.

Plan the entire page as one visual sequence. A good page has variation and rhythm: quiet moments, dense moments, large/small scale changes, image-led sections, text-led sections, and deliberate pauses. Avoid repeating the same two-column section over and over.

### Phase 4 — Establish the design system

Define reusable tokens before polishing individual components:

- Color roles and contrast rules.
- Type families, weights, sizes, line heights, and tracking.
- Spacing scale and section spacing.
- Content widths and grid rules.
- Border, radius, line, shadow, and surface treatments.
- Motion durations, easing curves, stagger intervals, and distance values.
- Layering and z-index conventions.
- Breakpoints based on the actual layout, not arbitrary device names.

Centralize values in CSS variables, theme tokens, or the project's existing token system. Avoid one-off values scattered throughout the code without a reason.

### Phase 5 — Build the complete experience

Implement in this order:

1. Semantic page structure and content.
2. Global typography, color, spacing, and layout system.
3. Main responsive layouts.
4. Minimal, necessary navigation and functional controls. Do not invent sliders, button clusters, tabs, carousels, or control panels; the narrative should progress through scrolling.
5. Images, video, and 3D assets.
6. Motion and interaction.
7. Loading, error, reduced-motion, and fallback states.
8. Fine visual polish.

This order protects usability and structure from being compromised by visual effects.

### Phase 6 — Review and refine

Run the project using its real development/build scripts. Inspect all sections and interactions, fix errors, and validate multiple viewport widths. Do not declare completion based only on a successful compile.

---

## 5. Art direction and visual design

### 5.1 Create a coherent visual world

Choose an art direction that fits the subject. It may be minimal, expressive, editorial, architectural, organic, technical, surreal, brutalist, playful, luxurious, scientific, or something else. The direction must emerge from the content rather than a trend checklist.

Translate the direction into consistent visual decisions:

- What is the dominant visual metaphor?
- Is the world bright, dark, neutral, warm, clinical, analog, digital, natural, or synthetic?
- Are surfaces matte, glossy, metallic, translucent, rough, paper-like, liquid, or emissive?
- Are forms geometric, organic, precise, irregular, monumental, delicate, or modular?
- Is the composition balanced, asymmetric, centered, cropped, layered, or intentionally unstable?
- Does the site feel calm, energetic, mysterious, tactile, playful, or formal?

Do not combine unrelated visual languages without a deliberate reason.

### 5.2 Composition and hierarchy

- Establish one dominant focal point per viewport or section.
- Create hierarchy through scale, position, contrast, whitespace, and typography—not through decoration alone.
- Use asymmetry when it improves tension, movement, or storytelling; do not make every section asymmetrical just to appear experimental.
- Use cropping deliberately. Important content must not be accidentally clipped.
- Keep alignment intentional. A layout can break the grid, but it should look deliberately broken.
- Use whitespace as an active compositional element.
- Create meaningful transitions in scale and density between sections.
- Use full-bleed media only when it serves the narrative and remains legible.
- Avoid making every item a rounded card. Use cards only when the content represents a real grouped object or action.

### 5.3 Typography

Typography is a primary design material, not a finishing touch.

- Select typefaces according to the project's personality and reading needs.
- Use a limited, coherent type system. One family with multiple weights may be enough; a second family should have a clear role.
- Establish a clear scale for display, heading, body, label, caption, and utility text.
- Use fluid sizing where appropriate with `clamp()` and sensible maximums.
- Control line length. Long paragraphs should not span the entire screen on desktop.
- Use line height and letter spacing intentionally. Display text may use tight leading; body text needs comfortable readability.
- Avoid excessively small uppercase labels as a substitute for hierarchy.
- Ensure headings wrap well at all viewport widths. Do not rely on forced line breaks that fail on mobile.
- Use real content. Do not fill space with fake Latin, meaningless microcopy, repeated labels, or invented metrics.
- Load fonts efficiently. Prefer local, licensed, optimized font files where available; use `font-display: swap` or an intentional equivalent.

### 5.4 Color and contrast

- Define colors by role: background, foreground, muted text, surface, border, accent, interactive, and status.
- Build a controlled palette. One strong accent is often more effective than several competing accents.
- Ensure text and controls remain legible over images and 3D scenes.
- Add overlays or dedicated text surfaces when contrast varies behind text.
- Do not use low-contrast gray text simply because it looks fashionable.
- Never communicate state using color alone.
- Check color contrast for essential text and interface controls.

### 5.5 Imagery and media

- Use images that are relevant, high-quality, and consistent with the art direction.
- Prefer authentic project/product photography, original artwork, or intentionally created imagery over generic stock.
- Crop with a clear focal point and preserve important details at smaller widths.
- Define image aspect ratios to prevent layout shift.
- Use modern image formats where supported and size assets for their display dimensions.
- Lazy-load below-the-fold media; prioritize the actual hero asset when it is critical to the initial experience.
- Provide useful alternative text for meaningful images and empty alternative text for purely decorative images.
- Avoid using an image as a substitute for actual text or accessible controls.

### 5.6 Surface, depth, and detail

Use borders, shadows, grain, blur, gradients, reflections, and texture sparingly and consistently. A surface treatment should communicate material, depth, grouping, or focus. Avoid adding blur, glow, noise, and gradients to every element. Fine details should reward attention without competing with the main hierarchy.

---


## 6A. Scroll-first storytelling: the default interaction system

**This section overrides any generic suggestion elsewhere in this skill to add controls, buttons, sliders, tabs, carousels, toggles, or draggable widgets.**

The default experience must be driven by the visitor's natural page scroll. The website should feel like one continuous, art-directed journey in which the story, environment, typography, 3D scene, camera, lighting, soundscape, and content evolve together as the visitor moves down the page.

Do not interpret “interactive” as “add lots of things to click.” Interpret it as **the page itself responds meaningfully to the visitor's progression**.

### 6A.1 The governing rule

Build the experience around this interaction hierarchy:

1. **Primary interaction — scroll:** the visitor moves through a composed narrative. Scroll progress reveals chapters, transforms the environment, moves the camera, changes the composition, introduces content, and advances the story.
2. **Secondary interaction — passive pointer response:** where appropriate, the scene may subtly respond to pointer position, hover, or device orientation without presenting extra controls.
3. **Tertiary interaction — a small number of meaningful direct actions:** use a click, tap, or key only when the visitor must intentionally begin, navigate, choose, submit, or access something that cannot reasonably be expressed through scrolling.
4. **Accessibility alternatives:** provide semantic links, keyboard access, reduced-motion behavior, and clear non-animated access to the same information. These are not an excuse to clutter the visual experience with visible controls.

The scroll narrative is the product's main interface. Do not build a conventional dashboard, configurator, game HUD, or control panel unless the brief explicitly asks for one.

### 6A.2 Strict interface restraint

Unless the brief explicitly requires them, do not add:

- Range sliders, scrubbers, timeline handles, progress sliders, or draggable knobs.
- Rows or clusters of buttons.
- Play/pause buttons for every animation.
- Previous/next buttons for content that should be discovered through scrolling.
- Tabs, pills, accordions, dropdowns, segmented controls, or filter chips.
- Carousels with arrows or pagination dots.
- Floating action buttons, sticky toolbars, control docks, or persistent bottom bars.
- On-screen keyboard shortcuts, instruction panels, or tutorial overlays that explain obvious scrolling.
- Fake toggles for lighting, camera modes, themes, quality settings, or visual effects.
- Repeated “Explore,” “Discover,” “Learn more,” or “Scroll to explore” buttons in every section.
- Decorative buttons that only exist to make a screen look interactive.
- A visible settings panel for interactions that can happen naturally through the story.

**Default visible UI should be close to zero.** The scene, typography, content, and motion should carry the experience. Add only the interface elements required for orientation, accessibility, and the site's actual business goal.

A small opening cue such as “Scroll to enter” may be used when the interaction is not otherwise obvious. It should be typographic, understated, and disappear once the visitor begins. Do not turn it into a large button.

### 6A.3 Design the whole journey as chapters

Before implementation, write a scroll-story map. Every chapter must have a narrative purpose and a distinct visual state. Example structure (adapt to the project; never copy this sequence blindly):

| Chapter | Narrative purpose | Scroll-driven visual behavior |
|---|---|---|
| Threshold | Establish atmosphere and invite entry | The initial world resolves from darkness, stillness, or a restrained loading transition |
| Arrival | Reveal the subject and establish context | Camera eases into the scene; primary title and first message appear |
| Discovery | Introduce the first meaningful idea | The environment changes; a model, object, or visual metaphor is revealed |
| Deepening | Add detail, evidence, or emotional stakes | Camera travels, object transforms, layers separate, or content is progressively uncovered |
| Turning point | Create a memorable shift | A deliberate scene transition, spatial change, scale shift, light change, or narrative reveal |
| Resolution | Make the meaning clear | Motion settles; the core message or offering becomes legible |
| Departure / action | Give the visitor a useful next step | A restrained final CTA or semantic link appears in context |

The chapter count must follow the content. Do not add empty chapters merely to create a longer scroll.

For each chapter, specify:
- Its narrative purpose and the information the visitor should understand.
- Its visual composition and focal point.
- The 3D scene state: model position, camera position, orientation, scale, visibility, material, and lighting.
- The DOM state: headline, body copy, labels, imagery, and their hierarchy.
- The transition into the chapter and out of it.
- The scroll interval or progress range that controls the transition.
- What happens when the visitor scrolls backward.
- Its mobile adaptation and reduced-motion equivalent.

### 6A.4 Scroll is the timeline, not a trigger collection

Use scroll progress to orchestrate coherent sequences, not to fire unrelated animations whenever an element enters the viewport.

Preferred patterns:
- A continuous camera move through a single spatial environment.
- A model that changes state as the narrative explains its parts or meaning.
- A product or object that rotates, opens, assembles, disassembles, or changes material in sync with the story.
- Text that enters, holds long enough to read, and exits in rhythm with the scene.
- Background architecture, lighting, atmosphere, or color that evolves across chapters.
- A transition from one visual world to another without an obvious stack of unrelated section cards.
- A pinned scene in which the story progresses through several carefully timed states while the visitor continues normal scroll input.
- Depth layers moving at different rates when this supports spatial understanding.
- A final camera pullback or visual resolution that gives the visitor a sense of completion.

Avoid:
- Every element fading up independently.
- A generic collection of fade/slide animations on every section.
- Random parallax on every image.
- Animations with no relationship to the message being communicated.
- Scroll-triggered movement that starts before the visitor can read the content.
- A pinned section that traps the visitor or delays access to the rest of the page.
- Excessive scroll distance used only to make animations feel longer.

### 6A.5 The entrance must feel like crossing a threshold

When the concept calls for an immersive entrance, treat it as the opening scene of the narrative—not a generic loading screen and not a button-heavy landing page.

Design the entrance deliberately:
1. Establish an immediate visual atmosphere. Avoid showing a generic navbar, card grid, and large CTA before the experience has a chance to establish its identity.
2. Make the subject or central visual idea intriguing but understandable.
3. Use composition, scale, lighting, depth, restrained typography, and a clear focal point to create anticipation.
4. Let the visitor enter through natural scroll when that is the chosen interaction model. A short, subtle “Scroll to enter” cue is enough if needed.
5. As the visitor scrolls, let the opening scene physically or visually respond: reveal depth, move the camera, bring the subject into focus, open a passage, transform a shape, or transition into the first chapter.
6. Once the entrance is complete, do not keep the visitor inside a forced intro. Hand control back to normal, predictable scrolling.
7. Never make the visitor wait through a long animation before accessing essential information.
8. If a start action is genuinely necessary (for example, browser audio restrictions or an intentional full-screen experience), use one clearly labeled, contextually designed entry action—not a collection of controls. The rest of the experience remains scroll-led.

The entrance must be designed and implemented as part of the narrative timeline. It must not feel like a separate template pasted above the actual website.

### 6A.6 Choreograph content and 3D together

Do not place a 3D canvas behind a conventional sequence of text sections and call that immersive.

Instead, compose each chapter as one integrated scene:
- Text placement should relate spatially to the model and camera composition.
- Copy should explain or deepen what the visitor is seeing at that exact moment.
- The model should react to the narrative rather than rotate continuously as decoration.
- Camera movement should reveal information or change the visitor's understanding.
- Lighting and material changes should signal narrative progression.
- The DOM and WebGL scene must share a coordinated timeline.
- Content must remain readable and must not be hidden behind the canvas.
- The same scroll position must produce a coherent state across the DOM and 3D scene.

Use a small number of strong, legible narrative statements. Do not fill the experience with tiny captions, technical labels, floating UI tags, or arbitrary data readouts unless the concept genuinely needs them.

### 6A.7 Progress indication without a slider

If visitors need orientation in a long experience, use a quiet progress treatment:
- A thin page-edge line, small chapter marker, understated progress fill, or discreet chapter name.
- It must be passive and must not look draggable.
- It must not compete with the artwork or content.
- It may update as the visitor scrolls.
- It must not become a permanent dashboard or a row of chapter buttons.
- If chapter navigation is genuinely useful, use a minimal semantic navigation list or skip links that remain keyboard-accessible; keep it visually restrained.

Do not use a range input, draggable scrubber, or slider as a substitute for normal page scrolling.

### 6A.8 Use pinned scenes selectively

Pinned storytelling can create a cinematic sequence, but it is not mandatory for every chapter.

Use a pinned scene only when:
- The scene needs time to transform while the visitor continues scrolling.
- Multiple narrative beats share one spatial environment.
- The camera or object needs a continuous, reversible timeline.
- The content benefits from a controlled reveal.

Implementation requirements:
- The pinned duration must be proportional to the amount of content and motion.
- The visitor must remain in control of scroll direction and speed.
- Reverse scrolling must reverse or restore the correct scene state.
- Avoid nested scroll areas and wheel hijacking.
- Do not pin the entire website.
- Do not pin large text blocks for longer than they need to be read.
- Release the pin cleanly into normal document flow.
- Test on trackpads, mouse wheels, touch screens, keyboard scrolling, and browser zoom.
- Ensure deep links and refresh at an anchor produce a valid state.

### 6A.9 Scroll-driven motion engineering

- Prefer a single normalized narrative progress value per pinned story sequence, mapped to a well-defined timeline.
- Use GSAP ScrollTrigger for complex scrubbed sequences where it materially improves orchestration.
- Use CSS scroll-driven animations only where browser support and complexity make them suitable.
- Use IntersectionObserver for simple reveal or lazy-loading behavior, not as a replacement for a continuous timeline.
- Keep DOM and WebGL animation state synchronized from a shared timeline or shared progress value.
- Animate transforms and opacity where possible; avoid layout-thrashing properties.
- Keep scroll handlers lightweight. Do not run expensive React state updates on every scroll event.
- Use refs or direct animation APIs for high-frequency updates.
- Avoid independent competing smooth-scroll and animation loops.
- Recalculate measurements on resize and content changes.
- Clean up timelines, ScrollTriggers, observers, event listeners, and animation contexts.
- Ensure the scene can be restored deterministically after refresh, route changes, resize, and reverse scroll.

### 6A.10 Natural scrolling is mandatory

Native document scrolling is the default interaction foundation.

- Do not hijack the wheel or touch gestures to simulate a slideshow.
- Do not require the visitor to drag a model to continue the story.
- Do not require clicking “Next” to progress between chapters.
- Do not block scrolling while an animation finishes.
- Do not force a specific scroll speed.
- Do not trap focus inside a full-screen scene.
- Do not make the experience impossible to navigate with Page Down, Space, arrow keys, Home, End, or browser scrollbars.
- Smooth scrolling is optional and must preserve native expectations.
- The visitor must be able to scroll quickly past nonessential animation and still access all content.

### 6A.11 Mobile scroll storytelling

Mobile must preserve the narrative, not merely display a simplified desktop page.

- Use touch scroll as the primary progression mechanism.
- Remove hover-only information and pointer-dependent interactions.
- Avoid drag gestures that conflict with vertical scrolling.
- Reduce scene complexity, render resolution, particle count, and animation intensity when necessary.
- Reframe camera compositions for portrait viewports.
- Shorten pinned sequences when mobile scroll distances become uncomfortable.
- Ensure touch momentum and browser UI changes do not cause timeline jumps.
- Keep copy visible and readable even when the 3D scene is simplified or replaced by a static/2D fallback.
- Do not add a set of mobile-only buttons to compensate for a broken desktop interaction model.

### 6A.12 Accessibility and non-motion equivalents

Scroll-led storytelling must not make content inaccessible.

- All essential copy must exist in the document in a meaningful reading order.
- Provide semantic headings and landmarks.
- Use normal links for actual navigation and actions.
- Ensure keyboard users can reach all content and any essential action.
- Respect `prefers-reduced-motion`; provide a calm, non-scrubbed reading experience with all information available.
- Avoid flashing, rapid zooms, forced camera motion, and motion that can cause discomfort.
- Do not require sound to understand the story.
- Any audio must remain muted until explicitly started, and the experience must remain complete without it.
- Provide a skip-to-content link where appropriate.
- Do not hide critical content solely in a WebGL canvas or hover state.

### 6A.13 The only justified visible controls

Visible controls are permitted only when they serve a real user need that cannot be met more naturally by scrolling or semantic page navigation.

Usually acceptable, when relevant:
- One entry action if browser restrictions or the concept truly requires an explicit start.
- One mute/unmute control if the experience contains optional sound.
- A standard menu or navigation link if the site has multiple destinations.
- A clear final call to action tied to the site's actual goal.
- Essential form controls when the site genuinely needs user input.
- A close/back control for a real modal or overlay.

Even these must be visually integrated and restrained. Do not add all of them automatically. If the experience does not need audio, do not add a sound toggle. If there is no meaningful menu, do not invent one. If scrolling already advances the narrative, do not add next/previous buttons.

### 6A.14 Pre-build scroll storyboard

Before coding, produce a compact internal storyboard with one row per chapter:

| Field | Required definition |
|---|---|
| Chapter name | A meaningful narrative beat |
| Visitor takeaway | What the visitor should understand or feel |
| Scroll range | Approximate normalized progress or section boundary |
| Camera | Start/end position, target, focal length, and movement |
| Main subject | Object, model, environment, or visual metaphor |
| Subject action | What changes and why |
| Environment | Background, lighting, atmosphere, depth |
| Typography | Exact message, placement, entrance, hold, exit |
| Transition | How this chapter becomes the next |
| Interaction | Scroll behavior first; any exceptional direct action justified |
| Mobile | Reframed or simplified equivalent |
| Reduced motion | Static or low-motion equivalent |

Do not begin building a pile of buttons or isolated sections before this storyboard is coherent.

### 6A.15 Mandatory anti-control review

Before considering the page complete, inspect the rendered experience and ask:

- Did I add a range slider, scrubber, or drag handle? If yes, remove it unless the brief explicitly requires a real adjustable value.
- Did I add buttons to move through a story that should advance by scrolling? Remove them.
- Did I add multiple controls for visual effects, camera angles, or scene states? Remove them unless these are core user features.
- Did I add tabs, cards, or carousels where a continuous visual narrative would be stronger? Rework the flow.
- Does the visitor understand that they can scroll without a large instruction panel?
- Does each scroll movement reveal or transform something meaningful?
- Are there moments of stillness so the visitor can read and absorb the scene?
- Does the narrative have a beginning, progression, turning point, and resolution?
- Do the 3D scene, typography, and environment feel like one designed composition?
- Can the visitor reverse-scroll naturally?
- Is the experience still complete on mobile and with reduced motion?
- Are there only the few visible controls that the actual task requires?

**Pass condition:** a visitor can experience the complete narrative primarily by scrolling. Visible controls are rare, justified, and secondary. If the page looks like a standard website surrounded by a 3D canvas and a control panel, it fails this skill.

---


## 6. Interaction and experience design

### 6.1 Every interaction needs a clear contract

Apply Section 6A first: scroll-led storytelling is the default. Do not create a visible control simply because an interaction could be implemented as a button, slider, or widget.

For every control, define:

- What it does.
- How a user discovers it.
- What happens on hover, focus, active, loading, success, and error states.
- Whether it works with keyboard and touch.
- Whether it changes page state, scroll position, camera position, or content.
- How the user can reverse or exit the interaction.

Do not create decorative controls that look functional but do nothing. Do not make essential actions depend on hover.

### 6.2 Navigation

- Keep primary navigation discoverable and understandable, but visually restrained.
- Use semantic links for actual navigation and buttons only for genuine actions.
- Do not add next/previous controls for scroll-led chapters; normal scrolling is the narrative navigation.
- Ensure menus work with keyboard, touch, and screen readers.
- Provide visible focus states.
- Avoid unconventional navigation unless it remains discoverable and has a usable fallback.
- Make current location or active section clear when it matters.
- Ensure overlays and menus can be closed, including with Escape where appropriate.

### 6.3 Scroll experiences

Scroll can become a storytelling tool, but the document must remain navigable.

- Treat scroll as the primary storytelling interface for immersive experiences. Use scroll-linked movement to reveal information, progress the narrative, transform the environment, and give spatial context.
- Avoid hijacking the wheel or touch scroll for long periods.
- Avoid long pinned sections unless the content justifies the loss of normal scrolling.
- Keep scroll distances reasonable and test on touch devices.
- Do not hide essential content until a very specific scroll position.
- Ensure anchor links and browser navigation still work.
- Use clear section progression and avoid scroll traps.
- Do not bind every element to scroll. Mix scroll-led moments with normal document flow.

### 6.4 Cursor and pointer effects

Custom cursors, magnetic controls, pointer trails, and hover distortion are optional—not default requirements.

Use them only when they reinforce the concept and do not reduce usability. Disable or adapt them on touch devices, preserve the native cursor where necessary, and never hide the only indication that an element is interactive. Pointer-based effects must not be required to reveal content or complete a task.

### 6.5 Micro-interactions

Use small feedback moments for meaningful actions: button press, selection, drag, loading, expansion, navigation, or successful completion. Keep them consistent. Avoid excessive bounce, elastic motion, or animation on every element.

### 6.6 Sound

Sound is optional. Never autoplay audible sound. If audio is used, provide an obvious control, a muted default, keyboard access, and a way to stop it. Sound must add meaning or atmosphere rather than become an obstacle.

---

## 7. Motion design

Motion should communicate relationships, depth, continuity, state, and hierarchy. It should feel authored rather than randomly animated.

### 7.1 Define a motion language

Choose a consistent system for:

- Duration: short feedback, standard transitions, and long cinematic movement.
- Easing: restrained ease, crisp ease-out, spring-like movement, or linear movement when tied to physical progress.
- Direction: where elements enter and leave, and why.
- Stagger: how groups reveal in relation to one another.
- Distance: how far elements move.
- Depth: how scale, blur, opacity, and parallax express spatial relationships.
- Continuity: how one section or state transitions into another.

Use a small set of consistent timings and easing curves. Do not assign arbitrary durations to every component.

### 7.2 Motion rules

- Use motion to clarify, not delay.
- Keep primary content visible quickly. Do not make visitors wait through an intro animation to use the site.
- Avoid long entrance sequences for ordinary text and controls.
- Avoid animating layout-heavy properties when transform and opacity can achieve the same result.
- Avoid constant motion that competes with reading.
- Do not animate all sections in the same way. Use variation and restraint.
- Ensure animations do not cause content to flash, jump, or disappear permanently if an animation fails.
- Make animation state deterministic when possible so navigation and repeated visits behave consistently.
- Avoid excessive scroll-linked transforms that create motion sickness or make text difficult to read.

### 7.3 Reduced motion

Respect `prefers-reduced-motion: reduce`.

- Reduce or remove parallax, camera travel, large transforms, looping motion, and scroll-scrubbed animations.
- Keep content visible without requiring animations to finish.
- Preserve important information and interaction affordances.
- Prefer short opacity changes or immediate state changes where appropriate.
- Apply the same policy to CSS, GSAP, and Three.js—not just CSS transitions.

### 7.4 Animation performance

- Prefer `transform` and `opacity` for DOM animation.
- Avoid repeatedly animating `top`, `left`, `width`, `height`, and other layout-triggering properties unless necessary.
- Avoid reading layout repeatedly inside animation loops.
- Keep animation callbacks small and avoid unnecessary React state updates per frame.
- Use refs or direct animation controls for high-frequency Three.js and DOM motion where appropriate.
- Clean up timelines, observers, event listeners, and animation frames when components unmount.

---

## 8. Blender-to-web 3D pipeline

Blender is the authoring environment. The browser should load optimized, web-ready exports—not a `.blend` project directly.

### 8.1 Correct file format

- Keep `.blend` as the editable source project.
- Export browser assets as **glTF 2.0**, preferably binary `.glb` for a self-contained asset.
- Use `.gltf` with external files only when the project has a deliberate reason to manage geometry, textures, and buffers separately.
- Three.js does not natively load `.blend` files. Do not attempt to use a `.blend` file as a browser asset.
- Use Blender's glTF 2.0 exporter and verify the exported file in the actual browser runtime.

### 8.2 Model preparation in Blender

Before export:

1. Remove hidden, unused, duplicate, and unnecessary objects.
2. Apply object transforms where appropriate. Check scale, rotation, and origin/pivot placement.
3. Set sensible object names. Use clear names for animated objects, cameras, lights, and scene parts.
4. Check normals, smoothing, sharp edges, and non-manifold geometry.
5. Reduce unnecessary geometry. Use bevels, subdivision, and modifiers carefully; apply or bake only what is required for the exported result.
6. Remove unused materials and orphaned data.
7. Keep UVs valid and avoid unnecessarily large or overlapping textures.
8. Use a consistent real-world or project scale so camera positioning and interaction remain predictable.
9. Place pivots/origins where rotation, orbit, and interaction should occur.
10. Test the asset with the target browser material pipeline, not only Blender's viewport or final renderer.

### 8.3 Materials and textures

The glTF material pipeline is not identical to Blender's full shader system.

- Prefer glTF-compatible Principled BSDF material setups.
- Verify base color, metallic, roughness, normal, emissive, opacity, and alpha behavior after export.
- Do not assume arbitrary procedural Blender nodes, Geometry Nodes, complex shader networks, or render-only effects will transfer to glTF.
- Bake complex procedural appearance into textures when appropriate.
- Use physically plausible material values as a starting point, then art-direct within reason.
- Keep texture resolution appropriate to on-screen size and viewing distance.
- Pack textures into the GLB where useful, but optimize the resulting file.
- Consider KTX2/Basis Universal texture compression for large texture-heavy scenes when the runtime pipeline supports it.
- Avoid huge transparent textures and unnecessary alpha blending; transparency can increase overdraw and sorting problems.
- Test color management and tone mapping between Blender and Three.js. Expect differences and tune the browser version intentionally.

### 8.4 Lighting and environment

- Decide whether lighting should be baked, real-time, or hybrid.
- Use baked lighting for mostly static environments when it meaningfully reduces runtime cost.
- Use a limited number of real-time lights. Multiple shadow-casting lights can be expensive.
- Use environment maps/HDRIs selectively for reflections and material richness.
- Avoid relying on Blender-only lighting/render features that will not exist in the browser.
- For a static hero object, consider baked ambient occlusion or light textures where appropriate.
- Keep shadow resolution and shadow camera bounds tight.
- Test lighting on both light and dark device displays.

### 8.5 Animation preparation

- Use named actions and sensible clip names.
- Keep animation clips focused and reusable.
- Set origins and hierarchies so rotations and translations behave predictably.
- Avoid exporting unnecessary keyframes or hidden animation data.
- Prefer skeletal or object animations that glTF supports.
- Verify animation timing, looping, transitions, and root motion after export.
- For complex simulations, particles, cloth, fluid, or procedural effects that do not transfer cleanly, bake to geometry, textures, a video, or recreate the effect in Three.js as appropriate.
- Do not assume Blender's entire simulation or node system will run in the browser.

### 8.6 Camera and framing

- Treat the camera as part of the art direction.
- Choose a focal length and composition that preserve the object's intended character.
- Check framing at desktop and mobile aspect ratios.
- Avoid placing essential parts of the model near crop boundaries.
- Use a camera target and object scale that can be adjusted responsively.
- Ensure the first loaded frame is composed and useful before any animation begins.

### 8.7 Export and validation checklist

Before adding a GLB to the site:

- Export only required objects, materials, cameras, and animations.
- Use a predictable file name and asset path.
- Inspect the GLB size.
- Reopen the export in a glTF viewer or a small Three.js test scene.
- Verify geometry, materials, UVs, textures, normals, animation clips, transparency, and scale.
- Check for missing textures and unsupported materials.
- Test the export on a mobile GPU or a realistic low-powered device when possible.
- Keep the original `.blend` file in the project's source/assets workflow when the user expects it to remain editable.

---

## 9. Three.js implementation standards

### 9.1 Choose the integration that fits the project

- Use **Three.js directly** for vanilla JavaScript projects or when precise control with a small scene is the clearest solution.
- Use **React Three Fiber (R3F)** when the app already uses React and the 3D scene benefits from React component composition and lifecycle management.
- Use **Drei** for proven helpers such as loaders, controls, environment utilities, and common scene components when it reduces complexity. Do not install it by habit.
- Use **GSAP** for complex DOM timelines and scroll-linked sequences when the project requires it.
- Use **Lenis** only when smooth scrolling materially improves the experience and it can be integrated without fighting native browser behavior.
- Use the smallest useful toolset. Avoid overlapping animation libraries or unnecessary dependencies.

### 9.2 Scene architecture

Keep scene responsibilities clear. A typical scene can separate:

- Scene setup and renderer configuration.
- Camera and responsive camera fitting.
- Lighting and environment.
- Model loading and asset management.
- Animation mixer and clip control.
- Interaction and picking.
- Performance adaptation.
- DOM/scroll synchronization.
- Cleanup and error handling.

Do not put every concern into one giant component or one unmaintainable animation function. Keep the scene modular enough to inspect and tune.

### 9.3 Loading GLB files

- Use `GLTFLoader` in Three.js or the corresponding R3F loader.
- Handle loading, success, and error states.
- Avoid starting expensive animation before the model is ready.
- Cache reusable assets where appropriate.
- Do not create multiple renderers or duplicate scene instances for the same experience without a reason.
- Dispose of geometries, materials, textures, render targets, and controls when they are no longer needed.
- Guard against components mounting/unmounting repeatedly during development and route changes.
- Use a lightweight fallback visual if loading fails.

### 9.4 Renderer configuration

Set renderer options intentionally:

- Use antialiasing only when it provides a visible benefit on target devices.
- Set pixel ratio with a cap; do not blindly render at full device pixel ratio on high-density displays.
- Use the correct output color space and a deliberate tone-mapping approach.
- Set physically correct lighting behavior where appropriate for the chosen version and pipeline.
- Enable shadows only when needed.
- Choose shadow map type and resolution carefully.
- Handle viewport resize and container resize without accumulating listeners.
- Consider alpha transparency only if the composition requires it; transparent WebGL canvases can introduce compositing costs and layering issues.

### 9.5 Animation loop and lifecycle

- Use one deliberate render loop per scene.
- Prefer the framework's frame lifecycle in R3F instead of creating a second uncontrolled `requestAnimationFrame` loop.
- Avoid re-rendering the React component tree on every frame.
- Use delta time for time-based animation so movement is not tied to frame rate.
- Pause, slow, or stop rendering when the scene is off-screen or not needed, where feasible.
- Respect reduced-motion settings.
- Clean up the render loop, event listeners, observers, controls, and GPU resources.
- Handle WebGL context loss gracefully when practical.

### 9.6 Responsive camera and composition

- Recalculate camera aspect and renderer size on resize.
- Use a `ResizeObserver` when the canvas is sized by a container rather than the full window.
- Reframe the object on narrow screens. Do not simply preserve the desktop camera and let the model be cut off.
- Adjust camera position, field of view, target, object scale, and composition based on the actual available viewport.
- Avoid making the 3D canvas cover content it is not meant to cover.
- Ensure DOM content remains readable and interactive above or alongside the canvas.

### 9.7 Interaction with 3D objects

- Use raycasting or the framework's event system for object picking.
- Make hit areas generous enough for the intended device.
- Provide visual feedback for hover, active, selected, and disabled states.
- Provide an alternative to hover for touch and keyboard users.
- Do not make a tiny 3D mesh the only clickable target for a critical action; pair it with an accessible DOM control.
- Prevent accidental interaction conflicts between orbit controls, page scrolling, and object selection.
- Keep interaction sensitivity predictable.
- Clamp rotation and movement where needed so objects cannot disappear or become unusable.

### 9.8 Camera controls

Use orbit, drag, zoom, or pan only when the content benefits from direct manipulation.

- Set sensible limits for distance, polar angle, azimuth, and pan.
- Avoid allowing users to move the camera into unusable positions.
- Make controls discoverable.
- Do not let drag interactions block ordinary scrolling on touch devices unless the canvas is clearly an interactive viewport.
- Provide reset or recenter behavior where appropriate.
- Support keyboard alternatives if the camera is essential to understanding the content.

### 9.9 Post-processing and shaders

Post-processing is optional and expensive. Add effects one at a time and evaluate whether each effect materially improves the design.

Potential uses include subtle bloom, depth of field, color grading, vignette, distortion, film grain, chromatic aberration, or custom GLSL effects. These are not default requirements.

Rules:

- Use restrained values. Strong bloom, blur, distortion, and aberration can reduce clarity.
- Avoid stacking multiple expensive full-screen passes without a measured reason.
- Test on mobile and lower-powered GPUs.
- Provide a reduced or disabled effect path.
- Use shaders for a specific visual effect, not as decoration without concept.
- Keep shader code understandable and isolate uniforms/configuration.
- Avoid per-frame allocations in shader-driving JavaScript.

### 9.10 WebGL failure and fallback

A website must remain usable if WebGL is unavailable, blocked, or fails to initialize.

- Detect and handle renderer initialization errors.
- Provide a static image, CSS composition, or video fallback that preserves the main message.
- Keep navigation, content, and calls to action in semantic HTML outside the canvas.
- Never make essential text exist only inside the 3D scene.
- Avoid an infinite loading screen if an asset or WebGL context fails.

---

## 10. Scroll animation and smooth scrolling

### 10.1 GSAP and ScrollTrigger

Use GSAP when a timeline or scroll-linked sequence needs exact orchestration. Keep animations scoped and cleanly reverted when the relevant component or route is removed.

- Scope selectors to the component or section being animated.
- Use `gsap.context()` or the appropriate cleanup pattern in the project's framework.
- Register plugins once in a controlled place.
- Refresh measurements when content or fonts change if needed.
- Avoid creating duplicate ScrollTriggers during hot reloads or component remounts.
- Do not animate hidden or inaccessible content into existence without a no-JavaScript/no-motion fallback.
- Use scrubbed animations only when the visual relationship should track scroll continuously.
- Avoid pinning multiple sections in a way that makes the page feel trapped.

### 10.2 Lenis or other smooth-scrolling systems

Native scrolling is the default. Add smooth scrolling only when the design genuinely benefits from it.

- Do not fight the browser's native scroll behavior.
- Integrate Lenis with the project's animation loop correctly.
- Synchronize ScrollTrigger updates if both are used.
- Avoid running multiple independent RAF loops for the same scroll system.
- Preserve keyboard scrolling, anchor navigation, browser history, and touch behavior.
- Disable or simplify the effect when it reduces usability or performance.
- Do not use fake scroll implementations that break accessibility or browser expectations.

### 10.3 Scroll-to-3D synchronization

When DOM scroll drives a 3D scene:

- Define explicit progress ranges for each camera or object state.
- Normalize progress and clamp it between 0 and 1.
- Interpolate values smoothly; avoid sudden jumps at section boundaries.
- Keep DOM and 3D timing in sync without tying essential content visibility to WebGL.
- Provide a simplified mobile mapping if the desktop sequence is too heavy.
- Ensure reverse scrolling works.
- Ensure direct navigation to anchors establishes the correct scene state.

---

## 11. Responsive and device strategy

Treat each breakpoint as a composition decision, not merely a CSS adjustment.

### 11.1 Desktop

- Use the available width intentionally. Do not stretch paragraphs or controls across enormous viewports.
- Allow large type and expansive 3D compositions when they strengthen the concept.
- Ensure the focal object and content remain balanced on ultrawide screens.
- Avoid excessive blank space that appears accidental.

### 11.2 Tablet

- Re-evaluate columns, navigation, object framing, and interaction targets.
- Decide whether a desktop interaction still works well with touch.
- Prevent awkward intermediate layouts where text and 3D compete for the same space.

### 11.3 Mobile

- Start with the content hierarchy and rebuild the composition for a narrow viewport.
- Stack, crop, reposition, or remove secondary visual elements intentionally.
- Use a dedicated camera setup or alternate 3D composition where necessary.
- Reduce model complexity, pixel ratio, post-processing, and render frequency as appropriate.
- Replace hover-only information with tap, focus, or always-visible cues.
- Keep controls comfortably tappable; do not place tiny controls close together.
- Avoid horizontal overflow unless it is a deliberate, discoverable interaction.
- Prevent fixed navigation and overlays from covering content or the on-screen keyboard.
- Test both portrait and landscape behavior where relevant.
- Ensure the page still feels art-directed rather than like a stripped-down desktop design.

### 11.4 Low-power and constrained environments

- Detect capability carefully; do not rely on user-agent checks as the only signal.
- Consider reduced rendering resolution, fewer particles, simpler materials, lower shadow quality, fewer post-processing passes, and static fallbacks.
- Reduce or stop rendering when the scene is not visible.
- Avoid rendering a full-screen 3D scene behind long text sections when it contributes little.
- Ensure the page remains useful on devices with limited memory, bandwidth, or GPU support.

### 11.5 Breakpoint validation

At minimum, inspect:

- Small phone width (approximately 320–375 CSS px).
- Typical phone width (approximately 390–430 CSS px).
- Tablet portrait and landscape.
- Laptop/desktop (approximately 1280–1440 CSS px).
- Large desktop/ultrawide.

These are inspection targets, not mandatory hard-coded breakpoints. Use content-driven breakpoints.

---

## 12. Performance engineering

An immersive website must feel fast. Large visual ambition makes performance discipline more important, not less.

### 12.1 Asset budgets

Set project-specific budgets after inspecting the design and target devices. As a starting point, not a universal limit:

- Keep the initial critical payload as small as practical.
- Avoid loading every 3D model, texture, and video on the initial route.
- Prefer one optimized hero asset over a collection of heavy decorative assets.
- Keep texture dimensions no larger than their visible use requires.
- Consider a small initial GLB and load secondary scene details later.
- Compress geometry and textures where the chosen loader pipeline supports it.
- Use poster images for large video backgrounds.
- Avoid shipping uncompressed source textures or unused model variants.

Record actual asset sizes and identify the largest contributors. Do not make unsupported claims about performance without measuring.

### 12.2 Loading strategy

- Prioritize visible content and the hero's critical asset.
- Lazy-load below-the-fold scenes, models, video, and large images.
- Use code splitting for optional 3D experiences or heavy routes.
- Preload only resources that are genuinely needed soon.
- Show a designed loading state when loading time is perceptible.
- Provide progress only when the progress data is real and meaningful.
- Keep a usable static composition visible while a large model loads.
- Avoid loading screens that hide the entire site while a minor asset downloads.

### 12.3 Geometry and draw calls

- Reduce polygon count when detail is not visible at the rendered size.
- Merge static meshes when it reduces draw calls and does not compromise interaction or culling.
- Use instancing for repeated geometry where appropriate.
- Avoid excessive material variety when one material or an atlas can work.
- Use LODs for models that change dramatically in screen size or distance.
- Frustum-cull off-screen objects.
- Avoid unnecessarily dense shadow casters.

### 12.4 Textures

- Resize textures to the actual visual requirement.
- Compress textures and use mipmaps appropriately.
- Reuse shared textures/materials where suitable.
- Avoid many oversized transparent textures.
- Watch total GPU memory, not only download size.

### 12.5 Rendering and runtime

- Cap device pixel ratio to a sensible value for the experience.
- Avoid rendering while hidden or idle if the scene does not need to animate.
- Reduce particle counts and shader complexity on constrained devices.
- Avoid allocations inside the render loop.
- Reuse vectors, colors, and temporary objects where practical.
- Keep React state out of per-frame update paths.
- Monitor draw calls, triangles, texture memory, and frame rate during development.
- Avoid continuous animation when a scene is static.

### 12.6 DOM performance

- Avoid huge blur surfaces and multiple backdrop filters across the viewport.
- Limit large fixed layers and unnecessary compositing.
- Avoid layout thrashing.
- Keep event listeners passive where appropriate for scroll/touch behavior.
- Use `content-visibility` or containment only when it does not break animation measurement or accessibility.
- Avoid excessive React component updates and large unnecessary client bundles.

### 12.7 Measure before optimizing blindly

Use browser performance tools and the project's existing measurement tools. Inspect network payload, main-thread work, long tasks, layout shifts, render performance, GPU load where available, and behavior on a throttled connection/device. Fix the largest real bottleneck first.

---

## 13. Accessibility and inclusive interaction

Accessibility is a core requirement, including in experimental layouts.

- Use semantic landmarks: `header`, `nav`, `main`, `section`, `footer`, and appropriate heading levels.
- Maintain a logical heading hierarchy.
- Use links for navigation and buttons for actions.
- Provide accessible names for controls, including icon-only controls.
- Ensure all interactive content is keyboard reachable and has visible focus.
- Do not remove outlines without a clear replacement.
- Ensure controls have usable target sizes and spacing.
- Provide text alternatives for meaningful non-text content.
- Keep essential information in the DOM, not only in canvas, video, or images.
- Make menus, dialogs, and overlays announce and manage focus appropriately.
- Support Escape to close dismissible overlays where expected.
- Preserve logical focus order when visual layouts use absolute positioning or unusual reading order.
- Do not rely on hover, color, sound, or motion alone to communicate essential information.
- Avoid flashing content and seizure-risk effects.
- Respect reduced motion and contrast preferences.
- Ensure body text remains readable over backgrounds and media.
- Provide captions or transcripts for meaningful video/audio content when needed.
- Test with keyboard navigation and at least one screen-reader-oriented review when possible.

A canvas can be decorative, but it must not become the only way to navigate or understand the page.

---

## 14. Content, structure, and conversion

Visual experimentation must not obscure the site's purpose.

- Keep the main message understandable in the initial viewport.
- Write clear, specific headings. Avoid vague slogans that could describe any company.
- Use concise supporting copy with real information.
- Preserve the user's original content and meaning unless rewriting is part of the task.
- Do not invent customer logos, testimonials, awards, performance claims, client lists, statistics, or product capabilities.
- Ensure calls to action are visually clear and accurately labeled.
- Put important content in the normal document flow where possible.
- Use meaningful section names and anchor targets.
- Keep forms usable, with labels, validation, loading, success, and error states.
- Make contact links and external links work.
- Ensure footer content is complete and useful, not an afterthought.

For a portfolio, each project should have a clear title, role/context, relevant description, and a useful way to explore or contact. For a product site, explain the product, its value, proof/details that are actually available, and the next action. Adapt structure to the real purpose; do not force generic marketing sections into every site.

---

## 15. Technical quality and code organization

### 15.1 Respect the existing stack

- Do not replace a functioning framework or build system just to use a preferred tool.
- Do not add a dependency for a feature that can be implemented simply with the existing stack.
- Check installed versions and APIs before using library-specific patterns.
- Keep package changes focused and explain any necessary major dependency change.
- Use TypeScript when the project already uses it or when it materially improves reliability.

### 15.2 Component boundaries

Separate components by responsibility, not by arbitrary line count. Useful boundaries may include:

- Site shell and global navigation.
- Hero composition.
- Content sections.
- Reusable buttons and controls.
- 3D scene wrapper and individual scene objects.
- Loading/error/fallback components.
- Footer and contact areas.

Avoid giant single-file pages when the experience has multiple independent sections. Also avoid over-componentizing tiny static fragments. Choose the simplest maintainable structure.

### 15.3 CSS and styling

- Follow the project's existing styling convention.
- Centralize design tokens.
- Avoid scattered magic numbers and contradictory overrides.
- Use CSS Grid and Flexbox for layout; use absolute positioning for deliberate composition, not as a substitute for layout structure.
- Use `clamp()`, `min()`, `max()`, and container queries where useful.
- Avoid fixed widths that break on mobile.
- Use logical properties where practical.
- Keep stacking contexts and z-index layers documented or tokenized.
- Scope styles to prevent unintended leakage.
- Do not use `!important` as a routine layout tool.
- Avoid excessive nested selectors and fragile DOM-dependent CSS.

### 15.4 State and event management

- Keep state as local as possible.
- Use a single source of truth for interactive state.
- Avoid unnecessary global state.
- Remove event listeners and subscriptions on cleanup.
- Avoid stale closures and duplicate handlers.
- Debounce or throttle expensive resize/scroll work only when necessary and without creating lag.
- Make interactions resilient to rapid repeated inputs.

### 15.5 Error handling

- Handle missing assets and failed requests visibly but gracefully.
- Do not swallow errors silently during development.
- Keep production fallback behavior useful.
- Avoid invalid links, dead buttons, empty click handlers, and placeholder actions.
- Ensure the app still renders its meaningful content if a nonessential enhancement fails.

### 15.6 SEO and browser behavior

- Set a meaningful page title and description.
- Use semantic metadata and social preview metadata where relevant.
- Use descriptive URLs and headings.
- Ensure content is available to crawlers without requiring WebGL execution.
- Use appropriate image alt text and dimensions.
- Test browser back/forward behavior, direct route loading, and anchor navigation.
- Avoid unnecessary scroll locking and browser behavior overrides.

---

## 16. Anti-patterns: what not to produce

Avoid these common signs of generic or low-craft AI-generated websites:

- A default dark background with purple/blue gradient glow regardless of subject.
- A huge centered headline, tiny uppercase eyebrow, two pill buttons, and three rounded feature cards repeated without a concept.
- Random glassmorphism panels, glowing borders, blur, noise, and gradients layered everywhere.
- Generic stock imagery that does not relate to the business or narrative.
- Unnecessary floating blobs, spheres, cubes, rings, and particles with no conceptual purpose.
- An arbitrary 3D model placed behind text just to make the site look “immersive.”
- Cursor followers, magnetic buttons, or hover distortion that do not improve the experience.
- Endless parallax, scroll hijacking, and long pinned sequences.
- Every element animating on entrance with the same fade-and-slide effect.
- Repeated two-column sections and card grids from top to bottom.
- Tiny text, excessive letter spacing, poor contrast, and decorative labels that compete with content.
- Fake metrics, fake testimonials, fake badges, fake client names, fake availability, or invented product details.
- Navigation that is experimental but confusing or unusable.
- A hero that looks polished while the rest of the page is empty, generic, or broken.
- A desktop-only layout that overflows, clips, or becomes unreadable on mobile.
- A loading screen that blocks the whole website for a nonessential model.
- A WebGL canvas that prevents selection, reading, navigation, or keyboard access.
- Unoptimized multi-megabyte assets loaded before text and primary content.
- Console errors, broken imports, hydration errors, missing assets, or uncleaned animation loops.

The goal is not to avoid all trends. The goal is to use visual choices intentionally and in a way that belongs to the project.

---

## 17. Required implementation examples and patterns

The exact code depends on the project's framework and library versions. Prefer the project's established patterns. The examples below illustrate the expected architecture, not a command to replace the project with a particular stack.

### 17.1 Vanilla Three.js GLB loading pattern

```js
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const container = document.querySelector('[data-scene]');

if (!container) {
  throw new Error('3D scene container was not found.');
}

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100);
camera.position.set(0, 0, 5);

const renderer = new THREE.WebGLRenderer({
  antialias: true,
  alpha: true,
  powerPreference: 'high-performance',
});

renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
renderer.setSize(container.clientWidth, container.clientHeight);
container.appendChild(renderer.domElement);

scene.add(new THREE.HemisphereLight(0xffffff, 0x444444, 1.5));

const keyLight = new THREE.DirectionalLight(0xffffff, 2);
keyLight.position.set(3, 4, 5);
scene.add(keyLight);

const loader = new GLTFLoader();
let mixer = null;
let model = null;
let frameId = 0;
let previousTime = 0;
let disposed = false;

loader.load(
  '/models/hero.glb',
  (gltf) => {
    if (disposed) return;

    model = gltf.scene;
    scene.add(model);

    if (gltf.animations.length > 0) {
      mixer = new THREE.AnimationMixer(model);
      mixer.clipAction(gltf.animations[0]).play();
    }
  },
  undefined,
  (error) => {
    console.error('Unable to load the 3D model:', error);
    container.dataset.sceneState = 'fallback';
  },
);

const resize = () => {
  const width = container.clientWidth;
  const height = container.clientHeight;
  if (!width || !height) return;

  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height);
};

const resizeObserver = new ResizeObserver(resize);
resizeObserver.observe(container);

const animate = (time) => {
  if (disposed) return;

  const delta = previousTime ? Math.min((time - previousTime) / 1000, 0.05) : 0;
  previousTime = time;

  mixer?.update(delta);
  renderer.render(scene, camera);
  frameId = requestAnimationFrame(animate);
};

frameId = requestAnimationFrame(animate);

// Call this when the scene/component is removed.
function disposeScene() {
  disposed = true;
  cancelAnimationFrame(frameId);
  resizeObserver.disconnect();
  mixer?.stopAllAction();

  scene.traverse((object) => {
    if (!object.isMesh) return;
    object.geometry?.dispose();

    const materials = Array.isArray(object.material)
      ? object.material
      : [object.material];

    materials.forEach((material) => {
      if (!material) return;
      Object.values(material).forEach((value) => {
        if (value?.isTexture) value.dispose();
      });
      material.dispose();
    });
  });

  renderer.dispose();
  renderer.domElement.remove();
}
```

Adapt this pattern to the installed Three.js version and the app's lifecycle. In production, also wire the disposal function to the framework's cleanup mechanism, account for shared cached resources before disposing them, and stop rendering when the scene is not needed. Do not copy this snippet unchanged into a React component without lifecycle handling.

### 17.2 React Three Fiber principles

When using R3F:

- Keep the canvas and 3D scene in focused components.
- Load models with the project's established loader approach.
- Use the frame callback for per-frame updates, not React state updates.
- Use refs for mutable objects that change every frame.
- Use Suspense only with a deliberate fallback; keep important page content outside the Suspense boundary when possible.
- Use a responsive camera and canvas size.
- Avoid mounting a second canvas for every section unless the design and performance budget justify it.
- Share model/material resources responsibly and understand disposal behavior when caching assets.
- Keep DOM controls accessible and separate from canvas-only interactions.

Illustrative component shape:

```jsx
function ProductScene() {
  const modelRef = useRef(null);

  useFrame((state, delta) => {
    if (!modelRef.current) return;
    modelRef.current.rotation.y += delta * 0.12;
  });

  return (
    <group ref={modelRef}>
      <ProductModel />
    </group>
  );
}
```

Use the exact imports and hooks supported by the installed R3F version. This example omits the model loader, camera, lighting, and fallback by design; those must be implemented for the real scene.

### 17.3 Reduced-motion CSS pattern

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    scroll-behavior: auto !important;
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

This is only a baseline. JavaScript timelines, WebGL camera motion, and application-specific motion must also respect the preference. Avoid applying this blindly if the project has essential state transitions that need a different non-animated treatment.

---

## 18. Verification and quality assurance

Before considering the work complete, validate the actual running website.

### 18.1 Functional checks

- Every navigation item reaches the correct destination.
- Every button performs its advertised action.
- Every form has labels, validation, success, and error behavior where applicable.
- Menus open and close correctly.
- Keyboard navigation works.
- Escape behavior works for dismissible overlays.
- Touch interactions work without hover.
- Scroll and anchor navigation work in both directions.
- 3D interactions do not interfere with normal page interactions.
- Links, email, phone, and external destinations are valid.
- Direct page refresh and browser back/forward work.

### 18.2 Visual checks

Inspect the full page, not just the hero:

- First viewport composition and message clarity.
- Typography, line breaks, and hierarchy.
- Section-to-section rhythm.
- Image crops and focal points.
- 3D model scale, framing, lighting, and materials.
- Canvas layering and DOM overlap.
- Spacing consistency.
- Footer and final call to action.
- Hover, focus, active, loading, and error states.
- No clipped labels, hidden controls, overlapping text, or accidental horizontal overflow.

### 18.3 Responsive checks

Test narrow phones, common phones, tablets, laptops, and large screens. Check:

- Text wrapping and heading scale.
- Navigation behavior.
- Content order and spacing.
- 3D camera framing and performance.
- Touch target sizes.
- Fixed and sticky elements.
- Dialogs and overlays with the virtual keyboard open.
- Landscape orientation.

### 18.4 Motion checks

- No animation blocks essential content.
- No timeline remains stuck when the user scrolls quickly or navigates away.
- Reverse scroll works.
- Reduced-motion mode is useful and complete.
- Animations do not cause layout jumps.
- No duplicate event listeners, timelines, or render loops.
- Motion does not make text hard to read.

### 18.5 Technical checks

- Run lint, type checks, tests, and production build scripts available in the project.
- Resolve all errors caused by the implementation.
- Inspect the browser console for runtime errors and warnings introduced by the change.
- Inspect the network panel for failed assets and unexpectedly large files.
- Verify that GLB and texture URLs resolve in the production build, not only in development.
- Check for missing keys, invalid DOM nesting, hydration issues, and resource leaks.
- Verify WebGL fallback behavior.
- Verify that all assets have correct paths and are included in deployment output.

### 18.6 Final acceptance gate

Do not call the task complete until these statements are true:

- [ ] The visual direction is original and tied to the project.
- [ ] The site communicates its purpose quickly.
- [ ] The complete page is designed, not only the first viewport.
- [ ] Layout and typography work across tested screen sizes.
- [ ] No unintended horizontal overflow or clipped content exists.
- [ ] Every visible control works and has appropriate states.
- [ ] The page is navigable with a keyboard.
- [ ] Reduced-motion behavior is implemented.
- [ ] The site remains useful without WebGL.
- [ ] 3D assets are exported and optimized for the browser.
- [ ] Rendering and animation have cleanup and lifecycle handling.
- [ ] The initial experience does not wait unnecessarily for nonessential assets.
- [ ] No invented claims, fake content, or decorative fake controls were introduced.
- [ ] Build and available checks pass.
- [ ] No implementation-caused console errors remain.

If a check cannot be completed because the environment lacks a browser, device, asset, or tool, state the exact limitation rather than claiming it passed.

---

## 19. Delivery expectations

When finishing a task:

1. Summarize the main experience and design direction in a few factual sentences.
2. Identify the key sections and meaningful interactions implemented.
3. Mention any 3D assets used and whether they were loaded as GLB/glTF.
4. State what validation was performed: build, lint, tests, responsive inspection, browser review, and so on.
5. Disclose any incomplete items, known limitations, missing user-provided assets, or unverified behavior.
6. Do not claim that the site is “fully responsive,” “production-ready,” or “optimized” unless the relevant checks were actually performed.

Do not provide a long self-congratulatory explanation. Report concrete changes and verification results.

---

## 20. Decision rules

Use these rules when trade-offs arise:

- **Visual ambition vs. clarity:** clarity wins when an effect obscures the message or action.
- **3D vs. performance:** use the smallest scene that delivers the intended visual value; provide a static alternative.
- **Motion vs. access:** reduced-motion and immediate access to content win.
- **Experimental navigation vs. usability:** preserve recognizable, accessible navigation and provide a clear fallback.
- **Fidelity vs. responsiveness:** preserve the visual thesis, not the exact desktop arrangement.
- **Complexity vs. maintainability:** choose the simplest implementation that achieves the intended result.
- **Reference fidelity vs. originality:** originality wins. Never clone the source.
- **Decorative detail vs. hierarchy:** remove detail that competes with the main content.
- **Aesthetic preference vs. truthful content:** factual accuracy wins. Never invent business claims or proof.
- **Convenience vs. existing project stability:** preserve the current stack and working features unless there is a clear reason to change them.

## 21. The final standard

The finished website should feel like a complete, intentional digital environment—not a generic template with a 3D object added to it.

It should have:

- A clear creative idea.
- A distinct identity.
- Strong typography and composition.
- A full-page narrative and deliberate pacing.
- Meaningful interaction and controlled motion.
- 3D that serves the concept when 3D is appropriate.
- Responsive art direction rather than simple shrinkage.
- Accessible content and controls.
- Thoughtful loading and fallback behavior.
- Measured performance and clean implementation.
- No obvious AI-generated design clichés.

**Build something original that feels authored. Make every visual and technical decision earn its place.**

---

# 16. Experience-First Creative Direction: The Website Is a Journey

This section is a mandatory extension for projects whose ambition is comparable in *experience depth* to highly art-directed interactive studio sites such as Spark by The Digital Panda and Utsubo. These references are not templates and must not be copied. They demonstrate that a website can behave like a directed, interactive film or a small digital world rather than a conventional page with a 3D object in the hero.

Reference URLs supplied by the user:

- https://spark.thedigitalpanda.com/
- https://www.utsubo.com/

Study the publicly observable experience and the user's stated goals. Extract principles—not source code, layouts, copy, artwork, assets, exact transitions, or signature visual devices. The goal is to reach a comparable level of intentionality, pacing, immersion, and interaction while creating a distinct identity for the current project.

## 16.1 The quality gap this skill must prevent

A page is **not** an immersive experimental website merely because it contains:

- A Blender model placed in the center of a hero.
- A model that slowly rotates while the user scrolls.
- A standard navbar, hero headline, three feature cards, and footer.
- A dark background, purple glow, gradient blobs, floating particles, and oversized text.
- A generic GSAP reveal on every section.
- A 3D canvas that runs independently of the content and has no narrative purpose.
- A decorative loading spinner followed by an otherwise ordinary landing page.

These patterns can be valid ingredients, but they are not a complete creative direction. If the result can be described as “a normal marketing website with a 3D model added,” the implementation has failed this section.

The deliverable must be conceived as a **continuous designed experience**. The opening, first interaction, camera language, scroll behavior, chapter transitions, content reveals, interactive moments, sound policy, ending, and return/navigation behavior must form one coherent whole.

## 16.2 Experience principles to learn from the references

Use these principles as a quality benchmark, not as a recipe:

1. **An intentional threshold:** the visitor is invited into an experience instead of being dropped into a generic hero. The invitation communicates what kind of experience is ahead and what input is expected.
2. **A deliberate start:** the visitor's decision to begin can initialize audio, unlock browser capabilities, set the experience state, and establish a sense of agency. Starting must never be an empty decorative click.
3. **A persistent world:** the environment, visual language, spatial logic, and interaction model continue across the journey. Sections should not feel like unrelated website templates stacked vertically.
4. **Scroll as direction:** scrolling controls the unfolding of a story, not merely the movement of content up the screen. It can change camera position, scale, composition, lighting, materials, text, scene states, and chapter progress.
5. **Chapters with purpose:** each chapter contributes a new piece of information, emotion, discovery, or transformation. Chapters are not arbitrary full-screen panels.
6. **Integrated typography:** text belongs to the scene's composition. It can enter, recede, align with objects, become a spatial label, or provide editorial contrast. It must remain readable and accessible.
7. **Meaningful interaction:** tap, click, hold, drag, hover, scroll, and keyboard input should reveal or change something meaningful. Interactions must be discoverable and have clear feedback.
8. **Pacing and contrast:** quiet intervals, moments of scale, close-ups, pauses, fast transitions, and moments of interaction are deliberately balanced.
9. **A resolved ending:** the experience reaches a designed conclusion, not an abrupt stop at a contact section. The ending should resolve the story and provide a useful next action.
10. **Technical confidence:** the ambitious presentation is supported by responsive behavior, loading strategy, performance budgets, accessibility, graceful fallbacks, and robust input handling.

## 16.3 Mandatory experience brief before coding

Before implementation, write a compact internal experience brief with the following fields. Do not begin by choosing a Three.js effect or downloading a model.

- **Project premise:** What is the site about in one precise sentence?
- **Audience:** Who is entering, and what do they need to understand, feel, or do?
- **Narrative premise:** What changes from the beginning to the end?
- **Visitor role:** Observer, explorer, operator, witness, participant, collector, investigator, or another meaningful role?
- **World metaphor:** What is the digital environment and why does it fit the subject?
- **Visual thesis:** One sentence describing the art direction.
- **Central visual subject:** The object, environment, character, system, product, or abstract form that carries the experience.
- **Interaction grammar:** The small set of input patterns used consistently throughout.
- **Chapter outline:** The ordered narrative beats, with a purpose for each.
- **Signature moment:** One memorable interaction or transformation that could only belong to this project.
- **Sound decision:** Off by default, optional soundscape, or essential sound with an explicit mute control. Never assume sound is available.
- **Exit/conversion:** What meaningful action should be possible at the end?
- **Fallback plan:** What remains when WebGL, audio, motion, or high-performance rendering is unavailable?

If the project has no story, do not invent meaningless lore. Build a clear experiential arc around the actual subject: discovery → understanding → proof → decision, or another useful progression.

## 16.4 Narrative architecture: write the journey before the sections

Do not outline the site as “Hero / About / Services / Testimonials / Contact” unless the project genuinely needs a conventional information architecture. Instead, define a sequence of narrative beats.

For every beat specify:

| Field | Required definition |
|---|---|
| Chapter name | Short, memorable internal name; visible title may differ |
| Narrative purpose | What new understanding or emotion does it create? |
| Information | What fact, proof, product detail, or message is communicated? |
| Visual state | What does the visitor see at the start and end? |
| Spatial state | Where is the camera, subject, and visitor's point of attention? |
| Motion | What changes, and what triggers it? |
| Interaction | What can the visitor do, and what does it change? |
| Transition in | How does this chapter emerge from the previous one? |
| Transition out | What visual or narrative question pulls the visitor forward? |
| Completion condition | What makes the chapter feel resolved? |
| Mobile adaptation | How does the same idea work on touch and a narrow viewport? |

A useful chapter sequence often has five to eight beats, but do not force a fixed number. A short campaign can be shorter; a complex product story may need more. Each beat must earn its place. Remove chapters that repeat the same message or exist only to make the page longer.

### Example of a generic narrative structure (adapt, do not copy)

1. **Threshold:** establish atmosphere, premise, and invitation.
2. **Initiation:** the visitor chooses to enter; the environment wakes up.
3. **Orientation:** establish the world, subject, and basic interaction language.
4. **Discovery:** reveal the first important idea through movement or interaction.
5. **Transformation:** show a meaningful change, process, or product capability.
6. **Deepening:** add proof, detail, contrast, or a more intimate perspective.
7. **Resolution:** bring the narrative elements together and communicate the central message.
8. **Action:** offer a clear next step and a way to revisit or explore.

This is a planning aid, not a mandatory sequence. Build the structure that best communicates the actual subject.

---

# 17. The Entrance: Design the First 10 Seconds

The entrance is a major part of the experience. It must feel authored, not like a generic preloader or a modal that blocks the page.

## 17.1 Entrance requirements

Design the opening as a sequence of intentional states. Depending on the project, it may include:

1. **Initial frame:** a composed visual that is already interesting before interaction. Avoid a blank screen waiting for assets.
2. **Identity cue:** a restrained project mark, title, or contextual label that establishes ownership and tone.
3. **Premise:** one concise line explaining what the visitor is entering or why the experience exists.
4. **Input invitation:** a specific action such as “Begin experience,” “Press and hold,” “Enter the archive,” or “Explore the object.” Use wording that matches the real input.
5. **Sound control:** an explicit, visible sound state if sound is available. Sound must not start before user consent.
6. **Readiness feedback:** show real loading progress only when measurable. If the scene is not ready, communicate that honestly.
7. **Transition into the world:** the visitor's action should cause a designed change—camera movement, environment activation, reveal, light shift, material transition, or narrative handoff.

Do not use all seven elements mechanically. Choose the smallest sequence that creates a meaningful threshold.

## 17.2 Entrance interaction patterns

Choose one primary entrance action. Do not combine several arbitrary gestures.

- **Click/tap to begin:** most reliable and accessible. The action can initialize audio and begin the first timeline.
- **Press and hold:** use only when the sustained action has narrative meaning. Show clear progress, support pointer cancellation, keyboard activation, touch input, and a simple alternative action.
- **Drag to reveal:** suitable when the visitor is physically uncovering or aligning something. Include a clear direction cue and a tap/keyboard alternative.
- **Scroll to enter:** suitable when the first scroll naturally moves the visitor from threshold into the world. Ensure the invitation is unmistakable.

Every entrance must support keyboard users. A semantic button is preferred. Do not bind the entire document to a gesture that prevents normal browser behavior.

## 17.3 Entrance state machine

Implement the entrance with explicit states rather than loosely coupled booleans.

Recommended state model:

- `boot`: initialize application and inspect capabilities.
- `preloading`: load critical assets and prepare the first scene.
- `ready`: minimum required assets are ready; show the invitation.
- `entering`: entrance action accepted; run the entry sequence.
- `active`: narrative experience is running.
- `paused`: tab hidden, user paused, or a recoverable interruption occurred.
- `fallback`: WebGL or required capability unavailable; show a designed HTML experience.
- `error`: unrecoverable issue with a clear retry or fallback route.

State transitions must be deterministic. Prevent double-starts, duplicate event listeners, repeated audio initialization, and overlapping entrance timelines. Provide a timeout or failure path for assets that never resolve.

## 17.4 Loading strategy

- Render the HTML shell and entrance typography immediately.
- Load only the assets required for the first scene before enabling the primary entrance action.
- Defer later chapter assets until they are approaching or needed.
- Use real loading progress only if the loader can calculate it. Otherwise use a non-numeric “Preparing experience” state.
- Preload fonts and critical textures selectively; do not block the whole site on every asset.
- Keep a useful visual frame behind the loading UI.
- If a large scene takes time, show a low-cost preview or poster, then transition to the live scene.
- Provide a timeout and fallback for failed network requests.
- Do not fake a 0–100% progress animation unrelated to actual loading.

## 17.5 The entrance must not become an accessibility trap

- Use a real button with a visible focus style.
- Give the control an accessible name that describes its action.
- Support Enter and Space.
- Do not require headphones; sound is optional and muted by default.
- Do not trap focus indefinitely behind a loading state.
- Respect reduced motion from the first frame.
- Provide a skip/continue route when the entrance animation is long.
- Keep essential information available in HTML, not only inside the WebGL canvas.
- Avoid tiny text, low contrast, and ambiguous gesture instructions.

---

# 18. Scroll as a Storytelling Engine

Scroll is not merely a trigger for fade-ins. Treat it as a continuous input that can direct the camera, alter the environment, reveal content, and move the narrative forward.

## 18.1 Define a scroll choreography score

Before coding, create a timeline/score for the full experience. For every chapter, define:

- Scroll range or progress range.
- Camera position, rotation, and focal target at the beginning and end.
- Subject position, scale, orientation, and animation state.
- Environment state: lighting, fog, background, particles, atmosphere, and color.
- Text state: what enters, exits, pins, changes, or becomes readable.
- Interaction state: whether the visitor can drag, click, hover, tap, or explore.
- Transition curve and duration.
- Whether the chapter is pinned or flows naturally.
- What happens when scrolling quickly in either direction.

Build a coherent progression, not a collection of independent triggers. Adjacent chapters should share visual continuity or intentionally transform it.

## 18.2 Use scroll techniques with intent

Possible techniques include:

- **Pinned narrative chapter:** the chapter remains in view while a sequence unfolds across a controlled scroll range.
- **Camera dolly:** move through, toward, or away from the scene to reveal scale or detail.
- **Orbit/arc:** rotate around an object to communicate form or reveal hidden information.
- **Parallax depth:** move foreground, subject, and background at different rates to create spatial hierarchy.
- **Scale transition:** move from a macro environment into a microscopic detail, or reverse.
- **Material transition:** change surface, color, transparency, or geometry to express a transformation.
- **Lighting transition:** reveal a subject through a controlled shift in illumination.
- **Scene handoff:** transition from one scene to another through occlusion, a close pass, a portal, a wipe, or a meaningful spatial connection.
- **Typography choreography:** text can assemble, split, track, mask, or align with a subject, while remaining readable.
- **Progressive disclosure:** reveal information only when it becomes relevant to the current story beat.

Do not use every technique in one project. Select a small visual grammar and repeat it with variation.

## 18.3 Pinned sections: rules

Pinned sections are powerful but easy to misuse.

- Pin only when the visitor benefits from staying with a scene while it changes.
- Give each pin a clear beginning, middle, and end.
- Keep the pinned duration proportional to the content. Do not force a long scroll for a tiny reveal.
- Avoid pinning every chapter; continuous pinning makes the experience exhausting and can feel like a broken page.
- Ensure the page has enough scroll length and correct cleanup when leaving the scene.
- Do not make the user scroll against a frozen page without visible progress or a clear reason.
- Avoid nested scroll containers unless essential.
- Test reverse scrolling. Timelines must reverse cleanly or return to a stable previous state.
- Ensure focusable content inside pinned regions remains reachable.
- On touch devices, simplify or remove complex pinning if it conflicts with native scrolling.

## 18.4 Scroll input must remain predictable

- Use normalized progress for continuous scene state where possible.
- Avoid multiple independent scroll listeners writing to the same camera or transform.
- Use one authoritative animation timeline or state controller for each scene property.
- Do not animate the same property from CSS, GSAP, and Three.js simultaneously.
- Avoid excessive smoothing that creates input lag or makes the page feel disconnected from the user's gesture.
- Make the experience reversible unless the story intentionally commits to a one-way action; if one-way, provide a clear reset/replay mechanism.
- Support trackpads, mouse wheels, touch scrolling, keyboard page navigation, and browser scroll restoration.

## 18.5 Scroll chapter transition patterns

Use transitions that connect story meaning and spatial logic. Examples:

- A subject fills the viewport and becomes the next chapter's background.
- A camera passes through an aperture that becomes a new environment.
- A product detail expands until its texture becomes a landscape.
- A light source travels across the scene and reveals the next message.
- A graphic line becomes a path through the 3D environment.
- A floating object moves into alignment and becomes a navigation marker.
- A scene fades only after the visitor has received the essential information.

Avoid unrelated crossfades between generic full-screen sections. The transition should answer “why does the next chapter appear now?”

---

# 19. Scene Direction and Camera Language

The 3D scene must be directed like a film set or interactive installation, not simply rendered from the default Blender camera.

## 19.1 Camera design

Define a camera language for the project:

- **Establishing view:** communicate the overall world and subject.
- **Hero view:** create the primary composition and initial focal point.
- **Detail view:** reveal craftsmanship, texture, mechanics, or evidence.
- **Traversal view:** move through space to create discovery.
- **Transformation view:** frame a change so it is legible.
- **Resolution view:** return to a meaningful composition that feels complete.

For each camera state specify position, target, focal length/FOV, roll, depth of field policy, and transition behavior. Avoid random camera movement. The camera should have motivation: reveal, inspect, follow, compare, or reframe.

## 19.2 Composition rules

- Compose the 3D subject and HTML typography together. Do not treat the canvas as a background image behind unrelated text.
- Use negative space intentionally for content and navigation.
- Establish a clear focal hierarchy. A visitor should know where to look first.
- Keep important content away from areas covered by UI, mobile browser chrome, or system safe areas.
- Use foreground elements to create depth only when they do not obscure essential content.
- Vary scale and distance across the journey. A constant medium shot becomes visually monotonous.
- Use occlusion, silhouette, framing, and contrast to guide attention.
- Keep the visual center of gravity stable enough that the visitor can orient themselves.

## 19.3 Lighting and atmosphere

Lighting is a storytelling instrument. Define a lighting plan with:

- Key light: primary form and material definition.
- Fill: shadow control and readability.
- Rim/back light: separation and silhouette.
- Practical/emissive elements: motivated light sources inside the scene.
- Environment: ambient illumination and reflections.
- Atmosphere: fog, volumetric approximation, dust, haze, or particles only when conceptually justified.

Use light changes to mark narrative shifts. Do not rely on a generic bloom-heavy neon look. Preserve material readability and visual hierarchy. Avoid excessive post-processing that washes out text or makes the page expensive to render.

## 19.4 3D objects must participate in the narrative

For every important model, define:

- What it represents.
- Why it is 3D rather than a still image or CSS illustration.
- What the visitor learns by seeing it from multiple angles.
- How it changes during the experience.
- Whether it can be manipulated directly.
- What information is attached to it.
- How it behaves on mobile and low-end hardware.

A model that simply rotates forever is not an interaction. Add meaningful states: reveal internal layers, expose a detail, change configuration, respond to selection, show a process, or connect to a chapter transition.

---

# 20. Interaction Design: Every Gesture Has a Contract

Interactions should feel deliberate and consistent. Create an interaction grammar and use it throughout the experience.

## 20.1 Define the interaction grammar

For each gesture, document the action and result:

| Input | Possible role | Required feedback |
|---|---|---|
| Click/tap | Select, activate, reveal, enter | State change, clear selected state, or transition |
| Press and hold | Charge, confirm, unlock, sustain | Progress indicator, cancel behavior, completion state |
| Drag | Rotate, inspect, move, scrub | Responsive movement, cursor/touch affordance, reset |
| Hover | Preview, focus, reveal secondary detail | Visible state change; never hover-only essential content |
| Scroll | Navigate story, change camera, progress chapters | Progress and coherent visual response |
| Keyboard | Activate, navigate, inspect, close | Visible focus and equivalent functionality |
| Pointer movement | Subtle parallax or focus | Restrained response; no loss of precision or readability |

Do not overload one gesture with different meanings in different sections unless the context clearly communicates the change.

## 20.2 Interaction states

Every interactive object or control must have defined states as applicable:

- idle
- hover/focus
- pressed/active
- selected
- loading
- success/completed
- unavailable/disabled
- error

Provide visual feedback that is consistent with the visual language. A cursor change alone is not sufficient feedback for a major action.

## 20.3 Interactive 3D object behavior

When an object is interactive:

- Make its interactive status discoverable.
- Define hit areas that are large enough to use.
- Avoid tiny mesh-only click targets for important actions.
- Provide an HTML or accessible equivalent for important controls.
- Prevent drag-to-rotate from blocking page scroll on touch unless the interaction is explicitly in an interaction mode.
- Add a clear way to reset the object or return to the default view.
- Avoid accidental selections while the user is scrolling.
- Use raycasting selectively and avoid testing every mesh when a simpler proxy collider works.
- Support pointer capture and cancellation where appropriate.
- Keep hit areas aligned with animated or transformed objects.

## 20.4 Cursor design

A custom cursor is optional, never mandatory.

- Use it only when it adds information or supports the interaction metaphor.
- Preserve the native cursor on touch devices and for text selection.
- Do not hide the native cursor until the custom cursor is initialized and functional.
- Clearly distinguish normal, interactive, drag, and disabled states.
- Keep it out of the way of small text and controls.
- Respect reduced motion and user preferences.

## 20.5 Sound design

Sound can deepen immersion but must never be required to understand the site.

- Start muted.
- Offer a persistent, accessible sound toggle with clear On/Off state.
- Initialize audio only after a user gesture.
- Use sound for transitions, atmosphere, object feedback, or narrative emphasis—not constant noise.
- Provide visual feedback for important audio cues.
- Handle unavailable audio devices and autoplay restrictions gracefully.
- Avoid sudden high volume, startling sounds, and repetitive loops.
- Stop or attenuate audio when the tab is hidden or the experience is paused.
- Ensure mute works immediately and globally.
- Do not use copyrighted music or audio without permission.

---

# 21. Typography, Content, and Editorial Choreography

Typography is not a label placed over the 3D. It is a primary design material.

## 21.1 Typography system

Define a controlled type system:

- Display face for expressive, high-impact moments.
- Text face for readable body content and interface labels.
- Optional mono or technical face for metadata, coordinates, chapter markers, or system-like information.
- A small, intentional scale of sizes and weights.
- Consistent tracking, line-height, casing, and paragraph measure.

Do not use multiple typefaces merely to make the site look experimental. Typography must reinforce the concept and remain legible at real viewport sizes.

## 21.2 Text choreography

Use text motion to control the reading sequence:

- Reveal a sentence as the camera approaches its subject.
- Introduce a title after a scene has established context.
- Keep a key phrase fixed while the environment changes behind it.
- Split a headline into meaningful fragments only when it improves emphasis.
- Use labels to identify specific parts of an object.
- Move from abstract statement to concrete proof as the story progresses.

Do not animate every word by default. Excessive staggered text reveals slow reading and create a generic template effect. Keep body copy stable whenever possible.

## 21.3 Content integrity

- Write actual project-specific content. Do not fill the page with invented claims, fake statistics, placeholder testimonials, or meaningless pseudo-technical copy.
- Keep the central message understandable without completing every animation.
- Use concise copy for immersive scenes and provide enough detail for real decisions.
- Do not hide critical information in tiny labels or fleeting transitions.
- Include conventional navigation or a content index when the experience is long or complex.
- Provide a way to revisit important chapters or key information.

---

# 22. Persistent Interface and Navigation Inside the Experience

Immersive does not mean disorienting. The visitor should always know where they are and how to proceed.

Possible persistent elements:

- Small project identity or wordmark.
- Chapter number/name.
- Story progress indicator.
- Sound toggle.
- Menu or chapter index.
- Exit, skip, or replay control.
- Contextual interaction hint.

Use only what the experience needs. Do not fill the screen with HUD decoration, fake coordinates, invented system diagnostics, or labels that do not communicate useful information.

### Navigation rules

1. Chapter navigation must move to a real chapter state, not just update a label.
2. The active chapter indicator must track the actual scroll or story state.
3. Menu open/close transitions must be reversible and keyboard accessible.
4. Opening a menu must not leave hidden interactive elements focusable behind it.
5. Direct links to important content must remain available when appropriate.
6. Browser back/forward behavior should be considered for multi-route experiences.
7. Provide a replay or return-to-start path after the final chapter.
8. Do not hijack browser navigation or prevent users from leaving.

---

# 23. Implementation Architecture for a Continuous 3D Story

Use a clear architecture. Do not place the entire experience in one giant component or scatter timeline logic across unrelated components.

## 23.1 Recommended conceptual layers

1. **Experience shell:** document structure, global state, accessibility, navigation, loading, error and fallback states.
2. **HTML interface layer:** typography, controls, chapter labels, content, progress, menus, and accessible equivalents.
3. **3D renderer layer:** WebGL renderer, scene, camera, lights, environment, post-processing.
4. **Asset layer:** models, textures, fonts, audio, video, and lazy-loading policies.
5. **Narrative controller:** chapter state, scroll progress, transition rules, and scene orchestration.
6. **Interaction controller:** pointer, touch, keyboard, raycasting, drag, selection, and focus behavior.
7. **Animation layer:** GSAP or another chosen timeline system, with clear ownership of animated properties.
8. **Performance layer:** device capability checks, quality settings, visibility pausing, and adaptive fallbacks.

## 23.2 Keep a single source of truth

- Maintain one authoritative chapter/progress state.
- Keep camera transforms controlled by one system at a time.
- Do not allow multiple timelines to fight over the same object property.
- Separate user interaction state from animation progress.
- Keep scene objects and materials in stable references; avoid recreating them on every React render.
- Use refs for high-frequency mutable Three.js values where appropriate.
- Keep semantic content in HTML, not exclusively inside the canvas.

## 23.3 Suggested project structure

Adapt to the existing repository; do not impose a rewrite just to match this example.

```text
src/
  app/
    ExperienceApp.tsx
    experienceState.ts
    capabilities.ts
  experience/
    ExperienceShell.tsx
    EntranceSequence.tsx
    ExperienceCanvas.tsx
    ExperienceFallback.tsx
    ExperienceError.tsx
  scene/
    SceneRoot.tsx
    CameraRig.tsx
    LightingRig.tsx
    Environment.tsx
    objects/
    effects/
  story/
    chapters.ts
    StoryController.ts
    ScrollController.ts
    transitions.ts
  interface/
    Overlay.tsx
    ChapterIndicator.tsx
    ProgressIndicator.tsx
    SoundToggle.tsx
    NavigationMenu.tsx
    AccessibleContent.tsx
  interactions/
    usePointerInteraction.ts
    useDragControls.ts
    useKeyboardControls.ts
  animation/
    timelines.ts
    cleanup.ts
  assets/
    manifest.ts
  styles/
    tokens.css
    experience.css
```

## 23.4 GSAP and Three.js ownership

- GSAP can orchestrate timelines, scroll progress, DOM choreography, and Three.js object properties.
- Three.js or React Three Fiber owns rendering and scene lifecycle.
- Do not run a separate requestAnimationFrame loop for every animated component.
- Avoid multiple render loops.
- Ensure GSAP contexts and ScrollTriggers are reverted on unmount.
- Kill timelines and listeners when their owning scene is removed.
- Avoid mutating React state on every animation frame.
- Use `invalidate`/demand rendering only when the scene can safely render on demand; use continuous rendering when actual animation requires it.
- Keep scroll progress and animation progress synchronized.
- If using Lenis, integrate its update loop with GSAP ScrollTrigger using the documented integration approach for the installed versions. Do not add Lenis by habit if native scrolling produces a better and more accessible result.

## 23.5 ScrollTrigger implementation rules

- Create triggers only after the relevant DOM and scene are ready.
- Use stable trigger elements and explicit start/end definitions.
- Refresh after fonts, images, and layout-critical assets are ready when necessary.
- Avoid repeated refresh calls on every render.
- Use `invalidateOnRefresh` only where values must be recalculated.
- Clean up triggers and timelines during route changes and component unmount.
- Test both forward and reverse scrolling.
- Test browser resize and orientation changes.
- Avoid hardcoded pixel ranges that break at different viewport sizes; use function-based values or responsive chapter definitions.
- Keep pinned elements from causing horizontal overflow or unexpected blank gaps.

## 23.6 Scene chapter data

Represent chapter metadata declaratively where practical. For example:

```ts
export type Chapter = {
  id: string;
  title: string;
  summary: string;
  start: number;
  end: number;
  sceneState: string;
  interaction?: string;
};
```

The exact schema should fit the project. Do not turn a simple page into a complex CMS or generic scene framework. The point is to keep chapter identity, content, progress, and navigation coherent.

---

# 24. Blender and Asset Direction for Narrative Scenes

Blender assets should be authored for a directed real-time experience, not simply exported as a beauty render.

## 24.1 Asset planning

For each scene, list:

- Hero object(s).
- Secondary objects and props.
- Environment geometry.
- Background/sky/environment map.
- Materials and texture sets.
- Animation clips.
- Camera states or camera reference positions.
- Interaction targets and proxy colliders.
- Objects that need to appear/disappear between chapters.
- Objects that can be loaded later.

## 24.2 Model organization

- Use meaningful object and collection names.
- Separate objects that need independent animation or interaction.
- Apply transforms appropriately before export.
- Set sensible origins and pivots for rotation and animation.
- Use consistent scale and coordinate conventions.
- Keep material count controlled.
- Remove hidden, unused, duplicate, and unnecessary geometry.
- Create simplified collision/proxy meshes for interaction where useful.
- Use LODs or simplified versions for distant objects when needed.
- Keep the scene modular so later chapters can load or unload parts.

## 24.3 Animation authoring

- Use named animation actions with clear purposes.
- Avoid exporting unnecessary animation tracks.
- Ensure animation clips have predictable start/end states.
- Avoid relying on Blender-only modifiers or simulation features that do not export to glTF.
- Bake complex deformations when required and verify the result in the browser.
- Prefer runtime-controlled transforms for camera and chapter choreography when those values must respond continuously to scroll.
- Use Blender animation for authored object motion; use the web runtime for interactive state and user-driven timing.

## 24.4 Export and validation

- Export `.glb`/`.gltf` using glTF 2.0.
- Verify geometry, normals, tangents, UVs, materials, textures, animation clips, and transforms in the actual target browser.
- Check alpha modes and transparency sorting.
- Check color management and tone mapping against the intended look.
- Check texture dimensions and compression.
- Test loading time and memory footprint on a mid-range device.
- Do not assume the Blender viewport is an accurate representation of the browser renderer.
- Keep the `.blend` source file organized and preserve a reproducible export process.

## 24.5 Asset fallback and loading tiers

Prepare alternate representations when the main asset is expensive:

- High-quality GLB for capable desktop devices.
- Optimized/simplified GLB for mobile or lower-power devices.
- Static poster or image sequence for no-WebGL fallback.
- HTML text/content equivalent for essential information.

Do not load the highest-resolution asset for every visitor by default.

---

# 25. Performance: Immersion Must Not Mean Slowness

A visually impressive experience that stutters, overheats a phone, or takes too long to begin is not high quality.

## 25.1 Performance budgets

Set explicit budgets before production. Establish project-specific limits for:

- Initial JavaScript payload.
- Critical first-scene asset size.
- Total 3D geometry and draw calls.
- Texture memory.
- Shader complexity.
- Number of real-time lights and shadows.
- Post-processing passes.
- Audio and video downloads.
- Time to interactive entrance.
- Frame rate on a defined mid-range device.

Do not invent universal numbers. Measure on target devices and set budgets appropriate to the project.

## 25.2 Rendering optimization

- Use instancing for repeated geometry.
- Merge static geometry where it reduces draw calls without harming culling or interaction.
- Use texture atlases where appropriate.
- Compress geometry with Meshopt or Draco where beneficial.
- Use KTX2/Basis texture compression when supported by the pipeline.
- Limit texture dimensions and mipmaps according to actual viewing distance.
- Reuse materials and geometries.
- Avoid unnecessary transparent materials and overdraw.
- Limit shadow-casting lights and shadow map sizes.
- Use baked lighting where dynamic lighting is not required.
- Use frustum culling and LOD where useful.
- Reduce pixel ratio on high-density screens when GPU cost is excessive.
- Pause rendering when the canvas is offscreen or the document is hidden, unless a specific behavior requires otherwise.

## 25.3 Adaptive quality

Create a small number of tested quality profiles, for example:

- High: full effects and intended scene detail.
- Balanced: reduced particle counts, shadow quality, and render scale.
- Low: simplified geometry/effects and limited real-time rendering.
- Fallback: HTML/image/video representation with equivalent essential content.

Choose quality using capability signals and runtime performance, not user-agent sniffing alone. Allow the user to access a simplified experience. Do not silently degrade so much that the story becomes confusing.

## 25.4 Runtime safety

- Handle WebGL context loss and restoration where feasible.
- Avoid unbounded allocations in animation loops.
- Dispose geometries, materials, textures, render targets, and controls when no longer needed.
- Avoid memory leaks from event listeners and animation timelines.
- Ensure asset errors do not freeze the whole page.
- Do not render expensive effects behind hidden overlays.
- Test long sessions and repeated replay cycles.

---

# 26. Responsive Experience Design: Desktop and Mobile Are Different Directions

Do not assume the same immersive interaction can simply shrink to mobile.

## 26.1 Desktop direction

Desktop may support:

- Larger scene composition and more visual depth.
- Pointer hover previews.
- Drag-to-inspect interactions.
- More complex camera movement.
- Longer pinned sequences when justified.
- Optional soundscape and richer post-processing.

## 26.2 Mobile direction

Mobile must be deliberately art-directed:

- Recompose the subject and typography for portrait orientation.
- Use tap and swipe patterns instead of hover.
- Make hit targets comfortably touchable.
- Avoid requiring precise dragging to progress.
- Reduce geometry, texture size, particle count, shadows, and post-processing.
- Prefer shorter or unpinned scroll chapters when necessary.
- Keep the page responsive to native touch scrolling.
- Avoid fixed overlays that cover most of the viewport.
- Respect safe-area insets and dynamic browser chrome.
- Avoid horizontal overflow.
- Provide a stable poster/HTML fallback for devices that cannot sustain WebGL.

## 26.3 Responsive narrative preservation

Mobile may simplify the technique, but it must preserve:

- The same core premise.
- The same narrative progression.
- The same essential information.
- The signature moment in an adapted form.
- The same final action.

Do not remove the entire experience on mobile and replace it with a generic list of sections unless the user explicitly wants a simplified content-only version.

---

# 27. Accessibility and User Agency

An experimental website must remain usable by people who do not use a mouse, cannot hear audio, prefer reduced motion, or cannot run WebGL.

- Use semantic HTML for headings, navigation, buttons, links, and content.
- Keep essential text outside the canvas.
- Provide keyboard equivalents for every essential interaction.
- Maintain visible focus indicators.
- Ensure color contrast for text and controls.
- Do not rely on color alone to communicate state.
- Respect `prefers-reduced-motion` and provide a genuinely reduced-motion experience.
- Avoid rapid flashes and disorienting camera motion.
- Provide pause/stop controls for prolonged or auto-running motion where appropriate.
- Do not hijack scroll or keyboard controls in a way that blocks browser operation.
- Provide captions or text equivalents for meaningful audio/video content.
- Ensure the sound toggle and chapter navigation are accessible.
- Test screen-reader reading order and focus order.
- Ensure content remains understandable if animation fails or is disabled.

Reduced motion should not simply disable all content. Replace camera travel with static scene compositions, replace large transitions with fades or instant state changes, and preserve chapter information and navigation.

---

# 28. Failure States, Interruptions, and Recovery

A production experience must define what happens when things go wrong.

### Required cases

- First load with slow network.
- Missing or failed 3D asset.
- Unsupported or disabled WebGL.
- WebGL context lost during the experience.
- Audio permission/autoplay blocked.
- Browser tab becomes hidden and later visible.
- User resizes or rotates the device.
- User refreshes on a later scroll position.
- User navigates away and returns.
- User presses browser back/forward.
- Animation timeline is interrupted mid-transition.
- User rapidly scrolls forward and backward.
- User activates controls repeatedly.

For every case, the experience should recover to a valid state, show a useful fallback, or offer a clear retry. Never leave the user with a blank canvas, frozen loader, invisible button, or permanently locked scroll.

---

# 29. Testing the Full Experience

Do not validate only the hero or a static screenshot. Test the entire journey.

## 29.1 Narrative test

- Can a first-time visitor understand what the experience is about?
- Is the entrance invitation clear?
- Does the visitor understand how to begin?
- Does each chapter add a distinct idea or discovery?
- Does the story progress logically?
- Is there a memorable signature moment?
- Does the ending resolve the premise?
- Is the next action clear?

## 29.2 Interaction test

- Does every visible control work?
- Are all gestures discoverable?
- Are pointer and touch interactions reliable?
- Can the visitor reverse or reset where appropriate?
- Does keyboard navigation work?
- Does the active chapter indicator remain correct?
- Are there accidental clicks while scrolling?
- Does the sound toggle truly mute all experience audio?

## 29.3 Visual test

Inspect every chapter at:

- Desktop widescreen.
- Standard laptop.
- Tablet landscape and portrait.
- Mobile portrait.
- Narrow mobile width.
- Reduced-motion mode.
- Low-quality rendering profile.

Look for:

- Text overlapping the model or UI.
- Camera framing that crops the subject incorrectly.
- Text too small or low contrast.
- Unbalanced negative space.
- Unintended horizontal scrolling.
- Abrupt scene changes.
- Inconsistent typography and spacing.
- Sections that feel generic or unfinished.
- Visual repetition without narrative purpose.

## 29.4 Motion test

- Scroll slowly through every transition.
- Scroll quickly through every transition.
- Reverse through every transition.
- Stop midway through each pinned scene.
- Resize while a timeline is active.
- Test on touch devices.
- Confirm there is no timeline conflict or camera jump.
- Confirm the story does not depend on a single exact scroll speed.

## 29.5 Performance test

- Measure initial load and entrance readiness.
- Profile frame rate and long tasks.
- Inspect GPU and memory use.
- Check texture and model payloads.
- Test on a mid-range mobile device, not only a development workstation.
- Test replay and long-session stability.
- Confirm rendering pauses when appropriate.

---

# 30. Mandatory Anti-Basic Quality Gate

Before declaring the site complete, evaluate it against this gate. If any critical item fails, continue improving the implementation.

## Experience-level requirements

- [ ] The site has a defined premise and original visual thesis.
- [ ] The visitor enters through an intentional, designed opening.
- [ ] The entrance does something meaningful beyond hiding a loader.
- [ ] The site has a coherent beginning, middle, and end.
- [ ] The experience is divided into purposeful narrative beats or chapters.
- [ ] Scrolling meaningfully changes the scene, story, or information—not only opacity and vertical position.
- [ ] At least one signature interaction is specific to this project.
- [ ] Camera, lighting, subject, typography, and transitions feel art-directed as one system.
- [ ] The 3D model is part of the story rather than a decorative centerpiece.
- [ ] The ending resolves the experience and offers a real next action.

## Design-level requirements

- [ ] The result does not resemble a generic SaaS landing page.
- [ ] It does not rely on generic gradient blobs, random particles, glass cards, or endless glow effects as a substitute for art direction.
- [ ] Typography, spacing, composition, color, and contrast are deliberate.
- [ ] Each chapter has a distinct purpose and visual development.
- [ ] The entire page—not just the first screen—has been designed.
- [ ] The mobile experience is intentionally composed.

## Engineering-level requirements

- [ ] Entrance and chapter states are deterministic.
- [ ] Timelines and event listeners clean up correctly.
- [ ] Scroll and animation behavior work in both directions.
- [ ] No controls are decorative or inert.
- [ ] Loading and failure states are implemented.
- [ ] WebGL/audio/reduced-motion fallbacks exist.
- [ ] The experience has been tested at multiple viewport sizes.
- [ ] Performance has been checked on realistic hardware.
- [ ] No console errors, broken assets, layout overflow, or stuck scroll states remain.

**Hard rule:** A site with a 3D hero, a few fade-in sections, and a footer does not pass. A site with a beautiful entrance but no coherent journey does not pass. A site with complex motion but no meaningful story does not pass. A site that works only on a powerful desktop does not pass.

---

# 31. Required AI Agent Behavior

When this skill is active, the coding agent must behave as an experience director and senior creative developer—not as a template generator.

## 31.1 Do not start with code generation

First inspect the project, understand the actual content and constraints, and create the experience brief and chapter score. If the user has supplied reference websites, inspect them to understand the quality bar and interaction principles. Do not claim to have inspected interactions that cannot be accessed or observed.

## 31.2 Do not settle for the first plausible design

Generate and compare at least three genuinely different creative directions internally. They must differ in concept, composition, spatial metaphor, and interaction—not merely color palette. Select the strongest direction for the project and develop it consistently.

## 31.3 Do not use the reference as a clone target

Never copy reference assets, text, exact section sequence, exact camera movement, or distinctive visual signatures. Translate the quality into an original experience with its own premise, visual language, and narrative.

## 31.4 Build the complete journey

Implement the entrance, active experience, chapter progression, interactions, resolution, and ending. Do not stop after the hero. Do not substitute generic cards for chapters that should be immersive scenes. Do not leave lower sections as placeholders.

## 31.5 Prefer authored scenes over generic effects

If a scene needs a custom model, environment, or material to communicate the concept, create or source the correct asset rather than stacking generic effects on a stock model. If no suitable Blender asset exists, state what asset is needed and create a sensible temporary representation only when it does not undermine the final quality.

## 31.6 Make real controls work

Every visible interaction must be implemented. Do not create fake “Explore,” “Start,” “Sound,” “Discover,” “Next,” or “Drag” controls. If a feature is not implemented, do not present it as functional.

## 31.7 Inspect the result in a browser

Use available browser/preview tools to inspect the actual running website, not just the source code. Verify the entrance, each chapter, responsive behavior, and interactions. Fix visual defects before reporting completion. If browser inspection is unavailable, state that visual runtime verification could not be performed.

## 31.8 Final report

At completion, report briefly:

- The experience concept and narrative arc.
- The entrance interaction.
- The implemented chapter/scene interactions.
- The key assets and technologies used.
- Responsive and accessibility behavior.
- Performance/fallback work.
- Any known limitations or unfinished items.

Never claim a feature, animation, browser test, or performance result that was not actually implemented or verified.

---

# 32. Final Directive

Build a website that feels like entering a designed world with a reason to explore it. The visitor should not merely scroll past content or look at a 3D object. They should be invited in, oriented, given agency, guided through a sequence of meaningful discoveries, and brought to a satisfying resolution.

The references establish an ambition for **entrance, continuity, cinematic pacing, scroll-led storytelling, interactivity, and craft**. They do not define the design. Invent a new world, a new visual language, and a new story for every project.

**Do not deliver a 3D-themed website. Deliver a complete interactive experience.**
