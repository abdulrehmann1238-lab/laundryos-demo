import React, { useState } from 'react';
import { useLaundry } from '../../context/LaundryContext';
import { X, Check, Plus, User, Calendar, Clock, MapPin, DollarSign } from 'lucide-react';
import { LaundryPreferences } from '../../types';

interface NewOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NewOrderModal: React.FC<NewOrderModalProps> = ({ isOpen, onClose }) => {
  const { customers, services, currentTenant, addOrder } = useLaundry();

  const [selectedCustomerId, setSelectedCustomerId] = useState(customers[0]?.id || 'new');
  const [newCustomerName, setNewCustomerName] = useState('');
  const [newCustomerEmail, setNewCustomerEmail] = useState('');
  const [newCustomerPhone, setNewCustomerPhone] = useState('');

  const [selectedServiceId, setSelectedServiceId] = useState(services[0]?.id || '');
  const [pickupDate, setPickupDate] = useState('2026-11-17');
  const [pickupTimeSlot, setPickupTimeSlot] = useState('09:00 AM - 11:00 AM');
  const [address, setAddress] = useState('142 King Street East, Toronto, ON');
  const [weightLbs, setWeightLbs] = useState(15);
  const [itemCount, setItemCount] = useState(6);
  const [internalNotes, setInternalNotes] = useState('Walk-in order created at front desk counter.');

  const [preferences, setPreferences] = useState<LaundryPreferences>({
    detergent: 'Fragrance-free',
    softener: false,
    coldWash: true,
    delicateHandling: false,
    separateColors: true,
  });

  if (!isOpen) return null;

  const currentService = services.find((s) => s.id === selectedServiceId) || services[0];
  const existingCust = customers.find((c) => c.id === selectedCustomerId);

  // Price Calculation
  let basePrice = 0;
  if (currentService) {
    if (currentService.pricingModel === 'per_lb') {
      basePrice = currentService.price * weightLbs;
    } else if (currentService.pricingModel === 'per_item') {
      basePrice = currentService.price * itemCount;
    } else {
      basePrice = currentService.price;
    }
  }
  const tax = Number((basePrice * 0.13).toFixed(2));
  const total = Number((basePrice + tax).toFixed(2));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const customerName = existingCust ? existingCust.name : newCustomerName || 'Walk-in Customer';
    const customerEmail = existingCust ? existingCust.email : newCustomerEmail || 'customer@freshfold.ca';
    const customerPhone = existingCust ? existingCust.phone : newCustomerPhone || '+1 (416) 555-0100';
    const finalAddress = existingCust ? existingCust.address : address;

    addOrder({
      customerName,
      customerEmail,
      customerPhone,
      serviceId: currentService.id,
      serviceName: currentService.name,
      status: 'Confirmed',
      pickupDate,
      pickupTimeSlot,
      deliveryDate: '2026-11-18',
      deliveryTimeSlot: '05:00 PM - 07:00 PM',
      pickupAddress: finalAddress,
      deliveryAddress: finalAddress,
      weightLbs: currentService.pricingModel === 'per_lb' ? weightLbs : undefined,
      itemCount: currentService.pricingModel === 'per_item' ? itemCount : undefined,
      basePrice,
      deliveryFee: 0,
      tax,
      total,
      paymentStatus: 'Paid',
      paymentMethod: 'Credit Card',
      preferences,
      internalNotes,
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-charcoal/60 backdrop-blur-sm animate-in fade-in">
      <div className="w-full max-w-xl bg-white rounded-3xl border border-border shadow-drawer overflow-hidden flex flex-col max-h-[90vh] text-left">
        {/* Header */}
        <div className="px-6 py-4 border-b border-border bg-surface-subtle flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold font-display text-charcoal">
              Create New Laundry Order
            </h3>
            <p className="text-xs text-charcoal-muted mt-0.5">
              Enter customer details, assign service, and register batch into {currentTenant.name} queue
            </p>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-xl text-charcoal-muted hover:text-charcoal hover:bg-secondary">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4 text-xs">
          {/* Customer Selection */}
          <div>
            <label className="block text-charcoal font-bold uppercase tracking-wider mb-1.5">
              Customer
            </label>
            <select
              value={selectedCustomerId}
              onChange={(e) => setSelectedCustomerId(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-border text-charcoal focus:outline-none focus:border-forest font-medium"
            >
              {customers.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name} ({c.email}) - {c.totalOrders} past orders
                </option>
              ))}
              <option value="new">+ Register New Customer</option>
            </select>
          </div>

          {selectedCustomerId === 'new' && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 p-3 rounded-xl bg-surface-subtle border border-border">
              <input
                type="text"
                placeholder="Full Name"
                required
                value={newCustomerName}
                onChange={(e) => setNewCustomerName(e.target.value)}
                className="p-2 rounded-lg border border-border"
              />
              <input
                type="email"
                placeholder="Email Address"
                required
                value={newCustomerEmail}
                onChange={(e) => setNewCustomerEmail(e.target.value)}
                className="p-2 rounded-lg border border-border"
              />
              <input
                type="tel"
                placeholder="Phone Number"
                required
                value={newCustomerPhone}
                onChange={(e) => setNewCustomerPhone(e.target.value)}
                className="p-2 rounded-lg border border-border"
              />
            </div>
          )}

