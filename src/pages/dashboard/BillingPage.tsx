import React, { useState } from 'react';
import { useLaundry } from '../../context/LaundryContext';
import { DashboardLayout } from '../../components/dashboard/DashboardLayout';
import {
  Receipt,
  CreditCard,
  Check,
  Sparkles,
  ShieldCheck,
  Calendar,
  AlertTriangle,
  Download,
  ArrowRight,
  X,
  Building2,
} from 'lucide-react';

export const BillingPage: React.FC = () => {
  const { currentTenant, updateTenantSubscription, addToast } = useLaundry();

  const [changePlanModalOpen, setChangePlanModalOpen] = useState(false);
  const [updateCardModalOpen, setUpdateCardModalOpen] = useState(false);
  const [cardNumber, setCardNumber] = useState('•••• •••• •••• 8841');
  const [cardExpiry, setCardExpiry] = useState('11/28');

  const plans = [
    {
      id: 'Starter',
      name: 'Starter Plan',
      price: 49,
      desc: 'For neighborhood drop-off laundromats digitizing store operations.',
      features: ['Order Management', 'Customer Database', 'Basic Reports', 'Single Location'],
    },
    {
      id: 'Growth',
      name: 'Growth Plan',
      price: 99,
      desc: 'Complete pickup & delivery routing with customer tracking portal.',
      features: ['All in Starter', 'Pickup & Delivery Logistics', 'Driver Mobile Dispatches', 'Advanced Analytics', 'Staff Roles'],
    },
    {
      id: 'Enterprise',
      name: 'Enterprise Plan',
      price: 199,
      desc: 'Multi-location laundromat groups and high-volume commercial linen plants.',
      features: ['All in Growth', 'Multi-Facility Scoping', 'Granular RBAC Policies', 'Custom API Webhooks', 'Dedicated Account SLA'],
    },
  ];

  const invoices = [
    { id: 'INV-2026-11', date: 'Nov 01, 2026', amount: currentTenant.monthlyRate, status: 'Paid', plan: `${currentTenant.subscriptionPlan} Plan` },
    { id: 'INV-2026-10', date: 'Oct 01, 2026', amount: currentTenant.monthlyRate, status: 'Paid', plan: `${currentTenant.subscriptionPlan} Plan` },
    { id: 'INV-2026-09', date: 'Sep 01, 2026', amount: currentTenant.monthlyRate, status: 'Paid', plan: `${currentTenant.subscriptionPlan} Plan` },
  ];

  const handleSelectNewPlan = (planId: 'Starter' | 'Growth' | 'Enterprise') => {
    updateTenantSubscription(currentTenant.id, planId);
    setChangePlanModalOpen(false);
  };

  const handleCancelSubscription = () => {
    if (window.confirm('Simulate cancelling your LaundryOS subscription at the end of the current billing cycle?')) {
      addToast('Subscription Notice', 'Simulated cancellation scheduled for next renewal date.', 'warning');
    }
  };

  const handleDownloadInvoice = (invId: string) => {
    addToast('Invoice Downloaded', `Simulated PDF downloaded for ${invId}.`, 'info');
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 text-left">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-forest text-white">
                TENANT SUBSCRIPTION
              </span>
              <span className="text-xs text-charcoal-muted">Canadian Dollar (CAD) Billing</span>
            </div>
            <h1 className="text-2xl font-display font-bold text-charcoal tracking-tight mt-1">
              Subscription & Plan Billing
            </h1>
            <p className="text-xs text-charcoal-muted mt-0.5">
              Manage your LaundryOS SaaS tier, view payment methods, and download past invoices
            </p>
          </div>

          <button
            onClick={() => setChangePlanModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-forest text-white text-xs font-bold hover:bg-forest-light shadow-xs transition-all"
          >
            <Sparkles className="w-3.5 h-3.5 text-linen" />
            <span>Change Plan</span>
          </button>
        </div>

        {/* Current Active Plan Spotlight Card */}
        <div className="p-6 rounded-3xl bg-white border border-border shadow-xs">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-6 border-b border-border">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-charcoal-muted uppercase tracking-wider">
                  Current Subscribed Tier
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                  {currentTenant.subscriptionStatus}
                </span>
              </div>
              <h2 className="text-3xl font-display font-extrabold text-charcoal mt-1">
                {currentTenant.subscriptionPlan} Plan
              </h2>
              <p className="text-xs text-charcoal-muted mt-1 max-w-md">
                Enrolled for {currentTenant.name} ({currentTenant.city}, {currentTenant.province}).
                Includes all core order routing, pickup/delivery logs, and customer CRM tools.
              </p>
            </div>

            <div className="text-left lg:text-right">
              <div className="text-3xl font-bold font-display text-forest font-mono">
                CAD ${currentTenant.monthlyRate}.00
              </div>
              <div className="text-xs text-charcoal-muted mt-0.5">Billed monthly</div>
              <div className="mt-2 text-xs font-semibold text-charcoal">
                Next renewal: <strong className="text-forest">{currentTenant.nextBillingDate}</strong>
              </div>
            </div>
          </div>

          {/* Payment Method on File */}
          <div className="pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-surface-subtle border border-border flex items-center justify-center font-bold text-forest">
                <CreditCard className="w-5 h-5" />
              </div>
              <div>
                <div className="font-bold text-charcoal">Visa ending in 8841</div>
                <div className="text-charcoal-muted text-[11px]">Expires {cardExpiry} • Primary business payment method</div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setUpdateCardModalOpen(true)}
                className="px-3.5 py-1.5 rounded-xl border border-border text-charcoal hover:bg-secondary font-semibold transition-colors"
              >
                Update Card
              </button>
              <button
                onClick={handleCancelSubscription}
                className="px-3.5 py-1.5 rounded-xl border border-rose-200 text-rose-700 hover:bg-rose-50 font-semibold transition-colors"
              >
                Cancel Plan
              </button>
            </div>
          </div>
        </div>

        {/* 3 Plan Comparison Grid */}
        <div>
          <h3 className="text-sm font-bold uppercase tracking-wider text-charcoal mb-4">
            Available LaundryOS Plans
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {plans.map((p) => {
              const isCurrent = currentTenant.subscriptionPlan === p.id;
              return (
                <div
                  key={p.id}
                  className={`p-6 rounded-2xl border transition-all flex flex-col justify-between ${
                    isCurrent
                      ? 'bg-sage-50/60 border-forest shadow-card'
                      : 'bg-white border-border hover:border-sage-300'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-base font-bold text-charcoal">{p.name}</h4>
                      {isCurrent && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-forest text-white">
                          Current
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-charcoal-muted leading-relaxed mb-4">
                      {p.desc}
                    </p>
                    <div className="text-2xl font-bold font-display text-charcoal mb-4 font-mono">
                      CAD ${p.price}{' '}
                      <span className="text-xs font-normal text-charcoal-muted">/ month</span>
                    </div>

                    <ul className="space-y-2 text-xs border-t border-border/80 pt-4">
                      {p.features.map((f, i) => (
                        <li key={i} className="flex items-center gap-2 text-charcoal font-medium">
                          <Check className="w-3.5 h-3.5 text-forest shrink-0" />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-6 pt-4 border-t border-border/60">
                    {isCurrent ? (
                      <button
                        disabled
                        className="w-full py-2 rounded-xl bg-forest/20 text-forest text-xs font-bold cursor-not-allowed text-center"
                      >
                        Active Plan
                      </button>
                    ) : (
                      <button
                        onClick={() => handleSelectNewPlan(p.id as any)}
                        className="w-full py-2 rounded-xl bg-forest text-white text-xs font-bold hover:bg-forest-light transition-colors text-center"
                      >
                        Switch to {p.id}
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Billing History Table */}
        <div className="rounded-2xl bg-white border border-border shadow-xs overflow-hidden">
          <div className="p-4 border-b border-border flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-charcoal">
              Billing History & Tax Receipts
            </h3>
            <span className="text-xs text-charcoal-muted">Past 3 months</span>
          </div>

          <table className="w-full text-left text-xs">
            <thead className="bg-surface-subtle border-b border-border text-charcoal-muted font-bold uppercase tracking-wider text-[10px]">
              <tr>
                <th className="p-4">Invoice #</th>
                <th className="p-4">Billing Date</th>
                <th className="p-4">Plan Billed</th>
                <th className="p-4 text-right">Amount (CAD)</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-center">Receipt</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border font-medium">
              {invoices.map((inv) => (
                <tr key={inv.id} className="hover:bg-sage-50/40 transition-colors">
                  <td className="p-4 font-mono font-bold text-forest">{inv.id}</td>
                  <td className="p-4 text-charcoal-muted">{inv.date}</td>
                  <td className="p-4 text-charcoal font-semibold">{inv.plan}</td>
                  <td className="p-4 text-right font-mono font-bold">${inv.amount}.00</td>
                  <td className="p-4">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                      {inv.status}
                    </span>
                  </td>
                  <td className="p-4 text-center">
                    <button
                      onClick={() => handleDownloadInvoice(inv.id)}
                      className="p-1.5 rounded-lg border border-border hover:bg-secondary text-charcoal transition-colors"
                      title="Download PDF"
                    >
                      <Download className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Change Plan Modal */}
      {changePlanModalOpen && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-charcoal/60 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-lg bg-white rounded-3xl border border-border p-6 shadow-drawer text-left">
            <div className="flex items-center justify-between pb-3 border-b border-border">
              <h3 className="text-base font-bold text-charcoal">Select LaundryOS Tier</h3>
              <button onClick={() => setChangePlanModalOpen(false)} className="p-1 rounded-lg text-charcoal-muted">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="mt-4 space-y-3">
              {plans.map((p) => (
                <div
                  key={p.id}
                  onClick={() => handleSelectNewPlan(p.id as any)}
                  className={`p-4 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                    currentTenant.subscriptionPlan === p.id
                      ? 'border-forest bg-sage-50 font-bold'
                      : 'border-border hover:bg-secondary'
                  }`}
                >
                  <div>
                    <h5 className="text-sm text-charcoal">{p.name}</h5>
                    <p className="text-xs text-charcoal-muted">{p.desc}</p>
                  </div>
                  <div className="text-right">
                    <span className="font-mono text-sm font-bold text-forest">CAD ${p.price}/mo</span>
                    {currentTenant.subscriptionPlan === p.id && (
                      <span className="block text-[10px] text-forest font-bold">Selected</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Update Card Modal */}
      {updateCardModalOpen && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-charcoal/60 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-sm bg-white rounded-3xl border border-border p-6 shadow-drawer text-left">
            <h3 className="text-base font-bold text-charcoal">Update Payment Card</h3>
            <p className="text-xs text-charcoal-muted mt-1">Simulated card update dialog.</p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                setUpdateCardModalOpen(false);
                addToast('Payment Method Updated', 'New credit card saved.', 'success');
              }}
              className="mt-4 space-y-3 text-xs"
            >
              <div>
                <label className="block text-charcoal-muted mb-1 font-medium">Card Number</label>
                <input
                  type="text"
                  required
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-border font-mono"
                />
              </div>

              <div>
                <label className="block text-charcoal-muted mb-1 font-medium">Expiry</label>
                <input
                  type="text"
                  required
                  value={cardExpiry}
                  onChange={(e) => setCardExpiry(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-border font-mono"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setUpdateCardModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-border"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-forest text-white font-bold"
                >
                  Save Card
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};
