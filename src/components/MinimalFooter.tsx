import React from 'react';

const ICON_CLASS =
  'w-7 h-7 rounded-full inline-flex items-center justify-center text-[#141414]/75 hover:bg-[#141414] hover:text-[#f4f1ea] hover:-translate-y-0.5 hover:shadow-[0_6px_14px_rgba(20,20,20,0.16)] active:scale-90 active:bg-[#141414] active:text-[#f4f1ea] transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#141414]';

export const SocialIcons: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`flex items-center gap-1 md:gap-1.5 ${className}`} aria-label="Social links">
    <a
      href="https://github.com/ademiando"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="GitHub ademiando"
      title="GitHub · ademiando"
      className={ICON_CLASS}
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
      className={ICON_CLASS}
    >
      <svg
        className="w-3.5 h-3.5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    </a>
  </div>
);

export const CopyrightLabel: React.FC = () => (
  <span className="text-[9.5px] md:text-[10.5px] font-light tracking-[0.06em] md:tracking-[0.08em] text-[#141414]/60 uppercase select-none whitespace-nowrap">
    © ADEMIANDO. ALL RIGHTS RESERVED
  </span>
);
