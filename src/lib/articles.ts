import { Book } from './books';

export interface ArticleHeaderData {
  kickerLeft: string;
  kickerRight: string;
  headline: string;
  intro: string;
  framesValue: string;
  readingValue: string;
}

export interface SampleArticleContent {
  section1Tag: string;
  section1Title: string;
  section1Paragraphs: [string, string];
  quote: string;
  quoteSource: string;
  section2Tag: string;
  section2Title: string;
  section2Paragraph: string;
  specimenTag: string;
  specimenLabel: string;
  specimenHighlights: Array<{ label: string; detail: string }>;
}

export type BookArticleSpecimenKind =
  | 'grid-monograph'
  | 'loud-crop'
  | 'marks-scale'
  | 'identity-material'
  | 'matter-legibility'
  | 'weather-climate'
  | 'small-edit'
  | 'quiet-rhythm'
  | 'colour-triad'
  | 'motion-curve'
  | 'honest-measure'
  | 'signal-focus';

export interface BookArticleTheme {
  isDark: boolean;
  bg: string;
  bgRgb: string;
  surface: string;
  cardBg: string;
  ink: string;
  inkSoft: string;
  muted: string;
  line: string;
  lineStrong: string;
  accent: string;
  accentInk: string;
  patternBg: string;
  patternSize: string;
  patternOpacity: number;
  displayFont: string;
  bodyFont: string;
  monoFont: string;
  headlineUppercase?: boolean;
  headlineItalic?: boolean;
  headlineTracking?: string;
  maxWidthClass: string;
  useDropCap?: boolean;
  specimenKind: BookArticleSpecimenKind;
}

