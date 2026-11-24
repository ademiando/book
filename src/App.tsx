import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { BOOKS, Book, Category, THROW_TOASTS, filterBooks } from './lib/books';
import { TopBar } from './components/TopBar';
import { HeroCopy } from './components/HeroCopy';
import { BookStage } from './components/BookStage';
import { FocusOverlay, launchFlyToShelfAnimation } from './components/FocusOverlay';

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
      showToast(`Added “${book.title}” to your shelf`);
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
            <span className="text-[9.5px] md:text-[10.5px] font-light tracking-[0.06em] md:tracking-[0.08em] text-[#141414]/60 uppercase select-none whitespace-nowrap">
              © ADEMIANDO. ALL RIGHTS RESERVED
            </span>

            {/* Mobile right-corner monochrome social icons */}
            <div className="flex md:hidden items-center gap-1" aria-label="Social links">
              <a
                href="https://github.com/ademiando"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub ademiando"
                title="GitHub"
                className="w-7 h-7 rounded-full inline-flex items-center justify-center text-[#141414]/75 hover:bg-[#141414] hover:text-[#f4f1ea] active:scale-90 active:bg-[#141414] active:text-[#f4f1ea] transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#141414]"
              >
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
              </a>
              <a
                href="https://instagram.com/ademiando"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram ademiando"
                title="Instagram"
                className="w-7 h-7 rounded-full inline-flex items-center justify-center text-[#141414]/75 hover:bg-[#141414] hover:text-[#f4f1ea] active:scale-90 active:bg-[#141414] active:text-[#f4f1ea] transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#141414]"
              >
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
              <a
                href="https://wa.me/6285726951002"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp 085726951002"
                title="WhatsApp"
                className="w-7 h-7 rounded-full inline-flex items-center justify-center text-[#141414]/75 hover:bg-[#141414] hover:text-[#f4f1ea] active:scale-90 active:bg-[#141414] active:text-[#f4f1ea] transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#141414]"
              >
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12.03 2a9.94 9.94 0 0 0-8.52 15.08L2 22l5.06-1.46A9.95 9.95 0 1 0 12.03 2Zm0 18.14a8.18 8.18 0 0 1-4.18-1.15l-.3-.18-3.01.87.89-2.93-.2-.31a8.18 8.18 0 1 1 6.8 3.7Zm4.49-6.13c-.25-.12-1.46-.72-1.68-.8-.23-.08-.39-.12-.56.13-.16.24-.64.8-.78.96-.15.17-.29.19-.54.06-.25-.12-1.04-.38-1.99-1.22-.73-.65-1.23-1.46-1.37-1.7-.15-.25-.02-.38.1-.51.11-.11.25-.29.37-.43.13-.14.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.13-.56-1.34-.76-1.84-.2-.48-.4-.42-.56-.42h-.47c-.17 0-.44.06-.66.31-.23.25-.87.85-.87 2.08 0 1.22.89 2.41 1.01 2.57.13.17 1.75 2.68 4.25 3.76.59.26 1.06.41 1.42.53.6.19 1.14.16 1.57.1.48-.07 1.46-.6 1.66-1.17.21-.58.21-1.08.15-1.18-.07-.1-.23-.16-.48-.29Z" />
                </svg>
              </a>
            </div>
          </div>
        ) : (
          <div className="hidden md:block text-[12px] text-[#86827a] tracking-[-0.01em] pointer-events-auto">
            Drag to throw · Scroll to spin · Click to open
          </div>
        )}

        <div
          role="group"
          aria-label="Layout mode"
          className={`pointer-events-auto inline-flex items-center p-1 rounded-full border border-[rgba(20,20,20,0.1)] bg-[#fbfaf6]/85 backdrop-blur-md shadow-[0_2px_12px_rgba(20,20,20,0.05)] ${
            layoutMode === 'grid' ? 'order-1 md:order-2 md:justify-self-center' : ''
          }`}
        >
          <button
            type="button"
            aria-pressed={layoutMode === 'orbit'}
            onClick={() => setLayoutMode('orbit')}
            className={`px-3.5 py-1.5 rounded-full text-[12px] font-medium transition-colors duration-300 cursor-pointer whitespace-nowrap ${
              layoutMode === 'orbit'
                ? 'bg-[#141414] text-[#f4f1ea]'
                : 'text-[#86827a] hover:text-[#141414]'
            }`}
          >
            Orbit
          </button>
          <button
            type="button"
            aria-pressed={layoutMode === 'grid'}
            onClick={() => setLayoutMode('grid')}
            className={`px-3.5 py-1.5 rounded-full text-[12px] font-medium transition-colors duration-300 cursor-pointer whitespace-nowrap ${
              layoutMode === 'grid'
                ? 'bg-[#141414] text-[#f4f1ea]'
                : 'text-[#86827a] hover:text-[#141414]'
            }`}
          >
            Grid
          </button>
        </div>

        {layoutMode === 'grid' && (
          <div
            className="hidden md:flex md:order-3 md:justify-self-end items-center gap-1.5 pointer-events-auto"
            aria-label="Social links"
          >
            <a
              href="https://github.com/ademiando"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub ademiando"
              title="GitHub · ademiando"
              className="w-7 h-7 rounded-full inline-flex items-center justify-center text-[#141414]/75 hover:bg-[#141414] hover:text-[#f4f1ea] hover:-translate-y-0.5 hover:shadow-[0_6px_14px_rgba(20,20,20,0.16)] active:scale-90 active:bg-[#141414] active:text-[#f4f1ea] transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#141414]"
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
            </a>
            <a
              href="https://instagram.com/ademiando"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram ademiando"
              title="Instagram · @ademiando"
              className="w-7 h-7 rounded-full inline-flex items-center justify-center text-[#141414]/75 hover:bg-[#141414] hover:text-[#f4f1ea] hover:-translate-y-0.5 hover:shadow-[0_6px_14px_rgba(20,20,20,0.16)] active:scale-90 active:bg-[#141414] active:text-[#f4f1ea] transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#141414]"
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </a>
            <a
              href="https://wa.me/6285726951002"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp 085726951002"
              title="WhatsApp · 085726951002"
              className="w-7 h-7 rounded-full inline-flex items-center justify-center text-[#141414]/75 hover:bg-[#141414] hover:text-[#f4f1ea] hover:-translate-y-0.5 hover:shadow-[0_6px_14px_rgba(20,20,20,0.16)] active:scale-90 active:bg-[#141414] active:text-[#f4f1ea] transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#141414]"
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12.03 2a9.94 9.94 0 0 0-8.52 15.08L2 22l5.06-1.46A9.95 9.95 0 1 0 12.03 2Zm0 18.14a8.18 8.18 0 0 1-4.18-1.15l-.3-.18-3.01.87.89-2.93-.2-.31a8.18 8.18 0 1 1 6.8 3.7Zm4.49-6.13c-.25-.12-1.46-.72-1.68-.8-.23-.08-.39-.12-.56.13-.16.24-.64.8-.78.96-.15.17-.29.19-.54.06-.25-.12-1.04-.38-1.99-1.22-.73-.65-1.23-1.46-1.37-1.7-.15-.25-.02-.38.1-.51.11-.11.25-.29.37-.43.13-.14.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.13-.56-1.34-.76-1.84-.2-.48-.4-.42-.56-.42h-.47c-.17 0-.44.06-.66.31-.23.25-.87.85-.87 2.08 0 1.22.89 2.41 1.01 2.57.13.17 1.75 2.68 4.25 3.76.59.26 1.06.41 1.42.53.6.19 1.14.16 1.57.1.48-.07 1.46-.6 1.66-1.17.21-.58.21-1.08.15-1.18-.07-.1-.23-.16-.48-.29Z" />
              </svg>
            </a>
          </div>
        )}
      </div>

      {/* Centered Toast Pill */}
      <div
        role="status"
        aria-live="polite"
        className={`fixed left-1/2 -translate-x-1/2 bottom-16 md:bottom-7 z-50 pointer-events-none px-4 py-2 rounded-full bg-[#141414] text-[#f4f1ea] text-[12.5px] font-medium shadow-[0_10px_28px_rgba(20,20,20,0.22)] transition-all duration-500 whitespace-nowrap ${
          toast ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
        }`}
      >
        {toast?.text ?? ''}
      </div>
    </main>
  );
}
