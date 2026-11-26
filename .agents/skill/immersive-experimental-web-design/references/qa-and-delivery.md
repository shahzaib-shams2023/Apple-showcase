# QA, Quality Gate, Templates, Delivery

Contents: 1 Test matrix · 2 Playwright verification script · 3 Manual passes · 4 Quality gate · 5 Templates (brief, chapter score, asset manifest, QA report, final report) · 6 Worked example

---

## 1. Test matrix

Run against the real dev server or a production build (`vite preview`, `next start`), not just source.

| Axis | Cases |
|---|---|
| Viewports | 320×568, 375×812, 414×896, 768×1024, 1024×768, 1280×720, 1440×900, 1920×1080, 1366×600, 812×375 (landscape phone) |
| Input | mouse, touch emulation, keyboard only |
| Preferences | `prefers-reduced-motion: reduce`, dark/light if supported, forced-colors spot-check |
| Capability | WebGL available, WebGL disabled, slow CPU (4–6× throttle), slow network |
| Browsers | Chromium, WebKit (Safari engine), Firefox at minimum |
| Lifecycle | first load, reload mid-scroll, back/forward, tab hide/show, resize mid-timeline, route change and return |

## 2. Playwright verification script

Use this when browser automation is available. It captures screenshots at each chapter, scrubs scroll in both directions, records console errors and overflow, and repeats under reduced motion and without WebGL.

```js
// verify.mjs  —  run: npx playwright install chromium && node verify.mjs http://localhost:5173
import { chromium, webkit, firefox } from 'playwright';
import fs from 'node:fs';

const url = process.argv[2] ?? 'http://localhost:5173';
const viewports = [
  { name: 'mobile', width: 390, height: 844, hasTouch: true, isMobile: true },
  { name: 'tablet', width: 820, height: 1180, hasTouch: true },
  { name: 'laptop', width: 1366, height: 768 },
  { name: 'desktop', width: 1920, height: 1080 },
];
const modes = [
  { name: 'default', opts: {} },
  { name: 'reduced', opts: { reducedMotion: 'reduce' } },
];
fs.mkdirSync('qa-shots', { recursive: true });
const report = [];

for (const engine of [chromium]) {                 // add webkit, firefox for cross-browser
  const browser = await engine.launch();
  for (const vp of viewports) for (const mode of modes) {
    const ctx = await browser.newContext({ viewport: { width: vp.width, height: vp.height },
      hasTouch: vp.hasTouch, isMobile: vp.isMobile, ...mode.opts });
    const page = await ctx.newPage();
    const errors = [];
    page.on('console', m => { if (['error', 'warning'].includes(m.type())) errors.push(`${m.type()}: ${m.text()}`); });
    page.on('pageerror', e => errors.push(`pageerror: ${e.message}`));
    page.on('requestfailed', r => errors.push(`requestfailed: ${r.url()}`));

    await page.goto(url, { waitUntil: 'networkidle' });
    await page.waitForTimeout(2500);                                   // entrance
    const total = await page.evaluate(() => document.documentElement.scrollHeight - innerHeight);
    const steps = 12;

    const sweep = async (dir) => {
      for (let i = 0; i <= steps; i++) {
        const y = Math.round((dir === 'down' ? i : steps - i) / steps * total);
        await page.evaluate(v => scrollTo({ top: v, behavior: 'instant' }), y);
        await page.waitForTimeout(450);
        if (dir === 'down')
          await page.screenshot({ path: `qa-shots/${vp.name}-${mode.name}-${String(i).padStart(2, '0')}.png` });
      }
    };
    await sweep('down'); await sweep('up');                            // reverse must restore states

    const overflowX = await page.evaluate(() => document.documentElement.scrollWidth > innerWidth + 1);
    const offenders = await page.evaluate(() => [...document.querySelectorAll('*')]
      .filter(el => el.getBoundingClientRect().right > innerWidth + 1).slice(0, 5)
      .map(el => el.tagName + '.' + String(el.className).slice(0, 40)));
    const hasCanvas = await page.evaluate(() => !!document.querySelector('canvas'));
    const focusables = await page.evaluate(() => document.querySelectorAll('a[href],button,[tabindex]:not([tabindex="-1"])').length);

    report.push({ engine: engine.name(), viewport: vp.name, mode: mode.name,
      overflowX, offenders, hasCanvas, focusables, errors: [...new Set(errors)] });
    await ctx.close();
  }
  await browser.close();
}

// WebGL-disabled fallback check
{
  const b = await chromium.launch({ args: ['--disable-gpu', '--disable-3d-apis'] });
  const p = await (await b.newContext({ viewport: { width: 1366, height: 768 } })).newPage();
  const errs = []; p.on('pageerror', e => errs.push(e.message));
  await p.goto(url, { waitUntil: 'networkidle' }); await p.waitForTimeout(2500);
  await p.screenshot({ path: 'qa-shots/no-webgl.png', fullPage: false });
  const text = await p.evaluate(() => document.body.innerText.length);
  report.push({ check: 'no-webgl', bodyTextLength: text, errors: errs });
  await b.close();
}

fs.writeFileSync('qa-report.json', JSON.stringify(report, null, 2));
console.log(JSON.stringify(report, null, 2));
```