const BOOK_THEMES_BY_TITLE: Record<string, BookArticleTheme> = {
  GRID: {
    isDark: false,
    bg: '#fbf8f1',
    bgRgb: '251, 248, 241',
    surface: 'rgba(244, 241, 234, 0.9)',
    cardBg: '#fbf8f1',
    ink: '#141414',
    inkSoft: 'rgba(20, 20, 20, 0.85)',
    muted: '#86827a',
    line: 'rgba(20, 20, 20, 0.12)',
    lineStrong: 'rgba(20, 20, 20, 0.22)',
    accent: '#141414',
    accentInk: '#f4f1ea',
    patternBg:
      'linear-gradient(to right, rgba(20,20,20,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(20,20,20,0.06) 1px, transparent 1px)',
    patternSize: '48px 48px',
    patternOpacity: 0.28,
    displayFont: "'Inter Tight', sans-serif",
    bodyFont: "'Inter', sans-serif",
    monoFont: "'IBM Plex Mono', monospace",
    headlineTracking: '-0.04em',
    maxWidthClass: 'max-w-[820px]',
    specimenKind: 'grid-monograph',
  },
  LOUD: {
    isDark: false,
    bg: '#f7f1e6',
    bgRgb: '247, 241, 230',
    surface: '#efe6d5',
    cardBg: '#fbf8f2',
    ink: '#161310',
    inkSoft: 'rgba(22, 19, 16, 0.86)',
    muted: '#736556',
    line: 'rgba(22, 19, 16, 0.15)',
    lineStrong: 'rgba(242, 107, 29, 0.48)',
    accent: '#f26b1d',
    accentInk: '#ffffff',
    patternBg:
      'radial-gradient(rgba(242, 107, 29, 0.14) 1px, transparent 1px)',
    patternSize: '18px 18px',
    patternOpacity: 0.4,
    displayFont: "'Oswald', sans-serif",
    bodyFont: "'DM Sans', sans-serif",
    monoFont: "'Space Mono', monospace",
    headlineUppercase: true,
    headlineTracking: '-0.015em',
    maxWidthClass: 'max-w-[840px]',
    specimenKind: 'loud-crop',
  },
  'Rules of Marks': {
    isDark: false,
    bg: '#f5f0e6',
    bgRgb: '245, 240, 230',
    surface: '#ebe4d5',
    cardBg: '#fbf8f1',
    ink: '#141724',
    inkSoft: 'rgba(20, 23, 36, 0.85)',
    muted: '#5f677a',
    line: 'rgba(31, 79, 214, 0.16)',
    lineStrong: 'rgba(31, 79, 214, 0.36)',
    accent: '#1f4fd6',
    accentInk: '#ffffff',
    patternBg:
      'radial-gradient(circle at 1px 1px, rgba(31, 79, 214, 0.13) 1px, transparent 0)',
    patternSize: '28px 28px',
    patternOpacity: 0.45,
    displayFont: "'Bricolage Grotesque', sans-serif",
    bodyFont: "'Plus Jakarta Sans', sans-serif",
    monoFont: "'IBM Plex Mono', monospace",
    headlineTracking: '-0.035em',
    maxWidthClass: 'max-w-[800px]',
    specimenKind: 'marks-scale',
  },
  'Shaping Identity': {
    isDark: true,
    bg: '#152e24',
    bgRgb: '21, 46, 36',
    surface: '#1d3c30',
    cardBg: '#12271e',
    ink: '#efe6d4',
    inkSoft: 'rgba(239, 230, 212, 0.85)',
    muted: '#a4b5ab',
    line: 'rgba(239, 230, 212, 0.14)',
    lineStrong: 'rgba(212, 180, 117, 0.45)',
    accent: '#d4b475',
    accentInk: '#152e24',
    patternBg:
      'linear-gradient(to right, rgba(239,230,212,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(239,230,212,0.04) 1px, transparent 1px)',
    patternSize: '64px 64px',
    patternOpacity: 0.5,
    displayFont: "'Fraunces', serif",
    bodyFont: "'Plus Jakarta Sans', sans-serif",
    monoFont: "'IBM Plex Mono', monospace",
    headlineTracking: '-0.03em',
    maxWidthClass: 'max-w-[780px]',
    useDropCap: true,
    specimenKind: 'identity-material',
  },
  'Make it Matter': {
    isDark: false,
    bg: '#f4f0fa',
    bgRgb: '244, 240, 250',
    surface: '#eae2f5',
    cardBg: '#faf8fd',
    ink: '#181523',
    inkSoft: 'rgba(24, 21, 35, 0.86)',
    muted: '#655c7d',
    line: 'rgba(91, 63, 214, 0.14)',
    lineStrong: 'rgba(91, 63, 214, 0.34)',
    accent: '#5b3fd6',
    accentInk: '#ffffff',
    patternBg:
      'linear-gradient(to bottom, rgba(91,63,214,0.05) 1px, transparent 1px)',
    patternSize: '100% 32px',
    patternOpacity: 0.55,
    displayFont: "'Syne', sans-serif",
    bodyFont: "'DM Sans', sans-serif",
    monoFont: "'IBM Plex Mono', monospace",
    headlineTracking: '-0.035em',
    maxWidthClass: 'max-w-[800px]',
    specimenKind: 'matter-legibility',
  },
  'Type Weather': {
    isDark: false,
    bg: '#edf3fb',
    bgRgb: '237, 243, 251',
    surface: '#e1ebf8',
    cardBg: '#f7fafe',
    ink: '#132a63',
    inkSoft: 'rgba(19, 42, 99, 0.86)',
    muted: '#536c9e',
    line: 'rgba(29, 79, 214, 0.14)',
    lineStrong: 'rgba(29, 79, 214, 0.35)',
    accent: '#1d4fd6',
    accentInk: '#ffffff',
    patternBg:
      'linear-gradient(to bottom, rgba(29,79,214,0.055) 1px, transparent 1px)',
    patternSize: '100% 44px',
    patternOpacity: 0.5,
    displayFont: "'Cormorant Garamond', serif",
    bodyFont: "'Plus Jakarta Sans', sans-serif",
    monoFont: "'IBM Plex Mono', monospace",
    headlineItalic: true,
    headlineTracking: '-0.025em',
    maxWidthClass: 'max-w-[780px]',
    specimenKind: 'weather-climate',
  },
  'Small Ideas, Big Change': {
    isDark: false,
    bg: '#fcf8f1',
    bgRgb: '252, 248, 241',
    surface: '#f5ede0',
    cardBg: '#ffffff',
    ink: '#1a1512',
    inkSoft: 'rgba(26, 21, 18, 0.86)',
    muted: '#7a675c',
    line: 'rgba(240, 73, 31, 0.16)',
    lineStrong: 'rgba(240, 73, 31, 0.42)',
    accent: '#f0491f',
    accentInk: '#ffffff',
    patternBg:
      'radial-gradient(rgba(240, 73, 31, 0.08) 1px, transparent 1px)',
    patternSize: '24px 24px',
    patternOpacity: 0.35,
    displayFont: "'Playfair Display', serif",
    bodyFont: "'Lora', serif",
    monoFont: "'Space Mono', monospace",
    headlineTracking: '-0.025em',
    maxWidthClass: 'max-w-[680px]',
    useDropCap: true,
    specimenKind: 'small-edit',
  },
  'Quiet Systems': {
    isDark: false,
    bg: '#eeece6',
    bgRgb: '238, 236, 230',
    surface: '#e4e1d9',
    cardBg: '#f6f4ef',
    ink: '#242320',
    inkSoft: 'rgba(36, 35, 32, 0.82)',
    muted: '#72706a',
    line: 'rgba(36, 35, 32, 0.1)',
    lineStrong: 'rgba(36, 35, 32, 0.22)',
    accent: '#4e4c46',
    accentInk: '#f6f4ef',
    patternBg: 'none',
    patternSize: 'auto',
    patternOpacity: 0,
    displayFont: "'Cormorant Garamond', serif",
    bodyFont: "'Lora', serif",
    monoFont: "'IBM Plex Mono', monospace",
    headlineTracking: '-0.02em',
    maxWidthClass: 'max-w-[740px]',
    specimenKind: 'quiet-rhythm',
  },
  'Colour Is a Verb': {
    isDark: false,
    bg: '#fdf6f8',
    bgRgb: '253, 246, 248',
    surface: '#f8e9ef',
    cardBg: '#ffffff',
    ink: '#1a1116',
    inkSoft: 'rgba(26, 17, 22, 0.86)',
    muted: '#7b5968',
    line: 'rgba(217, 38, 120, 0.15)',
    lineStrong: 'rgba(217, 38, 120, 0.42)',
    accent: '#d92678',
    accentInk: '#ffffff',
    patternBg:
      'radial-gradient(circle at 12px 12px, rgba(217, 38, 120, 0.08) 1.2px, transparent 1.2px)',
    patternSize: '32px 32px',
    patternOpacity: 0.45,
    displayFont: "'Bodoni Moda', serif",
    bodyFont: "'DM Sans', sans-serif",
    monoFont: "'Space Mono', monospace",
    headlineTracking: '-0.03em',
    maxWidthClass: 'max-w-[800px]',
    specimenKind: 'colour-triad',
  },
  'Letters in Motion': {
    isDark: true,
    bg: '#111113',
    bgRgb: '17, 17, 19',
    surface: '#1a1a1f',
    cardBg: '#141418',
    ink: '#f3f1eb',
    inkSoft: 'rgba(243, 241, 235, 0.84)',
    muted: '#9e9da8',
    line: 'rgba(243, 241, 235, 0.13)',
    lineStrong: 'rgba(215, 255, 58, 0.48)',
    accent: '#d7ff3a',
    accentInk: '#111113',
    patternBg:
      'radial-gradient(rgba(215, 255, 58, 0.14) 1px, transparent 1px)',
    patternSize: '26px 26px',
    patternOpacity: 0.35,
    displayFont: "'Syne', sans-serif",
    bodyFont: "'DM Sans', sans-serif",
    monoFont: "'Space Mono', monospace",
    headlineUppercase: true,
    headlineTracking: '-0.03em',
    maxWidthClass: 'max-w-[820px]',
    specimenKind: 'motion-curve',
  },
  'The Honest Page': {
    isDark: false,
    bg: '#f7f2e7',
    bgRgb: '247, 242, 231',
    surface: '#efe8d8',
    cardBg: '#fbf8f1',
    ink: '#1f1b18',
    inkSoft: 'rgba(31, 27, 24, 0.87)',
    muted: '#6f655c',
    line: 'rgba(31, 27, 24, 0.14)',
    lineStrong: 'rgba(181, 36, 28, 0.42)',
    accent: '#b5241c',
    accentInk: '#ffffff',
    patternBg:
      'linear-gradient(to bottom, rgba(31,27,24,0.03) 1px, transparent 1px)',
    patternSize: '100% 36px',
    patternOpacity: 0.45,
    displayFont: "'Fraunces', serif",
    bodyFont: "'Source Serif 4', serif",
    monoFont: "'IBM Plex Mono', monospace",
    headlineTracking: '-0.03em',
    maxWidthClass: 'max-w-[740px]',
    useDropCap: true,
    specimenKind: 'honest-measure',
  },
  'Signal & Noise': {
    isDark: false,
    bg: '#f7f4eb',
    bgRgb: '247, 244, 235',
    surface: '#ede8d6',
    cardBg: '#fcfaf3',
    ink: '#111111',
    inkSoft: 'rgba(17, 17, 17, 0.86)',
    muted: '#615f57',
    line: 'rgba(17, 17, 17, 0.16)',
    lineStrong: 'rgba(17, 17, 17, 0.42)',
    accent: '#e6c800',
    accentInk: '#111111',
    patternBg:
      'linear-gradient(to right, rgba(17,17,17,0.04) 1px, transparent 1px)',
    patternSize: '72px 100%',
    patternOpacity: 0.45,
    displayFont: "'Bricolage Grotesque', sans-serif",
    bodyFont: "'Plus Jakarta Sans', sans-serif",
    monoFont: "'IBM Plex Mono', monospace",
    headlineTracking: '-0.04em',
    maxWidthClass: 'max-w-[820px]',
    specimenKind: 'signal-focus',
  },
};

