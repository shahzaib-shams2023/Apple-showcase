import * as THREE from 'three';
import { GLTFLoader, type GLTF } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import {
  LIGHTING_RIGS,
  SPATIAL_ANCHORS,
  SPECIMEN_MODELS,
  classifyStratum,
  resolveStratumZFactor,
  type ExplodeStratumId,
  type LightingRigId,
  type ModelId,
} from '../assets/manifest';
import type { ChapterId } from '../story/chapters';
import { createChamberEnvironment } from './ChamberEnvironment';

export type ExperiencePhase = 'threshold' | 'entering' | 'active';

export interface LoadProgressState {
  progress: number;
  indeterminate: boolean;
  loadedLabel: string;
  ready: boolean;
  error: string | null;
}

export interface NarrativeSceneState {
  activeChapter: ChapterId;
  chapterProgress: number;
  globalProgress: number;
  deconstructProgress: number;
  foldProgress: number;
}

export interface ProjectedCallout {
  id: string;
  label: string;
  detail: string;
  x: number;
  y: number;
  offsetX: number;
  offsetY: number;
  opacity: number;
}

interface ExplodablePart {
  node: THREE.Object3D;
  restZ: number;
  zFactor: number;
  stratumId: ExplodeStratumId;
}

interface CachedSpecimen {
  group: THREE.Group;
  mixer: THREE.AnimationMixer | null;
  duration: number;
  parts: ExplodablePart[];
  anchorNodes: Map<string, THREE.Object3D>;
}

const REFERENCE_PRO_MAX_HEIGHT_M = 0.1634;
const TARGET_UNIT_HEIGHT = 1.88;
const REAL_WORLD_TO_SCENE_SCALE = TARGET_UNIT_HEIGHT / REFERENCE_PRO_MAX_HEIGHT_M;

export class SceneEngine {
  private container: HTMLElement;
  private renderer: THREE.WebGLRenderer;
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private pmremGenerator: THREE.PMREMGenerator;
  private envRT: THREE.WebGLRenderTarget;
  private chamber: ReturnType<typeof createChamberEnvironment>;

  private keyLight: THREE.DirectionalLight;
  private fillLight: THREE.DirectionalLight;
  private rimLight: THREE.DirectionalLight;
  private hemiLight: THREE.HemisphereLight;

  private stagePivot: THREE.Group;
  private modelSlot: THREE.Group;

  private loader: GLTFLoader;
  private cache = new Map<ModelId, CachedSpecimen>();
  private loadingPromises = new Map<ModelId, Promise<CachedSpecimen>>();
  private activeModelId: ModelId = '18-pro-max-burgundy';
  private activeStudioModelId: ModelId = '18-pro-max-burgundy';

  private experiencePhase: ExperiencePhase = 'threshold';
  private narrative: NarrativeSceneState = {
    activeChapter: 'arrival',
    chapterProgress: 0,
    globalProgress: 0,
    deconstructProgress: 0,
    foldProgress: 0,
  };

  private explodeCurrent = 0;
  private explodeTarget = 0;
  private activeStratumHighlight: ExplodeStratumId = 'all';

  private foldCurrentNormalized = 1.0;
  private foldTargetNormalized = 1.0;

  private reducedMotion = false;
  private pointerNDC = new THREE.Vector2(0, 0);
  private pointerSmooth = new THREE.Vector2(0, 0);

  // Direct horizontal/tilt drag inspection (without hijacking vertical scroll)
  private isDraggingInspect = false;
  private dragStartX = 0;
  private dragStartY = 0;
  private inspectYawTarget = 0;
  private inspectPitchTarget = 0;
  private inspectYawCurrent = 0;
  private inspectPitchCurrent = 0;
  private variantSwapSpin = 0;

  private desiredCamPos = new THREE.Vector3(-0.35, 0.08, 3.65);
  private desiredTarget = new THREE.Vector3(0, 0, 0);
  private currentLookTarget = new THREE.Vector3(0, 0, 0);
  private desiredModelOffset = new THREE.Vector3(0, 0, 0);
  private desiredModelEuler = new THREE.Euler(0.04, -1.92, 0.02);

  private desiredAccent = new THREE.Color('#c85a6a');
  private desiredBgColor = new THREE.Color('#090a0c');
  private currentBgColor = new THREE.Color('#090a0c');

  private desiredKeyColor = new THREE.Color('#fff4e8');
  private desiredFillColor = new THREE.Color('#7a8799');
  private desiredRimColor = new THREE.Color('#e47a88');
  private desiredKeyPos = new THREE.Vector3(3.2, 4.4, 3.8);
  private desiredRimPos = new THREE.Vector3(-2.4, 2.5, -4.2);

  private desiredKeyIntensity = 0.34;
  private desiredFillIntensity = 0.25;
  private desiredRimIntensity = 2.65;
  private desiredEnvIntensity = 0.32;
  private desiredPedestalIntensity = 0.42;
  private desiredApertureScale = 0.72;
  private desiredApertureOpacity = 1.0;

  private activeRigId: LightingRigId = 'darkroom';
  private disposed = false;
  private isContextLost = false;
  private rafId = 0;
  private lastTime = 0;
  private resizeObserver: ResizeObserver;

  private tempWorldPos = new THREE.Vector3();
  private tempBox = new THREE.Box3();

