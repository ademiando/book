import test from 'node:test';
import assert from 'node:assert/strict';
import {
  BOOKS,
  CATEGORIES,
  filterBooks,
  getBookCoverTrimScale,
  getBookCoverUrl,
  getCategoryCounts,
  getHighlightSegments,
  matchesQuery,
} from './books';
import {
  getBookArticleHeaderData,
  getBookArticleTheme,
  getBookSampleSections,
} from './articles';
import {
  ARTICLE_SPRING,
  MORPH_SPRING,
  buildRingTable,
  computeFocusBookTarget,
  computeGridTarget,
  computeOrbitTarget,
  createBookSpringState,
  getBookDimensions,
  integrateBookSpring,
  isBookPoseSettled,
  sampleRingAt,
} from './physics';

test('catalog contains all 12 books with valid category counts and cover URLs', () => {
  assert.equal(BOOKS.length, 12);
  const counts = getCategoryCounts(BOOKS);
  assert.deepEqual(counts, {
    Web: 3,
    Motion: 3,
    Editions: 3,
    Systems: 3,
  });
  for (const cat of CATEGORIES) {
    assert.equal(counts[cat], 3);
  }
  const url = getBookCoverUrl(BOOKS[0].id, 900);
  assert.ok(url.startsWith('https://images.higgs.ai/?default=1&output=webp&url='));
  assert.ok(url.includes('&w=900&q=85'));

  const burn = BOOKS.find((b) => b.title === 'Burn');
  const gallery = BOOKS.find((b) => b.title === 'Digital Art Gallery');
  assert.equal(burn?.previewUrl, 'https://ademiando.com/charcoal/');
  assert.equal(burn?.format, '3D Landing Web');
  assert.equal(burn?.series, 'Editions · 001');
  assert.equal(gallery?.previewUrl, 'https://ademiando.github.io/galery');
  assert.equal(gallery?.format, '3D Spatial Web');
  assert.equal(gallery?.series, 'Web · 001');
  assert.ok(getBookCoverTrimScale(burn!.id) > 1.1);
  assert.ok(getBookCoverTrimScale(gallery!.id) >= 1.2);

  for (const cat of CATEGORIES) {
    const inCat = BOOKS.filter((b) => b.category === cat).map((b) => b.series);
    assert.deepEqual(inCat, [`${cat} · 001`, `${cat} · 002`, `${cat} · 003`]);
  }
});

test('search matching is accent-insensitive across title, author, and category', () => {
  assert.equal(matchesQuery(BOOKS[0], 'grid'), true);
  assert.equal(matchesQuery(BOOKS[0], 'Inés Vahl'), true);
  assert.equal(matchesQuery(BOOKS[8], 'Fossé'), true);
  assert.equal(matchesQuery(BOOKS[5], 'motion'), true);
  assert.equal(filterBooks(BOOKS, '', 'Editions').length, 3);
  assert.equal(filterBooks(BOOKS, 'burn', 'Editions').length, 1);
  assert.equal(filterBooks(BOOKS, 'burn', 'Systems').length, 0);
});

test('highlight segments locate query match cleanly', () => {
  const segs = getHighlightSegments('Digital Art Gallery', 'gallery');
  assert.deepEqual(segs, [
    { text: 'Digital Art ', match: false },
    { text: 'Gallery', match: true },
  ]);
  const accentSegs = getHighlightSegments('Lena Fosse', 'Fossé');
  assert.deepEqual(accentSegs, [
    { text: 'Lena ', match: false },
    { text: 'Fosse', match: true },
  ]);
});

test('superellipse ring is evenly spaced by arc length', () => {
  const table = buildRingTable(1440, 900, 720);
  assert.ok(table.totalLength > 1000);
  const p0 = sampleRingAt(table, 0);
  const p1 = sampleRingAt(table, 1 / 12);
  const p2 = sampleRingAt(table, 2 / 12);
  const d01 = Math.hypot(p1.x - p0.x, p1.y - p0.y);
  const d12 = Math.hypot(p2.x - p1.x, p2.y - p1.y);
  // Arc-length parameterization keeps adjacent chord steps close on the smooth perimeter.
  assert.ok(Math.abs(d01 - d12) / d01 < 0.25);
});

