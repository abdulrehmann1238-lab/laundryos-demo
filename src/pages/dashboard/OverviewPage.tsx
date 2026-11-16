import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLaundry } from '../../context/LaundryContext';
import { DashboardLayout } from '../../components/dashboard/DashboardLayout';
import { StatusBadge } from '../../components/common/StatusBadge';
import {
  DollarSign,
  Package,
  CheckCircle2,
  Users,
  TrendingUp,
  Calendar,
  Clock,
  ArrowRight,
  Truck,
  RotateCw,
  Sparkles,
  ArrowUpRight,
  Filter,
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

export const OverviewPage: React.FC = () => {
  const { currentTenant, orders, customers } = useLaundry();
  const navigate = useNavigate();
  const [dateRange, setDateRange] = useState<'today' | '7days' | '30days' | 'custom'>('today');

  // Dynamic revenue data based on filter
  const getRevenueData = () => {
    switch (dateRange) {
      case 'today':
        return [
          { time: '08:00 AM', revenue: 180, orders: 4 },
          { time: '10:00 AM', revenue: 340, orders: 9 },
          { time: '12:00 PM', revenue: 580, orders: 15 },
          { time: '02:00 PM', revenue: 820, orders: 22 },
          { time: '04:00 PM', revenue: 1040, orders: 29 },
          { time: '06:00 PM', revenue: 1284, orders: 36 },
        ];
      case '7days':
        return [
          { time: 'Mon', revenue: 1284, orders: 36 },
          { time: 'Tue', revenue: 1420, orders: 41 },
          { time: 'Wed', revenue: 1190, orders: 32 },
          { time: 'Thu', revenue: 1580, orders: 45 },
          { time: 'Fri', revenue: 1890, orders: 54 },
          { time: 'Sat', revenue: 2150, orders: 62 },
          { time: 'Sun', revenue: 1640, orders: 48 },
        ];
      case '30days':
      default:
        return [
          { time: 'Week 1', revenue: 8420, orders: 240 },
          { time: 'Week 2', revenue: 9150, orders: 265 },
          { time: 'Week 3', revenue: 9880, orders: 284 },
          { time: 'Week 4', revenue: 10420, orders: 302 },
        ];
    }
  };

  const revenueData = getRevenueData();

  // Status breakdown for Pie
  const statusCounts = orders.reduce((acc: Record<string, number>, curr) => {
    acc[curr.status] = (acc[curr.status] || 0) + 1;
    return acc;
  }, {});

  const pieData = [
    { name: 'Washing', value: statusCounts['Washing'] || 3, color: '#0D9488' },
    { name: 'Folding', value: statusCounts['Folding'] || 4, color: '#657B68' },
    { name: 'Pickup/In Transit', value: (statusCounts['Pickup Scheduled'] || 2) + (statusCounts['Out for Delivery'] || 2), color: '#0284C7' },
    { name: 'Delivered', value: statusCounts['Delivered'] || 6, color: '#344B3B' },
  ];

  const upcomingPickups = orders.filter((o) => o.status === 'Pickup Scheduled' || o.status === 'Confirmed').slice(0, 3);
  const pendingDeliveries = orders.filter((o) => o.status === 'Out for Delivery' || o.status === 'Ready for Delivery').slice(0, 3);

  return (
    <DashboardLayout>
      <div className="space-y-6 text-left">
        {/* Top Operational Greeting & Date Filter */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="text-xs text-charcoal-muted font-medium">
              Daily Management Console
            </div>
            <h1 className="text-2xl sm:text-3xl font-display font-bold text-charcoal tracking-tight mt-0.5">
              Good morning, {currentTenant.ownerName.split(' ')[0]}.
            </h1>
            <p className="text-xs sm:text-sm text-charcoal-muted mt-1">
              Here’s what’s happening at <strong className="text-charcoal font-semibold">{currentTenant.name}</strong> today.
            </p>
          </div>

          {/* Date Filters */}
          <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-white border border-border shadow-xs text-xs">
            {(['today', '7days', '30days', 'custom'] as const).map((range) => (
              <button
                key={range}
                onClick={() => setDateRange(range)}
                className={`px-3 py-1.5 rounded-xl font-semibold capitalize transition-all ${
                  dateRange === range
                    ? 'bg-forest text-white shadow-xs'
                    : 'text-charcoal-muted hover:text-charcoal'
                }`}
              >
                {range === '7days' ? 'Last 7 Days' : range === '30days' ? 'Last 30 Days' : range}
              </button>
            ))}
          </div>
        </div>

        {/* 4 CORE KPI CARDS */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {/* 1. Today's Revenue */}
          <div className="p-5 rounded-2xl bg-white border border-border shadow-xs hover:shadow-card transition-all">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-charcoal-muted uppercase tracking-wider">
                Today's Revenue
              </span>
              <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
                <DollarSign className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3 text-2xl sm:text-3xl font-display font-extrabold text-charcoal">
              CAD ${currentTenant.stats.todayRevenue.toLocaleString()}
            </div>
            <div className="mt-1 flex items-center gap-1 text-[11px] text-emerald-700 font-semibold">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>+18.4% vs last week average</span>
            </div>
          </div>

          {/* 2. Active Orders */}
          <div className="p-5 rounded-2xl bg-white border border-border shadow-xs hover:shadow-card transition-all">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-charcoal-muted uppercase tracking-wider">
                Active Orders
              </span>
              <div className="w-8 h-8 rounded-lg bg-sage-100 text-forest flex items-center justify-center font-bold">
                <Package className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3 text-2xl sm:text-3xl font-display font-extrabold text-forest">
              {currentTenant.stats.activeOrders} <span className="text-sm font-normal text-charcoal-muted">in shop</span>
            </div>
            <div className="mt-1 text-[11px] text-charcoal-muted">
              8 in Washing • 6 in Folding
            </div>
          </div>

          {/* 3. Completed Orders */}
          <div className="p-5 rounded-2xl bg-white border border-border shadow-xs hover:shadow-card transition-all">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-charcoal-muted uppercase tracking-wider">
                Completed Orders
              </span>
              <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center font-bold">
                <CheckCircle2 className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3 text-2xl sm:text-3xl font-display font-extrabold text-charcoal">
              {currentTenant.stats.completedOrders}
            </div>
            <div className="mt-1 text-[11px] text-emerald-700 font-semibold">
              99.4% on-time SLA achievement
            </div>
          </div>

          {/* 4. Total Customers */}
          <div className="p-5 rounded-2xl bg-white border border-border shadow-xs hover:shadow-card transition-all">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-charcoal-muted uppercase tracking-wider">
                Total Customers
              </span>
              <div className="w-8 h-8 rounded-lg bg-linen text-charcoal flex items-center justify-center font-bold">
                <Users className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3 text-2xl sm:text-3xl font-display font-extrabold text-charcoal">
              {currentTenant.stats.totalCustomers}
            </div>
            <div className="mt-1 text-[11px] text-charcoal-muted">
              Average LTV: CAD ${currentTenant.stats.avgOrderValue * 8}
            </div>
          </div>
        </div>

        {/* CHARTS GRID: Revenue Over Time & Status Distribution */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Revenue Chart (8 cols) */}
          <div className="lg:col-span-8 p-6 rounded-2xl bg-white border border-border shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-charcoal">
                  Revenue & Order Flow
                </h3>
                <p className="text-xs text-charcoal-muted mt-0.5">
                  Filtered by: <span className="font-semibold text-forest capitalize">{dateRange}</span>
                </p>
              </div>

              <div className="flex items-center gap-3 text-xs font-medium">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-sm bg-forest inline-block" />
                  <span>Revenue (CAD)</span>
                </div>
              </div>
            </div>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={revenueData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="forestGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#344B3B" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#344B3B" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="time" stroke="#777C74" fontSize={11} tickLine={false} />
                  <YAxis stroke="#777C74" fontSize={11} tickLine={false} tickFormatter={(v) => `$${v}`} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#252A26', color: '#FAF9F5', borderRadius: '10px', fontSize: '12px' }}
                    formatter={(val: any) => [`$${val} CAD`, 'Revenue']}
                  />
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    stroke="#344B3B"
                    strokeWidth={2.5}
                    fillOpacity={1}
                    fill="url(#forestGradient)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Status Distribution Donut (4 cols) */}
          <div className="lg:col-span-4 p-6 rounded-2xl bg-white border border-border shadow-xs flex flex-col justify-between">
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-charcoal">
                Order Pipeline Stages
              </h3>
              <p className="text-xs text-charcoal-muted mt-0.5">
                Current active machine batches
              </p>
            </div>

            <div className="h-48 w-full my-2">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={75}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ backgroundColor: '#252A26', color: '#FAF9F5', borderRadius: '10px', fontSize: '11px' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-2 gap-2 text-[11px] pt-3 border-t border-border">
              {pieData.map((item) => (
                <div key={item.name} className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                  <span className="text-charcoal-muted truncate">{item.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* OPERATIONS DISPATCH STRIP: Upcoming Pickups & Pending Deliveries */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Upcoming Pickups */}
          <div className="p-5 rounded-2xl bg-white border border-border shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-forest" />
                <h4 className="text-sm font-bold text-charcoal">Upcoming Scheduled Pickups</h4>
              </div>
              <button
                onClick={() => navigate('/dashboard/operations')}
                className="text-xs font-semibold text-forest hover:underline"
              >
                Dispatch Hub
              </button>
            </div>

            <div className="space-y-2.5">
              {upcomingPickups.length === 0 ? (
                <div className="text-xs text-charcoal-muted py-4 text-center">No pickups scheduled</div>
              ) : (
                upcomingPickups.map((ord) => (
                  <div
                    key={ord.id}
                    onClick={() => navigate('/dashboard/orders')}
                    className="p-3 rounded-xl bg-surface-subtle border border-border hover:border-sage-300 transition-colors cursor-pointer flex items-center justify-between text-xs"
                  >
                    <div>
                      <div className="font-bold text-charcoal">#{ord.orderId} • {ord.customerName}</div>
                      <div className="text-[10px] text-charcoal-muted mt-0.5 truncate max-w-[200px]">
                        {ord.pickupAddress}
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] font-semibold text-forest block">{ord.pickupTimeSlot}</span>
                      <StatusBadge status={ord.status} size="sm" />
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Pending Deliveries */}
          <div className="p-5 rounded-2xl bg-white border border-border shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-forest" />
                <h4 className="text-sm font-bold text-charcoal">Active Delivery Runs</h4>
              </div>
              <button
                onClick={() => navigate('/dashboard/orders')}
                className="text-xs font-semibold text-forest hover:underline"
              >
                All Orders
              </button>
            </div>

            <div className="space-y-2.5">
              {pendingDeliveries.length === 0 ? (
                <div className="text-xs text-charcoal-muted py-4 text-center">All deliveries dispatched</div>
              ) : (
                pendingDeliveries.map((ord) => (
                  <div
                    key={ord.id}
                    onClick={() => navigate('/dashboard/orders')}
                    className="p-3 rounded-xl bg-surface-subtle border border-border hover:border-sage-300 transition-colors cursor-pointer flex items-center justify-between text-xs"
                  >
                    <div>
                      <div className="font-bold text-charcoal">#{ord.orderId} • {ord.customerName}</div>
                      <div className="text-[10px] text-charcoal-muted mt-0.5">
                        Driver: {ord.driverName || 'Olivia Brown'}
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="font-bold text-charcoal font-mono">${ord.total.toFixed(2)}</span>
                      <StatusBadge status={ord.status} size="sm" />
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};
