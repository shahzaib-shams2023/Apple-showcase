export type ModelId =
  | '18-pro-max-burgundy'
  | '18-pro-max-silver'
  | '18-pro-max-black'
  | '18-pro-black'
  | 'duo-fold-star-white';

export type LightingRigId = 'darkroom' | 'gallery' | 'clinical' | 'daylight';

export type ExplodeStratumId =
  | 'all'
  | 'display'
  | 'chassis'
  | 'rear-glass'
  | 'optics';

export interface SpecimenModelSpec {
  id: ModelId;
  name: string;
  shortName: string;
  series: '18 Pro Max' | '18 Pro' | 'Duo Fold';
  finish: string;
  swatchHex: string;
  accentHex: string;
  chamberBgHex: string;
  rigId: LightingRigId;
  fileUrl: string;
  fileSizeMb: string;
  dimensionsMm: string;
  meshCount: number;
  triangleCount: string;
  hasFoldAnimation: boolean;
  notes: string;
}

export const SPECIMEN_MODELS: SpecimenModelSpec[] = [
  {
    id: '18-pro-max-burgundy',
    name: 'iPhone 18 Pro Max',
    shortName: '18 Pro Max · Burgundy',
    series: '18 Pro Max',
    finish: 'Deep Burgundy',
    swatchHex: '#5c1f28',
    accentHex: '#c85a6a',
    chamberBgHex: '#0d090b',
    rigId: 'darkroom',
    fileUrl: '/models/apple_iphone_18_pro_max_burgundy_2026.glb',
    fileSizeMb: '3.76 MB',
    dimensionsMm: '79.0 × 163.4 × 13.5 mm',
    meshCount: 43,
    triangleCount: '64,826',
    hasFoldAnimation: false,
    notes:
      'Anodized cherry-burgundy aluminum rails paired with a satin translucent back panel and clearcoat optical plateau.',
  },
  {
    id: '18-pro-max-silver',
    name: 'iPhone 18 Pro Max',
    shortName: '18 Pro Max · Silver',
    series: '18 Pro Max',
    finish: 'Brushed Silver',
    swatchHex: '#c8c6c0',
    accentHex: '#dedbd2',
    chamberBgHex: '#0b0c0e',
    rigId: 'gallery',
    fileUrl: '/models/apple_iphone_18_pro_max_silver_2026.glb',
    fileSizeMb: '3.70 MB',
    dimensionsMm: '79.0 × 163.4 × 13.5 mm',
    meshCount: 43,
    triangleCount: '64,826',
    hasFoldAnimation: false,
    notes:
      'High-reflectance raw metallic perimeter frame with anisotropic screws and light-toned back glass.',
  },
  {
    id: '18-pro-max-black',
    name: 'iPhone 18 Pro Max',
    shortName: '18 Pro Max · Obsidian',
    series: '18 Pro Max',
    finish: 'Obsidian Black',
    swatchHex: '#1b1c1f',
    accentHex: '#9aa0aa',
    chamberBgHex: '#090a0d',
    rigId: 'clinical',
    fileUrl: '/models/apple_iphone_18_pro_max_black_2026.glb',
    fileSizeMb: '3.72 MB',
    dimensionsMm: '79.0 × 163.4 × 13.5 mm',
    meshCount: 43,
    triangleCount: '64,826',
    hasFoldAnimation: false,
    notes:
      'Low-albedo obsidian chassis contrasting satin side rails against glossy chamfers and dark chrome lens rings.',
  },
  {
    id: '18-pro-black',
    name: 'iPhone 18 Pro',
    shortName: '18 Pro · Obsidian',
    series: '18 Pro',
    finish: 'Obsidian Black (Compact)',
    swatchHex: '#151619',
    accentHex: '#8d939d',
    chamberBgHex: '#08090b',
    rigId: 'clinical',
    fileUrl: '/models/apple_iphone_18_pro_black_2026.glb',
    fileSizeMb: '3.95 MB',
    dimensionsMm: '72.8 × 150.0 × 13.5 mm',
    meshCount: 43,
    triangleCount: '70,259',
    hasFoldAnimation: false,
    notes:
      'Compact 72.8 × 150.0 mm footprint preserving the full 43-part optical plateau and USB-C acoustic architecture.',
  },
  {
    id: 'duo-fold-star-white',
    name: 'iPhone Duo Fold',
    shortName: 'Duo Fold · Star White',
    series: 'Duo Fold',
    finish: 'Star White',
    swatchHex: '#e3ded3',
    accentHex: '#dfd7c5',
    chamberBgHex: '#0f0e0c',
    rigId: 'daylight',
    fileUrl: '/models/apple_iphone_duo_fold_star_white_2026_animated.glb',
    fileSizeMb: '5.41 MB',
    dimensionsMm: '166.0 × 118.2 × 11.3 mm (open)',
    meshCount: 49,
    triangleCount: '102,018',
    hasFoldAnimation: true,
    notes:
      'Articulated dual-wing architecture driven by a 6-channel skeletal hinge (Armature_50) from 180° pocket slate to 0° wide canvas.',
  },
];