test('spring integration converges smoothly to target pose', () => {
  const state = createBookSpringState({
    x: 0,
    y: 0,
    z: 0,
    rx: 0,
    ry: 0,
    rz: 0,
    s: 0.15,
    o: 0,
    open: 0,
  });
  const target = {
    x: 320,
    y: 240,
    z: 70,
    rx: -5,
    ry: 8,
    rz: -12,
    s: 1,
    o: 1,
    open: 0.92,
  };
  for (let frame = 0; frame < 180; frame += 1) {
    integrateBookSpring(state, target, 1 / 60);
  }
  assert.ok(Math.abs(state.p.x - target.x) < 0.5);
  assert.ok(Math.abs(state.p.y - target.y) < 0.5);
  assert.ok(Math.abs(state.p.open - target.open) < 0.01);

  const morphState = createBookSpringState({
    x: 0,
    y: 0,
    z: 0,
    rx: 0,
    ry: 0,
    rz: 0,
    s: 1,
    o: 1,
    open: 0,
  });
  for (let frame = 0; frame < 180; frame += 1) {
    integrateBookSpring(morphState, target, 1 / 60, MORPH_SPRING);
  }
  assert.ok(Math.abs(morphState.p.x - target.x) < 0.5);
  assert.ok(Math.abs(morphState.p.y - target.y) < 0.5);

  const articleState = createBookSpringState({
    x: 420,
    y: 450,
    z: 145,
    rx: 0,
    ry: 0,
    rz: 0,
    s: 1.72,
    o: 1,
    open: 0.98,
  });
  const articleTarget = {
    x: 720,
    y: 450,
    z: 210,
    rx: 0,
    ry: 0,
    rz: 0,
    s: 8.14,
    o: 1,
    open: 0.98,
  };
  for (let frame = 0; frame < 65; frame += 1) {
    integrateBookSpring(articleState, articleTarget, 1 / 60, ARTICLE_SPRING);
    assert.ok(articleState.p.s <= articleTarget.s + 0.05);
  }
  assert.ok(Math.abs(articleState.p.s - articleTarget.s) < 0.06);

  const mobileArticleState = createBookSpringState({
    x: 210,
    y: 337,
    z: 145,
    rx: 0,
    ry: 0,
    rz: 0,
    s: 1.12,
    o: 1,
    open: 0.98,
  });
  const mobileArticleTarget = {
    x: 195,
    y: 276,
    z: 120,
    rx: 0,
    ry: 0,
    rz: 0,
    s: 2.98,
    o: 1,
    open: 0.98,
  };
  assert.equal(isBookPoseSettled(mobileArticleState, mobileArticleTarget), false);
  for (let frame = 0; frame < 110; frame += 1) {
    integrateBookSpring(mobileArticleState, mobileArticleTarget, 1 / 60, ARTICLE_SPRING);
  }
  assert.equal(isBookPoseSettled(mobileArticleState, mobileArticleTarget), true);
});

test('top clearance lifts and shrinks books crossing top center', () => {
  const dims = getBookDimensions(1440);
  const ring = buildRingTable(1440, 900);
  // u = 0.75 is top center (theta = 3*PI/2 => cos=0, sin=-1)
  const pose = computeOrbitTarget({
    ring,
    dims,
    viewportWidth: 1440,
    viewportHeight: 900,
    activeSlot: 0,
    activeCount: 1,
    phase: Math.PI * 1.5,
    time: 0,
    bookIndex: 0,
    seed: 0.5,
    baseTilt: -16,
    mx: 0.5,
    my: 0.5,
    pointerX: -9999,
    pointerY: -9999,
    pointerActive: false,
    isHovered: false,
  });
  const rawTop = sampleRingAt(ring, 0.75);
  assert.ok(pose.y < rawTop.y - 100);
  assert.ok(pose.s < 0.8);
});

