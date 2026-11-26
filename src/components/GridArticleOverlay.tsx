import React, { useEffect, useRef, useState } from 'react';
import { Book } from '../lib/books';
import { GridArticlePageTop } from './GridArticlePageTop';
import { CopyrightLabel, SocialIcons } from './MinimalFooter';

interface GridArticleOverlayProps {
  book: Book | null;
  isOpen: boolean;
  onClose: () => void;
}

interface ScrollRevealProps {
  children: React.ReactNode;
  scrollRoot: HTMLDivElement | null;
  active: boolean;
  delayMs?: number;
  className?: string;
}

const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  scrollRoot,
  active,
  delayMs = 0,
  className = '',
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    if (!active) {
      setRevealed(false);
      return;
    }
    const el = ref.current;
    if (!el) return;

    if (typeof IntersectionObserver === 'undefined') {
      setRevealed(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setRevealed(true);
            observer.disconnect();
            break;
          }
        }
      },
      {
        root: scrollRoot,
        threshold: 0.08,
        rootMargin: '0px 0px -28px 0px',
      },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [active, scrollRoot]);

  return (
    <div
      ref={ref}
      className={`transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        revealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
      } ${className}`}
      style={{ transitionDelay: revealed && delayMs ? `${delayMs}ms` : '0ms' }}
    >
      {children}
    </div>
  );
};

