import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useLaundry } from '../../context/LaundryContext';
import { Tenant } from '../../types';
import { Logo } from '../../components/common/Logo';
import {
  Layers,
  Building2,
  DollarSign,
  TrendingUp,
  Package,
  Shield,
  ArrowRight,
  ExternalLink,
  Edit2,
  CheckCircle2,
  AlertCircle,
  X,
  Search,
  Sparkles,
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts';

export const PlatformAdminPage: React.FC = () => {
  const {
    tenants,
    switchTenant,
    updateTenantSubscription,
    toggleTenantStatus,
    allOrders,
    addToast,
  } = useLaundry();

  const navigate = useNavigate();

  const [selectedTenantModal, setSelectedTenantModal] = useState<Tenant | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Global KPIs
  const totalTenants = tenants.length;
  const activeTenants = tenants.filter((t) => t.subscriptionStatus === 'Active').length;
  const totalMrr = tenants.reduce((acc, t) => acc + (t.subscriptionStatus === 'Active' ? t.monthlyRate : 0), 0);
  const totalNetworkOrders = 1240 + allOrders.length;

  const subscriptionDistribution = [
    { name: 'Starter ($49)', value: tenants.filter((t) => t.subscriptionPlan === 'Starter').length, color: '#ADC0AF' },
    { name: 'Growth ($99)', value: tenants.filter((t) => t.subscriptionPlan === 'Growth').length, color: '#657B68' },
    { name: 'Enterprise ($199)', value: tenants.filter((t) => t.subscriptionPlan === 'Enterprise').length, color: '#344B3B' },
  ];

  const mrrByCity = tenants.map((t) => ({
    city: t.city,
    mrr: t.monthlyRate,
    name: t.name,
  }));

  const filteredTenants = tenants.filter((t) => {
    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      return (
        t.name.toLowerCase().includes(q) ||
        t.city.toLowerCase().includes(q) ||
        t.ownerName.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const handleLaunchTenantDashboard = (tenantId: string) => {
    switchTenant(tenantId);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-[#F4F6F4] text-charcoal pt-16 pb-20 text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Top Breadcrumb & Platform Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-border">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-charcoal text-white flex items-center justify-center font-bold shadow-card">
              <Layers className="w-6 h-6 text-linen" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-charcoal text-white">
                  GLOBAL PLATFORM CONSOLE
                </span>
                <span className="text-xs text-charcoal-muted">Multi-Tenant Fleet Governance</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-charcoal mt-1">
                LaundryOS Platform Administration
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/architecture"
              className="px-3.5 py-2 rounded-xl bg-white border border-border text-xs font-semibold text-charcoal hover:bg-secondary flex items-center gap-1.5 shadow-xs"
            >
              <span>Architecture Spec</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            <Link
              to="/dashboard"
              className="px-4 py-2 rounded-xl bg-forest text-white text-xs font-bold hover:bg-forest-light shadow-xs flex items-center gap-1.5"
            >
              <span>Current Tenant Hub</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* 5 Global KPI Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="p-4 rounded-2xl bg-white border border-border shadow-xs">
            <span className="text-[10px] text-charcoal-muted uppercase font-bold tracking-wider">
              Total Laundromats
            </span>
            <div className="text-2xl font-bold font-display text-charcoal mt-1">
              {totalTenants} Businesses
            </div>
            <div className="text-[10px] text-charcoal-muted mt-0.5">Isolated schemas</div>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-border shadow-xs">
            <span className="text-[10px] text-charcoal-muted uppercase font-bold tracking-wider">
              Active Subscriptions
            </span>
            <div className="text-2xl font-bold font-display text-forest mt-1">
              {activeTenants} of {totalTenants}
            </div>
            <div className="text-[10px] text-emerald-700 font-semibold mt-0.5">100% renewal rate</div>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-border shadow-xs">
            <span className="text-[10px] text-charcoal-muted uppercase font-bold tracking-wider">
              Monthly Recurring (MRR)
            </span>
            <div className="text-2xl font-bold font-display text-forest mt-1 font-mono">
              CAD ${totalMrr}.00
            </div>
            <div className="text-[10px] text-emerald-700 font-semibold mt-0.5">↑ +14% vs last month</div>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-border shadow-xs">
            <span className="text-[10px] text-charcoal-muted uppercase font-bold tracking-wider">
              Network Orders Processed
            </span>
            <div className="text-2xl font-bold font-display text-charcoal mt-1">
              {totalNetworkOrders.toLocaleString()}
            </div>
            <div className="text-[10px] text-charcoal-muted mt-0.5">Across 3 provinces</div>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-border shadow-xs col-span-2 lg:col-span-1">
            <span className="text-[10px] text-charcoal-muted uppercase font-bold tracking-wider">
              New Signups (Q4)
            </span>
            <div className="text-2xl font-bold font-display text-charcoal mt-1">
              +2 In Onboarding
            </div>
            <div className="text-[10px] text-charcoal-muted mt-0.5">Edmonton & Ottawa</div>
          </div>
        </div>

        {/* Global Multi-Tenant Architecture Callout */}
        <div className="p-5 rounded-2xl bg-forest text-white shadow-elevated flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0 mt-0.5">
              <Shield className="w-5 h-5 text-linen" />
            </div>
            <div>
              <h3 className="text-sm font-bold tracking-wide">
                Production Multi-Tenant Architecture Blueprint
              </h3>
              <p className="text-xs text-white/80 mt-1 max-w-2xl leading-relaxed">
                In this frontend demonstration, switching tenants isolates customer orders, services,
                and revenues. In production, tenant data isolation must be enforced server-side through
                PostgreSQL Row-Level Security (RLS) and Prisma ORM client extensions.
              </p>
            </div>
          </div>

          <Link
            to="/architecture"
            className="px-4 py-2 rounded-xl bg-white text-forest text-xs font-bold hover:bg-linen transition-colors shrink-0"
          >
            Read Audit Guide
          </Link>
        </div>

        {/* CHARTS: Subscription Distribution & MRR by City */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <div className="md:col-span-4 p-5 rounded-2xl bg-white border border-border shadow-xs flex flex-col justify-between">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-charcoal">
                Subscription Plan Distribution
              </h3>
              <p className="text-xs text-charcoal-muted mt-0.5">SaaS tier breakdown</p>
            </div>

            <div className="h-44 w-full my-2">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={subscriptionDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={65}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {subscriptionDistribution.map((e, i) => (
                      <Cell key={`cell-${i}`} fill={e.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ backgroundColor: '#252A26', color: '#FAF9F5', borderRadius: '10px', fontSize: '11px' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="space-y-1.5 text-xs pt-3 border-t border-border">
              {subscriptionDistribution.map((item) => (
                <div key={item.name} className="flex justify-between">
                  <span className="flex items-center gap-1.5 text-charcoal-muted">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                    {item.name}
                  </span>
                  <span className="font-bold text-charcoal">{item.value} businesses</span>
                </div>
              ))}
            </div>
          </div>

          <div className="md:col-span-8 p-5 rounded-2xl bg-white border border-border shadow-xs">
            <h3 className="text-xs font-bold uppercase tracking-wider text-charcoal mb-1">
              Monthly Recurring Revenue by Canadian City
            </h3>
            <p className="text-xs text-charcoal-muted mb-4">Direct MRR per laundromat facility</p>

            <div className="h-56 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={mrrByCity}>
                  <XAxis dataKey="city" stroke="#777C74" fontSize={11} tickLine={false} />
                  <YAxis stroke="#777C74" fontSize={11} tickLine={false} tickFormatter={(v) => `$${v}`} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#252A26', color: '#FAF9F5', borderRadius: '10px', fontSize: '11px' }}
                    formatter={(v: any) => [`$${v} CAD/mo`, 'Subscription MRR']}
                  />
                  <Bar dataKey="mrr" fill="#344B3B" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* REGISTERED BUSINESSES MANAGEMENT TABLE */}
        <div className="rounded-2xl bg-white border border-border shadow-xs overflow-hidden">
          <div className="p-4 border-b border-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-charcoal">
                Registered Laundromat Tenants (3 Sample Businesses)
              </h3>
              <p className="text-xs text-charcoal-muted mt-0.5">
                Click "Launch Dashboard" to immediately switch active context into that business
              </p>
            </div>

            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 text-charcoal-muted absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Filter laundromats..."
                className="w-full pl-9 pr-3 py-1.5 rounded-xl border border-border text-xs text-charcoal"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-surface-subtle border-b border-border text-charcoal-muted font-bold uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="p-4">Laundromat Business</th>
                  <th className="p-4">Location</th>
                  <th className="p-4">Owner Profile</th>
                  <th className="p-4">SaaS Subscription</th>
                  <th className="p-4 text-right">MRR Rate</th>
                  <th className="p-4 text-center">Tenant State</th>
                  <th className="p-4 text-right">Manage</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border font-medium">
                {filteredTenants.map((t) => (
                  <tr key={t.id} className="hover:bg-sage-50/40 transition-colors">
                    <td className="p-4">
                      <div className="font-bold text-charcoal text-sm">{t.name}</div>
                      <div className="text-[10px] text-charcoal-muted truncate max-w-[200px]">
                        {t.address}
                      </div>
                    </td>

                    <td className="p-4">
                      <div className="font-semibold text-charcoal">{t.city}, {t.province}</div>
                      <div className="text-[10px] text-charcoal-muted">{t.country}</div>
                    </td>

                    <td className="p-4">
                      <div className="font-semibold text-charcoal">{t.ownerName}</div>
                      <div className="text-[10px] text-charcoal-muted">{t.ownerEmail}</div>
                    </td>

                    <td className="p-4">
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-sage-100 text-forest border border-sage-200">
                        {t.subscriptionPlan} Tier
                      </span>
                    </td>

                    <td className="p-4 text-right font-mono font-bold text-forest">
                      CAD ${t.monthlyRate}/mo
                    </td>

                    <td className="p-4 text-center">
                      <button
                        onClick={() => toggleTenantStatus(t.id)}
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold transition-colors ${
                          t.subscriptionStatus === 'Active'
                            ? 'bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100'
                            : 'bg-rose-50 text-rose-800 border border-rose-200 hover:bg-rose-100'
                        }`}
                        title="Click to toggle status simulation"
                      >
                        {t.subscriptionStatus}
                      </button>
                    </td>

                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => setSelectedTenantModal(t)}
                          className="px-2.5 py-1 rounded-lg border border-border hover:bg-secondary text-[11px] font-semibold text-charcoal"
                        >
                          Details
                        </button>

                        <button
                          onClick={() => handleLaunchTenantDashboard(t.id)}
                          className="px-3 py-1 rounded-lg bg-forest text-white hover:bg-forest-light text-[11px] font-bold flex items-center gap-1 shadow-xs"
                        >
                          <span>Launch</span>
                          <ExternalLink className="w-3 h-3" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Tenant Details Modal */}
      {selectedTenantModal && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-charcoal/60 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-lg bg-white rounded-3xl border border-border p-6 shadow-drawer text-left space-y-4">
            <div className="flex items-start justify-between pb-3 border-b border-border">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-forest bg-sage-100 px-2 py-0.5 rounded">
                  Tenant Details
                </span>
                <h3 className="text-xl font-bold font-display text-charcoal mt-1">
                  {selectedTenantModal.name}
                </h3>
                <p className="text-xs text-charcoal-muted">
                  {selectedTenantModal.city}, {selectedTenantModal.province} • {selectedTenantModal.country}
                </p>
              </div>
              <button
                onClick={() => setSelectedTenantModal(null)}
                className="p-1 rounded-lg hover:bg-secondary text-charcoal-muted"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-xl bg-surface-subtle border border-border flex justify-between">
                <span>Subscription Plan:</span>
                <strong className="text-forest font-bold">{selectedTenantModal.subscriptionPlan} (CAD ${selectedTenantModal.monthlyRate}/mo)</strong>
              </div>

              <div className="p-3 rounded-xl bg-surface-subtle border border-border flex justify-between">
                <span>Owner & Email:</span>
                <strong className="text-charcoal">{selectedTenantModal.ownerName} ({selectedTenantModal.ownerEmail})</strong>
              </div>

              <div className="p-3 rounded-xl bg-surface-subtle border border-border flex justify-between">
                <span>Store Address:</span>
                <strong className="text-charcoal">{selectedTenantModal.address}</strong>
              </div>

              <div className="p-3 rounded-xl bg-surface-subtle border border-border flex justify-between">
                <span>Active Orders Today:</span>
                <strong className="text-forest font-mono">{selectedTenantModal.stats.activeOrders} orders</strong>
              </div>
            </div>

            <div className="pt-3 border-t border-border flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setSelectedTenantModal(null)}
                className="px-4 py-2 rounded-xl border border-border text-xs font-semibold hover:bg-secondary"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => {
                  const id = selectedTenantModal.id;
                  setSelectedTenantModal(null);
                  handleLaunchTenantDashboard(id);
                }}
                className="px-5 py-2 rounded-xl bg-forest text-white text-xs font-bold hover:bg-forest-light flex items-center gap-1.5"
              >
                <span>Switch Context & Open Hub</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
