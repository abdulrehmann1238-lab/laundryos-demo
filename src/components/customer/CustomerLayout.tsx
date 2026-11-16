import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Home,
  Clock,
  PlusCircle,
  User,
  Bell,
  Smartphone,
  Maximize2,
  Minimize2,
  Building2,
  ArrowLeft,
} from 'lucide-react';
import { Logo } from '../common/Logo';
import { NotificationDropdown } from '../common/NotificationDropdown';
import { useLaundry } from '../../context/LaundryContext';

interface CustomerLayoutProps {
  children: React.ReactNode;
  onOpenBookingModal: () => void;
}

export const CustomerLayout: React.FC<CustomerLayoutProps> = ({
  children,
  onOpenBookingModal,
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { currentTenant } = useLaundry();
  const [deviceFrameMode, setDeviceFrameMode] = useState(false);

  const isActive = (path: string) => {
    if (path === '/app' && location.pathname === '/app') return true;
    if (path !== '/app' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <div className="min-h-screen bg-secondary/60 text-charcoal flex flex-col items-center justify-start pt-16 sm:pt-20 pb-20">
      {/* Top Device Mode Toolbar for Desktop reviewers */}
      <div className="w-full max-w-md md:max-w-xl mx-auto px-4 mb-3 flex items-center justify-between text-xs text-charcoal-muted">
        <div className="flex items-center gap-2">
          <Link
            to="/"
            className="flex items-center gap-1 font-semibold text-charcoal hover:text-forest transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Landing</span>
          </Link>
          <span className="text-border">|</span>
          <span className="flex items-center gap-1 font-medium text-forest">
            <Building2 className="w-3.5 h-3.5" />
            {currentTenant.name}
          </span>
        </div>

        <button
          onClick={() => setDeviceFrameMode(!deviceFrameMode)}
          className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white border border-border hover:bg-surface text-charcoal font-medium transition-colors shadow-xs"
        >
          {deviceFrameMode ? (
            <>
              <Maximize2 className="w-3.5 h-3.5 text-sage-600" />
              <span>Full Screen View</span>
            </>
          ) : (
            <>
              <Smartphone className="w-3.5 h-3.5 text-sage-600" />
              <span>Simulate iPhone Frame</span>
            </>
          )}
        </button>
      </div>

      {/* Main Container: optionally constrained in an iPhone-style frame */}
      <div
        className={`w-full transition-all duration-300 relative bg-background border border-border flex flex-col justify-between ${
          deviceFrameMode
            ? 'max-w-[420px] rounded-[44px] shadow-drawer my-2 min-h-[840px] overflow-hidden border-[8px] border-charcoal'
            : 'max-w-md sm:max-w-xl rounded-2xl shadow-card min-h-[750px] overflow-hidden'
        }`}
      >
        {/* Mobile Header Bar */}
        <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-border px-5 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-forest text-white flex items-center justify-center font-bold text-sm shadow-xs">
              <span className="text-linen">L</span>O
            </div>
            <div>
              <div className="text-xs font-bold text-charcoal leading-none">
                {currentTenant.name}
              </div>
              <div className="text-[10px] text-charcoal-muted mt-0.5">
                Customer Mobile Portal
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <NotificationDropdown recipient="customer" align="right" />

            <Link
              to="/app/profile"
              className="w-8 h-8 rounded-full border border-border bg-sage-100 flex items-center justify-center text-forest font-bold text-xs overflow-hidden"
            >
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
                alt="Alex Morgan"
                className="w-full h-full object-cover"
              />
            </Link>
          </div>
        </header>

        {/* Content View */}
        <main className="flex-1 p-5 overflow-y-auto">
          {children}
        </main>

        {/* Bottom Navigation Bar */}
        <nav className="sticky bottom-0 z-30 bg-white/95 backdrop-blur-md border-t border-border px-4 py-2.5 flex items-center justify-around">
          <Link
            to="/app"
            className={`flex flex-col items-center gap-1 text-[11px] font-semibold transition-colors ${
              isActive('/app') && location.pathname === '/app'
                ? 'text-forest'
                : 'text-charcoal-muted hover:text-charcoal'
            }`}
          >
            <Home className="w-5 h-5" />
            <span>Home</span>
          </Link>

          <Link
            to="/app/orders"
            className={`flex flex-col items-center gap-1 text-[11px] font-semibold transition-colors ${
              isActive('/app/orders')
                ? 'text-forest'
                : 'text-charcoal-muted hover:text-charcoal'
            }`}
          >
            <Clock className="w-5 h-5" />
            <span>Orders</span>
          </Link>

          {/* Quick Book Central Action */}
          <button
            onClick={onOpenBookingModal}
            className="flex flex-col items-center justify-center -mt-6 group"
          >
            <div className="w-12 h-12 rounded-full bg-forest text-white shadow-elevated flex items-center justify-center group-hover:scale-105 group-hover:bg-forest-light transition-all">
              <PlusCircle className="w-6 h-6 text-linen" />
            </div>
            <span className="text-[11px] font-bold text-forest mt-1">Book</span>
          </button>

          <Link
            to="/app/profile"
            className={`flex flex-col items-center gap-1 text-[11px] font-semibold transition-colors ${
              isActive('/app/profile')
                ? 'text-forest'
                : 'text-charcoal-muted hover:text-charcoal'
            }`}
          >
            <User className="w-5 h-5" />
            <span>Profile</span>
          </Link>
        </nav>
      </div>
    </div>
  );
};