  private onProgressChange?: (state: LoadProgressState) => void;
  private onVariantLoading?: (loading: boolean) => void;
  private onCalloutsUpdate?: (callouts: ProjectedCallout[]) => void;
  private onInspectOffsetChange?: (hasOffset: boolean) => void;
  private onContextLossChange?: (lost: boolean) => void;
  private lastHasInspectOffset = false;

  constructor(
    container: HTMLElement,
    callbacks?: {
      onProgressChange?: (state: LoadProgressState) => void;
      onVariantLoading?: (loading: boolean) => void;
      onCalloutsUpdate?: (callouts: ProjectedCallout[]) => void;
      onInspectOffsetChange?: (hasOffset: boolean) => void;
      onContextLossChange?: (lost: boolean) => void;
    }
  ) {
    this.container = container;
    this.onProgressChange = callbacks?.onProgressChange;
    this.onVariantLoading = callbacks?.onVariantLoading;
    this.onCalloutsUpdate = callbacks?.onCalloutsUpdate;
    this.onInspectOffsetChange = callbacks?.onInspectOffsetChange;
    this.onContextLossChange = callbacks?.onContextLossChange;
    this.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const width = Math.max(container.clientWidth, 1);
    const height = Math.max(container.clientHeight, 1);

    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    this.renderer.setPixelRatio(
      Math.min(window.devicePixelRatio || 1, width < 768 ? 1.5 : 1.75)
    );
    this.renderer.setSize(width, height);
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.16;
    this.container.appendChild(this.renderer.domElement);

    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.FogExp2('#090a0c', 0.065);

    this.camera = new THREE.PerspectiveCamera(34, width / height, 0.1, 40);
    this.camera.position.copy(this.desiredCamPos);
    this.camera.lookAt(this.currentLookTarget);

    this.pmremGenerator = new THREE.PMREMGenerator(this.renderer);
    this.pmremGenerator.compileEquirectangularShader();
    const roomEnv = new RoomEnvironment();
    this.envRT = this.pmremGenerator.fromScene(roomEnv, 0.04);
    roomEnv.dispose();
    this.scene.environment = this.envRT.texture;
    this.scene.environmentIntensity = this.desiredEnvIntensity;

    this.hemiLight = new THREE.HemisphereLight('#f4f0e8', '#14161b', 0.35);
    this.scene.add(this.hemiLight);

    this.keyLight = new THREE.DirectionalLight('#fff4e8', this.desiredKeyIntensity);
    this.keyLight.position.copy(this.desiredKeyPos);
    this.scene.add(this.keyLight);

    this.fillLight = new THREE.DirectionalLight('#7a8799', this.desiredFillIntensity);
    this.fillLight.position.set(-4.0, 1.2, 2.5);
    this.scene.add(this.fillLight);

    this.rimLight = new THREE.DirectionalLight('#e47a88', this.desiredRimIntensity);
    this.rimLight.position.copy(this.desiredRimPos);
    this.scene.add(this.rimLight);

    this.chamber = createChamberEnvironment();
    this.scene.add(this.chamber.group);

    this.stagePivot = new THREE.Group();
    this.modelSlot = new THREE.Group();
    this.stagePivot.add(this.modelSlot);
    this.scene.add(this.stagePivot);

    this.loader = new GLTFLoader();

    this.resizeObserver = new ResizeObserver(() => this.handleResize());
    this.resizeObserver.observe(this.container);

    window.addEventListener('pointermove', this.handlePointerMove, { passive: true });
    window.addEventListener('pointerup', this.handlePointerUp, { passive: true });
    window.addEventListener('pointercancel', this.handlePointerUp, { passive: true });
    this.renderer.domElement.addEventListener('pointerdown', this.handlePointerDown);
    this.renderer.domElement.addEventListener('webglcontextlost', this.handleContextLost);
    this.renderer.domElement.addEventListener(
      'webglcontextrestored',
      this.handleContextRestored
    );

    this.handleResize();
    this.startLoop();
    void this.initHeroAsset();
  }

  private async initHeroAsset() {
    try {
      await this.loadSpecimen('18-pro-max-burgundy', (pct, indeterminate) => {
        this.onProgressChange?.({
          progress: pct,
          indeterminate,
          loadedLabel: 'Calibrating 18 Pro Max · Burgundy',
          ready: false,
          error: null,
        });
      });

      if (this.disposed) return;
      this.mountModel('18-pro-max-burgundy');
      this.onProgressChange?.({
        progress: 1,
        indeterminate: false,
        loadedLabel: 'Optical chamber calibrated',
        ready: true,
        error: null,
      });

      window.setTimeout(() => {
        if (!this.disposed) {
          void this.loadSpecimen('duo-fold-star-white').catch(() => {});
        }
      }, 1600);
    } catch (err) {
      const msg =
        err instanceof Error ? err.message : 'Unable to load 3D hardware specimen.';
      this.onProgressChange?.({
        progress: 0,
        indeterminate: false,
        loadedLabel: 'Specimen load error',
        ready: true,
        error: msg,
      });
    }
  }

