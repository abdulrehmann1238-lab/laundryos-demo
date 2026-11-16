import React from 'react';
import { Check, Sparkles, ArrowRight, Shield } from 'lucide-react';
import { useLaundry } from '../../context/LaundryContext';

interface PricingSectionProps {
  onSelectPlan: (planName: 'Starter' | 'Growth' | 'Enterprise') => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({ onSelectPlan }) => {
  const { currentTenant } = useLaundry();

  const plans = [
    {
      id: 'starter',
      name: 'Starter',
      tier: 'Starter' as const,
      price: '49',
      cadPrice: 'CAD $49',
      billing: '/month',
      description: 'Ideal for independent neighborhood drop-off laundromats digitizing their counter.',
      popular: false,
      features: [
        'Complete Order Management pipeline',
        'Customer database & order histories',
        'Service catalog & pricing management',
        'Basic daily revenue & order volume reporting',
        'Single location setup',
        'Email customer notifications',
      ],
      buttonText: 'Choose Starter',
    },
    {
      id: 'growth',
      name: 'Growth',
      tier: 'Growth' as const,
      price: '99',
      cadPrice: 'CAD $99',
      billing: '/month',
      description: 'Everything you need to launch and scale profitable pickup & delivery routes.',
      popular: true,
      features: [
        'Everything in Starter plan',
        'Full Pickup & Delivery logistics & dispatch',
        'Driver assignment & map-style route overview',
        'Live customer mobile order tracking portal',
        'Advanced business analytics & retention metrics',
        'Team management with role permissions (Managers, Operators, Drivers)',
        'Automated SMS & push notifications',
      ],
      buttonText: 'Start with Growth',
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      tier: 'Enterprise' as const,
      price: '199',
      cadPrice: 'Custom / CAD $199',
      billing: '/month',
      description: 'For multi-location laundromat groups and high-volume commercial cleaning facilities.',
      popular: false,
      features: [
        'Everything in Growth plan',
        'Multi-location & multi-facility operations',
        'Advanced granular RBAC permissions & audit trails',
        'Dedicated account manager & priority 24/7 SLA',
        'Custom invoice styling & domain branding',
        'Custom API & external POS integrations',
        'Scheduled automated data backup exports',
      ],
      buttonText: 'Choose Enterprise',
    },
  ];

  return (
    <section id="pricing" className="py-28 bg-white border-y border-border relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sage-100 border border-sage-200 text-forest text-xs font-semibold tracking-wide mb-3">
            <span>TRANSPARENT VALUE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-charcoal tracking-tight">
            Fair pricing built for independent laundromats.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-charcoal-muted leading-relaxed">
            All prices in Canadian Dollars (CAD). Start with zero setup fees. Cancel or switch tiers at any time.
          </p>
        </div>

        {/* 3 Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {plans.map((p) => {
            const isCurrentTenantPlan = currentTenant.subscriptionPlan === p.tier;

            return (
              <div
                key={p.id}
                className={`relative rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 ${
                  p.popular
                    ? 'bg-forest text-white shadow-elevated scale-105 z-10 border-2 border-forest'
                    : 'bg-background text-charcoal border border-border hover:border-sage-300 hover:shadow-card'
                }`}
              >
                {/* Popular Pill */}
                {p.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-linen text-charcoal font-bold text-xs uppercase tracking-wider shadow-subtle flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-forest" />
                    <span>RECOMMENDED BY OPERATORS</span>
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className={`text-2xl font-display font-bold ${p.popular ? 'text-white' : 'text-charcoal'}`}>
                      {p.name}
                    </h3>
                    {isCurrentTenantPlan && (
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                        p.popular ? 'bg-white/20 text-white' : 'bg-sage-200 text-forest'
                      }`}>
                        Current Demo Plan
                      </span>
                    )}
                  </div>

                  <p className={`text-xs leading-relaxed mb-6 ${p.popular ? 'text-white/80' : 'text-charcoal-muted'}`}>
                    {p.description}
                  </p>

                  {/* Price */}
                  <div className="flex items-baseline gap-1 mb-8">
                    <span className="text-4xl sm:text-5xl font-display font-extrabold tracking-tight">
                      ${p.price}
                    </span>
                    <span className={`text-xs font-semibold ${p.popular ? 'text-white/70' : 'text-charcoal-muted'}`}>
                      CAD {p.billing}
                    </span>
                  </div>

                  {/* Features list */}
                  <div className={`pt-6 border-t ${p.popular ? 'border-white/20' : 'border-border'}`}>
                    <div className={`text-xs font-bold uppercase tracking-wider mb-4 ${p.popular ? 'text-linen' : 'text-charcoal-muted'}`}>
                      What's Included
                    </div>
                    <ul className="space-y-3">
                      {p.features.map((feat, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-xs font-medium">
                          <Check className={`w-4 h-4 shrink-0 mt-0.5 ${p.popular ? 'text-linen' : 'text-forest'}`} />
                          <span className={p.popular ? 'text-white/90' : 'text-charcoal'}>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Plan button */}
                <div className="mt-8 pt-4">
                  <button
                    onClick={() => onSelectPlan(p.tier)}
                    className={`w-full py-3.5 rounded-xl font-semibold text-sm transition-all flex items-center justify-center gap-2 shadow-xs ${
                      p.popular
                        ? 'bg-white text-forest hover:bg-linen shadow-card hover:scale-[1.02]'
                        : 'bg-forest text-white hover:bg-forest-light'
                    }`}
                  >
                    <span>{p.buttonText}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <p className={`text-[11px] text-center mt-2.5 ${p.popular ? 'text-white/60' : 'text-charcoal-muted'}`}>
                    Simulated subscription toggle
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Enterprise Callout */}
        <div className="mt-16 p-6 rounded-2xl bg-sage-50 border border-sage-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-forest text-white flex items-center justify-center shrink-0">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-charcoal">Need multi-facility fleet routing?</h4>
              <p className="text-xs text-charcoal-muted">We configure custom SLAs, automated hardware load-sensors, and API webhooks.</p>
            </div>
          </div>
          <button
            onClick={() => onSelectPlan('Enterprise')}
            className="px-5 py-2.5 rounded-xl bg-white border border-border text-xs font-bold text-forest hover:bg-secondary transition-colors shrink-0"
          >
            Request Enterprise Architecture Brief
          </button>
        </div>
      </div>
    </section>
  );
};
