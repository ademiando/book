import React from 'react';
import type { BookArticleTheme } from '../lib/articles';

interface ArticleServiceCtaProps {
  theme: BookArticleTheme;
  bookTitle: string;
}

const CUSTOM_INCLUDE_ITEMS = [
  'Custom design and layout.',
  'New features and interactions.',
  'Bespoke animations and motion effects.',
  'API and business system integrations.',
  'Backend development, if required.',
  'Performance optimization and deployment.',
] as const;

export const ArticleServiceCta: React.FC<ArticleServiceCtaProps> = ({
  theme,
  bookTitle,
}) => {
  const mailHref = `mailto:ademiandoo@gmail.com?subject=${encodeURIComponent(
    `The Atelier Inquiry — ${bookTitle}`,
  )}`;

  return (
    <section
      aria-label="Commission or customize this digital experience"
      className="mt-16 md:mt-24 pt-12 md:pt-16 border-t"
      style={{
        borderColor: theme.lineStrong,
        color: theme.ink,
        fontFamily: theme.bodyFont,
      }}
    >
      <div className="max-w-[780px]">
        <div
          className="text-[11px] font-semibold uppercase tracking-[0.14em]"
          style={{ color: theme.muted, fontFamily: theme.monoFont }}
        >
          COMMISSION &amp; LICENSING · THE ATELIER
        </div>

        <h2
          className="mt-4 mb-0 text-[30px] sm:text-[42px] md:text-[54px] leading-[0.96] font-semibold uppercase"
          style={{
            fontFamily: theme.displayFont,
            letterSpacing: theme.headlineTracking ?? '-0.03em',
            color: theme.ink,
            textWrap: 'balance',
          }}
        >
          MAKE THIS EXPERIENCE YOURS.
        </h2>

        <p
          className="mt-4 mb-0 text-[16px] md:text-[18px] leading-[1.6]"
          style={{ color: theme.inkSoft }}
        >
          Turn this digital experience into something uniquely yours. Choose a design,
          customize its details, and make it reflect your brand&apos;s identity.
        </p>
      </div>

      {/* Three Full-Width Hairline Tiers (zero enclosed box frames) */}
      <div
        className="mt-10 md:mt-14 border-t divide-y"
        style={{ borderColor: theme.line, ['--tw-divide-color' as string]: theme.line }}
      >
        {/* Tier 01 */}
        <div
          className="py-8 md:py-10 grid md:grid-cols-[240px_220px_1fr] gap-4 md:gap-8 items-baseline border-b"
          style={{ borderColor: theme.line }}
        >
          <div
            className="text-[12px] font-semibold uppercase tracking-[0.12em]"
            style={{ color: theme.muted, fontFamily: theme.monoFont }}
          >
            01 — READY TO USE
          </div>
          <div>
            <span
              className="block text-[10.5px] font-semibold uppercase tracking-[0.14em] mb-1"
              style={{ color: theme.accent, fontFamily: theme.monoFont }}
            >
              Start
            </span>
            <div
              className="text-[22px] md:text-[26px] font-semibold tracking-[-0.02em] tabular-nums"
              style={{ fontFamily: theme.displayFont, color: theme.ink }}
            >
              IDR 3.000.000
            </div>
          </div>
          <div>
            <h3
              className="m-0 text-[18px] md:text-[20px] font-semibold"
              style={{ color: theme.ink }}
            >
              A complete website, ready for your brand.
            </h3>
            <p
              className="mt-2.5 mb-0 text-[14.5px] md:text-[15.5px] leading-[1.7] max-w-[66ch]"
              style={{ color: theme.inkSoft }}
            >
              Love the design? Get this website deployed and ready to use for your
              business. Includes the complete website implementation with its existing
              design, animations, and interactions, plus initial brand details and launch
              setup (excluding domain, hosting, and third-party fees).
            </p>
          </div>
        </div>

        {/* Tier 02 */}
        <div
          className="py-8 md:py-10 grid md:grid-cols-[240px_220px_1fr] gap-4 md:gap-8 items-baseline border-b"
          style={{ borderColor: theme.line }}
        >
          <div
            className="text-[12px] font-semibold uppercase tracking-[0.12em]"
            style={{ color: theme.muted, fontFamily: theme.monoFont }}
          >
            02 — MADE FOR YOUR BRAND
          </div>
          <div>
            <span
              className="block text-[10.5px] font-semibold uppercase tracking-[0.14em] mb-1"
              style={{ color: theme.accent, fontFamily: theme.monoFont }}
            >
              Start
            </span>
            <div
              className="text-[22px] md:text-[26px] font-semibold tracking-[-0.02em] tabular-nums"
              style={{ fontFamily: theme.displayFont, color: theme.ink }}
            >
              IDR 6.000.000
            </div>
          </div>
          <div>
            <h3
              className="m-0 text-[18px] md:text-[20px] font-semibold"
              style={{ color: theme.ink }}
            >
              Your brand. Your identity. Your experience.
            </h3>
            <p
              className="mt-2.5 mb-0 text-[14.5px] md:text-[15.5px] leading-[1.7] max-w-[66ch]"
              style={{ color: theme.inkSoft }}
            >
              Love the concept but want something more personal? I&apos;ll customize the
              website with your logo, brand identity, colors, content, images, and
              visuals while preserving its signature design and interactions, within an
              agreed revision scope.
            </p>
          </div>
        </div>

        {/* Tier 03 */}
        <div
          className="py-8 md:py-10 grid md:grid-cols-[240px_220px_1fr] gap-4 md:gap-8 items-baseline border-b"
          style={{ borderColor: theme.line }}
        >
          <div
            className="text-[12px] font-semibold uppercase tracking-[0.12em]"
            style={{ color: theme.muted, fontFamily: theme.monoFont }}
          >
            03 — BUILT AROUND YOUR VISION
          </div>
          <div
            className="text-[20px] md:text-[24px] font-semibold tracking-[0.02em] uppercase"
            style={{ fontFamily: theme.displayFont, color: theme.accent }}
          >
            CUSTOM QUOTE
          </div>
          <div>
            <h3
              className="m-0 text-[18px] md:text-[20px] font-semibold"
              style={{ color: theme.ink }}
            >
              More than customization. Built around your vision.
            </h3>
            <p
              className="mt-2.5 mb-0 text-[14.5px] md:text-[15.5px] leading-[1.7] max-w-[66ch]"
              style={{ color: theme.inkSoft }}
            >
              Need something beyond the existing design? Let&apos;s take the experience
              further with custom features, unique interactions, advanced animations, and
              tailored development to bring your vision to life.
            </p>
            <div className="mt-5">
              <div
                className="text-[12px] font-semibold uppercase tracking-[0.1em]"
                style={{ color: theme.muted, fontFamily: theme.monoFont }}
              >
                Custom development includes:
              </div>
              <ul
                className="mt-2.5 pl-0 list-none grid sm:grid-cols-2 gap-x-6 gap-y-1.5 text-[14px] leading-[1.6]"
                style={{ color: theme.inkSoft }}
              >
                {CUSTOM_INCLUDE_ITEMS.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Advisory + Final Let's Talk Action */}
      <div className="mt-10 md:mt-14 grid md:grid-cols-2 gap-8 md:gap-12 items-end">
        <div>
          <h3
            className="m-0 text-[13px] font-semibold uppercase tracking-[0.12em]"
            style={{ color: theme.muted, fontFamily: theme.monoFont }}
          >
            NOT SURE WHICH OPTION FITS?
          </h3>
          <p
            className="mt-3 mb-0 text-[15px] md:text-[16px] leading-[1.68] max-w-[54ch]"
            style={{ color: theme.inkSoft }}
          >
            Not sure where to start or what your project needs? Tell me what you have in
            mind. Let&apos;s discuss the possibilities and find the right solution for
            your brand.
          </p>
        </div>

        <div className="md:text-right">
          <div
            className="text-[13px] font-semibold uppercase tracking-[0.12em]"
            style={{ color: theme.muted, fontFamily: theme.monoFont }}
          >
            LET&apos;S MAKE IT HAPPEN.
          </div>
          <p
            className="mt-2.5 mb-5 text-[16px] md:text-[18px] leading-[1.55]"
            style={{ color: theme.ink }}
          >
            Have an idea? Let&apos;s turn it into an experience worth remembering.
          </p>
          <a
            href={mailHref}
            className="inline-flex items-center gap-2.5 h-12 px-7 rounded-full text-[13px] font-semibold uppercase tracking-[0.08em] transition-transform duration-300 hover:-translate-y-0.5 cursor-pointer whitespace-nowrap"
            style={{
              backgroundColor: theme.accent,
              color: theme.accentInk,
              fontFamily: theme.monoFont,
            }}
          >
            <span>LET&apos;S TALK</span>
            <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
    </section>
  );
};
