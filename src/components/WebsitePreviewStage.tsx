import React, { useEffect, useState } from 'react';
import { AlertCircle, Eye, EyeOff, Monitor, RotateCw, Smartphone } from 'lucide-react';
import { Book, getBookCoverTrimScale, getBookCoverUrl } from '../lib/books';
import { BookArticleTheme } from '../lib/articles';

interface WebsitePreviewStageProps {
  book: Book;
  theme: BookArticleTheme;
  isPreviewActive: boolean;
  onTogglePreview: () => void;
}

export const WebsitePreviewStage: React.FC<WebsitePreviewStageProps> = ({
  book,
  theme,
  isPreviewActive,
  onTogglePreview,
}) => {
  const [viewportMode, setViewportMode] = useState<'desktop' | 'mobile'>('desktop');
  const [reloadTick, setReloadTick] = useState(0);
  const [iframeLoaded, setIframeLoaded] = useState(false);

  useEffect(() => {
    setIframeLoaded(false);
    setReloadTick(0);
  }, [book.id, isPreviewActive]);

  const liveUrl = book.previewUrl;
  const trimScale = getBookCoverTrimScale(book.id);

  return (
    <section
      id="website-preview"
      aria-label={`${book.title} website preview`}
      className="mt-10 md:mt-14 pt-8 border-t"
      style={{ borderColor: theme.lineStrong }}
    >
      {/* Top Bar with Prominent Preview Toggle Button — zero raw URL text */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div
            className="text-[11px] font-semibold uppercase tracking-[0.14em]"
            style={{ color: theme.accent, fontFamily: theme.monoFont }}
          >
            WEBSITE PREVIEW · INTERACTIVE VIEWPORT
          </div>
          <h3
            className={`mt-2 mb-0 text-[24px] md:text-[32px] leading-[1.08] font-semibold ${
              theme.headlineUppercase ? 'uppercase' : ''
            }`}
            style={{
              fontFamily: theme.displayFont,
              letterSpacing: theme.headlineTracking ?? '-0.025em',
              color: theme.ink,
            }}
          >
            {book.title} — Experience Preview
          </h3>
        </div>

        <button
          type="button"
          onClick={onTogglePreview}
          aria-expanded={isPreviewActive}
          className="h-11 px-6 rounded-full inline-flex items-center gap-2 text-[13px] font-semibold transition-opacity hover:opacity-90 cursor-pointer whitespace-nowrap"
          style={{
            backgroundColor: theme.accent,
            color: theme.accentInk,
          }}
        >
          {isPreviewActive ? (
            <>
              <EyeOff className="w-4 h-4" aria-hidden="true" />
              <span>Hide Preview</span>
            </>
          ) : (
            <>
              <Eye className="w-4 h-4" aria-hidden="true" />
              <span>Preview Website</span>
            </>
          )}
        </button>
      </div>

      {/* Embedded Preview Frame */}
      {isPreviewActive && (
        <div
          className="mt-6 border-y overflow-hidden"
          style={{
            borderColor: theme.lineStrong,
            backgroundColor: theme.surface,
          }}
        >
          {!liveUrl && (
            <div
              role="status"
              aria-live="polite"
              className="px-4 md:px-6 py-3.5 flex flex-wrap items-center justify-between gap-3 bg-[#e03a16] text-[#fffaf5]"
            >
              <div className="flex items-center gap-2.5">
                <AlertCircle className="w-4 h-4 shrink-0 text-[#fffaf5]" aria-hidden="true" />
                <span
                  className="text-[12px] md:text-[12.5px] font-bold uppercase tracking-[0.14em]"
                  style={{ fontFamily: theme.monoFont }}
                >
                  Development in Progress
                </span>
              </div>
              <p className="m-0 text-[12.5px] md:text-[13px] font-medium text-[#fffaf5]/95">
                Live website build is currently under active development — interactive concept preview shown below.
              </p>
            </div>
          )}

          {/* Slim Viewport Toolbar (no link text) */}
          <div
            className="flex flex-wrap items-center justify-between gap-3 px-4 md:px-6 py-3 border-b text-[11.5px]"
            style={{
              borderColor: theme.line,
              color: theme.muted,
              fontFamily: theme.monoFont,
            }}
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <span
                className="w-2 h-2 rounded-full shrink-0"
                style={{ backgroundColor: theme.accent }}
              />
              <span className="truncate uppercase tracking-[0.08em]" style={{ color: theme.inkSoft }}>
                {book.title} · {book.format}
              </span>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => setViewportMode('desktop')}
                aria-pressed={viewportMode === 'desktop'}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-[11px] cursor-pointer transition-colors"
                style={{
                  borderColor: viewportMode === 'desktop' ? theme.accent : theme.lineStrong,
                  backgroundColor: viewportMode === 'desktop' ? theme.accent : 'transparent',
                  color: viewportMode === 'desktop' ? theme.accentInk : theme.inkSoft,
                }}
              >
                <Monitor className="w-3 h-3" aria-hidden="true" />
                <span>Desktop</span>
              </button>
              <button
                type="button"
                onClick={() => setViewportMode('mobile')}
                aria-pressed={viewportMode === 'mobile'}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-[11px] cursor-pointer transition-colors"
                style={{
                  borderColor: viewportMode === 'mobile' ? theme.accent : theme.lineStrong,
                  backgroundColor: viewportMode === 'mobile' ? theme.accent : 'transparent',
                  color: viewportMode === 'mobile' ? theme.accentInk : theme.inkSoft,
                }}
              >
                <Smartphone className="w-3 h-3" aria-hidden="true" />
                <span>Mobile</span>
              </button>

              {liveUrl && (
                <button
                  type="button"
                  onClick={() => {
                    setIframeLoaded(false);
                    setReloadTick((t) => t + 1);
                  }}
                  aria-label="Reload preview"
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full border text-[11px] cursor-pointer transition-colors hover:opacity-80"
                  style={{
                    borderColor: theme.lineStrong,
                    color: theme.inkSoft,
                  }}
                >
                  <RotateCw className="w-3 h-3" aria-hidden="true" />
                </button>
              )}
            </div>
          </div>

          {/* Live Site Iframe OR Interactive Edition Viewport */}
          {liveUrl ? (
            <div className="w-full flex justify-center">
              <div
                className={`relative transition-[width] duration-300 ${
                  viewportMode === 'mobile'
                    ? 'w-[390px] max-w-full h-[640px] border-x'
                    : 'w-full h-[540px] md:h-[680px]'
                }`}
                style={{ borderColor: theme.lineStrong }}
              >
                {!iframeLoaded && (
                  <div
                    className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-[12px] uppercase tracking-[0.12em] pointer-events-none"
                    style={{
                      backgroundColor: theme.cardBg,
                      color: theme.muted,
                      fontFamily: theme.monoFont,
                    }}
                  >
                    <span>Loading interactive preview...</span>
                  </div>
                )}
                <iframe
                  key={`${book.id}-${reloadTick}`}
                  src={liveUrl}
                  title={`${book.title} live website preview`}
                  onLoad={() => setIframeLoaded(true)}
                  className="w-full h-full border-0 block"
                  style={{ backgroundColor: theme.bg }}
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          ) : (
            <div className="w-full flex justify-center">
              <div
                className={`relative overflow-hidden transition-[width] duration-300 ${
                  viewportMode === 'mobile'
                    ? 'w-[390px] max-w-full border-x p-6'
                    : 'w-full p-8 md:p-14'
                }`}
                style={{
                  backgroundColor: theme.bg,
                  borderColor: theme.lineStrong,
                  backgroundImage: theme.patternBg !== 'none' ? theme.patternBg : undefined,
                  backgroundSize: theme.patternSize,
                }}
              >
                <div
                  className={`grid gap-8 items-center ${
                    viewportMode === 'mobile' ? 'grid-cols-1' : 'md:grid-cols-[1.2fr_0.8fr]'
                  }`}
                >
                  <div>
                    <div
                      className="text-[11px] uppercase tracking-[0.14em]"
                      style={{ color: theme.accent, fontFamily: theme.monoFont }}
                    >
                      {book.series} · {book.format} · {book.year}
                    </div>
                    <h4
                      className={`mt-3 mb-0 text-[34px] md:text-[52px] leading-[0.95] font-semibold ${
                        theme.headlineUppercase ? 'uppercase' : ''
                      }`}
                      style={{
                        fontFamily: theme.displayFont,
                        color: theme.ink,
                      }}
                    >
                      {book.title}
                    </h4>
                    <p
                      className="mt-4 mb-0 text-[15px] leading-[1.65] max-w-[48ch]"
                      style={{ color: theme.inkSoft }}
                    >
                      {book.note}
                    </p>
                    <div
                      className="mt-6 inline-flex items-center gap-3 text-[12px]"
                      style={{ color: theme.muted, fontFamily: theme.monoFont }}
                    >
                      <span>{book.author}</span>
                      <span>·</span>
                      <span>{book.format}</span>
                    </div>
                  </div>

                  <div className="flex justify-center">
                    <div
                      className="w-[160px] md:w-[210px] aspect-[140/186] overflow-hidden shadow-2xl"
                      style={{ backgroundColor: book.coverColor }}
                    >
                      <img
                        src={getBookCoverUrl(book.id, 900)}
                        alt={book.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover block"
                        style={{
                          transform: trimScale > 1 ? `scale(${trimScale})` : undefined,
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </section>
  );
};
