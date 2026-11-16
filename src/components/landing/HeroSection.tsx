import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Package,
  Clock,
  Shirt,
  Shield,
  Layers,
} from 'lucide-react';
import { StatusBadge } from '../common/StatusBadge';

interface HeroSectionProps {
  onOpenDemo: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenDemo }) => {
  const navigate = useNavigate();

  return (
    <section className="relative pt-36 pb-20 md:pt-44 md:pb-32 overflow-hidden bg-background">
      {/* Subtle Warm Linen Texture & Radial Background */}
      <div className="absolute inset-0 pointer-events-none opacity-40 bg-[radial-gradient(#657B68_1px,transparent_1px)] [background-size:24px_24px]" />
      <div className="absolute top-20 right-0 w-96 h-96 bg-sage-200/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-linen/50 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Editorial Headline & Actions */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* Pill Tag */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sage-100 border border-sage-200 text-forest text-xs font-semibold tracking-wide mb-6">
              <span className="w-2 h-2 rounded-full bg-forest animate-pulse" />
              <span>THE OPERATING SYSTEM FOR MODERN LAUNDROMATS</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-charcoal tracking-tight leading-[1.12]">
              Run your laundry business.{' '}
              <span className="text-forest underline decoration-sage-300 decoration-wavy decoration-1 underline-offset-8">
                Not the chaos
              </span>{' '}
              behind it.
            </h1>

            {/* Supporting Copy */}
            <p className="mt-6 text-lg sm:text-xl text-charcoal-muted leading-relaxed font-normal max-w-2xl">
              LaundryOS brings orders, customers, pickups, deliveries, payments, and daily operations
              together in one beautifully simple platform.
            </p>

            {/* CTAs */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button
                onClick={onOpenDemo}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm bg-forest text-white hover:bg-forest-light shadow-elevated hover:shadow-card hover:-translate-y-0.5 transition-all"
              >
                <Sparkles className="w-4 h-4 text-linen" />
                <span>Explore the Platform</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href="#journey"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm bg-white text-charcoal border border-border hover:bg-secondary hover:border-sage-300 shadow-subtle transition-all"
              >
                <span>See How It Works</span>
              </a>
            </div>

            {/* Social Proof / Metrics Subtext */}
            <div className="mt-10 pt-8 border-t border-border/80 flex flex-wrap items-center gap-6 sm:gap-10 text-xs text-charcoal-muted font-medium">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-forest" />
                <span>Multi-tenant SaaS Architecture</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-forest" />
                <span>Real-time Driver & Customer Sync</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-forest" />
                <span>Designed for Canadian & US Markets</span>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Visual + Floating Interactive Order Preview */}
          <div className="lg:col-span-5 relative">
            {/* Editorial Laundry Image Frame */}
            <div className="relative mx-auto rounded-3xl overflow-hidden border border-border shadow-elevated bg-white">
              <img
                src="https://images.unsplash.com/photo-1545173168-9f1947eebb7f?auto=format&fit=crop&w=1000&q=85"
                alt="Neatly folded fresh white towels and linen in a sunlit laundry environment"
                className="w-full h-[430px] sm:h-[480px] object-cover hover:scale-105 transition-transform duration-700"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-transparent to-transparent pointer-events-none" />

              {/* Bottom Badge on Image */}
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-white/95 backdrop-blur-md border border-white/60 shadow-card flex items-center justify-between text-xs">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-sage-100 text-forest flex items-center justify-center font-bold">
                    <Shirt className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-semibold text-charcoal">FreshFold Laundry • Toronto</div>
                    <div className="text-[11px] text-charcoal-muted">36 active orders in cycle today</div>
                  </div>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                  99.8% On-Time
                </span>
              </div>
            </div>

            {/* FLOATING INTERACTIVE ORDER PREVIEW CARD */}
            {/* Order #LO-2048, Customer: Alex Morgan, Service: Wash, Dry & Fold, Total: $32.00, Status: Washing, Progress: 75% */}
            <div
              onClick={() => navigate('/app/track/LO-2048')}
              className="group cursor-pointer absolute -bottom-8 -left-4 sm:-left-8 max-w-xs sm:max-w-sm w-full p-5 rounded-2xl bg-white/95 backdrop-blur-md border border-sage-300 shadow-drawer hover:shadow-elevated transition-all duration-300 animate-soft-pulse hover:scale-[1.02]"
              title="Click to track Order #LO-2048 in the Customer Mobile App"
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-forest">#LO-2048</span>
                    <StatusBadge status="Washing" size="sm" />
                  </div>
                  <h4 className="text-sm font-bold text-charcoal mt-1 group-hover:text-forest transition-colors">
                    Alex Morgan
                  </h4>
                  <p className="text-xs text-charcoal-muted">Service: Wash, Dry & Fold</p>
                </div>
                <div className="text-right">
                  <span className="text-sm font-bold text-charcoal">$32.00</span>
                  <div className="text-[10px] text-charcoal-muted">CAD (Paid)</div>
                </div>
              </div>

              {/* Progress bar */}
              <div className="mt-4">
                <div className="flex items-center justify-between text-[11px] font-medium text-charcoal-muted mb-1">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-sage-600" />
                    Washing Cycle (Machine #04)
                  </span>
                  <span className="font-semibold text-forest">75%</span>
                </div>
                <div className="w-full h-1.5 bg-sage-100 rounded-full overflow-hidden">
                  <div className="h-full bg-forest rounded-full transition-all duration-500" style={{ width: '75%' }} />
                </div>
              </div>

              <div className="mt-3 pt-2.5 border-t border-border flex items-center justify-between text-[11px] text-sage-600 font-medium">
                <span>Click to track live order</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