  private loadSpecimen(
    modelId: ModelId,
    onProgress?: (pct: number, indeterminate: boolean) => void
  ): Promise<CachedSpecimen> {
    const existing = this.cache.get(modelId);
    if (existing) return Promise.resolve(existing);

    const inflight = this.loadingPromises.get(modelId);
    if (inflight) return inflight;

    const spec = SPECIMEN_MODELS.find((m) => m.id === modelId);
    if (!spec) {
      return Promise.reject(new Error(`Unknown specimen id: ${modelId}`));
    }

    const promise = new Promise<CachedSpecimen>((resolve, reject) => {
      this.loader.load(
        spec.fileUrl,
        (gltf: GLTF) => {
          if (this.disposed) return;
          const prepared = this.prepareSpecimen(gltf, spec.hasFoldAnimation);
          this.cache.set(modelId, prepared);
          this.loadingPromises.delete(modelId);
          resolve(prepared);
        },
        (evt) => {
          if (evt.lengthComputable && evt.total > 0) {
            onProgress?.(Math.min(0.98, evt.loaded / evt.total), false);
          } else {
            onProgress?.(0, true);
          }
        },
        (error) => {
          this.loadingPromises.delete(modelId);
          reject(error);
        }
      );
    });

    this.loadingPromises.set(modelId, promise);
    return promise;
  }

  private prepareSpecimen(gltf: GLTF, hasFoldAnimation: boolean): CachedSpecimen {
    const wrapper = new THREE.Group();
    const root = gltf.scene;

    root.scale.setScalar(REAL_WORLD_TO_SCENE_SCALE);
    root.updateMatrixWorld(true);

    const box = new THREE.Box3().setFromObject(root);
    const center = new THREE.Vector3();
    box.getCenter(center);
    root.position.sub(center);

    const parts: ExplodablePart[] = [];
    const anchorNodes = new Map<string, THREE.Object3D>();
    const sceneRoot = root.getObjectByName('GLTF_SceneRootNode');

    if (!hasFoldAnimation && sceneRoot) {
      sceneRoot.children.forEach((child) => {
        parts.push({
          node: child,
          restZ: child.position.z,
          zFactor: resolveStratumZFactor(child.name),
          stratumId: classifyStratum(child.name),
        });
      });
    }

    root.traverse((obj) => {
      for (const anchor of SPATIAL_ANCHORS) {
        if (obj.name.startsWith(anchor.meshPrefix) && !anchorNodes.has(anchor.id)) {
          anchorNodes.set(anchor.id, obj);
        }
      }

      if ((obj as THREE.Mesh).isMesh) {
        const mesh = obj as THREE.Mesh;
        mesh.frustumCulled = false;
        const mats = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
        mats.forEach((mat) => {
          if (!mat) return;
          if ((mat as THREE.MeshStandardMaterial).isMeshStandardMaterial) {
            const std = mat as THREE.MeshStandardMaterial;
            std.envMapIntensity = 1.25;
            if (std.emissiveMap) {
              std.emissiveIntensity = 1.05;
            }
          }
        });
      }
    });

    wrapper.add(root);

    let mixer: THREE.AnimationMixer | null = null;
    let duration = 2.0;

    if (hasFoldAnimation && gltf.animations.length > 0) {
      const clip = gltf.animations[0];
      duration = clip.duration || 2.0;
      mixer = new THREE.AnimationMixer(root);
      const action = mixer.clipAction(clip);
      action.play();
      mixer.setTime(this.foldCurrentNormalized * duration);
    }

    return { group: wrapper, mixer, duration, parts, anchorNodes };
  }

  private mountModel(modelId: ModelId) {
    const specimen = this.cache.get(modelId);
    if (!specimen) return;

    this.modelSlot.clear();
    this.modelSlot.add(specimen.group);
    this.activeModelId = modelId;

    const spec = SPECIMEN_MODELS.find((m) => m.id === modelId);
    if (spec) {
      this.desiredAccent.set(spec.accentHex);
      this.desiredBgColor.set(spec.chamberBgHex);
      this.applyRigTargets(spec.rigId);
    }

    if (specimen.mixer) {
      specimen.mixer.setTime(this.foldCurrentNormalized * specimen.duration);
    }
  }

  private applyRigTargets(rigId: LightingRigId) {
    this.activeRigId = rigId;
    const rig = LIGHTING_RIGS[rigId];
    this.desiredKeyColor.set(rig.keyColor);
    this.desiredFillColor.set(rig.fillColor);
    this.desiredRimColor.set(rig.rimColor);
    this.desiredKeyIntensity = rig.keyIntensity;
    this.desiredFillIntensity = rig.fillIntensity;
    this.desiredRimIntensity = rig.rimIntensity;
    this.desiredEnvIntensity = rig.envIntensity;
  }

  public setExperiencePhase(phase: ExperiencePhase) {
    this.experiencePhase = phase;
    if (phase === 'entering' || phase === 'active') {
      const spec = SPECIMEN_MODELS.find((m) => m.id === this.activeModelId);
      this.applyRigTargets(spec?.rigId ?? this.activeRigId);
      this.desiredPedestalIntensity = 0.85;
      this.desiredApertureScale = 1.38;
      this.desiredApertureOpacity = 0.72;
    } else {
      this.desiredApertureScale = 0.72;
      this.desiredApertureOpacity = 1.0;
      this.inspectYawTarget = 0;
      this.inspectPitchTarget = 0;
    }
  }

