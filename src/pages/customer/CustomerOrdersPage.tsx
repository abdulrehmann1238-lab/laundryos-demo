import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLaundry } from '../../context/LaundryContext';
import { CustomerLayout } from '../../components/customer/CustomerLayout';
import { StatusBadge } from '../../components/common/StatusBadge';
import { OrderWizardModal } from '../../components/customer/OrderWizardModal';
import { OrderItem } from '../../types';
import {
  Search,
  Filter,
  ArrowRight,
  RotateCcw,
  Shirt,
  Calendar,
  Clock,
  ChevronRight,
  Eye,
  X,
  CreditCard,
  MapPin,
} from 'lucide-react';

export const CustomerOrdersPage: React.FC = () => {
  const { orders } = useLaundry();
  const navigate = useNavigate();

  const [activeFilter, setActiveFilter] = useState<'all' | 'active' | 'completed' | 'cancelled'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOrderForModal, setSelectedOrderForModal] = useState<OrderItem | null>(null);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [reorderServiceId, setReorderServiceId] = useState<string | undefined>();

  const filteredOrders = orders.filter((o) => {
    // Tab filter
    if (activeFilter === 'active') {
      if (o.status === 'Delivered' || o.status === 'Cancelled') return false;
    } else if (activeFilter === 'completed') {
      if (o.status !== 'Delivered') return false;
    } else if (activeFilter === 'cancelled') {
      if (o.status !== 'Cancelled') return false;
    }

    // Search term
    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      return (
        o.orderId.toLowerCase().includes(q) ||
        o.serviceName.toLowerCase().includes(q) ||
        o.status.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const handleReorder = (order: OrderItem) => {
    setReorderServiceId(order.serviceId);
    setBookingModalOpen(true);
    setSelectedOrderForModal(null);
  };

  return (
    <CustomerLayout onOpenBookingModal={() => setBookingModalOpen(true)}>
      <div className="space-y-5 text-left">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-display font-bold text-charcoal">Order History</h1>
            <p className="text-xs text-charcoal-muted mt-0.5">
              Review and track past and active laundry batches
            </p>
          </div>

          <button
            onClick={() => setBookingModalOpen(true)}
            className="px-3 py-1.5 rounded-xl bg-forest text-white text-xs font-semibold shadow-xs"
          >
            + New Order
          </button>
        </div>

        {/* Search Input */}
        <div className="relative">
          <Search className="w-4 h-4 text-charcoal-muted absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by order #, service, status..."
            className="w-full pl-9 pr-4 py-2 rounded-xl border border-border bg-white text-xs text-charcoal focus:outline-none focus:border-forest"
          />
        </div>

        {/* Filter Tabs: All, Active, Completed, Cancelled */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-secondary/80 border border-border overflow-x-auto text-xs">
          {(['all', 'active', 'completed', 'cancelled'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveFilter(tab)}
              className={`px-3 py-1.5 rounded-lg font-semibold capitalize whitespace-nowrap transition-colors ${
                activeFilter === tab
                  ? 'bg-white text-forest shadow-xs'
                  : 'text-charcoal-muted hover:text-charcoal'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Orders Listing */}
        <div className="space-y-3">
          {filteredOrders.length === 0 ? (
            <div className="p-8 text-center rounded-2xl bg-white border border-border">
              <Shirt className="w-8 h-8 text-charcoal-muted/50 mx-auto mb-2" />
              <h4 className="text-sm font-bold text-charcoal">No orders found</h4>
              <p className="text-xs text-charcoal-muted mt-1">Try another filter or search term.</p>
            </div>
          ) : (
            filteredOrders.map((ord) => (
              <div
                key={ord.id}
                className="p-4 rounded-2xl bg-white border border-border hover:border-sage-300 hover:shadow-card transition-all"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-sm text-forest">#{ord.orderId}</span>
                      <StatusBadge status={ord.status} size="sm" />
                    </div>
                    <h4 className="text-xs font-bold text-charcoal mt-1">{ord.serviceName}</h4>
                    <span className="text-[11px] text-charcoal-muted block mt-0.5">
                      Pickup: {ord.pickupDate} ({ord.pickupTimeSlot})
                    </span>
                  </div>

                  <div className="text-right">
                    <span className="font-bold text-sm text-charcoal font-mono">
                      ${ord.total.toFixed(2)}
                    </span>
                    <div className="text-[10px] text-charcoal-muted font-medium">CAD</div>
                  </div>
                </div>

                {/* Progress bar if active */}
                {ord.status !== 'Delivered' && ord.status !== 'Cancelled' && (
                  <div className="mt-3">
                    <div className="flex justify-between text-[10px] text-charcoal-muted mb-1 font-medium">
                      <span>Status: {ord.status}</span>
                      <span>{ord.progressPercentage}% complete</span>
                    </div>
                    <div className="w-full h-1.5 bg-secondary rounded-full overflow-hidden">
                      <div className="h-full bg-forest rounded-full" style={{ width: `${ord.progressPercentage}%` }} />
                    </div>
                  </div>
                )}

                {/* Action buttons */}
                <div className="mt-3.5 pt-3 border-t border-border flex items-center justify-between text-xs">
                  <button
                    onClick={() => setSelectedOrderForModal(ord)}
                    className="text-charcoal-muted hover:text-charcoal font-medium flex items-center gap-1"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>View Details</span>
                  </button>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleReorder(ord)}
                      className="px-2.5 py-1 rounded-lg border border-border hover:bg-secondary text-charcoal font-semibold flex items-center gap-1 text-[11px]"
                    >
                      <RotateCcw className="w-3 h-3 text-sage-600" />
                      <span>Reorder</span>
                    </button>

                    <button
                      onClick={() => navigate(`/app/track/${ord.orderId}`)}
                      className="px-3 py-1 rounded-lg bg-forest text-white font-semibold flex items-center gap-1 text-[11px] hover:bg-forest-light"
                    >
                      <span>Track</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Order Detail Modal */}
      {selectedOrderForModal && (
        <div className="fixed inset-0 z-[130] flex items-center justify-center p-4 bg-charcoal/60 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-md bg-white rounded-2xl border border-border p-6 shadow-drawer max-h-[85vh] overflow-y-auto text-left">
            <div className="flex items-start justify-between pb-3 border-b border-border">
              <div>
                <span className="text-xs font-mono font-bold text-forest">#{selectedOrderForModal.orderId}</span>
                <h3 className="text-base font-bold text-charcoal mt-0.5">{selectedOrderForModal.serviceName}</h3>
              </div>
              <button
                onClick={() => setSelectedOrderForModal(null)}
                className="p-1 rounded-lg hover:bg-secondary text-charcoal-muted"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-4 space-y-3 text-xs">
              <div className="flex justify-between py-1 border-b border-border/60">
                <span className="text-charcoal-muted">Current Status:</span>
                <StatusBadge status={selectedOrderForModal.status} size="sm" />
              </div>
              <div className="flex justify-between py-1 border-b border-border/60">
                <span className="text-charcoal-muted">Detergent Preference:</span>
                <span className="font-semibold">{selectedOrderForModal.preferences.detergent}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-border/60">
                <span className="text-charcoal-muted">Wash Mode:</span>
                <span className="font-semibold">{selectedOrderForModal.preferences.coldWash ? 'Cold Gentle' : 'Warm'}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-border/60">
                <span className="text-charcoal-muted">Pickup Window:</span>
                <span className="font-semibold">{selectedOrderForModal.pickupDate} ({selectedOrderForModal.pickupTimeSlot})</span>
              </div>
              <div className="flex justify-between py-1 border-b border-border/60">
                <span className="text-charcoal-muted">Address:</span>
                <span className="font-semibold">{selectedOrderForModal.pickupAddress}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-border/60">
                <span className="text-charcoal-muted">Payment:</span>
                <span className="font-semibold">{selectedOrderForModal.paymentMethod} ({selectedOrderForModal.paymentStatus})</span>
              </div>
              <div className="flex justify-between py-1 font-bold text-sm pt-2">
                <span>Total Paid:</span>
                <span className="font-mono text-forest">${selectedOrderForModal.total.toFixed(2)} CAD</span>
              </div>
            </div>

            <div className="pt-3 border-t border-border flex gap-2">
              <button
                onClick={() => handleReorder(selectedOrderForModal)}
                className="flex-1 py-2 rounded-xl bg-forest text-white text-xs font-bold hover:bg-forest-light flex items-center justify-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reorder This Service</span>
              </button>
              <button
                onClick={() => {
                  const id = selectedOrderForModal.orderId;
                  setSelectedOrderForModal(null);
                  navigate(`/app/track/${id}`);
                }}
                className="px-4 py-2 rounded-xl border border-border text-xs font-semibold hover:bg-secondary"
              >
                Track
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Booking Wizard Modal */}
      <OrderWizardModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        preselectedServiceId={reorderServiceId}
      />
    </CustomerLayout>
  );
};
