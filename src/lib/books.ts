export type Category = 'Web' | 'Motion' | 'Editions' | 'Systems';

export interface Book {
  index: number;
  id: string;
  title: string;
  author: string;
  category: Category;
  format: string;
  series: string;
  pages: number;
  year: number;
  score: number;
  coverColor: string;
  spineColor: string;
  endpaperColor: string;
  note: string;
  baseTilt: number;
  seed: number;
  previewUrl?: string;
}

export const CATEGORIES: readonly Category[] = [
  'Web',
  'Motion',
  'Editions',
  'Systems',
] as const;

const RAW_BOOKS: Array<{
  id: string;
  title: string;
  author: string;
  category: Category;
  format: string;
  pages: number;
  year: number;
  score: number;
  coverColor: string;
  spineColor: string;
  endpaperColor: string;
  note: string;
  baseTilt: number;
  previewUrl?: string;
}> = [
  {
    id: '20261121_033327_214ed3f3-b77e-440f-aba1-a8f6bfef39e1',
    title: 'GRID',
    author: 'Ines Vahl',
    category: 'Systems',
    format: 'Design System',
    pages: 248,
    year: 2023,
    score: 4.9,
    coverColor: '#ecebe6',
    spineColor: '#cfccc4',
    endpaperColor: '#1a1a1a',
    note: 'The modular grid explained without dogma: 60 real layouts rebuilt column by column, from timetables to museum walls.',
    baseTilt: -16,
  },
  {
    id: 'burn-briquette-showcase',
    title: 'Burn',
    author: 'The Atelier',
    category: 'Editions',
    format: '3D Landing Web',
    pages: 192,
    year: 2025,
    score: 4.8,
    coverColor: '#f26b1d',
    spineColor: '#c9520f',
    endpaperColor: '#141414',
    note: 'A bold 3D motion landing page crafted for a charcoal briquette export company—built with glowing ember depth, grade specs, and buyer conversion.',
    baseTilt: 12,
    previewUrl: 'https://ademiando.com/charcoal/',
  },
  {
    id: 'digital-art-gallery-3d',
    title: 'Digital Art Gallery',
    author: 'The Atelier',
    category: 'Web',
    format: '3D Spatial Web',
    pages: 212,
    year: 2025,
    score: 4.9,
    coverColor: '#3a6289',
    spineColor: '#1e3a5f',
    endpaperColor: '#f4e6d2',
    note: 'A 3D motion digital art gallery where artists exhibit curated collections in spatial rooms, showcase provenance, and sell works online.',
    baseTilt: -8,
    previewUrl: 'https://ademiando.github.io/galery',
  },
  {
    id: '20261121_033326_c5a053e3-7715-4568-9125-10dbe94553a2',
    title: 'Shaping Identity',
    author: 'Elena Marsh',
    category: 'Web',
    format: 'Brand Casebook',
    pages: 304,
    year: 2022,
    score: 4.9,
    coverColor: '#1f4a3a',
    spineColor: '#163629',
    endpaperColor: '#efe6d4',
    note: 'Identity systems as places people want to belong to — with case files from twelve studios.',
    baseTilt: 15,
  },
  {
    id: '20261121_033326_55f0fe07-e4ee-4593-9f95-048d16d00ff6',
    title: 'Make it Matter',
    author: 'Theo Brandt',
    category: 'Motion',
    format: 'Type Monograph',
    pages: 176,
    year: 2025,
    score: 4.6,
    coverColor: '#c9b8ee',
    spineColor: '#a995d8',
    endpaperColor: '#f7d23e',
    note: 'Short essays on type that does a job: signage, protest, packaging and the kindness of legibility.',
    baseTilt: -13,
  },
  {
    id: '20261121_033326_6b08a110-3b3e-4ec5-bc4b-c74529c150d5',
    title: 'Type Weather',
    author: 'Ada Kowal',
    category: 'Motion',
    format: 'Typeface Atlas',
    pages: 228,
    year: 2024,
    score: 4.8,
    coverColor: '#1d4fd6',
    spineColor: '#153ba3',
    endpaperColor: '#f4f1ea',
    note: 'Why some letters feel cold and others warm. A mood atlas of 400 typefaces, sorted by climate.',
    baseTilt: 9,
  },
  {
    id: '20261121_033327_682c9cb0-53ec-4295-be49-f580b5c227df',
    title: 'Small Ideas, Big Change',
    author: 'Rui Sato',
    category: 'Editions',
    format: 'Pocket Manifesto',
    pages: 160,
    year: 2023,
    score: 4.5,
    coverColor: '#f0491f',
    spineColor: '#c23612',
    endpaperColor: '#141414',
    note: 'One idea per page. A pocket manifesto for designers who want to move people, not pixels.',
    baseTilt: -18,
  },
  {
    id: '20261121_033326_a0acd858-b948-4dfc-ab4e-1c231920b1d3',
    title: 'Quiet Systems',
    author: 'Noor Haddad',
    category: 'Systems',
    format: 'UI Architecture',
    pages: 196,
    year: 2022,
    score: 4.7,
    coverColor: '#b9b7b2',
    spineColor: '#8f8d88',
    endpaperColor: '#141414',
    note: 'Restraint as a method. Whitespace, rhythm and the systems behind calm interfaces and books.',
    baseTilt: 11,
  },
  {
    id: '20261121_033349_28c091d1-780b-4588-a455-5005f6e8cf61',
    title: 'Colour Is a Verb',
    author: 'Lena Fosse',
    category: 'Editions',
    format: 'Palette Index',
    pages: 184,
    year: 2025,
    score: 4.6,
    coverColor: '#ec3d8c',
    spineColor: '#bf2a6c',
    endpaperColor: '#ffe066',
    note: 'Colour as action: 120 palettes that change how a room, a page or a brand behaves.',
    baseTilt: -6,
  },
  {
    id: '20261121_033349_daee32f0-2cba-4282-9a73-3a9867931dba',
    title: 'Letters in Motion',
    author: 'Kai Mendez',
    category: 'Motion',
    format: 'Kinetic Guide',
    pages: 220,
    year: 2025,
    score: 4.8,
    coverColor: '#121212',
    spineColor: '#000000',
    endpaperColor: '#d7ff3a',
    note: 'The kinetic type handbook: timing, easing and how to make words move without losing their meaning.',
    baseTilt: 17,
  },
  {
    id: '20261121_033349_da8b7941-c1f0-47e8-b671-f0e1c4059711',
    title: 'The Honest Page',
    author: 'Clara Weiss',
    category: 'Systems',
    format: 'Layout System',
    pages: 264,
    year: 2021,
    score: 4.9,
    coverColor: '#f4f0e6',
    spineColor: '#d8d2c3',
    endpaperColor: '#d62b20',
    note: 'Editorial layout without tricks — hierarchy, measure and the respect a reader deserves.',
    baseTilt: -12,
  },
  {
    id: '20261121_033348_9e021045-5de0-46f4-bc5d-c9dda64062c3',
    title: 'Signal & Noise',
    author: 'Omar Reyes',
    category: 'Web',
    format: 'Brand Strategy',
    pages: 236,
    year: 2024,
    score: 4.7,
    coverColor: '#f5e72d',
    spineColor: '#d6c61b',
    endpaperColor: '#141414',
    note: 'Branding in a crowded world: how distinct brands cut through without shouting louder.',
    baseTilt: 7,
  },
];