  public async updateNarrativeState(next: NarrativeSceneState) {
    const prevChapter = this.narrative.activeChapter;
    this.narrative = next;

    if (next.activeChapter !== prevChapter) {
      if (next.activeChapter !== 'finishes' && next.activeChapter !== 'metamorphosis') {
        this.inspectYawTarget = 0;
        this.inspectPitchTarget = 0;
      }

      if (next.activeChapter === 'metamorphosis') {
        this.onVariantLoading?.(true);
        try {
          await this.loadSpecimen('duo-fold-star-white');
          if (!this.disposed && this.narrative.activeChapter === 'metamorphosis') {
            this.mountModel('duo-fold-star-white');
          }
        } finally {
          this.onVariantLoading?.(false);
        }
      } else if (this.activeModelId !== this.activeStudioModelId) {
        await this.setStudioModel(this.activeStudioModelId, false);
      }
    }
  }

  public async setStudioModel(modelId: ModelId, spinOnSwap = true) {
    this.activeStudioModelId = modelId;
    if (this.narrative.activeChapter === 'metamorphosis') return;

    this.onVariantLoading?.(true);
    try {
      await this.loadSpecimen(modelId);
      if (!this.disposed && (this.narrative.activeChapter as ChapterId) !== 'metamorphosis') {
        this.mountModel(modelId);
        if (spinOnSwap && !this.reducedMotion) {
          this.variantSwapSpin += Math.PI * 0.5;
        }
      }
    } finally {
      this.onVariantLoading?.(false);
    }
  }

  public resetInspectionAngle() {
    this.inspectYawTarget = 0;
    this.inspectPitchTarget = 0;
  }

  private handlePointerDown = (e: PointerEvent) => {
    if (this.experiencePhase !== 'active') return;
    if (
      this.narrative.activeChapter !== 'finishes' &&
      this.narrative.activeChapter !== 'metamorphosis'
    ) {
      return;
    }
    this.isDraggingInspect = true;
    this.dragStartX = e.clientX;
    this.dragStartY = e.clientY;
  };

  private handlePointerMove = (e: PointerEvent) => {
    if (!this.reducedMotion) {
      this.pointerNDC.x = (e.clientX / window.innerWidth) * 2 - 1;
      this.pointerNDC.y = -(e.clientY / window.innerHeight) * 2 + 1;
    }

    if (this.isDraggingInspect) {
      const dx = e.clientX - this.dragStartX;
      const dy = e.clientY - this.dragStartY;
      this.dragStartX = e.clientX;
      this.dragStartY = e.clientY;

      this.inspectYawTarget += dx * 0.0085;
      this.inspectPitchTarget = THREE.MathUtils.clamp(
        this.inspectPitchTarget + dy * 0.0055,
        -0.55,
        0.55
      );
    }
  };

  private handlePointerUp = () => {
    this.isDraggingInspect = false;
  };

  private handleResize = () => {
    const width = Math.max(this.container.clientWidth, 1);
    const height = Math.max(this.container.clientHeight, 1);
    const aspect = width / height;

    this.camera.aspect = aspect;
    this.camera.fov = aspect < 0.72 ? 43 : aspect < 1.05 ? 38 : 34;
    this.camera.updateProjectionMatrix();

    this.renderer.setPixelRatio(
      Math.min(window.devicePixelRatio || 1, width < 768 ? 1.5 : 1.75)
    );
    this.renderer.setSize(width, height);
  };

  private handleContextLost = (e: Event) => {
    e.preventDefault();
    this.isContextLost = true;
    this.onContextLossChange?.(true);
  };

  private handleContextRestored = () => {
    this.isContextLost = false;
    this.onContextLossChange?.(false);
  };

  private updateExplodedLayers(dt: number) {
    const activeSpecimen = this.cache.get(this.activeModelId);
    if (!activeSpecimen || activeSpecimen.parts.length === 0) return;

    this.explodeCurrent = THREE.MathUtils.damp(
      this.explodeCurrent,
      this.explodeTarget,
      this.reducedMotion ? 20 : 6.2,
      dt
    );

    const maxLocalSpreadMeters = 0.052;

    for (const part of activeSpecimen.parts) {
      let factor = part.zFactor;
      if (this.activeStratumHighlight !== 'all' && this.explodeCurrent > 0.04) {
        if (part.stratumId === this.activeStratumHighlight) {
          factor += part.zFactor >= 0 ? 0.12 : -0.12;
        }
      }
      part.node.position.z =
        part.restZ + factor * this.explodeCurrent * maxLocalSpreadMeters;
    }
  }

