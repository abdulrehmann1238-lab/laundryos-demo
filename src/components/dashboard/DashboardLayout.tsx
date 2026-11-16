import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useLaundry } from '../../context/LaundryContext';
import { Logo } from '../common/Logo';
import { NotificationDropdown } from '../common/NotificationDropdown';
import {
  LayoutDashboard,
  Package,
  Users,
  Tags,
  Truck,
  CreditCard,
  TrendingUp,
  UserCheck,
  Receipt,
  Settings,
  HelpCircle,
  Building2,
  ChevronDown,
  Plus,
  Menu,
  X,
  Sparkles,
  ExternalLink,
} from 'lucide-react';
import { NewOrderModal } from './NewOrderModal';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { currentTenant, tenants, switchTenant } = useLaundry();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [tenantDropdownOpen, setTenantDropdownOpen] = useState(false);
  const [newOrderModalOpen, setNewOrderModalOpen] = useState(false);

  const navItems = [
    { label: 'Overview', path: '/dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
    { label: 'Orders', path: '/dashboard/orders', icon: <Package className="w-4 h-4" /> },
    { label: 'Customers', path: '/dashboard/customers', icon: <Users className="w-4 h-4" /> },
    { label: 'Services & Pricing', path: '/dashboard/services', icon: <Tags className="w-4 h-4" /> },
    { label: 'Pickup & Delivery', path: '/dashboard/operations', icon: <Truck className="w-4 h-4" /> },
    { label: 'Payments', path: '/dashboard/payments', icon: <CreditCard className="w-4 h-4" /> },
    { label: 'Analytics', path: '/dashboard/analytics', icon: <TrendingUp className="w-4 h-4" /> },
    { label: 'Team', path: '/dashboard/team', icon: <UserCheck className="w-4 h-4" /> },
    { label: 'Billing', path: '/dashboard/billing', icon: <Receipt className="w-4 h-4" /> },
    { label: 'Settings', path: '/dashboard/settings', icon: <Settings className="w-4 h-4" /> },
  ];

  const isActive = (path: string) => {
    if (path === '/dashboard' && location.pathname === '/dashboard') return true;
    if (path !== '/dashboard' && location.pathname === path) return true;
    return false;
  };

  return (
    <div className="min-h-screen bg-background text-charcoal flex flex-col md:flex-row pt-12 md:pt-12">
      {/* SIDEBAR (Desktop Fixed, Mobile Drawer) */}
      {/* Mobile Backdrop */}
      {mobileSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-charcoal/50 backdrop-blur-xs md:hidden"
          onClick={() => setMobileSidebarOpen(false)}
        />
      )}

      <aside
        className={`fixed top-12 bottom-0 left-0 z-40 w-64 bg-white border-r border-border flex flex-col justify-between transition-transform duration-300 md:translate-x-0 ${
          mobileSidebarOpen ? 'translate-x-0 shadow-drawer' : '-translate-x-full'
        }`}
      >
        {/* Brand & Business Header */}
        <div className="p-4 border-b border-border">
          <div className="flex items-center justify-between">
            <Logo size="sm" showTagline={false} />
            <button
              onClick={() => setMobileSidebarOpen(false)}
              className="md:hidden p-1.5 text-charcoal-muted hover:text-charcoal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Current Active Tenant Switcher */}
          <div className="relative mt-3">
            <button
              onClick={() => setTenantDropdownOpen(!tenantDropdownOpen)}
              className="w-full flex items-center justify-between p-2 rounded-xl bg-surface-subtle border border-border hover:bg-secondary transition-colors text-left"
            >
              <div className="flex items-center gap-2 min-w-0">
                <div className="w-6 h-6 rounded-lg bg-forest text-white flex items-center justify-center shrink-0 text-xs font-bold">
                  {currentTenant.name[0]}
                </div>
                <div className="truncate">
                  <div className="text-xs font-bold text-charcoal truncate">{currentTenant.name}</div>
                  <div className="text-[10px] text-charcoal-muted truncate">{currentTenant.city}, {currentTenant.country}</div>
                </div>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-charcoal-muted shrink-0" />
            </button>

            {tenantDropdownOpen && (
              <div
                className="absolute left-0 right-0 top-full mt-1.5 bg-white rounded-xl shadow-drawer border border-border py-1.5 z-50"
                onMouseLeave={() => setTenantDropdownOpen(false)}
              >
                <div className="px-3 py-1 text-[10px] font-bold text-charcoal-muted uppercase tracking-wider">
                  Select Tenant Business
                </div>
                {tenants.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => {
                      switchTenant(t.id);
                      setTenantDropdownOpen(false);
                    }}
                    className={`w-full px-3 py-2 text-left text-xs flex items-center justify-between hover:bg-sage-50 transition-colors ${
                      t.id === currentTenant.id ? 'bg-sage-100 font-bold text-forest' : 'text-charcoal'
                    }`}
                  >
                    <div>
                      <div className="font-semibold">{t.name}</div>
                      <div className="text-[10px] text-charcoal-muted">{t.city} • {t.subscriptionPlan}</div>
                    </div>
                    {t.id === currentTenant.id && (
                      <span className="w-1.5 h-1.5 rounded-full bg-forest" />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Sidebar Nav Links */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const active = isActive(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileSidebarOpen(false)}
                className={`flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                  active
                    ? 'bg-forest text-white shadow-xs'
                    : 'text-charcoal-muted hover:text-charcoal hover:bg-surface-subtle'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Bottom Subscription & Profile Section */}
        <div className="p-3 border-t border-border space-y-2 bg-surface-subtle">
          <Link
            to="/dashboard/billing"
            className="p-2.5 rounded-xl bg-white border border-border hover:border-sage-300 transition-colors flex items-center justify-between block text-left"
          >
            <div>
              <div className="text-[10px] text-charcoal-muted uppercase font-bold tracking-wider">Plan</div>
              <div className="text-xs font-bold text-charcoal">{currentTenant.subscriptionPlan} Plan</div>
            </div>
            <span className="text-[10px] font-bold text-forest bg-sage-100 px-2 py-0.5 rounded">
              Active
            </span>
          </Link>

          <div className="p-2 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-forest text-white flex items-center justify-center font-bold text-xs">
                JW
              </div>
              <div>
                <div className="font-bold text-charcoal leading-none">{currentTenant.ownerName}</div>
                <div className="text-[10px] text-charcoal-muted mt-0.5">Shop Owner</div>
              </div>
            </div>
            <Link
              to="/dashboard/settings"
              className="text-charcoal-muted hover:text-charcoal p-1"
              title="Settings"
            >
              <Settings className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </aside>

      {/* MAIN WORKSPACE WRAPPER */}
      <div className="flex-1 md:pl-64 flex flex-col min-w-0">
        {/* Top Workspace Header */}
        <header className="sticky top-12 z-30 bg-white/95 backdrop-blur-md border-b border-border px-4 sm:px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileSidebarOpen(true)}
              className="md:hidden p-2 rounded-xl border border-border text-charcoal hover:bg-secondary"
            >
              <Menu className="w-5 h-5" />
            </button>

            <div>
              <h1 className="text-base sm:text-lg font-display font-bold text-charcoal leading-tight">
                FreshFold Operations
              </h1>
              <div className="text-xs text-charcoal-muted hidden sm:block">
                482 Queen St West, Toronto, ON • Real-time Sync
              </div>
            </div>
          </div>

          {/* Right Header Actions */}
          <div className="flex items-center gap-2.5">
            {/* Quick Link to Customer App */}
            <Link
              to="/app"
              target="_blank"
              rel="noreferrer"
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-border text-xs font-semibold text-charcoal hover:bg-secondary transition-colors"
              title="Preview Customer Mobile App in new tab"
            >
              <span>Customer View</span>
              <ExternalLink className="w-3 h-3 text-sage-600" />
            </Link>

            <NotificationDropdown recipient="business" align="right" />

            <button
              onClick={() => setNewOrderModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-forest text-white text-xs font-bold hover:bg-forest-light shadow-xs transition-all"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>New Order</span>
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-x-hidden">
          {children}
        </main>
      </div>

      {/* New Order Modal */}
      <NewOrderModal
        isOpen={newOrderModalOpen}
        onClose={() => setNewOrderModalOpen(false)}
      />
    </div>
  );
};
