# Blender → Web → Three.js / R3F

Contents: 1 Asset planning · 2 Blender preparation · 3 Materials and lighting · 4 Animation · 5 Export and optimization (CLI) · 6 Scene as data · 7 Vanilla Three.js production scaffold · 8 React Three Fiber · 9 Camera and composition · 10 Shaders and post-processing · 11 Failure and fallback · 12 Loading tiers

Version note: Three.js addon paths, drei helpers, and renderer options change between releases. Read the installed version in `package.json` and its types before writing code, and adapt the snippets.

---

## 1. Asset planning

Before opening Blender, list what each chapter needs: hero object, environment, supporting props, textures, HDRI, animation clips, fallback stills. Write an **asset manifest** (template in `qa-and-delivery.md`) with purpose, budget, format, LOD tier, and fallback for each. If a needed asset does not exist, say so and use a clearly temporary stand-in only when it does not undermine the result.

`.blend` is the editable source. The browser never loads `.blend`. Ship **glTF 2.0**, normally binary **GLB**.

## 2. Blender preparation

1. Delete hidden, unused, duplicate objects and orphan data (`File → Clean Up → Purge Unused Data`).
2. Apply transforms (scale/rotation) where appropriate; set pivots where rotation or interaction should happen.
3. Use real-world or consistent project scale (1 unit = 1 m is a good default).
4. Name objects, materials, cameras, lights, and animation actions meaningfully (`Lid_Hinge`, `Gasket_Inner`, `Action_OpenLid`). Names are your hooks from code.
5. Check normals (face orientation overlay), smoothing, sharp edges, non-manifold geometry.
6. Reduce geometry to what the camera distance justifies. Bake high-poly detail into normal maps. Apply or bake modifiers that must survive export.
7. Keep UVs valid and non-overlapping where baking; avoid wasted UV space.
8. Remove unused materials and images.
9. Keep material count low (draw calls scale with materials × meshes). Merge meshes that share a material and never animate separately.
10. Test in the browser pipeline, not only Blender's viewport or Cycles.

## 3. Materials and lighting

glTF supports a Principled-BSDF subset: base color, metallic, roughness, normal, occlusion, emissive, alpha, plus extensions (clearcoat, transmission, sheen, IOR, specular, volume, anisotropy, emissive strength).

- Do not expect procedural nodes, Geometry Nodes, or render-only effects to export. Bake procedural looks into textures.
- Pack ORM (occlusion/roughness/metallic) into one texture to cut texture count.
- Texture sizes by on-screen need: hero 2048 max (4096 only when the camera gets very close and the budget allows), props 512 to 1024, mobile tiers one step lower.
- Avoid large transparent textures and heavy alpha blending (overdraw, sorting). Prefer alpha-test or geometry.
- `transmission`/`volume` materials are expensive (extra render pass); use on one hero object or fake with environment reflection.

**Lighting strategy** (decide per scene): baked, real-time, or hybrid.
- Static environments → bake lighting/AO into textures; keep one or two real-time lights for the subject.
- Few real-time lights; at most one or two shadow-casting lights with tight shadow camera bounds and modest map sizes (1024 to 2048).
- HDRI/environment maps for reflections: use a small prefiltered environment (PMREM) rather than a 8k HDR; or a handful of `RectAreaLight`-style soft boxes baked into a small env.
- Check on bright and dim displays and under outdoor glare.

## 4. Animation preparation

- Focused, named clips; keep reusable clips short.
- Object and skeletal animations export well; keep a sensible armature and hierarchy.
- Bake simulations (cloth, fluid, particles, procedural motion) to shape keys, geometry caches, textures, or video; or recreate the effect in Three.js/shader.
- Verify loops, timing, root motion, and clip names after export.
- Prefer scroll-driven `AnimationMixer.setTime()` / `action.time` for scrub; for ambient motion, play clips normally.

## 5. Export and optimization

Export settings (Blender glTF 2.0): format GLB; include only selected/required objects; apply modifiers; +Y up; compression off in Blender (do it in the pipeline); export cameras/lights only if you will use them; keep animation clips you need and strip the rest.

Then optimize with `gltf-transform`:

