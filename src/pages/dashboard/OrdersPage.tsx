import React, { useState } from 'react';
import { useLaundry } from '../../context/LaundryContext';
import { DashboardLayout } from '../../components/dashboard/DashboardLayout';
import { StatusBadge } from '../../components/common/StatusBadge';
import { OrderDetailDrawer } from '../../components/dashboard/OrderDetailDrawer';
import { NewOrderModal } from '../../components/dashboard/NewOrderModal';
import { OrderItem, OrderStatus } from '../../types';
import {
  Search,
  Filter,
  Download,
  Plus,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
  Eye,
  Calendar,
} from 'lucide-react';

export const OrdersPage: React.FC = () => {
  const { orders, currentTenant, addToast } = useLaundry();

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedOrder, setSelectedOrder] = useState<OrderItem | null>(null);
  const [newOrderModalOpen, setNewOrderModalOpen] = useState(false);

  const itemsPerPage = 8;

  // Filter orders
  const filtered = orders.filter((ord) => {
    if (statusFilter !== 'all' && ord.status !== statusFilter) {
      return false;
    }
    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      return (
        ord.orderId.toLowerCase().includes(q) ||
        ord.customerName.toLowerCase().includes(q) ||
        ord.serviceName.toLowerCase().includes(q) ||
        ord.pickupAddress.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const totalPages = Math.ceil(filtered.length / itemsPerPage) || 1;
  const paginatedOrders = filtered.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleExportCSV = () => {
    const headers = ['Order ID', 'Customer', 'Email', 'Service', 'Status', 'Pickup Window', 'Total CAD', 'Payment'];
    const rows = filtered.map((o) => [
      o.orderId,
      `"${o.customerName}"`,
      o.customerEmail,
      `"${o.serviceName}"`,
      o.status,
      `"${o.pickupDate} ${o.pickupTimeSlot}"`,
      o.total.toFixed(2),
      o.paymentStatus,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `${currentTenant.name.toLowerCase().replace(/\s+/g, '_')}_orders.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    addToast('CSV Export Generated', `Exported ${filtered.length} order records.`, 'success');
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 text-left">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-display font-bold text-charcoal tracking-tight">
              Order Management
            </h1>
            <p className="text-xs text-charcoal-muted mt-0.5">
              Live shop floor tracking, machine assignments, and order lifecycle states
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={handleExportCSV}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-border hover:bg-secondary text-charcoal text-xs font-semibold shadow-xs transition-colors"
            >
              <Download className="w-3.5 h-3.5 text-sage-600" />
              <span>Export CSV</span>
            </button>

            <button
              onClick={() => setNewOrderModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-forest text-white text-xs font-bold hover:bg-forest-light shadow-xs transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>New Order</span>
            </button>
          </div>
        </div>

        {/* Filters Toolbar */}
        <div className="p-4 rounded-2xl bg-white border border-border shadow-xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 text-xs">
          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-charcoal-muted absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search by order ID, customer name, address..."
              className="w-full pl-9 pr-4 py-2 rounded-xl border border-border bg-surface-subtle text-charcoal focus:outline-none focus:border-forest"
            />
          </div>

          {/* Status Dropdown */}
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-charcoal-muted shrink-0" />
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="p-2 rounded-xl border border-border bg-white text-charcoal font-medium focus:outline-none focus:border-forest"
            >
              <option value="all">All Statuses ({orders.length})</option>
              <option value="Confirmed">Confirmed</option>
              <option value="Pickup Scheduled">Pickup Scheduled</option>
              <option value="Picked Up">Picked Up</option>
              <option value="Washing">Washing</option>
              <option value="Drying">Drying</option>
              <option value="Folding">Folding</option>
              <option value="Ready for Delivery">Ready for Delivery</option>
              <option value="Out for Delivery">Out for Delivery</option>
              <option value="Delivered">Delivered</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
        </div>

        {/* Orders Table */}
        <div className="rounded-2xl bg-white border border-border shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-surface-subtle border-b border-border text-charcoal-muted font-bold uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="p-4">Order ID</th>
                  <th className="p-4">Customer</th>
                  <th className="p-4">Service</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Pickup Window</th>
                  <th className="p-4 text-right">Total (CAD)</th>
                  <th className="p-4 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border font-medium">
                {paginatedOrders.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="p-8 text-center text-charcoal-muted">
                      No orders matching your criteria.
                    </td>
                  </tr>
                ) : (
                  paginatedOrders.map((ord) => (
                    <tr
                      key={ord.id}
                      onClick={() => setSelectedOrder(ord)}
                      className="hover:bg-sage-50/50 cursor-pointer transition-colors group"
                    >
                      <td className="p-4 font-mono font-bold text-forest">
                        #{ord.orderId}
                      </td>
                      <td className="p-4">
                        <div className="font-bold text-charcoal">{ord.customerName}</div>
                        <div className="text-[10px] text-charcoal-muted">{ord.customerPhone}</div>
                      </td>
                      <td className="p-4 text-charcoal">
                        <div>{ord.serviceName}</div>
                        <div className="text-[10px] text-charcoal-muted">
                          {ord.weightLbs ? `${ord.weightLbs} lbs` : `${ord.itemCount || 1} items`}
                        </div>
                      </td>
                      <td className="p-4">
                        <StatusBadge status={ord.status} size="sm" />
                      </td>
                      <td className="p-4 text-charcoal-muted">
                        <div>{ord.pickupDate}</div>
                        <div className="text-[10px]">{ord.pickupTimeSlot}</div>
                      </td>
                      <td className="p-4 text-right font-bold text-charcoal font-mono">
                        ${ord.total.toFixed(2)}
                      </td>
                      <td className="p-4 text-center">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedOrder(ord);
                          }}
                          className="p-1.5 rounded-lg border border-border hover:bg-forest hover:text-white hover:border-forest text-charcoal transition-colors"
                          title="Open Order Drawer"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination Footer */}
          <div className="px-4 py-3 border-t border-border bg-surface-subtle flex items-center justify-between text-xs text-charcoal-muted">
            <div>
              Showing <span className="font-bold text-charcoal">{Math.min(filtered.length, (currentPage - 1) * itemsPerPage + 1)}</span> to{' '}
              <span className="font-bold text-charcoal">{Math.min(filtered.length, currentPage * itemsPerPage)}</span> of{' '}
              <span className="font-bold text-charcoal">{filtered.length}</span> orders
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="p-1.5 rounded-lg border border-border bg-white disabled:opacity-40 hover:bg-secondary transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="font-semibold text-charcoal">
                {currentPage} / {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="p-1.5 rounded-lg border border-border bg-white disabled:opacity-40 hover:bg-secondary transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Side Drawer with Full Order Details and Status Controls */}
      <OrderDetailDrawer
        order={selectedOrder}
        onClose={() => setSelectedOrder(null)}
      />

      {/* New Order Modal */}
      <NewOrderModal
        isOpen={newOrderModalOpen}
        onClose={() => setNewOrderModalOpen(false)}
      />
    </DashboardLayout>
  );
};