  private updateCallouts() {
    if (!this.onCalloutsUpdate) return;

    const width = this.container.clientWidth;
    const height = this.container.clientHeight;

    if (
      this.experiencePhase !== 'active' ||
      this.reducedMotion ||
      width < 920 ||
      (this.narrative.activeChapter !== 'anatomy' &&
        this.narrative.activeChapter !== 'deconstruction')
    ) {
      this.onCalloutsUpdate([]);
      return;
    }

    const specimen = this.cache.get(this.activeModelId);
    if (!specimen) {
      this.onCalloutsUpdate([]);
      return;
    }

    const ch = this.narrative.activeChapter;
    const p =
      ch === 'anatomy'
        ? this.narrative.chapterProgress
        : this.narrative.deconstructProgress;

    const results: ProjectedCallout[] = [];

    for (const anchor of SPATIAL_ANCHORS) {
      if (anchor.chapter !== ch) continue;
      if (p < anchor.progressMin || p > anchor.progressMax) continue;

      const node = specimen.anchorNodes.get(anchor.id);
      if (!node) continue;

      this.tempBox.setFromObject(node);
      this.tempBox.getCenter(this.tempWorldPos);
      this.tempWorldPos.project(this.camera);

      if (this.tempWorldPos.z > 1) continue;

      const x = (this.tempWorldPos.x * 0.5 + 0.5) * width;
      const y = (-this.tempWorldPos.y * 0.5 + 0.5) * height;

      const edgeFadeIn = THREE.MathUtils.smoothstep(
        p,
        anchor.progressMin,
        anchor.progressMin + 0.06
      );
      const edgeFadeOut =
        1 -
        THREE.MathUtils.smoothstep(
          p,
          anchor.progressMax - 0.06,
          anchor.progressMax
        );

      results.push({
        id: anchor.id,
        label: anchor.label,
        detail: anchor.detail,
        x,
        y,
        offsetX: anchor.offsetPx[0],
        offsetY: anchor.offsetPx[1],
        opacity: Math.min(edgeFadeIn, edgeFadeOut),
      });
    }

    this.onCalloutsUpdate(results);
  }