Then **look at the screenshots** (open each) to judge composition, clipped text, contrast over scenes, and chapter variety. Automation catches errors; only eyes catch taste.

For keyboard: script `Tab` presses and assert each focus stop is visible; for accessibility spot-checks run `axe` via `@axe-core/playwright` on each chapter state.

## 3. Manual passes

**Narrative:** Can the story be summarized in one sentence? Is there a clear beginning, middle, end? Does every chapter change what the visitor knows or can do? Is there an obvious resolution and next action? Would any chapter feel identical if its content were swapped?

**Interaction:** Every visible control works. Hover, focus, active, disabled exist. Keyboard reaches everything. Touch has no hover dependency. Nothing traps scroll or focus.

**Visual:** Look for text over model/UI, bad crops, low contrast over moving backgrounds, unbalanced negative space, inconsistent type/spacing, abrupt scene changes, generic or unfinished sections, repetition without purpose.

**Motion:** Scroll slowly, quickly, in reverse; stop mid-pin; resize during a timeline; confirm no camera jumps or timeline conflicts; the story survives any scroll speed.

**Performance:** Measure load, entrance readiness, frame rate, long tasks, memory growth over a long session and after replaying chapters. Test a mid-range phone, not only a dev machine.

## 4. Quality gate

Do not call the site complete until every critical item passes. Fix, or disclose clearly.

**Experience**
- [ ] Defined premise and original visual thesis (one sentence).
- [ ] Intentional entrance that does real work beyond hiding a loader.
- [ ] Coherent beginning, middle, end, divided into purposeful chapters.
- [ ] Scroll changes scene, story, or information; not only opacity and Y-offset.
- [ ] At least one signature interaction specific to this project.
- [ ] Camera, lighting, subject, type, transitions feel like one art-directed system.
- [ ] 3D (if used) is part of the story, not a centerpiece ornament.
- [ ] Ending resolves and offers a real action.

**Design**
- [ ] Not a generic SaaS landing page; no reliance on blobs/particles/glass/glow as art direction.
- [ ] Deliberate type, spacing, composition, color, contrast.
- [ ] Each chapter has a distinct purpose and visual development; at least four distinct layouts.
- [ ] The whole page, not just the first screen, is designed.
- [ ] Mobile is intentionally composed, not shrunk.

**Engineering**
- [ ] Entrance and chapter states are deterministic; scroll works both directions; anchors land correctly.
- [ ] Timelines, observers, listeners, loaders cleaned up on unmount.
- [ ] No decorative or inert controls.
- [ ] Loading, failure, no-WebGL, context-loss, reduced-motion, audio-off paths implemented and tested.
- [ ] Performance measured on realistic hardware; adaptive quality works.
- [ ] No console errors, broken assets, horizontal overflow, or stuck scroll.

**Access**
- [ ] Keyboard-only path complete; visible focus; skip link.
- [ ] Contrast checked in the worst frame; targets sized; text reflows at 320px.
- [ ] Auto-moving content has a pause or is short; no flashing.
- [ ] Reduced motion is a designed alternative, not just "animations off".

**Hard fails:** 3D hero + fade-ins + footer · beautiful entrance with no journey · complex motion with no story · works only on powerful desktop · inaccessible by keyboard · scroll trap · fake controls.