          {/* Service Selection */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-charcoal font-bold uppercase tracking-wider mb-1.5">
                Service Offering
              </label>
              <select
                value={selectedServiceId}
                onChange={(e) => setSelectedServiceId(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-border text-charcoal focus:outline-none focus:border-forest font-medium"
              >
                {services.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name} (${s.price.toFixed(2)} {s.unitLabel})
                  </option>
                ))}
              </select>
            </div>

            {currentService?.pricingModel === 'per_lb' ? (
              <div>
                <label className="block text-charcoal font-bold uppercase tracking-wider mb-1.5">
                  Weight (Pounds / lbs)
                </label>
                <input
                  type="number"
                  min="1"
                  max="150"
                  value={weightLbs}
                  onChange={(e) => setWeightLbs(Number(e.target.value))}
                  className="w-full p-2.5 rounded-xl border border-border text-charcoal focus:outline-none focus:border-forest font-mono font-bold"
                />
              </div>
            ) : (
              <div>
                <label className="block text-charcoal font-bold uppercase tracking-wider mb-1.5">
                  Item Count
                </label>
                <input
                  type="number"
                  min="1"
                  max="50"
                  value={itemCount}
                  onChange={(e) => setItemCount(Number(e.target.value))}
                  className="w-full p-2.5 rounded-xl border border-border text-charcoal focus:outline-none focus:border-forest font-mono font-bold"
                />
              </div>
            )}
          </div>

          {/* Pickup and Delivery */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-charcoal font-bold uppercase tracking-wider mb-1.5">
                Pickup Date
              </label>
              <input
                type="date"
                value={pickupDate}
                onChange={(e) => setPickupDate(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-border text-charcoal focus:outline-none focus:border-forest"
              />
            </div>
            <div>
              <label className="block text-charcoal font-bold uppercase tracking-wider mb-1.5">
                Time Window
              </label>
              <select
                value={pickupTimeSlot}
                onChange={(e) => setPickupTimeSlot(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-border text-charcoal focus:outline-none focus:border-forest"
              >
                <option>09:00 AM - 11:00 AM</option>
                <option>01:00 PM - 03:00 PM</option>
                <option>05:00 PM - 07:00 PM</option>
              </select>
            </div>
          </div>

          {/* Internal Notes */}
          <div>
            <label className="block text-charcoal font-bold uppercase tracking-wider mb-1.5">
              Internal Shop Notes
            </label>
            <textarea
              value={internalNotes}
              onChange={(e) => setInternalNotes(e.target.value)}
              rows={2}
              className="w-full p-2.5 rounded-xl border border-border text-charcoal focus:outline-none focus:border-forest"
            />
          </div>

          {/* Price Snapshot */}
          <div className="p-3.5 rounded-xl bg-sage-50 border border-sage-200 flex items-center justify-between">
            <div>
              <span className="text-[10px] uppercase font-bold text-forest">Order Price Calculation</span>
              <div className="text-xs text-charcoal-muted">Base: ${basePrice.toFixed(2)} + HST: ${tax.toFixed(2)}</div>
            </div>
            <div className="text-right">
              <span className="text-base font-bold font-mono text-forest">CAD ${total.toFixed(2)}</span>
            </div>
          </div>

          {/* Actions */}
          <div className="pt-2 flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-border text-xs font-semibold hover:bg-secondary text-charcoal"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-forest text-white text-xs font-bold hover:bg-forest-light shadow-xs"
            >
              Create Order
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
