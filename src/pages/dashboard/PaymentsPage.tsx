import React, { useState } from 'react';
import { useLaundry } from '../../context/LaundryContext';
import { DashboardLayout } from '../../components/dashboard/DashboardLayout';
import { Transaction } from '../../types';
import {
  CreditCard,
  DollarSign,
  ArrowDownLeft,
  RotateCcw,
  Search,
  CheckCircle2,
  AlertCircle,
  X,
  ShieldCheck,
  Download,
} from 'lucide-react';

export const PaymentsPage: React.FC = () => {
  const { transactions, refundTransaction, currentTenant, addToast } = useLaundry();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTxnForRefund, setSelectedTxnForRefund] = useState<Transaction | null>(null);

  const completedTxns = transactions.filter((t) => t.status === 'Completed');
  const refundedTxns = transactions.filter((t) => t.status === 'Refunded');

  const totalRevenue = completedTxns.reduce((sum, t) => sum + t.amount, 0);
  const totalRefunded = refundedTxns.reduce((sum, t) => sum + t.amount, 0);

  const filtered = transactions.filter((t) => {
    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      return (
        t.id.toLowerCase().includes(q) ||
        t.orderId.toLowerCase().includes(q) ||
        t.customerName.toLowerCase().includes(q) ||
        t.paymentMethod.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const handleConfirmRefund = () => {
    if (!selectedTxnForRefund) return;
    refundTransaction(selectedTxnForRefund.id);
    setSelectedTxnForRefund(null);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 text-left">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-display font-bold text-charcoal tracking-tight">
              Payments & Financial Settlement
            </h1>
            <p className="text-xs text-charcoal-muted mt-0.5">
              Tokenized customer card transactions, digital wallet settlements, and refund logs
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-semibold flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>PCI-DSS Tokenized Simulation</span>
            </span>
          </div>
        </div>

        {/* 4 Financial Metric Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-white border border-border shadow-xs">
            <span className="text-[11px] text-charcoal-muted font-medium uppercase tracking-wider">
              Settled Volume
            </span>
            <div className="text-2xl font-bold font-display text-charcoal mt-1">
              CAD ${totalRevenue.toFixed(2)}
            </div>
            <div className="text-[10px] text-emerald-700 font-semibold mt-0.5">Automated Stripe payouts</div>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-border shadow-xs">
            <span className="text-[11px] text-charcoal-muted font-medium uppercase tracking-wider">
              Cleared Transactions
            </span>
            <div className="text-2xl font-bold font-display text-forest mt-1">
              {completedTxns.length}
            </div>
            <div className="text-[10px] text-charcoal-muted mt-0.5">Zero payment failures</div>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-border shadow-xs">
            <span className="text-[11px] text-charcoal-muted font-medium uppercase tracking-wider">
              Total Refunds
            </span>
            <div className="text-2xl font-bold font-display text-rose-700 mt-1">
              CAD ${totalRefunded.toFixed(2)}
            </div>
            <div className="text-[10px] text-rose-600 mt-0.5">{refundedTxns.length} refunded batches</div>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-border shadow-xs">
            <span className="text-[11px] text-charcoal-muted font-medium uppercase tracking-wider">
              HST Tax Collected
            </span>
            <div className="text-2xl font-bold font-display text-charcoal mt-1">
              CAD ${(totalRevenue * 0.13).toFixed(2)}
            </div>
            <div className="text-[10px] text-charcoal-muted mt-0.5">Ontario 13% Remittance</div>
          </div>
        </div>

        {/* Search Input */}
        <div className="p-4 rounded-2xl bg-white border border-border shadow-xs flex items-center justify-between gap-3 text-xs">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-charcoal-muted absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by Txn ID, Order ID, customer..."
              className="w-full pl-9 pr-4 py-2 rounded-xl border border-border bg-surface-subtle text-charcoal focus:outline-none focus:border-forest"
            />
          </div>
        </div>

        {/* Transactions Table */}
        <div className="rounded-2xl bg-white border border-border shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-surface-subtle border-b border-border text-charcoal-muted font-bold uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="p-4">Transaction ID</th>
                  <th className="p-4">Order ID</th>
                  <th className="p-4">Customer Name</th>
                  <th className="p-4">Method</th>
                  <th className="p-4 text-right">Amount (CAD)</th>
                  <th className="p-4">Settlement State</th>
                  <th className="p-4">Processed Date</th>
                  <th className="p-4 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border font-medium">
                {filtered.map((tx) => (
                  <tr key={tx.id} className="hover:bg-sage-50/40 transition-colors">
                    <td className="p-4 font-mono font-bold text-charcoal">{tx.id}</td>
                    <td className="p-4 font-mono font-semibold text-forest">#{tx.orderId}</td>
                    <td className="p-4 font-bold text-charcoal">{tx.customerName}</td>
                    <td className="p-4 text-charcoal-muted">{tx.paymentMethod}</td>
                    <td className="p-4 text-right font-mono font-bold text-charcoal">
                      ${tx.amount.toFixed(2)}
                    </td>
                    <td className="p-4">
                      <span
                        className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                          tx.status === 'Completed'
                            ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                            : tx.status === 'Refunded'
                            ? 'bg-rose-50 text-rose-800 border border-rose-200'
                            : 'bg-amber-50 text-amber-800'
                        }`}
                      >
                        {tx.status}
                      </span>
                    </td>
                    <td className="p-4 text-charcoal-muted">{tx.date}</td>
                    <td className="p-4 text-center">
                      {tx.status === 'Completed' ? (
                        <button
                          onClick={() => setSelectedTxnForRefund(tx)}
                          className="px-2.5 py-1 rounded-lg border border-border hover:bg-rose-50 hover:border-rose-200 text-charcoal hover:text-rose-700 text-[11px] font-semibold transition-colors"
                        >
                          Issue Refund
                        </button>
                      ) : (
                        <span className="text-[11px] text-charcoal-muted">Refunded</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Simulated Refund Confirmation Dialog */}
      {selectedTxnForRefund && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-charcoal/60 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-sm bg-white rounded-3xl border border-border p-6 shadow-drawer text-left">
            <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center mb-3">
              <RotateCcw className="w-5 h-5" />
            </div>

            <h3 className="text-base font-bold text-charcoal">
              Confirm Refund for Order #{selectedTxnForRefund.orderId}?
            </h3>
            <p className="text-xs text-charcoal-muted mt-2 leading-relaxed">
              You are about to issue a refund of <strong className="text-charcoal font-bold">${selectedTxnForRefund.amount.toFixed(2)} CAD</strong> to{' '}
              <strong>{selectedTxnForRefund.customerName}</strong> via {selectedTxnForRefund.paymentMethod}.
            </p>

            <div className="mt-6 flex items-center justify-end gap-2.5 text-xs font-semibold">
              <button
                type="button"
                onClick={() => setSelectedTxnForRefund(null)}
                className="px-4 py-2 rounded-xl border border-border hover:bg-secondary text-charcoal"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmRefund}
                className="px-4 py-2 rounded-xl bg-rose-600 text-white font-bold hover:bg-rose-700 transition-colors shadow-xs"
              >
                Confirm Refund
              </button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};