export const SLAB_MODELS = SPECIMEN_MODELS.filter((m) => !m.hasFoldAnimation);

export const LIGHTING_RIGS: Record<
  LightingRigId,
  {
    keyColor: string;
    keyIntensity: number;
    fillColor: string;
    fillIntensity: number;
    rimColor: string;
    rimIntensity: number;
    envIntensity: number;
  }
> = {
  darkroom: {
    keyColor: '#fff4e8',
    keyIntensity: 2.35,
    fillColor: '#7a8799',
    fillIntensity: 0.72,
    rimColor: '#e47a88',
    rimIntensity: 1.85,
    envIntensity: 1.0,
  },
  gallery: {
    keyColor: '#ffe9d2',
    keyIntensity: 2.6,
    fillColor: '#b9aea0',
    fillIntensity: 1.05,
    rimColor: '#ffdcb8',
    rimIntensity: 1.4,
    envIntensity: 1.25,
  },
  clinical: {
    keyColor: '#f2f6ff',
    keyIntensity: 2.25,
    fillColor: '#9eb2cc',
    fillIntensity: 0.95,
    rimColor: '#d9e7ff',
    rimIntensity: 2.1,
    envIntensity: 1.4,
  },
  daylight: {
    keyColor: '#fff5e6',
    keyIntensity: 2.45,
    fillColor: '#c4bfb4',
    fillIntensity: 1.1,
    rimColor: '#e9dec9',
    rimIntensity: 1.55,
    envIntensity: 1.18,
  },
};

export interface SpatialAnchorTarget {
  id: string;
  meshPrefix: string;
  label: string;
  detail: string;
  chapter: 'anatomy' | 'deconstruction';
  /** Normalized progress range within the chapter [min, max] when this callout appears */
  progressMin: number;
  progressMax: number;
  offsetPx: [number, number];
}

export const SPATIAL_ANCHORS: SpatialAnchorTarget[] = [
  {
    id: 'side-button',
    meshPrefix: 'Side_Button_36',
    label: 'Side_Button_36',
    detail: 'Chamfered tactile rail & antenna seam',
    chapter: 'anatomy',
    progressMin: 0.05,
    progressMax: 0.36,
    offsetPx: [-150, -54],
  },
  {
    id: 'usb-pins',
    meshPrefix: 'USB_Pin_21',
    label: 'USB_Pin_21 · Screws_Aniso',
    detail: 'Copper contact array & acoustic base',
    chapter: 'anatomy',
    progressMin: 0.34,
    progressMax: 0.66,
    offsetPx: [-165, 42],
  },
  {
    id: 'rear-lens',
    meshPrefix: 'Back_Cam_Lens_7',
    label: 'Back_Cam_Lens_7 · IR_27',
    detail: 'Triple recessed optical barrels',
    chapter: 'anatomy',
    progressMin: 0.64,
    progressMax: 0.96,
    offsetPx: [-165, -48],
  },
  {
    id: 'stratum-display',
    meshPrefix: 'Front_Screen_28',
    label: 'L+2 · Front_Screen_28',
    detail: 'Emissive OLED & recessed sensor stack',
    chapter: 'deconstruction',
    progressMin: 0.08,
    progressMax: 0.42,
    offsetPx: [-155, -62],
  },
  {
    id: 'stratum-chassis',
    meshPrefix: 'Side_Panel_32',
    label: 'L0 · Side_Panel_32',
    detail: 'Core machined frame & USB-C bridge',
    chapter: 'deconstruction',
    progressMin: 0.34,
    progressMax: 0.72,
    offsetPx: [-155, 48],
  },
  {
    id: 'stratum-optics',
    meshPrefix: 'Back_Cam_Lens_02_25',
    label: 'L-2 · Triple-Lens Plateau',
    detail: 'Sapphire-style glass, flash & IR window',
    chapter: 'deconstruction',
    progressMin: 0.62,
    progressMax: 0.98,
    offsetPx: [-110, -72],
  },
];