test('grid and focus targets compute valid bounds on desktop and mobile', () => {
  const desktopDims = getBookDimensions(1440);
  const desktopGrid0 = computeGridTarget({
    dims: desktopDims,
    viewportWidth: 1440,
    viewportHeight: 900,
    activeSlot: 0,
    activeCount: 12,
    mx: 0.5,
    my: 0.5,
    isHovered: false,
  });
  const desktopGrid6 = computeGridTarget({
    dims: desktopDims,
    viewportWidth: 1440,
    viewportHeight: 900,
    activeSlot: 6,
    activeCount: 12,
    mx: 0.5,
    my: 0.5,
    isHovered: false,
  });
  assert.equal(desktopGrid0.x, desktopGrid6.x);
  assert.ok(desktopGrid6.y > desktopGrid0.y);

  const focusDesktop = computeFocusBookTarget(1440, 900, desktopDims, true, 0.5, 0.5);
  // Open cover extends left by ~1.5 * BW * s; verify >= 30px left margin
  assert.ok(focusDesktop.x >= desktopDims.bw * focusDesktop.s * 1.5 + 29);

  const mobileDims = getBookDimensions(390);
  assert.equal(mobileDims.isMobile, true);
  assert.ok(mobileDims.bw <= 140);

  // Mobile grid renders 3 columns starting cleanly below mobileStartY
  const row0Mobile = computeGridTarget({
    dims: mobileDims,
    viewportWidth: 390,
    viewportHeight: 844,
    activeSlot: 0,
    activeCount: 12,
    mx: 0.5,
    my: 0.5,
    isHovered: false,
    mobileStartY: 400,
  });
  const row1Mobile = computeGridTarget({
    dims: mobileDims,
    viewportWidth: 390,
    viewportHeight: 844,
    activeSlot: 3,
    activeCount: 12,
    mx: 0.5,
    my: 0.5,
    isHovered: false,
    mobileStartY: 400,
  });
  assert.ok(mobileDims.bw * row0Mobile.s >= 105);
  assert.ok(row0Mobile.y - (mobileDims.bh * row0Mobile.s) / 2 >= 399);
  assert.equal(row0Mobile.x, row1Mobile.x);
  assert.ok(row1Mobile.y > row0Mobile.y);
});

test('all 12 books provide article header metadata, distinct editorial themes, and sample excerpt content', () => {
  const seenSpecimenKinds = new Set<string>();
  const seenAccents = new Set<string>();

  for (const book of BOOKS) {
    const header = getBookArticleHeaderData(book);
    const theme = getBookArticleTheme(book);
    assert.ok(header.kickerLeft.length > 0);
    assert.ok(header.kickerRight.length > 0);
    assert.ok(header.headline.length > 0);
    assert.ok(header.intro.includes(book.note));

    assert.ok(theme.bg.startsWith('#'));
    assert.equal(theme.bgRgb.split(',').length, 3);
    assert.ok(theme.displayFont.length > 0);
    assert.ok(theme.bodyFont.length > 0);
    assert.ok(theme.monoFont.length > 0);
    seenSpecimenKinds.add(theme.specimenKind);
    seenAccents.add(theme.accent);

    if (book.title !== 'GRID') {
      const sample = getBookSampleSections(book);
      assert.ok(sample.section1Title.length > 0);
      assert.equal(sample.section1Paragraphs.length, 2);
      assert.ok(sample.quote.length > 0);
      assert.equal(sample.specimenHighlights.length, 3);
    }
  }

  assert.equal(seenSpecimenKinds.size, BOOKS.length);
  assert.equal(seenAccents.size, BOOKS.length);
});