```bash
# inspect first: sizes, triangle counts, texture dimensions, extensions
npx @gltf-transform/cli inspect hero.glb

# one-command baseline: dedupe, prune, weld, quantize, compress geometry + textures
npx @gltf-transform/cli optimize hero.glb hero.opt.glb \
  --compress meshopt \
  --texture-compress webp \
  --texture-size 2048

# KTX2 (GPU-compressed textures: low VRAM, fast upload) needs the `toktx` tool installed
npx @gltf-transform/cli optimize hero.glb hero.ktx.glb --compress meshopt --texture-compress ktx2
```

Choose: **Meshopt** (fast decode, good with animation/skins) or **Draco** (smaller static geometry, slower decode, needs a decoder). **KTX2/Basis** for large or numerous textures; WebP/AVIF for fewer, smaller textures where VRAM is not the issue. Keep **uncompressed fallback** only if the target browsers cannot decode your chosen compression (rare today).

Before shipping every GLB: size on disk, triangle count, texture dimensions and count, material count, extensions used, animation clip names, scale, orientation, missing textures, transparency behavior. Reopen in a glTF viewer or minimal Three.js test scene. Record the numbers in the asset manifest.

Typical starting budgets (adjust to audience; measure on a mid-range phone):

| Asset | Desktop | Mobile tier |
|---|---|---|
| Hero model (compressed GLB) | ≤ 2–3 MB | ≤ 1 MB |
| Entire initial 3D payload | ≤ 5 MB | ≤ 2 MB |
| Hero triangles | ≤ 150k | ≤ 50k |
| Draw calls (visible) | ≤ 150 | ≤ 60 |
| Texture VRAM (decoded) | ≤ 128 MB | ≤ 48 MB |

## 6. Scene as data

Chapters are data, not scattered code. One source of truth drives scroll, camera, light, and UI.

```js
// chapters.js
export const chapters = [
  { id: 'arrival',  start: 0.00, end: 0.20,
    camera: { pos: [0.0, 0.8, 6.0], target: [0, 0.2, 0], fov: 32 },
    light:  { key: 1.2, color: '#ffe6c7' }, model: { rotY: 0.0 },  caption: 'arrival' },
  { id: 'mechanism', start: 0.20, end: 0.55,
    camera: { pos: [1.1, 0.3, 2.2], target: [0.1, 0.1, 0], fov: 28 },
    light:  { key: 2.0, color: '#ffd7a0' }, model: { rotY: 1.2 },  caption: 'mechanism' },
  { id: 'resolve',  start: 0.55, end: 1.00,
    camera: { pos: [0.0, 0.5, 4.2], target: [0, 0.2, 0], fov: 34 },
    light:  { key: 1.4, color: '#fff4e0' }, model: { rotY: 2.4 },  caption: 'resolve' },
];

export function sampleChapters(progress) {
  const i = Math.max(0, chapters.findIndex(c => progress >= c.start && progress <= c.end));
  const a = chapters[i], b = chapters[Math.min(i + 1, chapters.length - 1)];
  const t = a === b ? 1 : (progress - a.start) / (a.end - a.start);
  return { a, b, t: Math.min(Math.max(t, 0), 1) };
}
```

Provide a per-chapter `mobile` override block when the composition differs.

## 7. Vanilla Three.js production scaffold

Features: compressed-asset loaders, DPR cap, resize observer, visibility and off-screen pausing, context-loss handling, reduced-motion awareness, damped scroll-driven camera, full disposal.

