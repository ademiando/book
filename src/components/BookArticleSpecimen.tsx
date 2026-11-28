import React, { useState } from 'react';
import type { BookArticleTheme, SampleArticleContent } from '../lib/articles';

interface BookArticleSpecimenProps {
  theme: BookArticleTheme;
  content: SampleArticleContent;
}

export const BookArticleSpecimen: React.FC<BookArticleSpecimenProps> = ({
  theme,
  content,
}) => {
  const [burnView, setBurnView] = useState<'hero' | 'grades' | 'export'>('hero');
  const [galleryRoom, setGalleryRoom] = useState<'spatial' | 'sales' | 'custom'>('spatial');
  const [identitySurface, setIdentitySurface] = useState<'Print' | 'Web' | 'Space'>('Print');
  const [matterCondition, setMatterCondition] = useState<'daylight' | 'lowlight'>('lowlight');
  const [weatherSeason, setWeatherSeason] = useState<'cold' | 'temperate' | 'warm'>('cold');
  const [smallEdited, setSmallEdited] = useState(true);
  const [quietDensity, setQuietDensity] = useState<'patient' | 'dense'>('patient');
  const [colourTriadIdx, setColourTriadIdx] = useState(0);
  const [motionMode, setMotionMode] = useState<'editorial' | 'linear'>('editorial');
  const [motionReplayKey, setMotionReplayKey] = useState(0);
  const [honestMeasure, setHonestMeasure] = useState<52 | 66 | 85>(66);
  const [signalFocused, setSignalFocused] = useState(true);

  const btnStyle = (active: boolean): React.CSSProperties => ({
    backgroundColor: active ? theme.accent : 'transparent',
    color: active ? theme.accentInk : theme.inkSoft,
    borderColor: active ? theme.accent : theme.lineStrong,
    fontFamily: theme.monoFont,
  });

  const renderInteractiveStage = () => {
    switch (theme.specimenKind) {
      case 'burn-briquette':
        return (
          <div className="space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <span
                className="text-[11px] uppercase tracking-[0.12em]"
                style={{ color: theme.muted, fontFamily: theme.monoFont }}
              >
                CHARCOAL BRIQUETTE LANDING PAGE · INTERACTIVE PREVIEW
              </span>
              <div className="inline-flex flex-wrap gap-1.5">
                {(
                  [
                    ['hero', 'Hero Ember Stage'],
                    ['grades', 'Briquette Grades'],
                    ['export', 'Export & RFQ'],
                  ] as const
                ).map(([key, label]) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setBurnView(key)}
                    className="px-3.5 py-1.5 rounded-full border text-[11px] uppercase tracking-[0.08em] cursor-pointer transition-colors"
                    style={btnStyle(burnView === key)}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            <div
              className="relative py-10 md:py-14 px-5 md:px-10 border-y overflow-hidden transition-all duration-300"
              style={{
                backgroundColor: burnView === 'hero' ? '#1c120d' : theme.cardBg,
                borderColor: theme.lineStrong,
              }}
            >
              {burnView === 'hero' && (
                <div className="grid md:grid-cols-[1.2fr_0.8fr] gap-8 items-end">
                  <div>
                    <span
                      className="text-[11px] uppercase tracking-[0.14em]"
                      style={{ color: theme.accent, fontFamily: theme.monoFont }}
                    >
                      100% COCONUT SHELL · EXPORT GRADE A+
                    </span>
                    <div
                      className="mt-3 text-[44px] sm:text-[64px] md:text-[84px] leading-[0.86] font-bold uppercase"
                      style={{ fontFamily: theme.displayFont, color: theme.ink }}
                    >
                      PURE IGNITION. ZERO SMOKE.
                    </div>
                    <p
                      className="mt-4 mb-0 text-[15px] max-w-[56ch]"
                      style={{ color: theme.inkSoft }}
                    >
                      3D hero lighting follows pointer depth across stacked hexagonal and
                      cube briquettes—pairable with custom factory video loops or WebGL embers.
                    </p>
                  </div>
                  <div
                    className="grid grid-cols-2 gap-4 pt-4 md:pt-0 border-t md:border-t-0 md:border-l md:pl-8 tabular-nums"
                    style={{ borderColor: theme.line, fontFamily: theme.monoFont }}
                  >
                    <div>
                      <div className="text-[11px]" style={{ color: theme.muted }}>
                        ASH CONTENT
                      </div>
                      <div className="text-[26px] font-bold" style={{ color: theme.accent }}>
                        &lt; 2.1%
                      </div>
                    </div>
                    <div>
                      <div className="text-[11px]" style={{ color: theme.muted }}>
                        FIXED CARBON
                      </div>
                      <div className="text-[26px] font-bold" style={{ color: theme.ink }}>
                        82%
                      </div>
                    </div>
                    <div>
                      <div className="text-[11px]" style={{ color: theme.muted }}>
                        BURN TIME
                      </div>
                      <div className="text-[26px] font-bold" style={{ color: theme.ink }}>
                        140 min
                      </div>
                    </div>
                    <div>
                      <div className="text-[11px]" style={{ color: theme.muted }}>
                        CALORIFIC
                      </div>
                      <div className="text-[26px] font-bold" style={{ color: theme.accent }}>
                        7,500 kcal
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {burnView === 'grades' && (
                <div className="grid sm:grid-cols-3 gap-6">
                  {[
                    {
                      shape: 'CUBE 25 × 25 MM',
                      use: 'Premium Shisha & Hookah Export',
                      spec: 'White Ash · Zero Odor · 72 pcs / kg',
                    },
                    {
                      shape: 'HEXAGONAL 50 MM',
                      use: 'BBQ & Commercial Restaurant Grade',
                      spec: '4+ Hours Steady Heat · Smokeless',
                    },
                    {
                      shape: 'PILLOW & FINGER',
                      use: 'OEM Retail & Private Label Bags',
                      spec: 'Custom Carton & Moisture Barrier Foil',
                    },
                  ].map((item) => (
                    <div
                      key={item.shape}
                      className="pt-4 border-t"
                      style={{ borderColor: theme.lineStrong }}
                    >
                      <div
                        className="text-[11px] uppercase tracking-[0.1em]"
                        style={{ color: theme.accent, fontFamily: theme.monoFont }}
                      >
                        {item.shape}
                      </div>
                      <div
                        className="mt-2 text-[20px] font-semibold uppercase"
                        style={{ fontFamily: theme.displayFont, color: theme.ink }}
                      >
                        {item.use}
                      </div>
                      <p className="mt-2 mb-0 text-[13.5px]" style={{ color: theme.muted }}>
                        {item.spec}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {burnView === 'export' && (
                <div className="grid md:grid-cols-3 gap-6 items-center">
                  <div className="md:col-span-2">
                    <div
                      className="text-[24px] md:text-[32px] font-semibold uppercase"
                      style={{ fontFamily: theme.displayFont, color: theme.ink }}
                    >
                      FOB SEMARANG / SURABAYA · 20FT &amp; 40FT HC CONTAINERS
                    </div>
                    <p className="mt-2 mb-0 text-[14.5px]" style={{ color: theme.inkSoft }}>
                      Built-in distributor lead capture, MOQ breakdown, SGS lab report
                      download links, and instant WhatsApp export desk routing.
                    </p>
                  </div>
                  <div
                    className="text-[12px] space-y-1.5 border-l pl-5"
                    style={{ borderColor: theme.lineStrong, fontFamily: theme.monoFont }}
                  >
                    <div style={{ color: theme.accent }}>• CUSTOM PACKAGING MOCKUPS</div>
                    <div style={{ color: theme.inkSoft }}>• MULTILINGUAL EN / AR / ID</div>
                    <div style={{ color: theme.inkSoft }}>• CONTAINER CALCULATOR READY</div>
                  </div>
                </div>
              )}
            </div>
          </div>
        );

      case 'gallery-exhibition':
        return (
          <div className="space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <span
                className="text-[11px] uppercase tracking-[0.12em]"
                style={{ color: theme.muted, fontFamily: theme.monoFont }}
              >
                3D MOTION ART GALLERY · LIVE MODE PREVIEW
              </span>
              <div className="inline-flex flex-wrap gap-1.5">
                {(
                  [
                    ['spatial', '3D Exhibition Room'],
                    ['sales', 'Artwork & Sales'],
                    ['custom', 'Custom Curatorial'],
                  ] as const
                ).map(([key, label]) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setGalleryRoom(key)}
                    className="px-3.5 py-1.5 rounded-full border text-[11px] uppercase tracking-[0.08em] cursor-pointer transition-colors"
                    style={btnStyle(galleryRoom === key)}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            <div
              className="py-10 md:py-14 px-5 md:px-10 border-y transition-all duration-300"
              style={{
                backgroundColor: theme.cardBg,
                borderColor: theme.lineStrong,
              }}
            >
              {galleryRoom === 'spatial' && (
                <div className="grid md:grid-cols-[1.1fr_0.9fr] gap-8 items-center">
                  <div>
                    <span
                      className="text-[11px] uppercase tracking-[0.14em]"
                      style={{ color: theme.accent, fontFamily: theme.monoFont }}
                    >
                      GALLERY WING 01 · SPATIAL CAMERA GLIDE
                    </span>
                    <div
                      className="mt-3 text-[34px] md:text-[50px] leading-[1.02] italic font-medium"
                      style={{ fontFamily: theme.displayFont, color: theme.ink }}
                    >
                      Walk Through Curated Light &amp; Sculpted Perspectives
                    </div>
                    <p className="mt-3 mb-0 text-[15px] max-w-[54ch]" style={{ color: theme.inkSoft }}>
                      Visitors orbit or glide along museum walls in real-time 3D motion,
                      clicking any framed piece to illuminate brushwork texture, dimensions,
                      and artist commentary.
                    </p>
                  </div>
                  <div className="grid grid-cols-3 gap-4 items-center">
                    {[
                      { code: 'LOT 01', bg: '#2c537e', title: 'Lotus Pond IV' },
                      { code: 'LOT 02', bg: '#c9647a', title: 'Morning Veil' },
                      { code: 'LOT 03', bg: '#4e7762', title: 'Still Water' },
                    ].map((piece, idx) => (
                      <div
                        key={piece.code}
                        className="p-3 border transition-transform duration-500"
                        style={{
                          borderColor: theme.lineStrong,
                          transform: idx === 1 ? 'translateY(-10px)' : 'translateY(4px)',
                          backgroundColor: theme.bg,
                        }}
                      >
                        <div className="h-24 w-full" style={{ backgroundColor: piece.bg }} />
                        <div
                          className="mt-2 text-[10px] uppercase"
                          style={{ color: theme.muted, fontFamily: theme.monoFont }}
                        >
                          {piece.code}
                        </div>
                        <div className="text-[12.5px] font-medium" style={{ color: theme.ink }}>
                          {piece.title}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {galleryRoom === 'sales' && (
                <div className="grid md:grid-cols-3 gap-6">
                  {[
                    {
                      tag: 'ORIGINAL CANVAS · 1/1',
                      title: 'Direct Collector Acquisition',
                      detail: 'Live availability status, framed preview, and instant reserve / checkout.',
                    },
                    {
                      tag: 'PROVENANCE ARCHIVE',
                      title: 'Signed Edition Metadata',
                      detail: 'Medium, dimensions, exhibition history, and certificate verification.',
                    },
                    {
                      tag: 'PRIVATE VIEWING ROOM',
                      title: 'Curator & VIP Access',
                      detail: 'Share private exhibition links ahead of public opening night.',
                    },
                  ].map((item) => (
                    <div
                      key={item.tag}
                      className="pt-4 border-t"
                      style={{ borderColor: theme.lineStrong }}
                    >
                      <div
                        className="text-[11px] uppercase tracking-[0.1em]"
                        style={{ color: theme.accent, fontFamily: theme.monoFont }}
                      >
                        {item.tag}
                      </div>
                      <div
                        className="mt-2 text-[22px] font-semibold"
                        style={{ fontFamily: theme.displayFont, color: theme.ink }}
                      >
                        {item.title}
                      </div>
                      <p className="mt-2 mb-0 text-[14px]" style={{ color: theme.inkSoft }}>
                        {item.detail}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {galleryRoom === 'custom' && (
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div>
                    <div
                      className="text-[28px] md:text-[36px] font-semibold leading-tight"
                      style={{ fontFamily: theme.displayFont, color: theme.ink }}
                    >
                      Tailored For Solo Artists, Studios &amp; Contemporary Galleries
                    </div>
                    <p className="mt-3 mb-0 text-[15px]" style={{ color: theme.inkSoft }}>
                      Swap gallery wall lighting, custom room geometry, artwork frames,
                      currency (IDR / USD / EUR), and CMS-driven exhibition uploads without
                      touching code.
                    </p>
                  </div>
                  <div
                    className="space-y-2 text-[12.5px] border-l pl-6"
                    style={{ borderColor: theme.lineStrong, fontFamily: theme.monoFont }}
                  >
                    <div style={{ color: theme.accent }}>• UNLIMITED ARTWORK CATALOG</div>
                    <div style={{ color: theme.inkSoft }}>• 3D WALL &amp; ROOM PRESETS</div>
                    <div style={{ color: theme.inkSoft }}>• DIRECT COLLECTOR CHECKOUT / INQUIRY</div>
                    <div style={{ color: theme.inkSoft }}>• ARTIST STORY &amp; PRESS ARCHIVE</div>
                  </div>
                </div>
              )}
            </div>
          </div>
        );

      case 'identity-material': {
        const specs: Record<'Print' | 'Web' | 'Space', { bg: string; fg: string; desc: string }> = {
          Print: {
            bg: '#efe6d4',
            fg: '#152e24',
            desc: 'Uncoated 320gsm cotton stock · deep forest letterpress impression',
          },
          Web: {
            bg: '#12271e',
            fg: '#efe6d4',
            desc: 'Measured editorial grid · calm dark reading surface with warm brass cues',
          },
          Space: {
            bg: '#8c723f',
            fg: '#fdfaf3',
            desc: 'Brushed architectural brass plaque · engraved gallery wayfinding',
          },
        };
        const current = specs[identitySurface];
        return (
          <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span
                className="text-[11px] uppercase tracking-[0.12em]"
                style={{ color: theme.muted, fontFamily: theme.monoFont }}
              >
                Touchpoint Material Switcher
              </span>
              <div className="inline-flex gap-1.5">
                {(['Print', 'Web', 'Space'] as const).map((surf) => (
                  <button
                    key={surf}
                    type="button"
                    onClick={() => setIdentitySurface(surf)}
                    className="px-3 py-1 rounded-full border text-[11px] cursor-pointer transition-colors"
                    style={btnStyle(identitySurface === surf)}
                  >
                    {surf}
                  </button>
                ))}
              </div>
            </div>
            <div
              className="border-y py-8 px-6 md:px-10 transition-colors duration-400 flex flex-col justify-between min-h-[170px]"
              style={{
                backgroundColor: current.bg,
                color: current.fg,
                borderColor: theme.lineStrong,
              }}
            >
              <span
                className="text-[10px] uppercase tracking-[0.16em] opacity-80"
                style={{ fontFamily: theme.monoFont }}
              >
                Atelier Pavilion · {identitySurface} Room
              </span>
              <div
                className="text-[28px] md:text-[38px] leading-tight font-semibold my-3"
                style={{ fontFamily: theme.displayFont }}
              >
                Civic Architecture of a Shared Mark
              </div>
              <span className="text-[13px] opacity-85">{current.desc}</span>
            </div>
          </div>
        );
      }

      case 'matter-legibility':
        return (
          <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span
                className="text-[11px] uppercase tracking-[0.12em]"
                style={{ color: theme.muted, fontFamily: theme.monoFont }}
              >
                Transit Halation Simulation
              </span>
              <div className="inline-flex gap-1.5">
                {(['lowlight', 'daylight'] as const).map((cond) => (
                  <button
                    key={cond}
                    type="button"
                    onClick={() => setMatterCondition(cond)}
                    className="px-3 py-1 rounded-full border text-[11px] uppercase cursor-pointer transition-colors"
                    style={btnStyle(matterCondition === cond)}
                  >
                    {cond === 'lowlight' ? 'Backlit Dusk' : 'Direct Daylight'}
                  </button>
                ))}
              </div>
            </div>
            <div
              className="border-y py-8 px-6 md:px-10 transition-all duration-300"
              style={{
                backgroundColor: matterCondition === 'lowlight' ? '#1b1726' : '#f7d23e',
                color: matterCondition === 'lowlight' ? '#f7d23e' : '#181523',
                borderColor: theme.lineStrong,
              }}
            >
              <div
                className="flex items-center justify-between text-[11px] uppercase tracking-[0.12em] opacity-80"
                style={{ fontFamily: theme.monoFont }}
              >
                <span>Platform 04 · Westbound</span>
                <span>18:42</span>
              </div>
              <div
                className="mt-2 text-[28px] md:text-[42px] font-bold tracking-[-0.02em]"
                style={{ fontFamily: theme.displayFont }}
              >
                869 → CENTRAL STATION
              </div>
              <p className="mt-2 mb-0 text-[13.5px] opacity-85">
                Open apertures keep numerals 6, 8, and 9 clearly distinct even under evening glare.
              </p>
            </div>
          </div>
        );

      case 'weather-climate': {
        const climates = {
          cold: {
            label: 'Alpine · −4°C',
            font: "'Bodoni Moda', serif",
            tracking: '0.02em',
            weight: 600,
            bg: '#e6effb',
            sample: 'Sharp Hairlines in Thin Mountain Air',
          },
          temperate: {
            label: 'Temperate · 16°C',
            font: "'Plus Jakarta Sans', sans-serif",
            tracking: '-0.02em',
            weight: 500,
            bg: '#edf3fb',
            sample: 'Balanced Proportions for Open Reading',
          },
          warm: {
            label: 'Mediterranean · 28°C',
            font: "'Fraunces', serif",
            tracking: '-0.03em',
            weight: 600,
            bg: '#fdf6ea',
            sample: 'Soft Terminals & Generous Sunlit Rhythm',
          },
        };
        const active = climates[weatherSeason];
        return (
          <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span
                className="text-[11px] uppercase tracking-[0.12em]"
                style={{ color: theme.muted, fontFamily: theme.monoFont }}
              >
                Barometric Type Dial
              </span>
              <div className="inline-flex flex-wrap gap-1.5">
                {(['cold', 'temperate', 'warm'] as const).map((season) => (
                  <button
                    key={season}
                    type="button"
                    onClick={() => setWeatherSeason(season)}
                    className="px-3 py-1 rounded-full border text-[11px] cursor-pointer transition-colors"
                    style={btnStyle(weatherSeason === season)}
                  >
                    {climates[season].label}
                  </button>
                ))}
              </div>
            </div>
            <div
              className="border-y py-8 px-6 md:px-10 transition-colors duration-400"
              style={{ backgroundColor: active.bg, borderColor: theme.line }}
            >
              <div
                className="text-[28px] md:text-[42px] leading-tight transition-all duration-300"
                style={{
                  fontFamily: active.font,
                  letterSpacing: active.tracking,
                  fontWeight: active.weight,
                  color: theme.ink,
                }}
              >
                {active.sample}
              </div>
            </div>
          </div>
        );
      }

      case 'small-edit':
        return (
          <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span
                className="text-[11px] uppercase tracking-[0.12em]"
                style={{ color: theme.muted, fontFamily: theme.monoFont }}
              >
                Pocket Revision Exercise
              </span>
              <button
                type="button"
                onClick={() => setSmallEdited((v) => !v)}
                className="px-3 py-1 rounded-full border text-[11px] cursor-pointer transition-colors"
                style={btnStyle(smallEdited)}
              >
                {smallEdited ? 'Edited (−42% words)' : 'First Draft'}
              </button>
            </div>
            <div
              className="border-y py-8 px-6 md:px-10"
              style={{ backgroundColor: theme.cardBg, borderColor: theme.line }}
            >
              <p
                className="m-0 text-[20px] md:text-[26px] leading-[1.42] max-w-[60ch]"
                style={{ fontFamily: theme.displayFont, color: theme.ink }}
              >
                {smallEdited
                  ? 'Start with one verb, remove every ornament, and ship the clearest sheet.'
                  : 'In order to truly improve our holistic design outcomes across teams, we should probably try to start with one clear verb, carefully remove unnecessary visual ornament, and eventually ship the clearest possible sheet.'}
              </p>
            </div>
          </div>
        );

      case 'quiet-rhythm':
        return (
          <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span
                className="text-[11px] uppercase tracking-[0.12em]"
                style={{ color: theme.muted, fontFamily: theme.monoFont }}
              >
                Whitespace Cadence Comparison
              </span>
              <div className="inline-flex gap-1.5">
                {(['patient', 'dense'] as const).map((d) => (
                  <button
                    key={d}
                    type="button"
                    onClick={() => setQuietDensity(d)}
                    className="px-3 py-1 rounded-full border text-[11px] uppercase cursor-pointer transition-colors"
                    style={btnStyle(quietDensity === d)}
                  >
                    {d === 'patient' ? 'Patient Margins' : 'Crowded Layout'}
                  </button>
                ))}
              </div>
            </div>
            <div
              className={`border-y transition-all duration-400 ${
                quietDensity === 'patient' ? 'py-10 px-6 md:px-10 space-y-5' : 'py-3 px-3 space-y-1.5'
              }`}
              style={{ backgroundColor: theme.cardBg, borderColor: theme.line }}
            >
              <div className="text-[20px] md:text-[24px] font-medium" style={{ fontFamily: theme.displayFont }}>
                {quietDensity === 'patient'
                  ? 'Generous silence around a single point of focus.'
                  : 'Too many alerts, tight padding, and zero visual breath.'}
              </div>
              <div
                className={`h-px w-full transition-opacity ${
                  quietDensity === 'patient' ? 'opacity-50' : 'opacity-100'
                }`}
                style={{ backgroundColor: theme.lineStrong }}
              />
              <div className="text-[13px]" style={{ color: theme.muted }}>
                {quietDensity === 'patient'
                  ? '40px outer pad · generous vertical breathing room'
                  : '12px outer pad · 6px compressed stack'}
              </div>
            </div>
          </div>
        );

      case 'colour-triad': {
        const triads = [
          { name: 'Magenta Verb', ground: '#fdf6f8', ink: '#1a1116', accent: '#d92678' },
          { name: 'Butter Ochre', ground: '#fbf5e1', ink: '#1d1810', accent: '#e08e00' },
          { name: 'Cobalt Signal', ground: '#eef3fc', ink: '#111b36', accent: '#1f4fd6' },
        ];
        const current = triads[colourTriadIdx % triads.length];
        return (
          <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span
                className="text-[11px] uppercase tracking-[0.12em]"
                style={{ color: theme.muted, fontFamily: theme.monoFont }}
              >
                80 / 15 / 5 Live Triad
              </span>
              <div className="inline-flex flex-wrap gap-1.5">
                {triads.map((t, idx) => (
                  <button
                    key={t.name}
                    type="button"
                    onClick={() => setColourTriadIdx(idx)}
                    className="px-3 py-1 rounded-full border text-[11px] cursor-pointer transition-colors"
                    style={btnStyle(colourTriadIdx === idx)}
                  >
                    {t.name}
                  </button>
                ))}
              </div>
            </div>
            <div
              className="border-y py-8 px-6 md:px-10 transition-colors duration-300"
              style={{ backgroundColor: current.ground, borderColor: theme.lineStrong }}
            >
              <div className="grid grid-cols-12 gap-2 h-16">
                <div
                  className="col-span-9 border px-4 flex items-center text-[11px] uppercase tracking-[0.08em]"
                  style={{
                    backgroundColor: current.ground,
                    color: current.ink,
                    borderColor: 'rgba(20,20,20,0.16)',
                    fontFamily: theme.monoFont,
                  }}
                >
                  80% Ground
                </div>
                <div
                  className="col-span-2 flex items-center justify-center text-[11px] font-medium"
                  style={{ backgroundColor: current.ink, color: '#ffffff', fontFamily: theme.monoFont }}
                >
                  15%
                </div>
                <div
                  className="col-span-1 flex items-center justify-center text-[11px] font-bold"
                  style={{ backgroundColor: current.accent, color: '#ffffff', fontFamily: theme.monoFont }}
                >
                  5%
                </div>
              </div>
            </div>
          </div>
        );
      }

      case 'motion-curve':
        return (
          <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span
                className="text-[11px] uppercase tracking-[0.12em]"
                style={{ color: theme.muted, fontFamily: theme.monoFont }}
              >
                Kinetic Easing Replay
              </span>
              <div className="inline-flex gap-1.5">
                {(['editorial', 'linear'] as const).map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => {
                      setMotionMode(m);
                      setMotionReplayKey((k) => k + 1);
                    }}
                    className="px-3 py-1 rounded-full border text-[11px] uppercase cursor-pointer transition-colors"
                    style={btnStyle(motionMode === m)}
                  >
                    {m === 'editorial' ? 'Editorial Glide' : 'Mechanical Linear'}
                  </button>
                ))}
              </div>
            </div>
            <div
              key={motionReplayKey}
              className="border-y py-8 px-6 md:px-10 overflow-hidden"
              style={{ backgroundColor: theme.cardBg, borderColor: theme.lineStrong }}
            >
              <div
                className="text-[11px] uppercase tracking-[0.1em] mb-4"
                style={{ color: theme.muted, fontFamily: theme.monoFont }}
              >
                Curve: {motionMode === 'editorial' ? 'cubic-bezier(0.16, 1, 0.3, 1)' : 'linear'}
              </div>
              <div className="h-3.5 rounded-full overflow-hidden" style={{ backgroundColor: 'rgba(243,241,235,0.12)' }}>
                <div
                  className="h-full rounded-full"
                  style={{
                    width: '82%',
                    backgroundColor: theme.accent,
                    animation: `motionBarSweep 0.9s ${
                      motionMode === 'editorial' ? 'cubic-bezier(0.16, 1, 0.3, 1)' : 'linear'
                    } both`,
                  }}
                />
              </div>
            </div>
          </div>
        );

      case 'honest-measure':
        return (
          <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span
                className="text-[11px] uppercase tracking-[0.12em]"
                style={{ color: theme.muted, fontFamily: theme.monoFont }}
              >
                Live Column Measure
              </span>
              <div className="inline-flex gap-1.5">
                {([52, 66, 85] as const).map((ch) => (
                  <button
                    key={ch}
                    type="button"
                    onClick={() => setHonestMeasure(ch)}
                    className="px-3 py-1 rounded-full border text-[11px] tabular-nums cursor-pointer transition-colors"
                    style={btnStyle(honestMeasure === ch)}
                  >
                    {ch} ch {ch === 66 ? '(Ideal)' : ''}
                  </button>
                ))}
              </div>
            </div>
            <div
              className="border-y py-8 px-6 md:px-10"
              style={{ backgroundColor: theme.cardBg, borderColor: theme.line }}
            >
              <p
                className="m-0 text-[16px] md:text-[18px] leading-[1.68] transition-all duration-300"
                style={{ maxWidth: `${honestMeasure}ch`, color: theme.inkSoft }}
              >
                When a column settles around sixty-six characters, the eye returns cleanly from line
                end to line start without skipping rows or rushing to the margin.
              </p>
            </div>
          </div>
        );

      case 'signal-focus':
        return (
          <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span
                className="text-[11px] uppercase tracking-[0.12em]"
                style={{ color: theme.muted, fontFamily: theme.monoFont }}
              >
                Feed Signal Filter
              </span>
              <button
                type="button"
                onClick={() => setSignalFocused((v) => !v)}
                className="px-3 py-1 rounded-full border text-[11px] uppercase cursor-pointer transition-colors"
                style={btnStyle(signalFocused)}
              >
                {signalFocused ? 'Signal Only' : 'Noisy Banners'}
              </button>
            </div>
            <div
              className="border-y py-8 px-6 md:px-10 space-y-3"
              style={{ backgroundColor: theme.cardBg, borderColor: theme.lineStrong }}
            >
              {!signalFocused && (
                <div
                  className="flex flex-wrap gap-2 text-[10px] uppercase tracking-[0.1em]"
                  style={{ fontFamily: theme.monoFont }}
                >
                  <span className="px-2 py-0.5 border border-black/25">BREAKING</span>
                  <span className="px-2 py-0.5 border border-black/25">TRENDING</span>
                  <span className="px-2 py-0.5 border border-black/25">URGENT UPDATE</span>
                </div>
              )}
              <div
                className="inline-block px-2 py-0.5 text-[24px] md:text-[32px] font-bold leading-snug"
                style={{
                  fontFamily: theme.displayFont,
                  backgroundColor: signalFocused ? theme.accent : 'transparent',
                  color: '#111111',
                }}
              >
                One clear headline lands faster than three stacked alerts.
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <figure className="m-0 pt-2 pb-2">
      <div>{renderInteractiveStage()}</div>

      <div
        className="mt-6 pt-5 border-t grid sm:grid-cols-3 gap-5 text-[13px]"
        style={{ borderColor: theme.line }}
      >
        {content.specimenHighlights.map((item) => (
          <div key={item.label} className="py-0.5">
            <span className="block font-semibold" style={{ color: theme.ink }}>
              {item.label}
            </span>
            <span className="block mt-1 leading-relaxed" style={{ color: theme.muted }}>
              {item.detail}
            </span>
          </div>
        ))}
      </div>
    </figure>
  );
};
