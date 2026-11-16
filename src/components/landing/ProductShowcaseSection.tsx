import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Package,
  Users,
  TrendingUp,
  ArrowUpRight,
  Sparkles,
  Search,
  Filter,
  DollarSign,
  Clock,
  CheckCircle2,
  Calendar,
} from 'lucide-react';
import { StatusBadge } from '../common/StatusBadge';

export const ProductShowcaseSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'orders' | 'customers' | 'analytics'>('overview');
  const navigate = useNavigate();

  return (
    <section id="showcase" className="py-28 bg-background relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sage-100 border border-sage-200 text-forest text-xs font-semibold tracking-wide mb-3">
            <span>LIVE INTERACTIVE PREVIEW</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-charcoal tracking-tight">
            Designed for clarity on the shop floor.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-charcoal-muted leading-relaxed">
            Switch between dashboard views below to see how LaundryOS presents operational intelligence,
            customer orders, and financial KPIs.
          </p>

          {/* Tab Selector Buttons */}
          <div className="mt-8 inline-flex items-center p-1.5 rounded-2xl bg-white border border-border shadow-subtle">
            <button
              onClick={() => setActiveTab('overview')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activeTab === 'overview'
                  ? 'bg-forest text-white shadow-xs'
                  : 'text-charcoal-muted hover:text-charcoal hover:bg-secondary'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Overview</span>
            </button>

            <button
              onClick={() => setActiveTab('orders')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activeTab === 'orders'
                  ? 'bg-forest text-white shadow-xs'
                  : 'text-charcoal-muted hover:text-charcoal hover:bg-secondary'
              }`}
            >
              <Package className="w-4 h-4" />
              <span>Orders</span>
            </button>

            <button
              onClick={() => setActiveTab('customers')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activeTab === 'customers'
                  ? 'bg-forest text-white shadow-xs'
                  : 'text-charcoal-muted hover:text-charcoal hover:bg-secondary'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>Customers</span>
            </button>

            <button
              onClick={() => setActiveTab('analytics')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activeTab === 'analytics'
                  ? 'bg-forest text-white shadow-xs'
                  : 'text-charcoal-muted hover:text-charcoal hover:bg-secondary'
              }`}
            >
              <TrendingUp className="w-4 h-4" />
              <span>Analytics</span>
            </button>
          </div>
        </div>

        {/* Laptop / Browser Mock Frame */}
        <div className="max-w-5xl mx-auto rounded-3xl border border-border/80 bg-charcoal/90 p-2 sm:p-3 shadow-drawer">
          {/* Browser Top Bar */}
          <div className="flex items-center justify-between px-4 py-2.5 bg-charcoal rounded-t-2xl text-xs text-charcoal-light">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
              <span className="ml-3 font-mono text-[11px] text-white/50">app.laundryos.ca/dashboard/{activeTab}</span>
            </div>

            <button
              onClick={() => navigate(`/dashboard/${activeTab === 'overview' ? '' : activeTab}`)}
              className="flex items-center gap-1.5 text-[11px] font-semibold text-linen hover:text-white transition-colors"
            >
              <span>Launch Full Screen</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Browser Workspace Content */}
          <div className="bg-background rounded-b-2xl p-4 sm:p-8 min-h-[440px] text-left transition-all">
            {/* VIEW 1: OVERVIEW */}
            {activeTab === 'overview' && (
              <div className="space-y-6 animate-in fade-in duration-300">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div>
                    <h3 className="text-xl font-display font-bold text-charcoal">
                      Good morning, James
                    </h3>
                    <p className="text-xs text-charcoal-muted">
                      Here’s what’s happening at FreshFold Laundry today (Toronto, ON)
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 bg-white border border-border rounded-lg text-xs font-medium text-charcoal">
                      Today: Nov 16
                    </span>
                  </div>
                </div>

                {/* 4 KPIs */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="p-4 rounded-xl bg-white border border-border shadow-xs">
                    <div className="text-[11px] text-charcoal-muted font-medium">Today's Revenue</div>
                    <div className="text-2xl font-bold font-display text-charcoal mt-1">CAD $1,284</div>
                    <div className="text-[10px] text-emerald-700 font-semibold mt-1">↑ +14.2% vs last Monday</div>
                  </div>
                  <div className="p-4 rounded-xl bg-white border border-border shadow-xs">
                    <div className="text-[11px] text-charcoal-muted font-medium">Active Orders</div>
                    <div className="text-2xl font-bold font-display text-forest mt-1">36 in cycle</div>
                    <div className="text-[10px] text-charcoal-muted mt-1">12 Washing • 8 Folding</div>
                  </div>
                  <div className="p-4 rounded-xl bg-white border border-border shadow-xs">
                    <div className="text-[11px] text-charcoal-muted font-medium">Completed Orders</div>
                    <div className="text-2xl font-bold font-display text-charcoal mt-1">124 this week</div>
                    <div className="text-[10px] text-emerald-700 font-semibold mt-1">99.2% on-time turnaround</div>
                  </div>
                  <div className="p-4 rounded-xl bg-white border border-border shadow-xs">
                    <div className="text-[11px] text-charcoal-muted font-medium">Total Customers</div>
                    <div className="text-2xl font-bold font-display text-charcoal mt-1">842</div>
                    <div className="text-[10px] text-charcoal-muted mt-1">+18 new this month</div>
                  </div>
                </div>

                {/* Quick live queue strip */}
                <div className="p-4 rounded-xl bg-white border border-border shadow-xs">
                  <div className="flex items-center justify-between mb-3 text-xs font-bold text-charcoal">
                    <span>Current Facility Batch Queue</span>
                    <span className="text-forest text-[11px]">8 Machines Active</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                    <div className="p-2.5 rounded-lg bg-sage-50 border border-sage-200">
                      <div className="font-semibold text-forest">Washer 04 • Eco Cold</div>
                      <div className="text-charcoal-muted text-[11px]">Order #LO-2048 (Alex Morgan)</div>
                    </div>
                    <div className="p-2.5 rounded-lg bg-amber-50 border border-amber-200">
                      <div className="font-semibold text-amber-900">Dryer 02 • Low Tumble</div>
                      <div className="text-charcoal-muted text-[11px]">Order #LO-2054 (Lucas Chen)</div>
                    </div>
                    <div className="p-2.5 rounded-lg bg-sky-50 border border-sky-200">
                      <div className="font-semibold text-sky-900">Van 01 • En Route Route 4B</div>
                      <div className="text-charcoal-muted text-[11px]">Order #LO-2056 (Sophia Patel)</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* VIEW 2: ORDERS */}
            {activeTab === 'orders' && (
              <div className="space-y-4 animate-in fade-in duration-300">
                <div className="flex items-center justify-between">
                  <h4 className="font-display font-bold text-charcoal text-base">Live Order Management</h4>
                  <span className="text-xs text-charcoal-muted">4 priority orders shown</span>
                </div>

                <div className="bg-white rounded-xl border border-border overflow-hidden">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-surface-subtle border-b border-border text-charcoal-muted font-semibold">
                      <tr>
                        <th className="p-3">Order ID</th>
                        <th className="p-3">Customer</th>
                        <th className="p-3">Service</th>
                        <th className="p-3">Status</th>
                        <th className="p-3 text-right">Total</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      <tr>
                        <td className="p-3 font-mono font-bold text-forest">LO-2048</td>
                        <td className="p-3 font-medium">Alex Morgan</td>
                        <td className="p-3 text-charcoal-muted">Wash & Fold</td>
                        <td className="p-3"><StatusBadge status="Washing" size="sm" /></td>
                        <td className="p-3 text-right font-bold">CAD $32.00</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-mono font-bold text-forest">LO-2049</td>
                        <td className="p-3 font-medium">Sarah Lee</td>
                        <td className="p-3 text-charcoal-muted">Dry Cleaning</td>
                        <td className="p-3"><StatusBadge status="Pickup Scheduled" size="sm" /></td>
                        <td className="p-3 text-right font-bold">CAD $48.00</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-mono font-bold text-forest">LO-2050</td>
                        <td className="p-3 font-medium">Michael Brown</td>
                        <td className="p-3 text-charcoal-muted">Bedding</td>
                        <td className="p-3"><StatusBadge status="Folding" size="sm" /></td>
                        <td className="p-3 text-right font-bold">CAD $65.00</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-mono font-bold text-forest">LO-2051</td>
                        <td className="p-3 font-medium">Emma Wilson</td>
                        <td className="p-3 text-charcoal-muted">Wash & Fold</td>
                        <td className="p-3"><StatusBadge status="Delivered" size="sm" /></td>
                        <td className="p-3 text-right font-bold">CAD $28.00</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* VIEW 3: CUSTOMERS */}
            {activeTab === 'customers' && (
              <div className="space-y-4 animate-in fade-in duration-300">
                <div className="flex items-center justify-between">
                  <h4 className="font-display font-bold text-charcoal text-base">Customer Intelligence</h4>
                  <span className="text-xs text-charcoal-muted">842 Profiles Active</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="p-3.5 rounded-xl bg-white border border-border">
                    <div className="flex items-center justify-between">
                      <h5 className="font-bold text-sm text-charcoal">Alex Morgan</h5>
                      <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-forest text-white">VIP</span>
                    </div>
                    <div className="text-xs text-charcoal-muted mt-1">14 lifetime orders</div>
                    <div className="text-xs font-bold text-charcoal mt-2">LTV: CAD $448.00</div>
                    <div className="text-[11px] text-sage-600 mt-1">Prefers: Fragrance-free, cold wash</div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-white border border-border">
                    <div className="flex items-center justify-between">
                      <h5 className="font-bold text-sm text-charcoal">Sarah Lee</h5>
                      <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-sage-100 text-forest">Active</span>
                    </div>
                    <div className="text-xs text-charcoal-muted mt-1">8 lifetime orders</div>
                    <div className="text-xs font-bold text-charcoal mt-2">LTV: CAD $384.00</div>
                    <div className="text-[11px] text-sage-600 mt-1">Regular dry cleaning customer</div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-white border border-border">
                    <div className="flex items-center justify-between">
                      <h5 className="font-bold text-sm text-charcoal">Emma Wilson</h5>
                      <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-forest text-white">VIP</span>
                    </div>
                    <div className="text-xs text-charcoal-muted mt-1">19 lifetime orders</div>
                    <div className="text-xs font-bold text-charcoal mt-2">LTV: CAD $612.00</div>
                    <div className="text-[11px] text-sage-600 mt-1">Delicate linens & silk items</div>
                  </div>
                </div>
              </div>
            )}

            {/* VIEW 4: ANALYTICS */}
            {activeTab === 'analytics' && (
              <div className="space-y-4 animate-in fade-in duration-300">
                <div className="flex items-center justify-between">
                  <h4 className="font-display font-bold text-charcoal text-base">Revenue & Operational Trends</h4>
                  <span className="text-xs text-forest font-semibold">CAD $28,450 Monthly Run Rate</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-white border border-border">
                    <div className="text-xs font-bold text-charcoal mb-2">Revenue Growth (Last 6 Months)</div>
                    <div className="flex items-end gap-2 h-28 pt-4">
                      {[40, 55, 65, 78, 85, 100].map((val, i) => (
                        <div key={i} className="flex-1 flex flex-col items-center gap-1">
                          <div className="w-full bg-forest rounded-t" style={{ height: `${val}%` }} />
                          <span className="text-[9px] text-charcoal-muted">M0{i + 1}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-white border border-border flex flex-col justify-between">
                    <div className="text-xs font-bold text-charcoal mb-2">Popular Services Distribution</div>
                    <div className="space-y-2 text-xs">
                      <div>
                        <div className="flex justify-between text-[11px] mb-0.5">
                          <span>Wash & Fold</span>
                          <span className="font-bold">58%</span>
                        </div>
                        <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
                          <div className="h-full bg-forest" style={{ width: '58%' }} />
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-[11px] mb-0.5">
                          <span>Dry Cleaning</span>
                          <span className="font-bold">24%</span>
                        </div>
                        <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
                          <div className="h-full bg-sage-500" style={{ width: '24%' }} />
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-[11px] mb-0.5">
                          <span>Bedding & Linens</span>
                          <span className="font-bold">18%</span>
                        </div>
                        <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
                          <div className="h-full bg-linen-dark" style={{ width: '18%' }} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
