import React from 'react';
import { Book } from '../lib/books';

interface GridArticlePageTopProps {
  book: Book;
  interactive?: boolean;
  columnPreset?: 4 | 8 | 12;
  onSelectColumnPreset?: (cols: 4 | 8 | 12) => void;
  showPaperGrid?: boolean;
}

export const GridArticlePageTop: React.FC<GridArticlePageTopProps> = ({
  book,
  interactive = false,
  columnPreset = 12,
  onSelectColumnPreset,
  showPaperGrid = false,
}) => {
  return (
    <div
      className="relative w-full text-left"
      style={
        showPaperGrid
          ? {
              backgroundColor: '#fbf8f1',
              backgroundImage:
                'linear-gradient(to right, rgba(20,20,20,0.017) 1px, transparent 1px), linear-gradient(to bottom, rgba(20,20,20,0.017) 1px, transparent 1px)',
              backgroundSize: '48px 48px',
            }
          : undefined
      }
    >
      {/* Editorial Monograph Header — identical on Page 2 & full article */}
      <header className="border-b border-[rgba(20,20,20,0.14)] pb-8 md:pb-10">
        <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#86827a]">
          <span>SYSTEMS · MONOGRAPH · EXCERPT II</span>
          <span className="tabular-nums">60 RECONSTRUCTED LAYOUTS · PP. 02–18</span>
        </div>

        <h1
          className="mt-4 mb-0 text-[clamp(36px,6vw,72px)] leading-[0.94] tracking-[-0.04em] font-semibold text-[#141414]"
          style={{ fontFamily: "'Inter Tight', sans-serif" }}
        >
          GRID — The Architecture of Quiet Order
        </h1>

        <p className="mt-4 mb-0 max-w-[640px] text-[16px] md:text-[19px] leading-[1.55] text-[#141414]/80">
          {book.note} Below is the expanded studio essay and four structural frames rebuilt from
          archival railway timetables, exhibition walls, and contemporary editorial spreads.
        </p>

        <dl className="mt-7 grid grid-cols-2 sm:grid-cols-4 gap-4 pt-5 border-t border-[rgba(20,20,20,0.1)] text-[12px] tabular-nums">
          <div>
            <dt className="text-[#86827a] text-[11px] uppercase tracking-[0.08em]">Author</dt>
            <dd className="mt-0.5 font-medium text-[#141414]">{book.author}</dd>
          </div>
          <div>
            <dt className="text-[#86827a] text-[11px] uppercase tracking-[0.08em]">Edition</dt>
            <dd className="mt-0.5 font-medium text-[#141414]">Hardcover · {book.year}</dd>
          </div>
          <div>
            <dt className="text-[#86827a] text-[11px] uppercase tracking-[0.08em]">Frames</dt>
            <dd className="mt-0.5 font-medium text-[#141414]">04 Structural Plates</dd>
          </div>
          <div>
            <dt className="text-[#86827a] text-[11px] uppercase tracking-[0.08em]">Reading</dt>
            <dd className="mt-0.5 font-medium text-[#141414]">06 Min Essay</dd>
          </div>
        </dl>
      </header>

      {/* Concept I + Frame 01 */}
      <section className="mt-12 md:mt-16 space-y-6">
        <div>
          <div className="flex items-baseline gap-3">
            <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#86827a] tabular-nums">
              CONCEPT 01
            </span>
            <span className="h-px flex-1 bg-[rgba(20,20,20,0.1)]" />
          </div>

          <h2
            className="mt-6 text-[26px] md:text-[34px] leading-[1.06] tracking-[-0.03em] font-semibold"
            style={{ fontFamily: "'Inter Tight', sans-serif" }}
          >
            Structure Before Ornament: The Acoustic Chamber of the Page
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6 text-[15px] md:text-[16px] leading-[1.7] text-[#141414]/85">
          <p className="m-0">
            Most designers meet the grid as a set of rules handed down without context: twelve
            columns, twenty-pixel gutters, rigid margins. Treated as dogma, a grid produces
            uniform boxes that feel mechanical before a single word is placed. Treated as an
            acoustic chamber, however, the grid is simply the geometry that lets silence carry
            weight.
          </p>
          <p className="m-0">
            Before setting a headline or cropping an image, Ines Vahl starts with three ratios:
            the outer margin breathing room, the gutter width that separates independent thoughts,
            and the vertical baseline cadence. Once those intervals are fixed, every element on
            the sheet finds its natural resting place without guesswork.
          </p>
        </div>

        {/* Frame 01: Interactive Column Ratio Specimen */}
        <figure className="mt-6 rounded-xl border border-[rgba(20,20,20,0.14)] bg-[#f4f1ea]/90 p-5 md:p-6">
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[rgba(20,20,20,0.1)]">
            <div>
              <span className="block text-[10.5px] font-semibold uppercase tracking-[0.12em] text-[#86827a]">
                FRAME 01 · MODULAR RATIO STUDY
              </span>
              <span className="text-[13px] font-medium text-[#141414]">
                Interactive {columnPreset}-Column Page Matrix (Margin 1 : Gutter 0.38)
              </span>
            </div>
            <div className="inline-flex items-center gap-1 rounded-full border border-[rgba(20,20,20,0.12)] bg-[#fbf8f1] p-1">
              {([4, 8, 12] as const).map((cols) =>
                interactive ? (
                  <button
                    key={cols}
                    type="button"
                    onClick={() => onSelectColumnPreset?.(cols)}
                    className={`px-2.5 py-1 rounded-full text-[11px] font-medium tabular-nums transition-colors cursor-pointer ${
                      columnPreset === cols
                        ? 'bg-[#141414] text-[#f4f1ea]'
                        : 'text-[#141414]/75 hover:text-[#141414]'
                    }`}
                  >
                    {cols} col
                  </button>
                ) : (
                  <span
                    key={cols}
                    className={`px-2.5 py-1 rounded-full text-[11px] font-medium tabular-nums ${
                      columnPreset === cols
                        ? 'bg-[#141414] text-[#f4f1ea]'
                        : 'text-[#141414]/75'
                    }`}
                  >
                    {cols} col
                  </span>
                ),
              )}
            </div>
          </div>

          <div className="mt-5 relative rounded-lg border border-[rgba(20,20,20,0.12)] bg-[#fbf8f1] p-4 md:p-6 overflow-hidden">
            <div
              className="grid gap-2 md:gap-2.5 h-36 md:h-44"
              style={{ gridTemplateColumns: `repeat(${columnPreset}, minmax(0, 1fr))` }}
            >
              {Array.from({ length: columnPreset }).map((_, idx) => (
                <div
                  key={idx}
                  className="relative rounded-[3px] border border-dashed border-[rgba(20,20,20,0.18)] bg-[rgba(20,20,20,0.03)] flex flex-col justify-between p-1.5"
                >
                  <span className="text-[9px] tabular-nums text-[#86827a]">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  {idx < Math.floor(columnPreset / 2) && (
                    <span className="h-2.5 rounded-[2px] bg-[#141414]/80" />
                  )}
                </div>
              ))}
            </div>

            <div className="mt-4 grid grid-cols-12 gap-2.5 text-[11px] tabular-nums text-[#86827a]">
              <div className="col-span-5 rounded-[4px] bg-[#141414] text-[#f4f1ea] px-3 py-2 flex items-center justify-between">
                <span>Primary Mass</span>
                <span>{Math.round((5 / 12) * 100)}%</span>
              </div>
              <div className="col-span-7 rounded-[4px] border border-[rgba(20,20,20,0.2)] px-3 py-2 flex items-center justify-between text-[#141414]">
                <span>Editorial Field &amp; Counter-Margin</span>
                <span>{Math.round((7 / 12) * 100)}%</span>
              </div>
            </div>
          </div>

          <figcaption className="mt-3 text-[12px] text-[#86827a] leading-relaxed">
            Notice how subdividing from 4 to 12 columns increases placement granularity without
            changing the outer margin discipline.
          </figcaption>
        </figure>
      </section>
    </div>
  );
};
