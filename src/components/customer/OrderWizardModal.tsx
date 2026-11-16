import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLaundry } from '../../context/LaundryContext';
import {
  X,
  ArrowRight,
  ArrowLeft,
  Check,
  Sparkles,
  Calendar,
  Clock,
  MapPin,
  ShieldCheck,
  CreditCard,
  Apple,
  Info,
  Shirt,
  Wind,
  Layers,
} from 'lucide-react';
import { LaundryPreferences } from '../../types';

interface OrderWizardModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedServiceId?: string;
}

export const OrderWizardModal: React.FC<OrderWizardModalProps> = ({
  isOpen,
  onClose,
  preselectedServiceId,
}) => {
  const { services, currentTenant, addOrder } = useLaundry();
  const navigate = useNavigate();

  const [step, setStep] = useState<1 | 2 | 3 | 4 | 5>(1);
  const [selectedServiceId, setSelectedServiceId] = useState<string>(
    preselectedServiceId || services[0]?.id || ''
  );

  // Step 2 Preferences
  const [preferences, setPreferences] = useState<LaundryPreferences>({
    detergent: 'Fragrance-free',
    softener: false,
    coldWash: true,
    delicateHandling: false,
    separateColors: true,
    specialInstructions: 'Please leave with concierge if not home.',
  });

  // Step 3 Pickup details
  const [pickupDate, setPickupDate] = useState('Today, Nov 16');
  const [pickupSlot, setPickupSlot] = useState('01:00 PM - 03:00 PM');
  const [deliverySlot, setDeliverySlot] = useState('Wednesday, Nov 18 (05:00 PM - 07:00 PM)');
  const [address, setAddress] = useState('142 King Street East, Apt 402, Toronto, ON');
  const [instructions, setInstructions] = useState('Buzzer code #402. Concierge desk accepted.');

  // Step 4 Weight & pricing estimation
  const [estimatedWeight, setEstimatedWeight] = useState(12);
  const [itemCount, setItemCount] = useState(6);
  const [paymentMethod, setPaymentMethod] = useState<'Apple Pay' | 'Credit Card' | 'Google Pay'>('Apple Pay');
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen) return null;

  const currentService = services.find((s) => s.id === selectedServiceId) || services[0];

  // Calculate pricing breakdown
  let basePrice = 0;
  if (currentService) {
    if (currentService.pricingModel === 'per_lb') {
      basePrice = currentService.price * estimatedWeight;
    } else if (currentService.pricingModel === 'per_item') {
      basePrice = currentService.price * itemCount;
    } else {
      basePrice = currentService.price;
    }
  }
  const deliveryFee = basePrice > 35 ? 0 : 5.00;
  const tax = Number((basePrice * 0.13).toFixed(2));
  const total = Number((basePrice + deliveryFee + tax).toFixed(2));

  const handleCompleteOrder = () => {
    setIsProcessing(true);
    setTimeout(() => {
      const created = addOrder({
        customerName: 'Alex Morgan',
        customerEmail: 'alex.morgan@gmail.com',
        customerPhone: '+1 (416) 555-8821',
        serviceId: currentService.id,
        serviceName: currentService.name,
        status: 'Confirmed',
        pickupDate: pickupDate.includes('Today') ? '2026-11-16' : '2026-11-17',
        pickupTimeSlot: pickupSlot,
        deliveryDate: '2026-11-18',
        deliveryTimeSlot: '05:00 PM - 07:00 PM',
        pickupAddress: address,
        deliveryAddress: address,
        weightLbs: currentService.pricingModel === 'per_lb' ? estimatedWeight : undefined,
        itemCount: currentService.pricingModel === 'per_item' ? itemCount : undefined,
        basePrice,
        deliveryFee,
        tax,
        total,
        paymentStatus: 'Paid',
        paymentMethod,
        preferences,
        internalNotes: instructions,
      });

      setIsProcessing(false);
      onClose();
      navigate(`/app/track/${created.orderId}`);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-3 sm:p-5 bg-charcoal/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white rounded-3xl border border-border shadow-drawer overflow-hidden flex flex-col max-h-[90vh]">
        {/* Wizard Header with Progress Steps */}
        <div className="px-6 py-4 border-b border-border bg-surface-subtle flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-forest bg-sage-100 px-2 py-0.5 rounded">
                STEP {step} OF 5
              </span>
              <span className="text-xs font-semibold text-charcoal">
                {step === 1 && 'Select Service'}
                {step === 2 && 'Custom Laundry Preferences'}
                {step === 3 && 'Pickup & Delivery Schedule'}
                {step === 4 && 'Review Order & Weight'}
                {step === 5 && 'Simulated Checkout'}
              </span>
            </div>
            <h3 className="text-lg font-display font-bold text-charcoal mt-1">
              Book Laundry Service
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-charcoal-muted hover:text-charcoal rounded-xl hover:bg-secondary transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Progress Bar */}
        <div className="w-full bg-border h-1">
          <div
            className="h-full bg-forest transition-all duration-300"
            style={{ width: `${(step / 5) * 100}%` }}
          />
        </div>

        {/* Scrollable Body Content */}
        <div className="p-6 overflow-y-auto flex-1 text-left">
          {/* STEP 1: SERVICE SELECTION */}
          {step === 1 && (
            <div className="space-y-3.5">
              <p className="text-xs text-charcoal-muted mb-2">
                Choose the primary cleaning process for your garments. Live prices from {currentTenant.name}.
              </p>
              {services.filter((s) => s.isActive).map((srv) => (
                <div
                  key={srv.id}
                  onClick={() => setSelectedServiceId(srv.id)}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-start gap-3.5 ${
                    selectedServiceId === srv.id
                      ? 'border-forest bg-sage-50/50 shadow-card'
                      : 'border-border bg-white hover:border-sage-300'
                  }`}
                >
                  <img
                    src={srv.imageUrl}
                    alt={srv.name}
                    className="w-16 h-16 rounded-xl object-cover shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-bold text-charcoal">{srv.name}</h4>
                      <span className="text-sm font-bold text-forest">
                        {currentTenant.currencySymbol}{srv.price.toFixed(2)} <span className="text-[10px] text-charcoal-muted font-normal">{srv.unitLabel}</span>
                      </span>
                    </div>
                    <p className="text-xs text-charcoal-muted mt-1 leading-relaxed line-clamp-2">
                      {srv.description}
                    </p>
                    <div className="mt-2 flex items-center gap-2 text-[10px] text-charcoal-muted">
                      <span className="px-1.5 py-0.5 rounded bg-surface border border-border">
                        Turnaround: {srv.turnaroundTime}
                      </span>
                      {srv.popular && (
                        <span className="px-1.5 py-0.5 rounded bg-linen text-charcoal font-semibold">
                          Most Popular
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* STEP 2: LAUNDRY PREFERENCES */}
          {step === 2 && (
            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-charcoal uppercase tracking-wider block mb-2">
                  Detergent Type
                </label>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {(['Fragrance-free', 'Hypoallergenic', 'Original Linen Fresh', 'Eco-friendly'] as const).map(
                    (det) => (
                      <button
                        key={det}
                        type="button"
                        onClick={() => setPreferences({ ...preferences, detergent: det })}
                        className={`p-3 rounded-xl border text-left font-medium transition-all ${
                          preferences.detergent === det
                            ? 'border-forest bg-sage-100 text-forest font-semibold'
                            : 'border-border bg-white text-charcoal hover:bg-secondary'
                        }`}
                      >
                        {det}
                      </button>
                    )
                  )}
                </div>
              </div>

              {/* Toggles */}
              <div className="space-y-2.5 pt-2">
                <label className="text-xs font-bold text-charcoal uppercase tracking-wider block">
                  Wash & Treatment Options
                </label>

                <label className="flex items-center justify-between p-3 rounded-xl border border-border bg-white text-xs cursor-pointer hover:bg-sage-50">
                  <div>
                    <span className="font-semibold text-charcoal">Cold Water Wash Only</span>
                    <span className="block text-[11px] text-charcoal-muted">Preserves colors and protects elasticity</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={preferences.coldWash}
                    onChange={(e) => setPreferences({ ...preferences, coldWash: e.target.checked })}
                    className="w-4 h-4 accent-forest rounded"
                  />
                </label>

                <label className="flex items-center justify-between p-3 rounded-xl border border-border bg-white text-xs cursor-pointer hover:bg-sage-50">
                  <div>
                    <span className="font-semibold text-charcoal">Separate Darks & Whites</span>
                    <span className="block text-[11px] text-charcoal-muted">Washed in isolated drums</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={preferences.separateColors}
                    onChange={(e) => setPreferences({ ...preferences, separateColors: e.target.checked })}
                    className="w-4 h-4 accent-forest rounded"
                  />
                </label>

                <label className="flex items-center justify-between p-3 rounded-xl border border-border bg-white text-xs cursor-pointer hover:bg-sage-50">
                  <div>
                    <span className="font-semibold text-charcoal">Fabric Softener</span>
                    <span className="block text-[11px] text-charcoal-muted">Organic botanical softening rinse</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={preferences.softener}
                    onChange={(e) => setPreferences({ ...preferences, softener: e.target.checked })}
                    className="w-4 h-4 accent-forest rounded"
                  />
                </label>

                <label className="flex items-center justify-between p-3 rounded-xl border border-border bg-white text-xs cursor-pointer hover:bg-sage-50">
                  <div>
                    <span className="font-semibold text-charcoal">Delicate Cycle</span>
                    <span className="block text-[11px] text-charcoal-muted">Low spin speed for silks and knits</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={preferences.delicateHandling}
                    onChange={(e) => setPreferences({ ...preferences, delicateHandling: e.target.checked })}
                    className="w-4 h-4 accent-forest rounded"
                  />
                </label>
              </div>

              {/* Special Instructions */}
              <div>
                <label className="text-xs font-bold text-charcoal uppercase tracking-wider block mb-1">
                  Special Notes for Operator
                </label>
                <textarea
                  value={preferences.specialInstructions || ''}
                  onChange={(e) => setPreferences({ ...preferences, specialInstructions: e.target.value })}
                  placeholder="e.g. Please hang wool sweaters, fold socks in pairs..."
                  rows={2}
                  className="w-full p-2.5 rounded-xl border border-border text-xs text-charcoal focus:outline-none focus:border-forest"
                />
              </div>
            </div>
          )}

          {/* STEP 3: PICKUP DETAILS */}
          {step === 3 && (
            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-charcoal uppercase tracking-wider block mb-2">
                  Pickup Date
                </label>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  {['Today, Nov 16', 'Tomorrow, Nov 17', 'Wed, Nov 18'].map((d) => (
                    <button
                      key={d}
                      type="button"
                      onClick={() => setPickupDate(d)}
                      className={`p-3 rounded-xl border text-center font-medium transition-all ${
                        pickupDate === d
                          ? 'border-forest bg-forest text-white shadow-xs'
                          : 'border-border bg-white text-charcoal hover:bg-secondary'
                      }`}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-charcoal uppercase tracking-wider block mb-2">
                  Pickup Time Window
                </label>
                <div className="space-y-2 text-xs">
                  {['09:00 AM - 11:00 AM', '01:00 PM - 03:00 PM', '05:00 PM - 07:00 PM'].map((slot) => (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setPickupSlot(slot)}
                      className={`w-full p-3 rounded-xl border text-left font-medium flex items-center justify-between transition-all ${
                        pickupSlot === slot
                          ? 'border-forest bg-sage-100 text-forest font-semibold'
                          : 'border-border bg-white text-charcoal hover:bg-secondary'
                      }`}
                    >
                      <span>{slot}</span>
                      {pickupSlot === slot && <Check className="w-4 h-4 text-forest" />}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-charcoal uppercase tracking-wider block mb-1">
                  Pickup & Return Address
                </label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-border text-xs text-charcoal focus:outline-none focus:border-forest"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-charcoal uppercase tracking-wider block mb-1">
                  Driver Access Instructions
                </label>
                <input
                  type="text"
                  value={instructions}
                  onChange={(e) => setInstructions(e.target.value)}
                  placeholder="e.g. Leave with concierge or call buzzer #402"
                  className="w-full p-2.5 rounded-xl border border-border text-xs text-charcoal focus:outline-none focus:border-forest"
                />
              </div>
            </div>
          )}

          {/* STEP 4: SUMMARY & WEIGHT ESTIMATION */}
          {step === 4 && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-secondary/80 border border-border">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-bold uppercase text-forest tracking-wider">
                      Selected Service
                    </span>
                    <h4 className="text-base font-bold text-charcoal">{currentService.name}</h4>
                  </div>
                  <span className="text-sm font-bold text-forest">
                    {currentTenant.currencySymbol}{currentService.price.toFixed(2)} {currentService.unitLabel}
                  </span>
                </div>

                {/* Weight slider if per_lb */}
                {currentService.pricingModel === 'per_lb' && (
                  <div className="mt-4 pt-3 border-t border-border">
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="font-semibold text-charcoal">Estimated Laundry Weight</span>
                      <span className="font-bold text-forest font-mono">{estimatedWeight} lbs (~{Math.round(estimatedWeight * 0.45)} kg)</span>
                    </div>
                    <input
                      type="range"
                      min="5"
                      max="40"
                      value={estimatedWeight}
                      onChange={(e) => setEstimatedWeight(Number(e.target.value))}
                      className="w-full accent-forest cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] text-charcoal-muted mt-0.5">
                      <span>Light (5 lbs)</span>
                      <span>Average 1 load (12 lbs)</span>
                      <span>Family load (30+ lbs)</span>
                    </div>
                  </div>
                )}

                {/* Item count if per_item */}
                {currentService.pricingModel === 'per_item' && (
                  <div className="mt-4 pt-3 border-t border-border flex items-center justify-between">
                    <span className="text-xs font-semibold text-charcoal">Garment Item Count:</span>
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => setItemCount(Math.max(1, itemCount - 1))}
                        className="w-7 h-7 rounded-lg border border-border bg-white flex items-center justify-center font-bold"
                      >
                        -
                      </button>
                      <span className="font-bold font-mono text-sm">{itemCount} items</span>
                      <button
                        type="button"
                        onClick={() => setItemCount(itemCount + 1)}
                        className="w-7 h-7 rounded-lg border border-border bg-white flex items-center justify-center font-bold"
                      >
                        +
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Price Breakdown */}
              <div className="p-4 rounded-2xl bg-white border border-border space-y-2 text-xs">
                <div className="flex justify-between text-charcoal-muted">
                  <span>Base Cleaning</span>
                  <span className="font-mono text-charcoal">${basePrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-charcoal-muted">
                  <span>Delivery & Driver Logistics</span>
                  <span className="font-mono text-charcoal">
                    {deliveryFee === 0 ? <span className="text-emerald-700 font-semibold">FREE (Over $35)</span> : `$${deliveryFee.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between text-charcoal-muted">
                  <span>Ontario HST (13%)</span>
                  <span className="font-mono text-charcoal">${tax.toFixed(2)}</span>
                </div>
                <div className="pt-2 border-t border-border flex justify-between text-sm font-bold text-charcoal">
                  <span>Total (CAD)</span>
                  <span className="font-mono text-forest">${total.toFixed(2)}</span>
                </div>
              </div>

              <div className="text-[11px] text-charcoal-muted flex items-center gap-1.5 px-1">
                <Info className="w-3.5 h-3.5 text-sage-600 shrink-0" />
                <span>Actual final weight verified on certified facility digital scale at intake.</span>
              </div>
            </div>
          )}

          {/* STEP 5: CHECKOUT SIMULATION */}
          {step === 5 && (
            <div className="space-y-4">
              <div className="text-center py-2">
                <div className="text-2xl font-bold font-display text-charcoal">
                  CAD ${total.toFixed(2)}
                </div>
                <p className="text-xs text-charcoal-muted mt-0.5">
                  Simulated sandbox transaction. No real payment will be charged.
                </p>
              </div>

              {/* Payment Methods */}
              <div className="space-y-2 text-xs">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('Apple Pay')}
                  className={`w-full p-3.5 rounded-xl border flex items-center justify-between font-semibold transition-all ${
                    paymentMethod === 'Apple Pay'
                      ? 'border-forest bg-forest text-white'
                      : 'border-border bg-white text-charcoal hover:bg-secondary'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Apple className="w-5 h-5" />
                    <span>Apple Pay</span>
                  </div>
                  <span className="text-[10px] opacity-80">1-Touch Express</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('Credit Card')}
                  className={`w-full p-3.5 rounded-xl border flex items-center justify-between font-semibold transition-all ${
                    paymentMethod === 'Credit Card'
                      ? 'border-forest bg-forest text-white'
                      : 'border-border bg-white text-charcoal hover:bg-secondary'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <CreditCard className="w-5 h-5" />
                    <span>Credit Card (Visa ending in 4242)</span>
                  </div>
                  <span className="text-[10px] opacity-80">Saved Card</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('Google Pay')}
                  className={`w-full p-3.5 rounded-xl border flex items-center justify-between font-semibold transition-all ${
                    paymentMethod === 'Google Pay'
                      ? 'border-forest bg-forest text-white'
                      : 'border-border bg-white text-charcoal hover:bg-secondary'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="font-bold">G Pay</span>
                    <span>Google Pay</span>
                  </div>
                  <span className="text-[10px] opacity-80">Instant</span>
                </button>
              </div>

              {/* Order Confirmation Preview */}
              <div className="p-3 rounded-xl bg-sage-50 border border-sage-200 text-xs space-y-1">
                <div className="font-bold text-forest">Order Snapshot:</div>
                <div className="text-charcoal-muted">Customer: Alex Morgan • 142 King St E</div>
                <div className="text-charcoal-muted">Pickup Window: {pickupDate} ({pickupSlot})</div>
                <div className="text-charcoal-muted">Detergent: {preferences.detergent} • Cold wash</div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Navigation Buttons */}
        <div className="px-6 py-4 border-t border-border bg-surface-subtle flex items-center justify-between">
          {step > 1 ? (
            <button
              onClick={() => setStep((step - 1) as any)}
              disabled={isProcessing}
              className="px-4 py-2 rounded-xl border border-border text-xs font-semibold text-charcoal hover:bg-white transition-colors flex items-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </button>
          ) : (
            <div />
          )}

          {step < 5 ? (
            <button
              onClick={() => setStep((step + 1) as any)}
              className="px-5 py-2.5 rounded-xl bg-forest text-white text-xs font-semibold hover:bg-forest-light transition-colors flex items-center gap-1.5 shadow-xs"
            >
              <span>Continue</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              onClick={handleCompleteOrder}
              disabled={isProcessing}
              className="px-6 py-2.5 rounded-xl bg-forest text-white text-xs font-bold hover:bg-forest-light transition-all flex items-center gap-2 shadow-card"
            >
              {isProcessing ? (
                <>
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Processing Checkout...</span>
                </>
              ) : (
                <>
                  <span>Complete Booking (${total.toFixed(2)})</span>
                  <Check className="w-4 h-4" />
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
