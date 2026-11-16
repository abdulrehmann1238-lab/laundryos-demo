import React, { useState } from 'react';
import { useLaundry } from '../../context/LaundryContext';
import { DashboardLayout } from '../../components/dashboard/DashboardLayout';
import {
  Settings,
  Building2,
  Clock,
  Truck,
  Bell,
  Percent,
  Shield,
  Save,
  RotateCcw,
  CheckCircle2,
  Info,
} from 'lucide-react';

export const SettingsPage: React.FC = () => {
  const { currentTenant, updateTenantSettings, resetDemoData, addToast } = useLaundry();

  const [bizName, setBizName] = useState(currentTenant.name);
  const [bizPhone, setBizPhone] = useState(currentTenant.phone);
  const [bizAddress, setBizAddress] = useState(currentTenant.address);
  const [currency, setCurrency] = useState(currentTenant.currency);
  const [taxRate, setTaxRate] = useState(13);

  // Logistics parameters
  const [minOrderLbs, setMinOrderLbs] = useState(10);
  const [deliveryFee, setDeliveryFee] = useState(5.00);
  const [freeDeliveryThreshold, setFreeDeliveryThreshold] = useState(35.00);
  const [dispatchRadiusKm, setDispatchRadiusKm] = useState(15);

  // Operating Hours
  const [weekdayOpen, setWeekdayOpen] = useState('07:30 AM');
  const [weekdayClose, setWeekdayClose] = useState('09:00 PM');
  const [weekendOpen, setWeekendOpen] = useState('08:00 AM');
  const [weekendClose, setWeekendClose] = useState('08:00 PM');

  // Notifications
  const [smsCustomerAlerts, setSmsCustomerAlerts] = useState(true);
  const [dailyDigestEmail, setDailyDigestEmail] = useState(true);

  const handleSaveAll = (e: React.FormEvent) => {
    e.preventDefault();
    updateTenantSettings(currentTenant.id, {
      name: bizName,
      phone: bizPhone,
      address: bizAddress,
      currency,
    });
    addToast('Settings Saved', 'Business configuration updated.', 'success');
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 text-left max-w-4xl">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-display font-bold text-charcoal tracking-tight">
              Business & Facility Settings
            </h1>
            <p className="text-xs text-charcoal-muted mt-0.5">
              Store profile, operating hours, delivery thresholds, and tax configurations
            </p>
          </div>

          <button
            onClick={handleSaveAll}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-forest text-white text-xs font-bold hover:bg-forest-light shadow-xs transition-all"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Save All Settings</span>
          </button>
        </div>

        <form onSubmit={handleSaveAll} className="space-y-6">
          {/* 1. Store Profile */}
          <div className="p-6 rounded-2xl bg-white border border-border shadow-xs space-y-4 text-xs">
            <h3 className="text-xs font-bold uppercase tracking-wider text-charcoal flex items-center gap-2">
              <Building2 className="w-4 h-4 text-forest" />
              <span>Laundromat Profile & Identification</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-charcoal-muted mb-1 font-medium">Business Trading Name</label>
                <input
                  type="text"
                  required
                  value={bizName}
                  onChange={(e) => setBizName(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-border font-bold text-charcoal"
                />
              </div>

              <div>
                <label className="block text-charcoal-muted mb-1 font-medium">Contact Phone</label>
                <input
                  type="tel"
                  required
                  value={bizPhone}
                  onChange={(e) => setBizPhone(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-border font-mono text-charcoal"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-charcoal-muted mb-1 font-medium">Store Physical Address</label>
                <input
                  type="text"
                  required
                  value={bizAddress}
                  onChange={(e) => setBizAddress(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-border text-charcoal"
                />
              </div>

              <div>
                <label className="block text-charcoal-muted mb-1 font-medium">Operating Currency</label>
                <select
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-border text-charcoal font-bold"
                >
                  <option value="CAD">CAD — Canadian Dollar ($)</option>
                  <option value="USD">USD — US Dollar ($)</option>
                </select>
              </div>

              <div>
                <label className="block text-charcoal-muted mb-1 font-medium">Provincial / State Tax Rate (%)</label>
                <input
                  type="number"
                  value={taxRate}
                  onChange={(e) => setTaxRate(Number(e.target.value))}
                  className="w-full p-2.5 rounded-xl border border-border font-mono text-charcoal"
                />
              </div>
            </div>
          </div>

          {/* 2. Pickup & Delivery Parameters */}
          <div className="p-6 rounded-2xl bg-white border border-border shadow-xs space-y-4 text-xs">
            <h3 className="text-xs font-bold uppercase tracking-wider text-charcoal flex items-center gap-2">
              <Truck className="w-4 h-4 text-forest" />
              <span>Pickup & Delivery Logistics Rules</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-charcoal-muted mb-1 font-medium">Standard Delivery Fee (CAD $)</label>
                <input
                  type="number"
                  step="0.5"
                  value={deliveryFee}
                  onChange={(e) => setDeliveryFee(Number(e.target.value))}
                  className="w-full p-2.5 rounded-xl border border-border font-mono font-bold text-forest"
                />
              </div>

              <div>
                <label className="block text-charcoal-muted mb-1 font-medium">Free Delivery Threshold (CAD $)</label>
                <input
                  type="number"
                  value={freeDeliveryThreshold}
                  onChange={(e) => setFreeDeliveryThreshold(Number(e.target.value))}
                  className="w-full p-2.5 rounded-xl border border-border font-mono font-bold text-forest"
                />
              </div>

              <div>
                <label className="block text-charcoal-muted mb-1 font-medium">Dispatch Radius (km)</label>
                <input
                  type="number"
                  value={dispatchRadiusKm}
                  onChange={(e) => setDispatchRadiusKm(Number(e.target.value))}
                  className="w-full p-2.5 rounded-xl border border-border font-mono text-charcoal"
                />
              </div>
            </div>
          </div>

          {/* 3. Operating Hours */}
          <div className="p-6 rounded-2xl bg-white border border-border shadow-xs space-y-4 text-xs">
            <h3 className="text-xs font-bold uppercase tracking-wider text-charcoal flex items-center gap-2">
              <Clock className="w-4 h-4 text-forest" />
              <span>Store Operating Hours</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-3 rounded-xl bg-surface-subtle border border-border space-y-2">
                <span className="font-bold text-charcoal block">Monday – Friday</span>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={weekdayOpen}
                    onChange={(e) => setWeekdayOpen(e.target.value)}
                    className="w-full p-2 rounded-lg border border-border text-center font-mono"
                  />
                  <span>to</span>
                  <input
                    type="text"
                    value={weekdayClose}
                    onChange={(e) => setWeekdayClose(e.target.value)}
                    className="w-full p-2 rounded-lg border border-border text-center font-mono"
                  />
                </div>
              </div>

              <div className="p-3 rounded-xl bg-surface-subtle border border-border space-y-2">
                <span className="font-bold text-charcoal block">Saturday – Sunday</span>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={weekendOpen}
                    onChange={(e) => setWeekendOpen(e.target.value)}
                    className="w-full p-2 rounded-lg border border-border text-center font-mono"
                  />
                  <span>to</span>
                  <input
                    type="text"
                    value={weekendClose}
                    onChange={(e) => setWeekendClose(e.target.value)}
                    className="w-full p-2 rounded-lg border border-border text-center font-mono"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* 4. Reset Demo State */}
          <div className="p-6 rounded-2xl bg-rose-50/60 border border-rose-200 space-y-3 text-xs">
            <h3 className="text-xs font-bold uppercase tracking-wider text-rose-800 flex items-center gap-2">
              <RotateCcw className="w-4 h-4 text-rose-700" />
              <span>Reset Prototype Demo State</span>
            </h3>
            <p className="text-charcoal-muted leading-relaxed">
              Wipes localStorage and reloads the initial FreshFold Laundry seed with default orders,
              customers, services, and transactions.
            </p>
            <button
              type="button"
              onClick={resetDemoData}
              className="px-4 py-2 rounded-xl bg-white border border-rose-300 text-rose-700 font-bold hover:bg-rose-100 transition-colors"
            >
              Reset Seed Data to Default
            </button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
};