export function getBookArticleTheme(book: Book): BookArticleTheme {
  return BOOK_THEMES_BY_TITLE[book.title] ?? BOOK_THEMES_BY_TITLE.GRID;
}

const SAMPLE_BY_TITLE: Record<string, SampleArticleContent> = {
  LOUD: {
    section1Tag: 'EXCERPT 01 · SCALE',
    section1Title: 'Type That Occupies the Room Before You Read It',
    section1Paragraphs: [
      'A poster has two seconds across a crowded street. Marco Teller argues that legibility at distance comes not from adding noise, but from pushing one typographic gesture until the surrounding margin feels electric.',
      'By cropping letters right at the trim edge, negative space stops acting as a frame and becomes part of the letterform itself—turning every sheet into an architectural billboard.',
    ],
    quote:
      '“Whispering rarely earns attention on a wall. Choose one idea, scale it past comfort, and cut everything else away.”',
    quoteSource: '— Marco Teller, LOUD (Chapter 01: Street Scale)',
    section2Tag: 'EXCERPT 02 · CONTRAST',
    section2Title: 'The Discipline of Heavy Ink and Hard Crops',
    section2Paragraph:
      'In this short studio sample, Teller pairs fluorescent warm orange ink against tight condensed grotesks—demonstrating how bold contrast stays controlled when anchored to an exact bleed grid.',
    specimenTag: 'SPECIMEN NOTE · POSTER RATIO 5:7',
    specimenLabel: 'Full-Bleed Crop Study',
    specimenHighlights: [
      { label: '01 · Display Mass', detail: '82% ink coverage on primary fold' },
      { label: '02 · Edge Bleed', detail: 'Letters clipped cleanly at 4mm trim' },
      { label: '03 · Rest Zone', detail: 'Single hairline caption block at foot' },
    ],
  },
  'Rules of Marks': {
    section1Tag: 'EXCERPT 01 · REDUCTION',
    section1Title: 'How a Single Circle Learns to Carry a Name',
    section1Paragraphs: [
      'A durable symbol survives fax machines, 16-pixel favicons, and carved stone signs alike. Juno Okafor traces how everyday geometric primitives acquire unmistakable character through subtle optical tension.',
      'Instead of illustrating every product a company makes, a strong mark chooses one unforgettable silhouette and lets repetition build meaning over years.',
    ],
    quote:
      '“Complexity begs for explanation. A quiet mark simply stays in memory after a single glance.”',
    quoteSource: '— Juno Okafor, Rules of Marks (Chapter 02: Primitive Geometry)',
    section2Tag: 'EXCERPT 02 · BALANCE',
    section2Title: 'Optical Corrections Behind Mechanical Circles',
    section2Paragraph:
      'Perfect mathematics often looks slightly pinched to the human eye. This sample chapter shows how micro-adjustments in stroke weight and aperture open up breathing room inside compact emblems.',
    specimenTag: 'SPECIMEN NOTE · GRID REDUCTION',
    specimenLabel: 'Optical Scale Check',
    specimenHighlights: [
      { label: '16 px', detail: 'Favicon silhouette remains distinct' },
      { label: '48 px', detail: 'App icon counter-forms stay open' },
      { label: '320 px', detail: 'Exhibition print reveals crisp radii' },
    ],
  },
  'Shaping Identity': {
    section1Tag: 'EXCERPT 01 · PLACE',
    section1Title: 'Identity Systems as Spaces People Inhabit',
    section1Paragraphs: [
      'Elena Marsh approaches brand identity less like a style guide and more like civic architecture. Voice, motion, packaging, and digital surfaces should feel like rooms inside the same building.',
      'Drawing from twelve studio case files, this opening excerpt tracks how shared material rules give teams freedom to improvise without breaking cohesion.',
    ],
    quote:
      '“People do not memorize guidelines; they remember how an environment made them feel.”',
    quoteSource: '— Elena Marsh, Shaping Identity (Introduction)',
    section2Tag: 'EXCERPT 02 · COHESION',
    section2Title: 'One Palette, Twelve Distinct Surfaces',
    section2Paragraph:
      'Rather than forcing every touchpoint into an identical template, Marsh assigns clear roles to color, paper grain, and typographic pace so each medium expresses the same temperament naturally.',
    specimenTag: 'SPECIMEN NOTE · CASE MATRIX',
    specimenLabel: 'Cross-Medium Behaviour',
    specimenHighlights: [
      { label: 'Print', detail: 'Uncoated stock & forest-green ink' },
      { label: 'Web', detail: 'Measured editorial rhythm & crisp tabs' },
      { label: 'Space', detail: 'Quiet directional signage on brass' },
    ],
  },
  'Make it Matter': {
    section1Tag: 'EXCERPT 01 · UTILITY',
    section1Title: 'Typography Doing Honest Work in Public',
    section1Paragraphs: [
      'Before typography becomes ornament, it helps someone catch a train, read a medicine label, or recognize a neighborhood storefront. Theo Brandt celebrates letters shaped by real constraints.',
      'Across short field dispatches, this sample reminds designers that clarity is never boring when every weight and spacing choice respects the reader’s urgency.',
    ],
    quote:
      '“Legibility is an act of kindness—it respects the reader’s time before asking for their admiration.”',
    quoteSource: '— Theo Brandt, Make it Matter (Essay 01)',
    section2Tag: 'EXCERPT 02 · SIGNAGE',
    section2Title: 'High Contrast in Low Light',
    section2Paragraph:
      'Wayfinding typefaces succeed when counters remain generous and letterforms refuse to blur together under rain, glare, or motion.',
    specimenTag: 'SPECIMEN NOTE · PUBLIC LEGIBILITY',
    specimenLabel: 'Field Reading Checklist',
    specimenHighlights: [
      { label: 'Open Counters', detail: 'Prevents halation on lit screens' },
      { label: 'Distinct Terminals', detail: 'Separates similar numerals fast' },
      { label: 'Clear Hierarchy', detail: 'Primary route above secondary note' },
    ],
  },
  'Type Weather': {
    section1Tag: 'EXCERPT 01 · CLIMATE',
    section1Title: 'Why Some Letterforms Feel Crisp Like Winter Air',
    section1Paragraphs: [
      'Every typeface carries an emotional barometric pressure. Sharp geometric serifs feel cool and architectural; soft ink-trapped grotesque cuts radiate warmth and human speed.',
      'Ada Kowal organizes 400 typefaces not by historical era, but by atmospheric mood—giving designers an intuitive compass when pairing voices on a page.',
    ],
    quote:
      '“Choose a typeface the way you dress for a season: match the weight to the climate of the message.”',
    quoteSource: '— Ada Kowal, Type Weather (Atlas Notes)',
    section2Tag: 'EXCERPT 02 · PAIRING',
    section2Title: 'Balancing Warm Text With Cool Headings',
    section2Paragraph:
      'Contrast in temperature makes spreads breathe. Pairing a razor-crisp cobalt display cut with an approachable humanist body face keeps long-form essays lively.',
    specimenTag: 'SPECIMEN NOTE · CLIMATE INDEX',
    specimenLabel: 'Mood & Weight Pairing',
    specimenHighlights: [
      { label: 'Cold / Crisp', detail: 'Tight tracking, sharp hairlines' },
      { label: 'Temperate', detail: 'Balanced x-height for long reading' },
      { label: 'Warm / Loose', detail: 'Rounded terminals, open rhythm' },
    ],
  },
  'Small Ideas, Big Change': {
    section1Tag: 'EXCERPT 01 · BREVITY',
    section1Title: 'One Honest Idea Per Page, Nothing Extra',
    section1Paragraphs: [
      'Thick books often hide one sharp insight beneath three hundred pages of padding. Rui Sato’s pocket manifesto restricts every spread to a single observation tested in real studio practice.',
      'Small adjustments—changing a button’s verb, opening margin space, trimming a headline in half—compound faster than sweeping redesigns.',
    ],
    quote:
      '“Most breakthroughs do not arrive as monuments; they start as a small fix repeated with care.”',
    quoteSource: '— Rui Sato, Small Ideas, Big Change (Page 14)',
    section2Tag: 'EXCERPT 02 · PRACTICE',
    section2Title: 'Editing Until Only the Verb Remains',
    section2Paragraph:
      'Before adding a new component or rule, ask what single element can be removed while making the work clearer.',
    specimenTag: 'SPECIMEN NOTE · POCKET EDITION',
    specimenLabel: 'Three Daily Studio Habits',
    specimenHighlights: [
      { label: 'Cut 20%', detail: 'Trim filler words from every screen' },
      { label: 'Test at 1x', detail: 'Inspect real size before polishing' },
      { label: 'Ship Small', detail: 'Iterate in public, keep momentum' },
    ],
  },
  'Quiet Systems': {
    section1Tag: 'EXCERPT 01 · RESTRAINT',
    section1Title: 'Designing Interfaces That Lower Your Heart Rate',
    section1Paragraphs: [
      'Digital tools often compete for attention with badges, shadows, and restless motion. Noor Haddad demonstrates how disciplined spacing and muted neutral surfaces create focus.',
      'When hierarchy is carried by scale and whitespace alone, users navigate effortlessly without feeling nudged.',
    ],
    quote:
      '“Silence on the page is not empty space; it is the margin that lets important choices breathe.”',
    quoteSource: '— Noor Haddad, Quiet Systems (Chapter 01)',
    section2Tag: 'EXCERPT 02 · RHYTHM',
    section2Title: 'Neutral Paper and Patient Motion',
    section2Paragraph:
      'Calmness is a structural property: consistent spacing tokens, gentle easing curves, and restraint in ornament keep interfaces timeless.',
    specimenTag: 'SPECIMEN NOTE · TONAL CADENCE',
    specimenLabel: 'Low-Noise Token Scale',
    specimenHighlights: [
      { label: 'Paper Base', detail: '#F4F1EA warm neutral reduces glare' },
      { label: 'Ink Hairline', detail: '10% opacity dividers over heavy cards' },
      { label: 'Motion', detail: 'Decelerated settles, zero abrupt snaps' },
    ],
  },
  'Colour Is a Verb': {
    section1Tag: 'EXCERPT 01 · ENERGY',
    section1Title: 'Colour as Action, Never Just Decoration',
    section1Paragraphs: [
      'Colour changes posture before a single sentence is decoded. Lena Fosse treats pigments as verbs—magenta accelerates a headline, butter yellow highlights an entrance, deep charcoal grounds the eye.',
      'This short excerpt explores how unexpected pairings alter perceived speed and emotional temperature.',
    ],
    quote:
      '“Ask what you want the colour to do to the room—quiet it, warm it, or wake it up.”',
    quoteSource: '— Lena Fosse, Colour Is a Verb (Palette 04)',
    section2Tag: 'EXCERPT 02 · PROPORTION',
    section2Title: 'The 80 / 15 / 5 Pigment Rule',
    section2Paragraph:
      'Even saturated colours stay refined when balanced against generous neutral surfaces—let 80% stay quiet paper so 5% accent lands like a spotlight.',
    specimenTag: 'SPECIMEN NOTE · PIGMENT RATIO',
    specimenLabel: 'Balanced Contrast Triad',
    specimenHighlights: [
      { label: '80% Ground', detail: 'Warm cream paper carries reading comfort' },
      { label: '15% Ink', detail: 'Charcoal anchors typography cleanly' },
      { label: '5% Accent', detail: 'Vivid rose & yellow direct the glance' },
    ],
  },
  'Letters in Motion': {
    section1Tag: 'EXCERPT 01 · TIMING',
    section1Title: 'Easing Curves as Choreographed Breathing',
    section1Paragraphs: [
      'Motion is typography stretched across time. Kai Mendez breaks kinetic type down into anticipation, travel, and settle—showing why easing matters far more than duration.',
      'Letters that arrive cleanly on an editorial curve feel tactile like turned paper rather than restless screen effects.',
    ],
    quote:
      '“Fast transitions can still feel rushed; patient curves make even half a second feel composed.”',
    quoteSource: '— Kai Mendez, Letters in Motion (Chapter 02: Timing)',
    section2Tag: 'EXCERPT 02 · CLARITY',
    section2Title: 'Moving Words Without Losing Meaning',
    section2Paragraph:
      'Animate alignment and opacity together so the reader’s eye tracks the phrase effortlessly from rest to full focus.',
    specimenTag: 'SPECIMEN NOTE · MOTION CURVE',
    specimenLabel: 'Editorial Spring Profile',
    specimenHighlights: [
      { label: 'Attack', detail: 'Swift launch cues immediate response' },
      { label: 'Glide', detail: 'Long tail preserves spatial continuity' },
      { label: 'Settle', detail: 'Zero jitter once text reaches rest' },
    ],
  },
  'The Honest Page': {
    section1Tag: 'EXCERPT 01 · MEASURE',
    section1Title: 'Hierarchy Without Tricks, Respect for the Eye',
    section1Paragraphs: [
      'Clara Weiss returns to the classic craft of editorial measure: sixty-five characters per line, generous leading, and clear subheadings that guide long reading.',
      'Good layout disappears while you read, leaving only an effortless flow of ideas from paragraph to paragraph.',
    ],
    quote:
      '“When typography stops trying to look clever, the writer’s voice finally enters the room.”',
    quoteSource: '— Clara Weiss, The Honest Page (Chapter 01)',
    section2Tag: 'EXCERPT 02 · CADENCE',
    section2Title: 'Paragraph Spacing as Editorial Pauses',
    section2Paragraph:
      'Notice how clean vertical rhythm lets dense essays breathe without heavy boxes or decorative flourishes.',
    specimenTag: 'SPECIMEN NOTE · TYPE MEASURE',
    specimenLabel: 'Long-Form Proportions',
    specimenHighlights: [
      { label: '60–68 ch', detail: 'Ideal column width for sustained reading' },
      { label: '1.65× Lead', detail: 'Generous line height prevents fatigue' },
      { label: '2 : 1', detail: 'Headlines cleanly anchor body text' },
    ],
  },
  'Signal & Noise': {
    section1Tag: 'EXCERPT 01 · CLARITY',
    section1Title: 'Cutting Through Crowded Feeds Without Shouting',
    section1Paragraphs: [
      'When every brand raises its volume, loudness cancels itself out. Omar Reyes examines how unmistakable structure, sharp editorial voice, and visual restraint create instant recognition.',
      'Signal is not about minimalism for its own sake—it is about ensuring nothing competes with your central message.',
    ],
    quote:
      '“Distinctiveness comes from having a clear point of view—never from turning every dial to ten.”',
    quoteSource: '— Omar Reyes, Signal & Noise (Chapter 03)',
    section2Tag: 'EXCERPT 02 · FOCUS',
    section2Title: 'One Primary Focal Anchor Per Screen',
    section2Paragraph:
      'By removing secondary badges and redundant banners, the primary statement lands cleanly in the first second.',
    specimenTag: 'SPECIMEN NOTE · SIGNAL RATIO',
    specimenLabel: 'Focus Allocation Guide',
    specimenHighlights: [
      { label: 'Primary Hook', detail: 'Single headline dominates upper fold' },
      { label: 'Proof Note', detail: 'Compact metadata builds trust quickly' },
      { label: 'Action', detail: 'One clear next step without clutter' },
    ],
  },
};

