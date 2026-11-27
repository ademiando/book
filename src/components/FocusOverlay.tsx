import React, { useEffect, useState } from 'react';
import { ArrowLeft, Bookmark, X } from 'lucide-react';
import { Book, getBookCoverUrl } from '../lib/books';
import { getBookArticleTheme } from '../lib/articles';
import { computeFocusBookTarget, getBookDimensions } from '../lib/physics';
import type { ArticlePhase } from './BookStage';
import { CopyrightLabel, SocialIcons } from './MinimalFooter';

interface FocusOverlayProps {
  book: Book | null;
  isSampleOpen: boolean;
  articlePhase: ArticlePhase;
  isOnShelf: boolean;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  onToggleSample: () => void;
  onOpenArticle: () => void;
  onCloseArticle: () => void;
  onAddToShelf: (book: Book, sourceEl: HTMLElement | null) => void;
  onRemoveFromShelf: (id: string) => void;
}

export const FocusOverlay: React.FC<FocusOverlayProps> = ({
  book,
  isSampleOpen,
  articlePhase,
  isOnShelf,
  onClose,
  onPrev,
  onNext,
  onToggleSample,
  onOpenArticle,
  onCloseArticle,
  onAddToShelf,
  onRemoveFromShelf,
}) => {
  const [viewport, setViewport] = useState(() => ({
    w: typeof window !== 'undefined' ? window.innerWidth : 1440,
    h: typeof window !== 'undefined' ? window.innerHeight : 900,
  }));

  useEffect(() => {
    const onResize = () => setViewport({ w: window.innerWidth, h: window.innerHeight });
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    if (!book) return;
    const isArticleActive =
      articlePhase === 'turning' || articlePhase === 'zooming' || articlePhase === 'open';
    const isAnyArticlePhase = articlePhase !== 'closed';
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        if (isArticleActive) {
          onCloseArticle();
        } else if (!isAnyArticlePhase) {
          onClose();
        }
      } else if (e.key === 'ArrowLeft' && !isAnyArticlePhase) {
        e.preventDefault();
        onPrev();
      } else if (e.key === 'ArrowRight' && !isAnyArticlePhase) {
        e.preventDefault();
        onNext();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [book, articlePhase, onClose, onCloseArticle, onPrev, onNext]);

  const isOpen = Boolean(book);
  const showArticle = Boolean(book && articlePhase !== 'closed');
  const isArticleDismissible = Boolean(
    book && (articlePhase === 'turning' || articlePhase === 'zooming' || articlePhase === 'open'),
  );
  const isDarkArticleSurface = Boolean(
    book &&
      getBookArticleTheme(book).isDark &&
      (articlePhase === 'zooming' || articlePhase === 'open'),
  );

  const dims = getBookDimensions(viewport.w);
  const focusPose = computeFocusBookTarget(viewport.w, viewport.h, dims, isSampleOpen, 0.5, 0.5);
  const bookW = dims.bw * focusPose.s;
  const bookH = dims.bh * focusPose.s;
  const arrowRowTop = Math.min(
    viewport.h - 68,
    Math.round(focusPose.y + bookH * 0.5 + (dims.isMobile ? 12 : 18)),
  );
  const arrowRowLeft = dims.isMobile
    ? 20
    : Math.max(
        28,
        Math.round(focusPose.x - bookW * (isSampleOpen ? 1.42 : 0.5)),
      );
  const arrowRowRight = dims.isMobile
    ? viewport.w - 20
    : Math.min(Math.round(viewport.w * 0.54), Math.round(focusPose.x + bookW * 0.5));
  const arrowRowWidth = Math.max(200, arrowRowRight - arrowRowLeft);

  const handleShelfClick = () => {
    if (!book) return;
    if (isOnShelf) {
      onRemoveFromShelf(book.id);
      return;
    }
    const coverEl = document.querySelector<HTMLElement>(
      `[data-book-cover="${book.index}"]`,
    );
    onAddToShelf(book, coverEl);
  };

  return (
    <>
      {/* Top-left round close/back button with smooth morph between X and back arrow */}
      <button
        type="button"
        onClick={() => {
          if (isArticleDismissible) {
            onCloseArticle();
          } else if (!showArticle) {
            onClose();
          }
        }}
        aria-label={isArticleDismissible ? 'Back to book spread' : 'Close book focus view'}
        aria-hidden={!isOpen}
        tabIndex={isOpen ? 0 : -1}
        className={`group fixed top-4 left-4 md:top-6 md:left-7 z-40 w-10 h-10 rounded-full inline-flex items-center justify-center transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isDarkArticleSurface
            ? 'bg-[#f4f1ea] text-[#141414] shadow-[0_8px_20px_rgba(0,0,0,0.35)]'
            : 'bg-[#141414] text-[#f4f1ea] shadow-[0_8px_20px_rgba(20,20,20,0.2)]'
        } ${
          isOpen
            ? 'opacity-100 scale-100 pointer-events-auto hover:scale-105 cursor-pointer'
            : 'opacity-0 scale-0 pointer-events-none'
        }`}
      >
        <span className="relative w-4 h-4 inline-flex items-center justify-center">
          <X
            aria-hidden="true"
            className={`absolute inset-0 m-auto w-4 h-4 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              !isOpen
                ? 'opacity-0 -rotate-180 scale-50'
                : isArticleDismissible
                  ? 'opacity-0 -rotate-90 scale-50'
                  : 'opacity-100 rotate-0 scale-100 group-hover:rotate-90'
            }`}
          />
          <ArrowLeft
            aria-hidden="true"
            className={`absolute inset-0 m-auto w-4 h-4 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              isOpen && isArticleDismissible
                ? 'opacity-100 rotate-0 translate-x-0 scale-100 group-hover:-translate-x-0.5'
                : 'opacity-0 rotate-90 translate-x-1.5 scale-50'
            }`}
          />
        </span>
      </button>

      {book && (
        <div
          className="fixed inset-0 z-35 pointer-events-none"
          role="dialog"
          aria-modal="true"
          aria-label={`${book.title} details`}
        >

      {/* Side panel (left 57% on desktop; bottom sheet on <760px without note) */}
      <aside
        key={book.id}
        className={`fixed left-5 right-5 bottom-24 md:bottom-auto md:right-8 md:left-[57%] md:top-1/2 md:-translate-y-1/2 max-w-[440px] focus-stagger transition-opacity duration-300 ease-out ${
          showArticle ? 'opacity-0 pointer-events-none' : 'pointer-events-auto opacity-100'
        }`}
      >
        <div className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#86827a]">
          {book.category} · {book.year}
        </div>

        <h2
          className="mt-2 mb-0 text-[#141414] text-[30px] md:text-[clamp(34px,4vw,62px)] leading-[0.98] tracking-[-0.035em] font-semibold"
          style={{ fontFamily: "'Inter Tight', sans-serif" }}
        >
          {book.title}
        </h2>

        <p className="mt-2 mb-0 text-[15px] text-[#86827a]">by {book.author}</p>

        <div className="mt-4 md:mt-6 py-3 border-y border-[rgba(20,20,20,0.1)] grid grid-cols-3 gap-3 text-[12px] tabular-nums">
          <div>
            <span className="block text-[#86827a] text-[11px]">Format</span>
            <span className="font-medium text-[#141414]">{book.pages}</span>
          </div>
          <div>
            <span className="block text-[#86827a] text-[11px]">Edition</span>
            <span className="font-medium text-[#141414]">Hardcover · {book.year}</span>
          </div>
          <div>
            <span className="block text-[#86827a] text-[11px]">Series</span>
            <span className="font-medium text-[#141414]">{book.score.toFixed(1)} / 5</span>
          </div>
        </div>

        {/* Note hidden on mobile (<760px) per spec */}
        <p className="hidden md:block mt-5 mb-0 text-[15px] leading-[1.6] text-[#141414]/85">
          {book.note}
        </p>

        <div className="mt-5 md:mt-7 flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            onClick={onOpenArticle}
            className="h-11 px-5 rounded-full bg-[#141414] text-[#f4f1ea] text-[13px] font-medium hover:bg-[#2a2a2a] transition-colors cursor-pointer whitespace-nowrap"
          >
            Read excerpt
          </button>

          <button
            type="button"
            onClick={handleShelfClick}
            aria-pressed={isOnShelf}
            aria-label={isOnShelf ? 'Remove from saved' : 'Save work'}
            className={`h-11 px-5 rounded-full text-[13px] font-medium border transition-all cursor-pointer inline-flex items-center gap-2 whitespace-nowrap ${
              isOnShelf
                ? 'bg-[#fbfaf6] text-[#141414] border-[#141414] shadow-sm'
                : 'bg-transparent text-[#141414] border-[rgba(20,20,20,0.22)] hover:border-[#141414]'
            }`}
          >
            <Bookmark
              className="w-3.5 h-3.5 transition-colors duration-200"
              fill={isOnShelf ? '#141414' : 'none'}
              stroke="#141414"
              aria-hidden="true"
            />
            <span>Save</span>
          </button>
        </div>
      </aside>

      {/* Prev/Next elongated borderless arrows directly beneath the book on left/right edges */}
      <div
        className={`pointer-events-none fixed flex items-center justify-between transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          showArticle ? 'opacity-0 pointer-events-none' : ''
        }`}
        style={{
          top: `${arrowRowTop}px`,
          left: `${arrowRowLeft}px`,
          width: `${arrowRowWidth}px`,
        }}
      >
        <button
          type="button"
          onClick={onPrev}
          aria-label="Previous book"
          className="group pointer-events-auto py-2 pr-3 pl-0 bg-transparent border-0 text-[#141414]/80 hover:text-[#141414] inline-flex items-center justify-start transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#141414] rounded-sm"
        >
          <svg
            width="34"
            height="14"
            viewBox="0 0 34 14"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            className="transition-transform duration-300 group-hover:-translate-x-1"
          >
            <path d="M32 7H2" />
            <path d="M8 1L2 7l6 6" />
          </svg>
        </button>

        <button
          type="button"
          onClick={onNext}
          aria-label="Next book"
          className="group pointer-events-auto py-2 pl-3 pr-0 bg-transparent border-0 text-[#141414]/80 hover:text-[#141414] inline-flex items-center justify-end transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#141414] rounded-sm"
        >
          <svg
            width="34"
            height="14"
            viewBox="0 0 34 14"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            className="transition-transform duration-300 group-hover:translate-x-1"
          >
            <path d="M2 7h30" />
            <path d="M26 1l6 6-6 6" />
          </svg>
        </button>
      </div>

      {/* Bottom row: thin copyright footer & monochrome social icons */}
      <div
        className={`pointer-events-none fixed inset-x-0 bottom-0 px-4 pb-3.5 md:px-7 md:pb-6 flex items-center justify-between transition-opacity duration-300 ease-out ${
          showArticle ? 'opacity-0' : 'opacity-100'
        }`}
      >
        <div className={showArticle ? 'pointer-events-none' : 'pointer-events-auto'}>
          <CopyrightLabel />
        </div>
        <div className={showArticle ? 'pointer-events-none' : 'pointer-events-auto'}>
          <SocialIcons />
        </div>
      </div>
        </div>
      )}
    </>
  );
};

export function launchFlyToShelfAnimation(
  book: Book,
  sourceEl: HTMLElement | null,
  targetEl: HTMLElement | null,
) {
  if (!targetEl) return;

  const targetRect = targetEl.getBoundingClientRect();
  const srcRect = sourceEl?.getBoundingClientRect() ?? {
    left: window.innerWidth * 0.35,
    top: window.innerHeight * 0.4,
    width: 140,
    height: 186,
  };

  const clone = document.createElement('div');
  clone.style.position = 'fixed';
  clone.style.left = '0';
  clone.style.top = '0';
  clone.style.width = `${srcRect.width}px`;
  clone.style.height = `${srcRect.height}px`;
  clone.style.borderRadius = '4px';
  clone.style.overflow = 'hidden';
  clone.style.backgroundColor = book.coverColor;
  clone.style.boxShadow = '0 14px 32px rgba(20,20,20,0.28)';
  clone.style.pointerEvents = 'none';
  clone.style.zIndex = '9998';
  clone.style.transformOrigin = 'center center';

  const img = document.createElement('img');
  img.src = getBookCoverUrl(book.id, 300);
  img.alt = '';
  img.referrerPolicy = 'no-referrer';
  img.style.width = '100%';
  img.style.height = '100%';
  img.style.objectFit = 'cover';
  clone.appendChild(img);
  document.body.appendChild(clone);

  const startX = srcRect.left + srcRect.width * 0.5;
  const startY = srcRect.top + srcRect.height * 0.5;
  const endX = targetRect.left + targetRect.width * 0.5;
  const endY = targetRect.top + targetRect.height * 0.5;
  const ctrlX = (startX + endX) * 0.5 + 80;
  const ctrlY = Math.min(startY, endY) - 140;

  const duration = 1150;
  const start = performance.now();

  const step = (now: number) => {
    const t = Math.min(1, (now - start) / duration);
    const ease = 1 - Math.pow(1 - t, 3.4);
    const inv = 1 - ease;

    const x = inv * inv * startX + 2 * inv * ease * ctrlX + ease * ease * endX;
    const y = inv * inv * startY + 2 * inv * ease * ctrlY + ease * ease * endY;
    const scale = 1 - 0.92 * ease; // scales down to 0.08
    const rot = ease * 38;
    const opacity = t > 0.86 ? 1 - (t - 0.86) / 0.14 : 1;

    clone.style.transform = `translate3d(${x - srcRect.width * 0.5}px, ${y - srcRect.height * 0.5}px, 0) rotate(${rot}deg) scale(${scale})`;
    clone.style.opacity = `${opacity}`;

    if (t < 1) {
      window.requestAnimationFrame(step);
    } else {
      clone.remove();
    }
  };

  window.requestAnimationFrame(step);
}
