import React from 'react';
import { Book } from '../lib/books';
import { getBookArticleHeaderData, getBookArticleTheme } from '../lib/articles';

interface GridArticleHeaderProps {
  book: Book;
}

export const GridArticleHeader: React.FC<GridArticleHeaderProps> = ({ book }) => {
  const header = getBookArticleHeaderData(book);
  const theme = getBookArticleTheme(book);

  return (
    <header
      className="pb-8 md:pb-10 text-left border-b"
      style={{
        borderColor: theme.lineStrong,
        fontFamily: theme.bodyFont,
        color: theme.ink,
      }}
    >
      <div
        className="flex flex-wrap items-center justify-between gap-2 text-[11px] font-semibold uppercase tracking-[0.14em]"
        style={{
          color: theme.muted,
          fontFamily: theme.monoFont,
        }}
      >
        <span>{header.kickerLeft}</span>
        <span className="tabular-nums">{header.kickerRight}</span>
      </div>

      <h1
        className={`mt-4 mb-0 text-[clamp(36px,6vw,72px)] leading-[0.95] font-semibold ${
          theme.headlineUppercase ? 'uppercase tracking-[-0.015em]' : ''
        } ${theme.headlineItalic ? 'italic font-medium' : ''}`}
        style={{
          fontFamily: theme.displayFont,
          letterSpacing: theme.headlineTracking ?? '-0.04em',
          color: theme.ink,
          textWrap: 'balance',
        }}
      >
        {header.headline}
      </h1>

      <p
        className="mt-4 mb-0 max-w-[640px] text-[16px] md:text-[19px] leading-[1.58]"
        style={{ color: theme.inkSoft }}
      >
        {header.intro}
      </p>

      <dl
        className="mt-7 grid grid-cols-2 sm:grid-cols-4 gap-4 pt-5 border-t text-[12px] tabular-nums"
        style={{ borderColor: theme.line }}
      >
        <div>
          <dt
            className="text-[11px] uppercase tracking-[0.08em]"
            style={{ color: theme.muted, fontFamily: theme.monoFont }}
          >
            Author
          </dt>
          <dd className="mt-0.5 font-medium" style={{ color: theme.ink }}>
            {book.author}
          </dd>
        </div>
        <div>
          <dt
            className="text-[11px] uppercase tracking-[0.08em]"
            style={{ color: theme.muted, fontFamily: theme.monoFont }}
          >
            Format
          </dt>
          <dd className="mt-0.5 font-medium" style={{ color: theme.ink }}>
            {book.format}
          </dd>
        </div>
        <div>
          <dt
            className="text-[11px] uppercase tracking-[0.08em]"
            style={{ color: theme.muted, fontFamily: theme.monoFont }}
          >
            Series
          </dt>
          <dd className="mt-0.5 font-medium" style={{ color: theme.ink }}>
            {book.series}
          </dd>
        </div>
        <div>
          <dt
            className="text-[11px] uppercase tracking-[0.08em]"
            style={{ color: theme.muted, fontFamily: theme.monoFont }}
          >
            Edition
          </dt>
          <dd className="mt-0.5 font-medium" style={{ color: theme.ink }}>
            Hardcover · {book.year}
          </dd>
        </div>
      </dl>
    </header>
  );
};