export function getBookArticleHeaderData(book: Book): ArticleHeaderData {
  if (book.title === 'GRID') {
    return {
      kickerLeft: 'SYSTEMS · MONOGRAPH · EXCERPT II',
      kickerRight: '60 RECONSTRUCTED LAYOUTS · PP. 02–18',
      headline: 'GRID — The Architecture of Quiet Order',
      intro: `${book.note} Below is the expanded studio essay and four structural frames rebuilt from archival railway timetables, exhibition walls, and contemporary editorial spreads.`,
      framesValue: '04 Structural Plates',
      readingValue: '06 Min Essay',
    };
  }

  return {
    kickerLeft: `${book.category.toUpperCase()} · STUDIO EDITION · EXCERPT`,
    kickerRight: `${book.pages} PAGES · SAMPLE PP. 02–05`,
    headline: book.title,
    intro: `${book.note} Below is a short studio excerpt introducing the core perspective and visual rhythm from ${book.author}’s edition.`,
    framesValue: '02 Sample Notes',
    readingValue: '02 Min Read',
  };
}

export function getBookSampleSections(book: Book): SampleArticleContent {
  return (
    SAMPLE_BY_TITLE[book.title] ?? {
      section1Tag: 'EXCERPT 01 · OVERVIEW',
      section1Title: `Inside ${book.title}`,
      section1Paragraphs: [
        book.note,
        `${book.author} distills years of studio practice into concise principles designed to hold clarity across print and screen.`,
      ],
      quote: `“Clarity is built through deliberate proportion and patient editing.”`,
      quoteSource: `— ${book.author}, ${book.title} (${book.year})`,
      section2Tag: 'EXCERPT 02 · STUDIO NOTE',
      section2Title: 'Notes on Composition & Cadence',
      section2Paragraph:
        'A balanced reading measure and clear contrast hierarchy keep ideas approachable at every viewport scale.',
      specimenTag: 'SPECIMEN NOTE · SAMPLE EDITION',
      specimenLabel: 'Key Takeaways',
      specimenHighlights: [
        { label: 'Structure', detail: 'Clear grid and deliberate spacing' },
        { label: 'Voice', detail: 'Direct language free of filler' },
        { label: 'Edition', detail: `Hardcover · ${book.year}` },
      ],
    }
  );
}
