import React from 'react';
import { Layers, Truck, BarChart3, AlertOctagon } from 'lucide-react';

export const ProblemSection: React.FC = () => {
  const problems = [
    {
      icon: <Layers className="w-6 h-6 text-rose-700" />,
      tag: 'Disconnected Tools',
      title: 'Orders scattered across multiple systems',
      description:
        'Whiteboards, paper claim tickets, WhatsApp messages, and standalone card terminals leave your staff guessing which customer clothes are in which machine.',
      impact: 'Lost garment claims, delayed turnaround, and stressed front-desk operators.',
    },
    {
      icon: <Truck className="w-6 h-6 text-amber-700" />,
      tag: 'Logistical Friction',
      title: 'Pickup and delivery coordination chaos',
      description:
        'Trying to coordinate drivers across downtown apartment buildings through phone calls results in missed time slots, concierge confusion, and angry customer calls.',
      impact: 'Wasted fuel, inefficient routes, and negative Google reviews.',
    },
    {
      icon: <BarChart3 className="w-6 h-6 text-forest" />,
      tag: 'Zero Visibility',
      title: 'No clear overview of daily operations and revenue',
      description:
        'Owners lack real-time visibility into machine capacity, weekly customer retention rates, driver productivity, and recurring subscription revenue.',
      impact: 'Inability to scale to multiple facilities or optimize pricing models.',
    },
  ];

  return (
    <section className="py-24 bg-white border-y border-border relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 border border-rose-200 text-rose-800 text-xs font-semibold tracking-wide mb-4">
            <AlertOctagon className="w-3.5 h-3.5 text-rose-600" />
            <span>THE OPERATIONAL BOTTLENECK</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-charcoal tracking-tight">
            Running a laundromat shouldn't mean running after everything.
          </h2>

          <p className="mt-4 text-base sm:text-lg text-charcoal-muted leading-relaxed">
            Most laundromats rely on fragmented manual workarounds. As order volume increases,
            the operational friction quickly turns into costly mistakes and customer churn.
          </p>
        </div>

        {/* 3 Problem Cards */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-8">
          {problems.map((item, index) => (
            <div
              key={index}
              className="p-8 rounded-2xl bg-background border border-border hover:border-sage-300 hover:shadow-card transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-white border border-border flex items-center justify-center mb-6 shadow-xs">
                  {item.icon}
                </div>
                <div className="text-[11px] font-bold uppercase tracking-wider text-charcoal-muted mb-2">
                  {item.tag}
                </div>
                <h3 className="text-xl font-display font-bold text-charcoal mb-3">
                  {item.title}
                </h3>
                <p className="text-sm text-charcoal-muted leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-border/80 text-xs font-medium text-charcoal">
                <span className="text-rose-700 font-semibold">The Cost: </span>
                <span className="text-charcoal-muted">{item.impact}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
