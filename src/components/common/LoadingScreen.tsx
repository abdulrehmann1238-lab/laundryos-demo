import React, { useEffect, useState } from 'react';

interface LoadingScreenProps {
  onComplete: () => void;
  minDurationMs?: number;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({
  onComplete,
  minDurationMs = 1700,
}) => {
  const [progress, setProgress] = useState(0);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const currentPct = Math.min(100, Math.floor((elapsed / minDurationMs) * 100));
      setProgress(currentPct);

      if (elapsed >= minDurationMs) {
        clearInterval(interval);
        setIsFadingOut(true);
        setTimeout(() => {
          onComplete();
        }, 350);
      }
    }, 30);

    return () => clearInterval(interval);
  }, [minDurationMs, onComplete]);

  return (
    <div
      className={`fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#F7F6F1] transition-opacity duration-500 ${
        isFadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div className="flex flex-col items-center max-w-sm px-6 text-center">
        {/* Animated Circular Laundry Drum Icon */}
        <div className="relative w-20 h-20 mb-6 flex items-center justify-center rounded-2xl bg-forest text-white shadow-card">
          <svg viewBox="0 0 48 48" fill="none" className="w-14 h-14 animate-drum">
            <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="2.5" strokeOpacity="0.35" />
            <circle cx="24" cy="24" r="14" stroke="#ADC0AF" strokeWidth="2" strokeDasharray="4 4" />
            <path
              d="M24 16C28.4183 16 32 19.5817 32 24C32 28.4183 28.4183 32 24 32C19.5817 32 16 28.4183 16 24C16 21.5 17.5 19.5 20 18"
              stroke="#FAF9F5"
              strokeWidth="2.75"
              strokeLinecap="round"
            />
            <circle cx="33" cy="15" r="2.5" fill="#E7DDD0" />
          </svg>
        </div>

        {/* Brand Wordmark */}
        <h1 className="text-2xl font-display font-extrabold tracking-tight text-charcoal">
          Laundry<span className="text-sage-500">OS</span>
        </h1>

        {/* Subtitle */}
        <p className="mt-2 text-sm text-charcoal-muted font-normal tracking-wide">
          Preparing your laundry experience
        </p>

        {/* Thin Sage-Green Progress Bar */}
        <div className="w-48 h-1 bg-sage-200/60 rounded-full mt-7 overflow-hidden">
          <div
            className="h-full bg-sage-500 rounded-full transition-all duration-75 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        <span className="mt-2.5 text-[11px] font-mono text-charcoal-muted tracking-wider">
          {progress}%
        </span>
      </div>
    </div>
  );
};