export interface ExplodeStratumInfo {
  id: ExplodeStratumId;
  label: string;
  code: string;
  description: string;
  meshes: string[];
}

export const EXPLODE_STRATA: ExplodeStratumInfo[] = [
  {
    id: 'display',
    label: 'OLED & Front Sensor Stack',
    code: 'L+2',
    description:
      'Emissive OLED plane, dark perimeter glass, recessed front optics, proximity sensor, and upper speaker grille advance along +Z.',
    meshes: [
      'Front_Screen_28',
      'Front_Panel_6',
      'Front_Cam_Lens_0',
      'Front_Cam_Glass_3',
      'Front_Sensor_31',
      'Front_Speaker_5',
    ],
  },
  {
    id: 'chassis',
    label: 'Perimeter Frame & Rear Glass',
    code: 'L0 / L-1',
    description:
      'Satin side rails, glossy chamfers, copper USB-C pins, and anisotropic screws anchor L0 while the translucent anodized back panel separates behind.',
    meshes: [
      'Side_Panel_32',
      'Side_Button_36',
      'USB_Pin_21',
      'Screws_Aniso_01_16',
      'Back_Panel_4',
      'Back_Logo_34',
    ],
  },
  {
    id: 'optics',
    label: 'Triple-Lens Optical Plateau',
    code: 'L-2',
    description:
      'Recessed optical chambers, dark chrome lens collars, sapphire-style cover glass, IR window, and multi-layer flash diffuser resolve at full depth.',
    meshes: [
      'Back_Cam_Base_13',
      'Back_Cam_Lens_7',
      'Back_Cam_Lens_02_25',
      'Back_Cam_Lens_03_26',
      'Back_IR_Glass_27',
      'Back_Flash_Glass_9',
    ],
  },
];

export function classifyStratum(nodeName: string): ExplodeStratumId {
  if (
    nodeName.startsWith('Front_Screen') ||
    nodeName.startsWith('Front_Panel') ||
    nodeName.startsWith('Front_Cam') ||
    nodeName.startsWith('Front_Sensor') ||
    nodeName.startsWith('Front_Speaker')
  ) {
    return 'display';
  }
  if (
    nodeName.startsWith('Back_Panel') ||
    nodeName.startsWith('Back_Logo') ||
    nodeName.startsWith('Holes')
  ) {
    return 'rear-glass';
  }
  if (
    nodeName.startsWith('Back_Cam') ||
    nodeName.startsWith('Back_IR') ||
    nodeName.startsWith('Back_Flash') ||
    nodeName.startsWith('Back_Mic') ||
    nodeName.startsWith('Gradient')
  ) {
    return 'optics';
  }
  return 'chassis';
}

export function resolveStratumZFactor(nodeName: string): number {
  if (
    nodeName.startsWith('Front_Screen') ||
    nodeName.startsWith('Front_Panel') ||
    nodeName.startsWith('Front_Cam') ||
    nodeName.startsWith('Front_Sensor') ||
    nodeName.startsWith('Front_Speaker')
  ) {
    return 0.92;
  }

  if (
    nodeName.startsWith('Back_Panel') ||
    nodeName.startsWith('Back_Logo') ||
    nodeName.startsWith('Holes')
  ) {
    return -0.58;
  }

  if (
    nodeName.startsWith('Back_Cam_Base') ||
    nodeName.startsWith('Back_Cam_Black') ||
    nodeName.startsWith('Back_Mic') ||
    nodeName.startsWith('Back_Flash_Base')
  ) {
    return -0.92;
  }

  if (
    nodeName.startsWith('Back_Cam_') ||
    nodeName.startsWith('Back_IR_') ||
    nodeName.startsWith('Back_Flash_') ||
    nodeName.startsWith('Gradient')
  ) {
    return -1.36;
  }

  return 0;
}