## 5. Templates

### 5.1 Experience brief

```
PROJECT:            
PURPOSE:            what the site is for; what the visitor should understand or do
AUDIENCE:           who, what they know, device/network assumptions
PRIMARY ACTION:     
PERSONALITY (3–5):  e.g. precise, warm, nocturnal, tactile
VISUAL THESIS:      one sentence
METAPHOR / WORLD:   
MATERIAL + LIGHT:   
TYPE DIRECTION:     families, roles, scale logic
COLOR ROLES:        bg / fg / muted / surface / accent / focus
MOTION LANGUAGE:    one paragraph
3D ROLE:            exactly what it contributes — or "none, because …"
INTERACTION MODEL:  scroll = ?, pointer = ?, direct actions = ?
SIGNATURE MOMENT:   the one interaction only this project has
RESPONSIVE PLAN:    phone / tablet / laptop / large
FALLBACKS:          reduced motion / no WebGL / low power / slow network
TARGET HARDWARE:    
ASSUMPTIONS:        bullet list, easy to revise
REJECTED DIRECTIONS (2): one line each and why
```

### 5.2 Chapter score

| # | Chapter | Purpose | Message | Scroll (vh) | Scene state | Content / action | Mobile | Fallback |
|---|---|---|---|---|---|---|---|---|
| 1 | | | | | | | | |

### 5.3 Asset manifest

| Asset | Chapter | Purpose | Format | Size (KB) | Tris | Textures | Compression | Tier | Fallback |
|---|---|---|---|---|---|---|---|---|---|
| hero.glb | 1–3 | Subject | GLB | | | | meshopt + ktx2 | 1 | hero-poster.avif |

### 5.4 QA report

```
BUILD:       commit / date / environment
TOOLS:       playwright x.y, lighthouse x.y, devices tested
RESULTS
  Viewports:      pass/fail list
  Reduced motion: pass/fail + notes
  No WebGL:       pass/fail + notes
  Keyboard:       pass/fail + notes
  Console:        errors (count + text)
  Overflow:       offenders
  Perf:           LCP / INP / CLS; avg frame ms (desktop/mobile); peak memory
KNOWN ISSUES:    severity, repro, plan
NOT VERIFIED:    what could not be tested and why
```

### 5.5 Final report (user-facing, brief)

Concept and arc · entrance · chapters and signature interaction · assets and tech · responsive/a11y behavior · performance and fallbacks (with measured numbers) · what was verified and how · limitations and assumptions.

## 6. Worked example (calibration for specificity)

**Brief (condensed):** A small studio makes hand-built mechanical keyboards. Audience: enthusiasts on desktop, many on mid-range phones. Action: join the next drop list.

**Visual thesis:** "A quiet workbench at dusk where a keyboard is assembled in front of you, one decision at a time."

**3D role:** the keyboard assembles from parts as the visitor scrolls: plate, switches, stabilizers, case, keycaps. The 3D explains construction and materials. It is the product story.

**Directions compared:**
1. Workbench assembly (chosen: fits product, craft, and the drop action).
2. Sound-first: waveform and typing audio, minimal visuals (strong but excludes silent browsing; rejected as primary, kept as optional sound layer).
3. Catalog of cases in a gallery (clear but generic; rejected).

**Chapter score (abridged):**
1. *Bench* — dim workbench, plate lit by a lamp; title; entrance resolves as the lamp turns on.
2. *Plate* — camera slides along the plate; switches drop into place one by one (scrubbed).
3. *Sound* — damping layers explode outward in a section view; sound toggle optional.
4. *Case* — aluminum case slides on; light rakes across the surface; material close-up.
5. *Keys* — caps arrive in color waves; pause chapter with a single quote.
6. *Drop* — whole keyboard at rest; join-the-list form; shipping date and price.

**Mobile:** shorter travel; three pins become stacked states; keyboard rotated to portrait framing; caps appear in two groups. **Reduced motion:** six stills with captions, same copy. **No WebGL:** pre-rendered stills at each chapter.

**What makes it pass the gate:** story and product are the same thing; scroll changes the subject, camera, and light; there is a signature moment (switches seating in sequence); the ending is a real action; mobile and no-WebGL tell the same story.
