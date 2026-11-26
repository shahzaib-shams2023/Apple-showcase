export type ChapterId =
  | 'arrival'
  | 'anatomy'
  | 'deconstruction'
  | 'finishes'
  | 'metamorphosis'
  | 'resolution';

export interface StoryChapter {
  id: ChapterId;
  roman: string;
  index: string;
  title: string;
  subtitle: string;
  kicker: string;
  description: string;
  meta: string;
}

export const STORY_CHAPTERS: StoryChapter[] = [
  {
    id: 'arrival',
    roman: 'I',
    index: '01',
    title: 'iPhone 18 Pro Max',
    subtitle: 'Calibrated 1:1 Scale',
    kicker: 'I / iPHONE 18 PRO MAX',
    description:
      'Calibrated at exact millimeter proportion (79.0 × 163.4 × 13.5 mm), the Apple iPhone 18 Pro Max Burgundy emerges from the darkroom—anodized aluminum meeting satin glass.',
    meta: 'Scroll to direct the collimated light & camera',
  },
  {
    id: 'anatomy',
    roman: 'II',
    index: '02',
    title: 'Edge, Copper & Optics',
    subtitle: 'Continuous Surface Sweep',
    kicker: 'II / ANATOMY',
    description:
      'As you scroll, a grazing light beam traces the chamfered perimeter rail, drops down to the copper USB-C contact array, and arcs behind to reveal three recessed sapphire-style lens chambers.',
    meta: '43 machined & optical meshes · Continuous camera arc',
  },
  {
    id: 'deconstruction',
    roman: 'III',
    index: '03',
    title: 'Forty-Three Strata',
    subtitle: 'Scroll-Driven Dissection',
    kicker: 'III / DECONSTRUCTION',
    description:
      'Continue scrolling to part the enclosure along its optical Z-axis. Each stratum isolates in sequence—from the emissive OLED front stack to the triple-lens plateau.',
    meta: 'Pinned dissection · Reverse scroll reassembles',
  },
  {
    id: 'finishes',
    roman: 'IV',
    index: '04',
    title: 'iPhone 18 Lineup',
    subtitle: 'Finishes & Footprints',
    kicker: 'IV / iPHONE 18 & 18 PRO',
    description:
      'Compare how iPhone 18 Pro Max (Burgundy, Brushed Silver, Obsidian Black) and the narrower 72.8 mm iPhone 18 Pro chassis transform light across identical 43-part geometry. Drag directly on the device to inspect any angle.',
    meta: 'Select a specimen · Drag specimen horizontally to turn',
  },
  {
    id: 'metamorphosis',
    roman: 'V',
    index: '05',
    title: 'iPhone Duo Fold',
    subtitle: '180° Articulated Hinge',
    kicker: 'V / iPHONE DUO FOLD',
    description:
      'The rigid slab yields to Apple’s articulated dual-wing chassis. Scroll through this chamber to drive the 6-channel skeletal hinge (Armature_50) of the iPhone Duo Fold Star White from 180° pocket form to 0° open canvas.',
    meta: '166.0 × 118.2 × 11.3 mm open · 49 meshes',
  },
  {
    id: 'resolution',
    roman: 'VI',
    index: '06',
    title: '2026 iPhone Archive',
    subtitle: 'Complete Lineup',
    kicker: 'VI / COMPLETE LINEUP',
    description:
      'Five verified 2026 Apple iPhone 18, iPhone 18 Pro, iPhone 18 Pro Max, and iPhone Duo Fold assemblies united in one continuous spatial study.',
    meta: 'Select any specimen below to inspect or replay from the threshold',
  },
];

export interface AnatomyBeat {
  id: string;
  kicker: string;
  title: string;
  body: string;
  partLabel: string;
}

export const ANATOMY_BEATS: AnatomyBeat[] = [
  {
    id: 'rail',
    kicker: '02.A / PERIMETER RAIL',
    title: 'Anodized Edge & Tactile Seam',
    body: 'Grazing rim light catches the satin aluminum perimeter, glossy chamfer accents, and the recessed Side_Button_36 assembly.',
    partLabel: 'Side_Panel_32 · Side_Button_36 · Antenna_2',
  },
  {
    id: 'base',
    kicker: '02.B / ACOUSTIC & POWER BASE',
    title: 'Copper Pins & Anisotropic Screws',
    body: 'Tilting beneath the chassis exposes the recessed USB-C collar, warm copper pin contacts, and precision speaker perforations.',
    partLabel: 'USB_Pin_21 · Screws_Aniso_01_16 · Side_Panel_Speakers_18',
  },
  {
    id: 'optics',
    kicker: '02.C / TRIPLE-LENS PLATEAU',
    title: 'Recessed Optical Chambers',
    body: 'Arcing behind the translucent rear glass reveals three distinct camera barrels, dark chrome rings, IR window, and multi-layer flash diffuser.',
    partLabel: 'Back_Cam_Lens_7 · Back_IR_Glass_27 · Back_Flash_Glass_9',
  },
];
