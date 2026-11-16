import React, { useState } from 'react';
import {
  Smartphone,
  Building2,
  Truck,
  PackageCheck,
  CreditCard,
  TrendingUp,
  Check,
  ArrowRight,
} from 'lucide-react';

interface FeaturesSectionProps {
  onOpenDemo: () => void;
}

export const FeaturesSection: React.FC<FeaturesSectionProps> = ({ onOpenDemo }) => {
  const [activeFeature, setActiveFeature] = useState(0);

  const features = [
    {
      id: 'customer-ordering',
      title: 'Customer Ordering',
      icon: <Smartphone className="w-5 h-5 text-forest" />,
      tag: 'Touch-First App',
      description:
        'A sleek mobile booking experience where customers select services, configure hypoallergenic detergent and fold preferences, and schedule doorstep pickups.',
      image: 'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?auto=format&fit=crop&w=800&q=80',
      bullets: [
        'Multi-step booking wizard with dynamic price calculation',
        'Detailed laundry preferences (fragrance-free, cold wash, delicates)',
        'Apple Pay, Google Pay & card payment simulation',
      ],
    },
    {
      id: 'business-management',
      title: 'Business Management',
      icon: <Building2 className="w-5 h-5 text-forest" />,
      tag: 'Multi-Tenant OS',
      description:
        'Centralize store settings, operating hours, service catalogs, price-per-pound rules, and staff permissions across single or multi-facility laundromats.',
      image: 'https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?auto=format&fit=crop&w=800&q=80',
      bullets: [
        'Complete tenant isolation for independent laundromat franchises',
        'Dynamic service catalog editing with immediate sync to customer menu',
        'Role-based permissions for Owners, Managers, Operators, and Drivers',
      ],
    },
    {
      id: 'pickup-delivery',
      title: 'Pickup & Delivery',
      icon: <Truck className="w-5 h-5 text-forest" />,
      tag: 'Logistics Engine',
      description:
        'Schedule, optimize, and dispatch drivers across delivery zones. Track collected linen bags from concierge desks straight to the wash line.',
      image: 'https://images.unsplash.com/photo-1526367790999-0150786686a2?auto=format&fit=crop&w=800&q=80',
      bullets: [
        'Interactive route stops and driver assignments',
        'Dedicated driver view with mark collected & delivered toggles',
        'Automatic customer SMS/push notification triggers upon arrival',
      ],
    },
    {
      id: 'order-management',
      title: 'Order Management',
      icon: <PackageCheck className="w-5 h-5 text-forest" />,
      tag: 'Shop Floor Pipeline',
      description:
        'Follow each garment batch through washing, tumble drying, lint inspection, and crisp linen folding with digital audit logs.',
      image: 'https://images.unsplash.com/photo-1489274495757-95c7c837b101?auto=format&fit=crop&w=800&q=80',
      bullets: [
        'Visual status transitions with single-click updates',
        'Drawer view with complete customer history, internal notes, and bag weights',
        'Filter by status, date, pickup window, or payment state',
      ],
    },
    {
      id: 'payment-management',
      title: 'Payment Management',
      icon: <CreditCard className="w-5 h-5 text-forest" />,
      tag: 'Financial Flow',
      description:
        'Instant receipts, automated tax handling, idempotent transactions, and one-click refunds with detailed audit trails.',
      image: 'https://images.unsplash.com/photo-1556742049-0a67c5574f73?auto=format&fit=crop&w=800&q=80',
      bullets: [
        'Transparent breakdown: base price, delivery fees, and provincial taxes',
        'Simulated refund processing with confirmation protection',
        'Full transaction ledger synchronized with order IDs',
      ],
    },
    {
      id: 'business-analytics',
      title: 'Business Analytics',
      icon: <TrendingUp className="w-5 h-5 text-forest" />,
      tag: 'Growth Intelligence',
      description:
        'Actionable intelligence on daily revenue, peak drop-off hours, average order value, top requested services, and repeat customer retention.',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
      bullets: [
        'Interactive Recharts visualizations with customizable date ranges',
        'Repeat customer cohort rate & lifetime value (LTV) calculation',
        'Service popularity distribution charts to optimize machine allocation',
      ],
    },
  ];

  return (
    <section id="features" className="py-28 bg-background relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sage-100 border border-sage-200 text-forest text-xs font-semibold tracking-wide mb-3">
            <span>UNIFIED OPERATIONAL SUITE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-charcoal tracking-tight">
            Everything your laundromat needs. One connected platform.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-charcoal-muted leading-relaxed">
            Eliminate fragmented tools. LaundryOS connects front-of-house customer mobile ordering
            with back-of-house washing operations, drivers, and financial reporting.
          </p>
        </div>

        {/* 6 Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feat, index) => (
            <div
              key={feat.id}
              className="group rounded-2xl bg-white border border-border hover:border-sage-300 hover:shadow-card transition-all duration-300 overflow-hidden flex flex-col justify-between"
            >
              <div>
                {/* Visual Image Header */}
                <div className="relative h-48 overflow-hidden bg-secondary">
                  <img
                    src={feat.image}
                    alt={feat.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-white/95 backdrop-blur-md border border-white/60 shadow-xs flex items-center gap-1.5 text-xs font-semibold text-charcoal">
                    {feat.icon}
                    <span>{feat.tag}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-display font-bold text-charcoal group-hover:text-forest transition-colors">
                    {feat.title}
                  </h3>
                  <p className="text-sm text-charcoal-muted mt-2.5 leading-relaxed">
                    {feat.description}
                  </p>

                  {/* Bullet points */}
                  <ul className="mt-5 space-y-2">
                    {feat.bullets.map((b, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-charcoal font-medium">
                        <Check className="w-4 h-4 text-forest shrink-0 mt-0.5" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action link */}
              <div className="p-6 pt-0">
                <button
                  onClick={onOpenDemo}
                  className="w-full py-2.5 rounded-xl border border-border text-xs font-semibold text-charcoal hover:bg-forest hover:text-white hover:border-forest transition-all flex items-center justify-center gap-2 group-hover:border-sage-300"
                >
                  <span>Test in Interactive Demo</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
