import React, { useState } from 'react';
import { useLaundry } from '../../context/LaundryContext';
import { OrderItem, OrderStatus } from '../../types';
import { StatusBadge } from '../common/StatusBadge';
import {
  X,
  Clock,
  MapPin,
  Truck,
  CreditCard,
  User,
  Calendar,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Phone,
  Mail,
  Shield,
  Layers,
} from 'lucide-react';

interface OrderDetailDrawerProps {
  order: OrderItem | null;
  onClose: () => void;
}

export const OrderDetailDrawer: React.FC<OrderDetailDrawerProps> = ({ order, onClose }) => {
  const { updateOrderStatus, teamMembers, assignDriver, currentTenant } = useLaundry();

  if (!order) return null;

  const ALL_STATUSES: OrderStatus[] = [
    'Pending',
    'Confirmed',
    'Pickup Scheduled',
    'Picked Up',
    'Washing',
    'Drying',
    'Folding',
    'Ready for Delivery',
    'Out for Delivery',
    'Delivered',
    'Cancelled',
  ];

  const drivers = teamMembers.filter((m) => m.role === 'Driver');

  const handleStatusChange = (newStatus: OrderStatus) => {
    updateOrderStatus(order.orderId, newStatus);
  };

  const handleDriverChange = (driverId: string) => {
    const driver = teamMembers.find((m) => m.id === driverId);
    if (driver) {
      assignDriver(order.orderId, driver.id, driver.name);
    }
  };

  return (
    <div className="fixed inset-0 z-[140] flex justify-end bg-charcoal/40 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="w-full max-w-lg bg-white h-full shadow-drawer border-l border-border flex flex-col justify-between overflow-hidden animate-in slide-in-from-right duration-300 text-left">
        {/* Header */}
        <div className="p-6 border-b border-border bg-surface-subtle flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="font-mono text-xl font-bold text-forest">#{order.orderId}</span>
              <StatusBadge status={order.status} size="md" />
            </div>
            <h3 className="text-base font-bold text-charcoal mt-1">{order.serviceName}</h3>
            <p className="text-xs text-charcoal-muted mt-0.5">
              Placed on {new Date(order.createdAt).toLocaleDateString()} via Customer App
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-charcoal-muted hover:text-charcoal hover:bg-secondary transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Drawer Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 text-xs">
          {/* FUNCTIONAL STATUS CONTROLLER (Workflows B & C) */}
          <div className="p-4 rounded-2xl bg-sage-50 border border-sage-300 shadow-xs">
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold text-forest uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Shop Floor Status Transition</span>
              </span>
              <span className="text-[10px] text-charcoal-muted font-medium">Updates Customer App</span>
            </div>

            <label className="block text-charcoal font-semibold mb-1">
              Advance / Change Order State:
            </label>
            <select
              value={order.status}
              onChange={(e) => handleStatusChange(e.target.value as OrderStatus)}
              className="w-full p-2.5 rounded-xl border border-border bg-white text-charcoal font-bold text-xs focus:outline-none focus:border-forest shadow-xs"
            >
              {ALL_STATUSES.map((st) => (
                <option key={st} value={st}>
                  {st} {st === order.status ? '(Current Active)' : ''}
                </option>
              ))}
            </select>

            <p className="text-[11px] text-charcoal-muted mt-2 leading-relaxed">
              Selecting a status updates the database record, moves the customer progress timeline, and dispatches a customer notification immediately.
            </p>
          </div>

          {/* Customer Information */}
          <div className="p-4 rounded-2xl bg-white border border-border space-y-2">
            <h4 className="font-bold text-charcoal uppercase tracking-wider text-[11px] flex items-center gap-1.5 mb-2">
              <User className="w-3.5 h-3.5 text-forest" />
              <span>Customer Information</span>
            </h4>
            <div className="flex justify-between py-1 border-b border-border/60">
              <span className="text-charcoal-muted">Full Name</span>
              <span className="font-bold text-charcoal">{order.customerName}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-border/60">
              <span className="text-charcoal-muted">Email</span>
              <span className="font-medium text-charcoal">{order.customerEmail}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-border/60">
              <span className="text-charcoal-muted">Phone</span>
              <span className="font-mono text-charcoal">{order.customerPhone}</span>
            </div>
          </div>

          {/* Logistics & Driver Assignment */}
          <div className="p-4 rounded-2xl bg-white border border-border space-y-3">
            <h4 className="font-bold text-charcoal uppercase tracking-wider text-[11px] flex items-center gap-1.5 mb-1">
              <Truck className="w-3.5 h-3.5 text-forest" />
              <span>Logistics & Route Assignment</span>
            </h4>

            <div>
              <label className="block text-charcoal-muted mb-1 font-medium">Assigned Courier Driver</label>
              <select
                value={order.driverId || ''}
                onChange={(e) => handleDriverChange(e.target.value)}
                className="w-full p-2 rounded-xl border border-border bg-white font-medium text-charcoal"
              >
                <option value="">-- Unassigned (Fleet Pool) --</option>
                {drivers.map((drv) => (
                  <option key={drv.id} value={drv.id}>
                    {drv.name} ({drv.assignedZone || 'All Zones'})
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2 pt-1">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-forest shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-charcoal">Pickup & Delivery Address:</span>
                  <p className="text-charcoal-muted leading-relaxed">{order.pickupAddress}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-forest shrink-0" />
                <div>
                  <span className="font-bold text-charcoal">Pickup Window: </span>
                  <span className="text-charcoal-muted">{order.pickupDate} ({order.pickupTimeSlot})</span>
                </div>
              </div>
            </div>
          </div>

          {/* Laundry Preferences & Machine Specs */}
          <div className="p-4 rounded-2xl bg-white border border-border space-y-2">
            <h4 className="font-bold text-charcoal uppercase tracking-wider text-[11px] mb-2">
              Customer Cleaning Preferences
            </h4>
            <div className="grid grid-cols-2 gap-2 text-[11px]">
              <div className="p-2 rounded-lg bg-surface-subtle border border-border">
                <span className="text-charcoal-muted block">Detergent</span>
                <span className="font-bold text-charcoal">{order.preferences.detergent}</span>
              </div>
              <div className="p-2 rounded-lg bg-surface-subtle border border-border">
                <span className="text-charcoal-muted block">Wash Mode</span>
                <span className="font-bold text-charcoal">{order.preferences.coldWash ? 'Cold Water Gentle' : 'Warm Normal'}</span>
              </div>
              <div className="p-2 rounded-lg bg-surface-subtle border border-border">
                <span className="text-charcoal-muted block">Fabric Softener</span>
                <span className="font-bold text-charcoal">{order.preferences.softener ? 'Yes' : 'None'}</span>
              </div>
              <div className="p-2 rounded-lg bg-surface-subtle border border-border">
                <span className="text-charcoal-muted block">Color Sorting</span>
                <span className="font-bold text-charcoal">{order.preferences.separateColors ? 'Separate Drums' : 'Mixed'}</span>
              </div>
            </div>

            {order.preferences.specialInstructions && (
              <div className="mt-2 p-2.5 rounded-lg bg-linen-light border border-linen text-[11px]">
                <strong className="text-charcoal">Special Note: </strong>
                <span className="text-charcoal-muted">{order.preferences.specialInstructions}</span>
              </div>
            )}
          </div>

          {/* Financial Breakdown */}
          <div className="p-4 rounded-2xl bg-white border border-border space-y-2">
            <h4 className="font-bold text-charcoal uppercase tracking-wider text-[11px] flex items-center gap-1.5 mb-2">
              <CreditCard className="w-3.5 h-3.5 text-forest" />
              <span>Billing Breakdown</span>
            </h4>
            <div className="flex justify-between py-1 border-b border-border/60">
              <span className="text-charcoal-muted">Base Service</span>
              <span className="font-mono">${order.basePrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-border/60">
              <span className="text-charcoal-muted">Delivery Fee</span>
              <span className="font-mono">${order.deliveryFee.toFixed(2)}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-border/60">
              <span className="text-charcoal-muted">HST Tax (13%)</span>
              <span className="font-mono">${order.tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between py-1 font-bold text-sm pt-2">
              <span>Total CAD</span>
              <span className="font-mono text-forest">${order.total.toFixed(2)}</span>
            </div>
            <div className="text-[10px] text-charcoal-muted pt-1 flex items-center justify-between">
              <span>Payment Method: {order.paymentMethod}</span>
              <span className="text-emerald-700 font-bold">{order.paymentStatus}</span>
            </div>
          </div>

          {/* Order Event Timeline History */}
          <div className="p-4 rounded-2xl bg-white border border-border space-y-3">
            <h4 className="font-bold text-charcoal uppercase tracking-wider text-[11px]">
              Audit Trail & Event Log
            </h4>
            <div className="relative pl-5 space-y-3 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-border">
              {order.timeline.map((evt, idx) => (
                <div key={idx} className="relative">
                  <span className="absolute -left-5 top-1 w-2.5 h-2.5 rounded-full bg-forest" />
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-charcoal text-[11px]">{evt.status}</span>
                    <span className="text-[10px] text-charcoal-muted">{evt.timestamp}</span>
                  </div>
                  <p className="text-[11px] text-charcoal-muted mt-0.5">{evt.note}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-border bg-surface-subtle flex items-center justify-between text-xs">
          <span className="text-charcoal-muted font-mono">{currentTenant.name}</span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-forest text-white font-semibold hover:bg-forest-light transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
