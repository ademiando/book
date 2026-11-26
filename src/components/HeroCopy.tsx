import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { BOOKS, CATEGORIES, Category, getBookCoverUrl, getCategoryCounts } from '../lib/books';

interface HeroCopyProps {
  layoutMode: 'orbit' | 'grid';
  onToggleLayout: () => void;
  activeCategory: Category | null;
  onToggleCategory: (category: Category | null) => void;
  onShuffleRing: () => void;
}

const CATEGORY_COUNTS = getCategoryCounts(BOOKS);

const FILTER_OPTIONS: ReadonlyArray<{ key: 'ALL' | Category; label: string; value: Category | null; count: number }> = [
  { key: 'ALL', label: 'All', value: null, count: BOOKS.length },
  ...CATEGORIES.map((category) => ({
    key: category,
    label: category,
    value: category,
    count: CATEGORY_COUNTS[category],
  })),
];

export const HeroCopy: React.FC<HeroCopyProps> = ({
  layoutMode,
  onToggleLayout,
  activeCategory,
  onToggleCategory,
  onShuffleRing,
}) => {
  const [flipCount, setFlipCount] = useState(0);
  const [indicator, setIndicator] = useState<{ left: number; width: number }>({ left: 0, width: 0 });

  const scrollBarRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const dragScrollRef = useRef<{ active: boolean; startX: number; scrollLeft: number; moved: boolean }>({
    active: false,
    startX: 0,
    scrollLeft: 0,
    moved: false,
  });

  useEffect(() => {
    const id = window.setInterval(() => {
      setFlipCount((c) => c + 1);
    }, 2600);
    return () => window.clearInterval(id);
  }, []);

  const activeKey = activeCategory ?? 'ALL';

  useLayoutEffect(() => {
    const updateIndicator = () => {
      const btn = tabRefs.current[activeKey];
      if (!btn) return;
      setIndicator({ left: btn.offsetLeft, width: btn.offsetWidth });
    };

    updateIndicator();

    const activeBtn = tabRefs.current[activeKey];
    activeBtn?.scrollIntoView({ behavior: 'smooth', inline: 'nearest', block: 'nearest' });

    const track = trackRef.current;
    if (!track || typeof ResizeObserver === 'undefined') {
      window.addEventListener('resize', updateIndicator);
      return () => window.removeEventListener('resize', updateIndicator);
    }

    const observer = new ResizeObserver(updateIndicator);
    observer.observe(track);
    return () => observer.disconnect();
  }, [activeKey, layoutMode]);

  const handleBarPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== 'mouse' || e.button !== 0) return;
    const el = scrollBarRef.current;
    if (!el) return;
    dragScrollRef.current = {
      active: true,
      startX: e.clientX,
      scrollLeft: el.scrollLeft,
      moved: false,
    };
  };

  const handleBarPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const ds = dragScrollRef.current;
    const el = scrollBarRef.current;
    if (!ds.active || !el) return;
    const dx = e.clientX - ds.startX;
    if (Math.abs(dx) >= 5) {
      ds.moved = true;
    }
    if (ds.moved) {
      el.scrollLeft = ds.scrollLeft - dx;
    }
  };

  const handleBarPointerUp = () => {
    dragScrollRef.current.active = false;
  };

  // Front face shows even flips, back face shows odd flips so every 2.6s rotateY reveals a fresh cover smoothly.
  const frontBook = BOOKS[Math.floor((flipCount + 1) / 2) * 2 % BOOKS.length];
  const backBook = BOOKS[(Math.floor(flipCount / 2) * 2 + 1) % BOOKS.length];

  return (
    <section className="hero-copy" aria-label="The Atelier overview">
      <div className="hero-copy-inner max-w-[316px] md:max-w-[840px]">
        <h1 className="headline-text m-0">
          <span className="line-mask">
            <span className="line-rise">Everything you can</span>
          </span>
          <span className="line-mask">
            <span className="line-rise line-rise-2">
              imagine
              <button
                type="button"
                onClick={onShuffleRing}
                aria-label="Shuffle book orbit"
                title="Shuffle shelf"
                className="mini-book-btn pointer-events-auto"
              >
                <span
                  className="mini-book-3d"
                  style={{ transform: `rotateY(${flipCount * 180}deg)` }}
                >
                  <span
                    className="mini-book-face"
                    style={{ backgroundColor: frontBook.coverColor }}
                  >
                    <img
                      src={getBookCoverUrl(frontBook.id, 160)}
                      alt=""
                      referrerPolicy="no-referrer"
                    />
                  </span>
                  <span
                    className="mini-book-face mini-book-face-back"
                    style={{ backgroundColor: backBook.coverColor }}
                  >
                    <img
                      src={getBookCoverUrl(backBook.id, 160)}
                      alt=""
                      referrerPolicy="no-referrer"
                    />
                  </span>
                </span>
              </button>
              is real.
            </span>
          </span>
        </h1>

        <p
          className={`mt-3 md:mt-5 mb-0 leading-[1.45] md:leading-[1.5] text-[#86827a] font-normal ${
            layoutMode === 'grid'
              ? 'text-[14.5px] md:text-[17px] max-w-[330px] md:max-w-[440px]'
              : 'text-[13.5px] md:text-[17px] max-w-[260px] md:max-w-[460px]'
          }`}
        >
          A digital art studio of ideas, crafted in code and prose.
        </p>

        <div className="mt-5 md:mt-7 flex flex-col items-center gap-3 md:gap-3.5 pointer-events-auto w-full">
          <button
            type="button"
            onClick={onToggleLayout}
            className="cta-pill water-droplet-dark inline-flex items-center gap-2.5 px-5 md:px-6 text-[13px] md:text-[13.5px] font-medium cursor-pointer whitespace-nowrap"
          >
            <span>{layoutMode === 'grid' ? 'Back to Orbit' : 'View Collections'}</span>
            <ArrowRight className="cta-arrow w-4 h-4" aria-hidden="true" />
          </button>

          <div
            className={`water-droplet p-1 inline-flex items-center ${
              layoutMode === 'grid' ? 'max-w-full' : 'max-w-[276px] md:max-w-none'
            }`}
            role="group"
            aria-label="Filter by category"
          >
            <div
              ref={scrollBarRef}
              onPointerDown={handleBarPointerDown}
              onPointerMove={handleBarPointerMove}
              onPointerUp={handleBarPointerUp}
              onPointerCancel={handleBarPointerUp}
              className="no-scrollbar overflow-x-auto touch-pan-x rounded-full w-full"
            >
              <div ref={trackRef} className="relative inline-flex items-center gap-0.5 shrink-0">
              <span
                aria-hidden="true"
                className="pointer-events-none absolute top-0 bottom-0 left-0 rounded-full bg-[#141414] shadow-sm transition-[transform,width] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
                style={{
                  width: `${indicator.width}px`,
                  transform: `translate3d(${indicator.left}px, 0, 0)`,
                  opacity: indicator.width > 0 ? 1 : 0,
                }}
              />
              {FILTER_OPTIONS.map((opt) => {
                const isActive = activeKey === opt.key;
                return (
                  <button
                    key={opt.key}
                    ref={(el) => {
                      tabRefs.current[opt.key] = el;
                    }}
                    type="button"
                    aria-pressed={isActive}
                    onClick={() => {
                      if (dragScrollRef.current.moved) {
                        dragScrollRef.current.moved = false;
                        return;
                      }
                      onToggleCategory(opt.value);
                    }}
                    className={`group relative z-10 inline-flex items-center shrink-0 rounded-full font-medium transition-colors duration-300 cursor-pointer whitespace-nowrap gap-1.5 h-7 md:h-8 px-2.5 md:px-3 text-[11px] md:text-[12px] ${
                      isActive
                        ? 'text-[#f4f1ea] hover:text-[#f4f1ea]'
                        : 'text-[#141414]/80 hover:bg-[#141414] hover:text-[#f4f1ea]'
                    }`}
                  >
                    <span>{opt.label}</span>
                    <span
                      className={`tabular-nums text-[10.5px] md:text-[11px] transition-colors duration-300 ${
                        isActive ? 'text-[#f4f1ea]/70' : 'text-[#86827a] group-hover:text-[#f4f1ea]/70'
                      }`}
                    >
                      {opt.count}
                    </span>
                  </button>
                );
              })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
