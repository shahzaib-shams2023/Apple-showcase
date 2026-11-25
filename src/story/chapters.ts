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
    title: 'Arrival in Shadow',
    subtitle: 'Calibrated 1:1 Scale',
    kicker: 'I / ARRIVAL',
    description:
      'Calibrated at exact millimeter proportion (79.0 × 163.4 × 13.5 mm), the iPhone 18 Pro Max Burgundy emerges from the optical darkroom—anodized aluminum meeting satin glass.',
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
    title: 'Four Monoliths',
    subtitle: 'Surface & Footprint',
    kicker: 'IV / PROPORTIONS & FINISHES',
    description:
      'Compare how Burgundy, Brushed Silver, Obsidian Black, and the narrower 72.8 mm 18 Pro chassis transform light across identical 43-part geometry. Drag directly on the specimen to inspect any angle.',
    meta: 'Select a specimen · Drag specimen horizontally to turn',
  },
  {
    id: 'metamorphosis',
    roman: 'V',
    index: '05',
    title: 'Hinge Metamorphosis',
    subtitle: 'Duo Fold Star White',
    kicker: 'V / METAMORPHOSIS',
    description:
      'The rigid slab yields to an articulated dual-wing chassis. Scroll through this chamber to drive the 6-channel skeletal hinge (Armature_50) from 180° pocket form to 0° open canvas.',
    meta: '166.0 × 118.2 × 11.3 mm open · 49 meshes',
  },
  {
    id: 'resolution',
    roman: 'VI',
    index: '06',
    title: 'Resolved Form',
    subtitle: 'Specimen Archive',
    kicker: 'VI / RESOLUTION',
    description:
      'Five verified 2026 GLB assemblies united in one continuous spatial study—authored without decorative ornament or invented specifications.',
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
