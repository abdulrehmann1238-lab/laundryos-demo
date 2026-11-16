import React, { useState } from 'react';
import { useLaundry } from '../../context/LaundryContext';
import { DashboardLayout } from '../../components/dashboard/DashboardLayout';
import { StatusBadge } from '../../components/common/StatusBadge';
import {
  Truck,
  Navigation,
  MapPin,
  Clock,
  CheckCircle2,
  AlertCircle,
  Phone,
  User,
  Calendar,
  Layers,
  ArrowRight,
  Filter,
} from 'lucide-react';

export const OperationsPage: React.FC = () => {
  const { orders, teamMembers, updateOrderStatus, assignDriver, addToast } = useLaundry();

  const drivers = teamMembers.filter((m) => m.role === 'Driver');

  const [activeTab, setActiveTab] = useState<'all' | 'pickups' | 'deliveries'>('all');
  const [selectedDriverFilter, setSelectedDriverFilter] = useState('all');

  const operationsOrders = orders.filter((o) => {
    if (activeTab === 'pickups') {
      return o.status === 'Pickup Scheduled' || o.status === 'Confirmed' || o.status === 'Picked Up';
    }
    if (activeTab === 'deliveries') {
      return o.status === 'Out for Delivery' || o.status === 'Ready for Delivery' || o.status === 'Delivered';
    }
    return o.status !== 'Cancelled';
  });

  const todayPickups = orders.filter((o) => o.status === 'Pickup Scheduled' || o.status === 'Confirmed').length;
  const todayDeliveries = orders.filter((o) => o.status === 'Out for Delivery' || o.status === 'Ready for Delivery').length;
  const inTransit = orders.filter((o) => o.status === 'Out for Delivery' || o.status === 'Picked Up').length;

  const handleMarkPickedUp = (orderId: string) => {
    updateOrderStatus(orderId, 'Picked Up', 'Collected by driver from customer pickup address.');
    addToast('Marked Picked Up', `Order #${orderId} marked collected into van route.`, 'info');
  };

  const handleMarkDelivered = (orderId: string) => {
    updateOrderStatus(orderId, 'Delivered', 'Delivered safely and signature received.');
    addToast('Marked Delivered', `Order #${orderId} completed successfully.`, 'success');
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 text-left">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-display font-bold text-charcoal tracking-tight">
              Pickup & Delivery Logistics
            </h1>
            <p className="text-xs text-charcoal-muted mt-0.5">
              Live driver dispatching, neighborhood route stops, and delivery completion logs
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1.5 rounded-xl bg-forest text-white text-xs font-bold flex items-center gap-1.5 shadow-xs">
              <Truck className="w-3.5 h-3.5" />
              <span>3 Drivers En Route</span>
            </span>
          </div>
        </div>

        {/* 4 Logistics Metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-white border border-border shadow-xs">
            <span className="text-[11px] text-charcoal-muted font-medium uppercase tracking-wider">
              Pending Pickups
            </span>
            <div className="text-2xl font-bold font-display text-charcoal mt-1">
              {todayPickups} stops
            </div>
            <div className="text-[10px] text-charcoal-muted mt-0.5">Morning & afternoon windows</div>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-border shadow-xs">
            <span className="text-[11px] text-charcoal-muted font-medium uppercase tracking-wider">
              Active In Transit
            </span>
            <div className="text-2xl font-bold font-display text-sky-700 mt-1">
              {inTransit} batches
            </div>
            <div className="text-[10px] text-sky-700 font-semibold mt-0.5">Live GPS tracking active</div>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-border shadow-xs">
            <span className="text-[11px] text-charcoal-muted font-medium uppercase tracking-wider">
              Pending Deliveries
            </span>
            <div className="text-2xl font-bold font-display text-forest mt-1">
              {todayDeliveries} stops
            </div>
            <div className="text-[10px] text-charcoal-muted mt-0.5">Evening return routes</div>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-border shadow-xs">
            <span className="text-[11px] text-charcoal-muted font-medium uppercase tracking-wider">
              Fleet Drivers
            </span>
            <div className="text-2xl font-bold font-display text-charcoal mt-1">
              {drivers.length} active
            </div>
            <div className="text-[10px] text-charcoal-muted mt-0.5">Olivia, Daniel, David</div>
          </div>
        </div>

        {/* SIMULATED MAP-STYLE VISUALIZATION (Toronto Logistics Grid) */}
        <div className="p-5 rounded-3xl bg-charcoal text-white shadow-drawer relative overflow-hidden">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Navigation className="w-5 h-5 text-emerald-400" />
              <h3 className="text-sm font-bold tracking-wide">
                Toronto Downtown Route Telemetry (Simulated Dispatch Map)
              </h3>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/10 text-emerald-300">
              LIVE SATELLITE CAD VIEW
            </span>
          </div>

          {/* Map Grid Surface */}
          <div className="relative h-60 rounded-2xl bg-[#1D2520] border border-white/10 p-4 overflow-hidden flex flex-col justify-between">
            {/* Subtle Road Grid Lines */}
            <div className="absolute inset-0 opacity-15 pointer-events-none bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:40px_40px]" />

            {/* Simulated Route Waypoint Nodes */}
            <div className="relative z-10 grid grid-cols-3 sm:grid-cols-4 gap-4 h-full items-center">
              {/* FreshFold HQ Hub */}
              <div className="p-2.5 rounded-xl bg-forest/90 border border-emerald-500/40 text-xs shadow-card">
                <div className="flex items-center gap-1.5 text-emerald-300 font-bold text-[10px] uppercase">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  HQ Plant
                </div>
                <div className="font-bold text-white mt-1">FreshFold Cleaners</div>
                <div className="text-[10px] text-white/70">482 Queen St West</div>
              </div>

              {/* Waypoint 1: Alex Morgan */}
              <div className="p-2.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-xs">
                <div className="text-linen font-bold text-[10px]">STOP 01 • PICKUP</div>
                <div className="font-bold text-white mt-0.5">142 King St East</div>
                <div className="text-[10px] text-emerald-400 font-mono">Alex Morgan (#LO-2048)</div>
              </div>

              {/* Waypoint 2: Sophia Patel */}
              <div className="p-2.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-xs">
                <div className="text-sky-300 font-bold text-[10px]">STOP 02 • EN ROUTE</div>
                <div className="font-bold text-white mt-0.5">101 College Street</div>
                <div className="text-[10px] text-sky-400 font-mono">Driver: Olivia Brown</div>
              </div>

              {/* Waypoint 3: Daniel Scott */}
              <div className="p-2.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-xs hidden sm:block">
                <div className="text-amber-300 font-bold text-[10px]">STOP 03 • DELIVERY</div>
                <div className="font-bold text-white mt-0.5">77 Bloor St West</div>
                <div className="text-[10px] text-amber-300 font-mono">Driver: Daniel Scott</div>
              </div>
            </div>

            {/* Bottom Map Stats */}
            <div className="relative z-10 pt-2 border-t border-white/10 flex items-center justify-between text-[11px] text-white/70">
              <span>Avg downtown transit time: 14.2 minutes</span>
              <span className="text-emerald-400 font-mono font-semibold">All Drivers Active</span>
            </div>
          </div>
        </div>

        {/* Tab Selector & Filter */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-1 p-1 rounded-xl bg-white border border-border shadow-xs">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-colors ${
                activeTab === 'all' ? 'bg-forest text-white' : 'text-charcoal-muted hover:text-charcoal'
              }`}
            >
              All Route Stops ({orders.length})
            </button>
            <button
              onClick={() => setActiveTab('pickups')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-colors ${
                activeTab === 'pickups' ? 'bg-forest text-white' : 'text-charcoal-muted hover:text-charcoal'
              }`}
            >
              Pickups
            </button>
            <button
              onClick={() => setActiveTab('deliveries')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-colors ${
                activeTab === 'deliveries' ? 'bg-forest text-white' : 'text-charcoal-muted hover:text-charcoal'
              }`}
            >
              Deliveries
            </button>
          </div>
        </div>

        {/* Dispatch Orders Table with Functional Toggles */}
        <div className="rounded-2xl bg-white border border-border shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-surface-subtle border-b border-border text-charcoal-muted font-bold uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="p-4">Order & Customer</th>
                  <th className="p-4">Destination Address</th>
                  <th className="p-4">Scheduled Window</th>
                  <th className="p-4">Assigned Driver</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-center">Quick Dispatch Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border font-medium">
                {operationsOrders.slice(0, 10).map((ord) => (
                  <tr key={ord.id} className="hover:bg-sage-50/40 transition-colors">
                    <td className="p-4">
                      <div className="font-mono font-bold text-forest">#{ord.orderId}</div>
                      <div className="font-bold text-charcoal">{ord.customerName}</div>
                      <div className="text-[10px] text-charcoal-muted">{ord.serviceName}</div>
                    </td>

                    <td className="p-4">
                      <div className="text-charcoal font-medium max-w-[200px] truncate">{ord.pickupAddress}</div>
                      <div className="text-[10px] text-charcoal-muted">Concierge Desk / Unit #</div>
                    </td>

                    <td className="p-4 text-charcoal-muted">
                      <div>{ord.pickupDate}</div>
                      <div className="text-[10px] font-semibold text-charcoal">{ord.pickupTimeSlot}</div>
                    </td>

                    <td className="p-4">
                      <select
                        value={ord.driverId || ''}
                        onChange={(e) => {
                          const d = drivers.find((x) => x.id === e.target.value);
                          if (d) assignDriver(ord.orderId, d.id, d.name);
                        }}
                        className="p-1.5 rounded-lg border border-border bg-white text-xs font-semibold text-charcoal"
                      >
                        <option value="">Unassigned</option>
                        {drivers.map((drv) => (
                          <option key={drv.id} value={drv.id}>
                            {drv.name}
                          </option>
                        ))}
                      </select>
                    </td>

                    <td className="p-4">
                      <StatusBadge status={ord.status} size="sm" />
                    </td>

                    <td className="p-4 text-center">
                      {ord.status === 'Pickup Scheduled' || ord.status === 'Confirmed' ? (
                        <button
                          onClick={() => handleMarkPickedUp(ord.orderId)}
                          className="px-2.5 py-1 rounded-lg bg-sage-100 hover:bg-forest hover:text-white text-forest font-bold text-[11px] transition-colors"
                        >
                          Mark Picked Up
                        </button>
                      ) : ord.status === 'Out for Delivery' || ord.status === 'Ready for Delivery' ? (
                        <button
                          onClick={() => handleMarkDelivered(ord.orderId)}
                          className="px-2.5 py-1 rounded-lg bg-emerald-100 hover:bg-emerald-700 hover:text-white text-emerald-800 font-bold text-[11px] transition-colors"
                        >
                          Mark Delivered
                        </button>
                      ) : ord.status === 'Delivered' ? (
                        <span className="text-[11px] text-charcoal-muted font-bold flex items-center justify-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5 text-forest" />
                          <span>Done</span>
                        </span>
                      ) : (
                        <span className="text-[10px] text-charcoal-muted">In Plant Facility</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};