export const BOOKS: Book[] = RAW_BOOKS.map((book, index) => ({
  ...book,
  index,
  series: '001',
  seed: Math.sin(index * 91.7) * 0.5 + 0.5,
}));

export const LOCAL_COVER_ASSETS: Record<string, string> = {
  '20261121_033327_214ed3f3-b77e-440f-aba1-a8f6bfef39e1':
    './assets/aistudio/1795873305827_66ca9b79.jpg',
  'burn-briquette-showcase': './assets/aistudio/IMG-20261128-WA3388_013b4af3.jpg',
  'digital-art-gallery-3d': './assets/aistudio/IMG-20261128-WA3758_79a73070.jpg',
};

export function getBookPngUrl(id: string): string {
  return `https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_${id}.png`;
}

export function getBookCoverUrl(id: string, width: 900 | 300 | 200 | 160 | 120): string {
  if (LOCAL_COVER_ASSETS[id]) {
    return LOCAL_COVER_ASSETS[id];
  }
  const png = getBookPngUrl(id);
  return `https://images.higgs.ai/?default=1&output=webp&url=${encodeURIComponent(png)}&w=${width}&q=85`;
}

export function getBookCoverTrimScale(id: string): number {
  if (id === '20261121_033327_214ed3f3-b77e-440f-aba1-a8f6bfef39e1') return 1.03;
  if (id === 'burn-briquette-showcase') return 1.02;
  if (id === 'digital-art-gallery-3d') return 1.22;
  return 1;
}

