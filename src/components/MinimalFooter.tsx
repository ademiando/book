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
    <a
      href="https://wa.me/6285726951002"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="WhatsApp 085726951002"
      title="WhatsApp · 085726951002"
      className={ICON_CLASS}
    >
      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12.03 2a9.94 9.94 0 0 0-8.52 15.08L2 22l5.06-1.46A9.95 9.95 0 1 0 12.03 2Zm0 18.14a8.18 8.18 0 0 1-4.18-1.15l-.3-.18-3.01.87.89-2.93-.2-.31a8.18 8.18 0 1 1 6.8 3.7Zm4.49-6.13c-.25-.12-1.46-.72-1.68-.8-.23-.08-.39-.12-.56.13-.16.24-.64.8-.78.96-.15.17-.29.19-.54.06-.25-.12-1.04-.38-1.99-1.22-.73-.65-1.23-1.46-1.37-1.7-.15-.25-.02-.38.1-.51.11-.11.25-.29.37-.43.13-.14.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.13-.56-1.34-.76-1.84-.2-.48-.4-.42-.56-.42h-.47c-.17 0-.44.06-.66.31-.23.25-.87.85-.87 2.08 0 1.22.89 2.41 1.01 2.57.13.17 1.75 2.68 4.25 3.76.59.26 1.06.41 1.42.53.6.19 1.14.16 1.57.1.48-.07 1.46-.6 1.66-1.17.21-.58.21-1.08.15-1.18-.07-.1-.23-.16-.48-.29Z" />
      </svg>
    </a>
  </div>
);

export const CopyrightLabel: React.FC = () => (
  <span className="text-[9.5px] md:text-[10.5px] font-light tracking-[0.06em] md:tracking-[0.08em] text-[#141414]/60 uppercase select-none whitespace-nowrap">
    © ADEMIANDO. ALL RIGHTS RESERVED
  </span>
);