export const GridArticleOverlay: React.FC<GridArticleOverlayProps> = ({
  book,
  isOpen,
  onClose,
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollEl, setScrollEl] = useState<HTMLDivElement | null>(null);
  const [columnPreset, setColumnPreset] = useState<4 | 8 | 12>(12);
  const [showConstructionLines, setShowConstructionLines] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    if (isOpen && scrollRef.current) {
      scrollRef.current.scrollTop = 0;
      setScrollProgress(0);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        e.stopPropagation();
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown, true);
    return () => window.removeEventListener('keydown', handleKeyDown, true);
  }, [isOpen, onClose]);

  if (!book || book.title !== 'GRID') return null;

  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    const max = el.scrollHeight - el.clientHeight;
    setScrollProgress(max > 0 ? Math.min(1, el.scrollTop / max) : 0);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${book.title} full excerpt article`}
      aria-hidden={!isOpen}
      className={`fixed inset-0 z-[38] overflow-hidden transition-opacity ease-[cubic-bezier(0.22,1,0.36,1)] ${
        isOpen
          ? 'opacity-100 duration-300 pointer-events-auto'
          : 'opacity-0 duration-260 pointer-events-none'
      }`}
      style={{ backgroundColor: '#fbf8f1' }}
    >
      {/* Subtle architectural paper grid texture matching GRID monograph */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 opacity-[0.28]"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(20,20,20,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(20,20,20,0.06) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

      {/* Soft paper fade behind sticky top controls while scrolling the article */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-x-0 top-0 h-24 z-[39]"
        style={{
          background:
            'linear-gradient(to bottom, #fbf8f1 45%, rgba(251, 248, 241, 0.85) 72%, rgba(251, 248, 241, 0) 100%)',
        }}
      />

      {/* Reading progress hairline at very top */}
      <div
        aria-hidden="true"
        className="fixed top-0 left-0 h-[2px] bg-[#141414] z-50 transition-[width] duration-150 ease-out"
        style={{ width: `${(scrollProgress * 100).toFixed(1)}%` }}
      />

      {/* Scrollable Long-Form Monograph */}
      <div
        ref={(node) => {
          scrollRef.current = node;
          setScrollEl((prev) => (prev === node ? prev : node));
        }}
        onScroll={handleScroll}
        className="relative h-full w-full overflow-y-auto overscroll-contain px-5 md:px-10 pt-24 md:pt-28 pb-20"
      >
        <article className="mx-auto max-w-[820px] text-[#141414]">
          {/* Identical top viewport layout & typography to zoomed Page 2 — zero glitch handoff */}
          <GridArticlePageTop
            book={book}
            interactive
            columnPreset={columnPreset}
            onSelectColumnPreset={setColumnPreset}
          />

          {/* Concept II + Frame 02: Reconstructed Swiss Timetable */}
          <section className="mt-14 md:mt-20 space-y-6">
            <ScrollReveal scrollRoot={scrollEl} active={isOpen}>
              <div className="flex items-baseline gap-3">
                <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#86827a] tabular-nums">
                  CONCEPT 02
                </span>
                <span className="h-px flex-1 bg-[rgba(20,20,20,0.1)]" />
              </div>

              <h2
                className="mt-6 text-[26px] md:text-[34px] leading-[1.06] tracking-[-0.03em] font-semibold"
                style={{ fontFamily: "'Inter Tight', sans-serif" }}
              >
                Reconstructed Timetables: High Density Without Visual Noise
              </h2>

              <p className="mt-6 text-[15px] md:text-[16px] leading-[1.75] text-[#141414]/85">
                A railway timetable allows zero ambiguity. Passengers scan dozens of departure times in
                half a second while walking toward a platform. In Chapter 02, Vahl strips away every
                rounded card and drop shadow to show how Swiss printers achieved effortless legibility
                using only three tools: tabular lining numerals, strict horizontal baseline rules, and
                deliberate empty tracks between departure groups.
              </p>
            </ScrollReveal>

            {/* Frame 02: Timetable Reconstruction Specimen */}
            <ScrollReveal scrollRoot={scrollEl} active={isOpen} delayMs={100}>
              <figure className="rounded-xl border border-[rgba(20,20,20,0.14)] bg-[#f4f1ea]/90 p-5 md:p-6">
              <div className="flex items-center justify-between pb-3 border-b border-[rgba(20,20,20,0.12)]">
                <span className="text-[10.5px] font-semibold uppercase tracking-[0.12em] text-[#86827a]">
                  FRAME 02 · PLATE 14 RECONSTRUCTION — SBB TIMETABLE LOGIC
                </span>
                <span className="text-[11px] font-mono text-[#86827a]">BASELINE 8PT</span>
              </div>

              <div className="mt-4 overflow-x-auto">
                <div className="min-w-[480px] bg-[#fbf8f1] border border-[rgba(20,20,20,0.12)] rounded-lg p-4 md:p-5 text-[12.5px] tabular-nums">
                  <div className="grid grid-cols-[72px_1fr_92px_70px] gap-3 pb-2 border-b-2 border-[#141414] text-[10.5px] font-semibold uppercase tracking-[0.1em] text-[#86827a]">
                    <span>Dep.</span>
                    <span>Route Corridor</span>
                    <span>Platform</span>
                    <span className="text-right">Cadence</span>
                  </div>
                  {[
                    { time: '06:14', route: 'ZÜRICH HB — AARAU — BASEL SBB', plat: 'Gleis 07', cadence: 'IC 3' },
                    { time: '06:32', route: 'BERN — FRIBOURG — GENÈVE AÉROPORT', plat: 'Gleis 04', cadence: 'IC 1' },
                    { time: '07:05', route: 'LUZERN — ARTH-GOLDAU — LUGANO', plat: 'Gleis 11', cadence: 'EC 2' },
                    { time: '07:48', route: 'WINTERTHUR — ST. GALLEN — RORSCHACH', plat: 'Gleis 02', cadence: 'IR 13' },
                  ].map((row) => (
                    <div
                      key={row.time}
                      className="grid grid-cols-[72px_1fr_92px_70px] gap-3 py-2.5 border-b border-[rgba(20,20,20,0.1)] last:border-b-0 items-baseline"
                    >
                      <span className="font-semibold text-[#141414]">{row.time}</span>
                      <span className="font-medium tracking-[-0.01em] text-[#141414]/90">{row.route}</span>
                      <span className="text-[#86827a]">{row.plat}</span>
                      <span className="text-right font-semibold text-[#141414]">{row.cadence}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-4 grid sm:grid-cols-3 gap-3 text-[11.5px] text-[#86827a]">
                <div className="rounded-lg bg-[#fbf8f1] border border-[rgba(20,20,20,0.08)] px-3 py-2">
                  <strong className="text-[#141414]">[A] Fixed Time Column:</strong> 72px anchor locks the eye before reading destination.
                </div>
                <div className="rounded-lg bg-[#fbf8f1] border border-[rgba(20,20,20,0.08)] px-3 py-2">
                  <strong className="text-[#141414]">[B] Hairline Separators:</strong> Horizontal rules replace boxes to keep ink density light.
                </div>
                <div className="rounded-lg bg-[#fbf8f1] border border-[rgba(20,20,20,0.08)] px-3 py-2">
                  <strong className="text-[#141414]">[C] Contrast Hierarchy:</strong> Heavy top rule establishes direction immediately.
                </div>
              </div>
              </figure>
            </ScrollReveal>
          </section>

          {/* Concept III + Frame 03: Asymmetric Tension */}
          <section className="mt-14 md:mt-20 space-y-6">
            <ScrollReveal scrollRoot={scrollEl} active={isOpen}>
              <div className="flex items-baseline gap-3">
                <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#86827a] tabular-nums">
                  CONCEPT 03
                </span>
                <span className="h-px flex-1 bg-[rgba(20,20,20,0.1)]" />
              </div>

              <h2
                className="mt-6 text-[26px] md:text-[34px] leading-[1.06] tracking-[-0.03em] font-semibold"
                style={{ fontFamily: "'Inter Tight', sans-serif" }}
              >
                Asymmetric Tension &amp; Why Blank Space Is Active Material
              </h2>

              <p className="mt-6 text-[15px] md:text-[16px] leading-[1.75] text-[#141414]/85">
                Centered symmetry calms a monument, yet on an editorial spread it often freezes energy.
                When every paragraph spans equal halves, the reader’s eye has nowhere to accelerate or
                pause. By offsetting columns—pairing a narrow 5-column index beside a generous 7-column
                reading measure, or hanging headlines across an empty top rail—negative space stops
                being leftover paper and begins steering tempo.
              </p>
            </ScrollReveal>

            {/* Pull Quote */}
            <ScrollReveal scrollRoot={scrollEl} active={isOpen} delayMs={80}>
              <blockquote className="my-8 border-l-2 border-[#141414] pl-5 md:pl-7 py-1">
                <p
                  className="m-0 text-[20px] md:text-[26px] leading-[1.25] tracking-[-0.025em] font-medium text-[#141414]"
                  style={{ fontFamily: "'Inter Tight', sans-serif" }}
                >
                  “A grid should never feel like a fence around the work. It is a tuning fork—struck
                  once at the start of a book so every spread resonates in the same key.”
                </p>
                <footer className="mt-2.5 text-[12px] text-[#86827a]">
                  — Ines Vahl, GRID (Chapter 03: Optical Measure)
                </footer>
              </blockquote>
            </ScrollReveal>

            {/* Frame 03: Spread Comparison Frame */}
            <ScrollReveal scrollRoot={scrollEl} active={isOpen} delayMs={110}>
              <figure className="rounded-xl border border-[rgba(20,20,20,0.14)] bg-[#f4f1ea]/90 p-5 md:p-6">
              <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[rgba(20,20,20,0.1)]">
                <div>
                  <span className="block text-[10.5px] font-semibold uppercase tracking-[0.12em] text-[#86827a]">
                    FRAME 03 · SYMMETRIC VS ASYMMETRIC SPREAD
                  </span>
                  <span className="text-[13px] font-medium text-[#141414]">
                    Two-Page Editorial Tension Study
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setShowConstructionLines((v) => !v)}
                  className="px-3 py-1.5 rounded-full border border-[rgba(20,20,20,0.18)] bg-[#fbf8f1] text-[11.5px] font-medium text-[#141414] hover:border-[#141414] transition-colors cursor-pointer"
                >
                  {showConstructionLines ? 'Hide grid lines' : 'Show grid lines'}
                </button>
              </div>

              <div className="mt-5 grid md:grid-cols-2 gap-4">
                {/* Left Spread: Static 6/6 */}
                <div className="rounded-lg border border-[rgba(20,20,20,0.12)] bg-[#fbf8f1] p-4">
                  <div className="text-[10.5px] font-semibold uppercase tracking-[0.1em] text-[#86827a] mb-3">
                    A · Static Symmetry (6 + 6)
                  </div>
                  <div className="grid grid-cols-2 gap-3 h-36">
                    <div
                      className={`rounded-[3px] p-2.5 flex flex-col justify-between ${
                        showConstructionLines
                          ? 'border border-dashed border-[rgba(20,20,20,0.22)]'
                          : ''
                      }`}
                    >
                      <div className="h-3 w-3/4 bg-[#141414]/85 rounded-[1px]" />
                      <div className="space-y-1.5">
                        <div className="h-1.5 w-full bg-[#141414]/20 rounded-[1px]" />
                        <div className="h-1.5 w-5/6 bg-[#141414]/20 rounded-[1px]" />
                        <div className="h-1.5 w-4/6 bg-[#141414]/20 rounded-[1px]" />
                      </div>
                    </div>
                    <div
                      className={`rounded-[3px] p-2.5 flex flex-col justify-between ${
                        showConstructionLines
                          ? 'border border-dashed border-[rgba(20,20,20,0.22)]'
                          : ''
                      }`}
                    >
                      <div className="h-3 w-3/4 bg-[#141414]/85 rounded-[1px]" />
                      <div className="space-y-1.5">
                        <div className="h-1.5 w-full bg-[#141414]/20 rounded-[1px]" />
                        <div className="h-1.5 w-5/6 bg-[#141414]/20 rounded-[1px]" />
                        <div className="h-1.5 w-4/6 bg-[#141414]/20 rounded-[1px]" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Spread: Dynamic 5/7 */}
                <div className="rounded-lg border border-[rgba(20,20,20,0.2)] bg-[#fbf8f1] p-4">
                  <div className="text-[10.5px] font-semibold uppercase tracking-[0.1em] text-[#141414] mb-3">
                    B · Dynamic Counterpoint (5 + 7 + Hanging Rail)
                  </div>
                  <div className="grid grid-cols-12 gap-3 h-36">
                    <div
                      className={`col-span-5 rounded-[3px] p-2.5 flex flex-col justify-end ${
                        showConstructionLines
                          ? 'border border-dashed border-[rgba(20,20,20,0.25)] bg-[rgba(20,20,20,0.025)]'
                          : ''
                      }`}
                    >
                      <div className="text-[10px] font-mono text-[#86827a] mb-1">FIG. 04</div>
                      <div className="h-1.5 w-4/5 bg-[#141414]/35 rounded-[1px]" />
                    </div>
                    <div
                      className={`col-span-7 rounded-[3px] p-2.5 flex flex-col justify-between ${
                        showConstructionLines
                          ? 'border border-dashed border-[rgba(20,20,20,0.25)]'
                          : ''
                      }`}
                    >
                      <div className="h-4 w-5/6 bg-[#141414] rounded-[1px]" />
                      <div className="space-y-1.5">
                        <div className="h-1.5 w-full bg-[#141414]/25 rounded-[1px]" />
                        <div className="h-1.5 w-11/12 bg-[#141414]/25 rounded-[1px]" />
                        <div className="h-1.5 w-3/4 bg-[#141414]/25 rounded-[1px]" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              </figure>
            </ScrollReveal>
          </section>

          {/* Concept IV + Frame 04: Scale Matrix */}
          <section className="mt-14 md:mt-20 space-y-6">
            <ScrollReveal scrollRoot={scrollEl} active={isOpen}>
              <div className="flex items-baseline gap-3">
                <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#86827a] tabular-nums">
                  CONCEPT 04
                </span>
                <span className="h-px flex-1 bg-[rgba(20,20,20,0.1)]" />
              </div>

              <h2
                className="mt-6 text-[26px] md:text-[34px] leading-[1.06] tracking-[-0.03em] font-semibold"
                style={{ fontFamily: "'Inter Tight', sans-serif" }}
              >
                From Museum Wall to Fluid Viewport
              </h2>

              <p className="mt-6 text-[15px] md:text-[16px] leading-[1.75] text-[#141414]/85">
                In the final section of the book, Vahl translates physical print proportions into
                responsive spatial coordinates. Whether designing a 140mm pocket edition, a three-meter
                exhibition title wall, or a fluid browser canvas, the secret is preserving the
                proportional cadence between focal scale and breathing room rather than hardcoding
                pixel widths.
              </p>
            </ScrollReveal>

            {/* Frame 04: Scale Matrix */}
            <ScrollReveal scrollRoot={scrollEl} active={isOpen} delayMs={100}>
              <figure className="rounded-xl border border-[rgba(20,20,20,0.14)] bg-[#f4f1ea]/90 p-5 md:p-6">
              <div className="pb-3 border-b border-[rgba(20,20,20,0.1)] flex items-center justify-between">
                <span className="text-[10.5px] font-semibold uppercase tracking-[0.12em] text-[#86827a]">
                  FRAME 04 · PROPORTIONAL SCALE MATRIX
                </span>
                <span className="text-[11px] font-mono text-[#86827a]">BASE × 1.327</span>
              </div>

              <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 text-[12px] tabular-nums">
                {[
                  { label: 'Pocket Folio', dim: '140 × 186 mm', cols: '4 Col', ratio: '38%' },
                  { label: 'Monograph', dim: '210 × 278 mm', cols: '8 Col', ratio: '62%' },
                  { label: 'Museum Wall', dim: '3200 × 2400 mm', cols: '12 Col', ratio: '84%' },
                  { label: 'Fluid Screen', dim: 'clamp(320, 100vw)', cols: '3 → 12 Col', ratio: '100%' },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="rounded-lg border border-[rgba(20,20,20,0.12)] bg-[#fbf8f1] p-3.5 flex flex-col justify-between gap-3"
                  >
                    <div>
                      <span className="block text-[10px] uppercase tracking-[0.1em] text-[#86827a]">
                        {item.cols}
                      </span>
                      <span className="block mt-1 font-semibold text-[#141414]">{item.label}</span>
                      <span className="block text-[11px] text-[#86827a]">{item.dim}</span>
                    </div>
                    <div className="h-1.5 w-full rounded-full bg-[rgba(20,20,20,0.08)] overflow-hidden">
                      <div
                        className="h-full bg-[#141414] rounded-full"
                        style={{ width: item.ratio }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              </figure>
            </ScrollReveal>
          </section>

          {/* Closing Colophon & Distinct Close Action */}
          <ScrollReveal scrollRoot={scrollEl} active={isOpen}>
            <footer className="mt-14 md:mt-18 pt-8 border-t border-[rgba(20,20,20,0.14)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <div className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#86827a]">
                  END OF EXCERPT · {book.title} ({book.year})
                </div>
                <p className="mt-1 mb-0 text-[13px] text-[#86827a]">
                  Return to the book spread or continue exploring the studio collection.
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="h-11 px-6 rounded-full bg-[#141414] text-[#f4f1ea] text-[13px] font-medium hover:bg-[#2a2a2a] transition-colors cursor-pointer whitespace-nowrap"
              >
                Close excerpt
              </button>
            </footer>

            <div className="mt-10 pt-5 border-t border-[rgba(20,20,20,0.08)] flex items-center justify-between">
              <CopyrightLabel />
              <SocialIcons />
            </div>
          </ScrollReveal>
        </article>
      </div>
    </div>
  );
};