  private updateChoreography(dt: number, elapsed: number) {
    const isNarrow = this.container.clientWidth < 920;
    const dampSpeed = this.reducedMotion ? 22 : 4.8;

    if (!this.reducedMotion) {
      this.pointerSmooth.x = THREE.MathUtils.damp(
        this.pointerSmooth.x,
        this.pointerNDC.x,
        3.8,
        dt
      );
      this.pointerSmooth.y = THREE.MathUtils.damp(
        this.pointerSmooth.y,
        this.pointerNDC.y,
        3.8,
        dt
      );
    }

    this.inspectYawCurrent = THREE.MathUtils.damp(
      this.inspectYawCurrent,
      this.inspectYawTarget,
      6.5,
      dt
    );
    this.inspectPitchCurrent = THREE.MathUtils.damp(
      this.inspectPitchCurrent,
      this.inspectPitchTarget,
      6.5,
      dt
    );
    this.variantSwapSpin = THREE.MathUtils.damp(this.variantSwapSpin, 0, 4.5, dt);

    const hasInspectOffset =
      Math.abs(this.inspectYawTarget) > 0.06 ||
      Math.abs(this.inspectPitchTarget) > 0.06;
    if (hasInspectOffset !== this.lastHasInspectOffset) {
      this.lastHasInspectOffset = hasInspectOffset;
      this.onInspectOffsetChange?.(hasInspectOffset);
    }

    let ringTilt = 0;

    if (this.experiencePhase === 'threshold') {
      // Closed optical iris framing a monumental backlit edge silhouette
      this.explodeTarget = 0;
      this.activeStratumHighlight = 'all';
      this.desiredKeyIntensity = 0.28;
      this.desiredFillIntensity = 0.22;
      this.desiredRimIntensity = 2.75;
      this.desiredEnvIntensity = 0.28;
      this.desiredPedestalIntensity = 0.36;
      this.desiredApertureScale = isNarrow ? 0.65 : 0.72;
      this.desiredApertureOpacity = 1.0;

      this.desiredModelOffset.set(isNarrow ? 0 : 0.34, isNarrow ? 0.22 : -0.02, 0);
      const breathe = this.reducedMotion ? 0 : Math.sin(elapsed * 0.45) * 0.05;
      this.desiredModelEuler.set(0.05, -2.05 + breathe, 0.03);
      this.desiredCamPos.set(-0.32, 0.08, isNarrow ? 4.85 : 3.95);
      this.desiredTarget.set(0, 0, 0);
      this.desiredKeyPos.set(3.2, 4.4, 3.8);
      this.desiredRimPos.set(-2.5, 2.2, -3.6);
      ringTilt = -0.3;
    } else if (this.experiencePhase === 'entering') {
      // Camera dollies through expanding aperture rings as collimator lights ignite
      this.explodeTarget = 0;
      this.activeStratumHighlight = 'all';
      const rig = LIGHTING_RIGS[this.activeRigId];
      this.desiredKeyIntensity = rig.keyIntensity;
      this.desiredFillIntensity = rig.fillIntensity;
      this.desiredRimIntensity = rig.rimIntensity;
      this.desiredEnvIntensity = rig.envIntensity;
      this.desiredPedestalIntensity = 0.85;
      this.desiredApertureScale = isNarrow ? 1.15 : 1.38;
      this.desiredApertureOpacity = 0.78;

      this.desiredModelOffset.set(isNarrow ? 0 : 0.76, isNarrow ? 0.36 : 0.02, 0);
      this.desiredModelEuler.set(0.06, -0.52, -0.03);
      this.desiredCamPos.set(0.14, 0.06, isNarrow ? 4.75 : 3.75);
      this.desiredTarget.set(0, 0, 0);
      ringTilt = 0.25;
    } else {
      const ch = this.narrative.activeChapter;
      const p = this.narrative.chapterProgress;
      const rig = LIGHTING_RIGS[this.activeRigId];

      this.desiredKeyIntensity = rig.keyIntensity;
      this.desiredFillIntensity = rig.fillIntensity;
      this.desiredRimIntensity = rig.rimIntensity;
      this.desiredEnvIntensity = rig.envIntensity;
      this.desiredPedestalIntensity = 0.82;
      this.desiredApertureScale = isNarrow ? 1.16 : 1.35;
      this.desiredApertureOpacity = 0.65;

      if (ch === 'arrival') {
        this.explodeTarget = 0;
        this.activeStratumHighlight = 'all';
        this.desiredModelOffset.set(
          isNarrow ? 0 : THREE.MathUtils.lerp(0.76, 0.68, p),
          isNarrow ? 0.36 : 0.02,
          0
        );
        const idleYaw = this.reducedMotion ? 0 : Math.sin(elapsed * 0.45) * 0.05;
        this.desiredModelEuler.set(
          0.06 + this.pointerSmooth.y * 0.05,
          THREE.MathUtils.lerp(-0.52, -1.08, p) + idleYaw + this.pointerSmooth.x * 0.1,
          -0.03 * (1 - p)
        );
        this.desiredCamPos.set(
          THREE.MathUtils.lerp(0.14, 0.22, p),
          THREE.MathUtils.lerp(0.06, 0.1, p),
          isNarrow ? 4.85 : THREE.MathUtils.lerp(3.75, 3.45, p)
        );
        this.desiredTarget.set(0, 0, 0);
        this.desiredKeyPos.set(3.2, 4.4, 3.8);
        this.desiredRimPos.set(-2.4, 2.5, -4.2);
        ringTilt = p * 0.4;
      } else if (ch === 'anatomy') {
        // 3-stage spline sweep: Side Rail -> USB-C Base -> Rear Triple-Lens Plateau
        this.explodeTarget = 0;
        this.activeStratumHighlight = 'all';
        this.desiredModelOffset.set(isNarrow ? 0 : 0.66, isNarrow ? 0.38 : 0.02, 0);

        if (p < 0.35) {
          const t = p / 0.35;
          this.desiredModelEuler.set(
            THREE.MathUtils.lerp(0.06, 0.14, t),
            THREE.MathUtils.lerp(-1.08, -1.56, t) + this.pointerSmooth.x * 0.06,
            0
          );
          this.desiredCamPos.set(
            THREE.MathUtils.lerp(0.22, 0.38, t),
            THREE.MathUtils.lerp(0.1, -0.35, t),
            isNarrow ? 4.35 : THREE.MathUtils.lerp(3.45, 2.85, t)
          );
          this.desiredTarget.set(0, THREE.MathUtils.lerp(0, -0.25, t), 0);
          this.desiredKeyPos.set(3.4, 1.5, 2.5);
        } else if (p < 0.68) {
          const t = (p - 0.35) / 0.33;
          this.desiredModelEuler.set(
            THREE.MathUtils.lerp(0.14, -0.38, t),
            THREE.MathUtils.lerp(-1.56, -2.25, t),
            0
          );
          this.desiredCamPos.set(
            THREE.MathUtils.lerp(0.38, 0.15, t),
            THREE.MathUtils.lerp(-0.35, -1.15, t),
            isNarrow ? 3.55 : THREE.MathUtils.lerp(2.85, 2.25, t)
          );
          this.desiredTarget.set(0, THREE.MathUtils.lerp(-0.25, -0.58, t), 0);
          this.desiredKeyPos.set(1.2, -2.8, 3.0);
        } else {
          const t = (p - 0.68) / 0.32;
          this.desiredModelEuler.set(
            THREE.MathUtils.lerp(-0.38, -0.08, t),
            THREE.MathUtils.lerp(-2.25, -3.02, t) + this.pointerSmooth.x * 0.06,
            0
          );
          this.desiredCamPos.set(
            THREE.MathUtils.lerp(0.15, -0.18, t),
            THREE.MathUtils.lerp(-1.15, 0.26, t),
            isNarrow ? 3.85 : THREE.MathUtils.lerp(2.25, 2.95, t)
          );
          this.desiredTarget.set(0, THREE.MathUtils.lerp(-0.58, 0.2, t), 0);
          this.desiredKeyPos.set(-2.2, 3.8, 3.2);
          this.desiredRimPos.set(2.8, 2.2, -3.5);
        }
        ringTilt = 0.4 + p * 1.1;
      } else if (ch === 'deconstruction') {
        // Pinned scroll-driven 43-mesh Z-axis dissection
        const dp = this.narrative.deconstructProgress;
        const eased = Math.sin(Math.min(1, dp * 1.08) * Math.PI * 0.5);
        this.explodeTarget = eased;

        this.activeStratumHighlight =
          dp < 0.33 ? 'display' : dp < 0.66 ? 'chassis' : 'optics';

        this.desiredModelOffset.set(isNarrow ? 0 : 0.44, isNarrow ? 0.54 : 0.02, 0);
        this.desiredModelEuler.set(
          THREE.MathUtils.lerp(0.1, 0.16, dp) + this.pointerSmooth.y * 0.05,
          THREE.MathUtils.lerp(-0.72, -0.92, dp) + this.pointerSmooth.x * 0.1,
          -0.04
        );
        this.desiredCamPos.set(
          isNarrow ? 1.65 : THREE.MathUtils.lerp(1.8, 2.05, dp),
          THREE.MathUtils.lerp(0.24, 0.38, dp),
          isNarrow ? 5.65 : THREE.MathUtils.lerp(3.85, 4.35, dp)
        );
        this.desiredTarget.set(0, 0, 0);
        this.desiredKeyPos.set(3.5, 4.0, 2.2);
        this.desiredPedestalIntensity = 1.0;
        ringTilt = 1.5 + dp * 0.8;
      } else if (ch === 'finishes') {
        // Studio finish & dimension comparison with non-blocking drag inspection
        this.explodeTarget = 0;
        this.activeStratumHighlight = 'all';
        this.desiredModelOffset.set(isNarrow ? 0 : 0.56, isNarrow ? 0.48 : 0.0, 0);
        this.desiredModelEuler.set(
          0.08 + this.inspectPitchCurrent + this.pointerSmooth.y * 0.05,
          -0.55 + this.inspectYawCurrent + this.variantSwapSpin + this.pointerSmooth.x * 0.09,
          -0.02
        );
        this.desiredCamPos.set(
          0.25,
          0.1,
          isNarrow ? 4.85 : 3.55
        );
        this.desiredTarget.set(0, 0, 0);
        this.desiredKeyPos.set(3.0, 4.2, 3.6);
        ringTilt = 2.3 + this.inspectYawCurrent * 0.25;
      } else if (ch === 'metamorphosis') {
        // Pinned scroll-driven 180 -> 0 Duo Fold skeletal hinge
        this.explodeTarget = 0;
        this.activeStratumHighlight = 'all';
        const fp = this.narrative.foldProgress;
        // Start closed (1.0 -> 180 deg) and smoothly open to flat canvas (0.0 -> 0 deg)
        const unfold = 1 - THREE.MathUtils.clamp((fp - 0.06) / 0.84, 0, 1);
        this.foldTargetNormalized = unfold;

        this.foldCurrentNormalized = THREE.MathUtils.damp(
          this.foldCurrentNormalized,
          this.foldTargetNormalized,
          this.reducedMotion ? 20 : 6.2,
          dt
        );
        const foldSpec = this.cache.get('duo-fold-star-white');
        if (foldSpec?.mixer) {
          foldSpec.mixer.setTime(this.foldCurrentNormalized * foldSpec.duration);
        }

        this.desiredModelOffset.set(isNarrow ? 0 : -1.16, isNarrow ? 0.58 : 0.02, 0);
        this.desiredModelEuler.set(
          THREE.MathUtils.lerp(0.08, 0.2, fp) + this.inspectPitchCurrent,
          THREE.MathUtils.lerp(0.88, 0.14, fp) +
            this.inspectYawCurrent +
            this.pointerSmooth.x * 0.08,
          0
        );
        this.desiredCamPos.set(
          isNarrow ? 0.2 : THREE.MathUtils.lerp(0.55, 0.1, fp),
          THREE.MathUtils.lerp(0.22, 0.38, fp),
          isNarrow ? 5.65 : THREE.MathUtils.lerp(4.45, 4.75, fp)
        );
        this.desiredTarget.set(0, 0, 0);
        this.desiredKeyPos.set(2.5, 4.5, 4.0);
        this.desiredApertureScale = isNarrow ? 1.25 : 1.5;
        ringTilt = 2.6 + fp * 0.9;
      } else {
        // Resolution: calm architectural vault pullback
        this.explodeTarget = 0;
        this.activeStratumHighlight = 'all';
        this.desiredKeyIntensity = rig.keyIntensity * 0.65;
        this.desiredRimIntensity = rig.rimIntensity * 1.05;
        this.desiredPedestalIntensity = 0.5;
        this.desiredApertureScale = isNarrow ? 1.25 : 1.55;
        this.desiredApertureOpacity = 0.45;

        this.desiredModelOffset.set(isNarrow ? 0 : 0.72, isNarrow ? 0.44 : 0.42, 0);
        const slowSpin = this.reducedMotion ? -0.45 : -0.45 + Math.sin(elapsed * 0.25) * 0.18;
        this.desiredModelEuler.set(0.1, slowSpin, -0.04);
        this.desiredCamPos.set(0, 0.16, isNarrow ? 5.5 : 4.75);
        this.desiredTarget.set(0, -0.05, 0);
        ringTilt = 3.5;
      }
    }

    // Smooth lighting & background mood interpolation
    this.keyLight.color.lerp(this.desiredKeyColor, Math.min(1, dt * 3.5));
    this.fillLight.color.lerp(this.desiredFillColor, Math.min(1, dt * 3.5));
    this.rimLight.color.lerp(this.desiredRimColor, Math.min(1, dt * 3.5));
    this.keyLight.position.lerp(this.desiredKeyPos, Math.min(1, dt * 3.5));
    this.rimLight.position.lerp(this.desiredRimPos, Math.min(1, dt * 3.5));

    this.keyLight.intensity = THREE.MathUtils.damp(
      this.keyLight.intensity,
      this.desiredKeyIntensity,
      3.8,
      dt
    );
    this.fillLight.intensity = THREE.MathUtils.damp(
      this.fillLight.intensity,
      this.desiredFillIntensity,
      3.8,
      dt
    );
    this.rimLight.intensity = THREE.MathUtils.damp(
      this.rimLight.intensity,
      this.desiredRimIntensity,
      3.8,
      dt
    );
    this.scene.environmentIntensity = THREE.MathUtils.damp(
      this.scene.environmentIntensity,
      this.desiredEnvIntensity,
      3.8,
      dt
    );

    this.currentBgColor.lerp(this.desiredBgColor, Math.min(1, dt * 3.0));
    if (this.scene.fog instanceof THREE.FogExp2) {
      this.scene.fog.color.copy(this.currentBgColor);
    }

    this.updateExplodedLayers(dt);

    // Smooth specimen & camera motion
    this.stagePivot.position.x = THREE.MathUtils.damp(
      this.stagePivot.position.x,
      this.desiredModelOffset.x,
      dampSpeed,
      dt
    );
    this.stagePivot.position.y = THREE.MathUtils.damp(
      this.stagePivot.position.y,
      this.desiredModelOffset.y,
      dampSpeed,
      dt
    );
    this.stagePivot.position.z = THREE.MathUtils.damp(
      this.stagePivot.position.z,
      this.desiredModelOffset.z,
      dampSpeed,
      dt
    );

    this.stagePivot.rotation.x = THREE.MathUtils.damp(
      this.stagePivot.rotation.x,
      this.desiredModelEuler.x,
      dampSpeed,
      dt
    );
    this.stagePivot.rotation.y = THREE.MathUtils.damp(
      this.stagePivot.rotation.y,
      this.desiredModelEuler.y,
      dampSpeed,
      dt
    );
    this.stagePivot.rotation.z = THREE.MathUtils.damp(
      this.stagePivot.rotation.z,
      this.desiredModelEuler.z,
      dampSpeed,
      dt
    );

    this.camera.position.x = THREE.MathUtils.damp(
      this.camera.position.x,
      this.desiredCamPos.x,
      dampSpeed,
      dt
    );
    this.camera.position.y = THREE.MathUtils.damp(
      this.camera.position.y,
      this.desiredCamPos.y,
      dampSpeed,
      dt
    );
    this.camera.position.z = THREE.MathUtils.damp(
      this.camera.position.z,
      this.desiredCamPos.z,
      dampSpeed,
      dt
    );

    this.currentLookTarget.x = THREE.MathUtils.damp(
      this.currentLookTarget.x,
      this.desiredTarget.x,
      dampSpeed,
      dt
    );
    this.currentLookTarget.y = THREE.MathUtils.damp(
      this.currentLookTarget.y,
      this.desiredTarget.y,
      dampSpeed,
      dt
    );
    this.currentLookTarget.z = THREE.MathUtils.damp(
      this.currentLookTarget.z,
      this.desiredTarget.z,
      dampSpeed,
      dt
    );
    this.camera.lookAt(this.currentLookTarget);

    this.chamber.update({
      time: this.reducedMotion ? 0 : elapsed,
      dt,
      apertureScale: this.desiredApertureScale,
      apertureOpacity: this.desiredApertureOpacity,
      ringTilt,
      pedestalX: this.stagePivot.position.x,
      explode: this.explodeCurrent,
      fold:
        this.narrative.activeChapter === 'metamorphosis'
          ? 1 - this.foldCurrentNormalized
          : 0,
      pedestalIntensity: this.desiredPedestalIntensity,
      accent: this.desiredAccent,
      pointerX: this.pointerSmooth.x,
      pointerY: this.pointerSmooth.y,
    });

    this.stagePivot.updateMatrixWorld(true);
    this.camera.updateMatrixWorld(true);
    this.updateCallouts();
  }

