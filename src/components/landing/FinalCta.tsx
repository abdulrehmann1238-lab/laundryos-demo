import React from 'react';
import { ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';

interface FinalCtaProps {
  onOpenDemo: () => void;
}

export const FinalCta: React.FC<FinalCtaProps> = ({ onOpenDemo }) => {
  return (
    <section className="py-24 bg-forest text-white relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-sage-400/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-linen/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 text-linen border border-white/20 text-xs font-semibold tracking-wide mb-6">
          <Sparkles className="w-3.5 h-3.5" />
          <span>START MODERNIZING YOUR FACILITY TODAY</span>
        </div>

        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-display font-bold text-white tracking-tight leading-tight">
          Your laundromat deserves a better operating system.
        </h2>

        <p className="mt-6 text-base sm:text-lg text-white/80 max-w-2xl mx-auto leading-relaxed">
          Join modern laundromat owners running paperless operations, automated driver dispatches,
          and transparent customer tracking with LaundryOS.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={onOpenDemo}
            className="inline-flex items-center gap-2 px-7 py-4 rounded-xl font-bold text-sm bg-white text-forest hover:bg-linen shadow-elevated transition-all hover:scale-105"
          >
            <span>Explore LaundryOS Demo</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={onOpenDemo}
            className="inline-flex items-center gap-2 px-7 py-4 rounded-xl font-semibold text-sm bg-white/10 text-white hover:bg-white/20 border border-white/20 transition-all"
          >
            <span>Get Started</span>
          </button>
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-xs text-white/70 font-medium">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-linen" />
            <span>Interactive Multi-tenant prototype</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-linen" />
            <span>NestJS & Prisma audit ready</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-linen" />
            <span>No credit card required for demo</span>
          </div>
        </div>
      </div>
    </section>
  );
};
