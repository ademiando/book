import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { BOOKS, Book, Category, THROW_TOASTS, filterBooks } from './lib/books';
import { TopBar } from './components/TopBar';
import { HeroCopy } from './components/HeroCopy';
import { BookStage } from './components/BookStage';
import { FocusOverlay, launchFlyToShelfAnimation } from './components/FocusOverlay';
import { CopyrightLabel, SocialIcons } from './components/MinimalFooter';

const SHELF_STORAGE_KEY = 'folio-room-shelf';

function loadInitialShelf(): string[] {
  try {
    const raw = window.localStorage.getItem(SHELF_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      return parsed.filter((id): id is string => typeof id === 'string');
    }
  } catch {
    // Ignore storage access errors
  }
  return [];
}

export default function App() {
  const [layoutMode, setLayoutMode] = useState<'orbit' | 'grid'>('orbit');
  const [activeCategory, setActiveCategory] = useState<Category | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeBookIndex, setActiveBookIndex] = useState<number | null>(null);
  const [isSampleOpen, setIsSampleOpen] = useState(false);
  const [shelfIds, setShelfIds] = useState<string[]>(loadInitialShelf);
  const [shelfBumpKey, setShelfBumpKey] = useState(0);
  const [shuffleNonce, setShuffleNonce] = useState(0);
  const [toast, setToast] = useState<{ id: number; text: string } | null>(null);
  const [mobileGridHeight, setMobileGridHeight] = useState<number | null>(null);

  const shelfBadgeRef = useRef<HTMLSpanElement | null>(null);
  const toastTimerRef = useRef<number | null>(null);
  const openTimerRef = useRef<number | null>(null);
  const throwCounterRef = useRef(0);

  const showToast = useCallback((text: string) => {
    if (toastTimerRef.current) {
      window.clearTimeout(toastTimerRef.current);
    }
    const id = Date.now();
    setToast({ id, text });
    toastTimerRef.current = window.setTimeout(() => {
      setToast((curr) => (curr?.id === id ? null : curr));
    }, 2200);
  }, []);

  // Persist My Shelf locally
  useEffect(() => {
    try {
      window.localStorage.setItem(SHELF_STORAGE_KEY, JSON.stringify(shelfIds));
    } catch {
      // Ignore storage quota errors
    }
  }, [shelfIds]);

  // Sync body classes for CSS state transitions
  useEffect(() => {
    const isGrid = layoutMode === 'grid';
    const isFocus = activeBookIndex !== null;
    const allowMobileGridScroll = isGrid && !isFocus;

    document.body.classList.toggle('focus', isFocus);
    document.body.classList.toggle('grid-mode', isGrid);
    document.body.classList.toggle('mobile-grid-scroll', allowMobileGridScroll);
    document.documentElement.classList.toggle('mobile-grid-scroll', allowMobileGridScroll);

    if (!allowMobileGridScroll && window.scrollY > 0) {
      window.scrollTo(0, 0);
    }

    document.body.dataset.state = isFocus ? 'focus' : layoutMode;
  }, [activeBookIndex, layoutMode]);

  const activeBooks = useMemo(
    () => filterBooks(BOOKS, searchQuery, activeCategory),
    [searchQuery, activeCategory],
  );

  const activeIndices = useMemo(
    () => activeBooks.map((b) => b.index),
    [activeBooks],
  );

  const openBook = useCallback((index: number) => {
    if (openTimerRef.current) {
      window.clearTimeout(openTimerRef.current);
    }
    setActiveBookIndex(index);
    setIsSampleOpen(false);
    openTimerRef.current = window.setTimeout(() => {
      setIsSampleOpen(true);
    }, 880);
  }, []);

  const closeFocus = useCallback(() => {
    if (openTimerRef.current) {
      window.clearTimeout(openTimerRef.current);
      openTimerRef.current = null;
    }
    setIsSampleOpen(false);
    setActiveBookIndex(null);
  }, []);

  const navigateFocus = useCallback(
    (delta: -1 | 1) => {
      if (activeBookIndex === null) return;
      const list = activeIndices.length > 0 ? activeIndices : BOOKS.map((b) => b.index);
      const pos = list.indexOf(activeBookIndex);
      const nextPos = pos === -1 ? 0 : (pos + delta + list.length) % list.length;
      openBook(list[nextPos]);
    },
    [activeBookIndex, activeIndices, openBook],
  );

  const handleToggleSample = useCallback(() => {
    if (openTimerRef.current) {
      window.clearTimeout(openTimerRef.current);
      openTimerRef.current = null;
    }
    setIsSampleOpen((prev) => !prev);
  }, []);

  const handleAddToShelf = useCallback(
    (book: Book, sourceEl: HTMLElement | null) => {
      setShelfIds((prev) => (prev.includes(book.id) ? prev : [...prev, book.id]));
      launchFlyToShelfAnimation(book, sourceEl, shelfBadgeRef.current);
      window.setTimeout(() => {
        setShelfBumpKey((k) => k + 1);
      }, 980);
      showToast(`Added “${book.title}” to your collection`);
    },
    [showToast],
  );

  const handleRemoveFromShelf = useCallback(
    (id: string) => {
      const removed = BOOKS.find((b) => b.id === id);
      setShelfIds((prev) => prev.filter((item) => item !== id));
      if (removed) {
        showToast(`Removed “${removed.title}”`);
      }
    },
    [showToast],
  );

  const handleToggleCategory = useCallback((cat: Category) => {
    setActiveCategory((prev) => (prev === cat ? null : cat));
  }, []);

  const handleShuffleRing = useCallback(() => {
    setShuffleNonce((n) => n + 1);
    showToast('Shelf shuffled');
  }, [showToast]);

  const handleThrowToast = useCallback(() => {
    const msg = THROW_TOASTS[throwCounterRef.current % THROW_TOASTS.length];
    throwCounterRef.current += 1;
    showToast(msg);
  }, [showToast]);

  const handleResetHome = useCallback(() => {
    closeFocus();
    setLayoutMode('orbit');
    setActiveCategory(null);
    setSearchQuery('');
  }, [closeFocus]);

  const focusedBook = activeBookIndex !== null ? BOOKS[activeBookIndex] ?? null : null;

  return (
    <main
      className={`relative w-full select-none ${
        layoutMode === 'grid' && activeBookIndex === null
          ? 'min-h-full overflow-x-hidden'
          : 'h-full overflow-hidden'
      }`}
      style={
        mobileGridHeight && layoutMode === 'grid' && activeBookIndex === null
          ? { minHeight: `${mobileGridHeight}px` }
          : undefined
      }
    >
      <BookStage
        activeBookIndex={activeBookIndex}
        isSampleOpen={isSampleOpen}
        layoutMode={layoutMode}
        activeIndices={activeIndices}
        shuffleNonce={shuffleNonce}
        onOpenBook={openBook}
        onToggleSample={handleToggleSample}
        onCloseFocus={closeFocus}
        onThrowToast={handleThrowToast}
        onMobileGridHeightChange={setMobileGridHeight}
      />

      <TopBar
        query={searchQuery}
        onQueryChange={setSearchQuery}
        shelfIds={shelfIds}
        onOpenBook={openBook}
        onRemoveFromShelf={handleRemoveFromShelf}
        shelfBadgeRef={shelfBadgeRef}
        shelfBumpKey={shelfBumpKey}
        onResetHome={handleResetHome}
      />

      <HeroCopy
        layoutMode={layoutMode}
        onToggleLayout={() =>
          setLayoutMode((m) => (m === 'orbit' ? 'grid' : 'orbit'))
        }
        activeCategory={activeCategory}
        onToggleCategory={handleToggleCategory}
        onShuffleRing={handleShuffleRing}
      />

      <FocusOverlay
        book={focusedBook}
        isSampleOpen={isSampleOpen}
        isOnShelf={focusedBook ? shelfIds.includes(focusedBook.id) : false}
        onClose={closeFocus}
        onPrev={() => navigateFocus(-1)}
        onNext={() => navigateFocus(1)}
        onToggleSample={handleToggleSample}
        onAddToShelf={handleAddToShelf}
        onRemoveFromShelf={handleRemoveFromShelf}
      />

      {/* Bottom Corners: Orbit keeps original hint + switch; Grid shows thin copyright footer + 3 monochrome social icons */}
      <div
        className={`corners-bottom fixed inset-x-0 bottom-0 z-30 pointer-events-none px-4 pb-4 md:px-7 md:pb-6 transition-opacity duration-500 ${
          layoutMode === 'grid'
            ? 'flex flex-col items-center gap-2.5 md:grid md:grid-cols-[1fr_auto_1fr] md:items-center md:gap-4'
            : 'flex items-center justify-center md:justify-between'
        }`}
      >
        {layoutMode === 'grid' ? (
          <div className="order-2 md:order-1 w-full md:w-auto flex items-center justify-between md:justify-start md:justify-self-start pointer-events-auto">
            <CopyrightLabel />
            <SocialIcons className="md:hidden" />
          </div>
        ) : (
          <div className="hidden md:block text-[12px] text-[#86827a] tracking-[-0.01em] pointer-events-auto">
            Drag to throw · Scroll to spin · Click to open
          </div>
        )}

        <div
          role="group"
          aria-label="Layout mode"
          className={`water-droplet pointer-events-auto inline-flex items-center p-1 ${
            layoutMode === 'grid' ? 'order-1 md:order-2 md:justify-self-center' : ''
          }`}
        >
          <button
            type="button"
            aria-pressed={layoutMode === 'orbit'}
            onClick={() => setLayoutMode('orbit')}
            className={`px-3.5 py-1.5 rounded-full text-[12px] font-medium transition-all duration-300 cursor-pointer whitespace-nowrap ${
              layoutMode === 'orbit'
                ? 'bg-[#141414] text-[#f4f1ea] shadow-sm'
                : 'text-[#141414]/75 hover:text-[#141414]'
            }`}
          >
            Orbit
          </button>
          <button
            type="button"
            aria-pressed={layoutMode === 'grid'}
            onClick={() => setLayoutMode('grid')}
            className={`px-3.5 py-1.5 rounded-full text-[12px] font-medium transition-all duration-300 cursor-pointer whitespace-nowrap ${
              layoutMode === 'grid'
                ? 'bg-[#141414] text-[#f4f1ea] shadow-sm'
                : 'text-[#141414]/75 hover:text-[#141414]'
            }`}
          >
            Grid
          </button>
        </div>

        {layoutMode === 'grid' && (
          <SocialIcons className="hidden md:flex md:order-3 md:justify-self-end pointer-events-auto" />
        )}
      </div>

      {/* Centered Text-Only Toast Notification */}
      <div
        role="status"
        aria-live="polite"
        className={`fixed left-1/2 -translate-x-1/2 bottom-[72px] md:bottom-[74px] z-50 pointer-events-none text-[#141414]/85 text-[12.5px] font-medium tracking-[-0.01em] transition-all duration-500 whitespace-nowrap ${
          toast ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
        }`}
      >
        {toast?.text ?? ''}
      </div>
    </main>
  );
}