```js
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';
import { KTX2Loader } from 'three/addons/loaders/KTX2Loader.js';
import { MeshoptDecoder } from 'three/addons/libs/meshopt_decoder.module.js';
import { sampleChapters } from './chapters.js';

export function createScene({ container, modelUrl, getProgress, onState }) {
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  let disposed = false, running = false, visible = true;

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;       // decide deliberately; compare with AgX/Neutral
  const dprCap = matchMedia('(pointer: coarse)').matches ? 1.5 : 2;
  const setDpr = (v) => renderer.setPixelRatio(Math.min(devicePixelRatio || 1, v));
  setDpr(dprCap);
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 100);
  const key = new THREE.DirectionalLight(0xffffff, 1.2); key.position.set(3, 4, 5);
  scene.add(key, new THREE.HemisphereLight(0xffffff, 0x333333, 0.6));

  const draco = new DRACOLoader().setDecoderPath('/draco/');
  const ktx2  = new KTX2Loader().setTranscoderPath('/basis/').detectSupport(renderer);
  const loader = new GLTFLoader().setDRACOLoader(draco).setKTX2Loader(ktx2).setMeshoptDecoder(MeshoptDecoder);

  let model = null, mixer = null;
  loader.load(modelUrl, (gltf) => {
    if (disposed) return;
    model = gltf.scene; scene.add(model);
    if (gltf.animations.length) mixer = new THREE.AnimationMixer(model);
    onState?.('ready');
  }, undefined, (err) => { console.error('GLB load failed', err); onState?.('fallback'); });

  const resize = () => {
    const w = container.clientWidth, h = container.clientHeight;
    if (!w || !h) return;
    camera.aspect = w / h; camera.updateProjectionMatrix();
    renderer.setSize(w, h, false);
  };
  const ro = new ResizeObserver(resize); ro.observe(container); resize();

  const target = { pos: new THREE.Vector3(), look: new THREE.Vector3(), fov: 32 };
  const look = new THREE.Vector3();
  const clock = new THREE.Clock();

  function frame() {
    const dt = Math.min(clock.getDelta(), 0.05);
    const { a, b, t } = sampleChapters(getProgress());
    const e = t * t * (3 - 2 * t);                               // smoothstep between chapter keys
    target.pos.set(...a.camera.pos).lerp(new THREE.Vector3(...b.camera.pos), e);
    target.look.set(...a.camera.target).lerp(new THREE.Vector3(...b.camera.target), e);
    target.fov = THREE.MathUtils.lerp(a.camera.fov, b.camera.fov, e);

    const lambda = reduceMotion ? 100 : 6;                       // reduced motion: effectively snap
    camera.position.x = THREE.MathUtils.damp(camera.position.x, target.pos.x, lambda, dt);
    camera.position.y = THREE.MathUtils.damp(camera.position.y, target.pos.y, lambda, dt);
    camera.position.z = THREE.MathUtils.damp(camera.position.z, target.pos.z, lambda, dt);
    look.lerp(target.look, 1 - Math.exp(-lambda * dt)); camera.lookAt(look);
    camera.fov = THREE.MathUtils.damp(camera.fov, target.fov, lambda, dt); camera.updateProjectionMatrix();

    mixer?.update(dt);
    renderer.render(scene, camera);
  }

  const start = () => { if (!running && !disposed && visible && !document.hidden) { running = true; clock.start(); renderer.setAnimationLoop(frame); } };
  const stop  = () => { running = false; renderer.setAnimationLoop(null); };

  const io = new IntersectionObserver(([en]) => { visible = en.isIntersecting; visible ? start() : stop(); }, { threshold: 0 });
  io.observe(container);
  const onVis = () => (document.hidden ? stop() : start());
  document.addEventListener('visibilitychange', onVis);

  const canvas = renderer.domElement;
  const onLost = (e) => { e.preventDefault(); stop(); onState?.('fallback'); };
  const onRestored = () => { onState?.('ready'); start(); };
  canvas.addEventListener('webglcontextlost', onLost);
  canvas.addEventListener('webglcontextrestored', onRestored);

  start();

  return {
    setQuality: setDpr,                                          // used by adaptive quality
    dispose() {
      disposed = true; stop(); io.disconnect(); ro.disconnect();
      document.removeEventListener('visibilitychange', onVis);
      canvas.removeEventListener('webglcontextlost', onLost);
      canvas.removeEventListener('webglcontextrestored', onRestored);
      mixer?.stopAllAction();
      scene.traverse((o) => {
        if (!o.isMesh) return;
        o.geometry?.dispose();
        (Array.isArray(o.material) ? o.material : [o.material]).forEach((m) => {
          if (!m) return;
          for (const v of Object.values(m)) if (v?.isTexture) v.dispose();
          m.dispose();
        });
      });
      draco.dispose(); ktx2.dispose();
      renderer.dispose(); canvas.remove();
    },
  };
}
```

Notes: do not dispose resources that are cached and shared; wire `dispose()` to the framework's unmount; `getProgress` returns the single scroll-derived value from §8.1 of the scroll reference.

## 8. React Three Fiber

