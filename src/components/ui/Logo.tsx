import React, { useState } from 'react';

// Resolved at build time so a missing src/assets/logo.png falls back to the SVG instead of breaking the build.
const logoFiles = import.meta.glob('../../assets/logo.png', {
  eager: true,
  query: '?url',
  import: 'default'
}) as Record<string, string>;
const logoUrl: string | undefined = Object.values(logoFiles)[0];

interface LogoProps {
  height?: number;
  className?: string;
}

/** Diamond split into four quadrants: red top, yellow left, green right, blue bottom. */
export const LogoMark: React.FC<{ size?: number; className?: string }> = ({ size = 28, className }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 40 40"
    className={className}
    aria-hidden="true"
    focusable="false"
  >
    <polygon points="20,2 29,11 20,20 11,11" fill="#D7262E" />
    <polygon points="2,20 11,11 20,20 11,29" fill="#F5C518" />
    <polygon points="38,20 29,11 20,20 29,29" fill="#2E9445" />
    <polygon points="20,38 29,29 20,20 11,29" fill="#1E5BB8" />
  </svg>
);

/** Logo for navy surfaces only (header, navy footer chip). */
export const Logo: React.FC<LogoProps> = ({ height = 40, className = '' }) => {
  const [imageFailed, setImageFailed] = useState(false);

  if (logoUrl && !imageFailed) {
    return (
      <img
        src={logoUrl}
        alt="DMS - Data Management Systems"
        style={{ height }}
        className={`w-auto select-none ${className}`}
        onError={() => setImageFailed(true)}
      />
    );
  }

  return (
    <span
      role="img"
      aria-label="DMS - Data Management Systems"
      className={`inline-flex items-center gap-2.5 select-none ${className}`}
      style={{ height }}
    >
      <LogoMark size={Math.round(height * 0.8)} />
      <span className="flex flex-col justify-center leading-none" dir="ltr">
        <span className="font-brand-serif font-bold text-white tracking-wide" style={{ fontSize: height * 0.5 }}>
          DMS
        </span>
        <span className="text-white/80 whitespace-nowrap" style={{ fontSize: Math.max(7, height * 0.2) }}>
          Data Management Systems
        </span>
      </span>
    </span>
  );
};