  private startLoop() {
    const tick = (now: number) => {
      if (this.disposed) return;
      this.rafId = requestAnimationFrame(tick);

      if (this.isContextLost || document.hidden) {
        this.lastTime = now;
        return;
      }

      const dt = this.lastTime ? Math.min((now - this.lastTime) / 1000, 0.05) : 0.016;
      this.lastTime = now;

      this.updateChoreography(dt, now / 1000);
      this.renderer.render(this.scene, this.camera);
    };

    this.rafId = requestAnimationFrame(tick);
  }

  public dispose() {
    this.disposed = true;
    cancelAnimationFrame(this.rafId);
    this.resizeObserver.disconnect();
    window.removeEventListener('pointermove', this.handlePointerMove);
    window.removeEventListener('pointerup', this.handlePointerUp);
    window.removeEventListener('pointercancel', this.handlePointerUp);
    this.renderer.domElement.removeEventListener('pointerdown', this.handlePointerDown);
    this.renderer.domElement.removeEventListener('webglcontextlost', this.handleContextLost);
    this.renderer.domElement.removeEventListener(
      'webglcontextrestored',
      this.handleContextRestored
    );

    this.chamber.dispose();

    for (const cached of this.cache.values()) {
      cached.mixer?.stopAllAction();
      cached.group.traverse((obj) => {
        if ((obj as THREE.Mesh).isMesh) {
          const mesh = obj as THREE.Mesh;
          mesh.geometry?.dispose();
          const mats = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
          mats.forEach((m) => {
            if (!m) return;
            Object.values(m).forEach((val) => {
              if ((val as THREE.Texture)?.isTexture) {
                (val as THREE.Texture).dispose();
              }
            });
            m.dispose();
          });
        }
      });
    }
    this.cache.clear();

    this.envRT.dispose();
    this.pmremGenerator.dispose();
    this.renderer.dispose();
    this.renderer.domElement.remove();
  }
}
