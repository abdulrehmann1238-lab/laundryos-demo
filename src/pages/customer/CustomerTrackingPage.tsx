import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useLaundry } from '../../context/LaundryContext';
import { CustomerLayout } from '../../components/customer/CustomerLayout';
import { StatusBadge } from '../../components/common/StatusBadge';
import { OrderStatus } from '../../types';
import {
  ArrowLeft,
  FastForward,
  Clock,
  MapPin,
  Truck,
  CheckCircle2,
  Calendar,
  CreditCard,
  Shirt,
  Sparkles,
  Phone,
  MessageSquare,
} from 'lucide-react';

export const CustomerTrackingPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { orders, simulateNextOrderStep, currentTenant } = useLaundry();

  const targetOrder = orders.find((o) => o.orderId === id || o.id === id) || orders[0];

  const ORDER_TRACKING_MILESTONES: { status: OrderStatus; label: string; desc: string }[] = [
    { status: 'Confirmed', label: 'Order Confirmed', desc: 'Order details verified & scheduled' },
    { status: 'Pickup Scheduled', label: 'Pickup Scheduled', desc: 'Assigned to driver route' },
    { status: 'Picked Up', label: 'Linen Bag Collected', desc: 'Driver collected & scanned bag' },
    { status: 'Washing', label: 'Washing in Drum', desc: 'Gentle temperature sanitizing cycle' },
    { status: 'Drying', label: 'Low-Heat Tumble Drying', desc: 'Moisture sensor active' },
    { status: 'Folding', label: 'Crisp Folding & Packing', desc: 'Hotel-grade fold & eco linen packaging' },
    { status: 'Out for Delivery', label: 'Out for Delivery', desc: 'Driver en route to your address' },
    { status: 'Delivered', label: 'Delivered & Completed', desc: 'Safely handed over to you' },
  ];

  const getMilestoneIndex = (status: OrderStatus) => {
    return ORDER_TRACKING_MILESTONES.findIndex((m) => m.status === status);
  };

  const currentIdx = getMilestoneIndex(targetOrder.status);

  const handleSimulateNext = () => {
    simulateNextOrderStep(targetOrder.orderId);
  };

  return (
    <CustomerLayout onOpenBookingModal={() => navigate('/app')}>
      <div className="space-y-6 text-left">
        {/* Top Header & Back Navigation */}
        <div className="flex items-center justify-between">
          <Link
            to="/app/orders"
            className="flex items-center gap-1.5 text-xs font-semibold text-charcoal hover:text-forest transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>All Orders</span>
          </Link>

          <span className="text-xs text-charcoal-muted">
            Live Telemetry • {currentTenant.name}
          </span>
        </div>

        {/* Order Overview Header Card */}
        <div className="p-5 rounded-2xl bg-white border border-border shadow-card relative overflow-hidden">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold font-mono text-forest">#{targetOrder.orderId}</h2>
                <StatusBadge status={targetOrder.status} size="sm" />
              </div>
              <h3 className="text-sm font-bold text-charcoal mt-1">
                {targetOrder.serviceName}
              </h3>
              <p className="text-xs text-charcoal-muted mt-0.5">
                {targetOrder.preferences.detergent} Detergent • {targetOrder.preferences.coldWash ? 'Cold Wash' : 'Standard Wash'}
              </p>
            </div>

            <div className="text-right">
              <span className="text-base font-bold text-charcoal font-mono">
                ${targetOrder.total.toFixed(2)}
              </span>
              <div className="text-[10px] text-emerald-700 font-medium">
                {targetOrder.paymentStatus} via {targetOrder.paymentMethod}
              </div>
            </div>
          </div>

          {/* Quick Details Bar */}
          <div className="mt-4 pt-3 border-t border-border grid grid-cols-2 gap-3 text-xs">
            <div className="flex items-start gap-2">
              <Calendar className="w-3.5 h-3.5 text-forest shrink-0 mt-0.5" />
              <div>
                <span className="text-charcoal-muted text-[10px] block">Pickup Window</span>
                <span className="font-semibold text-charcoal">{targetOrder.pickupDate}</span>
                <span className="text-[10px] text-charcoal-muted block">{targetOrder.pickupTimeSlot}</span>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <MapPin className="w-3.5 h-3.5 text-forest shrink-0 mt-0.5" />
              <div>
                <span className="text-charcoal-muted text-[10px] block">Delivery Location</span>
                <span className="font-semibold text-charcoal truncate block max-w-[140px]">
                  {targetOrder.deliveryAddress.split(',')[0]}
                </span>
                <span className="text-[10px] text-charcoal-muted block">Concierge Desk</span>
              </div>
            </div>
          </div>
        </div>

        {/* SIMULATE NEXT UPDATE BUTTON (Highlight requirement!) */}
        <div className="p-4 rounded-2xl bg-sage-50 border border-sage-300 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-forest">
              <Sparkles className="w-4 h-4" />
              <span>Interactive Workflow Simulation</span>
            </div>
            <p className="text-xs text-charcoal-muted mt-0.5">
              Click to advance this order to the next milestone and trigger a push notification.
            </p>
          </div>

          <button
            onClick={handleSimulateNext}
            disabled={targetOrder.status === 'Delivered'}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 ${
              targetOrder.status === 'Delivered'
                ? 'bg-border text-charcoal-muted cursor-not-allowed'
                : 'bg-forest text-white hover:bg-forest-light shadow-card hover:scale-105'
            }`}
          >
            <FastForward className="w-4 h-4" />
            <span>{targetOrder.status === 'Delivered' ? 'Order Completed' : 'Simulate Next Update'}</span>
          </button>
        </div>

        {/* VERTICAL PROGRESS TIMELINE (8 Stages) */}
        <div className="p-5 rounded-2xl bg-white border border-border shadow-xs">
          <h4 className="text-xs font-bold uppercase tracking-wider text-charcoal mb-4">
            Order Progress Lifecycle
          </h4>

          <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-border">
            {ORDER_TRACKING_MILESTONES.map((step, idx) => {
              const isPast = currentIdx > idx;
              const isCurrent = currentIdx === idx;
              const isFuture = currentIdx < idx;

              return (
                <div key={step.status} className="relative flex items-start gap-3">
                  {/* Circle milestone indicator */}
                  <div
                    className={`absolute -left-6 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                      isPast
                        ? 'bg-forest text-white'
                        : isCurrent
                        ? 'bg-forest text-white ring-4 ring-sage-200 animate-pulse'
                        : 'bg-secondary border border-border text-charcoal-muted'
                    }`}
                  >
                    {isPast ? <CheckCircle2 className="w-3.5 h-3.5" /> : idx + 1}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h5
                        className={`text-xs font-bold ${
                          isCurrent
                            ? 'text-forest text-sm'
                            : isPast
                            ? 'text-charcoal'
                            : 'text-charcoal-muted'
                        }`}
                      >
                        {step.label}
                      </h5>
                      {isCurrent && (
                        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-sage-100 text-forest">
                          ACTIVE NOW
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-charcoal-muted mt-0.5">{step.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Assigned Driver Card if available */}
        {targetOrder.driverName && (
          <div className="p-4 rounded-2xl bg-white border border-border flex items-center justify-between text-xs">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-forest text-white flex items-center justify-center font-bold">
                <Truck className="w-4 h-4 text-linen" />
              </div>
              <div>
                <span className="text-[10px] text-charcoal-muted block">Dedicated Driver</span>
                <span className="font-bold text-charcoal">{targetOrder.driverName}</span>
                <span className="text-[10px] text-forest block">FreshFold Logistics Van #03</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => alert(`Simulated call to driver ${targetOrder.driverName}`)}
                className="p-2 rounded-xl border border-border hover:bg-secondary text-charcoal transition-colors"
                title="Call Driver"
              >
                <Phone className="w-4 h-4" />
              </button>
              <button
                onClick={() => alert(`Simulated SMS chat with driver ${targetOrder.driverName}`)}
                className="p-2 rounded-xl border border-border hover:bg-secondary text-charcoal transition-colors"
                title="Message Driver"
              >
                <MessageSquare className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </CustomerLayout>
  );
};
