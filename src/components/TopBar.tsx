import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Bookmark, Search, X } from 'lucide-react';
import {
  BOOKS,
  Book,
  getBookCoverUrl,
  getHighlightSegments,
  matchesQuery,
} from '../lib/books';

interface TopBarProps {
  query: string;
  onQueryChange: (next: string) => void;
  shelfIds: string[];
  onOpenBook: (index: number) => void;
  onRemoveFromShelf: (id: string) => void;
  shelfBadgeRef: React.RefObject<HTMLSpanElement | null>;
  shelfBumpKey: number;
  onResetHome: () => void;
  showGridTopFade?: boolean;
  articleDarkMode?: boolean;
}

function HighlightedText({ text, query }: { text: string; query: string }) {
  const segments = useMemo(() => getHighlightSegments(text, query), [text, query]);
  return (
    <>
      {segments.map((seg, i) =>
        seg.match ? (
          <mark
            key={i}
            className="rounded-[2px] px-[1px] text-[#141414]"
            style={{ backgroundColor: '#ffe066' }}
          >
            {seg.text}
          </mark>
        ) : (
          <React.Fragment key={i}>{seg.text}</React.Fragment>
        ),
      )}
    </>
  );
}

export const TopBar: React.FC<TopBarProps> = ({
  query,
  onQueryChange,
  shelfIds,
  onOpenBook,
  onRemoveFromShelf,
  shelfBadgeRef,
  shelfBumpKey,
  onResetHome,
  showGridTopFade = false,
  articleDarkMode = false,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const searchWrapRef = useRef<HTMLDivElement>(null);
  const shelfWrapRef = useRef<HTMLDivElement>(null);

  const [searchFocused, setSearchFocused] = useState(false);
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [shelfOpen, setShelfOpen] = useState(false);

  const searchResults = useMemo(() => {
    const trimmed = query.trim();
    if (!trimmed) return [];
    return BOOKS.filter((b) => matchesQuery(b, trimmed));
  }, [query]);

  const savedBooks = useMemo(
    () =>
      shelfIds
        .map((id) => BOOKS.find((b) => b.id === id))
        .filter((b): b is Book => Boolean(b)),
    [shelfIds],
  );

  useEffect(() => {
    setSelectedIdx(0);
  }, [query]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.key === '/' &&
        document.activeElement?.tagName !== 'INPUT' &&
        document.activeElement?.tagName !== 'TEXTAREA'
      ) {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    const handlePointerDown = (e: PointerEvent) => {
      if (searchWrapRef.current && !searchWrapRef.current.contains(e.target as Node)) {
        setSearchFocused(false);
      }
      if (shelfWrapRef.current && !shelfWrapRef.current.contains(e.target as Node)) {
        setShelfOpen(false);
      }
    };
    window.addEventListener('pointerdown', handlePointerDown);
    return () => window.removeEventListener('pointerdown', handlePointerDown);
  }, []);

  const showSearchDropdown = searchFocused && query.trim().length > 0;

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      setSearchFocused(false);
      inputRef.current?.blur();
      return;
    }
    if (!searchResults.length) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIdx((prev) => (prev + 1) % searchResults.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIdx((prev) => (prev - 1 + searchResults.length) % searchResults.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const target = searchResults[selectedIdx] ?? searchResults[0];
      if (target) {
        onOpenBook(target.index);
        setSearchFocused(false);
        inputRef.current?.blur();
      }
    }
  };

  return (
    <>
      {/* Soft paper fade on Grid page matching the Article scroll top fade (sits above books z-20 & hero z-15, below search z-30 & sticky controls z-40) */}
      <div
        aria-hidden="true"
        className={`pointer-events-none fixed inset-x-0 top-0 h-24 z-[25] transition-opacity duration-500 ${
          showGridTopFade ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          background:
            'linear-gradient(to bottom, #f4f1ea 45%, rgba(244, 241, 234, 0.85) 72%, rgba(244, 241, 234, 0) 100%)',
        }}
      />

      {/* Sticky Center Wordmark (stays visible & fixed on scroll and in focus, without any background bar/lines) */}
      <button
        type="button"
        onClick={onResetHome}
        aria-label="The Atelier home"
        className="fixed top-4 md:top-5 left-1/2 -translate-x-1/2 z-40 pointer-events-auto text-center cursor-pointer bg-transparent border-0 p-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#141414] rounded-sm transition-colors duration-300"
        style={{
          fontFamily: "'Inter Tight', sans-serif",
          fontWeight: 700,
          fontSize: '25px',
          lineHeight: 0.86,
          letterSpacing: '-0.04em',
          color: articleDarkMode ? '#f4f1ea' : '#141414',
        }}
      >
        <span className="block">The</span>
        <span className="block">Atelier</span>
      </button>

      <header className="top-bar fixed inset-x-0 top-0 z-30 pointer-events-none px-4 pt-4 md:px-7 md:pt-5 transition-opacity duration-500">
        {/* Center Search Bar (scrolls with page on mobile grid; fades in focus) */}
        <div className="flex flex-col items-center gap-2.5 mx-auto pointer-events-none w-full md:w-auto">
          <div className="h-[43px] shrink-0" aria-hidden="true" />

          <div
            ref={searchWrapRef}
            className="top-bar-fade pointer-events-auto transition-opacity duration-500 relative w-[min(304px,calc(100vw-32px))] md:w-[340px]"
          >
            <div className="water-droplet water-droplet-delay-1 water-droplet-search flex items-center gap-2.5 h-10 px-3.5">
              <Search className="w-3.5 h-3.5 text-[#141414]/65 shrink-0" aria-hidden="true" />
              <input
                ref={inputRef}
                type="search"
                value={query}
                onFocus={() => setSearchFocused(true)}
                onChange={(e) => {
                  onQueryChange(e.target.value);
                  setSearchFocused(true);
                }}
                onKeyDown={handleSearchKeyDown}
                placeholder="Search ideas..."
                aria-label="Search ideas..."
                className="w-full bg-transparent text-[13px] text-[#141414] placeholder:text-[#141414]/55 focus:outline-none [&::-webkit-search-cancel-button]:hidden"
              />
              {query ? (
                <button
                  type="button"
                  onClick={() => {
                    onQueryChange('');
                    inputRef.current?.focus();
                  }}
                  aria-label="Clear search"
                  className="p-1 rounded-full text-[#141414]/65 hover:text-[#141414] transition-colors shrink-0 cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              ) : (
                <kbd className="hidden sm:inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 text-[11px] font-medium text-[#141414]/65 border border-[rgba(20,20,20,0.16)] rounded-[6px] bg-black/[0.04] shrink-0">
                  /
                </kbd>
              )}
            </div>

            {showSearchDropdown && (
              <div
                role="listbox"
                aria-label="Search results"
                className="absolute left-0 right-0 top-[calc(100%+8px)] rounded-2xl border border-[rgba(20,20,20,0.1)] bg-[#fbfaf6]/95 backdrop-blur-md shadow-[0_18px_40px_rgba(20,20,20,0.14)] overflow-hidden z-50 max-h-[320px] overflow-y-auto p-1.5"
              >
                {searchResults.length === 0 ? (
                  <div className="px-3.5 py-5 text-center text-[13px] text-[#86827a]">
                    No books match…
                  </div>
                ) : (
                  searchResults.map((book, idx) => {
                    const isSelected = idx === selectedIdx;
                    return (
                      <button
                        key={book.id}
                        type="button"
                        role="option"
                        aria-selected={isSelected}
                        onMouseEnter={() => setSelectedIdx(idx)}
                        onClick={() => {
                          onOpenBook(book.index);
                          setSearchFocused(false);
                        }}
                        className={`w-full flex items-center gap-3 px-2.5 py-2 rounded-xl text-left transition-colors cursor-pointer ${
                          isSelected ? 'bg-[rgba(20,20,20,0.06)]' : 'hover:bg-[rgba(20,20,20,0.04)]'
                        }`}
                      >
                        <span
                          className="w-8 h-[42px] rounded-[3px] overflow-hidden shrink-0 shadow-sm border border-[rgba(20,20,20,0.08)]"
                          style={{ backgroundColor: book.coverColor }}
                        >
                          <img
                            src={getBookCoverUrl(book.id, 120)}
                            alt={book.title}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover"
                          />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block text-[13px] font-medium text-[#141414] truncate">
                            <HighlightedText text={book.title} query={query} />
                          </span>
                          <span className="block text-[11.5px] text-[#86827a] truncate">
                            <HighlightedText text={book.author} query={query} /> ·{' '}
                            <HighlightedText text={book.category} query={query} />
                          </span>
                        </span>
                      </button>
                    );
                  })
                )}
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Sticky Right: Saved Pill */}
      <div
        ref={shelfWrapRef}
        className="pointer-events-auto shrink-0 fixed right-4 top-4 md:right-7 md:top-5 z-40 flex justify-end"
      >
          <button
            type="button"
            onClick={() => setShelfOpen((o) => !o)}
            aria-expanded={shelfOpen}
            aria-label={`Saved, ${shelfIds.length} saved items`}
            className={`water-droplet water-droplet-delay-2 inline-flex items-center gap-1.5 md:gap-2 h-8 md:h-9 px-2.5 md:px-3.5 text-[11px] md:text-[12.5px] font-medium cursor-pointer whitespace-nowrap transition-colors duration-300 ${
              articleDarkMode ? 'text-[#f4f1ea]' : 'text-[#141414]'
            }`}
            style={
              articleDarkMode
                ? {
                    background:
                      'linear-gradient(135deg, rgba(255, 255, 255, 0.18) 0%, rgba(255, 255, 255, 0.06) 52%, rgba(255, 255, 255, 0.14) 100%)',
                    borderColor: 'rgba(244, 241, 234, 0.34)',
                  }
                : undefined
            }
          >
            <Bookmark className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Saved</span>
            <span
              key={shelfBumpKey}
              ref={shelfBadgeRef}
              className={`inline-flex items-center justify-center min-w-[18px] h-[18px] px-1 rounded-full text-[11px] font-semibold tabular-nums transition-colors ${
                shelfIds.length > 0
                  ? articleDarkMode
                    ? 'bg-[#f4f1ea] text-[#141414]'
                    : 'bg-[#141414] text-[#f4f1ea]'
                  : articleDarkMode
                    ? 'bg-[rgba(244,241,234,0.22)] text-[#f4f1ea]'
                    : 'bg-[rgba(20,20,20,0.12)] text-[#141414]/75'
              } ${shelfBumpKey > 0 ? 'shelf-bump' : ''}`}
            >
              {shelfIds.length}
            </span>
          </button>

          {shelfOpen && (
            <div className="absolute right-0 top-[calc(100%+8px)] w-[272px] rounded-2xl border border-[rgba(20,20,20,0.1)] bg-[#fbfaf6]/95 backdrop-blur-md shadow-[0_18px_40px_rgba(20,20,20,0.14)] p-2 z-50">
              <div className="px-2.5 py-1.5 text-[11px] font-medium text-[#86827a] border-b border-[rgba(20,20,20,0.08)] flex items-center justify-between">
                <span>Saved</span>
                <span className="tabular-nums">{savedBooks.length}</span>
              </div>
              {savedBooks.length === 0 ? (
                <div className="px-3 py-6 text-center text-[12.5px] text-[#86827a] leading-relaxed">
                  No works saved yet. Open any work and choose “Add to saved”.
                </div>
              ) : (
                <div className="mt-1.5 max-h-[280px] overflow-y-auto space-y-1">
                  {savedBooks.map((book) => (
                    <div
                      key={book.id}
                      className="flex items-center gap-2.5 p-1.5 rounded-xl hover:bg-[rgba(20,20,20,0.05)] transition-colors"
                    >
                      <button
                        type="button"
                        onClick={() => {
                          onOpenBook(book.index);
                          setShelfOpen(false);
                        }}
                        className="flex items-center gap-2.5 flex-1 min-w-0 text-left cursor-pointer"
                      >
                        <span
                          className="w-8 h-[42px] rounded-[3px] overflow-hidden shrink-0 shadow-sm border border-[rgba(20,20,20,0.08)]"
                          style={{ backgroundColor: book.coverColor }}
                        >
                          <img
                            src={getBookCoverUrl(book.id, 200)}
                            alt={book.title}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover"
                          />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block text-[12.5px] font-medium text-[#141414] truncate">
                            {book.title}
                          </span>
                          <span className="block text-[11px] text-[#86827a] truncate">
                            {book.author}
                          </span>
                        </span>
                      </button>
                      <button
                        type="button"
                        onClick={() => onRemoveFromShelf(book.id)}
                        aria-label={`Remove ${book.title} from shelf`}
                        className="p-1.5 rounded-full text-[#86827a] hover:text-[#141414] hover:bg-[rgba(20,20,20,0.06)] transition-colors cursor-pointer shrink-0"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
      </div>
    </>
  );
};
