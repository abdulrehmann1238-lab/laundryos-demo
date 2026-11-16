import React from 'react';
import { Link } from 'react-router-dom';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showTagline?: boolean;
  light?: boolean;
  className?: string;
  linkToHome?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  size = 'md',
  showTagline = false,
  light = false,
  className = '',
  linkToHome = true,
}) => {
  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-12 h-12',
  };

  const textSizes = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
  };

  const content = (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      {/* Animated Circular Laundry Drum Icon */}
      <div className={`relative flex items-center justify-center rounded-xl transition-transform hover:scale-105 ${iconSizes[size]} ${light ? 'bg-white/10 text-white' : 'bg-forest text-white shadow-subtle'}`}>
        <svg viewBox="0 0 32 32" fill="none" className="w-5/6 h-5/6">
          {/* Outer Ring */}
          <circle cx="16" cy="16" r="13" stroke="currentColor" strokeWidth="1.75" strokeOpacity="0.4" />
          {/* Washing Drum Inner Circle */}
          <circle cx="16" cy="16" r="9" stroke={light ? '#E7DDD0' : '#86A189'} strokeWidth="1.5" strokeDasharray="3 3" />
          {/* Centered Water Vortex Spiral */}
          <path
            d="M16 11C18.7614 11 21 13.2386 21 16C21 18.7614 18.7614 21 16 21C13.2386 21 11 18.7614 11 16C11 14.5 12 13 13.5 12"
            stroke={light ? '#FFFFFF' : '#FAF9F5'}
            strokeWidth="2"
            strokeLinecap="round"
          />
          {/* Fresh Fold Corner Accent */}
          <circle cx="23" cy="9" r="2" fill={light ? '#ADC0AF' : '#E7DDD0'} />
        </svg>
      </div>

      {/* Brand Wordmark */}
      <div className="flex flex-col">
        <div className="flex items-center">
          <span className={`font-display font-bold tracking-tight ${textSizes[size]} ${light ? 'text-white' : 'text-charcoal'}`}>
            Laundry<span className="text-sage-500 font-extrabold">OS</span>
          </span>
          <span className="ml-1.5 px-1.5 py-0.2 text-[10px] uppercase font-semibold tracking-wider rounded bg-sage-100 text-forest border border-sage-200">
            PRO
          </span>
        </div>
        {showTagline && (
          <span className={`text-[11px] font-normal tracking-wide ${light ? 'text-white/70' : 'text-charcoal-muted'}`}>
            The operating system for modern laundromats
          </span>
        )}
      </div>
    </div>
  );

  if (linkToHome) {
    return (
      <Link to="/" className="inline-block focus:outline-none focus-visible:ring-2 focus-visible:ring-sage-400 rounded-lg">
        {content}
      </Link>
    );
  }

  return content;
};
