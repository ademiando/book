import React from 'react';
import { Book } from '../lib/books';
import { getBookArticleHeaderData } from '../lib/articles';

interface GridArticleHeaderProps {
  book: Book;
}

export const GridArticleHeader: React.FC<GridArticleHeaderProps> = ({ book }) => {
  const header = getBookArticleHeaderData(book);

  return (
    <header className="border-b border-[rgba(20,20,20,0.14)] pb-8 md:pb-10 text-left">
      <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#86827a]">
        <span>{header.kickerLeft}</span>
        <span className="tabular-nums">{header.kickerRight}</span>
      </div>

      <h1
        className="mt-4 mb-0 text-[clamp(36px,6vw,72px)] leading-[0.94] tracking-[-0.04em] font-semibold text-[#141414]"
        style={{ fontFamily: "'Inter Tight', sans-serif" }}
      >
        {header.headline}
      </h1>

      <p className="mt-4 mb-0 max-w-[640px] text-[16px] md:text-[19px] leading-[1.55] text-[#141414]/80">
        {header.intro}
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
          <dd className="mt-0.5 font-medium text-[#141414]">{header.framesValue}</dd>
        </div>
        <div>
          <dt className="text-[#86827a] text-[11px] uppercase tracking-[0.08em]">Reading</dt>
          <dd className="mt-0.5 font-medium text-[#141414]">{header.readingValue}</dd>
        </div>
      </dl>
    </header>
  );
};
