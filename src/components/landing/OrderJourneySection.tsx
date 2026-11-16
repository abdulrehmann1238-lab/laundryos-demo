import React, { useState } from 'react';
import {
  Smartphone,
  CalendarCheck,
  Truck,
  RotateCw,
  Wind,
  Package,
  Navigation,
  CheckCircle2,
  Bell,
  ArrowRight,
} from 'lucide-react';

export const OrderJourneySection: React.FC = () => {
  const [activeStageIndex, setActiveStageIndex] = useState(3); // Default to "Washing"

  const stages = [
    {
      id: 'order-placed',
      title: 'Order Placed',
      short: 'Placed',
      icon: <Smartphone className="w-5 h-5" />,
      timeEstimate: 'Minute 0',
      description:
        'Customer books Wash & Fold via mobile web or iOS app, selects preferences (hypoallergenic detergent, cold water, line dry delicates), and completes secure checkout.',
      notificationTitle: 'Order #LO-2048 Confirmed',
      notificationText: 'Thank you Alex! Your order has been scheduled for pickup today between 9:00 AM - 11:00 AM.',
      facilityAction: 'Order routed directly to FreshFold plant dispatcher and scheduled in driver route.',
    },
    {
      id: 'pickup-scheduled',
      title: 'Pickup Scheduled',
      short: 'Scheduled',
      icon: <CalendarCheck className="w-5 h-5" />,
      timeEstimate: '+15 mins',
      description:
        'The dispatch algorithm batches the pickup into driver Olivia Brown’s downtown morning route and calculates optimal transit time.',
      notificationTitle: 'Driver Assigned for Pickup',
      notificationText: 'Olivia Brown is en route to 142 King Street East in a LaundryOS EV van.',
      facilityAction: 'Driver device synced with digital bag barcode and concierge entry code.',
    },
    {
      id: 'collected',
      title: 'Collected',
      short: 'Collected',
      icon: <Truck className="w-5 h-5" />,
      timeEstimate: '+45 mins',
      description:
        'Driver collects the laundry bag from customer or front desk, scans the QR tag, and logs weight verification into the driver portal.',
      notificationTitle: 'Laundry Bag Collected',
      notificationText: 'Your laundry has been securely scanned into van #03 and is en route to our facility.',
      facilityAction: 'Linen bag scanned at shop intake dock, weighed on digital scale, and tagged.',
    },
    {
      id: 'washing',
      title: 'Washing',
      short: 'Washing',
      icon: <RotateCw className="w-5 h-5 animate-spin" />,
      timeEstimate: '+2 hours',
      description:
        'Garments are sorted by darks, lights, and delicates. Loaded into high-efficiency commercial washer with customer-specified fragrance-free organic detergent.',
      notificationTitle: 'Washing in Progress',
      notificationText: 'Machine #04 is running your gentle cold wash cycle. Expected completion: 45 mins.',
      facilityAction: 'Operator David Miller monitors water temperature and cycle timer on the floor dashboard.',
    },
    {
      id: 'drying',
      title: 'Drying',
      short: 'Drying',
      icon: <Wind className="w-5 h-5" />,
      timeEstimate: '+3 hours',
      description:
        'Tumble dried on low temperature to preserve fiber elasticity and prevent shrinkage. Moisture sensors verify ideal dryness without baking fabrics.',
      notificationTitle: 'Drying Cycle Active',
      notificationText: 'Your garments are currently in low-heat moisture-controlled tumble drying.',
      facilityAction: 'Dryer sensors automatically shut off heat when target 3% moisture content is reached.',
    },
    {
      id: 'folding',
      title: 'Folding',
      short: 'Folding',
      icon: <Package className="w-5 h-5" />,
      timeEstimate: '+4 hours',
      description:
        'Crisply folded by hand according to hotel-grade presentation standards. Socks matched, shirts squared, packaged in sealed breathable recycled paper bags.',
      notificationTitle: 'Crisply Folded & Packaged',
      notificationText: 'Your clean clothes have been packaged in our signature protective eco-linen wrap.',
      facilityAction: 'Quality inspector stamps batch verification code and stages on shelf #B-12 for driver loading.',
    },
    {
      id: 'out-for-delivery',
      title: 'Out for Delivery',
      short: 'Out for Delivery',
      icon: <Navigation className="w-5 h-5" />,
      timeEstimate: '+5 hours',
      description:
        'Dispatched on evening delivery run. The customer receives a live tracking link with courier arrival time window and live stop updates.',
      notificationTitle: 'Out for Delivery with Olivia',
      notificationText: 'Olivia Brown is 3 stops away from 142 King St E. Estimated arrival in 22 minutes.',
      facilityAction: 'Real-time telemetry and GPS window updates displayed on operations map.',
    },
    {
      id: 'delivered',
      title: 'Delivered',
      short: 'Delivered',
      icon: <CheckCircle2 className="w-5 h-5" />,
      timeEstimate: '+5.5 hours',
      description:
        'Delivered straight to the customer door or concierge with signature confirmation and digital photo proof of delivery.',
      notificationTitle: 'Delivered! Fresh Laundry Awaits',
      notificationText: 'Order #LO-2048 was safely handed over. Rate your experience or reorder with 1-click.',
      facilityAction: 'Order status transitioned to completed, revenue captured, and invoice emailed.',
    },
  ];

  const currentStage = stages[activeStageIndex];
  const progressPercent = ((activeStageIndex) / (stages.length - 1)) * 100;

  return (
    <section id="journey" className="py-28 bg-white border-y border-border relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sage-100 border border-sage-200 text-forest text-xs font-semibold tracking-wide mb-3">
            <span>END-TO-END VISIBILITY</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-charcoal tracking-tight">
            From pickup to perfectly folded.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-charcoal-muted leading-relaxed">
            Click any milestone along the 8-stage laundry lifecycle to see how LaundryOS synchronizes
            shop floor machinery, drivers, and instant customer notifications.
          </p>
        </div>

        {/* 8-Stage Interactive Timeline Bar */}
        <div className="relative mb-14">
          {/* Background Track Line */}
          <div className="hidden lg:block absolute top-1/2 left-6 right-6 -translate-y-1/2 h-1 bg-border rounded-full z-0" />
          {/* Active Fill Line */}
          <div
            className="hidden lg:block absolute top-1/2 left-6 -translate-y-1/2 h-1 bg-forest rounded-full transition-all duration-500 z-0"
            style={{ width: `calc(${progressPercent}% * 0.92)` }}
          />

          {/* Milestone Buttons */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 sm:gap-2 relative z-10">
            {stages.map((st, idx) => {
              const isPassed = idx <= activeStageIndex;
              const isCurrent = idx === activeStageIndex;

              return (
                <button
                  key={st.id}
                  onClick={() => setActiveStageIndex(idx)}
                  className={`flex flex-col items-center text-center p-3 sm:p-2 rounded-2xl transition-all ${
                    isCurrent
                      ? 'bg-forest text-white shadow-elevated scale-105'
                      : isPassed
                      ? 'bg-sage-50 text-forest hover:bg-sage-100 border border-sage-200'
                      : 'bg-surface text-charcoal-muted hover:bg-secondary border border-border'
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center mb-2 transition-colors ${
                      isCurrent
                        ? 'bg-white/20 text-white'
                        : isPassed
                        ? 'bg-sage-200/80 text-forest'
                        : 'bg-secondary text-charcoal-muted'
                    }`}
                  >
                    {st.icon}
                  </div>
                  <span className="text-xs font-bold leading-tight line-clamp-1">{st.short}</span>
                  <span className={`text-[10px] mt-0.5 ${isCurrent ? 'text-white/80' : 'text-charcoal-muted'}`}>
                    Step 0{idx + 1}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Stage Detailed Breakdown & Notification Card */}
        <div className="max-w-4xl mx-auto rounded-3xl bg-background border border-border shadow-card p-6 sm:p-10 transition-all duration-300">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            {/* Left Column: Stage Explanation */}
            <div className="md:col-span-7">
              <div className="flex items-center gap-3 mb-2">
                <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-forest text-white">
                  Stage 0{activeStageIndex + 1} of 08
                </span>
                <span className="text-xs text-charcoal-muted font-medium">{currentStage.timeEstimate}</span>
              </div>

              <h3 className="text-2xl font-display font-bold text-charcoal mt-2">
                {currentStage.title}
              </h3>

              <p className="mt-4 text-sm text-charcoal-muted leading-relaxed">
                {currentStage.description}
              </p>

              <div className="mt-6 pt-5 border-t border-border flex items-start gap-3">
                <div className="w-7 h-7 rounded-lg bg-sage-100 text-forest flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-charcoal">Shop Floor & Operations Event</div>
                  <div className="text-xs text-charcoal-muted mt-0.5">{currentStage.facilityAction}</div>
                </div>
              </div>
            </div>

            {/* Right Column: Live Simulated Customer Push Notification */}
            <div className="md:col-span-5">
              <div className="rounded-2xl bg-white p-5 border border-sage-200 shadow-drawer relative">
                <div className="flex items-center justify-between pb-3 border-b border-border text-[11px] font-semibold text-charcoal-muted">
                  <div className="flex items-center gap-1.5">
                    <Bell className="w-3.5 h-3.5 text-forest" />
                    <span>Customer Notification Preview</span>
                  </div>
                  <span>Now</span>
                </div>

                <div className="mt-3.5 flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-forest text-white flex items-center justify-center shrink-0 shadow-xs">
                    <Package className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-charcoal leading-snug">
                      {currentStage.notificationTitle}
                    </h5>
                    <p className="text-xs text-charcoal-muted mt-1 leading-relaxed">
                      {currentStage.notificationText}
                    </p>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-border flex items-center justify-between text-[11px]">
                  <span className="text-forest font-semibold">Sent via SMS & Push</span>
                  <span className="text-charcoal-muted font-mono">142 King St E</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
