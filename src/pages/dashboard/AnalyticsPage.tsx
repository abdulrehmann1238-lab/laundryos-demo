import React, { useState } from 'react';
import { useLaundry } from '../../context/LaundryContext';
import { DashboardLayout } from '../../components/dashboard/DashboardLayout';
import {
  TrendingUp,
  DollarSign,
  Package,
  Users,
  Clock,
  Sparkles,
  Calendar,
  Layers,
  ArrowUpRight,
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

export const AnalyticsPage: React.FC = () => {
  const { currentTenant } = useLaundry();
  const [timeRange, setTimeRange] = useState<'30days' | '90days' | 'year'>('30days');

  // Revenue & Order Volume Trends
  const trendData = [
    { label: 'Week 1', revenue: 6420, orders: 182, aov: 35.2 },
    { label: 'Week 2', revenue: 7190, orders: 198, aov: 36.3 },
    { label: 'Week 3', revenue: 8400, orders: 231, aov: 36.4 },
    { label: 'Week 4', revenue: 9850, orders: 268, aov: 36.7 },
    { label: 'Week 5', revenue: 11200, orders: 304, aov: 36.8 },
    { label: 'Week 6', revenue: 12840, orders: 348, aov: 36.9 },
  ];

  // Peak Hours Data
  const peakHoursData = [
    { hour: '7 AM', orders: 14 },
    { hour: '8 AM', orders: 38 },
    { hour: '9 AM', orders: 62 },
    { hour: '10 AM', orders: 45 },
    { hour: '12 PM', orders: 28 },
    { hour: '2 PM', orders: 32 },
    { hour: '4 PM', orders: 54 },
    { hour: '5 PM', orders: 74 },
    { hour: '6 PM', orders: 68 },
    { hour: '8 PM', orders: 22 },
  ];

  // Retention Cohort Data
  const retentionData = [
    { cohort: 'Month 1', retentionRate: 100 },
    { cohort: 'Month 2', retentionRate: 78 },
    { cohort: 'Month 3', retentionRate: 69 },
    { cohort: 'Month 4', retentionRate: 64 },
    { cohort: 'Month 5', retentionRate: 61 },
    { cohort: 'Month 6', retentionRate: 58 },
  ];

  const servicePopularity = [
    { name: 'Wash & Fold', value: 54, color: '#344B3B' },
    { name: 'Dry Cleaning', value: 24, color: '#657B68' },
    { name: 'Bedding & Linen', value: 14, color: '#ADC0AF' },
    { name: 'Express 6-Hr', value: 8, color: '#E7DDD0' },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6 text-left">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-display font-bold text-charcoal tracking-tight">
              Business Intelligence & Analytics
            </h1>
            <p className="text-xs text-charcoal-muted mt-0.5">
              Actionable operational metrics, customer retention cohorts, and demand forecasting
            </p>
          </div>

          <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-white border border-border shadow-xs text-xs font-semibold">
            {(['30days', '90days', 'year'] as const).map((r) => (
              <button
                key={r}
                onClick={() => setTimeRange(r)}
                className={`px-3 py-1.5 rounded-xl capitalize transition-all ${
                  timeRange === r ? 'bg-forest text-white' : 'text-charcoal-muted hover:text-charcoal'
                }`}
              >
                {r === '30days' ? 'Last 30 Days' : r === '90days' ? 'Last Quarter' : 'Year to Date'}
              </button>
            ))}
          </div>
        </div>

        {/* 4 Summary Metric Pills */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-white border border-border shadow-xs">
            <span className="text-[11px] text-charcoal-muted uppercase font-bold tracking-wider">
              Avg Order Value (AOV)
            </span>
            <div className="text-2xl font-bold font-display text-charcoal mt-1">
              CAD $36.85
            </div>
            <div className="text-[10px] text-emerald-700 font-semibold mt-0.5">↑ +8.4% YoY</div>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-border shadow-xs">
            <span className="text-[11px] text-charcoal-muted font-bold uppercase tracking-wider">
              Repeat Customer Rate
            </span>
            <div className="text-2xl font-bold font-display text-forest mt-1">
              64.2%
            </div>
            <div className="text-[10px] text-charcoal-muted mt-0.5">Industry avg: 42%</div>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-border shadow-xs">
            <span className="text-[11px] text-charcoal-muted font-bold uppercase tracking-wider">
              Avg Turnaround Time
            </span>
            <div className="text-2xl font-bold font-display text-charcoal mt-1">
              18.4 Hours
            </div>
            <div className="text-[10px] text-emerald-700 font-semibold mt-0.5">5.6 hrs faster than SLA</div>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-border shadow-xs">
            <span className="text-[11px] text-charcoal-muted font-bold uppercase tracking-wider">
              Fleet Delivery Efficiency
            </span>
            <div className="text-2xl font-bold font-display text-charcoal mt-1">
              98.7%
            </div>
            <div className="text-[10px] text-charcoal-muted mt-0.5">On-time stop rate</div>
          </div>
        </div>

        {/* ROW 1: Revenue & Order Volume Trends */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8 p-6 rounded-2xl bg-white border border-border shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-charcoal">
                  Revenue Growth Trajectory
                </h3>
                <p className="text-xs text-charcoal-muted mt-0.5">Weekly settled revenues (CAD)</p>
              </div>
              <span className="text-xs font-bold font-mono text-forest">
                CAD ${currentTenant.stats.todayRevenue * 24} Monthly Run
              </span>
            </div>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={trendData}>
                  <defs>
                    <linearGradient id="areaGreen" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#344B3B" stopOpacity={0.35} />
                      <stop offset="95%" stopColor="#344B3B" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="label" stroke="#777C74" fontSize={11} tickLine={false} />
                  <YAxis stroke="#777C74" fontSize={11} tickLine={false} tickFormatter={(v) => `$${v}`} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#252A26', color: '#FAF9F5', borderRadius: '10px', fontSize: '11px' }}
                    formatter={(val: any) => [`$${val} CAD`, 'Revenue']}
                  />
                  <Area type="monotone" dataKey="revenue" stroke="#344B3B" strokeWidth={2.5} fill="url(#areaGreen)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="lg:col-span-4 p-6 rounded-2xl bg-white border border-border shadow-xs flex flex-col justify-between">
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-charcoal">
                Service Popularity Mix
              </h3>
              <p className="text-xs text-charcoal-muted mt-0.5">Distribution of total volume</p>
            </div>

            <div className="h-48 w-full my-2">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={servicePopularity}
                    cx="50%"
                    cy="50%"
                    innerRadius={45}
                    outerRadius={70}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {servicePopularity.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ backgroundColor: '#252A26', color: '#FAF9F5', borderRadius: '10px', fontSize: '11px' }}
                    formatter={(v: any) => [`${v}% of orders`]}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-2 gap-2 text-[11px] pt-3 border-t border-border">
              {servicePopularity.map((item) => (
                <div key={item.name} className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                  <span className="text-charcoal-muted truncate">{item.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ROW 2: Peak Ordering Hours & Customer Retention Cohorts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Peak Hours */}
          <div className="p-6 rounded-2xl bg-white border border-border shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-charcoal">
                  Peak Booking & Drop-off Hours
                </h3>
                <p className="text-xs text-charcoal-muted mt-0.5">Highest order volume between 9 AM and 5 PM</p>
              </div>
              <Clock className="w-4 h-4 text-forest" />
            </div>

            <div className="h-56 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={peakHoursData}>
                  <XAxis dataKey="hour" stroke="#777C74" fontSize={10} tickLine={false} />
                  <YAxis stroke="#777C74" fontSize={10} tickLine={false} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#252A26', color: '#FAF9F5', borderRadius: '10px', fontSize: '11px' }}
                    formatter={(val: any) => [`${val} orders placed`, 'Volume']}
                  />
                  <Bar dataKey="orders" fill="#657B68" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Retention Cohorts */}
          <div className="p-6 rounded-2xl bg-white border border-border shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-charcoal">
                  Customer Retention Cohorts
                </h3>
                <p className="text-xs text-charcoal-muted mt-0.5">Long-term customer loyalty over 6 months</p>
              </div>
              <Users className="w-4 h-4 text-forest" />
            </div>

            <div className="h-56 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={retentionData}>
                  <XAxis dataKey="cohort" stroke="#777C74" fontSize={10} tickLine={false} />
                  <YAxis stroke="#777C74" fontSize={10} tickLine={false} tickFormatter={(v) => `${v}%`} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#252A26', color: '#FAF9F5', borderRadius: '10px', fontSize: '11px' }}
                    formatter={(val: any) => [`${val}% retained`, 'Cohort Retention']}
                  />
                  <Line type="monotone" dataKey="retentionRate" stroke="#344B3B" strokeWidth={2.5} dot={{ r: 4, fill: '#344B3B' }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};
