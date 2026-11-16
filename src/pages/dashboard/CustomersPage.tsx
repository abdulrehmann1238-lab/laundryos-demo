import React, { useState } from 'react';
import { useLaundry } from '../../context/LaundryContext';
import { DashboardLayout } from '../../components/dashboard/DashboardLayout';
import { Customer } from '../../types';
import {
  Users,
  Search,
  Plus,
  Mail,
  Phone,
  Calendar,
  DollarSign,
  TrendingUp,
  X,
  Eye,
  Edit2,
  Save,
  CheckCircle2,
  Package,
} from 'lucide-react';

export const CustomersPage: React.FC = () => {
  const { customers, orders, addCustomer, updateCustomer, currentTenant } = useLaundry();

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [addModalOpen, setAddModalOpen] = useState(false);

  // New Customer Form State
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newAddress, setNewAddress] = useState('');
  const [newNotes, setNewNotes] = useState('');

  // Customer KPIs
  const totalCustomers = customers.length;
  const newCustomers = customers.filter((c) => c.status === 'New').length;
  const vipCustomers = customers.filter((c) => c.status === 'VIP').length;
  const totalSpend = customers.reduce((acc, c) => acc + c.lifetimeSpending, 0);
  const avgLtv = totalCustomers > 0 ? (totalSpend / totalCustomers).toFixed(2) : '0';

  const filteredCustomers = customers.filter((c) => {
    if (statusFilter !== 'all' && c.status !== statusFilter) return false;
    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      return (
        c.name.toLowerCase().includes(q) ||
        c.email.toLowerCase().includes(q) ||
        c.phone.includes(q)
      );
    }
    return true;
  });

  const handleCreateCustomer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newEmail.trim()) return;

    addCustomer({
      name: newName,
      email: newEmail,
      phone: newPhone || '+1 (416) 555-0199',
      address: newAddress || 'Toronto, ON',
      status: 'New',
      notes: newNotes,
      lastOrderDate: new Date().toISOString().split('T')[0],
    });

    setNewName('');
    setNewEmail('');
    setNewPhone('');
    setNewAddress('');
    setNewNotes('');
    setAddModalOpen(false);
  };

  const customerOrders = selectedCustomer
    ? orders.filter((o) => o.customerEmail.toLowerCase() === selectedCustomer.email.toLowerCase())
    : [];

  return (
    <DashboardLayout>
      <div className="space-y-6 text-left">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-display font-bold text-charcoal tracking-tight">
              Customer Profiles & CRM
            </h1>
            <p className="text-xs text-charcoal-muted mt-0.5">
              Customer purchase history, laundry preferences, and lifetime loyalty
            </p>
          </div>

          <button
            onClick={() => setAddModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-forest text-white text-xs font-bold hover:bg-forest-light shadow-xs transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Add Customer</span>
          </button>
        </div>

        {/* 4 Customer KPIs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-white border border-border shadow-xs">
            <span className="text-[11px] text-charcoal-muted font-medium uppercase tracking-wider">
              Total Profiles
            </span>
            <div className="text-2xl font-bold font-display text-charcoal mt-1">
              {totalCustomers}
            </div>
            <div className="text-[10px] text-charcoal-muted mt-0.5">Scored across Toronto</div>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-border shadow-xs">
            <span className="text-[11px] text-charcoal-muted font-medium uppercase tracking-wider">
              New This Month
            </span>
            <div className="text-2xl font-bold font-display text-forest mt-1">
              {newCustomers + 4}
            </div>
            <div className="text-[10px] text-emerald-700 font-semibold mt-0.5">↑ +24% growth</div>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-border shadow-xs">
            <span className="text-[11px] text-charcoal-muted font-medium uppercase tracking-wider">
              VIP Repeat Clients
            </span>
            <div className="text-2xl font-bold font-display text-charcoal mt-1">
              {vipCustomers}
            </div>
            <div className="text-[10px] text-charcoal-muted mt-0.5">Ordered 10+ times</div>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-border shadow-xs">
            <span className="text-[11px] text-charcoal-muted font-medium uppercase tracking-wider">
              Avg Lifetime Value
            </span>
            <div className="text-2xl font-bold font-display text-forest mt-1">
              CAD ${avgLtv}
            </div>
            <div className="text-[10px] text-emerald-700 font-semibold mt-0.5">High retention</div>
          </div>
        </div>

        {/* Search & Filter Toolbar */}
        <div className="p-4 rounded-2xl bg-white border border-border shadow-xs flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 text-xs">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-charcoal-muted absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by name, email, phone..."
              className="w-full pl-9 pr-4 py-2 rounded-xl border border-border bg-surface-subtle text-charcoal focus:outline-none focus:border-forest"
            />
          </div>

          <div className="flex items-center gap-2">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="p-2 rounded-xl border border-border bg-white text-charcoal font-medium focus:outline-none"
            >
              <option value="all">All Customer Tiers</option>
              <option value="VIP">VIP Tier</option>
              <option value="Active">Active Customers</option>
              <option value="New">New Registrations</option>
            </select>
          </div>
        </div>

        {/* Customer Table */}
        <div className="rounded-2xl bg-white border border-border shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-surface-subtle border-b border-border text-charcoal-muted font-bold uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="p-4">Customer Name</th>
                  <th className="p-4">Contact</th>
                  <th className="p-4 text-center">Orders</th>
                  <th className="p-4 text-right">Lifetime Spend</th>
                  <th className="p-4">Last Order</th>
                  <th className="p-4">Tier Status</th>
                  <th className="p-4 text-center">Profile</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border font-medium">
                {filteredCustomers.map((cust) => (
                  <tr
                    key={cust.id}
                    onClick={() => setSelectedCustomer(cust)}
                    className="hover:bg-sage-50/50 cursor-pointer transition-colors"
                  >
                    <td className="p-4">
                      <div className="font-bold text-charcoal">{cust.name}</div>
                      <div className="text-[10px] text-charcoal-muted truncate max-w-[180px]">
                        {cust.address}
                      </div>
                    </td>
                    <td className="p-4 text-charcoal-muted">
                      <div>{cust.email}</div>
                      <div className="text-[10px] font-mono">{cust.phone}</div>
                    </td>
                    <td className="p-4 text-center font-bold font-mono">
                      {cust.totalOrders}
                    </td>
                    <td className="p-4 text-right font-bold font-mono text-forest">
                      ${cust.lifetimeSpending.toFixed(2)} CAD
                    </td>
                    <td className="p-4 text-charcoal-muted">
                      {cust.lastOrderDate}
                    </td>
                    <td className="p-4">
                      <span
                        className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                          cust.status === 'VIP'
                            ? 'bg-forest text-white'
                            : cust.status === 'Active'
                            ? 'bg-sage-100 text-forest'
                            : 'bg-secondary text-charcoal'
                        }`}
                      >
                        {cust.status}
                      </span>
                    </td>
                    <td className="p-4 text-center">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedCustomer(cust);
                        }}
                        className="p-1.5 rounded-lg border border-border hover:bg-forest hover:text-white hover:border-forest text-charcoal transition-colors"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Customer Detail Drawer */}
      {selectedCustomer && (
        <div className="fixed inset-0 z-[140] flex justify-end bg-charcoal/40 backdrop-blur-xs animate-in fade-in">
          <div className="w-full max-w-lg bg-white h-full shadow-drawer border-l border-border flex flex-col justify-between overflow-hidden text-left">
            <div className="p-6 border-b border-border bg-surface-subtle flex items-start justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-forest bg-sage-100 px-2 py-0.5 rounded">
                  {selectedCustomer.status} Tier Customer
                </span>
                <h3 className="text-xl font-bold font-display text-charcoal mt-1.5">
                  {selectedCustomer.name}
                </h3>
                <p className="text-xs text-charcoal-muted">{selectedCustomer.email}</p>
              </div>
              <button
                onClick={() => setSelectedCustomer(null)}
                className="p-1.5 rounded-xl hover:bg-secondary text-charcoal-muted"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6 text-xs">
              {/* Overview Cards */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-xl bg-surface-subtle border border-border">
                  <span className="text-[10px] text-charcoal-muted font-bold block uppercase">Total Spent</span>
                  <span className="text-lg font-bold font-mono text-forest mt-0.5 block">
                    ${selectedCustomer.lifetimeSpending.toFixed(2)} CAD
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-surface-subtle border border-border">
                  <span className="text-[10px] text-charcoal-muted font-bold block uppercase">Lifetime Batches</span>
                  <span className="text-lg font-bold font-mono text-charcoal mt-0.5 block">
                    {selectedCustomer.totalOrders} Completed
                  </span>
                </div>
              </div>

              {/* Contact Details */}
              <div className="p-4 rounded-xl bg-white border border-border space-y-2">
                <h4 className="font-bold text-charcoal uppercase tracking-wider text-[10px]">Contact & Delivery</h4>
                <div className="text-charcoal-muted">Phone: <strong className="text-charcoal">{selectedCustomer.phone}</strong></div>
                <div className="text-charcoal-muted">Address: <strong className="text-charcoal">{selectedCustomer.address}</strong></div>
                {selectedCustomer.notes && (
                  <div className="p-2.5 rounded-lg bg-linen-light border border-linen text-charcoal mt-2">
                    <strong className="block text-[10px] uppercase text-charcoal-muted">Cleaning Preferences / Instructions:</strong>
                    {selectedCustomer.notes}
                  </div>
                )}
              </div>

              {/* Order History */}
              <div>
                <h4 className="font-bold text-charcoal uppercase tracking-wider text-[10px] mb-2.5">
                  Order History ({customerOrders.length})
                </h4>
                <div className="space-y-2">
                  {customerOrders.length === 0 ? (
                    <div className="p-4 text-center text-charcoal-muted border rounded-xl">No recorded orders for this customer yet.</div>
                  ) : (
                    customerOrders.map((ord) => (
                      <div key={ord.id} className="p-3 rounded-xl border border-border flex items-center justify-between">
                        <div>
                          <div className="font-bold text-forest font-mono">#{ord.orderId} • {ord.serviceName}</div>
                          <div className="text-[10px] text-charcoal-muted">{ord.pickupDate}</div>
                        </div>
                        <div className="text-right">
                          <span className="font-mono font-bold">${ord.total.toFixed(2)}</span>
                          <div className="text-[10px] text-charcoal-muted">{ord.status}</div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>

            <div className="p-4 border-t border-border bg-surface-subtle text-right">
              <button
                onClick={() => setSelectedCustomer(null)}
                className="px-5 py-2 rounded-xl bg-forest text-white text-xs font-semibold hover:bg-forest-light"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Customer Modal */}
      {addModalOpen && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-charcoal/60 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-md bg-white rounded-3xl border border-border p-6 shadow-drawer text-left">
            <div className="flex items-center justify-between pb-3 border-b border-border">
              <h3 className="text-base font-bold text-charcoal">Add New Customer</h3>
              <button onClick={() => setAddModalOpen(false)} className="p-1 rounded-lg text-charcoal-muted">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateCustomer} className="mt-4 space-y-3 text-xs">
              <div>
                <label className="block text-charcoal-muted mb-1 font-medium">Customer Full Name *</label>
                <input
                  type="text"
                  required
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="e.g. Taylor Smith"
                  className="w-full p-2.5 rounded-xl border border-border"
                />
              </div>

              <div>
                <label className="block text-charcoal-muted mb-1 font-medium">Email Address *</label>
                <input
                  type="email"
                  required
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  placeholder="taylor@example.com"
                  className="w-full p-2.5 rounded-xl border border-border"
                />
              </div>

              <div>
                <label className="block text-charcoal-muted mb-1 font-medium">Phone Number</label>
                <input
                  type="tel"
                  value={newPhone}
                  onChange={(e) => setNewPhone(e.target.value)}
                  placeholder="+1 (416) 555-0123"
                  className="w-full p-2.5 rounded-xl border border-border"
                />
              </div>

              <div>
                <label className="block text-charcoal-muted mb-1 font-medium">Primary Address</label>
                <input
                  type="text"
                  value={newAddress}
                  onChange={(e) => setNewAddress(e.target.value)}
                  placeholder="Street address, unit, postal code"
                  className="w-full p-2.5 rounded-xl border border-border"
                />
              </div>

              <div>
                <label className="block text-charcoal-muted mb-1 font-medium">Customer Notes / Preferences</label>
                <textarea
                  value={newNotes}
                  onChange={(e) => setNewNotes(e.target.value)}
                  placeholder="Fragrance sensitivity, concierge notes..."
                  rows={2}
                  className="w-full p-2.5 rounded-xl border border-border"
                />
              </div>

              <div className="pt-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setAddModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-border hover:bg-secondary"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-forest text-white font-bold hover:bg-forest-light"
                >
                  Create Customer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};