- One `<Canvas>` for the persistent scene, outside page-section components. Route-level content sits in the DOM above/below.
- Per-frame work in `useFrame`; mutable objects via refs; no `setState` per frame.
- For scenes that change only on scroll or interaction, use `frameloop="demand"` and call `invalidate()` when progress changes.
- Set `dpr={[1, 2]}` (or a lower cap on touch); add `<AdaptiveDpr pixelated />` / `<PerformanceMonitor>` from drei where the installed version provides them.
- Load models with `useGLTF` and configure compressed decoders for the installed version; `useGLTF.preload()` the hero.
- `Suspense` with a deliberate fallback; keep important page content outside the Suspense boundary.
- Shared resources are cached; understand disposal before manually disposing.
- Use `<Preload all />` sparingly; it can cause a large first-frame stall.
- Keep DOM controls separate from canvas interactions.

```jsx
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, PerformanceMonitor } from '@react-three/drei';
import { useRef, useState } from 'react';
import { sampleChapters } from './chapters';
import { progressRef } from './scrollState';   // written by ScrollTrigger, read here (no React state)

function Rig() {
  const ref = useRef();
  useFrame((state, dt) => {
    const { a, b, t } = sampleChapters(progressRef.current);
    const e = t * t * (3 - 2 * t);
    state.camera.position.lerpVectors(
      new THREE.Vector3(...a.camera.pos), new THREE.Vector3(...b.camera.pos), e);
    state.camera.lookAt(...a.camera.target);
  });
  return null;
}

function Hero() { const { scene } = useGLTF('/models/hero.glb'); return <primitive object={scene} />; }

export default function Experience() {
  const [dpr, setDpr] = useState(1.5);
  return (
    <Canvas dpr={dpr} camera={{ fov: 32, position: [0, 0.8, 6] }} gl={{ antialias: true }}>
      <PerformanceMonitor onDecline={() => setDpr(1)} onIncline={() => setDpr(1.5)} />
      <ambientLight intensity={0.6} /><directionalLight position={[3, 4, 5]} intensity={1.2} />
      <Hero /><Rig />
    </Canvas>
  );
}
```

(Import `THREE` as the project does; this snippet shows structure, not exact imports.)

## 9. Camera and composition

- Treat the camera as art direction: focal length, height, and distance define character (long lens = compressed/monumental; wide = intimate/dynamic).
- Compose for desktop and mobile aspect ratios separately. For narrow aspects, increase camera distance or reduce FOV to keep the subject framed; do not just letterbox.
- Keep essential parts away from crop boundaries; reserve safe zones for text.
- First rendered frame must already be composed and attractive, before any animation.
- Define camera **ownership** per chapter: scripted, user-orbit, or hybrid, never two controllers at once.

## 10. Shaders and post-processing

- Use shaders for something the story needs: material response, reveal masks, atmosphere, signal/water, transition. Not as constant flavor.
- Budget: custom fragment shaders full-screen at high DPR are costly. Lower resolution of full-screen passes; clamp loops; avoid dependent texture reads in tight loops.
- Post-processing (bloom, DOF, SSAO, chromatic aberration, grain) is optional and tiered: off on mobile and low-tier devices, minimal on desktop. Each pass adds a full-screen render.
- Keep uniforms driven by the single scroll/progress state; update with refs, not React state.
- Test banding and color shifts on both sRGB displays and wide-gamut.
- For WebGPU/TSL, treat as an enhancement with WebGL fallback; verify feature detection and parity before depending on it.

## 11. WebGL failure and fallback

Detect and respond to: no WebGL, WebGL disabled, software renderer, context loss, shader compile failure, GLB load failure, low-memory devices, data-saver.

Fallback ladder (use the highest that works):
1. Full scene.
2. Reduced scene (no post, lower DPR, simpler materials, smaller textures).
3. Pre-rendered image sequence or video with the same chapter structure.
4. Static composed images + the full DOM content.

All tiers keep the same copy, navigation, and CTAs. Test each ladder rung deliberately (Chrome flags / Playwright `--disable-gpu`, `--disable-webgl`, throttling).

## 12. Loading tiers

- **Tier 0:** HTML, CSS, fonts, poster image (immediate; this is the LCP).
- **Tier 1:** low-poly or compressed hero + minimal textures (enter experience).
- **Tier 2:** full textures, secondary models, HDRI (stream behind the entrance).
- **Tier 3:** optional extras (audio, extra chapters' assets) lazy-loaded by chapter proximity.

Use `fetch` + `ReadableStream` or `LoadingManager` for real progress. Preload only what the first chapter needs. Cache with long-lived immutable headers and hashed filenames.
