import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLaundry } from '../../context/LaundryContext';
import { CustomerLayout } from '../../components/customer/CustomerLayout';
import { OrderWizardModal } from '../../components/customer/OrderWizardModal';
import { StatusBadge } from '../../components/common/StatusBadge';
import {
  Sparkles,
  Calendar,
  Clock,
  ArrowRight,
  Shirt,
  ShieldCheck,
  ChevronRight,
  Plus,
  RefreshCw,
  Bell,
  MapPin,
} from 'lucide-react';

export const CustomerHomePage: React.FC = () => {
  const { orders, services, currentTenant } = useLaundry();
  const navigate = useNavigate();
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [selectedServiceId, setSelectedServiceId] = useState<string | undefined>();

  // Find most recent active order or default to LO-2048
  const activeOrder = orders.find((o) => o.status !== 'Delivered' && o.status !== 'Cancelled') || orders[0];
  const recentCompleted = orders.filter((o) => o.status === 'Delivered').slice(0, 3);

  const handleOpenBooking = (srvId?: string) => {
    setSelectedServiceId(srvId);
    setBookingModalOpen(true);
  };

  return (
    <CustomerLayout onOpenBookingModal={() => handleOpenBooking()}>
      <div className="space-y-6 text-left">
        {/* Welcome Greeting */}
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs text-charcoal-muted font-medium">
              Welcome back to {currentTenant.name}
            </div>
            <h1 className="text-2xl font-display font-bold text-charcoal tracking-tight mt-0.5">
              Good morning, Alex.
            </h1>
          </div>
          <button
            onClick={() => handleOpenBooking()}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-forest text-white text-xs font-semibold shadow-subtle hover:bg-forest-light transition-all"
          >
            <Plus className="w-4 h-4 text-linen" />
            <span>Book Laundry</span>
          </button>
        </div>

        {/* ACTIVE ORDER CARD: #LO-2048 (or current active order) */}
        {activeOrder && (
          <div className="rounded-2xl bg-white border border-sage-200 p-5 shadow-card relative overflow-hidden">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-charcoal-muted">
                  Active In-Progress Order
                </span>
                <div className="flex items-center gap-2 mt-1">
                  <h3 className="text-lg font-bold font-mono text-forest">#{activeOrder.orderId}</h3>
                  <StatusBadge status={activeOrder.status} size="sm" />
                </div>
                <p className="text-xs font-semibold text-charcoal mt-1">
                  {activeOrder.serviceName}
                </p>
              </div>

              <div className="text-right">
                <span className="text-sm font-bold text-charcoal font-mono">
                  ${activeOrder.total.toFixed(2)}
                </span>
                <div className="text-[10px] text-emerald-700 font-medium">Paid</div>
              </div>
            </div>

            {/* Current Stage Indicator */}
            <div className="mt-4 pt-3 border-t border-border/80">
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="text-charcoal font-medium flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-forest animate-pulse" />
                  Currently: <strong className="text-forest">{activeOrder.status}</strong>
                </span>
                <span className="text-charcoal-muted text-[11px] font-medium">
                  {activeOrder.deliveryTimeSlot ? `Expected ${activeOrder.deliveryTimeSlot.split('-')[0]}` : 'Today, 5:30 PM'}
                </span>
              </div>

              {/* Progress bar */}
              <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                <div
                  className="h-full bg-forest rounded-full transition-all duration-700"
                  style={{ width: `${activeOrder.progressPercentage}%` }}
                />
              </div>
            </div>

            {/* Tap to track full timeline */}
            <button
              onClick={() => navigate(`/app/track/${activeOrder.orderId}`)}
              className="mt-4 w-full py-2.5 rounded-xl bg-sage-50 hover:bg-sage-100 border border-sage-200 text-xs font-bold text-forest transition-colors flex items-center justify-center gap-2"
            >
              <span>Track Live Order & Milestones</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* QUICK SERVICE CARDS */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-charcoal">
              Available Laundry Services
            </h3>
            <span className="text-xs text-sage-600 font-medium">Dynamic Menu</span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {services.filter((s) => s.isActive).slice(0, 4).map((srv) => (
              <div
                key={srv.id}
                onClick={() => handleOpenBooking(srv.id)}
                className="group cursor-pointer rounded-2xl bg-white border border-border p-3.5 hover:border-sage-300 hover:shadow-card transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="h-24 rounded-xl overflow-hidden mb-2.5 bg-secondary">
                    <img
                      src={srv.imageUrl}
                      alt={srv.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <h4 className="text-xs font-bold text-charcoal group-hover:text-forest transition-colors line-clamp-1">
                    {srv.name}
                  </h4>
                  <div className="text-xs font-bold text-forest mt-0.5">
                    ${srv.price.toFixed(2)} <span className="text-[10px] text-charcoal-muted font-normal">{srv.unitLabel}</span>
                  </div>
                </div>

                <div className="mt-3 pt-2 border-t border-border flex items-center justify-between text-[11px] text-charcoal-muted group-hover:text-forest font-medium">
                  <span>{srv.turnaroundTime}</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* UPCOMING PICKUP SPOTLIGHT */}
        <div className="p-4 rounded-2xl bg-white border border-border flex items-start gap-3.5 shadow-xs">
          <div className="w-10 h-10 rounded-xl bg-sage-100 text-forest flex items-center justify-center shrink-0">
            <Calendar className="w-5 h-5" />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="text-xs font-bold text-charcoal">Doorstep Pickup Available</h4>
            <p className="text-xs text-charcoal-muted mt-0.5 leading-relaxed">
              Downtown Toronto daily routes. Next pickup window opens tomorrow at 9:00 AM.
            </p>
            <div className="mt-2 text-[11px] font-semibold text-forest flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              <span>142 King Street East, Apt 402</span>
            </div>
          </div>
        </div>

        {/* RECENT ORDERS LIST */}
        {recentCompleted.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold uppercase tracking-wider text-charcoal">
                Recent Orders
              </h3>
              <button
                onClick={() => navigate('/app/orders')}
                className="text-xs text-forest font-semibold hover:underline"
              >
                View all ({orders.length})
              </button>
            </div>

            <div className="space-y-2">
              {recentCompleted.map((ord) => (
                <div
                  key={ord.id}
                  onClick={() => navigate(`/app/track/${ord.orderId}`)}
                  className="p-3.5 rounded-xl bg-white border border-border hover:border-sage-300 transition-colors cursor-pointer flex items-center justify-between text-xs"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-surface-subtle border border-border flex items-center justify-center text-forest">
                      <Shirt className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-bold text-charcoal">#{ord.orderId} • {ord.serviceName}</div>
                      <div className="text-[10px] text-charcoal-muted">{ord.deliveryDate}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-charcoal font-mono">${ord.total.toFixed(2)}</span>
                    <div className="text-[10px] text-forest font-semibold">Delivered</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Booking Wizard Modal */}
      <OrderWizardModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        preselectedServiceId={selectedServiceId}
      />
    </CustomerLayout>
  );
};