export function getBookCoverImageStyle(id: string):
  | {
      position: 'absolute';
      width: string;
      height: string;
      left: string;
      top: string;
      maxWidth: 'none';
    }
  | undefined {
  const scale = getBookCoverTrimScale(id);
  if (scale <= 1) return undefined;
  const size = `${(scale * 100).toFixed(2)}%`;
  const offset = `${(-((scale - 1) * 50)).toFixed(2)}%`;
  return {
    position: 'absolute',
    width: size,
    height: size,
    left: offset,
    top: offset,
    maxWidth: 'none',
  };
}

export function normalizeText(value: string): string {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
}

export function matchesQuery(book: Book, query: string): boolean {
  const trimmed = normalizeText(query.trim());
  if (!trimmed) return true;
  return (
    normalizeText(book.title).includes(trimmed) ||
    normalizeText(book.author).includes(trimmed) ||
    normalizeText(book.category).includes(trimmed)
  );
}

export function filterBooks(
  books: readonly Book[],
  query: string,
  activeCategory: Category | null,
): Book[] {
  return books.filter((book) => {
    if (activeCategory && book.category !== activeCategory) {
      return false;
    }
    return matchesQuery(book, query);
  });
}

export function getCategoryCounts(books: readonly Book[]): Record<Category, number> {
  const counts: Record<Category, number> = {
    Web: 0,
    Motion: 0,
    Editions: 0,
    Systems: 0,
  };
  for (const book of books) {
    counts[book.category] += 1;
  }
  return counts;
}

export interface HighlightSegment {
  text: string;
  match: boolean;
}

export function getHighlightSegments(text: string, query: string): HighlightSegment[] {
  const needle = normalizeText(query.trim());
  if (!needle) {
    return [{ text, match: false }];
  }

  // Map each normalized character back to its original character index span.
  const chars = Array.from(text);
  let normalized = '';
  const normToOrigStart: number[] = [];
  const normToOrigEnd: number[] = [];

  let offset = 0;
  for (const ch of chars) {
    const chLen = ch.length;
    const stripped = ch.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
    for (let j = 0; j < stripped.length; j += 1) {
      normalized += stripped[j];
      normToOrigStart.push(offset);
      normToOrigEnd.push(offset + chLen);
    }
    offset += chLen;
  }

  const idx = normalized.indexOf(needle);
  if (idx === -1) {
    return [{ text, match: false }];
  }

  const startOrig = normToOrigStart[idx];
  const endOrig = normToOrigEnd[idx + needle.length - 1];

  const segments: HighlightSegment[] = [];
  if (startOrig > 0) {
    segments.push({ text: text.slice(0, startOrig), match: false });
  }
  segments.push({ text: text.slice(startOrig, endOrig), match: true });
  if (endOrig < text.length) {
    segments.push({ text: text.slice(endOrig), match: false });
  }
  return segments;
}

export const THROW_TOASTS = [
  'Nice throw.',
  'It always comes back.',
  'Gravity: optional.',
] as const;
