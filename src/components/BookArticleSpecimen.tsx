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
  const [loudCropMode, setLoudCropMode] = useState<'bleed' | 'safe'>('bleed');
  const [markScale, setMarkScale] = useState<16 | 48 | 120>(48);
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
      case 'loud-crop':
        return (
          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span
                className="text-[11px] uppercase tracking-[0.12em]"
                style={{ color: theme.muted, fontFamily: theme.monoFont }}
              >
                Poster Composition Test
              </span>
              <div className="inline-flex gap-1.5">
                {(['bleed', 'safe'] as const).map((mode) => (
                  <button
                    key={mode}
                    type="button"
                    onClick={() => setLoudCropMode(mode)}
                    className="px-3 py-1 rounded-full border text-[11px] uppercase tracking-[0.08em] cursor-pointer transition-colors"
                    style={btnStyle(loudCropMode === mode)}
                  >
                    {mode === 'bleed' ? 'Full-Bleed Crop' : 'Safe Margin'}
                  </button>
                ))}
              </div>
            </div>
            <div
              className="relative h-44 rounded-lg border overflow-hidden flex items-center justify-center transition-all duration-300"
              style={{
                backgroundColor: loudCropMode === 'bleed' ? theme.accent : theme.cardBg,
                borderColor: theme.lineStrong,
              }}
            >
              <div
                className="select-none font-bold uppercase leading-[0.82] transition-all duration-500"
                style={{
                  fontFamily: theme.displayFont,
                  color: loudCropMode === 'bleed' ? '#161310' : theme.accent,
                  fontSize: loudCropMode === 'bleed' ? '132px' : '54px',
                  letterSpacing: '-0.04em',
                  transform: loudCropMode === 'bleed' ? 'translateY(8px) scale(1.06)' : 'scale(1)',
                }}
              >
                SCALE
              </div>
              <span
                className="absolute bottom-2.5 left-3.5 right-3.5 flex justify-between text-[10px] uppercase tracking-[0.12em]"
                style={{
                  fontFamily: theme.monoFont,
                  color: loudCropMode === 'bleed' ? 'rgba(22,19,16,0.85)' : theme.muted,
                }}
              >
                <span>{loudCropMode === 'bleed' ? '82% INK COVERAGE' : '34% INK COVERAGE'}</span>
                <span>{loudCropMode === 'bleed' ? '0MM TRIM BLEED' : '24MM SAFE FRAME'}</span>
              </span>
            </div>
          </div>
        );

      case 'marks-scale':
        return (
          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span
                className="text-[11px] uppercase tracking-[0.12em]"
                style={{ color: theme.muted, fontFamily: theme.monoFont }}
              >
                Optical Aperture Inspection
              </span>
              <div className="inline-flex gap-1.5">
                {([16, 48, 120] as const).map((sz) => (
                  <button
                    key={sz}
                    type="button"
                    onClick={() => setMarkScale(sz)}
                    className="px-3 py-1 rounded-full border text-[11px] tabular-nums cursor-pointer transition-colors"
                    style={btnStyle(markScale === sz)}
                  >
                    {sz} px
                  </button>
                ))}
              </div>
            </div>
            <div
              className="h-44 rounded-lg border flex flex-col items-center justify-center gap-3"
              style={{ backgroundColor: theme.cardBg, borderColor: theme.line }}
            >
              <svg
                width={markScale}
                height={markScale}
                viewBox="0 0 120 120"
                className="transition-all duration-300"
                aria-hidden="true"
              >
                <circle cx="60" cy="60" r="46" stroke={theme.accent} strokeWidth="14" fill="none" />
                <circle cx="60" cy="60" r="14" fill={theme.ink} />
                <line
                  x1="60"
                  y1="6"
                  x2="60"
                  y2="34"
                  stroke={theme.cardBg}
                  strokeWidth="12"
                />
              </svg>
              <span
                className="text-[11px] tabular-nums"
                style={{ color: theme.muted, fontFamily: theme.monoFont }}
              >
                Rendered at {markScale} × {markScale} px · Counter clearance verified
              </span>
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
          <div className="space-y-4">
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
              className="rounded-lg border p-6 transition-colors duration-400 flex flex-col justify-between min-h-[144px]"
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
                className="text-[24px] md:text-[30px] leading-tight font-semibold my-2"
                style={{ fontFamily: theme.displayFont }}
              >
                Civic Architecture of a Shared Mark
              </div>
              <span className="text-[12px] opacity-85">{current.desc}</span>
            </div>
          </div>
        );
      }

      case 'matter-legibility':
        return (
          <div className="space-y-4">
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
              className="rounded-lg border p-5 md:p-6 transition-all duration-300"
              style={{
                backgroundColor: matterCondition === 'lowlight' ? '#1b1726' : '#f7d23e',
                color: matterCondition === 'lowlight' ? '#f7d23e' : '#181523',
                borderColor: theme.lineStrong,
              }}
            >
              <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.12em] opacity-80" style={{ fontFamily: theme.monoFont }}>
                <span>Platform 04 · Westbound</span>
                <span>18:42</span>
              </div>
              <div
                className="mt-2 text-[24px] md:text-[32px] font-bold tracking-[-0.02em]"
                style={{ fontFamily: theme.displayFont }}
              >
                869 → CENTRAL STATION
              </div>
              <p className="mt-2 mb-0 text-[12.5px] opacity-85">
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
          <div className="space-y-4">
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
              className="rounded-lg border p-6 transition-colors duration-400"
              style={{ backgroundColor: active.bg, borderColor: theme.line }}
            >
              <div
                className="text-[24px] md:text-[32px] leading-tight transition-all duration-300"
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
          <div className="space-y-4">
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
              className="rounded-lg border p-5 md:p-6"
              style={{ backgroundColor: theme.cardBg, borderColor: theme.line }}
            >
              <p
                className="m-0 text-[18px] md:text-[22px] leading-[1.45]"
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
          <div className="space-y-4">
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
              className={`rounded-lg border transition-all duration-400 ${
                quietDensity === 'patient' ? 'p-8 space-y-5' : 'p-2.5 space-y-1.5'
              }`}
              style={{ backgroundColor: theme.cardBg, borderColor: theme.line }}
            >
              <div className="text-[16px] font-medium" style={{ fontFamily: theme.displayFont }}>
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
              <div className="text-[12.5px]" style={{ color: theme.muted }}>
                {quietDensity === 'patient'
                  ? '32px outer pad · 20px vertical breathing room'
                  : '10px outer pad · 6px compressed stack'}
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
          <div className="space-y-4">
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
              className="rounded-lg border p-5 transition-colors duration-300"
              style={{ backgroundColor: current.ground, borderColor: theme.lineStrong }}
            >
              <div className="grid grid-cols-12 gap-2 h-14">
                <div
                  className="col-span-9 rounded-[4px] border px-3 flex items-center text-[11px] uppercase tracking-[0.08em]"
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
                  className="col-span-2 rounded-[4px] flex items-center justify-center text-[10px] font-medium"
                  style={{ backgroundColor: current.ink, color: '#ffffff', fontFamily: theme.monoFont }}
                >
                  15%
                </div>
                <div
                  className="col-span-1 rounded-[4px] flex items-center justify-center text-[10px] font-bold"
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
          <div className="space-y-4">
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
              className="rounded-lg border p-5 overflow-hidden"
              style={{ backgroundColor: theme.cardBg, borderColor: theme.lineStrong }}
            >
              <div className="text-[11px] uppercase tracking-[0.1em] mb-3" style={{ color: theme.muted, fontFamily: theme.monoFont }}>
                Curve: {motionMode === 'editorial' ? 'cubic-bezier(0.16, 1, 0.3, 1)' : 'linear'}
              </div>
              <div className="h-3 rounded-full overflow-hidden" style={{ backgroundColor: 'rgba(243,241,235,0.12)' }}>
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
          <div className="space-y-4">
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
              className="rounded-lg border p-5"
              style={{ backgroundColor: theme.cardBg, borderColor: theme.line }}
            >
              <p
                className="m-0 text-[15px] leading-[1.68] transition-all duration-300"
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
          <div className="space-y-4">
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
              className="rounded-lg border p-5 space-y-3"
              style={{ backgroundColor: theme.cardBg, borderColor: theme.lineStrong }}
            >
              {!signalFocused && (
                <div className="flex flex-wrap gap-2 text-[10px] uppercase tracking-[0.1em]" style={{ fontFamily: theme.monoFont }}>
                  <span className="px-2 py-0.5 border border-black/25">BREAKING</span>
                  <span className="px-2 py-0.5 border border-black/25">TRENDING</span>
                  <span className="px-2 py-0.5 border border-black/25">URGENT UPDATE</span>
                </div>
              )}
              <div
                className="inline-block px-2 py-0.5 text-[20px] md:text-[24px] font-bold leading-snug"
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
    <figure
      className="rounded-xl border p-5 md:p-6"
      style={{
        backgroundColor: theme.surface,
        borderColor: theme.line,
      }}
    >
      <div
        className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b"
        style={{ borderColor: theme.line }}
      >
        <span
          className="text-[10.5px] font-semibold uppercase tracking-[0.12em]"
          style={{ color: theme.muted, fontFamily: theme.monoFont }}
        >
          {content.specimenTag}
        </span>
        <span className="text-[11px] font-medium" style={{ color: theme.ink }}>
          {content.specimenLabel}
        </span>
      </div>

      <div className="mt-4">{renderInteractiveStage()}</div>

      <div className="mt-4 grid sm:grid-cols-3 gap-3 text-[12px]">
        {content.specimenHighlights.map((item) => (
          <div
            key={item.label}
            className="rounded-lg border px-3.5 py-3"
            style={{
              backgroundColor: theme.cardBg,
              borderColor: theme.line,
            }}
          >
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
